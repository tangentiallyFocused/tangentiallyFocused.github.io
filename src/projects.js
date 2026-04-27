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

  // Format theme label for eyebrow
  const themeLabel = project.themes.join(', ');

  // Card index
  const cardIndex = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

  return `
    <!-- ${project.name} -->
    <article class="flashcard ${themeClass}" role="listitem" tabindex="0"
      aria-label="${project.name} — press Enter to see project detail"
      onclick="this.classList.toggle('flipped')"
      onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.classList.toggle('flipped');}">
      <div class="flashcard-inner">
        <!-- Ghost drives height -->
        <div class="flashcard-ghost" aria-hidden="true">
          <p class="card-back-eyebrow">${themeLabel} · ${project.end_year}</p>
          <h3 class="card-back-title">${project.name}</h3>
          <p class="card-back-summary">${project.med_desc}</p>
          ${project.key_tools && project.key_tools.length > 0 ? `
          <p class="card-recipe-label">Tools</p>
          <p class="card-recipe-inline">${project.key_tools.join(', ')}</p>
          ` : ''}
          ${project.short_mept && project.short_mept.length > 0 ? `
          <p class="card-recipe-label">${project.method_concept || 'Method'}</p>
          ${project.short_mept.map(step => `<div class="card-recipe-line"><span>${step}</span></div>`).join('\n          ')}
          ` : ''}
          ${project.short_outcome && project.short_outcome.length >= 2 ? `
          <p class="card-recipe-label card-recipe-label-outcome">Outcome</p>
          <div class="card-recipe-line"><span>${project.short_outcome[0]}</span><span>${project.short_outcome[1]}</span></div>
          ` : ''}
          <div class="card-back-actions">
            <span class="card-back-theme">${project.tags}</span>
          </div>
        </div>
        <div class="flashcard-front">
          <div class="card-image-zone" aria-hidden="true">
            <div class="card-tint"></div>
            ${project.thumbnail ?
              `<img src="${project.thumbnail}" alt="${project.thumbnail_alt || project.name}" class="card-image" />` :
              `<span class="card-image-placeholder">[ project image ]</span>`
            }
            <span class="card-hint" aria-hidden="true">flip ↺</span>
          </div>
          <div class="card-info">
            <p class="card-index">${cardIndex}</p>
            <h3 class="card-title">${project.name}</h3>
            <p class="card-context">${project.affiliation} · ${project.end_year}</p>
            <p class="card-summary">${project.short_desc}</p>
            <div class="card-skills" aria-label="Skills">
              ${project.key_skills && project.key_skills.length > 0 ?
                project.key_skills.map(skill => `<span class="skill-chip">${skill}</span>`).join('\n              ') :
                ''}
            </div>
          </div>
        </div>
        <div class="flashcard-back">
          <button class="card-close" aria-label="Return to card front" onclick="event.stopPropagation();this.closest('.flashcard').classList.remove('flipped')">✕ close</button>
          <p class="card-back-eyebrow">${themeLabel} · ${project.end_year}</p>
          <h3 class="card-back-title">${project.name}</h3>
          <p class="card-back-summary">${project.med_desc}</p>
          ${project.key_tools && project.key_tools.length > 0 ? `
          <p class="card-recipe-label">Tools</p>
          <p class="card-recipe-inline">${project.key_tools.join(', ')}</p>
          ` : ''}
          ${project.short_mept && project.short_mept.length > 0 ? `
          <p class="card-recipe-label">${project.method_concept || 'Method'}</p>
          ${project.short_mept.map(step => `<div class="card-recipe-line"><span>${step}</span></div>`).join('\n          ')}
          ` : ''}
          ${project.short_outcome && project.short_outcome.length >= 2 ? `
          <p class="card-recipe-label card-recipe-label-outcome">Outcome</p>
          <div class="card-recipe-line"><span>${project.short_outcome[0]}</span><span>${project.short_outcome[1]}</span></div>
          ` : ''}
          <div class="card-back-actions">
            <span class="card-back-theme">${project.tags}</span>
          </div>
        </div>
      </div>
    </article>
  `;
}
