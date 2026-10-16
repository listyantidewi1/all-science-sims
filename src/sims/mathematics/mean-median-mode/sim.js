import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, toggle, select, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const VMIN = 0, VMAX = 30;          // data values are whole numbers on this scale
const MAX_N = 40;
const FONT = 'system-ui, -apple-system, Roboto, sans-serif';
const COL = { A: '#38bdf8', B: '#f472b6', mean: '#ef4444', median: '#a78bfa', mode: '#f59e0b', range: '#94a3b8' };

const PRESETS = {
  quiz: { A: [18, 20, 21, 21, 23, 24, 24, 24, 26, 28], B: [15, 17, 19, 21, 21, 22, 24, 27, 29, 30] },
  symmetric: { A: [10, 12, 13, 14, 14, 15, 15, 15, 16, 16, 17, 18, 20], B: [8, 11, 13, 14, 15, 15, 15, 16, 17, 19, 22] },
  skewed: { A: [3, 4, 4, 5, 5, 5, 6, 6, 7, 8, 10, 14, 22], B: [2, 3, 3, 4, 4, 5, 6, 8, 11, 17, 26] },
  twoClasses: { A: [12, 14, 15, 15, 16, 17, 18, 19, 20, 21], B: [8, 10, 14, 15, 15, 15, 21, 22, 23, 24] },
  empty: { A: [], B: [] },
};

