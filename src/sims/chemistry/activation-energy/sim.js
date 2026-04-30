import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';

const R = 8.314; // J/(mol·K)

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    Ea: 50,        // kJ/mol
    deltaH: -30,   // kJ/mol (negative = exothermic)
    T: 298,        // K
    A: 1e10,       // 1/s prefactor
    catalyst: false,
    catReduction: 30, // kJ/mol reduction when catalyst present
  };

  function effEa() { return Math.max(5, params.Ea - (params.catalyst ? params.catReduction : 0)); }
  function rate() {
    return params.A * Math.exp(-effEa() * 1000 / (R * params.T));
  }

  let chartRect = null;

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 60, padY = 50;
    const w = W - padX - 30, h = H - padY - 80;
    chartRect = { x: padX, y: padY, w, h };
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(padX, padY, w, h);

    // Energy axis: y, with 0 at reactant level
    const Ymin = -80, Ymax = 120;
    const x2 = (xx) => padX + xx * w;     // 0..1 horizontal extent
    const y2 = (E) => padY + h - ((E - Ymin) / (Ymax - Ymin)) * h;

    // Reactant plateau, peak (transition state), product plateau
    const xR = 0.15, xT = 0.5, xP = 0.85;
    const yR = 0;
    const yT = effEa();
    const yP = params.deltaH;

    // Reactant→peak→product curve
    function curve(x) {
      if (x < xR) return yR;
      if (x < xT) {
        const t = (x - xR) / (xT - xR);
        return yR + (yT - yR) * (1 - Math.cos(t * Math.PI)) / 2;
      }
      if (x < xP) {
        const t = (x - xT) / (xP - xT);
        return yT + (yP - yT) * (1 - Math.cos(t * Math.PI)) / 2;
      }
      return yP;
    }

    // No-catalyst reference
    if (params.catalyst) {
      ctx.strokeStyle = 'rgba(120,130,150,0.5)';
      ctx.setLineDash([3, 3]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i <= 200; i++) {
        const x = i / 200;
        let yT2 = params.Ea;
        let yE;
        if (x < xR) yE = yR;
        else if (x < xT) { const t = (x - xR) / (xT - xR); yE = yR + (yT2 - yR) * (1 - Math.cos(t * Math.PI)) / 2; }
        else if (x < xP) { const t = (x - xT) / (xP - xT); yE = yT2 + (yP - yT2) * (1 - Math.cos(t * Math.PI)) / 2; }
        else yE = yP;
        const sx = x2(x), sy = y2(yE);
        if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Catalyzed (or original) curve
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const x = i / 200;
      const sx = x2(x), sy = y2(curve(x));
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // Annotations
    ctx.fillStyle = '#0ea5e9';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText('Reactants', x2(xR) - 30, y2(yR) - 8);
    ctx.fillText('Products', x2(xP) - 30, y2(yP) - 8);
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('Transition state', x2(xT) - 50, y2(yT) - 10);

    // Eₐ arrow
    const cx = x2(0.32);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, y2(yR)); ctx.lineTo(cx, y2(yT));
    ctx.stroke();
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 11px var(--font-mono)';
    ctx.fillText(`Eₐ = ${effEa().toFixed(1)} kJ/mol`, cx + 6, (y2(yR) + y2(yT)) / 2);
    // ΔH arrow
    const dhX = x2(0.7);
    ctx.strokeStyle = '#a855f7';
    ctx.beginPath();
    ctx.moveTo(dhX, y2(yR)); ctx.lineTo(dhX, y2(yP));
    ctx.stroke();
    ctx.fillStyle = '#a855f7';
    ctx.fillText(`ΔH = ${params.deltaH.toFixed(1)} kJ/mol`, dhX + 6, (y2(yR) + y2(yP)) / 2);

    // Header
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 380, 70);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`Reaction rate k = A·exp(−Eₐ/RT) = ${rate().toExponential(2)} s⁻¹`, 16, 28);
    ctx.fillStyle = params.catalyst ? '#10b981' : 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`T = ${params.T} K   Eₐ_eff = ${effEa().toFixed(1)} kJ/mol${params.catalyst ? ' (catalyzed)' : ''}`, 16, 48);
    ctx.fillStyle = params.deltaH > 0 ? '#ef4444' : '#10b981';
    ctx.fillText(params.deltaH > 0 ? 'endothermic' : 'exothermic', 16, 64);
  }

  // Drag the peak to set Ea
  const drag = dragHandle(cv.canvas, {
    hitTest(sx, sy) {
      if (!chartRect) return null;
      const x2 = (xx) => chartRect.x + xx * chartRect.w;
      const y2 = (E) => chartRect.y + chartRect.h - ((E - (-80)) / 200) * chartRect.h;
      if (Math.hypot(sx - x2(0.5), sy - y2(effEa())) < 18) return 'peak';
      // also drag the products plateau (right side) for ΔH
      if (sx > x2(0.8) && sx < x2(0.95)) return 'product';
      return null;
    },
    onDrag(id, _sx, sy) {
      const Eval = -80 + ((chartRect.y + chartRect.h - sy) / chartRect.h) * 200;
      if (id === 'peak') {
        const newEa = Math.max(5, Eval) + (params.catalyst ? params.catReduction : 0);
        params.Ea = Math.max(5, newEa);
        eaS.value = params.Ea;
      } else if (id === 'product') {
        params.deltaH = Math.max(-80, Math.min(80, Eval));
        dhS.value = params.deltaH;
      }
    },
    cursor: 'grab',
    hoverCursor: 'grab',
  });

  // controls
  const eaS = slider({ label: 'Activation energy Eₐ (kJ/mol)', min: 10, max: 200, step: 1, value: params.Ea,
    onInput: (v) => { params.Ea = v; } });
  const dhS = slider({ label: 'ΔH (kJ/mol)', min: -80, max: 80, step: 1, value: params.deltaH,
    onInput: (v) => { params.deltaH = v; } });
  const tS = slider({ label: 'Temperature T (K)', min: 200, max: 800, step: 5, value: params.T,
    onInput: (v) => { params.T = v; } });
  const catT = toggle({ label: 'Catalyst (lowers Eₐ)', value: params.catalyst, onChange: (v) => { params.catalyst = v; } });

  ctrlPanel.append(eaS.el, dhS.el, tS.el, catT.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
