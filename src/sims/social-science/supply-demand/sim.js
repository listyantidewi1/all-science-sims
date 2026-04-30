import { createCanvas } from '../../../lib/canvas.js';
import { slider, toggle, button, row, select } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

// Demand:  P = a - b*Q     (downward sloping)
// Supply:  P = c + d*Q     (upward sloping)
// Shifts adjust intercepts a and c.

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const state = {
    a: 100, b: 1.0,    // demand
    c: 10,  d: 0.8,    // supply
    control: 'none',   // 'none' | 'ceiling' | 'floor'
    controlPrice: 50,
  };

  const Q_MAX = 100, P_MAX = 110;

  function equilibrium() {
    // a - b*Q = c + d*Q  →  Q = (a - c) / (b + d)
    const Q = (state.a - state.c) / (state.b + state.d);
    const P = state.a - state.b * Q;
    return { Q, P };
  }

  function w2sX(q, W) { return 60 + (q / Q_MAX) * (W - 80); }
  function w2sY(p, H) { return H - 50 - (p / P_MAX) * (H - 70); }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    // grid
    ctx.strokeStyle = 'rgba(120,130,150,0.25)';
    ctx.lineWidth = 1;
    for (let q = 0; q <= Q_MAX; q += 20) {
      ctx.beginPath();
      ctx.moveTo(w2sX(q, W), w2sY(0, H));
      ctx.lineTo(w2sX(q, W), w2sY(P_MAX, H));
      ctx.stroke();
    }
    for (let p = 0; p <= P_MAX; p += 20) {
      ctx.beginPath();
      ctx.moveTo(w2sX(0, W), w2sY(p, H));
      ctx.lineTo(w2sX(Q_MAX, W), w2sY(p, H));
      ctx.stroke();
    }

    // axes
    ctx.strokeStyle = 'rgba(120,130,150,0.9)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(w2sX(0, W), w2sY(0, H));
    ctx.lineTo(w2sX(Q_MAX, W), w2sY(0, H));
    ctx.moveTo(w2sX(0, W), w2sY(0, H));
    ctx.lineTo(w2sX(0, W), w2sY(P_MAX, H));
    ctx.stroke();
    ctx.fillStyle = 'rgba(120,130,150,0.9)';
    ctx.font = '12px var(--font-sans)';
    ctx.fillText('Q (quantity)', W - 100, w2sY(0, H) + 22);
    ctx.fillText('P (price)', 10, w2sY(P_MAX, H) - 4);

    // demand line: from (Q=0, P=a) to (Q=a/b, P=0)
    const demandQAtZero = state.a / state.b;
    drawLine(ctx, 0, state.a, Math.min(Q_MAX, demandQAtZero), Math.max(0, state.a - state.b * Q_MAX), '#f97316', W, H, 'D');

    // supply line: from (Q=0, P=c) to (Q=Q_MAX, P=c + d*Q_MAX)
    drawLine(ctx, 0, state.c, Q_MAX, state.c + state.d * Q_MAX, '#3b82f6', W, H, 'S');

    // equilibrium
    const eq = equilibrium();
    if (eq.Q > 0 && eq.P > 0) {
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(w2sX(eq.Q, W), w2sY(eq.P, H), 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(16,185,129,0.4)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(w2sX(eq.Q, W), w2sY(0, H));
      ctx.lineTo(w2sX(eq.Q, W), w2sY(eq.P, H));
      ctx.lineTo(w2sX(0, W), w2sY(eq.P, H));
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // price control line + labels
    if (state.control !== 'none') {
      const pc = state.controlPrice;
      ctx.strokeStyle = state.control === 'ceiling' ? '#ef4444' : '#8b5cf6';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(w2sX(0, W), w2sY(pc, H));
      ctx.lineTo(w2sX(Q_MAX, W), w2sY(pc, H));
      ctx.stroke();
      ctx.setLineDash([]);

      // qd at pc, qs at pc
      const qd = (state.a - pc) / state.b;
      const qs = (pc - state.c) / state.d;
      const binding =
        (state.control === 'ceiling' && pc < eq.P) ||
        (state.control === 'floor' && pc > eq.P);
      if (binding && qd > 0 && qs > 0) {
        const gap = state.control === 'ceiling' ? qd - qs : qs - qd;
        ctx.fillStyle = state.control === 'ceiling' ? 'rgba(239,68,68,0.18)' : 'rgba(139,92,246,0.18)';
        const x1 = w2sX(Math.min(qd, qs), W);
        const x2 = w2sX(Math.max(qd, qs), W);
        const y1 = w2sY(pc, H);
        ctx.fillRect(x1, y1 - 12, x2 - x1, 24);
        ctx.fillStyle = state.control === 'ceiling' ? '#ef4444' : '#8b5cf6';
        ctx.font = 'bold 12px var(--font-sans)';
        const label = state.control === 'ceiling' ? `Shortage: ${gap.toFixed(1)}` : `Surplus: ${gap.toFixed(1)}`;
        ctx.fillText(label, (x1 + x2) / 2 - 30, y1 - 18);
      }
    }

    // readout
    ctx.fillStyle = 'rgba(120,130,150,0.95)';
    ctx.font = '13px var(--font-sans)';
    if (eq.Q > 0 && eq.P > 0) {
      ctx.fillText(`Equilibrium:  P* = ${eq.P.toFixed(1)},  Q* = ${eq.Q.toFixed(1)}`, 12, 18);
    } else {
      ctx.fillText('No positive equilibrium under current curves.', 12, 18);
    }
  }

  function drawLine(ctx, q1, p1, q2, p2, color, W, H, label) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(w2sX(q1, W), w2sY(p1, H));
    ctx.lineTo(w2sX(q2, W), w2sY(p2, H));
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.font = 'bold 14px var(--font-sans)';
    ctx.fillText(label, w2sX(q2, W) + 4, w2sY(p2, H) + 4);
  }

  // controls
  const aS = slider({
    label: 'Demand intercept (a)', min: 30, max: 150, step: 1, value: state.a,
    onInput: (v) => { state.a = v; },
  });
  const bS = slider({
    label: 'Demand slope (b)', min: 0.3, max: 2, step: 0.05, value: state.b, format: (v) => v.toFixed(2),
    onInput: (v) => { state.b = v; },
  });
  const cS = slider({
    label: 'Supply intercept (c)', min: 0, max: 60, step: 1, value: state.c,
    onInput: (v) => { state.c = v; },
  });
  const dS = slider({
    label: 'Supply slope (d)', min: 0.2, max: 2, step: 0.05, value: state.d, format: (v) => v.toFixed(2),
    onInput: (v) => { state.d = v; },
  });
  const ctrlSel = select({
    label: 'Price control',
    options: [
      { value: 'none', label: 'None' },
      { value: 'ceiling', label: 'Price ceiling' },
      { value: 'floor', label: 'Price floor' },
    ],
    value: state.control,
    onChange: (v) => { state.control = v; },
  });
  const pcS = slider({
    label: 'Control price', min: 0, max: P_MAX, step: 1, value: state.controlPrice,
    onInput: (v) => { state.controlPrice = v; },
  });

  ctrlPanel.append(aS.el, bS.el, cS.el, dS.el, ctrlSel.el, pcS.el);

  // Lab — find equilibrium price/quantity and effect of ceiling/floor.
  const lab = labPanel({
    title: 'Supply & demand lab — equilibrium and price controls',
    filename: 'supply-demand-lab.csv',
    columns: [
      { key: 'a',  label: 'a (D intercept)' },
      { key: 'b',  label: 'b (D slope)',     format: (v) => v.toFixed(2) },
      { key: 'c',  label: 'c (S intercept)' },
      { key: 'd',  label: 'd (S slope)',     format: (v) => v.toFixed(2) },
      { key: 'Pe', label: 'P_eq',           format: (v) => v.toFixed(2) },
      { key: 'Qe', label: 'Q_eq',           format: (v) => v.toFixed(2) },
      { key: 'control', label: 'control' },
      { key: 'controlP', label: 'control $' },
    ],
    procedure: [
      'Default supply/demand. Record equilibrium (P, Q).',
      'Set price ceiling below equilibrium (e.g., $30 when Pe = $50). Shortage emerges.',
      'Set price floor above equilibrium ($70). Surplus emerges.',
      'Increase demand (a → 120). Equilibrium shifts up — both P and Q rise.',
      'Cost shock: c → 30 (supply curve shifts up). Equilibrium P rises, Q falls.',
    ],
    predict: 'A new tax raises producer cost. What happens to equilibrium price and quantity? Who pays?',
    source: () => {
      const e = equilibrium();
      return {
        a: state.a, b: state.b, c: state.c, d: state.d,
        Pe: e.P, Qe: e.Q,
        control: state.control,
        controlP: state.controlPrice,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  let raf = 0;
  const tick = () => { draw(); raf = requestAnimationFrame(tick); };
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    cv.destroy();
  };
}
