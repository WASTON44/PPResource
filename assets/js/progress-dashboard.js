/**
 * progress-dashboard.js
 * Renders the local student progress page for static hosting.
 */

(() => {
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatDate(timestamp) {
    if (!timestamp) return 'No activity yet';
    try {
      return new Date(timestamp).toLocaleString();
    } catch {
      return 'No activity yet';
    }
  }

  function getAllStepIds() {
    return COURSE_DATA.modules.flatMap(mod =>
      mod.lessons.flatMap(lesson =>
        lesson.steps.map(step => step.id)
      )
    );
  }

  function renderStats(users, reports) {
    const totalStudents = users.length;
    const activeStudents = reports.filter(report => report.completed > 0).length;
    const completedStudents = reports.filter(report => report.completed === report.total && report.total > 0).length;
    const averageProgress = reports.length === 0
      ? 0
      : Math.round(reports.reduce((sum, report) => sum + report.percent, 0) / reports.length);

    document.getElementById('statStudents').textContent = String(totalStudents);
    document.getElementById('statActive').textContent = String(activeStudents);
    document.getElementById('statComplete').textContent = String(completedStudents);
    document.getElementById('statAverage').textContent = `${averageProgress}%`;
  }

  function renderTable(users, reports) {
    const panel = document.getElementById('dashboardPanel');
    if (!panel) return;

    if (users.length === 0) {
      panel.innerHTML = `
        <div class="dashboard-empty">
          <h2>No student accounts found</h2>
          <p>No one has signed up in this browser yet. Accounts and progress on GitHub Pages remain local to the current browser.</p>
          <a class="btn btn-primary" href="../">Go to the course</a>
        </div>
      `;
      return;
    }

    const rows = users.map((user, index) => {
      const report = reports[index];
      return `
        <tr>
          <td>${escapeHtml(user.name)}</td>
          <td>${escapeHtml(user.studentId)}</td>
          <td>${escapeHtml(user.email)}</td>
          <td>${report.completed}/${report.total}</td>
          <td>${report.percent}%</td>
          <td>${escapeHtml(report.status)}</td>
          <td>${escapeHtml(report.lastStep || 'No step visited')}</td>
          <td>${escapeHtml(formatDate(report.lastActivityAt))}</td>
        </tr>
      `;
    }).join('');

    panel.innerHTML = `
      <div class="dashboard-table-wrap">
        <table class="dashboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Student ID</th>
              <th>Email</th>
              <th>Progress</th>
              <th>Percent</th>
              <th>Status</th>
              <th>Last Step</th>
              <th>Last Activity</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  }

  function init() {
    const validStepIds = getAllStepIds();
    const users = Auth.getAllUsers();
    const reports = users.map(user => Storage.getProgressReport(validStepIds, user.studentId));

    document.getElementById('dashboardCourseMeta').textContent =
      `${COURSE_DATA.modules.length} modules, ${validStepIds.length} total steps`;

    renderStats(users, reports);
    renderTable(users, reports);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
