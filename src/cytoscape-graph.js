import { getCytoscapeData } from './cytoscape-data.js';

export async function initCytoscapeGraph(cytoscape) {
  if (!document.getElementById('cy')) return;

  const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

  // Load data from JSON files
  const { nodeData, edgeData, projectSidebarData } = await getCytoscapeData();

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
          // should i make the font fallback color the on-surface color?
          'label': 'data(label)',
          'font-size': 28,
          'text-valign': 'center',
          'text-halign': 'center',
          'padding': '15px',
          'text-justification': 'center',
          'shape': 'roundrectangle',
          // 'text-max-width': '125px',
          'border-width': 3,
          // should i make the border fallback color the on-surface color too?
          'font-family': 'JetBrains Mono, IBM Plex Mono, monospace',
          'width': 'data(width)',
          'height': 'data(height)',
          // 'text-margin-y': 6,
          'font-weight': '900'

        }
      },
      // theme node specifics
      // {
      //   selector: 'node[label = "Interconnectivity"]',
      //   style: {
      //     'color': cyan
      //   }
      // },
      { selector: 'node[color="cyan"]', style: { 'border-color': cyan, 'color': cyanD }},
      { selector: 'node[color="magenta"]', style: { 'border-color': mag, 'color': magD }},
      { selector: 'node[color="yellow"]', style: { 'border-color': yell, 'color': yellD }},
      {
        selector: 'node[type="project"]',
        style: {
          'background-color': magC,
          'color': magD,
          'font-family': 'JetBrains Mono, IBM Plex Mono, monospace',
          'label': 'data(label)',
          'font-size': 18,
          'text-valign': 'center',
          'text-halign': 'center',
          'text-wrap': 'wrap',
          'padding': '12px',
          'text-justification': 'center',
          'shape': 'roundrectangle',
          'text-max-width': '165px',
          'border-width': 1,
          'border-color': magD,
          'width': 'data(width)',
          'height': 'data(height)',

        }
      },
      {
        selector: 'node[type="skill"]',
        style: {
          'background-color': yellC,
          'color': yellD,
          'font-family': 'JetBrains Mono, IBM Plex Mono, monospace',
          'label': 'data(label)',
          'font-size': 14,
          'text-valign': 'center',
          'text-halign': 'center',
          'text-wrap': 'wrap',
          'padding': '10px',
          'text-justification': 'center',
          'shape': 'roundrectangle',
          'text-max-width': '125px',
          'border-width': 1, // og says 2px
          'border-color': yellD,
          'width': 'data(width)',
          'height': 'data(height)',

        }
      },
      {
        selector: 'edge',
        style: {
          'line-color': border,
          'width': 1.5,
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
      // from og code
      name: 'fcose',
      randomize: true,
      animationDuration: 50,
      gravity: 0.25,
      nestingFactor: 0.05,
      // nestingFactor: 0.5,
      edgeElasticity: edge => 0.05,
      nodeRepulsion: node => 4500,
      idealEdgeLength: edge => 50,
      nodeSeparation: 2000,
      numIter: 2500,
      fit: true,
      packComponents: true,
      samplingType: false,
      nodeDimensionsIncludeLabels: true
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

  cy.maxZoom(2);
  // cy.minZoom(0.3);
  cy.minZoom(0.5);
  // cy.minZoom(0.7);
  // cy.center();

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
