import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, select, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
const MAP_W = 600, MAP_H = 400;          // km
const V_P = 8, V_S = 4;                  // km/s (simple round numbers)
const T_MAX = 150;                       // seconds shown on each seismogram
const STATIONS = [
  { name: 'A', x: 120, y: 300, color: '#0ea5e9' },
  { name: 'B', x: 480, y: 320, color: '#10b981' },
  { name: 'C', x: 300, y: 90, color: '#fbbf24' },
];
const FONT = 'ui-monospace, Menlo, Consolas, monospace';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const state = {
    epi: { x: 330, y: 220 },
    t: 0, running: false, speed: 10,
    mystery: false, radii: [0, 0, 0], found: false, labIdx: 0,
  };
  let map = null; // { x, y, w, h, s } screen rect and km->px scale

  const dist = (st) => Math.hypot(st.x - state.epi.x, st.y - state.epi.y);
  const tP = (st) => dist(st) / V_P;
  const tS = (st) => dist(st) / V_S;
  const toPx = (kx, ky) => ({ x: map.x + kx * map.s, y: map.y + ky * map.s });
  const toKm = (px, py) => ({ x: (px - map.x) / map.s, y: (py - map.y) / map.s });

  function resetQuake() { state.t = 0; state.running = false; state.radii = [0, 0, 0]; state.found = false; }
  function checkFound() {
    state.found = STATIONS.every((st, i) => Math.abs(state.radii[i] - dist(st)) < 0.06 * dist(st) + 6);
  }

  function layout() {
    const W = cv.width, H = cv.height;
    const w = W * 0.58 - 30, h = H - 50;
    const s = Math.min(w / MAP_W, h / MAP_H);
    map = { x: 20, y: 40, w: MAP_W * s, h: MAP_H * s, s };
  }

  function wiggle(st, t) {
    const p = tP(st), s = tS(st);
    let a = 0;
    if (t > p) a += 5 * Math.sin((t - p) * 4) * Math.exp(-(t - p) / 15);
    if (t > s) a += 16 * Math.sin((t - s) * 3) * Math.exp(-(t - s) / 25);
    return a;
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W <= 0 || H <= 0) return;
    layout();
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // ---- Map ----
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(map.x, map.y, map.w, map.h);
    ctx.strokeStyle = 'rgba(120,130,150,0.25)';
    ctx.lineWidth = 1;
    for (let k = 100; k < MAP_W; k += 100) { const p = toPx(k, 0); ctx.beginPath(); ctx.moveTo(p.x, map.y); ctx.lineTo(p.x, map.y + map.h); ctx.stroke(); }
    for (let k = 100; k < MAP_H; k += 100) { const p = toPx(0, k); ctx.beginPath(); ctx.moveTo(map.x, p.y); ctx.lineTo(map.x + map.w, p.y); ctx.stroke(); }
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = `bold 12px ${FONT}`;
    ctx.textAlign = 'left';
    ctx.fillText(T('Map — each square is 100 km', 'Peta — tiap kotak 100 km'), map.x, map.y - 10);

    // Wave rings
    const e = toPx(state.epi.x, state.epi.y);
    ctx.save();
    ctx.beginPath(); ctx.rect(map.x, map.y, map.w, map.h); ctx.clip();
    if (state.t > 0) {
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#f87171';
      ctx.beginPath(); ctx.arc(e.x, e.y, V_P * state.t * map.s, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = '#a855f7';
      ctx.beginPath(); ctx.arc(e.x, e.y, V_S * state.t * map.s, 0, Math.PI * 2); ctx.stroke();
      ctx.lineWidth = 1;
    }
    // Distance circles
    STATIONS.forEach((st, i) => {
      const r = state.radii[i];
      if (r <= 0) return;
      const p = toPx(st.x, st.y);
      ctx.strokeStyle = st.color;
      ctx.setLineDash([6, 4]);
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(p.x, p.y, r * map.s, 0, Math.PI * 2); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = st.color;
      ctx.font = `bold 11px ${FONT}`;
      ctx.fillText(`r = ${r.toFixed(0)} km`, p.x + r * map.s + 12, p.y - 10);
    });
    ctx.restore();

    // Epicentre star
    if (!state.mystery || state.found) {
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      for (let k = 0; k < 10; k++) {
        const ang = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 === 0 ? 11 : 5;
        ctx.lineTo(e.x + rr * Math.cos(ang), e.y + rr * Math.sin(ang));
      }
      ctx.closePath(); ctx.fill();
    }
    // Stations + handles
    STATIONS.forEach((st, i) => {
      const p = toPx(st.x, st.y);
      ctx.fillStyle = st.color;
      ctx.beginPath(); ctx.moveTo(p.x, p.y - 9); ctx.lineTo(p.x + 9, p.y + 7); ctx.lineTo(p.x - 9, p.y + 7); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = `bold 12px ${FONT}`;
      ctx.fillText(st.name, p.x + 12, p.y + 4);
      const hx = p.x + state.radii[i] * map.s;
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(hx, p.y, 6, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = st.color; ctx.lineWidth = 2; ctx.stroke();
    });

    // Status box
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(map.x, map.y + map.h + 6, map.w, 34);
    ctx.fillStyle = '#fff';
    ctx.font = `12px ${FONT}`;
    const line = state.found
      ? T('Epicentre found! The three circles cross at one point.', 'Episentrum ditemukan! Tiga lingkaran berpotongan di satu titik.')
      : state.mystery
        ? T('Mystery: drag each circle handle until all three cross.', 'Misteri: geser pegangan lingkaran sampai ketiganya berpotongan.')
        : T('Click the map to move the quake. P wave 8 km/s, S wave 4 km/s.', 'Klik peta untuk memindahkan gempa. Gelombang P 8 km/s, S 4 km/s.');
    ctx.fillText(line, map.x + 8, map.y + map.h + 20);
    ctx.fillText(`t = ${state.t.toFixed(0)} s     ${T('distance = 8 km/s × (S − P)', 'jarak = 8 km/s × (S − P)')}`, map.x + 8, map.y + map.h + 34);

    // ---- Seismograms ----
    const sx = map.x + map.w + 24, sw = W - sx - 16;
    const rowH = (H - 60) / 3;
    STATIONS.forEach((st, i) => {
      const y0 = 40 + i * rowH, mid = y0 + rowH * 0.55;
      ctx.fillStyle = 'rgba(255,255,255,0.04)';
      ctx.fillRect(sx, y0, sw, rowH - 8);
      ctx.fillStyle = st.color;
      ctx.font = `bold 12px ${FONT}`;
      ctx.fillText(`${T('Station', 'Stasiun')} ${st.name}`, sx + 6, y0 + 14);
      const tx = (t) => sx + (t / T_MAX) * sw;
      ctx.strokeStyle = 'rgba(120,130,150,0.4)';
      ctx.beginPath(); ctx.moveTo(sx, mid); ctx.lineTo(sx + sw, mid); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.8)';
      ctx.font = `10px ${FONT}`;
      for (let t = 0; t <= T_MAX; t += 30) ctx.fillText(`${t}s`, tx(t) - 6, y0 + rowH - 12);
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const amp = rowH * 0.018;
      for (let t = 0; t <= Math.min(state.t, T_MAX); t += 0.25) {
        const yy = mid - wiggle(st, t) * amp;
        if (t === 0) ctx.moveTo(tx(t), yy); else ctx.lineTo(tx(t), yy);
      }
      ctx.stroke();
      const marks = [[tP(st), '#f87171', 'P'], [tS(st), '#a855f7', 'S']];
      for (const [tm, col, lab] of marks) {
        if (state.t < tm || tm > T_MAX) continue;
        ctx.strokeStyle = col; ctx.setLineDash([3, 3]);
        ctx.beginPath(); ctx.moveTo(tx(tm), y0 + 18); ctx.lineTo(tx(tm), y0 + rowH - 22); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = col; ctx.font = `bold 11px ${FONT}`;
        ctx.fillText(`${lab} ${tm.toFixed(0)}s`, tx(tm) + 3, y0 + 28 + (lab === 'S' ? 12 : 0));
      }
      if (state.t >= tS(st)) {
        ctx.fillStyle = '#fff'; ctx.font = `11px ${FONT}`;
        ctx.textAlign = 'right';
        ctx.fillText(`S − P = ${(tS(st) - tP(st)).toFixed(0)} s`, sx + sw - 6, y0 + 14);
        ctx.textAlign = 'left';
      }
    });
    ctx.lineWidth = 1;
  }

  // ---- Dragging: circle handles and the epicentre ----
  const drag = dragHandle(cv.canvas, {
    hitTest(px, py) {
      if (!map) return null;
      for (let i = 0; i < STATIONS.length; i++) {
        const p = toPx(STATIONS[i].x, STATIONS[i].y);
        if (Math.hypot(px - (p.x + state.radii[i] * map.s), py - p.y) < 12) return i;
      }
      if (!state.mystery && px >= map.x && px <= map.x + map.w && py >= map.y && py <= map.y + map.h) return 'epi';
      return null;
    },
    onStart(id, px, py) { if (id === 'epi') moveEpi(px, py); },
    onDrag(id, px, py) {
      if (id === 'epi') { moveEpi(px, py); return; }
      const p = toPx(STATIONS[id].x, STATIONS[id].y);
      state.radii[id] = Math.max(0, Math.min(700, Math.hypot(px - p.x, py - p.y) / map.s));
      checkFound();
    },
    handles: () => (map ? STATIONS.map((st, i) => {
      const p = toPx(st.x, st.y);
      return { id: i, x: p.x + state.radii[i] * map.s, y: p.y, label: `${T('Circle radius, station', 'Jari-jari lingkaran, stasiun')} ${st.name}` };
    }) : []),
    cursor: 'crosshair', hoverCursor: null,
  });
  function moveEpi(px, py) {
    const k = toKm(px, py);
    state.epi = { x: Math.max(0, Math.min(MAP_W, k.x)), y: Math.max(0, Math.min(MAP_H, k.y)) };
    resetQuake();
  }

  // ---- Controls ----
  const quakeBtn = button({ label: T('Quake!', 'Gempa!'), primary: true, onClick: () => { state.t = 0; state.running = true; state.radii = [0, 0, 0]; state.found = false; } });
  const locateBtn = button({ label: T('Locate (draw circles)', 'Temukan (gambar lingkaran)'), onClick: () => {
    STATIONS.forEach((st, i) => { if (state.t >= tS(st)) state.radii[i] = 8 * (tS(st) - tP(st)); });
    checkFound();
  } });
  const newBtn = button({ label: T('New mystery quake', 'Gempa misteri baru'), onClick: () => {
    state.epi = { x: 60 + Math.random() * (MAP_W - 120), y: 50 + Math.random() * (MAP_H - 100) };
    state.mystery = true; mysteryT.value = true; resetQuake();
  } });
  const resetBtn = button({ label: 'Reset', onClick: resetQuake });
  const mysteryT = toggle({ label: T('Mystery mode (hide epicentre)', 'Mode misteri (sembunyikan episentrum)'), key: 'mystery', value: false,
    onChange: (v) => { state.mystery = v; state.found = false; } });
  const speedS = slider({ label: T('Playback speed (×)', 'Kecepatan putar (×)'), key: 'speed', min: 2, max: 30, step: 1, value: 10,
    onInput: (v) => { state.speed = v; } });
  const stationSel = select({ label: T('Station for the lab table', 'Stasiun untuk tabel lab'), key: 'station',
    options: STATIONS.map((st, i) => ({ value: String(i), label: `${T('Station', 'Stasiun')} ${st.name}` })), value: '0',
    onChange: (v) => { state.labIdx = Number(v); } });
  ctrlPanel.append(row(quakeBtn, locateBtn, newBtn, resetBtn), mysteryT.el, speedS.el, stationSel.el);

  const lab = labPanel({
    title: T('Epicentre lab', 'Lab episentrum'),
    filename: 'earthquake-waves-lab.csv',
    columns: [
      { key: 'station', label: T('station', 'stasiun') },
      { key: 'tP', label: T('P arrival (s)', 'P tiba (s)'), format: (v) => v.toFixed(0) },
      { key: 'tS', label: T('S arrival (s)', 'S tiba (s)'), format: (v) => v.toFixed(0) },
      { key: 'gap', label: 'S − P (s)', format: (v) => v.toFixed(0) },
      { key: 'd', label: T('distance (km)', 'jarak (km)'), format: (v) => v.toFixed(0) },
    ],
    procedure: [
      T('Press Quake! and watch the red P ring race ahead of the purple S ring.', 'Tekan Gempa! dan lihat lingkaran P merah berlari mendahului lingkaran S ungu.'),
      T('Wait until both waves reach station A. Pick station A and record.', 'Tunggu sampai kedua gelombang tiba di stasiun A. Pilih stasiun A dan rekam.'),
      T('Repeat for stations B and C. Check: distance = 8 × (S − P).', 'Ulangi untuk stasiun B dan C. Periksa: jarak = 8 × (S − P).'),
      T('Drag each circle handle to the distance you recorded. Where do the circles cross?', 'Geser pegangan tiap lingkaran ke jarak yang kamu rekam. Di mana lingkaran berpotongan?'),
      T('Turn on mystery mode, press New mystery quake, and find the hidden epicentre.', 'Nyalakan mode misteri, tekan Gempa misteri baru, dan temukan episentrum tersembunyi.'),
    ],
    predict: T('If a station is twice as far away, will the S − P gap be twice as long? Why?', 'Jika sebuah stasiun dua kali lebih jauh, apakah selisih S − P menjadi dua kali lebih lama? Mengapa?'),
    source: () => {
      const st = STATIONS[state.labIdx];
      if (state.t < tS(st)) return null;
      return { station: st.name, tP: tP(st), tS: tS(st), gap: tS(st) - tP(st), d: dist(st) };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => {
    if (state.running) {
      state.t += dt * state.speed;
      if (state.t >= T_MAX) { state.t = T_MAX; state.running = false; }
    }
    draw();
  });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
