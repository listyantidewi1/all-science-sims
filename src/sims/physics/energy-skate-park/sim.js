import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
const MONO = 'ui-monospace, Menlo, Consolas, monospace';
const SANS = 'system-ui, -apple-system, Roboto, sans-serif';
const G = 9.8;
const XMAX = 20, YMAX = 10;         // world size in metres
const DEFAULT_PTS = [[0, 8], [4, 2], [8, 4.5], [12, 1], [16, 5], [20, 9]];
const NSAMP = 600;

export function mount(rootEl) {
  const canvasWrap = document.createElement('div'); rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div'); ctrlPanel.className = 'sim-controls'; rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const p = { mu: 0, m: 40 };
  const pts = DEFAULT_PTS.map(([x, y]) => ({ x, y }));
  // track table: X, Y, S (cumulative arc length) sampled along the spline
  const tab = { X: new Float64Array(NSAMP), Y: new Float64Array(NSAMP), S: new Float64Array(NSAMP), L: 1, dirty: true };
  const st = { s: 0, v: 0, running: false, s0: 0, E0: 0, Eth: 0, vmax: 0, sMark: 0, markRec: null, rest: false, wheel: 0 };
  const fmt = (v, dp) => (getLocale() === 'id' ? v.toFixed(dp).replace('.', ',') : v.toFixed(dp));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  // ---------- spline ----------
  function catmull(i, t) {
    const P = (k) => pts[clamp(k, 0, pts.length - 1)];
    const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
    const t2 = t * t, t3 = t2 * t;
    const c = (a, b, c_, d) => 0.5 * (2 * b + (-a + c_) * t + (2 * a - 5 * b + 4 * c_ - d) * t2 + (-a + 3 * b - 3 * c_ + d) * t3);
    return { x: c(p0.x, p1.x, p2.x, p3.x), y: c(p0.y, p1.y, p2.y, p3.y) };
  }
  function rebuild() {
    const segs = pts.length - 1;
    let s = 0, px = 0, py = 0;
    for (let k = 0; k < NSAMP; k++) {
      const u = (k / (NSAMP - 1)) * segs;
      const i = Math.min(segs - 1, Math.floor(u));
      const q = catmull(i, u - i);
      if (k) s += Math.hypot(q.x - px, q.y - py);
      tab.X[k] = q.x; tab.Y[k] = clamp(q.y, 0, YMAX * 1.2); tab.S[k] = s; px = q.x; py = q.y;
    }
    tab.L = Math.max(1e-6, s);
    tab.dirty = false;
  }
  // index of the sample just before arc length s (binary search)
  function idxAt(s) {
    let lo = 0, hi = NSAMP - 2;
    while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (tab.S[mid] <= s) lo = mid; else hi = mid - 1; }
    return lo;
  }
  function at(s) {
    s = clamp(s, 0, tab.L);
    const i = idxAt(s);
    const ds = tab.S[i + 1] - tab.S[i] || 1e-9;
    const f = clamp((s - tab.S[i]) / ds, 0, 1);
    const x = tab.X[i] + (tab.X[i + 1] - tab.X[i]) * f, y = tab.Y[i] + (tab.Y[i + 1] - tab.Y[i]) * f;
    const dx = (tab.X[i + 1] - tab.X[i]) / ds, dy = (tab.Y[i + 1] - tab.Y[i]) / ds;   // unit tangent (dx, dy)
    return { x, y, tx: dx, ty: dy };
  }
  // arc length of the track point nearest (in x) to world x
  function sAtX(x) {
    let best = 0, bd = Infinity;
    for (let k = 0; k < NSAMP; k++) { const d = Math.abs(tab.X[k] - x); if (d < bd) { bd = d; best = k; } }
    return tab.S[best];
  }

  const PE = () => p.m * G * at(st.s).y;
  const KE = () => 0.5 * p.m * st.v * st.v;

  function placeAt(s) {
    st.s = clamp(s, 0, tab.L); st.v = 0; st.Eth = 0; st.s0 = st.s; st.vmax = 0; st.markRec = null; st.rest = false;
    st.E0 = PE();
    st.running = false; relBtn.label = T('Release', 'Lepaskan');
  }
  function reset() { if (tab.dirty) rebuild(); placeAt(st.s0); }

  function step(dt) {
    if (tab.dirty) rebuild();
    if (!st.running || st.rest) return;
    const n = Math.max(1, Math.ceil(dt / (1 / 600)));
    const h = dt / n;
    for (let k = 0; k < n; k++) {
      const q = at(st.s);
      const sinT = q.ty, cosT = Math.max(0.05, Math.abs(q.tx));
      let a = -G * sinT;
      const fric = p.mu * G * cosT;                      // friction deceleration magnitude
      if (Math.abs(st.v) > 1e-4) a -= Math.sign(st.v) * fric;
      else if (Math.abs(a) <= fric) { st.v = 0; st.rest = true; st.running = false; relBtn.label = T('Release', 'Lepaskan'); return; }
      const vNew = st.v + a * h;
      const ds = 0.5 * (st.v + vNew) * h;
      const sPrev = st.s;
      st.s += ds; st.v = vNew; st.wheel += ds;
      // friction work goes into thermal energy, then rescale v so PE + KE + Eth = E0 exactly
      st.Eth += p.mu * p.m * G * cosT * Math.abs(ds);
      // track ends act as walls
      if (st.s < 0) { st.s = 0; st.v = Math.abs(st.v); }
      if (st.s > tab.L) { st.s = tab.L; st.v = -Math.abs(st.v); }
      let ke = st.E0 - PE() - st.Eth;
      if (ke < 0) { st.Eth = Math.max(0, st.E0 - PE()); ke = 0; }
      const vmag = Math.sqrt(2 * ke / p.m);
      st.v = (st.v < 0 ? -1 : 1) * vmag;
      if (vmag > st.vmax) st.vmax = vmag;
      // crossing the marker flag
      if ((sPrev - st.sMark) * (st.s - st.sMark) <= 0 && sPrev !== st.s) {
        st.markRec = { h: at(st.sMark).y, pe: p.m * G * at(st.sMark).y, ke, eth: st.Eth, v: vmag };
      }
    }
  }

  // ---------- drawing ----------
  let scale = 1, gx0 = 0, gy0 = 0;   // world → canvas
  const WX = (x) => gx0 + x * scale, WY = (y) => gy0 - y * scale;

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    if (tab.dirty) rebuild();
    scale = Math.min((W * 0.72) / XMAX, (H * 0.6) / YMAX);
    gx0 = W * 0.03; gy0 = H * 0.78;
    const fs = Math.max(10, W * 0.016);
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    // height grid
    ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1; ctx.fillStyle = '#64748b'; ctx.font = `${fs * 0.8}px ${MONO}`; ctx.textAlign = 'right';
    for (let y = 0; y <= YMAX; y += 2) { ctx.beginPath(); ctx.moveTo(WX(0), WY(y)); ctx.lineTo(WX(XMAX), WY(y)); ctx.stroke(); ctx.fillText(`${y} m`, WX(0) - 4, WY(y) + 4); }
    // ground
    ctx.fillStyle = '#14532d'; ctx.fillRect(0, gy0, W, H - gy0);
    // track
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = Math.max(4, scale * 0.12); ctx.lineJoin = 'round'; ctx.beginPath();
    for (let k = 0; k < NSAMP; k++) { const x = WX(tab.X[k]), y = WY(tab.Y[k]); k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
    ctx.stroke();
    // supports
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 2;
    for (let k = 0; k < NSAMP; k += 40) { ctx.beginPath(); ctx.moveTo(WX(tab.X[k]), WY(tab.Y[k])); ctx.lineTo(WX(tab.X[k]), gy0); ctx.stroke(); }
    // control points
    pts.forEach((q, i) => {
      ctx.fillStyle = '#f472b6'; ctx.beginPath(); ctx.arc(WX(q.x), WY(q.y), Math.max(6, scale * 0.18), 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
    });
    // marker flag
    const mk = at(st.sMark);
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(WX(mk.x), WY(mk.y)); ctx.lineTo(WX(mk.x), WY(mk.y) - scale * 1.4); ctx.stroke();
    ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.moveTo(WX(mk.x), WY(mk.y) - scale * 1.4); ctx.lineTo(WX(mk.x) + scale * 0.7, WY(mk.y) - scale * 1.15); ctx.lineTo(WX(mk.x), WY(mk.y) - scale * 0.9); ctx.fill();
    ctx.font = `${fs * 0.8}px ${SANS}`; ctx.textAlign = 'left'; ctx.fillText(T(`marker h = ${fmt(mk.y, 2)} m`, `penanda h = ${fmt(mk.y, 2)} m`), WX(mk.x) + scale * 0.8, WY(mk.y) - scale * 1.3);
    // release height line
    const r0 = at(st.s0);
    ctx.strokeStyle = 'rgba(52,211,153,0.6)'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(WX(0), WY(r0.y)); ctx.lineTo(WX(XMAX), WY(r0.y)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#34d399'; ctx.textAlign = 'right'; ctx.fillText(T(`release h₀ = ${fmt(r0.y, 2)} m`, `pelepasan h₀ = ${fmt(r0.y, 2)} m`), WX(XMAX), WY(r0.y) - 4);
    // cart
    const q = at(st.s);
    const ang = Math.atan2(-q.ty, q.tx);
    const cw = scale * 1.1, ch = scale * 0.6;
    ctx.save(); ctx.translate(WX(q.x), WY(q.y)); ctx.rotate(ang);
    ctx.fillStyle = '#3b82f6'; ctx.beginPath(); ctx.roundRect(-cw / 2, -ch - scale * 0.22, cw, ch, 4); ctx.fill();
    ctx.fillStyle = '#0f172a';
    for (const wx of [-cw * 0.3, cw * 0.3]) { ctx.beginPath(); ctx.arc(wx, -scale * 0.2, scale * 0.2, 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
    // speedometer / readouts
    ctx.fillStyle = '#e2e8f0'; ctx.font = `bold ${fs * 1.3}px ${MONO}`; ctx.textAlign = 'left';
    ctx.fillText(`v = ${fmt(Math.abs(st.v), 2)} m/s`, WX(0), H * 0.07);
    ctx.font = `${fs * 0.9}px ${MONO}`; ctx.fillStyle = '#94a3b8';
    ctx.fillText(`h = ${fmt(q.y, 2)} m    v_max = ${fmt(st.vmax, 2)} m/s    m = ${fmt(p.m, 0)} kg    μ = ${fmt(p.mu, 2)}`, WX(0), H * 0.07 + fs * 1.5);
    if (st.rest) { ctx.fillStyle = '#f97316'; ctx.fillText(T('stopped by friction', 'berhenti karena gesekan'), WX(0), H * 0.07 + fs * 3); }
    else if (!st.running) { ctx.fillStyle = '#34d399'; ctx.fillText(T('drag the cart to choose a release point, then Release', 'seret kereta untuk memilih titik pelepasan, lalu Lepaskan'), WX(0), H * 0.07 + fs * 3); }

    // ---- energy bars ----
    const pe = PE(), ke = KE(), eth = st.Eth, tot = Math.max(1e-9, st.E0);
    const bx = W * 0.79, by = H * 0.08, bw = W * 0.19, bh = H * 0.56;
    ctx.fillStyle = '#111c33'; ctx.beginPath(); ctx.roundRect(bx - 8, by - fs * 1.6, bw + 16, bh + fs * 4.4, 8); ctx.fill();
    ctx.fillStyle = '#e2e8f0'; ctx.font = `bold ${fs}px ${SANS}`; ctx.textAlign = 'left'; ctx.fillText(T('Energy (J)', 'Energi (J)'), bx, by - fs * 0.4);
    const bars = [
      { v: pe, c: '#34d399', l: 'PE' }, { v: ke, c: '#38bdf8', l: 'KE' }, { v: eth, c: '#f97316', l: T('heat', 'kalor') }, { v: pe + ke + eth, c: '#a78bfa', l: T('total', 'total') },
    ];
    const colW = bw / 4;
    bars.forEach((b, i) => {
      const frac = clamp(b.v / tot, 0, 1), x = bx + i * colW + colW * 0.15, w = colW * 0.7;
      ctx.fillStyle = '#1e293b'; ctx.fillRect(x, by, w, bh);
      ctx.fillStyle = b.c; ctx.fillRect(x, by + bh - frac * bh, w, frac * bh);
      ctx.fillStyle = '#e2e8f0'; ctx.font = `${fs * 0.8}px ${MONO}`; ctx.textAlign = 'center';
      ctx.fillText(fmt(b.v, 0), x + w / 2, by + bh + fs);
      ctx.fillStyle = b.c; ctx.font = `${fs * 0.85}px ${SANS}`; ctx.fillText(b.l, x + w / 2, by + bh + fs * 2.2);
    });

    // ---- formula box ----
    const fy = H * 0.84, lh = fs * 1.5;
    ctx.fillStyle = 'rgba(17,28,51,0.95)'; ctx.beginPath(); ctx.roundRect(W * 0.02, fy, W * 0.96, H * 0.14, 8); ctx.fill();
    ctx.textAlign = 'left'; ctx.font = `${fs * 0.95}px ${MONO}`;
    ctx.fillStyle = '#34d399'; ctx.fillText(`PE = m·g·h = ${fmt(p.m, 0)} × ${G} × ${fmt(q.y, 2)} = ${fmt(pe, 0)} J`, W * 0.04, fy + lh * 0.9);
    ctx.fillStyle = '#38bdf8'; ctx.fillText(`KE = ½·m·v² = ½ × ${fmt(p.m, 0)} × ${fmt(Math.abs(st.v), 2)}² = ${fmt(ke, 0)} J`, W * 0.04, fy + lh * 1.8);
    ctx.fillStyle = '#a78bfa'; ctx.fillText(`PE + KE + ${T('heat', 'kalor')} = ${fmt(pe + ke + eth, 0)} J = m·g·h₀ (${T('constant', 'tetap')})`, W * 0.04, fy + lh * 2.7);
    if (st.markRec) {
      ctx.fillStyle = '#fbbf24'; ctx.textAlign = 'right';
      ctx.fillText(T(`at marker: h = ${fmt(st.markRec.h, 2)} m, v = ${fmt(st.markRec.v, 2)} m/s`, `di penanda: h = ${fmt(st.markRec.h, 2)} m, v = ${fmt(st.markRec.v, 2)} m/s`), W * 0.96, fy + lh * 0.9);
      ctx.fillText(`PE ${fmt(st.markRec.pe, 0)} J  KE ${fmt(st.markRec.ke, 0)} J  ${T('heat', 'kalor')} ${fmt(st.markRec.eth, 0)} J`, W * 0.96, fy + lh * 1.8);
    }
    ctx.textAlign = 'left';
  }

  // ---------- dragging ----------
  const hitR = () => Math.max(10, scale * 0.3);
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) {
      const q = at(st.s);
      if (!st.running && Math.hypot(x - WX(q.x), y - WY(q.y) + scale * 0.4) < hitR() * 1.8) return 'cart';
      const mk = at(st.sMark);
      if (Math.abs(x - WX(mk.x)) < hitR() && y > WY(mk.y) - scale * 1.6 && y < WY(mk.y)) return 'marker';
      for (let i = pts.length - 1; i >= 0; i--) if (Math.hypot(x - WX(pts[i].x), y - WY(pts[i].y)) < hitR()) return `p${i}`;
      return null;
    },
    onDrag(id, x, y) {
      const wx = (x - gx0) / scale, wy = (gy0 - y) / scale;
      if (id === 'cart') { placeAt(sAtX(clamp(wx, 0, XMAX))); return; }
      if (id === 'marker') { st.sMark = sAtX(clamp(wx, 0, XMAX)); return; }
      const i = Number(id.slice(1));
      const q = pts[i];
      if (i > 0 && i < pts.length - 1) q.x = clamp(wx, pts[i - 1].x + 0.8, pts[i + 1].x - 0.8);
      q.y = clamp(wy, 0.3, YMAX);
      tab.dirty = true;
    },
    onEnd(id) {
      if (id.startsWith('p')) { rebuild(); st.sMark = clamp(st.sMark, 0, tab.L); if (!st.running) placeAt(sAtX(at(st.s0).x)); }
    },
    handles: () => {
      const list = pts.map((q, i) => ({ id: `p${i}`, x: WX(q.x), y: WY(q.y), label: T(`Track point ${i + 1}`, `Titik lintasan ${i + 1}`) }));
      const mk = at(st.sMark); list.push({ id: 'marker', x: WX(mk.x), y: WY(mk.y) - scale * 1.2, label: T('Energy marker flag', 'Bendera penanda energi') });
      if (!st.running) { const q = at(st.s); list.push({ id: 'cart', x: WX(q.x), y: WY(q.y) - scale * 0.5, label: T('Cart (drag to set release point)', 'Kereta (seret untuk mengatur titik pelepasan)') }); }
      return list;
    },
    cursor: 'default', hoverCursor: 'grab',
  });

  // ---------- controls ----------
  const muS = slider({ label: T('Friction μ', 'Gesekan μ'), key: 'friction', min: 0, max: 0.3, step: 0.01, value: 0, format: (v) => v.toFixed(2), onInput: (v) => { p.mu = v; } });
  const massS = slider({ label: T('Cart mass m (kg)', 'Massa kereta m (kg)'), key: 'mass', min: 20, max: 80, step: 5, value: 40, onInput: (v) => { p.m = v; st.E0 = PE() + KE() + st.Eth; } });
  const relBtn = button({ label: T('Release', 'Lepaskan'), primary: true, onClick: () => {
    if (st.rest) return;
    st.running = !st.running;
    relBtn.label = st.running ? T('Pause', 'Jeda') : T('Continue', 'Lanjutkan');
  } });
  const resetBtn = button({ label: 'Reset', onClick: reset });
  const trackBtn = button({ label: T('Reset track', 'Atur ulang lintasan'), onClick: () => {
    DEFAULT_PTS.forEach(([x, y], i) => { pts[i].x = x; pts[i].y = y; }); rebuild(); st.sMark = sAtX(10); placeAt(sAtX(0.5));
  } });
  ctrlPanel.append(muS.el, massS.el, row(relBtn, resetBtn, trackBtn));

  const lab = labPanel({
    title: 'Energy lab — PE + KE + heat = constant',
    filename: 'energy-skate-park-data.csv',
    columns: [
      { key: 'h0', label: 'Release h₀ (m)', format: (v) => v.toFixed(2) },
      { key: 'mu', label: 'μ', format: (v) => v.toFixed(2) },
      { key: 'vmax', label: 'v max (m/s)', format: (v) => v.toFixed(2) },
      { key: 'hMark', label: 'h at marker (m)', format: (v) => v.toFixed(2) },
      { key: 'pe', label: 'PE (J)', format: (v) => v.toFixed(0) },
      { key: 'ke', label: 'KE (J)', format: (v) => v.toFixed(0) },
      { key: 'eth', label: 'Heat (J)', format: (v) => v.toFixed(0) },
      { key: 'total', label: 'Total (J)', format: (v) => v.toFixed(0) },
    ],
    procedure: [
      'μ = 0. Drag the cart to a release height of about 8 m, press Release, wait for it to pass the flag, then Record.',
      'Predict v_max with v = √(2·g·h₀). Compare with the v max column.',
      'Release from 6 m, then 4 m. Does v_max fall in proportion to h₀, or to √h₀?',
      'Move the flag to the lowest point of the track and release again. Where did all the PE go?',
      'Set μ = 0.05 and repeat step 1. Add PE + KE + heat at the marker: is the total still m·g·h₀?',
    ],
    predict: 'Releasing from twice the height: will the top speed double, or increase by less than that?',
    source: () => {
      if (!st.markRec) return null;
      const r = st.markRec;
      return { h0: at(st.s0).y, mu: p.mu, vmax: st.vmax, hMark: r.h, pe: r.pe, ke: r.ke, eth: r.eth, total: r.pe + r.ke + r.eth };
    },
  });
  ctrlPanel.appendChild(lab.el);

  rebuild();
  st.sMark = sAtX(10);
  placeAt(sAtX(0.5));
  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
