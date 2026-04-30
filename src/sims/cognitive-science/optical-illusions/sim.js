import { createCanvas, loop } from '../../../lib/canvas.js';
import { select, button, row, toggle } from '../../../lib/controls.js';

const ILLUSIONS = {
  mullerLyer: { name: 'Müller-Lyer (length)' },
  ponzo:      { name: 'Ponzo (perspective length)' },
  cafeWall:   { name: 'Café Wall (parallel lines)' },
  ebbinghaus: { name: 'Ebbinghaus (size context)' },
  hering:     { name: 'Hering (parallel lines bowed)' },
  checker:    { name: 'Checker shadow (color = gray)' },
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { which: 'mullerLyer', overlay: false };

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    if (params.which === 'mullerLyer') drawML(ctx, W, H);
    else if (params.which === 'ponzo') drawPonzo(ctx, W, H);
    else if (params.which === 'cafeWall') drawCafe(ctx, W, H);
    else if (params.which === 'ebbinghaus') drawEbb(ctx, W, H);
    else if (params.which === 'hering') drawHering(ctx, W, H);
    else if (params.which === 'checker') drawChecker(ctx, W, H);

    // Header
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 380, 38);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-sans)';
    ctx.fillText(ILLUSIONS[params.which].name, 16, 30);
  }

  function drawML(ctx, W, H) {
    const cy = H / 2;
    const len = 280;
    const cx = W / 2;
    // Top: arrows pointing in (looks shorter)
    drawLineWithArrows(ctx, cx - len, cy - 60, cx + len, cy - 60, 'in');
    // Bottom: arrows pointing out (looks longer) — same actual length
    drawLineWithArrows(ctx, cx - len, cy + 60, cx + len, cy + 60, 'out');
    if (params.overlay) {
      ctx.strokeStyle = 'rgba(251,191,36,0.7)';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(cx - len, cy - 100); ctx.lineTo(cx - len, cy + 100);
      ctx.moveTo(cx + len, cy - 100); ctx.lineTo(cx + len, cy + 100);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#fbbf24';
      ctx.font = '11px var(--font-mono)';
      ctx.fillText('both line ends align — same length', cx - 100, cy + 140);
    }
  }

  function drawLineWithArrows(ctx, x1, y, x2, y2, dir) {
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y2); ctx.stroke();
    const sz = 24;
    function arrow(x, y, leftSide, dirIn) {
      const ang = leftSide ? Math.PI / 4 : 3 * Math.PI / 4;
      const sign = dirIn ? -1 : 1;
      ctx.beginPath();
      ctx.moveTo(x + sign * sz * Math.cos(ang), y - sz * Math.sin(ang));
      ctx.lineTo(x, y);
      ctx.lineTo(x + sign * sz * Math.cos(ang), y + sz * Math.sin(ang));
      ctx.stroke();
    }
    arrow(x1, y, true, dir === 'in');
    arrow(x2, y2, false, dir === 'in');
  }

  function drawPonzo(ctx, W, H) {
    const cx = W / 2, cy = H / 2;
    // Two converging "track" lines
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx - 40, cy + 200); ctx.lineTo(cx - 250, cy - 200);
    ctx.moveTo(cx + 40, cy + 200); ctx.lineTo(cx + 250, cy - 200);
    ctx.stroke();

    // Two same-length horizontal bars — top bar near "vanishing point" looks longer.
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 6;
    const barLen = 200;
    ctx.beginPath();
    ctx.moveTo(cx - barLen / 2, cy - 100); ctx.lineTo(cx + barLen / 2, cy - 100);
    ctx.moveTo(cx - barLen / 2, cy + 100); ctx.lineTo(cx + barLen / 2, cy + 100);
    ctx.stroke();

    if (params.overlay) {
      ctx.strokeStyle = 'rgba(251,191,36,0.5)';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(cx - barLen / 2, cy - 200); ctx.lineTo(cx - barLen / 2, cy + 200);
      ctx.moveTo(cx + barLen / 2, cy - 200); ctx.lineTo(cx + barLen / 2, cy + 200);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  function drawCafe(ctx, W, H) {
    const tile = 36;
    const startX = (W - 14 * tile) / 2;
    const startY = 80;
    for (let row = 0; row < 8; row++) {
      const offset = (row % 2 === 0 ? 0 : tile / 2);
      for (let col = 0; col < 14; col++) {
        const x = startX + col * tile + offset;
        const y = startY + row * tile;
        ctx.fillStyle = (col % 2 === 0) ? '#0b1220' : '#fff';
        ctx.fillRect(x, y, tile, tile);
      }
      // Mortar line
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(startX, startY + (row + 1) * tile);
      ctx.lineTo(startX + 14 * tile, startY + (row + 1) * tile);
      ctx.stroke();
    }
    if (params.overlay) {
      ctx.strokeStyle = 'rgba(251,191,36,0.7)';
      ctx.lineWidth = 2;
      for (let row = 0; row <= 8; row++) {
        ctx.beginPath();
        ctx.moveTo(startX, startY + row * tile); ctx.lineTo(startX + 14 * tile, startY + row * tile);
        ctx.stroke();
      }
    }
  }

  function drawEbb(ctx, W, H) {
    const cx1 = W * 0.30, cx2 = W * 0.70, cy = H / 2;
    // Left center small surrounded by big circles
    ctx.fillStyle = '#94a3b8';
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(cx1 + Math.cos(a) * 80, cy + Math.sin(a) * 80, 28, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.arc(cx1, cy, 28, 0, Math.PI * 2); ctx.fill();
    // Right: same center surrounded by small circles
    ctx.fillStyle = '#94a3b8';
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(cx2 + Math.cos(a) * 60, cy + Math.sin(a) * 60, 10, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.arc(cx2, cy, 28, 0, Math.PI * 2); ctx.fill();

    if (params.overlay) {
      ctx.strokeStyle = '#10b981';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(cx1, cy, 28, 0, Math.PI * 2);
      ctx.arc(cx2, cy, 28, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  function drawHering(ctx, W, H) {
    const cx = W / 2, cy = H / 2;
    // Radial fan
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1;
    for (let i = 0; i < 60; i++) {
      const a = (i / 60) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a) * 600, cy + Math.sin(a) * 600);
      ctx.stroke();
    }
    // Two parallel horizontal lines
    ctx.strokeStyle = params.overlay ? '#fbbf24' : '#fff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(80, cy - 80); ctx.lineTo(W - 80, cy - 80);
    ctx.moveTo(80, cy + 80); ctx.lineTo(W - 80, cy + 80);
    ctx.stroke();
  }

  function drawChecker(ctx, W, H) {
    const cx = W / 2, cy = H / 2;
    const tile = 50;
    const start = cx - 5 * tile, top = cy - 4 * tile;
    // Checkerboard
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 10; c++) {
        const dark = (r + c) % 2 === 0;
        ctx.fillStyle = dark ? '#374151' : '#cbd5e1';
        ctx.fillRect(start + c * tile, top + r * tile, tile, tile);
      }
    }
    // Cylinder shadow — make all squares in column 4-6 darker
    for (let r = 0; r < 8; r++) {
      for (let c = 4; c < 7; c++) {
        ctx.fillStyle = 'rgba(0,0,0,0.35)';
        ctx.fillRect(start + c * tile, top + r * tile, tile, tile);
      }
    }
    // Cylinder
    ctx.fillStyle = '#0ea5e9';
    ctx.fillRect(start + 5.5 * tile - 24, top - 60, 48, 60);

    // Mark "A" (light square outside shadow) and "B" (dark square inside shadow that's actually the same color)
    const Ax = start + 1 * tile + tile / 2, Ay = top + 5 * tile + tile / 2;
    const Bx = start + 5 * tile + tile / 2, By = top + 3 * tile + tile / 2;
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px var(--font-mono)';
    ctx.textAlign = 'center';
    ctx.fillText('A', Ax, Ay + 4);
    ctx.fillText('B', Bx, By + 4);
    ctx.textAlign = 'left';

    if (params.overlay) {
      // Connect A and B with a strip in their actual color (which is the same).
      ctx.fillStyle = '#7c2d12';   // approximate the actual color
      ctx.fillRect(Ax - 20, Ay + 16, Bx - Ax + 40, 20);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px var(--font-mono)';
      ctx.fillText('A and B are the same color', Ax + 80, Ay + 60);
    }
  }

  // controls
  const sel = select({
    label: 'Illusion',
    options: Object.entries(ILLUSIONS).map(([k, v]) => ({ value: k, label: v.name })),
    value: params.which,
    onChange: (v) => { params.which = v; },
  });
  const overlayT = toggle({ label: 'Show ruler / proof overlay', value: params.overlay, onChange: (v) => { params.overlay = v; } });
  ctrlPanel.append(sel.el, overlayT.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
