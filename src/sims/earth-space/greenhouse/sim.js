import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    co2: 420,         // ppm
    albedo: 0.30,     // fraction reflected
  };

  // Equilibrium surface temperature = bare-planet (no greenhouse) temperature
  // from the energy balance  σT^4 = S(1-A)/4,  plus a greenhouse warming that
  // grows with the logarithm of CO₂ (radiative forcing ∝ ln CO₂), tuned so
  // that 280 ppm with albedo 0.30 gives Earth's +15 °C and each doubling of
  // CO₂ adds ≈ 3 °C (the real-world climate sensitivity). Below ~20 ppm the
  // log term is blended linearly to zero so that 0 ppm gives the bare-planet
  // ≈ −18 °C instead of −∞.
  const S = 1361;        // solar constant (W/m²)
  const sigma = 5.67e-8; // Stefan-Boltzmann
  const SENS = 3.0;      // °C per doubling of CO₂
  const BLEND = 20;      // ppm below which the log law is ramped to zero
  function bareK(albedo) {
    return Math.pow((S * (1 - albedo)) / (4 * sigma), 0.25);
  }
  const GH280 = 15 - (bareK(0.30) - 273.15);   // greenhouse warming at 280 ppm (≈ 33.6 °C)
  function ghWarming(co2) {
    if (co2 >= BLEND) return GH280 + SENS * Math.log2(co2 / 280);
    return (co2 / BLEND) * (GH280 + SENS * Math.log2(BLEND / 280));
  }
  function tempK() {
    return bareK(params.albedo) + ghWarming(params.co2);
  }
  // Visual-only absorptivity of the green layer (fraction of IR particles turned back).
  function layerAbsorptivity() {
    return Math.tanh(params.co2 / 600);
  }
  const sunPhotons = [];     // visible photons going down
  const irPhotons = [];      // IR photons (some go up, some bounce around)

  function emitSun() {
    sunPhotons.push({
      x: Math.random() * cv.width,
      y: 0,
      v: 200 + Math.random() * 60,
      reflected: Math.random() < params.albedo,
    });
  }
  function emitIR() {
    irPhotons.push({
      x: Math.random() * cv.width,
      y: cv.height - 50,
      vy: -150 - Math.random() * 60,
      bouncing: 0,
    });
  }

  function step(dt) {
    if (sunPhotons.length < 50) for (let i = 0; i < 2; i++) emitSun();
    if (irPhotons.length < 60) for (let i = 0; i < 3; i++) emitIR();

    for (let i = sunPhotons.length - 1; i >= 0; i--) {
      const p = sunPhotons[i];
      p.y += p.v * dt;
      const surface = cv.height - 50;
      if (p.y >= surface) {
        if (p.reflected) {
          p.y = surface; p.v = -p.v; p.reflected = false;
        } else {
          // absorbed — emit an IR upward
          irPhotons.push({ x: p.x, y: surface - 5, vy: -150 - Math.random() * 60, bouncing: 0 });
          sunPhotons.splice(i, 1);
        }
      } else if (p.y < 0 && p.v < 0) sunPhotons.splice(i, 1);
    }

    const eps = layerAbsorptivity();
    for (let i = irPhotons.length - 1; i >= 0; i--) {
      const p = irPhotons[i];
      p.y += p.vy * dt;
      // chance of being absorbed and re-emitted at greenhouse layer
      const ghLayer = cv.height * 0.3;
      if (p.vy < 0 && p.y < ghLayer + 80 && p.y > ghLayer - 80) {
        if (Math.random() < eps * dt * 5) {
          // bounce back down
          p.vy = -p.vy * (0.7 + Math.random() * 0.3);
          p.bouncing++;
        }
      }
      // when going down again
      if (p.vy > 0 && p.y > cv.height - 60) {
        p.vy = -150 - Math.random() * 60;
      }
      if (p.y < -10 || p.bouncing > 8) irPhotons.splice(i, 1);
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    // sky gradient
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#0c1f3d');
    g.addColorStop(0.5, '#0b3a76');
    g.addColorStop(0.85, '#1b4a93');
    g.addColorStop(1, '#0a3163');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // greenhouse gas layer
    const ghLayer = H * 0.3;
    const eps = layerAbsorptivity();
    ctx.fillStyle = `rgba(80, 200, 100, ${0.05 + eps * 0.25})`;
    ctx.fillRect(0, ghLayer - 80, W, 160);

    // ground
    ctx.fillStyle = '#15803d';
    ctx.fillRect(0, H - 50, W, 50);
    ctx.fillStyle = '#166534';
    for (let i = 0; i < 8; i++) {
      ctx.fillRect((i + 0.5) * W / 8 - 2, H - 60, 4, 12);
    }

    // sun
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(W - 60, 50, 24, 0, Math.PI * 2);
    ctx.fill();

    // photons
    ctx.strokeStyle = '#fde047';
    ctx.lineWidth = 1.5;
    for (const p of sunPhotons) {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x, p.y - 10);
      ctx.stroke();
    }
    ctx.strokeStyle = '#ef4444';
    for (const p of irPhotons) {
      ctx.beginPath();
      ctx.moveTo(p.x - 4, p.y);
      ctx.lineTo(p.x + 4, p.y);
      ctx.moveTo(p.x, p.y - 4);
      ctx.lineTo(p.x, p.y + 4);
      ctx.stroke();
    }

    // legend
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(10, 10, 220, 50);
    ctx.fillStyle = '#fde047';
    ctx.fillRect(20, 22, 14, 6);
    ctx.fillStyle = '#fff';
    ctx.font = '12px system-ui, -apple-system, Roboto, sans-serif';
    ctx.fillText('visible (sunlight)', 40, 30);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(20, 42, 14, 6);
    ctx.fillStyle = '#fff';
    ctx.fillText('infrared (heat)', 40, 50);

    // temperature readout
    const T = tempK();
    const TC = T - 273.15;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(W - 240, 10, 230, 60);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px system-ui, -apple-system, Roboto, sans-serif';
    ctx.fillText(`Surface: ${TC.toFixed(1)} °C`, W - 230, 32);
    ctx.font = '12px system-ui, -apple-system, Roboto, sans-serif';
    ctx.fillText(`CO₂: ${params.co2} ppm    Albedo: ${params.albedo.toFixed(2)}`, W - 230, 52);
  }

  // controls
  const co2S = slider({
    label: 'CO₂ (ppm)', min: 0, max: 1500, step: 5, value: params.co2,
    onInput: (v) => { params.co2 = v; },
  });
  const albS = slider({
    label: 'Earth albedo', min: 0.1, max: 0.6, step: 0.01, value: params.albedo, format: (v) => v.toFixed(2),
    onInput: (v) => { params.albedo = v; },
  });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, v] of [['Pre-industrial 280', 280], ['Today 420', 420], ['Pliocene 600', 600], ['Eocene 1000', 1000]]) {
    const b = button({ label: name, onClick: () => { params.co2 = v; co2S.value = v; } });
    presetRow.appendChild(b.el);
  }

  ctrlPanel.append(co2S.el, albS.el, presetRow);

  // Lab — temperature vs CO2 and albedo.
  const lab = labPanel({
    title: 'Greenhouse effect lab — equilibrium temperature',
    filename: 'greenhouse-lab.csv',
    columns: [
      { key: 'co2',   label: 'CO₂ (ppm)' },
      { key: 'alb',   label: 'albedo',   format: (v) => v.toFixed(2) },
      { key: 'T_K',   label: 'T (K)',     format: (v) => v.toFixed(1) },
      { key: 'T_C',   label: 'T (°C)',    format: (v) => v.toFixed(1) },
    ],
    procedure: [
      'Hold albedo = 0.30 (Earth-like). Sweep CO₂: 280 (pre-ind), 420 (today), 560, 1120. Record.',
      'See temperature rise as CO₂ increases — that\'s the greenhouse effect. Each doubling (280→560→1120) adds about the same ≈3 °C.',
      'Now hold CO₂ = 420. Sweep albedo: 0.20 (more absorbing), 0.30, 0.40, 0.50 (more reflective).',
      'A higher albedo means more sunlight reflected → cooler planet.',
      'Snowball Earth: albedo ~0.6, very cold. Venus: thick CO₂, very hot.',
    ],
    predict: 'Doubling CO₂ from 280 to 560 ppm — by how many degrees does T rise (in this simple model)?',
    source: () => {
      const T = tempK();
      return { co2: params.co2, alb: params.albedo, T_K: T, T_C: T - 273.15 };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
