import './style.css';
import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';

// Register fcose layout
cytoscape.use(fcose);

// Theme initialization (before DOM loads)
(function() {
  var theme = 'dark';
  try {
    var saved = localStorage.getItem('theme');
    if (saved) { theme = saved; }
    else if (window.matchMedia('(prefers-color-scheme: light)').matches) { theme = 'light'; }
  } catch(e) {
    try { if (window.matchMedia('(prefers-color-scheme: light)').matches) { theme = 'light'; } } catch(e2) {}
  }
  document.documentElement.setAttribute('data-theme', theme);
})();

// Load HTML content
async function loadContent() {
  const response = await fetch('/src/content.html');
  const html = await response.text();
  document.getElementById('app').innerHTML = html;
}

// Initialize after content loads
document.addEventListener('DOMContentLoaded', async () => {
  await loadContent();

  // Import and initialize modules
  const { initInteractions } = await import('./interactions.js');
  const { initFeaturedProjects } = await import('./projects.js');
  const { initCytoscapeGraph } = await import('./cytoscape-graph.js');

  initInteractions();
  await initFeaturedProjects();
  await initCytoscapeGraph(cytoscape);
});
