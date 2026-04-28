import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    n: 80,
    avgDeg: 6,
    threshold: 0.3,
    speed: 4,
  };

  let nodes = [];
  let edges = [];
  let adj = [];

  function build() {
    nodes = [];
    edges = [];
    adj = [];
    for (let i = 0; i < params.n; i++) {
      nodes.push({ x: Math.random(), y: Math.random(), adopted: false });
      adj.push([]);
    }
    const p = params.avgDeg / Math.max(1, params.n - 1);
    for (let i = 0; i < params.n; i++) {
      for (let j = i + 1; j < params.n; j++) {
        if (Math.random() < p) {
          edges.push([i, j]);
          adj[i].push(j);
          adj[j].push(i);
        }
      }
    }
    // Seed: pick the highest-degree node
    let seed = 0;
    for (let i = 1; i < params.n; i++) if (adj[i].length > adj[seed].length) seed = i;
    nodes[seed].adopted = true;
  }
  build();

  function step() {
    const newAdopted = nodes.map((n) => n.adopted);
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].adopted) continue;
      if (adj[i].length === 0) continue;
      const adopted = adj[i].filter((j) => nodes[j].adopted).length;
      if (adopted / adj[i].length >= params.threshold) newAdopted[i] = true;
    }
    for (let i = 0; i < nodes.length; i++) nodes[i].adopted = newAdopted[i];
  }

  function relax(dt) {
    for (let i = 0; i < nodes.length; i++) {
      let fx = 0, fy = 0;
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d = Math.hypot(dx, dy) + 0.01;
        const r = 0.0005 / (d * d);
        fx += dx / d * r;
        fy += dy / d * r;
      }
      nodes[i].x = Math.max(0.05, Math.min(0.95, nodes[i].x + fx * dt * 30));
      nodes[i].y = Math.max(0.05, Math.min(0.95, nodes[i].y + fy * dt * 30));
    }
    for (const [a, b] of edges) {
      const dx = nodes[b].x - nodes[a].x;
      const dy = nodes[b].y - nodes[a].y;
      const d = Math.hypot(dx, dy) + 0.001;
      const f = (d - 0.08) * 0.3;
      nodes[a].x += dx / d * f * dt * 30;
      nodes[a].y += dy / d * f * dt * 30;
      nodes[b].x -= dx / d * f * dt * 30;
      nodes[b].y -= dy / d * f * dt * 30;
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = 'rgba(120,130,150,0.18)';
    for (const [a, b] of edges) {
      ctx.beginPath();
      ctx.moveTo(nodes[a].x * W, nodes[a].y * H);
      ctx.lineTo(nodes[b].x * W, nodes[b].y * H);
      ctx.stroke();
    }
    for (const n of nodes) {
      ctx.fillStyle = n.adopted ? '#ec4899' : '#0ea5e9';
      ctx.beginPath();
      ctx.arc(n.x * W, n.y * H, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    const adopted = nodes.filter((n) => n.adopted).length;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 280, 28);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`Adopted: ${adopted}/${nodes.length} (${(adopted / nodes.length * 100).toFixed(0)}%)    threshold: ${(params.threshold*100).toFixed(0)}%`, 16, 28);
  }

  // mouse: click a node to seed
  function localPos(e) {
    const rect = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * cv.width / rect.width, y: (e.clientY - rect.top) * cv.height / rect.height };
  }
  cv.canvas.addEventListener('click', (e) => {
    const p = localPos(e);
    let best = -1, bestD = 20;
    for (let i = 0; i < nodes.length; i++) {
      const d = Math.hypot(p.x - nodes[i].x * cv.width, p.y - nodes[i].y * cv.height);
      if (d < bestD) { bestD = d; best = i; }
    }
    if (best >= 0) nodes[best].adopted = !nodes[best].adopted;
  });

  // controls
  const nS = slider({ label: 'Nodes', min: 20, max: 200, step: 5, value: params.n,
    onInput: (v) => { params.n = v; build(); } });
  const dS = slider({ label: 'Avg degree', min: 2, max: 12, step: 0.5, value: params.avgDeg, format: (v) => v.toFixed(1),
    onInput: (v) => { params.avgDeg = v; build(); } });
  const tS = slider({ label: 'Adoption threshold', min: 0, max: 1, step: 0.01, value: params.threshold, format: (v) => `${(v*100).toFixed(0)}%`,
    onInput: (v) => { params.threshold = v; } });
  const speedS = slider({ label: 'Steps / sec', min: 0.5, max: 10, step: 0.5, value: params.speed, format: (v) => v.toFixed(1),
    onInput: (v) => { params.speed = v; } });
  const rebuildB = button({ label: 'Rebuild network', primary: true, onClick: build });
  const clearB = button({ label: 'Clear adoption', onClick: () => { for (const n of nodes) n.adopted = false; } });

  ctrlPanel.append(nS.el, dS.el, tS.el, speedS.el, row(rebuildB, clearB));

  let acc = 0;
  const animator = loop((dt) => {
    relax(Math.min(0.05, dt));
    acc += dt * params.speed;
    while (acc >= 1) { step(); acc -= 1; }
    draw();
  });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
