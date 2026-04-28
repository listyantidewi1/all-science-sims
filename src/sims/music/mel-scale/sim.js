import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { hoverProbe, drawCrosshair } from '../../../lib/chart.js';
import { dragHandle } from '../../../lib/handle.js';

function hzToMel(f) { return 2595 * Math.log10(1 + f / 700); }
function melToHz(m) { return 700 * (Math.pow(10, m / 2595) - 1); }

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { f: 1000 };

  let chart = null;
  let audioCtx = null;
  function play() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const o = audioCtx.createOscillator();
    o.type = 'sine'; o.frequency.value = params.f;
    const g = audioCtx.createGain();
    o.connect(g); g.connect(audioCtx.destination);
    const t = audioCtx.currentTime;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.18, t + 0.02);
    g.gain.linearRampToValueAtTime(0, t + 0.45);
    o.start(t); o.stop(t + 0.5);
  }
  function octave(direction) {
    params.f = Math.max(20, Math.min(20000, params.f * (direction > 0 ? 2 : 0.5)));
    fS.value = params.f;
    play();
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 60, padY = 40;
    const w = W - padX - 30, h = H - padY - 80;
    chart = { x: padX, y: padY, w, h };

    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(padX, padY, w, h);

    const fMin = 20, fMax = 20000;
    const melMin = hzToMel(fMin), melMax = hzToMel(fMax);
    const x2 = (f) => padX + ((f - fMin) / (fMax - fMin)) * w;
    const y2 = (m) => padY + h - ((m - melMin) / (melMax - melMin)) * (h - 16) - 8;

    // mel curve
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const f = fMin + (i / 200) * (fMax - fMin);
      const m = hzToMel(f);
      const sx = x2(f), sy = y2(m);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // current freq marker
    const cx = x2(params.f);
    const cy = y2(hzToMel(params.f));
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fill();

    // gridlines
    ctx.strokeStyle = 'rgba(120,130,150,0.15)';
    for (let f = 0; f <= 20000; f += 4000) {
      ctx.beginPath(); ctx.moveTo(x2(f), padY); ctx.lineTo(x2(f), padY + h); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`${f}`, x2(f) - 14, padY + h + 14);
    }
    for (let m = 0; m <= 4000; m += 1000) {
      ctx.beginPath(); ctx.moveTo(padX, y2(m)); ctx.lineTo(padX + w, y2(m)); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.fillText(`${m} mel`, padX - 50, y2(m) + 4);
    }

    // axis labels
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('Frequency (Hz) →', padX + w - 100, padY + h + 30);
    ctx.save(); ctx.translate(padX - 40, padY + h / 2 + 30); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Perceived pitch (mel) ↑', 0, 0); ctx.restore();

    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 280, 60);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-mono)';
    ctx.fillText(`f = ${params.f.toFixed(1)} Hz`, 16, 28);
    ctx.font = '12px var(--font-mono)';
    ctx.fillStyle = '#10b981';
    ctx.fillText(`mel = ${hzToMel(params.f).toFixed(1)}`, 16, 46);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '10px var(--font-mono)';
    ctx.fillText(`= 2595 · log₁₀(1 + f/700)`, 16, 60);

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag along the curve · click "+1 oct" to double frequency', padX, H - 12);

    const probe = hover.get();
    if (probe) drawCrosshair(ctx, probe, { bounds: chart, color: '#fbbf24', label: probe.label });
  }

  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    if (!chart) return null;
    const { x, y, w, h } = chart;
    if (sx < x || sx > x + w || sy < y || sy > y + h) return null;
    const u = (sx - x) / w;
    const f = 20 + u * (20000 - 20);
    return { x: sx, y: sy, label: [`f = ${f.toFixed(0)} Hz`, `mel = ${hzToMel(f).toFixed(1)}`] };
  });
  const drag = dragHandle(cv.canvas, {
    hitTest: (sx, sy) => chart && sx >= chart.x && sx <= chart.x + chart.w && sy >= chart.y && sy <= chart.y + chart.h ? 'f' : null,
    onDrag(_id, sx) {
      const u = (sx - chart.x) / chart.w;
      params.f = Math.max(20, Math.min(20000, 20 + u * (20000 - 20)));
      fS.value = params.f;
    },
    cursor: 'crosshair',
    hoverCursor: 'ew-resize',
  });

  const fS = slider({ label: 'Frequency (Hz)', min: 20, max: 20000, step: 1, value: params.f,
    onInput: (v) => { params.f = v; } });
  const melS = slider({ label: 'Perceived pitch (mel)', min: 0, max: 4000, step: 1, value: hzToMel(params.f),
    onInput: (v) => { params.f = melToHz(v); fS.value = params.f; } });
  const playB = button({ label: '▶ Beep', primary: true, onClick: play });
  const upB = button({ label: '+1 oct', onClick: () => octave(+1) });
  const dnB = button({ label: '−1 oct', onClick: () => octave(-1) });

  ctrlPanel.append(fS.el, melS.el, row(playB, upB, dnB));

  // Keep mel slider in sync each frame.
  const animator = loop(() => { melS.value = hzToMel(params.f); draw(); });
  animator.start();
  return () => {
    if (audioCtx) try { audioCtx.close(); } catch {}
    animator.stop(); hover.destroy(); drag.destroy(); cv.destroy();
  };
}
