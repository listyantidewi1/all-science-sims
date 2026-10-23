// Lists and Arrays (PP 02 cinema seats A1–A5, PP 03 playlist): every list operation is a real line of Python that
// runs in minipy (src/lib/minipy.js), and a row of cells shows what Python does inside the list: direct index
// access, items shifting right for insert() and left for pop(i) / remove(), the scan of remove() / index() / in,
// slices copied into a new list, the for loop walking the cells, sort() and reverse(). Each operation shows its
// statement, the resulting repr and its cost (cells read / cells moved); a chart compares the moves of insert at
// the front, insert in the middle and append as the list grows.
//
// How it works: the program (preset lines + the statements the student adds) is run from the start with minipy and
// every step is kept as a before / after snapshot. Each step is analysed: the list operations in the line are
// found from its tokens, their arguments are evaluated with the "before" variables (minipy evalExpression, so
// Python's own == decides where remove() / index() / in stop), and the predicted result is checked against the
// real "after" list. Only a prediction that matches is animated cell by cell; anything else is shown as a plain
// before → after change, so the picture never disagrees with Python.
import { createCanvas, loop } from '../../../lib/canvas.js';
import { select, slider, toggle } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';
import { compile, createRun, evalExpression, tokenize } from '../../../lib/minipy.js';
import { codePanel, consolePanel, highlight } from '../../../lib/codepanel.js';

// PRESETS-START
// group 'list': a starting list to explore with the operation buttons; group 'program': a worked example from the
// materials (PP 03 Bab 5 Contoh Kasus 1–4, LK 2, Bab 4 IndexError, PP 02 cinema seats). `list` = the list shown
// first, `loopVar` = loop variable used by the for button, `x` = default value for the value box, `cap` = seats.
const SONGS = '["Laskar Pelangi", "Hujan", "Bintang di Surga", "Tentang Rindu"]';
const PRESETS = [
  {
    key: 'playlist', group: 'list',
    name: { en: 'Playlist', id: 'Playlist' },
    list: { en: 'playlist', id: 'playlist' }, loopVar: { en: 'song', id: 'lagu' }, x: { en: 'Kupu-Kupu', id: 'Kupu-Kupu' },
    code: { en: `playlist = ${SONGS}\n`, id: `playlist = ${SONGS}\n` },
  },
  {
    key: 'seats', group: 'list', cap: 5,
    name: { en: 'Cinema seats A1–A5', id: 'Kursi bioskop A1–A5' },
    list: { en: 'seats', id: 'kursi' }, loopVar: { en: 'viewer', id: 'penonton' }, x: { en: 'Budi', id: 'Budi' },
    code: {
      en: '# seats A1-A5 = indices 0-4 (seat A5 is still empty)\nseats = ["Rio", "Dea", "Nia", "Dodo"]\n',
      id: '# kursi A1-A5 = indeks 0-4 (kursi A5 masih kosong)\nkursi = ["Rio", "Dea", "Nia", "Dodo"]\n',
    },
  },
  {
    key: 'scores', group: 'list',
    name: { en: 'Daily scores', id: 'Nilai harian' },
    list: { en: 'daily_scores', id: 'nilai_harian' }, loopVar: { en: 'score', id: 'nilai' }, x: { en: '100', id: '100' },
    code: { en: 'daily_scores = [80, 85, 90, 75]\n', id: 'nilai_harian = [80, 85, 90, 75]\n' },
  },
  {
    key: 'basket', group: 'list',
    name: { en: 'Co-op shopping basket', id: 'Keranjang koperasi' },
    list: { en: 'basket', id: 'keranjang' }, loopVar: { en: 'item', id: 'barang' }, x: { en: 'Marker', id: 'Spidol' },
    code: {
      en: 'basket = ["Notebook", "Pen", "Correction tape", "Ruler"]\n',
      id: 'keranjang = ["Buku Tulis", "Pulpen", "Tipe-X", "Penggaris"]\n',
    },
  },
  {
    key: 'numbers', group: 'list', sized: true,
    name: { en: 'Numbers 1 to n (choose n)', id: 'Angka 1 sampai n (pilih n)' },
    list: { en: 'numbers', id: 'angka' }, loopVar: { en: 'num', id: 'a' }, x: { en: '99', id: '99' },
    code: (n) => {
      const vals = Array.from({ length: n }, (_, i) => i + 1).join(', ');
      return { en: `numbers = [${vals}]\n`, id: `angka = [${vals}]\n` };
    },
  },
  {
    key: 'ex1', group: 'program',
    name: { en: 'Example 1: class duty list (index, -1, len)', id: 'Contoh 1: Daftar siswa piket (indeks, -1, len)' },
    list: { en: 'duty_students', id: 'siswa_piket' }, loopVar: { en: 'name', id: 'nama' }, x: { en: 'Eko', id: 'Eko' },
    code: {
      en: `duty_students = ["Andi", "Budi", "Cici", "Dina"]
print("Full list:", duty_students)
print("Board cleaner (index 0):", duty_students[0])
print("Last on duty (index -1):", duty_students[-1])
print("Number on duty:", len(duty_students))
`,
      id: `siswa_piket = ["Andi", "Budi", "Cici", "Dina"]
print("Daftar lengkap:", siswa_piket)
print("Pembersih papan tulis (indeks 0):", siswa_piket[0])
print("Petugas terakhir (indeks -1):", siswa_piket[-1])
print("Jumlah petugas:", len(siswa_piket))
`,
    },
  },
  {
    key: 'ex2', group: 'program',
    name: { en: 'Example 2: daily scores (append, insert)', id: 'Contoh 2: Nilai harian (append, insert)' },
    list: { en: 'daily_scores', id: 'nilai_harian' }, loopVar: { en: 'score', id: 'nilai' }, x: { en: '95', id: '95' },
    code: {
      en: `daily_scores = [80, 85, 90, 75]
daily_scores.append(100)  # add at the end
print("After append :", daily_scores)
daily_scores.insert(0, 70)  # insert at the very front
print("After insert :", daily_scores)
print("Highest:", max(daily_scores), "| lowest:", min(daily_scores))
print("Total :", sum(daily_scores), "| average:", sum(daily_scores) / len(daily_scores))
`,
      id: `nilai_harian = [80, 85, 90, 75]
nilai_harian.append(100)  # tambah di akhir
print("Setelah append :", nilai_harian)
nilai_harian.insert(0, 70)  # sisipkan di posisi paling depan
print("Setelah insert :", nilai_harian)
print("Nilai tertinggi:", max(nilai_harian), "| terendah:", min(nilai_harian))
print("Jumlah total :", sum(nilai_harian), "| rata-rata:", sum(nilai_harian) / len(nilai_harian))
`,
    },
  },
  {
    key: 'ex3', group: 'program',
    name: { en: 'Example 3: co-op basket (change, remove, pop, in)', id: 'Contoh 3: Keranjang koperasi (ubah, remove, pop, in)' },
    list: { en: 'basket', id: 'keranjang' }, loopVar: { en: 'item', id: 'barang' }, x: { en: 'Eraser', id: 'Penghapus' },
    code: {
      en: `basket = ["Notebook", "Pen", "Correction tape", "Ruler"]
basket[1] = "Marker"  # replace the pen with a marker
print("After replacing :", basket)
basket.remove("Correction tape")  # decided not to buy it
print("After removing :", basket)
last = basket.pop()  # take the last item out of the basket
print("Taken out :", last, "| left:", basket)
if "Pen" in basket:
    basket.remove("Pen")
else:
    print("No pen in the basket, nothing to remove.")
`,
      id: `keranjang = ["Buku Tulis", "Pulpen", "Tipe-X", "Penggaris"]
keranjang[1] = "Spidol"  # ganti Pulpen menjadi Spidol
print("Setelah diganti :", keranjang)
keranjang.remove("Tipe-X")  # batal membeli Tipe-X
print("Setelah dihapus :", keranjang)
terakhir = keranjang.pop()  # ambil barang terakhir dari keranjang
print("Dikeluarkan :", terakhir, "| sisa:", keranjang)
if "Pulpen" in keranjang:
    keranjang.remove("Pulpen")
else:
    print("Pulpen tidak ada di keranjang, tidak perlu dihapus.")
`,
    },
  },
  {
    key: 'ex4', group: 'program',
    name: { en: 'Example 4: numbered playlist (for, enumerate)', id: 'Contoh 4: Playlist bernomor (for, enumerate)' },
    list: { en: 'playlist', id: 'playlist' }, loopVar: { en: 'song', id: 'lagu' }, x: { en: 'Kupu-Kupu', id: 'Kupu-Kupu' },
    code: {
      en: `playlist = ${SONGS}
# Way 1: with an index
for i in range(len(playlist)):
    print(i + 1, ".", playlist[i])
print("---")
# Way 2: with enumerate (numbers start at 1)
for number, title in enumerate(playlist, start=1):
    print(f"{number}. {title}")
`,
      id: `playlist = ${SONGS}
# Cara 1: dengan indeks
for i in range(len(playlist)):
    print(i + 1, ".", playlist[i])
print("---")
# Cara 2: dengan enumerate (nomor mulai dari 1)
for nomor, judul in enumerate(playlist, start=1):
    print(f"{nomor}. {judul}")
`,
    },
  },
  {
    key: 'cinema', group: 'program', cap: 5,
    name: { en: 'Cinema seats: a new viewer in A2', id: 'Kursi bioskop: penonton baru di A2' },
    list: { en: 'seats', id: 'kursi' }, loopVar: { en: 'viewer', id: 'penonton' }, x: { en: 'Tono', id: 'Tono' },
    code: {
      en: `# seats A1-A5 = indices 0-4; seat A5 is still empty
seats = ["Rio", "Dea", "Nia", "Dodo"]
print("Sitting in A3:", seats[2])  # straight to index 2
seats.insert(1, "Budi")  # a new viewer must sit in A2
print("After Budi arrives:", seats)
leaving = seats.pop(0)  # Rio leaves seat A1
print(leaving, "leaves:", seats)
seats.append("Sari")  # takes the empty seat at the back: nobody shifts
print("Finally:", seats)
`,
      id: `# kursi A1-A5 = indeks 0-4; kursi A5 masih kosong
kursi = ["Rio", "Dea", "Nia", "Dodo"]
print("Yang duduk di A3:", kursi[2])  # langsung ke indeks 2
kursi.insert(1, "Budi")  # penonton baru harus duduk di A2
print("Setelah Budi masuk:", kursi)
keluar = kursi.pop(0)  # Rio keluar dari kursi A1
print(keluar, "keluar:", kursi)
kursi.append("Sari")  # duduk di kursi kosong paling belakang: tidak ada yang geser
print("Akhirnya:", kursi)
`,
    },
  },
  {
    key: 'lk2', group: 'program',
    name: { en: 'Modular playlist (functions)', id: 'Playlist modular (fungsi)' },
    list: { en: 'playlist', id: 'playlist' }, loopVar: { en: 'song', id: 'lagu' }, x: { en: 'Kupu-Kupu', id: 'Kupu-Kupu' },
    code: {
      en: `def show_playlist(songs):
    """Show every song with its number."""
    if len(songs) == 0:
        print("  (playlist is empty)")
    for number, title in enumerate(songs, start=1):
        print(f"  {number}. {title}")

def add_song(songs, title):
    """Add a song at the end of the playlist."""
    songs.append(title)
    print(f"-> {title} added at the end.")

def delete_song(songs, title):
    """Delete one song; safe if the title is missing."""
    if title in songs:
        songs.remove(title)
        print(f"-> {title} deleted.")
    else:
        print(f"-> {title} not found, nothing deleted.")

def insert_song(songs, position, title):
    """Insert a song at a position (positions start at 1)."""
    songs.insert(position - 1, title)
    print(f"-> {title} inserted at position {position}.")

playlist = ${SONGS}
add_song(playlist, "Kupu-Kupu")
delete_song(playlist, "Hujan")
insert_song(playlist, 2, "Melompat Lebih Tinggi")
show_playlist(playlist)
delete_song(playlist, "Pelangi")  # test a title that is not there
`,
      id: `def tampilkan_playlist(daftar):
    """Menampilkan seluruh lagu beserta nomor urutnya."""
    if len(daftar) == 0:
        print("  (playlist kosong)")
    for nomor, judul in enumerate(daftar, start=1):
        print(f"  {nomor}. {judul}")

def tambah_lagu(daftar, judul):
    """Menambahkan lagu di akhir playlist."""
    daftar.append(judul)
    print(f"-> {judul} ditambahkan di akhir.")

def hapus_lagu(daftar, judul):
    """Menghapus lagu tertentu; aman jika judul tidak ada."""
    if judul in daftar:
        daftar.remove(judul)
        print(f"-> {judul} dihapus.")
    else:
        print(f"-> {judul} tidak ditemukan, tidak ada yang dihapus.")

def sisip_lagu(daftar, posisi, judul):
    """Menyisipkan lagu pada posisi tertentu (posisi dihitung mulai 1)."""
    daftar.insert(posisi - 1, judul)
    print(f"-> {judul} disisipkan di posisi {posisi}.")

playlist = ${SONGS}
tambah_lagu(playlist, "Kupu-Kupu")
hapus_lagu(playlist, "Hujan")
sisip_lagu(playlist, 2, "Melompat Lebih Tinggi")
tampilkan_playlist(playlist)
hapus_lagu(playlist, "Pelangi")  # menguji judul yang tidak ada
`,
    },
  },
  {
    key: 'safe', group: 'program',
    name: { en: 'IndexError and try-except', id: 'IndexError dan try-except' },
    list: { en: 'duty_students', id: 'siswa_piket' }, loopVar: { en: 'name', id: 'nama' }, x: { en: 'Eko', id: 'Eko' },
    code: {
      en: `duty_students = ["Andi", "Budi", "Cici", "Dina"]
number = 7  # the duty number a user typed (valid: 1-4)
try:
    print("On duty:", duty_students[number - 1])
except IndexError:
    print("That number is outside the list.")
print("Without try-except:")
print(duty_students[number - 1])
`,
      id: `siswa_piket = ["Andi", "Budi", "Cici", "Dina"]
nomor = 7  # nomor urut yang diketik pengguna (yang sah: 1-4)
try:
    print("Petugas piket:", siswa_piket[nomor - 1])
except IndexError:
    print("Nomor urut di luar jangkauan daftar.")
print("Tanpa try-except:")
print(siswa_piket[nomor - 1])
`,
    },
  },
  {
    key: 'grow', group: 'program',
    name: { en: 'Grow a list: insert(0, x) vs append(x)', id: 'Menumbuhkan list: insert(0, x) vs append(x)' },
    list: { en: 'front', id: 'depan' }, loopVar: { en: 'num', id: 'a' }, x: { en: '7', id: '7' },
    code: {
      en: `front = []
for i in range(1, 7):
    front.insert(0, i)  # insert at the front: every old item shifts
print(front)
back = []
for i in range(1, 7):
    back.append(i)  # add at the back: nothing shifts
print(back)
`,
      id: `depan = []
for i in range(1, 7):
    depan.insert(0, i)  # sisip di depan: semua data lama bergeser
print(depan)
belakang = []
for i in range(1, 7):
    belakang.append(i)  # tambah di belakang: tidak ada yang bergeser
print(belakang)
`,
    },
  },
];
// PRESETS-END

// ENGINE-START
// ---------------------------------------------------------------------------------------------------------------
// Running the program: every line event of minipy becomes one step with a snapshot before and after it.
// ---------------------------------------------------------------------------------------------------------------
const MAX_STEPS = 1500;

/** Split a program into top-level statements (a statement keeps its indented body, else/elif/except/finally). */
function splitChunks(code) {
  const lines = code.replace(/\n+$/, '').split('\n');
  const chunks = [];
  let cur = [];
  const isStmt = (l) => /^\S/.test(l) && !/^#/.test(l);
  for (const l of lines) {
    if (isStmt(l) && !/^(else|elif|except|finally)\b/.test(l) && cur.some(isStmt)) { chunks.push(cur.join('\n')); cur = []; }
    cur.push(l);
  }
  if (cur.length) chunks.push(cur.join('\n'));
  return chunks;
}

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
      if (cur) { cur.after = snap; cur.error = ev.error; steps.push(cur); }
      else steps.push({ line: ev.error.line || 1, before: snap, after: snap, out: '', error: ev.error });
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
// Analysing one step: which operations on the shown list does the line contain, and what did they do?
// ---------------------------------------------------------------------------------------------------------------
const MUTATORS = new Set(['append', 'insert', 'pop', 'remove', 'sort', 'reverse', 'extend', 'clear']);
const WHOLE_FUNCS = new Set(['sum', 'max', 'min', 'sorted', 'list', 'tuple', 'set', 'any', 'all', 'str', 'repr']);
const SAFE_FUNCS = new Set(['len', 'abs', 'int', 'float', 'str', 'bool', 'min', 'max', 'round', 'sum', 'sorted', 'list', 'range', 'tuple']);
const SAFE_METHODS = new Set(['index', 'count', 'upper', 'lower', 'strip', 'title', 'capitalize', 'replace', 'copy', 'startswith', 'endswith', 'find', 'get']);
const AUG = /^(=|\+=|-=|\*=|\/=|\/\/=|%=|\*\*=)$/;
const OPEN = new Set(['(', '[', '{']);
const CLOSE = new Set([')', ']', '}']);

function toks(text) {
  try {
    return tokenize(text).filter((t) => t.type !== 'newline' && t.type !== 'indent' && t.type !== 'dedent' && t.type !== 'comment');
  } catch { return null; }
}
const isNameTok = (t) => !!t && (t.type === 'name' || t.type === 'builtin');
const isOp = (t, s) => !!t && t.type === 'op' && t.text === s;
function closeOf(ts, k) {
  let d = 0;
  for (let j = k; j < ts.length; j++) {
    if (ts[j].type !== 'op') continue;
    if (OPEN.has(ts[j].text)) d++;
    else if (CLOSE.has(ts[j].text)) { d--; if (d === 0) return j; }
  }
  return ts.length;
}
function srcOf(text, ts, a, b) {
  b = Math.min(b, ts.length);
  if (a >= b) return '';
  return text.slice(ts[a].col, ts[b - 1].col + ts[b - 1].text.length).trim();
}
function splitTop(ts, a, b, sep) {
  const parts = [];
  let d = 0;
  let s = a;
  for (let j = a; j < b; j++) {
    const t = ts[j];
    if (t.type !== 'op') continue;
    if (OPEN.has(t.text)) d++;
    else if (CLOSE.has(t.text)) d--;
    else if (d === 0 && t.text === sep) { parts.push([s, j]); s = j + 1; }
  }
  parts.push([s, b]);
  return parts;
}
/** The call whose parentheses contain token k: { fn, open, isMethod } or null (also null inside [ ] or { }). */
function enclosingCall(ts, k) {
  let d = 0;
  for (let j = k - 1; j >= 0; j--) {
    const t = ts[j];
    if (t.type !== 'op') continue;
    if (CLOSE.has(t.text)) d++;
    else if (OPEN.has(t.text)) {
      if (d > 0) { d--; continue; }
      if (t.text !== '(') return null;
      const f = ts[j - 1];
      if (!isNameTok(f)) return null;
      return { fn: f.text, open: j, isMethod: isOp(ts[j - 2], '.') };
    }
  }
  return null;
}
/** Start of the left operand of `in` (tokens before index `end`). */
function leftStart(ts, end) {
  let d = 0;
  for (let j = end - 1; j >= 0; j--) {
    const t = ts[j];
    if (t.type === 'op') {
      if (CLOSE.has(t.text)) d++;
      else if (OPEN.has(t.text)) { if (d === 0) return j + 1; d--; }
      else if (d === 0 && (t.text === ',' || t.text === ':' || (AUG.test(t.text)))) return j + 1;
    } else if (d === 0 && t.type === 'keyword' && /^(if|elif|while|and|or|not|return|assert|else|in|is|lambda|for)$/.test(t.text)) return j + 1;
  }
  return 0;
}
function topLevel(ts, test) {
  let d = 0;
  for (let j = 0; j < ts.length; j++) {
    const t = ts[j];
    if (t.type === 'op' && OPEN.has(t.text)) d++;
    else if (t.type === 'op' && CLOSE.has(t.text)) d--;
    else if (d === 0 && test(t, j)) return j;
  }
  return -1;
}

