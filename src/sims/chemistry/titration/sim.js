import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';
import { hoverProbe, drawCrosshair } from '../../../lib/chart.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';

// Approximate titration of an acid (mono-protic) with a strong base (NaOH).
// We treat strong acid as Ka → ∞ for charge balance.
function pHAt(volBaseAdded_mL, params) {
  // Initial moles of acid and added base
  const Va = params.acidVol; // mL
  const Ca = params.acidConc; // M
  const Cb = params.baseConc; // M
  const moleA = (Va / 1000) * Ca;
  const moleB = (volBaseAdded_mL / 1000) * Cb;
  const Vtot = (Va + volBaseAdded_mL) / 1000; // L

  if (params.acidType === 'strong') {
    if (moleA > moleB + 1e-12) {
      // excess acid
      const Hplus = (moleA - moleB) / Vtot;
      return -Math.log10(Math.max(Hplus, 1e-14));
    }
    if (moleB > moleA + 1e-12) {
      const OHm = (moleB - moleA) / Vtot;
      return 14 + Math.log10(Math.max(OHm, 1e-14));
    }
    // equivalence point — pure water
    return 7;
  }

  // Weak acid: solve simplified buffer / Henderson-Hasselbalch-ish
  const Ka = params.Ka;
  const pKa = -Math.log10(Ka);
  if (volBaseAdded_mL <= 0.01) {
    // pure weak acid: pH ≈ 0.5*(pKa - log10(Ca))
    return 0.5 * (pKa - Math.log10(Ca));
  }
  if (moleB < moleA - 1e-12) {
    // buffer region: pH = pKa + log10([A-]/[HA])
    const HA = (moleA - moleB) / Vtot;
    const Am = moleB / Vtot;
    return pKa + Math.log10(Am / Math.max(HA, 1e-12));
  }
  if (Math.abs(moleB - moleA) <= 1e-9) {
    // equivalence: only A- at concentration moleA/Vtot, weak base
    const Am = moleA / Vtot;
    const Kb = 1e-14 / Ka;
    const OH = Math.sqrt(Kb * Am);
    return 14 + Math.log10(Math.max(OH, 1e-14));
  }
  // past equivalence
  const OHm = (moleB - moleA) / Vtot;
  return 14 + Math.log10(Math.max(OHm, 1e-14));
}

