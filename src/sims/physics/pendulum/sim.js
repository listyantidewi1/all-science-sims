import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';
import { cssVar } from '../../../lib/color.js';
import { labPanel } from '../../../lib/lab.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const params = {
    L: 1.5,        // m
    g: 9.8,        // m/s²
    theta0: 30,    // deg
    damping: 0.0,  // 1/s
  };

  let state = { theta: 0, omega: 0, t: 0, lastZero: 0, period: 0 };
  let trail = [];

  function reset() {
    state.theta = (params.theta0 * Math.PI) / 180;
    state.omega = 0;
    state.t = 0;
    state.lastZero = 0;
    state.period = 0;
    trail = [];
  }
  reset();

  function step(dt) {
    // Use a small fixed substep for stability with large angles.
    const sub = 4;
    const h = dt / sub;
    for (let s = 0; s < sub; s++) {
      const a = -(params.g / params.L) * Math.sin(state.theta) - params.damping * state.omega;
      state.omega += a * h;
      state.theta += state.omega * h;
    }
    const prevT = state.t;
    state.t += dt;
    // Detect a zero crossing of theta (positive → negative) to estimate period.
    if (Math.sign(state.theta) !== Math.sign(state.theta - state.omega * dt) && state.theta > -0.5 && state.theta < 0.5) {
      if (state.lastZero) state.period = (state.t - state.lastZero) * 2;
      state.lastZero = state.t;
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);
    const cx = W / 2;
    const pivotY = 60;
    const scale = Math.min((H - 100) / 2.5, (W - 80) / 2.5); // px per meter
    const bobX = cx + Math.sin(state.theta) * params.L * scale;
    const bobY = pivotY + Math.cos(state.theta) * params.L * scale;

    // arc from rest
    ctx.strokeStyle = 'rgba(120,130,150,0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, pivotY, params.L * scale, Math.PI / 2 - 1.4, Math.PI / 2 + 1.4);
    ctx.stroke();

    // string
    ctx.strokeStyle = cssVar('--color-fg', '#0b1220');
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, pivotY);
    ctx.lineTo(bobX, bobY);
    ctx.stroke();

    // pivot
    ctx.fillStyle = cssVar('--color-fg', '#0b1220');
    ctx.beginPath();
    ctx.arc(cx, pivotY, 4, 0, Math.PI * 2);
    ctx.fill();

    // trail
    trail.push({ x: bobX, y: bobY });
    if (trail.length > 80) trail.shift();
    ctx.strokeStyle = cssVar('--subj-physics', '#3b82f6');
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.4;
    ctx.beginPath();
    for (let i = 0; i < trail.length; i++) {
      const p = trail[i];
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
    ctx.globalAlpha = 1;

    // bob
    ctx.fillStyle = cssVar('--subj-physics', '#3b82f6');
    ctx.beginPath();
    ctx.arc(bobX, bobY, 14, 0, Math.PI * 2);
    ctx.fill();

    // readout
    const Tsmall = 2 * Math.PI * Math.sqrt(params.L / params.g);
    ctx.fillStyle = 'rgba(120,130,150,0.95)';
    ctx.font = '13px var(--font-sans)';
    ctx.fillText(`Small-angle T = 2π√(L/g) = ${Tsmall.toFixed(3)} s`, 12, 18);
    ctx.fillText(`Measured T = ${state.period ? state.period.toFixed(3) : '—'} s`, 12, 36);
    ctx.fillText(`θ = ${(state.theta * 180 / Math.PI).toFixed(1)}°    ω = ${state.omega.toFixed(2)} rad/s`, 12, H - 12);
  }

  // controls
  const lengthS = slider({
    label: 'Length L (m)', min: 0.3, max: 4, step: 0.05, value: params.L, format: (v) => v.toFixed(2),
    onInput: (v) => { params.L = v; reset(); },
  });
  const gravS = slider({
    label: 'Gravity g (m/s²)', min: 1, max: 25, step: 0.1, value: params.g, format: (v) => v.toFixed(1),
    onInput: (v) => { params.g = v; reset(); },
  });
  const angS = slider({
    label: 'Initial angle (°)', min: 1, max: 170, step: 1, value: params.theta0,
    onInput: (v) => { params.theta0 = v; reset(); },
  });
  const dampS = slider({
    label: 'Damping', min: 0, max: 1, step: 0.01, value: params.damping, format: (v) => v.toFixed(2),
    onInput: (v) => { params.damping = v; },
  });
  const resetB = button({ label: 'Reset', onClick: reset });

  ctrlPanel.append(lengthS.el, gravS.el, angS.el, dampS.el, row(resetB));

  // Lab — investigate T vs L (and verify T = 2π√(L/g)).
  const lab = labPanel({
    title: 'Pendulum lab — period vs length',
    filename: 'pendulum-lab.csv',
    columns: [
      { key: 'L',         label: 'L (m)',       format: (v) => v.toFixed(2) },
      { key: 'theta0',    label: 'θ₀ (°)',      format: (v) => v.toFixed(0) },
      { key: 'g',         label: 'g (m/s²)',    format: (v) => v.toFixed(2) },
      { key: 'T_meas',    label: 'T meas (s)',  format: (v) => v == null ? '–' : v.toFixed(3) },
      { key: 'T_theory',  label: 'T = 2π√(L/g)', format: (v) => v.toFixed(3) },
    ],
    procedure: [
      'Set L = 0.5 m. Wait until "Measured T" stabilizes; click Record.',
      'Set L = 1.0 m. Record again.',
      'Set L = 1.5 m, then 2.0 m, then 3.0 m. Record each.',
      'Now keep L fixed and vary θ₀ from 5° to 90°. Does T change much?',
      'Plot T vs L on graph paper. Then T² vs L. Which is a straight line?',
    ],
    predict: 'Do you expect T to grow linearly with L, with √L, or with L²? Write your prediction first.',
    source: () => ({
      L: params.L,
      theta0: params.theta0,
      g: params.g,
      T_meas: state.period || null,
      T_theory: 2 * Math.PI * Math.sqrt(params.L / params.g),
    }),
  });
  ctrlPanel.appendChild(lab.el);

  // Drag the bob to set position. While dragging, freeze velocity at zero.
  let dragging = false;
  cv.canvas.style.cursor = 'grab';
  cv.canvas.addEventListener('mousedown', (e) => {
    dragging = true;
    cv.canvas.style.cursor = 'grabbing';
    handleDrag(e);
  });
  window.addEventListener('mousemove', (e) => { if (dragging) handleDrag(e); });
  window.addEventListener('mouseup', () => {
    if (dragging) {
      dragging = false;
      cv.canvas.style.cursor = 'grab';
      // Snapshot current angle as new theta0 and zero out velocity to release cleanly
      params.theta0 = Math.max(1, Math.min(170, Math.abs(state.theta * 180 / Math.PI)));
      angS.value = Math.round(params.theta0);
      state.omega = 0;
    }
  });
  function handleDrag(e) {
    const rect = cv.canvas.getBoundingClientRect();
    const sx = (e.clientX - rect.left) * cv.width / rect.width;
    const sy = (e.clientY - rect.top) * cv.height / rect.height;
    const cx = cv.width / 2;
    const pivotY = 60;
    // angle from pivot, measured from straight down
    const dx = sx - cx;
    const dy = sy - pivotY;
    const ang = Math.atan2(dx, dy); // from -π to π, 0 = straight down
    const clamped = Math.max(-Math.PI * 0.95, Math.min(Math.PI * 0.95, ang));
    state.theta = clamped;
    state.omega = 0;
    state.t = 0;
  }

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();

  return () => { animator.stop(); cv.destroy(); };
}
