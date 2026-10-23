// Dictionaries: Keys and Values (PP 03 Bab 5.4 dictionary, the KeyError row of Bab 4, collections.Counter of Bab 7,
// presensi and the gradebook from the school examples). Every dictionary operation is a real line of Python that
// runs in minipy (src/lib/minipy.js); the canvas replays what happens inside, side by side:
//   * the same data as a LIST OF PAIRS [(key, value), ...], searched from the front: 1, 2, ... n comparisons;
//   * the DICT itself, drawn the way CPython 3.13 stores it: hash(key) % size picks a slot of the index table
//     (8 slots, growing to 16, 32, 64 ... when 2/3 full), the slot points to an entry (#0, #1 ... in insertion order),
//     a taken slot sends Python on to the next slot of CPython's probe sequence, an empty slot means "not a key",
//     and del leaves a "deleted" marker in its slot so later searches keep going.
//
// How it works: the program (preset lines + the statements the student adds) is run from the start with minipy and
// every step is kept as a before / after snapshot. Each step's line is scanned for dictionary operations (d[k],
// d[k] = v, del d[k], d.get, d.pop, k in d, len(d), for ... in d.items(), most_common ...). The keys are evaluated
// with the "before" variables (minipy evalExpression, so hash() and == are Python's own), the lookups are replayed
// on a model of CPython's index table, and the predicted dict is checked against the real "after" dict. Only a
// prediction that matches (and that raises the same KeyError) is animated; anything else is shown as a plain
// before -> after change, so the picture never disagrees with Python.
// Note: CPython randomises str hashes every time it starts (PYTHONHASHSEED), so for str keys the slot numbers are
// one possible layout (minipy's own hash()); int keys hash to themselves and land exactly where CPython puts them.
import { createCanvas, loop } from '../../../lib/canvas.js';
import { select, slider } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';
import { compile, createRun, evalExpression, tokenize } from '../../../lib/minipy.js';
import { codePanel, consolePanel, highlight } from '../../../lib/codepanel.js';

// CORE-START (no DOM below this line until CORE-END: tested from node)
// PRESETS-START
// group 'dict': a starting dictionary to explore with the operation buttons; group 'program': a worked example from
// the materials (PP 03 5.4 harga_menu, Bab 4 KeyError, Bab 7 Counter, the presensi and gradebook contexts).
// `dict` = the dictionary shown first, `kv` = loop variable names for the for button, `k` / `v` = defaults for the
// key and value boxes, `miss` = a key that is not in the dictionary (suggested in the key box).
const NAMES = ['Andi', 'Budi', 'Citra', 'Dewi', 'Eko', 'Fajar', 'Gita', 'Hana', 'Indra', 'Joko', 'Kartika', 'Lestari',
  'Made', 'Nadia', 'Oki', 'Putri', 'Rina', 'Sari', 'Tono', 'Umar', 'Vina', 'Wulan', 'Yoga', 'Zahra', 'Agus', 'Bayu',
  'Cahya', 'Dimas', 'Elsa', 'Farhan', 'Galih', 'Hesti', 'Ilham', 'Jihan', 'Kevin', 'Laras'];
const SCORES5 = [85, 72, 90, 78, 66];
const scoreOf = (i) => (i < SCORES5.length ? SCORES5[i] : 60 + ((i * 37 + 11) % 41));
function classDict(name, n) {
  const pairs = NAMES.slice(0, n).map((nm, i) => `"${nm}": ${scoreOf(i)}`);
  if (n <= 4) return `${name} = {${pairs.join(', ')}}`;
  const rows = [];
  for (let i = 0; i < pairs.length; i += 4) rows.push(`    ${pairs.slice(i, i + 4).join(', ')},`);
  return `${name} = {\n${rows.join('\n')}\n}`;
}
const PRESETS = [
  {
    key: 'grades', group: 'dict',
    name: { en: 'Gradebook: name → score', id: 'Daftar nilai: nama → nilai' },
    dict: { en: 'scores', id: 'nilai' }, kv: { en: ['name', 'score'], id: ['nama', 'skor'] },
    k: 'Citra', v: '88', miss: 'Zaki',
    code: {
      en: 'scores = {"Andi": 85, "Budi": 72, "Citra": 90, "Dewi": 78, "Eko": 66}\n',
      id: 'nilai = {"Andi": 85, "Budi": 72, "Citra": 90, "Dewi": 78, "Eko": 66}\n',
    },
  },
  {
    key: 'attendance', group: 'dict',
    name: { en: 'Attendance: name → status', id: 'Presensi: nama → status' },
    dict: { en: 'attendance', id: 'presensi' }, kv: { en: ['name', 'status'], id: ['nama', 'status'] },
    k: 'Dewi', v: { en: 'Present', id: 'Hadir' }, miss: 'Zaki',
    code: {
      en: 'attendance = {"Andi": "Present", "Budi": "Sick", "Citra": "Present", "Dewi": "Excused", "Eko": "Absent"}\n',
      id: 'presensi = {"Andi": "Hadir", "Budi": "Sakit", "Citra": "Hadir", "Dewi": "Izin", "Eko": "Alpa"}\n',
    },
  },
  {
    key: 'menu', group: 'dict',
    name: { en: 'Canteen menu prices', id: 'Harga menu kantin' },
    dict: { en: 'menu_prices', id: 'harga_menu' }, kv: { en: ['dish', 'price'], id: ['menu', 'harga'] },
    k: { en: 'Iced Tea', id: 'Es Teh' }, v: '3500', miss: 'Soto',
    code: {
      en: 'menu_prices = {"Fried Rice": 12000, "Chicken Noodles": 10000, "Iced Tea": 3000}\n',
      id: 'harga_menu = {"Nasi Goreng": 12000, "Mie Ayam": 10000, "Es Teh": 3000}\n',
    },
  },
  {
    key: 'nis', group: 'dict',
    name: { en: 'Student numbers: NIS → name (int keys)', id: 'Nomor induk: NIS → nama (kunci int)' },
    dict: { en: 'students', id: 'siswa' }, kv: { en: ['nis', 'name'], id: ['nis', 'nama'] },
    k: '24117', v: 'Fajar', miss: '24130',
    code: {
      en: '# NIS (student number) -> name. An int key is its own hash: hash(24117) == 24117\nstudents = {24101: "Andi", 24108: "Budi", 24113: "Citra", 24117: "Dewi", 24125: "Eko"}\n',
      id: '# NIS (nomor induk siswa) -> nama. Kunci int adalah hash-nya sendiri: hash(24117) == 24117\nsiswa = {24101: "Andi", 24108: "Budi", 24113: "Citra", 24117: "Dewi", 24125: "Eko"}\n',
    },
  },
  {
    key: 'clubs', group: 'dict',
    name: { en: 'Club sign-ups: Counter', id: 'Peminat ekskul: Counter' },
    dict: { en: 'count', id: 'hitung' }, kv: { en: ['club', 'total'], id: ['nama_ekskul', 'jumlah'] },
    k: 'Futsal', v: '1', miss: { en: 'Basketball', id: 'Basket' },
    code: {
      en: 'from collections import Counter\nclubs = ["Scouts", "Futsal", "Scouts", "Red Cross", "Futsal", "Scouts"]\ncount = Counter(clubs)\n',
      id: 'from collections import Counter\nekskul = ["Pramuka", "Futsal", "Pramuka", "PMR", "Futsal", "Pramuka"]\nhitung = Counter(ekskul)\n',
    },
  },
  {
    key: 'class', group: 'dict', sized: true,
    name: { en: 'Class of n students (choose n)', id: 'Kelas berisi n siswa (pilih n)' },
    dict: { en: 'scores', id: 'nilai' }, kv: { en: ['name', 'score'], id: ['nama', 'skor'] },
    k: (n) => NAMES[Math.max(0, n - 1)], v: '80', miss: 'Zaki',
    code: (n) => ({
      en: `# a class of ${n} student${n === 1 ? '' : 's'}: name -> score\n${classDict('scores', n)}\n`,
      id: `# kelas berisi ${n} siswa: nama -> nilai\n${classDict('nilai', n)}\n`,
    }),
  },
  {
    key: 'ex-menu', group: 'program',
    name: { en: 'Example: canteen menu', id: 'Contoh: harga menu kantin' },
    dict: { en: 'menu_prices', id: 'harga_menu' }, kv: { en: ['dish', 'price'], id: ['menu', 'harga'] },
    k: { en: 'Iced Tea', id: 'Es Teh' }, v: '3500', miss: 'Soto',
    code: {
      en: `menu_prices = {"Fried Rice": 12000, "Chicken Noodles": 10000, "Iced Tea": 3000}
print("Price of Chicken Noodles:", menu_prices["Chicken Noodles"])
menu_prices["Meatball Soup"] = 11000  # add a new pair
menu_prices["Iced Tea"] = 3500  # change a value
print("All dishes:", list(menu_prices.keys()))
print("All prices:", list(menu_prices.values()))
print("Any Soto?", "Soto" in menu_prices)
print("Price of Soto:", menu_prices.get("Soto", "not available"))  # safe, no KeyError
for dish, price in menu_prices.items():
    print(f"- {dish}: Rp {price}")
`,
      id: `harga_menu = {"Nasi Goreng": 12000, "Mie Ayam": 10000, "Es Teh": 3000}
print("Harga Mie Ayam:", harga_menu["Mie Ayam"])
harga_menu["Bakso"] = 11000  # menambah pasangan baru
harga_menu["Es Teh"] = 3500  # mengubah nilai
print("Semua menu:", list(harga_menu.keys()))
print("Semua harga:", list(harga_menu.values()))
print("Ada Soto?", "Soto" in harga_menu)
print("Harga Soto:", harga_menu.get("Soto", "tidak tersedia"))  # aman, tidak KeyError
for menu, harga in harga_menu.items():
    print(f"- {menu}: Rp {harga}")
`,
    },
  },
  {
    key: 'ex-grades', group: 'program',
    name: { en: 'Example: gradebook (add, change, del, pop)', id: 'Contoh: daftar nilai (tambah, ubah, del, pop)' },
    dict: { en: 'scores', id: 'nilai' }, kv: { en: ['name', 'score'], id: ['nama', 'skor'] },
    k: 'Budi', v: '75', miss: 'Andi',
    code: {
      en: `scores = {"Andi": 85, "Budi": 72, "Citra": 90}
scores["Dewi"] = 78  # add a new pair
scores["Budi"] = 80  # change a value: Budi took the retest
print("Budi's score now:", scores["Budi"])
del scores["Andi"]  # Andi moved to another school
citra_score = scores.pop("Citra")  # take the value out and remove the pair
print("Citra's score:", citra_score)
print("Left:", scores, "| students:", len(scores))
`,
      id: `nilai = {"Andi": 85, "Budi": 72, "Citra": 90}
nilai["Dewi"] = 78  # menambah pasangan baru
nilai["Budi"] = 80  # mengubah nilai: Budi ikut remedial
print("Nilai Budi sekarang:", nilai["Budi"])
del nilai["Andi"]  # Andi pindah sekolah
nilai_citra = nilai.pop("Citra")  # ambil nilainya sekaligus hapus pasangannya
print("Nilai Citra:", nilai_citra)
print("Sisa:", nilai, "| jumlah siswa:", len(nilai))
`,
    },
  },
  {
    key: 'ex-keyerror', group: 'program',
    name: { en: 'Example: KeyError vs get() and in', id: 'Contoh: KeyError vs get() dan in' },
    dict: { en: 'scores', id: 'nilai' }, kv: { en: ['name', 'score'], id: ['nama', 'skor'] },
    k: 'Dodi', v: '70', miss: 'Dodi',
    code: {
      en: `scores = {"Andi": 85, "Budi": 72, "Citra": 90}
print(scores.get("Dodi"))  # None: missing, but safe
print(scores.get("Dodi", "no score yet"))  # with a default value
if "Dodi" in scores:
    print("Dodi's score:", scores["Dodi"])
else:
    print("Dodi is not registered")
print(scores["Dodi"])  # KeyError!
`,
      id: `nilai = {"Andi": 85, "Budi": 72, "Citra": 90}
print(nilai.get("Dodi"))  # None: tidak ada, tetapi aman
print(nilai.get("Dodi", "belum ada nilai"))  # dengan nilai bawaan
if "Dodi" in nilai:
    print("Nilai Dodi:", nilai["Dodi"])
else:
    print("Dodi belum terdaftar")
print(nilai["Dodi"])  # KeyError!
`,
    },
  },
  {
    key: 'ex-attendance', group: 'program',
    name: { en: 'Example: attendance recap (items, len)', id: 'Contoh: rekap presensi (items, len)' },
    dict: { en: 'attendance', id: 'presensi' }, kv: { en: ['name', 'status'], id: ['nama', 'status'] },
    k: 'Budi', v: { en: 'Sick', id: 'Sakit' }, miss: 'Zaki',
    code: {
      en: `attendance = {"Andi": "Present", "Budi": "Sick", "Citra": "Present", "Dewi": "Excused", "Eko": "Present"}
attendance["Fajar"] = "Absent"  # did not send any message
attendance["Budi"] = "Present"  # Budi came in after all
present = 0
for name, status in attendance.items():
    print(f"{name:<6}: {status}")
    if status == "Present":
        present += 1
percent = present / len(attendance) * 100
print(f"Present {present} of {len(attendance)} students ({percent:.1f}%)")
`,
      id: `presensi = {"Andi": "Hadir", "Budi": "Sakit", "Citra": "Hadir", "Dewi": "Izin", "Eko": "Hadir"}
presensi["Fajar"] = "Alpa"  # tidak memberi kabar
presensi["Budi"] = "Hadir"  # Budi ternyata datang
jumlah_hadir = 0
for nama, status in presensi.items():
    print(f"{nama:<6}: {status}")
    if status == "Hadir":
        jumlah_hadir += 1
persen = jumlah_hadir / len(presensi) * 100
print(f"Hadir {jumlah_hadir} dari {len(presensi)} siswa ({persen:.1f}%)")
`,
    },
  },
  {
    key: 'ex-clubs', group: 'program',
    name: { en: 'Example: counting club sign-ups (get, Counter)', id: 'Contoh: menghitung peminat ekskul (get, Counter)' },
    dict: { en: 'members', id: 'peminat' }, kv: { en: ['club', 'total'], id: ['nama_ekskul', 'jumlah'] },
    k: 'Futsal', v: '1', miss: { en: 'Basketball', id: 'Basket' },
    code: {
      en: `from collections import Counter
clubs = ["Scouts", "Futsal", "Scouts", "Red Cross", "Futsal", "Scouts"]
members = {}  # counting by hand with a dictionary
for c in clubs:
    members[c] = members.get(c, 0) + 1
print("Counted by hand:", members)
count = Counter(clubs)  # Counter does the same job
print("Members per club:", dict(count))
print("Most popular :", count.most_common(1))
print("Basketball members:", count["Basketball"])  # a missing key counts 0
`,
      id: `from collections import Counter
ekskul = ["Pramuka", "Futsal", "Pramuka", "PMR", "Futsal", "Pramuka"]
peminat = {}  # menghitung sendiri dengan dictionary
for e in ekskul:
    peminat[e] = peminat.get(e, 0) + 1
print("Dihitung sendiri:", peminat)
hitung = Counter(ekskul)  # Counter melakukan hal yang sama
print("Peminat tiap ekskul:", dict(hitung))
print("Paling diminati :", hitung.most_common(1))
print("Peminat Basket:", hitung["Basket"])  # kunci yang tidak ada bernilai 0
`,
    },
  },
];
// PRESETS-END

const MAX_STEPS = 1500;
// a statement that runs more steps than this jumps to its end instead of replaying every step
const LONG_RUN = 80;

/** Split a program into top-level statements (a statement keeps its indented body, else/elif/except/finally). */
function splitChunks(code) {
  const lines = code.replace(/\n+$/, '').split('\n');
  const chunks = [];
  let cur = [];
  const isStmt = (l) => /^\S/.test(l) && !/^#/.test(l);
  for (const l of lines) {
    if (isStmt(l) && !/^(else|elif|except|finally)\b/.test(l) && cur.some(isStmt)) { chunks.push(cur.join('\n')); cur = []; }
    else if (isStmt(l) && /^[)\]}]/.test(l)) { cur.push(l); continue; }
    cur.push(l);
  }
  if (cur.length) chunks.push(cur.join('\n'));
  return chunks;
}

/**
 * A typed one-liner written out on separate lines, the way Python runs it: `for k, v in d.items(): print(k, v)` →
 * header + indented body, `a = 1; b = 2` → two lines. minipy reports only the line of each step, so this gives every
 * step of the loop (header, body) its own line. null when there is nothing to unfold.
 */
function unfold(stmt) {
  if (stmt.includes('\n')) return null;
  let raw;
  try { raw = tokenize(stmt); } catch { return null; }
  if (raw.some((t) => t.type === 'error')) return null;
  const ts = raw.filter((t) => !SKIP_TOK.has(t.type) && t.line === 1).map((t) => ({ ...t, a: t.col, b: t.col + t.text.length }));
  if (!ts.length) return null;
  const compound = ts[0].type === 'keyword' && ['for', 'while', 'if', 'def'].includes(ts[0].text);
  let d = 0;
  let lambdas = 0;
  let colon = -1;
  const semis = [];
  for (const t of ts) {
    if (t.type === 'keyword' && t.text === 'lambda' && d === 0) lambdas++;
    if (t.type !== 'op') continue;
    if (OPEN.has(t.text)) d++;
    else if (CLOSE.has(t.text)) d--;
    else if (d === 0 && t.text === ':' && compound && colon < 0) { if (lambdas) lambdas--; else colon = t.b; } else if (d === 0 && t.text === ';') semis.push(t);
  }
  if (compound && colon < 0) return null;
  const bodyFrom = compound ? colon : 0;
  const parts = [];
  let from = bodyFrom;
  for (const t of semis) { if (t.a < bodyFrom) return null; parts.push(stmt.slice(from, t.a)); from = t.b; }
  parts.push(stmt.slice(from));
  const body = parts.map((p) => p.trim()).filter(Boolean);
  if (!body.length || (!compound && body.length < 2)) return null;
  if (body.some((p) => p.startsWith('#'))) return null;
  return compound ? `${stmt.slice(0, colon).trimEnd()}\n${body.map((p) => `    ${p}`).join('\n')}` : body.join('\n');
}

/** Run a whole program with minipy; keep a before / after snapshot for every step. */
function execute(src) {
  const c = compile(src, { filename: 'main.py' });
  if (!c.ok) return { ok: false, error: c.error, steps: [] };
  const run = createRun(c.program, { inputs: [], echoInput: true, eofWhenExhausted: true, maxSteps: MAX_STEPS, seed: 1 });
  const steps = [];
  let cur = null;
  for (let guard = 0; guard < MAX_STEPS * 8; guard++) {
    const ev = run.step();
    if (ev.kind === 'line') {
      const snap = run.snapshot();
      if (cur) { cur.after = snap; steps.push(cur); }
      cur = { line: ev.line, before: snap, out: '' };
    } else if (ev.kind === 'output') {
      if (cur && !ev.echo) cur.out += ev.text;
    } else if (ev.kind === 'exception') {
      const snap = run.snapshot();
      const e = ev.error;
      // (the step limit's error.line is the last step that ran, so it belongs to cur like any other error)
      if (cur) { cur.after = snap; cur.error = e; steps.push(cur); } else steps.push({ line: e.line || 1, before: snap, after: snap, out: '', error: e });
      cur = null;
      break;
    } else if (ev.kind === 'done') {
      if (cur) { cur.after = run.snapshot(); steps.push(cur); }
      cur = null;
      break;
    }
    if (run.status === 'done' || run.status === 'error') break;
  }
  if (cur) { cur.after = run.snapshot(); steps.push(cur); }
  return { ok: true, steps };
}

// ---------------------------------------------------------------------------------------------------------------
// A model of CPython 3.13's dict (Objects/dictobject.c): an index table of 2^k slots (EMPTY, DUMMY or the number of
// an entry) and an entries array in insertion order. Lookups follow do_lookup(): i = hash & mask, then
// perturb >>= 5; i = (5*i + perturb + 1) & mask until the key or an EMPTY slot. Inserts use find_empty_slot() (stops
// at EMPTY or DUMMY) and resize to the smallest table >= 3 * used when dk_usable (2/3 of the slots) is used up;
// del marks the slot DUMMY and empties the entry (holes stay until the next resize).
// ---------------------------------------------------------------------------------------------------------------
const EMPTY = -1;
const DUMMY = -2;
const M64 = (1n << 64n) - 1n;
const usableOf = (size) => Math.floor((2 * size) / 3);
function log2For(minsize) { let l = 3; while ((1 << l) < minsize) l++; return l; }
function newModel(log2 = 3) {
  const size = 1 << log2;
  return { size, idx: new Array(size).fill(EMPTY), ent: [], used: 0, usable: usableOf(size), big: 0 };
}
const cloneModel = (m) => ({ size: m.size, idx: m.idx.slice(), ent: m.ent.slice(), used: m.used, usable: m.usable, big: m.big });
const sigOf = (v) => `${v.type}|${v.repr}`;
const NUMERIC = new Set(['int', 'float', 'bool']);

