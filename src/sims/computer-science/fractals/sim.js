import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 1 });

  const params = {
    kind: 'sierpinski',
    depth: 5,
    angle: 25,        // degrees, for tree
    lengthFactor: 0.7,
  };

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#a78bfa';
    ctx.fillStyle = '#a78bfa';

    if (params.kind === 'sierpinski') drawSierpinski(ctx, W, H);
    else if (params.kind === 'koch') drawKoch(ctx, W, H);
    else if (params.kind === 'tree') drawTree(ctx, W, H);
    else if (params.kind === 'cantor') drawCantor(ctx, W, H);

    // info
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 220, 28);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-sans)';
    let count = 0;
    if (params.kind === 'sierpinski') count = Math.pow(3, params.depth);
    else if (params.kind === 'koch') count = 3 * Math.pow(4, params.depth);
    else if (params.kind === 'tree') count = Math.pow(2, params.depth + 1) - 1;
    else if (params.kind === 'cantor') count = Math.pow(2, params.depth);
    ctx.fillText(`Depth: ${params.depth}    Pieces: ${count}`, 14, 26);
  }

  function drawSierpinski(ctx, W, H) {
    const margin = 30;
    const ax = margin, ay = H - margin;
    const cx = W - margin, cy = H - margin;
    const bx = (ax + cx) / 2, by = margin + 20;
    function rec(p1, p2, p3, d) {
      if (d === 0) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.closePath();
        ctx.fill();
        return;
      }
      const m12 = mid(p1, p2), m23 = mid(p2, p3), m31 = mid(p3, p1);
      rec(p1, m12, m31, d - 1);
      rec(m12, p2, m23, d - 1);
      rec(m31, m23, p3, d - 1);
    }
    rec({ x: ax, y: ay }, { x: bx, y: by }, { x: cx, y: cy }, params.depth);
  }

  function drawKoch(ctx, W, H) {
    const cx = W / 2, cy = H / 2;
    const size = Math.min(W, H) * 0.4;
    const ax = cx - size, ay = cy + size * Math.sqrt(3) / 3;
    const bx = cx + size, by = ay;
    const cx2 = cx, cy2 = cy - size * 2 * Math.sqrt(3) / 3;
    function koch(p1, p2, d) {
      if (d === 0) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        return;
      }
      const dx = p2.x - p1.x, dy = p2.y - p1.y;
      const a = { x: p1.x + dx / 3, y: p1.y + dy / 3 };
      const b = { x: p1.x + 2 * dx / 3, y: p1.y + 2 * dy / 3 };
      // peak: rotate (b - a) by -60° and add to a
      const rx = (b.x - a.x) * Math.cos(-Math.PI / 3) - (b.y - a.y) * Math.sin(-Math.PI / 3);
      const ry = (b.x - a.x) * Math.sin(-Math.PI / 3) + (b.y - a.y) * Math.cos(-Math.PI / 3);
      const peak = { x: a.x + rx, y: a.y + ry };
      koch(p1, a, d - 1);
      koch(a, peak, d - 1);
      koch(peak, b, d - 1);
      koch(b, p2, d - 1);
    }
    ctx.lineWidth = 1.5;
    koch({ x: ax, y: ay }, { x: bx, y: by }, params.depth);
    koch({ x: bx, y: by }, { x: cx2, y: cy2 }, params.depth);
    koch({ x: cx2, y: cy2 }, { x: ax, y: ay }, params.depth);
  }

  function drawTree(ctx, W, H) {
    const startX = W / 2, startY = H - 20;
    const length = H * 0.28;
    function branch(x, y, len, angle, d) {
      if (d === 0 || len < 1) return;
      const x2 = x + Math.cos(angle) * len;
      const y2 = y + Math.sin(angle) * len;
      ctx.strokeStyle = `hsl(${280 - d * 18}, 60%, ${30 + d * 6}%)`;
      ctx.lineWidth = Math.max(0.5, d * 0.6);
      ctx.beginPath();
      ctx.moveTo(x, y); ctx.lineTo(x2, y2);
      ctx.stroke();
      const ang = params.angle * Math.PI / 180;
      branch(x2, y2, len * params.lengthFactor, angle - ang, d - 1);
      branch(x2, y2, len * params.lengthFactor, angle + ang, d - 1);
    }
    branch(startX, startY, length, -Math.PI / 2, params.depth);
  }

  function drawCantor(ctx, W, H) {
    const margin = 30;
    function rec(x, y, len, d) {
      ctx.fillStyle = '#a78bfa';
      ctx.fillRect(x, y, len, 6);
      if (d === 0 || len < 2) return;
      rec(x, y + 14, len / 3, d - 1);
      rec(x + 2 * len / 3, y + 14, len / 3, d - 1);
    }
    rec(margin, margin, W - margin * 2, params.depth);
  }

  function mid(a, b) { return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }; }

  // controls
  const kindSel = select({
    label: 'Fractal',
    options: [
      { value: 'sierpinski', label: 'Sierpinski triangle' },
      { value: 'koch', label: 'Koch snowflake' },
      { value: 'tree', label: 'Fractal tree' },
      { value: 'cantor', label: 'Cantor set' },
    ],
    value: params.kind,
    onChange: (v) => { params.kind = v; },
  });
  const depthS = slider({ label: 'Depth', min: 0, max: 8, step: 1, value: params.depth,
    onInput: (v) => { params.depth = v; } });
  const angleS = slider({ label: 'Tree branch angle (°)', min: 5, max: 60, step: 1, value: params.angle,
    onInput: (v) => { params.angle = v; } });
  const lenS = slider({ label: 'Tree length factor', min: 0.4, max: 0.85, step: 0.01, value: params.lengthFactor, format: (v) => v.toFixed(2),
    onInput: (v) => { params.lengthFactor = v; } });

  ctrlPanel.append(kindSel.el, depthS.el, angleS.el, lenS.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
