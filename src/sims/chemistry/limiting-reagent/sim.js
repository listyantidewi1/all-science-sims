import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);

// Atom colours (CPK-like) and radii relative to the molecule size unit.
const ATOM = {
  H:  { c: '#f1f5f9', r: 0.55 },
  O:  { c: '#ef4444', r: 0.85 },
  N:  { c: '#3b82f6', r: 0.85 },
  C:  { c: '#64748b', r: 0.85 },
  Mg: { c: '#4ade80', r: 1.0 },
};
// Molecule pictures: list of [atom, dx, dy] in size units.
const MOL = {
  'H₂':   [['H', -0.5, 0], ['H', 0.5, 0]],
  'O₂':   [['O', -0.75, 0], ['O', 0.75, 0]],
  'N₂':   [['N', -0.75, 0], ['N', 0.75, 0]],
  'CH₄':  [['H', -1.1, -0.9], ['H', 1.1, -0.9], ['H', -1.1, 0.9], ['H', 1.1, 0.9], ['C', 0, 0]],
  'Mg':   [['Mg', 0, 0]],
  'H₂O':  [['H', -1.0, 0.7], ['H', 1.0, 0.7], ['O', 0, 0]],
  'NH₃':  [['H', -1.1, 0.7], ['H', 1.1, 0.7], ['H', 0, -1.2], ['N', 0, 0]],
  'CO₂':  [['O', -1.5, 0], ['O', 1.5, 0], ['C', 0, 0]],
  'MgO':  [['Mg', -0.8, 0], ['O', 0.9, 0]],
};
const REACTIONS = {
  water:   { eq: '2H₂ + O₂ → 2H₂O',          reactants: [{ f: 'H₂', k: 2, Mr: 2.016 }, { f: 'O₂', k: 1, Mr: 31.998 }],  products: [{ f: 'H₂O', k: 2, Mr: 18.015 }] },
  ammonia: { eq: 'N₂ + 3H₂ → 2NH₃',          reactants: [{ f: 'N₂', k: 1, Mr: 28.014 }, { f: 'H₂', k: 3, Mr: 2.016 }],   products: [{ f: 'NH₃', k: 2, Mr: 17.031 }] },
  methane: { eq: 'CH₄ + 2O₂ → CO₂ + 2H₂O',   reactants: [{ f: 'CH₄', k: 1, Mr: 16.043 }, { f: 'O₂', k: 2, Mr: 31.998 }], products: [{ f: 'CO₂', k: 1, Mr: 44.009 }, { f: 'H₂O', k: 2, Mr: 18.015 }] },
  mgo:     { eq: '2Mg + O₂ → 2MgO',          reactants: [{ f: 'Mg', k: 2, Mr: 24.305 }, { f: 'O₂', k: 1, Mr: 31.998 }],  products: [{ f: 'MgO', k: 2, Mr: 40.304 }] },
};
const SCALE = 0.1;      // mol represented by one drawn particle
const MAXN = 6;         // slider max in mol

