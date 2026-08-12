/* ============================================================
   MAIN.JS — ZORRO Industries Group Limited
   Vanilla JS only. No dependencies.
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Loader ---------- */
  const loader = document.querySelector('.loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('is-hidden'), 250);
  });

  /* ---------- Sticky header on scroll ---------- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');

    backToTop.classList.toggle('is-visible', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile nav drawer ---------- */
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.nav-drawer');
  const scrim = document.querySelector('.nav-scrim');

  function closeDrawer() {
    hamburger.classList.remove('is-open');
    drawer.classList.remove('is-open');
    scrim.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
  function toggleDrawer() {
    const willOpen = !drawer.classList.contains('is-open');
    hamburger.classList.toggle('is-open', willOpen);
    drawer.classList.toggle('is-open', willOpen);
    scrim.classList.toggle('is-open', willOpen);
    hamburger.setAttribute('aria-expanded', String(willOpen));
  }
  hamburger.addEventListener('click', toggleDrawer);
  scrim.addEventListener('click', closeDrawer);
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a, .nav-drawer a');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => navObserver.observe(s));

  /* ---------- Scroll reveal (fade up / left / right / zoom) ---------- */
  const revealTargets = document.querySelectorAll('[data-aos]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------- Animated counters (hero stats) ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      el.textContent = '0' + suffix;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach(el => countObserver.observe(el));

  /* ---------- Gallery filter ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('hidden', !match);
      });
    });
  });

  /* ---------- Gallery lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbIconWrap = lightbox.querySelector('.lightbox-icon');
    const lbCaption = lightbox.querySelector('.lightbox-caption');
    const lbClose = lightbox.querySelector('.lightbox-close');
    const lbPrev = lightbox.querySelector('.lightbox-prev');
    const lbNext = lightbox.querySelector('.lightbox-next');
    let lastFocused = null;

    function visibleItems() {
      return Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
    }

    function openLightbox(item) {
      const items = visibleItems();
      const index = items.indexOf(item);
      lightbox.dataset.index = index;
      renderLightbox(items, index);
      lastFocused = document.activeElement;
      lightbox.hidden = false;
      lbClose.focus();
      document.body.style.overflow = 'hidden';
    }

    function renderLightbox(items, index) {
      const item = items[index];
      if (!item) return;
      const icon = item.querySelector('i');
      lbIconWrap.innerHTML = icon ? `<i class="${icon.className}"></i>` : '';
      lbCaption.textContent = item.dataset.caption || item.querySelector('span')?.textContent || '';
    }

    function closeLightbox() {
      lightbox.hidden = true;
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    }

    function step(dir) {
      const items = visibleItems();
      let index = parseInt(lightbox.dataset.index, 10) || 0;
      index = (index + dir + items.length) % items.length;
      lightbox.dataset.index = index;
      renderLightbox(items, index);
    }

    galleryItems.forEach(item => item.addEventListener('click', () => openLightbox(item)));
    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', () => step(-1));
    lbNext.addEventListener('click', () => step(1));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
  }

  /* ---------- Back to top ---------- */
  const backToTop = document.querySelector('.back-to-top');
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Current year in footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
