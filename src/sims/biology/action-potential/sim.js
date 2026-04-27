import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    threshold: -55,
    pulseStrength: 20,
    pulseWidth: 1.0,    // ms
  };

  // Simplified Hodgkin-Huxley-like model with three currents (leak, Na, K)
  // Use FitzHugh-Nagumo-style 2-variable for stability:
  //   V'  = V - V³/3 - W + I(t)
  //   W'  = (V + a - b W) / tau
  // Map to mV with: V_mV = V * 30 - 40 (rough)
  let V = -1.2;     // dimensionless
  let Wv = -0.6;
  let t_ms = 0;
  let stim = 0;     // current applied
  let stimUntil = 0;
  let history = []; // {t, Vmv}
  const a = 0.7, b = 0.8, tau = 12;

  function step(dt) {
    // dt is seconds; convert to ms (and slow down so it's watchable: 1 real second ≈ 60 ms simulated)
    const dt_ms = dt * 60;
    const sub = 8;
    const h = dt_ms / sub;
    for (let s = 0; s < sub; s++) {
      const I = (t_ms < stimUntil) ? stim : 0;
      const dV = (V - V * V * V / 3 - Wv + I) * h;
      const dW = (V + a - b * Wv) / tau * h;
      V += dV;
      Wv += dW;
      t_ms += h;
    }
    history.push({ t: t_ms, V });
    if (history.length > 1000) history.shift();
  }

  function fire(strength) {
    stim = strength;
    stimUntil = t_ms + params.pulseWidth;
  }

  function vMv(V) { return V * 30 - 40; } // convert to mV

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    // Left third: neuron (axon) visualization
    drawNeuron(ctx, 30, 30, W * 0.32, H - 60);
    // Right two-thirds: V vs t graph
    drawGraph(ctx, W * 0.36, 30, W - W * 0.36 - 30, H - 60);

    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 280, 28);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(`V_m = ${vMv(V).toFixed(1)} mV`, 16, 28);

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Click the neuron to deliver a stimulus.', 12, H - 12);
  }

  function drawNeuron(ctx, x, y, w, h) {
    const cx = x + w / 2, cy = y + h * 0.4;
    // soma
    ctx.fillStyle = '#1f2937';
    ctx.beginPath();
    ctx.arc(cx, cy, 36, 0, Math.PI * 2);
    ctx.fill();
    // dendrites
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
      const ang = -Math.PI / 2 + (i / 4 - 0.5) * 1.2;
      const lx = cx + Math.cos(ang) * 36;
      const ly = cy + Math.sin(ang) * 36;
      const ex = cx + Math.cos(ang) * 80;
      const ey = cy + Math.sin(ang) * 80;
      ctx.beginPath();
      ctx.moveTo(lx, ly); ctx.lineTo(ex, ey);
      ctx.stroke();
    }
    // axon
    const axonStart = cy + 36;
    const axonEnd = y + h - 30;
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#475569';
    ctx.beginPath();
    ctx.moveTo(cx, axonStart);
    ctx.lineTo(cx, axonEnd);
    ctx.stroke();

    // Charge color animated based on V
    const v = vMv(V);
    const colorVal = Math.max(-100, Math.min(60, v));
    let glow;
    if (colorVal > 0) glow = `rgba(239,68,68,${(colorVal/40)})`;
    else glow = `rgba(59,130,246,${Math.min(0.6, (-colorVal/80))})`;
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, 50, 0, Math.PI * 2);
    ctx.fill();

    // axon hillock label
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('soma', cx - 16, cy + 4);
    ctx.fillText('axon', cx + 14, cy + 60);

    // click target hint
    ctx.strokeStyle = 'rgba(251,191,36,0.5)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(cx, cy, 60, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function drawGraph(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(x, y, w, h);
    if (history.length < 2) return;
    const tWindow = 80; // ms shown
    const tEnd = history[history.length - 1].t;
    const tStart = Math.max(0, tEnd - tWindow);
    const Vmin = -100, Vmax = 60;
    const x2 = (tt) => x + ((tt - tStart) / tWindow) * w;
    const y2 = (Vmv) => y + h - ((Vmv - Vmin) / (Vmax - Vmin)) * h;

    // gridlines + threshold + resting
    ctx.strokeStyle = 'rgba(120,130,150,0.2)';
    for (const v of [-100, -70, params.threshold, 0, 40]) {
      const yy = y2(v);
      ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + w, yy); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`${v} mV`, x + 6, yy - 2);
    }
    // threshold (highlighted)
    ctx.strokeStyle = '#fbbf24';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(x, y2(params.threshold));
    ctx.lineTo(x + w, y2(params.threshold));
    ctx.stroke();
    ctx.setLineDash([]);

    // V curve
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    let started = false;
    for (const p of history) {
      if (p.t < tStart) continue;
      const sx = x2(p.t), sy = y2(vMv(p.V));
      if (!started) { ctx.moveTo(sx, sy); started = true; } else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('Membrane potential vs time', x + 6, y - 4);
    ctx.fillText('time (ms) →', x + w - 80, y + h + 14);
  }

  // Click on neuron triggers pulse
  cv.canvas.style.cursor = 'pointer';
  cv.canvas.addEventListener('click', (e) => {
    const rect = cv.canvas.getBoundingClientRect();
    const sx = (e.clientX - rect.left) * cv.width / rect.width;
    const sy = (e.clientY - rect.top) * cv.height / rect.height;
    const cx = 30 + cv.width * 0.32 / 2;
    const cy = 30 + (cv.height - 60) * 0.4;
    if (Math.hypot(sx - cx, sy - cy) < 80) {
      fire(params.pulseStrength * 0.05);
    }
  });

  // controls
  const strS = slider({ label: 'Pulse strength', min: 0, max: 60, step: 1, value: params.pulseStrength,
    onInput: (v) => { params.pulseStrength = v; } });
  const widS = slider({ label: 'Pulse width (ms)', min: 0.2, max: 5, step: 0.1, value: params.pulseWidth, format: (v) => v.toFixed(1),
    onInput: (v) => { params.pulseWidth = v; } });
  const fireB = button({ label: 'Fire pulse', primary: true, onClick: () => fire(params.pulseStrength * 0.05) });
  const subB = button({ label: 'Subthreshold', onClick: () => fire(0.04) });
  const doubleB = button({ label: 'Double pulse', onClick: () => {
    fire(params.pulseStrength * 0.05);
    setTimeout(() => fire(params.pulseStrength * 0.05), 80);
  } });
  ctrlPanel.append(strS.el, widS.el, row(fireB, subB, doubleB));

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
