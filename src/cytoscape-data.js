import { loadProjects, loadSkills, getThemeId } from './data-loader.js';

// Transform JSON data into Cytoscape format
export async function getCytoscapeData() {
  const projects = await loadProjects();
  const skills = await loadSkills();

  // Fixed theme nodes with calculated dimensions
  const themeNodes = [
    { id: 't-ic', label: 'Interconnectivity', type: 'theme', color: 'cyan' },
    { id: 't-in', label: 'Interaction', type: 'theme', color: 'magenta' },
    { id: 't-pe', label: 'Perception', type: 'theme', color: 'yellow' },
  ].map(node => ({
    ...node,
    width: Math.max(60, node.label.length * 16),
    height: Math.max(60, node.label.length)
  }));

  // Generate project nodes with calculated dimensions
  const projectNodes = projects.map((p, i) => {
    const label = p.name.replace(/\n/g, ' '); // Remove line breaks
    return {
      id: `p-${i}`,
      label,
      type: 'project',
      width: Math.max(50, label.length * 10),
      height: Math.max(30, label.length),
      projectData: p // Store full project data for sidebar
    };
  });

  // Generate skill nodes with calculated dimensions
  const skillNodes = skills.map((s, i) => ({
    id: `s-${i}`,
    label: s.name,
    type: 'skill',
    width: Math.max(20, s.name.length * 8),
    height: Math.max(20, s.name.length)
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
