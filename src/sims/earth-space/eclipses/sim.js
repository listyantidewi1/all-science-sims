import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  // Positions in world units
  const params = {
    sunX: 0.05,
    sunR: 60,
    earthX: 0.65,
    earthR: 26,
    moonX: 0.5, moonY: 0,   // moonY is offset from line
    moonR: 9,
  };

  let drag = null;

  function lineY() { return cv.height / 2; }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);
    // background
    const bg = ctx.createLinearGradient(0, 0, W, 0);
    bg.addColorStop(0, '#020617');
    bg.addColorStop(1, '#0b1220');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
    // stars
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    for (let i = 0; i < 60; i++) {
      ctx.fillRect((i * 137) % W, (i * 91) % H, 1, 1);
    }

    const cy = lineY();
    const sunSx = params.sunX * W;
    const earthSx = params.earthX * W;
    const moonSx = params.moonX * W;
    const moonSy = cy + params.moonY;

    // Sun rays cone toward moon and earth — for shadow visualization use simple penumbra/umbra cones from the sun.
    // Treat sun as emitter; each occluder casts an umbra cone behind it.
    drawShadowCones(ctx, sunSx, cy, params.sunR, moonSx, moonSy, params.moonR, W);
    drawShadowCones(ctx, sunSx, cy, params.sunR, earthSx, cy, params.earthR, W);

    // Sun
    const sunGrad = ctx.createRadialGradient(sunSx, cy, 4, sunSx, cy, params.sunR + 30);
    sunGrad.addColorStop(0, '#fff7c2');
    sunGrad.addColorStop(0.4, '#fbbf24');
    sunGrad.addColorStop(1, 'rgba(251,191,36,0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(sunSx, cy, params.sunR + 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff7c2';
    ctx.beginPath();
    ctx.arc(sunSx, cy, params.sunR, 0, Math.PI * 2);
    ctx.fill();

    // Earth
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(earthSx, cy, params.earthR, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(34,197,94,0.7)';
    ctx.beginPath();
    ctx.arc(earthSx - 6, cy + 4, params.earthR * 0.45, 0, Math.PI * 2);
    ctx.fill();

    // Moon
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.arc(moonSx, moonSy, params.moonR, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.stroke();

    // Diagnose eclipse
    const text = diagnose(sunSx, cy, params.sunR, earthSx, cy, params.earthR, moonSx, moonSy, params.moonR);
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 280, 30);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-sans)';
    ctx.fillText(text, 16, 28);

    // hint
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag the Moon (light grey) or Earth (blue).', 12, H - 12);
  }

  function drawShadowCones(ctx, sx, sy, sR, ox, oy, oR, W) {
    // Approximate: shadow extends rightward (away from sun) along the sun-occluder line
    const dx = ox - sx, dy = oy - sy;
    const ang = Math.atan2(dy, dx);
    // umbra cone tip distance: oR * d / (sR - oR), if sR > oR
    const d = Math.hypot(dx, dy);
    const umbraLen = sR > oR ? (oR * d) / (sR - oR) : 1500;
    // draw umbra
    ctx.save();
    ctx.translate(ox, oy);
    ctx.rotate(ang);
    // umbra triangle
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.beginPath();
    ctx.moveTo(0, oR);
    ctx.lineTo(0, -oR);
    ctx.lineTo(umbraLen, 0);
    ctx.closePath();
    ctx.fill();
    // penumbra (broader)
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.beginPath();
    ctx.moveTo(0, oR);
    ctx.lineTo(0, -oR);
    ctx.lineTo(W * 1.5, -oR * 4 + W * 0.5);
    ctx.lineTo(W * 1.5, oR * 4 - W * 0.5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function diagnose(sx, sy, sR, ex, ey, eR, mx, my, mR) {
    // Solar eclipse: moon between sun and earth, intercepts line from sun to earth
    // Lunar eclipse: earth between sun and moon, earth shadow falls on moon
    function pointBetween(p1, p2, q, tol) {
      const dx = p2.x - p1.x, dy = p2.y - p1.y;
      const len = Math.hypot(dx, dy);
      const t = ((q.x - p1.x) * dx + (q.y - p1.y) * dy) / (len * len);
      if (t < 0 || t > 1) return null;
      const px = p1.x + dx * t, py = p1.y + dy * t;
      return Math.hypot(q.x - px, q.y - py);
    }
    const sunToEarth = pointBetween({x:sx,y:sy}, {x:ex,y:ey}, {x:mx,y:my}, 30);
    if (sunToEarth != null && sunToEarth < mR + 6 && Math.hypot(mx - sx, my - sy) < Math.hypot(ex - sx, ey - sy)) {
      return 'Solar eclipse — Moon shadows Earth';
    }
    const earthShadowDir = { x: (ex - sx), y: (ey - sy) };
    const len = Math.hypot(earthShadowDir.x, earthShadowDir.y);
    earthShadowDir.x /= len; earthShadowDir.y /= len;
    // Moon distance from line behind earth
    const mxRel = mx - ex, myRel = my - ey;
    const along = mxRel * earthShadowDir.x + myRel * earthShadowDir.y;
    const perp = Math.abs(mxRel * (-earthShadowDir.y) + myRel * earthShadowDir.x);
    if (along > 0 && perp < eR + 6) {
      return 'Lunar eclipse — Earth shadows Moon';
    }
    return 'No eclipse';
  }

  // Drag handlers
  function localPos(e) {
    const rect = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * cv.width / rect.width, y: (e.clientY - rect.top) * cv.height / rect.height };
  }
  cv.canvas.style.cursor = 'grab';
  cv.canvas.addEventListener('mousedown', (e) => {
    const p = localPos(e);
    const moonSx = params.moonX * cv.width;
    const moonSy = lineY() + params.moonY;
    const earthSx = params.earthX * cv.width;
    if (Math.hypot(p.x - moonSx, p.y - moonSy) < params.moonR + 8) drag = 'moon';
    else if (Math.hypot(p.x - earthSx, p.y - lineY()) < params.earthR + 8) drag = 'earth';
    if (drag) cv.canvas.style.cursor = 'grabbing';
  });
  window.addEventListener('mousemove', (e) => {
    if (!drag) return;
    const p = localPos(e);
    if (drag === 'moon') {
      params.moonX = Math.max(0.15, Math.min(0.95, p.x / cv.width));
      params.moonY = Math.max(-cv.height / 2 + 30, Math.min(cv.height / 2 - 30, p.y - lineY()));
    } else if (drag === 'earth') {
      params.earthX = Math.max(0.3, Math.min(0.95, p.x / cv.width));
    }
  });
  window.addEventListener('mouseup', () => { drag = null; cv.canvas.style.cursor = 'grab'; });

  // controls
  const moonRS = slider({ label: 'Moon size', min: 5, max: 20, step: 0.5, value: params.moonR,
    onInput: (v) => { params.moonR = v; } });
  const solarB = button({ label: 'Set up solar eclipse', primary: true, onClick: () => {
    params.moonX = 0.55; params.moonY = 0;
  } });
  const lunarB = button({ label: 'Set up lunar eclipse', onClick: () => {
    params.moonX = 0.85; params.moonY = 0;
  } });
  const tiltB = button({ label: 'Tilt off-axis', onClick: () => {
    params.moonY = 30 + Math.random() * 40;
  } });

  ctrlPanel.append(moonRS.el, row(solarB, lunarB, tiltB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
