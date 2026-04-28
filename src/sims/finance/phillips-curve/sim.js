import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

// Modern expectations-augmented Phillips curve:
//   π = πᵉ − a (u − u_n)
// where u_n is natural rate, a is slope.

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const params = {
    naturalRate: 0.05,    // u_n = 5%
    slope: 1.5,           // a
    expectedInflation: 0.02, // πᵉ
    unemployment: 0.05,   // current u
  };

  function inflation(u) {
    return params.expectedInflation - params.slope * (u - params.naturalRate);
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

    const Umin = 0, Umax = 0.15;
    const Pmin = -0.05, Pmax = 0.15;
    const x2 = (u) => padX + ((u - Umin) / (Umax - Umin)) * gW;
    const y2 = (p) => padY + gH - ((p - Pmin) / (Pmax - Pmin)) * gH;

    // gridlines
    ctx.strokeStyle = 'rgba(120,130,150,0.15)';
    for (let u = 0; u <= 0.15; u += 0.025) {
      ctx.beginPath(); ctx.moveTo(x2(u), padY); ctx.lineTo(x2(u), padY + gH); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`${(u*100).toFixed(0)}%`, x2(u) - 8, padY + gH + 14);
    }
    for (let p = -0.05; p <= 0.15; p += 0.025) {
      ctx.beginPath(); ctx.moveTo(padX, y2(p)); ctx.lineTo(padX + gW, y2(p)); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.fillText(`${(p*100).toFixed(0)}%`, 18, y2(p) + 3);
    }

    // zero inflation line
    ctx.strokeStyle = 'rgba(245,158,11,0.4)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(padX, y2(0)); ctx.lineTo(padX + gW, y2(0));
    ctx.stroke();

    // natural rate vertical
    ctx.strokeStyle = 'rgba(245,158,11,0.6)';
    ctx.beginPath();
    ctx.moveTo(x2(params.naturalRate), padY); ctx.lineTo(x2(params.naturalRate), padY + gH);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(245,158,11,0.85)';
    ctx.font = '10px var(--font-mono)';
    ctx.fillText(`u_n = ${(params.naturalRate*100).toFixed(1)}%`, x2(params.naturalRate) + 4, padY + 14);

    // Curve
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const u = Umin + (i / 200) * (Umax - Umin);
      const p = inflation(u);
      const sx = x2(u), sy = y2(p);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // current operating point
    const cur = inflation(params.unemployment);
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(x2(params.unemployment), y2(cur), 7, 0, Math.PI * 2);
    ctx.fill();

    // axes labels
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('Unemployment u →', padX + gW - 130, padY + gH + 14);
    ctx.save(); ctx.translate(20, padY + gH / 2 + 30); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Inflation π', 0, 0); ctx.restore();

    // info
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 320, 60);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`u = ${(params.unemployment*100).toFixed(2)}%   π = ${(cur*100).toFixed(2)}%`, 16, 26);
    ctx.fillText(`expected πᵉ = ${(params.expectedInflation*100).toFixed(2)}%`, 16, 44);
    if (Math.abs(cur - params.expectedInflation) < 0.001) {
      ctx.fillStyle = '#10b981';
      ctx.fillText(`At natural rate (no surprise inflation)`, 16, 62);
    }
  }

  // controls
  const uS = slider({ label: 'Current unemployment u', min: 0, max: 0.15, step: 0.001, value: params.unemployment, format: (v) => `${(v*100).toFixed(2)}%`,
    onInput: (v) => { params.unemployment = v; } });
  const piES = slider({ label: 'Expected inflation πᵉ', min: -0.02, max: 0.10, step: 0.001, value: params.expectedInflation, format: (v) => `${(v*100).toFixed(2)}%`,
    onInput: (v) => { params.expectedInflation = v; } });
  const unS = slider({ label: 'Natural rate u_n', min: 0.02, max: 0.10, step: 0.001, value: params.naturalRate, format: (v) => `${(v*100).toFixed(2)}%`,
    onInput: (v) => { params.naturalRate = v; } });
  const aS = slider({ label: 'Slope a', min: 0.5, max: 5, step: 0.05, value: params.slope, format: (v) => v.toFixed(2),
    onInput: (v) => { params.slope = v; } });
  ctrlPanel.append(uS.el, piES.el, unS.el, aS.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
