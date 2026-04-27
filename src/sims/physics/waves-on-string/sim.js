import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, toggle } from '../../../lib/controls.js';
import { cssVar } from '../../../lib/color.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  // Discrete string of N segments. Use a 1-D wave equation finite-difference simulation.
  const N = 200;
  const params = {
    freq: 2.0,         // Hz drive
    speed: 80,         // wave speed (in arbitrary string units)
    damping: 0.001,
    rightEnd: 'fixed', // 'fixed' | 'free'
    showEnvelope: true,
  };

  const y = new Float32Array(N);
  const yPrev = new Float32Array(N);
  const yNext = new Float32Array(N);
  const env = new Float32Array(N);
  let t = 0;

  function reset() {
    y.fill(0); yPrev.fill(0); yNext.fill(0); env.fill(0);
    t = 0;
  }

  function step(dt) {
    // We integrate at a fixed sub-step for stability: c * dtSub <= dx
    const dx = 1 / N;
    const dtSub = Math.min(dt, 0.45 * dx / Math.max(params.speed * 0.02, 0.001));
    let nSub = Math.max(1, Math.ceil(dt / dtSub));
    nSub = Math.min(nSub, 50); // safety
    const h = dt / nSub;
    const c = params.speed * 0.02; // tame the speed
    const C2 = (c * h / dx) ** 2;
    for (let s = 0; s < nSub; s++) {
      // drive at left end: sinusoidal source
      y[0] = 0.4 * Math.sin(2 * Math.PI * params.freq * t);
      // right end
      if (params.rightEnd === 'fixed') {
        y[N - 1] = 0;
      } else {
        // free end: zero slope (Neumann)
        y[N - 1] = y[N - 2];
      }
      for (let i = 1; i < N - 1; i++) {
        yNext[i] = (1 - params.damping) * (2 * y[i] - yPrev[i] + C2 * (y[i + 1] - 2 * y[i] + y[i - 1]));
      }
      yNext[0] = y[0];
      yNext[N - 1] = y[N - 1];
      yPrev.set(y);
      y.set(yNext);
      t += h;
    }
    // Update running envelope (max |y| over last ~1s)
    for (let i = 0; i < N; i++) {
      env[i] = Math.max(Math.abs(y[i]), env[i] * 0.995);
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);
    const padX = 30, padY = 30;
    const stringW = W - padX * 2;
    const cy = H / 2;
    const amp = (H / 2) - padY;

    // baseline
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padX, cy);
    ctx.lineTo(padX + stringW, cy);
    ctx.stroke();

    // envelope
    if (params.showEnvelope) {
      ctx.fillStyle = 'rgba(59,130,246,0.10)';
      ctx.beginPath();
      ctx.moveTo(padX, cy);
      for (let i = 0; i < N; i++) {
        const x = padX + (i / (N - 1)) * stringW;
        ctx.lineTo(x, cy - env[i] * amp * 1.2);
      }
      for (let i = N - 1; i >= 0; i--) {
        const x = padX + (i / (N - 1)) * stringW;
        ctx.lineTo(x, cy + env[i] * amp * 1.2);
      }
      ctx.closePath();
      ctx.fill();
    }

    // string
    ctx.strokeStyle = cssVar('--subj-physics', '#3b82f6');
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i < N; i++) {
      const x = padX + (i / (N - 1)) * stringW;
      const yi = cy - y[i] * amp * 1.2;
      if (i === 0) ctx.moveTo(x, yi); else ctx.lineTo(x, yi);
    }
    ctx.stroke();

    // end indicators
    ctx.fillStyle = cssVar('--color-fg', '#0b1220');
    ctx.fillRect(padX - 4, cy - 14, 4, 28); // driver end
    if (params.rightEnd === 'fixed') {
      ctx.fillRect(padX + stringW, cy - 14, 4, 28);
    } else {
      ctx.beginPath();
      ctx.arc(padX + stringW + 6, cy, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = 'rgba(120,130,150,0.95)';
    ctx.font = '13px var(--font-sans)';
    // Predicted resonant frequencies for a fixed-fixed string of length L=1, c=params.speed*0.02:
    // f_n = n * c / (2L). For fixed-free: f_n = (2n-1) * c / (4L).
    const c = params.speed * 0.02;
    const fundamentals = params.rightEnd === 'fixed' ? c / 2 : c / 4;
    ctx.fillText(`Drive: ${params.freq.toFixed(2)} Hz   ·   Fundamental ≈ ${fundamentals.toFixed(2)} Hz`, 12, 18);
  }

  // controls
  const freqS = slider({
    label: 'Drive frequency (Hz)', min: 0.1, max: 10, step: 0.05, value: params.freq, format: (v) => v.toFixed(2),
    onInput: (v) => { params.freq = v; },
  });
  const spdS = slider({
    label: 'Wave speed', min: 20, max: 200, step: 1, value: params.speed,
    onInput: (v) => { params.speed = v; reset(); },
  });
  const dampS = slider({
    label: 'Damping', min: 0, max: 0.02, step: 0.001, value: params.damping, format: (v) => v.toFixed(3),
    onInput: (v) => { params.damping = v; },
  });
  const endSel = select({
    label: 'Right end',
    options: [
      { value: 'fixed', label: 'Fixed (node)' },
      { value: 'free',  label: 'Free (antinode)' },
    ],
    value: params.rightEnd,
    onChange: (v) => { params.rightEnd = v; reset(); },
  });
  const envT = toggle({ label: 'Show envelope', value: params.showEnvelope, onChange: (v) => { params.showEnvelope = v; } });

  ctrlPanel.append(freqS.el, spdS.el, dampS.el, endSel.el, envT.el);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();

  return () => { animator.stop(); cv.destroy(); };
}
