// Linear vs Binary Search (PP 02 aim 4 "melakukan perbandingan algoritma", PP 02 array / pseudocode notation,
// PP 03 Bab 3 while loops and Bab 5 lists). Two real Python programs search the same row of cards: linear search
// looks at index 0, 1, 2 ... in turn; binary search looks at the middle card of the part that is left and throws the
// other half away, which only works when the cards are sorted.
//
// How it works: both programs are generated from the cards and run from start to end with minipy
// (src/lib/minipy.js); the typed target is the answer to their input() call. Every line step is kept and cut into
// "ticks": tick 0 = the set-up lines, then one tick per comparison (from the line after the previous decision up to
// the if / elif that decides), then a last tick for the loop exit and the print lines. Both searches advance one
// comparison per tick, in lockstep, so binary search finishes early. The canvas, the code highlight (Python or the
// PP 02 pseudocode, mapped line by line), the console and the counters all read the same minipy snapshots, so the
// picture always agrees with what python3 prints.
import { createCanvas, loop } from '../../../lib/canvas.js';
import { select, slider } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';
import { registerParam } from '../../../lib/params.js';
import { compile, createRun, pyRepr } from '../../../lib/minipy.js';
import { codePanel, consolePanel } from '../../../lib/codepanel.js';

// CORE-START (no DOM below this line until CORE-END: tested from node)
// Card data. NAMES_REG is the "registration order" of a school list: it starts with the PP 02 cinema row
// (Rio, Dea, Nia, Dodo) and the PP 03 piket list (Andi, Budi, Cici, Dina). A class of n students = the first n.
const NAMES_REG = ['Rio', 'Dea', 'Nia', 'Dodo', 'Andi', 'Budi', 'Cici', 'Dina', 'Gita', 'Eko', 'Sari', 'Joko', 'Putri',
  'Hana', 'Fajar', 'Wulan', 'Bayu', 'Lestari', 'Made', 'Tono', 'Indah', 'Yoga', 'Kevin', 'Zahra', 'Agus', 'Rina', 'Umar',
  'Citra', 'Oki', 'Vina', 'Galih', 'Nadia', 'Elsa', 'Ilham', 'Mega', 'Taufik', 'Ayu', 'Hendra', 'Jihan', 'Laras', 'Siti',
  'Wahyu', 'Dimas', 'Fitri', 'Rizki', 'Yusuf', 'Kartika', 'Bima', 'Intan', 'Lina', 'Nanda', 'Ratna', 'Arif', 'Gilang',
  'Hesti', 'Putu', 'Sinta', 'Tri', 'Yanti', 'Eka', 'Farhan', 'Rahmat', 'Dewi', 'Cahya'];
// Names that are on no list (for "not in the list").
const MISSING_NAMES = ['Kiki', 'Maya', 'Bagus', 'Teguh', 'Wati', 'Nurul', 'Erik', 'Leo', 'Zaki', 'Ucok'];
const N_MIN = 2;
const N_MAX = 64;

/** Small seeded PRNG (mulberry32): the same seed always gives the same cards. */
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function shuffled(arr, seed) {
  const a = arr.slice();
  const r = rng(seed);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
// Numbers 1..99 in a fixed random "arrival order"; n numbers = the first n (so a bigger n keeps the smaller set).
const NUMS_REG = shuffled(Array.from({ length: 99 }, (_, i) => i + 1), 2026);

// Python's order for these values: numbers by size, ASCII names by code point (what < does on str).
const cmpVal = (a, b) => (typeof a === 'number' ? a - b : (a < b ? -1 : a > b ? 1 : 0));
const clampN = (n) => Math.max(N_MIN, Math.min(N_MAX, Math.round(Number(n)) || N_MIN));
/**
 * The n cards in the order the program gets them. order 'sorted' = ascending (A-Z for names, small to large for
 * numbers); 'unsorted' = registration / arrival order, reshuffled when mix > 0.
 */
function makeData(kind, n, order, mix = 0) {
  const k = clampN(n);
  const base = (kind === 'numbers' ? NUMS_REG : NAMES_REG).slice(0, k);
  if (order === 'sorted') return base.slice().sort(cmpVal);
  return mix > 0 ? shuffled(base, 7919 * mix + k) : base;
}
const isSorted = (data) => data.every((v, i) => i === 0 || cmpVal(data[i - 1], v) <= 0);
/** Worst-case comparisons: linear search looks at every card; binary search at most floor(log2 n) + 1 cards. */
const worstLinear = (n) => Math.max(0, n);
const worstBinary = (n) => (n >= 1 ? 32 - Math.clz32(n) : 0);   // bit length of n = floor(log2 n) + 1 (n < 2^31)
const worstBinaryBig = (n) => (n >= 1 ? Math.floor(Math.log2(n) + 1e-12) + 1 : 0);

/** Python string literal with double quotes. */
const pyStrLit = (s) => `"${String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;

/** The list assignment, wrapped like a person would type it (lines of at most 40 characters). */
function dataLiteral(varName, kind, data) {
  const items = data.map((v) => (kind === 'numbers' ? String(v) : pyStrLit(v)));
  const one = `${varName} = [${items.join(', ')}]`;
  if (one.length <= 46) return one;
  const rows = [];
  let line = '';
  for (const it of items) {
    const next = line ? `${line} ${it},` : `    ${it},`;
    if (line && next.length > 40) { rows.push(line); line = `    ${it},`; } else line = next;
  }
  if (line) rows.push(line);
  return `${varName} = [\n${rows.join('\n')}\n]`;
}

/** Variable names of the programs (Indonesian versions use Indonesian identifiers, like the PP 03 examples). */
function varNames(lang, kind) {
  const L = (en, id) => (lang === 'id' ? id : en);
  return {
    arr: kind === 'numbers' ? L('numbers', 'angka') : L('names', 'siswa'),
    tgt: L('target', 'dicari'),
    cnt: L('comparisons', 'perbandingan'),
    fnd: L('found', 'ketemu'),
    lo: L('low', 'kiri'),
    hi: L('high', 'kanan'),
    md: L('mid', 'tengah'),
  };
}

/**
 * The program as rows of { py, ps, role }: py = Python text (may span several lines), ps = the PP 02 pseudocode
 * line it corresponds to. A row without py exists only in the pseudocode (headings, ENDIF ...), a row without ps
 * only in Python (comments, blank lines). Roles mark the lines the sim needs to find.
 */
function programRows(algo, lang, kind, data) {
  const L = (en, id) => (lang === 'id' ? id : en);
  const n = data.length;
  const sorted = isSorted(data);
  // registration / arrival order, or shuffled by the Shuffle button?
  const reg = (kind === 'numbers' ? NUMS_REG : NAMES_REG);
  const asListed = data.every((v, i) => v === reg[i]);
  const { arr, tgt, cnt, fnd, lo, hi, md } = varNames(lang, kind);
  const ty = kind === 'numbers' ? 'integer' : 'string';
  const prompt = kind === 'numbers' ? L('Number to find: ', 'Angka yang dicari: ') : L('Name to find: ', 'Nama yang dicari: ');
  const what = kind === 'numbers'
    ? (sorted ? L(`${n} numbers, sorted from small to large`, `${n} angka, urut dari kecil ke besar`)
      : asListed ? L(`${n} numbers in arrival order (NOT sorted)`, `${n} angka sesuai urutan datang (TIDAK urut)`)
        : L(`${n} numbers, shuffled (NOT sorted)`, `${n} angka yang diacak (TIDAK urut)`))
    : (sorted ? L(`${n} names, sorted A-Z`, `${n} nama siswa, urut A-Z`)
      : asListed ? L(`${n} names in registration order (NOT sorted)`, `${n} nama siswa sesuai urutan daftar (TIDAK urut)`)
        : L(`${n} names, shuffled (NOT sorted)`, `${n} nama siswa yang diacak (TIDAK urut)`));
  const rows = [];
  const R = (py, ps, role) => rows.push({ py, ps, role });
  const lin = algo === 'linear';
  R(null, lin ? L('ALGORITHM LinearSearch', 'ALGORITMA PencarianLinear') : L('ALGORITHM BinarySearch', 'ALGORITMA PencarianBiner'));
  R(null, L('DECLARATION', 'DEKLARASI'));
  R(null, `    ${arr} : array[0..n-1] of ${ty}${lin ? '' : L('   {must be sorted}', '   {harus sudah urut}')}`);
  R(null, `    ${tgt} : ${ty}`);
  R(null, lin ? `    n, i, ${cnt} : integer` : `    n, ${lo}, ${hi}, ${md}, ${cnt} : integer`);
  R(null, `    ${fnd} : boolean`);
  R(null, L('BEGIN', 'MULAI'));
  R(`# ${what}`, null);
  R(dataLiteral(arr, kind, data), `    READ ${arr}`, 'data');
  R(kind === 'numbers' ? `${tgt} = int(input("${prompt}"))` : `${tgt} = input("${prompt}")`, `    READ ${tgt}`, 'input');
  R('', null);
  R(`n = len(${arr})`, `    n ← ${L('length', 'panjang')}(${arr})`, 'n');
  if (lin) {
    R('i = 0', '    i ← 0', 'init');
  } else {
    R(`${lo} = 0`, `    ${lo} ← 0`, 'init');
    R(`${hi} = n - 1`, `    ${hi} ← n - 1`, 'init2');
  }
  R(`${cnt} = 0`, `    ${cnt} ← 0`);
  R(`${fnd} = False`, `    ${fnd} ← false`);
  if (lin) {
    R(`while i < n and not ${fnd}:`, `    WHILE i < n AND NOT ${fnd} DO`, 'loop');
    R(`    ${cnt} += 1`, `        ${cnt} ← ${cnt} + 1`, 'count');
    R(`    if ${arr}[i] == ${tgt}:`, `        IF ${arr}[i] = ${tgt} THEN`, 'cmp');
    R(`        ${fnd} = True`, `            ${fnd} ← true`, 'hit');
    R('    else:', '        ELSE');
    R('        i += 1', '            i ← i + 1', 'next');
    R(null, '        ENDIF');
  } else {
    R(`while ${lo} <= ${hi} and not ${fnd}:`, `    WHILE ${lo} <= ${hi} AND NOT ${fnd} DO`, 'loop');
    R(`    ${md} = (${lo} + ${hi}) // 2`, `        ${md} ← (${lo} + ${hi}) DIV 2`, 'mid');
    R(`    ${cnt} += 1`, `        ${cnt} ← ${cnt} + 1`, 'count');
    R(`    if ${arr}[${md}] == ${tgt}:`, `        IF ${arr}[${md}] = ${tgt} THEN`, 'cmp');
    R(`        ${fnd} = True`, `            ${fnd} ← true`, 'hit');
    R(`    elif ${arr}[${md}] < ${tgt}:`, `        ELSE IF ${arr}[${md}] < ${tgt} THEN`, 'cmp2');
    R(`        ${lo} = ${md} + 1`, `            ${lo} ← ${md} + 1`, 'right');
    R('    else:', '        ELSE');
    R(`        ${hi} = ${md} - 1`, `            ${hi} ← ${md} - 1`, 'left');
    R(null, '        ENDIF');
  }
  R(null, '    ENDWHILE');
  R('', null);
  const at = lin ? 'i' : md;
  const yes = L('found at index', 'ditemukan di indeks');
  const no = L('is not in the list', 'tidak ada di daftar');
  const tot = L('Comparisons:', 'Banyak perbandingan:');
  R(`if ${fnd}:`, `    IF ${fnd} THEN`, 'if');
  R(`    print(${tgt}, "${yes}", ${at})`, `        DISPLAY ${tgt}, "${yes}", ${at}`, 'yes');
  R('else:', '    ELSE');
  R(`    print(${tgt}, "${no}")`, `        DISPLAY ${tgt}, "${no}"`, 'no');
  R(null, '    ENDIF');
  R(`print("${tot}", ${cnt})`, `    DISPLAY "${tot}", ${cnt}`, 'total');
  R(null, L('END', 'SELESAI'));
  return rows;
}

