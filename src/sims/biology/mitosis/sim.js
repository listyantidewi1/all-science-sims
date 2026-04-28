import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle, select } from '../../../lib/controls.js';

const STAGES = [
  { key: 'interphase', name: 'Interphase', desc: 'DNA replicates; chromosomes still loose chromatin' },
  { key: 'prophase',   name: 'Prophase',   desc: 'Chromosomes condense; nuclear envelope breaks down; spindle forms' },
  { key: 'metaphase',  name: 'Metaphase',  desc: 'Chromosomes align at the equator (metaphase plate)' },
  { key: 'anaphase',   name: 'Anaphase',   desc: 'Sister chromatids pulled to opposite poles' },
  { key: 'telophase',  name: 'Telophase',  desc: 'Nuclear envelopes reform; chromosomes decondense' },
  { key: 'cytokinesis',name: 'Cytokinesis',desc: 'Cell pinches; two daughter cells separate' },
];

const N_CHROM = 4; // chromosome pairs

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    stage: 0,
    autoplay: true,
    speed: 0.4,
  };

  let progress = 0; // 0..1 within current stage

  function step(dt) {
    if (!params.autoplay) return;
    progress += dt * params.speed;
    if (progress >= 1) {
      progress = 0;
      params.stage = (params.stage + 1) % STAGES.length;
      stageSel.value = String(params.stage);
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const cx = W / 2, cy = H / 2;
    const cellR = Math.min(W, H) * 0.32;

    const stage = STAGES[params.stage].key;

    // Cell membrane (might pinch in cytokinesis)
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.7)';
    ctx.lineWidth = 3;
    if (stage === 'cytokinesis') {
      // two cells forming
      const sep = progress * cellR * 0.9;
      ctx.beginPath();
      ctx.arc(cx - sep, cy, cellR * (1 - progress * 0.2), 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx + sep, cy, cellR * (1 - progress * 0.2), 0, Math.PI * 2);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(cx, cy, cellR, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Nuclear envelope (breaks down in prophase, reforms in telophase)
    if (stage === 'interphase' || stage === 'prophase' || stage === 'telophase') {
      let alpha = 0.5;
      if (stage === 'prophase') alpha = 0.5 * (1 - progress);
      if (stage === 'telophase') alpha = 0.5 * progress;
      ctx.strokeStyle = `rgba(120, 130, 150, ${alpha})`;
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      if (stage === 'telophase') {
        ctx.beginPath();
        ctx.arc(cx - cellR * 0.4, cy, cellR * 0.4, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx + cellR * 0.4, cy, cellR * 0.4, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(cx, cy, cellR * 0.55, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.setLineDash([]);
    }

    // Centrosomes / poles
    const poleX = cellR * 0.85;
    if (stage === 'prophase' || stage === 'metaphase' || stage === 'anaphase' || stage === 'telophase') {
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath(); ctx.arc(cx - poleX, cy, 6, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx + poleX, cy, 6, 0, Math.PI * 2); ctx.fill();
      // spindle fibers
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 12; i++) {
        const ty = cy - cellR * 0.4 + (i / 11) * cellR * 0.8;
        ctx.beginPath();
        ctx.moveTo(cx - poleX, cy); ctx.lineTo(cx, ty);
        ctx.moveTo(cx + poleX, cy); ctx.lineTo(cx, ty);
        ctx.stroke();
      }
    }

    // Chromosomes
    drawChromosomes(ctx, cx, cy, cellR, stage, progress);

    // info banner
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, W - 16, 40);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-sans)';
    ctx.fillText(STAGES[params.stage].name, 16, 28);
    ctx.font = '12px var(--font-sans)';
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.fillText(STAGES[params.stage].desc, 16, 44);

    // progress bar
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fillRect(8, H - 14, W - 16, 4);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(8, H - 14, (W - 16) * (params.stage + progress) / STAGES.length, 4);
  }

  function drawChromosomes(ctx, cx, cy, R, stage, p) {
    const colors = ['#ef4444', '#3b82f6', '#10b981', '#a855f7'];
    for (let i = 0; i < N_CHROM; i++) {
      const color = colors[i % colors.length];
      // Each pair: in interphase = chromatin tangle; later = X-shape (replicated chromosomes)
      let x = cx, y = cy;
      let condensed = false;
      let split = false;

      if (stage === 'interphase') {
        x = cx + (i - 1.5) * R * 0.2;
        y = cy + Math.sin(i * 1.7) * R * 0.2;
        condensed = false;
      } else if (stage === 'prophase') {
        x = cx + (i - 1.5) * R * 0.18 * (1 - p * 0.3);
        y = cy + Math.sin(i * 1.7) * R * 0.2 * (1 - p);
        condensed = true;
      } else if (stage === 'metaphase') {
        x = cx;
        y = cy + (i - (N_CHROM - 1) / 2) * 22;
        condensed = true;
      } else if (stage === 'anaphase') {
        // Two chromatids fly to poles
        const targetX = R * 0.7 * p;
        const ty = cy + (i - (N_CHROM - 1) / 2) * 22;
        // left chromatid
        drawChromatid(ctx, cx - targetX, ty, color, true);
        drawChromatid(ctx, cx + targetX, ty, color, true);
        continue;
      } else if (stage === 'telophase') {
        const ty = cy + (i - (N_CHROM - 1) / 2) * 22 * (1 - p * 0.5);
        drawChromatid(ctx, cx - R * 0.7 + p * R * 0.05, ty, color, !p > 0.7);
        drawChromatid(ctx, cx + R * 0.7 - p * R * 0.05, ty, color, true);
        continue;
      } else if (stage === 'cytokinesis') {
        const ty = cy + (i - (N_CHROM - 1) / 2) * 18;
        const sep = R * 0.85;
        drawChromatid(ctx, cx - sep + (Math.random() - 0.5) * 4, ty, color, false);
        drawChromatid(ctx, cx + sep + (Math.random() - 0.5) * 4, ty, color, false);
        continue;
      }

      if (condensed) {
        // X-shape
        drawChromosomeX(ctx, x, y, color);
      } else {
        // chromatin tangle
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let k = 0; k < 12; k++) {
          const a = k / 12 * Math.PI * 2 + i;
          const r1 = 12 + Math.sin(k * 1.3) * 6;
          ctx.lineTo(x + Math.cos(a) * r1, y + Math.sin(a) * r1);
        }
        ctx.closePath();
        ctx.stroke();
      }
    }
  }

  function drawChromosomeX(ctx, x, y, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x - 8, y - 12); ctx.lineTo(x + 8, y + 12);
    ctx.moveTo(x - 8, y + 12); ctx.lineTo(x + 8, y - 12);
    ctx.stroke();
    // centromere
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
  }
  function drawChromatid(ctx, x, y, color, vertical) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.beginPath();
    if (vertical) {
      ctx.moveTo(x, y - 14); ctx.lineTo(x, y + 14);
    } else {
      ctx.moveTo(x - 12, y); ctx.lineTo(x + 12, y);
    }
    ctx.stroke();
  }

  // controls
  const stageSel = select({
    label: 'Stage',
    options: STAGES.map((s, i) => ({ value: String(i), label: s.name })),
    value: '0',
    onChange: (v) => { params.stage = Number(v); progress = 0; },
  });
  const speedS = slider({ label: 'Speed', min: 0.1, max: 2, step: 0.05, value: params.speed, format: (v) => v.toFixed(2),
    onInput: (v) => { params.speed = v; } });
  const playT = toggle({ label: 'Auto-play', value: params.autoplay, onChange: (v) => { params.autoplay = v; } });
  const stepB = button({ label: 'Next stage', onClick: () => {
    progress = 0;
    params.stage = (params.stage + 1) % STAGES.length;
    stageSel.value = String(params.stage);
  } });
  const resetB = button({ label: 'Restart', primary: true, onClick: () => { params.stage = 0; progress = 0; stageSel.value = '0'; } });

  ctrlPanel.append(stageSel.el, speedS.el, playT.el, row(stepB, resetB));

  const animator = loop((dt) => { step(Math.min(0.1, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
