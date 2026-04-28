import { createCanvas, loop } from '../../../lib/canvas.js';
import { select, button, row, toggle } from '../../../lib/controls.js';

const TYPES = {
  sc: {
    name: 'Simple cubic (Po)', cn: 6, pf: 0.524,
    atoms: [
      [0,0,0],[1,0,0],[0,1,0],[1,1,0],
      [0,0,1],[1,0,1],[0,1,1],[1,1,1],
    ],
    radius: 0.5,
  },
  bcc: {
    name: 'Body-centered cubic (Fe, Cr)', cn: 8, pf: 0.680,
    atoms: [
      [0,0,0],[1,0,0],[0,1,0],[1,1,0],
      [0,0,1],[1,0,1],[0,1,1],[1,1,1],
      [0.5,0.5,0.5],
    ],
    radius: Math.sqrt(3) / 4,
  },
  fcc: {
    name: 'Face-centered cubic (Cu, Au, Al)', cn: 12, pf: 0.740,
    atoms: [
      [0,0,0],[1,0,0],[0,1,0],[1,1,0],
      [0,0,1],[1,0,1],[0,1,1],[1,1,1],
      [0.5,0.5,0],[0.5,0.5,1],
      [0.5,0,0.5],[0.5,1,0.5],
      [0,0.5,0.5],[1,0.5,0.5],
    ],
    radius: Math.sqrt(2) / 4,
  },
  hcp: {
    name: 'Hexagonal close-packed (Mg, Ti, Zn)', cn: 12, pf: 0.740,
    atoms: [
      // simplified HCP: 12 corners + 2 center
      [0, 0, 0], [1, 0, 0], [0.5, Math.sqrt(3)/2, 0],
      [0, 0, 1], [1, 0, 1], [0.5, Math.sqrt(3)/2, 1],
      [0.5, Math.sqrt(3)/6, 0.5],
    ],
    radius: 0.4,
  },
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 1 });

  const params = { type: 'fcc', autoRotate: true, drawBonds: false };
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
    const r = rotate([p[0] - 0.5, p[1] - 0.5, p[2] - 0.5]);
    const persp = 1 / (3 + r[2]);
    const sc = Math.min(W, H) * 0.7;
    return { x: W / 2 + r[0] * sc * 3 * persp, y: H / 2 - r[1] * sc * 3 * persp, depth: r[2] };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const cell = TYPES[params.type];

    // Cube edges
    const cubeCorners = [[0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,0,1],[1,0,1],[1,1,1],[0,1,1]];
    const edges = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.lineWidth = 1;
    for (const [a, b] of edges) {
      const pa = project(cubeCorners[a], W, H);
      const pb = project(cubeCorners[b], W, H);
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y);
      ctx.stroke();
    }

    // Atoms (sort by depth)
    const sorted = cell.atoms.map((a) => ({ pos: a, proj: project(a, W, H) }));
    sorted.sort((a, b) => b.proj.depth - a.proj.depth);
    const baseR = Math.min(W, H) * 0.07;
    for (const item of sorted) {
      const r = baseR * (1 - item.proj.depth * 0.15);
      const grad = ctx.createRadialGradient(item.proj.x - r * 0.3, item.proj.y - r * 0.3, 1, item.proj.x, item.proj.y, r);
      grad.addColorStop(0, '#dbeafe');
      grad.addColorStop(0.5, '#3b82f6');
      grad.addColorStop(1, '#1e3a8a');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(item.proj.x, item.proj.y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.4)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // info
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 320, 56);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(cell.name, 16, 28);
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`coordination # = ${cell.cn}`, 16, 46);
    ctx.fillText(`packing fraction = ${cell.pf}`, 16, 62);

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag to rotate', 12, H - 12);
  }

  // controls
  const tSel = select({
    label: 'Lattice type',
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
