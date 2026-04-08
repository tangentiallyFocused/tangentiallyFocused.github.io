export function initCytoscapeGraph(cytoscape) {
  if (!document.getElementById('cy')) return;

  const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

  // Project sidebar data
  const projectSidebarData = {
    'p-lx': {
      eyebrow: 'Interconnectivity · 2024',
      title: 'Lexeme',
      summary: 'Built on the insight that color category labels in different languages predict UI comprehension speed — and that most design systems encode the assumptions of their source language without knowing it.',
      tools: 'Figma, Storybook, Python',
      method: ['1. Mapped color terms across 6 languages', '2. Identified collapse points in tokens', '3. Built language-aware token aliases', '4. A/B tested with bilingual cohorts'],
      outcome: 'Misclassification error ↓ 34%',
      theme: 'Language × Perception',
      themeColor: 'var(--cyan-dim)',
      caseId: 'lexeme'
    },
    'p-tr': {
      eyebrow: 'Interaction · 2023',
      title: 'Tractus',
      summary: 'The challenge was translational, not technical — making tractography data navigable for clinicians and policy makers who had never seen a connectome before.',
      tools: 'D3.js, Figma, HCP dataset',
      method: ['1. Studied tractography literature', '2. Mapped expert vs. lay mental models', '3. Designed progressive disclosure layers', '4. Tested with 3 neuroscientist pairs'],
      outcome: 'Demo Day — Best Visualization',
      theme: 'Brain × Communication',
      themeColor: 'var(--magenta-dim)',
      caseId: 'tractus'
    },
    'p-mp': {
      eyebrow: 'Perception · 2023',
      title: 'Mise en Place',
      summary: 'Designed around the parallel between kitchen preparation and working memory — mise en place as a physical externalization of executive function, reframed for kids who resist academic formats.',
      tools: 'Figma, Swift / Xcode, Maze',
      method: ['1. Reviewed exec function literature', '2. Co-designed with 3 teachers', '3. Two prototype + test rounds', '4. Piloted 12 classrooms, 8 weeks'],
      outcome: 'Task completion rate ↑ 28%',
      theme: 'Cooking × Cognition',
      themeColor: 'var(--yellow-dim)',
      caseId: 'mise'
    }
  };

  // Node and edge data
  const nodeData = [
    { id: 't-ic', label: 'Interconnectivity', type: 'theme', color: 'cyan' },
    { id: 't-in', label: 'Interaction',        type: 'theme', color: 'magenta' },
    { id: 't-pe', label: 'Perception',         type: 'theme', color: 'yellow' },
    { id: 'p-lx', label: 'Lexeme',             type: 'project' },
    { id: 'p-tr', label: 'Tractus',            type: 'project' },
    { id: 'p-mp', label: 'Mise en Place',      type: 'project' },
    { id: 's-ux', label: 'UX Research',        type: 'skill' },
    { id: 's-dv', label: 'Data Viz',           type: 'skill' },
    { id: 's-sy', label: 'Systems Design',     type: 'skill' },
    { id: 's-et', label: 'Ed Tech',            type: 'skill' },
    { id: 's-li', label: 'Linguistics',        type: 'skill' },
    { id: 's-ix', label: 'Interaction Design', type: 'skill' },
  ];

  const edgeData = [
    { source: 'p-lx', target: 't-ic' }, { source: 'p-tr', target: 't-in' },
    { source: 'p-mp', target: 't-pe' }, { source: 'p-lx', target: 't-pe' },
    { source: 'p-mp', target: 't-in' }, { source: 's-ux', target: 'p-lx' },
    { source: 's-ux', target: 'p-mp' }, { source: 's-dv', target: 'p-tr' },
    { source: 's-dv', target: 'p-lx' }, { source: 's-sy', target: 'p-lx' },
    { source: 's-et', target: 'p-mp' }, { source: 's-li', target: 'p-lx' },
    { source: 's-ix', target: 'p-tr' }, { source: 's-ix', target: 'p-mp' },
    { source: 's-li', target: 't-ic' }, { source: 's-sy', target: 't-ic' },
    { source: 's-ix', target: 't-in' }, { source: 's-ux', target: 't-pe' },
    { source: 's-et', target: 't-pe' },
  ];

  function buildStyle() {
    const d = isDark();
    const surf2 = d ? '#181e2a' : '#e6e0d6';
    const border = d ? '#1c2a38' : '#c8bfae';
    const textLo = d ? '#324c58' : '#8a7a68';
    const cyan = d ? '#52d4d4' : '#1a8080';
    const cyanD = d ? '#2a7a7a' : '#2a7a7a';
    const magC = d ? '#200a14' : '#f5dde6';
    const mag = d ? '#cc5585' : '#a03060';
    const magD = d ? '#722a48' : '#7a2448';
    const yellC = d ? '#221a06' : '#f8f0d0';
    const yell = d ? '#e0c040' : '#8c6400';
    const yellD = d ? '#806c1a' : '#6e4e00';

    return [
      {
        selector: 'node[type="theme"]',
        style: {
          'background-color': surf2,
          'border-width': 2,
          'label': 'data(label)',
          'font-family': 'IBM Plex Mono, monospace',
          'font-size': 11,
          'text-valign': 'bottom',
          'text-halign': 'center',
          'text-margin-y': 6,
          'width': 42,
          'height': 42,
          'shape': 'ellipse',
        }
      },
      { selector: 'node[color="cyan"]', style: { 'border-color': cyan, 'color': cyanD }},
      { selector: 'node[color="magenta"]', style: { 'border-color': mag, 'color': magD }},
      { selector: 'node[color="yellow"]', style: { 'border-color': yell, 'color': yellD }},
      {
        selector: 'node[type="project"]',
        style: {
          'background-color': magC,
          'border-color': magD,
          'border-width': 1,
          'label': 'data(label)',
          'color': magD,
          'font-family': 'IBM Plex Mono, monospace',
          'font-size': 10,
          'text-valign': 'bottom',
          'text-halign': 'center',
          'text-margin-y': 5,
          'width': 30,
          'height': 30,
          'shape': 'ellipse',
        }
      },
      {
        selector: 'node[type="skill"]',
        style: {
          'background-color': yellC,
          'border-color': yellD,
          'border-width': 1,
          'label': 'data(label)',
          'color': yellD,
          'font-family': 'IBM Plex Mono, monospace',
          'font-size': 10,
          'text-valign': 'bottom',
          'text-halign': 'center',
          'text-margin-y': 5,
          'width': 22,
          'height': 22,
          'shape': 'ellipse',
        }
      },
      {
        selector: 'edge',
        style: {
          'line-color': border,
          'width': 1,
          'curve-style': 'bezier',
          'opacity': 0.5
        }
      },
    ];
  }

  const cy = cytoscape({
    container: document.getElementById('cy'),
    elements: {
      nodes: nodeData.map(n => ({ data: n })),
      edges: edgeData.map((e, i) => ({ data: Object.assign({ id: 'e'+i }, e) }))
    },
    style: buildStyle(),
    layout: {
      name: 'fcose',
      animate: false,
      nodeRepulsion: () => 8000,
      idealEdgeLength: () => 80,
      gravity: 0.3,
      numIter: 500,
      padding: 32
    },
    userZoomingEnabled: false,
    userPanningEnabled: false,
  });

  // Overlay and controls
  const overlay = document.getElementById('cy-overlay');
  const statBtn = document.getElementById('cy-chip-state-btn');
  const legBtn = document.getElementById('cy-chip-legend-btn');
  const chipDot = document.getElementById('cy-chip-dot');
  const chipLabel = document.getElementById('cy-chip-label');
  const chipCaret = document.getElementById('cy-chip-caret');
  const legendPanel = document.getElementById('cy-legend-panel');
  const escHint = document.getElementById('cy-esc-hint');
  let graphActive = false;
  let legendOpen = true;

  function setLegend(open) {
    legendOpen = open;
    if (legendPanel) legendPanel.style.display = open ? '' : 'none';
    if (chipCaret) chipCaret.textContent = open ? '∧' : '∨';
    if (legBtn) legBtn.setAttribute('aria-expanded', String(open));
  }

  function activateGraph() {
    graphActive = true;
    cy.userZoomingEnabled(true);
    cy.userPanningEnabled(true);
    if (overlay) overlay.classList.add('hidden');
    if (chipDot) chipDot.classList.add('active');
    if (chipLabel) chipLabel.textContent = 'graph active';
    if (escHint) escHint.classList.add('visible');
  }

  function deactivateGraph() {
    graphActive = false;
    cy.userZoomingEnabled(false);
    cy.userPanningEnabled(false);
    if (overlay) overlay.classList.remove('hidden');
    if (chipDot) chipDot.classList.remove('active');
    if (chipLabel) chipLabel.textContent = 'click to interact';
    if (escHint) escHint.classList.remove('visible');
    hideProject();
    setLegend(true);
  }

  if (statBtn) {
    statBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      graphActive ? deactivateGraph() : activateGraph();
    });
  }

  if (legBtn) {
    legBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setLegend(!legendOpen);
    });
  }

  if (overlay) overlay.addEventListener('click', activateGraph);

  document.addEventListener('click', (e) => {
    const wrap = document.querySelector('.cy-wrap');
    if (wrap && !wrap.contains(e.target) && graphActive) deactivateGraph();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && graphActive) deactivateGraph();
  });

  // Sidebar
  const idleEl = document.getElementById('cy-idle');
  const detailEl = document.getElementById('cy-project-detail');

  function showProject(id) {
    const p = projectSidebarData[id];
    if (!p) return;
    if (idleEl) idleEl.style.display = 'none';
    if (detailEl) detailEl.style.display = 'flex';

    const el = (i) => document.getElementById(i);
    if (el('cy-proj-eyebrow')) el('cy-proj-eyebrow').textContent = p.eyebrow;
    if (el('cy-proj-title')) el('cy-proj-title').textContent = p.title;
    if (el('cy-proj-summary')) el('cy-proj-summary').textContent = p.summary;
    if (el('cy-proj-tools')) el('cy-proj-tools').textContent = p.tools;

    const methodEl = el('cy-proj-method');
    if (methodEl) {
      methodEl.innerHTML = '';
      p.method.forEach(step => {
        const row = document.createElement('div');
        row.className = 'card-recipe-line';
        const s = document.createElement('span');
        s.textContent = step;
        row.appendChild(s);
        methodEl.appendChild(row);
      });
    }

    const outcomeEl = el('cy-proj-outcome');
    if (outcomeEl) {
      outcomeEl.innerHTML = '';
      const row = document.createElement('div');
      row.className = 'card-recipe-line';
      const s = document.createElement('span');
      s.textContent = p.outcome;
      row.appendChild(s);
      outcomeEl.appendChild(row);
    }

    const themeEl = el('cy-proj-theme');
    if (themeEl) {
      themeEl.textContent = p.theme;
      themeEl.style.color = p.themeColor;
    }

    const expandEl = el('cy-proj-expand');
    if (expandEl && window.openCaseModal) {
      expandEl.onclick = () => window.openCaseModal(p.caseId);
    }
  }

  function hideProject() {
    if (idleEl) idleEl.style.display = '';
    if (detailEl) detailEl.style.display = 'none';
  }

  cy.on('mouseover', 'node', (e) => {
    const hovered = e.target;
    const d = hovered.data();
    cy.elements().forEach(el => el.style('opacity', 0.12));
    hovered.style('opacity', 1);
    hovered.style('border-color', isDark() ? '#52d4d4' : '#1a8080');
    hovered.style('border-width', 3);
    const neighborhood = hovered.neighborhood();
    neighborhood.nodes().forEach(n => {
      n.style('opacity', 1);
      n.style('border-color', isDark() ? '#52d4d4' : '#1a8080');
    });
    neighborhood.edges().forEach(edge => {
      edge.style('opacity', 1);
      edge.style('line-color', isDark() ? '#52d4d4' : '#1a8080');
      edge.style('width', 2);
    });
    if (d.type === 'project') showProject(d.id);
  });

  cy.on('mouseout', 'node', () => {
    cy.elements().forEach(el => {
      el.style('opacity', null);
      el.style('border-color', null);
      el.style('line-color', null);
      el.style('width', null);
    });
  });

  cy.on('tap', 'node', (e) => {
    const d = e.target.data();
    if (d.type === 'project') {
      if (window.innerWidth <= 768 && window.openBottomSheet) {
        const p = projectSidebarData[d.id];
        if (p) window.openBottomSheet(p);
      } else {
        showProject(d.id);
      }
    }
  });

  // Re-apply style on theme toggle
  window.addEventListener('themechange', () => {
    setTimeout(() => cy.style(buildStyle()), 50);
  });
}
