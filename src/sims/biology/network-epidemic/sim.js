import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

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
    network: 'small-world',   // 'small-world' (Watts–Strogatz) | 'random' (Erdős–Rényi)
    rewire: 0.1,              // Watts–Strogatz rewiring probability p
    vaccN: 0,                 // people immunised when the network is built
    vaccTarget: 'hubs',       // 'hubs' (highest degree first) | 'random'
  };

  let nodes = [];   // {x, y, state: 'S'|'I'|'R'|'V'}   V = vaccinated (immune)
  let edges = [];   // [a, b]
  let degree = [];  // contacts per node
  let stats = { steps: 0, peakI: 1, peakStep: 0, vaccinated: 0 }; // outbreak bookkeeping for the lab panel

  // ---- network builders --------------------------------------------------
  function edgeKey(a, b) { return a < b ? a * params.n + b : b * params.n + a; }

  /** Erdős–Rényi: every pair linked with probability avgDeg / (n − 1). */
  function buildRandom(n, seen) {
    const p = params.avgDeg / Math.max(1, n - 1);
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (Math.random() < p) { edges.push([i, j]); seen.add(edgeKey(i, j)); }
      }
    }
  }

  /**
   * Watts–Strogatz: ring lattice where each node links to its k/2 nearest
   * neighbours on each side (k = avg degree rounded to an even number), then
   * each lattice edge is rewired with probability p to a random node, keeping
   * the node count and edge count fixed while adding long-range shortcuts.
   */
  function buildSmallWorld(n, seen) {
    const k = Math.max(2, 2 * Math.round(params.avgDeg / 2));
    const half = Math.min(k / 2, Math.floor((n - 1) / 2));
    for (let i = 0; i < n; i++) {
      for (let j = 1; j <= half; j++) {
        const a = i, b0 = (i + j) % n;
        if (seen.has(edgeKey(a, b0))) continue;
        let b = b0;
        if (Math.random() < params.rewire) {
          // pick a new partner that is not a and not already linked to a
          for (let tries = 0; tries < 20; tries++) {
            const cand = Math.floor(Math.random() * n);
            if (cand !== a && !seen.has(edgeKey(a, cand))) { b = cand; break; }
          }
        }
        edges.push([a, b]);
        seen.add(edgeKey(a, b));
      }
    }
  }

  function computeDegree() {
    degree = new Array(nodes.length).fill(0);
    for (const [a, b] of edges) { degree[a]++; degree[b]++; }
  }

  /** Immunise `count` susceptible people: the highest-degree hubs, or random people. */
  function vaccinate(count) {
    const candidates = [];
    for (let i = 0; i < nodes.length; i++) if (nodes[i].state === 'S') candidates.push(i);
    if (params.vaccTarget === 'hubs') candidates.sort((a, b) => degree[b] - degree[a] || Math.random() - 0.5);
    else candidates.sort(() => Math.random() - 0.5);
    const chosen = candidates.slice(0, Math.max(0, Math.min(count, candidates.length)));
    for (const i of chosen) nodes[i].state = 'V';
    stats.vaccinated += chosen.length;
  }

  function buildNetwork() {
    nodes = [];
    edges = [];
    const n = params.n;
    const ring = params.network === 'small-world';
    for (let i = 0; i < n; i++) {
      // small-world networks start on a ring so the lattice structure is visible
      const ang = (i / n) * Math.PI * 2;
      nodes.push(ring
        ? { x: 0.5 + 0.4 * Math.cos(ang), y: 0.5 + 0.4 * Math.sin(ang), state: 'S' }
        : { x: Math.random(), y: Math.random(), state: 'S' });
    }
    const seen = new Set();
    if (ring) buildSmallWorld(n, seen); else buildRandom(n, seen);
    computeDegree();
    stats = { steps: 0, peakI: 1, peakStep: 0, vaccinated: 0 };
    vaccinate(params.vaccN);
    // start one infection among the unvaccinated
    const sus = nodes.map((nd, i) => (nd.state === 'S' ? i : -1)).filter((i) => i >= 0);
    if (sus.length) nodes[sus[Math.floor(Math.random() * sus.length)]].state = 'I';
  }
  buildNetwork();

  function step() {
    // each I has chance to infect each susceptible neighbor; each I has chance to recover
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
    stats.steps++;
    let I = 0;
    for (const n of nodes) if (n.state === 'I') I++;
    if (I > stats.peakI) { stats.peakI = I; stats.peakStep = stats.steps; }
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

  const COLOR = { S: '#3b82f6', I: '#ef4444', R: '#10b981', V: '#f59e0b' };

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
    // nodes (hubs drawn slightly larger)
    const maxDeg = Math.max(1, ...degree);
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      ctx.fillStyle = COLOR[n.state];
      ctx.beginPath();
      ctx.arc(n.x * W, n.y * H, 5 + 4 * (degree[i] / maxDeg), 0, Math.PI * 2);
      ctx.fill();
    }

    const counts = { S: 0, I: 0, R: 0, V: 0 };
    for (const n of nodes) counts[n.state]++;
    const meanDeg = edges.length * 2 / Math.max(1, nodes.length);
    const netLabel = params.network === 'small-world'
      ? `small-world  k=${Math.max(2, 2 * Math.round(params.avgDeg / 2))}  p=${params.rewire.toFixed(2)}`
      : 'random (Erdős–Rényi)';
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 380, 46);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText(`S=${counts.S}    I=${counts.I}    R=${counts.R}    V=${counts.V} (vaccinated)`, 16, 28);
    ctx.font = '11px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fillText(`${netLabel}   mean degree ${meanDeg.toFixed(1)}   max ${maxDeg}`, 16, 46);
  }

  // controls
  const netSel = select({
    label: 'Network type', key: 'network',
    options: [
      { value: 'small-world', label: 'Small-world (Watts–Strogatz ring + rewiring)' },
      { value: 'random', label: 'Random (Erdős–Rényi)' },
    ],
    value: params.network,
    onChange: (v) => { params.network = v; buildNetwork(); },
  });
  const nS = slider({ label: 'Nodes', min: 20, max: 200, step: 5, value: params.n,
    onInput: (v) => { params.n = v; } });
  const dS = slider({ label: 'Avg degree', min: 1, max: 10, step: 0.5, value: params.avgDeg, format: (v) => v.toFixed(1),
    onInput: (v) => { params.avgDeg = v; } });
  const rwS = slider({ label: 'Rewiring prob. p (small-world)', key: 'rewiring-p', min: 0, max: 1, step: 0.01, value: params.rewire, format: (v) => v.toFixed(2),
    onInput: (v) => { params.rewire = v; } });
  const pIS = slider({ label: 'Infection prob.', min: 0, max: 1, step: 0.01, value: params.pInfect, format: (v) => v.toFixed(2),
    onInput: (v) => { params.pInfect = v; } });
  const pRS = slider({ label: 'Recovery prob.', min: 0, max: 1, step: 0.01, value: params.pRecover, format: (v) => v.toFixed(2),
    onInput: (v) => { params.pRecover = v; } });
  const vacS = slider({ label: 'Vaccinate (people, on rebuild)', key: 'vaccinate', min: 0, max: 60, step: 1, value: params.vaccN,
    onInput: (v) => { params.vaccN = v; } });
  const vacSel = select({
    label: 'Vaccination target', key: 'vaccination-target',
    options: [
      { value: 'hubs', label: 'Top-degree hubs first' },
      { value: 'random', label: 'Random people' },
    ],
    value: params.vaccTarget,
    onChange: (v) => { params.vaccTarget = v; },
  });
  const speedS = slider({ label: 'Steps / sec', min: 1, max: 30, step: 1, value: params.speed,
    onInput: (v) => { params.speed = v; } });
  const resetB = button({ label: 'Rebuild network', primary: true, onClick: buildNetwork });
  const vacB = button({ label: 'Vaccinate now', onClick: () => vaccinate(params.vaccN) });
  ctrlPanel.append(netSel.el, nS.el, dS.el, rwS.el, pIS.el, pRS.el, vacS.el, vacSel.el, speedS.el, row(resetB, vacB));

  // Lab — network / transmission parameters vs peak infected and final outbreak size.
  const lab = labPanel({
    title: 'Network epidemic lab — peak and final size',
    filename: 'network-epidemic-lab.csv',
    columns: [
      { key: 'network',  label: 'network' },
      { key: 'n',        label: 'nodes' },
      { key: 'deg',      label: 'avg degree',   format: (v) => v.toFixed(1) },
      { key: 'rewire',   label: 'rewire p',     format: (v) => v.toFixed(2) },
      { key: 'pInfect',  label: 'p_infect',     format: (v) => v.toFixed(2) },
      { key: 'pRecover', label: 'p_recover',    format: (v) => v.toFixed(2) },
      { key: 'vacc',     label: 'vaccinated' },
      { key: 'peakI',    label: 'peak infected' },
      { key: 'finalR',   label: 'final size (R)' },
    ],
    procedure: [
      'Keep nodes = 80, avg degree = 4, p_recover = 0.05, vaccinate = 0. Set p_infect = 0.05, click "Rebuild network".',
      'Wait until I = 0 (the outbreak is over), then Record. Rebuild and repeat 2-3 times — note the spread.',
      'Repeat for p_infect = 0.10, 0.20, 0.40, 0.80. How do peak infected and final size change?',
      'Fix p_infect = 0.15 and vary avg degree 2, 4, 8 (rebuild each time). Is there a degree below which outbreaks fizzle?',
      'Small-world: with p_infect = 0.15, compare rewiring p = 0, 0.05, 0.3. Does a handful of shortcuts change the peak?',
      'Vaccinate 10 people, hubs vs random (rebuild, 3 runs each). Which target cuts the final size more?',
      'Plot final size vs p_infect. Is it a smooth curve or a sharp threshold?',
    ],
    predict: 'Doubling p_infect from 0.1 to 0.2 — will the final outbreak size roughly double, or saturate?',
    source: () => {
      const counts = { S: 0, I: 0, R: 0, V: 0 };
      for (const n of nodes) counts[n.state]++;
      if (counts.I > 0) throw new Error('Wait until I = 0 (outbreak over)');
      return {
        network: params.network === 'small-world' ? `small-world/${params.vaccTarget}` : `random/${params.vaccTarget}`,
        n: nodes.length,
        deg: params.avgDeg,
        rewire: params.network === 'small-world' ? params.rewire : 0,
        pInfect: params.pInfect,
        pRecover: params.pRecover,
        vacc: counts.V,
        peakI: stats.peakI,
        finalR: counts.R,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

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
