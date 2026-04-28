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
    HA: 0.10,    // M (weak acid)
    A: 0.10,     // M (conjugate base)
    pKa: 4.75,   // acetic acid
    addedAcid: 0,    // M strong acid added (HCl)
    addedBase: 0,    // M strong base added (NaOH)
  };

  function effectiveHA() { return Math.max(1e-6, params.HA + params.addedAcid - params.addedBase); }
  function effectiveA()  { return Math.max(1e-6, params.A - params.addedAcid + params.addedBase); }
  function pH() {
    return params.pKa + Math.log10(effectiveA() / effectiveHA());
  }

  function pHColor(pH) {
    // Universal indicator-ish gradient
    if (pH < 3) return '#d92c2c';
    if (pH < 5) return '#e6a52d';
    if (pH < 6.5) return '#e6c92a';
    if (pH < 7.5) return '#7ed957';
    if (pH < 9) return '#2d8ce0';
    if (pH < 11) return '#2a3aa8';
    return '#5a2a8c';
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const halfW = W * 0.42;

    // Beaker on the left
    const bx = 60, by = 60, bw = halfW - 100, bh = H - 130;
    ctx.strokeStyle = 'rgba(120,130,150,0.7)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(bx, by); ctx.lineTo(bx, by + bh); ctx.lineTo(bx + bw, by + bh); ctx.lineTo(bx + bw, by);
    ctx.stroke();
    const ph = pH();
    ctx.fillStyle = pHColor(ph) + 'aa';
    ctx.fillRect(bx + 1, by + 30, bw - 2, bh - 32);

    // pH readout big
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(bx + 10, by + 50, bw - 20, 40);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 22px var(--font-mono)';
    ctx.fillText(`pH = ${ph.toFixed(2)}`, bx + 20, by + 80);

    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText('Buffer beaker', bx, by - 8);

    // Right panel: buffer titration curve (pH vs added acid/base)
    const padX = halfW + 30, padY = 30;
    const gW = W - padX - 30, gH = H - padY - 50;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(padX, padY, gW, gH);

    const xRange = 0.5;
    const x2 = (added) => padX + ((added + xRange) / (2 * xRange)) * gW;
    const y2 = (p) => padY + gH - (p / 14) * gH;

    // gridlines
    ctx.strokeStyle = 'rgba(120,130,150,0.15)';
    for (let p = 0; p <= 14; p += 2) {
      ctx.beginPath(); ctx.moveTo(padX, y2(p)); ctx.lineTo(padX + gW, y2(p)); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`${p}`, padX - 16, y2(p) + 3);
    }
    // zero line
    ctx.strokeStyle = 'rgba(245,158,11,0.5)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(x2(0), padY); ctx.lineTo(x2(0), padY + gH);
    ctx.stroke();
    ctx.setLineDash([]);

    // pKa line
    ctx.strokeStyle = '#10b981';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(padX, y2(params.pKa)); ctx.lineTo(padX + gW, y2(params.pKa));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#10b981';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`pKa = ${params.pKa.toFixed(2)}`, padX + 4, y2(params.pKa) - 4);

    // Curve: vary "added" from -xRange to +xRange (strong acid vs base)
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const added = -xRange + (i / 200) * (2 * xRange);
      const HA_ = Math.max(1e-6, params.HA + (added > 0 ? added : 0) - (added < 0 ? -added : 0));
      const A_ = Math.max(1e-6, params.A - (added > 0 ? added : 0) + (added < 0 ? -added : 0));
      const p = params.pKa + Math.log10(A_ / HA_);
      const sx = x2(added), sy = y2(Math.max(0, Math.min(14, p)));
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // current point
    const curAdded = params.addedBase - params.addedAcid;
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(x2(curAdded), y2(ph), 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('pH vs strong acid (left) / base (right) added', padX + 6, padY - 4);
    ctx.fillText('M added →', padX + gW - 70, padY + gH + 14);
  }

  // controls
  const haS = slider({ label: '[HA] (M)', min: 0.001, max: 1, step: 0.001, value: params.HA, format: (v) => v.toFixed(3),
    onInput: (v) => { params.HA = v; } });
  const aS = slider({ label: '[A⁻] (M)', min: 0.001, max: 1, step: 0.001, value: params.A, format: (v) => v.toFixed(3),
    onInput: (v) => { params.A = v; } });
  const pkaS = slider({ label: 'pKa', min: 1, max: 13, step: 0.05, value: params.pKa, format: (v) => v.toFixed(2),
    onInput: (v) => { params.pKa = v; } });
  const acidS = slider({ label: 'Strong acid added (M)', min: 0, max: 0.4, step: 0.001, value: params.addedAcid, format: (v) => v.toFixed(3),
    onInput: (v) => { params.addedAcid = v; } });
  const baseS = slider({ label: 'Strong base added (M)', min: 0, max: 0.4, step: 0.001, value: params.addedBase, format: (v) => v.toFixed(3),
    onInput: (v) => { params.addedBase = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, p] of [['Acetate (4.75)', { pKa: 4.75 }], ['Phosphate (7.21)', { pKa: 7.21 }], ['Ammonia (9.25)', { pKa: 9.25 }]]) {
    const b = button({ label: name, onClick: () => { params.pKa = p.pKa; pkaS.value = p.pKa; } });
    presetRow.appendChild(b.el);
  }
  const resetB = button({ label: 'Reset additions', onClick: () => { params.addedAcid = 0; params.addedBase = 0; acidS.value = 0; baseS.value = 0; } });

  ctrlPanel.append(haS.el, aS.el, pkaS.el, acidS.el, baseS.el, presetRow, row(resetB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
