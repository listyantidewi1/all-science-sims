import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const FONT = 'system-ui, -apple-system, Roboto, sans-serif';
const COL = { X: '#f59e0b', Y: '#38bdf8', A: '#f59e0b', B: '#38bdf8', both: '#a78bfa', ok: '#a7f3d0', bad: '#fca5a5', dim: 'rgba(148,163,184,0.5)' };

// ---- exact fractions ----------------------------------------------------------------
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a || 1; };
const frac = (n, d) => { if (d === 0) return { n: 0, d: 1 }; const g = gcd(n, d); return { n: n / g, d: d / g }; };
const mul = (p, q) => frac(p.n * q.n, p.d * q.d);
const add = (p, q) => frac(p.n * q.d + q.n * p.d, p.d * q.d);
const sub = (p, q) => frac(p.n * q.d - q.n * p.d, p.d * q.d);
const div = (p, q) => (q.n === 0 ? null : frac(p.n * q.d, p.d * q.n));
const val = (p) => (p ? p.n / p.d : NaN);
const eq = (p, q) => p.n * q.d === q.n * p.d;
const fs = (p) => (p == null ? '—' : p.d === 1 ? String(p.n) : `${p.n}/${p.d}`);
const ZERO = frac(0, 1);

// Leaves are indexed XX=0, XY=1, YX=2, YY=3 (X = the "success" outcome of a stage, Y = the other).
const EVENTS = [
  { id: 'first-X', leaves: [0, 1], en: (X) => `first is ${X}`, id_: (X) => `pertama ${X}` },
  { id: 'first-Y', leaves: [2, 3], en: (X, Y) => `first is ${Y}`, id_: (X, Y) => `pertama ${Y}` },
  { id: 'second-X', leaves: [0, 2], en: (X) => `second is ${X}`, id_: (X) => `kedua ${X}` },
  { id: 'second-Y', leaves: [1, 3], en: (X, Y) => `second is ${Y}`, id_: (X, Y) => `kedua ${Y}` },
  { id: 'both-X', leaves: [0], en: (X) => `both ${X}`, id_: (X) => `keduanya ${X}` },
  { id: 'both-Y', leaves: [3], en: (X, Y) => `both ${Y}`, id_: (X, Y) => `keduanya ${Y}` },
  { id: 'same', leaves: [0, 3], en: () => 'both the same', id_: () => 'keduanya sama' },
  { id: 'atleast-X', leaves: [0, 1, 2], en: (X) => `at least one ${X}`, id_: (X) => `paling sedikit satu ${X}` },
  { id: 'exactly-X', leaves: [1, 2], en: (X) => `exactly one ${X}`, id_: (X) => `tepat satu ${X}` },
];
const DIE_EVENTS = {
  six: { p: frac(1, 6), X: '6', Y: 'not 6', Xid: '6', Yid: 'bukan 6' },
  even: { p: frac(3, 6), X: 'even', Y: 'odd', Xid: 'genap', Yid: 'ganjil' },
  ge5: { p: frac(2, 6), X: '≥ 5', Y: '≤ 4', Xid: '≥ 5', Yid: '≤ 4' },
  prime: { p: frac(3, 6), X: 'prime', Y: 'not prime', Xid: 'prima', Yid: 'bukan prima' },
};
const factorial = (n) => { let f = 1; for (let i = 2; i <= n; i++) f *= i; return f; };
export const nPr = (n, r) => (r > n || r < 0 ? 0 : factorial(n) / factorial(n - r));
export const nCr = (n, r) => (r > n || r < 0 ? 0 : factorial(n) / (factorial(r) * factorial(n - r)));
function combinations(items, r) {
  const out = [];
  const rec = (start, acc) => { if (acc.length === r) { out.push(acc.join('')); return; } for (let i = start; i < items.length; i++) rec(i + 1, [...acc, items[i]]); };
  rec(0, []);
  return out;
}
function permutations(items, r) {
  const out = [];
  const rec = (acc, used) => { if (acc.length === r) { out.push(acc.join('')); return; } for (let i = 0; i < items.length; i++) if (!used[i]) { used[i] = true; rec([...acc, items[i]], used); used[i] = false; } };
  rec([], items.map(() => false));
  return out;
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const fontPx = (f) => clamp(Math.round(cv.width * f), 9, 18);
  const dec = (p) => (Number.isFinite(val(p)) ? val(p).toFixed(3) : '—');

  const state = {
    scenario: 'bag',            // coins | bag | dice
    pHeads: 5,                  // tenths
    red: 3, blue: 2, replace: false,
    die: 'six',
    evA: 'first-X', evB: 'second-X',
    hiIndep: true, hiExcl: false,
    trials: null,               // { counts: [4], n }
    n: 5, r: 3,
  };

  // Build the tree model: stage labels, branch fractions and the four leaf probabilities.
  function model() {
    const s = state;
    let X, Y, p1, p2X, p2Y, stage1, stage2, name;
    if (s.scenario === 'coins') {
      X = 'H'; Y = 'T'; p1 = frac(s.pHeads, 10); p2X = p1; p2Y = p1;
      stage1 = T('1st flip', 'Lemparan 1'); stage2 = T('2nd flip', 'Lemparan 2');
      name = `two coin flips, P(H) = ${fs(p1)}`;
    } else if (s.scenario === 'bag') {
      X = T('R', 'M'); Y = 'B';
      const tot = s.red + s.blue;
      p1 = frac(s.red, tot);
      if (s.replace) { p2X = p1; p2Y = p1; } else { p2X = frac(s.red - 1, tot - 1); p2Y = frac(s.red, tot - 1); }
      stage1 = T('1st draw', 'Pengambilan 1'); stage2 = T('2nd draw', 'Pengambilan 2');
      name = `bag ${s.red} red + ${s.blue} blue, ${s.replace ? 'with' : 'without'} replacement`;
    } else {
      const de = DIE_EVENTS[s.die];
      X = getLocale() === 'id' ? de.Xid : de.X; Y = getLocale() === 'id' ? de.Yid : de.Y;
      p1 = de.p; p2X = de.p; p2Y = de.p;
      stage1 = T('Die 1', 'Dadu 1'); stage2 = T('Die 2', 'Dadu 2');
      name = `two dice, event "${de.X}"`;
    }
    const q1 = sub(frac(1, 1), p1), q2X = sub(frac(1, 1), p2X), q2Y = sub(frac(1, 1), p2Y);
    // leaves: XX, XY, YX, YY
    const leaves = [mul(p1, p2X), mul(p1, q2X), mul(q1, p2Y), mul(q1, q2Y)];
    const independent = eq(p2X, p2Y);
    return { X, Y, p1, q1, p2X, q2X, p2Y, q2Y, leaves, independent, stage1, stage2, name };
  }
  const evLabel = (ev, m) => (getLocale() === 'id' ? ev.id_(m.X, m.Y) : ev.en(m.X, m.Y));
  const pEvent = (leaves, m) => leaves.reduce((acc, i) => add(acc, m.leaves[i]), ZERO);
  function events(m) {
    const A = EVENTS.find((e) => e.id === state.evA), B = EVENTS.find((e) => e.id === state.evB);
    const inter = A.leaves.filter((i) => B.leaves.includes(i));
    const union = [...new Set([...A.leaves, ...B.leaves])];
    const pA = pEvent(A.leaves, m), pB = pEvent(B.leaves, m), pAB = pEvent(inter, m), pU = pEvent(union, m);
    return { A, B, inter, union, pA, pB, pAB, pU, pAgB: div(pAB, pB), pBgA: div(pAB, pA), exclusive: inter.length === 0, indep: eq(pAB, mul(pA, pB)) };
  }

  // ---- drawing ----------------------------------------------------------------------
  function text(ctx, s, x, y, color, size, bold = false, align = 'left', maxW = undefined) {
    ctx.fillStyle = color; ctx.font = `${bold ? 'bold ' : ''}${size}px ${FONT}`; ctx.textAlign = align; ctx.textBaseline = 'middle';
    ctx.fillText(s, x, y, maxW);
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  }
  function branch(ctx, x1, y1, x2, y2, color, width, label) {
    ctx.strokeStyle = color; ctx.lineWidth = width;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    const up = y2 < y1 ? -1 : 1;
    text(ctx, label, mx, my + up * fontPx(0.022), color, fontPx(0.021), true, 'center');
  }
  function node(ctx, x, y, color, label, r) {
    ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#0b1220'; ctx.lineWidth = 2; ctx.stroke();
    if (label) text(ctx, label, x, y, '#0b1220', Math.max(8, r * 1.1), true, 'center');
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    const m = model(), ev = events(m);
    const fsz = fontPx(0.021), small = fontPx(0.018);
    const x0 = W * 0.03, x1 = W * 0.16, x2 = W * 0.30;   // tree columns; the leaf text must end before the panel at 0.65 W
    const xProb = x2 + W * 0.1, xEnd = W * 0.635;
    const yRoot = H * 0.55, yTop = H * 0.32, yBot = H * 0.80;
    const leafY = [H * 0.2, H * 0.44, H * 0.66, H * 0.92];
    const r1 = clamp(W * 0.018, 7, 14), r2 = clamp(W * 0.014, 6, 11);

    // Stage headers
    text(ctx, m.stage1, (x0 + x1) / 2, H * 0.07, '#cbd5e1', small, true, 'center');
    text(ctx, m.stage2, (x1 + x2) / 2, H * 0.07, '#cbd5e1', small, true, 'center');
    text(ctx, T('outcome', 'hasil'), x2 + W * 0.025, H * 0.07, '#cbd5e1', small, true, 'left', W * 0.07);
    text(ctx, T('probability', 'peluang'), xProb, H * 0.07, '#cbd5e1', small, true, 'left');

    // Leaf highlighting for events A and B (mutually-exclusive view) — drawn first as backgrounds
    const leafTag = (i) => { const a = ev.A.leaves.includes(i), b = ev.B.leaves.includes(i); return a && b ? 'both' : a ? 'A' : b ? 'B' : null; };
    if (state.hiExcl) {
      for (let i = 0; i < 4; i++) {
        const tag = leafTag(i);
        if (!tag) continue;
        ctx.fillStyle = tag === 'both' ? 'rgba(167,139,250,0.22)' : tag === 'A' ? 'rgba(245,158,11,0.18)' : 'rgba(56,189,248,0.18)';
        ctx.beginPath(); ctx.roundRect(x2 - r2 - 6, leafY[i] - H * 0.055, xEnd - (x2 - r2 - 6), H * 0.11, 8); ctx.fill();
      }
    }
    // Branches: first stage
    branch(ctx, x0, yRoot, x1, yTop, COL.X, 2.5, fs(m.p1));
    branch(ctx, x0, yRoot, x1, yBot, COL.Y, 2.5, fs(m.q1));
    // second stage (dependence highlight colours the two sub-trees differently when they differ)
    const dep = state.hiIndep && !m.independent;
    const c2 = (isX, fromX) => (dep ? (fromX ? (isX ? '#fb923c' : '#60a5fa') : (isX ? '#fde68a' : '#93c5fd')) : (isX ? COL.X : COL.Y));
    branch(ctx, x1, yTop, x2, leafY[0], c2(true, true), 2, fs(m.p2X));
    branch(ctx, x1, yTop, x2, leafY[1], c2(false, true), 2, fs(m.q2X));
    branch(ctx, x1, yBot, x2, leafY[2], c2(true, false), 2, fs(m.p2Y));
    branch(ctx, x1, yBot, x2, leafY[3], c2(false, false), 2, fs(m.q2Y));
    // Nodes
    node(ctx, x0, yRoot, '#e2e8f0', null, r2 * 0.7);
    node(ctx, x1, yTop, COL.X, m.X.length <= 2 ? m.X : '', r1);
    node(ctx, x1, yBot, COL.Y, m.Y.length <= 2 ? m.Y : '', r1);
    const names = [[m.X, m.X], [m.X, m.Y], [m.Y, m.X], [m.Y, m.Y]];
    const firstP = [m.p1, m.p1, m.q1, m.q1], secondP = [m.p2X, m.q2X, m.p2Y, m.q2Y];
    for (let i = 0; i < 4; i++) {
      node(ctx, x2, leafY[i], i % 2 === 0 ? COL.X : COL.Y, '', r2);
      const nm = names[i].join(m.X.length > 2 ? ', ' : '');
      text(ctx, nm, x2 + r2 + 8, leafY[i], '#e2e8f0', fsz, true);
      text(ctx, `${fs(firstP[i])} × ${fs(secondP[i])} = ${fs(m.leaves[i])}`, xProb, leafY[i] - fsz * 0.7, '#e2e8f0', fsz, false, 'left', xEnd - xProb);
      text(ctx, `= ${dec(m.leaves[i])}`, xProb, leafY[i] + fsz * 0.7, COL.dim, small);
      if (state.trials) text(ctx, `${state.trials.counts[i]}/${state.trials.n} ${T('observed', 'teramati')}`, xProb + W * 0.07, leafY[i] + fsz * 0.7, '#a7f3d0', small, false, 'left', xEnd - xProb - W * 0.07);
      if (state.hiExcl) {
        const tag = leafTag(i);
        if (tag) text(ctx, tag === 'both' ? 'A∩B' : tag, x2 - r2 - 4, leafY[i] - H * 0.04, tag === 'both' ? COL.both : COL[tag], small, true, 'right');
      }
    }

    // Independence note (bottom-left)
    if (state.hiIndep) {
      const msg = m.independent
        ? T(`Stages independent: P(${m.X}₂ | ${m.X}₁) = P(${m.X}₂ | ${m.Y}₁) = ${fs(m.p2X)}`, `Tahap saling bebas: P(${m.X}₂ | ${m.X}₁) = P(${m.X}₂ | ${m.Y}₁) = ${fs(m.p2X)}`)
        : T(`Stages dependent: P(${m.X}₂ | ${m.X}₁) = ${fs(m.p2X)} but P(${m.X}₂ | ${m.Y}₁) = ${fs(m.p2Y)}`, `Tahap tidak bebas: P(${m.X}₂ | ${m.X}₁) = ${fs(m.p2X)} tetapi P(${m.X}₂ | ${m.Y}₁) = ${fs(m.p2Y)}`);
      text(ctx, msg, W * 0.02, H * 0.975, m.independent ? COL.ok : '#fde68a', small, true, 'left', W * 0.61);
    }

    // Right panel: events
    const px = W * 0.65, pw = W * 0.34, lh = fsz * 1.4;
    ctx.fillStyle = 'rgba(15,23,42,0.85)'; ctx.beginPath(); ctx.roundRect(px, H * 0.03, pw, H * 0.94, 10); ctx.fill();
    let y = H * 0.03 + lh * 0.9;
    const put = (s, color = '#e2e8f0', bold = false, size = fsz) => { text(ctx, s, px + 10, y, color, size, bold, 'left', pw - 20); y += lh; };
    put(`A: ${evLabel(ev.A, m)}`, COL.A, true);
    put(`B: ${evLabel(ev.B, m)}`, COL.B, true);
    put(`P(A) = ${fs(ev.pA)} = ${dec(ev.pA)}`, COL.A);
    put(`P(B) = ${fs(ev.pB)} = ${dec(ev.pB)}`, COL.B);
    put(`P(A ∩ B) = ${fs(ev.pAB)} = ${dec(ev.pAB)}`, COL.both);
    put(`P(A ∪ B) = ${fs(ev.pA)} + ${fs(ev.pB)} − ${fs(ev.pAB)} = ${fs(ev.pU)}`, '#e2e8f0', false, small);
    y += lh * 0.3;
    put(`P(A|B) = P(A∩B)/P(B)`, '#fff', true, small);
    put(`       = ${fs(ev.pAB)} ÷ ${fs(ev.pB)} = ${fs(ev.pAgB)}`, '#fff', true, small);
    put(`P(B|A) = ${fs(ev.pAB)} ÷ ${fs(ev.pA)} = ${fs(ev.pBgA)}`, '#cbd5e1', false, small);
    y += lh * 0.3;
    if (state.hiExcl) {
      if (ev.exclusive) {
        put(T('A, B mutually exclusive: no shared leaf,', 'A, B saling lepas: tak ada daun bersama,'), COL.ok, true, small);
        put(T('so P(A∪B) = P(A) + P(B)', 'jadi P(A∪B) = P(A) + P(B)'), COL.ok, true, small);
      } else {
        put(T(`A, B overlap on ${ev.inter.length} leaf${ev.inter.length > 1 ? 'ves' : ''}: not mutually exclusive`, `A, B beririsan pada ${ev.inter.length} daun: tidak saling lepas`), '#fde68a', true, small);
      }
    }
    if (state.hiIndep) {
      const prod = mul(ev.pA, ev.pB);
      put(`P(A)·P(B) = ${fs(prod)}  ${ev.indep ? '=' : '≠'}  P(A∩B) = ${fs(ev.pAB)}`, '#cbd5e1', false, small);
      put(ev.indep ? T('→ A and B are independent', '→ A dan B saling bebas') : T('→ A and B are dependent', '→ A dan B tidak saling bebas'), ev.indep ? COL.ok : '#fde68a', true, small);
    }
    y += lh * 0.3;
    const expected = 100 * val(ev.pA);
    put(T(`Expected in 100 trials: 100 × ${fs(ev.pA)} = ${expected.toFixed(1)}`, `Harapan dalam 100 percobaan: 100 × ${fs(ev.pA)} = ${expected.toFixed(1)}`), '#e2e8f0', false, small);
    if (state.trials) {
      const obs = ev.A.leaves.reduce((s, i) => s + state.trials.counts[i], 0);
      put(T(`Observed A in last ${state.trials.n}: ${obs}`, `Teramati A dalam ${state.trials.n} terakhir: ${obs}`), COL.ok, true, small);
    }
  }

  // ---- simulation -------------------------------------------------------------------
  function simulate(n = 100) {
    const m = model();
    const cum = []; let acc = 0;
    for (const l of m.leaves) { acc += val(l); cum.push(acc); }
    const counts = [0, 0, 0, 0];
    for (let k = 0; k < n; k++) {
      const u = Math.random();
      let i = cum.findIndex((c) => u < c);
      if (i < 0) i = 3;
      counts[i]++;
    }
    state.trials = { counts, n };
  }

  // ---- controls -----------------------------------------------------------------------
  const scenarioSel = select({
    label: 'Scenario', key: 'scenario',
    options: [
      { value: 'coins', label: 'Two coin flips' },
      { value: 'bag', label: 'Two draws from a bag (red / blue)' },
      { value: 'dice', label: 'Two dice' },
    ],
    value: state.scenario, onChange: (v) => { state.scenario = v; state.trials = null; syncVisibility(); },
  });
  const pHeadsS = slider({ label: 'P(Heads)', key: 'ph', min: 1, max: 9, step: 1, value: state.pHeads, format: (v) => `${v}/10`, onInput: (v) => { state.pHeads = v; state.trials = null; } });
  const redS = slider({ label: 'Red balls', key: 'red', min: 1, max: 6, step: 1, value: state.red, onInput: (v) => { state.red = v; state.trials = null; } });
  const blueS = slider({ label: 'Blue balls', key: 'blue', min: 1, max: 6, step: 1, value: state.blue, onInput: (v) => { state.blue = v; state.trials = null; } });
  const replaceT = toggle({ label: 'With replacement', key: 'replace', value: state.replace, onChange: (v) => { state.replace = v; state.trials = null; } });
  const dieSel = select({
    label: 'Event on each die', key: 'die',
    options: [{ value: 'six', label: 'six (1/6)' }, { value: 'even', label: 'even (3/6)' }, { value: 'ge5', label: '5 or 6 (2/6)' }, { value: 'prime', label: 'prime 2,3,5 (3/6)' }],
    value: state.die, onChange: (v) => { state.die = v; state.trials = null; },
  });
  const evOpts = EVENTS.map((e) => ({ value: e.id, label: e.en('X', 'Y') }));
  const evASel = select({ label: 'Event A (X = red / heads / six, Y = the other)', key: 'a', options: evOpts, value: state.evA, onChange: (v) => { state.evA = v; } });
  const evBSel = select({ label: 'Event B', key: 'b', options: evOpts, value: state.evB, onChange: (v) => { state.evB = v; } });
  const indepT = toggle({ label: 'Highlight independent / dependent', key: 'indep', value: state.hiIndep, onChange: (v) => { state.hiIndep = v; } });
  const exclT = toggle({ label: 'Highlight mutually exclusive', key: 'excl', value: state.hiExcl, onChange: (v) => { state.hiExcl = v; } });
  const simB = button({ label: 'Simulate 100 trials', primary: true, onClick: () => simulate(100) });
  const clearB = button({ label: 'Clear trials', onClick: () => { state.trials = null; } });

  const scenarioRow = row(pHeadsS, redS, blueS, replaceT, dieSel);
  ctrlPanel.append(scenarioSel.el, scenarioRow, row(evASel, evBSel), row(indepT, exclT, simB, clearB));
  function syncVisibility() {
    const s = state.scenario;
    pHeadsS.el.style.display = s === 'coins' ? '' : 'none';
    redS.el.style.display = s === 'bag' ? '' : 'none';
    blueS.el.style.display = s === 'bag' ? '' : 'none';
    replaceT.el.style.display = s === 'bag' ? '' : 'none';
    dieSel.el.style.display = s === 'dice' ? '' : 'none';
  }
  syncVisibility();

  // ---- counting panel (nPr, nCr, enumeration for n ≤ 5) -------------------------------
  const countWrap = document.createElement('div');
  countWrap.className = 'ctrl';
  countWrap.style.gridColumn = '1 / -1';
  const countTitle = document.createElement('label');
  countTitle.textContent = 'Counting: permutations nPr and combinations nCr';
  const countOut = document.createElement('div');
  countOut.style.cssText = 'grid-column:1 / -1; font-size:0.9rem; line-height:1.5; white-space:normal;';
  const enumOut = document.createElement('div');
  enumOut.style.cssText = 'grid-column:1 / -1; font-family:ui-monospace, SFMono-Regular, Menlo, monospace; font-size:0.8rem; line-height:1.5; max-height:9em; overflow:auto; opacity:0.9;';
  countWrap.append(countTitle, document.createElement('span'), countOut, enumOut);
  function renderCount() {
    const { n, r } = state;
    const P = nPr(n, r), C = nCr(n, r);
    countOut.innerHTML = '';
    const l1 = document.createElement('div');
    l1.innerHTML = `<strong>${n}P${r}</strong> = n!/(n − r)! = ${n}!/${n - r}! = ${factorial(n)}/${factorial(n - r)} = <strong>${P}</strong> &nbsp;(ordered)`;
    const l2 = document.createElement('div');
    l2.innerHTML = `<strong>${n}C${r}</strong> = n!/(r!(n − r)!) = ${factorial(n)}/(${factorial(r)}·${factorial(n - r)}) = <strong>${C}</strong> &nbsp;(unordered) &nbsp; → nPr = nCr × r! = ${C} × ${factorial(r)} = ${P}`;
    countOut.append(l1, l2);
    enumOut.textContent = '';
    if (n <= 5) {
      const items = ['A', 'B', 'C', 'D', 'E'].slice(0, n);
      const combos = combinations(items, r), perms = permutations(items, r);
      const show = (arr, max) => (arr.length <= max ? arr.join(' ') : `${arr.slice(0, max).join(' ')} … (+${arr.length - max} more)`);
      enumOut.textContent = `Combinations (${combos.length}): ${combos.length ? show(combos, 40) : '{ }'}\nPermutations (${perms.length}): ${perms.length ? show(perms, 40) : '( )'}`;
      enumOut.style.whiteSpace = 'pre-wrap';
    } else {
      enumOut.textContent = 'Enumeration is listed for n ≤ 5.';
    }
  }
  const nS = slider({ label: 'n (objects)', key: 'n', min: 1, max: 10, step: 1, value: state.n, onInput: (v) => { state.n = v; if (state.r > v) { state.r = v; rS.value = v; } renderCount(); } });
  const rS = slider({ label: 'r (chosen)', key: 'r', min: 0, max: 10, step: 1, value: state.r, onInput: (v) => { state.r = Math.min(v, state.n); if (v > state.n) rS.value = state.n; renderCount(); } });
  ctrlPanel.append(row(nS, rS), countWrap);
  renderCount();

  // ---- lab ----------------------------------------------------------------------------
  const lab = labPanel({
    title: 'Probability lab — expected vs observed',
    filename: 'probability-trees-data.csv',
    columns: [
      { key: 'scenario', label: 'Scenario' },
      { key: 'event', label: 'Event A' },
      { key: 'p', label: 'P(A)' },
      { key: 'dec', label: 'Decimal', format: (v) => v.toFixed(3) },
      { key: 'expected', label: 'Expected in 100', format: (v) => v.toFixed(1) },
      { key: 'observed', label: 'Observed in 100' },
    ],
    procedure: [
      'Bag 3 red + 2 blue, without replacement, A = "both X" (both red). Read P(A) from the tree, press Simulate 100 trials, then Record.',
      'Turn replacement on. Record again. Which probability changed and why?',
      'Set A = "at least one X". Check that P(A) = 1 − P(both Y). Record.',
      'Switch to two coins with P(H) = 5/10 and A = "exactly one X". Record. Then try P(H) = 7/10.',
      'Simulate three more times for the same event and compare the observed counts with the expected value.',
    ],
    predict: 'For 3 red and 2 blue without replacement, will P(both red) be larger or smaller than with replacement? Estimate both as fractions first.',
    source: () => {
      const m = model(), ev = events(m);
      const obs = state.trials ? ev.A.leaves.reduce((s, i) => s + state.trials.counts[i], 0) : null;
      return { scenario: m.name, event: ev.A.en(m.X, m.Y), p: fs(ev.pA), dec: val(ev.pA), expected: 100 * val(ev.pA), observed: obs == null ? '–' : `${obs}/${state.trials.n}` };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop(() => { draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
