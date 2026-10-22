import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const BANK = 3.0;          // river bank height (m); above this the village floods
const N_TREES = 40;
const N_DROPS = 160;
const N_SOIL = 60;

function bigBtn(label, onClick) {
  const b = button({ label, onClick });
  b.el.style.minHeight = '44px';
  b.el.style.fontSize = '1rem';
  b.el.style.padding = '10px 16px';
  return b;
}

export function mount(rootEl) {
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { forest: 80, rain: 40 };          // %, %
  const state = { level: 0.5, soilInRiver: 0, flooding: false, grow: 1 };
  let now = 0;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const font = (px, bold) => `${bold ? 'bold ' : ''}${Math.max(9, Math.round(px))}px system-ui, -apple-system, Roboto, sans-serif`;
  // decimals use a comma in Indonesian (2,7 m), a point in English (2.7 m)
  const dec = (v, d = 1) => { const str = v.toFixed(d); return getLocale() === 'id' ? str.replace('.', ',') : str; };

  // --- model ---
  const cover = () => params.forest / 100;
  const runoffShare = () => 20 + 70 * (1 - cover());                           // % of the rain that runs off: 20 % under full forest, 90 % on bare ground
  const soakShare = () => 100 - runoffShare();                                 // % of the rain that soaks into the ground
  const runoff = () => params.rain * runoffShare() / 100;                      // 0..90, amount of runoff (drives river level and soil loss)
  const soaked = () => Math.max(0, params.rain - runoff());
  const soilLoss = () => runoff() * Math.pow(1 - cover(), 1.5) * 0.5;          // 0..45 "truckloads a day"
  const levelTarget = () => 0.5 + 0.04 * runoff();                              // m, 0.5..4.1
  function step(dt) {
    const k = 1 - Math.exp(-dt / 2.5);
    state.level += (levelTarget() - state.level) * k;
    state.soilInRiver += (soilLoss() - state.soilInRiver) * k;
    state.flooding = state.level > BANK;
    if (state.grow < 1) state.grow = Math.min(1, state.grow + dt * 1.5);
  }

  // --- geometry ---
  // Hill profile: y as fraction of H at x fraction; high on the left, flat valley on the right.
  function hillY(fx) {
    const H = cv.height;
    if (fx < 0.62) { const u = fx / 0.62; return H * (0.3 + 0.45 * (u * u * (3 - 2 * u))); }
    return H * 0.75;
  }
  const riverX0 = () => cv.width * 0.64, riverX1 = () => cv.width * 0.78;
  const metres = () => cv.height * 0.09;   // px per metre of river level
  const riverBottom = () => cv.height * 0.75 + metres() * 1.2;

  // fixed pseudo-random seeds
  const trees = Array.from({ length: N_TREES }, (_, i) => ({ fx: 0.03 + ((i * 0.618034) % 1) * 0.55, s: 0.8 + ((i * 0.37) % 1) * 0.5, order: (i * 7) % N_TREES }));
  const drops = Array.from({ length: N_DROPS }, (_, i) => ({ fx: (i * 0.618034) % 1, fy: (i * 0.377) % 1, v: 0.8 + ((i * 0.21) % 1) * 0.5 }));
  const soil = Array.from({ length: N_SOIL }, (_, i) => ({ u: (i * 0.618034) % 1, off: ((i * 0.29) % 1) }));

  function drawTree(ctx, x, y, s, g) {
    ctx.fillStyle = '#78350f'; ctx.fillRect(x - s * 0.08, y - s * 0.5 * g, s * 0.16, s * 0.5 * g);
    ctx.fillStyle = '#15803d';
    ctx.beginPath(); ctx.moveTo(x, y - s * 1.3 * g); ctx.lineTo(x - s * 0.45 * g, y - s * 0.45 * g); ctx.lineTo(x + s * 0.45 * g, y - s * 0.45 * g); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#16a34a';
    ctx.beginPath(); ctx.moveTo(x, y - s * 1.0 * g); ctx.lineTo(x - s * 0.35 * g, y - s * 0.25 * g); ctx.lineTo(x + s * 0.35 * g, y - s * 0.25 * g); ctx.closePath(); ctx.fill();
  }
  function drawHouse(ctx, x, y, s, flooded) {
    ctx.fillStyle = flooded ? '#cbd5e1' : '#f8fafc'; ctx.fillRect(x - s * 0.5, y - s * 0.8, s, s * 0.8);
    ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(x - s * 0.6, y - s * 0.8); ctx.lineTo(x, y - s * 1.3); ctx.lineTo(x + s * 0.6, y - s * 0.8); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#78350f'; ctx.fillRect(x - s * 0.12, y - s * 0.4, s * 0.24, s * 0.4);
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    const rain = params.rain / 100, c = cover();
    // sky darkens with rain
    const sky = ctx.createLinearGradient(0, 0, 0, H * 0.75);
    sky.addColorStop(0, `rgb(${Math.round(120 - 80 * rain)},${Math.round(170 - 100 * rain)},${Math.round(230 - 120 * rain)})`);
    sky.addColorStop(1, `rgb(${Math.round(180 - 100 * rain)},${Math.round(210 - 110 * rain)},${Math.round(240 - 110 * rain)})`);
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
    // clouds
    if (rain > 0.05) {
      ctx.fillStyle = `rgba(${Math.round(200 - 120 * rain)},${Math.round(205 - 120 * rain)},${Math.round(215 - 110 * rain)},0.95)`;
      for (let i = 0; i < 4; i++) {
        const cx = W * (0.1 + i * 0.26) + Math.sin(now * 0.15 + i) * W * 0.01, cy = H * 0.08;
        ctx.beginPath(); ctx.arc(cx, cy, H * 0.05, 0, Math.PI * 2); ctx.arc(cx + W * 0.05, cy - H * 0.02, H * 0.06, 0, Math.PI * 2); ctx.arc(cx + W * 0.1, cy, H * 0.045, 0, Math.PI * 2); ctx.fill();
      }
    }
    // hill (soil colour) with grass only where there is forest; bare hill is brown
    ctx.fillStyle = '#92400e';
    ctx.beginPath(); ctx.moveTo(0, H);
    for (let i = 0; i <= 60; i++) { const fx = i / 60; ctx.lineTo(fx * W, hillY(fx)); }
    ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
    ctx.fillStyle = `rgba(101,163,13,${0.25 + 0.75 * c})`;
    ctx.beginPath(); ctx.moveTo(0, hillY(0) + H * 0.05);
    for (let i = 0; i <= 60; i++) { const fx = i / 60; ctx.lineTo(fx * W, hillY(fx)); }
    ctx.lineTo(W, hillY(1) + H * 0.05); ctx.closePath(); ctx.fill();
    // trees
    const nT = Math.round(c * N_TREES), ts = Math.min(W, H) * 0.045;
    for (const t of trees) if (t.order < nT) drawTree(ctx, t.fx * W, hillY(t.fx) + ts * 0.1, ts * t.s, t.order >= nT - 4 ? state.grow : 1);
    // runoff streaks on the slope
    const ro = runoff() / 90;
    if (ro > 0.03) {
      ctx.strokeStyle = `rgba(96,165,250,${0.15 + 0.7 * ro})`; ctx.lineWidth = Math.max(1.5, 4 * ro); ctx.lineCap = 'round';
      for (let k = 0; k < 7; k++) {
        const fx0 = 0.05 + k * 0.08, len = 0.1 + 0.12 * ro, ph = (now * (0.5 + ro) + k * 0.13) % 1;
        const a = fx0 + ph * len, b = Math.min(0.63, a + 0.04);
        ctx.beginPath(); ctx.moveTo(a * W, hillY(a) + 2); ctx.lineTo(b * W, hillY(b) + 2); ctx.stroke();
      }
    }
    // soil particles sliding down
    const sl = soilLoss() / 45;
    if (sl > 0.02) {
      ctx.fillStyle = `rgba(120,53,15,${0.5 + 0.5 * sl})`;
      const n = Math.round(sl * N_SOIL);
      for (let i = 0; i < n; i++) { const s = soil[i]; const u = ((s.u + now * (0.15 + 0.3 * sl) + s.off) % 1) * 0.62; ctx.beginPath(); ctx.arc(u * W, hillY(u) - 3, Math.max(2, H * 0.006), 0, Math.PI * 2); ctx.fill(); }
    }
    // soaking arrows (infiltration) when forest soaks rain
    const sk = soaked() / 100;
    if (sk > 0.05) {
      ctx.strokeStyle = `rgba(59,130,246,${0.3 + 0.5 * sk})`; ctx.lineWidth = 2;
      for (let k = 0; k < 5; k++) {
        const fx = 0.1 + k * 0.11, y0 = hillY(fx) + H * 0.03, ph = (now * 0.5 + k * 0.2) % 1;
        const y = y0 + ph * H * 0.08;
        ctx.globalAlpha = 1 - ph; ctx.beginPath(); ctx.moveTo(fx * W, y); ctx.lineTo(fx * W, y + H * 0.03); ctx.lineTo(fx * W - 4, y + H * 0.02); ctx.moveTo(fx * W, y + H * 0.03); ctx.lineTo(fx * W + 4, y + H * 0.02); ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
    // river channel
    const rx0 = riverX0(), rx1 = riverX1(), rb = riverBottom(), m = metres();
    ctx.fillStyle = '#78350f'; ctx.fillRect(rx0 - 4, H * 0.75, rx1 - rx0 + 8, rb - H * 0.75 + 4);
    // bank line (3 m)
    const bankY = rb - BANK * m;
    // water: level above the channel bottom
    const lvl = clamp(state.level, 0, 5);
    const waterTop = rb - lvl * m;
    const mud = clamp(state.soilInRiver / 45, 0, 1);
    const wr = Math.round(37 + 100 * mud), wg = Math.round(99 + 10 * mud), wb = Math.round(235 - 200 * mud);
    ctx.fillStyle = `rgb(${wr},${wg},${wb})`;
    if (state.flooding) {
      // water spreads over the valley floor to the right of the river
      ctx.fillRect(rx0, waterTop, W - rx0, rb - waterTop);
    } else {
      ctx.fillRect(rx0, waterTop, rx1 - rx0, rb - waterTop);
    }
    // waves
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 1.5;
    for (let k = 0; k < 3; k++) { const wy = waterTop + 6 + k * 10; if (wy < rb) { ctx.beginPath(); for (let i = 0; i <= 8; i++) { const x = rx0 + ((rx1 - rx0) * i) / 8; ctx.lineTo(x, wy + Math.sin(now * 3 + i + k) * 2); } ctx.stroke(); } }
    // bank marker
    ctx.strokeStyle = '#f8fafc'; ctx.setLineDash([6, 4]); ctx.beginPath(); ctx.moveTo(rx0 - W * 0.02, bankY); ctx.lineTo(rx1 + W * 0.02, bankY); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#f8fafc'; ctx.font = font(H * 0.03); ctx.textAlign = 'left';
    ctx.fillText(T('bank', 'tepian'), rx1 + W * 0.025, bankY + 4);
    // village
    const hs = Math.min(W, H) * 0.07;
    [0.84, 0.92].forEach((fx, i) => drawHouse(ctx, fx * W, H * 0.75 + (i ? 0 : -H * 0.01), hs, state.flooding));
    if (state.flooding) {
      ctx.fillStyle = `rgb(${wr},${wg},${wb})`; ctx.fillRect(rx1, waterTop, W - rx1, H * 0.75 - waterTop + m * 0.2);
    }
    // readouts
    const px = W * 0.02; let py = H * 0.07; const lh = H * 0.055;
    ctx.fillStyle = 'rgba(11,18,32,0.75)'; ctx.beginPath(); ctx.roundRect(px - 8, py - lh * 0.75, W * 0.36, lh * 4.3, 10); ctx.fill();
    ctx.font = font(lh * 0.6, true); ctx.textAlign = 'left';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText(`${T('rain soaking in', 'hujan meresap')}: ${Math.round(soakShare())}% ${T('of the rain', 'dari hujan')}`, px, py); py += lh;
    ctx.fillStyle = '#93c5fd';
    ctx.fillText(`${T('runoff', 'air larian')}: ${Math.round(runoffShare())}% ${T('of the rain', 'dari hujan')}`, px, py); py += lh;
    ctx.fillStyle = '#fdba74';
    ctx.fillText(`${T('soil lost', 'tanah hilang')}: ${soilLoss().toFixed(0)} ${T('truckloads/day', 'truk/hari')}`, px, py); py += lh;
    ctx.fillStyle = state.flooding ? '#f87171' : '#e2e8f0';
    ctx.fillText(`${T('river level', 'tinggi sungai')}: ${dec(state.level)} m (${T('bank', 'tepian')} ${dec(BANK)} m)`, px, py);
    // flood warning
    if (state.flooding) {
      const blink = Math.sin(now * 6) > 0;
      ctx.fillStyle = blink ? '#dc2626' : '#991b1b';
      ctx.beginPath(); ctx.roundRect(W * 0.62, H * 0.05, W * 0.36, H * 0.14, 12); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = font(H * 0.07, true); ctx.textAlign = 'center';
      ctx.fillText(T('FLOOD!', 'BANJIR!'), W * 0.8, H * 0.14);
      ctx.font = font(H * 0.032);
      ctx.fillText(T('The river is over its bank', 'Sungai meluap melewati tepian'), W * 0.8, H * 0.18);
    } else if (state.level > BANK - 0.5) {
      ctx.fillStyle = 'rgba(234,179,8,0.9)'; ctx.beginPath(); ctx.roundRect(W * 0.62, H * 0.05, W * 0.36, H * 0.1, 12); ctx.fill();
      ctx.fillStyle = '#1f2937'; ctx.font = font(H * 0.045, true); ctx.textAlign = 'center';
      ctx.fillText(T('Warning: river almost full', 'Awas: sungai hampir penuh'), W * 0.8, H * 0.115);
    }
    // rain drops (drawn last, over everything)
    if (rain > 0.02) {
      const n = Math.round(rain * N_DROPS);
      ctx.strokeStyle = 'rgba(191,219,254,0.8)'; ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const d = drops[i]; const y = ((d.fy + now * d.v * (0.6 + rain)) % 1) * H * 0.78; const x = d.fx * W - (y * 0.05);
        ctx.moveTo(x, y); ctx.lineTo(x - 2, y + H * 0.02);
      }
      ctx.stroke();
    }
    ctx.textAlign = 'left';
  }

  // --- controls ---
  const forestS = slider({ label: T('Forest on the hill', 'Hutan di bukit'), key: 'forest', min: 0, max: 100, step: 5, value: 80, format: (v) => `${v}%`, onInput: (v) => { params.forest = v; } });
  const rainS = slider({ label: T('Rain', 'Hujan'), key: 'rain', min: 0, max: 100, step: 5, value: 40, format: (v) => (v === 0 ? T('none', 'tidak ada') : v < 35 ? `${v}% · ${T('light', 'ringan')}` : v < 70 ? `${v}% · ${T('steady', 'sedang')}` : `${v}% · ${T('heavy', 'deras')}`), onInput: (v) => { params.rain = v; } });
  const plantB = bigBtn(T('Plant trees (+10%)', 'Tanam pohon (+10%)'), () => { forestS.apply(Math.min(100, params.forest + 10)); state.grow = 0; });
  const cutB = bigBtn(T('Cut trees (−10%)', 'Tebang pohon (−10%)'), () => { forestS.apply(Math.max(0, params.forest - 10)); });
  const stormB = bigBtn(T('Storm!', 'Badai!'), () => { rainS.apply(100); });
  ctrlPanel.append(forestS.el, rainS.el, row(plantB, cutB, stormB));

  const lab = labPanel({
    title: 'Forest and flood test',
    filename: 'forest-and-flood-data.csv',
    columns: [
      { key: 'forest', label: 'Forest (%)' },
      { key: 'rain', label: 'Rain (%)' },
      { key: 'runoff', label: 'Runoff (% of rain)', format: (v) => v.toFixed(0) },
      { key: 'soil', label: 'Soil lost (truckloads/day)', format: (v) => v.toFixed(0) },
      { key: 'level', label: 'River level (m)', format: (v) => v.toFixed(1) },
      { key: 'flood', label: 'Flood?' },
    ],
    procedure: [
      'Set rain to 100% (storm) and forest to 100%. Wait for the river to settle, then Record.',
      'Keep the storm. Set forest to 50%, wait, Record. Then 0%, wait, Record.',
      'Now set forest to 0% and rain to 30%. Wait and Record.',
      'Look at your table. How much forest keeps the village dry in a storm?',
    ],
    predict: 'With the same heavy rain, will the river be higher with more trees or with fewer trees?',
    source: () => ({ forest: params.forest, rain: params.rain, runoff: runoffShare(), soil: soilLoss(), level: state.level, flood: state.flooding ? 'yes' : 'no' }),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { now = t; step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
