import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';
import { hoverProbe, drawCrosshair } from '../../../lib/chart.js';
import { dragHandle } from '../../../lib/handle.js';

// Each material is a piecewise model:
//   elastic up to yield strain εy with slope E,
//   then plastic plateau or hardening up to ultimate strength σu at εu,
//   then necking with declining stress to fracture εf.
// Strain is in %, stress in MPa (rough order-of-magnitude).
const MATERIALS = {
  steel: {
    name: 'Mild steel (ductile)',
    color: '#0ea5e9',
    E: 200000,           // MPa equivalent slope (200 GPa)
    epsY: 0.0015,
    sigY: 250,
    epsHardEnd: 0.025,
    sigU: 420,
    epsNeckEnd: 0.20,
    sigF: 320,
  },
  aluminum: {
    name: 'Aluminum alloy',
    color: '#94a3b8',
    E: 70000,
    epsY: 0.005,
    sigY: 280,
    epsHardEnd: 0.015,
    sigU: 320,
    epsNeckEnd: 0.10,
    sigF: 240,
  },
  glass: {
    name: 'Glass (brittle)',
    color: '#22d3ee',
    E: 70000,
    epsY: 0.001,
    sigY: 70,
    epsHardEnd: 0.001,
    sigU: 70,
    epsNeckEnd: 0.001,
    sigF: 70,
  },
  polymer: {
    name: 'Plastic (HDPE-like)',
    color: '#f97316',
    E: 800,
    epsY: 0.04,
    sigY: 25,
    epsHardEnd: 0.30,
    sigU: 40,
    epsNeckEnd: 1.0,
    sigF: 30,
  },
};

