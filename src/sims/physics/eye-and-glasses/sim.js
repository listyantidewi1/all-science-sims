import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

// Model: the whole eye is one thin lens in air. Relaxed power focuses a distant
// object onto a retina 24 mm behind it. Glasses are a second thin lens 12 mm in
// front of the eye lens. Paraxial ray tracing in millimetres.
const EYE_P0 = 1000 / 24;   // D, relaxed eye power (normal 24 mm eye)
const VERTEX = 12;          // mm, glasses-to-eye distance
const PUPIL_R = 3;          // mm, marginal ray height at the eye lens
const ACCOM_MAX = 8;        // D, maximum accommodation

/**
 * Trace the marginal ray from an on-axis object point.
 * u: object distance from the eye lens (mm); Pg: glasses power (D); A: accommodation (D); d: eyeball length (mm).
 * Returns heights/slopes needed to draw, plus image distance v (mm, Infinity if parallel, negative if diverging) and blur disc diameter (mm).
 */
export function traceEye(u, Pg, A, d) {
  const hE = PUPIL_R;
  const uG = Math.max(1, u - VERTEX);                    // object distance from glasses (glasses are nearer the object)
  const k = 1 + VERTEX / uG - (VERTEX * Pg) / 1000;      // hE = hG * k
  const hG = Math.abs(k) > 1e-6 ? hE / k : hE;
  const s0 = hG / uG;                                    // slope before glasses (rising toward lens)
  const s1 = s0 - (hG * Pg) / 1000;                      // after glasses
  const s2 = s1 - (hE * (EYE_P0 + A)) / 1000;            // after eye lens
  let v;
  if (Math.abs(s2) < 1e-9) v = Infinity;
  else v = -hE / s2;                                     // crossing of the axis (negative = virtual, behind the lens)
  const blur = 2 * Math.abs(hE + s2 * d);                // disc diameter at the retina
  return { hG, hE, s0, s1, s2, v, blur };
}

/** Accommodation (D) a relaxed eye would need to add to put the focus on the retina. */
export function accommodationNeeded(u, Pg, d) {
  const hE = 1;
  const uG = Math.max(1, u - VERTEX);
  const k = 1 + VERTEX / uG - (VERTEX * Pg) / 1000;
  const hG = Math.abs(k) > 1e-6 ? hE / k : hE;
  const s1 = hG / uG - (hG * Pg) / 1000;
  // want s2 = -hE/d  =>  s1 - hE*(P0+A)/1000 = -hE/d
  return 1000 * (s1 + hE / d) / hE - EYE_P0;
}

