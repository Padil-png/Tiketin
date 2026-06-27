/* ============================================
   EventHive — i18n (Internationalization)
   ============================================ */

const translations = {
  id: {
    // Navbar
    "nav.home": "Beranda",
    "nav.events": "Jelajahi",
    "nav.create": "Buat Event",
    "nav.dashboard": "Dashboard",
    "nav.login": "Masuk / Daftar",
    "nav.logout": "Keluar",
    
    // Home Page
    "home.hero.badge": "Platform Tiket #1 di Indonesia",
    "home.hero.title": "Temukan Event Terbaik di Sekitarmu",
    "home.hero.subtitle": "Beli tiket konser, workshop, seminar, dan festival dengan mudah. Bergabung dengan ribuan orang untuk pengalaman tak terlupakan.",
    "home.hero.search_placeholder": "Cari nama event, artis, atau kategori...",
    "home.stats.events": "Event Aktif",
    "home.stats.users": "Pengguna",
    "home.stats.tickets": "Tiket Terjual",
    "home.category.title": "Jelajahi Kategori",
    "home.featured.title": "Event Sedang Tren",
    "home.featured.see_all": "Lihat Semua Event",
    
    // Browse Page
    "browse.title": "Jelajahi Semua Event",
    "browse.subtitle": "Temukan berbagai event menarik dari berbagai kategori",
    "browse.filter.category": "Semua Kategori",
    "browse.filter.date": "Kapan Saja",
    "browse.filter.price": "Semua Harga",
    "browse.filter.sort": "Urutkan: Terbaru",
    "browse.no_results": "Tidak ada event yang ditemukan",
    "browse.no_results_desc": "Coba ubah kata kunci pencarian atau filter Anda.",
    
    // Detail Page
    "detail.about": "Tentang Event",
    "detail.time": "Waktu Pelaksanaan",
    "detail.location": "Lokasi & Venue",
    "detail.rundown": "Rundown Acara",
    "detail.lineup": "Lineup & Pembicara",
    "detail.ticket.title": "Pilih Tiket",
    "detail.ticket.sold_out": "Habis Terjual",
    "detail.ticket.left": "Tersisa",
    "detail.ticket.total": "Total:",
    "detail.ticket.buy_btn": "Beli Tiket",
    
    // Shared
    "shared.free": "Gratis",
    "shared.starts_from": "Mulai dari",
    
    // Auth & Create Event (snippets)
    "auth.login.title": "Selamat Datang Kembali",
    "create.step1": "Info Dasar",
    "create.step2": "Waktu & Lokasi",
    "create.step3": "Rundown",
    "create.step4": "Tiket",
    "create.step5": "Media & Review",
  },
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.events": "Explore",
    "nav.create": "Create Event",
    "nav.dashboard": "Dashboard",
    "nav.login": "Login / Register",
    "nav.logout": "Logout",
    
    // Home Page
    "home.hero.badge": "#1 Ticketing Platform in Indonesia",
    "home.hero.title": "Discover the Best Events Near You",
    "home.hero.subtitle": "Buy tickets for concerts, workshops, seminars, and festivals easily. Join thousands of people for unforgettable experiences.",
    "home.hero.search_placeholder": "Search event name, artist, or category...",
    "home.stats.events": "Active Events",
    "home.stats.users": "Users",
    "home.stats.tickets": "Tickets Sold",
    "home.category.title": "Explore Categories",
    "home.featured.title": "Trending Events",
    "home.featured.see_all": "See All Events",
    
    // Browse Page
    "browse.title": "Explore All Events",
    "browse.subtitle": "Find exciting events from various categories",
    "browse.filter.category": "All Categories",
    "browse.filter.date": "Anytime",
    "browse.filter.price": "Any Price",
    "browse.filter.sort": "Sort by: Newest",
    "browse.no_results": "No events found",
    "browse.no_results_desc": "Try changing your search keywords or filters.",
    
    // Detail Page
    "detail.about": "About Event",
    "detail.time": "Time & Date",
    "detail.location": "Location & Venue",
    "detail.rundown": "Event Schedule",
    "detail.lineup": "Lineup & Speakers",
    "detail.ticket.title": "Select Tickets",
    "detail.ticket.sold_out": "Sold Out",
    "detail.ticket.left": "Left",
    "detail.ticket.total": "Total:",
    "detail.ticket.buy_btn": "Buy Tickets",
    
    // Shared
    "shared.free": "Free",
    "shared.starts_from": "Starts from",
    
    // Auth & Create Event (snippets)
    "auth.login.title": "Welcome Back",
    "create.step1": "Basic Info",
    "create.step2": "Time & Location",
    "create.step3": "Schedule",
    "create.step4": "Tickets",
    "create.step5": "Media & Review",
  }
};

// Language State
let currentLang = localStorage.getItem('eventhive_lang') || 'id';

// Initialize i18n
function initI18n() {
  updateContent();
  setupLanguageToggles();
}

// Update all DOM elements with data-i18n
function updateContent() {
  document.documentElement.lang = currentLang;
  
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang] && translations[currentLang][key]) {
      // For inputs with placeholders
      if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
        el.placeholder = translations[currentLang][key];
      } else {
        el.textContent = translations[currentLang][key];
      }
    }
  });
}

// Get a specific translation string
function t(key) {
  return translations[currentLang][key] || key;
}

// Set language and update UI
function setLanguage(lang) {
  if (lang !== 'id' && lang !== 'en') return;
  
  currentLang = lang;
  localStorage.setItem('eventhive_lang', lang);
  updateContent();
  
  // Dispatch custom event for other scripts
  document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  
  // Update toggle buttons UI
  document.querySelectorAll('.lang-option').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Setup toggle buttons
function setupLanguageToggles() {
  const toggles = document.querySelectorAll('.lang-option');
  
  // Set initial active state
  toggles.forEach(btn => {
    if (btn.getAttribute('data-lang') === currentLang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
    
    // Click event
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
    });
  });
}

// Export for other modules if using modules, otherwise attached to window in simple setup
window.i18n = {
  init: initI18n,
  t: t,
  setLang: setLanguage,
  getLang: () => currentLang
};

// Auto init on DOM load
document.addEventListener('DOMContentLoaded', initI18n);
