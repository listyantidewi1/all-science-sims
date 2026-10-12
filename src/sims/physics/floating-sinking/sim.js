import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';

// Design units: 800 x 450, scaled to the canvas every frame.
const ITEMS = [
  { name: 'Wooden block', floats: true, kind: 'block' },
  { name: 'Stone', floats: false, kind: 'stone' },
  { name: 'Apple', floats: true, kind: 'apple' },
  { name: 'Coin', floats: false, kind: 'coin' },
  { name: 'Bottle with cap', floats: true, kind: 'bottleCap' },
  { name: 'Bottle, no cap', floats: false, kind: 'bottleOpen' },
  { name: 'Clay lump', floats: false, kind: 'clay' },
  { name: 'Clay boat', floats: true, kind: 'boat' },
  { name: 'Ping-pong ball', floats: true, kind: 'ball' },
  { name: 'Metal spoon', floats: false, kind: 'spoon' },
];
const TANK = { x: 300, y: 60, w: 480, h: 360 };
const WATER_Y = 120;
const HIT_R = 32;

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const items = ITEMS.map((it, i) => ({
    ...it,
    home: { x: 80 + (i % 2) * 120, y: 60 + Math.floor(i / 2) * 70 },
    x: 0, y: 0, inWater: false, settled: false, guess: null, result: null, scored: false,
  }));
  items.forEach((it) => { it.x = it.home.x; it.y = it.home.y; });

  const state = { selected: null, tested: 0, correct: 0, message: 'Tap an object. Guess, then drag it into the water.', last: null, t: 0 };
  const S = () => cv.width / 800;

  function sendHome(it) {
    it.x = it.home.x; it.y = it.home.y; it.inWater = false; it.settled = false; it.result = null;
  }

  function update(dt) {
    state.t += dt;
    for (const it of items) {
      if (!it.inWater || it.settled) continue;
      if (it.y < WATER_Y) { it.y += 420 * dt; continue; }
      const target = it.floats ? WATER_Y + 4 : TANK.y + TANK.h - 30;
      const speed = it.floats ? 90 : (it.kind === 'bottleOpen' ? 55 : 170);
      const dir = Math.sign(target - it.y);
      it.y += dir * speed * dt;
      if ((dir > 0 && it.y >= target) || (dir < 0 && it.y <= target) || dir === 0) {
        it.y = target; it.settled = true;
        it.result = it.floats ? 'Floats' : 'Sinks';
        const right = it.guess === it.floats;
        if (!it.scored) { state.tested++; if (right) state.correct++; it.scored = true; }
        state.message = `${it.name} ${it.floats ? 'floats!' : 'sinks!'} ${right ? 'You were right.' : 'Not this time.'}`;
        state.last = it;
      }
    }
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    const s = S();
    ctx.clearRect(0, 0, W, H);
    ctx.save();
    ctx.scale(s, s);
    // Room
    ctx.fillStyle = '#fef3c7'; ctx.fillRect(0, 0, 800, 450);
    ctx.fillStyle = '#d6a86b'; ctx.fillRect(0, 410, 800, 40);
    // Shelf boards
    ctx.fillStyle = '#b07f45';
    for (let r = 0; r < 5; r++) ctx.fillRect(20, 60 + r * 70 + 28, 240, 8);
    // Tank
    ctx.fillStyle = 'rgba(224,242,254,0.6)'; ctx.fillRect(TANK.x, TANK.y, TANK.w, TANK.h);
    // Items under water
    for (const it of items) if (it.inWater && it.y > WATER_Y) drawItem(ctx, it);
    // Water
    ctx.fillStyle = 'rgba(56,189,248,0.45)';
    ctx.beginPath();
    ctx.moveTo(TANK.x, TANK.y + TANK.h);
    ctx.lineTo(TANK.x, WATER_Y);
    for (let x = TANK.x; x <= TANK.x + TANK.w; x += 10) ctx.lineTo(x, WATER_Y + Math.sin(x / 30 + state.t * 2) * 3);
    ctx.lineTo(TANK.x + TANK.w, TANK.y + TANK.h);
    ctx.closePath(); ctx.fill();
    ctx.lineWidth = 6; ctx.strokeStyle = '#64748b';
    ctx.beginPath(); ctx.moveTo(TANK.x, TANK.y); ctx.lineTo(TANK.x, TANK.y + TANK.h); ctx.lineTo(TANK.x + TANK.w, TANK.y + TANK.h); ctx.lineTo(TANK.x + TANK.w, TANK.y); ctx.stroke();
    // Items above water or on the shelf
    for (const it of items) if (!(it.inWater && it.y > WATER_Y)) drawItem(ctx, it);
    // Selection ring + guess tag
    const sel = state.selected != null ? items[state.selected] : null;
    if (sel) {
      ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 4; ctx.setLineDash([6, 4]);
      ctx.beginPath(); ctx.arc(sel.x, sel.y, 34, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
      if (sel.guess != null) tag(ctx, sel.x, sel.y - 42, sel.guess ? 'Float?' : 'Sink?', sel.guess ? '#0ea5e9' : '#64748b');
    }
    for (const it of items) if (it.settled) tag(ctx, it.x, it.y - 40, it.result, it.floats ? '#0ea5e9' : '#64748b');
    // Texts
    ctx.fillStyle = '#1e293b'; ctx.textAlign = 'left';
    ctx.font = 'bold 18px system-ui, sans-serif';
    ctx.fillText(sel ? sel.name : 'Shelf', 20, 36);
    ctx.textAlign = 'right';
    ctx.font = 'bold 22px system-ui, sans-serif';
    ctx.fillText(`Right: ${state.correct} / ${state.tested}`, 780, 40);
    ctx.textAlign = 'center';
    ctx.font = 'bold 17px system-ui, sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.fillText(state.message, 540, 100);
    ctx.font = '600 15px system-ui, sans-serif';
    ctx.fillStyle = '#7c2d12';
    ctx.fillText('Light for its size floats. Heavy for its size sinks.', 540, 440);
    ctx.restore();
  }

  function tag(ctx, x, y, text, color) {
    ctx.font = 'bold 14px system-ui, sans-serif';
    const w = ctx.measureText(text).width + 16;
    ctx.fillStyle = color; rr(ctx, x - w / 2, y - 11, w, 22, 8); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.fillText(text, x, y + 5);
  }

  function drawItem(ctx, it) {
    ctx.save();
    const bob = it.settled && it.floats ? Math.sin(state.t * 2 + it.x) * 2 : 0;
    ctx.translate(it.x, it.y + bob);
    ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(0,0,0,0.35)';
    switch (it.kind) {
      case 'block':
        ctx.fillStyle = '#c68642'; ctx.fillRect(-24, -22, 48, 44); ctx.strokeRect(-24, -22, 48, 44);
        ctx.strokeStyle = '#8b5a2b'; for (let i = -14; i <= 14; i += 7) { ctx.beginPath(); ctx.moveTo(-22, i); ctx.lineTo(22, i + 3); ctx.stroke(); }
        break;
      case 'stone':
        ctx.fillStyle = '#6b7280'; ctx.beginPath();
        ctx.moveTo(-24, 6); ctx.lineTo(-16, -16); ctx.lineTo(4, -22); ctx.lineTo(24, -8); ctx.lineTo(20, 14); ctx.lineTo(-4, 22); ctx.closePath(); ctx.fill(); ctx.stroke();
        break;
      case 'apple':
        ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(0, 4, 22, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = '#78350f'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, -16); ctx.lineTo(2, -28); ctx.stroke();
        ctx.fillStyle = '#22c55e'; ctx.beginPath(); ctx.ellipse(10, -24, 9, 5, 0.5, 0, Math.PI * 2); ctx.fill();
        break;
      case 'coin':
        ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(0, 0, 21, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = '#b45309'; ctx.beginPath(); ctx.arc(0, 0, 15, 0, Math.PI * 2); ctx.stroke();
        break;
      case 'bottleCap':
      case 'bottleOpen':
        ctx.fillStyle = 'rgba(165,243,252,0.85)'; rr(ctx, -13, -10, 26, 38, 6); ctx.fill(); ctx.stroke();
        ctx.fillRect(-6, -22, 12, 13); ctx.strokeRect(-6, -22, 12, 13);
        if (it.kind === 'bottleCap') { ctx.fillStyle = '#2563eb'; ctx.fillRect(-9, -29, 18, 8); }
        else if (it.inWater && it.y > WATER_Y) { ctx.fillStyle = 'rgba(56,189,248,0.7)'; ctx.fillRect(-11, 2, 22, 24); }
        break;
      case 'clay':
        ctx.fillStyle = '#b5651d';
        for (const [cx, cy, r] of [[-8, 4, 16], [10, -4, 15], [2, 10, 13]]) { ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill(); }
        break;
      case 'boat':
        ctx.fillStyle = '#b5651d'; ctx.beginPath(); ctx.moveTo(-28, -6); ctx.lineTo(28, -6); ctx.lineTo(18, 14); ctx.lineTo(-18, 14); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#92400e'; ctx.fillRect(-20, -6, 40, 4);
        break;
      case 'ball':
        ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, 0, 20, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = '#cbd5e1'; ctx.beginPath(); ctx.ellipse(0, 0, 8, 20, 0, 0, Math.PI * 2); ctx.stroke();
        break;
      case 'spoon':
        ctx.fillStyle = '#9ca3af'; ctx.beginPath(); ctx.ellipse(-14, 0, 12, 9, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        rr(ctx, -4, -3, 32, 6, 3); ctx.fill(); ctx.stroke();
        break;
    }
    ctx.restore();
  }

  function rr(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
  }

  let viaPointer = false;
  const markPointer = () => { viaPointer = true; };
  cv.canvas.addEventListener('pointerdown', markPointer);
  const drag = dragHandle(cv.canvas, {
    hitTest(sx, sy) {
      const s = S(), x = sx / s, y = sy / s;
      for (let i = items.length - 1; i >= 0; i--) if (Math.hypot(items[i].x - x, items[i].y - y) < HIT_R) return i;
      return null;
    },
    onStart(i) {
      state.selected = i;
      const it = items[i];
      if (it.settled) { if (it.result) state.message = `${it.name}: ${it.result.toLowerCase()}. Drag it back to try another.`; }
      it.inWater = false; it.settled = false; it.result = null;
    },
    onDrag(i, sx, sy) {
      const s = S();
      items[i].x = Math.max(20, Math.min(780, sx / s));
      items[i].y = Math.max(20, Math.min(430, sy / s));
    },
    onEnd(i) {
      const it = items[i];
      const byPointer = viaPointer; viaPointer = false;
      const inTank = it.x > TANK.x + 20 && it.x < TANK.x + TANK.w - 20 && it.y > TANK.y;
      // A pointer drop outside the tank snaps home; keyboard nudges may stop anywhere.
      if (!inTank) { if (byPointer) sendHome(it); return; }
      if (it.guess == null) { sendHome(it); state.message = 'First tap Float or Sink. Then drag it in.'; return; }
      it.inWater = true; it.settled = false;
      state.message = 'Watch...';
    },
    handles: () => items.map((it, i) => ({ id: i, x: it.x * S(), y: it.y * S(), label: `${it.name} (drag into the water)` })),
    keyStep: 10,
    cursor: 'grab',
    hoverCursor: 'grab',
  });

  function setGuess(v) {
    if (state.selected == null) { state.message = 'Tap an object first.'; return; }
    const it = items[state.selected];
    it.guess = v; it.scored = false;
    state.message = `You guess: ${it.name} will ${v ? 'float' : 'sink'}. Now drag it into the water!`;
  }
  const big = (b) => { b.el.style.minHeight = '48px'; b.el.style.fontSize = '1.05rem'; b.el.style.padding = '10px 22px'; return b; };
  const floatBtn = big(button({ label: 'Float', primary: true, onClick: () => setGuess(true) }));
  const sinkBtn = big(button({ label: 'Sink', onClick: () => setGuess(false) }));
  const resetBtn = big(button({ label: 'Reset', onClick: () => {
    items.forEach((it) => { sendHome(it); it.guess = null; it.scored = false; });
    state.selected = null; state.tested = 0; state.correct = 0; state.last = null;
    state.message = 'Tap an object. Guess, then drag it into the water.';
  } }));
  ctrlPanel.appendChild(row(floatBtn, sinkBtn, resetBtn));

  const lab = labPanel({
    title: 'Float or sink? My guesses',
    filename: 'floating-sinking-lab.csv',
    columns: [
      { key: 'object', label: 'Object' },
      { key: 'guess', label: 'My guess' },
      { key: 'result', label: 'What happened' },
    ],
    procedure: [
      'Tap an object on the shelf. Tap Float or Sink to guess.',
      'Drag the object into the water. Watch what it does.',
      'Press Record. Was your guess right?',
      'Try all ten objects. Which ones surprised you?',
    ],
    source: () => {
      const it = state.last;
      if (!it || !it.settled) return null;
      return { object: it.name, guess: it.guess ? 'Float' : 'Sink', result: it.result };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { update(dt); draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.canvas.removeEventListener('pointerdown', markPointer); cv.destroy(); };
}
