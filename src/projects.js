import { getFeaturedProjects, getThemeColor, getThemeClass } from './data-loader.js';

export async function initFeaturedProjects() {
  const projects = await getFeaturedProjects();
  const container = document.querySelector('#projects .card-grid');
  const countElem = document.querySelector('#projects .projects-intro p');

  if (!container) return;

  // Update count
  if (countElem) {
    countElem.textContent = `Click any card to flip it · ${projects.length} entries`;
  }

  // Generate cards
  container.innerHTML = projects.map((project, index) => generateCard(project, index, projects.length)).join('');
}

function generateCard(project, index, total) {
  // Determine theme class based on all themes (supports multi-colored overlays)
  const themeClass = getThemeClass(project.themes);
  const primaryTheme = project.themes[0];
  const themeColor = getThemeColor(primaryTheme);

  // Format theme label
  const themeLabel = project.themes.join(', ');

  // Get first 3 key skills for chips
  const keySkills = project.skills.slice(0, 3);

  // Card index
  const cardIndex = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

  // Simplified description for front (first sentence or 150 chars)
  const frontSummary = project.description.split('.')[0] + '.';

  // Full description for back
  const backSummary = project.description;

  return `
    <!-- ${project.name} — ${primaryTheme} -->
    <article class="flashcard ${themeClass}" role="listitem" tabindex="0"
      aria-label="${project.name} — press Enter to see project detail"
      onclick="this.classList.toggle('flipped')"
      onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.classList.toggle('flipped');}">
      <div class="flashcard-inner">
        <!-- Ghost drives height -->
        <div class="flashcard-ghost" aria-hidden="true">
          <p class="card-back-eyebrow">${themeLabel} · ${project.date}</p>
          <h3 class="card-back-title">${project.name}</h3>
          <p class="card-back-summary">${backSummary}</p>
          ${project.des_materials.length > 0 ? `
          <p class="card-recipe-label">Tools</p>
          <p class="card-recipe-inline">${project.des_materials.join(', ')}</p>
          ` : ''}
          ${project.collaboration ? `
          <p class="card-recipe-label">Collaboration</p>
          <p class="card-recipe-inline">${project.collaboration}</p>
          ` : ''}
          <div class="card-back-actions">
            <span class="card-back-theme">${project.format}</span>
          </div>
        </div>
        <div class="flashcard-front">
          <div class="card-image-zone" aria-hidden="true">
            <div class="card-tint"></div>
            ${project.thumbnail ?
              `<img src="${project.thumbnail}" alt="${project.thumbnail_alt}" class="card-image" />` :
              `<span class="card-image-placeholder">[ project image ]</span>`
            }
            <span class="card-hint" aria-hidden="true">flip ↺</span>
          </div>
          <div class="card-info">
            <p class="card-index">${cardIndex}</p>
            <h3 class="card-title">${project.name}</h3>
            <p class="card-context">${project.collaboration} · ${project.date}</p>
            <p class="card-summary">${frontSummary}</p>
            <div class="card-skills" aria-label="Skills">
              ${keySkills.map(skill => `<span class="skill-chip">${skill}</span>`).join('\n              ')}
            </div>
          </div>
        </div>
        <div class="flashcard-back">
          <button class="card-close" aria-label="Return to card front" onclick="event.stopPropagation();this.closest('.flashcard').classList.remove('flipped')">✕ close</button>
          <p class="card-back-eyebrow">${themeLabel} · ${project.date}</p>
          <h3 class="card-back-title">${project.name}</h3>
          <p class="card-back-summary">${backSummary}</p>
          ${project.des_materials.length > 0 ? `
          <p class="card-recipe-label">Tools</p>
          <p class="card-recipe-inline">${project.des_materials.join(', ')}</p>
          ` : ''}
          ${project.collaboration ? `
          <p class="card-recipe-label">Collaboration</p>
          <p class="card-recipe-inline">${project.collaboration}</p>
          ` : ''}
          <div class="card-back-actions">
            <span class="card-back-theme">${project.format}</span>
          </div>
        </div>
      </div>
    </article>
  `;
}
