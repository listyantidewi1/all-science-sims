import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

// Toy accumulator machine: 16 words of 8 bits. word = opcode (4 bits) << 4 | operand (4 bits).
const OPS = ['HALT', 'LOAD', 'ADD', 'SUB', 'STORE', 'JUMP', 'JZ', 'IN', 'OUT'];
const OPC = Object.fromEntries(OPS.map((o, i) => [o, i]));
const MEM_SIZE = 16;
const enc = (op, arg = 0) => ((OPC[op] << 4) | (arg & 15)) & 255;
const B = (en, id) => ({ en, id });

const PROGRAMS = {
  add: {
    name: B('Add two numbers', 'Jumlahkan dua bilangan'),
    code: [['IN'], ['STORE', 10], ['IN'], ['ADD', 10], ['OUT'], ['HALT']],
    data: {},
    inputs: [{ label: 'Input 1', v: 5, mode: 'queue' }, { label: 'Input 2', v: 7, mode: 'queue' }],
    note: B('Reads two numbers from the input device, keeps the first in memory word 10, adds the second, outputs the sum.', 'Membaca dua bilangan dari perangkat masukan, menyimpan yang pertama di kata memori 10, menambahkan yang kedua, mengeluarkan jumlahnya.'),
  },
  countdown: {
    name: B('Count down from N', 'Hitung mundur dari N'),
    code: [['IN'], ['STORE', 10], ['LOAD', 10], ['JZ', 8], ['OUT'], ['SUB', 11], ['STORE', 10], ['JUMP', 2], ['HALT']],
    data: { 11: 1 },
    inputs: [{ label: 'N', v: 5, mode: 'queue' }],
    note: B('A loop: word 10 is the counter, word 11 holds the constant 1. JZ leaves the loop when the counter reaches 0.', 'Sebuah perulangan: kata 10 adalah pencacah, kata 11 menyimpan konstanta 1. JZ keluar dari perulangan saat pencacah mencapai 0.'),
  },
  multiply: {
    name: B('Multiply a × b (repeated addition)', 'Perkalian a × b (penjumlahan berulang)'),
    code: [['LOAD', 12], ['JZ', 8], ['SUB', 14], ['STORE', 12], ['LOAD', 13], ['ADD', 11], ['STORE', 13], ['JUMP', 0], ['LOAD', 13], ['OUT'], ['HALT']],
    data: { 11: 6, 12: 4, 13: 0, 14: 1 },
    inputs: [{ label: 'a (memory 11)', v: 6, mode: 'mem', addr: 11 }, { label: 'b (memory 12)', v: 4, mode: 'mem', addr: 12 }],
    note: B('No multiply instruction exists: a (word 11) is added to the product (word 13) b times, counting b (word 12) down to 0 with the constant 1 in word 14.', 'Tidak ada instruksi kali: a (kata 11) ditambahkan ke hasil (kata 13) sebanyak b kali, menghitung b (kata 12) mundur ke 0 dengan konstanta 1 di kata 14.'),
  },
};

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const bin = (v, n = 8) => v.toString(2).padStart(n, '0');
const bin8s = (v) => `${bin(v >> 4, 4)} ${bin(v & 15, 4)}`;
const mnemonic = (w) => { const op = w >> 4, arg = w & 15; return op < OPS.length ? (['HALT', 'IN', 'OUT'].includes(OPS[op]) && arg === 0 ? OPS[op] : `${OPS[op]} ${arg}`) : `?? ${arg}`; };

