import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    type: 'convergent', // 'convergent' | 'divergent' | 'transform'
    speed: 1.0,
    pause: false,
  };

  let t = 0;
  let mountainHeight = 0;
  let riftWidth = 0;
  let earthquakes = []; // {x, y, age}

  function reset() { t = 0; mountainHeight = 0; riftWidth = 0; earthquakes = []; }

  function maybeQuake(x, y) {
    if (Math.random() < 0.1) earthquakes.push({ x, y, age: 0 });
  }

  function step(dt) {
    if (params.pause) return;
    t += dt * params.speed;
    if (params.type === 'convergent') {
      mountainHeight = Math.min(60, mountainHeight + dt * params.speed * 6);
      maybeQuake(cv.width / 2 + (Math.random() - 0.5) * 80, cv.height / 2 - mountainHeight * Math.random());
    } else if (params.type === 'divergent') {
      riftWidth = Math.min(140, riftWidth + dt * params.speed * 8);
      if (Math.random() < 0.04) maybeQuake(cv.width / 2 + (Math.random() - 0.5) * riftWidth, cv.height / 2);
    } else {
      // transform — frequent shallow quakes along boundary
      if (Math.random() < 0.2) maybeQuake(cv.width / 2 + (Math.random() - 0.5) * 4, cv.height / 2 + (Math.random() - 0.5) * 30);
    }
    earthquakes.forEach((q) => q.age += dt);
    earthquakes = earthquakes.filter((q) => q.age < 1.5);
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    // sky
    const sky = ctx.createLinearGradient(0, 0, 0, H / 2);
    sky.addColorStop(0, '#bae6fd');
    sky.addColorStop(1, '#e0f2fe');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H / 2);

    // mantle
    ctx.fillStyle = '#92400e';
    ctx.fillRect(0, H / 2, W, H / 2);
    // mantle convection hint
    ctx.fillStyle = 'rgba(252,165,165,0.4)';
    for (let i = 0; i < 6; i++) {
      const cx = W * (i + 0.5) / 6;
      const r = 30 + 8 * Math.sin(t * 0.5 + i);
      ctx.beginPath();
      ctx.arc(cx, H * 0.85 + 4 * Math.cos(t * 0.4 + i), r, 0, Math.PI * 2);
      ctx.fill();
    }

    const surfaceY = H / 2;

    // Plates depending on type
    if (params.type === 'convergent') {
      // left plate (oceanic) sliding down under right (continental)
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.moveTo(0, surfaceY);
      ctx.lineTo(W / 2 - 30, surfaceY);
      ctx.lineTo(W / 2 + 60, surfaceY + 100);
      ctx.lineTo(W / 2 + 30, surfaceY + 130);
      ctx.lineTo(0, surfaceY + 60);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#65a30d';
      ctx.beginPath();
      ctx.moveTo(W / 2 - 30, surfaceY);
      ctx.lineTo(W / 2 + 100, surfaceY - mountainHeight);
      ctx.lineTo(W / 2 + 220, surfaceY);
      ctx.lineTo(W / 2 + 220, surfaceY + 80);
      ctx.lineTo(W, surfaceY + 80);
      ctx.lineTo(W, surfaceY + 30);
      ctx.lineTo(W / 2 - 30, surfaceY);
      ctx.closePath();
      ctx.fill();
      // arrows
      drawArrow(ctx, W / 2 - 200, surfaceY - 40, W / 2 - 80, surfaceY - 40, '#fff');
      drawArrow(ctx, W / 2 + 240, surfaceY - 60, W / 2 + 140, surfaceY - 60, '#fff');
      label(ctx, 'Subduction', W / 2 + 60, surfaceY + 90);
      label(ctx, 'Mountains', W / 2 + 90, surfaceY - mountainHeight - 10);
    } else if (params.type === 'divergent') {
      ctx.fillStyle = '#475569';
      ctx.fillRect(0, surfaceY, W / 2 - riftWidth / 2, 80);
      ctx.fillRect(W / 2 + riftWidth / 2, surfaceY, W - (W / 2 + riftWidth / 2), 80);
      // magma in rift
      const grad = ctx.createLinearGradient(W / 2, surfaceY, W / 2, surfaceY + 80);
      grad.addColorStop(0, '#fbbf24');
      grad.addColorStop(1, '#7f1d1d');
      ctx.fillStyle = grad;
      ctx.fillRect(W / 2 - riftWidth / 2, surfaceY, riftWidth, 80);
      // arrows
      drawArrow(ctx, W / 2 - 200, surfaceY - 30, W / 2 - 80 - riftWidth / 2, surfaceY - 30, '#fff');
      drawArrow(ctx, W / 2 + 200, surfaceY - 30, W / 2 + 80 + riftWidth / 2, surfaceY - 30, '#fff', true);
      label(ctx, 'Mid-ocean ridge', W / 2 - 60, surfaceY - 50);
    } else {
      // transform: side-by-side, sliding past
      const offset = (t * 30 * params.speed) % 80;
      ctx.fillStyle = '#475569';
      ctx.fillRect(0, surfaceY, W / 2, 100);
      ctx.fillRect(W / 2, surfaceY, W / 2, 100);
      // stripes
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      for (let i = 0; i < 8; i++) {
        ctx.fillRect(0, surfaceY + 20 + i * 12 + (offset / 4), W / 2, 4);
        ctx.fillRect(W / 2, surfaceY + 20 + i * 12 - (offset / 4), W / 2, 4);
      }
      // dashed boundary
      ctx.strokeStyle = '#fff';
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(W / 2, surfaceY);
      ctx.lineTo(W / 2, surfaceY + 100);
      ctx.stroke();
      ctx.setLineDash([]);
      drawArrow(ctx, W / 2 - 200, surfaceY - 30, W / 2 - 80, surfaceY - 30, '#fff');
      drawArrow(ctx, W / 2 + 200, surfaceY - 30, W / 2 + 80, surfaceY - 30, '#fff', true);
      label(ctx, 'Transform fault', W / 2 - 50, surfaceY - 50);
    }

    // earthquakes
    for (const q of earthquakes) {
      const a = 1 - q.age / 1.5;
      ctx.strokeStyle = `rgba(239,68,68,${a})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(q.x, q.y, q.age * 30, 0, Math.PI * 2);
      ctx.stroke();
    }

    // title
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(8, 8, 200, 28);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-sans)';
    ctx.fillText(params.type[0].toUpperCase() + params.type.slice(1) + ' boundary', 14, 27);
  }

  function drawArrow(ctx, x1, y1, x2, y2, color = '#fff', reverse = false) {
    if (reverse) [x1, x2, y1, y2] = [x2, x1, y2, y1];
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    const ang = Math.atan2(y2 - y1, x2 - x1);
    const sz = 8;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - sz * Math.cos(ang - 0.4), y2 - sz * Math.sin(ang - 0.4));
    ctx.lineTo(x2 - sz * Math.cos(ang + 0.4), y2 - sz * Math.sin(ang + 0.4));
    ctx.closePath();
    ctx.fill();
  }
  function label(ctx, text, x, y) {
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    const m = ctx.measureText(text);
    ctx.fillRect(x - 4, y - 12, m.width + 8, 16);
    ctx.fillStyle = '#fff';
    ctx.fillText(text, x, y);
  }

  // controls
  const typeSel = select({
    label: 'Boundary type',
    options: [
      { value: 'convergent', label: 'Convergent' },
      { value: 'divergent',  label: 'Divergent' },
      { value: 'transform',  label: 'Transform' },
    ],
    value: params.type,
    onChange: (v) => { params.type = v; reset(); },
  });
  const speedS = slider({
    label: 'Plate speed', min: 0.1, max: 3, step: 0.05, value: params.speed, format: (v) => v.toFixed(2),
    onInput: (v) => { params.speed = v; },
  });
  const resetB = button({ label: 'Reset', onClick: reset });
  ctrlPanel.append(typeSel.el, speedS.el, row(resetB));

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
