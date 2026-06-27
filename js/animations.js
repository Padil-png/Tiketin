/* ============================================
   EventHive — Scroll Animations (Intersection Observer)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.05
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      } else {
        entry.target.classList.remove('revealed');
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      document.querySelectorAll('.revealed').forEach(el => el.classList.remove('revealed'));
    }
  });

  function observeAll() {
    const revealElements = document.querySelectorAll('.reveal:not(.revealed), .reveal-left:not(.revealed), .reveal-right:not(.revealed), .reveal-scale:not(.revealed)');
    revealElements.forEach(el => {
      observer.observe(el);
    });
  }

  // Initial observe
  observeAll();

  // Re-observe when new elements are added to the DOM (debounced)
  let mutationTimeout = null;
  const mutationObserver = new MutationObserver((mutations) => {
    // Only re-run if nodes were added
    const hasNewNodes = mutations.some(m => m.addedNodes.length > 0);
    if (hasNewNodes) {
      if (mutationTimeout) clearTimeout(mutationTimeout);
      mutationTimeout = setTimeout(() => {
        observeAll();
      }, 100);
    }
  });
  mutationObserver.observe(document.body, { childList: true, subtree: true });
});

/* ---- Ripple Effect Helper ---- */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn');
  if (!btn || btn.classList.contains('btn-ghost') || btn.classList.contains('btn-outline')) return;
  
  // Ensure button has relative positioning and overflow hidden
  btn.classList.add('ripple-container');
  
  const rect = btn.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const ripple = document.createElement('span');
  ripple.className = 'ripple-effect';
  
  // Calculate size based on button dimensions
  const diameter = Math.max(rect.width, rect.height);
  const radius = diameter / 2;
  
  ripple.style.width = ripple.style.height = `${diameter}px`;
  ripple.style.left = `${x - radius}px`;
  ripple.style.top = `${y - radius}px`;
  
  btn.appendChild(ripple);
  
  // Remove after animation
  setTimeout(() => {
    ripple.remove();
  }, 600);
});
