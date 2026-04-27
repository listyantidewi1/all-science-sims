import { button, row } from '../../../lib/controls.js';

const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
const NAMES = ['A', 'B', 'C', 'D', 'E'];

// Default ballot blocks: each has count + a ranking of candidates
const DEFAULT_BALLOTS = [
  { count: 30, ranking: ['A', 'C', 'B', 'D', 'E'] },
  { count: 25, ranking: ['B', 'D', 'A', 'C', 'E'] },
  { count: 20, ranking: ['C', 'A', 'B', 'D', 'E'] },
  { count: 15, ranking: ['D', 'B', 'C', 'A', 'E'] },
  { count: 10, ranking: ['E', 'D', 'C', 'B', 'A'] },
];

export function mount(rootEl) {
  const stage = document.createElement('div');
  stage.style.padding = 'var(--space-4)';
  rootEl.appendChild(stage);

  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  let ballots = JSON.parse(JSON.stringify(DEFAULT_BALLOTS));

  const ballotsWrap = document.createElement('div');
  ballotsWrap.style.cssText = 'background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:var(--radius-2);padding:var(--space-3);margin-bottom:var(--space-3)';
  stage.appendChild(ballotsWrap);

  const resultsWrap = document.createElement('div');
  resultsWrap.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3)';
  stage.appendChild(resultsWrap);

  // Tally functions
  function plurality(ballots) {
    const counts = {};
    for (const b of ballots) {
      counts[b.ranking[0]] = (counts[b.ranking[0]] || 0) + b.count;
    }
    return counts;
  }

  function runoff(ballots) {
    const first = plurality(ballots);
    const sorted = Object.entries(first).sort((a, b) => b[1] - a[1]);
    if (sorted.length < 2) return first;
    const top2 = [sorted[0][0], sorted[1][0]];
    const counts = { [top2[0]]: 0, [top2[1]]: 0 };
    for (const b of ballots) {
      for (const c of b.ranking) {
        if (top2.includes(c)) { counts[c] += b.count; break; }
      }
    }
    return counts;
  }

  function irv(ballots) {
    let candidates = new Set();
    for (const b of ballots) for (const c of b.ranking) candidates.add(c);
    const eliminated = new Set();
    const rounds = [];
    while (candidates.size - eliminated.size > 1) {
      const counts = {};
      for (const c of candidates) if (!eliminated.has(c)) counts[c] = 0;
      for (const b of ballots) {
        for (const c of b.ranking) {
          if (!eliminated.has(c)) { counts[c] += b.count; break; }
        }
      }
      rounds.push({ ...counts });
      const total = Object.values(counts).reduce((s, v) => s + v, 0);
      const sorted = Object.entries(counts).sort((a, b) => a[1] - b[1]);
      const top = sorted[sorted.length - 1];
      if (top[1] > total / 2) return { final: counts, rounds };
      eliminated.add(sorted[0][0]);
    }
    const final = {};
    for (const c of candidates) if (!eliminated.has(c)) final[c] = 1;
    return { final, rounds };
  }

  function borda(ballots) {
    const counts = {};
    for (const b of ballots) {
      for (let i = 0; i < b.ranking.length; i++) {
        const pts = b.ranking.length - 1 - i;
        counts[b.ranking[i]] = (counts[b.ranking[i]] || 0) + b.count * pts;
      }
    }
    return counts;
  }

  function winner(counts) {
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
  }

  function renderBallots() {
    let html = '<h3 style="margin:0 0 8px;font-size:var(--type-md)">Ballot blocks</h3>';
    html += '<table style="width:100%;border-collapse:collapse;font-size:13px">';
    html += `<thead><tr>
      <th style="text-align:left;padding:4px 6px;color:var(--color-muted);font-weight:600">Voters</th>
      <th style="text-align:left;padding:4px 6px;color:var(--color-muted);font-weight:600">Ranking (1st → 5th)</th>
      <th style="padding:4px 6px"></th>
    </tr></thead><tbody>`;
    for (let bi = 0; bi < ballots.length; bi++) {
      const b = ballots[bi];
      html += `<tr><td style="padding:4px 6px"><input data-ballot-count="${bi}" type="number" min="0" max="200" value="${b.count}" style="width:60px;padding:4px;border:1px solid var(--color-border);border-radius:4px;background:var(--color-surface);color:var(--color-fg)"></td>`;
      html += `<td style="padding:4px 6px;font-family:var(--font-mono);letter-spacing:2px">`;
      for (let i = 0; i < b.ranking.length; i++) {
        const c = b.ranking[i];
        const idx = NAMES.indexOf(c);
        html += `<span style="display:inline-block;padding:3px 8px;background:${COLORS[idx]};color:white;border-radius:4px;margin:0 2px;font-weight:700">${c}</span>`;
        if (i < b.ranking.length - 1) html += ' › ';
      }
      html += `</td>`;
      html += `<td><button data-shuffle="${bi}" style="font-size:11px;padding:3px 8px;background:var(--color-surface);border:1px solid var(--color-border);border-radius:4px;color:var(--color-fg);cursor:pointer">Shuffle</button></td>`;
      html += `</tr>`;
    }
    html += '</tbody></table>';
    ballotsWrap.innerHTML = html;
    ballotsWrap.querySelectorAll('input[data-ballot-count]').forEach((el) => {
      el.addEventListener('input', () => {
        const i = Number(el.dataset.ballotCount);
        ballots[i].count = Math.max(0, Number(el.value) || 0);
        renderResults();
      });
    });
    ballotsWrap.querySelectorAll('button[data-shuffle]').forEach((el) => {
      el.addEventListener('click', () => {
        const i = Number(el.dataset.shuffle);
        const r = [...ballots[i].ranking];
        for (let j = r.length - 1; j > 0; j--) {
          const k = Math.floor(Math.random() * (j + 1));
          [r[j], r[k]] = [r[k], r[j]];
        }
        ballots[i].ranking = r;
        renderBallots();
        renderResults();
      });
    });
  }

  function renderResults() {
    const total = ballots.reduce((s, b) => s + b.count, 0);
    const plur = plurality(ballots);
    const ro = runoff(ballots);
    const irvR = irv(ballots);
    const bord = borda(ballots);
    function block(title, counts, winnerKey) {
      let html = `<div style="background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:var(--radius-2);padding:var(--space-3)">
        <h3 style="margin:0 0 8px;font-size:var(--type-md)">${title}</h3>
        <div style="display:grid;gap:6px">
      `;
      const max = Math.max(...Object.values(counts), 1);
      for (const c of NAMES) {
        const v = counts[c] || 0;
        const idx = NAMES.indexOf(c);
        const isW = winnerKey === c;
        html += `<div style="display:flex;align-items:center;gap:8px">
          <span style="width:18px;font-weight:700;color:${COLORS[idx]}">${c}</span>
          <div style="flex:1;background:rgba(120,130,150,0.15);border-radius:4px;overflow:hidden;height:14px">
            <div style="height:100%;width:${(v/max)*100}%;background:${COLORS[idx]};opacity:${isW?1:0.6}"></div>
          </div>
          <span style="min-width:50px;text-align:right;font-family:var(--font-mono);font-size:12px;color:${isW?COLORS[idx]:'var(--color-muted)'};font-weight:${isW?700:400}">${v}${isW?' ★':''}</span>
        </div>`;
      }
      html += '</div></div>';
      return html;
    }
    let html = '';
    html += block(`Plurality — winner: ${winner(plur)}`, plur, winner(plur));
    html += block(`Two-round runoff — winner: ${winner(ro)}`, ro, winner(ro));
    html += block(`Instant runoff (IRV) — winner: ${winner(irvR.final)}`, irvR.final, winner(irvR.final));
    html += block(`Borda count — winner: ${winner(bord)}`, bord, winner(bord));
    resultsWrap.innerHTML = html;
  }

  // controls
  const resetB = button({ label: 'Reset ballots', primary: true, onClick: () => {
    ballots = JSON.parse(JSON.stringify(DEFAULT_BALLOTS));
    renderBallots(); renderResults();
  } });
  const splitB = button({ label: 'Vote-splitting', onClick: () => {
    ballots = [
      { count: 35, ranking: ['A', 'B', 'C', 'D', 'E'] },
      { count: 30, ranking: ['B', 'A', 'C', 'D', 'E'] },
      { count: 35, ranking: ['C', 'D', 'B', 'A', 'E'] },
    ];
    renderBallots(); renderResults();
  } });
  const condB = button({ label: 'Condorcet winner', onClick: () => {
    ballots = [
      { count: 25, ranking: ['A', 'C', 'B', 'D', 'E'] },
      { count: 20, ranking: ['B', 'C', 'D', 'A', 'E'] },
      { count: 30, ranking: ['C', 'A', 'B', 'D', 'E'] },
      { count: 25, ranking: ['D', 'C', 'A', 'B', 'E'] },
    ];
    renderBallots(); renderResults();
  } });
  ctrlPanel.append(row(resetB, splitB, condB));

  renderBallots();
  renderResults();
  return () => {};
}
