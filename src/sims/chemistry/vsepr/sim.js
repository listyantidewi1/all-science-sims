import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';

// VSEPR shape directions in 3D for total electron domains.
// Lone pairs fill equatorial positions for 5 (trigonal bipyramid) etc.
function shapeDirections(N) {
  if (N === 2) return [[1,0,0], [-1,0,0]];
  if (N === 3) return [
    [1, 0, 0],
    [-0.5, 0, Math.sqrt(3)/2],
    [-0.5, 0, -Math.sqrt(3)/2],
  ];
  if (N === 4) {
    // tetrahedral
    const a = 1/Math.sqrt(3);
    return [[a,a,a], [-a,-a,a], [a,-a,-a], [-a,a,-a]];
  }
  if (N === 5) {
    // trigonal bipyramid: 3 equatorial + 2 axial
    return [
      [0, 1, 0], [0, -1, 0],            // axial
      [1, 0, 0],
      [-0.5, 0, Math.sqrt(3)/2],
      [-0.5, 0, -Math.sqrt(3)/2],
    ];
  }
  if (N === 6) {
    return [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
  }
  return [];
}

const NAMES = {
  '2-0': 'Linear',
  '3-0': 'Trigonal planar', '3-1': 'Bent',
  '4-0': 'Tetrahedral', '4-1': 'Trigonal pyramidal', '4-2': 'Bent',
  '5-0': 'Trigonal bipyramidal', '5-1': 'Seesaw', '5-2': 'T-shape', '5-3': 'Linear',
  '6-0': 'Octahedral', '6-1': 'Square pyramidal', '6-2': 'Square planar',
};

const EXAMPLES = {
  '2-0': 'CO₂, BeCl₂',
  '3-0': 'BF₃',
  '3-1': 'SO₂',
  '4-0': 'CH₄',
  '4-1': 'NH₃',
  '4-2': 'H₂O',
  '5-0': 'PCl₅',
  '5-1': 'SF₄',
  '5-2': 'ClF₃',
  '5-3': 'XeF₂',
  '6-0': 'SF₆',
  '6-1': 'BrF₅',
  '6-2': 'XeF₄',
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 1 });

  const params = { bonds: 4, lones: 0, autoRotate: true };
  let yaw = 0.7, pitch = 0.4;
  let dragLast = null;

  function rotate(p) {
    // yaw around Y, then pitch around X
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

    const N = params.bonds + params.lones;
    const dirs = shapeDirections(N);
    if (!dirs.length) return;

    // Sort: lone pairs go on highest-repulsion positions (we keep simple: lone pairs occupy first slots for steric N=5,6)
    let order = [...dirs.keys()];
    if (N === 5) {
      // For 5-domain with lone pairs, lone pairs prefer equatorial (last 3 in our list)
      // bondsCount bond positions chosen first from axial (0,1) then equatorial.
      // We'll mark indices >=2 as equatorial. Lone pairs go at equatorial first.
      const equatorial = [2, 3, 4], axial = [0, 1];
      const lone = [];
      const bond = [];
      for (let i = 0; i < params.lones; i++) lone.push(equatorial[i] ?? axial[i - equatorial.length]);
      const remaining = [...equatorial, ...axial].filter((i) => !lone.includes(i));
      for (const idx of remaining) bond.push(idx);
      order = [...bond, ...lone];
    } else if (N === 6) {
      // For octahedral, lone pairs prefer 180° apart (e.g., indices 4 and 5)
      const lone = [];
      if (params.lones >= 1) lone.push(5);
      if (params.lones >= 2) lone.push(4);
      const bond = [0, 1, 2, 3, 4, 5].filter((i) => !lone.includes(i));
      order = [...bond, ...lone];
    } else {
      // any equivalent — bond pairs first
      order = [...dirs.keys()];
    }

    // Bonds and lone pairs
    const central = project([0, 0, 0], W, H);
    const items = [];
    for (let i = 0; i < N; i++) {
      const d = dirs[order[i]];
      const isLone = i >= params.bonds;
      const p = project(d, W, H);
      items.push({ d, p, isLone, raw: d });
    }
    items.sort((a, b) => a.p.depth - b.p.depth);

    // Bonds first
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3;
    for (const it of items) {
      if (it.isLone) continue;
      ctx.beginPath();
      ctx.moveTo(central.x, central.y);
      ctx.lineTo(it.p.x, it.p.y);
      ctx.stroke();
    }

    // Lone pair clouds (drawn slightly closer)
    for (const it of items) {
      if (!it.isLone) continue;
      const lpx = (central.x + it.p.x) / 2 + (it.p.x - central.x) * 0.1;
      const lpy = (central.y + it.p.y) / 2 + (it.p.y - central.y) * 0.1;
      ctx.fillStyle = 'rgba(245,158,11,0.45)';
      ctx.beginPath();
      ctx.ellipse(lpx, lpy, 22, 14, Math.atan2(it.p.y - central.y, it.p.x - central.x), 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath(); ctx.arc(lpx - 4, lpy - 4, 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(lpx + 4, lpy + 4, 3.5, 0, Math.PI * 2); ctx.fill();
    }

    // Bonded atoms on top
    for (const it of items) {
      if (it.isLone) continue;
      const r = 18 - it.p.depth * 4;
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(it.p.x, it.p.y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#1e3a8a';
      ctx.stroke();
    }

    // central atom
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(central.x, central.y, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#065f46';
    ctx.stroke();

    // info
    const key = `${N}-${params.lones}`;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 280, 56);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-sans)';
    ctx.fillText(NAMES[key] || `${N} domains`, 16, 28);
    ctx.font = '12px var(--font-sans)';
    ctx.fillText(`${params.bonds} bonded · ${params.lones} lone pair${params.lones === 1 ? '' : 's'}`, 16, 46);
    if (EXAMPLES[key]) {
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 11px var(--font-sans)';
      ctx.fillText(`Example: ${EXAMPLES[key]}`, 16, 60);
    }

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag to rotate', 12, H - 12);
  }

  // controls
  const bondsS = slider({ label: 'Bonded atoms', min: 1, max: 6, step: 1, value: params.bonds,
    onInput: (v) => { params.bonds = v; clamp(); } });
  const lonesS = slider({ label: 'Lone pairs', min: 0, max: 4, step: 1, value: params.lones,
    onInput: (v) => { params.lones = v; clamp(); } });
  function clamp() {
    if (params.bonds + params.lones > 6) params.lones = 6 - params.bonds;
    if (params.bonds + params.lones < 2) params.bonds = 2 - params.lones;
    bondsS.value = params.bonds; lonesS.value = params.lones;
  }
  const autoT = toggle({ label: 'Auto-rotate', value: params.autoRotate, onChange: (v) => { params.autoRotate = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, b, l] of [['CO₂', 2, 0], ['BF₃', 3, 0], ['H₂O', 2, 2], ['NH₃', 3, 1], ['CH₄', 4, 0], ['SF₆', 6, 0], ['XeF₂', 2, 3]]) {
    const btn = button({ label: name, onClick: () => { params.bonds = b; params.lones = l; clamp(); } });
    presetRow.appendChild(btn.el);
  }
  ctrlPanel.append(bondsS.el, lonesS.el, autoT.el, presetRow);

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
