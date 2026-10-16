import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);

// Physics (one mark = 1 m): the plank turns about the pivot under the net
// moment G·(mR·dR − mL·dL) of the two weights. A small restoring moment
// K_LEVEL·θ (the pivot sits a little above the plank's centre of mass, as on
// a real seesaw) brings a balanced plank back to level; rubber stops hold it
// at ±MAX_ANGLE. K_LEVEL·MAX_ANGLE < G·1·1, so even a 1 kg·mark imbalance
// tips the plank all the way. For a lively feel the clock runs SPEED× and the
// weights' inertia is scaled by MASS_INERTIA (looks the same, settles faster).
const G = 9.8;
const I_PLANK = 4;          // kg·m², plank alone
const MASS_INERTIA = 0.5;   // fraction of Σ m·d² counted as inertia
const K_LEVEL = 26;         // N·m per rad
const DAMP = 0.8;           // 1/s
const MAX_ANGLE = 0.33;     // rad (~19°)
const SPEED = 3.5;          // physics seconds per real second
const MARKS = 5;

function bigBtn(label, onClick) {
  const b = button({ label, onClick });
  b.el.style.minHeight = '44px';
  b.el.style.fontSize = '1rem';
  b.el.style.padding = '10px 18px';
  return b;
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const weights = {
    L: { id: 'L', m: 2, d: 3 },   // d = marks from the pivot (positive)
    R: { id: 'R', m: 2, d: 3 },
  };
  const state = { theta: 0, omega: 0, showNumbers: false, celebrateAt: -10, wasBalanced: false };
  let now = 0;

  const pivot = () => ({ x: cv.width * 0.5, y: cv.height * 0.62 });
  const stepPx = () => cv.width * 0.075;           // one mark
  const plankHalf = () => stepPx() * (MARKS + 0.6);

  const momentL = () => weights.L.m * weights.L.d;
  const momentR = () => weights.R.m * weights.R.d;
  const balanced = () => momentL() === momentR();

  function step(dt) {
    const sub = 6, h = (dt * SPEED) / sub;
    for (let i = 0; i < sub; i++) {
      const tau = G * (momentR() - momentL()) - K_LEVEL * state.theta;
      const I = I_PLANK + MASS_INERTIA * (weights.L.m * weights.L.d ** 2 + weights.R.m * weights.R.d ** 2);
      const alpha = tau / I - DAMP * state.omega;
      state.omega += alpha * h;
      state.theta += state.omega * h;
      if (state.theta > MAX_ANGLE) { state.theta = MAX_ANGLE; if (state.omega > 0) state.omega *= -0.15; }
      if (state.theta < -MAX_ANGLE) { state.theta = -MAX_ANGLE; if (state.omega < 0) state.omega *= -0.15; }
    }
    const nowBal = balanced() && Math.abs(state.theta) < 0.03;
    if (nowBal && !state.wasBalanced) state.celebrateAt = now;
    state.wasBalanced = nowBal;
  }

  // Position of a weight's base on the plank (canvas px) for signed mark s.
  function onPlank(s) {
    const p = pivot(), c = Math.cos(state.theta), sn = Math.sin(state.theta);
    return { x: p.x + s * stepPx() * c, y: p.y + s * stepPx() * sn };
  }

  function drawWeight(ctx, w, side) {
    const s = side === 'L' ? -w.d : w.d;
    const base = onPlank(s);
    const size = stepPx() * (0.42 + w.m * 0.11);
    ctx.save();
    ctx.translate(base.x, base.y);
    ctx.rotate(state.theta);
    const thick = stepPx() * 0.16;
    ctx.fillStyle = side === 'L' ? '#ef4444' : '#3b82f6';
    ctx.beginPath(); ctx.roundRect(-size / 2, -thick / 2 - size, size, size, size * 0.12); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.lineWidth = 2; ctx.stroke();
    // handle loop on top
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = Math.max(2, size * 0.07);
    ctx.beginPath(); ctx.arc(0, -thick / 2 - size, size * 0.22, Math.PI, 0); ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.font = `bold ${Math.max(11, Math.round(size * 0.32))}px system-ui, -apple-system, Roboto, sans-serif`;
    ctx.fillText(`${w.m} kg`, 0, -thick / 2 - size / 2 + size * 0.12);
    ctx.restore();
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    const p = pivot(), sp = stepPx(), half = plankHalf(), thick = sp * 0.16;
    const groundY = p.y + sp * 2.2;
    // ground
    ctx.fillStyle = '#14532d'; ctx.fillRect(0, groundY, W, H - groundY);
    ctx.fillStyle = '#166534'; ctx.fillRect(0, groundY, W, 6);
    // pivot
    ctx.fillStyle = '#64748b';
    ctx.beginPath(); ctx.moveTo(p.x - sp * 0.9, groundY); ctx.lineTo(p.x, p.y); ctx.lineTo(p.x + sp * 0.9, groundY); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(p.x, p.y, sp * 0.14, 0, Math.PI * 2); ctx.fill();
    // rubber stops
    ctx.fillStyle = '#1f2937';
    const stopX = half * Math.cos(MAX_ANGLE) * 0.98;
    ctx.beginPath(); ctx.roundRect(p.x - stopX - sp * 0.25, groundY - sp * 0.35, sp * 0.5, sp * 0.35, 4); ctx.fill();
    ctx.beginPath(); ctx.roundRect(p.x + stopX - sp * 0.25, groundY - sp * 0.35, sp * 0.5, sp * 0.35, 4); ctx.fill();
    // plank
    ctx.save();
    ctx.translate(p.x, p.y); ctx.rotate(state.theta);
    ctx.fillStyle = '#c0813f';
    ctx.beginPath(); ctx.roundRect(-half, -thick / 2, half * 2, thick, 4); ctx.fill();
    ctx.strokeStyle = '#7c4a1e'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#3b2210';
    ctx.font = `bold ${Math.max(10, Math.round(sp * 0.3))}px system-ui, -apple-system, Roboto, sans-serif`;
    ctx.textAlign = 'center';
    for (let i = 1; i <= MARKS; i++) {
      for (const s of [-1, 1]) {
        const x = s * i * sp;
        ctx.fillRect(x - 1.5, -thick / 2, 3, thick);
        ctx.fillText(String(i), x, thick / 2 + sp * 0.32);
      }
    }
    ctx.restore();
    drawWeight(ctx, weights.L, 'L');
    drawWeight(ctx, weights.R, 'R');

    // Strength bars (left and right) — how hard each side pushes down.
    const fs = Math.max(12, Math.round(H * 0.045));
    const barMax = sp * 4.2, barH = Math.max(10, H * 0.035);
    const scale = barMax / (5 * MARKS);
    const drawBar = (side, m, x, dir) => {
      ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.roundRect(dir < 0 ? x - barMax : x, H * 0.2, barMax, barH, barH / 2); ctx.fill();
      ctx.fillStyle = side === 'L' ? '#ef4444' : '#3b82f6';
      const len = Math.max(barH, m * scale);
      ctx.beginPath(); ctx.roundRect(dir < 0 ? x - len : x, H * 0.2, len, barH, barH / 2); ctx.fill();
      ctx.fillStyle = '#e2e8f0';
      ctx.textAlign = dir < 0 ? 'right' : 'left';
      ctx.font = `${Math.round(fs * 0.8)}px system-ui, -apple-system, Roboto, sans-serif`;
      const w = weights[side];
      const marks = w.d === 1 ? T('mark 1', 'tanda 1') : `${T('mark', 'tanda')} ${w.d}`;
      ctx.fillText(`${side === 'L' ? T('Left', 'Kiri') : T('Right', 'Kanan')}: ${w.m} kg ${T('at', 'di')} ${marks}`, x, H * 0.2 - fs * 0.5);
      if (state.showNumbers) {
        ctx.font = `bold ${fs}px system-ui, -apple-system, Roboto, sans-serif`;
        ctx.fillText(`${w.m} × ${w.d} = ${m}`, x, H * 0.2 + barH + fs * 1.05);
      }
    };
    drawBar('L', momentL(), W * 0.47, -1);
    drawBar('R', momentR(), W * 0.53, 1);

    // Banner
    ctx.textAlign = 'center';
    ctx.font = `bold ${Math.round(fs * 1.25)}px system-ui, -apple-system, Roboto, sans-serif`;
    if (balanced()) {
      const pulse = 1 + 0.06 * Math.sin((now - state.celebrateAt) * 6) * (now - state.celebrateAt < 2 ? 1 : 0);
      ctx.save(); ctx.translate(W * 0.5, H * 0.09); ctx.scale(pulse, pulse);
      ctx.fillStyle = '#22c55e'; ctx.beginPath(); ctx.roundRect(-W * 0.2, -fs * 0.9, W * 0.4, fs * 1.8, fs); ctx.fill();
      ctx.fillStyle = '#052e16'; ctx.fillText(T('Balanced!', 'Seimbang!'), 0, fs * 0.45);
      ctx.restore();
    } else {
      ctx.fillStyle = '#facc15';
      ctx.fillText(momentL() > momentR() ? T('Left side is stronger', 'Sisi kiri lebih kuat') : T('Right side is stronger', 'Sisi kanan lebih kuat'), W * 0.5, H * 0.09 + fs * 0.45);
    }
    ctx.textAlign = 'left';
  }

  // Dragging: project the pointer onto the plank and snap to whole marks on that side.
  function markFromPointer(side, px, py) {
    const p = pivot(), c = Math.cos(state.theta), sn = Math.sin(state.theta);
    const along = ((px - p.x) * c + (py - p.y) * sn) / stepPx();
    const d = Math.round(Math.abs(along));
    const okSide = side === 'L' ? along < 0 : along > 0;
    if (!okSide) return 1;
    return Math.max(1, Math.min(MARKS, d));
  }
  const drag = dragHandle(cv.canvas, {
    hitTest(px, py) {
      for (const side of ['R', 'L']) {
        const w = weights[side];
        const base = onPlank(side === 'L' ? -w.d : w.d);
        const size = stepPx() * (0.42 + w.m * 0.11);
        if (Math.hypot(px - base.x, py - (base.y - size * 0.6)) < size * 0.9) return side;
      }
      return null;
    },
    onDrag(id, px, py) { weights[id].d = markFromPointer(id, px, py); },
    handles: () => ['L', 'R'].map((side) => {
      const w = weights[side];
      const base = onPlank(side === 'L' ? -w.d : w.d);
      const size = stepPx() * (0.42 + w.m * 0.11);
      return { id: side, x: base.x, y: base.y - size * 0.6, label: `${side === 'L' ? 'Left' : 'Right'} weight, ${w.m} kg at mark ${w.d} (arrow keys to slide)` };
    }),
    keyStep: Math.max(12, Math.round(cv.width * 0.075)),
    cursor: 'grab',
    hoverCursor: 'grab',
  });

  // Controls
  const leftS = slider({
    label: T('Left weight (kg)', 'Beban kiri (kg)'), key: 'left-kg', min: 1, max: 5, step: 1, value: 2,
    format: (v) => `${v} kg`, onInput: (v) => { weights.L.m = v; },
  });
  const rightS = slider({
    label: T('Right weight (kg)', 'Beban kanan (kg)'), key: 'right-kg', min: 1, max: 5, step: 1, value: 2,
    format: (v) => `${v} kg`, onInput: (v) => { weights.R.m = v; },
  });
  const numT = toggle({ label: T('Show the numbers', 'Tampilkan angka'), key: 'numbers', value: false, onChange: (v) => { state.showNumbers = v; } });
  const resetB = bigBtn(T('Reset', 'Atur ulang'), () => {
    weights.L.d = 3; weights.R.d = 3; leftS.apply(2); rightS.apply(2);
    state.theta = 0; state.omega = 0;
  });
  ctrlPanel.append(row(leftS, rightS), row(numT, resetB));

  const lab = labPanel({
    title: 'Does it balance?',
    filename: 'seesaw-lever-data.csv',
    columns: [
      { key: 'leftKg', label: 'Left weight (kg)' },
      { key: 'leftD', label: 'Left distance (mark)' },
      { key: 'rightKg', label: 'Right weight (kg)' },
      { key: 'rightD', label: 'Right distance (mark)' },
      { key: 'balanced', label: 'Balanced?' },
    ],
    procedure: [
      'Put 2 kg at mark 3 on both sides. Record.',
      'Slide the right weight to mark 4. Record. Which side went down?',
      'Put 4 kg at mark 1 on the left. Find where 1 kg must go on the right to balance. Record.',
      'Put 3 kg at mark 2 on the left. Find every way to balance it on the right. Record each one.',
      'For each balanced row, multiply weight × distance on each side. What do you see?',
    ],
    predict: 'Can a 1 kg weight balance a 4 kg weight? Where would it have to sit?',
    source: () => ({
      leftKg: weights.L.m, leftD: weights.L.d,
      rightKg: weights.R.m, rightD: weights.R.d,
      balanced: balanced() ? 'yes' : 'no',
    }),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { now = t; step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
