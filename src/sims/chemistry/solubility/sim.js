import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

// Solubility (g per 100 g water) at temperature T (°C). Approximated curves.
const SOLUTES = {
  KNO3:  { name: 'KNO₃ (potassium nitrate)', curve: (T) => 13 + 1.05 * T + 0.012 * T * T, color: '#fbbf24' },
  NaCl:  { name: 'NaCl (table salt)',          curve: (T) => 35.7 + 0.05 * T,             color: '#e2e8f0' },
  CuSO4: { name: 'CuSO₄ (copper sulfate)',     curve: (T) => 14 + 0.5 * T + 0.005 * T * T, color: '#22d3ee' },
  Sugar: { name: 'Sugar (sucrose)',            curve: (T) => 180 + 1.7 * T,                color: '#fef3c7' },
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    solute: 'KNO3',
    temp: 25,            // °C
    waterGrams: 100,     // grams of water
    addedG: 0,           // grams of solute added
  };

  function solubility() {
    return SOLUTES[params.solute].curve(params.temp);
  }
  function dissolvedG() {
    const cap = solubility() * (params.waterGrams / 100);
    return Math.min(params.addedG, cap);
  }
  function depositG() {
    return Math.max(0, params.addedG - dissolvedG());
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    // Beaker on the left, curve on the right
    const bX = 40, bY = 50, bW = W * 0.35, bH = H - 100;

    // beaker outline
    ctx.strokeStyle = 'rgba(120,130,150,0.7)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(bX, bY);
    ctx.lineTo(bX, bY + bH);
    ctx.lineTo(bX + bW, bY + bH);
    ctx.lineTo(bX + bW, bY);
    ctx.stroke();

    // water (color tint = how saturated)
    const sat = Math.min(1, dissolvedG() / Math.max(0.01, solubility() * params.waterGrams / 100));
    const baseColor = SOLUTES[params.solute].color;
    ctx.fillStyle = `color-mix(in srgb, ${baseColor} ${20 + 40 * sat}%, rgba(59,130,246,0.4))`;
    ctx.fillRect(bX + 2, bY + 30, bW - 4, bH - 32);

    // deposit layer at bottom
    const dep = depositG();
    const depH = Math.min(bH * 0.45, dep * 1.2);
    ctx.fillStyle = SOLUTES[params.solute].color;
    ctx.fillRect(bX + 2, bY + bH - depH, bW - 4, depH);
    // grainy effect
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    for (let i = 0; i < dep; i++) {
      const x = bX + 4 + Math.random() * (bW - 8);
      const y = bY + bH - depH + Math.random() * depH;
      ctx.fillRect(x, y, 2, 2);
    }

    // Label
    ctx.fillStyle = 'rgba(120,130,150,0.95)';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(`${params.waterGrams} g H₂O at ${params.temp}°C`, bX, bY - 10);

    // status banner
    const sol = solubility() * params.waterGrams / 100;
    let status = 'Unsaturated';
    let statusColor = '#10b981';
    if (params.addedG > sol) { status = 'Saturated + deposit'; statusColor = '#ef4444'; }
    else if (Math.abs(params.addedG - sol) < 0.5) { status = 'Saturated'; statusColor = '#f59e0b'; }
    ctx.fillStyle = statusColor;
    ctx.font = 'bold 14px var(--font-sans)';
    ctx.fillText(status, bX, bY + bH + 22);

    // Solubility curve
    const gX = bX + bW + 60, gY = bY, gW = W - gX - 30, gH = bH;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(gX, gY, gW, gH);

    const yMax = 250;
    const x2 = (T) => gX + (T / 100) * gW;
    const y2 = (s) => gY + gH - (s / yMax) * gH;

    // gridlines
    ctx.strokeStyle = 'rgba(120,130,150,0.2)';
    for (let s = 0; s <= yMax; s += 50) {
      ctx.beginPath();
      ctx.moveTo(gX, y2(s)); ctx.lineTo(gX + gW, y2(s));
      ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(String(s), gX - 22, y2(s) + 4);
    }

    // all curves faded
    for (const [k, sol] of Object.entries(SOLUTES)) {
      ctx.strokeStyle = k === params.solute ? sol.color : 'rgba(120,130,150,0.25)';
      ctx.lineWidth = k === params.solute ? 3 : 1.2;
      ctx.beginPath();
      for (let T = 0; T <= 100; T += 2) {
        const sv = sol.curve(T);
        const sx = x2(T), sy = y2(sv);
        if (T === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }

    // marker at current T
    const mx = x2(params.temp);
    const my = y2(solubility());
    ctx.fillStyle = SOLUTES[params.solute].color;
    ctx.beginPath();
    ctx.arc(mx, my, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.stroke();

    // axis labels
    ctx.fillStyle = 'rgba(120,130,150,0.8)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Solubility (g / 100g H₂O)', gX - 30, gY - 6);
    ctx.fillText('Temperature (°C)', gX + gW - 100, gY + gH + 16);

    // info
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(bX + bW - 220, bY, 220, 70);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText(`Limit: ${(solubility() * params.waterGrams / 100).toFixed(1)} g`, bX + bW - 210, bY + 18);
    ctx.fillText(`Added: ${params.addedG.toFixed(1)} g`, bX + bW - 210, bY + 36);
    ctx.fillText(`Dissolved: ${dissolvedG().toFixed(1)}, Deposit: ${depositG().toFixed(1)} g`, bX + bW - 210, bY + 54);
  }

  // controls
  const solSel = select({
    label: 'Solute',
    options: Object.entries(SOLUTES).map(([k, v]) => ({ value: k, label: v.name })),
    value: params.solute,
    onChange: (v) => { params.solute = v; },
  });
  const tempS = slider({
    label: 'Temperature (°C)', min: 0, max: 100, step: 1, value: params.temp,
    onInput: (v) => { params.temp = v; },
  });
  const waterS = slider({
    label: 'Water (g)', min: 50, max: 300, step: 5, value: params.waterGrams,
    onInput: (v) => { params.waterGrams = v; },
  });
  const addedS = slider({
    label: 'Solute added (g)', min: 0, max: 300, step: 1, value: params.addedG,
    onInput: (v) => { params.addedG = v; },
  });
  const spoonB = button({ label: '+5 g', primary: true, onClick: () => {
    params.addedG = Math.min(300, params.addedG + 5);
    addedS.value = params.addedG;
  } });
  const clearB = button({ label: 'Pour out', onClick: () => { params.addedG = 0; addedS.value = 0; } });

  ctrlPanel.append(solSel.el, tempS.el, waterS.el, addedS.el, row(spoonB, clearB));

  // Lab — measure solubility curves and find where solutions saturate.
  const lab = labPanel({
    title: 'Solubility lab — solubility vs temperature',
    filename: 'solubility-lab.csv',
    columns: [
      { key: 'solute', label: 'solute' },
      { key: 'T',      label: 'T (°C)',  format: (v) => v.toFixed(0) },
      { key: 'sol',    label: 'g/100g water', format: (v) => v.toFixed(1) },
    ],
    procedure: [
      'Pick KNO₃. Sweep T = 0, 20, 40, 60, 80 °C. Record each solubility.',
      'KNO₃ rises steeply with T. Plot solubility vs T — strongly concave.',
      'Switch to NaCl. Sweep the same T values. NaCl is nearly flat — barely T-dependent.',
      'Sugar: very high solubility, scales linearly.',
      'CuSO₄: moderate increase. Useful for crystal-growing demos (cool to crystallize).',
    ],
    predict: 'You dissolve 60 g KNO₃ in 100 g water at 60 °C. As you cool to 20 °C, how much will crystallize out?',
    source: () => ({
      solute: SOLUTES[params.solute].name,
      T: params.temp,
      sol: SOLUTES[params.solute].curve(params.temp),
    }),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
