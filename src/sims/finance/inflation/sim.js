import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    inflation: 0.03,    // annual π
    nominalRate: 0.05,  // savings yield
    years: 30,
    initial: 1000,
  };

  function realValueOf(nominalAmount, year) {
    return nominalAmount / Math.pow(1 + params.inflation, year);
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 60, padY = 40;
    const gW = W - padX - 30, gH = H - padY - 50;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(padX, padY, gW, gH);

    // Compute nominal balance and real value over years
    const series = [];
    for (let y = 0; y <= params.years; y++) {
      const nominal = params.initial * Math.pow(1 + params.nominalRate, y);
      const real = realValueOf(nominal, y);
      const purchasingPower = realValueOf(params.initial, y);
      series.push({ y, nominal, real, purchasingPower });
    }
    const max = Math.max(...series.map((s) => s.nominal));

    const x2 = (yr) => padX + (yr / params.years) * gW;
    const y2 = (v) => padY + gH - (v / max) * gH;

    // gridlines
    ctx.strokeStyle = 'rgba(120,130,150,0.15)';
    for (let yr = 0; yr <= params.years; yr += Math.max(1, Math.round(params.years / 10))) {
      ctx.beginPath(); ctx.moveTo(x2(yr), padY); ctx.lineTo(x2(yr), padY + gH); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`${yr}y`, x2(yr) - 8, padY + gH + 14);
    }

    function plot(key, color, lw = 2) {
      ctx.strokeStyle = color;
      ctx.lineWidth = lw;
      ctx.beginPath();
      for (let i = 0; i < series.length; i++) {
        const s = series[i];
        const sx = x2(s.y), sy = y2(s[key]);
        if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }
    plot('nominal', '#0ea5e9', 2.5);
    plot('real', '#10b981', 2);
    plot('purchasingPower', '#ef4444', 2);

    // info
    const last = series[series.length - 1];
    const realReturn = (1 + params.nominalRate) / (1 + params.inflation) - 1;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 360, 92);
    ctx.fillStyle = '#0ea5e9';
    ctx.fillRect(16, 22 - 6, 12, 4);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`Nominal account:    $${last.nominal.toFixed(0)}`, 36, 26);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(16, 44 - 6, 12, 4);
    ctx.fillStyle = '#fff';
    ctx.fillText(`Real (today's $):   $${last.real.toFixed(0)}`, 36, 44);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(16, 62 - 6, 12, 4);
    ctx.fillStyle = '#fff';
    ctx.fillText(`Purchasing power of $${params.initial}: $${last.purchasingPower.toFixed(0)}`, 36, 62);
    ctx.fillStyle = realReturn >= 0 ? '#10b981' : '#ef4444';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`Real return: ${(realReturn*100).toFixed(2)}% / yr`, 16, 88);
  }

  // controls
  const piS = slider({ label: 'Annual inflation π', min: -0.05, max: 0.50, step: 0.005, value: params.inflation, format: (v) => `${(v*100).toFixed(1)}%`,
    onInput: (v) => { params.inflation = v; } });
  const rS = slider({ label: 'Nominal savings rate r', min: 0, max: 0.20, step: 0.005, value: params.nominalRate, format: (v) => `${(v*100).toFixed(1)}%`,
    onInput: (v) => { params.nominalRate = v; } });
  const yS = slider({ label: 'Years', min: 1, max: 50, step: 1, value: params.years,
    onInput: (v) => { params.years = v; } });
  const initS = slider({ label: 'Starting nominal $', min: 100, max: 100000, step: 100, value: params.initial,
    onInput: (v) => { params.initial = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, p] of [['Low (2%)', { inflation: 0.02 }], ['Average (3%)', { inflation: 0.03 }], ['High (10%)', { inflation: 0.10 }], ['Hyper (100%)', { inflation: 1.0 }]]) {
    const b = button({ label: name, onClick: () => { params.inflation = p.inflation; piS.value = p.inflation; } });
    presetRow.appendChild(b.el);
  }

  ctrlPanel.append(piS.el, rS.el, yS.el, initS.el, presetRow);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
