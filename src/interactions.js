export function initInteractions() {
  initThemeToggle();
  initScrollProgress();
  initHamburgerMenu();
  initEmailCopy();
  initModals();
}

function initThemeToggle() {
  const html = document.documentElement;
  const toggle = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    if (toggle) {
      toggle.textContent = theme === 'dark' ? '☀' : '☽';
      toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
    try { localStorage.setItem('theme', theme); } catch(e) {}

    // Trigger custom event for cytoscape graph to update
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  }

  const current = html.getAttribute('data-theme') || 'dark';
  if (toggle) {
    toggle.textContent = current === 'dark' ? '☀' : '☽';
    toggle.setAttribute('aria-label', current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    toggle.addEventListener('click', function() {
      applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  try {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function(e) {
      let saved;
      try { saved = localStorage.getItem('theme'); } catch(err) {}
      if (!saved) applyTheme(e.matches ? 'light' : 'dark');
    });
  } catch(e) {}
}

function initScrollProgress() {
  const fill = document.getElementById('progress-fill');
  const rail = document.getElementById('progress-rail');
  const label = document.getElementById('progress-label');
  if (!fill) return;

  function update() {
    const el = document.scrollingElement || document.documentElement;
    const pct = el.scrollHeight - el.clientHeight > 0
      ? Math.min(100, Math.round((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100)) : 0;
    fill.style.width = pct + '%';
    if (rail) rail.setAttribute('aria-valuenow', String(pct));
    if (label) label.textContent = pct < 100 ? pct + '%' : '✓';
  }

  window.addEventListener('scroll', update, { passive: true });
  document.addEventListener('scroll', update, { passive: true });
  update();
}

function initHamburgerMenu() {
  const btn = document.getElementById('hamburger');
  const overlay = document.getElementById('mobile-nav-overlay');
  const close = document.getElementById('mobile-nav-close');
  if (!btn || !overlay) return;

  btn.addEventListener('click', function() {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (close) close.focus();
  });

  function closeMobileNav() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (close) close.addEventListener('click', closeMobileNav);

  const links = overlay.querySelectorAll('.mobile-nav-item');
  links.forEach(l => l.addEventListener('click', closeMobileNav));

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeMobileNav();
  });
}

function initEmailCopy() {
  const el = document.getElementById('email-copy-link');
  if (!el) return;
  const addr = ['alex', 'example.com'].join('@');
  el.addEventListener('click', function(e) {
    e.preventDefault();
    if (navigator.clipboard) navigator.clipboard.writeText(addr);
  });
}

function initModals() {
  initSiteDecisionsModal();
  initCaseStudyModals();
  initBottomSheet();
  initMobileMetaAccordion();
}

function initSiteDecisionsModal() {
  const modalSections = {
    research: {
      label: 'The research foundation — Sapir-Whorf & color cognition',
      prev: null, prevLabel: null,
      next: 'paper', nextLabel: 'Research paper format',
      html: `<p>The Sapir-Whorf hypothesis — in its weak, linguistic relativity formulation — proposes that the language available to you shapes how you perceive and categorize the world...</p>`
    },
    // Add other sections...
  };

  let currentSection = 'research';

  window.openModal = function() {
    const o = document.getElementById('modal-overlay');
    if (!o) return;
    o.classList.add('open');
    document.body.style.overflow = 'hidden';
    const bar = document.getElementById('modal-mobile-bar');
    if (bar) bar.style.display = window.innerWidth <= 768 ? 'flex' : 'none';
    initModalNav();
    const c = o.querySelector('.modal-close');
    if (c) setTimeout(() => c.focus(), 50);
  };

  window.closeModal = function() {
    const o = document.getElementById('modal-overlay');
    if (!o) return;
    o.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      window.closeModal();
      window.closeCaseModal();
    }
  });

  function initModalNav() {
    // Modal navigation logic
  }
}

