import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

// Generic reversible reaction: aA + bB ⇌ cC + dD
// We numerically relax concentrations toward equilibrium where Q = K.
// Effects:
//  - Adding A or B pushes Q below K → shift right
//  - Heating endothermic increases K
//  - Pressure: if total moles differ, scale concentrations and shift to side with fewer moles when pressure rises

const REACTIONS = {
  haber: {
    name: 'N₂ + 3 H₂ ⇌ 2 NH₃',
    a: 1, b: 3, c: 2, d: 0,
    species: ['N₂', 'H₂', 'NH₃', ''],
    initial: [1.0, 3.0, 0.5, 0.0],
    K0: 0.5,
    endothermic: false,
  },
  contact: {
    name: '2 SO₂ + O₂ ⇌ 2 SO₃',
    a: 2, b: 1, c: 2, d: 0,
    species: ['SO₂', 'O₂', 'SO₃', ''],
    initial: [1.0, 1.0, 0.3, 0.0],
    K0: 1.5,
    endothermic: false,
  },
  general: {
    name: 'A + B ⇌ C',
    a: 1, b: 1, c: 1, d: 0,
    species: ['A', 'B', 'C', ''],
    initial: [1.0, 1.0, 0.3, 0.0],
    K0: 2.0,
    endothermic: true,
  },
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { rxn: 'haber', T: 1.0, P: 1.0 }; // T, P relative
  let conc = [...REACTIONS.haber.initial];
  let history = [];

  function reset() {
    conc = [...REACTIONS[params.rxn].initial];
    history = [];
  }

  function K() {
    const r = REACTIONS[params.rxn];
    // Effective K: temperature shifts K (van't Hoff-like sketch)
    const dT = params.T - 1.0;
    const factor = r.endothermic ? Math.exp(2 * dT) : Math.exp(-2 * dT);
    return r.K0 * factor;
  }

  function step(dt) {
    const r = REACTIONS[params.rxn];
    const Keq = K();
    // Q = [C]^c [D]^d / [A]^a [B]^b  (skip d if 0)
    const A = Math.max(1e-6, conc[0]);
    const B = Math.max(1e-6, conc[1]);
    const C = Math.max(1e-6, conc[2]);
    const D = Math.max(1e-6, conc[3]);
    const num = Math.pow(C, r.c) * Math.pow(D, r.d);
    const den = Math.pow(A, r.a) * Math.pow(B, r.b);
    const Q = num / den;
    // Direction of shift: Q < K => forward (consume reactants, produce products); Q > K => reverse
    const drive = (Math.sign(Keq - Q)) * Math.min(0.5, Math.abs(Math.log10((Keq + 1e-6) / (Q + 1e-6)))) * dt * 0.6;
    conc[0] = Math.max(0, conc[0] - r.a * drive);
    conc[1] = Math.max(0, conc[1] - r.b * drive);
    conc[2] = Math.max(0, conc[2] + r.c * drive);
    conc[3] = Math.max(0, conc[3] + r.d * drive);
    // Pressure (gas-phase): scale all gas concentrations equally
    // Already accounted for by user pressing the pressure slider (we re-scale at slider event).

    history.push({ t: (history.length ? history[history.length - 1].t : 0) + dt, c: [...conc] });
    if (history.length > 600) history.shift();
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    const r = REACTIONS[params.rxn];

    // bars
    const padX = 30, padY = 60;
    const barAreaW = W * 0.4;
    const barW = (barAreaW - padX * 2) / r.species.filter(Boolean).length;
    const barMaxH = H - padY - 30;
    const labels = r.species.filter(Boolean);
    const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'];

    ctx.fillStyle = 'rgba(120,130,150,0.95)';
    ctx.font = 'bold 14px var(--font-sans)';
    ctx.fillText(r.name, padX, 30);
    ctx.font = '12px var(--font-sans)';
    ctx.fillText(`K(T) = ${K().toFixed(2)}`, padX, 50);

    for (let i = 0; i < labels.length; i++) {
      const x = padX + i * barW;
      const v = conc[i];
      const h = Math.min(barMaxH, v * barMaxH / 4);
      ctx.fillStyle = colors[i];
      ctx.fillRect(x, padY + barMaxH - h, barW * 0.7, h);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px var(--font-sans)';
      ctx.fillText(labels[i], x + 6, padY + barMaxH + 16);
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.font = '11px var(--font-mono)';
      ctx.fillText(v.toFixed(2), x + 6, padY + barMaxH - h - 4);
    }

    // time series (right)
    drawHistory(ctx, padX + barAreaW + 20, padY, W - barAreaW - padX * 2 - 20, barMaxH);

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Concentrations vs. time', padX + barAreaW + 20, padY - 6);
  }

  function drawHistory(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(x, y, w, h);
    if (history.length < 2) return;
    const r = REACTIONS[params.rxn];
    const labels = r.species.map((s, i) => s ? i : -1).filter((i) => i >= 0);
    const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'];
    const max = Math.max(...history.flatMap((p) => p.c), 1);
    const tEnd = history[history.length - 1].t;
    const tStart = Math.max(0, tEnd - 30);
    const x2 = (tt) => x + ((tt - tStart) / 30) * w;
    const y2 = (cc) => y + h - (cc / max) * (h - 8);
    ctx.lineWidth = 2;
    for (const i of labels) {
      ctx.strokeStyle = colors[i];
      ctx.beginPath();
      let started = false;
      for (const p of history) {
        if (p.t < tStart) continue;
        const sx = x2(p.t), sy = y2(p.c[i]);
        if (!started) { ctx.moveTo(sx, sy); started = true; } else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }
  }

  // controls
  const rxnSel = select({
    label: 'Reaction',
    options: Object.entries(REACTIONS).map(([k, v]) => ({ value: k, label: v.name + (v.endothermic ? ' (endo)' : ' (exo)') })),
    value: params.rxn,
    onChange: (v) => { params.rxn = v; reset(); },
  });
  const tS = slider({
    label: 'Temperature (relative)', min: 0.5, max: 2.0, step: 0.01, value: params.T, format: (v) => v.toFixed(2),
    onInput: (v) => { params.T = v; },
  });
  const pS = slider({
    label: 'Pressure (relative)', min: 0.5, max: 2.0, step: 0.01, value: params.P, format: (v) => v.toFixed(2),
    onInput: (v) => {
      const ratio = v / params.P;
      // increasing pressure compresses gas — scale all concentrations
      for (let i = 0; i < conc.length; i++) conc[i] *= ratio;
      params.P = v;
    },
  });
  const addRow = document.createElement('div');
  addRow.className = 'ctrl-row';
  for (let i = 0; i < 3; i++) {
    const idx = i;
    const b = button({ label: `+ ${REACTIONS.haber.species[idx]}`, onClick: () => {
      const sp = REACTIONS[params.rxn].species[idx];
      if (sp) conc[idx] += 0.5;
    } });
    // Update the button label when reaction changes
    b.el.dataset.idx = idx;
    addRow.appendChild(b.el);
  }
  function refreshAddButtons() {
    [...addRow.children].forEach((btn, i) => {
      const sp = REACTIONS[params.rxn].species[i];
      btn.textContent = sp ? `+ ${sp}` : '—';
      btn.disabled = !sp;
    });
  }
  refreshAddButtons();
  rxnSel.el.addEventListener('change', () => setTimeout(refreshAddButtons, 0));

  const resetB = button({ label: 'Reset to initial', primary: true, onClick: reset });
  ctrlPanel.append(rxnSel.el, tS.el, pS.el, addRow, row(resetB));

  // Lab — record concentrations after each stress, observe Le Chatelier shifts.
  const lab = labPanel({
    title: "Le Chatelier lab — predict the shift",
    filename: 'le-chatelier-lab.csv',
    columns: [
      { key: 'reaction', label: 'reaction' },
      { key: 'T',  label: 'T (rel)', format: (v) => v.toFixed(2) },
      { key: 'P',  label: 'P (rel)', format: (v) => v.toFixed(2) },
      { key: 's0', label: 'sp 1', format: (v) => v.toFixed(3) },
      { key: 's1', label: 'sp 2', format: (v) => v.toFixed(3) },
      { key: 's2', label: 'sp 3', format: (v) => v.toFixed(3) },
      { key: 'Q',  label: 'Q', format: (v) => v.toFixed(3) },
    ],
    procedure: [
      'Pick the Haber reaction. Wait for equilibrium, then record.',
      'Add some N₂ — equilibrium shifts right (more NH₃). Record after settling.',
      'Compress (P = 1.5) — shifts toward side with fewer moles (right, since 4 → 2). Record.',
      'Heat (T = 1.5) for an exothermic reaction — shifts left. Record.',
      'For each row, compare Q to K0 — Q approaches K, but Le Chatelier shifts the equilibrium itself.',
    ],
    predict: 'In the Haber process for ammonia, you can shift right by: (a) adding N₂, (b) high P, (c) low T (it\'s exothermic). Why is industrial ammonia made at high T anyway? (Hint: kinetics.)',
    source: () => {
      const r = REACTIONS[params.rxn];
      const Q = (Math.pow(conc[2] || 1e-9, r.c) * Math.pow(conc[3] || 1, r.d)) /
                (Math.pow(conc[0] || 1e-9, r.a) * Math.pow(conc[1] || 1, r.b));
      return {
        reaction: r.name,
        T: params.T,
        P: params.P,
        s0: conc[0],
        s1: conc[1],
        s2: conc[2],
        Q,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
