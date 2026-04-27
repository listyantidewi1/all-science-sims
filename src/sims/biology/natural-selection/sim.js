import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row, toggle } from '../../../lib/controls.js';

// Each individual carries a hue in [0, 360]. Background hue is fixed.
// Fitness = 1 / (1 + k * angularDistance(hue, bgHue)). Predator removes proportional to (1 - fitness).
// Each generation: kill phase, then reproduction with small mutation.

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    bgHue: 120,        // background hue
    selection: 1.0,    // selection strength (k)
    mutation: 6,       // stddev of hue mutation per offspring
    capacity: 80,
    selectionOn: true,
  };

  let pop = [];
  let history = [];
  let gen = 0;
  let timeSinceGen = 0;

  function angDist(a, b) {
    let d = Math.abs(a - b) % 360;
    if (d > 180) d = 360 - d;
    return d;
  }

  function fitness(hue) {
    if (!params.selectionOn) return 0.5;
    const d = angDist(hue, params.bgHue) / 180;
    return 1 / (1 + params.selection * 10 * d);
  }

  function spawn() {
    pop = [];
    for (let i = 0; i < params.capacity; i++) {
      pop.push({
        x: Math.random() * cv.width,
        y: Math.random() * cv.height,
        hue: Math.random() * 360,
        vx: (Math.random() - 0.5) * 30,
        vy: (Math.random() - 0.5) * 30,
      });
    }
    history = [];
    gen = 0;
  }
  spawn();

  function nextGeneration() {
    // Kill phase: each individual survives with prob proportional to fitness.
    const maxF = Math.max(...pop.map((p) => fitness(p.hue)), 0.001);
    const survivors = pop.filter((p) => Math.random() < fitness(p.hue) / maxF * 0.7 + 0.05);
    // Reproduction up to capacity
    while (survivors.length < params.capacity && survivors.length > 0) {
      const parent = survivors[Math.floor(Math.random() * survivors.length)];
      survivors.push({
        x: parent.x + (Math.random() - 0.5) * 20,
        y: parent.y + (Math.random() - 0.5) * 20,
        hue: (parent.hue + (Math.random() - 0.5) * 2 * params.mutation + 360) % 360,
        vx: (Math.random() - 0.5) * 30,
        vy: (Math.random() - 0.5) * 30,
      });
    }
    pop = survivors;
    gen++;
    // Record mean angular distance from bg
    let mean = 0;
    for (const p of pop) mean += angDist(p.hue, params.bgHue);
    mean /= Math.max(1, pop.length);
    history.push(mean);
    if (history.length > 200) history.shift();
  }

  function step(dt) {
    timeSinceGen += dt;
    if (timeSinceGen > 1.0) {
      nextGeneration();
      timeSinceGen = 0;
    }
    for (const p of pop) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (p.x < 4) { p.x = 4; p.vx = -p.vx; }
      if (p.x > cv.width - 4) { p.x = cv.width - 4; p.vx = -p.vx; }
      if (p.y < 4) { p.y = 4; p.vy = -p.vy; }
      if (p.y > cv.height - 4) { p.y = cv.height - 4; p.vy = -p.vy; }
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = `hsl(${params.bgHue} 50% 70%)`;
    ctx.fillRect(0, 0, W, H);

    for (const p of pop) {
      ctx.fillStyle = `hsl(${p.hue} 80% 45%)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // history mini-graph (bottom-right)
    const gw = 200, gh = 60, gx = W - gw - 12, gy = H - gh - 12;
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.fillRect(gx, gy, gw, gh);
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Mean Δhue from background', gx + 4, gy + 12);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < history.length; i++) {
      const x = gx + (i / 200) * gw;
      const y = gy + gh - (history[i] / 180) * (gh - 16) - 2;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Heading
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(8, 8, 200, 36);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(`Generation ${gen}    n = ${pop.length}`, 14, 28);
  }

  // controls
  const bgS = slider({
    label: 'Background hue', min: 0, max: 359, step: 1, value: params.bgHue,
    onInput: (v) => { params.bgHue = v; },
  });
  const selS = slider({
    label: 'Selection strength', min: 0, max: 3, step: 0.05, value: params.selection, format: (v) => v.toFixed(2),
    onInput: (v) => { params.selection = v; },
  });
  const mutS = slider({
    label: 'Mutation σ (hue °)', min: 0, max: 30, step: 0.5, value: params.mutation, format: (v) => v.toFixed(1),
    onInput: (v) => { params.mutation = v; },
  });
  const popS = slider({
    label: 'Carrying capacity', min: 20, max: 200, step: 5, value: params.capacity,
    onInput: (v) => { params.capacity = v; },
  });
  const onT = toggle({ label: 'Selection on', value: params.selectionOn, onChange: (v) => { params.selectionOn = v; } });
  const resetB = button({ label: 'Reset', onClick: spawn });
  ctrlPanel.append(bgS.el, selS.el, mutS.el, popS.el, onT.el, row(resetB));

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
