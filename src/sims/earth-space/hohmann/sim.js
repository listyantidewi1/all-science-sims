import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 1 });

  const params = {
    r1: 1,    // departure orbit radius (AU)
    r2: 1.52, // arrival orbit radius (AU)
    speed: 0.4,
  };

  // Use μ_sun = 1 (canonical units)
  const mu = 1;
  let t = 0;
  let phase = 0; // 0: on r1, 1: on transfer, 2: on r2
  let phaseT = 0;

  function dvBurn1() {
    // From circular at r1 to ellipse perihelion at r1
    const a = (params.r1 + params.r2) / 2;
    const vCirc = Math.sqrt(mu / params.r1);
    const vTrans = Math.sqrt(mu * (2 / params.r1 - 1 / a));
    return vTrans - vCirc;
  }
  function dvBurn2() {
    const a = (params.r1 + params.r2) / 2;
    const vCirc2 = Math.sqrt(mu / params.r2);
    const vTrans2 = Math.sqrt(mu * (2 / params.r2 - 1 / a));
    return vCirc2 - vTrans2;
  }
  function transferTime() {
    const a = (params.r1 + params.r2) / 2;
    return Math.PI * Math.sqrt(a * a * a / mu);
  }

  function step(dt) {
    t += dt * params.speed;
    if (phase === 0) {
      // free orbit at r1, just rotate
      phaseT += dt * params.speed;
      if (phaseT > Math.PI / 2) { phase = 1; phaseT = 0; }
    } else if (phase === 1) {
      // transfer ellipse, half period
      phaseT += dt * params.speed * 2;
      if (phaseT > Math.PI) { phase = 2; phaseT = 0; }
    } else if (phase === 2) {
      phaseT += dt * params.speed;
      if (phaseT > Math.PI / 2) { phase = 0; phaseT = 0; }
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const cx = W / 2, cy = H / 2;
    const maxR = Math.max(params.r1, params.r2);
    const SCALE = (Math.min(W, H) / 2 - 30) / maxR;

    // Sun
    const sunGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 30);
    sunGrad.addColorStop(0, '#fff7c2');
    sunGrad.addColorStop(0.5, '#fbbf24');
    sunGrad.addColorStop(1, 'rgba(251,191,36,0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff7c2';
    ctx.beginPath();
    ctx.arc(cx, cy, 12, 0, Math.PI * 2);
    ctx.fill();

    // Departure orbit (r1)
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, params.r1 * SCALE, 0, Math.PI * 2);
    ctx.stroke();

    // Arrival orbit (r2)
    ctx.strokeStyle = '#ec4899';
    ctx.beginPath();
    ctx.arc(cx, cy, params.r2 * SCALE, 0, Math.PI * 2);
    ctx.stroke();

    // Transfer ellipse (semi-major a, perihelion r1, aphelion r2)
    const a = (params.r1 + params.r2) / 2;
    const c = Math.abs(params.r2 - params.r1) / 2;
    const b = Math.sqrt(a * a - c * c);
    // Center of ellipse offset from sun toward larger orbit
    const offsetSign = params.r2 > params.r1 ? -1 : 1;
    ctx.strokeStyle = '#fbbf24';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.ellipse(cx + offsetSign * c * SCALE, cy, a * SCALE, b * SCALE, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Spacecraft
    let scX, scY;
    if (phase === 0) {
      const ang = phaseT - Math.PI;  // start at left, rotating
      scX = cx + Math.cos(ang) * params.r1 * SCALE;
      scY = cy + Math.sin(ang) * params.r1 * SCALE;
    } else if (phase === 1) {
      // along transfer ellipse from r1 perihelion (at angle π relative to focus = sun)
      const E = phaseT;  // 0 to π
      // ellipse position with sun at right focus
      const xEll = -a * Math.cos(E);
      const yEll = b * Math.sin(E);
      scX = cx + offsetSign * c * SCALE + xEll * SCALE * offsetSign;
      scY = cy + yEll * SCALE;
    } else {
      const ang = phaseT;
      scX = cx + Math.cos(ang) * params.r2 * SCALE;
      scY = cy + Math.sin(ang) * params.r2 * SCALE;
    }
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(scX, scY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Burn indicators
    if (phase === 1 && phaseT < 0.2) {
      // burn 1 just happened
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 12px var(--font-sans)';
      ctx.fillText(`Δv₁`, scX + 8, scY - 8);
    }
    if (phase === 2 && phaseT < 0.2) {
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 12px var(--font-sans)';
      ctx.fillText(`Δv₂`, scX + 8, scY - 8);
    }

    // Info
    const dv1 = dvBurn1(), dv2 = dvBurn2();
    const tT = transferTime();
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 320, 76);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`r₁ = ${params.r1.toFixed(2)} AU   r₂ = ${params.r2.toFixed(2)} AU`, 16, 26);
    ctx.fillText(`Δv₁ = ${dv1.toFixed(4)} (units of √(μ/AU))`, 16, 44);
    ctx.fillText(`Δv₂ = ${dv2.toFixed(4)}`, 16, 62);
    ctx.fillStyle = '#10b981';
    ctx.fillText(`|Δv|_total = ${(Math.abs(dv1) + Math.abs(dv2)).toFixed(4)}    transfer = ${tT.toFixed(2)} yr`, 16, 80);
  }

  // controls
  const r1S = slider({ label: 'Departure r₁ (AU)', min: 0.3, max: 5, step: 0.01, value: params.r1, format: (v) => v.toFixed(2),
    onInput: (v) => { params.r1 = v; } });
  const r2S = slider({ label: 'Arrival r₂ (AU)', min: 0.3, max: 30, step: 0.05, value: params.r2, format: (v) => v.toFixed(2),
    onInput: (v) => { params.r2 = v; } });
  const sS = slider({ label: 'Animation speed', min: 0.1, max: 2, step: 0.05, value: params.speed, format: (v) => v.toFixed(2),
    onInput: (v) => { params.speed = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, r1, r2] of [['Earth→Mars', 1, 1.52], ['Earth→Venus', 1, 0.72], ['Earth→Jupiter', 1, 5.20], ['LEO→GEO', 1, 6.6]]) {
    const b = button({ label: name, onClick: () => { params.r1 = r1; params.r2 = r2; r1S.value = r1; r2S.value = r2; } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(r1S.el, r2S.el, sS.el, presetRow);

  const animator = loop((dt) => { step(Math.min(0.05, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