/** Find the operations on the list (any of `names`) in one line of code. */
function findOps(text, ts, names) {
  const ops = [];
  const kw = ts[0] && ts[0].type === 'keyword' ? ts[0].text : '';
  const eq = topLevel(ts, (t) => t.type === 'op' && AUG.test(t.text));
  const forIn = kw === 'for' ? topLevel(ts, (t, j) => j > 0 && t.type === 'keyword' && t.text === 'in') : -1;
  for (let k = 0; k < ts.length; k++) {
    const t = ts[k];
    if (!isNameTok(t) || !names.has(t.text)) continue;
    const prev = ts[k - 1];
    const next = ts[k + 1];
    if (isOp(prev, '.')) continue;
    const inIter = forIn >= 0 && k > forIn;
    if (k === 0 && next && next.type === 'op' && next.text === '+=') {
      ops.push({ kind: 'm', method: 'extend', args: [srcOf(text, ts, 2, ts.length)], at: k, inIter });
      break;
    }
    if (isOp(next, '.') && isNameTok(ts[k + 2]) && isOp(ts[k + 3], '(')) {
      const close = closeOf(ts, k + 3);
      const args = close > k + 4 ? splitTop(ts, k + 4, close, ',').map(([a, b]) => srcOf(text, ts, a, b)) : [];
      ops.push({ kind: 'm', method: ts[k + 2].text, args, at: k, inIter });
      k = close;
      continue;
    }
    if (isOp(next, '[')) {
      const close = closeOf(ts, k + 1);
      const parts = splitTop(ts, k + 2, close, ':').map(([a, b]) => srcOf(text, ts, a, b));
      let mode = 'read';
      if (kw === 'del' && k === 1 && close === ts.length - 1) mode = 'del';
      else if (k === 0 && eq === close + 1) mode = ts[eq].text === '=' ? 'assign' : 'aug';
      ops.push({ kind: parts.length > 1 ? 'slice' : 'item', mode, parts, at: k, inIter });
      k = close;
      continue;
    }
    if (prev && prev.type === 'keyword' && prev.text === 'in') {
      if (k - 1 === forIn) { ops.push({ kind: 'walk', target: srcOf(text, ts, 1, forIn), at: k }); continue; }
      const neg = !!ts[k - 2] && ts[k - 2].type === 'keyword' && ts[k - 2].text === 'not';
      const end = neg ? k - 2 : k - 1;
      ops.push({ kind: 'in', neg, left: srcOf(text, ts, leftStart(ts, end), end), at: k, inIter });
      continue;
    }
    const call = enclosingCall(ts, k);
    if (call && !call.isMethod && call.open === k - 1) {
      if (call.fn === 'len') { ops.push({ kind: 'len', at: k, inIter }); continue; }
      if (call.fn === 'enumerate' && forIn >= 0 && call.open - 2 === forIn) {
        ops.push({ kind: 'walk', target: srcOf(text, ts, 1, forIn), at: k });
        continue;
      }
    }
    if (call && !call.isMethod && (call.fn === 'print' || WHOLE_FUNCS.has(call.fn))) {
      ops.push({ kind: 'whole', fn: call.fn, at: k, inIter });
      continue;
    }
    if (call && !call.isMethod) ops.push({ kind: 'pass', fn: call.fn, at: k, inIter });
  }
  return { ops, kw, eq, forIn };
}

const lastFrame = (snap) => snap.frames[snap.frames.length - 1];
function mapOf(snap) {
  const m = new Map();
  const g = snap.frames[0];
  for (const l of g.locals) m.set(l.name, l.value);
  const cur = lastFrame(snap);
  if (cur !== g) for (const l of cur.locals) m.set(l.name, l.value);
  return m;
}
const globalsOf = (snap) => new Map(snap.frames[0].locals.map((l) => [l.name, l.value]));
const isList = (v) => !!v && v.type === 'list';
const itemsOf = (v) => {
  const a = (v.items || []).map((x) => ({ text: x.repr, type: x.type }));
  if (v.truncated) a.truncated = v.truncated;
  return a;
};
function sameItems(a, b) {
  if (!a || !b || a.length !== b.length || a.truncated || b.truncated) return false;
  for (let i = 0; i < a.length; i++) if (a[i].text !== b[i].text || a[i].type !== b[i].type) return false;
  return true;
}
const eqAt = (a, i, b, j) => !!a[i] && !!b[j] && a[i].text === b[j].text && a[i].type === b[j].type;
/** Total length of an items array (minipy shows at most 200 items of a big list; `truncated` holds the length). */
const lenOf = (X) => X.truncated || X.length;
/** Equal, or not comparable because one side is beyond the items minipy showed. */
const eqOrHidden = (a, i, b, j) => !a[i] || !b[j] || (a[i].text === b[j].text && a[i].type === b[j].type);
function insertMatches(B, A, k) {
  const n = lenOf(B);
  if (lenOf(A) !== n + 1 || k < 0 || k > n) return false;
  for (let j = 0; j < Math.min(k, B.length); j++) if (!eqOrHidden(A, j, B, j)) return false;
  for (let j = k; j < B.length; j++) if (!eqOrHidden(A, j + 1, B, j)) return false;
  return true;
}
function deleteMatches(B, A, k) {
  const n = lenOf(B);
  if (lenOf(A) !== n - 1 || k < 0 || k >= n) return false;
  for (let j = 0; j < Math.min(k, B.length); j++) if (!eqOrHidden(A, j, B, j)) return false;
  for (let j = k + 1; j < B.length; j++) if (!eqOrHidden(A, j - 1, B, j)) return false;
  return true;
}
function firstDiff(B, A) {
  const m = Math.min(A.length, B.length);
  for (let j = 0; j < m; j++) if (!eqAt(A, j, B, j)) return j;
  return m;
}
/** Old index → new index for a reordering (stable for equal items, like Python's sort). */
function permutation(B, A) {
  if (A.length !== B.length) return null;
  const q = new Map();
  B.forEach((it, j) => { const key = it.type + '\u0000' + it.text; if (!q.has(key)) q.set(key, []); q.get(key).push(j); });
  const perm = new Array(B.length);
  for (let p = 0; p < A.length; p++) {
    const key = A[p].type + '\u0000' + A[p].text;
    const list = q.get(key);
    if (!list || !list.length) return null;
    perm[list.shift()] = p;
  }
  return perm;
}
/** CPython's slice.indices() for step != 0, as a list of indices. */
function sliceIdx(n, a, b, c) {
  const step = c == null ? 1 : c;
  let start;
  let stop;
  if (step > 0) {
    start = a == null ? 0 : (a < 0 ? Math.max(0, a + n) : Math.min(a, n));
    stop = b == null ? n : (b < 0 ? Math.max(0, b + n) : Math.min(b, n));
  } else {
    start = a == null ? n - 1 : (a < 0 ? Math.max(-1, a + n) : Math.min(a, n - 1));
    stop = b == null ? -1 : (b < 0 ? Math.max(-1, b + n) : Math.min(b, n - 1));
  }
  const out = [];
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) out.push(i);
  return out;
}
function safeExpr(src) {
  const ts = toks(src);
  if (!ts || !ts.length) return false;
  for (let k = 0; k < ts.length; k++) {
    const t = ts[k];
    if (t.type === 'error') return false;
    if (t.type === 'keyword' && /^(lambda|yield|await)$/.test(t.text)) return false;
    if (isOp(t, ':=')) return false;
    if (isOp(t, '(') && k > 0 && isNameTok(ts[k - 1])) {
      if (isOp(ts[k - 2], '.')) { if (!SAFE_METHODS.has(ts[k - 1].text)) return false; } else if (!SAFE_FUNCS.has(ts[k - 1].text)) return false;
    }
  }
  return true;
}
function ev(src, vars) {
  if (!src || !safeExpr(src)) return null;
  try {
    const r = evalExpression(src, vars);
    return r.ok ? { ok: true, v: r.value } : { ok: false, error: r.error };
  } catch { return null; }
}
function intOf(v) {
  if (!v) return null;
  if (v.type === 'int') { const n = Number(v.repr); return Number.isSafeInteger(n) ? n : (n > 0 ? 1e15 : -1e15); }
  if (v.type === 'bool') return v.repr === 'True' ? 1 : 0;
  return null;
}
function findIndex(listView, val) {
  if (!listView) return null;
  try {
    // A View of a big list holds only its first 200 items, but evalExpression rebuilds the whole list from its
    // repr; when even the repr was cut (very long lists) the rebuild fails and the answer is unknown (null).
    if (listView.reprTruncated) return null;
    const r = evalExpression('lst.index(val) if val in lst else -1', { lst: listView, val });
    if (!r.ok) return null;
    return Number(r.value.repr);
  } catch { return null; }
}
const fmtErr = (e) => `${e.type}: ${e.message}`;

function resultLabel(text, ts, at, eq, kw) {
  if (/^(if|elif|while)$/.test(kw)) return kw;
  if (eq > 0 && eq < at) return `${srcOf(text, ts, 0, eq)} ${ts[eq].text}`;
  const call = enclosingCall(ts, at);
  if (call) return call.isMethod ? '' : `${call.fn}()`;
  return '';
}

const hiddenItem = { text: '…', type: 'other' };
function planMutation(op, c) {
  const { B, A, err, vars, fb } = c;
  const n = lenOf(B);
  const argItem = (src, fallback) => { const r = ev(src, vars); return r && r.ok ? { text: r.v.repr, type: r.v.type } : (fallback || hiddenItem); };
  const label = resultLabel(c.text, c.ts, op.at, c.eq, c.kw);
  if (op.kind === 'm') {
    switch (op.method) {
      case 'append':
        if (!err && op.args.length === 1 && insertMatches(B, A, n)) return { k: 'append', item: A[n] || argItem(op.args[0]) };
        return null;
      case 'extend':
        if (!err && !B.truncated && !A.truncated && A.length >= n && firstDiff(B, A) === n) return { k: 'extend', items: A.slice(n) };
        return null;
      case 'clear':
        if (!err && lenOf(A) === 0) return { k: 'clear' };
        return null;
      case 'insert': {
        if (err || op.args.length !== 2) return null;
        const r = ev(op.args[0], vars);
        const i = r && r.ok ? intOf(r.v) : null;
        let idx = i == null ? firstDiff(B, A) : (i < 0 ? Math.max(0, i + n) : Math.min(i, n));
        if (!insertMatches(B, A, idx)) {
          if (i != null) return null;
          idx = firstDiff(B, A);
          if (!insertMatches(B, A, idx)) return null;
        }
        return { k: 'insert', idx, raw: i, item: A[idx] || argItem(op.args[1]), clamp: i == null ? null : (i > n ? 'end' : (i < -n ? 'front' : null)) };
      }
      case 'pop': {
        let i = n - 1;
        if (op.args.length) {
          const r = ev(op.args[0], vars);
          i = r && r.ok ? intOf(r.v) : null;
        }
        if (op.args.length > 1) return null;
        if (n === 0) {
          const own = err && err.type === 'IndexError';
          if (err && !own) return null;
          if (!err && !sameItems(B, A)) return null;
          return { k: 'pop', idx: null, empty: true, raw: op.args.length ? i : null, label, err: own ? fmtErr(err) : 'IndexError: pop from empty list', caught: !own };
        }
        if (i == null) {
          if (err) return null;
          const d = firstDiff(B, A);
          if (!deleteMatches(B, A, d)) return null;
          return { k: 'pop', idx: d, raw: null, item: B[d], label, argSrc: op.args[0] };
        }
        const k = i < 0 ? i + n : i;
        if (k < 0 || k >= n) {
          const own = err && err.type === 'IndexError';
          if (err && !own) return null;
          return { k: 'pop', idx: null, raw: i, label, err: own ? fmtErr(err) : 'IndexError: pop index out of range', caught: !own };
        }
        if (err || !deleteMatches(B, A, k)) return null;
        return { k: 'pop', idx: k, raw: op.args.length ? i : null, item: B[k] || hiddenItem, label };
      }
      case 'remove': {
        if (op.args.length !== 1) return null;
        const x = ev(op.args[0], vars);
        const found = x && x.ok ? findIndex(fb, x.v) : null;
        const valText = x && x.ok ? x.v.repr : op.args[0];
        if (found === -1) {
          const own = err && err.type === 'ValueError';
          if (err && !own) return null;
          if (!err && !sameItems(B, A)) return null;
          return { k: 'remove', found: -1, valText, err: own ? fmtErr(err) : 'ValueError: list.remove(x): x not in list', caught: !own };
        }
        if (err) return null;
        const k = found == null ? firstDiff(B, A) : found;
        if (!deleteMatches(B, A, k)) return null;
        return { k: 'remove', found: k, valText, item: B[k] };
      }
      case 'sort':
      case 'reverse': {
        if (B.truncated || A.truncated) return null;
        const perm = permutation(B, A);
        if (!perm) return null;
        if (op.method === 'reverse' && !err && perm.some((p, j) => !eqAt(A, n - 1 - j, B, j))) return null;
        let moves = 0;
        perm.forEach((p, j) => { if (p !== j) moves++; });
        if (op.method === 'reverse') moves = 2 * Math.floor(n / 2);
        return { k: op.method, perm, moves, desc: /reverse\s*=\s*True/.test(op.args.join(',')), err: err ? fmtErr(err) : null };
      }
      default:
        return null;
    }
  }
  if (op.kind === 'item' && (op.mode === 'assign' || op.mode === 'aug' || op.mode === 'del')) {
    const r = ev(op.parts[0], vars);
    const i = r && r.ok ? intOf(r.v) : null;
    if (i == null) return null;
    const k = i < 0 ? i + n : i;
    if (k < 0 || k >= n) {
      const own = err && err.type === 'IndexError';
      if (err && !own) return null;
      const msg = op.mode === 'aug' ? 'IndexError: list index out of range' : 'IndexError: list assignment index out of range';
      return { k: op.mode === 'del' ? 'del' : 'assign', idx: null, raw: i, err: own ? fmtErr(err) : msg, caught: !own };
    }
    if (op.mode === 'del') {
      if (err || !deleteMatches(B, A, k)) return null;
      return { k: 'del', idx: k, raw: i, item: B[k] || hiddenItem };
    }
    if (err || lenOf(A) !== n) return null;
    for (let j = 0; j < B.length; j++) if (j !== k && !eqOrHidden(A, j, B, j)) return null;
    return { k: 'assign', idx: k, raw: i, item: A[k] || hiddenItem, old: B[k] || hiddenItem, aug: op.mode === 'aug' };
  }
  return null;
}

function planRead(o, c, iter) {
  const { B, err, vars, fb } = c;
  const n = lenOf(B);
  const label = resultLabel(c.text, c.ts, o.at, c.eq, c.kw);
  switch (o.kind) {
    case 'item': {
      const r = ev(o.parts[0], vars);
      const i = r && r.ok ? intOf(r.v) : null;
      if (i == null) return null;
      const k = i < 0 ? i + n : i;
      if (k < 0 || k >= n) {
        const own = err && err.type === 'IndexError';
        if (err && !own) return null;
        return { k: 'item', idx: null, raw: i, label, err: own ? fmtErr(err) : 'IndexError: list index out of range', caught: !own };
      }
      return { k: 'item', idx: k, raw: i, item: B[k], label };
    }
    case 'slice': {
      if (o.parts.length > 3) return null;
      const vals = [];
      for (const s of o.parts) {
        if (!s) { vals.push(null); continue; }
        const r = ev(s, vars);
        if (!r || !r.ok) return null;
        if (r.v.type === 'NoneType') { vals.push(null); continue; }
        const v = intOf(r.v);
        if (v == null) return null;
        vals.push(v);
      }
      if (vals[2] === 0) return null;
      return { k: 'slice', idxs: sliceIdx(n, vals[0], vals[1], vals[2]), label, src: o.parts.join(':') };
    }
    case 'len':
      return { k: 'len', label };
    case 'in': {
      const x = ev(o.left, vars);
      if (!x || !x.ok) return null;
      const f = findIndex(fb, x.v);
      if (f == null) return null;
      return { k: 'in', found: f, neg: o.neg, valText: x.v.repr, label };
    }
    case 'm': {
      if (o.method === 'index' && o.args.length === 1) {
        const x = ev(o.args[0], vars);
        if (!x || !x.ok) return null;
        const f = findIndex(fb, x.v);
        if (f == null) return null;
        if (f === -1) {
          const own = err && err.type === 'ValueError';
          if (err && !own) return null;
          return { k: 'index', found: -1, valText: x.v.repr, label, err: own ? fmtErr(err) : `ValueError: ${x.v.repr} is not in list`, caught: !own };
        }
        return { k: 'index', found: f, valText: x.v.repr, label };
      }
      if (o.method === 'count' || o.method === 'copy') return { k: 'whole', fn: `${o.method}()`, label };
      return null;
    }
    case 'walk': {
      const names = o.target.split(',').map((s) => s.trim()).filter(Boolean);
      const vals = names.map((nm) => (c.mA.get(nm) ? c.mA.get(nm).repr : '?'));
      return { k: 'walk', iter, target: o.target, valueText: vals.length === 1 ? vals[0] : `(${vals.join(', ')})` };
    }
    case 'whole':
      return { k: 'whole', fn: `${o.fn}()`, label };
    case 'pass':
      return null;
    default:
      return null;
  }
}

/** Cells read / moved by one part (null = not counted, e.g. the comparisons inside sort()). */
function costOf(p, n) {
  switch (p.k) {
    case 'item': return [p.idx == null ? 0 : 1, 0];
    case 'assign': return [p.aug && p.idx != null ? 1 : 0, 0];
    case 'append': case 'extend': case 'clear': case 'len': return [0, 0];
    case 'insert': return [0, n - p.idx];
    case 'pop': return p.idx == null ? [0, 0] : [1, n - p.idx - 1];
    case 'del': return p.idx == null ? [0, 0] : [0, n - p.idx - 1];
    case 'remove': return p.found < 0 ? [n, 0] : [p.found + 1, n - p.found - 1];
    case 'index': case 'in': return [p.found < 0 ? n : p.found + 1, 0];
    case 'slice': return [p.idxs.length, 0];
    case 'walk': return [p.iter < n ? 1 : 0, 0];
    case 'whole': return [n, 0];
    case 'sort': return [null, p.moves];
    case 'reverse': return [p.moves, p.moves];
    case 'generic': case 'same': case 'uses': return [null, null];
    default: return [0, 0];
  }
}

