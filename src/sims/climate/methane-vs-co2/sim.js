import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { hoverProbe, drawCrosshair } from '../../../lib/chart.js';

// Pulse-response simplification:
//   methane: instantaneous radiative efficiency 95× CO₂ (per kg), exponential decay τ = 12 yr.
//   CO₂: ~50% remains after 100 years. Use Bern-style tri-exponential: 0.21 perm + 0.26·e^(-t/172) + 0.34·e^(-t/18) + 0.19·e^(-t/2).
const methaneTau = 12; // years
const ch4Eff = 95; // radiative efficiency multiplier

function ch4Conc(t) { return Math.exp(-t / methaneTau); }
function co2Conc(t) {
  return 0.21 + 0.26 * Math.exp(-t / 172) + 0.34 * Math.exp(-t / 18) + 0.19 * Math.exp(-t / 2);
}
function ch4Forcing(t) { return ch4Eff * ch4Conc(t); }
function co2Forcing(t) { return 1 * co2Conc(t); }

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { horizon: 100 };
  let chart = null;

  function gwp(horizon) {
    // Integrate forcings 0..horizon
    const N = 1000;
    let ch4 = 0, co2 = 0;
    for (let i = 0; i < N; i++) {
      const t = (i + 0.5) / N * horizon;
      ch4 += ch4Forcing(t) * (horizon / N);
      co2 += co2Forcing(t) * (horizon / N);
    }
    return ch4 / co2;
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

    const Hmax = params.horizon;
    const x2 = (t) => padX + (t / Hmax) * w;
    const Fmax = ch4Eff;
    const y2 = (F) => padY + h - (F / Fmax) * (h - 16) - 8;

    // Shaded areas (forcing × time)
    function area(fn, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(x2(0), y2(0));
      for (let i = 0; i <= 200; i++) {
        const t = (i / 200) * Hmax;
        ctx.lineTo(x2(t), y2(fn(t)));
      }
      ctx.lineTo(x2(Hmax), y2(0));
      ctx.closePath();
      ctx.fill();
    }
    area(ch4Forcing, 'rgba(16,185,129,0.4)');
    area(co2Forcing, 'rgba(251,191,36,0.4)');

    // Outlines
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 300; i++) {
      const t = (i / 300) * Hmax;
      const sx = x2(t), sy = y2(ch4Forcing(t));
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();
    ctx.strokeStyle = '#fbbf24';
    ctx.beginPath();
    for (let i = 0; i <= 300; i++) {
      const t = (i / 300) * Hmax;
      const sx = x2(t), sy = y2(co2Forcing(t));
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // Axis labels
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '10px var(--font-mono)';
    for (let p = 0; p <= 5; p++) {
      const t = p / 5 * Hmax;
      ctx.fillText(`${t.toFixed(0)}y`, x2(t) - 10, padY + h + 14);
    }

    // Header
    const g = gwp(params.horizon);
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 380, 70);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-mono)';
    ctx.fillText(`Horizon: ${params.horizon} years`, 16, 28);
    ctx.fillStyle = '#10b981';
    ctx.fillText(`GWP_CH₄ over ${params.horizon}y ≈ ${g.toFixed(0)}× CO₂`, 16, 48);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`Equal-mass pulses · y-axis: instantaneous radiative forcing (CO₂ unit = 1)`, 16, 64);

    // Legend
    let lx = padX + w - 200, ly = padY + 16;
    ctx.fillStyle = '#10b981';
    ctx.fillRect(lx, ly - 6, 14, 4);
    ctx.fillStyle = '#fff';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('CH₄ pulse', lx + 20, ly);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(lx, ly + 12, 14, 4);
    ctx.fillStyle = '#fff';
    ctx.fillText('CO₂ pulse', lx + 20, ly + 18);

    const probe = hover.get();
    if (probe) drawCrosshair(ctx, probe, { bounds: chart, color: '#fbbf24', label: probe.label });
  }

  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    if (!chart) return null;
    const { x, y, w, h } = chart;
    if (sx < x || sx > x + w || sy < y || sy > y + h) return null;
    const t = ((sx - x) / w) * params.horizon;
    return { x: sx, y: sy, label: [`t = ${t.toFixed(1)} y`, `CH₄ forcing = ${ch4Forcing(t).toFixed(2)}`, `CO₂ forcing = ${co2Forcing(t).toFixed(3)}`] };
  });

  // controls
  const hS = slider({ label: 'Time horizon (years)', min: 5, max: 500, step: 5, value: params.horizon,
    onInput: (v) => { params.horizon = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [n, h] of [['20y', 20], ['100y', 100], ['500y', 500]]) {
    const b = button({ label: n, onClick: () => { params.horizon = h; hS.value = h; } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(hS.el, presetRow);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); hover.destroy(); cv.destroy(); };
}
