import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { hoverProbe, drawCrosshair } from '../../../lib/chart.js';
import { dragHandle } from '../../../lib/handle.js';

// Surface-ocean pH and aragonite saturation Ω as a function of atmospheric CO2 (ppm).
// Empirical fit anchored on three points:
//   pre-industrial (280 ppm, pH 8.18, Ω 4.5)
//   today          (420 ppm, pH 8.07, Ω 3.4)
//   RCP 8.5 2100   (900 ppm, pH 7.75, Ω 1.5)
// Use simple log fits.

function pHFromCO2(ppm) {
  return 8.20 - 0.18 * Math.log2(Math.max(ppm, 50) / 280);
}
function omegaFromCO2(ppm) {
  return 4.7 * Math.pow(280 / Math.max(ppm, 50), 0.55);
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    co2: 420,
  };

  let chart = null;

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 60, padY = 50;
    const w = W - padX - 30, h = H - padY - 100;
    chart = { x: padX, y: padY, w, h };

    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(padX, padY, w, h);

    const cMin = 200, cMax = 1500;
    const x2 = (c) => padX + ((c - cMin) / (cMax - cMin)) * w;
    // pH on left axis 7.5..8.3
    const pHmin = 7.4, pHmax = 8.3;
    const y2pH = (ph) => padY + h - ((ph - pHmin) / (pHmax - pHmin)) * (h - 16) - 8;
    // Ω on right axis 0..6 (re-mapped onto same canvas)
    const omegaMin = 0, omegaMax = 6;
    const y2om = (om) => padY + h - ((om - omegaMin) / (omegaMax - omegaMin)) * (h - 16) - 8;

    // gridlines
    ctx.strokeStyle = 'rgba(120,130,150,0.15)';
    for (let c = 200; c <= 1500; c += 200) {
      ctx.beginPath(); ctx.moveTo(x2(c), padY); ctx.lineTo(x2(c), padY + h); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`${c}`, x2(c) - 12, padY + h + 14);
    }
    for (let p = 7.5; p <= 8.3; p += 0.1) {
      ctx.beginPath(); ctx.moveTo(padX, y2pH(p)); ctx.lineTo(padX + w, y2pH(p)); ctx.stroke();
      ctx.fillStyle = '#0ea5e9';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(p.toFixed(1), padX - 28, y2pH(p) + 3);
    }
    for (let om = 0; om <= 6; om += 1) {
      ctx.fillStyle = '#10b981';
      ctx.fillText(`Ω ${om}`, padX + w + 4, y2om(om) + 3);
    }

    // Ω = 1 critical threshold
    ctx.strokeStyle = 'rgba(239,68,68,0.6)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padX, y2om(1)); ctx.lineTo(padX + w, y2om(1));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 11px var(--font-mono)';
    ctx.fillText('Ω = 1: shells dissolve below this', padX + 6, y2om(1) - 4);

    // pH curve
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const c = cMin + (i / 200) * (cMax - cMin);
      const sx = x2(c), sy = y2pH(pHFromCO2(c));
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();
    // Ω curve
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const c = cMin + (i / 200) * (cMax - cMin);
      const sx = x2(c), sy = y2om(omegaFromCO2(c));
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // Reference points
    const REFS = [
      { c: 280, label: 'pre-ind.' },
      { c: 420, label: 'today' },
      { c: 900, label: 'RCP 8.5' },
    ];
    for (const r of REFS) {
      ctx.strokeStyle = 'rgba(120,130,150,0.6)';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(x2(r.c), padY); ctx.lineTo(x2(r.c), padY + h);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(120,130,150,0.85)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`${r.label}`, x2(r.c) + 3, padY + 12);
    }

    // Current marker on both curves
    ctx.fillStyle = '#0ea5e9';
    ctx.beginPath();
    ctx.arc(x2(params.co2), y2pH(pHFromCO2(params.co2)), 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(x2(params.co2), y2om(omegaFromCO2(params.co2)), 6, 0, Math.PI * 2);
    ctx.fill();

    // legend
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(padX + 8, padY + 8, 220, 60);
    ctx.fillStyle = '#0ea5e9';
    ctx.fillRect(padX + 16, padY + 22, 18, 3);
    ctx.fillStyle = '#fff';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText(`pH = ${pHFromCO2(params.co2).toFixed(2)}`, padX + 40, padY + 26);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(padX + 16, padY + 40, 18, 3);
    ctx.fillStyle = '#fff';
    ctx.fillText(`Ω = ${omegaFromCO2(params.co2).toFixed(2)}`, padX + 40, padY + 44);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '10px var(--font-mono)';
    ctx.fillText(`atmospheric CO₂ = ${params.co2.toFixed(0)} ppm`, padX + 40, padY + 60);

    // axis labels
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('Atmospheric CO₂ (ppm) →', padX + w - 160, padY + h + 30);

    // Hint
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag horizontally to set CO₂ · pH (left axis, blue) · Ω (right axis, green)', padX, H - 10);

    // Hover crosshair
    const probe = hover.get();
    if (probe) drawCrosshair(ctx, probe, { bounds: chart, color: '#fbbf24', label: probe.label });
  }

  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    if (!chart) return null;
    if (sx < chart.x || sx > chart.x + chart.w || sy < chart.y || sy > chart.y + chart.h) return null;
    const c = 200 + ((sx - chart.x) / chart.w) * 1300;
    return { x: sx, y: sy, label: [`CO₂ = ${c.toFixed(0)} ppm`, `pH = ${pHFromCO2(c).toFixed(3)}`, `Ω = ${omegaFromCO2(c).toFixed(2)}`] };
  });

  const drag = dragHandle(cv.canvas, {
    hitTest: (sx, sy) => chart && sx >= chart.x && sx <= chart.x + chart.w && sy >= chart.y && sy <= chart.y + chart.h ? 'co2' : null,
    onDrag(_id, sx) {
      params.co2 = Math.round(Math.max(200, Math.min(1500, 200 + ((sx - chart.x) / chart.w) * 1300)));
      cS.value = params.co2;
    },
    cursor: 'crosshair',
    hoverCursor: 'ew-resize',
  });

  // controls
  const cS = slider({ label: 'Atmospheric CO₂ (ppm)', min: 200, max: 1500, step: 1, value: params.co2,
    onInput: (v) => { params.co2 = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [n, c] of [['Pre-industrial', 280], ['Today', 420], ['RCP 4.5 2100', 540], ['RCP 8.5 2100', 900]]) {
    const b = button({ label: n, onClick: () => { params.co2 = c; cS.value = c; } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(cS.el, presetRow);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); hover.destroy(); drag.destroy(); cv.destroy(); };
}
