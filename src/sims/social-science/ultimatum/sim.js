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
    pot: 10,
    proposerOffer: 0.5,   // fraction the proposer offers to responder
    responderThreshold: 0.3,  // accept iff offer ≥ threshold
    rounds: 0,
    accepted: 0,
    proposerTotal: 0,
    responderTotal: 0,
    history: [],   // {offer, accept}
  };

  function play(offer = params.proposerOffer) {
    const accept = offer >= params.responderThreshold - 1e-9;
    params.rounds++;
    if (accept) {
      params.accepted++;
      params.proposerTotal += params.pot * (1 - offer);
      params.responderTotal += params.pot * offer;
    }
    params.history.push({ offer, accept });
    if (params.history.length > 200) params.history.shift();
  }

  function reset() {
    params.rounds = 0;
    params.accepted = 0;
    params.proposerTotal = 0;
    params.responderTotal = 0;
    params.history = [];
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Pie chart of current proposed split
    const cx = W * 0.22, cy = H / 2, r = Math.min(W * 0.18, H * 0.35);
    const offer = params.proposerOffer;
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + (1 - offer) * Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, -Math.PI / 2 + (1 - offer) * Math.PI * 2, -Math.PI / 2 + 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    // labels
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.textAlign = 'center';
    ctx.fillText(`Proposer keeps`, cx, cy - r - 14);
    ctx.fillText(`$${(params.pot * (1 - offer)).toFixed(2)}`, cx - r - 30, cy);
    ctx.fillText(`Responder offered`, cx, cy + r + 14);
    ctx.fillText(`$${(params.pot * offer).toFixed(2)}`, cx + r + 30, cy);
    ctx.textAlign = 'left';

    // History bar chart on right
    const hx = W * 0.45, hy = 50, hw = W - hx - 30, hh = H - 90;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(hx, hy, hw, hh);

    // threshold line
    const tY = hy + hh - params.responderThreshold * hh;
    ctx.strokeStyle = 'rgba(245,158,11,0.6)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(hx, tY); ctx.lineTo(hx + hw, tY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(245,158,11,0.85)';
    ctx.font = '10px var(--font-mono)';
    ctx.fillText(`threshold ${(params.responderThreshold * 100).toFixed(0)}%`, hx + 6, tY - 4);

    // bars
    if (params.history.length > 0) {
      const bw = hw / params.history.length;
      for (let i = 0; i < params.history.length; i++) {
        const h = params.history[i];
        const x = hx + i * bw;
        const yh = h.offer * hh;
        ctx.fillStyle = h.accept ? '#10b981' : '#ef4444';
        ctx.fillRect(x + 1, hy + hh - yh, Math.max(1, bw - 1), yh);
      }
    }

    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Offers per round (green = accepted, red = rejected)', hx + 6, hy - 4);

    // header
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 32);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText(`Rounds ${params.rounds}    Accepted ${params.accepted}    P-total $${params.proposerTotal.toFixed(2)}    R-total $${params.responderTotal.toFixed(2)}`, 14, 28);
  }

  // controls
  const offerS = slider({ label: 'Proposer offer (% to responder)', min: 0, max: 1, step: 0.01, value: params.proposerOffer, format: (v) => `${(v*100).toFixed(0)}%`,
    onInput: (v) => { params.proposerOffer = v; } });
  const thresS = slider({ label: 'Responder threshold', min: 0, max: 1, step: 0.01, value: params.responderThreshold, format: (v) => `${(v*100).toFixed(0)}%`,
    onInput: (v) => { params.responderThreshold = v; } });
  const playB = button({ label: 'Play 1 round', primary: true, onClick: () => play() });
  const play100B = button({ label: 'Play 100 (random offers)', onClick: () => {
    for (let i = 0; i < 100; i++) play(Math.random());
  } });
  const resetB = button({ label: 'Reset', onClick: reset });
  ctrlPanel.append(offerS.el, thresS.el, row(playB, play100B, resetB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
