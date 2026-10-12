import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
const G = 9.8, MASS = 1;                 // kg — keeps the numbers small
const TRACK_W = 100, H_MAX = 45;         // metres shown on screen
const FONT = 'ui-monospace, Menlo, Consolas, monospace';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  // Control points (x fixed, y = height in metres). The first one is the start height.
  const pts = [
    { x: 0, h: 30 }, { x: 25, h: 5 }, { x: 50, h: 20 }, { x: 75, h: 8 }, { x: 100, h: 28 },
  ];
  const state = {
    running: false, s: 0, dir: 1, v: 0, thermal: 0, total: 0,
    friction: false, mu: 0.05, maxV: 0, maxKE: 0,
  };
  let path = [];   // sampled track: { x, h, s } with s = arc length (m)
  let view = null; // screen mapping

  function buildPath() {
    path = [];
    const P = (i) => pts[Math.max(0, Math.min(pts.length - 1, i))];
    let s = 0;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      for (let k = 0; k < 24; k++) {
        const u = k / 24, u2 = u * u, u3 = u2 * u;
        const cr = (a, b, c, d) => 0.5 * ((2 * b) + (-a + c) * u + (2 * a - 5 * b + 4 * c - d) * u2 + (-a + 3 * b - 3 * c + d) * u3);
        const x = cr(p0.x, p1.x, p2.x, p3.x);
        const h = Math.max(0, cr(p0.h, p1.h, p2.h, p3.h));
        if (path.length) { const q = path[path.length - 1]; s += Math.hypot(x - q.x, h - q.h); }
        path.push({ x, h, s });
      }
    }
    const last = pts[pts.length - 1], q = path[path.length - 1];
    path.push({ x: last.x, h: last.h, s: s + Math.hypot(last.x - q.x, last.h - q.h) });
  }
  function at(s) {
    let i = 1;
    while (i < path.length - 1 && path[i].s < s) i++;
    const a = path[i - 1], b = path[i];
    const u = b.s === a.s ? 0 : (s - a.s) / (b.s - a.s);
    return { x: a.x + (b.x - a.x) * u, h: a.h + (b.h - a.h) * u };
  }
  const pe = (h) => MASS * G * h;
  const ke = () => Math.max(0, state.total - pe(at(state.s).h) - state.thermal);

  function reset() {
    buildPath();
    state.s = 0; state.dir = 1; state.v = 0; state.thermal = 0; state.running = false;
    state.total = pe(pts[0].h); state.maxV = 0; state.maxKE = 0;
  }
  reset();

  function step(dt) {
    if (!state.running) return;
    const sEnd = path[path.length - 1].s;
    const v = Math.sqrt(2 * ke() / MASS);
    const ds = Math.max(v * dt, 0.02); // tiny nudge so a cart at rest can start rolling
    let next = state.s + state.dir * ds;
    if (next <= 0 || next >= sEnd) { state.dir = -state.dir; next = Math.max(0, Math.min(sEnd, next)); }
    const heat = state.friction ? state.mu * MASS * G * ds : 0;
    const keNext = state.total - pe(at(next).h) - state.thermal - heat;
    if (keNext <= 0) {
      // Not enough energy to climb: turn around (or rest if also out of energy).
      state.dir = -state.dir;
      state.v = 0;
      if (ke() < 0.5) { state.running = false; }
      return;
    }
    state.s = next;
    state.thermal += heat;
    state.v = Math.sqrt(2 * keNext / MASS);
    state.maxV = Math.max(state.maxV, state.v);
    state.maxKE = Math.max(state.maxKE, keNext);
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W <= 0 || H <= 0) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    const left = 30, right = W * 0.7, ground = H - 50, top = 36;
    const sx = (right - left) / TRACK_W, sy = (ground - top) / H_MAX;
    view = { left, ground, sx, sy };
    const X = (x) => left + x * sx, Y = (h) => ground - h * sy;

    // Height grid
    ctx.strokeStyle = 'rgba(120,130,150,0.2)';
    ctx.fillStyle = 'rgba(120,130,150,0.8)';
    ctx.font = `10px ${FONT}`;
    for (let h = 0; h <= H_MAX; h += 10) {
      ctx.beginPath(); ctx.moveTo(left, Y(h)); ctx.lineTo(right, Y(h)); ctx.stroke();
      ctx.fillText(`${h} m`, 2, Y(h) + 3);
    }
    // Track
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 4;
    ctx.beginPath();
    path.forEach((p, i) => (i ? ctx.lineTo(X(p.x), Y(p.h)) : ctx.moveTo(X(p.x), Y(p.h))));
    ctx.stroke();
    ctx.lineWidth = 1;
    // Control points
    pts.forEach((p, i) => {
      ctx.fillStyle = i === 0 ? '#fbbf24' : '#0ea5e9';
      ctx.beginPath(); ctx.arc(X(p.x), Y(p.h), 7, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.stroke();
    });
    // Cart
    const c = at(state.s);
    const cx = X(c.x), cy = Y(c.h);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(cx - 12, cy - 18, 24, 14);
    ctx.fillStyle = '#1e293b';
    ctx.beginPath(); ctx.arc(cx - 7, cy - 3, 4, 0, Math.PI * 2); ctx.arc(cx + 7, cy - 3, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = `bold 11px ${FONT}`;
    ctx.textAlign = 'center';
    const lx = Math.max(44, Math.min(right - 44, cx));
    ctx.fillText(`${state.v.toFixed(1)} m/s`, lx, Math.max(14, cy - 26));
    ctx.fillText(`h = ${c.h.toFixed(1)} m`, lx, cy + 16);
    ctx.textAlign = 'left';

    // Info strip below the ground line
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, H - 42, right - 8, 38);
    ctx.fillStyle = '#fff';
    ctx.font = `bold 12px ${FONT}`;
    ctx.fillText(`${T('Total energy', 'Energi total')} = ${state.total.toFixed(0)} J   (${T('mass', 'massa')} ${MASS} kg, g = ${G} N/kg)`, 16, H - 26);
    ctx.font = `11px ${FONT}`;
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fillText(state.friction
      ? T(`Friction ON: moving energy slowly turns into heat (μ = ${state.mu.toFixed(2)}).`, `Gesekan NYALA: energi gerak perlahan berubah menjadi panas (μ = ${state.mu.toFixed(2)}).`)
      : T('Friction OFF: KE + PE always adds up to the total.', 'Gesekan MATI: EK + EP selalu berjumlah sama dengan total.'), 16, H - 10);

    // Energy bars
    const bx = right + 30, bw = (W - bx - 20) / 3 - 10, bTop = 70, bBot = H - 60;
    const scale = (bBot - bTop) / Math.max(1, state.total * 1.05);
    const bars = [
      [T('Kinetic', 'Kinetik'), ke(), '#0ea5e9'],
      [T('Potential', 'Potensial'), pe(c.h), '#10b981'],
      [T('Thermal', 'Panas'), state.thermal, '#f97316'],
    ];
    ctx.strokeStyle = '#fbbf24';
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(bx - 10, bBot - state.total * scale); ctx.lineTo(W - 10, bBot - state.total * scale); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#fbbf24';
    ctx.font = `10px ${FONT}`;
    ctx.fillText(T('total', 'total'), bx - 10, bBot - state.total * scale - 4);
    bars.forEach(([name, val, col], i) => {
      const x = bx + i * (bw + 10), hgt = val * scale;
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      ctx.fillRect(x, bTop, bw, bBot - bTop);
      ctx.fillStyle = col;
      ctx.fillRect(x, bBot - hgt, bw, hgt);
      ctx.fillStyle = '#fff';
      ctx.font = `bold 11px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.fillText(name, x + bw / 2, bBot + 14);
      ctx.fillText(`${val.toFixed(0)} J`, x + bw / 2, bBot + 28);
      ctx.textAlign = 'left';
    });
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.font = `11px ${FONT}`;
    ctx.fillText(`${(ke() + pe(c.h) + state.thermal).toFixed(0)} J = ${state.total.toFixed(0)} J`, bx, bBot + 46);
  }

  // ---- Drag the control points up and down ----
  const drag = dragHandle(cv.canvas, {
    hitTest(px, py) {
      if (!view) return null;
      for (let i = 0; i < pts.length; i++) {
        if (Math.hypot(px - (view.left + pts[i].x * view.sx), py - (view.ground - pts[i].h * view.sy)) < 14) return i;
      }
      return null;
    },
    onDrag(i, _px, py) {
      const h = Math.max(0, Math.min(H_MAX, (view.ground - py) / view.sy));
      pts[i].h = Math.round(h * 2) / 2;
      if (i === 0) startS.value = pts[0].h;
      reset();
    },
    handles: () => (view ? pts.map((p, i) => ({
      id: i, x: view.left + p.x * view.sx, y: view.ground - p.h * view.sy,
      label: i === 0 ? T('Start height', 'Tinggi awal') : `${T('Track point', 'Titik lintasan')} ${i}`,
    })) : []),
    cursor: 'default', hoverCursor: 'grab',
  });

  // ---- Controls ----
  const startS = slider({ label: T('Start height (m)', 'Tinggi awal (m)'), key: 'height', min: 1, max: H_MAX, step: 0.5, value: pts[0].h,
    format: (v) => v.toFixed(1), onInput: (v) => { pts[0].h = v; reset(); } });
  const fricT = toggle({ label: T('Friction', 'Gesekan'), key: 'friction', value: false, onChange: (v) => { state.friction = v; } });
  const muS = slider({ label: T('Friction amount μ', 'Besar gesekan μ'), key: 'mu', min: 0.01, max: 0.3, step: 0.01, value: state.mu,
    format: (v) => v.toFixed(2), onInput: (v) => { state.mu = v; } });
  const goBtn = button({ label: T('Release / Pause', 'Lepas / Jeda'), primary: true, onClick: () => { state.running = !state.running; } });
  const resetBtn = button({ label: 'Reset', onClick: reset });
  ctrlPanel.append(startS.el, row(fricT, goBtn, resetBtn), muS.el);

  const lab = labPanel({
    title: T('Energy lab', 'Lab energi'),
    filename: 'energy-transfers-lab.csv',
    columns: [
      { key: 'h0', label: T('start height (m)', 'tinggi awal (m)'), format: (v) => v.toFixed(1) },
      { key: 'fric', label: T('friction', 'gesekan') },
      { key: 'vmax', label: T('max speed (m/s)', 'kecepatan maks (m/s)'), format: (v) => v.toFixed(1) },
      { key: 'keBot', label: T('KE at bottom (J)', 'EK di dasar (J)'), format: (v) => v.toFixed(0) },
      { key: 'heat', label: T('thermal lost (J)', 'hilang jadi panas (J)'), format: (v) => v.toFixed(0) },
    ],
    procedure: [
      T('Friction off. Set start height 10 m, press Release, wait for one full trip, record.', 'Gesekan mati. Atur tinggi awal 10 m, tekan Lepas, tunggu satu perjalanan penuh, rekam.'),
      T('Repeat with 20 m, 30 m and 40 m. How does KE at the bottom change?', 'Ulangi dengan 20 m, 30 m dan 40 m. Bagaimana EK di dasar berubah?'),
      T('Check: KE at bottom ≈ 1 × 9.8 × start height. Does it match?', 'Periksa: EK di dasar ≈ 1 × 9,8 × tinggi awal. Apakah cocok?'),
      T('Turn friction on at 30 m. Wait 20 seconds, then record. Where did the energy go?', 'Nyalakan gesekan pada 30 m. Tunggu 20 detik, lalu rekam. Ke mana energinya pergi?'),
      T('Drag the middle hill above the start height. Record what happens to the cart.', 'Geser bukit tengah lebih tinggi dari tinggi awal. Catat apa yang terjadi pada kereta.'),
    ],
    predict: T('If you start twice as high, will the cart go twice as fast at the bottom? Guess the number first.', 'Jika kamu mulai dua kali lebih tinggi, apakah kereta bergerak dua kali lebih cepat di dasar? Tebak angkanya dulu.'),
    source: () => ({
      h0: pts[0].h,
      fric: state.friction ? `μ = ${state.mu.toFixed(2)}` : T('off', 'mati'),
      vmax: state.maxV,
      keBot: state.maxKE,
      heat: state.thermal,
    }),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
