import { t, tr, getLocale } from '../i18n/index.js';

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * "Learn" section built from details.js `learn` block:
 *   background (paragraphs), figure { svg(lang), caption }, keyIdeas,
 *   vocabulary [[term, def]], misconceptions [[myth, fix]], realWorld,
 *   questions [{ q, a }]. Every field is optional and bilingual.
 * Returns null when the block is absent so older sims render unchanged.
 */
export function buildLearn(learn) {
  if (!learn || typeof learn !== 'object') return null;
  const lang = getLocale();
  const wrap = document.createElement('section');
  wrap.className = 'learn';
  const parts = [];

  const background = tr(learn.background);
  const fig = learn.figure;
  if ((Array.isArray(background) && background.length) || fig) {
    let figHtml = '';
    if (fig && typeof fig.svg === 'function') {
      let svg = '';
      try { svg = fig.svg(lang); } catch (e) { console.warn('learn figure failed', e); }
      if (svg) figHtml = `<figure class="learn__figure">${svg}${fig.caption ? `<figcaption>${esc(tr(fig.caption))}</figcaption>` : ''}</figure>`;
    }
    const paras = (background || []).map((p) => `<p>${esc(p)}</p>`).join('');
    parts.push(section('learn.background', `<div class="learn__science">${figHtml}<div class="learn__prose">${paras}</div></div>`, true));
  }

  const ideas = tr(learn.keyIdeas);
  if (Array.isArray(ideas) && ideas.length) {
    parts.push(section('learn.keyIdeas', `<ul class="learn__ideas">${ideas.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`, true));
  }

  const vocab = tr(learn.vocabulary);
  if (Array.isArray(vocab) && vocab.length) {
    parts.push(section('learn.vocabulary', `<dl class="learn__vocab">${vocab.map(([term, def]) => `<div><dt>${esc(term)}</dt><dd>${esc(def)}</dd></div>`).join('')}</dl>`));
  }

  const myths = tr(learn.misconceptions);
  if (Array.isArray(myths) && myths.length) {
    parts.push(section('learn.misconceptions', `<ul class="learn__myths">${myths.map(([m, fix]) => `<li><span class="learn__myth">${esc(m)}</span><span class="learn__fix">${esc(fix)}</span></li>`).join('')}</ul>`));
  }

  const rw = tr(learn.realWorld);
  if (Array.isArray(rw) && rw.length) {
    parts.push(section('learn.realWorld', `<ul>${rw.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`));
  }

  const qs = tr(learn.questions);
  if (Array.isArray(qs) && qs.length) {
    parts.push(section('learn.questions', `<ol class="learn__questions">${qs.map((x) => `<li><p>${esc(x.q)}</p><details><summary>${t('learn.showAnswer')}</summary><p>${esc(x.a)}</p></details></li>`).join('')}</ol>`));
  }

  if (!parts.length) return null;
  wrap.innerHTML = `<div class="section-title"><h2>${t('learn.title')}</h2><small>${t('learn.hint')}</small></div>${parts.join('')}`;
  return wrap;
}

function section(key, bodyHtml, open = false) {
  return `<details class="learn__section"${open ? ' open' : ''}><summary><h3>${t(key)}</h3></summary><div class="learn__body">${bodyHtml}</div></details>`;
}
