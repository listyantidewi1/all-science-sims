import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

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
    n: 60,        // months
    trueBeta: 1.2,
    idiosyncraticVol: 0.04,
    marketVol: 0.05,
    rfMonthly: 0.003,
    marketPremium: 0.005,  // monthly market return − rf
  };

  let points = [];
  let lastECAPM = null; // latest CAPM expected return (annual) from draw(), read by the lab

  function regenerate() {
    points = [];
    for (let i = 0; i < params.n; i++) {
      const rm = gaussian() * params.marketVol + params.marketPremium + params.rfMonthly;
      const ri = params.rfMonthly + params.trueBeta * (rm - params.rfMonthly) + gaussian() * params.idiosyncraticVol;
      points.push({ rm, ri });
    }
  }
  regenerate();

  function regress() {
    const n = points.length;
    if (n === 0) return { beta: 0, alpha: 0, r2: 0 };
    let sm = 0, si = 0;
    for (const p of points) { sm += p.rm; si += p.ri; }
    const mm = sm / n, mi = si / n;
    let cov = 0, vm = 0, vi = 0;
    for (const p of points) {
      cov += (p.rm - mm) * (p.ri - mi);
      vm += (p.rm - mm) ** 2;
      vi += (p.ri - mi) ** 2;
    }
    const beta = vm > 0 ? cov / vm : 0;
    const alpha = mi - beta * mm;
    const r2 = (vm > 0 && vi > 0) ? (cov * cov) / (vm * vi) : 0;
    return { beta, alpha, r2 };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 60, padY = 30;
    const gW = W - padX - 30, gH = H - padY - 70;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(padX, padY, gW, gH);

    const ext = 0.20;
    const x2 = (rm) => padX + ((rm + ext) / (2 * ext)) * gW;
    const y2 = (ri) => padY + gH - ((ri + ext) / (2 * ext)) * gH;

    // axes
    ctx.strokeStyle = 'rgba(120,130,150,0.6)';
    ctx.beginPath();
    ctx.moveTo(padX, y2(0)); ctx.lineTo(padX + gW, y2(0));
    ctx.moveTo(x2(0), padY); ctx.lineTo(x2(0), padY + gH);
    ctx.stroke();

    // points
    for (const p of points) {
      ctx.fillStyle = '#0ea5e9';
      ctx.beginPath();
      ctx.arc(x2(p.rm), y2(p.ri), 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // regression line
    const reg = regress();
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(x2(-ext), y2(reg.alpha + reg.beta * (-ext)));
    ctx.lineTo(x2(ext), y2(reg.alpha + reg.beta * ext));
    ctx.stroke();

    // reference line slope=1
    ctx.strokeStyle = 'rgba(245,158,11,0.4)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(x2(-ext), y2(-ext)); ctx.lineTo(x2(ext), y2(ext));
    ctx.stroke();
    ctx.setLineDash([]);

    // info
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 360, 50);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`Regressed β = ${reg.beta.toFixed(3)}    α = ${(reg.alpha*100).toFixed(2)}%/mo`, 16, 28);
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`true β = ${params.trueBeta.toFixed(2)}   R² = ${reg.r2.toFixed(3)}`, 16, 46);

    // Expected return via CAPM at current beta
    const Erf = params.rfMonthly * 12;
    const Erm = (params.rfMonthly + params.marketPremium) * 12;
    const ECAPM = Erf + reg.beta * (Erm - Erf);
    lastECAPM = ECAPM;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, H - 30, 360, 22);
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`CAPM E[r] = rᶠ + β·(rᴹ−rᶠ) = ${(ECAPM*100).toFixed(2)}%/yr`, 16, H - 14);

    // axis labels
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('Market return r_m →', padX + gW - 130, padY + gH + 14);
    ctx.save(); ctx.translate(20, padY + gH / 2 + 50); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Stock return r_i', 0, 0); ctx.restore();
  }

  // controls
  const bS = slider({ label: 'True β', min: -1, max: 3, step: 0.05, value: params.trueBeta, format: (v) => v.toFixed(2),
    onInput: (v) => { params.trueBeta = v; regenerate(); } });
  const idS = slider({ label: 'Idiosyncratic σ', min: 0, max: 0.10, step: 0.001, value: params.idiosyncraticVol, format: (v) => v.toFixed(3),
    onInput: (v) => { params.idiosyncraticVol = v; regenerate(); } });
  const nS = slider({ label: 'Months observed', min: 6, max: 240, step: 1, value: params.n,
    onInput: (v) => { params.n = v; regenerate(); } });
  const reB = button({ label: 'Resample', primary: true, onClick: regenerate });

  ctrlPanel.append(bS.el, idS.el, nS.el, row(reB));

  // Lab — beta vs CAPM expected return (the Security Market Line).
  const lab = labPanel({
    title: 'CAPM lab — beta vs expected return',
    filename: 'capm-lab.csv',
    columns: [
      { key: 'trueBeta', label: 'true β',  format: (v) => v.toFixed(2) },
      { key: 'n',        label: 'months' },
      { key: 'beta',     label: 'β̂ (regressed)', format: (v) => v.toFixed(3) },
      { key: 'r2',       label: 'R²',      format: (v) => v.toFixed(3) },
      { key: 'eR',       label: 'CAPM E[r] (%/yr)', format: (v) => (v * 100).toFixed(2) },
    ],
    procedure: [
      'Set months = 60, idiosyncratic σ = 0.040. Set true β = 0.50 and record. Then 1.00, 1.50, 2.00, 3.00.',
      'Plot CAPM E[r] vs β̂. It should be a straight line (the Security Market Line). Read off its intercept and slope.',
      'Try β = 0 and β = −1. What does CAPM say a negative-beta asset should earn? Why would anyone hold it?',
      'Fix β = 1.20. Set months = 6, 12, 24, 60, 240, clicking Resample at each and recording. How far is β̂ from the true β?',
      'Raise idiosyncratic σ to 0.100 and repeat step 4. How does R² change?',
    ],
    predict: 'Doubling beta doubles the expected return — true or false?',
    source: () => {
      const reg = regress();
      return {
        trueBeta: params.trueBeta,
        n: params.n,
        beta: reg.beta,
        r2: reg.r2,
        eR: lastECAPM,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
