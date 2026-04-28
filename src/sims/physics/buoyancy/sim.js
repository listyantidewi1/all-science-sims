import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';

const FLUIDS = {
  water:    { name: 'Water',           density: 1.00, color: '#3b82f6' },
  oil:      { name: 'Vegetable oil',   density: 0.92, color: '#fbbf24' },
  saltwater:{ name: 'Salt water',      density: 1.03, color: '#06b6d4' },
  glycerin: { name: 'Glycerin',        density: 1.26, color: '#a855f7' },
  mercury:  { name: 'Mercury',         density: 13.6, color: '#cbd5e1' },
};

const PRESETS = [
  { label: 'Ice (0.92)', d: 0.92 },
  { label: 'Wood (0.65)', d: 0.65 },
  { label: 'Cork (0.25)', d: 0.25 },
  { label: 'Aluminum (2.7)', d: 2.7 },
  { label: 'Iron (7.87)', d: 7.87 },
  { label: 'Gold (19.3)', d: 19.3 },
  { label: 'Custom', d: null },
];

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const params = {
    fluid: 'water',
    density: 0.6,         // g/cm³
    size: 50,             // px
  };
  let block = null; // {x, y, vy, density}

  function spawn() {
    block = {
      x: cv.width / 2,
      y: 60,
      vy: 0,
      density: params.density,
      size: params.size,
    };
  }
  spawn();

  function step(dt) {
    if (!block) return;
    const fluidDen = FLUIDS[params.fluid].density;
    const fluidTopY = cv.height * 0.32;
    const blockBottom = block.y + block.size / 2;
    const submergedDepth = Math.max(0, Math.min(block.size, blockBottom - fluidTopY));
    const blockArea = block.size * block.size;
    const massPerArea = block.density * block.size; // proxy: density × side
    const weight = massPerArea * 200; // arbitrary scaling
    const buoyForce = fluidDen * submergedDepth * 200;
    const drag = -block.vy * 0.6 * (submergedDepth / block.size);
    const acc = (buoyForce - weight) / (massPerArea + 0.01) * 30 + drag * 30;
    block.vy += acc * dt;
    block.y += block.vy * dt;

    // simple ground & ceiling
    if (block.y > cv.height - block.size / 2) {
      block.y = cv.height - block.size / 2;
      block.vy = 0;
    }
    if (block.y < block.size / 2) {
      block.y = block.size / 2;
      block.vy = 0;
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    // air
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // tank
    const tankX = 30, tankY = 30, tankW = W - 60, tankH = H - 60;
    ctx.strokeStyle = 'rgba(120,130,150,0.6)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(tankX, tankY);
    ctx.lineTo(tankX, tankY + tankH);
    ctx.lineTo(tankX + tankW, tankY + tankH);
    ctx.lineTo(tankX + tankW, tankY);
    ctx.stroke();

    // fluid
    const fluid = FLUIDS[params.fluid];
    const fluidTopY = cv.height * 0.32;
    ctx.fillStyle = fluid.color + 'aa';
    ctx.fillRect(tankX + 1, fluidTopY, tankW - 2, tankY + tankH - fluidTopY);
    // surface ripple
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.fillRect(tankX + 1, fluidTopY - 2, tankW - 2, 4);

    // block
    if (block) {
      const x = block.x - block.size / 2;
      const y = block.y - block.size / 2;
      ctx.fillStyle = '#92400e';
      ctx.fillRect(x, y, block.size, block.size);
      ctx.strokeStyle = '#451a03';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, block.size, block.size);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px var(--font-mono)';
      ctx.textAlign = 'center';
      ctx.fillText(`ρ=${block.density.toFixed(2)}`, block.x, block.y + 4);
      ctx.textAlign = 'left';
    }

    // info
    const fluidDen = FLUIDS[params.fluid].density;
    const ratio = params.density / fluidDen;
    let verdict;
    if (ratio < 1) verdict = `Floats — ${Math.round((1 - ratio) * 100)}% above surface`;
    else if (ratio > 1) verdict = `Sinks (block density > fluid)`;
    else verdict = `Neutral buoyancy`;

    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 50);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(`${fluid.name} (ρ=${fluidDen.toFixed(2)} g/cm³)`, 16, 26);
    ctx.font = '12px var(--font-sans)';
    ctx.fillText(verdict, 16, 46);
  }

  // controls
  const fluidSel = select({
    label: 'Fluid',
    options: Object.entries(FLUIDS).map(([k, v]) => ({ value: k, label: v.name + ` (${v.density})` })),
    value: params.fluid,
    onChange: (v) => { params.fluid = v; spawn(); },
  });
  const dS = slider({
    label: 'Object density (g/cm³)', min: 0.1, max: 22, step: 0.05, value: params.density, format: (v) => v.toFixed(2),
    onInput: (v) => { params.density = v; if (block) block.density = v; },
  });
  const sizeS = slider({
    label: 'Object size (px)', min: 20, max: 100, step: 1, value: params.size,
    onInput: (v) => { params.size = v; if (block) block.size = v; },
  });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const p of PRESETS.filter((p) => p.d != null)) {
    const b = button({ label: p.label, onClick: () => { params.density = p.d; dS.value = p.d; spawn(); } });
    presetRow.appendChild(b.el);
  }
  const dropB = button({ label: 'Drop new block', primary: true, onClick: spawn });

  ctrlPanel.append(fluidSel.el, dS.el, sizeS.el, presetRow, row(dropB));

  const animator = loop((dt) => { step(Math.min(0.05, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
