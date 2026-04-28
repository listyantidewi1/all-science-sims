import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const params = {
    GM: 25000,
    showTrail: true,
    speed: 1.0,
  };

  let body = { x: 0, y: 0, vx: 0, vy: 0 };
  let trail = [];
  let mode = 'idle'; // 'idle' | 'placing' | 'aiming' | 'flying'
  let aimEnd = null;

  function center() { return { cx: cv.width / 2, cy: cv.height / 2 }; }

  function reset() {
    body = { x: 0, y: 0, vx: 0, vy: 0 };
    trail = [];
    mode = 'idle';
    aimEnd = null;
  }

  function step(dt) {
    if (mode !== 'flying') return;
    const c = center();
    const sub = 6;
    const h = dt * params.speed / sub;
    for (let s = 0; s < sub; s++) {
      const dx = c.cx - body.x, dy = c.cy - body.y;
      const r2 = dx * dx + dy * dy;
      const r = Math.sqrt(r2) + 1;
      const a = params.GM / (r2 * r);  // includes 1/r normalization for direction
      body.vx += dx * a * h;
      body.vy += dy * a * h;
      body.x += body.vx * h;
      body.y += body.vy * h;
      // collision with sun
      if (r < 18) { mode = 'idle'; trail = []; return; }
    }
    trail.push({ x: body.x, y: body.y });
    if (trail.length > 800) trail.shift();
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, W, H);
    // stars
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    for (let i = 0; i < 60; i++) ctx.fillRect((i * 137) % W, (i * 91) % H, 1, 1);

    const c = center();
    // Sun
    const sunGrad = ctx.createRadialGradient(c.cx, c.cy, 4, c.cx, c.cy, 50);
    sunGrad.addColorStop(0, '#fff7c2');
    sunGrad.addColorStop(0.5, '#fbbf24');
    sunGrad.addColorStop(1, 'rgba(251,191,36,0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath(); ctx.arc(c.cx, c.cy, 50, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff7c2';
    ctx.beginPath(); ctx.arc(c.cx, c.cy, 14, 0, Math.PI * 2); ctx.fill();

    // trail
    if (params.showTrail && trail.length > 1) {
      ctx.strokeStyle = 'rgba(96,165,250,0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i < trail.length; i++) {
        if (i === 0) ctx.moveTo(trail[i].x, trail[i].y); else ctx.lineTo(trail[i].x, trail[i].y);
      }
      ctx.stroke();
    }

    // aim line
    if (mode === 'aiming' && aimEnd) {
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(body.x, body.y);
      ctx.lineTo(aimEnd.x, aimEnd.y);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#10b981';
      ctx.font = '11px var(--font-mono)';
      const dx = aimEnd.x - body.x, dy = aimEnd.y - body.y;
      const sp = Math.hypot(dx, dy) * 1.2;
      ctx.fillText(`v = ${sp.toFixed(0)}`, aimEnd.x + 8, aimEnd.y);
    }

    // planet
    if (mode !== 'idle' || body.x !== 0) {
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(body.x, body.y, 8, 0, Math.PI * 2);
      ctx.fill();
    }

    // info
    let totalE = null;
    if (mode === 'flying') {
      const dx = c.cx - body.x, dy = c.cy - body.y;
      const r = Math.hypot(dx, dy);
      const v2 = body.vx * body.vx + body.vy * body.vy;
      totalE = 0.5 * v2 - params.GM / r;
    }
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 280, 44);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-sans)';
    let line1 = '';
    if (mode === 'idle') line1 = 'Click to place planet';
    else if (mode === 'placing') line1 = 'Click again to set velocity';
    else if (mode === 'aiming') line1 = 'Drag to aim, release to launch';
    else line1 = `Flying — ${totalE != null && totalE < 0 ? 'BOUND' : 'UNBOUND'}`;
    ctx.fillText(line1, 16, 26);
    if (totalE != null) {
      ctx.font = '11px var(--font-mono)';
      ctx.fillText(`E = ${totalE.toFixed(1)}`, 16, 44);
    }
  }

  // mouse
  function localPos(e) {
    const rect = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * cv.width / rect.width, y: (e.clientY - rect.top) * cv.height / rect.height };
  }
  cv.canvas.style.cursor = 'crosshair';
  cv.canvas.addEventListener('mousedown', (e) => {
    const p = localPos(e);
    if (mode === 'idle' || mode === 'flying') {
      body = { x: p.x, y: p.y, vx: 0, vy: 0 };
      trail = [];
      mode = 'aiming';
      aimEnd = p;
    }
  });
  cv.canvas.addEventListener('mousemove', (e) => {
    if (mode === 'aiming') aimEnd = localPos(e);
  });
  cv.canvas.addEventListener('mouseup', (e) => {
    if (mode === 'aiming') {
      const p = localPos(e);
      const dx = p.x - body.x, dy = p.y - body.y;
      body.vx = dx * 1.2;
      body.vy = dy * 1.2;
      mode = 'flying';
      aimEnd = null;
    }
  });

  // controls
  const GMS = slider({ label: 'GM (sun mass × G)', min: 5000, max: 80000, step: 500, value: params.GM,
    onInput: (v) => { params.GM = v; } });
  const speedS = slider({ label: 'Speed', min: 0.1, max: 3, step: 0.05, value: params.speed, format: (v) => v.toFixed(2),
    onInput: (v) => { params.speed = v; } });
  const trailT = toggle({ label: 'Show trail', value: params.showTrail, onChange: (v) => { params.showTrail = v; } });
  const resetB = button({ label: 'Reset', primary: true, onClick: reset });

  ctrlPanel.append(GMS.el, speedS.el, trailT.el, row(resetB));

  const animator = loop((dt) => { step(Math.min(0.05, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
