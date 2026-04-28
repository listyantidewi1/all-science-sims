import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { hoverProbe, drawCrosshair } from '../../../lib/chart.js';
import { dragHandle } from '../../../lib/handle.js';

// First-order low-pass: H(jω) = 1 / (1 + jωRC)
// |H| = 1 / sqrt(1 + (f/fc)²)
// phase = -atan(f/fc)

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    R: 1000,       // Ω
    C: 1e-6,       // F
    drive: 100,    // Hz, the test frequency
  };

  let bodeChart = null;
  let timeChart = null;

  const fMin = 1, fMax = 1e5;
  function fc() { return 1 / (2 * Math.PI * params.R * params.C); }
  function gainDB(f) { return 20 * Math.log10(1 / Math.sqrt(1 + (f / fc()) ** 2)); }
  function phaseDeg(f) { return -Math.atan(f / fc()) * 180 / Math.PI; }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Bode magnitude plot — top
    const padX = 50;
    const topY = 30, topH = (H - 80) * 0.6;
    bodeChart = { x: padX, y: topY, w: W - padX - 30, h: topH };
    drawBode(ctx, padX, topY, W - padX - 30, topH);

    // Time-domain wave below
    const tY = topY + topH + 30;
    const tH = H - tY - 30;
    timeChart = { x: padX, y: tY, w: W - padX - 30, h: tH };
    drawTime(ctx, padX, tY, W - padX - 30, tH);

    // Hover crosshair
    const probe = hover.get();
    if (probe) drawCrosshair(ctx, probe, { bounds: probe.bounds, color: '#fbbf24', label: probe.label });

    // Top-left readout
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 280, 56);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`f_c = 1/(2πRC) = ${fc().toFixed(1)} Hz`, 16, 28);
    ctx.font = '11px var(--font-mono)';
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.fillText(`R = ${params.R} Ω   C = ${(params.C * 1e6).toFixed(2)} µF`, 16, 46);
    ctx.fillText(`drive: ${params.drive} Hz   gain ${gainDB(params.drive).toFixed(1)} dB   phase ${phaseDeg(params.drive).toFixed(1)}°`, 16, 60);
  }

  function drawBode(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(x, y, w, h);
    const f2x = (f) => x + (Math.log10(f / fMin) / Math.log10(fMax / fMin)) * w;
    const dBmax = 5, dBmin = -50;
    const dB2y = (d) => y + h - ((d - dBmin) / (dBmax - dBmin)) * (h - 16) - 8;

    // gridlines
    ctx.strokeStyle = 'rgba(120,130,150,0.15)';
    for (let p = -50; p <= 0; p += 10) {
      ctx.beginPath(); ctx.moveTo(x, dB2y(p)); ctx.lineTo(x + w, dB2y(p)); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.85)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`${p}dB`, x + 4, dB2y(p) - 2);
    }
    for (let dec = 0; dec <= 5; dec++) {
      const f = Math.pow(10, dec);
      ctx.beginPath(); ctx.moveTo(f2x(f), y); ctx.lineTo(f2x(f), y + h); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.85)';
      ctx.fillText(`10^${dec}`, f2x(f) + 2, y + h - 4);
    }

    // f_c marker
    ctx.strokeStyle = 'rgba(251,191,36,0.6)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(f2x(fc()), y); ctx.lineTo(f2x(fc()), y + h);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#fbbf24';
    ctx.font = '10px var(--font-mono)';
    ctx.fillText(`f_c=${fc().toFixed(0)}Hz`, f2x(fc()) + 4, y + 14);

    // gain curve
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const f = fMin * Math.pow(fMax / fMin, i / 200);
      const sx = f2x(f), sy = dB2y(gainDB(f));
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // phase curve, plotted on the same axes (rescaled)
    const phase2y = (p) => y + h - ((p - (-90)) / 90) * (h - 16) - 8;
    ctx.strokeStyle = 'rgba(168,139,250,0.7)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const f = fMin * Math.pow(fMax / fMin, i / 200);
      const sx = f2x(f), sy = phase2y(phaseDeg(f));
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // current drive marker
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(f2x(params.drive), dB2y(gainDB(params.drive)), 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('Bode magnitude (green) and phase 0° → −90° (purple, dashed)', x + 6, y - 4);
    ctx.fillText('Drag horizontally to set drive frequency', x + w - 240, y - 4);
  }

  function drawTime(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(x, y, w, h);
    const cy = y + h / 2;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.beginPath();
    ctx.moveTo(x, cy); ctx.lineTo(x + w, cy);
    ctx.stroke();

    // Show 4 periods of drive frequency.
    const samples = 400;
    const periods = 4;
    const omega = 2 * Math.PI * params.drive;
    const G = 1 / Math.sqrt(1 + (params.drive / fc()) ** 2);
    const phi = -Math.atan(params.drive / fc());
    const amp = (h / 2 - 8);
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    for (let i = 0; i <= samples; i++) {
      const u = i / samples;
      const t = u * periods / params.drive;
      const sx = x + u * w;
      const sy = cy - Math.sin(omega * t) * amp;
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= samples; i++) {
      const u = i / samples;
      const t = u * periods / params.drive;
      const sx = x + u * w;
      const sy = cy - G * Math.sin(omega * t + phi) * amp;
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText(`Time response at f = ${params.drive} Hz`, x + 6, y - 4);
    ctx.fillStyle = '#0ea5e9';
    ctx.fillText('input', x + w - 100, y + 14);
    ctx.fillStyle = '#10b981';
    ctx.fillText('output', x + w - 50, y + 14);
  }

  // Hover anywhere on the Bode chart to read (f, gain, phase).
  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    if (!bodeChart) return null;
    const { x, y, w, h } = bodeChart;
    if (sx < x || sx > x + w || sy < y || sy > y + h) return null;
    const u = (sx - x) / w;
    const f = fMin * Math.pow(fMax / fMin, u);
    return {
      x: sx, y: sy, bounds: bodeChart,
      label: [`f = ${f.toFixed(1)} Hz`, `gain = ${gainDB(f).toFixed(2)} dB`, `phase = ${phaseDeg(f).toFixed(2)}°`],
    };
  });

  const drag = dragHandle(cv.canvas, {
    hitTest(sx, sy) {
      if (!bodeChart) return null;
      const { x, y, w, h } = bodeChart;
      return (sx >= x && sx <= x + w && sy >= y && sy <= y + h) ? 'drive' : null;
    },
    onDrag(_id, sx) {
      const u = (sx - bodeChart.x) / bodeChart.w;
      params.drive = Math.round(fMin * Math.pow(fMax / fMin, Math.max(0, Math.min(1, u))));
      driveS.value = params.drive;
    },
    cursor: 'crosshair',
    hoverCursor: 'ew-resize',
  });

  // controls
  const RS = slider({ label: 'R (Ω)', min: 100, max: 100000, step: 100, value: params.R,
    onInput: (v) => { params.R = v; } });
  const CS = slider({ label: 'C (µF)', min: 0.01, max: 100, step: 0.01, value: params.C * 1e6, format: (v) => v.toFixed(2),
    onInput: (v) => { params.C = v / 1e6; } });
  const driveS = slider({ label: 'Drive frequency (Hz)', min: 1, max: 100000, step: 1, value: params.drive,
    onInput: (v) => { params.drive = v; } });
  const tuneB = button({ label: 'Drive at f_c', primary: true, onClick: () => { params.drive = Math.round(fc()); driveS.value = params.drive; } });

  ctrlPanel.append(RS.el, CS.el, driveS.el, row(tuneB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); hover.destroy(); drag.destroy(); cv.destroy(); };
}