function bodyEnd(lines, L) {
  const ind = (s) => s.length - s.trimStart().length;
  const h = ind(lines[L - 1] || '');
  let end = L;
  for (let j = L; j < lines.length; j++) {
    const s = lines[j];
    if (!s.trim() || s.trim().startsWith('#')) continue;
    if (ind(s) > h) end = j + 1;
    else break;
  }
  return end;
}

function planStep(st, text, focusName, iter) {
  const ts = toks(text) || [];
  const gB = globalsOf(st.before);
  const gA = globalsOf(st.after);
  const mB = mapOf(st.before);
  const mA = mapOf(st.after);
  const mentioned = [];
  ts.forEach((t, j) => { if (isNameTok(t) && !isOp(ts[j - 1], '.')) mentioned.push(t.text); });
  const aliasesIn = (m, id) => [...m].filter(([, v]) => isList(v) && v.id === id).map(([nm]) => nm);
  let fb = gB.get(focusName);
  let fa = gA.get(focusName);
  let names = new Set(isList(fb) ? aliasesIn(mB, fb.id) : [focusName]);
  if (!mentioned.some((nm) => names.has(nm))) {
    const other = mentioned.find((nm) => nm !== focusName && (isList(gA.get(nm)) || isList(gB.get(nm))));
    if (other) {
      focusName = other;
      fb = gB.get(other);
      fa = gA.get(other);
      names = new Set(isList(fb) ? aliasesIn(mB, fb.id) : [other]);
    }
  }
  const B = isList(fb) ? itemsOf(fb) : null;
  const A = isList(fa) ? itemsOf(fa) : null;
  const err = st.error || null;
  // the step limit stops the run after this statement has finished, so the statement itself went through
  const opErr = err && err.type !== 'StepLimit' ? err : null;
  const plan = {
    line: st.line, text, focus: focusName, id: isList(fa) ? fa.id : (isList(fb) ? fb.id : null),
    aliases: isList(fa) ? aliasesIn(mA, fa.id).filter((nm) => nm !== focusName) : [],
    before: B, after: A, n: B ? lenOf(B) : 0, parts: [], out: st.out, error: err, repr: isList(fa) ? fa.repr : null,
    assigned: null,
  };
  const { ops, kw, eq } = ts.length ? findOps(text, ts, names) : { ops: [], kw: '', eq: -1 };
  if (eq > 0 && ts[eq].text === '=' && eq === 1 && isNameTok(ts[0]) && mA.has(ts[0].text)) plan.assigned = `${ts[0].text} = ${mA.get(ts[0].text).repr}`;
  const errPart = () => (err ? [{ k: 'error', err: fmtErr(err) }] : []);
  if (!B && !A) { plan.parts.push(...(err ? errPart() : [{ k: 'none' }])); return plan; }
  if (!B || (A && fb.id !== fa.id)) {
    plan.parts.push({ k: 'create', items: A, rebind: !!B }, ...errPart());
    return plan;
  }
  if (!A) { plan.parts.push({ k: 'gone' }, ...errPart()); return plan; }
  const c = { B, A, err: opErr, vars: Object.fromEntries(mB), mA, fb, text, ts, eq, kw };
  const active = ops.filter((o) => !(kw === 'for' && iter > 0 && o.inIter && o.kind !== 'walk'));
  const isMut = (o) => (o.kind === 'm' && MUTATORS.has(o.method)) || ((o.kind === 'item' || o.kind === 'slice') && o.mode !== 'read');
  const muts = active.filter(isMut);
  const big = !!(B.truncated || A.truncated);
  const changed = big ? fb.repr !== fa.repr || lenOf(B) !== lenOf(A) : !sameItems(B, A);
  if (muts.length === 1) {
    const p = planMutation(muts[0], c);
    if (p) {
      plan.parts.push(p);
      if (err && !p.err) plan.parts.push(...errPart());
      return plan;
    }
  }
  if (changed) {
    plan.parts.push({ k: 'generic', items: A }, ...errPart());
    return plan;
  }
  for (const o of active) {
    if (isMut(o)) continue;
    const p = planRead(o, c, iter);
    if (p) { plan.parts.push(p); if (p.err) break; }
  }
  if (!plan.parts.length) {
    // passed to a function of the program (a def), not to a builtin such as reversed() or type()
    const pass = active.find((o) => o.kind === 'pass' && mB.has(o.fn) && mB.get(o.fn).type === 'function');
    // `b = L` makes a second name for the same list (no copy)
    const rhs = eq === 1 && ts.length === 3 && isNameTok(ts[0]) && isNameTok(ts[2]) && names.has(ts[2].text) ? ts[2].text : null;
    const nv = rhs ? mA.get(ts[0].text) : null;
    // `if L:` / `while not L:` tests whether the list is empty
    const tNeg = isOp(ts[ts.length - 1], ':') && ts.length === 4 && ts[1].type === 'keyword' && ts[1].text === 'not';
    const tName = /^(if|elif|while)$/.test(kw) && isOp(ts[ts.length - 1], ':') && (ts.length === 3 || tNeg) && isNameTok(ts[ts.length - 2]) && names.has(ts[ts.length - 2].text) ? ts[ts.length - 2].text : null;
    let q;
    if (tName && !opErr) q = { k: 'truth', kw, neg: tNeg, src: tName, val: (lenOf(B) > 0) !== tNeg };
    else if (pass) q = { k: 'pass', fn: pass.fn };
    else if (muts.length && !opErr) q = { k: 'same' };
    else if (kw === 'for' && iter > 0 && ops.some((o) => o.inIter)) q = { k: 'loopnext' };
    else if (rhs && isList(nv) && nv.id === fb.id) q = { k: 'alias', name: ts[0].text, src: rhs };
    else if (mentioned.some((nm) => names.has(nm))) q = { k: 'uses' };
    else q = { k: 'none' };
    plan.parts.push(q);
  }
  if (err && !plan.parts.some((p) => p.err)) plan.parts.push(...errPart());
  return plan;
}

/**
 * A line that holds more than one step: `a = 1; b = 2` (one step per statement) or a one-line compound statement
 * such as `for x in L: print(x)` (the header test, then the body statements, repeated). Returns the texts of the
 * steps in the order minipy runs them, or null for an ordinary line.
 */
function segmentsOf(text) {
  const ts = toks(text);
  if (!ts || !ts.length) return null;
  const kw = ts[0].type === 'keyword' ? ts[0].text : '';
  const pieces = (a) => splitTop(ts, a, ts.length, ';').map(([x, y]) => srcOf(text, ts, x, y)).filter(Boolean);
  if (/^(for|while|if|elif|else|try|except|finally|with|def)$/.test(kw)) {
    const colon = topLevel(ts, (t) => isOp(t, ':') && t !== ts[0]);
    if (colon < 0 || colon === ts.length - 1) return null;
    const body = pieces(colon + 1);
    const head = text.slice(0, ts[colon].col + 1).trim();
    if (kw === 'else' || kw === 'finally') return body.length > 1 ? { segs: body, loop: false } : null;
    if (kw === 'def') return null;
    return { segs: [head, ...body], loop: kw === 'for' || kw === 'while', kw };
  }
  const parts = pieces(0);
  return parts.length > 1 ? { segs: parts, loop: false } : null;
}

/** Analyse every step of a run. chunkOfLine maps a source line to its top-level statement. */
function analyse(lines, steps, chunkOfLine, focus0) {
  const plans = [];
  let focus = focus0;
  const lastLine = new Map();
  const iterOf = new Map();
  for (let s = 0; s < steps.length; s++) {
    const st = steps[s];
    const fr = lastFrame(st.before);
    let text = (lines[st.line - 1] || '').trim();
    let iter = 0;
    const seg = segmentsOf(text);
    if (seg) {
      const key = `${fr.id}:${st.line}`;
      const r = lastLine.get(fr.id) === st.line && iterOf.has(key) ? iterOf.get(key) + 1 : 0;
      iterOf.set(key, r);
      text = seg.segs[r % seg.segs.length];
      if (seg.kw === 'for') iter = Math.floor(r / seg.segs.length);
    } else if (/^for\b/.test(text)) {
      const key = `${fr.id}:${st.line}`;
      const prev = lastLine.get(fr.id);
      if (prev != null && prev >= st.line && prev <= bodyEnd(lines, st.line) && iterOf.has(key)) iter = iterOf.get(key) + 1;
      iterOf.set(key, iter);
    }
    lastLine.set(fr.id, st.line);
    const plan = planStep(st, text, focus, iter);
    plan.index = s;
    const modLine = st.before.frames[0].line || st.line;
    plan.chunk = chunkOfLine[modLine - 1] ?? chunkOfLine[st.line - 1] ?? 0;
    let reads = 0;
    let moves = 0;
    for (const p of plan.parts) {
      const [r, m] = costOf(p, plan.n);
      p.reads = r;
      p.moves = m;
      reads = reads == null || r == null ? null : reads + r;
      moves = moves == null || m == null ? null : moves + m;
    }
    plan.reads = reads;
    plan.moves = moves;
    focus = plan.focus;
    plans.push(plan);
  }
  return plans;
}
// ENGINE-END

// ---------------------------------------------------------------------------------------------------------------
// Animation: a list of key frames; tiles (the values) move between slots (the cells).
// ---------------------------------------------------------------------------------------------------------------
const D = { ptr: 0.34, move: 0.24, drop: 0.36, appear: 0.26, scan: 0.3, sweep: 0.075, perm: 0.95, create: 0.09, hold: 0.32 };
const MAXT = 20;
/** Parts that show no cell-by-cell animation (and no cost pills). */
const QUIET = new Set(['none', 'pass', 'same', 'alias', 'loopnext', 'uses']);

function cloneFrame(f) {
  return {
    ...f, tiles: f.tiles.map((t) => ({ ...t })), marks: f.marks.slice(), ptr: f.ptr && { ...f.ptr },
    ghost: f.ghost && { ...f.ghost }, bracket: f.bracket && { ...f.bracket }, resLabel: f.resLabel && { ...f.resLabel },
  };
}
class Anim {
  constructor(base) { this.keys = [{ t: 0, f: base }]; this.total = 0; this.cur = base; this.uid = 0; }
  to(dur, fn) {
    const f = cloneFrame(this.cur);
    if (fn) fn(f);
    this.total += dur;
    this.keys.push({ t: this.total, f });
    this.cur = f;
    return f;
  }
  get end() { return this.cur; }
}
function emptyFrame() {
  return { n: 0, slots: 0, cap: 0, tiles: [], ptr: null, ghost: null, marks: [], bracket: null, resLabel: null, resText: null, err: null, reads: 0, moves: 0, name: '', aliases: [], missing: false, arc: 'up', more: 0 };
}
function baseFrame(items, plan, cap) {
  const f = emptyFrame();
  const shown = items.slice(0, MAXT);
  f.n = lenOf(items);
  f.slots = Math.min(items.length, MAXT);
  f.cap = cap;
  f.more = Math.max(0, lenOf(items) - shown.length);
  f.tiles = shown.map((it, j) => ({ id: `t${j}`, text: it.text, type: it.type, x: j, y: 0, a: 1, hl: null }));
  f.name = plan.focus;
  f.aliases = plan.aliases;
  return f;
}
const tileOf = (f, id) => f.tiles.find((t) => t.id === id);
const addCount = (f, key, v) => { f[key] = f[key] == null || v == null ? null : f[key] + v; };
const short = (s, n = 16) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

function buildAnim(plan, prevPlan, prevFinal, T, cap) {
  const sameChunk = !!prevPlan && prevPlan.chunk === plan.chunk && prevPlan.id === plan.id && plan.id != null;
  const onlyQuiet = plan.parts.every((p) => QUIET.has(p.k));
  const B = plan.before;
  let base;
  if (onlyQuiet && sameChunk && prevFinal && sameItems(prevPlan.after, plan.after)) {
    base = cloneFrame(prevFinal);
  } else if (B && (lenOf(B) > MAXT || (plan.after && lenOf(plan.after) > MAXT))) {
    const A = plan.after || B;
    base = baseFrame(A, plan, cap);
    base.reads = plan.reads;
    base.moves = plan.moves;
    const anim = new Anim(base);
    for (const p of plan.parts) if (p.err) anim.to(0.3, (f) => { f.err = p.err + (p.caught ? T(' (handled by except)', ' (ditangani except)') : ''); });
    anim.to(D.hold);
    return anim;
  } else if (B) {
    base = baseFrame(B, plan, cap);
  } else {
    base = emptyFrame();
    base.name = plan.focus;
    base.missing = true;
    base.gone = !!plan.seenBefore;
  }
  base.name = plan.focus;
  base.aliases = plan.aliases;
  base.cap = cap;
  if (sameChunk && prevFinal) {
    base.reads = prevFinal.reads;
    base.moves = prevFinal.moves;
    if (plan.parts[0] && plan.parts[0].k === 'walk' && prevFinal.ptr) base.ptr = { ...prevFinal.ptr };
  }
  const A = new Anim(base);
  const n = plan.n;
  for (const p of plan.parts) addPart(A, p, plan, T, n);
  A.to(onlyQuiet ? 0.22 : D.hold);
  return A;
}

