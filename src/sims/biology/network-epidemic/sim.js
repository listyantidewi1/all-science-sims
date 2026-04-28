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
    avgDeg: 4,
    pInfect: 0.15,
    pRecover: 0.05,
    speed: 6,
  };

  let nodes = [];   // {x, y, state: 'S'|'I'|'R'}
  let edges = [];   // [a, b]

  function buildNetwork() {
    nodes = [];
    edges = [];
    for (let i = 0; i < params.n; i++) {
      nodes.push({ x: Math.random(), y: Math.random(), state: 'S' });
    }
    // small-world: each node connects to k nearest in a circular arrangement, then rewire
    // simpler: connect each pair with probability avgDeg / (n-1)
    const p = params.avgDeg / Math.max(1, params.n - 1);
    for (let i = 0; i < params.n; i++) {
      for (let j = i + 1; j < params.n; j++) {
        if (Math.random() < p) edges.push([i, j]);
      }
    }
    // start one infection
    nodes[Math.floor(Math.random() * params.n)].state = 'I';
  }
  buildNetwork();

  function step() {
    // each I has chance to infect each neighbor; each I has chance to recover
    const newStates = nodes.map((n) => n.state);
    for (const [a, b] of edges) {
      const A = nodes[a], B = nodes[b];
      if (A.state === 'I' && B.state === 'S' && Math.random() < params.pInfect) newStates[b] = 'I';
      if (B.state === 'I' && A.state === 'S' && Math.random() < params.pInfect) newStates[a] = 'I';
    }
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].state === 'I' && Math.random() < params.pRecover) newStates[i] = 'R';
    }
    for (let i = 0; i < nodes.length; i++) nodes[i].state = newStates[i];
  }

  function relax(dt) {
    // simple force-directed: repulsion + edge spring
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

    // edges
    ctx.strokeStyle = 'rgba(120,130,150,0.18)';
    for (const [a, b] of edges) {
      ctx.beginPath();
      ctx.moveTo(nodes[a].x * W, nodes[a].y * H);
      ctx.lineTo(nodes[b].x * W, nodes[b].y * H);
      ctx.stroke();
    }
    // nodes
    for (const n of nodes) {
      const c = n.state === 'S' ? '#3b82f6' : n.state === 'I' ? '#ef4444' : '#10b981';
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(n.x * W, n.y * H, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    const counts = { S: 0, I: 0, R: 0 };
    for (const n of nodes) counts[n.state]++;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 280, 28);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`S=${counts.S}    I=${counts.I}    R=${counts.R}`, 16, 28);
  }

  // controls
  const nS = slider({ label: 'Nodes', min: 20, max: 200, step: 5, value: params.n,
    onInput: (v) => { params.n = v; } });
  const dS = slider({ label: 'Avg degree', min: 1, max: 10, step: 0.5, value: params.avgDeg, format: (v) => v.toFixed(1),
    onInput: (v) => { params.avgDeg = v; } });
  const pIS = slider({ label: 'Infection prob.', min: 0, max: 1, step: 0.01, value: params.pInfect, format: (v) => v.toFixed(2),
    onInput: (v) => { params.pInfect = v; } });
  const pRS = slider({ label: 'Recovery prob.', min: 0, max: 1, step: 0.01, value: params.pRecover, format: (v) => v.toFixed(2),
    onInput: (v) => { params.pRecover = v; } });
  const speedS = slider({ label: 'Steps / sec', min: 1, max: 30, step: 1, value: params.speed,
    onInput: (v) => { params.speed = v; } });
  const resetB = button({ label: 'Rebuild network', primary: true, onClick: buildNetwork });
  ctrlPanel.append(nS.el, dS.el, pIS.el, pRS.el, speedS.el, row(resetB));

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
