import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

// Contact areas in cm².
const OBJECTS = [
  { id: 'pin', label: { en: 'Pin tip', id: 'Ujung jarum' }, areaCm2: 0.01 },
  { id: 'heel', label: { en: 'Stiletto heel', id: 'Hak sepatu runcing' }, areaCm2: 1 },
  { id: 'shoe', label: { en: 'Flat shoe', id: 'Sepatu datar' }, areaCm2: 200 },
  { id: 'snowshoe', label: { en: 'Snowshoe', id: 'Sepatu salju' }, areaCm2: 2500 },
];
const SAND_DEPTH_CM = 20;   // the sand bed sits on firm ground this far down

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const params = { object: 'shoe', force: 600, logArea: Math.log10(200), firmness: 2 /* kPa per cm */ };
  const state = { depthCm: 0 };

  const areaCm2 = () => Math.pow(10, params.logArea);
  const areaM2 = () => areaCm2() * 1e-4;
  const pressurePa = (F = params.force, A = areaM2()) => F / Math.max(1e-12, A);
  const targetDepth = (P = pressurePa()) => Math.min(SAND_DEPTH_CM, (P / 1000) / Math.max(0.01, params.firmness));
  const objectDef = () => OBJECTS.find((o) => o.id === params.object);

  function fmtArea(cm2) {
    if (cm2 < 1) return `${(cm2 * 100).toFixed(cm2 * 100 < 10 ? 1 : 0)} mm²`;
    if (cm2 >= 1000) return `${(cm2 * 1e-4).toFixed(2)} m²`;
    return `${cm2 < 10 ? cm2.toFixed(1) : cm2.toFixed(0)} cm²`;
  }
  function fmtPa(P) {
    if (P >= 1e6) return `${(P / 1e6).toFixed(P >= 1e7 ? 0 : 2)} MPa`;
    if (P >= 1000) return `${(P / 1000).toFixed(P >= 1e5 ? 0 : 1)} kPa`;
    return `${P.toFixed(0)} Pa`;
  }
  function fmtNum(n) { return n >= 1e6 ? n.toExponential(2) : n.toLocaleString('en-US', { maximumFractionDigits: 0 }); }

  function step(dt) {
    const tgt = targetDepth();
    state.depthCm += (tgt - state.depthCm) * Math.min(1, 5 * dt);
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    const fs = clamp(W * 0.021, 10, 16);
    const font = (s, bold) => `${bold ? 'bold ' : ''}${Math.round(s)}px system-ui, -apple-system, Roboto, sans-serif`;
    const P = pressurePa();
    const A = areaCm2();

    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Scene: sand bed on the left 62 % of the canvas, comparison strip on the right.
    const sceneW = W * 0.62;
    const surfaceY = H * 0.56;
    const bottomY = H * 0.94;
    const pxPerCm = (bottomY - surfaceY) / SAND_DEPTH_CM;   // vertical scale
    // Horizontal scale: 50 cm of snowshoe spans ~70 % of the scene width.
    const pxPerCmX = sceneW * 0.7 / 50;
    const cx = sceneW * 0.5;

    // Sand
    ctx.fillStyle = '#c2a36b';
    ctx.fillRect(0, surfaceY, sceneW, bottomY - surfaceY);
    ctx.fillStyle = '#4b5563';
    ctx.fillRect(0, bottomY, sceneW, H - bottomY);
    // depth ruler on the left
    ctx.strokeStyle = 'rgba(15,23,42,0.6)'; ctx.fillStyle = '#1f2937'; ctx.font = font(fs * 0.8); ctx.textAlign = 'left'; ctx.lineWidth = 1;
    for (let cm = 0; cm <= SAND_DEPTH_CM; cm += 5) {
      const y = surfaceY + cm * pxPerCm;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(sceneW * 0.03, y); ctx.stroke();
      ctx.fillText(`${cm} cm`, sceneW * 0.035, y + fs * 0.35);
    }

    // The object: foot plate of width sqrt(A) (to scale, min 2 px) pressed into the sand.
    const sideCm = Math.sqrt(A);
    const plateW = Math.max(2, sideCm * pxPerCmX);
    const d = state.depthCm;
    const plateBottom = surfaceY + d * pxPerCm;
    const plateH = clamp(H * 0.035, 6, 20);
    // sand bulge / crater around the plate
    if (d > 0.05) {
      ctx.fillStyle = '#0b1220';
      ctx.beginPath();
      ctx.moveTo(cx - plateW / 2 - 4, surfaceY);
      ctx.lineTo(cx - plateW / 2, plateBottom);
      ctx.lineTo(cx + plateW / 2, plateBottom);
      ctx.lineTo(cx + plateW / 2 + 4, surfaceY);
      ctx.closePath(); ctx.fill();
    }
    const obj = objectDef();
    // column from plate up to the weight
    const colW = Math.max(plateW, clamp(W * 0.012, 6, 14));
    const weightH = clamp(H * 0.07 + H * 0.12 * Math.sqrt(params.force / 1000), 16, H * 0.22);
    const weightW = clamp(W * 0.08 + W * 0.1 * Math.sqrt(params.force / 1000), 40, sceneW * 0.4);
    const weightBottom = plateBottom - plateH - H * 0.06;
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(cx - plateW / 2, plateBottom - plateH, plateW, plateH);
    if (obj.id === 'pin') {
      // tapered pin
      ctx.beginPath(); ctx.moveTo(cx - colW, weightBottom); ctx.lineTo(cx + colW, weightBottom); ctx.lineTo(cx + 1, plateBottom); ctx.lineTo(cx - 1, plateBottom); ctx.closePath(); ctx.fill();
    } else if (obj.id === 'heel') {
      ctx.fillRect(cx - colW / 2, weightBottom, colW, plateBottom - weightBottom);
      ctx.fillStyle = '#ef4444';
      ctx.beginPath(); ctx.roundRect(cx - colW * 2, weightBottom - 2, colW * 7, H * 0.04, 6); ctx.fill();
    } else if (obj.id === 'snowshoe') {
      ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.ellipse(cx, plateBottom - plateH - H * 0.02, plateW / 2, H * 0.02, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.fillRect(cx - colW / 2, weightBottom, colW, plateBottom - plateH - weightBottom);
    } else {
      ctx.fillRect(cx - colW / 2, weightBottom, colW, plateBottom - plateH - weightBottom);
      ctx.fillStyle = '#ef4444';
      ctx.beginPath(); ctx.roundRect(cx - plateW / 2, plateBottom - plateH - H * 0.05, plateW, H * 0.05, [8, 8, 0, 0]); ctx.fill();
    }
    // Weight block
    ctx.fillStyle = '#8b5cf6'; ctx.strokeStyle = '#c4b5fd'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(cx - weightW / 2, weightBottom - weightH, weightW, weightH, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.font = font(fs * 1.1, true); ctx.textAlign = 'center';
    ctx.fillText(`F = ${params.force.toFixed(0)} N`, cx, weightBottom - weightH / 2 + fs * 0.4);
    // force arrow above the block
    const arrowTop = weightBottom - weightH - H * 0.14, arrowBot = weightBottom - weightH - 6;
    ctx.strokeStyle = '#ef4444'; ctx.fillStyle = '#ef4444'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(cx, arrowTop); ctx.lineTo(cx, arrowBot - 8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, arrowBot); ctx.lineTo(cx - 7, arrowBot - 11); ctx.lineTo(cx + 7, arrowBot - 11); ctx.closePath(); ctx.fill();

    // Contact area label under the plate
    ctx.fillStyle = '#1f2937'; ctx.font = font(fs * 0.9, true); ctx.textAlign = 'center';
    const aLabelY = Math.min(bottomY - 4, plateBottom + fs * 1.4);
    ctx.fillText(`A = ${fmtArea(A)}`, cx, aLabelY);
    // depth marker on the right of the plate
    if (d > 0.05) {
      const mx = cx + Math.max(plateW / 2, weightW / 2) + fs;
      ctx.strokeStyle = '#1e3a8a'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(mx, surfaceY); ctx.lineTo(mx, plateBottom); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(mx - 5, surfaceY); ctx.lineTo(mx + 5, surfaceY); ctx.moveTo(mx - 5, plateBottom); ctx.lineTo(mx + 5, plateBottom); ctx.stroke();
      ctx.fillStyle = '#1e3a8a'; ctx.textAlign = 'left'; ctx.font = font(fs * 0.9, true);
      ctx.fillText(`${d.toFixed(1)} cm`, mx + 6, (surfaceY + plateBottom) / 2 + fs * 0.35);
    }

    // Readout (top-left)
    ctx.textAlign = 'left';
    const px = W * 0.02, lh = fs * 1.35;
    let y = fs * 1.4;
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs, true);
    const custom = Math.abs(params.logArea - Math.log10(obj.areaCm2)) > 0.011;
    ctx.fillText(T(obj.label.en, obj.label.id) + (custom ? T(' (custom area)', ' (luas diubah)') : ''), px, y); y += lh;
    ctx.font = font(fs); ctx.fillStyle = '#cbd5e1';
    ctx.fillText(`A = ${fmtArea(A)} = ${areaM2().toPrecision(3)} m²`, px, y); y += lh;
    ctx.fillText(`P = F / A = ${params.force.toFixed(0)} / ${areaM2().toPrecision(3)}`, px, y); y += lh;
    ctx.fillStyle = '#4ade80'; ctx.font = font(fs * 1.05, true);
    ctx.fillText(`P = ${fmtNum(P)} Pa = ${fmtPa(P)}`, px, y); y += lh;
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(fs);
    const full = targetDepth() >= SAND_DEPTH_CM - 1e-6;
    ctx.fillText(`${T('Sink depth', 'Kedalaman')} = P / ${T('firmness', 'kekerasan')} = ${full ? T('hits the bottom (20 cm)', 'sampai dasar (20 cm)') : `${targetDepth().toFixed(2)} cm`}`, px, y); y += lh;
    ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.85);
    ctx.fillText(`${T('Ground', 'Tanah')}: ${params.firmness.toFixed(1)} kPa ${T('per cm of depth', 'per cm kedalaman')}`, px, y);

    // Comparison strip (right): pressure of each object at the current force.
    const sx = sceneW + W * 0.02, sw = W - sx - W * 0.02;
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.beginPath(); ctx.roundRect(sx, H * 0.04, sw, H * 0.92, 10); ctx.fill();
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs * 0.95, true); ctx.textAlign = 'left';
    ctx.fillText(T(`Same force ${params.force.toFixed(0)} N on:`, `Gaya sama ${params.force.toFixed(0)} N pada:`), sx + fs * 0.6, H * 0.04 + fs * 1.5);
    const rowH = (H * 0.92 - fs * 2.6) / OBJECTS.length;
    const maxLog = Math.log10(pressurePa(params.force, OBJECTS[0].areaCm2 * 1e-4)) + 0.2;
    const minLog = Math.log10(pressurePa(params.force, OBJECTS[OBJECTS.length - 1].areaCm2 * 1e-4)) - 0.5;
    OBJECTS.forEach((o, i) => {
      const ry = H * 0.04 + fs * 2.4 + i * rowH;
      const Po = pressurePa(params.force, o.areaCm2 * 1e-4);
      const active = o.id === params.object;
      ctx.fillStyle = active ? '#fbbf24' : '#cbd5e1'; ctx.font = font(fs * 0.9, active); ctx.textAlign = 'left';
      ctx.fillText(`${T(o.label.en, o.label.id)} · ${fmtArea(o.areaCm2)}`, sx + fs * 0.6, ry + fs);
      // log-scale bar
      const frac = clamp((Math.log10(Math.max(1, Po)) - minLog) / Math.max(0.1, maxLog - minLog), 0.03, 1);
      const bx = sx + fs * 0.6, bw = (sw - fs * 1.2) * frac, by = ry + fs * 1.4, bh = clamp(rowH * 0.28, 6, 18);
      ctx.fillStyle = active ? '#f59e0b' : '#475569';
      ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 4); ctx.fill();
      ctx.fillStyle = active ? '#fde68a' : '#94a3b8'; ctx.font = font(fs * 0.85);
      ctx.fillText(fmtPa(Po), bx, by + bh + fs * 1.05);
      const dd = Math.min(SAND_DEPTH_CM, Po / 1000 / Math.max(0.01, params.firmness));
      ctx.textAlign = 'right';
      ctx.fillText(dd >= SAND_DEPTH_CM ? T('sinks to bottom', 'sampai dasar') : `${T('sinks', 'tenggelam')} ${dd.toFixed(dd < 1 ? 2 : 1)} cm`, sx + sw - fs * 0.6, by + bh + fs * 1.05);
    });
    ctx.fillStyle = '#64748b'; ctx.font = font(fs * 0.75); ctx.textAlign = 'left';
    ctx.fillText(T('bars: log scale', 'batang: skala log'), sx + fs * 0.6, H * 0.96 - fs * 0.3);
    ctx.textAlign = 'left';
  }

  // Controls
  const objSel = select({
    label: 'Object', key: 'object',
    options: OBJECTS.map((o) => ({ value: o.id, label: `${o.label.en} / ${o.label.id} (${o.areaCm2 < 1 ? `${o.areaCm2 * 100} mm²` : `${o.areaCm2} cm²`})` })),
    value: params.object,
    onChange: (v) => {
      const o = OBJECTS.find((k) => k.id === v);
      if (!o) return;
      params.object = v;
      areaS.value = Math.log10(o.areaCm2);
      params.logArea = Math.log10(o.areaCm2);
    },
  });
  const forceS = slider({ label: 'Force F (N)', key: 'force', min: 5, max: 1000, step: 5, value: params.force, format: (v) => v.toFixed(0), onInput: (v) => { params.force = v; } });
  const areaS = slider({
    label: 'Contact area A', key: 'area', min: -2, max: 4, step: 0.02, value: params.logArea,
    format: (v) => fmtArea(Math.pow(10, v)),
    onInput: (v) => { params.logArea = v; },
  });
  const firmS = slider({ label: 'Ground firmness (kPa per cm)', key: 'firmness', min: 0.5, max: 20, step: 0.5, value: params.firmness, format: (v) => v.toFixed(1), onInput: (v) => { params.firmness = v; } });
  const personB = button({ label: 'Person: 600 N', onClick: () => forceS.apply(600) });
  const thumbB = button({ label: 'Thumb push: 10 N', onClick: () => forceS.apply(10) });
  ctrlPanel.append(objSel.el, forceS.el, areaS.el, firmS.el, row(personB, thumbB));

  const lab = labPanel({
    title: 'Pressure lab — P = F/A',
    filename: 'pressure-solids-data.csv',
    columns: [
      { key: 'object', label: 'Object' },
      { key: 'F', label: 'F (N)', format: (v) => v.toFixed(0) },
      { key: 'A_cm2', label: 'A (cm²)', format: (v) => v < 1 ? v.toFixed(3) : v.toFixed(1) },
      { key: 'A_m2', label: 'A (m²)', format: (v) => v.toPrecision(3) },
      { key: 'P_Pa', label: 'P (Pa)', format: (v) => v.toFixed(0) },
      { key: 'P_kPa', label: 'P (kPa)', format: (v) => v.toFixed(2) },
      { key: 'depth', label: 'Depth (cm)', format: (v) => v.toFixed(2) },
    ],
    procedure: [
      'Set the force to 600 N. Select the snowshoe and record.',
      'Keep 600 N and record the flat shoe, the heel and the pin tip.',
      'Select the flat shoe. Record at 300 N, 600 N and 900 N. How does P change with F?',
      'Keep 600 N and use the area slider to record at 100 cm², 200 cm² and 400 cm². How does P change with A?',
      'Check each row: does F ÷ A (in m²) give the P column?',
    ],
    predict: 'If the area is made 10 times smaller with the same force, how many times bigger will the pressure be?',
    source: () => ({
      object: objectDef().label.en,
      F: params.force,
      A_cm2: areaCm2(),
      A_m2: areaM2(),
      P_Pa: pressurePa(),
      P_kPa: pressurePa() / 1000,
      depth: targetDepth(),
    }),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