function initCaseStudyModals() {
  const cases = {
    lexeme: {
      title: 'Lexeme',
      eyebrow: 'Case Study · Interconnectivity · 2024',
      themeColor: '#52d4d4',
      themeName: 'Interconnectivity',
      role: 'Lead Designer',
      context: 'Independent · 2024',
      tools: 'Figma, Storybook, Python',
      skills: ['UX Research', 'Systems Design', 'Linguistics'],
      outcome: 'Misclassification error ↓ 34%',
      body: '<div class="case-placeholder"><p>Project imagery placeholder<br/>Screenshots, diagrams, process docs</p></div><p class="case-section-label">Overview</p><p>Built on the insight that color category labels in different languages predict UI comprehension speed...</p>'
    },
    tractus: {
      title: 'Tractus',
      eyebrow: 'Case Study · Interaction · 2023',
      themeColor: '#cc5585',
      themeName: 'Interaction',
      role: 'Designer + Developer',
      context: 'Wellesley College · 2023',
      tools: 'D3.js, Figma, HCP dataset',
      skills: ['Data Viz', 'Neuroscience UX', 'Interaction Design'],
      outcome: 'Demo Day — Best Visualization',
      body: '<div class="case-placeholder"><p>Project imagery placeholder</p></div><p class="case-section-label">Overview</p><p>The challenge was translational, not technical...</p>'
    },
    mise: {
      title: 'Mise en Place',
      eyebrow: 'Case Study · Perception · 2023',
      themeColor: '#e0c040',
      themeName: 'Perception',
      role: 'Lead Designer',
      context: 'Boston Public Schools · 2023',
      tools: 'Figma, Swift / Xcode, Maze',
      skills: ['Product Design', 'Ed Tech', 'Mobile UX'],
      outcome: 'Task completion rate ↑ 28%',
      body: '<div class="case-placeholder"><p>Project imagery placeholder</p></div><p class="case-section-label">Overview</p><p>Designed around the parallel between kitchen preparation and working memory...</p>'
    }
  };

  window.openCaseModal = function(id) {
    const c = cases[id];
    const o = document.getElementById('case-modal-overlay');
    if (!c || !o) return;

    const ey = document.getElementById('case-modal-eyebrow');
    const ti = document.getElementById('case-modal-title');
    const meta = document.getElementById('case-modal-meta');
    const body = document.getElementById('case-modal-body');

    if (ey) ey.textContent = c.eyebrow;
    if (ti) ti.textContent = c.title;
    if (body) body.innerHTML = c.body;

    if (meta) {
      const pillsHtml = c.skills.map(s => `<span class="case-meta-pill">${s}</span>`).join('');
      const isMobile = window.innerWidth <= 768;
      meta.innerHTML = `<div class="case-meta-body">
        <div class="case-meta-item"><span class="case-meta-key">Role</span><span class="case-meta-val">${c.role}</span></div>
        <div class="case-meta-item"><span class="case-meta-key">Context</span><span class="case-meta-val">${c.context}</span></div>
        <div class="case-meta-divider"></div>
        <div class="case-meta-item"><span class="case-meta-key">Tools</span><span class="case-meta-val">${c.tools}</span></div>
        <div class="case-meta-item"><span class="case-meta-key">Skills</span><div class="case-meta-pills">${pillsHtml}</div></div>
        <div class="case-meta-divider"></div>
        <div class="case-meta-item"><span class="case-meta-key">Outcome</span><span class="case-meta-val">${c.outcome}</span></div>
      </div>`;
    }

    o.classList.add('open');
    document.body.style.overflow = 'hidden';
    const cl = o.querySelector('.case-modal-close');
    if (cl) setTimeout(() => cl.focus(), 50);
  };

  window.closeCaseModal = function() {
    const o = document.getElementById('case-modal-overlay');
    if (!o) return;
    o.classList.remove('open');
    document.body.style.overflow = '';
  };
}

function initBottomSheet() {
  const sheet = document.getElementById('cy-bottom-sheet');
  const body = document.getElementById('cy-sheet-body');
  const closeBtn = document.getElementById('cy-sheet-close-btn');
  if (!sheet) return;

  window.openBottomSheet = function(projectData) {
    if (!body) return;
    body.innerHTML = `
      <p style="font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:var(--text-lo);margin-bottom:6px;">${projectData.eyebrow}</p>
      <p style="font-family:'DM Serif Display',Georgia,serif;font-size:19px;color:var(--cream);margin-bottom:8px;">${projectData.title}</p>
      <p style="font-size:12px;color:var(--text-dim);line-height:1.65;margin-bottom:10px;">${projectData.summary}</p>
      <p style="font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:var(--text-lo);margin-bottom:4px;">Tools</p>
      <p style="font-size:11px;color:var(--text-dim);margin-bottom:8px;">${projectData.tools}</p>
      <p style="font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:var(--text-lo);margin-bottom:4px;">Outcome</p>
      <p style="font-size:11px;color:var(--text-dim);">${projectData.outcome}</p>
    `;
    sheet.classList.add('open');
  };

  window.closeBottomSheet = function() { sheet.classList.remove('open'); };
  if (closeBtn) closeBtn.addEventListener('click', window.closeBottomSheet);
}

function initMobileMetaAccordion() {
  function checkMobile() {
    const bar = document.getElementById('modal-mobile-bar');
    if (!bar) return;
    bar.style.display = window.innerWidth <= 768 ? 'flex' : 'none';
    const toggle = document.getElementById('case-meta-toggle');
    if (toggle) toggle.style.display = window.innerWidth <= 768 ? 'flex' : 'none';
  }
  checkMobile();
  window.addEventListener('resize', checkMobile);
}