// Fixed scatter positions (unit square) so particles do not jump between frames.
const SPOTS = (() => {
  const out = [];
  let seed = 777;
  const rnd = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
  // jittered grid: 12 × 10 cells → 120 slots, shuffled
  for (let gy = 0; gy < 10; gy++) for (let gx = 0; gx < 12; gx++) out.push({ x: (gx + 0.2 + 0.6 * rnd()) / 12, y: (gy + 0.2 + 0.6 * rnd()) / 10 });
  for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
  return out;
})();

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const p = { rxn: 'water', nA: 3.0, nB: 1.0, pct: 100 };
  const anim = { xi: 0, running: false }; // xi = reaction extent 0..1
  const rx = () => REACTIONS[p.rxn];

  // ---- stoichiometry ---------------------------------------------------------
  function calc() {
    const r = rx();
    const n = [p.nA, p.nB];
    const ratios = r.reactants.map((re, i) => n[i] / re.k);
    const lim = ratios[0] <= ratios[1] ? 0 : 1;
    const ext = ratios[lim];                              // "moles of reaction"
    const consumed = r.reactants.map((re) => ext * re.k);
    const excess = n.map((ni, i) => Math.max(0, ni - consumed[i]));
    const products = r.products.map((pr) => ({ f: pr.f, mol: ext * pr.k, g: ext * pr.k * pr.Mr }));
    const tie = Math.abs(ratios[0] - ratios[1]) < 1e-9;
    return { n, ratios, lim, ext, consumed, excess, products, tie };
  }

  function step(dt) {
    if (!anim.running) return;
    anim.xi = Math.min(1, anim.xi + dt / 2.2);
    if (anim.xi >= 1) anim.running = false;
  }
  const ease = (x) => x * x * (3 - 2 * x);

  // ---- drawing -----------------------------------------------------------------
  function drawMolecule(ctx, f, x, y, u) {
    const atoms = MOL[f];
    for (const [a, dx, dy] of atoms) {
      const at = ATOM[a];
      ctx.fillStyle = at.c;
      ctx.beginPath(); ctx.arc(x + dx * u, y + dy * u, at.r * u, 0, Math.PI * 2); ctx.fill();
    }
  }
  // Fill a box with up to SPOTS.length particles: `items` = [{ f, count }]
  function fillBox(ctx, box, items, u) {
    let idx = 0;
    for (const it of items) {
      const cnt = Math.min(Math.round(it.count), SPOTS.length - idx);
      for (let i = 0; i < cnt; i++) {
        const s = SPOTS[idx++];
        drawMolecule(ctx, it.f, box.x + s.x * box.w, box.y + s.y * box.h, u);
      }
    }
  }
  function box(ctx, b, title) {
    ctx.fillStyle = '#111a2e';
    ctx.strokeStyle = 'rgba(148,163,184,0.5)';
    ctx.lineWidth = 1.5;
    ctx.fillRect(b.x, b.y, b.w, b.h);
    ctx.strokeRect(b.x, b.y, b.w, b.h);
    ctx.fillStyle = '#cbd5e1';
    ctx.textAlign = 'center';
    ctx.fillText(title, b.x + b.w / 2, b.y - 6);
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    const r = rx();
    const c = calc();
    const xi = ease(anim.xi);
    const fs = Math.max(10, Math.min(15, W / 46));
    ctx.font = `${fs}px system-ui, sans-serif`;
    ctx.textBaseline = 'alphabetic';

    // equation
    ctx.fillStyle = '#f8fafc';
    ctx.textAlign = 'center';
    ctx.font = `bold ${fs * 1.25}px system-ui, sans-serif`;
    ctx.fillText(r.eq, W / 2, fs * 1.7);
    ctx.font = `${fs}px system-ui, sans-serif`;

    // particle boxes
    const bw = W * 0.40, bh = H * 0.40, by = H * 0.17;
    const B1 = { x: W * 0.04, y: by, w: bw, h: bh };
    const B2 = { x: W * 0.56, y: by, w: bw, h: bh };
    const u = Math.max(2, Math.min(bw / 12, bh / 10) * 0.16);
    box(ctx, B1, T('Before: reactants', 'Sebelum: pereaksi'));
    box(ctx, B2, T('After: products + excess', 'Sesudah: produk + sisa'));
    fillBox(ctx, B1, r.reactants.map((re, i) => ({ f: re.f, count: (c.n[i] - xi * c.consumed[i]) / SCALE })), u);
    fillBox(ctx, B2, [
      ...c.products.map((pr) => ({ f: pr.f, count: xi * pr.mol / SCALE })),
      ...r.reactants.map((re, i) => ({ f: re.f, count: xi * c.excess[i] / SCALE })),
    ], u);
    // arrow between boxes
    const ay = by + bh / 2;
    ctx.strokeStyle = '#fbbf24'; ctx.fillStyle = '#fbbf24'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(B1.x + bw + 8, ay); ctx.lineTo(B2.x - 14, ay); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(B2.x - 6, ay); ctx.lineTo(B2.x - 16, ay - 6); ctx.lineTo(B2.x - 16, ay + 6); ctx.fill();
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`${Math.round(anim.xi * 100)}%`, W / 2, ay - 8);
    ctx.fillText(T(`1 particle = ${SCALE} mol`, `1 partikel = ${SCALE} mol`), W / 2, by + bh + fs * 1.3);

    // mole-ratio bars: n / coefficient for each reactant
    const barY = H * 0.66, barH = fs * 0.9, barW = W * 0.40;
    const maxRatio = Math.max(MAXN, ...c.ratios) * 1.05;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText(T('Mole ratio check: n ÷ coefficient (smallest = limiting)', 'Uji perbandingan mol: n ÷ koefisien (terkecil = pembatas)'), W * 0.04, barY - fs * 0.5);
    r.reactants.forEach((re, i) => {
      const y = barY + i * (barH + fs * 0.6);
      const isLim = i === c.lim || c.tie;
      ctx.fillStyle = 'rgba(148,163,184,0.15)';
      ctx.fillRect(W * 0.04, y, barW, barH);
      ctx.fillStyle = isLim ? '#f87171' : '#34d399';
      ctx.fillRect(W * 0.04, y, barW * Math.min(1, c.ratios[i] / maxRatio), barH);
      ctx.fillStyle = '#f8fafc';
      ctx.fillText(`${re.f}: ${c.n[i].toFixed(2)} / ${re.k} = ${c.ratios[i].toFixed(3)}${isLim ? (c.tie ? T('  (exact ratio)', '  (tepat setara)') : T('  ← limiting', '  ← pembatas')) : ''}`, W * 0.04 + barW + 10, y + barH * 0.85);
    });

    // readouts
    let y = barY + 2 * (barH + fs * 0.6) + fs * 0.8;
    const lim = r.reactants[c.lim];
    const other = r.reactants[1 - c.lim];
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(c.tie
      ? T('Neither reactant is in excess — both are used up completely.', 'Tidak ada pereaksi berlebih — keduanya habis bereaksi.')
      : T(`Limiting reagent: ${lim.f}. Excess ${other.f} left: ${c.excess[1 - c.lim].toFixed(3)} mol (${(c.excess[1 - c.lim] * other.Mr).toFixed(2)} g)`,
          `Pereaksi pembatas: ${lim.f}. Sisa ${other.f}: ${c.excess[1 - c.lim].toFixed(3)} mol (${(c.excess[1 - c.lim] * other.Mr).toFixed(2)} g)`), W * 0.04, y);
    y += fs * 1.4;
    ctx.fillStyle = '#e2e8f0';
    const prodTxt = c.products.map((pr) => `${pr.mol.toFixed(3)} mol ${pr.f} = ${pr.g.toFixed(2)} g`).join('   ·   ');
    ctx.fillText(T('Theoretical yield: ', 'Hasil teoretis: ') + prodTxt, W * 0.04, y);
    y += fs * 1.4;
    const main = c.products[0];
    ctx.fillStyle = '#34d399';
    ctx.fillText(T(`Actual yield at ${p.pct}%: ${(main.g * p.pct / 100).toFixed(2)} g ${main.f}   (% yield = actual / theoretical × 100)`,
      `Hasil nyata pada ${p.pct}%: ${(main.g * p.pct / 100).toFixed(2)} g ${main.f}   (% hasil = nyata / teoretis × 100)`), W * 0.04, y);
  }

  // ---- controls -----------------------------------------------------------------
  function react() { anim.xi = 0; anim.running = true; }
  function resetAnim() { anim.xi = 0; anim.running = false; }

  const rxnSel = select({
    label: 'Reaction', key: 'rxn',
    options: Object.entries(REACTIONS).map(([value, r]) => ({ value, label: r.eq })),
    value: p.rxn,
    onChange: (v) => { p.rxn = v; relabel(); resetAnim(); },
  });
  const nAS = slider({ label: `Moles of ${rx().reactants[0].f}`, key: 'na', min: 0, max: MAXN, step: 0.1, value: p.nA, format: (v) => v.toFixed(1) + ' mol', onInput: (v) => { p.nA = v; resetAnim(); } });
  const nBS = slider({ label: `Moles of ${rx().reactants[1].f}`, key: 'nb', min: 0, max: MAXN, step: 0.1, value: p.nB, format: (v) => v.toFixed(1) + ' mol', onInput: (v) => { p.nB = v; resetAnim(); } });
  const pctS = slider({ label: 'Actual yield (% of theoretical)', key: 'yield', min: 0, max: 100, step: 1, value: p.pct, format: (v) => v + '%', onInput: (v) => { p.pct = v; } });
  function relabel() {
    nAS.el.querySelector('label').textContent = `Moles of ${rx().reactants[0].f}`;
    nBS.el.querySelector('label').textContent = `Moles of ${rx().reactants[1].f}`;
  }
  const goB = button({ label: 'React', primary: true, onClick: react });
  const resetB = button({ label: 'Reset', onClick: resetAnim });
  ctrlPanel.append(rxnSel.el, nAS.el, nBS.el, pctS.el, row(goB, resetB));

  const lab = labPanel({
    title: 'Limiting reagent lab',
    filename: 'limiting-reagent-data.csv',
    columns: [
      { key: 'reaction', label: 'Reaction' },
      { key: 'nA',       label: 'n(A) mol',   format: (v) => v.toFixed(2) },
      { key: 'nB',       label: 'n(B) mol',   format: (v) => v.toFixed(2) },
      { key: 'limiting', label: 'Limiting' },
      { key: 'nProd',    label: 'Product mol', format: (v) => v.toFixed(3) },
      { key: 'gProd',    label: 'Theor. g',   format: (v) => v.toFixed(2) },
      { key: 'excess',   label: 'Excess mol', format: (v) => v.toFixed(3) },
      { key: 'pct',      label: '% yield',    format: (v) => v.toFixed(0) },
      { key: 'actual',   label: 'Actual g',   format: (v) => v.toFixed(2) },
    ],
    procedure: [
      'Reaction 2H₂ + O₂ → 2H₂O. Set 3.0 mol H₂ and 1.0 mol O₂. Press React and record.',
      'Raise O₂ to 1.5 mol (the exact 2:1 ratio). Record. Then 2.0 mol O₂ — which reactant is limiting now?',
      'Switch to N₂ + 3H₂ → 2NH₃. Keep H₂ at 3.0 mol and record for N₂ = 0.5, 1.0 and 2.0 mol.',
      'Plot product moles against N₂ moles. Where does the graph stop rising, and why?',
      'For 2Mg + O₂ → 2MgO with 2.0 mol Mg and plenty of O₂, set actual yield to 85% and record the grams of MgO you would really collect.',
    ],
    predict: 'With 3.0 mol H₂ and 1.0 mol O₂, which reactant runs out first, and how many moles of water form?',
    source: () => {
      const r = rx(); const c = calc(); const main = c.products[0];
      return {
        reaction: r.eq,
        nA: p.nA, nB: p.nB,
        limiting: c.tie ? 'both' : r.reactants[c.lim].f,
        nProd: main.mol,
        gProd: main.g,
        excess: c.tie ? 0 : c.excess[1 - c.lim],
        pct: p.pct,
        actual: main.g * p.pct / 100,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
