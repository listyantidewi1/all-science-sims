import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

// Top-down view of a table. Positions are fractions of the canvas (0..1) so
// nothing breaks when the canvas resizes. Velocities are fractions per second.
const TABLE = { x0: 0.04, x1: 0.96, y0: 0.22, y1: 0.96 };
const KICK = 0.32;          // speed added by one push / pull (fraction of width per second)
const FRICTION = 0.9;       // 1/s, exponential slow-down from the table
const SQUASH_TIME = 1.1;    // seconds the force arrows stay on screen

const T = (en, id) => (getLocale() === 'id' ? id : en);

function bigBtn(label, onClick, primary = false) {
  const b = button({ label, onClick, primary });
  b.el.style.minHeight = '44px';
  b.el.style.fontSize = '1rem';
  b.el.style.padding = '10px 18px';
  return b;
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  cv.canvas.style.touchAction = 'none';

  const OBJ = [
    { id: 'ball', name: () => T('Ball', 'Bola'), soft: 'elastic', mass: 1.0 },
    { id: 'car', name: () => T('Toy car', 'Mobil mainan'), soft: 'hard', mass: 1.3 },
    { id: 'clay', name: () => T('Clay', 'Tanah liat'), soft: 'plastic', mass: 1.6 },
  ];
  const things = OBJ.map((o) => ({ ...o, x: 0, y: 0, vx: 0, vy: 0, squash: 0, spin: 0 }));
  const state = {
    sel: 0,
    msg: null,        // { force, changed, note, at }
    arrows: null,     // { kind, x, y, at } force arrows to draw
    last: null,       // last recorded event for the lab
  };
  let now = 0;

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const radius = () => Math.min(cv.width, cv.height) * 0.075;   // px

  function putBack() {
    things.forEach((o, i) => {
      o.x = 0.2 + i * 0.3; o.y = 0.6; o.vx = 0; o.vy = 0; o.squash = 0; o.spin = 0;
    });
    state.msg = null; state.arrows = null;
  }
  putBack();

  function speedOf(o) { return Math.hypot(o.vx, o.vy); }

  function applyForce(kind) {
    const o = things[state.sel];
    const wasMoving = speedOf(o) > 0.02;
    const k = KICK / o.mass;
    let changed = '', note = '';
    if (kind === 'push' || kind === 'pull') {
      const dir = kind === 'push' ? 1 : -1;
      const before = o.vx;
      o.vx += dir * k;
      changed = T('MOTION', 'GERAK');
      if (!wasMoving) note = T('it started to move', 'benda mulai bergerak');
      else if (Math.sign(before) === dir && Math.abs(o.vy) < Math.abs(o.vx)) note = T('it went faster', 'benda makin cepat');
      else if (Math.sign(before) === -dir) {
        note = Math.sign(o.vx) === -dir || Math.abs(o.vx) < 0.02
          ? T('it slowed down', 'benda makin lambat')
          : T('it turned back', 'benda berbalik arah');
        if (note === T('it turned back', 'benda berbalik arah')) changed = T('MOTION + DIRECTION', 'GERAK + ARAH');
      } else note = T('it changed its path', 'jalurnya berubah');
    } else if (kind === 'side') {
      o.vy -= k;
      if (wasMoving) { changed = T('DIRECTION', 'ARAH'); note = T('it turned a new way', 'benda berbelok ke arah baru'); }
      else { changed = T('MOTION', 'GERAK'); note = T('it started to move', 'benda mulai bergerak'); }
    } else if (kind === 'squash') {
      if (o.soft === 'plastic') { o.squash = clamp(o.squash + 0.35, 0, 1); changed = T('SHAPE', 'BENTUK'); note = T('the clay stays flat', 'tanah liat tetap gepeng'); }
      else if (o.soft === 'elastic') { o.squash = 0.6; changed = T('SHAPE', 'BENTUK'); note = T('the ball springs back', 'bola kembali bulat'); }
      else { changed = T('NOTHING', 'TIDAK ADA'); note = T('the car is hard, so its shape did not change', 'mobil itu keras, jadi bentuknya tidak berubah'); }
    }
    state.msg = { force: kind, changed, note, at: now };
    state.arrows = { kind, at: now };
    state.last = {
      object: o.id, force: kind,
      changed: changed.toLowerCase().replace(/\s/g, ''),
      note,
    };
  }

  function step(dt) {
    const rx = radius() / cv.width, ry = radius() / cv.height;
    for (const o of things) {
      const damp = Math.exp(-FRICTION * dt);
      o.vx *= damp; o.vy *= damp;
      if (Math.abs(o.vx) < 0.004) o.vx = 0;
      if (Math.abs(o.vy) < 0.004) o.vy = 0;
      o.x += o.vx * dt; o.y += o.vy * dt;
      // Bounce softly off the table rim.
      if (o.x < TABLE.x0 + rx) { o.x = TABLE.x0 + rx; o.vx = Math.abs(o.vx) * 0.5; }
      if (o.x > TABLE.x1 - rx) { o.x = TABLE.x1 - rx; o.vx = -Math.abs(o.vx) * 0.5; }
      if (o.y < TABLE.y0 + ry) { o.y = TABLE.y0 + ry; o.vy = Math.abs(o.vy) * 0.5; }
      if (o.y > TABLE.y1 - ry) { o.y = TABLE.y1 - ry; o.vy = -Math.abs(o.vy) * 0.5; }
      o.spin += o.vx * dt * 40;
      if (o.soft === 'elastic' && o.squash > 0) o.squash = Math.max(0, o.squash - dt * 1.4);
    }
  }

  function arrow(ctx, x0, y0, x1, y1, color, w) {
    const dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy) || 1;
    const ux = dx / len, uy = dy / len, head = w * 2.2;
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = w; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1 - ux * head * 0.8, y1 - uy * head * 0.8); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 - ux * head - uy * head * 0.6, y1 - uy * head + ux * head * 0.6);
    ctx.lineTo(x1 - ux * head + uy * head * 0.6, y1 - uy * head - ux * head * 0.6);
    ctx.closePath(); ctx.fill();
    ctx.lineCap = 'butt';
  }

  function drawThing(ctx, o, selected) {
    const W = cv.width, H = cv.height, r = radius();
    const px = o.x * W, py = o.y * H;
    const sx = 1 + 0.7 * o.squash, sy = 1 - 0.55 * o.squash;
    if (selected) {
      ctx.strokeStyle = '#facc15'; ctx.lineWidth = 4; ctx.setLineDash([8, 6]);
      ctx.beginPath(); ctx.arc(px, py, r * 1.55, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
    }
    // motion streaks
    const sp = speedOf(o);
    if (sp > 0.03) {
      const n = Math.min(4, Math.floor(sp * 12) + 1);
      ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 3; ctx.lineCap = 'round';
      const ux = -o.vx / sp, uy = -o.vy / sp;
      for (let i = 0; i < n; i++) {
        const off = (i - (n - 1) / 2) * r * 0.5;
        const bx = px + ux * r * 1.3 - uy * off, by = py + uy * r * 1.3 + ux * off;
        ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + ux * r * (0.6 + sp * 2), by + uy * r * (0.6 + sp * 2)); ctx.stroke();
      }
      ctx.lineCap = 'butt';
    }
    ctx.save();
    ctx.translate(px, py);
    ctx.scale(sx, sy);
    if (o.id === 'ball') {
      ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill();
      ctx.save(); ctx.rotate(o.spin);
      ctx.strokeStyle = '#fde68a'; ctx.lineWidth = r * 0.14;
      ctx.beginPath(); ctx.arc(0, 0, r * 0.62, 0, Math.PI * 1.3); ctx.stroke();
      ctx.restore();
      ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.beginPath(); ctx.arc(-r * 0.35, -r * 0.35, r * 0.22, 0, Math.PI * 2); ctx.fill();
    } else if (o.id === 'car') {
      ctx.fillStyle = '#1f2937';
      [[-r * 0.65, -r * 0.75], [r * 0.65, -r * 0.75], [-r * 0.65, r * 0.75], [r * 0.65, r * 0.75]].forEach(([x, y]) => {
        ctx.beginPath(); ctx.roundRect(x - r * 0.28, y - r * 0.2, r * 0.56, r * 0.4, r * 0.1); ctx.fill();
      });
      ctx.fillStyle = '#3b82f6'; ctx.beginPath(); ctx.roundRect(-r * 1.1, -r * 0.65, r * 2.2, r * 1.3, r * 0.3); ctx.fill();
      ctx.fillStyle = '#bfdbfe'; ctx.beginPath(); ctx.roundRect(-r * 0.3, -r * 0.45, r * 0.9, r * 0.9, r * 0.15); ctx.fill();
      ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.arc(r * 1.0, -r * 0.4, r * 0.12, 0, Math.PI * 2); ctx.arc(r * 1.0, r * 0.4, r * 0.12, 0, Math.PI * 2); ctx.fill();
    } else {
      ctx.fillStyle = '#a16207';
      ctx.beginPath();
      ctx.moveTo(-r, 0);
      ctx.bezierCurveTo(-r, -r * 1.1, -r * 0.3, -r * 1.1, 0, -r * 0.85);
      ctx.bezierCurveTo(r * 0.5, -r * 1.2, r * 1.1, -r * 0.6, r * 0.95, 0);
      ctx.bezierCurveTo(r * 1.1, r * 0.7, r * 0.3, r * 1.05, 0, r * 0.9);
      ctx.bezierCurveTo(-r * 0.6, r * 1.1, -r * 1.05, r * 0.6, -r, 0);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.18)'; ctx.beginPath(); ctx.arc(-r * 0.3, -r * 0.3, r * 0.3, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
    // name under the thing
    ctx.fillStyle = '#e2e8f0';
    ctx.font = `bold ${Math.round(r * 0.42)}px system-ui, -apple-system, Roboto, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(o.name(), px, py + r * sy + r * 0.55);
  }

  function drawForceArrows(ctx) {
    const a = state.arrows;
    if (!a || now - a.at > SQUASH_TIME) return;
    const o = things[state.sel];
    const W = cv.width, H = cv.height, r = radius();
    const px = o.x * W, py = o.y * H;
    const fade = 1 - (now - a.at) / SQUASH_TIME;
    const color = `rgba(249,115,22,${(0.3 + 0.7 * fade).toFixed(2)})`;
    const w = Math.max(4, r * 0.18), len = r * 1.6;
    if (a.kind === 'push') arrow(ctx, px - r * 1.4 - len, py, px - r * 1.3, py, color, w);
    else if (a.kind === 'pull') arrow(ctx, px - r * 1.2, py, px - r * 1.2 - len, py, color, w);
    else if (a.kind === 'side') arrow(ctx, px, py + r * 1.4 + len, px, py + r * 1.3, color, w);
    else {
      arrow(ctx, px, py - r * 1.4 - len * 0.7, px, py - r * 1.1, color, w);
      arrow(ctx, px, py + r * 1.4 + len * 0.7, px, py + r * 1.1, color, w);
    }
    if (a.kind === 'pull') {
      // a string from the thing to the pulling hand on the left
      ctx.strokeStyle = color; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(px - r, py); ctx.lineTo(px - r * 1.2, py); ctx.stroke();
    }
  }

  function forceName(kind) {
    return kind === 'push' ? T('Push', 'Dorong')
      : kind === 'pull' ? T('Pull', 'Tarik')
      : kind === 'side' ? T('Sideways push', 'Dorong samping')
      : T('Squash', 'Remas');
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    // table top with a rim
    ctx.fillStyle = '#7c4a1e';
    ctx.beginPath(); ctx.roundRect(TABLE.x0 * W - 8, TABLE.y0 * H - 8, (TABLE.x1 - TABLE.x0) * W + 16, (TABLE.y1 - TABLE.y0) * H + 16, 18); ctx.fill();
    ctx.fillStyle = '#c0813f';
    ctx.beginPath(); ctx.roundRect(TABLE.x0 * W, TABLE.y0 * H, (TABLE.x1 - TABLE.x0) * W, (TABLE.y1 - TABLE.y0) * H, 12); ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.12)'; ctx.lineWidth = 2;
    for (let i = 1; i < 6; i++) {
      const y = TABLE.y0 * H + (TABLE.y1 - TABLE.y0) * H * i / 6;
      ctx.beginPath(); ctx.moveTo(TABLE.x0 * W, y); ctx.lineTo(TABLE.x1 * W, y); ctx.stroke();
    }
    drawForceArrows(ctx);
    things.forEach((o, i) => drawThing(ctx, o, i === state.sel));

    // Banner: what did the force change?
    const fs = Math.max(13, Math.round(H * 0.05));
    ctx.textAlign = 'left';
    ctx.font = `bold ${fs}px system-ui, -apple-system, Roboto, sans-serif`;
    const m = state.msg;
    if (m) {
      const isNothing = m.changed === T('NOTHING', 'TIDAK ADA');
      ctx.fillStyle = isNothing ? '#94a3b8' : '#facc15';
      ctx.fillText(`${forceName(m.force)} → ${T('changed', 'mengubah')}: ${m.changed}`, W * 0.04, H * 0.09);
      ctx.fillStyle = '#e2e8f0';
      ctx.font = `${Math.round(fs * 0.8)}px system-ui, -apple-system, Roboto, sans-serif`;
      ctx.fillText(m.note, W * 0.04, H * 0.165);
    } else {
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText(T('Tap a thing, then press a force button.', 'Ketuk sebuah benda, lalu tekan tombol gaya.'), W * 0.04, H * 0.09);
      ctx.fillStyle = '#94a3b8';
      ctx.font = `${Math.round(fs * 0.8)}px system-ui, -apple-system, Roboto, sans-serif`;
      ctx.fillText(T('What will the force change?', 'Apa yang akan diubah oleh gaya?'), W * 0.04, H * 0.165);
    }
    // Speed meter for the selected thing (top right)
    const o = things[state.sel];
    const sp = clamp(speedOf(o) / 0.7, 0, 1);
    const bw = W * 0.17, bh = Math.max(10, H * 0.035), bx = W * 0.8, by = H * 0.06;
    ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, bh / 2); ctx.fill();
    ctx.fillStyle = sp > 0.01 ? '#22c55e' : '#475569'; ctx.beginPath(); ctx.roundRect(bx, by, Math.max(bh, bw * sp), bh, bh / 2); ctx.fill();
    ctx.fillStyle = '#e2e8f0';
    ctx.font = `${Math.round(fs * 0.7)}px system-ui, -apple-system, Roboto, sans-serif`;
    ctx.textAlign = 'right';
    ctx.fillText(`${T('Speed of', 'Kecepatan')} ${o.name().toLowerCase()}`, bx + bw, by + bh + fs * 0.85);
    ctx.textAlign = 'left';
  }

  // Tap a thing to select it.
  const onDown = (e) => {
    const rect = cv.canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width, y = (e.clientY - rect.top) / rect.height;
    const r = radius();
    let best = -1, bestD = Infinity;
    things.forEach((o, i) => {
      const d = Math.hypot((x - o.x) * cv.width, (y - o.y) * cv.height);
      if (d < r * 1.8 && d < bestD) { best = i; bestD = d; }
    });
    if (best >= 0) { state.sel = best; sel.value = things[best].id; }
  };
  cv.canvas.addEventListener('pointerdown', onDown);

  // Controls
  const sel = select({
    label: T('Which thing?', 'Benda mana?'), key: 'thing',
    options: OBJ.map((o) => ({ value: o.id, label: o.name() })),
    value: 'ball',
    onChange: (v) => { state.sel = Math.max(0, things.findIndex((o) => o.id === v)); },
  });
  const pushB = bigBtn(T('Push →', 'Dorong →'), () => applyForce('push'), true);
  const pullB = bigBtn(T('← Pull', '← Tarik'), () => applyForce('pull'), true);
  const sideB = bigBtn(T('↑ Sideways', '↑ Samping'), () => applyForce('side'), true);
  const squashB = bigBtn(T('Squash', 'Remas'), () => applyForce('squash'), true);
  const resetB = bigBtn(T('Put things back', 'Kembalikan benda'), () => putBack());
  ctrlPanel.append(sel.el, row(pushB, pullB, sideB, squashB), row(resetB));

  const lab = labPanel({
    title: 'What did the force change?',
    filename: 'forces-shape-motion-data.csv',
    columns: [
      { key: 'object', label: 'Thing' },
      { key: 'force', label: 'Force' },
      { key: 'changed', label: 'What changed' },
      { key: 'note', label: 'Note' },
    ],
    procedure: [
      'Pick the ball. Press Push. Read the label, then press Record.',
      'Press Sideways while the ball is still rolling. Record.',
      'Pick the clay. Press Squash. Record.',
      'Pick the car. Press Squash. Record. Did its shape change?',
      'Try every force on every thing. Which force changes shape? Which change motion?',
    ],
    predict: 'Which thing will change shape when you squash it: the ball, the car, or the clay?',
    source: () => state.last,
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { now = t; step(dt); draw(); });
  animator.start();
  return () => {
    animator.stop();
    cv.canvas.removeEventListener('pointerdown', onDown);
    cv.destroy();
  };
}
