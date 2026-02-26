/**
 * storage.js
 * Manages all learner progress via localStorage.
 * Progress is keyed by course version so new versions start fresh.
 */

const Storage = (() => {
  const STORAGE_KEY = 'c_course_progress_v1';

  function _load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  function _save(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Storage quota exceeded or private browsing — fail silently
    }
  }

  /**
   * Mark a step as complete.
   * @param {string} stepId
   */
  function markStepComplete(stepId) {
    const data = _load();
    data[stepId] = { completed: true, timestamp: Date.now() };
    _save(data);
  }

  /**
   * Check if a step is complete.
   * @param {string} stepId
   * @returns {boolean}
   */
  function isStepComplete(stepId) {
    const data = _load();
    return !!(data[stepId] && data[stepId].completed);
  }

  /**
   * Get all completed step IDs.
   * @returns {string[]}
   */
  function getCompletedSteps() {
    const data = _load();
    return Object.keys(data).filter(k => data[k] && data[k].completed);
  }

  /**
   * Get the last-visited step ID (for resume on refresh).
   * @returns {string|null}
   */
  function getLastStep() {
    try {
      return localStorage.getItem(STORAGE_KEY + '_last');
    } catch {
      return null;
    }
  }

  /**
   * Save the current step ID for resume.
   * @param {string} stepId
   */
  function saveLastStep(stepId) {
    try {
      localStorage.setItem(STORAGE_KEY + '_last', stepId);
    } catch {}
  }

  /**
   * Reset all progress (for development/testing).
   */
  function resetAll() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_KEY + '_last');
    } catch {}
  }

  /**
   * Count total completed steps.
   * @returns {number}
   */
  function countCompleted() {
    return getCompletedSteps().length;
  }

  return {
    markStepComplete,
    isStepComplete,
    getCompletedSteps,
    getLastStep,
    saveLastStep,
    resetAll,
    countCompleted
  };
})();
