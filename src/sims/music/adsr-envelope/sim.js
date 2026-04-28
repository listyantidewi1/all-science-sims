import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';

// Total horizon shown on canvas: 3 seconds.
const HORIZON = 3.0;

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    A: 0.05,    // attack (s)
    D: 0.20,    // decay (s)
    S: 0.7,     // sustain level (0–1)
    R: 0.30,    // release (s)
    holdEnd: 1.5, // when key release happens (s)
    pitch: 440,
  };

  let chart = null;
  let audioCtx = null;

  // ADSR envelope value at time t (key pressed at 0, released at holdEnd).
  function envAt(t) {
    if (t < 0) return 0;
    if (t < params.A) return t / Math.max(1e-6, params.A);
    if (t < params.A + params.D) {
      const u = (t - params.A) / Math.max(1e-6, params.D);
      return 1 - (1 - params.S) * u;
    }
    if (t < params.holdEnd) return params.S;
    const u = (t - params.holdEnd) / Math.max(1e-6, params.R);
    if (u >= 1) return 0;
    return params.S * (1 - u);
  }

  function play() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const o = audioCtx.createOscillator();
    o.type = 'triangle';
    o.frequency.value = params.pitch;
    const g = audioCtx.createGain();
    o.connect(g); g.connect(audioCtx.destination);
    const t0 = audioCtx.currentTime;
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(0.18, t0 + params.A);
    g.gain.linearRampToValueAtTime(0.18 * params.S, t0 + params.A + params.D);
    g.gain.setValueAtTime(0.18 * params.S, t0 + params.holdEnd);
    g.gain.linearRampToValueAtTime(0, t0 + params.holdEnd + params.R);
    o.start(t0);
    o.stop(t0 + params.holdEnd + params.R + 0.05);
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 50, padY = 40;
    const w = W - padX - 30, h = H - padY - 50;
    chart = { x: padX, y: padY, w, h };

    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(padX, padY, w, h);

    const x2 = (t) => padX + (t / HORIZON) * w;
    const y2 = (v) => padY + h - v * (h - 16) - 8;

    // gridlines
    ctx.strokeStyle = 'rgba(120,130,150,0.15)';
    for (let s = 0.5; s < HORIZON; s += 0.5) {
      ctx.beginPath(); ctx.moveTo(x2(s), padY); ctx.lineTo(x2(s), padY + h); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`${s.toFixed(1)}s`, x2(s) - 12, padY + h + 14);
    }

    // Region shading
    const tA = params.A;
    const tDend = params.A + params.D;
    const tS = params.holdEnd;
    const tEnd = Math.min(HORIZON, params.holdEnd + params.R);
    const colors = ['#0ea5e933', '#fbbf2433', '#10b98133', '#ec489933'];
    const bounds = [[0, tA], [tA, tDend], [tDend, tS], [tS, tEnd]];
    const labels = ['Attack', 'Decay', 'Sustain', 'Release'];
    for (let i = 0; i < 4; i++) {
      const [a, b] = bounds[i];
      ctx.fillStyle = colors[i];
      ctx.fillRect(x2(a), padY, x2(b) - x2(a), h);
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.font = 'bold 11px var(--font-mono)';
      ctx.fillText(labels[i], x2(a) + 4, padY + 14);
    }

    // Envelope curve
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    const N = 300;
    for (let i = 0; i <= N; i++) {
      const t = (i / N) * HORIZON;
      const v = envAt(t);
      const sx = x2(t), sy = y2(v);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // Handles
    const handles = [
      { id: 'A',       x: x2(tA),    y: y2(1),       label: `A: ${(params.A * 1000).toFixed(0)}ms` },
      { id: 'D',       x: x2(tDend), y: y2(params.S), label: `D→S: ${(params.D * 1000).toFixed(0)}ms · ${(params.S * 100).toFixed(0)}%` },
      { id: 'S',       x: x2(tS),    y: y2(params.S), label: `release at ${tS.toFixed(2)}s` },
      { id: 'R',       x: x2(tEnd),  y: y2(0),       label: `R: ${(params.R * 1000).toFixed(0)}ms` },
    ];
    for (const hl of handles) {
      ctx.fillStyle = '#ef4444';
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(hl.x, hl.y, 8, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
    }

    // Big readout
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 280, 28);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`A ${(params.A*1000).toFixed(0)}ms · D ${(params.D*1000).toFixed(0)}ms · S ${(params.S*100).toFixed(0)}% · R ${(params.R*1000).toFixed(0)}ms`, 16, 26);

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag the red handles to shape the envelope', padX, H - 10);
  }

  // Drag handles
  const drag = dragHandle(cv.canvas, {
    hitTest(sx, sy) {
      if (!chart) return null;
      const x2 = (t) => chart.x + (t / HORIZON) * chart.w;
      const y2 = (v) => chart.y + chart.h - v * (chart.h - 16) - 8;
      const tA = params.A, tDend = params.A + params.D, tS = params.holdEnd, tEnd = Math.min(HORIZON, params.holdEnd + params.R);
      const candidates = [
        { id: 'A', x: x2(tA), y: y2(1) },
        { id: 'D', x: x2(tDend), y: y2(params.S) },
        { id: 'S', x: x2(tS), y: y2(params.S) },
        { id: 'R', x: x2(tEnd), y: y2(0) },
      ];
      for (const c of candidates) if (Math.hypot(sx - c.x, sy - c.y) < 14) return c.id;
      return null;
    },
    onDrag(id, sx, sy) {
      const xT = ((sx - chart.x) / chart.w) * HORIZON;
      const yV = 1 - (sy - chart.y - 8) / (chart.h - 16);
      if (id === 'A') {
        params.A = Math.max(0.005, Math.min(2, xT));
      } else if (id === 'D') {
        params.D = Math.max(0.005, Math.min(2, xT - params.A));
        params.S = Math.max(0, Math.min(1, yV));
      } else if (id === 'S') {
        params.holdEnd = Math.max(params.A + params.D + 0.05, Math.min(HORIZON - 0.1, xT));
      } else if (id === 'R') {
        params.R = Math.max(0.005, Math.min(2, xT - params.holdEnd));
      }
    },
    cursor: 'pointer',
    hoverCursor: 'grab',
  });

  // controls
  const aS = slider({ label: 'Attack (ms)', min: 5, max: 2000, step: 5, value: params.A * 1000,
    onInput: (v) => { params.A = v / 1000; } });
  const dS = slider({ label: 'Decay (ms)', min: 5, max: 2000, step: 5, value: params.D * 1000,
    onInput: (v) => { params.D = v / 1000; } });
  const sS = slider({ label: 'Sustain level', min: 0, max: 1, step: 0.01, value: params.S, format: (v) => v.toFixed(2),
    onInput: (v) => { params.S = v; } });
  const rS = slider({ label: 'Release (ms)', min: 5, max: 2000, step: 5, value: params.R * 1000,
    onInput: (v) => { params.R = v / 1000; } });
  const pS = slider({ label: 'Pitch (Hz)', min: 80, max: 880, step: 1, value: params.pitch,
    onInput: (v) => { params.pitch = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [n, p] of [
    ['Pluck', { A: 0.01, D: 0.4, S: 0.0, R: 0.2 }],
    ['Pad', { A: 0.8, D: 0.4, S: 0.6, R: 1.0 }],
    ['Organ', { A: 0.01, D: 0, S: 1.0, R: 0.05 }],
    ['Stab', { A: 0.005, D: 0.05, S: 0.0, R: 0.02 }],
  ]) {
    const b = button({ label: n, onClick: () => {
      Object.assign(params, p);
      aS.value = params.A * 1000; dS.value = params.D * 1000; sS.value = params.S; rS.value = params.R * 1000;
    } });
    presetRow.appendChild(b.el);
  }
  const playB = button({ label: '▶ Play note', primary: true, onClick: play });

  ctrlPanel.append(aS.el, dS.el, sS.el, rS.el, pS.el, presetRow, row(playB));

  const animator = loop(() => draw());
  animator.start();
  return () => {
    animator.stop();
    if (audioCtx) try { audioCtx.close(); } catch {}
    drag.destroy(); cv.destroy();
  };
}
