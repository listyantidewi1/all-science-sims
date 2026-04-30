import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    mode: 'series',         // 'series' | 'parallel'
    R: [10, 20, 30],
    on: [true, true, true],
    V: 12,
  };

  function compute() {
    const Rs = params.R.map((r, i) => params.on[i] ? r : Infinity);
    if (params.mode === 'series') {
      const sum = Rs.reduce((a, b) => a + b, 0);
      // If any is infinite (open), no current
      if (!Number.isFinite(sum)) return { Rt: Infinity, I: 0, perBulb: Rs.map(() => ({ V: 0, I: 0, P: 0 })) };
      const I = params.V / sum;
      return {
        Rt: sum, I,
        perBulb: Rs.map((r) => ({ V: I * r, I, P: I * I * r })),
      };
    } else {
      // parallel
      let invSum = 0;
      for (const r of Rs) if (Number.isFinite(r)) invSum += 1 / r;
      const Rt = invSum > 0 ? 1 / invSum : Infinity;
      const I_total = invSum > 0 ? params.V / Rt : 0;
      const perBulb = Rs.map((r) => {
        if (!Number.isFinite(r)) return { V: 0, I: 0, P: 0 };
        const I = params.V / r;
        return { V: params.V, I, P: I * I * r };
      });
      return { Rt, I: I_total, perBulb };
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const c = compute();
    const padX = 30;
    if (params.mode === 'series') drawSeries(ctx, padX, 30, W - padX * 2, H * 0.5, c);
    else drawParallel(ctx, padX, 30, W - padX * 2, H * 0.5, c);

    // Per-bulb table
    const ty = H * 0.62;
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fillRect(padX, ty, W - padX * 2, H - ty - 30);
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(padX, ty, W - padX * 2, H - ty - 30);

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`Mode: ${params.mode.toUpperCase()}    R_total = ${Number.isFinite(c.Rt) ? c.Rt.toFixed(2) + ' Ω' : 'open'}    Total current = ${(c.I * 1000).toFixed(2)} mA`, padX + 10, ty + 24);
    let xx = padX + 20;
    const colW = (W - padX * 2 - 40) / 3;
    for (let i = 0; i < 3; i++) {
      const b = c.perBulb[i];
      ctx.fillStyle = params.on[i] ? '#fbbf24' : '#475569';
      ctx.font = 'bold 13px var(--font-mono)';
      ctx.fillText(`Bulb ${i + 1}`, xx, ty + 50);
      ctx.fillStyle = '#fff';
      ctx.font = '11px var(--font-mono)';
      ctx.fillText(`R = ${params.R[i]} Ω`, xx, ty + 68);
      ctx.fillText(`V = ${b.V.toFixed(2)} V`, xx, ty + 82);
      ctx.fillText(`I = ${(b.I * 1000).toFixed(2)} mA`, xx, ty + 96);
      ctx.fillText(`P = ${b.P.toFixed(3)} W`, xx, ty + 110);
      xx += colW;
    }
  }

  function drawSeries(ctx, x, y, w, h) {
    // single loop with bulbs in series
    const cx = x + w / 2;
    const cy = y + h / 2;
    // wire path
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(x + 80, y + 50, w - 160, h - 100);
    ctx.stroke();

    // battery on the left
    const bx = x + 80, by = cy - 18;
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(bx - 10, by - 14); ctx.lineTo(bx - 10, by + 14);
    ctx.moveTo(bx - 4, by - 8); ctx.lineTo(bx - 4, by + 8);
    ctx.stroke();
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 11px var(--font-mono)';
    ctx.fillText(`${params.V} V`, bx - 36, by + 4);

    // 3 bulbs along the top wire
    const c = compute();
    for (let i = 0; i < 3; i++) {
      const bulbX = x + 200 + i * (w - 280) / 2;
      const bulbY = y + 50;
      drawBulb(ctx, bulbX, bulbY, params.on[i], c.perBulb[i].P, params.R[i], i + 1);
    }
  }

  function drawParallel(ctx, x, y, w, h) {
    // battery on left, three parallel branches
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + 80, y + 50); ctx.lineTo(x + w - 80, y + 50);
    ctx.moveTo(x + 80, y + h - 50); ctx.lineTo(x + w - 80, y + h - 50);
    // battery short connections
    ctx.moveTo(x + 80, y + 50); ctx.lineTo(x + 80, y + h - 50);
    ctx.moveTo(x + w - 80, y + 50); ctx.lineTo(x + w - 80, y + h - 50);
    ctx.stroke();
    // battery
    const by = y + h / 2;
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x + 70, by - 14); ctx.lineTo(x + 70, by + 14);
    ctx.moveTo(x + 76, by - 8); ctx.lineTo(x + 76, by + 8);
    ctx.stroke();
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 11px var(--font-mono)';
    ctx.fillText(`${params.V} V`, x + 50, by + 4);

    // 3 branches
    const c = compute();
    for (let i = 0; i < 3; i++) {
      const branchX = x + 200 + i * (w - 320) / 2;
      // vertical wire
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(branchX, y + 50); ctx.lineTo(branchX, y + h - 50);
      ctx.stroke();
      drawBulb(ctx, branchX, y + h / 2 - 30, params.on[i], c.perBulb[i].P, params.R[i], i + 1);
    }
  }

  function drawBulb(ctx, x, y, on, P, R, idx) {
    const r = 22;
    const t = on ? Math.min(1, P * 8) : 0;
    const intensity = `rgba(251,191,36,${0.2 + t * 0.7})`;
    ctx.fillStyle = on ? intensity : 'rgba(120,130,150,0.3)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = on ? '#fbbf24' : '#94a3b8';
    ctx.lineWidth = 2;
    ctx.stroke();
    // filament
    ctx.strokeStyle = on ? `rgba(255,255,255,${0.3 + t * 0.5})` : 'rgba(120,130,150,0.4)';
    ctx.beginPath();
    ctx.moveTo(x - 10, y); ctx.lineTo(x - 4, y - 8); ctx.lineTo(x + 4, y + 8); ctx.lineTo(x + 10, y);
    ctx.stroke();
    // glow
    if (on && t > 0) {
      const grad = ctx.createRadialGradient(x, y, r, x, y, r + 30);
      grad.addColorStop(0, `rgba(251,191,36,${t * 0.4})`);
      grad.addColorStop(1, 'rgba(251,191,36,0)');
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(x, y, r + 30, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px var(--font-mono)';
    ctx.textAlign = 'center';
    ctx.fillText(`${R}Ω`, x, y + r + 16);
    ctx.fillText(`#${idx}`, x, y + r + 30);
    ctx.textAlign = 'left';
  }

  // controls
  const modeSel = select({
    label: 'Configuration',
    options: [{ value: 'series', label: 'Series' }, { value: 'parallel', label: 'Parallel' }],
    value: params.mode,
    onChange: (v) => { params.mode = v; },
  });
  ctrlPanel.appendChild(modeSel.el);
  for (let i = 0; i < 3; i++) {
    const s = slider({ label: `Bulb ${i + 1} R (Ω)`, min: 1, max: 100, step: 1, value: params.R[i],
      onInput: (v) => { params.R[i] = v; } });
    ctrlPanel.appendChild(s.el);
  }
  const VS = slider({ label: 'Battery V', min: 1, max: 24, step: 0.5, value: params.V, format: (v) => v.toFixed(1),
    onInput: (v) => { params.V = v; } });
  ctrlPanel.appendChild(VS.el);
  const swRow = document.createElement('div');
  swRow.className = 'ctrl-row';
  for (let i = 0; i < 3; i++) {
    const b = button({ label: `Toggle bulb ${i + 1}`, onClick: () => { params.on[i] = !params.on[i]; } });
    swRow.appendChild(b.el);
  }
  ctrlPanel.appendChild(swRow);

  // Lab — verify Ohm's law and the series/parallel resistance rules.
  const lab = labPanel({
    title: "Circuits lab — Ohm's law & resistance rules",
    filename: 'circuits-lab.csv',
    columns: [
      { key: 'mode', label: 'config' },
      { key: 'V',    label: 'V (V)',    format: (v) => v.toFixed(2) },
      { key: 'R1',   label: 'R₁ (Ω)' },
      { key: 'R2',   label: 'R₂ (Ω)' },
      { key: 'R3',   label: 'R₃ (Ω)' },
      { key: 'Rt',   label: 'R_total (Ω)', format: (v) => Number.isFinite(v) ? v.toFixed(2) : 'open' },
      { key: 'I',    label: 'I_total (mA)', format: (v) => (v * 1000).toFixed(2) },
      { key: 'note', label: 'note' },
    ],
    procedure: [
      'Series mode, R = 10, 20, 30 Ω, V = 12 V. Record. Verify R_total = R₁+R₂+R₃ = 60 Ω.',
      'Parallel mode, same Rs. Record. Verify 1/R_total = 1/R₁+1/R₂+1/R₃; expect ~5.45 Ω.',
      'In series, toggle off bulb 2 → I drops to 0 (open circuit). Add a row with the note.',
      'In parallel, toggle off bulb 2 → others unchanged. Compare to series.',
      'Vary R₁ from 1 to 100 Ω at fixed V; verify I = V/R_total.',
    ],
    predict: 'Two 100 Ω bulbs in series vs in parallel on a 10 V battery. In which case is each bulb brighter?',
    source: () => {
      const c = compute();
      return {
        mode: params.mode,
        V: params.V,
        R1: params.R[0], R2: params.R[1], R3: params.R[2],
        Rt: c.Rt,
        I: c.I,
        note: params.on.map((o, i) => o ? '' : `bulb ${i+1} off`).filter(Boolean).join(', '),
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
