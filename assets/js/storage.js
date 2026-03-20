/**
 * storage.js
 * Manages learner progress via localStorage, keyed per signed-in student.
 */

const Storage = (() => {
  const PROGRESS_PREFIX = 'c_course_progress_v2_';
  const LAST_STEP_PREFIX = 'c_course_last_step_v2_';

  function _resolveStudentId(studentId) {
    if (studentId) return String(studentId).trim().toUpperCase();

    if (typeof Auth !== 'undefined' && typeof Auth.getCurrentUser === 'function') {
      const currentUser = Auth.getCurrentUser();
      return currentUser ? String(currentUser.studentId).trim().toUpperCase() : null;
    }

    return null;
  }

  function _progressKey(studentId) {
    const resolvedId = _resolveStudentId(studentId);
    return resolvedId ? `${PROGRESS_PREFIX}${resolvedId}` : null;
  }

  function _lastStepKey(studentId) {
    const resolvedId = _resolveStudentId(studentId);
    return resolvedId ? `${LAST_STEP_PREFIX}${resolvedId}` : null;
  }

  function _load(studentId) {
    const key = _progressKey(studentId);
    if (!key) return {};

    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  function _save(data, studentId) {
    const key = _progressKey(studentId);
    if (!key) return;

    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // Storage quota exceeded or private browsing.
    }
  }

  function _getLatestTimestamp(data) {
    return Object.values(data).reduce((latest, entry) => {
      if (!entry || typeof entry.timestamp !== 'number') return latest;
      return Math.max(latest, entry.timestamp);
    }, 0);
  }

  function markStepComplete(stepId, studentId) {
    const data = _load(studentId);
    data[stepId] = { completed: true, timestamp: Date.now() };
    _save(data, studentId);
  }

  function isStepComplete(stepId, studentId) {
    const data = _load(studentId);
    return !!(data[stepId] && data[stepId].completed);
  }

  function getCompletedSteps(studentId) {
    const data = _load(studentId);
    return Object.keys(data).filter(key => data[key] && data[key].completed);
  }

  function getLastStep(studentId) {
    const key = _lastStepKey(studentId);
    if (!key) return null;

    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function saveLastStep(stepId, studentId) {
    const key = _lastStepKey(studentId);
    if (!key) return;

    try {
      localStorage.setItem(key, stepId);
    } catch {}
  }

  function resetAll(studentId) {
    const progressKey = _progressKey(studentId);
    const lastStepKey = _lastStepKey(studentId);

    try {
      if (progressKey) localStorage.removeItem(progressKey);
      if (lastStepKey) localStorage.removeItem(lastStepKey);
    } catch {}
  }

  function countCompleted(validStepIds, studentId) {
    const completed = getCompletedSteps(studentId);
    if (!Array.isArray(validStepIds) || validStepIds.length === 0) {
      return completed.length;
    }

    const validIds = new Set(validStepIds);
    return completed.filter(stepId => validIds.has(stepId)).length;
  }

  function getProgressReport(validStepIds, studentId) {
    const totalSteps = Array.isArray(validStepIds) ? validStepIds.length : 0;
    const completed = countCompleted(validStepIds, studentId);
    const rawData = _load(studentId);
    const percent = totalSteps > 0 ? Math.round((completed / totalSteps) * 100) : 0;

    return {
      studentId: _resolveStudentId(studentId),
      completed,
      total: totalSteps,
      percent,
      lastStep: getLastStep(studentId),
      lastActivityAt: _getLatestTimestamp(rawData),
      status: completed === 0 ? 'Not started' : (completed === totalSteps ? 'Complete' : 'In progress')
    };
  }

  return {
    countCompleted,
    getCompletedSteps,
    getLastStep,
    getProgressReport,
    isStepComplete,
    markStepComplete,
    resetAll,
    saveLastStep
  };
})();
