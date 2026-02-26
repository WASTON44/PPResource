/**
 * runner.js
 * In-browser C code execution using JSCPP (a C/C++ interpreter in JavaScript).
 * JSCPP is loaded lazily from local/vendor path with CDN fallbacks.
 *
 * Security model:
 * - JSCPP runs in the main thread (no network access by design)
 * - Execution is wrapped in a timeout to kill infinite loops
 * - Output is captured and returned as a string
 *
 * Reference: https://github.com/felixhao28/JSCPP
 */

const Runner = (() => {
  const JSCPP_RUNTIME_SOURCES = [
    // First, try same-origin file (works in strict CSP / offline deployments if vendored).
    'assets/js/vendor/JSCPP.es5.min.js',
    // Then fall back to public CDNs.
    'https://cdn.jsdelivr.net/npm/jscpp@latest/dist/JSCPP.es5.min.js',
    'https://unpkg.com/jscpp@latest/dist/JSCPP.es5.min.js'
  ];
  const EXECUTION_TIMEOUT_MS = 5000;

  let _loaded = false;
  let _loading = false;
  let _loadPromise = null;

  /**
   * Load JSCPP runtime (only once).
   * @returns {Promise<void>}
   */
  function _loadJSCPP() {
    if (_loaded) return Promise.resolve();
    if (_loading) return _loadPromise;

    _loading = true;
    _loadPromise = new Promise((resolve, reject) => {
      let currentSourceIndex = 0;

      const loadFromNextSource = () => {
        if (currentSourceIndex >= JSCPP_RUNTIME_SOURCES.length) {
          _loading = false;
          reject(new Error(
            'Failed to load C runtime. Tried local + CDN sources. ' +
            'If you are hosting on GitHub Pages, ensure assets/js/vendor/JSCPP.es5.min.js exists ' +
            'or allow access to jsdelivr/unpkg in your network or CSP.'
          ));
          return;
        }

        const script = document.createElement('script');
        script.src = JSCPP_RUNTIME_SOURCES[currentSourceIndex++];
        script.async = true;

        script.onload = () => {
          if (typeof JSCPP === 'undefined') {
            // Script loaded but didn't expose JSCPP; try the next source.
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

  /**
   * Run C source code and return { output, exitCode, error }.
   * @param {string} code - C source code
   * @returns {Promise<{output: string, exitCode: number, error: string|null}>}
   */
  async function run(code) {
    // Load runtime if not yet available
    if (typeof JSCPP === 'undefined') {
      await _loadJSCPP();
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
        // JSCPP maxTimeout is in steps (not ms); set a high step count
        maxTimeout: 100000
      };

      // Wrap in setTimeout so the UI can update before heavy computation
      const timer = setTimeout(() => {
        timedOut = true;
        resolve({
          output: outputLines.join(''),
          exitCode: 1,
          error: 'Execution timed out. Check for infinite loops.'
        });
      }, EXECUTION_TIMEOUT_MS);

      try {
        const exitCode = JSCPP.run(code, '', config);
        if (!timedOut) {
          clearTimeout(timer);
          resolve({
            output: outputLines.join(''),
            exitCode: typeof exitCode === 'number' ? exitCode : 0,
            error: null
          });
        }
      } catch (e) {
        if (!timedOut) {
          clearTimeout(timer);
          // Extract a human-readable error message from JSCPP exceptions
          const msg = _formatError(e, code);
          resolve({
            output: outputLines.join(''),
            exitCode: 1,
            error: msg
          });
        }
      }
    });
  }

  /**
   * Format a JSCPP exception into a readable compile/runtime error message.
   * @param {Error} e
   * @param {string} code
   * @returns {string}
   */
  function _formatError(e, code) {
    if (!e) return 'Unknown error occurred.';
    const msg = e.message || String(e);

    // JSCPP includes line/column info in some errors
    const lineMatch = msg.match(/line\s*(\d+)/i);
    if (lineMatch) {
      const lineNum = parseInt(lineMatch[1], 10);
      const lines = code.split('\n');
      const srcLine = lines[lineNum - 1] ? `\n  Source: ${lines[lineNum - 1].trim()}` : '';
      return `Error on line ${lineNum}:${srcLine}\n${msg}`;
    }

    return msg;
  }

  /**
   * Check whether JSCPP has been loaded yet.
   * @returns {boolean}
   */
  function isReady() {
    return _loaded && typeof JSCPP !== 'undefined';
  }

  /**
   * Pre-load JSCPP in the background (call when user reaches first coding step).
   */
  function preload() {
    if (!_loaded && !_loading) {
      _loadJSCPP().catch(() => {});
    }
  }

  return { run, isReady, preload };
})();
