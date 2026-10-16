import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, toggle, select, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const MAX_Q = 10;           // units of charge after many rubs
const INDUCT_MAX = 6;       // symbols the sphere can separate / hold
const OBJECTS = {
  balloon: { sign: -1, cloth: { en: 'wool', id: 'wol' }, name: { en: 'Balloon', id: 'Balon' } },
  glass:   { sign: +1, cloth: { en: 'silk', id: 'sutra' }, name: { en: 'Glass rod', id: 'Batang kaca' } },
};

export function mount(rootEl) {
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { object: 'balloon', ballSign: +1, grounded: false };
  const state = {
    inited: false,
    q: 0,              // signed charge units on the hand-held object
    x: 0, y: 0,        // its position (canvas px)
    leafAngle: 0,      // electroscope half-angle (deg), smoothed
    ballAngle: 0,      // hanging ball swing (rad, + = toward object side...)
    sphereNet: 0,      // net charge on the induction sphere (signed units)
    flowTimer: 0,
    flashRub: 0,
    message: '',
    msgT: 0,
    t: 0,
  };
  const bits = Array.from({ length: 6 }, (_, i) => ({ i, dx: 0, dy: 0, stuck: false }));
  const particles = [];   // flying charge symbols: {x,y,tx,ty,sign,life}
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const sgn = (v) => (v > 0 ? 1 : v < 0 ? -1 : 0);

  // Layout helpers (fractions of W/H so the scene scales)
  const W = () => cv.width, H = () => cv.height;
  const benchY = () => H() * 0.80;
  const cloth = () => ({ x: W() * 0.10, y: H() * 0.88, w: W() * 0.13, h: H() * 0.10 });
  const scope = () => ({ x: W() * 0.40, plateY: H() * 0.26, caseTop: H() * 0.36, caseBot: benchY(), pivotY: H() * 0.50, leafLen: H() * 0.20, caseW: W() * 0.10 });
  const tray = () => ({ x: W() * 0.57, y: benchY(), w: W() * 0.12 });
  const pith = () => ({ px: W() * 0.73, py: H() * 0.10, len: H() * 0.46, r: W() * 0.018 });
  const sphere = () => ({ x: W() * 0.905, y: H() * 0.50, r: W() * 0.055 });
  const objR = () => W() * 0.055;
  const R0 = () => W() * 0.10;
  const CM = () => W() / 40;   // the bench is 40 "cm" wide

  function init() {
    state.x = W() * 0.17; state.y = H() * 0.42;
    state.inited = true;
  }
  // influence 0..1 of the charged object at a point
  function influence(px, py) {
    const r = Math.hypot(px - state.x, py - state.y);
    return (Math.abs(state.q) / MAX_Q) / (1 + (r / R0()) ** 2);
  }
  function say(en, id) { state.message = T(en, id); state.msgT = state.t; }

  function rub() {
    const o = OBJECTS[params.object];
    if (Math.abs(state.q) >= MAX_Q) { say('The object is fully charged.', 'Benda sudah bermuatan penuh.'); return; }
    state.q += o.sign;
    state.flashRub = 0.5;
    const c = cloth();
    // an electron flies: wool -> balloon, or glass -> silk
    const from = o.sign < 0 ? { x: c.x, y: c.y } : { x: state.x, y: state.y };
    const to = o.sign < 0 ? { x: state.x, y: state.y } : { x: c.x, y: c.y };
    particles.push({ x: from.x, y: from.y, sx: from.x, sy: from.y, tx: to.x, ty: to.y, sign: -1, life: 0, dur: 0.7, follow: o.sign < 0 });
    say(o.sign < 0 ? 'Electrons jump from the wool onto the balloon.' : 'Electrons leave the glass and move onto the silk.',
      o.sign < 0 ? 'Elektron melompat dari wol ke balon.' : 'Elektron meninggalkan kaca dan pindah ke sutra.');
  }
  function discharge() {
    state.q = 0; particles.length = 0;
    say('Touching ground: the charge drains away.', 'Menyentuh tanah: muatan mengalir pergi.');
  }

  function step(dt) {
    state.t += dt;
    if (!state.inited) init();
    if (state.flashRub > 0) state.flashRub -= dt;
    // particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life += dt;
      const k = Math.min(1, p.life / p.dur);
      if (p.follow) { p.tx = state.x; p.ty = state.y; }
      p.x = p.sx + (p.tx - p.sx) * k; p.y = p.sy + (p.ty - p.sy) * k - Math.sin(k * Math.PI) * H() * 0.08;
      if (k >= 1) particles.splice(i, 1);
    }
    // Electroscope: leaf half-angle grows with influence at the plate
    const sc = scope();
    const fScope = influence(sc.x, sc.plateY);
    const targetLeaf = clamp(50 * Math.sqrt(fScope), 0, 45);   // half-angle, degrees
    state.leafAngle += (targetLeaf - state.leafAngle) * Math.min(1, dt * 6);
    // Paper bits: pulled toward the object, jump and stick when very close
    const tr = tray();
    bits.forEach((b, i) => {
      const bx0 = tr.x - tr.w / 2 + (i + 0.5) * (tr.w / bits.length), by0 = tr.y - 3;
      const f = influence(bx0, by0);
      const dx = state.x - bx0, dy = state.y - by0, r = Math.hypot(dx, dy) || 1;
      let lift = clamp(f * 1.6, 0, 1) * Math.max(0, r - objR());
      if (f < 0.04) lift = 0;
      const tdx = (dx / r) * lift, tdy = (dy / r) * lift;
      const rate = Math.min(1, dt * (lift > 0 ? 5 : 3));
      b.dx += (tdx - b.dx) * rate; b.dy += (tdy - b.dy) * rate;
      b.stuck = lift > 0 && lift >= r - objR() - 1;
    });
    // Hanging charged ball: swings toward (opposite) or away (like)
    const pt = pith();
    const bx = pt.px + Math.sin(state.ballAngle) * pt.len, by = pt.py + Math.cos(state.ballAngle) * pt.len;
    const fBall = influence(bx, by);
    const dir = sgn(state.x - bx) || 1;     // +1 object is to the right of the ball
    const sameSign = sgn(state.q) === params.ballSign;
    const targetBall = (sameSign ? -dir : dir) * clamp(fBall * 1.4, 0, 0.75);
    state.ballAngle += (targetBall - state.ballAngle) * Math.min(1, dt * 4);
    // Induction sphere: when grounded, like charges leave/return through the wire
    const sp = sphere();
    const fSph = influence(sp.x, sp.y);
    const nPol = Math.round(clamp(fSph * 1.6, 0, 1) * INDUCT_MAX);
    if (params.grounded) {
      const target = -sgn(state.q) * nPol;
      state.flowTimer += dt;
      if (state.sphereNet !== target && state.flowTimer > 0.25) {
        state.flowTimer = 0;
        const stepDir = sgn(target - state.sphereNet);
        state.sphereNet += stepDir;
        // electrons (−) moving along the wire: net going up means electrons leaving; going down means arriving
        const gx = sp.x + sp.r * 0.6, gy = benchY() - 4;
        const from = stepDir > 0 ? { x: sp.x, y: sp.y + sp.r } : { x: gx, y: gy };
        const to = stepDir > 0 ? { x: gx, y: gy } : { x: sp.x, y: sp.y + sp.r };
        particles.push({ x: from.x, y: from.y, sx: from.x, sy: from.y, tx: to.x, ty: to.y, sign: -1, life: 0, dur: 0.3, follow: false });
      }
    }
  }

  // ---------- drawing ----------
  function font(px, bold) { return `${bold ? 'bold ' : ''}${Math.max(9, Math.round(px))}px system-ui, -apple-system, Roboto, sans-serif`; }
  function symbol(ctx, x, y, sign, size) {
    ctx.fillStyle = sign < 0 ? '#60a5fa' : '#f87171';
    ctx.beginPath(); ctx.arc(x, y, size, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#0b1220'; ctx.lineWidth = Math.max(1.2, size * 0.28); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x - size * 0.55, y); ctx.lineTo(x + size * 0.55, y);
    if (sign > 0) { ctx.moveTo(x, y - size * 0.55); ctx.lineTo(x, y + size * 0.55); }
    ctx.stroke(); ctx.lineCap = 'butt';
  }
  function symbolsAround(ctx, cx, cy, rx, ry, n, sign, size, startAngle = -Math.PI / 2, spread = Math.PI * 2) {
    for (let i = 0; i < n; i++) {
      const a = spread >= Math.PI * 2 - 1e-6
        ? startAngle + (i / n) * Math.PI * 2
        : startAngle + (n === 1 ? 0 : (i / (n - 1) - 0.5) * spread);
      symbol(ctx, cx + Math.cos(a) * rx, cy + Math.sin(a) * ry, sign, size);
    }
  }

  function drawObject(ctx) {
    const o = OBJECTS[params.object];
    const r = objR(), x = state.x, y = state.y;
    const n = Math.abs(state.q);
    if (params.object === 'balloon') {
      ctx.fillStyle = '#f472b6';
      ctx.beginPath(); ctx.ellipse(x, y, r * 0.85, r * 1.1, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.beginPath(); ctx.ellipse(x - r * 0.3, y - r * 0.4, r * 0.2, r * 0.35, 0.3, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#f472b6';
      ctx.beginPath(); ctx.moveTo(x, y + r * 1.1); ctx.lineTo(x - r * 0.15, y + r * 1.3); ctx.lineTo(x + r * 0.15, y + r * 1.3); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#fbcfe8'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(x, y + r * 1.3); ctx.quadraticCurveTo(x + r * 0.3, y + r * 1.7, x - r * 0.1, y + r * 2.1); ctx.stroke();
      symbolsAround(ctx, x, y, r * 0.6, r * 0.8, n, o.sign, r * 0.14);
    } else {
      ctx.save(); ctx.translate(x, y); ctx.rotate(-0.35);
      ctx.fillStyle = 'rgba(165,243,252,0.75)';
      ctx.beginPath(); ctx.roundRect(-r * 1.5, -r * 0.22, r * 3, r * 0.44, r * 0.2); ctx.fill();
      ctx.strokeStyle = '#a5f3fc'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.restore();
      for (let i = 0; i < n; i++) {
        const t = (i + 0.5) / n - 0.5;
        const px = x + Math.cos(-0.35) * t * r * 2.6, py = y + Math.sin(-0.35) * t * r * 2.6 + (i % 2 ? 1 : -1) * r * 0.1;
        symbol(ctx, px, py, o.sign, r * 0.14);
      }
    }
    // label
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(W() * 0.02); ctx.textAlign = 'center';
    const qTxt = state.q === 0 ? T('neutral', 'netral') : `${state.q > 0 ? '+' : '−'}${n}`;
    ctx.fillText(`${o.name[getLocale() === 'id' ? 'id' : 'en']}: ${qTxt}`, x, y - r * 1.35);
  }

  function drawCloth(ctx) {
    const c = cloth(), o = OBJECTS[params.object];
    ctx.fillStyle = params.object === 'balloon' ? '#fde68a' : '#c4b5fd';
    ctx.beginPath(); ctx.roundRect(c.x - c.w / 2, c.y - c.h / 2, c.w, c.h, 8); ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.25)'; ctx.lineWidth = 1;
    for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(c.x - c.w / 2, c.y - c.h / 2 + (i * c.h) / 4); ctx.lineTo(c.x + c.w / 2, c.y - c.h / 2 + (i * c.h) / 4); ctx.stroke(); }
    const n = Math.abs(state.q);
    for (let i = 0; i < n; i++) {
      const col = i % 5, rowI = Math.floor(i / 5);
      symbol(ctx, c.x - c.w / 2 + (col + 0.5) * (c.w / 5), c.y - c.h / 4 + rowI * (c.h / 2), -o.sign, W() * 0.0075);
    }
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(W() * 0.019); ctx.textAlign = 'center';
    ctx.fillText(o.cloth[getLocale() === 'id' ? 'id' : 'en'], c.x, c.y + c.h / 2 + W() * 0.022);
  }

  function drawElectroscope(ctx) {
    const s = scope(), w = s.caseW;
    // glass case
    ctx.fillStyle = 'rgba(148,163,184,0.10)'; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(s.x - w / 2, s.caseTop, w, s.caseBot - s.caseTop, 6); ctx.fill(); ctx.stroke();
    // rod and plate
    ctx.strokeStyle = '#d1d5db'; ctx.lineWidth = Math.max(2, W() * 0.006);
    ctx.beginPath(); ctx.moveTo(s.x, s.plateY); ctx.lineTo(s.x, s.pivotY); ctx.stroke();
    ctx.fillStyle = '#d1d5db';
    ctx.beginPath(); ctx.roundRect(s.x - w * 0.45, s.plateY - 4, w * 0.9, 6, 2); ctx.fill();
    // leaves
    const a = (state.leafAngle * Math.PI) / 180;
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = Math.max(2, W() * 0.005); ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(s.x, s.pivotY); ctx.lineTo(s.x - Math.sin(a) * s.leafLen, s.pivotY + Math.cos(a) * s.leafLen);
    ctx.moveTo(s.x, s.pivotY); ctx.lineTo(s.x + Math.sin(a) * s.leafLen, s.pivotY + Math.cos(a) * s.leafLen);
    ctx.stroke(); ctx.lineCap = 'butt';
    // induced charges: like charges pushed into the leaves, opposite on the plate
    const n = Math.round(clamp(state.leafAngle / 45, 0, 1) * 4);
    const qs = sgn(state.q);
    for (let i = 0; i < n; i++) {
      const k = 0.35 + (i / Math.max(1, n - 1)) * 0.55;
      symbol(ctx, s.x - Math.sin(a) * s.leafLen * k - 5, s.pivotY + Math.cos(a) * s.leafLen * k, qs, W() * 0.007);
      symbol(ctx, s.x + Math.sin(a) * s.leafLen * k + 5, s.pivotY + Math.cos(a) * s.leafLen * k, qs, W() * 0.007);
      symbol(ctx, s.x - w * 0.35 + (i / Math.max(1, n - 1)) * w * 0.7, s.plateY - 10, -qs, W() * 0.007);
    }
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(W() * 0.019); ctx.textAlign = 'center';
    ctx.fillText(T('electroscope', 'elektroskop'), s.x, s.caseBot + W() * 0.022);
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(`${(2 * state.leafAngle).toFixed(0)}°`, s.x, s.caseBot + W() * 0.045);
  }

  function drawPaper(ctx) {
    const tr = tray();
    ctx.fillStyle = '#475569';
    ctx.beginPath(); ctx.roundRect(tr.x - tr.w / 2 - 4, tr.y - 4, tr.w + 8, 8, 3); ctx.fill();
    const bw = W() * 0.014, bh = W() * 0.009;
    bits.forEach((b, i) => {
      const x = tr.x - tr.w / 2 + (i + 0.5) * (tr.w / bits.length) + b.dx, y = tr.y - 6 + b.dy;
      ctx.save(); ctx.translate(x, y); ctx.rotate((i % 3 - 1) * 0.3);
      ctx.fillStyle = '#f8fafc'; ctx.fillRect(-bw / 2, -bh / 2, bw, bh);
      ctx.restore();
    });
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(W() * 0.019); ctx.textAlign = 'center';
    ctx.fillText(T('paper bits', 'potongan kertas'), tr.x, tr.y + W() * 0.022);
  }

  function drawPith(ctx) {
    const p = pith();
    const bx = p.px + Math.sin(state.ballAngle) * p.len, by = p.py + Math.cos(state.ballAngle) * p.len;
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(p.px - W() * 0.03, p.py); ctx.lineTo(p.px + W() * 0.03, p.py); ctx.stroke();
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(p.px, p.py); ctx.lineTo(bx, by); ctx.stroke();
    ctx.fillStyle = '#e5e7eb';
    ctx.beginPath(); ctx.arc(bx, by, p.r, 0, Math.PI * 2); ctx.fill();
    symbolsAround(ctx, bx, by, p.r * 0.55, p.r * 0.55, 4, params.ballSign, p.r * 0.28);
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(W() * 0.019); ctx.textAlign = 'center';
    ctx.fillText(T('charged ball', 'bola bermuatan'), p.px, benchY() + W() * 0.022);
    const fBall = influence(bx, by);
    if (fBall > 0.03 && state.q !== 0) {
      const same = sgn(state.q) === params.ballSign;
      ctx.fillStyle = same ? '#f87171' : '#4ade80';
      ctx.fillText(same ? T('repel', 'tolak') : T('attract', 'tarik'), p.px, benchY() + W() * 0.045);
    }
  }

  function drawSphere(ctx) {
    const s = sphere();
    // stand (insulator) and ground wire
    ctx.fillStyle = '#a16207';
    ctx.fillRect(s.x - s.r * 0.12, s.y + s.r, s.r * 0.24, benchY() - s.y - s.r);
    ctx.fillRect(s.x - s.r * 0.6, benchY() - 5, s.r * 1.2, 5);
    const gx = s.x + s.r * 0.6, gy = benchY() - 4;
    const wireCol = params.grounded ? '#4ade80' : 'rgba(148,163,184,0.35)';
    ctx.strokeStyle = wireCol; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(s.x + s.r * 0.5, s.y + s.r * 0.87);
    if (params.grounded) ctx.lineTo(gx, gy); else { ctx.lineTo(gx - s.r * 0.1, s.y + s.r * 1.4); ctx.moveTo(gx, gy - s.r * 0.5); ctx.lineTo(gx, gy); }
    ctx.stroke();
    // ground symbol
    ctx.strokeStyle = '#94a3b8';
    ctx.beginPath();
    ctx.moveTo(gx - 10, gy); ctx.lineTo(gx + 10, gy);
    ctx.moveTo(gx - 6, gy + 4); ctx.lineTo(gx + 6, gy + 4);
    ctx.moveTo(gx - 2, gy + 8); ctx.lineTo(gx + 2, gy + 8);
    ctx.stroke();
    // sphere
    const grad = ctx.createRadialGradient(s.x - s.r * 0.3, s.y - s.r * 0.3, s.r * 0.1, s.x, s.y, s.r);
    grad.addColorStop(0, '#e5e7eb'); grad.addColorStop(1, '#6b7280');
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
    // charges: polarised pairs + net
    const f = influence(s.x, s.y);
    const pol = clamp(f * 1.6, 0, 1);
    const nPol = Math.round(pol * INDUCT_MAX);
    const qs = sgn(state.q);
    const net = state.sphereNet, an = Math.abs(net), ns = sgn(net);
    const toward = Math.atan2(state.y - s.y, state.x - s.x);
    const spread = Math.PI * (1 - 0.65 * pol);
    const size = s.r * 0.16, rr = s.r * 0.78;
    let nearCount, farCount, nearSign, farSign;
    if (qs === 0 || nPol === 0) {
      // nothing inducing: net charge spreads evenly
      symbolsAround(ctx, s.x, s.y, rr, rr, an, ns, size);
    } else {
      if (ns === 0 || ns === -qs) { nearCount = Math.max(nPol, an); farCount = Math.max(0, nPol - an); }
      else { nearCount = nPol; farCount = nPol + an; }
      nearSign = -qs; farSign = qs;
      symbolsAround(ctx, s.x, s.y, rr, rr, nearCount, nearSign, size, toward, spread);
      symbolsAround(ctx, s.x, s.y, rr, rr, farCount, farSign, size, toward + Math.PI, spread);
    }
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(W() * 0.019); ctx.textAlign = 'center';
    ctx.fillText(T('metal sphere', 'bola logam'), s.x, benchY() + W() * 0.022);
    ctx.fillStyle = net === 0 ? '#94a3b8' : net > 0 ? '#f87171' : '#60a5fa';
    ctx.fillText(net === 0 ? T('net: 0', 'bersih: 0') : `${T('net', 'bersih')}: ${net > 0 ? '+' : '−'}${an}`, s.x, benchY() + W() * 0.045);
  }

  function draw() {
    const ctx = cv.ctx;
    const w = W(), h = H();
    if (w < 10 || h < 10 || !state.inited) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, w, h);
    // bench
    ctx.fillStyle = '#1e293b'; ctx.fillRect(0, benchY(), w, h - benchY());
    ctx.fillStyle = '#334155'; ctx.fillRect(0, benchY(), w, 4);

    drawCloth(ctx);
    drawElectroscope(ctx);
    drawPaper(ctx);
    drawPith(ctx);
    drawSphere(ctx);
    drawObject(ctx);
    for (const p of particles) symbol(ctx, p.x, p.y, p.sign, w * 0.009);

    // message
    if (state.message && state.t - state.msgT < 4) {
      ctx.fillStyle = 'rgba(226,232,240,0.9)'; ctx.font = font(w * 0.021); ctx.textAlign = 'left';
      ctx.fillText(state.message, w * 0.02, h * 0.06);
    }
    // hint
    ctx.fillStyle = 'rgba(148,163,184,0.8)'; ctx.font = font(w * 0.018); ctx.textAlign = 'left';
    ctx.fillText(T('Drag the charged object near each station.', 'Geser benda bermuatan ke dekat tiap alat.'), w * 0.02, h * 0.11);
    ctx.textAlign = 'left';
  }

  // ---------- interaction ----------
  let grabDX = 0, grabDY = 0;
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) { return Math.hypot(x - state.x, y - state.y) < objR() * 1.6 ? 'obj' : null; },
    onStart(id, x, y) { grabDX = state.x - x; grabDY = state.y - y; },
    onDrag(id, x, y) {
      state.x = clamp(x + grabDX, objR(), W() - objR());
      state.y = clamp(y + grabDY, objR() * 1.4, benchY() - objR() * 0.5);
    },
    handles: () => (state.inited ? [{ id: 'obj', x: state.x, y: state.y, label: `${OBJECTS[params.object].name.en} (drag near the stations)` }] : []),
    cursor: 'grab', hoverCursor: 'grab', keyStep: 8,
  });

  // ---------- controls ----------
  const objSel = select({
    label: 'Object to rub', key: 'object',
    options: [{ value: 'balloon', label: 'Rubber balloon on wool' }, { value: 'glass', label: 'Glass rod on silk' }],
    value: params.object,
    onChange: (v) => { params.object = v; state.q = 0; particles.length = 0; rubB.label = v === 'balloon' ? 'Rub on wool' : 'Rub on silk'; },
  });
  const rubB = button({ label: 'Rub on wool', primary: true, onClick: rub });
  const dischB = button({ label: 'Discharge (touch ground)', onClick: discharge });
  const ballSel = select({
    label: 'Hanging ball charge', key: 'ball',
    options: [{ value: '+', label: 'Positive (+)' }, { value: '-', label: 'Negative (−)' }],
    value: '+',
    onChange: (v) => { params.ballSign = v === '-' ? -1 : 1; },
  });
  const groundT = toggle({ label: 'Ground wire connected to metal sphere', key: 'ground', value: false, onChange: (v) => { params.grounded = v; state.flowTimer = 1; } });
  const neutralB = button({ label: 'Neutralise sphere', onClick: () => { state.sphereNet = 0; } });
  const resetB = button({ label: 'Reset', onClick: () => { state.q = 0; state.sphereNet = 0; particles.length = 0; init(); } });
  ctrlPanel.append(objSel.el, row(rubB, dischB), ballSel.el, row(groundT), row(neutralB, resetB));

  const lab = labPanel({
    title: 'Static lab: charge and the electroscope',
    filename: 'static-electricity-data.csv',
    columns: [
      { key: 'object', label: 'Object' },
      { key: 'sign', label: 'Charge sign' },
      { key: 'units', label: 'Charge (units)' },
      { key: 'dist', label: 'Distance to plate (cm)', format: (v) => v.toFixed(1) },
      { key: 'angle', label: 'Leaf angle (°)', format: (v) => v.toFixed(0) },
    ],
    procedure: [
      'Rub the balloon 3 times. Drag it so it is about 10 cm from the electroscope plate and record.',
      'Keep the distance and rub 3 more times (6 units). Record. Then 9 units.',
      'With 6 units, record at 15 cm, 10 cm, 5 cm and 2 cm.',
      'Switch to the glass rod, charge it to 6 units, and repeat at 10 cm. Compare with the balloon.',
      'Which changes the angle more: doubling the charge or halving the distance?',
    ],
    predict: 'Does the electroscope open more for a bigger charge, a closer charge, or both? Will the glass rod (+) open the leaves the other way?',
    source: () => {
      if (!state.inited) return null;
      const sc = scope();
      return {
        object: params.object === 'balloon' ? 'balloon' : 'glass rod',
        sign: state.q > 0 ? '+' : state.q < 0 ? '−' : '0',
        units: Math.abs(state.q),
        dist: Math.hypot(state.x - sc.x, state.y - sc.plateY) / CM(),
        angle: 2 * state.leafAngle,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
