import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

// Gel model: distance (mm) = D_REF · (V/100) · (t/60) · mobility(size),
// mobility(size) = (log10(5000) − log10(bp)) / (log10(5000) − log10(100)), clamped to ≥ 0.03.
// So a 100 bp fragment travels D_REF = 60 mm at 100 V in 60 min; distance is linear in log(size).
const D_REF = 60;
const GEL_MM = 70;                 // usable gel length from wells to the bottom edge
const LADDER = [100, 200, 300, 400, 500, 700, 1000, 1500, 2000, 3000];
const LOG_HI = Math.log10(5000), LOG_LO = Math.log10(100);
const mobility = (bp) => Math.max(0.03, (LOG_HI - Math.log10(Math.max(1, bp))) / (LOG_HI - LOG_LO));
// Profiles: two look alike before cutting, the enzyme separates them.
const PROFILES = {
  A: { uncut: [320, 780, 1450], cut: [320, 500, 280, 1450] },
  B: { uncut: [320, 780, 1450], cut: [320, 780, 900, 550] },
  C: { uncut: [260, 650, 2000], cut: [260, 650, 1200, 800] },
};
const C = {
  bg: '#0b1220', text: '#e5e7eb', dim: '#94a3b8', grid: 'rgba(148,163,184,0.18)', gel: '#1e293b', gelEdge: '#334155',
  band: '#facc15', well: '#020617', ok: '#22c55e', bad: '#ef4444', strandA: '#38bdf8', strandB: '#ec4899', primer: '#22c55e', neg: '#60a5fa', pos: '#ef4444', sel: '#f472b6',
};
const fmtInt = (n) => n.toLocaleString('en-US');

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const pcr = { target: 20, cycle: 0, running: false, phase: 0, phaseT: 0 };
  const gel = { V: 100, t: 0, running: false, enzyme: false, lanes: [], truth: 'S1', guess: '', selected: null, labLane: 'CS' };
  let now = 0;
  let geo = null;

  function newCase() {
    const keys = ['A', 'B', 'C'].sort(() => Math.random() - 0.5);
    const matchKey = Math.random() < 0.5 ? 'A' : 'B';
    // names are [en, id] pairs resolved at draw time so a locale switch updates the labels
    gel.lanes = [{ id: 'L', name: ['Ladder', 'Tangga'], prof: { uncut: LADDER, cut: LADDER } }];
    ['S1', 'S2', 'S3'].forEach((id, i) => { gel.lanes.push({ id, name: [`Suspect ${i + 1}`, `Tersangka ${i + 1}`], prof: PROFILES[keys[i]], key: keys[i] }); if (keys[i] === matchKey) gel.truth = id; });
    gel.lanes.push({ id: 'CS', name: ['Crime scene', 'TKP'], prof: PROFILES[matchKey], key: matchKey });
    gel.guess = ''; gel.selected = null; gel.t = 0; gel.running = false;
  }
  newCase();

  const fragments = (lane) => (gel.enzyme ? lane.prof.cut : lane.prof.uncut);
  const laneName = (lane) => T(lane.name[0], lane.name[1]);
  const distance = (bp) => D_REF * (gel.V / 100) * (gel.t / 60) * mobility(bp);
  // Estimate a size from the ladder by linear interpolation of log(size) vs distance.
  function estimateSize(d) {
    const pts = LADDER.map((bp) => ({ bp, d: distance(bp) })).sort((a, b) => a.d - b.d);
    if (pts[pts.length - 1].d - pts[0].d < 1e-6) return null;
    if (d <= pts[0].d) { const a = pts[0], b = pts[1]; return extrap(a, b, d); }
    if (d >= pts[pts.length - 1].d) { const a = pts[pts.length - 2], b = pts[pts.length - 1]; return extrap(a, b, d); }
    for (let i = 0; i < pts.length - 1; i++) if (d >= pts[i].d && d <= pts[i + 1].d) return extrap(pts[i], pts[i + 1], d);
    return null;
  }
  function extrap(a, b, d) { const u = (d - a.d) / Math.max(1e-6, b.d - a.d); const lg = Math.log10(a.bp) + u * (Math.log10(b.bp) - Math.log10(a.bp)); return Number.isFinite(lg) ? 10 ** lg : null; }
  const sameProfile = (lane) => { const cs = gel.lanes.find((l) => l.id === 'CS'); const a = [...fragments(lane)].sort((x, y) => x - y), b = [...fragments(cs)].sort((x, y) => x - y); return a.length === b.length && a.every((v, i) => v === b[i]); };

  function step(dt) {
    // PCR animation: three phases per cycle
    if (pcr.running) {
      pcr.phaseT += dt;
      const dur = 0.45;
      if (pcr.phaseT >= dur) {
        pcr.phaseT -= dur; pcr.phase = (pcr.phase + 1) % 3;
        if (pcr.phase === 0) { pcr.cycle++; if (pcr.cycle >= pcr.target) { pcr.cycle = pcr.target; pcr.running = false; pcr.phase = 0; pcr.phaseT = 0; } }
      }
    }
    if (gel.running) {
      gel.t = Math.min(60, gel.t + dt * 6);
      timeS.value = Math.round(gel.t);
      if (gel.t >= 60) { gel.running = false; runT.value = false; }
    }
  }

  const font = (px, bold) => `${bold ? 'bold ' : ''}${Math.max(8, Math.round(px))}px system-ui, -apple-system, Roboto, sans-serif`;
  const mono = (px, bold) => `${bold ? 'bold ' : ''}${Math.max(8, Math.round(px))}px ui-monospace, SFMono-Regular, Menlo, monospace`;

  function strand(ctx, x0, y, len, color, phaseShift, amp) {
    ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.beginPath();
    for (let i = 0; i <= 40; i++) { const x = x0 + len * i / 40; const yy = y + Math.sin(i / 40 * Math.PI * 4 + phaseShift) * amp; i ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); }
    ctx.stroke();
  }
  function drawPCR(ctx, x, y, w, h, fs) {
    ctx.fillStyle = C.text; ctx.font = font(fs * 1.1, true); ctx.fillText(T('PCR — copies = 2ⁿ', 'PCR — salinan = 2ⁿ'), x, y + fs);
    const phases = [[T('Denature', 'Denaturasi'), '94 °C', C.bad], [T('Anneal primers', 'Tempel primer'), '55 °C', C.neg], [T('Extend (Taq)', 'Perpanjang (Taq)'), '72 °C', '#f59e0b']];
    const ph = phases[pcr.phase];
    // thermometer / phase labels
    let yy = y + fs * 2.6;
    phases.forEach((p, i) => {
      const on = pcr.running && i === pcr.phase;
      ctx.fillStyle = on ? p[2] : 'rgba(255,255,255,0.08)'; ctx.beginPath(); ctx.roundRect(x + i * w / 3, yy - fs * 1.1, w / 3 - 4, fs * 1.5, 5); ctx.fill();
      ctx.fillStyle = on ? '#0b1220' : C.dim; ctx.font = font(fs * 0.8, on); ctx.textAlign = 'center';
      ctx.fillText(`${p[0]} ${p[1]}`, x + i * w / 3 + (w / 3 - 4) / 2, yy);
    });
    ctx.textAlign = 'left';
    // strand drawing
    const sy = yy + fs * 3.2, len = w * 0.7, sx = x + w * 0.15, amp = fs * 0.5;
    const sep = pcr.running ? (pcr.phase === 0 ? pcr.phaseT / 0.45 : 1) : 0;
    const gap = fs * 2.2 * sep;
    strand(ctx, sx, sy - gap, len, C.strandA, 0, amp);
    strand(ctx, sx, sy + gap, len, C.strandB, Math.PI, amp);
    if (!pcr.running || sep < 1) { ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 1; for (let i = 1; i < 20; i++) { const xx = sx + len * i / 20; ctx.beginPath(); ctx.moveTo(xx, sy - gap + Math.sin(i / 20 * Math.PI * 4) * amp); ctx.lineTo(xx, sy + gap + Math.sin(i / 20 * Math.PI * 4 + Math.PI) * amp); ctx.stroke(); } }
    if (pcr.running && pcr.phase >= 1) {
      const k = pcr.phase === 1 ? pcr.phaseT / 0.45 : 1;
      ctx.fillStyle = C.primer;
      ctx.fillRect(sx + len * 0.02, sy - gap + fs * 0.9 - (1 - k) * fs * 2, len * 0.12, 4);
      ctx.fillRect(sx + len * 0.86, sy + gap - fs * 0.9 + (1 - k) * fs * 2, len * 0.12, 4);
      if (pcr.phase === 2) {
        const e = pcr.phaseT / 0.45;
        strand(ctx, sx + len * 0.14, sy - gap + fs * 0.9, len * 0.84 * e, C.strandB, Math.PI, amp * 0.6);
        strand(ctx, sx + len * 0.86 - len * 0.84 * e, sy + gap - fs * 0.9, len * 0.84 * e, C.strandA, 0, amp * 0.6);
      }
    }
    ctx.fillStyle = C.dim; ctx.font = font(fs * 0.85); ctx.textAlign = 'center';
    ctx.fillText(pcr.running ? `${ph[0]} · ${ph[1]}` : T('press Run PCR', 'tekan Jalankan PCR'), x + w / 2, sy + gap + fs * 2.6);
    ctx.textAlign = 'left';
    // readout
    const ry = sy + fs * 6.6; // below the phase caption even when the strands are fully separated
    ctx.fillStyle = C.text; ctx.font = mono(fs * 1.5, true);
    ctx.fillText(`${T('cycle', 'siklus')} ${pcr.cycle} → 2^${pcr.cycle} = ${fmtInt(2 ** pcr.cycle)}`, x, ry);
    ctx.fillStyle = C.dim; ctx.font = font(fs * 0.85);
    ctx.fillText(T(`copies from one molecule (${pcr.cycle} × 3 steps ≈ ${(pcr.cycle * 2).toFixed(0)} min)`, `salinan dari satu molekul (${pcr.cycle} × 3 tahap ≈ ${(pcr.cycle * 2).toFixed(0)} menit)`), x, ry + fs * 1.3);
    // log chart copies vs cycle
    const cy0 = ry + fs * 2.4, ch = y + h - cy0 - fs * 2.2, cw = w - fs * 3;
    const cx0 = x + fs * 2.6;
    ctx.fillStyle = 'rgba(255,255,255,0.03)'; ctx.fillRect(cx0, cy0, cw, ch);
    ctx.strokeStyle = C.grid; ctx.fillStyle = C.dim; ctx.font = font(fs * 0.75); ctx.textAlign = 'right';
    for (let k = 0; k <= 9; k += 3) { const yk = cy0 + ch - (k / 9) * ch; ctx.beginPath(); ctx.moveTo(cx0, yk); ctx.lineTo(cx0 + cw, yk); ctx.stroke(); ctx.fillText(k === 0 ? '1' : `10${'⁰¹²³⁴⁵⁶⁷⁸⁹'[k]}`, cx0 - 3, yk + fs * 0.3); }
    ctx.textAlign = 'center';
    for (let n = 0; n <= 30; n += 10) ctx.fillText(String(n), cx0 + cw * n / 30, cy0 + ch + fs);
    ctx.fillText(T('cycle (log scale of copies)', 'siklus (skala log salinan)'), cx0 + cw / 2, cy0 + ch + fs * 2);
    ctx.strokeStyle = C.band; ctx.lineWidth = 2; ctx.beginPath();
    for (let n = 0; n <= pcr.cycle; n++) { const px = cx0 + cw * n / 30, py = cy0 + ch - (Math.log10(2 ** n) / 9) * ch; n ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
    ctx.stroke();
    ctx.strokeStyle = 'rgba(250,204,21,0.3)'; ctx.setLineDash([3, 3]); ctx.beginPath();
    for (let n = 0; n <= 30; n++) { const px = cx0 + cw * n / 30, py = cy0 + ch - (Math.log10(2 ** n) / 9) * ch; n ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
    ctx.stroke(); ctx.setLineDash([]);
    ctx.textAlign = 'left';
  }

  function drawGel(ctx, x, y, w, h, fs) {
    ctx.fillStyle = C.text; ctx.font = font(fs * 1.1, true); ctx.fillText(T('Agarose gel', 'Gel agarosa') + ` — ${gel.V} V, ${gel.t.toFixed(0)} min` + (gel.enzyme ? T(' · cut with EcoRI', ' · dipotong EcoRI') : ''), x, y + fs);
    const gx = x + fs * 3.2, gy = y + fs * 2.4, gw = w - fs * 3.6, gh = h - fs * 4.2;
    const mmPx = gh / GEL_MM; const wellY = gy + fs * 1.2;
    ctx.fillStyle = C.gel; ctx.beginPath(); ctx.roundRect(gx, gy, gw, gh, 6); ctx.fill();
    ctx.strokeStyle = C.gelEdge; ctx.lineWidth = 2; ctx.stroke();
    // electrodes
    ctx.fillStyle = C.neg; ctx.font = font(fs, true); ctx.fillText('−', gx - fs * 1.4, gy + fs); ctx.fillStyle = C.pos; ctx.fillText('+', gx - fs * 1.4, gy + gh);
    // ruler (mm from wells)
    ctx.strokeStyle = C.dim; ctx.fillStyle = C.dim; ctx.font = font(fs * 0.7); ctx.textAlign = 'right';
    for (let mm = 0; mm <= GEL_MM - 8; mm += 10) { const yy = wellY + mm * mmPx; ctx.beginPath(); ctx.moveTo(gx - 3, yy); ctx.lineTo(gx, yy); ctx.stroke(); ctx.fillText(`${mm}`, gx - 5, yy + fs * 0.3); }
    ctx.save(); ctx.translate(gx - fs * 2.4, wellY + gh * 0.45); ctx.rotate(-Math.PI / 2); ctx.textAlign = 'center'; ctx.fillText(T('distance from well (mm)', 'jarak dari sumur (mm)'), 0, 0); ctx.restore();
    ctx.textAlign = 'left';
    // lanes
    const n = gel.lanes.length, laneW = gw / n, bandW = laneW * 0.55;
    geo = { gx, gy, gw, gh, wellY, mmPx, laneW, bandW };
    gel.lanes.forEach((lane, i) => {
      const lx = gx + laneW * (i + 0.5);
      ctx.fillStyle = C.well; ctx.fillRect(lx - bandW / 2, wellY - fs * 0.5, bandW, fs * 0.5);
      ctx.fillStyle = lane.id === gel.guess ? C.sel : C.dim; ctx.font = font(fs * 0.85, lane.id === 'CS' || lane.id === gel.guess); ctx.textAlign = 'center';
      ctx.fillText(laneName(lane), lx, gy - fs * 0.4);
      for (const bp of fragments(lane)) {
        const d = distance(bp);
        if (d > GEL_MM - 1) continue;                       // ran off the gel
        const by = wellY + d * mmPx;
        const bright = clamp(0.55 + 0.45 * (bp / 2000), 0.55, 1);
        const isSel = gel.selected && gel.selected.lane === lane.id && gel.selected.bp === bp;
        ctx.fillStyle = `rgba(250,204,21,${bright})`; ctx.shadowColor = C.band; ctx.shadowBlur = isSel ? 14 : 4;
        ctx.fillRect(lx - bandW / 2, by - 2, bandW, 4 + (bp > 1000 ? 1 : 0)); ctx.shadowBlur = 0;
        if (isSel) { ctx.strokeStyle = C.sel; ctx.lineWidth = 2; ctx.strokeRect(lx - bandW / 2 - 3, by - 6, bandW + 6, 12); }
        if (lane.id === 'L') { ctx.fillStyle = C.dim; ctx.font = font(fs * 0.7); ctx.textAlign = 'left'; ctx.fillText(`${bp}`, lx + bandW / 2 + 3, by + fs * 0.3); }
      }
      // dye front
      if (gel.t > 0) { const fy = wellY + Math.min(GEL_MM - 1, D_REF * (gel.V / 100) * (gel.t / 60) * 1.05) * mmPx; ctx.fillStyle = 'rgba(96,165,250,0.35)'; ctx.fillRect(lx - bandW / 2, fy - 1, bandW, 2); }
    });
    ctx.textAlign = 'left';
    // selection readout under the gel
    let ty = gy + gh + fs * 1.3;
    ctx.font = font(fs * 0.9);
    if (gel.selected) {
      const s = gel.selected, est = estimateSize(s.d);
      ctx.fillStyle = C.sel;
      ctx.fillText(T(`${s.laneName}: band ${s.bp} bp travelled ${s.d.toFixed(1)} mm · size from ladder calibration ≈ ${est ? Math.round(est) : '?'} bp`, `${s.laneName}: pita ${s.bp} bp bergerak ${s.d.toFixed(1)} mm · ukuran dari kalibrasi tangga ≈ ${est ? Math.round(est) : '?'} bp`), x, ty);
    } else {
      ctx.fillStyle = C.dim; ctx.fillText(T('Run the gel, then click a band to read its distance and estimate its size from the ladder.', 'Jalankan gel, lalu klik pita untuk membaca jaraknya dan menaksir ukurannya dari tangga.'), x, ty);
    }
    ty += fs * 1.4;
    if (gel.guess) {
      const ok = gel.guess === gel.truth;
      const lane = gel.lanes.find((l) => l.id === gel.guess);
      const same = lane && sameProfile(lane);
      const nm = lane ? laneName(lane) : '';
      ctx.fillStyle = ok ? C.ok : (same ? '#f59e0b' : C.bad); ctx.font = font(fs, true);
      ctx.fillText(ok ? T(`${nm} matches the crime scene — correct!`, `${nm} cocok dengan TKP — benar!`)
        : same ? T(`${nm} has the same bands as the crime scene here, but so does another suspect. Try the restriction enzyme.`, `${nm} berpita sama dengan TKP di sini, tetapi tersangka lain juga. Coba enzim restriksi.`)
          : T(`${nm} does not match: compare the band positions again.`, `${nm} tidak cocok: bandingkan lagi posisi pitanya.`), x, ty);
    }
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
    const fs = clamp(W * 0.014, 9, 14);
    drawPCR(ctx, fs * 1.5, fs * 0.8, W * 0.36, H - fs * 1.6, fs);
    ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.beginPath(); ctx.moveTo(W * 0.40, fs); ctx.lineTo(W * 0.40, H - fs); ctx.stroke();
    drawGel(ctx, W * 0.42, fs * 0.8, W * 0.56, H - fs * 1.6, fs);
  }

  // click on the gel to select the nearest band in that lane
  cv.canvas.style.touchAction = 'none';
  const onDown = (e) => {
    if (!geo) return;
    const r = cv.canvas.getBoundingClientRect();
    const px = (e.clientX - r.left) * cv.width / r.width, py = (e.clientY - r.top) * cv.height / r.height;
    if (px < geo.gx || px > geo.gx + geo.gw || py < geo.gy || py > geo.gy + geo.gh) return;
    const li = clamp(Math.floor((px - geo.gx) / geo.laneW), 0, gel.lanes.length - 1);
    const lane = gel.lanes[li];
    let best = null;
    for (const bp of fragments(lane)) { const d = distance(bp); const by = geo.wellY + d * geo.mmPx; const dist = Math.abs(by - py); if (dist < 14 && (!best || dist < best.dist)) best = { lane: lane.id, laneName: laneName(lane), bp, d, dist }; }
    gel.selected = best;
  };
  cv.canvas.addEventListener('pointerdown', onDown);

  // ---------- controls ----------
  const cycS = slider({ label: 'PCR cycles', key: 'cycles', min: 0, max: 30, step: 1, value: pcr.target, onInput: (v) => { pcr.target = v; if (!pcr.running) pcr.cycle = v; } });
  const runPCR = button({ label: 'Run PCR (animate)', primary: true, onClick: () => { pcr.cycle = 0; pcr.phase = 0; pcr.phaseT = 0; pcr.running = pcr.target > 0; } });
  const voltS = slider({ label: 'Gel voltage (V)', key: 'volts', min: 50, max: 150, step: 10, value: gel.V, onInput: (v) => { gel.V = v; } });
  const timeS = slider({ label: 'Run time (min)', key: 'time', min: 0, max: 60, step: 1, value: 0, onInput: (v) => { gel.t = v; } });
  const runT = toggle({ label: 'Run gel (6 min per second)', key: 'run', value: false, onChange: (v) => { gel.running = v; } });
  const enzT = toggle({ label: 'Cut samples with restriction enzyme (EcoRI)', key: 'enzyme', value: false, onChange: (v) => { gel.enzyme = v; gel.selected = null; } });
  const guessSel = select({ label: 'Identify the match to the crime scene', key: 'guess', value: '', options: [{ value: '', label: '— choose —' }, { value: 'S1', label: 'Suspect 1' }, { value: 'S2', label: 'Suspect 2' }, { value: 'S3', label: 'Suspect 3' }], onChange: (v) => { gel.guess = v; } });
  const newB = button({ label: 'New case (shuffle suspects)', onClick: () => { newCase(); guessSel.value = ''; timeS.value = 0; runT.value = false; } });
  const resetB = button({ label: 'Reset gel (back to wells)', onClick: () => { gel.t = 0; timeS.value = 0; gel.running = false; runT.value = false; gel.selected = null; } });
  const laneSel = select({ label: 'Lane to record in the lab', key: 'lane', value: 'CS', options: [{ value: 'L', label: 'Ladder' }, { value: 'S1', label: 'Suspect 1' }, { value: 'S2', label: 'Suspect 2' }, { value: 'S3', label: 'Suspect 3' }, { value: 'CS', label: 'Crime scene' }], onChange: (v) => { gel.labLane = v; } });
  ctrlPanel.append(cycS.el, row(runPCR), voltS.el, timeS.el, row(runT, enzT), guessSel.el, row(newB, resetB), laneSel.el);

  const lab = labPanel({
    title: 'Gel lab — sample, fragment sizes, distance, match',
    filename: 'gel-electrophoresis-data.csv',
    columns: [
      { key: 'lane', label: 'Sample' },
      { key: 'enzyme', label: 'Enzyme' },
      { key: 'V', label: 'Voltage (V)' },
      { key: 't', label: 'Time (min)' },
      { key: 'bands', label: 'Fragments: bp → distance (mm)' },
      { key: 'match', label: 'Same bands as crime scene?' },
    ],
    procedure: [
      'Set 100 V, run the gel to 60 min. Record the Ladder lane. Plot log(size) against distance: is it a straight line?',
      'Record the Crime scene lane and each Suspect lane. Which suspects have the same pattern?',
      'Click a crime-scene band and compare the size estimated from the ladder with its true size.',
      'Reset the gel, run only 30 min and record the ladder again. How do the distances change? Then try 150 V for 30 min.',
      'Switch on the restriction enzyme, run 60 min and record all lanes again. Identify the match.',
    ],
    predict: 'Will a 1000 bp fragment travel half as far as a 500 bp fragment? Will running twice as long double every distance?',
    source: () => {
      const lane = gel.lanes.find((l) => l.id === gel.labLane); if (!lane || gel.t <= 0) return null;
      const bands = fragments(lane).map((bp) => `${bp}→${distance(bp) > GEL_MM - 1 ? 'off gel' : distance(bp).toFixed(1)}`).join('; ');
      return { lane: lane.name[0], enzyme: gel.enzyme ? 'EcoRI' : 'none', V: gel.V, t: Math.round(gel.t), bands, match: lane.id === 'CS' ? '(crime scene)' : lane.id === 'L' ? '(ladder)' : sameProfile(lane) ? 'yes' : 'no' };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { now = t; step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.canvas.removeEventListener('pointerdown', onDown); cv.destroy(); };
}
