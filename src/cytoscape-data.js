import { loadProjects, loadSkills, getThemeId } from './data-loader.js';

// Transform JSON data into Cytoscape format
export async function getCytoscapeData() {
  const projects = await loadProjects();
  const skills = await loadSkills();

  // Helper function to calculate node height with wrapping
  function calculateHeight(label, fontSize, maxWidth) {
    // Estimate character width (monospace font)
    const charWidth = fontSize * 0.6; // JetBrains Mono is roughly 0.6 of font-size

    // Calculate max characters per line
    const maxCharsPerLine = Math.floor(maxWidth / charWidth);

    // Calculate number of lines needed
    const numLines = Math.ceil(label.length / maxCharsPerLine);

    // Calculate height based on lines (font-size * line-height * numLines)
    // Note: padding is already handled by CSS, so we don't add it here
    const lineHeight = fontSize * 1.2; // Tighter line height
    const height = numLines * lineHeight;

    return Math.max(fontSize * 1.5, height);
  }

  // Fixed theme nodes with calculated dimensions
  // Theme nodes: font-size 28, max width 300 (to fit "Interconnectivity")
  const themeNodes = [
    { id: 't-ic', label: 'Interconnectivity', type: 'theme', color: 'cyan' },
    { id: 't-in', label: 'Interaction', type: 'theme', color: 'magenta' },
    { id: 't-pe', label: 'Perception', type: 'theme', color: 'yellow' },
  ].map(node => ({
    ...node,
    width: Math.min(300, Math.max(60, node.label.length * 16)),
    height: calculateHeight(node.label, 28, 300)
  }));

  // Generate project nodes with calculated dimensions
  // Project nodes: font-size 18, text-max-width 165px
  const projectNodes = projects.map((p, i) => {
    const label = p.name.replace(/\n/g, ' '); // Remove line breaks
    return {
      id: `p-${i}`,
      label,
      type: 'project',
      width: Math.min(165, Math.max(50, label.length * 10)),
      height: calculateHeight(label, 18, 165),
      projectData: p // Store full project data for sidebar
    };
  });

  // Generate skill nodes with calculated dimensions
  // Skill nodes: font-size 14, text-max-width 125px
  const skillNodes = skills.map((s, i) => ({
    id: `s-${i}`,
    label: s.name,
    type: 'skill',
    width: Math.min(125, Math.max(20, s.name.length * 8)),
    height: calculateHeight(s.name, 14, 125)
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

  // Skill to project edges (using all_skills)
  projects.forEach((p, pIndex) => {
    if (p.all_skills && p.all_skills.length > 0) {
      p.all_skills.forEach(skillName => {
        const skillIndex = skills.findIndex(s => s.name === skillName);
        if (skillIndex !== -1) {
          edges.push({ source: `s-${skillIndex}`, target: `p-${pIndex}` });
        }
      });
    }
  });

  // Generate project sidebar data (formatted like card backs)
  const projectSidebarData = {};
  projects.forEach((p, i) => {
    const id = `p-${i}`;
    projectSidebarData[id] = {
      eyebrow: `${p.themes.join(', ')} · ${p.end_year}`,
      title: p.name.replace(/\n/g, ' '),
      summary: p.med_desc,
      tools: p.key_tools && p.key_tools.length > 0 ? p.key_tools.join(', ') : '',
      methodConcept: p.method_concept || 'Method',
      method: p.short_mept || [],
      outcome: p.short_outcome || [],
      theme: p.tags,
      themeColor: 'var(--cyan-dim)', // Could map based on primary theme
      caseId: id
    };
  });

  return { nodeData, edgeData: edges, projectSidebarData };
}