/** The program's file name (code panel header and tracebacks). */
const fileOf = (algo, lang) => (algo === 'linear'
  ? (lang === 'id' ? 'pencarian_linear.py' : 'linear_search.py')
  : (lang === 'id' ? 'pencarian_biner.py' : 'binary_search.py'));

/** Python source, pseudocode source, line maps (1-based) and the Python line of each role. */
function buildProgram(algo, lang, kind, data) {
  const rows = programRows(algo, lang, kind, data);
  const py = [];
  const ps = [];
  const pyToPs = [0];
  const role = {};
  for (const r of rows) {
    let psLine = 0;
    if (r.ps != null) { ps.push(r.ps); psLine = ps.length; }
    if (r.py != null) {
      const first = py.length + 1;
      for (const p of r.py.split('\n')) { py.push(p); pyToPs.push(psLine); }
      if (r.role) role[r.role] = first;
    }
  }
  return {
    algo, lang, kind, data: data.slice(), names: varNames(lang, kind), file: fileOf(algo, lang),
    py: `${py.join('\n')}\n`, ps: `${ps.join('\n')}\n`, pyToPs, role,
  };
}

/** int / bool variables of the module frame (what the canvas and the counters need). */
function grabVars(run) {
  const out = {};
  const fr = run.snapshot().frames[0];
  if (fr) {
    for (const { name, value } of fr.locals) {
      if (value.type === 'int') out[name] = Number(value.repr);
      else if (value.type === 'bool') out[name] = value.repr === 'True';
    }
  }
  return out;
}

/**
 * Run one program with minipy (targetText answers its input()) and cut the line steps into ticks:
 *   tick 0          the set-up lines, up to the first loop test;
 *   one per probe   from the line after the previous decision to the if / elif that decides this comparison
 *                   (kind 'iter', probe = the index compared, outcome 'eq' | 'ne' | 'lt' | 'gt');
 *   last tick       the update after the last decision, the loop test that ends the loop, and the prints.
 * vars = the variables at the end of the tick, outEnd = console length at the end of the tick.
 */
function traceProgram(prog, targetText, opts = {}) {
  const c = compile(prog.py, { filename: prog.file || 'main.py' });
  if (!c.ok) {
    const t = { kind: 'setup', lines: [], vars: {}, outEnd: c.error.traceback.length, error: c.error };
    return { ok: false, error: c.error, ticks: [t], output: c.error.traceback, comparisons: 0, found: false, index: -1 };
  }
  const run = createRun(c.program, { inputs: [String(targetText ?? '')], echoInput: opts.echo !== false, maxSteps: 20000 });
  const steps = [];
  for (let guard = 0; guard < 100000; guard++) {
    const ev = run.step();
    if (ev.kind === 'line') steps.push({ line: ev.line, vars: grabVars(run), out: run.output.length });
    if (run.status === 'done' || run.status === 'error') break;
    if (run.status === 'waiting-input') run.provideInput(null);
  }
  const fin = { vars: grabVars(run), out: run.output.length };
  const err = run.snapshot().error || null;
  const { role, names } = prog;
  const lin = prog.algo === 'linear';
  const ticks = [];
  let cur = { kind: 'setup', lines: [], from: 0 };
  steps.forEach((s, k) => {
    if (cur.kind === 'setup' && s.line === role.loop) { ticks.push(cur); cur = { kind: 'end', lines: [], from: k }; }
    cur.lines.push(s.line);
    if (s.line === role.cmp) { cur.kind = 'iter'; cur.probe = lin ? s.vars.i : s.vars[names.md]; }
    const nx = steps[k + 1];
    const decided = (s.line === role.cmp && !(nx && nx.line === role.cmp2)) || (s.line === role.cmp2 && role.cmp2);
    if (decided) {
      cur.decision = s.line;
      ticks.push(cur);
      cur = { kind: 'end', lines: [], from: k + 1 };
    }
  });
  ticks.push(cur);
  ticks.forEach((t, j) => {
    const next = ticks[j + 1];
    const endState = next && next.from < steps.length ? steps[next.from] : fin;
    t.vars = endState.vars;
    t.outEnd = endState.out;
    if (t.kind === 'iter') {
      const after = next && steps[next.from] ? steps[next.from].line : 0;
      t.outcome = after === role.hit ? 'eq' : after === role.right ? 'lt' : after === role.left ? 'gt' : 'ne';
    }
  });
  if (err) ticks[ticks.length - 1].error = err;
  const last = ticks[ticks.length - 1];
  const found = !!last.vars[names.fnd];
  return {
    ok: !err,
    error: err,
    ticks,
    output: run.output,
    comparisons: last.vars[names.cnt] ?? 0,
    found,
    index: found ? (lin ? last.vars.i : last.vars[names.md]) : -1,
  };
}
// CORE-END

// ---------------------------------------------------------------------------------------------------------------
const CSS = `
.lbs { container-type: inline-size; container-name: lbs; padding: 12px; min-width: 0; display: flex; flex-direction: column; gap: 12px; }
.lbs *, .lbs *::before, .lbs *::after, .lbs-ctl * { box-sizing: border-box; }
.lbs [hidden], .lbs-ctl [hidden] { display: none !important; }
.lbs-cv { position: relative; height: 240px; border: 1px solid #1e2a44; border-radius: 10px; overflow: hidden; background: #0b1220; }
.lbs-cv canvas { display: block; cursor: pointer; }
.lbs-sr { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }
.lbs-legend { display: flex; flex-wrap: wrap; gap: 4px 14px; margin: -4px 2px 0; font-size: 12.5px; color: var(--color-muted); line-height: 1.4; }
.lbs-legend span { display: inline-flex; align-items: center; gap: 5px; white-space: nowrap; }
.lbs-legend i { display: inline-block; width: 14px; height: 11px; border-radius: 3px; border: 2px solid; flex: none; }
.lbs-legend b { color: #f59e0b; font-weight: 700; }

.lbs-bar { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px; }
.lbs-btns { display: flex; flex-wrap: wrap; gap: 6px; }
.lbs-btns .btn { min-height: 38px; padding: 7px 11px; white-space: nowrap; }
.lbs-btns .btn:disabled, .lbs-btns .btn[aria-disabled="true"] { opacity: .45; cursor: not-allowed; }
.lbs .btn:focus-visible, .lbs-tab:focus-visible, .lbs-ctl .btn:focus-visible, .lbs-in:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--accent, var(--color-accent)) 55%, transparent); outline-offset: 2px; }
.lbs-status { flex: 1 1 220px; margin: 0; font-size: 13px; line-height: 1.4; color: var(--color-muted); }
.lbs-status b { color: var(--color-fg); }

.lbs-info { display: grid; gap: 6px; min-width: 0; padding: 9px 12px 10px; border: 1px solid var(--color-border); border-radius: 10px;
  background: color-mix(in srgb, var(--color-fg) 3%, var(--color-surface)); font-size: 14px; line-height: 1.5; color: var(--color-fg); }
.lbs-info p { margin: 0; overflow-wrap: anywhere; padding-left: 10px; border-left: 4px solid var(--lbs-c, var(--color-border)); }
.lbs-info p.lin { --lbs-c: #ea580c; }
.lbs-info p.bin { --lbs-c: #0d9488; }
.lbs-info p.sum { --lbs-c: var(--accent, var(--color-accent)); font-weight: 600; }
.lbs-info p.bad { --lbs-c: var(--color-danger, #dc2626); }
.lbs-info b.lin { color: #c2410c; }
.lbs-info b.bin { color: #0f766e; }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .lbs-info b.lin { color: #fdba74; } :root:not([data-theme="light"]) .lbs-info b.bin { color: #5eead4; } }
:root[data-theme="dark"] .lbs-info b.lin { color: #fdba74; }
:root[data-theme="dark"] .lbs-info b.bin { color: #5eead4; }
.lbs-info code { font: 13px var(--font-mono, ui-monospace, monospace); padding: 0 3px; border-radius: 4px; background: color-mix(in srgb, var(--color-fg) 7%, transparent); }

.lbs-tabs { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 8px; }
.lbs-tabs-h { font-size: 13px; font-weight: 600; color: var(--color-muted); margin-right: 2px; }
.lbs-tab { min-height: 34px; padding: 5px 12px; border: 1px solid var(--color-border); border-radius: 8px; background: var(--color-surface-2);
  color: var(--color-fg); font: 600 13px/1.2 system-ui, sans-serif; cursor: pointer; white-space: nowrap; }
.lbs-tab[aria-pressed="true"] { background: var(--accent, var(--color-accent)); border-color: transparent; color: #fff; }

.lbs-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 12px; min-width: 0; }
@container lbs (min-width: 700px) { .lbs-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: start; } }
.lbs-col { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
.lbs-col-h { margin: 0; display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 700; color: var(--color-fg); }
.lbs-col-h::before { content: ""; width: 12px; height: 12px; border-radius: 3px; background: var(--lbs-c); flex: none; }
.lbs-col.lin { --lbs-c: #f97316; }
.lbs-col.bin { --lbs-c: #14b8a6; }
.lbs-count { font: 600 12px/1.2 var(--font-mono, ui-monospace, monospace); color: #e2e8f0; padding: 2px 8px; border-radius: 999px; border: 1px solid #334155; white-space: nowrap; }

.lbs-chartbox { display: grid; grid-template-columns: minmax(0, 1fr); gap: 6px; min-width: 0; }
.lbs-chart-h { margin: 0; font-size: 14px; font-weight: 700; color: var(--color-fg); }
.lbs-chartw { position: relative; height: 230px; border: 1px solid #1e2a44; border-radius: 10px; overflow: hidden; background: #0b1220; }
.lbs-chartw canvas { display: block; }
.lbs-cap { margin: 0; font-size: 13px; color: var(--color-muted); line-height: 1.45; }
.lbs-big { justify-self: start; width: auto; max-width: 100%; border-collapse: collapse; font-size: 13px; color: var(--color-fg); }
.lbs-big caption { text-align: left; font-size: 12.5px; color: var(--color-muted); padding-bottom: 3px; }
.lbs-big th, .lbs-big td { padding: 3px 10px; border-bottom: 1px solid var(--color-border); text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
.lbs-big th:first-child, .lbs-big td:first-child { text-align: left; padding-left: 0; white-space: normal; }
.lbs-big small { display: block; font-weight: 400; color: var(--color-muted); }
.lbs-big thead th { font-weight: 600; color: var(--color-muted); }

.lbs-ctl .lbs-tgt { display: grid; gap: 6px; min-width: 0; }
.lbs-ctl .lbs-tgt > label { font-size: 13px; font-weight: 600; color: var(--color-fg); }
.lbs-ctl .lbs-trow { display: flex; gap: 6px; min-width: 0; }
.lbs-in { flex: 1 1 auto; width: auto; min-width: 0; min-height: 38px; padding: 5px 9px; border: 1px solid var(--color-border); border-radius: 8px;
  background: var(--color-surface); color: var(--color-fg); font: 15px var(--font-mono, ui-monospace, monospace); }
.lbs-ctl .lbs-quick { display: flex; flex-wrap: wrap; gap: 6px; }
.lbs-ctl .lbs-quick .btn, .lbs-ctl .lbs-orow .btn { min-height: 34px; padding: 4px 10px; font-size: 13px; white-space: nowrap; }
.lbs-ctl .lbs-orow { display: flex; flex-wrap: wrap; gap: 6px; }
.lbs-ctl .lbs-note { margin: 0; font-size: 12.5px; color: var(--color-muted); line-height: 1.45; }
.lbs-ctl .lbs-msg { margin: 0; font-size: 12.5px; line-height: 1.4; color: var(--color-danger, #dc2626); }
`;

