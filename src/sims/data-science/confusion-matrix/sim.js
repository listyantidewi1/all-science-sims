import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

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
    threshold: 0.5,
    separation: 1.5,    // distance between class means
    sigma: 0.7,         // shared stddev (smaller = easier task)
    n: 400,
    posFraction: 0.5,
  };

  let pos = []; // class 1 (positive)
  let neg = []; // class 0 (negative)

  function regenerate() {
    pos = []; neg = [];
    const nPos = Math.round(params.n * params.posFraction);
    const nNeg = params.n - nPos;
    for (let i = 0; i < nPos; i++) pos.push(0.5 + params.separation / 2 + gaussian() * params.sigma);
    for (let i = 0; i < nNeg; i++) neg.push(0.5 - params.separation / 2 + gaussian() * params.sigma);
  }
  regenerate();

  function metrics(thr) {
    const TP = pos.filter((x) => x >= thr).length;
    const FN = pos.length - TP;
    const FP = neg.filter((x) => x >= thr).length;
    const TN = neg.length - FP;
    const TPR = TP / Math.max(1, pos.length);
    const FPR = FP / Math.max(1, neg.length);
    const precision = (TP + FP) > 0 ? TP / (TP + FP) : 0;
    const accuracy = (TP + TN) / (TP + TN + FP + FN);
    const f1 = (precision + TPR) > 0 ? 2 * precision * TPR / (precision + TPR) : 0;
    return { TP, FN, FP, TN, TPR, FPR, precision, accuracy, f1 };
  }

  function rocCurve() {
    const all = [];
    for (const x of pos) all.push({ x, label: 1 });
    for (const x of neg) all.push({ x, label: 0 });
    all.sort((a, b) => b.x - a.x);
    const points = [{ fpr: 0, tpr: 0 }];
    let TP = 0, FP = 0;
    for (const p of all) {
      if (p.label === 1) TP++; else FP++;
      points.push({ fpr: FP / Math.max(1, neg.length), tpr: TP / Math.max(1, pos.length) });
    }
    return points;
  }

  function auc() {
    const pts = rocCurve();
    let s = 0;
    for (let i = 1; i < pts.length; i++) {
      s += (pts[i].fpr - pts[i - 1].fpr) * (pts[i].tpr + pts[i - 1].tpr) / 2;
    }
    return s;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    const halfW = W / 2;

    // Histograms (left)
    drawHistograms(ctx, 30, 30, halfW - 60, H - 60);
    // ROC (right)
    drawROC(ctx, halfW + 30, 30, halfW - 60, H - 60);

    const m = metrics(params.threshold);
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 280, 56);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(`thr=${params.threshold.toFixed(2)}    AUC=${auc().toFixed(3)}`, 16, 26);
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`TP=${m.TP}  FN=${m.FN}  FP=${m.FP}  TN=${m.TN}`, 16, 42);
    ctx.fillText(`acc=${m.accuracy.toFixed(2)}  prec=${m.precision.toFixed(2)}  recall=${m.TPR.toFixed(2)}  F1=${m.f1.toFixed(2)}`, 16, 58);
  }

  function drawHistograms(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(x, y, w, h);
    const all = [...pos, ...neg];
    const min = Math.min(...all, -3), max = Math.max(...all, 4);
    const bins = 30;
    const binW = (max - min) / bins;
    const negCounts = new Array(bins).fill(0);
    const posCounts = new Array(bins).fill(0);
    for (const v of neg) negCounts[Math.min(bins - 1, Math.max(0, Math.floor((v - min) / binW)))]++;
    for (const v of pos) posCounts[Math.min(bins - 1, Math.max(0, Math.floor((v - min) / binW)))]++;
    const peak = Math.max(...negCounts, ...posCounts, 1);
    const px = (v) => x + ((v - min) / (max - min)) * w;
    const py = (c) => y + h - (c / peak) * (h - 16);
    for (let i = 0; i < bins; i++) {
      const xx = px(min + i * binW);
      const xx2 = px(min + (i + 1) * binW);
      ctx.fillStyle = 'rgba(59,130,246,0.6)';
      ctx.fillRect(xx, py(negCounts[i]), xx2 - xx - 1, h - (py(negCounts[i]) - y));
      ctx.fillStyle = 'rgba(239,68,68,0.55)';
      ctx.fillRect(xx, py(posCounts[i]), xx2 - xx - 1, h - (py(posCounts[i]) - y));
    }
    // threshold line
    const tx = px(params.threshold);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(tx, y); ctx.lineTo(tx, y + h);
    ctx.stroke();
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Negatives', x + 8, y + 14);
    ctx.fillStyle = 'rgba(239,68,68,0.85)';
    ctx.fillText('Positives', x + 80, y + 14);
  }

  function drawROC(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(x, y, w, h);
    // diagonal
    ctx.strokeStyle = 'rgba(120,130,150,0.5)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(x, y + h); ctx.lineTo(x + w, y);
    ctx.stroke();
    ctx.setLineDash([]);
    const pts = rocCurve();
    const x2 = (fpr) => x + fpr * w;
    const y2 = (tpr) => y + h - tpr * h;
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < pts.length; i++) {
      const sx = x2(pts[i].fpr), sy = y2(pts[i].tpr);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();
    // current point
    const m = metrics(params.threshold);
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(x2(m.FPR), y2(m.TPR), 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('FPR (false positive rate)', x + w / 2 - 70, y + h + 14);
    ctx.save(); ctx.translate(x - 8, y + h / 2 + 30); ctx.rotate(-Math.PI / 2);
    ctx.fillText('TPR (true positive rate)', 0, 0); ctx.restore();
  }

  // controls
  const thrS = slider({
    label: 'Threshold', min: -2, max: 4, step: 0.01, value: params.threshold, format: (v) => v.toFixed(2),
    onInput: (v) => { params.threshold = v; },
  });
  const sepS = slider({
    label: 'Class separation', min: 0, max: 4, step: 0.05, value: params.separation, format: (v) => v.toFixed(2),
    onInput: (v) => { params.separation = v; regenerate(); },
  });
  const sigS = slider({
    label: 'Class spread (σ)', min: 0.2, max: 2.0, step: 0.05, value: params.sigma, format: (v) => v.toFixed(2),
    onInput: (v) => { params.sigma = v; regenerate(); },
  });
  const fracS = slider({
    label: 'Positive fraction', min: 0.1, max: 0.9, step: 0.01, value: params.posFraction, format: (v) => v.toFixed(2),
    onInput: (v) => { params.posFraction = v; regenerate(); },
  });
  const reB = button({ label: 'Resample', primary: true, onClick: regenerate });

  ctrlPanel.append(thrS.el, sepS.el, sigS.el, fracS.el, row(reB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
