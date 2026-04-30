import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    N: 200,           // population size
    p0: 0.5,          // initial allele freq
    fitAA: 1.0,       // relative fitness
    fitAa: 1.0,
    fitaa: 1.0,
    autoplay: false,
    speed: 4,         // generations per second
  };

  // population: array of genotype 0=AA, 1=Aa, 2=aa
  let pop = [];
  let history = []; // {p, AA, Aa, aa}

  function reset() {
    pop = [];
    for (let i = 0; i < params.N; i++) {
      // each individual gets two random alleles based on p0
      const a1 = Math.random() < params.p0 ? 1 : 0;
      const a2 = Math.random() < params.p0 ? 1 : 0;
      const sum = a1 + a2;
      pop.push(sum === 2 ? 0 : sum === 1 ? 1 : 2);
    }
    history = [];
    record();
  }

  function record() {
    let AA = 0, Aa = 0, aa = 0;
    for (const g of pop) {
      if (g === 0) AA++;
      else if (g === 1) Aa++;
      else aa++;
    }
    const total = AA + Aa + aa;
    const p = total > 0 ? (2 * AA + Aa) / (2 * total) : 0;
    history.push({ p, AA: AA / total, Aa: Aa / total, aa: aa / total });
    if (history.length > 200) history.shift();
  }

  function generation() {
    const fitness = [params.fitAA, params.fitAa, params.fitaa];
    // weighted alleles in mating pool: each individual contributes alleles weighted by fitness
    const allelePool = [];
    for (const g of pop) {
      const w = fitness[g];
      const samples = Math.max(1, Math.round(w * 4));  // contribute ~w copies
      for (let i = 0; i < samples; i++) {
        if (g === 0) { allelePool.push(1); allelePool.push(1); }
        else if (g === 1) { allelePool.push(1); allelePool.push(0); }
        else { allelePool.push(0); allelePool.push(0); }
      }
    }
    if (allelePool.length === 0) return;
    const next = [];
    for (let i = 0; i < params.N; i++) {
      const a1 = allelePool[Math.floor(Math.random() * allelePool.length)];
      const a2 = allelePool[Math.floor(Math.random() * allelePool.length)];
      const sum = a1 + a2;
      next.push(sum === 2 ? 0 : sum === 1 ? 1 : 2);
    }
    pop = next;
    record();
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);
    const halfW = W / 2;

    // population grid (left)
    drawPop(ctx, 20, 30, halfW - 40, H - 60);
    // history (right)
    drawHistory(ctx, halfW + 20, 30, halfW - 40, H - 60);

    const last = history[history.length - 1] || { p: 0.5, AA: 0.25, Aa: 0.5, aa: 0.25 };
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 280, 28);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(`Gen ${history.length - 1}    p = ${last.p.toFixed(3)}    q = ${(1-last.p).toFixed(3)}`, 16, 28);
  }

  function drawPop(ctx, x, y, w, h) {
    const cols = Math.ceil(Math.sqrt(params.N * w / h));
    const rows = Math.ceil(params.N / cols);
    const cw = w / cols, ch = h / rows;
    const r = Math.min(cw, ch) * 0.38;
    for (let i = 0; i < pop.length; i++) {
      const cx = x + (i % cols) * cw + cw / 2;
      const cy = y + Math.floor(i / cols) * ch + ch / 2;
      const g = pop[i];
      ctx.fillStyle = g === 0 ? '#3b82f6' : g === 1 ? '#a78bfa' : '#ef4444';
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }
    // legend
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('AA', x, y - 4);
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(x + 18, y - 12, 10, 10);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.fillText('Aa', x + 50, y - 4);
    ctx.fillStyle = '#a78bfa';
    ctx.fillRect(x + 68, y - 12, 10, 10);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.fillText('aa', x + 100, y - 4);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(x + 118, y - 12, 10, 10);
  }

  function drawHistory(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(x, y, w, h);
    if (history.length < 2) return;
    const px = (i) => x + (i / 199) * w;
    const py = (v) => y + h - v * h;
    function plot(key, color) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      history.forEach((p, i) => i === 0 ? ctx.moveTo(px(i), py(p[key])) : ctx.lineTo(px(i), py(p[key])));
      ctx.stroke();
    }
    plot('AA', '#3b82f6');
    plot('Aa', '#a78bfa');
    plot('aa', '#ef4444');
    plot('p', '#10b981');
    // labels
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('genotype freqs + p (green)', x + 6, y - 4);
    ctx.fillText('generations →', x + w - 90, y + h + 14);
  }

  // controls
  const NS = slider({ label: 'Population size N', min: 20, max: 1000, step: 10, value: params.N,
    onInput: (v) => { params.N = v; reset(); } });
  const pS = slider({ label: 'Initial p', min: 0, max: 1, step: 0.01, value: params.p0, format: (v) => v.toFixed(2),
    onInput: (v) => { params.p0 = v; reset(); } });
  const fAAS = slider({ label: 'Fitness AA', min: 0, max: 2, step: 0.05, value: params.fitAA, format: (v) => v.toFixed(2),
    onInput: (v) => { params.fitAA = v; } });
  const fAaS = slider({ label: 'Fitness Aa', min: 0, max: 2, step: 0.05, value: params.fitAa, format: (v) => v.toFixed(2),
    onInput: (v) => { params.fitAa = v; } });
  const faaS = slider({ label: 'Fitness aa', min: 0, max: 2, step: 0.05, value: params.fitaa, format: (v) => v.toFixed(2),
    onInput: (v) => { params.fitaa = v; } });
  const speedS = slider({ label: 'Generations / sec', min: 1, max: 30, step: 1, value: params.speed,
    onInput: (v) => { params.speed = v; } });
  const playT = toggle({ label: 'Auto-evolve', value: params.autoplay, onChange: (v) => { params.autoplay = v; } });
  const stepB = button({ label: 'Step', onClick: () => generation() });
  const resetB = button({ label: 'Reset', primary: true, onClick: reset });

  ctrlPanel.append(NS.el, pS.el, fAAS.el, fAaS.el, faaS.el, speedS.el, playT.el, row(stepB, resetB));

  // Lab — verify HW equilibrium and watch selection break it.
  const lab = labPanel({
    title: 'Hardy-Weinberg lab — equilibrium and selection',
    filename: 'hardy-weinberg-lab.csv',
    columns: [
      { key: 'gen',  label: 'generation' },
      { key: 'p',    label: 'p (A freq)', format: (v) => v.toFixed(3) },
      { key: 'AA',   label: 'AA freq', format: (v) => v.toFixed(3) },
      { key: 'Aa',   label: 'Aa freq', format: (v) => v.toFixed(3) },
      { key: 'aa',   label: 'aa freq', format: (v) => v.toFixed(3) },
      { key: 'pred_AA', label: 'predicted p²', format: (v) => v.toFixed(3) },
    ],
    procedure: [
      'Reset with p = 0.5, all fitness = 1. Step 5 generations; record after each.',
      'Verify HW: AA ≈ p², Aa ≈ 2pq, aa ≈ q² (with random sampling drift).',
      'Set fitAA = 1.0, fitAa = 0.9, faa = 0.5 (recessive disadvantage). Watch p rise.',
      'Try heterozygote advantage: fitAa = 1.0, fitAA = 0.7, faa = 0.7. p settles to a stable middle.',
      'Crank N down to 20 — see strong genetic drift even without selection.',
    ],
    predict: 'In a population, aa = 1%. Under HW, what is q? p? AA? Aa frequency?',
    source: () => {
      const last = history[history.length - 1];
      if (!last) return null;
      return {
        gen: history.length,
        p: last.p,
        AA: last.AA,
        Aa: last.Aa,
        aa: last.aa,
        pred_AA: last.p * last.p,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  reset();
  let acc = 0;
  const animator = loop((dt) => {
    if (params.autoplay) {
      acc += dt * params.speed;
      while (acc >= 1) { generation(); acc -= 1; }
    }
    draw();
  });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
