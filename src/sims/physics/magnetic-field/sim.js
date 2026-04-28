import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 1 });

  const params = {
    current: 5,           // amps
    direction: 'out',     // 'out' (toward viewer) or 'in'
    cursorR: 80,          // probe distance from wire (px)
  };
  let cursor = { x: 0, y: 0, inside: false };

  const MU0 = 4 * Math.PI * 1e-7; // T·m/A

  function fieldAt(rPx) {
    // Convert px to meters: assume 100 px = 1 m for visualization
    const r = rPx / 100;
    return MU0 * params.current / (2 * Math.PI * Math.max(r, 0.005));
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const cx = W / 2, cy = H / 2;

    // Field rings (illustrative)
    for (let i = 1; i <= 5; i++) {
      const r = i * Math.min(W, H) * 0.08;
      ctx.strokeStyle = `rgba(96,165,250,${0.3 - i * 0.03})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Field arrows on a polar-ish grid
    const sign = params.direction === 'out' ? 1 : -1;
    const I = params.current;
    for (let r = 30; r < Math.min(W, H) / 2 - 20; r += 36) {
      const arrows = Math.max(8, Math.floor(r / 6));
      for (let i = 0; i < arrows; i++) {
        const ang = (i / arrows) * Math.PI * 2;
        const x = cx + Math.cos(ang) * r;
        const y = cy + Math.sin(ang) * r;
        // tangent direction (perpendicular to radial)
        const tx = -Math.sin(ang) * sign;
        const ty = Math.cos(ang) * sign;
        // length scales with field magnitude
        const Bmag = MU0 * I / (2 * Math.PI * (r / 100));
        const len = Math.min(20, Bmag * 5e6);
        if (len < 2) continue;
        ctx.strokeStyle = `rgba(96,165,250, ${Math.min(1, len / 18)})`;
        ctx.fillStyle = ctx.strokeStyle;
        ctx.lineWidth = 1.5;
        const ax1 = x - tx * len / 2;
        const ay1 = y - ty * len / 2;
        const ax2 = x + tx * len / 2;
        const ay2 = y + ty * len / 2;
        ctx.beginPath();
        ctx.moveTo(ax1, ay1); ctx.lineTo(ax2, ay2);
        ctx.stroke();
        // arrow head
        const ah = 4;
        const angA = Math.atan2(ay2 - ay1, ax2 - ax1);
        ctx.beginPath();
        ctx.moveTo(ax2, ay2);
        ctx.lineTo(ax2 - ah * Math.cos(angA - 0.5), ay2 - ah * Math.sin(angA - 0.5));
        ctx.lineTo(ax2 - ah * Math.cos(angA + 0.5), ay2 - ah * Math.sin(angA + 0.5));
        ctx.closePath();
        ctx.fill();
      }
    }

    // wire (a circle with dot or X)
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(cx, cy, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#0b1220';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#0b1220';
    if (params.direction === 'out') {
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - 7, cy - 7); ctx.lineTo(cx + 7, cy + 7);
      ctx.moveTo(cx + 7, cy - 7); ctx.lineTo(cx - 7, cy + 7);
      ctx.stroke();
    }

    // probe at cursor
    if (cursor.inside) {
      const dx = cursor.x - cx, dy = cursor.y - cy;
      const r = Math.hypot(dx, dy);
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(cursor.x, cursor.y, 5, 0, Math.PI * 2);
      ctx.fill();
      // local field arrow
      const tx = -dy / r * sign;
      const ty = dx / r * sign;
      const len = 28;
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cursor.x - tx * len / 2, cursor.y - ty * len / 2);
      ctx.lineTo(cursor.x + tx * len / 2, cursor.y + ty * len / 2);
      ctx.stroke();
      const B = fieldAt(r);
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(cursor.x + 12, cursor.y - 30, 130, 24);
      ctx.fillStyle = '#fff';
      ctx.font = '11px var(--font-mono)';
      ctx.fillText(`B = ${(B*1e6).toFixed(2)} µT`, cursor.x + 18, cursor.y - 14);
    }

    // info
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 280, 44);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`I = ${params.current.toFixed(1)} A    direction: ${params.direction === 'out' ? 'out of page' : 'into page'}`, 16, 26);
    ctx.fillText(`B = µ₀I/(2πr)`, 16, 44);

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Move mouse to probe field', 12, H - 12);
  }

  // mouse probe
  function localPos(e) {
    const rect = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * cv.width / rect.width, y: (e.clientY - rect.top) * cv.height / rect.height };
  }
  cv.canvas.addEventListener('mousemove', (e) => {
    const p = localPos(e);
    cursor = { x: p.x, y: p.y, inside: true };
  });
  cv.canvas.addEventListener('mouseleave', () => { cursor.inside = false; });

  // controls
  const IS = slider({ label: 'Current I (A)', min: 0, max: 20, step: 0.1, value: params.current, format: (v) => v.toFixed(1),
    onInput: (v) => { params.current = v; } });
  const dirSel = select({
    label: 'Current direction',
    options: [{ value: 'out', label: 'Out of page (toward you)' }, { value: 'in', label: 'Into page (away)' }],
    value: params.direction,
    onChange: (v) => { params.direction = v; },
  });
  ctrlPanel.append(IS.el, dirSel.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
