import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    n: 5,
    rounds: 1000,
    strategy: 'optimal',  // 'optimal' (shade by (n-1)/n in 1st price) or 'truthful' or 'random'
  };

  let firstPriceRev = [];
  let secondPriceRev = [];

  function bid(strategy, value, n) {
    if (strategy === 'truthful') return value;
    if (strategy === 'random') return value * Math.random();
    // optimal symmetric Bayesian: shade by (n-1)/n in first-price with uniform [0,1]
    return value * (n - 1) / n;
  }

  function simulate() {
    firstPriceRev = [];
    secondPriceRev = [];
    for (let r = 0; r < params.rounds; r++) {
      const values = Array.from({ length: params.n }, () => Math.random());
      // first-price: each bidder bids per strategy; winner pays own bid
      const bids = values.map((v) => bid(params.strategy, v, params.n));
      const fpWinner = bids.indexOf(Math.max(...bids));
      const fpRev = bids[fpWinner];
      firstPriceRev.push(fpRev);
      // second-price: bidders bid truthfully (dominant); winner pays second-highest
      const truthBids = [...values].sort((a, b) => b - a);
      const spRev = truthBids[1] || 0;
      secondPriceRev.push(spRev);
    }
  }
  simulate();

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Histograms side by side
    function drawHist(values, x, y, w, h, color, title) {
      ctx.strokeStyle = 'rgba(120,130,150,0.4)';
      ctx.strokeRect(x, y, w, h);
      const bins = 30;
      const counts = new Array(bins).fill(0);
      for (const v of values) {
        const idx = Math.min(bins - 1, Math.max(0, Math.floor(v * bins)));
        counts[idx]++;
      }
      const peak = Math.max(...counts, 1);
      const bw = w / bins;
      for (let i = 0; i < bins; i++) {
        const bh = (counts[i] / peak) * (h - 16);
        ctx.fillStyle = color;
        ctx.fillRect(x + i * bw + 1, y + h - bh, bw - 1, bh);
      }
      const mean = values.reduce((s, v) => s + v, 0) / values.length;
      ctx.fillStyle = 'rgba(120,130,150,0.85)';
      ctx.font = 'bold 13px var(--font-sans)';
      ctx.fillText(title, x + 6, y - 4);
      ctx.font = '11px var(--font-mono)';
      ctx.fillText(`mean revenue ${mean.toFixed(3)}`, x + 6, y + 14);
    }
    const halfW = W * 0.5;
    drawHist(firstPriceRev, 30, 50, halfW - 60, H - 80, '#0ea5e9', 'First-price auction revenue');
    drawHist(secondPriceRev, halfW + 30, 50, halfW - 60, H - 80, '#10b981', 'Second-price (Vickrey) revenue');

    const fpMean = firstPriceRev.reduce((s, v) => s + v, 0) / firstPriceRev.length;
    const spMean = secondPriceRev.reduce((s, v) => s + v, 0) / secondPriceRev.length;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 320, 28);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`n=${params.n}    Δ revenue = ${(fpMean - spMean).toFixed(3)}`, 16, 28);
  }

  // controls
  const nS = slider({ label: 'Bidders n', min: 2, max: 20, step: 1, value: params.n,
    onInput: (v) => { params.n = v; simulate(); } });
  const rS = slider({ label: 'Rounds', min: 100, max: 5000, step: 100, value: params.rounds,
    onInput: (v) => { params.rounds = v; simulate(); } });
  const sSel = select({
    label: 'First-price strategy',
    options: [
      { value: 'optimal', label: 'Shade by (n−1)/n (optimal)' },
      { value: 'truthful', label: 'Bid truth (suboptimal)' },
      { value: 'random', label: 'Random shading' },
    ],
    value: params.strategy,
    onChange: (v) => { params.strategy = v; simulate(); },
  });
  const reB = button({ label: 'Re-run', primary: true, onClick: simulate });
  ctrlPanel.append(nS.el, rS.el, sSel.el, row(reB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
