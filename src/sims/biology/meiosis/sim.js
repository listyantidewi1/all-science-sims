import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';

const PHASES = [
  { name: 'Interphase (G2)',     desc: 'DNA already replicated; each chromosome has 2 sister chromatids.' },
  { name: 'Prophase I',          desc: 'Homologous chromosomes pair up; crossover forms chiasmata.' },
  { name: 'Metaphase I',         desc: 'Homologous pairs line up at the equator (random orientation).' },
  { name: 'Anaphase I',          desc: 'Homologous chromosomes separate to opposite poles.' },
  { name: 'Telophase I',         desc: 'Two haploid cells form; each has chromosomes with 2 chromatids.' },
  { name: 'Prophase II',         desc: 'New spindles form in each haploid cell.' },
  { name: 'Metaphase II',        desc: 'Chromosomes line up individually at each cell\'s equator.' },
  { name: 'Anaphase II',         desc: 'Sister chromatids separate.' },
  { name: 'Telophase II',        desc: 'Four haploid daughter cells, each with 2 chromosomes.' },
];

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { phase: 0, showRecomb: true, autoplay: false, speed: 0.6 };
  let timeIn = 0;

  function step(dt) {
    if (!params.autoplay) return;
    timeIn += dt * params.speed;
    if (timeIn >= 1.5) { timeIn = 0; params.phase = (params.phase + 1) % PHASES.length; }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    drawPhase(ctx, 30, 80, W - 60, H - 160, params.phase);

    // Header
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 460, 60);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-sans)';
    ctx.fillText(`${params.phase + 1}/${PHASES.length}  ${PHASES[params.phase].name}`, 16, 30);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText(PHASES[params.phase].desc, 16, 50);

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Step through 9 phases to see chromosomes pair, cross over, and divide twice.', 30, H - 12);
  }

  function chromosome(ctx, x, y, color1, color2, doubled, vertical = true) {
    // a chromosome: two sister chromatids if doubled, joined at centromere
    const len = 50;
    if (vertical) {
      ctx.fillStyle = color1;
      ctx.fillRect(x - 6, y - len / 2, 6, len);
      if (doubled) {
        ctx.fillStyle = color2 || color1;
        ctx.fillRect(x, y - len / 2, 6, len);
      }
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fill();
    } else {
      ctx.fillStyle = color1;
      ctx.fillRect(x - len / 2, y - 6, len, 6);
      if (doubled) {
        ctx.fillStyle = color2 || color1;
        ctx.fillRect(x - len / 2, y, len, 6);
      }
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fill();
    }
  }

  function drawCell(ctx, cx, cy, r, content) {
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(120,130,150,0.6)';
    ctx.lineWidth = 2;
    ctx.stroke();
    content(ctx, cx, cy);
  }

  function drawPhase(ctx, x, y, w, h, phase) {
    const cy = y + h / 2;
    // Color the homolog pair: maternal blue, paternal pink. Two pairs total (n = 2).
    const mom = '#0ea5e9', dad = '#ec4899';
    const recomb = params.showRecomb;
    const momR = recomb ? '#a855f7' : mom;   // recombinant chromatids after prophase I
    const dadR = recomb ? '#10b981' : dad;

    if (phase === 0) {
      // Interphase: one cell with 2 pairs (4 chromosomes total), each pair has 2 chromatids
      drawCell(ctx, x + w / 2, cy, 130, (ctx, cx, cy) => {
        chromosome(ctx, cx - 30, cy - 20, mom, mom, true);
        chromosome(ctx, cx + 30, cy - 20, dad, dad, true);
        chromosome(ctx, cx - 30, cy + 20, mom, mom, true);
        chromosome(ctx, cx + 30, cy + 20, dad, dad, true);
      });
    } else if (phase === 1) {
      // Prophase I: homologs paired, with chiasmata (crossover)
      drawCell(ctx, x + w / 2, cy, 130, (ctx, cx, cy) => {
        // pair 1 (long)
        chromosome(ctx, cx - 30, cy - 20, mom, momR, true);
        chromosome(ctx, cx - 18, cy - 20, dad, dadR, true);
        // pair 2 (short, drawn smaller)
        chromosome(ctx, cx + 18, cy + 20, mom, momR, true);
        chromosome(ctx, cx + 30, cy + 20, dad, dadR, true);
        if (recomb) {
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(cx - 30, cy - 5); ctx.lineTo(cx - 12, cy - 5);
          ctx.stroke();
        }
      });
    } else if (phase === 2) {
      // Metaphase I: pairs at equator
      drawCell(ctx, x + w / 2, cy, 130, (ctx, cx, cy) => {
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.beginPath();
        ctx.moveTo(cx - 110, cy); ctx.lineTo(cx + 110, cy);
        ctx.stroke();
        chromosome(ctx, cx - 30, cy - 5, mom, momR, true);
        chromosome(ctx, cx - 18, cy + 5, dad, dadR, true);
        chromosome(ctx, cx + 18, cy - 5, mom, momR, true);
        chromosome(ctx, cx + 30, cy + 5, dad, dadR, true);
      });
    } else if (phase === 3) {
      // Anaphase I: homologs separate
      drawCell(ctx, x + w / 2, cy, 140, (ctx, cx, cy) => {
        chromosome(ctx, cx - 70, cy - 20, mom, momR, true);
        chromosome(ctx, cx + 70, cy - 20, dad, dadR, true);
        chromosome(ctx, cx - 70, cy + 20, dad, dadR, true);
        chromosome(ctx, cx + 70, cy + 20, mom, momR, true);
      });
    } else if (phase === 4 || phase === 5) {
      // Telophase I or Prophase II — two cells
      const xs = [x + w * 0.3, x + w * 0.7];
      const labels = phase === 4 ? ['n=2, 2c each (cell 1)', 'n=2, 2c each (cell 2)'] : ['Prophase II - cell 1', 'Prophase II - cell 2'];
      for (let i = 0; i < 2; i++) {
        drawCell(ctx, xs[i], cy, 90, (ctx, cx, cy) => {
          chromosome(ctx, cx - 20, cy - 15, i === 0 ? mom : dad, i === 0 ? momR : dadR, true);
          chromosome(ctx, cx + 20, cy - 15, i === 0 ? dad : mom, i === 0 ? dadR : momR, true);
        });
        ctx.fillStyle = 'rgba(120,130,150,0.85)';
        ctx.font = '11px var(--font-mono)';
        ctx.fillText(labels[i], xs[i] - 60, cy + 110);
      }
    } else if (phase === 6) {
      // Metaphase II — two cells, chromosomes at equator
      const xs = [x + w * 0.3, x + w * 0.7];
      for (let i = 0; i < 2; i++) {
        drawCell(ctx, xs[i], cy, 90, (ctx, cx, cy) => {
          ctx.strokeStyle = 'rgba(255,255,255,0.3)';
          ctx.beginPath();
          ctx.moveTo(cx - 80, cy); ctx.lineTo(cx + 80, cy);
          ctx.stroke();
          chromosome(ctx, cx - 20, cy, i === 0 ? mom : dad, i === 0 ? momR : dadR, true);
          chromosome(ctx, cx + 20, cy, i === 0 ? dad : mom, i === 0 ? dadR : momR, true);
        });
      }
    } else if (phase === 7) {
      // Anaphase II — sister chromatids separating in both cells
      const xs = [x + w * 0.3, x + w * 0.7];
      for (let i = 0; i < 2; i++) {
        drawCell(ctx, xs[i], cy, 100, (ctx, cx, cy) => {
          chromosome(ctx, cx - 50, cy - 20, i === 0 ? mom : dad, null, false);
          chromosome(ctx, cx + 50, cy - 20, i === 0 ? momR : dadR, null, false);
          chromosome(ctx, cx - 50, cy + 20, i === 0 ? dad : mom, null, false);
          chromosome(ctx, cx + 50, cy + 20, i === 0 ? dadR : momR, null, false);
        });
      }
    } else {
      // Telophase II / four gametes
      const xs = [x + w * 0.18, x + w * 0.40, x + w * 0.62, x + w * 0.84];
      const colors = [mom, dad, momR, dadR];
      const partner = [dad, mom, dadR, momR];
      for (let i = 0; i < 4; i++) {
        drawCell(ctx, xs[i], cy, 70, (ctx, cx, cy) => {
          chromosome(ctx, cx - 10, cy - 15, colors[i], null, false);
          chromosome(ctx, cx + 10, cy + 15, partner[i], null, false);
        });
        ctx.fillStyle = 'rgba(120,130,150,0.85)';
        ctx.font = '10px var(--font-mono)';
        ctx.fillText(`gamete ${i + 1}`, xs[i] - 20, cy + 88);
      }
    }
  }

  // controls
  const phaseS = slider({ label: 'Phase', min: 0, max: PHASES.length - 1, step: 1, value: params.phase, format: (v) => `${v + 1}/${PHASES.length}`,
    onInput: (v) => { params.phase = v; params.autoplay = false; autoT.value = false; } });
  const stepRow = document.createElement('div');
  stepRow.className = 'ctrl-row';
  const backB = button({ label: '◀ Back', onClick: () => { params.phase = (params.phase - 1 + PHASES.length) % PHASES.length; phaseS.value = params.phase; } });
  const fwdB = button({ label: 'Step ▶', primary: true, onClick: () => { params.phase = (params.phase + 1) % PHASES.length; phaseS.value = params.phase; } });
  stepRow.append(backB.el, fwdB.el);

  const autoT = toggle({ label: 'Auto-play', value: params.autoplay, onChange: (v) => { params.autoplay = v; } });
  const recT = toggle({ label: 'Show recombination (crossover)', value: params.showRecomb, onChange: (v) => { params.showRecomb = v; } });

  ctrlPanel.append(phaseS.el, stepRow, autoT.el, recT.el);

  const animator = loop((dt) => { step(Math.min(0.1, dt)); phaseS.value = params.phase; draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
