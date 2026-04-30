import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';
import { hoverProbe, drawCrosshair } from '../../../lib/chart.js';
import { labPanel } from '../../../lib/lab.js';

function drawFrom(parent) {
  if (parent === 'uniform') return Math.random();
  if (parent === 'exponential') return -Math.log(1 - Math.random()) / 2;
  if (parent === 'bimodal') {
    const u = Math.random();
    if (u < 0.5) return 0.15 + 0.1 * gaussian();
    return 0.75 + 0.1 * gaussian();
  }
  if (parent === 'skewed') return Math.pow(Math.random(), 3);
  if (parent === 'spike') return Math.random() < 0.85 ? 0.5 + 0.02 * gaussian() : Math.random();
  return Math.random();
}

function gaussian() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    parent: 'uniform',
    n: 5,
    rate: 30,    // sample-means per second
    auto: true,
  };

  let parentSamples = []; // raw values for parent histogram
  let means = [];
  // Each chart records its rect + range so hover can hit-test it.
  const charts = { parent: null, means: null };

  function reset() {
    parentSamples = [];
    means = [];
  }

  function drawSampleMean() {
    let s = 0;
    for (let i = 0; i < params.n; i++) {
      const v = drawFrom(params.parent);
      parentSamples.push(v);
      s += v;
    }
    if (parentSamples.length > 5000) parentSamples.splice(0, parentSamples.length - 5000);
    means.push(s / params.n);
    if (means.length > 5000) means.shift();
  }

  // pre-fill parent with a static sample for visualization
  function prefillParent() {
    parentSamples = [];
    for (let i = 0; i < 1500; i++) parentSamples.push(drawFrom(params.parent));
  }
  prefillParent();

  function step(dt) {
    if (!params.auto) return;
    const target = params.rate * dt;
    let frac = target;
    while (frac >= 1) { drawSampleMean(); frac -= 1; }
    if (Math.random() < frac) drawSampleMean();
  }

  function histogram(values, range, bins) {
    const [a, b] = range;
    const w = (b - a) / bins;
    const counts = new Array(bins).fill(0);
    for (const v of values) {
      const idx = Math.floor((v - a) / w);
      if (idx >= 0 && idx < bins) counts[idx]++;
    }
    return counts;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    const halfW = W / 2;
    charts.parent = { x: 30, y: 30, w: halfW - 60, h: H - 60, range: [0, 1], values: parentSamples };
    drawHist(ctx, 30, 30, halfW - 60, H - 60, parentSamples, '#94a3b8', 'Parent distribution');
    const meanRange = computeMeanRange();
    charts.means = { x: halfW + 30, y: 30, w: halfW - 60, h: H - 60, range: meanRange, values: means };
    drawHist(ctx, halfW + 30, 30, halfW - 60, H - 60, means, '#ec4899', `Sample-mean histogram  (n = ${params.n})`, meanRange, true);

    const probe = hover.get();
    if (probe) {
      const c = probe.kind === 'parent' ? charts.parent : charts.means;
      drawCrosshair(ctx, probe, { bounds: c, color: '#fbbf24', label: probe.label });
    }
  }

  function computeMeanRange() {
    if (params.parent === 'exponential') return [0, 2];
    return [0, 1];
  }

  function drawHist(ctx, x, y, w, h, values, color, title, range = [0, 1], overlayNormal = false) {
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(x, y, w, h);
    if (values.length < 1) return;
    const bins = 36;
    const counts = histogram(values, range, bins);
    const max = Math.max(...counts, 1);
    const binW = w / bins;
    for (let i = 0; i < bins; i++) {
      const bh = (counts[i] / max) * (h - 16);
      ctx.fillStyle = color;
      ctx.fillRect(x + i * binW + 1, y + h - bh, Math.max(1, binW - 1), bh);
    }

    if (overlayNormal && values.length > 30) {
      // theoretical: mean and stddev of values
      let sum = 0; for (const v of values) sum += v;
      const mu = sum / values.length;
      let varc = 0; for (const v of values) varc += (v - mu) ** 2;
      const sigma = Math.sqrt(varc / values.length);
      // Normal density scaled to match histogram peak
      const peak = max / values.length / (range[1] - range[0]) * bins;
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      const N = 80;
      for (let i = 0; i <= N; i++) {
        const xv = range[0] + (i / N) * (range[1] - range[0]);
        const d = Math.exp(-0.5 * ((xv - mu) / sigma) ** 2) / (sigma * Math.sqrt(2 * Math.PI));
        const sx = x + ((xv - range[0]) / (range[1] - range[0])) * w;
        const sy = y + h - (d / peak) * (h - 16) * 0.5;
        if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }

    ctx.fillStyle = 'rgba(120,130,150,0.95)';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(title, x, y - 6);
    ctx.font = '11px var(--font-sans)';
    ctx.fillText(`samples: ${values.length}`, x + w - 96, y - 6);
  }

  // controls
  const parentSel = select({
    label: 'Parent distribution',
    options: [
      { value: 'uniform',     label: 'Uniform' },
      { value: 'exponential', label: 'Exponential' },
      { value: 'bimodal',     label: 'Bimodal' },
      { value: 'skewed',      label: 'Skewed (x³)' },
      { value: 'spike',       label: 'Spike + uniform' },
    ],
    value: params.parent,
    onChange: (v) => { params.parent = v; reset(); prefillParent(); },
  });
  const nS = slider({
    label: 'Sample size (n)', min: 1, max: 100, step: 1, value: params.n,
    onInput: (v) => { params.n = v; reset(); prefillParent(); },
  });
  const rateS = slider({
    label: 'Sample means / sec', min: 1, max: 200, step: 1, value: params.rate,
    onInput: (v) => { params.rate = v; },
  });
  const drawB = button({ label: 'Draw 100 means', primary: true, onClick: () => {
    for (let i = 0; i < 100; i++) drawSampleMean();
  } });
  const resetB = button({ label: 'Reset', onClick: () => { reset(); prefillParent(); } });

  ctrlPanel.append(parentSel.el, nS.el, rateS.el, row(drawB, resetB));

  // Lab — verify CLT: sample-mean SD should ~= parent SD / sqrt(n).
  const lab = labPanel({
    title: 'Central Limit Theorem lab — sample-mean variance scaling',
    filename: 'clt-lab.csv',
    columns: [
      { key: 'parent', label: 'parent' },
      { key: 'n',      label: 'sample size n' },
      { key: 'M',      label: 'num means recorded' },
      { key: 'mean',   label: 'mean of means', format: (v) => v.toFixed(4) },
      { key: 'sd',     label: 'SD of means',   format: (v) => v.toFixed(4) },
    ],
    procedure: [
      'Pick a non-normal parent (Bimodal). Set n = 1. Draw 200 means. Record.',
      'Set n = 5. Click "Draw 100 means". Record. Distribution narrows.',
      'Set n = 30. Distribution becomes nearly normal — that\'s the CLT.',
      'Verify: SD(sample means) = SD(parent) / √n. Doubling n quarters the variance.',
      'Try Skewed and Spike+uniform parents — same convergence to normal at large n.',
    ],
    predict: 'For a sample size n = 100 from a parent with σ = 1, what is the SD of the sample mean?',
    source: () => {
      let sum = 0;
      for (const v of means) sum += v;
      const m = means.length > 0 ? sum / means.length : 0;
      let v2 = 0;
      for (const v of means) v2 += (v - m) ** 2;
      const sd = means.length > 0 ? Math.sqrt(v2 / means.length) : 0;
      return {
        parent: params.parent,
        n: params.n,
        M: means.length,
        mean: m,
        sd,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  function probeChart(c, kind, sx, sy) {
    if (!c) return null;
    if (sx < c.x || sx > c.x + c.w || sy < c.y || sy > c.y + c.h) return null;
    const bins = 36;
    const idx = Math.min(bins - 1, Math.max(0, Math.floor(((sx - c.x) / c.w) * bins)));
    const counts = histogram(c.values, c.range, bins);
    const lo = c.range[0] + (idx / bins) * (c.range[1] - c.range[0]);
    const hi = c.range[0] + ((idx + 1) / bins) * (c.range[1] - c.range[0]);
    return {
      kind,
      x: c.x + (idx + 0.5) * (c.w / bins),
      y: sy,
      label: [`x ∈ [${lo.toFixed(3)}, ${hi.toFixed(3)})`, `count: ${counts[idx]} / ${c.values.length}`],
    };
  }
  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    return probeChart(charts.parent, 'parent', sx, sy)
        || probeChart(charts.means,  'means',  sx, sy);
  });

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); hover.destroy(); cv.destroy(); };
}
