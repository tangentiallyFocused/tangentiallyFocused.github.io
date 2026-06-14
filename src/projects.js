import { getFeaturedProjects, getThemeColor, getThemeClass } from './data-loader.js';

// Helper to convert \n to <br> tags
function nl2br(text) {
  return text ? text.replace(/\n/g, '<br>') : '';
}

export async function initFeaturedProjects() {
  const projects = await getFeaturedProjects();
  const container = document.querySelector('#projects .card-grid');
  const countElem = document.querySelector('#projects .projects-count');

  if (!container) return;

  // Update count
  if (countElem) {
    countElem.textContent = `Click any card to flip it · ${projects.length} entries`;
  }

  // Generate cards
  container.innerHTML = projects.map((project, index) => generateCard(project, index, projects.length)).join('');

  // Add event listeners for media buttons after cards are rendered
  container.querySelectorAll('.card-media-link').forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const mediaFiles = JSON.parse(button.dataset.files);
      const mediaAlt = JSON.parse(button.dataset.alt);
      const title = button.dataset.title;

      window.currentProjectMedia = {
        files: mediaFiles,
        alt: mediaAlt,
        title: title
      };

      if (window.openMediaCarousel) {
        window.openMediaCarousel();
      }
    });
  });
}

function generateCard(project, index, total) {
  // Determine theme class based on all themes (supports multi-colored overlays)
  const themeClass = getThemeClass(project.themes);

  // Format theme label for eyebrow
  const themeLabel = project.themes.join(', ');

  // Card index
  const cardIndex = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

  // Check for valid media files
  const hasValidMedia = project.modal_files && project.modal_files.length > 0 &&
                        project.modal_files.some(file => file && file.trim() !== '');
  const mediaCount = hasValidMedia ? project.modal_files.length : 0;

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
          <p class="card-back-summary">${nl2br(project.med_desc)}</p>
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
            ${hasValidMedia ? `<button class="card-media-link" data-files='${JSON.stringify(project.modal_files)}' data-alt='${JSON.stringify(project.modal_files_alt || [])}' data-title="${project.name.replace(/"/g, '&quot;')}">View media (${mediaCount}) ↗</button>` : ''}
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
            <p class="card-summary">${nl2br(project.short_desc)}</p>
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
          <p class="card-back-summary">${nl2br(project.med_desc)}</p>
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
            ${hasValidMedia ? `<button class="card-media-link" data-files='${JSON.stringify(project.modal_files)}' data-alt='${JSON.stringify(project.modal_files_alt || [])}' data-title="${project.name.replace(/"/g, '&quot;')}">View media (${mediaCount}) ↗</button>` : ''}
          </div>
        </div>
      </div>
    </article>
  `;
}
