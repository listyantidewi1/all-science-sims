import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

// Phases of one cardiac cycle, fractions of total period:
//   0.00–0.50  filling (diastole)
//   0.50–0.55  isovolumetric contraction
//   0.55–0.80  ejection (systole)
//   0.80–0.85  isovolumetric relaxation
//   0.85–1.00  late filling

const PHASES = [
  { name: 'Filling',                start: 0.00, end: 0.50, color: '#0ea5e9' },
  { name: 'Isovolumetric contract', start: 0.50, end: 0.55, color: '#fbbf24' },
  { name: 'Ejection',               start: 0.55, end: 0.80, color: '#ef4444' },
  { name: 'Isovolumetric relax',    start: 0.80, end: 0.85, color: '#a855f7' },
  { name: 'Late filling',           start: 0.85, end: 1.00, color: '#0ea5e9' },
];

function phaseAt(phi) {
  for (const p of PHASES) if (phi >= p.start && phi < p.end) return p;
  return PHASES[PHASES.length - 1];
}

// Approximate ventricular pressure (mmHg) and volume (mL) over the cycle.
function pressure(phi, contractility = 1) {
  // Filling: low pressure rising slightly.
  if (phi < 0.5) return 5 + 5 * phi;
  // Isovolumetric contraction: rapid rise from 8 to ~80
  if (phi < 0.55) return 8 + (phi - 0.5) / 0.05 * (80 - 8) * contractility;
  // Ejection: peak at ~120, then drop to ~80
  if (phi < 0.80) {
    const u = (phi - 0.55) / 0.25;
    return (80 + 40 * Math.sin(u * Math.PI)) * contractility;
  }
  // Isovolumetric relaxation: drop from ~80 to ~10
  if (phi < 0.85) {
    const u = (phi - 0.80) / 0.05;
    return 80 * (1 - u) + 10 * u;
  }
  // Late filling
  return 5 + 5 * (phi - 0.85);
}
function volume(phi) {
  // Filling: 50 → 130 mL across 0..0.5
  if (phi < 0.5) return 50 + 80 * (phi / 0.5);
  // Iso-contract: stays at 130
  if (phi < 0.55) return 130;
  // Ejection: 130 → 50
  if (phi < 0.80) return 130 - 80 * ((phi - 0.55) / 0.25);
  // Iso-relax: 50
  if (phi < 0.85) return 50;
  // Late filling: 50 → 50 + small
  return 50 + 30 * ((phi - 0.85) / 0.15);
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    bpm: 70,
    contractility: 1,
    running: true,
  };
  let phi = 0;

  function step(dt) {
    if (!params.running) return;
    phi = (phi + dt * params.bpm / 60) % 1;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Heart schematic on the left
    drawHeart(ctx, 30, 30, W * 0.4, H - 60);
    // PV loop on the right
    drawPVLoop(ctx, W * 0.42 + 30, 30, W * 0.58 - 60, H - 60);

    // Header readout
    const p = phaseAt(phi);
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 50);
    ctx.fillStyle = p.color;
    ctx.font = 'bold 14px var(--font-mono)';
    ctx.fillText(`Phase: ${p.name}`, 16, 28);
    ctx.fillStyle = '#fff';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`P = ${pressure(phi, params.contractility).toFixed(0)} mmHg    V = ${volume(phi).toFixed(0)} mL`, 16, 46);
  }

  function drawHeart(ctx, x, y, w, h) {
    const cx = x + w / 2;
    const cy = y + h / 2;
    const v = volume(phi);
    const expansion = 0.5 + (v - 50) / 80 * 0.5; // 0.5..1.0
    // Heart silhouette
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(expansion, expansion);
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    const r = Math.min(w, h) * 0.28;
    ctx.moveTo(0, r * 0.4);
    ctx.bezierCurveTo(r * 1.3, -r * 0.4, r * 0.4, -r * 1.4, 0, -r * 0.5);
    ctx.bezierCurveTo(-r * 0.4, -r * 1.4, -r * 1.3, -r * 0.4, 0, r * 0.4);
    ctx.fill();
    ctx.restore();

    // Chambers indicator
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`Heart  ${params.bpm} bpm`, x + 10, y + 20);
    ctx.fillText(`vol ${v.toFixed(0)} mL`, x + 10, y + 40);

    // Cycle wheel
    const wheelX = x + w - 70, wheelY = y + h - 70, wheelR = 40;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.beginPath(); ctx.arc(wheelX, wheelY, wheelR, 0, Math.PI * 2); ctx.stroke();
    for (const ph of PHASES) {
      ctx.strokeStyle = ph.color;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(wheelX, wheelY, wheelR, ph.start * Math.PI * 2 - Math.PI / 2, ph.end * Math.PI * 2 - Math.PI / 2);
      ctx.stroke();
    }
    // Hand
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(wheelX, wheelY);
    ctx.lineTo(wheelX + Math.cos(phi * Math.PI * 2 - Math.PI / 2) * wheelR, wheelY + Math.sin(phi * Math.PI * 2 - Math.PI / 2) * wheelR);
    ctx.stroke();
  }

  function drawPVLoop(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('Pressure-Volume loop', x + 6, y - 6);
    ctx.fillText('Volume (mL) →', x + w - 100, y + h + 16);
    ctx.save(); ctx.translate(x - 40, y + h / 2 + 30); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Pressure (mmHg) ↓', 0, 0); ctx.restore();

    const Vmin = 30, Vmax = 150;
    const Pmin = 0, Pmax = 150;
    const x2 = (V) => x + ((V - Vmin) / (Vmax - Vmin)) * w;
    const y2 = (P) => y + h - ((P - Pmin) / (Pmax - Pmin)) * (h - 16) - 8;

    // Loop trace
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const u = i / 200;
      const sx = x2(volume(u)), sy = y2(pressure(u, params.contractility));
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.closePath();
    ctx.stroke();

    // Current point
    const cx = x2(volume(phi));
    const cy = y2(pressure(phi, params.contractility));
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.arc(cx, cy, 7, 0, Math.PI * 2); ctx.fill();
  }

  // controls
  const bpmS = slider({ label: 'Heart rate (bpm)', min: 30, max: 200, step: 1, value: params.bpm,
    onInput: (v) => { params.bpm = v; } });
  const conS = slider({ label: 'Contractility', min: 0.4, max: 1.5, step: 0.01, value: params.contractility, format: (v) => v.toFixed(2),
    onInput: (v) => { params.contractility = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [n, b] of [['Resting (60)', 60], ['Brisk (110)', 110], ['Sprinting (180)', 180]]) {
    const btn = button({ label: n, onClick: () => { params.bpm = b; bpmS.value = b; } });
    presetRow.appendChild(btn.el);
  }
  const playB = button({ label: 'Pause', primary: true, onClick: () => {
    params.running = !params.running; playB.label = params.running ? 'Pause' : 'Play';
  } });
  ctrlPanel.append(bpmS.el, conS.el, presetRow, row(playB));

  const animator = loop((dt) => { step(Math.min(0.05, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
