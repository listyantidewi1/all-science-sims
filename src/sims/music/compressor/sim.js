import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';

// Compressor curve in dB:
//   if input < threshold:  output = input
//   else:                  output = threshold + (input - threshold) / ratio
// Then add makeup_gain.

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    threshold: -20,    // dB
    ratio: 4,
    makeup: 0,         // dB
  };

  // Sample input envelope — a "drum hit" pattern
  const samples = [];
  for (let i = 0; i < 240; i++) {
    const t = i / 60;     // seconds
    const beat = Math.floor(t * 2) % 4;   // 4-beat pattern
    const phase = (t * 2) % 1;
    const env = Math.exp(-phase * 4) * (1 - phase * 0.4);
    let level;
    if (beat === 0) level = -2 + env * (-1);          // loud kick
    else if (beat === 2) level = -8 + env * (-1);     // medium snare
    else level = -25 + env * (-1);                    // quiet hat
    level += (Math.random() - 0.5) * 4;
    samples.push(level);
  }

  function compressDb(in_dB) {
    let out;
    if (in_dB < params.threshold) out = in_dB;
    else out = params.threshold + (in_dB - params.threshold) / params.ratio;
    return out + params.makeup;
  }

  let curveChart = null;

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Transfer curve on the left, time-domain on the right
    const half = W / 2;
    curveChart = { x: 30, y: 30, w: half - 60, h: H - 80 };
    drawCurve(ctx, curveChart.x, curveChart.y, curveChart.w, curveChart.h);
    drawTime(ctx, half + 30, 30, half - 60, H - 80);

    // Header
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 50);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`Threshold: ${params.threshold.toFixed(1)} dB    Ratio: ${params.ratio === 999 ? '∞' : params.ratio.toFixed(1)}:1`, 16, 28);
    ctx.fillStyle = '#fbbf24';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`Makeup gain: ${params.makeup >= 0 ? '+' : ''}${params.makeup.toFixed(1)} dB`, 16, 46);
  }

  function drawCurve(ctx, x, y, w, h) {
    const dbMin = -60, dbMax = 0;
    const x2 = (db) => x + ((db - dbMin) / (dbMax - dbMin)) * w;
    const y2 = (db) => y + h - ((db - dbMin) / (dbMax - dbMin)) * h;

    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('Input → Output transfer curve (dB)', x + 6, y - 6);
    ctx.fillText('input dB →', x + w - 70, y + h + 16);
    ctx.save(); ctx.translate(x - 24, y + h / 2 + 30); ctx.rotate(-Math.PI / 2);
    ctx.fillText('output dB ↑', 0, 0); ctx.restore();

    // Identity line
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(x2(dbMin), y2(dbMin)); ctx.lineTo(x2(dbMax), y2(dbMax));
    ctx.stroke();
    ctx.setLineDash([]);

    // Compressor curve
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const inD = dbMin + (i / 200) * (dbMax - dbMin);
      const outD = compressDb(inD);
      const sx = x2(inD), sy = y2(outD);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // Threshold marker (draggable)
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.arc(x2(params.threshold), y2(params.threshold), 8, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 11px var(--font-mono)';
    ctx.fillText('threshold', x2(params.threshold) + 12, y2(params.threshold) - 8);
  }

  function drawTime(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('Sample drum hits — input (cyan) vs compressed (green)', x + 6, y - 6);

    const dbMin = -50, dbMax = 0;
    const x2 = (i) => x + (i / samples.length) * w;
    const y2 = (db) => y + h - ((db - dbMin) / (dbMax - dbMin)) * h;

    // Threshold line
    ctx.strokeStyle = 'rgba(239,68,68,0.4)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(x, y2(params.threshold)); ctx.lineTo(x + w, y2(params.threshold));
    ctx.stroke();
    ctx.setLineDash([]);

    // Bars
    for (let i = 0; i < samples.length; i++) {
      const inD = samples[i];
      const outD = compressDb(inD);
      const sx = x + (i / samples.length) * w;
      const bw = w / samples.length;
      ctx.fillStyle = 'rgba(14,165,233,0.5)';
      ctx.fillRect(sx, y2(inD), bw - 0.5, y + h - y2(inD));
      ctx.fillStyle = '#10b981';
      ctx.fillRect(sx, y2(outD), bw - 0.5, y + h - y2(outD));
    }
  }

  // Drag the threshold dot in the curve panel
  const drag = dragHandle(cv.canvas, {
    hitTest(sx, sy) {
      if (!curveChart) return null;
      const dbMin = -60, dbMax = 0;
      const x2 = (db) => curveChart.x + ((db - dbMin) / (dbMax - dbMin)) * curveChart.w;
      const y2 = (db) => curveChart.y + curveChart.h - ((db - dbMin) / (dbMax - dbMin)) * curveChart.h;
      const tx = x2(params.threshold), ty = y2(params.threshold);
      if (Math.hypot(sx - tx, sy - ty) < 18) return 'threshold';
      return null;
    },
    onDrag(_id, sx) {
      const dbMin = -60, dbMax = 0;
      const u = (sx - curveChart.x) / curveChart.w;
      params.threshold = Math.max(-60, Math.min(0, dbMin + u * (dbMax - dbMin)));
      threshS.value = params.threshold;
    },
    cursor: 'grab',
    hoverCursor: 'grab',
  });

  // controls
  const threshS = slider({ label: 'Threshold (dB)', min: -60, max: 0, step: 0.5, value: params.threshold, format: (v) => v.toFixed(1),
    onInput: (v) => { params.threshold = v; } });
  const ratioS = slider({ label: 'Ratio', min: 1, max: 50, step: 0.5, value: params.ratio, format: (v) => `${v.toFixed(1)}:1`,
    onInput: (v) => { params.ratio = v; } });
  const makS = slider({ label: 'Makeup gain (dB)', min: 0, max: 24, step: 0.5, value: params.makeup, format: (v) => `${v.toFixed(1)}`,
    onInput: (v) => { params.makeup = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [n, p] of [['Bypass', { threshold: 0, ratio: 1, makeup: 0 }], ['Gentle', { threshold: -20, ratio: 4, makeup: 4 }], ['Heavy', { threshold: -30, ratio: 10, makeup: 10 }], ['Limiter', { threshold: -10, ratio: 50, makeup: 6 }]]) {
    const b = button({ label: n, onClick: () => {
      Object.assign(params, p);
      threshS.value = params.threshold; ratioS.value = params.ratio; makS.value = params.makeup;
    } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(threshS.el, ratioS.el, makS.el, presetRow);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