function addPart(A, p, plan, T, n) {
  const caughtNote = (p2) => (p2.caught ? T(' (handled by except)', ' (ditangani except)') : '');
  const errOut = (f, p2) => { f.err = p2.err + caughtNote(p2); };
  const ghostAt = (raw) => (raw >= 0 ? n : -1);
  const copyTile = (A2, j, label, text, type) => {
    const id = `c${A2.uid++}`;
    A2.to(0, (f) => { f.tiles.push({ id, text, type, x: j, y: 0, a: 0, hl: 'res' }); });
    A2.to(D.drop, (f) => { const t = tileOf(f, id); t.y = 1; t.a = 1; f.resLabel = label ? { x: j, text: label } : f.resLabel; });
    return id;
  };
  const scan = (upto, valText, found) => {
    for (let j = 0; j <= upto && j < n; j++) {
      A.to(D.scan, (f) => {
        f.ptr = { x: j, label: `== ${short(valText, 14)}?` };
        addCount(f, 'reads', 1);
        f.marks.push({ x: j, ok: j === found });
        const t = tileOf(f, `t${j}`);
        if (t) t.hl = j === found ? 'found' : 'read';
      });
    }
  };
  const shiftLeftFrom = (k) => {
    for (let j = k + 1; j < n; j++) {
      A.to(D.move, (f) => { const t = tileOf(f, `t${j}`); if (t) { t.x = j - 1; t.hl = 'move'; } addCount(f, 'moves', 1); f.ptr = null; f.marks = []; });
    }
    A.to(D.appear, (f) => { f.n = n - 1; f.slots = Math.min(n - 1, MAXT); f.ptr = null; });
  };
  switch (p.k) {
    case 'none':
    case 'pass':
    case 'same':
    case 'alias':
    case 'loopnext':
      return;
    case 'uses':
      A.to(0, (f) => { f.reads = null; f.moves = null; });
      return;
    case 'create': {
      const items = (p.items || []).slice(0, MAXT);
      A.to(0, (f) => {
        f.missing = false;
        f.tiles = items.map((it, j) => ({ id: `n${j}`, text: it.text, type: it.type, x: j, y: 0, a: 0, hl: 'new' }));
        f.n = lenOf(p.items);
        f.slots = items.length;
        f.more = Math.max(0, lenOf(p.items) - items.length);
        f.reads = 0;
        f.moves = 0;
        f.ptr = null; f.marks = []; f.bracket = null; f.resLabel = null; f.resText = null; f.err = null; f.ghost = null;
      });
      if (!items.length) { A.to(0.4); return; }
      items.forEach((_, j) => A.to(D.create, (f) => { tileOf(f, `n${j}`).a = 1; }));
      A.to(0.3, (f) => { for (const t of f.tiles) t.hl = null; });
      return;
    }
    case 'gone':
      A.to(0.5, (f) => { for (const t of f.tiles) t.a = 0; f.n = 0; f.slots = 0; });
      A.to(0, (f) => { f.tiles = []; f.missing = true; f.gone = true; });
      return;
    case 'generic': {
      const items = p.items.slice(0, MAXT);
      A.to(0.3, (f) => { for (const t of f.tiles) t.a = 0; f.ptr = null; f.marks = []; });
      A.to(0, (f) => {
        f.tiles = items.map((it, j) => ({ id: `g${j}`, text: it.text, type: it.type, x: j, y: 0, a: 0, hl: null }));
        f.n = lenOf(p.items); f.slots = items.length; f.more = Math.max(0, lenOf(p.items) - items.length);
        f.reads = null; f.moves = null;
      });
      A.to(0.4, (f) => { for (const t of f.tiles) t.a = 1; });
      return;
    }
    case 'error':
      A.to(0.3, (f) => { f.err = p.err; });
      return;
    case 'item': {
      if (p.idx == null) {
        A.to(0, (f) => { f.ghost = { x: ghostAt(p.raw), label: `[${p.raw}]` }; });
        A.to(D.ptr, (f) => { f.ptr = { x: ghostAt(p.raw), label: '', bad: true }; });
        A.to(0.3, (f) => errOut(f, p));
        return;
      }
      A.to(D.ptr, (f) => { f.ptr = { x: p.idx, label: `[${p.raw}]` }; addCount(f, 'reads', 1); const t = tileOf(f, `t${p.idx}`); if (t) t.hl = 'read'; });
      copyTile(A, p.idx, p.label || T('value', 'nilai'), p.item.text, p.item.type);
      return;
    }
    case 'assign': {
      if (p.idx == null) {
        A.to(0, (f) => { f.ghost = { x: ghostAt(p.raw), label: `[${p.raw}]` }; });
        A.to(D.ptr, (f) => { f.ptr = { x: ghostAt(p.raw), label: `[${p.raw}] =`, bad: true }; });
        A.to(0.3, (f) => errOut(f, p));
        return;
      }
      const k = p.idx;
      A.to(D.ptr, (f) => { f.ptr = { x: k, label: `[${p.raw}] =` }; if (p.aug) addCount(f, 'reads', 1); f.tiles.push({ id: 'new', text: p.item.text, type: p.item.type, x: k, y: 1, a: 0, hl: 'new' }); });
      A.to(D.appear, (f) => { tileOf(f, 'new').a = 1; f.resLabel = { x: k, text: T('new value', 'nilai baru') }; });
      A.to(D.drop, (f) => { const t = tileOf(f, `t${k}`); if (t) { t.a = 0; t.y = -0.6; } });
      A.to(D.drop, (f) => { tileOf(f, 'new').y = 0; f.resLabel = null; });
      return;
    }
    case 'append':
    case 'extend': {
      const items = p.k === 'append' ? [p.item] : p.items;
      items.forEach((it, m) => {
        const j = n + m;
        if (j >= MAXT) return;
        A.to(0, (f) => { f.slots = Math.min(j + 1, MAXT); f.tiles.push({ id: `a${m}`, text: it.text, type: it.type, x: j, y: 1, a: 0, hl: 'new' }); });
        A.to(D.appear, (f) => { tileOf(f, `a${m}`).a = 1; f.resLabel = { x: j, text: T('new item', 'data baru') }; f.ptr = { x: j, label: p.k === 'append' ? 'append' : 'extend' }; });
        A.to(D.drop, (f) => { tileOf(f, `a${m}`).y = 0; f.n = j + 1; f.resLabel = null; });
      });
      A.to(0.1, (f) => { f.n = n + items.length; });
      return;
    }
    case 'insert': {
      const k = p.idx;
      A.to(0, (f) => { f.slots = Math.min(n + 1, MAXT); f.tiles.push({ id: 'new', text: p.item.text, type: p.item.type, x: k, y: 1, a: 0, hl: 'new' }); });
      A.to(D.appear, (f) => { tileOf(f, 'new').a = 1; f.resLabel = { x: k, text: T('new item', 'data baru') }; f.ptr = { x: k, label: `insert(${p.raw ?? k}, …)` }; });
      for (let j = n - 1; j >= k; j--) {
        A.to(D.move, (f) => { const t = tileOf(f, `t${j}`); if (t) { t.x = j + 1; t.hl = 'move'; } addCount(f, 'moves', 1); });
      }
      A.to(D.drop, (f) => { tileOf(f, 'new').y = 0; f.n = n + 1; f.resLabel = null; });
      return;
    }
    case 'pop':
    case 'del': {
      if (p.idx == null) {
        const gx = p.empty ? 0 : ghostAt(p.raw);
        A.to(0, (f) => { f.ghost = { x: gx, label: p.empty ? '' : `[${p.raw}]` }; });
        A.to(D.ptr, (f) => { f.ptr = { x: gx, label: p.k === 'del' ? `del [${p.raw}]` : (p.raw == null ? 'pop()' : `pop(${p.raw})`), bad: true }; });
        A.to(0.3, (f) => errOut(f, p));
        return;
      }
      const k = p.idx;
      A.to(D.ptr, (f) => {
        f.ptr = { x: k, label: p.k === 'del' ? `del [${p.raw}]` : (p.raw == null ? 'pop()' : `pop(${p.raw})`) };
        if (p.k === 'pop') addCount(f, 'reads', 1);
        const t = tileOf(f, `t${k}`); if (t) t.hl = p.k === 'pop' ? 'read' : 'err';
      });
      A.to(D.drop, (f) => {
        const t = tileOf(f, `t${k}`);
        if (t) { t.y = 1; t.hl = p.k === 'pop' ? 'res' : 'err'; if (p.k === 'del') t.a = 0.35; }
        f.resLabel = { x: k, text: p.k === 'pop' ? (p.label || T('returned', 'dikembalikan')) : T('deleted', 'dihapus') };
      });
      shiftLeftFrom(k);
      return;
    }
    case 'remove': {
      scan(p.found < 0 ? n - 1 : p.found, p.valText, p.found);
      if (p.found < 0) { A.to(0.3, (f) => { f.ptr = null; errOut(f, p); }); return; }
      const k = p.found;
      A.to(D.drop, (f) => { const t = tileOf(f, `t${k}`); if (t) { t.y = 1; t.a = 0.4; t.hl = 'err'; } f.resLabel = { x: k, text: T('removed', 'dihapus') }; });
      shiftLeftFrom(k);
      return;
    }
    case 'index':
    case 'in': {
      scan(p.found < 0 ? n - 1 : p.found, p.valText, p.found);
      if (p.k === 'index' && p.found < 0) { A.to(0.3, (f) => { f.ptr = null; errOut(f, p); }); return; }
      const val = p.k === 'index' ? String(p.found) : ((p.found >= 0) !== !!p.neg ? 'True' : 'False');
      const x = Math.max(0, p.found);
      A.to(0, (f) => { f.tiles.push({ id: `r${A.uid}`, text: val, type: p.k === 'index' ? 'int' : 'bool', x, y: 1, a: 0, hl: 'res' }); });
      A.to(D.appear, (f) => { tileOf(f, `r${A.uid}`).a = 1; f.resLabel = { x, text: p.label || (p.k === 'in' ? (p.neg ? 'not in' : 'in') : 'index()') }; });
      A.uid++;
      return;
    }
    case 'truth': {
      const val = p.val ? 'True' : 'False';
      A.to(D.ptr, (f) => { f.bracket = n ? { a: 0, b: Math.min(n, MAXT), kind: 'len' } : null; });
      A.to(0, (f) => { f.tiles.push({ id: `r${A.uid}`, text: val, type: 'bool', x: 0, y: 1, a: 0, hl: 'res' }); });
      A.to(D.appear, (f) => { tileOf(f, `r${A.uid}`).a = 1; f.resLabel = { x: 0, text: `${p.kw} ${p.neg ? 'not ' : ''}${p.src}` }; });
      A.uid++;
      return;
    }
    case 'len': {
      A.to(D.ptr, (f) => { f.bracket = { a: 0, b: Math.min(n, MAXT), kind: 'len' }; });
      A.to(0, (f) => { f.tiles.push({ id: `r${A.uid}`, text: String(n), type: 'int', x: 0, y: 1, a: 0, hl: 'res' }); });
      A.to(D.appear, (f) => { tileOf(f, `r${A.uid}`).a = 1; f.resLabel = { x: 0, text: p.label || 'len()' }; });
      A.uid++;
      return;
    }
    case 'slice': {
      const idxs = p.idxs.filter((j) => j < MAXT);
      if (!idxs.length) {
        A.to(D.ptr, (f) => { f.resText = { text: `[]  ${T('(an empty new list: a slice never raises IndexError)', '(list baru yang kosong: slice tidak pernah IndexError)')}` }; });
        return;
      }
      const contiguous = idxs.every((j, m) => m === 0 || j === idxs[m - 1] + 1);
      A.to(D.ptr, (f) => {
        if (contiguous) f.bracket = { a: idxs[0], b: idxs[idxs.length - 1] + 1, kind: 'slice' };
        for (const j of idxs) { const t = tileOf(f, `t${j}`); if (t) t.hl = 'read'; }
      });
      const ids = [];
      idxs.forEach((j) => {
        const id = `s${j}`;
        ids.push(id);
        A.to(0, (f) => { const src = tileOf(f, `t${j}`); f.tiles.push({ id, text: src.text, type: src.type, x: j, y: 0, a: 0, hl: 'res' }); });
        A.to(D.sweep * 2.2, (f) => { const t = tileOf(f, id); t.y = 1; t.a = 1; addCount(f, 'reads', 1); f.resLabel = { x: idxs[0], text: `${p.label ? `${p.label} ` : ''}${T('new list', 'list baru')}` }; });
      });
      if (idxs.some((j, m) => j !== m)) {
        A.to(D.drop, (f) => { ids.forEach((id, m) => { tileOf(f, id).x = m; }); f.resLabel = { x: 0, text: `${p.label ? `${p.label} ` : ''}${T('new list', 'list baru')}` }; });
      }
      return;
    }
    case 'walk': {
      if (p.iter >= n) {
        A.to(D.ptr, (f) => { f.ptr = { x: Math.min(n, MAXT), label: T('end', 'habis') }; f.resText = { text: T('no more items: the loop ends', 'tidak ada data lagi: perulangan selesai') }; });
        return;
      }
      const k = p.iter;
      A.to(D.ptr, (f) => { f.ptr = { x: k, label: short(p.target, 18) }; addCount(f, 'reads', 1); const t = tileOf(f, `t${k}`); if (t) t.hl = 'walk'; for (let j = 0; j < k; j++) { const u = tileOf(f, `t${j}`); if (u) u.hl = 'seen'; } });
      if (k < MAXT) copyTile(A, k, `${short(p.target, 18)} =`, p.valueText, p.valueText && p.valueText.startsWith('(') ? 'tuple' : (plan.before[k] || {}).type);
      return;
    }
    case 'whole': {
      const m = Math.min(n, MAXT);
      for (let j = 0; j < m; j++) {
        A.to(D.sweep, (f) => { f.ptr = { x: j, label: p.fn }; addCount(f, 'reads', 1); const t = tileOf(f, `t${j}`); if (t) t.hl = 'read'; });
      }
      if (n > m) A.to(0.1, (f) => { addCount(f, 'reads', n - m); });
      const tiles = plan.parts.some((q) => /^(item|len|index|in|slice|walk|pop)$/.test(q.k));
      A.to(0.15, (f) => { f.ptr = null; if (plan.out && !tiles) f.resText = { text: plan.out.replace(/\n$/, '').split('\n').pop(), out: true }; });
      return;
    }
    case 'sort':
    case 'reverse': {
      const m = Math.min(n, MAXT);
      A.to(D.ptr, (f) => { f.ptr = null; for (const t of f.tiles) t.hl = 'read'; });
      A.to(D.perm, (f) => {
        f.arc = 'split';
        for (let j = 0; j < m; j++) { const t = tileOf(f, `t${j}`); if (t && p.perm[j] < MAXT) { t.x = p.perm[j]; t.hl = p.perm[j] !== j ? 'move' : null; } }
        f.moves = f.moves == null ? null : f.moves + p.moves;
        if (p.k === 'reverse') addCount(f, 'reads', p.moves); else f.reads = null;
      });
      A.to(0.1, (f) => { f.arc = 'up'; if (p.err) errOut(f, p); });
      return;
    }
    case 'clear':
      A.to(0.5, (f) => { for (const t of f.tiles) { t.a = 0; t.y = 1; } });
      A.to(0, (f) => { f.tiles = []; f.n = 0; f.slots = 0; });
      return;
    default:
  }
}

// ---------------------------------------------------------------------------------------------------------------
// Drawing
// ---------------------------------------------------------------------------------------------------------------
const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';
const SANS = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
const TYPE_COL = { int: '#60a5fa', float: '#2dd4bf', str: '#c3e88d', bool: '#f472b6', NoneType: '#94a3b8', list: '#fb923c', tuple: '#c4b5fd', dict: '#fcd34d', set: '#f0abfc', other: '#a5b4fc' };
const HL_COL = { read: '#67e8f9', move: '#fb923c', new: '#34d399', found: '#34d399', walk: '#fbbf24', err: '#f87171', res: '#cbd5e1', seen: '#475569' };
const ease = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
function hexA(hex, a) {
  const n = parseInt(hex.slice(1), 16);
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

/** The frame shown at time t of an animation (tiles interpolated by id). */
function sample(anim, t) {
  const K = anim.keys;
  if (t >= anim.total || K.length === 1) return K[K.length - 1].f;
  let i = 0;
  while (i < K.length - 2 && K[i + 1].t <= t) i++;
  const a = K[i].f;
  const b = K[i + 1].f;
  const span = K[i + 1].t - K[i].t;
  const p = span > 0 ? Math.min(1, Math.max(0, (t - K[i].t) / span)) : 1;
  const e = ease(p);
  const disc = p < 0.5 ? a : b;
  const cnt = p < 0.95 ? a : b;
  const ma = new Map(a.tiles.map((x) => [x.id, x]));
  const tiles = [];
  for (const tb of b.tiles) {
    const ta = ma.get(tb.id);
    if (!ta) { tiles.push({ ...tb, a: tb.a * e }); continue; }
    ma.delete(tb.id);
    const dx = tb.x - ta.x;
    let y = ta.y + (tb.y - ta.y) * e;
    if (Math.abs(dx) > 0.01 && Math.abs(tb.y - ta.y) < 0.01) {
      const dir = b.arc === 'split' ? (dx > 0 ? -1 : 1) : -1;
      const h = b.arc === 'split' ? 0.12 + 0.4 * Math.min(1, Math.abs(dx) / 8) : 0.13;
      y += dir * h * Math.sin(Math.PI * e);
    }
    tiles.push({ ...tb, x: ta.x + dx * e, y, a: ta.a + (tb.a - ta.a) * e, hl: p < 0.5 ? ta.hl : tb.hl });
  }
  for (const ta of ma.values()) tiles.push({ ...ta, a: ta.a * (1 - e) });
  let ptr = null;
  if (b.ptr && a.ptr) ptr = { ...b.ptr, x: a.ptr.x + (b.ptr.x - a.ptr.x) * e, label: disc.ptr ? disc.ptr.label : b.ptr.label };
  else if (b.ptr) ptr = { ...b.ptr, fade: e };
  else if (a.ptr && p < 0.5) ptr = { ...a.ptr };
  return { ...disc, tiles, ptr, reads: cnt.reads, moves: cnt.moves };
}

/** Horizontal layout for a whole animation (so slots do not jump while it plays). */
function layoutFor(anim, W) {
  let lo = 0;
  let hi = 0;
  let str = false;
  for (const { f } of anim.keys) {
    hi = Math.max(hi, f.slots - 1, (f.cap || 0) - 1, f.more ? f.slots : 0);
    for (const t of f.tiles) { lo = Math.min(lo, Math.floor(t.x + 0.001)); hi = Math.max(hi, Math.ceil(t.x - 0.001)); if (t.type === 'str' || t.type === 'tuple' || (t.text && t.text.length > 5)) str = true; }
    if (f.ghost) { lo = Math.min(lo, f.ghost.x); hi = Math.max(hi, f.ghost.x); }
    if (f.ptr) hi = Math.max(hi, Math.ceil(f.ptr.x));
  }
  const span = Math.max(1, hi - lo + 1);
  const wMax = str ? 150 : 84;
  const w = Math.max(16, Math.min(wMax, (W - 24) / span));
  return { w, x0: (W - span * w) / 2 - lo * w };
}

const fitCache = new Map();
function fitText(ctx, text, maxW, maxH) {
  const key = `${text}|${Math.round(maxW)}|${Math.round(maxH)}`;
  const hit = fitCache.get(key);
  if (hit) return hit;
  let res = null;
  const sizes = text.length <= 4 ? [13, 12, 11, 10, 9, 8] : [13, 12, 11, 10];
  for (const fs of sizes) {
    ctx.font = `${fs}px ${MONO}`;
    const lh = fs + 2;
    const maxLines = Math.max(1, Math.floor(maxH / lh));
    if (ctx.measureText(text).width <= maxW) { res = { fs, lines: [text] }; break; }
    if (maxLines > 1 && text.includes(' ')) {
      const words = text.split(' ');
      const lines = [];
      let cur = '';
      let ok = true;
      for (const w of words) {
        const tryS = cur ? `${cur} ${w}` : w;
        if (ctx.measureText(tryS).width <= maxW) cur = tryS;
        else { if (cur) lines.push(cur); cur = w; if (ctx.measureText(w).width > maxW) { ok = false; break; } }
      }
      if (cur) lines.push(cur);
      if (ok && lines.length <= maxLines) { res = { fs, lines }; break; }
    }
  }
  if (!res) {
    // long single words: break between characters (after "-" or "_" when possible) over up to 3 lines
    const fs = 10;
    ctx.font = `${fs}px ${MONO}`;
    const maxLines = Math.max(1, Math.min(2, Math.floor(maxH / (fs + 2))));
    if (maxLines > 1) {
      const lines = [];
      let rest = text;
      while (rest && lines.length < maxLines) {
        let cut = rest.length;
        while (cut > 1 && ctx.measureText(rest.slice(0, cut)).width > maxW) cut--;
        if (cut < rest.length) { const soft = Math.max(rest.lastIndexOf('-', cut - 1), rest.lastIndexOf(' ', cut - 1), rest.lastIndexOf('_', cut - 1)); if (soft >= Math.floor(cut / 2)) cut = soft + 1; }
        lines.push(rest.slice(0, cut).trim());
        rest = rest.slice(cut);
      }
      if (!rest) res = { fs, lines };
    }
  }
  if (!res) {
    const fs = 10;
    ctx.font = `${fs}px ${MONO}`;
    let s = text;
    while (s.length > 1 && ctx.measureText(`${s}…`).width > maxW) s = s.slice(0, -1);
    res = { fs, lines: [`${s}…`] };
  }
  if (fitCache.size > 800) fitCache.clear();
  fitCache.set(key, res);
  return res;
}

function drawCheck(ctx, cx, cy, ok) {
  ctx.beginPath();
  ctx.arc(cx, cy, 7, 0, Math.PI * 2);
  ctx.fillStyle = ok ? '#16a34a' : '#dc2626';
  ctx.fill();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  if (ok) { ctx.moveTo(cx - 3.5, cy); ctx.lineTo(cx - 1, cy + 2.8); ctx.lineTo(cx + 3.6, cy - 2.8); } else { ctx.moveTo(cx - 3, cy - 3); ctx.lineTo(cx + 3, cy + 3); ctx.moveTo(cx + 3, cy - 3); ctx.lineTo(cx - 3, cy + 3); }
  ctx.stroke();
}

function drawList(ctx, W, H, f, lay, o) {
  const { T, showNeg, seats } = o;
  ctx.fillStyle = '#0b1220';
  ctx.fillRect(0, 0, W, H);
  const ch = Math.max(36, Math.min(54, (H - 122) / 2));
  const rowY = 70;
  const resY = rowY + ch + 44;
  const w = lay.w;
  const cx = (x) => lay.x0 + (x + 0.5) * w;
  const tw = Math.max(12, w - Math.max(4, Math.min(10, w * 0.12)));
  // header: counters on the right, then the name and length in the space that is left
  ctx.textBaseline = 'alphabetic';
  const rTxt = `${T('read', 'dibaca')} ${f.reads == null ? '—' : f.reads}`;
  const mTxt = `${T('moved', 'digeser')} ${f.moves == null ? '—' : f.moves}`;
  ctx.font = `700 13px ${SANS}`;
  const mW = ctx.measureText(mTxt).width;
  const rW = ctx.measureText(rTxt).width;
  ctx.textAlign = 'right';
  ctx.fillStyle = '#fb923c';
  ctx.fillText(mTxt, W - 12, 20);
  ctx.fillStyle = '#67e8f9';
  ctx.fillText(rTxt, W - 12 - mW - 14, 20);
  const room = W - 12 - mW - 14 - rW - 14 - 12;
  ctx.textAlign = 'left';
  ctx.font = `600 13px ${MONO}`;
  ctx.fillStyle = '#e2e8f0';
  let nm = f.name || '';
  while (nm.length > 2 && ctx.measureText(nm).width > room) nm = `${nm.slice(0, -2)}…`;
  ctx.fillText(nm, 12, 20);
  const hx = 12 + ctx.measureText(nm).width + 8;
  if (!f.missing && room - (hx - 12) > 30) {
    ctx.font = `12px ${SANS}`;
    ctx.fillStyle = '#94a3b8';
    let lenTxt = `len ${f.n}${f.aliases && f.aliases.length ? ` · ${T('also', 'juga')} ${f.aliases.join(', ')}` : ''}`;
    while (lenTxt.length > 6 && ctx.measureText(lenTxt).width > room - (hx - 12)) lenTxt = `${lenTxt.slice(0, -2)}…`;
    ctx.fillText(lenTxt, hx, 20);
  }
  if (f.missing) {
    ctx.textAlign = 'center';
    ctx.font = `13px ${SANS}`;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(f.gone ? T(`${f.name} is not defined (no list)`, `${f.name} tidak terdefinisi (tidak ada list)`) : T(`${f.name} does not exist yet`, `${f.name} belum ada`), W / 2, rowY + ch / 2 + 4);
    return;
  }
  // slots (cells): solid for the list's length, dashed for growing room / empty seats
  const nSlots = Math.max(f.slots, f.n > MAXT ? MAXT : f.n, f.cap || 0);
  const ptrX = f.ptr ? Math.round(f.ptr.x) : null;
  for (let j = 0; j < nSlots; j++) {
    const x = cx(j) - tw / 2;
    const inList = j < Math.min(f.n, MAXT);
    ctx.save();
    if (!inList) ctx.setLineDash([4, 3]);
    rrect(ctx, x - 2, rowY - 2, tw + 4, ch + 4, 8);
    ctx.fillStyle = inList ? '#111a2e' : 'rgba(17,26,46,0.35)';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = inList ? '#2b3a5a' : '#3b4b6e';
    ctx.stroke();
    ctx.restore();
    if (seats) {
      ctx.textAlign = 'center';
      ctx.font = `${Math.round(Math.max(8, Math.min(10, w * 0.16)))}px ${SANS}`;
      ctx.fillStyle = '#8a99b3';
      ctx.fillText(w < 56 ? `A${j + 1}` : `${T('seat', 'kursi')} A${j + 1}`, cx(j), rowY + ch + 13 + (showNeg ? 12 : 0));
    }
    // index labels
    ctx.textAlign = 'center';
    ctx.font = `${Math.round(Math.max(8, Math.min(11, w * 0.5)))}px ${MONO}`;
    const hot = ptrX === j;
    ctx.fillStyle = inList ? (hot ? '#fbbf24' : '#cbd5e1') : '#64748b';
    if ((inList || j === f.n) && !(f.ghost && f.ghost.x === j)) ctx.fillText(String(j), cx(j), rowY - 7);
    if (showNeg && inList && j < f.n) {
      ctx.font = `${Math.round(Math.max(7, Math.min(10, w * 0.36)))}px ${MONO}`;
      ctx.fillStyle = hot ? '#fbbf24' : '#8a99b3';
      ctx.fillText(String(j - f.n), cx(j), rowY + ch + 13);
    }
  }
  if (f.more) {
    ctx.textAlign = 'left';
    ctx.font = `12px ${SANS}`;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`… +${f.more}`, cx(nSlots - 1) + tw / 2 + 6, rowY + ch / 2 + 4);
  }
  if (!f.n && !f.tiles.length && !f.ghost) {
    ctx.textAlign = 'center';
    ctx.font = `13px ${MONO}`;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(T('[]  (an empty list)', '[]  (list kosong)'), W / 2, rowY + ch / 2 + 4);
  }
  // bracket for slices and len()
  if (f.bracket) {
    const x1 = cx(f.bracket.a) - tw / 2 - 5;
    const x2 = cx(f.bracket.b - 1) + tw / 2 + 5;
    ctx.save();
    if (f.bracket.kind === 'len') ctx.setLineDash([5, 4]);
    ctx.strokeStyle = f.bracket.kind === 'len' ? '#94a3b8' : '#a78bfa';
    ctx.lineWidth = 2;
    rrect(ctx, x1, rowY - 5, x2 - x1, ch + 10, 10);
    ctx.stroke();
    ctx.restore();
  }
  // ghost cell for an index that does not exist
  if (f.ghost) {
    const gx = cx(f.ghost.x) - tw / 2;
    ctx.save();
    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = '#f87171';
    ctx.lineWidth = 2;
    rrect(ctx, gx, rowY, tw, ch, 7);
    ctx.stroke();
    ctx.restore();
    ctx.textAlign = 'center';
    ctx.font = `700 16px ${SANS}`;
    ctx.fillStyle = '#f87171';
    ctx.fillText('?', cx(f.ghost.x), rowY + ch / 2 + 6);
    if (f.ghost.label) { ctx.font = `11px ${MONO}`; ctx.fillText(f.ghost.label, cx(f.ghost.x), rowY - 7); }
  }
  // tiles (values)
  const th = seats ? ch - 2 : ch;
  const order = f.tiles.slice().sort((p, q) => (p.y > 0.5) - (q.y > 0.5) || (p.hl === 'move') - (q.hl === 'move'));
  for (const t of order) {
    if (t.a <= 0.01) continue;
    const x = cx(t.x) - tw / 2;
    const y = rowY + t.y * (resY - rowY);
    const col = TYPE_COL[t.type] || TYPE_COL.other;
    ctx.globalAlpha = Math.max(0, Math.min(1, t.a));
    rrect(ctx, x, y, tw, th, 7);
    ctx.fillStyle = '#0b1220';
    ctx.fill();
    ctx.fillStyle = hexA(col, t.hl === 'seen' ? 0.08 : 0.17);
    ctx.fill();
    const hc = t.hl && HL_COL[t.hl];
    ctx.lineWidth = hc && t.hl !== 'seen' && t.hl !== 'res' ? 2.6 : 1.5;
    ctx.strokeStyle = hc && t.hl !== 'res' ? hc : col;
    ctx.stroke();
    const fit = fitText(ctx, t.text, tw - Math.min(8, Math.max(2, tw * 0.15)), th - 6);
    ctx.font = `${fit.fs}px ${MONO}`;
    ctx.fillStyle = t.hl === 'seen' ? '#94a3b8' : col;
    ctx.textAlign = 'center';
    const lh = fit.fs + 2;
    const y0 = y + th / 2 - ((fit.lines.length - 1) * lh) / 2 + fit.fs * 0.36;
    fit.lines.forEach((ln, m) => ctx.fillText(ln, cx(t.x), y0 + m * lh));
    ctx.globalAlpha = 1;
  }
  // scan marks
  for (const m of f.marks) {
    if (m.x >= MAXT) continue;
    drawCheck(ctx, cx(m.x) + tw / 2 - 3, rowY + 3, m.ok);
  }
  // result row label / text / error
  if (f.resLabel) {
    ctx.textAlign = 'left';
    ctx.font = `11px ${MONO}`;
    ctx.fillStyle = '#94a3b8';
    const lx = Math.max(6, Math.min(cx(f.resLabel.x) - tw / 2, W - 6 - ctx.measureText(f.resLabel.text).width));
    ctx.fillText(f.resLabel.text, lx, resY - 6);
  }
  let textY = resY + ch / 2 + 4;
  if (f.resText) {
    ctx.textAlign = 'left';
    ctx.font = `12px ${MONO}`;
    ctx.fillStyle = f.resText.out ? '#e2e8f0' : '#94a3b8';
    let s = f.resText.out ? `print → ${f.resText.text}` : f.resText.text;
    while (s.length > 2 && ctx.measureText(s).width > W - 24) s = `${s.slice(0, -2)}…`;
    ctx.fillText(s, 12, textY);
    textY += 16;
  }
  if (f.err) {
    ctx.textAlign = 'left';
    ctx.font = `700 12px ${MONO}`;
    const hasRes = f.tiles.some((t) => t.y > 0.5 && t.a > 0.1);
    let s = f.err;
    const maxW = W - 24;
    const lines = [];
    while (s && lines.length < 2) {
      let cut = s.length;
      while (cut > 1 && ctx.measureText(s.slice(0, cut)).width > maxW) cut--;
      if (cut < s.length) { const sp = s.lastIndexOf(' ', cut); if (sp > 10) cut = sp; }
      lines.push(s.slice(0, cut).trim());
      s = s.slice(cut).trim();
    }
    const yErr = hasRes ? resY + ch + 2 : textY;
    ctx.fillStyle = '#fca5a5';
    lines.forEach((ln, m) => ctx.fillText(ln, 12, Math.min(H - 6 - (lines.length - 1 - m) * 15, yErr + m * 15)));
  }
  // pointer
  if (f.ptr) {
    const px = cx(f.ptr.x);
    const col = f.ptr.bad ? '#f87171' : '#fbbf24';
    ctx.globalAlpha = f.ptr.fade != null ? Math.max(0.2, f.ptr.fade) : 1;
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.moveTo(px - 6, rowY - 26);
    ctx.lineTo(px + 6, rowY - 26);
    ctx.lineTo(px, rowY - 18);
    ctx.closePath();
    ctx.fill();
    ctx.font = `600 11px ${MONO}`;
    const lw = ctx.measureText(f.ptr.label).width;
    ctx.textAlign = 'left';
    const lx = Math.max(4, Math.min(px - lw / 2, W - 4 - lw));
    ctx.fillText(f.ptr.label, lx, rowY - 30);
    ctx.globalAlpha = 1;
  }
}

