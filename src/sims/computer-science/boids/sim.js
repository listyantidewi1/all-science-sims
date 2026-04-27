import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    n: 80,
    radius: 60,
    sep: 1.5,
    align: 1.0,
    cohese: 1.0,
    maxSpeed: 200,
  };

  let boids = [];
  function spawn() {
    boids = [];
    for (let i = 0; i < params.n; i++) {
      const a = Math.random() * Math.PI * 2;
      boids.push({
        x: Math.random() * cv.width,
        y: Math.random() * cv.height,
        vx: Math.cos(a) * params.maxSpeed * 0.5,
        vy: Math.sin(a) * params.maxSpeed * 0.5,
      });
    }
  }
  spawn();

  function step(dt) {
    while (boids.length < params.n) {
      const a = Math.random() * Math.PI * 2;
      boids.push({ x: Math.random() * cv.width, y: Math.random() * cv.height,
        vx: Math.cos(a) * params.maxSpeed * 0.5, vy: Math.sin(a) * params.maxSpeed * 0.5 });
    }
    while (boids.length > params.n) boids.pop();

    for (const b of boids) {
      let sepX = 0, sepY = 0, alX = 0, alY = 0, cohX = 0, cohY = 0, count = 0;
      for (const o of boids) {
        if (o === b) continue;
        const dx = o.x - b.x, dy = o.y - b.y;
        const d = Math.hypot(dx, dy);
        if (d > 0 && d < params.radius) {
          if (d < params.radius * 0.4) {
            sepX -= dx / d / d;
            sepY -= dy / d / d;
          }
          alX += o.vx;
          alY += o.vy;
          cohX += o.x;
          cohY += o.y;
          count++;
        }
      }
      let ax = 0, ay = 0;
      if (count > 0) {
        alX /= count; alY /= count;
        cohX /= count; cohY /= count;
        ax += sepX * 1500 * params.sep;
        ay += sepY * 1500 * params.sep;
        ax += (alX - b.vx) * 0.6 * params.align;
        ay += (alY - b.vy) * 0.6 * params.align;
        ax += (cohX - b.x) * 0.4 * params.cohese;
        ay += (cohY - b.y) * 0.4 * params.cohese;
      }
      b.vx += ax * dt;
      b.vy += ay * dt;
      const sp = Math.hypot(b.vx, b.vy);
      if (sp > params.maxSpeed) {
        b.vx = b.vx / sp * params.maxSpeed;
        b.vy = b.vy / sp * params.maxSpeed;
      }
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      // wrap
      if (b.x < 0) b.x += cv.width; else if (b.x > cv.width) b.x -= cv.width;
      if (b.y < 0) b.y += cv.height; else if (b.y > cv.height) b.y -= cv.height;
    }
  }

  function draw() {
    const ctx = cv.ctx;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, cv.width, cv.height);
    for (const b of boids) {
      const ang = Math.atan2(b.vy, b.vx);
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(ang);
      ctx.fillStyle = '#a78bfa';
      ctx.beginPath();
      ctx.moveTo(8, 0);
      ctx.lineTo(-5, 4);
      ctx.lineTo(-5, -4);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 200, 22);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText(`${boids.length} boids   ·   click to scatter`, 14, 24);
  }

  cv.canvas.style.cursor = 'pointer';
  cv.canvas.addEventListener('click', (e) => {
    const rect = cv.canvas.getBoundingClientRect();
    const sx = (e.clientX - rect.left) * cv.width / rect.width;
    const sy = (e.clientY - rect.top) * cv.height / rect.height;
    for (const b of boids) {
      const dx = b.x - sx, dy = b.y - sy;
      const d = Math.hypot(dx, dy) + 1;
      const force = 80000 / (d * d);
      b.vx += dx / d * force;
      b.vy += dy / d * force;
    }
  });

  // controls
  const nS = slider({ label: 'Number of boids', min: 10, max: 250, step: 5, value: params.n,
    onInput: (v) => { params.n = v; } });
  const rS = slider({ label: 'Neighbor radius', min: 20, max: 150, step: 5, value: params.radius,
    onInput: (v) => { params.radius = v; } });
  const sepS = slider({ label: 'Separation', min: 0, max: 5, step: 0.05, value: params.sep, format: (v) => v.toFixed(2),
    onInput: (v) => { params.sep = v; } });
  const alS = slider({ label: 'Alignment', min: 0, max: 5, step: 0.05, value: params.align, format: (v) => v.toFixed(2),
    onInput: (v) => { params.align = v; } });
  const cohS = slider({ label: 'Cohesion', min: 0, max: 5, step: 0.05, value: params.cohese, format: (v) => v.toFixed(2),
    onInput: (v) => { params.cohese = v; } });
  const resetB = button({ label: 'Reset', primary: true, onClick: spawn });

  ctrlPanel.append(nS.el, rS.el, sepS.el, alS.el, cohS.el, row(resetB));

  const animator = loop((dt) => { step(Math.min(0.05, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
