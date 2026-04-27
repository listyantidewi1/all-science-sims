import { tr } from '../i18n/index.js';
import { SUBJECT_BY_ID } from '../catalog/subjects.js';

export function simCard(sim) {
  const a = document.createElement('a');
  a.className = 'sim-card';
  a.href = `#/${sim.subject}/${sim.id}`;
  a.dataset.subject = sim.subject;
  a.style.setProperty('--accent', `var(--subj-${sim.subject})`);
  const subjName = tr(SUBJECT_BY_ID[sim.subject].name);
  a.innerHTML = `
    <span class="sim-card__tag">${subjName}</span>
    <h4>${tr(sim.title)}</h4>
    <p>${tr(sim.description)}</p>
  `;
  return a;
}
