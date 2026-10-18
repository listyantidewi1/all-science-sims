import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, row, button } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);

// Limiting molar conductivities Λ° at 25 °C in S·cm²/mol (sum of the ions), acid/base constants.
// type: 'strong' (α = 1), 'weak' (α from K), 'non' (no ions), 'water' (autoionisation only).
const SOLUTIONS = {
  nacl:    { label: ['NaCl (table salt)', 'NaCl (garam dapur)'], name: 'NaCl', type: 'strong', lambda: 126.4, cat: 'Na⁺', an: 'Cl⁻', mol: 'NaCl' },
  hcl:     { label: ['HCl (hydrochloric acid)', 'HCl (asam klorida)'], name: 'HCl', type: 'strong', lambda: 426.2, cat: 'H⁺', an: 'Cl⁻', mol: 'HCl' },
  naoh:    { label: ['NaOH (sodium hydroxide)', 'NaOH (natrium hidroksida)'], name: 'NaOH', type: 'strong', lambda: 248.1, cat: 'Na⁺', an: 'OH⁻', mol: 'NaOH' },
  acetic:  { label: ['CH₃COOH (acetic acid)', 'CH₃COOH (asam asetat)'], name: 'CH₃COOH', type: 'weak', K: 1.8e-5, lambda: 390.7, cat: 'H⁺', an: 'CH₃COO⁻', mol: 'CH₃COOH' },
  ammonia: { label: ['NH₃ (ammonia)', 'NH₃ (amonia)'], name: 'NH₃', type: 'weak', K: 1.8e-5, lambda: 271.5, cat: 'NH₄⁺', an: 'OH⁻', mol: 'NH₃' },
  sugar:   { label: ['C₁₂H₂₂O₁₁ (sugar)', 'C₁₂H₂₂O₁₁ (gula)'], name: ['sucrose', 'sukrosa'], type: 'non', lambda: 0, mol: 'C₁₂H₂₂O₁₁' },
  ethanol: { label: ['C₂H₅OH (ethanol)', 'C₂H₅OH (etanol)'], name: ['ethanol', 'etanol'], type: 'non', lambda: 0, mol: 'C₂H₅OH' },
  water:   { label: ['Pure water', 'Air murni'], name: ['pure water', 'air murni'], type: 'water', lambda: 0, cat: 'H⁺', an: 'OH⁻', mol: 'H₂O' },
};
const CELL = 0.5;     // electrode area / spacing, cm
const VOLT = 3.0;     // V
const KAPPA_WATER = 5.5e-8; // S/cm at 25 °C
const N_UNITS = 60;   // formula units drawn
const L = () => (getLocale() === 'id' ? 1 : 0);
const nameOf = (s) => (Array.isArray(s.name) ? s.name[L()] : s.name);

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const p = { sol: 'nacl', logc: -1, on: true };
  const sol = () => SOLUTIONS[p.sol];
  const conc = () => Math.pow(10, p.logc);

  // ---- chemistry ---------------------------------------------------------------
  function alpha() {
    const s = sol();
    if (s.type === 'strong') return 1;
    if (s.type === 'weak') {
      const c = conc(), K = s.K;
      if (c <= 0) return 1;
      const a = (-K + Math.sqrt(K * K + 4 * K * c)) / (2 * c);   // Ostwald: K = cα²/(1−α)
      return Math.min(1, Math.max(0, a));
    }
    if (s.type === 'water') return 1e-7 / 55.5;
    return 0;
  }
  const ionConc = () => (sol().type === 'water' ? 2e-7 : 2 * alpha() * conc());      // mol/L of ions
  const kappa = () => (sol().type === 'water' ? KAPPA_WATER : KAPPA_WATER + sol().lambda * alpha() * conc() / 1000); // S/cm
  const current = () => (p.on ? kappa() * CELL * VOLT : 0);                           // A
  const brightness = () => {
    const I = current();
    if (I <= 0) return 0;
    return Math.min(1, Math.max(0, (Math.log10(I) + 4) / 4)); // 0.1 mA → off, 1 A → full
  };
  const classify = () => {
    const t = sol().type;
    if (t === 'strong') return T('strong electrolyte', 'elektrolit kuat');
    if (t === 'weak') return T('weak electrolyte', 'elektrolit lemah');
    if (t === 'water') return T('(almost) non-conductor', '(hampir) tidak menghantar');
    return T('non-electrolyte', 'nonelektrolit');
  };
  const fmtI = (I) => {
    if (I >= 1) return I.toFixed(2) + ' A';
    if (I >= 1e-3) return (I * 1e3).toFixed(1) + ' mA';
    if (I >= 1e-6) return (I * 1e6).toFixed(1) + ' µA';
    return (I * 1e9).toFixed(1) + ' nA';
  };

  // ---- particles ---------------------------------------------------------------
  // Slots 0..N-1 are the "A part" (cation or whole molecule), N..2N-1 the "B part" (anion or hidden).
  const parts = [];
  let seed = 99;
  const rnd = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
  for (let i = 0; i < 2 * N_UNITS; i++) parts.push({ x: rnd(), y: rnd(), vx: 0, vy: 0 });
  const nIonPairs = () => {
    const s = sol();
    if (s.type === 'strong') return N_UNITS;
    if (s.type === 'weak') return Math.max(alpha() > 0 ? 1 : 0, Math.round(alpha() * N_UNITS));
    return 0;
  };
  let clock = 0;
  function step(dt) {
    clock += dt;
    const nIon = nIonPairs();
    const drift = p.on ? 0.05 * (current() > 1e-5 ? 1 : 0) : 0;
    for (let i = 0; i < parts.length; i++) {
      const q = parts[i];
      const isB = i >= N_UNITS;
      const k = isB ? i - N_UNITS : i;
      if (isB && k >= nIon) continue;                         // hidden
      const ion = k < nIon;
      q.vx += (rnd() - 0.5) * 0.9 * dt; q.vy += (rnd() - 0.5) * 0.9 * dt;
      if (ion) q.vx += (isB ? 1 : -1) * drift * dt;         // cations → left (−) electrode, anions → right (+)
      q.vx *= 0.985; q.vy *= 0.985;
      q.x += q.vx * dt; q.y += q.vy * dt;
      if (q.x < 0.02) { q.x = 0.02; q.vx = Math.abs(q.vx) * 0.5; }
      if (q.x > 0.98) { q.x = 0.98; q.vx = -Math.abs(q.vx) * 0.5; }
      if (q.y < 0.02) { q.y = 0.02; q.vy = Math.abs(q.vy); }
      if (q.y > 0.98) { q.y = 0.98; q.vy = -Math.abs(q.vy); }
    }
  }

  // ---- drawing ----------------------------------------------------------------------
  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    ctx.textBaseline = 'alphabetic';
    const fs = Math.max(9, Math.min(13, W / 52));
    ctx.font = `${fs}px system-ui, sans-serif`;
    const s = sol();
    const I = current(), b = brightness(), a = alpha();

    // beaker
    const BK = { x: W * 0.05, y: H * 0.40, w: W * 0.46, h: H * 0.52 };
    const liq = { x: BK.x + 3, y: BK.y + BK.h * 0.12, w: BK.w - 6, h: BK.h * 0.88 - 3 };
    ctx.fillStyle = s.type === 'non' ? 'rgba(253,230,138,0.10)' : 'rgba(147,197,253,0.14)';
    ctx.fillRect(liq.x, liq.y, liq.w, liq.h);
    ctx.strokeStyle = 'rgba(226,232,240,0.85)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(BK.x, BK.y); ctx.lineTo(BK.x, BK.y + BK.h); ctx.lineTo(BK.x + BK.w, BK.y + BK.h); ctx.lineTo(BK.x + BK.w, BK.y); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.beginPath(); ctx.moveTo(liq.x, liq.y); ctx.lineTo(liq.x + liq.w, liq.y); ctx.stroke();

    // electrodes
    const eW = Math.max(4, W * 0.012);
    const eTop = H * 0.34, eBottom = BK.y + BK.h * 0.82;
    const eL = { x: BK.x + BK.w * 0.3 - eW / 2, y: eTop, h: eBottom - eTop };
    const eR = { x: BK.x + BK.w * 0.7 - eW / 2, y: eTop, h: eBottom - eTop };
    ctx.fillStyle = '#9ca3af';
    ctx.fillRect(eL.x, eL.y, eW, eL.h); ctx.fillRect(eR.x, eR.y, eW, eR.h);
    ctx.fillStyle = '#e2e8f0'; ctx.textAlign = 'center';
    ctx.fillText('−', eL.x + eW / 2, eL.y - 4); ctx.fillText('+', eR.x + eW / 2, eR.y - 4);

    // particles
    const nIon = nIonPairs();
    const r = Math.max(2.5, W * 0.007);
    ctx.font = `${Math.max(7, r * 2.2)}px system-ui, sans-serif`;
    for (let i = 0; i < parts.length; i++) {
      const isB = i >= N_UNITS; const k = isB ? i - N_UNITS : i;
      if (isB && k >= nIon) continue;
      const q = parts[i];
      const px = liq.x + q.x * liq.w, py = liq.y + q.y * liq.h;
      if (k < nIon) {
        ctx.fillStyle = isB ? '#4ade80' : '#f87171';
        ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#0b1220'; ctx.fillText(isB ? '−' : '+', px, py + r * 0.75);
      } else {
        ctx.fillStyle = s.type === 'water' ? 'rgba(147,197,253,0.6)' : 'rgba(253,230,138,0.85)';
        ctx.beginPath(); ctx.arc(px, py, r * 1.15, 0, Math.PI * 2); ctx.fill();
      }
    }
    ctx.font = `${fs}px system-ui, sans-serif`;
    // legend under beaker
    ctx.textAlign = 'left'; ctx.fillStyle = '#94a3b8';
    const legend = s.type === 'non'
      ? T(`yellow = ${s.mol} molecules, no ions`, `kuning = molekul ${s.mol}, tanpa ion`)
      : s.type === 'water'
        ? T('blue = H₂O; only 1 in 5.5×10⁸ molecules is ionised', 'biru = H₂O; hanya 1 dari 5,5×10⁸ molekul terionisasi')
        : T(`red + = ${s.cat}, green − = ${s.an}${s.type === 'weak' ? `, yellow = ${s.mol} not ionised` : ''}`, `merah + = ${s.cat}, hijau − = ${s.an}${s.type === 'weak' ? `, kuning = ${s.mol} tak terion` : ''}`);
    fitText(ctx, legend, BK.x, BK.y + BK.h + fs * 1.3, W * 0.5);

    // circuit (series): − electrode → rail → battery → bulb → down the right edge → ammeter → lower rail → + electrode
    const railY = H * 0.26, retY = H * 0.31;
    const bulbX = W * 0.70, bulbY = railY, bulbR = H * 0.045;
    const batX = W * 0.56, batY = railY;
    const amX = W * 0.86, amY = H * 0.66, amR = Math.min(W * 0.09, H * 0.15);
    const retX = W * 0.54; // vertical return wire, just right of the beaker
    ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(eL.x + eW / 2, eL.y); ctx.lineTo(eL.x + eW / 2, railY); ctx.lineTo(batX - W * 0.025, railY);   // − electrode → battery
    ctx.moveTo(batX + W * 0.025, railY); ctx.lineTo(bulbX - bulbR, railY);                                     // battery → bulb
    ctx.moveTo(bulbX + bulbR, railY); ctx.lineTo(amX + amR, railY); ctx.lineTo(amX + amR, amY);               // bulb → ammeter (right terminal)
    ctx.moveTo(amX - amR, amY); ctx.lineTo(retX, amY); ctx.lineTo(retX, retY); ctx.lineTo(eR.x + eW / 2, retY); ctx.lineTo(eR.x + eW / 2, eR.y); // ammeter → + electrode
    ctx.stroke();
    // battery
    ctx.fillStyle = '#1e293b'; ctx.fillRect(batX - W * 0.025, batY - fs * 0.9, W * 0.05, fs * 1.8);
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(batX - 3, batY - fs * 0.9); ctx.lineTo(batX - 3, batY + fs * 0.9); ctx.stroke();
    ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(batX + 4, batY - fs * 0.55); ctx.lineTo(batX + 4, batY + fs * 0.55); ctx.stroke();
    ctx.lineWidth = 2;
    ctx.fillStyle = '#cbd5e1'; ctx.textAlign = 'center';
    ctx.fillText(`${VOLT.toFixed(0)} V`, batX, batY - fs * 1.2);
    // bulb
    if (b > 0.02) {
      const g = ctx.createRadialGradient(bulbX, bulbY, bulbR * 0.3, bulbX, bulbY, bulbR * (1.5 + 2.5 * b));
      g.addColorStop(0, `rgba(253,224,71,${(0.9 * b).toFixed(3)})`);
      g.addColorStop(1, 'rgba(253,224,71,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(bulbX, bulbY, bulbR * (1.5 + 2.5 * b), 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = b > 0.02 ? `rgba(253,224,71,${(0.25 + 0.75 * b).toFixed(3)})` : '#1e293b';
    ctx.beginPath(); ctx.arc(bulbX, bulbY, bulbR, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#e2e8f0'; ctx.stroke();
    ctx.strokeStyle = b > 0.5 ? '#fff7ed' : '#94a3b8'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(bulbX - bulbR * 0.4, bulbY + bulbR * 0.3); ctx.lineTo(bulbX - bulbR * 0.2, bulbY - bulbR * 0.2); ctx.lineTo(bulbX, bulbY + bulbR * 0.2); ctx.lineTo(bulbX + bulbR * 0.2, bulbY - bulbR * 0.2); ctx.lineTo(bulbX + bulbR * 0.4, bulbY + bulbR * 0.3); ctx.stroke();
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText(b <= 0.02 ? T('off', 'mati') : b < 0.45 ? T('dim', 'redup') : T('bright', 'terang'), bulbX, bulbY + bulbR + fs * 1.3);

    // ammeter (log scale 1 µA … 1 A)
    ctx.fillStyle = '#111a2e';
    ctx.beginPath(); ctx.arc(amX, amY, amR, Math.PI, 2 * Math.PI); ctx.lineTo(amX + amR, amY); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 2; ctx.stroke();
    const ticks = ['1µ', '10µ', '100µ', '1m', '10m', '100m', '1'];
    ctx.font = `${Math.max(8, fs * 0.75)}px system-ui, sans-serif`;
    ticks.forEach((lab, k) => {
      const ang = Math.PI + (k / 6) * Math.PI;
      const c = Math.cos(ang), sn = Math.sin(ang);
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(amX + c * amR * 0.86, amY + sn * amR * 0.86); ctx.lineTo(amX + c * amR * 0.98, amY + sn * amR * 0.98); ctx.stroke();
      ctx.fillStyle = '#cbd5e1'; ctx.textAlign = 'center';
      ctx.fillText(lab, amX + c * amR * 0.7, amY + sn * amR * 0.7 + 3);
    });
    ctx.font = `${fs}px system-ui, sans-serif`;
    const frac = I > 0 ? Math.min(1, Math.max(0, (Math.log10(I) + 6) / 6)) : 0;
    const nAng = Math.PI + frac * Math.PI;
    ctx.strokeStyle = '#f87171'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(amX, amY); ctx.lineTo(amX + Math.cos(nAng) * amR * 0.92, amY + Math.sin(nAng) * amR * 0.92); ctx.stroke();
    ctx.fillStyle = '#f8fafc'; ctx.textAlign = 'center';
    ctx.fillText(`A: ${fmtI(I)}`, amX, amY + fs * 1.4);
    ctx.fillStyle = '#64748b';
    ctx.fillText(T('log scale', 'skala log'), amX, amY + fs * 2.6);

    // readouts (top-left)
    ctx.textAlign = 'left';
    let y = fs * 1.5; const lx = W * 0.03;
    ctx.fillStyle = '#f8fafc'; ctx.font = `bold ${fs * 1.1}px system-ui, sans-serif`;
    ctx.fillText(`${nameOf(s)}  c = ${fmtC(conc())} mol/L  →  ${classify()}`, lx, y);
    ctx.font = `${fs}px system-ui, sans-serif`; y += fs * 1.5;
    ctx.fillStyle = '#e2e8f0';
    if (s.type === 'water') ctx.fillText(T('[H⁺] = [OH⁻] = 1.0×10⁻⁷ mol/L (autoionisation only)', '[H⁺] = [OH⁻] = 1,0×10⁻⁷ mol/L (hanya autoionisasi)'), lx, y);
    else ctx.fillText(T(`degree of ionisation α = ${fmtA(a)}   →   [ions] = 2·α·c = ${fmtC(ionConc())} mol/L`, `derajat ionisasi α = ${fmtA(a)}   →   [ion] = 2·α·c = ${fmtC(ionConc())} mol/L`), lx, y);
    y += fs * 1.4;
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(`κ = Λ°·α·c = ${kappa().toExponential(2)} S/cm   →   I = κ·(A/d)·V = ${fmtI(I)}`, lx, y);
    y += fs * 1.4;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(T(`cell A/d = ${CELL} cm, ${VOLT} V, 25 °C`, `sel A/d = ${CELL} cm, ${VOLT} V, 25 °C`) + (s.type === 'weak' ? `   K = ${s.K.toExponential(1)}` : ''), lx, y);
  }
  function fitText(ctx, txt, x, y, maxW) {
    const w = ctx.measureText(txt).width;
    if (w > maxW && maxW > 0) { ctx.save(); ctx.translate(x, y); ctx.scale(maxW / w, 1); ctx.fillText(txt, 0, 0); ctx.restore(); }
    else ctx.fillText(txt, x, y);
  }
  const fmtC = (c) => (c >= 0.1 ? c.toFixed(3) : c >= 0.001 ? c.toFixed(4) : c.toExponential(2));
  const fmtA = (a) => (a >= 0.1 ? a.toFixed(3) : a >= 1e-4 ? a.toFixed(5) : a.toExponential(2));

  // ---- controls ----------------------------------------------------------------------
  const solSel = select({
    label: T('Solution', 'Larutan'), key: 'solution',
    options: Object.entries(SOLUTIONS).map(([value, s]) => ({ value, label: s.label[L()] })),
    value: p.sol, onChange: (v) => { p.sol = v; },
  });
  const cS = slider({
    label: T('Concentration (mol/L, log scale)', 'Konsentrasi (mol/L, skala log)'), key: 'logc', min: -3, max: 0, step: 0.05, value: p.logc,
    format: (v) => fmtC(Math.pow(10, v)), onInput: (v) => { p.logc = v; },
  });
  const swB = button({ label: T('Switch on / off', 'Sakelar nyala / mati'), onClick: () => { p.on = !p.on; } });
  ctrlPanel.append(solSel.el, cS.el, row(swB));

  const lab = labPanel({
    title: 'Conductivity lab — classifying electrolytes',
    filename: 'electrolyte-conductivity-data.csv',
    columns: [
      { key: 'solution', label: 'Solution' },
      { key: 'c',        label: 'c (mol/L)',     format: (v) => fmtC(v) },
      { key: 'alpha',    label: 'α',             format: (v) => fmtA(v) },
      { key: 'ions',     label: '[ions] (mol/L)', format: (v) => fmtC(v) },
      { key: 'I_mA',     label: 'I (mA)',        format: (v) => v >= 1 ? v.toFixed(1) : v.toExponential(2) },
      { key: 'bulb',     label: 'Bulb' },
      { key: 'cls',      label: 'Class' },
    ],
    procedure: [
      'Set c = 0.100 mol/L. Record every solution in turn without changing c. Sort them into bright / dim / off.',
      'For NaCl, record at 0.001, 0.010, 0.100 and 1.000 mol/L. How does I scale with c?',
      'For acetic acid, record the same four concentrations. Note that α rises as c falls — does I still rise with c?',
      'Compare HCl and acetic acid at 0.1 mol/L: same formula concentration, how many times more current?',
      'Compare HCl, NaOH and NaCl at 1.0 mol/L: all strong, all fully ionised. Why are the currents different? (Hint: H⁺ and OH⁻ move fastest.)',
    ],
    predict: 'Sugar and NaCl both dissolve completely in water. Will both solutions light the bulb? What must be present in a liquid for it to carry a current?',
    source: () => ({
      solution: Array.isArray(sol().name) ? sol().name[0] : sol().name,
      c: conc(),
      alpha: alpha(),
      ions: ionConc(),
      I_mA: current() * 1000,
      bulb: brightness() <= 0.02 ? 'off' : brightness() < 0.45 ? 'dim' : 'bright',
      cls: sol().type === 'strong' ? 'strong' : sol().type === 'weak' ? 'weak' : 'non-electrolyte',
    }),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
