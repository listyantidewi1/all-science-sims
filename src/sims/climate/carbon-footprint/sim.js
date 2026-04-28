import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

// CO2-eq factors (illustrative, in kg CO2-eq per unit):
// car_km        0.18
// flight_km     0.20
// kWh_grid      0.40
// gas_therm     5.30
// beef_kg       27
// dairy_kg      3.2
// pork_kg       7.5
// poultry_kg    6.0
// fish_kg       4.5
// veg_kg        0.8
// shopping$     0.4 (very rough)
// electronics$  0.5

const CATS = [
  { key: 'car',     name: 'Car driving (km/yr)',           factor: 0.00018, max: 30000, step: 100 },
  { key: 'flights', name: 'Flights (km/yr)',                factor: 0.00020, max: 30000, step: 100 },
  { key: 'elec',    name: 'Electricity (kWh/yr)',           factor: 0.00040, max: 15000, step: 50 },
  { key: 'gas',     name: 'Heating (therms/yr)',            factor: 0.00530, max: 1500,  step: 5 },
  { key: 'beef',    name: 'Beef (kg/yr)',                   factor: 0.02700, max: 100,   step: 0.5 },
  { key: 'pork',    name: 'Pork / Poultry (kg/yr)',         factor: 0.00700, max: 200,   step: 0.5 },
  { key: 'dairy',   name: 'Dairy (kg/yr)',                  factor: 0.00320, max: 300,   step: 1 },
  { key: 'veg',     name: 'Vegetables / grains (kg/yr)',    factor: 0.00080, max: 800,   step: 1 },
  { key: 'shop',    name: 'Other shopping ($/yr)',          factor: 0.00040, max: 30000, step: 100 },
  { key: 'elx',     name: 'Electronics ($/yr)',             factor: 0.00050, max: 5000,  step: 25 },
];

const PRESETS = {
  'Average global': { car: 4000, flights: 1500, elec: 3000, gas: 200, beef: 9, pork: 30, dairy: 80, veg: 250, shop: 5000, elx: 300 },
  'Average American': { car: 18000, flights: 5000, elec: 11000, gas: 700, beef: 26, pork: 75, dairy: 250, veg: 280, shop: 15000, elx: 1500 },
  'Average European': { car: 11000, flights: 2500, elec: 4000, gas: 350, beef: 14, pork: 60, dairy: 200, veg: 280, shop: 9000, elx: 800 },
  'Vegan, no flights': { car: 6000, flights: 0, elec: 2500, gas: 150, beef: 0, pork: 0, dairy: 0, veg: 350, shop: 4000, elx: 300 },
  '2°C target (~2t)': { car: 2000, flights: 500, elec: 1500, gas: 80, beef: 2, pork: 15, dairy: 30, veg: 300, shop: 3000, elx: 200 },
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const values = {};
  for (const c of CATS) values[c.key] = 0;
  Object.assign(values, PRESETS['Average global']);

  function totalsByCat() {
    return CATS.map((c) => ({ key: c.key, name: c.name, t: values[c.key] * c.factor })); // tons
  }
  function grandTotal() { return totalsByCat().reduce((s, x) => s + x.t, 0); }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const total = grandTotal();

    // Big total card on the left
    const cardX = 30, cardY = 30, cardW = W * 0.32, cardH = H - 60;
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(cardX, cardY, cardW, cardH);
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(cardX, cardY, cardW, cardH);

    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText('Your annual footprint', cardX + 16, cardY + 24);
    const colorTotal = total < 2 ? '#10b981' : total < 5 ? '#fbbf24' : '#ef4444';
    ctx.fillStyle = colorTotal;
    ctx.font = 'bold 56px var(--font-mono)';
    ctx.fillText(total.toFixed(2), cardX + 16, cardY + 86);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '12px var(--font-mono)';
    ctx.fillText('tons CO₂-eq / year', cardX + 16, cardY + 108);

    // benchmark gauge
    const gx = cardX + 16, gy = cardY + 140, gw = cardW - 32, gh = 14;
    ctx.fillStyle = 'rgba(120,130,150,0.2)';
    ctx.fillRect(gx, gy, gw, gh);
    const max = 25;
    ctx.fillStyle = colorTotal;
    ctx.fillRect(gx, gy, Math.min(1, total / max) * gw, gh);
    // benchmark markers
    function mark(t, label, color) {
      const x = gx + Math.min(1, t / max) * gw;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x, gy - 4); ctx.lineTo(x, gy + gh + 4); ctx.stroke();
      ctx.fillStyle = color;
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(label, x - 30, gy + gh + 16);
    }
    mark(2, '2°C target', '#10b981');
    mark(4.7, 'global avg', '#fbbf24');
    mark(16, 'US avg', '#ef4444');

    // Comparison messages
    ctx.fillStyle = '#fff';
    ctx.font = '12px var(--font-sans)';
    let msgY = cardY + 200;
    ctx.fillText(`vs global avg (4.7t):  ${(total / 4.7).toFixed(2)}×`, cardX + 16, msgY); msgY += 18;
    ctx.fillText(`vs 2°C target (2t):     ${(total / 2).toFixed(2)}×`, cardX + 16, msgY); msgY += 18;
    if (total > 2) {
      const need = total - 2;
      ctx.fillStyle = '#ef4444';
      ctx.fillText(`Need to cut ${need.toFixed(1)} t to reach the 2°C target.`, cardX + 16, msgY + 6);
    } else {
      ctx.fillStyle = '#10b981';
      ctx.fillText(`Within the 2°C-compatible budget.`, cardX + 16, msgY + 6);
    }

    // Per-category breakdown bars on the right
    const bx = cardX + cardW + 30;
    const bw = W - bx - 30;
    const barH = 26;
    const sorted = totalsByCat().slice().sort((a, b) => b.t - a.t);
    const maxBar = Math.max(...sorted.map((s) => s.t), 0.5);

    for (let i = 0; i < sorted.length; i++) {
      const s = sorted[i];
      const y = 40 + i * (barH + 8);
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      ctx.fillRect(bx, y, bw, barH);
      const frac = s.t / maxBar;
      const c = `hsl(${Math.round(120 - frac * 120)}, 70%, 50%)`;
      ctx.fillStyle = c;
      ctx.fillRect(bx, y, bw * frac, barH);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px var(--font-mono)';
      ctx.fillText(s.name, bx + 8, y + 16);
      ctx.fillStyle = '#fbbf24';
      ctx.fillText(`${s.t.toFixed(2)} t`, bx + bw - 60, y + 16);
    }
  }

  // controls
  const slidersByKey = {};
  for (const c of CATS) {
    const s = slider({ label: c.name, min: 0, max: c.max, step: c.step, value: values[c.key],
      onInput: (v) => { values[c.key] = v; } });
    ctrlPanel.appendChild(s.el);
    slidersByKey[c.key] = s;
  }
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, p] of Object.entries(PRESETS)) {
    const b = button({ label: name, onClick: () => {
      Object.assign(values, p);
      for (const k in slidersByKey) slidersByKey[k].value = values[k];
    } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(presetRow);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
