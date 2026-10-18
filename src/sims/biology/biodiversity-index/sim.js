import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const COLS = 10, ROWS = 6; // each cell is one 1 m² quadrat
const SPECIES = [
  { name: ['Meranti', 'Meranti'], color: '#10b981', shape: 'circle' },
  { name: ['Fig (Ara)', 'Ara'], color: '#f59e0b', shape: 'square' },
  { name: ['Rattan (Rotan)', 'Rotan'], color: '#8b5cf6', shape: 'tri' },
  { name: ['Fern (Pakis)', 'Pakis'], color: '#38bdf8', shape: 'circle' },
  { name: ['Orchid (Anggrek)', 'Anggrek'], color: '#f472b6', shape: 'diamond' },
  { name: ['Jelutung', 'Jelutung'], color: '#a3e635', shape: 'square' },
  { name: ['Ramin', 'Ramin'], color: '#fb923c', shape: 'tri' },
  { name: ['Ginger (Jahe hutan)', 'Jahe hutan'], color: '#e2e8f0', shape: 'diamond' },
  { name: ['Oil palm (Kelapa sawit)', 'Kelapa sawit'], color: '#eab308', shape: 'circle' },
  { name: ['Grass (Rumput)', 'Rumput'], color: '#4ade80', shape: 'square' },
];
// Presets: relative abundance per species index, and total individuals in the 60 m² plot.
const PRESETS = {
  forest: { label: ['Rainforest', 'Hutan hujan'], w: [[0, 20], [1, 16], [2, 14], [3, 14], [4, 10], [5, 10], [6, 9], [7, 7]], total: 360 },
  plantation: { label: ['Oil-palm plantation', 'Kebun kelapa sawit'], w: [[8, 86], [9, 10], [3, 4]], total: 420 },
  grassland: { label: ['Grassland', 'Padang rumput'], w: [[9, 55], [3, 20], [4, 12], [7, 8], [1, 5]], total: 480 },
  custom: { label: ['Custom', 'Kustom'], w: null, total: 400 },
};

