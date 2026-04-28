import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';

function gaussian() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    distribution: 'normal',  // 'normal' | 'bimodal' | 'uniform' | 'skewed'
    candidates: [{ x: 0.3, color: '#0ea5e9', name: 'A' }, { x: 0.7, color: '#ec4899', name: 'B' }],
    autoOptimize: false,
  };
  let voters = [];
  let drag = -1;

  function regenerate() {
    voters = [];
    for (let i = 0; i < 200; i++) {
      let v;
      if (params.distribution === 'normal') v = 0.5 + gaussian() * 0.15;
      else if (params.distribution === 'uniform') v = Math.random();
      else if (params.distribution === 'skewed') v = Math.pow(Math.random(), 0.4);
      else if (params.distribution === 'bimodal') v = (Math.random() < 0.5 ? 0.25 : 0.75) + gaussian() * 0.08;
      else v = Math.random();
      voters.push(Math.max(0.01, Math.min(0.99, v)));
    }
  }
  regenerate();

  function tally() {
    const wins = new Array(params.candidates.length).fill(0);
    for (const v of voters) {
      let best = 0, bestD = Infinity;
      for (let i = 0; i < params.candidates.length; i++) {
        const d = Math.abs(v - params.candidates[i].x);
        if (d < bestD) { bestD = d; best = i; }
      }
      wins[best]++;
    }
    return wins;
  }

  function step(dt) {
    if (params.autoOptimize && params.candidates.length === 2) {
      // gradient hill-climb: each candidate tries to move 0.005 toward higher vote share
      for (let i = 0; i < params.candidates.length; i++) {
        const orig = params.candidates[i].x;
        const baseShare = tally()[i];
        for (const delta of [+0.01, -0.01]) {
          params.candidates[i].x = Math.max(0, Math.min(1, orig + delta));
          const newShare = tally()[i];
          if (newShare > baseShare) {
            // commit
            params.candidates[i].x = Math.max(0, Math.min(1, orig + delta * dt * 1.5));
            break;
          }
          params.candidates[i].x = orig;
        }
      }
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 30, padY = 30;
    const lineY = H - 80;

    // axis
    ctx.strokeStyle = 'rgba(120,130,150,0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padX, lineY); ctx.lineTo(W - padX, lineY);
    ctx.stroke();
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Left', padX, lineY + 18);
    ctx.fillText('Center', W / 2 - 18, lineY + 18);
    ctx.fillText('Right', W - padX - 30, lineY + 18);

    // voter histogram
    const bins = 50;
    const counts = new Array(bins).fill(0);
    for (const v of voters) counts[Math.min(bins - 1, Math.max(0, Math.floor(v * bins)))]++;
    const peak = Math.max(...counts, 1);
    const bw = (W - padX * 2) / bins;
    for (let i = 0; i < bins; i++) {
      const h = (counts[i] / peak) * (lineY - padY - 30);
      ctx.fillStyle = 'rgba(168,139,250,0.5)';
      ctx.fillRect(padX + i * bw + 1, lineY - h, bw - 1, h);
    }

    // candidates
    const wins = tally();
    const total = voters.length;
    const winnerIdx = wins.indexOf(Math.max(...wins));
    for (let i = 0; i < params.candidates.length; i++) {
      const c = params.candidates[i];
      const x = padX + c.x * (W - padX * 2);
      ctx.fillStyle = c.color;
      ctx.beginPath();
      ctx.arc(x, lineY, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px var(--font-sans)';
      ctx.fillText(c.name, x - 4, lineY + 4);
      // score
      ctx.fillStyle = c.color;
      ctx.font = 'bold 14px var(--font-mono)';
      const pct = ((wins[i] / total) * 100).toFixed(1);
      const isWinner = i === winnerIdx;
      ctx.fillText(`${pct}%${isWinner ? ' ★' : ''}`, x - 24, lineY - 28);
    }

    // median line
    const sorted = [...voters].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    const mx = padX + median * (W - padX * 2);
    ctx.strokeStyle = '#fbbf24';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(mx, padY); ctx.lineTo(mx, lineY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#fbbf24';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('median voter', mx + 4, padY + 12);

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag candidate dots', padX, H - 12);
  }

  // drag
  function localPos(e) {
    const rect = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * cv.width / rect.width, y: (e.clientY - rect.top) * cv.height / rect.height };
  }
  cv.canvas.style.cursor = 'pointer';
  cv.canvas.addEventListener('mousedown', (e) => {
    const p = localPos(e);
    const lineY = cv.height - 80;
    const padX = 30;
    if (Math.abs(p.y - lineY) > 30) return;
    let best = -1, bestD = 30;
    for (let i = 0; i < params.candidates.length; i++) {
      const x = padX + params.candidates[i].x * (cv.width - padX * 2);
      const d = Math.abs(p.x - x);
      if (d < bestD) { bestD = d; best = i; }
    }
    if (best >= 0) drag = best;
  });
  window.addEventListener('mousemove', (e) => {
    if (drag < 0) return;
    const p = localPos(e);
    const padX = 30;
    params.candidates[drag].x = Math.max(0, Math.min(1, (p.x - padX) / (cv.width - padX * 2)));
  });
  window.addEventListener('mouseup', () => { drag = -1; });

  // controls
  const dSel = select({
    label: 'Voter distribution',
    options: [
      { value: 'normal', label: 'Normal (centered)' },
      { value: 'uniform', label: 'Uniform' },
      { value: 'skewed', label: 'Right-skewed' },
      { value: 'bimodal', label: 'Bimodal (polarized)' },
    ],
    value: params.distribution,
    onChange: (v) => { params.distribution = v; regenerate(); },
  });
  const optB = button({ label: 'Auto-optimize candidates', primary: true, onClick: () => {
    params.autoOptimize = !params.autoOptimize;
    optB.label = params.autoOptimize ? 'Pause auto' : 'Auto-optimize candidates';
  } });
  const addB = button({ label: 'Add candidate', onClick: () => {
    const colors = ['#10b981', '#fbbf24', '#a78bfa', '#fb923c'];
    if (params.candidates.length < 6) {
      params.candidates.push({ x: 0.5, color: colors[params.candidates.length - 2] || '#fff', name: String.fromCharCode(65 + params.candidates.length) });
    }
  } });
  const remB = button({ label: 'Remove candidate', onClick: () => {
    if (params.candidates.length > 2) params.candidates.pop();
  } });
  const reB = button({ label: 'Resample voters', onClick: regenerate });

  ctrlPanel.append(dSel.el, row(optB), row(addB, remB, reB));

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
