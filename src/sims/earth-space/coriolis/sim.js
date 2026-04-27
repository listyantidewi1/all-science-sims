import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle, select } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    omega: 0.6,    // rad/s rotation rate (positive = CCW)
    speed: 200,    // ball speed
    view: 'rotating', // 'inertial' | 'rotating'
    showTrails: true,
  };

  // Disk in inertial frame: ball thrown from a point on disk at radius r, angle theta_throw at moment of launch
  let theta = 0;          // disk rotation angle
  let ball = null;        // {x, y, vx, vy, t, history (inertial), histRot}
  let target = null;      // {x0, y0} disk-relative coords (rotates with disk)

  function reset() {
    theta = 0;
    ball = null;
    target = null;
  }

  function center() { return { cx: cv.width / 2, cy: cv.height / 2, R: Math.min(cv.width, cv.height) * 0.4 }; }

  function fire() {
    const c = center();
    // launch from disk center, pick a point on the rim as the target (rotating with disk)
    const angle = Math.random() * Math.PI * 2;
    target = { rel: { x: Math.cos(angle), y: Math.sin(angle) }, mag: c.R };
    ball = {
      x: c.cx, y: c.cy,
      vx: Math.cos(angle) * params.speed,
      vy: Math.sin(angle) * params.speed,
      t: 0,
      history: [{ x: c.cx, y: c.cy }],
      histRot: [{ x: 0, y: 0 }],
    };
  }

  function step(dt) {
    theta += params.omega * dt;
    if (!ball) return;
    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;
    ball.t += dt;
    ball.history.push({ x: ball.x, y: ball.y });

    // Compute rotating-frame coordinates: rotate (-theta) about center
    const c = center();
    const dx = ball.x - c.cx, dy = ball.y - c.cy;
    const cosT = Math.cos(-theta), sinT = Math.sin(-theta);
    const rx = dx * cosT - dy * sinT;
    const ry = dx * sinT + dy * cosT;
    ball.histRot.push({ x: rx, y: ry });

    if (ball.history.length > 1500) ball.history.shift();
    if (ball.histRot.length > 1500) ball.histRot.shift();

    // remove ball if it's flown off
    const dist = Math.hypot(ball.x - c.cx, ball.y - c.cy);
    if (dist > c.R * 1.4) ball = null;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const c = center();

    if (params.view === 'inertial') {
      drawInertial(ctx, c);
    } else {
      drawRotating(ctx, c);
    }

    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 280, 28);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    const view = params.view === 'inertial' ? 'Inertial (outside) view' : 'Rotating (on-disk) view';
    ctx.fillText(view, 16, 28);

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Click "Throw" to send a ball from center', 12, H - 12);
  }

  function drawInertial(ctx, c) {
    // Rotating disk
    ctx.save();
    ctx.translate(c.cx, c.cy);
    ctx.rotate(theta);
    // disk body
    ctx.fillStyle = '#1f2937';
    ctx.beginPath();
    ctx.arc(0, 0, c.R, 0, Math.PI * 2);
    ctx.fill();
    // markings
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * c.R * 0.3, Math.sin(a) * c.R * 0.3);
      ctx.lineTo(Math.cos(a) * c.R, Math.sin(a) * c.R);
      ctx.stroke();
    }
    // big arrow showing rotation
    ctx.fillStyle = 'rgba(245,158,11,0.5)';
    ctx.beginPath();
    ctx.arc(c.R * 0.7, 0, 8, 0, Math.PI * 2);
    ctx.fill();
    // target on rim if exists
    if (target) {
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(target.rel.x * c.R, target.rel.y * c.R, 10, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // ball history (straight line in inertial)
    if (ball && params.showTrails) {
      ctx.strokeStyle = 'rgba(59,130,246,0.7)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ball.history.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
      ctx.stroke();
    }
    // ball
    if (ball) {
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, 7, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawRotating(ctx, c) {
    // Disk stays fixed (we're co-rotating)
    ctx.fillStyle = '#1f2937';
    ctx.beginPath();
    ctx.arc(c.cx, c.cy, c.R, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(c.cx + Math.cos(a) * c.R * 0.3, c.cy + Math.sin(a) * c.R * 0.3);
      ctx.lineTo(c.cx + Math.cos(a) * c.R, c.cy + Math.sin(a) * c.R);
      ctx.stroke();
    }
    // target — fixed in rotating frame
    if (target) {
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(c.cx + target.rel.x * c.R, c.cy + target.rel.y * c.R, 10, 0, Math.PI * 2);
      ctx.fill();
    }
    // ball trail in rotating frame
    if (ball && params.showTrails) {
      ctx.strokeStyle = 'rgba(59,130,246,0.7)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ball.histRot.forEach((p, i) => {
        const px = c.cx + p.x, py = c.cy + p.y;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      });
      ctx.stroke();
    }
    if (ball) {
      const last = ball.histRot[ball.histRot.length - 1];
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(c.cx + last.x, c.cy + last.y, 7, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // controls
  const omegaS = slider({
    label: 'Disk angular speed (rad/s)', min: -2, max: 2, step: 0.05, value: params.omega, format: (v) => v.toFixed(2),
    onInput: (v) => { params.omega = v; },
  });
  const spdS = slider({
    label: 'Ball speed', min: 50, max: 500, step: 10, value: params.speed,
    onInput: (v) => { params.speed = v; },
  });
  const viewSel = select({
    label: 'View',
    options: [
      { value: 'rotating', label: 'Rotating frame (on-disk)' },
      { value: 'inertial', label: 'Inertial frame (outside)' },
    ],
    value: params.view,
    onChange: (v) => { params.view = v; },
  });
  const trailsT = toggle({ label: 'Show trail', value: params.showTrails, onChange: (v) => { params.showTrails = v; } });
  const fireB = button({ label: 'Throw ball', primary: true, onClick: fire });
  const resetB = button({ label: 'Reset', onClick: reset });

  ctrlPanel.append(omegaS.el, spdS.el, viewSel.el, trailsT.el, row(fireB, resetB));

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