const hashCache = new Map();
/** hash(key) as a BigInt, computed by minipy (null when the key is unhashable). */
function hashOf(kv) {
  const sig = sigOf(kv);
  if (hashCache.has(sig)) return hashCache.get(sig);
  let h = null;
  try {
    const r = evalExpression('hash(k)', { k: kv });
    if (r.ok && /^-?\d+$/.test(r.repr)) h = BigInt(r.repr);
  } catch { h = null; }
  if (hashCache.size > 4000) hashCache.clear();
  hashCache.set(sig, h);
  return h;
}
/** Python's == between two Views (identity first, as `in` does); false when it cannot be decided. */
function valEq(a, b) {
  if (a.type === b.type && a.repr === b.repr && (a.id === b.id || !a.id)) return true;
  try { const r = evalExpression('a == b', { a, b }); return r.ok && r.repr === 'True'; } catch { return false; }
}
function sameKey(rec, kv) {
  if (rec.k === kv.repr && rec.kt === kv.type) return true;
  if (!(NUMERIC.has(rec.kt) && NUMERIC.has(kv.type)) && rec.kt !== 'tuple') return false;
  try { const r = evalExpression('a == b', { a: rec.kv, b: kv }); return r.ok && r.repr === 'True'; } catch { return false; }
}
function lookup(m, kv, h) {
  const mask = BigInt(m.size - 1);
  let perturb = h & M64;
  let i = perturb & mask;
  const slots = [];
  for (let guard = 0; guard < 4 * m.size + 70; guard++) {
    const s = Number(i);
    slots.push(s);
    const ix = m.idx[s];
    if (ix >= 0) { const e = m.ent[ix]; if (e.h === h && sameKey(e, kv)) return { slots, ix }; } else if (ix === EMPTY) return { slots, ix: null };
    perturb >>= 5n;
    i = (i * 5n + perturb + 1n) & mask;
  }
  return { slots, ix: null };
}
function findEmpty(m, h) {
  const mask = BigInt(m.size - 1);
  let perturb = h & M64;
  let i = perturb & mask;
  for (let guard = 0; guard < 4 * m.size + 70 && m.idx[Number(i)] >= 0; guard++) {
    perturb >>= 5n;
    i = (i * 5n + perturb + 1n) & mask;
  }
  return Number(i);
}
function resize(m, log2) {
  const liveRecs = m.ent.filter(Boolean);
  const nm = newModel(log2);
  for (const e of liveRecs) { const s = findEmpty(nm, e.h); nm.idx[s] = nm.ent.length; nm.ent.push(e); }
  nm.used = liveRecs.length;
  nm.usable = usableOf(nm.size) - liveRecs.length;
  Object.assign(m, nm);
}
function insertRec(m, rec) {
  let resized = null;
  if (m.usable <= 0) { const from = m.size; resize(m, log2For(m.used * 3)); resized = { from, to: m.size }; }
  const s = findEmpty(m, rec.h);
  m.idx[s] = m.ent.length;
  m.ent.push(rec);
  m.used++;
  m.usable--;
  return { slot: s, resized };
}
function delSlot(m, s) {
  const ix = m.idx[s];
  if (ix < 0) return;
  m.ent[ix] = null;
  m.idx[s] = DUMMY;
  m.used--;
}
const mkRec = (kv, v) => ({ k: kv.repr, kt: kv.type, kv, h: hashOf(kv) ?? 0n, v });
const livePairs = (m) => { const out = []; m.ent.forEach((r, ix) => { if (r) out.push({ ...r, ix }); }); return out; };
const BIG = 160;
function modelFromView(view) {
  const ents = view.entries || [];
  if (view.truncated || ents.length > BIG) { const m = newModel(); m.big = view.truncated || ents.length; return m; }
  const m = newModel();
  for (const [k, v] of ents) insertRec(m, mkRec(k, v));
  return m;
}
/**
 * The model after the dict changed from `m` to `view`: removed keys become DUMMY, new keys are inserted in order.
 * popitem() also gives the popped entry's number back (CPython sets dk_nentries to it), so the next key reuses it.
 */
function applyDiff(m, view, clear, popitem) {
  const ents = view.entries || [];
  if (view.truncated || ents.length > BIG || m.big) return modelFromView(view);
  if (clear && !ents.length) return newModel();
  const nm = cloneModel(m);
  const recs = livePairs(nm);
  const aSig = ents.map(([k]) => sigOf(k));
  let p = 0;
  let s = 0;
  for (; s < aSig.length; s++) {
    let q = p;
    while (q < recs.length && `${recs[q].kt}|${recs[q].k}` !== aSig[s]) q++;
    if (q >= recs.length) break;
    p = q + 1;
  }
  const kept = new Set(aSig.slice(0, s));
  const gone = recs.filter((r) => !kept.has(`${r.kt}|${r.k}`));
  for (const r of gone) delSlot(nm, nm.idx.indexOf(r.ix));
  if (popitem && gone.length === 1 && nm.ent.slice(gone[0].ix).every((r) => !r)) nm.ent.length = gone[0].ix;
  for (let i = 0; i < s; i++) {
    const [k, v] = ents[i];
    const ix = nm.ent.findIndex((r) => r && r.k === k.repr && r.kt === k.type);
    if (ix >= 0 && (nm.ent[ix].v.repr !== v.repr || nm.ent[ix].v.type !== v.type)) nm.ent[ix] = { ...nm.ent[ix], v };
  }
  for (let i = s; i < ents.length; i++) insertRec(nm, mkRec(ents[i][0], ents[i][1]));
  return nm;
}
const modelSig = (m) => livePairs(m).map((r) => `${r.kt}|${r.k}=${r.v.type}|${r.v.repr}`).join('\u0001');
const viewSig = (v) => (v.entries || []).map(([k, x]) => `${sigOf(k)}=${sigOf(x)}`).join('\u0001');

// ---------------------------------------------------------------------------------------------------------------
// Finding the dictionary operations in one statement
// ---------------------------------------------------------------------------------------------------------------
const SKIP_TOK = new Set(['comment', 'newline', 'indent', 'dedent']);
const OPEN = new Set(['(', '[', '{']);
const CLOSE = new Set([')', ']', '}']);
const AUG = new Set(['+=', '-=', '*=', '/=', '//=', '%=', '**=', '|=', '&=', '^=', '<<=', '>>=', '@=']);
const isOp = (t, s) => !!t && t.type === 'op' && t.text === s;
const isKw = (t, s) => !!t && t.type === 'keyword' && t.text === s;
const isNameTok = (t) => !!t && (t.type === 'name' || t.type === 'builtin');

/**
 * Tokens of a statement with absolute offsets a..b into its text. An f-string stays one 'fstring' token; the
 * expression of each of its replacement fields comes separately in `fields` (tokens, up to a debug '=', a
 * conversion '!' or a format spec ':'), from tokenize's fstrings: 'split' parts.
 */
function toks(text) {
  const starts = [0];
  for (let i = 0; i < text.length; i++) if (text[i] === '\n') starts.push(i + 1);
  const out = [];
  const fields = [];
  let raw;
  try { raw = tokenize(text, { fstrings: 'split' }); } catch { return { ts: out, fields }; }
  const at = (t) => (starts[t.line - 1] ?? 0) + t.col;
  const tok = (t) => { const a = at(t); return { type: t.type, text: t.text, a, b: a + t.text.length }; };
  const isOpT = (t, s) => t.type === 'op' && t.text === s;
  // index of the fstring-end that closes the fstring-start at k
  const fEnd = (k) => {
    let d = 0;
    for (let j = k; j < raw.length; j++) {
      if (raw[j].type === 'fstring-start') d++;
      else if (raw[j].type === 'fstring-end' && --d === 0) return j;
    }
    return raw.length - 1;
  };
  // a nested f-string inside a field is one 'fstring' token there too
  const whole = (k, e) => { const a = at(raw[k]); const b = at(raw[e]) + raw[e].text.length; return { type: 'fstring', text: text.slice(a, b), a, b }; };
  for (let k = 0; k < raw.length; k++) {
    const t = raw[k];
    if (SKIP_TOK.has(t.type)) continue;
    if (t.type !== 'fstring-start') { out.push(tok(t)); continue; }
    const e = fEnd(k);
    out.push(whole(k, e));
    for (let j = k + 1; j < e; j++) {
      if (!isOpT(raw[j], '{')) continue;
      // one replacement field: its expression, then whatever follows it up to the matching '}'
      const line = raw[j].line;
      const fts = [];
      let d = 0;
      let multi = false;
      j++;
      for (; j < e; j++) {
        const x = raw[j];
        if (x.type === 'fstring-start') { const xe = fEnd(j); fts.push(whole(j, xe)); j = xe; continue; }
        if (x.type === 'op') {
          if (OPEN.has(x.text)) d++;
          else if (CLOSE.has(x.text)) { if (d === 0) break; d--; } else if (d === 0 && (x.text === '=' || x.text === '!' || x.text === ':')) break;
        }
        if (x.line !== line) multi = true;
        if (!SKIP_TOK.has(x.type)) fts.push(tok(x));
      }
      // skip the conversion and the format spec (nested fields included) to the field's closing brace
      for (let n = 0; j < e && !(n === 0 && isOpT(raw[j], '}')); j++) {
        if (raw[j].type === 'fstring-start') { j = fEnd(j); continue; }
        if (isOpT(raw[j], '{')) n++;
        else if (isOpT(raw[j], '}')) n--;
      }
      if (fts.length && !multi) fields.push(fts);
    }
    k = e;
  }
  return { ts: out, fields };
}
function closeOf(ts, k) {
  let d = 0;
  for (let j = k; j < ts.length; j++) {
    const t = ts[j];
    if (t.type !== 'op') continue;
    if (OPEN.has(t.text)) d++;
    else if (CLOSE.has(t.text)) { d--; if (d === 0) return j; }
  }
  return -1;
}
function splitTop(ts, a, b) {
  const parts = [];
  let d = 0;
  let s = a;
  for (let j = a; j < b; j++) {
    const t = ts[j];
    if (t.type !== 'op') continue;
    if (OPEN.has(t.text)) d++;
    else if (CLOSE.has(t.text)) d--;
    else if (t.text === ',' && d === 0) { parts.push([s, j]); s = j + 1; }
  }
  if (s < b) parts.push([s, b]);
  return parts;
}
const srcOf = (text, ts, i0, i1) => (i1 > i0 ? text.slice(ts[i0].a, ts[i1 - 1].b) : '');
const STOP_KW = new Set(['if', 'elif', 'while', 'and', 'or', 'not', 'return', 'assert', 'else', 'for', 'in', 'lambda', 'yield', 'del', 'is']);
/** Start index of the operand that ends just before token `end` (for `x in d`). */
function leftStart(ts, end) {
  let d = 0;
  for (let j = end - 1; j >= 0; j--) {
    const t = ts[j];
    if (t.type === 'op') {
      if (CLOSE.has(t.text)) { d++; continue; }
      if (OPEN.has(t.text)) { if (d === 0) return j + 1; d--; continue; }
      if (d === 0 && (t.text === ',' || t.text === '=' || t.text === ':' || t.text === ':=' || AUG.has(t.text) || ['==', '!=', '<', '>', '<=', '>='].includes(t.text))) return j + 1;
    } else if (d === 0 && t.type === 'keyword' && STOP_KW.has(t.text)) return j + 1;
  }
  return 0;
}
function depthAt(ts, k) {
  let d = 0;
  for (let j = 0; j < k; j++) { const t = ts[j]; if (t.type !== 'op') continue; if (OPEN.has(t.text)) d++; else if (CLOSE.has(t.text)) d--; }
  return d;
}
function enclosingCall(ts, k) {
  let d = 0;
  for (let j = k - 1; j >= 0; j--) {
    const t = ts[j];
    if (t.type !== 'op') continue;
    if (CLOSE.has(t.text)) d++;
    else if (OPEN.has(t.text)) {
      if (d === 0) return t.text === '(' && isNameTok(ts[j - 1]) && !isOp(ts[j - 2], '.') ? ts[j - 1].text : null;
      d--;
    }
  }
  return null;
}
const WHOLE_FUNCS = new Set(['print', 'list', 'dict', 'sorted', 'set', 'tuple', 'str', 'repr', 'sum', 'max', 'min', 'any', 'all', 'Counter', 'enumerate', 'reversed', 'zip']);
const OTHER_METHODS = new Set(['update', 'clear', 'popitem', 'copy', 'fromkeys', 'subtract', 'elements', 'total']);

/** The dictionary operations in one statement, in Python's evaluation order. */
function findOps(text, ts, dictNames, fields) {
  const ops = [];
  const scan = (ts, inField) => {
    let eqAt = -1;
    if (!inField) {
      let d = 0;
      for (let j = 0; j < ts.length; j++) {
        const t = ts[j];
        if (t.type !== 'op') continue;
        if (OPEN.has(t.text)) d++;
        else if (CLOSE.has(t.text)) d--;
        else if (d === 0 && (t.text === '=' || AUG.has(t.text))) eqAt = j;
      }
    }
    const isFor = !inField && isKw(ts[0], 'for');
    let forIn = -1;
    if (isFor) for (let j = 1; j < ts.length; j++) if (isKw(ts[j], 'in') && depthAt(ts, j) === 0) { forIn = j; break; }
    const isDel = !inField && isKw(ts[0], 'del');
    for (let k = 0; k < ts.length; k++) {
      const t = ts[k];
      if (t.type !== 'name' || !dictNames.has(t.text)) continue;
      const prev = ts[k - 1];
      const next = ts[k + 1];
      if (isOp(prev, '.')) continue;
      const base = { name: t.text, at: t.a };
      if (isOp(next, '[')) {
        const c = closeOf(ts, k + 1);
        if (c < 0) continue;
        const keySrc = srcOf(text, ts, k + 2, c);
        const after = ts[c + 1];
        const top = depthAt(ts, k) === 0;
        if (isDel && top) ops.push({ ...base, kind: 'del', keySrc, ord: k, src: `del ${text.slice(t.a, ts[c].b)}` });
        else if (top && eqAt > k && isOp(after, '=') && c + 1 === eqAt) ops.push({ ...base, kind: 'set', keySrc, ord: 1e6 + k, src: text.slice(t.a, ts[c].b) });
        else if (top && after && after.type === 'op' && AUG.has(after.text) && c + 1 === eqAt) {
          ops.push({ ...base, kind: 'get', keySrc, ord: k, src: text.slice(t.a, ts[c].b), aug: true });
          ops.push({ ...base, kind: 'set', keySrc, ord: 1e6 + k, src: text.slice(t.a, ts[c].b), aug: after.text });
        } else ops.push({ ...base, kind: 'get', keySrc, ord: k, src: text.slice(t.a, ts[c].b) });
        continue;
      }
      if (isOp(next, '.') && isNameTok(ts[k + 2]) && isOp(ts[k + 3], '(')) {
        const meth = ts[k + 2].text;
        const c = closeOf(ts, k + 3);
        if (c < 0) continue;
        const args = splitTop(ts, k + 4, c).map(([a, b]) => srcOf(text, ts, a, b));
        const src = text.slice(t.a, ts[c].b);
        const plain = args.every((x) => !/^\s*\w+\s*=[^=]/.test(x) && !/^\s*\*/.test(x));
        if ((meth === 'get' || meth === 'pop' || meth === 'setdefault') && args.length >= 1 && args.length <= 2 && plain) {
          ops.push({ ...base, kind: meth === 'get' ? 'getm' : meth, keySrc: args[0], defSrc: args[1], ord: k, src });
        } else if (meth === 'keys' || meth === 'values' || meth === 'items') {
          const after = ts[c + 1];
          const tail = isOp(after, '.') || isOp(after, '[') || isOp(after, '(');
          if (forIn >= 0 && k === forIn + 1 && isOp(after, ':')) ops.push({ ...base, kind: 'iter', meth, ord: k, src });
          else if (isKw(prev, 'in') && k - 1 !== forIn && !args.length && !tail && meth !== 'items') {
            // `x in d.keys()` hashes x like `x in d`; `x in d.values()` has no hash to use and compares the values in order
            const notIn = isKw(ts[k - 2], 'not');
            const end = notIn ? k - 2 : k - 1;
            const start = leftStart(ts, end);
            if (start >= end) continue;
            const keySrc = srcOf(text, ts, start, end);
            const src2 = text.slice(ts[start].a, ts[c].b);
            if (meth === 'keys') ops.push({ ...base, kind: notIn ? 'notin' : 'in', keySrc, ord: start, src: src2 });
            else ops.push({ ...base, kind: 'whole', meth, scan: true, valSrc: keySrc, notIn, ord: start, src: src2 });
          } else ops.push({ ...base, kind: 'whole', meth, ord: k, src });
        } else if (meth === 'most_common') ops.push({ ...base, kind: 'most', ord: k, src, arg: args[0] });
        else if (OTHER_METHODS.has(meth) || meth === 'pop' || meth === 'get' || meth === 'setdefault') ops.push({ ...base, kind: 'other', meth, ord: k, src });
        continue;
      }
      if (isKw(prev, 'in') && !(isOp(next, '.') || isOp(next, '[') || isOp(next, '('))) {
        if (k - 1 === forIn) { ops.push({ ...base, kind: 'iter', meth: 'keys', ord: k, src: t.text }); continue; }
        const notIn = isKw(ts[k - 2], 'not');
        const end = notIn ? k - 2 : k - 1;
        const start = leftStart(ts, end);
        if (start >= end) continue;
        const keySrc = srcOf(text, ts, start, end);
        ops.push({ ...base, kind: notIn ? 'notin' : 'in', keySrc, ord: start, src: text.slice(ts[start].a, t.b) });
        continue;
      }
      if (isOp(prev, '(') && isNameTok(ts[k - 2]) && ts[k - 2].text === 'len' && !isOp(ts[k - 3], '.') && isOp(next, ')')) {
        ops.push({ ...base, kind: 'len', ord: k, src: `len(${t.text})` });
        continue;
      }
      if ((isOp(next, ',') || isOp(next, ')')) && (isOp(prev, '(') || isOp(prev, ','))) {
        const fn = enclosingCall(ts, k);
        if (fn && WHOLE_FUNCS.has(fn)) ops.push({ ...base, kind: 'whole', fn, ord: k, src: isOp(prev, '(') && isOp(next, ')') ? `${fn}(${t.text})` : `${fn}(… ${t.text} …)` });
      }
    }
  };
  scan(ts, false);
  for (const f of fields || []) {
    const n0 = ops.length;
    scan(f, true);
    for (let j = n0; j < ops.length; j++) ops[j].ord = ts.findIndex((t) => t.b > ops[j].at) + 0.5;
  }
  return ops.sort((a, b) => a.ord - b.ord);
}

// Expressions that are safe to evaluate again outside the run (no input(), no user functions, no printing).
const SAFE_FUNCS = new Set(['len', 'abs', 'int', 'float', 'str', 'bool', 'min', 'max', 'round', 'sum', 'sorted', 'list', 'range', 'tuple', 'chr', 'ord', 'repr']);
const SAFE_METHODS = new Set(['upper', 'lower', 'strip', 'lstrip', 'rstrip', 'title', 'capitalize', 'replace', 'get', 'count', 'index', 'join', 'format', 'zfill', 'casefold']);
const SAFE_KW = new Set(['True', 'False', 'None', 'and', 'or', 'not', 'in', 'is', 'if', 'else']);
function safeExpr(src) {
  let raw;
  try { raw = tokenize(src); } catch { return null; }
  const ts = raw.filter((t) => !SKIP_TOK.has(t.type));
  if (!ts.length) return null;
  const names = new Set();
  for (let j = 0; j < ts.length; j++) {
    const t = ts[j];
    if (t.type === 'error') return null;
    if (t.type === 'keyword' && !SAFE_KW.has(t.text)) return null;
    if (t.type === 'op' && (t.text === ':=' || t.text === '=')) return null;
    if (isNameTok(t)) {
      const call = isOp(ts[j + 1], '(');
      const attr = isOp(ts[j - 1], '.');
      if (call && !(attr ? SAFE_METHODS.has(t.text) : (t.type === 'builtin' && SAFE_FUNCS.has(t.text)))) return null;
      if (!attr && t.type === 'name') names.add(t.text);
    }
  }
  return names;
}
/** Evaluate a key / default expression with the "before" variables: { ok, view } | { ok: false, error } | null. */
function evalSafe(src, vars) {
  const names = safeExpr(src);
  if (!names) return null;
  const v = {};
  for (const n of names) if (vars.has(n)) v[n] = vars.get(n);
  try {
    const r = evalExpression(src.trim(), v);
    if (r.ok) return { ok: true, view: r.value };
    return { ok: false, error: r.error };
  } catch { return null; }
}

