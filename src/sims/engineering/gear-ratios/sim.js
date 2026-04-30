import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

// Three gears in series, meshed pair-by-pair. Tooth counts T1, T2, T3.
// Input drives gear 1 at ωin (rad/s).  Each pair: ω_b / ω_a = -T_a / T_b
// (negative because meshed gears spin opposite directions).

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    rpm: 60,
    teeth: [12, 24, 18],
    torqueIn: 1.0, // N·m on input
  };

  let angles = [0, 0, 0]; // current rotation, radians

  function radii() {
    // Pixel radius proportional to tooth count.
    const base = 8;
    return params.teeth.map((t) => t * base);
  }

  function step(dt) {
    const omegaIn = params.rpm * 2 * Math.PI / 60;
    // Successive ratios — meshed gears reverse direction.
    const w1 = omegaIn;
    const w2 = -w1 * params.teeth[0] / params.teeth[1];
    const w3 = -w2 * params.teeth[1] / params.teeth[2];
    angles[0] += w1 * dt;
    angles[1] += w2 * dt;
    angles[2] += w3 * dt;
    return { w1, w2, w3 };
  }

  function drawGear(ctx, cx, cy, r, teeth, angle, color) {
    // Crown of teeth around inner radius.
    const inner = r * 0.85;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.fillStyle = color;
    ctx.strokeStyle = '#0b1220';
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    for (let i = 0; i < teeth * 2; i++) {
      const a = (i / (teeth * 2)) * Math.PI * 2;
      const rr = i % 2 === 0 ? r : inner;
      const x = Math.cos(a) * rr;
      const y = Math.sin(a) * rr;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // hub
    ctx.fillStyle = '#0b1220';
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.18, 0, Math.PI * 2);
    ctx.fill();
    // marker so rotation is visible
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(r * 0.7, 0);
    ctx.stroke();

    ctx.restore();

    // tooth count label
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.textAlign = 'center';
    ctx.fillText(`${teeth}T`, cx, cy + r + 18);
    ctx.textAlign = 'left';
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const r = radii();
    // Position gears so adjacent ones touch (sum of radii apart).
    const startX = 80;
    const cy = H / 2;
    const cx0 = startX + r[0];
    const cx1 = cx0 + r[0] + r[1];
    const cx2 = cx1 + r[1] + r[2];
    drawGear(ctx, cx0, cy, r[0], params.teeth[0], angles[0], '#0ea5e9');
    drawGear(ctx, cx1, cy, r[1], params.teeth[1], angles[1], '#94a3b8');
    drawGear(ctx, cx2, cy, r[2], params.teeth[2], angles[2], '#10b981');

    // Compute live values
    const omegaIn = params.rpm * 2 * Math.PI / 60;
    const omega3 = omegaIn * (params.teeth[0] / params.teeth[1]) * (params.teeth[1] / params.teeth[2]);
    const ratio = (params.teeth[0] / params.teeth[1]) * (params.teeth[1] / params.teeth[2]);
    const rpmOut = params.rpm * ratio;
    const tauOut = params.torqueIn / Math.abs(ratio);
    const powerIn = omegaIn * params.torqueIn;
    const powerOut = Math.abs(omega3) * tauOut;

    // Readouts
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 88);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`Input:  ${params.rpm.toFixed(1)} rpm    τ = ${params.torqueIn.toFixed(2)} N·m`, 16, 26);
    ctx.fillStyle = '#10b981';
    ctx.fillText(`Output: ${rpmOut.toFixed(2)} rpm    τ = ${tauOut.toFixed(3)} N·m`, 16, 44);
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(`Ratio (ω_out / ω_in) = ${ratio.toFixed(3)}`, 16, 62);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.fillText(`Power in ≈ ${powerIn.toFixed(2)} W   ·   Power out ≈ ${powerOut.toFixed(2)} W`, 16, 80);

    // Hint
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Adjust tooth counts and input RPM to feel the speed/torque trade-off.', 16, H - 10);
  }

  // controls
  const rpmS = slider({ label: 'Input speed (rpm)', min: -300, max: 300, step: 1, value: params.rpm,
    onInput: (v) => { params.rpm = v; } });
  const t0S = slider({ label: 'Gear 1 teeth', min: 8, max: 60, step: 1, value: params.teeth[0],
    onInput: (v) => { params.teeth[0] = v; } });
  const t1S = slider({ label: 'Gear 2 teeth', min: 8, max: 60, step: 1, value: params.teeth[1],
    onInput: (v) => { params.teeth[1] = v; } });
  const t2S = slider({ label: 'Gear 3 teeth', min: 8, max: 60, step: 1, value: params.teeth[2],
    onInput: (v) => { params.teeth[2] = v; } });
  const tauS = slider({ label: 'Input torque τ (N·m)', min: 0.1, max: 10, step: 0.1, value: params.torqueIn, format: (v) => v.toFixed(2),
    onInput: (v) => { params.torqueIn = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [n, t] of [['1:1', [12, 12, 12]], ['Speed-up 2×', [24, 12, 24]], ['Torque 2×', [12, 24, 24]], ['Reduction 4×', [12, 24, 48]]]) {
    const b = button({ label: n, onClick: () => {
      params.teeth = [...t];
      t0S.value = t[0]; t1S.value = t[1]; t2S.value = t[2];
    } });
    presetRow.appendChild(b.el);
  }

  ctrlPanel.append(rpmS.el, t0S.el, t1S.el, t2S.el, tauS.el, presetRow);

  // Lab — verify gear ratio and torque/speed trade-off.
  const lab = labPanel({
    title: 'Gear train lab — speed-torque trade-off',
    filename: 'gear-ratios-lab.csv',
    columns: [
      { key: 'T1', label: 'T₁' },
      { key: 'T2', label: 'T₂' },
      { key: 'T3', label: 'T₃' },
      { key: 'ratio',   label: 'overall ratio',  format: (v) => v.toFixed(3) },
      { key: 'rpm_in',  label: 'rpm in',         format: (v) => v.toFixed(1) },
      { key: 'rpm_out', label: 'rpm out',        format: (v) => v.toFixed(2) },
      { key: 'tau_in',  label: 'τ in (N·m)',     format: (v) => v.toFixed(2) },
      { key: 'tau_out', label: 'τ out (N·m)',    format: (v) => v.toFixed(3) },
    ],
    procedure: [
      'Set 12-24-12 (T₁=T₃, T₂=24). Overall ratio = (12/24)·(24/12) = 1. Same speed, same torque.',
      'Set 12-12-12 (1:1:1). Verify same.',
      'Set 12-48-12 (intermediate idler) — does T₂ matter for the OUTPUT? (Hint: no — only input/output ratio counts.)',
      'Set 12-12-48 — final stage reduces speed 4×, multiplies torque 4×.',
      'For each row, verify: rpm_out × τ_out = rpm_in × τ_in (power conservation, ideal).',
    ],
    predict: 'Bicycle: small chainring (T=30) drives big rear cog (T=40). What is the speed ratio? Climbing or descending gear?',
    source: () => {
      const ratio = (params.teeth[0] / params.teeth[1]) * (params.teeth[1] / params.teeth[2]);
      return {
        T1: params.teeth[0], T2: params.teeth[1], T3: params.teeth[2],
        ratio,
        rpm_in: params.rpm,
        rpm_out: params.rpm * ratio,
        tau_in: params.torqueIn,
        tau_out: params.torqueIn / Math.abs(ratio),
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(Math.min(0.05, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
