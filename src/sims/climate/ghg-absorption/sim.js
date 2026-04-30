import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, row } from '../../../lib/controls.js';
import { hoverProbe, drawCrosshair } from '../../../lib/chart.js';

// Each gas: array of absorption bands {center µm, width µm, peak strength}
const GASES = {
  H2O: { name: 'Water vapor', color: '#0ea5e9', bands: [
    { c: 6.3,  w: 1.5, p: 0.85 },
    { c: 22, w: 12, p: 0.75 },
    { c: 50, w: 30, p: 0.85 },
  ] },
  CO2: { name: 'Carbon dioxide', color: '#fbbf24', bands: [
    { c: 4.3,  w: 0.4, p: 0.95 },
    { c: 15,   w: 2.5, p: 0.95 },
  ] },
  CH4: { name: 'Methane', color: '#10b981', bands: [
    { c: 7.7,  w: 0.5, p: 0.7 },
    { c: 3.3,  w: 0.3, p: 0.5 },
  ] },
  N2O: { name: 'Nitrous oxide', color: '#a855f7', bands: [
    { c: 7.8,  w: 0.4, p: 0.6 },
    { c: 4.5,  w: 0.4, p: 0.6 },
  ] },
  O3:  { name: 'Ozone', color: '#ec4899', bands: [
    { c: 9.6,  w: 0.5, p: 0.7 },
  ] },
};

function planck(lambda_um, T) {
  // Planck radiance, simplified scale; lambda in µm
  const h = 6.626e-34, k = 1.381e-23, c0 = 3e8;
  const lambda = lambda_um * 1e-6;
  const num = 2 * h * c0 * c0 / Math.pow(lambda, 5);
  const exp = Math.exp(h * c0 / (lambda * k * T)) - 1;
  return num / exp;
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    enabled: { H2O: true, CO2: true, CH4: true, N2O: true, O3: true },
    scale: { H2O: 1, CO2: 1, CH4: 1, N2O: 1, O3: 1 },   // multiplier on absorption strength
    T: 288,
  };

  let chart = null;

  function absorptionAt(lambda) {
    let blocked = 0;
    for (const [k, g] of Object.entries(GASES)) {
      if (!params.enabled[k]) continue;
      const s = params.scale[k];
      for (const b of g.bands) {
        const x = (lambda - b.c) / b.w;
        blocked += b.p * s * Math.exp(-x * x);
      }
    }
    return Math.min(1, blocked);
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 60, padY = 50;
    const w = W - padX - 30, h = H - padY - 80;
    chart = { x: padX, y: padY, w, h };
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(padX, padY, w, h);

    const lMin = 4, lMax = 70;
    const x2 = (l) => padX + ((l - lMin) / (lMax - lMin)) * w;
    // Planck values; normalize to peak.
    let peakPlanck = 0;
    for (let i = 0; i <= 200; i++) {
      const l = lMin + (i / 200) * (lMax - lMin);
      const v = planck(l, params.T);
      if (v > peakPlanck) peakPlanck = v;
    }
    const y2 = (frac) => padY + h - frac * (h - 16) - 8;

    // Reference: Earth blackbody emission (288 K)
    ctx.strokeStyle = 'rgba(120,130,150,0.5)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    for (let i = 0; i <= 300; i++) {
      const l = lMin + (i / 300) * (lMax - lMin);
      const v = planck(l, params.T) / peakPlanck;
      const sx = x2(l), sy = y2(v);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Transmitted = Planck × (1 − absorption)
    ctx.fillStyle = 'rgba(251,191,36,0.18)';
    ctx.beginPath();
    ctx.moveTo(x2(lMin), y2(0));
    for (let i = 0; i <= 300; i++) {
      const l = lMin + (i / 300) * (lMax - lMin);
      const v = planck(l, params.T) / peakPlanck;
      const trans = v * (1 - absorptionAt(l));
      ctx.lineTo(x2(l), y2(trans));
    }
    ctx.lineTo(x2(lMax), y2(0));
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= 300; i++) {
      const l = lMin + (i / 300) * (lMax - lMin);
      const v = planck(l, params.T) / peakPlanck;
      const trans = v * (1 - absorptionAt(l));
      const sx = x2(l), sy = y2(trans);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // Each gas's absorption band shaded
    for (const [k, g] of Object.entries(GASES)) {
      if (!params.enabled[k]) continue;
      ctx.fillStyle = g.color + '33';
      for (const b of g.bands) {
        ctx.fillRect(x2(b.c - b.w), padY, x2(b.c + b.w) - x2(b.c - b.w), h);
      }
    }

    // Axis ticks
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '10px var(--font-mono)';
    for (const l of [4, 8, 12, 16, 20, 30, 50, 70]) {
      ctx.fillText(`${l}µm`, x2(l) - 12, padY + h + 14);
    }
    ctx.fillText('Earth IR emission (288K) ➝ green = transmitted to space, shaded = absorbed', padX, padY - 6);

    // Legend
    let lx = padX, ly = padY + h + 36;
    ctx.font = '11px var(--font-mono)';
    for (const [k, g] of Object.entries(GASES)) {
      ctx.fillStyle = params.enabled[k] ? g.color : 'rgba(120,130,150,0.4)';
      ctx.fillRect(lx, ly - 8, 14, 8);
      ctx.fillStyle = '#fff';
      ctx.fillText(`${g.name}`, lx + 20, ly);
      lx += 130;
    }

    // Hover crosshair
    const probe = hover.get();
    if (probe) drawCrosshair(ctx, probe, { bounds: chart, color: '#fbbf24', label: probe.label });
  }

  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    if (!chart) return null;
    const { x, y, w, h } = chart;
    if (sx < x || sx > x + w || sy < y || sy > y + h) return null;
    const l = 4 + ((sx - x) / w) * 66;
    const a = absorptionAt(l);
    return { x: sx, y: sy, label: [`λ = ${l.toFixed(2)} µm`, `absorption = ${(a * 100).toFixed(0)}%`] };
  });

  // controls
  const TS = slider({ label: 'Surface T (K)', min: 220, max: 320, step: 1, value: params.T,
    onInput: (v) => { params.T = v; } });
  ctrlPanel.appendChild(TS.el);
  for (const [k, g] of Object.entries(GASES)) {
    const onT = toggle({ label: `${g.name} on`, value: params.enabled[k], onChange: (v) => { params.enabled[k] = v; } });
    const sS = slider({ label: `${g.name} amount`, min: 0, max: 3, step: 0.05, value: params.scale[k], format: (v) => v.toFixed(2),
      onInput: (v) => { params.scale[k] = v; } });
    ctrlPanel.append(onT.el, sS.el);
  }

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); hover.destroy(); cv.destroy(); };
}
