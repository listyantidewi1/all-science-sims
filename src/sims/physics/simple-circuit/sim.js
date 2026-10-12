import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';

// Things the child can drop into the tester gap. Copper starts in the gap so
// the loop works from the very first click of the switch.
const MATERIALS = [
  { name: 'Copper',      color: '#f59e0b', conductor: true },
  { name: 'Iron',        color: '#94a3b8', conductor: true },
  { name: 'Pencil lead', color: '#334155', conductor: true },
  { name: 'Plastic',     color: '#3b82f6', conductor: false },
  { name: 'Wood',        color: '#b45309', conductor: false },
  { name: 'Rubber',      color: '#ef4444', conductor: false },
];

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const state = { switchClosed: false, bulbs: 1, batteries: 1, gapMat: 0, phase: 0 };
  let drag = null; // { idx, dx, dy, x, y, moved }
  let L = null;    // layout, recomputed each frame

  function layout() {
    const W = cv.width, H = cv.height;
    const lx0 = W * 0.10, lx1 = W * 0.58, ly0 = H * 0.24, ly1 = H * 0.78;
    return {
      W, H, lx0, lx1, ly0, ly1,
      board: { x: W * 0.04, y: H * 0.10, w: W * 0.60, h: H * 0.80 },
      gap: { x: lx1 - W * 0.14, y: ly1 },
      sw: { x: lx1, y0: (ly0 + ly1) / 2 - 35, y1: (ly0 + ly1) / 2 + 35 },
      chipW: Math.min(W * 0.24, 150), chipH: Math.min(H * 0.105, 48),
      trayX: W * 0.82, trayY0: H * 0.16, trayDy: H * 0.125,
    };
  }

  function isLit() {
    return state.switchClosed && state.gapMat != null && MATERIALS[state.gapMat].conductor;
  }
  function brightness() { return isLit() ? state.batteries / state.bulbs : 0; }

  function chipPos(i) {
    if (drag && drag.idx === i) return { x: drag.x, y: drag.y };
    if (state.gapMat === i) return { x: L.gap.x, y: L.gap.y };
    return { x: L.trayX, y: L.trayY0 + i * L.trayDy };
  }

  function draw(dt) {
    const ctx = cv.ctx;
    L = layout();
    const { W, H, lx0, lx1, ly0, ly1 } = L;
    if (W < 20 || H < 20) return;
    const bright = brightness();
    state.phase = (state.phase + dt * 0.12 * Math.min(bright, 2)) % 1;

    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(0, 0, W, H);

    // Board
    roundRect(ctx, L.board.x, L.board.y, L.board.w, L.board.h, 18);
    ctx.fillStyle = '#7c4a1e';
    ctx.fill();
    ctx.strokeStyle = '#5b3414';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Wire loop
    ctx.strokeStyle = '#111827';
    ctx.lineWidth = 7;
    ctx.lineJoin = 'round';
    ctx.strokeRect(lx0, ly0, lx1 - lx0, ly1 - ly0);

    // Moving dots show the electricity going round when the loop is complete
    if (bright > 0) {
      const path = [[lx0, ly0], [lx1, ly0], [lx1, ly1], [lx0, ly1], [lx0, ly0]];
      ctx.fillStyle = '#fde047';
      for (let i = 0; i < 28; i++) {
        const p = pointOnPath(path, (state.phase + i / 28) % 1);
        ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2); ctx.fill();
      }
    }

    // Batteries along the bottom wire (left side)
    const cellW = W * 0.055;
    for (let i = 0; i < state.batteries; i++) {
      const bx = lx0 + W * 0.02 + i * (cellW + 6);
      ctx.fillStyle = '#16a34a';
      ctx.fillRect(bx, ly1 - 15, cellW, 30);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(bx + cellW - 10, ly1 - 15, 10, 30);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 18px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('+', bx + cellW - 5, ly1 + 7);
      ctx.fillText('-', bx + 10, ly1 + 6);
    }

    // Bulbs along the top wire
    const bulbGap = Math.min(110, (lx1 - lx0 - 80) / state.bulbs);
    const firstX = (lx0 + lx1) / 2 - (state.bulbs - 1) * bulbGap / 2;
    for (let i = 0; i < state.bulbs; i++) drawBulb(ctx, firstX + i * bulbGap, ly0, bright);

    // Switch on the right wire
    const sw = L.sw;
    ctx.fillStyle = '#7c4a1e';
    ctx.fillRect(sw.x - 8, sw.y0, 16, sw.y1 - sw.y0);
    ctx.fillStyle = '#e5e7eb';
    ctx.beginPath(); ctx.arc(sw.x, sw.y0, 9, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(sw.x, sw.y1, 9, 0, Math.PI * 2); ctx.fill();
    const tip = switchTip();
    ctx.strokeStyle = state.switchClosed ? '#22c55e' : '#f87171';
    ctx.lineWidth = 9;
    ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(sw.x, sw.y0); ctx.lineTo(tip.x, tip.y); ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(state.switchClosed ? 'ON' : 'OFF', sw.x + 24, (sw.y0 + sw.y1) / 2 + 6);

    // Tester gap on the bottom wire
    const g = L.gap;
    ctx.fillStyle = '#7c4a1e';
    ctx.fillRect(g.x - L.chipW / 2 - 4, g.y - 16, L.chipW + 8, 32);
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(g.x - L.chipW / 2 - 10, g.y - 8, 12, 16);
    ctx.fillRect(g.x + L.chipW / 2 - 2, g.y - 8, 12, 16);
    if (state.gapMat == null) {
      ctx.strokeStyle = 'rgba(255,255,255,0.6)';
      ctx.setLineDash([8, 6]);
      ctx.lineWidth = 2;
      roundRect(ctx, g.x - L.chipW / 2, g.y - L.chipH / 2, L.chipW, L.chipH, 10);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Tray
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 16px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Drop one in the gap', L.trayX, H * 0.08);
    for (let i = 0; i < MATERIALS.length; i++) {
      if (drag && drag.idx === i) continue;
      drawChip(ctx, i, chipPos(i));
    }
    if (drag) drawChip(ctx, drag.idx, chipPos(drag.idx));

    // One short message
    let msg = state.switchClosed ? 'The loop is complete. The bulb lights!' : 'Switch is OFF. The loop is broken.';
    if (state.switchClosed && state.gapMat == null) msg = 'The gap breaks the loop. Drop something in.';
    else if (state.switchClosed && !isLit()) msg = `${MATERIALS[state.gapMat].name} blocks it: insulator.`;
    else if (isLit()) msg = `${MATERIALS[state.gapMat].name} lets it through: conductor!`;
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 18px system-ui, sans-serif';
    ctx.fillText(msg, L.board.x + L.board.w / 2, H * 0.965);
  }

  function switchTip() {
    const sw = L.sw;
    return state.switchClosed ? { x: sw.x, y: sw.y1 } : { x: sw.x + 42, y: sw.y0 + 52 };
  }

  function drawBulb(ctx, x, y, bright) {
    const r = 24;
    if (bright > 0) {
      const glowR = r + 30 + 40 * Math.min(bright, 2);
      const grad = ctx.createRadialGradient(x, y - 18, r * 0.5, x, y - 18, glowR);
      grad.addColorStop(0, `rgba(253,224,71,${Math.min(0.95, 0.25 + 0.4 * bright)})`);
      grad.addColorStop(1, 'rgba(253,224,71,0)');
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(x, y - 18, glowR, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = '#9ca3af';
    ctx.fillRect(x - 12, y - 6, 24, 16);
    ctx.fillStyle = bright > 0 ? `rgba(254,240,138,${Math.min(1, 0.4 + 0.4 * bright)})` : 'rgba(226,232,240,0.9)';
    ctx.beginPath(); ctx.arc(x, y - 22, r, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.strokeStyle = bright > 0 ? '#f97316' : '#64748b';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(x - 8, y - 6); ctx.lineTo(x - 8, y - 20); ctx.lineTo(x - 3, y - 28);
    ctx.lineTo(x + 3, y - 20); ctx.lineTo(x + 8, y - 28); ctx.lineTo(x + 8, y - 6);
    ctx.stroke();
  }

  function drawChip(ctx, i, p) {
    const m = MATERIALS[i];
    roundRect(ctx, p.x - L.chipW / 2, p.y - L.chipH / 2, L.chipW, L.chipH, 10);
    ctx.fillStyle = m.color;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 15px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(m.name, p.x, p.y + 5);
  }

  function hitChip(i, x, y) {
    const p = chipPos(i);
    return Math.abs(x - p.x) <= L.chipW / 2 + 6 && Math.abs(y - p.y) <= L.chipH / 2 + 6;
  }

  const dragger = dragHandle(cv.canvas, {
    hitTest(x, y) {
      if (!L) return null;
      const tip = switchTip();
      const mx = (L.sw.x + tip.x) / 2, my = (L.sw.y0 + tip.y) / 2;
      if (Math.abs(x - mx) < 40 && Math.abs(y - my) < 45) return 'switch';
      for (let i = MATERIALS.length - 1; i >= 0; i--) if (hitChip(i, x, y)) return i;
      return null;
    },
    onStart(id, x, y) {
      if (id === 'switch') { state.switchClosed = !state.switchClosed; return; }
      const p = chipPos(id);
      drag = { idx: id, dx: x - p.x, dy: y - p.y, x: p.x, y: p.y, moved: 0 };
    },
    onDrag(id, x, y) {
      if (id === 'switch' || !drag) return;
      const nx = x - drag.dx, ny = y - drag.dy;
      drag.moved += Math.hypot(nx - drag.x, ny - drag.y);
      drag.x = nx; drag.y = ny;
    },
    onEnd(id) {
      if (id === 'switch' || !drag) return;
      const nearGap = Math.hypot(drag.x - L.gap.x, drag.y - L.gap.y) < Math.max(60, L.chipW * 0.6);
      if (drag.moved < 12) state.gapMat = state.gapMat === id ? null : id; // tap or key press
      else if (nearGap) state.gapMat = id;
      else if (state.gapMat === id) state.gapMat = null;
      drag = null;
    },
    handles: () => {
      if (!L) return [];
      const tip = switchTip();
      const list = [{ id: 'switch', x: (L.sw.x + tip.x) / 2, y: (L.sw.y0 + tip.y) / 2, label: `Switch (${state.switchClosed ? 'on' : 'off'})` }];
      MATERIALS.forEach((m, i) => {
        const p = chipPos(i);
        list.push({ id: i, x: p.x, y: p.y, label: `${m.name}${state.gapMat === i ? ' (in the gap)' : ''}` });
      });
      return list;
    },
    cursor: 'pointer',
    hoverCursor: 'grab',
  });

  // Big buttons
  const swBtn = button({ label: 'Flip the switch', primary: true, onClick: () => { state.switchClosed = !state.switchClosed; } });
  const addBulb = button({ label: '+ Add a bulb', onClick: () => { state.bulbs = Math.min(3, state.bulbs + 1); } });
  const remBulb = button({ label: '- Take a bulb', onClick: () => { state.bulbs = Math.max(1, state.bulbs - 1); } });
  const addBat = button({ label: '+ Add a battery', onClick: () => { state.batteries = Math.min(3, state.batteries + 1); } });
  const remBat = button({ label: '- Take a battery', onClick: () => { state.batteries = Math.max(1, state.batteries - 1); } });
  const reset = button({ label: 'Reset', onClick: () => { Object.assign(state, { switchClosed: false, bulbs: 1, batteries: 1, gapMat: 0 }); } });
  ctrlPanel.append(row(swBtn, reset), row(addBulb, remBulb), row(addBat, remBat));

  const lab = labPanel({
    title: 'Conductor or insulator?',
    filename: 'simple-circuit-lab.csv',
    columns: [
      { key: 'material', label: 'Material' },
      { key: 'lights',   label: 'Bulb lights?' },
      { key: 'kind',     label: 'Conductor or insulator' },
    ],
    procedure: [
      'Turn the switch ON with copper in the gap. Does the bulb light?',
      'Drag a new material into the gap. Guess first: will it light?',
      'Click Record. Try all six materials.',
      'Look at your table. What do the conductors have in common?',
    ],
    predict: 'Which things will let electricity through? Which will block it?',
    source: () => {
      if (state.gapMat == null || !state.switchClosed) return null;
      const m = MATERIALS[state.gapMat];
      return { material: m.name, lights: isLit() ? 'yes' : 'no', kind: isLit() ? 'conductor' : 'insulator' };
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

// Point at fraction u (0..1) along a polyline.
function pointOnPath(path, u) {
  let total = 0;
  const segs = [];
  for (let i = 1; i < path.length; i++) {
    const d = Math.hypot(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1]);
    segs.push(d); total += d;
  }
  let s = u * total;
  for (let i = 0; i < segs.length; i++) {
    if (s <= segs[i] || i === segs.length - 1) {
      const k = segs[i] > 0 ? s / segs[i] : 0;
      return { x: path[i][0] + (path[i + 1][0] - path[i][0]) * k, y: path[i][1] + (path[i + 1][1] - path[i][1]) * k };
    }
    s -= segs[i];
  }
  return { x: path[0][0], y: path[0][1] };
}
