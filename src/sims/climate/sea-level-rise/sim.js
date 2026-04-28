import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';
import { hoverProbe, drawCrosshair } from '../../../lib/chart.js';
import { dragHandle } from '../../../lib/handle.js';

// Procedurally generated elevation grid.

const COLS = 200, ROWS = 120;

function generate(seed, profile) {
  // Multi-octave value-noise. profile: 'mixed' (continent + low coast),
  // 'flat' (Bangladesh-like), 'mountainous' (Norway-like).
  const grid = new Float32Array(COLS * ROWS);
  function rng() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
  // Random matrix of base values; smooth via moving average.
  for (let i = 0; i < grid.length; i++) grid[i] = rng();

  // Multiple smoothing passes with decreasing weight to give multi-scale texture.
  for (let pass = 0; pass < 8; pass++) {
    const next = new Float32Array(grid.length);
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        let s = 0, n = 0;
        for (let dy = -2; dy <= 2; dy++) {
          for (let dx = -2; dx <= 2; dx++) {
            const nx = x + dx, ny = y + dy;
            if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) continue;
            s += grid[ny * COLS + nx]; n++;
          }
        }
        next[y * COLS + x] = s / n;
      }
    }
    for (let i = 0; i < grid.length; i++) grid[i] = grid[i] * 0.5 + next[i] * 0.5;
  }

  // Map [0,1] noise to elevation in meters depending on profile.
  const out = new Float32Array(grid.length);
  for (let i = 0; i < grid.length; i++) {
    const v = grid[i];
    let e;
    if (profile === 'flat') e = (v - 0.4) * 25;          // mostly low, max ~15m
    else if (profile === 'mountainous') e = (v - 0.3) * 250; // up to ~150m
    else e = (v - 0.4) * 80;                              // mixed: −30..50m
    out[i] = e;
  }
  return out;
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    seaLevel: 0, // meters above today
    profile: 'mixed',
    seed: 12345,
  };

  let elev = generate(params.seed, params.profile);

  function regenerate() {
    elev = generate(params.seed, params.profile);
  }

  let mapRect = null, hypsRect = null;

  function fractionFlooded(level) {
    // Count cells where elev < level AND original elev < 0 doesn't count (sea is sea anyway)
    let landCells = 0, flooded = 0;
    for (let i = 0; i < elev.length; i++) {
      const e = elev[i];
      if (e >= 0) landCells++;
      if (e < level) flooded++;
    }
    // Actual measure: of all originally-land cells, how many sit below current sea level.
    let landNowFlooded = 0;
    for (let i = 0; i < elev.length; i++) {
      if (elev[i] >= 0 && elev[i] < level) landNowFlooded++;
    }
    return { landNowFlooded, landCells, frac: landCells > 0 ? landNowFlooded / landCells : 0 };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Map on the left
    const mapW = W * 0.65;
    const mapH = H - 60;
    mapRect = { x: 30, y: 30, w: mapW - 60, h: mapH };
    drawMap(ctx, 30, 30, mapW - 60, mapH);

    // Hypsometric curve on the right
    const hX = mapW + 10, hY = 60;
    const hW = W - hX - 30, hH = H - hY - 60;
    hypsRect = { x: hX, y: hY, w: hW, h: hH };
    drawHypso(ctx, hX, hY, hW, hH);

    // Hover crosshair on hypso curve
    const probe = hover.get();
    if (probe) drawCrosshair(ctx, probe, { bounds: hypsRect, color: '#fbbf24', label: probe.label });
  }

  function drawMap(ctx, x, y, w, h) {
    const cw = w / COLS, ch = h / ROWS;
    for (let yy = 0; yy < ROWS; yy++) {
      for (let xx = 0; xx < COLS; xx++) {
        const e = elev[yy * COLS + xx];
        let color;
        if (e < params.seaLevel) {
          // Underwater — depth-based blue
          const d = Math.max(-30, params.seaLevel - e) / 30;
          color = `rgb(${Math.round(20 + d * 30)},${Math.round(60 + d * 60)},${Math.round(140 + d * 80)})`;
        } else {
          // Land — elevation-based green→brown
          const a = Math.min(1, e / 100);
          color = `rgb(${Math.round(34 + a * 165)},${Math.round(120 - a * 50)},${Math.round(50 - a * 30)})`;
        }
        ctx.fillStyle = color;
        ctx.fillRect(x + xx * cw, y + yy * ch, cw + 0.5, ch + 0.5);
      }
    }
    // Coast line at sea level
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1;
    // Quick contour — mark cells whose neighbors cross sea level.
    for (let yy = 0; yy < ROWS - 1; yy++) {
      for (let xx = 0; xx < COLS - 1; xx++) {
        const a = elev[yy * COLS + xx], b = elev[yy * COLS + xx + 1];
        if ((a - params.seaLevel) * (b - params.seaLevel) < 0) {
          ctx.fillStyle = '#fbbf24';
          ctx.fillRect(x + xx * cw, y + yy * ch, 1, 1);
        }
      }
    }

    // Stats overlay
    const r = fractionFlooded(params.seaLevel);
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(x + 8, y + 8, 250, 60);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-mono)';
    ctx.fillText(`Sea level: +${params.seaLevel.toFixed(2)} m`, x + 16, y + 28);
    ctx.font = '12px var(--font-mono)';
    ctx.fillStyle = params.seaLevel > 0 ? '#ef4444' : '#10b981';
    ctx.fillText(`Land flooded: ${(r.frac * 100).toFixed(1)}%`, x + 16, y + 46);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '10px var(--font-mono)';
    ctx.fillText(`(${r.landNowFlooded} of ${r.landCells} land cells)`, x + 16, y + 60);
  }

  function drawHypso(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('Hypsometric curve', x + 6, y - 8);
    ctx.font = '10px var(--font-mono)';
    ctx.fillText('% land below ⤒', x + 6, y + h + 14);

    // Compute % of land below each elevation from -5 to +60.
    const E_MIN = -5, E_MAX = 60;
    const land = elev.filter((e) => e >= 0).slice().sort((a, b) => a - b);
    const total = land.length;

    function fracBelow(e) {
      let lo = 0, hi = total;
      while (lo < hi) { const m = (lo + hi) >> 1; if (land[m] < e) lo = m + 1; else hi = m; }
      return lo / total;
    }

    const x2 = (frac) => x + frac * w;
    const y2 = (e) => y + h - ((e - E_MIN) / (E_MAX - E_MIN)) * (h - 16) - 8;

    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= 60; i++) {
      const e = E_MIN + (i / 60) * (E_MAX - E_MIN);
      const f = fracBelow(e);
      const sx = x2(f), sy = y2(e);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // Current sea level horizontal line
    ctx.strokeStyle = '#fbbf24';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(x, y2(params.seaLevel)); ctx.lineTo(x + w, y2(params.seaLevel));
    ctx.stroke();
    ctx.setLineDash([]);

    // y-axis labels
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '10px var(--font-mono)';
    for (let e = 0; e <= 60; e += 10) {
      ctx.fillText(`${e}m`, x - 26, y2(e) + 3);
    }
  }

  // Hover the hypsometric curve.
  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    if (!hypsRect) return null;
    if (sx < hypsRect.x || sx > hypsRect.x + hypsRect.w || sy < hypsRect.y || sy > hypsRect.y + hypsRect.h) return null;
    const E_MIN = -5, E_MAX = 60;
    const e = E_MIN + ((hypsRect.y + hypsRect.h - 8 - sy) / (hypsRect.h - 16)) * (E_MAX - E_MIN);
    const r = fractionFlooded(e);
    return { x: sx, y: sy, label: [`elevation = ${e.toFixed(2)} m`, `${(r.frac * 100).toFixed(1)}% land below`] };
  });

  // Drag the hypso line vertically to set sea level.
  const drag = dragHandle(cv.canvas, {
    hitTest: (sx, sy) => hypsRect && sx >= hypsRect.x && sx <= hypsRect.x + hypsRect.w && sy >= hypsRect.y && sy <= hypsRect.y + hypsRect.h ? 'sl' : null,
    onDrag(_id, _sx, sy) {
      const E_MIN = -5, E_MAX = 60;
      const e = E_MIN + ((hypsRect.y + hypsRect.h - 8 - sy) / (hypsRect.h - 16)) * (E_MAX - E_MIN);
      params.seaLevel = Math.max(0, Math.min(50, e));
      sS.value = params.seaLevel;
    },
    cursor: 'crosshair',
    hoverCursor: 'ns-resize',
  });

  // controls
  const sS = slider({ label: 'Sea level rise (m)', min: 0, max: 50, step: 0.1, value: params.seaLevel, format: (v) => `${v.toFixed(2)}m`,
    onInput: (v) => { params.seaLevel = v; } });
  const profSel = select({
    label: 'Coastal profile',
    options: [
      { value: 'mixed', label: 'Mixed (typical)' },
      { value: 'flat',  label: 'Flat (delta / Bangladesh-like)' },
      { value: 'mountainous', label: 'Mountainous (Norway-like)' },
    ],
    value: params.profile,
    onChange: (v) => { params.profile = v; regenerate(); },
  });
  const newB = button({ label: 'New coastline', primary: true, onClick: () => { params.seed = Math.floor(Math.random() * 1e6); regenerate(); } });

  ctrlPanel.append(sS.el, profSel.el, row(newB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); hover.destroy(); drag.destroy(); cv.destroy(); };
}
