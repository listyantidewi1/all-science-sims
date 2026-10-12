import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, toggle, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';

const OBJECTS = [
  { id: 'nail', name: 'Iron nail', material: 'iron', magnetic: true },
  { id: 'clip', name: 'Paper clip', material: 'steel', magnetic: true },
  { id: 'coin', name: 'Copper coin', material: 'copper', magnetic: false },
  { id: 'toy', name: 'Plastic toy', material: 'plastic', magnetic: false },
  { id: 'wood', name: 'Wooden block', material: 'wood', magnetic: false },
  { id: 'can', name: 'Aluminium can', material: 'aluminium', magnetic: false },
  { id: 'band', name: 'Rubber band', material: 'rubber', magnetic: false },
];
const PULL = 1.5e6;    // strength of the pull/push between the two magnets
const FRICTION = 300;  // below this the magnets are too far apart to move each other
const STICK_RANGE = 50;

function bigBtn(label, onClick) {
  const b = button({ label, onClick });
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
  const mags = [
    { id: 'A', x: 0, y: 0, vx: 0, vy: 0, flip: false },
    { id: 'B', x: 0, y: 0, vx: 0, vy: 0, flip: false },
  ];
  const objs = OBJECTS.map((o) => ({ ...o, x: 0, y: 0, stuck: null }));
  const state = { field: false, inited: false, lastTest: null, testAt: -10, prevGap: 1e9 };
  let now = 0;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const magLen = () => cv.width * 0.2;
  const magH = () => cv.width * 0.055;
  const playBottom = () => cv.height * 0.66;

  function init() {
    mags[0].x = cv.width * 0.22; mags[0].y = cv.height * 0.32;
    mags[1].x = cv.width * 0.72; mags[1].y = cv.height * 0.32;
    objs.forEach((o, i) => {
      o.x = cv.width * (0.08 + i * 0.14); o.y = cv.height * 0.85; o.stuck = null;
    });
    state.inited = true;
  }
  // Each magnet has two ends; red (N) on the left unless flipped.
  function ends(m) {
    const half = magLen() / 2;
    return [
      { x: m.x - half, y: m.y, pole: m.flip ? 'S' : 'N', out: -1 },
      { x: m.x + half, y: m.y, pole: m.flip ? 'N' : 'S', out: 1 },
    ];
  }

  function step(dt) {
    const W = cv.width, L = magLen(), hh = magH() / 2;
    const [A, B] = mags;
    const dx = B.x - A.x, dy = B.y - A.y;
    if (Math.abs(dy) < magH() * 1.5 && dx !== 0) {
      const left = dx > 0 ? A : B, right = dx > 0 ? B : A;
      const attract = ends(left)[1].pole !== ends(right)[0].pole;
      const gap = Math.abs(dx) - L;
      let a = PULL / ((Math.max(0, gap) + 25) ** 2);
      if (a < FRICTION) a = 0;
      const dir = Math.sign(dx);                 // from A toward B
      const onB = attract ? -dir * a : dir * a;  // push on B along x
      if (drag.activeId() !== 'B') { B.vx += onB * dt; if (attract && a) B.vy += (A.y - B.y) * 6 * dt; }
      if (drag.activeId() !== 'A') { A.vx -= onB * dt; if (attract && a) A.vy += (B.y - A.y) * 6 * dt; }
      if (attract && gap <= 2 && gap <= state.prevGap) {
        // Snap together: the magnet that is not being dragged jumps into place.
        const mover = drag.activeId() === left.id ? right : left;
        const anchor = mover === left ? right : left;
        mover.x = anchor.x + (mover === left ? -L : L);
        mover.y = anchor.y;
        mover.vx = 0; mover.vy = 0;
      } else if (!attract && gap < 0) {
        const mover = drag.activeId() === left.id ? right : left;
        mover.x += (mover === left ? -1 : 1) * (-gap);
      }
      state.prevGap = gap;
    }
    for (const m of mags) {
      if (drag.activeId() === m.id) { m.vx = 0; m.vy = 0; continue; }
      const damp = Math.exp(-5 * dt);
      m.vx *= damp; m.vy *= damp;
      m.x += m.vx * dt; m.y += m.vy * dt;
      const nx = clamp(m.x, L / 2, W - L / 2), ny = clamp(m.y, hh, cv.height - hh);
      if (nx !== m.x) m.vx = 0;
      if (ny !== m.y) m.vy = 0;
      m.x = nx; m.y = ny;
    }
    // Objects: anything touching a magnet gets tested; iron and steel stick to the nearer end.
    for (const m of mags) {
      const E = ends(m);
      for (const o of objs) {
        if (o.stuck) continue;
        const overBar = Math.abs(o.x - m.x) < L / 2 && Math.abs(o.y - m.y) < hh + 16;
        const ei = o.x < m.x ? 0 : 1;
        const nearEnd = Math.hypot(o.x - E[ei].x, o.y - E[ei].y) < STICK_RANGE;
        if (!overBar && !nearEnd) continue;
        if (state.lastTest !== o || now - state.testAt > 2.5) { state.lastTest = o; state.testAt = now; }
        if (o.magnetic) o.stuck = { mag: m, end: ei };
      }
      E.forEach((e, ei) => {
        let count = 0;
        for (const o of objs) {
          if (o.stuck && o.stuck.mag === m && o.stuck.end === ei) {
            count++;
            o.x = e.x + e.out * (14 + 22 * count); o.y = e.y;
          }
        }
      });
    }
  }

  function drawFilings(ctx, W) {
    const poles = mags.flatMap((m) => ends(m).map((e) => ({ x: e.x, y: e.y, q: e.pole === 'N' ? 1 : -1 })));
    const sp = 22;
    ctx.lineWidth = 2;
    for (let y = sp / 2; y < playBottom(); y += sp) for (let x = sp / 2; x < W; x += sp) {
      let fx = 0, fy = 0;
      for (const p of poles) {
        const rx = x - p.x, ry = y - p.y, r2 = rx * rx + ry * ry + 100;
        const r = Math.sqrt(r2);
        fx += p.q * rx / (r2 * r); fy += p.q * ry / (r2 * r);
      }
      const mag = Math.hypot(fx, fy) || 1e-9;
      const alpha = clamp(mag * 9000, 0.12, 0.9);
      ctx.strokeStyle = `rgba(148,163,184,${alpha})`;
      ctx.beginPath();
      ctx.moveTo(x - 7 * fx / mag, y - 7 * fy / mag);
      ctx.lineTo(x + 7 * fx / mag, y + 7 * fy / mag);
      ctx.stroke();
    }
  }

  function drawMagnet(ctx, m) {
    const L = magLen(), hh = magH() / 2;
    const [l, r] = ends(m);
    ctx.fillStyle = l.pole === 'N' ? '#ef4444' : '#3b82f6';
    ctx.beginPath(); ctx.roundRect(m.x - L / 2, m.y - hh, L / 2, hh * 2, [10, 0, 0, 10]); ctx.fill();
    ctx.fillStyle = r.pole === 'N' ? '#ef4444' : '#3b82f6';
    ctx.beginPath(); ctx.roundRect(m.x, m.y - hh, L / 2, hh * 2, [0, 10, 10, 0]); ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(m.x - L / 2, m.y - hh, L, hh * 2, 10); ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.font = `bold ${Math.round(hh * 1.2)}px system-ui, -apple-system, Roboto, sans-serif`;
    ctx.fillText(l.pole, m.x - L / 4, m.y + hh * 0.42);
    ctx.fillText(r.pole, m.x + L / 4, m.y + hh * 0.42);
    ctx.font = `bold ${Math.round(hh * 0.6)}px system-ui, -apple-system, Roboto, sans-serif`;
    ctx.fillText(m.id, m.x, m.y - hh - 6);
  }

  function drawObject(ctx, o) {
    const { x, y } = o;
    ctx.lineWidth = 3;
    if (o.id === 'nail') {
      ctx.fillStyle = '#9ca3af'; ctx.fillRect(x - 4, y - 22, 8, 44); ctx.fillRect(x - 12, y - 24, 24, 6);
    } else if (o.id === 'clip') {
      ctx.strokeStyle = '#cbd5e1';
      ctx.beginPath(); ctx.roundRect(x - 9, y - 22, 18, 40, 8); ctx.stroke();
      ctx.beginPath(); ctx.roundRect(x - 4, y - 14, 10, 32, 5); ctx.stroke();
    } else if (o.id === 'coin') {
      ctx.fillStyle = '#d97706'; ctx.beginPath(); ctx.arc(x, y, 20, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(x, y, 13, 0, Math.PI * 2); ctx.stroke();
    } else if (o.id === 'toy') {
      ctx.fillStyle = '#ec4899'; ctx.beginPath(); ctx.roundRect(x - 22, y - 14, 44, 24, 8); ctx.fill();
      ctx.fillStyle = '#1f2937';
      ctx.beginPath(); ctx.arc(x - 12, y + 12, 7, 0, Math.PI * 2); ctx.arc(x + 12, y + 12, 7, 0, Math.PI * 2); ctx.fill();
    } else if (o.id === 'wood') {
      ctx.fillStyle = '#b45309'; ctx.fillRect(x - 20, y - 20, 40, 40);
      ctx.strokeStyle = '#78350f'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x - 20, y - 8); ctx.lineTo(x + 20, y - 4); ctx.moveTo(x - 20, y + 8); ctx.lineTo(x + 20, y + 12); ctx.stroke();
    } else if (o.id === 'can') {
      ctx.fillStyle = '#e5e7eb'; ctx.beginPath(); ctx.roundRect(x - 14, y - 24, 28, 48, 5); ctx.fill();
      ctx.fillStyle = '#ef4444'; ctx.fillRect(x - 14, y - 8, 28, 16);
    } else {
      ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 5;
      ctx.beginPath(); ctx.ellipse(x, y, 20, 12, 0.5, 0, Math.PI * 2); ctx.stroke();
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    if (!state.inited) init();
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, W, H);
    if (state.field) drawFilings(ctx, W);
    // Tray
    ctx.fillStyle = '#334155';
    ctx.beginPath(); ctx.roundRect(W * 0.02, H * 0.72, W * 0.96, H * 0.26, 16); ctx.fill();
    ctx.fillStyle = '#94a3b8';
    ctx.font = `bold ${Math.round(H * 0.03)}px system-ui, -apple-system, Roboto, sans-serif`;
    ctx.textAlign = 'center';
    objs.forEach((o, i) => ctx.fillText(o.name, W * (0.08 + i * 0.14), H * 0.96));
    for (const o of objs) if (!o.stuck) drawObject(ctx, o);
    for (const m of mags) drawMagnet(ctx, m);
    for (const o of objs) if (o.stuck) drawObject(ctx, o);
    // Yes / no badge over the object that was just tested
    const t = state.lastTest;
    if (t && now - state.testAt < 2.5) {
      const bx = t.x, by = t.y - 44;
      ctx.fillStyle = t.magnetic ? '#22c55e' : '#ef4444';
      ctx.beginPath(); ctx.arc(bx, by, 16, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 4; ctx.lineCap = 'round';
      ctx.beginPath();
      if (t.magnetic) { ctx.moveTo(bx - 7, by); ctx.lineTo(bx - 2, by + 6); ctx.lineTo(bx + 8, by - 6); }
      else { ctx.moveTo(bx - 6, by - 6); ctx.lineTo(bx + 6, by + 6); ctx.moveTo(bx + 6, by - 6); ctx.lineTo(bx - 6, by + 6); }
      ctx.stroke();
      ctx.lineCap = 'butt';
    }
    ctx.textAlign = 'left';
  }

  let grabDX = 0, grabDY = 0;
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) {
      for (const m of [...mags].reverse()) {
        if (Math.abs(x - m.x) < magLen() / 2 + 8 && Math.abs(y - m.y) < magH() / 2 + 12) return m.id;
      }
      return null;
    },
    onStart(id, x, y) { const m = mags.find((k) => k.id === id); grabDX = m.x - x; grabDY = m.y - y; },
    onDrag(id, x, y) {
      const m = mags.find((k) => k.id === id);
      m.x = clamp(x + grabDX, magLen() / 2, cv.width - magLen() / 2);
      m.y = clamp(y + grabDY, magH() / 2, cv.height - magH() / 2);
    },
    handles: () => mags.map((m) => ({ id: m.id, x: m.x, y: m.y, label: `Magnet ${m.id} (drag to move)` })),
    cursor: 'grab',
    hoverCursor: 'grab',
  });

  // Controls
  const flipA = bigBtn('Flip magnet A', () => { mags[0].flip = !mags[0].flip; });
  const flipB = bigBtn('Flip magnet B', () => { mags[1].flip = !mags[1].flip; });
  const resetB = bigBtn('Put things back', () => init());
  const fieldT = toggle({ label: 'Show iron filings', key: 'field', value: false, onChange: (v) => { state.field = v; } });
  ctrlPanel.append(row(flipA, flipB), row(resetB, fieldT));

  const lab = labPanel({
    title: 'Does it stick?',
    filename: 'magnets-lab.csv',
    columns: [
      { key: 'object', label: 'Object' },
      { key: 'material', label: 'Material' },
      { key: 'sticks', label: 'Sticks to magnet?' },
    ],
    procedure: [
      'Guess first: which things on the tray will stick to the magnet?',
      'Drag a magnet onto the nail. Does it stick? Press Record.',
      'Do the same for every other object in the tray.',
      'Look at the Material column. What do all the sticky things have in common?',
    ],
    predict: 'Which objects will stick to the magnet? Write your list.',
    source: () => {
      const t = state.lastTest;
      return t ? { object: t.name, material: t.material, sticks: t.magnetic ? 'yes' : 'no' } : null;
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { now = t; if (state.inited) step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
