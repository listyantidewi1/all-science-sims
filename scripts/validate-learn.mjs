// Validate the `learn` block of one or more details.js files. Usage: node validate-learn.mjs <file...>
import path from 'node:path';
let bad = 0;
const fail = (f, m) => { console.log(`FAIL ${f}: ${m}`); bad++; };
const isPair = (x) => Array.isArray(x) && x.length === 2 && x.every((s) => typeof s === 'string' && s.trim());
const strs = (x, min, max) => Array.isArray(x) && x.length >= min && x.length <= max && x.every((s) => typeof s === 'string' && s.trim().length > 10);
for (const f of process.argv.slice(2)) {
  let d;
  try { d = (await import(path.resolve(f))).default; } catch (e) { fail(f, 'cannot import: ' + e.message); continue; }
  for (const k of ['objectives', 'tryThis']) if (!d[k]?.en?.length || !d[k]?.id?.length) fail(f, `missing ${k}`);
  const L = d.learn;
  if (!L) { fail(f, 'no learn block'); continue; }
  for (const lang of ['en', 'id']) {
    if (!strs(L.background?.[lang], 2, 5)) fail(f, `background.${lang} needs 2-5 paragraphs`);
    if (!strs(L.keyIdeas?.[lang], 3, 6)) fail(f, `keyIdeas.${lang} needs 3-6 items`);
    if (!Array.isArray(L.vocabulary?.[lang]) || L.vocabulary[lang].length < 3 || !L.vocabulary[lang].every(isPair)) fail(f, `vocabulary.${lang} needs >=3 [term, definition] pairs`);
    if (!Array.isArray(L.misconceptions?.[lang]) || L.misconceptions[lang].length < 2 || !L.misconceptions[lang].every(isPair)) fail(f, `misconceptions.${lang} needs >=2 [myth, correction] pairs`);
    if (!strs(L.realWorld?.[lang], 2, 6)) fail(f, `realWorld.${lang} needs 2-6 items`);
    const qs = L.questions?.[lang];
    if (!Array.isArray(qs) || qs.length < 2 || !qs.every((q) => q && typeof q.q === 'string' && typeof q.a === 'string' && q.q.trim() && q.a.trim())) fail(f, `questions.${lang} needs >=2 {q, a}`);
    if (!L.figure || typeof L.figure.svg !== 'function') { if (lang === 'en') fail(f, 'figure.svg must be a function (lang) => svg string'); }
    else {
      let svg = '';
      try { svg = L.figure.svg(lang); } catch (e) { fail(f, `figure.svg(${lang}) threw: ${e.message}`); }
      if (typeof svg !== 'string' || !/^\s*<svg[\s>]/.test(svg) || !/<\/svg>\s*$/.test(svg)) fail(f, `figure.svg(${lang}) must return an <svg>…</svg> string`);
      else {
        if (!/viewBox=/.test(svg)) fail(f, 'figure svg needs a viewBox');
        if (/\b(NaN|-?Infinity)\b/.test(svg)) fail(f, `figure svg (${lang}) contains NaN/Infinity coordinates`);
        if (/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/.test(svg)) fail(f, `figure.svg(${lang}) has an unescaped & (use &amp;)`);
        const open = (svg.match(/<([a-zA-Z][\w:-]*)\b[^>]*?(?<!\/)>/g) || []).map((t) => t.match(/<([a-zA-Z][\w:-]*)/)[1]);
        const close = (svg.match(/<\/([a-zA-Z][\w:-]*)>/g) || []).map((t) => t.match(/<\/([a-zA-Z][\w:-]*)>/)[1]);
        const count = (arr) => arr.reduce((m, x) => (m[x] = (m[x] || 0) + 1, m), {});
        const o = count(open), c = count(close);
        for (const tag of new Set([...open, ...close])) if ((o[tag] || 0) !== (c[tag] || 0)) fail(f, `figure.svg(${lang}) unbalanced <${tag}> (${o[tag] || 0} open, ${c[tag] || 0} close)`);
      }
      if (!L.figure.caption?.[lang]) fail(f, `figure.caption.${lang} missing`);
    }
  }
}
console.log(bad ? `${bad} problem(s)` : 'all good');
process.exit(bad ? 1 : 0);
