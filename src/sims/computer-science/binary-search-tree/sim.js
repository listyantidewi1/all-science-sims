import { createCanvas } from '../../../lib/canvas.js';
import { button, row } from '../../../lib/controls.js';

class Node {
  constructor(value) { this.v = value; this.l = null; this.r = null; }
}

function insert(root, v) {
  if (!root) return new Node(v);
  if (v < root.v) root.l = insert(root.l, v);
  else if (v > root.v) root.r = insert(root.r, v);
  return root;
}

function findMin(node) { while (node.l) node = node.l; return node; }

function remove(root, v) {
  if (!root) return null;
  if (v < root.v) { root.l = remove(root.l, v); return root; }
  if (v > root.v) { root.r = remove(root.r, v); return root; }
  if (!root.l) return root.r;
  if (!root.r) return root.l;
  const succ = findMin(root.r);
  root.v = succ.v;
  root.r = remove(root.r, succ.v);
  return root;
}

function* searchPath(root, v) {
  while (root) {
    yield root;
    if (v === root.v) return;
    root = v < root.v ? root.l : root.r;
  }
}

function height(n) {
  if (!n) return 0;
  return 1 + Math.max(height(n.l), height(n.r));
}

function nodeCount(n) { return n ? 1 + nodeCount(n.l) + nodeCount(n.r) : 0; }

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  let root = null;
  let highlight = new Set();
  let highlightTimer = 0;

  function layout() {
    // Compute (x, y) for each node via in-order traversal.
    const out = new Map();
    let order = 0;
    function walk(n, depth) {
      if (!n) return;
      walk(n.l, depth + 1);
      out.set(n, { order: order++, depth });
      walk(n.r, depth + 1);
    }
    walk(root, 0);
    return out;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    if (!root) {
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '14px var(--font-sans)';
      ctx.fillText('Empty tree — click Insert to add a node.', 20, 30);
      return;
    }

    const positions = layout();
    const total = positions.size || 1;
    const padX = 30;
    const yStep = 60;

    function pos(n) {
      const p = positions.get(n);
      const x = padX + ((p.order + 0.5) / total) * (W - padX * 2);
      const y = 40 + p.depth * yStep;
      return { x, y };
    }

    // edges
    ctx.strokeStyle = 'rgba(120,130,150,0.7)';
    ctx.lineWidth = 2;
    function drawEdges(n) {
      if (!n) return;
      const p = pos(n);
      if (n.l) {
        const c = pos(n.l);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(c.x, c.y);
        ctx.stroke();
        drawEdges(n.l);
      }
      if (n.r) {
        const c = pos(n.r);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(c.x, c.y);
        ctx.stroke();
        drawEdges(n.r);
      }
    }
    drawEdges(root);

    // nodes
    function drawNodes(n) {
      if (!n) return;
      const p = pos(n);
      ctx.fillStyle = highlight.has(n) ? '#f59e0b' : 'var(--subj-computer-science)';
      ctx.fillStyle = highlight.has(n) ? '#f59e0b' : '#8b5cf6';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 13px var(--font-sans)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(n.v), p.x, p.y);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
      drawNodes(n.l);
      drawNodes(n.r);
    }
    drawNodes(root);

    // stats
    ctx.fillStyle = 'rgba(120,130,150,0.95)';
    ctx.font = '13px var(--font-sans)';
    ctx.fillText(`nodes: ${nodeCount(root)}    height: ${height(root)}`, 12, 18);
  }

  function flashSearch(v) {
    highlight = new Set();
    const seen = [];
    for (const n of searchPath(root, v)) seen.push(n);
    let i = 0;
    const interval = setInterval(() => {
      if (i >= seen.length) {
        clearInterval(interval);
        // brief hold then clear
        setTimeout(() => { highlight = new Set(); draw(); }, 600);
        return;
      }
      highlight.add(seen[i]);
      draw();
      i++;
    }, 250);
  }

  // input
  const inputRow = document.createElement('div');
  inputRow.className = 'ctrl-row';
  const input = document.createElement('input');
  input.type = 'number';
  input.placeholder = 'value';
  input.style.cssText = 'background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:6px;padding:6px 8px;width:90px;color:var(--color-fg)';
  inputRow.appendChild(input);
  const insertB = button({ label: 'Insert', primary: true, onClick: () => {
    const v = Number(input.value);
    if (!Number.isFinite(v)) return;
    root = insert(root, v);
    input.value = '';
    draw();
  } });
  const searchB = button({ label: 'Search', onClick: () => {
    const v = Number(input.value);
    if (!Number.isFinite(v) || !root) return;
    flashSearch(v);
  } });
  const deleteB = button({ label: 'Delete', onClick: () => {
    const v = Number(input.value);
    if (!Number.isFinite(v) || !root) return;
    root = remove(root, v);
    input.value = '';
    draw();
  } });
  inputRow.append(insertB.el, searchB.el, deleteB.el);

  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  const sortedB = button({ label: 'Insert sorted 1..7', onClick: () => {
    root = null; for (let i = 1; i <= 7; i++) root = insert(root, i); draw();
  } });
  const balancedB = button({ label: 'Insert balanced 1..7', onClick: () => {
    root = null; for (const v of [4, 2, 6, 1, 3, 5, 7]) root = insert(root, v); draw();
  } });
  const randomB = button({ label: 'Random 10', onClick: () => {
    root = null;
    for (let i = 0; i < 10; i++) root = insert(root, Math.floor(Math.random() * 99) + 1);
    draw();
  } });
  const clearB = button({ label: 'Clear', onClick: () => { root = null; draw(); } });
  presetRow.append(sortedB.el, balancedB.el, randomB.el, clearB.el);

  ctrlPanel.append(inputRow, presetRow);

  // initial demo
  for (const v of [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45]) root = insert(root, v);
  draw();

  let raf = 0;
  const tick = () => { draw(); raf = requestAnimationFrame(tick); };
  raf = requestAnimationFrame(tick);

  return () => { cancelAnimationFrame(raf); cv.destroy(); };
}
