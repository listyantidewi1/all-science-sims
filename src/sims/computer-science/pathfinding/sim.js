import { createCanvas } from '../../../lib/canvas.js';
import { select, button, row, slider } from '../../../lib/controls.js';

const COLS = 30, ROWS = 18;

function key(x, y) { return y * COLS + x; }

function inBounds(x, y) { return x >= 0 && x < COLS && y >= 0 && y < ROWS; }

function neighbors(x, y) {
  return [[1,0],[-1,0],[0,1],[0,-1]]
    .map(([dx, dy]) => [x + dx, y + dy])
    .filter(([nx, ny]) => inBounds(nx, ny));
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: COLS / ROWS });

  const state = {
    walls: new Set(),
    start: { x: 2, y: ROWS - 3 },
    goal:  { x: COLS - 3, y: 2 },
    algo: 'astar',
    speed: 60,
    visited: new Set(),
    frontier: [],
    cameFrom: new Map(),
    gScore: new Map(),
    path: [],
    running: false,
    iterator: null,
    drawing: 0, // 0 none, 1 add wall, 2 remove wall
    dragMode: null, // 'start' | 'goal' | null
  };

  function reset() {
    state.visited = new Set();
    state.frontier = [];
    state.cameFrom = new Map();
    state.gScore = new Map();
    state.path = [];
    state.running = false;
    state.iterator = null;
    runB.label = 'Run';
  }

  function* bfsRun() {
    const startK = key(state.start.x, state.start.y);
    const goalK = key(state.goal.x, state.goal.y);
    const queue = [[state.start.x, state.start.y]];
    state.visited.add(startK);
    while (queue.length) {
      const [x, y] = queue.shift();
      yield;
      if (key(x, y) === goalK) {
        // reconstruct
        let cur = goalK;
        const p = [];
        while (cur != null) { p.push(cur); cur = state.cameFrom.get(cur); }
        state.path = p.reverse();
        return;
      }
      for (const [nx, ny] of neighbors(x, y)) {
        const k = key(nx, ny);
        if (state.visited.has(k) || state.walls.has(k)) continue;
        state.visited.add(k);
        state.cameFrom.set(k, key(x, y));
        queue.push([nx, ny]);
      }
    }
  }

  function* astarRun() {
    const startK = key(state.start.x, state.start.y);
    const goalK = key(state.goal.x, state.goal.y);
    const open = new Map(); // k → fScore
    const h = (x, y) => Math.abs(x - state.goal.x) + Math.abs(y - state.goal.y);
    state.gScore.set(startK, 0);
    open.set(startK, h(state.start.x, state.start.y));
    while (open.size) {
      // pick lowest f
      let bestK = null, bestF = Infinity;
      for (const [k, f] of open) if (f < bestF) { bestF = f; bestK = k; }
      open.delete(bestK);
      const x = bestK % COLS, y = Math.floor(bestK / COLS);
      state.visited.add(bestK);
      yield;
      if (bestK === goalK) {
        let cur = goalK; const p = [];
        while (cur != null) { p.push(cur); cur = state.cameFrom.get(cur); }
        state.path = p.reverse();
        return;
      }
      for (const [nx, ny] of neighbors(x, y)) {
        const k = key(nx, ny);
        if (state.walls.has(k)) continue;
        const tentative = (state.gScore.get(bestK) ?? Infinity) + 1;
        if (tentative < (state.gScore.get(k) ?? Infinity)) {
          state.cameFrom.set(k, bestK);
          state.gScore.set(k, tentative);
          open.set(k, tentative + h(nx, ny));
        }
      }
    }
  }

  function start() {
    reset();
    const gen = state.algo === 'bfs' ? bfsRun() : astarRun();
    state.iterator = gen;
    state.running = true;
    runB.label = 'Pause';
  }

  function step() {
    if (!state.iterator) return;
    const r = state.iterator.next();
    if (r.done) { state.running = false; runB.label = 'Run'; }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);
    const cw = W / COLS, ch = H / ROWS;

    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const k = key(x, y);
        let fill = '#1f2937';
        if (state.walls.has(k)) fill = '#0b1220';
        else if (state.path.includes(k)) fill = '#fbbf24';
        else if (state.visited.has(k)) fill = '#3b82f6';
        ctx.fillStyle = fill;
        ctx.fillRect(x * cw, y * ch, cw - 1, ch - 1);
      }
    }
    // start & goal
    ctx.fillStyle = '#10b981';
    ctx.fillRect(state.start.x * cw, state.start.y * ch, cw - 1, ch - 1);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(state.goal.x * cw, state.goal.y * ch, cw - 1, ch - 1);

    // header
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(`Algorithm: ${state.algo === 'bfs' ? 'BFS' : 'A*'}    Visited: ${state.visited.size}    Path: ${state.path.length || '—'}`, 10, 18);
  }

  // mouse handlers
  function cellAt(e) {
    const rect = cv.canvas.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * COLS);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * ROWS);
    return { x, y };
  }
  cv.canvas.addEventListener('mousedown', (e) => {
    const { x, y } = cellAt(e);
    if (!inBounds(x, y)) return;
    if (x === state.start.x && y === state.start.y) { state.dragMode = 'start'; return; }
    if (x === state.goal.x && y === state.goal.y) { state.dragMode = 'goal'; return; }
    const k = key(x, y);
    state.drawing = state.walls.has(k) ? 2 : 1;
    if (state.drawing === 1) state.walls.add(k); else state.walls.delete(k);
    reset();
  });
  cv.canvas.addEventListener('mousemove', (e) => {
    const { x, y } = cellAt(e);
    if (!inBounds(x, y)) return;
    if (state.dragMode === 'start') { state.start = { x, y }; reset(); return; }
    if (state.dragMode === 'goal')  { state.goal  = { x, y }; reset(); return; }
    if (state.drawing) {
      const k = key(x, y);
      if (k === key(state.start.x, state.start.y) || k === key(state.goal.x, state.goal.y)) return;
      if (state.drawing === 1) state.walls.add(k); else state.walls.delete(k);
      reset();
    }
  });
  window.addEventListener('mouseup', () => { state.drawing = 0; state.dragMode = null; });

  // controls
  const algoSel = select({
    label: 'Algorithm',
    options: [{ value: 'bfs', label: 'Breadth-first search' }, { value: 'astar', label: 'A* (Manhattan)' }],
    value: state.algo,
    onChange: (v) => { state.algo = v; reset(); },
  });
  const speedS = slider({
    label: 'Steps / sec', min: 5, max: 300, step: 5, value: state.speed,
    onInput: (v) => { state.speed = v; },
  });
  const runB = button({ label: 'Run', primary: true, onClick: () => {
    if (!state.iterator) start();
    else state.running = !state.running;
    runB.label = state.running ? 'Pause' : 'Run';
  } });
  const clearB = button({ label: 'Clear walls', onClick: () => { state.walls = new Set(); reset(); } });
  const resetB = button({ label: 'Reset', onClick: reset });

  ctrlPanel.append(algoSel.el, speedS.el, row(runB, clearB, resetB));

  let raf = 0, last = 0, acc = 0;
  function tick(ts) {
    if (!last) last = ts;
    const dt = (ts - last) / 1000; last = ts;
    if (state.running) {
      acc += dt * state.speed;
      while (acc > 1 && state.iterator) { step(); acc -= 1; }
    }
    draw();
    raf = requestAnimationFrame(tick);
  }
  raf = requestAnimationFrame(tick);

  return () => { cancelAnimationFrame(raf); cv.destroy(); };
}
