import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    speedSrc: 80,         // px/s
    speedSound: 120,      // px/s
    freqSrc: 1.5,         // Hz of emission
    autoplay: true,
  };

  let source = { x: 100, y: 0, vx: params.speedSrc, vy: 0 };
  let observer = { x: 0, y: 0 };
  let waves = []; // {x0, y0, t0}
  let t = 0;
  let dragging = null;
  let lastEmit = 0;

  function reset() {
    waves = [];
    t = 0;
    lastEmit = 0;
    source.x = 100;
    source.y = cv.height / 2;
    source.vx = params.speedSrc;
    source.vy = 0;
    observer.x = cv.width / 2;
    observer.y = cv.height / 2;
  }

  function step(dt) {
    t += dt;
    if (params.autoplay && !dragging) {
      source.x += source.vx * dt;
      // bounce off walls
      if (source.x > cv.width - 30) { source.x = cv.width - 30; source.vx = -Math.abs(source.vx); }
      if (source.x < 30) { source.x = 30; source.vx = Math.abs(source.vx); }
    }
    // emit waves at fixed period
    const period = 1 / params.freqSrc;
    while (t - lastEmit > period) {
      lastEmit += period;
      waves.push({ x: source.x, y: source.y, t0: lastEmit });
    }
    // age out old waves
    waves = waves.filter((w) => (t - w.t0) * params.speedSound < Math.max(cv.width, cv.height) * 1.4);
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // wavefronts
    ctx.strokeStyle = 'rgba(96,165,250,0.7)';
    ctx.lineWidth = 1.5;
    for (const w of waves) {
      const r = (t - w.t0) * params.speedSound;
      ctx.beginPath();
      ctx.arc(w.x, w.y, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // source
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(source.x, source.y, 10, 0, Math.PI * 2);
    ctx.fill();
    // velocity arrow
    const v = Math.hypot(source.vx, source.vy);
    if (v > 1) {
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(source.x, source.y);
      ctx.lineTo(source.x + source.vx * 0.4, source.y + source.vy * 0.4);
      ctx.stroke();
    }

    // observer
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(observer.x, observer.y, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('observer', observer.x - 26, observer.y + 28);
    ctx.fillStyle = '#fff';
    ctx.fillText('source', source.x - 18, source.y - 16);

    // Compute observed frequency at the observer
    // A ring emitted at (x0,y0,t0) with current radius r and "speed" c approaches obs at speed
    //   c * cos(α), where α is angle between (obs−source_at_emit) and source velocity.
    // Approx instantaneous: f_obs = f_src * c / (c + v_src · n̂_obs−src)
    const dx = observer.x - source.x;
    const dy = observer.y - source.y;
    const r = Math.hypot(dx, dy);
    let fObs = params.freqSrc;
    if (r > 0.1) {
      const nx = dx / r, ny = dy / r;
      const vAlong = source.vx * nx + source.vy * ny; // positive: source moving toward observer
      const denom = params.speedSound - vAlong;
      fObs = denom > 1 ? params.freqSrc * params.speedSound / denom : null;
    }

    // Mach cone if supersonic
    const v_src = Math.hypot(source.vx, source.vy);
    if (v_src > params.speedSound) {
      const sinA = params.speedSound / v_src;
      const cosA = Math.sqrt(1 - sinA * sinA);
      const dirX = source.vx / v_src, dirY = source.vy / v_src;
      // Cone behind source (opposite direction)
      const len = Math.max(W, H);
      ctx.strokeStyle = 'rgba(245,158,11,0.7)';
      ctx.lineWidth = 2;
      // Two edges of the cone
      const offX = -dirY, offY = dirX;
      ctx.beginPath();
      ctx.moveTo(source.x, source.y);
      ctx.lineTo(source.x - dirX * len * cosA + offX * len * sinA, source.y - dirY * len * cosA + offY * len * sinA);
      ctx.moveTo(source.x, source.y);
      ctx.lineTo(source.x - dirX * len * cosA - offX * len * sinA, source.y - dirY * len * cosA - offY * len * sinA);
      ctx.stroke();
    }

    // Readout
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 280, 60);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(`Source f = ${params.freqSrc.toFixed(2)} Hz`, 16, 26);
    ctx.fillText(fObs ? `Observed f = ${fObs.toFixed(2)} Hz` : 'Supersonic — observer in shock', 16, 44);
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`v_src = ${v_src.toFixed(0)}    c = ${params.speedSound}`, 16, 60);
  }

  // Drag handlers
  function localPos(e) {
    const rect = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * cv.width / rect.width, y: (e.clientY - rect.top) * cv.height / rect.height };
  }
  cv.canvas.style.cursor = 'pointer';
  cv.canvas.addEventListener('mousedown', (e) => {
    const p = localPos(e);
    if (Math.hypot(p.x - source.x, p.y - source.y) < 16) dragging = 'source';
    else if (Math.hypot(p.x - observer.x, p.y - observer.y) < 18) dragging = 'observer';
    if (dragging) cv.canvas.style.cursor = 'grabbing';
  });
  let prevPos = null;
  window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const p = localPos(e);
    if (dragging === 'source') {
      // estimate velocity from movement
      if (prevPos) {
        source.vx = (p.x - prevPos.x) * 30;
        source.vy = (p.y - prevPos.y) * 30;
      }
      source.x = p.x;
      source.y = p.y;
      prevPos = { ...p };
    } else if (dragging === 'observer') {
      observer.x = p.x;
      observer.y = p.y;
    }
  });
  window.addEventListener('mouseup', () => {
    dragging = null;
    prevPos = null;
    cv.canvas.style.cursor = 'pointer';
  });

  // controls
  const speedS = slider({
    label: 'Source speed', min: 0, max: 250, step: 1, value: params.speedSrc,
    onInput: (v) => { params.speedSrc = v; if (params.autoplay) source.vx = Math.sign(source.vx || 1) * v; },
  });
  const cS = slider({
    label: 'Sound speed (c)', min: 30, max: 250, step: 1, value: params.speedSound,
    onInput: (v) => { params.speedSound = v; },
  });
  const fS = slider({
    label: 'Source frequency (Hz)', min: 0.3, max: 5, step: 0.1, value: params.freqSrc, format: (v) => v.toFixed(1),
    onInput: (v) => { params.freqSrc = v; },
  });
  const autoT = toggle({ label: 'Auto-orbit source', value: params.autoplay, onChange: (v) => { params.autoplay = v; } });
  const resetB = button({ label: 'Reset', primary: true, onClick: () => { reset(); } });

  ctrlPanel.append(speedS.el, cS.el, fS.el, autoT.el, row(resetB));

  reset();
  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
