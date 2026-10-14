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

  // Leading strand: synthesized continuously 5'→3' toward the fork.
  // Lagging strand: synthesized in Okazaki fragments of length OK_LEN. Each
  // fragment is primed near the fork once its stretch of template is exposed
  // and then grows 5'→3' AWAY from the fork, back toward the previous fragment.
  const OK_LEN = 6;
  const LEN = TEMPLATE.length;
  // `pos` runs past LEN by OK_LEN so the last fragment can be filled in after
  // the fork has reached the end of the template.
  const POS_MAX = LEN + OK_LEN;
  let pos = 0;

  function step(dt) {
    if (params.autoplay) pos += dt * params.speed;
    if (pos > POS_MAX) pos = POS_MAX;
  }

  /** Bases of the lagging strand already synthesized, fragment by fragment. */
  function okazakiFragments(p) {
    const frags = [];
    for (let f = 0; f * OK_LEN < LEN; f++) {
      const startI = f * OK_LEN;
      const endI = Math.min((f + 1) * OK_LEN, LEN);   // primer site, nearest the fork
      const grown = Math.max(0, Math.min(endI - startI, Math.floor(p - endI)));
      if (grown <= 0) break;
      frags.push({ from: endI - grown, to: endI, done: grown === endI - startI });
    }
    return frags;
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
    const forkPos = Math.min(pos, LEN);
    const forkX = 30 + forkPos * cellW;

    // Top template (5' → 3')
    for (let i = 0; i < TEMPLATE.length; i++) {
      const x = 30 + i * cellW + cellW / 2;
      const b = TEMPLATE[i];
      ctx.fillStyle = BASE_COLOR[b];
      ctx.fillRect(x - baseSize / 2, cyTop - baseSize / 2, baseSize, baseSize);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px ui-monospace, Menlo, Consolas, monospace';
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
      if (i < forkPos) continue;  // already opened
      ctx.strokeStyle = 'rgba(120,130,150,0.4)';
      ctx.beginPath();
      ctx.moveTo(x, cyTop + baseSize / 2);
      ctx.lineTo(x, cyBot - baseSize / 2);
      ctx.stroke();
    }

    // New leading strand (synthesized along top template, continuously toward the fork)
    for (let i = 0; i < forkPos; i++) {
      const x = 30 + i * cellW + cellW / 2;
      const newBase = COMPLEMENT[TEMPLATE[i]];
      const newY = cyTop + baseSize + 2;
      ctx.fillStyle = BASE_COLOR[newBase] + '88';
      ctx.fillRect(x - baseSize / 2 + 2, newY - 6, baseSize - 4, 4);
    }

    // Lagging strand: Okazaki fragments. Each is primed at its fork-side end and
    // grows leftward (away from the fork); finished fragments are pale, the one
    // being built is yellow, and orange ticks mark the nicks ligase must seal.
    const frags = okazakiFragments(pos);
    const fragments = frags.filter((fr) => fr.done).length;
    for (const fr of frags) {
      for (let i = fr.from; i < fr.to; i++) {
        const x = 30 + i * cellW + cellW / 2;
        const newBase = COMPLEMENT[COMPLEMENT[TEMPLATE[i]]];
        const newY = cyBot - baseSize - 4;
        ctx.fillStyle = fr.done ? BASE_COLOR[newBase] + '88' : '#fbbf24';
        ctx.fillRect(x - baseSize / 2 + 2, newY + 4, baseSize - 4, 4);
      }
      if (fr.done) {
        // Nick between this fragment and the next one (sealed by ligase)
        const gapX = 30 + fr.to * cellW;
        ctx.fillStyle = 'rgba(245,158,11,0.6)';
        ctx.fillRect(gapX - 2, cyBot - baseSize, 2, 6);
      } else {
        // Growing fragment: arrow pointing away from the fork (5'→3' of the new strand)
        const xHead = 30 + fr.from * cellW + cellW / 2 - baseSize / 2;
        const yArr = cyBot - baseSize - 10;
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(xHead + 12, yArr);
        ctx.lineTo(xHead, yArr);
        ctx.moveTo(xHead + 4, yArr - 3);
        ctx.lineTo(xHead, yArr);
        ctx.lineTo(xHead + 4, yArr + 3);
        ctx.stroke();
        ctx.lineWidth = 1;
      }
    }

    // Helicase (the fork)
    if (forkPos < LEN) {
      ctx.fillStyle = '#a78bfa';
      ctx.beginPath();
      ctx.moveTo(forkX, (cyTop + cyBot) / 2);
      ctx.lineTo(forkX - 18, (cyTop + cyBot) / 2 - 18);
      ctx.lineTo(forkX - 18, (cyTop + cyBot) / 2 + 18);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = '10px ui-monospace, Menlo, Consolas, monospace';
      ctx.fillText('helicase', forkX - 35, (cyTop + cyBot) / 2 - 24);
    }

    // Strand labels
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px system-ui, -apple-system, Roboto, sans-serif';
    // Fork moves left → right. A new strand grows 5'→3' and is antiparallel to its
    // template, so the template running 3'→5' (left to right) gives the leading
    // strand, and the template running 5'→3' gives the lagging strand.
    ctx.fillText("3' → 5' template → leading strand (new strand grows 5'→3' toward the fork →)", 30, cyTop - baseSize / 2 - 6);
    ctx.fillText("5' → 3' template → lagging strand (← Okazaki fragments grow 5'→3' away from the fork)", 30, cyBot + baseSize / 2 + 22);

    // Info
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 280, 28);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText(`Replicated: ${Math.floor(forkPos)}/${LEN} bp    fragments: ${fragments}`, 16, 28);
  }

  // controls
  const sS = slider({ label: 'Speed (bp/sec)', min: 0.5, max: 15, step: 0.5, value: params.speed, format: (v) => v.toFixed(1),
    onInput: (v) => { params.speed = v; } });
  const playT = toggle({ label: 'Auto-play', value: params.autoplay, onChange: (v) => { params.autoplay = v; } });
  const stepB = button({ label: 'Step +1', onClick: () => { pos = Math.min(POS_MAX, pos + 1); } });
  const resetB = button({ label: 'Reset', primary: true, onClick: () => { pos = 0; } });
  ctrlPanel.append(sS.el, playT.el, row(stepB, resetB));

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
