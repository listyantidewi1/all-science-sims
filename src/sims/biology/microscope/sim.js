import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';

const SLIDES = {
  onion: { name: 'Onion epidermis', cellType: 'rect', cellSize: 80, color: '#fed7aa', stroke: '#9a3412' },
  stem:  { name: 'Plant stem cross-section', cellType: 'circles', cellSize: 30, color: '#86efac', stroke: '#166534' },
  blood: { name: 'Blood smear', cellType: 'discs', cellSize: 22, color: '#dc2626', stroke: '#7f1d1d' },
  paramecium: { name: 'Paramecium (protist)', cellType: 'oval', cellSize: 110, color: '#a7f3d0', stroke: '#065f46' },
  cheek: { name: 'Cheek epithelial cells', cellType: 'blob', cellSize: 60, color: '#fda4af', stroke: '#9f1239' },
  pondwater: { name: 'Pond water (mixed)', cellType: 'mixed', cellSize: 40, color: '#7dd3fc', stroke: '#0c4a6e' },
};

const OBJECTIVES = [
  { mag: 4,  name: '4×' },
  { mag: 10, name: '10×' },
  { mag: 40, name: '40×' },
  { mag: 100, name: '100× oil' },
];
const OCULAR = 10;

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const params = {
    slideKey: 'onion',
    objIdx: 0,
    focus: 0.5,         // 0..1, optimal is 0.5
    panX: 0,
    panY: 0,
  };

  function totalMag() { return OCULAR * OBJECTIVES[params.objIdx].mag; }
  function blur() {
    const off = Math.abs(params.focus - 0.5);
    return off * (totalMag() / 50); // higher mag → shallower depth of field
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Eyepiece circle (the field of view)
    const cx = W / 2, cy = H / 2;
    const radius = Math.min(W, H) * 0.4;

    // Save: clip to circle, draw specimen, restore
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.clip();

    // Field illumination
    const grad = ctx.createRadialGradient(cx, cy, radius * 0.3, cx, cy, radius);
    grad.addColorStop(0, '#fffbeb');
    grad.addColorStop(1, '#fbbf24');
    ctx.fillStyle = grad;
    ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

    // Apply blur via filter if supported
    const b = blur();
    ctx.filter = b > 0.05 ? `blur(${b * 6}px)` : 'none';

    drawSpecimen(ctx, cx, cy, radius);

    ctx.filter = 'none';
    ctx.restore();

    // Microscope barrel ring
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 4, 0, Math.PI * 2);
    ctx.stroke();

    // Header info
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 60);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-mono)';
    ctx.fillText(SLIDES[params.slideKey].name, 16, 28);
    ctx.font = '11px var(--font-mono)';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(`Total mag: ${OCULAR}× ocular × ${OBJECTIVES[params.objIdx].mag}× obj = ${totalMag()}×`, 16, 46);
    ctx.fillStyle = b < 0.1 ? '#10b981' : '#ef4444';
    ctx.fillText(b < 0.1 ? 'in focus ✓' : 'out of focus — adjust the focus knob', 16, 62);

    // Hint
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Pick a slide and an objective; turn the focus knob until sharp.', 16, H - 12);
  }

  function drawSpecimen(ctx, cx, cy, R) {
    const slide = SLIDES[params.slideKey];
    const cellSize = slide.cellSize / 4 * Math.sqrt(totalMag());
    const tile = cellSize * 1.2;

    const x0 = cx - R, y0 = cy - R;
    const x1 = cx + R, y1 = cy + R;

    for (let y = y0; y < y1; y += tile) {
      for (let x = x0; x < x1; x += tile) {
        drawCell(ctx, x + tile / 2 + (Math.sin((x + y) * 0.1) * 4), y + tile / 2 + (Math.cos((x - y) * 0.07) * 4), cellSize / 2, slide);
      }
    }
  }

  function drawCell(ctx, cx, cy, r, slide) {
    if (slide.cellType === 'rect') {
      ctx.fillStyle = slide.color;
      ctx.fillRect(cx - r * 1.4, cy - r, r * 2.8, r * 2);
      ctx.strokeStyle = slide.stroke;
      ctx.lineWidth = 2;
      ctx.strokeRect(cx - r * 1.4, cy - r, r * 2.8, r * 2);
      // nucleus
      ctx.fillStyle = '#7c2d12';
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.3, 0, Math.PI * 2);
      ctx.fill();
    } else if (slide.cellType === 'circles') {
      ctx.fillStyle = slide.color;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = slide.stroke;
      ctx.stroke();
      // central vein/vacuole
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.4, 0, Math.PI * 2);
      ctx.fill();
    } else if (slide.cellType === 'discs') {
      ctx.fillStyle = slide.color;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = slide.stroke;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (slide.cellType === 'oval') {
      ctx.fillStyle = slide.color;
      ctx.beginPath();
      ctx.ellipse(cx, cy, r * 1.6, r * 0.7, Math.atan2(cy, cx), 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = slide.stroke;
      ctx.stroke();
      // cilia
      ctx.strokeStyle = slide.stroke;
      ctx.lineWidth = 1;
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        const x1 = cx + Math.cos(a) * r * 1.6;
        const y1 = cy + Math.sin(a) * r * 0.7;
        ctx.beginPath();
        ctx.moveTo(x1, y1); ctx.lineTo(x1 + Math.cos(a) * 6, y1 + Math.sin(a) * 6);
        ctx.stroke();
      }
    } else if (slide.cellType === 'blob') {
      ctx.fillStyle = slide.color;
      ctx.beginPath();
      ctx.moveTo(cx + r, cy);
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        const rr = r * (0.9 + 0.2 * Math.sin(a * 3 + cx));
        ctx.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
      }
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = slide.stroke;
      ctx.stroke();
      // nucleus
      ctx.fillStyle = slide.stroke;
      ctx.beginPath(); ctx.arc(cx, cy, r * 0.25, 0, Math.PI * 2); ctx.fill();
    } else { // mixed
      const choice = ((cx + cy) | 0) % 3;
      if (choice === 0) drawCell(ctx, cx, cy, r, { ...slide, cellType: 'oval' });
      else if (choice === 1) drawCell(ctx, cx, cy, r, { ...slide, cellType: 'circles' });
      else drawCell(ctx, cx, cy, r * 0.6, { ...slide, cellType: 'discs' });
    }
  }

  // controls
  const slideSel = select({
    label: 'Slide',
    options: Object.entries(SLIDES).map(([k, v]) => ({ value: k, label: v.name })),
    value: params.slideKey,
    onChange: (v) => { params.slideKey = v; },
  });
  const objSel = select({
    label: 'Objective',
    options: OBJECTIVES.map((o, i) => ({ value: String(i), label: o.name })),
    value: String(params.objIdx),
    onChange: (v) => { params.objIdx = Number(v); params.focus = 0.5 + (Math.random() - 0.5) * 0.4; focusS.value = params.focus; },
  });
  const focusS = slider({ label: 'Focus knob', min: 0, max: 1, step: 0.005, value: params.focus, format: (v) => v.toFixed(2),
    onInput: (v) => { params.focus = v; } });
  const autoB = button({ label: 'Auto-focus', primary: true, onClick: () => {
    // animate toward 0.5
    const start = params.focus;
    const t0 = performance.now();
    const dur = 600;
    function tick() {
      const u = Math.min(1, (performance.now() - t0) / dur);
      params.focus = start + (0.5 - start) * u;
      focusS.value = params.focus;
      if (u < 1) requestAnimationFrame(tick);
    }
    tick();
  } });
  ctrlPanel.append(slideSel.el, objSel.el, focusS.el, row(autoB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
