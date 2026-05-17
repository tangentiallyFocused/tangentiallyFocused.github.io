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
      // changed the colors for the theme nodes from {color}D to simply {color}
      { selector: 'node[color="cyan"]', style: { 'border-color': cyan, 'color': cyan }},
      { selector: 'node[color="magenta"]', style: { 'border-color': mag, 'color': mag }},
      { selector: 'node[color="yellow"]', style: { 'border-color': yell, 'color': yell }},
      {
        selector: 'node[type="project"]',
        style: {
          'background-color': magC,
          // 'color': magD,
          'color': mag,
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
          // 'color': yellD,
          'color': yell,
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
  let lockedNode = null; // Lock state for node selection

  function setLegend(open) {
    legendOpen = open;
    if (legendPanel) legendPanel.style.display = open ? '' : 'none';
    if (chipCaret) chipCaret.textContent = open ? '∧' : '∨';
    if (legBtn) legBtn.setAttribute('aria-expanded', String(open));
  }

  function unlockNode() {
    lockedNode = null;
    // Clear all styles
    cy.elements().forEach(el => {
      el.style('opacity', null);
      el.style('border-color', null);
      el.style('line-color', null);
      el.style('width', null);
    });
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
    if (lockedNode) unlockNode(); // Clear any locked node
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
    const mediaModal = document.getElementById('media-carousel-overlay');
    const clickedInsideModal = mediaModal && mediaModal.contains(e.target);
    const modalIsOpen = mediaModal && mediaModal.classList.contains('open');

    // Don't deactivate graph if clicking inside modal or if modal is open
    if (wrap && !wrap.contains(e.target) && graphActive && !clickedInsideModal && !modalIsOpen) {
      deactivateGraph();
    }
  });

  document.addEventListener('keydown', (e) => {
    // If another handler already handled ESC (like tooltip or modal), don't process
    if (e.key === 'Escape' && e.defaultPrevented) return;

    const mediaModal = document.getElementById('media-carousel-overlay');
    const modalIsOpen = mediaModal && mediaModal.classList.contains('open');

    // ESC key hierarchy: modal → tooltip (handled above) → locked node → graph
    if (e.key === 'Escape' && graphActive && !modalIsOpen) {
      // Progressive ESC behavior: unlock first, then deactivate graph
      if (lockedNode) {
        unlockNode();
      } else {
        deactivateGraph();
      }
    }
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
    if (el('cy-proj-affiliation')) {
      el('cy-proj-affiliation').textContent = p.affiliation || '';
      el('cy-proj-affiliation').style.display = p.affiliation ? 'block' : 'none';
    }
    if (el('cy-proj-summary')) el('cy-proj-summary').textContent = p.summary;

    // Populate skills pills
    const skillsEl = el('cy-proj-skills');
    if (skillsEl) {
      skillsEl.innerHTML = '';
      if (p.skills && p.skills.length > 0) {
        p.skills.forEach(skill => {
          const chip = document.createElement('span');
          chip.className = 'skill-chip';
          chip.textContent = skill;
          skillsEl.appendChild(chip);
        });
      }
    }

    if (el('cy-proj-tools')) el('cy-proj-tools').textContent = p.tools;
    if (el('cy-proj-method-label')) el('cy-proj-method-label').textContent = p.methodConcept || 'Method';

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
      if (p.outcome && p.outcome.length >= 2) {
        const row = document.createElement('div');
        row.className = 'card-recipe-line';
        const s1 = document.createElement('span');
        s1.textContent = p.outcome[0];
        const s2 = document.createElement('span');
        s2.textContent = p.outcome[1];
        row.appendChild(s1);
        row.appendChild(s2);
        outcomeEl.appendChild(row);
      }
    }

    const themeEl = el('cy-proj-theme');
    if (themeEl) {
      themeEl.textContent = p.theme;
      themeEl.style.color = p.themeColor;
    }

    // Media link
    const mediaLink = el('cy-proj-media-link');
    const mediaCount = el('cy-media-count');
    // Check if mediaFiles exists, has items, and contains at least one non-empty string
    const hasValidMedia = p.mediaFiles && p.mediaFiles.length > 0 && p.mediaFiles.some(file => file && file.trim() !== '');
    if (mediaLink && hasValidMedia) {
      mediaLink.style.display = 'block';
      if (mediaCount) mediaCount.textContent = p.mediaFiles.length;
      // Store media data globally for carousel
      window.currentProjectMedia = {
        files: p.mediaFiles,
        alt: p.mediaAlt,
        title: p.title
      };
    } else if (mediaLink) {
      mediaLink.style.display = 'none';
    }

    // NOTE: "Open case study" functionality commented out for now
    // const expandEl = el('cy-proj-expand');
    // if (expandEl && window.openCaseModal) {
    //   expandEl.onclick = () => window.openCaseModal(p.caseId);
    // }
  }

  function hideProject() {
    if (idleEl) idleEl.style.display = '';
    if (detailEl) detailEl.style.display = 'none';

    // Reset media link display
    const mediaLink = document.getElementById('cy-proj-media-link');
    if (mediaLink) mediaLink.style.display = 'none';
  }

  function lockNode(node) {
    lockedNode = node;
    const d = node.data();
    // Apply persistent highlight
    cy.elements().forEach(el => el.style('opacity', 0.12));
    node.style('opacity', 1);
    node.style('border-color', isDark() ? '#52d4d4' : '#1a8080');
    node.style('border-width', 3);
    const neighborhood = node.neighborhood();
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
  }

  cy.on('mouseover', 'node', (e) => {
    // Ignore hover if a node is locked
    if (lockedNode) return;

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
    // Ignore mouseout if a node is locked
    if (lockedNode) return;

    cy.elements().forEach(el => {
      el.style('opacity', null);
      el.style('border-color', null);
      el.style('line-color', null);
      el.style('width', null);
    });
  });

  cy.on('tap', 'node', (e) => {
    const node = e.target;
    const d = node.data();

    // Mobile: use bottom sheet for projects
    if (window.innerWidth <= 768 && d.type === 'project' && window.openBottomSheet) {
      const p = projectSidebarData[d.id];
      if (p) window.openBottomSheet(p);
      return;
    }

    // Desktop: toggle lock on project nodes
    if (d.type === 'project') {
      if (lockedNode === node) {
        // Clicking same locked node → unlock
        unlockNode();
      } else if (!lockedNode) {
        // Only allow locking if nothing is currently locked
        lockNode(node);
      }
      // If a different node is locked, do nothing (dimmed nodes not clickable)
    }
  });

  // Click on background or non-neighbor nodes → unlock
  cy.on('tap', (e) => {
    if (e.target === cy && lockedNode) {
      // Clicked on background
      unlockNode();
    }
  });

  // Keyboard navigation for sighted keyboard users
  let keyboardFocusedNode = null;

  function setKeyboardFocus(node) {
    if (keyboardFocusedNode) {
      keyboardFocusedNode.style('border-width', null);
    }
    keyboardFocusedNode = node;
    if (node) {
      node.style('border-width', 4);
      node.style('border-color', isDark() ? '#e0c040' : '#8c6400'); // Yellow for keyboard focus
      const d = node.data();
      if (d.type === 'project') showProject(d.id);
    }
  }

  // Keyboard navigation - listen at document level when graph is active
  document.addEventListener('keydown', (e) => {
    if (!graphActive) return;

    // Don't interfere with other interactions
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    // Get project nodes sorted alphabetically (ignoring leading punctuation)
    const projectNodes = cy.nodes('[type="project"]').sort((a, b) => {
      const labelA = a.data('label').replace(/^[^a-zA-Z0-9]+/, '').toLowerCase();
      const labelB = b.data('label').replace(/^[^a-zA-Z0-9]+/, '').toLowerCase();
      return labelA.localeCompare(labelB);
    });

    // Arrow keys navigate between project nodes
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();

      // Don't allow navigation if a node is locked
      if (lockedNode) return;

      if (!keyboardFocusedNode) {
        setKeyboardFocus(projectNodes[0]);
        return;
      }

      // Navigate through all project nodes sequentially
      const currentIndex = projectNodes.indexOf(keyboardFocusedNode);
      let nextIndex;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        // Move forward
        nextIndex = (currentIndex + 1) % projectNodes.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        // Move backward
        nextIndex = (currentIndex - 1 + projectNodes.length) % projectNodes.length;
      }

      setKeyboardFocus(projectNodes[nextIndex]);
    } else if (e.key === 'Enter' && keyboardFocusedNode) {
      e.preventDefault();
      // Enter locks/unlocks the keyboard-focused node
      if (lockedNode === keyboardFocusedNode) {
        unlockNode();
        setKeyboardFocus(null); // Clear keyboard focus when unlocking
      } else {
        lockNode(keyboardFocusedNode);
      }
    }
    // Tab key is NOT prevented - allows normal DOM navigation to/from graph
  });

  // Populate accessible project list for screen readers
  function populateAccessibleList() {
    const container = document.getElementById('cy-accessible-projects');
    if (!container) return;

    // Sort all projects alphabetically (ignoring leading punctuation)
    const allProjects = Object.values(projectSidebarData).sort((a, b) => {
      const titleA = a.title.replace(/^[^a-zA-Z0-9]+/, '').toLowerCase();
      const titleB = b.title.replace(/^[^a-zA-Z0-9]+/, '').toLowerCase();
      return titleA.localeCompare(titleB);
    });

    let html = '<ul>';
    allProjects.forEach(p => {
      html += `<li><a href="#" data-project-id="${p.caseId || p.title}">${p.title}</a> - ${p.summary}</li>`;
    });
    html += '</ul>';

    container.innerHTML = html;

    // Add click handlers to update sidebar
    container.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = e.target.getAttribute('data-project-id');
        const project = Object.values(projectSidebarData).find(p =>
          (p.caseId || p.title) === projectId
        );
        if (project) {
          showProject(project.caseId || project.title);
        }
      });
    });
  }

  populateAccessibleList();

  // DEV: Toggle for testing accessible list visibility
  const toggleBtn = document.getElementById('toggle-accessible-list');
  const accessibleNav = document.getElementById('cy-accessible-nav');
  if (toggleBtn && accessibleNav) {
    toggleBtn.addEventListener('click', () => {
      if (accessibleNav.classList.contains('sr-only')) {
        accessibleNav.classList.remove('sr-only');
        accessibleNav.style.marginTop = '20px';
        accessibleNav.style.padding = '20px';
        accessibleNav.style.border = '2px solid var(--yellow)';
        accessibleNav.style.background = 'var(--bg-2)';
        toggleBtn.textContent = '[Dev] Hide Accessible List';
      } else {
        accessibleNav.classList.add('sr-only');
        accessibleNav.style = '';
        toggleBtn.textContent = '[Dev] Show Accessible List';
      }
    });
  }

  // Re-apply style on theme toggle
  window.addEventListener('themechange', () => {
    setTimeout(() => cy.style(buildStyle()), 50);
  });
}
