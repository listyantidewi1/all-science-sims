import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row, toggle } from '../../../lib/controls.js';
import { hoverProbe, drawTooltip } from '../../../lib/chart.js';
import { dragHandle } from '../../../lib/handle.js';

const SIZE = 50;

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 1 });

  const params = {
    tolerance: 0.4,
    density: 0.85,
    redFrac: 0.5,
    speed: 200,
    running: true,
    paintMode: 'red', // 'red' | 'blue' | 'empty'
  };

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
    if (total === 0) return true;
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

  function cellAt(sx, sy) {
    const cw = cv.width / SIZE;
    const ch = cv.height / SIZE;
    const x = Math.floor(sx / cw);
    const y = Math.floor(sy / ch);
    if (x < 0 || x >= SIZE || y < 0 || y >= SIZE) return null;
    return { x, y, cw, ch };
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
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 250, 36);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(`Happy: ${(happiness * 100).toFixed(1)}%   Moves: ${stepsTaken}`, 16, 28);

    // Hover tooltip + cell highlight
    const probe = hover.get();
    if (probe) {
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.strokeRect(probe.cx, probe.cy, cw, ch);
      drawTooltip(ctx, probe.label, probe.cx + cw / 2, probe.cy);
    }
  }

  // Hover — show cell type, neighbor breakdown, happy status
  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    const c = cellAt(sx, sy);
    if (!c) return null;
    const v = grid[c.y * SIZE + c.x];
    const kind = v === 0 ? 'EMPTY' : v === 1 ? 'RED' : 'BLUE';
    if (v === 0) return { cx: c.x * c.cw, cy: c.y * c.ch, x: c.x * c.cw, y: c.y * c.ch, label: ['EMPTY'] };
    const [same, total] = neighborsSame(c.x, c.y);
    const frac = total > 0 ? same / total : 1;
    const happy = frac >= params.tolerance || total === 0;
    return {
      cx: c.x * c.cw,
      cy: c.y * c.ch,
      x: c.x * c.cw,
      y: c.y * c.ch,
      label: [
        kind,
        `same: ${same}/${total} (${(frac * 100).toFixed(0)}%)`,
        happy ? 'HAPPY ✓' : 'UNHAPPY ✗',
      ],
    };
  });

  // Drag-paint cells. Click sets cells to params.paintMode; drag continues.
  const drag = dragHandle(cv.canvas, {
    hitTest(sx, sy) { return cellAt(sx, sy) ? 'paint' : null; },
    onStart(_id, sx, sy) { paint(sx, sy); },
    onDrag(_id, sx, sy) { paint(sx, sy); },
    cursor: 'crosshair',
    hoverCursor: 'crosshair',
    grabbingCursor: 'crosshair',
  });
  function paint(sx, sy) {
    const c = cellAt(sx, sy);
    if (!c) return;
    const target = params.paintMode === 'red' ? 1 : params.paintMode === 'blue' ? 2 : 0;
    grid[c.y * SIZE + c.x] = target;
    happiness = computeHappiness();
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
  const paintSel = select({
    label: 'Paint (drag the grid to seed)',
    options: [
      { value: 'red',   label: 'Red' },
      { value: 'blue',  label: 'Blue' },
      { value: 'empty', label: 'Empty' },
    ],
    value: params.paintMode,
    onChange: (v) => { params.paintMode = v; },
  });
  const runT = toggle({ label: 'Running', value: params.running, onChange: (v) => { params.running = v; } });
  const resetB = button({ label: 'Reset', primary: true, onClick: reset });
  const clearB = button({ label: 'Clear all', onClick: () => { grid = new Uint8Array(SIZE * SIZE); happiness = computeHappiness(); stepsTaken = 0; } });

  ctrlPanel.append(tolS.el, densS.el, fracS.el, speedS.el, paintSel.el, runT.el, row(resetB, clearB));

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); hover.destroy(); drag.destroy(); cv.destroy(); };
}
