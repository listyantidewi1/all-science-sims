import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const params = {
    rows: 12,
    bias: 0.5,
    rate: 30,
  };

  let balls = [];
  let bins = [];
  let lastSpawn = 0;

  function reset() {
    balls = [];
    bins = new Array(params.rows + 1).fill(0);
  }
  reset();

  function step(dt) {
    lastSpawn += dt;
    const period = 1 / params.rate;
    while (lastSpawn > period) {
      balls.push({ x: 0, y: 0, row: 0, slot: 0, vy: 80 + Math.random() * 20 });
      lastSpawn -= period;
    }
    for (let i = balls.length - 1; i >= 0; i--) {
      const b = balls[i];
      b.y += b.vy * dt;
      // when row advances, bounce
      const targetY = (b.row + 1) * (cv.height * 0.7) / (params.rows + 1);
      if (b.y > targetY) {
        b.row++;
        if (Math.random() < params.bias) b.slot++;
        if (b.row > params.rows) {
          bins[b.slot]++;
          balls.splice(i, 1);
          if (bins.reduce((s, v) => s + v, 0) > 8000) {
            // cap memory
          }
          continue;
        }
      }
      // x is centered + slot * spacing
      const cx = cv.width / 2;
      const colSpacing = (cv.width * 0.7) / (params.rows + 1);
      b.x = cx - (b.row * colSpacing / 2) + b.slot * colSpacing;
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const cx = W / 2;
    const colSpacing = (W * 0.7) / (params.rows + 1);
    const rowH = (H * 0.7) / (params.rows + 1);

    // pegs
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    for (let r = 0; r < params.rows; r++) {
      for (let s = 0; s <= r; s++) {
        const x = cx - (r * colSpacing / 2) + s * colSpacing;
        const y = (r + 1) * rowH;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // balls
    for (const b of balls) {
      ctx.fillStyle = '#0ea5e9';
      ctx.beginPath();
      ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // bins / histogram
    const histY = H * 0.72;
    const histH = H - histY - 16;
    const max = Math.max(...bins, 1);
    const binW = (W * 0.7) / (params.rows + 1);
    for (let i = 0; i <= params.rows; i++) {
      const x = cx - ((params.rows + 1) * binW / 2) + i * binW;
      const h = (bins[i] / max) * histH;
      ctx.fillStyle = '#ec4899';
      ctx.fillRect(x + 2, histY + histH - h, binW - 4, h);
    }

    // overlay theoretical binomial
    const totalDropped = bins.reduce((s, v) => s + v, 0);
    if (totalDropped > 0) {
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.beginPath();
      let cum = 1;
      for (let i = 0; i <= params.rows; i++) {
        const p = binomial(params.rows, i, params.bias);
        const expected = totalDropped * p;
        const x = cx - ((params.rows + 1) * binW / 2) + i * binW + binW / 2;
        const y = histY + histH - (expected / max) * histH;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 280, 28);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`Total dropped: ${totalDropped}    rows: ${params.rows}    p = ${params.bias.toFixed(2)}`, 16, 28);
  }

  function binomial(n, k, p) {
    if (k < 0 || k > n) return 0;
    let logC = 0;
    for (let i = 0; i < k; i++) logC += Math.log(n - i) - Math.log(i + 1);
    return Math.exp(logC + k * Math.log(p) + (n - k) * Math.log(1 - p));
  }

  // controls
  const rS = slider({ label: 'Rows', min: 3, max: 18, step: 1, value: params.rows,
    onInput: (v) => { params.rows = v; reset(); } });
  const bS = slider({ label: 'Right-bias p', min: 0.1, max: 0.9, step: 0.01, value: params.bias, format: (v) => v.toFixed(2),
    onInput: (v) => { params.bias = v; } });
  const rateS = slider({ label: 'Drop rate', min: 1, max: 100, step: 1, value: params.rate,
    onInput: (v) => { params.rate = v; } });
  const burstB = button({ label: 'Drop 100 instantly', primary: true, onClick: () => {
    for (let k = 0; k < 100; k++) {
      let slot = 0;
      for (let r = 0; r < params.rows; r++) if (Math.random() < params.bias) slot++;
      bins[slot]++;
    }
  } });
  const resetB = button({ label: 'Reset', onClick: reset });

  ctrlPanel.append(rS.el, bS.el, rateS.el, row(burstB, resetB));

  const animator = loop((dt) => { step(Math.min(0.05, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
