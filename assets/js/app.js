/**
 * app.js
 * Main application controller.
 * Orchestrates navigation, step rendering, quiz checking, and code execution.
 */

const App = (() => {
  // ─── State ────────────────────────────────────────────────────────────────
  let _allSteps = [];     // flat array of all steps across all modules/lessons
  let _currentIdx = 0;   // index into _allSteps

  // ─── Init ─────────────────────────────────────────────────────────────────

  function init() {
    _buildStepIndex();
    _restoreProgress();
    _renderAll();
    _bindStaticEvents();
  }

  /**
   * Build a flat ordered list of {step, moduleId, lessonId} for navigation.
   */
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

  /**
   * Restore the last-visited step from localStorage.
   */
  function _restoreProgress() {
    const lastId = Storage.getLastStep();
    if (lastId) {
      const idx = _allSteps.findIndex(s => s.step.id === lastId);
      if (idx !== -1) _currentIdx = idx;
    }
  }

  // ─── Rendering ────────────────────────────────────────────────────────────

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

    // Sidebar click navigation
    sidebar.querySelectorAll('.sidebar-step').forEach(el => {
      el.addEventListener('click', () => _navigateToStepId(el.dataset.stepId));
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') _navigateToStepId(el.dataset.stepId);
      });
    });
  }

  function _renderProgressBar() {
    const bar = document.getElementById('progressArea');
    if (!bar) return;
    const total = _allSteps.length;
    const completed = Storage.countCompleted();
    bar.innerHTML = UI.buildProgressBar(completed, total);
  }

  function _renderStep(idx) {
    Editor.destroy();

    if (idx < 0 || idx >= _allSteps.length) return;
    _currentIdx = idx;
    const { step } = _allSteps[idx];

    Storage.saveLastStep(step.id);

    const panel = document.getElementById('mainPanel');
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
        // Pre-load C runtime in the background when first coding step appears
        Runner.preload();
        break;
    }

    _updateNavButtons();
    _updateStepIndicator();
    _renderSidebar();
    _renderProgressBar();

    // Scroll main area to top
    panel.scrollTop = 0;
    document.getElementById('mainArea').scrollTop = 0;
  }

  // ─── Event binding ────────────────────────────────────────────────────────

  function _bindStaticEvents() {
    document.getElementById('prevBtn').addEventListener('click', _goPrev);
    document.getElementById('nextBtn').addEventListener('click', _goNext);
    document.getElementById('toggleSidebarBtn').addEventListener('click', _toggleSidebar);

    // Keyboard shortcuts
    document.addEventListener('keydown', e => {
      if (e.target.closest('.CodeMirror')) return; // don't intercept editor keys
      if (e.key === 'ArrowRight' && !e.ctrlKey) _goNext();
      if (e.key === 'ArrowLeft' && !e.ctrlKey) _goPrev();
    });
  }

  function _bindContentEvents(step) {
    const btn = document.getElementById('markReadBtn');
    if (!btn) return;
    if (Storage.isStepComplete(step.id)) {
      btn.textContent = 'Read ✔';
      btn.disabled = true;
      btn.classList.add('btn-success');
    }
    btn.addEventListener('click', () => {
      Storage.markStepComplete(step.id);
      btn.textContent = 'Read ✔';
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
    if (!form || !submitBtn) return;

    // Enable submit button when an option is selected
    form.querySelectorAll('input[type=radio]').forEach(radio => {
      radio.addEventListener('change', () => {
        submitBtn.disabled = false;
      });
    });

    submitBtn.addEventListener('click', e => {
      e.preventDefault();
      const selected = form.querySelector('input[type=radio]:checked');
      if (!selected) return;

      const chosenIdx = parseInt(selected.value, 10);
      const correct = chosenIdx === step.correct;

      // Visual feedback on options
      form.querySelectorAll('.quiz-option').forEach((el, i) => {
        el.querySelector('input').disabled = true;
        if (i === step.correct) el.classList.add('correct');
        else if (i === chosenIdx && !correct) el.classList.add('incorrect');
      });

      feedback.style.display = 'block';
      if (correct) {
        feedback.className = 'quiz-feedback correct-fb';
        feedback.innerHTML = `<strong>✅ Correct!</strong> ${UI.escapeHtml(step.explanation)}`;
        Storage.markStepComplete(step.id);
        submitBtn.textContent = 'Correct ✔';
        submitBtn.classList.add('btn-success');
        submitBtn.disabled = true;
        _onStepComplete();
      } else {
        feedback.className = 'quiz-feedback incorrect-fb';
        feedback.innerHTML = `<strong>❌ Not quite.</strong> Try to think about each option carefully.`;
        submitBtn.textContent = 'Submit Answer';
        submitBtn.disabled = true;
        // Re-enable after a short delay so they can try again
        setTimeout(() => {
          submitBtn.disabled = false;
          form.querySelectorAll('input[type=radio]').forEach(r => { r.disabled = false; });
          form.querySelectorAll('.quiz-option').forEach(el => {
            el.classList.remove('correct', 'incorrect');
          });
          feedback.style.display = 'none';
        }, 2000);
      }
    });
  }

  function _bindCodeEvents(step, alreadyComplete) {
    // Initialise the code editor
    const container = document.getElementById('editorContainer');
    if (container) {
      Editor.init(container, step.starter_code || '');
    }

    // Reset button
    const resetBtn = document.getElementById('resetCodeBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        Editor.setValue(step.starter_code || '');
        const consoleEl = document.getElementById('consoleOutput');
        if (consoleEl) consoleEl.innerHTML = '<span class="console-placeholder">Output will appear here after you run your code.</span>';
      });
    }

    // Hint button
    const hintBtn = document.getElementById('showHintBtn');
    const hintBox = document.getElementById('hintBox');
    if (hintBtn && hintBox) {
      hintBtn.addEventListener('click', () => {
        hintBox.style.display = hintBox.style.display === 'none' ? 'block' : 'none';
        hintBtn.textContent = hintBox.style.display === 'none' ? '💡 Hint' : '🙈 Hide Hint';
      });
    }

    // Clear console
    const clearBtn = document.getElementById('clearConsoleBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        const consoleEl = document.getElementById('consoleOutput');
        if (consoleEl) consoleEl.innerHTML = '<span class="console-placeholder">Console cleared.</span>';
      });
    }

    // Run button
    const runBtn = document.getElementById('runCodeBtn');
    const runBtnText = document.getElementById('runBtnText');
    if (runBtn) {
      if (alreadyComplete) {
        runBtn.classList.add('btn-run-done');
      }
      runBtn.addEventListener('click', async () => {
        const code = Editor.getValue();
        if (!code.trim()) return;

        runBtn.disabled = true;
        if (runBtnText) runBtnText.textContent = '⏳ Running...';

        const consoleEl = document.getElementById('consoleOutput');
        if (consoleEl) consoleEl.innerHTML = '<span class="console-placeholder">Running…</span>';

        let result;
        try {
          result = await Runner.run(code);
        } catch (e) {
          result = { output: '', exitCode: 1, error: e.message };
        }

        runBtn.disabled = false;
        if (runBtnText) runBtnText.textContent = '▶ Run Code';

        if (consoleEl) UI.showConsoleResult(result, consoleEl);

        // Auto-check output if exercise has expected output
        if (!alreadyComplete && step.expected_output !== undefined) {
          _checkExercise(step, result);
        }
      });
    }
  }

  // ─── Exercise auto-checking ───────────────────────────────────────────────

  function _checkExercise(step, result) {
    const passEl = document.getElementById('passStatus');
    if (result.error) {
      if (passEl) passEl.innerHTML = '⚠ Fix the errors above and try again.';
      return;
    }

    const actual = (result.output || '').trim();
    const expected = (step.expected_output || '').trim();
    let passed = false;

    switch (step.check_mode) {
      case 'exact':
        passed = actual === expected;
        break;
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
      default:
        passed = actual === expected;
    }

    if (passed) {
      if (passEl) {
        passEl.className = 'pass-badge';
        passEl.innerHTML = step.completion_message || '✅ Exercise complete!';
      }
      Storage.markStepComplete(step.id);

      const runBtn = document.getElementById('runCodeBtn');
      if (runBtn) runBtn.classList.add('btn-run-done');

      _onStepComplete();
    } else {
      if (passEl) {
        const diffHtml = _buildDiff(actual, expected);
        passEl.className = 'fail-badge';
        passEl.innerHTML = `❌ Output doesn't match. ${diffHtml}`;
      }
    }
  }

  /**
   * Build a simple diff display between actual and expected output.
   */
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

  // ─── Navigation ───────────────────────────────────────────────────────────

  function _onStepComplete() {
    _updateNavButtons();
    _updateStepIndicator();
    _renderSidebar();
    _renderProgressBar();

    // Auto-advance after a short delay
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
    if (!prevBtn || !nextBtn) return;

    const isFirst = _currentIdx === 0;
    const isLast = _currentIdx === _allSteps.length - 1;
    const currentComplete = Storage.isStepComplete(_allSteps[_currentIdx].step.id);

    prevBtn.disabled = isFirst;

    // Next is gated until the current step is complete
    nextBtn.disabled = isLast || !currentComplete;

    if (isLast && currentComplete) {
      nextBtn.textContent = '🏆 Course Complete!';
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
    if (_currentIdx < _allSteps.length - 1) {
      const current = _allSteps[_currentIdx];
      if (Storage.isStepComplete(current.step.id)) {
        _renderStep(_currentIdx + 1);
      }
    }
  }

  function _navigateToStepId(id) {
    const idx = _allSteps.findIndex(s => s.step.id === id);
    if (idx !== -1) _renderStep(idx);
  }

  function _toggleSidebar() {
    const layout = document.getElementById('appLayout');
    if (layout) layout.classList.toggle('sidebar-collapsed');
    setTimeout(() => Editor.refresh(), 300);
  }

  function _showCompletionScreen() {
    const panel = document.getElementById('mainPanel');
    panel.innerHTML = `
      <div class="completion-screen">
        <div class="completion-icon">🏆</div>
        <h1>Course Complete!</h1>
        <p>Congratulations — you've completed <strong>${UI.escapeHtml(COURSE_DATA.title)}</strong>.</p>
        <p>You've covered:</p>
        <ul>
          <li>✅ C program structure and syntax</li>
          <li>✅ Displaying output with printf()</li>
          <li>✅ Variables and data types</li>
          <li>✅ if/else decision making</li>
          <li>✅ for and while loops</li>
        </ul>
        <p>You're ready to move on to functions, arrays, and pointers!</p>
        <button class="btn btn-primary" id="restartBtn">Start Over</button>
      </div>`;

    document.getElementById('restartBtn').addEventListener('click', () => {
      Storage.resetAll();
      _currentIdx = 0;
      _renderAll();
    });
  }

  return { init };
})();

// Bootstrap when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
