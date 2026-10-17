import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

// Approximate visible-spectrum colour for a wavelength in nm (0..1 channels).
function wavelengthToRGB(l) {
  let r = 0, g = 0, b = 0;
  if (l < 440) { r = -(l - 440) / 60; b = 1; }
  else if (l < 490) { g = (l - 440) / 50; b = 1; }
  else if (l < 510) { g = 1; b = -(l - 510) / 20; }
  else if (l < 580) { r = (l - 510) / 70; g = 1; }
  else if (l < 645) { r = 1; g = -(l - 645) / 65; }
  else { r = 1; }
  let f = 1;
  if (l < 420) f = 0.3 + (0.7 * (l - 380)) / 40;
  else if (l > 700) f = 0.3 + (0.7 * (780 - l)) / 80;
  return [r * f, g * f, b * f];
}
const WHITE = [];
for (let l = 400; l <= 700; l += 15) WHITE.push({ l, rgb: wavelengthToRGB(l) });
const WHITE_NORM = WHITE.reduce((acc, w) => [acc[0] + w.rgb[0], acc[1] + w.rgb[1], acc[2] + w.rgb[2]], [0, 0, 0]);

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const p = {
    d: 0.5,        // mm
    lambda: 550,   // nm
    L: 1.0,        // m
    a: 50,         // μm (slit width)
    white: false,
    envelope: true,
    span: 20,      // mm of screen shown
    fringes: 1,    // fringes between the markers
  };
  const markers = { A: -1.1, B: 1.1 }; // mm
  let dirty = true;
  let cache = { W: 0, canvas: null, I: null };

  // ---- physics -------------------------------------------------------
  // Intensity at screen position y (m) for wavelength lam (m): cos² fringes × sinc² envelope.
  function intensity(yM, lamM) {
    const dM = p.d * 1e-3, aM = p.a * 1e-6, L = Math.max(0.01, p.L);
    const alpha = (Math.PI * dM * yM) / (lamM * L);
    const beta = (Math.PI * aM * yM) / (lamM * L);
    const env = Math.abs(beta) < 1e-9 ? 1 : (Math.sin(beta) / beta) ** 2;
    return Math.cos(alpha) ** 2 * env;
  }
  function envelope(yM, lamM) {
    const aM = p.a * 1e-6, L = Math.max(0.01, p.L);
    const beta = (Math.PI * aM * yM) / (lamM * L);
    return Math.abs(beta) < 1e-9 ? 1 : (Math.sin(beta) / beta) ** 2;
  }
  const spacingMM = () => ((p.lambda * 1e-9 * p.L) / (p.d * 1e-3)) * 1e3;
  const measuredMM = () => Math.abs(markers.B - markers.A) / Math.max(1, p.fringes);

  // screen geometry (CSS px)
  const geo = () => {
    const W = cv.width, H = cv.height;
    const x0 = W * 0.05, x1 = W * 0.95;
    return { W, H, x0, x1, cx: (x0 + x1) / 2, pxPerMm: (x1 - x0) / p.span, stripTop: H * 0.16, stripBot: H * 0.42, graphTop: H * 0.47, graphBot: H * 0.76, rulerY: H * 0.84 };
  };
  const mmToX = (mm) => { const g = geo(); return g.cx + mm * g.pxPerMm; };
  const xToMm = (x) => { const g = geo(); return (x - g.cx) / g.pxPerMm; };

  function rebuild() {
    const g = geo();
    const W = Math.max(1, Math.round(g.x1 - g.x0));
    if (!cache.canvas) cache.canvas = document.createElement('canvas');
    cache.canvas.width = W; cache.canvas.height = 1;
    const octx = cache.canvas.getContext('2d');
    const img = octx.createImageData(W, 1);
    const I = new Float32Array(W);
    const rgb = wavelengthToRGB(p.lambda);
    for (let i = 0; i < W; i++) {
      const yM = ((i + 0.5 - W / 2) / g.pxPerMm) * 1e-3;
      let r, gg, b;
      if (p.white) {
        r = 0; gg = 0; b = 0; let sum = 0;
        for (const w of WHITE) {
          const v = intensity(yM, w.l * 1e-9);
          r += v * w.rgb[0]; gg += v * w.rgb[1]; b += v * w.rgb[2]; sum += v;
        }
        r /= WHITE_NORM[0]; gg /= WHITE_NORM[1]; b /= WHITE_NORM[2];
        I[i] = sum / WHITE.length;
      } else {
        const v = intensity(yM, p.lambda * 1e-9);
        I[i] = v;
        r = v * rgb[0]; gg = v * rgb[1]; b = v * rgb[2];
      }
      // gamma for a more realistic screen appearance
      img.data[i * 4] = Math.round(255 * Math.pow(clamp(r, 0, 1), 0.6));
      img.data[i * 4 + 1] = Math.round(255 * Math.pow(clamp(gg, 0, 1), 0.6));
      img.data[i * 4 + 2] = Math.round(255 * Math.pow(clamp(b, 0, 1), 0.6));
      img.data[i * 4 + 3] = 255;
    }
    octx.putImageData(img, 0, 0);
    cache.W = W; cache.I = I;
    dirty = false;
  }

  // ---- drawing -------------------------------------------------------
  const font = (px, bold = false) => `${bold ? 'bold ' : ''}${Math.max(10, Math.round(px))}px system-ui, -apple-system, Roboto, sans-serif`;

  function draw() {
    const ctx = cv.ctx;
    const g = geo();
    const { W, H, x0, x1 } = g;
    if (W < 10 || H < 10) return;
    if (dirty || cache.W !== Math.round(x1 - x0)) rebuild();
    const fs = H * 0.033;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // readouts
    ctx.textAlign = 'left';
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs, true);
    ctx.fillText(T("Young's double slit", 'Celah ganda Young'), W * 0.03, H * 0.065);
    ctx.font = font(fs * 0.9); ctx.fillStyle = '#94a3b8';
    const lamTxt = p.white ? T('white light 400–700 nm', 'cahaya putih 400–700 nm') : `λ = ${p.lambda} nm`;
    ctx.fillText(`d = ${p.d.toFixed(2)} mm    ${lamTxt}    L = ${p.L.toFixed(2)} m    a = ${p.a} μm`, W * 0.03, H * 0.115);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#fbbf24'; ctx.font = font(fs * 0.95, true);
    ctx.fillText(`Δy = λL/d = ${spacingMM().toFixed(3)} mm`, W * 0.97, H * 0.065);
    ctx.fillStyle = '#60a5fa'; ctx.font = font(fs * 0.9);
    const meas = measuredMM();
    ctx.fillText(T(`markers: |B − A| / ${p.fringes} = ${meas.toFixed(3)} mm`, `penanda: |B − A| / ${p.fringes} = ${meas.toFixed(3)} mm`), W * 0.97, H * 0.115);
    ctx.textAlign = 'left';

    // screen strip
    ctx.fillStyle = '#000';
    ctx.fillRect(x0, g.stripTop, x1 - x0, g.stripBot - g.stripTop);
    if (cache.canvas) {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(cache.canvas, 0, 0, cache.W, 1, x0, g.stripTop, x1 - x0, g.stripBot - g.stripTop);
      ctx.imageSmoothingEnabled = true;
    }
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 1;
    ctx.strokeRect(x0, g.stripTop, x1 - x0, g.stripBot - g.stripTop);
    ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.7);
    ctx.fillText(T('screen', 'layar'), x0 + 4, g.stripTop - 4);

    // intensity graph
    const gh = g.graphBot - g.graphTop;
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x0, g.graphBot); ctx.lineTo(x1, g.graphBot); ctx.moveTo(g.cx, g.graphTop); ctx.lineTo(g.cx, g.graphBot); ctx.stroke();
    if (p.envelope && !p.white) {
      ctx.setLineDash([4, 4]); ctx.strokeStyle = 'rgba(248,113,113,0.7)'; ctx.lineWidth = 1.5;
      ctx.beginPath();
      const N = 200;
      for (let i = 0; i <= N; i++) {
        const x = x0 + (i / N) * (x1 - x0);
        const yM = xToMm(x) * 1e-3;
        const e = envelope(yM, p.lambda * 1e-9);
        const y = g.graphBot - e * gh;
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.stroke(); ctx.setLineDash([]);
    }
    if (cache.I) {
      const col = p.white ? [1, 1, 1] : wavelengthToRGB(p.lambda);
      ctx.strokeStyle = `rgb(${Math.round(80 + 175 * col[0])},${Math.round(80 + 175 * col[1])},${Math.round(80 + 175 * col[2])})`;
      ctx.lineWidth = Math.max(1.5, W * 0.0025);
      ctx.beginPath();
      for (let i = 0; i < cache.W; i++) {
        const x = x0 + i + 0.5, y = g.graphBot - cache.I[i] * gh;
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.stroke();
    }
    ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.7);
    ctx.fillText(p.white ? T('I(y), averaged over colours', 'I(y), rata-rata semua warna') : 'I(y) = I₀·cos²(πdy/λL)·[sin β/β]²', x0 + 4, g.graphTop + fs * 0.8);

    // ruler
    const ry = g.rulerY;
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x0, ry); ctx.lineTo(x1, ry); ctx.stroke();
    const stepMm = p.span > 30 ? 5 : p.span > 12 ? 2 : p.span > 5 ? 1 : 0.5;
    const half = p.span / 2;
    ctx.font = font(fs * 0.7); ctx.textAlign = 'center'; ctx.fillStyle = '#94a3b8';
    for (let mm = -Math.floor(half / stepMm) * stepMm; mm <= half + 1e-9; mm += stepMm) {
      const x = mmToX(mm);
      ctx.beginPath(); ctx.moveTo(x, ry); ctx.lineTo(x, ry + 8); ctx.stroke();
      ctx.fillText(Math.abs(mm) < 1e-9 ? '0' : mm.toFixed(stepMm < 1 ? 1 : 0), x, ry + fs * 1.3);
    }
    const sub = stepMm / 5;
    for (let mm = -Math.floor(half / sub) * sub; mm <= half + 1e-9; mm += sub) {
      const x = mmToX(mm);
      ctx.beginPath(); ctx.moveTo(x, ry); ctx.lineTo(x, ry + 4); ctx.stroke();
    }
    ctx.textAlign = 'left';
    ctx.fillText('y (mm)', x1 - fs * 2.2, ry - fs * 0.5);

    // markers
    const mr = Math.max(7, W * 0.011);
    for (const id of ['A', 'B']) {
      const x = mmToX(markers[id]);
      const colr = id === 'A' ? '#22d3ee' : '#f472b6';
      ctx.strokeStyle = colr; ctx.lineWidth = 1.5; ctx.setLineDash([5, 4]);
      ctx.beginPath(); ctx.moveTo(x, g.stripTop); ctx.lineTo(x, ry); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = colr;
      ctx.beginPath(); ctx.moveTo(x, ry - 2); ctx.lineTo(x - mr, ry + mr * 1.6); ctx.lineTo(x + mr, ry + mr * 1.6); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#0b1220'; ctx.font = font(fs * 0.7, true); ctx.textAlign = 'center';
      ctx.fillText(id, x, ry + mr * 1.3);
      ctx.fillStyle = colr; ctx.font = font(fs * 0.7);
      ctx.fillText(`${markers[id].toFixed(2)} mm`, x, ry + mr * 1.6 + fs * 0.9);
    }
    ctx.textAlign = 'left';
  }

  // ---- interaction ---------------------------------------------------
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) {
      const g = geo();
      if (y < g.stripTop || y > g.H) return null;
      const tol = Math.max(12, g.W * 0.015);
      let best = null, bd = tol;
      for (const id of ['A', 'B']) {
        const dx = Math.abs(x - mmToX(markers[id]));
        if (dx < bd) { bd = dx; best = id; }
      }
      return best;
    },
    onDrag(id, x) { markers[id] = clamp(xToMm(x), -p.span / 2, p.span / 2); },
    handles: () => ['A', 'B'].map((id) => ({ id, x: mmToX(markers[id]), y: geo().rulerY, label: `Marker ${id} at ${markers[id].toFixed(2)} mm (drag along the screen)` })),
    cursor: 'default',
    hoverCursor: 'ew-resize',
  });

  // ---- controls ------------------------------------------------------
  const touch = () => { dirty = true; };
  const dS = slider({ label: 'Slit separation d (mm)', key: 'd', min: 0.1, max: 1.0, step: 0.01, value: p.d, format: (v) => v.toFixed(2), onInput: (v) => { p.d = v; touch(); } });
  const lamS = slider({ label: 'Wavelength λ (nm)', key: 'lambda', min: 400, max: 700, step: 5, value: p.lambda, format: (v) => v.toFixed(0), onInput: (v) => { p.lambda = v; touch(); } });
  const LS = slider({ label: 'Screen distance L (m)', key: 'L', min: 0.5, max: 3.0, step: 0.05, value: p.L, format: (v) => v.toFixed(2), onInput: (v) => { p.L = v; touch(); } });
  const aS = slider({ label: 'Slit width a (μm)', key: 'a', min: 10, max: 200, step: 5, value: p.a, format: (v) => v.toFixed(0), onInput: (v) => { p.a = v; touch(); } });
  const spanS = slider({ label: 'Screen width shown (mm)', key: 'span', min: 2, max: 60, step: 1, value: p.span, format: (v) => v.toFixed(0), onInput: (v) => { p.span = v; markers.A = clamp(markers.A, -v / 2, v / 2); markers.B = clamp(markers.B, -v / 2, v / 2); touch(); } });
  const frS = slider({ label: 'Fringes between markers', key: 'fringes', min: 1, max: 10, step: 1, value: p.fringes, format: (v) => v.toFixed(0), onInput: (v) => { p.fringes = v; } });
  const whiteT = toggle({ label: 'White light', key: 'white', value: false, onChange: (v) => { p.white = v; touch(); } });
  const envT = toggle({ label: 'Show single-slit envelope', key: 'envelope', value: true, onChange: (v) => { p.envelope = v; } });
  ctrlPanel.append(dS.el, lamS.el, LS.el, aS.el, spanS.el, frS.el, row(whiteT, envT));

  const lab = labPanel({
    title: 'Double-slit lab — measure the fringe spacing',
    filename: 'double-slit-data.csv',
    columns: [
      { key: 'd', label: 'd (mm)', format: (v) => v.toFixed(2) },
      { key: 'lambda', label: 'λ (nm)' },
      { key: 'L', label: 'L (m)', format: (v) => v.toFixed(2) },
      { key: 'dyMeas', label: 'Δy measured (mm)', format: (v) => v.toFixed(3) },
      { key: 'dyPred', label: 'Δy = λL/d (mm)', format: (v) => v.toFixed(3) },
    ],
    procedure: [
      'd = 0.50 mm, λ = 550 nm, L = 1.00 m. Drag marker A onto the central bright fringe and B onto the 4th bright fringe; set "Fringes between markers" to 4. Record.',
      'Change d to 0.25 mm and then 1.00 mm, re-measure and record. How does Δy depend on d?',
      'Return to d = 0.50 mm; set L = 2.00 m and record. Then L = 0.50 m.',
      'Set λ = 450 nm and then 650 nm, measure and record each. Plot Δy against λ.',
      'Pretend λ is unknown: use your measured Δy, d and L to compute λ = Δy·d/L and compare with the slider value.',
    ],
    predict: 'If you double the slit separation d, does the fringe spacing double, halve or stay the same? Write your reasoning before measuring.',
    source: () => ({ d: p.d, lambda: p.white ? 'white' : p.lambda, L: p.L, dyMeas: measuredMM(), dyPred: spacingMM() }),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop(() => { draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
