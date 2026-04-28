import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';

const g = 9.8;

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    angleDeg: 25,
    mass: 5,
    muS: 0.30,
    muK: 0.25,
    showFBD: true,
  };

  let state = { s: 0, v: 0, sliding: false }; // s = distance up the ramp from bottom

  function dynamics(dt) {
    const theta = params.angleDeg * Math.PI / 180;
    const par = g * Math.sin(theta);
    const perp = g * Math.cos(theta);
    const requiredStaticF = params.mass * par;
    const maxStaticF = params.muS * params.mass * perp;

    if (!state.sliding) {
      // Stick if pull ≤ static-friction max
      if (requiredStaticF <= maxStaticF) {
        state.v = 0;
        return;
      }
      state.sliding = true;
    }
    // Kinetic regime
    const a = par - params.muK * perp;
    state.v += a * dt;
    state.s += state.v * dt;
    // Bounce on the bottom
    if (state.s < 0) { state.s = 0; state.v = 0; state.sliding = false; }
  }

  function rampGeom(W, H) {
    const baseY = H - 70;
    const baseX = 60;
    const rampLen = Math.min(W - 140, 600);
    const theta = params.angleDeg * Math.PI / 180;
    const dx = rampLen * Math.cos(theta);
    const dy = rampLen * Math.sin(theta);
    const topX = baseX + dx;
    const topY = baseY - dy;
    return { baseX, baseY, topX, topY, rampLen, theta };
  }

  function blockPos(geom) {
    // Position along ramp from baseX,baseY by state.s (in pixels here).
    const u = state.s / geom.rampLen;
    return {
      x: geom.baseX + (geom.topX - geom.baseX) * u,
      y: geom.baseY + (geom.topY - geom.baseY) * u,
    };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const geom = rampGeom(W, H);

    // Ground
    ctx.fillStyle = '#475569';
    ctx.fillRect(0, geom.baseY, W, 6);
    // Ramp
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(geom.baseX, geom.baseY);
    ctx.lineTo(geom.topX, geom.topY);
    ctx.lineTo(geom.topX, geom.baseY);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#64748b';
    ctx.stroke();
    // Angle arc
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(geom.baseX, geom.baseY, 28, -geom.theta, 0);
    ctx.stroke();
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`θ = ${params.angleDeg.toFixed(1)}°`, geom.baseX + 32, geom.baseY - 6);

    // Block
    const bp = blockPos(geom);
    const blockSz = 36;
    ctx.save();
    ctx.translate(bp.x, bp.y);
    ctx.rotate(geom.theta);
    ctx.translate(0, -blockSz / 2);
    ctx.fillStyle = '#0ea5e9';
    ctx.fillRect(0, -blockSz, blockSz, blockSz);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, -blockSz, blockSz, blockSz);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px var(--font-mono)';
    ctx.textAlign = 'center';
    ctx.fillText(`${params.mass} kg`, blockSz / 2, -blockSz / 2 + 4);
    ctx.textAlign = 'left';
    ctx.restore();

    // Force vectors (free-body)
    if (params.showFBD) drawFBD(ctx, bp, geom);

    // Readout panel
    const theta = geom.theta;
    const par = params.mass * g * Math.sin(theta);
    const perp = params.mass * g * Math.cos(theta);
    const fStatMax = params.muS * perp;
    const slideAngle = Math.atan(params.muS) * 180 / Math.PI;
    const a = state.sliding ? g * (Math.sin(theta) - params.muK * Math.cos(theta)) : 0;

    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 100);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`Slide threshold: θ_s = ${slideAngle.toFixed(1)}°`, 16, 26);
    ctx.fillStyle = state.sliding ? '#ef4444' : '#10b981';
    ctx.fillText(state.sliding ? 'sliding' : 'static (stuck)', 16, 44);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`F‖ = mg sin θ = ${par.toFixed(2)} N`, 16, 62);
    ctx.fillText(`F⊥ = mg cos θ = ${perp.toFixed(2)} N`, 16, 78);
    ctx.fillText(`max static fric = μ_s · N = ${fStatMax.toFixed(2)} N    a = ${a.toFixed(2)} m/s²`, 16, 94);

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag the top of the ramp to set θ', 16, H - 10);
  }

  function drawFBD(ctx, bp, geom) {
    const theta = geom.theta;
    const scale = 0.6;
    // Gravity (down)
    arrow(ctx, bp.x, bp.y, bp.x, bp.y + params.mass * g * scale, '#fbbf24', `mg`);
    // Normal (perp to ramp, away from surface)
    const nMag = params.mass * g * Math.cos(theta) * scale;
    const nx = bp.x - Math.sin(theta) * nMag;
    const ny = bp.y - Math.cos(theta) * nMag;
    arrow(ctx, bp.x, bp.y, nx, ny, '#10b981', `N`);
    // Friction along ramp opposing motion (or opposing gravity-component if static)
    const par = params.mass * g * Math.sin(theta);
    const fMagStatic = state.sliding ? params.muK * params.mass * g * Math.cos(theta) : Math.min(par, params.muS * params.mass * g * Math.cos(theta));
    const fMag = fMagStatic * scale;
    // Friction acts opposite to motion direction along ramp surface — up the ramp when block is trying to slide down.
    const fx = bp.x - Math.cos(theta) * fMag;
    const fy = bp.y + Math.sin(theta) * fMag;
    arrow(ctx, bp.x, bp.y, fx, fy, '#a855f7', `f`);
  }

  function arrow(ctx, x1, y1, x2, y2, color, label) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    const ang = Math.atan2(y2 - y1, x2 - x1);
    const sz = 7;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - sz * Math.cos(ang - 0.4), y2 - sz * Math.sin(ang - 0.4));
    ctx.lineTo(x2 - sz * Math.cos(ang + 0.4), y2 - sz * Math.sin(ang + 0.4));
    ctx.closePath();
    ctx.fill();
    ctx.font = 'bold 11px var(--font-mono)';
    ctx.fillText(label, x2 + 4, y2 + 4);
  }

  // Drag the top of the ramp to set the angle.
  const drag = dragHandle(cv.canvas, {
    hitTest(sx, sy) {
      const W = cv.width, H = cv.height;
      const geom = rampGeom(W, H);
      if (Math.hypot(sx - geom.topX, sy - geom.topY) < 20) return 'angle';
      return null;
    },
    onDrag(_id, sx, sy) {
      const W = cv.width, H = cv.height;
      const baseY = H - 70, baseX = 60;
      const dy = baseY - sy;
      const dx = sx - baseX;
      if (dx <= 0) return;
      params.angleDeg = Math.max(0, Math.min(85, Math.atan2(dy, dx) * 180 / Math.PI));
      angS.value = params.angleDeg;
      state.s = 0; state.v = 0; state.sliding = false;
    },
    cursor: 'grab',
    hoverCursor: 'grab',
  });

  // controls
  const angS = slider({ label: 'Ramp angle θ (°)', min: 0, max: 85, step: 0.5, value: params.angleDeg, format: (v) => v.toFixed(1),
    onInput: (v) => { params.angleDeg = v; state.s = 0; state.v = 0; state.sliding = false; } });
  const mS = slider({ label: 'Mass (kg)', min: 0.5, max: 50, step: 0.5, value: params.mass, format: (v) => v.toFixed(1),
    onInput: (v) => { params.mass = v; } });
  const muSS = slider({ label: 'μ_s (static)', min: 0, max: 1.5, step: 0.01, value: params.muS, format: (v) => v.toFixed(2),
    onInput: (v) => { params.muS = v; if (params.muK > v) { params.muK = v; muKS.value = v; } } });
  const muKS = slider({ label: 'μ_k (kinetic)', min: 0, max: 1.5, step: 0.01, value: params.muK, format: (v) => v.toFixed(2),
    onInput: (v) => { params.muK = Math.min(v, params.muS); } });
  const fbdT = toggle({ label: 'Show free-body diagram', value: params.showFBD, onChange: (v) => { params.showFBD = v; } });
  const resetB = button({ label: 'Reset', primary: true, onClick: () => { state = { s: 0, v: 0, sliding: false }; } });

  ctrlPanel.append(angS.el, mS.el, muSS.el, muKS.el, fbdT.el, row(resetB));

  const animator = loop((dt) => { dynamics(Math.min(0.05, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
