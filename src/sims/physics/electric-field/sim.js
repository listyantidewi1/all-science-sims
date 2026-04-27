import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row, toggle } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const state = {
    charges: [
      { x: 0.35, y: 0.5, q: +1 },
      { x: 0.65, y: 0.5, q: -1 },
    ],
    mode: 'lines',     // 'lines' | 'vectors' | 'potential'
    addSign: +1,
    showCursor: true,
    dragging: null,    // index into charges
    cursor: { x: 0.5, y: 0.5, inside: false },
  };

  const RADIUS_PX = 16;

  // World <-> screen
  const w2s = (p) => ({ x: p.x * cv.width, y: p.y * cv.height });
  const s2w = (sx, sy) => ({ x: sx / cv.width, y: sy / cv.height });

  function E(x, y) {
    let ex = 0, ey = 0;
    for (const c of state.charges) {
      const dx = x - c.x;
      const dy = y - c.y;
      const r2 = dx * dx + dy * dy + 0.0008;
      const r = Math.sqrt(r2);
      const k = c.q / (r2 * r); // 1/r^2 magnitude, divided by r to normalize the dx,dy
      ex += k * dx;
      ey += k * dy;
    }
    return { ex, ey };
  }

  function potential(x, y) {
    let v = 0;
    for (const c of state.charges) {
      const r = Math.hypot(x - c.x, y - c.y) + 0.02;
      v += c.q / r;
    }
    return v;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    if (state.mode === 'potential') drawPotential(ctx, W, H);
    if (state.mode === 'vectors') drawVectors(ctx, W, H);
    if (state.mode === 'lines') drawFieldLines(ctx, W, H);

    // charges
    for (let i = 0; i < state.charges.length; i++) {
      const c = state.charges[i];
      const p = w2s(c);
      ctx.fillStyle = c.q > 0 ? '#ef4444' : '#3b82f6';
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(p.x, p.y, RADIUS_PX, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px var(--font-sans)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(c.q > 0 ? '+' : '−', p.x, p.y + 1);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
    }

    // cursor field probe
    if (state.showCursor && state.cursor.inside) {
      const cs = w2s(state.cursor);
      const f = E(state.cursor.x, state.cursor.y);
      const mag = Math.hypot(f.ex, f.ey);
      const len = Math.min(40, Math.log10(mag + 1) * 30);
      const nx = mag > 0 ? f.ex / mag : 0;
      const ny = mag > 0 ? f.ey / mag : 0;
      drawArrow(ctx, cs.x, cs.y, cs.x + nx * len, cs.y + ny * len, '#10b981');
      ctx.fillStyle = 'rgba(0,0,0,0.65)';
      ctx.fillRect(cs.x + 12, cs.y + 12, 110, 18);
      ctx.fillStyle = '#fff';
      ctx.font = '11px var(--font-mono)';
      ctx.fillText(`|E| = ${mag.toFixed(2)}`, cs.x + 18, cs.y + 25);
    }

    // hint
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '12px var(--font-sans)';
    ctx.fillText('Click empty space to add a charge · Drag a charge to move · Right-click to remove', 12, H - 12);
  }

  function drawVectors(ctx, W, H) {
    const grid = 22;
    for (let gy = 0; gy < H; gy += grid) {
      for (let gx = 0; gx < W; gx += grid) {
        const wx = gx / W, wy = gy / H;
        const f = E(wx, wy);
        const mag = Math.hypot(f.ex, f.ey);
        if (mag < 0.05) continue;
        const len = Math.min(grid * 0.7, Math.log10(mag + 1) * grid * 0.6);
        const nx = f.ex / mag, ny = f.ey / mag;
        const cx = gx + grid / 2, cy = gy + grid / 2;
        const hue = Math.min(60, mag * 5);
        ctx.strokeStyle = `hsla(${260 - hue * 4}, 80%, 60%, 0.9)`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(cx - nx * len / 2, cy - ny * len / 2);
        ctx.lineTo(cx + nx * len / 2, cy + ny * len / 2);
        ctx.stroke();
      }
    }
  }

  function drawPotential(ctx, W, H) {
    const cellSize = 4;
    const img = ctx.createImageData(W, H);
    const data = img.data;
    for (let y = 0; y < H; y += cellSize) {
      for (let x = 0; x < W; x += cellSize) {
        const v = potential(x / W, y / H);
        const t = Math.tanh(v * 0.3);
        let r, g, b;
        if (t > 0) { r = 239; g = 68 + (1 - t) * 100; b = 68 + (1 - t) * 100; }
        else { b = 239; g = 130 + (1 + t) * 80; r = 130 + (1 + t) * 80; }
        for (let dy = 0; dy < cellSize && y + dy < H; dy++) {
          for (let dx = 0; dx < cellSize && x + dx < W; dx++) {
            const idx = ((y + dy) * W + (x + dx)) * 4;
            data[idx] = r | 0;
            data[idx + 1] = g | 0;
            data[idx + 2] = b | 0;
            data[idx + 3] = 130;
          }
        }
      }
    }
    ctx.putImageData(img, 0, 0);

    // contour lines (rough)
    ctx.strokeStyle = 'rgba(255,255,255,0.45)';
    ctx.lineWidth = 1;
    const levels = [-3, -2, -1, -0.5, 0.5, 1, 2, 3];
    for (const L of levels) {
      ctx.beginPath();
      for (let y = 0; y < H; y += 6) {
        let prev = potential(0, y / H);
        for (let x = 6; x < W; x += 6) {
          const cur = potential(x / W, y / H);
          if ((prev - L) * (cur - L) < 0) {
            ctx.moveTo(x - 3, y);
            ctx.lineTo(x + 1, y);
          }
          prev = cur;
        }
      }
      ctx.stroke();
    }
  }

  function drawFieldLines(ctx, W, H) {
    ctx.lineWidth = 1.2;
    const linesPerCharge = 12;
    for (const c of state.charges) {
      if (c.q === 0) continue;
      const sign = c.q > 0 ? 1 : -1;
      ctx.strokeStyle = c.q > 0 ? 'rgba(239,68,68,0.85)' : 'rgba(59,130,246,0.85)';
      for (let i = 0; i < linesPerCharge; i++) {
        const ang = (i / linesPerCharge) * Math.PI * 2;
        let x = c.x + Math.cos(ang) * 0.02;
        let y = c.y + Math.sin(ang) * 0.02;
        ctx.beginPath();
        const startS = w2s({ x, y });
        ctx.moveTo(startS.x, startS.y);
        for (let step = 0; step < 600; step++) {
          const f = E(x, y);
          const mag = Math.hypot(f.ex, f.ey);
          if (mag < 0.001) break;
          const dx = sign * f.ex / mag * 0.004;
          const dy = sign * f.ey / mag * 0.004;
          x += dx; y += dy;
          if (x < -0.05 || x > 1.05 || y < -0.05 || y > 1.05) break;
          // stop if we hit another charge
          let stop = false;
          for (const c2 of state.charges) {
            if (c2 === c) continue;
            if (Math.hypot(x - c2.x, y - c2.y) < 0.025) { stop = true; break; }
          }
          ctx.lineTo(x * W, y * H);
          if (stop) break;
        }
        ctx.stroke();
      }
    }
  }

  function drawArrow(ctx, x1, y1, x2, y2, color) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    const ang = Math.atan2(y2 - y1, x2 - x1);
    const sz = 6;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - sz * Math.cos(ang - 0.5), y2 - sz * Math.sin(ang - 0.5));
    ctx.lineTo(x2 - sz * Math.cos(ang + 0.5), y2 - sz * Math.sin(ang + 0.5));
    ctx.closePath();
    ctx.fill();
  }

  // Mouse handlers
  function findCharge(sx, sy) {
    for (let i = 0; i < state.charges.length; i++) {
      const p = w2s(state.charges[i]);
      if (Math.hypot(sx - p.x, sy - p.y) <= RADIUS_PX + 4) return i;
    }
    return -1;
  }

  cv.canvas.style.cursor = 'crosshair';
  cv.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  cv.canvas.addEventListener('mousedown', (e) => {
    const rect = cv.canvas.getBoundingClientRect();
    const sx = (e.clientX - rect.left) * cv.width / rect.width;
    const sy = (e.clientY - rect.top) * cv.height / rect.height;
    const idx = findCharge(sx, sy);
    if (e.button === 2) {
      if (idx >= 0) state.charges.splice(idx, 1);
      return;
    }
    if (idx >= 0) {
      state.dragging = idx;
      cv.canvas.style.cursor = 'grabbing';
    } else {
      const w = s2w(sx, sy);
      state.charges.push({ x: w.x, y: w.y, q: state.addSign });
      state.dragging = state.charges.length - 1;
    }
  });
  window.addEventListener('mousemove', (e) => {
    const rect = cv.canvas.getBoundingClientRect();
    const sx = (e.clientX - rect.left) * cv.width / rect.width;
    const sy = (e.clientY - rect.top) * cv.height / rect.height;
    state.cursor = { x: sx / cv.width, y: sy / cv.height, inside: sx >= 0 && sx <= cv.width && sy >= 0 && sy <= cv.height };
    if (state.dragging != null) {
      const c = state.charges[state.dragging];
      if (c) { c.x = state.cursor.x; c.y = state.cursor.y; }
    }
  });
  window.addEventListener('mouseup', () => {
    state.dragging = null;
    cv.canvas.style.cursor = 'crosshair';
  });

  // controls
  const modeSel = select({
    label: 'Visualization',
    options: [
      { value: 'lines',     label: 'Field lines' },
      { value: 'vectors',   label: 'Vector grid' },
      { value: 'potential', label: 'Potential heatmap' },
    ],
    value: state.mode,
    onChange: (v) => { state.mode = v; },
  });
  const signSel = select({
    label: 'Add charge',
    options: [
      { value: '1',  label: 'Positive (+)' },
      { value: '-1', label: 'Negative (−)' },
    ],
    value: String(state.addSign),
    onChange: (v) => { state.addSign = Number(v); },
  });
  const probeT = toggle({ label: 'Show field probe at cursor', value: state.showCursor, onChange: (v) => { state.showCursor = v; } });
  const dipoleB = button({ label: 'Reset to dipole', primary: true, onClick: () => {
    state.charges = [{ x: 0.35, y: 0.5, q: +1 }, { x: 0.65, y: 0.5, q: -1 }];
  } });
  const clearB = button({ label: 'Clear', onClick: () => { state.charges = []; } });

  ctrlPanel.append(modeSel.el, signSel.el, probeT.el, row(dipoleB, clearB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
