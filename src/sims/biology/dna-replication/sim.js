import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';

const BASE_COLOR = { A: '#ef4444', T: '#3b82f6', G: '#10b981', C: '#f59e0b' };
const COMPLEMENT = { A: 'T', T: 'A', G: 'C', C: 'G' };

const TEMPLATE = 'ATCGATCGGCATTAGCATCGTAGCATCGGTAACGTACGTAGCATTGGCATCGT';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    speed: 2,
    autoplay: true,
  };

  let pos = 0; // 0..TEMPLATE.length, fork position
  // Leading strand: smoothly synthesized in same direction.
  // Lagging strand: synthesized in Okazaki fragments of length OK_LEN.
  const OK_LEN = 6;

  function step(dt) {
    if (params.autoplay) pos += dt * params.speed;
    if (pos > TEMPLATE.length) pos = TEMPLATE.length;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const cellW = (W - 60) / TEMPLATE.length;
    const baseSize = Math.min(28, cellW * 0.9);
    const cyTop = H * 0.28;
    const cyBot = H * 0.72;

    // Already-replicated region: both strands separate, with new (light) strands attached
    const forkX = 30 + pos * cellW;

    // Top template (5' → 3')
    for (let i = 0; i < TEMPLATE.length; i++) {
      const x = 30 + i * cellW + cellW / 2;
      const b = TEMPLATE[i];
      ctx.fillStyle = BASE_COLOR[b];
      ctx.fillRect(x - baseSize / 2, cyTop - baseSize / 2, baseSize, baseSize);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px var(--font-mono)';
      ctx.textAlign = 'center';
      ctx.fillText(b, x, cyTop + 4);

      // bottom template
      ctx.fillStyle = BASE_COLOR[COMPLEMENT[b]];
      ctx.fillRect(x - baseSize / 2, cyBot - baseSize / 2, baseSize, baseSize);
      ctx.fillStyle = '#fff';
      ctx.fillText(COMPLEMENT[b], x, cyBot + 4);
    }
    ctx.textAlign = 'left';

    // Connecting bonds (where unreplicated)
    for (let i = 0; i < TEMPLATE.length; i++) {
      const x = 30 + i * cellW + cellW / 2;
      if (i < pos) continue;  // already opened
      ctx.strokeStyle = 'rgba(120,130,150,0.4)';
      ctx.beginPath();
      ctx.moveTo(x, cyTop + baseSize / 2);
      ctx.lineTo(x, cyBot - baseSize / 2);
      ctx.stroke();
    }

    // New leading strand (synthesized along top template, starting from left)
    for (let i = 0; i < pos; i++) {
      const x = 30 + i * cellW + cellW / 2;
      const newBase = COMPLEMENT[TEMPLATE[i]];
      const newY = cyTop + baseSize + 2;
      ctx.fillStyle = BASE_COLOR[newBase] + '88';
      ctx.fillRect(x - baseSize / 2 + 2, newY - 6, baseSize - 4, 4);
    }

    // Lagging strand: Okazaki fragments built backward from each segment boundary
    const fragments = Math.floor(pos / OK_LEN);
    for (let f = 0; f < fragments; f++) {
      const startI = f * OK_LEN;
      const endI = Math.min((f + 1) * OK_LEN, pos);
      for (let i = startI; i < endI; i++) {
        const x = 30 + i * cellW + cellW / 2;
        const newBase = COMPLEMENT[COMPLEMENT[TEMPLATE[i]]];
        const newY = cyBot - baseSize - 4;
        ctx.fillStyle = BASE_COLOR[newBase] + '88';
        ctx.fillRect(x - baseSize / 2 + 2, newY + 4, baseSize - 4, 4);
      }
      // Gap (slight) between fragments
      const gapX = 30 + (f + 1) * OK_LEN * cellW;
      ctx.fillStyle = 'rgba(245,158,11,0.6)';
      ctx.fillRect(gapX - 2, cyBot - baseSize, 2, 6);
    }
    // Currently-being-built lagging fragment
    const curFragStart = fragments * OK_LEN;
    for (let i = curFragStart; i < pos; i++) {
      const x = 30 + i * cellW + cellW / 2;
      const newBase = COMPLEMENT[COMPLEMENT[TEMPLATE[i]]];
      const newY = cyBot - baseSize - 4;
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(x - baseSize / 2 + 2, newY + 4, baseSize - 4, 4);
    }

    // Helicase (the fork)
    if (pos < TEMPLATE.length) {
      ctx.fillStyle = '#a78bfa';
      ctx.beginPath();
      ctx.moveTo(forkX, (cyTop + cyBot) / 2);
      ctx.lineTo(forkX - 18, (cyTop + cyBot) / 2 - 18);
      ctx.lineTo(forkX - 18, (cyTop + cyBot) / 2 + 18);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText('helicase', forkX - 35, (cyTop + cyBot) / 2 - 24);
    }

    // Strand labels
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText("5' template (leading)", 30, cyTop - baseSize / 2 - 6);
    ctx.fillText("3' template (lagging — Okazaki fragments)", 30, cyBot + baseSize / 2 + 22);

    // Info
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 280, 28);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`Replicated: ${Math.floor(pos)}/${TEMPLATE.length} bp    fragments: ${fragments}`, 16, 28);
  }

  // controls
  const sS = slider({ label: 'Speed (bp/sec)', min: 0.5, max: 15, step: 0.5, value: params.speed, format: (v) => v.toFixed(1),
    onInput: (v) => { params.speed = v; } });
  const playT = toggle({ label: 'Auto-play', value: params.autoplay, onChange: (v) => { params.autoplay = v; } });
  const stepB = button({ label: 'Step +1', onClick: () => { pos = Math.min(TEMPLATE.length, pos + 1); } });
  const resetB = button({ label: 'Reset', primary: true, onClick: () => { pos = 0; } });
  ctrlPanel.append(sS.el, playT.el, row(stepB, resetB));

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
