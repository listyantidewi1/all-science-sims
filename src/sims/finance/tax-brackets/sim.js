import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';

// Brackets: array of {limit, rate} where the rate applies up to limit
const SCHEDULES = {
  us2024single: {
    name: 'US 2024 (single filer)',
    currency: '$',
    brackets: [
      { limit: 11600, rate: 0.10 },
      { limit: 47150, rate: 0.12 },
      { limit: 100525, rate: 0.22 },
      { limit: 191950, rate: 0.24 },
      { limit: 243725, rate: 0.32 },
      { limit: 609350, rate: 0.35 },
      { limit: Infinity, rate: 0.37 },
    ],
  },
  id2024: {
    name: 'Indonesia 2024',
    currency: 'Rp ',
    brackets: [
      { limit: 60000000, rate: 0.05 },
      { limit: 250000000, rate: 0.15 },
      { limit: 500000000, rate: 0.25 },
      { limit: 5000000000, rate: 0.30 },
      { limit: Infinity, rate: 0.35 },
    ],
  },
  flat20: {
    name: 'Flat 20%',
    currency: '$',
    brackets: [{ limit: Infinity, rate: 0.20 }],
  },
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { schedule: 'us2024single', income: 80000 };

  function calcTax(income) {
    const sched = SCHEDULES[params.schedule].brackets;
    let tax = 0;
    let lower = 0;
    for (const b of sched) {
      const slice = Math.max(0, Math.min(income, b.limit) - lower);
      tax += slice * b.rate;
      lower = b.limit;
      if (income <= b.limit) break;
    }
    return tax;
  }
  function marginalRate(income) {
    const sched = SCHEDULES[params.schedule].brackets;
    for (const b of sched) {
      if (income <= b.limit) return b.rate;
    }
    return sched[sched.length - 1].rate;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const sched = SCHEDULES[params.schedule];

    // Bracket strip
    const padX = 60, padY = 60;
    const gW = W - padX - 30;
    const stripH = 50;
    const incomeMax = sched.brackets[sched.brackets.length - 1].limit === Infinity
      ? Math.max(params.income * 1.5, sched.brackets[sched.brackets.length - 2]?.limit * 1.5 || 250000)
      : sched.brackets[sched.brackets.length - 1].limit;
    const x2 = (v) => padX + (v / incomeMax) * gW;

    // bracket slices coloring
    let lower = 0;
    const colors = ['#10b981', '#22c55e', '#84cc16', '#eab308', '#f59e0b', '#f97316', '#ef4444', '#dc2626'];
    for (let i = 0; i < sched.brackets.length; i++) {
      const b = sched.brackets[i];
      const upper = b.limit === Infinity ? incomeMax : b.limit;
      ctx.fillStyle = colors[i % colors.length] + '88';
      ctx.fillRect(x2(lower), padY, x2(upper) - x2(lower), stripH);
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.strokeRect(x2(lower), padY, x2(upper) - x2(lower), stripH);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px var(--font-mono)';
      ctx.fillText(`${(b.rate * 100).toFixed(0)}%`, x2(lower) + 4, padY + 18);
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(b.limit === Infinity ? '∞' : `${sched.currency}${(b.limit / 1000).toFixed(0)}k`,
        x2(lower) + 4, padY + 36);
      lower = upper;
    }

    // income marker
    const incomeX = x2(params.income);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(incomeX, padY - 8); ctx.lineTo(incomeX, padY + stripH + 8);
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px var(--font-mono)';
    ctx.fillText(`${sched.currency}${params.income.toLocaleString()}`, incomeX + 4, padY - 12);

    // Tax breakdown
    const tax = calcTax(params.income);
    const effective = tax / Math.max(1, params.income);
    const marg = marginalRate(params.income);

    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 380, 36);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(sched.name, 16, 28);

    // Bar chart of dollars per bracket
    const padY2 = padY + stripH + 60;
    const gH = H - padY2 - 30;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(padX, padY2, gW, gH);

    const slices = [];
    let lo = 0;
    for (let i = 0; i < sched.brackets.length; i++) {
      const b = sched.brackets[i];
      const slice = Math.max(0, Math.min(params.income, b.limit) - lo);
      slices.push({ rate: b.rate, slice, color: colors[i % colors.length] });
      lo = b.limit;
      if (params.income <= b.limit) break;
    }
    const totalSlice = slices.reduce((s, v) => s + v.slice, 0);
    let xx = padX;
    for (const s of slices) {
      const w = (s.slice / Math.max(1, totalSlice)) * gW;
      const taxPart = s.slice * s.rate;
      const totalH = gH - 16;
      const taxH = (taxPart / s.slice) * totalH;
      // total bar (income slice)
      ctx.fillStyle = s.color + '44';
      ctx.fillRect(xx, padY2 + 8, w, totalH);
      ctx.fillStyle = s.color;
      ctx.fillRect(xx, padY2 + 8 + (totalH - taxH), w, taxH);
      ctx.fillStyle = '#fff';
      ctx.font = '10px var(--font-mono)';
      if (w > 60) {
        ctx.fillText(`${sched.currency}${s.slice.toLocaleString()}`, xx + 4, padY2 + 22);
        ctx.fillText(`tax ${sched.currency}${taxPart.toFixed(0)}`, xx + 4, padY2 + 38);
      }
      xx += w;
    }
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Income broken into bracket slices; the colored portion is tax', padX, padY2 - 6);

    // Bottom totals
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, H - 32, 480, 24);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`Total tax: ${sched.currency}${tax.toFixed(0)}    Effective: ${(effective*100).toFixed(2)}%    Marginal: ${(marg*100).toFixed(0)}%    Take-home: ${sched.currency}${(params.income - tax).toFixed(0)}`, 16, H - 14);
  }

  // controls
  const schedSel = select({
    label: 'Tax schedule',
    options: Object.entries(SCHEDULES).map(([k, v]) => ({ value: k, label: v.name })),
    value: params.schedule,
    onChange: (v) => { params.schedule = v; },
  });
  const incS = slider({ label: 'Income', min: 0, max: 1000000, step: 1000, value: params.income,
    onInput: (v) => { params.income = v; } });
  ctrlPanel.append(schedSel.el, incS.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
