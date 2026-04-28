import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { hoverProbe, drawTooltip } from '../../../lib/chart.js';
import { dragHandle } from '../../../lib/handle.js';

// 3-panel Warren truss: 4 bottom nodes + 3 top nodes, 11 members.
//      T0----T1----T2
//     / \   / \   / \
//    /   \ /   \ /   \
//   B0----B1----B2----B3   (B0 = pin, B3 = roller)
//
// Method of joints, solved as a 14×14 linear system per frame.
// Unknowns: 11 member forces + 3 support reactions (Rx0, Ry0, Ry3).
// Convention: F > 0 ⇒ tension.

const NODES = [
  { x: 0, y: 0 }, // 0 B0  pin
  { x: 2, y: 0 }, // 1 B1
  { x: 4, y: 0 }, // 2 B2
  { x: 6, y: 0 }, // 3 B3  roller
  { x: 1, y: 1.5 }, // 4 T0
  { x: 3, y: 1.5 }, // 5 T1
  { x: 5, y: 1.5 }, // 6 T2
];
const MEMBERS = [
  [0, 1], [1, 2], [2, 3],    // 0,1,2 bottom chord
  [4, 5], [5, 6],            // 3,4   top chord
  [0, 4], [4, 1],            // 5,6   left panel diagonals
  [1, 5], [5, 2],            // 7,8   middle panel diagonals
  [2, 6], [6, 3],            // 9,10  right panel diagonals
];
const PIN = 0, ROLLER = 3;

function memberDir(i, j) {
  const dx = NODES[j].x - NODES[i].x;
  const dy = NODES[j].y - NODES[i].y;
  const L = Math.hypot(dx, dy);
  return { ux: dx / L, uy: dy / L, L };
}

// Solve A x = b via Gaussian elimination with partial pivoting.
function solve(A, b) {
  const n = b.length;
  const m = A.map((r, i) => [...r, b[i]]);
  for (let k = 0; k < n; k++) {
    let pivot = k;
    for (let i = k + 1; i < n; i++) if (Math.abs(m[i][k]) > Math.abs(m[pivot][k])) pivot = i;
    if (pivot !== k) [m[k], m[pivot]] = [m[pivot], m[k]];
    if (Math.abs(m[k][k]) < 1e-9) continue;
    for (let i = k + 1; i < n; i++) {
      const f = m[i][k] / m[k][k];
      for (let j = k; j <= n; j++) m[i][j] -= f * m[k][j];
    }
  }
  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let s = m[i][n];
    for (let j = i + 1; j < n; j++) s -= m[i][j] * x[j];
    x[i] = m[i][i] !== 0 ? s / m[i][i] : 0;
  }
  return x;
}

