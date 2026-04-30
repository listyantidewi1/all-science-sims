import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

// 'C' = cooperate, 'D' = defect.
// Strategies are functions that take this player's history of (own move, opponent move).
const STRATS = [
  { id: 'AC',  name: 'Always Cooperate',  color: '#0ea5e9', play: (own, opp) => 'C' },
  { id: 'AD',  name: 'Always Defect',     color: '#ef4444', play: (own, opp) => 'D' },
  { id: 'TFT', name: 'Tit-for-Tat',       color: '#10b981', play: (own, opp) => opp.length === 0 ? 'C' : opp[opp.length - 1] },
  { id: 'TF2T',name: 'Tit-for-Two-Tats',  color: '#fbbf24', play: (own, opp) => {
    if (opp.length < 2) return 'C';
    if (opp[opp.length - 1] === 'D' && opp[opp.length - 2] === 'D') return 'D';
    return 'C';
  } },
  { id: 'RND', name: 'Random',            color: '#a855f7', play: () => Math.random() < 0.5 ? 'C' : 'D' },
  { id: 'GRIM',name: 'Grim Trigger',      color: '#7f1d1d', play: (own, opp) => opp.includes('D') ? 'D' : 'C' },
];

const PAYOFF = { CC: 3, CD: 0, DC: 5, DD: 1 };

function play(stratA, stratB, rounds) {
  const aHist = [], bHist = [];
  let aScore = 0, bScore = 0;
  for (let i = 0; i < rounds; i++) {
    const a = stratA.play(aHist, bHist);
    const b = stratB.play(bHist, aHist);
    aHist.push(a); bHist.push(b);
    aScore += PAYOFF[a + b];
    bScore += PAYOFF[b + a];
  }
  return { aScore, bScore, aHist, bHist };
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { rounds: 200 };
  let scores = {};   // total scores per strategy across the tournament
  let matrix = {};   // matrix[a.id][b.id] = score against b
  let lastTrace = null;

  function runTournament() {
    scores = {};
    matrix = {};
    for (const s of STRATS) { scores[s.id] = 0; matrix[s.id] = {}; }
    for (const a of STRATS) {
      for (const b of STRATS) {
        const r = play(a, b, params.rounds);
        matrix[a.id][b.id] = r.aScore;
        scores[a.id] += r.aScore;
      }
    }
  }
  runTournament();

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Ranking on the left
    drawRanking(ctx, 30, 30, W * 0.4 - 50, H - 60);
    // Round-robin matrix on the right
    drawMatrix(ctx, W * 0.42, 30, W * 0.58 - 50, H - 60);
  }

  function drawRanking(ctx, x, y, w, h) {
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText('Tournament ranking', x, y);

    const sorted = STRATS.slice().sort((a, b) => scores[b.id] - scores[a.id]);
    const rowH = 32;
    const maxScore = Math.max(...Object.values(scores));

    for (let i = 0; i < sorted.length; i++) {
      const s = sorted[i];
      const yy = y + 30 + i * rowH;
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      ctx.fillRect(x, yy, w, rowH - 4);
      // bar
      ctx.fillStyle = s.color;
      ctx.fillRect(x, yy, w * (scores[s.id] / maxScore) * 0.85, rowH - 4);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px var(--font-mono)';
      ctx.fillText(`#${i + 1}  ${s.name}`, x + 8, yy + 18);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px var(--font-mono)';
      ctx.fillText(`${scores[s.id]}`, x + w - 60, yy + 18);
    }
  }

  function drawMatrix(ctx, x, y, w, h) {
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(`Round-robin score matrix (${params.rounds} rounds each)`, x, y);

    const cellSize = Math.min(w, h - 50) / (STRATS.length + 1);
    const startX = x + cellSize, startY = y + 50;

    // Headers
    for (let i = 0; i < STRATS.length; i++) {
      ctx.fillStyle = STRATS[i].color;
      ctx.font = 'bold 10px var(--font-mono)';
      ctx.fillText(STRATS[i].id, startX + i * cellSize + 6, startY - 6);
      ctx.fillText(STRATS[i].id, x + 6, startY + i * cellSize + cellSize / 2 + 4);
    }

    // Cells
    const maxCell = 5 * params.rounds;
    for (let i = 0; i < STRATS.length; i++) {
      for (let j = 0; j < STRATS.length; j++) {
        const s = matrix[STRATS[i].id][STRATS[j].id];
        const t = s / maxCell;
        const cx = startX + j * cellSize, cy = startY + i * cellSize;
        ctx.fillStyle = `hsl(${Math.round(t * 120)}, 60%, ${30 + t * 30}%)`;
        ctx.fillRect(cx, cy, cellSize - 2, cellSize - 2);
        ctx.fillStyle = '#fff';
        ctx.font = '10px var(--font-mono)';
        ctx.textAlign = 'center';
        ctx.fillText(s, cx + cellSize / 2 - 1, cy + cellSize / 2 + 4);
        ctx.textAlign = 'left';
      }
    }

    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '10px var(--font-mono)';
    ctx.fillText('rows = strategy A, columns = strategy B; cell = A\'s score', x, y + h - 4);
  }

  // controls
  const rS = slider({ label: 'Rounds per match', min: 20, max: 1000, step: 10, value: params.rounds,
    onInput: (v) => { params.rounds = v; runTournament(); } });
  const runB = button({ label: 'Run tournament', primary: true, onClick: runTournament });

  ctrlPanel.append(rS.el, row(runB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
