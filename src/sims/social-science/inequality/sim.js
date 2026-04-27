import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';

function pareto(n, alpha = 1.5) {
  return Array.from({ length: n }, () => Math.pow(1 - Math.random(), -1 / alpha));
}
function exponential(n, lam = 1) {
  return Array.from({ length: n }, () => -Math.log(1 - Math.random()) / lam);
}
function uniform(n) {
  return Array.from({ length: n }, () => Math.random() * 100);
}
function bimodal(n) {
  return Array.from({ length: n }, () => Math.random() < 0.7 ? 20 + Math.random() * 30 : 200 + Math.random() * 200);
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { dist: 'pareto', n: 100, alpha: 1.5 };
  let incomes = [];

  function regenerate() {
    if (params.dist === 'uniform') incomes = uniform(params.n);
    else if (params.dist === 'exponential') incomes = exponential(params.n);
    else if (params.dist === 'pareto') incomes = pareto(params.n, params.alpha);
    else if (params.dist === 'bimodal') incomes = bimodal(params.n);
    incomes.sort((a, b) => a - b);
  }
  regenerate();

  function gini() {
    const n = incomes.length;
    const total = incomes.reduce((s, v) => s + v, 0);
    if (total === 0) return 0;
    let cum = 0;
    let area = 0;
    for (let i = 0; i < n; i++) {
      cum += incomes[i];
      area += cum / total;
    }
    // Trapezoidal: area under Lorenz curve
    return 1 - 2 * (area / n - 0.5 / n);
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    const halfW = W / 2;

    // left: income bar chart (sorted)
    drawBars(ctx, 30, 30, halfW - 60, H - 60);
    // right: Lorenz curve
    drawLorenz(ctx, halfW + 30, 30, halfW - 60, H - 60);

    const G = gini();
    const total = incomes.reduce((s, v) => s + v, 0);
    const top10 = incomes.slice(-Math.ceil(params.n * 0.1)).reduce((s, v) => s + v, 0);
    const bot50 = incomes.slice(0, Math.ceil(params.n * 0.5)).reduce((s, v) => s + v, 0);

    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 280, 56);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px var(--font-sans)';
    ctx.fillText(`Gini = ${G.toFixed(3)}`, 16, 30);
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`Top 10% own ${(top10/total*100).toFixed(1)}%`, 16, 46);
    ctx.fillText(`Bottom 50% own ${(bot50/total*100).toFixed(1)}%`, 16, 60);
  }

  function drawBars(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(x, y, w, h);
    if (incomes.length === 0) return;
    const max = Math.max(...incomes, 1);
    const bw = w / incomes.length;
    for (let i = 0; i < incomes.length; i++) {
      const bh = (incomes[i] / max) * (h - 16);
      ctx.fillStyle = `hsl(${260 - 200 * (i / incomes.length)}, 70%, 50%)`;
      ctx.fillRect(x + i * bw, y + h - bh, Math.max(0.5, bw - 0.5), bh);
    }
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Sorted incomes (poor → rich)', x + 6, y - 4);
  }

  function drawLorenz(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(x, y, w, h);
    // equality diagonal
    ctx.strokeStyle = 'rgba(120,130,150,0.5)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(x, y + h); ctx.lineTo(x + w, y);
    ctx.stroke();
    ctx.setLineDash([]);

    if (incomes.length === 0) return;
    const total = incomes.reduce((s, v) => s + v, 0);
    if (total === 0) return;

    // Lorenz curve
    const px = (frac) => x + frac * w;
    const py = (frac) => y + h - frac * h;
    let cum = 0;
    ctx.fillStyle = 'rgba(239,68,68,0.18)';
    ctx.beginPath();
    ctx.moveTo(px(0), py(0));
    ctx.lineTo(px(1), py(0));
    for (let i = incomes.length - 1; i >= 0; i--) {
      cum += incomes[i];
      ctx.lineTo(px((incomes.length - i) / incomes.length), py(cum / total));
    }
    ctx.closePath();
    ctx.fill();

    // recompute curve forward for stroke
    cum = 0;
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(px(0), py(0));
    for (let i = 0; i < incomes.length; i++) {
      cum += incomes[i];
      ctx.lineTo(px((i + 1) / incomes.length), py(cum / total));
    }
    ctx.stroke();

    // axis labels
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Cumulative population →', x + w - 130, y + h + 14);
    ctx.save(); ctx.translate(x - 8, y + h - 30); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Cumulative income', 0, 0); ctx.restore();
  }

  // controls
  const distSel = select({
    label: 'Income distribution',
    options: [
      { value: 'uniform', label: 'Uniform' },
      { value: 'exponential', label: 'Exponential' },
      { value: 'pareto', label: 'Pareto (power law)' },
      { value: 'bimodal', label: 'Two classes' },
    ],
    value: params.dist,
    onChange: (v) => { params.dist = v; regenerate(); },
  });
  const nS = slider({
    label: 'Population size', min: 20, max: 500, step: 10, value: params.n,
    onInput: (v) => { params.n = v; regenerate(); },
  });
  const aS = slider({
    label: 'Pareto α (lower = more unequal)', min: 1.05, max: 3.0, step: 0.05, value: params.alpha, format: (v) => v.toFixed(2),
    onInput: (v) => { params.alpha = v; if (params.dist === 'pareto') regenerate(); },
  });
  const reB = button({ label: 'Resample', primary: true, onClick: regenerate });

  ctrlPanel.append(distSel.el, nS.el, aS.el, row(reB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
