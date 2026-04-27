import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';

const W_CELLS = 50, H_CELLS = 30;

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 5 / 3 });

  const params = {
    grassGrow: 0.04,
    rabbitInitial: 60,
    foxInitial: 12,
    rabbitFromGrass: 4,
    foxFromRabbit: 20,
    rabbitReproEnergy: 8,
    foxReproEnergy: 30,
    showGraph: true,
    speed: 1,
  };

  let grass; // Float32Array, 0..1
  let rabbits = [];
  let foxes = [];
  let history = []; // { rabbits, foxes }
  let tick = 0;

  function reset() {
    grass = new Float32Array(W_CELLS * H_CELLS);
    for (let i = 0; i < grass.length; i++) grass[i] = Math.random() * 0.5 + 0.5;
    rabbits = [];
    foxes = [];
    for (let i = 0; i < params.rabbitInitial; i++) {
      rabbits.push({ x: Math.floor(Math.random() * W_CELLS), y: Math.floor(Math.random() * H_CELLS), e: 5 });
    }
    for (let i = 0; i < params.foxInitial; i++) {
      foxes.push({ x: Math.floor(Math.random() * W_CELLS), y: Math.floor(Math.random() * H_CELLS), e: 15 });
    }
    history = [];
    tick = 0;
  }
  reset();

  function moveRandom(a) {
    a.x = (a.x + Math.floor(Math.random() * 3) - 1 + W_CELLS) % W_CELLS;
    a.y = (a.y + Math.floor(Math.random() * 3) - 1 + H_CELLS) % H_CELLS;
  }

  function step() {
    // grass regrows
    for (let i = 0; i < grass.length; i++) {
      grass[i] = Math.min(1, grass[i] + params.grassGrow);
    }
    // rabbits
    const newR = [];
    for (const r of rabbits) {
      moveRandom(r);
      const idx = r.y * W_CELLS + r.x;
      if (grass[idx] > 0.3) {
        r.e += params.rabbitFromGrass * grass[idx];
        grass[idx] = 0;
      }
      r.e -= 1;
      if (r.e <= 0) continue;
      if (r.e > params.rabbitReproEnergy) {
        r.e /= 2;
        newR.push({ x: r.x, y: r.y, e: r.e });
      }
      newR.push(r);
    }
    rabbits = newR;
    // foxes
    const newF = [];
    for (const f of foxes) {
      moveRandom(f);
      // eat any rabbit at same cell
      for (let i = rabbits.length - 1; i >= 0; i--) {
        if (rabbits[i].x === f.x && rabbits[i].y === f.y) {
          f.e += params.foxFromRabbit;
          rabbits.splice(i, 1);
          break;
        }
      }
      f.e -= 1;
      if (f.e <= 0) continue;
      if (f.e > params.foxReproEnergy) {
        f.e /= 2;
        newF.push({ x: f.x, y: f.y, e: f.e });
      }
      newF.push(f);
    }
    foxes = newF;

    history.push({ r: rabbits.length, f: foxes.length });
    if (history.length > 400) history.shift();
    tick++;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    const cw = W / W_CELLS, ch = H / H_CELLS;
    // grass
    for (let y = 0; y < H_CELLS; y++) {
      for (let x = 0; x < W_CELLS; x++) {
        const g = grass[y * W_CELLS + x];
        ctx.fillStyle = `rgb(${30 + 30 * (1 - g)},${100 + 90 * g},${30 + 30 * (1 - g)})`;
        ctx.fillRect(x * cw, y * ch, cw - 0.5, ch - 0.5);
      }
    }
    // rabbits
    ctx.fillStyle = '#fef9c3';
    for (const r of rabbits) {
      ctx.beginPath();
      ctx.arc(r.x * cw + cw / 2, r.y * ch + ch / 2, Math.min(cw, ch) * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }
    // foxes
    ctx.fillStyle = '#dc2626';
    for (const f of foxes) {
      ctx.fillRect(f.x * cw + cw * 0.15, f.y * ch + ch * 0.15, cw * 0.7, ch * 0.7);
    }

    // overlay graph
    if (params.showGraph && history.length > 2) {
      const gw = 220, gh = 70, gx = W - gw - 12, gy = 12;
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(gx, gy, gw, gh);
      const max = Math.max(...history.map((p) => Math.max(p.r, p.f)), 5);
      const x2 = (i) => gx + (i / 400) * gw;
      const y2 = (v) => gy + gh - (v / max) * (gh - 16) - 6;
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#fef9c3';
      ctx.beginPath();
      history.forEach((p, i) => i === 0 ? ctx.moveTo(x2(i), y2(p.r)) : ctx.lineTo(x2(i), y2(p.r)));
      ctx.stroke();
      ctx.strokeStyle = '#dc2626';
      ctx.beginPath();
      history.forEach((p, i) => i === 0 ? ctx.moveTo(x2(i), y2(p.f)) : ctx.lineTo(x2(i), y2(p.f)));
      ctx.stroke();
      ctx.fillStyle = '#fef9c3';
      ctx.font = '11px var(--font-sans)';
      ctx.fillText(`R: ${rabbits.length}`, gx + 6, gy + 14);
      ctx.fillStyle = '#dc2626';
      ctx.fillText(`F: ${foxes.length}`, gx + 60, gy + 14);
    }
  }

  // controls
  const grassS = slider({ label: 'Grass regrowth', min: 0, max: 0.2, step: 0.005, value: params.grassGrow, format: (v) => v.toFixed(3),
    onInput: (v) => { params.grassGrow = v; } });
  const fEnergy = slider({ label: 'Fox energy / rabbit', min: 5, max: 60, step: 1, value: params.foxFromRabbit,
    onInput: (v) => { params.foxFromRabbit = v; } });
  const rRepro = slider({ label: 'Rabbit reproduce ≥ E', min: 5, max: 20, step: 0.5, value: params.rabbitReproEnergy,
    onInput: (v) => { params.rabbitReproEnergy = v; } });
  const fRepro = slider({ label: 'Fox reproduce ≥ E', min: 15, max: 60, step: 0.5, value: params.foxReproEnergy,
    onInput: (v) => { params.foxReproEnergy = v; } });
  const speedS = slider({ label: 'Speed', min: 1, max: 8, step: 1, value: params.speed,
    onInput: (v) => { params.speed = v; } });
  const graphT = toggle({ label: 'Show graph', value: params.showGraph, onChange: (v) => { params.showGraph = v; } });
  const resetB = button({ label: 'Reset', primary: true, onClick: reset });

  ctrlPanel.append(grassS.el, fEnergy.el, rRepro.el, fRepro.el, speedS.el, graphT.el, row(resetB));

  let frameAcc = 0;
  const animator = loop((dt) => {
    frameAcc += dt * params.speed * 6;
    while (frameAcc >= 1) { step(); frameAcc -= 1; }
    draw();
  });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
