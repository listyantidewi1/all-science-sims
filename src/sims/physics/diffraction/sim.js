import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, toggle } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    N: 2,                // number of slits
    slitWidth: 30,       // micrometers
    slitSep: 200,        // micrometers
    wavelength: 600,     // nm
    L: 1.0,              // distance to screen, m
    showWaves: true,
  };

  // Map wavelength (nm) to RGB approximation
  function wlColor(wl) {
    let r = 0, g = 0, b = 0;
    if (wl >= 380 && wl < 440) { r = -(wl - 440) / (440 - 380); b = 1; }
    else if (wl >= 440 && wl < 490) { g = (wl - 440) / 50; b = 1; }
    else if (wl >= 490 && wl < 510) { g = 1; b = -(wl - 510) / 20; }
    else if (wl >= 510 && wl < 580) { r = (wl - 510) / 70; g = 1; }
    else if (wl >= 580 && wl < 645) { r = 1; g = -(wl - 645) / 65; }
    else if (wl >= 645 && wl <= 780) { r = 1; }
    return `rgb(${(r*255)|0},${(g*255)|0},${(b*255)|0})`;
  }

  function intensity(theta) {
    // theta = angle from center to point on screen
    const d = params.slitSep * 1e-6;       // m
    const a = params.slitWidth * 1e-6;     // m
    const lam = params.wavelength * 1e-9;  // m
    const beta = (Math.PI * a * Math.sin(theta)) / lam;
    const alpha = (Math.PI * d * Math.sin(theta)) / lam;
    const single = Math.abs(beta) < 1e-9 ? 1 : (Math.sin(beta) / beta) ** 2;
    const N = params.N;
    let multi;
    if (N === 1) multi = 1;
    else {
      const denom = Math.sin(alpha);
      multi = Math.abs(denom) < 1e-9 ? N * N : (Math.sin(N * alpha) / denom) ** 2 / (N * N);
    }
    return single * multi;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // layout: source on left, slits middle-left, screen right
    const slitX = W * 0.4;
    const screenX = W - 30;
    const cy = H / 2;

    // light ray hint from source
    if (params.showWaves) {
      ctx.strokeStyle = `rgba(255,255,255,0.2)`;
      ctx.lineWidth = 1;
      for (let yy = -50; yy <= 50; yy += 8) {
        ctx.beginPath();
        ctx.moveTo(20, cy + yy * 0.3);
        ctx.lineTo(slitX, cy + yy * 0.3);
        ctx.stroke();
      }
    }

    // Slits: solid black wall with N gaps of slitWidth
    const slitVisualW = Math.max(2, params.slitWidth * 0.04);
    const slitVisualSep = Math.max(slitVisualW * 1.5, params.slitSep * 0.04);
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(slitX - 4, 0, 8, H);
    ctx.fillStyle = '#0b1220';
    for (let i = 0; i < params.N; i++) {
      const offset = (i - (params.N - 1) / 2) * slitVisualSep;
      ctx.fillRect(slitX - 4, cy + offset - slitVisualW / 2, 8, slitVisualW);
    }

    // Wave ripples from each slit
    if (params.showWaves) {
      ctx.strokeStyle = wlColor(params.wavelength);
      ctx.globalAlpha = 0.4;
      ctx.lineWidth = 1;
      const slitYs = [];
      for (let i = 0; i < params.N; i++) {
        slitYs.push(cy + (i - (params.N - 1) / 2) * slitVisualSep);
      }
      const t = Date.now() / 250;
      for (let r = 30; r < W * 0.8; r += 18) {
        for (const sy of slitYs) {
          ctx.beginPath();
          // half circle going right
          ctx.arc(slitX, sy, r + (t * 4) % 18, -Math.PI / 2, Math.PI / 2);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    }

    // Screen: vertical strip on right
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(screenX - 4, 0, 8, H);

    // Intensity profile drawn next to the screen
    const profileX = screenX - 200;
    ctx.strokeStyle = wlColor(params.wavelength);
    ctx.lineWidth = 2;
    ctx.beginPath();
    let maxI = 0;
    const samples = 300;
    const ys = [];
    const Is = [];
    for (let i = 0; i < samples; i++) {
      const yScreen = i / (samples - 1) * H;
      const dy = yScreen - cy;
      const theta = Math.atan(dy / (params.L * 800));
      const I = intensity(theta);
      ys.push(yScreen);
      Is.push(I);
      if (I > maxI) maxI = I;
    }
    for (let i = 0; i < samples; i++) {
      const x = profileX + (Is[i] / maxI) * 180;
      if (i === 0) ctx.moveTo(x, ys[i]);
      else ctx.lineTo(x, ys[i]);
    }
    ctx.stroke();

    // Bright pattern on the screen itself
    for (let i = 0; i < samples - 1; i++) {
      const yi = ys[i];
      const I = Is[i] / maxI;
      const c = wlColor(params.wavelength);
      ctx.fillStyle = c;
      ctx.globalAlpha = I;
      ctx.fillRect(screenX, yi, 30, ys[i + 1] - yi + 1);
    }
    ctx.globalAlpha = 1;

    // Header
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 280, 56);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(`${params.N} slit${params.N > 1 ? 's' : ''}    λ = ${params.wavelength} nm`, 16, 26);
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`slit width = ${params.slitWidth} µm    spacing = ${params.slitSep} µm`, 16, 42);
    if (params.N >= 2) {
      const fringeM = (params.wavelength * 1e-9 * params.L) / (params.slitSep * 1e-6);
      ctx.fillText(`fringe spacing ≈ ${(fringeM * 1000).toFixed(2)} mm at L=${params.L}m`, 16, 58);
    } else {
      ctx.fillText(`single-slit diffraction (sinc²)`, 16, 58);
    }
  }

  // controls
  const NS = slider({ label: 'Number of slits', min: 1, max: 8, step: 1, value: params.N,
    onInput: (v) => { params.N = v; } });
  const wS = slider({ label: 'Slit width (µm)', min: 5, max: 200, step: 1, value: params.slitWidth,
    onInput: (v) => { params.slitWidth = v; } });
  const sS = slider({ label: 'Slit separation (µm)', min: 50, max: 500, step: 5, value: params.slitSep,
    onInput: (v) => { params.slitSep = v; } });
  const lamS = slider({ label: 'Wavelength λ (nm)', min: 380, max: 780, step: 1, value: params.wavelength,
    onInput: (v) => { params.wavelength = v; } });
  const LS = slider({ label: 'Distance to screen L (m)', min: 0.3, max: 3, step: 0.05, value: params.L, format: (v) => v.toFixed(2),
    onInput: (v) => { params.L = v; } });
  const wT = toggle({ label: 'Show wave ripples', value: params.showWaves, onChange: (v) => { params.showWaves = v; } });

  ctrlPanel.append(NS.el, wS.el, sS.el, lamS.el, LS.el, wT.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
