import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';

// Trophic levels: 0 sun, 1 producer, 2 primary consumer (herbivore), 3 secondary consumer, 4 top, 9 decomposer
const SPECIES = [
  { id: 'sun',     name: 'Sun',         emoji: '☀',  level: 0, x: 0.10, y: 0.15, color: '#fbbf24' },
  { id: 'grass',   name: 'Grass',        emoji: '🌿', level: 1, x: 0.30, y: 0.30, color: '#10b981' },
  { id: 'tree',    name: 'Tree',         emoji: '🌳', level: 1, x: 0.55, y: 0.30, color: '#22c55e' },
  { id: 'rabbit',  name: 'Rabbit',       emoji: '🐰', level: 2, x: 0.20, y: 0.55, color: '#0ea5e9' },
  { id: 'deer',    name: 'Deer',         emoji: '🦌', level: 2, x: 0.45, y: 0.55, color: '#3b82f6' },
  { id: 'mouse',   name: 'Mouse',        emoji: '🐭', level: 2, x: 0.70, y: 0.55, color: '#06b6d4' },
  { id: 'fox',     name: 'Fox',          emoji: '🦊', level: 3, x: 0.30, y: 0.78, color: '#f97316' },
  { id: 'snake',   name: 'Snake',        emoji: '🐍', level: 3, x: 0.55, y: 0.78, color: '#a855f7' },
  { id: 'wolf',    name: 'Wolf',         emoji: '🐺', level: 4, x: 0.45, y: 0.92, color: '#ef4444' },
  { id: 'fungi',   name: 'Decomposers',  emoji: '🍄', level: 9, x: 0.85, y: 0.65, color: '#94a3b8' },
];
// Default edges: predator -> prey
const DEFAULT_EDGES = [
  ['grass', 'sun'], ['tree', 'sun'],
  ['rabbit', 'grass'], ['deer', 'grass'], ['deer', 'tree'], ['mouse', 'grass'],
  ['fox', 'rabbit'], ['fox', 'mouse'], ['snake', 'mouse'], ['snake', 'rabbit'],
  ['wolf', 'deer'], ['wolf', 'fox'],
  ['fungi', 'deer'], ['fungi', 'rabbit'], ['fungi', 'wolf'], ['fungi', 'tree'], ['fungi', 'grass'],
];

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const species = SPECIES.map((s) => ({ ...s, alive: true }));
  let edges = DEFAULT_EDGES.map(([a, b]) => ({ from: a, to: b }));
  let selected = null; // first-clicked species id for arrow add/remove

  function aliveSpecies() { return species.filter((s) => s.alive); }
  function findSpecies(id) { return species.find((s) => s.id === id); }

  function pos(s) {
    return { x: s.x * cv.width, y: s.y * cv.height };
  }

  // Recompute "alive" reachability from the sun.
  function recomputeAlive() {
    const eats = new Map();
    for (const e of edges) {
      if (!eats.has(e.from)) eats.set(e.from, []);
      eats.get(e.from).push(e.to);
    }
    // Decomposers don't need a chain back to sun; they recycle dead.
    // Producers are alive if sun is alive.
    const sunAlive = species.find((s) => s.id === 'sun').alive;
    for (const s of species) {
      if (s.id === 'sun') continue;
      if (s.level === 9) {
        // decomposers fine if any species above is alive
        s.alive = aliveSpecies().some((o) => o.level >= 1 && o.level !== 9);
        continue;
      }
      if (s.level === 1) {
        s.alive = sunAlive;
        continue;
      }
      // Higher trophic levels need at least one alive prey.
      const prey = (eats.get(s.id) || []).map(findSpecies).filter((p) => p && p.alive);
      s.alive = prey.length > 0;
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Layered bg bands by trophic level
    for (let lvl = 1; lvl <= 4; lvl++) {
      ctx.fillStyle = `rgba(255,255,255,${0.02 + lvl * 0.005})`;
      ctx.fillRect(0, H * (lvl - 0.5) / 4 + 80, W, H / 4);
    }

    // Edges (predator → prey arrow)
    for (const e of edges) {
      const a = findSpecies(e.from), b = findSpecies(e.to);
      if (!a || !b) continue;
      const fromAlive = a.alive && b.alive;
      drawArrow(ctx, pos(a), pos(b), fromAlive ? 'rgba(251,191,36,0.55)' : 'rgba(120,130,150,0.2)', 1.4);
    }

    // Nodes
    for (const s of species) {
      const p = pos(s);
      const r = 28;
      ctx.fillStyle = s.alive ? s.color : 'rgba(120,130,150,0.3)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = selected === s.id ? '#fbbf24' : '#fff';
      ctx.lineWidth = selected === s.id ? 3 : 2;
      ctx.stroke();
      ctx.fillStyle = '#fff';
      ctx.font = '20px var(--font-sans)';
      ctx.textAlign = 'center';
      ctx.fillText(s.emoji, p.x, p.y + 6);
      ctx.font = 'bold 11px var(--font-mono)';
      ctx.fillText(s.alive ? s.name : `${s.name} (extinct)`, p.x, p.y + r + 14);
      ctx.textAlign = 'left';
    }

    // Header
    const aliveCt = aliveSpecies().length;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 50);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`Living species: ${aliveCt} / ${species.length}`, 16, 28);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag species to rearrange · click two species to toggle a prey arrow', 16, 46);
  }

  function drawArrow(ctx, a, b, color, lw = 2) {
    const dx = b.x - a.x, dy = b.y - a.y;
    const L = Math.hypot(dx, dy);
    const ux = dx / L, uy = dy / L;
    const startX = a.x + ux * 30, startY = a.y + uy * 30;
    const endX = b.x - ux * 30, endY = b.y - uy * 30;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = lw;
    ctx.beginPath();
    ctx.moveTo(startX, startY); ctx.lineTo(endX, endY);
    ctx.stroke();
    const ang = Math.atan2(uy, ux);
    const sz = 8;
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(endX - sz * Math.cos(ang - 0.4), endY - sz * Math.sin(ang - 0.4));
    ctx.lineTo(endX - sz * Math.cos(ang + 0.4), endY - sz * Math.sin(ang + 0.4));
    ctx.closePath();
    ctx.fill();
  }

  // Drag species; click selection logic.
  let dragSpeciesId = null;
  let dragStart = null;
  let movedDuringDrag = false;
  const drag = dragHandle(cv.canvas, {
    hitTest(sx, sy) {
      for (const s of species) {
        const p = pos(s);
        if (Math.hypot(sx - p.x, sy - p.y) < 30) return s.id;
      }
      return null;
    },
    onStart(id, sx, sy) { dragSpeciesId = id; dragStart = { sx, sy }; movedDuringDrag = false; },
    onDrag(id, sx, sy) {
      const s = findSpecies(id);
      if (!s) return;
      if (Math.hypot(sx - dragStart.sx, sy - dragStart.sy) > 6) movedDuringDrag = true;
      s.x = Math.max(0.05, Math.min(0.95, sx / cv.width));
      s.y = Math.max(0.05, Math.min(0.95, sy / cv.height));
    },
    onEnd(id) {
      if (!movedDuringDrag) {
        // Treat as a click — toggle selection / arrow toggle.
        if (selected == null) {
          selected = id;
        } else if (selected === id) {
          selected = null;
        } else {
          // Toggle predator-prey arrow: from selected -> id
          const idx = edges.findIndex((e) => e.from === selected && e.to === id);
          if (idx >= 0) edges.splice(idx, 1);
          else edges.push({ from: selected, to: id });
          selected = null;
          recomputeAlive();
        }
      }
      dragSpeciesId = null;
    },
    cursor: 'grab',
    hoverCursor: 'grab',
  });

  // controls
  const removeRow = document.createElement('div');
  removeRow.className = 'ctrl-row';
  for (const s of SPECIES.filter((s) => s.id !== 'sun')) {
    const b = button({ label: `× ${s.name}`, onClick: () => {
      const sp = findSpecies(s.id);
      if (sp) sp.alive = !sp.alive;
      recomputeAlive();
    } });
    removeRow.appendChild(b.el);
  }
  const resetB = button({ label: 'Reset web', primary: true, onClick: () => {
    for (const s of species) s.alive = true;
    edges = DEFAULT_EDGES.map(([a, b]) => ({ from: a, to: b }));
    selected = null;
    // restore positions
    for (const s of species) {
      const orig = SPECIES.find((o) => o.id === s.id);
      s.x = orig.x; s.y = orig.y;
    }
    recomputeAlive();
  } });

  ctrlPanel.append(removeRow, row(resetB));

  recomputeAlive();
  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
