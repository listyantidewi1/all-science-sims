import { createCanvas, loop } from '../../../lib/canvas.js';
import { select, button, row, toggle } from '../../../lib/controls.js';

const TYPES = {
  sp:  { name: 'sp (linear)', angle: 180, count: 2, example: 'C₂H₂ acetylene' },
  sp2: { name: 'sp² (trigonal planar)', angle: 120, count: 3, example: 'C₂H₄ ethylene, BF₃' },
  sp3: { name: 'sp³ (tetrahedral)', angle: 109.5, count: 4, example: 'CH₄ methane' },
};

function dirsFor(type) {
  if (type === 'sp') return [[1,0,0], [-1,0,0]];
  if (type === 'sp2') return [
    [1, 0, 0],
    [-0.5, Math.sqrt(3)/2, 0],
    [-0.5, -Math.sqrt(3)/2, 0],
  ];
  if (type === 'sp3') {
    const a = 1/Math.sqrt(3);
    return [[a,a,a], [-a,-a,a], [a,-a,-a], [-a,a,-a]];
  }
  return [];
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 1 });

  const params = { type: 'sp3', autoRotate: true };
  let yaw = 0.5, pitch = 0.4;
  let dragLast = null;

  function rotate(p) {
    const cy = Math.cos(yaw), sy = Math.sin(yaw);
    let x = p[0] * cy + p[2] * sy;
    let z = -p[0] * sy + p[2] * cy;
    let y = p[1];
    const cp = Math.cos(pitch), sp = Math.sin(pitch);
    const y2 = y * cp - z * sp;
    const z2 = y * sp + z * cp;
    return [x, y2, z2];
  }
  function project(p, W, H) {
    const r = rotate(p);
    const persp = 1 / (3 + r[2]);
    const sc = Math.min(W, H) * 0.32;
    return { x: W / 2 + r[0] * sc * 3 * persp, y: H / 2 - r[1] * sc * 3 * persp, depth: r[2] };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const central = project([0, 0, 0], W, H);
    const dirs = dirsFor(params.type);
    const items = dirs.map((d) => ({ d, p: project(d, W, H) }));
    items.sort((a, b) => a.p.depth - b.p.depth);

    // bonds (rod-like) drawn behind atoms
    for (const it of items) {
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(central.x, central.y); ctx.lineTo(it.p.x, it.p.y);
      ctx.stroke();
    }

    // hybrid orbital lobes (cones)
    for (const it of items) {
      ctx.fillStyle = 'rgba(14,165,233,0.18)';
      ctx.beginPath();
      ctx.moveTo(central.x, central.y);
      // wedge in screen-direction of bond
      const dx = it.p.x - central.x, dy = it.p.y - central.y;
      const len = Math.hypot(dx, dy);
      const nx = dx / len, ny = dy / len;
      const ox = -ny, oy = nx;
      const wedge = 16;
      ctx.lineTo(it.p.x + ox * wedge, it.p.y + oy * wedge);
      ctx.lineTo(it.p.x - ox * wedge, it.p.y - oy * wedge);
      ctx.closePath();
      ctx.fill();
    }

    // outer atoms (e.g., H)
    for (const it of items) {
      const r = 14 - it.p.depth * 4;
      ctx.fillStyle = '#cbd5e1';
      ctx.beginPath();
      ctx.arc(it.p.x, it.p.y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // central atom (C)
    ctx.fillStyle = '#1f2937';
    ctx.beginPath();
    ctx.arc(central.x, central.y, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 16px var(--font-sans)';
    ctx.textAlign = 'center';
    ctx.fillText('C', central.x, central.y + 5);
    ctx.textAlign = 'left';

    // info
    const t = TYPES[params.type];
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 320, 56);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-sans)';
    ctx.fillText(t.name, 16, 28);
    ctx.font = '12px var(--font-sans)';
    ctx.fillText(`bond angle ${t.angle}°    ${t.count} hybrid orbitals`, 16, 46);
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText(`Example: ${t.example}`, 16, 62);

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag to rotate', 12, H - 12);
  }

  // controls
  const tSel = select({
    label: 'Hybridization',
    options: Object.entries(TYPES).map(([k, v]) => ({ value: k, label: v.name })),
    value: params.type,
    onChange: (v) => { params.type = v; },
  });
  const arT = toggle({ label: 'Auto-rotate', value: params.autoRotate, onChange: (v) => { params.autoRotate = v; } });
  ctrlPanel.append(tSel.el, arT.el);

  // drag
  cv.canvas.style.cursor = 'grab';
  cv.canvas.addEventListener('mousedown', (e) => {
    const rect = cv.canvas.getBoundingClientRect();
    dragLast = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    cv.canvas.style.cursor = 'grabbing';
  });
  window.addEventListener('mousemove', (e) => {
    if (!dragLast) return;
    const rect = cv.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    yaw += (x - dragLast.x) * 0.01;
    pitch -= (y - dragLast.y) * 0.01;
    pitch = Math.max(-1.4, Math.min(1.4, pitch));
    dragLast = { x, y };
  });
  window.addEventListener('mouseup', () => { dragLast = null; cv.canvas.style.cursor = 'grab'; });

  const animator = loop((dt) => {
    if (params.autoRotate && !dragLast) yaw += dt * 0.3;
    draw();
  });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
