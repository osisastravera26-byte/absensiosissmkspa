/**
 * Main App Utilities
 */

const App = {
  // Get today's date in YYYY-MM-DD format
  getTodayDate() {
    return new Date().toISOString().split('T')[0];
  },

  // Format date to Indonesian locale
  formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  // Format date short (untuk tampilan)
  formatDateShort(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('id-ID', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  },

  // Format time
  formatTime(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('id-ID');
  },

  // Show alert notification
  showAlert(type, message, duration = 4000) {
    const container = document.getElementById('alertContainer') || this.createAlertContainer();
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.top = '80px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    alertDiv.style.minWidth = '300px';
    alertDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    container.appendChild(alertDiv);
    
    if (duration > 0) {
      setTimeout(() => alertDiv.remove(), duration);
    }
  },

  createAlertContainer() {
    const container = document.createElement('div');
    container.id = 'alertContainer';
    document.body.appendChild(container);
    return container;
  },

  // Check admin session
  isAdminLoggedIn() {
    return sessionStorage.getItem('adminLogged') === 'true';
  },

  loginAdmin() {
    sessionStorage.setItem('adminLogged', 'true');
  },

  logoutAdmin() {
    sessionStorage.removeItem('adminLogged');
  },

  // Redirect if not logged in
  checkAdminAuth() {
    if (!this.isAdminLoggedIn()) {
      window.location.href = 'admin-login.html';
    }
  },

  // Generate random code
  generateRandomCode(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  },

  // Download as JSON
  downloadJSON(data, filename) {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // Download as CSV
  downloadCSV(data, filename) {
    let csv = '';
    
    if (Array.isArray(data) && data.length > 0) {
      // Header
      const headers = Object.keys(data[0]);
      csv = headers.join(',') + '\n';
      
      // Data
      data.forEach(row => {
        const values = headers.map(header => {
          const value = row[header];
          // Escape quotes and wrap in quotes if contains comma
          if (typeof value === 'string' && value.includes(',')) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        });
        csv += values.join(',') + '\n';
      });
    }

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  toggleSideMenu() {
    const menu = document.getElementById('sideMenu');
    const overlay = document.getElementById('sideMenuOverlay');
    if (!menu || !overlay) return;

    const isOpen = menu.classList.toggle('open');
    overlay.classList.toggle('open', isOpen);
    menu.setAttribute('aria-hidden', !isOpen);
  },

  closeSideMenu() {
    const menu = document.getElementById('sideMenu');
    const overlay = document.getElementById('sideMenuOverlay');
    if (!menu || !overlay) return;

    menu.classList.remove('open');
    overlay.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
  }
};
