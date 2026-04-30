import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { hoverProbe, drawCrosshair } from '../../../lib/chart.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';

// Simply-supported beam, length L, point load P at position a from left support.
// Reactions: Ra = P*(L-a)/L, Rb = P*a/L
// Shear:  V(x) = Ra,        x <  a
//         V(x) = Ra - P,    x >= a
// Moment: M(x) = Ra * x,           x <= a
//         M(x) = Ra*x - P*(x - a), x >  a   (equivalent to Rb*(L-x))
// Deflection (small-deflection theory, EI constant), known closed form for point load:
//   for x <= a: w(x) = P*b*x*(L^2 - b^2 - x^2) / (6*L*EI),  where b = L - a
//   for x >  a: w(x) = P*a*(L-x)*(2*L*x - a^2 - x^2) / (6*L*EI)

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 10 });

  const params = {
    L: 6,        // beam length, m
    a: 3,        // load position from left support, m
    P: 10,       // load magnitude, kN
    EI: 5000,    // EI in kN·m² (effective stiffness)
  };

  // Layout cache populated each frame for hover/drag.
  let beam = null;   // { x, y, w, scaleX } — beam strip in CSS pixels
  let shearChart = null, momentChart = null, deflChart = null;

  function shear(x) {
    const Ra = params.P * (params.L - params.a) / params.L;
    return x < params.a ? Ra : Ra - params.P;
  }
  function moment(x) {
    const Ra = params.P * (params.L - params.a) / params.L;
    return x <= params.a ? Ra * x : Ra * x - params.P * (x - params.a);
  }
  function deflection(x) {
    const { L, a, P, EI } = params;
    const b = L - a;
    if (x <= a) {
      return -P * b * x * (L * L - b * b - x * x) / (6 * L * EI);
    }
    return -P * a * (L - x) * (2 * L * x - a * a - x * x) / (6 * L * EI);
  }

  function maxAbs(fn, samples = 200) {
    let m = 0;
    for (let i = 0; i <= samples; i++) {
      const x = (i / samples) * params.L;
      m = Math.max(m, Math.abs(fn(x)));
    }
    return m || 1;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    const padX = 50;
    const beamY = 60;
    const beamW = W - padX * 2;
    const px = (x) => padX + (x / params.L) * beamW;
    beam = { x: padX, y: beamY, w: beamW, px };

    // Beam strip
    ctx.fillStyle = '#475569';
    ctx.fillRect(padX, beamY - 8, beamW, 16);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.strokeRect(padX, beamY - 8, beamW, 16);

    // Supports — pin (left) + roller (right)
    drawPin(ctx, padX, beamY + 8);
    drawRoller(ctx, padX + beamW, beamY + 8);

    // Load arrow at x = a
    const lx = px(params.a);
    ctx.strokeStyle = '#ef4444';
    ctx.fillStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(lx, beamY - 50);
    ctx.lineTo(lx, beamY - 12);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(lx - 6, beamY - 18); ctx.lineTo(lx, beamY - 8); ctx.lineTo(lx + 6, beamY - 18);
    ctx.closePath();
    ctx.fill();
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`P = ${params.P} kN`, lx - 28, beamY - 56);

    // Three diagrams stacked below
    const slotH = (H - beamY - 40) / 3;
    const slotY1 = beamY + 30;
    const slotY2 = slotY1 + slotH;
    const slotY3 = slotY2 + slotH;

    drawDiagram(ctx, padX, slotY1, beamW, slotH - 6, shear,      maxAbs(shear),      '#0ea5e9', 'Shear V (kN)');
    shearChart  = { x: padX, y: slotY1, w: beamW, h: slotH - 6, scale: maxAbs(shear),      fn: shear,      label: 'V', unit: 'kN' };
    drawDiagram(ctx, padX, slotY2, beamW, slotH - 6, moment,     maxAbs(moment),     '#a855f7', 'Moment M (kN·m)');
    momentChart = { x: padX, y: slotY2, w: beamW, h: slotH - 6, scale: maxAbs(moment),     fn: moment,     label: 'M', unit: 'kN·m' };
    drawDiagram(ctx, padX, slotY3, beamW, slotH - 6, deflection, maxAbs(deflection), '#10b981', 'Deflection w (m)');
    deflChart   = { x: padX, y: slotY3, w: beamW, h: slotH - 6, scale: maxAbs(deflection), fn: deflection, label: 'w', unit: 'm' };

    // Hover crosshair
    const probe = hover.get();
    if (probe) drawCrosshair(ctx, probe, { bounds: probe.bounds, color: '#fbbf24', label: probe.label });

    // Hint
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag the load arrow along the beam · hover any diagram for values', padX, H - 8);
  }

  function drawDiagram(ctx, x, y, w, h, fn, scale, color, label) {
    // Background
    ctx.strokeStyle = 'rgba(120,130,150,0.25)';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, w, h);
    // Zero line
    const zy = y + h / 2;
    ctx.strokeStyle = 'rgba(120,130,150,0.5)';
    ctx.beginPath();
    ctx.moveTo(x, zy); ctx.lineTo(x + w, zy);
    ctx.stroke();

    // Filled curve
    ctx.fillStyle = color + '33';
    ctx.beginPath();
    ctx.moveTo(x, zy);
    const steps = 200;
    for (let i = 0; i <= steps; i++) {
      const xx = (i / steps) * params.L;
      const v = fn(xx);
      const py = zy - (v / scale) * (h / 2 - 4);
      ctx.lineTo(x + (i / steps) * w, py);
    }
    ctx.lineTo(x + w, zy);
    ctx.closePath();
    ctx.fill();

    // Outline
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const xx = (i / steps) * params.L;
      const v = fn(xx);
      const py = zy - (v / scale) * (h / 2 - 4);
      const sx = x + (i / steps) * w;
      if (i === 0) ctx.moveTo(sx, py); else ctx.lineTo(sx, py);
    }
    ctx.stroke();

    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText(label, x + 4, y + 12);
  }

  function drawPin(ctx, sx, sy) {
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx - 14, sy + 22);
    ctx.lineTo(sx + 14, sy + 22);
    ctx.closePath();
    ctx.fill();
    // hatching
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1;
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(sx - 14 + i * 4, sy + 22);
      ctx.lineTo(sx - 18 + i * 4, sy + 30);
      ctx.stroke();
    }
  }
  function drawRoller(ctx, sx, sy) {
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.arc(sx, sy + 8, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#64748b';
    ctx.beginPath(); ctx.moveTo(sx - 14, sy + 18); ctx.lineTo(sx + 14, sy + 18); ctx.stroke();
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(sx - 14 + i * 4, sy + 18);
      ctx.lineTo(sx - 18 + i * 4, sy + 26);
      ctx.stroke();
    }
  }

  // Hover any of the three diagrams for a (x, value) tooltip.
  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    for (const c of [shearChart, momentChart, deflChart]) {
      if (!c) continue;
      if (sx < c.x || sx > c.x + c.w || sy < c.y || sy > c.y + c.h) continue;
      const xx = ((sx - c.x) / c.w) * params.L;
      const v = c.fn(xx);
      const zy = c.y + c.h / 2;
      const py = zy - (v / c.scale) * (c.h / 2 - 4);
      return {
        x: sx, y: py,
        bounds: c,
        label: [`x = ${xx.toFixed(2)} m`, `${c.label} = ${v.toFixed(c.unit === 'm' ? 5 : 2)} ${c.unit}`],
      };
    }
    return null;
  });

  // Drag the load arrow along the beam.
  const drag = dragHandle(cv.canvas, {
    hitTest(sx, sy) {
      if (!beam) return null;
      const lx = beam.px(params.a);
      // arrow shaft is roughly from (lx, y-50) to (lx, y-8); also accept clicks on beam strip itself.
      if (Math.abs(sx - lx) < 16 && sy > beam.y - 60 && sy < beam.y + 12) return 'load';
      if (sx >= beam.x && sx <= beam.x + beam.w && sy > beam.y - 60 && sy < beam.y + 12) return 'load';
      return null;
    },
    onDrag(_id, sx) {
      const x = ((sx - beam.x) / beam.w) * params.L;
      params.a = Math.max(0.01, Math.min(params.L - 0.01, x));
      aS.value = params.a;
    },
    cursor: 'pointer',
    hoverCursor: 'grab',
  });

  // controls
  const LS = slider({ label: 'Beam length L (m)', min: 1, max: 12, step: 0.1, value: params.L, format: (v) => v.toFixed(1),
    onInput: (v) => { params.L = v; if (params.a > v) params.a = v / 2; aS.el.querySelector('input').max = v; aS.value = params.a; } });
  const aS = slider({ label: 'Load position a (m)', min: 0.01, max: params.L, step: 0.05, value: params.a, format: (v) => v.toFixed(2),
    onInput: (v) => { params.a = v; } });
  const PS = slider({ label: 'Load P (kN)', min: 1, max: 50, step: 0.5, value: params.P, format: (v) => v.toFixed(1),
    onInput: (v) => { params.P = v; } });
  const EIS = slider({ label: 'Stiffness EI (kN·m²)', min: 500, max: 50000, step: 100, value: params.EI,
    onInput: (v) => { params.EI = v; } });
  const centerB = button({ label: 'Center load', primary: true, onClick: () => { params.a = params.L / 2; aS.value = params.a; } });
  ctrlPanel.append(LS.el, aS.el, PS.el, EIS.el, row(centerB));

  // Lab — find the maximum bending moment and where it occurs.
  const lab = labPanel({
    title: 'Beam bending lab — find M_max and δ_max',
    filename: 'beam-bending-lab.csv',
    columns: [
      { key: 'L',     label: 'L (m)',  format: (v) => v.toFixed(1) },
      { key: 'a',     label: 'a (m)',  format: (v) => v.toFixed(2) },
      { key: 'P',     label: 'P (kN)', format: (v) => v.toFixed(1) },
      { key: 'M_at_a', label: 'M at load (kN·m)', format: (v) => v.toFixed(2) },
      { key: 'M_max', label: 'M_max formula',     format: (v) => v.toFixed(2) },
      { key: 'EI',   label: 'EI',     format: (v) => v.toFixed(0) },
    ],
    procedure: [
      'Set L = 6 m, P = 10 kN. Center the load (a = 3). M_max = P·L/4 = 15 kN·m. Record.',
      'Slide load to a = 1 m (off-center). Record M at the load, P·a·(L−a)/L.',
      'Try a = 4.5, a = 0.5 — note M_max is always under the load for a single point load.',
      'Plot M_max vs a — it\'s a downward parabola, max at L/2.',
      'Verify the max-deflection formula too: δ_max = P L³/(48 EI) when a = L/2.',
    ],
    predict: 'Where does the maximum moment occur for a load at a = L/4? What is its value?',
    source: () => {
      const Ra = params.P * (params.L - params.a) / params.L;
      return {
        L: params.L,
        a: params.a,
        P: params.P,
        M_at_a: Ra * params.a,
        M_max: params.P * params.a * (params.L - params.a) / params.L,
        EI: params.EI,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); hover.destroy(); drag.destroy(); cv.destroy(); };
}
