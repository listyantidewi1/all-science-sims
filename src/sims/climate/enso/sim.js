import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { idx: 0 };  // -2..+2; negative = La Niña, positive = El Niño

  function regionState() {
    if (params.idx <= -1.5) return { name: 'Strong La Niña', desc: 'Warm pool jammed west; drought west South America, floods Indonesia/Australia.' };
    if (params.idx <= -0.5) return { name: 'Weak La Niña', desc: 'Stronger east-west gradient than neutral.' };
    if (params.idx <  0.5)  return { name: 'Neutral', desc: 'Gentle warm-pool tilt; trades flow east-to-west normally.' };
    if (params.idx <  1.5)  return { name: 'Weak El Niño', desc: 'Warm water spreads east; rains shift east.' };
    return { name: 'Strong El Niño', desc: 'Warm pool sloshes east; drought Indonesia/Australia, floods Peru.' };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Pacific cross-section
    const padX = 50;
    const padY = 80;
    const cw = W - padX * 2;
    const ch = H * 0.55;
    drawCross(ctx, padX, padY, cw, ch);

    // Globe map below — show rainfall anomaly bands
    drawAnomalies(ctx, padX, padY + ch + 30, cw, H - padY - ch - 60);

    const s = regionState();
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 380, 60);
    ctx.fillStyle = params.idx > 0.5 ? '#ef4444' : params.idx < -0.5 ? '#0ea5e9' : '#10b981';
    ctx.font = 'bold 16px var(--font-mono)';
    ctx.fillText(s.name, 16, 30);
    ctx.fillStyle = '#fff';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`Niño-3.4 anomaly = ${params.idx >= 0 ? '+' : ''}${params.idx.toFixed(2)} °C`, 16, 50);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.fillText(s.desc, 16, 64);
  }

  function drawCross(ctx, x, y, w, h) {
    // Sea surface temperature gradient at top — colored band
    const surfaceH = 30;
    for (let i = 0; i <= 100; i++) {
      const lon = i / 100;        // 0 = west (Indonesia), 1 = east (Peru)
      const baseT = 26 + (1 - lon) * 4;     // climatology: warm pool west
      const anom = -params.idx * 2.5 * (lon - 0.5) * 2;   // El Niño: warmer east, cooler west
      const T = baseT + anom;
      const tNorm = Math.max(0, Math.min(1, (T - 22) / 12));
      const r = Math.round(50 + tNorm * 200);
      const b = Math.round(255 - tNorm * 200);
      ctx.fillStyle = `rgb(${r}, ${Math.round(60 + tNorm * 60)}, ${b})`;
      ctx.fillRect(x + lon * w, y, w / 100 + 1, surfaceH);
    }
    // Labels
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px var(--font-mono)';
    ctx.fillText('Indonesia', x + 6, y - 4);
    ctx.fillText('West Pacific', x + 6, y + surfaceH + 12);
    ctx.fillText('Peru', x + w - 50, y - 4);
    ctx.fillText('East Pacific', x + w - 60, y + surfaceH + 12);

    // Thermocline curve below — slope changes with ENSO state
    ctx.strokeStyle = 'rgba(251,191,36,0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
      const lon = i / 100;
      // Climatology: thermocline is shallow east, deep west.
      // ENSO modulates the slope: El Niño flattens or reverses; La Niña steepens.
      const climDepth = 50 + (1 - lon) * 100;     // shallow east
      const anomDepth = params.idx * 60 * (lon - 0.5) * 2;  // El Niño deepens east
      const depthM = climDepth + anomDepth;
      const yy = y + surfaceH + 30 + depthM / 200 * (h - surfaceH - 60);
      if (i === 0) ctx.moveTo(x + lon * w, yy); else ctx.lineTo(x + lon * w, yy);
    }
    ctx.stroke();
    ctx.fillStyle = '#fbbf24';
    ctx.font = '10px var(--font-mono)';
    ctx.fillText('thermocline (warm above, cold below)', x + 6, y + h - 6);

    // Cold water beneath thermocline
    ctx.fillStyle = 'rgba(30,58,138,0.4)';
    ctx.fillRect(x, y + h - 4, w, 4);

    // Trade winds (arrows along surface)
    const windStrength = 1 - params.idx * 0.4;   // La Niña: strong easterlies, El Niño: weak
    const arrowCount = Math.max(2, Math.round(windStrength * 8));
    if (arrowCount > 0) {
      ctx.strokeStyle = 'rgba(120,130,150,0.85)';
      ctx.lineWidth = 2;
      for (let i = 0; i < arrowCount; i++) {
        const xx = x + w * (0.1 + i / arrowCount * 0.8);
        ctx.beginPath();
        ctx.moveTo(xx + 20, y - 24); ctx.lineTo(xx, y - 24);
        ctx.lineTo(xx + 5, y - 20); ctx.moveTo(xx, y - 24); ctx.lineTo(xx + 5, y - 28);
        ctx.stroke();
      }
      ctx.fillStyle = 'rgba(120,130,150,0.85)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`trade winds (${windStrength.toFixed(2)})`, x + w / 2 - 50, y - 30);
    }
  }

  function drawAnomalies(ctx, x, y, w, h) {
    const regions = [
      { name: 'Indonesia / Maritime SE Asia', cliff: 'wet', xfrac: 0.08 },
      { name: 'East Australia',                cliff: 'wet', xfrac: 0.20 },
      { name: 'Peru / W. South America',       cliff: 'dry', xfrac: 0.78 },
      { name: 'Southern US winters',           cliff: 'dry', xfrac: 0.62 },
      { name: 'Africa Sahel',                  cliff: 'dry', xfrac: 0.38 },
    ];
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('Global rainfall anomalies (sign flips between El Niño and La Niña)', x, y - 6);

    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fillRect(x, y, w, h);

    for (const r of regions) {
      // Anomaly: La Niña wet for "wet" regions, dry for "dry"; El Niño the reverse.
      const sign = r.cliff === 'wet' ? -params.idx : params.idx;   // sign of anomaly
      const mag = Math.min(1, Math.abs(sign));
      const px = x + r.xfrac * w;
      const py = y + h / 2;
      const color = sign > 0 ? `rgba(14,165,233,${0.3 + mag * 0.6})` : `rgba(239,68,68,${0.3 + mag * 0.6})`;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(px, py, 12 + mag * 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(r.name, px - 50, py + 28);
      const label = sign > 0.1 ? 'wetter' : sign < -0.1 ? 'drier' : 'normal';
      ctx.fillStyle = sign > 0 ? '#0ea5e9' : sign < 0 ? '#ef4444' : '#10b981';
      ctx.fillText(label, px - 12, py + 4);
    }
  }

  // controls
  const idxS = slider({ label: 'Niño-3.4 anomaly (°C)', min: -2.5, max: 2.5, step: 0.05, value: params.idx, format: (v) => v.toFixed(2),
    onInput: (v) => { params.idx = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [n, v] of [['Strong La Niña', -2], ['Weak La Niña', -1], ['Neutral', 0], ['Weak El Niño', 1], ['Strong El Niño', 2]]) {
    const b = button({ label: n, onClick: () => { params.idx = v; idxS.value = v; } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(idxS.el, presetRow);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
