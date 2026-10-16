import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

// Model (SI units). Flux through one turn as a function of the magnet's axial
// offset x from the coil centre: Φ1(x) = B·A / (1 + (x/L0)²)^1.5  (dipole-like fall-off).
// EMF = −N·dΦ1/dt = −N·B·A·g'(x)·v, computed analytically from the magnet speed.
const COIL_R = 0.025;                     // m
const AREA = Math.PI * COIL_R * COIL_R;   // m² (~1.96e-3)
const L0 = 0.06;                          // m, fall-off length
const X_MAX = 0.30;                       // m, travel each side of the coil
const MAG_LEN = 0.08;                     // m
const FS = 2.0;                           // V, galvanometer soft full scale
const HISTORY = 6;                        // s of graph
const CAP = 480;                          // samples kept

export function fluxShape(x) { return Math.pow(1 + (x / L0) ** 2, -1.5); }
export function fluxSlope(x) { const u = x / L0; return (-3 * u * Math.pow(1 + u * u, -2.5)) / L0; }
export function emfAt(N, B, x, v, orient) { return -N * B * AREA * fluxSlope(x) * v * orient; }

export function mount(rootEl) {
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { N: 100, B: 0.2, auto: false, autoSpeed: 0.3 };
  const state = {
    x: -0.26, v: 0, orient: 1, t: 0, phase: 0,
    flux: 0, emf: 0, needle: 0,
    peakV: 0, peakE: 0, dragging: false,
  };
  const hist = { t: new Float64Array(CAP), flux: new Float64Array(CAP), emf: new Float64Array(CAP), n: 0, head: 0 };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  // layout helpers
  const W = () => cv.width, H = () => cv.height;
  const axisY = () => H() * 0.30;
  const x0 = () => W() * 0.08, x1 = () => W() * 0.72;              // travel range in px
  const pxPerM = () => (x1() - x0()) / (2 * X_MAX);
  const toPx = (x) => (x0() + x1()) / 2 + x * pxPerM();
  const toM = (px) => (px - (x0() + x1()) / 2) / pxPerM();
  const coilX = () => toPx(0);
  const galvo = () => ({ x: W() * 0.875, y: H() * 0.27, r: W() * 0.085 });

  function resetPeaks() { state.peakV = 0; state.peakE = 0; }
  function push(t, f, e) {
    hist.t[hist.head] = t; hist.flux[hist.head] = f; hist.emf[hist.head] = e;
    hist.head = (hist.head + 1) % CAP; if (hist.n < CAP) hist.n++;
  }

  let dragTargetX = null;
  function step(dt) {
    state.t += dt;
    let xNew = state.x;
    if (params.auto && !state.dragging) {
      const amp = 0.24;
      const omega = params.autoSpeed / amp;
      state.phase += omega * dt;
      xNew = -amp * Math.cos(state.phase);
      state.v = amp * omega * Math.sin(state.phase);
    } else {
      if (dragTargetX != null) xNew = dragTargetX;
      const vRaw = dt > 0 ? (xNew - state.x) / dt : 0;
      // smooth the measured speed a little (a real hand is not jerky at 60 Hz)
      state.v += (vRaw - state.v) * Math.min(1, dt * 14);
      if (Math.abs(state.v) < 1e-3) state.v = 0;
    }
    state.x = clamp(xNew, -X_MAX, X_MAX);
    state.flux = params.N * params.B * AREA * fluxShape(state.x) * state.orient;
    state.emf = emfAt(params.N, params.B, state.x, state.v, state.orient);
    if (!Number.isFinite(state.emf)) state.emf = 0;
    state.peakV = Math.max(state.peakV, Math.abs(state.v));
    state.peakE = Math.max(state.peakE, Math.abs(state.emf));
    // galvanometer: soft saturation and a little inertia
    const target = Math.tanh((state.emf / FS) * 1.5);
    state.needle += (target - state.needle) * Math.min(1, dt * 12);
    push(state.t, state.flux, state.emf);
  }

  // ---------- drawing ----------
  const font = (px, bold) => `${bold ? 'bold ' : ''}${Math.max(9, Math.round(px))}px system-ui, -apple-system, Roboto, sans-serif`;
  const fmtV = (v) => (Math.abs(v) < 1 ? `${(v * 1000).toFixed(0)} mV` : `${v.toFixed(2)} V`);

  function drawMagnet(ctx) {
    const y = axisY(), len = MAG_LEN * pxPerM(), h = Math.max(14, COIL_R * 1.2 * pxPerM());
    const cx = toPx(state.x);
    const leftIsN = state.orient < 0;    // orient +1: N pole points right (+x)
    ctx.fillStyle = leftIsN ? '#ef4444' : '#3b82f6';
    ctx.beginPath(); ctx.roundRect(cx - len / 2, y - h / 2, len / 2, h, [6, 0, 0, 6]); ctx.fill();
    ctx.fillStyle = leftIsN ? '#3b82f6' : '#ef4444';
    ctx.beginPath(); ctx.roundRect(cx, y - h / 2, len / 2, h, [0, 6, 6, 0]); ctx.fill();
    ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(cx - len / 2, y - h / 2, len, h, 6); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.font = font(h * 0.7, true); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(leftIsN ? 'N' : 'S', cx - len / 4, y);
    ctx.fillText(leftIsN ? 'S' : 'N', cx + len / 4, y);
    ctx.textBaseline = 'alphabetic';
    // velocity arrow
    if (Math.abs(state.v) > 0.02) {
      const ax = cx, ay = y - h / 2 - H() * 0.045, dir = Math.sign(state.v), al = clamp(Math.abs(state.v) * pxPerM() * 0.12, 10, W() * 0.08);
      ctx.strokeStyle = '#a7f3d0'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(ax - dir * al / 2, ay); ctx.lineTo(ax + dir * al / 2, ay); ctx.stroke();
      ctx.fillStyle = '#a7f3d0';
      ctx.beginPath(); ctx.moveTo(ax + dir * (al / 2 + 6), ay); ctx.lineTo(ax + dir * al / 2, ay - 4); ctx.lineTo(ax + dir * al / 2, ay + 4); ctx.closePath(); ctx.fill();
      ctx.font = font(W() * 0.018); ctx.textAlign = 'center';
      ctx.fillText(`v = ${Math.abs(state.v).toFixed(2)} m/s`, ax, ay - 6);
    }
  }

  function drawCoil(ctx) {
    const y = axisY(), cx = coilX();
    const cw = W() * 0.11, ch = COIL_R * 2 * pxPerM() * 1.25;
    const turnsDrawn = clamp(Math.round(params.N / 12), 4, 30);
    // tube body (translucent so the magnet shows through)
    ctx.fillStyle = 'rgba(217,119,6,0.28)';
    ctx.beginPath(); ctx.roundRect(cx - cw / 2, y - ch / 2, cw, ch, 4); ctx.fill();
    ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = Math.max(1.2, cw / turnsDrawn * 0.45);
    for (let i = 0; i < turnsDrawn; i++) {
      const tx = cx - cw / 2 + ((i + 0.5) / turnsDrawn) * cw;
      ctx.beginPath(); ctx.moveTo(tx, y - ch / 2); ctx.lineTo(tx, y + ch / 2); ctx.stroke();
    }
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(cx - cw / 2, y - ch / 2, cw, ch, 4); ctx.stroke();
    // induced poles (Lenz): coil field opposes the flux change
    const strength = clamp(Math.abs(state.needle), 0, 1);
    if (strength > 0.03) {
      // induced field along +x has the sign of -dΦ/dt, i.e. the sign of the EMF: positive => right face is N
      const rightIsN = state.emf > 0;
      ctx.globalAlpha = 0.3 + 0.7 * strength;
      ctx.font = font(ch * 0.42, true); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = rightIsN ? '#f87171' : '#60a5fa';
      ctx.fillText(rightIsN ? 'N' : 'S', cx + cw / 2 + ch * 0.3, y);
      ctx.fillStyle = rightIsN ? '#60a5fa' : '#f87171';
      ctx.fillText(rightIsN ? 'S' : 'N', cx - cw / 2 - ch * 0.3, y);
      ctx.textBaseline = 'alphabetic'; ctx.globalAlpha = 1;
    }
    ctx.fillStyle = '#fcd34d'; ctx.font = font(W() * 0.019); ctx.textAlign = 'center';
    ctx.fillText(`${params.N} ${T('turns', 'lilitan')}`, cx, y + ch / 2 + W() * 0.025);
    // wires to the galvanometer
    const g = galvo();
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx - cw / 2, y - ch / 2); ctx.lineTo(cx - cw / 2, y - ch / 2 - H() * 0.14); ctx.lineTo(g.x - g.r * 0.35, y - ch / 2 - H() * 0.14); ctx.lineTo(g.x - g.r * 0.35, g.y + g.r * 0.9);
    ctx.moveTo(cx + cw / 2, y - ch / 2); ctx.lineTo(cx + cw / 2, y - ch / 2 - H() * 0.10); ctx.lineTo(g.x + g.r * 0.35, y - ch / 2 - H() * 0.10); ctx.lineTo(g.x + g.r * 0.35, g.y + g.r * 0.9);
    ctx.stroke();
  }

  function drawGalvo(ctx) {
    const g = galvo();
    ctx.fillStyle = '#1e293b'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(g.x - g.r * 1.1, g.y - g.r * 1.05, g.r * 2.2, g.r * 1.9, 10); ctx.fill(); ctx.stroke();
    // scale arc
    ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(g.x, g.y + g.r * 0.5, g.r * 1.15, -Math.PI * 0.5 - 1.05, -Math.PI * 0.5 + 1.05); ctx.stroke();
    for (let i = -4; i <= 4; i++) {
      const a = -Math.PI / 2 + (i / 4) * 1.05;
      const r1 = g.r * 1.15, r2 = g.r * (i === 0 ? 1.0 : 1.07);
      ctx.beginPath(); ctx.moveTo(g.x + Math.cos(a) * r1, g.y + g.r * 0.5 + Math.sin(a) * r1); ctx.lineTo(g.x + Math.cos(a) * r2, g.y + g.r * 0.5 + Math.sin(a) * r2); ctx.stroke();
    }
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(W() * 0.016); ctx.textAlign = 'center';
    ctx.fillText('−', g.x - g.r * 1.0, g.y - g.r * 0.35); ctx.fillText('0', g.x, g.y - g.r * 0.75); ctx.fillText('+', g.x + g.r * 1.0, g.y - g.r * 0.35);
    // needle
    const a = -Math.PI / 2 + state.needle * 1.05;
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(g.x, g.y + g.r * 0.5); ctx.lineTo(g.x + Math.cos(a) * g.r * 1.1, g.y + g.r * 0.5 + Math.sin(a) * g.r * 1.1); ctx.stroke();
    ctx.lineCap = 'butt';
    ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(g.x, g.y + g.r * 0.5, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(W() * 0.018, true);
    ctx.fillText(fmtV(state.emf), g.x, g.y + g.r * 0.8);
    ctx.fillStyle = '#94a3b8'; ctx.font = font(W() * 0.015);
    ctx.fillText(T('galvanometer', 'galvanometer'), g.x, g.y - g.r * 1.05 - 5);
  }

  function drawGraph(ctx, gx, gy, gw, gh, arr, color, label, unitScale, unit, fixedMax) {
    ctx.fillStyle = '#111c33'; ctx.beginPath(); ctx.roundRect(gx, gy, gw, gh, 6); ctx.fill();
    ctx.strokeStyle = 'rgba(148,163,184,0.35)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(gx, gy + gh / 2); ctx.lineTo(gx + gw, gy + gh / 2); ctx.stroke();
    // y range
    let m = fixedMax || 0;
    if (!fixedMax) { for (let i = 0; i < hist.n; i++) m = Math.max(m, Math.abs(arr[i])); m = Math.max(m, 0.05); }
    const tNow = state.t;
    ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.beginPath();
    let started = false;
    // iterate oldest -> newest
    const start = hist.n < CAP ? 0 : hist.head;
    for (let k = 0; k < hist.n; k++) {
      const i = (start + k) % CAP;
      const age = tNow - hist.t[i];
      if (age > HISTORY) continue;
      const px = gx + gw * (1 - age / HISTORY);
      const py = gy + gh / 2 - (arr[i] / m) * (gh / 2) * 0.9;
      if (!started) { ctx.moveTo(px, py); started = true; } else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.fillStyle = color; ctx.font = font(W() * 0.017, true); ctx.textAlign = 'left';
    ctx.fillText(label, gx + 8, gy + W() * 0.02);
    ctx.fillStyle = '#94a3b8'; ctx.font = font(W() * 0.015); ctx.textAlign = 'right';
    ctx.fillText(`+${(m * unitScale).toFixed(m * unitScale >= 10 ? 0 : 2)} ${unit}`, gx + gw - 6, gy + W() * 0.018);
    ctx.fillText(`−${(m * unitScale).toFixed(m * unitScale >= 10 ? 0 : 2)} ${unit}`, gx + gw - 6, gy + gh - 5);
    ctx.textAlign = 'left';
    ctx.fillText(T(`last ${HISTORY} s`, `${HISTORY} s terakhir`), gx + 8, gy + gh - 5);
  }

  function draw() {
    const ctx = cv.ctx;
    const w = W(), h = H();
    if (w < 10 || h < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, w, h);
    // axis / rail
    ctx.strokeStyle = 'rgba(148,163,184,0.35)'; ctx.lineWidth = 1; ctx.setLineDash([4, 6]);
    ctx.beginPath(); ctx.moveTo(x0() - MAG_LEN * pxPerM() / 2, axisY()); ctx.lineTo(x1() + MAG_LEN * pxPerM() / 2, axisY()); ctx.stroke(); ctx.setLineDash([]);
    drawMagnet(ctx);
    drawCoil(ctx);
    drawGalvo(ctx);
    // status text
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(w * 0.019); ctx.textAlign = 'left';
    const fluxTxt = `Φ = ${(state.flux * 1000).toFixed(1)} mWb`;
    let lenz;
    if (Math.abs(state.emf) < 0.005) lenz = T('Flux constant → EMF = 0', 'Fluks tetap → GGL = 0');
    else {
      const rising = state.emf * state.orient < 0;   // |Φ| growing  <=>  dΦ/dt has the sign of orient
      lenz = rising ? T('Flux increasing → coil pushes the magnet away (Lenz)', 'Fluks bertambah → kumparan mendorong magnet (Lenz)')
        : T('Flux decreasing → coil pulls the magnet back (Lenz)', 'Fluks berkurang → kumparan menarik magnet kembali (Lenz)');
    }
    ctx.fillText(fluxTxt, w * 0.02, h * 0.50);
    ctx.fillText(`${T('EMF', 'GGL')} = −N·ΔΦ/Δt = ${fmtV(state.emf)}`, w * 0.22, h * 0.50);
    ctx.fillStyle = '#a7f3d0';
    ctx.fillText(lenz, w * 0.02, h * 0.545);
    ctx.fillStyle = '#94a3b8'; ctx.font = font(w * 0.016);
    ctx.textAlign = 'right';
    ctx.fillText(T(`peak |v| ${state.peakV.toFixed(2)} m/s · peak |EMF| ${fmtV(state.peakE)}`, `|v| puncak ${state.peakV.toFixed(2)} m/s · |GGL| puncak ${fmtV(state.peakE)}`), w * 0.98, h * 0.545);
    ctx.textAlign = 'left';
    // graphs
    const gx = w * 0.03, gw = w * 0.94;
    drawGraph(ctx, gx, h * 0.585, gw, h * 0.185, hist.flux, '#38bdf8', T('Flux Φ through coil (mWb)', 'Fluks Φ menembus kumparan (mWb)'), 1000, 'mWb', params.N * params.B * AREA);
    drawGraph(ctx, gx, h * 0.795, gw, h * 0.185, hist.emf, '#fbbf24', T('Induced EMF (V)', 'GGL induksi (V)'), 1, 'V', 0);
  }

  // ---------- interaction ----------
  let grabDX = 0;
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) {
      const len = MAG_LEN * pxPerM(), hh = Math.max(14, COIL_R * 1.2 * pxPerM()) / 2 + 10;
      return Math.abs(x - toPx(state.x)) < len / 2 + 10 && Math.abs(y - axisY()) < hh ? 'magnet' : null;
    },
    onStart(id, x) { grabDX = toPx(state.x) - x; state.dragging = true; dragTargetX = state.x; },
    onDrag(id, x) { dragTargetX = clamp(toM(x + grabDX), -X_MAX, X_MAX); },
    onEnd() { state.dragging = false; dragTargetX = null; },
    handles: () => [{ id: 'magnet', x: toPx(state.x), y: axisY(), label: 'Bar magnet (drag or use arrow keys to move through the coil)' }],
    cursor: 'grab', hoverCursor: 'grab', keyStep: 6,
  });

  // ---------- controls ----------
  const turnsS = slider({
    label: 'Turns N', key: 'turns', min: 10, max: 500, step: 10, value: params.N,
    onInput: (v) => { params.N = v; resetPeaks(); },
  });
  const bS = slider({
    label: 'Magnet strength B (T)', key: 'B', min: 0.05, max: 0.5, step: 0.01, value: params.B, format: (v) => v.toFixed(2),
    onInput: (v) => { params.B = v; resetPeaks(); },
  });
  const speedS = slider({
    label: 'Auto-sweep speed (m/s)', key: 'speed', min: 0.1, max: 1.5, step: 0.05, value: params.autoSpeed, format: (v) => v.toFixed(2),
    onInput: (v) => { params.autoSpeed = v; resetPeaks(); },
  });
  const autoT = toggle({ label: 'Auto-sweep (magnet moves in and out by itself)', key: 'auto', value: false, onChange: (v) => { params.auto = v; if (v) { state.phase = Math.acos(clamp(-state.x / 0.24, -1, 1)); } resetPeaks(); } });
  const flipB = button({ label: 'Flip magnet', onClick: () => { state.orient *= -1; } });
  const peaksB = button({ label: 'Reset peaks', onClick: resetPeaks });
  const centreB = button({ label: 'Move magnet to start', onClick: () => { state.x = -0.26; state.v = 0; state.phase = 0; } });
  ctrlPanel.append(turnsS.el, bS.el, speedS.el, row(autoT), row(flipB, peaksB, centreB));

  const lab = labPanel({
    title: 'Induction lab: what sets the peak EMF?',
    filename: 'electromagnetic-induction-data.csv',
    columns: [
      { key: 'N', label: 'Turns N' },
      { key: 'B', label: 'B (T)', format: (v) => v.toFixed(2) },
      { key: 'v', label: 'Peak speed (m/s)', format: (v) => v.toFixed(2) },
      { key: 'emf', label: 'Peak EMF (V)', format: (v) => v.toFixed(3) },
      { key: 'ratio', label: 'EMF ÷ (N·B·v)', format: (v) => (v == null ? '–' : v.toFixed(4)) },
    ],
    procedure: [
      'Set N = 100, B = 0.20 T. Turn on Auto-sweep at 0.30 m/s, wait for one full pass, then Record.',
      'Change N to 200, then 400 (peaks reset automatically). Record each after a full pass.',
      'Back to N = 100. Set the speed to 0.60 m/s, then 1.20 m/s. Record each.',
      'Back to 0.30 m/s. Set B to 0.40 T. Record.',
      'Look at the last column. If it is roughly constant, EMF is proportional to N × B × v. Explain why using EMF = −N·ΔΦ/Δt.',
    ],
    predict: 'If you double the number of turns, what happens to the peak EMF? And if you double the speed instead?',
    source: () => {
      if (state.peakE <= 0) return null;
      const d = params.N * params.B * state.peakV;
      return { N: params.N, B: params.B, v: state.peakV, emf: state.peakE, ratio: d > 0 ? state.peakE / d : null };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
