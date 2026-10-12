import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';

const CYCLES = {
  butterfly: { name: 'Butterfly', stages: ['Egg', 'Caterpillar', 'Chrysalis', 'Butterfly'], days: ['4', '14', '10', '14'] },
  frog:      { name: 'Frog', stages: ['Egg', 'Tadpole', 'Froglet', 'Frog'], days: ['7', '60', '21', 'years'] },
  bean:      { name: 'Bean plant', stages: ['Seed', 'Sprout', 'Young plant', 'Flowering plant'], days: ['7', '14', '30', '40'] },
};
const SLOT_ANGLES = [-Math.PI / 2, 0, Math.PI / 2, Math.PI]; // top, right, bottom, left (clockwise)
const WATCH_SECONDS = 2.5;

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  let cycleId = 'butterfly';
  let mode = 'sort'; // or 'watch'
  let cards = [];    // { stage, slot, tray, x, y }
  let solved = false, wrongLinks = [], spin = 0, watchT = 0, focusStage = null;
  let drag = null;
  let L = null;

  function shuffle() {
    const order = [0, 1, 2, 3];
    do {
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
    } while (order.every((s, i) => s === i));
    cards = order.map((stage, tray) => ({ stage, slot: null, tray, x: NaN, y: NaN }));
    solved = false; wrongLinks = []; spin = 0; focusStage = null; drag = null;
  }
  shuffle();

  function layout() {
    const W = cv.width, H = cv.height;
    const S = Math.max(40, Math.min(W * 0.13, H * 0.24));
    return { W, H, S, cx: W * 0.33, cy: H * 0.52, R: Math.min(W * 0.2, H * 0.36), trayX: W * 0.66, trayY: H * 0.26 };
  }
  function slotPos(k) { return { x: L.cx + Math.cos(SLOT_ANGLES[k]) * L.R, y: L.cy + Math.sin(SLOT_ANGLES[k]) * L.R }; }
  function trayPos(k) { return { x: L.trayX + L.S / 2 + (k % 2) * (L.S + 12), y: L.trayY + L.S / 2 + Math.floor(k / 2) * (L.S + 34) }; }
  function targetOf(c) {
    if (mode === 'watch') return slotPos(c.stage);
    return c.slot != null ? slotPos(c.slot) : trayPos(c.tray);
  }

  function check() {
    solved = false; wrongLinks = [];
    const bySlot = [0, 1, 2, 3].map((k) => cards.find((c) => c.slot === k));
    if (bySlot.some((c) => !c)) return;
    for (let k = 0; k < 4; k++) {
      if ((bySlot[(k + 1) % 4].stage - bySlot[k].stage + 4) % 4 !== 1) wrongLinks.push(k);
    }
    solved = wrongLinks.length === 0;
  }

  function draw(dt) {
    const ctx = cv.ctx;
    L = layout();
    const { W, H, S, cx, cy, R } = L;
    if (W < 20 || H < 20) return;
    const cyc = CYCLES[cycleId];
    if (solved || mode === 'watch') spin += dt;
    if (mode === 'watch') watchT += dt;
    const current = mode === 'watch' ? Math.floor(watchT / WATCH_SECONDS) % 4 : -1;
    if (current >= 0) focusStage = current;

    ctx.fillStyle = '#ecfeff';
    ctx.fillRect(0, 0, W, H);

    // Ring with arrows
    for (let k = 0; k < 4; k++) {
      const a0 = SLOT_ANGLES[k] + 0.42, a1 = SLOT_ANGLES[k] + Math.PI / 2 - 0.42;
      const wrong = wrongLinks.includes(k);
      const hot = (solved && Math.floor(spin / 0.6) % 4 === k) || (mode === 'watch' && current === k);
      ctx.strokeStyle = wrong ? '#ef4444' : hot ? '#f59e0b' : '#67e8f9';
      ctx.lineWidth = hot ? 10 : 6;
      ctx.lineCap = 'round';
      ctx.beginPath(); ctx.arc(cx, cy, R, a0, a1); ctx.stroke();
      const hx = cx + Math.cos(a1) * R, hy = cy + Math.sin(a1) * R;
      ctx.fillStyle = ctx.strokeStyle;
      ctx.beginPath();
      ctx.moveTo(hx + Math.cos(a1 + Math.PI / 2) * 14, hy + Math.sin(a1 + Math.PI / 2) * 14);
      ctx.lineTo(hx + Math.cos(a1 + Math.PI) * 12, hy + Math.sin(a1 + Math.PI) * 12);
      ctx.lineTo(hx + Math.cos(a1) * 12, hy + Math.sin(a1) * 12);
      ctx.fill();
    }
    // Empty slot outlines
    for (let k = 0; k < 4; k++) {
      if (cards.some((c) => c.slot === k) || mode === 'watch') continue;
      const p = slotPos(k);
      ctx.strokeStyle = '#94a3b8'; ctx.setLineDash([8, 6]); ctx.lineWidth = 3;
      roundRect(ctx, p.x - S / 2, p.y - S / 2, S, S, 14); ctx.stroke();
      ctx.setLineDash([]);
    }

    // Centre: a travelling dot when solved, the big current stage when watching
    if (mode === 'watch') {
      drawStage(ctx, cycleId, current, cx, cy - 14, S * 1.1);
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 22px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(cyc.stages[current], cx, cy + S * 0.75);
    } else if (solved) {
      const a = -Math.PI / 2 + spin * 1.2;
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath(); ctx.arc(cx + Math.cos(a) * R, cy + Math.sin(a) * R, 11, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#16a34a';
      ctx.font = 'bold 24px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Yes! Round and round it goes.', cx, cy + 8);
    } else if (wrongLinks.length) {
      ctx.fillStyle = '#dc2626';
      ctx.font = 'bold 20px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Not yet. Swap the red ones.', cx, cy + 8);
    } else {
      ctx.fillStyle = '#475569';
      ctx.font = 'bold 18px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Drag the cards into the ring', cx, cy + 8);
    }

    // Title
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 24px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`${cyc.name} life cycle`, L.trayX, H * 0.15);

    // Cards (dragged one on top), easing toward their target spots
    const k = Math.min(1, dt * 12);
    for (const c of cards) {
      const t = targetOf(c);
      if (!(drag && drag.card === c)) {
        if (!Number.isFinite(c.x)) { c.x = t.x; c.y = t.y; }
        c.x += (t.x - c.x) * k; c.y += (t.y - c.y) * k;
      }
    }
    const ordered = cards.slice().sort((a, b) => (drag && drag.card === a) - (drag && drag.card === b));
    for (const c of ordered) {
      const bounce = solved && c.slot != null && Math.floor(spin / 0.6) % 4 === c.slot ? -8 : 0;
      const hot = (mode === 'watch' && current === c.stage) || bounce !== 0;
      roundRect(ctx, c.x - S / 2, c.y - S / 2 + bounce, S, S, 14);
      ctx.fillStyle = '#fff'; ctx.fill();
      ctx.strokeStyle = hot ? '#f59e0b' : drag && drag.card === c ? '#0ea5e9' : '#cbd5e1';
      ctx.lineWidth = hot ? 5 : 3; ctx.stroke();
      drawStage(ctx, cycleId, c.stage, c.x, c.y - S * 0.08 + bounce, S * 0.62);
      ctx.fillStyle = '#334155';
      ctx.font = `bold ${Math.max(11, S * 0.11)}px system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(cyc.stages[c.stage], c.x, c.y + S * 0.42 + bounce);
    }
    ctx.textAlign = 'left';
  }

  // ---- Dragging (tap or arrow key also moves a card to the next free spot) --
  const dragger = dragHandle(cv.canvas, {
    hitTest(x, y) {
      if (!L || mode === 'watch') return null;
      for (let i = cards.length - 1; i >= 0; i--) {
        const c = cards[i];
        if (Math.abs(x - c.x) <= L.S / 2 && Math.abs(y - c.y) <= L.S / 2) return i;
      }
      return null;
    },
    onStart(id, x, y) {
      const c = cards[id];
      drag = { card: c, dx: x - c.x, dy: y - c.y, moved: 0 };
      focusStage = c.stage;
    },
    onDrag(id, x, y) {
      if (!drag) return;
      const nx = x - drag.dx, ny = y - drag.dy;
      drag.moved += Math.hypot(nx - drag.card.x, ny - drag.card.y);
      drag.card.x = nx; drag.card.y = ny;
    },
    onEnd() {
      if (!drag) return;
      const c = drag.card;
      if (drag.moved < 12) {
        if (c.slot != null) c.slot = null;
        else { const free = [0, 1, 2, 3].find((k) => !cards.some((o) => o.slot === k)); if (free != null) c.slot = free; }
      } else {
        let best = null, bestD = L.S * 0.75;
        for (let k = 0; k < 4; k++) {
          const p = slotPos(k), d = Math.hypot(c.x - p.x, c.y - p.y);
          if (d < bestD) { best = k; bestD = d; }
        }
        if (best != null) {
          const other = cards.find((o) => o.slot === best);
          if (other) other.slot = c.slot;
          c.slot = best;
        } else if (c.x > L.trayX - L.S) c.slot = null;
      }
      drag = null;
      check();
    },
    handles: () => (mode === 'watch' || !L ? [] : cards.map((c, i) => ({
      id: i, x: c.x, y: c.y,
      label: `${CYCLES[cycleId].stages[c.stage]} card, ${c.slot != null ? 'in ring spot ' + (c.slot + 1) : 'in the tray'}`,
    }))),
    cursor: 'default',
    hoverCursor: 'grab',
  });

  // ---- Controls -------------------------------------------------------
  const big = (b) => { b.el.style.minHeight = '46px'; return b; };
  const pick = {};
  const pickRow = row(...Object.keys(CYCLES).map((id) => {
    pick[id] = big(button({ label: CYCLES[id].name, primary: id === cycleId, onClick: () => {
      cycleId = id; watchT = 0; shuffle();
      for (const k of Object.keys(pick)) pick[k].el.classList.toggle('btn--primary', k === id);
    } }));
    return pick[id];
  }));
  const shuffleBtn = big(button({ label: 'Mix the cards', onClick: () => { mode = 'sort'; watchBtn.label = 'Watch the cycle'; shuffle(); } }));
  const watchBtn = big(button({ label: 'Watch the cycle', onClick: () => {
    mode = mode === 'watch' ? 'sort' : 'watch';
    watchT = 0;
    watchBtn.label = mode === 'watch' ? 'Back to sorting' : 'Watch the cycle';
    if (mode === 'sort') { focusStage = null; check(); }
  } }));
  ctrlPanel.append(pickRow, row(shuffleBtn, watchBtn));

  const lab = labPanel({
    title: 'Stage notes',
    filename: 'life-cycles-lab.csv',
    columns: [
      { key: 'cycle',  label: 'Cycle' },
      { key: 'stage',  label: 'Stage' },
      { key: 'days',   label: 'Days (about)' },
    ],
    procedure: [
      'Press Watch the cycle and wait for a stage you like.',
      'Click Record while that stage is showing.',
      'Record all four stages, then try another living thing.',
    ],
    source: () => {
      if (focusStage == null) return null;
      const cyc = CYCLES[cycleId];
      return { cycle: cyc.name, stage: cyc.stages[focusStage], days: cyc.days[focusStage] };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => draw(dt));
  animator.start();
  return () => { animator.stop(); dragger.destroy(); cv.destroy(); };
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function blob(ctx, x, y, rx, ry, color, rot = 0) {
  ctx.fillStyle = color;
  ctx.beginPath(); ctx.ellipse(x, y, rx, ry, rot, 0, Math.PI * 2); ctx.fill();
}

// Simple pictures for every stage, drawn inside a box of size s centred on (x, y).
function drawStage(ctx, cycleId, idx, x, y, s) {
  const u = s / 100;
  if (cycleId === 'butterfly') {
    if (idx === 0) {
      blob(ctx, x, y + 10 * u, 42 * u, 22 * u, '#4ade80', -0.3);
      for (const [dx, dy] of [[-12, -8], [4, -14], [16, -2], [-2, 2]]) blob(ctx, x + dx * u, y + dy * u, 8 * u, 10 * u, '#fef9c3');
    } else if (idx === 1) {
      for (let i = 0; i < 6; i++) blob(ctx, x - 30 * u + i * 12 * u, y + Math.sin(i) * 6 * u, 9 * u, 9 * u, i % 2 ? '#65a30d' : '#84cc16');
      blob(ctx, x - 36 * u, y - 2 * u, 10 * u, 10 * u, '#a16207');
      blob(ctx, x - 39 * u, y - 5 * u, 2 * u, 2 * u, '#000');
    } else if (idx === 2) {
      ctx.strokeStyle = '#78350f'; ctx.lineWidth = 4 * u;
      ctx.beginPath(); ctx.moveTo(x - 40 * u, y - 40 * u); ctx.lineTo(x + 30 * u, y - 36 * u); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x, y - 36 * u); ctx.lineTo(x, y - 24 * u); ctx.stroke();
      blob(ctx, x, y + 6 * u, 16 * u, 30 * u, '#b45309');
      blob(ctx, x - 4 * u, y - 4 * u, 5 * u, 14 * u, '#fbbf24');
    } else {
      for (const sgn of [-1, 1]) {
        blob(ctx, x + sgn * 22 * u, y - 12 * u, 22 * u, 18 * u, '#f97316', sgn * 0.5);
        blob(ctx, x + sgn * 16 * u, y + 16 * u, 15 * u, 13 * u, '#fb923c', sgn * -0.4);
        blob(ctx, x + sgn * 24 * u, y - 14 * u, 6 * u, 6 * u, '#fff');
      }
      blob(ctx, x, y, 5 * u, 28 * u, '#1f2937');
    }
  } else if (cycleId === 'frog') {
    if (idx === 0) {
      for (const [dx, dy] of [[-18, -10], [0, -18], [18, -8], [-10, 10], [10, 12]]) {
        blob(ctx, x + dx * u, y + dy * u, 13 * u, 13 * u, 'rgba(165,243,252,0.9)');
        blob(ctx, x + dx * u, y + dy * u, 5 * u, 5 * u, '#111827');
      }
    } else if (idx === 1) {
      ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 5 * u;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 30 * u, y - 20 * u, x + 44 * u, y + 10 * u); ctx.stroke();
      blob(ctx, x - 10 * u, y, 22 * u, 16 * u, '#1f2937');
      blob(ctx, x - 20 * u, y - 5 * u, 3 * u, 3 * u, '#fff');
    } else if (idx === 2) {
      ctx.strokeStyle = '#166534'; ctx.lineWidth = 4 * u;
      ctx.beginPath(); ctx.moveTo(x + 10 * u, y); ctx.lineTo(x + 40 * u, y + 8 * u); ctx.stroke();
      blob(ctx, x, y, 24 * u, 16 * u, '#4ade80');
      for (const sgn of [-1, 1]) blob(ctx, x + sgn * 8 * u, y + 14 * u, 10 * u, 5 * u, '#22c55e', sgn * 0.6);
      blob(ctx, x - 14 * u, y - 8 * u, 4 * u, 4 * u, '#111827');
    } else {
      for (const sgn of [-1, 1]) blob(ctx, x + sgn * 30 * u, y + 14 * u, 16 * u, 8 * u, '#16a34a', sgn * 0.5);
      blob(ctx, x, y + 4 * u, 34 * u, 24 * u, '#22c55e');
      blob(ctx, x, y + 10 * u, 22 * u, 12 * u, '#bbf7d0');
      for (const sgn of [-1, 1]) {
        blob(ctx, x + sgn * 16 * u, y - 18 * u, 9 * u, 9 * u, '#22c55e');
        blob(ctx, x + sgn * 16 * u, y - 18 * u, 4 * u, 4 * u, '#111827');
      }
    }
  } else {
    if (idx === 0) {
      blob(ctx, x, y, 30 * u, 18 * u, '#b45309', -0.4);
      blob(ctx, x - 4 * u, y + 4 * u, 6 * u, 3 * u, '#fde68a', -0.4);
    } else if (idx === 1) {
      blob(ctx, x, y + 22 * u, 22 * u, 12 * u, '#b45309');
      ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 5 * u;
      ctx.beginPath(); ctx.moveTo(x, y + 14 * u); ctx.lineTo(x, y - 18 * u); ctx.stroke();
      for (const sgn of [-1, 1]) blob(ctx, x + sgn * 12 * u, y - 24 * u, 13 * u, 8 * u, '#4ade80', sgn * -0.6);
    } else if (idx === 2) {
      ctx.fillStyle = '#92400e'; ctx.fillRect(x - 28 * u, y + 30 * u, 56 * u, 10 * u);
      ctx.strokeStyle = '#15803d'; ctx.lineWidth = 5 * u;
      ctx.beginPath(); ctx.moveTo(x, y + 30 * u); ctx.lineTo(x, y - 34 * u); ctx.stroke();
      for (let i = 0; i < 3; i++) blob(ctx, x + (i % 2 ? 14 : -14) * u, y + (10 - i * 20) * u, 15 * u, 8 * u, '#22c55e', i % 2 ? -0.5 : 0.5);
    } else {
      ctx.fillStyle = '#92400e'; ctx.fillRect(x - 28 * u, y + 34 * u, 56 * u, 10 * u);
      ctx.strokeStyle = '#15803d'; ctx.lineWidth = 5 * u;
      ctx.beginPath(); ctx.moveTo(x, y + 34 * u); ctx.lineTo(x, y - 40 * u); ctx.stroke();
      for (let i = 0; i < 4; i++) blob(ctx, x + (i % 2 ? 16 : -16) * u, y + (18 - i * 16) * u, 15 * u, 8 * u, '#22c55e', i % 2 ? -0.5 : 0.5);
      for (const [dx, dy] of [[-20, -30], [18, -40], [0, -46]]) {
        for (let k = 0; k < 5; k++) blob(ctx, x + (dx + Math.cos(k * 1.26) * 6) * u, y + (dy + Math.sin(k * 1.26) * 6) * u, 4 * u, 4 * u, '#f9a8d4');
        blob(ctx, x + dx * u, y + dy * u, 3 * u, 3 * u, '#fde047');
      }
      blob(ctx, x + 22 * u, y + 4 * u, 5 * u, 16 * u, '#65a30d', -0.3);
    }
  }
}
