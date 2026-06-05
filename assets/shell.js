/* ============================================================
   GOINDIGO SHELL.JS — SHARED CHROME + INTERACTIONS
   ============================================================ */
(function () {
  'use strict';

  const PAGES = [
    { href: 'index.html', label: 'Home', short: '00', meta: 'COMMAND DECK' },
    { href: 'how-it-works.html', label: 'How It Works', short: '01', meta: 'PROTOCOL · T+24H' },
    { href: 'skills.html', label: 'Skills', short: '02', meta: 'AGENT CAPABILITIES' },
    { href: 'peer-review.html', label: 'Peer Review', short: '03', meta: 'FIELD AUDITS' },
    { href: 'results.html', label: 'Results', short: '04', meta: 'VERIFIED · GOOGLE' },
    { href: 'vs-competitors.html', label: 'VS Competitors', short: '05', meta: 'FIELD COMPARISON' },
    { href: 'contact.html', label: 'Contact', short: '06', meta: 'OPEN A CHANNEL' },
  ];

  const REPLIT_URL = 'https://create-repl-danielt51.replit.app/login';
  const CURRENT = location.pathname.split('/').pop() || 'index.html';
  const PAGE_NAME = (() => {
    const p = PAGES.find(x => CURRENT === x.href || (CURRENT === '' && x.href === 'index.html'));
    return p ? p.label.toUpperCase() : 'PAGE';
  })();

  /* ── UTC CLOCK ── */
  function utcClock() {
    const now = new Date();
    return now.toISOString().slice(11, 19) + ' UTC';
  }
  function startClock(selectors) {
    function tick() {
      const t = utcClock();
      selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => { el.textContent = t; });
      });
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ── META STRIP ── */
  function renderMeta() {
    const strip = document.getElementById('meta-strip');
    if (!strip) return;
    strip.innerHTML = `
      <span class="meta-strip__item">SYS GOINDIGO/2026.04</span>
      <span class="meta-strip__sep">|</span>
      <span class="meta-strip__item">NODE 0X · ${PAGE_NAME}</span>
      <span class="meta-strip__sep">|</span>
      <span class="meta-strip__item"><span class="dot"></span>STATUS OPERATIONAL</span>
      <span class="meta-strip__sep">|</span>
      <span class="meta-strip__item">AGENT RUNNING</span>
      <span class="meta-strip__clock js-clock"></span>
    `;
  }

  /* ── NAV ── */
  function renderNav() {
    const nav = document.getElementById('site-nav');
    if (!nav) return;
    nav.innerHTML = `
      <a href="index.html" class="nav-brand">
        <div class="eye-glyph"></div>
        <span class="nav-brand__name">GOINDIGO</span>
      </a>
      <div></div>
      <div class="nav-actions">
        <a href="${REPLIT_URL}" class="nav-login">Client Login</a>
        <a href="contact.html" class="btn btn-primary" style="height:36px;padding:0 18px;font-size:11px;"><span>Get Started</span></a>
        <button class="ham" id="ham-btn" aria-expanded="false" aria-label="Toggle menu">
          <span class="ham__bar"></span>
          <span class="ham__bar"></span>
          <span class="ham__bar"></span>
        </button>
      </div>
    `;
    nav.classList.add('site-nav');
  }

  /* ── HAMBURGER MENU ── */
  function renderMenu() {
    const existing = document.getElementById('menu-overlay');
    if (existing) return;
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    overlay.id = 'menu-overlay';

    const inner = document.createElement('div');
    inner.className = 'menu-overlay__inner';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'menu-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.id = 'menu-close';
    overlay.appendChild(closeBtn);

    PAGES.forEach(p => {
      const isActive = CURRENT === p.href || (CURRENT === '' && p.href === 'index.html');
      const a = document.createElement('a');
      a.href = p.href;
      a.className = 'menu-item' + (isActive ? ' menu-item--active' : '');
      a.innerHTML = `
        <span class="menu-item__num">/${p.short}</span>
        <span class="menu-item__label">${p.label}</span>
        <span class="menu-item__meta">${p.meta}</span>
      `;
      inner.appendChild(a);
    });

    overlay.appendChild(inner);
    document.body.appendChild(overlay);
  }

  /* ── MENU TOGGLE ── */
  function bindMenu() {
    const hamBtn = document.getElementById('ham-btn');
    const overlay = document.getElementById('menu-overlay');
    const closeBtn = document.getElementById('menu-close');
    if (!hamBtn || !overlay) return;

    function open() {
      document.documentElement.setAttribute('data-open', 'true');
      hamBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      document.documentElement.setAttribute('data-open', 'false');
      hamBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    function toggle() {
      const isOpen = document.documentElement.getAttribute('data-open') === 'true';
      isOpen ? close() : open();
    }

    hamBtn.addEventListener('click', toggle);
    closeBtn?.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    overlay.querySelectorAll('.menu-item').forEach(a => {
      a.addEventListener('click', () => { close(); });
    });
  }

  /* ── FOOTER ── */
  function renderFooter() {
    const footer = document.getElementById('site-footer');
    if (!footer) return;
    footer.innerHTML = `
      <div class="wrap">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="footer-brand__name">GOINDIGO</div>
            <p class="footer-brand__tag">Autonomous Google Ads agent. Builds campaigns from scratch. Monitors CPA 24/7. Flat monthly fee.</p>
          </div>
          <div class="footer-col">
            <div class="footer-col__head">Product</div>
            <div class="footer-col__links">
              <a href="how-it-works.html">How It Works</a>
              <a href="skills.html">Skills</a>
              <a href="peer-review.html">Peer Review</a>
              <a href="results.html">Results</a>
              <a href="vs-competitors.html">VS Competitors</a>
            </div>
          </div>
          <div class="footer-col">
            <div class="footer-col__head">Company</div>
            <div class="footer-col__links">
              <a href="contact.html">Contact</a>
              <a href="privacy.html">Privacy Policy</a>
              <a href="terms.html">Terms of Service</a>
              <a href="${REPLIT_URL}">Client Login</a>
            </div>
          </div>
          <div class="footer-col">
            <div class="footer-col__head">Coordinates</div>
            <div class="footer-col__links">
              <a href="#" style="pointer-events:none;color:var(--fg-3)">VER 2026.04</a>
              <a href="#" style="pointer-events:none;color:var(--fg-3)">REGION US-EAST</a>
              <a href="#" style="pointer-events:none;color:var(--fg-3)">NODE ACTIVE</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span class="footer-copy">2026 GOINDIGO. NOT AFFILIATED WITH GOOGLE LLC. GOOGLE ADS IS A TRADEMARK OF GOOGLE LLC.</span>
          <span class="footer-clock js-clock"></span>
        </div>
      </div>
    `;
    footer.classList.add('site-footer');
  }

  /* ── BACKGROUND GRID ── */
  function renderBgGrid() {
    if (document.querySelector('.bg-grid')) return;
    const grid = document.createElement('div');
    grid.className = 'bg-grid';
    document.body.insertBefore(grid, document.body.firstChild);
  }

  /* ── SCROLL REVEALS ── */
  function initReveals() {
    const els = document.querySelectorAll('.rv');
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
  }

  /* ── TICKER DUPLICATION ── */
  function initTicker() {
    const track = document.querySelector('.ticker-track');
    if (!track) return;
    const clone = track.innerHTML;
    track.innerHTML += clone;
  }

  /* ── INIT ── */
  function init() {
    renderMeta();
    renderNav();
    renderMenu();
    renderFooter();
    renderBgGrid();
    startClock(['.js-clock']);
    bindMenu();

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initReveals();
        initTicker();
      });
    } else {
      initReveals();
      initTicker();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
