import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    prevalence: 0.01,    // P(D)
    sensitivity: 0.99,   // P(+|D)
    specificity: 0.99,   // P(-|¬D)
    population: 10000,
  };

  function compute() {
    const N = params.population;
    const sick = Math.round(N * params.prevalence);
    const healthy = N - sick;
    const TP = Math.round(sick * params.sensitivity);
    const FN = sick - TP;
    const TN = Math.round(healthy * params.specificity);
    const FP = healthy - TN;
    const totalPos = TP + FP;
    const PPV = totalPos > 0 ? TP / totalPos : 0;
    return { N, sick, healthy, TP, FN, TN, FP, PPV };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    const r = compute();

    // Population dot grid (top half)
    const cols = 100, rows = 100;
    const dotSize = Math.min((W - 40) / cols, (H * 0.55) / rows);
    const startX = (W - cols * dotSize) / 2;
    const startY = 20;
    let i = 0;
    const dots = r.N;
    const sickDots = r.sick;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (i >= dots) break;
        const isSick = i < sickDots;
        // mark TP/FN among sick; TN/FP among healthy
        let color = '#475569';
        if (isSick) {
          color = i < r.TP ? '#10b981' : '#fbbf24'; // TP green, FN yellow
        } else {
          // i in [sickDots, N)
          const j = i - sickDots;
          if (j < r.FP) color = '#ef4444'; // FP red
          else color = '#1e293b'; // TN dark
        }
        ctx.fillStyle = color;
        ctx.fillRect(startX + x * dotSize, startY + y * dotSize, dotSize - 0.5, dotSize - 0.5);
        i++;
      }
    }

    // Bar showing positives breakdown
    const barY = H * 0.7;
    const barH = 30;
    const barW = W - 60;
    const totalPos = r.TP + r.FP;
    const tpFrac = totalPos > 0 ? r.TP / totalPos : 0;
    ctx.fillStyle = '#10b981';
    ctx.fillRect(30, barY, barW * tpFrac, barH);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(30 + barW * tpFrac, barY, barW * (1 - tpFrac), barH);
    ctx.strokeStyle = 'rgba(120,130,150,0.7)';
    ctx.strokeRect(30, barY, barW, barH);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText(`True positives ${r.TP}`, 36, barY + 20);
    ctx.fillText(`False positives ${r.FP}`, 30 + barW * tpFrac + 10, barY + 20);

    // Big readout
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, H - 70, 320, 60);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-sans)';
    ctx.fillText(`P(disease | positive) = ${(r.PPV * 100).toFixed(2)}%`, 16, H - 48);
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`prev=${(params.prevalence*100).toFixed(2)}%  sens=${(params.sensitivity*100).toFixed(1)}%  spec=${(params.specificity*100).toFixed(1)}%`, 16, H - 28);
    ctx.fillText(`Of ${r.N} people: ${r.sick} sick, ${r.TP} TP, ${r.FN} FN, ${r.FP} FP, ${r.TN} TN`, 16, H - 14);

    // Legend
    ctx.fillStyle = '#10b981';
    ctx.fillRect(W - 170, H - 70, 12, 12);
    ctx.fillStyle = '#fff';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('True positive', W - 154, H - 60);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(W - 170, H - 54, 12, 12);
    ctx.fillStyle = '#fff';
    ctx.fillText('False negative', W - 154, H - 44);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(W - 170, H - 38, 12, 12);
    ctx.fillStyle = '#fff';
    ctx.fillText('False positive', W - 154, H - 28);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(W - 170, H - 22, 12, 12);
    ctx.fillStyle = '#fff';
    ctx.fillText('True negative', W - 154, H - 12);
  }

  // controls
  const prevS = slider({
    label: 'Prevalence P(D)', min: 0.001, max: 0.5, step: 0.001, value: params.prevalence, format: (v) => `${(v*100).toFixed(2)}%`,
    onInput: (v) => { params.prevalence = v; },
  });
  const sensS = slider({
    label: 'Sensitivity P(+|D)', min: 0.5, max: 1, step: 0.001, value: params.sensitivity, format: (v) => `${(v*100).toFixed(1)}%`,
    onInput: (v) => { params.sensitivity = v; },
  });
  const specS = slider({
    label: 'Specificity P(−|¬D)', min: 0.5, max: 1, step: 0.001, value: params.specificity, format: (v) => `${(v*100).toFixed(1)}%`,
    onInput: (v) => { params.specificity = v; },
  });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, p] of [['Rare disease', { prevalence: 0.005, sensitivity: 0.99, specificity: 0.99 }],
                           ['Common', { prevalence: 0.20, sensitivity: 0.95, specificity: 0.95 }],
                           ['Pandemic screen', { prevalence: 0.05, sensitivity: 0.85, specificity: 0.99 }]]) {
    const b = button({ label: name, onClick: () => {
      Object.assign(params, p);
      prevS.value = p.prevalence; sensS.value = p.sensitivity; specS.value = p.specificity;
    } });
    presetRow.appendChild(b.el);
  }

  ctrlPanel.append(prevS.el, sensS.el, specS.el, presetRow);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
