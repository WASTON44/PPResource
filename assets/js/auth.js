/**
 * auth.js
 * Browser-local student signup/login for static hosting.
 * This is suitable for GitHub Pages demos, not secure multi-user production auth.
 */

const Auth = (() => {
  const USERS_KEY = 'c_course_users_v1';
  const SESSION_KEY = 'c_course_session_v1';
  const QUB_EMAIL_RE = /^[A-Za-z0-9._%+-]+@qub\.ac\.uk$/i;
  const STORAGE_TEST_KEY = '__c_course_storage_test__';

  let _bound = false;
  let _appStarted = false;

  function _storageAvailable() {
    try {
      localStorage.setItem(STORAGE_TEST_KEY, '1');
      localStorage.removeItem(STORAGE_TEST_KEY);
      return true;
    } catch {
      return false;
    }
  }

  function _loadUsers() {
    try {
      const raw = localStorage.getItem(USERS_KEY);
      const users = raw ? JSON.parse(raw) : [];
      return Array.isArray(users) ? users : [];
    } catch {
      return [];
    }
  }

  function _saveUsers(users) {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      return true;
    } catch {
      return false;
    }
  }

  function _normalizeStudentId(studentId) {
    return String(studentId || '').trim().toUpperCase();
  }

  function _normalizeEmail(email) {
    return String(email || '').trim().toLowerCase();
  }

  function _setSession(studentId) {
    try {
      localStorage.setItem(SESSION_KEY, studentId);
      return true;
    } catch {}
    return false;
  }

  function _clearSession() {
    try {
      localStorage.removeItem(SESSION_KEY);
      return true;
    } catch {}
    return false;
  }

  function _loadSessionStudentId() {
    try {
      return localStorage.getItem(SESSION_KEY);
    } catch {
      return null;
    }
  }

  function isQubEmail(email) {
    return QUB_EMAIL_RE.test(_normalizeEmail(email));
  }

  function getAllUsers() {
    return _loadUsers()
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name) || a.studentId.localeCompare(b.studentId));
  }

  function getCurrentUser() {
    const sessionStudentId = _loadSessionStudentId();
    if (!sessionStudentId) return null;

    const user = _loadUsers().find(entry => entry.studentId === sessionStudentId) || null;
    if (!user) _clearSession();
    return user;
  }

  function signUp({ name, studentId, email }) {
    const cleanName = String(name || '').trim();
    const cleanStudentId = _normalizeStudentId(studentId);
    const cleanEmail = _normalizeEmail(email);

    if (!cleanName || !cleanStudentId || !cleanEmail) {
      return { ok: false, message: 'Enter your full name, student ID, and QUB email.' };
    }

    if (!isQubEmail(cleanEmail)) {
      return { ok: false, message: 'Only QUB email addresses ending in @qub.ac.uk can sign up.' };
    }

    if (!_storageAvailable()) {
      return { ok: false, message: 'This browser is blocking local storage. Enable site storage before signing up.' };
    }

    const users = _loadUsers();
    if (users.some(user => user.studentId === cleanStudentId)) {
      return { ok: false, message: 'That student ID is already registered in this browser.' };
    }

    if (users.some(user => user.email === cleanEmail)) {
      return { ok: false, message: 'That email is already registered in this browser.' };
    }

    const user = {
      name: cleanName,
      studentId: cleanStudentId,
      email: cleanEmail,
      createdAt: Date.now()
    };

    users.push(user);
    if (!_saveUsers(users)) {
      return { ok: false, message: 'Your account could not be saved in this browser. Check site storage settings and try again.' };
    }

    if (!_setSession(cleanStudentId)) {
      return { ok: false, message: 'Your account was saved, but this browser blocked sign-in. Enable site storage and try logging in again.' };
    }

    return { ok: true, user };
  }

  function login({ studentId, email }) {
    const cleanStudentId = _normalizeStudentId(studentId);
    const cleanEmail = _normalizeEmail(email);

    if (!cleanStudentId || !cleanEmail) {
      return { ok: false, message: 'Enter both your student ID and QUB email.' };
    }

    if (!isQubEmail(cleanEmail)) {
      return { ok: false, message: 'Log in with a QUB email address.' };
    }

    if (!_storageAvailable()) {
      return { ok: false, message: 'This browser is blocking local storage. Enable site storage before logging in.' };
    }

    const user = _loadUsers().find(entry =>
      entry.studentId === cleanStudentId && entry.email === cleanEmail
    );

    if (!user) {
      return { ok: false, message: 'No matching student account was found in this browser.' };
    }

    if (!_setSession(user.studentId)) {
      return { ok: false, message: 'This browser blocked your login session. Enable site storage and try again.' };
    }

    return { ok: true, user };
  }

  function logout() {
    _clearSession();
  }

  function _setFeedback(message, type = 'info') {
    const feedback = document.getElementById('authFeedback');
    if (!feedback) return;

    if (!message) {
      feedback.textContent = '';
      feedback.className = 'auth-feedback';
      return;
    }

    feedback.textContent = message;
    feedback.className = `auth-feedback auth-feedback-${type}`;
  }

  function _showPanel(panelId) {
    const signupPanel = document.getElementById('signupPanel');
    const loginPanel = document.getElementById('loginPanel');
    const signupTab = document.getElementById('signupTab');
    const loginTab = document.getElementById('loginTab');

    if (!signupPanel || !loginPanel || !signupTab || !loginTab) return;

    const showSignup = panelId === 'signupPanel';
    signupPanel.classList.toggle('is-hidden', !showSignup);
    loginPanel.classList.toggle('is-hidden', showSignup);
    signupTab.classList.toggle('active', showSignup);
    loginTab.classList.toggle('active', !showSignup);
    signupTab.setAttribute('aria-selected', showSignup ? 'true' : 'false');
    loginTab.setAttribute('aria-selected', showSignup ? 'false' : 'true');
    _setFeedback('');
  }

  function _renderCurrentUser(user) {
    const summary = document.getElementById('authUserSummary');
    if (!summary || !user) return;
    summary.innerHTML = `
      <span class="auth-user-name">${_escapeHtml(user.name)}</span>
      <span class="auth-user-meta">${_escapeHtml(user.studentId)} | ${_escapeHtml(user.email)}</span>
    `;
  }

  function _escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function _showAuthShell() {
    const authShell = document.getElementById('authShell');
    const appLayout = document.getElementById('appLayout');
    if (authShell) authShell.hidden = false;
    if (appLayout) appLayout.hidden = true;
    _setFeedback('');
  }

  function _enterCourse(user, onAuthenticated) {
    const authShell = document.getElementById('authShell');
    const appLayout = document.getElementById('appLayout');

    _renderCurrentUser(user);
    if (authShell) authShell.hidden = true;
    if (appLayout) appLayout.hidden = false;

    if (!_appStarted && typeof onAuthenticated === 'function') {
      _appStarted = true;
      onAuthenticated();
    }
  }

  function _bindUi(onAuthenticated) {
    if (_bound) return;
    _bound = true;

    document.querySelectorAll('.auth-tab').forEach(button => {
      button.addEventListener('click', () => _showPanel(button.dataset.authTarget));
    });

    const signupForm = document.getElementById('signupPanel');
    if (signupForm) {
      signupForm.addEventListener('submit', event => {
        event.preventDefault();
        const result = signUp({
          name: document.getElementById('signupName')?.value,
          studentId: document.getElementById('signupStudentId')?.value,
          email: document.getElementById('signupEmail')?.value
        });

        if (!result.ok) {
          _setFeedback(result.message, 'error');
          return;
        }

        _setFeedback('Account created. Loading your course...', 'success');
        _enterCourse(result.user, onAuthenticated);
      });
    }

    const loginForm = document.getElementById('loginPanel');
    if (loginForm) {
      loginForm.addEventListener('submit', event => {
        event.preventDefault();
        const result = login({
          studentId: document.getElementById('loginStudentId')?.value,
          email: document.getElementById('loginEmail')?.value
        });

        if (!result.ok) {
          _setFeedback(result.message, 'error');
          return;
        }

        _setFeedback('Login successful. Loading your saved progress...', 'success');
        _enterCourse(result.user, onAuthenticated);
      });
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        logout();
        window.location.reload();
      });
    }
  }

  function bootstrap(onAuthenticated) {
    const authShell = document.getElementById('authShell');
    if (!authShell) {
      if (typeof onAuthenticated === 'function') onAuthenticated();
      return;
    }

    _bindUi(onAuthenticated);

    const user = getCurrentUser();
    if (user) {
      _enterCourse(user, onAuthenticated);
      return;
    }

    _showAuthShell();
    _showPanel(_loadUsers().length > 0 ? 'loginPanel' : 'signupPanel');

    if (!_storageAvailable()) {
      _setFeedback('This browser is blocking local storage. Sign up and login will not work until site storage is enabled.', 'error');
    }
  }

  return {
    bootstrap,
    getAllUsers,
    getCurrentUser,
    isQubEmail,
    login,
    logout,
    signUp
  };
})();
