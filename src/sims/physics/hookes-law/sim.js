import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { hoverProbe, drawCrosshair } from '../../../lib/chart.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';

const g = 9.8;
const SPRINGS = [
  { name: 'Soft',   k: 20,  color: '#0ea5e9' },
  { name: 'Medium', k: 80,  color: '#10b981' },
  { name: 'Stiff',  k: 200, color: '#fbbf24' },
];

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    activeIdx: 1,
    mass: 1.0,
    elasticLimit: 0.6, // m
  };

  let chartRect = null;

  function stretchOf(spring, force) {
    // Linear up to the elastic-limit force; then sub-linear (real spring softening).
    const elasticForce = spring.k * params.elasticLimit;
    if (force <= elasticForce) return force / spring.k;
    return params.elasticLimit + Math.sqrt((force - elasticForce) / spring.k) * 0.3;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const halfW = W * 0.4;

    // Spring rig on the left
    drawSpring(ctx, 30, 30, halfW - 60, H - 60);

    // Chart on the right
    const cx = halfW + 30, cy = 30, cw = W - cx - 30, ch = H - 60;
    chartRect = { x: cx, y: cy, w: cw, h: ch };
    drawChart(ctx, cx, cy, cw, ch);

    const probe = hover.get();
    if (probe) drawCrosshair(ctx, probe, { bounds: chartRect, color: '#fbbf24', label: probe.label });
  }

  function drawSpring(ctx, x, y, w, h) {
    const spring = SPRINGS[params.activeIdx];
    const force = params.mass * g;
    const x_m = stretchOf(spring, force); // stretch in meters
    const pixelsPerM = (h - 100) / 1.5; // scale 1.5m to most of the canvas
    const cx = x + w / 2;
    const topY = y + 20;
    const stretchPx = Math.min((h - 100), x_m * pixelsPerM);
    const massY = topY + stretchPx + 60;

    // Ceiling
    ctx.fillStyle = '#475569';
    ctx.fillRect(x + 20, topY - 8, w - 40, 8);

    // Spring coil
    const coils = 14;
    const coilWidth = 24;
    ctx.strokeStyle = spring.color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx, topY);
    const len = stretchPx + 50;
    for (let i = 0; i <= coils * 2; i++) {
      const u = i / (coils * 2);
      const yy = topY + u * len;
      const xx = cx + (i % 2 === 0 ? -coilWidth / 2 : coilWidth / 2);
      ctx.lineTo(xx, yy);
    }
    ctx.lineTo(cx, topY + len);
    ctx.stroke();

    // Mass
    const mw = 70, mh = 50;
    ctx.fillStyle = '#0ea5e9';
    ctx.fillRect(cx - mw / 2, massY, mw, mh);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(cx - mw / 2, massY, mw, mh);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.textAlign = 'center';
    ctx.fillText(`${params.mass.toFixed(2)} kg`, cx, massY + 30);
    ctx.textAlign = 'left';

    // Stretch ruler
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx + 80, topY); ctx.lineTo(cx + 80, massY);
    ctx.stroke();
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 11px var(--font-mono)';
    ctx.fillText(`x = ${(x_m * 100).toFixed(1)} cm`, cx + 86, (topY + massY) / 2);

    // Header
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 220, 50);
    ctx.fillStyle = spring.color;
    ctx.font = 'bold 14px var(--font-mono)';
    ctx.fillText(`${spring.name} spring  k = ${spring.k} N/m`, 16, 28);
    ctx.fillStyle = '#fff';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`F = mg = ${force.toFixed(2)} N`, 16, 46);
  }

  function drawChart(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('Force vs stretch', x + 6, y - 6);

    const Fmax = 200;
    const xMax = 1.2;
    const x2 = (xx) => x + (xx / xMax) * w;
    const y2 = (F) => y + h - (F / Fmax) * (h - 16) - 8;

    // gridlines
    ctx.strokeStyle = 'rgba(120,130,150,0.15)';
    for (let i = 0; i <= 6; i++) {
      const xx = (i / 6) * xMax;
      ctx.beginPath(); ctx.moveTo(x2(xx), y); ctx.lineTo(x2(xx), y + h); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`${(xx * 100).toFixed(0)}cm`, x2(xx) - 16, y + h + 14);
    }
    for (let F = 0; F <= 200; F += 50) {
      ctx.beginPath(); ctx.moveTo(x, y2(F)); ctx.lineTo(x + w, y2(F)); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.fillText(`${F}N`, x - 32, y2(F) + 3);
    }

    // Three spring lines
    for (let i = 0; i < SPRINGS.length; i++) {
      const sp = SPRINGS[i];
      const isActive = i === params.activeIdx;
      ctx.strokeStyle = sp.color + (isActive ? 'ff' : '88');
      ctx.lineWidth = isActive ? 2.5 : 1.5;
      ctx.beginPath();
      const N = 100;
      for (let s = 0; s <= N; s++) {
        const xx = (s / N) * xMax;
        // Inverse: F as a function of x
        let F;
        if (xx <= params.elasticLimit) F = sp.k * xx;
        else F = sp.k * params.elasticLimit + ((xx - params.elasticLimit) / 0.3) ** 2 * sp.k;
        const sx = x2(xx), sy = y2(Math.min(Fmax, F));
        if (s === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }

    // Elastic limit line
    ctx.strokeStyle = 'rgba(239,68,68,0.5)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(x2(params.elasticLimit), y); ctx.lineTo(x2(params.elasticLimit), y + h);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#ef4444';
    ctx.font = '10px var(--font-mono)';
    ctx.fillText('elastic limit', x2(params.elasticLimit) + 4, y + 16);

    // Current point
    const sp = SPRINGS[params.activeIdx];
    const F = params.mass * g;
    const xs = stretchOf(sp, F);
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(x2(xs), y2(F), 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = sp.color;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Hover the chart
  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    if (!chartRect) return null;
    const { x, y, w, h } = chartRect;
    if (sx < x || sx > x + w || sy < y || sy > y + h) return null;
    const xx = ((sx - x) / w) * 1.2;
    const sp = SPRINGS[params.activeIdx];
    let F;
    if (xx <= params.elasticLimit) F = sp.k * xx;
    else F = sp.k * params.elasticLimit + ((xx - params.elasticLimit) / 0.3) ** 2 * sp.k;
    return { x: sx, y: sy, label: [`x = ${(xx * 100).toFixed(1)} cm`, `F = ${F.toFixed(1)} N`] };
  });

  // Drag the mass to change weight
  const drag = dragHandle(cv.canvas, {
    hitTest(sx, sy) {
      const W = cv.width, H = cv.height;
      const halfW = W * 0.4;
      // Approximate: if cursor is in left half and below ceiling, drag mass
      if (sx > 50 && sx < halfW - 10 && sy > 80) return 'mass';
      return null;
    },
    onStart(_id, _sx, sy) { dragStartY = sy; dragStartMass = params.mass; },
    onDrag(_id, _sx, sy) {
      const dy = sy - dragStartY;
      params.mass = Math.max(0.1, Math.min(20, dragStartMass + dy / 30));
      mS.value = params.mass;
    },
    cursor: 'grab',
    hoverCursor: 'grab',
  });
  let dragStartY = 0, dragStartMass = 0;

  // controls
  const sprRow = document.createElement('div');
  sprRow.className = 'ctrl-row';
  for (let i = 0; i < SPRINGS.length; i++) {
    const sp = SPRINGS[i];
    const b = button({ label: `${sp.name} (${sp.k})`, onClick: () => { params.activeIdx = i; } });
    sprRow.appendChild(b.el);
  }
  const mS = slider({ label: 'Mass (kg)', min: 0.1, max: 20, step: 0.1, value: params.mass, format: (v) => v.toFixed(2),
    onInput: (v) => { params.mass = v; } });
  ctrlPanel.append(sprRow, mS.el);

  // Lab — F vs x to verify F = kx and read off k from the slope.
  const lab = labPanel({
    title: "Hooke's law lab — F = kx",
    filename: 'hookes-law-lab.csv',
    columns: [
      { key: 'spring', label: 'spring' },
      { key: 'm',      label: 'mass (kg)', format: (v) => v.toFixed(2) },
      { key: 'F',      label: 'F = mg (N)', format: (v) => v.toFixed(2) },
      { key: 'x',      label: 'stretch x (m)', format: (v) => v.toFixed(4) },
      { key: 'k_calc', label: 'F/x (N/m)',  format: (v) => v.toFixed(1) },
    ],
    procedure: [
      'Pick a spring. Set mass = 0.5 kg, record. Then 1.0, 1.5, 2.0, 2.5 kg.',
      'For each row: F = mg. Compute F/x; it should equal the spring constant k.',
      'Switch to a stiffer spring and repeat — same procedure, different k.',
      'Plot F (y) vs x (x). The slope is k.',
      'Push past the elastic limit (~60 cm) — the line bends. Why?',
    ],
    predict: 'If you double the mass, what happens to the stretch? Will F/x stay constant?',
    source: () => {
      const sp = SPRINGS[params.activeIdx];
      const F = params.mass * g;
      const x = stretchOf(sp, F);
      return {
        spring: sp.name,
        m: params.mass,
        F,
        x,
        k_calc: x > 1e-6 ? F / x : null,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); hover.destroy(); drag.destroy(); cv.destroy(); };
}
