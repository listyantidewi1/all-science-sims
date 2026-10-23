// Python Step by Step: a Python Tutor-style tracer for the PRIMM cycle and the "Tebak Output" game (PP 03).
// The program runs in minipy (src/lib/minipy.js) one statement per step. Every step is kept as a snapshot, so
// "Step back" and the step slider replay history without running the program again. Shown per step: the line
// that runs next (amber) and the one that just ran (green tick) in the code panel, the frames and objects as
// labelled memory boxes with arrows for references, the console, and a trace table.
import { button, select, slider, toggle } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';
import { compile, createRun, reduceExpression, tokenize } from '../../../lib/minipy.js';
import { codePanel, consolePanel, highlight } from '../../../lib/codepanel.js';

// PRESETS-START
// Preset programs. Indonesian versions follow PP 03 (identifiers, prompts and messages); the English versions are
// the same programs with English names. `inputs` = the values in the input box; `tests` = quick test-data chips.
const P = String.raw;
const PRESETS = [
  {
    key: 'square',
    name: { en: 'Square of a number (sequence)', id: 'Hitung kuadrat (sekuen)' },
    code: {
      en: P`number = int(input("Enter a number: "))
square = number * number
print("The square of", number, "is", square)
`,
      id: P`angka = int(input("Masukkan sebuah angka: "))
kuadrat = angka * angka
print("Kuadrat dari", angka, "adalah", kuadrat)
`,
    },
    inputs: ['12'],
    tests: [['12'], ['-3'], ['0']],
  },
  {
    key: 'types',
    name: { en: 'Data types with type()', id: 'Tipe data dengan type()' },
    code: {
      en: P`name = "Andi"        # str (text)
age = 17             # int (whole number)
height = 165.5       # float (decimal number)
passed = True        # bool (logic)
print("Name:", name, "| type:", type(name))
print("Age:", age, "| type:", type(age))
print("Height:", height, "| type:", type(height))
print("Passed:", passed, "| type:", type(passed))
`,
      id: P`nama = "Andi"         # str (teks)
umur = 17             # int (bilangan bulat)
tinggi = 165.5        # float (bilangan desimal)
status_lulus = True   # bool (logika)
print("Nama:", nama, "| tipe:", type(nama))
print("Umur:", umur, "| tipe:", type(umur))
print("Tinggi:", tinggi, "| tipe:", type(tinggi))
print("Lulus:", status_lulus, "| tipe:", type(status_lulus))
`,
    },
  },
  {
    key: 'temperature',
    name: { en: 'Temperature conversion', id: 'Konversi suhu' },
    code: {
      en: P`celsius = float(input("Temperature (Celsius): "))
reaumur = celsius * 4 / 5
fahrenheit = celsius * 9 / 5 + 32
print(f"{celsius} C = {reaumur:.1f} R")
print(f"{celsius} C = {fahrenheit:.1f} F")
`,
      id: P`celsius = float(input("Suhu (Celsius): "))
reamur = celsius * 4 / 5
fahrenheit = celsius * 9 / 5 + 32
print(f"{celsius} C = {reamur:.1f} R")
print(f"{celsius} C = {fahrenheit:.1f} F")
`,
    },
    inputs: ['37.5'],
    tests: [['37.5'], ['100'], ['-40']],
  },
  {
    key: 'operators',
    name: { en: 'Guess the output: operators', id: 'Tebak output: operator' },
    code: {
      en: P`a = 10
b = 3
print(a / b)
print(a // b)
print(a % b)
print(a ** b)
print(str(a) + str(b))
`,
      id: P`a = 10
b = 3
print(a / b)
print(a // b)
print(a % b)
print(a ** b)
print(str(a) + str(b))
`,
    },
  },
  {
    key: 'pass-fail',
    name: { en: 'Pass or fail: boundary test', id: 'Predikat kelulusan: uji batas' },
    code: {
      en: P`score = float(input("Enter the final score: "))
if score >= 75:
    result = "PASS"
else:
    result = "FAIL"
print("Result:", result)
`,
      id: P`nilai = float(input("Masukkan nilai akhir: "))
if nilai >= 75:
    predikat = "LULUS"
else:
    predikat = "TIDAK LULUS"
print("Predikat:", predikat)
`,
    },
    inputs: ['80'],
    tests: [['80'], ['75'], ['74.9']],
  },
  {
    key: 'grades',
    name: { en: 'Grade letters A–D (if/elif/else)', id: 'Predikat A–D (if/elif/else)' },
    code: {
      en: P`score = int(input("Enter the score: "))
if score >= 90:
    print("Grade: A (Excellent)")
elif score >= 80:
    print("Grade: B (Good)")
elif score >= 70:
    print("Grade: C (Fair)")
else:
    print("Grade: D (Needs remedial)")
`,
      id: P`nilai = int(input("Masukkan nilai: "))
if nilai >= 90:
    print("Predikat: A (Sangat Baik)")
elif nilai >= 80:
    print("Predikat: B (Baik)")
elif nilai >= 70:
    print("Predikat: C (Cukup)")
else:
    print("Predikat: D (Perlu Remedial)")
`,
    },
    inputs: ['85'],
    tests: [['85'], ['90'], ['70'], ['69']],
  },
  {
    key: 'uniform',
    name: { en: 'Uniform of the day (match-case)', id: 'Seragam hari ini (match-case)' },
    code: {
      en: P`day = input("What day is it today? ")
match day:
    case "Monday" | "Tuesday":
        print("Wear the grey-and-white uniform.")
    case "Wednesday" | "Thursday":
        print("Wear the school batik uniform.")
    case "Friday":
        print("Wear the Scout uniform.")
    case _:
        print("Day off: wear your own neat clothes!")
`,
      id: P`hari = input("Hari ini hari apa? ")
match hari:
    case "Senin" | "Selasa":
        print("Gunakan seragam Putih Abu-abu.")
    case "Rabu" | "Kamis":
        print("Gunakan seragam Batik Sekolah.")
    case "Jumat":
        print("Gunakan seragam Pramuka.")
    case _:
        print("Hari libur, berpakaian bebas rapi!")
`,
    },
    inputs: { en: ['Wednesday'], id: ['Rabu'] },
    tests: { en: [['Wednesday'], ['Friday'], ['Sunday'], ['wednesday']], id: [['Rabu'], ['Jumat'], ['Minggu'], ['rabu']] },
  },
  {
    key: 'menu',
    name: { en: 'Menu code (match-case)', id: 'Kode menu (match-case)' },
    code: {
      en: P`menu_code = int(input("Enter a menu code (1-3): "))
match menu_code:
    case 1:
        print("You ordered Nasi Goreng.")
    case 2:
        print("You ordered Mie Ayam.")
    case 3:
        print("You ordered Es Teh Manis.")
    case _:
        print("Unknown menu code.")
`,
      id: P`kode_menu = int(input("Masukkan kode menu (1-3): "))
match kode_menu:
    case 1:
        print("Kamu memesan Nasi Goreng.")
    case 2:
        print("Kamu memesan Mie Ayam.")
    case 3:
        print("Kamu memesan Es Teh Manis.")
    case _:
        print("Kode menu tidak dikenal.")
`,
    },
    inputs: ['2'],
    tests: [['2'], ['3'], ['7']],
  },
  {
    key: 'sum-range',
    name: { en: 'Sum 1 to n (for + range)', id: 'Jumlah 1 sampai n (for + range)' },
    code: {
      en: P`n = int(input("Add up 1 to: "))
total = 0
for i in range(1, n + 1):
    total = total + i
print("Sum of 1 to", n, "=", total)
`,
      id: P`n = int(input("Jumlahkan 1 sampai: "))
total = 0
for i in range(1, n + 1):
    total = total + i
print("Jumlah 1 sampai", n, "=", total)
`,
    },
    inputs: ['5'],
    tests: [['5'], ['1'], ['0']],
  },
  {
    key: 'countdown',
    name: { en: 'Countdown (while)', id: 'Hitung mundur (while)' },
    code: {
      en: P`count = 3
print("On your marks... Get set...")
while count > 0:
    print(count)
    count = count - 1
print("GO! Run!")
`,
      id: P`hitung = 3
print("Bersedia... Siap...")
while hitung > 0:
    print(hitung)
    hitung = hitung - 1
print("YAA! Lari!")
`,
    },
  },
  {
    key: 'savings',
    name: { en: 'Savings goal (while + input)', id: 'Target tabungan (while + input)' },
    code: {
      en: P`savings_goal = 100000
savings = 0
weeks = 0
while savings < savings_goal:
    deposit = int(input("This week's deposit: Rp "))
    savings = savings + deposit
    weeks = weeks + 1
    print("Savings so far: Rp", savings)
print(f"Goal reached in {weeks} weeks. Total: Rp {savings}")
`,
      id: P`target_tabungan = 100000
tabungan = 0
minggu = 0
while tabungan < target_tabungan:
    setoran = int(input("Setoran minggu ini: Rp "))
    tabungan = tabungan + setoran
    minggu = minggu + 1
    print("Tabungan saat ini: Rp", tabungan)
print(f"Target tercapai dalam {minggu} minggu. Total: Rp {tabungan}")
`,
    },
    inputs: ['40000', '35000', '30000'],
    tests: [['40000', '35000', '30000'], ['100000'], ['50000', '49999', '1']],
  },
  {
    key: 'pocket-money',
    name: { en: 'Pocket money report (accumulators)', id: 'Rekap uang saku (akumulator)' },
    code: {
      en: P`# --- Stage 1: how many records ---
students = int(input("Number of students: "))

# --- Stage 2: set up the accumulators ---
total_money = 0
thrifty_count = 0

# --- Stage 3: read each value, decide, accumulate ---
for i in range(students):
    pocket_money = int(input(f"Pocket money of student {i + 1}: Rp "))
    if pocket_money <= 15000:
        print("  Category: Thrifty")
        thrifty_count = thrifty_count + 1
    else:
        print("  Category: Big spender")
    total_money = total_money + pocket_money

# --- Stage 4: final report ---
average = total_money / students
print("=============================")
print("Thrifty students:", thrifty_count, "of", students)
print(f"Average pocket money: Rp {average:.2f}")
`,
      id: P`# --- Tahap 1: masukan jumlah data ---
jumlah_siswa = int(input("Jumlah siswa yang didata: "))

# --- Tahap 2: siapkan akumulator ---
total_uang_saku = 0
jumlah_hemat = 0

# --- Tahap 3: baca data satu per satu, putuskan, tabung ---
for i in range(jumlah_siswa):
    uang_saku = int(input(f"Uang saku siswa ke-{i + 1}: Rp "))
    if uang_saku <= 15000:
        print("  Kategori: Hemat")
        jumlah_hemat = jumlah_hemat + 1
    else:
        print("  Kategori: Boros")
    total_uang_saku = total_uang_saku + uang_saku

# --- Tahap 4: laporan akhir ---
rata_rata = total_uang_saku / jumlah_siswa
print("=============================")
print("Banyak siswa hemat :", jumlah_hemat, "dari", jumlah_siswa, "siswa")
print(f"Rata-rata uang saku: Rp {rata_rata:.2f}")
`,
    },
    inputs: ['4', '10000', '20000', '15000', '25000'],
    tests: [['4', '10000', '20000', '15000', '25000'], ['2', '15000', '15001'], ['0']],
  },
  {
    key: 'list-loop',
    name: { en: 'Loop over a list of scores', id: 'Perulangan pada list nilai' },
    code: {
      en: P`class_scores = [80, 75, 90, 65, 85]
passed = 0
for score in class_scores:
    if score >= 75:
        print(score, "-> Passed")
        passed = passed + 1
    else:
        print(score, "-> Not yet passed")
print("Passed:", passed, "of", len(class_scores), "students")
`,
      id: P`nilai_kelas = [80, 75, 90, 65, 85]
jumlah_tuntas = 0
for nilai in nilai_kelas:
    if nilai >= 75:
        print(nilai, "-> Tuntas")
        jumlah_tuntas = jumlah_tuntas + 1
    else:
        print(nilai, "-> Belum Tuntas")
print("Tuntas:", jumlah_tuntas, "dari", len(nilai_kelas), "siswa")
`,
    },
  },
  {
    key: 'stack',
    name: { en: 'Stack: the Back button (list)', id: 'Stack: tombol Kembali (list)' },
    code: {
      en: P`history = []  # an empty stack
# The user opens pages one by one (push)
history.append("Home")
history.append("Timetable")
history.append("Report Card")
print("History now :", history)
print("Top page    :", history[-1])
# "Back" is pressed twice (pop)
page = history.pop()
print("Back from   :", page, "| left:", history)
page = history.pop()
print("Back from   :", page, "| left:", history)
# Safety check: never pop an empty stack
if len(history) == 0:
    print("History is empty, cannot go back.")
`,
      id: P`riwayat = []  # stack kosong
# Pengguna membuka halaman satu per satu (push)
riwayat.append("Beranda")
riwayat.append("Jadwal Pelajaran")
riwayat.append("Nilai Rapor")
print("Riwayat saat ini :", riwayat)
print("Halaman paling atas:", riwayat[-1])
# Tombol "Kembali" ditekan dua kali (pop)
halaman = riwayat.pop()
print("Kembali dari :", halaman, "| sisa:", riwayat)
halaman = riwayat.pop()
print("Kembali dari :", halaman, "| sisa:", riwayat)
# Pengaman: jangan pop jika stack kosong
if len(riwayat) == 0:
    print("Riwayat kosong, tidak bisa kembali lagi.")
`,
    },
  },
  {
    key: 'queue',
    name: { en: 'Queue: the photocopier line (deque)', id: 'Queue: antrean fotokopi (deque)' },
    code: {
      en: P`from collections import deque

queue = deque()  # an empty queue
queue.append("Mrs Sari's worksheet")  # join at the back
queue.append("Mr Budi's test")
queue.append("Principal's letter")
print("Queue now:", list(queue))
# Serve the one at the front, one at a time
while len(queue) > 0:
    document = queue.popleft()  # leave from the front
    print("Copying:", document, "| still waiting:", len(queue))
print("All documents done.")
`,
      id: P`from collections import deque

antrean = deque()  # antrean kosong
antrean.append("Tugas Bu Sari")  # masuk antrean (belakang)
antrean.append("Soal Pak Budi")
antrean.append("Surat Kepala Sekolah")
print("Antrean saat ini:", list(antrean))
# Petugas melayani yang terdepan satu per satu
while len(antrean) > 0:
    dokumen = antrean.popleft()  # keluar dari depan
    print("Sedang difotokopi:", dokumen, "| sisa antrean:", len(antrean))
print("Semua dokumen selesai.")
`,
    },
  },
  {
    key: 'guess-function',
    name: { en: 'Guess the output: functions', id: 'Tebak output: fungsi' },
    code: {
      en: P`def change(x):
    x = x * 2
    return x + 1

a = 5
b = change(a)
print(a, b)
print(change(change(1)))
`,
      id: P`def ubah(x):
    x = x * 2
    return x + 1

a = 5
b = ubah(a)
print(a, b)
print(ubah(ubah(1)))
`,
    },
  },
  {
    key: 'duty-roster',
    name: { en: 'Class duty roster (functions + list)', id: 'Daftar piket kelas (fungsi + list)' },
    code: {
      en: P`def show_roster(roster):
    """Show every student on duty with their number."""
    if len(roster) == 0:
        print("  (the duty roster is empty)")
    for number, name in enumerate(roster, start=1):
        print(f"  {number}. {name}")

def add_student(roster, name):
    """Add a student at the end of the roster."""
    roster.append(name)
    print(f"-> {name} added at the end.")

def remove_student(roster, name):
    """Remove a student; safe if the name is missing."""
    if name in roster:
        roster.remove(name)
        print(f"-> {name} removed.")
    else:
        print(f"-> {name} not found, nothing removed.")

def insert_student(roster, position, name):
    """Insert a student at a position (counting from 1)."""
    roster.insert(position - 1, name)
    print(f"-> {name} inserted at position {position}.")

# ---------- Main program ----------
duty = ["Andi", "Budi", "Cici", "Dina"]
print("Starting roster:")
show_roster(duty)

add_student(duty, "Eko")
show_roster(duty)

remove_student(duty, "Budi")
show_roster(duty)

insert_student(duty, 2, "Fajar")
show_roster(duty)

remove_student(duty, "Zaki")  # test a name that is not there
`,
      id: P`def tampilkan_piket(daftar):
    """Menampilkan seluruh petugas piket beserta nomor urutnya."""
    if len(daftar) == 0:
        print("  (daftar piket kosong)")
    for nomor, nama in enumerate(daftar, start=1):
        print(f"  {nomor}. {nama}")

def tambah_petugas(daftar, nama):
    """Menambahkan petugas di akhir daftar."""
    daftar.append(nama)
    print(f"-> {nama} ditambahkan di akhir.")

def hapus_petugas(daftar, nama):
    """Menghapus petugas tertentu; aman jika nama tidak ada."""
    if nama in daftar:
        daftar.remove(nama)
        print(f"-> {nama} dihapus.")
    else:
        print(f"-> {nama} tidak ditemukan, tidak ada yang dihapus.")

def sisip_petugas(daftar, posisi, nama):
    """Menyisipkan petugas pada posisi tertentu (posisi dihitung mulai 1)."""
    daftar.insert(posisi - 1, nama)
    print(f"-> {nama} disisipkan di posisi {posisi}.")

# ---------- Program utama ----------
piket = ["Andi", "Budi", "Cici", "Dina"]
print("Kondisi awal:")
tampilkan_piket(piket)

tambah_petugas(piket, "Eko")
tampilkan_piket(piket)

hapus_petugas(piket, "Budi")
tampilkan_piket(piket)

sisip_petugas(piket, 2, "Fajar")
tampilkan_piket(piket)

hapus_petugas(piket, "Zaki")  # menguji kasus nama tidak ada
`,
    },
  },
  {
    key: 'door-prize',
    name: { en: 'Door prize draw (random + seed)', id: 'Undian doorprize (random + seed)' },
    code: {
      en: P`import random

random.seed(2026)  # same seed -> the same draw every time
participants = ["Andi", "Budi", "Cici", "Dina", "Eko", "Fajar"]
random.shuffle(participants)
print("Shuffled order :", participants)
winner = random.choice(participants)
print("Door prize goes to:", winner)
ticket_numbers = random.sample(range(1, 31), 3)
print("Three ticket numbers:", ticket_numbers)
`,
      id: P`import random

random.seed(2026)  # seed sama -> hasil undian selalu sama
peserta = ["Andi", "Budi", "Cici", "Dina", "Eko", "Fajar"]
random.shuffle(peserta)
print("Urutan acak :", peserta)
pemenang = random.choice(peserta)
print("Pemenang doorprize:", pemenang)
nomor_undian = random.sample(range(1, 31), 3)
print("Tiga nomor undian :", nomor_undian)
`,
    },
  },
];
// PRESETS-END

