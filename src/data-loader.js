// Data loader module for projects and skills
export async function loadProjects() {
  const response = await fetch('/data/projects.json');
  return await response.json();
}

export async function loadSkills() {
  const response = await fetch('/data/skills.json');
  return await response.json();
}

// Get featured projects only, sorted by featured order
export async function getFeaturedProjects() {
  const projects = await loadProjects();
  return projects
    .filter(p => p.featured && p.featured.startsWith('Yes'))
    .sort((a, b) => {
      // Extract the number from "Yes 1", "Yes 2", etc.
      const numA = parseInt(a.featured.split(' ')[1]) || 0;
      const numB = parseInt(b.featured.split(' ')[1]) || 0;
      return numA - numB;
    });
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

// Get theme class - handles single or multiple themes
export function getThemeClass(themes) {
  // Convert theme names to letter codes
  const themeToLetter = {
    'Interconnectivity': 'c',
    'Interaction': 'm',
    'Perception': 'y'
  };

  // If it's a single theme string (for backwards compatibility)
  if (typeof themes === 'string') {
    return `card-${themeToLetter[themes]}`;
  }

  // If it's an array, combine the letters in order
  const letters = themes.map(t => themeToLetter[t]).join('');
  return `card-${letters}`;
}
