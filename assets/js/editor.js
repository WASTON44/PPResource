/**
 * editor.js
 * Thin wrapper around CodeMirror 5 for the embedded code editor.
 * CodeMirror is loaded from CDN before this file runs.
 */

const Editor = (() => {
  let _cm = null; // CodeMirror instance

  /**
   * Initialise the editor inside a given DOM element.
   * @param {HTMLElement} container
   * @param {string} initialCode
   */
  function init(container, initialCode) {
    if (_cm) {
      _cm.toTextArea();
      _cm = null;
    }

    // Create a textarea for CodeMirror to enhance
    const textarea = document.createElement('textarea');
    container.innerHTML = '';
    container.appendChild(textarea);

    _cm = CodeMirror.fromTextArea(textarea, {
      mode: 'text/x-csrc',
      theme: 'material-darker',
      lineNumbers: true,
      indentUnit: 4,
      tabSize: 4,
      indentWithTabs: false,
      autofocus: false,
      lineWrapping: false,
      matchBrackets: true,
      autoCloseBrackets: true,
      extraKeys: {
        Tab(cm) {
          cm.replaceSelection('    ');
        }
      }
    });

    _cm.setValue(initialCode || '');

    // Ensure full render on first display
    setTimeout(() => { if (_cm) _cm.refresh(); }, 50);
  }

  /**
   * Get the current editor content.
   * @returns {string}
   */
  function getValue() {
    return _cm ? _cm.getValue() : '';
  }

  /**
   * Set the editor content.
   * @param {string} code
   */
  function setValue(code) {
    if (_cm) {
      _cm.setValue(code);
      _cm.clearHistory();
    }
  }

  /**
   * Highlight a specific line as an error.
   * @param {number} lineNumber (1-based)
   */
  function highlightError(lineNumber) {
    if (!_cm || !lineNumber) return;
    const line = lineNumber - 1;
    _cm.addLineClass(line, 'background', 'cm-error-line');
    setTimeout(() => {
      if (_cm) _cm.removeLineClass(line, 'background', 'cm-error-line');
    }, 3000);
  }

  /**
   * Clear all error highlights.
   */
  function clearErrors() {
    if (!_cm) return;
    const lineCount = _cm.lineCount();
    for (let i = 0; i < lineCount; i++) {
      _cm.removeLineClass(i, 'background', 'cm-error-line');
    }
  }

  /**
   * Refresh the editor (call after a resize or visibility change).
   */
  function refresh() {
    if (_cm) _cm.refresh();
  }

  /**
   * Destroy the editor instance.
   */
  function destroy() {
    if (_cm) {
      _cm.toTextArea();
      _cm = null;
    }
  }

  return { init, getValue, setValue, highlightError, clearErrors, refresh, destroy };
})();
