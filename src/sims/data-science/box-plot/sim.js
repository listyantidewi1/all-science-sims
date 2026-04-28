import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

const PRESETS = {
  'Test scores':    [62, 68, 71, 75, 78, 79, 81, 82, 84, 85, 87, 89, 91, 92, 95],
  'Heights (cm)':   [150, 155, 158, 160, 162, 164, 165, 167, 169, 170, 172, 174, 176, 178, 188],
  'Skewed':         [10, 12, 13, 14, 15, 16, 18, 19, 21, 24, 28, 35, 42, 55, 78],
  'With outliers':  [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 100, 110],
  'Bimodal':        [30, 32, 35, 37, 39, 40, 70, 72, 75, 77, 79, 80, 82, 84, 86],
};

function quantile(sorted, q) {
  const idx = (sorted.length - 1) * q;
  const lo = Math.floor(idx), hi = Math.ceil(idx);
  if (lo === hi) return sorted[lo];
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo);
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    data: [...PRESETS['Test scores']],
    iqrMult: 1.5,
  };

  const inputEl = document.createElement('input');
  inputEl.type = 'text';
  inputEl.value = params.data.join(', ');
  inputEl.style.cssText = 'width:100%;padding:10px 12px;border:1px solid var(--color-border);border-radius:8px;background:var(--color-surface-2);color:var(--color-fg);font-family:var(--font-mono)';
  inputEl.placeholder = 'comma- or space-separated numbers';
  inputEl.addEventListener('input', () => {
    const parts = inputEl.value.split(/[\s,]+/).map(Number).filter((n) => Number.isFinite(n));
    params.data = parts;
  });

  function summary() {
    if (params.data.length === 0) return null;
    const sorted = [...params.data].sort((a, b) => a - b);
    const min = sorted[0], max = sorted[sorted.length - 1];
    const q1 = quantile(sorted, 0.25);
    const med = quantile(sorted, 0.5);
    const q3 = quantile(sorted, 0.75);
    const iqr = q3 - q1;
    const lo = q1 - params.iqrMult * iqr;
    const hi = q3 + params.iqrMult * iqr;
    const outliers = sorted.filter((v) => v < lo || v > hi);
    const whiskerLow = sorted.find((v) => v >= lo) ?? min;
    const whiskerHigh = [...sorted].reverse().find((v) => v <= hi) ?? max;
    const mean = sorted.reduce((a, b) => a + b, 0) / sorted.length;
    return { sorted, min, max, q1, med, q3, iqr, outliers, whiskerLow, whiskerHigh, mean };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const s = summary();
    if (!s) {
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '13px var(--font-mono)';
      ctx.fillText('Type some numbers above to see the box plot.', 30, H / 2);
      return;
    }

    const padX = 60;
    const w = W - padX * 2;
    const range = Math.max(1e-9, s.max - s.min);
    const expand = range * 0.15;
    const xMin = s.min - expand;
    const xMax = s.max + expand;
    const x2 = (v) => padX + ((v - xMin) / (xMax - xMin)) * w;

    // Axis
    const axisY = H * 0.25;
    ctx.strokeStyle = 'rgba(120,130,150,0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(padX, axisY + 70); ctx.lineTo(padX + w, axisY + 70); ctx.stroke();
    for (let i = 0; i <= 6; i++) {
      const v = xMin + (i / 6) * (xMax - xMin);
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(v.toFixed(0), x2(v) - 8, axisY + 86);
      ctx.beginPath(); ctx.moveTo(x2(v), axisY + 70); ctx.lineTo(x2(v), axisY + 76); ctx.stroke();
    }

    // Box
    const boxY = axisY, boxH = 50;
    ctx.fillStyle = 'rgba(14,165,233,0.4)';
    ctx.fillRect(x2(s.q1), boxY, x2(s.q3) - x2(s.q1), boxH);
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2;
    ctx.strokeRect(x2(s.q1), boxY, x2(s.q3) - x2(s.q1), boxH);
    // Median line
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(x2(s.med), boxY); ctx.lineTo(x2(s.med), boxY + boxH); ctx.stroke();
    // Whiskers
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x2(s.whiskerLow), boxY + boxH / 2); ctx.lineTo(x2(s.q1), boxY + boxH / 2);
    ctx.moveTo(x2(s.whiskerLow), boxY + boxH * 0.2); ctx.lineTo(x2(s.whiskerLow), boxY + boxH * 0.8);
    ctx.moveTo(x2(s.q3), boxY + boxH / 2); ctx.lineTo(x2(s.whiskerHigh), boxY + boxH / 2);
    ctx.moveTo(x2(s.whiskerHigh), boxY + boxH * 0.2); ctx.lineTo(x2(s.whiskerHigh), boxY + boxH * 0.8);
    ctx.stroke();
    // Outliers
    ctx.fillStyle = '#ef4444';
    for (const v of s.outliers) {
      ctx.beginPath(); ctx.arc(x2(v), boxY + boxH / 2, 5, 0, Math.PI * 2); ctx.fill();
    }
    // Mean cross
    ctx.fillStyle = '#a855f7';
    ctx.beginPath(); ctx.moveTo(x2(s.mean) - 6, boxY + boxH / 2 - 6); ctx.lineTo(x2(s.mean) + 6, boxY + boxH / 2 + 6);
    ctx.moveTo(x2(s.mean) + 6, boxY + boxH / 2 - 6); ctx.lineTo(x2(s.mean) - 6, boxY + boxH / 2 + 6);
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px var(--font-mono)';
    function tag(v, label, color, dy) {
      ctx.fillStyle = color;
      ctx.fillText(`${label}=${v.toFixed(1)}`, x2(v) - 30, boxY + boxH + 24 + dy);
      ctx.beginPath();
      ctx.moveTo(x2(v), boxY + boxH); ctx.lineTo(x2(v), boxY + boxH + 12 + dy);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    tag(s.q1, 'Q1', '#0ea5e9', 0);
    tag(s.med, 'med', '#fbbf24', 18);
    tag(s.q3, 'Q3', '#0ea5e9', 0);

    // Dot plot of raw data
    const dotY = axisY + 130;
    for (const v of params.data) {
      ctx.fillStyle = (v < s.q1 - params.iqrMult * s.iqr || v > s.q3 + params.iqrMult * s.iqr) ? '#ef4444' : 'rgba(120,130,150,0.85)';
      ctx.beginPath(); ctx.arc(x2(v), dotY + Math.random() * 30, 4, 0, Math.PI * 2); ctx.fill();
    }

    // Stats panel
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 380, 140);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText('5-number summary', 16, 28);
    ctx.font = '11px var(--font-mono)';
    let yy = 48;
    ctx.fillText(`min   = ${s.min.toFixed(2)}`, 16, yy); yy += 16;
    ctx.fillText(`Q1    = ${s.q1.toFixed(2)}`, 16, yy); yy += 16;
    ctx.fillText(`median = ${s.med.toFixed(2)}`, 16, yy); yy += 16;
    ctx.fillText(`Q3    = ${s.q3.toFixed(2)}`, 16, yy); yy += 16;
    ctx.fillText(`max   = ${s.max.toFixed(2)}`, 16, yy); yy += 18;
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(`IQR = ${s.iqr.toFixed(2)}    mean = ${s.mean.toFixed(2)}    n = ${params.data.length}    outliers = ${s.outliers.length}`, 16, yy);
  }

  // controls
  ctrlPanel.appendChild(inputEl);
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, arr] of Object.entries(PRESETS)) {
    const b = button({ label: name, onClick: () => {
      params.data = [...arr];
      inputEl.value = params.data.join(', ');
    } });
    presetRow.appendChild(b.el);
  }
  const iqrS = slider({ label: 'IQR multiplier', min: 0.5, max: 3, step: 0.05, value: params.iqrMult, format: (v) => v.toFixed(2),
    onInput: (v) => { params.iqrMult = v; } });
  ctrlPanel.append(presetRow, iqrS.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
