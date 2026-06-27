/* ============================================
   EventHive — Cart State Management
   ============================================ */

window.cart = {
  items: [],

  init: function() {
    this.load();
    this.updateBadge();
  },

  load: function() {
    const stored = localStorage.getItem('eventhive_cart');
    if (stored) {
      try {
        this.items = JSON.parse(stored);
      } catch (e) {
        this.items = [];
      }
    } else {
      this.items = [];
    }
  },

  save: function() {
    localStorage.setItem('eventhive_cart', JSON.stringify(this.items));
    this.updateBadge();
  },

  add: function(eventObj, tier, qty) {
    // Check if same item already in cart
    const existingIndex = this.items.findIndex(item => item.eventId === eventObj.id && item.tierName === tier.name);
    
    if (existingIndex > -1) {
      this.items[existingIndex].qty += qty;
    } else {
      this.items.push({
        eventId: eventObj.id,
        eventTitle: eventObj.title,
        eventImage: eventObj.image,
        eventDate: eventObj.date,
        eventVenue: eventObj.venue,
        tierName: tier.name,
        price: tier.price,
        qty: qty
      });
    }
    
    this.save();
    window.toast.show(window.i18n.t('detail.ticket.buy_btn') + ' Berhasil!', 'success');
  },

  remove: function(eventId, tierName) {
    this.items = this.items.filter(item => !(item.eventId === eventId && item.tierName === tierName));
    this.save();
  },

  clear: function() {
    this.items = [];
    this.save();
  },

  getTotalItems: function() {
    return this.items.reduce((total, item) => total + item.qty, 0);
  },

  getSubtotal: function() {
    return this.items.reduce((total, item) => total + (item.price * item.qty), 0);
  },

  updateBadge: function() {
    const badges = document.querySelectorAll('.cart-badge');
    const total = this.getTotalItems();
    
    badges.forEach(badge => {
      if (total > 0) {
        badge.textContent = total > 9 ? '9+' : total;
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    });
  },

  // Helper to format currency
  formatCurrency: function(amount) {
    if (amount === 0) return window.i18n.t('shared.free');
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  window.cart.init();
});
