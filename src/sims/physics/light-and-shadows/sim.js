import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, toggle, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';

const OBJECTS = [
  { id: 'ball', name: 'Ball', color: '#f43f5e' },
  { id: 'cup', name: 'Cup', color: '#22c55e' },
  { id: 'toy', name: 'Teddy', color: '#d97706' },
  { id: 'letter', name: 'Letter T', color: '#a855f7' },
];
const MATERIALS = [
  { id: 'opaque', name: 'Solid', shadow: 0.85, body: 1 },
  { id: 'translucent', name: 'Frosted', shadow: 0.35, body: 0.5 },
  { id: 'transparent', name: 'Clear glass', shadow: 0, body: 0.18 },
];

function bigBtn(label, onClick) {
  const b = button({ label, onClick });
  b.el.style.minHeight = '44px';
  b.el.style.fontSize = '1rem';
  b.el.style.padding = '10px 18px';
  return b;
}

// Builds the outline of each object as a path; the shadow reuses the same
// path scaled up, because a point light projects a similar (bigger) shape.
function circle(ctx, x, y, r) { ctx.moveTo(x + r, y); ctx.arc(x, y, r, 0, Math.PI * 2); }
function oval(ctx, x, y, rx, ry) { ctx.moveTo(x + rx, y); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); }
function shapePath(ctx, type, cx, cy, h) {
  ctx.beginPath();
  if (type === 'ball') {
    circle(ctx, cx, cy, h / 2);
  } else if (type === 'cup') {
    const tw = h * 0.42, bw = h * 0.3;
    ctx.moveTo(cx - tw, cy - h / 2); ctx.lineTo(cx + tw, cy - h / 2);
    ctx.lineTo(cx + bw, cy + h / 2); ctx.lineTo(cx - bw, cy + h / 2); ctx.closePath();
    oval(ctx, cx + tw + h * 0.1, cy - h * 0.1, h * 0.22, h * 0.26);
  } else if (type === 'toy') {
    circle(ctx, cx, cy - h * 0.25, h * 0.22);
    circle(ctx, cx - h * 0.2, cy - h * 0.42, h * 0.1);
    circle(ctx, cx + h * 0.2, cy - h * 0.42, h * 0.1);
    oval(ctx, cx, cy + h * 0.2, h * 0.28, h * 0.3);
    circle(ctx, cx - h * 0.33, cy + h * 0.1, h * 0.11);
    circle(ctx, cx + h * 0.33, cy + h * 0.1, h * 0.11);
  } else {
    ctx.rect(cx - h * 0.4, cy - h / 2, h * 0.8, h * 0.22);
    ctx.rect(cx - h * 0.12, cy - h / 2, h * 0.24, h);
  }
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const state = { object: 0, material: 0, rays: true, lamp: { u: 0.2, v: 0.5 } };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  // Scene geometry in CSS pixels, recomputed from the canvas size each frame.
  // The toy sits on a stand at mid-height so the shadow can move up AND down.
  function geom() {
    const W = cv.width, H = cv.height;
    const g = H / 12;
    const floor = H * 0.9;
    const objX = W * 0.4, objH = 1.5 * g, objY = H * 0.5;
    const wallX = W * 0.76, wallW = W * 0.2, wallTop = H * 0.05;
    const lampX = state.lamp.u * W, lampY = state.lamp.v * H;
    const k = (wallX - lampX) / (objX - lampX);
    return { W, H, g, floor, objX, objY, objH, wallX, wallW, wallTop, lampX, lampY, k,
      shadowY: lampY + (objY - lampY) * k, shadowH: objH * k,
      squares: objH * k / g, distance: (objX - lampX) / g };
  }
  // Keep the whole shadow on the wall: solve shadowY = lampY + (objY - lampY) * k for lampY.
  function clampLamp(u, v) {
    const G = geom();
    const uu = clamp(u, 0.04, (G.objX - 2.5 * G.g) / G.W);
    const lampX = uu * G.W;
    const k = (G.wallX - lampX) / (G.objX - lampX);
    const half = Math.min(G.objH * k / 2, (G.floor - G.wallTop) / 2 - 1);
    const lo = (G.floor - half - G.objY * k) / (1 - k);
    const hi = (G.wallTop + half - G.objY * k) / (1 - k);
    const vv = clamp(v * G.H, Math.min(lo, hi), Math.max(lo, hi)) / G.H;
    return { u: uu, v: clamp(vv, 0.06, 0.88) };
  }
  const sizeWord = (sq) => (sq < 3.5 ? 'small' : sq < 5 ? 'medium' : 'big');

  function draw() {
    const ctx = cv.ctx;
    const G = geom();
    const { W, H, g } = G;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#1e1b4b';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#312e81';
    ctx.fillRect(0, G.floor, W, H - G.floor);

    // Wall with grid squares
    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(G.wallX, G.wallTop, G.wallW, G.floor - G.wallTop);
    ctx.strokeStyle = 'rgba(0,0,0,0.12)';
    ctx.lineWidth = 1;
    for (let y = G.floor; y > G.wallTop; y -= g) { ctx.beginPath(); ctx.moveTo(G.wallX, y); ctx.lineTo(G.wallX + G.wallW, y); ctx.stroke(); }
    for (let x = G.wallX; x < G.wallX + G.wallW; x += g) { ctx.beginPath(); ctx.moveTo(x, G.wallTop); ctx.lineTo(x, G.floor); ctx.stroke(); }

    // Light beam and rays
    const mat = MATERIALS[state.material];
    if (state.rays) {
      ctx.fillStyle = 'rgba(253,224,71,0.18)';
      ctx.beginPath();
      ctx.moveTo(G.lampX, G.lampY);
      ctx.lineTo(G.wallX, G.wallTop); ctx.lineTo(G.wallX, G.floor); ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = 'rgba(253,224,71,0.9)';
      ctx.lineWidth = 2;
      for (const sgn of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(G.lampX, G.lampY);
        ctx.lineTo(G.wallX, G.shadowY + sgn * G.shadowH / 2);
        ctx.stroke();
      }
    }

    // Shadow on the wall (clipped to the wall)
    if (mat.shadow > 0) {
      ctx.save();
      ctx.beginPath(); ctx.rect(G.wallX, G.wallTop, G.wallW, G.floor - G.wallTop); ctx.clip();
      shapePath(ctx, OBJECTS[state.object].id, G.wallX + G.wallW / 2, G.shadowY, G.shadowH);
      ctx.fillStyle = `rgba(30,27,75,${mat.shadow})`;
      ctx.fill();
      ctx.restore();
    }

    // Stand and the object
    ctx.fillStyle = '#475569';
    ctx.fillRect(G.objX - 5, G.objY + G.objH / 2 - 4, 10, G.floor - G.objY - G.objH / 2 + 4);
    ctx.fillRect(G.objX - g * 0.8, G.floor - 8, g * 1.6, 8);
    const obj = OBJECTS[state.object];
    shapePath(ctx, obj.id, G.objX, G.objY, G.objH);
    ctx.globalAlpha = mat.body;
    ctx.fillStyle = obj.color;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = 'rgba(255,255,255,0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // The torch
    ctx.save();
    ctx.translate(G.lampX, G.lampY);
    ctx.rotate(Math.atan2(G.objY - G.lampY, G.objX - G.lampX));
    ctx.fillStyle = '#64748b';
    ctx.beginPath(); ctx.roundRect(-g * 1.6, -g * 0.35, g * 1.5, g * 0.7, 8); ctx.fill();
    ctx.fillStyle = '#fde047';
    ctx.beginPath(); ctx.moveTo(-g * 0.2, -g * 0.5); ctx.lineTo(g * 0.25, -g * 0.65); ctx.lineTo(g * 0.25, g * 0.65); ctx.lineTo(-g * 0.2, g * 0.5); ctx.closePath(); ctx.fill();
    ctx.restore();
    ctx.fillStyle = 'rgba(253,224,71,0.35)';
    ctx.beginPath(); ctx.arc(G.lampX, G.lampY, 36, 0, Math.PI * 2); ctx.fill();

    // Two friendly readouts
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${Math.round(H * 0.045)}px system-ui, -apple-system, Roboto, sans-serif`;
    ctx.textAlign = 'center';
    const msg = mat.shadow === 0 ? 'No shadow: light goes through' : `Shadow: ${sizeWord(G.squares)} (${Math.round(G.squares)} squares)`;
    ctx.fillText(msg, W * 0.37, H * 0.97);
    ctx.textAlign = 'left';
  }

  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) {
      const G = geom();
      return Math.hypot(x - G.lampX, y - G.lampY) < 44 ? 'lamp' : null;
    },
    onDrag(_id, x, y) {
      const G = geom();
      state.lamp = clampLamp(x / G.W, y / G.H);
    },
    handles: () => { const G = geom(); return [{ id: 'lamp', x: G.lampX, y: G.lampY, label: 'Torch (drag to move the light)' }]; },
    cursor: 'grab',
    hoverCursor: 'grab',
  });

  // Controls
  const objRow = document.createElement('div');
  objRow.className = 'ctrl-row';
  const objBtns = OBJECTS.map((o, i) => bigBtn(o.name, () => { state.object = i; refresh(); }));
  objBtns.forEach((b) => objRow.appendChild(b.el));
  const matRow = document.createElement('div');
  matRow.className = 'ctrl-row';
  const matBtns = MATERIALS.map((m, i) => bigBtn(m.name, () => { state.material = i; refresh(); }));
  matBtns.forEach((b) => matRow.appendChild(b.el));
  function refresh() {
    objBtns.forEach((b, i) => b.el.classList.toggle('btn--primary', i === state.object));
    matBtns.forEach((b, i) => b.el.classList.toggle('btn--primary', i === state.material));
  }
  refresh();
  const raysT = toggle({ label: 'Show light rays', key: 'rays', value: true, onChange: (v) => { state.rays = v; } });
  ctrlPanel.append(objRow, matRow, row(raysT));

  const lab = labPanel({
    title: 'Shadow lab',
    filename: 'light-and-shadows-lab.csv',
    columns: [
      { key: 'object', label: 'Object' },
      { key: 'material', label: 'Material' },
      { key: 'distance', label: 'Torch distance (squares)' },
      { key: 'size', label: 'Shadow size' },
    ],
    procedure: [
      'Put the torch far from the toy. Record the distance and the shadow size.',
      'Drag the torch a little closer. Record again. Do this 3 times.',
      'Change the toy to Frosted, then Clear glass. What happens to the shadow?',
      'Look at your table: when is the shadow biggest?',
    ],
    predict: 'If you move the torch closer to the toy, will the shadow get bigger or smaller?',
    source: () => {
      const G = geom();
      const mat = MATERIALS[state.material];
      return {
        object: OBJECTS[state.object].name,
        material: mat.name,
        distance: Math.round(G.distance),
        size: mat.shadow === 0 ? 'none' : `${sizeWord(G.squares)} (${Math.round(G.squares)})`,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
