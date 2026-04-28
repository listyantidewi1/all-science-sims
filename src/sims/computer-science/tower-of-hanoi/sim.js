import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { N: 4 };
  let pegs = [[], [], []];
  let moves = 0;
  let selected = -1;
  let plan = [];      // queued auto-moves
  let autoTimer = null;

  function reset() {
    pegs = [[], [], []];
    for (let i = params.N; i >= 1; i--) pegs[0].push(i);
    moves = 0;
    selected = -1;
    plan = [];
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = null;
    autoB.label = 'Auto-solve';
  }
  reset();

  function legalMove(from, to) {
    if (pegs[from].length === 0) return false;
    const top = pegs[from][pegs[from].length - 1];
    if (pegs[to].length > 0 && pegs[to][pegs[to].length - 1] < top) return false;
    return true;
  }
  function move(from, to) {
    if (!legalMove(from, to)) return false;
    pegs[to].push(pegs[from].pop());
    moves++;
    return true;
  }
  function planSolve(n, from, via, to) {
    if (n === 0) return;
    planSolve(n - 1, from, to, via);
    plan.push([from, to]);
    planSolve(n - 1, via, from, to);
  }

  function pegX(i) { return cv.width * (0.25 + i * 0.25); }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const baseY = H - 80;
    // base + pegs
    ctx.fillStyle = '#475569';
    ctx.fillRect(60, baseY, W - 120, 12);
    for (let i = 0; i < 3; i++) {
      const x = pegX(i);
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(x - 4, baseY - 200, 8, 200);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px var(--font-mono)';
      ctx.textAlign = 'center';
      ctx.fillText(['A', 'B', 'C'][i], x, baseY + 32);
      if (i === selected) {
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, baseY + 30, 18, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.textAlign = 'left';
    }

    // Disks
    const diskH = 22;
    for (let p = 0; p < 3; p++) {
      const stack = pegs[p];
      for (let s = 0; s < stack.length; s++) {
        const size = stack[s];
        const w = 30 + size * 20;
        const x = pegX(p);
        const y = baseY - 12 - (s + 1) * diskH;
        const hue = 200 + size * 30;
        ctx.fillStyle = `hsl(${hue}, 70%, 55%)`;
        ctx.fillRect(x - w / 2, y, w, diskH - 2);
        ctx.strokeStyle = '#0b1220';
        ctx.lineWidth = 2;
        ctx.strokeRect(x - w / 2, y, w, diskH - 2);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px var(--font-mono)';
        ctx.textAlign = 'center';
        ctx.fillText(String(size), x, y + diskH / 2 + 3);
        ctx.textAlign = 'left';
      }
    }

    // Header
    const optimum = (1 << params.N) - 1;
    const won = pegs[2].length === params.N;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 50);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`Moves: ${moves} / optimum 2^${params.N} − 1 = ${optimum}`, 16, 28);
    ctx.fillStyle = won ? '#10b981' : 'rgba(120,130,150,0.85)';
    ctx.font = '12px var(--font-mono)';
    ctx.fillText(won ? '✓ Solved!' : 'Click peg to pick up, then peg to drop on.', 16, 48);
  }

  cv.canvas.addEventListener('click', (e) => {
    const rect = cv.canvas.getBoundingClientRect();
    const sx = (e.clientX - rect.left) * cv.width / rect.width;
    let pegIdx = -1;
    for (let i = 0; i < 3; i++) if (Math.abs(sx - pegX(i)) < 80) pegIdx = i;
    if (pegIdx < 0) return;
    if (selected === -1) {
      if (pegs[pegIdx].length > 0) selected = pegIdx;
    } else if (selected === pegIdx) {
      selected = -1;
    } else {
      move(selected, pegIdx);
      selected = -1;
    }
  });

  // controls
  const NS = slider({ label: 'Number of disks', min: 2, max: 8, step: 1, value: params.N,
    onInput: (v) => { params.N = v; reset(); } });
  const resetB = button({ label: 'Reset', onClick: reset });
  const autoB = button({ label: 'Auto-solve', primary: true, onClick: () => {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
      autoB.label = 'Auto-solve';
      return;
    }
    plan = [];
    planSolve(params.N, 0, 1, 2);
    autoB.label = 'Stop';
    autoTimer = setInterval(() => {
      const m = plan.shift();
      if (!m) {
        clearInterval(autoTimer);
        autoTimer = null;
        autoB.label = 'Auto-solve';
        return;
      }
      move(m[0], m[1]);
    }, 380);
  } });

  ctrlPanel.append(NS.el, row(resetB, autoB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); if (autoTimer) clearInterval(autoTimer); cv.destroy(); };
}
