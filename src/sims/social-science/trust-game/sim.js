import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    endowment: 10,
    multiplier: 3,
    sendFrac: 0.5,
    returnFrac: 0.33,
  };

  function payoffs() {
    const sent = params.endowment * params.sendFrac;
    const tripled = sent * params.multiplier;
    const returned = tripled * params.returnFrac;
    const p1 = (params.endowment - sent) + returned;
    const p2 = tripled - returned;
    return { sent, tripled, returned, p1, p2, total: p1 + p2 };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const r = payoffs();

    // Two players as boxes
    const p1x = W * 0.18, p2x = W * 0.78, py = H / 2;

    // Player 1
    ctx.fillStyle = '#0ea5e9';
    ctx.fillRect(p1x - 60, py - 60, 120, 120);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(p1x - 60, py - 60, 120, 120);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-sans)';
    ctx.textAlign = 'center';
    ctx.fillText('Player 1', p1x, py - 30);
    ctx.font = 'bold 22px var(--font-mono)';
    ctx.fillText(`$${r.p1.toFixed(2)}`, p1x, py + 8);
    ctx.font = '11px var(--font-mono)';
    ctx.fillText('start: $10', p1x, py + 36);

    // Player 2
    ctx.fillStyle = '#ec4899';
    ctx.fillRect(p2x - 60, py - 60, 120, 120);
    ctx.strokeStyle = '#fff';
    ctx.strokeRect(p2x - 60, py - 60, 120, 120);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-sans)';
    ctx.fillText('Player 2', p2x, py - 30);
    ctx.font = 'bold 22px var(--font-mono)';
    ctx.fillText(`$${r.p2.toFixed(2)}`, p2x, py + 8);
    ctx.textAlign = 'left';

    // Send arrow (top)
    if (r.sent > 0) {
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2 + r.sent;
      ctx.beginPath();
      ctx.moveTo(p1x + 60, py - 30); ctx.lineTo(p2x - 60, py - 30);
      ctx.stroke();
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.moveTo(p2x - 60, py - 30);
      ctx.lineTo(p2x - 70, py - 36);
      ctx.lineTo(p2x - 70, py - 24);
      ctx.closePath();
      ctx.fill();
      ctx.font = 'bold 12px var(--font-mono)';
      ctx.fillText(`sends $${r.sent.toFixed(2)} → ×${params.multiplier} = $${r.tripled.toFixed(2)}`, (p1x + p2x) / 2 - 80, py - 36);
    }

    // Return arrow (bottom)
    if (r.returned > 0) {
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2 + r.returned * 0.3;
      ctx.beginPath();
      ctx.moveTo(p2x - 60, py + 30); ctx.lineTo(p1x + 60, py + 30);
      ctx.stroke();
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.moveTo(p1x + 60, py + 30);
      ctx.lineTo(p1x + 70, py + 24);
      ctx.lineTo(p1x + 70, py + 36);
      ctx.closePath();
      ctx.fill();
      ctx.font = 'bold 12px var(--font-mono)';
      ctx.fillText(`returns $${r.returned.toFixed(2)}`, (p1x + p2x) / 2 - 50, py + 50);
    }

    // Total welfare
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 320, 44);
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 14px var(--font-mono)';
    ctx.fillText(`Total welfare: $${r.total.toFixed(2)}`, 16, 28);
    ctx.fillStyle = '#fbbf24';
    ctx.font = '11px var(--font-mono)';
    const ratio = r.p2 > 0 && r.p1 > 0 ? `${(r.p1 / r.total * 100).toFixed(0)} : ${(r.p2 / r.total * 100).toFixed(0)}` : '—';
    ctx.fillText(`P1:P2 split = ${ratio}    (no-trust baseline = $${params.endowment})`, 16, 46);
  }

  // controls
  const sS = slider({ label: 'P1 sends fraction', min: 0, max: 1, step: 0.01, value: params.sendFrac, format: (v) => `${(v*100).toFixed(0)}%`,
    onInput: (v) => { params.sendFrac = v; } });
  const rS = slider({ label: 'P2 returns fraction (of tripled)', min: 0, max: 1, step: 0.01, value: params.returnFrac, format: (v) => `${(v*100).toFixed(0)}%`,
    onInput: (v) => { params.returnFrac = v; } });
  const mS = slider({ label: 'Multiplier', min: 1, max: 5, step: 0.5, value: params.multiplier, format: (v) => v.toFixed(1),
    onInput: (v) => { params.multiplier = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, p] of [
    ['Empirical avg', { sendFrac: 0.5, returnFrac: 0.33 }],
    ['Equal split', { sendFrac: 1.0, returnFrac: 0.5 }],
    ['Selfish P2', { sendFrac: 1.0, returnFrac: 0.0 }],
    ['No trust', { sendFrac: 0, returnFrac: 0 }],
  ]) {
    const b = button({ label: name, onClick: () => { Object.assign(params, p); sS.value = params.sendFrac; rS.value = params.returnFrac; } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(sS.el, rS.el, mS.el, presetRow);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
