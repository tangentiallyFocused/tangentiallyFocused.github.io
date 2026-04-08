// Data loader module for projects and skills
export async function loadProjects() {
  const response = await fetch('/src/data/projects.json');
  return await response.json();
}

export async function loadSkills() {
  const response = await fetch('/src/data/skills.json');
  return await response.json();
}

// Get featured projects only
export async function getFeaturedProjects() {
  const projects = await loadProjects();
  return projects.filter(p => p.featured === 'Featured');
}

// Get theme mapping
export function getThemeId(themeName) {
  const themeMap = {
    'Interconnectivity': 't-ic',
    'Interaction': 't-in',
    'Perception': 't-pe'
  };
  return themeMap[themeName];
}

// Get theme color
export function getThemeColor(themeName) {
  const colorMap = {
    'Interconnectivity': 'cyan',
    'Interaction': 'magenta',
    'Perception': 'yellow'
  };
  return colorMap[themeName];
}

// Get theme class
export function getThemeClass(themeName) {
  const classMap = {
    'Interconnectivity': 'card-c',
    'Interaction': 'card-m',
    'Perception': 'card-y'
  };
  return classMap[themeName];
}
