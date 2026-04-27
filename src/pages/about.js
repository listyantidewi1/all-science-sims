import { t } from '../i18n/index.js';

export function renderAbout(main) {
  const wrap = document.createElement('section');
  wrap.style.maxWidth = '60ch';
  wrap.style.margin = '0 auto';
  wrap.style.padding = 'var(--space-7) 0';
  wrap.innerHTML = `
    <h1>${t('about.title')}</h1>
    <p>${t('about.body')}</p>
  `;
  main.appendChild(wrap);
}
