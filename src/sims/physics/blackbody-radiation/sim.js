import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const h = 6.626e-34;      // J·s
const c = 2.998e8;        // m/s
const kB = 1.381e-23;     // J/K
const SIGMA = 5.670e-8;   // W m⁻² K⁻⁴
const WIEN_B = 2.898e-3;  // m·K
const VIS_LO = 380e-9, VIS_HI = 750e-9;
const PRESETS = [
  { key: 'sun', T: 5778, en: 'Sun', id: 'Matahari' },
  { key: 'bulb', T: 2700, en: 'Incandescent', id: 'Lampu pijar' },
  { key: 'earth', T: 288, en: 'Earth', id: 'Bumi' },
  { key: 'sirius', T: 9940, en: 'Sirius', id: 'Sirius' },
];

// Spectral exitance M(λ,T) = π·B(λ,T) in W·m⁻²·m⁻¹ (power per m² per metre of wavelength).
function exitance(lam, T) {
  if (lam <= 0 || T <= 0) return 0;
  const x = (h * c) / (lam * kB * T);
  if (x > 700) return 0;
  return (Math.PI * 2 * h * c * c) / Math.pow(lam, 5) / Math.expm1(x);
}
// Approximate perceived colour of a blackbody (Tanner Helland fit, 1000–40000 K), dimmed below 1000 K.
function bbColor(T) {
  const t = Math.max(1000, Math.min(40000, T)) / 100;
  let r, g, b;
  if (t <= 66) {
    r = 255;
    g = 99.4708025861 * Math.log(t) - 161.1195681661;
    b = t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  } else {
    r = 329.698727446 * Math.pow(t - 60, -0.1332047592);
    g = 288.1221695283 * Math.pow(t - 60, -0.0755148492);
    b = 255;
  }
  const dim = Math.max(0.04, Math.min(1, (T - 600) / 600));
  const cl = (v) => Math.round(Math.max(0, Math.min(255, v)) * dim);
  return `rgb(${cl(r)},${cl(g)},${cl(b)})`;
}
function wavelengthToRGB(nm) {
  let r = 0, g = 0, b = 0;
  if (nm < 440) { r = -(nm - 440) / 60; b = 1; }
  else if (nm < 490) { g = (nm - 440) / 50; b = 1; }
  else if (nm < 510) { g = 1; b = -(nm - 510) / 20; }
  else if (nm < 580) { r = (nm - 510) / 70; g = 1; }
  else if (nm < 645) { r = 1; g = -(nm - 645) / 65; }
  else { r = 1; }
  return `rgb(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)})`;
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const T_ = (en, id) => (getLocale() === 'id' ? id : en);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const p = { T: 5778, log: false, visible: true, area: true, compare: false };
  let shownT = p.T; // smoothly animated temperature for the curve

  const lamMax = (T) => WIEN_B / T;
  const power = (T) => SIGMA * Math.pow(T, 4);
  // numerical fraction of σT⁴ in the visible band
  function visibleFraction(T) {
    const N = 400, dl = (VIS_HI - VIS_LO) / N;
    let s = 0;
    for (let i = 0; i < N; i++) s += exitance(VIS_LO + (i + 0.5) * dl, T) * dl;
    const tot = power(T);
    return tot > 0 ? clamp(s / tot, 0, 1) : 0;
  }
  const sci = (v, d = 2) => {
    if (!Number.isFinite(v) || v === 0) return '0';
    const e = Math.floor(Math.log10(Math.abs(v)));
    const m = v / Math.pow(10, e);
    return `${m.toFixed(d)} × 10^${e}`;
  };
  const font = (px, bold = false) => `${bold ? 'bold ' : ''}${Math.max(10, Math.round(px))}px system-ui, -apple-system, Roboto, sans-serif`;

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    const fs = H * 0.032;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    const T = shownT;
    const lm = lamMax(T);
    const Mpeak = exitance(lm, T);

    // plot area
    const gx0 = W * 0.1, gx1 = W * 0.72, gy0 = H * 0.84, gy1 = H * 0.2;
    // axis mapping
    let lamLo, lamHi, X, Y, yMin, yMax;
    if (p.log) {
      lamLo = 0.1e-6; lamHi = 100e-6;
      X = (lam) => gx0 + (Math.log10(clamp(lam, lamLo, lamHi) / lamLo) / Math.log10(lamHi / lamLo)) * (gx1 - gx0);
      yMax = Math.log10(Math.max(1e-30, Mpeak) * 1e-6) + 0.3; yMin = yMax - 7;
      Y = (M) => { const v = M > 0 ? Math.log10(M * 1e-6) : yMin; return gy0 - (clamp(v, yMin, yMax) - yMin) / (yMax - yMin) * (gy0 - gy1); };
    } else {
      lamLo = 0; lamHi = 6 * lm;
      X = (lam) => gx0 + ((lam - lamLo) / (lamHi - lamLo)) * (gx1 - gx0);
      yMax = Mpeak * 1.1 || 1;
      Y = (M) => gy0 - clamp(M / yMax, 0, 1) * (gy0 - gy1);
    }
    // visible band
    if (p.visible) {
      const xa = X(VIS_LO), xb = X(VIS_HI);
      if (xb > gx0 && xa < gx1 && xb - xa > 1) {
        const grad = ctx.createLinearGradient(xa, 0, xb, 0);
        for (let i = 0; i <= 8; i++) grad.addColorStop(i / 8, wavelengthToRGB(380 + (i / 8) * 370));
        ctx.globalAlpha = 0.22; ctx.fillStyle = grad; ctx.fillRect(xa, gy1, xb - xa, gy0 - gy1); ctx.globalAlpha = 1;
        ctx.fillStyle = '#cbd5e1'; ctx.font = font(fs * 0.7); ctx.textAlign = 'center';
        ctx.fillText(T_('visible', 'tampak'), (xa + xb) / 2, gy1 - 4);
      }
    }
    // axes
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(gx0, gy1); ctx.lineTo(gx0, gy0); ctx.lineTo(gx1, gy0); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.7); ctx.textAlign = 'center';
    if (p.log) {
      for (const lam of [0.1e-6, 0.3e-6, 1e-6, 3e-6, 10e-6, 30e-6, 100e-6]) {
        const x = X(lam);
        ctx.beginPath(); ctx.moveTo(x, gy0); ctx.lineTo(x, gy0 + 5); ctx.stroke();
        ctx.fillText((lam * 1e6).toString(), x, gy0 + fs * 1.1);
      }
      ctx.textAlign = 'right';
      for (let e = Math.ceil(yMin); e <= Math.floor(yMax); e++) {
        const y = gy0 - ((e - yMin) / (yMax - yMin)) * (gy0 - gy1);
        ctx.beginPath(); ctx.moveTo(gx0 - 5, y); ctx.lineTo(gx0, y); ctx.stroke();
        ctx.fillText(`10^${e}`, gx0 - 7, y + fs * 0.3);
      }
    } else {
      const step = lamHi / 6;
      for (let i = 0; i <= 6; i++) {
        const lam = i * step, x = X(lam);
        ctx.beginPath(); ctx.moveTo(x, gy0); ctx.lineTo(x, gy0 + 5); ctx.stroke();
        ctx.fillText((lam * 1e6).toFixed(lamHi > 20e-6 ? 0 : lamHi > 2e-6 ? 1 : 2), x, gy0 + fs * 1.1);
      }
      ctx.textAlign = 'right';
      for (let i = 0; i <= 4; i++) {
        const M = (i / 4) * yMax, y = Y(M);
        ctx.beginPath(); ctx.moveTo(gx0 - 5, y); ctx.lineTo(gx0, y); ctx.stroke();
        ctx.fillText(i === 0 ? '0' : sci(M * 1e-6, 1), gx0 - 7, y + fs * 0.3);
      }
    }
    ctx.textAlign = 'center'; ctx.fillStyle = '#cbd5e1'; ctx.font = font(fs * 0.8);
    ctx.fillText('λ (μm)', (gx0 + gx1) / 2, gy0 + fs * 2.3);
    ctx.save(); ctx.translate(W * 0.025, (gy0 + gy1) / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText(T_('M(λ,T)  W m⁻² μm⁻¹', 'M(λ,T)  W m⁻² μm⁻¹'), 0, 0); ctx.restore();

    // curve (+ area)
    const N = Math.max(100, Math.round(gx1 - gx0));
    const lamAt = (i) => (p.log ? lamLo * Math.pow(lamHi / lamLo, i / N) : lamLo + (i / N) * (lamHi - lamLo));
    const col = bbColor(T);
    if (p.area) {
      ctx.beginPath(); ctx.moveTo(gx0, gy0);
      for (let i = 0; i <= N; i++) { const lam = Math.max(1e-9, lamAt(i)); ctx.lineTo(X(lam), Y(exitance(lam, T))); }
      ctx.lineTo(gx1, gy0); ctx.closePath();
      ctx.fillStyle = 'rgba(251,191,36,0.18)'; ctx.fill();
    }
    if (p.compare) {
      ctx.setLineDash([5, 4]); ctx.strokeStyle = 'rgba(148,163,184,0.7)'; ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i <= N; i++) { const lam = Math.max(1e-9, lamAt(i)); const y = Y(exitance(lam, 5778)); i ? ctx.lineTo(X(lam), y) : ctx.moveTo(X(lam), y); }
      ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.7); ctx.textAlign = 'left';
      ctx.fillText(T_('dashed: Sun 5778 K', 'putus-putus: Matahari 5778 K'), gx0 + 6, gy1 + fs * 1.2);
    }
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = Math.max(2, W * 0.004);
    ctx.beginPath();
    for (let i = 0; i <= N; i++) { const lam = Math.max(1e-9, lamAt(i)); const y = Y(exitance(lam, T)); i ? ctx.lineTo(X(lam), y) : ctx.moveTo(X(lam), y); }
    ctx.stroke();
    // Wien peak marker
    const px = X(lm);
    if (px > gx0 && px < gx1) {
      ctx.setLineDash([4, 4]); ctx.strokeStyle = '#f87171'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(px, gy0); ctx.lineTo(px, Y(Mpeak)); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = '#f87171'; ctx.beginPath(); ctx.arc(px, Y(Mpeak), 4, 0, Math.PI * 2); ctx.fill();
      ctx.font = font(fs * 0.75); ctx.textAlign = px > (gx0 + gx1) / 2 ? 'right' : 'left';
      ctx.fillText(`λ_max = b/T = ${(lm * 1e6).toFixed(lm > 5e-6 ? 1 : 3)} μm`, px + (px > (gx0 + gx1) / 2 ? -8 : 8), Y(Mpeak) - fs * 0.4);
    }

    // header
    ctx.textAlign = 'left';
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs * 1.1, true);
    ctx.fillText(`T = ${Math.round(T)} K`, W * 0.03, H * 0.07);
    ctx.font = font(fs * 0.85); ctx.fillStyle = '#94a3b8';
    ctx.fillText('B(λ,T) = (2hc²/λ⁵) · 1/(e^(hc/λkT) − 1)', W * 0.03, H * 0.125);

    // side panel
    const sx = W * 0.76, sw = W * 0.21;
    let sy = H * 0.2;
    const line = (txt, color = '#e2e8f0', bold = false, size = 0.8) => { ctx.fillStyle = color; ctx.font = font(fs * size, bold); ctx.fillText(txt, sx, sy); sy += fs * 1.35; };
    // colour swatch
    const r = Math.min(sw * 0.22, H * 0.07);
    const cxs = sx + r, cys = sy + r;
    const glow = ctx.createRadialGradient(cxs, cys, r * 0.3, cxs, cys, r * 1.8);
    glow.addColorStop(0, col); glow.addColorStop(1, 'rgba(11,18,32,0)');
    ctx.fillStyle = glow; ctx.fillRect(cxs - 2 * r, cys - 2 * r, 4 * r, 4 * r);
    ctx.fillStyle = col; ctx.beginPath(); ctx.arc(cxs, cys, r, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(fs * 0.75); ctx.textAlign = 'left';
    ctx.fillText(T_('glow colour', 'warna pijar'), cxs + r + 10, cys - fs * 0.2);
    ctx.fillText(T < 700 ? T_('(too cool to see)', '(terlalu dingin untuk dilihat)') : '', cxs + r + 10, cys + fs * 0.9);
    sy = cys + r + fs * 1.6;
    line(T_('Wien peak', 'Puncak Wien'), '#f87171', true, 0.85);
    line(`λ_max = ${(lm * 1e6).toFixed(3)} μm`);
    line(`b = 2.898 × 10⁻³ m·K`, '#94a3b8', false, 0.7);
    sy += fs * 0.3;
    line(T_('Stefan–Boltzmann', 'Stefan–Boltzmann'), '#fbbf24', true, 0.85);
    line(`P/A = σT⁴ = ${sci(power(T))} W/m²`);
    line(`σ = 5.67 × 10⁻⁸ W m⁻² K⁻⁴`, '#94a3b8', false, 0.7);
    sy += fs * 0.3;
    line(T_('Fraction in visible band', 'Bagian di pita tampak'), '#a78bfa', true, 0.85);
    const vf = visibleFraction(T);
    line(vf >= 0.0005 ? `${(vf * 100).toFixed(1)} %` : vf > 0 ? `${(vf * 100).toExponential(1)} %` : '0 %');
    ctx.textAlign = 'left';
  }

  // ---- controls ---------------------------------------------------------
  const tS = slider({ label: 'Temperature T (K)', key: 'T', min: 300, max: 10000, step: 10, value: p.T, format: (v) => v.toFixed(0), onInput: (v) => { p.T = v; } });
  const presetBtns = PRESETS.map((pr) => button({ label: `${pr.en} ${pr.T} K`, onClick: () => { tS.apply(pr.T); } }));
  const logT = toggle({ label: 'Log scale (λ 0.1–100 μm)', key: 'log', value: false, onChange: (v) => { p.log = v; } });
  const visT = toggle({ label: 'Show visible band', key: 'visible', value: true, onChange: (v) => { p.visible = v; } });
  const areaT = toggle({ label: 'Shade area = σT⁴', key: 'area', value: true, onChange: (v) => { p.area = v; } });
  const cmpT = toggle({ label: 'Compare with Sun', key: 'compare', value: false, onChange: (v) => { p.compare = v; } });
  ctrlPanel.append(tS.el, row(...presetBtns), row(logT, visT), row(areaT, cmpT));

  const lab = labPanel({
    title: 'Blackbody lab — Wien and Stefan–Boltzmann',
    filename: 'blackbody-radiation-data.csv',
    columns: [
      { key: 'T', label: 'T (K)', format: (v) => v.toFixed(0) },
      { key: 'lamMax', label: 'λ_max (μm)', format: (v) => v.toFixed(3) },
      { key: 'lamT', label: 'λ_max·T (m·K)', format: (v) => v.toExponential(3) },
      { key: 'PA', label: 'P/A (W/m²)', format: (v) => v.toExponential(3) },
      { key: 'vis', label: 'Visible (%)', format: (v) => (v >= 0.05 ? v.toFixed(1) : v.toExponential(1)) },
    ],
    procedure: [
      'Record the four presets: Earth, Incandescent, Sun, Sirius.',
      'Check the λ_max·T column: it should be the same constant (2.898 × 10⁻³ m·K) in every row.',
      'Record T = 1000, 2000, 4000, 8000 K. Each doubling of T should multiply P/A by 16.',
      'Plot log(P/A) against log(T). The slope should be 4.',
      'Which temperature maximises the visible fraction? Scan 4000–8000 K and record the best.',
    ],
    predict: 'If you double the temperature of an object, how many times more power does it radiate: 2×, 4×, 8× or 16×?',
    source: () => ({ T: p.T, lamMax: lamMax(p.T) * 1e6, lamT: lamMax(p.T) * p.T, PA: power(p.T), vis: visibleFraction(p.T) * 100 }),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => {
    // ease the drawn temperature toward the slider so the curve morphs smoothly
    const k = 1 - Math.exp(-dt * 8);
    shownT += (p.T - shownT) * k;
    if (Math.abs(p.T - shownT) < 0.5) shownT = p.T;
    draw();
  });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
