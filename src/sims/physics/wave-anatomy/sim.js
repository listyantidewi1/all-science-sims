import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const ROPE_M = 5;        // metres of rope / spring shown
const N_COILS = 80;
const A_MAX_CM = 20;

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const params = { A: 10 /* cm */, f: 1.0 /* Hz */, v: 2.0 /* m/s */ };
  const state = { t: 0, paused: false, ruler: null /* { ax, ay, bx, by } in fractions of W/H */ };

  const lambda = () => params.v / Math.max(1e-6, params.f);
  const period = () => 1 / Math.max(1e-6, params.f);
  const omega = () => 2 * Math.PI * params.f;
  const kWave = () => 2 * Math.PI / Math.max(1e-6, lambda());

  function geom() {
    const W = cv.width, H = cv.height;
    const x0 = W * 0.05, x1 = W * 0.95;
    const ppm = (x1 - x0) / ROPE_M;             // px per metre, horizontal
    const yT = H * 0.3;                          // rope rest line
    const ampScale = (H * 0.14) / A_MAX_CM;      // px per cm of transverse amplitude
    const yL = H * 0.74;                         // spring centre line
    const coilH = H * 0.13;
    return { W, H, x0, x1, ppm, yT, ampScale, yL, coilH };
  }
  function ensureRuler() {
    if (!state.ruler) state.ruler = { ax: 0.25, ay: 0.52, bx: 0.55, by: 0.52 };
  }
  function rulerPx() {
    ensureRuler();
    const g = geom();
    return { ax: state.ruler.ax * g.W, ay: state.ruler.ay * g.H, bx: state.ruler.bx * g.W, by: state.ruler.by * g.H, g };
  }
  const yRope = (xm, t) => params.A * Math.sin(kWave() * xm - omega() * t);        // cm
  const xiSpring = (xm, t) => params.A * Math.sin(kWave() * xm - omega() * t);     // cm (visual scale applied later)

  function step(dt) { if (!state.paused) state.t += dt; }

  function bracket(ctx, x1, x2, y, color, label, fs, above) {
    ctx.strokeStyle = color; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x1, y - 6); ctx.lineTo(x1, y + 6); ctx.moveTo(x2, y - 6); ctx.lineTo(x2, y + 6); ctx.stroke();
    ctx.fillStyle = color; ctx.font = `bold ${Math.round(fs * 0.9)}px system-ui, sans-serif`; ctx.textAlign = 'center';
    ctx.fillText(label, (x1 + x2) / 2, above ? y - 8 : y + fs * 1.1);
  }

  function draw() {
    const ctx = cv.ctx;
    const g = geom();
    const { W, H, x0, x1, ppm, yT, ampScale, yL, coilH } = g;
    if (W < 10 || H < 10) return;
    const fs = clamp(W * 0.021, 10, 16);
    const font = (s, bold) => `${bold ? 'bold ' : ''}${Math.round(s)}px system-ui, -apple-system, Roboto, sans-serif`;
    const t = state.t, lam = lambda(), k = kWave(), w = omega();

    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);

    // ---------- Transverse wave on a rope ----------
    ctx.strokeStyle = 'rgba(148,163,184,0.4)'; ctx.setLineDash([4, 4]); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x0, yT); ctx.lineTo(x1, yT); ctx.stroke(); ctx.setLineDash([]);
    ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = clamp(H * 0.008, 2, 5); ctx.lineCap = 'round';
    ctx.beginPath();
    const steps = Math.max(100, Math.min(600, Math.round((x1 - x0) / 2)));
    for (let i = 0; i <= steps; i++) {
      const xm = ROPE_M * i / steps;
      const px = x0 + xm * ppm, py = yT - yRope(xm, t) * ampScale;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke(); ctx.lineCap = 'butt';
    // source hand at the left end
    const ySrc = yT - yRope(0, t) * ampScale;
    ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.roundRect(x0 - clamp(W * 0.03, 10, 24), ySrc - 8, clamp(W * 0.03, 10, 24), 16, 5); ctx.fill();
    // red marker particle at x = 1.5 m, with its up/down track
    const xmMark = 1.5;
    const mx = x0 + xmMark * ppm;
    ctx.strokeStyle = 'rgba(248,113,113,0.5)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(mx, yT - params.A * ampScale); ctx.lineTo(mx, yT + params.A * ampScale); ctx.stroke();
    ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(mx, yT - yRope(xmMark, t) * ampScale, clamp(W * 0.009, 4, 8), 0, Math.PI * 2); ctx.fill();
    // crest/trough labels: first crest with x >= 0.4 m, next crest one λ later, trough half way
    const phase0 = w * t; // crest where k x - w t = π/2 + 2πn
    let xc = ((Math.PI / 2 + phase0) / k);
    xc -= Math.floor((xc - 0.4) / lam) * lam;      // smallest crest position >= 0.4 m
    if (xc < 0.4) xc += lam;
    const xc2 = xc + lam, xt = xc + lam / 2;
    const crestY = yT - params.A * ampScale, troughY = yT + params.A * ampScale;
    ctx.font = font(fs * 0.9, true); ctx.textAlign = 'center';
    if (xc <= ROPE_M) { ctx.fillStyle = '#93c5fd'; ctx.fillText(T('crest', 'puncak'), x0 + xc * ppm, crestY - fs * 0.6); }
    if (xt <= ROPE_M) { ctx.fillStyle = '#93c5fd'; ctx.fillText(T('trough', 'lembah'), x0 + xt * ppm, troughY + fs * 1.2); }
    if (xc2 <= ROPE_M) bracket(ctx, x0 + xc * ppm, x0 + xc2 * ppm, crestY - fs * 1.9, '#f59e0b', `λ = ${lam.toFixed(2)} m`, fs, true);
    else { ctx.fillStyle = '#f59e0b'; ctx.font = font(fs * 0.9); ctx.textAlign = 'right'; ctx.fillText(`λ = ${lam.toFixed(2)} m (${T('longer than the rope', 'lebih panjang dari tali')})`, x1, crestY - fs * 2); }
    // amplitude bracket at the second crest if visible, else first
    const xa = xc2 <= ROPE_M ? xc2 : xc;
    if (xa <= ROPE_M) {
      const ax = x0 + xa * ppm + fs * 0.8;
      ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(ax, yT); ctx.lineTo(ax, crestY); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(ax - 5, yT); ctx.lineTo(ax + 5, yT); ctx.moveTo(ax - 5, crestY); ctx.lineTo(ax + 5, crestY); ctx.stroke();
      ctx.fillStyle = '#4ade80'; ctx.font = font(fs * 0.9, true); ctx.textAlign = 'left';
      ctx.fillText(`A = ${params.A.toFixed(0)} cm`, ax + 6, (yT + crestY) / 2 + fs * 0.35);
    }

    // ---------- Longitudinal wave in a spring ----------
    ctx.strokeStyle = 'rgba(148,163,184,0.35)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x0, yL - coilH / 2); ctx.lineTo(x1, yL - coilH / 2); ctx.moveTo(x0, yL + coilH / 2); ctx.lineTo(x1, yL + coilH / 2); ctx.stroke();
    const spacing = (x1 - x0) / N_COILS;
    const dxm = ROPE_M / N_COILS;
    // visual displacement scale: full amplitude ≈ 0.95 coil spacing, reduced for short λ so coils never cross
    const visScale = (spacing * 0.95 / A_MAX_CM) * Math.min(1, 0.6 / Math.max(1e-6, k * dxm));
    ctx.lineWidth = clamp(W * 0.003, 1.5, 3);
    let prevX = null;
    for (let i = 0; i <= N_COILS; i++) {
      const xm = dxm * i;
      const px = x0 + xm * ppm + xiSpring(xm, t) * visScale;
      const isMark = i === Math.round(xmMark / dxm);
      ctx.strokeStyle = isMark ? '#ef4444' : '#a5b4fc';
      ctx.lineWidth = isMark ? clamp(W * 0.005, 3, 5) : clamp(W * 0.003, 1.5, 3);
      ctx.beginPath(); ctx.moveTo(px, yL - coilH / 2); ctx.lineTo(px, yL + coilH / 2); ctx.stroke();
      if (prevX != null) {
        ctx.strokeStyle = '#6366f1'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(prevX, yL - coilH / 2); ctx.lineTo(px, yL + coilH / 2); ctx.stroke();
      }
      prevX = px;
    }
    // source plunger
    const xs = x0 + xiSpring(0, t) * visScale;
    ctx.fillStyle = '#fde68a'; ctx.fillRect(xs - clamp(W * 0.012, 5, 10), yL - coilH / 2 - 4, clamp(W * 0.012, 5, 10), coilH + 8);
    // marker track
    ctx.strokeStyle = 'rgba(248,113,113,0.5)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(mx - params.A * visScale, yL + coilH / 2 + 6); ctx.lineTo(mx + params.A * visScale, yL + coilH / 2 + 6); ctx.stroke();
    // compression where k x - w t = π (+2πn): coils bunch; rarefaction where = 0 (+2πn)
    let xcomp = (Math.PI + phase0) / k;
    xcomp -= Math.floor((xcomp - 0.4) / lam) * lam;
    if (xcomp < 0.4) xcomp += lam;
    const xcomp2 = xcomp + lam, xrar = xcomp + lam / 2;
    ctx.font = font(fs * 0.9, true); ctx.textAlign = 'center';
    if (xcomp <= ROPE_M) { ctx.fillStyle = '#c7d2fe'; ctx.fillText(T('compression', 'rapatan'), x0 + xcomp * ppm, yL - coilH / 2 - fs * 0.6); }
    if (xrar <= ROPE_M) { ctx.fillStyle = '#c7d2fe'; ctx.fillText(T('rarefaction', 'renggangan'), x0 + xrar * ppm, yL - coilH / 2 - fs * 0.6); }
    if (xcomp2 <= ROPE_M) bracket(ctx, x0 + xcomp * ppm, x0 + xcomp2 * ppm, yL + coilH / 2 + fs * 1.6, '#f59e0b', `λ = ${lam.toFixed(2)} m`, fs, false);

    // ---------- Titles, readout ----------
    ctx.textAlign = 'left'; ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs, true);
    ctx.fillText(T('Transverse wave (rope)', 'Gelombang transversal (tali)'), x0, fs * 1.4);
    ctx.fillText(T('Longitudinal wave (spring)', 'Gelombang longitudinal (pegas)'), x0, yL - coilH / 2 - fs * 2.2);
    ctx.font = font(fs * 0.8); ctx.fillStyle = '#94a3b8';
    ctx.fillText(T('coil displacement exaggerated', 'pergeseran lilitan dibesar-besarkan'), x0 + fs * 15, yL - coilH / 2 - fs * 2.2);
    ctx.textAlign = 'right'; ctx.fillStyle = '#cbd5e1'; ctx.font = font(fs);
    ctx.fillText(`f = ${params.f.toFixed(2)} Hz   T = 1/f = ${period().toFixed(2)} s`, x1, fs * 1.4);
    ctx.fillText(`v = ${params.v.toFixed(2)} m/s   λ = v/f = ${lam.toFixed(2)} m`, x1, fs * 2.75);
    ctx.fillStyle = state.paused ? '#fbbf24' : '#64748b'; ctx.font = font(fs * 0.9, true);
    ctx.fillText(state.paused ? T('PAUSED', 'JEDA') : `t = ${t.toFixed(1)} s`, x1, yL - coilH / 2 - fs * 2.2);
    // direction of travel
    ctx.fillStyle = '#f59e0b'; ctx.font = font(fs * 0.9, true); ctx.textAlign = 'center';
    ctx.fillText(`v →  ${T('wave travels right', 'gelombang merambat ke kanan')}`, W / 2, H * 0.52 - fs * 0.2);
    // metre scale at the very bottom
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1; ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.8); ctx.textAlign = 'center';
    for (let m = 0; m <= ROPE_M; m++) {
      const px = x0 + m * ppm;
      ctx.beginPath(); ctx.moveTo(px, H - fs * 1.4); ctx.lineTo(px, H - fs * 1.0); ctx.stroke();
      ctx.fillText(`${m} m`, px, H - fs * 0.2);
    }
    ctx.beginPath(); ctx.moveTo(x0, H - fs * 1.4); ctx.lineTo(x1, H - fs * 1.4); ctx.stroke();

    // ---------- Ruler ----------
    const r = rulerPx();
    const dxM = Math.abs(r.bx - r.ax) / ppm;
    const dyCm = Math.abs(r.by - r.ay) / ampScale;
    ctx.strokeStyle = '#facc15'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(r.ax, r.ay); ctx.lineTo(r.bx, r.by); ctx.stroke();
    const hr = clamp(W * 0.012, 6, 10);
    for (const [hx, hy] of [[r.ax, r.ay], [r.bx, r.by]]) {
      ctx.fillStyle = '#facc15'; ctx.strokeStyle = '#0b1220'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(hx, hy, hr, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    }
    ctx.fillStyle = '#fef08a'; ctx.font = font(fs * 0.9, true); ctx.textAlign = 'center';
    const lblY = Math.min(r.ay, r.by) - fs * 0.8;
    ctx.fillText(`${T('ruler', 'penggaris')}: Δx = ${dxM.toFixed(2)} m, Δy = ${dyCm.toFixed(1)} cm`, (r.ax + r.bx) / 2, lblY < fs ? Math.max(r.ay, r.by) + fs * 1.4 : lblY);
    ctx.textAlign = 'left';
  }

  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) {
      const r = rulerPx(); const rad = Math.max(16, cv.width * 0.025);
      if (Math.hypot(x - r.bx, y - r.by) < rad) return 'rB';
      if (Math.hypot(x - r.ax, y - r.ay) < rad) return 'rA';
      return null;
    },
    onDrag(id, x, y) {
      ensureRuler();
      const g = geom();
      const fx = clamp(x / g.W, 0.01, 0.99), fy = clamp(y / g.H, 0.03, 0.97);
      if (id === 'rA') { state.ruler.ax = fx; state.ruler.ay = fy; } else { state.ruler.bx = fx; state.ruler.by = fy; }
    },
    handles: () => { const r = rulerPx(); return [{ id: 'rA', x: r.ax, y: r.ay, label: 'Ruler end A' }, { id: 'rB', x: r.bx, y: r.by, label: 'Ruler end B' }]; },
    cursor: 'default', hoverCursor: 'grab',
  });

  // Controls
  const ampS = slider({ label: 'Amplitude A (cm)', key: 'amplitude', min: 2, max: A_MAX_CM, step: 1, value: params.A, format: (v) => v.toFixed(0), onInput: (v) => { params.A = v; } });
  const freqS = slider({ label: 'Frequency f (Hz)', key: 'frequency', min: 0.25, max: 2, step: 0.05, value: params.f, format: (v) => v.toFixed(2), onInput: (v) => { params.f = v; } });
  const speedS = slider({ label: 'Wave speed v (m/s)', key: 'speed', min: 0.5, max: 4, step: 0.1, value: params.v, format: (v) => v.toFixed(1), onInput: (v) => { params.v = v; } });
  const pauseB = button({ label: 'Pause / Play', primary: true, onClick: () => { state.paused = !state.paused; } });
  const stepB = button({ label: 'Step +T/8', onClick: () => { state.paused = true; state.t += period() / 8; } });
  const rulerB = button({ label: 'Reset ruler', onClick: () => { state.ruler = null; } });
  ctrlPanel.append(ampS.el, freqS.el, speedS.el, row(pauseB, stepB, rulerB));

  const lab = labPanel({
    title: 'Wave lab — v = fλ',
    filename: 'wave-anatomy-data.csv',
    columns: [
      { key: 'A', label: 'A (cm)', format: (v) => v.toFixed(0) },
      { key: 'f', label: 'f (Hz)', format: (v) => v.toFixed(2) },
      { key: 'v', label: 'v (m/s)', format: (v) => v.toFixed(2) },
      { key: 'T', label: 'T = 1/f (s)', format: (v) => v.toFixed(2) },
      { key: 'lambda', label: 'λ = v/f (m)', format: (v) => v.toFixed(2) },
      { key: 'ruler', label: 'Ruler Δx (m)', format: (v) => v.toFixed(2) },
    ],
    procedure: [
      'Set v = 2.0 m/s and f = 1.00 Hz. Pause, put the ruler ends on two neighbouring crests, and record.',
      'Keep v = 2.0 m/s and record at f = 0.50, 1.50 and 2.00 Hz, measuring λ with the ruler each time.',
      'Keep f = 1.00 Hz and record at v = 1.0, 3.0 and 4.0 m/s.',
      'Compare the "Ruler Δx" and "λ = v/f" columns. Then plot λ against 1/f for the fixed-speed rows.',
      'Change only the amplitude and record twice. Did λ or T change?',
    ],
    predict: 'If the frequency doubles while the speed stays the same, what happens to the wavelength? What happens to the period?',
    source: () => {
      const r = rulerPx();
      return { A: params.A, f: params.f, v: params.v, T: period(), lambda: lambda(), ruler: Math.abs(r.bx - r.ax) / r.g.ppm };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
