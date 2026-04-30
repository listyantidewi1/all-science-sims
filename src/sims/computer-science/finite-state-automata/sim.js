import { createCanvas, loop } from '../../../lib/canvas.js';
import { select, button, row } from '../../../lib/controls.js';

// DFAs
const DFAS = {
  endsWith01: {
    name: 'ends with "01"',
    states: ['q0', 'q1', 'q2'],
    accept: ['q2'],
    start: 'q0',
    pos: { q0: { x: 0.20, y: 0.5 }, q1: { x: 0.50, y: 0.5 }, q2: { x: 0.80, y: 0.5 } },
    delta: {
      q0: { '0': 'q1', '1': 'q0' },
      q1: { '0': 'q1', '1': 'q2' },
      q2: { '0': 'q1', '1': 'q0' },
    },
  },
  evenParity: {
    name: 'even number of 1s',
    states: ['even', 'odd'],
    accept: ['even'],
    start: 'even',
    pos: { even: { x: 0.30, y: 0.5 }, odd: { x: 0.70, y: 0.5 } },
    delta: {
      even: { '0': 'even', '1': 'odd' },
      odd:  { '0': 'odd',  '1': 'even' },
    },
  },
  divBy3: {
    name: 'binary divisible by 3',
    states: ['r0', 'r1', 'r2'],
    accept: ['r0'],
    start: 'r0',
    pos: { r0: { x: 0.20, y: 0.5 }, r1: { x: 0.50, y: 0.5 }, r2: { x: 0.80, y: 0.5 } },
    delta: {
      r0: { '0': 'r0', '1': 'r1' },
      r1: { '0': 'r2', '1': 'r0' },
      r2: { '0': 'r1', '1': 'r2' },
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

  const params = { dfaKey: 'endsWith01', input: '01101' };
  let stepIdx = 0;
  let trace = [];

  function recompute() {
    const dfa = DFAS[params.dfaKey];
    trace = [{ state: dfa.start, symbol: null }];
    let s = dfa.start;
    for (const c of params.input) {
      if (!(c in dfa.delta[s])) { s = null; break; }
      s = dfa.delta[s][c];
      trace.push({ state: s, symbol: c });
    }
    stepIdx = Math.min(stepIdx, trace.length - 1);
  }
  recompute();

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const dfa = DFAS[params.dfaKey];
    const padX = 50;
    const stateY = H * 0.45;

    // Compute state pixel positions
    const sp = {};
    for (const s of dfa.states) {
      const p = dfa.pos[s];
      sp[s] = { x: padX + p.x * (W - padX * 2), y: stateY };
    }

    // Edges
    const drawnPairs = new Set();
    for (const from of dfa.states) {
      for (const sym of Object.keys(dfa.delta[from])) {
        const to = dfa.delta[from][sym];
        const key = `${from}-${to}`;
        if (drawnPairs.has(key)) continue;
        drawnPairs.add(key);
        // Combine all symbols from->to
        const labels = Object.entries(dfa.delta[from]).filter(([_, t]) => t === to).map(([s]) => s).join(', ');
        drawEdge(ctx, sp[from], sp[to], labels, from === to);
      }
    }

    // States
    for (const s of dfa.states) {
      const isCurrent = trace[stepIdx]?.state === s;
      const isAccept = dfa.accept.includes(s);
      ctx.fillStyle = isCurrent ? '#fbbf24' : 'rgba(255,255,255,0.06)';
      ctx.beginPath();
      ctx.arc(sp[s].x, sp[s].y, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = isAccept ? '#10b981' : 'rgba(120,130,150,0.7)';
      ctx.lineWidth = 2;
      ctx.stroke();
      if (isAccept) {
        ctx.beginPath();
        ctx.arc(sp[s].x, sp[s].y, 26, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = isCurrent ? '#0b1220' : '#fff';
      ctx.font = 'bold 13px var(--font-mono)';
      ctx.textAlign = 'center';
      ctx.fillText(s, sp[s].x, sp[s].y + 4);
      ctx.textAlign = 'left';
      // Start arrow
      if (s === dfa.start) {
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sp[s].x - 60, sp[s].y); ctx.lineTo(sp[s].x - 32, sp[s].y);
        ctx.stroke();
      }
    }

    // Input tape display at top
    const tapeY = 30;
    const tapeX = 60;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, W - 16, 50);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`DFA: ${dfa.name}    input: "${params.input}"`, 16, tapeY);

    const charW = 24;
    for (let i = 0; i < params.input.length; i++) {
      const x = tapeX + i * charW;
      const consumed = i < stepIdx;
      const head = i === stepIdx - 1;
      ctx.fillStyle = head ? '#fbbf24' : consumed ? 'rgba(120,130,150,0.4)' : '#fff';
      ctx.fillRect(x, 40, charW - 2, 18);
      ctx.fillStyle = '#0b1220';
      ctx.font = 'bold 12px var(--font-mono)';
      ctx.textAlign = 'center';
      ctx.fillText(params.input[i], x + charW / 2 - 1, 54);
      ctx.textAlign = 'left';
    }

    // Result
    const finalState = trace[trace.length - 1].state;
    const accepted = finalState && dfa.accept.includes(finalState);
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, H - 56, 380, 48);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`Step ${stepIdx} / ${trace.length - 1}    final state: ${finalState ?? '(error)'}`, 16, H - 36);
    ctx.fillStyle = accepted ? '#10b981' : '#ef4444';
    ctx.font = 'bold 14px var(--font-sans)';
    ctx.fillText(accepted ? '✓ ACCEPT' : '✗ REJECT', 16, H - 16);
  }

  function drawEdge(ctx, a, b, label, selfLoop) {
    ctx.strokeStyle = 'rgba(120,130,150,0.7)';
    ctx.lineWidth = 1.5;
    if (selfLoop) {
      // Self-loop above
      ctx.beginPath();
      ctx.arc(a.x, a.y - 50, 18, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.9)';
      ctx.font = '11px var(--font-mono)';
      ctx.textAlign = 'center';
      ctx.fillText(label, a.x, a.y - 76);
      ctx.textAlign = 'left';
      return;
    }
    const dx = b.x - a.x, dy = b.y - a.y;
    const L = Math.hypot(dx, dy);
    const ux = dx / L, uy = dy / L;
    const sx = a.x + ux * 32, sy = a.y + uy * 32;
    const ex = b.x - ux * 32, ey = b.y - uy * 32;
    // Curve a bit perpendicular
    const cx = (sx + ex) / 2 - uy * 30, cy = (sy + ey) / 2 + ux * 30;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.quadraticCurveTo(cx, cy, ex, ey);
    ctx.stroke();
    // Arrowhead
    const ang = Math.atan2(ey - cy, ex - cx);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.beginPath();
    ctx.moveTo(ex, ey);
    ctx.lineTo(ex - 8 * Math.cos(ang - 0.4), ey - 8 * Math.sin(ang - 0.4));
    ctx.lineTo(ex - 8 * Math.cos(ang + 0.4), ey - 8 * Math.sin(ang + 0.4));
    ctx.closePath();
    ctx.fill();
    // Label
    ctx.fillStyle = '#fff';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(label, cx - 8, cy);
  }

  // controls
  const dfaSel = select({
    label: 'Automaton',
    options: Object.entries(DFAS).map(([k, v]) => ({ value: k, label: v.name })),
    value: params.dfaKey,
    onChange: (v) => { params.dfaKey = v; stepIdx = 0; recompute(); },
  });
  const inputEl = document.createElement('input');
  inputEl.type = 'text';
  inputEl.value = params.input;
  inputEl.placeholder = 'binary input (0s and 1s)';
  inputEl.style.cssText = 'padding:10px;border-radius:8px;border:1px solid var(--color-border);background:var(--color-surface-2);color:var(--color-fg);font-family:var(--font-mono)';
  inputEl.addEventListener('input', () => {
    params.input = inputEl.value.replace(/[^01]/g, '').slice(0, 32);
    inputEl.value = params.input;
    stepIdx = 0;
    recompute();
  });
  const stepRow = document.createElement('div');
  stepRow.className = 'ctrl-row';
  const backB = button({ label: '◀ Back', onClick: () => { stepIdx = Math.max(0, stepIdx - 1); } });
  const fwdB = button({ label: 'Step ▶', primary: true, onClick: () => { stepIdx = Math.min(trace.length - 1, stepIdx + 1); } });
  const resetB = button({ label: 'Reset', onClick: () => { stepIdx = 0; } });
  const runB = button({ label: 'Run all', onClick: () => { stepIdx = trace.length - 1; } });
  stepRow.append(backB.el, fwdB.el, resetB.el, runB.el);

  ctrlPanel.append(dfaSel.el, inputEl, stepRow);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
