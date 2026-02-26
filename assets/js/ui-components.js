/**
 * ui-components.js
 * Renders each step type and sidebar navigation.
 * All DOM manipulation is centralised here.
 */

const UI = (() => {

  // ─── Sidebar ─────────────────────────────────────────────────────────────

  /**
   * Build sidebar navigation HTML from course data.
   * @param {object} courseData - full COURSE_DATA object
   * @param {string} activeStepId - currently active step ID
   * @returns {string} HTML string
   */
  function buildSidebar(courseData, activeStepId) {
    let html = `<div class="sidebar-title">${escapeHtml(courseData.title)}</div>`;

    courseData.modules.forEach(mod => {
      const modCompleted = isModuleComplete(mod);
      html += `
        <div class="sidebar-module">
          <div class="sidebar-module-title">
            <span class="mod-icon">${mod.icon}</span>
            ${escapeHtml(mod.title)}
            ${modCompleted ? '<span class="tick-badge" title="Module complete">✔</span>' : ''}
          </div>`;

      mod.lessons.forEach(lesson => {
        const lessonCompleted = isLessonComplete(lesson);
        html += `
          <div class="sidebar-lesson">
            <div class="sidebar-lesson-title">
              ${lessonCompleted ? '✅' : '📋'} ${escapeHtml(lesson.title)}
            </div>`;

        lesson.steps.forEach((step, idx) => {
          const completed = Storage.isStepComplete(step.id);
          const active = step.id === activeStepId;
          const typeIcon = _stepIcon(step.type);
          html += `
            <div class="sidebar-step ${active ? 'active' : ''} ${completed ? 'completed' : ''}"
                 data-step-id="${step.id}" role="button" tabindex="0"
                 title="${escapeHtml(step.title)}">
              <span class="step-num">${idx + 1}</span>
              <span class="step-label">${escapeHtml(step.title)}</span>
              <span class="step-status">${completed ? '✔' : typeIcon}</span>
            </div>`;
        });

        html += `</div>`; // sidebar-lesson
      });

      html += `</div>`; // sidebar-module
    });

    return html;
  }

  function _stepIcon(type) {
    switch (type) {
      case 'quiz': return '❓';
      case 'code': return '💻';
      default: return '📖';
    }
  }

  // ─── Step renderers ───────────────────────────────────────────────────────

  /**
   * Render a content step.
   * @param {object} step
   * @returns {string} HTML
   */
  function renderContentStep(step) {
    return `
      <div class="step-content-panel">
        <div class="step-header">
          <span class="step-type-badge type-content">Reading</span>
          <h1 class="step-title">${escapeHtml(step.title)}</h1>
        </div>
        <div class="step-body prose">${step.body}</div>
        <div class="step-actions">
          <button class="btn btn-primary mark-read-btn" id="markReadBtn">
            Mark as Read ✓
          </button>
        </div>
      </div>`;
  }

  /**
   * Render a quiz step (MCQ / predict output / true-false).
   * @param {object} step
   * @param {boolean} alreadyComplete
   * @returns {string} HTML
   */
  function renderQuizStep(step, alreadyComplete) {
    const options = step.options.map((opt, i) => `
      <label class="quiz-option ${alreadyComplete && i === step.correct ? 'correct' : ''}"
             data-index="${i}">
        <input type="radio" name="quiz_${step.id}" value="${i}"
               ${alreadyComplete ? 'disabled' : ''}>
        <span class="option-letter">${String.fromCharCode(65 + i)}</span>
        <span class="option-text">${opt}</span>
      </label>`).join('');

    return `
      <div class="step-content-panel">
        <div class="step-header">
          <span class="step-type-badge type-quiz">Knowledge Check</span>
          <h1 class="step-title">${escapeHtml(step.title)}</h1>
        </div>
        <div class="quiz-question prose">${step.question}</div>
        <form class="quiz-form" id="quizForm">
          <div class="quiz-options">${options}</div>
          ${alreadyComplete
            ? `<div class="quiz-feedback correct-fb">
                 <strong>✅ Correct!</strong> ${escapeHtml(step.explanation)}
               </div>`
            : `<div class="quiz-feedback" id="quizFeedback" style="display:none"></div>`}
          <div class="step-actions">
            ${alreadyComplete
              ? '<button class="btn btn-secondary" disabled>Already Completed ✔</button>'
              : '<button class="btn btn-primary" id="submitQuizBtn" disabled>Submit Answer</button>'}
          </div>
        </form>
      </div>`;
  }

  /**
   * Render a code step (editor + console + controls).
   * @param {object} step
   * @param {boolean} alreadyComplete
   * @returns {string} HTML
   */
  function renderCodeStep(step, alreadyComplete) {
    return `
      <div class="step-content-panel code-step">
        <div class="step-header">
          <span class="step-type-badge type-code">Coding Exercise</span>
          <h1 class="step-title">${escapeHtml(step.title)}</h1>
        </div>
        <div class="code-instructions prose">${step.instructions}</div>
        <div class="code-workspace">
          <div class="editor-toolbar">
            <span class="editor-label">📝 Code Editor</span>
            <div class="editor-toolbar-actions">
              <button class="btn btn-sm btn-ghost" id="resetCodeBtn" title="Reset to starter code">↺ Reset</button>
              ${step.hint ? '<button class="btn btn-sm btn-ghost" id="showHintBtn">💡 Hint</button>' : ''}
            </div>
          </div>
          <div id="editorContainer" class="editor-container"></div>
          <div class="console-toolbar">
            <span class="console-label">🖥 Console Output</span>
            <button class="btn btn-sm btn-ghost" id="clearConsoleBtn" title="Clear console">✕ Clear</button>
          </div>
          <div id="consoleOutput" class="console-output">
            <span class="console-placeholder">Output will appear here after you run your code.</span>
          </div>
        </div>
        ${step.hint ? `<div class="hint-box" id="hintBox" style="display:none">
          <strong>💡 Hint:</strong> ${escapeHtml(step.hint)}
        </div>` : ''}
        <div class="step-actions code-actions">
          <button class="btn btn-run" id="runCodeBtn">
            <span id="runBtnText">▶ Run Code</span>
          </button>
          ${alreadyComplete
            ? '<span class="completed-badge">✅ Exercise Complete</span>'
            : '<span class="not-complete-badge" id="passStatus">Run your code to check the output</span>'}
        </div>
      </div>`;
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  function isModuleComplete(mod) {
    return mod.lessons.every(l => isLessonComplete(l));
  }

  function isLessonComplete(lesson) {
    return lesson.steps.every(s => Storage.isStepComplete(s.id));
  }

  /**
   * Build the top progress bar HTML.
   * @param {number} completed
   * @param {number} total
   * @returns {string}
   */
  function buildProgressBar(completed, total) {
    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
    return `
      <div class="progress-bar-wrap" title="${completed} of ${total} steps complete">
        <div class="progress-bar-fill" style="width:${pct}%"></div>
      </div>
      <span class="progress-label">${completed}/${total} steps</span>`;
  }

  /**
   * Render console output (with optional error/success state).
   * @param {object} result - { output, exitCode, error }
   * @param {HTMLElement} el - the console DOM element
   */
  function showConsoleResult(result, el) {
    el.innerHTML = '';
    if (result.error) {
      el.innerHTML = `<span class="console-error">⚠ Error\n${escapeHtml(result.error)}</span>`;
    } else if (result.output) {
      el.innerHTML = `<span class="console-output-text">${escapeHtml(result.output)}</span>`;
    } else {
      el.innerHTML = `<span class="console-empty">(no output)</span>`;
    }
  }

  /**
   * Escape HTML special characters.
   * @param {string} str
   * @returns {string}
   */
  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  return {
    buildSidebar,
    renderContentStep,
    renderQuizStep,
    renderCodeStep,
    buildProgressBar,
    showConsoleResult,
    escapeHtml
  };
})();
