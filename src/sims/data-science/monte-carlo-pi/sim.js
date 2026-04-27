import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { rate: 200, running: true };
  let inside = 0, total = 0;
  let darts = []; // {x, y, in}
  let history = []; // running pi estimates

  function reset() {
    inside = 0; total = 0; darts = []; history = [];
  }

  function step(dt) {
    if (!params.running) return;
    const n = Math.max(1, Math.round(params.rate * dt));
    for (let i = 0; i < n; i++) {
      const x = Math.random();
      const y = Math.random();
      const isIn = x * x + y * y <= 1;
      if (isIn) inside++;
      total++;
      if (darts.length < 5000) darts.push({ x, y, in: isIn });
      else darts[Math.floor(Math.random() * darts.length)] = { x, y, in: isIn };
    }
    if (total > 0) history.push(4 * inside / total);
    if (history.length > 600) history.shift();
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const sqSize = Math.min(W * 0.45, H * 0.85);
    const sqX = 30, sqY = (H - sqSize) / 2;

    // square
    ctx.strokeStyle = 'rgba(120,130,150,0.5)';
    ctx.lineWidth = 2;
    ctx.strokeRect(sqX, sqY, sqSize, sqSize);

    // quarter circle from (0,1) corner — origin at bottom-left of square
    ctx.fillStyle = 'rgba(59,130,246,0.18)';
    ctx.beginPath();
    ctx.moveTo(sqX, sqY + sqSize);
    ctx.arc(sqX, sqY + sqSize, sqSize, -Math.PI / 2, 0);
    ctx.lineTo(sqX, sqY + sqSize);
    ctx.fill();

    // darts
    for (const d of darts) {
      ctx.fillStyle = d.in ? '#10b981' : '#ef4444';
      ctx.beginPath();
      ctx.arc(sqX + d.x * sqSize, sqY + sqSize - d.y * sqSize, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // estimate
    const piEst = total > 0 ? 4 * inside / total : 0;
    const err = Math.abs(piEst - Math.PI);

    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(sqX, sqY - 38, 280, 32);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-sans)';
    ctx.fillText(`π ≈ ${piEst.toFixed(5)}    (true: ${Math.PI.toFixed(5)})`, sqX + 8, sqY - 18);
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`error: ${err.toFixed(5)}    after ${total.toLocaleString()} darts`, sqX + 8, sqY - 4);

    // history graph
    const gx = sqX + sqSize + 30, gy = sqY, gw = W - gx - 30, gh = sqSize;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(gx, gy, gw, gh);
    // pi line
    ctx.strokeStyle = 'rgba(245,158,11,0.6)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(gx, gy + gh / 2);
    ctx.lineTo(gx + gw, gy + gh / 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(245,158,11,0.85)';
    ctx.font = '10px var(--font-mono)';
    ctx.fillText('π = 3.14159…', gx + gw - 90, gy + gh / 2 - 4);

    if (history.length > 1) {
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      const maxDev = 0.5;
      for (let i = 0; i < history.length; i++) {
        const x = gx + (i / 600) * gw;
        const y = gy + gh / 2 + (Math.PI - history[i]) / maxDev * (gh / 2 - 8);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Running estimate of π', gx + 6, gy - 4);
    ctx.fillText('darts thrown →', gx + gw - 80, gy + gh + 14);
  }

  // controls
  const rateS = slider({ label: 'Darts / second', min: 10, max: 5000, step: 10, value: params.rate,
    onInput: (v) => { params.rate = v; } });
  const runT = toggle({ label: 'Running', value: params.running, onChange: (v) => { params.running = v; } });
  const burstB = button({ label: 'Throw 1000', primary: true, onClick: () => {
    for (let i = 0; i < 1000; i++) step(0.01);
  } });
  const resetB = button({ label: 'Reset', onClick: reset });
  ctrlPanel.append(rateS.el, runT.el, row(burstB, resetB));

  const animator = loop((dt) => { step(Math.min(0.1, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