function varsOf(snap) {
  const m = new Map();
  const fr = snap.frames;
  for (const l of fr[0].locals) m.set(l.name, l.value);
  if (fr.length > 1) for (const l of fr[fr.length - 1].locals) m.set(l.name, l.value);
  return m;
}
function dictViews(snap) {
  const m = new Map();
  for (const f of snap.frames) for (const l of f.locals) if (l.value && l.value.type === 'dict' && !m.has(l.value.id)) m.set(l.value.id, l.value);
  return m;
}
function bracketDepth(text) {
  let d = 0;
  try {
    for (const t of tokenize(text)) if (t.type === 'op') { if (OPEN.has(t.text)) d++; else if (CLOSE.has(t.text)) d--; }
  } catch { return 0; }
  return d;
}
/** The text of the statement that starts at line L (1-based), without its leading indentation. */
function stmtText(lines, L) {
  let text = lines[L - 1] ?? '';
  const ind = text.match(/^\s*/)[0].length;
  text = text.slice(ind);
  let i = L;
  while (bracketDepth(text) > 0 && i < lines.length && i < L + 60) { text += `\n${lines[i]}`; i++; }
  return text;
}
/** Last line of the block whose header is line L. */
function bodyEnd(lines, L) {
  const ind = (s) => s.match(/^ */)[0].length;
  const base = ind(lines[L - 1] || '');
  let end = L;
  for (let i = L; i < lines.length; i++) {
    const s = lines[i];
    if (!s.trim() || /^\s*#/.test(s)) continue;
    if (ind(s) <= base) break;
    end = i + 1;
  }
  return end;
}

const KEYED = new Set(['get', 'getm', 'in', 'notin', 'set', 'del', 'pop', 'setdefault']);
const MUTATING = new Set(['set', 'del', 'pop', 'setdefault', 'other']);
const NONE_VIEW = { type: 'NoneType', typeName: 'NoneType', repr: 'None', id: 0 };
const UNKNOWN_VIEW = { type: 'object', typeName: 'object', repr: '?', id: 0 };

/**
 * Analyse every step: which dictionary operations the line performs and what they did inside the dict.
 * Returns one plan per step: { line, text, focus, segs: [...], rest: { model, pairs, kind, repr } | null, ... }.
 */
function analyse(lines, steps, focus0) {
  const models = new Map();
  const plans = [];
  const loopJ = new Map();
  // the line each frame ran last: a for header reached from its own body is the next round of the loop, even when
  // the body called a function defined higher up in the file
  const lastInFrame = new Map();
  let focus = focus0;
  let focusId = null;
  let curIter = null;
  for (let s = 0; s < steps.length; s++) {
    const st = steps[s];
    const vb = varsOf(st.before);
    const va = varsOf(st.after);
    const frs = st.before.frames || [];
    const frameId = frs.length ? frs[frs.length - 1].id : 0;
    const prevLine = lastInFrame.get(frameId) ?? 0;
    lastInFrame.set(frameId, st.line);
    const text = stmtText(lines, st.line);
    const dictNames = new Set([...vb].filter(([, v]) => v && v.type === 'dict').map(([n]) => n));
    const { ts, fields } = toks(text);
    let ops = dictNames.size ? findOps(text, ts, dictNames, fields) : [];
    // `for k in sorted(d):` evaluates sorted(d) once, when the loop starts; the next rounds only take the next item
    const forCont = isKw(ts[0], 'for') && prevLine > st.line && prevLine <= bodyEnd(lines, st.line);
    if (forCont) ops = ops.filter((o) => o.kind === 'iter');
    let skipped = 0;
    const afterDicts = dictViews(st.after);
    const work = new Map();
    const getWork = (id) => {
      if (!work.has(id)) work.set(id, models.has(id) ? cloneModel(models.get(id)) : newModel());
      return work.get(id);
    };
    const segs = [];
    let predErr = null;
    const mutated = new Set();
    const cleared = new Set();
    const popped = new Set();
    for (const op of ops) {
      if (predErr) break;
      const dv = vb.get(op.name);
      if (!dv || dv.type !== 'dict') continue;
      const id = dv.id;
      const m = getWork(id);
      const kind = dv.typeName || 'dict';
      const seg = { op: op.kind, name: op.name, id, src: op.src, dkind: kind, aug: op.aug };
      if (m.big) { segs.push({ ...seg, kind: 'big', n: m.big, mIn: m, mOut: m, pairsIn: [], pairsOut: [] }); if (MUTATING.has(op.kind)) mutated.add(id); continue; }
      const mIn = cloneModel(m);
      const pairsIn = livePairs(mIn);
      const n = pairsIn.length;
      if (!KEYED.has(op.kind)) {
        if (op.kind === 'iter') {
          const L = st.line;
          const end = bodyEnd(lines, L);
          const lk = `${frameId}:${L}`;
          const cont = loopJ.has(lk) && forCont;
          const j = cont ? loopJ.get(lk) + 1 : 0;
          loopJ.set(lk, j);
          const nl = st.after.nextLine;
          const enters = !st.error && nl != null && nl > L && nl <= end;
          if (enters && j < n) segs.push({ ...seg, kind: 'iter', meth: op.meth, j, n, mIn, mOut: mIn, pairsIn, pairsOut: pairsIn, ix: pairsIn[j].ix });
          else segs.push({ ...seg, kind: 'iterEnd', meth: op.meth, n, mIn, mOut: mIn, pairsIn, pairsOut: pairsIn });
        } else if (op.kind === 'other') {
          if (op.meth === 'clear') cleared.add(id);
          if (op.meth === 'popitem') popped.add(id);
          if (['update', 'clear', 'popitem', 'subtract'].includes(op.meth)) mutated.add(id);
          segs.push({ ...seg, kind: 'generic', meth: op.meth, n, mIn, pairsIn });
        } else {
          const sc = {};
          if (op.scan) {
            // x in d.values(): the values are compared from the front until one is equal
            const x = evalSafe(op.valSrc, vb);
            if (x && x.ok) {
              const i = pairsIn.findIndex((p) => valEq(p.v, x.view));
              Object.assign(sc, { scan: true, upto: i >= 0 ? i + 1 : n, hit: i >= 0, vrepr: x.view.repr, notIn: op.notIn });
            }
          }
          segs.push({ ...seg, kind: op.kind, n, mIn, mOut: mIn, pairsIn, pairsOut: pairsIn, fn: op.fn, meth: op.meth, ...sc });
        }
        continue;
      }
      const key = evalSafe(op.keySrc, vb);
      if (!key) { segs.push({ ...seg, kind: 'unknown', n, mIn, mOut: mIn, pairsIn, pairsOut: pairsIn }); if (MUTATING.has(op.kind)) mutated.add(id); continue; }
      if (!key.ok) { predErr = key.error; segs.push({ ...seg, kind: 'error', error: key.error, n, mIn, mOut: mIn, pairsIn, pairsOut: pairsIn }); break; }
      const kv = key.view;
      const h = hashOf(kv);
      if (h == null) {
        predErr = { type: 'TypeError', message: `unhashable type: '${kv.typeName || kv.type}'` };
        segs.push({ ...seg, kind: 'error', unhashable: true, krepr: kv.repr, error: predErr, n, mIn, mOut: mIn, pairsIn, pairsOut: pairsIn });
        break;
      }
      const L = lookup(m, kv, h);
      const found = L.ix != null;
      const pos = found ? pairsIn.findIndex((p) => p.ix === L.ix) : -1;
      Object.assign(seg, {
        kind: 'lookup', krepr: kv.repr, kt: kv.type, h: BigInt.asIntN(64, h).toString(), size: m.size, slots: L.slots, found, ix: L.ix, pos, n,
        listSteps: found ? pos + 1 : n, dictSteps: L.slots.length, mIn, pairsIn,
      });
      const valOf = () => m.ent[L.ix].v;
      const evalDef = () => {
        if (op.defSrc == null) return NONE_VIEW;
        const d = evalSafe(op.defSrc, vb);
        return d && d.ok ? d.view : UNKNOWN_VIEW;
      };
      const afterVal = () => {
        // the key Python keeps is the one already in the dict (d[1] = 3 on a key 1.0 updates 1.0)
        const kr = found ? m.ent[L.ix].k : kv.repr;
        const kt = found ? m.ent[L.ix].kt : kv.type;
        const av = afterDicts.get(id);
        const e = av && (av.entries || []).find(([k]) => k.repr === kr && k.type === kt);
        return e ? e[1] : UNKNOWN_VIEW;
      };
      // A missing key that did not stop the step was never looked up: `k in d and d[k] > 80`, `d[k] if k in d else 0`
      // (Python short-circuits), so it is left out of the picture.
      const keyError = () => {
        if (!(st.error && st.error.type === 'KeyError' && st.error.message === kv.repr)) { seg.skip = true; return; }
        predErr = { type: 'KeyError', message: kv.repr };
        seg.outcome = 'keyerror';
      };
      switch (op.kind) {
        case 'get':
          if (found) { seg.outcome = 'value'; seg.result = valOf(); } else if (kind === 'Counter') { seg.outcome = 'zero'; seg.result = { type: 'int', typeName: 'int', repr: '0', id: 0 }; } else if (kind === 'defaultdict') { seg.kind = 'unknown'; mutated.add(id); } else keyError();
          break;
        case 'getm':
          if (found) { seg.outcome = 'value'; seg.result = valOf(); } else { seg.outcome = 'default'; seg.result = evalDef(); seg.hasDef = op.defSrc != null; }
          break;
        case 'in':
        case 'notin':
          seg.outcome = found ? 'yes' : 'no';
          seg.result = { type: 'bool', typeName: 'bool', repr: (found === (op.kind === 'in')) ? 'True' : 'False', id: 0 };
          break;
        case 'set':
        case 'setdefault': {
          if (found) {
            if (op.kind === 'setdefault') { seg.outcome = 'value'; seg.result = valOf(); break; }
            const nv = afterVal();
            const old = valOf();
            seg.outcome = 'update';
            seg.oldV = old;
            seg.newV = nv;
            seg.mutate = 'update';
            seg.slot = L.slots[L.slots.length - 1];
            m.ent[L.ix] = { ...m.ent[L.ix], v: nv };
          } else {
            const nv = op.kind === 'setdefault' ? evalDef() : afterVal();
            const r = insertRec(m, mkRec(kv, nv));
            seg.outcome = 'insert';
            seg.newV = nv;
            if (op.kind === 'setdefault') seg.result = nv;
            seg.mutate = 'insert';
            seg.slot = r.slot;
            seg.resize = r.resized;
            seg.newIx = m.ent.length - 1;
          }
          mutated.add(id);
          break;
        }
        case 'del':
        case 'pop':
          if (found) {
            seg.outcome = 'delete';
            seg.result = valOf();
            seg.mutate = 'delete';
            seg.slot = L.slots[L.slots.length - 1];
            delSlot(m, seg.slot);
            mutated.add(id);
          } else if (op.kind === 'pop' && op.defSrc != null) { seg.outcome = 'default'; seg.result = evalDef(); seg.hasDef = true; } else keyError();
          break;
        default:
          break;
      }
      if (seg.skip) { skipped++; continue; }
      seg.mOut = cloneModel(m);
      seg.pairsOut = livePairs(seg.mOut);
      segs.push(seg);
    }

    // Check the prediction against what Python really did.
    let ok = true;
    for (const id of mutated) {
      const av = afterDicts.get(id);
      if (av && (!work.has(id) || modelSig(work.get(id)) !== viewSig(av))) ok = false;
    }
    if (predErr) {
      const e = st.error;
      if (!e || e.type !== predErr.type || e.message !== predErr.message) ok = false;
    }
    let plainErr = null;
    if (!predErr && st.error) {
      // an error the analysis did not predict (e.g. TypeError in d[k] += 1 on a str value): keep the lookups
      // that ran before the first change, then show the error.
      plainErr = st.error;
      const firstMut = segs.findIndex((g) => g.mutate || g.kind === 'generic' || g.kind === 'unknown');
      if (firstMut >= 0) segs.length = firstMut;
      for (const id of mutated) work.delete(id);
      mutated.clear();
    }
    let finalSegs = segs;
    if (!ok) {
      finalSegs = segs.filter((g) => !MUTATING.has(g.op) && g.kind !== 'error' && g.outcome !== 'keyerror');
      for (const id of mutated) work.delete(id);
    }
    // Update the models: verified predictions are taken as they are, everything else by comparing the dicts.
    for (const [id, m] of work) if (ok && mutated.has(id)) models.set(id, m);
    const created = [];
    for (const [id, view] of afterDicts) {
      if (models.has(id)) {
        const cur = models.get(id);
        if (modelSig(cur) !== viewSig(view) || (cleared.has(id) && !(view.entries || []).length)) {
          const nm = applyDiff(cur, view, cleared.has(id), popped.has(id));
          models.set(id, nm);
          const touched = finalSegs.some((g) => g.id === id && (g.mutate || g.kind === 'generic'));
          if (!touched) {
            const name = [...va].find(([, v]) => v && v.id === id)?.[0];
            if (name) finalSegs.push({ kind: 'generic', name, id, dkind: view.typeName || 'dict', n: livePairs(cur).length, mIn: cloneModel(cur), pairsIn: livePairs(cur) });
          }
        }
      } else {
        models.set(id, modelFromView(view));
        const name = [...va].find(([, v]) => v && v.id === id)?.[0];
        if (name && vb.get(name)?.id !== id) created.push({ id, name, view });
      }
    }
    for (const g of finalSegs) {
      if (g.kind === 'generic') {
        const m = models.get(g.id);
        if (m) { g.mOut = cloneModel(m); g.pairsOut = livePairs(m); } else { g.mOut = g.mIn; g.pairsOut = g.pairsIn; }
      }
    }
    for (const c of created) {
      const m = models.get(c.id);
      const src = /Counter\s*\(/.test(text) && c.view.typeName === 'Counter' ? text.slice(text.indexOf('Counter')) : null;
      finalSegs.push({
        kind: 'create', name: c.name, id: c.id, dkind: c.view.typeName || 'dict', n: livePairs(m).length, big: m.big,
        mIn: newModel(), pairsIn: [], mOut: cloneModel(m), pairsOut: livePairs(m), counterSrc: src,
      });
    }
    if (plainErr || (!ok && st.error)) finalSegs.push({ kind: 'error', error: st.error, late: true });

    const last = [...finalSegs].reverse().find((g) => g.name);
    if (last) focus = last.name;
    let fv = va.get(focus);
    if (!(fv && fv.type === 'dict')) {
      // the name is gone (e.g. the parameter d of a function that has returned): keep showing the same dict under a
      // name that can still be used here, or else the preset's dict
      const alias = focusId != null ? [...va].find(([, v]) => v && v.type === 'dict' && v.id === focusId) : null;
      if (alias) focus = alias[0];
      else if (va.get(focus0)?.type === 'dict') focus = focus0;
      fv = va.get(focus);
    }
    if (fv && fv.type === 'dict') focusId = fv.id;
    // inside the body of a for loop over a dict: keep showing the current pair
    const itSeg = finalSegs.find((g) => g.kind === 'iter');
    const fra = st.after.frames || [];
    if (itSeg) curIter = { L: st.line, end: bodyEnd(lines, st.line), frame: frameId, name: itSeg.name, j: itSeg.j, ix: itSeg.ix, id: itSeg.id };
    else if (finalSegs.some((g) => g.kind === 'iterEnd') || (curIter && ((curIter.frame === frameId && (st.line <= curIter.L || st.line > curIter.end)) || !fra.some((f) => f.id === curIter.frame)))) curIter = null;
    let rest = null;
    if (fv && fv.type === 'dict' && models.has(fv.id)) {
      const m = models.get(fv.id);
      rest = { model: cloneModel(m), pairs: livePairs(m), dkind: fv.typeName || 'dict', repr: fv.repr, id: fv.id };
    }
    let hold = null;
    if (!finalSegs.length && curIter && !itSeg && curIter.name === focus && rest && rest.id === curIter.id) {
      const pr = rest.pairs[curIter.j];
      if (pr && pr.ix === curIter.ix) hold = { kind: 'iter', hold: true, name: focus, id: rest.id, dkind: rest.dkind, j: curIter.j, ix: curIter.ix, n: rest.pairs.length, mIn: rest.model, mOut: rest.model, pairsIn: rest.pairs, pairsOut: rest.pairs };
    }
    // dictionary operations ran on this line, but none of them could be replayed (e.g. inside a list comprehension)
    const unreplayed = ops.length > skipped && !finalSegs.length;
    plans.push({ line: st.line, text, out: st.out, error: st.error || null, segs: finalSegs, focus, rest, hold, verified: ok, unreplayed });
  }
  return plans;
}
// CORE-END

// ---------------------------------------------------------------------------------------------------------------
// Animation timing (seconds at 1×)
// ---------------------------------------------------------------------------------------------------------------
const TM = { hash: 0.5, mod: 0.4, probe: 0.42, cmp: 0.17, mut: 0.5, resize: 1.1, hold: 0.35, iter: 0.6, len: 0.8, whole0: 0.25, wholeEach: 0.07, createEach: 0.14, createMax: 3, generic: 0.7 };
function segTiming(g) {
  switch (g.kind) {
    case 'lookup': {
      const dS = TM.hash + TM.mod + g.slots.length * TM.probe;
      const lS = 0.15 + Math.max(1, g.listSteps) * TM.cmp;
      const dM = g.mutate ? (g.resize ? TM.resize : TM.mut) : 0;
      const lM = g.mutate ? TM.mut : 0;
      return { dS, lS, dM, lM, total: Math.max(dS + dM, lS + lM) + TM.hold };
    }
    case 'iter':
    case 'iterEnd': return { total: TM.iter };
    case 'len': return { total: TM.len };
    case 'whole':
    case 'most': return { total: TM.whole0 + Math.min(2.2, (g.upto ?? g.n) * TM.wholeEach) + TM.hold };
    case 'create': { const each = Math.min(TM.createEach, TM.createMax / Math.max(1, g.n)); return { each, total: 0.2 + g.n * each + TM.hold }; }
    default: return { total: TM.generic };
  }
}
function planAnim(plan) {
  const segs = plan ? plan.segs.filter((g) => g.kind !== 'error' || !g.late) : [];
  const times = segs.map(segTiming);
  let total = 0;
  const starts = times.map((t) => { const s = total; total += t.total; return s; });
  return { plan, segs, times, starts, total };
}
function animAt(A, t) {
  if (!A || !A.segs.length) return null;
  let k = A.segs.length - 1;
  for (let i = 0; i < A.segs.length; i++) if (t < A.starts[i] + A.times[i].total) { k = i; break; }
  return { g: A.segs[k], tm: A.times[k], u: Math.max(0, Math.min(t - A.starts[k], A.times[k].total)), k };
}

// ---------------------------------------------------------------------------------------------------------------
// Drawing
// ---------------------------------------------------------------------------------------------------------------
const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';
const SANS = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
const TYPE_COL = { int: '#60a5fa', float: '#2dd4bf', str: '#c3e88d', bool: '#f472b6', NoneType: '#94a3b8', list: '#fb923c', tuple: '#c4b5fd', dict: '#fcd34d', set: '#f0abfc', other: '#a5b4fc' };
const COL = {
  bg: '#0b1220', pane: '#0f172a', edge: '#1e2a44', cell: '#16213a', cellEdge: '#33415580', text: '#e2e8f0', muted: '#94a3b8',
  faint: '#7c8aa3', amber: '#fbbf24', green: '#34d399', red: '#f87171', orange: '#fb923c', cyan: '#67e8f9', grey: '#475569',
};
const ease = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
const lerp = (a, b, e) => a + (b - a) * e;
const tcol = (t) => TYPE_COL[t] || TYPE_COL.other;
function hexA(hex, a) {
  const n = parseInt(hex.slice(1, 7), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}
function rrect(ctx, x, y, w, h, r) {
  const rr = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}
const shorten = (s, n) => (s.length > n ? `${s.slice(0, Math.max(1, n - 1))}…` : s);
function ellipsize(ctx, s, maxW) {
  if (ctx.measureText(s).width <= maxW) return s;
  let lo = 0;
  let hi = s.length;
  while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (ctx.measureText(`${s.slice(0, mid)}…`).width <= maxW) lo = mid; else hi = mid - 1; }
  return lo > 0 ? `${s.slice(0, lo)}…` : '';
}
/** Short form of a (possibly huge) hash number so it fits `maxW`. */
function fitNumber(ctx, s, maxW) {
  if (ctx.measureText(s).width <= maxW) return s;
  for (let k = Math.floor(s.length / 2) - 1; k >= 2; k--) {
    const t = `${s.slice(0, k)}…${s.slice(-Math.max(2, k - 2))}`;
    if (ctx.measureText(t).width <= maxW) return t;
  }
  return `${s.slice(0, 3)}…`;
}

function panes(W, H) {
  const pad = 8;
  if (W >= 600) {
    const lw = Math.round((W - pad * 3) * 0.42);
    return { wide: true, list: { x: pad, y: pad, w: lw, h: H - 2 * pad }, dict: { x: pad * 2 + lw, y: pad, w: W - lw - pad * 3, h: H - 2 * pad } };
  }
  const lh = Math.round((H - pad * 3) * 0.42);
  return { wide: false, list: { x: pad, y: pad, w: W - 2 * pad, h: lh }, dict: { x: pad, y: pad * 2 + lh, w: W - 2 * pad, h: H - lh - pad * 3 } };
}
/** Canvas height that suits the width, the table size and the number of pairs. */
function wantHeight(W, size, n) {
  const tier = size >= 64 || n > 24 ? 3 : size >= 32 || n > 10 ? 2 : size >= 16 || n > 6 ? 1 : 0;
  if (W >= 600) return [270, 300, 340, 390][tier];
  return [400, 450, 530, 600][tier];
}

/** Grid of `count` cells for the list of pairs (column by column), with the font that fits best. */
function listLayout(pairs, count, R) {
  const n = Math.max(1, count);
  const kLen = Math.max(4, ...pairs.map((p) => Math.min(13, p.k.length)));
  const vLen = Math.max(2, ...pairs.map((p) => Math.min(9, p.v.repr.length)));
  const gap = 4;
  let best = null;
  for (let cols = 1; cols <= Math.min(n, 8); cols++) {
    const rows = Math.ceil(n / cols);
    const cw = Math.min(250, (R.w - gap * (cols - 1)) / cols);
    const ch = Math.min(28, (R.h - gap * (rows - 1)) / rows);
    if (ch < 9 || cw < 30) continue;
    const idxW = cw >= 84 && ch >= 13 ? 20 : 0;
    const tw = cw - idxW - 8;
    const one = Math.min(13, ch * 0.56, tw / ((kLen + vLen + 4) * 0.61));
    const two = ch >= 21 ? Math.min(11.5, (ch - 3) / 2.25, tw / (Math.max(kLen, vLen) * 0.61)) : 0;
    const key = Math.min(11.5, ch * 0.62, tw / (kLen * 0.61));
    let fs = one;
    let mode = 'one';
    if (two > fs * 1.2) { fs = two; mode = 'two'; }
    if (key > fs * 1.55) { fs = key; mode = 'key'; }
    const score = Math.min(fs, 12.5) + (mode === 'one' ? 0.8 : mode === 'two' ? 0.35 : 0) - cols * 0.02;
    if (!best || score > best.score) best = { cols, rows, cw, ch, gap, idxW, fs, mode, score };
  }
  if (!best) {
    const cols = Math.max(1, Math.ceil(Math.sqrt((n * R.w) / Math.max(1, R.h) / 3)));
    const rows = Math.ceil(n / cols);
    best = { cols, rows, cw: (R.w - gap * (cols - 1)) / cols, ch: Math.max(4, (R.h - gap * (rows - 1)) / rows), gap, idxW: 0, fs: 0, mode: 'dot' };
  }
  const gw = best.cols * best.cw + (best.cols - 1) * gap;
  best.x0 = R.x + (R.w - gw) / 2;
  best.y0 = R.y;
  return best;
}
function cellRect(L, i) {
  const col = Math.floor(i / L.rows);
  const row = i % L.rows;
  return { x: L.x0 + col * (L.cw + L.gap), y: L.y0 + row * (L.ch + L.gap), w: L.cw, h: L.ch };
}
/** Grid of the index table's slots (row by row), with the font that fits best. */
function slotLayout(size, pairs, R) {
  const kLen = Math.max(4, ...pairs.map((p) => Math.min(12, p.k.length)));
  let best = null;
  for (const cols of [2, 4, 8, 16, 32]) {
    if (cols > size) break;
    const rows = size / cols;
    const gap = cols >= 16 ? 3 : 4;
    const cw = Math.min(140, (R.w - gap * (cols - 1)) / cols);
    const ch = Math.min(48, cw * 0.8, (R.h - gap * (rows - 1)) / rows);
    if (ch < 7 || cw < 12) continue;
    const lab = ch >= 22 && cw >= 26;
    const top = lab ? 10 : 0;
    const two = ch - top >= 25;
    const fsKey = Math.min(12, (cw - 6) / (kLen * 0.61), two ? (ch - top - 3) / 2.3 : (ch - top) * 0.62);
    const score = fsKey + Math.min(ch, 44) / 30 - (rows > 3 * cols ? 2 : 0);
    if (!best || score > best.score) best = { cols, rows, cw, ch, gap, fs: fsKey, two, lab, top, score };
  }
  if (!best) { const cols = Math.min(size, 16); const rows = size / cols; best = { cols, rows, cw: (R.w - 2 * (cols - 1)) / cols, ch: Math.max(4, (R.h - 2 * (rows - 1)) / rows), gap: 2, fs: 0, two: false, lab: false, top: 0 }; }
  const gw = best.cols * best.cw + (best.cols - 1) * best.gap;
  best.x0 = R.x + (R.w - gw) / 2;
  best.y0 = R.y;
  best.size = size;
  return best;
}
const slotRect = (L, s) => ({ x: L.x0 + (s % L.cols) * (L.cw + L.gap), y: L.y0 + Math.floor(s / L.cols) * (L.ch + L.gap), w: L.cw, h: L.ch });
const lerpRect = (a, b, e) => ({ x: lerp(a.x, b.x, e), y: lerp(a.y, b.y, e), w: lerp(a.w, b.w, e), h: lerp(a.h, b.h, e) });

/** Draw key / value text inside a box: 'one' line, 'two' lines, 'key' only, or a dot. */
function drawPairText(ctx, r, rec, mode, fs, tuple, vOverride) {
  const k = shorten(rec.k, 13);
  const vRepr = vOverride ? vOverride.repr : rec.v.repr;
  const vType = vOverride ? vOverride.type : rec.v.type;
  const v = shorten(vRepr, 9);
  const cx = r.x + r.w / 2;
  const cy = r.y + r.h / 2;
  ctx.textBaseline = 'middle';
  if (mode === 'dot' || fs < 6.5) {
    ctx.fillStyle = tcol(rec.kt);
    ctx.beginPath();
    ctx.arc(cx, cy, Math.max(1.5, Math.min(4, r.h / 4, r.w / 4)), 0, Math.PI * 2);
    ctx.fill();
    return;
  }
  ctx.font = `${fs}px ${MONO}`;
  if (mode === 'one') {
    const parts = tuple ? [['(', COL.muted], [k, tcol(rec.kt)], [', ', COL.muted], [v, tcol(vType)], [')', COL.muted]] : [[k, tcol(rec.kt)], [': ', COL.muted], [v, tcol(vType)]];
    const tw = parts.reduce((s, [t]) => s + ctx.measureText(t).width, 0);
    let x = cx - tw / 2;
    ctx.textAlign = 'left';
    for (const [t, c] of parts) { ctx.fillStyle = c; ctx.fillText(t, x, cy + 0.5); x += ctx.measureText(t).width; }
  } else if (mode === 'two') {
    ctx.textAlign = 'center';
    const dy = fs * 0.62;
    ctx.fillStyle = tcol(rec.kt);
    ctx.fillText(ellipsize(ctx, k, r.w - 4), cx, cy - dy + 0.5);
    ctx.fillStyle = tcol(vType);
    ctx.fillText(ellipsize(ctx, v, r.w - 4), cx, cy + dy + 0.5);
  } else {
    ctx.textAlign = 'center';
    ctx.fillStyle = tcol(rec.kt);
    ctx.fillText(ellipsize(ctx, k, r.w - 4), cx, cy + 0.5);
  }
}

function paneFrame(ctx, R, title, sub, pill) {
  rrect(ctx, R.x, R.y, R.w, R.h, 10);
  ctx.fillStyle = COL.pane;
  ctx.fill();
  ctx.strokeStyle = COL.edge;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  let pw = 0;
  if (pill) {
    ctx.font = `600 11.5px ${SANS}`;
    pw = ctx.measureText(pill.text).width + 16;
    const px = R.x + R.w - pw - 8;
    rrect(ctx, px, R.y + 6, pw, 19, 9.5);
    ctx.fillStyle = hexA(pill.col, 0.16);
    ctx.fill();
    ctx.strokeStyle = hexA(pill.col, 0.75);
    ctx.stroke();
    ctx.fillStyle = pill.col;
    ctx.fillText(pill.text, px + 8, R.y + 16);
  }
  ctx.font = `600 13px ${SANS}`;
  ctx.fillStyle = COL.text;
  const room = R.w - 20 - (pw ? pw + 12 : 0);
  const t = ellipsize(ctx, title, room);
  ctx.fillText(t, R.x + 10, R.y + 16);
  if (sub) {
    const tx = R.x + 10 + ctx.measureText(t).width + 8;
    ctx.font = `11px ${MONO}`;
    ctx.fillStyle = COL.faint;
    const r2 = R.x + R.w - (pw ? pw + 16 : 10) - tx;
    if (r2 > 36) ctx.fillText(ellipsize(ctx, sub, r2), tx, R.y + 16);
  }
}
/** Height kept free for the footer: two lines on a narrow pane. */
const footH = (R) => (R.w < 460 ? 36 : 26);
function footer(ctx, R, text, col) {
  if (!text) return;
  ctx.font = `11.5px ${SANS}`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.fillStyle = col || COL.muted;
  const maxW = R.w - 20;
  if (footH(R) > 26 && ctx.measureText(text).width > maxW) {
    // wrap at a space into two lines
    let cut = text.length;
    while (cut > 1 && ctx.measureText(text.slice(0, cut)).width > maxW) cut--;
    const sp = text.lastIndexOf(' ', cut);
    if (sp > cut * 0.4) cut = sp;
    ctx.fillText(text.slice(0, cut).trim(), R.x + 10, R.y + R.h - 25);
    ctx.fillText(ellipsize(ctx, text.slice(cut).trim(), maxW), R.x + 10, R.y + R.h - 11);
    return;
  }
  ctx.fillText(ellipsize(ctx, text, maxW), R.x + 10, R.y + R.h - 12);
}
function arrow(ctx, x0, y0, x1, y1, col, bend, trim) {
  const len = Math.hypot(x1 - x0, y1 - y0) || 1;
  if (trim) {
    const t = Math.min(trim, len * 0.3) / len;
    [x0, y0, x1, y1] = [x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, x1 - (x1 - x0) * t, y1 - (y1 - y0) * t];
  }
  const nx = -(y1 - y0) / len;
  const ny = (x1 - x0) / len;
  const off = (bend || 0) * Math.min(28, len * 0.22);
  const mx = (x0 + x1) / 2 + nx * off;
  const my = (y0 + y1) / 2 + ny * off;
  ctx.strokeStyle = col;
  ctx.fillStyle = col;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.quadraticCurveTo(mx, my, x1, y1);
  ctx.stroke();
  const a = Math.atan2(y1 - my, x1 - mx);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x1 - 7 * Math.cos(a - 0.4), y1 - 7 * Math.sin(a - 0.4));
  ctx.lineTo(x1 - 7 * Math.cos(a + 0.4), y1 - 7 * Math.sin(a + 0.4));
  ctx.closePath();
  ctx.fill();
}

const STATE_COL = { cmp: COL.amber, probe: COL.amber, passed: COL.grey, found: COL.green, new: COL.green, miss: COL.red, del: COL.red, iter: COL.amber, seen: COL.cyan, read: COL.cyan, upd: COL.green };
function cellBox(ctx, r, state, alpha, dashed) {
  ctx.globalAlpha = alpha;
  rrect(ctx, r.x, r.y, r.w, r.h, Math.min(6, r.h / 3));
  const sc = state ? STATE_COL[state] : null;
  ctx.fillStyle = sc && state !== 'passed' ? hexA(sc, state === 'seen' || state === 'read' ? 0.1 : 0.17) : COL.cell;
  ctx.fill();
  ctx.lineWidth = sc && state !== 'passed' ? 2 : 1;
  ctx.strokeStyle = sc && state !== 'passed' ? sc : '#33415599';
  if (dashed) ctx.setLineDash([4, 3]);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;
}

/** The scene for the current moment: which dict is drawn, which segment plays and how far it is. */
function drawScene(ctx, W, H, sc, T) {
  ctx.fillStyle = COL.bg;
  ctx.fillRect(0, 0, W, H);
  const P = panes(W, H);
  drawListPane(ctx, P.list, sc, T);
  drawDictPane(ctx, P.dict, sc, T);
}

function listState(sc) {
  // { pairsA, pairsB, e (0..1 morph A→B), states: Map(sig→state), count, countLabel, foot, footCol, vOld }
  const g = sc.g;
  const u = sc.u;
  if (!g) {
    const pairs = sc.rest ? sc.rest.pairs : [];
    return { pairsA: pairs, pairsB: pairs, e: 1, states: new Map(), count: null };
  }
  const sig = (p) => `${p.kt}|${p.k}`;
  const st = new Map();
  const A = g.pairsIn || [];
  const B = g.pairsOut || A;
  switch (g.kind) {
    case 'lookup': {
      const tm = sc.tm;
      const q = Math.min(g.listSteps - 1, Math.floor((u - 0.15) / TM.cmp));
      const searching = u < tm.lS;
      const cmpN = searching ? Math.max(0, Math.min(g.listSteps, q + 1)) : g.listSteps;
      if (searching) {
        for (let i = 0; i < Math.min(q, A.length); i++) st.set(sig(A[i]), 'passed');
        if (q >= 0 && A[q]) st.set(sig(A[q]), 'cmp');
      } else {
        for (let i = 0; i < (g.found ? g.pos : A.length); i++) st.set(sig(A[i]), 'passed');
        if (g.found) st.set(sig(A[g.pos]), g.mutate === 'delete' ? 'del' : g.mutate === 'update' ? 'upd' : 'found');
      }
      let e = 1;
      let pairsB = A;
      if (g.mutate && !searching) {
        e = ease(clamp01((u - tm.lS) / tm.lM));
        pairsB = B;
        if (g.mutate === 'insert') st.set(`${g.kt}|${g.krepr}`, 'new');
      }
      const vOld = g.mutate === 'update' && A[g.pos] ? { sig: sig(A[g.pos]), old: g.oldV, nw: g.newV } : null;
      return { pairsA: A, pairsB, e, states: st, count: cmpN, searching, vOld };
    }
    case 'iter': {
      for (let i = 0; i < g.j; i++) st.set(sig(A[i]), 'seen');
      st.set(sig(A[g.j]), 'iter');
      return { pairsA: A, pairsB: A, e: 1, states: st, count: g.j + 1 };
    }
    case 'iterEnd': for (const p of A) st.set(sig(p), 'seen'); return { pairsA: A, pairsB: A, e: 1, states: st, count: A.length };
    case 'whole':
    case 'most': {
      const cnt = Math.min(A.length, g.upto ?? g.n);
      const k = Math.min(cnt - 1, Math.floor((u - TM.whole0) / Math.max(1e-6, Math.min(2.2, cnt * TM.wholeEach) / Math.max(1, cnt))));
      for (let i = 0; i < A.length; i++) if (i <= k) st.set(sig(A[i]), g.scan && g.hit && i === cnt - 1 && k === cnt - 1 ? 'found' : 'read');
      return { pairsA: A, pairsB: A, e: 1, states: st, count: Math.max(0, Math.min(cnt, k + 1)) };
    }
    case 'create': {
      const k = Math.floor((u - 0.2) / sc.tm.each);
      const shown = B.slice(0, Math.max(0, Math.min(B.length, k + 1)));
      if (k >= 0 && k < B.length) st.set(sig(B[k]), 'new');
      return { pairsA: shown, pairsB: shown, e: 1, states: st, count: shown.length, reserve: B.length };
    }
    case 'generic': return { pairsA: A, pairsB: B, e: ease(clamp01(u / TM.generic)), states: st, count: null };
    default: return { pairsA: A, pairsB: A, e: 1, states: st, count: null };
  }
}

function drawListPane(ctx, R, sc, T) {
  const g = sc.g;
  const ls = listState(sc);
  let pill = null;
  if (g && g.kind === 'lookup') pill = { text: T(`comparisons: ${ls.count}`, `perbandingan: ${ls.count}`), col: COL.orange };
  else if (g && g.scan) pill = { text: T(`values compared: ${ls.count}`, `nilai dibandingkan: ${ls.count}`), col: COL.orange };
  else if (g && (g.kind === 'whole' || g.kind === 'most')) pill = { text: T(`pairs read: ${ls.count}`, `pasangan dibaca: ${ls.count}`), col: COL.cyan };
  else if (g && g.kind === 'iter') pill = { text: T(`pair ${g.j + 1} of ${g.n}`, `pasangan ${g.j + 1} dari ${g.n}`), col: COL.amber };
  else if (g && g.kind === 'len') pill = { text: T('compared: 0', 'dibandingkan: 0'), col: COL.green };
  paneFrame(ctx, R, T('List of pairs', 'List pasangan'), T('[(key, value), …]', '[(kunci, nilai), …]'), pill);
  const body = { x: R.x + 8, y: R.y + 32, w: R.w - 16, h: R.h - 32 - footH(R) };
  if (!sc.exists && !g) {
    ctx.font = `12.5px ${SANS}`;
    ctx.fillStyle = COL.muted;
    ctx.textAlign = 'center';
    ctx.fillText(T('(no pairs yet)', '(belum ada pasangan)'), R.x + R.w / 2, body.y + body.h / 2);
    return;
  }
  const bigM = (g && g.mIn && g.mIn.big) || (!g && sc.rest && sc.rest.model.big);
  if (bigM) {
    ctx.font = `12.5px ${SANS}`;
    ctx.fillStyle = COL.muted;
    ctx.textAlign = 'center';
    ctx.fillText(T(`${bigM} pairs: too many to draw`, `${bigM} pasangan: terlalu banyak untuk digambar`), R.x + R.w / 2, body.y + body.h / 2);
    return;
  }
  const sig = (p) => `${p.kt}|${p.k}`;
  const all = [...ls.pairsA];
  for (const p of ls.pairsB) if (!ls.pairsA.some((q) => sig(q) === sig(p))) all.push(p);
  const count = Math.max(ls.pairsA.length, ls.pairsB.length, ls.reserve || 0);
  const L = listLayout(all, count, body);
  const idxA = new Map(ls.pairsA.map((p, i) => [sig(p), i]));
  const idxB = new Map(ls.pairsB.map((p, i) => [sig(p), i]));
  if (!count || (!ls.pairsA.length && !ls.pairsB.length)) {
    ctx.font = `12.5px ${SANS}`;
    ctx.fillStyle = COL.muted;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(T('[ ]  empty: no pairs', '[ ]  kosong: belum ada pasangan'), R.x + R.w / 2, body.y + Math.min(body.h / 2, 40));
  }
  for (const p of all) {
    const s = sig(p);
    const ia = idxA.get(s);
    const ib = idxB.get(s);
    let r;
    let alpha = 1;
    if (ia != null && ib != null) r = lerpRect(cellRect(L, ia), cellRect(L, ib), ls.e);
    else if (ia != null) { r = cellRect(L, ia); alpha = 1 - ls.e; } else { r = cellRect(L, ib); alpha = ls.e; }
    if (alpha <= 0.01) continue;
    const state = ls.states.get(s);
    cellBox(ctx, r, state, alpha * (state === 'passed' ? 0.55 : 1));
    ctx.globalAlpha = alpha * (state === 'passed' ? 0.5 : 1);
    let tr = r;
    if (L.idxW) {
      ctx.font = `10px ${MONO}`;
      ctx.fillStyle = COL.faint;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const i = ib != null && ls.e > 0.5 ? ib : ia ?? ib;
      ctx.fillText(String(i), r.x + L.idxW / 2 + 1, r.y + r.h / 2 + 0.5);
      ctx.strokeStyle = '#33415599';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(r.x + L.idxW + 1, r.y + 4); ctx.lineTo(r.x + L.idxW + 1, r.y + r.h - 4); ctx.stroke();
      tr = { x: r.x + L.idxW + 2, y: r.y, w: r.w - L.idxW - 2, h: r.h };
    }
    let vo = null;
    if (ls.vOld && ls.vOld.sig === s) vo = ls.e < 0.5 ? ls.vOld.old : ls.vOld.nw;
    drawPairText(ctx, tr, p, L.mode, L.fs, true, vo);
    let room = 0;
    if (state === 'passed' && L.fs >= 6.5 && L.mode !== 'key') {
      ctx.font = `${L.fs}px ${MONO}`;
      const txt = L.mode === 'one' ? `(${shorten(p.k, 13)}, ${shorten(p.v.repr, 9)})` : shorten(p.k, 13);
      room = (tr.w - ctx.measureText(txt).width) / 2;
    }
    if (state === 'passed' && room >= 13) {
      ctx.globalAlpha = alpha * 0.9;
      ctx.font = `600 ${Math.min(12, r.h * 0.6)}px ${SANS}`;
      ctx.fillStyle = COL.red;
      ctx.textAlign = 'right';
      ctx.fillText('≠', r.x + r.w - 4, r.y + r.h / 2 + 0.5);
    }
    ctx.globalAlpha = 1;
  }
  // footer
  let foot = '';
  let fcol = COL.muted;
  const n = ls.pairsB.length;
  if (g && g.kind === 'lookup') {
    const K = shorten(g.krepr, 16);
    if (ls.searching) foot = ls.count ? T(`pair ${ls.count}: is its key == ${K}?`, `pasangan ${ls.count}: apakah kuncinya == ${K}?`) : T('start at pair 0', 'mulai dari pasangan 0');
    else if (g.found) { foot = T(`found at index ${g.pos} after ${g.listSteps} comparison${g.listSteps === 1 ? '' : 's'}`, `ketemu di indeks ${g.pos} setelah ${g.listSteps} perbandingan`); fcol = COL.green; } else { foot = !g.n ? T('not found: the list is empty', 'tidak ketemu: list masih kosong') : g.n === 1 ? T('not found: 1 pair compared', 'tidak ketemu: 1 pasangan dibandingkan') : T(`not found: all ${g.n} pairs compared`, `tidak ketemu: semua ${g.n} pasangan dibandingkan`); fcol = g.outcome === 'keyerror' ? COL.red : COL.orange; }
    if (!ls.searching && g.mutate === 'insert') { foot = T(`${g.n} compared, then the new pair is appended`, `${g.n} dibandingkan, lalu pasangan baru ditambahkan di akhir`); fcol = COL.green; }
    if (!ls.searching && g.mutate === 'delete') { const sh = g.n - g.pos - 1; foot = T(`removed; ${sh} pair${sh === 1 ? '' : 's'} after it shift forward`, `dihapus; ${sh} pasangan di belakangnya bergeser maju`); fcol = COL.orange; }
  } else if (g && g.kind === 'iter') foot = T(`for: index ${g.j}, in the order the pairs were added`, `for: indeks ${g.j}, sesuai urutan pasangan ditambahkan`);
  else if (g && g.kind === 'iterEnd') foot = T('every pair visited: the loop ends', 'semua pasangan sudah dikunjungi: perulangan selesai');
  else if (g && g.kind === 'len') { foot = T(`len = ${g.n}: stored, nothing compared`, `len = ${g.n}: tersimpan, tidak ada yang dibandingkan`); fcol = COL.green; } else if (g && g.scan) foot = g.hit ? T(`value found at pair ${g.upto} of ${g.n}`, `nilai ketemu di pasangan ke-${g.upto} dari ${g.n}`) : T(`value not found: all ${g.n} compared`, `nilai tidak ketemu: semua ${g.n} dibandingkan`);
  else if (g && (g.kind === 'whole' || g.kind === 'most')) foot = T(`reads all ${g.n} pairs from the front`, `membaca semua ${g.n} pasangan dari depan`);
  else foot = T(`${n} pair${n === 1 ? '' : 's'} · a search starts at index 0`, `${n} pasangan · pencarian mulai dari indeks 0`);
  footer(ctx, R, foot, fcol);
}

function dictState(sc) {
  const g = sc.g;
  const u = sc.u;
  if (!g) {
    const m = sc.rest ? sc.rest.model : null;
    return { mA: m, mB: m, e: 1, states: new Map(), arrows: [], hash: null };
  }
  const st = new Map();
  const A = g.mIn;
  const B = g.mOut || A;
  switch (g.kind) {
    case 'lookup': {
      const tm = sc.tm;
      const tp = u - TM.hash - TM.mod;
      const searching = u < tm.dS;
      const p = searching ? Math.floor(tp / TM.probe) : g.slots.length - 1;
      const probes = Math.max(0, Math.min(g.slots.length, p + 1));
      const shown = g.slots.slice(0, probes);
      for (let i = 0; i < shown.length - 1; i++) if (shown[i] !== shown[shown.length - 1]) st.set(shown[i], 'passed');
      const last = shown[shown.length - 1];
      if (last != null) {
        if (searching) st.set(last, 'probe');
        else if (g.found) st.set(last, g.mutate === 'delete' ? 'del' : g.mutate === 'update' ? 'upd' : 'found');
        else st.set(last, g.mutate === 'insert' ? 'probe' : 'miss');
      }
      let e = 1;
      let mB = A;
      let newSlot = null;
      if (g.mutate && !searching) {
        e = ease(clamp01((u - tm.dS) / tm.dM));
        mB = B;
        if (g.mutate === 'insert') { newSlot = g.slot; if (!g.resize) st.set(g.slot, 'new'); }
      }
      return {
        mA: A, mB, e, states: st, probes, searching, newSlot, resizing: !!(g.resize && !searching), hashA: clamp01(u / TM.hash),
        modA: clamp01((u - TM.hash) / TM.mod), count: probes, vOld: g.mutate === 'update' ? { slot: g.slot, old: g.oldV, nw: g.newV } : null,
      };
    }
    case 'iter': {
      const pairs = livePairs(A);
      for (let i = 0; i < g.j; i++) st.set(A.idx.indexOf(pairs[i].ix), 'seen');
      st.set(A.idx.indexOf(g.ix), 'iter');
      return { mA: A, mB: A, e: 1, states: st };
    }
    case 'iterEnd': { for (const p of livePairs(A)) st.set(A.idx.indexOf(p.ix), 'seen'); return { mA: A, mB: A, e: 1, states: st }; }
    case 'whole':
    case 'most': {
      const pairs = livePairs(A);
      const cnt = Math.min(pairs.length, g.upto ?? g.n);
      const k = Math.min(cnt - 1, Math.floor((u - TM.whole0) / Math.max(1e-6, Math.min(2.2, cnt * TM.wholeEach) / Math.max(1, cnt))));
      pairs.forEach((q, i) => { if (i <= k) st.set(A.idx.indexOf(q.ix), g.scan && g.hit && i === cnt - 1 && k === cnt - 1 ? 'found' : 'read'); });
      return { mA: A, mB: A, e: 1, states: st, count: Math.max(0, Math.min(cnt, k + 1)) };
    }
    case 'create': {
      const k = Math.floor((u - 0.2) / sc.tm.each);
      const pairs = livePairs(B);
      const hide = new Set(pairs.slice(Math.max(0, k + 1)).map((q) => q.ix));
      if (k >= 0 && k < pairs.length) st.set(B.idx.indexOf(pairs[k].ix), 'new');
      return { mA: B, mB: B, e: 1, states: st, hide, count: Math.max(0, Math.min(pairs.length, k + 1)) };
    }
    case 'generic': return { mA: A, mB: B, e: ease(clamp01(u / TM.generic)), states: st };
    default: return { mA: A, mB: A, e: 1, states: st };
  }
}

function drawDictPane(ctx, R, sc, T) {
  const g = sc.g;
  const ds = dictState(sc);
  const dkind = g ? g.dkind : sc.rest ? sc.rest.dkind : 'dict';
  const name = g ? g.name : sc.name;
  let pill = null;
  if (g && g.kind === 'lookup') pill = { text: T(`slots checked: ${ds.count}`, `slot diperiksa: ${ds.count}`), col: COL.green };
  else if (g && g.scan) pill = { text: T(`values compared: ${ds.count}`, `nilai dibandingkan: ${ds.count}`), col: COL.orange };
  else if (g && (g.kind === 'whole' || g.kind === 'most')) pill = { text: T(`pairs read: ${ds.count}`, `pasangan dibaca: ${ds.count}`), col: COL.cyan };
  else if (g && g.kind === 'iter') pill = { text: T(`entry #${g.ix}`, `entri #${g.ix}`), col: COL.amber };
  else if (g && g.kind === 'len') pill = { text: T('slots checked: 0', 'slot diperiksa: 0'), col: COL.green };
  else if (g && g.kind === 'create') pill = { text: T(`placed: ${ds.count}`, `ditempatkan: ${ds.count}`), col: COL.green };
  const m0 = ds.mB || ds.mA;
  paneFrame(ctx, R, name || 'dict', m0 ? `${dkind} · ${T(`${m0.size} slots`, `${m0.size} slot`)}` : dkind, pill);
  const hashH = 42;
  const body = { x: R.x + 8, y: R.y + 30 + hashH, w: R.w - 16, h: R.h - 30 - hashH - footH(R) };
  if (!m0) {
    ctx.font = `12.5px ${SANS}`;
    ctx.fillStyle = COL.muted;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(T(`${name} does not exist yet: press Step`, `${name} belum ada: tekan Langkah`), R.x + R.w / 2, R.y + R.h / 2);
    return;
  }
  if (m0.big) {
    ctx.font = `12.5px ${SANS}`;
    ctx.fillStyle = COL.muted;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(T(`${m0.big} pairs: too many to draw`, `${m0.big} pasangan: terlalu banyak untuk digambar`), R.x + R.w / 2, R.y + R.h / 2);
    return;
  }
  const pairsA = livePairs(ds.mA);
  const pairsB = ds.mB === ds.mA ? pairsA : livePairs(ds.mB);
  const LA = slotLayout(ds.mA.size, [...pairsA, ...pairsB], body);
  const LB = ds.mB.size === ds.mA.size ? LA : slotLayout(ds.mB.size, [...pairsA, ...pairsB], body);
  const LG = ds.resizing ? LB : LA;
  const grid = ds.resizing ? ds.mB : (ds.e >= 1 ? ds.mB : ds.mA);
  // slots (empty / deleted / occupied boxes)
  for (let s = 0; s < grid.size; s++) {
    const r = slotRect(LG, s);
    const ix = grid.idx[s];
    let state = ds.states.get(s);
    if (ds.resizing) state = s === ds.newSlot ? 'new' : null;
    const delNow = !!(g && g.mutate === 'delete' && s === g.slot && !ds.searching);
    const dummyNow = ix === DUMMY || delNow;
    cellBox(ctx, r, state, 1, ix === EMPTY);
    if (LG.lab) {
      ctx.font = `${LG.ch >= 30 ? 9.5 : 8.5}px ${MONO}`;
      ctx.fillStyle = COL.faint;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(String(s), r.x + 3, r.y + 2);
    }
    if (dummyNow) {
      let a = 1;
      if (g && g.mutate === 'delete' && s === g.slot) a = ds.e;
      ctx.globalAlpha = a;
      ctx.fillStyle = COL.muted;
      ctx.font = `600 ${Math.max(9, Math.min(15, r.h * 0.5))}px ${SANS}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const cy = r.y + LG.top + (r.h - LG.top) / 2;
      ctx.fillText('×', r.x + r.w / 2, cy + (LG.two ? -5 : 0));
      if (LG.two && r.w > 44) { ctx.font = `9px ${SANS}`; ctx.fillText(T('deleted', 'dihapus'), r.x + r.w / 2, cy + 7); }
      ctx.globalAlpha = 1;
    }
  }
  // entries: drawn in their slot (moving from the old slot to the new one while the table grows)
  const sig = (p) => `${p.kt}|${p.k}`;
  const slotA = new Map(pairsA.map((p) => [sig(p), ds.mA.idx.indexOf(p.ix)]));
  const slotB = new Map(pairsB.map((p) => [sig(p), ds.mB.idx.indexOf(p.ix)]));
  const recs = [...pairsA];
  for (const p of pairsB) if (!slotA.has(sig(p))) recs.push(p);
  const tFs = LG.fs;
  for (const p of recs) {
    if (ds.hide && ds.hide.has(p.ix)) continue;
    const s = sig(p);
    const sa = slotA.get(s);
    const sb = slotB.get(s);
    let r;
    let alpha = 1;
    let e = ds.e;
    if (ds.resizing) e = ease(clamp01(ds.e * 1.25));
    if (sa != null && sb != null) r = sa === sb && LA === LB ? slotRect(LA, sa) : lerpRect(slotRect(LA, sa), slotRect(LB, sb), e);
    else if (sa != null) { r = slotRect(LA, sa); alpha = 1 - ds.e; } else { r = slotRect(LB, sb); alpha = ds.resizing ? clamp01(ds.e * 2 - 1) : ds.e; }
    if (alpha <= 0.01) continue;
    const pr = { x: r.x + 1, y: r.y + LG.top, w: r.w - 2, h: r.h - LG.top };
    let vo = null;
    if (ds.vOld && (sa === ds.vOld.slot)) vo = ds.e < 0.5 ? ds.vOld.old : ds.vOld.nw;
    ctx.globalAlpha = alpha;
    const passed = ds.states.get(sa) === 'passed';
    if (passed) ctx.globalAlpha = alpha * 0.55;
    drawPairText(ctx, pr, p, LG.two ? 'two' : 'key', tFs, false, vo);
    if (LG.lab && LG.cw >= 34) {
      ctx.font = `${LG.ch >= 30 ? 9 : 8.5}px ${MONO}`;
      ctx.fillStyle = COL.faint;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';
      ctx.fillText(`#${p.ix}`, r.x + r.w - 3, r.y + 2);
    }
    ctx.globalAlpha = 1;
  }
  // slots too small for text: a callout names the key in the slot Python is looking at
  if (LG.fs < 6.5 && g && (g.kind === 'lookup' || g.kind === 'iter')) {
    let sl = null;
    let mm = grid;
    if (g.kind === 'iter') { mm = ds.mA; sl = ds.mA.idx.indexOf(g.ix); } else if (g.mutate === 'insert' && !ds.searching) { mm = ds.mB; sl = g.slot; } else if (ds.probes > 0) { mm = g.mutate === 'update' && !ds.searching ? ds.mB : ds.mA; sl = g.slots[ds.probes - 1]; }
    if (sl != null && sl >= 0) {
      const ixs = mm.idx[sl];
      const rec = ixs >= 0 ? mm.ent[ixs] : null;
      const txt = rec ? `${shorten(rec.k, 12)}: ${shorten(rec.v.repr, 8)}` : (g.krepr ? `${shorten(g.krepr, 12)} ?` : '');
      if (txt) {
        const r = slotRect(LG, sl);
        ctx.font = `10.5px ${MONO}`;
        const w = ctx.measureText(txt).width + 12;
        const x = Math.max(R.x + 4, Math.min(R.x + R.w - 4 - w, r.x + r.w / 2 - w / 2));
        const y = r.y - 20 >= body.y - 4 ? r.y - 20 : r.y + r.h + 3;
        const st = ds.states.get(sl);
        rrect(ctx, x, y, w, 17, 6);
        ctx.fillStyle = '#1e293b';
        ctx.fill();
        ctx.strokeStyle = st && STATE_COL[st] ? STATE_COL[st] : COL.amber;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.fillStyle = rec ? tcol(rec.kt) : COL.text;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(txt, x + w / 2, y + 9);
      }
    }
  }
  // hash line + probe arrows
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  const hy1 = R.y + 38;
  const hy2 = R.y + 55;
  if (g && g.kind === 'lookup') {
    ctx.globalAlpha = Math.max(0.15, ds.hashA);
    ctx.font = `11.5px ${MONO}`;
    const lead = `hash(${shorten(g.krepr, 18)}) = `;
    ctx.fillStyle = COL.text;
    ctx.fillText(lead, R.x + 10, hy1);
    const lw = ctx.measureText(lead).width;
    ctx.fillStyle = COL.cyan;
    const hs = fitNumber(ctx, g.h, R.w - 20 - lw);
    ctx.fillText(hs, R.x + 10 + lw, hy1);
    ctx.globalAlpha = 1;
    let numX = R.x + 40;
    if (ds.modA > 0) {
      ctx.globalAlpha = ds.modA;
      const hs2 = fitNumber(ctx, g.h, Math.max(60, (R.w - 20) * 0.4));
      let parts;
      if (ds.resizing) {
        const to = g.resize.to;
        const m2 = Number(BigInt(g.h) & BigInt(to - 1));
        parts = [[T('new table: ', 'tabel baru: '), COL.muted], [hs2, COL.cyan], [` % ${to} = `, COL.text], [String(m2), COL.green], [m2 !== g.slot ? T(`  → slot ${g.slot}`, `  → slot ${g.slot}`) : '', COL.muted]];
      } else parts = [[hs2, COL.cyan], [` % ${g.size} = `, COL.text], [String(g.slots[0]), COL.amber], [T(`  → slot ${g.slots[0]}`, `  → slot ${g.slots[0]}`), COL.muted]];
      let x = R.x + 10;
      for (let i = 0; i < parts.length; i++) {
        const [t, c] = parts[i];
        if (i === 3) numX = x + ctx.measureText(t).width / 2;
        ctx.fillStyle = c;
        ctx.fillText(t, x, hy2);
        x += ctx.measureText(t).width;
      }
      ctx.globalAlpha = 1;
    }
    if (!ds.resizing && ds.probes > 0) {
      const first = slotRect(LA, g.slots[0]);
      arrow(ctx, numX, hy2 + 7, first.x + first.w / 2, first.y + 1, hexA(COL.amber, 0.85), 0);
      for (let i = 1; i < ds.probes; i++) {
        if (g.slots[i] === g.slots[i - 1]) continue;
        const a = slotRect(LA, g.slots[i - 1]);
        const b = slotRect(LA, g.slots[i]);
        arrow(ctx, a.x + a.w / 2, a.y + a.h / 2, b.x + b.w / 2, b.y + b.h / 2, hexA(COL.amber, i === ds.probes - 1 && ds.searching ? 0.9 : 0.45), 0.5, Math.min(a.w, a.h) * 0.45);
      }
      // probe numbers: the order in which Python checked the slots
      const order = new Map();
      for (let i = 0; i < ds.probes; i++) order.set(g.slots[i], [...(order.get(g.slots[i]) || []), i + 1]);
      ctx.font = `600 10px ${SANS}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (const [sl, nums] of order) {
        const r = slotRect(LA, sl);
        const txt = nums.join(',');
        const bw = Math.max(15, ctx.measureText(txt).width + 8);
        const bx = LA.top ? r.x + r.w / 2 - bw / 2 : r.x + 1;
        const by = LA.top ? r.y + 0.5 : r.y + 1;
        const stt = ds.states.get(sl);
        const c = stt && STATE_COL[stt] && stt !== 'passed' ? STATE_COL[stt] : COL.grey;
        const bh = LA.top ? Math.min(13, LA.top + 2) : 13;
        rrect(ctx, bx, by, bw, bh, bh / 2);
        ctx.fillStyle = c;
        ctx.fill();
        ctx.fillStyle = '#0b1220';
        ctx.fillText(txt, bx + bw / 2, by + bh / 2 + 0.5);
      }
    }
  } else {
    ctx.font = `11.5px ${MONO}`;
    ctx.fillStyle = COL.faint;
    let line = T(`slot = hash(key) % ${grid.size}`, `slot = hash(kunci) % ${grid.size}`);
    if (g && g.kind === 'iter') line = T(`for: entry #${g.ix} (pair ${g.j + 1} of ${g.n})`, `for: entri #${g.ix} (pasangan ${g.j + 1} dari ${g.n})`);
    else if (g && g.kind === 'len') line = `len(${name}) = ${g.n}`;
    else if (g && g.scan) line = T('values: no hash, compared in insertion order', 'nilai: tanpa hash, dibandingkan sesuai urutan masuk');
    else if (g && (g.kind === 'whole' || g.kind === 'most')) line = T('entries #0, #1, … in insertion order', 'entri #0, #1, … sesuai urutan masuk');
    else if (g && g.kind === 'create') line = T(`new ${dkind}: each key goes to hash(key) % ${grid.size}`, `${dkind} baru: setiap kunci ke hash(kunci) % ${grid.size}`);
    ctx.fillText(ellipsize(ctx, line, R.w - 20), R.x + 10, hy1);
  }
  // banner while the table grows
  if (ds.resizing && ds.e < 1) {
    const txt = T(`2/3 limit reached → new table of ${g.resize.to} slots: every key placed again`, `batas 2/3 tercapai → tabel baru ${g.resize.to} slot: semua kunci ditempatkan ulang`);
    ctx.font = `600 12px ${SANS}`;
    const w = Math.min(R.w - 24, ctx.measureText(txt).width + 20);
    const bx = R.x + (R.w - w) / 2;
    const by = body.y + body.h / 2 - 14;
    ctx.globalAlpha = 0.94 * Math.sin(Math.PI * clamp01(ds.e));
    rrect(ctx, bx, by, w, 28, 8);
    ctx.fillStyle = '#1e293b';
    ctx.fill();
    ctx.strokeStyle = COL.amber;
    ctx.stroke();
    ctx.fillStyle = COL.amber;
    ctx.textAlign = 'center';
    ctx.fillText(ellipsize(ctx, txt, w - 12), bx + w / 2, by + 14);
    ctx.globalAlpha = 1;
  }
  // footer
  let foot;
  let fcol = COL.muted;
  const fm = grid;
  if (g && g.kind === 'lookup') {
    const last = g.slots[Math.max(0, ds.probes - 1)];
    const occ = g.mIn.idx[last];
    if (ds.probes === 0) foot = T('hash the key, then jump to one slot', 'hitung hash kunci, lalu lompat ke satu slot');
    else if (ds.searching) {
      if (occ >= 0) foot = T(`slot ${last}: is the key ${shorten(g.krepr, 14)}?`, `slot ${last}: apakah kuncinya ${shorten(g.krepr, 14)}?`);
      else if (occ === DUMMY) foot = T(`slot ${last}: deleted marker, keep looking`, `slot ${last}: tanda dihapus, cari terus`);
      else foot = T(`slot ${last}: empty`, `slot ${last}: kosong`);
      if (ds.probes > 1) foot = T(`taken → next slot. ${foot}`, `terpakai → slot berikutnya. ${foot}`);
    } else if (g.found) {
      foot = T(`found in slot ${last} after ${g.slots.length} slot check${g.slots.length === 1 ? '' : 's'}`, `ketemu di slot ${last} setelah memeriksa ${g.slots.length} slot`);
      fcol = COL.green;
      if (g.mutate === 'delete') { foot = T(`removed: slot ${last} now says "deleted"`, `dihapus: slot ${last} kini bertanda "dihapus"`); fcol = COL.orange; }
      if (g.mutate === 'update') foot = T(`slot ${last}: value ${shorten(g.oldV.repr, 10)} → ${shorten(g.newV.repr, 10)}`, `slot ${last}: nilai ${shorten(g.oldV.repr, 10)} → ${shorten(g.newV.repr, 10)}`);
    } else if (g.mutate === 'insert') {
      foot = T(`empty slot → not a key yet; stored in slot ${g.slot} as entry #${g.newIx}`, `slot kosong → belum jadi kunci; disimpan di slot ${g.slot} sebagai entri #${g.newIx}`);
      fcol = COL.green;
    } else {
      foot = g.outcome === 'keyerror' ? `KeyError: ${shorten(g.krepr, 24)}` : g.outcome === 'zero' ? T('empty slot: a Counter answers 0', 'slot kosong: Counter menjawab 0') : T(`slot ${last} is empty: not a key`, `slot ${last} kosong: bukan kunci`);
      fcol = g.outcome === 'keyerror' ? COL.red : COL.orange;
    }
  } else if (g && g.kind === 'generic') { foot = T('changed (shown as before → after)', 'berubah (ditampilkan sebelum → sesudah)'); fcol = COL.orange; } else if (g && g.kind === 'unknown') foot = T('Python looks up this key here', 'Python mencari kunci ini di sini');
  else if (g && g.kind === 'error') { foot = `${g.error.type}: ${g.error.message}`; fcol = COL.red; } else {
    const n = livePairs(fm).length;
    foot = T(`${fm.size} slots · ${n} key${n === 1 ? '' : 's'} · ${Math.max(0, fm.usable)} more before it grows`, `${fm.size} slot · ${n} kunci · ${Math.max(0, fm.usable)} lagi sebelum membesar`);
  }
  footer(ctx, R, foot, fcol);
}

// ---------------------------------------------------------------------------------------------------------------
// Chart: steps of every lookup against the number of pairs n
// ---------------------------------------------------------------------------------------------------------------
function drawChart(ctx, W, H, pts, T) {
  ctx.fillStyle = COL.bg;
  ctx.fillRect(0, 0, W, H);
  const maxN = pts.reduce((m, p) => Math.max(m, p.n, p.list, p.dict), 0);
  const xMax = maxN <= 12 ? 12 : maxN <= 24 ? 24 : maxN <= 40 ? 40 : Math.ceil(maxN / 20) * 20;
  const L = 34;
  const Rm = 12;
  const legend = [
    { col: COL.orange, dash: false, text: T('list: key missing → n comparisons', 'list: kunci tidak ada → n perbandingan') },
    { col: COL.orange, dash: true, text: T('list: found, on average (n + 1)/2', 'list: ketemu, rata-rata (n + 1)/2') },
    { col: COL.green, dash: false, text: T('dict: about 1 slot', 'dict: sekitar 1 slot') },
    { dots: [COL.orange, COL.green], text: T('your lookups (list, dict)', 'pencarianmu (list, dict)') },
  ];
  ctx.font = `11px ${SANS}`;
  ctx.textBaseline = 'alphabetic';
  let lx = L;
  let ly = 16;
  for (const lg of legend) {
    const w = 22 + ctx.measureText(lg.text).width + 14;
    if (lx + w > W - Rm && lx > L) { lx = L; ly += 15; }
    ctx.save();
    if (lg.dots) lg.dots.forEach((c, k) => { ctx.beginPath(); ctx.arc(lx + 3 + k * 7, ly - 4, 3, 0, Math.PI * 2); ctx.fillStyle = c; ctx.fill(); });
    else { ctx.strokeStyle = lg.col; ctx.lineWidth = 2.2; if (lg.dash) ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(lx, ly - 4); ctx.lineTo(lx + 16, ly - 4); ctx.stroke(); }
    ctx.restore();
    ctx.fillStyle = '#cbd5e1';
    ctx.textAlign = 'left';
    ctx.fillText(lg.text, lx + 21, ly);
    lx += w;
  }
  const top = ly + 14;
  const B = 32;
  const gw = W - L - Rm;
  const gh = H - top - B;
  if (gw < 40 || gh < 30) return;
  const X = (n) => L + (n / xMax) * gw;
  const Y = (m) => top + gh - (m / xMax) * gh;
  ctx.strokeStyle = 'rgba(148,163,184,0.16)';
  ctx.lineWidth = 1;
  ctx.font = `10px ${MONO}`;
  ctx.fillStyle = '#8a99b3';
  const stepT = xMax / 4;
  for (let v = 0; v <= xMax + 1e-9; v += stepT) {
    ctx.beginPath(); ctx.moveTo(X(v), top); ctx.lineTo(X(v), top + gh); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(L, Y(v)); ctx.lineTo(L + gw, Y(v)); ctx.stroke();
    ctx.textAlign = 'center';
    ctx.fillText(String(Math.round(v)), X(v), top + gh + 13);
    ctx.textAlign = 'right';
    ctx.fillText(String(Math.round(v)), L - 5, Y(v) + 3);
  }
  ctx.font = `11px ${SANS}`;
  ctx.textAlign = 'center';
  ctx.fillStyle = '#a7b4c8';
  ctx.fillText(T('n = pairs before the lookup', 'n = banyak pasangan sebelum pencarian'), L + gw / 2, H - 5);
  ctx.save();
  ctx.translate(11, top + gh / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText(T('steps', 'langkah'), 0, 0);
  ctx.restore();
  const line = (f, col, dash) => {
    ctx.save();
    ctx.strokeStyle = col;
    ctx.lineWidth = 2;
    if (dash) ctx.setLineDash([5, 4]);
    ctx.beginPath();
    for (let k = 0; k <= 40; k++) { const n = (k / 40) * xMax; const y = Math.min(xMax, f(n)); if (k === 0) ctx.moveTo(X(n), Y(y)); else ctx.lineTo(X(n), Y(y)); }
    ctx.stroke();
    ctx.restore();
  };
  line((n) => n, hexA(COL.orange, 0.85), false);
  line((n) => (n + 1) / 2, hexA(COL.orange, 0.85), true);
  line(() => 1, hexA(COL.green, 0.9), false);
  const r = pts.length > 40 ? 2.6 : 3.6;
  for (const p of pts) {
    ctx.beginPath(); ctx.arc(X(p.n), Y(Math.min(xMax, p.list)), r, 0, Math.PI * 2); ctx.fillStyle = COL.orange; ctx.fill();
    ctx.fillStyle = COL.green;
    ctx.fillRect(X(p.n) - r, Y(Math.min(xMax, p.dict)) - r, 2 * r, 2 * r);
  }
}

// ---------------------------------------------------------------------------------------------------------------
// Explanations (one sentence group per segment)
// ---------------------------------------------------------------------------------------------------------------
function explain(g, T) {
  const D = g.name;
  const K = g.krepr;
  const R = g.result ? g.result.repr : '';
  const cmp = (c) => T(`${c} comparison${c === 1 ? '' : 's'}`, `${c} perbandingan`);
  const slots = (c) => T(`${c} slot${c === 1 ? '' : 's'}`, `${c} slot`);
  switch (g.kind) {
    case 'lookup': {
      const s0 = g.slots[0];
      const sN = g.slots[g.slots.length - 1];
      const p = g.slots.length;
      const jump = `hash(${K}) % ${g.size} = ${s0}`;
      const dummy0 = g.mIn.idx[s0] === DUMMY;
      const hop = p > 1
        ? (dummy0
          ? T(`; slot ${s0} only has a "deleted" marker, so Python followed its probe order to slot ${sN}`, `; slot ${s0} hanya berisi tanda "dihapus", jadi Python mengikuti urutan pencariannya sampai slot ${sN}`)
          : T(`; slot ${s0} held another key, so Python followed its probe order to slot ${sN}`, `; slot ${s0} berisi kunci lain, jadi Python mengikuti urutan pencariannya sampai slot ${sN}`))
        : '';
      const listF = T(`The list of pairs needed ${cmp(g.listSteps)}, checking from the front.`, `List pasangan butuh ${cmp(g.listSteps)}, memeriksa dari depan.`);
      const listM = !g.n ? T('The list of pairs is empty, so there is nothing to compare.', 'List pasangan masih kosong, jadi tidak ada yang dibandingkan.')
        : T(`The list of pairs had to compare ${g.n === 1 ? 'its only pair' : `all ${g.n} pairs`} to be sure.`, `List pasangan harus membandingkan ${g.n === 1 ? 'satu-satunya pasangannya' : `semua ${g.n} pasangan`} untuk memastikannya.`);
      const listIns = !g.n ? T(' The list of pairs was empty, so the pair is simply appended.', ' List pasangan masih kosong, jadi pasangan itu langsung ditambahkan.')
        : T(` The list of pairs compared ${g.n === 1 ? 'its only pair' : `all ${g.n} pairs`}, then appended.`, ` List pasangan membandingkan ${g.n === 1 ? 'satu-satunya pasangannya' : `semua ${g.n} pasangan`}, lalu menambahkan di akhir.`);
      const L = g.found ? listF : listM;
      switch (g.outcome) {
        case 'value':
          return T(`${g.src}: ${jump}, so Python jumps straight to slot ${s0}${hop} and finds ${K}: the value is ${R} (${slots(p)} checked). ${L}`,
            `${g.src}: ${jump}, jadi Python langsung melompat ke slot ${s0}${hop} dan menemukan ${K}: nilainya ${R} (${slots(p)} diperiksa). ${L}`);
        case 'keyerror':
          return T(`${g.src}: ${jump}${hop}, and slot ${sN} is empty, so ${K} is not a key. ${D}[key] stops the program with KeyError: ${K}. Use ${D}.get(${K}, default) or check ${K} in ${D} first. ${L}`,
            `${g.src}: ${jump}${hop}, dan slot ${sN} kosong, jadi ${K} bukan kunci. ${D}[kunci] menghentikan program dengan KeyError: ${K}. Pakai ${D}.get(${K}, nilai_bawaan) atau periksa dulu dengan ${K} in ${D}. ${L}`);
        case 'zero':
          return T(`${g.src}: slot ${sN} is empty, so ${K} is not in the Counter. A Counter answers 0 for a missing key instead of raising KeyError, and it does not add the key. ${L}`,
            `${g.src}: slot ${sN} kosong, jadi ${K} tidak ada di Counter. Counter menjawab 0 untuk kunci yang tidak ada (bukan KeyError) dan tidak menambahkan kuncinya. ${L}`);
        case 'default':
          return T(`${g.src}: slot ${sN} is empty, so ${K} is not a key and ${g.op === 'pop' ? 'pop' : 'get'}() gives ${g.hasDef ? `the default ${R}` : 'None, because no default was given'}: no KeyError, and the dict does not change. ${L}`,
            `${g.src}: slot ${sN} kosong, jadi ${K} bukan kunci dan ${g.op === 'pop' ? 'pop' : 'get'}() memberi ${g.hasDef ? `nilai bawaan ${R}` : 'None, karena tidak ada nilai bawaan'}: tidak ada KeyError, dan dict tidak berubah. ${L}`);
        case 'yes':
        case 'no':
          return T(`${g.src}: ${jump}${hop}; ${g.found ? `${K} is in slot ${sN}` : `slot ${sN} is empty, so ${K} is not a key`}: ${R}. "in" looks at the keys, not the values (${slots(p)} checked). ${L}`,
            `${g.src}: ${jump}${hop}; ${g.found ? `${K} ada di slot ${sN}` : `slot ${sN} kosong, jadi ${K} bukan kunci`}: ${R}. "in" memeriksa kunci, bukan nilai (${slots(p)} diperiksa). ${L}`);
        case 'update':
          return g.aug
            ? T(`${g.src} ${g.aug} …: the new value ${g.newV.repr} goes back into the same entry (slot ${sN}); the key and the order stay.`, `${g.src} ${g.aug} …: nilai baru ${g.newV.repr} disimpan kembali di entri yang sama (slot ${sN}); kunci dan urutannya tetap.`)
            : T(`${g.src} = …: ${K} is already a key (slot ${sN}), so only its value changes: ${g.oldV.repr} → ${g.newV.repr}. Keys are unique, so a dict never holds ${K} twice, and the order stays the same. ${L}`,
              `${g.src} = …: ${K} sudah menjadi kunci (slot ${sN}), jadi hanya nilainya yang berubah: ${g.oldV.repr} → ${g.newV.repr}. Kunci itu unik, jadi dict tidak pernah menyimpan ${K} dua kali, dan urutannya tetap. ${L}`);
        case 'insert': {
          // deleted keys keep their entry until the table is rebuilt, so they count towards the 2/3 limit too
          const holes = g.resize ? Math.max(0, g.mIn.ent.length - g.n) : 0;
          const rs = !g.resize ? ''
            : !holes
              ? T(` The table already held ${usableOf(g.resize.from)} keys, the most ${g.resize.from} slots may hold (2/3), so Python first built a bigger table of ${g.resize.to} slots and placed every key again by its hash. That copy is rare, so adding keys stays fast on average.`,
                ` Tabel sudah berisi ${usableOf(g.resize.from)} kunci, batas untuk ${g.resize.from} slot (2/3), jadi Python lebih dulu membuat tabel yang lebih besar berisi ${g.resize.to} slot dan menempatkan ulang setiap kunci menurut hash-nya. Penyalinan ini jarang terjadi, jadi rata-rata menambah kunci tetap cepat.`)
              : T(` The table had no room for another entry: ${g.n} key${g.n === 1 ? '' : 's'} plus ${holes} deleted entr${holes === 1 ? 'y' : 'ies'} (a deleted key keeps its entry until the table is rebuilt) filled the ${usableOf(g.resize.from)} entries ${g.resize.from} slots may hold (2/3). So Python first built a new table of ${g.resize.to} slots (the smallest power of two that is at least 3 × ${g.n} key${g.n === 1 ? '' : 's'}, and at least 8), placed every key again by its hash and left the × markers behind.`,
                ` Tabel tidak punya tempat lagi untuk entri baru: ${g.n} kunci ditambah ${holes} entri yang dihapus (kunci yang dihapus tetap memakai entrinya sampai tabel dibangun ulang) memenuhi ${usableOf(g.resize.from)} entri yang boleh ditampung ${g.resize.from} slot (2/3). Jadi Python lebih dulu membuat tabel baru berisi ${g.resize.to} slot (pangkat dua terkecil yang paling sedikit 3 × ${g.n} kunci, dan minimal 8), menempatkan ulang setiap kunci menurut hash-nya, dan meninggalkan tanda ×.`);
          const what = g.op === 'setdefault' ? T(`setdefault() adds ${K} with the default ${g.newV.repr}`, `setdefault() menambahkan ${K} dengan nilai bawaan ${g.newV.repr}`) : T(`the new pair (${K}, ${g.newV.repr}) is stored`, `pasangan baru (${K}, ${g.newV.repr}) disimpan`);
          return T(`${g.src}${g.op === 'set' ? (g.aug ? ` ${g.aug} …` : ' = …') : ''}: the search ended at an empty slot, so ${K} is not a key yet and ${what} in slot ${g.slot} as entry #${g.newIx}. New keys always come last in the order.${rs}${listIns}`,
            `${g.src}${g.op === 'set' ? (g.aug ? ` ${g.aug} …` : ' = …') : ''}: pencarian berakhir di slot kosong, jadi ${K} belum menjadi kunci dan ${what} di slot ${g.slot} sebagai entri #${g.newIx}. Kunci baru selalu berada paling akhir dalam urutan.${rs}${listIns}`);
        }
        case 'delete': {
          const sh = g.n - g.pos - 1;
          return T(`${g.src}: ${K} is found in slot ${sN} and removed${g.op === 'pop' ? `; pop() gives back its value ${R}` : ''}. The slot now says "deleted" (×) so that later searches keep going past it; no other key moves. In the list of pairs ${sh} pair${sh === 1 ? '' : 's'} after it would shift forward.`,
            `${g.src}: ${K} ditemukan di slot ${sN} lalu dihapus${g.op === 'pop' ? `; pop() mengembalikan nilainya ${R}` : ''}. Slot itu kini bertanda "dihapus" (×) agar pencarian berikutnya tetap berlanjut melewatinya; tidak ada kunci lain yang berpindah. Di list pasangan, ${sh} pasangan di belakangnya harus bergeser maju.`);
        }
        default:
          return '';
      }
    }
    case 'iter': {
      const pr = g.pairsIn[g.j];
      return T(`${g.src} (for loop): pair ${g.j + 1} of ${g.n} is (${pr.k}, ${pr.v.repr}), entry #${g.ix}. A dict hands out its pairs in the order the keys were added, not in slot order.`,
        `${g.src} (perulangan for): pasangan ke-${g.j + 1} dari ${g.n} adalah (${pr.k}, ${pr.v.repr}), entri #${g.ix}. Dict memberikan pasangannya sesuai urutan kunci ditambahkan, bukan urutan slot.`);
    }
    case 'iterEnd':
      return T(`All ${g.n} pairs of ${D} have been visited, so the for loop ends.`, `Semua ${g.n} pasangan ${D} sudah dikunjungi, jadi perulangan for selesai.`);
    case 'len':
      return T(`len(${D}) = ${g.n}: Python stores the number of keys with the dict, so nothing is searched or counted.`, `len(${D}) = ${g.n}: Python menyimpan banyaknya kunci bersama dict, jadi tidak ada yang dicari atau dihitung.`);
    case 'whole':
      if (g.scan) {
        const res = g.hit !== !!g.notIn ? 'True' : 'False';
        return T(`${g.src}: hashes are made from the keys, so they cannot find a value. Python compares the values one by one in insertion order, like a list: ${g.hit ? `${g.vrepr} is value number ${g.upto}` : `${g.vrepr} is not among all ${g.n} values`} (${g.upto} comparison${g.upto === 1 ? '' : 's'}), so the answer is ${res}. Only the keys get the jump to one slot.`,
          `${g.src}: hash dibuat dari kunci, jadi tidak bisa menemukan nilai. Python membandingkan nilai satu per satu sesuai urutan masuk, seperti list: ${g.hit ? `${g.vrepr} adalah nilai ke-${g.upto}` : `${g.vrepr} tidak ada di antara ${g.n} nilai`} (${g.upto} perbandingan), jadi jawabannya ${res}. Hanya kunci yang bisa langsung melompat ke satu slot.`);
      }
      return T(`${g.src} reads all ${g.n} pairs of ${D} in insertion order: ${g.n} steps for the dict and for the list of pairs alike.`, `${g.src} membaca semua ${g.n} pasangan ${D} sesuai urutan masuk: ${g.n} langkah, sama untuk dict maupun list pasangan.`);
    case 'most':
      return T(`${D}.most_common() reads all ${g.n} counts and sorts them from largest to smallest; equal counts keep the order in which the keys were added.`, `${D}.most_common() membaca semua ${g.n} hitungan lalu mengurutkannya dari terbesar ke terkecil; hitungan yang sama tetap mengikuti urutan kunci ditambahkan.`);
    case 'create': {
      const size = g.mOut.size;
      if (g.big) return T(`A new ${g.dkind} ${D} with ${g.big} pairs (too many to draw).`, `${g.dkind} baru ${D} dengan ${g.big} pasangan (terlalu banyak untuk digambar).`);
      const base = g.n
        ? T(`A new ${g.dkind} ${D} with ${g.n} pair${g.n === 1 ? '' : 's'}: each key's hash chooses its slot. A table of ${size} slots holds at most ${usableOf(size)} keys (2/3 of it); more keys make it grow to ${size * 2}, ${size * 4}, … slots.`,
          `${g.dkind} baru ${D} dengan ${g.n} pasangan: hash setiap kunci menentukan slotnya. Tabel ${size} slot menampung paling banyak ${usableOf(size)} kunci (2/3-nya); kunci yang lebih banyak membuatnya membesar menjadi ${size * 2}, ${size * 4}, … slot.`)
        : T(`A new, empty ${g.dkind} ${D}: no pairs yet. (CPython makes the 8-slot table when the first key arrives; the empty slots are drawn already.)`, `${g.dkind} baru ${D} yang masih kosong: belum ada pasangan. (CPython membuat tabel 8 slot saat kunci pertama masuk; slot-slot kosongnya sudah digambar.)`);
      const ctr = g.counterSrc ? T(` ${g.counterSrc.replace(/\s*#.*$/, '')} looked up each item once and added 1 to its count.`, ` ${g.counterSrc.replace(/\s*#.*$/, '')} mencari setiap item sekali dan menambah hitungannya dengan 1.`) : '';
      return base + ctr;
    }
    case 'generic':
      return T(`${D} changed in a way the picture does not replay step by step; it now shows the result.`, `${D} berubah dengan cara yang tidak diputar ulang langkah demi langkah; gambarnya kini menunjukkan hasilnya.`);
    case 'unknown':
      return T(`${g.src}: Python looks up this key here (the sim does not replay this key expression step by step).`, `${g.src}: Python mencari kunci ini di sini (simulasi tidak memutar ulang ekspresi kunci ini langkah demi langkah).`);
    case 'big':
      return T(`${D} has ${g.n} pairs, too many to draw.`, `${D} berisi ${g.n} pasangan, terlalu banyak untuk digambar.`);
    case 'error':
      if (g.unhashable) return T(`${g.src}: ${K} cannot be a dictionary key (TypeError: ${g.error.message}). A key must never change, so use a str, int, float or tuple.`, `${g.src}: ${K} tidak bisa menjadi kunci dictionary (TypeError: ${g.error.message}). Kunci tidak boleh berubah, jadi pakai str, int, float, atau tuple.`);
      if (g.late) return '';
      return T(`Python stopped while working out the key of ${g.src}: ${g.error.type}: ${g.error.message}.`, `Python berhenti saat menghitung kunci ${g.src}: ${g.error.type}: ${g.error.message}.`);
    default:
      return '';
  }
}

// ---------------------------------------------------------------------------------------------------------------
// The operation buttons
// ---------------------------------------------------------------------------------------------------------------
const OPS = [
  { key: 'get', group: 'read', chip: 'd[k]', args: ['k'], name: { en: 'Look up the value of key k', id: 'Cari nilai dari kunci k' } },
  { key: 'getm', group: 'read', chip: 'get()', args: ['k', 'def'], name: { en: 'Look up k safely (default when missing)', id: 'Cari k dengan aman (nilai bawaan jika tidak ada)' } },
  { key: 'in', group: 'read', chip: 'k in d', args: ['k'], name: { en: 'Is k a key?', id: 'Apakah k sebuah kunci?' } },
  { key: 'len', group: 'read', chip: 'len()', args: [], name: { en: 'Number of keys', id: 'Banyaknya kunci' } },
  { key: 'for', group: 'read', chip: 'for … items()', args: [], name: { en: 'Loop over every pair', id: 'Ulangi untuk setiap pasangan' } },
  { key: 'most', group: 'read', chip: 'most_common()', args: ['m'], counter: true, name: { en: 'The largest counts first (Counter)', id: 'Hitungan terbesar dulu (Counter)' } },
  { key: 'set', group: 'change', chip: 'd[k] = v', args: ['k', 'v'], name: { en: 'Add a pair, or change the value of k', id: 'Tambah pasangan, atau ubah nilai k' } },
  { key: 'aug', group: 'change', chip: 'd[k] += v', args: ['k', 'v'], numeric: true, name: { en: 'Add v to the value of k', id: 'Tambahkan v ke nilai k' } },
  { key: 'del', group: 'change', chip: 'del d[k]', args: ['k'], name: { en: 'Delete the pair with key k', id: 'Hapus pasangan berkunci k' } },
  { key: 'pop', group: 'change', chip: 'pop()', args: ['k', 'def'], name: { en: 'Take out the value of k and delete the pair', id: 'Ambil nilai k lalu hapus pasangannya' } },
];
const OP_HINT = {
  get: ['d[k] hashes k, jumps to one slot and gives the value. A key that is not there stops the program with KeyError.', 'd[k] menghitung hash k, melompat ke satu slot, dan memberi nilainya. Kunci yang tidak ada menghentikan program dengan KeyError.'],
  getm: ['d.get(k) works like d[k] but gives None, or the default you type, when k is missing: no KeyError.', 'd.get(k) bekerja seperti d[k] tetapi memberi None, atau nilai bawaan yang kamu ketik, jika k tidak ada: tidak ada KeyError.'],
  in: ['k in d checks the keys (not the values) and answers True or False, with the same jump to one slot.', 'k in d memeriksa kunci (bukan nilai) dan menjawab True atau False, dengan lompatan yang sama ke satu slot.'],
  len: ['len(d) is stored with the dict, so nothing is searched.', 'len(d) disimpan bersama dict, jadi tidak ada yang dicari.'],
  for: ['for k, v in d.items() visits every pair in the order the keys were added. Press Step to walk one pair at a time.', 'for k, v in d.items() mengunjungi setiap pasangan sesuai urutan kunci ditambahkan. Tekan Langkah untuk berjalan satu pasangan setiap kali.'],
  most: ['Counter.most_common(m) lists the m largest counts, largest first (all of them when m is empty).', 'Counter.most_common(m) mendaftar m hitungan terbesar, dari yang terbesar (semuanya jika m dikosongkan).'],
  set: ['d[k] = v adds a new pair when k is new, or changes the value when k is already a key (keys are unique).', 'd[k] = v menambah pasangan baru jika k baru, atau mengubah nilainya jika k sudah menjadi kunci (kunci itu unik).'],
  aug: ['d[k] += v reads d[k], adds v and stores the result. A missing key gives KeyError (a Counter starts from 0).', 'd[k] += v membaca d[k], menambahkan v, lalu menyimpan hasilnya. Kunci yang tidak ada memunculkan KeyError (Counter mulai dari 0).'],
  del: ['del d[k] removes the pair. KeyError if k is not a key.', 'del d[k] menghapus pasangannya. KeyError jika k bukan kunci.'],
  pop: ['d.pop(k) removes the pair and gives back its value. With a default there is no KeyError when k is missing.', 'd.pop(k) menghapus pasangannya dan mengembalikan nilainya. Dengan nilai bawaan tidak ada KeyError jika k tidak ada.'],
};

/** Python literal for what was typed in a box: numbers stay numbers, True/False/None stay, anything else is a str. */
function literal(raw) {
  const s = raw.trim();
  if (!s) return '""';
  if (/^[+-]?(\d[\d_]*)(\.\d*)?([eE][+-]?\d+)?$/.test(s) || /^[+-]?\.\d+([eE][+-]?\d+)?$/.test(s)) return s.replace(/^\+/, '');
  if (/^(True|False|None)$/.test(s)) return s;
  if (s.length >= 2 && /^(["'])/.test(s) && s.endsWith(s[0])) return s;
  if (/^\(.*\)$/.test(s) || /^\[.*\]$/.test(s)) return s;
  return `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}
/** Text a student would type for a key View (the repr without quotes for a simple str). */
function rawKey(rec) {
  if (rec.kt === 'str' && /^'[^'\\]*'$/.test(rec.k)) {
    const s = rec.k.slice(1, -1);
    return /^[+-]?\d/.test(s) || /^(True|False|None)$/.test(s) ? rec.k : s;
  }
  return rec.k;
}

const CSS = `
.dl { container-type: inline-size; container-name: dl; padding: 12px; min-width: 0; display: flex; flex-direction: column; gap: 12px; }
.dl *, .dl *::before, .dl *::after, .dl-ctl * { box-sizing: border-box; }
.dl [hidden], .dl-ctl [hidden] { display: none !important; }
.dl-cv { position: relative; height: 290px; border: 1px solid #1e2a44; border-radius: 10px; overflow: hidden; background: #0b1220; }
.dl-cv canvas, .dl-chartw canvas { display: block; }
.dl-sr { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }

.dl-info { display: grid; gap: 5px; min-width: 0; padding: 8px 12px 9px; border: 1px solid var(--color-border); border-left: 4px solid var(--dl-acc, #3b82f6);
  border-radius: 10px; background: color-mix(in srgb, var(--color-fg) 3%, var(--color-surface)); font-size: 14px; line-height: 1.5; color: var(--color-fg); }
.dl-info.is-err { --dl-acc: var(--color-danger, #dc2626); }
.dl-info.is-ok { --dl-acc: #059669; }
.dl-top { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 8px; min-width: 0; }
.dl-ln { font-size: 12px; color: var(--color-muted); white-space: nowrap; }
.dl-code { display: inline-block; max-width: 100%; margin: 0; padding: 2px 8px; border-radius: 6px; background: #0b1220; color: #e2e8f0;
  font: 13px/1.45 var(--font-mono, ui-monospace, monospace); white-space: pre-wrap; overflow-wrap: anywhere; }
.dl-why { margin: 0; overflow-wrap: anywhere; }
.dl-cost { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.dl-pill { padding: 1px 9px; border-radius: 999px; border: 1px solid var(--color-border); font-size: 12.5px; font-weight: 600; white-space: nowrap; background: var(--color-surface); }
.dl-pill.l { border-color: #ea580c; color: #c2410c; }
.dl-pill.d { border-color: #059669; color: #047857; }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .dl-pill.l { color: #fdba74; } :root:not([data-theme="light"]) .dl-pill.d { color: #6ee7b7; } }
:root[data-theme="dark"] .dl-pill.l { color: #fdba74; }
:root[data-theme="dark"] .dl-pill.d { color: #6ee7b7; }
.dl-out { display: flex; flex-wrap: wrap; gap: 4px 8px; align-items: baseline; min-width: 0; font-size: 13px; }
.dl-out > span:first-child { color: var(--color-muted); font-size: 12.5px; white-space: nowrap; }
.dl-out.err .dl-code { color: #fca5a5; }

.dl-build { display: grid; gap: 8px; min-width: 0; padding: 10px 12px; border: 1px solid var(--color-border); border-radius: 10px; }
.dl-build-h { margin: 0; font-size: 14px; font-weight: 700; color: var(--color-fg); }
.dl-build-h code { font: 600 13.5px var(--font-mono, ui-monospace, monospace); }
.dl-ops { display: flex; flex-wrap: wrap; gap: 6px 14px; }
.dl-opg { display: flex; flex-wrap: wrap; align-items: center; gap: 5px; min-width: 0; }
.dl-opg-h { font-size: 12px; font-weight: 600; color: var(--color-muted); margin-right: 2px; }
.dl-op { min-height: 34px; padding: 4px 10px; border: 1px solid var(--color-border); border-radius: 8px; background: var(--color-surface-2); color: var(--color-fg);
  font: 600 13px/1.2 var(--font-mono, ui-monospace, monospace); cursor: pointer; white-space: nowrap; }
.dl-op:hover { background: color-mix(in srgb, var(--color-fg) 8%, var(--color-surface-2)); }
.dl-op[aria-checked="true"] { background: var(--accent, var(--color-accent)); border-color: transparent; color: #fff; }
.dl-op:focus-visible, .dl-run:focus-visible, .dl-in:focus-visible, .dl-bar .btn:focus-visible { outline: 3px solid color-mix(in srgb, var(--accent, var(--color-accent)) 55%, transparent); outline-offset: 2px; }
.dl-args { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; min-width: 0; }
.dl-arg { display: inline-flex; align-items: center; gap: 6px; font: 600 13px var(--font-mono, ui-monospace, monospace); color: var(--color-fg); min-width: 0; }
.dl-in { min-height: 34px; padding: 4px 8px; border: 1px solid var(--color-border); border-radius: 7px; background: var(--color-surface); color: var(--color-fg);
  font: 14px var(--font-mono, ui-monospace, monospace); min-width: 0; }
.dl-in.sm { width: 4.6em; }
.dl-in.md { width: 8.5em; }
.dl-in.lg { width: 10.5em; max-width: 48vw; }
.dl-go { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; min-width: 0; }
.dl-prev { flex: 1 1 220px; min-width: 0; margin: 0; padding: 6px 10px; border-radius: 7px; background: #0b1220; color: #e2e8f0; border: 1px solid #1e2a44;
  font: 13.5px/1.45 var(--font-mono, ui-monospace, monospace); white-space: pre-wrap; overflow-wrap: anywhere; }
.dl-run { min-height: 38px; padding: 6px 16px; white-space: nowrap; }
.dl-hint { margin: 0; font-size: 13px; line-height: 1.45; color: var(--color-muted); }
.dl-own { display: grid; gap: 4px; padding-top: 8px; border-top: 1px dashed var(--color-border); }
.dl-own label { font-size: 13px; color: var(--color-muted); }
.dl-own-row { display: flex; gap: 8px; min-width: 0; }
.dl-own-row .dl-in { flex: 1 1 auto; width: auto; }

.dl-bar { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px; }
.dl-btns { display: flex; flex-wrap: wrap; gap: 6px; }
.dl-btns .btn { min-height: 38px; padding: 7px 11px; white-space: nowrap; }
.dl-btns .btn:disabled { opacity: .45; cursor: not-allowed; }
.dl-status { flex: 1 1 200px; margin: 0; font-size: 13px; line-height: 1.4; color: var(--color-muted); }
.dl-status b { color: var(--color-fg); }

.dl-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 12px; min-width: 0; }
@container dl (min-width: 720px) { .dl-grid { grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); align-items: start; } }
.dl-side { display: flex; flex-direction: column; gap: 12px; min-width: 0; }
.dl-codew, .dl-conw { min-width: 0; }
.dl-chartw { position: relative; height: 214px; border: 1px solid #1e2a44; border-radius: 10px; overflow: hidden; background: #0b1220; }
.dl-chart-cap { margin: 4px 2px 0; font-size: 12.5px; color: var(--color-muted); line-height: 1.4; }
.dl-ctl .dl-note { margin: 0; font-size: 12.5px; color: var(--color-muted); line-height: 1.45; }
`;

// ---------------------------------------------------------------------------------------------------------------
export function mount(rootEl) {
  const lang = getLocale() === 'id' ? 'id' : 'en';
  const T = (en, id) => (lang === 'id' ? id : en);
  // how far a run got before the sim's step limit stopped it: steps, or loop rounds inside one step
  const limitWhat = (e) => (e.limitKind === 'iterations'
    ? T(`${e.limit} loop rounds inside one step`, `${e.limit} putaran di dalam satu langkah`)
    : T(`${e.limit ?? MAX_STEPS} steps`, `${e.limit ?? MAX_STEPS} langkah`));
  const pick = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? v[lang] : v);
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const hl = (code) => highlight(code, 'python').join('\n');
  const narrow = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 600px)').matches;
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  let uidN = 0;
  const uid = (p) => `dl-${p}-${Math.random().toString(36).slice(2, 7)}${uidN++}`;

  const style = document.createElement('style');
  style.textContent = CSS;
  rootEl.appendChild(style);

  const main = el('div', 'dl');
  rootEl.appendChild(main);
  const ctrlPanel = el('div', 'sim-controls dl-ctl');
  rootEl.appendChild(ctrlPanel);

  // ---- canvas: list of pairs | dict ----
  const cvWrap = el('div', 'dl-cv');
  main.appendChild(cvWrap);
  const cv = createCanvas(cvWrap);
  cv.canvas.setAttribute('role', 'img');

  // ---- info: what the last step did ----
  const info = el('section', 'dl-info');
  info.setAttribute('aria-label', T('What the last step did', 'Apa yang dilakukan langkah terakhir'));
  main.appendChild(info);
  const live = el('div', 'dl-sr');
  live.setAttribute('aria-live', 'polite');
  main.appendChild(live);

  // ---- builder ----
  const build = el('section', 'dl-build');
  build.setAttribute('aria-label', T('Try a dictionary operation', 'Coba operasi dictionary'));
  const buildH = el('h2', 'dl-build-h');
  const opsBox = el('div', 'dl-ops');
  opsBox.setAttribute('role', 'radiogroup');
  opsBox.setAttribute('aria-label', T('Operation', 'Operasi'));
  const opBtns = new Map();
  for (const g of ['read', 'change']) {
    const grp = el('div', 'dl-opg');
    grp.appendChild(el('span', 'dl-opg-h', g === 'read' ? T('Read:', 'Baca:') : T('Change:', 'Ubah:')));
    for (const op of OPS.filter((o) => o.group === g)) {
      const b = el('button', 'dl-op', op.chip);
      b.type = 'button';
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', 'false');
      b.setAttribute('aria-label', `${op.chip}: ${pick(op.name)}`);
      b.title = pick(op.name);
      b.tabIndex = -1;
      b.addEventListener('click', () => selectOp(op.key, false));
      b.addEventListener('keydown', onOpKey);
      opBtns.set(op.key, b);
      grp.appendChild(b);
    }
    opsBox.appendChild(grp);
  }
  const argsRow = el('div', 'dl-args');
  const listId = uid('keys');
  const keyList = el('datalist');
  keyList.id = listId;
  const mkArg = (label, cls, aria) => {
    const lab = el('label', 'dl-arg');
    lab.appendChild(el('span', null, label));
    const inp = el('input', `dl-in ${cls}`);
    inp.type = 'text';
    inp.spellcheck = false;
    inp.autocomplete = 'off';
    inp.setAttribute('autocapitalize', 'off');
    inp.setAttribute('aria-label', aria);
    inp.addEventListener('input', () => updatePreview());
    inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); runBuilder(); } });
    lab.appendChild(inp);
    argsRow.appendChild(lab);
    return { lab, inp };
  };
  const argK = mkArg('k', 'lg', T('key k (text gets quotes automatically; numbers stay numbers). Suggestions: the keys of the dict and one missing key.', 'kunci k (teks otomatis diberi tanda petik; angka tetap angka). Saran: kunci-kunci dict dan satu kunci yang tidak ada.'));
  argK.inp.setAttribute('list', listId);
  argsRow.appendChild(keyList);
  const argV = mkArg('v', 'md', T('value v (text gets quotes automatically; numbers stay numbers)', 'nilai v (teks otomatis diberi tanda petik; angka tetap angka)'));
  const argD = mkArg(T('default', 'bawaan'), 'md', T('default value when the key is missing (leave empty for none)', 'nilai bawaan jika kunci tidak ada (kosongkan jika tidak perlu)'));
  const argM = mkArg('m', 'sm', T('how many of the largest counts (empty = all)', 'berapa hitungan terbesar (kosong = semua)'));
  const goRow = el('div', 'dl-go');
  const prev = el('pre', 'dl-prev');
  prev.setAttribute('aria-label', T('Python statement that will run', 'Pernyataan Python yang akan dijalankan'));
  const runBtn = el('button', 'btn btn--primary dl-run', T('▶ Run statement', '▶ Jalankan'));
  runBtn.type = 'button';
  runBtn.addEventListener('click', () => runBuilder());
  goRow.append(prev, runBtn);
  const hint = el('p', 'dl-hint');
  const own = el('div', 'dl-own');
  const ownId = uid('own');
  const ownLab = el('label', null, T('Or type your own one-line Python statement:', 'Atau ketik sendiri satu baris pernyataan Python:'));
  ownLab.htmlFor = ownId;
  const ownRow = el('div', 'dl-own-row');
  const ownIn = el('input', 'dl-in');
  ownIn.id = ownId;
  ownIn.type = 'text';
  ownIn.spellcheck = false;
  ownIn.autocomplete = 'off';
  ownIn.setAttribute('autocapitalize', 'off');
  ownIn.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); runOwn(); } });
  const ownBtn = el('button', 'btn dl-run', T('Run', 'Jalankan'));
  ownBtn.type = 'button';
  ownBtn.addEventListener('click', () => runOwn());
  ownRow.append(ownIn, ownBtn);
  own.append(ownLab, ownRow);
  build.append(buildH, opsBox, argsRow, goRow, hint, own);
  main.appendChild(build);

  // ---- transport bar ----
  const bar = el('div', 'dl-bar');
  bar.setAttribute('role', 'group');
  bar.setAttribute('aria-label', T('Run the program', 'Jalankan program'));
  const btns = el('div', 'dl-btns');
  const mkBtn = (label, aria, fn, primary) => {
    const b = el('button', `btn${primary ? ' btn--primary' : ''}`, label);
    b.type = 'button';
    if (aria) b.setAttribute('aria-label', aria);
    b.addEventListener('click', fn);
    btns.appendChild(b);
    return b;
  };
  const bBack = mkBtn(T('◀ Back', '◀ Mundur'), T('Step back', 'Mundur satu langkah'), () => { stopPlay(); if (pos > 0) { goTo(pos - 1, false); announceStep(); } });
  const bStep = mkBtn(T('Step ▶', 'Langkah ▶'), T('Step: run the next line', 'Langkah: jalankan baris berikutnya'), () => { stopPlay(); stepOnce(); });
  const bPlay = mkBtn(T('▶ Run all', '▶ Jalankan semua'), null, () => togglePlay());
  const bUndo = mkBtn(T('↶ Undo', '↶ Batalkan'), T('Undo: remove the last statement you added', 'Batalkan: hapus pernyataan terakhir yang kamu tambahkan'), () => undo());
  const bReset = mkBtn(T('⟲ Reset', '⟲ Ulang'), T('Reset the dictionary or example', 'Ulang dictionary atau contoh dari awal'), () => { loadPreset(preset, true); announce(T('Reset.', 'Diulang dari awal.')); });
  const status = el('p', 'dl-status');
  bar.append(btns, status);
  main.appendChild(bar);

  // ---- code + console + chart ----
  const grid = el('div', 'dl-grid');
  const codeW = el('div', 'dl-codew');
  const cp = codePanel({
    value: '', language: 'python', editable: false, minLines: 4, maxLines: narrow ? 12 : 16, title: 'main.py', locale: lang,
    ariaLabel: T('The program so far: each operation you run adds a line', 'Program sejauh ini: setiap operasi yang kamu jalankan menambah satu baris'),
  });
  codeW.appendChild(cp.el);
  const side = el('div', 'dl-side');
  const conW = el('div', 'dl-conw');
  const out = consolePanel({
    minLines: 3, maxLines: 8, title: T('Output (console)', 'Keluaran (konsol)'), locale: lang,
    ariaLabel: T('Program output', 'Keluaran program'),
    placeholder: T('print() output and error messages appear here.', 'Keluaran print() dan pesan galat muncul di sini.'),
  });
  conW.appendChild(out.el);
  const chartBox = el('div');
  const chartW = el('div', 'dl-chartw');
  const chart = createCanvas(chartW);
  chart.canvas.setAttribute('role', 'img');
  const chartCap = el('p', 'dl-chart-cap', T('Steps for each lookup you run: orange = comparisons in the list of pairs, green = slots the dict checked.', 'Langkah setiap pencarian yang kamu jalankan: oranye = perbandingan di list pasangan, hijau = slot yang diperiksa dict.'));
  chartBox.append(chartW, chartCap);
  side.append(conW, chartBox);
  grid.append(codeW, side);
  main.appendChild(grid);

  // ---- controls panel ----
  const presetSel = select({
    label: T('Dictionary or example program', 'Dictionary atau program contoh'), key: 'dict',
    options: PRESETS.map((p) => ({ value: p.key, label: pick(p.name) })), value: 'grades',
    onChange: (v) => { const p = PRESETS.find((q) => q.key === v); if (p) { loadPreset(p, true); announce(pick(p.name)); } },
  });
  {
    const sel = presetSel.el.querySelector('select');
    const g1 = el('optgroup');
    g1.label = T('Dictionaries to explore', 'Dictionary untuk dijelajahi');
    const g2 = el('optgroup');
    g2.label = T('Example programs', 'Program contoh');
    for (const o of [...sel.options]) (PRESETS.find((p) => p.key === o.value).group === 'dict' ? g1 : g2).appendChild(o);
    sel.append(g1, g2);
    sel.value = 'grades';
  }
  ctrlPanel.appendChild(presetSel.el);
  let classN = 12;
  const nSlider = slider({
    label: T('Class size n (students)', 'Banyak siswa n'), key: 'n', min: 1, max: 36, step: 1, value: classN,
    onInput: (v) => { classN = v; if (preset.sized) loadPreset(preset, true); },
  });
  ctrlPanel.appendChild(nSlider.el);
  const SPEEDS = [0.5, 1, 2, 4, Infinity];
  const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let speed = reduce ? Infinity : 1;
  const speedSl = slider({
    label: T('Animation speed', 'Kecepatan animasi'), key: 'speed', min: 1, max: 5, step: 1, value: reduce ? 5 : 2,
    format: (v) => ['½×', '1×', '2×', '4×', T('instant', 'instan')][v - 1],
    onInput: (v) => { speed = SPEEDS[v - 1]; },
  });
  ctrlPanel.appendChild(speedSl.el);
  ctrlPanel.appendChild(el('p', 'dl-note', T(
    'Left: the same data as a list of pairs, searched from the front. Right: the dict as CPython stores it: hash(key) % slots picks a slot, a slot points to an entry (#0, #1 … in insertion order), × marks a deleted key. Amber = being checked, green = found or new, red = missing. Python randomises str hashes each time it starts, so the slot numbers of str keys are one example; int keys hash to themselves.',
    'Kiri: data yang sama sebagai list pasangan, dicari dari depan. Kanan: dict seperti yang disimpan CPython: hash(kunci) % banyak slot memilih slot, slot menunjuk ke entri (#0, #1 … sesuai urutan masuk), × menandai kunci yang dihapus. Kuning = sedang diperiksa, hijau = ketemu atau baru, merah = tidak ada. Python mengacak hash str setiap kali dijalankan, jadi nomor slot untuk kunci str hanyalah satu contoh; kunci int hash-nya adalah dirinya sendiri.')));

  const lab = labPanel({
    title: 'Dictionary lookup lab',
    filename: 'dictionary-lookup-data.csv',
    columns: [
      { key: 'op', label: 'Operation' },
      { key: 'n', label: 'Size n' },
      { key: 'list', label: 'List steps' },
      { key: 'dict', label: 'Dict steps' },
      { key: 'found', label: 'Key found' },
    ],
    procedure: [
      'Choose "Class of n students" and set n = 6. Look up the last student with d[k] (the key box suggests the name) and record the row.',
      'Repeat for n = 12, 24 and 36, always looking up the last student. Record each row.',
      'Run get() with a key that is not in the class (e.g. Zaki) at n = 12 and n = 36. Record both.',
      'Compare the List steps and Dict steps columns: which one grows with n? Check your dots on the chart.',
      'Add new students with d[k] = v until the table grows (watch the slot count jump). How many keys fit in 8 slots? In 16?',
    ],
    predict: 'A class of 36 students is stored as a list of pairs and as a dict. How many comparisons does the list need to find the last student? To learn that a name is missing? How many slots does the dict check?',
    source: () => labRecord(),
  });
  ctrlPanel.appendChild(lab.el);

  // ------------------------------------------------------------------------------------------------------------
  // State
  // ------------------------------------------------------------------------------------------------------------
  let preset = PRESETS[0];
  let chunks = [];
  let prog = null;
  let pos = 0;
  let anim = null;
  let animT = 0;
  let animDone = true;
  let playing = null;
  let waitT = 0;
  let pendingSyntax = null;
  let longRun = 0;
  let curOp = 'get';
  let dirty = true;
  let chartDirty = true;
  let lastW = 0;
  let lastCW = 0;
  let lastH = 0;
  let lastCvH = 0;
  let lastChH = 0;

  const codeOf = (p) => (typeof p.code === 'function' ? p.code(classN)[lang] : p.code[lang]);
  const curPlan = () => (pos > 0 && prog ? prog.plans[pos - 1] : null);
  const focusName = () => { const pl = curPlan(); return pl ? pl.focus : pick(preset.dict); };
  const focusRest = () => { const pl = curPlan(); return pl && pl.focus === focusName() ? pl.rest : null; };

  function buildProgram(chs) {
    const src = `${chs.map((c) => c.text).join('\n')}\n`;
    const lines = src.split('\n');
    lines.pop();
    const chunkOfLine = [];
    chs.forEach((c, i) => { for (let k = 0; k < c.text.split('\n').length; k++) chunkOfLine.push(i); });
    const ex = execute(src);
    if (!ex.ok) return { src, lines, chunkOfLine, syntax: ex.error, steps: [], plans: [], anims: [] };
    const plans = analyse(lines, ex.steps, pick(preset.dict));
    plans.forEach((pl, i) => { pl.chunk = chunkOfLine[ex.steps[i].line - 1] ?? chs.length - 1; });
    return { src, lines, chunkOfLine, steps: ex.steps, plans, anims: plans.map(planAnim), syntax: null };
  }

  function loadPreset(p, animateFirst) {
    stopPlay();
    preset = p;
    pendingSyntax = null;
    longRun = 0;
    nSlider.el.hidden = !p.sized;
    chunks = splitChunks(codeOf(p)).map((text) => ({ text, user: false }));
    prog = buildProgram(chunks);
    argK.inp.value = typeof p.k === 'function' ? p.k(classN) : pick(p.k);
    argV.inp.value = pick(p.v);
    argD.inp.value = '';
    argM.inp.value = '';
    goTo(0, false);
    if (p.group === 'dict' && animateFirst) playUntil(prog.steps.length);
    updatePreview();
  }

  function goTo(p, animate) {
    pos = Math.max(0, Math.min(p, prog.steps.length));
    anim = pos > 0 ? prog.anims[pos - 1] : null;
    animT = anim && animate && speed !== Infinity ? 0 : anim ? anim.total : 0;
    animDone = !anim || animT >= anim.total;
    dirty = true;
    chartDirty = true;
    renderDom();
  }
  function finishAnim() { if (anim && !animDone) { animT = anim.total; animDone = true; dirty = true; } }

  function stepOnce() {
    finishAnim();
    if (pos >= prog.steps.length) { announce(T('The program has finished. Add a statement, or press Reset.', 'Program sudah selesai. Tambah pernyataan, atau tekan Ulang.')); return; }
    goTo(pos + 1, true);
    announceStep();
  }
  function playUntil(until) {
    playing = { until };
    waitT = 0;
    if (pos < until && animDone) goTo(pos + 1, true);
    renderBar();
  }
  function stopPlay() {
    playing = null;
    finishAnim();
    renderBar();
  }
  function togglePlay() {
    if (playing) { stopPlay(); return; }
    if (pos >= prog.steps.length) goTo(0, false);
    playUntil(prog.steps.length);
  }

  function finalErrorChunk() {
    const st = prog.steps[prog.steps.length - 1];
    if (!st || !st.error) return -1;
    return prog.plans[prog.plans.length - 1].chunk;
  }

  function runStatement(stmt, typed) {
    stopPlay();
    longRun = 0;
    let base = chunks.slice();
    const ec = finalErrorChunk();
    let dropped = null;
    let replaced = null;
    if (ec >= 0 && ec === base.length - 1) { replaced = base[ec]; dropped = base[ec].user ? null : base[ec].text; base = base.slice(0, -1); } else if (ec >= 0) {
      announce(T('The program stops with an error before the end. Press Reset first.', 'Program berhenti karena galat sebelum akhir. Tekan Ulang dulu.'));
      status.innerHTML = `<b>${esc(T('Stopped', 'Berhenti'))}</b>: ${esc(T('the program ends with an error before your statement. Press Reset first.', 'program berakhir dengan galat sebelum pernyataanmu. Tekan Ulang dulu.'))}`;
      return;
    }
    // a typed one-liner (for … : body, a; b) is written out on separate lines, the way Python runs it
    let unfolded = false;
    if (typed) {
      const u = unfold(stmt);
      const head = base.map((c) => c.text).join('\n');
      if (u && compile(`${head}\n${stmt}\n`, { filename: 'main.py' }).ok && compile(`${head}\n${u}\n`, { filename: 'main.py' }).ok) { stmt = u; unfolded = true; }
    }
    const next = [...base, { text: stmt, user: true, replaced }];
    const p2 = buildProgram(next);
    if (p2.syntax) {
      // nothing runs: the program stays as it was (Undo or a corrected statement continues from there)
      pendingSyntax = { text: stmt, error: p2.syntax, lines: p2.lines, src: p2.src };
      goTo(prog.steps.length, false);
      announce(`${p2.syntax.type}: ${p2.syntax.message}. ${T('Python checks the whole file before running, so nothing ran.', 'Python memeriksa seluruh berkas sebelum menjalankan, jadi tidak ada yang berjalan.')}`);
      return;
    }
    pendingSyntax = null;
    chunks = next;
    prog = p2;
    const notes = [];
    if (dropped) notes.push(T(`The example's last line stopped the program with an error, so your statement replaces it (Undo brings it back): ${dropped.split('\n')[0]}`, `Baris terakhir contoh menghentikan program dengan galat, jadi pernyataanmu menggantikannya (Batalkan mengembalikannya): ${dropped.split('\n')[0]}`));
    if (unfolded) notes.push(T('Your line is written out on separate lines; Python runs it exactly the same way, and now each step has its own line.', 'Barismu ditulis pada baris-baris terpisah; Python menjalankannya dengan cara yang persis sama, dan kini setiap langkah punya barisnya sendiri.'));
    const ci = next.length - 1;
    let start = prog.plans.findIndex((pl) => pl.chunk === ci);
    if (start < 0) start = prog.steps.length;
    if (prog.steps.length - start > LONG_RUN) {
      // a long loop (or one that never ends) would take minutes to replay: show where it ended
      longRun = prog.steps.length - start;
      goTo(prog.steps.length, false);
      notes.push(T(`Your statement ran ${longRun} steps, too many to replay one by one, so the end is shown. Use Back and Step to look at single steps.`, `Pernyataanmu berjalan ${longRun} langkah, terlalu banyak untuk diputar satu per satu, jadi akhirnya langsung ditampilkan. Pakai Mundur dan Langkah untuk melihat langkah satu per satu.`));
    } else {
      goTo(start, false);
      playUntil(prog.steps.length);
    }
    if (notes.length) announce(notes.join(' '));
  }

  function undo() {
    stopPlay();
    longRun = 0;
    if (pendingSyntax) { pendingSyntax = null; goTo(pos, false); return; }
    if (!chunks.length || !chunks[chunks.length - 1].user) return;
    const lastC = chunks[chunks.length - 1];
    chunks = chunks.slice(0, -1);
    if (lastC.replaced) chunks.push(lastC.replaced);
    prog = buildProgram(chunks);
    goTo(prog.steps.length, false);
    announce(T('The last statement was removed.', 'Pernyataan terakhir dihapus.'));
  }

  // ------------------------------------------------------------------------------------------------------------
  // Builder
  // ------------------------------------------------------------------------------------------------------------
  const opAvailable = (op) => {
    const rest = focusRest();
    if (op.counter) return !!rest && rest.dkind === 'Counter';
    if (op.numeric) return !rest || rest.dkind === 'Counter' || rest.pairs.every((p) => p.v.type === 'int' || p.v.type === 'float');
    return true;
  };
  function selectOp(key, focus) {
    curOp = key;
    for (const [k, b] of opBtns) {
      const on = k === key;
      b.setAttribute('aria-checked', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
      if (on && focus) b.focus();
    }
    updatePreview();
  }
  function onOpKey(e) {
    const keys = OPS.filter((o) => !opBtns.get(o.key).hidden).map((o) => o.key);
    let i = keys.indexOf(curOp);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') i = (i + 1) % keys.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') i = (i - 1 + keys.length) % keys.length;
    else if (e.key === 'Home') i = 0;
    else if (e.key === 'End') i = keys.length - 1;
    else return;
    e.preventDefault();
    selectOp(keys[i], true);
  }
  function loopVars(D) {
    const kv = pick(preset.kv);
    if (D === pick(preset.dict) && kv && !kv.includes(D)) return kv;
    const gen = T(['key', 'value'], ['kunci', 'isi']);
    return gen.includes(D) ? ['k', 'v'] : gen;
  }
  function builderStmt() {
    const D = focusName();
    const kRaw = argK.inp.value;
    const k = literal(kRaw);
    const v = literal(argV.inp.value);
    const d = argD.inp.value.trim() ? literal(argD.inp.value) : null;
    const mm = argM.inp.value.trim();
    const need = (s, nm) => { if (!s.trim()) throw new Error(T(`Type a value for ${nm} first.`, `Isi dulu ${nm}.`)); };
    switch (curOp) {
      case 'get': need(kRaw, 'k'); return `print(${D}[${k}])`;
      case 'getm': need(kRaw, 'k'); return d != null ? `print(${D}.get(${k}, ${d}))` : `print(${D}.get(${k}))`;
      case 'in': need(kRaw, 'k'); return `print(${k} in ${D})`;
      case 'len': return `print(len(${D}))`;
      case 'for': { const [a, b] = loopVars(D); return `for ${a}, ${b} in ${D}.items():\n    print(${a}, ${b})`; }
      case 'most': if (mm && !/^\d+$/.test(mm)) throw new Error(T('m must be a whole number (or empty).', 'm harus bilangan bulat (atau kosong).')); return mm ? `print(${D}.most_common(${mm}))` : `print(${D}.most_common())`;
      case 'set': need(kRaw, 'k'); need(argV.inp.value, 'v'); return `${D}[${k}] = ${v}`;
      case 'aug': need(kRaw, 'k'); need(argV.inp.value, 'v'); return `${D}[${k}] += ${v}`;
      case 'del': need(kRaw, 'k'); return `del ${D}[${k}]`;
      case 'pop': need(kRaw, 'k'); return d != null ? `print(${D}.pop(${k}, ${d}))` : `print(${D}.pop(${k}))`;
      default: return '';
    }
  }
  let lastKeys = '';
  function updatePreview() {
    for (const op of OPS) {
      const ok = opAvailable(op);
      opBtns.get(op.key).hidden = !ok;
      if (!ok && curOp === op.key) { curOp = 'get'; selectOp('get', false); return; }
    }
    const op = OPS.find((o) => o.key === curOp);
    argK.lab.hidden = !op.args.includes('k');
    argV.lab.hidden = !op.args.includes('v');
    argD.lab.hidden = !op.args.includes('def');
    argM.lab.hidden = !op.args.includes('m');
    argsRow.hidden = op.args.length === 0;
    const D = focusName();
    buildH.innerHTML = `${esc(T('Try an operation on', 'Coba operasi pada'))} <code>${esc(D)}</code>`;
    ownIn.placeholder = `${D}[${literal(pick(preset.miss))}] = ${literal(pick(preset.v))}`;
    try {
      prev.innerHTML = hl(builderStmt());
      runBtn.disabled = false;
    } catch (e) {
      prev.textContent = e.message;
      runBtn.disabled = true;
    }
    const h = OP_HINT[curOp];
    hint.textContent = lang === 'id' ? h[1] : h[0];
    const rest = focusRest();
    const keys = rest ? rest.pairs.map(rawKey) : [];
    const miss = pick(preset.miss);
    if (miss && !keys.includes(String(miss))) keys.push(String(miss));
    const sig = keys.join('\u0001');
    if (sig !== lastKeys) {
      lastKeys = sig;
      keyList.replaceChildren(...keys.slice(0, 60).map((k) => { const o = el('option'); o.value = k; return o; }));
    }
  }
  function runBuilder() {
    let stmt;
    try { stmt = builderStmt(); } catch (e) { announce(e.message); return; }
    runStatement(stmt);
  }
  function runOwn() {
    const s = ownIn.value.replace(/\s+$/, '');
    if (!s.trim()) { announce(T('Type a Python statement first.', 'Ketik dulu sebuah pernyataan Python.')); ownIn.focus(); return; }
    runStatement(s, true);
  }

  // ------------------------------------------------------------------------------------------------------------
  // Rendering the DOM parts
  // ------------------------------------------------------------------------------------------------------------
  function announce(text) { live.textContent = ''; setTimeout(() => { live.textContent = text; }, 30); }
  function announceStep() {
    const pl = curPlan();
    if (!pl) return;
    const why = pl.segs.map((g) => explain(g, T)).filter(Boolean).join(' ');
    announce(`${T('Line', 'Baris')} ${pl.line}: ${pl.text.split('\n')[0]}. ${why}${pl.error ? ` ${pl.error.type}: ${pl.error.message}` : ''}`);
  }

  function renderBar() {
    const total = prog ? prog.steps.length : 0;
    bBack.disabled = pos === 0;
    bStep.disabled = pos >= total;
    bPlay.textContent = playing ? T('⏸ Pause', '⏸ Jeda') : T('▶ Run all', '▶ Jalankan semua');
    bPlay.setAttribute('aria-label', playing ? T('Pause', 'Jeda') : T('Run all remaining lines with animation', 'Jalankan semua baris yang tersisa dengan animasi'));
    bUndo.disabled = !pendingSyntax && !(chunks.length && chunks[chunks.length - 1].user);
    let s;
    if (pendingSyntax) s = `<b>${esc(pendingSyntax.error.type)}</b> — ${esc(T('nothing ran; fix the statement or press Undo.', 'tidak ada yang berjalan; perbaiki pernyataannya atau tekan Batalkan.'))}`;
    else if (pos >= total && total && prog.steps[total - 1].error) s = `<b>${esc(T('Stopped', 'Berhenti'))}</b>: ${esc(prog.steps[total - 1].error.type)} ${esc(T('on line', 'di baris'))} ${prog.steps[total - 1].line}.`;
    else if (pos >= total) s = `<b>${esc(T('Finished', 'Selesai'))}</b> · ${esc(T('step', 'langkah'))} ${pos} / ${total}. ${esc(T('Add an operation above.', 'Tambahkan operasi di atas.'))}`;
    else s = `${esc(T('Step', 'Langkah'))} ${pos} / ${total} · <b>${esc(T('line', 'baris'))} ${prog.steps[pos].line}</b> ${esc(T('runs next', 'dijalankan berikutnya'))}.`;
    if (longRun && pos >= total && !pendingSyntax) s += ` ${esc(T(`(Your statement ran ${longRun} steps, so the end is shown; use Back to replay single steps.)`, `(Pernyataanmu berjalan ${longRun} langkah, jadi akhirnya langsung ditampilkan; pakai Mundur untuk memutar ulang langkah demi langkah.)`))}`;
    status.innerHTML = s;
  }

  function stepTotals(pl) {
    const look = pl.segs.filter((g) => g.kind === 'lookup');
    if (!look.length) return null;
    return { n: look[0].n, list: look.reduce((s, g) => s + g.listSteps, 0), dict: look.reduce((s, g) => s + g.dictSteps, 0), found: look[0].found, count: look.length };
  }

  function renderInfo() {
    const pl = curPlan();
    info.classList.remove('is-err', 'is-ok');
    if (pendingSyntax) {
      const e = pendingSyntax.error;
      info.classList.add('is-err');
      info.innerHTML = `<div class="dl-top"><span class="dl-ln">${esc(T('Not run', 'Tidak dijalankan'))}</span><code class="dl-code">${hl(pendingSyntax.text)}</code></div>`
        + `<p class="dl-why">${esc(T(`Python found a ${e.type} on line ${e.line} before running anything, so the program did not start. Read the message in the console, then fix the statement (or press Undo).`, `Python menemukan ${e.type} di baris ${e.line} sebelum menjalankan apa pun, jadi program tidak dimulai. Baca pesannya di konsol, lalu perbaiki pernyataannya (atau tekan Batalkan).`))}</p>`;
      return;
    }
    if (!pl) {
      info.innerHTML = `<p class="dl-why">${esc(preset.group === 'program'
        ? T('Press Step to run the example one line at a time (or Run all). Watch the list of pairs search from the front while the dict jumps to one slot.', 'Tekan Langkah untuk menjalankan contoh baris demi baris (atau Jalankan semua). Amati list pasangan mencari dari depan sementara dict langsung melompat ke satu slot.')
        : T('Choose an operation below and run it. Each operation becomes a line of Python in the program.', 'Pilih sebuah operasi di bawah lalu jalankan. Setiap operasi menjadi satu baris Python di program.'))}</p>`;
      return;
    }
    const why = pl.segs.map((g) => explain(g, T)).filter(Boolean).join(' ');
    const err = pl.error;
    if (err) info.classList.add('is-err');
    else if (pl.segs.some((g) => g.kind === 'lookup')) info.classList.add('is-ok');
    let h = `<div class="dl-top"><span class="dl-ln">${esc(T('line', 'baris'))} ${pl.line}</span><code class="dl-code">${hl(pl.text)}</code></div>`;
    if (why) h += `<p class="dl-why">${esc(why)}</p>`;
    else if (!err && pl.unreplayed) h += `<p class="dl-why">${esc(T('This line uses the dictionary in a way the picture does not replay step by step (for example inside a list comprehension); the output shows what Python did.', 'Baris ini memakai dictionary dengan cara yang tidak diputar ulang langkah demi langkah oleh gambar (misalnya di dalam list comprehension); keluarannya menunjukkan apa yang dilakukan Python.'))}</p>`;
    else if (!err && pl.hold) {
      const pr = pl.hold.pairsIn[pl.hold.j];
      h += `<p class="dl-why">${esc(T(`No dictionary operation on this line. Inside the for loop the current pair is still (${pr.k}, ${pr.v.repr}), pair ${pl.hold.j + 1} of ${pl.hold.n}.`, `Tidak ada operasi dictionary di baris ini. Di dalam perulangan for, pasangan yang sedang diproses masih (${pr.k}, ${pr.v.repr}), pasangan ke-${pl.hold.j + 1} dari ${pl.hold.n}.`))}</p>`;
    } else if (!err) h += `<p class="dl-why">${esc(T('No dictionary operation on this line.', 'Tidak ada operasi dictionary di baris ini.'))}</p>`;
    const tot = stepTotals(pl);
    if (tot) {
      h += `<div class="dl-cost"><span class="dl-pill">n = ${tot.n}</span><span class="dl-pill l">${esc(T('list of pairs', 'list pasangan'))}: ${tot.list} ${esc(T(tot.list === 1 ? 'comparison' : 'comparisons', 'perbandingan'))}</span><span class="dl-pill d">dict: ${tot.dict} ${esc(T(tot.dict === 1 ? 'slot checked' : 'slots checked', 'slot diperiksa'))}</span></div>`;
    }
    if (pl.out) {
      const lines = pl.out.replace(/\n$/, '').split('\n');
      h += `<div class="dl-out"><span>${esc(T('Output', 'Keluaran'))}:</span><code class="dl-code">${esc(lines.slice(-3).join('\n'))}</code></div>`;
    }
    if (err) h += `<div class="dl-out err"><span>${esc(T('Error', 'Galat'))}:</span><code class="dl-code">${esc(`${err.type}: ${err.message}`)}</code></div>`;
    if (err && err.type === 'StepLimit') h += `<p class="dl-why">${esc(T(`The sim stopped the program after ${limitWhat(err)} (python3 would keep running): does a loop here never end?`, `Simulasi menghentikan program setelah ${limitWhat(err)} (python3 akan terus berjalan): adakah perulangan yang tidak pernah berhenti?`))}</p>`;
    const changed = pl.segs.some((g) => g.mutate || g.kind === 'create' || g.kind === 'generic');
    if (changed && pl.rest) {
      const r = pl.rest.repr.length > 300 ? `${pl.rest.repr.slice(0, 299)}…` : pl.rest.repr;
      h += `<div class="dl-out"><span>${esc(T('Now', 'Sekarang'))}:</span><code class="dl-code">${hl(`${pl.focus} = ${r}`)}</code></div>`;
    }
    info.innerHTML = h;
  }

  function labRecord() {
    for (let s = pos - 1; s >= 0; s--) {
      const pl = prog.plans[s];
      const tot = stepTotals(pl);
      if (!tot) continue;
      const first = pl.text.split('\n')[0].trim().replace(/\s+#.*$/, '').replace(/:$/, '');
      return { op: shorten(first, 60), n: tot.n, list: tot.list, dict: tot.dict, found: tot.found ? 'yes' : 'no' };
    }
    return null;
  }

  function codeMarks() {
    const marks = [];
    if (pendingSyntax) {
      const e = pendingSyntax.error;
      marks.push({ line: e.line, kind: 'error', note: e.type, col: e.col ? e.col - 1 : undefined, endCol: e.endCol ? e.endCol - 1 : undefined });
      return marks;
    }
    const seen = new Set();
    for (let s = 0; s < pos; s++) seen.add(prog.steps[s].line);
    const lastSt = pos > 0 ? prog.steps[pos - 1] : null;
    for (const ln of seen) if (!lastSt || ln !== lastSt.line) marks.push({ line: ln, kind: 'visited' });
    if (lastSt) {
      if (lastSt.error) marks.push({ line: lastSt.line, kind: 'error', note: lastSt.error.type });
      else marks.push({ line: lastSt.line, kind: 'done' });
    }
    return marks;
  }

  let lastCode = null;
  function renderDom() {
    const code = pendingSyntax ? pendingSyntax.src : prog.src;
    if (code !== lastCode) { cp.value = code.replace(/\n$/, ''); lastCode = code; }
    cp.setMarks(codeMarks());
    cp.setActiveLine(!pendingSyntax && pos < prog.steps.length ? prog.steps[pos].line : null);
    if (pendingSyntax) out.set(pendingSyntax.error.traceback, { error: pendingSyntax.error.traceback });
    else if (pos === 0) out.clear();
    else {
      const st = prog.steps[pos - 1];
      const text = st.after.output || '';
      // the sim's step limit is not a Python error: python3 prints nothing for it, so the console gets a note
      if (st.error && st.error.simulatorLimit) out.set([{ text, kind: 'out' }, { text: `${text && !text.endsWith('\n') ? '\n' : ''}⏹ ${T('stopped by the sim after', 'dihentikan oleh simulasi setelah')} ${limitWhat(st.error)}\n`, kind: 'info' }]);
      else out.set(text, { error: st.error ? st.error.traceback : undefined });
    }
    renderInfo();
    renderBar();
    updatePreview();
    const pl = curPlan();
    const rest = pl ? pl.rest : null;
    const g = pl && pl.segs.length ? pl.segs[pl.segs.length - 1] : null;
    let label;
    if (rest) {
      const items = rest.pairs.slice(0, 12).map((p) => `${p.k}: ${p.v.repr}`).join(', ');
      label = T(`${pl.focus}: ${rest.pairs.length} pairs in a table of ${rest.model.size} slots. ${items}${rest.pairs.length > 12 ? ', …' : ''}.`,
        `${pl.focus}: ${rest.pairs.length} pasangan dalam tabel ${rest.model.size} slot. ${items}${rest.pairs.length > 12 ? ', …' : ''}.`);
      if (g && g.kind === 'lookup') label += T(` Last lookup: list of pairs ${g.listSteps} comparison${g.listSteps === 1 ? '' : 's'}, dict ${g.dictSteps} slot${g.dictSteps === 1 ? '' : 's'} checked.`, ` Pencarian terakhir: list pasangan ${g.listSteps} perbandingan, dict ${g.dictSteps} slot diperiksa.`);
    } else label = T(`${focusName()} does not exist yet.`, `${focusName()} belum ada.`);
    cv.canvas.setAttribute('aria-label', label);
    sizeCanvas();
  }

  function sizeCanvas() {
    const pl = curPlan();
    let size = 8;
    let n = 0;
    if (pl) {
      for (const g of pl.segs) { if (g.mIn) size = Math.max(size, g.mIn.size); if (g.mOut) size = Math.max(size, g.mOut.size); if (g.n) n = Math.max(n, g.n); }
      if (pl.rest) { size = Math.max(size, pl.rest.model.size); n = Math.max(n, pl.rest.pairs.length); }
    }
    if (prog && prog.plans.length && pos === 0 && preset.group === 'dict') {
      const last = prog.plans[prog.plans.length - 1];
      if (last.rest) { size = Math.max(size, last.rest.model.size); n = Math.max(n, last.rest.pairs.length); }
    }
    const h = wantHeight(cvWrap.clientWidth || 600, size, n);
    if (h !== lastH) { lastH = h; cvWrap.style.height = `${h}px`; dirty = true; }
  }

  function chartPoints() {
    const pts = [];
    for (let s = 0; s < pos; s++) for (const g of prog.plans[s].segs) if (g.kind === 'lookup') pts.push({ n: g.n, list: g.listSteps, dict: g.dictSteps });
    const seen = new Set();
    return pts.filter((p) => { const k = `${p.n}|${p.list}|${p.dict}`; if (seen.has(k)) return false; seen.add(k); return true; }).slice(-120);
  }

  // ------------------------------------------------------------------------------------------------------------
  // Animation loop
  // ------------------------------------------------------------------------------------------------------------
  function scene() {
    const pl = curPlan();
    const name = focusName();
    if (!pl) return { name, exists: false, g: null, rest: null };
    const at = animAt(anim, animT);
    if (at) return { name, exists: true, g: at.g, u: at.u, tm: at.tm, rest: pl.rest };
    if (pl.hold) return { name, exists: true, g: pl.hold, u: 0, tm: { total: 0 }, rest: pl.rest };
    return { name, exists: !!pl.rest, g: null, rest: pl.rest };
  }
  function draw() {
    if (!cv.width) return;
    drawScene(cv.ctx, cv.width, cv.height, scene(), T);
  }
  function drawChartNow() {
    if (!chart.width) return;
    const pts = chartPoints();
    drawChart(chart.ctx, chart.width, chart.height, pts, T);
    const lp = pts[pts.length - 1];
    chart.canvas.setAttribute('aria-label', T(
      `Chart of steps against the number of pairs n. Lines: a missing key costs the list of pairs n comparisons, a found key about (n + 1)/2, the dict about 1 slot. ${pts.length} lookup(s) plotted${lp ? `; the last: n = ${lp.n}, list ${lp.list} comparisons, dict ${lp.dict} slots` : ''}.`,
      `Grafik langkah terhadap banyak pasangan n. Garis: kunci yang tidak ada membuat list pasangan butuh n perbandingan, kunci yang ada sekitar (n + 1)/2, dict sekitar 1 slot. ${pts.length} pencarian digambar${lp ? `; yang terakhir: n = ${lp.n}, list ${lp.list} perbandingan, dict ${lp.dict} slot` : ''}.`));
  }

  const animator = loop((dt) => {
    if (cv.width !== lastW) { lastW = cv.width; sizeCanvas(); dirty = true; }
    // a new height (bigger table) resizes the canvas, which clears it: draw again even when nothing is animating
    if (cv.height !== lastCvH) { lastCvH = cv.height; dirty = true; }
    if (chart.width !== lastCW || chart.height !== lastChH) { lastCW = chart.width; lastChH = chart.height; chartDirty = true; }
    if (anim && !animDone) {
      animT += dt * (speed === Infinity ? 1e9 : speed);
      if (animT >= anim.total) { animT = anim.total; animDone = true; }
      dirty = true;
    }
    if (playing && animDone) {
      waitT += dt;
      if (waitT >= (speed === Infinity ? 0.25 : 0.12 / Math.max(0.5, speed))) {
        waitT = 0;
        if (pos < playing.until && pos < prog.steps.length) goTo(pos + 1, true);
        else { playing = null; renderBar(); announceStep(); }
      }
    }
    if (dirty) { draw(); dirty = false; }
    if (chartDirty) { drawChartNow(); chartDirty = false; }
  });

  // ------------------------------------------------------------------------------------------------------------
  selectOp('get', false);
  loadPreset(PRESETS[0], true);
  animator.start();

  return () => {
    animator.stop();
    cv.destroy();
    chart.destroy();
    cp.destroy();
    out.destroy();
  };
}
