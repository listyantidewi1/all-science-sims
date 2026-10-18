import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, select, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
const COL = ['#3b82f6', '#f97316']; // class 0 blue, class 1 orange
const KMAX = 15;
const GRID_X = 64, GRID_Y = 64;

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
function gauss() {
  const u = Math.max(1e-12, Math.random()), v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

// --- datasets in the unit square ------------------------------------------
function makeData(kind, noise, n = 160) {
  const pts = [];
  const half = n / 2;
  if (kind === 'blobs') {
    for (let i = 0; i < half; i++) pts.push({ x: 0.32 + gauss() * (0.09 + noise), y: 0.36 + gauss() * (0.09 + noise), c: 0 });
    for (let i = 0; i < half; i++) pts.push({ x: 0.68 + gauss() * (0.09 + noise), y: 0.64 + gauss() * (0.09 + noise), c: 1 });
  } else if (kind === 'moons') {
    for (let i = 0; i < half; i++) {
      const a = Math.PI * Math.random();
      pts.push({ x: 0.5 + 0.28 * Math.cos(a) - 0.14 + gauss() * (0.04 + noise), y: 0.42 + 0.28 * Math.sin(a) - 0.1 + gauss() * (0.04 + noise), c: 0 });
    }
    for (let i = 0; i < half; i++) {
      const a = Math.PI * Math.random();
      pts.push({ x: 0.5 - 0.28 * Math.cos(a) + 0.14 + gauss() * (0.04 + noise), y: 0.58 - 0.28 * Math.sin(a) + 0.1 + gauss() * (0.04 + noise), c: 1 });
    }
  } else { // overlapping
    for (let i = 0; i < half; i++) pts.push({ x: 0.40 + gauss() * (0.13 + noise), y: 0.50 + gauss() * (0.15 + noise), c: 0 });
    for (let i = 0; i < half; i++) pts.push({ x: 0.60 + gauss() * (0.13 + noise), y: 0.50 + gauss() * (0.15 + noise), c: 1 });
  }
  for (const p of pts) { p.x = clamp(p.x, 0.02, 0.98); p.y = clamp(p.y, 0.02, 0.98); }
  // shuffle, then 70 / 30 split
  for (let i = pts.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pts[i], pts[j]] = [pts[j], pts[i]]; }
  const nTrain = Math.round(pts.length * 0.7);
  return { train: pts.slice(0, nTrain), test: pts.slice(nTrain) };
}

