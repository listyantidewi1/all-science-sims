import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

// Fill the Box: unit cubes fill a glass cuboid layer by layer (isometric view),
// with flat front / top / side views for spatial visualisation. Grades 3-6.
const T = (en, id) => (getLocale() === 'id' ? id : en);
const ISO_A = Math.cos(Math.PI / 6), ISO_B = Math.sin(Math.PI / 6);
// one colour per layer: [top face, right face, left face]
const LAYERS = [
  ['#7dd3fc', '#0ea5e9', '#0369a1'],
  ['#fdba74', '#f97316', '#c2410c'],
  ['#86efac', '#22c55e', '#15803d'],
  ['#f9a8d4', '#ec4899', '#be185d'],
  ['#fde047', '#eab308', '#a16207'],
  ['#c4b5fd', '#8b5cf6', '#6d28d9'],
  ['#67e8f9', '#06b6d4', '#0e7490'],
  ['#fca5a5', '#ef4444', '#b91c1c'],
  ['#a3e635', '#65a30d', '#3f6212'],
  ['#fcd34d', '#d97706', '#92400e'],
];

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const dims = { l: 3, w: 4, h: 2 };
  const state = { view: 'iso', filled: 0, now: 0, pulse: 0 };
  const total = () => dims.l * dims.w * dims.h;
  // fill order: along the length first, then across the width, then up the layers
  const idx = (x, y, z) => z * dims.l * dims.w + y * dims.l + x;
  const isFilled = (x, y, z) => x >= 0 && y >= 0 && z >= 0 && x < dims.l && y < dims.w && z < dims.h && idx(x, y, z) < Math.floor(state.filled);
  const refill = () => { state.filled = 0; };

  function step(dt) {
    const n = total();
    if (state.filled < n) {
      const rate = Math.max(6, n / 3.5);          // the whole box fills in about 3.5 s
      state.filled = Math.min(n, state.filled + rate * dt);
    }
  }

  const font = (s, bold = false) => `${bold ? 'bold ' : ''}${Math.max(9, Math.round(s))}px system-ui, -apple-system, Roboto, sans-serif`;

  function layout() {
    const W = cv.width, H = cv.height;
    const dx = W * 0.02, dy = H * 0.04, dw = W * 0.62, dh = H * 0.92;
    const px = dx + dw + W * 0.03, pw = W - px - W * 0.02;
    return { W, H, dx, dy, dw, dh, px, pw };
  }

  // ---- isometric view --------------------------------------------------------
  function drawIso(ctx, L) {
    const { l, w, h } = dims;
    const fitS = Math.min(L.dw / ((l + w) * ISO_A), L.dh / ((l + w) * ISO_B + h)) * 0.86;
    const s = Math.min(fitS, L.dh / 6.5);
    const a = s * ISO_A, b = s * ISO_B;
    const totalW = (l + w) * a, totalH = (l + w) * b + h * s;
    const left = L.dx + (L.dw - totalW) / 2, top = L.dy + (L.dh - totalH) / 2;
    const ox = left + w * a, oy = top + h * s;
    const P = (x, y, z) => [ox + (x - y) * a, oy + (x + y) * b - z * s];
    const poly = (pts, fill, stroke) => {
      ctx.beginPath();
      pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
      ctx.closePath();
      if (fill) { ctx.fillStyle = fill; ctx.fill(); }
      if (stroke) { ctx.strokeStyle = stroke; ctx.stroke(); }
    };
    // floor grid of the box
    ctx.lineWidth = 1;
    for (let y = 0; y < w; y++) for (let x = 0; x < l; x++) {
      poly([P(x, y, 0), P(x + 1, y, 0), P(x + 1, y + 1, 0), P(x, y + 1, 0)], 'rgba(148,163,184,0.10)', 'rgba(148,163,184,0.35)');
    }
    // back edges of the glass box
    ctx.setLineDash([5, 5]); ctx.strokeStyle = 'rgba(203,213,225,0.5)'; ctx.lineWidth = 1.5;
    ctx.beginPath();
    const E = (p, q) => { ctx.moveTo(...P(...p)); ctx.lineTo(...P(...q)); };
    E([0, 0, 0], [0, 0, h]); E([l, 0, 0], [l, 0, h]); E([0, w, 0], [0, w, h]);
    E([0, 0, h], [l, 0, h]); E([0, 0, h], [0, w, h]);
    ctx.stroke();
    ctx.setLineDash([]);

    // cubes: only exposed faces, far-to-near order
    const nFilled = Math.floor(state.filled);
    const last = nFilled - 1;
    ctx.lineWidth = Math.max(1, s * 0.03);
    const edge = 'rgba(11,18,32,0.55)';
    for (let z = 0; z < h; z++) {
      const col = LAYERS[z % LAYERS.length];
      for (let d = 0; d <= l + w - 2; d++) {              // x + y = d, far to near
        for (let x = Math.max(0, d - w + 1); x <= Math.min(l - 1, d); x++) {
          const y = d - x;
          const i = idx(x, y, z);
          if (i >= nFilled) continue;
          const isLast = i === last && state.filled < total();
          if (!isFilled(x, y, z + 1)) poly([P(x, y, z + 1), P(x + 1, y, z + 1), P(x + 1, y + 1, z + 1), P(x, y + 1, z + 1)], isLast ? '#ffffff' : col[0], edge);
          if (!isFilled(x + 1, y, z)) poly([P(x + 1, y, z), P(x + 1, y + 1, z), P(x + 1, y + 1, z + 1), P(x + 1, y, z + 1)], isLast ? '#e2e8f0' : col[1], edge);
          if (!isFilled(x, y + 1, z)) poly([P(x, y + 1, z), P(x + 1, y + 1, z), P(x + 1, y + 1, z + 1), P(x, y + 1, z + 1)], isLast ? '#cbd5e1' : col[2], edge);
        }
      }
    }
    // front edges of the glass box
    ctx.strokeStyle = 'rgba(248,250,252,0.7)'; ctx.lineWidth = 2;
    ctx.beginPath();
    E([l, 0, 0], [l, w, 0]); E([0, w, 0], [l, w, 0]); E([l, w, 0], [l, w, h]);
    E([l, 0, h], [l, w, h]); E([0, w, h], [l, w, h]); E([l, 0, 0], [l, 0, h]); E([0, w, 0], [0, w, h]);
    E([l, 0, 0], [0, 0, 0]); E([0, 0, 0], [0, w, 0]);
    ctx.stroke();

    // dimension labels
    ctx.font = font(Math.max(12, s * 0.55), true); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const lab = (txt, p, color) => {
      const wd = ctx.measureText(txt).width + 12;
      const hh = Math.max(16, s * 0.7);
      ctx.fillStyle = 'rgba(11,18,32,0.8)';
      ctx.beginPath(); ctx.roundRect(p[0] - wd / 2, p[1] - hh / 2, wd, hh, 6); ctx.fill();
      ctx.fillStyle = color; ctx.fillText(txt, p[0], p[1]);
    };
    const mL = P(l / 2, w, 0), mW = P(l, w / 2, 0), mH = P(l, w, h / 2);
    lab(`${T('length', 'panjang')} ${l}`, [mL[0] - s * 0.6, mL[1] + s * 0.55], '#fde68a');
    lab(`${T('width', 'lebar')} ${w}`, [mW[0] + s * 0.6, mW[1] + s * 0.55], '#fde68a');
    lab(`${T('height', 'tinggi')} ${h}`, [mH[0] + s * 1.3, mH[1]], '#fde68a');
  }

  // ---- flat views ----------------------------------------------------------------
  function drawFlat(ctx, L) {
    const { l, w, h } = dims;
    let cols, rows, title, cellColor;
    if (state.view === 'front') {
      cols = l; rows = h; title = T('Front view: length across, height up', 'Tampak depan: panjang ke samping, tinggi ke atas');
      cellColor = (c, r) => (isFilled(c, 0, r) ? LAYERS[r % LAYERS.length][1] : null);
    } else if (state.view === 'side') {
      cols = w; rows = h; title = T('Side view: width across, height up', 'Tampak samping: lebar ke samping, tinggi ke atas');
      cellColor = (c, r) => (isFilled(0, c, r) ? LAYERS[r % LAYERS.length][2] : null);
    } else {
      cols = l; rows = w; title = T('Top view: length across, width down', 'Tampak atas: panjang ke samping, lebar ke bawah');
      cellColor = (c, r) => {
        let z = -1;
        for (let k = 0; k < h; k++) if (isFilled(c, r, k)) z = k;
        return z >= 0 ? LAYERS[z % LAYERS.length][0] : null;
      };
    }
    const cell = Math.min(L.dw * 0.9 / cols, L.dh * 0.72 / rows, L.dh / 6);
    const gx = L.dx + (L.dw - cols * cell) / 2, gy = L.dy + L.dh * 0.14 + (L.dh * 0.72 - rows * cell) / 2;
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(Math.min(L.dw * 0.045, L.dh * 0.05), true);
    ctx.fillText(title, L.dx + L.dw / 2, L.dy + L.dh * 0.02);
    let count = 0;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      // for front/side views the bottom row is layer 0, so flip rows on screen
      const rr = state.view === 'top' ? r : rows - 1 - r;
      const colr = cellColor(c, r);
      const x = gx + c * cell, y = gy + rr * cell;
      ctx.fillStyle = colr || 'rgba(148,163,184,0.08)';
      ctx.fillRect(x + 1, y + 1, cell - 2, cell - 2);
      ctx.strokeStyle = 'rgba(203,213,225,0.5)'; ctx.lineWidth = 1;
      ctx.strokeRect(x + 0.5, y + 0.5, cell - 1, cell - 1);
      if (colr) count++;
    }
    ctx.fillStyle = '#fde68a'; ctx.font = font(Math.max(12, cell * 0.4), true);
    ctx.textBaseline = 'bottom';
    ctx.fillText(String(cols), gx + cols * cell / 2, gy - cell * 0.15);
    ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
    ctx.fillText(String(rows), gx - cell * 0.25, gy + rows * cell / 2);
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(Math.min(L.dw * 0.04, L.dh * 0.045));
    ctx.fillText(T(`${cols} × ${rows} = ${cols * rows} squares seen (${count} filled)`, `${cols} × ${rows} = ${cols * rows} persegi terlihat (${count} terisi)`), L.dx + L.dw / 2, gy + rows * cell + cell * 0.3);
  }

  // ---- panel ---------------------------------------------------------------------
  function drawPanel(ctx, L) {
    const { l, w, h } = dims;
    const n = total(), got = Math.floor(state.filled);
    const { px, pw, dy, dh } = L;
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.beginPath(); ctx.roundRect(px, dy, pw, dh, 12); ctx.fill();
    const pad = pw * 0.07;
    const big = Math.min(pw * 0.19, L.H * 0.1), small = Math.min(pw * 0.085, L.H * 0.046);
    let ty = dy + pad;
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    const line = (txt, color, size, bold = false, gap = 1.5) => {
      ctx.fillStyle = color; ctx.font = font(size, bold); ctx.fillText(txt, px + pad, ty); ty += size * gap;
    };
    line(T('Cubes in the box', 'Kubus di dalam kotak'), '#94a3b8', small);
    line(String(got), got === n ? '#6ee7b7' : '#fff', big, true, 1.3);
    line(got === n ? T('full!', 'penuh!') : T(`filling… ${n} when full`, `mengisi… penuh = ${n}`), '#cbd5e1', small * 0.9, false, 1.7);
    line(T('One layer', 'Satu lapisan'), '#94a3b8', small);
    line(`${l} × ${w} = ${l * w}`, '#fde68a', small * 1.25, true, 1.4);
    line(T(`cubes, ${h} ${h === 1 ? 'layer' : 'layers'} high`, `kubus, ${h} lapisan`), '#cbd5e1', small * 0.9, false, 1.7);
    line(T('Volume', 'Volume'), '#94a3b8', small);
    line(`${l} × ${w} × ${h}`, '#fff', small * 1.25, true, 1.4);
    line(`= ${n} ${T('cubes', 'kubus')}`, '#6ee7b7', small * 1.25, true, 1.6);
    // layer strip
    const sw = Math.min((pw - 2 * pad) / Math.max(1, h), small * 1.6);
    for (let z = 0; z < h; z++) {
      ctx.fillStyle = LAYERS[z % LAYERS.length][1];
      const filledInLayer = Math.max(0, Math.min(l * w, got - z * l * w));
      ctx.globalAlpha = filledInLayer > 0 ? 1 : 0.25;
      ctx.beginPath(); ctx.roundRect(px + pad + z * sw, ty, sw - 3, small * 0.9, 4); ctx.fill();
      ctx.globalAlpha = 1;
    }
    ty += small * 1.4;
    line(T('tap the box to refill', 'ketuk kotak: isi lagi'), '#64748b', small * 0.8);
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  }

  function draw() {
    const ctx = cv.ctx;
    const L = layout();
    if (L.W < 10 || L.H < 10) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, L.W, L.H);
    if (state.view === 'iso') drawIso(ctx, L); else drawFlat(ctx, L);
    drawPanel(ctx, L);
  }

  // tapping the drawing restarts the filling; the handle also gives keyboard users a button
  const drag = dragHandle(cv.canvas, {
    hitTest(x) { const L = layout(); return x < L.px ? 'box' : null; },
    onStart() { refill(); },
    handles: () => { const L = layout(); return [{ id: 'box', x: L.dx + L.dw / 2, y: L.dy + L.dh / 2, label: 'The box (press an arrow key to fill it again)' }]; },
    keyStep: 0,
    cursor: 'pointer',
    hoverCursor: 'pointer',
  });

  // ---- controls -------------------------------------------------------------------
  const mk = (label, key, value) => {
    const s = slider({ label, key, min: 1, max: 10, step: 1, value, onInput: (v) => { dims[key] = v; refill(); } });
    s.el.querySelector('input').style.minHeight = '44px';
    return s;
  };
  const sl = mk(T('Length', 'Panjang'), 'l', dims.l);
  const sw = mk(T('Width', 'Lebar'), 'w', dims.w);
  const sh = mk(T('Height', 'Tinggi'), 'h', dims.h);
  const viewSel = select({
    label: T('View', 'Tampilan'),
    key: 'view',
    options: [
      { value: 'iso', label: T('3D box', 'Kotak 3D') },
      { value: 'front', label: T('Front view', 'Tampak depan') },
      { value: 'top', label: T('Top view', 'Tampak atas') },
      { value: 'side', label: T('Side view', 'Tampak samping') },
    ],
    value: 'iso',
    onChange: (v) => { state.view = v; },
  });
  ctrlPanel.append(sl.el, sw.el, sh.el, viewSel.el);

  const lab = labPanel({
    title: 'Box volume table',
    filename: 'cuboid-volume-data.csv',
    columns: [
      { key: 'l', label: 'Length' },
      { key: 'w', label: 'Width' },
      { key: 'h', label: 'Height' },
      { key: 'layer', label: 'Cubes in one layer' },
      { key: 'cubes', label: 'Cubes (volume)' },
    ],
    procedure: [
      'Set length 3, width 4, height 1. Count the cubes, then press Record.',
      'Change height to 2, then 3. Record each. How many cubes does each new layer add?',
      'Make a cube: length, width and height all 4. Record it.',
      'Find two different boxes that hold exactly 24 cubes. Record both.',
    ],
    predict: 'If you double the height of a box, what happens to the number of cubes inside?',
    source: () => ({ l: dims.l, w: dims.w, h: dims.h, layer: dims.l * dims.w, cubes: total() }),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { state.now = t; step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
