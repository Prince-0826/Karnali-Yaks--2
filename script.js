// ─── SCROLL HELPERS ───────────────────────────────────────────────────────────
// Each section has its own scrollable container.
// We find the closest scrollable ancestor of the clicked button.

function getScrollContainer(btn) {
  // Walk up the DOM to find a scrollable sibling container
  const section = btn.closest('section') || btn.closest('.section-header');
  if (!section) return null;

  // Priority order: card-1-group > card-group > archieve-cards
  return (
    section.querySelector('.card-1-group') ||
    section.querySelector('.card-group') ||
    section.querySelector('.archieve-cards') ||
    null
  );
}

// Attach events AFTER DOM is ready
document.addEventListener('DOMContentLoaded', () => {

  // ── Per-section scroll buttons ──────────────────────────────────────────────
  document.querySelectorAll('.btn-left').forEach(btn => {
    btn.addEventListener('click', () => {
      const container = getScrollContainer(btn);
      if (container) container.scrollBy({ left: -320, behavior: 'smooth' });
    });
  });

  document.querySelectorAll('.btn-right').forEach(btn => {
    btn.addEventListener('click', () => {
      const container = getScrollContainer(btn);
      if (container) container.scrollBy({ left: 320, behavior: 'smooth' });
    });
  });

  // ── Fixtures arrow buttons ───────────────────────────────────────────────────
  const fixtureWrapper = document.querySelector('.fixture-wrapper');
  const fixtureCard    = document.querySelector('.fixture-card');

  document.querySelectorAll('.arrow.left .btn-left').forEach(btn => {
    btn.addEventListener('click', () => {
      if (fixtureWrapper) fixtureWrapper.scrollBy({ left: -320, behavior: 'smooth' });
    });
  });

  document.querySelectorAll('.arrow.right .btn-right').forEach(btn => {
    btn.addEventListener('click', () => {
      if (fixtureWrapper) fixtureWrapper.scrollBy({ left: 320, behavior: 'smooth' });
    });
  });

  // ── Mobile nav: hide logo on very small screens if it overflows ─────────────
  const navLogo = document.querySelector('.nav-logo');
  function checkNavLogo() {
    if (navLogo) {
      navLogo.style.display = window.innerWidth < 480 ? 'none' : '';
    }
  }
  checkNavLogo();
  window.addEventListener('resize', checkNavLogo);
});

// Legacy inline onclick shims (kept for any remaining inline calls)
function scrollLeft()  { /* handled by event delegation above */ }
function scrollRight() { /* handled by event delegation above */ }

// ─── HAMBURGER MENU ───────────────────────────────────────────────────────────
function closeMobileNav() {
  const menu   = document.getElementById('mobileMenu');
  const toggle = document.getElementById('navToggle');
  if (menu)   menu.classList.remove('open');
  if (toggle) toggle.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('mobileMenu');
  const close  = document.getElementById('navClose');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }
  if (close) {
    close.addEventListener('click', closeMobileNav);
  }
});
