import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';
import { hoverProbe, drawCrosshair } from '../../../lib/chart.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';

// Sample absorbance spectra — each sample has a peak at λ_max with width.
const SAMPLES = {
  cuso4:    { name: 'Copper(II) sulfate', peak: 800, sigma: 80,  baseColor: '#22d3ee' },
  kmno4:    { name: 'Potassium permanganate', peak: 525, sigma: 25, baseColor: '#a855f7' },
  beta:     { name: 'β-carotene', peak: 450, sigma: 35, baseColor: '#f59e0b' },
  chloro:   { name: 'Chlorophyll a', peak: 660, sigma: 25, baseColor: '#10b981' },
  food:     { name: 'Red food dye', peak: 510, sigma: 30, baseColor: '#ef4444' },
};

function molarAbsorptivity(sample, wl) {
  // Gaussian-shaped ε(λ), peak ε ~ 5000 L mol-1 cm-1
  return 5000 * Math.exp(-((wl - sample.peak) ** 2) / (2 * sample.sigma * sample.sigma));
}

function wlColor(wl) {
  let r = 0, g = 0, b = 0;
  if (wl >= 380 && wl < 440) { r = -(wl - 440) / 60; b = 1; }
  else if (wl < 490) { g = (wl - 440) / 50; b = 1; }
  else if (wl < 510) { g = 1; b = -(wl - 510) / 20; }
  else if (wl < 580) { r = (wl - 510) / 70; g = 1; }
  else if (wl < 645) { r = 1; g = -(wl - 645) / 65; }
  else if (wl <= 780) { r = 1; }
  return `rgb(${(r*255)|0},${(g*255)|0},${(b*255)|0})`;
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  let chartRect = null;

  const params = {
    sample: 'kmno4',
    wavelength: 525,    // nm
    concentration: 0.001, // M
    pathLength: 1.0,    // cm
  };

  function compute() {
    const sample = SAMPLES[params.sample];
    const eps = molarAbsorptivity(sample, params.wavelength);
    const A = eps * params.concentration * params.pathLength;
    const T = Math.pow(10, -A); // transmittance
    return { A, T, eps };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    const r = compute();
    const sample = SAMPLES[params.sample];

    // Apparatus on top half: lamp → cuvette → detector → readouts
    const appY = 50;
    const appH = 80;
    const lampX = 80, cuvX = 220, cuvW = 200;
    const detX = cuvX + cuvW + 30;

    // light beam
    const beamColor = wlColor(params.wavelength);
    ctx.fillStyle = beamColor;
    ctx.globalAlpha = 1;
    ctx.fillRect(lampX + 30, appY + appH / 2 - 8, cuvX - lampX - 30, 16);
    // dim through cuvette
    ctx.globalAlpha = r.T;
    ctx.fillRect(cuvX + cuvW, appY + appH / 2 - 8, detX - cuvX - cuvW, 16);
    ctx.globalAlpha = 1;

    // cuvette
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.strokeRect(cuvX, appY, cuvW, appH);
    // colored solution: invert wavelength color (visible color is what isn't absorbed)
    ctx.fillStyle = sample.baseColor;
    ctx.globalAlpha = Math.min(0.9, params.concentration * 30 + 0.2);
    ctx.fillRect(cuvX + 2, appY + 2, cuvW - 4, appH - 4);
    ctx.globalAlpha = 1;

    // path-length indicator
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText(`L = ${params.pathLength.toFixed(2)} cm`, cuvX + 8, appY - 6);

    // lamp icon
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.arc(lampX, appY + appH / 2, 18, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.fillText('Lamp', lampX - 14, appY - 6);

    // detector
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(detX, appY, 40, appH);
    ctx.strokeStyle = '#10b981';
    ctx.strokeRect(detX, appY, 40, appH);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(detX + 6, appY + appH - 8 - r.T * (appH - 16), 28, r.T * (appH - 16));

    ctx.fillStyle = '#fff';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Detector', detX - 8, appY - 6);
    ctx.fillText(`I/I₀ = ${(r.T * 100).toFixed(1)}%`, detX - 8, appY + appH + 16);

    // Spectrum plot below
    const sx = 60, sy = appY + appH + 60, sw = W - 90, sh = H - sy - 30;
    chartRect = { x: sx, y: sy, w: sw, h: sh };
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(sx, sy, sw, sh);
    // Gradient: full visible range
    for (let wl = 380; wl < 780; wl += 2) {
      const xx = sx + ((wl - 380) / 400) * sw;
      ctx.fillStyle = wlColor(wl);
      ctx.globalAlpha = 0.3;
      ctx.fillRect(xx, sy, (sw / 200), sh);
    }
    ctx.globalAlpha = 1;

    // absorbance curve
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let wl = 380; wl <= 780; wl += 2) {
      const eps = molarAbsorptivity(sample, wl);
      const A = eps * params.concentration * params.pathLength;
      const xx = sx + ((wl - 380) / 400) * sw;
      const yy = sy + sh - Math.min(A, 3) / 3 * sh;
      if (wl === 380) ctx.moveTo(xx, yy);
      else ctx.lineTo(xx, yy);
    }
    ctx.stroke();

    // current wavelength marker
    const cwx = sx + ((params.wavelength - 380) / 400) * sw;
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cwx, sy); ctx.lineTo(cwx, sy + sh); ctx.stroke();

    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Absorbance vs λ', sx, sy - 6);
    ctx.fillText('λ (nm)', sx + sw - 60, sy + sh + 14);

    // readout
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 280, 36);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(`A = ε × c × L = ${r.A.toFixed(3)}`, 16, 26);
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`ε(${params.wavelength}) = ${r.eps.toFixed(0)} M⁻¹cm⁻¹`, 16, 40);

    const probe = hover.get();
    if (probe) drawCrosshair(ctx, probe, { bounds: { x: sx, y: sy, w: sw, h: sh }, color: '#fbbf24', label: probe.label });
  }

  // controls
  const samSel = select({
    label: 'Sample',
    options: Object.entries(SAMPLES).map(([k, v]) => ({ value: k, label: v.name })),
    value: params.sample,
    onChange: (v) => { params.sample = v; },
  });
  const wlS = slider({
    label: 'Wavelength (nm)', min: 380, max: 780, step: 1, value: params.wavelength,
    onInput: (v) => { params.wavelength = v; },
  });
  const cS = slider({
    label: 'Concentration (M)', min: 0, max: 0.005, step: 0.0001, value: params.concentration, format: (v) => v.toFixed(4),
    onInput: (v) => { params.concentration = v; },
  });
  const lS = slider({
    label: 'Path length (cm)', min: 0.1, max: 5, step: 0.05, value: params.pathLength, format: (v) => v.toFixed(2),
    onInput: (v) => { params.pathLength = v; },
  });
  const peakB = button({ label: 'Tune to λ_max', primary: true, onClick: () => {
    params.wavelength = SAMPLES[params.sample].peak;
    wlS.value = params.wavelength;
  } });

  ctrlPanel.append(samSel.el, wlS.el, cS.el, lS.el, row(peakB));

  // Lab — verify A = ε·c·L is linear in c at fixed λ_max.
  const lab = labPanel({
    title: 'Beer-Lambert lab — A vs concentration',
    filename: 'beer-lambert-lab.csv',
    columns: [
      { key: 'sample', label: 'sample' },
      { key: 'wl',     label: 'λ (nm)',     format: (v) => v.toFixed(0) },
      { key: 'c',      label: 'c (M)',      format: (v) => v.toFixed(4) },
      { key: 'L',      label: 'L (cm)',     format: (v) => v.toFixed(2) },
      { key: 'eps',    label: 'ε (M⁻¹cm⁻¹)', format: (v) => v.toFixed(0) },
      { key: 'A',      label: 'absorbance', format: (v) => v.toFixed(3) },
      { key: 'T',      label: 'T = 10⁻ᴬ',   format: (v) => v.toFixed(3) },
    ],
    procedure: [
      'Pick KMnO₄, click "Tune to λ_max". Set L = 1 cm. Sweep c: 0.0005, 0.001, 0.002, 0.003 M. Record.',
      'Verify A is linear in c — that\'s Beer\'s law.',
      'Now hold c fixed and vary L: 0.5, 1, 2, 3 cm. A should also be linear in L (Lambert).',
      'Off the absorption peak (e.g. 600 nm for KMnO₄), A is much smaller — ε depends on λ.',
      'From any row: solve for ε = A / (c·L). All your rows should give the same ε.',
    ],
    predict: 'A 1.0 cm cell of CuSO₄ (ε = 5000 at 800 nm) reads A = 0.5. What is the concentration?',
    source: () => {
      const r = compute();
      return {
        sample: SAMPLES[params.sample].name,
        wl: params.wavelength,
        c: params.concentration,
        L: params.pathLength,
        eps: r.eps,
        A: r.A,
        T: r.T,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  // Hover any wavelength on the spectrum chart for an A and ε readout.
  const hover = hoverProbe(cv.canvas, (sxh, syh) => {
    if (!chartRect) return null;
    const { x, y, w, h } = chartRect;
    if (sxh < x || sxh > x + w || syh < y || syh > y + h) return null;
    const wl = 380 + ((sxh - x) / w) * 400;
    const sample = SAMPLES[params.sample];
    const eps = molarAbsorptivity(sample, wl);
    const A = eps * params.concentration * params.pathLength;
    return {
      x: sxh,
      y: y + h - Math.min(A, 3) / 3 * h,
      label: [
        `λ = ${wl.toFixed(0)} nm`,
        `A = ${A.toFixed(3)}`,
        `ε = ${eps.toFixed(0)}`,
      ],
    };
  });
  // Drag horizontally on the spectrum chart to set the working wavelength.
  const drag = dragHandle(cv.canvas, {
    hitTest(sxh, syh) {
      if (!chartRect) return null;
      const { x, y, w, h } = chartRect;
      return (sxh >= x && sxh <= x + w && syh >= y && syh <= y + h) ? 'wl' : null;
    },
    onDrag(_id, sxh) {
      if (!chartRect) return;
      const wl = Math.max(380, Math.min(780, 380 + ((sxh - chartRect.x) / chartRect.w) * 400));
      params.wavelength = Math.round(wl);
      wlS.value = params.wavelength;
    },
    cursor: 'crosshair',
    hoverCursor: 'ew-resize',
  });

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); hover.destroy(); drag.destroy(); cv.destroy(); };
}
