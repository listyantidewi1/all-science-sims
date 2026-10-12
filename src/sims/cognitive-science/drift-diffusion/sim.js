import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

const T_MAX = 3;          // seconds shown on the time axis
const DT = 0.002;         // step for the batch simulation
const N_BATCH = 1500;     // trials behind the histograms
const BINS = 60;
const N_LIVE = 24;        // animated traces
const LIVE_DT = 0.004;
const TIME_SCALE = 0.5;   // model seconds per real second
const A_MIN = 0.3, A_MAX = 2.5;

function randn() {
  let u = 0;
  while (u === 0) u = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * Math.random());
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { v: 0.3, a: 1.0, s: 1.0, ter: 0.25, bias: 0.5 };
  const batch = { histC: new Float32Array(BINS), histE: new Float32Array(BINS), nC: 0, nE: 0, undecided: 0, rtC: null, rtE: null };
  let live = [];
  let liveT = 0;        // decision time elapsed in the live animation
  let pauseLeft = 0;    // real seconds to wait before restarting the traces

  /** One trial: returns { t: RT in s, upper: bool } or null if undecided by T_MAX. */
  function simulate(dt) {
    let x = params.bias * params.a, t = 0;
    const sq = params.s * Math.sqrt(dt);
    while (t + params.ter < T_MAX) {
      x += params.v * dt + sq * randn();
      t += dt;
      if (x >= params.a) return { t: t + params.ter, upper: true };
      if (x <= 0) return { t: t + params.ter, upper: false };
    }
    return null;
  }

  function recompute() {
    batch.histC.fill(0); batch.histE.fill(0);
    let sumC = 0, sumE = 0;
    batch.nC = 0; batch.nE = 0; batch.undecided = 0;
    for (let i = 0; i < N_BATCH; i++) {
      const r = simulate(DT);
      if (!r) { batch.undecided++; continue; }
      const b = Math.min(BINS - 1, Math.floor((r.t / T_MAX) * BINS));
      if (r.upper) { batch.nC++; sumC += r.t; batch.histC[b]++; } else { batch.nE++; sumE += r.t; batch.histE[b]++; }
    }
    batch.rtC = batch.nC ? sumC / batch.nC : null;
    batch.rtE = batch.nE ? sumE / batch.nE : null;
  }

  /** Closed-form hit probability and mean RT for a Wiener process with absorbing bounds. */
  function analytic(a) {
    const v = params.v, s2 = params.s * params.s, z = params.bias * a;
    let pUp, meanDT;
    if (Math.abs(v) < 1e-4) { pUp = z / a; meanDT = (z * (a - z)) / s2; }
    else {
      pUp = (1 - Math.exp((-2 * v * z) / s2)) / (1 - Math.exp((-2 * v * a) / s2));
      meanDT = (a * pUp - z) / v;
    }
    return { acc: pUp, rt: meanDT + params.ter };
  }

  function resetLive() {
    live = Array.from({ length: N_LIVE }, () => ({ pts: [params.bias * params.a], done: null }));
    liveT = 0;
    pauseLeft = 0;
  }

  function stepLive(dtReal) {
    if (pauseLeft > 0) { pauseLeft -= dtReal; if (pauseLeft <= 0) resetLive(); return; }
    let steps = Math.max(1, Math.round((dtReal * TIME_SCALE) / LIVE_DT));
    const sq = params.s * Math.sqrt(LIVE_DT);
    while (steps-- > 0 && liveT + params.ter < T_MAX) {
      liveT += LIVE_DT;
      for (const tr of live) {
        if (tr.done) continue;
        let x = tr.pts[tr.pts.length - 1] + params.v * LIVE_DT + sq * randn();
        if (x >= params.a) { x = params.a; tr.done = 'upper'; }
        else if (x <= 0) { x = 0; tr.done = 'lower'; }
        tr.pts.push(x);
      }
    }
    if (live.every((tr) => tr.done) || liveT + params.ter >= T_MAX) pauseLeft = 1.2;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const x0 = 44, pw = W * 0.62 - x0;
    const yTop = H * 0.3, yBot = H * 0.72, ph = yBot - yTop;
    const tx = (t) => x0 + (t / T_MAX) * pw;
    const ey = (x) => yTop + (1 - x / params.a) * ph;

    // Histograms: correct above the trace panel, errors below (classic DDM figure)
    const hMax = Math.max(1, ...batch.histC, ...batch.histE);
    const bw = pw / BINS;
    for (let b = 0; b < BINS; b++) {
      const hc = (batch.histC[b] / hMax) * (yTop - 28);
      const he = (batch.histE[b] / hMax) * (H - 24 - yBot - 6);
      ctx.fillStyle = 'rgba(16,185,129,0.75)';
      ctx.fillRect(x0 + b * bw, yTop - 4 - hc, bw - 1, hc);
      ctx.fillStyle = 'rgba(239,68,68,0.75)';
      ctx.fillRect(x0 + b * bw, yBot + 4, bw - 1, he);
    }

    // Trace panel
    ctx.fillStyle = 'rgba(148,163,184,0.12)';
    ctx.fillRect(x0, yTop, tx(params.ter) - x0, ph);
    ctx.strokeStyle = 'rgba(226,232,240,0.9)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x0, yTop); ctx.lineTo(x0 + pw, yTop); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x0, yBot); ctx.lineTo(x0 + pw, yBot); ctx.stroke();
    ctx.setLineDash([3, 4]);
    ctx.strokeStyle = 'rgba(148,163,184,0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x0, ey(params.bias * params.a)); ctx.lineTo(x0 + pw, ey(params.bias * params.a)); ctx.stroke();
    ctx.setLineDash([]);
    for (const tr of live) {
      ctx.strokeStyle = tr.done === 'upper' ? 'rgba(16,185,129,0.8)' : tr.done === 'lower' ? 'rgba(239,68,68,0.8)' : 'rgba(148,163,184,0.7)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let i = 0; i < tr.pts.length; i++) {
        const px = tx(params.ter + i * LIVE_DT), py = ey(tr.pts[i]);
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }

    // Labels
    ctx.fillStyle = '#10b981'; ctx.font = 'bold 11px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText(`a = ${params.a.toFixed(2)}  (correct)`, x0 + 6, yTop - 6);
    ctx.fillStyle = '#ef4444';
    ctx.fillText('0  (error)', x0 + 6, yBot + 14);
    ctx.fillStyle = 'rgba(148,163,184,0.9)'; ctx.font = '10px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText(`z = ${(params.bias * params.a).toFixed(2)}`, x0 - 40, ey(params.bias * params.a) + 3);
    ctx.fillText('Ter', x0 + 2, yTop + 12);
    for (let t = 0; t <= T_MAX; t += 0.5) {
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.fillText(`${t.toFixed(1)}s`, tx(t) - 10, H - 8);
    }
    ctx.fillStyle = 'rgba(120,130,150,0.85)'; ctx.font = 'bold 11px system-ui, -apple-system, Roboto, sans-serif';
    ctx.fillText('RT distribution — correct', x0, 14);
    ctx.fillText('RT distribution — errors', x0 + pw - 135, H - 24);

    drawStats(ctx, W * 0.62 + 24, 18, W * 0.38 - 44, H);
  }

  function drawStats(ctx, x, y, w, H) {
    const acc = batch.nC + batch.nE ? batch.nC / (batch.nC + batch.nE) : 0;
    const an = analytic(params.a);
    const fmt = (v) => (v != null ? `${(v * 1000).toFixed(0)} ms` : '–');
    ctx.fillStyle = '#fff'; ctx.font = 'bold 13px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText(`accuracy  ${(acc * 100).toFixed(1)}%`, x, y + 12);
    ctx.fillStyle = '#10b981'; ctx.font = '11px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText(`mean RT correct  ${fmt(batch.rtC)}  (n=${batch.nC})`, x, y + 30);
    ctx.fillStyle = '#ef4444';
    ctx.fillText(`mean RT error    ${fmt(batch.rtE)}  (n=${batch.nE})`, x, y + 46);
    ctx.fillStyle = 'rgba(148,163,184,0.85)';
    ctx.fillText(`undecided by ${T_MAX}s: ${batch.undecided}   theory: ${(an.acc * 100).toFixed(1)}%, ${fmt(an.rt)}`, x, y + 62);

    // Boundary sweep: accuracy and mean RT as a function of a (speed–accuracy tradeoff)
    const cy = y + 100, ch = H - cy - 50;
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(x, cy, w, ch);
    ctx.fillStyle = 'rgba(120,130,150,0.85)'; ctx.font = 'bold 11px system-ui, -apple-system, Roboto, sans-serif';
    ctx.fillText('Boundary sweep — speed–accuracy tradeoff', x, cy - 8);
    const sweep = [];
    let rtMax = 0.5;
    for (let i = 0; i <= 60; i++) {
      const a = A_MIN + ((A_MAX - A_MIN) * i) / 60;
      const r = analytic(a);
      sweep.push({ a, ...r });
      rtMax = Math.max(rtMax, Math.min(r.rt, 6));
    }
    const ax = (a) => x + ((a - A_MIN) / (A_MAX - A_MIN)) * w;
    const accY = (p) => cy + ch - p * (ch - 10) - 5;
    const rtY = (t) => cy + ch - (Math.min(t, 6) / rtMax) * (ch - 10) - 5;
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#10b981';
    ctx.beginPath();
    sweep.forEach((p, i) => (i ? ctx.lineTo(ax(p.a), accY(p.acc)) : ctx.moveTo(ax(p.a), accY(p.acc))));
    ctx.stroke();
    ctx.strokeStyle = '#fbbf24';
    ctx.beginPath();
    sweep.forEach((p, i) => (i ? ctx.lineTo(ax(p.a), rtY(p.rt)) : ctx.moveTo(ax(p.a), rtY(p.rt))));
    ctx.stroke();
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = 'rgba(226,232,240,0.7)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(ax(params.a), cy); ctx.lineTo(ax(params.a), cy + ch); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#10b981';
    ctx.beginPath(); ctx.arc(ax(params.a), accY(an.acc), 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.arc(ax(params.a), rtY(an.rt), 5, 0, Math.PI * 2); ctx.fill();
    ctx.font = '10px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillStyle = '#10b981'; ctx.fillText('accuracy (0–100%)', x + 4, cy + 12);
    ctx.fillStyle = '#fbbf24'; ctx.fillText(`mean RT (0–${rtMax.toFixed(1)} s)`, x + 4, cy + 24);
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.fillText(`a = ${A_MIN}`, x, cy + ch + 12);
    ctx.fillText(`a = ${A_MAX}`, x + w - 40, cy + ch + 12);
    ctx.fillStyle = 'rgba(148,163,184,0.85)'; ctx.font = '10px system-ui, -apple-system, Roboto, sans-serif';
    ctx.fillText('Wider bounds: slower but more accurate — same evidence quality.', x, cy + ch + 28);
  }

  const onParam = () => { recompute(); resetLive(); };
  const vS = slider({ label: 'Drift rate v', min: -0.5, max: 1.5, step: 0.05, value: params.v, format: (v) => v.toFixed(2),
    onInput: (v) => { params.v = v; onParam(); } });
  const aS = slider({ label: 'Boundary separation a', min: A_MIN, max: A_MAX, step: 0.05, value: params.a, format: (v) => v.toFixed(2),
    onInput: (v) => { params.a = v; onParam(); } });
  const sS = slider({ label: 'Noise s', min: 0.3, max: 2, step: 0.05, value: params.s, format: (v) => v.toFixed(2),
    onInput: (v) => { params.s = v; onParam(); } });
  const terS = slider({ label: 'Non-decision time Ter (s)', min: 0, max: 0.6, step: 0.01, value: params.ter, format: (v) => v.toFixed(2),
    onInput: (v) => { params.ter = v; onParam(); } });
  const zS = slider({ label: 'Starting point z / a (bias)', min: 0.1, max: 0.9, step: 0.02, value: params.bias, format: (v) => v.toFixed(2),
    onInput: (v) => { params.bias = v; onParam(); } });
  const replayB = button({ label: 'Replay traces', primary: true, onClick: resetLive });
  const resampleB = button({ label: 'Resample histograms', onClick: recompute });
  ctrlPanel.append(vS.el, aS.el, sS.el, terS.el, zS.el, row(replayB, resampleB));

  const lab = labPanel({
    title: 'Drift-diffusion lab — speed vs accuracy',
    filename: 'drift-diffusion-lab.csv',
    columns: [
      { key: 'v',    label: 'drift v',      format: (x) => x.toFixed(2) },
      { key: 'a',    label: 'boundary a',   format: (x) => x.toFixed(2) },
      { key: 'bias', label: 'z / a',        format: (x) => x.toFixed(2) },
      { key: 'acc',  label: 'accuracy (%)', format: (x) => x.toFixed(1) },
      { key: 'rtC',  label: 'RT correct (ms)', format: (x) => x.toFixed(0) },
      { key: 'rtE',  label: 'RT error (ms)',   format: (x) => x.toFixed(0) },
    ],
    procedure: [
      'Keep v = 0.3, s = 1, z/a = 0.5. Record at a = 0.5, 1.0, 1.5, 2.0, 2.5.',
      'Plot accuracy (y) vs mean RT correct (x). This curve IS the speed–accuracy tradeoff.',
      'Reset a = 1.0. Record at v = 0, 0.3, 0.6, 1.0. How does evidence quality differ from caution?',
      'Set z/a = 0.3 and record. Compare RT error with RT correct — which is faster now?',
    ],
    predict: 'Doubling the boundary separation: will accuracy double? Will mean RT double? Which one changes more?',
    source: () => ({
      v: params.v, a: params.a, bias: params.bias,
      acc: batch.nC + batch.nE ? (100 * batch.nC) / (batch.nC + batch.nE) : null,
      rtC: batch.rtC != null ? batch.rtC * 1000 : null,
      rtE: batch.rtE != null ? batch.rtE * 1000 : null,
    }),
  });
  ctrlPanel.appendChild(lab.el);

  recompute();
  resetLive();
  const animator = loop((dt) => { stepLive(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
