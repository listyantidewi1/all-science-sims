import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';

// Background star catalog — illustrative samples from various populations
const CATALOG = [
  // [name, T_K, log10(L/Lsun)]
  ['Sun', 5778, 0],
  ['Sirius A', 9940, 1.4],
  ['Sirius B', 25000, -2.5],
  ['Betelgeuse', 3500, 5.0],
  ['Vega', 9602, 1.6],
  ['Proxima Cen', 3042, -2.7],
  ['Antares', 3660, 4.7],
  ['Rigel', 12100, 5.1],
  ['Polaris', 6015, 3.6],
  ['Procyon B', 7740, -2.4],
  ['Alpha Centauri A', 5790, 0.18],
  ['Aldebaran', 3910, 2.4],
  ['Spica', 22400, 3.9],
  ['Arcturus', 4286, 2.3],
  ['Barnard\'s Star', 3134, -2.45],
];

// Surface temperature → RGB color
function tempColor(T) {
  // simple mapping
  if (T > 30000) return '#a4cefc';
  if (T > 10000) return '#cad8ff';
  if (T > 7500) return '#f3f8ff';
  if (T > 6000) return '#fff8e3';
  if (T > 5000) return '#fff0c2';
  if (T > 3500) return '#ffc480';
  return '#ff9966';
}

// Main-sequence relation: L ∝ M^3.5 ; L_sun = 1, M_sun = 1
// Surface T also rises with mass. Approximations:
function mainSeq(M) {
  const L = Math.pow(M, 3.5);
  // T rough approximation: 5778 * (L)^(1/8)
  const T = 5778 * Math.pow(L, 1 / 8);
  return { T, L };
}

// Stages of stellar evolution for given initial mass (illustrative path)
function lifePath(M, stage) {
  // stage 0..3: main sequence, red giant, planetary nebula / supergiant, white dwarf / supernova
  const ms = mainSeq(M);
  if (stage === 0) return ms;
  if (stage === 1) return { T: ms.T * 0.5, L: ms.L * 100 };  // red giant
  if (stage === 2) {
    if (M < 8) return { T: ms.T * 0.4, L: ms.L * 1000 };       // larger giant
    return { T: ms.T * 0.4, L: ms.L * 10000 };                  // supergiant
  }
  if (stage === 3) {
    if (M < 8) return { T: 25000, L: 0.001 };                  // white dwarf
    return { T: 50000, L: 0.0001 };                            // neutron star pulse
  }
  return ms;
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const params = {
    mass: 1.0,         // M_sun
    stage: 0,
  };

  // Axes: x = log10(T), reversed; y = log10(L/Lsun)
  const T_LOW = 2500, T_HIGH = 50000;
  const LOG_L_MIN = -4, LOG_L_MAX = 6;

  function x2(T, W) {
    const padX = 60;
    const lt = Math.log10(T);
    const ltMin = Math.log10(T_LOW), ltMax = Math.log10(T_HIGH);
    return padX + ((ltMax - lt) / (ltMax - ltMin)) * (W - padX - 30);
  }
  function y2(L, H) {
    const padY = 30, padBot = 50;
    const ll = Math.log10(Math.max(1e-5, L));
    return H - padBot - ((ll - LOG_L_MIN) / (LOG_L_MAX - LOG_L_MIN)) * (H - padY - padBot);
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Frame
    ctx.strokeStyle = 'rgba(120,130,150,0.5)';
    ctx.strokeRect(60, 30, W - 90, H - 80);

    // gridlines and labels
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '10px var(--font-mono)';
    for (const T of [3000, 5000, 7500, 10000, 20000, 40000]) {
      const xx = x2(T, W);
      ctx.strokeStyle = 'rgba(120,130,150,0.15)';
      ctx.beginPath(); ctx.moveTo(xx, 30); ctx.lineTo(xx, H - 50); ctx.stroke();
      ctx.fillText(`${T}`, xx - 14, H - 36);
    }
    for (let ll = LOG_L_MIN; ll <= LOG_L_MAX; ll++) {
      const yy = y2(Math.pow(10, ll), H);
      ctx.strokeStyle = 'rgba(120,130,150,0.15)';
      ctx.beginPath(); ctx.moveTo(60, yy); ctx.lineTo(W - 30, yy); ctx.stroke();
      ctx.fillText(`10^${ll}`, 24, yy + 3);
    }

    // Main sequence band
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let M = 0.1; M <= 50; M += 0.1) {
      const { T, L } = mainSeq(M);
      const xx = x2(T, W), yy = y2(L, H);
      if (M === 0.1) ctx.moveTo(xx, yy); else ctx.lineTo(xx, yy);
    }
    ctx.stroke();
    ctx.fillStyle = '#3b82f6';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('main sequence', x2(6000, W) + 30, y2(1, H) + 30);

    // Cataloged stars
    for (const [name, T, logL] of CATALOG) {
      const xx = x2(T, W);
      const yy = y2(Math.pow(10, logL), H);
      const rad = 4 + logL * 0.7;
      ctx.fillStyle = tempColor(T);
      ctx.beginPath();
      ctx.arc(xx, yy, Math.max(2, rad), 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.font = '9px var(--font-sans)';
      ctx.fillText(name, xx + 5, yy - 5);
    }

    // Current selected star
    const cur = lifePath(params.mass, params.stage);
    const cx = x2(cur.T, W), cy = y2(cur.L, H);
    ctx.fillStyle = tempColor(cur.T);
    ctx.beginPath();
    ctx.arc(cx, cy, 12 + Math.log10(Math.max(0.001, cur.L)) * 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, 16, 0, Math.PI * 2);
    ctx.stroke();

    // axis labels
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText('Surface temperature (K) — hotter ←', W / 2 - 80, H - 16);
    ctx.save(); ctx.translate(20, H / 2 + 60); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Luminosity (L / L☉) — log scale', 0, 0);
    ctx.restore();

    // Readout
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 280, 50);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-sans)';
    const stages = ['Main sequence', 'Red giant', params.mass < 8 ? 'AGB / planetary' : 'Supergiant', params.mass < 8 ? 'White dwarf' : 'Neutron star'];
    ctx.fillText(`${params.mass.toFixed(1)} M☉ — ${stages[params.stage]}`, 16, 26);
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`T = ${cur.T.toFixed(0)} K    L = ${cur.L.toExponential(2)} L☉`, 16, 44);
  }

  // controls
  const massS = slider({
    label: 'Initial mass (M☉)', min: 0.1, max: 30, step: 0.1, value: params.mass, format: (v) => v.toFixed(1),
    onInput: (v) => { params.mass = v; },
  });
  const stageSel = select({
    label: 'Life stage',
    options: [
      { value: '0', label: 'Main sequence' },
      { value: '1', label: 'Red giant' },
      { value: '2', label: 'AGB / supergiant' },
      { value: '3', label: 'White dwarf / neutron star' },
    ],
    value: String(params.stage),
    onChange: (v) => { params.stage = Number(v); },
  });
  const evolveB = button({ label: 'Step life stage', primary: true, onClick: () => {
    params.stage = (params.stage + 1) % 4;
    stageSel.value = String(params.stage);
  } });

  ctrlPanel.append(massS.el, stageSel.el, row(evolveB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