export function mount(rootEl) {
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    logU: 3,        // log10(object distance in cm): 1 => 10 cm, 3 => 10 m
    d: 24,          // eyeball length (mm)
    Pg: 0,          // glasses power (D)
    autoFocus: false,
  };
  const state = { A: 0, blur: 0, v: Infinity, ray: null, condition: 'normal', t: 0 };
  const objectMM = () => Math.pow(10, params.logU) * 10;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));

  function condition() {
    if (params.d > 24.49) return 'myopia';
    if (params.d < 23.51) return 'hyperopia';
    return 'normal';
  }
  const condName = (c) => (c === 'myopia' ? T('Myopia (short-sighted)', 'Miopi (rabun jauh)')
    : c === 'hyperopia' ? T('Hyperopia (long-sighted)', 'Hipermetropi (rabun dekat)') : T('Normal eye', 'Mata normal'));

  function step(dt) {
    state.t += dt;
    const u = objectMM();
    let targetA = 0;
    if (params.autoFocus) targetA = clamp(accommodationNeeded(u, params.Pg, params.d), 0, ACCOM_MAX);
    // the eye takes a moment to accommodate
    state.A += (targetA - state.A) * Math.min(1, dt * 6);
    if (Math.abs(targetA - state.A) < 0.005) state.A = targetA;
    const r = traceEye(u, params.Pg, state.A, params.d);
    state.ray = r; state.blur = r.blur; state.v = r.v; state.condition = condition();
  }

  function fmtDist(mm) {
    if (mm >= 1000) return `${(mm / 1000).toFixed(mm >= 5000 ? 0 : 1)} m`;
    return `${Math.round(mm / 10)} cm`;
  }
  const fmtD = (p) => `${p > 0 ? '+' : p < 0 ? '−' : ''}${Math.abs(p).toFixed(2)} D`;

  function lensShape(ctx, x, cy, halfH, power, scale) {
    // Convex bulges outward, concave is thin in the middle; bulge grows with |power|.
    const b = clamp(Math.abs(power) * 0.9, 0, 6) * scale;
    const w = 2.2 * scale;
    ctx.beginPath();
    if (power >= 0) {
      ctx.moveTo(x, cy - halfH);
      ctx.quadraticCurveTo(x + w + b, cy, x, cy + halfH);
      ctx.quadraticCurveTo(x - w - b, cy, x, cy - halfH);
    } else {
      ctx.moveTo(x - w - b, cy - halfH);
      ctx.lineTo(x + w + b, cy - halfH);
      ctx.quadraticCurveTo(x + w - b * 0.9, cy, x + w + b, cy + halfH);
      ctx.lineTo(x - w - b, cy + halfH);
      ctx.quadraticCurveTo(x - w + b * 0.9, cy, x - w - b, cy - halfH);
    }
    ctx.closePath();
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10 || !state.ray) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const s = (W * 0.40) / 30;              // px per mm; a 28 mm eye plus cornea fits
    const xL = W * 0.52;                    // eye lens x
    const cy = H * 0.40;                    // optical axis
    const d = params.d;
    const xR = xL + d * s;                  // retina x
    const xG = xL - VERTEX * s;             // glasses x
    const eyeRy = 11.5 * s;
    const font = (px, bold) => `${bold ? 'bold ' : ''}${Math.max(10, Math.round(px))}px system-ui, -apple-system, Roboto, sans-serif`;
    const small = W * 0.021;

    // Optical axis
    ctx.strokeStyle = 'rgba(148,163,184,0.35)'; ctx.lineWidth = 1; ctx.setLineDash([4, 6]);
    ctx.beginPath(); ctx.moveTo(W * 0.02, cy); ctx.lineTo(W * 0.98, cy); ctx.stroke(); ctx.setLineDash([]);

    // Eyeball: sclera (white) with retina (red arc) on the right, cornea bulge on the left
    const ecx = xL + (d * s) / 2;
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath(); ctx.ellipse(ecx, cy, (d * s) / 2 + 2 * s, eyeRy, 0, 0, Math.PI * 2); ctx.fill();
    // vitreous tint
    ctx.fillStyle = 'rgba(186,230,253,0.35)';
    ctx.beginPath(); ctx.ellipse(ecx, cy, (d * s) / 2 + 2 * s, eyeRy, 0, 0, Math.PI * 2); ctx.fill();
    // cornea
    ctx.fillStyle = 'rgba(125,211,252,0.55)';
    ctx.beginPath(); ctx.ellipse(xL - 1.5 * s, cy, 4.5 * s, 7 * s, 0, Math.PI / 2, Math.PI * 1.5); ctx.fill();
    // retina
    ctx.strokeStyle = '#f87171'; ctx.lineWidth = Math.max(3, 0.9 * s);
    ctx.beginPath(); ctx.ellipse(ecx, cy, (d * s) / 2 + 2 * s, eyeRy, 0, -Math.PI * 0.42, Math.PI * 0.42); ctx.stroke();
    // outline
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(ecx, cy, (d * s) / 2 + 2 * s, eyeRy, 0, 0, Math.PI * 2); ctx.stroke();
    // iris
    ctx.fillStyle = '#7c5a2b';
    ctx.fillRect(xL - 0.6 * s, cy - 7.5 * s, 1.2 * s, 4.2 * s);
    ctx.fillRect(xL - 0.6 * s, cy + 3.3 * s, 1.2 * s, 4.2 * s);
    // eye lens, bulging with accommodation
    const bulge = 1 + state.A / ACCOM_MAX * 0.8;
    ctx.fillStyle = 'rgba(96,165,250,0.85)';
    ctx.beginPath(); ctx.ellipse(xL, cy, 1.6 * s * bulge, 4.6 * s, 0, 0, Math.PI * 2); ctx.fill();

    // Labels on the eye
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(small); ctx.textAlign = 'center';
    ctx.fillText(T('retina', 'retina'), xR + 1.6 * s, cy - eyeRy - small * 0.6);
    ctx.fillText(T('lens', 'lensa'), xL, cy - eyeRy - small * 0.6);
    // eyeball length dimension line
    const dimY = cy + eyeRy + small * 1.3;
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(xL, dimY); ctx.lineTo(xR, dimY); ctx.moveTo(xL, dimY - 5); ctx.lineTo(xL, dimY + 5); ctx.moveTo(xR, dimY - 5); ctx.lineTo(xR, dimY + 5); ctx.stroke();
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`${d.toFixed(1)} mm`, (xL + xR) / 2, dimY + small * 1.1);

    // Object: an arrow at a compressed distance (far = further left)
    const u = objectMM();
    const frac = clamp((params.logU - 1) / 2, 0, 1);                 // 0 near, 1 far
    const xO = xG - W * (0.06 + 0.24 * frac);          // never nearer than ~6 % of the width to the left edge
    const arrowH = eyeRy * (0.6 + 0.6 * (1 - frac));
    ctx.strokeStyle = '#34d399'; ctx.lineWidth = 3; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(xO, cy); ctx.lineTo(xO, cy - arrowH); ctx.stroke();
    ctx.fillStyle = '#34d399';
    ctx.beginPath(); ctx.moveTo(xO, cy - arrowH - 8); ctx.lineTo(xO - 7, cy - arrowH + 4); ctx.lineTo(xO + 7, cy - arrowH + 4); ctx.closePath(); ctx.fill();
    ctx.lineCap = 'butt';
    ctx.fillStyle = '#a7f3d0'; ctx.font = font(small); ctx.textAlign = 'center';
    const farTxt = T('(far away)', '(sangat jauh)');
    const xOl = Math.max(xO, ctx.measureText(farTxt).width / 2 + 4);   // labels stay on the canvas
    ctx.fillText(T('object', 'benda'), xOl, cy + small * 1.4);
    ctx.fillText(fmtDist(u), xOl, cy + small * 2.6);
    if (frac > 0.85) { ctx.fillStyle = '#6ee7b7'; ctx.fillText(farTxt, xOl, cy + small * 3.8); }

    // Glasses lens
    const gHalf = 8.5 * s;
    if (Math.abs(params.Pg) > 1e-6) {
      ctx.fillStyle = 'rgba(56,189,248,0.35)'; ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 1.5;
      lensShape(ctx, xG, cy, gHalf, params.Pg, s); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#7dd3fc'; ctx.font = font(small); ctx.textAlign = 'center';
      // labels under the lens (above it they collide with the readout); one line on narrow canvases
      const kind = params.Pg > 0 ? T('convex', 'cembung') : T('concave', 'cekung');
      if (W < 640) ctx.fillText(`${fmtD(params.Pg)} ${kind}`, xG, cy + gHalf + Math.max(10, small) * 1.2);
      else { ctx.fillText(fmtD(params.Pg), xG, cy + gHalf + small * 1.4); ctx.fillText(kind, xG, cy + gHalf + small * 2.5); }
    } else {
      ctx.strokeStyle = 'rgba(56,189,248,0.35)'; ctx.setLineDash([3, 4]); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(xG, cy - gHalf); ctx.lineTo(xG, cy + gHalf); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(125,211,252,0.6)'; ctx.font = font(small); ctx.textAlign = 'center';
      ctx.fillText(T('no glasses', 'tanpa kacamata'), xG, cy + gHalf + Math.max(10, small) * 1.2);
    }

    // Rays: marginal (top/bottom) and axial, from the on-axis object point
    const r = state.ray;
    const onRetina = r.blur < 0.05;
    const rayCol = onRetina ? '#fbbf24' : '#fb923c';
    ctx.strokeStyle = rayCol; ctx.lineWidth = 1.6;
    const xEnd = Math.min(W * 0.98, xR + 0.9 * s);
    for (const sign of [1, -1]) {
      const yG = cy - sign * r.hG * s;
      const yE = cy - sign * r.hE * s;
      ctx.beginPath();
      ctx.moveTo(xO, cy); ctx.lineTo(xG, yG); ctx.lineTo(xL, yE);
      // inside the eye: slope s2 (physical) -> px slope same because scale is isotropic
      const yAtEnd = yE - sign * r.s2 * (xEnd - xL);
      ctx.lineTo(xEnd, yAtEnd);
      ctx.stroke();
      // if the focus lies beyond the retina, extend as dashed to show where rays would meet
      if (Number.isFinite(r.v) && r.v > d && r.v * s < W) {
        const xV = xL + r.v * s;
        if (xV > xEnd && xV < W * 0.99) {
          ctx.setLineDash([3, 4]); ctx.strokeStyle = 'rgba(251,146,60,0.6)';
          ctx.beginPath(); ctx.moveTo(xEnd, yAtEnd); ctx.lineTo(xV, cy); ctx.stroke();
          ctx.setLineDash([]); ctx.strokeStyle = rayCol;
        }
      }
    }
    ctx.beginPath(); ctx.moveTo(xO, cy); ctx.lineTo(xEnd, cy); ctx.stroke();

    // Image point
    if (Number.isFinite(r.v) && r.v > 0 && xL + r.v * s < W * 0.99) {
      const xV = xL + r.v * s;
      ctx.fillStyle = onRetina ? '#22c55e' : '#ef4444';
      ctx.beginPath(); ctx.arc(xV, cy, 5, 0, Math.PI * 2); ctx.fill();
    }
    // Blur disc on the retina (drawn 1:1 in model scale, min 2 px)
    if (!onRetina) {
      ctx.fillStyle = 'rgba(239,68,68,0.75)';
      const bh = Math.max(2, r.blur * s);
      ctx.fillRect(xR - 2, cy - bh / 2, 5, bh);
    }

    // Readout panel (top-left)
    ctx.textAlign = 'left';
    const lx = W * 0.02, ly = H * 0.045, lh = Math.max(10, small) * 1.3;   // font() never goes below 10 px
    ctx.font = font(small * 1.1, true); ctx.fillStyle = '#e2e8f0';
    ctx.fillText(condName(state.condition), lx, ly);
    ctx.font = font(small); ctx.fillStyle = '#cbd5e1';
    let where;
    if (onRetina) where = T('Image on the retina: sharp', 'Bayangan di retina: tajam');
    else if (!Number.isFinite(r.v) || r.v < 0) where = T('Rays never meet: focus far behind retina', 'Sinar tak bertemu: fokus jauh di belakang retina');
    else if (r.v < d) where = T(`Focus ${(d - r.v).toFixed(1)} mm in front of retina`, `Fokus ${(d - r.v).toFixed(1)} mm di depan retina`);
    else where = T(`Focus ${(r.v - d).toFixed(1)} mm behind retina`, `Fokus ${(r.v - d).toFixed(1)} mm di belakang retina`);
    ctx.fillText(where, lx, ly + lh);
    const blurWord = r.blur < 0.05 ? T('sharp', 'tajam') : r.blur < 0.3 ? T('slightly blurry', 'agak kabur') : T('blurry', 'kabur');
    ctx.fillText(T(`Blur disc: ${r.blur.toFixed(2)} mm (${blurWord})`, `Cakram kabur: ${r.blur.toFixed(2)} mm (${blurWord})`), lx, ly + 2 * lh);
    ctx.fillText(T(`Eye power: ${EYE_P0.toFixed(1)} + ${state.A.toFixed(1)} (focus) D`, `Kekuatan mata: ${EYE_P0.toFixed(1)} + ${state.A.toFixed(1)} (akomodasi) D`), lx, ly + 3 * lh);

    // "What the eye sees": a letter E with blur, bottom strip
    const boxY = H * 0.70, boxH = H * 0.27, boxX = W * 0.02, boxW = W * 0.96;
    ctx.fillStyle = '#111c33';
    ctx.beginPath(); ctx.roundRect(boxX, boxY, boxW, boxH, 10); ctx.fill();
    ctx.fillStyle = '#94a3b8'; ctx.font = font(small); ctx.textAlign = 'left';
    ctx.fillText(T('What the eye sees:', 'Yang dilihat mata:'), boxX + 12, boxY + small * 1.4);
    const letterSize = boxH * 0.72;
    const lxC = W * 0.5, lyC = boxY + boxH * 0.56;
    const blurPx = clamp(r.blur * s * 1.6, 0, boxH * 0.45);
    ctx.font = `bold ${Math.round(letterSize)}px system-ui, -apple-system, Roboto, sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    if (blurPx < 0.8) {
      ctx.fillStyle = '#f8fafc';
      ctx.fillText('E', lxC, lyC);
    } else {
      const n = 14;
      ctx.fillStyle = `rgba(248,250,252,${(1.1 / n).toFixed(3)})`;
      for (let ring = 1; ring <= 2; ring++) for (let i = 0; i < n / 2; i++) {
        const a = (i / (n / 2)) * Math.PI * 2 + ring;
        const rr = blurPx * (ring / 2);
        ctx.fillText('E', lxC + Math.cos(a) * rr, lyC + Math.sin(a) * rr);
      }
      ctx.fillStyle = 'rgba(248,250,252,0.25)';
      ctx.fillText('E', lxC, lyC);
    }
    ctx.textBaseline = 'alphabetic';
    // glasses hint (right side of box)
    ctx.textAlign = 'right'; ctx.font = font(small); ctx.fillStyle = '#7dd3fc';
    ctx.fillText(T(`Glasses: ${fmtD(params.Pg)}`, `Kacamata: ${fmtD(params.Pg)}`), boxX + boxW - 12, boxY + small * 1.4);
    ctx.textAlign = 'left';
  }

  // Controls
  const distS = slider({
    label: T('Object distance', 'Jarak benda'), key: 'dist', min: 1, max: 3, step: 0.01, value: params.logU,
    format: (v) => fmtDist(Math.pow(10, v) * 10),
    onInput: (v) => { params.logU = v; },
  });
  const lenS = slider({
    label: T('Eyeball length (mm)', 'Panjang bola mata (mm)'), key: 'eye', min: 21, max: 27.5, step: 0.1, value: params.d,
    format: (v) => v.toFixed(1),
    onInput: (v) => { params.d = v; },
  });
  const pgS = slider({
    label: T('Glasses power (D)', 'Kekuatan kacamata (D)'), key: 'lens', min: -6, max: 6, step: 0.25, value: params.Pg,
    format: (v) => fmtD(v),
    onInput: (v) => { params.Pg = v; },
  });
  const afT = toggle({ label: T('Auto-focus (accommodation, up to 8 D)', 'Fokus otomatis (akomodasi, maks. 8 D)'), key: 'focus', value: false, onChange: (v) => { params.autoFocus = v; } });
  const preset = (label, dmm) => button({ label, onClick: () => { lenS.apply(dmm); } });
  const normalB = preset(T('Normal (24 mm)', 'Normal (24 mm)'), 24);
  const myopiaB = preset(T('Myopia (26 mm)', 'Miopi (26 mm)'), 26);
  const hyperB = preset(T('Hyperopia (22 mm)', 'Hipermetropi (22 mm)'), 22);
  const noGlass = button({ label: T('Remove glasses', 'Lepas kacamata'), onClick: () => pgS.apply(0) });
  const farB = button({ label: T('Look far (10 m)', 'Lihat jauh (10 m)'), onClick: () => distS.apply(3) });
  const nearB = button({ label: T('Read (25 cm)', 'Membaca (25 cm)'), onClick: () => distS.apply(Math.log10(25)) });
  ctrlPanel.append(distS.el, lenS.el, pgS.el, row(afT), row(normalB, myopiaB, hyperB), row(farB, nearB, noGlass));

  const lab = labPanel({
    title: 'Eye lab: which lens corrects it?',
    filename: 'eye-and-glasses-data.csv',
    columns: [
      { key: 'condition', label: 'Condition' },
      { key: 'eye', label: 'Eyeball (mm)', format: (v) => v.toFixed(1) },
      { key: 'dist', label: 'Object' },
      { key: 'lens', label: 'Glasses (D)', format: (v) => (v > 0 ? '+' : '') + v.toFixed(2) },
      { key: 'blur', label: 'Blur (mm)', format: (v) => v.toFixed(2) },
      { key: 'sharp', label: 'Sharp?' },
    ],
    procedure: [
      'Turn Auto-focus off and press "Look far". Set the eyeball to 24 mm with no glasses: record (the readout should say "sharp").',
      'Set the eyeball to 26 mm. Record the blur with no glasses, then slide the glasses power until the readout says "sharp" and record again.',
      'Repeat for 27 mm, 22 mm and 21 mm. Note the sign of the lens each time.',
      'Set 24 mm, no glasses, press "Read (25 cm)". Record the blur, then turn Auto-focus on and record again.',
      'Plot glasses power against eyeball length. Is it close to a straight line? How many dioptres per millimetre?',
    ],
    predict: 'Will a longer eyeball need a positive (convex) or a negative (concave) lens? About how many dioptres for each extra millimetre?',
    source: () => {
      if (!state.ray) return null;
      const c = state.condition;
      return {
        condition: c === 'myopia' ? 'myopia' : c === 'hyperopia' ? 'hyperopia' : 'normal',
        eye: params.d,
        dist: fmtDist(objectMM()),
        lens: params.Pg,
        blur: state.blur,
        sharp: state.blur < 0.05 ? 'yes' : 'no',
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
