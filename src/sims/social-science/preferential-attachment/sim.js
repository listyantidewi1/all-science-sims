import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    mode: 'ba',          // 'ba' | 'uniform'
    m: 2,
    targetN: 80,
    speed: 6,
  };

  let nodes = [];   // {x, y, degree}
  let edges = [];   // [aIndex, bIndex]
  let degrees = [];

  function reset() {
    nodes = [];
    edges = [];
    degrees = [];
    // seed: 3 connected nodes
    for (let i = 0; i < 3; i++) {
      nodes.push({ x: Math.random() * 0.6 + 0.2, y: Math.random() * 0.6 + 0.2 });
      degrees.push(0);
    }
    addEdge(0, 1); addEdge(1, 2); addEdge(0, 2);
  }
  reset();

  function addEdge(a, b) {
    edges.push([a, b]);
    degrees[a]++; degrees[b]++;
  }

  function addNode() {
    const newIdx = nodes.length;
    // physics-ish layout: place near a random anchor
    nodes.push({ x: Math.random(), y: Math.random() });
    degrees.push(0);
    const m = Math.min(params.m, newIdx);
    const targets = new Set();
    if (params.mode === 'ba') {
      // weighted by degree
      const totalDeg = degrees.slice(0, newIdx).reduce((s, v) => s + v, 0) || 1;
      while (targets.size < m) {
        const r = Math.random() * totalDeg;
        let acc = 0;
        for (let i = 0; i < newIdx; i++) {
          acc += degrees[i];
          if (acc >= r) { targets.add(i); break; }
        }
      }
    } else {
      while (targets.size < m) targets.add(Math.floor(Math.random() * newIdx));
    }
    for (const t of targets) addEdge(newIdx, t);
  }

  // Spring layout pass each frame
  function relax(dt) {
    const positions = nodes.map((n) => ({ x: n.x, y: n.y, vx: 0, vy: 0 }));
    // repulsion
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dx = positions[j].x - positions[i].x;
        const dy = positions[j].y - positions[i].y;
        const d = Math.hypot(dx, dy) + 0.01;
        const f = 0.0008 / (d * d);
        positions[i].vx -= dx / d * f;
        positions[i].vy -= dy / d * f;
        positions[j].vx += dx / d * f;
        positions[j].vy += dy / d * f;
      }
    }
    // edge spring
    for (const [a, b] of edges) {
      const dx = positions[b].x - positions[a].x;
      const dy = positions[b].y - positions[a].y;
      const d = Math.hypot(dx, dy) + 0.01;
      const target = 0.06;
      const f = (d - target) * 0.2;
      positions[a].vx += dx / d * f;
      positions[a].vy += dy / d * f;
      positions[b].vx -= dx / d * f;
      positions[b].vy -= dy / d * f;
    }
    // apply
    for (let i = 0; i < positions.length; i++) {
      nodes[i].x = Math.max(0.05, Math.min(0.95, positions[i].x + positions[i].vx * 1.5));
      nodes[i].y = Math.max(0.05, Math.min(0.95, positions[i].y + positions[i].vy * 1.5));
    }
  }

  let acc = 0;
  function step(dt) {
    if (nodes.length < params.targetN) {
      acc += dt * params.speed;
      while (acc >= 1 && nodes.length < params.targetN) { addNode(); acc -= 1; }
    }
    relax(dt);
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const halfW = W * 0.62;
    // network on left
    // edges
    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.lineWidth = 1;
    for (const [a, b] of edges) {
      ctx.beginPath();
      ctx.moveTo(nodes[a].x * halfW, nodes[a].y * H);
      ctx.lineTo(nodes[b].x * halfW, nodes[b].y * H);
      ctx.stroke();
    }
    // nodes
    const maxDeg = Math.max(...degrees, 1);
    for (let i = 0; i < nodes.length; i++) {
      const r = 3 + Math.sqrt(degrees[i]) * 2;
      ctx.fillStyle = `hsl(${260 - degrees[i] / maxDeg * 200}, 70%, 60%)`;
      ctx.beginPath();
      ctx.arc(nodes[i].x * halfW, nodes[i].y * H, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Degree histogram on right
    const hx = halfW + 30, hy = 40, hw = W - hx - 30, hh = H - 80;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(hx, hy, hw, hh);

    const counts = new Map();
    for (const d of degrees) counts.set(d, (counts.get(d) || 0) + 1);
    const ds = [...counts.keys()].sort((a, b) => a - b);
    if (ds.length > 0) {
      const maxK = Math.max(...ds, 1);
      const maxC = Math.max(...counts.values(), 1);
      // log-log axes
      const x2 = (k) => hx + Math.log10(Math.max(1, k)) / Math.log10(Math.max(2, maxK)) * hw;
      const y2 = (c) => hy + hh - Math.log10(c) / Math.log10(Math.max(2, maxC)) * hh;
      ctx.fillStyle = '#a78bfa';
      for (const k of ds) {
        const c = counts.get(k);
        const x = x2(k), y = y2(c);
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      // power-law guide
      if (params.mode === 'ba' && nodes.length > 30) {
        ctx.strokeStyle = 'rgba(245,158,11,0.6)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(x2(1), y2(maxC));
        ctx.lineTo(x2(maxK), y2(maxC) + hh * 0.85);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(245,158,11,0.85)';
        ctx.font = '10px var(--font-mono)';
        ctx.fillText('expected ~ k^-3', hx + hw - 100, hy + 14);
      }
    }
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText(`Degree distribution (log-log)`, hx + 6, hy - 4);
    ctx.fillText('degree k →', hx + hw - 70, hy + hh + 14);

    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 280, 32);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(`${nodes.length} nodes / ${params.targetN}    max degree: ${Math.max(...degrees, 0)}`, 16, 28);
  }

  // controls
  const modeSel = select({
    label: 'Attachment rule',
    options: [
      { value: 'ba', label: 'Preferential (rich-get-richer)' },
      { value: 'uniform', label: 'Uniform random' },
    ],
    value: params.mode,
    onChange: (v) => { params.mode = v; reset(); },
  });
  const mS = slider({ label: 'Edges per new node (m)', min: 1, max: 6, step: 1, value: params.m,
    onInput: (v) => { params.m = v; } });
  const NS = slider({ label: 'Target nodes', min: 20, max: 300, step: 5, value: params.targetN,
    onInput: (v) => { params.targetN = v; } });
  const speedS = slider({ label: 'Growth speed', min: 1, max: 30, step: 1, value: params.speed,
    onInput: (v) => { params.speed = v; } });
  const resetB = button({ label: 'Reset', primary: true, onClick: reset });

  ctrlPanel.append(modeSel.el, mS.el, NS.el, speedS.el, row(resetB));

  const animator = loop((dt) => { step(Math.min(0.1, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
