import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// Closed path of the blood, in fractions of the canvas. Each segment carries a tag so that
// particles know whether they are in a valve, in the lungs or in the body.
// Chambers: RA (0.42,0.41) RV (0.42,0.60) LA (0.58,0.41) LV (0.58,0.60); lungs at y=0.13; body at y=0.88.
const PATH = [
  { to: [0.42, 0.41], tag: 'ra' },
  { to: [0.42, 0.60], tag: 'av-right' },   // through the tricuspid valve into RV
  { to: [0.33, 0.60], tag: 'out-right' },  // through the pulmonary valve
  { to: [0.33, 0.13], tag: 'pa' },
  { to: [0.67, 0.13], tag: 'lungs' },
  { to: [0.67, 0.41], tag: 'pv' },
  { to: [0.58, 0.41], tag: 'la' },
  { to: [0.58, 0.60], tag: 'av-left' },    // through the mitral valve into LV
  { to: [0.75, 0.60], tag: 'out-left' },   // through the aortic valve
  { to: [0.75, 0.88], tag: 'aorta' },
  { to: [0.25, 0.88], tag: 'body' },
  { to: [0.25, 0.41], tag: 'vc' },
];
const NP = 170;

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { hr: 72, narrow: false, blocked: false };
  const hemo = { sv: 70, co: 5, map: 95, sys: 127, dia: 80, pp: 47 };
  function updateHemo() {
    const HR = params.hr;
    hemo.sv = 70 * (1 - 0.25 * clamp((HR - 120) / 60, 0, 1)) * (params.blocked ? 0.65 : 1);
    hemo.co = HR * hemo.sv / 1000;
    const tpr = 19 * Math.pow(72 / HR, 0.7) * (params.narrow ? 1.25 : 1);
    hemo.map = hemo.co * tpr;
    const C = params.narrow ? 1.15 : 1.5;
    hemo.pp = hemo.sv / C * (1 + 0.9 * clamp((HR - 72) / 108, 0, 1));
    hemo.sys = hemo.map + hemo.pp * 2 / 3;
    hemo.dia = hemo.map - hemo.pp / 3;
  }
  updateHemo();

  // Segment geometry in unit space (recomputed to pixels when drawing).
  const seg = PATH.map((p, i) => {
    const from = PATH[(i + PATH.length - 1) % PATH.length].to;
    const len = Math.hypot(p.to[0] - from[0], (p.to[1] - from[1]) * (9 / 16));
    return { from, to: p.to, tag: p.tag, len, start: 0 };
  });
  let total = 0;
  for (const s of seg) { s.start = total; total += s.len; }
  const particles = new Float32Array(NP);
  const lateral = new Float32Array(NP);
  for (let i = 0; i < NP; i++) { particles[i] = (i / NP) * total; lateral[i] = (Math.random() - 0.5) * 2; }
  let phase = 0; // 0..1 within a beat; systole is phase < 0.35
  let beatT = 0;
  const systole = () => phase < 0.35;

  function segAt(s) {
    let lo = 0;
    for (let i = seg.length - 1; i >= 0; i--) if (s >= seg[i].start) { lo = i; break; }
    return lo;
  }
  // Oxygen content 0..1 along the path: rises through the lungs, falls through the body.
  function oxygen(s) {
    const i = segAt(s), sg = seg[i], f = (s - sg.start) / sg.len;
    if (sg.tag === 'lungs') return f;
    if (sg.tag === 'body') return 1 - f;
    if (sg.tag === 'pv' || sg.tag === 'la' || sg.tag === 'av-left' || sg.tag === 'out-left' || sg.tag === 'aorta') return 1;
    return 0;
  }
  function step(dt) {
    beatT += dt * params.hr / 60;
    phase = beatT % 1;
    const base = total * 0.18 * (params.hr / 72) * (params.blocked ? 0.8 : 1); // path units per second
    const sys = systole();
    for (let i = 0; i < NP; i++) {
      const s = particles[i], k = segAt(s), tag = seg[k].tag;
      let v = base;
      if (tag === 'av-right' || tag === 'av-left') v = sys ? 0 : base * 2.2;            // AV valves open in diastole
      else if (tag === 'out-right' || tag === 'out-left') v = sys ? base * 3 : 0;      // semilunar valves open in systole
      else if (tag === 'ra' || tag === 'la') v = base * (sys ? 1.2 : 0.8);
      else v = base * (sys ? 1.4 : 0.75);
      let ns = s + v * dt;
      if (ns >= total) ns -= total;
      particles[i] = ns;
    }
  }

  // ---- drawing -----------------------------------------------------------------
  const font = (px, bold = false) => `${bold ? 'bold ' : ''}${Math.round(px)}px system-ui, -apple-system, Roboto, sans-serif`;
  function pos(s, W, H) {
    const k = segAt(s), sg = seg[k], f = clamp((s - sg.start) / sg.len, 0, 1);
    return [(sg.from[0] + (sg.to[0] - sg.from[0]) * f) * W, (sg.from[1] + (sg.to[1] - sg.from[1]) * f) * H];
  }
  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    const fs = Math.max(9, W * 0.016);
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    const sys = systole();
    const squeeze = sys ? 1 - 0.10 * Math.sin(phase / 0.35 * Math.PI) * (params.blocked ? 0.6 : 1) : 1;
    const chamberW = W * 0.13, chamberH = H * 0.17;

    // lungs and body regions
    ctx.fillStyle = 'rgba(248,113,113,0.12)'; ctx.beginPath(); ctx.roundRect(W * 0.27, H * 0.05, W * 0.46, H * 0.16, 18); ctx.fill();
    ctx.fillStyle = 'rgba(96,165,250,0.12)'; ctx.beginPath(); ctx.roundRect(W * 0.18, H * 0.80, W * 0.64, H * 0.16, 18); ctx.fill();
    ctx.fillStyle = '#fca5a5'; ctx.font = font(fs * 1.1, true); ctx.textAlign = 'center';
    ctx.fillText(T('LUNGS: blood picks up oxygen', 'PARU-PARU: darah mengambil oksigen'), W * 0.5, H * 0.09);
    ctx.fillStyle = '#93c5fd';
    ctx.fillText(T('BODY: cells take the oxygen', 'TUBUH: sel-sel mengambil oksigen'), W * 0.5, H * 0.955);
    // lung lobes
    ctx.fillStyle = 'rgba(252,165,165,0.35)';
    for (const lx of [0.40, 0.60]) { ctx.beginPath(); ctx.ellipse(W * lx, H * 0.165, W * 0.05, H * 0.035, 0, 0, Math.PI * 2); ctx.fill(); }

    // vessels
    const vesselW = Math.max(6, W * 0.022);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    const drawVessel = (tags, color) => {
      ctx.strokeStyle = color; ctx.lineWidth = vesselW;
      ctx.beginPath();
      let started = false;
      for (const sg of seg) {
        if (!tags.includes(sg.tag)) { started = false; continue; }
        if (!started) { ctx.moveTo(sg.from[0] * W, sg.from[1] * H); started = true; }
        ctx.lineTo(sg.to[0] * W, sg.to[1] * H);
      }
      ctx.stroke();
    };
    drawVessel(['out-right', 'pa', 'lungs'], 'rgba(59,130,246,0.35)');
    drawVessel(['lungs', 'pv', 'la'], 'rgba(239,68,68,0.35)');
    drawVessel(['out-left', 'aorta', 'body'], 'rgba(239,68,68,0.35)');
    drawVessel(['body', 'vc', 'ra'], 'rgba(59,130,246,0.35)');
    // gradient overlay on lungs and body so the colour change is visible
    const gl = ctx.createLinearGradient(W * 0.33, 0, W * 0.67, 0); gl.addColorStop(0, 'rgba(59,130,246,0.35)'); gl.addColorStop(1, 'rgba(239,68,68,0.35)');
    ctx.strokeStyle = gl; ctx.beginPath(); ctx.moveTo(W * 0.33, H * 0.13); ctx.lineTo(W * 0.67, H * 0.13); ctx.stroke();
    const gb = ctx.createLinearGradient(W * 0.75, 0, W * 0.25, 0); gb.addColorStop(0, 'rgba(239,68,68,0.35)'); gb.addColorStop(1, 'rgba(59,130,246,0.35)');
    ctx.strokeStyle = gb; ctx.beginPath(); ctx.moveTo(W * 0.75, H * 0.88); ctx.lineTo(W * 0.25, H * 0.88); ctx.stroke();
    // narrowed artery: a constriction on the aorta
    if (params.narrow) {
      const nx = W * 0.75, ny = H * 0.74;
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath(); ctx.moveTo(nx - vesselW * 0.6, ny - H * 0.05); ctx.quadraticCurveTo(nx - vesselW * 0.05, ny, nx - vesselW * 0.6, ny + H * 0.05); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(nx + vesselW * 0.6, ny - H * 0.05); ctx.quadraticCurveTo(nx + vesselW * 0.05, ny, nx + vesselW * 0.6, ny + H * 0.05); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#fbbf24'; ctx.font = font(fs * 0.85, true); ctx.textAlign = 'left';
      ctx.fillText(T('narrowed artery', 'pembuluh menyempit'), nx + vesselW, ny + fs * 0.4);
    }

    // heart outline
    ctx.fillStyle = params.blocked ? '#5b2333' : '#7f1d1d';
    ctx.beginPath(); ctx.roundRect(W * 0.42 - chamberW * 0.62, H * 0.41 - chamberH * 0.62, (W * 0.16) + chamberW * 1.24, (H * 0.19) + chamberH * 1.24, 26); ctx.fill();
    // chambers
    const chambers = [
      { x: 0.42, y: 0.41, c: '#60a5fa', en: 'Right atrium', id: 'Serambi kanan', sq: 1 },
      { x: 0.58, y: 0.41, c: '#f87171', en: 'Left atrium', id: 'Serambi kiri', sq: 1 },
      { x: 0.42, y: 0.60, c: '#3b82f6', en: 'Right ventricle', id: 'Bilik kanan', sq: squeeze },
      { x: 0.58, y: 0.60, c: '#dc2626', en: 'Left ventricle', id: 'Bilik kiri', sq: squeeze },
    ];
    for (const ch of chambers) {
      const w = chamberW * ch.sq, h = chamberH * ch.sq;
      ctx.fillStyle = ch.c; ctx.beginPath(); ctx.roundRect(W * ch.x - w / 2, H * ch.y - h / 2, w, h, 10); ctx.fill();
      if (ch.en === 'Left ventricle') { ctx.strokeStyle = '#991b1b'; ctx.lineWidth = Math.max(4, W * 0.012); ctx.stroke(); }
      if (params.blocked && ch.en === 'Left ventricle') {
        ctx.fillStyle = 'rgba(71,85,105,0.85)'; ctx.beginPath(); ctx.roundRect(W * ch.x - w / 2, H * ch.y + h * 0.1, w, h * 0.4, [0, 0, 10, 10]); ctx.fill();
      }
      ctx.fillStyle = '#fff'; ctx.font = font(fs * 0.85, true); ctx.textAlign = 'center';
      ctx.fillText(T(ch.en, ch.id), W * ch.x, H * ch.y - fs * 0.2);
    }
    // valves: AV valves between atrium and ventricle, semilunar at the exits
    const valve = (x, y, open, horizontal) => {
      ctx.strokeStyle = '#fef3c7'; ctx.lineWidth = Math.max(2, W * 0.004); ctx.lineCap = 'round';
      const L = vesselW * 0.55, a = open ? 0.9 : 0.05;
      ctx.beginPath();
      if (horizontal) { ctx.moveTo(x - L, y); ctx.lineTo(x - L + L * Math.cos(a), y - L * Math.sin(a)); ctx.moveTo(x + L, y); ctx.lineTo(x + L - L * Math.cos(a), y - L * Math.sin(a)); }
      else { ctx.moveTo(x, y - L); ctx.lineTo(x + L * Math.sin(a), y - L + L * Math.cos(a)); ctx.moveTo(x, y + L); ctx.lineTo(x + L * Math.sin(a), y + L - L * Math.cos(a)); }
      ctx.stroke();
    };
    valve(W * 0.42, H * 0.505, !sys, true);  // tricuspid
    valve(W * 0.58, H * 0.505, !sys, true);  // mitral
    valve(W * 0.355, H * 0.60, sys, false);  // pulmonary
    valve(W * 0.645, H * 0.60, sys, false);  // aortic
    ctx.fillStyle = '#fef3c7'; ctx.font = font(fs * 0.75); ctx.textAlign = 'center';
    ctx.fillText(sys ? T('systole: ventricles squeeze, exit valves open', 'sistol: bilik memompa, katup keluar terbuka') : T('diastole: ventricles fill, AV valves open', 'diastol: bilik terisi, katup AV terbuka'), W * 0.5, H * 0.745);

    // coronary artery on the heart surface
    ctx.strokeStyle = '#fca5a5'; ctx.lineWidth = Math.max(2, W * 0.004);
    ctx.beginPath(); ctx.moveTo(W * 0.60, H * 0.505); ctx.quadraticCurveTo(W * 0.63, H * 0.58, W * 0.60, H * 0.70); ctx.stroke();
    if (params.blocked) {
      ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(W * 0.625, H * 0.575, Math.max(4, W * 0.009), 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fde68a'; ctx.font = font(fs * 0.8, true); ctx.textAlign = 'left';
      ctx.fillText(T('blocked coronary: muscle below gets no O₂', 'koroner tersumbat: otot di bawahnya tak dapat O₂'), W * 0.66, H * 0.70);
    }

    // particles
    for (let i = 0; i < NP; i++) {
      const s = particles[i], [px, py] = pos(s, W, H);
      const o = oxygen(s);
      const r = Math.round(239 * o + 99 * (1 - o)), g = Math.round(68 * o + 102 * (1 - o)), b = Math.round(68 * o + 241 * (1 - o));
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      const k = segAt(s), sg = seg[k];
      const horiz = sg.from[1] === sg.to[1];
      const off = lateral[i] * vesselW * 0.3;
      ctx.beginPath(); ctx.arc(px + (horiz ? 0 : off), py + (horiz ? off : 0), Math.max(2, W * 0.004), 0, Math.PI * 2); ctx.fill();
    }

    // vessel labels
    ctx.fillStyle = '#93c5fd'; ctx.font = font(fs * 0.8); ctx.textAlign = 'right';
    ctx.fillText(T('pulmonary artery', 'arteri pulmonalis'), W * 0.31, H * 0.36);
    ctx.fillText('vena cava', W * 0.23, H * 0.62);
    ctx.textAlign = 'left'; ctx.fillStyle = '#fca5a5';
    ctx.fillText(T('pulmonary vein', 'vena pulmonalis'), W * 0.69, H * 0.36);
    ctx.fillText('aorta', W * 0.77, H * 0.66);
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(fs * 0.8, true); ctx.textAlign = 'center';
    ctx.fillText(T('pulmonary loop', 'peredaran kecil'), W * 0.5, H * 0.29);
    ctx.fillText(T('systemic loop', 'peredaran besar'), W * 0.5, H * 0.80);
    // legend
    ctx.textAlign = 'left'; ctx.font = font(fs * 0.8);
    ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(W * 0.03, H * 0.06, fs * 0.4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#e2e8f0'; ctx.fillText(T('oxygen-rich', 'kaya oksigen'), W * 0.03 + fs * 0.8, H * 0.06 + fs * 0.35);
    ctx.fillStyle = '#6366f1'; ctx.beginPath(); ctx.arc(W * 0.03, H * 0.06 + fs * 1.5, fs * 0.4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#e2e8f0'; ctx.fillText(T('oxygen-poor', 'miskin oksigen'), W * 0.03 + fs * 0.8, H * 0.06 + fs * 1.85);

    // readouts panel (right)
    const rx = W * 0.80, ry = H * 0.30, rw = W * 0.19, rh = H * 0.42;
    ctx.fillStyle = '#111a2e'; ctx.beginPath(); ctx.roundRect(rx, ry, rw, rh, 10); ctx.fill();
    ctx.textAlign = 'left'; ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.8);
    const lines = [
      [T('Heart rate', 'Denyut jantung'), `${params.hr} /min`],
      [T('Stroke volume', 'Volume sekuncup'), `${hemo.sv.toFixed(0)} mL`],
      [T('Cardiac output', 'Curah jantung'), `${hemo.co.toFixed(1)} L/min`],
      [T('Blood pressure', 'Tekanan darah'), `${hemo.sys.toFixed(0)}/${hemo.dia.toFixed(0)} mmHg`],
    ];
    lines.forEach(([l, v], i) => {
      const y = ry + fs * 1.4 + i * fs * 2.6;
      ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.75); ctx.fillText(l, rx + 8, y);
      ctx.fillStyle = i === 3 && hemo.sys > 140 ? '#fbbf24' : i === 3 && hemo.sys < 90 ? '#f87171' : '#f8fafc'; ctx.font = font(fs * 1.05, true); ctx.fillText(v, rx + 8, y + fs * 1.1);
    });
    // pressure pulse trace along the bottom of the panel
    const tx0 = rx + 8, tx1 = rx + rw - 8, ty0 = ry + rh - fs * 0.8, tH = fs * 2.6;
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(tx0, ty0); ctx.lineTo(tx1, ty0); ctx.stroke();
    ctx.strokeStyle = '#f472b6'; ctx.lineWidth = 2; ctx.beginPath();
    for (let i = 0; i <= 60; i++) {
      const ph = (i / 60 * 2 + phase) % 1;
      const shape = ph < 0.35 ? Math.sin(ph / 0.35 * Math.PI) : Math.max(0, 0.15 * (1 - (ph - 0.35) / 0.65));
      const p = hemo.dia + (hemo.sys - hemo.dia) * shape;
      const y = ty0 - clamp(p / 200, 0, 1) * tH;
      i ? ctx.lineTo(tx0 + (tx1 - tx0) * i / 60, y) : ctx.moveTo(tx0, y);
    }
    ctx.stroke();
    ctx.fillStyle = '#f472b6'; ctx.font = font(fs * 0.7); ctx.fillText(T('aortic pressure', 'tekanan aorta'), tx0, ty0 - tH - 3);
    ctx.textAlign = 'left';
  }

  // ---- controls -----------------------------------------------------------------
  const hrS = slider({ label: 'Heart rate (beats/min)', key: 'hr', min: 40, max: 180, step: 2, value: 72, onInput: (v) => { params.hr = v; updateHemo(); } });
  const narrowT = toggle({ label: 'Narrowed artery', key: 'narrow', value: false, onChange: (v) => { params.narrow = v; updateHemo(); } });
  const blockT = toggle({ label: 'Blocked coronary artery', key: 'blocked', value: false, onChange: (v) => { params.blocked = v; updateHemo(); } });
  const presets = row(
    button({ label: 'Rest (72)', onClick: () => hrS.apply(72) }),
    button({ label: 'Walking (100)', onClick: () => hrS.apply(100) }),
    button({ label: 'Running (160)', onClick: () => hrS.apply(160) }),
  );
  ctrlPanel.append(hrS.el, presets, row(narrowT, blockT));

  const lab = labPanel({
    title: 'Heart output lab',
    filename: 'double-circulation-data.csv',
    columns: [
      { key: 'hr', label: 'Heart rate (/min)' },
      { key: 'sv', label: 'Stroke volume (mL)', format: (v) => v.toFixed(0) },
      { key: 'co', label: 'Cardiac output (L/min)', format: (v) => v.toFixed(2) },
      { key: 'bp', label: 'Blood pressure (mmHg)' },
      { key: 'narrow', label: 'Narrowed artery' },
      { key: 'blocked', label: 'Blocked coronary' },
    ],
    procedure: [
      'At rest (72 /min) record heart rate, stroke volume and cardiac output. Check: output = rate × stroke volume ÷ 1000.',
      'Record at 100, 140 and 180 /min. Plot cardiac output against heart rate. Where does it stop rising?',
      'Back at 72 /min, switch on Narrowed artery and record. Compare the blood pressure with the resting row.',
      'Switch Narrowed artery off and Blocked coronary on. Record. Which number fell, and why?',
    ],
    predict: 'If the heart rate doubles from 72 to 144, will cardiac output exactly double? Why might it not?',
    source: () => ({ hr: params.hr, sv: hemo.sv, co: hemo.co, bp: `${hemo.sys.toFixed(0)}/${hemo.dia.toFixed(0)}`, narrow: params.narrow ? 'yes' : 'no', blocked: params.blocked ? 'yes' : 'no' }),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
