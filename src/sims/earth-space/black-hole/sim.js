import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 1 });

  const params = {
    mass: 80,           // mass param (sets bend strength + horizon size)
    showStarfield: true,
  };
  let star = { x: 0.5, y: 0.5 };
  let drag = false;

  function bh() { return { cx: cv.width / 2, cy: cv.height / 2 }; }
  function horizonR() { return params.mass * 0.5; }
  function einsteinR() { return params.mass * 1.5; }

  // Approximate lensed image position (a thin-lens model).
  // For a point source at angle β behind the lens, image angles θ satisfy
  //   θ - α(θ) = β, with α(θ) = θ_E² / θ.
  // Yields two image angles θ± = (β ± √(β² + 4θ_E²)) / 2.
  function lensedImages(srcDx, srcDy) {
    const r = Math.hypot(srcDx, srcDy) + 0.0001;
    const ang = Math.atan2(srcDy, srcDx);
    const thetaE = einsteinR();
    const beta = r;
    const thetaP = (beta + Math.sqrt(beta * beta + 4 * thetaE * thetaE)) / 2;
    const thetaM = (beta - Math.sqrt(beta * beta + 4 * thetaE * thetaE)) / 2;
    // Two image positions
    return [
      { x: Math.cos(ang) * thetaP, y: Math.sin(ang) * thetaP, mag: Math.abs(thetaP / r) },
      { x: Math.cos(ang) * thetaM, y: Math.sin(ang) * thetaM, mag: Math.abs(thetaM / r) },
    ];
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, W, H);

    // starfield, deflected by simple inverse-r kernel for visual
    if (params.showStarfield) {
      const b = bh();
      for (let i = 0; i < 80; i++) {
        let sx = (i * 137) % W;
        let sy = (i * 91) % H;
        // deflect
        const dx = sx - b.cx, dy = sy - b.cy;
        const r = Math.hypot(dx, dy) + 1;
        const def = (params.mass * 8) / r;
        const nx = dx / r, ny = dy / r;
        sx += nx * def;
        sy += ny * def;
        if (r < horizonR()) continue;
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fillRect(sx, sy, 1, 1);
      }
    }

    const b = bh();

    // accretion disk hint
    const disk = ctx.createRadialGradient(b.cx, b.cy, horizonR(), b.cx, b.cy, horizonR() * 4);
    disk.addColorStop(0, 'rgba(251,146,60,0.6)');
    disk.addColorStop(0.4, 'rgba(251,191,36,0.2)');
    disk.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = disk;
    ctx.beginPath();
    ctx.arc(b.cx, b.cy, horizonR() * 4, 0, Math.PI * 2);
    ctx.fill();

    // Source star (the actual star, drawn slightly translucent)
    const sx = star.x * cv.width, sy = star.y * cv.height;
    const dx = sx - b.cx, dy = sy - b.cy;
    ctx.fillStyle = 'rgba(168, 162, 158, 0.4)';
    ctx.beginPath();
    ctx.arc(sx, sy, 6, 0, Math.PI * 2);
    ctx.fill();

    // Lensed images
    const images = lensedImages(dx, dy);
    for (const im of images) {
      const ix = b.cx + im.x;
      const iy = b.cy + im.y;
      // skip if inside event horizon
      const r = Math.hypot(ix - b.cx, iy - b.cy);
      if (r < horizonR()) continue;
      const size = Math.max(2, 6 * Math.sqrt(Math.abs(im.mag)));
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(ix, iy, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fff7c2';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // Detect Einstein ring (source nearly behind)
    const off = Math.hypot(dx, dy);
    if (off < einsteinR() * 0.15) {
      ctx.strokeStyle = `rgba(251,191,36,${1 - off / (einsteinR() * 0.15)})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(b.cx, b.cy, einsteinR(), 0, Math.PI * 2);
      ctx.stroke();
    }

    // Black hole event horizon (drawn last on top)
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(b.cx, b.cy, horizonR(), 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(251,191,36,0.5)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Info
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 280, 44);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText(`Mass param: ${params.mass}`, 16, 26);
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`R_horizon=${horizonR().toFixed(0)}    R_Einstein=${einsteinR().toFixed(0)}`, 16, 44);

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag the dim star — yellow dots are its lensed images', 12, H - 12);
  }

  // drag star
  function localPos(e) {
    const rect = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * cv.width / rect.width, y: (e.clientY - rect.top) * cv.height / rect.height };
  }
  cv.canvas.style.cursor = 'grab';
  cv.canvas.addEventListener('mousedown', (e) => {
    drag = true;
    const p = localPos(e);
    star.x = p.x / cv.width; star.y = p.y / cv.height;
    cv.canvas.style.cursor = 'grabbing';
  });
  window.addEventListener('mousemove', (e) => {
    if (!drag) return;
    const p = localPos(e);
    star.x = p.x / cv.width; star.y = p.y / cv.height;
  });
  window.addEventListener('mouseup', () => { drag = false; cv.canvas.style.cursor = 'grab'; });

  // controls
  const mS = slider({ label: 'Black hole mass', min: 20, max: 200, step: 1, value: params.mass,
    onInput: (v) => { params.mass = v; } });
  const sfT = toggle({ label: 'Show distorted starfield', value: params.showStarfield, onChange: (v) => { params.showStarfield = v; } });
  const ringB = button({ label: 'Set up Einstein ring', primary: true, onClick: () => { star.x = 0.5; star.y = 0.5; } });

  ctrlPanel.append(mS.el, sfT.el, row(ringB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