// Canvas colours (always the dark canvas style).
const COL = {
  bg: '#0b1220', lane: '#0f172a', laneEdge: '#1e2a44',
  lin: '#fb923c', bin: '#2dd4bf',
  card: '#1e293b', cardEdge: '#475569', text: '#e2e8f0',
  dim: '#111827', dimEdge: '#1f2937', dimText: '#56627a',
  cur: '#3b2a06', curEdge: '#fbbf24', curText: '#fde68a',
  hit: '#064e3b', hitEdge: '#22c55e', hitText: '#bbf7d0',
  drop: 'rgba(248,113,113,0.16)', bad: '#f87171',
  idx: '#64748b', muted: '#94a3b8', star: '#facc15',
  tagI: '#fbbf24', tagMid: '#fbbf24', tagLo: '#38bdf8', tagHi: '#c4b5fd',
};

// ---------------------------------------------------------------------------------------------------------------
export function mount(rootEl) {
  const lang = getLocale() === 'id' ? 'id' : 'en';
  const T = (en, id) => (lang === 'id' ? id : en);
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const plain = (h) => h.replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
  const fmtN = (x) => Number(x).toLocaleString(lang === 'id' ? 'id-ID' : 'en-US');
  const narrow = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 600px)').matches;
  const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const uid = (p) => `lbs-${p}-${Math.random().toString(36).slice(2, 8)}`;
  const mkBtn = (label, cls, fn, aria) => {
    const b = el('button', `btn${cls ? ` ${cls}` : ''}`, label);
    b.type = 'button';
    if (aria) b.setAttribute('aria-label', aria);
    b.addEventListener('click', fn);
    return b;
  };

  const style = document.createElement('style');
  style.textContent = CSS;
  rootEl.appendChild(style);
  const main = el('div', 'lbs');
  rootEl.appendChild(main);
  const ctrlPanel = el('div', 'sim-controls lbs-ctl');
  rootEl.appendChild(ctrlPanel);

  // ---- canvas: the two searches ----
  const cvWrap = el('div', 'lbs-cv');
  main.appendChild(cvWrap);
  const cv = createCanvas(cvWrap);
  cv.canvas.setAttribute('role', 'img');
  const legend = el('div', 'lbs-legend');
  legend.innerHTML = [
    [COL.curEdge, COL.cur, T('being compared', 'sedang dibandingkan')],
    [COL.hitEdge, COL.hit, T('found', 'ketemu')],
    [COL.dimEdge, COL.dim, T('ruled out', 'sudah dicoret')],
    ['#f87171', 'rgba(248,113,113,0.25)', T('about to be thrown away', 'akan dibuang')],
  ].map(([b, f, t]) => `<span><i style="border-color:${b};background:${f}"></i>${esc(t)}</span>`).join('')
    + `<span><b aria-hidden="true">★</b>${esc(T('where the target really is (the search does not know)', 'letak target sebenarnya (pencarian tidak tahu)'))}</span>`;
  main.appendChild(legend);

  // ---- transport bar ----
  const bar = el('div', 'lbs-bar');
  bar.setAttribute('role', 'group');
  bar.setAttribute('aria-label', T('Run both searches', 'Jalankan kedua pencarian'));
  const btns = el('div', 'lbs-btns');
  // Back / Step / End / Reset are switched off with aria-disabled (not `disabled`), so a keyboard user keeps the focus
  // on the button: an extra Enter on Step at the end does nothing instead of landing on Play and replaying from 0.
  const isOff = (b) => b.getAttribute('aria-disabled') === 'true';
  const setOff = (b, off) => b.setAttribute('aria-disabled', String(!!off));
  const bBack = mkBtn(T('◀ Back', '◀ Mundur'), '', () => { if (isOff(bBack)) return; stopPlay(); goTo(t - 1, true); }, T('Back one comparison', 'Mundur satu perbandingan'));
  const bStep = mkBtn(T('Step ▶', 'Langkah ▶'), '', () => { if (isOff(bStep)) return; stopPlay(); goTo(t + 1, true); }, T('Step: one more comparison in each search', 'Langkah: satu perbandingan lagi di setiap pencarian'));
  const bPlay = mkBtn(T('▶ Play', '▶ Putar'), 'btn--primary', () => togglePlay());
  const bEnd = mkBtn(T('⏭ End', '⏭ Akhir'), '', () => { if (isOff(bEnd)) return; stopPlay(); goTo(T_ - 1, true); }, T('End: jump to the end of both searches', 'Akhir: lompat ke akhir kedua pencarian'));
  const bReset = mkBtn(T('⟲ Reset', '⟲ Ulang'), '', () => { if (isOff(bReset)) return; stopPlay(); goTo(0, true); }, T('Reset: back to the start', 'Ulang: kembali ke awal'));
  btns.append(bBack, bStep, bPlay, bEnd, bReset);
  const status = el('p', 'lbs-status');
  bar.append(btns, status);
  main.appendChild(bar);

  // ---- what happened ----
  const info = el('section', 'lbs-info');
  info.setAttribute('aria-label', T('What the last comparison did', 'Apa yang dilakukan perbandingan terakhir'));
  main.appendChild(info);
  const live = el('div', 'lbs-sr');
  live.setAttribute('aria-live', 'polite');
  main.appendChild(live);

  // ---- notation toggle + code ----
  const tabs = el('div', 'lbs-tabs');
  tabs.setAttribute('role', 'group');
  tabs.setAttribute('aria-label', T('Show the algorithms as', 'Tampilkan algoritma sebagai'));
  tabs.appendChild(el('span', 'lbs-tabs-h', T('Show as:', 'Tampilkan:')));
  const tabPy = el('button', 'lbs-tab', 'Python');
  const tabPs = el('button', 'lbs-tab', 'Pseudocode');
  for (const [b, v] of [[tabPy, 'python'], [tabPs, 'pseudo']]) {
    b.type = 'button';
    b.addEventListener('click', () => setNotation(v));
    tabs.appendChild(b);
  }
  main.appendChild(tabs);

  const grid = el('div', 'lbs-grid');
  main.appendChild(grid);
  const lanes = {};
  // the code panel's header names what it shows: the Python file, or the PP 02 algorithm in pseudocode
  const panelTitle = (algo, ps) => (!ps ? fileOf(algo, lang)
    : algo === 'linear' ? T('ALGORITHM LinearSearch', 'ALGORITMA PencarianLinear') : T('ALGORITHM BinarySearch', 'ALGORITMA PencarianBiner'));
  for (const algo of ['linear', 'binary']) {
    const col = el('section', `lbs-col ${algo === 'linear' ? 'lin' : 'bin'}`);
    const title = algo === 'linear' ? T('Linear search', 'Pencarian linear') : T('Binary search', 'Pencarian biner');
    col.setAttribute('aria-label', title);
    col.appendChild(el('h3', 'lbs-col-h', title));
    const cp = codePanel({
      value: '', language: 'python', editable: false, minLines: narrow ? 8 : 12, maxLines: narrow ? 14 : 18, locale: lang,
      title: panelTitle(algo, false),
      ariaLabel: algo === 'linear'
        ? T('Linear search program; the highlighted line is the comparison just made', 'Program pencarian linear; baris yang disorot adalah perbandingan yang baru dilakukan')
        : T('Binary search program; the highlighted line is the comparison just made', 'Program pencarian biner; baris yang disorot adalah perbandingan yang baru dilakukan'),
    });
    const count = el('span', 'lbs-count', '0');
    if (cp.actions) cp.actions.appendChild(count);
    col.appendChild(cp.el);
    const out = consolePanel({
      minLines: 3, maxLines: 6, locale: lang, title: T('Output', 'Keluaran'),
      ariaLabel: algo === 'linear' ? T('Output of linear search', 'Keluaran pencarian linear') : T('Output of binary search', 'Keluaran pencarian biner'),
    });
    col.appendChild(out.el);
    grid.appendChild(col);
    lanes[algo] = { algo, cp, out, count, prog: null, tr: null, tags: new Map() };
  }

  // ---- chart ----
  const chartBox = el('section', 'lbs-chartbox');
  chartBox.setAttribute('aria-label', T('Chart of worst-case comparisons', 'Grafik perbandingan kasus terburuk'));
  chartBox.appendChild(el('h3', 'lbs-chart-h', T('Worst case: how many comparisons for n cards?', 'Kasus terburuk: berapa perbandingan untuk n kartu?')));
  const chartW = el('div', 'lbs-chartw');
  chartBox.appendChild(chartW);
  const chart = createCanvas(chartW);
  chart.canvas.setAttribute('role', 'img');
  const chartCap = el('p', 'lbs-cap');
  chartBox.appendChild(chartCap);
  const bigT = el('table', 'lbs-big');
  chartBox.appendChild(bigT);
  main.appendChild(chartBox);
  {
    const rowsBig = [[10, ''], [100, ''], [1000, ''], [1e6, ''], [2.8e8, T('≈ people in Indonesia', '≈ penduduk Indonesia')]];
    bigT.innerHTML = `<caption>${esc(T('Worst case for bigger lists (same formulas):', 'Kasus terburuk untuk daftar yang lebih besar (rumus yang sama):'))}</caption>`
      + `<thead><tr><th scope="col">n</th><th scope="col">${esc(T('linear', 'linear'))}</th><th scope="col">${esc(T('binary', 'biner'))}</th></tr></thead><tbody>`
      + rowsBig.map(([n, note]) => `<tr><th scope="row">${fmtN(n)}${note ? `<small>${esc(note)}</small>` : ''}</th><td>${fmtN(worstLinear(n))}</td><td>${fmtN(worstBinaryBig(n))}</td></tr>`).join('')
      + '</tbody>';
  }

  // ------------------------------------------------------------------------------------------------------------
  // Controls
  // ------------------------------------------------------------------------------------------------------------
  const SCEN = [
    { key: 'class16', name: T('Find Putri among 16 names', 'Cari Putri di antara 16 nama'), kind: 'names', n: 16, order: 'sorted', target: () => 'Putri' },
    { key: 'best', name: T('Best case for binary: the middle card', 'Kasus terbaik biner: kartu tengah'), kind: 'names', n: 16, order: 'sorted', target: (d) => String(d[(d.length - 1) >> 1]) },
    { key: 'worst64', name: T('Worst case: last of 64 numbers', 'Kasus terburuk: angka ke-64 dari 64'), kind: 'numbers', n: 64, order: 'sorted', target: (d) => String(d[d.length - 1]) },
    { key: 'missing', name: T('Not in the list: Kiki (32 names)', 'Tidak ada di daftar: Kiki (32 nama)'), kind: 'names', n: 32, order: 'sorted', target: () => 'Kiki' },
    { key: 'unsorted', name: T('Trap: binary search, unsorted names', 'Jebakan: biner pada nama tidak urut'), kind: 'names', n: 16, order: 'unsorted', target: (d) => firstMissed(d) },
    { key: 'custom', name: T('— your own settings —', '— pengaturan sendiri —') },
  ];
  const scenSel = select({
    label: T('Scenario', 'Skenario'), key: 'scenario',
    options: SCEN.map((s) => ({ value: s.key, label: s.name })), value: 'class16',
    onChange: (v) => applyScenario(v),
  });
  ctrlPanel.appendChild(scenSel.el);

  const kindSel = select({
    label: T('Cards', 'Kartu'), key: 'cards',
    options: [{ value: 'names', label: T('Student names', 'Nama siswa') }, { value: 'numbers', label: T('Numbers 1–99', 'Angka 1–99') }],
    value: 'names',
    // (a value that is already set changes nothing, so a copied link of a preset re-opens as that preset)
    onChange: (v) => { if (v === state.kind) return; custom(); setKind(v); },
  });
  ctrlPanel.appendChild(kindSel.el);
  const nSl = slider({
    label: T('Number of cards n', 'Banyak kartu n'), key: 'n', min: N_MIN, max: N_MAX, step: 1, value: 16,
    onInput: (v) => { const k = clampN(v); if (k === state.n) return; custom(); state.n = k; rebuild(); },
  });
  ctrlPanel.appendChild(nSl.el);
  const orderSel = select({
    label: T('Order of the cards', 'Urutan kartu'), key: 'order',
    options: [{ value: 'sorted', label: T('Sorted (A–Z, small → large)', 'Urut (A–Z, kecil → besar)') }, { value: 'unsorted', label: T('Not sorted', 'Tidak urut') }],
    value: 'sorted',
    // "Not sorted" from this list = the registration / arrival order; Shuffle makes other unsorted orders
    onChange: (v) => {
      const o = v === 'unsorted' ? 'unsorted' : 'sorted';
      if (o === state.order && (o === 'sorted' || state.mix === 0)) return;
      custom();
      state.mix = 0;
      setOrder(o, true);
    },
  });
  ctrlPanel.appendChild(orderSel.el);
  const orow = el('div', 'lbs-orow');
  const bShuffle = mkBtn(T('🔀 Shuffle', '🔀 Acak'), '', () => { custom(); state.mix++; setOrder('unsorted', true); }, T('Shuffle the cards into a new unsorted order', 'Acak kartu ke urutan baru yang tidak urut'));
  const bSort = mkBtn(T('↕ Sort the cards', '↕ Urutkan kartu'), '', () => { custom(); setOrder('sorted', true); }, T('Sort the cards (needed for binary search)', 'Urutkan kartu (syarat pencarian biner)'));
  orow.append(bShuffle, bSort);
  ctrlPanel.appendChild(orow);
  // the shuffle number, so that a copied link brings back the same shuffled order (registered after "order")
  registerParam('mix', {
    get: () => state.mix,
    set: (v) => {
      const m = Math.max(0, Math.min(1e6, Math.floor(Number(v)) || 0));
      if (m === state.mix) return;
      state.mix = m;
      if (state.order === 'unsorted') { custom(); rebuild(); }
    },
    initial: 0,
  });

  // target box
  const tgtBox = el('div', 'lbs-tgt');
  const tgtId = uid('tgt');
  const tgtLab = el('label', null, T('Target (what input() receives)', 'Target (yang diterima input())'));
  tgtLab.htmlFor = tgtId;
  const trow = el('div', 'lbs-trow');
  const tgtIn = el('input', 'lbs-in');
  tgtIn.id = tgtId;
  tgtIn.type = 'text';
  tgtIn.spellcheck = false;
  tgtIn.autocomplete = 'off';
  tgtIn.setAttribute('autocapitalize', 'off');
  const dl = el('datalist');
  dl.id = uid('vals');
  tgtIn.setAttribute('list', dl.id);
  const bGo = mkBtn(T('Search', 'Cari'), 'btn--primary', () => { custom(); setTarget(tgtIn.value, true); });
  tgtIn.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); custom(); setTarget(tgtIn.value, true); } });
  trow.append(tgtIn, bGo);
  const quick = el('div', 'lbs-quick');
  quick.setAttribute('role', 'group');
  quick.setAttribute('aria-label', T('Pick a target', 'Pilih target'));
  const pickAndGo = (fn) => () => { custom(); setTarget(fn(), true); };
  quick.append(
    mkBtn(T('First card', 'Kartu pertama'), '', pickAndGo(() => String(state.data[0]))),
    mkBtn(T('Middle card', 'Kartu tengah'), '', pickAndGo(() => String(state.data[(state.data.length - 1) >> 1]))),
    mkBtn(T('Last card', 'Kartu terakhir'), '', pickAndGo(() => String(state.data[state.data.length - 1]))),
    mkBtn(T('Random card', 'Kartu acak'), '', pickAndGo(() => String(state.data[Math.floor(Math.random() * state.data.length)]))),
    mkBtn(T('Not in the list', 'Tidak ada di daftar'), '', pickAndGo(() => missingValue())),
  );
  const tgtMsg = el('p', 'lbs-msg');
  tgtMsg.hidden = true;
  tgtBox.append(tgtLab, trow, dl, quick, tgtMsg);
  ctrlPanel.appendChild(tgtBox);
  ctrlPanel.appendChild(el('p', 'lbs-note', T('Tip: you can also click a card on the picture to search for it.', 'Tips: kamu juga bisa mengeklik kartu pada gambar untuk mencarinya.')));

  const SPEEDS = [0.5, 1, 2, 4, 8];
  const speedSl = slider({
    label: T('Play speed', 'Kecepatan putar'), key: 'speed', min: 1, max: 5, step: 1, value: 2,
    format: (v) => ['½×', '1×', '2×', '4×', '8×'][v - 1],
    onInput: (v) => { state.speed = SPEEDS[v - 1] || 1; },
  });
  ctrlPanel.appendChild(speedSl.el);
  const chartSel = select({
    label: T('Chart range', 'Rentang grafik'), key: 'chart',
    options: [{ value: '64', label: T('n up to 64', 'n sampai 64') }, { value: '1024', label: T('n up to 1,024', 'n sampai 1.024') }],
    value: '64',
    onChange: (v) => { state.chartMax = v === '1024' ? 1024 : 64; chartDirty = true; updateChartCap(); },
  });
  ctrlPanel.appendChild(chartSel.el);

  const lab = labPanel({
    title: 'Search comparison lab',
    filename: 'linear-binary-search-data.csv',
    columns: [
      { key: 'n', label: 'n' },
      { key: 'order', label: 'Order' },
      { key: 'target', label: 'Target' },
      { key: 'lin', label: 'Linear comparisons' },
      { key: 'bin', label: 'Binary comparisons' },
      { key: 'result', label: 'Binary result' },
    ],
    procedure: [
      'Choose "Numbers 1-99", keep the cards sorted and set n = 8. Press "Last card", then "End". Record the row.',
      'Repeat with n = 16, 32 and 64 (always the last card). Record each row.',
      'At n = 64 press "Not in the list" and record. Is it more or less work than the last card?',
      'Look at the Binary column: what happens to it each time n doubles? Compare your rows with the chart (floor(log2 n) + 1).',
      'Choose "Not sorted", search for a few cards and record a row where binary search misses a card that is there.',
    ],
    predict: 'A sorted list of 64 numbers: how many comparisons does linear search need for the last number? Binary search? Guess the answers for 128 numbers too.',
    source: () => labRecord(),
  });
  ctrlPanel.appendChild(lab.el);

  // ------------------------------------------------------------------------------------------------------------
  // State
  // ------------------------------------------------------------------------------------------------------------
  const state = { kind: 'names', n: 16, order: 'sorted', mix: 0, target: 'Putri', data: [], speed: 1, chartMax: 64, notation: 'python', scenario: 'class16' };
  let t = 0;
  let T_ = 1;
  let playing = false;
  let playAcc = 0;
  let dirty = true;
  let chartDirty = true;
  let lastW = 0;
  let lastH = 0;
  let lastCW = 0;
  let lastCH = 0;
  let L = null;                       // canvas layout
  let cards = new Map();              // value -> { c, r, tc, tr } (column / row, animated)
  let labSig = '';
  let labTimer = 0;
  let missIx = 0;

  const valRepr = (v) => (typeof v === 'number' ? String(v) : pyRepr(String(v)));
  /** The target as Python sees it after input() (and int() for numbers), or null when that failed. */
  function targetValue() {
    if (state.kind === 'numbers') {
      const tr = lanes.linear.tr;
      const v = tr && tr.ticks[0] && tr.ticks[0].vars[lanes.linear.prog.names.tgt];
      return typeof v === 'number' ? v : null;
    }
    return state.target;
  }
  const targetRepr = () => { const v = targetValue(); return v == null ? pyRepr(state.target) : valRepr(v); };
  const targetIndex = () => { const v = targetValue(); return v == null ? -1 : state.data.indexOf(v); };

  /** First card (from the left) that binary search cannot find in this order (for the "trap" scenario). */
  function firstMissed(data) {
    for (const v of data) {
      let lo = 0; let hi = data.length - 1; let f = false;
      while (lo <= hi && !f) { const m = (lo + hi) >> 1; const c = cmpVal(data[m], v); if (c === 0) f = true; else if (c < 0) lo = m + 1; else hi = m - 1; }
      if (!f) return String(v);
    }
    return String(data[0]);
  }
  function missingValue() {
    if (state.kind === 'names') {
      const pool = MISSING_NAMES.filter((m) => !state.data.includes(m));
      const v = pool[missIx % pool.length];
      missIx++;
      return v;
    }
    const absent = [];
    for (let v = 1; v <= 99; v++) if (!state.data.includes(v)) absent.push(v);
    return String(absent.length ? absent[Math.floor(Math.random() * absent.length)] : 100);
  }

  // ------------------------------------------------------------------------------------------------------------
  // Rebuild: cards -> programs -> minipy traces
  // ------------------------------------------------------------------------------------------------------------
  function rebuild(opts = {}) {
    stopPlay();
    const old = state.data;
    state.data = makeData(state.kind, state.n, state.order, state.mix);
    const sameSet = old.length === state.data.length && old.every((v) => state.data.includes(v));
    if (!(opts.animate && sameSet)) cards = new Map();
    for (const algo of ['linear', 'binary']) {
      const ln = lanes[algo];
      ln.prog = buildProgram(algo, lang, state.kind, state.data);
      ln.tr = traceProgram(ln.prog, state.target);
      ln.tags.clear();
    }
    T_ = Math.max(lanes.linear.tr.ticks.length, lanes.binary.tr.ticks.length);
    t = 0;
    tgtIn.value = state.target;
    dl.innerHTML = '';
    const sugg = state.data.slice().sort(cmpVal).map(String);
    for (const s of sugg) { const o = document.createElement('option'); o.value = s; dl.appendChild(o); }
    const err = lanes.linear.tr.error;
    tgtMsg.hidden = !err;
    if (err) tgtMsg.textContent = T(`The programs stopped: ${err.type}. Type a whole number such as 42.`, `Program berhenti: ${err.type}. Ketik bilangan bulat, misalnya 42.`);
    for (const ln of Object.values(lanes)) setCode(ln, true);
    L = null;
    dirty = true;
    chartDirty = true;
    render(false);
    updateChartCap();
  }

  function setKind(k) {
    if (k !== 'names' && k !== 'numbers') return;
    state.kind = k;
    const d = makeData(k, state.n, 'sorted');
    state.target = String(d[Math.min(d.length - 1, Math.floor(d.length * 0.75))]);
    rebuild();
  }
  function setOrder(o, animate) {
    state.order = o;
    orderSel.value = o;
    rebuild({ animate });
  }
  function setTarget(v, announceIt) {
    state.target = String(v ?? '').replace(/[\r\n]+/g, ' ');
    rebuild();
    if (announceIt) announce(T(`Target ${state.target}. Predict how many comparisons each search needs, then press Play.`, `Target ${state.target}. Tebak berapa perbandingan yang dibutuhkan setiap pencarian, lalu tekan Putar.`));
  }
  function custom() {
    if (state.scenario !== 'custom') { state.scenario = 'custom'; scenSel.value = 'custom'; }
  }
  function applyScenario(key) {
    const s = SCEN.find((x) => x.key === key);
    if (!s) return;
    state.scenario = key;
    if (!s.kind) return;            // "your own settings": keep everything
    state.kind = s.kind; kindSel.value = s.kind;
    state.n = s.n; nSl.value = s.n;
    state.order = s.order; orderSel.value = s.order;
    state.mix = 0;
    state.target = s.target(makeData(s.kind, s.n, s.order, 0));
    rebuild();
    announce(s.name);
  }
  function setNotation(v) {
    state.notation = v === 'pseudo' ? 'pseudo' : 'python';
    tabPy.setAttribute('aria-pressed', String(state.notation === 'python'));
    tabPs.setAttribute('aria-pressed', String(state.notation === 'pseudo'));
    for (const ln of Object.values(lanes)) if (ln.prog) setCode(ln, true);
  }
  registerParam('target', {
    get: () => state.target,
    set: (v) => { if (String(v ?? '').replace(/[\r\n]+/g, ' ') === state.target) return; custom(); setTarget(v, false); },
    initial: 'Putri',
  });
  registerParam('code', { get: () => state.notation, set: (v) => setNotation(String(v)), initial: 'python' });

  // ------------------------------------------------------------------------------------------------------------
  // Ticks -> code panels, consoles, info text
  // ------------------------------------------------------------------------------------------------------------
  const laneTick = (ln) => { const k = Math.min(t, ln.tr.ticks.length - 1); return { k, tick: ln.tr.ticks[k], done: k === ln.tr.ticks.length - 1 }; };
  const cmpCount = (ln) => { const { tick } = laneTick(ln); return tick.vars[ln.prog.names.cnt] ?? 0; };

  /** Short note for the deciding line: Python operators, or the PP 02 ones (=, ≠, ←) for the pseudocode. */
  function noteFor(ln, tick, ps = false) {
    const { arr, lo, hi } = ln.prog.names;
    const v = valRepr(state.data[tick.probe]);
    const tv = targetRepr();
    const set = ps ? '←' : '=';
    if (tick.outcome === 'eq') return `${v} ${ps ? '=' : '=='} ${tv} ✓`;
    if (tick.outcome === 'ne') return `${v} ${ps ? '≠' : '!='} ${tv}`;
    if (tick.outcome === 'lt') return `${v} < ${tv} → ${lo} ${set} ${tick.probe + 1}`;
    if (tick.outcome === 'gt') return `${v} > ${tv} → ${hi} ${set} ${tick.probe - 1}`;
    return `${arr}[${tick.probe}]`;
  }

  function setCode(ln, valueChanged) {
    const ps = state.notation === 'pseudo';
    if (valueChanged) {
      ln.cp.setLanguage(ps ? 'pseudo' : 'python');
      ln.cp.title = panelTitle(ln.algo, ps);
      ln.cp.value = ps ? ln.prog.ps : ln.prog.py;
    }
    const { tick, done } = laneTick(ln);
    const map = (l) => (ps ? ln.prog.pyToPs[l] || 0 : l);
    const marks = new Map();
    for (const l of tick.lines) { const m = map(l); if (m) marks.set(m, { line: m, kind: 'visited' }); }
    let active = tick.lines.length ? map(tick.lines[tick.lines.length - 1]) : null;
    if (tick.kind === 'iter') {
      const m = map(tick.decision);
      active = m;
      if (m) marks.set(m, { line: m, kind: tick.outcome === 'eq' ? 'match' : 'visited', note: noteFor(ln, tick, ps) });
    }
    if (done && !tick.error) {
      const r = ln.prog.role;
      const resLine = map(ln.tr.found ? r.yes : r.no);
      const missed = !ln.tr.found && targetIndex() >= 0;
      if (resLine) marks.set(resLine, { line: resLine, kind: missed ? 'error' : 'done', note: missed ? T(`but it is at index ${targetIndex()}!`, `padahal ada di indeks ${targetIndex()}!`) : undefined });
    }
    if (tick.error) {
      const m = map(tick.error.line);
      if (m) { marks.set(m, { line: m, kind: 'error', note: tick.error.type }); active = m; }
    }
    ln.cp.setMarks([...marks.values()]);
    ln.cp.setActiveLine(active || null);
    // console
    const text = ln.tr.output.slice(0, tick.outEnd);
    ln.out.set(text, { inputs: [state.target], error: tick.error && done ? tick.error.traceback : undefined });
    ln.count.textContent = `${ln.prog.names.cnt} = ${cmpCount(ln)}`;
  }

  function laneSentence(ln) {
    const { tick, done } = laneTick(ln);
    const nm = ln.prog.names;
    const lin = ln.algo === 'linear';
    const head = `<b class="${lin ? 'lin' : 'bin'}">${esc(lin ? T('Linear', 'Linear') : T('Binary', 'Biner'))}</b>`;
    const c = (s) => `<code>${esc(s)}</code>`;
    const tv = targetRepr();
    if (tick.error) return { cls: 'bad', html: `${head}: ${esc(T(`stopped with ${tick.error.type} on line ${tick.error.line}: ${tick.error.message}`, `berhenti dengan ${tick.error.type} di baris ${tick.error.line}: ${tick.error.message}`))}` };
    if (tick.kind === 'setup') {
      return {
        cls: lin ? 'lin' : 'bin',
        html: lin
          ? `${head}: ${esc(T('starts at the front with', 'mulai dari depan dengan'))} ${c('i = 0')}. ${esc(T(`At most ${state.data.length} comparisons.`, `Paling banyak ${state.data.length} perbandingan.`))}`
          : `${head}: ${esc(T('the whole list is still possible:', 'seluruh daftar masih mungkin:'))} ${c(`${nm.lo} = 0`)}, ${c(`${nm.hi} = ${state.data.length - 1}`)}. ${esc(T(`At most ${worstBinary(state.data.length)} comparisons, but the answer is only right if the cards are sorted.`, `Paling banyak ${worstBinary(state.data.length)} perbandingan, tetapi jawabannya hanya benar jika kartu sudah urut.`))}${isSorted(state.data) ? '' : ` <b>${esc(T('⚠ These cards are NOT sorted!', '⚠ Kartu-kartu ini TIDAK urut!'))}</b>`}`,
      };
    }
    if (tick.kind === 'iter') {
      const k = tick.vars[nm.cnt];
      const v = valRepr(state.data[tick.probe]);
      const no = `#${k}: `;
      if (lin) {
        return {
          cls: 'lin',
          html: tick.outcome === 'eq'
            ? `${head} ${no}${c(`${nm.arr}[${tick.probe}]`)} ${esc(T('is', 'berisi'))} ${c(v)} — ${esc(T('found it!', 'ketemu!'))}`
            : `${head} ${no}${c(`${nm.arr}[${tick.probe}]`)} ${esc(T('is', 'berisi'))} ${c(v)}, ${esc(T('not', 'bukan'))} ${c(tv)} → ${esc(T('next card', 'kartu berikutnya'))} ${c(`i = ${tick.probe + 1}`)}`,
        };
      }
      const lo = tick.vars[nm.lo];
      const hi = tick.vars[nm.hi];
      const midTxt = c(`${nm.md} = (${lo} + ${hi}) // 2 = ${tick.probe}`);
      let rest;
      if (tick.outcome === 'eq') rest = `${c(`${nm.arr}[${tick.probe}]`)} ${esc(T('is', 'berisi'))} ${c(v)} — ${esc(T('found it!', 'ketemu!'))}`;
      else if (tick.outcome === 'lt') rest = `${c(`${v} < ${tv}`)}, ${esc(T(`so indexes ${lo}…${tick.probe} are all too small: drop the left part,`, `jadi indeks ${lo}…${tick.probe} semuanya terlalu kecil: buang bagian kiri,`))} ${c(`${nm.lo} = ${tick.probe + 1}`)}`;
      else rest = `${c(`${v} > ${tv}`)}, ${esc(T(`so indexes ${tick.probe}…${hi} are all too big: drop the right part,`, `jadi indeks ${tick.probe}…${hi} semuanya terlalu besar: buang bagian kanan,`))} ${c(`${nm.hi} = ${tick.probe - 1}`)}`;
      return { cls: 'bin', html: `${head} ${no}${midTxt}; ${rest}` };
    }
    // end tick
    const k = ln.tr.comparisons;
    const ti = targetIndex();
    if (ln.tr.found) return { cls: lin ? 'lin' : 'bin', html: `${head}: ${esc(T(`found at index ${ln.tr.index} after ${k} comparison${k === 1 ? '' : 's'}.`, `ketemu di indeks ${ln.tr.index} setelah ${k} perbandingan.`))}${!lin && !isSorted(state.data) ? ` ${esc(T('(Lucky: the cards are not sorted.)', '(Untung saja: kartunya tidak urut.)'))}` : ''}` };
    if (lin) return { cls: 'lin', html: `${head}: ${esc(T(`checked all ${k} cards — i reached n = ${state.data.length}, so ${tv} is not in the list.`, `sudah memeriksa semua ${k} kartu — i mencapai n = ${state.data.length}, jadi ${tv} tidak ada di daftar.`))}` };
    const lo = laneTick(ln).tick.vars[nm.lo];
    const hi = laneTick(ln).tick.vars[nm.hi];
    if (ti >= 0) return { cls: 'bad', html: `${head}: ${esc(T(`says ${tv} is not in the list after ${k} comparisons — but it is, at index ${ti}! The cards are not sorted, so a half that was thrown away still held the target.`, `menyatakan ${tv} tidak ada di daftar setelah ${k} perbandingan — padahal ada, di indeks ${ti}! Kartunya tidak urut, jadi bagian yang dibuang ternyata berisi target.`))}` };
    return { cls: 'bin', html: `${head}: ${c(`${nm.lo} = ${lo}`)} ${esc(T('has passed', 'sudah melewati'))} ${c(`${nm.hi} = ${hi}`)} ${esc(T(`after ${k} comparison${k === 1 ? '' : 's'}: nothing is left, so ${tv} is not in the list.`, `setelah ${k} perbandingan: tidak ada yang tersisa, jadi ${tv} tidak ada di daftar.`))}` };
  }

  function render(fromStep) {
    for (const ln of Object.values(lanes)) setCode(ln, false);
    const a = laneSentence(lanes.linear);
    const b = laneSentence(lanes.binary);
    let html = `<p class="${a.cls}">${a.html}</p><p class="${b.cls}">${b.html}</p>`;
    const lt = laneTick(lanes.linear);
    const bt = laneTick(lanes.binary);
    if (lt.done && bt.done && !lanes.linear.tr.error) {
      const x = lanes.linear.tr.comparisons;
      const y = lanes.binary.tr.comparisons;
      const sorted = isSorted(state.data);
      let s;
      if (!sorted && !lanes.binary.tr.found && lanes.linear.tr.found) s = T('Binary search is only correct on sorted data. Press "Sort the cards" and search again.', 'Pencarian biner hanya benar pada data yang urut. Tekan "Urutkan kartu" lalu cari lagi.');
      else if (x > y) s = T(`Binary search needed ${x - y} fewer comparison${x - y === 1 ? '' : 's'} (${y} instead of ${x}).`, `Pencarian biner butuh ${x - y} perbandingan lebih sedikit (${y}, bukan ${x}).`);
      else if (x < y) s = T(`This time linear search won (${x} vs ${y}): the target is near the front.`, `Kali ini pencarian linear menang (${x} lawan ${y}): targetnya dekat di depan.`);
      else s = T(`A tie: ${x} comparisons each.`, `Seri: masing-masing ${x} perbandingan.`);
      html += `<p class="sum">${esc(s)}</p>`;
    }
    info.innerHTML = html;
    const err = lanes.linear.tr.error;
    status.innerHTML = err
      ? esc(T(`Both programs stopped with ${err.type} (see the consoles).`, `Kedua program berhenti dengan ${err.type} (lihat konsol).`))
      : t === 0
      ? esc(T('Ready. Press Step or Play.', 'Siap. Tekan Langkah atau Putar.'))
      : `${esc(T('Comparisons so far:', 'Perbandingan sejauh ini:'))} <b>${esc(T('linear', 'linear'))} ${cmpCount(lanes.linear)}</b> · <b>${esc(T('binary', 'biner'))} ${cmpCount(lanes.binary)}</b>${t >= T_ - 1 ? ` · ${esc(T('both finished', 'keduanya selesai'))}` : ''}`;
    setOff(bBack, t <= 0);
    setOff(bReset, t <= 0);
    setOff(bStep, t >= T_ - 1);
    setOff(bEnd, t >= T_ - 1);
    bPlay.textContent = playing ? T('❚❚ Pause', '❚❚ Jeda') : T('▶ Play', '▶ Putar');
    cv.canvas.setAttribute('aria-label', `${T('Two rows of', 'Dua baris berisi')} ${state.data.length} ${T('cards', 'kartu')}. ${plain(a.html)} ${plain(b.html)}`);
    if (fromStep) announce(`${plain(a.html)} ${plain(b.html)}`);
    dirty = true;
    chartDirty = true;
  }

  function goTo(k, fromStep) {
    const nk = Math.max(0, Math.min(T_ - 1, k));
    if (nk === t && !fromStep) return;
    t = nk;
    render(fromStep);
  }
  function togglePlay() {
    if (playing) { stopPlay(); render(false); return; }
    if (t >= T_ - 1) t = 0;
    playing = true;
    playAcc = 0.6;
    render(false);
  }
  function stopPlay() { playing = false; }
  function announce(msg) { live.textContent = ''; setTimeout(() => { live.textContent = msg; }, 30); }

  function labRecord() {
    const a = lanes.linear.tr;
    const b = lanes.binary.tr;
    if (!a || !b || a.error || b.error) return null;
    const sorted = isSorted(state.data);
    const there = targetIndex() >= 0;
    let result = b.found ? 'found' : (there ? 'MISSED (not sorted)' : 'not in list');
    if (b.found && !sorted) result = 'found (lucky)';
    return { n: state.data.length, order: sorted ? 'sorted' : 'not sorted', target: state.target, lin: a.comparisons, bin: b.comparisons, result };
  }

  // ------------------------------------------------------------------------------------------------------------
  // Canvas
  // ------------------------------------------------------------------------------------------------------------
  const FONT = '600 12px system-ui, -apple-system, "Segoe UI", sans-serif';
  const TAGF = '700 10.5px system-ui, -apple-system, "Segoe UI", sans-serif';
  function layout() {
    const ctx = cv.ctx;
    const W = cv.width;
    const small = W < 520;
    const pad = small ? 8 : 12;
    ctx.font = FONT;
    let tw = 0;
    for (const v of state.data) tw = Math.max(tw, ctx.measureText(String(v)).width);
    const gap = small ? 4 : 6;
    const minPitch = Math.max(state.kind === 'numbers' ? (small ? 28 : 30) : 36, Math.ceil(tw) + 10 + gap);
    const avail = W - 2 * pad;
    const n = state.data.length;
    let cols = Math.max(1, Math.min(n, Math.floor(avail / minPitch)));
    const rows = Math.ceil(n / cols);
    cols = Math.ceil(n / rows);
    const pitch = Math.min(avail / cols, 84);
    const x0 = (W - pitch * cols) / 2;
    const tagH = small ? 13 : 15;
    const cardH = small ? 28 : 30;
    const idxH = small ? 13 : 14;
    const rowGap = 5;
    const headH = 42;
    const laneGap = 10;
    const mk = (top, tagLines) => {
      const rowH = tagLines * tagH + cardH + idxH + rowGap;
      return { top, tagLines, rowH, h: headH + rows * rowH - rowGap + 6 };
    };
    const lin = mk(pad, 1);
    const bin = mk(pad + lin.h + laneGap, 2);
    return { W, pad, gap, pitch, cardW: pitch - gap, x0, cols, rows, tagH, cardH, idxH, headH, lin, bin, H: bin.top + bin.h + pad };
  }
  function relayout() {
    L = layout();
    const H = Math.round(L.H);
    if (Math.abs(cvWrap.clientHeight - H) > 1) cvWrap.style.height = `${H + 2}px`;
    for (let k = 0; k < state.data.length; k++) {
      const v = state.data[k];
      const tc = k % L.cols;
      const tr = Math.floor(k / L.cols);
      const c = cards.get(v);
      if (!c) cards.set(v, { c: tc, r: tr, tc, tr });
      else { c.tc = tc; c.tr = tr; }
    }
    dirty = true;
  }
  const slotX = (c) => L.x0 + c * L.pitch + L.gap / 2;
  const slotY = (lane, r) => lane.top + L.headH + r * lane.rowH + lane.tagLines * L.tagH;

  function easeCards(dt) {
    let moving = false;
    const a = reduce ? 1 : 1 - Math.exp(-dt * 7);
    for (const c of cards.values()) {
      const dc = c.tc - c.c;
      const dr = c.tr - c.r;
      if (Math.abs(dc) > 0.002 || Math.abs(dr) > 0.002) { c.c += dc * a; c.r += dr * a; moving = true; }
      else { c.c = c.tc; c.r = c.tr; }
    }
    return moving;
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function fitText(ctx, s, maxW) {
    if (ctx.measureText(s).width <= maxW) return s;
    let lo = 0; let hi = s.length;
    while (lo < hi) { const m = (lo + hi + 1) >> 1; if (ctx.measureText(`${s.slice(0, m)}…`).width <= maxW) lo = m; else hi = m - 1; }
    return `${s.slice(0, lo)}…`;
  }

  /** What each card looks like in one lane at the current tick. */
  function laneStates(ln) {
    const n = state.data.length;
    const { tick, done } = laneTick(ln);
    const nm = ln.prog.names;
    const st = new Array(n).fill('norm');
    const tags = [];   // { idx, text, color, line }
    const lin = ln.algo === 'linear';
    if (tick.error) return { st: st.fill('dim'), tags };
    if (lin) {
      const i = tick.vars.i ?? 0;
      if (tick.kind === 'iter') {
        for (let k = 0; k < tick.probe; k++) st[k] = 'dim';
        st[tick.probe] = tick.outcome === 'eq' ? 'hit' : 'cur';
        tags.push({ idx: tick.probe, text: 'i', color: COL.tagI, line: 0 });
      } else if (tick.kind === 'end') {
        for (let k = 0; k < Math.min(i, n); k++) st[k] = 'dim';
        if (ln.tr.found) st[ln.tr.index] = 'hit';
        if (i < n) tags.push({ idx: i, text: 'i', color: COL.tagI, line: 0 });
      } else {
        tags.push({ idx: 0, text: 'i', color: COL.tagI, line: 0 });
      }
      return { st, tags };
    }
    const lo = tick.vars[nm.lo] ?? 0;
    const hi = tick.vars[nm.hi] ?? n - 1;
    for (let k = 0; k < n; k++) if (k < lo || k > hi) st[k] = 'dim';
    const probed = [];
    for (let j = 1; j <= laneTick(ln).k; j++) { const tk = ln.tr.ticks[j]; if (tk.kind === 'iter') probed.push(tk.probe); }
    if (tick.kind === 'iter') {
      const m = tick.probe;
      st[m] = tick.outcome === 'eq' ? 'hit' : 'cur';
      if (tick.outcome === 'lt') for (let k = lo; k < m; k++) st[k] = 'drop';
      if (tick.outcome === 'gt') for (let k = m + 1; k <= hi; k++) st[k] = 'drop';
      tags.push({ idx: m, text: nm.md, color: COL.tagMid, line: 0 });
    } else if (tick.kind === 'end') {
      if (ln.tr.found) { st.fill('dim'); st[ln.tr.index] = 'hit'; tags.push({ idx: ln.tr.index, text: nm.md, color: COL.tagMid, line: 0 }); }
    }
    if (!(tick.kind === 'end' && ln.tr.found)) {
      if (lo === hi) tags.push({ idx: lo, text: `${nm.lo}=${nm.hi}`, color: COL.tagLo, line: 1 });
      else {
        if (lo >= 0 && lo < n) tags.push({ idx: lo, text: nm.lo, color: COL.tagLo, line: 1 });
        if (hi >= 0 && hi < n) tags.push({ idx: hi, text: nm.hi, color: COL.tagHi, line: 1 });
      }
    }
    return { st, tags, probed, done };
  }

  function drawLane(ctx, ln, lane) {
    const n = state.data.length;
    const lin = ln.algo === 'linear';
    const acc = lin ? COL.lin : COL.bin;
    const W = L.W;
    // panel
    roundRect(ctx, L.pad - 4, lane.top, W - 2 * L.pad + 8, lane.h, 8);
    ctx.fillStyle = COL.lane;
    ctx.fill();
    ctx.strokeStyle = COL.laneEdge;
    ctx.lineWidth = 1;
    ctx.stroke();
    // header
    const { tick, done } = laneTick(ln);
    const nm = ln.prog.names;
    const x = L.pad + 6;
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';
    ctx.font = '700 13px system-ui, -apple-system, "Segoe UI", sans-serif';
    ctx.fillStyle = acc;
    const title = lin ? T('Linear search', 'Pencarian linear') : T('Binary search', 'Pencarian biner');
    ctx.fillText(title, x, lane.top + 17);
    const titleW = ctx.measureText(title).width;
    const k = tick.vars[nm.cnt] ?? 0;
    const worst = lin ? worstLinear(n) : worstBinary(n);
    ctx.textAlign = 'right';
    ctx.font = '700 12.5px system-ui, -apple-system, "Segoe UI", sans-serif';
    ctx.fillStyle = '#f8fafc';
    const cntTxt = `${nm.cnt}: ${k}`;
    const maxTxt = ` ${T('(worst', '(maks.')} ${worst}${T(')', ')')}`;
    ctx.font = '600 11.5px system-ui, -apple-system, "Segoe UI", sans-serif';
    const maxW = ctx.measureText(maxTxt).width;
    const showMax = W - 2 * L.pad - titleW - 24 > maxW + 120;
    if (showMax) { ctx.fillStyle = COL.muted; ctx.fillText(maxTxt, W - L.pad - 6, lane.top + 17); }
    ctx.font = '700 12.5px system-ui, -apple-system, "Segoe UI", sans-serif';
    ctx.fillStyle = '#f8fafc';
    ctx.fillText(cntTxt, W - L.pad - 6 - (showMax ? maxW : 0), lane.top + 17);
    // status line
    let s;
    let sc = COL.muted;
    const tv = targetRepr();
    if (tick.error) { s = `${tick.error.type}: ${tick.error.message}`; sc = COL.bad; }
    else if (tick.kind === 'setup') {
      s = lin ? T('ready: i = 0, start at the front', 'siap: i = 0, mulai dari depan') : `${T('ready:', 'siap:')} ${nm.lo} = 0, ${nm.hi} = ${n - 1}`;
      if (!lin && !isSorted(state.data)) { s += T('  ⚠ cards NOT sorted!', '  ⚠ kartu TIDAK urut!'); sc = COL.bad; }
    } else if (tick.kind === 'iter') {
      s = noteFor(ln, tick).replace(/^/, `${nm.arr}[${tick.probe}]: `);
      sc = tick.outcome === 'eq' ? COL.hitEdge : COL.curText;
    } else if (ln.tr.found) { s = T(`✓ found at index ${ln.tr.index} — ${ln.tr.comparisons} comparisons`, `✓ ketemu di indeks ${ln.tr.index} — ${ln.tr.comparisons} perbandingan`); sc = COL.hitEdge; }
    else if (targetIndex() >= 0) { s = T(`✗ missed! ${tv} is at index ${targetIndex()} (cards not sorted)`, `✗ terlewat! ${tv} ada di indeks ${targetIndex()} (kartu tidak urut)`); sc = COL.bad; }
    else { s = T(`✗ ${tv} is not in the list — ${ln.tr.comparisons} comparisons`, `✗ ${tv} tidak ada di daftar — ${ln.tr.comparisons} perbandingan`); sc = '#fca5a5'; }
    if (done && !tick.error && tick.kind !== 'setup' && t > laneTick(ln).k && t < T_ - 1) s += T('  (finished)', '  (selesai)');
    ctx.textAlign = 'left';
    ctx.font = '600 12px system-ui, -apple-system, "Segoe UI", sans-serif';
    ctx.fillStyle = sc;
    ctx.fillText(fitText(ctx, s, W - 2 * L.pad - 12), x, lane.top + 34);

    // cards
    const { st, tags, probed } = laneStates(ln);
    const ti = targetIndex();
    for (let i = 0; i < n; i++) {
      const v = state.data[i];
      const c = cards.get(v) || { c: i % L.cols, r: Math.floor(i / L.cols) };
      const cx = slotX(c.c);
      const cy = slotY(lane, c.r);
      const s2 = st[i];
      const [fill, edge, txt, lw] = s2 === 'cur' ? [COL.cur, COL.curEdge, COL.curText, 2.5]
        : s2 === 'hit' ? [COL.hit, COL.hitEdge, COL.hitText, 2.5]
          : s2 === 'dim' ? [COL.dim, COL.dimEdge, COL.dimText, 1]
            : [COL.card, COL.cardEdge, COL.text, 1];
      roundRect(ctx, cx, cy, L.cardW, L.cardH, 5);
      ctx.fillStyle = fill;
      ctx.fill();
      if (s2 === 'drop') { ctx.fillStyle = COL.drop; ctx.fill(); }
      ctx.strokeStyle = s2 === 'drop' ? 'rgba(248,113,113,0.7)' : edge;
      ctx.lineWidth = lw;
      if (s2 === 'drop') ctx.setLineDash([4, 3]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.font = FONT;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = txt;
      ctx.fillText(fitText(ctx, String(v), L.cardW - 6), cx + L.cardW / 2, cy + L.cardH / 2 + 0.5);
      // probed earlier (binary): small dot
      if (probed && probed.includes(i) && s2 === 'dim') {
        ctx.fillStyle = 'rgba(251,191,36,0.55)';
        ctx.beginPath();
        ctx.arc(cx + 5, cy + 5, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      // index under its slot (indexes belong to positions; cards slide over them when sorted), with a star where
      // the target really is
      const ix = slotX(i % L.cols) + L.cardW / 2;
      const iy = slotY(lane, Math.floor(i / L.cols)) + L.cardH;
      ctx.textBaseline = 'top';
      if (i === ti) {
        const missed = done && !ln.tr.found && laneTick(ln).tick.kind === 'end';
        ctx.font = '700 10.5px system-ui, -apple-system, "Segoe UI", sans-serif';
        ctx.fillStyle = missed || s2 === 'drop' ? COL.bad : COL.star;
        ctx.fillText(`★${i}`, ix, iy + (missed ? 4 : 2));
        if (missed) {
          roundRect(ctx, cx - 2, cy - 2, L.cardW + 4, L.cardH + 4, 6);
          ctx.strokeStyle = COL.bad;
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 3]);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      } else {
        ctx.font = '500 10px system-ui, -apple-system, "Segoe UI", sans-serif';
        ctx.fillStyle = COL.idx;
        ctx.fillText(String(i), ix, iy + 2);
      }
    }
    // pointer tags (eased)
    ctx.font = TAGF;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    const seen = new Set();
    for (const tg of tags) {
      const tx = slotX(tg.idx % L.cols) + L.cardW / 2;
      const ty = slotY(lane, Math.floor(tg.idx / L.cols)) - 3 - (lane.tagLines - 1 - tg.line) * L.tagH;
      const key = `${tg.line}:${tg.text.split('=')[0]}`;
      seen.add(key);
      let p = ln.tags.get(key);
      if (!p) { p = { x: tx, y: ty }; ln.tags.set(key, p); }
      p.tx = tx; p.ty = ty;
      const w = ctx.measureText(tg.text).width;
      const px = Math.max(L.pad + w / 2, Math.min(W - L.pad - w / 2, p.x));
      ctx.fillStyle = tg.color;
      ctx.fillText(tg.text, px, p.y);
    }
    for (const key of [...ln.tags.keys()]) if (!seen.has(key)) ln.tags.delete(key);
  }
  function easeTags(dt) {
    let moving = false;
    const a = reduce ? 1 : 1 - Math.exp(-dt * 12);
    for (const ln of Object.values(lanes)) {
      for (const p of ln.tags.values()) {
        if (p.tx == null) continue;
        const dx = p.tx - p.x;
        const dy = p.ty - p.y;
        if (Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3) { p.x += dx * a; p.y += dy * a; moving = true; }
        else { p.x = p.tx; p.y = p.ty; }
      }
    }
    return moving;
  }

  function draw() {
    if (!L) return;
    const ctx = cv.ctx;
    ctx.fillStyle = COL.bg;
    ctx.fillRect(0, 0, cv.width, cv.height);
    drawLane(ctx, lanes.linear, L.lin);
    drawLane(ctx, lanes.binary, L.bin);
  }

  function hitCard(px, py) {
    if (!L) return -1;
    for (const lane of [L.lin, L.bin]) {
      for (let i = 0; i < state.data.length; i++) {
        const c = cards.get(state.data[i]);
        if (!c) continue;
        const x = slotX(c.c);
        const y = slotY(lane, c.r);
        if (px >= x - L.gap / 2 && px <= x + L.cardW + L.gap / 2 && py >= y - 4 && py <= y + L.cardH + 4) return i;
      }
    }
    return -1;
  }
  const onClick = (e) => {
    const r = cv.canvas.getBoundingClientRect();
    const i = hitCard(e.clientX - r.left, e.clientY - r.top);
    if (i >= 0) { custom(); setTarget(String(state.data[i]), true); }
  };
  cv.canvas.addEventListener('click', onClick);

  // ------------------------------------------------------------------------------------------------------------
  // Chart: worst case n vs floor(log2 n) + 1, with this search and the lab rows as dots
  // ------------------------------------------------------------------------------------------------------------
  function updateChartCap() {
    const n = state.data.length;
    chartCap.textContent = T(
      `Orange line: linear search, worst case n comparisons. Teal steps: binary search, worst case ⌊log₂ n⌋ + 1 (it rises by one only when n doubles). Filled dots: the search on the cards now (n = ${n}: worst case ${worstLinear(n)} vs ${worstBinary(n)}). Rings: rows recorded in the lab.`,
      `Garis oranye: pencarian linear, kasus terburuk n perbandingan. Tangga hijau toska: pencarian biner, kasus terburuk ⌊log₂ n⌋ + 1 (hanya naik satu ketika n menjadi dua kali lipat). Titik penuh: pencarian pada kartu sekarang (n = ${n}: kasus terburuk ${worstLinear(n)} lawan ${worstBinary(n)}). Lingkaran: baris yang dicatat di lab.`,
    );
  }
  function drawChart() {
    const ctx = chart.ctx;
    const W = chart.width;
    const H = chart.height;
    ctx.fillStyle = COL.bg;
    ctx.fillRect(0, 0, W, H);
    const X = state.chartMax;
    const left = 46;
    const right = 14;
    const top = 14;
    const bottom = 34;
    const pw = Math.max(10, W - left - right);
    const ph = Math.max(10, H - top - bottom);
    const xs = (n) => left + (n / X) * pw;
    const ys = (v) => top + ph - (v / X) * ph;
    const step = X === 64 ? 8 : 128;
    ctx.font = '500 11px system-ui, sans-serif';
    ctx.lineWidth = 1;
    for (let v = 0; v <= X; v += step) {
      ctx.strokeStyle = 'rgba(148,163,184,0.14)';
      ctx.beginPath(); ctx.moveTo(xs(v), top); ctx.lineTo(xs(v), top + ph); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(left, ys(v)); ctx.lineTo(left + pw, ys(v)); ctx.stroke();
      ctx.fillStyle = COL.muted;
      const showX = W > 420 || (v / step) % 2 === 0;
      if (showX) { ctx.textAlign = 'center'; ctx.textBaseline = 'top'; ctx.fillText(String(v), xs(v), top + ph + 4); }
      if ((v / step) % 2 === 0) { ctx.textAlign = 'right'; ctx.textBaseline = 'middle'; ctx.fillText(String(v), left - 6, ys(v)); }
    }
    ctx.strokeStyle = '#475569';
    ctx.beginPath(); ctx.moveTo(left, top); ctx.lineTo(left, top + ph); ctx.lineTo(left + pw, top + ph); ctx.stroke();
    ctx.fillStyle = COL.muted;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText(T('n (cards)', 'n (kartu)'), left + pw, H - 2);
    ctx.save();
    ctx.translate(12, top + ph / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(T('comparisons', 'perbandingan'), 0, 0);
    ctx.restore();
    // linear
    ctx.strokeStyle = COL.lin;
    ctx.lineWidth = 2.2;
    ctx.beginPath(); ctx.moveTo(xs(1), ys(1)); ctx.lineTo(xs(X), ys(X)); ctx.stroke();
    // binary staircase
    ctx.strokeStyle = COL.bin;
    ctx.beginPath();
    ctx.moveTo(xs(1), ys(1));
    for (let n = 2; n <= X; n++) { const prev = worstBinary(n - 1); const cur = worstBinary(n); if (cur !== prev) { ctx.lineTo(xs(n), ys(prev)); ctx.lineTo(xs(n), ys(cur)); } }
    ctx.lineTo(xs(X), ys(worstBinary(X)));
    ctx.stroke();
    // labels at the right end
    ctx.font = '700 11.5px system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = COL.lin;
    ctx.fillText(`${T('linear', 'linear')}: n`, xs(X * 0.8) - 8, ys(X * 0.8));
    ctx.fillStyle = COL.bin;
    ctx.fillText(`${T('binary', 'biner')}: ⌊log₂ n⌋ + 1 = ${worstBinary(X)} ${T('at', 'saat')} n = ${X}`, xs(X) - 4, ys(worstBinary(X)) - 4);
    // lab rows
    for (const r of lab.getRows()) {
      const n = Number(r.n);
      if (!(n >= 1 && n <= X)) continue;
      for (const [v, c] of [[Number(r.lin), COL.lin], [Number(r.bin), COL.bin]]) {
        if (!(v >= 0 && v <= X)) continue;
        ctx.strokeStyle = c;
        ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.arc(xs(n), ys(v), 4.5, 0, Math.PI * 2); ctx.stroke();
      }
    }
    // this search
    const n = state.data.length;
    if (n <= X) {
      ctx.strokeStyle = 'rgba(226,232,240,0.35)';
      ctx.setLineDash([3, 4]);
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(xs(n), top); ctx.lineTo(xs(n), top + ph); ctx.stroke();
      ctx.setLineDash([]);
      const a = cmpCount(lanes.linear);
      const b = cmpCount(lanes.binary);
      for (const [v, c, r] of [[a, COL.lin, 7], [b, COL.bin, 4.5]]) {
        ctx.fillStyle = c;
        ctx.strokeStyle = '#0b1220';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(xs(n), ys(v), r, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      }
    }
    chart.canvas.setAttribute('aria-label', T(
      `Chart: worst-case comparisons for n from 1 to ${X}. Linear search rises to ${X}; binary search only to ${worstBinary(X)}. This search (n = ${n}): linear ${cmpCount(lanes.linear)}, binary ${cmpCount(lanes.binary)} so far.`,
      `Grafik: perbandingan kasus terburuk untuk n dari 1 sampai ${X}. Pencarian linear naik sampai ${X}; pencarian biner hanya sampai ${worstBinary(X)}. Pencarian ini (n = ${n}): linear ${cmpCount(lanes.linear)}, biner ${cmpCount(lanes.binary)} sejauh ini.`,
    ));
  }

  // ------------------------------------------------------------------------------------------------------------
  // Loop
  // ------------------------------------------------------------------------------------------------------------
  const animator = loop((dt) => {
    if (playing) {
      playAcc += dt * state.speed;
      if (playAcc >= 0.9) {
        playAcc = 0;
        if (t < T_ - 1) goTo(t + 1, false);
        if (t >= T_ - 1) { stopPlay(); render(true); }
      }
    }
    if (cv.width !== lastW || !L) { lastW = cv.width; relayout(); }
    if (cv.height !== lastH) { lastH = cv.height; dirty = true; }
    const moving = easeCards(dt) | easeTags(dt);
    if (dirty || moving) { draw(); dirty = false; }
    labTimer += dt;
    if (labTimer > 0.5) {
      labTimer = 0;
      const rows = lab.getRows();
      const sig = `${rows.length}:${rows.length ? JSON.stringify(rows[rows.length - 1]) : ''}`;
      if (sig !== labSig) { labSig = sig; chartDirty = true; }
    }
    if (chart.width !== lastCW || chart.height !== lastCH) { lastCW = chart.width; lastCH = chart.height; chartDirty = true; }
    if (chartDirty) { drawChart(); chartDirty = false; }
  });

  setNotation('python');
  rebuild();
  animator.start();

  return () => {
    animator.stop();
    playing = false;
    cv.canvas.removeEventListener('click', onClick);
    for (const ln of Object.values(lanes)) { ln.cp.destroy(); ln.out.destroy(); }
    cv.destroy();
    chart.destroy();
    style.remove();
    main.remove();
    ctrlPanel.remove();
  };
}