const INDICATORS = {
  none:            { label: 'No indicator', range: null, colors: ['#cbd5e1', '#cbd5e1'] },
  phenolphthalein: { label: 'Phenolphthalein (8.2 – 10.0)', range: [8.2, 10.0], colors: ['#f4f4f4', '#d8329b'] },
  methylOrange:    { label: 'Methyl orange (3.1 – 4.4)',    range: [3.1, 4.4],  colors: ['#d33b2c', '#e6a52d'] },
  bromothymol:     { label: 'Bromothymol blue (6.0 – 7.6)', range: [6.0, 7.6],  colors: ['#e6c92a', '#2d8ce0'] },
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    acidType: 'strong',  // 'strong' | 'weak'
    acidConc: 0.10,      // M
    acidVol: 25,         // mL
    baseConc: 0.10,      // M
    Ka: 1.8e-5,          // acetic acid
    indicator: 'phenolphthalein',
    titrantAdded: 0,     // mL
  };

  let pumping = 0; // 0 stop, 1 slow, 2 fast
  let curve = []; // [{vol, pH}]
  let chartRect = null; // { x, y, w, h, x2(vol), y2(pH), s2v(sx) } — populated each frame

  function recompute() {
    curve = [];
    const max = 50;
    for (let v = 0; v <= max; v += 0.1) curve.push({ vol: v, pH: pHAt(v, params) });
  }
  recompute();

  function indicatorColor(ph) {
    const ind = INDICATORS[params.indicator];
    if (!ind || !ind.range) return null;
    if (ph <= ind.range[0]) return ind.colors[0];
    if (ph >= ind.range[1]) return ind.colors[1];
    const t = (ph - ind.range[0]) / (ind.range[1] - ind.range[0]);
    return lerpColor(ind.colors[0], ind.colors[1], t);
  }

  function lerpColor(c1, c2, t) {
    const a = hexRGB(c1), b = hexRGB(c2);
    return `rgb(${Math.round(a[0] + (b[0]-a[0])*t)},${Math.round(a[1] + (b[1]-a[1])*t)},${Math.round(a[2] + (b[2]-a[2])*t)})`;
  }
  function hexRGB(h) {
    const n = h.replace('#', '');
    return [parseInt(n.slice(0,2),16), parseInt(n.slice(2,4),16), parseInt(n.slice(4,6),16)];
  }

  function step(dt) {
    if (pumping > 0) {
      const rate = pumping === 1 ? 1.0 : 5.0; // mL/sec
      params.titrantAdded = Math.min(50, params.titrantAdded + rate * dt);
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    // Layout: left third = burette + flask, right two-thirds = pH curve
    const leftW = Math.min(220, W / 3);

    // Burette
    const buX = 60, buY = 30, buW = 24, buH = H * 0.35;
    ctx.strokeStyle = 'rgba(120,130,150,0.7)';
    ctx.lineWidth = 2;
    ctx.strokeRect(buX, buY, buW, buH);
    const fillFrac = Math.max(0, 1 - params.titrantAdded / 50);
    ctx.fillStyle = 'rgba(59,130,246,0.55)';
    ctx.fillRect(buX + 1, buY + buH - fillFrac * (buH - 2), buW - 2, fillFrac * (buH - 2));
    // tick marks
    ctx.fillStyle = 'rgba(120,130,150,0.8)';
    ctx.font = '10px var(--font-mono)';
    for (let m = 0; m <= 50; m += 10) {
      const ty = buY + (m / 50) * buH;
      ctx.fillRect(buX + buW + 1, ty - 0.5, 4, 1);
      ctx.fillText(`${m}`, buX + buW + 8, ty + 3);
    }

    // Drip line + drop
    const dripX = buX + buW / 2;
    ctx.strokeStyle = 'rgba(59,130,246,0.7)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(dripX, buY + buH);
    ctx.lineTo(dripX, buY + buH + 30);
    ctx.stroke();
    if (pumping > 0) {
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      const dt = (Date.now() % 600) / 600;
      ctx.arc(dripX, buY + buH + 30 + dt * 30, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Flask
    const flX = 30, flY = buY + buH + 60, flW = leftW - 50, flH = H - flY - 30;
    ctx.strokeStyle = 'rgba(120,130,150,0.7)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(flX + flW * 0.3, flY);
    ctx.lineTo(flX + flW * 0.3, flY + 12);
    ctx.lineTo(flX, flY + flH);
    ctx.lineTo(flX + flW, flY + flH);
    ctx.lineTo(flX + flW * 0.7, flY + 12);
    ctx.lineTo(flX + flW * 0.7, flY);
    ctx.stroke();

    const ph = pHAt(params.titrantAdded, params);
    const color = indicatorColor(ph);
    ctx.fillStyle = color || `hsl(${200 + Math.min(50, ph * 5)} 50% 65% / 0.7)`;
    ctx.beginPath();
    ctx.moveTo(flX + 4, flY + flH - 4);
    ctx.lineTo(flX + flW * 0.3 + 2, flY + 16);
    ctx.lineTo(flX + flW * 0.7 - 2, flY + 16);
    ctx.lineTo(flX + flW - 4, flY + flH - 4);
    ctx.closePath();
    ctx.fill();

    // Labels
    ctx.fillStyle = 'rgba(120,130,150,0.95)';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText('Burette: NaOH', buX, buY - 6);
    ctx.fillText('Flask: acid', flX, flY - 6);

    // pH curve
    drawCurve(ctx, leftW + 30, 30, W - leftW - 50, H - 60);

    // Hover crosshair on the curve
    const probe = hover.get();
    if (probe && chartRect) {
      drawCrosshair(ctx, probe, {
        bounds: { x: chartRect.x, y: chartRect.y, w: chartRect.w, h: chartRect.h },
        color: '#fbbf24',
        label: probe.label,
      });
    }

    // Big readout
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(leftW + 40, 40, 220, 56);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 22px var(--font-sans)';
    ctx.fillText(`pH = ${ph.toFixed(2)}`, leftW + 50, 68);
    ctx.font = '12px var(--font-sans)';
    ctx.fillText(`Titrant: ${params.titrantAdded.toFixed(1)} mL`, leftW + 50, 88);
  }

  function drawCurve(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, w, h);

    // y: pH 0..14, x: vol 0..50
    const x2 = (vol) => x + (vol / 50) * w;
    const y2 = (pH)  => y + h - (pH / 14) * h;
    chartRect = { x, y, w, h, x2, y2, s2v: (sx) => Math.max(0, Math.min(50, ((sx - x) / w) * 50)) };

    // gridlines
    ctx.strokeStyle = 'rgba(120,130,150,0.2)';
    for (let p = 0; p <= 14; p += 2) {
      ctx.beginPath();
      ctx.moveTo(x, y2(p)); ctx.lineTo(x + w, y2(p));
      ctx.stroke();
    }
    // indicator band
    const ind = INDICATORS[params.indicator];
    if (ind && ind.range) {
      ctx.fillStyle = 'rgba(245,158,11,0.18)';
      ctx.fillRect(x, y2(ind.range[1]), w, y2(ind.range[0]) - y2(ind.range[1]));
    }

    // curve
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i < curve.length; i++) {
      const px = x2(curve[i].vol), py = y2(curve[i].pH);
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // dot at current
    const cph = pHAt(params.titrantAdded, params);
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(x2(params.titrantAdded), y2(cph), 6, 0, Math.PI * 2);
    ctx.fill();

    // axis labels
    ctx.fillStyle = 'rgba(120,130,150,0.9)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('pH', x - 18, y + 12);
    ctx.fillText('mL titrant', x + w - 60, y + h + 14);
    for (let p = 0; p <= 14; p += 2) ctx.fillText(String(p), x - 16, y2(p) + 3);
    for (let v = 0; v <= 50; v += 10) ctx.fillText(String(v), x2(v) - 5, y + h + 14);
  }

  // controls
  const acidSel = select({
    label: 'Acid',
    options: [
      { value: 'strong', label: 'Strong acid (HCl-like)' },
      { value: 'weak',   label: 'Weak acid (Ka adjustable)' },
    ],
    value: params.acidType,
    onChange: (v) => { params.acidType = v; recompute(); },
  });
  const acidConcS = slider({
    label: 'Acid concentration (M)', min: 0.01, max: 1.0, step: 0.01, value: params.acidConc, format: (v) => v.toFixed(2),
    onInput: (v) => { params.acidConc = v; recompute(); },
  });
  const acidVolS = slider({
    label: 'Acid volume (mL)', min: 5, max: 50, step: 1, value: params.acidVol,
    onInput: (v) => { params.acidVol = v; recompute(); },
  });
  const baseConcS = slider({
    label: 'Base concentration (M)', min: 0.01, max: 1.0, step: 0.01, value: params.baseConc, format: (v) => v.toFixed(2),
    onInput: (v) => { params.baseConc = v; recompute(); },
  });
  const KaS = slider({
    label: 'Ka (weak acid)', min: 1e-7, max: 1e-1, step: 1e-7, value: params.Ka, format: (v) => v.toExponential(1),
    onInput: (v) => { params.Ka = v; recompute(); },
  });
  const indSel = select({
    label: 'Indicator',
    options: Object.entries(INDICATORS).map(([k, v]) => ({ value: k, label: v.label })),
    value: params.indicator,
    onChange: (v) => { params.indicator = v; },
  });
  const titS = slider({
    label: 'Titrant added (mL)', min: 0, max: 50, step: 0.1, value: params.titrantAdded, format: (v) => v.toFixed(1),
    onInput: (v) => { params.titrantAdded = v; },
  });
  const slowB = button({ label: '▼ Drip', onClick: () => { pumping = pumping === 1 ? 0 : 1; } });
  const fastB = button({ label: '▼▼ Pour', primary: true, onClick: () => { pumping = pumping === 2 ? 0 : 2; } });
  const stopB = button({ label: 'Stop', onClick: () => { pumping = 0; } });
  const resetB = button({ label: 'Reset flask', onClick: () => { params.titrantAdded = 0; pumping = 0; titS.value = 0; } });

  ctrlPanel.append(acidSel.el, acidConcS.el, acidVolS.el, baseConcS.el, KaS.el, indSel.el, titS.el, row(slowB, fastB, stopB, resetB));

  // Lab — record titration-curve points and find the equivalence volume.
  function equivalenceVol() {
    // Strong vs strong: V_eq = C_a · V_a / C_b ; weak-acid case is the same for V_eq.
    return params.acidConc * params.acidVol / params.baseConc;
  }
  const lab = labPanel({
    title: 'Titration lab — find the equivalence point',
    filename: 'titration-lab.csv',
    columns: [
      { key: 'V',    label: 'V titrant (mL)', format: (v) => v.toFixed(2) },
      { key: 'pH',   label: 'pH',             format: (v) => v.toFixed(2) },
      { key: 'note', label: 'note',           format: (v) => v ?? '' },
    ],
    procedure: [
      'Set acid type, concentration, and volume from your problem.',
      'Drip slowly. Click "Record" every 2 mL: 0, 2, 4, 6, 8, 10 mL.',
      'Near the steep midpoint (the equivalence point), record every 0.5 mL.',
      'Past equivalence, take a few more readings.',
      'Plot pH vs volume. The midpoint of the steep rise is the equivalence point.',
    ],
    predict: 'For a strong acid + strong base, what should the equivalence pH be? What about for a weak acid + strong base?',
    source: () => {
      const V = params.titrantAdded;
      const pH = pHAt(V, params);
      const Veq = equivalenceVol();
      const note =
        Math.abs(V - Veq) < 0.4 ? 'equivalence' :
        Math.abs(V - Veq / 2) < 0.4 && params.acidType === 'weak' ? 'half-equiv (pH ≈ pKa)' : '';
      return { V, pH, note };
    },
  });
  ctrlPanel.appendChild(lab.el);

  // Drag the red dot along the curve to scrub volume; hover anywhere on the
  // chart for a (volume, pH) readout. Both stop the pump while interacting.
  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    if (!chartRect) return null;
    const { x, y, w, h, x2, y2 } = chartRect;
    if (sx < x || sx > x + w || sy < y || sy > y + h) return null;
    const v = chartRect.s2v(sx);
    const p = pHAt(v, params);
    return { x: x2(v), y: y2(p), label: [`Vol = ${v.toFixed(1)} mL`, `pH = ${p.toFixed(2)}`] };
  });
  const drag = dragHandle(cv.canvas, {
    hitTest(sx, sy) {
      if (!chartRect) return null;
      // Hit anywhere inside the chart rect counts as a scrub start.
      const { x, y, w, h } = chartRect;
      if (sx >= x && sx <= x + w && sy >= y && sy <= y + h) return 'scrub';
      return null;
    },
    onStart() { pumping = 0; },
    onDrag(_id, sx) {
      params.titrantAdded = chartRect.s2v(sx);
      titS.value = params.titrantAdded;
    },
    cursor: 'crosshair',
    hoverCursor: 'ew-resize',
  });

  const animator = loop((dt) => {
    step(dt);
    titS.value = params.titrantAdded;
    draw();
  });
  animator.start();

  return () => { animator.stop(); hover.destroy(); drag.destroy(); cv.destroy(); };
}
