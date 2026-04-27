import { createCanvas } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';

// Standard payoffs: T > R > P > S, 2R > T + S
// (mine, opp): C,C → R=3,R=3 ; C,D → S=0,T=5 ; D,C → T=5,S=0 ; D,D → P=1,P=1
const PAYOFF = {
  CC: [3, 3], CD: [0, 5], DC: [5, 0], DD: [1, 1],
};

const STRATEGIES = {
  cooperate: {
    name: 'Always Cooperate',
    move: () => 'C',
  },
  defect: {
    name: 'Always Defect',
    move: () => 'D',
  },
  tft: {
    name: 'Tit-for-Tat',
    move: (myHist, oppHist) => oppHist.length === 0 ? 'C' : oppHist[oppHist.length - 1],
  },
  grim: {
    name: 'Grim Trigger',
    move: (myHist, oppHist) => oppHist.includes('D') ? 'D' : 'C',
  },
  random: {
    name: 'Random',
    move: () => Math.random() < 0.5 ? 'C' : 'D',
  },
  pavlov: {
    name: 'Pavlov (win-stay, lose-shift)',
    move: (myHist, oppHist) => {
      if (myHist.length === 0) return 'C';
      const lastMine = myHist[myHist.length - 1];
      const lastOpp = oppHist[oppHist.length - 1];
      // win = both cooperated or I defected and they cooperated
      const won = (lastMine === 'C' && lastOpp === 'C') || (lastMine === 'D' && lastOpp === 'C');
      return won ? lastMine : (lastMine === 'C' ? 'D' : 'C');
    },
  },
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    a: 'tft',
    b: 'defect',
    rounds: 100,
    noise: 0,
  };
  let state = run();

  function run() {
    const aHist = [];
    const bHist = [];
    let aScore = 0, bScore = 0;
    const series = [];
    for (let i = 0; i < params.rounds; i++) {
      let aM = STRATEGIES[params.a].move(aHist, bHist);
      let bM = STRATEGIES[params.b].move(bHist, aHist);
      if (Math.random() < params.noise) aM = aM === 'C' ? 'D' : 'C';
      if (Math.random() < params.noise) bM = bM === 'C' ? 'D' : 'C';
      const [aPay, bPay] = PAYOFF[aM + bM];
      aScore += aPay; bScore += bPay;
      aHist.push(aM); bHist.push(bM);
      series.push({ aScore, bScore, aM, bM });
    }
    return { aHist, bHist, aScore, bScore, series };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);
    const padX = 50, padY = 30;
    const top = 130;

    // payoff matrix
    ctx.fillStyle = 'rgba(120,130,150,0.95)';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText('Payoff matrix (your, theirs)', padX, 22);
    drawCell(padX, 36, 60, 28, 'C', 'C', '(3, 3)');
    drawCell(padX + 60, 36, 60, 28, 'C', 'D', '(0, 5)');
    drawCell(padX, 64, 60, 28, 'D', 'C', '(5, 0)');
    drawCell(padX + 60, 64, 60, 28, 'D', 'D', '(1, 1)');

    function drawCell(x, y, w, h, m, n, label) {
      ctx.strokeStyle = 'rgba(120,130,150,0.5)';
      ctx.strokeRect(x, y, w, h);
      ctx.fillStyle = 'rgba(120,130,150,0.95)';
      ctx.font = '11px var(--font-mono)';
      ctx.fillText(label, x + 6, y + 18);
    }

    // scores
    ctx.font = 'bold 16px var(--font-sans)';
    ctx.fillStyle = '#3b82f6';
    ctx.fillText(`A (${STRATEGIES[params.a].name}):  ${state.aScore}`, padX + 200, 50);
    ctx.fillStyle = '#ef4444';
    ctx.fillText(`B (${STRATEGIES[params.b].name}):  ${state.bScore}`, padX + 200, 78);

    // graph: cumulative scores
    const gx = padX, gy = top, gw = W - padX * 2, gh = H - top - padY;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(gx, gy, gw, gh);
    const maxS = Math.max(state.aScore, state.bScore, 5);
    const x2 = (i) => gx + (i / params.rounds) * gw;
    const y2 = (s) => gy + gh - (s / maxS) * (gh - 10);
    // A
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    state.series.forEach((p, i) => { i === 0 ? ctx.moveTo(x2(i), y2(p.aScore)) : ctx.lineTo(x2(i), y2(p.aScore)); });
    ctx.stroke();
    // B
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    state.series.forEach((p, i) => { i === 0 ? ctx.moveTo(x2(i), y2(p.bScore)) : ctx.lineTo(x2(i), y2(p.bScore)); });
    ctx.stroke();

    // history strip
    ctx.font = '10px var(--font-mono)';
    let hx = padX, hy = top - 14;
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.fillText('A:', padX - 18, hy);
    ctx.fillText('B:', padX - 18, hy + 12);
    const cellW = Math.max(2, gw / params.rounds);
    for (let i = 0; i < state.series.length; i++) {
      ctx.fillStyle = state.series[i].aM === 'C' ? '#10b981' : '#ef4444';
      ctx.fillRect(padX + i * cellW, hy - 8, Math.max(1, cellW - 1), 8);
      ctx.fillStyle = state.series[i].bM === 'C' ? '#10b981' : '#ef4444';
      ctx.fillRect(padX + i * cellW, hy + 4, Math.max(1, cellW - 1), 8);
    }
  }

  // controls
  const aSel = select({
    label: 'Player A',
    options: Object.entries(STRATEGIES).map(([k, v]) => ({ value: k, label: v.name })),
    value: params.a,
    onChange: (v) => { params.a = v; state = run(); },
  });
  const bSel = select({
    label: 'Player B',
    options: Object.entries(STRATEGIES).map(([k, v]) => ({ value: k, label: v.name })),
    value: params.b,
    onChange: (v) => { params.b = v; state = run(); },
  });
  const roundsS = slider({
    label: 'Rounds', min: 10, max: 500, step: 10, value: params.rounds,
    onInput: (v) => { params.rounds = v; state = run(); },
  });
  const noiseS = slider({
    label: 'Noise (P[flip move])', min: 0, max: 0.3, step: 0.01, value: params.noise, format: (v) => v.toFixed(2),
    onInput: (v) => { params.noise = v; state = run(); },
  });
  const reB = button({ label: 'Re-run', primary: true, onClick: () => { state = run(); } });

  ctrlPanel.append(aSel.el, bSel.el, roundsS.el, noiseS.el, row(reB));

  let raf = 0;
  const tick = () => { draw(); raf = requestAnimationFrame(tick); };
  raf = requestAnimationFrame(tick);
  return () => { cancelAnimationFrame(raf); cv.destroy(); };
}
