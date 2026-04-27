import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';

const COLORS = ['#ef4444', '#3b82f6', '#10b981'];

function gaussian() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function fit(pts) {
  const n = pts.length;
  if (n < 2) return { m: 0, b: 0, r: 0 };
  let sx = 0, sy = 0;
  for (const p of pts) { sx += p.x; sy += p.y; }
  const mx = sx / n, my = sy / n;
  let cov = 0, vx = 0, vy = 0;
  for (const p of pts) { cov += (p.x - mx) * (p.y - my); vx += (p.x - mx) ** 2; vy += (p.y - my) ** 2; }
  const m = vx > 0 ? cov / vx : 0;
  const r = (vx > 0 && vy > 0) ? cov / Math.sqrt(vx * vy) : 0;
  return { m, b: my - m * mx, r };
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const params = {
    n: 30,                // points per group
    inSlope: 0.6,
    spread: 0.5,
    showAggregate: true,
    showGroups: true,
  };

  // Each group has a center; points scatter around it with shared inner slope.
  const groups = [
    { cx: 2, cy: 8 },
    { cx: 5, cy: 5 },
    { cx: 8, cy: 2 },
  ];
  let pts = [];

  function regenerate() {
    pts = [];
    for (let g = 0; g < groups.length; g++) {
      for (let i = 0; i < params.n; i++) {
        const x = groups[g].cx + gaussian() * params.spread;
        const y = groups[g].cy + (x - groups[g].cx) * params.inSlope + gaussian() * params.spread * 0.6;
        pts.push({ x, y, group: g });
      }
    }
  }
  regenerate();

  // dragging a group center
  let dragG = -1;
  function localPos(e) {
    const rect = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * cv.width / rect.width, y: (e.clientY - rect.top) * cv.height / rect.height };
  }
  const X_MIN = 0, X_MAX = 12, Y_MIN = 0, Y_MAX = 12;
  function w2sX(x, W) { return 50 + (x / 12) * (W - 80); }
  function w2sY(y, H) { return H - 30 - (y / 12) * (H - 60); }
  function s2wX(sx, W) { return ((sx - 50) / (W - 80)) * 12; }
  function s2wY(sy, H) { return ((H - 30 - sy) / (H - 60)) * 12; }

  cv.canvas.style.cursor = 'pointer';
  cv.canvas.addEventListener('mousedown', (e) => {
    const p = localPos(e);
    let best = -1, bestD = 30;
    for (let g = 0; g < groups.length; g++) {
      const sx = w2sX(groups[g].cx, cv.width);
      const sy = w2sY(groups[g].cy, cv.height);
      const d = Math.hypot(p.x - sx, p.y - sy);
      if (d < bestD) { bestD = d; best = g; }
    }
    if (best >= 0) dragG = best;
  });
  window.addEventListener('mousemove', (e) => {
    if (dragG < 0) return;
    const p = localPos(e);
    groups[dragG].cx = Math.max(0, Math.min(12, s2wX(p.x, cv.width)));
    groups[dragG].cy = Math.max(0, Math.min(12, s2wY(p.y, cv.height)));
    regenerate();
  });
  window.addEventListener('mouseup', () => { dragG = -1; });

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // axes
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(50, 30, W - 80, H - 60);

    // gridlines
    ctx.strokeStyle = 'rgba(120,130,150,0.15)';
    for (let v = 2; v <= 10; v += 2) {
      ctx.beginPath();
      ctx.moveTo(w2sX(v, W), 30); ctx.lineTo(w2sX(v, W), H - 30);
      ctx.moveTo(50, w2sY(v, H)); ctx.lineTo(W - 30, w2sY(v, H));
      ctx.stroke();
    }

    // points
    for (const p of pts) {
      ctx.fillStyle = COLORS[p.group];
      ctx.beginPath();
      ctx.arc(w2sX(p.x, W), w2sY(p.y, H), 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // group fits
    if (params.showGroups) {
      for (let g = 0; g < groups.length; g++) {
        const inGroup = pts.filter((p) => p.group === g);
        const f = fit(inGroup);
        ctx.strokeStyle = COLORS[g];
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(w2sX(0, W), w2sY(f.b, H));
        ctx.lineTo(w2sX(12, W), w2sY(f.b + f.m * 12, H));
        ctx.stroke();
      }
    }

    // aggregate fit
    if (params.showAggregate) {
      const f = fit(pts);
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(w2sX(0, W), w2sY(f.b, H));
      ctx.lineTo(w2sX(12, W), w2sY(f.b + f.m * 12, H));
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // group center handles
    for (let g = 0; g < groups.length; g++) {
      const sx = w2sX(groups[g].cx, W), sy = w2sY(groups[g].cy, H);
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(sx, sy, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = COLORS[g];
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    // info
    const aggF = fit(pts);
    let groupSlopes = [];
    for (let g = 0; g < groups.length; g++) {
      const f = fit(pts.filter((p) => p.group === g));
      groupSlopes.push(f.m);
    }
    const meanGroupSlope = groupSlopes.reduce((s, v) => s + v, 0) / 3;
    const flip = Math.sign(meanGroupSlope) !== Math.sign(aggF.m) && Math.abs(aggF.m) > 0.05;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 320, 56);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(`Group slopes: ${groupSlopes.map((s) => s.toFixed(2)).join(', ')}`, 16, 28);
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(`Aggregate slope: ${aggF.m.toFixed(2)}`, 16, 46);
    if (flip) {
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 12px var(--font-sans)';
      ctx.fillText('SIMPSON REVERSAL — sign flipped!', 16, 62);
    }

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag the white circles to move group centers', 12, H - 12);
  }

  // controls
  const inS = slider({ label: 'Within-group slope', min: -2, max: 2, step: 0.05, value: params.inSlope, format: (v) => v.toFixed(2),
    onInput: (v) => { params.inSlope = v; regenerate(); } });
  const sprS = slider({ label: 'Spread', min: 0.1, max: 1.5, step: 0.05, value: params.spread, format: (v) => v.toFixed(2),
    onInput: (v) => { params.spread = v; regenerate(); } });
  const nS = slider({ label: 'Points per group', min: 10, max: 100, step: 5, value: params.n,
    onInput: (v) => { params.n = v; regenerate(); } });
  const aggT = toggle({ label: 'Show aggregate fit', value: params.showAggregate, onChange: (v) => { params.showAggregate = v; } });
  const grpT = toggle({ label: 'Show within-group fits', value: params.showGroups, onChange: (v) => { params.showGroups = v; } });
  const presetB = button({ label: 'Set up Simpson reversal', primary: true, onClick: () => {
    groups[0] = { cx: 2, cy: 9 };
    groups[1] = { cx: 6, cy: 6 };
    groups[2] = { cx: 10, cy: 3 };
    params.inSlope = 0.6;
    inS.value = 0.6;
    regenerate();
  } });
  const stackB = button({ label: 'Stack groups', onClick: () => {
    for (let g = 0; g < 3; g++) groups[g] = { cx: 6, cy: 6 };
    regenerate();
  } });

  ctrlPanel.append(inS.el, sprS.el, nS.el, aggT.el, grpT.el, row(presetB, stackB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
