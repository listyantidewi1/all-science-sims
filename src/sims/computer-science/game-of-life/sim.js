import { createCanvas } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';

const W = 60, H = 36;

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: W / H });

  let grid = new Uint8Array(W * H);
  let next = new Uint8Array(W * H);
  let running = false;
  let speed = 6;
  let painting = 0; // 0=none, 1=add, 2=remove
  let gen = 0;

  function step() {
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        let n = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const nx = (x + dx + W) % W, ny = (y + dy + H) % H;
            n += grid[ny * W + nx];
          }
        }
        const idx = y * W + x;
        if (grid[idx] === 1) next[idx] = (n === 2 || n === 3) ? 1 : 0;
        else next[idx] = n === 3 ? 1 : 0;
      }
    }
    [grid, next] = [next, grid];
    gen++;
  }

  function draw() {
    const ctx = cv.ctx;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, cv.width, cv.height);
    const cw = cv.width / W, ch = cv.height / H;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        if (grid[y * W + x]) {
          ctx.fillStyle = '#a78bfa';
          ctx.fillRect(x * cw, y * ch, cw - 0.5, ch - 0.5);
        }
      }
    }
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 130, 22);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText(`Generation: ${gen}`, 14, 24);
  }

  // Mouse paint
  function cellAt(e) {
    const rect = cv.canvas.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * W);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * H);
    return { x, y };
  }
  cv.canvas.style.cursor = 'pointer';
  cv.canvas.addEventListener('mousedown', (e) => {
    const { x, y } = cellAt(e);
    if (x < 0 || x >= W || y < 0 || y >= H) return;
    const idx = y * W + x;
    painting = grid[idx] ? 2 : 1;
    grid[idx] = painting === 1 ? 1 : 0;
  });
  cv.canvas.addEventListener('mousemove', (e) => {
    if (!painting) return;
    const { x, y } = cellAt(e);
    if (x < 0 || x >= W || y < 0 || y >= H) return;
    grid[y * W + x] = painting === 1 ? 1 : 0;
  });
  window.addEventListener('mouseup', () => { painting = 0; });

  function placeGlider(x, y) {
    const cells = [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]];
    for (const [dx, dy] of cells) {
      const nx = (x + dx + W) % W, ny = (y + dy + H) % H;
      grid[ny * W + nx] = 1;
    }
  }
  function placeBlinker(x, y) {
    for (let i = 0; i < 3; i++) grid[((y) * W + ((x + i) % W))] = 1;
  }
  function placePulsar(x, y) {
    const pattern = [
      [2,0],[3,0],[4,0],[8,0],[9,0],[10,0],
      [0,2],[5,2],[7,2],[12,2],
      [0,3],[5,3],[7,3],[12,3],
      [0,4],[5,4],[7,4],[12,4],
      [2,5],[3,5],[4,5],[8,5],[9,5],[10,5],
      [2,7],[3,7],[4,7],[8,7],[9,7],[10,7],
      [0,8],[5,8],[7,8],[12,8],
      [0,9],[5,9],[7,9],[12,9],
      [0,10],[5,10],[7,10],[12,10],
      [2,12],[3,12],[4,12],[8,12],[9,12],[10,12],
    ];
    for (const [dx, dy] of pattern) {
      const nx = (x + dx + W) % W, ny = (y + dy + H) % H;
      grid[ny * W + nx] = 1;
    }
  }
  function randomFill(p = 0.3) {
    for (let i = 0; i < grid.length; i++) grid[i] = Math.random() < p ? 1 : 0;
    gen = 0;
  }

  // controls
  const speedS = slider({ label: 'Steps / sec', min: 1, max: 30, step: 1, value: speed,
    onInput: (v) => { speed = v; } });
  const runB = button({ label: 'Run', primary: true, onClick: () => { running = !running; runB.label = running ? 'Pause' : 'Run'; } });
  const stepB = button({ label: 'Step', onClick: () => { step(); draw(); } });
  const clearB = button({ label: 'Clear', onClick: () => { grid.fill(0); gen = 0; } });
  const randB = button({ label: 'Random', onClick: () => randomFill() });
  const glidB = button({ label: 'Glider', onClick: () => { grid.fill(0); placeGlider(2, 2); gen = 0; } });
  const blinkB = button({ label: 'Blinker', onClick: () => { grid.fill(0); placeBlinker(W / 2 | 0, H / 2 | 0); gen = 0; } });
  const pulsB = button({ label: 'Pulsar', onClick: () => { grid.fill(0); placePulsar(W / 2 - 6 | 0, H / 2 - 6 | 0); gen = 0; } });

  ctrlPanel.append(speedS.el, row(runB, stepB, clearB, randB), row(glidB, blinkB, pulsB));

  let raf = 0, last = 0, acc = 0;
  function tick(ts) {
    if (!last) last = ts;
    const dt = (ts - last) / 1000; last = ts;
    if (running) {
      acc += dt * speed;
      while (acc >= 1) { step(); acc -= 1; }
    }
    draw();
    raf = requestAnimationFrame(tick);
  }
  randomFill(0.25);
  raf = requestAnimationFrame(tick);

  return () => { cancelAnimationFrame(raf); cv.destroy(); };
}