const MAX_STEPS = 5000;                      // a traced run stops after this many steps (minipy StepLimit)
const MAX_ROWS = 300;                        // trace-table rows kept in the page (the newest ones)
const SPEEDS = [0.5, 1, 2, 4, 8, 16, 50];    // "Run" speed, steps per second
const DEFAULT_PRESET = 'pass-fail';
// Builtins that may be called when the sim evaluates a condition for display (no input, no side effects).
const SAFE_CALLS = new Set(['len', 'abs', 'int', 'float', 'str', 'bool', 'min', 'max', 'sum', 'round', 'type',
  'isinstance', 'ord', 'chr', 'any', 'all', 'sorted', 'list', 'tuple', 'set', 'range']);
const HEAP_TYPES = new Set(['list', 'tuple', 'dict', 'deque', 'set']);
const HEADER_KW = new Set(['if', 'elif', 'while', 'for', 'match', 'case', 'except']);
const ASSIGN_OPS = new Set(['=', '+=', '-=', '*=', '/=', '//=', '%=', '**=']);
/**
 * A View the sim may hand to reduceExpression (containers are rebuilt from the snapshot, so they show that step).
 * Left out: iterators and generators ('object' Views, like other library objects), which are shared with the
 * program (`list(it)` would use up its iterator), and the program's functions (max(xs, key=f)): minipy runs those
 * on a copy of the globals as they are when the row is drawn, which after "To end" is the end of the run, not the
 * step the row shows. A defaultdict is fine while its default_factory is a type.
 */
