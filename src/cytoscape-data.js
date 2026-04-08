import { loadProjects, loadSkills, getThemeId } from './data-loader.js';

// Transform JSON data into Cytoscape format
export async function getCytoscapeData() {
  const projects = await loadProjects();
  const skills = await loadSkills();

  // Fixed theme nodes
  const themeNodes = [
    { id: 't-ic', label: 'Interconnectivity', type: 'theme', color: 'cyan' },
    { id: 't-in', label: 'Interaction', type: 'theme', color: 'magenta' },
    { id: 't-pe', label: 'Perception', type: 'theme', color: 'yellow' },
  ];

  // Generate project nodes
  const projectNodes = projects.map((p, i) => ({
    id: `p-${i}`,
    label: p.name.replace(/\n/g, ' '), // Remove line breaks
    type: 'project',
    projectData: p // Store full project data for sidebar
  }));

  // Generate skill nodes
  const skillNodes = skills.map((s, i) => ({
    id: `s-${i}`,
    label: s.name,
    type: 'skill'
  }));

  const nodeData = [...themeNodes, ...projectNodes, ...skillNodes];

  // Generate edges
  const edges = [];

  // Project to theme edges
  projects.forEach((p, i) => {
    p.themes.forEach(theme => {
      const themeId = getThemeId(theme);
      if (themeId) {
        edges.push({ source: `p-${i}`, target: themeId });
      }
    });
  });

  // Skill to project edges
  projects.forEach((p, pIndex) => {
    p.skills.forEach(skillName => {
      const skillIndex = skills.findIndex(s => s.name === skillName);
      if (skillIndex !== -1) {
        edges.push({ source: `s-${skillIndex}`, target: `p-${pIndex}` });
      }
    });
  });

  // Generate project sidebar data
  const projectSidebarData = {};
  projects.forEach((p, i) => {
    const id = `p-${i}`;
    projectSidebarData[id] = {
      eyebrow: `${p.themes.join(', ')} · ${p.date}`,
      title: p.name.replace(/\n/g, ' '),
      summary: p.description.split('.').slice(0, 2).join('.') + '.',
      tools: p.des_materials.join(', '),
      method: [], // Could parse from description if needed
      outcome: p.collaboration || '',
      theme: p.format,
      themeColor: 'var(--cyan-dim)', // Could map based on primary theme
      caseId: id
    };
  });

  return { nodeData, edgeData: edges, projectSidebarData };
}