export function stats(values) {
  const n = values.length;
  if (n === 0) return { n: 0, mean: null, median: null, modes: [], range: null, min: null, max: null, sum: 0, maxFreq: 0 };
  const sorted = values.slice().sort((a, b) => a - b);
  const sum = sorted.reduce((s, v) => s + v, 0);
  const mean = sum / n;
  const median = n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
  const freq = new Map();
  for (const v of sorted) freq.set(v, (freq.get(v) || 0) + 1);
  let maxFreq = 0;
  for (const f of freq.values()) maxFreq = Math.max(maxFreq, f);
  const modes = maxFreq > 1 ? [...freq.entries()].filter(([, f]) => f === maxFreq).map(([v]) => v) : [];
  return { n, mean, median, modes, range: sorted[n - 1] - sorted[0], min: sorted[0], max: sorted[n - 1], sum, maxFreq };
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const fmt = (v, d = 1) => (v == null ? '–' : Number.isInteger(v) ? String(v) : v.toFixed(d));

  const state = {
    compare: false,
    showMean: true, showMedian: true, showMode: true, showRange: true,
    data: { A: PRESETS.quiz.A.slice(), B: PRESETS.quiz.B.slice() },
    prev: { A: null, B: null },      // stats before the last change, for the "what moved" line
    labGroup: 'A',
    pendingDelete: null,              // {g, i} while a dot is dragged into the bin
  };

  function snapshot(g) { state.prev[g] = stats(state.data[g]); }
  function modeText(st) {
    if (st.n === 0) return '–';
    if (st.modes.length === 0) return T('none', 'tidak ada');
    if (st.modes.length > 3) return T('many', 'banyak');
    return st.modes.join(', ');
  }

  // ---- layout ---------------------------------------------------------
  const PAD = () => cv.width * 0.05;
  const xOf = (v) => PAD() + (v - VMIN) / (VMAX - VMIN) * (cv.width - 2 * PAD());
  const vOf = (x) => Math.round(clamp(VMIN + (x - PAD()) / (cv.width - 2 * PAD()) * (VMAX - VMIN), VMIN, VMAX));
  const unitW = () => (cv.width - 2 * PAD()) / (VMAX - VMIN);
  function bands() {
    const H = cv.height;
    if (state.compare) return { A: { top: H * 0.04, bottom: H * 0.5 }, B: { top: H * 0.52, bottom: H * 0.98 } };
    return { A: { top: H * 0.06, bottom: H * 0.98 } };
  }
  function axisY(b) { return b.bottom - (b.bottom - b.top) * 0.16; }
  function dotR(b, maxFreq) {
    const avail = (axisY(b) - b.top) * 0.62;
    const byStack = avail / (2 * Math.max(maxFreq, 4));
    return clamp(Math.min(unitW() * 0.46, byStack), 3, 14);
  }
  // Position of every dot (stacked), in canvas px.
  function dotPositions(g) {
    const b = bands()[g];
    if (!b) return [];
    const vals = state.data[g];
    const st = stats(vals);
    const r = dotR(b, st.maxFreq);
    const count = new Map();
    const out = [];
    // stack in index order so a dragged dot keeps its identity
    for (let i = 0; i < vals.length; i++) {
      const v = vals[i];
      const k = count.get(v) || 0;
      count.set(v, k + 1);
      out.push({ i, v, x: xOf(v), y: axisY(b) - r - 2 - k * (2 * r + 2), r });
    }
    return out;
  }

  // ---- drawing --------------------------------------------------------
  const fontPx = (f) => clamp(Math.round(cv.width * f), 9, 20);

  function drawGroup(ctx, g) {
    const b = bands()[g];
    const vals = state.data[g];
    const st = stats(vals);
    const ay = axisY(b);
    const W = cv.width;
    const fs = fontPx(0.016), fl = fontPx(0.014);
    const color = COL[g];
    // band background
    ctx.fillStyle = g === 'A' ? 'rgba(56,189,248,0.04)' : 'rgba(244,114,182,0.04)';
    ctx.fillRect(0, b.top, W, b.bottom - b.top);
    // range bracket (behind)
    if (state.showRange && st.n >= 2) {
      const y = ay + (b.bottom - ay) * 0.42;
      ctx.strokeStyle = COL.range; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(xOf(st.min), y); ctx.lineTo(xOf(st.max), y);
      ctx.moveTo(xOf(st.min), y - 5); ctx.lineTo(xOf(st.min), y + 5);
      ctx.moveTo(xOf(st.max), y - 5); ctx.lineTo(xOf(st.max), y + 5); ctx.stroke();
      ctx.fillStyle = COL.range; ctx.font = `${fl}px ${FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      ctx.fillText(T(`range ${st.range}`, `jangkauan ${st.range}`), (xOf(st.min) + xOf(st.max)) / 2, y + 4);
    }
    // seesaw beam + number line
    ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(xOf(VMIN) - 6, ay); ctx.lineTo(xOf(VMAX) + 6, ay); ctx.stroke();
    ctx.font = `${fl}px ${FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'top'; ctx.fillStyle = '#94a3b8';
    for (let v = VMIN; v <= VMAX; v++) {
      const major = v % 5 === 0;
      ctx.strokeStyle = major ? '#cbd5e1' : 'rgba(148,163,184,0.5)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(xOf(v), ay); ctx.lineTo(xOf(v), ay + (major ? 7 : 4)); ctx.stroke();
      if (major) ctx.fillText(String(v), xOf(v), ay + 9);
    }
    // median line
    if (state.showMedian && st.n > 0) {
      ctx.strokeStyle = COL.median; ctx.lineWidth = 2; ctx.setLineDash([5, 4]);
      ctx.beginPath(); ctx.moveTo(xOf(st.median), b.top + fs * 1.6); ctx.lineTo(xOf(st.median), ay); ctx.stroke();
      ctx.setLineDash([]);
    }
    // dots
    const pos = dotPositions(g);
    const modeSet = new Set(state.showMode ? st.modes : []);
    for (const d of pos) {
      const del = state.pendingDelete && state.pendingDelete.g === g && state.pendingDelete.i === d.i;
      ctx.fillStyle = del ? 'rgba(239,68,68,0.5)' : modeSet.has(d.v) ? COL.mode : color;
      ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
      if (del) { ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2; ctx.stroke(); }
    }
    // mean fulcrum
    if (state.showMean && st.n > 0) {
      const mx = xOf(st.mean), s = clamp(unitW() * 0.6, 7, 14);
      ctx.fillStyle = COL.mean;
      ctx.beginPath(); ctx.moveTo(mx, ay + 2); ctx.lineTo(mx - s, ay + 2 + s * 1.6); ctx.lineTo(mx + s, ay + 2 + s * 1.6); ctx.closePath(); ctx.fill();
    }
    // readout
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    let x = PAD(), y = b.top + 4;
    ctx.font = `bold ${fs}px ${FONT}`; ctx.fillStyle = color;
    const head = T(`Group ${g}  n = ${st.n}`, `Kelompok ${g}  n = ${st.n}`);
    ctx.fillText(head, x, y); x += ctx.measureText(head + '   ').width;
    ctx.font = `${fs}px ${FONT}`;
    const parts = [
      [COL.mean, T(`mean = ${st.n ? `${st.sum}/${st.n} = ` : ''}${fmt(st.mean, 2)}`, `rerata = ${st.n ? `${st.sum}/${st.n} = ` : ''}${fmt(st.mean, 2)}`)],
      [COL.median, T(`median = ${fmt(st.median)}`, `median = ${fmt(st.median)}`)],
      [COL.mode, T(`mode = ${modeText(st)}`, `modus = ${modeText(st)}`)],
      [COL.range, T(`range = ${fmt(st.range)}`, `jangkauan = ${fmt(st.range)}`)],
    ];
    const lineW = parts.reduce((s, [, t]) => s + ctx.measureText(t + '    ').width, 0);
    if (x + lineW > W - PAD()) { x = PAD(); y += fs * 1.4; }
    for (const [c, t] of parts) {
      ctx.fillStyle = c; ctx.fillText(t, x, y); x += ctx.measureText(t + '    ').width;
    }
    // "what moved" line
    const pv = state.prev[g];
    if (pv && pv.n > 0 && st.n > 0) {
      y += fs * 1.4;
      const d = (a, c) => (a == null || c == null ? null : c - a);
      const dm = d(pv.mean, st.mean), dmed = d(pv.median, st.median), dr = d(pv.range, st.range);
      const sgn = (v) => (v == null ? '–' : (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v).toFixed(2).replace(/\.?0+$/, ''));
      const modeMoved = JSON.stringify(pv.modes) !== JSON.stringify(st.modes);
      ctx.fillStyle = '#e2e8f0'; ctx.font = `${fl}px ${FONT}`;
      ctx.fillText(T(`Since last change: mean ${sgn(dm)}, median ${sgn(dmed)}, mode ${modeMoved ? T('changed', 'berubah') : T('same', 'sama')}, range ${sgn(dr)}`,
        `Sejak perubahan terakhir: rerata ${sgn(dm)}, median ${sgn(dmed)}, modus ${modeMoved ? 'berubah' : 'sama'}, jangkauan ${sgn(dr)}`), PAD(), y);
    }
    if (st.n === 0) {
      ctx.fillStyle = '#94a3b8'; ctx.font = `${fs}px ${FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(T('Click above the number line to add a dot', 'Klik di atas garis bilangan untuk menambah titik'), W / 2, (b.top + ay) / 2);
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    for (const g of Object.keys(bands())) drawGroup(ctx, g);
    // hint
    ctx.fillStyle = 'rgba(148,163,184,0.8)'; ctx.font = `${fontPx(0.012)}px ${FONT}`; ctx.textAlign = 'right'; ctx.textBaseline = 'bottom';
    ctx.fillText(T('drag a dot sideways to change it · drag it below the line to delete · ▲ = mean (balance point)', 'seret titik ke samping untuk mengubah · seret ke bawah garis untuk menghapus · ▲ = rerata (titik seimbang)'), W - 6, H - 4);
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  }

  // ---- interaction ----------------------------------------------------
  let nudge = null; // {g, i, v0} when the drag came from the keyboard layer
  function parseId(id) { const [g, i] = String(id).split(':'); return { g, i: Number(i) }; }
  function handles() {
    const out = [];
    for (const g of Object.keys(bands())) {
      for (const d of dotPositions(g)) out.push({ id: `${g}:${d.i}`, x: d.x, y: d.y, label: `Group ${g} dot with value ${d.v} (arrow keys change value)` });
    }
    return out;
  }
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) {
      for (const g of Object.keys(bands())) {
        const pos = dotPositions(g);
        for (let k = pos.length - 1; k >= 0; k--) {
          const d = pos[k];
          if (Math.hypot(d.x - x, d.y - y) <= d.r + 4) return `${g}:${d.i}`;
        }
      }
      return null;
    },
    onStart(id, x, y) {
      const { g, i } = parseId(id);
      snapshot(g);
      const d = dotPositions(g).find((p) => p.i === i);
      nudge = d && d.x === x && d.y === y ? { g, i, v0: d.v, x0: x } : null;
      state.pendingDelete = null;
    },
    onDrag(id, x, y) {
      const { g, i } = parseId(id);
      const vals = state.data[g];
      if (i < 0 || i >= vals.length) return;
      if (nudge) {
        const dir = Math.sign(x - nudge.x0);
        vals[i] = clamp(nudge.v0 + dir, VMIN, VMAX);
        return;
      }
      vals[i] = vOf(x);
      const b = bands()[g];
      state.pendingDelete = b && y > axisY(b) + 18 ? { g, i } : null;
    },
    onEnd(id) {
      const { g, i } = parseId(id);
      if (state.pendingDelete && state.pendingDelete.g === g && state.pendingDelete.i === i) state.data[g].splice(i, 1);
      state.pendingDelete = null;
      nudge = null;
    },
    handles,
    keyStep: 10,
    cursor: 'crosshair',
    hoverCursor: 'grab',
  });
  // Clicking empty space above a number line adds a dot there.
  function onPointerDown(e) {
    const r = cv.canvas.getBoundingClientRect();
    const x = (e.clientX - r.left) * cv.width / r.width, y = (e.clientY - r.top) * cv.height / r.height;
    if (drag.isDragging()) return;
    for (const g of Object.keys(bands())) {
      const pos = dotPositions(g);
      if (pos.some((d) => Math.hypot(d.x - x, d.y - y) <= d.r + 4)) return;
    }
    for (const [g, b] of Object.entries(bands())) {
      if (y >= b.top && y <= axisY(b) + 4 && x >= PAD() - 10 && x <= cv.width - PAD() + 10) {
        if (state.data[g].length >= MAX_N) return;
        snapshot(g);
        state.data[g].push(vOf(x));
        return;
      }
    }
  }
  cv.canvas.addEventListener('pointerdown', onPointerDown);

  // ---- controls -------------------------------------------------------
  const dataSel = select({
    label: 'Data set', key: 'data', value: 'quiz',
    options: [
      { value: 'quiz', label: 'Quiz scores (out of 30)' },
      { value: 'symmetric', label: 'Symmetric data' },
      { value: 'skewed', label: 'Skewed data with a tail' },
      { value: 'twoClasses', label: 'Two classes, same mean' },
      { value: 'empty', label: 'Empty (build your own)' },
    ],
    onChange: (v) => {
      const p = PRESETS[v] || PRESETS.empty;
      state.data.A = p.A.slice(); state.data.B = p.B.slice();
      state.prev.A = null; state.prev.B = null;
      if (v === 'twoClasses' && !state.compare) compareT.apply(true);
    },
  });
  const target = () => (state.compare && state.labGroup === 'B' ? 'B' : 'A');
  const addB = button({ label: '+ Add point', onClick: () => {
    const g = target(), vals = state.data[g];
    if (vals.length >= MAX_N) return;
    snapshot(g);
    const st = stats(vals);
    vals.push(st.n ? Math.round(st.median) : 15);
  } });
  const outlierB = button({ label: '+ Add outlier', primary: true, onClick: () => {
    const g = target(), vals = state.data[g];
    if (vals.length >= MAX_N) return;
    snapshot(g);
    const st = stats(vals);
    vals.push(st.n && st.mean > (VMIN + VMAX) / 2 ? VMIN : VMAX);
  } });
  const removeB = button({ label: 'Remove last', onClick: () => { const g = target(); if (state.data[g].length) { snapshot(g); state.data[g].pop(); } } });
  const clearB = button({ label: 'Clear group', onClick: () => { const g = target(); state.data[g] = []; state.prev[g] = null; } });
  const compareT = toggle({ label: 'Compare two groups', key: 'compare', value: false, onChange: (v) => { state.compare = v; } });
  const groupSel = select({
    label: 'Buttons and lab act on', key: 'group', value: 'A',
    options: [{ value: 'A', label: 'Group A' }, { value: 'B', label: 'Group B (when comparing)' }],
    onChange: (v) => { state.labGroup = v; },
  });
  const meanT = toggle({ label: 'Show mean ▲', key: 'mean', value: true, onChange: (v) => { state.showMean = v; } });
  const medianT = toggle({ label: 'Show median', key: 'median', value: true, onChange: (v) => { state.showMedian = v; } });
  const modeT = toggle({ label: 'Highlight mode', key: 'mode', value: true, onChange: (v) => { state.showMode = v; } });
  const rangeT = toggle({ label: 'Show range', key: 'range', value: true, onChange: (v) => { state.showRange = v; } });
  ctrlPanel.append(dataSel.el, row(addB, outlierB, removeB, clearB), row(compareT), groupSel.el, row(meanT, medianT, modeT, rangeT));

  const lab = labPanel({
    title: 'Measures of centre and spread',
    filename: 'mean-median-mode-data.csv',
    columns: [
      { key: 'group', label: 'Group' },
      { key: 'n', label: 'n' },
      { key: 'mean', label: 'Mean', format: (v) => v.toFixed(2) },
      { key: 'median', label: 'Median', format: (v) => (Number.isInteger(v) ? String(v) : v.toFixed(1)) },
      { key: 'mode', label: 'Mode' },
      { key: 'range', label: 'Range' },
      { key: 'data', label: 'Data (sorted)' },
    ],
    procedure: [
      'Load "Quiz scores" and Record the starting values for group A.',
      'Press "+ Add outlier" once and Record. Which measure changed most? Which did not change at all?',
      'Press "Remove last", then drag any one dot 5 places to the right. Record. Compare mean and median again.',
      'Turn on "Compare two groups", load "Two classes", set the buttons to Group B and Record both groups.',
      'Write a sentence comparing the two classes using one measure of centre and one of spread.',
    ],
    predict: 'When one very large value is added, which of mean, median, mode and range will change the most, and which the least?',
    source: () => {
      const g = target();
      const st = stats(state.data[g]);
      if (st.n === 0) return null;
      return {
        group: g, n: st.n, mean: st.mean, median: st.median,
        mode: st.modes.length ? st.modes.join(' & ') : 'none',
        range: st.range,
        data: state.data[g].slice().sort((a, b) => a - b).join(' '),
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop(() => { draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.canvas.removeEventListener('pointerdown', onPointerDown); cv.destroy(); };
}
