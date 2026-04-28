import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

// Bass model:
//   dN/dt = (p + q * N(t)/M) * (M - N(t))
// where M is the total market, N(t) is cumulative adopters, p is innovation
// coefficient (external), q is imitation coefficient (internal).

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    p: 0.03,
    q: 0.4,
    M: 1000,
    speed: 1,
  };

  let N = 0;
  let t = 0;
  let history = []; // {t, N, dN}

  function reset() { N = 0; t = 0; history = [{ t: 0, N: 0, dN: 0 }]; }
  reset();

  function step(dt) {
    const sub = 6;
    const h = dt * params.speed / sub;
    for (let s = 0; s < sub; s++) {
      const remaining = params.M - N;
      const dN = (params.p + params.q * N / params.M) * remaining;
      N = Math.min(params.M, N + dN * h);
      t += h;
    }
    const last = history[history.length - 1];
    const dN = N - last.N;
    history.push({ t, N, dN });
    if (history.length > 1500) history.shift();
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const halfW = W * 0.5;

    // cumulative on left
    drawSeries(ctx, 30, 30, halfW - 60, H - 60, history.map((h) => ({ t: h.t, v: h.N })),
      params.M, '#10b981', 'Cumulative adopters N(t)');

    // adoption rate (instantaneous) on right
    drawSeries(ctx, halfW + 30, 30, halfW - 60, H - 60, history.map((h) => ({ t: h.t, v: h.dN * 60 })),
      Math.max(...history.map((h) => h.dN * 60), 0.01), '#ec4899', 'New adopters / unit time');

    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 28);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(`p=${params.p.toFixed(3)}    q=${params.q.toFixed(2)}    M=${params.M}    N=${N.toFixed(0)}`, 14, 28);
  }

  function drawSeries(ctx, x, y, w, h, data, vMax, color, label) {
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(x, y, w, h);
    if (data.length < 2) return;
    const tWindow = Math.max(20, data[data.length - 1].t);
    const x2 = (tt) => x + (tt / tWindow) * w;
    const y2 = (v) => y + h - (v / (vMax || 1)) * (h - 16) - 4;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i < data.length; i++) {
      const sx = x2(data[i].t), sy = y2(data[i].v);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText(label, x + 6, y - 4);
    ctx.fillText('time →', x + w - 50, y + h + 14);
  }

  // controls
  const pS = slider({ label: 'p (innovation rate)', min: 0, max: 0.15, step: 0.001, value: params.p, format: (v) => v.toFixed(3),
    onInput: (v) => { params.p = v; } });
  const qS = slider({ label: 'q (imitation rate)', min: 0, max: 1, step: 0.005, value: params.q, format: (v) => v.toFixed(3),
    onInput: (v) => { params.q = v; } });
  const MS = slider({ label: 'Market size M', min: 100, max: 10000, step: 100, value: params.M,
    onInput: (v) => { params.M = v; reset(); } });
  const speedS = slider({ label: 'Speed', min: 0.1, max: 5, step: 0.1, value: params.speed, format: (v) => v.toFixed(1),
    onInput: (v) => { params.speed = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, p, q] of [['Smartphone', 0.005, 0.39], ['VCR (1980s)', 0.025, 0.6], ['Slow burner', 0.001, 0.95], ['Mass marketing', 0.05, 0.05]]) {
    const b = button({ label: name, onClick: () => { params.p = p; params.q = q; pS.value = p; qS.value = q; reset(); } });
    presetRow.appendChild(b.el);
  }
  const resetB = button({ label: 'Reset', primary: true, onClick: reset });
  ctrlPanel.append(pS.el, qS.el, MS.el, speedS.el, presetRow, row(resetB));

  const animator = loop((dt) => { step(Math.min(0.1, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
