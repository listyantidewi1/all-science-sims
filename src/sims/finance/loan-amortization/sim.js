import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    P: 300000,
    rate: 0.06,
    years: 30,
  };

  function compute() {
    const n = params.years * 12;
    const r = params.rate / 12;
    const M = r > 0 ? params.P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : params.P / n;
    const schedule = [];
    let bal = params.P;
    let totalInterest = 0;
    for (let i = 1; i <= n; i++) {
      const interest = bal * r;
      const principal = M - interest;
      bal -= principal;
      totalInterest += interest;
      if (i % 12 === 0 || i === n) {
        schedule.push({ year: i / 12, balance: Math.max(0, bal), interestThisYear: undefined });
      }
    }
    // monthly schedule for stacked area
    const monthly = [];
    let bal2 = params.P;
    for (let i = 1; i <= n; i++) {
      const interest = bal2 * r;
      const principal = M - interest;
      bal2 -= principal;
      monthly.push({ month: i, interest, principal, balance: Math.max(0, bal2) });
    }
    return { M, schedule, monthly, totalInterest, totalPaid: M * n };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const r = compute();
    const halfW = W * 0.5;

    // Stacked principal vs interest per month (left)
    const padX = 50, padY = 40;
    const lW = halfW - padX - 20, lH = H - padY - 40;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(padX, padY, lW, lH);

    const months = r.monthly.length;
    const M = r.M;
    const x2 = (m) => padX + (m / months) * lW;
    const y2 = (v) => padY + lH - (v / M) * lH;
    // bars per month: interest on top of principal
    for (let i = 0; i < months; i++) {
      const m = r.monthly[i];
      const x = x2(i);
      const w = lW / months;
      // principal (bottom)
      ctx.fillStyle = '#10b981';
      ctx.fillRect(x, y2(m.principal), Math.max(0.5, w + 0.5), y2(0) - y2(m.principal));
      // interest stacked on top
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(x, y2(m.principal + m.interest), Math.max(0.5, w + 0.5), y2(0) - y2(m.principal + m.interest) - (y2(0) - y2(m.principal)));
    }
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Each month: principal (green) + interest (red)', padX + 6, padY - 4);

    // Balance curve (right)
    const padX2 = halfW + 30, lW2 = W - padX2 - 20;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(padX2, padY, lW2, lH);
    const xR = (yr) => padX2 + (yr / params.years) * lW2;
    const yR = (v) => padY + lH - (v / params.P) * lH;
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(xR(0), yR(params.P));
    for (const s of r.schedule) ctx.lineTo(xR(s.year), yR(s.balance));
    ctx.stroke();
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.fillText('Outstanding balance', padX2 + 6, padY - 4);

    // info
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 320, 28);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`Monthly: $${M.toFixed(2)}    Total interest: $${r.totalInterest.toFixed(0)}    Total paid: $${r.totalPaid.toFixed(0)}`, 16, 28);
  }

  // controls
  const PS = slider({ label: 'Loan amount $', min: 1000, max: 1000000, step: 1000, value: params.P,
    onInput: (v) => { params.P = v; } });
  const rS = slider({ label: 'Annual rate', min: 0, max: 0.15, step: 0.001, value: params.rate, format: (v) => `${(v*100).toFixed(2)}%`,
    onInput: (v) => { params.rate = v; } });
  const yS = slider({ label: 'Term (years)', min: 1, max: 40, step: 1, value: params.years,
    onInput: (v) => { params.years = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, p] of [['15 yr', { years: 15 }], ['30 yr', { years: 30 }], ['Auto 5yr 7%', { years: 5, rate: 0.07, P: 25000 }]]) {
    const b = button({ label: name, onClick: () => {
      Object.assign(params, p);
      yS.value = params.years; rS.value = params.rate; PS.value = params.P;
    } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(PS.el, rS.el, yS.el, presetRow);

  // Lab — see how rate/duration affect monthly payment and total interest.
  const lab = labPanel({
    title: 'Loan amortization lab — monthly payment and total interest',
    filename: 'loan-amortization-lab.csv',
    columns: [
      { key: 'P',     label: 'principal',     format: (v) => v.toFixed(0) },
      { key: 'rate',  label: 'rate',          format: (v) => (v * 100).toFixed(2) + '%' },
      { key: 'years', label: 'years' },
      { key: 'M',     label: 'monthly pmt',   format: (v) => v.toFixed(2) },
      { key: 'totalP', label: 'total paid',    format: (v) => v.toFixed(0) },
      { key: 'totalI', label: 'total interest', format: (v) => v.toFixed(0) },
    ],
    procedure: [
      '$300k @ 6%, 30 years. Record. Monthly ~$1799; total interest ~$348k (more than principal!).',
      'Same loan, 15 years. Monthly jumps to ~$2531, but total interest drops to ~$155k.',
      'Same loan @ 4%, 30 years. Monthly ~$1432; total interest ~$216k.',
      'Comparison: a 1% rate cut on a $300k 30-yr saves over $60k in interest.',
      '15-year vs 30-year tradeoff: higher payment, much less total interest.',
    ],
    predict: 'A $200k loan at 5% for 30 years. What is the monthly payment? Total interest paid?',
    source: () => {
      const r = compute();
      return {
        P: params.P,
        rate: params.rate,
        years: params.years,
        M: r.M,
        totalP: r.M * params.years * 12,
        totalI: r.totalInterest,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
