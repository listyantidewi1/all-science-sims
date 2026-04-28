import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { hoverProbe, drawTooltip } from '../../../lib/chart.js';
import { dragHandle } from '../../../lib/handle.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  let plot = null; // { padX, padY, lW, lH, sigmaMax, muMax, x2, y2, s2x, m2y }

  const params = {
    rfRate: 0.03,
    funds: [
      { name: 'Bond fund',    mu: 0.05, sigma: 0.04, color: '#0ea5e9' },
      { name: 'Index fund',   mu: 0.10, sigma: 0.16, color: '#10b981' },
      { name: 'Hot stock',    mu: 0.18, sigma: 0.40, color: '#ec4899' },
    ],
  };

  function sharpeOf(f) {
    return (f.mu - params.rfRate) / Math.max(0.001, f.sigma);
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Bar chart of returns vs risk on left, Sharpe ranking on right
    const halfW = W * 0.55;
    const padX = 30, padY = 30;
    const lW = halfW - padX - 30, lH = H - padY - 60;

    // Risk-return scatter
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(padX, padY, lW, lH);
    const sigmaMax = 0.5, muMax = 0.25;
    const x2 = (s) => padX + (s / sigmaMax) * lW;
    const y2 = (m) => padY + lH - ((m - 0) / muMax) * lH;
    plot = {
      x: padX, y: padY, w: lW, h: lH, sigmaMax, muMax, x2, y2,
      s2sigma: (sx) => Math.max(0.01, Math.min(sigmaMax, ((sx - padX) / lW) * sigmaMax)),
      s2mu:    (sy) => Math.max(-0.05, Math.min(muMax, muMax - ((sy - padY) / lH) * muMax)),
    };

    // Capital allocation line (CAL): tangent line from rf intercept to highest-Sharpe fund
    let bestSharpe = -Infinity, bestFund = null;
    for (const f of params.funds) {
      const s = sharpeOf(f);
      if (s > bestSharpe) { bestSharpe = s; bestFund = f; }
    }
    if (bestFund) {
      ctx.strokeStyle = 'rgba(251,191,36,0.5)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(x2(0), y2(params.rfRate));
      ctx.lineTo(x2(bestFund.sigma * 1.3), y2(params.rfRate + bestSharpe * bestFund.sigma * 1.3));
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // funds
    for (const f of params.funds) {
      ctx.fillStyle = f.color;
      ctx.beginPath();
      ctx.arc(x2(f.sigma), y2(f.mu), 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px var(--font-sans)';
      ctx.fillText(f.name, x2(f.sigma) + 12, y2(f.mu) - 4);
    }
    // rf marker
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(x2(0), y2(params.rfRate), 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(251,191,36,0.85)';
    ctx.font = '10px var(--font-mono)';
    ctx.fillText(`rᶠ = ${(params.rfRate*100).toFixed(1)}%`, x2(0) + 8, y2(params.rfRate) + 12);

    // axes labels
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('Risk σ →', padX + lW - 60, padY + lH + 14);
    ctx.save(); ctx.translate(15, padY + lH / 2 + 30); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Return µ', 0, 0); ctx.restore();

    // Right panel: Sharpe ranking
    const rx = halfW + 30;
    const sorted = [...params.funds].sort((a, b) => sharpeOf(b) - sharpeOf(a));
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(rx, padY, W - rx - 30, lH);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-sans)';
    ctx.fillText('Ranking by Sharpe ratio', rx + 16, padY + 26);
    let yy = padY + 52;
    for (let i = 0; i < sorted.length; i++) {
      const f = sorted[i];
      const s = sharpeOf(f);
      ctx.fillStyle = f.color;
      ctx.beginPath();
      ctx.arc(rx + 24, yy, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = '12px var(--font-sans)';
      ctx.fillText(`#${i + 1}  ${f.name}`, rx + 40, yy + 4);
      ctx.fillStyle = s > 1 ? '#10b981' : s > 0 ? '#fbbf24' : '#ef4444';
      ctx.font = 'bold 13px var(--font-mono)';
      ctx.fillText(`Sharpe ${s.toFixed(3)}`, rx + 200, yy + 4);
      yy += 36;
      // breakdown
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`µ ${(f.mu*100).toFixed(1)}%   σ ${(f.sigma*100).toFixed(1)}%   excess ${((f.mu - params.rfRate)*100).toFixed(1)}%`, rx + 40, yy);
      yy += 24;
    }

    // Drag hint
    ctx.fillStyle = 'rgba(120,130,150,0.6)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag any fund dot to set its (σ, µ)', padX, H - 10);

    const probe = hover.get();
    if (probe) {
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(probe.x, probe.y, 12, 0, Math.PI * 2);
      ctx.stroke();
      drawTooltip(ctx, probe.label, probe.x + 14, probe.y - 14);
    }
  }

  // controls
  const rfS = slider({ label: 'Risk-free rate rᶠ', min: 0, max: 0.10, step: 0.001, value: params.rfRate, format: (v) => `${(v*100).toFixed(2)}%`,
    onInput: (v) => { params.rfRate = v; } });
  ctrlPanel.append(rfS.el);
  for (let i = 0; i < params.funds.length; i++) {
    const f = params.funds[i];
    const muS = slider({ label: `${f.name} return µ`, min: -0.05, max: 0.40, step: 0.005, value: f.mu, format: (v) => `${(v*100).toFixed(1)}%`,
      onInput: (v) => { f.mu = v; } });
    const sgS = slider({ label: `${f.name} risk σ`, min: 0.01, max: 0.60, step: 0.005, value: f.sigma, format: (v) => `${(v*100).toFixed(1)}%`,
      onInput: (v) => { f.sigma = v; } });
    ctrlPanel.append(muS.el, sgS.el);
  }

  function findFund(sx, sy) {
    if (!plot) return -1;
    for (let i = 0; i < params.funds.length; i++) {
      const f = params.funds[i];
      if (Math.hypot(sx - plot.x2(f.sigma), sy - plot.y2(f.mu)) < 14) return i;
    }
    return -1;
  }
  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    const i = findFund(sx, sy);
    if (i < 0) return null;
    const f = params.funds[i];
    return {
      x: plot.x2(f.sigma), y: plot.y2(f.mu),
      label: [f.name, `µ ${(f.mu * 100).toFixed(1)}%   σ ${(f.sigma * 100).toFixed(1)}%`, `Sharpe ${sharpeOf(f).toFixed(3)}`],
    };
  });
  const drag = dragHandle(cv.canvas, {
    hitTest: (sx, sy) => findFund(sx, sy),
    onDrag(idx, sx, sy) {
      const f = params.funds[idx];
      f.sigma = plot.s2sigma(sx);
      f.mu = plot.s2mu(sy);
    },
    cursor: 'crosshair',
    hoverCursor: 'grab',
  });

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); hover.destroy(); drag.destroy(); cv.destroy(); };
}
