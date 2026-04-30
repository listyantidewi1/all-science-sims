import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

// Phases parameterized by (T, L, R) on the HR diagram.
// (T = surface temperature K, L = luminosity in L_sun, R = radius in R_sun)

function phasesFor(M) {
  // M in solar masses. Returns sequence of phases with names + (T, L) and a duration in Myr.
  if (M < 0.08) {
    return [
      { name: 'Protostar', T: 3000, L: 0.001, dur: 100, color: '#7c3aed' },
      { name: 'Brown dwarf (failed star)', T: 2200, L: 1e-5, dur: 1e7, color: '#7f1d1d' },
    ];
  }
  if (M < 0.5) {
    return [
      { name: 'Protostar', T: 3500, L: 0.05, dur: 30 },
      { name: 'Red dwarf (M-class)', T: 3200, L: 0.02, dur: 1e6, color: '#dc2626' },
      { name: 'White dwarf (helium)', T: 8000, L: 0.001, dur: 1e8, color: '#fef9c3' },
    ];
  }
  if (M < 8) {
    const ms = Math.round(10000 * Math.pow(M, -2.5));
    return [
      { name: 'Protostar', T: 4500, L: 0.5, dur: 30 },
      { name: 'Main sequence', T: 5800 * Math.pow(M, 0.5), L: Math.pow(M, 3.5), dur: ms },
      { name: 'Subgiant', T: 5000, L: Math.pow(M, 3.5) * 3, dur: 200 },
      { name: 'Red giant', T: 3500, L: Math.pow(M, 3.5) * 100, dur: 200 },
      { name: 'Planetary nebula (puff off)', T: 30000, L: 100, dur: 0.05, color: '#a855f7' },
      { name: 'White dwarf', T: 10000, L: 0.01, dur: 1e9, color: '#fef9c3' },
    ];
  }
  if (M < 25) {
    const ms = Math.round(10000 * Math.pow(M, -2.5));
    return [
      { name: 'Protostar', T: 8000, L: 100, dur: 1 },
      { name: 'Main sequence O/B', T: 10000 + M * 800, L: Math.pow(M, 3.5), dur: ms },
      { name: 'Red supergiant', T: 3500, L: Math.pow(M, 3.5) * 30, dur: 1 },
      { name: 'Type II supernova', T: 50000, L: 1e9, dur: 0.0001, color: '#fbbf24' },
      { name: 'Neutron star', T: 1e6, L: 1e-5, dur: 1e10, color: '#ec4899' },
    ];
  }
  return [
    { name: 'Protostar', T: 25000, L: 1e4, dur: 0.5 },
    { name: 'Main sequence O', T: 35000, L: 1e5, dur: 3 },
    { name: 'Wolf-Rayet (mass loss)', T: 50000, L: 1e6, dur: 0.5 },
    { name: 'Supernova / hypernova', T: 100000, L: 1e10, dur: 0.0001, color: '#fbbf24' },
    { name: 'Black hole', T: 0, L: 0, dur: 1e15, color: '#0b1220' },
  ];
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { M: 1, phaseIdx: 0 };

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const phases = phasesFor(params.M);
    const cur = phases[Math.min(params.phaseIdx, phases.length - 1)];

    // HR diagram on the left
    drawHR(ctx, 30, 30, W * 0.55, H - 60, phases, cur);

    // Star visualization on the right
    drawStar(ctx, W * 0.6, H * 0.3, cur);

    // Phase list
    const listX = W * 0.6, listY = H * 0.55;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(listX, listY, W - listX - 30, H - listY - 30);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`Lifecycle for ${params.M.toFixed(2)} M☉`, listX + 12, listY + 22);
    let yy = listY + 42;
    for (let i = 0; i < phases.length; i++) {
      const ph = phases[i];
      ctx.fillStyle = i === params.phaseIdx ? '#fbbf24' : 'rgba(255,255,255,0.85)';
      ctx.font = i === params.phaseIdx ? 'bold 11px var(--font-mono)' : '11px var(--font-mono)';
      ctx.fillText(`${i + 1}. ${ph.name}  (~${formatDur(ph.dur)})`, listX + 12, yy);
      yy += 16;
    }
  }

  function formatDur(myr) {
    if (myr < 1) return `${(myr * 1e6).toFixed(0)} yr`;
    if (myr < 1000) return `${myr.toFixed(0)} Myr`;
    if (myr < 1e6) return `${(myr / 1000).toFixed(1)} Gyr`;
    return `${(myr / 1e6).toFixed(0)} Tyr`;
  }

  function drawHR(ctx, x, y, w, h, phases, cur) {
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('Hertzsprung-Russell diagram', x + 6, y - 6);
    ctx.fillText('Temperature (K) ←  hot     cool  →', x + w - 220, y + h + 14);
    ctx.save(); ctx.translate(x - 30, y + h / 2 + 30); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Luminosity (L☉) ↑', 0, 0); ctx.restore();

    const Tmin = 2000, Tmax = 60000;
    const Lmin = 1e-5, Lmax = 1e7;
    // T axis is reversed
    const x2 = (T) => x + (1 - (Math.log10(T) - Math.log10(Tmin)) / (Math.log10(Tmax) - Math.log10(Tmin))) * w;
    const y2 = (L) => y + h - (Math.log10(Math.max(Lmin, L)) - Math.log10(Lmin)) / (Math.log10(Lmax) - Math.log10(Lmin)) * h;

    // Main-sequence band
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(x2(40000), y2(1e6));
    ctx.lineTo(x2(2500), y2(1e-3));
    ctx.stroke();

    // Phase trajectory
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i < phases.length; i++) {
      const p = phases[i];
      if (p.T <= 0) continue;
      const px = x2(p.T), py = y2(p.L);
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Phase markers
    for (let i = 0; i < phases.length; i++) {
      const p = phases[i];
      if (p.T <= 0) continue;
      const px = x2(p.T), py = y2(p.L);
      ctx.fillStyle = i === params.phaseIdx ? '#fbbf24' : '#fff';
      ctx.beginPath();
      ctx.arc(px, py, i === params.phaseIdx ? 8 : 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawStar(ctx, cx, cy, ph) {
    if (!ph) return;
    const sizePx = Math.max(10, Math.min(110, 10 * Math.pow(Math.max(0.001, ph.L), 0.15)));
    const color = ph.color || tempColor(ph.T);
    if (color === '#0b1220') {
      // Black hole event horizon
      ctx.fillStyle = '#000';
      ctx.beginPath(); ctx.arc(cx, cy, sizePx, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(cx, cy, sizePx + 16, 0, Math.PI * 2); ctx.stroke();
    } else {
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, sizePx);
      grad.addColorStop(0, '#fff');
      grad.addColorStop(0.5, color);
      grad.addColorStop(1, color + '00');
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(cx, cy, sizePx, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.textAlign = 'center';
    ctx.fillText(ph.name, cx, cy + sizePx + 24);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '10px var(--font-mono)';
    ctx.fillText(`T ≈ ${ph.T.toFixed(0)} K   L ≈ ${ph.L.toExponential(2)} L☉`, cx, cy + sizePx + 40);
    ctx.textAlign = 'left';
  }

  function tempColor(T) {
    if (T < 3500) return '#dc2626';
    if (T < 5000) return '#f97316';
    if (T < 6000) return '#fbbf24';
    if (T < 7500) return '#fef9c3';
    if (T < 10000) return '#ffffff';
    if (T < 30000) return '#bae6fd';
    return '#3b82f6';
  }

  // controls
  const mS = slider({ label: 'Mass (M☉)', min: 0.05, max: 60, step: 0.05, value: params.M, format: (v) => v.toFixed(2),
    onInput: (v) => { params.M = v; params.phaseIdx = 0; phaseS.el.querySelector('input').max = phasesFor(v).length - 1; phaseS.value = 0; } });
  const phaseS = slider({ label: 'Phase', min: 0, max: phasesFor(params.M).length - 1, step: 1, value: 0, format: (v) => `${v + 1}/${phasesFor(params.M).length}`,
    onInput: (v) => { params.phaseIdx = Math.min(phasesFor(params.M).length - 1, v); } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [n, M] of [['Red dwarf 0.3', 0.3], ['Sun-like 1', 1], ['Massive 20', 20], ['Hypergiant 50', 50]]) {
    const b = button({ label: n, onClick: () => {
      params.M = M; mS.value = M; params.phaseIdx = 0;
      phaseS.el.querySelector('input').max = phasesFor(M).length - 1;
      phaseS.value = 0;
    } });
    presetRow.appendChild(b.el);
  }

  ctrlPanel.append(mS.el, phaseS.el, presetRow);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
