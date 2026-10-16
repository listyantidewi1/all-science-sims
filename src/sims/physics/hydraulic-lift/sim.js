import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, select, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const LOADS = [
  { id: 'none', label: { en: 'No load', id: 'Tanpa beban' }, N: 0 },
  { id: 'box', label: { en: 'Crate 500 N', id: 'Peti 500 N' }, N: 500 },
  { id: 'bike', label: { en: 'Motorbike 1500 N', id: 'Sepeda motor 1500 N' }, N: 1500 },
  { id: 'car', label: { en: 'Car 12 000 N', id: 'Mobil 12 000 N' }, N: 12000 },
];
const MAX_STROKE_CM = 30;

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const params = { A1: 10, ratio: 10, F1: 100, load: 'none', d1: 0 };   // A1 in cm², d1 in cm
  const state = { d1: 0, hint: 0 };

  const A2 = () => params.A1 * params.ratio;                        // cm²
  const loadN = () => LOADS.find((l) => l.id === params.load).N;
  function calc() {
    const A1m = params.A1 * 1e-4, A2m = A2() * 1e-4;
    const P = params.F1 / Math.max(1e-9, A1m);                       // Pa
    const F2 = P * A2m;
    const d1 = state.d1, d2 = d1 / Math.max(1e-9, params.ratio);     // cm
    const lifts = loadN() === 0 || F2 >= loadN();
    const needF1 = loadN() * A1m / Math.max(1e-9, A2m);
    return { A1m, A2m, P, F2, d1, d2, W1: params.F1 * d1 / 100, W2: F2 * d2 / 100, lifts, needF1 };
  }

  function step(dt) {
    state.d1 += (params.d1 - state.d1) * Math.min(1, 8 * dt);
  }

  // Geometry shared by draw and drag: cylinder positions in CSS px.
  function geom() {
    const W = cv.width, H = cv.height;
    const s1 = Math.sqrt(params.A1), s2 = Math.sqrt(A2());           // piston side lengths (cm)
    const avail = W * 0.56;
    const k = avail / (s1 + s2);
    const w1 = Math.max(10, s1 * k), w2 = Math.max(24, s2 * k);
    const pxPerCm = (H * 0.5) / 70;                                 // vertical scale, 70 cm of cylinder
    const floorY = H * 0.76;
    const gap = W * 0.1;
    const total = w1 + gap + w2;
    const x1 = (W - total) / 2 + w1 / 2;
    const x2 = x1 + w1 / 2 + gap + w2 / 2;
    const cylTop = floorY - 70 * pxPerCm;
    // fluid rest level: 45 cm above the floor in both; piston 1 sits at rest level + d1 down
    const restY = floorY - 45 * pxPerCm;
    const p1y = restY + state.d1 * pxPerCm;
    const p2y = restY - (state.d1 / Math.max(1e-9, params.ratio)) * pxPerCm;
    return { W, H, w1, w2, x1, x2, floorY, cylTop, restY, p1y, p2y, pxPerCm };
  }

  function arrow(ctx, x1, y1, x2, y2, color, width) {
    const ang = Math.atan2(y2 - y1, x2 - x1);
    const head = Math.max(6, width * 2.6);
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = width; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - head * 0.6 * Math.cos(ang), y2 - head * 0.6 * Math.sin(ang)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - head * Math.cos(ang - 0.45), y2 - head * Math.sin(ang - 0.45));
    ctx.lineTo(x2 - head * Math.cos(ang + 0.45), y2 - head * Math.sin(ang + 0.45));
    ctx.closePath(); ctx.fill(); ctx.lineCap = 'butt';
  }
  const fmtF = (N) => N >= 10000 ? `${(N / 1000).toFixed(1)} kN` : `${N.toFixed(N < 10 ? 1 : 0)} N`;
  const fmtP = (P) => P >= 1e6 ? `${(P / 1e6).toFixed(2)} MPa` : `${(P / 1000).toFixed(1)} kPa`;
  const fmtCm = (c) => c < 0.1 ? `${(c * 10).toFixed(2)} mm` : `${c.toFixed(c < 1 ? 2 : 1)} cm`;

  function drawLoad(ctx, g, c) {
    const L = LOADS.find((l) => l.id === params.load);
    if (L.N === 0) return;
    const top = g.p2y - 10;
    const col = c.lifts ? '#8b5cf6' : '#ef4444';
    const w = Math.min(g.w2 * 1.6, g.W * 0.4);
    if (L.id === 'car') {
      const h = clamp(g.H * 0.12, 24, 70);
      ctx.fillStyle = col;
      ctx.beginPath(); ctx.roundRect(g.x2 - w / 2, top - h * 0.55, w, h * 0.55, 8); ctx.fill();
      ctx.beginPath(); ctx.roundRect(g.x2 - w * 0.3, top - h, w * 0.6, h * 0.5, 8); ctx.fill();
      ctx.fillStyle = '#1f2937';
      ctx.beginPath(); ctx.arc(g.x2 - w * 0.3, top - 2, h * 0.16, 0, Math.PI * 2); ctx.arc(g.x2 + w * 0.3, top - 2, h * 0.16, 0, Math.PI * 2); ctx.fill();
    } else if (L.id === 'bike') {
      const h = clamp(g.H * 0.09, 18, 50);
      ctx.strokeStyle = col; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(g.x2 - w * 0.25, top - h * 0.3, h * 0.3, 0, Math.PI * 2); ctx.arc(g.x2 + w * 0.25, top - h * 0.3, h * 0.3, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(g.x2 - w * 0.25, top - h * 0.3); ctx.lineTo(g.x2, top - h); ctx.lineTo(g.x2 + w * 0.25, top - h * 0.3); ctx.lineTo(g.x2 - w * 0.1, top - h * 0.3); ctx.stroke();
    } else {
      const h = clamp(g.H * 0.08, 16, 44);
      ctx.fillStyle = col; ctx.beginPath(); ctx.roundRect(g.x2 - w * 0.3, top - h, w * 0.6, h, 4); ctx.fill();
    }
    ctx.fillStyle = col; ctx.font = `bold ${Math.round(clamp(g.W * 0.02, 10, 15))}px system-ui, sans-serif`; ctx.textAlign = 'center';
    ctx.fillText(`${T(L.label.en, L.label.id)}${c.lifts ? '' : ' — ' + T('too heavy!', 'terlalu berat!')}`, g.x2, top - clamp(g.H * 0.13, 30, 80) - 6);
  }

  function draw() {
    const ctx = cv.ctx;
    const g = geom();
    const { W, H } = g;
    if (W < 10 || H < 10) return;
    const c = calc();
    const fs = clamp(W * 0.021, 10, 16);
    const font = (s, bold) => `${bold ? 'bold ' : ''}${Math.round(s)}px system-ui, -apple-system, Roboto, sans-serif`;

    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    // floor
    ctx.fillStyle = '#1f2937'; ctx.fillRect(0, g.floorY, W, H - g.floorY);

    // Fluid: both cylinders below piston faces + connecting pipe
    const pipeH = clamp(H * 0.05, 10, 30);
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(g.x1 - g.w1 / 2, g.p1y, g.w1, g.floorY - g.p1y);
    ctx.fillRect(g.x2 - g.w2 / 2, g.p2y, g.w2, g.floorY - g.p2y);
    ctx.fillRect(g.x1, g.floorY - pipeH, g.x2 - g.x1, pipeH);
    // pressure pattern: dots evenly spread show equal pressure everywhere
    ctx.fillStyle = 'rgba(191,219,254,0.35)';
    const sp = clamp(W * 0.02, 8, 18);
    for (let y = g.floorY - sp / 2; y > Math.min(g.p1y, g.p2y); y -= sp) {
      for (let x = g.x1 - g.w1 / 2 + sp / 2; x < g.x2 + g.w2 / 2; x += sp) {
        const inC1 = x > g.x1 - g.w1 / 2 && x < g.x1 + g.w1 / 2 && y > g.p1y;
        const inC2 = x > g.x2 - g.w2 / 2 && x < g.x2 + g.w2 / 2 && y > g.p2y;
        const inPipe = x > g.x1 && x < g.x2 && y > g.floorY - pipeH;
        if (inC1 || inC2 || inPipe) { ctx.beginPath(); ctx.arc(x, y, 1.5, 0, Math.PI * 2); ctx.fill(); }
      }
    }
    // Cylinder walls
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3;
    const wall = (x, w) => { ctx.beginPath(); ctx.moveTo(x - w / 2, g.cylTop); ctx.lineTo(x - w / 2, g.floorY); ctx.moveTo(x + w / 2, g.cylTop); ctx.lineTo(x + w / 2, g.floorY); ctx.stroke(); };
    wall(g.x1, g.w1); wall(g.x2, g.w2);
    ctx.beginPath(); ctx.moveTo(g.x1 + g.w1 / 2, g.floorY - pipeH); ctx.lineTo(g.x2 - g.w2 / 2, g.floorY - pipeH); ctx.stroke();
    // Pistons
    const ph = clamp(H * 0.03, 6, 16);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(g.x1 - g.w1 / 2, g.p1y - ph, g.w1, ph);
    ctx.fillRect(g.x2 - g.w2 / 2, g.p2y - ph, g.w2, ph);
    // rods
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(g.x1 - 4, g.p1y - ph - H * 0.12, 8, H * 0.12);
    ctx.fillRect(g.x2 - 6, g.p2y - ph - 10, 12, 10);

    drawLoad(ctx, g, c);

    // Force arrows
    const aw = clamp(W * 0.007, 2.5, 6);
    const f1len = clamp(H * 0.05 + H * 0.08 * Math.sqrt(params.F1 / 1000), 14, H * 0.14);
    arrow(ctx, g.x1, g.p1y - ph - H * 0.12 - f1len, g.x1, g.p1y - ph - H * 0.12 - 4, '#ef4444', aw);
    ctx.fillStyle = '#fca5a5'; ctx.font = font(fs, true); ctx.textAlign = 'center';
    ctx.fillText(`F₁ = ${fmtF(params.F1)}`, g.x1, g.p1y - ph - H * 0.12 - f1len - fs * 0.5);
    const f2len = clamp(H * 0.05 + H * 0.1 * Math.sqrt(c.F2 / 20000), 14, H * 0.18);
    const f2x = g.x2 + g.w2 / 2 + fs * 1.2;
    arrow(ctx, f2x, g.p2y, f2x, g.p2y - f2len, c.lifts ? '#22c55e' : '#f97316', aw);
    ctx.fillStyle = c.lifts ? '#86efac' : '#fdba74'; ctx.textAlign = 'center';
    ctx.fillText(`F₂ = ${fmtF(c.F2)}`, Math.min(f2x, W - fs * 3.5), g.p2y - f2len - fs * 0.5);

    // Area labels on pistons, travel markers
    ctx.fillStyle = '#0b1220'; ctx.font = font(fs * 0.85, true); ctx.textAlign = 'center';
    if (g.w1 > fs * 3.5) ctx.fillText(`A₁ ${params.A1.toFixed(1)} cm²`, g.x1, g.p1y - ph / 2 + fs * 0.33);
    ctx.fillText(`A₂ ${A2().toFixed(0)} cm²`, g.x2, g.p2y - ph / 2 + fs * 0.33);
    if (g.w1 <= fs * 3.5) { ctx.fillStyle = '#fde68a'; ctx.textAlign = 'right'; ctx.fillText(`A₁ ${params.A1.toFixed(1)} cm²`, g.x1 - g.w1 / 2 - 6, g.p1y - ph / 2 + fs * 0.33); }
    // rest-level dashed line and d markers
    ctx.strokeStyle = 'rgba(226,232,240,0.5)'; ctx.setLineDash([4, 4]); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(g.x1 - g.w1 / 2 - fs * 2.5, g.restY); ctx.lineTo(g.x2 + g.w2 / 2 + fs * 0.8, g.restY); ctx.stroke();
    ctx.setLineDash([]);
    if (state.d1 > 0.05) {
      const mx = g.x1 - g.w1 / 2 - fs * 1.2;
      ctx.strokeStyle = '#f87171'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(mx, g.restY); ctx.lineTo(mx, g.p1y); ctx.stroke();
      ctx.fillStyle = '#fca5a5'; ctx.font = font(fs * 0.9, true); ctx.textAlign = 'right';
      ctx.fillText(`d₁ = ${fmtCm(c.d1)}`, mx - 4, (g.restY + g.p1y) / 2 + fs * 0.35);
      const mx2 = g.x2 - g.w2 / 2 - fs * 0.8;
      ctx.strokeStyle = '#4ade80';
      ctx.beginPath(); ctx.moveTo(mx2, g.restY); ctx.lineTo(mx2, g.p2y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(mx2 - 4, g.p2y); ctx.lineTo(mx2 + 4, g.p2y); ctx.stroke();
      ctx.fillStyle = '#86efac';
      ctx.fillText(`d₂ = ${fmtCm(c.d2)}`, mx2 - 4, g.p2y - fs * 0.4);
    }
    // handle knob on piston 1
    ctx.fillStyle = '#fff'; ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(g.x1, g.p1y - ph - H * 0.12, clamp(W * 0.014, 7, 12), 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Readout in the floor band, two columns
    ctx.textAlign = 'left';
    const lh = fs * 1.35;
    const colL = W * 0.02, colR = W * 0.52;
    let y = g.floorY + fs * 1.5;
    ctx.font = font(fs); ctx.fillStyle = '#e2e8f0';
    ctx.fillText(`P = F₁/A₁ = ${fmtP(c.P)} ${T('(same on both sides)', '(sama di kedua sisi)')}`, colL, y);
    ctx.fillText(`F₁d₁ = ${c.W1.toFixed(1)} J   F₂d₂ = ${c.W2.toFixed(1)} J`, colR, y); y += lh;
    ctx.fillText(`F₂ = F₁ × A₂/A₁ = ${params.F1.toFixed(0)} × ${params.ratio.toFixed(0)} = ${fmtF(c.F2)}`, colL, y);
    if (loadN() > 0) {
      ctx.fillStyle = c.lifts ? '#4ade80' : '#f97316'; ctx.font = font(fs, true);
      ctx.fillText(c.lifts ? T('Lifts the load!', 'Beban terangkat!') : `${T('Need F₁ ≥', 'Perlu F₁ ≥')} ${fmtF(c.needF1)}`, colR, y);
      ctx.font = font(fs); ctx.fillStyle = '#e2e8f0';
    }
    y += lh;
    ctx.fillText(`d₂ = d₁ × A₁/A₂ = ${c.d1.toFixed(1)} / ${params.ratio.toFixed(0)} = ${fmtCm(c.d2)}`, colL, y);
    ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.85);
    ctx.fillText(T('Drag the white knob to push the small piston', 'Geser bulatan putih: dorong piston kecil'), colR, y);
    ctx.textAlign = 'left';
  }

  let grabOff = 0;
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) {
      const g = geom(); const ky = g.p1y - clamp(g.H * 0.03, 6, 16) - g.H * 0.12;
      return Math.hypot(x - g.x1, y - ky) < Math.max(18, g.W * 0.03) ? 'p1' : null;
    },
    onStart(id, x, y) { const g = geom(); grabOff = (g.p1y - clamp(g.H * 0.03, 6, 16) - g.H * 0.12) - y; },
    onDrag(id, x, y) {
      const g = geom();
      const faceY = y + grabOff + clamp(g.H * 0.03, 6, 16) + g.H * 0.12;
      const d = (faceY - g.restY) / g.pxPerCm;
      params.d1 = clamp(d, 0, MAX_STROKE_CM); state.d1 = params.d1;
      strokeS.value = params.d1;
    },
    handles: () => { const g = geom(); return [{ id: 'p1', x: g.x1, y: g.p1y - clamp(g.H * 0.03, 6, 16) - g.H * 0.12, label: 'Small piston (drag down to push)' }]; },
    cursor: 'default', hoverCursor: 'grab',
  });

  // Controls
  const a1S = slider({ label: 'Small piston area A₁ (cm²)', key: 'a1', min: 1, max: 100, step: 1, value: params.A1, format: (v) => v.toFixed(0), onInput: (v) => { params.A1 = v; } });
  const ratioS = slider({ label: 'Area ratio A₂/A₁', key: 'ratio', min: 1, max: 100, step: 1, value: params.ratio, format: (v) => `${v.toFixed(0)} : 1`, onInput: (v) => { params.ratio = v; } });
  const f1S = slider({ label: 'Input force F₁ (N)', key: 'f1', min: 10, max: 1000, step: 10, value: params.F1, format: (v) => v.toFixed(0), onInput: (v) => { params.F1 = v; } });
  const strokeS = slider({ label: 'Small piston stroke d₁ (cm)', key: 'd1', min: 0, max: MAX_STROKE_CM, step: 0.5, value: 0, format: (v) => v.toFixed(1), onInput: (v) => { params.d1 = v; } });
  const loadSel = select({ label: 'Load on big piston', key: 'load', options: LOADS.map((l) => ({ value: l.id, label: `${l.label.en} / ${l.label.id}` })), value: params.load, onChange: (v) => { if (LOADS.some((l) => l.id === v)) params.load = v; } });
  const carB = button({ label: 'Lift a car', primary: true, onClick: () => { a1S.apply(5); ratioS.apply(40); f1S.apply(300); loadSel.apply('car'); strokeS.apply(20); } });
  const resetB = button({ label: 'Reset', onClick: () => { a1S.apply(10); ratioS.apply(10); f1S.apply(100); loadSel.apply('none'); strokeS.apply(0); } });
  ctrlPanel.append(a1S.el, ratioS.el, f1S.el, strokeS.el, loadSel.el, row(carB, resetB));

  const lab = labPanel({
    title: 'Hydraulic lift lab — F₁/A₁ = F₂/A₂',
    filename: 'hydraulic-lift-data.csv',
    columns: [
      { key: 'A1', label: 'A₁ (cm²)', format: (v) => v.toFixed(0) },
      { key: 'A2', label: 'A₂ (cm²)', format: (v) => v.toFixed(0) },
      { key: 'F1', label: 'F₁ (N)', format: (v) => v.toFixed(0) },
      { key: 'F2', label: 'F₂ (N)', format: (v) => v.toFixed(0) },
      { key: 'P', label: 'P (kPa)', format: (v) => v.toFixed(1) },
      { key: 'd1', label: 'd₁ (cm)', format: (v) => v.toFixed(1) },
      { key: 'd2', label: 'd₂ (cm)', format: (v) => v.toFixed(3) },
      { key: 'W1', label: 'F₁d₁ (J)', format: (v) => v.toFixed(2) },
      { key: 'W2', label: 'F₂d₂ (J)', format: (v) => v.toFixed(2) },
    ],
    procedure: [
      'Set A₁ = 10 cm², F₁ = 100 N and the stroke to 20 cm. Record with the ratio at 2, 5, 10, 20 and 50.',
      'Plot F₂ against A₂/A₁. Is it a straight line through the origin?',
      'Keep the ratio at 10 and record F₁ = 100, 200 and 400 N. How does P change?',
      'Compare the F₁d₁ and F₂d₂ columns in every row.',
      'Press "Lift a car" and record. Then find the smallest F₁ that still lifts it and record that too.',
    ],
    predict: 'If the big piston has 20 times the area of the small one, how many times bigger is F₂, and how many times smaller is d₂?',
    source: () => {
      const c = calc();
      return { A1: params.A1, A2: A2(), F1: params.F1, F2: c.F2, P: c.P / 1000, d1: params.d1, d2: params.d1 / params.ratio, W1: params.F1 * params.d1 / 100, W2: c.F2 * (params.d1 / params.ratio) / 100 };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
