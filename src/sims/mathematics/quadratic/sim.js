import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { hoverProbe, drawCrosshair } from '../../../lib/chart.js';
import { dragHandle } from '../../../lib/handle.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { a: 1, b: -3, c: -4 };
  let chart = null;

  function f(x) { return params.a * x * x + params.b * x + params.c; }
  function discriminant() { return params.b * params.b - 4 * params.a * params.c; }
  function roots() {
    const D = discriminant();
    if (D < 0) return null;
    const s = Math.sqrt(D);
    return [(-params.b - s) / (2 * params.a), (-params.b + s) / (2 * params.a)];
  }
  function vertex() {
    const x = -params.b / (2 * params.a);
    return { x, y: f(x) };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 50, padY = 30;
    const w = W - padX - 30, h = H - padY - 60;
    chart = { x: padX, y: padY, w, h };
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(padX, padY, w, h);

    const xMin = -10, xMax = 10;
    const yMin = -10, yMax = 10;
    const x2 = (x) => padX + ((x - xMin) / (xMax - xMin)) * w;
    const y2 = (y) => padY + h - ((y - yMin) / (yMax - yMin)) * h;

    // Axes
    ctx.strokeStyle = 'rgba(120,130,150,0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padX, y2(0)); ctx.lineTo(padX + w, y2(0));
    ctx.moveTo(x2(0), padY); ctx.lineTo(x2(0), padY + h);
    ctx.stroke();
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '10px var(--font-mono)';
    for (let x = -10; x <= 10; x += 2) {
      if (x === 0) continue;
      ctx.fillText(`${x}`, x2(x) - 6, y2(0) + 14);
    }
    for (let y = -10; y <= 10; y += 2) {
      if (y === 0) continue;
      ctx.fillText(`${y}`, x2(0) - 22, y2(y) + 4);
    }

    // Parabola
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    let started = false;
    for (let i = 0; i <= 400; i++) {
      const x = xMin + (i / 400) * (xMax - xMin);
      const y = f(x);
      if (y < yMin - 5 || y > yMax + 5) { started = false; continue; }
      const sx = x2(x), sy = y2(y);
      if (!started) { ctx.moveTo(sx, sy); started = true; } else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // Roots
    const rts = roots();
    if (rts) {
      for (const r of rts) {
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(x2(r), y2(0), 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 11px var(--font-mono)';
        ctx.fillText(`x = ${r.toFixed(3)}`, x2(r) + 10, y2(0) - 6);
      }
    }
    // Vertex
    const v = vertex();
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.arc(x2(v.x), y2(v.y), 8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px var(--font-mono)';
    ctx.fillText(`vertex (${v.x.toFixed(2)}, ${v.y.toFixed(2)})`, x2(v.x) + 10, y2(v.y) + 4);
    // Axis of symmetry
    ctx.strokeStyle = 'rgba(251,191,36,0.5)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(x2(v.x), padY); ctx.lineTo(x2(v.x), padY + h);
    ctx.stroke();
    ctx.setLineDash([]);

    // Header
    const D = discriminant();
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 380, 80);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`f(x) = ${formatA(params.a)}x² ${formatBC(params.b, 'x')} ${formatBC(params.c, '')}`, 16, 28);
    ctx.fillStyle = D > 0 ? '#10b981' : D < 0 ? '#ef4444' : '#fbbf24';
    ctx.fillText(`Δ = b² − 4ac = ${D.toFixed(3)}    ${D > 0 ? '(two real roots)' : D < 0 ? '(no real roots)' : '(one repeated root)'}`, 16, 46);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`x = (−b ± √Δ) / (2a) = (${(-params.b).toFixed(2)} ± √${D.toFixed(2)}) / ${(2 * params.a).toFixed(2)}`, 16, 64);
    if (rts) ctx.fillText(`Roots: x₁ = ${rts[0].toFixed(3)},  x₂ = ${rts[1].toFixed(3)}`, 16, 80);
    else ctx.fillText('Roots: complex (parabola does not cross x-axis)', 16, 80);

    const probe = hover.get();
    if (probe) drawCrosshair(ctx, probe, { bounds: chart, color: '#a855f7', label: probe.label });
  }

  function formatA(a) { return a >= 0 ? a.toFixed(2) : `−${(-a).toFixed(2)}`; }
  function formatBC(v, suffix) {
    if (Math.abs(v) < 1e-6) return '';
    const sign = v >= 0 ? '+' : '−';
    return ` ${sign} ${Math.abs(v).toFixed(2)}${suffix}`;
  }

  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    if (!chart) return null;
    const { x, y, w, h } = chart;
    if (sx < x || sx > x + w || sy < y || sy > y + h) return null;
    const xVal = -10 + ((sx - x) / w) * 20;
    return { x: sx, y: sy, label: [`x = ${xVal.toFixed(3)}`, `f(x) = ${f(xVal).toFixed(3)}`] };
  });

  // Drag the vertex to set b and c (a fixed); drag the parabola top to fly it around.
  const drag = dragHandle(cv.canvas, {
    hitTest(sx, sy) {
      if (!chart) return null;
      const v = vertex();
      const x2 = (xx) => chart.x + ((xx - (-10)) / 20) * chart.w;
      const y2 = (yy) => chart.y + chart.h - ((yy - (-10)) / 20) * chart.h;
      if (Math.hypot(sx - x2(v.x), sy - y2(v.y)) < 16) return 'vertex';
      return null;
    },
    onDrag(_id, sx, sy) {
      const xMin = -10, xMax = 10, yMin = -10, yMax = 10;
      const xx = xMin + ((sx - chart.x) / chart.w) * (xMax - xMin);
      const yy = yMin + ((chart.y + chart.h - sy) / chart.h) * (yMax - yMin);
      // We want vertex at (xx, yy): b = -2 a xx; c = yy + a xx²
      params.b = -2 * params.a * xx;
      params.c = yy + params.a * xx * xx;
      bS.value = params.b;
      cS.value = params.c;
    },
    cursor: 'grab',
    hoverCursor: 'grab',
  });

  const aS = slider({ label: 'a', min: -3, max: 3, step: 0.05, value: params.a, format: (v) => v.toFixed(2),
    onInput: (v) => { params.a = Math.abs(v) < 0.01 ? 0.01 : v; } });
  const bS = slider({ label: 'b', min: -10, max: 10, step: 0.1, value: params.b, format: (v) => v.toFixed(2),
    onInput: (v) => { params.b = v; } });
  const cS = slider({ label: 'c', min: -10, max: 10, step: 0.1, value: params.c, format: (v) => v.toFixed(2),
    onInput: (v) => { params.c = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [n, p] of [['Two roots', { a: 1, b: -5, c: 6 }], ['One root', { a: 1, b: 4, c: 4 }], ['No roots', { a: 1, b: 0, c: 1 }], ['Down', { a: -1, b: 0, c: 4 }]]) {
    const btn = button({ label: n, onClick: () => { Object.assign(params, p); aS.value = p.a; bS.value = p.b; cS.value = p.c; } });
    presetRow.appendChild(btn.el);
  }

  ctrlPanel.append(aS.el, bS.el, cS.el, presetRow);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); hover.destroy(); drag.destroy(); cv.destroy(); };
}
