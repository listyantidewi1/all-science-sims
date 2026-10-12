import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, toggle, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

const MAX_N = 8;
const T_MAX = 120; // seconds the emergency lasts before it is "too late"
const DARLEY = [{ N: 1, p: 0.85 }, { N: 2, p: 0.62 }, { N: 5, p: 0.31 }];

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { N: 3, p1: 0.85, alpha: 1.4, speed: 10, autoRun: true };
  const tallies = Array.from({ length: MAX_N + 1 }, () => ({ trials: 0, helped: 0, sumT: 0 }));
  const live = { t: 0, agents: [], helper: -1, done: false, pause: 0, outcome: '' };

  // Per-person probability of helping within T_MAX falls with group size.
  const pPerson = (N) => Math.min(1, params.p1 * Math.pow(N, -params.alpha));
  const pAnyone = (N) => 1 - Math.pow(1 - pPerson(N), N);
  const pNaive = (N) => 1 - Math.pow(1 - params.p1, N);
  const hazard = (N) => -Math.log(Math.max(1e-9, 1 - pPerson(N))) / T_MAX;

  function record(N, helped, t) {
    const tl = tallies[N];
    tl.trials++;
    if (helped) { tl.helped++; tl.sumT += t; }
  }

  function startTrial() {
    live.t = 0;
    live.helper = -1;
    live.done = false;
    live.pause = 0;
    live.outcome = '';
    live.agents = Array.from({ length: params.N }, (_, i) => ({
      angle: Math.PI * (0.15 + 0.7 * (params.N === 1 ? 0.5 : i / (params.N - 1))),
      move: 0,
      glance: Math.random() * Math.PI * 2,
    }));
  }

  function runBatch(count) {
    for (let N = 1; N <= MAX_N; N++) {
      const h = hazard(N) * N; // first-helper time is exponential with the summed hazard
      for (let k = 0; k < count; k++) {
        const t = -Math.log(1 - Math.random()) / h;
        record(N, t < T_MAX, t);
      }
    }
  }

  function step(dt) {
    if (live.done) {
      live.pause += dt;
      if (live.agents[live.helper]) live.agents[live.helper].move = Math.min(1, live.agents[live.helper].move + dt * 1.5);
      if (params.autoRun && live.pause > 1.8) startTrial();
      return;
    }
    const sdt = dt * params.speed;
    live.t += sdt;
    const p = 1 - Math.exp(-hazard(params.N) * sdt);
    for (let i = 0; i < live.agents.length; i++) {
      live.agents[i].glance += dt * 2;
      if (Math.random() < p) {
        live.helper = i;
        live.done = true;
        live.outcome = `helped after ${live.t.toFixed(0)} s`;
        record(params.N, true, live.t);
        return;
      }
    }
    if (live.t >= T_MAX) {
      live.done = true;
      live.outcome = 'nobody helped';
      record(params.N, false, 0);
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W <= 0 || H <= 0) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    drawScene(ctx, 0, 0, W * 0.45, H);
    drawChart(ctx, W * 0.45 + 50, 40, W * 0.55 - 80, H - 100);
  }

  function drawScene(ctx, x, y, w, h) {
    ctx.fillStyle = '#111a2e';
    ctx.fillRect(x + 16, y + 16, w - 24, h - 32);
    const vx = x + w / 2, vy = y + h * 0.72;
    // Victim lying down
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.ellipse(vx, vy, 34, 12, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(vx + 40, vy, 10, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(239,68,68,0.9)';
    ctx.font = '12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('help!', vx, vy - 24);
    // Bystanders on an arc
    const R = Math.min(w, h) * 0.36;
    live.agents.forEach((a, i) => {
      const ax0 = vx + Math.cos(a.angle) * R * 1.15, ay0 = vy - Math.sin(a.angle) * R;
      const ax = ax0 + (vx - ax0) * a.move * 0.75, ay = ay0 + (vy - 30 - ay0) * a.move * 0.75;
      const helping = i === live.helper;
      ctx.fillStyle = helping ? '#10b981' : '#64748b';
      ctx.beginPath(); ctx.arc(ax, ay - 22, 9, 0, Math.PI * 2); ctx.fill();
      ctx.fillRect(ax - 8, ay - 12, 16, 26);
      // Glance line: bystanders look at each other, not at the victim
      if (!live.done && live.agents.length > 1) {
        const gx = ax + Math.cos(a.glance) * 14, gy = ay - 22 + Math.sin(a.glance) * 6;
        ctx.strokeStyle = 'rgba(148,163,184,0.5)';
        ctx.beginPath(); ctx.moveTo(ax, ay - 22); ctx.lineTo(gx, gy); ctx.stroke();
      }
    });
    // Header
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(x + 24, y + 24, 250, 66);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px ui-monospace, monospace';
    ctx.fillText(`group of ${params.N}   t = ${live.t.toFixed(0)} s / ${T_MAX}`, x + 32, y + 44);
    ctx.font = '11px ui-monospace, monospace';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(`P(each helps) = ${(pPerson(params.N) * 100).toFixed(0)}%   P(anyone) = ${(pAnyone(params.N) * 100).toFixed(0)}%`, x + 32, y + 62);
    const tl = tallies[params.N];
    ctx.fillStyle = live.done ? (live.helper >= 0 ? '#10b981' : '#ef4444') : 'rgba(120,130,150,0.85)';
    ctx.fillText(live.done ? live.outcome : `trials so far: ${tl.trials}`, x + 32, y + 80);
  }

  function drawChart(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText('Probability that at least one bystander helps vs group size', x, y - 8);
    const x2 = (N) => x + ((N - 0.5) / MAX_N) * w;
    const y2 = (p) => y + h - p * (h - 10);
    ctx.font = '10px ui-monospace, monospace';
    for (let p = 0; p <= 1; p += 0.25) {
      ctx.strokeStyle = 'rgba(120,130,150,0.15)';
      ctx.beginPath(); ctx.moveTo(x, y2(p)); ctx.lineTo(x + w, y2(p)); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.fillText(`${(p * 100).toFixed(0)}%`, x - 32, y2(p) + 3);
    }
    for (let N = 1; N <= MAX_N; N++) {
      ctx.fillStyle = N === params.N ? '#fff' : 'rgba(120,130,150,0.7)';
      ctx.fillText(String(N), x2(N) - 3, y + h + 14);
    }
    const curve = (fn, color, dash) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.setLineDash(dash);
      ctx.beginPath();
      for (let N = 1; N <= MAX_N; N++) { const px = x2(N), py = y2(fn(N)); if (N === 1) ctx.moveTo(px, py); else ctx.lineTo(px, py); }
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.lineWidth = 1;
    };
    curve(pNaive, 'rgba(148,163,184,0.8)', [5, 5]);
    curve(pAnyone, '#0ea5e9', []);
    // Simulated points
    for (let N = 1; N <= MAX_N; N++) {
      const tl = tallies[N];
      if (tl.trials === 0) continue;
      const p = tl.helped / tl.trials;
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath(); ctx.arc(x2(N), y2(p), N === params.N ? 7 : 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.fillText(`n=${tl.trials}`, x2(N) + 8, y2(p) - 6);
    }
    // Darley & Latané reference
    for (const d of DARLEY) {
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x2(d.N) - 6, y2(d.p) - 6); ctx.lineTo(x2(d.N) + 6, y2(d.p) + 6);
      ctx.moveTo(x2(d.N) - 6, y2(d.p) + 6); ctx.lineTo(x2(d.N) + 6, y2(d.p) - 6); ctx.stroke();
      ctx.lineWidth = 1;
    }
    ctx.font = '10px ui-monospace, monospace';
    ctx.fillStyle = 'rgba(148,163,184,0.9)'; ctx.fillText('- - naive: more people, more help', x, y + h + 30);
    ctx.fillStyle = '#0ea5e9'; ctx.fillText('— diffusion model', x + w / 2, y + h + 30);
    ctx.fillStyle = '#fbbf24'; ctx.fillText('● simulated', x, y + h + 44);
    ctx.fillStyle = '#ef4444'; ctx.fillText('✕ Darley & Latané 1968', x + w / 2, y + h + 44);
  }

  // Controls
  const nS = slider({ label: 'Group size (bystanders)', min: 1, max: MAX_N, step: 1, value: params.N,
    onInput: (v) => { params.N = v; startTrial(); } });
  const p1S = slider({ label: 'P(help) when alone', min: 0.1, max: 1, step: 0.05, value: params.p1,
    format: (v) => `${(v * 100).toFixed(0)}%`, onInput: (v) => { params.p1 = v; } });
  const aS = slider({ label: 'Diffusion of responsibility (α)', min: 0, max: 2.5, step: 0.1, value: params.alpha,
    format: (v) => v.toFixed(1), onInput: (v) => { params.alpha = v; } });
  const speedS = slider({ label: 'Scene speed', min: 1, max: 30, step: 1, value: params.speed, format: (v) => `${v}×`,
    onInput: (v) => { params.speed = v; } });
  const autoT = toggle({ label: 'Auto-run scenes', value: params.autoRun, onChange: (v) => { params.autoRun = v; } });
  const batchB = button({ label: 'Run 200 trials per group size', primary: true, onClick: () => runBatch(200) });
  const clearB = button({ label: 'Clear data', onClick: () => { tallies.forEach((t) => { t.trials = 0; t.helped = 0; t.sumT = 0; }); } });
  ctrlPanel.append(nS.el, p1S.el, aS.el, speedS.el, row(batchB, autoT, clearB));

  const lab = labPanel({
    title: 'Bystander effect lab',
    filename: 'bystander-effect-lab.csv',
    columns: [
      { key: 'N',      label: 'group size' },
      { key: 'trials', label: 'trials' },
      { key: 'pAny',   label: 'P(anyone helps)', format: (v) => v.toFixed(2) },
      { key: 'meanT',  label: 'mean time to help (s)', format: (v) => v.toFixed(1) },
    ],
    procedure: [
      'Run 200 trials, then record for group sizes 1, 2 and 5 (move the slider, click Record).',
      'Compare your three rows with 85%, 62% and 31%. Adjust α and repeat.',
      'Set α = 0, clear, run again — which curve do the points follow now?',
    ],
    predict: 'With five bystanders instead of one, will the victim be more or less likely to get help?',
    source: () => {
      const tl = tallies[params.N];
      return {
        N: params.N, trials: tl.trials,
        pAny: tl.trials ? tl.helped / tl.trials : null,
        meanT: tl.helped ? tl.sumT / tl.helped : null,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  startTrial();
  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
