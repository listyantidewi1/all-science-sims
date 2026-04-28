import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  // Cash flows: index 0 = today (typically negative), 1..N = future inflows
  const params = {
    initial: -1000,
    annual: 300,
    years: 5,
    rate: 0.08,
  };

  function cashflows() {
    const cf = [params.initial];
    for (let i = 1; i <= params.years; i++) cf.push(params.annual);
    return cf;
  }
  function npv(cf, r) {
    let v = 0;
    for (let t = 0; t < cf.length; t++) v += cf[t] / Math.pow(1 + r, t);
    return v;
  }
  function irr(cf) {
    // bisection
    let lo = -0.99, hi = 5;
    let f = (r) => npv(cf, r);
    if (f(lo) * f(hi) > 0) return null;
    for (let i = 0; i < 80; i++) {
      const mid = (lo + hi) / 2;
      if (f(mid) === 0) return mid;
      if (f(lo) * f(mid) < 0) hi = mid; else lo = mid;
    }
    return (lo + hi) / 2;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const cf = cashflows();
    const halfW = W * 0.5;

    // Cash flow bars
    const padX = 30, padY = 50;
    const lW = halfW - padX - 30, lH = H - padY - 50;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(padX, padY, lW, lH);
    const maxAbs = Math.max(...cf.map(Math.abs));
    const cx = (i) => padX + (i + 0.5) * (lW / cf.length);
    const cy0 = padY + lH / 2;
    const cyV = (v) => cy0 - (v / maxAbs) * (lH / 2 - 20);
    const bw = lW / cf.length * 0.6;
    for (let i = 0; i < cf.length; i++) {
      const v = cf[i];
      const present = v / Math.pow(1 + params.rate, i);
      // raw cash flow
      ctx.fillStyle = v >= 0 ? 'rgba(16,185,129,0.5)' : 'rgba(239,68,68,0.5)';
      ctx.fillRect(cx(i) - bw / 2, Math.min(cy0, cyV(v)), bw, Math.abs(cyV(v) - cy0));
      // discounted (overlaid darker)
      ctx.fillStyle = present >= 0 ? '#10b981' : '#ef4444';
      ctx.fillRect(cx(i) - bw / 4, Math.min(cy0, cyV(present)), bw / 2, Math.abs(cyV(present) - cy0));
      ctx.fillStyle = 'rgba(120,130,150,0.85)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`t=${i}`, cx(i) - 10, padY + lH - 4);
    }
    // axis line
    ctx.strokeStyle = 'rgba(120,130,150,0.7)';
    ctx.beginPath(); ctx.moveTo(padX, cy0); ctx.lineTo(padX + lW, cy0); ctx.stroke();
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Cash flows: lighter = nominal, darker = discounted', padX, padY - 4);

    // NPV vs rate curve (right)
    const padX2 = halfW + 30, lW2 = W - padX2 - 30;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(padX2, padY, lW2, lH);
    const rMax = 0.5;
    const npv0 = npv(cf, 0);
    const yMin = -Math.abs(npv0) * 0.5;
    const yMax = Math.abs(npv0) * 1.05 + 1;
    const x2 = (r) => padX2 + (r / rMax) * lW2;
    const y2 = (v) => padY + lH - ((v - yMin) / (yMax - yMin)) * lH;
    // zero line
    ctx.strokeStyle = 'rgba(245,158,11,0.5)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(padX2, y2(0)); ctx.lineTo(padX2 + lW2, y2(0)); ctx.stroke();
    ctx.setLineDash([]);
    // curve
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const r = (i / 200) * rMax;
      const v = npv(cf, r);
      const sx = x2(r), sy = y2(v);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();
    // current rate
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(x2(params.rate), y2(npv(cf, params.rate)), 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('NPV vs discount rate', padX2 + 6, padY - 4);
    ctx.fillText('rate →', padX2 + lW2 - 50, padY + lH + 14);

    // info
    const r = irr(cf);
    const v = npv(cf, params.rate);
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 320, 36);
    ctx.fillStyle = v >= 0 ? '#10b981' : '#ef4444';
    ctx.font = 'bold 14px var(--font-mono)';
    ctx.fillText(`NPV = $${v.toFixed(2)}`, 16, 28);
    ctx.fillStyle = '#fff';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`IRR = ${r != null ? `${(r * 100).toFixed(2)}%` : '—'}`, 16, 44);
  }

  // controls
  const initS = slider({ label: 'Initial investment', min: -10000, max: 0, step: 100, value: params.initial,
    onInput: (v) => { params.initial = v; } });
  const annS = slider({ label: 'Annual cash inflow', min: 0, max: 5000, step: 50, value: params.annual,
    onInput: (v) => { params.annual = v; } });
  const yS = slider({ label: 'Project years', min: 1, max: 20, step: 1, value: params.years,
    onInput: (v) => { params.years = v; } });
  const rS = slider({ label: 'Discount rate', min: 0, max: 0.50, step: 0.005, value: params.rate, format: (v) => `${(v*100).toFixed(1)}%`,
    onInput: (v) => { params.rate = v; } });
  ctrlPanel.append(initS.el, annS.el, yS.el, rS.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
