import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    growthRate: 0.6,        // /sec
    K: 4000,                // carrying capacity
    mutRate: 1e-4,          // per division
    abxKill: 1.5,           // /sec when antibiotic on
    fitness: 0.95,          // resistant cost (resistant grow at 0.95×)
    abxOn: false,
    running: true,
  };

  let state = { S: 1000, R: 0.2, t: 0, history: [] };
  function reset() { state = { S: 1000, R: 0.2, t: 0, history: [] }; }
  reset();

  function step(dt) {
    if (!params.running) return;
    const N = state.S + state.R;
    const space = Math.max(0, 1 - N / params.K);

    // S: grows at r·space; some divide and mutate to R; killed by antibiotic.
    const dS = params.growthRate * state.S * space;
    const dR = params.growthRate * state.R * space * params.fitness;
    const mutation = dS * params.mutRate;

    state.S += dt * (dS - mutation - (params.abxOn ? params.abxKill * state.S : 0));
    state.R += dt * (dR + mutation);

    state.S = Math.max(0, state.S);
    state.R = Math.max(0, state.R);

    state.t += dt;
    state.history.push({ t: state.t, S: state.S, R: state.R, abx: params.abxOn });
    if (state.history.length > 1500) state.history.shift();
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    drawDish(ctx, 30, 30, W * 0.4, H - 60);
    drawHistory(ctx, W * 0.45, 30, W * 0.55 - 60, H - 80);

    // Header
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 60);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`Susceptible: ${state.S.toFixed(0)}    Resistant: ${state.R.toFixed(0)}`, 16, 28);
    ctx.fillStyle = params.abxOn ? '#ef4444' : '#10b981';
    ctx.font = '12px var(--font-mono)';
    ctx.fillText(params.abxOn ? '💊 antibiotic ON' : 'no antibiotic', 16, 48);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`resistant fraction = ${(state.R / Math.max(1, state.S + state.R) * 100).toFixed(2)}%`, 16, 64);
  }

  function drawDish(ctx, x, y, w, h) {
    const cx = x + w / 2, cy = y + h / 2;
    const r = Math.min(w, h) * 0.42;
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.stroke();

    // Bacteria as dots
    const N = state.S + state.R;
    const drawCount = Math.min(800, Math.round(N / 6));
    for (let i = 0; i < drawCount; i++) {
      const u = Math.random();
      const ang = Math.random() * Math.PI * 2;
      const dist = Math.sqrt(u) * r * 0.95;
      const px = cx + Math.cos(ang) * dist;
      const py = cy + Math.sin(ang) * dist;
      const isR = Math.random() < state.R / Math.max(1, N);
      ctx.fillStyle = isR ? '#ef4444' : '#0ea5e9';
      ctx.beginPath();
      ctx.arc(px, py, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    if (params.abxOn) {
      ctx.fillStyle = 'rgba(168,139,250,0.18)';
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
    }
  }

  function drawHistory(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(x, y, w, h);

    const tNow = state.t;
    const tWin = 30;
    const t0 = Math.max(0, tNow - tWin);
    const Nmax = params.K * 1.1;
    const x2 = (t) => x + ((t - t0) / tWin) * w;
    const y2 = (n) => y + h - (n / Nmax) * (h - 16) - 8;

    // antibiotic-on shaded bands
    let segStart = null;
    for (let i = 0; i < state.history.length; i++) {
      const h_ = state.history[i];
      if (h_.abx && segStart === null) segStart = h_.t;
      else if (!h_.abx && segStart !== null) {
        ctx.fillStyle = 'rgba(168,139,250,0.10)';
        ctx.fillRect(x2(segStart), y, x2(h_.t) - x2(segStart), h);
        segStart = null;
      }
    }
    if (segStart !== null) {
      ctx.fillStyle = 'rgba(168,139,250,0.10)';
      ctx.fillRect(x2(segStart), y, x2(state.history[state.history.length - 1].t) - x2(segStart), h);
    }

    // S line
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2;
    ctx.beginPath();
    let started = false;
    for (const h_ of state.history) {
      if (h_.t < t0) continue;
      const sx = x2(h_.t), sy = y2(h_.S);
      if (!started) { ctx.moveTo(sx, sy); started = true; } else ctx.lineTo(sx, sy);
    }
    ctx.stroke();
    // R line
    ctx.strokeStyle = '#ef4444';
    ctx.beginPath();
    started = false;
    for (const h_ of state.history) {
      if (h_.t < t0) continue;
      const sx = x2(h_.t), sy = y2(h_.R);
      if (!started) { ctx.moveTo(sx, sy); started = true; } else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // Legend
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(x + 8, y + 8, 200, 50);
    ctx.fillStyle = '#0ea5e9';
    ctx.fillRect(x + 16, y + 22, 16, 3);
    ctx.fillStyle = '#fff';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Susceptible', x + 38, y + 26);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(x + 16, y + 40, 16, 3);
    ctx.fillStyle = '#fff';
    ctx.fillText('Resistant', x + 38, y + 44);
    ctx.fillStyle = 'rgba(168,139,250,0.85)';
    ctx.font = '10px var(--font-mono)';
    ctx.fillText('shaded = antibiotic on', x + w - 160, y + 18);
  }

  // controls
  const muS = slider({ label: 'Mutation rate', min: 1e-6, max: 1e-3, step: 1e-6, value: params.mutRate, format: (v) => v.toExponential(1),
    onInput: (v) => { params.mutRate = v; } });
  const fS = slider({ label: 'Resistant fitness', min: 0.5, max: 1.0, step: 0.01, value: params.fitness, format: (v) => v.toFixed(2),
    onInput: (v) => { params.fitness = v; } });
  const aS = slider({ label: 'Antibiotic kill rate', min: 0, max: 4, step: 0.05, value: params.abxKill, format: (v) => v.toFixed(2),
    onInput: (v) => { params.abxKill = v; } });
  const abxT = toggle({ label: 'Antibiotic ON', value: params.abxOn, onChange: (v) => { params.abxOn = v; } });
  const resetB = button({ label: 'Reset population', primary: true, onClick: reset });

  ctrlPanel.append(muS.el, fS.el, aS.el, abxT.el, row(resetB));

  const animator = loop((dt) => { step(Math.min(0.1, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
