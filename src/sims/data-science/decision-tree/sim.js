import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';

function gaussian() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 1 });

  const params = { dataset: 'two-blobs', maxDepth: 4, n: 60 };
  let points = [];

  function regen() {
    points = [];
    if (params.dataset === 'two-blobs') {
      for (let i = 0; i < params.n / 2; i++) {
        points.push({ x: 0.3 + gaussian() * 0.08, y: 0.3 + gaussian() * 0.08, label: 0 });
        points.push({ x: 0.7 + gaussian() * 0.08, y: 0.7 + gaussian() * 0.08, label: 1 });
      }
    } else if (params.dataset === 'four-corners') {
      for (let i = 0; i < params.n / 4; i++) {
        points.push({ x: 0.25 + gaussian() * 0.06, y: 0.25 + gaussian() * 0.06, label: 0 });
        points.push({ x: 0.75 + gaussian() * 0.06, y: 0.75 + gaussian() * 0.06, label: 0 });
        points.push({ x: 0.25 + gaussian() * 0.06, y: 0.75 + gaussian() * 0.06, label: 1 });
        points.push({ x: 0.75 + gaussian() * 0.06, y: 0.25 + gaussian() * 0.06, label: 1 });
      }
    } else if (params.dataset === 'circle') {
      for (let i = 0; i < params.n; i++) {
        const x = Math.random(), y = Math.random();
        const r = Math.hypot(x - 0.5, y - 0.5);
        points.push({ x, y, label: r < 0.25 ? 1 : 0 });
      }
    }
  }
  regen();

  function gini(pts) {
    if (pts.length === 0) return 0;
    let p1 = 0;
    for (const p of pts) if (p.label === 1) p1++;
    const f = p1 / pts.length;
    return 2 * f * (1 - f);
  }

  function bestSplit(pts) {
    let best = null;
    if (pts.length < 2) return null;
    for (const axis of ['x', 'y']) {
      const sorted = [...pts].sort((a, b) => a[axis] - b[axis]);
      for (let i = 1; i < sorted.length; i++) {
        const t = (sorted[i - 1][axis] + sorted[i][axis]) / 2;
        const left = sorted.slice(0, i);
        const right = sorted.slice(i);
        const g = (gini(left) * left.length + gini(right) * right.length) / sorted.length;
        if (best == null || g < best.g) best = { axis, t, g };
      }
    }
    return best;
  }

  function build(pts, depth) {
    if (depth === 0 || pts.length < 2 || gini(pts) === 0) {
      return { leaf: true, label: pts.filter((p) => p.label === 1).length > pts.length / 2 ? 1 : 0, count: pts.length };
    }
    const split = bestSplit(pts);
    if (!split) return { leaf: true, label: pts[0].label, count: pts.length };
    const left = pts.filter((p) => p[split.axis] < split.t);
    const right = pts.filter((p) => p[split.axis] >= split.t);
    return {
      leaf: false,
      axis: split.axis, t: split.t,
      left: build(left, depth - 1),
      right: build(right, depth - 1),
    };
  }

  function classify(node, x, y) {
    if (node.leaf) return node.label;
    const v = node.axis === 'x' ? x : y;
    return v < node.t ? classify(node.left, x, y) : classify(node.right, x, y);
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const tree = build(points, params.maxDepth);

    // Color background by classification
    const cell = 6;
    for (let sy = 0; sy < H; sy += cell) {
      for (let sx = 0; sx < W; sx += cell) {
        const x = sx / W, y = sy / H;
        const c = classify(tree, x, y);
        ctx.fillStyle = c === 1 ? 'rgba(236,72,153,0.25)' : 'rgba(14,165,233,0.25)';
        ctx.fillRect(sx, sy, cell, cell);
      }
    }

    // Draw decision boundaries (split lines)
    function drawSplits(node, x0, y0, x1, y1) {
      if (node.leaf) return;
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (node.axis === 'x') {
        const sx = node.t * W;
        ctx.moveTo(sx, y0 * H); ctx.lineTo(sx, y1 * H);
        ctx.stroke();
        drawSplits(node.left, x0, y0, node.t, y1);
        drawSplits(node.right, node.t, y0, x1, y1);
      } else {
        const sy = node.t * H;
        ctx.moveTo(x0 * W, sy); ctx.lineTo(x1 * W, sy);
        ctx.stroke();
        drawSplits(node.left, x0, y0, x1, node.t);
        drawSplits(node.right, x0, node.t, x1, y1);
      }
    }
    drawSplits(tree, 0, 0, 1, 1);

    // points
    for (const p of points) {
      ctx.fillStyle = p.label === 1 ? '#ec4899' : '#0ea5e9';
      ctx.beginPath();
      ctx.arc(p.x * W, p.y * H, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // accuracy
    let correct = 0;
    for (const p of points) if (classify(tree, p.x, p.y) === p.label) correct++;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 280, 36);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`Train accuracy: ${(correct / points.length * 100).toFixed(1)}%`, 16, 28);
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`max depth: ${params.maxDepth}    leaves: ${countLeaves(tree)}`, 16, 44);
  }

  function countLeaves(node) {
    if (node.leaf) return 1;
    return countLeaves(node.left) + countLeaves(node.right);
  }

  // controls
  const dSel = select({
    label: 'Dataset',
    options: [
      { value: 'two-blobs', label: 'Two blobs' },
      { value: 'four-corners', label: 'XOR four corners' },
      { value: 'circle', label: 'Circle in square' },
    ],
    value: params.dataset,
    onChange: (v) => { params.dataset = v; regen(); },
  });
  const dpS = slider({ label: 'Max depth', min: 1, max: 10, step: 1, value: params.maxDepth,
    onInput: (v) => { params.maxDepth = v; } });
  const nS = slider({ label: 'Number of points', min: 20, max: 300, step: 10, value: params.n,
    onInput: (v) => { params.n = v; regen(); } });
  const reB = button({ label: 'Resample', primary: true, onClick: regen });

  ctrlPanel.append(dSel.el, dpS.el, nS.el, row(reB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
