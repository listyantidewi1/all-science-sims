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
    moonAngle: 0,        // radians
    sunAngle: Math.PI,   // radians, default opposite (so spring tide)
    showSun: true,
    spinEarth: true,
    spinSpeed: 0.4,
  };

  let earthSpin = 0;
  let drag = null;

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, W, H);
    // stars
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    for (let i = 0; i < 60; i++) ctx.fillRect((i * 137) % W, (i * 91) % H, 1, 1);

    const cx = W / 2, cy = H / 2;
    const earthR = Math.min(W, H) * 0.18;
    const orbitR = earthR * 2.6;

    // Moon
    const mx = cx + Math.cos(params.moonAngle) * orbitR;
    const my = cy + Math.sin(params.moonAngle) * orbitR;

    // Sun (further away — symbolic, off-canvas direction)
    const sunDist = orbitR * 1.6;
    const sx = cx + Math.cos(params.sunAngle) * sunDist;
    const sy = cy + Math.sin(params.sunAngle) * sunDist;

    // Earth's water bulge: amplitude depends on alignment of Moon and Sun
    // Tidal force component along axis = M cos²(2θ)... simplified: bulge along Moon axis with amp 1, plus along Sun axis with amp 0.46.
    const moonStrength = 1.0;
    const sunStrength = 0.46;

    // Draw orbit hint
    ctx.strokeStyle = 'rgba(120,130,150,0.25)';
    ctx.beginPath();
    ctx.arc(cx, cy, orbitR, 0, Math.PI * 2);
    ctx.stroke();

    // Earth (with bulged ellipse approximation)
    // We'll combine moon and sun contributions into a single oriented ellipse.
    // The combined tidal effect at angle phi on Earth's surface = M cos(2(phi-θm)) + S cos(2(phi-θs)).
    // Convert to amplitude+axis using sum-to-product (approx for visualization only):
    const am = moonStrength;
    const as = params.showSun ? sunStrength : 0;
    const x_ = am * Math.cos(2 * params.moonAngle) + as * Math.cos(2 * params.sunAngle);
    const y_ = am * Math.sin(2 * params.moonAngle) + as * Math.sin(2 * params.sunAngle);
    const ampCombined = Math.hypot(x_, y_);
    const angleCombined = Math.atan2(y_, x_) / 2;
    const bulge = ampCombined * earthR * 0.18;

    // Water bulge ellipse (drawn under earth)
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angleCombined);
    ctx.fillStyle = 'rgba(59,130,246,0.6)';
    ctx.beginPath();
    ctx.ellipse(0, 0, earthR + bulge, earthR - bulge / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Earth solid
    ctx.fillStyle = '#1f3a5f';
    ctx.beginPath();
    ctx.arc(cx, cy, earthR, 0, Math.PI * 2);
    ctx.fill();
    // continents (rotating with earthSpin)
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(earthSpin);
    ctx.fillStyle = '#15803d';
    for (const [a, r] of [[0, 0.55], [1.2, 0.4], [-1.7, 0.5], [2.5, 0.35]]) {
      ctx.beginPath();
      ctx.arc(Math.cos(a) * earthR * 0.55, Math.sin(a) * earthR * 0.55, earthR * r * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }
    // marker dot showing rotation
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(earthR * 0.85, 0, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Moon
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.arc(mx, my, 14, 0, Math.PI * 2);
    ctx.fill();

    // Sun (small icon at edge with arrow indicating direction)
    if (params.showSun) {
      const dx = Math.cos(params.sunAngle), dy = Math.sin(params.sunAngle);
      const ix = cx + dx * (Math.min(W, H) * 0.42);
      const iy = cy + dy * (Math.min(W, H) * 0.42);
      const sunGrad = ctx.createRadialGradient(ix, iy, 2, ix, iy, 36);
      sunGrad.addColorStop(0, '#fff7c2');
      sunGrad.addColorStop(0.5, '#fbbf24');
      sunGrad.addColorStop(1, 'rgba(251,191,36,0)');
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(ix, iy, 36, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff7c2';
      ctx.beginPath();
      ctx.arc(ix, iy, 12, 0, Math.PI * 2);
      ctx.fill();
    }

    // Diagnose tide
    const sunMoonAngle = Math.abs((params.sunAngle - params.moonAngle + Math.PI * 4) % (Math.PI));
    let label = 'Combined tide';
    if (params.showSun) {
      const aligned = sunMoonAngle < 0.4 || sunMoonAngle > Math.PI - 0.4;
      const perpend = Math.abs(sunMoonAngle - Math.PI / 2) < 0.4;
      if (aligned) label = 'SPRING tide (Sun + Moon aligned)';
      else if (perpend) label = 'NEAP tide (Sun ⟂ Moon)';
    }
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 280, 28);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(label, 16, 27);

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag the Moon. Toggle Sun for spring/neap tides.', 12, H - 12);
  }

  function step(dt) {
    if (params.spinEarth) earthSpin += params.spinSpeed * dt;
  }

  function localPos(e) {
    const rect = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * cv.width / rect.width, y: (e.clientY - rect.top) * cv.height / rect.height };
  }
  cv.canvas.style.cursor = 'grab';
  cv.canvas.addEventListener('mousedown', (e) => {
    const p = localPos(e);
    const cx = cv.width / 2, cy = cv.height / 2;
    const earthR = Math.min(cv.width, cv.height) * 0.18;
    const orbitR = earthR * 2.6;
    const mx = cx + Math.cos(params.moonAngle) * orbitR;
    const my = cy + Math.sin(params.moonAngle) * orbitR;
    const sunDist = orbitR * 1.6;
    const sx = cx + Math.cos(params.sunAngle) * sunDist;
    const sy = cy + Math.sin(params.sunAngle) * sunDist;
    if (Math.hypot(p.x - mx, p.y - my) < 22) drag = 'moon';
    else if (params.showSun && Math.hypot(p.x - sx, p.y - sy) < 40) drag = 'sun';
    if (drag) cv.canvas.style.cursor = 'grabbing';
  });
  window.addEventListener('mousemove', (e) => {
    if (!drag) return;
    const p = localPos(e);
    const cx = cv.width / 2, cy = cv.height / 2;
    const ang = Math.atan2(p.y - cy, p.x - cx);
    if (drag === 'moon') params.moonAngle = ang;
    else if (drag === 'sun') params.sunAngle = ang;
  });
  window.addEventListener('mouseup', () => { drag = null; cv.canvas.style.cursor = 'grab'; });

  // controls
  const moonS = slider({ label: 'Moon angle (°)', min: 0, max: 359, step: 1, value: 0,
    onInput: (v) => { params.moonAngle = v * Math.PI / 180; } });
  const sunS = slider({ label: 'Sun angle (°)', min: 0, max: 359, step: 1, value: 180,
    onInput: (v) => { params.sunAngle = v * Math.PI / 180; } });
  const sunT = toggle({ label: 'Show Sun', value: params.showSun, onChange: (v) => { params.showSun = v; } });
  const spinT = toggle({ label: 'Earth rotates', value: params.spinEarth, onChange: (v) => { params.spinEarth = v; } });
  const spB = button({ label: 'Spring tide', primary: true, onClick: () => { params.sunAngle = params.moonAngle + Math.PI; sunS.value = (params.sunAngle * 180 / Math.PI + 360) % 360; } });
  const npB = button({ label: 'Neap tide', onClick: () => { params.sunAngle = params.moonAngle + Math.PI / 2; sunS.value = (params.sunAngle * 180 / Math.PI + 360) % 360; } });

  ctrlPanel.append(moonS.el, sunS.el, sunT.el, spinT.el, row(spB, npB));

  const animator = loop((dt) => { step(dt); draw();
    moonS.value = (params.moonAngle * 180 / Math.PI + 360) % 360 | 0;
    sunS.value = (params.sunAngle * 180 / Math.PI + 360) % 360 | 0;
  });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
