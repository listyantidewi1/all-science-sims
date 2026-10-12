import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

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
  let peak = null;  // {t, rate, N} — fastest adoption seen so far in this run (read by the lab)

  function reset() { N = 0; t = 0; history = [{ t: 0, N: 0, dN: 0 }]; peak = null; }
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
    const span = t - last.t;
    if (span > 0) {
      const rate = dN / span;
      if (!peak || rate > peak.rate) peak = { t, rate, N };
    }
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

  // Lab — p and q vs when adoption peaks and how fast it is at the peak.
  const lab = labPanel({
    title: 'Bass diffusion lab — p, q vs the adoption peak',
    filename: 'bass-diffusion-lab.csv',
    columns: [
      { key: 'p',        label: 'p (innovation)', format: (v) => v.toFixed(3) },
      { key: 'q',        label: 'q (imitation)', format: (v) => v.toFixed(3) },
      { key: 'M',        label: 'M' },
      { key: 'tPeak',    label: 'time of peak', format: (v) => v.toFixed(2) },
      { key: 'peakRate', label: 'peak rate (adopters / unit time)', format: (v) => v.toFixed(1) },
      { key: 'fracPeak', label: 'N/M at peak (%)', format: (v) => v.toFixed(1) },
    ],
    procedure: [
      'Set p = 0.030, q = 0.400, M = 1000. Press Reset and wait until the "New adopters" curve has clearly peaked and is falling. Record.',
      'Keep q = 0.400 and set p to 0.005, 0.010, 0.060, 0.100, pressing Reset each time and waiting past the peak. Record each. How does p shift the peak time?',
      'Return p to 0.030 and set q to 0.100, 0.200, 0.600, 0.900. Reset, wait past the peak, record each. Higher q should bring an earlier, taller peak.',
      'Try the presets (Smartphone, VCR, Slow burner, Mass marketing). With "Mass marketing" (q ≈ p) is there a peak at all, or does adoption start at its maximum?',
      'Plot time of peak vs q. Theory predicts t* = ln(q/p)/(p + q) and that N/M at the peak is about 50% when q ≫ p.',
    ],
    predict: 'Will raising the imitation rate q make the adoption peak come earlier or later, and will it be taller or lower?',
    source: () => {
      if (!peak) throw new Error('Let the simulation run first');
      return {
        p: params.p,
        q: params.q,
        M: params.M,
        tPeak: peak.t,
        peakRate: peak.rate,
        fracPeak: (peak.N / params.M) * 100,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(Math.min(0.1, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
