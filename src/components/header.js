import { t, getLocale, setLocale } from '../i18n/index.js';
import { SUBJECTS } from '../catalog/subjects.js';
import { tr } from '../i18n/index.js';
import { isInstallable, onInstallableChange, promptInstall } from '../lib/pwa.js';

export function renderHeader() {
  const header = document.createElement('header');
  header.className = 'site-header';

  const inner = document.createElement('div');
  inner.className = 'site-header__inner';

  const brand = document.createElement('a');
  brand.className = 'brand';
  brand.href = '#/';
  brand.innerHTML = `<span class="brand__logo" aria-hidden="true"></span><span>${t('site.title')}</span>`;

  const nav = document.createElement('nav');
  nav.className = 'nav';
  nav.setAttribute('aria-label', t('home.subjects'));
  const home = document.createElement('a');
  home.href = '#/';
  home.textContent = t('nav.home');
  nav.appendChild(home);
  for (const s of SUBJECTS) {
    const a = document.createElement('a');
    a.href = `#/${s.id}`;
    a.textContent = tr(s.name);
    a.dataset.subject = s.id;
    nav.appendChild(a);
  }
  const about = document.createElement('a');
  about.href = '#/about';
  about.textContent = t('nav.about');
  nav.appendChild(about);

  // Mark active nav item based on hash
  const markActive = () => {
    const hash = location.hash || '#/';
    nav.querySelectorAll('a').forEach((a) => {
      a.classList.toggle('is-active', a.getAttribute('href') === hash || (hash.startsWith(a.getAttribute('href')) && a.getAttribute('href') !== '#/'));
    });
  };
  markActive();
  window.addEventListener('hashchange', markActive);

  // Install button — visible only when the browser has fired beforeinstallprompt.
  const installBtn = document.createElement('button');
  installBtn.type = 'button';
  installBtn.className = 'install-btn';
  installBtn.innerHTML = `<span aria-hidden="true">⬇</span><span>${t('install.button')}</span>`;
  if (isInstallable()) installBtn.classList.add('is-available');
  installBtn.addEventListener('click', async () => {
    await promptInstall();
    installBtn.classList.remove('is-available');
  });
  const offInstall = onInstallableChange((avail) => {
    installBtn.classList.toggle('is-available', !!avail);
  });
  // Drop the listener if the header is replaced.
  installBtn.addEventListener('DOMNodeRemovedFromDocument', offInstall);

  const langs = document.createElement('div');
  langs.className = 'lang-toggle';
  langs.setAttribute('role', 'group');
  langs.setAttribute('aria-label', 'Language');
  for (const code of ['en', 'id']) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = t(`lang.${code}`);
    b.setAttribute('aria-pressed', String(code === getLocale()));
    if (code === getLocale()) b.classList.add('is-active');
    b.addEventListener('click', () => setLocale(code));
    langs.appendChild(b);
  }

  inner.append(brand, nav, installBtn, langs);
  header.appendChild(inner);
  return header;
}
