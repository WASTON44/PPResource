/**
 * runner.js
 * In-browser C code execution using JSCPP (a C/C++ interpreter in JavaScript).
 * JSCPP is loaded lazily from CDN on first use.
 *
 * Security model:
 * - JSCPP runs in the main thread (no network access by design)
 * - Execution is wrapped in a timeout to kill infinite loops
 * - Output is captured and returned as a string
 *
 * Reference: https://github.com/felixhao28/JSCPP
 */

const Runner = (() => {
  const JSCPP_CDN = 'https://cdn.jsdelivr.net/npm/JSCPP@2.1.0/dist/JSCPP.es5.min.js';
  const EXECUTION_TIMEOUT_MS = 5000;

  let _loaded = false;
  let _loading = false;
  let _loadPromise = null;

  /**
   * Load JSCPP from CDN (only once).
   * @returns {Promise<void>}
   */
  function _loadJSCPP() {
    if (_loaded) return Promise.resolve();
    if (_loading) return _loadPromise;

    _loading = true;
    _loadPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = JSCPP_CDN;
      script.onload = () => {
        _loaded = true;
        _loading = false;
        resolve();
      };
      script.onerror = () => {
        _loading = false;
        reject(new Error('Failed to load C runtime. Please check your internet connection.'));
      };
      document.head.appendChild(script);
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
