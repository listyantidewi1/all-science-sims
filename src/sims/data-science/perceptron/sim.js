import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
const COL = ['#3b82f6', '#f97316'];
const GRID = 56;
const MAX_HIST = 1200;

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const sig = (z) => 1 / (1 + Math.exp(-clamp(z, -40, 40)));
function gauss() {
  const u = Math.max(1e-12, Math.random()), v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

// Datasets live in [-1, 1]².
function makeData(kind) {
  const d = [];
  if (kind === 'xor') {
    for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (let i = 0; i < 20; i++) {
      d.push({ x: clamp(sx * 0.5 + gauss() * 0.15, -1, 1), y: clamp(sy * 0.5 + gauss() * 0.15, -1, 1), c: (sx > 0) !== (sy > 0) ? 1 : 0 });
    }
    return d;
  }
  // separable: label by a hidden line, keep a margin so a perfect line exists
  const a = 0.8, b = 1.0, c0 = -0.1;
  while (d.length < 80) {
    const x = Math.random() * 2 - 1, y = Math.random() * 2 - 1;
    const z = a * x + b * y + c0;
    if (Math.abs(z) < 0.2) continue;
    d.push({ x, y, c: z > 0 ? 1 : 0 });
  }
  if (kind === 'noisy') for (const p of d) if (Math.random() < 0.08) p.c = 1 - p.c;
  return d;
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { kind: 'separable', rule: 'gd', eta: 0.1, hidden: false, H: 3, training: false };
  const state = {
    data: makeData('separable'),
    w: [0.3, -0.2], b: 0.1,                        // single neuron
    net: null,                                      // hidden-layer network
    epoch: 0,
    hist: [], stride: 1, pending: 0,                // loss history (downsampled)
    loss: 0, acc: 0,
    grid: new Float32Array(GRID * GRID),
    gridDirty: true,
  };

  function randNet(H) {
    const r = () => Math.random() * 2 - 1;
    return {
      v: Array.from({ length: H }, () => [r(), r()]),
      c: Array.from({ length: H }, r),
      w: Array.from({ length: H }, r),
      b: r(),
    };
  }
  function resetWeights() {
    state.w = [(Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2];
    state.b = (Math.random() - 0.5);
    state.net = randNet(params.H);
    state.epoch = 0; state.hist = []; state.stride = 1; state.pending = 0;
    state.gridDirty = true;
    syncSliders();
    evaluate();
  }

  // --- forward passes -------------------------------------------------------
  function single(x, y) { return state.w[0] * x + state.w[1] * y + state.b; }
  function netForward(x, y) {
    const n = state.net;
    const h = n.v.map((vj, j) => Math.tanh(vj[0] * x + vj[1] * y + n.c[j]));
    let z = n.b;
    for (let j = 0; j < h.length; j++) z += n.w[j] * h[j];
    return { h, p: sig(z) };
  }
  // probability of class 1 at (x, y) under the current model
  function prob(x, y) {
    if (params.hidden) return netForward(x, y).p;
    const z = single(x, y);
    return params.rule === 'perceptron' ? (z > 0 ? 1 : 0) : sig(z);
  }

  function evaluate() {
    let correct = 0, loss = 0;
    for (const s of state.data) {
      const p = prob(s.x, s.y);
      if ((p > 0.5 ? 1 : 0) === s.c) correct++;
      if (!params.hidden && params.rule === 'perceptron') loss += (p > 0.5 ? 1 : 0) === s.c ? 0 : 1;
      else { const q = clamp(p, 1e-7, 1 - 1e-7); loss -= s.c * Math.log(q) + (1 - s.c) * Math.log(1 - q); }
    }
    const n = Math.max(1, state.data.length);
    state.acc = correct / n;
    state.loss = loss / n;
  }

  function pushHist(v) {
    state.pending++;
    if (state.pending < state.stride) return;
    state.pending = 0;
    state.hist.push(v);
    if (state.hist.length > MAX_HIST) {
      state.hist = state.hist.filter((_, i) => i % 2 === 0);
      state.stride *= 2;
    }
  }

  // --- one epoch of learning -------------------------------------------------
  function trainEpoch() {
    const eta = params.eta;
    const d = state.data;
    for (let i = d.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [d[i], d[j]] = [d[j], d[i]]; }
    if (params.hidden) {
      const n = state.net;
      for (const s of d) {
        const { h, p } = netForward(s.x, s.y);
        const g = p - s.c;
        for (let j = 0; j < h.length; j++) {
          const dz = g * n.w[j] * (1 - h[j] * h[j]);
          n.v[j][0] -= eta * dz * s.x; n.v[j][1] -= eta * dz * s.y; n.c[j] -= eta * dz;
          n.w[j] -= eta * g * h[j];
        }
        n.b -= eta * g;
      }
    } else if (params.rule === 'perceptron') {
      for (const s of d) {
        const yhat = single(s.x, s.y) > 0 ? 1 : 0;
        const err = s.c - yhat;
        if (err !== 0) { state.w[0] += eta * err * s.x; state.w[1] += eta * err * s.y; state.b += eta * err; }
      }
    } else {
      for (const s of d) {
        const g = sig(single(s.x, s.y)) - s.c;
        state.w[0] -= eta * g * s.x; state.w[1] -= eta * g * s.y; state.b -= eta * g;
      }
    }
    state.epoch++;
    evaluate();
    pushHist(state.loss);
    state.gridDirty = true;
  }

  function recomputeGrid() {
    for (let j = 0; j < GRID; j++) for (let i = 0; i < GRID; i++) {
      const x = -1 + (i + 0.5) * 2 / GRID, y = -1 + (j + 0.5) * 2 / GRID;
      state.grid[j * GRID + i] = prob(x, y);
    }
    state.gridDirty = false;
  }

  // --- layout and drawing -----------------------------------------------------
  function layout() {
    const W = cv.width, H = cv.height;
    // leave room under the plot for the x₁ label and the epoch/accuracy/loss line (2.4 fs below it)
    const fs = Math.max(10, Math.round(H * 0.03));
    const side = Math.min(H * 0.80, W * 0.5, H * 0.90 - fs * 2.7);
    const plot = { x: W * 0.03, y: H * 0.10, w: side, h: side };
    const rx = plot.x + plot.w + W * 0.04;
    const rw = W * 0.97 - rx;
    const neuron = { x: rx, y: H * 0.10, w: rw, h: H * 0.34 };
    const chart = { x: rx + W * 0.04, y: H * 0.56, w: rw - W * 0.04, h: H * 0.32 };
    return { plot, neuron, chart };
  }
  const toPx = (P, x, y) => ({ x: P.x + (x + 1) / 2 * P.w, y: P.y + (1 - (y + 1) / 2) * P.h });

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    if (state.gridDirty) recomputeGrid();
    const { plot: P, neuron: N, chart: C } = layout();
    const fs = Math.max(10, Math.round(H * 0.03));
    const font = `${fs}px system-ui, -apple-system, Roboto, sans-serif`;
    const bold = `bold ${fs}px system-ui, -apple-system, Roboto, sans-serif`;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);

    // regions
    const cw = P.w / GRID;
    for (let j = 0; j < GRID; j++) for (let i = 0; i < GRID; i++) {
      const p = state.grid[j * GRID + i];
      ctx.fillStyle = p > 0.5 ? COL[1] : COL[0];
      ctx.globalAlpha = 0.08 + 0.22 * Math.abs(p - 0.5) * 2;
      ctx.fillRect(P.x + i * cw, P.y + (GRID - 1 - j) * cw, cw + 0.6, cw + 0.6);
    }
    ctx.globalAlpha = 1;
    // axes through the origin
    ctx.strokeStyle = 'rgba(148,163,184,0.35)'; ctx.lineWidth = 1;
    const o = toPx(P, 0, 0);
    ctx.beginPath(); ctx.moveTo(P.x, o.y); ctx.lineTo(P.x + P.w, o.y); ctx.moveTo(o.x, P.y); ctx.lineTo(o.x, P.y + P.h); ctx.stroke();
    ctx.strokeStyle = 'rgba(148,163,184,0.6)'; ctx.strokeRect(P.x, P.y, P.w, P.h);
    ctx.fillStyle = '#94a3b8'; ctx.font = `${Math.round(fs * 0.9)}px system-ui, sans-serif`; ctx.textAlign = 'center';
    ctx.fillText('x₁', P.x + P.w / 2, P.y + P.h + fs * 1.2);
    ctx.save(); ctx.translate(P.x - fs * 0.6, P.y + P.h / 2); ctx.rotate(-Math.PI / 2); ctx.fillText('x₂', 0, 0); ctx.restore();

    // single-neuron decision line (exact), drawn on top of the shading
    if (!params.hidden) {
      const [w1, w2] = state.w, b = state.b;
      ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2.5;
      ctx.save(); ctx.beginPath(); ctx.rect(P.x, P.y, P.w, P.h); ctx.clip();
      ctx.beginPath();
      if (Math.abs(w2) > 1e-6) {
        const y1 = -(w1 * -3 + b) / w2, y2 = -(w1 * 3 + b) / w2;
        const a = toPx(P, -3, y1), bb = toPx(P, 3, y2);
        ctx.moveTo(a.x, a.y); ctx.lineTo(bb.x, bb.y);
      } else if (Math.abs(w1) > 1e-6) {
        const x0 = -b / w1;
        const a = toPx(P, x0, -3), bb = toPx(P, x0, 3);
        ctx.moveTo(a.x, a.y); ctx.lineTo(bb.x, bb.y);
      }
      ctx.stroke();
      // weight vector arrow from the origin
      const len = Math.hypot(w1, w2);
      if (len > 1e-6) {
        const tip = toPx(P, w1 / len * 0.35, w2 / len * 0.35);
        ctx.strokeStyle = '#fde68a'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(o.x, o.y); ctx.lineTo(tip.x, tip.y); ctx.stroke();
        ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.arc(tip.x, tip.y, 3, 0, Math.PI * 2); ctx.fill();
        ctx.font = `${Math.round(fs * 0.9)}px system-ui, sans-serif`; ctx.textAlign = 'left';
        ctx.fillText('w', tip.x + 4, tip.y - 4);
      }
      ctx.restore();
    }

    // data points; misclassified ones get a red ring
    const r = Math.max(3, Math.min(W, H) * 0.009);
    for (const s of state.data) {
      const q = toPx(P, s.x, s.y);
      const p = prob(s.x, s.y);
      ctx.fillStyle = COL[s.c];
      ctx.beginPath(); ctx.arc(q.x, q.y, r, 0, Math.PI * 2); ctx.fill();
      if ((p > 0.5 ? 1 : 0) !== s.c) {
        ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(q.x, q.y, r + 2.5, 0, Math.PI * 2); ctx.stroke();
      }
    }

    // header
    ctx.fillStyle = '#e2e8f0'; ctx.font = bold; ctx.textAlign = 'left';
    const modelName = params.hidden
      ? T(`network: 2 inputs → ${params.H} hidden (tanh) → 1 output`, `jaringan: 2 masukan → ${params.H} tersembunyi (tanh) → 1 keluaran`)
      : T(`single neuron, ${params.rule === 'perceptron' ? 'perceptron rule' : 'gradient descent'}`, `satu neuron, ${params.rule === 'perceptron' ? 'aturan perceptron' : 'penurunan gradien'}`);
    ctx.fillText(modelName, P.x, P.y - fs * 0.7);
    ctx.font = font; ctx.fillStyle = '#cbd5e1';
    const lossName = (!params.hidden && params.rule === 'perceptron') ? T('error rate', 'laju kesalahan') : T('cross-entropy', 'entropi-silang');
    ctx.fillText(T(`epoch ${state.epoch}   accuracy ${(state.acc * 100).toFixed(0)}%   loss (${lossName}) ${state.loss.toFixed(3)}`,
      `epoch ${state.epoch}   akurasi ${(state.acc * 100).toFixed(0)}%   loss (${lossName}) ${state.loss.toFixed(3)}`), P.x, P.y + P.h + fs * 2.4);

    drawNeuron(ctx, N, fs);
    drawChart(ctx, C, fs);
    ctx.textAlign = 'left';
  }

  function drawNeuron(ctx, N, fs) {
    const small = `${Math.round(fs * 0.9)}px system-ui, sans-serif`;
    const node = (x, y, rad, label, fill) => {
      ctx.fillStyle = fill || '#1e293b'; ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#e2e8f0'; ctx.font = small; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(label, x, y);
      ctx.textBaseline = 'alphabetic';
    };
    const edge = (x1, y1, x2, y2, w, label) => {
      ctx.strokeStyle = w >= 0 ? '#f97316' : '#3b82f6';
      ctx.lineWidth = clamp(0.6 + Math.abs(w) * 1.6, 0.6, 6);
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      if (label) {
        ctx.fillStyle = '#e2e8f0'; ctx.font = small; ctx.textAlign = 'center';
        ctx.fillText(label, (x1 + x2) / 2, (y1 + y2) / 2 - 4);
      }
    };
    const rad = Math.max(9, Math.min(N.w, N.h) * 0.075);
    const inX = N.x + rad * 1.4, outX = N.x + N.w - rad * 1.4;
    const ys = [N.y + N.h * 0.18, N.y + N.h * 0.5, N.y + N.h * 0.82];
    const outY = N.y + N.h * 0.5;
    if (!params.hidden) {
      edge(inX, ys[0], outX, outY, state.w[0], `w₁=${state.w[0].toFixed(2)}`);
      edge(inX, ys[1], outX, outY, state.w[1], `w₂=${state.w[1].toFixed(2)}`);
      edge(inX, ys[2], outX, outY, state.b, `b=${state.b.toFixed(2)}`);
      node(inX, ys[0], rad, 'x₁'); node(inX, ys[1], rad, 'x₂'); node(inX, ys[2], rad, '1');
      node(outX, outY, rad * 1.25, 'Σ', '#334155');
      ctx.fillStyle = '#94a3b8'; ctx.font = small; ctx.textAlign = 'right';
      ctx.fillText(params.rule === 'perceptron' ? T('fires if z > 0', 'menyala jika z > 0') : 'p = σ(z)', N.x + N.w, N.y + N.h * 0.5 + rad * 2.4);
    } else {
      const n = state.net, Hn = n.w.length;
      const midX = (inX + outX) / 2;
      const hy = (j) => N.y + N.h * ((j + 1) / (Hn + 1));
      for (let j = 0; j < Hn; j++) {
        edge(inX, ys[0], midX, hy(j), n.v[j][0]); edge(inX, ys[1], midX, hy(j), n.v[j][1]); edge(inX, ys[2], midX, hy(j), n.c[j]);
        edge(midX, hy(j), outX, outY, n.w[j]);
      }
      node(inX, ys[0], rad, 'x₁'); node(inX, ys[1], rad, 'x₂'); node(inX, ys[2], rad, '1');
      for (let j = 0; j < Hn; j++) node(midX, hy(j), rad, `h${j + 1}`, '#334155');
      node(outX, outY, rad * 1.25, 'y', '#334155');
      ctx.fillStyle = '#94a3b8'; ctx.font = small; ctx.textAlign = 'right';
      ctx.fillText(T('orange = positive weight, blue = negative; thickness = size', 'oranye = bobot positif, biru = negatif; tebal = besar'), N.x + N.w, N.y + N.h + fs * 0.4);
    }
  }

  function drawChart(ctx, C, fs) {
    const small = `${Math.round(fs * 0.85)}px system-ui, sans-serif`;
    ctx.strokeStyle = 'rgba(148,163,184,0.6)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(C.x, C.y); ctx.lineTo(C.x, C.y + C.h); ctx.lineTo(C.x + C.w, C.y + C.h); ctx.stroke();
    ctx.fillStyle = '#e2e8f0'; ctx.font = `bold ${Math.round(fs * 0.9)}px system-ui, sans-serif`; ctx.textAlign = 'left';
    ctx.fillText(T('loss per epoch', 'loss per epoch'), C.x, C.y - fs * 0.5);
    const h = state.hist;
    if (h.length < 2) {
      ctx.fillStyle = '#94a3b8'; ctx.font = small; ctx.textAlign = 'center';
      ctx.fillText(T('press Train to start', 'tekan Latih untuk mulai'), C.x + C.w / 2, C.y + C.h / 2);
      return;
    }
    let yMax = 0; for (const v of h) if (Number.isFinite(v) && v > yMax) yMax = v;
    yMax = Math.max(yMax, 0.1) * 1.05;
    const cx = (i) => C.x + (i / (h.length - 1)) * C.w;
    const cy = (v) => C.y + (1 - clamp(v, 0, yMax) / yMax) * C.h;
    ctx.fillStyle = '#94a3b8'; ctx.font = small; ctx.textAlign = 'right';
    ctx.fillText(yMax.toFixed(2), C.x - 3, C.y + fs * 0.4);
    ctx.fillText('0', C.x - 3, C.y + C.h);
    ctx.textAlign = 'right';
    ctx.fillText(`${state.epoch} ${T('epochs', 'epoch')}`, C.x + C.w, C.y + C.h + fs);
    ctx.strokeStyle = '#22c55e'; ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < h.length; i++) { const X = cx(i), Y = cy(h[i]); if (i === 0) ctx.moveTo(X, Y); else ctx.lineTo(X, Y); }
    ctx.stroke();
  }

  // --- controls ------------------------------------------------------------------
  const kindSel = select({
    label: 'Dataset', key: 'dataset',
    options: [
      { value: 'separable', label: T('Linearly separable', 'Terpisah linear') },
      { value: 'noisy', label: T('Separable + label noise', 'Terpisah + label bising') },
      { value: 'xor', label: 'XOR' },
    ],
    value: params.kind,
    onChange: (v) => { params.kind = v; state.data = makeData(v); resetWeights(); },
  });
  const ruleSel = select({
    label: 'Learning rule', key: 'rule',
    options: [
      { value: 'gd', label: T('Gradient descent (sigmoid)', 'Penurunan gradien (sigmoid)') },
      { value: 'perceptron', label: T('Perceptron rule (step)', 'Aturan perceptron (tangga)') },
    ],
    value: params.rule,
    onChange: (v) => { params.rule = v; state.hist = []; state.stride = 1; state.pending = 0; state.gridDirty = true; evaluate(); },
  });
  const etaS = slider({ label: 'Learning rate η', key: 'eta', min: 0.01, max: 1, step: 0.01, value: params.eta, format: (v) => v.toFixed(2), onInput: (v) => { params.eta = v; } });
  const w1S = slider({ label: 'w₁', key: 'w1', min: -3, max: 3, step: 0.05, value: state.w[0], format: (v) => v.toFixed(2), onInput: (v) => { state.w[0] = v; state.gridDirty = true; evaluate(); } });
  const w2S = slider({ label: 'w₂', key: 'w2', min: -3, max: 3, step: 0.05, value: state.w[1], format: (v) => v.toFixed(2), onInput: (v) => { state.w[1] = v; state.gridDirty = true; evaluate(); } });
  const bS = slider({ label: 'b (bias)', key: 'b', min: -3, max: 3, step: 0.05, value: state.b, format: (v) => v.toFixed(2), onInput: (v) => { state.b = v; state.gridDirty = true; evaluate(); } });
  function syncSliders() {
    w1S.value = clamp(state.w[0], -3, 3); w2S.value = clamp(state.w[1], -3, 3); bS.value = clamp(state.b, -3, 3);
  }
  const hiddenT = toggle({ label: T('Add a hidden layer', 'Tambah lapisan tersembunyi'), key: 'hidden', value: false, onChange: (v) => {
    params.hidden = v;
    ruleSel.el.style.display = v ? 'none' : '';
    for (const s of [w1S, w2S, bS]) s.el.style.display = v ? 'none' : '';
    hS.el.style.display = v ? '' : 'none';
    state.hist = []; state.stride = 1; state.pending = 0; state.epoch = 0; state.gridDirty = true; evaluate();
  } });
  const hS = slider({ label: 'Hidden neurons', key: 'hidden-n', min: 2, max: 4, step: 1, value: 3, onInput: (v) => { params.H = v; state.net = randNet(v); state.epoch = 0; state.hist = []; state.stride = 1; state.pending = 0; state.gridDirty = true; evaluate(); } });
  hS.el.style.display = 'none';
  const trainB = button({ label: T('Train', 'Latih'), primary: true, onClick: () => { params.training = !params.training; trainB.label = params.training ? T('Pause', 'Jeda') : T('Train', 'Latih'); } });
  const stepB = button({ label: T('1 epoch', '1 epoch'), onClick: () => { trainEpoch(); syncSliders(); } });
  const resetB = button({ label: T('Reset weights', 'Reset bobot'), onClick: resetWeights });
  ctrlPanel.append(kindSel.el, ruleSel.el, etaS.el, row(trainB, stepB, resetB), row(hiddenT), hS.el, w1S.el, w2S.el, bS.el);

  const lab = labPanel({
    title: 'Perceptron lab — training log',
    filename: 'perceptron-data.csv',
    columns: [
      { key: 'dataset', label: 'Dataset' },
      { key: 'model', label: 'Model' },
      { key: 'eta', label: 'η', format: (v) => v.toFixed(2) },
      { key: 'epochs', label: 'Epochs' },
      { key: 'acc', label: 'Accuracy (%)', format: (v) => v.toFixed(1) },
      { key: 'loss', label: 'Loss', format: (v) => v.toFixed(3) },
    ],
    procedure: [
      'Separable data, perceptron rule, η = 0.1: Reset weights, press Train, pause when accuracy reaches 100%. Record.',
      'Same data, gradient descent, η = 0.1 then η = 1.0: train 100 epochs each (watch the epoch counter). Record both.',
      'XOR, single neuron: train 200 epochs. Record the accuracy it gets stuck at.',
      'XOR, hidden layer on (3 neurons, the default): train until the loss flattens. Record. Then set Hidden neurons to 2, Reset weights and train again; if accuracy is below 90%, Reset weights and repeat, noting how many tries it took.',
    ],
    predict: 'How many epochs will the perceptron rule need on separable data? What accuracy will a single neuron reach on XOR?',
    source: () => ({
      dataset: params.kind,
      model: params.hidden ? `hidden-${params.H}` : params.rule,
      eta: params.eta,
      epochs: state.epoch,
      acc: state.acc * 100,
      loss: state.loss,
    }),
  });
  ctrlPanel.appendChild(lab.el);

  resetWeights();
  const animator = loop(() => {
    if (params.training) {
      const n = params.hidden ? 3 : 1;
      for (let i = 0; i < n; i++) trainEpoch();
      syncSliders();
    }
    draw();
  });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
