/**
 * hoverProbe — track mouse hover over a canvas and expose a "probe" that
 * the sim's draw loop can read each frame to render a crosshair / tooltip.
 *
 *   const probe = hoverProbe(cv.canvas, (x, y) => {
 *     // return null to hide, or { x, y, label } in canvas-local CSS pixels
 *     ...
 *   });
 *   // in draw loop:
 *   const p = probe.get();
 *   if (p) drawCrosshair(ctx, p, { ... });
 *   // teardown: probe.destroy()
 */
export function hoverProbe(canvas, getProbe) {
  let current = null;

  function localPos(e) {
    const r = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) * (canvas.width / r.width) / (window.devicePixelRatio || 1),
      y: (e.clientY - r.top) * (canvas.height / r.height) / (window.devicePixelRatio || 1),
    };
  }

  function move(e) {
    const p = localPos(e);
    current = getProbe(p.x, p.y);
  }
  function leave() { current = null; }

  canvas.addEventListener('pointermove', move);
  canvas.addEventListener('pointerleave', leave);

  return {
    get: () => current,
    set: (p) => { current = p; },
    destroy() {
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerleave', leave);
    },
  };
}

/**
 * drawCrosshair — render a vertical hairline + dot + tooltip at probe.x,
 * within the rect [x, y, w, h]. probe.label is shown in the tooltip.
 *
 *   drawCrosshair(ctx, probe, {
 *     bounds: { x, y, w, h },
 *     color: '#fbbf24',
 *     vertical: true,    // draw vertical hairline (default true)
 *     horizontal: false, // also draw horizontal hairline
 *     dot: true,
 *   });
 */
export function drawCrosshair(ctx, probe, opts = {}) {
  if (!probe) return;
  const { bounds, color = '#fbbf24', vertical = true, horizontal = false, dot = true, label = probe.label } = opts;
  const px = probe.x;
  const py = probe.y;

  ctx.save();
  if (bounds) {
    ctx.beginPath();
    ctx.rect(bounds.x, bounds.y, bounds.w, bounds.h);
    ctx.clip();
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 3]);
  if (vertical) {
    const y0 = bounds ? bounds.y : 0;
    const y1 = bounds ? bounds.y + bounds.h : ctx.canvas.height;
    ctx.beginPath();
    ctx.moveTo(px + 0.5, y0); ctx.lineTo(px + 0.5, y1);
    ctx.stroke();
  }
  if (horizontal) {
    const x0 = bounds ? bounds.x : 0;
    const x1 = bounds ? bounds.x + bounds.w : ctx.canvas.width;
    ctx.beginPath();
    ctx.moveTo(x0, py + 0.5); ctx.lineTo(x1, py + 0.5);
    ctx.stroke();
  }
  ctx.setLineDash([]);
  if (dot) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  if (label) drawTooltip(ctx, label, px, py, bounds);
}

/**
 * drawTooltip — small dark pill anchored near (x, y). Auto-flips left/up
 * to stay within `bounds` (or canvas).
 */
export function drawTooltip(ctx, text, x, y, bounds) {
  const lines = Array.isArray(text) ? text : String(text).split('\n');
  ctx.save();
  ctx.font = '12px var(--font-mono, monospace)';
  let w = 0;
  for (const ln of lines) w = Math.max(w, ctx.measureText(ln).width);
  const padX = 8, padY = 6, lineH = 14;
  const boxW = w + padX * 2;
  const boxH = lines.length * lineH + padY * 2;
  const bx0 = bounds ? bounds.x : 0;
  const by0 = bounds ? bounds.y : 0;
  const bx1 = bounds ? bounds.x + bounds.w : ctx.canvas.width;
  const by1 = bounds ? bounds.y + bounds.h : ctx.canvas.height;
  let bx = x + 12;
  let by = y - boxH - 8;
  if (bx + boxW > bx1) bx = x - boxW - 12;
  if (bx < bx0) bx = bx0 + 4;
  if (by < by0) by = y + 12;
  if (by + boxH > by1) by = by1 - boxH - 4;

  ctx.fillStyle = 'rgba(11,18,32,0.92)';
  ctx.strokeStyle = 'rgba(120,130,150,0.45)';
  ctx.lineWidth = 1;
  roundRect(ctx, bx, by, boxW, boxH, 6);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#e6edf3';
  ctx.textBaseline = 'top';
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], bx + padX, by + padY + i * lineH);
  }
  ctx.restore();
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
