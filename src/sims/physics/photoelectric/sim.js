import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';

const METALS = {
  cesium:   { name: 'Cesium',    phi: 2.14 },
  potassium:{ name: 'Potassium', phi: 2.30 },
  sodium:   { name: 'Sodium',    phi: 2.36 },
  zinc:     { name: 'Zinc',      phi: 4.33 },
  copper:   { name: 'Copper',    phi: 4.65 },
  gold:     { name: 'Gold',      phi: 5.10 },
};

const h = 4.136e-15; // eV·s

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    metal: 'sodium',
    frequency: 7e14,    // Hz (visible green ~ 5.5e14)
    intensity: 0.5,
  };

  let photons = []; // incoming photons
  let electrons = []; // emitted electrons
  let lastEmit = 0;

  function thresholdFreq() { return METALS[params.metal].phi / h; }
  function KE() { return Math.max(0, h * params.frequency - METALS[params.metal].phi); }

  function step(dt) {
    // emit photons depending on intensity
    lastEmit += dt;
    const period = 0.05 / params.intensity;
    while (lastEmit > period) {
      photons.push({
        x: 30 + Math.random() * 40,
        y: 30 + Math.random() * 40,
        vx: 200 + Math.random() * 60,
        vy: 100 + Math.random() * 40,
        f: params.frequency,
      });
      lastEmit -= period;
    }
    for (const p of photons) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
    }
    // metal plate at the right
    const platex = cv.width * 0.55;
    for (let i = photons.length - 1; i >= 0; i--) {
      const p = photons[i];
      if (p.x >= platex) {
        photons.splice(i, 1);
        if (KE() > 0) {
          // emit electron toward right
          const ke = KE();
          const speed = 200 + ke * 50;
          electrons.push({ x: platex, y: p.y, vx: speed, vy: (Math.random() - 0.5) * 30, ke });
        }
      }
      if (p.x > cv.width || p.y > cv.height) photons.splice(i, 1);
    }
    for (const e of electrons) {
      e.x += e.vx * dt;
      e.y += e.vy * dt;
    }
    electrons = electrons.filter((e) => e.x < cv.width && e.y < cv.height && e.y > 0);
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // metal plate
    const platex = W * 0.55;
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(platex, 0, 30, H);
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.strokeRect(platex, 0, 30, H);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.save(); ctx.translate(platex + 15, H / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText(METALS[params.metal].name + ` (φ=${METALS[params.metal].phi} eV)`, -50, 4);
    ctx.restore();

    // light source
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(40, 40, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0b1220';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('lamp', 25, 80);

    // photons
    for (const p of photons) {
      const wl = 3e8 / p.f * 1e9; // nm
      ctx.fillStyle = wlColor(wl);
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // electrons
    for (const e of electrons) {
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(e.x, e.y, 5, 0, Math.PI * 2);
      ctx.fill();
      // tail
      ctx.strokeStyle = 'rgba(59,130,246,0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(e.x - 12, e.y); ctx.lineTo(e.x, e.y);
      ctx.stroke();
    }

    // info
    const ke = KE();
    const f0 = thresholdFreq();
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 320, 80);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`f = ${(params.frequency * 1e-14).toFixed(2)}×10¹⁴ Hz`, 16, 26);
    ctx.fillText(`hf = ${(h * params.frequency).toFixed(2)} eV`, 16, 44);
    ctx.fillStyle = ke > 0 ? '#10b981' : '#ef4444';
    ctx.fillText(ke > 0 ? `KE_max = ${ke.toFixed(2)} eV (electrons emitted)` : 'No emission (hf < φ)', 16, 62);
    ctx.fillStyle = '#fbbf24';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`threshold f₀ = ${(f0 * 1e-14).toFixed(2)}×10¹⁴ Hz`, 16, 80);
  }

  function wlColor(wl) {
    if (wl < 380) return '#a855f7'; // UV — purple
    if (wl > 780) return '#7f1d1d'; // IR
    if (wl < 440) return '#a78bfa';
    if (wl < 490) return '#3b82f6';
    if (wl < 510) return '#06b6d4';
    if (wl < 580) return '#10b981';
    if (wl < 645) return '#fbbf24';
    return '#ef4444';
  }

  // controls
  const mSel = select({
    label: 'Metal',
    options: Object.entries(METALS).map(([k, v]) => ({ value: k, label: `${v.name} (φ=${v.phi} eV)` })),
    value: params.metal,
    onChange: (v) => { params.metal = v; },
  });
  const fS = slider({ label: 'Frequency (×10¹⁴ Hz)', min: 1, max: 20, step: 0.1, value: params.frequency * 1e-14, format: (v) => v.toFixed(1),
    onInput: (v) => { params.frequency = v * 1e14; } });
  const iS = slider({ label: 'Intensity', min: 0.1, max: 3, step: 0.05, value: params.intensity, format: (v) => v.toFixed(2),
    onInput: (v) => { params.intensity = v; } });
  ctrlPanel.append(mSel.el, fS.el, iS.el);

  const animator = loop((dt) => { step(Math.min(0.05, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