function evalSafe(v, depth) {
  if (!v || v.type === 'object' || v.type === 'function' || v.reprTruncated || depth > 12) return false;
  if (v.typeName === 'defaultdict' && !/^defaultdict\(<class '/.test(v.repr)) return false;
  for (const it of v.items || []) if (!evalSafe(it, depth + 1)) return false;
  for (const [k, x] of v.entries || []) if (!evalSafe(k, depth + 1) || !evalSafe(x, depth + 1)) return false;
  return true;
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const cut = (s, n) => (s.length > n ? s.slice(0, n - 1) + '…' : s);
const isHeap = (v) => !!v && HEAP_TYPES.has(v.type) && !!v.id;
const sameView = (a, b) => a.repr === b.repr && a.id === b.id && a.type === b.type;
/** Memory-panel highlight: a reference changes only when it points at another object (mutations show in the cells). */
const boxChanged = (a, b) => (!a ? true : (isHeap(b) && isHeap(a) ? a.id !== b.id : !sameView(a, b)));
const TYPE_CLASS = {
  int: 't-int', float: 't-float', str: 't-str', bool: 't-bool', NoneType: 't-none', list: 't-list', deque: 't-deque',
  tuple: 't-tuple', dict: 't-dict', set: 't-set', function: 't-fn',
};
const tcls = (v) => TYPE_CLASS[v?.type] || 't-other';

const CSS = `
.pyt { container-type: inline-size; container-name: pyt; padding: 12px; min-width: 0; }
.pyt *, .pyt *::before, .pyt *::after, .pyt-ctl * { box-sizing: border-box; }
.pyt [hidden], .pyt-ctl [hidden] { display: none !important; }
.pyt-grid { display: flex; flex-direction: column; gap: 12px; min-width: 0; }
.pyt-left, .pyt-right { display: contents; }
.pyt-code { order: 1; min-width: 0; }
.pyt-bar { order: 2; }
.pyt-memw { order: 3; min-width: 0; }
.pyt-con { order: 4; min-width: 0; }
.pyt-pred { order: 5; }
.pyt-trace { order: 6; }
@container pyt (min-width: 700px) {
  .pyt-grid { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); align-items: start; }
  .pyt-bar, .pyt-pred, .pyt-trace { grid-column: 1 / -1; }
  .pyt-left { display: flex; flex-direction: column; gap: 12px; grid-column: 1; min-width: 0; }
  .pyt-right { display: flex; flex-direction: column; gap: 12px; grid-column: 2; min-width: 0; }
  .pyt-bar, .pyt-code, .pyt-memw, .pyt-con, .pyt-pred, .pyt-trace { order: 0; }
}
.pyt-bar { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px; }
.pyt-btns { display: flex; flex-wrap: wrap; gap: 6px; }
.pyt-btns .btn { padding: 7px 11px; min-height: 38px; white-space: nowrap; }
.pyt-btns .btn:disabled { opacity: .45; cursor: not-allowed; filter: none; }
.pyt-btns .btn--primary:hover { background: var(--accent, var(--color-accent)); }
.pyt-scrub { display: flex; align-items: center; gap: 8px; flex: 1 1 200px; min-width: 0; }
.pyt-scrub input { flex: 1 1 auto; min-width: 60px; accent-color: var(--accent, var(--color-accent)); }
.pyt-count { font: 600 13px/1.2 var(--font-mono, monospace); white-space: nowrap; color: var(--color-fg); }
.pyt-status { flex: 1 1 100%; margin: 0; font-size: 13px; line-height: 1.45; color: var(--color-muted); min-height: 1.45em; }
.pyt-status b { color: var(--color-fg); }
.pyt-status.is-err b { color: var(--color-danger); }
.pyt-status.is-ok b { color: var(--color-ok); }
.pyt-sr { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }
.pyt-legend { display: flex; flex-wrap: wrap; gap: 4px 14px; margin-top: 6px; font-size: 12px; line-height: 1.5; color: var(--color-muted); }
.pyt-sw { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 17px; margin-right: 4px; border-radius: 4px; background: #0b1220; font: 700 11px/1 var(--font-sans); vertical-align: -3px; }
.pyt-sw.s-next { color: #fbbf24; box-shadow: inset 0 0 0 1px rgba(251,191,36,.6); }
.pyt-sw.s-done { color: #34d399; box-shadow: inset 0 0 0 1px rgba(52,211,153,.6); }
.pyt-sw.s-seen { color: #94a3b8; box-shadow: inset 0 0 0 1px rgba(148,163,184,.5); }
.pyt-sw.s-err { color: #f87171; box-shadow: inset 0 0 0 1px rgba(248,113,113,.6); }

.pyt-mem { --mono: var(--font-mono, ui-monospace, Menlo, Consolas, monospace); --sans: var(--font-sans, system-ui, sans-serif);
  background: #0b1220; color: #e2e8f0; border: 1px solid #1e2a44; border-radius: 10px; overflow: hidden;
  container-type: inline-size; container-name: pytmem; font: 13px/1.35 var(--mono); color-scheme: dark; }
.pyt-mem-h, .pyt-trace-h { display: flex; flex-wrap: wrap; align-items: center; gap: 3px 10px; min-height: 30px; padding: 4px 10px;
  background: #0f182c; border-bottom: 1px solid #1e2a44; font: 600 12px/1.3 var(--font-sans, sans-serif); color: #b6c2d6; }
.pyt-title { flex: 1 1 auto; letter-spacing: .02em; }
.pyt-mem-h small, .pyt-trace-h small { font-weight: 400; color: #8a99b3; }
.pyt-lgd { display: flex; flex-wrap: wrap; gap: 1px 9px; font-weight: 500; font-size: 11px; }
.pyt-lgd span { color: var(--tc); white-space: nowrap; }
.pyt-lgd span::before { content: ""; display: inline-block; width: 8px; height: 8px; margin-right: 4px; border-radius: 2px; background: var(--tc); }
.pyt-mem-body { position: relative; display: grid; grid-template-columns: minmax(0, 1fr); gap: 16px; padding: 10px 10px 12px; min-height: 120px; }
.pyt-mem-body.has-heap { padding-right: 34px; }
@container pytmem (min-width: 470px) { .pyt-mem-body { grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); column-gap: 34px; padding-right: 10px; } }
.pyt-frames { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
.pyt-heap { display: flex; flex-direction: column; align-items: flex-start; gap: 12px; min-width: 0; }
.pyt-heap:empty { display: none; }
.pyt-frame { border: 1px solid #2b3a5a; border-radius: 8px; background: #0f182c; padding: 6px 8px 8px; min-width: 0; }
.pyt-frame.is-cur { border-color: #fbbf24; box-shadow: 0 0 0 1px rgba(251, 191, 36, .3); }
.pyt-frame-h { display: flex; flex-wrap: wrap; gap: 2px 8px; align-items: baseline; margin-bottom: 6px; font: 600 12px/1.3 var(--sans); color: #b6c2d6; }
.pyt-frame.is-cur .pyt-frame-h { color: #fde68a; }
.pyt-frame-h small { font-weight: 400; color: #8a99b3; }
.pyt-vars { display: grid; grid-template-columns: minmax(0, max-content) minmax(0, 1fr); gap: 5px 8px; align-items: center; }
.pyt-vn { text-align: right; overflow-wrap: anywhere; color: #e2e8f0; }
.pyt-vv { display: flex; align-items: center; gap: 6px; min-width: 0; }
.pyt-box { display: inline-block; max-width: 100%; min-width: 0; padding: 1px 7px; border: 1.5px solid var(--tc); border-radius: 5px;
  background: color-mix(in srgb, var(--tc) 13%, #0b1220); color: var(--tc); white-space: pre; overflow: hidden; text-overflow: ellipsis; }
.pyt-ref { display: inline-flex; align-items: center; justify-content: center; flex: none; width: 30px; height: 22px; padding: 0; }
.pyt-ty { flex: none; font: 11px/1 var(--sans); color: var(--tc); white-space: nowrap; }
.pyt-dot { display: inline-block; flex: none; width: 9px; height: 9px; border-radius: 50%; background: #e2e8f0; }
.pyt-empty { color: #8a99b3; font: 12px/1.4 var(--sans); }
.pyt-ret { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; padding: 4px 8px; border: 1px dashed #3b4b6e; border-radius: 8px; font: 12px/1.4 var(--sans); color: #b6c2d6; }
.pyt-ret .pyt-box { font: 13px/1.35 var(--mono); }
.pyt-obj { max-width: 100%; min-width: 0; }
.pyt-obj-h { display: flex; flex-wrap: wrap; gap: 1px 8px; align-items: baseline; margin-bottom: 3px; font: 600 11px/1.3 var(--sans); color: var(--tc); }
.pyt-refs { color: #94a3b8; font-weight: 400; overflow-wrap: anywhere; }
.pyt-cells { display: flex; flex-wrap: wrap; padding: 0 0 1.5px 1.5px; }
.pyt-cell { display: flex; flex-direction: column; align-items: center; justify-content: flex-end; min-width: 34px; max-width: 100%;
  margin: 0 0 -1.5px -1.5px; padding: 3px 6px 1px; border: 1.5px solid var(--tc); background: color-mix(in srgb, var(--tc) 8%, #0b1220); }
.t-tuple > .pyt-cells > .pyt-cell, .t-set > .pyt-cells > .pyt-cell { border-style: dashed; }
.pyt-cv { max-width: 100%; color: var(--tc); white-space: pre; overflow: hidden; text-overflow: ellipsis; }
.pyt-ci { font: 10px/1.35 var(--sans); color: #8a99b3; }
.pyt-more { justify-content: center; color: #8a99b3; font: 11px var(--sans); }
.pyt-kvs { display: grid; grid-template-columns: minmax(0, max-content) minmax(0, 1fr); border: 1.5px solid var(--tc); background: color-mix(in srgb, var(--tc) 8%, #0b1220); }
.pyt-k, .pyt-v { display: flex; align-items: center; min-width: 0; padding: 2px 7px; border-top: 1px solid color-mix(in srgb, var(--tc) 35%, #0b1220); }
.pyt-k:first-child, .pyt-k:first-child + .pyt-v { border-top: 0; }
.pyt-k { border-right: 1.5px solid var(--tc); }
.pyt-emptyobj { padding: 1px 8px; border: 1.5px dashed var(--tc); color: #8a99b3; font: 12px/1.5 var(--sans); }
.pyt .is-chg { outline: 2px solid #fde047; outline-offset: 1px; position: relative; z-index: 1; }
@media (prefers-reduced-motion: no-preference) {
  .pyt .is-chg { animation: pyt-pop .7s ease-out; }
  @keyframes pyt-pop { from { outline-color: rgba(253, 224, 71, 0); outline-offset: 6px; } }
}
.pyt-arrows { position: absolute; left: 0; top: 0; pointer-events: none; overflow: visible; }
.pyt-arrows path { fill: none; stroke: #cbd5e1; stroke-width: 1.6; }
.pyt .t-int { --tc: #60a5fa; } .pyt .t-float { --tc: #2dd4bf; } .pyt .t-str { --tc: #c3e88d; } .pyt .t-bool { --tc: #f472b6; }
.pyt .t-none { --tc: #94a3b8; } .pyt .t-list { --tc: #fb923c; } .pyt .t-deque { --tc: #fdba74; } .pyt .t-tuple { --tc: #c4b5fd; }
.pyt .t-dict { --tc: #fcd34d; } .pyt .t-set { --tc: #f0abfc; } .pyt .t-fn { --tc: #ffcb6b; } .pyt .t-other { --tc: #a5b4fc; }

.pyt-pred { display: grid; gap: 8px; padding: 10px; border: 1px solid var(--color-border); border-radius: 10px;
  background: color-mix(in srgb, var(--color-fg) 3%, var(--color-surface)); container-type: inline-size; container-name: pytpred; }
.pyt-pred-h { margin: 0; font-size: 14px; font-weight: 700; color: var(--color-fg); }
.pyt-pred-cols { display: grid; gap: 10px; grid-template-columns: minmax(0, 1fr); align-items: start; }
@container pytpred (min-width: 560px) { .pyt-pred-cols { grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); } }
.pyt-pred-ta { display: block; width: 100%; min-height: 120px; resize: vertical; padding: 8px 10px; border: 1px solid #1e2a44; border-radius: 8px;
  background: #0b1220; color: #e2e8f0; caret-color: #fff; font: 13px/1.5 var(--font-mono, monospace); color-scheme: dark; }
.pyt-pred-ta:focus-visible { outline: 2px solid #60a5fa; outline-offset: 1px; }
.pyt-pred-ta[readonly] { color: #b6c2d6; background: #0f182c; }
.pyt-pred-note { margin: 4px 0 0; font-size: 12px; line-height: 1.45; color: var(--color-muted); }
.pyt-verdict { margin: 0 0 8px; padding: 6px 10px; border-radius: 8px; font-size: 14px; font-weight: 700; color: var(--color-fg); line-height: 1.4; }
.pyt-verdict.ok { background: color-mix(in srgb, var(--color-ok) 16%, transparent); border: 1px solid var(--color-ok); }
.pyt-verdict.bad { background: color-mix(in srgb, var(--color-danger) 13%, transparent); border: 1px solid var(--color-danger); }
.pyt-verdict.wait { font-weight: 500; font-size: 13px; color: var(--color-muted); border: 1px dashed var(--color-border); }
.pyt-cmpw { max-height: 320px; overflow: auto; border-radius: 8px; border: 1px solid #1e2a44; }
.pyt-cmp { width: 100%; border-collapse: collapse; background: #0b1220; color: #e2e8f0; font: 12.5px/1.45 var(--font-mono, monospace); }
.pyt-cmp th { position: sticky; top: 0; padding: 4px 8px; background: #0f182c; color: #b6c2d6; font: 600 11px/1.3 var(--font-sans, sans-serif); text-align: left; }
.pyt-cmp td { padding: 2px 8px; vertical-align: top; white-space: pre-wrap; overflow-wrap: anywhere; border-top: 1px solid #172036; }
.pyt-cmp td.n { width: 1%; color: #7d8ba6; text-align: right; }
.pyt-cmp tr.diff td.p, .pyt-cmp tr.diff td.a { color: #fecaca; }
.pyt-cmp tr.first td { background: rgba(248, 113, 113, .16); }
.pyt-cmp mark { background: rgba(248, 113, 113, .5); color: #fff; border-radius: 2px; }
.pyt-cmp .none { color: #7d8ba6; font-family: var(--font-sans, sans-serif); font-size: 11.5px; }

.pyt-trace { background: #0b1220; color: #e2e8f0; border: 1px solid #1e2a44; border-radius: 10px; overflow: hidden;
  container-type: inline-size; container-name: pyttr; color-scheme: dark; }
.pyt-tscroll { max-height: 300px; overflow: auto; scrollbar-width: thin; scrollbar-color: #334155 transparent; }
.pyt-tt { width: 100%; border-collapse: collapse; font: 12.5px/1.4 var(--font-sans, sans-serif); }
.pyt-tt th { position: sticky; top: 0; z-index: 2; padding: 5px 8px; background: #0f182c; color: #b6c2d6; font-weight: 600; text-align: left;
  white-space: nowrap; border-bottom: 1px solid #1e2a44; }
.pyt-tt td { padding: 4px 8px; vertical-align: top; border-top: 1px solid #172036; }
.pyt-tt .c-step, .pyt-tt .c-line { width: 1%; white-space: nowrap; }
.pyt-tt td.c-line { text-align: right; font-family: var(--font-mono, monospace); color: #8a99b3; }
.pyt-tt td.c-code { max-width: 0; width: 30%; font: 12.5px/1.4 var(--font-mono, monospace); white-space: pre; overflow: hidden; text-overflow: ellipsis; }
.pyt-tt td.c-chg { width: 38%; }
.pyt-tt td.c-out { font-family: var(--font-mono, monospace); white-space: pre-wrap; overflow-wrap: anywhere; }
.pyt-tt tr.is-cur td { background: rgba(251, 191, 36, .13); }
.pyt-tt tr.is-err td { background: rgba(248, 113, 113, .14); }
.pyt-tt tr.pyt-tnote td { color: #8a99b3; text-align: center; }
.pyt-step { min-width: 34px; padding: 1px 6px; border: 1px solid #2b3a5a; border-radius: 5px; background: #131d33; color: #dbe4f3;
  font: 600 12px/1.4 var(--font-mono, monospace); cursor: pointer; }
.pyt-step:hover { background: #1c2945; }
.pyt-step:focus-visible { outline: 2px solid #60a5fa; outline-offset: 1px; }
.pyt-chg { display: inline-block; margin: 1px 10px 1px 0; font-family: var(--font-mono, monospace); white-space: pre-wrap; overflow-wrap: anywhere; }
.pyt-chg .tag { margin-left: 4px; padding: 0 4px; border: 1px solid #2b3a5a; border-radius: 3px; font: 10px/1.3 var(--font-sans, sans-serif); color: #8a99b3; white-space: nowrap; }
.pyt-chg.res { color: #fde68a; }
.pyt-chg.call { color: #ffcb6b; }
.pyt-chg.err { color: #ff8f8f; }
.pyt-tt .k-in { color: #86efac; }
.pyt-tt .k-err { color: #ff8f8f; }
/* narrow: each step is a small card (step | line | changes), the output goes underneath */
@container pyttr (max-width: 680px) {
  .pyt-tt, .pyt-tt thead, .pyt-tt tbody { display: block; }
  .pyt-tt thead { position: sticky; top: 0; z-index: 2; background: #0f182c; border-bottom: 1px solid #1e2a44; }
  .pyt-tt tr { display: grid; grid-template-columns: 56px 36px minmax(0, 1fr); column-gap: 6px; padding: 4px 8px; }
  .pyt-tt tbody tr { border-top: 1px solid #172036; }
  .pyt-tt th, .pyt-tt td, .pyt-tt td.c-chg, .pyt-tt td.c-code, .pyt-tt .c-step, .pyt-tt .c-line { display: block; width: auto; max-width: none; padding: 0; border: 0; position: static; background: none; }
  .pyt-tt td.c-line { text-align: left; }
  .pyt-tt th { white-space: normal; }
  .pyt-tt td.c-code, .pyt-tt th.c-code, .pyt-tt th.c-out { display: none; }
  .pyt-tt td.c-out { grid-column: 3; padding-top: 2px; }
  .pyt-tt td.c-out:empty, .pyt-tt td.c-chg:empty { display: none; }
  .pyt-tt td.c-out::before { content: "↳ "; color: #8a99b3; }
  .pyt-tt td[colspan] { grid-column: 1 / -1; }
  .pyt-tt tr.is-cur { background: rgba(251, 191, 36, .13); }
  .pyt-tt tr.is-err { background: rgba(248, 113, 113, .14); }
  .pyt-tt tr.is-cur td, .pyt-tt tr.is-err td { background: none; }
}

/* the controls pane is as tall as the stage: keep its rows at the top instead of spreading them out */
.sim-controls.pyt-ctl { align-content: start; }
.pyt-ctl-in { display: grid; gap: 6px; }
.pyt-ctl-in label { font-size: var(--type-sm); color: var(--color-muted); }
.pyt-in-ta { display: block; width: 100%; min-height: 66px; resize: vertical; padding: 6px 8px; border: 1px solid var(--color-border);
  border-radius: var(--radius-1); background: var(--color-surface-2); color: var(--color-fg); font: 14px/1.45 var(--font-mono, monospace); }
.pyt-hint { margin: 0; font-size: 12px; line-height: 1.45; color: var(--color-muted); }
.pyt-chips { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: 12px; color: var(--color-muted); }
.pyt-chips .btn { padding: 4px 9px; font: 600 12px/1.35 var(--font-mono, monospace); }
@supports (-webkit-touch-callout: none) { .pyt-in-ta, .pyt-pred-ta { font-size: 16px; } }
`;

export function mount(rootEl) {
  const lang = getLocale() === 'id' ? 'id' : 'en';
  const T = (en, id) => (lang === 'id' ? id : en);
  const pick = (v) => (v && !Array.isArray(v) && typeof v === 'object' ? v[lang] : v);
  const num = (x) => (lang === 'id' ? String(x).replace('.', ',') : String(x));
  const narrow = typeof window !== 'undefined' && window.matchMedia('(max-width: 600px)').matches;

  const style = document.createElement('style');
  style.textContent = CSS;
  rootEl.appendChild(style);

  // ------------------------------------------------------------------ layout
  const main = document.createElement('div');
  main.className = 'pyt';
  const grid = document.createElement('div');
  grid.className = 'pyt-grid';
  main.appendChild(grid);
  rootEl.appendChild(main);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls pyt-ctl';
  rootEl.appendChild(ctrlPanel);

  // transport bar
  const bar = document.createElement('div');
  bar.className = 'pyt-bar';
  bar.setAttribute('role', 'group');
  bar.setAttribute('aria-label', T('Run controls', 'Kontrol jalannya program'));
  const btns = document.createElement('div');
  btns.className = 'pyt-btns';
  const bBack = button({ label: T('◀ Step back', '◀ Mundur'), onClick: () => stepBack() });
  const bStep = button({ label: T('Step ▶', 'Langkah ▶'), primary: true, onClick: () => stepForward(true) });
  const bRun = button({ label: T('▶ Run', '▶ Jalankan'), onClick: () => togglePlay() });
  const bEnd = button({ label: T('⏭ To end', '⏭ Ke akhir'), onClick: () => runToEnd() });
  const bReset = button({ label: T('⟲ Reset', '⟲ Mulai ulang'), onClick: () => { reset(); announce(T('Program reset to the first line.', 'Program kembali ke baris pertama.')); } });
  bBack.el.setAttribute('aria-label', T('Step back', 'Mundur satu langkah'));
  bStep.el.setAttribute('aria-label', T('Step: run the next line', 'Langkah: jalankan baris berikutnya'));
  bEnd.el.setAttribute('aria-label', T('To end: run the rest of the program', 'Ke akhir: jalankan sisa program'));
  bReset.el.setAttribute('aria-label', T('Reset', 'Mulai ulang'));
  btns.append(bBack.el, bStep.el, bRun.el, bEnd.el, bReset.el);
  const scrub = document.createElement('div');
  scrub.className = 'pyt-scrub';
  const scrubIn = document.createElement('input');
  scrubIn.type = 'range';
  scrubIn.min = '0'; scrubIn.max = '0'; scrubIn.step = '1'; scrubIn.value = '0';
  scrubIn.setAttribute('aria-label', T('Step slider: move through the steps already run', 'Penggeser langkah: telusuri langkah yang sudah berjalan'));
  const count = document.createElement('span');
  count.className = 'pyt-count';
  scrub.append(scrubIn, count);
  const status = document.createElement('p');
  status.className = 'pyt-status';
  const live = document.createElement('div');
  live.className = 'pyt-sr';
  live.setAttribute('aria-live', 'polite');
  bar.append(btns, scrub, status, live);

  const left = document.createElement('div');
  left.className = 'pyt-left';
  const right = document.createElement('div');
  right.className = 'pyt-right';

  // code panel + legend
  const codeWrap = document.createElement('div');
  codeWrap.className = 'pyt-code';
  const cp = codePanel({
    value: '', language: 'python', editable: true, minLines: 8, maxLines: narrow ? 14 : 20, title: 'main.py', locale: lang,
    ariaLabel: T('Python program (editable)', 'Program Python (dapat diedit)'),
    onChange: () => onCodeEdit(),
  });
  const restoreBtn = document.createElement('button');
  restoreBtn.type = 'button';
  restoreBtn.textContent = T('↺ Original code', '↺ Kode awal');
  restoreBtn.title = T('Put back the preset program', 'Kembalikan program contoh');
  restoreBtn.disabled = true;
  restoreBtn.addEventListener('click', () => loadPreset(basePreset.key));
  cp.actions.appendChild(restoreBtn);
  const legend = document.createElement('div');
  legend.className = 'pyt-legend';
  legend.innerHTML = `<span><span class="pyt-sw s-next" aria-hidden="true">▶</span>${esc(T('amber: runs next', 'kuning: dijalankan berikutnya'))}</span>`
    + `<span><span class="pyt-sw s-done" aria-hidden="true">✓</span>${esc(T('green: just ran', 'hijau: baru dijalankan'))}</span>`
    + `<span><span class="pyt-sw s-seen" aria-hidden="true">•</span>${esc(T('grey dot: has run', 'titik abu-abu: sudah pernah dijalankan'))}</span>`
    + `<span><span class="pyt-sw s-err" aria-hidden="true">●</span>${esc(T('red: error', 'merah: galat'))}</span>`;
  codeWrap.append(cp.el, legend);

  // console
  const conWrap = document.createElement('div');
  conWrap.className = 'pyt-con';
  const out = consolePanel({
    minLines: 4, maxLines: 10, title: T('Output (console)', 'Keluaran (konsol)'), locale: lang,
    ariaLabel: T('Program output', 'Keluaran program'),
    placeholder: T('Output appears here while the program runs.', 'Keluaran muncul di sini saat program berjalan.'),
  });
  conWrap.appendChild(out.el);

  // memory panel
  const memWrap = document.createElement('div');
  memWrap.className = 'pyt-memw';
  const mem = document.createElement('section');
  mem.className = 'pyt-mem';
  mem.setAttribute('aria-label', T('Variables in memory', 'Variabel di memori'));
  const lg = [['t-int', 'int'], ['t-float', 'float'], ['t-str', 'str'], ['t-bool', 'bool'], ['t-none', 'None'], ['t-list', 'list']];
  mem.innerHTML = `<div class="pyt-mem-h"><span class="pyt-title">${esc(T('Memory: frames and objects', 'Memori: bingkai dan objek'))}</span>`
    + `<span class="pyt-lgd" aria-hidden="true">${lg.map(([c, n]) => `<span class="${c}">${n}</span>`).join('')}</span></div>`;
  const memBody = document.createElement('div');
  memBody.className = 'pyt-mem-body';
  mem.appendChild(memBody);
  memWrap.appendChild(mem);

  // predict panel
  const pred = document.createElement('section');
  pred.className = 'pyt-pred';
  pred.hidden = true;
  pred.setAttribute('aria-label', T('Predict the output', 'Tebak keluaran'));
  const predH = document.createElement('h2');
  predH.className = 'pyt-pred-h';
  predH.textContent = T('Predict mode: what will the program print?', 'Mode tebak: apa yang akan dicetak program?');
  const predCols = document.createElement('div');
  predCols.className = 'pyt-pred-cols';
  const predLeft = document.createElement('div');
  const predId = `pyt-pred-${Math.random().toString(36).slice(2, 8)}`;
  const predLab = document.createElement('label');
  predLab.htmlFor = predId;
  predLab.className = 'pyt-sr';
  predLab.textContent = T('Your prediction of the output', 'Tebakan keluaran kamu');
  const predTa = document.createElement('textarea');
  predTa.id = predId;
  predTa.className = 'pyt-pred-ta';
  predTa.rows = 5;
  predTa.spellcheck = false;
  predTa.setAttribute('autocomplete', 'off');
  predTa.setAttribute('autocapitalize', 'off');
  predTa.placeholder = T('Type the output you expect, line by line.\nInclude input prompts as they appear on screen,\ne.g. Enter the final score: 80',
    'Ketik keluaran yang kamu tebak, baris demi baris.\nSertakan teks input seperti di layar,\nmisalnya Masukkan nilai akhir: 80');
  const predNote = document.createElement('p');
  predNote.className = 'pyt-pred-note';
  predLeft.append(predLab, predTa, predNote);
  const predRight = document.createElement('div');
  predRight.setAttribute('aria-live', 'polite');
  predCols.append(predLeft, predRight);
  pred.append(predH, predCols);

  // trace table
  const trace = document.createElement('section');
  trace.className = 'pyt-trace';
  trace.setAttribute('aria-label', T('Trace table', 'Tabel penelusuran'));
  const traceH = document.createElement('div');
  traceH.className = 'pyt-trace-h';
  const traceTitle = document.createElement('span');
  traceTitle.className = 'pyt-title';
  traceTitle.textContent = T('Trace table', 'Tabel penelusuran');
  const traceCount = document.createElement('small');
  traceH.append(traceTitle, traceCount);
  const tscroll = document.createElement('div');
  tscroll.className = 'pyt-tscroll';
  tscroll.tabIndex = 0;
  tscroll.setAttribute('role', 'region');
  tscroll.setAttribute('aria-label', T('Trace table, one row per step', 'Tabel penelusuran, satu baris per langkah'));
  const table = document.createElement('table');
  table.className = 'pyt-tt';
  table.innerHTML = `<thead><tr><th class="c-step" scope="col">${esc(T('Step', 'Langkah'))}</th><th class="c-line" scope="col">${esc(T('Line', 'Baris'))}</th>`
    + `<th class="c-code" scope="col">${esc(T('Code', 'Kode'))}</th><th class="c-chg" scope="col">${esc(T('Variables changed / result', 'Perubahan variabel / hasil'))}</th>`
    + `<th class="c-out" scope="col">${esc(T('Output', 'Keluaran'))}</th></tr></thead>`;
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  tscroll.appendChild(table);
  trace.append(traceH, tscroll);

  left.append(codeWrap, conWrap);
  right.append(memWrap);
  grid.append(bar, left, right, pred, trace);

  // ------------------------------------------------------------------ controls
  const progSel = select({
    label: T('Program', 'Program'), key: 'program', value: DEFAULT_PRESET,
    options: PRESETS.map((p, i) => ({ value: p.key, label: `${i + 1}. ${p.name[lang]}` })),
    onChange: (v) => loadPreset(v),
  });
  const selEl = progSel.el.querySelector('select');
  let customOpt = null;

  const inBox = document.createElement('div');
  inBox.className = 'pyt-ctl-in';
  const inId = `pyt-in-${Math.random().toString(36).slice(2, 8)}`;
  const inLab = document.createElement('label');
  inLab.htmlFor = inId;
  inLab.textContent = T('Input values (one per line)', 'Nilai masukan (satu per baris)');
  const inTa = document.createElement('textarea');
  inTa.id = inId;
  inTa.className = 'pyt-in-ta';
  inTa.rows = 3;
  inTa.spellcheck = false;
  inTa.setAttribute('autocomplete', 'off');
  inTa.setAttribute('autocapitalize', 'off');
  const inHint = document.createElement('p');
  inHint.className = 'pyt-hint';
  inHint.id = `${inId}-hint`;
  inHint.textContent = T('Each input() call takes the next line. If the lines run out, the program waits and you type the value in the console.',
    'Setiap input() mengambil baris berikutnya. Jika barisnya habis, program menunggu dan kamu mengetik nilainya di konsol.');
  inTa.setAttribute('aria-describedby', inHint.id);
  const chips = document.createElement('div');
  chips.className = 'pyt-chips';
  inBox.append(inLab, inTa, inHint, chips);

  let speedIdx = 2;
  const speedSl = slider({
    label: T('Run speed', 'Kecepatan jalan'), key: 'speed', min: 0, max: SPEEDS.length - 1, step: 1, value: speedIdx,
    format: (i) => `${num(SPEEDS[i])} ${T('steps/s', 'langkah/detik')}`,
    onInput: (i) => { speedIdx = i; if (playing) schedule(); },
  });

  let predictOn = false;
  const predTg = toggle({
    label: T('Predict mode: write the output before running', 'Mode tebak: tulis keluaran sebelum menjalankan'),
    key: 'predict', value: false,
    onChange: (on) => { predictOn = on; pred.hidden = !on; renderPredict(); },
  });

  const lab = labPanel({
    title: 'Tracing lab',
    filename: 'python-tracer-data.csv',
    columns: [
      { key: 'program', label: 'Program' },
      { key: 'inputs', label: 'Inputs' },
      { key: 'steps', label: 'Steps' },
      { key: 'lines', label: 'Output lines' },
      { key: 'ended', label: 'Ended with' },
      { key: 'prediction', label: 'Prediction' },
    ],
    procedure: [
      'Choose program 5 (pass or fail). Turn on Predict mode and type the output you expect for the input 80.',
      'Press "To end" and read the verdict, then record the run.',
      'Use the test-data buttons for 75 and 74.9 (the boundary case), predict, run and record each.',
      'Choose program 9 (sum 1 to n) and record runs for n = 1, 5 and 10. How do the steps grow with n?',
      'Choose program 16 (guess the output: functions), predict, run and record. Did the call change a?',
    ],
    predict: 'Before running: what does the pass-or-fail program print for 75 and for 74.9? How many steps will "sum 1 to n" need for n = 5?',
    source: () => labRow(),
  });

  ctrlPanel.append(progSel.el, inBox, speedSl.el, predTg.el, lab.el);

  // ------------------------------------------------------------------ state
  let basePreset = PRESETS.find((p) => p.key === DEFAULT_PRESET);
  let presetKey = basePreset.key;     // or 'custom' after an edit
  let customCode = null;
  let customBase = null;              // the preset the custom code was edited from
  let srcLines = [];
  let fnSigs = new Map();
  let headerMemo = new Map();
  let targetMemo = new Map();
  let run = null;
  let compileError = null;
  let history = [];
  let cursor = 0;
  let segs = [];
  let segLen = 0;
  let pending = null;
  let inputsUsed = [];
  let infoCache = [];
  let dirty = false;
  let playing = false;
  let resumeAfterInput = false;
  let resumeToEnd = false;
  let turbo = false;
  let timer = 0;
  let editTimer = 0;
  let inTimer = 0;
  let rowsFrom = 1;
  let rowsTo = 0;
  let consoleKey = '';
  let promptFor = null;
  let raf = 0;
  let destroyed = false;
  let predHTML = '';
  const openRows = new Set();

  const head = () => history[history.length - 1];
  const finished = (e) => !!e && (e.status === 'done' || e.status === 'error');
  const inputList = () => {
    const lines = inTa.value.replace(/\r\n?/g, '\n').split('\n');
    if (lines.length && lines[lines.length - 1] === '') lines.pop();
    return lines;
  };

  // ------------------------------------------------------------------ program text helpers
  function analyseSource(src) {
    srcLines = src.replace(/\r\n?/g, '\n').split('\n');
    fnSigs = new Map();
    for (const ln of srcLines) {
      const m = /^\s*def\s+([A-Za-z_]\w*)\s*\(([^)]*)\)/.exec(ln);
      if (m) fnSigs.set(m[1], `(${m[2].replace(/\s+/g, ' ').trim()})`);
    }
    headerMemo = new Map();
    targetMemo = new Map();
  }

  /** Names a simple assignment on line L stores to (x = ..., a, b = ..., total += ...), or null. */
  function assignTargets(L) {
    if (targetMemo.has(L)) return targetMemo.get(L);
    let res = null;
    try {
      const toks = tokenize(srcLines[L - 1] ?? '').filter((t) => !['indent', 'dedent', 'newline', 'comment'].includes(t.type));
      if (toks.length && (toks[0].type === 'name' || toks[0].type === 'builtin' || toks[0].text === '(')) {
        const segs = [[]];
        const ops = [];
        let depth = 0;
        let bad = false;
        for (const t of toks) {
          if (t.type === 'op' && '([{'.includes(t.text)) depth++;
          else if (t.type === 'op' && ')]}'.includes(t.text)) depth--;
          if (t.type === 'op' && depth === 0 && t.text === ';') { bad = true; break; }   // two statements on one line
          if (t.type === 'op' && depth === 0 && ASSIGN_OPS.has(t.text)) { ops.push(t.text); segs.push([]); } else segs[segs.length - 1].push(t);
        }
        if (!bad && ops.length && (ops.length === 1 || ops.every((o) => o === '='))) {
          const names = [];
          for (const sg of segs.slice(0, -1)) {
            const ok = sg.length && sg.every((t) => t.type === 'name' || t.type === 'builtin' || (t.type === 'op' && '(),[]'.includes(t.text)));
            if (!ok) { names.length = 0; break; }
            for (const t of sg) if (t.type !== 'op' && !names.includes(t.text)) names.push(t.text);
          }
          if (names.length && (ops[0] === '=' || names.length === 1)) res = names;
        }
      }
    } catch (e) { res = null; }
    targetMemo.set(L, res);
    return res;
  }

  /** Header info for line L: { kw, expr, safe, oneLiner, body: [a, b] } or null. */
  function headerAt(L) {
    if (headerMemo.has(L)) return headerMemo.get(L);
    let info = null;
    const text = srcLines[L - 1] ?? '';
    try {
      const toks = tokenize(text).filter((t) => t.type !== 'indent' && t.type !== 'dedent' && t.type !== 'newline' && t.type !== 'comment');
      if (toks.length && toks[0].type === 'keyword' && HEADER_KW.has(toks[0].text)) {
        let depth = 0;
        let colon = -1;
        for (let i = 1; i < toks.length; i++) {
          const t = toks[i];
          if (t.type !== 'op') continue;
          if ('([{'.includes(t.text)) depth++;
          else if (')]}'.includes(t.text)) depth--;
          else if (t.text === ':' && depth === 0) { colon = i; break; }
        }
        if (colon > 0) {
          const inner = toks.slice(1, colon);
          const expr = inner.length ? text.slice(inner[0].col, toks[colon].col).trim() : '';
          let safe = inner.length > 0;
          for (let i = 0; i < inner.length && safe; i++) {
            const t = inner[i];
            if (t.type === 'keyword' && (t.text === 'lambda' || t.text === 'await' || t.text === 'yield')) safe = false;
            else if (t.type === 'op' && t.text === ':=') safe = false;
            else if (t.type === 'fstring' && t.text.includes('(')) safe = false;
            else if (t.type === 'op' && t.text === '(' && i > 0) {
              const p = inner[i - 1];
              if (p.type === 'name' || p.type === 'builtin') {
                if (!SAFE_CALLS.has(p.text) || (i > 1 && inner[i - 2].text === '.')) safe = false;
              } else if (p.type === 'op' && (p.text === ')' || p.text === ']')) safe = false;
            }
          }
          const ind = (s) => /^[ \t]*/.exec(s)[0].length;
          const hi = ind(text);
          let end = L;
          for (let i = L; i < srcLines.length; i++) {
            const s = srcLines[i];
            if (!s.trim() || /^\s*#/.test(s)) continue;
            if (ind(s) <= hi) break;
            end = i + 1;
          }
          let targets = null;
          if (toks[0].text === 'for') {
            const k = inner.findIndex((t) => t.type === 'keyword' && t.text === 'in');
            if (k > 0) targets = inner.slice(0, k).filter((t) => t.type === 'name' || t.type === 'builtin').map((t) => t.text);
          }
          info = { kw: toks[0].text, expr, safe, oneLiner: colon < toks.length - 1, body: [L + 1, end], names: inner.filter((t) => t.type === 'name').map((t) => t.text), targets };
        }
      }
    } catch (e) { info = null; }
    headerMemo.set(L, info);
    return info;
  }

  /** Value of a header's expression in the state before it ran (only side-effect-free expressions). */
  function evalHeader(info, frames) {
    if (!info.safe || !info.expr) return null;
    const scope = new Map();
    for (const l of frames[0].locals) scope.set(l.name, l.value);
    if (frames.length > 1) for (const l of frames[frames.length - 1].locals) scope.set(l.name, l.value);
    const vars = {};
    for (const n of info.names) {
      const v = scope.get(n);
      if (!v) continue;
      if (!evalSafe(v, 0)) return null;
      vars[n] = v;
    }
    try {
      // the same budget as the traced run, so a very long loop inside the expression cannot hold up the page
      const r = reduceExpression(info.expr, vars, { maxSteps: MAX_STEPS });
      if (!r.ok || !r.steps.length) return null;
      const s = r.steps;
      const last = s[s.length - 1];
      let shown = info.expr;
      if (s.length >= 3 && s[1].length <= 36) shown = s[1];
      else if (s.length >= 3 && s[s.length - 2].length <= 36) shown = s[s.length - 2];
      return { shown, value: last };
    } catch (e) { return null; }
  }

  /** Did the header that ran just before entry k enter its block? true / false / null (not known yet). */
  function headerOutcome(k, info) {
    const h = history[k - 1];
    const d = h.depth;
    for (let j = k; j < history.length && j < k + 4000; j++) {
      const e = history[j];
      if (e.status === 'error') return null;
      if (e.line == null || e.depth < d) return false;
      if (e.depth > d) continue;
      return e.line >= info.body[0] && e.line <= info.body[1];
    }
    return null;
  }

  const frameKey = (f, i) => (i === 0 ? 'g' : `f${f.id}`);
  const shortVal = (v) => {
    if (!v) return '';
    if (v.type === 'function') return `function ${v.name || ''}${fnSigs.get(v.name) || ''}`.trim();
    if (v.type === 'module') return `module ${String(v.repr).replace(/^<module '([^']*)'.*$/, '$1')}`;
    return cut(String(v.repr), 44);
  };

  function diffFrames(a, b, execIdx) {
    const prev = new Map();
    a.forEach((f, i) => prev.set(frameKey(f, i), new Map(f.locals.map((l) => [l.name, l.value]))));
    const res = [];
    b.forEach((f, i) => {
      const pm = prev.get(frameKey(f, i));
      if (!pm) return;
      for (const l of f.locals) {
        const pv = pm.get(l.name);
        if (!pv || !sameView(pv, l.value)) res.push({ name: l.name, value: l.value, frame: i === 0 ? null : f.name, own: i === execIdx });
      }
    });
    res.sort((x, y) => Number(y.own) - Number(x.own));
    return res;
  }

  function segRange(a, b) {
    const res = [];
    let n = 0;
    for (const s of segs) {
      const s0 = n;
      const s1 = n + s.text.length;
      n = s1;
      if (s1 <= a) continue;
      if (s0 >= b) break;
      if (Math.min(s1, b) <= Math.max(s0, a)) continue;
      res.push({ kind: s.kind, text: s.text.slice(Math.max(0, a - s0), Math.min(s.text.length, b - s0)) });
    }
    return res;
  }

  /** What happened in step k (the statement at history[k-1].line). */
  function stepInfo(k) {
    if (infoCache[k]) return infoCache[k];
    const e = history[k];
    const p = history[k - 1];
    const L = p.line;
    const info = {
      line: L, changes: diffFrames(p.frames, e.frames, p.depth - 1), out: segRange(p.outLen, e.outLen),
      calls: e.calls, rets: e.rets.filter((r) => !r.unwind), error: e.status === 'error' ? e.error : null,
      hdr: null, cond: null, outcome: null,
    };
    let complete = true;
    const hdr = L ? headerAt(L) : null;
    if (hdr && !hdr.oneLiner) {
      info.hdr = hdr;
      // (not when the header itself raised: then the program never got a value for the condition)
      if (!info.error && (hdr.kw === 'if' || hdr.kw === 'elif' || hdr.kw === 'while' || hdr.kw === 'match')) info.cond = evalHeader(hdr, p.frames);
      if (hdr.kw !== 'match') {
        info.outcome = headerOutcome(k, hdr);
        if (info.outcome == null && !info.error) complete = false;
      }
    }
    // An assignment is a change even when the value stays the same (total = total + 0, a second "x = 5", the loop
    // variable taking an equal value): list its targets like a hand-written trace table would.
    const xi = p.depth - 1;
    let tg = null;
    if (L && !info.error && !e.calls.length) tg = hdr ? (hdr.kw === 'for' && info.outcome === true ? hdr.targets : null) : assignTargets(L);
    const fp = p.frames[xi];
    const fe = e.frames[xi];
    if (tg && fp && fe && frameKey(fp, xi) === frameKey(fe, xi)) {
      for (const n of tg) {
        if (info.changes.some((c) => c.own && c.name === n)) continue;
        const l = fe.locals.find((x) => x.name === n);
        if (l) info.changes.push({ name: n, value: l.value, frame: xi === 0 ? null : fe.name, own: true });
      }
      info.changes.sort((x, y) => Number(y.own) - Number(x.own));
    }
    if (complete) infoCache[k] = info;
    return info;
  }

  /** Short pieces describing a step: [{ text, cls, tag }]. */
  function stepParts(info) {
    const parts = [];
    const { hdr, cond, outcome } = info;
    if (hdr) {
      const tf = outcome == null ? null : (outcome ? 'True' : 'False');
      if (hdr.kw === 'if' || hdr.kw === 'elif' || hdr.kw === 'while') {
        const val = tf ?? cond?.value;
        const shown = cut(cond ? cond.shown : hdr.expr, 40);
        if (val != null) parts.push({ text: shown === val ? val : `${shown} → ${val}`, cls: 'res' });
        if (hdr.kw === 'while' && outcome === false) parts.push({ text: T('loop ends', 'perulangan selesai'), cls: 'res' });
      } else if (hdr.kw === 'for') {
        if (outcome === false) parts.push({ text: T('loop ends', 'perulangan selesai'), cls: 'res' });
      } else if (hdr.kw === 'case') {
        if (outcome != null) parts.push({ text: outcome ? T('match ✓', 'cocok ✓') : T('no match', 'tidak cocok'), cls: 'res' });
      } else if (hdr.kw === 'match') {
        if (cond) parts.push({ text: `${cut(hdr.expr, 24)} → ${cut(cond.value, 30)}`, cls: 'res' });
      } else if (hdr.kw === 'except') {
        if (outcome != null) parts.push({ text: outcome ? T('caught', 'tertangkap') : T('not this one', 'bukan yang ini'), cls: 'res' });
      }
    }
    for (const c of info.calls) {
      const args = c.args.map((a) => `${a.name}=${cut(shortVal(a.value), 24)}`).join(', ');
      parts.push({ text: `${T('call', 'panggil')} ${c.name}(${args})`, cls: 'call', isCall: true });
    }
    for (const r of info.rets) parts.push({ text: `${r.name} ${T('returns', 'mengembalikan')} ${shortVal(r.value)}`, cls: 'call' });
    for (const ch of info.changes) {
      parts.push({ text: `${ch.name} = ${shortVal(ch.value)}`, cls: '', tag: ch.own ? null : (ch.frame || T('global', 'global')) });
    }
    if (info.error) {
      parts.push({ text: isLimit(info.error) ? limitNote(info.error)
        : `${info.error.type}: ${cut(info.error.message, 70)}`, cls: 'err' });
    }
    return parts;
  }

  // ------------------------------------------------------------------ running
  function addSeg(kind, text) {
    if (!text) return;
    const last = segs[segs.length - 1];
    if (last && last.kind === kind) last.text += text;
    else segs.push({ kind, text });
    segLen += text.length;
  }
  const consoleText = () => segs.map((s) => s.text).join('');

  // minipy's 'StepLimit' is the simulator stopping a long run, not a Python exception: say so instead of a traceback
  const isLimit = (er) => !!er && er.simulatorLimit === true;
  const limitNote = (er) => (er.limitKind === 'iterations'
    ? T('stopped: too many loop rounds in one step', 'dihentikan: terlalu banyak putaran dalam satu langkah')
    : T(`stopped: limit of ${er.limit ?? MAX_STEPS} steps`, `dihentikan: batas ${er.limit ?? MAX_STEPS} langkah`));
  function errorText(er) {
    if (!isLimit(er)) return String(er.traceback).replace(/\n*$/, '\n');
    const why = er.limitKind === 'iterations'
      ? T('one step ran too many loop rounds', 'satu langkah menjalankan terlalu banyak putaran')
      : T(`the program reached the limit of ${er.limit ?? MAX_STEPS} traced steps`, `program mencapai batas ${er.limit ?? MAX_STEPS} langkah penelusuran`);
    return `⏹ ${T('Stopped by the simulator', 'Dihentikan oleh simulasi')}: ${why}.\n`
      + T('It may be stuck in an endless loop, or it is too long to trace here. This is not a Python error: real Python has no step limit (an endless loop keeps running until you press Ctrl+C).\n',
        'Mungkin program terjebak dalam perulangan tak berujung, atau terlalu panjang untuk ditelusuri di sini. Ini bukan galat Python: Python sungguhan tidak punya batas langkah (perulangan tak berujung terus berjalan sampai kamu menekan Ctrl+C).\n');
  }

  function pushEntry(line, error, p) {
    const snap = run.snapshot();
    const prev = head();
    history.push({
      line, status: snap.status, error: error || snap.error || null, frames: snap.frames, depth: snap.frames.length,
      outLen: segLen, calls: p.calls, rets: p.rets, execLine: prev ? prev.line : null,
    });
  }

  /** Run the statement at the head until the next step. Returns 'step' | 'wait' | 'end' | 'none'. */
  function advance() {
    if (!run || !history.length) return 'none';
    if (finished(head())) return 'end';
    if (run.status === 'waiting-input') return 'wait';
    const p = pending || (pending = { calls: [], rets: [] });
    for (let guard = 0; guard < 200000; guard++) {
      const ev = run.step();
      if (ev.kind === 'output') addSeg(ev.echo ? 'in' : ev.stderr ? 'err' : 'out', ev.text);
      else if (ev.kind === 'call') p.calls.push({ name: ev.name, args: ev.args || [] });
      else if (ev.kind === 'return') p.rets.push({ name: ev.name, value: ev.value, unwind: !!ev.unwind });
      else if (ev.kind === 'input') {
        if (ev.wait || run.status === 'waiting-input') return 'wait';
        if ('value' in ev && ev.value != null) inputsUsed.push(String(ev.value));
      } else if (ev.kind === 'line') { pushEntry(ev.line, null, p); break; }
      else if (ev.kind === 'exception') {
        // a traceback follows the output straight away, as in python3 (`print("x", end="")` then an error shows
        // "xTraceback ..."); the simulator's own step-limit note starts on a line of its own
        const txt = consoleText();
        if (isLimit(ev.error) && txt && !txt.endsWith('\n')) addSeg('out', '\n');
        addSeg('err', errorText(ev.error));
        pushEntry(null, ev.error, p);
        break;
      } else if (ev.kind === 'done') { pushEntry(null, null, p); break; }
      else break;
    }
    pending = null;
    return 'step';
  }

  /** Compile the code in the panel and stop before its first line (step 0). */
  function reset() {
    stopPlay();
    clearTimeout(editTimer);
    clearTimeout(inTimer);
    out.cancelPrompt();
    promptFor = null;
    history = []; cursor = 0; segs = []; segLen = 0; pending = null; inputsUsed = []; infoCache = [];
    compileError = null; run = null; dirty = false; consoleKey = '';
    clearRows();
    const src = cp.value;
    analyseSource(src);
    const c = compile(src, { filename: 'main.py' });
    if (!c.ok) {
      compileError = c.error;
    } else {
      run = createRun(c.program, { inputs: inputList(), echoInput: true, maxSteps: MAX_STEPS });
      const ev = run.step();
      if (ev.kind === 'line') pushEntry(ev.line, null, { calls: [], rets: [] });
      else if (ev.kind === 'exception') { addSeg('err', errorText(ev.error)); pushEntry(null, ev.error, { calls: [], rets: [] }); }
      else pushEntry(null, null, { calls: [], rets: [] });
    }
    render();
  }

  function ensureLoaded() {
    if (dirty || (!run && !compileError) || !history.length && !compileError) reset();
    return !compileError && history.length > 0;
  }

  function stepForward(manual) {
    if (manual && playing) stopPlay();
    if (!ensureLoaded()) { render(); return false; }
    if (cursor < history.length - 1) {
      cursor++;
    } else {
      const r = advance();
      if (r === 'wait') { render(); focusPrompt(manual); return false; }
      if (r !== 'step') { render(); return false; }
      cursor = history.length - 1;
    }
    render();
    if (manual) announceStep();
    return true;
  }

  function stepBack() {
    stopPlay();
    if (cursor > 0) { cursor--; render(); announceStep(); }
  }

  /** Run to the end in slices of ~30 ms so the page stays responsive on long runs (Pause stops it). */
  function runToEnd() {
    stopPlay();
    if (!ensureLoaded()) { render(); return; }
    if (finished(head())) { cursor = history.length - 1; render(); return; }
    playing = true;
    turbo = true;
    turboSlice();
  }
  function turboSlice() {
    timer = 0;
    if (!playing || !turbo || destroyed) return;
    const t0 = performance.now();
    let r = 'step';
    while (r === 'step' && !finished(head()) && performance.now() - t0 < 30) r = advance();
    cursor = history.length - 1;
    if (r === 'wait') {
      stopPlay();
      resumeToEnd = true;
      render();
      focusPrompt(true);
      return;
    }
    if (r !== 'step' || finished(head())) {
      stopPlay();
      render();
      announce(statusText().replace(/<[^>]+>/g, ''));
      return;
    }
    // long run: only the counter is updated between slices; everything else is drawn once at the end
    renderBar(T(`Running… ${history.length - 1} steps so far (press Pause to stop here).`, `Sedang berjalan… sudah ${history.length - 1} langkah (tekan Jeda untuk berhenti di sini).`));
    timer = setTimeout(turboSlice, 0);
  }

  function togglePlay() {
    if (playing) { stopPlay(); cursor = history.length ? Math.min(cursor, history.length - 1) : 0; render(); return; }
    if (!ensureLoaded()) { render(); return; }
    if (cursor === history.length - 1 && finished(head())) return;
    playing = true;
    render();
    schedule(true);
  }
  function stopPlay() {
    playing = false;
    turbo = false;
    resumeAfterInput = false;
    resumeToEnd = false;
    clearTimeout(timer);
    timer = 0;
  }
  function schedule(now) {
    clearTimeout(timer);
    timer = setTimeout(tick, now ? 60 : Math.round(1000 / SPEEDS[speedIdx]));
  }
  function tick() {
    timer = 0;
    if (!playing || destroyed) return;
    if (cursor < history.length - 1) { cursor++; render(); }
    else {
      const r = advance();
      if (r === 'wait') { playing = false; resumeAfterInput = true; render(); focusPrompt(true); return; }
      if (r !== 'step') { stopPlay(); render(); return; }
      cursor = history.length - 1;
      render();
    }
    if (cursor === history.length - 1 && finished(head())) { stopPlay(); render(); announce(statusText().replace(/<[^>]+>/g, '')); return; }
    schedule();
  }

  // input() typed in the console when the input box has run out
  function maybePrompt() {
    const atHead = cursor === history.length - 1;
    if (!run || !atHead || run.status !== 'waiting-input') { if (out.waiting) out.cancelPrompt(); promptFor = null; return; }
    if (out.waiting && promptFor === run) return;
    const myRun = run;
    promptFor = run;
    out.prompt({ echo: false, focus: false, placeholder: T('type + Enter', 'ketik + Enter'),
      ariaLabel: T('The program is waiting for input: type a value and press Enter', 'Program menunggu masukan: ketik nilai lalu tekan Enter') })
      .then((v) => {
        if (promptFor === myRun) promptFor = null;
        if (v == null || destroyed || run !== myRun || myRun.status !== 'waiting-input') return;
        const v1 = String(v).replace(/\r?\n[\s\S]*$/, '');
        inputsUsed.push(v1);
        inTa.value = inTa.value && !inTa.value.endsWith('\n') ? `${inTa.value}\n${v1}` : `${inTa.value}${v1}`;
        myRun.provideInput(v1);
        const r = advance();
        if (r === 'step') cursor = history.length - 1;
        render();
        if (r === 'wait') { focusPrompt(true); return; }
        if (resumeToEnd && !finished(head())) { runToEnd(); return; }
        resumeToEnd = false;
        announceStep();
        if (resumeAfterInput && !finished(head())) { resumeAfterInput = false; playing = true; render(); schedule(); }
      });
  }
  function focusPrompt(scroll) {
    requestAnimationFrame(() => {
      const f = out.el.querySelector('.cp-con-in');
      if (!f) return;
      if (scroll) {
        const r = out.el.getBoundingClientRect();
        if (r.bottom > window.innerHeight || r.top < 0) out.el.scrollIntoView({ block: 'nearest' });
      }
      f.focus({ preventScroll: true });
    });
    announce(T('The program is waiting for input. Type a value in the console and press Enter.', 'Program menunggu masukan. Ketik nilai di konsol lalu tekan Enter.'));
  }

  // ------------------------------------------------------------------ editing
  function ensureCustomOption() {
    if (!customOpt) {
      customOpt = document.createElement('option');
      customOpt.value = 'custom';
      selEl.appendChild(customOpt);
    }
    customOpt.textContent = T(`✎ My code (from ${customBase.name.en})`, `✎ Kode saya (dari ${customBase.name.id})`);
  }
  function onCodeEdit() {
    customCode = cp.value;
    if (presetKey !== 'custom') {
      presetKey = 'custom';
      customBase = basePreset;
      ensureCustomOption();
    }
    selEl.value = 'custom';
    restoreBtn.disabled = false;
    invalidate(T('Code changed. Press Step or Run to trace the new program.', 'Kode berubah. Tekan Langkah atau Jalankan untuk menelusuri program baru.'));
    clearTimeout(editTimer);
    // load the edited program quietly once typing pauses (only when it compiles; errors show on Step / Run)
    editTimer = setTimeout(() => { if (dirty && compile(cp.value).ok) reset(); }, 700);
  }
  function onInputsEdit() {
    clearTimeout(inTimer);
    inTimer = setTimeout(() => { if (!playing) reset(); }, 350);
    invalidate(T('Input values changed. The program will restart with them.', 'Nilai masukan berubah. Program akan dimulai ulang dengannya.'));
  }
  /** The trace no longer matches the code / inputs: clear it until the program is loaded again. */
  function invalidate(msg) {
    stopPlay();
    out.cancelPrompt();
    promptFor = null;
    dirty = true;
    run = null; history = []; cursor = 0; segs = []; segLen = 0; pending = null; inputsUsed = []; infoCache = [];
    compileError = null; consoleKey = '';
    clearRows();
    render(msg);
  }

  function renderChips() {
    chips.textContent = '';
    const tests = pick(basePreset.tests) || [];
    if (!tests.length) { chips.hidden = true; return; }
    chips.hidden = false;
    const lab = document.createElement('span');
    lab.textContent = T('Test data:', 'Data uji:');
    chips.appendChild(lab);
    for (const t of tests) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn';
      b.textContent = t.join(', ');
      b.setAttribute('aria-label', `${T('Use test data', 'Pakai data uji')} ${t.join(', ')}`);
      b.addEventListener('click', () => { inTa.value = t.join('\n'); reset(); announce(`${T('Inputs set to', 'Masukan diatur ke')} ${t.join(', ')}.`); });
      chips.appendChild(b);
    }
  }

  function loadPreset(key) {
    if (key === 'custom') {
      if (customCode != null && customBase) {
        // the edited program goes back with the preset it was made from (name in the lab, test-data buttons)
        presetKey = 'custom';
        if (basePreset !== customBase) { basePreset = customBase; renderChips(); }
        cp.value = customCode;
        restoreBtn.disabled = false;
        reset();
      } else selEl.value = presetKey;
      return;
    }
    const p = PRESETS.find((x) => x.key === key) || PRESETS[0];
    basePreset = p;
    presetKey = p.key;
    selEl.value = p.key;
    cp.value = p.code[lang];
    inTa.value = (pick(p.inputs) || []).join('\n');
    restoreBtn.disabled = true;
    predTa.value = '';
    renderChips();
    reset();
  }

  // ------------------------------------------------------------------ rendering
  function statusText() {
    if (dirty && !history.length && !compileError) return esc(T('Press Step or Run to trace the program.', 'Tekan Langkah atau Jalankan untuk menelusuri program.'));
    if (compileError) {
      return `<b>${esc(compileError.type)} ${esc(T('on line', 'di baris'))} ${compileError.line}:</b> ${esc(compileError.message)} — `
        + esc(T('Python checks the whole program before running, so no line has run yet.', 'Python memeriksa seluruh program sebelum berjalan, jadi belum ada baris yang dijalankan.'));
    }
    const e = history[cursor];
    if (!e) return '';
    const atHead = cursor === history.length - 1;
    if (atHead && run && run.status === 'waiting-input') {
      return `<b>${esc(T('Waiting for input:', 'Menunggu masukan:'))}</b> ${esc(T('the input box has no more values. Type one in the console and press Enter.', 'kotak masukan sudah habis. Ketik nilainya di konsol lalu tekan Enter.'))}`;
    }
    if (e.status === 'error') {
      const er = e.error || {};
      if (isLimit(er)) {
        return `<b>${esc(T(`Stopped after ${cursor} steps`, `Dihentikan setelah ${cursor} langkah`))}</b> — ${esc(T(
          "the simulator's step limit, not a Python error. Is there a loop whose condition never becomes False?",
          'batas langkah simulasi, bukan galat Python. Adakah perulangan yang kondisinya tidak pernah menjadi False?'))}`;
      }
      return `<b>${esc(T('Stopped by an error', 'Berhenti karena galat'))} ${esc(T('on line', 'di baris'))} ${er.line}: ${esc(er.type)}</b> — ${esc(cut(er.message || '', 120))}`;
    }
    if (e.status === 'done') {
      return `<b>${esc(T('Finished', 'Selesai'))}</b> ${esc(T(`after ${cursor} steps.`, `setelah ${cursor} langkah.`))}`
        + (cursor > 0 && atHead ? ` ${esc(T('Use Step back or the slider to look at any step again.', 'Gunakan Mundur atau penggeser untuk melihat langkah mana pun lagi.'))}` : '');
    }
    const nextTxt = `<b>${esc(T('Line', 'Baris'))} ${e.line}</b> ${esc(T('runs next', 'dijalankan berikutnya'))}`;
    if (cursor === 0) return `${esc(T('Ready.', 'Siap.'))} ${nextTxt}. ${esc(T('Nothing has run yet.', 'Belum ada yang dijalankan.'))}`;
    const parts = stepParts(stepInfo(cursor));
    const just = parts.length ? ` ${esc(T('Just ran line', 'Baris'))} ${history[cursor - 1].line}${esc(T(':', ' baru saja dijalankan:'))} ${esc(cut(parts.map((p) => p.text).join('; '), 90))}.` : '';
    return `${nextTxt}.${just}`;
  }

  function render(msg) {
    if (destroyed) return;
    renderCode();
    renderMemory();
    renderConsole();
    renderTrace();
    renderBar(msg);
    renderPredict();
  }

  function renderBar(msg) {
    const n = history.length ? history.length - 1 : 0;
    const e = history[cursor];
    const atHead = cursor === history.length - 1;
    const done = atHead && finished(e);
    bBack.el.disabled = cursor === 0 || !history.length;
    bStep.el.disabled = !dirty && !compileError && (done || !history.length);
    bEnd.el.disabled = bStep.el.disabled;
    bRun.el.disabled = bStep.el.disabled && !playing;
    bRun.el.textContent = playing ? T('⏸ Pause', '⏸ Jeda') : T('▶ Run', '▶ Jalankan');
    bRun.el.setAttribute('aria-label', playing ? T('Pause', 'Jeda') : T('Run step by step at the chosen speed', 'Jalankan langkah demi langkah dengan kecepatan terpilih'));
    scrubIn.max = String(n);
    scrubIn.value = String(cursor);
    scrubIn.disabled = n === 0;
    scrubIn.setAttribute('aria-valuetext', `${T('Step', 'Langkah')} ${cursor} ${T('of', 'dari')} ${n}`);
    count.textContent = `${T('Step', 'Langkah')} ${cursor} / ${n}`;
    const html = msg ? esc(msg) : statusText();
    status.innerHTML = html;
    status.classList.toggle('is-err', !!compileError || (!!e && e.status === 'error'));
    status.classList.toggle('is-ok', !!e && e.status === 'done');
  }

  function renderCode() {
    if (compileError) {
      const er = compileError;
      const m = { line: er.line, kind: 'error', note: er.type };
      if (Number.isFinite(er.col) && er.col > 0) {
        m.col = er.col - 1;
        if (Number.isFinite(er.endCol) && (er.endLine == null || er.endLine === er.line) && er.endCol > er.col) m.endCol = er.endCol - 1;
      }
      cp.setActiveLine(null);
      cp.setMarks([m]);
      return;
    }
    if (!history.length) { cp.setActiveLine(null); cp.setMarks([]); return; }
    const e = history[cursor];
    const marks = [];
    const seen = new Set();
    for (let k = 1; k <= cursor; k++) { const l = history[k].execLine; if (l) seen.add(l); }
    for (const l of seen) marks.push({ line: l, kind: 'visited' });
    if (cursor > 0 && e.status !== 'error') {
      const L = history[cursor - 1].line;
      const parts = stepParts(stepInfo(cursor));
      // (a call is shown by its new frame; a return keeps its note, e.g. "change returns 11; b = 11")
      const note = parts.filter((p) => !p.isCall || parts.length === 1).slice(0, 2).map((p) => p.text).join('; ');
      if (L) marks.push({ line: L, kind: 'done', note: note ? cut(note, 52) : null });
    }
    if (e.status === 'error' && e.error && e.error.line) marks.push({ line: e.error.line, kind: 'error', note: isLimit(e.error) ? T('step limit', 'batas langkah') : e.error.type });
    cp.setMarks(marks);
    cp.setActiveLine(e.line ?? null);
  }

  function renderConsole() {
    let key;
    let parts;
    if (compileError) {
      key = `c|${compileError.traceback}`;
      parts = [{ kind: 'err', text: `${compileError.traceback}\n` }];
    } else {
      const e = history[cursor];
      const atHead = cursor === history.length - 1;
      const len = !e ? 0 : (atHead ? segLen : e.outLen);
      key = `r|${len}|${segs.length}`;
      parts = len ? segRange(0, len) : [];
    }
    if (key !== consoleKey) {
      consoleKey = key;
      promptFor = null;
      out.set(parts);
    }
    maybePrompt();
  }

  // ---- memory boxes
  function collectHeap(frames, into) {
    const visit = (v) => {
      if (!isHeap(v) || into.has(v.id)) return;
      into.set(v.id, v);
      for (const it of v.items || []) visit(it);
      for (const [k, x] of v.entries || []) { visit(k); visit(x); }
    };
    for (const f of frames) for (const l of f.locals) visit(l.value);
    return into;
  }

  function primBox(v, chg) {
    const r = String(v.repr);
    return `<span class="pyt-box ${tcls(v)}${chg ? ' is-chg' : ''}" title="${esc(cut(r, 400))}">${esc(cut(r, 48))}</span>`
      + `<span class="pyt-ty ${tcls(v)}">${esc(v.type === 'function' ? 'function' : v.typeName || v.type)}</span>`;
  }

  function valueHTML(v, chg, refNames) {
    if (isHeap(v)) {
      const others = refNames.length > 1 ? ` ${T('(shared with', '(dipakai bersama')} ${refNames.length - 1} ${T('other name', 'nama lain')}${lang === 'en' && refNames.length > 2 ? 's' : ''})` : '';
      return `<span class="pyt-box pyt-ref ${tcls(v)}${chg ? ' is-chg' : ''}" title="${esc(v.typeName || v.type)}"><span class="pyt-dot" data-to="${v.id}"></span></span>`
        + `<span class="pyt-sr">${esc(v.typeName || v.type)}, ${esc(T('arrow to', 'panah ke'))} ${esc(cut(String(v.repr), 200))}${esc(others)}</span>`;
    }
    if (v.type === 'function') {
      const sig = fnSigs.get(v.name) || '(…)';
      return `<span class="pyt-box t-fn${chg ? ' is-chg' : ''}" title="def ${esc(v.name || '')}${esc(sig)}">${esc(cut(sig, 34))}</span><span class="pyt-ty t-fn">function</span>`;
    }
    return primBox(v, chg);
  }

  function itemHTML(it, chg) {
    if (isHeap(it)) return `<span class="pyt-dot${chg ? ' is-chg' : ''}" data-to="${it.id}" title="${esc(cut(String(it.repr), 200))}"></span>`;
    const r = String(it.repr);
    return `<span class="pyt-cv ${tcls(it)}${chg ? ' is-chg' : ''}" title="${esc(cut(r, 300))}">${esc(cut(r, 26))}</span>`;
  }

  function objHTML(v, prevV, refs) {
    const isNew = !!history[cursor - 1] && !prevV;
    let h = `<div class="pyt-obj ${tcls(v)}${isNew ? ' is-chg' : ''}" data-id="${v.id}">`;
    const names = refs.get(v.id) || [];
    h += `<div class="pyt-obj-h"><span>${esc(v.typeName || v.type)}</span>`
      + `${names.length ? `<span class="pyt-refs">← ${esc(names.join(', '))}</span>` : ''}`
      + `${v.truncated ? `<span class="pyt-refs">${esc(T(`${v.truncated} items`, `${v.truncated} elemen`))}</span>` : ''}</div>`;
    if (v.entries) {
      if (!v.entries.length) h += `<div class="pyt-emptyobj">${esc(T('empty', 'kosong'))}</div>`;
      else {
        const pmap = new Map((prevV?.entries || []).map(([k, x]) => [k.repr, x]));
        h += '<div class="pyt-kvs">';
        for (const [k, x] of v.entries) {
          const px = pmap.get(k.repr);
          const chg = !isNew && !!prevV && boxChanged(px, x);
          h += `<div class="pyt-k">${itemHTML(k, false)}</div><div class="pyt-v">${itemHTML(x, chg)}</div>`;
        }
        h += '</div>';
      }
    } else {
      const items = v.items || [];
      if (!items.length) h += `<div class="pyt-emptyobj">${esc(T('empty', 'kosong'))}</div>`;
      else {
        const showIdx = v.type !== 'set';
        h += '<div class="pyt-cells">';
        items.forEach((it, i) => {
          const pit = prevV?.items?.[i];
          const chg = !isNew && !!prevV && v.type !== 'set' && boxChanged(pit, it);
          h += `<div class="pyt-cell">${itemHTML(it, chg)}${showIdx ? `<span class="pyt-ci">${i}</span>` : ''}</div>`;
        });
        if (v.truncated && v.truncated > items.length) h += `<div class="pyt-cell pyt-more">+${v.truncated - items.length}</div>`;
        h += '</div>';
      }
    }
    return h + '</div>';
  }

  function renderMemory() {
    const e = history[cursor];
    if (!e) {
      memBody.classList.remove('has-heap');
      memBody.innerHTML = `<div class="pyt-frames"><p class="pyt-empty">${esc(compileError
        ? T('The program did not start: fix the SyntaxError first.', 'Program tidak dimulai: perbaiki dulu SyntaxError-nya.')
        : T('Press Step or Run to start tracing.', 'Tekan Langkah atau Jalankan untuk mulai menelusuri.'))}</p></div>`;
      return;
    }
    const prev = cursor > 0 ? history[cursor - 1] : null;
    const frames = e.frames;
    const heap = [...collectHeap(frames, new Map()).values()];
    const prevHeap = prev ? collectHeap(prev.frames, new Map()) : new Map();
    const prevVars = new Map();
    if (prev) prev.frames.forEach((f, i) => f.locals.forEach((l) => prevVars.set(`${frameKey(f, i)}\u0000${l.name}`, l.value)));
    const refs = new Map();
    frames.forEach((f, i) => f.locals.forEach((l) => {
      if (!isHeap(l.value)) return;
      if (!refs.has(l.value.id)) refs.set(l.value.id, []);
      refs.get(l.value.id).push(i === 0 ? l.name : `${l.name} (${f.name})`);
    }));
    let h = '<div class="pyt-frames">';
    // deep recursion: show the global frame and the newest calls only
    const hidden = frames.length > 14 ? frames.length - 13 : 0;
    frames.forEach((f, i) => {
      if (hidden && i > 0 && i <= hidden) {
        if (i === 1) h += `<p class="pyt-empty">⋮ ${esc(T(`${hidden} more function frames (calls still waiting to return)`, `${hidden} bingkai fungsi lain (pemanggilan yang masih menunggu kembali)`))}</p>`;
        return;
      }
      const cur = i === frames.length - 1 && !finished(e);
      h += `<div class="pyt-frame${cur ? ' is-cur' : ''}"><div class="pyt-frame-h"><span>${esc(i === 0 ? T('Global frame', 'Bingkai global') : `${f.name}()`)}</span>`
        + `${i > 0 ? `<small>${esc(T('function call', 'pemanggilan fungsi'))}</small>` : ''}${cur && frames.length > 1 ? `<small>${esc(T('running', 'sedang berjalan'))}</small>` : ''}</div>`;
      if (!f.locals.length) h += `<div class="pyt-empty">${esc(T('(no variables yet)', '(belum ada variabel)'))}</div>`;
      else {
        h += '<div class="pyt-vars">';
        for (const l of f.locals) {
          const pv = prevVars.get(`${frameKey(f, i)}\u0000${l.name}`);
          const chg = !!prev && boxChanged(pv, l.value);
          h += `<div class="pyt-vn">${esc(l.name)}</div><div class="pyt-vv">${valueHTML(l.value, chg, isHeap(l.value) ? refs.get(l.value.id) : [])}</div>`;
        }
        h += '</div>';
      }
      h += '</div>';
    });
    for (const r of e.rets) {
      if (r.unwind) continue;
      h += `<div class="pyt-ret">↩ ${esc(r.name)}() ${esc(T('returned', 'mengembalikan'))} ${isHeap(r.value) ? `<span class="pyt-box ${tcls(r.value)}">${esc(cut(String(r.value.repr), 40))}</span>` : primBox(r.value, false)}</div>`;
    }
    h += '</div><div class="pyt-heap">';
    for (const v of heap) h += objHTML(v, prevHeap.get(v.id), refs);
    h += '</div><svg class="pyt-arrows" aria-hidden="true" focusable="false"></svg>';
    memBody.classList.toggle('has-heap', heap.length > 0);
    memBody.innerHTML = h;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(drawArrows);
  }

  function drawArrows() {
    raf = 0;
    const svg = memBody.querySelector('.pyt-arrows');
    if (!svg || !memBody.isConnected) return;
    const br = memBody.getBoundingClientRect();
    svg.setAttribute('width', String(Math.round(br.width)));
    svg.setAttribute('height', String(Math.round(br.height)));
    let paths = '<defs><marker id="pyt-ah" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">'
      + '<path d="M0 0 L10 5 L0 10 z" fill="#cbd5e1" stroke="none"/></marker></defs>';
    const f = (n) => (Math.round(n * 10) / 10).toFixed(1);
    const framesEl = memBody.querySelector('.pyt-frames');
    const heapEl = memBody.querySelector('.pyt-heap');
    const stacked = !!framesEl && !!heapEl && heapEl.getBoundingClientRect().top >= framesEl.getBoundingClientRect().bottom - 2;
    const lanes = new Map();
    memBody.querySelectorAll('.pyt-dot[data-to]').forEach((dot) => {
      const target = memBody.querySelector(`.pyt-obj[data-id="${dot.dataset.to}"]`);
      if (!target) return;
      const d = dot.getBoundingClientRect();
      const t = target.getBoundingClientRect();
      if (!d.width || !t.width) return;
      const x1 = d.left + d.width / 2 - br.left;
      const y1 = d.top + d.height / 2 - br.top;
      const tl = t.left - br.left;
      const tt = t.top - br.top;
      let x2;
      let y2;
      let c;
      if (stacked) {
        // objects sit under the frames: run down a lane at the right edge, enter the object from its right side
        if (!lanes.has(dot.dataset.to)) lanes.set(dot.dataset.to, lanes.size);
        const lx = br.width - 9 - (lanes.get(dot.dataset.to) % 4) * 6;
        x2 = t.right - br.left + 3; y2 = tt + 9;
        const r = Math.min(6, Math.abs(y2 - y1) / 2);
        const sy = y2 >= y1 ? 1 : -1;
        if (x2 > lx - 8) x2 = lx - 8;
        paths += `<path d="M${f(x1)} ${f(y1)} H${f(lx - r)} Q${f(lx)} ${f(y1)} ${f(lx)} ${f(y1 + sy * r)} V${f(y2 - sy * r)} Q${f(lx)} ${f(y2)} ${f(lx - r)} ${f(y2)} H${f(x2)}" marker-end="url(#pyt-ah)"/>`;
        return;
      }
      if (tl > x1 + 18) {                         // target to the right: enter at its left edge
        x2 = tl - 2; y2 = tt + 8;
        const dx = Math.max(18, (x2 - x1) * 0.45);
        c = `C${f(x1 + dx)} ${f(y1)} ${f(x2 - dx)} ${f(y2)} ${f(x2)} ${f(y2)}`;
      } else if (tt > y1 + 10) {                  // target below: enter at its top edge
        x2 = Math.min(tl + 14, t.right - br.left - 6); y2 = tt - 2;
        const dy = Math.max(16, (y2 - y1) * 0.45);
        c = `C${f(x1 + 22)} ${f(y1 + dy * 0.4)} ${f(x2)} ${f(y2 - dy)} ${f(x2)} ${f(y2)}`;
      } else {                                    // target above or level: loop round its left side
        x2 = tl - 2; y2 = tt + 8;
        const ox = Math.min(x1, x2) - 26;
        c = `C${f(ox)} ${f(y1)} ${f(ox)} ${f(y2)} ${f(x2)} ${f(y2)}`;
      }
      paths += `<path d="M${f(x1)} ${f(y1)} ${c}" marker-end="url(#pyt-ah)"/>`;
    });
    svg.innerHTML = paths;
  }

  // ---- trace table
  function clearRows() {
    tbody.textContent = '';
    rowsFrom = 1;
    rowsTo = 0;
    openRows.clear();
  }
  function rowEl(k) {
    const info = stepInfo(k);
    // a header whose condition called a function: its result is known only after the call returns
    if (infoCache[k]) openRows.delete(k); else openRows.add(k);
    const tr = document.createElement('tr');
    tr.dataset.k = String(k);
    if (info.error) tr.className = 'is-err';
    const L = info.line;
    const codeLine = L ? (srcLines[L - 1] || '').trim() : '';
    const parts = stepParts(info);
    const chg = parts.length
      ? parts.map((p) => `<span class="pyt-chg${p.cls ? ` ${p.cls}` : ''}">${esc(p.text)}${p.tag ? `<span class="tag">${esc(p.tag)}</span>` : ''}</span>`).join('')
      : (info.out.length ? '' : '<span class="pyt-chg" style="color:#7d8ba6">–</span>');
    const outHTML = info.out.filter((s) => !(info.error && s.kind === 'err')).map((s) => {
      const t = s.text.replace(/\n$/, '').replace(/\n/g, ' ↵ ');
      return `<span class="k-${s.kind}">${esc(cut(t, 160))}</span>`;
    }).join('');
    tr.innerHTML = `<td class="c-step"><button type="button" class="pyt-step" tabindex="-1" aria-label="${esc(T(`Go to step ${k}`, `Ke langkah ${k}`))}">${k}</button></td>`
      + `<td class="c-line">${L ?? ''}</td><td class="c-code">${codeLine ? highlight(codeLine, 'python')[0] : ''}</td>`
      + `<td class="c-chg">${chg}</td><td class="c-out">${outHTML}</td>`;
    return tr;
  }
  function noteRow(text) {
    const tr = document.createElement('tr');
    tr.className = 'pyt-tnote';
    tr.innerHTML = `<td colspan="5">${esc(text)}</td>`;
    return tr;
  }
  const earlierNote = (from) => T(`${from - 1} earlier steps not shown (use the step slider to see them)`,
    `${from - 1} langkah sebelumnya tidak ditampilkan (pakai penggeser langkah untuk melihatnya)`);
  function renderTrace() {
    const n = history.length ? history.length - 1 : 0;
    const to = cursor;
    const from = Math.max(1, to - MAX_ROWS + 1);
    if (to === 0) {
      clearRows();
      tbody.appendChild(noteRow(compileError
        ? T('No steps: the program has a syntax error.', 'Tidak ada langkah: program memiliki kesalahan sintaks.')
        : T('Each step you run adds a row here.', 'Setiap langkah yang dijalankan menambah satu baris di sini.')));
    } else if (rowsTo >= rowsFrom && to === rowsTo + 1 && from <= rowsTo) {
      tbody.querySelector('.pyt-tnote')?.remove();
      tbody.appendChild(rowEl(to));
      while (rowsFrom < from) { tbody.querySelector(`tr[data-k="${rowsFrom}"]`)?.remove(); rowsFrom++; }
      rowsTo = to;
      if (from > 1) tbody.insertBefore(noteRow(earlierNote(from)), tbody.firstChild);
    } else if (rowsTo >= rowsFrom && to < rowsTo && from === rowsFrom) {
      for (let k = rowsTo; k > to; k--) tbody.querySelector(`tr[data-k="${k}"]`)?.remove();
      rowsTo = to;
    } else if (!(rowsTo === to && rowsFrom === from)) {
      clearRows();
      const frag = document.createDocumentFragment();
      if (from > 1) frag.appendChild(noteRow(earlierNote(from)));
      for (let k = from; k <= to; k++) frag.appendChild(rowEl(k));
      tbody.appendChild(frag);
      rowsFrom = from;
      rowsTo = to;
    }
    for (const k of [...openRows]) {
      if (k < rowsFrom || k > rowsTo) { openRows.delete(k); continue; }
      stepInfo(k);
      if (infoCache[k]) tbody.querySelector(`tr[data-k="${k}"]`)?.replaceWith(rowEl(k));
    }
    tbody.querySelectorAll('tr.is-cur').forEach((r) => {
      r.classList.remove('is-cur');
      const b = r.querySelector('.pyt-step');
      if (b) b.tabIndex = -1;
    });
    const cur = to > 0 ? tbody.querySelector(`tr[data-k="${to}"]`) : null;
    if (cur) {
      cur.classList.add('is-cur');
      // one tab stop for the whole table (the newest row); the others are reached by clicking or with the step slider
      const b = cur.querySelector('.pyt-step');
      if (b) b.tabIndex = 0;
      const top = cur.offsetTop;
      const bottom = top + cur.offsetHeight;
      const headH = table.tHead ? table.tHead.offsetHeight : 0;
      if (bottom > tscroll.scrollTop + tscroll.clientHeight) tscroll.scrollTop = bottom - tscroll.clientHeight;
      else if (top - headH < tscroll.scrollTop) tscroll.scrollTop = Math.max(0, top - headH);
    }
    traceCount.textContent = n ? T(`${to} of ${n} steps`, `${to} dari ${n} langkah`) : '';
  }

  // ---- predict mode
  function comparison() {
    const norm = (s) => {
      const ls = s.replace(/\r\n?/g, '\n').split('\n').map((l) => l.replace(/\s+$/, ''));
      while (ls.length && ls[ls.length - 1] === '') ls.pop();
      return ls;
    };
    const p = norm(predTa.value);
    const a = norm(consoleText());
    let line = -1;
    let col = 0;
    for (let i = 0; i < Math.max(p.length, a.length); i++) {
      if (p[i] !== a[i]) {
        line = i;
        const x = p[i] ?? '';
        const y = a[i] ?? '';
        while (col < x.length && col < y.length && x[col] === y[col]) col++;
        break;
      }
    }
    return { p, a, line, col, match: line < 0 };
  }
  function lastVerdict() {
    const h = head();
    if (!predictOn || !h || !finished(h) || !predTa.value.trim()) return null;
    return comparison();
  }
  function renderPredict() {
    if (!predictOn) return;
    // (also when the first input() is already waiting: its prompt is on screen)
    const started = history.length > 1 || (history.length === 1 && finished(history[0])) || (!!run && run.status === 'waiting-input');
    predTa.readOnly = started;
    predNote.textContent = started
      ? T('Locked: the program has started. Press Reset to change your prediction.', 'Terkunci: program sudah berjalan. Tekan Mulai ulang untuk mengubah tebakan.')
      : T('Write your prediction first, then press Step, Run or To end. Spaces inside a line count; spaces at the end of a line are ignored.',
        'Tulis tebakan dulu, lalu tekan Langkah, Jalankan, atau Ke akhir. Spasi di dalam baris dihitung; spasi di akhir baris diabaikan.');
    const h = head();
    const atEnd = !!h && cursor === history.length - 1 && finished(h);
    let html = '';
    if (!atEnd) {
      html = `<p class="pyt-verdict wait">${esc(T('The verdict appears when the program has finished.', 'Hasil penilaian muncul setelah program selesai.'))}</p>`;
    } else if (!predTa.value.trim()) {
      html = `<p class="pyt-verdict wait">${esc(T('No prediction was written for this run. Press Reset, write one, and run again.', 'Tidak ada tebakan untuk proses ini. Tekan Mulai ulang, tulis tebakan, lalu jalankan lagi.'))}</p>`;
    } else {
      const c = comparison();
      html = c.match
        ? `<p class="pyt-verdict ok">✓ ${esc(T('Correct! Your prediction matches the output exactly.', 'Benar! Tebakanmu sama persis dengan keluaran.'))}</p>`
        : `<p class="pyt-verdict bad">✗ ${esc(T(`Not quite: the first difference is in line ${c.line + 1}, character ${c.col + 1}.`, `Belum tepat: perbedaan pertama ada di baris ${c.line + 1}, karakter ${c.col + 1}.`))}</p>`;
      let rows = '';
      const n = Math.max(c.p.length, c.a.length);
      for (let i = 0; i < n; i++) {
        const pl = c.p[i];
        const al = c.a[i];
        const diff = pl !== al;
        const cell = (s, cls) => {
          if (s == null) return `<td class="${cls}"><span class="none">${esc(T('(no line)', '(tidak ada baris)'))}</span></td>`;
          if (i === c.line) return `<td class="${cls}">${esc(s.slice(0, c.col))}<mark>${esc(s.slice(c.col) || ' ')}</mark></td>`;
          return `<td class="${cls}">${esc(s) || ' '}</td>`;
        };
        rows += `<tr class="${diff ? 'diff' : ''}${i === c.line ? ' first' : ''}"><td class="n">${i + 1}</td>${cell(pl, 'p')}${cell(al, 'a')}</tr>`;
      }
      html += `<div class="pyt-cmpw"><table class="pyt-cmp"><thead><tr><th>#</th><th>${esc(T('Your prediction', 'Tebakanmu'))}</th><th>${esc(T('Actual output', 'Keluaran sebenarnya'))}</th></tr></thead><tbody>${rows}</tbody></table></div>`;
    }
    if (predHTML !== html) { predHTML = html; predRight.innerHTML = html; }
  }

  // ---- lab
  function labRow() {
    const h = head();
    if (!h || !finished(h) || compileError) return null;
    const progName = presetKey === 'custom' ? `My code (from ${basePreset.name.en})` : basePreset.name.en;
    const outText = segs.filter((s) => s.kind !== 'err').map((s) => s.text).join('');
    const lines = outText ? outText.replace(/\n$/, '').split('\n').length : 0;
    const v = lastVerdict();
    return {
      program: progName,
      inputs: inputsUsed.length ? inputsUsed.join(' | ') : '–',
      steps: history.length - 1,
      lines,
      ended: h.status === 'done' ? 'done' : (isLimit(h.error) ? 'step limit' : (h.error?.type || 'error')),
      prediction: v ? (v.match ? 'match' : `differ (line ${v.line + 1})`) : '–',
    };
  }

  // ---- screen-reader announcements
  function announce(text) { live.textContent = ''; live.textContent = text; }
  function announceStep() {
    if (playing) return;
    announce(statusText().replace(/<[^>]+>/g, ''));
  }

  // ------------------------------------------------------------------ events
  scrubIn.addEventListener('input', () => {
    stopPlay();
    const v = Number(scrubIn.value);
    if (Number.isFinite(v) && v >= 0 && v < history.length) { cursor = v; render(); }
  });
  tbody.addEventListener('click', (ev) => {
    const b = ev.target.closest('.pyt-step');
    if (!b) return;
    const k = Number(b.closest('tr')?.dataset.k);
    if (Number.isFinite(k) && k >= 0 && k < history.length) { stopPlay(); cursor = k; render(); announceStep(); }
  });
  inTa.addEventListener('input', onInputsEdit);
  const ro = new ResizeObserver(() => { if (!raf) raf = requestAnimationFrame(drawArrows); });
  ro.observe(memBody);

  // ------------------------------------------------------------------ start
  loadPreset(DEFAULT_PRESET);

  return () => {
    destroyed = true;
    stopPlay();
    clearTimeout(editTimer);
    clearTimeout(inTimer);
    cancelAnimationFrame(raf);
    ro.disconnect();
    out.destroy();
    cp.destroy();
    main.remove();
    ctrlPanel.remove();
    style.remove();
  };
}
