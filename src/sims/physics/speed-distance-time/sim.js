import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, select, toggle, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { tr } from '../../../i18n/index.js';

const L = (en, id) => tr({ en, id });
const MONO = 'ui-monospace, Menlo, Consolas, monospace';
const TRACK = 200; // m
const VMAX = 30;   // m/s, top of the speed axis

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const cars = [
    { id: 'A', color: '#38bdf8', speed: 10, head: 0, d: 0, hist: [], done: null, on: true },
    { id: 'B', color: '#fb923c', speed: 15, head: 50, d: 50, hist: [], done: null, on: false },
  ];
  const st = { running: false, t: 0, cursor: null, sample: 0, record: 'A' };
  let dtGraph = null; // distance–time graph rect (for the cursor)

  function reset() {
    st.running = false; st.t = 0; st.cursor = null; st.sample = 0;
    for (const c of cars) { c.d = c.head; c.hist = [{ t: 0, d: c.head, v: 0 }]; c.done = null; }
    startBtn.label = L('Start', 'Mulai');
  }

  function step(dt) {
    if (!st.running) return;
    st.t += dt;
    for (const c of cars) {
      if (!c.on || c.done != null) continue;
      c.d = Math.min(TRACK, c.d + c.speed * dt);
      if (c.d >= TRACK) c.done = st.t;
    }
    st.sample += dt;
    if (st.sample >= 0.1) {
      st.sample = 0;
      for (const c of cars) if (c.on) c.hist.push({ t: st.t, d: c.d, v: c.done == null ? c.speed : 0 });
    }
    if (cars.every((c) => !c.on || c.done != null)) { st.running = false; startBtn.label = L('Start', 'Mulai'); }
  }

  // distance of a car at time tt, read from its history (linear between samples)
  function distAt(c, tt) {
    const h = c.hist;
    if (!h.length || tt <= h[0].t) return h.length ? h[0].d : c.head;
    for (let i = 1; i < h.length; i++) {
      if (h[i].t >= tt) {
        const a = h[i - 1], b = h[i];
        const f = b.t === a.t ? 0 : (tt - a.t) / (b.t - a.t);
        return a.d + (b.d - a.d) * f;
      }
    }
    return c.d;
  }
  const tAxisMax = () => Math.max(20, Math.ceil((st.t + 1) / 10) * 10);
  const cursorTime = () => (st.cursor == null ? st.t : Math.min(st.cursor, st.t));

  function draw(dt) {
    step(dt);
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    const ctx = cv.ctx;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    ctx.textAlign = 'left';
    drawTrack(ctx, W, H);
    dtGraph = { x: 0.07 * W, y: 0.47 * H, w: 0.4 * W, h: 0.4 * H };
    drawGraph(ctx, dtGraph, L('distance–time', 'jarak–waktu'), TRACK, 'm', (c, p) => p.d, true);
    drawGraph(ctx, { x: 0.57 * W, y: 0.47 * H, w: 0.36 * W, h: 0.4 * H }, L('speed–time', 'kelajuan–waktu'), VMAX, 'm/s', (c, p) => p.v, false);
    drawFormula(ctx, W, H);
  }

  function drawTrack(ctx, W, H) {
    const x0 = 0.07 * W, x1 = 0.93 * W, y = 0.2 * H;
    const xOf = (d) => x0 + (d / TRACK) * (x1 - x0);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(x0, y - 0.02 * H, x1 - x0, 0.16 * H);
    ctx.font = `10px ${MONO}`;
    for (let d = 0; d <= TRACK; d += 20) {
      ctx.strokeStyle = 'rgba(226,232,240,0.4)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(xOf(d), y - 0.02 * H); ctx.lineTo(xOf(d), y + 0.14 * H); ctx.stroke();
      ctx.fillStyle = 'rgba(226,232,240,0.8)'; ctx.textAlign = 'center';
      ctx.fillText(`${d} m`, xOf(d), y - 0.03 * H);
    }
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(x1, y - 0.02 * H); ctx.lineTo(x1, y + 0.14 * H); ctx.stroke();
    cars.forEach((c, i) => {
      if (!c.on) return;
      const cx = xOf(c.d), cy = y + 0.02 * H + i * 0.07 * H;
      ctx.fillStyle = c.color;
      ctx.fillRect(cx - 22, cy - 2, 30, 14);
      ctx.fillRect(cx - 14, cy - 10, 16, 9);
      ctx.fillStyle = '#0b1220';
      ctx.beginPath(); ctx.arc(cx - 14, cy + 13, 4, 0, 6.29); ctx.arc(cx + 2, cy + 13, 4, 0, 6.29); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = `bold 11px ${MONO}`; ctx.textAlign = 'left';
      ctx.fillText(`${c.id}: ${c.speed} m/s`, cx + 14, cy + 10);
    });
    ctx.textAlign = 'left';
    // stopwatch
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(0.07 * W, 0.37 * H, 0.2 * W, 0.07 * H);
    ctx.fillStyle = '#4ade80'; ctx.font = `bold 16px ${MONO}`;
    ctx.fillText(`${L('stopwatch', 'stopwatch')} ${st.t.toFixed(1)} s`, 0.08 * W, 0.42 * H);
    const finished = cars.filter((c) => c.on && c.done != null);
    if (finished.length) {
      const first = finished.reduce((a, b) => (a.done <= b.done ? a : b));
      ctx.fillStyle = '#fbbf24'; ctx.font = `bold 12px ${MONO}`;
      ctx.fillText(`${L('finish', 'finis')}: ${finished.map((c) => `${c.id} ${c.done.toFixed(1)} s`).join('  ')}${finished.length > 1 ? `  → ${L('winner', 'pemenang')} ${first.id}` : ''}`, 0.3 * W, 0.42 * H);
    }
  }

  function drawGraph(ctx, r, title, yMax, unit, pick, withCursor) {
    const tMax = tAxisMax();
    const x2 = (tt) => r.x + (tt / tMax) * r.w;
    const y2 = (v) => r.y + r.h - (v / yMax) * r.h;
    ctx.strokeStyle = 'rgba(120,130,150,0.3)'; ctx.lineWidth = 1;
    ctx.strokeRect(r.x, r.y, r.w, r.h);
    ctx.fillStyle = 'rgba(148,163,184,0.9)'; ctx.font = `bold 11px ${MONO}`;
    ctx.fillText(title, r.x + 6, r.y - 6);
    ctx.font = `9px ${MONO}`;
    for (let i = 0; i <= 4; i++) {
      const v = (i / 4) * yMax, tt = (i / 4) * tMax;
      ctx.strokeStyle = 'rgba(120,130,150,0.15)';
      ctx.beginPath(); ctx.moveTo(r.x, y2(v)); ctx.lineTo(r.x + r.w, y2(v)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x2(tt), r.y); ctx.lineTo(x2(tt), r.y + r.h); ctx.stroke();
      ctx.fillStyle = 'rgba(148,163,184,0.8)'; ctx.textAlign = 'right';
      ctx.fillText(`${v.toFixed(0)}`, r.x - 4, y2(v) + 3);
      ctx.textAlign = 'center';
      ctx.fillText(`${tt.toFixed(0)} s`, x2(tt), r.y + r.h + 12);
    }
    ctx.textAlign = 'left';
    ctx.fillText(unit, r.x - 30, r.y - 6);
    for (const c of cars) {
      if (!c.on) continue;
      ctx.strokeStyle = c.color; ctx.lineWidth = 2.5;
      ctx.beginPath();
      c.hist.forEach((p, i) => { const px = x2(p.t), py = y2(pick(c, p)); if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
      if (c.hist.length) ctx.lineTo(x2(st.t), y2(pick(c, { d: c.d, v: c.done == null ? c.speed : 0 })));
      ctx.stroke();
    }
    if (!withCursor) return;
    const tc = cursorTime();
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(x2(tc), r.y); ctx.lineTo(x2(tc), r.y + r.h); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.arc(x2(tc), r.y, 7, 0, Math.PI * 2); ctx.fill();
    for (const c of cars) {
      if (!c.on) continue;
      const d = distAt(c, tc);
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(x2(tc), y2(d), 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = c.color; ctx.font = `bold 10px ${MONO}`;
      ctx.fillText(`${c.id}: ${d.toFixed(0)} m`, x2(tc) + 8, y2(d) - 4);
    }
    ctx.fillStyle = 'rgba(148,163,184,0.9)'; ctx.font = `10px ${MONO}`; ctx.textAlign = 'right';
    ctx.fillText(L('drag the yellow dot to read values', 'seret titik kuning untuk membaca nilai'), r.x + r.w - 6, r.y + 14);
    ctx.textAlign = 'left';
  }

  function drawFormula(ctx, W, H) {
    const tc = cursorTime();
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(0.55 * W, 0.33 * H, 0.4 * W, 0.11 * H);
    ctx.font = `bold 11px ${MONO}`;
    let y = 0.37 * H;
    for (const c of cars) {
      if (!c.on) continue;
      const travelled = distAt(c, tc) - c.head;
      const v = tc > 0.05 ? travelled / tc : 0;
      ctx.fillStyle = c.color;
      ctx.fillText(`${c.id}: ${L('speed', 'kelajuan')} = ${L('distance ÷ time', 'jarak ÷ waktu')} = ${travelled.toFixed(0)} m ÷ ${tc.toFixed(1)} s = ${v.toFixed(1)} m/s`, 0.56 * W, y);
      y += 0.045 * H;
    }
  }

  const drag = dragHandle(cv.canvas, {
    hitTest(sx, sy) {
      if (!dtGraph) return null;
      const r = dtGraph;
      const cx = r.x + (cursorTime() / tAxisMax()) * r.w;
      return Math.abs(sx - cx) < 12 && sy > r.y - 12 && sy < r.y + r.h ? 'cursor' : null;
    },
    onDrag(_id, sx) {
      if (!dtGraph) return;
      st.cursor = Math.max(0, Math.min(st.t, ((sx - dtGraph.x) / dtGraph.w) * tAxisMax()));
    },
    handles: () => (dtGraph ? [{ id: 'cursor', x: dtGraph.x + (cursorTime() / tAxisMax()) * dtGraph.w, y: dtGraph.y, label: L('Graph cursor (time)', 'Kursor grafik (waktu)') }] : []),
    cursor: 'default',
    hoverCursor: 'ew-resize',
  });

  const vA = slider({ label: L('Speed of A (m/s)', 'Kelajuan A (m/s)'), key: 'speed-a', min: 1, max: VMAX, step: 1, value: cars[0].speed, onInput: (v) => { cars[0].speed = v; } });
  const raceT = toggle({ label: L('Race with a second vehicle (B)', 'Balapan dengan kendaraan kedua (B)'), key: 'race', value: cars[1].on,
    onChange: (v) => { cars[1].on = v; vB.el.style.display = hB.el.style.display = v ? '' : 'none'; if (!st.running) reset(); } });
  const vB = slider({ label: L('Speed of B (m/s)', 'Kelajuan B (m/s)'), key: 'speed-b', min: 1, max: VMAX, step: 1, value: cars[1].speed, onInput: (v) => { cars[1].speed = v; } });
  const hB = slider({ label: L('Head start of B (m)', 'Start awal B (m)'), key: 'head-start', min: 0, max: 100, step: 10, value: cars[1].head,
    onInput: (v) => { cars[1].head = v; if (!st.running) reset(); } });
  vB.el.style.display = hB.el.style.display = 'none';
  const startBtn = button({ label: L('Start', 'Mulai'), primary: true, onClick: () => {
    if (cars.every((c) => !c.on || c.done != null)) reset();
    st.running = !st.running;
    startBtn.label = st.running ? L('Pause', 'Jeda') : L('Start', 'Mulai');
  } });
  const resetBtn = button({ label: L('Reset', 'Atur ulang'), onClick: reset });
  const recSel = select({ label: L('Vehicle to record', 'Kendaraan yang direkam'), key: 'record', value: st.record,
    options: [{ value: 'A', label: 'A' }, { value: 'B', label: 'B' }], onChange: (v) => { st.record = v; } });
  ctrlPanel.append(vA.el, raceT.el, vB.el, hB.el, row(startBtn, resetBtn), recSel.el);
  reset();

  const lab = labPanel({
    title: L('Speed lab — speed = distance ÷ time', 'Lab kelajuan — kelajuan = jarak ÷ waktu'),
    filename: 'speed-distance-time-lab.csv',
    columns: [
      { key: 'veh', label: L('vehicle', 'kendaraan') },
      { key: 'v', label: L('speed set (m/s)', 'kelajuan diatur (m/s)') },
      { key: 't', label: L('time (s)', 'waktu (s)'), format: (v) => v.toFixed(1) },
      { key: 'd', label: L('distance (m)', 'jarak (m)'), format: (v) => v.toFixed(0) },
    ],
    procedure: [
      L('Set A to 10 m/s and press Start. Pause after about 5 s and Record.', 'Atur A ke 10 m/s dan tekan Mulai. Jeda setelah kira-kira 5 s dan Rekam.'),
      L('Divide distance by time. Does it match the speed you set?', 'Bagi jarak dengan waktu. Apakah sama dengan kelajuan yang kamu atur?'),
      L('Let A finish the 200 m. Record the finish time. Check: 200 ÷ 10 = 20 s.', 'Biarkan A menyelesaikan 200 m. Rekam waktu finis. Cek: 200 ÷ 10 = 20 s.'),
      L('Repeat with 20 m/s. How does the line on the distance–time graph change?', 'Ulangi dengan 20 m/s. Bagaimana garis pada grafik jarak–waktu berubah?'),
      L('Turn on the race. Drag the cursor to where the lines cross and record both vehicles.', 'Nyalakan balapan. Seret kursor ke titik garis berpotongan dan rekam kedua kendaraan.'),
    ],
    predict: L('If the speed is doubled, will the car take half the time or twice the time to finish the track?',
      'Jika kelajuan digandakan, apakah mobil butuh setengah waktu atau dua kali waktu untuk menyelesaikan lintasan?'),
    source: () => {
      const c = cars.find((k) => k.id === st.record);
      if (!c || !c.on) return null;
      const tc = cursorTime();
      return { veh: c.id, v: c.speed, t: tc, d: distAt(c, tc) - c.head };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => draw(dt));
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
