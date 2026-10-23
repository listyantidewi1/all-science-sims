// Functions and the Call Stack (PP 03 Bab 6): step through Python programs with functions and watch the call stack.
// The program runs in minipy (src/lib/minipy.js). Every call, return and statement is one step, and each step is kept
// as a snapshot, so "Back" and the step slider replay history without running the program again. The stage shows
// the code (the line that runs next, the lines waiting for a call), a canvas picture of the call stack (one frame card
// per call, pushed on top when a function is called with arrows from the arguments to the parameters, popped when it
// returns while the return value flies back to the call site and replaces the call), the console and a call table
// (PP 03 Table 23: one row per call with parameters, local variables and the return value).
import { button, select, slider, toggle } from '../../../lib/controls.js';
import { createCanvas } from '../../../lib/canvas.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';
import { compile, createRun, tokenize } from '../../../lib/minipy.js';
import { codePanel, consolePanel } from '../../../lib/codepanel.js';

// PRESETS-START
// Preset programs. The Indonesian versions follow PP 03 Bab 6 (identifiers, messages and comments); the English
// versions are the same programs with English names. `tip` = what to look for (shown under the program list).
const P = String.raw;
const PRESETS = [
  {
    key: 'greet',
    name: { en: 'Greeting function', id: 'Fungsi sapa' },
    tip: {
      en: 'Defining a function does not run it: the def line only stores the name. Each call pushes a new frame where the parameter name gets a different argument, then the frame is popped. With no return the call gives back None.',
      id: 'Mendefinisikan fungsi tidak menjalankannya: baris def hanya menyimpan namanya. Setiap pemanggilan menaruh bingkai baru tempat parameter nama menerima argumen yang berbeda, lalu bingkai diambil lagi. Tanpa return, pemanggilan mengembalikan None.',
    },
    code: {
      en: P`# 1. DEFINITION: build a machine called 'greet' with one parameter
def greet(name):
    print("Hello,", name, "! Enjoy learning Python.")

# 2. CALLS: use the machine for several people
greet("Andi")
greet("Siti")
greet("Pak Guru")
`,
      id: P`# 1. DEFINISI: membuat mesin bernama 'sapa' dengan satu parameter
def sapa(nama):
    print("Halo,", nama, "! Selamat belajar Python.")

# 2. PEMANGGILAN: menggunakan mesin untuk beberapa orang
sapa("Andi")
sapa("Siti")
sapa("Pak Guru")
`,
    },
  },
  {
    key: 'area',
    name: { en: 'Rectangle area', id: 'Luas persegi panjang' },
    tip: {
      en: 'Watch the arrows at each call: the arguments 120 and 60 are copied into the parameters length and width. The return value flies back to the call site and replaces the call, so desk_area = rectangle_area(120, 60) becomes desk_area = 7200.',
      id: 'Perhatikan panah di setiap pemanggilan: argumen 120 dan 60 disalin ke parameter panjang dan lebar. Nilai balik terbang kembali ke tempat pemanggilan dan menggantikan pemanggilan itu, sehingga luas_meja = luas_persegi_panjang(120, 60) menjadi luas_meja = 7200.',
    },
    code: {
      en: P`def rectangle_area(length, width):
    area = length * width
    return area

desk_area = rectangle_area(120, 60)
board_area = rectangle_area(240, 120)
print("Desk area:", desk_area, "cm2")
print("Whiteboard area:", board_area, "cm2")
print("Classroom area:", rectangle_area(9, 8), "m2")
`,
      id: P`def luas_persegi_panjang(panjang, lebar):
    luas = panjang * lebar
    return luas

luas_meja = luas_persegi_panjang(120, 60)
luas_papan = luas_persegi_panjang(240, 120)
print("Luas meja:", luas_meja, "cm2")
print("Luas papan tulis:", luas_papan, "cm2")
print("Luas kelas:", luas_persegi_panjang(9, 8), "m2")
`,
    },
  },
  {
    key: 'bmi',
    name: { en: 'BMI calculator', id: 'Kalkulator BMI' },
    tip: {
      en: 'bmi exists twice: once as a local variable inside calculate_bmi, and once as bmi_budi and bmi_andi in the main program. The local bmi disappears when the frame is popped; only the returned value survives.',
      id: 'Ada dua jenis bmi: variabel lokal bmi di dalam hitung_bmi, serta bmi_budi dan bmi_andi di program utama. bmi lokal hilang saat bingkainya diambil; hanya nilai balik yang tersisa.',
    },
    code: {
      en: P`def calculate_bmi(weight, height_m):
    bmi = weight / (height_m * height_m)
    return bmi  # the machine gives back the result

bmi_budi = calculate_bmi(60, 1.70)  # the result is stored in a variable
bmi_andi = calculate_bmi(55, 1.65)
print(f"Budi's BMI: {bmi_budi:.1f}")
print(f"Andi's BMI: {bmi_andi:.1f}")
print("BMI difference:", round(bmi_budi - bmi_andi, 2))  # results used in a calculation
`,
      id: P`def hitung_bmi(berat, tinggi_meter):
    bmi = berat / (tinggi_meter * tinggi_meter)
    return bmi  # mesin mengembalikan hasil

bmi_budi = hitung_bmi(60, 1.70)  # hasil disimpan ke variabel
bmi_andi = hitung_bmi(55, 1.65)
print(f"BMI Budi: {bmi_budi:.1f}")
print(f"BMI Andi: {bmi_andi:.1f}")
print("Selisih BMI:", round(bmi_budi - bmi_andi, 2))  # hasil fungsi dipakai dalam hitungan
`,
    },
  },
  {
    key: 'default',
    name: { en: 'Default parameter', id: 'Parameter bawaan' },
    tip: {
      en: 'The first call sends one argument, so fee_per_day takes its default value 1000 (no arrow points to it). The second call sends 2000, which replaces the default.',
      id: 'Pemanggilan pertama hanya mengirim satu argumen, sehingga denda_per_hari memakai nilai bawaannya 1000 (tidak ada panah yang menunjuknya). Pemanggilan kedua mengirim 2000, yang menggantikan nilai bawaan.',
    },
    code: {
      en: P`def late_fee(days_late, fee_per_day=1000):  # parameter with a default value
    return days_late * fee_per_day

print("Fee for 5 days (default rate):", late_fee(5))
print("Fee for 5 days (rate 2000)   :", late_fee(5, 2000))
`,
      id: P`def hitung_denda(hari_terlambat, denda_per_hari=1000):  # parameter dengan nilai bawaan
    return hari_terlambat * denda_per_hari

print("Denda 5 hari (tarif bawaan):", hitung_denda(5))
print("Denda 5 hari (tarif 2000) :", hitung_denda(5, 2000))
`,
    },
  },
  {
    key: 'status',
    name: { en: 'A function calls a function', id: 'Fungsi memanggil fungsi' },
    tip: {
      en: 'print_report calls mastery_status, so three frames are on the stack at once. The top frame runs; the frames below wait at their call line. Try the boundary scores 80, 75 and 74.9.',
      id: 'cetak_rapor memanggil status_ketuntasan, sehingga ada tiga bingkai di tumpukan sekaligus. Bingkai teratas yang berjalan; bingkai di bawahnya menunggu di baris pemanggilannya. Perhatikan nilai batas 80, 75, dan 74,9.',
    },
    code: {
      en: P`def mastery_status(score):
    if score >= 75:
        return "Mastered"
    else:
        return "Not yet mastered"

def print_report(name, score):
    status = mastery_status(score)  # a function calling another function
    print(f"{name}: {score} -> {status}")

print_report("Andi", 80)
print_report("Budi", 75)
print_report("Cici", 74.9)
`,
      id: P`def status_ketuntasan(nilai):
    if nilai >= 75:
        return "Tuntas"
    else:
        return "Belum Tuntas"

def cetak_rapor(nama, nilai):
    status = status_ketuntasan(nilai)  # fungsi memanggil fungsi lain
    print(f"{nama}: {nilai} -> {status}")

cetak_rapor("Andi", 80)
cetak_rapor("Budi", 75)
cetak_rapor("Cici", 74.9)
`,
    },
  },
  {
    key: 'print-return',
    name: { en: 'print is not return', id: 'print bukan return' },
    tip: {
      en: 'print_area shows the area on screen but returns None, so a = None. calc_area returns the number, so b = 15 can be used in b + 1. Try adding print(a + 1) at the end.',
      id: 'cetak_luas menampilkan luas di layar tetapi mengembalikan None, sehingga a = None. hitung_luas mengembalikan bilangannya, sehingga b = 15 dapat dipakai dalam b + 1. Coba tambahkan print(a + 1) di akhir.',
    },
    code: {
      en: P`def print_area(length, width):
    print("Area:", length * width)  # only shows the result

def calc_area(length, width):
    return length * width  # gives the result back

a = print_area(5, 3)
b = calc_area(5, 3)
print("a =", a)
print("b =", b)
print("b + 1 =", b + 1)
`,
      id: P`def cetak_luas(panjang, lebar):
    print("Luas:", panjang * lebar)  # hanya mencetak

def hitung_luas(panjang, lebar):
    return panjang * lebar  # mengembalikan hasil

a = cetak_luas(5, 3)
b = hitung_luas(5, 3)
print("a =", a)
print("b =", b)
print("b + 1 =", b + 1)
`,
    },
  },
  {
    key: 'local-global',
    name: { en: 'Local vs global', id: 'Lokal vs global' },
    tip: {
      en: 'score inside add_points is a local copy: it becomes 60 while team_score in the global frame stays 50. show_score has no variable of its own, so it reads team_score from the global frame.',
      id: 'skor di dalam tambah_poin adalah salinan lokal: nilainya menjadi 60 sementara skor_tim di bingkai global tetap 50. tampilkan_skor tidak punya variabel sendiri, jadi ia membaca skor_tim dari bingkai global.',
    },
    code: {
      en: P`def add_points(score):
    score = score + 10  # changes the local copy
    return score

def show_score():
    print("Team score (read from the global):", team_score)

team_score = 50
new_score = add_points(team_score)
show_score()
print("Old score:", team_score)  # still 50
print("New score:", new_score)  # 60
`,
      id: P`def tambah_poin(skor):
    skor = skor + 10  # mengubah salinan lokal
    return skor

def tampilkan_skor():
    print("Skor tim (dibaca dari global):", skor_tim)

skor_tim = 50
skor_baru = tambah_poin(skor_tim)
tampilkan_skor()
print("Skor lama:", skor_tim)  # tetap 50
print("Skor baru:", skor_baru)  # 60
`,
    },
  },
  {
    key: 'unbound',
    name: { en: 'UnboundLocalError', id: 'UnboundLocalError' },
    tip: {
      en: 'Because team_score = ... appears inside add_bonus, Python makes team_score a local variable for the whole function. Line 6 reads it before it has a value: UnboundLocalError. Fix: pass the score as a parameter, def add_bonus(score): return score + 10.',
      id: 'Karena ada skor_tim = ... di dalam tambah_bonus, Python menjadikan skor_tim variabel lokal untuk seluruh fungsi. Baris 6 membacanya sebelum ada nilainya: UnboundLocalError. Perbaikan: kirim skor lewat parameter, def tambah_bonus(skor): return skor + 10.',
    },
    code: {
      en: P`team_score = 50

def add_bonus():
    # team_score is assigned below, so Python treats
    # team_score as a LOCAL variable in this function.
    team_score = team_score + 10
    return team_score

print("Starting score:", team_score)
print("Score + bonus:", add_bonus())
`,
      id: P`skor_tim = 50

def tambah_bonus():
    # Karena skor_tim diisi di bawah ini, Python menganggap
    # skor_tim sebagai variabel LOKAL di dalam fungsi ini.
    skor_tim = skor_tim + 10
    return skor_tim

print("Skor awal:", skor_tim)
print("Skor + bonus:", tambah_bonus())
`,
    },
  },
  {
    key: 'duty-roster',
    name: { en: 'Class duty roster', id: 'Daftar Piket Kelas' },
    tip: {
      en: 'The list is sent to every function, but it is not copied: the parameter roster and the global duty point at the same list (follow the arrow). That is why append, remove and insert inside the functions change duty without any return.',
      id: 'List dikirim ke setiap fungsi, tetapi tidak disalin: parameter daftar dan variabel global piket menunjuk list yang sama (ikuti panahnya). Itulah sebabnya append, remove, dan insert di dalam fungsi mengubah piket tanpa return.',
    },
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
    key: 'trace-total',
    name: { en: 'Tracing total_price', id: 'Menelusuri hitung_total' },
    tip: {
      en: 'The call table under the picture is a tracing table: one row per call with the parameters, the local variables and the return value. Why is the result 18000.0 and not 18000?',
      id: 'Tabel pemanggilan di bawah gambar adalah tabel penelusuran: satu baris per pemanggilan berisi parameter, variabel lokal, dan nilai balik. Mengapa hasilnya 18000.0, bukan 18000?',
    },
    code: {
      en: P`def total_price(price, quantity, discount_percent):
    subtotal = price * quantity
    discount = subtotal * discount_percent / 100
    return subtotal - discount

print(total_price(5000, 4, 10))
print(total_price(12000, 2, 0))
`,
      id: P`def hitung_total(harga, jumlah, diskon_persen):
    subtotal = harga * jumlah
    potongan = subtotal * diskon_persen / 100
    return subtotal - potongan

print(hitung_total(5000, 4, 10))
print(hitung_total(12000, 2, 0))
`,
    },
  },
  {
    key: 'guess',
    name: { en: 'Guess the output', id: 'Tebak output' },
    tip: {
      en: 'x = x * 2 changes only the local x, so a stays 5. In change(change(1)) the inner call runs first: its return value 3 becomes the argument of the outer call. Turn on "Predict return values" before you start.',
      id: 'x = x * 2 hanya mengubah x lokal, sehingga a tetap 5. Pada ubah(ubah(1)) pemanggilan dalam berjalan lebih dulu: nilai baliknya 3 menjadi argumen pemanggilan luar. Nyalakan "Tebak nilai balik" sebelum mulai.',
    },
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
    key: 'factorial',
    name: { en: 'Recursion: factorial (extra)', id: 'Rekursi: faktorial (pengayaan)' },
    tip: {
      en: 'factorial calls itself with a smaller n, so the stack grows to 6 frames: one per call plus the main program. Then the frames are popped one by one and each return value is multiplied on the way back: 1, 2, 6, 24, 120.',
      id: 'faktorial memanggil dirinya sendiri dengan n yang lebih kecil, sehingga tumpukan tumbuh sampai 6 bingkai: satu per pemanggilan ditambah program utama. Lalu bingkai diambil satu per satu dan setiap nilai balik dikalikan dalam perjalanan pulang: 1, 2, 6, 24, 120.',
    },
    code: {
      en: P`def factorial(n):
    if n <= 1:  # base case: stop calling itself
        return 1
    return n * factorial(n - 1)  # calls itself with a smaller n

result = factorial(5)
print("5! =", result)
`,
      id: P`def faktorial(n):
    if n <= 1:  # kasus dasar: berhenti memanggil diri sendiri
        return 1
    return n * faktorial(n - 1)  # memanggil dirinya sendiri dengan n lebih kecil

hasil = faktorial(5)
print("5! =", hasil)
`,
    },
  },
];
// PRESETS-END

