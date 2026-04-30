import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

// Real orbital periods (years) and a compressed display radius (so Neptune fits).
// Display radius uses sqrt of AU to keep inner planets visible without losing the order.
const PLANETS = [
  { name: 'Mercury', period: 0.241, au: 0.39, color: '#b0a08a', size: 3 },
  { name: 'Venus',   period: 0.615, au: 0.72, color: '#e6c27a', size: 4.5 },
  { name: 'Earth',   period: 1.000, au: 1.00, color: '#3b82f6', size: 4.8 },
  { name: 'Mars',    period: 1.881, au: 1.52, color: '#d65a3a', size: 4 },
  { name: 'Jupiter', period: 11.86, au: 5.20, color: '#d4a76a', size: 9 },
  { name: 'Saturn',  period: 29.46, au: 9.58, color: '#e0c98a', size: 8 },
  { name: 'Uranus',  period: 84.01, au: 19.18, color: '#7ad0d4', size: 6 },
  { name: 'Neptune', period: 164.8, au: 30.07, color: '#3a6bd6', size: 6 },
];

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 1.4 });

  const state = {
    yearsPerSec: 0.5,    // simulated years per real second
    showOrbits: true,
    showLabels: true,
    paused: false,
    t: 0,                // simulated years elapsed
  };

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    // background
    const g = ctx.createRadialGradient(W / 2, H / 2, 10, W / 2, H / 2, Math.max(W, H));
    g.addColorStop(0, 'rgba(20, 30, 60, 0.4)');
    g.addColorStop(1, 'rgba(11, 18, 32, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    const cx = W / 2, cy = H / 2;
    const maxR = Math.min(W, H) / 2 - 20;
    const auMax = Math.sqrt(30.07);
    const scale = (au) => (Math.sqrt(au) / auMax) * maxR;

    // sun
    const sunGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 18);
    sunGrad.addColorStop(0, '#fff7c2');
    sunGrad.addColorStop(0.5, '#f5b829');
    sunGrad.addColorStop(1, 'rgba(245,184,41,0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff7c2';
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fill();

    // orbits
    if (state.showOrbits) {
      ctx.strokeStyle = 'rgba(120,130,150,0.25)';
      ctx.lineWidth = 1;
      for (const p of PLANETS) {
        ctx.beginPath();
        ctx.arc(cx, cy, scale(p.au), 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // planets
    ctx.font = '11px var(--font-sans)';
    for (const p of PLANETS) {
      const angle = (state.t / p.period) * Math.PI * 2;
      const r = scale(p.au);
      const px = cx + Math.cos(angle) * r;
      const py = cy + Math.sin(angle) * r;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fill();
      if (state.showLabels) {
        ctx.fillStyle = 'rgba(180,190,210,0.85)';
        ctx.fillText(p.name, px + p.size + 3, py + 3);
      }
    }

    // readout
    ctx.fillStyle = 'rgba(180,190,210,0.85)';
    ctx.font = '13px var(--font-sans)';
    ctx.fillText(`t = ${state.t.toFixed(2)} yr`, 12, 18);
  }

  const animator = loop((dt) => {
    if (!state.paused) state.t += dt * state.yearsPerSec;
    draw();
  });

  // controls
  const speedS = slider({
    label: 'Years per second', min: 0.05, max: 5, step: 0.05, value: state.yearsPerSec, format: (v) => v.toFixed(2),
    onInput: (v) => { state.yearsPerSec = v; },
  });
  const orbitsT = toggle({ label: 'Show orbits', value: state.showOrbits, onChange: (v) => { state.showOrbits = v; } });
  const labelsT = toggle({ label: 'Show labels', value: state.showLabels, onChange: (v) => { state.showLabels = v; } });
  const playB = button({ label: 'Pause', primary: true, onClick: () => {
    state.paused = !state.paused;
    playB.label = state.paused ? 'Play' : 'Pause';
  } });
  const resetB = button({ label: 'Reset', onClick: () => { state.t = 0; } });

  ctrlPanel.append(speedS.el, orbitsT.el, labelsT.el, row(playB, resetB));

  // Lab — verify Kepler's third law: T² ∝ a³.
  const lab = labPanel({
    title: "Kepler's third law lab — T² vs a³",
    filename: 'solar-system-lab.csv',
    columns: [
      { key: 'planet', label: 'planet' },
      { key: 'a',      label: 'a (AU)',  format: (v) => v.toFixed(2) },
      { key: 'T',      label: 'T (years)', format: (v) => v.toFixed(3) },
      { key: 'a3',     label: 'a³',       format: (v) => v.toFixed(3) },
      { key: 'T2',     label: 'T²',       format: (v) => v.toFixed(3) },
      { key: 'ratio',  label: 'T²/a³',    format: (v) => v.toFixed(4) },
    ],
    procedure: [
      'For each planet, click "Record" — it grabs that planet\'s a and T.',
      'You\'ll record 8 rows: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.',
      'Compute a³ and T². The ratio T²/a³ should equal 1 (in units where Earth is at a=1, T=1).',
      'That\'s Kepler\'s third law: orbital period squared ∝ semi-major axis cubed.',
      'Plot log(T) vs log(a) — slope should be exactly 3/2.',
    ],
    predict: 'A new planet found at 4 AU. What is its orbital period?',
    source: () => {
      // Pick the planet with semi-major axis closest to a current "selected" — for simplicity, cycle through.
      const idx = Math.floor((Date.now() / 800) % PLANETS.length);
      const p = PLANETS[idx];
      return {
        planet: p.name, a: p.au, T: p.period,
        a3: p.au ** 3, T2: p.period ** 2,
        ratio: p.period ** 2 / p.au ** 3,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  animator.start();

  return () => {
    animator.stop();
    cv.destroy();
  };
}
