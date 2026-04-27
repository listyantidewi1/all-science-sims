import { slider, select, button, row } from '../../../lib/controls.js';

// A simple Turing machine.
// rules[state][symbol] = { write, move ('L'|'R'|'H'), next }

const PROGRAMS = {
  busyBeaver5: {
    name: 'Busy Beaver (5-state)',
    blank: 0,
    initialTape: [],
    initialState: 'A',
    rules: {
      A: { 0: { write: 1, move: 'R', next: 'B' }, 1: { write: 1, move: 'L', next: 'C' } },
      B: { 0: { write: 1, move: 'R', next: 'C' }, 1: { write: 1, move: 'R', next: 'B' } },
      C: { 0: { write: 1, move: 'R', next: 'D' }, 1: { write: 0, move: 'L', next: 'E' } },
      D: { 0: { write: 1, move: 'L', next: 'A' }, 1: { write: 1, move: 'L', next: 'D' } },
      E: { 0: { write: 1, move: 'H', next: 'H' }, 1: { write: 0, move: 'L', next: 'A' } },
    },
  },
  binaryInc: {
    name: 'Binary increment',
    blank: 0,
    initialTape: [1, 0, 1, 1],
    initialState: 'right',
    rules: {
      right: {
        0: { write: 0, move: 'R', next: 'right' },
        1: { write: 1, move: 'R', next: 'right' },
        '_': { write: 0, move: 'L', next: 'carry' },
      },
      carry: {
        0: { write: 1, move: 'L', next: 'done' },
        1: { write: 0, move: 'L', next: 'carry' },
        '_': { write: 1, move: 'H', next: 'H' },
      },
      done: {
        0: { write: 0, move: 'L', next: 'done' },
        1: { write: 1, move: 'L', next: 'done' },
        '_': { write: 0, move: 'H', next: 'H' },
      },
    },
  },
  unaryDouble: {
    name: 'Double a unary number',
    blank: 0,
    initialTape: [1, 1, 1],
    initialState: 'find',
    rules: {
      find: {
        1: { write: 1, move: 'R', next: 'find' },
        '_': { write: 1, move: 'R', next: 'mark' },
      },
      mark: {
        '_': { write: 1, move: 'H', next: 'H' },
      },
    },
  },
};