const MAX_STEPS = 3000;                    // statements per run, then minipy stops with StepLimit
const SPEEDS = [0.5, 1, 2, 3, 5, 8, 12];   // "Run" speed, steps per second
const DEFAULT_PRESET = 'area';
const MAX_TABLE_ROWS = 60;                 // call-table rows shown per function
const HEAP = new Set(['list', 'tuple', 'dict', 'deque', 'set']);
const CELLS = new Set(['list', 'tuple', 'deque', 'set']);
const MONO = '"SFMono-Regular", ui-monospace, Menlo, Consolas, "Liberation Mono", monospace';
const SANS = 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const TYPE_COL = {
  int: '#60a5fa', float: '#2dd4bf', str: '#c3e88d', bool: '#f472b6', NoneType: '#94a3b8', list: '#fb923c',
  deque: '#fdba74', tuple: '#c4b5fd', dict: '#fcd34d', set: '#f0abfc', function: '#ffcb6b',
};
const tcol = (v) => TYPE_COL[v?.type] || '#a5b4fc';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const cut = (s, n) => { const t = String(s); return t.length > n ? t.slice(0, Math.max(1, n - 1)) + '…' : t; };
const short = (v, n = 28) => cut(v?.type === 'function' ? String(v.repr).replace(/^<function (\S+) at .*>$/, 'function $1') : String(v?.repr ?? ''), n);
const sameLocals = (a, b) => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    const x = a[i], y = b[i];
    if (x.name !== y.name || x.value.repr !== y.value.repr || x.value.id !== y.value.id || x.value.type !== y.value.type) return false;
  }
  return true;
};
const ease = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : 1 - (1 - t) * (1 - t) * (1 - t));
const easeInOut = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const CSS = `
.fcs { padding: 12px; min-width: 0; }
.fcs *, .fcs *::before, .fcs *::after, .fcs-ctl * { box-sizing: border-box; }
.fcs [hidden], .fcs-ctl [hidden] { display: none !important; }
/* Phones: one column, code first, then the buttons, the stack picture, the console and the call table.
   Wide: buttons on top, code and console on the left, the stack picture on the right, the call table below.
   The sections are moved in the DOM (arrange()) rather than with CSS order, so the Tab order follows what is seen. */
.fcs-grid { display: flex; flex-direction: column; gap: 12px; min-width: 0; }
.fcs-code, .fcs-stack, .fcs-con, .fcs-calls { min-width: 0; }
.fcs.is-wide .fcs-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.04fr); align-items: start;
  grid-template-areas: "bar bar" "code stack" "con stack" "calls calls"; grid-template-rows: auto auto 1fr auto; }
.fcs.is-wide .fcs-bar { grid-area: bar; }
.fcs.is-wide .fcs-code { grid-area: code; }
.fcs.is-wide .fcs-con { grid-area: con; }
.fcs.is-wide .fcs-stack { grid-area: stack; }
.fcs.is-wide .fcs-calls { grid-area: calls; }
.fcs-bar { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px; }
.fcs-btns { display: flex; flex-wrap: wrap; gap: 6px; }
.fcs-btns .btn { padding: 7px 10px; min-height: 38px; white-space: nowrap; }
.fcs-btns .btn:disabled { opacity: .45; cursor: not-allowed; filter: none; }
.fcs-btns .btn--primary:hover { background: var(--accent, var(--color-accent)); }
/* 250px: room for the slider and "Langkah 4998 / 4998"; when the buttons leave less, the slider takes its own row */
.fcs-scrub { display: flex; align-items: center; gap: 8px; flex: 1 1 250px; min-width: 0; }
.fcs-scrub input { flex: 1 1 auto; min-width: 60px; accent-color: var(--accent, var(--color-accent)); }
.fcs-count { font: 600 13px/1.2 var(--font-mono, monospace); white-space: nowrap; color: var(--color-fg); }
.fcs-status { flex: 1 1 100%; margin: 0; font-size: 13px; line-height: 1.45; color: var(--color-muted); min-height: 2.9em; overflow-wrap: anywhere; }
.fcs-status b { color: var(--color-fg); }
.fcs-status code { font: 12.5px/1.3 var(--font-mono, monospace); color: var(--color-fg); }
.fcs-status.is-err b { color: var(--color-danger); }
.fcs-sr { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }
.fcs-legend { display: flex; flex-wrap: wrap; gap: 4px 14px; margin-top: 6px; font-size: 12px; line-height: 1.5; color: var(--color-muted); }
.fcs-sw { display: inline-block; width: 18px; height: 12px; margin-right: 5px; border-radius: 3px; vertical-align: -1px; }
.fcs-sw.s-next { background: rgba(251,191,36,.35); box-shadow: inset 3px 0 0 #fbbf24; }
.fcs-sw.s-wait { background: rgba(96,165,250,.35); box-shadow: inset 3px 0 0 #60a5fa; }
.fcs-sw.s-ret { background: rgba(52,211,153,.3); box-shadow: inset 3px 0 0 #34d399; }
.fcs-sw.s-err { background: rgba(248,113,113,.35); box-shadow: inset 3px 0 0 #f87171; }
.fcs-stack { display: flex; flex-direction: column; gap: 8px; }
.fcs-sp { background: #0b1220; border: 1px solid #1e2a44; border-radius: 10px; overflow: hidden; color-scheme: dark; }
.fcs-sp-h, .fcs-calls-h { display: flex; flex-wrap: wrap; align-items: center; gap: 3px 10px; min-height: 32px; padding: 5px 10px;
  background: #0f182c; border-bottom: 1px solid #1e2a44; font: 600 12px/1.3 var(--font-sans, sans-serif); color: #b6c2d6; }
.fcs-sp-h .t, .fcs-calls-h .t { flex: 1 1 auto; letter-spacing: .02em; }
.fcs-sp-h small, .fcs-calls-h small { font-weight: 500; color: #8a99b3; }
.fcs-depth { font: 600 12px/1.3 var(--font-mono, monospace); color: #fde68a; white-space: nowrap; }
.fcs-cw { position: relative; height: 380px; outline: none; }
.fcs-cw:focus-visible { box-shadow: inset 0 0 0 2px #60a5fa; }
.sim-stage .fcs-cw canvas { background: #0b1220; }
.fcs-key { margin: 0; font-size: 12px; line-height: 1.5; color: var(--color-muted); }
.fcs-key b { color: var(--color-fg); font-weight: 600; }
.fcs-pred { display: grid; gap: 6px; padding: 8px 10px; border: 1px solid var(--color-border); border-left: 3px solid var(--accent, var(--color-accent));
  border-radius: 8px; background: color-mix(in srgb, var(--color-fg) 3%, var(--color-surface)); font-size: 13px; line-height: 1.45; color: var(--color-fg); }
.fcs-pred p { margin: 0; }
.fcs-pred code { font: 12.5px/1.3 var(--font-mono, monospace); }
.fcs-pred-row { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.fcs-pred-in { flex: 1 1 130px; min-width: 0; padding: 6px 8px; border: 1px solid var(--color-border); border-radius: 6px;
  background: var(--color-surface-2, var(--color-surface)); color: var(--color-fg); font: 14px/1.3 var(--font-mono, monospace); }
.fcs-pred-row .btn { padding: 6px 11px; }
.fcs-pred-v.ok { border-left: 3px solid var(--color-ok); padding-left: 7px; }
.fcs-pred-v.close { border-left: 3px solid #f59e0b; padding-left: 7px; }
.fcs-pred-v.bad { border-left: 3px solid var(--color-danger); padding-left: 7px; }
.fcs-pred-v:empty { display: none; }
.fcs-con { min-width: 0; }
.fcs-calls { background: #0b1220; color: #e2e8f0; border: 1px solid #1e2a44; border-radius: 10px; overflow: hidden; color-scheme: dark; }
.fcs-calls-b { max-height: 380px; overflow: auto; padding: 8px 10px 10px; display: grid; grid-template-columns: minmax(0, 1fr); gap: 14px; scrollbar-width: thin; scrollbar-color: #334155 transparent; }
.fcs-calls-b:focus-visible { outline: 2px solid #60a5fa; outline-offset: -2px; }
.fcs-empty { margin: 4px 0; color: #8a99b3; font: 12.5px/1.45 var(--font-sans, sans-serif); }
/* a table wider than the panel overflows its group and the focusable panel (.fcs-calls-b) scrolls sideways */
.fcs-tw { min-width: 0; }
.fcs-tcap { margin: 0 0 5px; font: 600 12.5px/1.35 var(--font-mono, monospace); color: #ffcb6b; overflow-wrap: anywhere; }
.fcs-tcap small { font-family: var(--font-sans, sans-serif); font-weight: 400; color: #8a99b3; margin-left: 6px; white-space: nowrap; }
.fcs-tt { border-collapse: collapse; font: 12.5px/1.4 var(--font-sans, sans-serif); min-width: 100%; }
.fcs-tt th { padding: 4px 8px; background: #0f182c; color: #b6c2d6; font-weight: 600; text-align: left; white-space: nowrap; border-bottom: 1px solid #1e2a44; }
.fcs-tt th.p { color: #93c5fd; }
.fcs-tt th.l { color: #e2e8f0; }
.fcs-tt td { padding: 3px 8px; border-top: 1px solid #172036; font-family: var(--font-mono, monospace); white-space: nowrap; vertical-align: top; }
.fcs-tt td.ret { color: #6ee7b7; }
.fcs-tt td.run { color: #8a99b3; font-family: var(--font-sans, sans-serif); }
.fcs-tt td.err { color: #fca5a5; font-family: var(--font-sans, sans-serif); }
.fcs-tt tr.is-top td { background: rgba(251, 191, 36, .14); }
.fcs-tt tr.is-on td { background: rgba(96, 165, 250, .09); }
.fcs-tt tr.is-new td { box-shadow: inset 0 1px 0 rgba(253, 224, 71, .5); }
.fcs-tt td.more { color: #8a99b3; font-family: var(--font-sans, sans-serif); }
.fcs-go { min-width: 30px; padding: 1px 6px; border: 1px solid #2b3a5a; border-radius: 5px; background: #131d33; color: #dbe4f3;
  font: 600 12px/1.4 var(--font-mono, monospace); cursor: pointer; }
.fcs-go:hover { background: #1c2945; }
.fcs-go:focus-visible { outline: 2px solid #60a5fa; outline-offset: 1px; }
.fcs-tip { margin: 0; padding: 8px 10px; border-left: 3px solid var(--accent, var(--color-accent)); border-radius: 0 6px 6px 0;
  background: color-mix(in srgb, var(--accent, var(--color-accent)) 7%, transparent); font-size: 13px; line-height: 1.5; color: var(--color-fg); }
.fcs-tip b { font-weight: 700; }
@supports (-webkit-touch-callout: none) { .fcs-pred-in { font-size: 16px; } }
`;

