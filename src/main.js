import './style.css';
import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';
import contentHtml from './content.html?raw';

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
function loadContent() {
  document.getElementById('app').innerHTML = contentHtml;
}

// Initialize after content loads
document.addEventListener('DOMContentLoaded', async () => {
  loadContent();

  // Import and initialize modules
  const { initInteractions } = await import('./interactions.js');
  const { initFeaturedProjects } = await import('./projects.js');
  const { initCytoscapeGraph } = await import('./cytoscape-graph.js');

  initInteractions();
  await initFeaturedProjects();
  await initCytoscapeGraph(cytoscape);
});
