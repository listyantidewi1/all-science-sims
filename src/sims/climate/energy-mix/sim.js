import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

// Ballpark numbers per source (illustrative, not policy-grade):
//   co2:   gCO2-eq per kWh (lifecycle estimate)
//   cost:  $/MWh average levelized cost (USD)
//   relIn: reliability "score" — how dispatchable / firm this source is alone (0–1)
const SOURCES = [
  { id: 'coal',    name: 'Coal',    color: '#475569', co2: 820, cost: 80,  relIn: 1.00 },
  { id: 'gas',     name: 'Natural gas', color: '#94a3b8', co2: 490, cost: 60,  relIn: 1.00 },
  { id: 'nuclear', name: 'Nuclear', color: '#a78bfa', co2: 12,  cost: 95,  relIn: 1.00 },
  { id: 'hydro',   name: 'Hydro',   color: '#0ea5e9', co2: 24,  cost: 50,  relIn: 0.85 },
  { id: 'wind',    name: 'Wind',    color: '#22d3ee', co2: 11,  cost: 45,  relIn: 0.40 },
  { id: 'solar',   name: 'Solar',   color: '#fbbf24', co2: 45,  cost: 40,  relIn: 0.30 },
];

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  // Initialize roughly to global 2023 mix.
  const mix = {
    coal: 0.36, gas: 0.22, nuclear: 0.10, hydro: 0.15, wind: 0.08, solar: 0.06,
  };

  function normalize() {
    let s = 0;
    for (const k in mix) s += mix[k];
    if (s <= 0) { mix.coal = 1; return; }
    for (const k in mix) mix[k] /= s;
  }
  normalize();

  function metrics() {
    let co2 = 0, cost = 0;
    for (const src of SOURCES) {
      co2  += mix[src.id] * src.co2;
      cost += mix[src.id] * src.cost;
    }
    // Reliability: weighted mean of intrinsic reliability, but variable sources
    // (rel < 0.5) impose a quadratic penalty as their share rises.
    let rel = 0;
    for (const src of SOURCES) rel += mix[src.id] * src.relIn;
    const variableShare = mix.wind + mix.solar;
    const penalty = Math.pow(Math.max(0, variableShare - 0.30), 2) * 1.5;
    rel = Math.max(0, rel - penalty);
    return { co2, cost, rel };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 30;
    // Stacked horizontal bar of mix
    const barY = 40, barH = 40, barW = W - padX * 2;
    let x = padX;
    for (const src of SOURCES) {
      const w = mix[src.id] * barW;
      ctx.fillStyle = src.color;
      ctx.fillRect(x, barY, w, barH);
      if (w > 30) {
        ctx.fillStyle = '#0b1220';
        ctx.font = 'bold 11px var(--font-mono)';
        ctx.fillText(`${(mix[src.id] * 100).toFixed(0)}%`, x + 4, barY + 25);
      }
      x += w;
    }
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.strokeRect(padX, barY, barW, barH);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText('Electricity mix (drag the sliders below to allocate)', padX, 28);

    // Legend dots row
    let lx = padX, ly = barY + barH + 20;
    for (const src of SOURCES) {
      ctx.fillStyle = src.color;
      ctx.fillRect(lx, ly - 8, 14, 14);
      ctx.fillStyle = '#fff';
      ctx.font = '11px var(--font-sans)';
      ctx.fillText(src.name, lx + 20, ly + 3);
      lx += 100;
    }

    // Three big metric cards
    const m = metrics();
    const cardY = barY + barH + 60;
    const cardW = (W - padX * 2 - 20) / 3;
    const cardH = H - cardY - 30;

    function card(i, label, value, unit, color, frac, max, target) {
      const x0 = padX + i * (cardW + 10);
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      ctx.fillRect(x0, cardY, cardW, cardH);
      ctx.strokeStyle = 'rgba(120,130,150,0.3)';
      ctx.strokeRect(x0, cardY, cardW, cardH);

      ctx.fillStyle = 'rgba(120,130,150,0.85)';
      ctx.font = 'bold 12px var(--font-sans)';
      ctx.fillText(label, x0 + 12, cardY + 20);
      ctx.fillStyle = color;
      ctx.font = 'bold 28px var(--font-mono)';
      ctx.fillText(value, x0 + 12, cardY + 56);
      ctx.fillStyle = 'rgba(120,130,150,0.85)';
      ctx.font = '11px var(--font-mono)';
      ctx.fillText(unit, x0 + 12, cardY + 72);

      // gauge bar
      const gx = x0 + 12, gy = cardY + cardH - 28, gw = cardW - 24, gh = 12;
      ctx.fillStyle = 'rgba(120,130,150,0.2)';
      ctx.fillRect(gx, gy, gw, gh);
      ctx.fillStyle = color;
      ctx.fillRect(gx, gy, frac * gw, gh);
      // target marker
      if (target != null) {
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(gx + target * gw, gy - 2);
        ctx.lineTo(gx + target * gw, gy + gh + 2);
        ctx.stroke();
      }
      ctx.fillStyle = 'rgba(120,130,150,0.85)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`max ${max}`, gx + gw - 50, gy - 4);
    }

    card(0, 'CO₂ intensity',
         m.co2.toFixed(0), 'gCO₂-eq / kWh',
         m.co2 < 100 ? '#10b981' : m.co2 < 400 ? '#fbbf24' : '#ef4444',
         Math.min(1, m.co2 / 820), '820 (all-coal)', 0.05);
    card(1, 'Average cost',
         `$${m.cost.toFixed(0)}`, 'USD / MWh',
         m.cost < 60 ? '#10b981' : m.cost < 80 ? '#fbbf24' : '#ef4444',
         Math.min(1, m.cost / 100), '$100 (high)');
    card(2, 'Reliability',
         (m.rel * 100).toFixed(0) + '%', 'firm-power score',
         m.rel > 0.85 ? '#10b981' : m.rel > 0.65 ? '#fbbf24' : '#ef4444',
         m.rel, 'higher is better', 0.85);
  }

  // Sliders for each source
  const sliders = {};
  for (const src of SOURCES) {
    sliders[src.id] = slider({
      label: `${src.name} share`, min: 0, max: 1, step: 0.01, value: mix[src.id], format: (v) => `${(v * 100).toFixed(0)}%`,
      onInput: (v) => {
        mix[src.id] = v;
        // Don't auto-normalize — the user sees the unnormalized value but draw normalizes.
        // Actually we DO need to normalize for the displayed bar to add to 100%.
        normalize();
        for (const s2 of SOURCES) sliders[s2.id].value = mix[s2.id];
      },
    });
    ctrlPanel.appendChild(sliders[src.id].el);
  }

  // presets
  const presets = {
    'All coal':       { coal: 1, gas: 0, nuclear: 0, hydro: 0, wind: 0, solar: 0 },
    'Today (global)': { coal: 0.36, gas: 0.22, nuclear: 0.10, hydro: 0.15, wind: 0.08, solar: 0.06 },
    'Nordic-like':    { coal: 0, gas: 0.05, nuclear: 0.30, hydro: 0.55, wind: 0.07, solar: 0.03 },
    'All renewable':  { coal: 0, gas: 0, nuclear: 0, hydro: 0.30, wind: 0.40, solar: 0.30 },
    '2050 target':    { coal: 0, gas: 0.05, nuclear: 0.20, hydro: 0.20, wind: 0.30, solar: 0.25 },
  };
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, p] of Object.entries(presets)) {
    const b = button({ label: name, onClick: () => {
      Object.assign(mix, p);
      normalize();
      for (const s2 of SOURCES) sliders[s2.id].value = mix[s2.id];
    } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(presetRow);

  // Lab — record CO2/cost/reliability tradeoffs.
  const lab = labPanel({
    title: 'Energy mix lab — the CO₂ / cost / reliability trilemma',
    filename: 'energy-mix-lab.csv',
    columns: [
      { key: 'scenario', label: 'scenario' },
      { key: 'co2',  label: 'CO₂ (g/kWh)', format: (v) => v.toFixed(0) },
      { key: 'cost', label: '$/MWh',       format: (v) => v.toFixed(0) },
      { key: 'rel',  label: 'reliability', format: (v) => (v * 100).toFixed(0) + '%' },
    ],
    procedure: [
      'Click "All coal". Record. Cheap, reliable, but very high CO₂.',
      'Click "Today (global)". Record. Lower CO₂ than coal, mixed.',
      '"Nordic-like" preset: hydro + nuclear → very low CO₂ AND high reliability.',
      '"All renewable" (wind+solar mostly) — lowest CO₂ but reliability collapses (variable).',
      '"2050 target" — balanced: CO₂ low, reliability decent, cost moderate.',
      'Build your own mix — try to beat the 2050 target on CO₂ and reliability simultaneously.',
    ],
    predict: 'You want low CO₂ AND high reliability. Pick three sources to dominate your mix.',
    source: () => {
      const m = metrics();
      return {
        scenario: 'custom',
        co2: m.co2,
        cost: m.cost,
        rel: m.rel,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
