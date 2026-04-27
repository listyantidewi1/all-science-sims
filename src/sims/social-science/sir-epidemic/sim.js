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
    R0: 2.5,
    recoveryDays: 7,
    vaccineFrac: 0.0,
    population: 1.0,
    speed: 1.0,
  };

  // S, I, R as fractions
  let S = 0.999, I = 0.001, R = 0;
  let t = 0;
  let history = [];

  function reset() {
    S = (1 - params.vaccineFrac) - 0.001;
    I = 0.001;
    R = params.vaccineFrac;
    t = 0;
    history = [];
  }
  reset();

  function step(dt) {
    const beta = params.R0 / params.recoveryDays;  // contact rate
    const gamma = 1 / params.recoveryDays;
    const sub = 6;
    const h = dt * params.speed / sub;
    for (let s = 0; s < sub; s++) {
      const dS = -beta * S * I;
      const dI = beta * S * I - gamma * I;
      const dR = gamma * I;
      S = Math.max(0, S + dS * h);
      I = Math.max(0, I + dI * h);
      R = Math.max(0, R + dR * h);
      t += h;
    }
    history.push({ t, S, I, R });
    if (history.length > 1500) history.shift();
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    // graph
    const padX = 40, padY = 30, gW = W - padX * 2, gH = H - padY * 2;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(padX, padY, gW, gH);

    if (history.length > 1) {
      const tEnd = history[history.length - 1].t;
      const tWindow = Math.max(60, tEnd);
      const x2 = (tt) => padX + (tt / tWindow) * gW;
      const y2 = (val) => padY + gH - val * gH;

      function plotSeries(key, color) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let i = 0; i < history.length; i++) {
          const p = history[i];
          const sx = x2(p.t), sy = y2(p[key]);
          if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
      }
      plotSeries('S', '#3b82f6');
      plotSeries('I', '#ef4444');
      plotSeries('R', '#10b981');

      // legend
      const labelY = padY + 14;
      ctx.fillStyle = '#3b82f6'; ctx.fillRect(padX + 6, labelY - 8, 12, 4);
      ctx.fillStyle = '#fff'; ctx.font = '11px var(--font-sans)';
      ctx.fillText(`S = ${(S*100).toFixed(1)}%`, padX + 22, labelY);
      ctx.fillStyle = '#ef4444'; ctx.fillRect(padX + 100, labelY - 8, 12, 4);
      ctx.fillStyle = '#fff';
      ctx.fillText(`I = ${(I*100).toFixed(1)}%`, padX + 116, labelY);
      ctx.fillStyle = '#10b981'; ctx.fillRect(padX + 200, labelY - 8, 12, 4);
      ctx.fillStyle = '#fff';
      ctx.fillText(`R = ${(R*100).toFixed(1)}%`, padX + 216, labelY);

      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`t = ${tEnd.toFixed(1)} days`, padX + gW - 90, padY + gH - 6);
    }

    // big readout
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, H - 56, 320, 46);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(`R₀ = ${params.R0.toFixed(2)}    recovery = ${params.recoveryDays} d`, 16, H - 36);
    const peak = Math.max(...history.map((p) => p.I), 0);
    ctx.fillText(`Peak infected: ${(peak * 100).toFixed(1)}%    Final R: ${(R*100).toFixed(1)}%`, 16, H - 18);
  }

  // controls
  const r0S = slider({
    label: 'R₀ (basic reproduction)', min: 0.1, max: 6, step: 0.05, value: params.R0, format: (v) => v.toFixed(2),
    onInput: (v) => { params.R0 = v; },
  });
  const recS = slider({
    label: 'Recovery time (days)', min: 1, max: 21, step: 0.5, value: params.recoveryDays, format: (v) => v.toFixed(1),
    onInput: (v) => { params.recoveryDays = v; },
  });
  const vacS = slider({
    label: 'Pre-vaccinated %', min: 0, max: 0.95, step: 0.01, value: params.vaccineFrac, format: (v) => `${(v*100).toFixed(0)}%`,
    onInput: (v) => { params.vaccineFrac = v; reset(); },
  });
  const speedS = slider({
    label: 'Speed', min: 0.2, max: 5, step: 0.1, value: params.speed, format: (v) => v.toFixed(1),
    onInput: (v) => { params.speed = v; },
  });
  const resetB = button({ label: 'Reset', primary: true, onClick: reset });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, R0, rec] of [['Flu', 1.3, 4], ['SARS-1', 2.5, 8], ['Measles', 15, 8]]) {
    const b = button({ label: name, onClick: () => { params.R0 = R0; params.recoveryDays = rec; r0S.value = R0; recS.value = rec; reset(); } });
    presetRow.appendChild(b.el);
  }

  ctrlPanel.append(r0S.el, recS.el, vacS.el, speedS.el, presetRow, row(resetB));

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
