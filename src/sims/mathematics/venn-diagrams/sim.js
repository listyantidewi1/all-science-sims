import { createCanvas, loop } from '../../../lib/canvas.js';
import { select, button, row } from '../../../lib/controls.js';

// Each "region" is a triple (inA, inB, inC), one of 8 (000=outside, 111=center).
// Members from the universe assigned to each.
const UNIVERSE = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const PRESETS = {
  custom: null,
  even: { name: 'Sets', desc: 'A=multiples of 2, B=multiples of 3, C=>5', test: (n) => ({ A: n % 2 === 0, B: n % 3 === 0, C: n > 5 }) },
  primes: { name: 'Sets', desc: 'A=primes, B=>5, C=odd', test: (n) => ({ A: [2,3,5,7,11].includes(n), B: n > 5, C: n % 2 === 1 }) },
};

const OPS = {
  none: 'none',
  AandB: 'A ∩ B',
  AorB: 'A ∪ B',
  AminusB: 'A − B',
  AsymB: 'A △ B (symmetric difference)',
  AandBandC: 'A ∩ B ∩ C',
  AorBorC: 'A ∪ B ∪ C',
  notA: 'Aᶜ (complement)',
  AminusBC: 'A − (B ∪ C)',
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { presetKey: 'even', op: 'AandB' };

  function preset() { return PRESETS[params.presetKey]; }

  function membersInRegion(a, b, c) {
    const out = [];
    const p = preset();
    for (const s of UNIVERSE) {
      const n = Number(s);
      const t = p.test(n);
      if (t.A === a && t.B === b && t.C === c) out.push(s);
    }
    return out;
  }

  function inOp(memberFlags) {
    const { A, B, C } = memberFlags;
    switch (params.op) {
      case 'AandB':    return A && B;
      case 'AorB':     return A || B;
      case 'AminusB':  return A && !B;
      case 'AsymB':    return (A && !B) || (B && !A);
      case 'AandBandC': return A && B && C;
      case 'AorBorC':  return A || B || C;
      case 'notA':     return !A;
      case 'AminusBC': return A && !B && !C;
      default:          return false;
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Universe rectangle
    const padX = 50, padY = 70;
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.fillRect(padX, padY, W - padX * 2, H - padY * 2);
    ctx.strokeStyle = 'rgba(120,130,150,0.5)';
    ctx.strokeRect(padX, padY, W - padX * 2, H - padY * 2);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText('Universe U', padX + 8, padY - 6);

    // Three circles
    const cx = W / 2, cy = H / 2;
    const r = Math.min(W, H) * 0.20;
    const dx = r * 0.7;
    const dy = r * 0.5;
    const A = { x: cx - dx, y: cy - dy, r, label: 'A' };
    const B = { x: cx + dx, y: cy - dy, r, label: 'B' };
    const C = { x: cx, y: cy + dy * 1.5, r, label: 'C' };

    // Highlight regions in op
    for (let bits = 1; bits < 8; bits++) {
      const inA = !!(bits & 4), inB = !!(bits & 2), inC = !!(bits & 1);
      if (!inOp({ A: inA, B: inB, C: inC })) continue;
      // Draw a region by clipping to the appropriate combination.
      ctx.save();
      ctx.beginPath();
      ctx.arc(A.x, A.y, A.r, 0, Math.PI * 2); ctx.arc(B.x, B.y, B.r, 0, Math.PI * 2); ctx.arc(C.x, C.y, C.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(251,191,36,0.25)';
      ctx.fill('evenodd');
      ctx.restore();
    }
    // Cleanest method: paint regions by sampling pixels — overkill. Instead,
    // visually approximate by stroking circle outlines + showing inOp regions
    // via re-drawing each region's text. We re-render the highlight more carefully:
    paintRegions(ctx, A, B, C);

    // Circle outlines
    drawCircle(ctx, A, '#0ea5e9');
    drawCircle(ctx, B, '#10b981');
    drawCircle(ctx, C, '#ec4899');

    // Members in each region
    function placeMembers(inA, inB, inC) {
      const list = membersInRegion(inA, inB, inC);
      if (list.length === 0) return;
      const center = regionCenter(A, B, C, inA, inB, inC);
      ctx.fillStyle = inOp({ A: inA, B: inB, C: inC }) ? '#fbbf24' : '#fff';
      ctx.font = 'bold 11px var(--font-mono)';
      ctx.textAlign = 'center';
      ctx.fillText(list.join(', '), center.x, center.y);
      ctx.textAlign = 'left';
    }
    for (let bits = 0; bits < 8; bits++) {
      placeMembers(!!(bits & 4), !!(bits & 2), !!(bits & 1));
    }

    // Header
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, W - 16, 50);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-mono)';
    ctx.fillText(`Operation: ${OPS[params.op]}`, 16, 30);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(preset().desc, 16, 48);
  }

  function paintRegions(ctx, A, B, C) {
    // Approximate fill by sampling a low-res grid and painting cells where inOp is true.
    const W = cv.width, H = cv.height;
    const step = 4;
    for (let y = 60; y < H - 50; y += step) {
      for (let x = 30; x < W - 30; x += step) {
        const inA = (x - A.x) ** 2 + (y - A.y) ** 2 < A.r * A.r;
        const inB = (x - B.x) ** 2 + (y - B.y) ** 2 < B.r * B.r;
        const inC = (x - C.x) ** 2 + (y - C.y) ** 2 < C.r * C.r;
        if (inOp({ A: inA, B: inB, C: inC })) {
          ctx.fillStyle = 'rgba(251,191,36,0.22)';
          ctx.fillRect(x, y, step, step);
        }
      }
    }
  }

  function drawCircle(ctx, c, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.font = 'bold 16px var(--font-mono)';
    ctx.fillText(c.label, c.x - c.r * 0.85, c.y - c.r * 0.85);
  }

  function regionCenter(A, B, C, inA, inB, inC) {
    // Manual placement of region centers for readability.
    if (inA && inB && inC) return { x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 };
    if (inA && inB && !inC) return { x: (A.x + B.x) / 2, y: A.y - 6 };
    if (inA && !inB && inC) return { x: (A.x + C.x) / 2 - 8, y: (A.y + C.y) / 2 + 6 };
    if (!inA && inB && inC) return { x: (B.x + C.x) / 2 + 8, y: (B.y + C.y) / 2 + 6 };
    if (inA && !inB && !inC) return { x: A.x - A.r * 0.7, y: A.y };
    if (!inA && inB && !inC) return { x: B.x + B.r * 0.7, y: B.y };
    if (!inA && !inB && inC) return { x: C.x, y: C.y + C.r * 0.7 };
    return { x: 80, y: 80 };
  }

  // controls
  const opSel = select({
    label: 'Operation',
    options: Object.entries(OPS).map(([k, v]) => ({ value: k, label: v })),
    value: params.op,
    onChange: (v) => { params.op = v; },
  });
  const presetSel = select({
    label: 'Sets',
    options: Object.entries(PRESETS).filter(([k]) => k !== 'custom').map(([k, v]) => ({ value: k, label: v.desc })),
    value: params.presetKey,
    onChange: (v) => { params.presetKey = v; },
  });
  ctrlPanel.append(opSel.el, presetSel.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
