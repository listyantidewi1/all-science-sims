import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';

const N_GROUPS = 18; // 0-4, 5-9, …, 85+
const labels = Array.from({ length: N_GROUPS }, (_, i) => i === N_GROUPS - 1 ? '85+' : `${i*5}-${i*5+4}`);

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const params = {
    fertility: 2.0,    // children per woman
    mortality: 0.005,  // annual chance of dying at age 50; scales the whole age-mortality curve
    autoplay: false,
    yearsPerSec: 1,
  };

  /**
   * Age-specific annual mortality (Gompertz-like): low and nearly flat through
   * childhood and young adulthood, then rising exponentially from about age 50
   * (doubling roughly every 7 years), with a small infant bump in the 0-4 bin.
   * params.mortality is the rate at age 50; at the default 0.005 this gives
   * ~0.002/yr for young adults, ~0.03/yr at 70, ~0.06/yr at 80 and ~0.12/yr at 85+.
   */
  function mortalityAt(i) {
    const age = i * 5 + 2.5;
    let g = 0.3 + 0.7 * Math.exp(0.095 * (age - 50));
    if (i === 0) g += 0.9; // infant and early-childhood mortality
    return Math.min(0.9, params.mortality * g);
  }

  // Each group: [male, female] population
  let groups = Array.from({ length: N_GROUPS }, () => [50, 50]);
  let yearAcc = 0;

  // Each preset sets a schematic starting shape AND the fertility/mortality
  // that keep it looking like its label when the simulation runs.
  function preset(name) {
    if (name === 'youthful') {
      groups = Array.from({ length: N_GROUPS }, (_, i) => {
        const p = Math.max(1, 100 * Math.pow(0.84, i));
        return [p, p];
      });
      setParams(6.5, 0.01);   // expanding: high fertility, higher mortality
    } else if (name === 'stable') {
      groups = Array.from({ length: N_GROUPS }, (_, i) => {
        const p = i < 10 ? 60 : Math.max(10, 60 - (i - 9) * 6.5);
        return [p, p];
      });
      setParams(2.0, 0.005);  // stationary: near replacement fertility
    } else if (name === 'aging') {
      groups = Array.from({ length: N_GROUPS }, (_, i) => {
        const p = i < 5 ? 30 : i < 12 ? 50 : i < 15 ? 60 : i < 17 ? 40 : 20;
        return [p * 0.9, p * 1.1];
      });
      setParams(1.3, 0.004);  // contracting: low fertility, low mortality
    }
  }
  let setParams = (f, m) => { params.fertility = f; params.mortality = m; };

  function advanceYear() {
    // Move everyone up: bin i becomes bin i+1 over 5 years
    // We'll do per-year: each year, 1/5 of bin i moves to bin i+1
    const newG = groups.map(([m, f]) => [m, f]);
    for (let i = N_GROUPS - 1; i > 0; i--) {
      const moveM = newG[i - 1][0] / 5;
      const moveF = newG[i - 1][1] / 5;
      newG[i][0] += moveM;
      newG[i][1] += moveF;
      newG[i - 1][0] -= moveM;
      newG[i - 1][1] -= moveF;
    }
    // Mortality (age-specific, rises steeply after ~50)
    for (let i = 0; i < N_GROUPS; i++) {
      const m = mortalityAt(i);
      newG[i][0] *= (1 - m);
      newG[i][1] *= (1 - m);
    }
    // Births: women aged 15-49 contribute. Bins 3..9 (15-49)
    let women1549 = 0;
    for (let i = 3; i < 10; i++) women1549 += newG[i][1];
    const births = women1549 * params.fertility / 35; // fertility = TFR over 35-year reproductive span (rough)
    newG[0][0] += births / 2;
    newG[0][1] += births / 2;
    groups = newG;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 60, padY = 40;
    const gW = W - padX * 2, gH = H - padY - 40;
    const center = padX + gW / 2;
    const barH = gH / N_GROUPS - 2;
    const maxPop = Math.max(...groups.flat()) || 1;
    const halfW = gW / 2 - 20;

    for (let i = 0; i < N_GROUPS; i++) {
      const y = padY + gH - (i + 1) * (barH + 2);
      const m = groups[i][0], f = groups[i][1];
      const mw = (m / maxPop) * halfW;
      const fw = (f / maxPop) * halfW;
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(center - 5 - mw, y, mw, barH);
      ctx.fillStyle = '#ec4899';
      ctx.fillRect(center + 5, y, fw, barH);
      ctx.fillStyle = 'rgba(120,130,150,0.85)';
      ctx.font = '10px ui-monospace, Menlo, Consolas, monospace';
      ctx.fillText(labels[i], center - 30, y + barH * 0.7);
    }

    // legend
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(padX, 12, 14, 14);
    ctx.fillStyle = '#ec4899';
    ctx.fillRect(padX + 60, 12, 14, 14);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '12px system-ui, -apple-system, Roboto, sans-serif';
    ctx.fillText('Male', padX + 18, 22);
    ctx.fillText('Female', padX + 78, 22);

    // dependency ratio
    let kids = 0, workers = 0, elders = 0;
    for (let i = 0; i < N_GROUPS; i++) {
      const total = groups[i][0] + groups[i][1];
      if (i < 3) kids += total;
      else if (i < 13) workers += total;
      else elders += total;
    }
    const dep = workers > 0 ? ((kids + elders) / workers * 100).toFixed(1) : '∞';
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(W - 220, 8, 210, 56);
    ctx.fillStyle = '#fff';
    ctx.font = '12px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText(`Total: ${(kids + workers + elders).toFixed(0)}`, W - 210, 26);
    ctx.fillText(`Kids ${kids.toFixed(0)} Workers ${workers.toFixed(0)} Elders ${elders.toFixed(0)}`, W - 210, 44);
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 11px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText(`Dependency ratio: ${dep}%`, W - 210, 60);
  }

  // controls
  const fS = slider({ label: 'Fertility (TFR)', min: 0.5, max: 7, step: 0.05, value: params.fertility, format: (v) => v.toFixed(2),
    onInput: (v) => { params.fertility = v; } });
  const mS = slider({ label: 'Mortality at age 50 (per year)', key: 'baseline-mortality', min: 0.001, max: 0.05, step: 0.001, value: params.mortality, format: (v) => v.toFixed(3),
    onInput: (v) => { params.mortality = v; } });
  setParams = (f, m) => { params.fertility = f; params.mortality = m; fS.value = f; mS.value = m; };
  const ypsS = slider({ label: 'Years / sec', min: 0.5, max: 20, step: 0.5, value: params.yearsPerSec, format: (v) => v.toFixed(1),
    onInput: (v) => { params.yearsPerSec = v; } });
  const playT = toggle({ label: 'Run simulation', value: params.autoplay, onChange: (v) => { params.autoplay = v; } });
  const stepB = button({ label: '+1 year', onClick: () => advanceYear() });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, k] of [['Youthful (Niger)', 'youthful'], ['Stable (US)', 'stable'], ['Aging (Japan)', 'aging']]) {
    const b = button({ label: name, onClick: () => preset(k) });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(fS.el, mS.el, ypsS.el, playT.el, row(stepB), presetRow);

  preset('stable');

  const animator = loop((dt) => {
    if (params.autoplay) {
      yearAcc += dt * params.yearsPerSec;
      while (yearAcc >= 1) { advanceYear(); yearAcc -= 1; }
    }
    draw();
  });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
