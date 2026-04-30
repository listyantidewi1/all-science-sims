import { createCanvas, loop } from '../../../lib/canvas.js';
import { select, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { mode: 'flicker' };
  // Two "scenes" — random arrangement of N shapes; one shape changes.
  const state = { shapes: [], changedIdx: -1, t: 0, found: null, startTime: 0 };

  function newScene() {
    state.shapes = [];
    const N = 12;
    for (let i = 0; i < N; i++) {
      const x = 80 + Math.random() * (cv.width - 160);
      const y = 80 + Math.random() * (cv.height - 160);
      const colors = ['#ef4444', '#0ea5e9', '#10b981', '#fbbf24', '#a855f7'];
      const shapes = ['circle', 'square', 'triangle'];
      state.shapes.push({
        x, y,
        colorA: colors[Math.floor(Math.random() * colors.length)],
        colorB: null,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        size: 28 + Math.random() * 16,
      });
      state.shapes[i].colorB = state.shapes[i].colorA;
    }
    state.changedIdx = Math.floor(Math.random() * N);
    const colors = ['#ef4444', '#0ea5e9', '#10b981', '#fbbf24', '#a855f7'];
    let newC;
    do { newC = colors[Math.floor(Math.random() * colors.length)]; } while (newC === state.shapes[state.changedIdx].colorA);
    state.shapes[state.changedIdx].colorB = newC;
    state.found = null;
    state.startTime = performance.now();
    state.t = 0;
  }
  newScene();

  function step(dt) { state.t += dt; }

  function activeScene() {
    if (params.mode === 'continuous') return 'A';
    // flicker: scene A 0..0.6s, blank 0.6..0.7s, scene B 0.7..1.3s, blank 1.3..1.4s
    const ph = (state.t % 1.4);
    if (ph < 0.6) return 'A';
    if (ph < 0.7) return 'blank';
    if (ph < 1.3) return 'B';
    return 'blank';
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const phase = activeScene();
    if (phase === 'blank') {
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      ctx.fillRect(0, 0, W, H);
    } else if (params.mode === 'continuous' && state.t > 0.5 && Math.floor(state.t * 2) % 2 === 1) {
      // For continuous mode: alternate slowly so the change is obvious
      drawShapes(ctx, 'B');
    } else if (params.mode === 'continuous') {
      drawShapes(ctx, 'A');
    } else {
      drawShapes(ctx, phase);
    }

    if (state.found) {
      ctx.fillStyle = state.found.correct ? 'rgba(16,185,129,0.85)' : 'rgba(239,68,68,0.85)';
      ctx.fillRect(W * 0.3, H * 0.4, W * 0.4, 80);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 16px var(--font-sans)';
      ctx.textAlign = 'center';
      ctx.fillText(state.found.correct ? `Found in ${state.found.ms.toFixed(0)} ms` : 'Wrong target', W / 2, H * 0.45);
      ctx.font = '12px var(--font-sans)';
      ctx.fillText('Click "New trial" to try again', W / 2, H * 0.45 + 22);
      ctx.textAlign = 'left';
    }

    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 50);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`Find the changing shape    mode: ${params.mode}`, 16, 30);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`elapsed: ${state.t.toFixed(1)} s`, 16, 50);
  }

  function drawShapes(ctx, which) {
    for (let i = 0; i < state.shapes.length; i++) {
      const s = state.shapes[i];
      const color = which === 'A' ? s.colorA : s.colorB;
      ctx.fillStyle = color;
      if (s.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (s.shape === 'square') {
        ctx.fillRect(s.x - s.size / 2, s.y - s.size / 2, s.size, s.size);
      } else {
        ctx.beginPath();
        ctx.moveTo(s.x, s.y - s.size / 2);
        ctx.lineTo(s.x - s.size / 2, s.y + s.size / 2);
        ctx.lineTo(s.x + s.size / 2, s.y + s.size / 2);
        ctx.closePath();
        ctx.fill();
      }
    }
  }

  cv.canvas.addEventListener('click', (e) => {
    if (state.found) return;
    const r = cv.canvas.getBoundingClientRect();
    const sx = (e.clientX - r.left) * cv.width / r.width;
    const sy = (e.clientY - r.top) * cv.height / r.height;
    const target = state.shapes[state.changedIdx];
    if (Math.hypot(sx - target.x, sy - target.y) < target.size) {
      state.found = { correct: true, ms: performance.now() - state.startTime };
    } else {
      state.found = { correct: false, ms: performance.now() - state.startTime };
    }
  });

  // controls
  const modeSel = select({
    label: 'Mode',
    options: [
      { value: 'flicker',     label: 'Flicker (with blank — change blindness)' },
      { value: 'continuous',  label: 'Continuous (no blank — pop-out)' },
    ],
    value: params.mode,
    onChange: (v) => { params.mode = v; newScene(); },
  });
  const newB = button({ label: 'New trial', primary: true, onClick: newScene });

  ctrlPanel.append(modeSel.el, row(newB));

  const animator = loop((dt) => { step(Math.min(0.05, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
