import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const V_FS = 2;   // full-scale range: −1 V … +1 V
const SIGNALS = [
  { id: 'sine', label: { en: 'Sine', id: 'Sinus' }, harmonics: [[1, 1]] },
  { id: 'voice', label: { en: 'Voice-like (f, 2f, 3f)', id: 'Mirip suara (f, 2f, 3f)' }, harmonics: [[1, 1], [2, 0.5], [3, 0.25]] },
  { id: 'triangle', label: { en: 'Triangle (f, 3f, 5f)', id: 'Segitiga (f, 3f, 5f)' }, harmonics: [[1, 1], [3, -1 / 9], [5, 1 / 25]] },
];

function fmtHz(v) {
  if (!Number.isFinite(v)) return '—';
  return v >= 1000 ? `${(v / 1000).toPrecision(v >= 10000 ? 3 : 3)} kHz` : `${Math.round(v)} Hz`;
}
function fmtBits(v) {
  if (v >= 1e6) return `${(v / 1e6).toPrecision(3)} Mbit/s`;
  if (v >= 1e3) return `${(v / 1e3).toPrecision(3)} kbit/s`;
  return `${Math.round(v)} bit/s`;
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const params = { signal: 'sine', f: 1000, logFs: Math.log10(8000), bits: 3, showRecon: true, playing: true };
  const state = { play: 0 };          // playhead position 0..1 across the window

  const sig = () => SIGNALS.find((s) => s.id === params.signal) || SIGNALS[0];
  const fs = () => Math.round(10 ** params.logFs);
  const fMax = () => params.f * sig().harmonics[sig().harmonics.length - 1][0];
  const levels = () => 2 ** params.bits;
  const stepV = () => V_FS / (levels() - 1);
  // normalise the waveform so its peak is exactly 1 V
  let normCache = { id: '', norm: 1 };
  function norm() {
    if (normCache.id !== params.signal) {
      let m = 0;
      for (let i = 0; i < 2000; i++) { const ph = i / 2000; let v = 0; for (const [k, a] of sig().harmonics) v += a * Math.sin(2 * Math.PI * k * ph); m = Math.max(m, Math.abs(v)); }
      normCache = { id: params.signal, norm: m || 1 };
    }
    return normCache.norm;
  }
  function analog(t) {
    let v = 0;
    for (const [k, a] of sig().harmonics) v += a * Math.sin(2 * Math.PI * k * params.f * t);
    return v / norm();
  }
  const quantCode = (x) => clamp(Math.round((x + 1) / stepV()), 0, levels() - 1);
  const codeToV = (c) => c * stepV() - 1;

  function windowLen() { return 4 / params.f; }            // show 4 periods of the fundamental
  function samples() {
    const Tw = windowLen(), dt = 1 / fs();
    const n = Math.floor(Tw / dt) + 1;
    const out = [];
    for (let k = 0; k < Math.min(n, 4000); k++) {
      const t = k * dt, x = analog(t), c = quantCode(x), xq = codeToV(c);
      out.push({ t, x, c, xq, err: x - xq });
    }
    return out;
  }
  function aliasInfo() {
    const nyq = 2 * fMax();
    const aliased = fs() <= nyq;
    const m = Math.round(params.f / fs());
    const fa = Math.abs(params.f - m * fs());
    return { nyq, aliased, fa, sign: Math.sign(params.f - m * fs()) || 1, m };
  }

  function step(dt) {
    if (!params.playing) return;
    state.play = (state.play + dt / 5) % 1;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    const fsz = clamp(W * 0.023, 10, 14), lh = fsz * 1.4;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    const S = samples();
    const al = aliasInfo();
    const Tw = windowLen();
    const maxErr = S.reduce((m, s) => Math.max(m, Math.abs(s.err)), 0);

    // ---- header readouts --------------------------------------------------
    ctx.font = `${fsz}px system-ui, sans-serif`; ctx.textAlign = 'left';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText(`f = ${fmtHz(params.f)}  (f_max = ${fmtHz(fMax())})   fs = ${fmtHz(fs())}   n = ${params.bits} bit → ${levels()} ${T('levels', 'tingkat')}, Δ = ${(stepV() * 1000).toPrecision(3)} mV`, 8, lh);
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(`${T('bit rate', 'laju bit')} = fs × n = ${fs()} × ${params.bits} = ${fmtBits(fs() * params.bits)}   ${T('max error', 'galat maks')} = ${(maxErr * 1000).toPrecision(3)} mV (Δ/2 = ${(stepV() * 500).toPrecision(3)} mV)`, 8, lh * 2);
    ctx.fillStyle = al.aliased ? '#ef4444' : '#22c55e';
    ctx.fillText(al.aliased
      ? T(`ALIASING: fs ≤ 2·f_max = ${fmtHz(al.nyq)} → appears as ${fmtHz(al.fa)}`, `ALIASING: fs ≤ 2·f_maks = ${fmtHz(al.nyq)} → tampak sebagai ${fmtHz(al.fa)}`)
      : T(`Nyquist OK: fs > 2·f_max = ${fmtHz(al.nyq)}`, `Nyquist OK: fs > 2·f_maks = ${fmtHz(al.nyq)}`), 8, lh * 3);

    // ---- main plot --------------------------------------------------------
    const px0 = W * 0.08, px1 = W * 0.97, py0 = lh * 3.6, py1 = H * 0.6;
    const X = (t) => px0 + (t / Tw) * (px1 - px0);
    const midY = (py0 + py1) / 2, amp = (py1 - py0) / 2 * 0.92;
    const Y = (v) => midY - v * amp;
    // level grid (only when few levels)
    if (levels() <= 64) {
      ctx.strokeStyle = 'rgba(148,163,184,0.18)'; ctx.lineWidth = 1;
      for (let c = 0; c < levels(); c++) { const y = Y(codeToV(c)); ctx.beginPath(); ctx.moveTo(px0, y); ctx.lineTo(px1, y); ctx.stroke(); }
    }
    ctx.strokeStyle = 'rgba(148,163,184,0.6)';
    ctx.beginPath(); ctx.moveTo(px0, py0); ctx.lineTo(px0, py1); ctx.moveTo(px0, midY); ctx.lineTo(px1, midY); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = `${fsz * 0.85}px system-ui, sans-serif`; ctx.textAlign = 'right';
    ctx.fillText('+1 V', px0 - 4, Y(1) + fsz * 0.35); ctx.fillText('0', px0 - 4, midY + fsz * 0.35); ctx.fillText('−1 V', px0 - 4, Y(-1) + fsz * 0.35);
    ctx.textAlign = 'center';
    for (let k = 0; k <= 4; k++) { const x = X(k / params.f); ctx.beginPath(); ctx.moveTo(x, py1); ctx.lineTo(x, py1 + 4); ctx.stroke(); ctx.fillText(`${(k / params.f * 1000).toPrecision(3)} ms`, x, py1 + fsz); }
    // analog
    ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2; ctx.beginPath();
    const nPts = Math.max(200, Math.round((px1 - px0) * 2));
    for (let i = 0; i <= nPts; i++) { const t = Tw * i / nPts; const y = Y(analog(t)); i ? ctx.lineTo(X(t), y) : ctx.moveTo(X(t), y); }
    ctx.stroke();
    // alias curve (sine only, exact): sin(2π (f − m fs) t) passes through every sample
    if (al.aliased && params.signal === 'sine') {
      ctx.strokeStyle = 'rgba(239,68,68,0.9)'; ctx.setLineDash([6, 4]); ctx.lineWidth = 1.5; ctx.beginPath();
      for (let i = 0; i <= nPts; i++) { const t = Tw * i / nPts; const y = Y(Math.sin(2 * Math.PI * (params.f - al.m * fs()) * t)); i ? ctx.lineTo(X(t), y) : ctx.moveTo(X(t), y); }
      ctx.stroke(); ctx.setLineDash([]);
    }
    // staircase reconstruction
    if (params.showRecon && S.length) {
      ctx.strokeStyle = '#f97316'; ctx.lineWidth = 2; ctx.beginPath();
      const dt = 1 / fs();
      S.forEach((s, i) => { const y = Y(s.xq); i ? ctx.lineTo(X(s.t), y) : ctx.moveTo(X(s.t), y); ctx.lineTo(X(Math.min(s.t + dt, Tw)), y); });
      ctx.stroke();
    }
    // samples (stems + dots), skip stems when dense
    const dense = S.length > 120;
    const playT = state.play * Tw;
    let active = -1;
    for (let i = 0; i < S.length; i++) if (S[i].t <= playT) active = i;
    for (let i = 0; i < S.length; i++) {
      const s = S[i];
      const x = X(s.t);
      if (!dense) { ctx.strokeStyle = 'rgba(251,191,36,0.35)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, midY); ctx.lineTo(x, Y(s.x)); ctx.stroke(); }
      ctx.fillStyle = i === active ? '#ffffff' : '#fbbf24';
      ctx.beginPath(); ctx.arc(x, Y(s.x), dense ? 2 : 3.5, 0, Math.PI * 2); ctx.fill();
    }
    // playhead
    ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(X(playT), py0); ctx.lineTo(X(playT), py1); ctx.stroke(); ctx.setLineDash([]);
    // legend
    ctx.textAlign = 'left'; ctx.font = `${fsz * 0.85}px system-ui, sans-serif`;
    let lx = px0 + 6; const ly = py0 + fsz;
    const leg = (color, txt) => { ctx.fillStyle = color; ctx.fillRect(lx, ly - fsz * 0.55, 10, 3); ctx.fillText(txt, lx + 14, ly); lx += ctx.measureText(txt).width + 30; };
    leg('#38bdf8', T('analog', 'analog')); leg('#fbbf24', T('samples', 'cuplikan'));
    if (params.showRecon) leg('#f97316', T('reconstructed (hold)', 'rekonstruksi (tahan)'));
    if (al.aliased && params.signal === 'sine') leg('#ef4444', T(`alias ${fmtHz(al.fa)}`, `alias ${fmtHz(al.fa)}`));

    // ---- error strip ------------------------------------------------------
    const ey0 = H * 0.65, ey1 = H * 0.76, emid = (ey0 + ey1) / 2;
    const eAmp = (ey1 - ey0) / 2 * 0.9, eScale = Math.max(stepV() / 2, 1e-6);
    ctx.strokeStyle = 'rgba(148,163,184,0.5)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(px0, emid); ctx.lineTo(px1, emid); ctx.moveTo(px0, ey0); ctx.lineTo(px0, ey1); ctx.stroke();
    ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(px0, emid - eAmp); ctx.lineTo(px1, emid - eAmp); ctx.moveTo(px0, emid + eAmp); ctx.lineTo(px1, emid + eAmp); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'right';
    ctx.fillText(`+Δ/2`, px0 - 4, emid - eAmp + fsz * 0.35); ctx.fillText(`−Δ/2`, px0 - 4, emid + eAmp + fsz * 0.35);
    ctx.textAlign = 'left'; ctx.fillText(T('quantisation error x − x̂', 'galat kuantisasi x − x̂'), px0 + 6, ey0 - 3);
    ctx.fillStyle = '#a78bfa';
    for (const s of S) { const x = X(s.t); const y = emid - clamp(s.err / eScale, -1.1, 1.1) * eAmp; ctx.fillRect(x - 1, Math.min(emid, y), 2, Math.abs(y - emid) || 1); }

    // ---- binary codes -----------------------------------------------------
    const cy = H * 0.84;
    ctx.font = `${fsz * 0.85}px system-ui, sans-serif`; ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'left';
    ctx.fillText(T(`binary codes of the first samples (${params.bits} bit each):`, `kode biner cuplikan pertama (masing-masing ${params.bits} bit):`), px0, cy - fsz * 0.4);
    ctx.font = `${fsz * 1.05}px ui-monospace, SFMono-Regular, Menlo, monospace`;
    const cellW = ctx.measureText('0'.repeat(params.bits)).width + fsz * 1.1;
    const nShow = Math.max(1, Math.min(S.length, Math.floor((px1 - px0) / cellW)));
    for (let i = 0; i < nShow; i++) {
      const s = S[i], x = px0 + i * cellW;
      const hot = i === active;
      ctx.fillStyle = hot ? '#fbbf24' : '#1e293b';
      ctx.fillRect(x, cy, cellW - fsz * 0.4, fsz * 1.5);
      ctx.fillStyle = hot ? '#0b1220' : '#e2e8f0';
      ctx.fillText(s.c.toString(2).padStart(params.bits, '0'), x + fsz * 0.3, cy + fsz * 1.1);
      ctx.fillStyle = '#64748b'; ctx.font = `${fsz * 0.75}px system-ui, sans-serif`;
      ctx.fillText(`${s.xq >= 0 ? '+' : ''}${s.xq.toFixed(2)}`, x + fsz * 0.3, cy + fsz * 2.4);
      ctx.font = `${fsz * 1.05}px ui-monospace, SFMono-Regular, Menlo, monospace`;
    }
    if (nShow < S.length) { ctx.fillStyle = '#64748b'; ctx.font = `${fsz}px system-ui, sans-serif`; ctx.fillText(`… ${S.length - nShow} ${T('more', 'lagi')}`, px0 + nShow * cellW, cy + fsz * 1.1); }
    ctx.textAlign = 'left';
  }

  // ---- controls ----------------------------------------------------------
  const lang = getLocale() === 'id' ? 'id' : 'en';
  const sigSel = select({ label: 'Signal', key: 'signal', value: params.signal, options: SIGNALS.map((s) => ({ value: s.id, label: s.label[lang] })), onChange: (v) => { params.signal = v; } });
  const fS = slider({ label: 'Signal frequency f (Hz)', key: 'f-hz', min: 100, max: 2000, step: 10, value: params.f, onInput: (v) => { params.f = v; } });
  const fsS = slider({ label: 'Sample rate fs', key: 'log-fs', min: Math.log10(200), max: Math.log10(32000), step: 0.01, value: params.logFs, format: (v) => fmtHz(Math.round(10 ** v)), onInput: (v) => { params.logFs = v; } });
  const bS = slider({ label: 'Bits per sample n', key: 'bits', min: 1, max: 8, step: 1, value: params.bits, format: (v) => `${v} bit → ${2 ** v} levels`, onInput: (v) => { params.bits = v; } });
  const reconT = toggle({ label: 'Show reconstruction', key: 'recon', value: true, onChange: (v) => { params.showRecon = v; } });
  const playB = button({ label: 'Pause / Play', onClick: () => { params.playing = !params.playing; } });
  const nyqB = button({ label: 'Set fs = 2.5 × f_max', onClick: () => { params.logFs = clamp(Math.log10(2.5 * fMax()), Math.log10(200), Math.log10(32000)); fsS.value = params.logFs; } });
  ctrlPanel.append(sigSel.el, fS.el, fsS.el, bS.el, row(reconT, playB, nyqB));

  const lab = labPanel({
    title: 'ADC lab — sample rate, bits and error',
    filename: 'analog-to-digital-data.csv',
    columns: [
      { key: 'signal', label: 'Signal' },
      { key: 'f', label: 'f (Hz)', format: (v) => v.toFixed(0) },
      { key: 'fmax', label: 'f_max (Hz)', format: (v) => v.toFixed(0) },
      { key: 'fs', label: 'fs (Hz)', format: (v) => v.toFixed(0) },
      { key: 'bits', label: 'bits', format: (v) => v.toFixed(0) },
      { key: 'step', label: 'Δ (mV)', format: (v) => v.toPrecision(3) },
      { key: 'maxErr', label: 'max error (mV)', format: (v) => v.toPrecision(3) },
      { key: 'bitrate', label: 'bit rate (bit/s)', format: (v) => v.toFixed(0) },
      { key: 'aliased', label: 'aliased?' },
    ],
    procedure: [
      'Sine, f = 1000 Hz, fs = 8000 Hz. Record at n = 1, 2, 3, 4, 6, 8 bits. How does the max error change per extra bit?',
      'Keep 8 bits. Record at fs = 8000, 4000, 2500, 2100, 1900, 1100 Hz. Note where "aliased" switches to yes.',
      'At fs = 1100 Hz read the alias frequency on screen and check |f − fs·round(f/fs)| by hand.',
      'Switch to the voice-like signal (f_max = 3f). Find the lowest fs that is still not aliased and compare with 2·f_max.',
      'Compute the bit rate for telephone quality (fs = 8000 Hz, 8 bits) and record it.',
    ],
    predict: 'If you add one more bit, by what factor does the maximum quantisation error change? What is the lowest sample rate that still captures a 1000 Hz sine?',
    source: () => {
      const S = samples();
      if (!S.length) return null;
      const maxErr = S.reduce((m, s) => Math.max(m, Math.abs(s.err)), 0);
      const al = aliasInfo();
      return { signal: sig().id, f: params.f, fmax: fMax(), fs: fs(), bits: params.bits, step: stepV() * 1000, maxErr: maxErr * 1000, bitrate: fs() * params.bits, aliased: al.aliased ? 'yes' : 'no' };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
