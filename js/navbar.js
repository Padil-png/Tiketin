/* ============================================
   EventHive — Navbar & Core UI Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const scrollTopBtn = document.querySelector('.scroll-top-btn');
  
  // ---- Navbar Scroll Effect ----
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
      if (scrollTopBtn) scrollTopBtn.classList.add('visible');
    } else {
      navbar.classList.remove('scrolled');
      if (scrollTopBtn) scrollTopBtn.classList.remove('visible');
    }
  }
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
  
  // ---- Mobile Menu Toggle ----
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking links
    const mobileLinks = mobileMenu.querySelectorAll('.nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
  
  // ---- Scroll to Top ----
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // ---- Profile Dropdown ----
  const profileBtn = document.querySelector('.profile-btn');
  const profileDropdown = document.querySelector('.profile-dropdown');
  
  if (profileBtn && profileDropdown) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      profileDropdown.classList.toggle('active');
    });
    
    document.addEventListener('click', (e) => {
      if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
        profileDropdown.classList.remove('active');
      }
    });
  }
  
  // ---- Mobile Search Button ----
  const mobileSearchBtn = document.querySelector('.mobile-icon-btn[aria-label="Search"]');
  if (mobileSearchBtn) {
    mobileSearchBtn.addEventListener('click', () => {
      openMobileSearch();
    });
  }

  // ---- Authentication State Check ----
  updateAuthUI();

  // ---- Login Modal Interceptor ----
  document.body.addEventListener('click', (e) => {
    const authLink = e.target.closest('a[href^="auth.html"]');
    if (authLink) {
      // Create and show modal instead of navigating
      e.preventDefault();
      openLoginModal();
    }
  });
});
function openMobileSearch() {
  let overlay = document.getElementById('mobile-search-overlay');
  if (!overlay) {
    const html = `
      <div id="mobile-search-overlay" class="mobile-search-overlay">
        <div class="mobile-search-bar">
          <form action="events.html" method="GET" class="mobile-search-form">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" name="q" id="mobile-search-input" placeholder="Cari event, artis, kota..." autocomplete="off">
            <button type="button" class="mobile-search-close" onclick="closeMobileSearch()">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </form>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
    overlay = document.getElementById('mobile-search-overlay');

    // Close when tapping backdrop
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeMobileSearch();
    });
  }

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    document.getElementById('mobile-search-input').focus();
  }, 100);
}

window.closeMobileSearch = function() {
  const overlay = document.getElementById('mobile-search-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function openLoginModal() {
  let modal = document.getElementById('login-modal');
  if (!modal) {
    const modalHTML = `
      <div id="login-modal" class="modal-overlay">
        <div class="modal-content">
          <button class="modal-close" onclick="closeLoginModal()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <div class="auth-logo" style="text-align: center; margin-bottom: 24px;">
            <div class="logo-icon mx-auto" style="width: 48px; height: 48px; background: var(--gradient-violet-cyan); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; margin: 0 auto 16px;">🐝</div>
            <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 4px;">Masuk</h2>
            <p style="color: var(--slate-500); font-size: 14px;">Silakan masuk ke akun Anda</p>
          </div>
          <form id="fake-login-form" class="auth-form" style="display: flex; flex-direction: column; gap: 16px;">
            <div class="form-group" style="display: flex; flex-direction: column; gap: 8px;">
              <label style="font-size: 14px; font-weight: 600; color: var(--slate-700);">Username</label>
              <input type="text" id="fake-username" class="form-input" style="padding: 12px 16px; border: 1px solid var(--slate-200); border-radius: 8px;" placeholder="Username" required>
            </div>
            <div class="form-group" style="display: flex; flex-direction: column; gap: 8px;">
              <label style="font-size: 14px; font-weight: 600; color: var(--slate-700);">Password</label>
              <input type="password" id="fake-password" class="form-input" style="padding: 12px 16px; border: 1px solid var(--slate-200); border-radius: 8px;" placeholder="Password" required>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; border-radius: 8px; margin-top: 8px; border: none; background: var(--primary-600); color: white; font-weight: bold; cursor: pointer;">Masuk</button>
            
            <div style="margin-top: 16px; padding: 12px; background: var(--slate-50); border-radius: 8px; font-size: 12px; color: var(--slate-600); text-align: center;">
              <strong>Test Account:</strong><br>Username: PADIL<br>Password: 12345
            </div>
          </form>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    modal = document.getElementById('login-modal');
    
    document.getElementById('fake-login-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.getElementById('fake-username').value;
      const pass = document.getElementById('fake-password').value;
      if (user.toLowerCase() === 'padil' && pass === '12345') {
        localStorage.setItem('eventhive_session', JSON.stringify({ name: 'Padil', email: 'padil@example.com' }));
        window.location.reload();
      } else {
        alert('Username atau password salah! Gunakan PADIL dan 12345');
      }
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeLoginModal();
    });
  }
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

window.closeLoginModal = function() {
  const modal = document.getElementById('login-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Update Navbar UI based on Login State
function updateAuthUI() {
  const isLoggedIn = localStorage.getItem('eventhive_session') !== null;
  const user = JSON.parse(localStorage.getItem('eventhive_session') || '{}');
  
  const loginLinks = document.querySelectorAll('.nav-login-link');
  const profileBtns = document.querySelectorAll('.profile-container');
  const createLinks = document.querySelectorAll('.nav-create-link');
  
  if (isLoggedIn) {
    // Show profile, hide login
    loginLinks.forEach(el => el.classList.add('hidden'));
    profileBtns.forEach(el => {
      el.classList.remove('hidden');
    });
    // Ensure create event goes to form, not auth
    createLinks.forEach(el => {
      el.href = 'create-event.html';
      el.classList.remove('hidden');
    });
    // Redirect mobile profile icon to dashboard
    const mobileProfileIcon = document.querySelector('.mobile-only-icon[aria-label="Profile"]');
    if (mobileProfileIcon) mobileProfileIcon.href = 'dashboard.html';
  } else {
    // Show login, hide profile
    loginLinks.forEach(el => el.classList.remove('hidden'));
    profileBtns.forEach(el => el.classList.add('hidden'));
    // Redirect create event to auth page if not logged in
    createLinks.forEach(el => {
      el.href = 'auth.html?redirect=create-event.html';
    });
    // Redirect mobile profile icon to auth page
    const mobileProfileIcon = document.querySelector('.mobile-only-icon[aria-label="Profile"]');
    if (mobileProfileIcon) mobileProfileIcon.href = 'auth.html';
  }
  
  // Setup logout listener
  const logoutBtns = document.querySelectorAll('.logout-btn');
  logoutBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('eventhive_session');
      window.toast.show('Berhasil keluar', 'success');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    });
  });
}

// ---- Toast Notification System ----
window.toast = {
  show: function(message, type = 'info', duration = 3000) {
    // Create container if not exists
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} toast-enter`;
    
    // Icon based on type
    let icon = '';
    if (type === 'success') icon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
    else if (type === 'error') icon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
    else if (type === 'warning') icon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>';
    else icon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
    
    toast.innerHTML = `
      <div style="color: var(--${type === 'error' ? 'error' : type === 'warning' ? 'warning' : type === 'success' ? 'success' : 'info'})">${icon}</div>
      <div class="toast-message">${message}</div>
      <div class="toast-close">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </div>
    `;
    
    container.appendChild(toast);
    
    // Setup close button
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => removeToast(toast));
    
    // Auto remove
    setTimeout(() => {
      if (document.body.contains(toast)) {
        removeToast(toast);
      }
    }, duration);
  }
};

function removeToast(toast) {
  toast.classList.remove('toast-enter');
  toast.classList.add('toast-exit');
  setTimeout(() => {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, 300);
}