export function mount(rootEl) {
  const lang = getLocale() === 'id' ? 'id' : 'en';
  const T = (en, id) => (lang === 'id' ? id : en);
  const framesWord = (n) => (lang === 'id' ? 'bingkai' : n === 1 ? 'frame' : 'frames');
  const reduceMotion = !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const narrowStart = !!window.matchMedia?.('(max-width: 600px)').matches;
  const uid = Math.random().toString(36).slice(2, 8);

  const style = document.createElement('style');
  style.textContent = CSS;
  rootEl.appendChild(style);

  // ------------------------------------------------------------------ layout
  const main = document.createElement('div');
  main.className = 'fcs';
  const grid = document.createElement('div');
  grid.className = 'fcs-grid';
  main.appendChild(grid);
  rootEl.appendChild(main);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls fcs-ctl';
  rootEl.appendChild(ctrlPanel);

  // transport bar
  const bar = document.createElement('div');
  bar.className = 'fcs-bar';
  bar.setAttribute('role', 'group');
  bar.setAttribute('aria-label', T('Run controls', 'Kontrol jalannya program'));
  const btns = document.createElement('div');
  btns.className = 'fcs-btns';
  const mkBtn = (label, aria, title, onClick, primary = false) => {
    const b = button({ label, primary, onClick });
    b.el.setAttribute('aria-label', aria);
    b.el.title = title || aria;
    return b.el;
  };
  const bBack = mkBtn(T('◀ Back', '◀ Mundur'), T('Step back', 'Mundur satu langkah'), '', () => stepBack());
  const bStep = mkBtn(T('Step ▶', 'Langkah ▶'), T('Step: the next statement, call or return', 'Langkah: pernyataan, pemanggilan, atau pengembalian berikutnya'), '', () => stepForward(true), true);
  const bOver = mkBtn(T('Step over ⤼', 'Lewati ⤼'), T('Step over: run the next line; any function it calls runs completely', 'Lewati: jalankan baris berikutnya; fungsi yang dipanggilnya dijalankan sampai selesai'), '', () => stepOver());
  const bOut = mkBtn(T('Step out ⤴', 'Keluar ⤴'), T('Step out: run until the current function returns', 'Keluar: jalankan sampai fungsi yang sedang berjalan kembali'), '', () => stepOut());
  const bRun = mkBtn(T('▶ Run', '▶ Jalankan'), T('Run: step automatically', 'Jalankan: melangkah otomatis'), '', () => togglePlay());
  const bEnd = mkBtn(T('⏭ To end', '⏭ Ke akhir'), T('To end: run the rest of the program', 'Ke akhir: jalankan sisa program'), '', () => toEnd());
  const bReset = mkBtn(T('⟲ Reset', '⟲ Ulang'), T('Reset: back to the first line', 'Ulang: kembali ke baris pertama'), '', () => { reset(); announce(T('Program reset to the first line.', 'Program kembali ke baris pertama.')); });
  btns.append(bBack, bStep, bOver, bOut, bRun, bEnd, bReset);
  const scrub = document.createElement('div');
  scrub.className = 'fcs-scrub';
  const scrubIn = document.createElement('input');
  scrubIn.type = 'range';
  scrubIn.min = '0'; scrubIn.max = '0'; scrubIn.step = '1'; scrubIn.value = '0';
  scrubIn.setAttribute('aria-label', T('Step slider: move through the steps already run', 'Penggeser langkah: telusuri langkah yang sudah berjalan'));
  const count = document.createElement('span');
  count.className = 'fcs-count';
  scrub.append(scrubIn, count);
  const status = document.createElement('p');
  status.className = 'fcs-status';
  const live = document.createElement('div');
  live.className = 'fcs-sr';
  live.setAttribute('aria-live', 'polite');
  bar.append(btns, scrub, status, live);

  // code panel
  const codeWrap = document.createElement('div');
  codeWrap.className = 'fcs-code';
  const cp = codePanel({
    value: '', language: 'python', editable: true, minLines: 8, maxLines: narrowStart ? 12 : 22, title: 'main.py', locale: lang,
    ariaLabel: T('Python program (editable)', 'Program Python (dapat diedit)'),
    onChange: () => onCodeEdit(),
  });
  const restoreBtn = document.createElement('button');
  restoreBtn.type = 'button';
  restoreBtn.textContent = T('↺ Original code', '↺ Kode awal');
  restoreBtn.title = T('Put back the preset program', 'Kembalikan program contoh');
  restoreBtn.disabled = true;
  restoreBtn.addEventListener('click', () => loadPreset(preset.key));
  cp.actions.appendChild(restoreBtn);
  const legend = document.createElement('div');
  legend.className = 'fcs-legend';
  legend.innerHTML = `<span><span class="fcs-sw s-next" aria-hidden="true"></span>${esc(T('amber: runs next', 'kuning: dijalankan berikutnya'))}</span>`
    + `<span><span class="fcs-sw s-wait" aria-hidden="true"></span>${esc(T('blue: waits for a call to finish', 'biru: menunggu pemanggilan selesai'))}</span>`
    + `<span><span class="fcs-sw s-ret" aria-hidden="true"></span>${esc(T('green: just returned', 'hijau: baru kembali'))}</span>`
    + `<span><span class="fcs-sw s-err" aria-hidden="true"></span>${esc(T('red: error', 'merah: galat'))}</span>`;
  codeWrap.append(cp.el, legend);

  // console
  const conWrap = document.createElement('div');
  conWrap.className = 'fcs-con';
  const out = consolePanel({
    minLines: 4, maxLines: narrowStart ? 8 : 10, title: T('Output (console)', 'Keluaran (konsol)'), locale: lang,
    ariaLabel: T('Program output', 'Keluaran program'),
    placeholder: T('Output appears here while the program runs.', 'Keluaran muncul di sini saat program berjalan.'),
  });
  conWrap.appendChild(out.el);

  // call-stack picture
  const stackSec = document.createElement('section');
  stackSec.className = 'fcs-stack';
  stackSec.setAttribute('aria-label', T('Call stack', 'Tumpukan pemanggilan'));
  const sp = document.createElement('div');
  sp.className = 'fcs-sp';
  const spHead = document.createElement('div');
  spHead.className = 'fcs-sp-h';
  const spTitle = document.createElement('span');
  spTitle.className = 't';
  spTitle.textContent = T('Call stack', 'Tumpukan pemanggilan');
  const spDepth = document.createElement('span');
  spDepth.className = 'fcs-depth';
  spHead.append(spTitle, spDepth);
  const cw = document.createElement('div');
  cw.className = 'fcs-cw';
  cw.tabIndex = 0;
  cw.setAttribute('role', 'img');
  const descId = `fcs-desc-${uid}`;
  const desc = document.createElement('div');
  desc.id = descId;
  desc.className = 'fcs-sr';
  cw.setAttribute('aria-describedby', descId);
  cw.setAttribute('aria-label', T('Picture of the call stack. Keys: left and right arrows step back and forward, Home goes to the start, End runs to the end.',
    'Gambar tumpukan pemanggilan. Tombol: panah kiri dan kanan untuk mundur dan maju, Home ke awal, End ke akhir.'));
  sp.append(spHead, cw, desc);
  const cv = createCanvas(cw);
  cv.canvas.setAttribute('aria-hidden', 'true');

  const pred = document.createElement('div');
  pred.className = 'fcs-pred';
  pred.hidden = true;
  const predQ = document.createElement('p');
  const predRow = document.createElement('div');
  predRow.className = 'fcs-pred-row';
  const predLab = document.createElement('label');
  predLab.className = 'fcs-sr';
  predLab.htmlFor = `fcs-pred-${uid}`;
  predLab.textContent = T('Your predicted return value', 'Tebakan nilai balikmu');
  const predIn = document.createElement('input');
  predIn.type = 'text';
  predIn.id = `fcs-pred-${uid}`;
  predIn.className = 'fcs-pred-in';
  predIn.setAttribute('autocomplete', 'off');
  predIn.setAttribute('autocapitalize', 'off');
  predIn.spellcheck = false;
  predIn.placeholder = T('e.g. 15 or \'Tuntas\' or None', 'mis. 15 atau \'Tuntas\' atau None');
  const predSave = button({ label: T('Save prediction', 'Simpan tebakan'), onClick: () => savePrediction() }).el;
  const predSkip = button({ label: T('Skip', 'Lewati'), onClick: () => skipPrediction() }).el;
  predRow.append(predLab, predIn, predSave, predSkip);
  const predV = document.createElement('p');
  predV.className = 'fcs-pred-v';
  predV.setAttribute('aria-live', 'polite');
  pred.append(predQ, predRow, predV);
  predIn.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' && !ev.isComposing) { ev.preventDefault(); savePrediction(); } });

  const keyHint = document.createElement('p');
  keyHint.className = 'fcs-key';
  keyHint.innerHTML = esc(T('Each card is a frame: the main program at the bottom, the running call on top (amber). Blue names are parameters; arrows show arguments arriving and lists shared between frames.',
    'Setiap kartu adalah bingkai: program utama di bawah, pemanggilan yang sedang berjalan di atas (kuning). Nama biru adalah parameter; panah menunjukkan argumen yang masuk dan list yang dipakai bersama antarbingkai.'))
    + ` <b>${esc(T('Keys on the picture:', 'Tombol pada gambar:'))}</b> ← → ${esc(T('step, Home start, End finish.', 'melangkah, Home awal, End akhir.'))}`;
  stackSec.append(sp, pred, keyHint);

  // call table
  const callsSec = document.createElement('section');
  callsSec.className = 'fcs-calls';
  callsSec.setAttribute('aria-label', T('Call table', 'Tabel pemanggilan'));
  const callsHead = document.createElement('div');
  callsHead.className = 'fcs-calls-h';
  callsHead.innerHTML = `<span class="t">${esc(T('Call table (tracing functions)', 'Tabel pemanggilan (penelusuran fungsi)'))}</span>`;
  const callsCount = document.createElement('small');
  callsHead.appendChild(callsCount);
  const callsBody = document.createElement('div');
  callsBody.className = 'fcs-calls-b';
  callsBody.tabIndex = 0;
  callsBody.setAttribute('role', 'region');
  callsBody.setAttribute('aria-label', T('Call table, one row per function call', 'Tabel pemanggilan, satu baris per pemanggilan fungsi'));
  callsSec.append(callsHead, callsBody);

  /** Put the sections in reading order: wide = buttons, code, console, picture, table (grid areas place them);
   *  phones = code, buttons, picture, console, table (one column). DOM order is Tab order, so it must match. */
  function arrange(wide) {
    const want = wide ? [bar, codeWrap, conWrap, stackSec, callsSec] : [codeWrap, bar, stackSec, conWrap, callsSec];
    if (want.every((el, i) => grid.children[i] === el)) return;
    const act = document.activeElement;
    grid.append(...want);
    if (act && act !== document.activeElement && grid.contains(act)) act.focus({ preventScroll: true });
  }
  arrange(false);

  // ------------------------------------------------------------------ side controls
  let preset = PRESETS.find((p) => p.key === DEFAULT_PRESET) || PRESETS[0];
  const progSel = select({
    label: T('Program', 'Program'), key: 'program', value: preset.key,
    options: PRESETS.map((p, i) => ({ value: p.key, label: `${i + 1}. ${p.name[lang]}` })),
    onChange: (v) => loadPreset(v),
  });
  const tip = document.createElement('p');
  tip.className = 'fcs-tip';
  tip.setAttribute('aria-live', 'polite');
  let speedIdx = 2;
  const speedSl = slider({
    label: T('Run speed', 'Kecepatan jalan'), key: 'speed', min: 0, max: SPEEDS.length - 1, step: 1, value: speedIdx,
    format: (i) => `${lang === 'id' ? String(SPEEDS[i]).replace('.', ',') : SPEEDS[i]} ${T('steps/s', 'langkah/detik')}`,
    onInput: (i) => { speedIdx = i; if (playing) { clearTimeout(timer); timer = setTimeout(tick, interval()); } },
  });
  let predictOn = false;
  const predTg = toggle({
    label: T('Predict return values (stop at each call)', 'Tebak nilai balik (berhenti di setiap pemanggilan)'), key: 'predict', value: false,
    onChange: (on) => { predictOn = on; renderPredict(); sizeCanvas(); draw(); },
  });
  const lab = labPanel({
    title: 'Call stack lab',
    filename: 'function-call-stack-data.csv',
    columns: [
      { key: 'program', label: 'Program' },
      { key: 'steps', label: 'Statements run' },
      { key: 'calls', label: 'Calls' },
      { key: 'depth', label: 'Max frames (incl. main)' },
      { key: 'returns', label: 'Return values (in order)' },
      { key: 'ended', label: 'Ended' },
      { key: 'predicted', label: 'Predictions right' },
    ],
    procedure: [
      'Program 2 (rectangle area): press Step until the first call. Note which argument goes into which parameter, then press "To end" and record the run.',
      'Program 5 (a function that calls a function): step to the deepest point. How many frames are on the stack? Record the run.',
      'Program 12 (factorial): record the run for factorial(5). Edit the call to factorial(3) and factorial(8) and record each. Find the rule for the maximum number of frames.',
      'Program 6 (print is not return): record the run. Which return values are None, and why?',
      'Turn on "Predict return values", choose program 11 (guess the output), predict every call, run to the end and record your score.',
    ],
    predict: 'Before running factorial(5): how many frames will be on the stack at the deepest point, and in which order will the return values appear?',
    source: () => labRow(),
  });
  ctrlPanel.append(progSel.el, tip, speedSl.el, predTg.el, lab.el);

  // ------------------------------------------------------------------ state
  let edited = false;
  let srcLines = [];
  let fnDefs = new Map();      // name -> { line, sig }
  let spansByLine = new Map(); // line -> call spans [{ name, s, e, args: [{ s, e, kw, star }] }] in call order
  let commentAt = new Map();   // line -> column where a comment starts
  let run = null;
  let compileError = null;
  let hist = [];
  let cur = 0;
  let ended = false;
  let segs = [];
  let segLen = 0;
  let calls = [];
  let callByFrame = new Map();
  let callStack = [];
  let frameCache = new Map();
  let siteMap = new Map();
  let lineSteps = 0;
  let callCount = 0;
  let maxDepth = 1;
  let playing = false;
  let timer = 0;
  let busy = false;
  let busyTimer = 0;
  let editTimer = 0;
  let anim = null;
  let raf = 0;
  let destroyed = false;
  let consoleKey = '';
  let tableKey = '';
  let lastH = 0;
  let waitingInput = false;
  const predictions = new Map(); // call number -> { text, skipped }

  const finished = () => ended && cur === hist.length - 1;
  const interval = () => 1000 / SPEEDS[speedIdx];
  const announce = (msg) => { live.textContent = ''; requestAnimationFrame(() => { if (!destroyed) live.textContent = msg; }); };

  // ------------------------------------------------------------------ source analysis
  function matchClose(toks, open) {
    let depth = 0;
    for (let k = open; k < toks.length; k++) {
      const t = toks[k];
      if (t.type !== 'op') continue;
      if (t.text === '(' || t.text === '[' || t.text === '{') depth++;
      else if (t.text === ')' || t.text === ']' || t.text === '}') { depth--; if (depth === 0) return k; }
    }
    return -1;
  }
  function splitArgs(toks, open, close) {
    const parts = [];
    let part = [];
    let depth = 0;
    for (let k = open + 1; k < close; k++) {
      const t = toks[k];
      if (t.type === 'newline') continue;
      if (t.type === 'op' && (t.text === '(' || t.text === '[' || t.text === '{')) depth++;
      if (t.type === 'op' && (t.text === ')' || t.text === ']' || t.text === '}')) depth--;
      if (depth === 0 && t.type === 'op' && t.text === ',') { if (part.length) parts.push(part); part = []; continue; }
      part.push(t);
    }
    if (part.length) parts.push(part);
    return parts;
  }
  function analyseSource(src) {
    srcLines = src.replace(/\r\n?/g, '\n').split('\n');
    fnDefs = new Map();
    spansByLine = new Map();
    commentAt = new Map();
    let toks = [];
    try { toks = tokenize(src); } catch (e) { toks = []; }
    for (const t of toks) if (t.type === 'comment' && !commentAt.has(t.line)) commentAt.set(t.line, t.col);
    toks = toks.filter((t) => t.type !== 'indent' && t.type !== 'dedent' && t.type !== 'comment');
    for (let i = 0; i + 1 < toks.length; i++) {
      const t = toks[i];
      const nx = toks[i + 1];
      if (t.type === 'keyword' && t.text === 'def' && nx.type !== 'op') {
        const open = i + 2;
        if (toks[open]?.text !== '(') continue;
        const close = matchClose(toks, open);
        const parts = close > 0 ? splitArgs(toks, open, close) : [];
        const names = parts.map((p) => p.map((x) => x.text).join('').replace(/:[^=]*/, ''));
        fnDefs.set(nx.text, { line: t.line, sig: `(${names.join(', ')})` });
        continue;
      }
      if ((t.type === 'name' || t.type === 'builtin') && nx.type === 'op' && nx.text === '(') {
        const prev = toks[i - 1];
        if (prev && prev.type === 'op' && prev.text === '.') continue;
        if (prev && prev.type === 'keyword' && prev.text === 'def') continue;
        const close = matchClose(toks, i + 1);
        const ct = close > 0 ? toks[close] : null;
        const same = !!ct && ct.line === t.line;
        const lineLen = (srcLines[t.line - 1] || '').length;
        // full: the whole argument list is on this line, so every argument can be matched to its text
        const span = { name: t.text, s: t.col, e: same ? ct.col + 1 : lineLen, order: ct ? ct.line * 1e6 + ct.col : Infinity, args: [], full: same };
        if (same) {
          for (const p of splitArgs(toks, i + 1, close)) {
            const a = p[0];
            const b = p[p.length - 1];
            if (a.line !== t.line || b.line !== t.line) { span.full = false; continue; }
            const star = a.type === 'op' && (a.text === '*' || a.text === '**');
            const kw = p.length > 2 && (a.type === 'name' || a.type === 'builtin') && p[1].type === 'op' && p[1].text === '=' ? a.text : null;
            span.args.push({ s: a.col, e: b.col + b.text.length, kw, star });
          }
        }
        if (!spansByLine.has(t.line)) spansByLine.set(t.line, []);
        spansByLine.get(t.line).push(span);
      }
    }
    for (const arr of spansByLine.values()) arr.sort((x, y) => x.order - y.order);
  }

  /** The source line as shown in a strip: indentation and trailing comment removed, call replacements applied. */
  function renderLine(lineNo, repl = []) {
    const raw = srcLines[lineNo - 1] ?? '';
    const ind = raw.length - raw.trimStart().length;
    let end = commentAt.has(lineNo) ? commentAt.get(lineNo) : raw.length;
    while (end > ind && /\s/.test(raw[end - 1])) end--;
    const outer = repl.filter((r) => !repl.some((q) => q !== r && q.s <= r.s && q.e >= r.e && (q.s < r.s || q.e > r.e)))
      .slice().sort((a, b) => a.s - b.s);
    const pieces = [];
    let str = '';
    let pos = ind;
    const newest = repl[repl.length - 1];
    for (const r of outer) {
      if (r.s < pos || r.s >= end) continue;
      if (r.s > pos) { pieces.push({ o0: pos, o1: r.s, r0: str.length, kind: 'code' }); str += raw.slice(pos, r.s); }
      pieces.push({ o0: r.s, o1: r.e, r0: str.length, kind: 'val', len: r.text.length, newest: r === newest });
      str += r.text;
      pos = Math.min(r.e, end);
    }
    if (end > pos) { pieces.push({ o0: pos, o1: end, r0: str.length, kind: 'code' }); str += raw.slice(pos, end); }
    for (const p of pieces) p.r1 = p.r0 + (p.kind === 'val' ? p.len : p.o1 - p.o0);
    const map = (c) => {
      for (const p of pieces) {
        if (p.kind === 'code' && c >= p.o0 && c <= p.o1) return p.r0 + (c - p.o0);
        if (p.kind === 'val' && c === p.o0) return p.r0;
        if (p.kind === 'val' && c === p.o1) return p.r1;
      }
      return c <= ind ? 0 : str.length;
    };
    return { str, pieces, map };
  }

  // ------------------------------------------------------------------ running
  // A frame's "site": the line it runs or waits at, the call spans of that line already called in this pass (done),
  // the values that replaced finished calls (repl) and the call it is waiting for (active).
  const newSite = (line) => ({ line, done: [], repl: [], active: null });
  function addSeg(kind, text) {
    if (!text) return;
    const last = segs[segs.length - 1];
    if (last && last.kind === kind) last.text += text;
    else segs.push({ kind, text });
    segLen += text.length;
  }
  function intern(fr) {
    const res = new Array(fr.length);
    for (let i = 0; i < fr.length; i++) {
      const f = fr[i];
      const id = f.id ?? -1 - i;
      const old = frameCache.get(id);
      if (old && old.line === f.line && old.name === f.name && sameLocals(old.locals, f.locals || [])) res[i] = old;
      else {
        const nf = { id, name: f.name, line: f.line, locals: f.locals || [] };
        frameCache.set(id, nf);
        res[i] = nf;
      }
    }
    return res;
  }
  function pushEntry(e) {
    e.outLen = segLen;
    e.steps = lineSteps;
    e.calls = callCount;
    maxDepth = Math.max(maxDepth, e.frames.length);
    e.maxDepth = maxDepth;
    e.depth = e.frames.length;
    e.sites = e.frames.map((f) => siteMap.get(f.id) || null);
    hist.push(e);
  }
  /** The call span of `line` that a call event points at (minipy gives the call's position, so a function called
   *  under another name, h = f; h(3), is found too); `again` when it was already called in this pass (the line runs
   *  again, e.g. a loop body on its header line), which starts a new pass. */
  function findSpan(line, at, done) {
    const arr = spansByLine.get(line) || [];
    const k = at && at.line === line ? arr.findIndex((sp) => sp.s === at.col) : -1;
    return k >= 0 ? { span: arr[k], k, again: done.includes(k) } : { span: null, k: -1, again: false };
  }
  function mapArgs(span, args) {
    if (!span) return [];
    const res = [];
    let pos = 0;
    for (const a of span.args) {
      if (a.star) break;
      if (a.kw) { if (args.some((b) => b.name === a.kw)) res.push({ s: a.s, e: a.e, param: a.kw }); }
      else { const b = args[pos++]; if (b) res.push({ s: a.s, e: a.e, param: b.name }); }
    }
    return res;
  }

  /** Run the program until the next call, return or statement and record it. Returns 'ok' | 'wait' | 'end'. */
  function computeNext() {
    if (!run || ended) return 'end';
    if (run.status === 'waiting-input') return 'wait';
    for (let guard = 0; guard < 2000000; guard++) {
      const ev = run.step();
      if (ev.kind === 'output') { addSeg(ev.echo ? 'in' : ev.stderr ? 'err' : 'out', ev.text); continue; }
      if (ev.kind === 'input') { if (ev.wait || run.status === 'waiting-input') return 'wait'; continue; }
      if (ev.kind === 'line') {
        lineSteps++;
        const frames = intern(run.snapshot().frames);
        const top = frames[frames.length - 1];
        // a second statement on the same line (a = f(1); b = f(a), or a loop body written on its header line) keeps
        // the calls already made on that line, so the next call is matched to the next call text
        const prev = siteMap.get(top.id);
        siteMap.set(top.id, prev && prev.line === ev.line ? { ...prev, active: null } : newSite(ev.line));
        pushEntry({ kind: 'line', line: ev.line, frames });
        return 'ok';
      }
      if (ev.kind === 'call') {
        callCount++;
        const frames = intern(run.snapshot().frames);
        const d = Math.max(1, Math.min(ev.depth ?? frames.length - 1, frames.length - 1));
        const callee = frames[d];
        const caller = frames[d - 1];
        let site = siteMap.get(caller.id);
        if (!site || site.line !== ev.line) site = newSite(ev.line);
        const args = ev.args || [];
        const found = findSpan(ev.line, ev.span, site.done);
        const argMap = mapArgs(found.span, args);
        // argsKnown: every argument of the call text was matched, so a parameter without one got its default value
        // (not so for a call written over several lines, a call with *args, or a function called under another name)
        const argsKnown = !!(found.span && found.span.full && !found.span.args.some((q) => q.star));
        const shown = argsKnown ? argMap.map((m) => {
          const a = args.find((q) => q.name === m.param);
          const sa = found.span.args.find((q) => q.s === m.s);
          return `${sa && sa.kw ? `${sa.kw}=` : ''}${a ? short(a.value, 16) : '?'}`;
        }) : args.map((a) => short(a.value, 16));
        const text = `${ev.name}(${shown.join(', ')})`;
        const done = !found.span ? site.done : found.again ? [found.k] : [...site.done, found.k];
        siteMap.set(caller.id, { ...site, done, repl: found.again ? [] : site.repl, active: found.span });
        siteMap.set(callee.id, newSite(ev.defLine));
        const rec = {
          n: calls.length + 1, name: ev.name, args, line: ev.line, defLine: ev.defLine, frameId: callee.id, start: hist.length,
          end: null, value: null, unwound: false, endFrame: null, text, argMap, argsKnown, callerId: caller.id,
        };
        calls.push(rec);
        callStack.push(rec);
        callByFrame.set(callee.id, rec);
        pushEntry({ kind: 'call', line: ev.defLine, frames, call: rec });
        return 'ok';
      }
      if (ev.kind === 'return') {
        const rec = callStack.pop() || null;
        if (ev.unwind) {
          if (rec) {
            rec.unwound = true;
            rec.end = hist.length;
            const lastE = hist[hist.length - 1];
            rec.endFrame = lastE ? lastE.frames.find((f) => f.id === rec.frameId) || null : null;
          }
          continue;
        }
        const snap = intern(run.snapshot().frames);
        const d = Math.max(1, Math.min(ev.depth ?? snap.length - 1, snap.length - 1));
        const popped = snap[d];
        const frames = snap.slice(0, d);
        const caller = frames[frames.length - 1];
        let site = siteMap.get(caller.id) || newSite(ev.callLine);
        if (site.active) site = { ...site, repl: [...site.repl, { s: site.active.s, e: site.active.e, text: short(ev.value, 24) }], active: null };
        siteMap.set(caller.id, site);
        const r = rec && rec.frameId === popped.id ? rec : callByFrame.get(popped.id) || null;
        if (r) { r.end = hist.length; r.value = ev.value; r.endFrame = popped; }
        pushEntry({ kind: 'return', line: site.line, frames, ret: { name: ev.name, value: ev.value, line: ev.line, rec: r, frame: popped, site: siteMap.get(popped.id) || newSite(ev.line) } });
        return 'ok';
      }
      if (ev.kind === 'exception') {
        const err = ev.error;
        const frames = intern(run.snapshot().frames);
        // StepLimit is this sim's own brake, not a Python exception: say so (on a line of its own) instead of printing
        // a Python-like traceback; a traceback follows the output straight away, as in python3
        const last = segs[segs.length - 1];
        if (err.type === 'StepLimit' && last && !last.text.endsWith('\n')) addSeg('out', '\n');
        if (err.type === 'StepLimit') addSeg('err', `${stepLimitText(err, true)}\n`);
        else addSeg('err', String(err.traceback || `${err.type}: ${err.message}`).replace(/\n*$/, '\n'));
        for (const rec of callStack) if (rec.end == null) { rec.unwound = true; rec.end = hist.length; rec.endFrame = frames.find((f) => f.id === rec.frameId) || null; }
        callStack = [];
        pushEntry({ kind: 'error', line: err.line, frames, error: err });
        ended = true;
        return 'ok';
      }
      if (ev.kind === 'done') {
        const frames = intern(run.snapshot().frames);
        pushEntry({ kind: 'done', line: null, frames });
        ended = true;
        return 'ok';
      }
    }
    return 'end';
  }

  /** Compile the code in the panel and stop before its first statement. */
  function reset() {
    stopPlay();
    cancelBusy();
    clearTimeout(editTimer);
    out.cancelPrompt();
    waitingInput = false;
    hist = []; cur = 0; ended = false; segs = []; segLen = 0;
    calls = []; callByFrame = new Map(); callStack = []; frameCache = new Map(); siteMap = new Map();
    lineSteps = 0; callCount = 0; maxDepth = 1; anim = null; consoleKey = ''; tableKey = '';
    predictions.clear();
    const src = cp.value;
    analyseSource(src);
    const c = compile(src, { filename: 'main.py' });
    if (!c.ok) { compileError = c.error; run = null; render(); return; }
    compileError = null;
    run = createRun(c.program, { echoInput: true, maxSteps: MAX_STEPS });
    computeNext();
    render();
  }

  // ------------------------------------------------------------------ navigation
  function goTo(k, animate = false, user = false) {
    const prev = cur;
    cur = Math.max(0, Math.min(k, hist.length - 1));
    anim = null;
    if (animate && cur === prev + 1 && !reduceMotion) startAnim(hist[cur]);
    render();
    if (user) announce(statusPlain());
  }
  function needsPrediction(e) {
    return predictOn && e && e.kind === 'call' && !predictions.has(e.call.n);
  }
  function stepForward(user = false) {
    if (busy || waitingInput) return false;
    if (cur < hist.length - 1) {
      goTo(cur + 1, true, user);
      if (user && needsPrediction(hist[cur])) focusPrediction();
      return true;
    }
    if (ended || !run) return false;
    const r = computeNext();
    if (r === 'wait') { askInput(() => stepForward(user)); return false; }
    if (r !== 'ok') return false;
    goTo(hist.length - 1, true, user);
    if (user && needsPrediction(hist[cur])) focusPrediction();
    return true;
  }
  function stepBack() {
    if (busy || cur <= 0) return;
    stopPlay();
    goTo(cur - 1, false, true);
  }
  /** Look ahead (computing more steps when needed, in time slices) for the first entry after the cursor that matches. */
  function seek(pred) {
    if (busy || waitingInput || !hist.length) return;
    stopPlay();
    let k = cur + 1;
    const slice = () => {
      busyTimer = 0;
      const t0 = performance.now();
      for (;;) {
        while (k < hist.length) {
          if (pred(hist[k], k)) { setBusy(false); goTo(k, k === cur + 1, true); return; }
          k++;
        }
        if (ended) { setBusy(false); goTo(hist.length - 1, hist.length - 1 === cur + 1, true); return; }
        const r = computeNext();
        if (r === 'wait') { setBusy(false); goTo(hist.length - 1, false, false); askInput(() => seek(pred)); return; }
        if (r !== 'ok') { setBusy(false); goTo(hist.length - 1, false, true); return; }
        if (performance.now() - t0 > 14) { setBusy(true); busyTimer = setTimeout(slice, 0); return; }
      }
    };
    slice();
  }
  function stepOver() {
    const e = hist[cur];
    if (!e) return;
    const d = e.depth;
    seek((x) => x.kind === 'done' || x.kind === 'error' || (x.kind === 'line' && x.depth <= d) || (x.kind === 'return' && x.depth < d));
  }
  function stepOut() {
    const e = hist[cur];
    if (!e || e.depth <= 1) return;
    const d = e.depth;
    seek((x) => x.kind === 'done' || x.kind === 'error' || (x.kind === 'return' && x.depth < d));
  }
  function toEnd() { seek(() => false); }
  function setBusy(on) {
    busy = on;
    renderButtons();
    if (on) { status.classList.remove('is-err'); status.innerHTML = `<b>${esc(T('Running…', 'Menjalankan…'))}</b> ${hist.length} ${esc(T('steps so far', 'langkah sejauh ini'))}`; }
  }
  function cancelBusy() { clearTimeout(busyTimer); busyTimer = 0; busy = false; }

  function togglePlay() { if (playing) { stopPlay(); announce(T('Paused.', 'Dijeda.')); } else startPlay(); }
  function startPlay() {
    if (busy || waitingInput || !hist.length) return;
    if (finished()) goTo(0);
    playing = true;
    renderButtons();
    tick();
  }
  function stopPlay() {
    playing = false;
    clearTimeout(timer);
    timer = 0;
    renderButtons();
  }
  function tick() {
    timer = 0;
    if (!playing || destroyed) return;
    const moved = stepForward(false);
    if (!moved) { stopPlay(); return; }
    if (needsPrediction(hist[cur])) { stopPlay(); focusPrediction(); announce(statusPlain()); return; }
    if (finished()) { stopPlay(); announce(statusPlain()); return; }
    timer = setTimeout(tick, interval());
  }

  function askInput(then) {
    waitingInput = true;
    renderConsole(true);
    renderButtons();
    status.innerHTML = `<b>${esc(T('The program is waiting for input().', 'Program menunggu input().'))}</b> ${esc(T('Type a value in the console and press Enter.', 'Ketik nilai di konsol lalu tekan Enter.'))}`;
    const myRun = run;
    out.prompt({ echo: false, focus: true, placeholder: T('type + Enter', 'ketik + Enter'),
      ariaLabel: T('The program is waiting for input: type a value and press Enter', 'Program menunggu masukan: ketik nilai lalu tekan Enter') })
      .then((v) => {
        waitingInput = false;
        if (v == null || destroyed || run !== myRun || !myRun || myRun.status !== 'waiting-input') { renderButtons(); return; }
        myRun.provideInput(String(v).replace(/\r?\n[\s\S]*$/, ''));
        consoleKey = '';
        then();
      });
    announce(T('The program is waiting for input. Type a value in the console and press Enter.', 'Program menunggu masukan. Ketik nilai di konsol lalu tekan Enter.'));
  }

  // ------------------------------------------------------------------ editing and presets
  function onCodeEdit() {
    stopPlay();
    cancelBusy();
    edited = true;
    restoreBtn.disabled = false;
    clearTimeout(editTimer);
    status.classList.remove('is-err');
    status.textContent = T('Editing… the program restarts when you stop typing.', 'Mengedit… program dimulai ulang saat kamu berhenti mengetik.');
    editTimer = setTimeout(() => { if (!destroyed) reset(); }, 500);
  }
  function loadPreset(key) {
    preset = PRESETS.find((p) => p.key === key) || PRESETS[0];
    edited = false;
    restoreBtn.disabled = true;
    if (progSel.value !== preset.key) progSel.value = preset.key;
    cp.value = preset.code[lang];
    tip.innerHTML = `<b>${esc(T('Look for:', 'Perhatikan:'))}</b> ${esc(preset.tip[lang])}`;
    reset();
  }

  // ------------------------------------------------------------------ predictions
  function judge(text, view) {
    const p = String(text).trim();
    const repr = String(view.repr);
    if (p === repr) return 'ok';
    if (view.type === 'str') {
      const inner = repr.slice(1, -1);
      if (p === `"${inner}"` || p === `'${inner}'`) return 'ok';
      // quotes may be left out ('Tuntas' == Tuntas), but not for text that looks like a number or None/True/False:
      // there the quotes are the whole difference between str and the other type
      if (p === inner) return /^[-+]?(\d[\d_]*\.?\d*|\.\d+)([eE][-+]?\d+)?$|^(None|True|False)$/.test(inner) ? 'close' : 'ok';
    }
    if ((view.type === 'int' || view.type === 'float') && p) {
      const n = Number(p.replace(/,/g, '.'));
      if (Number.isFinite(n) && n === Number(repr)) return 'close';
    }
    return 'bad';
  }
  /** Score of the predictions judged up to step k (a call is judged when its frame is popped). */
  function predictionScore(k = cur) {
    let right = 0;
    let judged = 0;
    for (const [n, pr] of predictions) {
      if (pr.skipped) continue;
      const rec = calls[n - 1];
      if (!rec || rec.end == null || rec.end > k) continue;
      judged++;
      if (!rec.unwound && judge(pr.text, rec.value) === 'ok') right++;
    }
    return { right, judged };
  }
  function savePrediction() {
    const e = hist[cur];
    if (!e || e.kind !== 'call') return;
    const v = predIn.value.trim();
    if (!v) { predIn.focus(); return; }
    predictions.set(e.call.n, { text: v, skipped: false });
    renderPredict();
    bStep.focus({ preventScroll: true });
    announce(T(`Prediction saved: ${v}. Press Step to continue.`, `Tebakan disimpan: ${v}. Tekan Langkah untuk melanjutkan.`));
  }
  function skipPrediction() {
    const e = hist[cur];
    if (!e || e.kind !== 'call') return;
    predictions.set(e.call.n, { text: '', skipped: true });
    renderPredict();
    bStep.focus({ preventScroll: true });
  }
  function focusPrediction() {
    requestAnimationFrame(() => { if (!destroyed && !pred.hidden && !predRow.hidden) predIn.focus({ preventScroll: true }); });
  }
  function renderPredict() {
    pred.hidden = !predictOn;
    if (!predictOn) return;
    const e = hist[cur];
    predV.className = 'fcs-pred-v';
    predV.innerHTML = '';
    const sc = predictionScore();
    const score = sc.judged ? `${T('Score', 'Skor')}: ${sc.right} / ${sc.judged} ${T('right', 'benar')}.` : '';
    if (e && e.kind === 'call') {
      const rec = e.call;
      const pr = predictions.get(rec.n);
      predQ.innerHTML = lang === 'id'
        ? `Tebak: apa nilai balik dari <code>${esc(rec.text)}</code>?`
        : `Predict: what will <code>${esc(rec.text)}</code> return?`;
      predRow.hidden = false;
      if (document.activeElement !== predIn) predIn.value = pr && !pr.skipped ? pr.text : '';
      if (pr) predV.textContent = pr.skipped ? T('Skipped. Press Step to continue.', 'Dilewati. Tekan Langkah untuk melanjutkan.') : T('Saved. Step on to see what the call really returns.', 'Tersimpan. Lanjutkan langkah untuk melihat nilai balik yang sebenarnya.');
      return;
    }
    predRow.hidden = true;
    const rec = e && e.kind === 'return' ? e.ret.rec : null;
    const pr = rec ? predictions.get(rec.n) : null;
    if (rec && pr && !pr.skipped) {
      const v = rec.value;
      const j = judge(pr.text, v);
      predQ.innerHTML = `${esc(T('You predicted', 'Tebakanmu'))} <code>${esc(rec.text)}</code> → <code>${esc(pr.text)}</code>`;
      predV.classList.add(j);
      if (j === 'ok') predV.innerHTML = `${esc(T('Right! Python returned', 'Benar! Python mengembalikan'))} <code>${esc(v.repr)}</code>. ${esc(score)}`;
      else if (j === 'close') {
        const hint = v.type === 'float'
          ? T('Same number, but Python gives a float: / always makes a float, and int with float gives float.', 'Bilangannya sama, tetapi Python memberi float: operator / selalu menghasilkan float, dan int dengan float menghasilkan float.')
          : v.type === 'int'
            ? T('Same number, but here Python gives an int, so it is written without .0.', 'Bilangannya sama, tetapi di sini Python memberi int, jadi ditulis tanpa .0.')
            : T('Same characters, but Python returned a str (text, written with quotes), not a number or None/True/False.', 'Karakternya sama, tetapi Python mengembalikan str (teks, ditulis dengan tanda petik), bukan bilangan atau None/True/False.');
        predV.innerHTML = `${esc(T('Almost: Python returned', 'Hampir: Python mengembalikan'))} <code>${esc(v.repr)}</code> (${esc(v.type)}). ${esc(hint)} ${esc(score)}`;
      } else predV.innerHTML = `${esc(T('Not this time: Python returned', 'Belum tepat: Python mengembalikan'))} <code>${esc(v.repr)}</code>. ${esc(score)}`;
      return;
    }
    predQ.textContent = T('Predict mode is on: at each call the sim stops and asks what the call will return. The answer is checked when the frame is popped.',
      'Mode tebak aktif: di setiap pemanggilan simulasi berhenti dan menanyakan nilai balik pemanggilan itu. Jawabanmu diperiksa saat bingkainya diambil.');
    predV.textContent = score;
  }

  // ------------------------------------------------------------------ rendering (DOM)
  function render() {
    renderButtons();
    renderStatus();
    renderCode();
    renderConsole(false);
    renderTable();
    renderPredict();
    renderDesc();
    sizeCanvas();
    draw();
  }
  function renderButtons() {
    const has = hist.length > 0 && !compileError;
    const atEnd = !has || (ended && cur === hist.length - 1);
    const block = busy || waitingInput;
    bBack.disabled = block || cur <= 0;
    bStep.disabled = block || atEnd;
    bOver.disabled = block || atEnd;
    bOut.disabled = block || atEnd || !hist[cur] || hist[cur].depth <= 1;
    bEnd.disabled = block || atEnd;
    bRun.disabled = block || !has;
    bRun.textContent = playing ? T('❚❚ Pause', '❚❚ Jeda') : (has && atEnd ? T('▶ Replay', '▶ Ulangi') : T('▶ Run', '▶ Jalankan'));
    bRun.setAttribute('aria-label', playing ? T('Pause', 'Jeda') : T('Run: step automatically', 'Jalankan: melangkah otomatis'));
    scrubIn.disabled = block || hist.length <= 1;
    scrubIn.max = String(Math.max(0, hist.length - 1));
    scrubIn.value = String(cur);
    count.textContent = has ? `${T('Step', 'Langkah')} ${cur}${ended ? ` / ${hist.length - 1}` : ''}` : `${T('Step', 'Langkah')} 0`;
    const e = hist[cur];
    spDepth.textContent = e ? `${e.depth} ${framesWord(e.depth)} · ${T('max', 'maks')} ${e.maxDepth}` : '';
  }

  function changedList(k) {
    if (k <= 0) return [];
    const a = hist[k - 1];
    const b = hist[k];
    const prev = new Map(a.frames.map((f) => [f.id, f]));
    const res = [];
    for (const f of b.frames) {
      const pf = prev.get(f.id);
      if (!pf || pf === f) continue;
      const pm = new Map(pf.locals.map((l) => [l.name, l.value]));
      for (const l of f.locals) {
        const pv = pm.get(l.name);
        if (!pv || pv.repr !== l.value.repr || pv.id !== l.value.id) res.push({ fid: f.id, name: l.name, value: l.value, fname: f.name });
      }
    }
    return res;
  }
  const whereName = (name) => (name === '<module>' ? T('the main program', 'program utama') : name);
  /** minipy's StepLimit is this sim's brake, not a Python exception (python3 has no such limit). */
  function stepLimitText(er, forConsole) {
    const what = er.limitKind === 'iterations'
      ? T('one statement repeated the loop inside it too many times', 'satu pernyataan mengulang perulangan di dalamnya terlalu banyak kali')
      : T(`the program ran ${er.limit ?? MAX_STEPS} statements`, `program sudah menjalankan ${er.limit ?? MAX_STEPS} pernyataan`);
    if (forConsole) {
      return T(`[Stopped by this sim, not by Python: ${what}, the limit of this sim (python3 has no such limit). Is there an endless loop?]`,
        `[Dihentikan oleh simulasi ini, bukan oleh Python: ${what}, batas simulasi ini (python3 tidak punya batas ini). Adakah perulangan tanpa akhir?]`);
    }
    return `${what}, ${T('the limit of this sim. Is there an endless loop?', 'batas simulasi ini. Adakah perulangan tanpa akhir?')}`;
  }
  function statusHTML() {
    if (compileError) {
      const er = compileError;
      return `<b>${esc(er.type)}</b> ${esc(T('on line', 'di baris'))} ${er.line}: ${esc(er.message)}. ${esc(T('Python checks the whole file before running, so no line has run yet.', 'Python memeriksa seluruh berkas sebelum menjalankannya, jadi belum ada baris yang berjalan.'))}`;
    }
    const e = hist[cur];
    if (!e) return '';
    const top = e.frames[e.frames.length - 1];
    const stackTxt = `${T('Stack', 'Tumpukan')}: ${e.depth} ${framesWord(e.depth)}.`;
    if (e.kind === 'line') {
      const where = top && top.name !== '<module>' ? `${esc(T('in', 'di dalam'))} <code>${esc(top.name)}</code>` : esc(T('in the main program', 'di program utama'));
      const ch = changedList(cur).slice(0, 3).map((c) => `<code>${esc(c.name)} = ${esc(short(c.value, 22))}</code>`).join(', ');
      const pre = cur === 0 ? `${esc(T('Ready.', 'Siap.'))} ` : '';
      const chTxt = ch ? ` ${esc(T('Just changed:', 'Baru berubah:'))} ${ch}.` : '';
      return `${pre}${esc(T('Line', 'Baris'))} <b>${e.line}</b> ${esc(T('runs next', 'dijalankan berikutnya'))} ${where}.${chTxt}`;
    }
    if (e.kind === 'call') {
      const r = e.call;
      const isDefault = (a) => r.argsKnown && !r.argMap.some((m) => m.param === a.name);
      const params = r.args.map((a) => `${a.name} = ${short(a.value, 18)}${isDefault(a) ? ` (${T('default', 'bawaan')})` : ''}`).join(', ');
      const pTxt = params
        ? ` ${esc(T('The arguments are copied into the parameters:', 'Argumen disalin ke parameter:'))} <code>${esc(params)}</code>.`
        : ` ${esc(T('No arguments: the function has no parameters.', 'Tanpa argumen: fungsi ini tidak punya parameter.'))}`;
      return `<b>${esc(T('Call', 'Panggil'))} <code>${esc(r.text)}</code></b>: ${esc(T('a new frame is pushed on top of the stack.', 'bingkai baru ditaruh di puncak tumpukan.'))}${pTxt} ${esc(stackTxt)}`;
    }
    if (e.kind === 'return') {
      const r = e.ret;
      const retLine = (srcLines[r.line - 1] || '').trim();
      const fellOff = r.value.type === 'NoneType' && !/^return\b/.test(retLine);
      const noneTxt = fellOff ? ` ${esc(T('(it ends without a return statement, so it gives back None)', '(fungsi selesai tanpa pernyataan return, jadi mengembalikan None)'))}` : '';
      return `<b><code>${esc(r.name)}</code> ${esc(T('returns', 'mengembalikan'))} <code>${esc(short(r.value, 30))}</code></b>${noneTxt}. ${esc(T('Its frame is popped, and the value goes back to line', 'Bingkainya diambil dari tumpukan, dan nilainya kembali ke baris'))} ${e.line} ${esc(T('in', 'di'))} ${esc(whereName(top.name))}, ${esc(T('where the call was.', 'tempat pemanggilannya.'))} ${esc(stackTxt)}`;
    }
    if (e.kind === 'done') {
      return `<b>${esc(T('Program finished.', 'Program selesai.'))}</b> ${e.steps} ${esc(T('statements', 'pernyataan'))}, ${e.calls} ${esc(T(e.calls === 1 ? 'call' : 'calls', 'pemanggilan'))}, ${esc(T('at most', 'paling banyak'))} ${e.maxDepth} ${esc(framesWord(e.maxDepth))} ${esc(T('on the stack.', 'di tumpukan.'))}`;
    }
    const er = e.error;
    if (er.type === 'StepLimit') return `<b>${esc(T('Stopped', 'Dihentikan'))}</b>: ${esc(stepLimitText(er, false))}`;
    let hint = T('The program stopped. The traceback in the console lists the frames that were on the stack, oldest first.', 'Program berhenti. Traceback di konsol mencantumkan bingkai yang ada di tumpukan, dari yang paling lama.');
    if (er.type === 'UnboundLocalError') {
      const m = /local variable '([^']+)'/.exec(er.message);
      const nm = m ? m[1] : '?';
      hint = T(`${nm} is assigned inside this function, so Python treats it as a local variable for the whole function. It has no value yet when this line reads it, and the global ${nm} is not used.`,
        `${nm} diisi di dalam fungsi ini, sehingga Python menganggapnya variabel lokal untuk seluruh fungsi. Variabel itu belum punya nilai saat baris ini membacanya, dan ${nm} global tidak dipakai.`);
    } else if (er.type === 'RecursionError') {
      hint = T('Each call pushes a frame. Without a base case that stops the calls, the stack reaches Python\'s limit of 1000 frames.', 'Setiap pemanggilan menaruh satu bingkai. Tanpa kasus dasar yang menghentikan pemanggilan, tumpukan mencapai batas Python, yaitu 1000 bingkai.');
    }
    return `<b>${esc(er.type)}</b> ${esc(T('on line', 'di baris'))} ${er.line} ${esc(T('in', 'di'))} ${esc(whereName(top ? top.name : '<module>'))}: ${esc(er.message)}. ${esc(hint)}`;
  }
  function renderStatus() {
    if (busy) return;
    const e = hist[cur];
    status.classList.toggle('is-err', !!compileError || (!!e && e.kind === 'error'));
    status.innerHTML = statusHTML();
  }
  function statusPlain() {
    const d = document.createElement('div');
    d.innerHTML = statusHTML();
    return d.textContent;
  }

  function renderCode() {
    if (compileError) {
      const er = compileError;
      const m = { line: er.line, kind: 'error', note: er.type };
      if (er.col) { m.col = Math.max(0, er.col - 1); if (er.endCol && er.endLine === er.line && er.endCol > er.col) m.endCol = er.endCol - 1; }
      cp.setActiveLine(null);
      cp.setMarks([m]);
      return;
    }
    const e = hist[cur];
    if (!e) { cp.setActiveLine(null); cp.setMarks([]); return; }
    const marks = [];
    const seen = new Set();
    for (let k = 0; k < cur; k++) if (hist[k].kind === 'line') seen.add(hist[k].line);
    const special = new Set();
    const n = e.frames.length;
    const waits = new Map();
    for (let i = 0; i < n - 1; i++) {
      const s = e.sites[i];
      const ln = s ? s.line : e.frames[i].line;
      if (!ln) continue;
      special.add(ln);
      const w = waits.get(ln);
      if (w) w.count++;
      else waits.set(ln, { name: e.frames[i + 1].name, count: 1 });
    }
    for (const [ln, w] of waits) marks.push({ line: ln, kind: 'match', note: `${T('waiting for', 'menunggu')} ${w.name}${w.count > 1 ? ` ×${w.count}` : ''}` });
    let active = null;
    if (e.kind === 'line') active = e.line;
    else if (e.kind === 'call') {
      active = e.call.defLine;
      marks.push({ line: e.call.defLine, kind: 'visited', note: `${T('call', 'panggilan')} #${e.call.n}` });
      special.add(e.call.defLine);
    } else if (e.kind === 'return') {
      active = e.line;
      marks.push({ line: e.ret.line, kind: 'done', note: `${T('returned', 'mengembalikan')} ${short(e.ret.value, 18)}` });
      special.add(e.ret.line);
    } else if (e.kind === 'error') {
      marks.push({ line: e.error.line, kind: 'error', note: e.error.type === 'StepLimit' ? T('stopped: step limit', 'dihentikan: batas langkah') : e.error.type });
      special.add(e.error.line);
    }
    for (const ln of seen) if (!special.has(ln) && ln !== active) marks.push({ line: ln, kind: 'visited' });
    cp.setMarks(marks);
    cp.setActiveLine(active);
  }

  function renderConsole(all) {
    const len = all ? segLen : (hist[cur] ? hist[cur].outLen : 0);
    const key = `${all ? 'a' : 'e'}${len}|${segs.length}`;
    if (key === consoleKey) return;
    consoleKey = key;
    const res = [];
    let nTot = 0;
    for (const s of segs) {
      if (nTot >= len) break;
      const take = Math.min(s.text.length, len - nTot);
      res.push({ kind: s.kind, text: s.text.slice(0, take) });
      nTot += take;
    }
    if (compileError) res.push({ kind: 'err', text: String(compileError.traceback || `${compileError.type}: ${compileError.message}`).replace(/\n*$/, '\n') });
    out.set(res);
  }

  /** The frame of call `rec` as it is at entry index k (null if it is not known). */
  function frameAt(rec, k) {
    if (rec.end != null && rec.end <= k) return rec.endFrame;
    const e = hist[k];
    return e ? e.frames.find((f) => f.id === rec.frameId) || rec.endFrame : rec.endFrame;
  }
  function renderTable() {
    const e = hist[cur];
    const shown = e ? calls.filter((r) => r.start <= cur) : [];
    callsCount.textContent = shown.length ? `${shown.length} ${T(shown.length === 1 ? 'call' : 'calls', 'pemanggilan')}` : '';
    let html;
    if (!shown.length) {
      html = `<p class="fcs-empty">${esc(T('No function has been called yet. Every call adds a row here: the arguments it received, its local variables and the value it returned.', 'Belum ada fungsi yang dipanggil. Setiap pemanggilan menambah satu baris di sini: argumen yang diterima, variabel lokalnya, dan nilai yang dikembalikan.'))}</p>`;
    } else {
      const onStack = new Set(e.frames.map((f) => f.id));
      const topId = e.frames[e.frames.length - 1].id;
      const groups = new Map();
      for (const r of shown) { if (!groups.has(r.name)) groups.set(r.name, []); groups.get(r.name).push(r); }
      const parts = [];
      let gi = 0;
      for (const [name, recs] of groups) {
        const capId = `fcs-cap-${uid}-${gi++}`;
        const params = [];
        for (const r of recs) for (const a of r.args) if (!params.includes(a.name)) params.push(a.name);
        const locs = [];
        const list = recs.slice(0, MAX_TABLE_ROWS);
        const states = list.map((r) => frameAt(r, cur));
        for (const f of states) if (f) for (const l of f.locals) if (!params.includes(l.name) && !locs.includes(l.name)) locs.push(l.name);
        const sig = fnDefs.get(name)?.sig || '';
        let h = `<div><p class="fcs-tcap" id="${capId}">${esc(name)}${esc(sig)}<small>${recs.length} ${esc(T(recs.length === 1 ? 'call' : 'calls', 'pemanggilan'))}</small></p>`
          + `<div class="fcs-tw"><table class="fcs-tt" aria-labelledby="${capId}"><thead><tr>`
          + `<th scope="col">#</th><th scope="col">${esc(T('Call', 'Pemanggilan'))}</th>`
          + params.map((p) => `<th scope="col" class="p">${esc(p)}</th>`).join('')
          + locs.map((p) => `<th scope="col" class="l">${esc(p)}</th>`).join('')
          + `<th scope="col">${esc(T('Returned', 'Nilai balik'))}</th></tr></thead><tbody>`;
        list.forEach((r, i) => {
          const f = states[i];
          const vals = new Map(f ? f.locals.map((l) => [l.name, l.value]) : []);
          const argVals = new Map(r.args.map((a) => [a.name, a.value]));
          const done = r.end != null && r.end <= cur;
          const cls = done ? (r.start === cur ? 'is-new' : '') : (r.frameId === topId ? 'is-top' : onStack.has(r.frameId) ? 'is-on' : '');
          const cell = (v) => (v ? `<td title="${esc(v.repr)}">${esc(short(v, 20))}</td>` : '<td></td>');
          let ret;
          if (done && r.unwound) ret = `<td class="err">✕ ${esc(T('stopped by an error', 'dihentikan galat'))}</td>`;
          else if (done) ret = `<td class="ret" title="${esc(r.value.repr)}">${esc(short(r.value, 20))}</td>`;
          else ret = `<td class="run">${esc(r.frameId === topId ? T('running…', 'berjalan…') : T('waiting…', 'menunggu…'))}</td>`;
          const label = T(`Go to call ${r.n}: ${r.text}`, `Ke pemanggilan ${r.n}: ${r.text}`);
          h += `<tr class="${cls}"><td><button type="button" class="fcs-go" data-entry="${r.start}" data-n="${r.n}" aria-label="${esc(label)}">${r.n}</button></td>`
            + `<td title="${esc(r.text)}">${esc(cut(r.text, 34))}</td>`
            + params.map((p) => cell(vals.get(p) || argVals.get(p))).join('')
            + locs.map((p) => cell(vals.get(p))).join('')
            + `${ret}</tr>`;
        });
        if (recs.length > list.length) h += `<tr><td class="more" colspan="${params.length + locs.length + 3}">… ${recs.length - list.length} ${esc(T('more calls not shown', 'pemanggilan lagi tidak ditampilkan'))}</td></tr>`;
        h += '</tbody></table></div></div>';
        parts.push(h);
      }
      html = parts.join('');
    }
    if (html === tableKey) return;
    const focused = callsBody.contains(document.activeElement) ? document.activeElement.getAttribute('data-n') : null;
    tableKey = html;
    callsBody.innerHTML = html;
    if (focused) callsBody.querySelector(`.fcs-go[data-n="${focused}"]`)?.focus({ preventScroll: true });
  }
  callsBody.addEventListener('click', (ev) => {
    const b = ev.target.closest?.('.fcs-go');
    if (!b) return;
    stopPlay();
    goTo(Number(b.dataset.entry), false, true);
  });

  function renderDesc() {
    const e = hist[cur];
    if (!e) { desc.textContent = compileError ? `${compileError.type}: ${compileError.message}` : ''; return; }
    const n = e.frames.length;
    const parts = [`${T('The stack has', 'Tumpukan berisi')} ${n} ${framesWord(n)}.`];
    const describe = (f, i) => {
      const s = e.sites[i];
      const head = i === 0 ? T('Main program', 'Program utama') : f.name;
      const where = i === n - 1
        ? (e.kind === 'done' ? T('finished', 'selesai') : `${T('running', 'berjalan')}${e.line ? `, ${T('line', 'baris')} ${e.line}` : ''}`)
        : `${T('waiting at line', 'menunggu di baris')} ${s ? s.line : f.line} ${T('for', 'untuk')} ${e.frames[i + 1].name}`;
      const vars = f.locals.filter((l) => !(i === 0 && l.value.type === 'function')).slice(0, 8).map((l) => `${l.name} = ${short(l.value, 24)}`).join('; ');
      return `${head} (${where})${vars ? `: ${vars}` : ''}.`;
    };
    const idx = n <= 6 ? [...Array(n).keys()] : [0, n - 3, n - 2, n - 1];
    for (let j = idx.length - 1; j >= 0; j--) parts.push(`${j === idx.length - 1 ? T('Top', 'Atas') : idx[j] === 0 ? T('Bottom', 'Bawah') : T('Below', 'Di bawahnya')}: ${describe(e.frames[idx[j]], idx[j])}`);
    if (e.kind === 'return') parts.push(`${T('Just popped', 'Baru diambil')}: ${e.ret.name} ${T('returned', 'mengembalikan')} ${short(e.ret.value, 30)}.`);
    desc.textContent = parts.join(' ');
  }

  // ------------------------------------------------------------------ canvas size
  function sizeCanvas() {
    const wide = main.classList.contains('is-wide');
    let h;
    if (wide) {
      // as tall as the code + console column
      const lh = codeWrap.getBoundingClientRect().height + 12 + conWrap.getBoundingClientRect().height;
      let extra = spHead.offsetHeight + keyHint.offsetHeight + 8 + 2;
      if (!pred.hidden) extra += pred.offsetHeight + 8;
      h = Math.round(Math.max(380, Math.min(860, lh - extra)));
    } else {
      const w = cw.clientWidth || 360;
      h = Math.round(Math.max(360, Math.min(470, w * 1.02)));
    }
    if (Math.abs(h - lastH) > 1) { lastH = h; cw.style.height = `${h}px`; }
  }
  const ro = new ResizeObserver(() => {
    if (destroyed) return;
    const wide = main.clientWidth >= 760;
    if (wide !== main.classList.contains('is-wide')) { main.classList.toggle('is-wide', wide); arrange(wide); }
    sizeCanvas();
    requestAnimationFrame(() => { if (!destroyed) draw(); });
  });
  ro.observe(main);
  ro.observe(codeWrap);
  ro.observe(conWrap);
  const roCanvas = new ResizeObserver(() => { if (!destroyed) draw(); });
  roCanvas.observe(cw);

  // ------------------------------------------------------------------ canvas drawing
  const S = { strip: 25, head: 23, row: 27, cells: 44, padB: 6, gap: 8, top: 10, bot: 10, more: 24, empty: 22, ghostBody: 34, mini: 26 };
  function setFont(ctx, px, family = MONO, weight = 400) { ctx.font = `${weight} ${px}px ${family}`; }
  function rr(ctx, x, y, w, h, r) {
    const q = Math.max(0, Math.min(r, w / 2, h / 2));
    ctx.beginPath();
    ctx.moveTo(x + q, y);
    ctx.arcTo(x + w, y, x + w, y + h, q);
    ctx.arcTo(x + w, y + h, x, y + h, q);
    ctx.arcTo(x, y + h, x, y, q);
    ctx.arcTo(x, y, x + w, y, q);
    ctx.closePath();
  }
  function fitText(ctx, text, maxW) {
    const t = String(text);
    if (ctx.measureText(t).width <= maxW) return t;
    let lo = 0;
    let hi = t.length;
    while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (ctx.measureText(t.slice(0, mid) + '…').width <= maxW) lo = mid; else hi = mid - 1; }
    return lo > 0 ? t.slice(0, lo) + '…' : '…';
  }
  function tint(hex, a) {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
  }
  function arrowHead(ctx, x, y, ang, size = 7) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - size * Math.cos(ang - 0.45), y - size * Math.sin(ang - 0.45));
    ctx.lineTo(x - size * Math.cos(ang + 0.45), y - size * Math.sin(ang + 0.45));
    ctx.closePath();
    ctx.fill();
  }
  function icon(ctx, kind, x, y, col) {
    ctx.fillStyle = col;
    ctx.strokeStyle = col;
    if (kind === 'run') { ctx.beginPath(); ctx.moveTo(x, y - 5); ctx.lineTo(x + 8, y); ctx.lineTo(x, y + 5); ctx.closePath(); ctx.fill(); }
    else if (kind === 'wait') { ctx.fillRect(x, y - 5, 3, 10); ctx.fillRect(x + 5, y - 5, 3, 10); }
    else if (kind === 'err') { ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - 4); ctx.lineTo(x + 8, y + 4); ctx.moveTo(x + 8, y - 4); ctx.lineTo(x, y + 4); ctx.stroke(); }
    else if (kind === 'done') { ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 3, y + 4); ctx.lineTo(x + 9, y - 4); ctx.stroke(); }
    else if (kind === 'ret') { ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(x + 8, y - 4); ctx.lineTo(x + 8, y + 1); ctx.lineTo(x + 1, y + 1); ctx.stroke(); arrowHead(ctx, x, y + 1, Math.PI, 5); }
  }

  /** Rows of a frame card (functions of the main program are folded into one row). */
  function rowsOf(e, i) {
    const f = e.frames[i];
    const rec = i > 0 ? callByFrame.get(f.id) : null;
    const pset = new Set(rec ? rec.args.map((a) => a.name) : []);
    const rows = [];
    const fns = [];
    for (const l of f.locals) {
      if (i === 0 && l.value.type === 'function') { fns.push(l.name); continue; }
      rows.push({ name: l.name, value: l.value, param: pset.has(l.name) });
    }
    if (fns.length) rows.unshift({ fns });
    if (e.kind === 'error' && i === e.frames.length - 1 && e.error.type === 'UnboundLocalError') {
      const m = /local variable '([^']+)'/.exec(e.error.message);
      if (m && !rows.some((r) => r.name === m[1])) rows.push({ name: m[1], unbound: true });
    }
    return rows;
  }

  function layout(e, W, H) {
    const n = e.frames.length;
    const cardX = 8;
    const cardW = Math.max(120, W - 8 - 8 - 20);
    // object ownership: the lowest frame that shows a list draws its cells, the others point at it
    const rowsArr = [];
    const owner = new Map();
    for (let i = 0; i < n; i++) {
      const rows = rowsOf(e, i);
      for (const r of rows) {
        if (!r.value || !HEAP.has(r.value.type) || !r.value.id) continue;
        const o = owner.get(r.value.id);
        if (!o) { owner.set(r.value.id, { fi: i, row: r }); r.own = true; } else r.alias = o;
      }
      for (const r of rows) r.h = r.own && CELLS.has(r.value.type) && r.value.items && r.value.items.length ? S.cells : S.row;
      rowsArr.push(rows);
    }
    const fullH = rowsArr.map((rows) => S.strip + S.head + (rows.length ? rows.reduce((a, r) => a + r.h, 0) + 4 : S.empty) + S.padB);
    const hOf = (i, m) => (m === 'full' ? fullH[i] : m === 'mid' ? S.strip + S.head + 3 : m === 'mini' ? S.mini : 0);
    const ghost = e.kind === 'return' ? { h: S.strip + S.head + S.ghostBody } : null;
    const avail = H - S.top - S.bot - (ghost ? ghost.h + S.gap : 0);
    const modes = new Array(n).fill('full');
    // running total (cards + gaps + the "more frames" bar), updated as cards are folded or hidden
    let sum = fullH.reduce((t, h) => t + h, 0) + Math.max(0, n - 1) * S.gap;
    let hidden = 0;
    const setMode = (i, m) => {
      sum += hOf(i, m) - hOf(i, modes[i]);
      if (m === 'hide' && modes[i] !== 'hide') { if (hidden === 0) sum += S.more; else sum -= S.gap; hidden++; }
      modes[i] = m;
    };
    // fold from the bottom up: frames far below the running one first; the caller of the running frame keeps its
    // strip (the arguments come from there), the running frame stays open as long as possible
    for (let i = 1; i < n - 2 && sum > avail; i++) setMode(i, 'mid');
    if (sum > avail && n > 2) setMode(0, 'mid');
    for (let i = 1; i < n - 2 && sum > avail; i++) setMode(i, 'mini');
    if (sum > avail && n > 1) setMode(n - 2, 'mid');
    if (sum > avail && n > 2) setMode(0, 'mini');
    for (let i = 1; i < n - 2 && sum > avail; i++) setMode(i, 'hide');
    if (sum > avail && n > 1) setMode(n - 1, 'mid');
    // positions, bottom up
    const items = [];
    let y = H - S.bot;
    let moreDone = false;
    for (let i = 0; i < n; i++) {
      if (modes[i] === 'hide') {
        if (!moreDone) {
          moreDone = true;
          let cntHidden = 0;
          for (let j = 0; j < n; j++) if (modes[j] === 'hide') cntHidden++;
          const it = { more: true, count: cntHidden, name: e.frames[i].name, x: cardX, w: cardW, h: S.more, y: y - S.more };
          items.push(it);
          y = it.y - S.gap;
        }
        continue;
      }
      const h = hOf(i, modes[i]);
      const it = { i, frame: e.frames[i], site: e.sites[i], compact: modes[i] !== 'full', mini: modes[i] === 'mini', rows: rowsArr[i], x: cardX, w: cardW, h, y: y - h };
      items.push(it);
      y = it.y - S.gap;
    }
    if (ghost) {
      ghost.x = cardX + 10;
      ghost.w = cardW - 20;
      ghost.y = y - ghost.h;
      y = ghost.y - S.gap;
    }
    return { items, ghost, freeTop: y, cardX, cardW, owner };
  }

  /** Strip (first band of a card): where this frame is in the code. Returns geometry used by arrows. */
  function drawStrip(ctx, it, mode, opt) {
    const { x, y, w } = it;
    const h = S.strip;
    const isTop = mode === 'run' || mode === 'err' || mode === 'done';
    ctx.save();
    rr(ctx, x + 1, y + 1, w - 2, h - 1, 7);
    ctx.clip();
    ctx.fillStyle = mode === 'run' ? 'rgba(251, 191, 36, 0.14)' : mode === 'err' ? 'rgba(248, 113, 113, 0.16)' : mode === 'ghost' ? 'rgba(52, 211, 153, 0.10)' : '#0b1426';
    ctx.fillRect(x, y, w, h);
    ctx.restore();
    const cy = y + h / 2 + 0.5;
    const iconCol = mode === 'run' ? '#fbbf24' : mode === 'err' ? '#f87171' : mode === 'ghost' || mode === 'done' ? '#34d399' : '#60a5fa';
    icon(ctx, mode === 'run' ? 'run' : mode === 'err' ? 'err' : mode === 'ghost' ? 'ret' : mode === 'done' ? 'done' : 'wait', x + 9, cy, iconCol);
    const res = { args: [], val: null, span: null };
    if (mode === 'done') {
      setFont(ctx, 12, SANS, 600);
      ctx.fillStyle = '#a7f3d0';
      ctx.textBaseline = 'middle';
      ctx.fillText(fitText(ctx, T('program finished: only the main frame is left', 'program selesai: tinggal bingkai utama'), w - 34), x + 26, cy);
      return res;
    }
    const lineNo = opt.line;
    if (!lineNo) return res;
    setFont(ctx, 10.5, SANS, 600);
    ctx.textBaseline = 'middle';
    ctx.fillStyle = iconCol;
    const lab = `${T('line', 'baris')} ${lineNo}`;
    ctx.fillText(lab, x + 24, cy);
    const codeX = x + 24 + ctx.measureText(lab).width + 8;
    const fs = W0 < 380 ? 12 : 12.5;
    setFont(ctx, fs, MONO);
    const chW = ctx.measureText('0').width || 7.5;
    const maxChars = Math.max(6, Math.floor((x + w - 8 - codeX) / chW));
    const r = renderLine(lineNo, opt.repl || []);
    const len = r.str.length;
    let a = 0;
    let b = len;
    const nv = r.pieces.find((p) => p.newest);
    const focus = opt.active ? [r.map(opt.active.s), r.map(opt.active.e)] : nv ? [nv.r0, nv.r1] : null;
    if (len > maxChars) {
      // keep the call (or the value that replaced it) in view; '…' marks the cut ends
      if (focus && focus[1] > maxChars - 1) a = Math.min(Math.max(0, focus[0] - 3), len - (maxChars - 1));
      b = a + maxChars - (a > 0 ? 1 : 0);
      if (b < len) b -= 1;
    }
    let px = codeX;
    if (a > 0) { ctx.fillStyle = '#64748b'; ctx.fillText('…', px, cy); px += chW; }
    const X = (off) => px + (off - a) * chW;
    // active call span (waiting frames): highlight
    if (opt.active) {
      const s0 = Math.max(a, r.map(opt.active.s));
      const s1 = Math.min(b, r.map(opt.active.e));
      if (s1 > s0) {
        ctx.fillStyle = opt.hideActive ? 'rgba(96, 165, 250, 0.10)' : 'rgba(251, 191, 36, 0.20)';
        rr(ctx, X(s0) - 2, y + 4, (s1 - s0) * chW + 4, h - 8, 3);
        ctx.fill();
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(X(s0), y + h - 5, (s1 - s0) * chW, 1.5);
        res.span = { x0: X(s0), x1: X(s1), y };
        for (const am of opt.argMap || []) {
          const q0 = Math.max(a, r.map(am.s));
          const q1 = Math.min(b, r.map(am.e));
          if (q1 > q0) res.args.push({ param: am.param, x: (X(q0) + X(q1)) / 2, y, w: (q1 - q0) * chW });
        }
      }
    }
    for (const p of r.pieces) {
      const p0 = Math.max(a, p.r0);
      const p1 = Math.min(b, p.r1);
      if (p1 <= p0) continue;
      const text = p.kind === 'val' ? (() => { const full = r.str.slice(p.r0, p.r1); return full.slice(p0 - p.r0, p1 - p.r0); })() : r.str.slice(p0, p1);
      if (p.kind === 'val') {
        const hidden = p.newest && opt.hideNewest;
        if (!hidden) {
          ctx.fillStyle = p.newest ? 'rgba(52, 211, 153, 0.28)' : 'rgba(52, 211, 153, 0.13)';
          rr(ctx, X(p0) - 2, y + 4, (p1 - p0) * chW + 4, h - 8, 3);
          ctx.fill();
          ctx.fillStyle = '#6ee7b7';
          ctx.fillText(text, X(p0), cy);
        }
        if (p.newest) res.val = { x: (X(p0) + X(p1)) / 2, y, x0: X(p0), x1: X(p1) };
      } else {
        ctx.fillStyle = isTop ? '#fde68a' : mode === 'ghost' ? '#a7f3d0' : '#cbd5e1';
        ctx.fillText(text, X(p0), cy);
      }
    }
    if (b < r.str.length) { ctx.fillStyle = '#64748b'; ctx.fillText('…', X(b), cy); }
    return res;
  }

  let W0 = 400;
  function valueBox(ctx, x, y, v, maxW, opt = {}) {
    const col = tcol(v);
    const fs = W0 < 380 ? 12 : 12.5;
    setFont(ctx, fs, MONO);
    const text = fitText(ctx, opt.text != null ? opt.text : String(v.repr), Math.max(10, maxW - 12));
    const tw = ctx.measureText(text).width;
    const bw = Math.min(maxW, Math.max(24, tw + 12));
    const bh = 20;
    ctx.fillStyle = tint(col, 0.13);
    rr(ctx, x, y, bw, bh, 5);
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = col;
    ctx.stroke();
    if (!opt.hideText) {
      ctx.fillStyle = col;
      ctx.textBaseline = 'middle';
      ctx.fillText(text, x + 6, y + bh / 2 + 0.5);
    }
    return { x, y, w: bw, h: bh };
  }
  function cellsBox(ctx, x, y, v, maxW) {
    const col = tcol(v);
    const fs = W0 < 380 ? 11.5 : 12;
    const items = v.items || [];
    const total = v.truncated || items.length;
    let cx = x;
    const ch = 22;
    const res = { x, y, w: 0, h: ch };
    for (let k = 0; k < items.length; k++) {
      setFont(ctx, fs, MONO);
      const t = fitText(ctx, items[k].repr, 76);
      const cwid = Math.max(28, ctx.measureText(t).width + 12);
      const restRoom = k < items.length - 1 ? 34 : 0;
      if (cx + cwid > x + maxW - restRoom && k > 0) {
        setFont(ctx, 11, SANS, 600);
        ctx.fillStyle = '#8a99b3';
        ctx.textBaseline = 'middle';
        ctx.fillText(`…+${total - k}`, cx + 4, y + ch / 2);
        cx += 32;
        break;
      }
      ctx.fillStyle = tint(col, 0.09);
      ctx.fillRect(cx, y, cwid, ch);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = col;
      if (v.type === 'tuple' || v.type === 'set') ctx.setLineDash([4, 3]);
      ctx.strokeRect(cx + 0.75, y + 0.75, cwid - 1.5, ch - 1.5);
      ctx.setLineDash([]);
      ctx.fillStyle = tcol(items[k]);
      ctx.textBaseline = 'middle';
      setFont(ctx, fs, MONO);
      ctx.fillText(t, cx + 6, y + ch / 2 + 0.5);
      if (v.type !== 'set') {
        setFont(ctx, 9.5, SANS);
        ctx.fillStyle = '#8a99b3';
        ctx.textAlign = 'center';
        ctx.fillText(String(k), cx + cwid / 2, y + ch + 8);
        ctx.textAlign = 'left';
      }
      cx += cwid - 1.5;
    }
    if (total > items.length && cx < x + maxW - 30) {
      setFont(ctx, 11, SANS, 600);
      ctx.fillStyle = '#8a99b3';
      ctx.fillText(`…+${total - items.length}`, cx + 4, y + ch / 2);
      cx += 32;
    }
    res.w = Math.max(20, cx - x);
    return res;
  }

  /** Draw one frame card. Returns geometry: { strip, boxes: Map(name -> rect), aliases: [...] } */
  function drawCard(ctx, it, e, opt = {}) {
    const { x, y, w, h, frame, i } = it;
    const n = e.frames.length;
    const isTop = i === n - 1;
    const isModule = i === 0;
    const rec = isModule ? null : callByFrame.get(frame.id);
    const errTop = isTop && e.kind === 'error';
    const alpha = opt.alpha ?? 1;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(0, opt.dy || 0);
    // body
    rr(ctx, x, y, w, h, 8);
    ctx.fillStyle = isTop && e.kind !== 'done' ? '#121c33' : '#0f182c';
    ctx.fill();
    ctx.lineWidth = isTop && e.kind !== 'done' ? 2 : 1.2;
    ctx.strokeStyle = errTop ? '#f87171' : isTop && e.kind !== 'done' ? '#fbbf24' : '#2b3a5a';
    ctx.stroke();
    const site = it.site;
    if (it.mini) {
      // one band: who is waiting, and at which line
      const cy = y + h / 2 + 0.5;
      icon(ctx, 'wait', x + 9, cy, '#60a5fa');
      setFont(ctx, 10.5, SANS, 600);
      ctx.fillStyle = '#60a5fa';
      const lt = `${T('line', 'baris')} ${site ? site.line : frame.line}`;
      const lw = ctx.measureText(lt).width;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(lt, x + w - 10, cy);
      ctx.textAlign = 'left';
      let title;
      if (isModule) { setFont(ctx, 12, SANS, 700); ctx.fillStyle = '#e2e8f0'; title = T('Main program', 'Program utama'); }
      else {
        setFont(ctx, 12, MONO, 700);
        ctx.fillStyle = '#ffcb6b';
        const ps = (rec ? rec.args : []).map((a) => { const l = frame.locals.find((q) => q.name === a.name); return `${a.name}=${short(l ? l.value : a.value, 12)}`; });
        title = `${frame.name}(${ps.join(', ')})`;
      }
      ctx.fillText(fitText(ctx, title, w - 44 - lw), x + 24, cy);
      ctx.restore();
      return { strip: { args: [], val: null, span: null }, boxes: new Map(), aliases: [], it };
    }
    // strip
    let mode;
    let line;
    let repl = [];
    let active = null;
    if (e.kind === 'done' && isTop) mode = 'done';
    else if (isTop) {
      mode = errTop ? 'err' : 'run';
      line = errTop ? e.error.line : e.kind === 'call' ? e.call.defLine : e.line;
      if (e.kind === 'return' && site) { line = site.line; repl = site.repl; }
    } else {
      mode = 'wait';
      line = site ? site.line : frame.line;
      repl = site ? site.repl : [];
      active = site ? site.active : null;
    }
    const argMap = !isTop && e.kind === 'call' && i === n - 2 ? e.call.argMap : null;
    const strip = drawStrip(ctx, { x, y, w }, mode, { line, repl, active, argMap, hideNewest: opt.hideNewest && isTop, hideActive: false });
    // header
    const hy = y + S.strip;
    ctx.strokeStyle = '#1e2a44';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x + 1, hy + 0.5); ctx.lineTo(x + w - 1, hy + 0.5); ctx.stroke();
    const hcy = hy + S.head / 2 + 1;
    ctx.textBaseline = 'middle';
    let rightTxt = '';
    if (isModule) {
      setFont(ctx, 12.5, SANS, 700);
      ctx.fillStyle = '#e2e8f0';
      const t1 = T('Main program', 'Program utama');
      ctx.fillText(t1, x + 10, hcy);
      const w1 = ctx.measureText(t1).width;
      setFont(ctx, 11.5, SANS);
      ctx.fillStyle = '#8a99b3';
      ctx.fillText(fitText(ctx, ` · ${T('global frame', 'bingkai global')}${it.compact ? ` · ${frame.locals.length} ${T(frame.locals.length === 1 ? 'name' : 'names', 'nama')}` : ''}`, w - w1 - 24), x + 10 + w1, hcy);
    } else {
      setFont(ctx, 12.5, MONO, 700);
      ctx.fillStyle = '#ffcb6b';
      let title = frame.name;
      if (it.compact) {
        const ps = (rec ? rec.args : []).map((a) => { const l = frame.locals.find((q) => q.name === a.name); return `${a.name}=${short(l ? l.value : a.value, 12)}`; });
        title = `${frame.name}(${ps.join(', ')})`;
      }
      rightTxt = rec ? `${T('called from line', 'dipanggil dari baris')} ${rec.line}` : '';
      setFont(ctx, 11, SANS);
      let rw = rightTxt ? ctx.measureText(rightTxt).width : 0;
      if (rightTxt && rw > w * 0.45) { rightTxt = `${T('from line', 'dari baris')} ${rec.line}`; rw = ctx.measureText(rightTxt).width; }
      if (rightTxt && rw > w * 0.4) { rightTxt = ''; rw = 0; }
      setFont(ctx, 12.5, MONO, 700);
      const tt = fitText(ctx, title, w - 20 - (rw ? rw + 12 : 0));
      ctx.fillText(tt, x + 10, hcy);
      if (!it.compact && rec) {
        const tw = ctx.measureText(tt).width;
        setFont(ctx, 12, MONO);
        ctx.fillStyle = '#8a99b3';
        const sig = fnDefs.get(frame.name)?.sig || '';
        const room = w - 20 - tw - (rw ? rw + 12 : 0);
        if (sig && room > 30 && tt === title) ctx.fillText(fitText(ctx, sig, room), x + 10 + tw, hcy);
      }
      if (rightTxt) {
        setFont(ctx, 11, SANS);
        ctx.fillStyle = '#8a99b3';
        ctx.textAlign = 'right';
        ctx.fillText(rightTxt, x + w - 10, hcy);
        ctx.textAlign = 'left';
      }
    }
    const geo = { strip, boxes: new Map(), aliases: [], it };
    if (it.compact) { ctx.restore(); return geo; }
    // rows
    let ry = hy + S.head + 2;
    const rows = it.rows;
    if (!rows.length) {
      setFont(ctx, 11.5, SANS);
      ctx.fillStyle = '#8a99b3';
      ctx.fillText(isModule ? T('(no variables yet)', '(belum ada variabel)') : T('(no parameters or local variables yet)', '(belum ada parameter atau variabel lokal)'), x + 12, ry + S.empty / 2);
      ctx.restore();
      return geo;
    }
    setFont(ctx, W0 < 380 ? 12 : 12.5, MONO);
    let nameW = 0;
    for (const r of rows) if (!r.fns) nameW = Math.max(nameW, ctx.measureText(r.name).width);
    nameW = Math.min(Math.max(nameW, 30), w * 0.36);
    const nameR = x + 12 + nameW;
    const valX = nameR + 9;
    const maxW = x + w - 10 - valX;
    for (const r of rows) {
      const cy = ry + r.h / 2;
      if (r.fns) {
        setFont(ctx, 11.5, SANS, 600);
        ctx.fillStyle = '#c792ea';
        ctx.textAlign = 'right';
        ctx.fillText('def', nameR, ry + S.row / 2);
        ctx.textAlign = 'left';
        setFont(ctx, 12, MONO);
        ctx.fillStyle = '#ffcb6b';
        const full = r.fns.map((nm) => `${nm}${fnDefs.get(nm)?.sig || '()'}`).join(', ');
        const txt = ctx.measureText(full).width <= maxW ? full : r.fns.join(', ');
        ctx.fillText(fitText(ctx, txt, maxW), valX, ry + S.row / 2);
        ry += r.h;
        continue;
      }
      setFont(ctx, W0 < 380 ? 12 : 12.5, MONO);
      ctx.fillStyle = r.unbound ? '#fca5a5' : r.param ? '#93c5fd' : '#e2e8f0';
      ctx.textAlign = 'right';
      ctx.fillText(fitText(ctx, r.name, nameW), nameR, r.h === S.cells ? ry + 15 : cy);
      ctx.textAlign = 'left';
      let box;
      const hideText = opt.hideParams && r.param;
      if (r.unbound) {
        ctx.setLineDash([4, 3]);
        ctx.strokeStyle = '#f87171';
        ctx.lineWidth = 1.5;
        rr(ctx, valX, cy - 10, 30, 20, 5);
        ctx.stroke();
        ctx.setLineDash([]);
        setFont(ctx, 12.5, MONO, 700);
        ctx.fillStyle = '#f87171';
        ctx.fillText('?', valX + 11, cy + 0.5);
        setFont(ctx, 11.5, SANS);
        ctx.fillStyle = '#fca5a5';
        ctx.fillText(fitText(ctx, T('local, no value yet', 'lokal, belum ada nilai'), maxW - 40), valX + 38, cy + 0.5);
        box = { x: valX, y: cy - 10, w: 30, h: 20 };
      } else if (r.alias) {
        const kindWord = r.value.type === 'list' ? T('same list as', 'list yang sama dengan') : r.value.type === 'dict' ? T('same dict as', 'dict yang sama dengan') : T('same object as', 'objek yang sama dengan');
        setFont(ctx, 11.5, SANS);
        ctx.fillStyle = '#b6c2d6';
        const t = fitText(ctx, `${kindWord} ${r.alias.row.name}${r.alias.fi < i ? '' : ''}`, maxW - 22);
        ctx.fillText(t, valX, cy + 0.5);
        const dx = valX + ctx.measureText(t).width + 9;
        ctx.fillStyle = tcol(r.value);
        ctx.beginPath(); ctx.arc(dx, cy, 4.2, 0, Math.PI * 2); ctx.fill();
        box = { x: valX, y: cy - 10, w: dx + 5 - valX, h: 20 };
        geo.aliases.push({ x: dx, y: cy, target: r.alias.row, value: r.value });
      } else if (r.own && CELLS.has(r.value.type) && r.value.items && r.value.items.length) {
        box = cellsBox(ctx, valX, ry + 4, r.value, maxW);
        r.ownerBox = box;
      } else if (r.value.type === 'function') {
        box = valueBox(ctx, valX, cy - 10, r.value, maxW, { text: `ƒ ${String(r.value.repr).replace(/^<function (\S+) at .*>$/, '$1')}` });
      } else {
        box = valueBox(ctx, valX, cy - 10, r.value, maxW, { hideText });
        if (r.own) r.ownerBox = box;
      }
      if (r.param && !r.unbound && e.kind === 'call' && isTop && e.call.argsKnown && !(e.call.argMap || []).some((m) => m.param === r.name) && box) {
        setFont(ctx, 10.5, SANS);
        ctx.fillStyle = '#8a99b3';
        const dt = `(${T('default', 'bawaan')})`;
        if (box.x + box.w + 8 + ctx.measureText(dt).width < x + w - 6) ctx.fillText(dt, box.x + box.w + 7, cy + 0.5);
      }
      if (opt.changed && opt.changed.has(`${frame.id}:${r.name}`) && box) {
        const f = opt.flash ?? 1;
        const o = 3 + (1 - f) * 7;
        ctx.strokeStyle = `rgba(253, 224, 71, ${0.25 + 0.75 * f})`;
        ctx.lineWidth = 2;
        rr(ctx, box.x - o, box.y - o, box.w + 2 * o, box.h + 2 * o, 6);
        ctx.stroke();
      }
      geo.boxes.set(r.name, { ...box, y: box.y + (opt.dy || 0) });
      if (r.ownerBox) r.ownerBoxAbs = { ...r.ownerBox, y: r.ownerBox.y + (opt.dy || 0) };
      ry += r.h;
    }
    ctx.restore();
    return geo;
  }

  function drawGhost(ctx, L, e, opt = {}) {
    const g = L.ghost;
    const f = e.ret.frame;
    const alpha = opt.alpha ?? 0.92;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(0, opt.dy || 0);
    rr(ctx, g.x, g.y, g.w, g.h, 8);
    ctx.fillStyle = 'rgba(15, 24, 44, 0.85)';
    ctx.fill();
    ctx.setLineDash([5, 4]);
    ctx.lineWidth = 1.4;
    ctx.strokeStyle = '#34d399';
    ctx.stroke();
    ctx.setLineDash([]);
    const site = e.ret.site;
    drawStrip(ctx, g, 'ghost', { line: e.ret.line, repl: site && site.line === e.ret.line ? site.repl : [] });
    const hy = g.y + S.strip;
    setFont(ctx, 12.5, MONO, 700);
    ctx.fillStyle = '#ffcb6b';
    ctx.textBaseline = 'middle';
    const title = fitText(ctx, f.name, g.w * 0.5);
    ctx.fillText(title, g.x + 10, hy + S.head / 2 + 1);
    const tw = ctx.measureText(title).width;
    setFont(ctx, 11.5, SANS);
    ctx.fillStyle = '#a7f3d0';
    ctx.fillText(fitText(ctx, ` · ${T('finished, frame popped', 'selesai, bingkai diambil')}`, g.w - tw - 24), g.x + 10 + tw, hy + S.head / 2 + 1);
    const by = hy + S.head + 6;
    setFont(ctx, 12, SANS, 700);
    ctx.fillStyle = '#6ee7b7';
    const lab = T('return value', 'nilai balik');
    ctx.fillText(lab, g.x + 12, by + 10);
    const lw = ctx.measureText(lab).width;
    const box = valueBox(ctx, g.x + 22 + lw, by, e.ret.value, g.w - lw - 40, { hideText: opt.hideValue });
    ctx.restore();
    return { box: { ...box, y: box.y + (opt.dy || 0) } };
  }

  function drawArrowCurve(ctx, x0, y0, x1, y1, col, opt = {}) {
    ctx.save();
    ctx.strokeStyle = col;
    ctx.fillStyle = col;
    ctx.lineWidth = opt.width || 1.6;
    if (opt.dash) ctx.setLineDash(opt.dash);
    const mx = opt.cx ?? (x0 + x1) / 2;
    const my = opt.cy ?? (y0 + y1) / 2;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.quadraticCurveTo(mx, my, x1, y1);
    ctx.stroke();
    ctx.setLineDash([]);
    const ang = Math.atan2(y1 - my, x1 - mx);
    arrowHead(ctx, x1, y1, ang, 7);
    ctx.restore();
  }
  function chip(ctx, x, y, text, col) {
    setFont(ctx, 12.5, MONO, 700);
    const t = cut(text, 16);
    const tw = ctx.measureText(t).width;
    ctx.fillStyle = '#0b1220';
    rr(ctx, x - tw / 2 - 7, y - 11, tw + 14, 22, 11);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = col;
    ctx.stroke();
    ctx.fillStyle = col;
    ctx.textBaseline = 'middle';
    ctx.fillText(t, x - tw / 2, y + 0.5);
  }

  function draw() {
    if (destroyed) return;
    const ctx = cv.ctx;
    const W = cv.width;
    const H = cv.height;
    W0 = W;
    ctx.save();
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    const e = hist[cur];
    if (!e) {
      setFont(ctx, 13, SANS, 600);
      ctx.fillStyle = compileError ? '#fca5a5' : '#8a99b3';
      ctx.textBaseline = 'middle';
      const msg = compileError
        ? T(`${compileError.type} on line ${compileError.line}: fix the code first.`, `${compileError.type} di baris ${compileError.line}: perbaiki kodenya dulu.`)
        : T('Choose a program to start.', 'Pilih program untuk mulai.');
      ctx.fillText(fitText(ctx, msg, W - 24), 12, H / 2);
      ctx.restore();
      return;
    }
    const now = performance.now();
    let a = anim;
    let p = 1;
    if (a) { p = Math.min(1, (now - a.t0) / a.dur); if (p >= 1) { anim = null; a = null; } }
    const L = layout(e, W, H);
    const n = e.frames.length;
    // free space above the stack: a hint where new frames go
    if (L.freeTop > 44) {
      setFont(ctx, 11.5, SANS, 600);
      ctx.fillStyle = '#475569';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(fitText(ctx, `▲ ${T('a call pushes a new frame on top', 'pemanggilan menaruh bingkai baru di atas')}`, W - 30), L.cardX + L.cardW / 2, Math.min(L.freeTop - 14, S.top + 14));
      ctx.textAlign = 'left';
    }
    const changed = new Set(changedList(cur).map((c) => `${c.fid}:${c.name}`));
    if (e.kind === 'call') for (const pa of e.call.args) changed.add(`${e.call.frameId}:${pa.name}`);
    const push = a && a.kind === 'push';
    const pop = a && a.kind === 'pop';
    const pA = push ? ease(p / 0.4) : 1;
    const pB = push ? ease((p - 0.4) / 0.6) : 1;
    const geos = [];
    for (const it of L.items) {
      if (it.more) {
        rr(ctx, it.x + 14, it.y, it.w - 28, it.h, 6);
        ctx.fillStyle = '#0f182c';
        ctx.fill();
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
        setFont(ctx, 11.5, SANS, 600);
        ctx.fillStyle = '#94a3b8';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(fitText(ctx, `⋮ ${it.count} ${T(it.count === 1 ? 'more frame' : 'more frames', 'bingkai lagi')} (${it.name} …)`, it.w - 40), it.x + it.w / 2, it.y + it.h / 2);
        ctx.textAlign = 'left';
        continue;
      }
      const isNew = push && it.i === n - 1;
      const g = drawCard(ctx, it, e, {
        changed, flash: a && (a.kind === 'flash' || a.kind === 'pop') ? ease(p) : 1,
        alpha: isNew ? pA : 1, dy: isNew ? -(1 - pA) * 28 : 0,
        hideParams: isNew && pB < 1, hideNewest: pop && p < 0.62,
      });
      geos.push(g);
    }
    const geoByIdx = new Map(geos.map((g) => [g.it.i, g]));
    // alias arrows (two names, one list)
    const gutterX = L.cardX + L.cardW + 10;
    for (const g of geos) {
      for (const al of g.aliases) {
        const tgt = al.target.ownerBoxAbs;
        if (!tgt) continue;
        const ty = tgt.y + tgt.h / 2;
        const tx = tgt.x + tgt.w + 3;
        ctx.save();
        ctx.strokeStyle = tint(tcol(al.value), 0.95);
        ctx.fillStyle = tint(tcol(al.value), 0.95);
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(al.x + 4, al.y);
        ctx.bezierCurveTo(gutterX + 2, al.y, gutterX + 2, ty, tx + 8, ty);
        ctx.lineTo(tx + 6, ty);
        ctx.stroke();
        arrowHead(ctx, tx, ty, Math.PI, 7);
        ctx.restore();
      }
    }
    // arguments -> parameters (the step right after a call)
    if (e.kind === 'call' && n >= 2) {
      const gTop = geoByIdx.get(n - 1);
      const gCaller = geoByIdx.get(n - 2);
      if (gTop && gCaller && !gTop.it.compact) {
        for (const ag of gCaller.strip.args) {
          const bx = gTop.boxes.get(ag.param);
          if (!bx) continue;
          // up from the argument, then left into the right side of the parameter's box
          const tx = bx.x + bx.w + 3;
          const ty = bx.y + bx.h / 2;
          const cx = Math.max(ag.x, tx + 16);
          if (push && pB < 1) {
            if (pB > 0) {
              const t = easeInOut(pB);
              const qx = (1 - t) * (1 - t) * ag.x + 2 * (1 - t) * t * cx + t * t * (bx.x + bx.w / 2);
              const qy = (1 - t) * (1 - t) * (ag.y + 4) + 2 * (1 - t) * t * ty + t * t * ty;
              const av = e.call.args.find((q) => q.name === ag.param);
              chip(ctx, qx, qy, av ? av.value.repr : '', '#fbbf24');
            }
          } else {
            drawArrowCurve(ctx, ag.x, ag.y + 1, tx, ty, 'rgba(251, 191, 36, 0.9)', { cx, cy: ty });
          }
        }
      }
    }
    // the popped frame and its return value travelling back to the call site
    if (L.ghost) {
      const gp = pop ? easeInOut(Math.min(1, p / 0.62)) : 1;
      const gh = drawGhost(ctx, L, e, { alpha: pop ? 1 - 0.25 * gp : 0.78, dy: pop ? -6 * gp : -6, hideValue: false });
      const gTop = geoByIdx.get(n - 1);
      const val = gTop && gTop.strip.val;
      if (val) {
        const sx = gh.box.x + gh.box.w / 2;
        const sy = gh.box.y + gh.box.h;
        const tx = val.x;
        const ty = val.y + 3;
        if (pop && p < 0.62) {
          const t = gp;
          const cx = Math.max(sx, tx) + 40;
          const cy = (sy + ty) / 2;
          const qx = (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * cx + t * t * tx;
          const qy = (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * cy + t * t * (ty + 9);
          chip(ctx, qx, qy, e.ret.value.repr, '#34d399');
        } else {
          drawArrowCurve(ctx, sx, sy + 1, tx, ty, 'rgba(52, 211, 153, 0.85)', { dash: [5, 4], cx: Math.max(sx, tx) + 30, cy: (sy + ty) / 2 });
        }
      }
    }
    ctx.restore();
    if (anim) raf = requestAnimationFrame(() => { raf = 0; draw(); });
  }
  function startAnim(e) {
    cancelAnimationFrame(raf);
    raf = 0;
    const base = e.kind === 'call' ? 900 : e.kind === 'return' ? 850 : 450;
    const dur = playing ? Math.min(base, interval() * 0.85) : base;
    if (dur < 120) { anim = null; return; }
    anim = { kind: e.kind === 'call' ? 'push' : e.kind === 'return' ? 'pop' : 'flash', t0: performance.now(), dur };
  }

  // keyboard on the picture
  cw.addEventListener('keydown', (ev) => {
    if (ev.altKey || ev.ctrlKey || ev.metaKey) return;
    if (ev.key === 'ArrowRight') { ev.preventDefault(); stopPlay(); stepForward(true); }
    else if (ev.key === 'ArrowLeft') { ev.preventDefault(); stepBack(); }
    else if (ev.key === 'Home') { ev.preventDefault(); stopPlay(); goTo(0, false, true); }
    else if (ev.key === 'End') { ev.preventDefault(); toEnd(); }
  });
  scrubIn.addEventListener('input', () => {
    const k = Number(scrubIn.value);   // read first: stopPlay() re-renders the slider with the current step
    stopPlay();
    goTo(k, false, false);
  });
  scrubIn.addEventListener('change', () => announce(statusPlain()));

  // ------------------------------------------------------------------ lab
  function labRow() {
    const e = hist[cur];
    // nothing has run yet: the first statement is only about to run
    if (!e || compileError || (cur === 0 && e.kind === 'line')) return null;
    const rets = calls.filter((r) => r.end != null && r.end <= cur && !r.unwound).sort((x, y) => x.end - y.end).map((r) => short(r.value, 16));
    const sc = predictionScore();
    return {
      program: `${preset.name.en}${edited ? ' (edited)' : ''}`,
      // at a 'line' entry that statement has not run yet
      steps: e.kind === 'line' ? e.steps - 1 : e.steps,
      calls: e.calls,
      depth: e.maxDepth,
      returns: rets.length ? cut(rets.join(', '), 90) : '-',
      ended: e.kind === 'done' ? 'finished' : e.kind === 'error' ? (e.error.type === 'StepLimit' ? 'stopped: step limit' : e.error.type) : `paused at step ${cur}`,
      predicted: sc.judged ? `${sc.right}/${sc.judged}` : '-',
    };
  }

  // ------------------------------------------------------------------ start
  {
    const wide0 = main.clientWidth >= 760;
    main.classList.toggle('is-wide', wide0);
    arrange(wide0);
  }
  loadPreset(preset.key);

  return () => {
    destroyed = true;
    stopPlay();
    cancelBusy();
    clearTimeout(editTimer);
    cancelAnimationFrame(raf);
    ro.disconnect();
    roCanvas.disconnect();
    out.cancelPrompt();
    cv.destroy();
    cp.destroy();
    out.destroy();
  };
}
