import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';

const SIZE = 50;

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 1 });

  const params = {
    tolerance: 0.4,    // fraction of same-type neighbors required
    density: 0.85,     // total occupancy
    redFrac: 0.5,      // share of population that is red (rest blue)
    speed: 200,        // moves per second
    running: true,
  };

  // Grid: 0 empty, 1 red, 2 blue
  let grid = new Uint8Array(SIZE * SIZE);
  let happiness = 0;
  let stepsTaken = 0;

  function reset() {
    grid = new Uint8Array(SIZE * SIZE);
    const total = SIZE * SIZE;
    for (let i = 0; i < total; i++) {
      if (Math.random() < params.density) {
        grid[i] = Math.random() < params.redFrac ? 1 : 2;
      }
    }
    happiness = computeHappiness();
    stepsTaken = 0;
  }
  reset();

  function neighborsSame(x, y) {
    const me = grid[y * SIZE + x];
    if (me === 0) return [0, 0];
    let same = 0, total = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || nx >= SIZE || ny < 0 || ny >= SIZE) continue;
        const nv = grid[ny * SIZE + nx];
        if (nv === 0) continue;
        total++;
        if (nv === me) same++;
      }
    }
    return [same, total];
  }

  function isHappy(x, y) {
    const me = grid[y * SIZE + x];
    if (me === 0) return true;
    const [same, total] = neighborsSame(x, y);
    if (total === 0) return true; // isolated
    return same / total >= params.tolerance;
  }

  function computeHappiness() {
    let happy = 0, total = 0;
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        if (grid[y * SIZE + x] === 0) continue;
        total++;
        if (isHappy(x, y)) happy++;
      }
    }
    return total === 0 ? 1 : happy / total;
  }

  function takeStep() {
    // Find an unhappy agent and move to a random empty cell
    const unhappy = [];
    const empty = [];
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        const v = grid[y * SIZE + x];
        if (v === 0) empty.push(y * SIZE + x);
        else if (!isHappy(x, y)) unhappy.push(y * SIZE + x);
      }
    }
    if (unhappy.length === 0 || empty.length === 0) return false;
    const a = unhappy[Math.floor(Math.random() * unhappy.length)];
    const b = empty[Math.floor(Math.random() * empty.length)];
    grid[b] = grid[a];
    grid[a] = 0;
    stepsTaken++;
    return true;
  }

  function step(dt) {
    if (!params.running) return;
    const moves = Math.max(1, Math.round(params.speed * dt));
    for (let i = 0; i < moves; i++) takeStep();
    happiness = computeHappiness();
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);
    const cw = W / SIZE, ch = H / SIZE;
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        const v = grid[y * SIZE + x];
        if (v === 0) ctx.fillStyle = 'rgba(255,255,255,0.04)';
        else ctx.fillStyle = v === 1 ? '#ef4444' : '#3b82f6';
        ctx.fillRect(x * cw, y * ch, cw - 0.5, ch - 0.5);
      }
    }
    // header
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 230, 36);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(`Happy: ${(happiness * 100).toFixed(1)}%   Moves: ${stepsTaken}`, 16, 28);
  }

  // controls
  const tolS = slider({
    label: 'Tolerance (% same neighbors)', min: 0, max: 1, step: 0.01, value: params.tolerance, format: (v) => `${(v * 100).toFixed(0)}%`,
    onInput: (v) => { params.tolerance = v; },
  });
  const densS = slider({
    label: 'Density', min: 0.4, max: 0.98, step: 0.01, value: params.density, format: (v) => v.toFixed(2),
    onInput: (v) => { params.density = v; reset(); },
  });
  const fracS = slider({
    label: 'Red share', min: 0.1, max: 0.9, step: 0.01, value: params.redFrac, format: (v) => v.toFixed(2),
    onInput: (v) => { params.redFrac = v; reset(); },
  });
  const speedS = slider({
    label: 'Moves / second', min: 1, max: 800, step: 5, value: params.speed,
    onInput: (v) => { params.speed = v; },
  });
  const runT = toggle({ label: 'Running', value: params.running, onChange: (v) => { params.running = v; } });
  const resetB = button({ label: 'Reset', primary: true, onClick: reset });

  ctrlPanel.append(tolS.el, densS.el, fracS.el, speedS.el, runT.el, row(resetB));

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