function stressAt(strain, m) {
  const e = strain;
  if (e <= 0) return 0;
  if (e <= m.epsY) return m.E * e;
  if (e <= m.epsHardEnd) {
    const u = (e - m.epsY) / Math.max(1e-6, m.epsHardEnd - m.epsY);
    return m.sigY + (m.sigU - m.sigY) * u;
  }
  if (e <= m.epsNeckEnd) {
    const u = (e - m.epsHardEnd) / Math.max(1e-6, m.epsNeckEnd - m.epsHardEnd);
    return m.sigU + (m.sigF - m.sigU) * u;
  }
  return -1; // fractured
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    matKey: 'steel',
    strain: 0,
  };

  let chartRect = null;
  let fractured = false;

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const m = MATERIALS[params.matKey];

    // Specimen on the left
    drawSpecimen(ctx, 30, 50, 200, H - 100);

    // Chart on the right
    const cx = 270, cy = 30, cw = W - cx - 30, ch = H - 60;
    chartRect = { x: cx, y: cy, w: cw, h: ch };
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(cx, cy, cw, ch);

    const xMax = m.epsNeckEnd * 1.1;
    const yMax = Math.max(m.sigU, m.sigY) * 1.2;
    const x2 = (e) => cx + (e / xMax) * cw;
    const y2 = (s) => cy + ch - (Math.max(0, s) / yMax) * (ch - 16) - 8;

    // gridlines
    ctx.strokeStyle = 'rgba(120,130,150,0.15)';
    for (let i = 1; i <= 5; i++) {
      const y0 = cy + (ch / 5) * i;
      ctx.beginPath(); ctx.moveTo(cx, y0); ctx.lineTo(cx + cw, y0); ctx.stroke();
    }

    // Draw all materials lightly for context
    for (const [k, mat] of Object.entries(MATERIALS)) {
      if (k === params.matKey) continue;
      ctx.strokeStyle = mat.color + '44';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      const N = 200;
      for (let i = 0; i <= N; i++) {
        const e = (i / N) * xMax;
        const s = stressAt(e, mat);
        if (s < 0) break;
        const sx = x2(e), sy = y2(s);
        if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }
    // selected material — bold
    ctx.strokeStyle = m.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    const N = 300;
    for (let i = 0; i <= N; i++) {
      const e = (i / N) * xMax;
      const s = stressAt(e, m);
      if (s < 0) break;
      const sx = x2(e), sy = y2(s);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // Region labels
    ctx.fillStyle = 'rgba(120,130,150,0.6)';
    ctx.font = '10px var(--font-mono)';
    ctx.fillText('elastic', x2(m.epsY * 0.4), cy + ch - 10);
    ctx.fillText('hardening', x2((m.epsY + m.epsHardEnd) / 2), cy + ch - 24);
    ctx.fillText('necking', x2((m.epsHardEnd + m.epsNeckEnd) / 2), cy + ch - 38);

    // Annotate yield + ultimate points
    ctx.strokeStyle = 'rgba(251,191,36,0.5)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(cx, y2(m.sigY)); ctx.lineTo(x2(m.epsY), y2(m.sigY));
    ctx.lineTo(x2(m.epsY), cy + ch);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, y2(m.sigU)); ctx.lineTo(x2(m.epsHardEnd), y2(m.sigU));
    ctx.lineTo(x2(m.epsHardEnd), cy + ch);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#fbbf24';
    ctx.font = '10px var(--font-mono)';
    ctx.fillText(`σ_yield = ${m.sigY.toFixed(0)} MPa`, cx + 4, y2(m.sigY) - 4);
    ctx.fillText(`σ_ultimate = ${m.sigU.toFixed(0)} MPa`, cx + 4, y2(m.sigU) - 4);

    // Current point
    const s = stressAt(params.strain, m);
    if (s >= 0) {
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(x2(params.strain), y2(s), 6, 0, Math.PI * 2);
      ctx.fill();
    }

    // Big readouts
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(cx + 8, cy + 8, 240, 64);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(m.name, cx + 16, cy + 26);
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`E = ${(m.E / 1000).toFixed(0)} GPa`, cx + 16, cy + 42);
    ctx.fillStyle = fractured ? '#ef4444' : (params.strain > m.epsY ? '#fbbf24' : '#10b981');
    ctx.fillText(fractured ? 'FRACTURED' :
                 params.strain > m.epsY ? 'plastic deformation' : 'elastic (will spring back)',
                 cx + 16, cy + 58);

    // Axis labels
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Strain ε →', cx + cw - 60, cy + ch + 14);
    ctx.save(); ctx.translate(cx - 30, cy + ch / 2 + 20); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Stress σ (MPa)', 0, 0); ctx.restore();

    // Hover crosshair
    const probe = hover.get();
    if (probe) drawCrosshair(ctx, probe, { bounds: chartRect, color: '#fbbf24', label: probe.label });
  }

  function drawSpecimen(ctx, x, y, w, h) {
    const m = MATERIALS[params.matKey];
    const s = stressAt(params.strain, m);
    const necking = params.strain > m.epsHardEnd;
    const stretchFactor = 1 + Math.min(2, params.strain * 4);
    const baseW = 36;
    const cx = x + w / 2;

    if (fractured) {
      // draw broken halves
      ctx.fillStyle = m.color;
      const split = (h / 2) - 30;
      ctx.fillRect(cx - baseW / 2, y, baseW, split);
      ctx.fillRect(cx - baseW / 2, y + split + 60, baseW, h - split - 60);
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 14px var(--font-sans)';
      ctx.textAlign = 'center';
      ctx.fillText('FRACTURE', cx, y + split + 40);
      ctx.textAlign = 'left';
      return;
    }

    const stretchedH = h * Math.min(1.6, stretchFactor);
    const yTop = y + (h - stretchedH) / 2;

    ctx.fillStyle = m.color;
    if (necking) {
      const neckFrac = (params.strain - m.epsHardEnd) / Math.max(1e-6, m.epsNeckEnd - m.epsHardEnd);
      // hourglass shape
      const midY = yTop + stretchedH / 2;
      const neckW = baseW * (1 - neckFrac * 0.55);
      ctx.beginPath();
      ctx.moveTo(cx - baseW / 2, yTop);
      ctx.lineTo(cx - neckW / 2, midY);
      ctx.lineTo(cx - baseW / 2, yTop + stretchedH);
      ctx.lineTo(cx + baseW / 2, yTop + stretchedH);
      ctx.lineTo(cx + neckW / 2, midY);
      ctx.lineTo(cx + baseW / 2, yTop);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillRect(cx - baseW / 2, yTop, baseW, stretchedH);
    }
    // grips
    ctx.fillStyle = '#475569';
    ctx.fillRect(cx - baseW / 2 - 8, yTop - 14, baseW + 16, 14);
    ctx.fillRect(cx - baseW / 2 - 8, yTop + stretchedH, baseW + 16, 14);

    // arrows (load direction)
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, yTop - 30); ctx.lineTo(cx, yTop - 16);
    ctx.moveTo(cx - 6, yTop - 22); ctx.lineTo(cx, yTop - 16); ctx.lineTo(cx + 6, yTop - 22);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, yTop + stretchedH + 30); ctx.lineTo(cx, yTop + stretchedH + 16);
    ctx.moveTo(cx - 6, yTop + stretchedH + 22); ctx.lineTo(cx, yTop + stretchedH + 16); ctx.lineTo(cx + 6, yTop + stretchedH + 22);
    ctx.stroke();

    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '10px var(--font-mono)';
    ctx.textAlign = 'center';
    ctx.fillText(`σ = ${s.toFixed(0)} MPa`, cx, yTop + stretchedH + 50);
    ctx.fillText(`ε = ${(params.strain * 100).toFixed(2)}%`, cx, yTop + stretchedH + 64);
    ctx.textAlign = 'left';
  }

  // Hover the chart for (strain, stress).
  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    if (!chartRect) return null;
    const { x, y, w, h } = chartRect;
    if (sx < x || sx > x + w || sy < y || sy > y + h) return null;
    const m = MATERIALS[params.matKey];
    const xMax = m.epsNeckEnd * 1.1;
    const e = ((sx - x) / w) * xMax;
    const s = stressAt(e, m);
    return {
      x: sx, y: sy,
      label: [`ε = ${(e * 100).toFixed(2)}%`, s >= 0 ? `σ = ${s.toFixed(1)} MPa` : 'past fracture'],
    };
  });

  // Drag horizontally inside the chart to set the strain.
  const drag = dragHandle(cv.canvas, {
    hitTest(sx, sy) {
      if (!chartRect) return null;
      const { x, y, w, h } = chartRect;
      return (sx >= x && sx <= x + w && sy >= y && sy <= y + h) ? 'strain' : null;
    },
    onDrag(_id, sx) {
      const m = MATERIALS[params.matKey];
      const xMax = m.epsNeckEnd * 1.1;
      const e = Math.max(0, Math.min(xMax, ((sx - chartRect.x) / chartRect.w) * xMax));
      params.strain = e;
      if (params.strain > m.epsNeckEnd) fractured = true;
      eS.value = params.strain;
    },
    cursor: 'crosshair',
    hoverCursor: 'ew-resize',
  });

  // controls
  const matSel = select({
    label: 'Material',
    options: Object.entries(MATERIALS).map(([k, v]) => ({ value: k, label: v.name })),
    value: params.matKey,
    onChange: (v) => { params.matKey = v; params.strain = 0; fractured = false; eS.value = 0; },
  });
  const eS = slider({ label: 'Strain ε', min: 0, max: 1.2, step: 0.0005, value: params.strain, format: (v) => `${(v * 100).toFixed(2)}%`,
    onInput: (v) => {
      const m = MATERIALS[params.matKey];
      params.strain = v;
      if (v > m.epsNeckEnd) fractured = true;
    } });
  const releaseB = button({ label: 'Release load', primary: true, onClick: () => {
    if (fractured) return;
    const m = MATERIALS[params.matKey];
    if (params.strain <= m.epsY) { params.strain = 0; eS.value = 0; }
    else { params.strain = Math.max(0, params.strain - m.epsY); eS.value = params.strain; }
  } });
  const resetB = button({ label: 'New specimen', onClick: () => { params.strain = 0; fractured = false; eS.value = 0; } });

  ctrlPanel.append(matSel.el, eS.el, row(releaseB, resetB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); hover.destroy(); drag.destroy(); cv.destroy(); };
}
