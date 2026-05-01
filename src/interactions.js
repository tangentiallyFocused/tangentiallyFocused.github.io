export function initInteractions() {
  console.log('initInteractions called');
  initThemeToggle();
  initScrollProgress();
  initHamburgerMenu();
  initScrollToTop();
  // initEmailCopy(); // Removed - footer email now uses mailto: link instead of copy functionality
  initContactEmail();
  initModals();
  initGraphInfoTooltip();
  initNavShortcut();
  console.log('All interactions initialized');
  console.log('window.openModal:', typeof window.openModal);
  console.log('window.openCaseModal:', typeof window.openCaseModal);
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

function initScrollToTop() {
  const scrollBtn = document.getElementById('scroll-to-top');
  const footerScrollBtn = document.getElementById('footer-scroll-to-top');

  if (scrollBtn) {
    scrollBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (footerScrollBtn) {
    footerScrollBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

function initEmailCopy() {
  const el = document.getElementById('email-copy-link');
  if (!el) return;
  const addr = ['lbduquer', 'gmail.com'].join('@');
  el.addEventListener('click', function(e) {
    e.preventDefault();
    if (navigator.clipboard) navigator.clipboard.writeText(addr);
  });
}

function initContactEmail() {
  const btn = document.getElementById('footer-email-btn');
  if (!btn) return;
  const addr = ['lbduquer', 'gmail.com'].join('@');

  btn.addEventListener('click', function() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(addr);
      showCopiedFlash(btn);
    }
  });
}

function showCopiedFlash(button) {
  const flash = document.getElementById('email-copied-flash');
  if (!flash) return;

  // Show the flash message
  flash.classList.add('show');

  // Hide after animation
  setTimeout(() => {
    flash.classList.remove('show');
  }, 1500);
}

function initModals() {
  initSiteDecisionsModal();
  initCaseStudyModals();
  initBottomSheet();
  initMobileMetaAccordion();
  initMediaCarousel();
}

function initSiteDecisionsModal() {
  const modalSections = {
    research: {
      label: 'The research foundation — Sapir-Whorf & color cognition',
      prev: null, prevLabel: null,
      next: 'paper', nextLabel: 'Research paper format',
      html: '<p>The Sapir-Whorf hypothesis — in its weak, linguistic relativity formulation — proposes that the language available to you shapes how you perceive and categorize the world. Critically, this is not a deterministic claim. As you acquire new words, new languages, new conceptual frameworks, your perceptual space genuinely expands.</p><p>The Russian distinction between siniy (dark blue) and goluboy (light blue) as categorically separate hues is the clearest empirical case: Russian speakers don\'t merely name the boundary differently — they perceive it faster. Language didn\'t constrain them; it sharpened them.</p><div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:20px 0;"><div style="background:var(--surface);border:1px solid var(--border);border-left:2px solid #1B65C8;padding:18px 20px;"><p style="font-size:9px;letter-spacing:0.2em;color:var(--text-lo);text-transform:uppercase;margin-bottom:8px;">Russian — dark blue</p><p style="font-family:\'DM Serif Display\',Georgia,serif;font-size:32px;color:#1B65C8;line-height:1;margin-bottom:4px;">синий</p><p style="font-size:11px;color:var(--text-dim);font-style:italic;margin-bottom:12px;">/ ˈsʲinʲɪj / siniy</p><p style="font-size:11px;color:var(--text-dim);line-height:1.7;">Categorically distinct from goluboy — not a shade, a different word. Winawer et al. (2007) found Russian speakers discriminate cross-category blues faster, the advantage disappearing under verbal interference, directly implicating language labels.</p><p style="font-size:10px;color:var(--text-lo);margin-top:10px;padding-top:10px;border-top:1px solid var(--border);line-height:1.6;"><span style="color:var(--yellow-dim);">Design implication:</span> Collapsing siniy and goluboy into a single blue token removes a meaningful perceptual distinction for a significant portion of users.</p></div><div style="background:var(--surface);border:1px solid var(--border);border-left:2px solid #62C4E8;padding:18px 20px;"><p style="font-size:9px;letter-spacing:0.2em;color:var(--text-lo);text-transform:uppercase;margin-bottom:8px;">Russian — light blue</p><p style="font-family:\'DM Serif Display\',Georgia,serif;font-size:32px;color:#62C4E8;line-height:1;margin-bottom:4px;">голубой</p><p style="font-size:11px;color:var(--text-dim);font-style:italic;margin-bottom:12px;">/ ɡəlʊˈboj / goluboy</p><p style="font-size:11px;color:var(--text-dim);line-height:1.7;">A root-level color category, not a modifier. English lacks this lexicalized distinction — "light blue" is compositional — suggesting lower perceptual salience for English speakers at the boundary between these hues.</p><p style="font-size:10px;color:var(--text-lo);margin-top:10px;padding-top:10px;border-top:1px solid var(--border);line-height:1.6;"><span style="color:var(--yellow-dim);">Design implication:</span> Internationalized design systems may need language-specific token aliases that surface distinctions invisible in the source language of the team.</p></div></div><p>The broader argument: design systems encode the linguistic assumptions of the team that built them. This research is the intellectual basis for the CMY color system used throughout this portfolio.</p><p style="font-size:10px;color:var(--text-lo);font-style:italic;">Winawer, J. et al. (2007). Russian blues reveal effects of language on color discrimination. <em>PNAS</em>, 104(19).</p>'
    },
    paper: {
      label: 'Why it looks like a research paper',
      prev: 'research', prevLabel: 'Research foundation',
      next: 'cmy', nextLabel: 'CMY ink system',
      html: '<p>The journal format — masthead rule, thesis title, author byline, affiliation superscripts, metadata row, keywords — isn\'t a costume. It\'s the visual language I absorbed reading hundreds of cognitive science and linguistics papers. The "received / current revision" dates double as a quiet career timeline.</p>'
    },
    cmy: {
      label: 'The CMY ink system',
      prev: 'paper', prevLabel: 'Research paper format',
      next: 'shapes', nextLabel: 'Shapes',
      html: '<p>The palette is grounded in how printer ink actually works. Thin ink on paper is bright and transparent; layered ink becomes dark and saturated. The near-black background is what you get when all three inks pool together.</p><p>Crucially, the colors are semantic. <span style="color:var(--cyan);">Cyan signals interconnectivity</span> — structural links, affiliations, the connectome. <span style="color:var(--magenta);">Magenta signals interaction</span> — every button, link, and touchable element. <span style="color:var(--yellow);">Yellow signals perception</span> — it highlights terms that reframe how you read what follows.</p>'
    },
    shapes: {
      label: 'Shapes — sharp rectangles vs. pills',
      prev: 'cmy', prevLabel: 'CMY ink system',
      next: 'flashcard', nextLabel: 'Flashcard format',
      html: '<p>Sharp rectangles for all interactive elements (buttons, nav links, bordered tags). Pills for passive labels (keyword chips, skill tags). The shape is part of the semantic system: sharp = do something, round = read something.</p>'
    },
    flashcard: {
      label: 'The flashcard format',
      prev: 'shapes', prevLabel: 'Shapes',
      next: 'themes', nextLabel: 'Three themes',
      html: '<p>Flashcards are the oldest empirically supported spaced-repetition tool — an honest format for a designer rooted in education. The 5:7 aspect ratio matches a physical index card. The card back uses the recipe-card structure: scannable key/value pairs for the recruiter in a hurry, an expand button for the one who wants more.</p>'
    },
    themes: {
      label: 'The three themes and their order',
      prev: 'flashcard', prevLabel: 'Flashcard format',
      next: 'typeface', nextLabel: 'Typeface',
      html: '<p>Interconnectivity → Interaction → Perception is a progression: first you are in relationship (interconnectivity), then something happens within that relationship (interaction), then meaning is constructed (perception). It maps onto how cognition works — and onto cyan, magenta, and yellow.</p>'
    },
    typeface: {
      label: 'Typeface',
      prev: 'themes', prevLabel: 'Three themes',
      next: null, nextLabel: null,
      html: '<p>IBM Plex Mono throughout. It\'s a humanist monospace — warmer and more readable at paragraph length than JetBrains Mono (optimized for code editors). DM Serif Display for headings — its italic is genuinely beautiful. The pairing creates productive tension between the rigorous and the expressive.</p>'
    }
  };

  let currentSection = 'research';

  window.showModalSection = function(id) {
    const s = modalSections[id];
    if (!s) return;
    currentSection = id;
    const area = document.getElementById('modal-content-area');
    if (area) {
      let navHtml = '';
      if (s.prev || s.next) {
        navHtml = '<div class="modal-next">' +
          (s.prev ? '<button class="modal-next-btn" onclick="showModalSection(\'' + s.prev + '\')">↑ Back: ' + s.prevLabel + '</button>' : '<span></span>') +
          (s.next ? '<button class="modal-next-btn" onclick="showModalSection(\'' + s.next + '\')">Next: ' + s.nextLabel + ' ↓</button>' : '') +
          '</div>';
      }
      area.innerHTML = '<div class="modal-section">' +
        '<p class="modal-section-label">' + s.label + '</p>' +
        s.html +
        navHtml +
        '</div>';
    }

    document.querySelectorAll('.modal-nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-section') === id);
    });
    document.querySelectorAll('.modal-mobile-dd-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-section') === id);
    });
    const cur = document.getElementById('modal-mobile-current');
    if (cur) cur.textContent = s.label.length > 28 ? s.label.substring(0, 26) + '…' : s.label;
  };

  function initModalNav() {
    const btns = document.querySelectorAll('.modal-nav-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', function() {
        window.showModalSection(btn.getAttribute('data-section'));
      });
    });

    const dd = document.getElementById('modal-mobile-dd');
    const toggle = document.getElementById('modal-mobile-toggle');
    const current = document.getElementById('modal-mobile-current');
    let ddOpen = false;
    if (toggle && dd) {
      const newToggle = toggle.cloneNode(true);
      toggle.parentNode.replaceChild(newToggle, toggle);
      newToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        ddOpen = !ddOpen;
        dd.classList.toggle('open', ddOpen);
        newToggle.textContent = ddOpen ? 'Sections ∧' : 'Sections ∨';
      });
      dd.querySelectorAll('.modal-mobile-dd-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          window.showModalSection(btn.getAttribute('data-section'));
          if (current) current.textContent = btn.textContent;
          dd.querySelectorAll('.modal-mobile-dd-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          ddOpen = false;
          dd.classList.remove('open');
          newToggle.textContent = 'Sections ∨';
        });
      });
    }
    window.showModalSection('research');
  }

  window.openModal = function() {
    console.log('openModal called');
    const o = document.getElementById('modal-overlay');
    console.log('modal-overlay element:', o);
    if (!o) {
      console.error('modal-overlay not found!');
      return;
    }
    o.classList.add('open');
    document.body.style.overflow = 'hidden';
    const bar = document.getElementById('modal-mobile-bar');
    if (bar) bar.style.display = window.innerWidth <= 768 ? 'flex' : 'none';
    initModalNav();
    const c = o.querySelector('.modal-close');
    if (c) setTimeout(() => c.focus(), 50);
    console.log('Modal opened successfully');
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
    console.log('openCaseModal called with id:', id);
    const c = cases[id];
    const o = document.getElementById('case-modal-overlay');
    console.log('case:', c, 'overlay:', o);
    if (!c || !o) {
      console.error('Case or overlay not found!', 'case:', c, 'overlay:', o);
      return;
    }

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

function initMediaCarousel() {
  let currentMediaIndex = 0;

  window.openMediaCarousel = function() {
    const overlay = document.getElementById('media-carousel-overlay');
    const title = document.getElementById('media-carousel-title');
    if (!overlay || !window.currentProjectMedia) return;

    currentMediaIndex = 0;
    if (title && window.currentProjectMedia.title) {
      title.textContent = window.currentProjectMedia.title;
    }

    updateMediaDisplay();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeMediaCarousel = function() {
    const overlay = document.getElementById('media-carousel-overlay');
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  window.nextMedia = function() {
    if (!window.currentProjectMedia) return;
    if (currentMediaIndex < window.currentProjectMedia.files.length - 1) {
      currentMediaIndex++;
      updateMediaDisplay();
    }
  };

  window.prevMedia = function() {
    if (currentMediaIndex > 0) {
      currentMediaIndex--;
      updateMediaDisplay();
    }
  };

  function getMediaType(file) {
    // Check if it's a URL
    if (file.startsWith('http://') || file.startsWith('https://')) {
      return 'iframe';
    }

    // Check file extension
    const ext = file.split('.').pop().toLowerCase();
    const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
    const pdfExts = ['pdf'];
    const videoExts = ['mp4', 'webm', 'ogg'];

    if (imageExts.includes(ext)) return 'image';
    if (pdfExts.includes(ext)) return 'pdf';
    if (videoExts.includes(ext)) return 'video';

    // Default to iframe for unknown types (can handle PowerPoint via Google Docs viewer)
    return 'iframe';
  }

  function updateMediaDisplay() {
    if (!window.currentProjectMedia) return;

    const container = document.querySelector('.media-carousel-main');
    const counter = document.getElementById('media-carousel-counter');
    const prevBtn = document.getElementById('media-nav-prev');
    const nextBtn = document.getElementById('media-nav-next');

    const files = window.currentProjectMedia.files;
    const alts = window.currentProjectMedia.alt;
    const currentFile = files[currentMediaIndex];
    const mediaType = getMediaType(currentFile);

    // Clear existing content and rebuild based on media type
    if (container) {
      const existingMedia = container.querySelector('img, iframe, video');
      if (existingMedia) existingMedia.remove();

      let mediaElement;

      if (mediaType === 'image') {
        mediaElement = document.createElement('img');
        mediaElement.id = 'media-carousel-img';
        mediaElement.src = currentFile;
        mediaElement.alt = alts[currentMediaIndex] || '';
      } else if (mediaType === 'video') {
        mediaElement = document.createElement('video');
        mediaElement.id = 'media-carousel-video';
        mediaElement.src = currentFile;
        mediaElement.controls = true;
      } else if (mediaType === 'pdf') {
        mediaElement = document.createElement('iframe');
        mediaElement.id = 'media-carousel-iframe';
        mediaElement.src = currentFile;
        mediaElement.title = alts[currentMediaIndex] || 'PDF document';
      } else if (mediaType === 'iframe') {
        mediaElement = document.createElement('iframe');
        mediaElement.id = 'media-carousel-iframe';
        mediaElement.src = currentFile;
        mediaElement.title = alts[currentMediaIndex] || 'External content';
      }

      if (mediaElement) {
        container.insertBefore(mediaElement, counter);
      }
    }

    if (counter) {
      counter.textContent = `${currentMediaIndex + 1} / ${files.length}`;
    }

    if (prevBtn) {
      prevBtn.disabled = currentMediaIndex === 0;
    }

    if (nextBtn) {
      nextBtn.disabled = currentMediaIndex === files.length - 1;
    }
  }

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    const overlay = document.getElementById('media-carousel-overlay');
    if (e.key === 'Escape' && overlay && overlay.classList.contains('open')) {
      window.closeMediaCarousel();
      e.preventDefault(); // Signal that ESC was handled by modal
    }
  });

  // Arrow key navigation
  document.addEventListener('keydown', function(e) {
    const overlay = document.getElementById('media-carousel-overlay');
    if (overlay && overlay.classList.contains('open')) {
      if (e.key === 'ArrowLeft') {
        window.prevMedia();
      } else if (e.key === 'ArrowRight') {
        window.nextMedia();
      }
    }
  });
}

function initGraphInfoTooltip() {
  const icon = document.getElementById('cy-info-icon');
  const tooltip = document.getElementById('cy-info-tooltip');

  if (!icon || !tooltip) return;

  let isLocked = false; // Track if tooltip is locked (clicked) vs temporary (hovered)

  function showTooltip() {
    tooltip.classList.add('visible');
  }

  function hideTooltip() {
    if (!isLocked) {
      tooltip.classList.remove('visible');
    }
  }

  function closeTooltip() {
    isLocked = false;
    tooltip.classList.remove('visible');
  }

  // Show tooltip on hover or focus (temporary)
  icon.addEventListener('mouseenter', showTooltip);
  icon.addEventListener('focus', showTooltip);

  // Hide tooltip on mouse leave or blur (only if not locked)
  icon.addEventListener('mouseleave', hideTooltip);
  icon.addEventListener('blur', hideTooltip);

  // Click to lock/unlock tooltip
  icon.addEventListener('click', (e) => {
    e.stopPropagation();
    if (tooltip.classList.contains('visible') && isLocked) {
      // Already locked and visible → unlock and close
      closeTooltip();
    } else {
      // Lock tooltip open
      isLocked = true;
      showTooltip();
    }
  });

  // Close tooltip when clicking outside
  document.addEventListener('click', (e) => {
    if (!icon.contains(e.target) && !tooltip.contains(e.target)) {
      closeTooltip();
    }
  });

  // ESC key closes tooltip
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && tooltip.classList.contains('visible')) {
      closeTooltip();
      e.preventDefault(); // Signal that ESC was handled by tooltip
    }
  });

  // Expose state for external checks (e.g., graph ESC handler)
  window.isGraphTooltipOpen = () => tooltip.classList.contains('visible');
}

function initNavShortcut() {
  document.addEventListener('keydown', (e) => {
    // Don't interfere with typing in inputs/textareas
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    // Shift + / (which produces "?")
    // Note: On some keyboards, Shift+/ produces "?" so check both
    if (e.shiftKey && (e.key === '/' || e.key === '?')) {
      e.preventDefault();

      // Find first nav link and focus it (no scrolling)
      const firstNavLink = document.querySelector('.top-nav a');
      if (firstNavLink) {
        firstNavLink.focus();
      }
    }
  });
}
