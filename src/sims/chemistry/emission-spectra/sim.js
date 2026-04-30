import { createCanvas, loop } from '../../../lib/canvas.js';
import { select, button, row } from '../../../lib/controls.js';
import { hoverProbe, drawTooltip } from '../../../lib/chart.js';

// Spectral lines (wavelength nm, relative intensity 0..1)
const SPECTRA = {
  hydrogen: { name: 'Hydrogen (H)', lines: [
    { l: 656.3, I: 1.0, label: 'Hα' }, { l: 486.1, I: 0.7, label: 'Hβ' },
    { l: 434.0, I: 0.5, label: 'Hγ' }, { l: 410.2, I: 0.3, label: 'Hδ' },
  ] },
  helium: { name: 'Helium (He)', lines: [
    { l: 587.6, I: 1.0 }, { l: 667.8, I: 0.6 }, { l: 501.6, I: 0.5 },
    { l: 471.3, I: 0.4 }, { l: 447.1, I: 0.4 }, { l: 706.5, I: 0.3 },
    { l: 388.9, I: 0.5 },
  ] },
  neon: { name: 'Neon (Ne)', lines: [
    { l: 640.2, I: 1.0 }, { l: 614.3, I: 0.9 }, { l: 585.2, I: 0.8 },
    { l: 633.4, I: 0.7 }, { l: 692.9, I: 0.6 }, { l: 540.1, I: 0.4 },
    { l: 503.1, I: 0.3 },
  ] },
  sodium: { name: 'Sodium (Na)', lines: [
    { l: 589.0, I: 1.0, label: 'D₂' }, { l: 589.6, I: 0.95, label: 'D₁' },
    { l: 568.8, I: 0.4 }, { l: 819.5, I: 0.5 }, { l: 818.3, I: 0.5 },
  ] },
  mercury: { name: 'Mercury (Hg)', lines: [
    { l: 546.1, I: 1.0, label: 'green' }, { l: 435.8, I: 0.9, label: 'blue' },
    { l: 404.7, I: 0.7, label: 'violet' }, { l: 577.0, I: 0.5, label: 'yellow' },
    { l: 579.0, I: 0.5 }, { l: 365.0, I: 0.6, label: 'UV' },
    { l: 253.7, I: 0.7, label: 'UV-C' },
  ] },
};

function wlColor(wl) {
  if (wl < 380) return '#a855f7';
  if (wl > 780) return '#7f1d1d';
  if (wl < 440) return '#a78bfa';
  if (wl < 490) return '#3b82f6';
  if (wl < 510) return '#06b6d4';
  if (wl < 580) return '#10b981';
  if (wl < 645) return '#fbbf24';
  return '#ef4444';
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { elementKey: 'hydrogen' };

  let chart = null;

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 40, padY = 80;
    const w = W - padX * 2, h = 200;
    chart = { x: padX, y: padY, w, h, lMin: 200, lMax: 800 };

    // Visible-spectrum gradient background
    for (let i = 0; i <= 200; i++) {
      const wl = chart.lMin + (i / 200) * (chart.lMax - chart.lMin);
      ctx.fillStyle = wlColor(wl);
      ctx.globalAlpha = 0.15;
      ctx.fillRect(padX + (i / 200) * w, padY, w / 200 + 1, h);
    }
    ctx.globalAlpha = 1;
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(padX, padY, w, h);

    const spec = SPECTRA[params.elementKey];
    // Spectral lines
    for (const ln of spec.lines) {
      if (ln.l < chart.lMin || ln.l > chart.lMax) continue;
      const px = padX + (ln.l - chart.lMin) / (chart.lMax - chart.lMin) * w;
      const lh = h * (0.3 + ln.I * 0.65);
      ctx.fillStyle = wlColor(ln.l);
      ctx.globalAlpha = 0.85;
      ctx.fillRect(px - 1.5, padY + (h - lh) / 2, 3, lh);
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#fff';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`${ln.l.toFixed(1)}`, px - 16, padY + h + 14);
      if (ln.label) ctx.fillText(ln.label, px - 8, padY - 6);
    }

    // Wavelength axis
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '10px var(--font-mono)';
    for (let l = 200; l <= 800; l += 100) {
      const px = padX + (l - chart.lMin) / (chart.lMax - chart.lMin) * w;
      ctx.fillText(`${l}`, px - 10, padY + h + 30);
    }
    ctx.fillText('UV ←  visible →  IR (wavelength nm)', padX + w / 2 - 80, padY + h + 46);

    // Header
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 380, 50);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px var(--font-sans)';
    ctx.fillText(spec.name, 16, 32);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`${spec.lines.length} prominent lines · hover for nm reading`, 16, 50);

    // Hover tooltip
    const probe = hover.get();
    if (probe) drawTooltip(ctx, probe.label, probe.x, probe.y);
  }

  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    if (!chart) return null;
    if (sx < chart.x || sx > chart.x + chart.w || sy < chart.y || sy > chart.y + chart.h) return null;
    const l = chart.lMin + ((sx - chart.x) / chart.w) * (chart.lMax - chart.lMin);
    const spec = SPECTRA[params.elementKey];
    let nearest = null, bestD = Infinity;
    for (const ln of spec.lines) {
      const d = Math.abs(ln.l - l);
      if (d < bestD) { bestD = d; nearest = ln; }
    }
    const lines = [`λ = ${l.toFixed(1)} nm`];
    if (nearest && bestD < 8) lines.push(`nearest line: ${nearest.l.toFixed(2)} nm${nearest.label ? ' (' + nearest.label + ')' : ''}`);
    return { x: sx, y: sy, label: lines };
  });

  // controls
  const elSel = select({
    label: 'Element',
    options: Object.entries(SPECTRA).map(([k, v]) => ({ value: k, label: v.name })),
    value: params.elementKey,
    onChange: (v) => { params.elementKey = v; },
  });
  ctrlPanel.appendChild(elSel.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); hover.destroy(); cv.destroy(); };
}
