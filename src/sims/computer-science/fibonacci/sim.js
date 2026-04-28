import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const params = { n: 6, memoize: false };

  // Build the call tree
  function buildTree(n, memo, callCount) {
    callCount.count++;
    const node = { n, value: 0, children: [], cached: false };
    if (params.memoize && memo.has(n)) {
      node.cached = true;
      node.value = memo.get(n);
      return node;
    }
    if (n < 2) {
      node.value = n;
    } else {
      const left = buildTree(n - 1, memo, callCount);
      const right = buildTree(n - 2, memo, callCount);
      node.children = [left, right];
      node.value = left.value + right.value;
    }
    if (params.memoize) memo.set(n, node.value);
    return node;
  }

  function layout(node, depth = 0, leftBound = 0) {
    // compute width recursively
    if (node.children.length === 0 || node.cached) {
      node.x = leftBound + 0.5;
      node.depth = depth;
      return 1;
    }
    let total = 0;
    for (const c of node.children) {
      const w = layout(c, depth + 1, leftBound + total);
      total += w;
    }
    node.x = (node.children[0].x + node.children[node.children.length - 1].x) / 2;
    node.depth = depth;
    return total;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const memo = new Map();
    const cc = { count: 0 };
    const tree = buildTree(params.n, memo, cc);
    const totalLeaves = layout(tree);

    const padX = 30, padY = 50;
    const gW = W - padX * 2;
    const maxDepth = Math.max(1, params.n);
    const yStep = (H - padY * 2) / (maxDepth + 1);
    const xStep = gW / Math.max(1, totalLeaves);

    function pos(node) {
      return { x: padX + (node.x) * xStep, y: padY + node.depth * yStep };
    }

    // edges
    function drawEdges(node) {
      const p = pos(node);
      for (const c of node.children) {
        const cp = pos(c);
        ctx.strokeStyle = c.cached ? '#10b981' : 'rgba(120,130,150,0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y); ctx.lineTo(cp.x, cp.y);
        ctx.stroke();
        drawEdges(c);
      }
    }
    drawEdges(tree);

    // nodes
    function drawNodes(node) {
      const p = pos(node);
      const isLeaf = node.children.length === 0;
      ctx.fillStyle = node.cached ? '#10b981' : isLeaf ? '#fbbf24' : '#0ea5e9';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 10px var(--font-mono)';
      ctx.textAlign = 'center';
      ctx.fillText(`${node.n}`, p.x, p.y + 3);
      ctx.textAlign = 'left';
      for (const c of node.children) drawNodes(c);
    }
    drawNodes(tree);

    // info
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 320, 36);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`fib(${params.n}) = ${tree.value}    calls: ${cc.count}    ${params.memoize ? '(memoized)' : '(naive)'}`, 16, 28);
    ctx.font = '10px var(--font-mono)';
    ctx.fillStyle = '#10b981';
    ctx.fillText('green = cached hit', 16, 44);

    // Compare row
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-mono)';
    const naive = naiveCount(params.n);
    const memoCount = params.n + 1;
    ctx.fillText(`naive ≈ ${naive}    memoized = ${memoCount}    iterative = ${params.n}`, 16, H - 12);
  }

  function naiveCount(n) {
    if (n < 2) return 1;
    return 1 + naiveCount(n - 1) + naiveCount(n - 2);
  }

  // controls
  const nS = slider({ label: 'n', min: 0, max: 12, step: 1, value: params.n,
    onInput: (v) => { params.n = v; } });
  const mSel = select({
    label: 'Mode',
    options: [{ value: 'naive', label: 'Naive recursion' }, { value: 'memo', label: 'With memoization' }],
    value: 'naive',
    onChange: (v) => { params.memoize = v === 'memo'; },
  });
  ctrlPanel.append(nS.el, mSel.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
