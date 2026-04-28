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

  const params = {
    prevalence: 0.01,    // P(D)
    sensitivity: 0.99,   // P(+|D)
    specificity: 0.99,   // P(-|¬D)
    population: 10000,
  };

  // Layout cache so hover/drag share coordinates with the renderer.
  let dotRect = null; // { x, y, dotSize, cols, rows }

  function compute() {
    const N = params.population;
    const sick = Math.round(N * params.prevalence);
    const healthy = N - sick;
    const TP = Math.round(sick * params.sensitivity);
    const FN = sick - TP;
    const TN = Math.round(healthy * params.specificity);
    const FP = healthy - TN;
    const totalPos = TP + FP;
    const PPV = totalPos > 0 ? TP / totalPos : 0;
    return { N, sick, healthy, TP, FN, TN, FP, PPV };
  }

  function dotIndexAt(sx, sy) {
    if (!dotRect) return -1;
    const { x, y, dotSize, cols, rows } = dotRect;
    if (sx < x || sx >= x + cols * dotSize) return -1;
    if (sy < y || sy >= y + rows * dotSize) return -1;
    const cx = Math.floor((sx - x) / dotSize);
    const cy = Math.floor((sy - y) / dotSize);
    return cy * cols + cx;
  }

  function classifyDot(i, r) {
    if (i >= r.N) return null;
    if (i < r.sick) return i < r.TP ? 'TP' : 'FN';
    const j = i - r.sick;
    return j < r.FP ? 'FP' : 'TN';
  }
  const LABELS = {
    TP: ['TRUE POSITIVE', 'sick · tested +'],
    FN: ['FALSE NEGATIVE', 'sick · tested −'],
    FP: ['FALSE POSITIVE', 'healthy · tested +'],
    TN: ['TRUE NEGATIVE', 'healthy · tested −'],
  };

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    const r = compute();

    // Population dot grid (top half)
    const cols = 100, rows = 100;
    const dotSize = Math.min((W - 40) / cols, (H * 0.55) / rows);
    const startX = (W - cols * dotSize) / 2;
    const startY = 20;
    dotRect = { x: startX, y: startY, dotSize, cols, rows };

    let i = 0;
    const dots = r.N;
    const sickDots = r.sick;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (i >= dots) break;
        const isSick = i < sickDots;
        let color = '#475569';
        if (isSick) {
          color = i < r.TP ? '#10b981' : '#fbbf24';
        } else {
          const j = i - sickDots;
          if (j < r.FP) color = '#ef4444';
          else color = '#1e293b';
        }
        ctx.fillStyle = color;
        ctx.fillRect(startX + x * dotSize, startY + y * dotSize, dotSize - 0.5, dotSize - 0.5);
        i++;
      }
    }

    // Bar showing positives breakdown
    const barY = H * 0.7;
    const barH = 30;
    const barW = W - 60;
    const totalPos = r.TP + r.FP;
    const tpFrac = totalPos > 0 ? r.TP / totalPos : 0;
    ctx.fillStyle = '#10b981';
    ctx.fillRect(30, barY, barW * tpFrac, barH);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(30 + barW * tpFrac, barY, barW * (1 - tpFrac), barH);
    ctx.strokeStyle = 'rgba(120,130,150,0.7)';
    ctx.strokeRect(30, barY, barW, barH);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText(`True positives ${r.TP}`, 36, barY + 20);
    ctx.fillText(`False positives ${r.FP}`, 30 + barW * tpFrac + 10, barY + 20);

    // Big readout
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, H - 70, 320, 60);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-sans)';
    ctx.fillText(`P(disease | positive) = ${(r.PPV * 100).toFixed(2)}%`, 16, H - 48);
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`prev=${(params.prevalence*100).toFixed(2)}%  sens=${(params.sensitivity*100).toFixed(1)}%  spec=${(params.specificity*100).toFixed(1)}%`, 16, H - 28);
    ctx.fillText(`Of ${r.N} people: ${r.sick} sick, ${r.TP} TP, ${r.FN} FN, ${r.FP} FP, ${r.TN} TN`, 16, H - 14);

    // Legend
    const lg = [
      ['#10b981', 'True positive'],
      ['#fbbf24', 'False negative'],
      ['#ef4444', 'False positive'],
      ['#1e293b', 'True negative'],
    ];
    for (let k = 0; k < lg.length; k++) {
      ctx.fillStyle = lg[k][0];
      ctx.fillRect(W - 170, H - 70 + k * 16, 12, 12);
      ctx.fillStyle = '#fff';
      ctx.font = '11px var(--font-sans)';
      ctx.fillText(lg[k][1], W - 154, H - 60 + k * 16);
    }

    // Hint about drag
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Hover dots for details · drag inside the grid to set prevalence', startX, startY - 6);

    // Hover crosshair / tooltip
    const probe = hover.get();
    if (probe) {
      drawCrosshair(ctx, probe, {
        bounds: { x: startX, y: startY, w: cols * dotSize, h: rows * dotSize },
        color: '#fff',
        vertical: false,
        horizontal: false,
        dot: true,
        label: probe.label,
      });
    }
  }

  // Hover: identify the dot under the cursor.
  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    const r = compute();
    const idx = dotIndexAt(sx, sy);
    if (idx < 0 || idx >= r.N) return null;
    const cls = classifyDot(idx, r);
    if (!cls) return null;
    const counts = { TP: r.TP, FN: r.FN, FP: r.FP, TN: r.TN };
    return {
      x: dotRect.x + (idx % dotRect.cols) * dotRect.dotSize + dotRect.dotSize / 2,
      y: dotRect.y + Math.floor(idx / dotRect.cols) * dotRect.dotSize + dotRect.dotSize / 2,
      label: [...LABELS[cls], `count: ${counts[cls]} / ${r.N}`],
    };
  });

  // Drag inside the grid to set prevalence — vertical position picks the
  // sick/healthy boundary row, so dragging up = lower prevalence.
  const drag = dragHandle(cv.canvas, {
    hitTest(sx, sy) {
      if (!dotRect) return null;
      const { x, y, dotSize, cols, rows } = dotRect;
      if (sx >= x && sx < x + cols * dotSize && sy >= y && sy < y + rows * dotSize) return 'prev';
      return null;
    },
    onDrag(_id, sx, sy) {
      const idx = Math.max(0, dotIndexAt(sx, sy));
      // Each dot is one in N; idx maps to the prevalence threshold.
      const newPrev = Math.max(0.001, Math.min(0.5, idx / params.population));
      params.prevalence = newPrev;
      prevS.value = newPrev;
    },
    cursor: 'crosshair',
    hoverCursor: 'ns-resize',
  });

  // controls
  const prevS = slider({
    label: 'Prevalence P(D)', min: 0.001, max: 0.5, step: 0.001, value: params.prevalence, format: (v) => `${(v*100).toFixed(2)}%`,
    onInput: (v) => { params.prevalence = v; },
  });
  const sensS = slider({
    label: 'Sensitivity P(+|D)', min: 0.5, max: 1, step: 0.001, value: params.sensitivity, format: (v) => `${(v*100).toFixed(1)}%`,
    onInput: (v) => { params.sensitivity = v; },
  });
  const specS = slider({
    label: 'Specificity P(−|¬D)', min: 0.5, max: 1, step: 0.001, value: params.specificity, format: (v) => `${(v*100).toFixed(1)}%`,
    onInput: (v) => { params.specificity = v; },
  });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, p] of [['Rare disease', { prevalence: 0.005, sensitivity: 0.99, specificity: 0.99 }],
                           ['Common', { prevalence: 0.20, sensitivity: 0.95, specificity: 0.95 }],
                           ['Pandemic screen', { prevalence: 0.05, sensitivity: 0.85, specificity: 0.99 }]]) {
    const b = button({ label: name, onClick: () => {
      Object.assign(params, p);
      prevS.value = p.prevalence; sensS.value = p.sensitivity; specS.value = p.specificity;
    } });
    presetRow.appendChild(b.el);
  }

  ctrlPanel.append(prevS.el, sensS.el, specS.el, presetRow);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); hover.destroy(); drag.destroy(); cv.destroy(); };
}
