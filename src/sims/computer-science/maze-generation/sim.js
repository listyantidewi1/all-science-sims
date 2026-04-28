import { createCanvas } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';

const W = 30, H = 20;

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: W / H });

  const params = { algo: 'dfs', speed: 30 };
  // Each cell tracks walls (top, right, bottom, left)
  let cells, visited, runState;

  function newGrid() {
    cells = Array.from({ length: H }, () =>
      Array.from({ length: W }, () => ({ top: true, right: true, bottom: true, left: true }))
    );
    visited = Array.from({ length: H }, () => Array.from({ length: W }, () => false));
  }

  function dfsInit() {
    newGrid();
    const stack = [[0, 0]];
    visited[0][0] = true;
    runState = { kind: 'dfs', stack };
  }
  function dfsStep() {
    const { stack } = runState;
    if (!stack.length) return false;
    const [cx, cy] = stack[stack.length - 1];
    const neighbors = [];
    for (const [dx, dy, w1, w2] of [[0,-1,'top','bottom'],[1,0,'right','left'],[0,1,'bottom','top'],[-1,0,'left','right']]) {
      const nx = cx + dx, ny = cy + dy;
      if (nx >= 0 && nx < W && ny >= 0 && ny < H && !visited[ny][nx]) neighbors.push([nx, ny, w1, w2]);
    }
    if (neighbors.length === 0) { stack.pop(); return true; }
    const [nx, ny, w1, w2] = neighbors[Math.floor(Math.random() * neighbors.length)];
    cells[cy][cx][w1] = false;
    cells[ny][nx][w2] = false;
    visited[ny][nx] = true;
    stack.push([nx, ny]);
    return true;
  }

  function primInit() {
    newGrid();
    visited[0][0] = true;
    const frontier = [];
    addFrontier(0, 0, frontier);
    runState = { kind: 'prim', frontier };
  }
  function addFrontier(x, y, frontier) {
    for (const [dx, dy] of [[0,-1],[1,0],[0,1],[-1,0]]) {
      const nx = x + dx, ny = y + dy;
      if (nx >= 0 && nx < W && ny >= 0 && ny < H && !visited[ny][nx]) frontier.push([nx, ny]);
    }
  }
  function primStep() {
    const { frontier } = runState;
    if (!frontier.length) return false;
    const idx = Math.floor(Math.random() * frontier.length);
    const [x, y] = frontier.splice(idx, 1)[0];
    if (visited[y][x]) return true;
    // pick a random visited neighbor and break wall
    const ns = [];
    for (const [dx, dy, w1, w2] of [[0,-1,'top','bottom'],[1,0,'right','left'],[0,1,'bottom','top'],[-1,0,'left','right']]) {
      const nx = x + dx, ny = y + dy;
      if (nx >= 0 && nx < W && ny >= 0 && ny < H && visited[ny][nx]) ns.push([nx, ny, w1, w2]);
    }
    if (!ns.length) return true;
    const [nx, ny, w1, w2] = ns[Math.floor(Math.random() * ns.length)];
    cells[y][x][w1] = false;
    cells[ny][nx][w2] = false;
    visited[y][x] = true;
    addFrontier(x, y, frontier);
    return true;
  }

  function wilsonInit() {
    newGrid();
    // pick random cell to start tree
    const sx = Math.floor(Math.random() * W);
    const sy = Math.floor(Math.random() * H);
    visited[sy][sx] = true;
    runState = { kind: 'wilson', walk: null };
  }
  function wilsonStep() {
    // If no current walk, find an unvisited cell, start one
    if (!runState.walk) {
      let found = null;
      for (let y = 0; y < H && !found; y++) for (let x = 0; x < W && !found; x++) if (!visited[y][x]) found = [x, y];
      if (!found) return false;
      runState.walk = { path: [found], dirs: new Map() };
    }
    const w = runState.walk;
    const cur = w.path[w.path.length - 1];
    const [cx, cy] = cur;
    const moves = [];
    for (const [dx, dy, w1, w2] of [[0,-1,'top','bottom'],[1,0,'right','left'],[0,1,'bottom','top'],[-1,0,'left','right']]) {
      const nx = cx + dx, ny = cy + dy;
      if (nx >= 0 && nx < W && ny >= 0 && ny < H) moves.push([nx, ny, w1, w2]);
    }
    const m = moves[Math.floor(Math.random() * moves.length)];
    const [nx, ny, w1, w2] = m;
    w.dirs.set(`${cx},${cy}`, { nx, ny, w1, w2 });
    if (visited[ny][nx]) {
      // commit walk by following dirs
      let [x, y] = w.path[0];
      while (true) {
        const d = w.dirs.get(`${x},${y}`);
        if (!d) break;
        cells[y][x][d.w1] = false;
        cells[d.ny][d.nx][d.w2] = false;
        visited[y][x] = true;
        x = d.nx; y = d.ny;
        if (visited[y][x]) break;
      }
      runState.walk = null;
    } else {
      // check loop erase
      const idx = w.path.findIndex(([x, y]) => x === nx && y === ny);
      if (idx >= 0) {
        w.path = w.path.slice(0, idx + 1);
      } else {
        w.path.push([nx, ny]);
      }
    }
    return true;
  }

  function init() {
    if (params.algo === 'dfs') dfsInit();
    else if (params.algo === 'prim') primInit();
    else wilsonInit();
  }
  init();

  function step() {
    if (params.algo === 'dfs') return dfsStep();
    if (params.algo === 'prim') return primStep();
    return wilsonStep();
  }

  function draw() {
    const ctx = cv.ctx;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, cv.width, cv.height);
    const cw = cv.width / W, ch = cv.height / H;
    // visited cells
    ctx.fillStyle = '#1f2937';
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      if (visited[y][x]) ctx.fillRect(x * cw, y * ch, cw, ch);
    }
    // walk path (Wilson)
    if (runState && runState.kind === 'wilson' && runState.walk) {
      ctx.fillStyle = 'rgba(245,158,11,0.4)';
      for (const [x, y] of runState.walk.path) ctx.fillRect(x * cw, y * ch, cw, ch);
    }
    // walls
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const c = cells[y][x];
        if (c.top) line(ctx, x * cw, y * ch, (x + 1) * cw, y * ch);
        if (c.right) line(ctx, (x + 1) * cw, y * ch, (x + 1) * cw, (y + 1) * ch);
        if (c.bottom) line(ctx, x * cw, (y + 1) * ch, (x + 1) * cw, (y + 1) * ch);
        if (c.left) line(ctx, x * cw, y * ch, x * cw, (y + 1) * ch);
      }
    }
  }
  function line(ctx, x1, y1, x2, y2) {
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  }

  // controls
  const algoSel = select({
    label: 'Algorithm',
    options: [
      { value: 'dfs', label: 'Recursive backtracking (DFS)' },
      { value: 'prim', label: "Prim's algorithm" },
      { value: 'wilson', label: "Wilson's (loop-erased random walk)" },
    ],
    value: params.algo,
    onChange: (v) => { params.algo = v; init(); },
  });
  const speedS = slider({ label: 'Steps / second', min: 5, max: 500, step: 5, value: params.speed,
    onInput: (v) => { params.speed = v; } });
  const resetB = button({ label: 'Regenerate', primary: true, onClick: init });
  const finishB = button({ label: 'Finish instantly', onClick: () => {
    let safety = 5000;
    while (step() && --safety > 0) {}
  } });
  ctrlPanel.append(algoSel.el, speedS.el, row(resetB, finishB));

  let raf = 0, last = 0, acc = 0;
  function tick(ts) {
    if (!last) last = ts;
    const dt = (ts - last) / 1000; last = ts;
    acc += dt * params.speed;
    while (acc >= 1) { if (!step()) break; acc -= 1; }
    draw();
    raf = requestAnimationFrame(tick);
  }
  raf = requestAnimationFrame(tick);

  return () => { cancelAnimationFrame(raf); cv.destroy(); };
}
