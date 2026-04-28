import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

// Standard normal CDF using error function approximation
function normCDF(x) {
  // Abramowitz & Stegun approximation
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;
  const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x) / Math.sqrt(2);
  const t = 1 / (1 + p * x);
  const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return 0.5 * (1 + sign * y);
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    S: 100, K: 100, T: 1.0, r: 0.05, sigma: 0.25,
  };

  function bs(S, K, T, r, sig) {
    if (T <= 1e-9) {
      return { call: Math.max(S - K, 0), put: Math.max(K - S, 0), d1: 0, d2: 0 };
    }
    const d1 = (Math.log(S / K) + (r + 0.5 * sig * sig) * T) / (sig * Math.sqrt(T));
    const d2 = d1 - sig * Math.sqrt(T);
    const call = S * normCDF(d1) - K * Math.exp(-r * T) * normCDF(d2);
    const put = K * Math.exp(-r * T) * normCDF(-d2) - S * normCDF(-d1);
    return { call, put, d1, d2 };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Plot call and put price as a function of stock price S
    const padX = 60, padY = 30;
    const gW = W - padX - 30, gH = H - padY - 60;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(padX, padY, gW, gH);

    const Smin = 0, Smax = 2 * params.K;
    const x2 = (s) => padX + (s / Smax) * gW;
    const Pmax = Math.max(params.K * 1.2, bs(Smax, params.K, params.T, params.r, params.sigma).call * 1.1);
    const y2 = (p) => padY + gH - (p / Pmax) * gH;

    // gridlines
    ctx.strokeStyle = 'rgba(120,130,150,0.15)';
    for (let s = 0; s <= Smax; s += 25) {
      ctx.beginPath(); ctx.moveTo(x2(s), padY); ctx.lineTo(x2(s), padY + gH); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`$${s}`, x2(s) - 8, padY + gH + 14);
    }

    // Strike line
    ctx.strokeStyle = '#fbbf24';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(x2(params.K), padY); ctx.lineTo(x2(params.K), padY + gH);
    ctx.stroke();
    ctx.setLineDash([]);

    // Payoff at expiry (T=0): call = max(S-K, 0), put = max(K-S, 0)
    ctx.strokeStyle = 'rgba(14,165,233,0.5)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const S = (i / 200) * Smax;
      const v = Math.max(S - params.K, 0);
      const sx = x2(S), sy = y2(v);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();
    ctx.strokeStyle = 'rgba(236,72,153,0.5)';
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const S = (i / 200) * Smax;
      const v = Math.max(params.K - S, 0);
      const sx = x2(S), sy = y2(v);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Black-Scholes call price curve
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const S = (i / 200) * Smax;
      const v = bs(S, params.K, params.T, params.r, params.sigma).call;
      const sx = x2(S), sy = y2(v);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();
    // put
    ctx.strokeStyle = '#ec4899';
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const S = (i / 200) * Smax;
      const v = bs(S, params.K, params.T, params.r, params.sigma).put;
      const sx = x2(S), sy = y2(v);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // Current S marker
    const cur = bs(params.S, params.K, params.T, params.r, params.sigma);
    const cx = x2(params.S);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx, padY); ctx.lineTo(cx, padY + gH);
    ctx.stroke();
    ctx.fillStyle = '#0ea5e9';
    ctx.beginPath(); ctx.arc(cx, y2(cur.call), 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ec4899';
    ctx.beginPath(); ctx.arc(cx, y2(cur.put), 6, 0, Math.PI * 2); ctx.fill();

    // info
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 320, 60);
    ctx.fillStyle = '#0ea5e9';
    ctx.fillRect(16, 22 - 8, 12, 4);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`Call: $${cur.call.toFixed(3)}`, 36, 26);
    ctx.fillStyle = '#ec4899';
    ctx.fillRect(16, 44 - 8, 12, 4);
    ctx.fillStyle = '#fff';
    ctx.fillText(`Put:  $${cur.put.toFixed(3)}`, 36, 44);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`d₁=${cur.d1.toFixed(3)}  d₂=${cur.d2.toFixed(3)}`, 16, 62);

    // axis labels
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('Stock price S →', padX + gW - 100, padY + gH + 14);
  }

  // controls
  const SS = slider({ label: 'Stock price S', min: 0, max: 200, step: 1, value: params.S,
    onInput: (v) => { params.S = v; } });
  const KS = slider({ label: 'Strike K', min: 1, max: 200, step: 1, value: params.K,
    onInput: (v) => { params.K = v; } });
  const TS = slider({ label: 'Time T (years)', min: 0.01, max: 5, step: 0.01, value: params.T, format: (v) => v.toFixed(2),
    onInput: (v) => { params.T = v; } });
  const rS = slider({ label: 'Risk-free r', min: 0, max: 0.15, step: 0.001, value: params.r, format: (v) => `${(v*100).toFixed(2)}%`,
    onInput: (v) => { params.r = v; } });
  const sgS = slider({ label: 'Volatility σ', min: 0.05, max: 1.0, step: 0.005, value: params.sigma, format: (v) => `${(v*100).toFixed(1)}%`,
    onInput: (v) => { params.sigma = v; } });

  ctrlPanel.append(SS.el, KS.el, TS.el, rS.el, sgS.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
