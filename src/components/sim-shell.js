import { t, tr, getLocale } from '../i18n/index.js';
import { SUBJECT_BY_ID } from '../catalog/subjects.js';
import { SIMS } from '../catalog/index.js';
import { simCard } from './sim-card.js';
import { buildLearn } from './learn.js';
import { serializeParams } from '../lib/params.js';
import { gradeLabel } from '../lib/levels.js';

/**
 * Wraps a sim with the surrounding chrome: breadcrumbs, stage container,
 * intro / objectives / try-this aside.
 *
 * Returns { root, stageEl, cleanup } — the page calls await manifest.load()
 * then mod.mount(stageEl) and stores its cleanup fn.
 */
export function buildSimShell(sim, query = new URLSearchParams()) {
  const subj = SUBJECT_BY_ID[sim.subject];

  const root = document.createElement('div');
  root.dataset.subject = sim.subject;
  root.style.setProperty('--accent', `var(--subj-${sim.subject})`);

  const crumbs = document.createElement('nav');
  crumbs.className = 'crumbs';
  crumbs.innerHTML = `
    <a href="#/">${t('nav.home')}</a>
    <span>›</span>
    <a href="#/${sim.subject}">${tr(subj.name)}</a>
    <span>›</span>
    <span>${tr(sim.title)}</span>
  `;

  const heading = document.createElement('div');
  heading.style.marginBottom = 'var(--space-4)';
  const labBadge = sim.hasLab
    ? `<span class="sim-card__lab" style="margin-left:12px;font-size:12px;padding:4px 12px" title="${t('lab.badgeTitle')}">🧪 ${t('lab.badge')}</span>`
    : '';
  const gradeBadge = gradeLabel(sim)
    ? `<span class="sim-card__grade" style="margin-left:8px;font-size:12px;padding:4px 12px" title="${t('level.badgeTitle')}">${gradeLabel(sim)}</span>`
    : '';
  heading.innerHTML = `<h1 style="margin:0;display:inline-flex;align-items:center;flex-wrap:wrap">${tr(sim.title)}${labBadge}${gradeBadge}</h1>`;

  const stageEl = document.createElement('div');
  stageEl.className = 'sim-stage';

  // Explanatory text sits BELOW the stage so the canvas and its controls get
  // the full width (controls move beside the canvas on wide screens).
  const aside = document.createElement('section');
  aside.className = 'sim-aside';

  const intro = document.createElement('div');
  intro.className = 'sim-aside__card';
  intro.innerHTML = `
    <h3>${t('sim.about')}</h3>
    <p>${tr(sim.description)}</p>
  `;
  aside.appendChild(intro);

  // Objectives and "try this" live in a lazily loaded details.js next to the
  // manifest, so the catalog stays small. Render them when they arrive.
  const detailsHost = document.createElement('div');
  detailsHost.className = 'sim-details sim-aside__card';
  aside.appendChild(detailsHost);
  const learnHost = document.createElement('div');
  const renderDetails = (d) => {
    const learnEl = buildLearn(d?.learn);
    learnHost.innerHTML = '';
    if (learnEl) learnHost.appendChild(learnEl);
    const parts = [];
    for (const [key, labelKey] of [['objectives', 'sim.objectives'], ['tryThis', 'sim.tryThis']]) {
      const list = tr(d?.[key]);
      if (Array.isArray(list) && list.length) {
        parts.push(`<div><h3>${t(labelKey)}</h3><ul>${list.map((o) => `<li>${o}</li>`).join('')}</ul></div>`);
      }
    }
    detailsHost.innerHTML = parts.join('');
    detailsHost.style.display = parts.length ? '' : 'none';
  };
  if (typeof sim.details === 'function') {
    sim.details().then((mod) => renderDetails(mod.default ?? mod)).catch((e) => console.warn('details failed to load', e));
  } else {
    renderDetails(sim);
  }

  aside.appendChild(buildSharePanel(sim, stageEl));

  root.append(crumbs, heading, stageEl, aside, learnHost, buildRelated(sim));

  return { root, stageEl };
}

/** Up to four other sims: same subject sharing a topic first, then same subject. */
function buildRelated(sim) {
  const wrap = document.createElement('section');
  wrap.className = 'sim-related';
  const topics = new Set(sim.topics || []);
  const score = (s) => (s.topics || []).filter((tp) => topics.has(tp)).length;
  const pool = SIMS.filter((s) => s !== sim && s.subject === sim.subject);
  const picks = pool
    .map((s, i) => ({ s, k: score(s), i }))
    .sort((a, b) => b.k - a.k || Math.abs(a.i - pool.indexOf(sim)) - Math.abs(b.i - pool.indexOf(sim)))
    .slice(0, 4)
    .map((x) => x.s);
  if (!picks.length) return wrap;
  wrap.innerHTML = `<div class="section-title"><h2>${t('sim.related')}</h2></div>`;
  const grid = document.createElement('div');
  grid.className = 'grid';
  for (const s of picks) grid.appendChild(simCard(s));
  wrap.appendChild(grid);
  return wrap;
}

