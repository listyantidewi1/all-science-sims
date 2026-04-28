import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';

const REACTIONS = {
  combustion_methane: {
    name: 'CH₄ + 2 O₂ → CO₂ + 2 H₂O (combustion of methane)',
    reactants: [{ formula: 'CH₄', coef: 1, M: 16.04 }, { formula: 'O₂', coef: 2, M: 32.00 }],
    products:  [{ formula: 'CO₂', coef: 1, M: 44.01 }, { formula: 'H₂O', coef: 2, M: 18.02 }],
    colors: ['#0ea5e9', '#10b981', '#fbbf24', '#0284c7'],
  },
  ammonia: {
    name: 'N₂ + 3 H₂ → 2 NH₃ (Haber)',
    reactants: [{ formula: 'N₂', coef: 1, M: 28.02 }, { formula: 'H₂', coef: 3, M: 2.02 }],
    products:  [{ formula: 'NH₃', coef: 2, M: 17.03 }],
    colors: ['#a855f7', '#f97316', '#10b981'],
  },
  burnMg: {
    name: '2 Mg + O₂ → 2 MgO (burning magnesium)',
    reactants: [{ formula: 'Mg', coef: 2, M: 24.31 }, { formula: 'O₂', coef: 1, M: 32.00 }],
    products:  [{ formula: 'MgO', coef: 2, M: 40.30 }],
    colors: ['#94a3b8', '#10b981', '#fbbf24'],
  },
  rust: {
    name: '4 Fe + 3 O₂ → 2 Fe₂O₃ (rusting)',
    reactants: [{ formula: 'Fe', coef: 4, M: 55.85 }, { formula: 'O₂', coef: 3, M: 32.00 }],
    products:  [{ formula: 'Fe₂O₃', coef: 2, M: 159.69 }],
    colors: ['#a16207', '#10b981', '#dc2626'],
  },
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    rxnKey: 'combustion_methane',
    grams: [10, 30],
  };

  function compute() {
    const r = REACTIONS[params.rxnKey];
    const moles = r.reactants.map((rt, i) => params.grams[i] / rt.M);
    // Limiting reagent: smallest moles / coef.
    const ratios = moles.map((m, i) => m / r.reactants[i].coef);
    const minRatio = Math.min(...ratios);
    const limitingIdx = ratios.findIndex((x) => x === minRatio);
    // moles of product
    const productMoles = r.products.map((p) => p.coef * minRatio);
    const productGrams = r.products.map((p, i) => productMoles[i] * p.M);
    // leftover from non-limiting reactants
    const consumedMoles = r.reactants.map((rt) => rt.coef * minRatio);
    const leftoverMoles = moles.map((m, i) => m - consumedMoles[i]);
    const leftoverGrams = leftoverMoles.map((m, i) => Math.max(0, m * r.reactants[i].M));
    return { r, moles, ratios, limitingIdx, productMoles, productGrams, leftoverMoles, leftoverGrams };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const r = REACTIONS[params.rxnKey];
    const c = compute();

    // Top: equation
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px var(--font-sans)';
    ctx.fillText(r.name, 20, 32);

    // Reactant cards on the left, product cards on the right
    const cardY = 60;
    const cardH = H - cardY - 30;
    const reactW = (W * 0.45 - 40) / r.reactants.length;
    const prodW = (W * 0.45 - 40) / r.products.length;

    for (let i = 0; i < r.reactants.length; i++) {
      const x = 20 + i * (reactW + 10);
      drawCard(ctx, x, cardY, reactW - 10, cardH, r.reactants[i], c.moles[i], c.leftoverGrams[i], i === c.limitingIdx, r.colors[i], 'reactant', params.grams[i]);
    }
    // Arrow
    const arrowX = W * 0.5;
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 30px var(--font-sans)';
    ctx.fillText('→', arrowX - 15, H / 2);

    for (let i = 0; i < r.products.length; i++) {
      const x = W * 0.55 + i * (prodW + 10);
      drawProductCard(ctx, x, cardY, prodW - 10, cardH, r.products[i], c.productMoles[i], c.productGrams[i], r.colors[r.reactants.length + i]);
    }
  }

  function drawCard(ctx, x, y, w, h, rt, moles, leftover, isLimiting, color, kind, grams) {
    ctx.fillStyle = isLimiting ? 'rgba(239,68,68,0.18)' : 'rgba(255,255,255,0.05)';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = isLimiting ? '#ef4444' : 'rgba(120,130,150,0.4)';
    ctx.lineWidth = isLimiting ? 2 : 1;
    ctx.strokeRect(x, y, w, h);

    ctx.fillStyle = color;
    ctx.font = 'bold 22px var(--font-sans)';
    ctx.fillText(rt.formula, x + 14, y + 32);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`coef: ${rt.coef}    M = ${rt.M.toFixed(2)} g/mol`, x + 14, y + 48);

    // Bar showing relative amount (mass)
    const barY = y + 68;
    const barH = 28;
    const consumedMass = grams - leftover;
    ctx.fillStyle = color;
    const totalScale = Math.max(0.001, grams) / 100; // arbitrary scale
    const barW = w - 28;
    ctx.fillRect(x + 14, barY, barW * (consumedMass / Math.max(0.001, grams)), barH);
    ctx.fillStyle = 'rgba(120,130,150,0.4)';
    ctx.fillRect(x + 14 + barW * (consumedMass / Math.max(0.001, grams)), barY, barW * (leftover / Math.max(0.001, grams)), barH);
    ctx.strokeStyle = 'rgba(120,130,150,0.6)';
    ctx.strokeRect(x + 14, barY, barW, barH);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px var(--font-mono)';
    ctx.fillText(`consumed`, x + 16, barY + 18);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.fillText(`leftover`, x + 14 + barW - 60, barY + 18);

    let yy = barY + 50;
    ctx.fillStyle = '#fff';
    ctx.font = '12px var(--font-mono)';
    ctx.fillText(`given:    ${grams.toFixed(2)} g`, x + 14, yy); yy += 16;
    ctx.fillText(`= ${moles.toFixed(4)} mol`, x + 14, yy); yy += 16;
    if (leftover > 0.01) {
      ctx.fillStyle = '#10b981';
      ctx.fillText(`leftover: ${leftover.toFixed(2)} g`, x + 14, yy); yy += 16;
    }
    if (isLimiting) {
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 12px var(--font-mono)';
      ctx.fillText('LIMITING REAGENT', x + 14, yy + 6);
    }
  }

  function drawProductCard(ctx, x, y, w, h, p, moles, grams, color) {
    ctx.fillStyle = 'rgba(16,185,129,0.10)';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = 'rgba(16,185,129,0.6)';
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = color;
    ctx.font = 'bold 22px var(--font-sans)';
    ctx.fillText(p.formula, x + 14, y + 32);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`coef: ${p.coef}    M = ${p.M.toFixed(2)} g/mol`, x + 14, y + 48);
    let yy = y + 80;
    ctx.fillStyle = '#fff';
    ctx.font = '12px var(--font-mono)';
    ctx.fillText(`yield:    ${moles.toFixed(4)} mol`, x + 14, yy); yy += 18;
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 14px var(--font-mono)';
    ctx.fillText(`= ${grams.toFixed(2)} g`, x + 14, yy);
  }

  // controls
  const rxnSel = select({
    label: 'Reaction',
    options: Object.entries(REACTIONS).map(([k, v]) => ({ value: k, label: v.name })),
    value: params.rxnKey,
    onChange: (v) => {
      params.rxnKey = v;
      params.grams = REACTIONS[v].reactants.map((rt) => 10 * rt.coef);
      rebuildSliders();
    },
  });
  ctrlPanel.appendChild(rxnSel.el);

  const slidersWrap = document.createElement('div');
  slidersWrap.style.display = 'grid';
  slidersWrap.style.gap = 'var(--space-2)';
  ctrlPanel.appendChild(slidersWrap);

  function rebuildSliders() {
    slidersWrap.innerHTML = '';
    const r = REACTIONS[params.rxnKey];
    for (let i = 0; i < r.reactants.length; i++) {
      const s = slider({
        label: `${r.reactants[i].formula} (g)`, min: 0.5, max: 200, step: 0.5, value: params.grams[i] ?? 10, format: (v) => v.toFixed(1),
        onInput: (v) => { params.grams[i] = v; },
      });
      slidersWrap.appendChild(s.el);
    }
  }
  rebuildSliders();

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