export function mount(rootEl) {
  const stage = document.createElement('div');
  stage.style.padding = 'var(--space-4)';
  rootEl.appendChild(stage);

  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const tapeWrap = document.createElement('div');
  tapeWrap.style.cssText = 'background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:var(--radius-2);padding:var(--space-3);overflow-x:auto;margin-bottom:var(--space-3)';
  stage.appendChild(tapeWrap);

  const stateWrap = document.createElement('div');
  stateWrap.style.cssText = 'display:flex;gap:var(--space-3);flex-wrap:wrap';
  stage.appendChild(stateWrap);

  const rulesWrap = document.createElement('div');
  rulesWrap.style.cssText = 'background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:var(--radius-2);padding:var(--space-3);font-family:var(--font-mono);font-size:12px;flex:2;min-width:300px';
  stateWrap.appendChild(rulesWrap);

  const statusWrap = document.createElement('div');
  statusWrap.style.cssText = 'background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:var(--radius-2);padding:var(--space-3);min-width:200px;flex:1';
  stateWrap.appendChild(statusWrap);

  const state = {
    program: 'busyBeaver5',
    tape: new Map(),
    head: 0,
    cur: 'A',
    steps: 0,
    speed: 5,
    running: false,
  };

  function loadProgram() {
    const prog = PROGRAMS[state.program];
    state.tape = new Map();
    prog.initialTape.forEach((v, i) => state.tape.set(i, v));
    state.head = 0;
    state.cur = prog.initialState;
    state.steps = 0;
    state.running = false;
    runB.label = 'Run';
  }

  function step() {
    if (state.cur === 'H') return;
    const prog = PROGRAMS[state.program];
    const sym = state.tape.has(state.head) ? state.tape.get(state.head) : prog.blank;
    const symKey = (sym === 0 || sym === 1) ? sym : '_';
    const rule = prog.rules[state.cur]?.[symKey] || prog.rules[state.cur]?._;
    if (!rule) { state.cur = 'H'; return; }
    if (rule.write !== undefined) state.tape.set(state.head, rule.write);
    if (rule.move === 'L') state.head--;
    else if (rule.move === 'R') state.head++;
    state.cur = rule.next;
    state.steps++;
    if (state.cur === 'H') state.running = false;
  }

  function render() {
    // tape — show 31 cells centered on head
    const halfRange = 15;
    let tapeHTML = '<div style="display:flex;align-items:center;gap:0">';
    for (let i = state.head - halfRange; i <= state.head + halfRange; i++) {
      const v = state.tape.has(i) ? state.tape.get(i) : 0;
      const isHead = i === state.head;
      const bg = isHead ? '#fbbf24' : v ? '#10b981' : '#1f2937';
      const fg = isHead || v ? '#0b1220' : '#94a3b8';
      tapeHTML += `<div style="
        width: 28px; height: 36px; border: 1px solid var(--color-border);
        background: ${bg}; color: ${fg};
        display: flex; align-items: center; justify-content: center;
        font-family: var(--font-mono); font-weight: 700; font-size: 14px;
        margin: -1px;
      ">${v}</div>`;
    }
    tapeHTML += '</div>';
    tapeHTML += `<div style="text-align: center; margin-top: 4px; color: var(--color-muted); font-size: 11px;">
      head at position ${state.head}, current cell shown highlighted
    </div>`;
    tapeWrap.innerHTML = tapeHTML;

    // rules table
    const prog = PROGRAMS[state.program];
    let rulesHTML = `<h3 style="margin:0 0 8px;font-size:var(--type-md);font-family:var(--font-sans)">Rules — ${prog.name}</h3>`;
    rulesHTML += '<table style="width:100%;border-collapse:collapse;font-family:var(--font-mono);font-size:12px"><thead><tr>';
    rulesHTML += '<th style="text-align:left;padding:4px 6px;color:var(--color-muted)">state</th><th style="padding:4px 6px;color:var(--color-muted)">read</th><th style="padding:4px 6px;color:var(--color-muted)">write</th><th style="padding:4px 6px;color:var(--color-muted)">move</th><th style="padding:4px 6px;color:var(--color-muted)">next</th>';
    rulesHTML += '</tr></thead><tbody>';
    for (const [s, m] of Object.entries(prog.rules)) {
      for (const [r, act] of Object.entries(m)) {
        const cur = s === state.cur;
        rulesHTML += `<tr style="${cur ? 'background:rgba(251,191,36,0.18)' : ''}">
          <td style="padding:3px 6px;font-weight:700">${s}</td>
          <td style="padding:3px 6px">${r === '_' ? '∅' : r}</td>
          <td style="padding:3px 6px">${act.write}</td>
          <td style="padding:3px 6px">${act.move}</td>
          <td style="padding:3px 6px">${act.next}</td>
        </tr>`;
      }
    }
    rulesHTML += '</tbody></table>';
    rulesWrap.innerHTML = rulesHTML;

    // status
    const halted = state.cur === 'H';
    const ones = [...state.tape.values()].filter((v) => v === 1).length;
    statusWrap.innerHTML = `
      <h3 style="margin:0 0 8px;font-size:var(--type-md)">Status</h3>
      <div style="font-family:var(--font-mono);font-size:13px;line-height:1.6">
        State: <strong style="color:${halted ? '#ef4444' : '#10b981'}">${state.cur}</strong>${halted ? ' (halted)' : ''}<br>
        Steps: ${state.steps}<br>
        Head: ${state.head}<br>
        Ones on tape: ${ones}
      </div>
    `;
  }

  // controls
  const progSel = select({
    label: 'Program',
    options: Object.entries(PROGRAMS).map(([k, v]) => ({ value: k, label: v.name })),
    value: state.program,
    onChange: (v) => { state.program = v; loadProgram(); render(); },
  });
  const speedS = slider({
    label: 'Steps / sec', min: 1, max: 100, step: 1, value: state.speed,
    onInput: (v) => { state.speed = v; },
  });
  const runB = button({
    label: 'Run',
    primary: true,
    onClick: () => {
      if (state.cur === 'H') return;
      state.running = !state.running;
      runB.label = state.running ? 'Pause' : 'Run';
    },
  });
  const stepB = button({ label: 'Step', onClick: () => { step(); render(); } });
  const resetB = button({ label: 'Reset', onClick: () => { loadProgram(); render(); } });

  ctrlPanel.append(progSel.el, speedS.el, row(runB, stepB, resetB));

  loadProgram();
  render();

  let raf = 0, last = 0, acc = 0;
  function tick(ts) {
    if (!last) last = ts;
    const dt = (ts - last) / 1000; last = ts;
    if (state.running && state.cur !== 'H') {
      acc += dt * state.speed;
      while (acc >= 1) { step(); acc -= 1; }
      render();
    }
    raf = requestAnimationFrame(tick);
  }
  raf = requestAnimationFrame(tick);

  return () => { cancelAnimationFrame(raf); };
}
