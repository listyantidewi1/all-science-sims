import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, select, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const FONT = 'system-ui, -apple-system, Roboto, sans-serif';
const PI = Math.PI;

// Parent functions. `f` returns NaN outside the natural domain; `restrict(u)` is the
// standard domain restriction that makes the function one-to-one (u = b(x − h)).
// `compose(inner)` writes f(inner) symbolically for the composition read-out.
const FUNCS = {
  sq:   { label: 'x²',    f: (x) => x * x,                        restrict: (u) => u >= 0,          compose: (g) => `(${g})²`,  domainMin: -Infinity },
  abs:  { label: '|x|',   f: (x) => Math.abs(x),                  restrict: (u) => u >= 0,          compose: (g) => `|${g}|`,   domainMin: -Infinity },
  sqrt: { label: '√x',    f: (x) => (x >= 0 ? Math.sqrt(x) : NaN), restrict: null,                  compose: (g) => `√(${g})`,  domainMin: 0 },
  exp:  { label: '2ˣ',    f: (x) => Math.pow(2, x),               restrict: null,                   compose: (g) => `2^(${g})`, domainMin: -Infinity },
  sin:  { label: 'sin x', f: (x) => Math.sin(x),                  restrict: (u) => Math.abs(u) <= PI / 2 + 1e-9, compose: (g) => `sin(${g})`, domainMin: -Infinity },
  rec:  { label: '1/x',   f: (x) => (x === 0 ? NaN : 1 / x),      restrict: null,                   compose: (g) => `1/(${g})`, domainMin: -Infinity },
};
const FUNC_OPTIONS = Object.entries(FUNCS).map(([value, v]) => ({ value, label: `f(x) = ${v.label}` }));

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
  const fmt = (v, d = 2) => (Number.isFinite(v) ? (Math.abs(v) < 1e-9 ? '0' : v.toFixed(d).replace(/\.?0+$/, '')) : T('undefined', 'tak terdefinisi'));

  const state = {
    mode: 'transform',            // transform | compose | inverse
    base: 'sq', outer: 'sqrt', inner: 'sq',
    a: 1, b: 1, h: 0, k: 0,
    x0: 1.5,                      // tracked point on the parent (transform) / input (compose)
    c: 1,                         // height of the horizontal test line (inverse)
    restrict: false,
    showParent: true,
  };

  // ---- world <-> canvas (equal scale on both axes so y = x is a 45° line) ------
  const XR = 10;                               // visible x range is [−XR, XR]
  const scale = () => cv.width / (2 * XR);
  const toPx = (x) => cv.width / 2 + x * scale();
  const toPy = (y) => cv.height / 2 - y * scale();
  const fromPx = (px) => (px - cv.width / 2) / scale();
  const fromPy = (py) => (cv.height / 2 - py) / scale();
  const yRange = () => cv.height / 2 / scale();

  const bEff = () => (Math.abs(state.b) < 0.05 ? 0.1 : state.b);
  const parent = () => FUNCS[state.base];
  // The transformed function g(x) = a·f(b(x − h)) + k, with optional domain restriction.
  function transformed(x) {
    const u = bEff() * (x - state.h);
    const F = parent();
    if (state.mode === 'inverse' && state.restrict && F.restrict && !F.restrict(u)) return NaN;
    return state.a * F.f(u) + state.k;
  }
  const composite = (x) => FUNCS[state.outer].f(FUNCS[state.inner].f(x));
  // Image of the parent point (x0, f(x0)) under the transformation.
  const image = () => ({ x: state.x0 / bEff() + state.h, y: state.a * parent().f(state.x0) + state.k });

  // Equation strings for the read-out.
  function equation() {
    const F = parent().label;
    const { a, h, k } = state, b = bEff();
    // inner = b(x − h) written out, e.g. "x − 2", "−x", "2(x + 3)"; grp = the same wrapped in brackets when needed.
    const shift = h === 0 ? 'x' : h > 0 ? `x − ${fmt(h)}` : `x + ${fmt(-h)}`;
    const inner = b === 1 ? shift : b === -1 ? (h === 0 ? '−x' : `−(${shift})`) : (h === 0 ? `${fmt(b)}x` : `${fmt(b)}(${shift})`);
    const grp = inner === 'x' ? 'x' : `(${inner})`;
    const fPart = F === 'x²' ? `${grp}²`
      : F === '|x|' ? `|${inner}|`
      : F === '√x' ? `√${grp}`
      : F === '2ˣ' ? (inner === 'x' ? '2ˣ' : `2^${grp}`)
      : F === 'sin x' ? (inner === 'x' ? 'sin x' : `sin${grp}`)
      : `1/${grp}`;
    const aPart = a === 1 ? '' : a === -1 ? '−' : `${fmt(a)}·`;
    const kPart = k === 0 ? '' : k > 0 ? ` + ${fmt(k)}` : ` − ${fmt(-k)}`;
    return `y = ${aPart}${fPart}${kPart}`;
  }

  // ---- drawing ------------------------------------------------------------------
  function drawGrid(ctx, W, H) {
    const s = scale();
    const yr = yRange();
    ctx.lineWidth = 1;
    const stepU = s < 22 ? 2 : 1;
    ctx.strokeStyle = 'rgba(148,163,184,0.14)';
    for (let x = -XR; x <= XR; x += stepU) { ctx.beginPath(); ctx.moveTo(toPx(x), 0); ctx.lineTo(toPx(x), H); ctx.stroke(); }
    for (let y = -Math.ceil(yr); y <= Math.ceil(yr); y += stepU) { ctx.beginPath(); ctx.moveTo(0, toPy(y)); ctx.lineTo(W, toPy(y)); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(226,232,240,0.7)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, toPy(0)); ctx.lineTo(W, toPy(0)); ctx.moveTo(toPx(0), 0); ctx.lineTo(toPx(0), H); ctx.stroke();
    ctx.fillStyle = 'rgba(203,213,225,0.8)';
    ctx.font = `${fontPx(0.016)}px ${FONT}`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    const lblStep = s < 22 ? 4 : 2;
    for (let x = -XR + lblStep; x < XR; x += lblStep) if (x !== 0) ctx.fillText(String(x), toPx(x), toPy(0) + 3);
    ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
    for (let y = -Math.floor(yr); y <= Math.floor(yr); y += lblStep) if (y !== 0) ctx.fillText(String(y), toPx(0) - 4, toPy(y));
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  }

  // Plot y = fn(x) over the visible window, breaking the path at gaps and asymptotes.
  // When `swap` is true the point (fn(x), x) is plotted instead — the reflection in y = x.
  function plot(ctx, fn, color, width, dash = [], swap = false) {
    const W = cv.width, H = cv.height;
    const range = swap ? yRange() : XR;            // when swapped, the sampled variable spans the y window
    const n = Math.max(200, Math.round(W * 1.5));
    ctx.save();
    ctx.strokeStyle = color; ctx.lineWidth = width; ctx.setLineDash(dash);
    ctx.lineJoin = 'round';
    ctx.beginPath();
    let pen = false, prevPy = 0;
    const lim = Math.max(W, H) * 3;
    for (let i = 0; i <= n; i++) {
      const t = -range + (2 * range * i) / n;
      const v = fn(t);
      if (!Number.isFinite(v)) { pen = false; continue; }
      const px = swap ? toPx(v) : toPx(t), py = swap ? toPy(t) : toPy(v);
      if (Math.abs(px) > lim || Math.abs(py) > lim) { pen = false; continue; }
      if (pen && Math.abs(py - prevPy) > H * 1.2 && !swap) { pen = false; }   // vertical asymptote jump
      if (pen && swap && Math.abs(px - toPx(fn(t - (2 * range) / n))) > W * 1.2) { pen = false; }
      if (!pen) { ctx.moveTo(px, py); pen = true; } else ctx.lineTo(px, py);
      prevPy = py;
    }
    ctx.stroke();
    ctx.restore();
  }

  function dot(ctx, x, y, color, r = 6, label = null, dx = 10, dy = -10) {
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;
    const px = toPx(x), py = toPy(y);
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.arc(px, py, r, 0, 2 * PI); ctx.fill();
    ctx.strokeStyle = '#0b1220'; ctx.lineWidth = 2; ctx.stroke();
    if (label) {
      ctx.fillStyle = color; ctx.font = `bold ${fontPx(0.02)}px ${FONT}`;
      ctx.textAlign = dx < 0 ? 'right' : 'left';
      ctx.fillText(label, px + dx, py + dy);
      ctx.textAlign = 'left';
    }
  }

  function arrow(ctx, x1, y1, x2, y2, color, dash = [6, 4]) {
    if (![x1, y1, x2, y2].every(Number.isFinite)) return;
    const ax = toPx(x1), ay = toPy(y1), bx = toPx(x2), by = toPy(y2);
    const d = Math.hypot(bx - ax, by - ay);
    if (d < 2) return;
    ctx.save();
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 2; ctx.setLineDash(dash);
    ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
    ctx.setLineDash([]);
    const ux = (bx - ax) / d, uy = (by - ay) / d, s = 9;
    ctx.beginPath(); ctx.moveTo(bx, by);
    ctx.lineTo(bx - s * ux + s * 0.5 * uy, by - s * uy - s * 0.5 * ux);
    ctx.lineTo(bx - s * ux - s * 0.5 * uy, by - s * uy + s * 0.5 * ux);
    ctx.closePath(); ctx.fill();
    ctx.restore();
  }

  function panel(ctx, lines, x, y, color = '#e2e8f0') {
    const fs = fontPx(0.02);
    ctx.font = `${fs}px ${FONT}`;
    let w = 0;
    for (const l of lines) w = Math.max(w, ctx.measureText(l.text ?? l).width);
    const pad = 8, lh = fs * 1.35;
    ctx.fillStyle = 'rgba(11,18,32,0.82)';
    ctx.beginPath(); ctx.roundRect(x, y, w + 2 * pad, lines.length * lh + pad * 1.2, 8); ctx.fill();
    lines.forEach((l, i) => {
      const t = l.text ?? l;
      ctx.fillStyle = l.color ?? color;
      ctx.font = `${l.bold ? 'bold ' : ''}${fs}px ${FONT}`;
      ctx.fillText(t, x + pad, y + pad * 0.6 + lh * (i + 0.8));
    });
    return lines.length * lh + pad * 1.2;
  }

  // Count how often the horizontal line y = c meets the transformed graph in the visible window:
  // sign changes of y − c, plus tangential touches (a local extremum of y − c within tolerance of 0,
  // e.g. y = 1 against sin x or y = 0 against x²) which have no sign change but are still solutions.
  function crossings(c) {
    const n = 2400;
    const tol = 2e-3 * Math.max(1, Math.abs(state.a));
    const d = new Array(n + 1);
    for (let i = 0; i <= n; i++) {
      const y = transformed(-XR + (2 * XR * i) / n);
      d[i] = Number.isFinite(y) ? y - c : NaN;
    }
    let count = 0;
    for (let i = 1; i <= n; i++) {
      const a = d[i - 1], b = d[i];
      if (b === 0) { count++; continue; }                                                   // exact hit on a sample
      if (!Number.isFinite(a) || !Number.isFinite(b) || Math.abs(b - a) > 50) continue;   // gap or asymptote jump
      if (a * b < 0) { count++; continue; }                                                 // crossing
      if (i < n && Number.isFinite(d[i + 1]) && Math.abs(b) < tol && Math.abs(b) < Math.abs(a) && Math.abs(b) <= Math.abs(d[i + 1])
          && a * d[i + 1] > 0) count++;                                                     // touch at an extremum
    }
    return count;
  }

  function drawTransform(ctx, W, H) {
    const F = parent();
    if (state.showParent) plot(ctx, F.f, 'rgba(148,163,184,0.75)', 2, [7, 5]);
    plot(ctx, transformed, '#f59e0b', 3);
    const P = { x: state.x0, y: F.f(state.x0) };
    const Q = image();
    arrow(ctx, P.x, P.y, Q.x, Q.y, '#38bdf8');
    dot(ctx, P.x, P.y, '#cbd5e1', 7, `P(${fmt(P.x)}, ${fmt(P.y)})`, 10, -12);
    dot(ctx, Q.x, Q.y, '#f59e0b', 7, `P′(${fmt(Q.x)}, ${fmt(Q.y)})`, 10, 18);
    const lines = [
      { text: equation(), bold: true, color: '#f59e0b' },
      { text: `${T('parent', 'induk')}: y = ${F.label}`, color: '#cbd5e1' },
      { text: `a = ${fmt(state.a)}  b = ${fmt(bEff())}  h = ${fmt(state.h)}  k = ${fmt(state.k)}` },
      { text: `(x₀, y₀) → (x₀/b + h, a·y₀ + k)` },
      { text: `(${fmt(P.x)}, ${fmt(P.y)}) → (${fmt(P.x)}/${fmt(bEff())} + ${fmt(state.h)}, ${fmt(state.a)}·${fmt(P.y)} + ${fmt(state.k)}) = (${fmt(Q.x)}, ${fmt(Q.y)})`, color: '#38bdf8' },
    ];
    panel(ctx, lines, 10, 10);
    const hints = [];
    if (state.a < 0) hints.push(T('a < 0: reflected in the x-axis', 'a < 0: dicerminkan terhadap sumbu x'));
    if (Math.abs(state.a) > 1) hints.push(T(`|a| > 1: stretched vertically ×${fmt(Math.abs(state.a))}`, `|a| > 1: diregangkan vertikal ×${fmt(Math.abs(state.a))}`));
    if (Math.abs(state.a) < 1 && state.a !== 0) hints.push(T(`|a| < 1: squashed vertically ×${fmt(Math.abs(state.a))}`, `|a| < 1: dimampatkan vertikal ×${fmt(Math.abs(state.a))}`));
    if (bEff() < 0) hints.push(T('b < 0: reflected in the y-axis', 'b < 0: dicerminkan terhadap sumbu y'));
    if (Math.abs(bEff()) !== 1) hints.push(T(`|b| = ${fmt(Math.abs(bEff()))}: width ×${fmt(1 / Math.abs(bEff()))}`, `|b| = ${fmt(Math.abs(bEff()))}: lebar ×${fmt(1 / Math.abs(bEff()))}`));
    if (state.h !== 0) hints.push(T(`h = ${fmt(state.h)}: shift ${state.h > 0 ? 'right' : 'left'} ${fmt(Math.abs(state.h))}`, `h = ${fmt(state.h)}: geser ke ${state.h > 0 ? 'kanan' : 'kiri'} ${fmt(Math.abs(state.h))}`));
    if (state.k !== 0) hints.push(T(`k = ${fmt(state.k)}: shift ${state.k > 0 ? 'up' : 'down'} ${fmt(Math.abs(state.k))}`, `k = ${fmt(state.k)}: geser ke ${state.k > 0 ? 'atas' : 'bawah'} ${fmt(Math.abs(state.k))}`));
    if (hints.length) {
      ctx.font = `${fontPx(0.02)}px ${FONT}`;
      const fs = fontPx(0.02), lh = fs * 1.35, hgt = hints.length * lh + 10;
      panel(ctx, hints, 10, H - hgt - 10, '#a7f3d0');
    }
  }

  function drawCompose(ctx, W, H) {
    const Fo = FUNCS[state.outer], Fi = FUNCS[state.inner];
    plot(ctx, Fo.f, 'rgba(148,163,184,0.8)', 2, [7, 5]);
    plot(ctx, Fi.f, '#38bdf8', 2.5, [2, 4]);
    plot(ctx, composite, '#f59e0b', 3);
    // y = x helper line
    ctx.save(); ctx.strokeStyle = 'rgba(167,139,250,0.5)'; ctx.lineWidth = 1.2; ctx.setLineDash([3, 5]);
    ctx.beginPath(); ctx.moveTo(toPx(-XR), toPy(-XR)); ctx.lineTo(toPx(XR), toPy(XR)); ctx.stroke(); ctx.restore();
    const x = state.x0, g = Fi.f(x), fg = Fo.f(g);
    // x → g(x) (up to the inner curve), across to y = x, up/down to the outer curve, back to x.
    arrow(ctx, x, 0, x, g, '#38bdf8');
    arrow(ctx, x, g, g, g, '#a78bfa');
    arrow(ctx, g, g, g, fg, '#cbd5e1');
    arrow(ctx, g, fg, x, fg, '#f59e0b');
    dot(ctx, x, 0, '#e2e8f0', 6, `x = ${fmt(x)}`, 8, 20);
    dot(ctx, x, g, '#38bdf8', 6, `g(x) = ${fmt(g)}`, 10, -8);
    dot(ctx, g, fg, '#cbd5e1', 6, `f(${fmt(g)}) = ${fmt(fg)}`, 10, -8);
    dot(ctx, x, fg, '#f59e0b', 7, `(f∘g)(x) = ${fmt(fg)}`, 10, 18);
    const lines = [
      { text: `(f∘g)(x) = f(g(x)) = ${Fo.compose(Fi.label)}`, bold: true, color: '#f59e0b' },
      { text: `g(x) = ${Fi.label}  (${T('inner, applied first', 'dalam, diterapkan dulu')})`, color: '#38bdf8' },
      { text: `f(x) = ${Fo.label}  (${T('outer, applied second', 'luar, diterapkan kedua')})`, color: '#cbd5e1' },
      { text: `x = ${fmt(x)} → g(x) = ${fmt(g)} → f(g(x)) = ${fmt(fg)}` },
      { text: Number.isFinite(fg) ? '' : T(`${fmt(g)} is outside the domain of f: f∘g is undefined here`, `${fmt(g)} di luar domain f: f∘g tak terdefinisi di sini`), color: '#fca5a5' },
    ].filter((l) => l.text !== '');
    panel(ctx, lines, 10, 10);
    ctx.fillStyle = 'rgba(167,139,250,0.9)'; ctx.font = `${fontPx(0.017)}px ${FONT}`;
    ctx.fillText('y = x', toPx(Math.min(XR, yRange()) * 0.9) - 36, toPy(Math.min(XR, yRange()) * 0.9) - 6);
  }

  function drawInverse(ctx, W, H) {
    const F = parent();
    // y = x mirror line
    ctx.save(); ctx.strokeStyle = 'rgba(167,139,250,0.7)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 5]);
    ctx.beginPath(); ctx.moveTo(toPx(-XR), toPy(-XR)); ctx.lineTo(toPx(XR), toPy(XR)); ctx.stroke(); ctx.restore();
    plot(ctx, transformed, '#f59e0b', 3);
    plot(ctx, transformed, '#34d399', 2.5, [], true);
    // Horizontal test line y = c
    const n = crossings(state.c);
    const lineCol = n >= 2 ? '#f87171' : '#38bdf8';
    ctx.save(); ctx.strokeStyle = lineCol; ctx.lineWidth = 2; ctx.setLineDash([8, 5]);
    ctx.beginPath(); ctx.moveTo(0, toPy(state.c)); ctx.lineTo(W, toPy(state.c)); ctx.stroke(); ctx.restore();
    // handle for the line at the right edge
    const hx = W - 18, hy = toPy(state.c);
    ctx.fillStyle = lineCol; ctx.beginPath(); ctx.arc(hx, hy, 8, 0, 2 * PI); ctx.fill();
    ctx.strokeStyle = '#0b1220'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = lineCol; ctx.font = `bold ${fontPx(0.018)}px ${FONT}`; ctx.textAlign = 'right';
    ctx.fillText(`y = ${fmt(state.c)}`, hx - 12, hy - 8);
    ctx.textAlign = 'left';
    // Tracked point and its mirror image
    const P = { x: state.x0, y: transformed(state.x0) };
    if (Number.isFinite(P.y)) {
      arrow(ctx, P.x, P.y, P.y, P.x, 'rgba(167,139,250,0.9)', [3, 4]);
      dot(ctx, P.x, P.y, '#f59e0b', 7, `(${fmt(P.x)}, ${fmt(P.y)})`, 10, -10);
      dot(ctx, P.y, P.x, '#34d399', 7, `(${fmt(P.y)}, ${fmt(P.x)})`, 10, 18);
    }
    const oneToOne = n < 2;
    const lines = [
      { text: equation(), bold: true, color: '#f59e0b' },
      { text: T('reflection in y = x (green): swap x and y', 'pencerminan terhadap y = x (hijau): tukar x dan y'), color: '#34d399' },
      { text: T(`horizontal line y = ${fmt(state.c)} crosses the graph ${n} time${n === 1 ? '' : 's'}`, `garis mendatar y = ${fmt(state.c)} memotong grafik ${n} kali`), color: lineCol },
      { text: oneToOne ? T('passes here — drag the line to test other heights', 'lolos di sini — geser garis untuk menguji tinggi lain')
                       : T('fails: two inputs share one output → the reflection is not a function', 'gagal: dua masukan punya satu keluaran → pencerminannya bukan fungsi'), color: oneToOne ? '#a7f3d0' : '#fca5a5' },
    ];
    if (F.restrict) lines.push({ text: state.restrict ? T('domain restricted so f is one-to-one', 'domain dibatasi agar f satu-satu') : T('tip: turn on Restrict domain', 'tips: nyalakan Batasi domain'), color: '#cbd5e1' });
    panel(ctx, lines, 10, 10);
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    drawGrid(ctx, W, H);
    if (state.mode === 'transform') drawTransform(ctx, W, H);
    else if (state.mode === 'compose') drawCompose(ctx, W, H);
    else drawInverse(ctx, W, H);
  }

  // ---- dragging -------------------------------------------------------------------
  const clampX0 = (x) => {
    const F = state.mode === 'compose' ? FUNCS[state.inner] : parent();
    let v = clamp(x, -XR + 0.2, XR - 0.2);
    if (F.domainMin === 0) v = Math.max(0, v);
    if (state.base === 'rec' && state.mode !== 'compose' && Math.abs(v) < 0.1) v = v < 0 ? -0.1 : 0.1;
    if (state.mode === 'compose' && state.inner === 'rec' && Math.abs(v) < 0.1) v = v < 0 ? -0.1 : 0.1;
    return Math.round(v * 20) / 20;
  };
  function handleList() {
    const list = [];
    if (state.mode === 'transform') list.push({ id: 'P', x: toPx(state.x0), y: toPy(parent().f(state.x0)), label: 'Point P on the parent graph (drag along x)' });
    else if (state.mode === 'compose') list.push({ id: 'P', x: toPx(state.x0), y: toPy(0), label: 'Input x (drag along the x-axis)' });
    else {
      const y = transformed(state.x0);
      list.push({ id: 'P', x: toPx(state.x0), y: toPy(Number.isFinite(y) ? y : 0), label: 'Point on the graph (drag along x)' });
      list.push({ id: 'C', x: cv.width - 18, y: toPy(state.c), label: 'Horizontal test line (drag up/down)' });
    }
    return list.filter((h) => Number.isFinite(h.x) && Number.isFinite(h.y));
  }
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) {
      for (const h of handleList()) if (Math.hypot(x - h.x, y - h.y) < 18) return h.id;
      // anywhere near the point's vertical: grab the point by its x
      if (Math.abs(x - toPx(state.x0)) < 14) return 'P';
      return null;
    },
    onDrag(id, x, y) {
      if (id === 'P') state.x0 = clampX0(fromPx(x));
      else if (id === 'C') state.c = Math.round(clamp(fromPy(y), -yRange() + 0.2, yRange() - 0.2) * 10) / 10;
    },
    handles: handleList,
    cursor: 'crosshair',
    hoverCursor: 'grab',
  });

  // ---- controls -----------------------------------------------------------------
  const modeSel = select({
    label: 'Mode', key: 'mode',
    options: [
      { value: 'transform', label: 'Transform y = a·f(b(x − h)) + k' },
      { value: 'compose', label: 'Composition f∘g' },
      { value: 'inverse', label: 'Inverse & horizontal-line test' },
    ],
    value: state.mode,
    onChange: (v) => { state.mode = v; state.x0 = clampX0(state.x0); syncVisibility(); },
  });
  const baseSel = select({ label: 'Parent function f', key: 'f', options: FUNC_OPTIONS, value: state.base, onChange: (v) => { state.base = v; state.x0 = clampX0(state.x0); } });
  const outerSel = select({ label: 'Outer f (applied second)', key: 'outer', options: FUNC_OPTIONS, value: state.outer, onChange: (v) => { state.outer = v; } });
  const innerSel = select({ label: 'Inner g (applied first)', key: 'inner', options: FUNC_OPTIONS.map((o) => ({ value: o.value, label: o.label.replace('f(x)', 'g(x)') })), value: state.inner, onChange: (v) => { state.inner = v; state.x0 = clampX0(state.x0); } });
  const aS = slider({ label: 'a (vertical stretch)', key: 'a', min: -3, max: 3, step: 0.1, value: state.a, format: (v) => v.toFixed(1), onInput: (v) => { state.a = v; } });
  const bS = slider({ label: 'b (horizontal compression)', key: 'b', min: -3, max: 3, step: 0.1, value: state.b, format: (v) => (Math.abs(v) < 0.05 ? '0.1' : v.toFixed(1)), onInput: (v) => { state.b = v; } });
  const hS = slider({ label: 'h (shift right)', key: 'h', min: -5, max: 5, step: 0.1, value: state.h, format: (v) => v.toFixed(1), onInput: (v) => { state.h = v; } });
  const kS = slider({ label: 'k (shift up)', key: 'k', min: -5, max: 5, step: 0.1, value: state.k, format: (v) => v.toFixed(1), onInput: (v) => { state.k = v; } });
  const parentT = toggle({ label: 'Show parent graph', key: 'parent', value: true, onChange: (v) => { state.showParent = v; } });
  const restrictT = toggle({ label: 'Restrict domain (one-to-one)', key: 'restrict', value: false, onChange: (v) => { state.restrict = v; } });
  const resetB = button({ label: 'Reset a, b, h, k', onClick: () => { aS.apply(1); bS.apply(1); hS.apply(0); kS.apply(0); } });
  const swapB = button({ label: 'Swap f and g', onClick: () => { const o = state.outer; outerSel.apply(state.inner); innerSel.apply(o); } });

  const composeRow = row(outerSel, innerSel);
  const sliderRow1 = row(aS, bS);
  const sliderRow2 = row(hS, kS);
  const miscRow = row(parentT, restrictT, resetB, swapB);
  ctrlPanel.append(row(modeSel, baseSel), composeRow, sliderRow1, sliderRow2, miscRow);

  function syncVisibility() {
    const m = state.mode;
    baseSel.el.style.display = m === 'compose' ? 'none' : '';
    composeRow.style.display = m === 'compose' ? '' : 'none';
    sliderRow1.style.display = m === 'compose' ? 'none' : '';
    sliderRow2.style.display = m === 'compose' ? 'none' : '';
    parentT.el.style.display = m === 'transform' ? '' : 'none';
    restrictT.el.style.display = m === 'inverse' ? '' : 'none';
    resetB.el.style.display = m === 'compose' ? 'none' : '';
    swapB.el.style.display = m === 'compose' ? '' : 'none';
  }
  syncVisibility();

  const lab = labPanel({
    title: 'Transformation lab — where does a point go?',
    filename: 'function-transformations-data.csv',
    columns: [
      { key: 'f', label: 'f(x)' },
      { key: 'a', label: 'a', format: (v) => v.toFixed(1) },
      { key: 'b', label: 'b', format: (v) => v.toFixed(1) },
      { key: 'h', label: 'h', format: (v) => v.toFixed(1) },
      { key: 'k', label: 'k', format: (v) => v.toFixed(1) },
      { key: 'x', label: 'x₀', format: (v) => v.toFixed(2) },
      { key: 'y', label: 'y₀ = f(x₀)', format: (v) => v.toFixed(2) },
      { key: 'xi', label: "x′ = x₀/b + h", format: (v) => v.toFixed(2) },
      { key: 'yi', label: "y′ = a·y₀ + k", format: (v) => v.toFixed(2) },
    ],
    procedure: [
      'In Transform mode choose f(x) = x², leave a = b = 1, h = k = 0 and drag P to x₀ = 2. Record.',
      'Set k = 3 only. Record. Which coordinate of P′ changed, and by how much?',
      'Reset, set h = 3 only. Record. Does P′ move left or right?',
      'Reset, set a = 2, then a = −1. Record each. Compare y′ with y₀.',
      'Reset, set b = 2. Record. Check that x′ = x₀/2: the graph is half as wide.',
      'Repeat with f(x) = sin x or 2ˣ and check the same rule (x₀/b + h, a·y₀ + k).',
    ],
    predict: 'For f(x) = x² with a = 2, h = −1, k = 3, where will the point (1, 1) land? Write (x′, y′) before testing.',
    source: () => {
      if (state.mode !== 'transform') return null;
      const P = { x: state.x0, y: parent().f(state.x0) }, Q = image();
      if (![P.y, Q.x, Q.y].every(Number.isFinite)) return null;
      return { f: parent().label, a: state.a, b: bEff(), h: state.h, k: state.k, x: P.x, y: P.y, xi: Q.x, yi: Q.y };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop(() => { draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
