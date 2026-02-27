/**
 * runner.js
 * In-browser C code execution using JSCPP (a C/C++ interpreter in JavaScript).
 * JSCPP is loaded lazily from local/vendor path with CDN fallbacks.
 */

const Runner = (() => {
  const JSCPP_RUNTIME_SOURCES = [
    'assets/js/vendor/JSCPP.es5.min.js',
    'https://cdn.jsdelivr.net/npm/jscpp@2.1.0/dist/JSCPP.es5.min.js',
    'https://unpkg.com/jscpp@2.1.0/dist/JSCPP.es5.min.js',
    'https://fastly.jsdelivr.net/npm/jscpp@2.1.0/dist/JSCPP.es5.min.js',
    'https://cdn.jsdelivr.net/gh/felixhao28/JSCPP@master/dist/JSCPP.es5.min.js',
    'https://cdn.jsdelivr.net/gh/felixhao28/JSCPP@main/dist/JSCPP.es5.min.js',
    'https://rawcdn.githack.com/felixhao28/JSCPP/master/dist/JSCPP.es5.min.js',
    'https://rawcdn.githack.com/felixhao28/JSCPP/main/dist/JSCPP.es5.min.js'
  ];
  const EXECUTION_TIMEOUT_MS = 5000;

  let _loaded = false;
  let _loading = false;
  let _loadPromise = null;

  function _toRuntimeUrl(source) {
    if (/^https?:\/\//i.test(source)) return source;
    return new URL(source, window.location.href).toString();
  }

  function _loadJSCPP() {
    if (_loaded) return Promise.resolve();
    if (_loading) return _loadPromise;

    _loading = true;
    _loadPromise = new Promise((resolve, reject) => {
      let currentSourceIndex = 0;
      const triedUrls = [];

      const loadFromNextSource = () => {
        if (currentSourceIndex >= JSCPP_RUNTIME_SOURCES.length) {
          _loading = false;
          reject(new Error(
            'Failed to load C runtime. Tried: ' + triedUrls.join(', ') + '. ' +
            'If hosting on GitHub Pages, ensure assets/js/vendor/JSCPP.es5.min.js exists and is published. ' +
            'Also allow cdn.jsdelivr.net, unpkg.com, and rawcdn.githack.com in network/CSP, then hard refresh (Ctrl/Cmd+Shift+R).'
          ));
          return;
        }

        const script = document.createElement('script');
        const source = JSCPP_RUNTIME_SOURCES[currentSourceIndex++];
        script.src = _toRuntimeUrl(source);
        triedUrls.push(script.src);
        script.async = true;

        script.onload = () => {
          if (typeof JSCPP === 'undefined') {
            loadFromNextSource();
            return;
          }
          _loaded = true;
          _loading = false;
          resolve();
        };

        script.onerror = () => {
          loadFromNextSource();
        };

        document.head.appendChild(script);
      };

      loadFromNextSource();
    });

    return _loadPromise;
  }

  function _safeEvalNumeric(expr, vars) {
    const replaced = expr
      .replace(/\b([A-Za-z_]\w*)\b/g, (m, name) => (name in vars ? String(vars[name]) : m))
      .replace(/(\d)f\b/g, '$1');
    if (!/^[\d+\-*/%().<>=!\s]+$/.test(replaced)) {
      throw new Error('Unsupported expression: ' + expr);
    }
    return Function(`"use strict"; return (${replaced});`)();
  }

  function _splitArgs(argStr) {
    if (!argStr) return [];
    return argStr.split(',').map(s => s.trim()).filter(Boolean);
  }

  function _unescapeCString(s) {
    return s.replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  }

  function _executePrintf(fmt, args, vars) {
    let argIdx = 0;
    return _unescapeCString(fmt).replace(/%\.\d+f|%[dfcs]/g, spec => {
      const expr = args[argIdx++] || '0';
      let value;
      if (/^'.'$/.test(expr)) {
        value = expr.slice(1, -1);
      } else {
        try {
          value = _safeEvalNumeric(expr, vars);
        } catch {
          value = vars[expr] !== undefined ? vars[expr] : expr;
        }
      }
      if (spec === '%c') return String(value)[0] || '';
      if (spec === '%d') return String(Math.trunc(Number(value)));
      if (spec === '%f') return Number(value).toFixed(6);
      if (/^%\.\d+f$/.test(spec)) {
        const places = parseInt(spec.match(/\d+/)[0], 10);
        return Number(value).toFixed(places);
      }
      return String(value);
    });
  }

  function _runOfflineFallback(code, reason) {
    const output = [];
    const vars = {};
    let source = code;

    try {
      source = source.replace(/\/\/.*$/gm, '');

      // Parse variable declarations up front so conditions can reference them.
      const declRegex = /(int|float|double|char)\s+(\w+)\s*=\s*([^;]+);/g;
      for (const m of source.matchAll(declRegex)) {
        const [, type, name, rhs] = m;
        if (type === 'char' && /^'.'$/.test(rhs.trim())) {
          vars[name] = rhs.trim().slice(1, -1);
        } else {
          vars[name] = _safeEvalNumeric(rhs, vars);
        }
      }

      // Handle simple for-loops first.
      source = source.replace(/for\s*\(\s*int\s+(\w+)\s*=\s*([^;]+);\s*\1\s*<=\s*([^;]+);\s*\1\+\+\s*\)\s*\{([\s\S]*?)\}/g,
        (_, varName, startExpr, endExpr, body) => {
          vars[varName] = Math.trunc(_safeEvalNumeric(startExpr, vars));
          const end = Math.trunc(_safeEvalNumeric(endExpr, vars));
          while (vars[varName] <= end) {
            const printfMatches = [...body.matchAll(/printf\(\s*"([\s\S]*?)"\s*(?:,\s*([^)]+))?\);/g)];
            for (const m of printfMatches) {
              output.push(_executePrintf(m[1], _splitArgs(m[2]), vars));
            }
            vars[varName] += 1;
          }
          return '';
        });

      // Handle if/else blocks with simple numeric condition.
      source = source.replace(/if\s*\(([^)]+)\)\s*\{([\s\S]*?)\}\s*else\s*\{([\s\S]*?)\}/g,
        (_, condExpr, ifBody, elseBody) => {
          const cond = !!_safeEvalNumeric(condExpr, vars);
          const chosen = cond ? ifBody : elseBody;
          const printfMatches = [...chosen.matchAll(/printf\(\s*"([\s\S]*?)"\s*(?:,\s*([^)]+))?\);/g)];
          for (const m of printfMatches) {
            output.push(_executePrintf(m[1], _splitArgs(m[2]), vars));
          }
          return '';
        });

      // Parse variable re-assignments.

      const assignRegex = /(\w+)\s*=\s*([^;]+);/g;
      for (const m of source.matchAll(assignRegex)) {
        const [full, name, rhs] = m;
        if (/^(int|float|double|char)\s/.test(full)) continue;
        if (!(name in vars)) continue;
        try {
          vars[name] = _safeEvalNumeric(rhs, vars);
        } catch {
          if (/^'.'$/.test(rhs.trim())) {
            vars[name] = rhs.trim().slice(1, -1);
          }
        }
      }

      const printfMatches = [...source.matchAll(/printf\(\s*"([\s\S]*?)"\s*(?:,\s*([^)]+))?\);/g)];
      for (const m of printfMatches) {
        output.push(_executePrintf(m[1], _splitArgs(m[2]), vars));
      }

      return {
        output: output.join(''),
        exitCode: 0,
        error: null,
        offline: true,
        warning: `Runtime CDN blocked; executed in limited offline mode. ${reason || ''}`.trim()
      };
    } catch (e) {
      return {
        output: output.join(''),
        exitCode: 1,
        error: `${reason || 'Failed to load C runtime.'}\nOffline fallback could not execute this program: ${e.message}`
      };
    }
  }

  async function run(code) {
    if (typeof JSCPP === 'undefined') {
      try {
        await _loadJSCPP();
      } catch (loadErr) {
        return _runOfflineFallback(code, loadErr.message);
      }
    }

    return new Promise((resolve) => {
      const outputLines = [];
      let timedOut = false;

      const config = {
        stdio: {
          write(s) {
            outputLines.push(s);
          }
        },
        maxTimeout: 100000
      };

      const timer = setTimeout(() => {
        timedOut = true;
        resolve({ output: outputLines.join(''), exitCode: 1, error: 'Execution timed out. Check for infinite loops.' });
      }, EXECUTION_TIMEOUT_MS);

      try {
        const exitCode = JSCPP.run(code, '', config);
        if (!timedOut) {
          clearTimeout(timer);
          resolve({ output: outputLines.join(''), exitCode: typeof exitCode === 'number' ? exitCode : 0, error: null });
        }
      } catch (e) {
        if (!timedOut) {
          clearTimeout(timer);
          const msg = _formatError(e, code);
          resolve({ output: outputLines.join(''), exitCode: 1, error: msg });
        }
      }
    });
  }

  function _formatError(e, code) {
    if (!e) return 'Unknown error occurred.';
    const msg = e.message || String(e);
    const lineMatch = msg.match(/line\s*(\d+)/i);
    if (lineMatch) {
      const lineNum = parseInt(lineMatch[1], 10);
      const lines = code.split('\n');
      const srcLine = lines[lineNum - 1] ? `\n  Source: ${lines[lineNum - 1].trim()}` : '';
      return `Error on line ${lineNum}:${srcLine}\n${msg}`;
    }
    return msg;
  }

  function isReady() {
    return _loaded && typeof JSCPP !== 'undefined';
  }

  function preload() {
    if (!_loaded && !_loading) {
      _loadJSCPP().catch(() => {});
    }
  }

  return { run, isReady, preload };
})();