/** Absolute URL of this deployment's index page (works on GitHub Pages subpaths and file://). */
function siteBase() {
  return location.href.split('#')[0];
}

/** Deep link to `sim` carrying the current control values (and language). */
export function simLink(sim, { embed = false, extra = null } = {}) {
  const q = serializeParams();
  if (extra) for (const [k, v] of Object.entries(extra)) q.set(k, v);
  if (getLocale() !== 'en') q.set('lang', getLocale());
  const qs = q.toString();
  return `${siteBase()}#/${embed ? 'embed/' : ''}${sim.subject}/${sim.id}${qs ? '?' + qs : ''}`;
}

function embedSnippet(sim) {
  const src = simLink(sim, { embed: true });
  const title = tr(sim.title).replace(/"/g, '&quot;');
  return `<iframe src="${src}" title="${title} — All-Science Sims" width="100%" height="640" style="border:0;border-radius:12px" loading="lazy" allowfullscreen></iframe>`;
}

async function copyText(text, btn, doneLabel) {
  const original = btn.textContent;
  try {
    await navigator.clipboard.writeText(text);
    btn.textContent = doneLabel;
  } catch {
    btn.textContent = t('share.copyFailed');
  }
  setTimeout(() => { btn.textContent = original; }, 1600);
}

/**
 * "Share" block in the aside: copy a deep link that reproduces the current
 * control values, or copy an <iframe> snippet for LMS / blog embedding.
 */
function buildSharePanel(sim, stageEl) {
  const wrap = document.createElement('details');
  wrap.className = 'share sim-aside__card';
  wrap.innerHTML = `
    <summary><h3>${t('share.title')}</h3></summary>
    <p>${t('share.hint')}</p>
    <div class="share__row">
      <input class="share__field" type="text" readonly aria-label="${t('share.linkLabel')}" />
      <button type="button" class="btn share__copy" data-kind="link">${t('share.copyLink')}</button>
    </div>
    <div class="share__row">
      <textarea class="share__field share__embed" rows="3" readonly aria-label="${t('share.embedLabel')}"></textarea>
      <button type="button" class="btn share__copy" data-kind="embed">${t('share.copyEmbed')}</button>
    </div>
    <p class="share__fine">${t('share.embedHint')}</p>
  `;
  const linkField = wrap.querySelector('input');
  const embedField = wrap.querySelector('textarea');
  const refresh = () => {
    linkField.value = simLink(sim);
    embedField.value = embedSnippet(sim);
  };
  refresh();
  // Controls register only once the sim is mounted; refresh on start and on every change.
  stageEl.addEventListener('sim:started', refresh);
  stageEl.addEventListener('input', refresh);
  stageEl.addEventListener('change', refresh);
  for (const f of [linkField, embedField]) f.addEventListener('focus', () => { refresh(); f.select(); });
  wrap.querySelectorAll('.share__copy').forEach((btn) => {
    btn.addEventListener('click', () => {
      refresh();
      copyText(btn.dataset.kind === 'link' ? linkField.value : embedField.value, btn, t('share.copied'));
    });
  });
  return wrap;
}

/**
 * Minimal chrome for #/embed/<subject>/<sim>: the stage plus a one-line
 * credit bar linking back to the full page. The header and footer are hidden
 * by the `is-embed` body class (see layout.css).
 */
export function buildEmbedShell(sim, query = new URLSearchParams()) {
  const root = document.createElement('div');
  root.className = 'embed';
  root.dataset.subject = sim.subject;
  root.style.setProperty('--accent', `var(--subj-${sim.subject})`);

  const stageEl = document.createElement('div');
  stageEl.className = 'sim-stage';

  const q = new URLSearchParams(query);
  q.delete('autostart');
  const qs = q.toString();
  const fullHref = `${siteBase()}#/${sim.subject}/${sim.id}${qs ? '?' + qs : ''}`;

  const bar = document.createElement('div');
  bar.className = 'embed-bar';
  bar.innerHTML = `
    <span class="embed-bar__title">${tr(sim.title)}</span>
    <span class="embed-bar__credit">${t('embed.credit')}</span>
    <a class="embed-bar__link" href="${fullHref}" target="_blank" rel="noopener">${t('embed.openFull')} ↗</a>
  `;

  root.append(stageEl, bar);
  return { root, stageEl };
}
