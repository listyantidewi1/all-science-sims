import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

// Approximate US Standard Atmosphere
function tempC(altKm) {
  if (altKm < 11) return 15 - 6.5 * altKm;          // troposphere
  if (altKm < 20) return -56.5;                       // tropopause
  if (altKm < 32) return -56.5 + (altKm - 20) * 1.0;  // stratosphere lower
  if (altKm < 47) return -44.5 + (altKm - 32) * 2.8;  // stratopause approaching
  if (altKm < 51) return -2.5;                         // stratopause
  if (altKm < 71) return -2.5 - (altKm - 51) * 2.8;   // mesosphere
  if (altKm < 85) return -58.5 - (altKm - 71) * 2.0;  // mesopause approach
  if (altKm < 100) return -86.5;                       // mesopause
  // thermosphere — temperature rises sharply to 1500+
  return -86.5 + (altKm - 100) * 5;
}

function pressureKPa(altKm) {
  return 101.325 * Math.exp(-altKm / 7.0);
}

function densityKgM3(altKm) {
  return 1.225 * Math.exp(-altKm / 8.5);
}

function layer(altKm) {
  if (altKm < 12) return 'Troposphere';
  if (altKm < 50) return 'Stratosphere';
  if (altKm < 85) return 'Mesosphere';
  if (altKm < 600) return 'Thermosphere';
  return 'Exosphere';
}

const LANDMARKS = [
  { name: 'Mt Everest', alt: 8.85 },
  { name: 'Cruising airliner', alt: 11 },
  { name: 'Ozone layer (peak)', alt: 22 },
  { name: 'Weather balloons', alt: 35 },
  { name: 'Auroras', alt: 100 },
  { name: 'ISS', alt: 408 },
];

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { alt: 5 };
  let drag = false;

  const ALT_MAX = 500;
  function y2(alt, H) {
    // log-ish scale to fit 0..500
    return H - 30 - (Math.pow(alt / ALT_MAX, 0.5)) * (H - 60);
  }
  function s2alt(sy, H) {
    const fr = (H - 30 - sy) / (H - 60);
    return Math.max(0, Math.min(ALT_MAX, Math.pow(Math.max(0, fr), 2) * ALT_MAX));
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    // Background gradient: ground (green) → blue → black space
    const grad = ctx.createLinearGradient(0, H, 0, 0);
    grad.addColorStop(0, '#15803d');
    grad.addColorStop(0.05, '#1e3a8a');
    grad.addColorStop(0.4, '#1e293b');
    grad.addColorStop(1, '#020617');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Layer boundaries (horizontal lines and labels)
    const layers = [
      { name: 'Troposphere', top: 12, color: 'rgba(96,165,250,0.18)' },
      { name: 'Stratosphere', top: 50, color: 'rgba(167,139,250,0.18)' },
      { name: 'Mesosphere', top: 85, color: 'rgba(236,72,153,0.18)' },
      { name: 'Thermosphere', top: 500, color: 'rgba(251,191,36,0.10)' },
    ];
    let prevY = H - 30;
    for (const lay of layers) {
      const yy = y2(lay.top, H);
      ctx.fillStyle = lay.color;
      ctx.fillRect(40, yy, W - 240, prevY - yy);
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.font = '11px var(--font-sans)';
      ctx.fillText(`${lay.name} (≤ ${lay.top} km)`, 50, (yy + prevY) / 2 + 4);
      prevY = yy;
    }

    // Temperature curve
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let a = 0; a <= ALT_MAX; a += 2) {
      const tx = mapTempX(tempC(a), W);
      const ty = y2(a, H);
      if (a === 0) ctx.moveTo(tx, ty); else ctx.lineTo(tx, ty);
    }
    ctx.stroke();
    ctx.fillStyle = '#ef4444';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Temperature', W - 200, 22);

    // Probe marker
    const probeY = y2(params.alt, H);
    const probeX = mapTempX(tempC(params.alt), W);
    ctx.strokeStyle = '#10b981';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(40, probeY); ctx.lineTo(W - 200, probeY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(probeX, probeY, 8, 0, Math.PI * 2);
    ctx.fill();

    // Landmarks
    for (const l of LANDMARKS) {
      if (l.alt > ALT_MAX) continue;
      const ly = y2(l.alt, H);
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath(); ctx.arc(W - 200, ly, 4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(251,191,36,0.85)';
      ctx.font = '10px var(--font-sans)';
      ctx.fillText(`${l.name} (${l.alt} km)`, W - 192, ly + 3);
    }

    // Readout
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 280, 76);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(`${params.alt.toFixed(1)} km — ${layer(params.alt)}`, 16, 26);
    ctx.font = '12px var(--font-mono)';
    ctx.fillText(`T = ${tempC(params.alt).toFixed(1)} °C`, 16, 46);
    ctx.fillText(`P = ${pressureKPa(params.alt).toFixed(2)} kPa`, 16, 62);
    ctx.fillText(`ρ = ${densityKgM3(params.alt).toExponential(2)} kg/m³`, 16, 78);
  }

  function mapTempX(T, W) {
    // Map temperature -100..100 to x range 80..(W-220)
    return 80 + ((T + 100) / 200) * (W - 300);
  }

  // drag the probe
  function localPos(e) {
    const rect = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * cv.width / rect.width, y: (e.clientY - rect.top) * cv.height / rect.height };
  }
  cv.canvas.style.cursor = 'pointer';
  cv.canvas.addEventListener('mousedown', (e) => {
    drag = true;
    const p = localPos(e);
    params.alt = s2alt(p.y, cv.height);
  });
  window.addEventListener('mousemove', (e) => {
    if (!drag) return;
    const p = localPos(e);
    params.alt = s2alt(p.y, cv.height);
  });
  window.addEventListener('mouseup', () => { drag = false; });

  // controls
  const altS = slider({ label: 'Altitude (km)', min: 0, max: ALT_MAX, step: 0.1, value: params.alt, format: (v) => v.toFixed(1),
    onInput: (v) => { params.alt = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const l of LANDMARKS) {
    const b = button({ label: l.name, onClick: () => { params.alt = l.alt; altS.value = l.alt; } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(altS.el, presetRow);

  const animator = loop(() => {
    altS.value = Math.round(params.alt * 10) / 10;
    draw();
  });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
