import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const params = {
    muA: 0.06,    // bond-like
    sgA: 0.08,
    muB: 0.12,    // stock-like
    sgB: 0.20,
    rho: 0.2,
    weight: 0.5,  // weight on A
    rfRate: 0.02, // risk-free
  };

  function port(w) {
    const ret = w * params.muA + (1 - w) * params.muB;
    const v = w * w * params.sgA * params.sgA + (1 - w) * (1 - w) * params.sgB * params.sgB
      + 2 * w * (1 - w) * params.rho * params.sgA * params.sgB;
    return { ret, risk: Math.sqrt(Math.max(0, v)) };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 60, padY = 30;
    const gW = W - padX - 30, gH = H - padY - 50;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(padX, padY, gW, gH);

    // determine ranges
    const RISK_MAX = 0.30, RET_MIN = 0, RET_MAX = 0.18;
    const x2 = (r) => padX + (r / RISK_MAX) * gW;
    const y2 = (m) => padY + gH - ((m - RET_MIN) / (RET_MAX - RET_MIN)) * gH;

    // gridlines
    ctx.strokeStyle = 'rgba(120,130,150,0.15)';
    for (let i = 0; i <= 5; i++) {
      const r = (i / 5) * RISK_MAX;
      ctx.beginPath(); ctx.moveTo(x2(r), padY); ctx.lineTo(x2(r), padY + gH); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`${(r*100).toFixed(0)}%`, x2(r) - 8, padY + gH + 14);
    }
    for (let i = 0; i <= 6; i++) {
      const m = RET_MIN + (i / 6) * (RET_MAX - RET_MIN);
      ctx.beginPath(); ctx.moveTo(padX, y2(m)); ctx.lineTo(padX + gW, y2(m)); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.fillText(`${(m*100).toFixed(0)}%`, 18, y2(m) + 3);
    }

    // efficient frontier curve
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
      const w = i / 100;
      const p = port(w);
      const sx = x2(p.risk), sy = y2(p.ret);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // asset endpoints
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath(); ctx.arc(x2(params.sgA), y2(params.muA), 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText('A', x2(params.sgA) + 8, y2(params.muA) - 6);
    ctx.fillStyle = '#ec4899';
    ctx.beginPath(); ctx.arc(x2(params.sgB), y2(params.muB), 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.fillText('B', x2(params.sgB) + 8, y2(params.muB) - 6);

    // current portfolio
    const cur = port(params.weight);
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.arc(x2(cur.risk), y2(cur.ret), 8, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // capital market line via tangent (Sharpe maximizing)
    // Find weight that maximizes (ret - rf) / risk
    let best = { sharpe: -Infinity, w: 0, p: null };
    for (let i = 0; i <= 100; i++) {
      const w = i / 100;
      const p = port(w);
      const s = (p.ret - params.rfRate) / Math.max(p.risk, 1e-6);
      if (s > best.sharpe) { best = { sharpe: s, w, p }; }
    }
    if (best.p) {
      ctx.strokeStyle = 'rgba(16,185,129,0.6)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      const sx0 = x2(0), sy0 = y2(params.rfRate);
      ctx.moveTo(sx0, sy0);
      ctx.lineTo(x2(best.p.risk), y2(best.p.ret));
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#10b981';
      ctx.beginPath(); ctx.arc(x2(best.p.risk), y2(best.p.ret), 5, 0, Math.PI * 2); ctx.fill();
    }

    // axis labels
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText('Risk (σ) →', padX + gW - 70, padY + gH + 14);
    ctx.save(); ctx.translate(20, padY + gH / 2 + 30); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Return (μ)', 0, 0);
    ctx.restore();

    // info
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 320, 60);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`weight A: ${(params.weight*100).toFixed(0)}%   B: ${((1-params.weight)*100).toFixed(0)}%`, 16, 26);
    ctx.fillText(`return: ${(cur.ret*100).toFixed(2)}%   risk: ${(cur.risk*100).toFixed(2)}%`, 16, 44);
    ctx.fillStyle = '#10b981';
    ctx.fillText(`Sharpe-max: w_A=${(best.w*100).toFixed(0)}%`, 16, 62);
  }

  // controls
  const wS = slider({ label: 'Weight on A', min: 0, max: 1, step: 0.01, value: params.weight, format: (v) => `${(v*100).toFixed(0)}%`,
    onInput: (v) => { params.weight = v; } });
  const muAS = slider({ label: 'A return μ_A', min: -0.05, max: 0.20, step: 0.005, value: params.muA, format: (v) => `${(v*100).toFixed(1)}%`,
    onInput: (v) => { params.muA = v; } });
  const sgAS = slider({ label: 'A risk σ_A', min: 0, max: 0.40, step: 0.005, value: params.sgA, format: (v) => `${(v*100).toFixed(1)}%`,
    onInput: (v) => { params.sgA = v; } });
  const muBS = slider({ label: 'B return μ_B', min: -0.05, max: 0.30, step: 0.005, value: params.muB, format: (v) => `${(v*100).toFixed(1)}%`,
    onInput: (v) => { params.muB = v; } });
  const sgBS = slider({ label: 'B risk σ_B', min: 0, max: 0.50, step: 0.005, value: params.sgB, format: (v) => `${(v*100).toFixed(1)}%`,
    onInput: (v) => { params.sgB = v; } });
  const rhoS = slider({ label: 'Correlation ρ', min: -1, max: 1, step: 0.01, value: params.rho, format: (v) => v.toFixed(2),
    onInput: (v) => { params.rho = v; } });

  ctrlPanel.append(wS.el, muAS.el, sgAS.el, muBS.el, sgBS.el, rhoS.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
