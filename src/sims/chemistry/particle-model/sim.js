import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, select, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { tr } from '../../../i18n/index.js';

const L = (en, id) => tr({ en, id });
const MONO = 'ui-monospace, Menlo, Consolas, monospace';
const SUBS = {
  water:   { name: { en: 'water', id: 'air' },      mp: 0,    bp: 100,  Tmin: -50,  Tmax: 150,  color: '#38bdf8' },
  ethanol: { name: { en: 'ethanol', id: 'etanol' }, mp: -114, bp: 78,   Tmin: -150, Tmax: 130,  color: '#a78bfa' },
  iron:    { name: { en: 'iron', id: 'besi' },      mp: 1538, bp: 2862, Tmin: 0,    Tmax: 3200, color: '#fb923c' },
};
const PLATEAU = 4; // seconds the temperature stays flat while melting / boiling
const LIQ_H = 0.45; // fraction of the box height a liquid fills

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const st = { sub: 'water', T: 20, melt: 1, boil: 0, heating: false, time: 0, piston: 1, N: 30 };
  let history = [];
  let sampleAcc = 0;
  let pressure = 0; // smoothed wall hits per second
  let particles = [];
  const sub = () => SUBS[st.sub];
  const tempOf = (f) => sub().Tmin + (f / 100) * (sub().Tmax - sub().Tmin);
  const fracOf = (T) => (100 * (T - sub().Tmin)) / (sub().Tmax - sub().Tmin);

  function phaseName() {
    if (st.boil >= 1) return L('gas', 'gas');
    if (st.boil > 0) return L('boiling', 'mendidih');
    if (st.melt >= 1) return L('liquid', 'cair');
    if (st.melt > 0) return L('melting', 'meleleh');
    return L('solid', 'padat');
  }

  function rebuildParticles() {
    particles = [];
    for (let i = 0; i < st.N; i++) {
      const a = Math.random() * Math.PI * 2;
      particles.push({ x: Math.random() * st.piston, y: 1 - Math.random() * LIQ_H, vx: Math.cos(a), vy: Math.sin(a), ph: Math.random() * 6.28 });
    }
  }
  rebuildParticles();

  function setTemp(T, manual) {
    st.T = Math.max(sub().Tmin, Math.min(sub().Tmax, T));
    if (manual) {
      st.melt = st.T > sub().mp ? 1 : 0;
      st.boil = st.T > sub().bp ? 1 : 0;
    }
  }

  function heatStep(dt) {
    const s = sub();
    const rate = (s.Tmax - s.Tmin) / 40;
    if (st.T < s.mp) setTemp(Math.min(s.mp, st.T + rate * dt));
    else if (st.melt < 1) st.melt = Math.min(1, st.melt + dt / PLATEAU);
    else if (st.T < s.bp) setTemp(Math.min(s.bp, st.T + rate * dt));
    else if (st.boil < 1) st.boil = Math.min(1, st.boil + dt / PLATEAU);
    else if (st.T < s.Tmax) setTemp(st.T + rate * dt);
    else st.heating = false;
    tS.value = fracOf(st.T);
    st.time += dt;
    sampleAcc += dt;
    if (sampleAcc > 0.2) { sampleAcc = 0; history.push({ t: st.time, T: st.T }); }
  }

  function moveParticles(dt, t) {
    const speed = 0.6 * Math.sqrt(Math.max(st.T + 273, 1) / 373);
    const nGas = Math.round(st.boil * st.N);
    const nFree = Math.round(st.melt * st.N);
    const cols = Math.max(1, Math.floor(st.piston * 12));
    const dy = Math.min(0.09, 0.95 / Math.ceil(st.N / cols));
    const jitter = 0.004 + 0.012 * Math.max(0, (st.T - sub().Tmin) / (sub().mp - sub().Tmin + 1));
    let hits = 0;
    particles.forEach((p, i) => {
      if (i >= nFree) { // solid: vibrate around a lattice home at the bottom
        const hx = ((i % cols) + 0.5) / 12, hy = 1 - dy / 2 - Math.floor(i / cols) * dy;
        p.x = hx + jitter * Math.sin(p.ph + t * 6 * speed);
        p.y = hy + jitter * Math.cos(p.ph * 1.3 + t * 6 * speed);
        return;
      }
      const gas = i < nGas;
      const top = gas ? 0 : 1 - LIQ_H;
      const v = gas ? speed : speed * 0.4;
      p.x += p.vx * v * dt; p.y += p.vy * v * dt;
      if (p.x < 0) { p.x = 0; p.vx = Math.abs(p.vx); if (gas) hits++; }
      if (p.x > st.piston) { p.x = st.piston; p.vx = -Math.abs(p.vx); if (gas) hits++; }
      if (p.y < top) { p.y = top; p.vy = Math.abs(p.vy); if (gas) hits++; }
      if (p.y > 1) { p.y = 1; p.vy = -Math.abs(p.vy); if (gas) hits++; }
    });
    const k = 1 - Math.exp(-dt * 1.5);
    pressure += (hits / Math.max(dt, 1e-3) - pressure) * k;
  }

  function draw(dt, t) {
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    if (st.heating) heatStep(dt);
    moveParticles(dt, t);
    const ctx = cv.ctx;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    ctx.textAlign = 'left';

    // Box and piston
    const bx = 0.03 * W, by = 0.08 * H, bw = 0.5 * W, bh = 0.5 * H;
    const px = bx + st.piston * bw;
    ctx.fillStyle = 'rgba(56,189,248,0.06)';
    ctx.fillRect(bx, by, px - bx, bh);
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx, by + bh); ctx.lineTo(bx + bw, by + bh); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + bw, by); ctx.stroke();
    ctx.fillStyle = '#64748b';
    ctx.fillRect(px - 6, by - 2, 12, bh + 4);
    ctx.fillRect(px, by + bh / 2 - 4, bx + bw + 20 - px, 8);
    const r = Math.max(3, 0.011 * W);
    ctx.fillStyle = sub().color;
    for (const p of particles) {
      ctx.beginPath(); ctx.arc(bx + p.x * bw, by + p.y * bh, r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = 'rgba(148,163,184,0.85)';
    ctx.font = `bold 12px ${MONO}`;
    ctx.fillText(`${tr(sub().name)} — ${phaseName()}`, bx, by - 8);
    ctx.font = `11px ${MONO}`;
    ctx.fillText(`${L('volume', 'volume')} = ${Math.round(st.piston * 1000)} cm³   ${L('(drag the piston)', '(seret piston)')}`, bx, by + bh + 16);

    drawCurve(ctx, 0.07 * W, 0.68 * H, 0.48 * W, 0.26 * H);
    drawThermometer(ctx, 0.63 * W, 0.08 * H, 0.5 * H);
    drawGauge(ctx, 0.85 * W, 0.34 * H, 0.1 * W);

    const ix = 0.6 * W, iy = 0.68 * H;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(ix, iy - 14, 0.38 * W, 0.28 * H);
    ctx.font = `11px ${MONO}`;
    ctx.fillStyle = '#fff';
    const lh = 0.045 * H;
    ctx.fillText(`${L('temperature', 'suhu')} = ${st.T.toFixed(0)} °C`, ix + 8, iy);
    ctx.fillText(`${L('state', 'wujud')} = ${phaseName()}`, ix + 8, iy + lh);
    ctx.fillText(`${L('pressure', 'tekanan')} = ${pressure.toFixed(0)} ${L('hits/s', 'tumbukan/s')}`, ix + 8, iy + 2 * lh);
    ctx.fillStyle = 'rgba(148,163,184,0.9)';
    ctx.fillText(`${L('melts at', 'meleleh pada')} ${sub().mp} °C · ${L('boils at', 'mendidih pada')} ${sub().bp} °C`, ix + 8, iy + 3 * lh);
    ctx.fillText(L('hotter = faster particles', 'lebih panas = partikel lebih cepat'), ix + 8, iy + 4 * lh);
  }

  function drawCurve(ctx, x, y, w, h) {
    const s = sub();
    const tMax = Math.max(60, st.time);
    const x2 = (tt) => x + (tt / tMax) * w;
    const y2 = (T) => y + h - ((T - s.Tmin) / (s.Tmax - s.Tmin)) * h;
    ctx.strokeStyle = 'rgba(120,130,150,0.3)'; ctx.lineWidth = 1;
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = 'rgba(148,163,184,0.85)';
    ctx.font = `bold 11px ${MONO}`;
    ctx.fillText(L('heating curve: temperature vs time', 'kurva pemanasan: suhu vs waktu'), x + 6, y - 6);
    ctx.font = `9px ${MONO}`;
    ctx.setLineDash([4, 4]);
    for (const [T, lab] of [[s.mp, L('melting', 'meleleh')], [s.bp, L('boiling', 'mendidih')]]) {
      ctx.strokeStyle = 'rgba(251,191,36,0.5)';
      ctx.beginPath(); ctx.moveTo(x, y2(T)); ctx.lineTo(x + w, y2(T)); ctx.stroke();
      ctx.fillStyle = '#fbbf24';
      ctx.fillText(`${T} °C ${lab}`, x + w - 90, y2(T) - 3);
    }
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(148,163,184,0.7)';
    ctx.fillText(`${s.Tmin}`, x - 28, y + h + 3);
    ctx.fillText(`${s.Tmax}`, x - 28, y + 8);
    ctx.fillText(`${tMax.toFixed(0)} s`, x + w - 24, y + h + 12);
    ctx.fillText('0 s', x, y + h + 12);
    ctx.strokeStyle = s.color; ctx.lineWidth = 2;
    ctx.beginPath();
    history.forEach((p, i) => { if (i === 0) ctx.moveTo(x2(p.t), y2(p.T)); else ctx.lineTo(x2(p.t), y2(p.T)); });
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(x2(st.time), y2(st.T), 4, 0, Math.PI * 2); ctx.fill();
  }

  function drawThermometer(ctx, x, y, h) {
    const s = sub();
    const y2 = (T) => y + h - ((T - s.Tmin) / (s.Tmax - s.Tmin)) * h;
    ctx.fillStyle = 'rgba(226,232,240,0.15)';
    ctx.fillRect(x - 8, y, 16, h);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(x - 5, y2(st.T), 10, y + h - y2(st.T));
    ctx.beginPath(); ctx.arc(x, y + h + 10, 14, 0, Math.PI * 2); ctx.fill();
    ctx.font = `9px ${MONO}`;
    for (let i = 0; i <= 5; i++) {
      const T = s.Tmin + (i / 5) * (s.Tmax - s.Tmin);
      ctx.strokeStyle = 'rgba(226,232,240,0.6)';
      ctx.beginPath(); ctx.moveTo(x + 8, y2(T)); ctx.lineTo(x + 14, y2(T)); ctx.stroke();
      ctx.fillStyle = 'rgba(226,232,240,0.8)';
      ctx.fillText(`${T.toFixed(0)}`, x + 18, y2(T) + 3);
    }
    ctx.fillStyle = '#fff';
    ctx.font = `bold 13px ${MONO}`;
    ctx.textAlign = 'center';
    ctx.fillText(`${st.T.toFixed(0)} °C`, x, y - 10);
    ctx.textAlign = 'left';
  }

  function drawGauge(ctx, cx, cy, R) {
    const frac = Math.min(1, pressure / 300);
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(cx, cy, R, Math.PI, 2 * Math.PI); ctx.stroke();
    ctx.strokeStyle = '#ef4444';
    ctx.beginPath(); ctx.arc(cx, cy, R, Math.PI * 1.7, 2 * Math.PI); ctx.stroke();
    const a = Math.PI + frac * Math.PI;
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * R * 0.9, cy + Math.sin(a) * R * 0.9); ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.font = `bold 12px ${MONO}`;
    ctx.textAlign = 'center';
    ctx.fillText(`${pressure.toFixed(0)} ${L('hits/s', 'tumbukan/s')}`, cx, cy + 18);
    ctx.fillStyle = 'rgba(148,163,184,0.85)';
    ctx.font = `11px ${MONO}`;
    ctx.fillText(L('pressure gauge', 'pengukur tekanan'), cx, cy - R - 8);
    ctx.textAlign = 'left';
  }

  const drag = dragHandle(cv.canvas, {
    hitTest(sx, sy) {
      const W = cv.width, H = cv.height;
      const px = 0.03 * W + st.piston * 0.5 * W;
      return Math.abs(sx - px) < 14 && sy > 0.08 * H && sy < 0.58 * H ? 'piston' : null;
    },
    onDrag(_id, sx) {
      st.piston = Math.max(0.35, Math.min(1, (sx - 0.03 * cv.width) / (0.5 * cv.width)));
      for (const p of particles) if (p.x > st.piston) p.x = st.piston;
    },
    handles: () => [{ id: 'piston', x: 0.03 * cv.width + st.piston * 0.5 * cv.width, y: 0.33 * cv.height, label: L('Piston (drag to change volume)', 'Piston (seret untuk mengubah volume)') }],
    cursor: 'default',
    hoverCursor: 'ew-resize',
  });

  const subSel = select({ label: L('Substance', 'Zat'), key: 'substance',
    options: Object.keys(SUBS).map((k) => ({ value: k, label: tr(SUBS[k].name) })), value: st.sub,
    onChange: (v) => { st.sub = v; reset(); } });
  const tS = slider({ label: L('Temperature', 'Suhu'), key: 'temp', min: 0, max: 100, step: 0.5, value: fracOf(st.T),
    format: (v) => `${tempOf(v).toFixed(0)} °C`,
    onInput: (v) => { st.heating = false; setTemp(tempOf(v), true); heatBtn.label = L('Heat', 'Panaskan'); } });
  const nS = slider({ label: L('Particles', 'Jumlah partikel'), key: 'n', min: 10, max: 60, step: 1, value: st.N,
    onInput: (v) => { st.N = v; rebuildParticles(); } });
  const heatBtn = button({ label: L('Heat', 'Panaskan'), primary: true, onClick: () => {
    st.heating = !st.heating;
    heatBtn.label = st.heating ? L('Stop heating', 'Berhenti memanaskan') : L('Heat', 'Panaskan');
  } });
  const resetBtn = button({ label: L('Reset (cold)', 'Atur ulang (dingin)'), onClick: reset });
  function reset() {
    st.heating = false; st.time = 0; history = []; pressure = 0;
    setTemp(sub().Tmin, true);
    tS.value = 0;
    heatBtn.label = L('Heat', 'Panaskan');
    rebuildParticles();
  }
  ctrlPanel.append(subSel.el, tS.el, nS.el, row(heatBtn, resetBtn));

  const lab = labPanel({
    title: L('Particle model lab', 'Lab model partikel'),
    filename: 'particle-model-lab.csv',
    columns: [
      { key: 'sub', label: L('substance', 'zat') },
      { key: 'T', label: L('temperature (°C)', 'suhu (°C)'), format: (v) => v.toFixed(0) },
      { key: 'state', label: L('state', 'wujud') },
      { key: 'P', label: L('pressure (hits/s)', 'tekanan (tumbukan/s)'), format: (v) => v.toFixed(0) },
      { key: 'V', label: L('volume (cm³)', 'volume (cm³)'), format: (v) => v.toFixed(0) },
    ],
    procedure: [
      L('Choose water and press Reset. Record the cold, solid state.', 'Pilih air dan tekan Atur ulang. Rekam keadaan dingin dan padat.'),
      L('Press Heat. When the particles start to flow (liquid), press Record.', 'Tekan Panaskan. Saat partikel mulai mengalir (cair), tekan Rekam.'),
      L('Keep heating until all particles fly freely (gas). Record again.', 'Terus panaskan sampai semua partikel terbang bebas (gas). Rekam lagi.'),
      L('Push the piston halfway in. Record the new pressure and volume.', 'Dorong piston sampai setengah. Rekam tekanan dan volume baru.'),
      L('Repeat with ethanol and iron. Compare melting and boiling points.', 'Ulangi dengan etanol dan besi. Bandingkan titik leleh dan titik didihnya.'),
    ],
    predict: L('When the box is made smaller, will the particles hit the walls more often or less often?',
      'Jika kotak diperkecil, apakah partikel akan menumbuk dinding lebih sering atau lebih jarang?'),
    source: () => ({ sub: tr(sub().name), T: st.T, state: phaseName(), P: pressure, V: st.piston * 1000 }),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => draw(dt, t));
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