function rng(seed) {
  let a = seed >>> 0;
  return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  cv.canvas.style.touchAction = 'none';
  cv.canvas.style.cursor = 'crosshair';
  const T = (en, id) => (getLocale() === 'id' ? id : en);

  const params = { presetA: 'forest', presetB: 'plantation', richness: 6, dominance: 0.3, disturbance: 0, labHab: 'A' };
  const habs = [
    { id: 'A', preset: 'forest', inds: [], selected: new Set(), seed: 11 },
    { id: 'B', preset: 'plantation', inds: [], selected: new Set(), seed: 23 },
  ];
  let flash = null; // {hab, cell, t}
  let now = 0;

  function weights(preset) {
    if (preset !== 'custom') return PRESETS[preset].w;
    // dominance 0: all S species equally common; dominance 1: species 0 makes up 90 % of individuals
    // and the other S−1 species share the rest equally (so every species stays present in the plot).
    const S = params.richness, w = [];
    if (S <= 1) return [[0, 1]];
    const q = 1 / S + params.dominance * (0.9 - 1 / S);
    for (let i = 0; i < S; i++) w.push([i, i === 0 ? q : (1 - q) / (S - 1)]);
    return w;
  }
  function build(h) {
    const r = rng(h.seed * 1000 + 7);
    const w = weights(h.preset);
    const total = PRESETS[h.preset].total;
    const sum = w.reduce((s, x) => s + x[1], 0) || 1;
    h.inds = [];
    for (let i = 0; i < total; i++) {
      let u = r() * sum, sp = w[w.length - 1][0];
      for (const [s, ww] of w) { if (u < ww) { sp = s; break; } u -= ww; }
      // mild clumping: individuals of a species cluster around species-specific "patches"
      const cell = Math.floor(r() * COLS * ROWS);
      h.inds.push({ sp, cell, ox: 0.1 + r() * 0.8, oy: 0.1 + r() * 0.8, u: r() });
    }
    applyDisturbance(h);
  }
  function applyDisturbance(h) {
    const d = params.disturbance / 100;
    // rank species by abundance (rarest first); species i removed when d > (i+1)/S, dominant survives
    const counts = new Map();
    for (const ind of h.inds) counts.set(ind.sp, (counts.get(ind.sp) || 0) + 1);
    const ranked = [...counts.entries()].sort((a, b) => a[1] - b[1]).map((e) => e[0]);
    const S = ranked.length;
    const gone = new Set();
    ranked.forEach((sp, i) => { if (d > (i + 1) / S) gone.add(sp); });
    for (const ind of h.inds) ind.alive = !gone.has(ind.sp) && ind.u > 0.6 * d;
  }
  function sampleStats(h) {
    const n = new Map();
    let N = 0;
    for (const ind of h.inds) {
      if (!ind.alive || !h.selected.has(ind.cell)) continue;
      n.set(ind.sp, (n.get(ind.sp) || 0) + 1); N++;
    }
    const S = n.size;
    let simpsonSum = 0, H = 0;
    for (const c of n.values()) {
      simpsonSum += c * (c - 1);
      const p = N > 0 ? c / N : 0;
      if (p > 0) H -= p * Math.log(p);
    }
    const D = N > 1 ? 1 - simpsonSum / (N * (N - 1)) : 0;
    const J = S > 1 && H > 0 ? H / Math.log(S) : (S === 1 ? 0 : 0);
    return { n, N, S, D, H, J, q: h.selected.size };
  }

  // ---------- layout helpers ----------
  function panelRect(i) {
    const W = cv.width, H = cv.height;
    const pw = W * 0.47, x = W * 0.02 + i * W * 0.49;
    const gridH = H * 0.44, gy = H * 0.13;
    return { x, y: gy, w: pw, h: gridH, cw: pw / COLS, ch: gridH / ROWS };
  }
  function cellAt(x, y) {
    for (let i = 0; i < 2; i++) {
      const r = panelRect(i);
      if (x >= r.x && x < r.x + r.w && y >= r.y && y < r.y + r.h) {
        const c = Math.floor((x - r.x) / r.cw), rr = Math.floor((y - r.y) / r.ch);
        return { hab: i, cell: rr * COLS + c };
      }
    }
    return null;
  }
  function toggleCell(hab, cell) {
    const h = habs[hab];
    if (h.selected.has(cell)) h.selected.delete(cell); else h.selected.add(cell);
    flash = { hab, cell, t: now };
  }
  function randomQuadrat(hab) {
    const h = habs[hab];
    const free = [];
    for (let i = 0; i < COLS * ROWS; i++) if (!h.selected.has(i)) free.push(i);
    if (!free.length) return;
    toggleCell(hab, free[Math.floor(Math.random() * free.length)]);
  }
  const onDown = (e) => {
    const r = cv.canvas.getBoundingClientRect();
    const x = (e.clientX - r.left) * (cv.width / r.width), y = (e.clientY - r.top) * (cv.height / r.height);
    const hit = cellAt(x, y);
    if (hit) { e.preventDefault(); toggleCell(hit.hab, hit.cell); }
  };
  cv.canvas.addEventListener('pointerdown', onDown);

  // ---------- drawing ----------
  function mark(ctx, x, y, s, sp) {
    const def = SPECIES[sp];
    ctx.fillStyle = def.color;
    ctx.beginPath();
    if (def.shape === 'circle') ctx.arc(x, y, s, 0, Math.PI * 2);
    else if (def.shape === 'square') ctx.rect(x - s, y - s, 2 * s, 2 * s);
    else if (def.shape === 'tri') { ctx.moveTo(x, y - s * 1.2); ctx.lineTo(x + s * 1.1, y + s * 0.8); ctx.lineTo(x - s * 1.1, y + s * 0.8); ctx.closePath(); }
    else { ctx.moveTo(x, y - s * 1.3); ctx.lineTo(x + s * 1.1, y); ctx.lineTo(x, y + s * 1.3); ctx.lineTo(x - s * 1.1, y); ctx.closePath(); }
    ctx.fill();
  }
  function drawPanel(ctx, i) {
    const h = habs[i], r = panelRect(i);
    const W = cv.width, Hh = cv.height;
    const fs = Math.max(10, W * 0.018);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#e2e8f0';
    ctx.font = `bold ${Math.round(fs * 1.15)}px system-ui, sans-serif`;
    const lbl = PRESETS[h.preset].label;
    ctx.fillText(`${T('Habitat', 'Habitat')} ${h.id}: ${T(lbl[0], lbl[1])}`, r.x, r.y - fs * 0.9);
    // ground
    ctx.fillStyle = h.preset === 'plantation' ? '#1f2a1a' : h.preset === 'grassland' ? '#233017' : '#13261c';
    ctx.fillRect(r.x, r.y, r.w, r.h);
    // grid
    ctx.strokeStyle = 'rgba(148,163,184,0.22)'; ctx.lineWidth = 1;
    for (let c = 0; c <= COLS; c++) { ctx.beginPath(); ctx.moveTo(r.x + c * r.cw, r.y); ctx.lineTo(r.x + c * r.cw, r.y + r.h); ctx.stroke(); }
    for (let rr = 0; rr <= ROWS; rr++) { ctx.beginPath(); ctx.moveTo(r.x, r.y + rr * r.ch); ctx.lineTo(r.x + r.w, r.y + rr * r.ch); ctx.stroke(); }
    // selected quadrats
    for (const cell of h.selected) {
      const cx = r.x + (cell % COLS) * r.cw, cy = r.y + Math.floor(cell / COLS) * r.ch;
      ctx.fillStyle = 'rgba(250,204,21,0.16)'; ctx.fillRect(cx, cy, r.cw, r.ch);
      ctx.strokeStyle = '#facc15'; ctx.lineWidth = 2; ctx.strokeRect(cx + 1, cy + 1, r.cw - 2, r.ch - 2);
    }
    if (flash && flash.hab === i && now - flash.t < 0.4) {
      const cell = flash.cell;
      const cx = r.x + (cell % COLS) * r.cw, cy = r.y + Math.floor(cell / COLS) * r.ch;
      ctx.strokeStyle = `rgba(255,255,255,${1 - (now - flash.t) / 0.4})`; ctx.lineWidth = 3;
      ctx.strokeRect(cx, cy, r.cw, r.ch);
    }
    // individuals
    const s = Math.max(2, Math.min(r.cw, r.ch) * 0.11);
    for (const ind of h.inds) {
      if (!ind.alive) continue;
      const cx = r.x + (ind.cell % COLS + ind.ox) * r.cw, cy = r.y + (Math.floor(ind.cell / COLS) + ind.oy) * r.ch;
      mark(ctx, cx, cy, s, ind.sp);
    }
    // scale bar
    ctx.fillStyle = '#94a3b8'; ctx.font = `${Math.round(fs * 0.85)}px system-ui, sans-serif`;
    ctx.fillText(r.w < 260 ? `1 ${T('cell', 'sel')} = 1 m²` : `1 ${T('cell', 'sel')} = 1 m²  ·  ${T('click to place/remove a quadrat', 'klik untuk meletakkan/menghapus kuadrat')}`, r.x, r.y + r.h + fs * 1.1);

    // stats
    const st = sampleStats(h);
    const sy = r.y + r.h + fs * 2.6;
    ctx.font = `${Math.round(fs)}px system-ui, sans-serif`;
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText(`${T('quadrats', 'kuadrat')} = ${st.q}   N = ${st.N}   S = ${st.S}`, r.x, sy);
    ctx.fillStyle = '#facc15';
    ctx.fillText(`Simpson D = ${st.N > 1 ? st.D.toFixed(3) : '—'}`, r.x, sy + fs * 1.4);
    ctx.fillStyle = '#38bdf8';
    ctx.fillText(`Shannon H = ${st.N > 0 ? st.H.toFixed(3) : '—'}   J = H/ln S = ${st.S > 1 ? st.J.toFixed(2) : '—'}`, r.x, sy + fs * 2.8);
    // species bars
    const bx = r.x, by = sy + fs * 3.6, bw = r.w, bh = Hh - by - fs * 0.6;
    const entries = [...st.n.entries()].sort((a, b) => b[1] - a[1]);
    const maxC = entries.length ? entries[0][1] : 1;
    const barH = entries.length ? Math.min(fs * 1.1, bh / entries.length) : 0;
    ctx.font = `${Math.round(fs * 0.8)}px system-ui, sans-serif`;
    entries.forEach(([sp, c], k) => {
      const y = by + k * barH;
      const len = (c / maxC) * bw * 0.55;
      ctx.fillStyle = SPECIES[sp].color;
      ctx.fillRect(bx + bw * 0.42, y + barH * 0.15, Math.max(1, len), barH * 0.7);
      ctx.fillStyle = '#cbd5e1'; ctx.textAlign = 'left';
      const nm = SPECIES[sp].name;
      ctx.fillText(`${T(nm[0], nm[1])}`, bx + fs * 0.9, y + barH * 0.75);
      mark(ctx, bx + fs * 0.35, y + barH * 0.5, barH * 0.22, sp);
      ctx.textAlign = 'right';
      ctx.fillText(`${c} (p=${st.N ? (c / st.N).toFixed(2) : '0'})`, bx + bw, y + barH * 0.75);
    });
    if (!entries.length) {
      ctx.fillStyle = '#64748b'; ctx.textAlign = 'left';
      ctx.fillText(T('No quadrats yet. Click cells in the grid above.', 'Belum ada kuadrat. Klik sel di grid di atas.'), bx, by + fs);
    }
    ctx.textAlign = 'left';
    return st;
  }
  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    drawPanel(ctx, 0); drawPanel(ctx, 1);
    const fs = Math.max(9, W * 0.016);
    ctx.fillStyle = '#94a3b8'; ctx.font = `${Math.round(fs)}px system-ui, sans-serif`; ctx.textAlign = 'center';
    ctx.fillText('D = 1 − Σ nᵢ(nᵢ−1) / N(N−1)      H = −Σ pᵢ ln pᵢ      pᵢ = nᵢ / N', W / 2, fs * 1.3);
    if (params.disturbance > 0) {
      ctx.fillStyle = '#ef4444';
      ctx.fillText(`${T('disturbance', 'gangguan')} ${params.disturbance}%: ${T('rare species removed first, survivors thinned', 'spesies langka hilang dulu, yang bertahan menipis')}`, W / 2, fs * 2.6);
    }
    ctx.textAlign = 'left';
  }

  // ---------- controls ----------
  const presetOpts = Object.keys(PRESETS).map((k) => ({ value: k, label: PRESETS[k].label[0] }));
  const selA = select({ label: 'Habitat A', key: 'a', options: presetOpts, value: habs[0].preset, onChange: (v) => { habs[0].preset = v; habs[0].selected.clear(); build(habs[0]); } });
  const selB = select({ label: 'Habitat B', key: 'b', options: presetOpts, value: habs[1].preset, onChange: (v) => { habs[1].preset = v; habs[1].selected.clear(); build(habs[1]); } });
  const rebuildCustom = () => { for (const h of habs) if (h.preset === 'custom') build(h); };
  const richS = slider({ label: 'Custom: species richness S', key: 'richness', min: 1, max: 10, step: 1, value: params.richness, onInput: (v) => { params.richness = v; rebuildCustom(); } });
  const domS = slider({ label: 'Custom: dominance (0 = even)', key: 'dominance', min: 0, max: 1, step: 0.05, value: params.dominance, format: (v) => v.toFixed(2), onInput: (v) => { params.dominance = v; rebuildCustom(); } });
  const distS = slider({ label: 'Disturbance (%)', key: 'disturbance', min: 0, max: 100, step: 5, value: 0, onInput: (v) => { params.disturbance = v; habs.forEach(applyDisturbance); } });
  const randA = button({ label: '+ Random quadrat A', onClick: () => randomQuadrat(0) });
  const randB = button({ label: '+ Random quadrat B', onClick: () => randomQuadrat(1) });
  const clearB = button({ label: 'Clear quadrats', onClick: () => { habs.forEach((h) => h.selected.clear()); } });
  ctrlPanel.append(selA.el, selB.el, richS.el, domS.el, distS.el, row(randA, randB, clearB));

  const labSel = select({ label: 'Lab records habitat', key: 'lab', options: [{ value: 'A', label: 'A' }, { value: 'B', label: 'B' }], value: 'A', onChange: (v) => { params.labHab = v; } });
  ctrlPanel.appendChild(labSel.el);
  const lab = labPanel({
    title: 'Quadrat survey lab',
    filename: 'biodiversity-index-data.csv',
    columns: [
      { key: 'habitat', label: 'Habitat' },
      { key: 'disturbance', label: 'Disturbance (%)' },
      { key: 'quadrats', label: 'Quadrats' },
      { key: 'N', label: 'N' },
      { key: 'S', label: 'Richness S' },
      { key: 'D', label: 'Simpson D', format: (v) => v.toFixed(3) },
      { key: 'H', label: 'Shannon H', format: (v) => v.toFixed(3) },
      { key: 'J', label: 'Evenness J', format: (v) => v.toFixed(2) },
    ],
    procedure: [
      'Habitat A = Rainforest. Place 1 random quadrat, Record. Add quadrats until you have 3, 5 and 10, recording each time.',
      'Set "Lab records habitat" to B (Oil-palm plantation) and repeat with 1, 3, 5 and 10 quadrats.',
      'Plot Simpson D against number of quadrats for both habitats. After how many quadrats does D level off?',
      'Keep 10 quadrats in A. Set disturbance to 20, 40, 60, 80 and 100 % and record each. Which index falls first?',
      'Set B to Custom, richness 8. Record with dominance 0, 0.5 and 1. Does S change? Do D and H?',
    ],
    predict: 'Which habitat will have the higher Shannon H, and by roughly how much? Will one quadrat be enough to tell?',
    source: () => {
      const h = habs[params.labHab === 'B' ? 1 : 0];
      const st = sampleStats(h);
      if (st.q === 0) return null;
      const lbl = PRESETS[h.preset].label[0];
      return { habitat: `${h.id}: ${lbl}`, disturbance: params.disturbance, quadrats: st.q, N: st.N, S: st.S, D: st.D, H: st.H, J: st.S > 1 ? st.J : 0 };
    },
  });
  ctrlPanel.appendChild(lab.el);

  habs.forEach(build);
  const animator = loop((dt, t) => { now = t; draw(); });
  animator.start();
  return () => { animator.stop(); cv.canvas.removeEventListener('pointerdown', onDown); cv.destroy(); };
}