export function mount(rootEl) {
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const state = {
    progKey: 'add',
    mem: new Uint8Array(MEM_SIZE),
    codeLen: 0,
    pc: 0, ir: 0, acc: 0, mar: 0,
    opcode: 0, operand: 0,
    phase: 'fetch',        // fetch | decode | execute
    cycles: 0, phases: 0,
    halted: false, error: null,
    inQueue: [], out: [],
    inputVals: [],
    running: false, speed: 2, accum: 0,
    lastRead: -1, lastWrite: -1, lastIn: false, lastOut: false,
    pulses: [],            // {bus:'addr'|'data', dir: +1 (cpu→mem) | -1, t, delay}
    msg: B('', ''),
    flashAcc: 0, flashPc: 0, flashIr: 0,
  };
  const prog = () => PROGRAMS[state.progKey];

  function loadProgram() {
    const p = prog();
    state.mem.fill(0);
    p.code.forEach(([op, arg], i) => { state.mem[i] = enc(op, arg); });
    for (const [a, v] of Object.entries(p.data)) state.mem[Number(a)] = v & 255;
    state.codeLen = p.code.length;
    state.inQueue = [];
    p.inputs.forEach((inp, i) => {
      const v = clamp(Math.round(state.inputVals[i] ?? inp.v), 0, 255);
      if (inp.mode === 'queue') state.inQueue.push(v); else state.mem[inp.addr] = v;
    });
    state.pc = 0; state.ir = 0; state.acc = 0; state.mar = 0; state.opcode = 0; state.operand = 0;
    state.phase = 'fetch'; state.cycles = 0; state.phases = 0;
    state.halted = false; state.error = null; state.out = [];
    state.running = false; state.accum = 0;
    state.lastRead = -1; state.lastWrite = -1; state.lastIn = false; state.lastOut = false;
    state.pulses = [];
    state.msg = B('Ready. Press Step to run one phase.', 'Siap. Tekan Langkah untuk menjalankan satu fase.');
    runB.label = T('Run', 'Jalankan');
  }

  function pulse(bus, dir, delay = 0) { state.pulses.push({ bus, dir, t: -delay }); }

  function phaseStep() {
    if (state.halted) return;
    state.pulses = [];
    state.lastRead = -1; state.lastWrite = -1; state.lastIn = false; state.lastOut = false;
    state.phases++;
    if (state.phase === 'fetch') {
      state.mar = state.pc;
      state.ir = state.mem[state.pc];
      state.lastRead = state.pc;
      const oldPc = state.pc;
      state.pc = (state.pc + 1) & 15;
      pulse('addr', +1); pulse('data', -1, 0.35);
      state.flashIr = 1; state.flashPc = 1;
      state.msg = B(`FETCH: address ${oldPc} goes out on the address bus; word ${bin8s(state.ir)} (${state.ir}) comes back on the data bus into IR. PC ← ${state.pc}.`,
        `AMBIL: alamat ${oldPc} dikirim lewat bus alamat; kata ${bin8s(state.ir)} (${state.ir}) kembali lewat bus data ke IR. PC ← ${state.pc}.`);
      state.phase = 'decode';
    } else if (state.phase === 'decode') {
      state.opcode = state.ir >> 4; state.operand = state.ir & 15;
      const m = mnemonic(state.ir);
      state.msg = B(`DECODE: opcode ${bin(state.opcode, 4)} = ${state.opcode} → ${OPS[state.opcode] ?? '??'}, operand ${bin(state.operand, 4)} = ${state.operand}. Instruction: ${m}.`,
        `TERJEMAHKAN: opcode ${bin(state.opcode, 4)} = ${state.opcode} → ${OPS[state.opcode] ?? '??'}, operan ${bin(state.operand, 4)} = ${state.operand}. Instruksi: ${m}.`);
      state.phase = 'execute';
    } else {
      execute();
      state.cycles++;
      state.phase = 'fetch';
      if (state.halted) { state.running = false; runB.label = T('Run', 'Jalankan'); }
    }
  }

  function execute() {
    const op = OPS[state.opcode], a = state.operand, m = state.mem;
    switch (op) {
      case 'HALT':
        state.halted = true;
        state.msg = B(`EXECUTE: HALT. The computer stops after ${state.cycles + 1} cycles.`, `JALANKAN: HALT. Komputer berhenti setelah ${state.cycles + 1} siklus.`);
        break;
      case 'LOAD':
        state.acc = m[a]; state.lastRead = a; state.mar = a; pulse('addr', +1); pulse('data', -1, 0.35); state.flashAcc = 1;
        state.msg = B(`EXECUTE: LOAD ${a}. Memory word ${a} (${m[a]}) is copied into ACC.`, `JALANKAN: LOAD ${a}. Kata memori ${a} (${m[a]}) disalin ke ACC.`);
        break;
      case 'ADD': {
        const sum = state.acc + m[a]; const ov = sum > 255;
        state.acc = sum & 255; state.lastRead = a; state.mar = a; pulse('addr', +1); pulse('data', -1, 0.35); state.flashAcc = 1;
        state.msg = B(`EXECUTE: ADD ${a}. ALU adds memory word ${a} (${m[a]}) to ACC → ${state.acc}${ov ? ' (overflow! result wrapped past 255)' : ''}.`,
          `JALANKAN: ADD ${a}. ALU menambahkan kata memori ${a} (${m[a]}) ke ACC → ${state.acc}${ov ? ' (overflow! hasil melewati 255 dan berputar)' : ''}.`);
        break;
      }
      case 'SUB': {
        const d = state.acc - m[a]; const un = d < 0;
        state.acc = (d + 256) & 255; state.lastRead = a; state.mar = a; pulse('addr', +1); pulse('data', -1, 0.35); state.flashAcc = 1;
        state.msg = B(`EXECUTE: SUB ${a}. ALU subtracts memory word ${a} (${m[a]}) from ACC → ${state.acc}${un ? ' (went below 0 and wrapped)' : ''}.`,
          `JALANKAN: SUB ${a}. ALU mengurangkan kata memori ${a} (${m[a]}) dari ACC → ${state.acc}${un ? ' (di bawah 0 dan berputar)' : ''}.`);
        break;
      }
      case 'STORE':
        m[a] = state.acc; state.lastWrite = a; state.mar = a; pulse('addr', +1); pulse('data', +1, 0.35);
        state.msg = B(`EXECUTE: STORE ${a}. ACC (${state.acc}) is written into memory word ${a}.`, `JALANKAN: STORE ${a}. ACC (${state.acc}) ditulis ke kata memori ${a}.`);
        break;
      case 'JUMP':
        state.pc = a; state.flashPc = 1;
        state.msg = B(`EXECUTE: JUMP ${a}. PC ← ${a}; the next fetch comes from address ${a}.`, `JALANKAN: JUMP ${a}. PC ← ${a}; pengambilan berikutnya dari alamat ${a}.`);
        break;
      case 'JZ':
        if (state.acc === 0) { state.pc = a; state.flashPc = 1; state.msg = B(`EXECUTE: JZ ${a}. ACC is 0, so PC ← ${a}.`, `JALANKAN: JZ ${a}. ACC bernilai 0, jadi PC ← ${a}.`); }
        else state.msg = B(`EXECUTE: JZ ${a}. ACC is ${state.acc}, not 0, so nothing happens; PC stays ${state.pc}.`, `JALANKAN: JZ ${a}. ACC bernilai ${state.acc}, bukan 0, jadi tidak terjadi apa-apa; PC tetap ${state.pc}.`);
        break;
      case 'IN':
        state.lastIn = true; state.flashAcc = 1;
        if (state.inQueue.length) { state.acc = state.inQueue.shift(); state.msg = B(`EXECUTE: IN. The next value from the input device (${state.acc}) goes into ACC.`, `JALANKAN: IN. Nilai berikutnya dari perangkat masukan (${state.acc}) masuk ke ACC.`); }
        else { state.acc = 0; state.msg = B('EXECUTE: IN. No input is waiting, so ACC ← 0.', 'JALANKAN: IN. Tidak ada masukan yang menunggu, jadi ACC ← 0.'); }
        break;
      case 'OUT':
        state.out.push(state.acc); state.lastOut = true;
        state.msg = B(`EXECUTE: OUT. ACC (${state.acc}) is sent to the output device.`, `JALANKAN: OUT. ACC (${state.acc}) dikirim ke perangkat keluaran.`);
        break;
      default:
        state.halted = true; state.error = 'bad-opcode';
        state.msg = B(`EXECUTE: opcode ${state.opcode} is not an instruction. The CPU crashes: it tried to execute a data word.`, `JALANKAN: opcode ${state.opcode} bukan instruksi. CPU macet: ia mencoba menjalankan kata data.`);
    }
  }

  // ---------- drawing ----------
  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    const fs = clamp(W * 0.0148, 7, 14);
    const mono = `${fs}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
    const sans = `${fs}px system-ui, -apple-system, Roboto, sans-serif`;
    ctx.textBaseline = 'middle';

    // ---- phase pills (top-left) ----
    const phases = [['fetch', T('FETCH', 'AMBIL')], ['decode', T('DECODE', 'TERJEMAHKAN')], ['execute', T('EXECUTE', 'JALANKAN')]];
    let px = W * 0.03; const py = H * 0.05, ph = fs * 1.7;
    ctx.font = `700 ${fs * 0.95}px system-ui, sans-serif`;
    phases.forEach(([k, label], i) => {
      const w = ctx.measureText(label).width + fs * 1.6;
      const active = state.phase === k && !state.halted;
      ctx.fillStyle = active ? '#fbbf24' : 'rgba(148,163,184,0.15)';
      ctx.beginPath(); ctx.roundRect(px, py - ph / 2, w, ph, ph / 2); ctx.fill();
      ctx.fillStyle = active ? '#0b1220' : '#94a3b8'; ctx.textAlign = 'center';
      ctx.fillText(label, px + w / 2, py);
      if (i < 2) { ctx.fillStyle = '#64748b'; ctx.fillText('→', px + w + fs * 0.55, py); }
      px += w + fs * 1.1;
    });
    ctx.textAlign = 'left'; ctx.fillStyle = '#94a3b8'; ctx.font = sans;
    ctx.fillText(`${T('Cycles', 'Siklus')}: ${state.cycles}   ${T('Phases', 'Fase')}: ${state.phases}${state.halted ? '   ' + (state.error ? T('CRASHED', 'MACET') : T('HALTED', 'BERHENTI')) : ''}`, px + fs * 0.5, py);

    // ---- CPU box ----
    const cx = W * 0.03, cy = H * 0.11, cw = W * 0.43, ch = H * 0.56;
    ctx.fillStyle = '#111b2e'; ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(cx, cy, cw, ch, 10); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = `700 ${fs}px system-ui, sans-serif`;
    ctx.fillText('CPU', cx + fs * 0.8, cy + fs);
    const reg = (x, y, w, label, val, bits, flash, color) => {
      const h = fs * 3.1;
      ctx.fillStyle = flash > 0 ? `rgba(251,191,36,${0.12 + 0.3 * flash})` : 'rgba(148,163,184,0.10)';
      ctx.strokeStyle = color; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.roundRect(x, y, w, h, 6); ctx.fill(); ctx.stroke();
      ctx.fillStyle = color; ctx.font = `700 ${fs * 0.85}px system-ui, sans-serif`; ctx.textAlign = 'left';
      ctx.fillText(label, x + fs * 0.5, y + fs * 0.8);
      ctx.fillStyle = '#f8fafc'; ctx.font = `700 ${fs * 1.05}px ui-monospace, monospace`;
      ctx.fillText(bits === 4 ? bin(val, 4) : bin8s(val), x + fs * 0.5, y + fs * 2.1);
      ctx.fillStyle = '#e2e8f0'; ctx.font = `${fs}px ui-monospace, monospace`; ctx.textAlign = 'right';
      ctx.fillText(String(val), x + w - fs * 0.5, y + fs * 2.1);
      ctx.textAlign = 'left';
    };
    const colW = (cw - fs * 3) / 2;
    const lx = cx + fs, rx = cx + fs * 2 + colW;
    let ry = cy + fs * 1.9;
    // Control unit column
    ctx.fillStyle = '#64748b'; ctx.font = `${fs * 0.85}px system-ui, sans-serif`;
    ctx.fillText(T('Control unit', 'Unit kendali'), lx, ry); ry += fs * 0.9;
    reg(lx, ry, colW, `PC  (${T('program counter', 'pencacah program')})`, state.pc, 4, state.flashPc, '#fbbf24');
    ry += fs * 3.5;
    reg(lx, ry, colW, `IR  (${T('instruction register', 'register instruksi')})`, state.ir, 8, state.flashIr, '#a78bfa');
    ry += fs * 3.5;
    // decode readout
    ctx.fillStyle = 'rgba(167,139,250,0.12)'; ctx.beginPath(); ctx.roundRect(lx, ry, colW, fs * 2.6, 6); ctx.fill();
    ctx.font = `${fs * 0.9}px ui-monospace, monospace`;
    const decoded = state.phase !== 'decode' || state.halted;
    ctx.fillStyle = decoded ? '#c4b5fd' : '#64748b';
    ctx.fillText(`opcode ${bin(decoded ? state.opcode : state.ir >> 4, 4)} = ${decoded ? (OPS[state.opcode] ?? '??') : '?'}`, lx + fs * 0.5, ry + fs * 0.8);
    ctx.fillText(`operand ${bin(decoded ? state.operand : state.ir & 15, 4)} = ${decoded ? state.operand : '?'}`, lx + fs * 0.5, ry + fs * 1.85);
    // ALU / ACC column
    let ay = cy + fs * 1.9;
    ctx.fillStyle = '#64748b'; ctx.font = `${fs * 0.85}px system-ui, sans-serif`;
    ctx.fillText(T('Arithmetic logic unit + register', 'Unit aritmetika-logika + register'), rx, ay); ay += fs * 0.9;
    reg(rx, ay, colW, `ACC  (${T('accumulator', 'akumulator')})`, state.acc, 8, state.flashAcc, '#34d399');
    ay += fs * 3.5;
    // ALU trapezoid
    const aw = colW * 0.7, ah = fs * 2.6, ax = rx + (colW - aw) / 2;
    ctx.fillStyle = 'rgba(52,211,153,0.12)'; ctx.strokeStyle = '#34d399'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ax + aw, ay); ctx.lineTo(ax + aw * 0.8, ay + ah); ctx.lineTo(ax + aw * 0.2, ay + ah); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#86efac'; ctx.font = `700 ${fs}px system-ui, sans-serif`; ctx.textAlign = 'center';
    ctx.fillText(`ALU  + −`, ax + aw / 2, ay + ah / 2);
    ctx.textAlign = 'left';
    // message
    ctx.fillStyle = '#fde68a'; ctx.font = `${fs * 0.92}px system-ui, sans-serif`;
    wrap(ctx, T(state.msg.en, state.msg.id), cx + fs, cy + ch - fs * 3.6, cw - fs * 2, fs * 1.25, 3);

    // ---- memory ----
    const mx = W * 0.59, my = H * 0.05, mw = W * 0.385, rowH = (H * 0.9) / (MEM_SIZE + 1);
    ctx.fillStyle = '#111b2e'; ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(mx, my, mw, rowH * (MEM_SIZE + 1) + fs * 0.6, 10); ctx.fill(); ctx.stroke();
    const mfs = clamp(Math.min(fs, rowH * 0.62), 6, 14);
    ctx.font = `700 ${mfs * 0.9}px system-ui, sans-serif`; ctx.fillStyle = '#94a3b8';
    const c1 = mx + fs * 0.6, c2 = mx + mw * 0.2, c3 = mx + mw * 0.56, c4 = mx + mw * 0.68;
    const hy = my + rowH * 0.55 + fs * 0.3;
    ctx.fillText(T('addr', 'alamat'), c1, hy); ctx.fillText(T('contents (8 bits)', 'isi (8 bit)'), c2, hy); ctx.fillText('dec', c3, hy); ctx.fillText(T('reads as', 'terbaca'), c4, hy);
    for (let i = 0; i < MEM_SIZE; i++) {
      const y = my + rowH * (i + 1) + fs * 0.3, yc = y + rowH / 2;
      if (i === state.lastWrite) ctx.fillStyle = 'rgba(52,211,153,0.28)';
      else if (i === state.lastRead) ctx.fillStyle = 'rgba(34,211,238,0.22)';
      else ctx.fillStyle = i % 2 ? 'rgba(148,163,184,0.05)' : 'transparent';
      ctx.fillRect(mx + 2, y, mw - 4, rowH);
      if (i === state.pc && !state.halted) { ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 1.5; ctx.strokeRect(mx + 3, y + 1, mw - 6, rowH - 2); }
      const isCode = i < state.codeLen;
      ctx.font = `${mfs}px ui-monospace, monospace`;
      ctx.fillStyle = '#94a3b8'; ctx.fillText(`${String(i).padStart(2, ' ')} ${bin(i, 4)}`, c1, yc);
      ctx.fillStyle = '#f1f5f9'; ctx.fillText(bin8s(state.mem[i]), c2, yc);
      ctx.fillStyle = '#e2e8f0'; ctx.fillText(String(state.mem[i]).padStart(3, ' '), c3, yc);
      ctx.fillStyle = isCode ? '#c4b5fd' : '#64748b';
      ctx.fillText(isCode ? mnemonic(state.mem[i]) : (state.mem[i] ? `${T('data', 'data')} (${mnemonic(state.mem[i])})` : T('data', 'data')), c4, yc);
    }
    ctx.fillStyle = '#94a3b8'; ctx.font = `700 ${fs}px system-ui, sans-serif`;
    ctx.fillText(T('Memory (16 words)', 'Memori (16 kata)'), mx + mw - fs * 0.6 - ctx.measureText(T('Memory (16 words)', 'Memori (16 kata)')).width, hy);

    // ---- buses between CPU and memory ----
    const bx0 = cx + cw, bx1 = mx;
    const yA = cy + ch * 0.3, yD = cy + ch * 0.62;
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(251,146,60,0.55)'; ctx.beginPath(); ctx.moveTo(bx0, yA); ctx.lineTo(bx1, yA); ctx.stroke();
    ctx.strokeStyle = 'rgba(34,211,238,0.55)'; ctx.beginPath(); ctx.moveTo(bx0, yD); ctx.lineTo(bx1, yD); ctx.stroke();
    ctx.font = `${fs * 0.85}px system-ui, sans-serif`; ctx.textAlign = 'center';
    ctx.fillStyle = '#fb923c'; ctx.fillText(T('address bus', 'bus alamat'), (bx0 + bx1) / 2, yA - fs * 0.9);
    ctx.fillStyle = '#22d3ee'; ctx.fillText(T('data bus', 'bus data'), (bx0 + bx1) / 2, yD - fs * 0.9);
    for (const p of state.pulses) {
      if (p.t < 0 || p.t > 1) continue;
      const y = p.bus === 'addr' ? yA : yD;
      const x = p.dir > 0 ? bx0 + (bx1 - bx0) * p.t : bx1 - (bx1 - bx0) * p.t;
      ctx.fillStyle = p.bus === 'addr' ? '#fb923c' : '#22d3ee';
      ctx.shadowColor = ctx.fillStyle; ctx.shadowBlur = 12;
      ctx.beginPath(); ctx.arc(x, y, fs * 0.5, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#0b1220'; ctx.font = `700 ${fs * 0.75}px ui-monospace, monospace`;
      const label = p.bus === 'addr' ? String(state.mar) : (p.dir > 0 ? String(state.acc) : String(state.phase === 'decode' ? state.ir : state.mem[state.mar]));
      ctx.fillStyle = p.bus === 'addr' ? '#fb923c' : '#22d3ee';
      ctx.fillText(label, x, y - fs * 0.95);
    }
    ctx.textAlign = 'left';

    // ---- I/O devices ----
    const iy = cy + ch + H * 0.03, ih = H * 0.95 - iy, iw = (cw - fs) / 2;
    const dev = (x, label, items, hot, color, empty) => {
      ctx.fillStyle = hot ? `rgba(${color},0.18)` : '#111b2e'; ctx.strokeStyle = `rgb(${color})`; ctx.lineWidth = hot ? 2 : 1;
      ctx.beginPath(); ctx.roundRect(x, iy, iw, ih, 8); ctx.fill(); ctx.stroke();
      ctx.fillStyle = `rgb(${color})`; ctx.font = `700 ${fs * 0.9}px system-ui, sans-serif`;
      ctx.fillText(label, x + fs * 0.6, iy + fs);
      ctx.fillStyle = '#f1f5f9'; ctx.font = `${fs * 1.05}px ui-monospace, monospace`;
      const s = items.length ? items.join(', ') : empty;
      wrap(ctx, s, x + fs * 0.6, iy + fs * 2.4, iw - fs * 1.2, fs * 1.2, 2);
    };
    dev(cx, T('Input device (waiting values)', 'Perangkat masukan (nilai menunggu)'), state.inQueue, state.lastIn, '251,146,60', T('empty', 'kosong'));
    dev(cx + iw + fs, T('Output device', 'Perangkat keluaran'), state.out, state.lastOut, '52,211,153', '—');
  }

  function wrap(ctx, text, x, y, maxW, lh, maxLines) {
    const words = String(text).split(' ');
    let line = '', n = 0;
    for (const w of words) {
      const test = line ? line + ' ' + w : w;
      if (ctx.measureText(test).width > maxW && line) {
        ctx.fillText(line, x, y + n * lh); n++; line = w;
        if (n >= maxLines - 1) { line += '…'; break; }
      } else line = test;
    }
    ctx.fillText(line, x, y + n * lh);
  }

  // ---------- controls ----------
  const inputsWrap = document.createElement('div');
  inputsWrap.style.cssText = 'display:grid;gap:var(--space-2)';
  function buildInputs() {
    inputsWrap.innerHTML = '';
    state.inputVals = prog().inputs.map((i) => i.v);
    prog().inputs.forEach((inp, idx) => {
      const wrapEl = document.createElement('div'); wrapEl.className = 'ctrl';
      const lab = document.createElement('label'); lab.textContent = inp.label;
      const field = document.createElement('input');
      field.type = 'number'; field.min = 0; field.max = 255; field.step = 1; field.value = inp.v;
      field.className = 'btn'; field.style.cssText = 'width:100%;grid-column:1 / -1;font-family:var(--font-mono, monospace)';
      field.setAttribute('aria-label', inp.label);
      field.addEventListener('input', () => {
        const n = Math.round(Number(field.value));
        state.inputVals[idx] = Number.isFinite(n) ? clamp(n, 0, 255) : 0;
        loadProgram();
      });
      wrapEl.append(lab, document.createElement('span'), field);
      inputsWrap.appendChild(wrapEl);
    });
  }
  const progSel = select({
    label: 'Program', key: 'program',
    options: Object.entries(PROGRAMS).map(([k, v]) => ({ value: k, label: v.name.en })),
    value: state.progKey,
    onChange: (v) => { state.progKey = v; buildInputs(); loadProgram(); noteEl.textContent = T(prog().note.en, prog().note.id); },
  });
  const noteEl = document.createElement('p');
  noteEl.style.cssText = 'margin:0;font-size:var(--type-xs);color:var(--color-muted)';
  const speedS = slider({ label: 'Speed (phases / s)', key: 'speed', min: 0.5, max: 12, step: 0.5, value: state.speed, format: (v) => v.toFixed(1), onInput: (v) => { state.speed = v; } });
  const runB = button({
    label: 'Run', primary: true,
    onClick: () => {
      if (state.halted) loadProgram();
      state.running = !state.running;
      runB.label = state.running ? T('Pause', 'Jeda') : T('Run', 'Jalankan');
    },
  });
  const stepB = button({ label: 'Step (1 phase)', onClick: () => { if (state.halted) loadProgram(); state.running = false; runB.label = T('Run', 'Jalankan'); phaseStep(); } });
  const cycleB = button({ label: 'Step cycle', onClick: () => { if (state.halted) loadProgram(); state.running = false; runB.label = T('Run', 'Jalankan'); do { phaseStep(); } while (state.phase !== 'fetch' && !state.halted); } });
  const resetB = button({ label: 'Reset', onClick: () => loadProgram() });
  ctrlPanel.append(progSel.el, noteEl, inputsWrap, row(runB, stepB, cycleB, resetB), speedS.el);

  const lab = labPanel({
    title: 'CPU lab',
    filename: 'von-neumann-cpu-data.csv',
    columns: [
      { key: 'program', label: 'Program' },
      { key: 'inputs', label: 'Inputs' },
      { key: 'cycles', label: 'Cycles' },
      { key: 'phases', label: 'Phases' },
      { key: 'output', label: 'Output' },
      { key: 'halted', label: 'Halted?' },
    ],
    procedure: [
      'Load "Add two numbers". Predict the number of cycles, run to HALT, record.',
      'Load "Count down" with N = 2, 4, 6. Record each run. Write a formula for cycles in terms of N.',
      'Load "Multiply" with b = 1, 2, 3, 4 (keep a = 6). Record and check cycles = 8b + 5.',
      'Try Multiply with a = 100, b = 3. Record the output and explain it using 8-bit overflow.',
    ],
    predict: 'How many cycles will "Count down from N" take for N = 4? (Hint: count the instructions in one loop.)',
    source: () => {
      if (!state.cycles) return null;
      return {
        program: prog().name.en,
        inputs: prog().inputs.map((i, k) => `${i.label.split(' ')[0]}=${state.inputVals[k]}`).join(' '),
        cycles: state.cycles,
        phases: state.phases,
        output: state.out.join(' '),
        halted: state.halted ? (state.error ? 'crash' : 'yes') : 'no',
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  buildInputs();
  loadProgram();
  noteEl.textContent = T(prog().note.en, prog().note.id);

  const animator = loop((dt) => {
    if (state.running && !state.halted) {
      state.accum += dt * state.speed;
      while (state.accum >= 1 && state.running && !state.halted) { state.accum -= 1; phaseStep(); }
    } else state.accum = 0;
    const pr = Math.max(1.6, state.speed * 1.4);
    for (const p of state.pulses) p.t += dt * pr;
    state.flashAcc = Math.max(0, state.flashAcc - dt * 1.5);
    state.flashPc = Math.max(0, state.flashPc - dt * 1.5);
    state.flashIr = Math.max(0, state.flashIr - dt * 1.5);
    draw();
  });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
