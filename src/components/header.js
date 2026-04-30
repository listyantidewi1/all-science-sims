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

  // Subjects dropdown — collapses 14 items into a single toggle so the navbar
  // fits on any screen.
  const dropdown = document.createElement('div');
  dropdown.className = 'nav-dropdown';
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'nav-dropdown__toggle';
  toggle.setAttribute('aria-haspopup', 'true');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.innerHTML = `<span>${t('home.subjects')}</span><span class="nav-dropdown__caret" aria-hidden="true">▾</span>`;
  const panel = document.createElement('div');
  panel.className = 'nav-dropdown__panel';
  panel.setAttribute('role', 'menu');
  for (const s of SUBJECTS) {
    const a = document.createElement('a');
    a.href = `#/${s.id}`;
    a.dataset.subject = s.id;
    a.setAttribute('role', 'menuitem');
    a.style.setProperty('--accent', `var(--subj-${s.id})`);
    a.innerHTML = `<span class="nav-dropdown__icon" aria-hidden="true">${s.icon}</span><span>${tr(s.name)}</span>`;
    a.addEventListener('click', () => closeDropdown());
    panel.appendChild(a);
  }
  dropdown.append(toggle, panel);
  nav.appendChild(dropdown);

  const about = document.createElement('a');
  about.href = '#/about';
  about.textContent = t('nav.about');
  nav.appendChild(about);

  const closeDropdown = () => {
    dropdown.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };
  const openDropdown = () => {
    dropdown.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
  };
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (dropdown.classList.contains('is-open')) closeDropdown(); else openDropdown();
  });
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) closeDropdown();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDropdown();
  });

  // Mark active nav item based on hash
  const markActive = () => {
    const hash = location.hash || '#/';
    // Top-level links (Home, About)
    [home, about].forEach((a) => {
      a.classList.toggle('is-active', a.getAttribute('href') === hash || (hash.startsWith(a.getAttribute('href')) && a.getAttribute('href') !== '#/'));
    });
    // Subject items inside dropdown
    let subjectActive = false;
    panel.querySelectorAll('a').forEach((a) => {
      const isActive = hash === a.getAttribute('href') || hash.startsWith(a.getAttribute('href') + '/');
      a.classList.toggle('is-active', isActive);
      if (isActive) subjectActive = true;
    });
    toggle.classList.toggle('is-active', subjectActive);
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
