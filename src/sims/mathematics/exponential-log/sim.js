import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, select, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
const LN2 = Math.LN2;

function fmt(v, d = 3) {
  if (!Number.isFinite(v)) return '—';
  const a = Math.abs(v);
  if (a >= 1e6 || (a > 0 && a < 1e-3)) return v.toExponential(2);
  if (Number.isInteger(v)) return String(v);
  return v.toFixed(d).replace(/\.?0+$/, '');
}

const CONTEXTS = {
  none:     { a: 1,  b: 2,    c: 10,  R: 8,  xu: ['x', 'x'], yu: ['y', 'y'] },
  bacteria: { a: 1,  b: 2,    c: 50,  R: 8,  xu: ['x = hours', 'x = jam'], yu: ['y = cells (thousands)', 'y = sel (ribuan)'] },
  decay:    { a: 10, b: 0.9,  c: 2.5, R: 12, xu: ['x = days', 'x = hari'], yu: ['y = mass (g)', 'y = massa (g)'] },
  growth:   { a: 10, b: 1.08, c: 20,  R: 12, xu: ['x = years', 'x = tahun'], yu: ['y = Rp (million)', 'y = Rp (juta)'] },
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const p = { a: 1, b: 2, x: 2, c: 10, R: 8, inverse: true, ctx: 'none' };
  let plot = { x0: 0, y0: 0, s: 1, R: 8 };   // plot geometry from last draw

  const f = (x) => p.a * Math.pow(p.b, x);
  // inverse of y = a·bˣ  is  y = log_b(x / a)
  const finv = (x) => (x / p.a > 0 && Math.abs(Math.log(p.b)) > 1e-12 ? Math.log(x / p.a) / Math.log(p.b) : NaN);
  const lnb = () => Math.log(p.b);
  const doubling = () => (p.b > 1 ? LN2 / lnb() : NaN);
  const halfLife = () => (p.b < 1 && p.b > 0 ? -LN2 / lnb() : NaN);
  const solveX = () => {
    const q = p.c / p.a;
    if (!(q > 0) || Math.abs(lnb()) < 1e-12) return NaN;
    return Math.log(q) / lnb();
  };

  const toPx = (x) => plot.x0 + (x / plot.R) * plot.s;
  const toPy = (y) => plot.y0 - (y / plot.R) * plot.s;
  const font = (px, bold = false) => `${bold ? 'bold ' : ''}${Math.round(px)}px system-ui, -apple-system, Roboto, sans-serif`;
  const mono = (px) => `${Math.round(px)}px ui-monospace, Menlo, Consolas, monospace`;

  function drawCurve(ctx, fn, color, width = 2.5) {
    ctx.strokeStyle = color; ctx.lineWidth = width; ctx.beginPath();
    let pen = false;
    const N = 240, R = plot.R, lim = R * 1.5;
    for (let i = 0; i <= N; i++) {
      const x = -R + (2 * R * i) / N;
      const y = fn(x);
      if (!Number.isFinite(y) || Math.abs(y) > lim) { pen = false; continue; }
      const px = toPx(x), py = toPy(y);
      if (!pen) { ctx.moveTo(px, py); pen = true; } else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    const fs = Math.max(9, Math.min(13, W * 0.016));
    const side = Math.min(H * 0.9, W * 0.55);
    const left = W * 0.03, top = (H - side) / 2;
    plot = { x0: left + side / 2, y0: top + side / 2, s: side / 2, R: p.R };

    // plot frame + grid
    ctx.save();
    ctx.beginPath(); ctx.rect(left, top, side, side); ctx.clip();
    ctx.fillStyle = '#0f172a'; ctx.fillRect(left, top, side, side);
    const stepG = p.R <= 4 ? 1 : p.R <= 10 ? 2 : p.R <= 20 ? 5 : 10;
    ctx.strokeStyle = 'rgba(148,163,184,0.12)'; ctx.lineWidth = 1;
    for (let g = -Math.floor(p.R / stepG) * stepG; g <= p.R; g += stepG) {
      ctx.beginPath(); ctx.moveTo(toPx(g), top); ctx.lineTo(toPx(g), top + side); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(left, toPy(g)); ctx.lineTo(left + side, toPy(g)); ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(148,163,184,0.6)';
    ctx.beginPath(); ctx.moveTo(left, plot.y0); ctx.lineTo(left + side, plot.y0); ctx.moveTo(plot.x0, top); ctx.lineTo(plot.x0, top + side); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = mono(fs * 0.85); ctx.textAlign = 'center';
    for (let g = -Math.floor(p.R / stepG) * stepG; g <= p.R; g += stepG) {
      if (g === 0) continue;
      ctx.fillText(String(g), toPx(g), plot.y0 + fs * 1.1);
      ctx.textAlign = 'right'; ctx.fillText(String(g), plot.x0 - 4, toPy(g) + fs * 0.35); ctx.textAlign = 'center';
    }
    // y = x and inverse
    if (p.inverse) {
      ctx.setLineDash([6, 6]); ctx.strokeStyle = 'rgba(203,213,225,0.45)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(toPx(-p.R), toPy(-p.R)); ctx.lineTo(toPx(p.R), toPy(p.R)); ctx.stroke(); ctx.setLineDash([]);
      drawCurve(ctx, finv, '#34d399', 2);
    }
    // asymptote y = 0 hint and main curve
    drawCurve(ctx, f, '#f59e0b');
    // solve: y = c line and drop to x
    const xs = solveX();
    ctx.setLineDash([4, 4]); ctx.strokeStyle = 'rgba(248,113,113,0.8)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(left, toPy(p.c)); ctx.lineTo(left + side, toPy(p.c)); ctx.stroke();
    if (Number.isFinite(xs)) { ctx.beginPath(); ctx.moveTo(toPx(xs), toPy(p.c)); ctx.lineTo(toPx(xs), plot.y0); ctx.stroke(); }
    ctx.setLineDash([]);
    if (Number.isFinite(xs)) {
      ctx.fillStyle = '#f87171'; ctx.beginPath(); ctx.arc(toPx(xs), toPy(p.c), 4, 0, Math.PI * 2); ctx.fill();
      ctx.font = mono(fs * 0.9); ctx.textAlign = 'left';
      ctx.fillText(`x = ${fmt(xs)}`, toPx(xs) + 6, plot.y0 - 6);
    }
    // marker point and its reflection
    const y = f(p.x);
    if (Number.isFinite(y)) {
      if (p.inverse) {
        ctx.setLineDash([3, 3]); ctx.strokeStyle = 'rgba(52,211,153,0.6)';
        ctx.beginPath(); ctx.moveTo(toPx(p.x), toPy(y)); ctx.lineTo(toPx(y), toPy(p.x)); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = '#34d399'; ctx.beginPath(); ctx.arc(toPx(y), toPy(p.x), 6, 0, Math.PI * 2); ctx.fill();
        ctx.font = mono(fs * 0.9); ctx.textAlign = 'left'; ctx.fillStyle = '#a7f3d0';
        ctx.fillText(`(${fmt(y, 2)}, ${fmt(p.x, 2)})`, toPx(y) + 8, toPy(p.x) + fs * 1.2);
      }
      ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(toPx(p.x), toPy(y), 8, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#0b1220'; ctx.lineWidth = 2; ctx.stroke();
      ctx.font = mono(fs * 0.9); ctx.textAlign = 'left'; ctx.fillStyle = '#fde68a';
      ctx.fillText(`(${fmt(p.x, 2)}, ${fmt(y, 2)})`, toPx(p.x) + 10, toPy(y) - 8);
    }
    ctx.restore();
    ctx.strokeStyle = 'rgba(148,163,184,0.35)'; ctx.lineWidth = 1; ctx.strokeRect(left, top, side, side);
    // axis labels
    const C = CONTEXTS[p.ctx];
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(fs * 0.9); ctx.textAlign = 'right';
    ctx.fillText(T(...C.xu), left + side - 4, top + side - 6);
    ctx.textAlign = 'left'; ctx.fillText(T(...C.yu), left + 6, top + fs * 1.2);

    // ---- right panel ----
    const px = left + side + W * 0.03, pw = W - px - W * 0.02;
    let yy = top + fs * 0.6;
    const line = (txt, color = '#e2e8f0', bold = false, m = false, gap = 1.5) => {
      ctx.fillStyle = color; ctx.font = m ? mono(fs) : font(fs, bold); ctx.textAlign = 'left';
      ctx.fillText(txt, px, yy += fs * gap, pw);
    };
    line(`y = a·bˣ = ${fmt(p.a)}·${fmt(p.b)}ˣ`, '#f59e0b', true, false, 1);
    line(`x = ${fmt(p.x, 2)}  →  y = ${fmt(y, 4)}`, '#fde68a', false, true);
    if (p.b > 1) line(`${T('Doubling time', 'Waktu penggandaan')} = ln2 / ln b = ${fmt(doubling())}`, '#fde68a', false, true);
    else if (p.b < 1) line(`${T('Half-life', 'Waktu paruh')} = ln2 / ln(1/b) = ${fmt(halfLife())}`, '#fde68a', false, true);
    else line(T('b = 1: constant, no growth', 'b = 1: tetap, tidak tumbuh'), '#fde68a', false, true);
    line(p.b > 1 ? T('growth (b > 1)', 'pertumbuhan (b > 1)') : p.b < 1 ? T('decay (0 < b < 1)', 'peluruhan (0 < b < 1)') : '', '#94a3b8');
    if (p.inverse) {
      yy += fs * 0.6;
      line(T('Inverse (green): reflect in y = x', 'Invers (hijau): cermin terhadap y = x'), '#34d399', true);
      line(`y = log_b(x/a) = ${p.b === 10 ? 'log' : p.b === Math.E ? 'ln' : `log_${fmt(p.b, 2)}`}(x/${fmt(p.a)})`, '#a7f3d0', false, true);
      line(T('swap x and y: (x, y) ↦ (y, x)', 'tukar x dan y: (x, y) ↦ (y, x)'), '#94a3b8');
    }
    yy += fs * 0.6;
    line(`${T('Solve', 'Selesaikan')}  ${fmt(p.a)}·${fmt(p.b)}ˣ = ${fmt(p.c)}`, '#f87171', true);
    const q = p.c / p.a;
    line(`1.  bˣ = c/a = ${fmt(q, 4)}`, '#fecaca', false, true);
    if (!(q > 0)) line(T('    no solution: c/a must be > 0', '    tak ada solusi: c/a harus > 0'), '#fecaca', false, true);
    else if (Math.abs(lnb()) < 1e-12) line(T('    b = 1: bˣ is always 1', '    b = 1: bˣ selalu 1'), '#fecaca', false, true);
    else {
      line(`2.  x = log_b(${fmt(q, 4)})   (${T('take log of both sides', 'ambil log kedua ruas')})`, '#fecaca', false, true);
      line(`3.  x = ln(${fmt(q, 4)}) / ln(${fmt(p.b)}) = ${fmt(Math.log(q), 4)} / ${fmt(lnb(), 4)}`, '#fecaca', false, true);
      line(`4.  x = ${fmt(xs, 4)}`, '#fff', true, true);
      line(`${T('check', 'periksa')}: ${fmt(p.a)}·${fmt(p.b)}^${fmt(xs, 3)} = ${fmt(f(xs), 4)}`, '#94a3b8', false, true);
    }
    if (p.ctx !== 'none') {
      yy += fs * 0.6;
      const msg = p.ctx === 'bacteria'
        ? T(`Bacteria: ${fmt(p.a)}k cells double every ${fmt(1 / Math.max(1e-9, Math.log2(Math.max(p.b, 1.0000001))), 2)} h`, `Bakteri: ${fmt(p.a)} ribu sel berlipat dua tiap ${fmt(1 / Math.max(1e-9, Math.log2(Math.max(p.b, 1.0000001))), 2)} jam`)
        : p.ctx === 'decay'
          ? T(`Decay: each day ${fmt((1 - p.b) * 100, 1)}% of the sample is lost`, `Peluruhan: tiap hari ${fmt((1 - p.b) * 100, 1)}% sampel hilang`)
          : T(`Compound growth: ${fmt((p.b - 1) * 100, 1)}% per year; rule of 72 ≈ ${fmt(72 / Math.max(0.01, (p.b - 1) * 100), 1)} yr`, `Bunga majemuk: ${fmt((p.b - 1) * 100, 1)}% per tahun; aturan 72 ≈ ${fmt(72 / Math.max(0.01, (p.b - 1) * 100), 1)} th`);
      line(msg, '#93c5fd');
    }
    ctx.textAlign = 'left';
  }

  // ---- drag the marker along the curve ----
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) {
      const y0 = f(p.x);
      if (!Number.isFinite(y0)) return null;
      return Math.hypot(x - toPx(p.x), y - toPy(y0)) < 18 ? 'pt' : null;
    },
    onDrag(id, x) {
      const nx = ((x - plot.x0) / plot.s) * plot.R;
      p.x = Math.round(Math.max(-p.R, Math.min(p.R, nx)) * 20) / 20;
      xS.value = p.x;
    },
    handles: () => {
      const y0 = f(p.x);
      return Number.isFinite(y0) ? [{ id: 'pt', x: toPx(p.x), y: toPy(y0), label: `Point on curve, x = ${fmt(p.x, 2)} (drag left/right)` }] : [];
    },
    cursor: 'default', hoverCursor: 'grab',
  });

  // ---- controls ----
  const ctxS = select({
    label: 'Context', key: 'context', value: p.ctx,
    options: [
      { value: 'none', label: 'Pure function y = a·bˣ' },
      { value: 'bacteria', label: 'Bacteria doubling (b = 2)' },
      { value: 'decay', label: 'Radioactive decay (b < 1)' },
      { value: 'growth', label: 'Compound growth (b = 1.08)' },
    ],
    onChange: (v) => {
      p.ctx = v; const C = CONTEXTS[v];
      aS.apply(C.a); bS.apply(C.b); cS.apply(C.c); RS.apply(C.R);
    },
  });
  const aS = slider({ label: 'a (initial value)', key: 'a', min: 0.5, max: 20, step: 0.5, value: p.a, format: (v) => v.toFixed(1), onInput: (v) => { p.a = v; } });
  const bS = slider({ label: 'b (base / growth factor)', key: 'b', min: 0.1, max: 5, step: 0.01, value: p.b, format: (v) => v.toFixed(2), onInput: (v) => { p.b = v; } });
  const xS = slider({ label: 'x (marker)', key: 'x', min: -10, max: 10, step: 0.05, value: p.x, format: (v) => v.toFixed(2), onInput: (v) => { p.x = v; } });
  const cS = slider({ label: 'c (solve a·bˣ = c)', key: 'c', min: 0.1, max: 100, step: 0.1, value: p.c, format: (v) => v.toFixed(1), onInput: (v) => { p.c = v; } });
  const RS = slider({ label: 'Window ±R', key: 'window', min: 2, max: 40, step: 1, value: p.R, onInput: (v) => { p.R = v; } });
  const invT = toggle({ label: 'Show inverse (log) and y = x', key: 'inverse', value: p.inverse, onChange: (v) => { p.inverse = v; } });
  ctrlPanel.append(ctxS.el, aS.el, bS.el, xS.el, cS.el, RS.el, row(invT));

  const lab = labPanel({
    title: 'Exponential lab — growth factor and doubling time',
    filename: 'exponential-log-data.csv',
    columns: [
      { key: 'a', label: 'a', format: (v) => fmt(v, 2) },
      { key: 'b', label: 'b', format: (v) => fmt(v, 3) },
      { key: 'x', label: 'x', format: (v) => fmt(v, 2) },
      { key: 'y', label: 'y = a·bˣ', format: (v) => fmt(v, 4) },
      { key: 'td', label: 'doubling time / half-life', format: (v) => fmt(v, 3) },
      { key: 'kind', label: 'kind' },
    ],
    procedure: [
      'Set a = 1, b = 2. Drag the marker to x = 0, 1, 2, 3 and record each. How does y change per unit step?',
      'Keep a = 1 and record the doubling time for b = 1.5, 2, 3, 4. Multiply each by log₂(b): what do you get?',
      'Set b = 0.5 and then b = 0.9. Record the half-life each time. Check 0.9^(half-life) ≈ 0.5 by hand.',
      'Choose the bacteria preset. Use the solver to find when the colony reaches c = 50 thousand cells. Record it.',
      'Change a to 2 and repeat. Does a change the doubling time? Why or why not?',
    ],
    predict: 'If b doubles from 2 to 4, does the doubling time halve, double, or stay the same? Write your prediction first.',
    source: () => {
      const y = f(p.x);
      if (!Number.isFinite(y)) return null;
      const td = p.b > 1 ? doubling() : p.b < 1 ? halfLife() : null;
      return { a: p.a, b: p.b, x: p.x, y, td, kind: p.b > 1 ? 'doubling' : p.b < 1 ? 'half-life' : 'constant' };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop(() => { draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
