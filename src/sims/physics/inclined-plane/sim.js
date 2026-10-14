import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';

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

  const RAMP_M = 10;                    // ramp length in metres (drawn to fit the canvas)
  // s = distance DOWN the ramp from the top (m), v = down-slope velocity (m/s).
  let state = { s: 0, v: 0, sliding: false, atBottom: false };

  function dynamics(dt) {
    if (state.atBottom) { state.v = 0; return; }
    const theta = params.angleDeg * Math.PI / 180;
    const par = g * Math.sin(theta);          // down-slope gravity component (per kg)
    const perp = g * Math.cos(theta);         // normal force (per kg)

    if (!state.sliding) {
      // Static friction holds the block while mg sin θ ≤ μ_s mg cos θ.
      if (par <= params.muS * perp) {
        state.v = 0;
        return;
      }
      state.sliding = true;
    }
    // Kinetic regime: friction μ_k N opposes the velocity (down-slope pull is +par).
    const dir = state.v !== 0 ? Math.sign(state.v) : 1;
    const a = par - dir * params.muK * perp;
    const vNew = state.v + a * dt;
    // If friction would reverse the velocity, the block has come to rest; re-check static.
    if (state.v !== 0 && Math.sign(vNew) !== Math.sign(state.v)) {
      state.v = 0;
      state.sliding = false;
      return;
    }
    state.v = vNew;
    state.s += state.v * dt;
    // Reached the bottom of the ramp — the block stops against the ground.
    if (state.s >= RAMP_M) { state.s = RAMP_M; state.v = 0; state.sliding = false; state.atBottom = true; }
    if (state.s < 0) { state.s = 0; state.v = 0; state.sliding = false; state.atBottom = false; }
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

  const blockSz = 36;
  function blockPos(geom) {
    // Foot of the block (centre of its bottom edge) measured DOWN the ramp from the top.
    const travel = geom.rampLen - blockSz;                     // px the block can travel
    const dPx = blockSz / 2 + (state.s / RAMP_M) * travel;     // px from the top, down-slope
    return {
      x: geom.topX - Math.cos(geom.theta) * dPx,
      y: geom.topY + Math.sin(geom.theta) * dPx,
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
    ctx.font = 'bold 12px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText(`θ = ${params.angleDeg.toFixed(1)}°`, geom.baseX + 32, geom.baseY - 6);

    // Block — sits on the ramp surface, tilted with it.
    const bp = blockPos(geom);
    ctx.save();
    ctx.translate(bp.x, bp.y);
    ctx.rotate(-geom.theta);                 // local +x runs up-slope, local −y is the outward normal
    ctx.fillStyle = '#0ea5e9';
    ctx.fillRect(-blockSz / 2, -blockSz, blockSz, blockSz);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(-blockSz / 2, -blockSz, blockSz, blockSz);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px ui-monospace, Menlo, Consolas, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${params.mass} kg`, 0, -blockSz / 2 + 4);
    ctx.textAlign = 'left';
    ctx.restore();

    // Force vectors (free-body)
    if (params.showFBD) {
      // Forces are drawn from the block's centre.
      const c = { x: bp.x - Math.sin(geom.theta) * blockSz / 2, y: bp.y - Math.cos(geom.theta) * blockSz / 2 };
      drawFBD(ctx, c, geom);
    }

    // Readout panel
    const theta = geom.theta;
    const par = params.mass * g * Math.sin(theta);
    const perp = params.mass * g * Math.cos(theta);
    const fStatMax = params.muS * perp;
    const slideAngle = Math.atan(params.muS) * 180 / Math.PI;
    const a = state.sliding ? g * (Math.sin(theta) - params.muK * Math.cos(theta)) : 0;

    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 360, 116);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText(`Slide threshold: θ_s = ${slideAngle.toFixed(1)}°`, 16, 26);
    const status = state.atBottom ? 'stopped at the bottom — press Reset' : state.sliding ? 'sliding down' : 'static (stuck)';
    ctx.fillStyle = state.atBottom ? '#94a3b8' : state.sliding ? '#ef4444' : '#10b981';
    ctx.fillText(status, 16, 44);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText(`s = ${state.s.toFixed(2)} m down the ${RAMP_M} m ramp    v = ${state.v.toFixed(2)} m/s`, 16, 110);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText(`F‖ = mg sin θ = ${par.toFixed(2)} N`, 16, 62);
    ctx.fillText(`F⊥ = mg cos θ = ${perp.toFixed(2)} N`, 16, 78);
    ctx.fillText(`max static fric = μ_s · N = ${fStatMax.toFixed(2)} N    a = ${a.toFixed(2)} m/s²`, 16, 94);

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px system-ui, -apple-system, Roboto, sans-serif';
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
    // Friction along the ramp surface. It opposes the velocity when sliding, and opposes
    // the down-slope pull mg sin θ when static (then it is exactly mg sin θ, up to μ_s N).
    const par = params.mass * g * Math.sin(theta);
    const N = params.mass * g * Math.cos(theta);
    const fMagN = state.sliding ? params.muK * N : Math.min(par, params.muS * N);
    const fMag = fMagN * scale;
    // Up-slope unit vector on screen is (cos θ, −sin θ). Friction points up-slope unless the
    // block is moving up the ramp (v < 0), in which case it points down-slope.
    const upSlope = state.v < 0 ? -1 : 1;
    const fx = bp.x + Math.cos(theta) * fMag * upSlope;
    const fy = bp.y - Math.sin(theta) * fMag * upSlope;
    if (fMag > 0.5) arrow(ctx, bp.x, bp.y, fx, fy, '#a855f7', `f`);
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
    ctx.font = 'bold 11px ui-monospace, Menlo, Consolas, monospace';
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
      state.s = 0; state.v = 0; state.sliding = false; state.atBottom = false;
    },
    handles: () => {
      const geom = rampGeom(cv.width, cv.height);
      return [{ id: 'angle', x: geom.topX, y: geom.topY, label: 'Ramp angle (top of ramp)' }];
    },
    cursor: 'grab',
    hoverCursor: 'grab',
  });

  // controls
  const angS = slider({ label: 'Ramp angle θ (°)', min: 0, max: 85, step: 0.5, value: params.angleDeg, format: (v) => v.toFixed(1),
    onInput: (v) => { params.angleDeg = v; state.s = 0; state.v = 0; state.sliding = false; state.atBottom = false; } });
  const mS = slider({ label: 'Mass (kg)', min: 0.5, max: 50, step: 0.5, value: params.mass, format: (v) => v.toFixed(1),
    onInput: (v) => { params.mass = v; } });
  const muSS = slider({ label: 'μ_s (static)', min: 0, max: 1.5, step: 0.01, value: params.muS, format: (v) => v.toFixed(2),
    onInput: (v) => { params.muS = v; if (params.muK > v) { params.muK = v; muKS.value = v; } } });
  const muKS = slider({ label: 'μ_k (kinetic)', min: 0, max: 1.5, step: 0.01, value: params.muK, format: (v) => v.toFixed(2),
    onInput: (v) => { params.muK = Math.min(v, params.muS); } });
  const fbdT = toggle({ label: 'Show free-body diagram', value: params.showFBD, onChange: (v) => { params.showFBD = v; } });
  const resetB = button({ label: 'Reset', primary: true, onClick: () => { state = { s: 0, v: 0, sliding: false, atBottom: false }; } });

  ctrlPanel.append(angS.el, mS.el, muSS.el, muKS.el, fbdT.el, row(resetB));

  // Lab — find the slipping angle θ_s (where tan θ = μ_s) and the kinetic acceleration.
  const lab = labPanel({
    title: 'Inclined plane lab — friction angle & acceleration',
    filename: 'inclined-plane-lab.csv',
    columns: [
      { key: 'angle', label: 'θ (°)',     format: (v) => v.toFixed(1) },
      { key: 'mu_s',  label: 'μ_s',       format: (v) => v.toFixed(2) },
      { key: 'mu_k',  label: 'μ_k',       format: (v) => v.toFixed(2) },
      { key: 'theta_s', label: 'predicted θ_s = arctan(μ_s)', format: (v) => v.toFixed(2) },
      { key: 'sliding', label: 'sliding?' },
      { key: 'a',     label: 'a (m/s²)',  format: (v) => v.toFixed(3) },
    ],
    procedure: [
      'μ_s = 0.30, μ_k = 0.25. Predicted slip angle θ_s = arctan(0.30) ≈ 16.7°.',
      'Set θ = 10°. Block sticks (10 < 16.7). Record.',
      'Slowly increase θ to 17° — block slides. Record.',
      'Increase θ to 30° — slides faster. Verify a = g(sinθ − μ_k cosθ).',
      'Try μ_s = 0.5: predicted θ_s = arctan(0.5) ≈ 26.6°. Verify.',
    ],
    predict: 'A block on a ramp with μ_s = 0.7. At what angle does it start to slide? Does mass matter?',
    source: () => {
      const theta = params.angleDeg * Math.PI / 180;
      const a = state.sliding ? g * (Math.sin(theta) - params.muK * Math.cos(theta)) : 0;
      return {
        angle: params.angleDeg,
        mu_s: params.muS,
        mu_k: params.muK,
        theta_s: Math.atan(params.muS) * 180 / Math.PI,
        sliding: state.sliding ? 'yes' : 'no',
        a,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { dynamics(Math.min(0.05, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
