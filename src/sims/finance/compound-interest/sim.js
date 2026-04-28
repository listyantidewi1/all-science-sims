import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';
import { hoverProbe, drawCrosshair } from '../../../lib/chart.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    P: 1000,        // principal
    rate: 0.07,     // annual rate
    years: 30,
    monthly: 0,     // monthly contribution
    compoundsPerYear: 12,
  };

  function compute() {
    const months = params.years * 12;
    const rMonthly = params.rate / 12;
    let compoundBal = params.P;
    let simpleBal = params.P;
    const simpleHistory = [{ year: 0, value: simpleBal }];
    const compoundHistory = [{ year: 0, value: compoundBal }];
    const principalHistory = [{ year: 0, value: params.P }];
    let principalCum = params.P;
    for (let m = 1; m <= months; m++) {
      compoundBal = compoundBal * (1 + rMonthly) + params.monthly;
      principalCum += params.monthly;
      simpleBal = params.P + (params.P + principalCum - params.P) + params.P * params.rate * m / 12 + params.monthly * (m * (m + 1)) / 2 * rMonthly / m;
      // Simpler simple model: total = P + monthly contributions + simple interest on full timeline
      simpleBal = principalCum + params.P * params.rate * (m / 12) + (params.monthly * m * params.rate * (m / 12) / 2);
      const year = m / 12;
      if (m % 12 === 0 || m === months) {
        simpleHistory.push({ year, value: simpleBal });
        compoundHistory.push({ year, value: compoundBal });
        principalHistory.push({ year, value: principalCum });
      }
    }
    return { simpleHistory, compoundHistory, principalHistory, finalCompound: compoundBal, finalSimple: simpleBal, finalPrincipal: principalCum };
  }

  let chartRect = null;

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const r = compute();
    const padX = 60, padY = 50;
    const gW = W - padX - 30, gH = H - padY - 40;
    chartRect = { x: padX, y: padY, w: gW, h: gH, history: r.compoundHistory, simple: r.simpleHistory, principal: r.principalHistory, maxY: 0 };
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(padX, padY, gW, gH);

    const maxY = Math.max(r.finalCompound, r.finalSimple, r.finalPrincipal) * 1.05;
    const x2 = (yr) => padX + (yr / params.years) * gW;
    const y2 = (v) => padY + gH - (v / maxY) * gH;
    chartRect.maxY = maxY;

    // gridlines
    ctx.strokeStyle = 'rgba(120,130,150,0.15)';
    for (let yr = 0; yr <= params.years; yr += Math.max(1, Math.round(params.years / 10))) {
      ctx.beginPath(); ctx.moveTo(x2(yr), padY); ctx.lineTo(x2(yr), padY + gH); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`${yr}y`, x2(yr) - 8, padY + gH + 14);
    }

    function plot(data, color, lw = 2) {
      ctx.strokeStyle = color;
      ctx.lineWidth = lw;
      ctx.beginPath();
      for (let i = 0; i < data.length; i++) {
        const sx = x2(data[i].year), sy = y2(data[i].value);
        if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }

    // fill compound area
    ctx.fillStyle = 'rgba(234,179,8,0.18)';
    ctx.beginPath();
    ctx.moveTo(x2(0), y2(0));
    for (const p of r.compoundHistory) ctx.lineTo(x2(p.year), y2(p.value));
    ctx.lineTo(x2(params.years), y2(0));
    ctx.closePath();
    ctx.fill();

    plot(r.principalHistory, 'rgba(120,130,150,0.85)', 1.5);
    plot(r.simpleHistory, '#ec4899', 2);
    plot(r.compoundHistory, '#eab308', 3);

    // legend
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 76);
    const lines = [
      ['rgba(120,130,150,0.85)', `Principal contributed: $${r.finalPrincipal.toLocaleString(undefined, {maximumFractionDigits:0})}`],
      ['#ec4899',                  `Simple interest:        $${r.finalSimple.toLocaleString(undefined, {maximumFractionDigits:0})}`],
      ['#eab308',                  `Compound interest:    $${r.finalCompound.toLocaleString(undefined, {maximumFractionDigits:0})}`],
    ];
    let yy = 26;
    for (const [c, t] of lines) {
      ctx.fillStyle = c;
      ctx.fillRect(16, yy - 9, 12, 4);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px var(--font-mono)';
      ctx.fillText(t, 36, yy);
      yy += 18;
    }

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Compound interest grows exponentially; simple grows linearly.', 16, 80);

    const probe = hover.get();
    if (probe) {
      drawCrosshair(ctx, probe, {
        bounds: { x: padX, y: padY, w: gW, h: gH },
        color: '#fbbf24',
        label: probe.label,
      });
    }
  }

  function interp(history, year) {
    if (!history.length) return 0;
    if (year <= history[0].year) return history[0].value;
    if (year >= history[history.length - 1].year) return history[history.length - 1].value;
    for (let i = 1; i < history.length; i++) {
      if (history[i].year >= year) {
        const a = history[i - 1], b = history[i];
        const t = (year - a.year) / (b.year - a.year);
        return a.value + (b.value - a.value) * t;
      }
    }
    return 0;
  }

  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    if (!chartRect) return null;
    const { x, y, w, h, history, maxY } = chartRect;
    if (sx < x || sx > x + w || sy < y || sy > y + h) return null;
    const yr = ((sx - x) / w) * params.years;
    const cv_ = interp(history, yr);
    const sv = interp(chartRect.simple, yr);
    const pv = interp(chartRect.principal, yr);
    return {
      x: sx,
      y: y + h - (cv_ / maxY) * h,
      label: [
        `Year ${yr.toFixed(1)}`,
        `Compound: $${cv_.toLocaleString(undefined, {maximumFractionDigits:0})}`,
        `Simple:   $${sv.toLocaleString(undefined, {maximumFractionDigits:0})}`,
        `Contributed: $${pv.toLocaleString(undefined, {maximumFractionDigits:0})}`,
      ],
    };
  });

  // controls
  const PS = slider({ label: 'Starting principal $', min: 0, max: 100000, step: 100, value: params.P,
    onInput: (v) => { params.P = v; } });
  const rS = slider({ label: 'Annual rate', min: 0, max: 0.20, step: 0.001, value: params.rate, format: (v) => `${(v*100).toFixed(1)}%`,
    onInput: (v) => { params.rate = v; } });
  const yS = slider({ label: 'Years', min: 1, max: 50, step: 1, value: params.years,
    onInput: (v) => { params.years = v; } });
  const mS = slider({ label: 'Monthly contribution $', min: 0, max: 2000, step: 10, value: params.monthly,
    onInput: (v) => { params.monthly = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, p] of [['Conservative', { rate: 0.04 }], ['S&P avg', { rate: 0.08 }], ['Aggressive', { rate: 0.12 }]]) {
    const b = button({ label: name, onClick: () => { params.rate = p.rate; rS.value = p.rate; } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(PS.el, rS.el, yS.el, mS.el, presetRow);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); hover.destroy(); cv.destroy(); };
}
