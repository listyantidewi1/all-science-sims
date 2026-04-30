import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

const SUBSTANCES = {
  water:    { name: 'Water',    c: 4.184 },
  iron:     { name: 'Iron',     c: 0.449 },
  copper:   { name: 'Copper',   c: 0.385 },
  aluminum: { name: 'Aluminum', c: 0.897 },
  lead:     { name: 'Lead',     c: 0.129 },
  mercury:  { name: 'Mercury',  c: 0.140 },
  ethanol:  { name: 'Ethanol',  c: 2.46 },
  air:      { name: 'Air',      c: 1.005 },
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    sub1: 'iron',
    m1: 100,    // g (hot)
    T1: 200,    // °C
    sub2: 'water',
    m2: 200,    // g (cool)
    T2: 20,     // °C
    running: true,
  };

  let state = { T1: 200, T2: 20, t: 0 };
  function reset() { state = { T1: params.T1, T2: params.T2, t: 0 }; }
  reset();

  function step(dt) {
    if (!params.running) return;
    // Newton-style coupling — both temperatures relax toward the equilibrium temperature.
    // Q1 = -Q2 instantaneous: dT1/dt = -k (T1 - Tf), dT2/dt = -k (T2 - Tf)
    // where Tf = (m1 c1 T1 + m2 c2 T2) / (m1 c1 + m2 c2).
    const c1 = SUBSTANCES[params.sub1].c;
    const c2 = SUBSTANCES[params.sub2].c;
    const Tf = (params.m1 * c1 * state.T1 + params.m2 * c2 * state.T2) / (params.m1 * c1 + params.m2 * c2);
    const k = 1.5;
    state.T1 += -k * (state.T1 - Tf) * dt;
    state.T2 += -k * (state.T2 - Tf) * dt;
    state.t += dt;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 30;
    const cupY = 80;
    const cupH = H - cupY - 100;
    const cupW = (W - padX * 3) / 2;

    drawCup(ctx, padX,             cupY, cupW, cupH, params.sub1, params.m1, state.T1, params.T1, '#ef4444');
    drawCup(ctx, padX * 2 + cupW,  cupY, cupW, cupH, params.sub2, params.m2, state.T2, params.T2, '#0ea5e9');

    // Predicted equilibrium
    const c1 = SUBSTANCES[params.sub1].c;
    const c2 = SUBSTANCES[params.sub2].c;
    const Tf = (params.m1 * c1 * params.T1 + params.m2 * c2 * params.T2) / (params.m1 * c1 + params.m2 * c2);

    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 60);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-mono)';
    ctx.fillText(`Predicted T_f = ${Tf.toFixed(2)} °C`, 16, 28);
    ctx.font = '11px var(--font-mono)';
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.fillText(`(m₁ c₁ T₁ + m₂ c₂ T₂) / (m₁ c₁ + m₂ c₂)`, 16, 46);
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(`Live: T₁ = ${state.T1.toFixed(1)} °C, T₂ = ${state.T2.toFixed(1)} °C`, 16, 62);

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Both objects are in thermal contact and exchange heat until T₁ = T₂ = T_f.', padX, H - 12);
  }

  function drawCup(ctx, x, y, w, h, subKey, m, T, T0, color) {
    const sub = SUBSTANCES[subKey];
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);

    // Heat color overlay — interpolate between blue (cold) and red (hot)
    const tNorm = Math.max(0, Math.min(1, (T - 0) / 250));
    const r = 30 + tNorm * 200;
    const g = 100 + (1 - Math.abs(tNorm - 0.5) * 2) * 80;
    const b = 200 - tNorm * 180;
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.5)`;
    ctx.fillRect(x + 1, y + 1, w - 2, h - 2);

    // Wisps suggesting heat
    if (T > 50) {
      ctx.strokeStyle = `rgba(239,68,68,${Math.min(0.5, T / 300)})`;
      ctx.lineWidth = 1.5;
      const tphase = Date.now() / 600;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(x + 30 + i * (w - 60) / 4, y + h * 0.3);
        for (let j = 0; j < 8; j++) {
          const ph = (tphase + i * 0.3 + j * 0.2);
          const xx = x + 30 + i * (w - 60) / 4 + Math.sin(ph) * 5;
          const yy = y + h * 0.3 - j * 8;
          ctx.lineTo(xx, yy);
        }
        ctx.stroke();
      }
    }

    // Header card
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(x + 8, y + 8, w - 16, 70);
    ctx.fillStyle = color;
    ctx.font = 'bold 16px var(--font-mono)';
    ctx.fillText(sub.name, x + 16, y + 28);
    ctx.fillStyle = '#fff';
    ctx.font = '12px var(--font-mono)';
    ctx.fillText(`mass: ${m} g`, x + 16, y + 46);
    ctx.fillText(`c = ${sub.c} J/g·°C`, x + 16, y + 62);

    // Big temperature readout
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(x + 8, y + h - 60, w - 16, 50);
    ctx.fillStyle = color;
    ctx.font = 'bold 24px var(--font-mono)';
    ctx.fillText(`${T.toFixed(1)} °C`, x + 16, y + h - 30);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`(started at ${T0.toFixed(0)} °C)`, x + 16, y + h - 14);
  }

  // controls
  function makeSubSel(label, key, slot) {
    return select({
      label, options: Object.entries(SUBSTANCES).map(([k, v]) => ({ value: k, label: `${v.name} (c=${v.c})` })),
      value: params[key],
      onChange: (v) => { params[key] = v; reset(); },
    });
  }
  const sub1Sel = makeSubSel('Hot object substance', 'sub1', 1);
  const sub2Sel = makeSubSel('Cool object substance', 'sub2', 2);
  const m1S = slider({ label: 'Hot mass (g)', min: 1, max: 1000, step: 1, value: params.m1,
    onInput: (v) => { params.m1 = v; reset(); } });
  const T1S = slider({ label: 'Hot start T (°C)', min: -50, max: 500, step: 1, value: params.T1,
    onInput: (v) => { params.T1 = v; reset(); } });
  const m2S = slider({ label: 'Cool mass (g)', min: 1, max: 1000, step: 1, value: params.m2,
    onInput: (v) => { params.m2 = v; reset(); } });
  const T2S = slider({ label: 'Cool start T (°C)', min: -50, max: 500, step: 1, value: params.T2,
    onInput: (v) => { params.T2 = v; reset(); } });
  const resetB = button({ label: 'Reset', primary: true, onClick: reset });
  ctrlPanel.append(sub1Sel.el, m1S.el, T1S.el, sub2Sel.el, m2S.el, T2S.el, row(resetB));

  // Lab — predict T_f, then run, and record the live equilibrium.
  function predictedTf() {
    const c1 = SUBSTANCES[params.sub1].c, c2 = SUBSTANCES[params.sub2].c;
    return (params.m1 * c1 * params.T1 + params.m2 * c2 * params.T2) / (params.m1 * c1 + params.m2 * c2);
  }
  const lab = labPanel({
    title: 'Calorimetry lab — heat exchange and T_f',
    filename: 'calorimetry-lab.csv',
    columns: [
      { key: 'hot',     label: 'hot' },
      { key: 'm1',      label: 'm₁ (g)',  format: (v) => v.toFixed(0) },
      { key: 'T1_0',    label: 'T₁ start (°C)', format: (v) => v.toFixed(1) },
      { key: 'cold',    label: 'cold' },
      { key: 'm2',      label: 'm₂ (g)',  format: (v) => v.toFixed(0) },
      { key: 'T2_0',    label: 'T₂ start (°C)', format: (v) => v.toFixed(1) },
      { key: 'Tf_pred', label: 'T_f predicted', format: (v) => v.toFixed(2) },
      { key: 'Tf_meas', label: 'T_f live',      format: (v) => v.toFixed(2) },
      { key: 'Q',       label: 'Q exchanged (J)', format: (v) => v.toFixed(0) },
    ],
    procedure: [
      'Set up: 100 g iron at 200 °C into 200 g water at 20 °C. Reset, wait, record.',
      'Verify Q_lost (hot) = Q_gained (cold): m₁c₁ΔT₁ = m₂c₂ΔT₂.',
      'Swap iron for aluminum (higher c). Predict T_f; record actual.',
      'Try mercury (very low c) into the same water — T_f shifts toward 20 °C.',
      'Equal substances: T_f is the mass-weighted mean of the two temperatures.',
    ],
    predict: 'Two equal-mass cups, water at 20 °C and oil at 80 °C. Will T_f be exactly 50 °C? Why or why not?',
    source: () => {
      const Q = params.m1 * SUBSTANCES[params.sub1].c * (params.T1 - state.T1);
      return {
        hot:  SUBSTANCES[params.sub1].name,
        m1:   params.m1,
        T1_0: params.T1,
        cold: SUBSTANCES[params.sub2].name,
        m2:   params.m2,
        T2_0: params.T2,
        Tf_pred: predictedTf(),
        Tf_meas: (state.T1 + state.T2) / 2,
        Q,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(Math.min(0.05, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
