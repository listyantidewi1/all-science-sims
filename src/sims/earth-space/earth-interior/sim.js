import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

// Layer boundaries (depth in km, 6371 = center)
const LAYERS = [
  { name: 'Crust',         start: 0,    end: 35,    color: '#92400e', state: 'solid' },
  { name: 'Upper mantle',  start: 35,   end: 660,   color: '#dc2626', state: 'plastic' },
  { name: 'Lower mantle',  start: 660,  end: 2890,  color: '#fbbf24', state: 'plastic' },
  { name: 'Outer core',    start: 2890, end: 5150,  color: '#fde047', state: 'liquid Fe/Ni' },
  { name: 'Inner core',    start: 5150, end: 6371,  color: '#fef9c3', state: 'solid Fe/Ni' },
];

function tempAt(depth) {
  // Approximate
  if (depth < 35) return 15 + depth * 25;
  if (depth < 660) return 900 + (depth - 35) * 1.6;
  if (depth < 2890) return 1900 + (depth - 660) * 0.6;
  if (depth < 5150) return 3300 + (depth - 2890) * 0.5;
  return 4500 + (depth - 5150) * 0.8;
}
function pressureGPa(depth) {
  if (depth < 35) return depth * 0.03;
  if (depth < 2890) return 1 + (depth - 35) * 0.05;
  return 135 + (depth - 2890) * 0.06;
}
function densityKgM3(depth) {
  if (depth < 35) return 2700;
  if (depth < 660) return 3500;
  if (depth < 2890) return 5000;
  if (depth < 5150) return 11000;
  return 13000;
}
function layerOf(depth) {
  for (const l of LAYERS) if (depth >= l.start && depth < l.end) return l;
  return LAYERS[LAYERS.length - 1];
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { depth: 100 };
  let drag = false;

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Earth cross-section as concentric circles
    const cx = W * 0.3, cy = H / 2;
    const earthR = Math.min(W, H) * 0.42;
    // Draw layers (outer to inner is reverse of LAYERS — we'll draw in radius space)
    // outer radius for layer = earthR * (1 - start/6371)
    // We need to draw from largest to smallest
    for (const l of [...LAYERS].sort((a, b) => a.end - b.end).reverse()) {
      const rOuter = earthR * (1 - l.start / 6371);
      ctx.fillStyle = l.color;
      ctx.beginPath();
      ctx.arc(cx, cy, rOuter, 0, Math.PI * 2);
      ctx.fill();
    }
    // Draw inner core distinctly
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 0.5;
    for (const l of LAYERS) {
      const rOuter = earthR * (1 - l.start / 6371);
      ctx.beginPath();
      ctx.arc(cx, cy, rOuter, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Probe at radius corresponding to depth
    const probeR = earthR * (1 - params.depth / 6371);
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(cx, cy - earthR - 10);
    ctx.lineTo(cx, cy - probeR);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(cx, cy - probeR, 6, 0, Math.PI * 2);
    ctx.fill();

    // Right side: numbers
    const px = W * 0.65;
    const T = tempAt(params.depth);
    const P = pressureGPa(params.depth);
    const rho = densityKgM3(params.depth);
    const layer = layerOf(params.depth);

    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(px - 10, 30, W - px - 20, 200);
    ctx.fillStyle = layer.color;
    ctx.font = 'bold 18px var(--font-sans)';
    ctx.fillText(layer.name, px, 60);
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.font = '12px var(--font-mono)';
    ctx.fillText(`State: ${layer.state}`, px, 80);

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-mono)';
    ctx.fillText(`Depth: ${params.depth.toFixed(0)} km`, px, 110);
    ctx.fillStyle = '#ef4444';
    ctx.fillText(`Temp: ${T.toFixed(0)} K (${(T - 273).toFixed(0)} °C)`, px, 134);
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(`Pressure: ${P.toFixed(1)} GPa`, px, 158);
    ctx.fillStyle = '#3b82f6';
    ctx.fillText(`Density: ${rho.toFixed(0)} kg/m³`, px, 182);

    // Layer legend
    let yy = 250;
    ctx.font = '11px var(--font-sans)';
    for (const l of LAYERS) {
      ctx.fillStyle = l.color;
      ctx.fillRect(px, yy - 10, 14, 10);
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.fillText(`${l.name} (${l.start}–${l.end} km)`, px + 22, yy);
      yy += 18;
    }
  }

  // drag
  function localPos(e) {
    const rect = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * cv.width / rect.width, y: (e.clientY - rect.top) * cv.height / rect.height };
  }
  cv.canvas.style.cursor = 'pointer';
  cv.canvas.addEventListener('mousedown', () => { drag = true; });
  window.addEventListener('mousemove', (e) => {
    if (!drag) return;
    const p = localPos(e);
    const cx = cv.width * 0.3, cy = cv.height / 2;
    const earthR = Math.min(cv.width, cv.height) * 0.42;
    const dx = p.x - cx, dy = p.y - cy;
    const r = Math.hypot(dx, dy);
    const depth = Math.max(0, Math.min(6371, 6371 * (1 - r / earthR)));
    params.depth = depth;
  });
  window.addEventListener('mouseup', () => { drag = false; });

  // controls
  const dS = slider({ label: 'Depth (km)', min: 0, max: 6371, step: 1, value: params.depth,
    onInput: (v) => { params.depth = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, d] of [['Surface', 0], ['Mantle', 1500], ['Outer core', 4000], ['Inner core', 5800]]) {
    const b = button({ label: name, onClick: () => { params.depth = d; dS.value = d; } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(dS.el, presetRow);

  const animator = loop(() => { dS.value = Math.round(params.depth); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
