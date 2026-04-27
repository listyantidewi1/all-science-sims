import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    nPlayers: 8,
    multiplier: 1.6,
    endowment: 10,
    learnRate: 0.15,
    punishment: false,
    punishCost: 1,
    punishStrength: 3,
  };

  // Each player has a contribution policy (mean, sigma) for adaptation
  let players = [];
  let history = []; // {avg, dev}
  let round = 0;

  function reset() {
    players = [];
    for (let i = 0; i < params.nPlayers; i++) {
      players.push({
        contribMean: params.endowment * (0.4 + Math.random() * 0.4),
        score: 0,
      });
    }
    history = [];
    round = 0;
  }
  reset();

  function step() {
    // Each player contributes (clipped to [0, endowment])
    const contribs = players.map((p) => Math.max(0, Math.min(params.endowment, p.contribMean + (Math.random() - 0.5) * 1.5)));
    const pot = contribs.reduce((s, v) => s + v, 0) * params.multiplier;
    const share = pot / players.length;
    // Individual payoff = endowment - contribution + share
    const payoffs = contribs.map((c) => params.endowment - c + share);

    // Punishment: each player can pay punishCost to subtract punishStrength from each free-rider (below average contribution)
    if (params.punishment) {
      const avgC = contribs.reduce((s, v) => s + v, 0) / contribs.length;
      for (let i = 0; i < players.length; i++) {
        if (contribs[i] < avgC * 0.8) {
          payoffs[i] -= params.punishStrength;
        } else {
          // pay cost to punish
          payoffs[i] -= params.punishCost * 0.3;
        }
      }
    }

    // Adapt: move contribMean toward what produced higher payoff in this group
    // Use simple imitation: each player has small chance to copy a better player
    for (let i = 0; i < players.length; i++) {
      players[i].score += payoffs[i];
      // pick another player
      const j = Math.floor(Math.random() * players.length);
      if (j !== i && payoffs[j] > payoffs[i]) {
        players[i].contribMean += (contribs[j] - players[i].contribMean) * params.learnRate;
      }
      // tiny mutation
      players[i].contribMean += (Math.random() - 0.5) * 0.4;
      players[i].contribMean = Math.max(0, Math.min(params.endowment, players[i].contribMean));
    }

    const avg = contribs.reduce((s, v) => s + v, 0) / contribs.length;
    const sd = Math.sqrt(contribs.reduce((s, v) => s + (v - avg) ** 2, 0) / contribs.length);
    history.push({ avg, sd, contribs });
    if (history.length > 200) history.shift();
    round++;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // current contributions as bars
    const halfW = W * 0.45;
    const barAreaH = H - 50;
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText('Contributions per player', 30, 24);
    if (history.length > 0) {
      const last = history[history.length - 1];
      const bw = (halfW - 60) / last.contribs.length;
      for (let i = 0; i < last.contribs.length; i++) {
        const c = last.contribs[i];
        const bh = (c / params.endowment) * (barAreaH - 60);
        const x = 30 + i * bw;
        const y = 30 + barAreaH - bh - 30;
        ctx.fillStyle = '#10b981';
        ctx.fillRect(x + 2, y, bw - 4, bh);
        ctx.fillStyle = 'rgba(120,130,150,0.85)';
        ctx.font = '10px var(--font-mono)';
        ctx.fillText(`${c.toFixed(1)}`, x + 4, y - 2);
      }
      // endowment line
      const endY = 30 + barAreaH - (params.endowment / params.endowment) * (barAreaH - 60) - 30;
      ctx.strokeStyle = 'rgba(245,158,11,0.5)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(30, endY); ctx.lineTo(halfW, endY);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // history graph
    const gx = halfW + 30, gy = 30, gw = W - gx - 30, gh = H - 60;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(gx, gy, gw, gh);
    if (history.length > 1) {
      const x2 = (i) => gx + (i / 200) * gw;
      const y2 = (v) => gy + gh - (v / params.endowment) * gh;
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      history.forEach((p, i) => i === 0 ? ctx.moveTo(x2(i), y2(p.avg)) : ctx.lineTo(x2(i), y2(p.avg)));
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Average contribution over rounds', gx + 6, gy - 4);
    ctx.fillText('round →', gx + gw - 60, gy + gh + 14);

    // header
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 280, 24);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText(`Round ${round}    multiplier ${params.multiplier.toFixed(1)}    punishment: ${params.punishment ? 'ON' : 'off'}`, 16, 24);
  }

  // controls
  const nS = slider({ label: 'Players', min: 3, max: 16, step: 1, value: params.nPlayers,
    onInput: (v) => { params.nPlayers = v; reset(); } });
  const mS = slider({ label: 'Multiplier', min: 1, max: 3, step: 0.05, value: params.multiplier, format: (v) => v.toFixed(2),
    onInput: (v) => { params.multiplier = v; } });
  const lrS = slider({ label: 'Learning rate', min: 0, max: 0.5, step: 0.01, value: params.learnRate, format: (v) => v.toFixed(2),
    onInput: (v) => { params.learnRate = v; } });
  const punT = toggle({ label: 'Punishment of free-riders', value: params.punishment, onChange: (v) => { params.punishment = v; } });
  const stepB = button({ label: 'Step round', onClick: () => step() });
  const runB = button({ label: 'Run 50', primary: true, onClick: () => { for (let i = 0; i < 50; i++) step(); } });
  const resetB = button({ label: 'Reset', onClick: reset });
  ctrlPanel.append(nS.el, mS.el, lrS.el, punT.el, row(stepB, runB, resetB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
