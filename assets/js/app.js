/**
 * app.js
 * Main application controller.
 * Orchestrates navigation, step rendering, quiz checking, and code execution.
 */

const App = (() => {
  let _initialised = false;
  let _allSteps = [];
  let _currentIdx = 0;

  function init() {
    if (_initialised) return;
    _initialised = true;

    _buildStepIndex();
    _restoreProgress();
    _renderAll();
    _bindStaticEvents();
  }

  function _buildStepIndex() {
    _allSteps = [];
    COURSE_DATA.modules.forEach(mod => {
      mod.lessons.forEach(lesson => {
        lesson.steps.forEach(step => {
          _allSteps.push({ step, mod, lesson });
        });
      });
    });
  }

  function _restoreProgress() {
    const lastId = Storage.getLastStep();
    if (!lastId) return;

    const idx = _allSteps.findIndex(item => item.step.id === lastId);
    if (idx !== -1) _currentIdx = idx;
  }

  function _renderAll() {
    _renderSidebar();
    _renderProgressBar();
    _renderStep(_currentIdx);
  }

  function _renderSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    const current = _allSteps[_currentIdx];
    sidebar.innerHTML = UI.buildSidebar(COURSE_DATA, current ? current.step.id : null);

    sidebar.querySelectorAll('.sidebar-step').forEach(el => {
      el.addEventListener('click', () => _navigateToStepId(el.dataset.stepId));
      el.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') _navigateToStepId(el.dataset.stepId);
      });
    });
  }

  function _renderProgressBar() {
    const bar = document.getElementById('progressArea');
    if (!bar) return;

    const total = _allSteps.length;
    const completed = Storage.countCompleted(_allSteps.map(item => item.step.id));
    bar.innerHTML = UI.buildProgressBar(completed, total);
  }

  function _renderStep(idx) {
    Editor.destroy();

    if (idx < 0 || idx >= _allSteps.length) return;
    _currentIdx = idx;

    const { step } = _allSteps[idx];
    Storage.saveLastStep(step.id);

    const panel = document.getElementById('mainPanel');
    if (!panel) return;

    const alreadyComplete = Storage.isStepComplete(step.id);

    switch (step.type) {
      case 'content':
        panel.innerHTML = UI.renderContentStep(step);
        _bindContentEvents(step);
        break;
      case 'quiz':
        panel.innerHTML = UI.renderQuizStep(step, alreadyComplete);
        _bindQuizEvents(step, alreadyComplete);
        break;
      case 'code':
        panel.innerHTML = UI.renderCodeStep(step, alreadyComplete);
        _bindCodeEvents(step, alreadyComplete);
        Runner.preload();
        break;
      default:
        panel.innerHTML = '<div class="step-content-panel"><div class="prose"><p>Unknown step type.</p></div></div>';
    }

    _updateNavButtons();
    _updateStepIndicator();
    _renderSidebar();
    _renderProgressBar();

    panel.scrollTop = 0;
    const mainArea = document.getElementById('mainArea');
    if (mainArea) mainArea.scrollTop = 0;
  }

  function _bindStaticEvents() {
    document.getElementById('prevBtn')?.addEventListener('click', _goPrev);
    document.getElementById('nextBtn')?.addEventListener('click', _goNext);
    document.getElementById('toggleSidebarBtn')?.addEventListener('click', _toggleSidebar);

    document.addEventListener('keydown', event => {
      if (event.target.closest('.CodeMirror')) return;
      if (event.key === 'ArrowRight' && !event.ctrlKey) _goNext();
      if (event.key === 'ArrowLeft' && !event.ctrlKey) _goPrev();
    });
  }

  function _bindContentEvents(step) {
    const btn = document.getElementById('markReadBtn');
    if (!btn) return;

    if (Storage.isStepComplete(step.id)) {
      btn.textContent = 'Read OK';
      btn.disabled = true;
      btn.classList.add('btn-success');
    }

    btn.addEventListener('click', () => {
      Storage.markStepComplete(step.id);
      btn.textContent = 'Read OK';
      btn.disabled = true;
      btn.classList.add('btn-success');
      _onStepComplete();
    });
  }

  function _bindQuizEvents(step, alreadyComplete) {
    if (alreadyComplete) return;

    const form = document.getElementById('quizForm');
    const submitBtn = document.getElementById('submitQuizBtn');
    const feedback = document.getElementById('quizFeedback');
    if (!form || !submitBtn || !feedback) return;

    form.querySelectorAll('input[type=radio]').forEach(radio => {
      radio.addEventListener('change', () => {
        submitBtn.disabled = false;
      });
    });

    submitBtn.addEventListener('click', event => {
      event.preventDefault();
      const selected = form.querySelector('input[type=radio]:checked');
      if (!selected) return;

      const chosenIdx = parseInt(selected.value, 10);
      const correct = chosenIdx === step.correct;

      form.querySelectorAll('.quiz-option').forEach((el, index) => {
        el.querySelector('input').disabled = true;
        if (index === step.correct) el.classList.add('correct');
        else if (index === chosenIdx && !correct) el.classList.add('incorrect');
      });

      feedback.style.display = 'block';
      if (correct) {
        feedback.className = 'quiz-feedback correct-fb';
        feedback.innerHTML = `<strong>Correct.</strong> ${UI.escapeHtml(step.explanation)}`;
        Storage.markStepComplete(step.id);
        submitBtn.textContent = 'Correct';
        submitBtn.classList.add('btn-success');
        submitBtn.disabled = true;
        _onStepComplete();
        return;
      }

      feedback.className = 'quiz-feedback incorrect-fb';
      feedback.innerHTML = '<strong>Not quite.</strong> Try the question again.';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.disabled = false;
        form.querySelectorAll('input[type=radio]').forEach(radio => {
          radio.disabled = false;
        });
        form.querySelectorAll('.quiz-option').forEach(el => {
          el.classList.remove('correct', 'incorrect');
        });
        feedback.style.display = 'none';
      }, 2000);
    });
  }

  function _bindCodeEvents(step, alreadyComplete) {
    const container = document.getElementById('editorContainer');
    if (container) Editor.init(container, step.starter_code || '');

    document.getElementById('resetCodeBtn')?.addEventListener('click', () => {
      Editor.setValue(step.starter_code || '');
      const consoleEl = document.getElementById('consoleOutput');
      if (consoleEl) consoleEl.innerHTML = '<span class="console-placeholder">Output will appear here after you run your code.</span>';
    });

    const hintBtn = document.getElementById('showHintBtn');
    const hintBox = document.getElementById('hintBox');
    if (hintBtn && hintBox) {
      hintBtn.addEventListener('click', () => {
        const show = hintBox.style.display === 'none';
        hintBox.style.display = show ? 'block' : 'none';
        hintBtn.textContent = show ? 'Hide Hint' : 'Hint';
      });
    }

    document.getElementById('clearConsoleBtn')?.addEventListener('click', () => {
      const consoleEl = document.getElementById('consoleOutput');
      if (consoleEl) consoleEl.innerHTML = '<span class="console-placeholder">Console cleared.</span>';
    });

    const runBtn = document.getElementById('runCodeBtn');
    const runBtnText = document.getElementById('runBtnText');
    if (!runBtn) return;

    if (alreadyComplete) runBtn.classList.add('btn-run-done');

    runBtn.addEventListener('click', async () => {
      const code = Editor.getValue();
      if (!code.trim()) return;

      runBtn.disabled = true;
      if (runBtnText) runBtnText.textContent = 'Running...';

      const consoleEl = document.getElementById('consoleOutput');
      if (consoleEl) consoleEl.innerHTML = '<span class="console-placeholder">Running...</span>';

      let result;
      try {
        result = await Runner.run(code);
      } catch (error) {
        result = { output: '', exitCode: 1, error: error.message };
      }

      runBtn.disabled = false;
      if (runBtnText) runBtnText.textContent = 'Run Code';
      if (consoleEl) UI.showConsoleResult(result, consoleEl);

      if (!alreadyComplete && step.expected_output !== undefined) {
        _checkExercise(step, result);
      }
    });
  }

  function _checkExercise(step, result) {
    const passEl = document.getElementById('passStatus');
    if (result.error) {
      if (passEl) passEl.innerHTML = 'Fix the errors above and try again.';
      return;
    }

    const actual = (result.output || '').trim();
    const expected = (step.expected_output || '').trim();
    let passed = false;

    switch (step.check_mode) {
      case 'contains':
        passed = actual.includes(expected);
        break;
      case 'regex':
        try {
          passed = new RegExp(expected).test(actual);
        } catch {
          passed = false;
        }
        break;
      case 'exact':
      default:
        passed = actual === expected;
        break;
    }

    if (passed) {
      if (passEl) {
        passEl.className = 'pass-badge';
        passEl.innerHTML = step.completion_message || 'Exercise complete.';
      }

      Storage.markStepComplete(step.id);

      const runBtn = document.getElementById('runCodeBtn');
      if (runBtn) runBtn.classList.add('btn-run-done');

      _onStepComplete();
      return;
    }

    if (passEl) {
      passEl.className = 'fail-badge';
      passEl.innerHTML = `Output does not match.${_buildDiff(actual, expected)}`;
    }
  }

  function _buildDiff(actual, expected) {
    if (!expected) return '';

    return `
      <details class="diff-details">
        <summary>Show expected vs actual</summary>
        <div class="diff-table">
          <div><strong>Expected:</strong><pre>${UI.escapeHtml(expected)}</pre></div>
          <div><strong>Got:</strong><pre>${UI.escapeHtml(actual || '(empty)')}</pre></div>
        </div>
      </details>`;
  }

  function _onStepComplete() {
    _updateNavButtons();
    _updateStepIndicator();
    _renderSidebar();
    _renderProgressBar();

    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn && !nextBtn.disabled) {
      setTimeout(() => {
        nextBtn.classList.add('pulse-animate');
        setTimeout(() => nextBtn.classList.remove('pulse-animate'), 2000);
      }, 500);
    }
  }

  function _updateNavButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (!prevBtn || !nextBtn || _allSteps.length === 0) return;

    const isFirst = _currentIdx === 0;
    const isLast = _currentIdx === _allSteps.length - 1;
    const currentComplete = Storage.isStepComplete(_allSteps[_currentIdx].step.id);

    prevBtn.disabled = isFirst;
    nextBtn.disabled = isLast || !currentComplete;
    nextBtn.textContent = 'Next ->';

    if (isLast && currentComplete) {
      nextBtn.textContent = 'Course Complete';
      nextBtn.disabled = false;
      nextBtn.addEventListener('click', _showCompletionScreen, { once: true });
    }
  }

  function _goPrev() {
    if (_currentIdx > 0) _renderStep(_currentIdx - 1);
  }

  function _updateStepIndicator() {
    const el = document.getElementById('stepIndicator');
    if (!el) return;
    el.textContent = `Step ${_currentIdx + 1} of ${_allSteps.length}`;
  }

  function _goNext() {
    if (_currentIdx >= _allSteps.length - 1) return;

    const current = _allSteps[_currentIdx];
    if (Storage.isStepComplete(current.step.id)) {
      _renderStep(_currentIdx + 1);
    }
  }

  function _navigateToStepId(id) {
    const idx = _allSteps.findIndex(item => item.step.id === id);
    if (idx !== -1) _renderStep(idx);
  }

  function _toggleSidebar() {
    const layout = document.getElementById('appLayout');
    if (layout) layout.classList.toggle('sidebar-collapsed');
    setTimeout(() => Editor.refresh(), 300);
  }

  function _showCompletionScreen() {
    const panel = document.getElementById('mainPanel');
    if (!panel) return;

    const currentUser = typeof Auth !== 'undefined' && Auth.getCurrentUser ? Auth.getCurrentUser() : null;
    panel.innerHTML = `
      <div class="completion-screen">
        <div class="completion-icon">Course Complete</div>
        <h1>Course Complete</h1>
        <p>Congratulations - you have completed <strong>${UI.escapeHtml(COURSE_DATA.title)}</strong>.</p>
        <p>${currentUser ? `Progress has been saved for <strong>${UI.escapeHtml(currentUser.name)}</strong>.` : 'Your progress has been saved in this browser.'}</p>
        <p>You have worked through ${COURSE_DATA.modules.length} modules covering:</p>
        <ul>
          <li>C syntax, control flow, and structured problem solving</li>
          <li>Arrays, strings, functions, pointers, and structures</li>
          <li>Debugging practice and file workflow concepts</li>
        </ul>
        <p>You can log out and return later with the same student ID and QUB email.</p>
        <button class="btn btn-primary" id="restartBtn">Start Over</button>
      </div>`;

    document.getElementById('restartBtn')?.addEventListener('click', () => {
      Storage.resetAll();
      _currentIdx = 0;
      _renderAll();
    });
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => {
  if (typeof Auth !== 'undefined' && typeof Auth.bootstrap === 'function') {
    Auth.bootstrap(() => App.init());
    return;
  }

  App.init();
});
