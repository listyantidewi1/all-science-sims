import { t } from '../i18n/index.js';

export function renderFooter() {
  const f = document.createElement('footer');
  f.className = 'site-footer';
  f.textContent = t('footer.text');
  return f;
}