// Build and solve the system; return per-member force, plus reactions.
// loadX in [0, 6] world units, loadP in kN (positive downward).
function analyze(loadX, loadP) {
  const M = MEMBERS.length;        // 11
  const R = 3;                      // Rx0, Ry0, Ry3
  const numU = M + R;               // 14
  const numEq = NODES.length * 2;   // 14
  const A = Array.from({ length: numEq }, () => new Array(numU).fill(0));
  const b = new Array(numEq).fill(0);

  for (let m = 0; m < M; m++) {
    const [i, j] = MEMBERS[m];
    const di = memberDir(i, j);
    const dj = memberDir(j, i);
    A[2 * i    ][m] += di.ux;
    A[2 * i + 1][m] += di.uy;
    A[2 * j    ][m] += dj.ux;
    A[2 * j + 1][m] += dj.uy;
  }
  // Reaction columns
  A[2 * PIN    ][M + 0] = 1; // Rx0
  A[2 * PIN + 1][M + 1] = 1; // Ry0
  A[2 * ROLLER + 1][M + 2] = 1; // Ry3

  // External load: distribute between B1 and B2 (or to B0/B3 at extremes).
  // Bottom nodes are at x = 0, 2, 4, 6.
  let loaded;
  if (loadX <= 0) loaded = [[0, loadP]];
  else if (loadX >= 6) loaded = [[3, loadP]];
  else {
    const lo = Math.floor(loadX / 2);   // 0..2
    const hi = lo + 1;
    const t = (loadX - lo * 2) / 2;
    loaded = [[lo, loadP * (1 - t)], [hi, loadP * t]];
  }
  for (const [n, F] of loaded) {
    // Equilibrium: internal + reaction + external = 0  →  A·x = -external
    // External force is (0, -F) (downward). RHS = -(0, -F) = (0, F).
    b[2 * n + 1] += F;
  }

  const x = solve(A, b);
  const memberForces = x.slice(0, M);
  const reactions = { Rx0: x[M], Ry0: x[M + 1], Ry3: x[M + 2] };
  return { memberForces, reactions };
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    loadX: 3.0,
    loadP: 10,    // kN
  };

  // Layout cache for hover/drag.
  let layout = null; // { x0, y0, scale, w2s(world), s2w(screen) }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    // Fit truss inside the canvas with margin.
    const margin = 60;
    const truss_w = 6, truss_h = 1.5;
    const sx = (W - margin * 2) / truss_w;
    const sy = (H - margin * 2 - 80) / truss_h;
    const scale = Math.min(sx, sy);
    const x0 = (W - truss_w * scale) / 2;
    const y0 = H - margin - 80;
    const w2s = (wx, wy) => ({ x: x0 + wx * scale, y: y0 - wy * scale });
    layout = { x0, y0, scale, w2s, s2w: (sxv) => Math.max(0, Math.min(truss_w, (sxv - x0) / scale)) };

    const result = analyze(params.loadX, params.loadP);
    const maxAbsF = Math.max(...result.memberForces.map(Math.abs), 1);

    // Members — color by tension/compression intensity
    for (let m = 0; m < MEMBERS.length; m++) {
      const [i, j] = MEMBERS[m];
      const a = w2s(NODES[i].x, NODES[i].y);
      const c = w2s(NODES[j].x, NODES[j].y);
      const F = result.memberForces[m];
      const t = Math.min(1, Math.abs(F) / maxAbsF);
      const color = F > 0
        ? `rgba(239, 68, 68, ${0.30 + 0.65 * t})`
        : `rgba(59, 130, 246, ${0.30 + 0.65 * t})`;
      ctx.strokeStyle = color;
      ctx.lineWidth = 4 + 4 * t;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(c.x, c.y);
      ctx.stroke();
    }

    // Joints
    for (let n = 0; n < NODES.length; n++) {
      const p = w2s(NODES[n].x, NODES[n].y);
      ctx.fillStyle = '#0b1220';
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // Supports
    drawPin(ctx, w2s(NODES[PIN].x, NODES[PIN].y));
    drawRoller(ctx, w2s(NODES[ROLLER].x, NODES[ROLLER].y));

    // Load arrow at loadX on the deck
    const lp = w2s(params.loadX, 0);
    ctx.strokeStyle = '#fbbf24';
    ctx.fillStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(lp.x, lp.y - 60);
    ctx.lineTo(lp.x, lp.y - 4);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(lp.x - 7, lp.y - 14); ctx.lineTo(lp.x, lp.y - 2); ctx.lineTo(lp.x + 7, lp.y - 14);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.textAlign = 'center';
    ctx.fillText(`P = ${params.loadP} kN`, lp.x, lp.y - 66);
    ctx.textAlign = 'left';

    // Legend / readouts
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 280, 56);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText('Tension (red)   /   Compression (blue)', 16, 26);
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`Ra = ${result.reactions.Ry0.toFixed(2)} kN     Rb = ${result.reactions.Ry3.toFixed(2)} kN`, 16, 44);
    const worst = result.memberForces.reduce((acc, f, i) => Math.abs(f) > Math.abs(acc.F) ? { F: f, idx: i } : acc, { F: 0, idx: -1 });
    ctx.fillText(`worst member: F = ${worst.F.toFixed(2)} kN`, 16, 60);

    // Hover tooltip
    const probe = hover.get();
    if (probe) {
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.beginPath();
      const a = w2s(NODES[MEMBERS[probe.idx][0]].x, NODES[MEMBERS[probe.idx][0]].y);
      const c = w2s(NODES[MEMBERS[probe.idx][1]].x, NODES[MEMBERS[probe.idx][1]].y);
      ctx.moveTo(a.x, a.y); ctx.lineTo(c.x, c.y); ctx.stroke();
      drawTooltip(ctx, probe.label, probe.x + 12, probe.y - 12);
    }

    // Hint
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag the load arrow along the deck · hover any member for its force', 16, H - 12);
  }

  function drawPin(ctx, p) {
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x - 14, p.y + 22);
    ctx.lineTo(p.x + 14, p.y + 22);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#64748b';
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(p.x - 14 + i * 4, p.y + 22);
      ctx.lineTo(p.x - 18 + i * 4, p.y + 30);
      ctx.stroke();
    }
  }
  function drawRoller(ctx, p) {
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.arc(p.x, p.y + 8, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#64748b';
    ctx.beginPath(); ctx.moveTo(p.x - 14, p.y + 18); ctx.lineTo(p.x + 14, p.y + 18); ctx.stroke();
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(p.x - 14 + i * 4, p.y + 18);
      ctx.lineTo(p.x - 18 + i * 4, p.y + 26);
      ctx.stroke();
    }
  }

  // Hover any member to read its force.
  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    if (!layout) return null;
    const { w2s } = layout;
    const result = analyze(params.loadX, params.loadP);
    let best = -1, bestD = 14;
    for (let m = 0; m < MEMBERS.length; m++) {
      const [i, j] = MEMBERS[m];
      const a = w2s(NODES[i].x, NODES[i].y);
      const c = w2s(NODES[j].x, NODES[j].y);
      const d = pointSegDist(sx, sy, a.x, a.y, c.x, c.y);
      if (d < bestD) { bestD = d; best = m; }
    }
    if (best < 0) return null;
    const F = result.memberForces[best];
    return {
      x: sx, y: sy, idx: best,
      label: [
        `member #${best + 1}`,
        F > 0 ? `tension: ${F.toFixed(2)} kN` : `compression: ${(-F).toFixed(2)} kN`,
      ],
    };
  });

  function pointSegDist(px, py, ax, ay, bx, by) {
    const dx = bx - ax, dy = by - ay;
    const len2 = dx * dx + dy * dy;
    let t = ((px - ax) * dx + (py - ay) * dy) / len2;
    t = Math.max(0, Math.min(1, t));
    const cx = ax + t * dx, cy = ay + t * dy;
    return Math.hypot(px - cx, py - cy);
  }

  // Drag the load along the deck.
  const drag = dragHandle(cv.canvas, {
    hitTest(sx, sy) {
      if (!layout) return null;
      const lp = layout.w2s(params.loadX, 0);
      // accept anywhere along the bottom-chord band or near the arrow
      if (sy > lp.y - 70 && sy < lp.y + 10 &&
          sx >= layout.x0 && sx <= layout.x0 + 6 * layout.scale) return 'load';
      return null;
    },
    onDrag(_id, sx) {
      params.loadX = layout.s2w(sx);
      lxS.value = params.loadX;
    },
    cursor: 'pointer',
    hoverCursor: 'grab',
  });

  // controls
  const lxS = slider({ label: 'Load position (m)', min: 0, max: 6, step: 0.05, value: params.loadX, format: (v) => v.toFixed(2),
    onInput: (v) => { params.loadX = v; } });
  const lpS = slider({ label: 'Load magnitude P (kN)', min: 1, max: 50, step: 0.5, value: params.loadP, format: (v) => v.toFixed(1),
    onInput: (v) => { params.loadP = v; } });
  const cB = button({ label: 'Load at center', primary: true, onClick: () => { params.loadX = 3; lxS.value = 3; } });
  ctrlPanel.append(lxS.el, lpS.el, row(cB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); hover.destroy(); drag.destroy(); cv.destroy(); };
}