function niceCeil(v) {
  const mag = Math.pow(10, Math.floor(Math.log10(v)));
  return [1, 1.2, 1.6, 2, 2.4, 3, 4, 5, 6, 8, 10].map((m) => m * mag).find((x) => x >= v);
}
function drawChart(ctx, W, H, allPts, T) {
  // one dot per distinct (operation, n, moves); dense sets get small dots
  const seenPt = new Set();
  const pts = [];
  for (let i = allPts.length - 1; i >= 0; i--) {
    const p = allPts[i];
    const key = `${p.kind === 'remove' || p.kind === 'del' ? 'pop' : p.kind}|${p.n}|${p.moves}`;
    if (!seenPt.has(key)) { seenPt.add(key); pts.unshift(p); }
  }
  const dense = pts.length > 40;
  ctx.fillStyle = '#0b1220';
  ctx.fillRect(0, 0, W, H);
  const maxN = pts.reduce((m, p) => Math.max(m, p.n, p.moves), 0);
  const xMax = maxN < 16 ? 16 : niceCeil(maxN + 1);
  const L = 36;
  const R = 12;
  const legend = [
    { col: '#fb923c', dash: false, text: T('insert(0, x): n moves', 'insert(0, x): n geseran') },
    { col: '#fbbf24', dash: true, text: T('insert in the middle: ≈ n/2', 'insert di tengah: ≈ n/2') },
    { col: '#34d399', dash: false, text: T('append(x), pop(): 0', 'append(x), pop(): 0') },
    { dots: ['#fb923c', '#34d399', '#c084fc'], text: T('your insert / append / pop, remove', 'operasimu: insert / append / pop, remove') },
  ];
  ctx.font = `11px ${SANS}`;
  let lx = L;
  let ly = 16;
  for (const lg of legend) {
    const w = 22 + ctx.measureText(lg.text).width + 14;
    if (lx + w > W - R && lx > L) { lx = L; ly += 15; }
    ctx.save();
    if (lg.dots) {
      lg.dots.forEach((c, k) => { ctx.beginPath(); ctx.arc(lx + 3 + k * 6, ly - 4, 3, 0, Math.PI * 2); ctx.fillStyle = c; ctx.fill(); });
    } else {
      ctx.strokeStyle = lg.col;
      ctx.lineWidth = 2.2;
      if (lg.dash) ctx.setLineDash([5, 4]);
      ctx.beginPath(); ctx.moveTo(lx, ly - 4); ctx.lineTo(lx + 16, ly - 4); ctx.stroke();
    }
    ctx.restore();
    ctx.fillStyle = '#cbd5e1';
    ctx.textAlign = 'left';
    ctx.fillText(lg.text, lx + 21, ly);
    lx += w;
  }
  const top = ly + 14;
  const B = 34;
  const gw = W - L - R;
  const gh = H - top - B;
  if (gw < 40 || gh < 30) return;
  const X = (n) => L + (n / xMax) * gw;
  const Y = (m) => top + gh - (m / xMax) * gh;
  ctx.strokeStyle = 'rgba(148,163,184,0.16)';
  ctx.lineWidth = 1;
  ctx.font = `10px ${MONO}`;
  ctx.fillStyle = '#8a99b3';
  const raw = xMax / 4;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const stepT = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((v) => v >= raw) || 10 * mag;
  for (let v = 0; v <= xMax + 1e-9; v += stepT) {
    ctx.beginPath(); ctx.moveTo(X(v), top); ctx.lineTo(X(v), top + gh); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(L, Y(v)); ctx.lineTo(L + gw, Y(v)); ctx.stroke();
    ctx.textAlign = 'center';
    const lab = String(Math.round(v * 100) / 100);
    ctx.fillText(lab, X(v), top + gh + 13);
    ctx.textAlign = 'right';
    ctx.fillText(lab, L - 5, Y(v) + 3);
  }
  ctx.textAlign = 'center';
  ctx.font = `11px ${SANS}`;
  ctx.fillStyle = '#94a3b8';
  ctx.fillText(T('n = items in the list before the operation', 'n = banyak data sebelum operasi'), L + gw / 2, H - 6);
  ctx.save();
  ctx.translate(11, top + gh / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText(T('cells moved', 'sel digeser'), 0, 0);
  ctx.restore();
  const line = (fn, col, dash) => {
    ctx.save();
    ctx.strokeStyle = col;
    ctx.lineWidth = 2.2;
    if (dash) ctx.setLineDash([5, 4]);
    ctx.beginPath();
    for (let n = 0; n <= xMax; n += 0.25) { const x = X(n); const y = Y(fn(n)); if (n === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
    ctx.stroke();
    ctx.restore();
  };
  line((n) => n, '#fb923c', false);
  line((n) => n / 2, '#fbbf24', true);
  line(() => 0, '#34d399', false);
  const COL = { insert: '#fb923c', append: '#34d399', pop: '#c084fc', remove: '#c084fc', del: '#c084fc' };
  pts.forEach((p, i) => {
    const last = i === pts.length - 1;
    ctx.beginPath();
    ctx.arc(X(Math.min(p.n, xMax)), Y(Math.min(p.moves, xMax)), last ? 6 : dense ? 2.6 : 4.5, 0, Math.PI * 2);
    ctx.fillStyle = COL[p.kind] || '#e2e8f0';
    ctx.fill();
    if (last || !dense) {
      ctx.lineWidth = last ? 2 : 1.2;
      ctx.strokeStyle = '#f8fafc';
      ctx.stroke();
    }
  });
  if (!pts.length) {
    // empty-state note in the free top-left corner (above the insert(0) line)
    ctx.textAlign = 'left';
    ctx.font = `12px ${SANS}`;
    ctx.fillStyle = '#94a3b8';
    const words = T('Your insert, append, pop and remove operations appear here as dots.', 'Operasi insert, append, pop, dan remove yang kamu jalankan muncul di sini sebagai titik.').split(' ');
    const maxW = Math.max(80, gw * 0.55);
    let lineS = '';
    let y = top + 14;
    for (const w of words) {
      if (lineS && ctx.measureText(`${lineS} ${w}`).width > maxW) { ctx.fillText(lineS, L + 8, y); y += 15; lineS = w; } else lineS = lineS ? `${lineS} ${w}` : w;
    }
    if (lineS) ctx.fillText(lineS, L + 8, y);
  }
}

// ---------------------------------------------------------------------------------------------------------------
// Explanations (bilingual)
// ---------------------------------------------------------------------------------------------------------------
function explain(p, plan, T) {
  const n = plan.n;
  const nm = plan.focus;
  const items = (m) => (m === 1 ? T('1 item', '1 data') : T(`${m} items`, `${m} data`));
  const caught = p.caught ? T(' Python raises this error here, and the except block handles it.', ' Python memunculkan galat ini di sini, lalu blok except menanganinya.') : '';
  switch (p.k) {
    case 'none': return T(`This line does not use ${nm}.`, `Baris ini tidak memakai ${nm}.`);
    case 'uses': return T(`This line uses ${nm}, but not with one of the operations this sim counts cell by cell, so its cost is not counted (—).`, `Baris ini memakai ${nm}, tetapi bukan dengan operasi yang dihitung sel demi sel oleh simulasi ini, jadi biayanya tidak dihitung (—).`);
    case 'alias': return T(`${p.name} = ${p.src} does not copy the list: both names now refer to the same list object (an alias), so a change made through ${p.name} also changes ${nm}. For a real copy write ${p.src}.copy() or ${p.src}[:].`, `${p.name} = ${p.src} tidak menyalin list: kedua nama sekarang menunjuk objek list yang sama (alias), sehingga perubahan lewat ${p.name} juga mengubah ${nm}. Untuk salinan sungguhan tulis ${p.src}.copy() atau ${p.src}[:].`);
    case 'loopnext': return T(`The for loop takes its next value, or ends when none is left. The expression after "in" was worked out once, when the loop started, so ${nm} is not read again on this line.`, `Perulangan for mengambil nilai berikutnya, atau selesai jika sudah habis. Ekspresi setelah "in" hanya dihitung sekali saat perulangan dimulai, jadi ${nm} tidak dibaca lagi di baris ini.`);
    case 'pass': return T(`${nm} is passed to ${p.fn}(): the parameter refers to the same list (no copy is made), so changes inside the function change ${nm}.`, `${nm} dikirim ke ${p.fn}(): parameternya menunjuk list yang sama (tidak disalin), sehingga perubahan di dalam fungsi mengubah ${nm}.`);
    case 'create': {
      const m = p.items.length;
      if (!m) return T(`${nm} is a new, empty list.`, `${nm} adalah list baru yang kosong.`);
      return T(`A new list with ${items(m)} is created; each item gets an index from 0 to ${m - 1} (or from -${m} to -1 counting from the end).${p.rebind ? ` The name ${nm} now refers to this new list object.` : ''}`,
        `List baru berisi ${items(m)} dibuat; setiap data mendapat indeks 0 sampai ${m - 1} (atau -${m} sampai -1 jika dihitung dari belakang).${p.rebind ? ` Nama ${nm} sekarang menunjuk objek list baru ini.` : ''}`);
    }
    case 'gone': return T(`${nm} no longer refers to a list.`, `${nm} tidak lagi menunjuk sebuah list.`);
    case 'same': return T(`This operation left ${nm} exactly as it was.`, `Operasi ini membiarkan ${nm} persis seperti sebelumnya.`);
    case 'generic': return T('The list changed in a way this sim does not animate cell by cell, so it shows the new contents.', 'List berubah dengan cara yang tidak dianimasikan sel demi sel oleh simulasi ini, jadi yang ditampilkan adalah isi barunya.');
    case 'error':
      if (/^StepLimit\b/.test(p.err)) {
        return T(`The sim stopped the program after ${MAX_STEPS} steps so that a loop that never ends cannot freeze the page. This is not a Python error: real Python has no step limit, so a loop whose condition never becomes False runs forever, while a long loop that does end simply finishes.`,
          `Simulasi menghentikan program setelah ${MAX_STEPS} langkah agar perulangan yang tidak pernah berhenti tidak membuat halaman macet. Ini bukan galat Python: Python sungguhan tidak punya batas langkah, jadi perulangan yang syaratnya tidak pernah bernilai False berjalan selamanya, sedangkan perulangan panjang yang memang berakhir akan selesai.`);
      }
      return T('Python stopped with an error: read the last line of the traceback in the console.', 'Python berhenti karena galat: baca baris terakhir traceback di konsol.');
    case 'item':
      if (p.idx == null) {
        return (n === 0
          ? T(`${nm} is empty, so no index exists.`, `${nm} kosong, jadi tidak ada indeks yang sah.`)
          : T(`Index ${p.raw} does not exist: ${nm} has ${items(n)}, so the valid indices are 0 to ${n - 1} (or -${n} to -1).`, `Indeks ${p.raw} tidak ada: ${nm} berisi ${items(n)}, jadi indeks yang sah 0 sampai ${n - 1} (atau -${n} sampai -1).`)) + caught;
      }
      return T(`Direct access: Python jumps straight to index ${p.idx}${p.raw < 0 ? ` (${p.raw} counts from the end: ${p.raw} + ${n} = ${p.idx})` : ''}. One cell is read, whether the list has ${n} items or a million — like checking seat A3 without asking A1 and A2.`,
        `Akses langsung: Python langsung menuju indeks ${p.idx}${p.raw < 0 ? ` (${p.raw} dihitung dari belakang: ${p.raw} + ${n} = ${p.idx})` : ''}. Hanya satu sel dibaca, baik list berisi ${n} data maupun sejuta — seperti melihat kursi A3 tanpa bertanya ke A1 dan A2.`);
    case 'assign':
      if (p.idx == null) {
        return (n === 0
          ? T(`${nm} is empty, so index ${p.raw} does not exist and nothing can be stored there. Use append() to add an item.`, `${nm} kosong, jadi indeks ${p.raw} tidak ada dan tidak ada yang bisa disimpan di sana. Pakai append() untuk menambah data.`)
          : T(`Index ${p.raw} does not exist, so nothing can be stored there (valid: 0 to ${n - 1} or -${n} to -1).`, `Indeks ${p.raw} tidak ada, jadi tidak ada yang bisa disimpan di sana (yang sah: 0 sampai ${n - 1} atau -${n} sampai -1).`)) + caught;
      }
      return T(`Index ${p.idx} gets a new value (${p.old.text} is replaced by ${p.item.text}).${p.aug ? ' The old value is read first (1 cell read), then' : ''} One cell is overwritten; nothing shifts.`.replace('then One', 'then one'), `Indeks ${p.idx} mendapat nilai baru (${p.old.text} diganti ${p.item.text}).${p.aug ? ' Nilai lamanya dibaca dulu (1 sel dibaca), lalu' : ''} Satu sel ditimpa; tidak ada yang bergeser.`.replace('lalu Satu', 'lalu satu'));
    case 'append':
      return T(`append() puts ${p.item.text} after the last item, at index ${n}. Nothing shifts: 0 moves, however long the list is.`, `append() menaruh ${p.item.text} setelah data terakhir, di indeks ${n}. Tidak ada yang bergeser: 0 geseran, sepanjang apa pun list-nya.`);
    case 'extend':
      return T(`${items(p.items.length)} are added after the last item; nothing shifts.`, `${items(p.items.length)} ditambahkan setelah data terakhir; tidak ada yang bergeser.`);
    case 'clear':
      return T('clear() empties the list.', 'clear() mengosongkan list.');
    case 'insert': {
      const m = n - p.idx;
      const clamp = p.clamp === 'end'
        ? T(` insert() never raises IndexError: index ${p.raw} is past the end, so the item goes to the end (index ${n}).`, ` insert() tidak pernah memunculkan IndexError: indeks ${p.raw} melewati ujung, jadi data diletakkan di akhir (indeks ${n}).`)
        : p.clamp === 'front' ? T(` Index ${p.raw} is before the start, so the item goes to the front (index 0).`, ` Indeks ${p.raw} berada sebelum awal, jadi data diletakkan di depan (indeks 0).`) : '';
      if (!m) return T(`insert() at index ${n} (the end) works like append(): nothing shifts.`, `insert() di indeks ${n} (ujung) sama seperti append(): tidak ada yang bergeser.`) + clamp;
      return T(`To make room at index ${p.idx}, the ${items(m)} from index ${p.idx} to ${n - 1} each shift one place right, starting from the last one (${m} moves). Then ${p.item.text} goes into index ${p.idx}.`,
        `Agar ada tempat di indeks ${p.idx}, ${items(m)} dari indeks ${p.idx} sampai ${n - 1} masing-masing bergeser satu tempat ke kanan, mulai dari yang paling belakang (${m} geseran). Lalu ${p.item.text} masuk ke indeks ${p.idx}.`) + clamp;
    }
    case 'pop':
    case 'del': {
      if (p.idx == null) {
        if (p.empty) return T(`${nm} is empty, so pop() has nothing to take out.`, `${nm} kosong, jadi pop() tidak punya data untuk diambil.`) + caught;
        if (n === 0) return T(`${nm} is empty, so index ${p.raw} does not exist.`, `${nm} kosong, jadi indeks ${p.raw} tidak ada.`) + caught;
        return T(`Index ${p.raw} does not exist (valid: 0 to ${n - 1} or -${n} to -1).`, `Indeks ${p.raw} tidak ada (yang sah: 0 sampai ${n - 1} atau -${n} sampai -1).`) + caught;
      }
      const m = n - p.idx - 1;
      const what = p.k === 'pop' ? T(`pop() takes out ${p.item.text} from index ${p.idx} and returns it.`, `pop() mengambil ${p.item.text} dari indeks ${p.idx} dan mengembalikannya.`) : T(`del removes ${p.item.text} at index ${p.idx}.`, `del menghapus ${p.item.text} di indeks ${p.idx}.`);
      if (!m) return `${what} ${T('It was the last item, so nothing shifts.', 'Itu data terakhir, jadi tidak ada yang bergeser.')}`;
      return `${what} ${T(`The ${items(m)} after it each shift one place left to close the gap (${m} moves).`, `${items(m)} di belakangnya masing-masing bergeser satu tempat ke kiri untuk menutup celah (${m} geseran).`)}`;
    }
    case 'remove':
      if (p.found < 0) return T(`remove() compared all ${items(n)} with ${p.valText} and found no match. Check with "in" first, as in Example 3.`, `remove() membandingkan semua ${items(n)} dengan ${p.valText} dan tidak menemukannya. Periksa dulu dengan "in", seperti pada Contoh 3.`) + caught;
      return T(`remove() compares from index 0 until it finds ${p.valText} (${p.found + 1} cells read), deletes it, and the ${items(n - p.found - 1)} after it shift left (${n - p.found - 1} moves). Only the first match is removed.`,
        `remove() membandingkan mulai indeks 0 sampai menemukan ${p.valText} (${p.found + 1} sel dibaca), menghapusnya, lalu ${items(n - p.found - 1)} di belakangnya bergeser ke kiri (${n - p.found - 1} geseran). Hanya kemunculan pertama yang dihapus.`);
    case 'index':
      if (p.found < 0) return T(`index() compared all ${items(n)} without finding ${p.valText}.`, `index() membandingkan semua ${items(n)} tanpa menemukan ${p.valText}.`) + caught;
      return T(`index() compares from index 0 and returns ${p.found}, the first index holding ${p.valText} (${p.found + 1} cells read).`, `index() membandingkan mulai indeks 0 dan mengembalikan ${p.found}, indeks pertama yang berisi ${p.valText} (${p.found + 1} sel dibaca).`);
    case 'in': {
      const res = (p.found >= 0) !== !!p.neg ? 'True' : 'False';
      return p.found >= 0
        ? T(`"${p.neg ? 'not in' : 'in'}" compares from index 0 and stops at index ${p.found} where ${p.valText} is (${p.found + 1} cells read): ${res}.`, `"${p.neg ? 'not in' : 'in'}" membandingkan mulai indeks 0 dan berhenti di indeks ${p.found} tempat ${p.valText} berada (${p.found + 1} sel dibaca): ${res}.`)
        : T(`"${p.neg ? 'not in' : 'in'}" compared all ${items(n)}: ${p.valText} is not there, so the answer is ${res}.`, `"${p.neg ? 'not in' : 'in'}" membandingkan semua ${items(n)}: ${p.valText} tidak ada, jadi hasilnya ${res}.`);
    }
    case 'truth': {
      const cond = `${p.neg ? 'not ' : ''}${p.src}`;
      const res = p.val ? 'True' : 'False';
      return T(`"${p.kw} ${cond}:" asks whether the list is empty: an empty list counts as False and any other list as True. ${nm} has ${items(n)}, so ${cond} is ${res}. Python only checks the stored length, so no cells are read (0 read).`,
        `"${p.kw} ${cond}:" menanyakan apakah list kosong: list kosong dianggap False dan list lain dianggap True. ${nm} berisi ${items(n)}, jadi ${cond} bernilai ${res}. Python hanya memeriksa panjang yang tersimpan, jadi tidak ada sel yang dibaca (0 dibaca).`);
    }
    case 'len':
      return T(`len() gives ${n} at once: a Python list stores its length, so no cells are counted (0 read).`, `len() langsung memberi ${n}: list Python menyimpan panjangnya, jadi tidak ada sel yang dihitung (0 dibaca).`);
    case 'slice': {
      const m = p.idxs.length;
      if (!m) return T(`The slice [${p.src}] selects nothing, so it gives an empty new list []. A slice never raises IndexError.`, `Slice [${p.src}] tidak memilih apa pun, jadi hasilnya list baru yang kosong []. Slice tidak pernah memunculkan IndexError.`);
      const st = m > 1 ? p.idxs[1] - p.idxs[0] : 1;
      const ord = (k) => `${k}${k % 100 >= 11 && k % 100 <= 13 ? 'th' : ['th', 'st', 'nd', 'rd'][k % 10] || 'th'}`;
      const how = st === 1 ? '' : st === -1 ? T(', backwards', ', mundur') : st > 0 ? T(`, every ${ord(st)} item`, `, setiap ${st} langkah`) : T(`, backwards, every ${ord(-st)} item`, `, mundur setiap ${-st} langkah`);
      return T(`The slice [${p.src}] copies ${items(m)} (indices ${p.idxs[0]} to ${p.idxs[m - 1]}${how}) into a new list; ${nm} itself does not change. The stop index is not included.`,
        `Slice [${p.src}] menyalin ${items(m)} (indeks ${p.idxs[0]} sampai ${p.idxs[m - 1]}${how}) ke list baru; ${nm} sendiri tidak berubah. Indeks batas akhir tidak ikut.`);
    }
    case 'walk':
      if (p.iter >= n) return T(`All ${items(n)} have been visited, so the for loop ends.`, `Semua ${items(n)} sudah dikunjungi, jadi perulangan for selesai.`);
      return T(`The for loop takes the item at index ${p.iter} (${p.iter + 1} of ${n}) and puts it in ${p.target}. A loop over the whole list reads all ${items(n)}.`, `Perulangan for mengambil data di indeks ${p.iter} (ke-${p.iter + 1} dari ${n}) dan memasukkannya ke ${p.target}. Perulangan pada seluruh list membaca semua ${items(n)}.`);
    case 'whole':
      return p.fn === 'print()'
        ? T(`print() shows the whole list, so it reads all ${items(n)}.`, `print() menampilkan seluruh list, jadi membaca semua ${items(n)}.`)
        : T(`${p.fn} has to look at every item: ${n} cells read.`, `${p.fn} harus melihat setiap data: ${n} sel dibaca.`);
    case 'sort':
      if (p.err) {
        return T('sort() has to compare items with <, and Python cannot compare these types, so it stops with TypeError.', 'sort() harus membandingkan data dengan <, dan Python tidak bisa membandingkan tipe-tipe ini, jadi berhenti dengan TypeError.')
          + (p.moves ? T(` ${p.moves} items had already changed place before the error, so the list is left partly sorted.`, ` ${p.moves} data sudah berpindah tempat sebelum galat itu, jadi list tertinggal dalam keadaan setengah terurut.`) : '');
      }
      return T(`sort() puts the items in ${p.desc ? 'descending' : 'ascending'} order inside the same list (${p.moves} of ${n} items changed place). Python's sort (Timsort) compares pairs of items: at least ${Math.max(0, n - 1)} comparisons, about n·log₂n for shuffled data. Text is sorted by character code, so capitals come before small letters.`,
        `sort() mengurutkan data secara ${p.desc ? 'menurun' : 'menaik'} di dalam list yang sama (${p.moves} dari ${n} data berpindah tempat). Pengurutan Python (Timsort) membandingkan pasangan data: paling sedikit ${Math.max(0, n - 1)} perbandingan, sekitar n·log₂n untuk data acak. Teks diurutkan menurut kode karakternya, jadi huruf kapital datang sebelum huruf kecil.`);
    case 'reverse':
      return T(`reverse() swaps pairs from both ends inward: ${p.moves} items move.`, `reverse() menukar pasangan dari kedua ujung ke tengah: ${p.moves} data berpindah.`);
    default:
      return '';
  }
}

// ---------------------------------------------------------------------------------------------------------------
// The operation buttons
// ---------------------------------------------------------------------------------------------------------------
const OPS = [
  { key: 'get', group: 'read', chip: '[i]', args: ['i'], name: { en: 'Read the item at index i', id: 'Baca data di indeks i' } },
  { key: 'len', group: 'read', chip: 'len()', args: [], name: { en: 'Length of the list', id: 'Panjang list' } },
  { key: 'in', group: 'read', chip: 'x in', args: ['x'], name: { en: 'Is x in the list?', id: 'Apakah x ada di list?' } },
  { key: 'index', group: 'read', chip: 'index()', args: ['x'], name: { en: 'Index of x', id: 'Indeks dari x' } },
  { key: 'slice', group: 'read', chip: '[a:b]', args: ['a', 'b'], name: { en: 'Slice from a up to (not including) b', id: 'Irisan dari a sampai sebelum b' } },
  { key: 'for', group: 'read', chip: 'for', args: [], name: { en: 'Loop over every item', id: 'Ulangi untuk setiap data' } },
  { key: 'set', group: 'change', chip: '[i] = x', args: ['i', 'x'], name: { en: 'Change the item at index i', id: 'Ubah data di indeks i' } },
  { key: 'append', group: 'change', chip: 'append()', args: ['x'], name: { en: 'Add x at the end', id: 'Tambah x di akhir' } },
  { key: 'insert', group: 'change', chip: 'insert()', args: ['i', 'x'], name: { en: 'Insert x at index i', id: 'Sisipkan x di indeks i' } },
  { key: 'pop', group: 'change', chip: 'pop()', args: [], name: { en: 'Take out the last item', id: 'Ambil data terakhir' } },
  { key: 'popi', group: 'change', chip: 'pop(i)', args: ['i'], name: { en: 'Take out the item at index i', id: 'Ambil data di indeks i' } },
  { key: 'remove', group: 'change', chip: 'remove()', args: ['x'], name: { en: 'Remove the first x', id: 'Hapus x yang pertama' } },
  { key: 'sort', group: 'change', chip: 'sort()', args: ['rev'], name: { en: 'Sort the list', id: 'Urutkan list' } },
  { key: 'reverse', group: 'change', chip: 'reverse()', args: [], name: { en: 'Reverse the list', id: 'Balik urutan list' } },
];
const OP_HINT = {
  get: ['L[i] reads one cell directly. Negative i counts from the end: L[-1] is the last item. An index that does not exist gives IndexError.', 'L[i] membaca satu sel secara langsung. i negatif dihitung dari belakang: L[-1] adalah data terakhir. Indeks yang tidak ada memunculkan IndexError.'],
  len: ['len(L) gives the number of items. Python stores it with the list, so nothing is counted.', 'len(L) memberi banyaknya data. Python menyimpannya bersama list, jadi tidak ada yang dihitung.'],
  in: ['x in L compares from index 0 until it finds x: True or False. Use it before remove() to avoid ValueError.', 'x in L membandingkan mulai indeks 0 sampai menemukan x: True atau False. Pakai sebelum remove() agar tidak ValueError.'],
  index: ['L.index(x) compares from index 0 and gives the first index where x is. ValueError if x is missing.', 'L.index(x) membandingkan mulai indeks 0 dan memberi indeks pertama tempat x berada. ValueError jika x tidak ada.'],
  slice: ['L[a:b] copies items a, a+1, …, b-1 into a new list (b is not included). Leave a or b empty for "from the start" / "to the end". A slice never gives IndexError.', 'L[a:b] menyalin data a, a+1, …, b-1 ke list baru (b tidak ikut). Kosongkan a atau b untuk "dari awal" / "sampai akhir". Slice tidak pernah IndexError.'],
  for: ['for x in L visits every item from index 0 to the end: n cells read. Press Step to walk one item at a time.', 'for x in L mengunjungi setiap data dari indeks 0 sampai akhir: n sel dibaca. Tekan Langkah untuk berjalan satu data setiap kali.'],
  set: ['L[i] = x overwrites one cell. Nothing shifts. The index must already exist.', 'L[i] = x menimpa satu sel. Tidak ada yang bergeser. Indeksnya harus sudah ada.'],
  append: ['L.append(x) adds x after the last item. Nothing shifts: 0 moves.', 'L.append(x) menambah x setelah data terakhir. Tidak ada yang bergeser: 0 geseran.'],
  insert: ['L.insert(i, x) makes room at index i: every item from i to the end shifts one place right (n - i moves). An i past the end just appends.', 'L.insert(i, x) membuat tempat di indeks i: setiap data dari i sampai akhir bergeser satu tempat ke kanan (n - i geseran). i yang melewati ujung sama dengan append.'],
  pop: ['L.pop() takes out the last item and gives it back. Nothing shifts.', 'L.pop() mengambil data terakhir dan mengembalikannya. Tidak ada yang bergeser.'],
  popi: ['L.pop(i) takes out the item at index i; every item after it shifts one place left (n - i - 1 moves).', 'L.pop(i) mengambil data di indeks i; setiap data di belakangnya bergeser satu tempat ke kiri (n - i - 1 geseran).'],
  remove: ['L.remove(x) compares from index 0 until it finds x, deletes it, and the items after it shift left. ValueError if x is missing.', 'L.remove(x) membandingkan mulai indeks 0 sampai menemukan x, menghapusnya, lalu data di belakangnya bergeser ke kiri. ValueError jika x tidak ada.'],
  sort: ['L.sort() puts the items in order inside the same list (numbers small to big, text A to Z). Mixing numbers and text gives TypeError.', 'L.sort() mengurutkan data di dalam list yang sama (angka kecil ke besar, teks A ke Z). Mencampur angka dan teks memunculkan TypeError.'],
  reverse: ['L.reverse() flips the order inside the same list by swapping pairs from both ends.', 'L.reverse() membalik urutan di dalam list yang sama dengan menukar pasangan dari kedua ujung.'],
};

/** Text typed in the value box → a Python literal (text gets quotes, numbers / True / False / None / [..] stay). */
function literal(raw) {
  const s = raw.trim();
  if (!s) return '""';
  if (/^[+-]?(\d[\d_]*)(\.\d*)?([eE][+-]?\d+)?$/.test(s) || /^[+-]?\.\d+([eE][+-]?\d+)?$/.test(s)) return s.replace(/^\+/, '');
  if (/^(True|False|None)$/.test(s)) return s;
  if (s.length >= 2 && /^(["'])/.test(s) && s.endsWith(s[0])) return s;
  if (/^\[.*\]$/.test(s) || /^\(.*\)$/.test(s)) return s;
  return `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

const CSS = `
.lo { container-type: inline-size; container-name: lo; padding: 12px; min-width: 0; display: flex; flex-direction: column; gap: 12px; }
.lo *, .lo *::before, .lo *::after, .lo-ctl * { box-sizing: border-box; }
.lo [hidden], .lo-ctl [hidden] { display: none !important; }
.lo-cv { position: relative; height: 246px; border: 1px solid #1e2a44; border-radius: 10px; overflow: hidden; background: #0b1220; }
@container lo (max-width: 520px) { .lo-cv { height: 236px; } }
.lo-cv canvas, .lo-chartw canvas { display: block; }
.lo-sr { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }

.lo-info { display: grid; gap: 5px; min-width: 0; padding: 8px 12px 9px; border: 1px solid var(--color-border); border-left: 4px solid var(--lo-acc, #3b82f6);
  border-radius: 10px; background: color-mix(in srgb, var(--color-fg) 3%, var(--color-surface)); font-size: 14px; line-height: 1.5; color: var(--color-fg); }
.lo-info.is-err { --lo-acc: var(--color-danger, #dc2626); }
.lo-info.is-move { --lo-acc: #f97316; }
.lo-top { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 8px; min-width: 0; }
.lo-ln { font-size: 12px; color: var(--color-muted); white-space: nowrap; }
.lo-code { display: inline-block; max-width: 100%; margin: 0; padding: 2px 8px; border-radius: 6px; background: #0b1220; color: #e2e8f0;
  font: 13px/1.45 var(--font-mono, ui-monospace, monospace); white-space: pre-wrap; overflow-wrap: anywhere; }
.lo-why { margin: 0; }
.lo-cost { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.lo-pill { padding: 1px 9px; border-radius: 999px; border: 1px solid var(--color-border); font-size: 12.5px; font-weight: 600; white-space: nowrap; background: var(--color-surface); }
.lo-pill.lo-r { border-color: #0891b2; color: #0e7490; }
.lo-pill.lo-m { border-color: #ea580c; color: #c2410c; }
@media (prefers-color-scheme: dark) { .lo-pill.lo-r { color: #67e8f9; } .lo-pill.lo-m { color: #fdba74; } }
.lo-ctl .lab-table th { white-space: normal; line-height: 1.25; }
.lo-ctl .lab-table td.lab-empty { white-space: normal; }
.lo-ctl .lab-table th, .lo-ctl .lab-table td { padding: 4px 5px; }
.lo-ctl .lab-table td:nth-child(2) { white-space: normal; overflow-wrap: anywhere; text-align: left; min-width: 6em; font-family: var(--font-mono, ui-monospace, monospace); font-size: 11.5px; }
.lo-tot { font-size: 12.5px; color: var(--color-muted); }
.lo-out { display: flex; flex-wrap: wrap; gap: 4px 8px; align-items: baseline; min-width: 0; font-size: 13px; }
.lo-out > span:first-child { color: var(--color-muted); font-size: 12.5px; white-space: nowrap; }
.lo-out.err .lo-code { color: #fca5a5; }

.lo-build { display: grid; gap: 8px; min-width: 0; padding: 10px 12px; border: 1px solid var(--color-border); border-radius: 10px; }
.lo-build-h { margin: 0; font-size: 14px; font-weight: 700; color: var(--color-fg); }
.lo-build-h code { font: 600 13.5px var(--font-mono, ui-monospace, monospace); }
.lo-ops { display: flex; flex-wrap: wrap; gap: 6px 14px; }
.lo-opg { display: flex; flex-wrap: wrap; align-items: center; gap: 5px; min-width: 0; }
.lo-opg-h { font-size: 12px; font-weight: 600; color: var(--color-muted); margin-right: 2px; }
.lo-op { min-height: 34px; padding: 4px 10px; border: 1px solid var(--color-border); border-radius: 8px; background: var(--color-surface-2); color: var(--color-fg);
  font: 600 13px/1.2 var(--font-mono, ui-monospace, monospace); cursor: pointer; white-space: nowrap; }
.lo-op:hover { background: color-mix(in srgb, var(--color-fg) 8%, var(--color-surface-2)); }
.lo-op[aria-checked="true"] { background: var(--accent, var(--color-accent)); border-color: transparent; color: #fff; }
.lo-op:focus-visible, .lo-run:focus-visible, .lo-in:focus-visible, .lo-bar .btn:focus-visible { outline: 3px solid color-mix(in srgb, var(--accent, var(--color-accent)) 55%, transparent); outline-offset: 2px; }
.lo-args { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; min-width: 0; }
.lo-arg { display: inline-flex; align-items: center; gap: 6px; font: 600 13px var(--font-mono, ui-monospace, monospace); color: var(--color-fg); }
.lo-in { min-height: 34px; padding: 4px 8px; border: 1px solid var(--color-border); border-radius: 7px; background: var(--color-surface); color: var(--color-fg);
  font: 14px var(--font-mono, ui-monospace, monospace); min-width: 0; }
.lo-in.sm { width: 4.6em; }
.lo-in.lg { width: 11em; max-width: 52vw; }
.lo-chk { display: inline-flex; align-items: center; gap: 6px; font: 13px var(--font-mono, ui-monospace, monospace); color: var(--color-fg); }
.lo-go { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; min-width: 0; }
.lo-prev { flex: 1 1 220px; min-width: 0; margin: 0; padding: 6px 10px; border-radius: 7px; background: #0b1220; color: #e2e8f0; border: 1px solid #1e2a44;
  font: 13.5px/1.45 var(--font-mono, ui-monospace, monospace); white-space: pre-wrap; overflow-wrap: anywhere; }
.lo-run { min-height: 38px; padding: 6px 16px; white-space: nowrap; }
.lo-hint { margin: 0; font-size: 13px; line-height: 1.45; color: var(--color-muted); }
.lo-own { display: grid; gap: 4px; padding-top: 8px; border-top: 1px dashed var(--color-border); }
.lo-own label { font-size: 13px; color: var(--color-muted); }
.lo-own-row { display: flex; gap: 8px; min-width: 0; }
.lo-own-row .lo-in { flex: 1 1 auto; width: auto; }

.lo-bar { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px; }
.lo-btns { display: flex; flex-wrap: wrap; gap: 6px; }
.lo-btns .btn { min-height: 38px; padding: 7px 11px; white-space: nowrap; }
.lo-btns .btn:disabled { opacity: .45; cursor: not-allowed; }
.lo-status { flex: 1 1 200px; margin: 0; font-size: 13px; line-height: 1.4; color: var(--color-muted); }
.lo-status b { color: var(--color-fg); }

.lo-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 12px; min-width: 0; }
@container lo (min-width: 720px) { .lo-grid { grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); align-items: start; } }
.lo-side { display: flex; flex-direction: column; gap: 12px; min-width: 0; }
.lo-codew, .lo-conw { min-width: 0; }
.lo-chartw { position: relative; height: 214px; border: 1px solid #1e2a44; border-radius: 10px; overflow: hidden; background: #0b1220; }
.lo-chart-cap { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 10px; margin: 4px 2px 0; font-size: 12.5px; color: var(--color-muted); line-height: 1.4; }
.lo-chart-cap span { flex: 1 1 200px; }
.lo-clear { padding: 3px 10px; font-size: 12.5px; min-height: 30px; }
.lo-ctl .lo-note { margin: 0; font-size: 12.5px; color: var(--color-muted); line-height: 1.45; }
`;

// ---------------------------------------------------------------------------------------------------------------
export function mount(rootEl) {
  const lang = getLocale() === 'id' ? 'id' : 'en';
  const T = (en, id) => (lang === 'id' ? id : en);
  const pick = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? v[lang] : v);
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const hl = (code) => highlight(code, 'python').join('\n');
  const narrow = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 600px)').matches;
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  let uidN = 0;
  const uid = (p) => `lo-${p}-${Math.random().toString(36).slice(2, 7)}${uidN++}`;

  const style = document.createElement('style');
  style.textContent = CSS;
  rootEl.appendChild(style);

  const main = el('div', 'lo');
  rootEl.appendChild(main);
  const ctrlPanel = el('div', 'sim-controls lo-ctl');
  rootEl.appendChild(ctrlPanel);

  // ---- canvas (the list) ----
  const cvWrap = el('div', 'lo-cv');
  main.appendChild(cvWrap);
  const cv = createCanvas(cvWrap);
  cv.canvas.setAttribute('role', 'img');

  // ---- info: what the last step did ----
  const info = el('section', 'lo-info');
  info.setAttribute('aria-label', T('What the last step did', 'Apa yang dilakukan langkah terakhir'));
  main.appendChild(info);
  const live = el('div', 'lo-sr');
  live.setAttribute('aria-live', 'polite');
  main.appendChild(live);

  // ---- builder ----
  const build = el('section', 'lo-build');
  build.setAttribute('aria-label', T('Try a list operation', 'Coba operasi list'));
  const buildH = el('h2', 'lo-build-h');
  const opsBox = el('div', 'lo-ops');
  opsBox.setAttribute('role', 'radiogroup');
  opsBox.setAttribute('aria-label', T('Operation', 'Operasi'));
  const opBtns = new Map();
  for (const g of ['read', 'change']) {
    const grp = el('div', 'lo-opg');
    grp.appendChild(el('span', 'lo-opg-h', g === 'read' ? T('Read:', 'Baca:') : T('Change:', 'Ubah:')));
    for (const op of OPS.filter((o) => o.group === g)) {
      const b = el('button', 'lo-op', op.chip);
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
  const argsRow = el('div', 'lo-args');
  const mkArg = (key, cls, aria) => {
    const lab = el('label', 'lo-arg');
    lab.appendChild(el('span', null, key));
    const inp = el('input', `lo-in ${cls}`);
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
  const argI = mkArg('i', 'sm', T('index i (a whole number; negative counts from the end)', 'indeks i (bilangan bulat; negatif dihitung dari belakang)'));
  const argX = mkArg('x', 'lg', T('value x (text gets quotes automatically; numbers stay numbers)', 'nilai x (teks otomatis diberi tanda petik; angka tetap angka)'));
  const argA = mkArg('a', 'sm', T('slice start a (empty = from the start)', 'awal slice a (kosong = dari awal)'));
  const argB = mkArg('b', 'sm', T('slice stop b, not included (empty = to the end)', 'batas slice b, tidak ikut (kosong = sampai akhir)'));
  const revLab = el('label', 'lo-chk');
  const revIn = el('input');
  revIn.type = 'checkbox';
  revIn.addEventListener('change', () => updatePreview());
  revLab.append(revIn, el('span', null, 'reverse=True'));
  argsRow.appendChild(revLab);
  const goRow = el('div', 'lo-go');
  const prev = el('pre', 'lo-prev');
  prev.setAttribute('aria-label', T('Python statement that will run', 'Pernyataan Python yang akan dijalankan'));
  const runBtn = el('button', 'btn btn--primary lo-run', T('▶ Run statement', '▶ Jalankan'));
  runBtn.type = 'button';
  runBtn.addEventListener('click', () => runBuilder());
  goRow.append(prev, runBtn);
  const hint = el('p', 'lo-hint');
  const own = el('div', 'lo-own');
  const ownId = uid('own');
  const ownLab = el('label', null, T('Or type your own one-line Python statement:', 'Atau ketik sendiri satu baris pernyataan Python:'));
  ownLab.htmlFor = ownId;
  const ownRow = el('div', 'lo-own-row');
  const ownIn = el('input', 'lo-in');
  ownIn.id = ownId;
  ownIn.type = 'text';
  ownIn.spellcheck = false;
  ownIn.autocomplete = 'off';
  ownIn.setAttribute('autocapitalize', 'off');
  ownIn.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); runOwn(); } });
  const ownBtn = el('button', 'btn lo-run', T('Run', 'Jalankan'));
  ownBtn.type = 'button';
  ownBtn.addEventListener('click', () => runOwn());
  ownRow.append(ownIn, ownBtn);
  own.append(ownLab, ownRow);
  build.append(buildH, opsBox, argsRow, goRow, hint, own);
  main.appendChild(build);

  // ---- transport bar ----
  const bar = el('div', 'lo-bar');
  bar.setAttribute('role', 'group');
  bar.setAttribute('aria-label', T('Run the program', 'Jalankan program'));
  const btns = el('div', 'lo-btns');
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
  const bEnd = mkBtn(T('⏭ To end', '⏭ Ke akhir'), T('To end: run the rest at once', 'Ke akhir: jalankan sisanya sekaligus'), () => { stopPlay(); if (pos < prog.steps.length) { goTo(prog.steps.length, false); announceStep(); } });
  const bUndo = mkBtn(T('↶ Undo', '↶ Batalkan'), T('Undo: remove the last statement you added', 'Batalkan: hapus pernyataan terakhir yang kamu tambahkan'), () => undo());
  const bReset = mkBtn(T('⟲ Reset', '⟲ Ulang'), T('Reset the list or example', 'Ulang list atau contoh dari awal'), () => { loadPreset(preset, true); announce(T('Reset.', 'Diulang dari awal.')); });
  const status = el('p', 'lo-status');
  bar.append(btns, status);
  main.appendChild(bar);

  // ---- code + console + chart ----
  const grid = el('div', 'lo-grid');
  const codeW = el('div', 'lo-codew');
  const cp = codePanel({
    value: '', language: 'python', editable: false, minLines: 4, maxLines: narrow ? 12 : 16, title: 'main.py', locale: lang,
    ariaLabel: T('The program so far: each operation you run adds a line', 'Program sejauh ini: setiap operasi yang kamu jalankan menambah satu baris'),
  });
  codeW.appendChild(cp.el);
  const side = el('div', 'lo-side');
  const conW = el('div', 'lo-conw');
  const out = consolePanel({
    minLines: 3, maxLines: 8, title: T('Output (console)', 'Keluaran (konsol)'), locale: lang,
    ariaLabel: T('Program output', 'Keluaran program'),
    placeholder: T('print() output and error messages appear here.', 'Keluaran print() dan pesan galat muncul di sini.'),
  });
  conW.appendChild(out.el);
  const chartBox = el('div');
  const chartW = el('div', 'lo-chartw');
  const chart = createCanvas(chartW);
  chart.canvas.setAttribute('role', 'img');
  const chartCap = el('div', 'lo-chart-cap');
  chartCap.appendChild(el('span', null, T('Cells moved by one operation as the list grows. Each dot is an operation you ran (dots stay when you change the list).', 'Sel yang digeser oleh satu operasi saat list makin panjang. Setiap titik adalah operasi yang kamu jalankan (titik tetap ada saat list diganti).')));
  const clearDots = el('button', 'btn lo-clear', T('Clear dots', 'Hapus titik'));
  clearDots.type = 'button';
  clearDots.addEventListener('click', () => { archived = []; chartFrom = pos; chartDirty = true; announce(T('Chart dots cleared.', 'Titik grafik dihapus.')); });
  chartCap.appendChild(clearDots);
  chartBox.append(chartW, chartCap);
  side.append(conW, chartBox);
  grid.append(codeW, side);
  main.appendChild(grid);

  // ---- controls panel ----
  const presetSel = select({
    label: T('List or example program', 'List atau program contoh'), key: 'list',
    options: PRESETS.map((p) => ({ value: p.key, label: pick(p.name) })), value: 'playlist',
    onChange: (v) => { const p = PRESETS.find((q) => q.key === v); if (p) { loadPreset(p, true); announce(pick(p.name)); } },
  });
  {
    // group the options: lists to explore / worked examples
    const sel = presetSel.el.querySelector('select');
    const g1 = el('optgroup');
    g1.label = T('Lists to explore', 'List untuk dijelajahi');
    const g2 = el('optgroup');
    g2.label = T('Example programs', 'Program contoh');
    for (const o of [...sel.options]) (PRESETS.find((p) => p.key === o.value).group === 'list' ? g1 : g2).appendChild(o);
    sel.append(g1, g2);
    sel.value = 'playlist';
  }
  ctrlPanel.appendChild(presetSel.el);
  let numN = 8;
  const nSlider = slider({
    label: T('Length n of the numbers list', 'Panjang n list angka'), key: 'n', min: 1, max: 16, step: 1, value: numN,
    onInput: (v) => { numN = v; if (preset.sized) loadPreset(preset, true); },
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
  let showNeg = true;
  const negT = toggle({ label: T('Show negative indices (-1 = last)', 'Tampilkan indeks negatif (-1 = terakhir)'), key: 'neg', value: true, onChange: (v) => { showNeg = v; dirty = true; } });
  ctrlPanel.appendChild(negT.el);
  const legendNote = el('p', 'lo-note', T('Colours: blue int, teal float, green str. Cyan outline = cell read, orange = cell moved, green = new or found, amber pointer = where Python is looking.',
    'Warna: biru int, toska float, hijau str. Garis sian = sel dibaca, oranye = sel digeser, hijau = baru atau ditemukan, penunjuk kuning = tempat Python sedang melihat.'));
  ctrlPanel.appendChild(legendNote);

  const lab = labPanel({
    title: 'List operations lab',
    filename: 'list-operations-data.csv',
    columns: [
      { key: 'op', label: 'Operation' },
      { key: 'n', label: 'Length n' },
      { key: 'reads', label: 'Cells read' },
      { key: 'moves', label: 'Cells moved' },
    ],
    procedure: [
      'Choose the Playlist. Run insert() with i = 0 and record the row.',
      'Run append() with another title and record it. Compare the cells moved.',
      'Choose "Numbers 1 to n". For n = 4, 8, 12 and 16 run insert() with i = 0 and record each row.',
      'At the same lengths run pop() and pop(i) with i = 0, and record them.',
      'Compare your rows with the chart: which operations cost more as n grows, and which stay at 0?',
    ],
    predict: 'A playlist has 1,000 songs. How many cells move for insert(0, x)? For append(x)? For pop(0)? How many cells does "x in playlist" read when x is missing?',
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
  let curOp = 'insert';
  let dirty = true;
  let chartDirty = true;
  let lay = null;
  let layTarget = null;
  let lastW = 0;
  let lastCW = 0;
  let archived = [];
  let chartFrom = 0;

  const listName = () => {
    const pl = pos > 0 && prog.plans[pos - 1];
    if (pl && pl.id != null && pl.after) return pl.focus;
    return pick(preset.list);
  };
  const codeOf = (p) => (typeof p.code === 'function' ? p.code(numN)[lang] : p.code[lang]);

  function buildProgram(chs) {
    const src = `${chs.map((c) => c.text).join('\n')}\n`;
    const lines = src.split('\n');
    lines.pop();
    const chunkOfLine = [];
    chs.forEach((c, i) => { for (let k = 0; k < c.text.split('\n').length; k++) chunkOfLine.push(i); });
    const ex = execute(src);
    if (!ex.ok) return { src, lines, chunkOfLine, syntax: ex.error, steps: [], plans: [], anims: [] };
    const plans = analyse(lines, ex.steps, chunkOfLine, pick(preset.list));
    const anims = [];
    let prevFinal = null;
    const seen = new Set();
    plans.forEach((pl, s) => {
      pl.seenBefore = seen.has(pl.focus);
      if (pl.after || pl.before) seen.add(pl.focus);
      const capOk = preset.cap && pl.focus === pick(preset.list) ? preset.cap : 0;
      const a = buildAnim(pl, s > 0 ? plans[s - 1] : null, prevFinal, T, capOk);
      anims.push(a);
      prevFinal = a.end;
    });
    return { src, lines, chunkOfLine, steps: ex.steps, plans, anims, syntax: null };
  }

  function restAnimAt0() {
    const f = emptyFrame();
    f.name = pick(preset.list);
    f.missing = true;
    return new Anim(f);
  }

  function loadPreset(p, animateFirst) {
    stopPlay();
    if (prog) archived = archived.concat(chartPoints(true)).slice(-2000);
    chartFrom = 0;
    preset = p;
    pendingSyntax = null;
    nSlider.el.hidden = !p.sized;
    chunks = splitChunks(codeOf(p)).map((text) => ({ text, user: false }));
    prog = buildProgram(chunks);
    argX.inp.value = pick(p.x);
    if (!argI.inp.value) argI.inp.value = '1';
    if (!argA.inp.value && !argB.inp.value) { argA.inp.value = '1'; argB.inp.value = '3'; }
    lay = null;
    goTo(0, false);
    if (p.group === 'list' && animateFirst) playUntil(prog.steps.length);
    updatePreview();
  }

  function goTo(p, animate) {
    pos = Math.max(0, Math.min(p, prog.steps.length));
    if (pos === 0) { anim = restAnimAt0(); animT = 0; animDone = true; } else {
      anim = prog.anims[pos - 1];
      animT = animate && speed !== Infinity ? 0 : anim.total;
      animDone = animT >= anim.total;
    }
    dirty = true;
    chartDirty = true;
    renderDom();
  }

  function stepOnce() {
    if (anim && !animDone) { animT = anim.total; animDone = true; }
    if (pos >= prog.steps.length) { announce(T('The program has finished. Add a statement, or press Reset.', 'Program sudah selesai. Tambah pernyataan, atau tekan Ulang.')); return; }
    goTo(pos + 1, true);
    announceStep();
  }
  function playUntil(until) {
    playing = { until };
    waitT = 0;
    if (pos < until && animDone) { goTo(pos + 1, true); announceStep(true); }
    renderBar();
  }
  function stopPlay() {
    playing = null;
    if (anim && !animDone) { animT = anim.total; animDone = true; dirty = true; }
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

  function runStatement(stmt) {
    stopPlay();
    if (anim && !animDone) { animT = anim.total; animDone = true; }
    let base = chunks.slice();
    const ec = finalErrorChunk();
    if (ec >= 0 && ec === base.length - 1) base = base.slice(0, -1);
    else if (ec >= 0) {
      announce(T('The program stops with an error before the end. Press Reset first.', 'Program berhenti karena galat sebelum akhir. Tekan Ulang dulu.'));
      return;
    }
    const next = [...base, { text: stmt, user: true }];
    const p2 = buildProgram(next);
    if (p2.syntax) {
      pendingSyntax = { text: stmt, error: p2.syntax, lines: p2.lines };
      if (base.length !== chunks.length) { chunks = base; prog = buildProgram(chunks); }
      goTo(prog.steps.length, false);
      announce(`${p2.syntax.type}: ${p2.syntax.message}. ${T('Python checks the whole file before running, so nothing ran.', 'Python memeriksa seluruh berkas sebelum menjalankan, jadi tidak ada yang berjalan.')}`);
      return;
    }
    pendingSyntax = null;
    chunks = next;
    prog = p2;
    const ci = next.length - 1;
    let start = prog.plans.findIndex((pl) => pl.chunk === ci);
    if (start < 0) start = prog.steps.length;
    goTo(start, false);
    playUntil(prog.steps.length);
  }

  function undo() {
    stopPlay();
    if (pendingSyntax) { pendingSyntax = null; goTo(pos, false); return; }
    if (!chunks.length || !chunks[chunks.length - 1].user) return;
    chunks = chunks.slice(0, -1);
    prog = buildProgram(chunks);
    goTo(prog.steps.length, false);
    announce(T('The last statement was removed.', 'Pernyataan terakhir dihapus.'));
  }

  // ------------------------------------------------------------------------------------------------------------
  // Builder
  // ------------------------------------------------------------------------------------------------------------
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
    const keys = OPS.map((o) => o.key);
    let i = keys.indexOf(curOp);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') i = (i + 1) % keys.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') i = (i - 1 + keys.length) % keys.length;
    else if (e.key === 'Home') i = 0;
    else if (e.key === 'End') i = keys.length - 1;
    else return;
    e.preventDefault();
    selectOp(keys[i], true);
  }
  function loopVarFor(L) {
    const v = pick(preset.loopVar);
    return L === pick(preset.list) && v !== L ? v : (L === 'item' ? 'x' : T('item', 'isi'));
  }
  function builderStmt() {
    const L = listName();
    const i = argI.inp.value.trim();
    const x = literal(argX.inp.value);
    const a = argA.inp.value.trim();
    const b = argB.inp.value.trim();
    const taken = T('taken', 'diambil');
    const need = (v, nm) => { if (!v) throw new Error(T(`Type a value for ${nm} first.`, `Isi dulu ${nm}.`)); return v; };
    switch (curOp) {
      case 'get': return `print(${L}[${need(i, 'i')}])`;
      case 'len': return `print(len(${L}))`;
      case 'in': return `print(${x} in ${L})`;
      case 'index': return `print(${L}.index(${x}))`;
      case 'slice': return `print(${L}[${a}:${b}])`;
      case 'for': { const v = loopVarFor(L); return `for ${v} in ${L}:\n    print(${v})`; }
      case 'set': return `${L}[${need(i, 'i')}] = ${x}`;
      case 'append': return `${L}.append(${x})`;
      case 'insert': return `${L}.insert(${need(i, 'i')}, ${x})`;
      case 'pop': return `${taken} = ${L}.pop()`;
      case 'popi': return `${taken} = ${L}.pop(${need(i, 'i')})`;
      case 'remove': return `${L}.remove(${x})`;
      case 'sort': return revIn.checked ? `${L}.sort(reverse=True)` : `${L}.sort()`;
      case 'reverse': return `${L}.reverse()`;
      default: return '';
    }
  }
  function updatePreview() {
    const op = OPS.find((o) => o.key === curOp);
    argI.lab.hidden = !op.args.includes('i');
    argX.lab.hidden = !op.args.includes('x');
    argA.lab.hidden = !op.args.includes('a');
    argB.lab.hidden = !op.args.includes('b');
    revLab.hidden = !op.args.includes('rev');
    argsRow.hidden = op.args.length === 0;
    const L = listName();
    buildH.innerHTML = `${esc(T('Try an operation on', 'Coba operasi pada'))} <code>${esc(L)}</code>`;
    ownIn.placeholder = `${L}.insert(0, ${literal(pick(preset.x))})`;
    try {
      prev.innerHTML = hl(builderStmt());
      runBtn.disabled = false;
    } catch (e) {
      prev.textContent = e.message;
      runBtn.disabled = true;
    }
    const h = OP_HINT[curOp];
    hint.textContent = (lang === 'id' ? h[1] : h[0]).replace(/\bL\b/g, L);
  }
  function runBuilder() {
    let stmt;
    try { stmt = builderStmt(); } catch (e) { announce(e.message); return; }
    runStatement(stmt);
  }
  function runOwn() {
    const s = ownIn.value.replace(/\s+$/, '');
    if (!s.trim()) { announce(T('Type a Python statement first.', 'Ketik dulu sebuah pernyataan Python.')); ownIn.focus(); return; }
    runStatement(s);
  }

  // ------------------------------------------------------------------------------------------------------------
  // Rendering the DOM parts
  // ------------------------------------------------------------------------------------------------------------
  function announce(text) { live.textContent = ''; setTimeout(() => { live.textContent = text; }, 30); }
  function announceStep(quiet) {
    if (quiet) return;
    const pl = pos > 0 ? prog.plans[pos - 1] : null;
    if (!pl) return;
    const why = [...new Set(pl.parts.map((p) => explain(p, pl, T)).filter(Boolean))].join(' ');
    announce(`${T('Line', 'Baris')} ${pl.line}: ${pl.text}. ${why}${pl.repr ? ` ${pl.focus} = ${pl.repr}` : ''}`);
  }

  function renderBar() {
    const total = prog ? prog.steps.length : 0;
    bBack.disabled = pos === 0;
    bStep.disabled = pos >= total;
    bEnd.disabled = pos >= total;
    bPlay.textContent = playing ? T('⏸ Pause', '⏸ Jeda') : T('▶ Run all', '▶ Jalankan semua');
    bPlay.setAttribute('aria-label', playing ? T('Pause', 'Jeda') : T('Run all remaining lines with animation', 'Jalankan semua baris yang tersisa dengan animasi'));
    bUndo.disabled = !pendingSyntax && !(chunks.length && chunks[chunks.length - 1].user);
    let s;
    if (pendingSyntax) s = `<b>${esc(pendingSyntax.error.type)}</b> — ${esc(T('nothing ran; fix the statement or press Undo.', 'tidak ada yang berjalan; perbaiki pernyataannya atau tekan Batalkan.'))}`;
    else if (pos >= total && total && prog.steps[total - 1].error) s = `<b>${esc(T('Stopped', 'Berhenti'))}</b>: ${esc(prog.steps[total - 1].error.type)} ${esc(T('on line', 'di baris'))} ${prog.steps[total - 1].line}.`;
    else if (pos >= total) s = `<b>${esc(T('Finished', 'Selesai'))}</b> · ${esc(T('step', 'langkah'))} ${pos} / ${total}. ${esc(T('Add an operation above.', 'Tambahkan operasi di atas.'))}`;
    else s = `${esc(T('Step', 'Langkah'))} ${pos} / ${total} · <b>${esc(T('line', 'baris'))} ${prog.steps[pos].line}</b> ${esc(T('runs next', 'dijalankan berikutnya'))}.`;
    status.innerHTML = s;
  }

  function renderInfo() {
    const pl = pos > 0 ? prog.plans[pos - 1] : null;
    info.classList.remove('is-err', 'is-move');
    if (pendingSyntax) {
      const e = pendingSyntax.error;
      info.classList.add('is-err');
      info.innerHTML = `<div class="lo-top"><span class="lo-ln">${esc(T('Not run', 'Tidak dijalankan'))}</span><code class="lo-code">${hl(pendingSyntax.text)}</code></div>`
        + `<p class="lo-why">${esc(T(`Python found a ${e.type} on line ${e.line} before running anything, so the program did not start. Read the message in the console, then fix the statement (or press Undo).`, `Python menemukan ${e.type} di baris ${e.line} sebelum menjalankan apa pun, jadi program tidak dimulai. Baca pesannya di konsol, lalu perbaiki pernyataannya (atau tekan Batalkan).`))}</p>`;
      return;
    }
    if (!pl) {
      info.innerHTML = `<p class="lo-why">${esc(preset.group === 'program'
        ? T('Press Step to run the example one line at a time (or Run all). The row of cells shows the list; the counters show how many cells each operation reads and moves.', 'Tekan Langkah untuk menjalankan contoh baris demi baris (atau Jalankan semua). Deretan sel menunjukkan list-nya; penghitung menunjukkan berapa sel yang dibaca dan digeser setiap operasi.')
        : T('Choose an operation below and run it. Each operation becomes a line of Python in the program.', 'Pilih sebuah operasi di bawah lalu jalankan. Setiap operasi menjadi satu baris Python di program.'))}</p>`;
      return;
    }
    const why = [...new Set(pl.parts.map((p) => explain(p, pl, T)).filter(Boolean))].join(' ');
    const err = pl.parts.find((p) => p.err);
    if (err && !err.caught) info.classList.add('is-err');
    else if (pl.moves) info.classList.add('is-move');
    let h = `<div class="lo-top"><span class="lo-ln">${esc(T('line', 'baris'))} ${pl.line}</span><code class="lo-code">${hl(pl.text)}</code></div>`;
    h += `<p class="lo-why">${esc(why)}</p>`;
    const quiet = pl.parts.every((p) => QUIET.has(p.k) || p.k === 'error');
    if (!quiet && pl.before) {
      h += `<div class="lo-cost"><span class="lo-pill">n = ${pl.n}</span><span class="lo-pill lo-r">${esc(T('cells read', 'sel dibaca'))}: ${pl.reads == null ? '—' : pl.reads}</span><span class="lo-pill lo-m">${esc(T('cells moved', 'sel digeser'))}: ${pl.moves == null ? '—' : pl.moves}</span>`;
      const rec = chunkTotal(pos - 1);
      if (rec && (rec.reads !== pl.reads || rec.moves !== pl.moves)) h += `<span class="lo-tot">${esc(T('whole statement so far', 'seluruh pernyataan sejauh ini'))}: ${rec.reads == null ? '—' : rec.reads} / ${rec.moves == null ? '—' : rec.moves}</span>`;
      h += '</div>';
    }
    if (pl.out) {
      const lines = pl.out.replace(/\n$/, '').split('\n');
      h += `<div class="lo-out"><span>${esc(T('Output', 'Keluaran'))}:</span><code class="lo-code">${esc(lines.slice(-3).join('\n'))}</code></div>`;
    }
    if (pl.assigned && pl.assigned.length > 420) pl.assigned = `${pl.assigned.slice(0, 400)} …`;
    if (pl.assigned && !pl.assigned.startsWith(`${pl.focus} =`)) h += `<div class="lo-out"><span>${esc(T('Variable', 'Variabel'))}:</span><code class="lo-code">${hl(pl.assigned)}</code></div>`;
    if (pl.error) h += `<div class="lo-out err"><span>${esc(T('Error', 'Galat'))}:</span><code class="lo-code">${esc(`${pl.error.type}: ${pl.error.message}`)}</code></div>`;
    if (pl.repr != null) {
      const r = pl.repr.length > 420 ? `${pl.repr.slice(0, 400)} …` : pl.repr;
      h += `<div class="lo-out"><span>${esc(T('Now', 'Sekarang'))}:</span><code class="lo-code">${hl(`${pl.focus} = ${r}`)}</code></div>`;
    }
    info.innerHTML = h;
  }

  function chunkTotal(s) {
    const pl = prog.plans[s];
    let r = 0;
    let m = 0;
    for (let j = s; j >= 0 && prog.plans[j].chunk === pl.chunk; j--) {
      const q = prog.plans[j];
      if (q.id !== pl.id) continue;
      r = r == null || q.reads == null ? null : r + q.reads;
      m = m == null || q.moves == null ? null : m + q.moves;
    }
    return { reads: r, moves: m };
  }

  function labRecord() {
    for (let s = pos - 1; s >= 0; s--) {
      const pl = prog.plans[s];
      const real = pl.parts.filter((p) => !/^(none|pass|create|generic|gone|error|alias|loopnext|uses)$/.test(p.k) && !(p.k === 'whole' && p.fn === 'print()'));
      if (!real.length) continue;
      let s0 = s;
      while (s0 > 0 && prog.plans[s0 - 1].chunk === pl.chunk) s0--;
      const tot = chunkTotal(s);
      const first = (prog.lines[prog.plans[s0].line - 1] || '').trim().replace(/\s+#.*$/, '').replace(/:$/, '');
      const n0 = prog.plans[s0].id === pl.id ? prog.plans[s0].n : pl.n;
      return { op: short(first, 60), n: n0, reads: tot.reads, moves: tot.moves };
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
    const code = pendingSyntax ? `${prog.src}${pendingSyntax.text}\n` : prog.src;
    if (code !== lastCode) { cp.value = code.replace(/\n$/, ''); lastCode = code; }
    cp.setMarks(codeMarks());
    cp.setActiveLine(!pendingSyntax && pos < prog.steps.length ? prog.steps[pos].line : null);
    if (pendingSyntax) out.set(pendingSyntax.error.traceback, { error: pendingSyntax.error.traceback });
    else if (pos === 0) out.clear();
    else {
      const st = prog.steps[pos - 1];
      const text = st.after.output || '';
      if (st.error && st.error.simulatorLimit) {
        // the sim's step limit is not a Python error: python3 prints nothing for it, so the console gets a note
        const what = st.error.limitKind === 'iterations'
          ? T(`${st.error.limit} loop rounds inside one step`, `${st.error.limit} putaran di dalam satu langkah`)
          : T(`${st.error.limit} steps`, `${st.error.limit} langkah`);
        out.set([{ text, kind: 'out' }, { text: `${text && !text.endsWith('\n') ? '\n' : ''}⏹ ${T('stopped by the sim after', 'dihentikan oleh simulasi setelah')} ${what}\n`, kind: 'info' }]);
      } else out.set(text, { error: st.error ? st.error.traceback : undefined });
    }
    renderInfo();
    renderBar();
    updatePreview();
    const pl = pos > 0 ? prog.plans[pos - 1] : null;
    const items = pl && pl.after ? pl.after : null;
    cv.canvas.setAttribute('aria-label', items
      ? T(`${pl.focus}: ${items.length} items. ${items.slice(0, 12).map((it, j) => `[${j}] ${it.text}`).join(', ')}${items.length > 12 ? ', …' : ''}`,
        `${pl.focus}: ${items.length} data. ${items.slice(0, 12).map((it, j) => `[${j}] ${it.text}`).join(', ')}${items.length > 12 ? ', …' : ''}`)
      : T(`${listName()} does not exist yet.`, `${listName()} belum ada.`));
  }

  function chartPoints(currentOnly) {
    const pts = [];
    for (let s = chartFrom; s < pos; s++) {
      const pl = prog.plans[s];
      for (const p of pl.parts) {
        if (p.err || p.moves == null) continue;
        if (p.k === 'insert' || p.k === 'append' || p.k === 'remove' || ((p.k === 'pop' || p.k === 'del') && p.idx != null)) pts.push({ n: pl.n, moves: p.moves, kind: p.k });
      }
    }
    return currentOnly ? pts : archived.concat(pts).slice(-2000);
  }

  // ------------------------------------------------------------------------------------------------------------
  // Animation loop
  // ------------------------------------------------------------------------------------------------------------
  function draw() {
    if (!anim || !cv.width) return;
    const f = sample(anim, animT);
    const tgt = layoutFor(anim, cv.width);
    if (!lay) lay = { ...tgt };
    layTarget = tgt;
    const seats = !!preset.cap && f.name === pick(preset.list);
    drawList(cv.ctx, cv.width, cv.height, f, lay, { T, showNeg, seats });
  }
  function drawChartNow() {
    if (!chart.width) return;
    const pts = chartPoints();
    drawChart(chart.ctx, chart.width, chart.height, pts, T);
    const lastP = pts[pts.length - 1];
    chart.canvas.setAttribute('aria-label', T(
      `Chart of cells moved against list length n. Lines: insert(0, x) moves n cells, insert in the middle about n/2, append and pop() 0. ${pts.length} operation(s) plotted${lastP ? `; the last: ${lastP.kind} at n = ${lastP.n} moved ${lastP.moves}` : ''}.`,
      `Grafik sel digeser terhadap panjang list n. Garis: insert(0, x) menggeser n sel, insert di tengah sekitar n/2, append dan pop() 0. ${pts.length} operasi digambar${lastP ? `; yang terakhir: ${lastP.kind} pada n = ${lastP.n} menggeser ${lastP.moves}` : ''}.`));
  }

  const animator = loop((dt) => {
    if (cv.width !== lastW) { lastW = cv.width; lay = null; dirty = true; }
    if (chart.width !== lastCW) { lastCW = chart.width; chartDirty = true; }
    if (anim && !animDone) {
      animT += dt * (speed === Infinity ? 1e9 : speed);
      if (animT >= anim.total) { animT = anim.total; animDone = true; }
      dirty = true;
    }
    if (lay && layTarget) {
      const k = Math.min(1, dt * 9);
      const dw = layTarget.w - lay.w;
      const dx = layTarget.x0 - lay.x0;
      if (Math.abs(dw) > 0.05 || Math.abs(dx) > 0.05) { lay.w += dw * k; lay.x0 += dx * k; dirty = true; } else if (dw || dx) { lay.w = layTarget.w; lay.x0 = layTarget.x0; dirty = true; }
    }
    if (playing && animDone) {
      waitT += dt;
      if (waitT >= (speed === Infinity ? 0.28 : 0.12 / Math.max(0.5, speed))) {
        waitT = 0;
        if (pos < playing.until && pos < prog.steps.length) goTo(pos + 1, true);
        else { playing = null; renderBar(); announceStep(); }
      }
    }
    if (dirty) { draw(); dirty = false; }
    if (chartDirty) { drawChartNow(); chartDirty = false; }
  });

  // ------------------------------------------------------------------------------------------------------------
  selectOp('insert', false);
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
