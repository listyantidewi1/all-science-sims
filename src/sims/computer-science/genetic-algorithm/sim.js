import { slider, button, row, toggle } from '../../../lib/controls.js';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz 0123456789!?.,';

function randomChar() { return CHARS[Math.floor(Math.random() * CHARS.length)]; }

export function mount(rootEl) {
  const stage = document.createElement('div');
  stage.style.padding = 'var(--space-4)';
  rootEl.appendChild(stage);

  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const params = {
    target: 'TO BE OR NOT TO BE',
    populationSize: 100,
    mutationRate: 0.02,
    autoplay: true,
    speed: 10, // gens/sec
  };

  let pop = [];
  let generation = 0;
  let history = [];

  // controls
  const inputLabel = document.createElement('label');
  inputLabel.textContent = 'Target sentence';
  inputLabel.style.cssText = 'font-size:var(--type-sm);color:var(--color-muted);font-weight:600';
  stage.appendChild(inputLabel);
  const input = document.createElement('input');
  input.type = 'text';
  input.value = params.target;
  input.style.cssText = 'width:100%;font-family:var(--font-mono);font-size:14px;padding:10px 12px;border:1px solid var(--color-border);border-radius:8px;background:var(--color-surface-2);color:var(--color-fg);margin:6px 0 var(--space-3)';
  input.addEventListener('input', () => {
    params.target = input.value;
    init();
  });
  stage.appendChild(input);

  const display = document.createElement('div');
  display.style.cssText = 'background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:var(--radius-2);padding:var(--space-3);margin-bottom:var(--space-3);min-height:340px;font-family:var(--font-mono);font-size:13px;overflow:auto';
  stage.appendChild(display);

  function fitness(s) {
    let f = 0;
    for (let i = 0; i < params.target.length; i++) if (s[i] === params.target[i]) f++;
    return f;
  }
  function randomString(len) {
    let s = '';
    for (let i = 0; i < len; i++) s += randomChar();
    return s;
  }
  function init() {
    pop = [];
    for (let i = 0; i < params.populationSize; i++) pop.push(randomString(params.target.length));
    generation = 0;
    history = [];
    render();
  }
  init();

  function generationStep() {
    // sort by fitness desc
    pop.sort((a, b) => fitness(b) - fitness(a));
    const elite = pop.slice(0, 2);
    const next = [...elite];
    while (next.length < params.populationSize) {
      // tournament selection (size 5)
      function pick() {
        let best = null;
        for (let i = 0; i < 5; i++) {
          const c = pop[Math.floor(Math.random() * pop.length)];
          if (!best || fitness(c) > fitness(best)) best = c;
        }
        return best;
      }
      const a = pick(), b = pick();
      // crossover
      const cut = Math.floor(Math.random() * params.target.length);
      let child = a.slice(0, cut) + b.slice(cut);
      // mutation
      let mutated = '';
      for (const c of child) mutated += Math.random() < params.mutationRate ? randomChar() : c;
      next.push(mutated);
    }
    pop = next;
    generation++;
    history.push(fitness(pop[0]) / params.target.length);
    if (history.length > 200) history.shift();
  }

  function render() {
    const best = pop[0] || '';
    const avgFit = pop.reduce((s, p) => s + fitness(p), 0) / Math.max(1, pop.length);
    let html = `<div style="display:flex;justify-content:space-between;font-family:var(--font-sans);margin-bottom:var(--space-3)">
      <strong>Generation ${generation}</strong>
      <span>Best: ${fitness(best)}/${params.target.length}    Avg: ${avgFit.toFixed(1)}</span>
    </div>`;
    // Best string with letter coloring
    html += '<div style="margin-bottom:var(--space-3)">';
    for (let i = 0; i < best.length; i++) {
      const correct = best[i] === params.target[i];
      html += `<span style="display:inline-block;width:18px;text-align:center;padding:6px 0;background:${correct ? '#10b981' : '#ef4444'};color:white;margin:1px;border-radius:3px">${best[i]}</span>`;
    }
    html += '</div>';
    // Show first 10 of population
    html += '<div style="opacity:0.7;font-size:11px">Top of population:</div>';
    for (let i = 0; i < Math.min(10, pop.length); i++) {
      let line = '';
      for (let j = 0; j < pop[i].length; j++) {
        const ok = pop[i][j] === params.target[j];
        line += `<span style="color:${ok ? '#10b981' : 'var(--color-muted)'}">${pop[i][j]}</span>`;
      }
      html += `<div style="padding:1px 0">${line}  <span style="color:var(--color-muted)">(${fitness(pop[i])})</span></div>`;
    }
    display.innerHTML = html;
  }

  const popS = slider({ label: 'Population size', min: 20, max: 500, step: 10, value: params.populationSize,
    onInput: (v) => { params.populationSize = v; init(); } });
  const mutS = slider({ label: 'Mutation rate', min: 0, max: 0.2, step: 0.005, value: params.mutationRate, format: (v) => v.toFixed(3),
    onInput: (v) => { params.mutationRate = v; } });
  const spS = slider({ label: 'Generations / sec', min: 1, max: 60, step: 1, value: params.speed,
    onInput: (v) => { params.speed = v; } });
  const playT = toggle({ label: 'Run', value: params.autoplay, onChange: (v) => { params.autoplay = v; } });
  const stepB = button({ label: 'Step', onClick: () => { generationStep(); render(); } });
  const resetB = button({ label: 'Reset', primary: true, onClick: init });
  ctrlPanel.append(popS.el, mutS.el, spS.el, playT.el, row(stepB, resetB));

  let raf = 0, last = 0, acc = 0;
  function tick(ts) {
    if (!last) last = ts;
    const dt = (ts - last) / 1000; last = ts;
    if (params.autoplay) {
      acc += dt * params.speed;
      while (acc >= 1) { generationStep(); acc -= 1; }
      render();
    }
    raf = requestAnimationFrame(tick);
  }
  raf = requestAnimationFrame(tick);

  return () => { cancelAnimationFrame(raf); };
}