// Sorted neighbour list (indices + distances) of point q among `train`.
function neighbours(q, train, out) {
  for (let i = 0; i < train.length; i++) {
    const p = train[i];
    out[i].i = i; out[i].d = Math.hypot(q.x - p.x, q.y - p.y);
  }
  out.sort((a, b) => a.d - b.d);
  return out;
}
// Votes for class 1 among the first k entries; tie → nearest neighbour decides.
function vote(sorted, train, k) {
  const kk = Math.min(k, sorted.length);
  let ones = 0;
  for (let i = 0; i < kk; i++) ones += train[sorted[i].i].c;
  const zeros = kk - ones;
  let pred;
  if (ones === zeros) pred = kk > 0 ? train[sorted[0].i].c : 0;
  else pred = ones > zeros ? 1 : 0;
  return { pred, ones, zeros, k: kk };
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { kind: 'blobs', k: 5, noise: 0, showTest: true };
  const state = {
    train: [], test: [],
    query: { x: 0.5, y: 0.5 },
    grid: new Uint8Array(GRID_X * GRID_Y),      // predicted class per cell
    gridFrac: new Float32Array(GRID_X * GRID_Y), // vote fraction for the winner
    accTrain: new Array(KMAX + 1).fill(0),
    accTest: new Array(KMAX + 1).fill(0),
    dirty: true,
  };
  let scratch = [];

  function regenerate() {
    const d = makeData(params.kind, params.noise);
    state.train = d.train; state.test = d.test;
    scratch = state.train.map(() => ({ i: 0, d: 0 }));
    state.dirty = true;
  }
  regenerate();

  function recompute() {
    const { train, test } = state;
    // decision grid for the current k
    for (let j = 0; j < GRID_Y; j++) for (let i = 0; i < GRID_X; i++) {
      const q = { x: (i + 0.5) / GRID_X, y: (j + 0.5) / GRID_Y };
      const s = neighbours(q, train, scratch);
      const v = vote(s, train, params.k);
      state.grid[j * GRID_X + i] = v.pred;
      state.gridFrac[j * GRID_X + i] = v.k ? Math.max(v.ones, v.zeros) / v.k : 0.5;
    }
    // accuracy curves for every k (one sort per point, then running vote counts)
    const accFor = (set) => {
      const correct = new Array(KMAX + 1).fill(0);
      for (const p of set) {
        const s = neighbours(p, train, scratch);
        let ones = 0;
        for (let k = 1; k <= KMAX; k++) {
          if (k <= s.length) ones += train[s[k - 1].i].c;
          const kk = Math.min(k, s.length);
          const zeros = kk - ones;
          let pred;
          if (ones === zeros) pred = kk > 0 ? train[s[0].i].c : 0; else pred = ones > zeros ? 1 : 0;
          if (pred === p.c) correct[k]++;
        }
      }
      return correct.map((c) => (set.length ? c / set.length : 0));
    };
    state.accTrain = accFor(train);
    state.accTest = accFor(test);
    state.dirty = false;
  }

  // --- layout -----------------------------------------------------------------
  function layout() {
    const W = cv.width, H = cv.height;
    const side = Math.min(H * 0.84, W * 0.56);
    const plot = { x: W * 0.03, y: H * 0.08, w: side, h: side };
    const px = plot.x + plot.w + W * 0.05;
    // the vote readout above the chart is ~8 text lines tall; on short canvases the font floor
    // (10 px) makes it taller than 36% of H, so push the chart down to keep them apart
    const fs = Math.max(10, Math.round(H * 0.03));
    const chartTop = Math.max(H * 0.44, H * 0.08 + fs * 9.8);
    const chart = { x: px + W * 0.03, y: chartTop, w: W * 0.97 - px - W * 0.03, h: H * 0.84 - chartTop };
    const panel = { x: px, y: H * 0.08, w: W * 0.97 - px };
    return { plot, chart, panel };
  }
  const toPx = (P, p) => ({ x: P.x + p.x * P.w, y: P.y + (1 - p.y) * P.h });
  const fromPx = (P, x, y) => ({ x: clamp((x - P.x) / P.w, 0, 1), y: clamp(1 - (y - P.y) / P.h, 0, 1) });

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    if (state.dirty) recompute();
    const { plot: P, chart: C, panel } = layout();
    const fs = Math.max(10, Math.round(H * 0.03));
    const font = `${fs}px system-ui, -apple-system, Roboto, sans-serif`;
    const bold = `bold ${fs}px system-ui, -apple-system, Roboto, sans-serif`;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);

    // decision regions
    const cw = P.w / GRID_X, ch = P.h / GRID_Y;
    for (let j = 0; j < GRID_Y; j++) for (let i = 0; i < GRID_X; i++) {
      const idx = j * GRID_X + i;
      ctx.fillStyle = COL[state.grid[idx]];
      ctx.globalAlpha = 0.10 + 0.18 * clamp((state.gridFrac[idx] - 0.5) * 2, 0, 1);
      ctx.fillRect(P.x + i * cw, P.y + (GRID_Y - 1 - j) * ch, cw + 0.6, ch + 0.6);
    }
    ctx.globalAlpha = 1;
    ctx.strokeStyle = 'rgba(148,163,184,0.6)'; ctx.lineWidth = 1;
    ctx.strokeRect(P.x, P.y, P.w, P.h);

    // neighbours of the query
    const s = neighbours(state.query, state.train, scratch);
    const v = vote(s, state.train, params.k);
    const qp = toPx(P, state.query);
    if (v.k > 0) {
      const rk = s[v.k - 1].d * P.w;
      ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(qp.x, qp.y, rk, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
      for (let i = 0; i < v.k; i++) {
        const p = toPx(P, state.train[s[i].i]);
        ctx.strokeStyle = 'rgba(255,255,255,0.45)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(qp.x, qp.y); ctx.lineTo(p.x, p.y); ctx.stroke();
      }
    }

    // training points (filled) and test points (hollow)
    const r = Math.max(3, Math.min(W, H) * 0.009);
    for (const p of state.train) {
      const q = toPx(P, p);
      ctx.fillStyle = COL[p.c];
      ctx.beginPath(); ctx.arc(q.x, q.y, r, 0, Math.PI * 2); ctx.fill();
    }
    for (let i = 0; i < v.k; i++) {
      const q = toPx(P, state.train[s[i].i]);
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(q.x, q.y, r + 2.5, 0, Math.PI * 2); ctx.stroke();
    }
    if (params.showTest) {
      for (const p of state.test) {
        const q = toPx(P, p);
        const sp = neighbours(p, state.train, scratch);
        const pv = vote(sp, state.train, params.k);
        ctx.strokeStyle = COL[p.c]; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(q.x, q.y, r, 0, Math.PI * 2); ctx.stroke();
        if (pv.pred !== p.c) { // misclassified test point: red cross
          ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.moveTo(q.x - r, q.y - r); ctx.lineTo(q.x + r, q.y + r); ctx.moveTo(q.x + r, q.y - r); ctx.lineTo(q.x - r, q.y + r); ctx.stroke();
        }
      }
    }

    // query point: star
    ctx.fillStyle = COL[v.pred]; ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
    const R1 = r * 2.6, R2 = r * 1.2;
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? R2 : R1;
      ctx.lineTo(qp.x + Math.cos(a) * rr, qp.y + Math.sin(a) * rr);
    }
    ctx.closePath(); ctx.fill(); ctx.stroke();

    // titles
    ctx.fillStyle = '#e2e8f0'; ctx.font = bold; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.fillText(T('Drag the star. Filled = training, hollow = test, red × = test error', 'Geser bintang. Terisi = latih, berongga = uji, × merah = kesalahan uji'), P.x, P.y - fs * 0.6);

    // right panel: vote readout
    let y = panel.y + fs;
    ctx.font = bold; ctx.fillStyle = '#e2e8f0';
    ctx.fillText(T(`k = ${params.k}: vote among ${v.k} nearest`, `k = ${params.k}: suara di antara ${v.k} terdekat`), panel.x, y);
    y += fs * 1.5;
    // vote bar
    const barW = panel.w, barH = fs * 1.1;
    const f0 = v.k ? v.zeros / v.k : 0.5;
    ctx.fillStyle = COL[0]; ctx.fillRect(panel.x, y, barW * f0, barH);
    ctx.fillStyle = COL[1]; ctx.fillRect(panel.x + barW * f0, y, barW * (1 - f0), barH);
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; ctx.strokeRect(panel.x, y, barW, barH);
    y += barH + fs * 1.2;
    ctx.font = font;
    ctx.fillStyle = COL[0]; ctx.fillText(T(`blue ${v.zeros}`, `biru ${v.zeros}`), panel.x, y);
    ctx.fillStyle = COL[1]; ctx.textAlign = 'right'; ctx.fillText(T(`orange ${v.ones}`, `oranye ${v.ones}`), panel.x + barW, y);
    ctx.textAlign = 'left';
    y += fs * 1.5;
    ctx.fillStyle = '#e2e8f0'; ctx.font = bold;
    ctx.fillText(T(`→ predicted: ${v.pred ? 'orange' : 'blue'}${v.ones === v.zeros ? ' (tie: nearest decides)' : ''}`,
      `→ prediksi: ${v.pred ? 'oranye' : 'biru'}${v.ones === v.zeros ? ' (seri: terdekat menentukan)' : ''}`), panel.x, y);
    y += fs * 1.6;
    ctx.font = font; ctx.fillStyle = '#cbd5e1';
    ctx.fillText(T(`Train acc ${(state.accTrain[params.k] * 100).toFixed(0)}%   Test acc ${(state.accTest[params.k] * 100).toFixed(0)}%   (n = ${state.train.length} / ${state.test.length})`,
      `Akurasi latih ${(state.accTrain[params.k] * 100).toFixed(0)}%   Akurasi uji ${(state.accTest[params.k] * 100).toFixed(0)}%   (n = ${state.train.length} / ${state.test.length})`), panel.x, y);

    // accuracy-vs-k chart
    ctx.strokeStyle = 'rgba(148,163,184,0.6)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(C.x, C.y); ctx.lineTo(C.x, C.y + C.h); ctx.lineTo(C.x + C.w, C.y + C.h); ctx.stroke();
    const yMin = 0.5, yMax = 1.0;
    const cx = (k) => C.x + ((k - 1) / (KMAX - 1)) * C.w;
    const cy = (a) => C.y + (1 - (clamp(a, yMin, yMax) - yMin) / (yMax - yMin)) * C.h;
    ctx.fillStyle = '#94a3b8'; ctx.font = `${Math.round(fs * 0.85)}px system-ui, sans-serif`;
    ctx.textAlign = 'right';
    for (const a of [0.5, 0.75, 1.0]) {
      ctx.fillText(`${Math.round(a * 100)}%`, C.x - 4, cy(a) + fs * 0.3);
      ctx.strokeStyle = 'rgba(148,163,184,0.2)'; ctx.beginPath(); ctx.moveTo(C.x, cy(a)); ctx.lineTo(C.x + C.w, cy(a)); ctx.stroke();
    }
    ctx.textAlign = 'center';
    for (const k of [1, 5, 10, 15]) ctx.fillText(String(k), cx(k), C.y + C.h + fs);
    ctx.fillText('k', C.x + C.w / 2, C.y + C.h + fs * 2.1);
    const line = (arr, color, dash) => {
      ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.setLineDash(dash);
      ctx.beginPath();
      for (let k = 1; k <= KMAX; k++) { const X = cx(k), Y = cy(arr[k]); if (k === 1) ctx.moveTo(X, Y); else ctx.lineTo(X, Y); }
      ctx.stroke(); ctx.setLineDash([]);
    };
    line(state.accTrain, '#a78bfa', [5, 4]);
    line(state.accTest, '#22c55e', []);
    // current k marker
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(cx(params.k), C.y); ctx.lineTo(cx(params.k), C.y + C.h); ctx.stroke();
    ctx.fillStyle = '#22c55e'; ctx.beginPath(); ctx.arc(cx(params.k), cy(state.accTest[params.k]), 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#a78bfa'; ctx.beginPath(); ctx.arc(cx(params.k), cy(state.accTrain[params.k]), 4, 0, Math.PI * 2); ctx.fill();
    // legend + story labels
    ctx.textAlign = 'left'; ctx.font = `${Math.round(fs * 0.85)}px system-ui, sans-serif`;
    ctx.fillStyle = '#a78bfa'; ctx.fillText(T('— — train', '— — latih'), C.x + 4, C.y - fs * 1.4);
    ctx.fillStyle = '#22c55e'; ctx.fillText(T('—— test', '—— uji'), C.x + C.w * 0.33, C.y - fs * 1.4);
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(T('small k: memorises (overfit)', 'k kecil: menghafal (overfit)'), C.x + 4, C.y - fs * 0.3);
    ctx.textAlign = 'right';
    ctx.fillText(T('large k: too smooth (underfit)', 'k besar: terlalu mulus (underfit)'), C.x + C.w, C.y + C.h - fs * 0.4);
    ctx.textAlign = 'left';
  }

  // --- drag the query point -------------------------------------------------
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) {
      const { plot: P } = layout();
      const q = toPx(P, state.query);
      if (Math.hypot(x - q.x, y - q.y) < 22) return 'query';
      if (x >= P.x && x <= P.x + P.w && y >= P.y && y <= P.y + P.h) return 'query'; // tap anywhere in the plot to move it
      return null;
    },
    onStart(id, x, y) { state.query = fromPx(layout().plot, x, y); },
    onDrag(id, x, y) { state.query = fromPx(layout().plot, x, y); },
    handles: () => { const q = toPx(layout().plot, state.query); return [{ id: 'query', x: q.x, y: q.y, label: 'Query point (drag to classify)' }]; },
    cursor: 'crosshair',
    hoverCursor: 'grab',
  });

  // --- controls -----------------------------------------------------------------
  const kindSel = select({
    label: 'Dataset', key: 'dataset',
    options: [
      { value: 'blobs', label: T('Two blobs', 'Dua gumpalan') },
      { value: 'moons', label: T('Two moons', 'Dua bulan sabit') },
      { value: 'overlap', label: T('Overlapping', 'Tumpang tindih') },
    ],
    value: params.kind,
    onChange: (v) => { params.kind = v; regenerate(); },
  });
  const kS = slider({ label: 'k (neighbours)', key: 'k', min: 1, max: KMAX, step: 1, value: params.k, onInput: (v) => { params.k = v; state.dirty = true; } });
  const noiseS = slider({ label: 'Extra noise', key: 'noise', min: 0, max: 0.12, step: 0.01, value: 0, format: (v) => v.toFixed(2), onInput: (v) => { params.noise = v; regenerate(); } });
  const newB = button({ label: T('New sample (reshuffle)', 'Sampel baru (kocok ulang)'), onClick: regenerate });
  const testT = toggle({ label: T('Show test points', 'Tampilkan titik uji'), key: 'show-test', value: true, onChange: (v) => { params.showTest = v; } });
  ctrlPanel.append(kindSel.el, kS.el, noiseS.el, row(newB, testT));

  const lab = labPanel({
    title: 'kNN lab — choosing k',
    filename: 'knn-classifier-data.csv',
    columns: [
      { key: 'dataset', label: 'Dataset' },
      { key: 'k', label: 'k' },
      { key: 'nTrain', label: 'n train' },
      { key: 'accTrain', label: 'Train acc (%)', format: (v) => v.toFixed(1) },
      { key: 'accTest', label: 'Test acc (%)', format: (v) => v.toFixed(1) },
    ],
    procedure: [
      'Choose Two blobs. Record test accuracy for k = 1, 3, 7, 15.',
      'Choose Two moons. Record the same four k values. Which k is best here?',
      'Choose Overlapping. Record k = 1 and k = 15. Compare train and test accuracy at k = 1.',
      'Press New sample three times at your favourite k and record each. How stable is the test accuracy?',
    ],
    predict: 'Which k do you expect to give the best test accuracy on the moons dataset: 1, 7 or 15? Will the best k be the same for all three datasets?',
    source: () => {
      if (state.dirty) recompute();
      return {
        dataset: params.kind,
        k: params.k,
        nTrain: state.train.length,
        accTrain: state.accTrain[params.k] * 100,
        accTest: state.accTest[params.k] * 100,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop(() => { draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
