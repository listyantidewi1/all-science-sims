import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';
import { cssVar } from '../../../lib/color.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  // World: meters; canvas: pixels. Pick a scale that fits typical ranges.
  const WORLD_W = 200; // meters horizontal
  const GROUND_M = 0;  // ground level in meters
  let scale = 1;       // px per meter, set on resize
  let originX = 40;
  let originY = 0;

  const params = {
    angle: 45,    // deg
    speed: 35,    // m/s
    gravity: 9.8, // m/s^2
    drag: 0,      // 1/s (linear drag coefficient k → a = -k*v)
    showVectors: true,
  };

  let proj = null; // {x, y, vx, vy, trail: [...]}
  let lastShots = []; // ghost trails of previous launches

  const recomputeScale = () => {
    scale = (cv.width - 60) / WORLD_W;
    originX = 40;
    originY = cv.height - 30;
  };
  recomputeScale();

  function launch() {
    if (proj) lastShots.push(proj.trail);
    if (lastShots.length > 4) lastShots.shift();
    const a = (params.angle * Math.PI) / 180;
    proj = {
      x: 0, y: 0,
      vx: params.speed * Math.cos(a),
      vy: params.speed * Math.sin(a),
      trail: [{ x: 0, y: 0 }],
      flying: true,
      tFlight: 0,
      range: 0,
      peak: 0,
    };
  }

  function reset() {
    proj = null;
    lastShots = [];
  }

  function step(dt) {
    if (!proj || !proj.flying) return;
    // semi-implicit Euler
    proj.vx += -params.drag * proj.vx * dt;
    proj.vy += (-params.gravity - params.drag * proj.vy) * dt;
    proj.x += proj.vx * dt;
    proj.y += proj.vy * dt;
    proj.tFlight += dt;
    if (proj.y > proj.peak) proj.peak = proj.y;
    if (proj.y <= GROUND_M && proj.tFlight > 0.05) {
      proj.y = 0;
      proj.flying = false;
      proj.range = proj.x;
    }
    proj.trail.push({ x: proj.x, y: proj.y });
    if (proj.trail.length > 2000) proj.trail.shift();
  }

  function w2sX(x) { return originX + x * scale; }
  function w2sY(y) { return originY - y * scale; }

  function draw() {
    recomputeScale();
    const ctx = cv.ctx;
    ctx.clearRect(0, 0, cv.width, cv.height);

    // sky gradient
    const grd = ctx.createLinearGradient(0, 0, 0, cv.height);
    grd.addColorStop(0, 'rgba(59,130,246,0.10)');
    grd.addColorStop(1, 'rgba(59,130,246,0.00)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, cv.width, cv.height);

    // grid
    ctx.strokeStyle = 'rgba(120,130,150,0.18)';
    ctx.lineWidth = 1;
    for (let m = 0; m <= WORLD_W; m += 20) {
      const x = w2sX(m);
      ctx.beginPath();
      ctx.moveTo(x, 10);
      ctx.lineTo(x, originY);
      ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '11px var(--font-sans)';
      ctx.fillText(`${m}m`, x + 2, originY - 4);
    }

    // ground
    ctx.strokeStyle = cssVar('--color-fg', '#0b1220');
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(cv.width, originY);
    ctx.stroke();

    // ghost trails
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    for (const trail of lastShots) drawTrail(ctx, trail);

    // current trail
    if (proj) {
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = cssVar('--subj-physics', '#3b82f6');
      drawTrail(ctx, proj.trail);

      // projectile
      const px = w2sX(proj.x), py = w2sY(proj.y);
      ctx.fillStyle = cssVar('--subj-physics', '#3b82f6');
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fill();

      // velocity vectors
      if (params.showVectors && proj.flying) {
        drawArrow(ctx, px, py, px + proj.vx * 1.5, py, '#ef4444');
        drawArrow(ctx, px, py, px, py - proj.vy * 1.5, '#10b981');
      }

      // readout
      ctx.fillStyle = cssVar('--color-fg', '#0b1220');
      ctx.font = 'bold 13px var(--font-sans)';
      const rText = `Range: ${proj.range ? proj.range.toFixed(1) : proj.x.toFixed(1)} m   Peak: ${proj.peak.toFixed(1)} m   t: ${proj.tFlight.toFixed(2)} s`;
      ctx.fillText(rText, 12, 20);
    } else {
      ctx.fillStyle = 'rgba(120,130,150,0.85)';
      ctx.font = '13px var(--font-sans)';
      ctx.fillText('Press Launch to fire a projectile.', 12, 20);
    }

    // launcher
    const a = (params.angle * Math.PI) / 180;
    const lx = originX, ly = originY;
    const tipX = lx + Math.cos(a) * 36;
    const tipY = ly - Math.sin(a) * 36;
    ctx.strokeStyle = cssVar('--color-fg', '#0b1220');
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(lx, ly);
    ctx.lineTo(tipX, tipY);
    ctx.stroke();
  }

  function drawTrail(ctx, trail) {
    if (trail.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(w2sX(trail[0].x), w2sY(trail[0].y));
    for (let i = 1; i < trail.length; i++) {
      ctx.lineTo(w2sX(trail[i].x), w2sY(trail[i].y));
    }
    ctx.stroke();
  }

  function drawArrow(ctx, x1, y1, x2, y2, color) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    const ang = Math.atan2(y2 - y1, x2 - x1);
    const sz = 6;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - sz * Math.cos(ang - 0.4), y2 - sz * Math.sin(ang - 0.4));
    ctx.lineTo(x2 - sz * Math.cos(ang + 0.4), y2 - sz * Math.sin(ang + 0.4));
    ctx.closePath();
    ctx.fill();
  }

  // controls
  const angleS = slider({
    label: 'Angle (°)', min: 0, max: 90, step: 1, value: params.angle,
    onInput: (v) => { params.angle = v; },
  });
  const speedS = slider({
    label: 'Speed (m/s)', min: 5, max: 60, step: 1, value: params.speed,
    onInput: (v) => { params.speed = v; },
  });
  const gravS = slider({
    label: 'Gravity (m/s²)', min: 1, max: 25, step: 0.1, value: params.gravity, format: (v) => v.toFixed(1),
    onInput: (v) => { params.gravity = v; },
  });
  const dragS = slider({
    label: 'Air drag', min: 0, max: 0.5, step: 0.01, value: params.drag, format: (v) => v.toFixed(2),
    onInput: (v) => { params.drag = v; },
  });
  const vecT = toggle({ label: 'Show velocity vectors', value: params.showVectors, onChange: (v) => { params.showVectors = v; } });
  const launchB = button({ label: 'Launch', primary: true, onClick: launch });
  const resetB = button({ label: 'Reset', onClick: reset });

  ctrlPanel.append(angleS.el, speedS.el, gravS.el, dragS.el, vecT.el, row(launchB, resetB));

  // Drag-to-aim: click anywhere above ground to point launcher at cursor
  let dragging = false;
  function aimAt(sx, sy) {
    const dx = sx - originX;
    const dy = originY - sy;
    if (dx <= 0) return;
    const ang = Math.atan2(dy, dx) * 180 / Math.PI;
    const clamped = Math.max(0, Math.min(90, ang));
    params.angle = clamped;
    angleS.value = Math.round(clamped);
  }
  cv.canvas.style.cursor = 'crosshair';
  cv.canvas.addEventListener('mousedown', (e) => {
    const rect = cv.canvas.getBoundingClientRect();
    const sx = (e.clientX - rect.left) * cv.width / rect.width;
    const sy = (e.clientY - rect.top) * cv.height / rect.height;
    dragging = true;
    aimAt(sx, sy);
  });
  window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const rect = cv.canvas.getBoundingClientRect();
    const sx = (e.clientX - rect.left) * cv.width / rect.width;
    const sy = (e.clientY - rect.top) * cv.height / rect.height;
    aimAt(sx, sy);
  });
  window.addEventListener('mouseup', () => { dragging = false; });

  const animator = loop((dt) => {
    step(dt);
    draw();
  });
  animator.start();
  draw();

  return () => {
    animator.stop();
    cv.destroy();
  };
}
