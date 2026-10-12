import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, select, toggle, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { tr } from '../../../i18n/index.js';

const L = (en, id) => tr({ en, id });
const MONO = 'ui-monospace, Menlo, Consolas, monospace';
const ROOM = 20, FLAME = 300, CELLS = 40, FLUID = 150;
const MATERIALS = {
  copper: { name: { en: 'copper', id: 'tembaga' }, alpha: 1.0,  color: '#b87333' },
  steel:  { name: { en: 'steel', id: 'baja' },     alpha: 0.18, color: '#94a3b8' },
  glass:  { name: { en: 'glass', id: 'kaca' },     alpha: 0.03, color: '#bae6fd' },
  wood:   { name: { en: 'wood', id: 'kayu' },      alpha: 0.006, color: '#a16207' },
};
const MODES = {
  conduction: { en: 'Conduction', id: 'Konduksi' },
  convection: { en: 'Convection', id: 'Konveksi' },
  radiation:  { en: 'Radiation', id: 'Radiasi' },
};
const heatColor = (T) => {
  const f = Math.max(0, Math.min(1, (T - ROOM) / (FLAME - ROOM)));
  return `hsl(${220 - 220 * f}, 90%, ${35 + 30 * f}%)`;
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const st = { mode: 'conduction', mat: 'copper', time: 0, heater: true, lamp: 100, can: 'black' };
  let rod = new Array(CELLS).fill(ROOM);
  let fluid = [];
  const cans = { black: { T: ROOM, absorb: 0.95 }, shiny: { T: ROOM, absorb: 0.1 } };
  const topTemp = () => {
    const top = fluid.filter((p) => p.y < 0.25);
    return top.length ? top.reduce((s, p) => s + p.T, 0) / top.length : ROOM;
  };

  function reset() {
    st.time = 0;
    rod = new Array(CELLS).fill(ROOM);
    fluid = [];
    for (let i = 0; i < FLUID; i++) fluid.push({ x: Math.random(), y: Math.random(), vx: 0, vy: 0, T: ROOM, dye: 0 });
    cans.black.T = ROOM; cans.shiny.T = ROOM;
  }
  reset();

  // ---- physics -----------------------------------------------------------
  function stepRod(dt) {
    const a = MATERIALS[st.mat].alpha * 60;
    for (let s = 0; s < 4; s++) {
      const h = dt / 4;
      const next = rod.slice();
      next[0] += (FLAME - rod[0]) * 3 * h;
      for (let i = 1; i < CELLS - 1; i++) {
        next[i] += a * (rod[i - 1] - 2 * rod[i] + rod[i + 1]) * h - (rod[i] - ROOM) * 0.05 * h;
      }
      next[CELLS - 1] += a * (rod[CELLS - 2] - rod[CELLS - 1]) * h - (rod[CELLS - 1] - ROOM) * 0.05 * h;
      rod = next;
    }
  }

  function stepFluid(dt) {
    const mean = fluid.reduce((s, p) => s + p.T, 0) / fluid.length;
    for (const p of fluid) {
      if (st.heater && p.y > 0.9 && Math.abs(p.x - 0.5) < 0.18) p.T = Math.min(90, p.T + 50 * dt);
      p.T += (ROOM - p.T) * (p.y < 0.12 ? 0.6 : 0.1) * dt;
      p.vy -= (p.T - mean) * 0.03 * dt;
      if (p.y > 0.8) p.vx += (0.5 - p.x) * 0.4 * dt;
      if (p.y < 0.2) p.vx += Math.sign(p.x - 0.5) * 0.25 * dt;
      p.vx += (Math.random() - 0.5) * 0.02 * dt; p.vy += (Math.random() - 0.5) * 0.02 * dt;
      const damp = Math.exp(-dt * 1.2);
      p.vx *= damp; p.vy *= damp;
      p.x += p.vx * dt; p.y += p.vy * dt;
      if (p.x < 0.02) { p.x = 0.02; p.vx = Math.abs(p.vx); }
      if (p.x > 0.98) { p.x = 0.98; p.vx = -Math.abs(p.vx); }
      if (p.y < 0.03) { p.y = 0.03; p.vy = Math.abs(p.vy) * 0.3; }
      if (p.y > 0.97) { p.y = 0.97; p.vy = -Math.abs(p.vy) * 0.3; }
      if (p.dye > 0) p.dye = Math.max(0, p.dye - dt / 30);
    }
  }

  function stepCans(dt) {
    for (const c of Object.values(cans)) c.T += (c.absorb * st.lamp * 0.03 - (c.T - ROOM) * 0.04) * dt;
  }

  // ---- drawing -----------------------------------------------------------
  function drawThermo(ctx, x, y, h, T, Tmax, label) {
    const f = Math.max(0, Math.min(1, (T - 0) / Tmax));
    ctx.fillStyle = 'rgba(226,232,240,0.2)';
    ctx.fillRect(x - 5, y, 10, h);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(x - 3, y + h - f * h, 6, f * h);
    ctx.beginPath(); ctx.arc(x, y + h + 7, 9, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = `bold 12px ${MONO}`;
    ctx.textAlign = 'center';
    ctx.fillText(`${T.toFixed(0)} °C`, x, y - 8);
    if (label) { ctx.fillStyle = 'rgba(148,163,184,0.9)'; ctx.font = `10px ${MONO}`; ctx.fillText(label, x, y + h + 28); }
    ctx.textAlign = 'left';
  }

  function drawConduction(ctx, W, H) {
    const x0 = 0.14 * W, x1 = 0.78 * W, y = 0.5 * H, th = 0.08 * H;
    const cw = (x1 - x0) / CELLS;
    for (let i = 0; i < CELLS; i++) {
      ctx.fillStyle = heatColor(rod[i]);
      ctx.fillRect(x0 + i * cw, y - th / 2, cw + 1, th);
    }
    ctx.strokeStyle = MATERIALS[st.mat].color; ctx.lineWidth = 3;
    ctx.strokeRect(x0, y - th / 2, x1 - x0, th);
    // flame (flickering)
    const fl = 0.04 * H * (1 + 0.25 * Math.sin(st.time * 17));
    for (const [col, k] of [['#f97316', 1], ['#fbbf24', 0.6], ['#fef08a', 0.3]]) {
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.moveTo(x0 - 0.03 * W, y + th / 2 + 0.16 * H);
      ctx.quadraticCurveTo(x0 + 0.01 * W, y + th / 2 + 0.16 * H - fl * 4 * k, x0 + 0.05 * W, y + th / 2 + 0.16 * H);
      ctx.fill();
    }
    ctx.fillStyle = '#475569';
    ctx.fillRect(x0 - 0.04 * W, y + th / 2 + 0.16 * H, 0.1 * W, 0.03 * H);
    ctx.fillStyle = 'rgba(148,163,184,0.9)';
    ctx.font = `11px ${MONO}`;
    ctx.fillText(`${L('flame', 'api')} ${FLAME} °C`, x0 - 0.04 * W, y + th / 2 + 0.24 * H);
    ctx.fillText(L('heat travels along the rod, particle to particle', 'kalor merambat sepanjang batang, dari partikel ke partikel'), x0, y - th / 2 - 14);
    drawThermo(ctx, x1 + 0.06 * W, 0.22 * H, 0.45 * H, rod[CELLS - 1], FLAME, L('far end', 'ujung jauh'));
    // colour legend
    for (let i = 0; i < 40; i++) { ctx.fillStyle = heatColor(ROOM + (i / 39) * (FLAME - ROOM)); ctx.fillRect(x0 + i * 4, 0.86 * H, 4, 10); }
    ctx.fillStyle = 'rgba(148,163,184,0.9)';
    ctx.fillText(`${ROOM} °C`, x0, 0.86 * H + 24); ctx.fillText(`${FLAME} °C`, x0 + 130, 0.86 * H + 24);
  }

  function drawConvection(ctx, W, H) {
    const bx = 0.25 * W, by = 0.12 * H, bw = 0.4 * W, bh = 0.7 * H;
    ctx.fillStyle = 'rgba(56,189,248,0.12)';
    ctx.fillRect(bx, by, bw, bh);
    for (const p of fluid) {
      const T = p.T;
      ctx.fillStyle = p.dye > 0 ? `rgba(236,72,153,${0.4 + 0.6 * p.dye})` : `hsl(${220 - 200 * Math.min(1, (T - ROOM) / 70)}, 80%, 55%)`;
      ctx.beginPath(); ctx.arc(bx + p.x * bw, by + p.y * bh, p.dye > 0 ? 6 : 4, 0, Math.PI * 2); ctx.fill();
    }
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx, by + bh); ctx.lineTo(bx + bw, by + bh); ctx.lineTo(bx + bw, by); ctx.stroke();
    ctx.fillStyle = st.heater ? '#ef4444' : '#475569';
    ctx.fillRect(bx + 0.32 * bw, by + bh + 6, 0.36 * bw, 0.04 * H);
    ctx.fillStyle = 'rgba(148,163,184,0.9)';
    ctx.font = `11px ${MONO}`;
    ctx.fillText(`${L('heater', 'pemanas')} ${st.heater ? L('ON', 'NYALA') : L('OFF', 'MATI')}`, bx + 0.32 * bw, by + bh + 0.04 * H + 20);
    ctx.fillText(L('hot water rises, cool water sinks: a convection current', 'air panas naik, air dingin turun: arus konveksi'), bx, by - 14);
    drawThermo(ctx, 0.78 * W, 0.22 * H, 0.45 * H, topTemp(), 100, L('top of beaker', 'bagian atas gelas'));
  }

  function drawRadiation(ctx, W, H) {
    const lx = 0.5 * W, ly = 0.14 * H;
    const glow = st.lamp / 100;
    ctx.fillStyle = `rgba(254,240,138,${0.15 * glow})`;
    ctx.beginPath(); ctx.arc(lx, ly, 0.12 * W * glow + 10, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = `hsl(50, 100%, ${50 + 40 * glow}%)`;
    ctx.beginPath(); ctx.arc(lx, ly, 0.03 * W, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#475569'; ctx.fillRect(lx - 6, 0, 12, ly - 0.03 * W);
    const canW = 0.1 * W, canH = 0.22 * H, cy = 0.5 * H;
    const places = [['black', 0.3 * W, '#111827', '#374151'], ['shiny', 0.7 * W, '#e5e7eb', '#fff']];
    const dash = (st.time * 60) % 16;
    for (const [key, cx, fill, stroke] of places) {
      // rays from the lamp; absorbed by black, bounced off shiny
      ctx.strokeStyle = `rgba(254,240,138,${0.3 + 0.5 * glow})`; ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 8]); ctx.lineDashOffset = -dash;
      for (let k = -1; k <= 1; k++) {
        const tx = cx + k * canW * 0.35, ty = cy - canH / 2;
        ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(tx, ty); ctx.stroke();
        if (key === 'shiny') { ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(tx + (tx - lx) * 0.7, ty - (ly - ty) * 0.2 - 30); ctx.stroke(); }
      }
      ctx.setLineDash([]);
      ctx.fillStyle = fill; ctx.strokeStyle = stroke; ctx.lineWidth = 2;
      ctx.fillRect(cx - canW / 2, cy - canH / 2, canW, canH);
      ctx.strokeRect(cx - canW / 2, cy - canH / 2, canW, canH);
      ctx.fillStyle = 'rgba(148,163,184,0.9)'; ctx.font = `11px ${MONO}`; ctx.textAlign = 'center';
      ctx.fillText(key === 'black' ? L('black can', 'kaleng hitam') : L('shiny can', 'kaleng mengkilap'), cx, cy + canH / 2 + 16);
      ctx.textAlign = 'left';
      drawThermo(ctx, cx + canW / 2 + 0.05 * W, cy - canH / 2, canH, cans[key].T, 100);
    }
    ctx.fillStyle = 'rgba(148,163,184,0.9)'; ctx.font = `11px ${MONO}`;
    ctx.fillText(L('dark surfaces absorb radiation; shiny surfaces reflect it', 'permukaan gelap menyerap radiasi; permukaan mengkilap memantulkannya'), 0.1 * W, 0.9 * H);
  }

  function draw(dt) {
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    st.time += dt;
    if (st.mode === 'conduction') stepRod(dt);
    else if (st.mode === 'convection') stepFluid(dt);
    else stepCans(dt);
    const ctx = cv.ctx;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    ctx.textAlign = 'left';
    if (st.mode === 'conduction') drawConduction(ctx, W, H);
    else if (st.mode === 'convection') drawConvection(ctx, W, H);
    else drawRadiation(ctx, W, H);
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 230, 44);
    ctx.fillStyle = '#fff'; ctx.font = `bold 13px ${MONO}`;
    ctx.fillText(tr(MODES[st.mode]) + (st.mode === 'conduction' ? ` — ${tr(MATERIALS[st.mat].name)}` : ''), 16, 26);
    ctx.fillStyle = '#fbbf24'; ctx.font = `12px ${MONO}`;
    ctx.fillText(`${L('time', 'waktu')} = ${st.time.toFixed(1)} s`, 16, 44);
  }

  // ---- controls ----------------------------------------------------------
  const modeBtns = Object.keys(MODES).map((m) => button({ label: tr(MODES[m]), onClick: () => { st.mode = m; reset(); syncControls(); } }));
  const matSel = select({ label: L('Rod material', 'Bahan batang'), key: 'material',
    options: Object.keys(MATERIALS).map((k) => ({ value: k, label: tr(MATERIALS[k].name) })), value: st.mat,
    onChange: (v) => { st.mat = v; reset(); } });
  const heaterT = toggle({ label: L('Heater on', 'Pemanas nyala'), key: 'heater', value: st.heater, onChange: (v) => { st.heater = v; } });
  const dyeBtn = button({ label: L('Add dye', 'Teteskan pewarna'), onClick: () => {
    for (const p of fluid) if (Math.hypot(p.x - 0.5, p.y - 0.2) < 0.22) p.dye = 1;
  } });
  const lampS = slider({ label: L('Lamp brightness (%)', 'Terang lampu (%)'), key: 'lamp', min: 0, max: 100, step: 5, value: st.lamp, onInput: (v) => { st.lamp = v; } });
  const canSel = select({ label: L('Can to record', 'Kaleng yang direkam'), key: 'can', value: st.can,
    options: [{ value: 'black', label: L('black can', 'kaleng hitam') }, { value: 'shiny', label: L('shiny can', 'kaleng mengkilap') }],
    onChange: (v) => { st.can = v; } });
  const resetBtn = button({ label: L('Reset timer', 'Atur ulang waktu'), onClick: reset });
  const convRow = row(heaterT, dyeBtn);
  ctrlPanel.append(row(...modeBtns), matSel.el, convRow, lampS.el, canSel.el, row(resetBtn));
  function syncControls() {
    matSel.el.style.display = st.mode === 'conduction' ? '' : 'none';
    convRow.style.display = st.mode === 'convection' ? '' : 'none';
    lampS.el.style.display = st.mode === 'radiation' ? '' : 'none';
    canSel.el.style.display = st.mode === 'radiation' ? '' : 'none';
  }
  syncControls();

  const lab = labPanel({
    title: L('Heat transfer lab', 'Lab perpindahan kalor'),
    filename: 'heat-transfer-lab.csv',
    columns: [
      { key: 'mode', label: L('mode', 'cara') },
      { key: 'mat', label: L('material / surface', 'bahan / permukaan') },
      { key: 't', label: L('time (s)', 'waktu (s)'), format: (v) => v.toFixed(1) },
      { key: 'T', label: L('far-end temperature (°C)', 'suhu ujung jauh (°C)'), format: (v) => v.toFixed(1) },
    ],
    procedure: [
      L('Conduction: choose copper, press Reset, wait 20 s, then Record the far-end temperature.', 'Konduksi: pilih tembaga, tekan Atur ulang, tunggu 20 s, lalu Rekam suhu ujung jauh.'),
      L('Repeat with steel, glass and wood. Which rod warms up fastest?', 'Ulangi dengan baja, kaca dan kayu. Batang mana yang paling cepat panas?'),
      L('Convection: switch the heater on, add dye, and Record the top temperature after 20 s.', 'Konveksi: nyalakan pemanas, teteskan pewarna, dan Rekam suhu bagian atas setelah 20 s.'),
      L('Radiation: set the lamp to 100%. After 30 s, Record the black can, then the shiny can.', 'Radiasi: atur lampu ke 100%. Setelah 30 s, Rekam kaleng hitam, lalu kaleng mengkilap.'),
      L('Compare all rows. Which way of moving heat was fastest in each setup?', 'Bandingkan semua baris. Cara perpindahan kalor mana yang paling cepat di tiap percobaan?'),
    ],
    predict: L('Which rod will be hottest at the far end after 20 seconds? Which can will get hotter under the lamp?',
      'Batang mana yang ujung jauhnya paling panas setelah 20 detik? Kaleng mana yang lebih panas di bawah lampu?'),
    source: () => {
      if (st.mode === 'conduction') return { mode: tr(MODES.conduction), mat: tr(MATERIALS[st.mat].name), t: st.time, T: rod[CELLS - 1] };
      if (st.mode === 'convection') return { mode: tr(MODES.convection), mat: `${L('water', 'air')} (${st.heater ? L('heater on', 'pemanas nyala') : L('heater off', 'pemanas mati')})`, t: st.time, T: topTemp() };
      return { mode: tr(MODES.radiation), mat: st.can === 'black' ? L('black can', 'kaleng hitam') : L('shiny can', 'kaleng mengkilap'), t: st.time, T: cans[st.can].T };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => draw(dt));
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
