import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, select, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
const RANGE = 10;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const NAMES = ['A', 'B', 'C', 'D'];
const fmt = (v) => {
  const r = Math.round(v * 100) / 100;
  const s = Number.isInteger(r) ? String(r) : r.toFixed(r * 10 === Math.round(r * 10) ? 1 : 2);
  return (r < 0 ? '−' : '') + s.replace('-', '');
};
const pt = (p) => `(${fmt(p.x)}, ${fmt(p.y)})`;

// ---- the transformations ---------------------------------------------------
function applyTf(tf, p, u = 1) {
  // u in [0,1] gives an intermediate position for the animation (u = 1 is the true image).
  switch (tf.type) {
    case 'translate': return { x: p.x + tf.dx * u, y: p.y + tf.dy * u };
    case 'reflect': {
      let q;
      if (tf.axis === 'x') q = { x: p.x, y: -p.y };
      else if (tf.axis === 'y') q = { x: -p.x, y: p.y };
      else if (tf.axis === 'yx') q = { x: p.y, y: p.x };
      else q = { x: -p.y, y: -p.x };                       // y = −x
      return { x: p.x + (q.x - p.x) * u, y: p.y + (q.y - p.y) * u };
    }
    case 'rotate': {
      const a = (tf.angle * Math.PI / 180) * u;             // anticlockwise is positive
      const cx = tf.cx, cy = tf.cy;
      const dx = p.x - cx, dy = p.y - cy;
      return { x: cx + dx * Math.cos(a) - dy * Math.sin(a), y: cy + dx * Math.sin(a) + dy * Math.cos(a) };
    }
    case 'dilate': {
      const k = 1 + (tf.k - 1) * u;
      return { x: p.x * k, y: p.y * k };
    }
    default: return { ...p };
  }
}
function ruleText(tf) {
  switch (tf.type) {
    case 'translate': return `(x, y) → (x ${tf.dx < 0 ? '−' : '+'} ${Math.abs(tf.dx)}, y ${tf.dy < 0 ? '−' : '+'} ${Math.abs(tf.dy)})`;
    case 'reflect': return tf.axis === 'x' ? '(x, y) → (x, −y)' : tf.axis === 'y' ? '(x, y) → (−x, y)' : tf.axis === 'yx' ? '(x, y) → (y, x)' : '(x, y) → (−y, −x)';
    case 'rotate': {
      if (tf.cx === 0 && tf.cy === 0) return tf.angle === 90 ? '(x, y) → (−y, x)' : tf.angle === 180 ? '(x, y) → (−x, −y)' : '(x, y) → (y, −x)';
      return T(`rotate ${tf.angle}° about (${fmt(tf.cx)}, ${fmt(tf.cy)}): shift centre to origin, rotate, shift back`, `putar ${tf.angle}° terhadap (${fmt(tf.cx)}, ${fmt(tf.cy)}): geser pusat ke titik asal, putar, geser kembali`);
    }
    case 'dilate': return `(x, y) → (${fmt(tf.k)}x, ${fmt(tf.k)}y)`;
    default: return '';
  }
}
function tfName(tf) {
  switch (tf.type) {
    case 'translate': return T(`Translation by (${fmt(tf.dx)}, ${fmt(tf.dy)})`, `Translasi sebesar (${fmt(tf.dx)}, ${fmt(tf.dy)})`);
    case 'reflect': return T('Reflection in ', 'Refleksi terhadap ') + (tf.axis === 'x' ? T('the x-axis', 'sumbu-x') : tf.axis === 'y' ? T('the y-axis', 'sumbu-y') : tf.axis === 'yx' ? T('the line y = x', 'garis y = x') : T('the line y = −x', 'garis y = −x'));
    case 'rotate': return T(`Rotation ${tf.angle}° anticlockwise about (${fmt(tf.cx)}, ${fmt(tf.cy)})`, `Rotasi ${tf.angle}° berlawanan arah jarum jam terhadap (${fmt(tf.cx)}, ${fmt(tf.cy)})`);
    case 'dilate': return T(`Dilation, factor k = ${fmt(tf.k)}, centre (0, 0)`, `Dilatasi, faktor k = ${fmt(tf.k)}, pusat (0, 0)`);
    default: return '';
  }
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  // ---- state ---------------------------------------------------------------
  const shapes = {
    triangle: [{ x: 1, y: 1 }, { x: 4, y: 1 }, { x: 2, y: 4 }],
    quad: [{ x: 1, y: 1 }, { x: 5, y: 1 }, { x: 5, y: 3 }, { x: 2, y: 4 }],
  };
  const state = { shape: 'triangle', pts: shapes.triangle.map((p) => ({ ...p })), labVertex: 0 };
  const tf = { type: 'translate', dx: 3, dy: -2, axis: 'x', angle: 90, centre: 'origin', cx: 0, cy: 0, k: 2 };
  const custom = { x: 2, y: 0 };                 // the draggable rotation centre
  const anim = { u: 0 };
  const challenge = { on: false, target: null, result: '', solvedAt: -10 };
  let now = 0;

  function currentTf() {
    const t = { type: tf.type, dx: tf.dx, dy: tf.dy, axis: tf.axis, angle: tf.angle, k: tf.k, cx: 0, cy: 0 };
    if (tf.type === 'rotate' && tf.centre === 'custom') { t.cx = custom.x; t.cy = custom.y; }
    return t;
  }
  const restart = () => { anim.u = 0; challenge.result = ''; };

  // ---- grid geometry -------------------------------------------------------
  function grid() {
    const W = cv.width, H = cv.height;
    const side = Math.min(H * 0.96, W * 0.56);
    const unit = side / (2 * RANGE);
    const ox = W * 0.02 + side / 2, oy = H / 2;
    return { side, unit, ox, oy, toX: (x) => ox + x * unit, toY: (y) => oy - y * unit, fromX: (px) => (px - ox) / unit, fromY: (py) => (oy - py) / unit };
  }

  // ---- challenge -----------------------------------------------------------
  const rnd = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
  function newChallenge() {
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    let target = null;
    for (let tries = 0; tries < 30 && !target; tries++) {
      const type = pick(['translate', 'reflect', 'rotate', 'dilate']);
      let cand;
      if (type === 'translate') { const dx = rnd(-6, 6), dy = rnd(-6, 6); if (!dx && !dy) continue; cand = { type, dx, dy, cx: 0, cy: 0 }; }
      else if (type === 'reflect') cand = { type, axis: pick(['x', 'y', 'yx', 'y-x']), cx: 0, cy: 0 };
      else if (type === 'rotate') cand = { type, angle: pick([90, 180, 270]), cx: 0, cy: 0 };
      else cand = { type, k: pick([2, 0.5, -1, 1.5, -2]), cx: 0, cy: 0 };
      const img = state.pts.map((p) => applyTf(cand, p));
      if (img.every((p) => Math.abs(p.x) <= RANGE && Math.abs(p.y) <= RANGE)) target = cand;
    }
    challenge.target = target || { type: 'reflect', axis: 'x', cx: 0, cy: 0 };
    challenge.on = true;
    challenge.result = '';
    anim.u = 0;
    syncVisibility();
  }
  function checkChallenge() {
    if (!challenge.on || !challenge.target) return;
    const mine = state.pts.map((p) => applyTf(currentTf(), p));
    const theirs = state.pts.map((p) => applyTf(challenge.target, p));
    const ok = mine.every((p, i) => Math.abs(p.x - theirs[i].x) < 1e-6 && Math.abs(p.y - theirs[i].y) < 1e-6);
    challenge.result = ok ? 'ok' : 'no';
    if (ok) challenge.solvedAt = now;
  }
  function endChallenge() { challenge.on = false; challenge.target = null; challenge.result = ''; anim.u = 0; syncVisibility(); }

  // ---- drawing -------------------------------------------------------------
  const font = (px, bold = false) => `${bold ? 'bold ' : ''}${Math.max(9, Math.round(px))}px system-ui, -apple-system, Roboto, sans-serif`;

  function drawPolygon(ctx, pts, stroke, fill, lw, dashed = false) {
    if (pts.length < 2) return;
    const g = grid();
    ctx.beginPath();
    pts.forEach((p, i) => { const x = g.toX(p.x), y = g.toY(p.y); if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); });
    ctx.closePath();
    ctx.fillStyle = fill; ctx.fill();
    ctx.setLineDash(dashed ? [6, 5] : []);
    ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.stroke();
    ctx.setLineDash([]);
  }
  function drawLabels(ctx, pts, color, prime) {
    const g = grid();
    const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length, cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;
    ctx.fillStyle = color; ctx.font = font(Math.max(11, g.unit * 0.75), true); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    pts.forEach((p, i) => {
      const dx = p.x - cx, dy = p.y - cy, len = Math.hypot(dx, dy) || 1;
      ctx.fillText(NAMES[i] + (prime ? '′' : ''), g.toX(p.x) + dx / len * g.unit * 0.9, g.toY(p.y) - dy / len * g.unit * 0.9);
    });
  }

  function drawGrid(ctx) {
    const g = grid();
    const W = cv.width;
    const x0 = g.toX(-RANGE), x1 = g.toX(RANGE), y0 = g.toY(RANGE), y1 = g.toY(-RANGE);
    ctx.fillStyle = '#0f172a'; ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
    ctx.lineWidth = 1;
    for (let i = -RANGE; i <= RANGE; i++) {
      ctx.strokeStyle = i === 0 ? '#e2e8f0' : (i % 5 === 0 ? '#475569' : '#1e293b');
      ctx.lineWidth = i === 0 ? 2 : 1;
      ctx.beginPath(); ctx.moveTo(g.toX(i), y0); ctx.lineTo(g.toX(i), y1); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x0, g.toY(i)); ctx.lineTo(x1, g.toY(i)); ctx.stroke();
    }
    const every = W < 640 ? 5 : 2;
    ctx.fillStyle = '#94a3b8'; ctx.font = font(Math.max(9, g.unit * 0.55)); ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    for (let i = -RANGE; i <= RANGE; i += every) if (i !== 0) ctx.fillText(fmt(i), g.toX(i), g.toY(0) + 3);
    ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
    for (let i = -RANGE; i <= RANGE; i += every) if (i !== 0) ctx.fillText(fmt(i), g.toX(0) - 4, g.toY(i));
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(Math.max(10, g.unit * 0.7), true);
    ctx.textAlign = 'left'; ctx.textBaseline = 'bottom'; ctx.fillText('x', x1 - 4, g.toY(0) - 4);
    ctx.textAlign = 'left'; ctx.textBaseline = 'top'; ctx.fillText('y', g.toX(0) + 5, y0 + 2);
  }

  function drawHelpers(ctx, t) {
    const g = grid();
    const x0 = g.toX(-RANGE), x1 = g.toX(RANGE), y0 = g.toY(RANGE), y1 = g.toY(-RANGE);
    ctx.setLineDash([7, 5]); ctx.lineWidth = 2;
    if (t.type === 'reflect') {
      ctx.strokeStyle = '#f472b6';
      ctx.beginPath();
      if (t.axis === 'x') { ctx.moveTo(x0, g.toY(0)); ctx.lineTo(x1, g.toY(0)); }
      else if (t.axis === 'y') { ctx.moveTo(g.toX(0), y0); ctx.lineTo(g.toX(0), y1); }
      else if (t.axis === 'yx') { ctx.moveTo(g.toX(-RANGE), g.toY(-RANGE)); ctx.lineTo(g.toX(RANGE), g.toY(RANGE)); }
      else { ctx.moveTo(g.toX(-RANGE), g.toY(RANGE)); ctx.lineTo(g.toX(RANGE), g.toY(-RANGE)); }
      ctx.stroke();
      ctx.fillStyle = '#f9a8d4'; ctx.font = font(Math.max(10, g.unit * 0.65)); ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
      const lbl = t.axis === 'x' ? T('mirror: x-axis', 'cermin: sumbu-x') : t.axis === 'y' ? T('mirror: y-axis', 'cermin: sumbu-y') : t.axis === 'yx' ? 'y = x' : 'y = −x';
      if (t.axis === 'yx') ctx.fillText(lbl, g.toX(7.5), g.toY(8.2)); else if (t.axis === 'y-x') ctx.fillText(lbl, g.toX(-9.5), g.toY(8.2)); else if (t.axis === 'x') ctx.fillText(lbl, g.toX(5.5), g.toY(0) - 2); else ctx.fillText(lbl, g.toX(0) + 4, g.toY(-7));
    } else if (t.type === 'rotate') {
      // centre marker and arc arrows from each vertex
      const cx = g.toX(t.cx), cy = g.toY(t.cy);
      ctx.setLineDash([]);
      ctx.fillStyle = '#f472b6'; ctx.beginPath(); ctx.arc(cx, cy, Math.max(5, g.unit * 0.3), 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.setLineDash([4, 4]); ctx.strokeStyle = 'rgba(244,114,182,0.6)'; ctx.lineWidth = 1.5;
      const p = state.pts[0];
      const r = Math.hypot(p.x - t.cx, p.y - t.cy) * g.unit;
      if (r > 1) {
        const a0 = Math.atan2(-(p.y - t.cy), p.x - t.cx);
        ctx.beginPath(); ctx.arc(cx, cy, r, a0, a0 - (t.angle * Math.PI / 180) * Math.max(anim.u, 0.001), true); ctx.stroke();
      }
    } else if (t.type === 'dilate') {
      ctx.strokeStyle = 'rgba(244,114,182,0.6)'; ctx.lineWidth = 1.5;
      for (const p of state.pts) {
        const q = applyTf(t, p);
        const far = Math.abs(t.k) >= 1 ? q : p;
        ctx.beginPath(); ctx.moveTo(g.toX(0), g.toY(0)); ctx.lineTo(g.toX(far.x), g.toY(far.y)); ctx.stroke();
        if (t.k < 0) { ctx.beginPath(); ctx.moveTo(g.toX(0), g.toY(0)); ctx.lineTo(g.toX(p.x), g.toY(p.y)); ctx.stroke(); }
      }
      ctx.setLineDash([]);
      ctx.fillStyle = '#f472b6'; ctx.beginPath(); ctx.arc(g.toX(0), g.toY(0), 4, 0, Math.PI * 2); ctx.fill();
    } else if (t.type === 'translate' && (t.dx || t.dy)) {
      ctx.strokeStyle = 'rgba(244,114,182,0.7)'; ctx.lineWidth = 1.5;
      for (const p of state.pts) {
        const q = applyTf(t, p);
        ctx.beginPath(); ctx.moveTo(g.toX(p.x), g.toY(p.y)); ctx.lineTo(g.toX(q.x), g.toY(q.y)); ctx.stroke();
      }
    }
    ctx.setLineDash([]);
  }

  function drawPanel(ctx, t) {
    const W = cv.width, H = cv.height;
    const g = grid();
    const x = g.toX(RANGE) + W * 0.03, w = W - x - W * 0.02;
    if (w < 60) return;
    const fs = Math.min(H * 0.045, w * 0.075);
    let y = H * 0.05;
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    ctx.fillStyle = '#f8fafc'; ctx.font = font(fs, true);
    if (challenge.on) {
      ctx.fillStyle = '#fbbf24';
      ctx.fillText(T('Challenge', 'Tantangan'), x, y); y += fs * 1.4;
      ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs * 0.85);
      ctx.fillText(T('Which transformation maps the blue', 'Transformasi mana yang memetakan bangun'), x, y); y += fs * 1.15;
      ctx.fillText(T('shape onto the green one?', 'biru ke bangun hijau?'), x, y); y += fs * 1.15;
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(T('Set the controls, then press Check.', 'Atur kontrol, lalu tekan Periksa.'), x, y); y += fs * 1.5;
    } else {
      ctx.fillText(tfName(t), x, y); y += fs * 1.4;
    }
    ctx.fillStyle = '#f9a8d4'; ctx.font = font(fs * 0.9);
    ctx.fillText(T('Your rule: ', 'Aturanmu: ') + ruleText(t), x, y); y += fs * 1.6;
    // Coordinates before → after
    ctx.font = font(fs * 0.9);
    const img = state.pts.map((p) => applyTf(t, p));
    const target = challenge.on ? state.pts.map((p) => applyTf(challenge.target, p)) : null;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(T('before → after', 'sebelum → sesudah') + (challenge.on ? T(' (your guess)', ' (tebakanmu)') : ''), x, y); y += fs * 1.2;
    state.pts.forEach((p, i) => {
      ctx.fillStyle = '#93c5fd'; ctx.fillText(`${NAMES[i]}${pt(p)}`, x, y);
      const wA = ctx.measureText(`${NAMES[i]}${pt(p)}`).width;
      ctx.fillStyle = '#cbd5e1'; ctx.fillText(' → ', x + wA, y);
      const wArr = ctx.measureText(' → ').width;
      ctx.fillStyle = challenge.on ? '#fcd34d' : '#86efac'; ctx.fillText(`${NAMES[i]}′${pt(img[i])}`, x + wA + wArr, y);
      y += fs * 1.2;
    });
    if (challenge.on && target) {
      y += fs * 0.4;
      ctx.fillStyle = '#94a3b8'; ctx.fillText(T('green image (target)', 'bayangan hijau (target)'), x, y); y += fs * 1.2;
      target.forEach((q, i) => { ctx.fillStyle = '#86efac'; ctx.fillText(`${NAMES[i]}′${pt(q)}`, x, y); y += fs * 1.2; });
      if (challenge.result) {
        y += fs * 0.4;
        ctx.fillStyle = challenge.result === 'ok' ? '#34d399' : '#fca5a5'; ctx.font = font(fs, true);
        ctx.fillText(challenge.result === 'ok' ? T('Correct! Your image matches.', 'Benar! Bayanganmu cocok.') : T('Not yet — compare the coordinates.', 'Belum — bandingkan koordinatnya.'), x, y);
      }
    } else {
      y += fs * 0.5;
      ctx.fillStyle = '#64748b'; ctx.font = font(fs * 0.8);
      const notes = t.type === 'dilate' ? [T(`Lengths × ${fmt(Math.abs(t.k))}, area × ${fmt(t.k * t.k)}.`, `Panjang × ${fmt(Math.abs(t.k))}, luas × ${fmt(t.k * t.k)}.`), t.k < 0 ? T('Negative k: image on the other side of O.', 'k negatif: bayangan di seberang O.') : T('Shape stays similar, not congruent.', 'Bentuk tetap sebangun, tidak kongruen.')]
        : [T('Size and shape unchanged (congruent).', 'Ukuran dan bentuk tetap (kongruen).'), t.type === 'reflect' ? T('Orientation is flipped (A→B→C reverses).', 'Orientasi terbalik (A→B→C berbalik arah).') : T('Orientation is kept.', 'Orientasi tetap.')];
      for (const n of notes) { ctx.fillText(n, x, y); y += fs * 1.1; }
      ctx.fillText(T('Drag the blue corners to change the shape.', 'Geser titik sudut biru untuk mengubah bangun.'), x, y);
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    const t = currentTf();
    drawGrid(ctx);
    drawHelpers(ctx, t);
    const g = grid();
    // Target image in challenge mode (green, solid)
    if (challenge.on && challenge.target) {
      const target = state.pts.map((p) => applyTf(challenge.target, p));
      drawPolygon(ctx, target, '#34d399', 'rgba(52,211,153,0.25)', 2.5);
      drawLabels(ctx, target, '#86efac', true);
    }
    // Preimage (blue)
    drawPolygon(ctx, state.pts, '#60a5fa', 'rgba(96,165,250,0.3)', 2.5);
    drawLabels(ctx, state.pts, '#bfdbfe', false);
    // Image (animated) — green normally, yellow dashed when it is the student's guess
    const img = state.pts.map((p) => applyTf(t, p, anim.u));
    if (challenge.on) drawPolygon(ctx, img, '#fcd34d', 'rgba(252,211,77,0.18)', 2, true);
    else drawPolygon(ctx, img, '#34d399', 'rgba(52,211,153,0.3)', 2.5);
    if (anim.u >= 1 && !challenge.on) drawLabels(ctx, img, '#86efac', true);
    // Vertex handles
    for (const p of state.pts) {
      ctx.fillStyle = '#3b82f6'; ctx.beginPath(); ctx.arc(g.toX(p.x), g.toY(p.y), Math.max(6, g.unit * 0.32), 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
    }
    drawPanel(ctx, t);
  }

  // ---- dragging ------------------------------------------------------------
  // A keyboard nudge arrives as onStart exactly on the handle followed by a tiny onDrag offset;
  // we turn that into a move of one whole grid cell so arrow keys are useful.
  let nudgeFrom = null;
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) {
      const g = grid();
      const rad = Math.max(12, g.unit * 0.5);
      if (tf.type === 'rotate' && tf.centre === 'custom' && !challenge.on && Math.hypot(x - g.toX(custom.x), y - g.toY(custom.y)) < rad) return 'centre';
      for (let i = state.pts.length - 1; i >= 0; i--) {
        const p = state.pts[i];
        if (Math.hypot(x - g.toX(p.x), y - g.toY(p.y)) < rad) return i;
      }
      return null;
    },
    onStart(id, x, y) {
      const g = grid();
      const p = id === 'centre' ? custom : state.pts[id];
      nudgeFrom = (p && Math.abs(x - g.toX(p.x)) < 1e-6 && Math.abs(y - g.toY(p.y)) < 1e-6) ? { x: p.x, y: p.y, px: x, py: y } : null;
    },
    onDrag(id, x, y) {
      const g = grid();
      let gx = clamp(Math.round(g.fromX(x)), -RANGE, RANGE), gy = clamp(Math.round(g.fromY(y)), -RANGE, RANGE);
      if (nudgeFrom && Math.hypot(x - nudgeFrom.px, y - nudgeFrom.py) < g.unit) {
        gx = clamp(nudgeFrom.x + Math.sign(x - nudgeFrom.px), -RANGE, RANGE);
        gy = clamp(nudgeFrom.y - Math.sign(y - nudgeFrom.py), -RANGE, RANGE);
      }
      if (id === 'centre') { custom.x = gx; custom.y = gy; }
      else { state.pts[id].x = gx; state.pts[id].y = gy; }
      restart();
    },
    handles: () => {
      const g = grid();
      const list = state.pts.map((p, i) => ({ id: i, x: g.toX(p.x), y: g.toY(p.y), label: T(`Vertex ${NAMES[i]} at ${pt(p)}`, `Titik ${NAMES[i]} di ${pt(p)}`) }));
      if (tf.type === 'rotate' && tf.centre === 'custom' && !challenge.on) list.push({ id: 'centre', x: g.toX(custom.x), y: g.toY(custom.y), label: T('Rotation centre', 'Pusat rotasi') });
      return list;
    },
    onEnd() { nudgeFrom = null; },
    cursor: 'default', hoverCursor: 'grab',
  });

  // ---- controls ------------------------------------------------------------
  const shapeSel = select({
    label: T('Shape', 'Bangun'), key: 'shape', value: 'triangle',
    options: [{ value: 'triangle', label: T('Triangle ABC', 'Segitiga ABC') }, { value: 'quad', label: T('Quadrilateral ABCD', 'Segi empat ABCD') }],
    onChange: (v) => { state.shape = v; state.pts = shapes[v].map((p) => ({ ...p })); if (challenge.on) newChallenge(); restart(); },
  });
  const typeSel = select({
    label: T('Transformation', 'Transformasi'), key: 'type', value: 'translate',
    options: [
      { value: 'translate', label: T('Translation', 'Translasi') },
      { value: 'reflect', label: T('Reflection', 'Refleksi') },
      { value: 'rotate', label: T('Rotation', 'Rotasi') },
      { value: 'dilate', label: T('Dilation', 'Dilatasi') },
    ],
    onChange: (v) => { tf.type = v; syncVisibility(); restart(); },
  });
  const dxSl = slider({ label: 'dx', key: 'dx', min: -RANGE, max: RANGE, step: 1, value: tf.dx, format: fmt, onInput: (v) => { tf.dx = v; restart(); } });
  const dySl = slider({ label: 'dy', key: 'dy', min: -RANGE, max: RANGE, step: 1, value: tf.dy, format: fmt, onInput: (v) => { tf.dy = v; restart(); } });
  const axisSel = select({
    label: T('Mirror line', 'Garis cermin'), key: 'axis', value: 'x',
    options: [{ value: 'x', label: T('x-axis (y = 0)', 'sumbu-x (y = 0)') }, { value: 'y', label: T('y-axis (x = 0)', 'sumbu-y (x = 0)') }, { value: 'yx', label: 'y = x' }, { value: 'y-x', label: 'y = −x' }],
    onChange: (v) => { tf.axis = v; restart(); },
  });
  const angleSel = select({
    label: T('Angle (anticlockwise)', 'Sudut (berlawanan jarum jam)'), key: 'angle', value: '90',
    options: [{ value: '90', label: '90°' }, { value: '180', label: '180°' }, { value: '270', label: '270° (= −90°)' }],
    onChange: (v) => { tf.angle = Number(v); restart(); },
  });
  const centreSel = select({
    label: T('Centre of rotation', 'Pusat rotasi'), key: 'centre', value: 'origin',
    options: [{ value: 'origin', label: T('Origin (0, 0)', 'Titik asal (0, 0)') }, { value: 'custom', label: T('Drag the pink point', 'Geser titik merah muda') }],
    onChange: (v) => { tf.centre = v; restart(); },
  });
  const kSel = select({
    label: T('Scale factor k', 'Faktor skala k'), key: 'k', value: '2',
    options: ['3', '2', '1.5', '0.5', '-0.5', '-1', '-2'].map((v) => ({ value: v, label: fmt(Number(v)) })),
    onChange: (v) => { tf.k = Number(v); restart(); },
  });
  const replay = button({ label: T('Replay animation', 'Ulangi animasi'), onClick: () => { anim.u = 0; } });
  const startCh = button({ label: T('Find the transformation', 'Tebak transformasinya'), primary: true, onClick: () => newChallenge() });
  const checkBtn = button({ label: T('Check', 'Periksa'), primary: true, onClick: () => checkChallenge() });
  const newBtn = button({ label: T('New challenge', 'Tantangan baru'), onClick: () => newChallenge() });
  const quitBtn = button({ label: T('Exit challenge', 'Keluar tantangan'), onClick: () => endChallenge() });
  const labSel = select({
    label: T('Vertex to record', 'Titik yang dicatat'), key: 'vertex', value: '0',
    options: NAMES.map((n, i) => ({ value: String(i), label: n })),
    onChange: (v) => { state.labVertex = Number(v); },
  });

  const rowTranslate = row(dxSl, dySl);
  const rowReflect = row(axisSel);
  const rowRotate = row(angleSel, centreSel);
  const rowDilate = row(kSel);
  const rowChallenge = row(checkBtn, newBtn, quitBtn);
  const rowMain = row(replay, startCh);
  ctrlPanel.append(row(shapeSel, typeSel), rowTranslate, rowReflect, rowRotate, rowDilate, rowMain, rowChallenge);

  function syncVisibility() {
    rowTranslate.style.display = tf.type === 'translate' ? '' : 'none';
    rowReflect.style.display = tf.type === 'reflect' ? '' : 'none';
    rowRotate.style.display = tf.type === 'rotate' ? '' : 'none';
    rowDilate.style.display = tf.type === 'dilate' ? '' : 'none';
    rowChallenge.style.display = challenge.on ? '' : 'none';
    startCh.el.style.display = challenge.on ? 'none' : '';
    // Challenges are generated about the origin, so the custom centre is hidden while one is running.
    centreSel.el.style.display = challenge.on ? 'none' : '';
    if (challenge.on && tf.centre === 'custom') { tf.centre = 'origin'; centreSel.value = 'origin'; }
  }
  syncVisibility();

  const lab = labPanel({
    title: 'Vertex → image lab',
    filename: 'transformations-data.csv',
    columns: [
      { key: 'tf', label: 'Transformation' },
      { key: 'v', label: 'Vertex' },
      { key: 'x', label: 'x', format: fmt },
      { key: 'y', label: 'y', format: fmt },
      { key: 'xi', label: "x'", format: fmt },
      { key: 'yi', label: "y'", format: fmt },
    ],
    procedure: [
      'Choose Reflection in the x-axis. Record A, B and C. Which coordinate changed, and how?',
      'Choose Rotation 90° about the origin. Record the vertices. Write the rule (x, y) → (?, ?) from your rows.',
      'Choose Dilation k = 2, then k = −1. Record one vertex each time. Compare with the 180° rotation.',
      'Drag a vertex onto the mirror line (or onto the rotation centre) and record it. What happens to a point that lies on the line or at the centre?',
    ],
    predict: 'Before recording, predict the image of A(1, 1) under a 90° rotation about the origin.',
    source: () => {
      const i = clamp(state.labVertex, 0, state.pts.length - 1);
      const p = state.pts[i], q = applyTf(currentTf(), p);
      return { tf: tfName(currentTf()), v: NAMES[i], x: p.x, y: p.y, xi: q.x, yi: q.y };
    },
  });
  ctrlPanel.append(labSel.el, lab.el);

  const animator = loop((dt, t) => {
    now = t;
    if (anim.u < 1) anim.u = Math.min(1, anim.u + dt / 1.2);
    draw();
  });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
