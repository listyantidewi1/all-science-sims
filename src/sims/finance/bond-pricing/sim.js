import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { hoverProbe, drawCrosshair } from '../../../lib/chart.js';
import { dragHandle } from '../../../lib/handle.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  let priceChart = null;
  let curveChart = null;

  const params = {
    face: 1000,
    couponRate: 0.05,
    yield: 0.05,
    years: 10,
  };

  function bondPrice(yieldRate, years, couponRate, face) {
    const C = face * couponRate;
    let p = 0;
    for (let t = 1; t <= years; t++) p += C / Math.pow(1 + yieldRate, t);
    p += face / Math.pow(1 + yieldRate, years);
    return p;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const halfW = W * 0.5;

    // Left: price vs yield curve
    drawPriceVsYield(ctx, 30, 30, halfW - 60, H - 60);
    // Right: yield curve (price for 1..30 year maturities)
    drawYieldCurve(ctx, halfW + 30, 30, halfW - 60, H - 60);

    const price = bondPrice(params.yield, params.years, params.couponRate, params.face);
    const status = price > params.face ? 'Premium' : price < params.face ? 'Discount' : 'Par';
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 320, 44);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`Price: $${price.toFixed(2)}    (${status})`, 16, 28);
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`coupon ${(params.couponRate*100).toFixed(2)}%   yield ${(params.yield*100).toFixed(2)}%   ${params.years}y`, 16, 46);

    const probe = hover.get();
    if (probe) {
      const c = probe.kind === 'price' ? priceChart : curveChart;
      drawCrosshair(ctx, probe, { bounds: c, color: '#fbbf24', label: probe.label });
    }
  }

  function drawPriceVsYield(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(x, y, w, h);
    const yMin = 0, yMax = 0.20;
    const Pmax = bondPrice(0.001, params.years, params.couponRate, params.face) * 1.05;
    const Pmin = bondPrice(yMax, params.years, params.couponRate, params.face) * 0.9;
    const x2 = (yr) => x + (yr / yMax) * w;
    const y2 = (p) => y + h - ((p - Pmin) / (Pmax - Pmin)) * (h - 16) - 8;
    priceChart = { x, y, w, h, yMax, x2, y2 };

    // par line
    if (params.face > Pmin && params.face < Pmax) {
      ctx.strokeStyle = 'rgba(245,158,11,0.5)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(x, y2(params.face)); ctx.lineTo(x + w, y2(params.face));
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(245,158,11,0.85)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText('par $1000', x + w - 70, y2(params.face) - 4);
    }

    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const yr = (i / 200) * yMax;
      const p = bondPrice(Math.max(0.001, yr), params.years, params.couponRate, params.face);
      const sx = x2(yr), sy = y2(p);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // current point
    const yr = params.yield;
    const p = bondPrice(Math.max(0.001, yr), params.years, params.couponRate, params.face);
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.arc(x2(yr), y2(p), 6, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Price vs yield', x + 6, y - 4);
    ctx.fillText('yield →', x + w - 50, y + h + 14);
  }

  function drawYieldCurve(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(x, y, w, h);
    const Tmin = 1, Tmax = 30;
    const Pmin = 0, Pmax = 1500;
    const x2 = (t) => x + ((t - Tmin) / (Tmax - Tmin)) * w;
    const y2 = (p) => y + h - ((p - Pmin) / (Pmax - Pmin)) * (h - 16) - 8;
    curveChart = { x, y, w, h, Tmin, Tmax, x2, y2 };

    // bars: bond price for each maturity
    for (let t = Tmin; t <= Tmax; t++) {
      const p = bondPrice(params.yield, t, params.couponRate, params.face);
      const sx = x2(t), sy = y2(p);
      const bw = w / (Tmax - Tmin + 1);
      ctx.fillStyle = '#10b981';
      ctx.fillRect(sx - bw / 2 + 1, sy, bw - 2, y2(0) - sy);
    }

    ctx.strokeStyle = 'rgba(245,158,11,0.5)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(x, y2(params.face)); ctx.lineTo(x + w, y2(params.face));
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Price for 1–30 year maturities at current yield', x + 6, y - 4);
    ctx.fillText('maturity (years) →', x + w - 110, y + h + 14);
  }

  // controls
  const cS = slider({ label: 'Coupon rate', min: 0, max: 0.20, step: 0.001, value: params.couponRate, format: (v) => `${(v*100).toFixed(2)}%`,
    onInput: (v) => { params.couponRate = v; } });
  const yS = slider({ label: 'Market yield', min: 0.001, max: 0.20, step: 0.001, value: params.yield, format: (v) => `${(v*100).toFixed(2)}%`,
    onInput: (v) => { params.yield = v; } });
  const tS = slider({ label: 'Years to maturity', min: 1, max: 30, step: 1, value: params.years,
    onInput: (v) => { params.years = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, p] of [['Match', { yield: params.couponRate }], ['Zero coupon', { couponRate: 0 }], ['10% jump', { yield: 0.10 }]]) {
    const b = button({ label: name, onClick: () => {
      Object.assign(params, p);
      cS.value = params.couponRate; yS.value = params.yield;
    } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(cS.el, yS.el, tS.el, presetRow);

  function inRect(c, sx, sy) { return c && sx >= c.x && sx <= c.x + c.w && sy >= c.y && sy <= c.y + c.h; }
  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    if (inRect(priceChart, sx, sy)) {
      const yr = Math.max(0.001, Math.min(priceChart.yMax, ((sx - priceChart.x) / priceChart.w) * priceChart.yMax));
      const p = bondPrice(yr, params.years, params.couponRate, params.face);
      return {
        kind: 'price',
        x: priceChart.x2(yr), y: priceChart.y2(p),
        label: [`yield = ${(yr * 100).toFixed(2)}%`, `price = $${p.toFixed(2)}`],
      };
    }
    if (inRect(curveChart, sx, sy)) {
      const t = Math.max(curveChart.Tmin, Math.min(curveChart.Tmax,
        Math.round(curveChart.Tmin + ((sx - curveChart.x) / curveChart.w) * (curveChart.Tmax - curveChart.Tmin))));
      const p = bondPrice(params.yield, t, params.couponRate, params.face);
      return {
        kind: 'curve',
        x: curveChart.x2(t), y: curveChart.y2(p),
        label: [`maturity = ${t}y`, `price = $${p.toFixed(2)}`],
      };
    }
    return null;
  });
  // Drag horizontally on the price-vs-yield chart to set the yield directly.
  const drag = dragHandle(cv.canvas, {
    hitTest: (sx, sy) => inRect(priceChart, sx, sy) ? 'yield' : null,
    onDrag(_id, sx) {
      const yr = Math.max(0.001, Math.min(priceChart.yMax, ((sx - priceChart.x) / priceChart.w) * priceChart.yMax));
      params.yield = yr;
      yS.value = yr;
    },
    cursor: 'crosshair',
    hoverCursor: 'ew-resize',
  });

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); hover.destroy(); drag.destroy(); cv.destroy(); };
}
