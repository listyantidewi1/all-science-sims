// Variables, Data Types and Operators: PP 02 (2.1 tipe data, 2.2 aturan nama variabel), PP 03 Bab 2 (variabel,
// tipe data, type(), int()/float()/str(), operator, f-string) and the "Manusia Variabel" class game of PP 03 Bab 8.
// Four tabs:
//   Memory boxes  a short program runs in minipy one statement per step. Every variable is a labelled box on a
//                 canvas: values are read out of boxes, the right side is worked out one operator at a time
//                 (reduceExpression) and the result flies into its box. Console and trace table follow along.
//   Types         any expression → its value and type(), or the exact Python error (evalExpression; input() is fed
//                 from a box, because input() always returns a str).
//   Operators     step-by-step evaluation in Python's order with a precedence ladder, a / vs // vs % picture,
//                 and f-string format specs such as {x:.2f}.
//   Names         a variable name checked against the PP 02 / PP 03 rules, str.isidentifier(), the 35 keywords,
//                 and what Python does with `name = 1`; plus a "valid or not?" quiz.
import { button, select, slider } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';
import { createCanvas, loop } from '../../../lib/canvas.js';
import { registerParam } from '../../../lib/params.js';
import { compile, createRun, evalExpression, reduceExpression, tokenize, pyRepr, KEYWORDS, BUILTIN_NAMES } from '../../../lib/minipy.js';
import { codePanel, consolePanel } from '../../../lib/codepanel.js';

// PRESETS-START
// Programs for the memory-box tab. Indonesian versions use the identifiers and messages of PP 03; the English
// versions are the same programs with English names. `inputs` = values typed for input().
const P = String.raw;
const MEM_PRESETS = [
  {
    key: 'copy',
    name: { en: 'x = x + 1 and y = x', id: 'x = x + 1 dan y = x' },
    code: {
      en: P`x = 5
y = x        # y gets the value of x
x = x + 1    # right side first: 5 + 1
print("x =", x)
print("y =", y)
`,
      id: P`x = 5
y = x        # y mendapat nilai x
x = x + 1    # sisi kanan dulu: 5 + 1
print("x =", x)
print("y =", y)
`,
    },
    goal: {
      en: 'Predict before you run: after <code>x = x + 1</code>, does <code>y</code> change too?',
      id: 'Tebak sebelum menjalankan: setelah <code>x = x + 1</code>, apakah <code>y</code> ikut berubah?',
    },
    end: {
      en: '<code>y</code> kept 5. <code>y = x</code> gives y the value x had at that moment; changing x afterwards does not change y.',
      id: '<code>y</code> tetap 5. <code>y = x</code> memberi y nilai x pada saat itu; mengubah x sesudahnya tidak mengubah y.',
    },
  },
  {
    key: 'stock',
    name: { en: 'Marker stock (stock = stock + 3)', id: 'Stok spidol (jumlah_spidol + 3)' },
    code: {
      en: P`item_name = "Whiteboard marker"
marker_count = 5
print("Stock of", item_name, "now:", marker_count)
marker_count = marker_count + 3  # buy 3
print("Stock after buying:", marker_count)
marker_count = marker_count - 1  # 1 used up
print("Stock after one ran out:", marker_count)
`,
      id: P`nama_barang = "Spidol Papan Tulis"
jumlah_spidol = 5
print("Stok", nama_barang, "saat ini:", jumlah_spidol)
jumlah_spidol = jumlah_spidol + 3  # beli 3
print("Stok setelah pembelian:", jumlah_spidol)
jumlah_spidol = jumlah_spidol - 1  # 1 habis
print("Stok setelah satu habis:", jumlah_spidol)
`,
    },
    goal: {
      en: 'Read <code>marker_count = marker_count + 3</code> from right to left: first work out the right side, then store it.',
      id: 'Baca <code>jumlah_spidol = jumlah_spidol + 3</code> dari kanan ke kiri: hitung dulu sisi kanan, lalu simpan.',
    },
    end: {
      en: 'The box went 5 → 8 → 7. Each line read the old value, computed a new one and overwrote the box.',
      id: 'Isi kotak 5 → 8 → 7. Setiap baris membaca nilai lama, menghitung nilai baru, lalu menimpa isi kotak.',
    },
  },
  {
    key: 'swap-temp',
    name: { en: 'Swap with a temp box', id: 'Tukar nilai dengan kotak bantu temp' },
    code: {
      en: P`a = 3
b = 7
temp = a     # keep a copy of a
a = b
b = temp
print("a =", a, "b =", b)
`,
      id: P`a = 3
b = 7
temp = a     # simpan salinan a
a = b
b = temp
print("a =", a, "b =", b)
`,
    },
    goal: {
      en: 'Swap the values of a and b. Watch why the third box <code>temp</code> is needed.',
      id: 'Tukar isi a dan b. Amati mengapa kotak ketiga <code>temp</code> diperlukan.',
    },
    end: {
      en: 'Swapped: a = 7, b = 3. temp kept the 3 safe while a was overwritten.',
      id: 'Tertukar: a = 7, b = 3. temp menyimpan angka 3 saat isi a ditimpa.',
    },
  },
  {
    key: 'swap-wrong',
    name: { en: 'Swap gone wrong (no temp)', id: 'Tukar nilai yang salah (tanpa temp)' },
    code: {
      en: P`a = 3
b = 7
a = b    # the 3 in a is overwritten here!
b = a
print("a =", a, "b =", b)
`,
      id: P`a = 3
b = 7
a = b    # angka 3 di a tertimpa di sini!
b = a
print("a =", a, "b =", b)
`,
    },
    goal: {
      en: 'A logic error: this tries to swap a and b without a temp box. Predict the output.',
      id: 'Kesalahan logika: program ini mencoba menukar a dan b tanpa kotak bantu. Tebak keluarannya.',
    },
    end: {
      en: 'Both boxes hold 7. The 3 was overwritten at line 3 before anyone saved it, so it is lost: no error message, just a wrong result.',
      id: 'Kedua kotak berisi 7. Angka 3 tertimpa di baris 3 sebelum disimpan, jadi hilang: tidak ada pesan error, hanya hasil yang salah.',
    },
  },
  {
    key: 'swap-python',
    name: { en: 'Swap the Python way: a, b = b, a', id: 'Tukar cara Python: a, b = b, a' },
    code: {
      en: P`a = 3
b = 7
a, b = b, a  # right side (7, 3) is built first
print("a =", a, "b =", b)
`,
      id: P`a = 3
b = 7
a, b = b, a  # sisi kanan (7, 3) dibuat dulu
print("a =", a, "b =", b)
`,
    },
    goal: {
      en: 'Python can swap in one line. Watch the order: the whole right side is read before any box changes.',
      id: 'Python bisa menukar dalam satu baris. Perhatikan urutannya: seluruh sisi kanan dibaca sebelum kotak mana pun berubah.',
    },
    end: {
      en: 'Swapped without temp: Python made the pair (7, 3) first, then put 7 in a and 3 in b.',
      id: 'Tertukar tanpa temp: Python membuat pasangan (7, 3) dulu, lalu mengisi a dengan 7 dan b dengan 3.',
    },
  },
  {
    key: 'accumulator',
    name: { en: 'Accumulator: total = total + score', id: 'Akumulator: total = total + nilai' },
    code: {
      en: P`total = 0
passed = 0
for score in [80, 75, 90, 65, 85]:
    total = total + score
    if score >= 75:
        passed = passed + 1
average = total / 5
print("Total score:", total)
print("Number passed:", passed)
print("Average:", average)
`,
      id: P`total = 0
tuntas = 0
for nilai in [80, 75, 90, 65, 85]:
    total = total + nilai
    if nilai >= 75:
        tuntas = tuntas + 1
rata_rata = total / 5
print("Total nilai:", total)
print("Jumlah tuntas:", tuntas)
print("Rata-rata:", rata_rata)
`,
    },
    goal: {
      en: 'The accumulator pattern with the data 80, 75, 90, 65, 85: total starts at 0 <i>before</i> the loop and grows every round.',
      id: 'Pola akumulator dengan data 80, 75, 90, 65, 85: total bernilai 0 <i>sebelum</i> perulangan dan bertambah setiap putaran.',
    },
    end: {
      en: 'total = 395, passed = 4 (65 is below 75) and average = 79.0: a float, because / always gives a float.',
      id: 'total = 395, tuntas = 4 (65 di bawah 75), dan rata_rata = 79.0: float, karena / selalu menghasilkan float.',
    },
  },
  {
    key: 'jar',
    name: { en: 'One box, changing type', id: 'Satu kotak, tipe berganti' },
    code: {
      en: P`jar = "sugar"
print(jar, type(jar))
jar = 250
print(jar, type(jar))
jar = 2.5
print(jar, type(jar))
jar = jar > 1
print(jar, type(jar))
`,
      id: P`toples = "gula"
print(toples, type(toples))
toples = 250
print(toples, type(toples))
toples = 2.5
print(toples, type(toples))
toples = toples > 1
print(toples, type(toples))
`,
    },
    goal: {
      en: 'Like a labelled jar: Python does not fix the type of a variable. The type belongs to the value inside.',
      id: 'Seperti toples berlabel: Python tidak mengunci tipe variabel. Tipe melekat pada nilai di dalamnya.',
    },
    end: {
      en: 'The same box held a str, an int, a float and a bool. type() always reports the type of the current value.',
      id: 'Kotak yang sama berisi str, int, float, lalu bool. type() selalu melaporkan tipe nilai yang sedang tersimpan.',
    },
  },
  {
    key: 'input-age',
    name: { en: 'input() gives text, int() converts', id: 'input() menghasilkan teks, int() mengubahnya' },
    code: {
      en: P`age = input("How old are you? ")
print(type(age))
age = int(age)
print(type(age))
age = age + 1
print("Next year you will be", age)
`,
      id: P`umur = input("Berapa umurmu? ")
print(type(umur))
umur = int(umur)
print(type(umur))
umur = umur + 1
print("Tahun depan umurmu", umur)
`,
    },
    inputs: ['17'],
    goal: {
      en: 'input() always returns text. Watch the box: <code>\'17\'</code> (with quotes, a str) becomes <code>17</code> (an int).',
      id: 'input() selalu menghasilkan teks. Amati kotaknya: <code>\'17\'</code> (bertanda petik, str) menjadi <code>17</code> (int).',
    },
    end: {
      en: 'Only after int() could the program add 1. Try typing 17,5 in the Input values box: int() then raises a ValueError.',
      id: 'Baru setelah int() program bisa menambah 1. Coba ketik 17,5 di kotak Nilai masukan: int() akan memunculkan ValueError.',
    },
    endErr: {
      en: 'Lines 1 and 2 still ran: input() accepts any text and the box holds it as a str. Only int() refused, because this text is not a whole number. What must the user type so that int() works?',
      id: 'Baris 1 dan 2 tetap berjalan: input() menerima teks apa pun dan kotak menyimpannya sebagai str. Hanya int() yang menolak, karena teks ini bukan bilangan bulat. Apa yang harus diketik pengguna agar int() berhasil?',
    },
  },
  {
    key: 'input-error',
    name: { en: 'Forgot int(): TypeError', id: 'Lupa int(): TypeError' },
    code: {
      en: P`age = input("How old are you? ")
print("Next year you will be", age + 1)
`,
      id: P`umur = input("Berapa umurmu? ")
print("Tahun depan umurmu", umur + 1)
`,
    },
    inputs: ['17'],
    goal: {
      en: 'The wrong version, without int(). Predict what happens at line 2.',
      id: 'Versi SALAH, tanpa int(). Tebak apa yang terjadi di baris 2.',
    },
    end: {
      en: 'TypeError: the box holds the text \'17\', and Python will not add the number 1 to text. Fix: wrap input() in int().',
      id: 'TypeError: kotak berisi teks \'17\', dan Python tidak mau menjumlahkan teks dengan bilangan 1. Perbaikan: bungkus input() dengan int().',
    },
  },
];

// Types tab: variables the expressions may use (PP 03 Contoh Kasus "Data Profil Siswa").
const TYPE_VARS = {
  en: [['name', '"Andi"'], ['age', '17'], ['height', '165.5'], ['passed', 'True']],
  id: [['nama', '"Andi"'], ['umur', '17'], ['tinggi', '165.5'], ['lulus', 'True']],
};
const TYPE_INPUT = '17';
const TYPE_GROUPS = [
  ['text', { en: 'Text or number?', id: 'Teks atau angka?' }],
  ['conv', { en: 'Converting types', id: 'Konversi tipe' }],
  ['input', { en: 'input() gives text', id: 'input() menghasilkan teks' }],
  ['type', { en: 'type()', id: 'type()' }],
  ['surprise', { en: 'Surprises', id: 'Kejutan' }],
];
// e = expression ({en,id} when it uses the variables), t = expected type or error type (the note is shown only
// when the result matches it), n = note, fix = expressions offered as fixes.
const TYPE_EXAMPLES = [
  { g: 'text', e: '"5" + "3"', t: 'str', n: { en: 'Both values are text (look at the quotes!), so + joins them: \'53\'.', id: 'Kedua nilai berupa teks (perhatikan tanda petiknya!), jadi + menyambungnya: \'53\'.' } },
  { g: 'text', e: '5 + 3', t: 'int', n: { en: 'Both values are int, so + adds them.', id: 'Kedua nilai bertipe int, jadi + menjumlahkannya.' } },
  { g: 'text', e: '"5" + 3', t: 'TypeError', n: { en: 'Text + number: Python refuses to guess what you mean. Convert one side first.', id: 'Teks + bilangan: Python tidak mau menebak maksudnya. Ubah salah satu sisi terlebih dahulu.' }, fix: ['int("5") + 3', '"5" + str(3)'] },
  { g: 'text', e: '"5" * 3', t: 'str', n: { en: 'Text * whole number repeats the text: \'555\'.', id: 'Teks * bilangan bulat mengulang teks: \'555\'.' } },
  { g: 'text', e: { en: 'name + age', id: 'nama + umur' }, t: 'TypeError', n: { en: 'name is a str and age is an int, so + cannot join them.', id: 'nama bertipe str dan umur bertipe int, jadi + tidak bisa menggabungkannya.' }, fix: [{ en: 'name + " " + str(age)', id: 'nama + " " + str(umur)' }, { en: 'f"{name} {age}"', id: 'f"{nama} {umur}"' }] },
  { g: 'conv', e: 'int("7")', t: 'int', n: { en: 'int() turns text that is a whole number into an int.', id: 'int() mengubah teks berbentuk bilangan bulat menjadi int.' } },
  { g: 'conv', e: 'int("7.5")', t: 'ValueError', n: { en: 'int() only accepts text that is a whole number. "7.5" has a decimal point.', id: 'int() hanya menerima teks berbentuk bilangan bulat. "7.5" memiliki titik desimal.' }, fix: ['float("7.5")', 'int(float("7.5"))'] },
  { g: 'conv', e: 'float("7.5")', t: 'float', n: { en: 'float() turns decimal text into a float.', id: 'float() mengubah teks desimal menjadi float.' } },
  { g: 'conv', e: 'int(79.9)', t: 'int', n: { en: 'int() cuts the decimals off; it does not round. round(79.9) would give 80.', id: 'int() membuang bagian desimal, bukan membulatkan. round(79.9) menghasilkan 80.' }, fix: ['round(79.9)'] },
  { g: 'conv', e: 'str(7) + "%"', t: 'str', n: { en: 'str() turns the number into text, so it can be joined to other text.', id: 'str() mengubah bilangan menjadi teks agar bisa digabung dengan teks lain.' } },
  { g: 'conv', e: 'int("17,5")', t: 'ValueError', n: { en: 'A decimal comma! Python writes decimals with a point, 17.5, and int() needs a whole number anyway.', id: 'Koma desimal! Python menulis desimal dengan titik, 17.5, dan int() tetap butuh bilangan bulat.' }, fix: ['float("17.5")'] },
  { g: 'conv', e: 'round(79.333, 2)', t: 'float', n: { en: 'round(x, 2) keeps 2 digits after the point. The result is still a float.', id: 'round(x, 2) menyisakan 2 angka di belakang koma. Hasilnya tetap float.' } },
  { g: 'input', e: 'input()', t: 'str', n: { en: 'input() always returns text (str), even when the user types digits.', id: 'input() selalu menghasilkan teks (str), meskipun pengguna mengetik angka.' } },
  { g: 'input', e: 'input() + 1', t: 'TypeError', n: { en: 'The typed value is text, so it cannot be added to the number 1.', id: 'Nilai yang diketik berupa teks, jadi tidak bisa dijumlahkan dengan bilangan 1.' }, fix: ['int(input()) + 1'] },
  { g: 'input', e: 'int(input()) + 1', t: 'int', n: { en: 'The usual pattern: int(input(...)) turns the typed text into a number first.', id: 'Pola yang biasa: int(input(...)) mengubah teks ketikan menjadi bilangan terlebih dahulu.' } },
  { g: 'input', e: 'type(input())', t: 'type', n: { en: 'Whatever is typed, the type is str.', id: 'Apa pun yang diketik, tipenya str.' } },
  { g: 'type', e: 'type(17)', t: 'type', n: { en: '17 has no decimal point: int.', id: '17 tidak memiliki titik desimal: int.' } },
  { g: 'type', e: 'type(165.5)', t: 'type', n: { en: '165.5 has a decimal point: float.', id: '165.5 memiliki titik desimal: float.' } },
  { g: 'type', e: 'type(True)', t: 'type', n: { en: 'True and False are the two bool values.', id: 'True dan False adalah dua nilai bool.' } },
  { g: 'type', e: 'type("17")', t: 'type', n: { en: 'Digits in quotes are text: str.', id: 'Angka di dalam tanda petik adalah teks: str.' } },
  { g: 'type', e: { en: 'type(height)', id: 'type(tinggi)' }, t: 'type', n: { en: 'type() of a variable reports the type of the value stored in it.', id: 'type() pada variabel melaporkan tipe nilai yang tersimpan di dalamnya.' } },
  { g: 'surprise', e: '7 / 2', t: 'float', n: { en: '/ is true division: 3.5.', id: '/ adalah pembagian biasa: 3.5.' } },
  { g: 'surprise', e: '10 / 5', t: 'float', n: { en: '/ always gives a float, even when the division is exact: 2.0, not 2.', id: '/ selalu menghasilkan float, meskipun pembagiannya pas: 2.0, bukan 2.' } },
  { g: 'surprise', e: 'True + 1', t: 'int', n: { en: 'bool is a kind of int: True counts as 1 and False as 0.', id: 'bool adalah jenis int: True dihitung 1 dan False dihitung 0.' } },
  { g: 'surprise', e: '0.1 + 0.2', t: 'float', n: { en: 'Floats are stored in binary, so 0.1 is not exact. Round when you display: f"{x:.2f}".', id: 'Float disimpan dalam biner, jadi 0.1 tidak tepat. Bulatkan saat menampilkan: f"{x:.2f}".' } },
  { g: 'surprise', e: { en: 'age > 16', id: 'umur > 16' }, t: 'bool', n: { en: 'A comparison answers yes or no, so its value is a bool.', id: 'Perbandingan menjawab ya atau tidak, jadi nilainya bool.' } },
  { g: 'surprise', e: '"Andi" == "andi"', t: 'bool', n: { en: 'Python is case-sensitive: A and a are different characters.', id: 'Python membedakan huruf besar dan kecil: A dan a adalah karakter berbeda.' } },
];

// Operators tab: e = expression, v = variables (statements separated by ;), n = note.
const OPS_PRESETS = [
  { e: '2 + 3 * 4 ** 2 // 5 % 3', v: '', n: { en: '** first, then * // % from left to right, then +.', id: '** dulu, lalu * // % dari kiri ke kanan, lalu +.' } },
  { e: { en: '(math + physics + chem) / 3', id: '(nilai_mtk + nilai_fisika + nilai_kimia) / 3' }, v: { en: 'math = 80; physics = 75; chem = 90', id: 'nilai_mtk = 80; nilai_fisika = 75; nilai_kimia = 90' }, n: { en: 'The average of three scores: the brackets make the sum go first.', id: 'Rata-rata tiga nilai: tanda kurung membuat penjumlahan dikerjakan dulu.' } },
  { e: { en: 'math + physics + chem / 3', id: 'nilai_mtk + nilai_fisika + nilai_kimia / 3' }, v: { en: 'math = 80; physics = 75; chem = 90', id: 'nilai_mtk = 80; nilai_fisika = 75; nilai_kimia = 90' }, n: { en: 'Without brackets only the last score is divided by 3: a logic error.', id: 'Tanpa tanda kurung hanya nilai terakhir yang dibagi 3: kesalahan logika.' } },
  { e: { en: 'start_cash + dues - markers', id: 'uang_awal + iuran_minggu_ini - beli_spidol' }, v: { en: 'start_cash = 50000; dues = 15000; markers = 5000', id: 'uang_awal = 50000; iuran_minggu_ini = 15000; beli_spidol = 5000' }, n: { en: 'Class cash: + and - have the same priority, so left to right.', id: 'Uang kas kelas: + dan - setara, jadi dari kiri ke kanan.' } },
  { e: { en: 'students // group_size', id: 'jumlah_siswa // anggota_per_kelompok' }, v: { en: 'students = 32; group_size = 5', id: 'jumlah_siswa = 32; anggota_per_kelompok = 5' }, n: { en: '// counts the full groups: 6.', id: '// menghitung kelompok penuh: 6.' } },
  { e: { en: 'students % group_size', id: 'jumlah_siswa % anggota_per_kelompok' }, v: { en: 'students = 32; group_size = 5', id: 'jumlah_siswa = 32; anggota_per_kelompok = 5' }, n: { en: '% gives the students left without a group: 2.', id: '% memberi sisa siswa yang belum mendapat kelompok: 2.' } },
  { e: 'a / b', v: 'a = 10; b = 3', n: { en: 'Tebak Output: / gives a float.', id: 'Tebak Output: / menghasilkan float.' } },
  { e: 'a // b', v: 'a = 10; b = 3', n: { en: '// divides and rounds down to a whole number.', id: '// membagi lalu membulatkan ke bawah.' } },
  { e: 'a % b', v: 'a = 10; b = 3', n: { en: '% is the remainder: 10 = 3 × 3 + 1.', id: '% adalah sisa bagi: 10 = 3 × 3 + 1.' } },
  { e: 'a ** b', v: 'a = 10; b = 3', n: { en: '** is power: 10 ** 3 = 10 × 10 × 10 = 1000.', id: '** adalah pangkat: 10 ** 3 = 10 × 10 × 10 = 1000.' } },
  { e: 'str(a) + str(b)', v: 'a = 10; b = 3', n: { en: 'Text + text joins: \'103\', not 13.', id: 'Teks + teks digabung: \'103\', bukan 13.' } },
  { e: '2 ** 3 ** 2', v: '', n: { en: '** groups from the right: 3 ** 2 is done first.', id: '** dikelompokkan dari kanan: 3 ** 2 dikerjakan dulu.' } },
  { e: '-2 ** 2', v: '', n: { en: '** binds tighter than the minus sign: -(2 ** 2) = -4.', id: '** lebih kuat daripada tanda minus: -(2 ** 2) = -4.' } },
  { e: '10 - 4 - 3', v: '', n: { en: 'Same priority: left to right, (10 - 4) - 3.', id: 'Prioritas sama: dari kiri ke kanan, (10 - 4) - 3.' } },
  { e: '-7 // 2', v: '', n: { en: '// rounds down toward minus infinity: -3.5 becomes -4.', id: '// membulatkan ke bawah (ke arah minus tak hingga): -3.5 menjadi -4.' } },
  { e: { en: 'celsius * 9 / 5 + 32', id: 'celsius * 9 / 5 + 32' }, v: 'celsius = 37.5', n: { en: 'Temperature conversion F = C × 9/5 + 32.', id: 'Konversi suhu F = C × 9/5 + 32.' } },
  { e: { en: 'score >= 75 and present', id: 'nilai >= 75 and hadir' }, v: { en: 'score = 80; present = True', id: 'nilai = 80; hadir = True' }, n: { en: 'Comparisons come before and / or.', id: 'Perbandingan dikerjakan sebelum and / or.' } },
];

// f-string formatting: value examples and format specs.
const FMT_VALUES = ['79.33333', '1234567.891', '85', '0.756', '"Siti"'];
const FMT_SPECS = ['.2f', '.1f', '.0f', ',', ',.2f', '>10', '<10', '^10', '08.2f', '.1%'];

// Names tab: examples from PP 02 2.2 (correct: Nama, Alamat, No_HP; wrong: 4XYZ, IP rata, Var:+xy, 458) and PP 03.
const NAME_EXAMPLES = {
  en: ['Name', 'Address', 'No_HP', '4XYZ', 'IP rata', 'Var:+xy', '458', 'score1', '1score', 'average_score', 'average score', 'final-score', 'class', 'if', 'print', 'list', '_total', 'passed_count'],
  id: ['Nama', 'Alamat', 'No_HP', '4XYZ', 'IP rata', 'Var:+xy', '458', 'nilai1', '1nilai', 'rata_rata', 'rata rata', 'nilai-akhir', 'class', 'if', 'print', 'list', '_total', 'jumlah_tuntas'],
};
// Quiz answers: v = valid, a = valid but avoid (hides a built-in function), x = not valid.
const QUIZ = {
  en: [['score1', 'v'], ['1score', 'x'], ['average_score', 'v'], ['average score', 'x'], ['Phone_No', 'v'], ['4XYZ', 'x'], ['Var:+xy', 'x'],
    ['_total', 'v'], ['class', 'x'], ['passed_count', 'v'], ['final-score', 'x'], ['if', 'x'], ['year_2025', 'v'], ['2025_year', 'x'],
    ['total$', 'x'], ['print', 'a'], ['list', 'a'], ['True', 'x'], ['item_price', 'v'], ['%discount', 'x'], ['input', 'a'], ['return', 'x'], ['student_age', 'v'], ['sum', 'a']],
  id: [['nilai1', 'v'], ['1nilai', 'x'], ['rata_rata', 'v'], ['rata rata', 'x'], ['No_HP', 'v'], ['4XYZ', 'x'], ['Var:+xy', 'x'],
    ['_total', 'v'], ['class', 'x'], ['jumlah_tuntas', 'v'], ['nilai-akhir', 'x'], ['if', 'x'], ['tahun_2025', 'v'], ['2025_tahun', 'x'],
    ['total$', 'x'], ['print', 'a'], ['list', 'a'], ['True', 'x'], ['harga_barang', 'v'], ['%diskon', 'x'], ['input', 'a'], ['return', 'x'], ['umur_siswa', 'v'], ['sum', 'a']],
};
// PRESETS-END

const MAX_STEPS = 3000;
const SPEEDS = [0.5, 1, 1.8, 3, Infinity];   // slider 1..5; 5 = instant
const TYPE_COL = {
  int: '#60a5fa', float: '#2dd4bf', str: '#c3e88d', bool: '#f472b6', none: '#94a3b8', list: '#fb923c', tuple: '#c4b5fd',
  dict: '#fcd34d', set: '#f0abfc', fn: '#ffcb6b', type: '#a5b4fc', other: '#a5b4fc',
};
const TYPE_KEY = { int: 'int', float: 'float', str: 'str', bool: 'bool', NoneType: 'none', list: 'list', tuple: 'tuple', dict: 'dict',
  set: 'set', function: 'fn', builtin_function_or_method: 'fn', type: 'type' };
const typeKey = (v) => (v ? TYPE_KEY[v.typeName] || TYPE_KEY[v.type] || 'other' : 'none');
const tcol = (v) => TYPE_COL[typeKey(v)];
const tname = (v) => (v ? v.typeName || v.type : '');
/** A value that can be changed in place (list.append, d[k] = v), so two names for it see the same change. */
const isMutable = (v) => !!v && ['list', 'dict', 'set', 'deque'].includes(v.type) && v.typeName !== 'frozenset';
/** Short text for a value in a box: the repr, without the address / path noise of functions and modules. */
function showRepr(v) {
  if (!v) return '';
  const r = String(v.repr);
  if (v.type === 'function' || v.type === 'module' || v.type === 'object') {
    return r.replace(/ at 0x[0-9a-f]+>$/, '>').replace(/ from '[^']*'>$/, '>').replace(/ \(built-in\)>$/, '>');
  }
  return r;
}
const sameView = (a, b) => !!a && !!b && a.type === b.type && a.typeName === b.typeName && a.repr === b.repr && a.id === b.id;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const cut = (s, n) => { s = String(s); return s.length > n ? s.slice(0, n - 1) + '…' : s; };
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const ease = (t) => (t < 0 ? 0 : t > 1 ? 1 : t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const MONO = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace';
const SANS = 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';

// ---------------------------------------------------------------------------------------------------------------
// Token helpers (minipy's tokenizer, single-line expressions)
// ---------------------------------------------------------------------------------------------------------------
const SKIP_TOK = new Set(['newline', 'nl', 'indent', 'dedent', 'endmarker', 'comment']);
function toks1(s) {
  let ts;
  try { ts = tokenize(s); } catch { return null; }
  const out = [];
  for (const t of ts) {
    if (SKIP_TOK.has(t.type) || t.line !== 1 || !t.text) continue;
    out.push({ type: t.type, text: t.text, s: t.col, e: t.col + t.text.length });
  }
  return out;
}
/** The statement on a source line without its comment and surrounding spaces. */
function codeOf(raw) {
  const s = String(raw || '').trim();
  let ts;
  try { ts = tokenize(s); } catch { return s; }
  const c = ts.find((t) => t.type === 'comment' && t.line === 1);
  return c ? s.slice(0, c.col).trimEnd() : s;
}
/**
 * The statements on one source line, in the order minipy runs them (one line event each): a compound header with
 * its body on the same line (`if x > 3: print(x)`, `for i in range(3): s = s + i`) is the header followed by each
 * statement of the body, and `a = 1; b = 2` is two statements. `quiet`: the header has no event of its own (else,
 * finally); `fn`: the function name of a one-line def (its body runs inside the call).
 */
const COMPOUND_KW = new Set(['if', 'elif', 'else', 'while', 'for', 'try', 'except', 'finally', 'def', 'with']);
function lineParts(raw) {
  const s = codeOf(raw);
  const ts = toks1(s);
  if (!ts || !ts.length) return [{ text: s }];
  const parts = [];
  let i0 = 0;
  const f = ts[0];
  if ((f.type === 'keyword' && COMPOUND_KW.has(f.text)) || (f.text === 'case' && ts.length > 2 && f.type !== 'string')) {
    let d = 0, colon = -1;
    for (let i = 0; i < ts.length; i++) {
      const t = ts[i];
      if (isOpen(t)) d++; else if (isClose(t)) d--;
      else if (d === 0 && t.type === 'op' && t.text === ':') { colon = i; break; }
    }
    if (colon === ts.length - 1) return [{ text: s, head: true, kw: f.text }];
    if (colon > 0) parts.push({ text: s.slice(0, ts[colon].e), head: true, kw: f.text, quiet: f.text === 'else' || f.text === 'finally', fn: f.text === 'def' && ts[1] ? ts[1].text : '' });
    if (colon > 0) i0 = colon + 1;
  }
  let d = 0, start = i0;
  const flush = (end) => { if (end > start) parts.push({ text: s.slice(ts[start].s, ts[end - 1].e).trim() }); };
  for (let i = i0; i < ts.length; i++) {
    const t = ts[i];
    if (isOpen(t)) d++; else if (isClose(t)) d--;
    else if (d === 0 && t.type === 'op' && t.text === ';') { flush(i); start = i + 1; }
  }
  flush(ts.length);
  return parts.length ? parts : [{ text: s }];
}
const isOpen = (t) => t.type === 'op' && '([{'.includes(t.text);
const isClose = (t) => t.type === 'op' && ')]}'.includes(t.text);
const isNameTok = (t) => t && (t.type === 'name' || t.type === 'builtin');
const OPWORDS = new Set(['and', 'or', 'not', 'in', 'is', 'if', 'else']);
const isOperTok = (t) => (t.type === 'op' && !isOpen(t) && !isClose(t)) || (t.type === 'keyword' && OPWORDS.has(t.text));
function balanced(ts) {
  let d = 0;
  for (const t of ts) { if (isOpen(t)) d++; else if (isClose(t)) { d--; if (d < 0) return false; } }
  return d === 0;
}
function validPart(ts) {
  if (!ts.length || !balanced(ts)) return false;
  const f = ts[0], l = ts[ts.length - 1];
  if (isOperTok(f) && !(f.type === 'op' && '+-~'.includes(f.text)) && !(f.type === 'keyword' && f.text === 'not')) return false;
  if (isOperTok(l) || (l.type === 'op' && l.text === ',') || (f.type === 'op' && f.text === ',')) return false;
  return true;
}
/** T[i] is a sign that belongs to the number after it: in -7 // 2 Python works with (-7), but -2 ** 2 is -(2 ** 2). */
function signGlued(T, i) {
  const t = T[i], n = T[i + 1], nn = T[i + 2];
  if (!t || t.type !== 'op' || (t.text !== '-' && t.text !== '+') || !n || n.type !== 'number') return false;
  if (nn && nn.type === 'op' && nn.text === '**') return false;
  return i === 0 || isOperTok(T[i - 1]) || isOpen(T[i - 1]);
}
/** Which part of step string `a` became which part of the next step string `b`. */
function diffSteps(a, b) {
  const A = toks1(a), B = toks1(b);
  if (!A || !B || !A.length || !B.length) return null;
  // (reduction steps keep a literal as it was typed until an operator uses it, so tokens compare by their text)
  for (const t of A) t.k = t.text;
  for (const t of B) t.k = t.text;
  if (A.length === B.length) {
    const d = [];
    for (let i = 0; i < A.length; i++) if (A[i].k !== B[i].k) d.push(i);
    if (d.length > 1 && d.every((i) => isNameTok(A[i]))) {
      return { multi: d.map((i) => ({ a: [A[i].s, A[i].e], b: [B[i].s, B[i].e] })), level: 'var', paren: false };
    }
  }
  let maxP = 0;
  while (maxP < A.length && maxP < B.length && A[maxP].k === B[maxP].k) maxP++;
  for (let p = Math.min(maxP, B.length - 1); p >= 0; p--) {
    if (p > 0 && signGlued(A, p - 1)) continue;   // -7 // 2 → -4: the minus belongs to the 7, mark all of it
    let maxS = 0;
    while (maxS < A.length - p && maxS < B.length - p && A[A.length - 1 - maxS].k === B[B.length - 1 - maxS].k) maxS++;
    for (let s = Math.min(maxS, B.length - p - 1, A.length - p - 1); s >= 0; s--) {
      const am = A.slice(p, A.length - s), bm = B.slice(p, B.length - s);
      if (validPart(am) && validPart(bm)) {
        const c = classify(am);
        // -(4) → -4: the sign written before the brackets is applied (-2 ** 2 → -(4) → -4), mark it with them
        const sg = A[p - 1];
        if (c.paren && am.length === 3 && bm.length === 1 && sg && sg.type === 'op' && '+-~'.includes(sg.text) && (p === 1 || isOperTok(A[p - 2]) || isOpen(A[p - 2]))) {
          return { a: [sg.s, am[2].e], b: [B[p - 1].s, bm[0].e], level: 'unary', paren: false };
        }
        return { a: [am[0].s, am[am.length - 1].e], b: [bm[0].s, bm[bm.length - 1].e], level: c.level, paren: c.paren };
      }
    }
  }
  const c = classify(A);
  return { a: [0, a.length], b: [0, b.length], level: c.level, paren: c.paren };
}
const LEVEL_OF = {
  '**': 'pow', '*': 'mul', '/': 'mul', '//': 'mul', '%': 'mul', '@': 'mul', '+': 'add', '-': 'add',
  '<<': 'bit', '>>': 'bit', '&': 'bit', '^': 'bit', '|': 'bit',
  '==': 'cmp', '!=': 'cmp', '<': 'cmp', '<=': 'cmp', '>': 'cmp', '>=': 'cmp', in: 'cmp', is: 'cmp', not: 'not', and: 'and', or: 'or', if: 'cond',
};
const LEVEL_RANK = { pow: 1, unary: 2, mul: 3, add: 4, bit: 5, cmp: 6, not: 7, and: 8, or: 9, cond: 10 };
/** The operator a reduced part applies: the lowest-priority operator outside brackets. */
function classify(ts) {
  if (!ts || !ts.length) return { level: 'other', paren: false };
  if (ts.length === 1) {
    if (isNameTok(ts[0])) return { level: 'var', paren: false };
    return { level: ts[0].type === 'fstring' ? 'fmt' : 'other', paren: false };
  }
  let inner = ts, paren = false;
  if (ts[0].text === '(' && ts[ts.length - 1].text === ')' && balanced(ts.slice(1, -1))) { inner = ts.slice(1, -1); paren = true; }
  let best = null, d = 0, call = false;
  for (let i = 0; i < inner.length; i++) {
    const t = inner[i];
    if (isOpen(t)) {
      if (d === 0 && t.text === '(' && i > 0 && (isNameTok(inner[i - 1]) || inner[i - 1].text === ')')) call = true;
      d++; continue;
    }
    if (isClose(t)) { d--; continue; }
    if (d) continue;
    let lv = (t.type === 'op' || t.type === 'keyword') ? LEVEL_OF[t.text] : null;
    if (!lv) continue;
    if (t.text === 'not' && inner[i + 1] && inner[i + 1].text === 'in') lv = 'cmp';
    if (t.text === 'not' && i > 0 && inner[i - 1].text === 'is') continue;
    if (lv === 'add' && (i === 0 || isOperTok(inner[i - 1]))) lv = 'unary';
    if (!best || LEVEL_RANK[lv] > LEVEL_RANK[best]) best = lv;
  }
  if (best) return { level: best, paren };
  if (call) return { level: 'call', paren };
  if (inner.length === 1 && inner[0].type === 'fstring') return { level: 'fmt', paren };
  return { level: paren ? 'paren' : 'other', paren };
}

/** Variables read by an expression: names (not attributes, not keyword-argument names) that hold plain data. */
function readsOf(expr, vars) {
  const ts = toks1(expr) || [];
  const out = [];
  for (let i = 0; i < ts.length; i++) {
    const t = ts[i];
    if (!isNameTok(t)) continue;
    if (i > 0 && ts[i - 1].text === '.') continue;
    if (ts[i + 1] && ts[i + 1].type === 'op' && ts[i + 1].text === '=') continue;
    const v = vars.get(t.text);
    if (!v || ['function', 'module', 'object'].includes(v.type)) continue;
    out.push({ name: t.text, s: t.s, e: t.e });
  }
  return out;
}
/** Element spans of a list/tuple literal that starts at token index `k` (the bracket). */
function literalItems(ts, k) {
  const out = [];
  let d = 0, start = -1;
  for (let i = k; i < ts.length; i++) {
    const t = ts[i];
    if (isOpen(t)) { d++; if (d === 1) { start = i + 1; continue; } }
    if (isClose(t)) {
      d--;
      if (d === 0) { if (start < i) out.push([ts[start].s, ts[i - 1].e]); return out; }
    }
    if (d === 1 && t.type === 'op' && t.text === ',') { if (start < i) out.push([ts[start].s, ts[i - 1].e]); start = i + 1; }
  }
  return null;
}

// ---------------------------------------------------------------------------------------------------------------
// CSS (injected once per mount, every class prefixed vt-)
// ---------------------------------------------------------------------------------------------------------------
const CSS = `
.vt { container-type: inline-size; container-name: vt; padding: 12px; min-width: 0; }
.vt *, .vt *::before, .vt *::after, .vt-ctl * { box-sizing: border-box; }
.vt [hidden], .vt-ctl [hidden] { display: none !important; }
.vt-tabs { display: flex; flex-wrap: wrap; gap: 6px; margin: 0 0 12px; padding: 0 0 10px; border-bottom: 1px solid var(--color-border); }
.vt-tab { display: inline-flex; align-items: center; gap: 6px; min-height: 40px; padding: 7px 13px; border: 1px solid var(--color-border);
  border-radius: 999px; background: var(--color-surface-2); color: var(--color-fg); font: 600 14px/1.2 var(--font-sans); cursor: pointer; }
.vt-tab:hover { border-color: color-mix(in srgb, var(--accent, var(--color-accent)) 55%, var(--color-border)); }
.vt-tab[aria-selected="true"] { background: color-mix(in srgb, var(--accent, var(--color-accent)) 16%, var(--color-surface));
  border-color: var(--accent, var(--color-accent)); box-shadow: inset 0 -3px 0 var(--accent, var(--color-accent)); }
.vt-tab:focus-visible, .vt-chip:focus-visible, .vt-btn:focus-visible { outline: 3px solid color-mix(in srgb, var(--accent, var(--color-accent)) 60%, transparent); outline-offset: 2px; }
.vt-tab .ico { font-size: 15px; line-height: 1; }
.vt-intro { margin: 0 0 12px; font-size: 14px; line-height: 1.5; color: var(--color-muted); max-width: 70ch; }
.vt-intro b { color: var(--color-fg); }
.vt-intro code { white-space: nowrap; }
.vt-h { margin: 0 0 8px; font-size: 15px; font-weight: 700; color: var(--color-fg); }
.vt-sec { margin-top: 18px; padding-top: 14px; border-top: 1px solid var(--color-border); }
.vt-sr { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }
.vt code { font-family: var(--font-mono); font-size: .93em; }
.vt-label { display: block; margin: 0 0 4px; font-size: 13px; font-weight: 600; color: var(--color-muted); }
.vt-in { flex: 1 1 180px; min-width: 0; width: 100%; min-height: 42px; padding: 8px 10px; border: 1px solid #1e2a44; border-radius: 8px;
  background: #0b1220; color: #e2e8f0; caret-color: #fff; font: 15px/1.4 var(--font-mono); color-scheme: dark; }
.vt-in.sm { min-height: 36px; padding: 6px 9px; font-size: 14px; }
.vt-in:focus-visible { outline: 2px solid #60a5fa; outline-offset: 1px; }
@media (max-width: 480px) { .vt-in, .vt-in.sm { font-size: 16px; } }
.vt-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.vt-btn { min-height: 40px; }
.vt-btn:disabled { opacity: .45; cursor: not-allowed; }
.vt-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.vt-chip { min-height: 34px; max-width: 100%; padding: 5px 9px; border: 1px solid var(--color-border); border-radius: 7px; background: var(--color-surface-2);
  color: var(--color-fg); font: 13px/1.3 var(--font-mono); white-space: pre; overflow: hidden; text-overflow: ellipsis; cursor: pointer; }
.vt-chip:hover { border-color: var(--accent, var(--color-accent)); }
.vt-chip.is-on { border-color: var(--accent, var(--color-accent)); background: color-mix(in srgb, var(--accent, var(--color-accent)) 15%, var(--color-surface-2)); }
.vt-chip.sans { font-family: var(--font-sans); }
.vt-grp { margin: 10px 0 0; }
.vt-grp > .vt-label { margin-bottom: 5px; }
.vt-dark { background: #0b1220; color: #e2e8f0; border: 1px solid #1e2a44; border-radius: 10px; color-scheme: dark; }
.t-int { --tc: #60a5fa; } .t-float { --tc: #2dd4bf; } .t-str { --tc: #c3e88d; } .t-bool { --tc: #f472b6; } .t-none { --tc: #94a3b8; }
.t-list { --tc: #fb923c; } .t-tuple { --tc: #c4b5fd; } .t-dict { --tc: #fcd34d; } .t-set { --tc: #f0abfc; } .t-fn { --tc: #ffcb6b; }
.t-type { --tc: #a5b4fc; } .t-other { --tc: #a5b4fc; } .t-err { --tc: #f87171; }

/* memory boxes */
.vt-bar { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin: 0 0 10px; }
.vt-bar .btn { min-height: 40px; padding: 7px 11px; white-space: nowrap; }
.vt-bar .btn:disabled { opacity: .45; cursor: not-allowed; }
.vt-count { margin-left: auto; font: 600 13px/1.2 var(--font-mono); color: var(--color-fg); white-space: nowrap; }
.vt-mgrid { display: flex; flex-direction: column; gap: 12px; min-width: 0; }
.vt-mleft, .vt-mright { display: contents; }
.vt-mcode { order: 1; min-width: 0; } .vt-mcv { order: 2; min-width: 0; } .vt-mexp { order: 3; } .vt-mcon { order: 4; min-width: 0; }
@container vt (min-width: 740px) {
  .vt-mgrid { display: grid; grid-template-columns: minmax(0, 1.08fr) minmax(0, 1fr); align-items: start; }
  .vt-mleft, .vt-mright { display: flex; flex-direction: column; gap: 12px; min-width: 0; }
  .vt-mcode, .vt-mcv, .vt-mexp, .vt-mcon { order: 0; }
}
.vt-cv { position: relative; min-width: 0; border-radius: 10px; overflow: hidden; background: #0b1220; border: 1px solid #1e2a44; height: 260px; }
.vt-cv canvas { display: block; }
.vt-exp { margin: 0; padding: 10px 12px; border-radius: 10px; border: 1px solid var(--color-border); background: var(--color-surface-2);
  font-size: 14px; line-height: 1.55; color: var(--color-fg); min-height: 3.2em; overflow-wrap: anywhere; }
.vt-exp p { margin: 0 0 4px; } .vt-exp p:last-child { margin-bottom: 0; }
.vt-exp .k { font-weight: 700; }
.vt-exp .bad { color: var(--color-danger); font-weight: 700; }
.vt-exp .good { color: var(--color-ok); font-weight: 700; }
.vt-exp .lesson { margin-top: 6px; padding: 6px 9px; border-left: 3px solid var(--accent, var(--color-accent)); background: color-mix(in srgb, var(--accent, var(--color-accent)) 8%, transparent); border-radius: 0 6px 6px 0; }
.vt-exp code { padding: 0 3px; border-radius: 4px; background: color-mix(in srgb, var(--color-fg) 8%, transparent); }
.vt-trace { margin-top: 12px; overflow: hidden; }
.vt-trace-h { display: flex; flex-wrap: wrap; gap: 2px 10px; align-items: baseline; padding: 6px 10px; background: #0f182c; border-bottom: 1px solid #1e2a44;
  font: 600 12.5px/1.3 var(--font-sans); color: #b6c2d6; }
.vt-trace-h small { font-weight: 400; color: #8a99b3; }
.vt-tscroll { max-height: 260px; overflow: auto; scrollbar-width: thin; scrollbar-color: #334155 transparent; }
.vt-tt { width: 100%; border-collapse: collapse; font: 12.5px/1.4 var(--font-mono); }
.vt-tt th { position: sticky; top: 0; z-index: 1; padding: 5px 8px; background: #0f182c; color: #b6c2d6; font: 600 12px/1.3 var(--font-sans);
  text-align: left; white-space: nowrap; border-bottom: 1px solid #1e2a44; }
.vt-tt td { padding: 3px 8px; vertical-align: top; border-top: 1px solid #172036; white-space: nowrap; }
.vt-tt td.n, .vt-tt td.l { width: 1%; color: #8a99b3; text-align: right; }
.vt-tt td.c { max-width: 220px; overflow: hidden; text-overflow: ellipsis; color: #cbd5e1; }
.vt-tt td.v { color: var(--tc); }
.vt-tt td.o { white-space: pre-wrap; overflow-wrap: anywhere; min-width: 120px; color: #e2e8f0; }
.vt-tt td.o .err { color: #fca5a5; }
.vt-tt td.o .t { color: #86efac; } .vt-tt td.o .f { color: #fca5a5; }
.vt-tt tr.cur td { background: rgba(251, 191, 36, .13); }
.vt-tt .none { color: #8a99b3; font-family: var(--font-sans); text-align: center; padding: 10px; white-space: normal; }

/* types */
.vt-tgrid { display: grid; gap: 14px; grid-template-columns: minmax(0, 1fr); }
@container vt (min-width: 740px) { .vt-tgrid { grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); align-items: start; } }
.vt-ctx { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 10px; margin-top: 10px; font-size: 13px; color: var(--color-muted); }
.vt-ctx .vt-in { flex: 0 1 110px; }
.vt-res { margin-top: 12px; padding: 12px; font: 14px/1.5 var(--font-mono); min-height: 120px; overflow-wrap: anywhere; }
.vt-repl { margin: 0 0 10px; white-space: pre-wrap; color: #cbd5e1; }
.vt-repl .pr { color: #8a99b3; }
.vt-repl .in { color: #7dd3fc; }
.vt-vrow { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; }
.vt-vbox { display: inline-block; max-width: 100%; padding: 6px 12px; border: 2px solid var(--tc); border-radius: 8px;
  background: color-mix(in srgb, var(--tc) 13%, #0b1220); color: var(--tc); font: 600 18px/1.3 var(--font-mono); white-space: pre-wrap; overflow-wrap: anywhere; }
.vt-tbadge { display: inline-flex; align-items: center; gap: 6px; padding: 3px 9px; border-radius: 999px; border: 1px solid var(--tc); color: var(--tc); font: 600 13px/1.3 var(--font-mono); }
.vt-errl { color: #f87171; font-weight: 700; white-space: pre-wrap; }
.vt-note { margin: 10px 0 0; font: 14px/1.5 var(--font-sans); color: #dbe4f3; }
.vt-note b { color: #fff; }
.vt-fixes { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin-top: 8px; font: 13px/1.3 var(--font-sans); color: #b6c2d6; }
.vt-fixes .vt-chip { background: #131d33; color: #e2e8f0; border-color: #2b3a5a; }
.vt-conv { margin-top: 12px; }
.vt-conv table { width: 100%; border-collapse: collapse; font: 13px/1.4 var(--font-mono); }
.vt-conv caption { text-align: left; padding: 0 0 4px; font: 600 12.5px/1.3 var(--font-sans); color: #b6c2d6; }
.vt-conv td { padding: 3px 6px; border-top: 1px solid #172036; vertical-align: top; overflow-wrap: anywhere; }
.vt-conv td.c { color: #cbd5e1; width: 45%; }
.vt-conv td.r { color: var(--tc); }
.vt-conv td.ty { color: var(--tc); width: 1%; white-space: nowrap; font-family: var(--font-sans); font-size: 12px; }

/* operators */
.vt-ogrid { display: grid; gap: 14px; grid-template-columns: minmax(0, 1fr); }
@container vt (min-width: 740px) { .vt-ogrid { grid-template-columns: minmax(0, 1fr) 230px; align-items: start; } }
.vt-vars { margin-top: 8px; display: flex; flex-wrap: wrap; align-items: center; gap: 6px 8px; font-size: 13px; color: var(--color-muted); }
.vt-vars .vt-in { flex: 1 1 200px; }
.vt-vars .msg { flex: 1 1 100%; color: var(--color-danger); font: 12.5px/1.4 var(--font-mono); }
.vt-steps { list-style: none; margin: 10px 0 0; padding: 8px; display: grid; gap: 4px; }
.vt-steps li { display: grid; grid-template-columns: 2em minmax(0, 1fr); gap: 1px 8px; align-items: baseline; padding: 5px 8px; border-radius: 7px; background: #0f182c; }
.vt-steps li.last { box-shadow: inset 0 0 0 1px #3b4b6e; }
.vt-steps .n { color: #8a99b3; font: 12px/1.4 var(--font-sans); text-align: right; }
.vt-steps .x { font: 16px/1.45 var(--font-mono); color: #e2e8f0; white-space: pre-wrap; overflow-wrap: anywhere; }
.vt-steps .why { grid-column: 2; font: 12.5px/1.4 var(--font-sans); color: #b6c2d6; }
.vt-steps .why b { color: #fde68a; font-weight: 600; }
.vt-steps .err { grid-column: 2; color: #fca5a5; font: 600 13px/1.4 var(--font-mono); white-space: pre-wrap; }
.vt-steps mark { color: inherit; background: none; }
.vt-steps mark.a { border-bottom: 2px solid #facc15; background: rgba(250, 204, 21, .16); border-radius: 3px 3px 0 0; }
.vt-steps mark.b { background: rgba(52, 211, 153, .22); color: #bbf7d0; border-radius: 3px; }
.vt-steps .fin { display: inline-flex; margin-left: 8px; vertical-align: 2px; }
.vt-ladder { padding: 8px 0; }
.vt-ladder h4 { margin: 0; padding: 0 10px 6px; font: 600 12.5px/1.3 var(--font-sans); color: #b6c2d6; border-bottom: 1px solid #1e2a44; }
.vt-ladder ol { list-style: none; margin: 0; padding: 4px 6px 0; }
.vt-ladder li { display: grid; grid-template-columns: 1.4em 7.2em minmax(0, 1fr); gap: 6px; align-items: baseline; padding: 3px 4px; border-radius: 6px; font: 12.5px/1.35 var(--font-sans); color: #b6c2d6; }
.vt-ladder li .r { color: #64748b; text-align: right; font-size: 11px; }
.vt-ladder li .o { font: 600 13px/1.35 var(--font-mono); color: #e2e8f0; }
.vt-ladder li.on { background: rgba(250, 204, 21, .18); box-shadow: inset 3px 0 0 #facc15; color: #fef3c7; }
.vt-ladder li.on .o { color: #fde68a; }
.vt-dgrid { display: grid; gap: 12px; grid-template-columns: minmax(0, 1fr); }
@container vt (min-width: 740px) { .vt-dgrid { grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr); align-items: start; } }
.vt-dcv { position: relative; min-width: 0; border-radius: 10px; overflow: hidden; background: #0b1220; border: 1px solid #1e2a44; height: 240px; }
.vt-dres { padding: 10px 12px; display: grid; gap: 6px; font: 14px/1.45 var(--font-mono); }
.vt-dres div { overflow-wrap: anywhere; }
.vt-dres .lbl { font: 12.5px/1.4 var(--font-sans); color: #b6c2d6; }
.vt-dres .q { color: #60a5fa; font-weight: 700; } .vt-dres .r { color: #fb923c; font-weight: 700; } .vt-dres .f { color: #2dd4bf; font-weight: 700; }
.vt-dres .chk { color: #cbd5e1; }
.vt-fgrid { display: grid; gap: 10px; grid-template-columns: minmax(0, 1fr); }
@container vt (min-width: 600px) { .vt-fgrid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); } }
.vt-fres { margin-top: 10px; padding: 12px; font: 14px/1.5 var(--font-mono); overflow-wrap: anywhere; }
.vt-fres .line { margin: 0 0 6px; white-space: pre-wrap; }
.vt-fres .dim { color: #8a99b3; }
.vt-cells { display: flex; flex-wrap: wrap; margin: 6px 0 8px; padding: 0 0 1.5px 1.5px; }
.vt-cell { display: flex; flex-direction: column; align-items: center; min-width: 22px; margin: 0 0 -1.5px -1.5px; padding: 2px 4px 0; border: 1.5px solid #c3e88d;
  background: color-mix(in srgb, #c3e88d 9%, #0b1220); color: #c3e88d; font: 600 16px/1.3 var(--font-mono); }
.vt-cell .i { font: 9.5px/1.3 var(--font-sans); color: #8a99b3; }
.vt-cell.sp { color: #64748b; }

/* names */
.vt-ngrid { display: grid; gap: 14px; grid-template-columns: minmax(0, 1fr); }
@container vt (min-width: 740px) { .vt-ngrid { grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); align-items: start; } }
.vt-tiles { display: flex; flex-wrap: wrap; gap: 3px; margin: 12px 0 4px; min-height: 52px; }
.vt-tile { display: flex; flex-direction: column; align-items: center; min-width: 26px; padding: 3px 4px 2px; border-radius: 6px; border: 1.5px solid #3b4b6e;
  background: #0f182c; color: #e2e8f0; font: 600 18px/1.25 var(--font-mono); }
.vt-tile .i { font: 10px/1.2 var(--font-sans); color: #8a99b3; white-space: nowrap; }
.vt-tile.bad { border-color: #f87171; background: color-mix(in srgb, #f87171 24%, #0f182c); color: #fecaca; }
.vt-tile.bad .i { color: #fca5a5; }
.vt-tile.kw { border-color: #c792ea; background: color-mix(in srgb, #c792ea 24%, #0f182c); color: #f3e8ff; }
.vt-verdict { margin: 8px 0 0; padding: 8px 12px; border-radius: 8px; font: 700 15px/1.4 var(--font-sans); color: var(--color-fg); }
.vt-verdict.ok { background: color-mix(in srgb, var(--color-ok) 15%, transparent); border: 1px solid var(--color-ok); }
.vt-verdict.warn { background: color-mix(in srgb, var(--color-warn) 15%, transparent); border: 1px solid var(--color-warn); }
.vt-verdict.bad { background: color-mix(in srgb, var(--color-danger) 12%, transparent); border: 1px solid var(--color-danger); }
.vt-rules { list-style: none; margin: 10px 0 0; padding: 0; display: grid; gap: 4px; }
.vt-rules li { display: grid; grid-template-columns: 1.6em minmax(0, 1fr); gap: 6px; align-items: start; padding: 5px 8px; border-radius: 7px;
  background: var(--color-surface-2); font-size: 13.5px; line-height: 1.45; color: var(--color-fg); }
.vt-rules li .m { font-weight: 800; text-align: center; }
.vt-rules li.ok .m { color: var(--color-ok); } .vt-rules li.bad .m { color: var(--color-danger); } .vt-rules li.warn .m { color: var(--color-warn); }
.vt-rules li.na { color: var(--color-muted); } .vt-rules li.na .m { color: var(--color-muted); }
.vt-rules li small { display: block; color: var(--color-muted); font-size: 12.5px; }
.vt-py { margin-top: 12px; padding: 10px 12px; font: 13.5px/1.5 var(--font-mono); overflow-wrap: anywhere; }
.vt-py .line { margin: 0 0 4px; white-space: pre-wrap; }
.vt-py .ok { color: #86efac; } .vt-py .bad { color: #fca5a5; } .vt-py .dim { color: #8a99b3; }
.vt-py .note { margin-top: 6px; font: 13px/1.45 var(--font-sans); color: #dbe4f3; }
.vt-quiz { padding: 12px; border: 1px solid var(--color-border); border-radius: 10px; background: color-mix(in srgb, var(--color-fg) 3%, var(--color-surface)); }
.vt-quiz .qn { display: inline-block; margin: 6px 0 10px; padding: 6px 14px; border-radius: 8px; background: #0b1220; color: #e2e8f0; font: 700 20px/1.3 var(--font-mono); white-space: pre; max-width: 100%; overflow-x: auto; }
.vt-quiz .fb { margin: 10px 0 0; font-size: 14px; line-height: 1.5; color: var(--color-fg); }
.vt-quiz .fb.ok b { color: var(--color-ok); } .vt-quiz .fb.bad b { color: var(--color-danger); }
.vt-quiz .score { float: right; font: 600 13px/1.4 var(--font-mono); color: var(--color-muted); }
.vt-ctl .vt-help { margin: 0; font-size: 13px; line-height: 1.5; color: var(--color-muted); }
.vt-ctl textarea.vt-in { min-height: 64px; resize: vertical; }
.vt-ctl .vt-sub { font-size: 12.5px; line-height: 1.45; color: var(--color-muted); margin: 4px 0 0; }
`;

// ---------------------------------------------------------------------------------------------------------------
export function mount(rootEl) {
  const lang = getLocale() === 'id' ? 'id' : 'en';
  const T = (en, id) => (lang === 'id' ? id : en);
  // how far a run got before the simulation's own limit stopped it (not a Python error)
  const limitWhat = (e) => (e?.limitKind === 'iterations'
    ? T(`${e.limit} loop rounds inside one step`, `${e.limit} putaran di dalam satu langkah`)
    : T(`${e?.limit ?? MAX_STEPS} steps`, `${e?.limit ?? MAX_STEPS} langkah`));
  const L = (v) => (v && typeof v === 'object' && !Array.isArray(v) && ('en' in v || 'id' in v) ? v[lang] : v);
  const uid = 'vt' + Math.random().toString(36).slice(2, 8);
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  let destroyed = false;
  const cleanups = [];

  const style = document.createElement('style');
  style.textContent = CSS;
  rootEl.appendChild(style);

  const mk = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  const main = mk('div', 'vt');
  rootEl.appendChild(main);
  const ctrl = mk('div', 'sim-controls vt-ctl');
  ctrl.style.alignContent = 'start';
  rootEl.appendChild(ctrl);
  const live = mk('div', 'vt-sr');
  live.setAttribute('aria-live', 'polite');
  main.appendChild(live);
  const announce = (txt) => { live.textContent = ''; requestAnimationFrame(() => { if (!destroyed) live.textContent = txt; }); };

  // ------------------------------------------------------------------------------------------------- tabs
  const MODES = [
    ['mem', '📦', T('Memory boxes', 'Kotak memori')],
    ['types', '🏷️', T('Types', 'Tipe data')],
    ['ops', '➗', T('Operators', 'Operator')],
    ['names', '✏️', T('Naming rules', 'Aturan nama')],
  ];
  const tabs = mk('div', 'vt-tabs');
  tabs.setAttribute('role', 'tablist');
  tabs.setAttribute('aria-label', T('Modes', 'Mode'));
  main.appendChild(tabs);
  const tabBtns = new Map(), panels = new Map(), ctlGroups = new Map();
  for (const [key, ico, label] of MODES) {
    const b = mk('button', 'vt-tab', `<span class="ico" aria-hidden="true">${ico}</span><span>${esc(label)}</span>`);
    b.type = 'button';
    b.id = `${uid}-tab-${key}`;
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-controls', `${uid}-panel-${key}`);
    b.addEventListener('click', () => setMode(key, false));
    tabs.appendChild(b);
    tabBtns.set(key, b);
    const p = mk('section', 'vt-panel');
    p.id = `${uid}-panel-${key}`;
    p.setAttribute('role', 'tabpanel');
    p.setAttribute('aria-labelledby', b.id);
    p.hidden = true;
    main.appendChild(p);
    panels.set(key, p);
    const g = mk('div', 'vt-ctlgrp');
    g.style.display = 'grid';
    g.style.gap = '12px';
    g.hidden = true;
    ctrl.appendChild(g);
    ctlGroups.set(key, g);
  }
  tabs.addEventListener('keydown', (ev) => {
    const keys = MODES.map((m) => m[0]);
    const i = keys.indexOf(mode);
    let j = -1;
    if (ev.key === 'ArrowRight' || ev.key === 'ArrowDown') j = (i + 1) % keys.length;
    else if (ev.key === 'ArrowLeft' || ev.key === 'ArrowUp') j = (i - 1 + keys.length) % keys.length;
    else if (ev.key === 'Home') j = 0;
    else if (ev.key === 'End') j = keys.length - 1;
    if (j < 0) return;
    ev.preventDefault();
    setMode(keys[j], true);
  });
  let mode = 'mem';
  function setMode(key, focus) {
    if (!panels.has(key)) return;
    mode = key;
    for (const [k, b] of tabBtns) {
      const on = k === key;
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
      panels.get(k).hidden = !on;
      ctlGroups.get(k).hidden = !on;
    }
    if (focus) tabBtns.get(key).focus();
    if (key !== 'mem') memPause();
    requestAnimationFrame(() => {
      if (destroyed) return;
      if (key === 'mem') drawMem();
      if (key === 'ops') drawDiv();
    });
  }
  registerParam('mode', { get: () => mode, set: (v) => setMode(String(v), false), initial: 'mem' });

  // ===============================================================================================================
  // MEMORY BOXES
  // ===============================================================================================================
  const pMem = panels.get('mem');
  pMem.appendChild(mk('p', 'vt-intro', T(
    '<b>Manusia Variabel</b> (human variables): every variable is a labelled box. Press <b>Step</b> to run one line: values are read out of boxes, the right side of <code>=</code> is worked out first, and the result is put into the box on the left, replacing what was there.',
    '<b>Manusia Variabel</b>: setiap variabel adalah kotak berlabel. Tekan <b>Langkah</b> untuk menjalankan satu baris: nilai dibaca dari kotak, sisi kanan <code>=</code> dihitung dulu, lalu hasilnya dimasukkan ke kotak di sebelah kiri dan menggantikan isi lamanya.')));
  const bar = mk('div', 'vt-bar');
  bar.setAttribute('role', 'group');
  bar.setAttribute('aria-label', T('Run controls', 'Kontrol jalannya program'));
  const bBack = button({ label: T('◀ Back', '◀ Mundur'), onClick: () => memBack() });
  const bStep = button({ label: T('Step ▶', 'Langkah ▶'), primary: true, onClick: () => { memPause(); memStep(true); } });
  const bRun = button({ label: T('▶ Run', '▶ Jalankan'), onClick: () => memTogglePlay() });
  const bEnd = button({ label: T('⏭ To end', '⏭ Ke akhir'), onClick: () => memToEnd() });
  const bReset = button({ label: T('⟲ Reset', '⟲ Ulang'), onClick: () => { memReset(); announce(T('Reset: no line has run yet.', 'Diulang: belum ada baris yang dijalankan.')); } });
  bBack.el.setAttribute('aria-label', T('Back one step', 'Mundur satu langkah'));
  bStep.el.setAttribute('aria-label', T('Step: run the next line', 'Langkah: jalankan baris berikutnya'));
  bEnd.el.setAttribute('aria-label', T('To end: run the rest of the program', 'Ke akhir: jalankan sisa program'));
  const count = mk('span', 'vt-count');
  bar.append(bBack.el, bStep.el, bRun.el, bEnd.el, bReset.el, count);
  pMem.appendChild(bar);

  const mgrid = mk('div', 'vt-mgrid');
  const mleft = mk('div', 'vt-mleft');
  const mright = mk('div', 'vt-mright');
  mgrid.append(mleft, mright);
  pMem.appendChild(mgrid);
  const codeWrap = mk('div', 'vt-mcode');
  const cp = codePanel({
    value: '', language: 'python', editable: true, minLines: 6, maxLines: 14, title: 'main.py', locale: lang,
    ariaLabel: T('Python program (editable)', 'Program Python (dapat diedit)'),
    onChange: () => memEdited(),
  });
  const restoreBtn = document.createElement('button');
  restoreBtn.type = 'button';
  restoreBtn.textContent = T('↺ Original', '↺ Kode awal');
  restoreBtn.title = T('Put back the preset program', 'Kembalikan program contoh');
  restoreBtn.disabled = true;
  restoreBtn.addEventListener('click', () => loadMemPreset(memPreset.key));
  cp.actions.appendChild(restoreBtn);
  codeWrap.appendChild(cp.el);
  const conWrap = mk('div', 'vt-mcon');
  const out = consolePanel({
    minLines: 3, maxLines: 7, title: T('Output (console)', 'Keluaran (konsol)'), locale: lang,
    ariaLabel: T('Program output', 'Keluaran program'),
    placeholder: T('print() output appears here.', 'Keluaran print() muncul di sini.'),
  });
  conWrap.appendChild(out.el);
  const cvWrap = mk('div', 'vt-cv vt-mcv');
  const cvMem = createCanvas(cvWrap, {});
  cvMem.canvas.setAttribute('role', 'img');
  const expl = mk('div', 'vt-exp vt-mexp');
  expl.setAttribute('aria-live', 'polite');
  mleft.append(codeWrap, conWrap);
  mright.append(cvWrap, expl);
  const trace = mk('section', 'vt-trace vt-dark');
  trace.setAttribute('aria-label', T('Trace table', 'Tabel penelusuran'));
  trace.innerHTML = `<div class="vt-trace-h"><span>${esc(T('Trace table', 'Tabel penelusuran (trace table)'))}</span><small>${esc(T('a value is written when the line changes it', 'nilai ditulis saat baris itu mengubahnya'))}</small></div>`;
  const tscroll = mk('div', 'vt-tscroll');
  tscroll.tabIndex = 0;
  tscroll.setAttribute('role', 'region');
  tscroll.setAttribute('aria-label', T('Trace table (scrollable)', 'Tabel penelusuran (dapat digulir)'));
  trace.appendChild(tscroll);
  pMem.appendChild(trace);

  // controls pane: program, inputs, speed
  const gMem = ctlGroups.get('mem');
  const memSel = select({
    label: T('Program', 'Program'), key: 'program',
    options: MEM_PRESETS.map((p, i) => ({ value: p.key, label: `${i + 1}. ${L(p.name)}` })),
    value: MEM_PRESETS[0].key,
    onChange: (v) => loadMemPreset(v),
  });
  gMem.appendChild(memSel.el);
  const inId = `${uid}-inputs`;
  const inBox = mk('div', 'ctrl');
  inBox.style.gridTemplateColumns = '1fr';
  inBox.innerHTML = `<label for="${inId}">${esc(T('Input values (one per line)', 'Nilai masukan (satu per baris)'))}</label>`;
  const inTa = document.createElement('textarea');
  inTa.id = inId;
  inTa.className = 'vt-in sm';
  inTa.rows = 2;
  inTa.spellcheck = false;
  inTa.addEventListener('input', () => memEdited(true));
  inBox.appendChild(inTa);
  inBox.appendChild(mk('p', 'vt-sub', esc(T('Each input() call takes the next line. If they run out, type the value in the console.', 'Setiap input() mengambil baris berikutnya. Jika habis, ketik nilainya di konsol.'))));
  gMem.appendChild(inBox);
  let speedIdx = reduceMotion ? 5 : 2;
  const SPEED_NAMES = [T('slow', 'lambat'), T('normal', 'normal'), T('fast', 'cepat'), T('very fast', 'sangat cepat'), T('instant', 'instan')];
  const speedCtl = slider({
    label: T('Animation speed', 'Kecepatan animasi'), key: 'speed', min: 1, max: 5, step: 1, value: speedIdx,
    format: (v) => SPEED_NAMES[v - 1] || '', onInput: (v) => { speedIdx = v; },
  });
  gMem.appendChild(speedCtl.el);
  gMem.appendChild(mk('p', 'vt-help', esc(T(
    'Edit the code to make your own experiment (Modify in PRIMM). Only variables of the main program are drawn as boxes.',
    'Ubah kode untuk membuat percobaan sendiri (Modify dalam PRIMM). Hanya variabel program utama yang digambar sebagai kotak.'))));

  // ---- state
  let memPreset = MEM_PRESETS[0];
  let lines = [];
  let run = null, compileErr = null, dirty = true, edited = false;
  let hist = [];          // hist[0] = before any line; hist[k] = after the k-th statement
  let cur = 0;
  let segs = [], segLen = 0;
  let pend = null;        // step being collected while the program waits for input
  let playing = false, playTimer = 0;
  let anim = null;        // { to, t, read, comp, write, settle, total }
  let promptRun = null;
  let lastConsoleKey = '';

  const memAnimator = loop((dt) => {
    if (!anim) { memAnimator.stop(); return; }
    anim.t += dt;
    if (anim.t >= anim.total) {
      anim = null;
      drawMem();
      memAnimator.stop();
      if (playing) schedulePlay();
      return;
    }
    drawMem();
  });
  cleanups.push(() => memAnimator.stop());

  function loadMemPreset(key) {
    const p = MEM_PRESETS.find((x) => x.key === key) || MEM_PRESETS[0];
    memPreset = p;
    if (memSel.value !== p.key) memSel.value = p.key;
    cp.value = L(p.code).replace(/\n$/, '');
    inTa.value = (L(p.inputs) || []).join('\n');
    edited = false;
    restoreBtn.disabled = true;
    memReset();
  }
  function memEdited(fromInputs) {
    if (!fromInputs) { edited = true; restoreBtn.disabled = false; }
    memPause();
    dirty = true;
    finishAnim();
    renderMem();
  }
  const inputList = () => (inTa.value === '' ? [] : inTa.value.replace(/\r\n?/g, '\n').split('\n'));

  function addSeg(kind, text) {
    if (!text) return;
    const last = segs[segs.length - 1];
    if (last && last.kind === kind) last.text += text;
    else segs.push({ kind, text });
    segLen += text.length;
  }
  function segsUpTo(len) {
    const outS = [];
    let n = 0;
    for (const s of segs) {
      if (n >= len) break;
      const take = s.text.slice(0, len - n);
      outS.push({ kind: s.kind, text: take });
      n += take.length;
    }
    return outS;
  }

  function memReset() {
    memPause();
    finishAnim();
    out.cancelPrompt();
    promptRun = null;
    hist = []; cur = 0; segs = []; segLen = 0; pend = null; compileErr = null; run = null; dirty = false; lastConsoleKey = '';
    const src = cp.value;
    lines = src.replace(/\r\n?/g, '\n').split('\n');
    const c = compile(src, { filename: 'main.py' });
    const base = { vars: new Map(), execLine: null, nextLine: null, status: 'ready', error: null, outLen: 0, outText: '', inputs: [], changed: [], depth: 1, fname: '', info: { kind: 'start' } };
    if (!c.ok) {
      compileErr = c.error;
      addSeg('err', String(c.error.traceback || `${c.error.type}: ${c.error.message}`).replace(/\n*$/, '\n'));
      base.status = 'error';
      base.outLen = segLen;
      hist.push(base);
    } else {
      run = createRun(c.program, { inputs: inputList(), echoInput: true, maxSteps: MAX_STEPS, locale: lang });
      const ev = run.step();
      if (ev.kind === 'line') base.nextLine = ev.line;
      else if (ev.kind === 'exception') { addSeg('err', String(ev.error.traceback).replace(/\n*$/, '\n')); base.status = 'error'; base.error = ev.error; }
      else base.status = 'done';
      base.outLen = segLen;
      hist.push(base);
    }
    renderMem();
    drawMem();
  }
  const finished = (e) => !e || e.status === 'done' || e.status === 'error';
  const head = () => hist[hist.length - 1];

  /** Run the program until the next statement starts. 'step' | 'wait' | 'end'. */
  function advance() {
    if (!run || finished(head())) return 'end';
    if (run.status === 'waiting-input') return 'wait';
    const st = pend || (pend = { inputs: [], outStart: segLen });
    for (let guard = 0; guard < 500000; guard++) {
      const ev = run.step();
      if (ev.kind === 'output') addSeg(ev.echo ? 'in' : ev.stderr ? 'err' : 'out', ev.text);
      else if (ev.kind === 'input') {
        if (ev.wait || run.status === 'waiting-input') return 'wait';
        if (ev.value != null) st.inputs.push(String(ev.value));
      } else if (ev.kind === 'line') { pushEntry(st, ev.line, null, 'running'); break; }
      else if (ev.kind === 'exception') {
        // the step limit is the simulation's, not a Python error: no traceback for it in the console, and its note
        // starts on a line of its own; a traceback follows the output straight away, as in python3
        const limit = ev.error.simulatorLimit === true;
        const txt = segs.length ? segs[segs.length - 1].text : '';
        if (limit && txt && !txt.endsWith('\n')) addSeg('out', '\n');
        addSeg('err', limit
          ? `⏹ ${T('Stopped by the simulation after', 'Dihentikan oleh simulasi setelah')} ${limitWhat(ev.error)} ${T('(an infinite loop?)', '(perulangan tanpa akhir?)')}\n`
          : String(ev.error.traceback).replace(/\n*$/, '\n'));
        pushEntry(st, null, ev.error, 'error');
        break;
      } else if (ev.kind === 'done') { pushEntry(st, null, null, 'done'); break; }
    }
    pend = null;
    return 'step';
  }
  function pushEntry(st, nextLine, error, status) {
    const snap = run.snapshot();
    const prev = head();
    const vars = new Map();
    for (const l of (snap.frames[0] && snap.frames[0].locals) || []) vars.set(l.name, l.value);
    const e = {
      vars, execLine: prev.nextLine, nextLine, status, error,
      outLen: segLen, outText: segs.map((s) => s.text).join('').slice(st.outStart), inputs: st.inputs,
      depth: snap.frames.length, fname: snap.frames.length > 1 ? snap.frames[snap.frames.length - 1].name : '',
    };
    e.changed = [...vars.keys()].filter((n) => !sameView(prev.vars.get(n), vars.get(n)));
    e.removed = [...prev.vars.keys()].filter((n) => !vars.has(n));
    e.info = analyse(e, prev);
    hist.push(e);
  }

  // ---- statement analysis --------------------------------------------------------------------------------
  function blockEnd(lineNo) {
    const ind = (lines[lineNo - 1] || '').match(/^\s*/)[0].length;
    let last = lineNo;
    for (let i = lineNo; i < lines.length; i++) {
      const t = lines[i];
      if (!t.trim() || /^\s*#/.test(t)) continue;
      if (t.match(/^\s*/)[0].length <= ind) break;
      last = i + 1;
    }
    return last;
  }
  function chainFor(expr, prevVars, inputs, actual) {
    const steps = [expr];
    let s = expr;
    let ts = toks1(s);
    if (!ts) return { steps, ok: true };
    // input(...) calls become the typed text
    if (inputs.length && ts.some((t) => isNameTok(t) && t.text === 'input')) {
      const spans = [];
      for (let i = 0; i < ts.length; i++) {
        if (!(isNameTok(ts[i]) && ts[i].text === 'input' && ts[i + 1] && ts[i + 1].text === '(')) continue;
        if (i > 0 && ts[i - 1].text === '.') continue;
        let d = 0, j = i + 1;
        for (; j < ts.length; j++) { if (isOpen(ts[j])) d++; else if (isClose(ts[j])) { d--; if (d === 0) break; } }
        if (j < ts.length) spans.push([ts[i].s, ts[j].e]);
      }
      if (spans.length) {
        let r = s;
        for (let k = Math.min(spans.length, inputs.length) - 1; k >= 0; k--) r = r.slice(0, spans[k][0]) + pyRepr(inputs[k]) + r.slice(spans[k][1]);
        if (r !== s) { s = r; steps.push(s); ts = toks1(s) || []; }
      }
    }
    // only reduce plain data: calls of the program's own functions, modules (random, math) or unknown names
    // could give a different value from the run
    const risky = ts.some((t, i) => {
      if (!isNameTok(t) || (i > 0 && ts[i - 1].text === '.')) return false;
      if (ts[i + 1] && ts[i + 1].text === '=' ) return false;
      const v = prevVars.get(t.text);
      if (v) return ['function', 'module', 'object'].includes(v.type);
      return t.type !== 'builtin' || t.text === 'input';
    });
    if (risky) {
      if (actual != null && actual !== steps[steps.length - 1]) steps.push(actual);
      return { steps, ok: true, partial: true };
    }
    let red = null;
    try { red = reduceExpression(s, Object.fromEntries(prevVars)); } catch { red = null; }
    if (!red || !Array.isArray(red.steps)) {
      if (actual != null) steps.push(actual);
      return { steps, ok: true, partial: true };
    }
    const more = red.steps.slice(1);
    if (actual != null && red.ok && more.length && more[more.length - 1] !== actual) {
      if (actual !== steps[steps.length - 1]) steps.push(actual);
      return { steps, ok: true, partial: true };
    }
    if (!red.ok && actual != null) {    // the run had no error here: do not show one
      if (actual !== steps[steps.length - 1]) steps.push(actual);
      return { steps, ok: true, partial: true };
    }
    steps.push(...more);
    return { steps: steps.slice(0, 16), ok: red.ok, error: red.ok ? null : red.error };
  }
  function analyse(e, prev) {
    const info = { kind: 'other', src: '', pre: '', post: '', chain: [], reads: [], writes: [], cond: null, loopEnd: false, items: null, iter: 0, multi: false, aug: '', copyFrom: '' };
    if (e.execLine == null) return info;
    // which statement of the line ran: one-line compound statements and `a = 1; b = 2` give several events per line
    const parts = lineParts(lines[e.execLine - 1] || '');
    let pi = parts[0].quiet ? 1 : 0;
    if (parts.length > 1) {
      if (parts[0].fn) pi = prev.fname === parts[0].fn ? 1 : 0;
      // the statement that ran before this one at the same level (skipping the lines of functions it called):
      // on this line too, then this is the next statement of the line
      let j = hist.length - 1;
      while (j >= 1 && hist[j - 1].depth > prev.depth) j--;
      const last = j >= 1 ? hist[j] : null;
      if (last && last.execLine === e.execLine && last.info && last.info.pi != null && last.info.pi + 1 < parts.length) pi = last.info.pi + 1;
    }
    pi = Math.min(pi, parts.length - 1);
    info.pi = pi;
    const inlineHead = parts.length > 1 && pi === 0 && !!parts[0].head;
    const src = parts[pi].text;
    info.src = src;
    const ts = toks1(src) || [];
    const f = ts[0];
    // does the body of this if / elif / while / for run next? (a one-line body runs on the same line)
    const bodyRuns = () => e.nextLine != null && (inlineHead ? e.nextLine === e.execLine : e.nextLine > e.execLine && e.nextLine <= blockEnd(e.execLine));
    const lastColon = () => { for (let i = ts.length - 1; i >= 0; i--) if (ts[i].type === 'op' && ts[i].text === ':') return i; return -1; };
    if (f && f.type === 'keyword' && f.text === 'for') {
      info.kind = 'for';
      const inI = ts.findIndex((t, i) => i > 0 && t.type === 'keyword' && t.text === 'in');
      const targets = inI > 0 ? ts.slice(1, inI).filter(isNameTok).map((t) => t.text) : [];
      info.loopEnd = !bodyRuns() || !!e.error;
      info.targets = targets;
      if (inI > 0 && ts[inI + 1] && (ts[inI + 1].text === '[' || ts[inI + 1].text === '(')) info.items = literalItems(ts, inI + 1);
      if (!info.loopEnd) {
        // which round of the loop: count earlier rounds since this loop last ended
        let n = 0;
        for (let j = hist.length - 1; j >= 1; j--) {
          const h = hist[j];
          if (h.execLine !== e.execLine || !h.info || h.info.kind !== 'for') continue;
          if (h.info.loopEnd) break;
          n++;
        }
        info.iter = n;
        info.writes = targets.filter((n2) => e.vars.has(n2)).map((n2) => ({ name: n2, from: 'item' }));
      }
      return info;
    }
    if (f && f.type === 'keyword' && ['if', 'elif', 'while'].includes(f.text)) {
      const c = lastColon();
      const cond = c > 0 ? src.slice(f.e, ts[c].s).trim() : src.slice(f.e).trim();
      info.kind = 'cond';
      info.kw = f.text;
      info.pre = f.text + ' ';
      info.post = ':';
      const ch = chainFor(cond, prev.vars, e.inputs, null);
      info.chain = ch.steps;
      info.chainErr = ch.error;
      info.reads = readsOf(cond, prev.vars);
      info.cond = e.error ? null : bodyRuns();
      return info;
    }
    // assignment: NAME = ..., a, b = ..., NAME op= ...
    const AUG = ['+=', '-=', '*=', '/=', '//=', '%=', '**='];
    if (f && isNameTok(f) && ts[1] && ts[1].type === 'op' && AUG.includes(ts[1].text)) {
      const rhs = src.slice(ts[1].e).trim();
      const rt = toks1(rhs) || [];
      const op = ts[1].text.slice(0, -1);
      const expr = `${f.text} ${op} ${rt.length > 1 ? `(${rhs})` : rhs}`;
      info.kind = 'assign';
      info.aug = ts[1].text;
      info.lhs = f.text;
      info.pre = f.text + ' = ';
      const nv = e.vars.get(f.text);
      const ch = chainFor(expr, prev.vars, e.inputs, e.error ? null : nv ? nv.repr : null);
      info.chain = ch.steps; info.chainErr = ch.error;
      info.reads = readsOf(expr, prev.vars);
      info.writes = nv && !e.error ? [{ name: f.text, from: 'expr' }] : [];
      return info;
    }
    let d = 0;
    const eqs = [];
    for (let i = 0; i < ts.length; i++) {
      if (isOpen(ts[i])) d++; else if (isClose(ts[i])) d--;
      else if (d === 0 && ts[i].type === 'op' && ts[i].text === '=') eqs.push(i);
    }
    if (eqs.length) {
      const lastEq = eqs[eqs.length - 1];
      const rhs = src.slice(ts[lastEq].e).trim();
      const groups = [];
      let from = 0;
      for (const q of eqs) { groups.push(ts.slice(from, q)); from = q + 1; }
      const simple = groups.every((g) => g.length && g.every((t) => isNameTok(t) || (t.type === 'op' && (t.text === ',' || t.text === '(' || t.text === ')' || t.text === '[' || t.text === ']'))));
      info.kind = simple ? 'assign' : 'other';
      info.lhs = src.slice(0, ts[lastEq].s).trim();
      info.pre = info.lhs + ' = ';
      const targets = simple ? groups.flatMap((g) => g.filter(isNameTok).map((t) => t.text)) : [];
      const multi = simple && groups.length === 1 && targets.length > 1;
      info.multi = multi;
      let actual = null;
      if (!e.error && simple) {
        if (!multi && targets.length) { const v = e.vars.get(targets[0]); actual = v ? v.repr : null; }
      }
      const ch = chainFor(rhs, prev.vars, e.inputs, actual);
      info.chain = ch.steps; info.chainErr = ch.error;
      info.reads = readsOf(rhs, prev.vars);
      const rt = toks1(rhs) || [];
      if (simple && !e.error) {
        const single = rt.length === 1 && isNameTok(rt[0]) && prev.vars.has(rt[0].text) ? rt[0].text : '';
        let rhsNames = null;
        if (multi) {
          const parts = rt.filter((t) => !(t.type === 'op' && (t.text === ',' || t.text === '(' || t.text === ')')));
          if (parts.length === targets.length && parts.every((t) => isNameTok(t) && prev.vars.has(t.text)) && rt.filter((t) => t.text === ',').length === targets.length - 1) rhsNames = parts.map((t) => t.text);
        }
        targets.forEach((n, k) => {
          if (!e.vars.has(n)) return;
          if (single) info.writes.push({ name: n, from: 'var', src: single });
          else info.writes.push({ name: n, from: 'expr', idx: multi ? k : -1, src: rhsNames ? rhsNames[k] : '' });
        });
        if (single) info.copyFrom = single;
      }
      return info;
    }
    if (f && isNameTok(f)) {
      info.kind = f.text === 'print' && ts[1] && ts[1].text === '(' ? 'print' : 'expr';
      const ch = chainFor(src, prev.vars, e.inputs, null);
      let steps = ch.steps;
      if (info.kind === 'print' && ch.ok && steps.length > 1 && steps[steps.length - 1] === 'None') steps = steps.slice(0, -1);
      info.chain = steps;
      info.chainErr = ch.error;
      info.reads = readsOf(src, prev.vars);
      return info;
    }
    return info;
  }

  // ---- stepping ---------------------------------------------------------------------------------------------
  function ensureLoaded() {
    if (dirty || (!run && !compileErr)) memReset();
    return !compileErr && hist.length > 0;
  }
  function memStep(manual) {
    if (!ensureLoaded()) { renderMem(); return false; }
    finishAnim();
    if (cur < hist.length - 1) {
      cur++;
    } else {
      const r = advance();
      if (r === 'wait') { renderMem(); drawMem(); return false; }
      if (r !== 'step') { renderMem(); return false; }
      cur = hist.length - 1;
    }
    renderMem();
    startAnim(cur);
    if (manual) announce(stripTags(explainHTML(cur)));
    return true;
  }
  function memBack() {
    memPause();
    finishAnim();
    if (cur > 0) { cur--; renderMem(); drawMem(); announce(stripTags(explainHTML(cur))); }
  }
  function memToEnd() {
    memPause();
    if (!ensureLoaded()) { renderMem(); return; }
    finishAnim();
    let r = 'step', n = 0;
    while (r === 'step' && !finished(head()) && n++ < MAX_STEPS + 10) r = advance();
    cur = hist.length - 1;
    renderMem();
    drawMem();
    announce(stripTags(explainHTML(cur)));
  }
  function memTogglePlay() {
    if (playing) { memPause(); renderMem(); return; }
    if (!ensureLoaded()) { renderMem(); return; }
    if (cur === hist.length - 1 && finished(head())) return;
    playing = true;
    renderBar();
    if (!memStep(false)) { memPause(); renderMem(); return; }
    if (!anim) schedulePlay();
  }
  function schedulePlay() {
    clearTimeout(playTimer);
    if (!playing) return;
    if (cur === hist.length - 1 && finished(head())) { memPause(); renderMem(); return; }
    const sp = SPEEDS[speedIdx - 1] || 1;
    const gap = sp === Infinity ? 650 : 450 / sp;
    playTimer = setTimeout(() => {
      if (!playing || destroyed) return;
      if (!memStep(false)) { memPause(); renderMem(); return; }
      if (!anim) schedulePlay();
    }, gap);
  }
  function memPause() {
    if (!playing) return;
    playing = false;
    clearTimeout(playTimer);
    renderBar();
  }
  function startAnim(to) {
    const e = hist[to];
    const sp = SPEEDS[speedIdx - 1] || 1;
    if (!e || to === 0 || sp === Infinity || reduceMotion) { anim = null; drawMem(); return; }
    const i = e.info;
    const read = i.reads && i.reads.length ? 0.6 : 0;
    const comp = Math.max(0, (i.chain ? i.chain.length : 1) - 1) * 0.55;
    const write = (i.writes && i.writes.length) || e.changed.length || e.removed.length ? 0.75 : 0;
    const settle = 0.4;
    anim = { to, t: 0, read: read / sp, comp: comp / sp, write: write / sp, settle: settle / sp };
    anim.total = anim.read + anim.comp + anim.write + anim.settle;
    memAnimator.start();
  }
  function finishAnim() {
    if (!anim) return;
    anim = null;
    memAnimator.stop();
    drawMem();
  }

  // ---- input typed in the console ------------------------------------------------------------------------
  function maybePrompt() {
    const atHead = cur === hist.length - 1;
    if (!run || !atHead || run.status !== 'waiting-input') { if (out.waiting) out.cancelPrompt(); promptRun = null; return; }
    if (out.waiting && promptRun === run) return;
    const myRun = run;
    promptRun = run;
    out.prompt({
      echo: false, focus: false, placeholder: T('type + Enter', 'ketik + Enter'),
      ariaLabel: T('The program is waiting for input: type a value and press Enter', 'Program menunggu masukan: ketik nilai lalu tekan Enter'),
    }).then((v) => {
      if (promptRun === myRun) promptRun = null;
      if (v == null || destroyed || run !== myRun || myRun.status !== 'waiting-input') return;
      const v1 = String(v).replace(/\r?\n[\s\S]*$/, '');
      inTa.value = inTa.value && !inTa.value.endsWith('\n') ? `${inTa.value}\n${v1}` : `${inTa.value}${v1}`;
      if (pend) pend.inputs.push(v1);
      myRun.provideInput(v1);
      const r = advance();
      if (r === 'step') { cur = hist.length - 1; renderMem(); startAnim(cur); announce(stripTags(explainHTML(cur))); }
      else { renderMem(); drawMem(); }
    });
    requestAnimationFrame(() => {
      if (destroyed) return;
      const inp = out.el.querySelector('input');
      if (inp && main.contains(document.activeElement)) inp.focus({ preventScroll: true });
    });
  }

  // ---- rendering (DOM) --------------------------------------------------------------------------------------
  const stripTags = (h) => String(h).replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
  const codeH = (s) => `<code>${esc(s)}</code>`;
  function renderBar() {
    const atStart = cur === 0;
    const atEnd = cur === hist.length - 1 && finished(head());
    bBack.el.disabled = atStart || !!compileErr || dirty;
    bStep.el.disabled = !dirty && (!!compileErr || atEnd);
    bEnd.el.disabled = !dirty && (!!compileErr || atEnd);
    bRun.label = playing ? T('⏸ Pause', '⏸ Jeda') : T('▶ Run', '▶ Jalankan');
    bRun.el.disabled = !playing && !dirty && (!!compileErr || atEnd);
    const total = finished(head()) ? hist.length - 1 : null;
    count.textContent = dirty ? '' : total != null ? T(`Step ${cur} / ${total}`, `Langkah ${cur} / ${total}`) : T(`Step ${cur}`, `Langkah ${cur}`);
  }
  function renderMem() {
    renderBar();
    if (dirty) {
      cp.setActiveLine(null);
      cp.setMarks([]);
      expl.innerHTML = `<p>${esc(T('The code or the input changed. Press Step or Run to start again with the new version.', 'Kode atau masukan berubah. Tekan Langkah atau Jalankan untuk memulai lagi dengan versi baru.'))}</p>`;
      out.cancelPrompt();
      drawMem();
      return;
    }
    const e = hist[cur];
    // code panel
    const marks = [];
    if (compileErr) {
      const m = { line: compileErr.line || 1, kind: 'error', note: compileErr.type };
      if (compileErr.col) { m.col = compileErr.col - 1; m.endCol = compileErr.endCol ? compileErr.endCol - 1 : compileErr.col; }
      marks.push(m);
      cp.setActiveLine(null);
    } else {
      if (e.execLine && !e.error) marks.push({ line: e.execLine, kind: 'done' });
      if (e.error) marks.push({ line: e.error.line || e.execLine, kind: 'error', note: e.error.type });
      cp.setActiveLine(e.nextLine || null);
    }
    cp.setMarks(marks);
    // console
    // while input() waits, the console already shows its prompt text ("How old are you? "), as in a terminal
    const showLen = cur === hist.length - 1 && run && run.status === 'waiting-input' ? segLen : e.outLen;
    const key = `${cur}:${showLen}:${segs.length}`;
    if (key !== lastConsoleKey || !out.waiting) {
      if (!(out.waiting && promptRun === run && cur === hist.length - 1)) {
        out.set(segsUpTo(showLen));
        lastConsoleKey = key;
      }
    }
    maybePrompt();
    expl.innerHTML = explainHTML(cur);
    renderTrace();
  }
  function shortV(v, n = 28) { return v ? cut(showRepr(v), n) : '?'; }
  function explainHTML(k) {
    if (dirty) return '';
    if (compileErr) {
      return `<p><span class="bad">${esc(compileErr.type)}</span> ${esc(T('on line', 'di baris'))} ${compileErr.line}: ${codeH(compileErr.message)}</p>`
        + `<p>${esc(T('Python checks the whole program before running it, so no line has run. Fix the code (or press ↺ Original).', 'Python memeriksa seluruh program sebelum menjalankannya, jadi belum ada baris yang berjalan. Perbaiki kodenya (atau tekan ↺ Kode awal).'))}</p>`;
    }
    const e = hist[k];
    const ps = [];
    if (k === 0) {
      if (!edited && memPreset.goal) ps.push(`<p class="lesson">${L(memPreset.goal)}</p>`);
      const waiting = k === hist.length - 1 && run && run.status === 'waiting-input';
      if ((e.status === 'running' || e.status === 'ready') && !waiting) ps.push(`<p>${esc(T(`Press Step ▶ to run line ${e.nextLine}.`, `Tekan Langkah ▶ untuk menjalankan baris ${e.nextLine}.`))}</p>`);
      if (e.error) ps.push(`<p><span class="bad">${esc(e.error.type)}</span>: ${esc(e.error.message)}</p>`);
      if (e.status === 'done') ps.push(`<p>${esc(T('This program has no statements to run (only blank lines or comments). Type some code, or press ↺ Original.', 'Program ini tidak berisi pernyataan untuk dijalankan (hanya baris kosong atau komentar). Ketik kode, atau tekan ↺ Kode awal.'))}</p>`);
      if (waiting) ps.push(waitHTML());
      return ps.join('');
    }
    const i = e.info;
    const prev = hist[k - 1];
    ps.push(`<p><span class="k">${esc(T('Line', 'Baris'))} ${e.execLine}:</span> ${codeH(i.src || (lines[e.execLine - 1] || '').trim())}</p>`);
    const chainTxt = (c) => c.map((s) => codeH(s)).join(' → ');
    if (i.kind === 'assign') {
      if (i.aug) ps.push(`<p>${codeH(`${i.lhs} ${i.aug} …`)} ${esc(T('is short for', 'adalah singkatan dari'))} ${codeH(i.chain[0] ? `${i.lhs} = ${i.chain[0]}` : '')}.</p>`);
      if (i.reads.length) ps.push(`<p>${esc(T('Read', 'Baca'))}: ${i.reads.filter((r, j, a) => a.findIndex((x) => x.name === r.name) === j).map((r) => codeH(`${r.name} = ${shortV(prev.vars.get(r.name))}`)).join(', ')}.</p>`);
      if (i.chain.length > 1) ps.push(`<p>${esc(T('Right side first', 'Sisi kanan dulu'))}: ${chainTxt(i.chain)}</p>`);
      const lines2 = [];
      for (const w of i.writes) {
        const nv = e.vars.get(w.name), ov = prev.vars.get(w.name);
        const val = `${codeH(shortV(nv))} (${esc(tname(nv))})`;
        if (!ov) lines2.push(T(`A new box <b>${esc(w.name)}</b> is made and gets ${val}.`, `Kotak baru <b>${esc(w.name)}</b> dibuat dan diisi ${val}.`));
        else if (sameView(ov, nv)) lines2.push(T(`Box <b>${esc(w.name)}</b> gets ${val} again: no change.`, `Kotak <b>${esc(w.name)}</b> diisi ${val} lagi: tidak berubah.`));
        else {
          let s = T(`Box <b>${esc(w.name)}</b>: ${codeH(shortV(ov))} is replaced by ${val}.`, `Kotak <b>${esc(w.name)}</b>: ${codeH(shortV(ov))} diganti ${val}.`);
          if (tname(ov) !== tname(nv)) s += ' ' + T(`Its type changes from ${esc(tname(ov))} to ${esc(tname(nv))}.`, `Tipenya berubah dari ${esc(tname(ov))} menjadi ${esc(tname(nv))}.`);
          const stillHeld = [...e.vars.values()].some((v) => v.repr === ov.repr && v.type === ov.type);
          if (i.copyFrom && !stillHeld) s += ' ' + T(`<span class="bad">The old ${esc(shortV(ov))} is lost: no box holds it any more.</span>`, `<span class="bad">Nilai lama ${esc(shortV(ov))} hilang: tidak ada kotak yang menyimpannya lagi.</span>`);
          lines2.push(s);
        }
      }
      if (lines2.length) ps.push(`<p>${lines2.join(' ')}</p>`);
      if (i.copyFrom && i.writes.length && !e.error) {
        const sv = e.vars.get(i.copyFrom);
        const tv = e.vars.get(i.writes[0].name);
        if (isMutable(sv) && tv && tv.id === sv.id) {
          // b = a with a list: Python does not copy the list, both names refer to the same one
          ps.push(`<p>${T(`<b>${esc(i.writes[0].name)}</b> and <b>${esc(i.copyFrom)}</b> now name the <b>same</b> ${esc(tname(sv))}: Python does not copy it. A change made through one name, such as ${codeH(changeEx(i.writes[0].name, sv))}, shows in both boxes. For a separate copy write ${codeH(`${i.copyFrom}.copy()`)}.`, `<b>${esc(i.writes[0].name)}</b> dan <b>${esc(i.copyFrom)}</b> sekarang menamai ${esc(tname(sv))} yang <b>sama</b>: Python tidak menyalinnya. Perubahan lewat salah satu nama, misalnya ${codeH(changeEx(i.writes[0].name, sv))}, tampak di kedua kotak. Untuk salinan terpisah tulis ${codeH(`${i.copyFrom}.copy()`)}.`)}</p>`);
        } else {
          ps.push(`<p>${T(`<b>${esc(i.copyFrom)}</b> still holds ${codeH(shortV(sv))}. The two boxes are separate: giving one a new value later does not change the other.`, `<b>${esc(i.copyFrom)}</b> tetap berisi ${codeH(shortV(sv))}. Kedua kotak terpisah: memberi salah satunya nilai baru nanti tidak mengubah yang lain.`)}</p>`);
        }
      }
      if (i.multi && i.writes.length > 1) ps.push(`<p>${esc(T('Python works out the whole right side first, then fills all the boxes on the left at the same time, so no temp box is needed.', 'Python menghitung seluruh sisi kanan dulu, lalu mengisi semua kotak di kiri sekaligus, sehingga tidak perlu kotak bantu.'))}</p>`);
    } else if (i.kind === 'cond') {
      if (i.chain.length > 1) ps.push(`<p>${esc(T('Test the condition', 'Uji kondisinya'))}: ${chainTxt(i.chain)}</p>`);
      if (i.cond != null) {
        const res = i.cond ? '<span class="good">True</span>' : '<span class="bad">False</span>';
        let s;
        if (i.kw === 'while') s = i.cond ? T('so the loop body runs (again).', 'jadi badan perulangan dijalankan (lagi).') : T('so the loop stops.', 'jadi perulangan berhenti.');
        else s = i.cond ? T('so the indented block runs.', 'jadi blok yang menjorok dijalankan.') : T('so the indented block is skipped.', 'jadi blok yang menjorok dilewati.');
        ps.push(`<p>${T('Result', 'Hasil')}: ${res}, ${esc(s)} ${esc(T('No box changes.', 'Tidak ada kotak yang berubah.'))}</p>`);
      }
    } else if (i.kind === 'for') {
      if (i.loopEnd) ps.push(`<p>${esc(T('No items left: the loop ends and the program continues after it.', 'Tidak ada item tersisa: perulangan selesai dan program berlanjut sesudahnya.'))}</p>`);
      else {
        const parts = i.writes.map((w) => codeH(`${w.name} = ${shortV(e.vars.get(w.name))}`)).join(', ');
        const of = i.items ? T(` (item ${i.iter + 1} of ${i.items.length})`, ` (item ke-${i.iter + 1} dari ${i.items.length})`) : '';
        ps.push(`<p>${T('The loop takes the next item', 'Perulangan mengambil item berikutnya')}: ${parts}${esc(of)}. ${esc(T('The loop variable is an ordinary box that gets a new value each round.', 'Variabel perulangan adalah kotak biasa yang mendapat nilai baru setiap putaran.'))}</p>`);
      }
    } else if (i.kind === 'print' || i.kind === 'expr') {
      if (i.chain.length > 1) ps.push(`<p>${esc(T('Work out the values', 'Hitung nilainya'))}: ${chainTxt(i.chain)}</p>`);
      const ch = e.changed.filter((n) => prev.vars.has(n));
      if (i.kind === 'print' && !e.error && !ch.length) ps.push(`<p>${esc(T('print() shows the values on the console. No box changes.', 'print() menampilkan nilai di konsol. Tidak ada kotak yang berubah.'))}</p>`);
      // a method such as list.append changed a value in place
      if (ch.length && !e.error && e.depth >= prev.depth) ps.push(changedHTML(e, ch));
    } else if (e.changed.length) ps.push(changedHTML(e, e.changed));
    if (!e.error && e.depth > prev.depth) ps.push(`<p>${T(`→ Python jumps into the function <b>${esc(e.fname)}</b>: its lines run next. Its own variables are not drawn as boxes here (see Python Step by Step).`, `→ Python masuk ke fungsi <b>${esc(e.fname)}</b>: baris-barisnya dijalankan berikutnya. Variabel di dalamnya tidak digambar sebagai kotak di sini (lihat Python Langkah demi Langkah).`)}</p>`);
    else if (!e.error && e.depth < prev.depth) ps.push(`<p>${esc(T('← The function returns: Python goes back to the line that called it and uses the returned value there.', '← Fungsi selesai: Python kembali ke baris pemanggilnya dan memakai nilai yang dikembalikan di sana.'))}</p>`);
    if (e.inputs.length) {
      ps.push(`<p>${e.inputs.map((v) => T(`input() returned ${codeH(pyRepr(v))}: a <b>str</b> (text), even if it looks like a number.`, `input() menghasilkan ${codeH(pyRepr(v))}: sebuah <b>str</b> (teks), meskipun terlihat seperti angka.`)).join(' ')}</p>`);
    }
    if (e.error) {
      // the step limit is the simulation's, not a Python exception: no "Type: message" line for it (errorHelp says why)
      ps.push(`<p><span class="bad">${e.error.simulatorLimit ? `⏹ ${esc(T('Stopped by the simulation', 'Dihentikan oleh simulasi'))}` : `${esc(e.error.type)}: ${esc(e.error.message)}`}</span></p>`);
      const h = errorHelp(e.error);
      if (h) ps.push(`<p>${h}</p>`);
      const endErr = memPreset.endErr || memPreset.end;
      if (!edited && endErr && k === hist.length - 1) ps.push(`<p class="lesson">${L(endErr)}</p>`);
    } else if (e.status === 'done') {
      ps.push(`<p><span class="good">${esc(T('The program has finished.', 'Program selesai.'))}</span></p>`);
      if (!edited && memPreset.end) ps.push(`<p class="lesson">${L(memPreset.end)}</p>`);
    }
    if (k === hist.length - 1 && run && run.status === 'waiting-input') ps.push(waitHTML());
    return ps.join('');
  }
  /** "Changed: …" plus a note when two of the names share one list / dict (both boxes change together). */
  function changedHTML(e, ch) {
    let h = `<p>${esc(T('Changed', 'Berubah'))}: ${ch.map((n) => codeH(`${n} = ${shortV(e.vars.get(n))}`)).join(', ')}</p>`;
    const shared = ch.filter((n) => isMutable(e.vars.get(n)) && ch.some((m) => m !== n && e.vars.get(m).id === e.vars.get(n).id));
    if (shared.length > 1) {
      const nm = shared.map((n) => `<b>${esc(n)}</b>`).join(T(' and ', ' dan '));
      const tn = esc(tname(e.vars.get(shared[0])));
      h += `<p>${T(`${nm} name one and the same ${tn}, so ${shared.length > 2 ? 'all these boxes show' : 'both boxes show'} the change.`, `${nm} menamai ${tn} yang sama, jadi ${shared.length > 2 ? 'semua kotak itu' : 'kedua kotak'} menunjukkan perubahan itu.`)}</p>`;
    }
    return h;
  }
  /** A typical in-place change of a list / dict / set, for the "same list" note. */
  const changeEx = (n, v) => (v.type === 'dict' ? `${n}["…"] = …` : v.type === 'set' ? `${n}.add(…)` : `${n}.append(…)`);
  const waitHTML = () => `<p class="lesson">${esc(T('input() is waiting: type a value in the console below the code and press Enter (or add a line to Input values).', 'input() sedang menunggu: ketik nilai di konsol di bawah kode lalu tekan Enter (atau tambahkan baris di Nilai masukan).'))}</p>`;

  function slotNames(k) {
    const seen = new Set(), order = [];
    for (let j = 0; j <= k && j < hist.length; j++) {
      for (const n of hist[j].vars.keys()) if (!seen.has(n)) { seen.add(n); order.push(n); }
    }
    return order;
  }
  function renderTrace() {
    if (compileErr) { tscroll.innerHTML = `<table class="vt-tt"><tbody><tr><td class="none">${esc(T('The program did not start (syntax error).', 'Program tidak berjalan (kesalahan sintaks).'))}</td></tr></tbody></table>`; return; }
    const names = slotNames(cur);
    let h = `<table class="vt-tt"><thead><tr><th scope="col">#</th><th scope="col">${esc(T('Line', 'Baris'))}</th><th scope="col">${esc(T('Code', 'Kode'))}</th>`;
    h += names.map((n) => `<th scope="col">${esc(n)}</th>`).join('');
    h += `<th scope="col">${esc(T('Test / output', 'Uji / keluaran'))}</th></tr></thead><tbody>`;
    if (cur === 0) h += `<tr><td class="none" colspan="${names.length + 4}">${esc(T('Each step you run adds a row here.', 'Setiap langkah yang dijalankan menambah satu baris di sini.'))}</td></tr>`;
    const from = Math.max(1, cur - 299);
    for (let j = from; j <= cur; j++) {
      const e = hist[j];
      const ch = new Set(e.changed);
      for (const w of e.info.writes || []) ch.add(w.name);   // a box that was written counts, even with the same value
      h += `<tr${j === cur ? ' class="cur"' : ''}><td class="n">${j}</td><td class="l">${e.execLine ?? ''}</td><td class="c" title="${esc(e.info.src || '')}">${esc(cut(e.info.src || '', 34))}</td>`;
      for (const n of names) {
        const v = ch.has(n) ? e.vars.get(n) : null;
        h += v ? `<td class="v t-${typeKey(v)}">${esc(cut(showRepr(v), 22))}</td>` : '<td></td>';
      }
      let o = '';
      if (e.info.kind === 'cond' && e.info.cond != null) o = `${esc(cut(e.info.chain[0] || '', 26))} → <span class="${e.info.cond ? 't' : 'f'}">${e.info.cond ? 'True' : 'False'}</span>`;
      else if (e.info.kind === 'for' && e.info.loopEnd) o = esc(T('loop ends', 'perulangan selesai'));
      const txt = e.outText.replace(/(Traceback|⏹)[\s\S]*$/, '').replace(/\n$/, '').replace(/\n/g, ' / ');
      if (txt) o += (o ? ' ' : '') + esc(cut(txt, 60));
      if (e.error) o += (o ? ' ' : '') + `<span class="err">${esc(e.error.type)}</span>`;
      h += `<td class="o">${o}</td></tr>`;
    }
    h += '</tbody></table>';
    tscroll.innerHTML = h;
    const row = tscroll.querySelector('tr.cur');
    if (row) {
      const top = row.offsetTop - tscroll.clientHeight + row.offsetHeight + 4;
      if (top > tscroll.scrollTop || row.offsetTop < tscroll.scrollTop) tscroll.scrollTop = Math.max(0, top);
    }
  }

  // ---- canvas -------------------------------------------------------------------------------------------------
  const HEAD_H = 84, TAG_H = 20, BOX_H = 46, UNDER_H = 20, ROW_GAP = 18, PAD = 10;
  function rr(ctx, x, y, w, h, r) {
    const q = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + q, y);
    ctx.arcTo(x + w, y, x + w, y + h, q);
    ctx.arcTo(x + w, y + h, x, y + h, q);
    ctx.arcTo(x, y + h, x, y, q);
    ctx.arcTo(x, y, x + w, y, q);
    ctx.closePath();
  }
  const VFONT = `600 16px ${MONO}`, TFONT = `700 13px ${MONO}`;
  function boxText(v) { return v ? cut(showRepr(v), 40) : ''; }
  const wasLabel = () => T('was ', 'tadinya ');
  function memLayout(W, names, A, B, changed) {
    const ctx = cvMem.ctx;
    const boxes = new Map();
    let x = PAD, y = PAD + HEAD_H + 12 + TAG_H;
    const rowH = TAG_H + BOX_H + UNDER_H + ROW_GAP;
    for (const n of names) {
      ctx.font = VFONT;
      const wv = Math.max(ctx.measureText(boxText(A.get(n))).width, ctx.measureText(boxText(B.get(n))).width);
      ctx.font = TFONT;
      const wn = ctx.measureText(n).width + 18;
      let wu = 0;   // room for the "int  was 5" line under a box that changed
      if (changed.has(n) && A.get(n) && B.get(n)) {
        ctx.font = `12px ${MONO}`;
        wu = ctx.measureText(`${tname(B.get(n))}  ${wasLabel()}${cut(showRepr(A.get(n)), 14)}`).width + 6;
      }
      const w = clamp(Math.max(wv + 26, wn + 16, 84, wu), 84, W - 2 * PAD);
      if (x + w > W - PAD && x > PAD) { x = PAD; y += rowH; }
      boxes.set(n, { x, y, w, h: BOX_H });
      x += w + 16;
    }
    const height = names.length ? y + BOX_H + UNDER_H + PAD + 4 : PAD + HEAD_H + 12 + 90;
    return { boxes, height: Math.max(height, 230) };
  }
  function fitFont(ctx, text, maxW, size, min, weight = 600) {
    let s = size;
    ctx.font = `${weight} ${s}px ${MONO}`;
    while (s > min && ctx.measureText(text).width > maxW) { s -= 1; ctx.font = `${weight} ${s}px ${MONO}`; }
    return s;
  }
  function headerOf(e, k) {
    // { label, base (display without highlight), parts: chain displays, ... }
    const i = e.info;
    if (i.kind === 'for') return { pre: '', chain: [i.src], post: '' };
    if (i.kind === 'cond') return { pre: i.pre, chain: i.chain.length ? i.chain : [''], post: i.post };
    if (i.kind === 'assign') return { pre: i.pre, chain: i.chain.length ? i.chain : [''], post: '' };
    if (i.kind === 'print' || i.kind === 'expr') return { pre: '', chain: i.chain.length ? i.chain : [i.src], post: '' };
    return { pre: '', chain: [i.src || (lines[e.execLine - 1] || '').trim()], post: '' };
  }
  /** x position of the character range [s, e) of `text` drawn starting at x0 (current font). */
  function spanX(ctx, text, x0, s, e2) {
    const a = x0 + ctx.measureText(text.slice(0, s)).width;
    const b = x0 + ctx.measureText(text.slice(0, e2)).width;
    return [a, b];
  }
  function drawMem() {
    if (destroyed || mode !== 'mem') return;
    const W = cvMem.width;
    if (!W) return;
    const ctx = cvMem.ctx;
    const k = anim ? anim.to : cur;
    const e = hist[k];
    const prev = k > 0 ? hist[k - 1] : null;
    const names = dirty || !e ? [] : slotNames(k);
    const A = prev ? prev.vars : (e ? e.vars : new Map());
    const B = e ? e.vars : new Map();
    const lay = memLayout(W, names, A, B, new Set(e && k > 0 ? e.changed : []));
    const needH = Math.round(lay.height);
    if (Math.abs(cvWrap.clientHeight - needH) > 1) { cvWrap.style.height = needH + 'px'; }
    const H = cvMem.height;
    ctx.save();
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    // phase
    let phase = 'rest', p = 1;
    if (anim) {
      const t = anim.t;
      if (t < anim.read) { phase = 'read'; p = t / anim.read; }
      else if (t < anim.read + anim.comp) { phase = 'comp'; p = (t - anim.read) / anim.comp; }
      else if (t < anim.read + anim.comp + anim.write) { phase = 'write'; p = (t - anim.read - anim.comp) / anim.write; }
      else { phase = 'settle'; p = (t - anim.read - anim.comp - anim.write) / anim.settle; }
    }
    // ---- header
    const hx = PAD, hy = PAD, hw = W - 2 * PAD, hh = HEAD_H;
    rr(ctx, hx, hy, hw, hh, 9);
    ctx.fillStyle = '#111a2e';
    ctx.fill();
    ctx.strokeStyle = '#24324f';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';
    const bigY = hy + 52;
    let label = '', labelCol = '#8a99b3', big = '', bigCol = '#e2e8f0', hl = null, hlCol = 'rgba(250, 204, 21, .28)', suffix = '', suffixCol = '#86efac';
    let src0 = null;   // text + x0 of the original display (for read targets)
    let finalDisp = null;
    const geo = { x0: 0, text: '' };
    if (dirty) {
      label = T('Code changed', 'Kode berubah');
      big = T('Press Step to start again', 'Tekan Langkah untuk mulai lagi');
      bigCol = '#fde68a';
    } else if (compileErr) {
      label = T(`${compileErr.type} on line ${compileErr.line}`, `${compileErr.type} di baris ${compileErr.line}`);
      labelCol = '#fca5a5';
      big = cut(compileErr.message, 60);
      bigCol = '#fca5a5';
    } else if (!e || k === 0) {
      label = T('Nothing has run yet', 'Belum ada yang dijalankan');
      big = e && e.nextLine ? T(`Step ▶ runs line ${e.nextLine}`, `Langkah ▶ menjalankan baris ${e.nextLine}`) : e && e.status === 'done' ? T('(empty program)', '(program kosong)') : '';
      bigCol = '#cbd5e1';
      if (e && e.error) { big = `${e.error.type}`; bigCol = '#fca5a5'; }
    } else {
      const i = e.info;
      const hd = headerOf(e, k);
      const n = hd.chain.length;
      label = `${T('Line', 'Baris')} ${e.execLine}:  ${cut(codeOf(lines[e.execLine - 1] || ''), 52)}`;
      let idx = n - 1;
      if (phase === 'read') idx = 0;
      else if (phase === 'comp') idx = Math.min(n - 1, 1 + Math.floor(p * (n - 1)));
      big = hd.pre + hd.chain[idx] + hd.post;
      if (idx > 0) {
        const dd = diffSteps(hd.chain[idx - 1], hd.chain[idx]);
        if (dd && !dd.multi) hl = [hd.pre.length + dd.b[0], hd.pre.length + dd.b[1]];
        else if (dd && dd.multi) hl = dd.multi.map((m) => [hd.pre.length + m.b[0], hd.pre.length + m.b[1]]);
        if (phase !== 'comp') hlCol = 'rgba(52, 211, 153, .22)';
      }
      src0 = { text: hd.pre + hd.chain[0] + hd.post, off: hd.pre.length };
      finalDisp = { text: hd.pre + hd.chain[n - 1] + hd.post, off: hd.pre.length, val: hd.chain[n - 1] };
      if (i.kind === 'cond' && i.cond != null && (phase === 'rest' || phase === 'settle' || phase === 'write')) { suffix = i.cond ? '  → True' : '  → False'; suffixCol = i.cond ? '#86efac' : '#fca5a5'; }
      if (i.kind === 'for') {
        hl = null;
        if (!i.loopEnd && i.items && i.items[i.iter]) { hl = [i.items[i.iter][0], i.items[i.iter][1]]; hlCol = 'rgba(250, 204, 21, .3)'; }
        if (i.loopEnd && (phase === 'rest' || phase === 'settle')) { suffix = T('  → no items left', '  → item habis'); suffixCol = '#fca5a5'; }
      }
      if (e.error && (phase === 'rest' || phase === 'settle')) { label = `${T('Line', 'Baris')} ${e.execLine}:  ${e.error.type}`; labelCol = '#fca5a5'; bigCol = '#fecaca'; }
      if (e.status === 'done' && phase === 'rest' && k === hist.length - 1) { labelCol = '#86efac'; label = `✓ ${T('finished', 'selesai')} · ${label}`; }
    }
    ctx.font = `600 12px ${MONO}`;
    ctx.fillStyle = labelCol;
    ctx.fillText(cut(label, Math.max(10, Math.floor((hw - 20) / 7.3))), hx + 10, hy + 18);
    // big line
    const maxW = hw - 24;
    const full = big + suffix;
    const fs = fitFont(ctx, full, maxW, 19, 10);
    let shown = big;
    ctx.font = `600 ${fs}px ${MONO}`;
    if (ctx.measureText(full).width > maxW) shown = cut(big, Math.max(8, Math.floor(big.length * maxW / ctx.measureText(full).width)));
    const tw = ctx.measureText(shown + suffix).width;
    const x0 = hx + Math.max(12, (hw - tw) / 2);
    geo.x0 = x0; geo.text = shown;
    if (hl && shown === big) {
      const list = Array.isArray(hl[0]) ? hl : [hl];
      ctx.fillStyle = hlCol;
      for (const h of list) {
        const [a, b] = spanX(ctx, shown, x0, h[0], h[1]);
        rr(ctx, a - 3, bigY - fs - 2, b - a + 6, fs + 9, 4);
        ctx.fill();
      }
    }
    ctx.fillStyle = bigCol;
    ctx.fillText(shown, x0, bigY);
    if (suffix) { ctx.fillStyle = suffixCol; ctx.fillText(suffix, x0 + ctx.measureText(shown).width, bigY); }
    // ---- boxes
    const changed = new Set(e && k > 0 ? e.changed : []);
    const removed = new Set(e && k > 0 ? e.removed || [] : []);
    const writes = e && e.info && e.info.writes ? e.info.writes : [];
    const writeSet = new Set(writes.map((w) => w.name));
    if (!names.length) {
      ctx.font = `14px ${SANS}`;
      ctx.fillStyle = '#8a99b3';
      ctx.textAlign = 'center';
      if (!dirty) wrapText(ctx, T('No variables yet: boxes appear when a name gets a value.', 'Belum ada variabel: kotak muncul saat sebuah nama mendapat nilai.'), W / 2, PAD + HEAD_H + 50, W - 4 * PAD, 19);
      ctx.textAlign = 'left';
    }
    const centre = (b) => [b.x + b.w / 2, b.y + b.h / 2];
    for (const n of names) {
      const b = lay.boxes.get(n);
      const inA = A.has(n), inB = B.has(n);
      const isNew = !inA && inB && k > 0;
      let v = inB ? B.get(n) : A.get(n);
      let alpha = 1, showVal = true, glow = 0;
      if (phase === 'read' || phase === 'comp') {
        if (isNew) continue;
        v = A.get(n);
      } else if (phase === 'write') {
        if (isNew) alpha = Math.min(1, p * 2.5);
        if (changed.has(n) || removed.has(n)) { v = inA ? A.get(n) : B.get(n); showVal = false; }
        if (removed.has(n)) alpha = 1 - p;
      } else if (phase === 'settle') {
        if (removed.has(n)) continue;
        if (changed.has(n)) glow = 1 - p;
      } else {
        if (!inB) continue;
        if (changed.has(n) && k > 0 && !anim) glow = 0.35;
      }
      if (!v) continue;
      drawBox(ctx, b, n, v, alpha, showVal, glow);
      // "was …" under a box that changed at this step (at rest)
      if ((phase === 'rest' || phase === 'settle') && changed.has(n) && inA && k > 0) {
        const ov = A.get(n);
        ctx.font = `12px ${MONO}`;
        const tx = b.x + ctx.measureText(tname(v) + '  ').width + 2;
        const wl = wasLabel();
        const ovs = cut(showRepr(ov), 14);
        ctx.fillStyle = '#8a99b3';
        ctx.fillText(wl, tx, b.y + b.h + 15);
        const wx = tx + ctx.measureText(wl).width;
        ctx.fillText(ovs, wx, b.y + b.h + 15);
        ctx.strokeStyle = '#8a99b3';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(wx - 1, b.y + b.h + 11);
        ctx.lineTo(wx + ctx.measureText(ovs).width + 1, b.y + b.h + 11);
        ctx.stroke();
      }
    }
    // ---- flying cards
    if (anim && e && k > 0) {
      const i = e.info;
      ctx.font = `600 ${fs}px ${MONO}`;
      if (phase === 'read' && src0 && i.reads.length) {
        // copies of the values travel from their boxes up to the line
        const xs = fitFont(ctx, src0.text, maxW, 19, 10);
        ctx.font = `600 ${xs}px ${MONO}`;
        const x0r = hx + Math.max(12, (hw - ctx.measureText(src0.text).width) / 2);
        for (const r of i.reads) {
          const b = lay.boxes.get(r.name);
          const v = A.get(r.name);
          if (!b || !v) continue;
          const [a1, b1] = spanX(ctx, src0.text, x0r, src0.off + r.s, src0.off + r.e);
          const [sx, sy] = centre(b);
          const q = ease(p);
          card(ctx, sx + ((a1 + b1) / 2 - sx) * q, sy + (bigY - 6 - sy) * q, v, 0.35 + 0.65 * (1 - q * 0.3), 1 - q * 0.25);
        }
      }
      if (phase === 'write') {
        const q = ease(p);
        for (const w of writes) {
          const b = lay.boxes.get(w.name);
          const nv = B.get(w.name);
          if (!b || !nv) continue;
          let sx, sy;
          const [dx, dy] = centre(b);
          if (w.from === 'var' && lay.boxes.get(w.src)) [sx, sy] = centre(lay.boxes.get(w.src));
          else if (w.from === 'item' && i.items && i.items[i.iter] && geo.text === big) {
            ctx.font = `600 ${fs}px ${MONO}`;
            const [a1, b1] = spanX(ctx, geo.text, geo.x0, i.items[i.iter][0], i.items[i.iter][1]);
            sx = (a1 + b1) / 2; sy = bigY - 6;
          } else if (finalDisp && geo.text === big) {
            ctx.font = `600 ${fs}px ${MONO}`;
            let span = [finalDisp.off, finalDisp.off + finalDisp.val.length];
            if (w.idx >= 0) {
              const vt = toks1(finalDisp.val);
              const items = vt && vt.length && vt[0].text === '(' ? literalItems(vt, 0) : null;
              if (items && items[w.idx]) span = [finalDisp.off + items[w.idx][0], finalDisp.off + items[w.idx][1]];
            }
            const [a1, b1] = spanX(ctx, geo.text, geo.x0, span[0], span[1]);
            sx = (a1 + b1) / 2; sy = bigY - 6;
          } else { sx = W / 2; sy = bigY - 6; }
          card(ctx, sx + (dx - sx) * q, sy + (dy - sy) * q, nv, 1, 1);
        }
        // old values drop out of their boxes
        for (const n of changed) {
          const b = lay.boxes.get(n);
          const ov = A.get(n);
          if (!b || !ov) continue;
          const [cx, cy] = centre(b);
          card(ctx, cx, cy + 34 * q, ov, Math.max(0, 1 - q * 1.2), 1, true);
        }
        // changes without a known source (e.g. inside a function call): fade in
        for (const n of changed) {
          if (writeSet.has(n)) continue;
          const b = lay.boxes.get(n);
          const nv = B.get(n);
          if (!b || !nv) continue;
          const [cx, cy] = centre(b);
          card(ctx, cx, cy, nv, q, 1);
        }
      }
    }
    ctx.restore();
    // accessible summary
    const summary = names.filter((n) => B.has(n)).map((n) => `${n} = ${cut(showRepr(B.get(n)), 30)} (${tname(B.get(n))})`).join(', ');
    cvMem.canvas.setAttribute('aria-label', `${T('Memory boxes', 'Kotak memori')}: ${summary || T('none yet', 'belum ada')}`);
  }
  function wrapText(ctx, text, cx, y, maxW, lh) {
    const words = String(text).split(' ');
    let line = '';
    for (const w of words) {
      const t = line ? line + ' ' + w : w;
      if (ctx.measureText(t).width > maxW && line) { ctx.fillText(line, cx, y); y += lh; line = w; }
      else line = t;
    }
    if (line) ctx.fillText(line, cx, y);
  }
  function drawBox(ctx, b, name, v, alpha, showVal, glow) {
    const col = tcol(v);
    ctx.save();
    ctx.globalAlpha = alpha;
    if (glow > 0) {
      ctx.shadowColor = '#fde047';
      ctx.shadowBlur = 16 * glow;
    }
    rr(ctx, b.x, b.y, b.w, b.h, 8);
    ctx.fillStyle = '#0f182c';
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = col;
    ctx.globalAlpha = alpha * 0.13;
    ctx.fill();
    ctx.globalAlpha = alpha;
    ctx.lineWidth = 2;
    ctx.strokeStyle = glow > 0 ? '#fde047' : col;
    ctx.stroke();
    // name tag (the label on the jar)
    ctx.font = TFONT;
    const tw = ctx.measureText(name).width + 14;
    const tx = b.x + 8, ty = b.y - TAG_H + 6;
    rr(ctx, tx, ty, Math.min(tw, b.w - 12), TAG_H, 5);
    ctx.fillStyle = '#e2e8f0';
    ctx.fill();
    ctx.fillStyle = '#0b1220';
    ctx.textBaseline = 'middle';
    ctx.fillText(cut(name, Math.max(3, Math.floor((b.w - 26) / 8))), tx + 7, ty + TAG_H / 2 + 1);
    // value
    if (showVal) {
      ctx.font = VFONT;
      ctx.fillStyle = col;
      ctx.textAlign = 'center';
      const txt = boxText(v);
      let s = txt;
      while (s.length > 2 && ctx.measureText(s).width > b.w - 16) s = s.slice(0, -2) + '…';
      ctx.fillText(s, b.x + b.w / 2, b.y + b.h / 2 + 4);
      ctx.textAlign = 'left';
    }
    // type
    ctx.textBaseline = 'alphabetic';
    ctx.font = `12px ${MONO}`;
    ctx.fillStyle = col;
    ctx.fillText(tname(v), b.x + 2, b.y + b.h + 15);
    ctx.restore();
  }
  function card(ctx, cx, cy, v, alpha, scale, old) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    ctx.font = VFONT;
    const txt = cut(showRepr(v), 24);
    const w = (ctx.measureText(txt).width + 16) * scale, h = 28 * scale;
    rr(ctx, cx - w / 2, cy - h / 2, w, h, 6);
    ctx.fillStyle = old ? '#1f2937' : '#16233d';
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = old ? '#64748b' : tcol(v);
    ctx.stroke();
    ctx.fillStyle = old ? '#94a3b8' : tcol(v);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(txt, cx, cy + 1);
    if (old) {
      ctx.strokeStyle = '#94a3b8';
      ctx.beginPath();
      ctx.moveTo(cx - w / 2 + 6, cy);
      ctx.lineTo(cx + w / 2 - 6, cy);
      ctx.stroke();
    }
    ctx.restore();
  }
  const roMem = new ResizeObserver(() => requestAnimationFrame(() => { if (!destroyed && !anim) drawMem(); }));
  roMem.observe(cvWrap);
  cleanups.push(() => roMem.disconnect(), () => cvMem.destroy());

  // ===============================================================================================================
  // TYPES
  // ===============================================================================================================
  const pTypes = panels.get('types');
  pTypes.appendChild(mk('p', 'vt-intro', T(
    'Type a Python <b>expression</b> (a value or a calculation, not a whole statement). Python works out its <b>value</b> and its <b>type</b>, or stops with the exact error message a real Python would show.',
    'Ketik sebuah <b>ekspresi</b> Python (nilai atau perhitungan, bukan pernyataan lengkap). Python menghitung <b>nilai</b> dan <b>tipe</b>-nya, atau berhenti dengan pesan error yang persis sama dengan Python sungguhan.')));
  const tgrid = mk('div', 'vt-tgrid');
  pTypes.appendChild(tgrid);
  const tLeft = mk('div', '');
  const tRight = mk('div', '');
  tgrid.append(tLeft, tRight);
  const tForm = mk('form', 'vt-row');
  tForm.setAttribute('role', 'search');
  tForm.setAttribute('aria-label', T('Evaluate an expression', 'Hitung ekspresi'));
  const tInId = `${uid}-texpr`;
  const tLab = mk('label', 'vt-label', esc(T('Expression', 'Ekspresi')));
  tLab.htmlFor = tInId;
  const tIn = document.createElement('input');
  tIn.type = 'text';
  tIn.id = tInId;
  tIn.className = 'vt-in';
  tIn.spellcheck = false;
  tIn.autocomplete = 'off';
  tIn.setAttribute('autocapitalize', 'off');
  tIn.maxLength = 200;
  const tGo = button({ label: T('Evaluate ⏎', 'Hitung ⏎'), primary: true });
  tGo.el.type = 'submit';
  tGo.el.classList.add('vt-btn');
  tForm.append(tIn, tGo.el);
  tForm.addEventListener('submit', (ev) => { ev.preventDefault(); evalTypes(tIn.value); });
  tLeft.append(tLab, tForm);
  const ctx2 = mk('div', 'vt-ctx');
  const tVars = TYPE_VARS[lang];
  const varViews = {};
  for (const [n, lit] of tVars) varViews[n] = evalExpression(lit).value;
  ctx2.appendChild(mk('span', '', esc(T('Variables:', 'Variabel:'))));
  for (const [n, lit] of tVars) {
    const c = mk('button', 'vt-chip', esc(`${n} = ${lit}`));
    c.type = 'button';
    c.title = T(`Insert ${n}`, `Sisipkan ${n}`);
    c.setAttribute('aria-label', T(`Insert the variable ${n} (${n} = ${lit})`, `Sisipkan variabel ${n} (${n} = ${lit})`));
    c.addEventListener('click', () => insertAtCaret(tIn, n));
    ctx2.appendChild(c);
  }
  const tInpId = `${uid}-tinput`;
  const tInpLab = mk('label', '', esc(T('input() returns what the user types:', 'input() menghasilkan apa yang diketik pengguna:')));
  tInpLab.htmlFor = tInpId;
  const tInp = document.createElement('input');
  tInp.type = 'text';
  tInp.id = tInpId;
  tInp.className = 'vt-in sm';
  tInp.value = TYPE_INPUT;
  tInp.spellcheck = false;
  tInp.maxLength = 40;
  tInp.addEventListener('change', () => { if (lastTypes && /\binput\b/.test(lastTypes.expr)) evalTypes(lastTypes.expr); });
  ctx2.append(tInpLab, tInp);
  tLeft.appendChild(ctx2);
  const tRes = mk('div', 'vt-res vt-dark');
  tRes.setAttribute('aria-live', 'polite');
  tLeft.appendChild(tRes);
  // examples
  tRight.appendChild(mk('h3', 'vt-h', esc(T('Examples to try', 'Contoh untuk dicoba'))));
  const exChips = [];
  for (const [g, gname] of TYPE_GROUPS) {
    const grp = mk('div', 'vt-grp');
    const gl = mk('div', 'vt-label', esc(L(gname)));
    gl.id = `${uid}-tg-${g}`;
    grp.appendChild(gl);
    const chips = mk('div', 'vt-chips');
    chips.setAttribute('role', 'group');
    chips.setAttribute('aria-labelledby', gl.id);
    for (const ex of TYPE_EXAMPLES.filter((x) => x.g === g)) {
      const expr = L(ex.e);
      const c = mk('button', 'vt-chip', esc(expr));
      c.type = 'button';
      c.addEventListener('click', () => { tIn.value = expr; evalTypes(expr); });
      chips.appendChild(c);
      exChips.push([expr, c]);
    }
    grp.appendChild(chips);
    tRight.appendChild(grp);
  }
  function insertAtCaret(input, text) {
    const s = input.selectionStart ?? input.value.length, e2 = input.selectionEnd ?? input.value.length;
    input.value = input.value.slice(0, s) + text + input.value.slice(e2);
    input.focus({ preventScroll: true });
    input.setSelectionRange(s + text.length, s + text.length);
  }
  let lastTypes = null;
  const MAX_INPUTS = 6;   // input() calls answered with the typed text; one more is the end of input (EOFError)
  /** Console text with the typed input marked, like a terminal: each input() echoes prompt + typed text + "\n". */
  function echoParts(output, prompts, typed) {
    const parts = [];
    let pos = 0;
    for (const p of prompts) {
      const at = output.indexOf(p + typed + '\n', pos);
      if (at < 0) break;
      if (at + p.length > pos) parts.push({ text: output.slice(pos, at + p.length), echo: false });
      parts.push({ text: typed + '\n', echo: true });
      pos = at + p.length + typed.length + 1;
    }
    if (pos < output.length) parts.push({ text: output.slice(pos), echo: false });
    return parts;
  }
  function evaluate(src, typed) {
    const prompts = [];
    const feed = (p) => { prompts.push(String(p ?? '')); return prompts.length <= MAX_INPUTS ? typed : null; };
    let r;
    try {
      r = evalExpression(src, varViews, { inputs: feed, echoInput: true });
      // more input() calls than answers: evaluate again with the answers as a fixed list, so the next input() meets
      // the end of input (EOFError) as with python3 and a file of MAX_INPUTS lines
      if (prompts.length > MAX_INPUTS) r = evalExpression(src, varViews, { inputs: Array(MAX_INPUTS).fill(typed), echoInput: true });
    } catch (err) { r = { ok: false, error: { type: 'Error', message: String(err && err.message || err) } }; }
    const usedInput = prompts.length > 0;
    return { ...r, usedInput, parts: usedInput && r.output ? echoParts(r.output, prompts.slice(0, MAX_INPUTS), typed) : null };
  }
  function errorHelp(err) {
    const m = err.message || '';
    const t = err.type;
    if (t === 'TypeError' && /can only concatenate str/.test(m)) return T('+ cannot join text (str) and a number. Make both sides text with str(…), or both numbers with int(…) / float(…).', '+ tidak bisa menggabungkan teks (str) dengan bilangan. Jadikan keduanya teks dengan str(…), atau keduanya bilangan dengan int(…) / float(…).');
    if (t === 'TypeError' && /unsupported operand type/.test(m)) return T('This operator does not work between these two types. Check the types (type(…)) and convert one side.', 'Operator ini tidak berlaku untuk kedua tipe tersebut. Periksa tipenya (type(…)) lalu ubah salah satu sisi.');
    if (t === 'TypeError' && /can't multiply sequence/.test(m)) return T('Text can only be repeated a whole number (int) of times.', 'Teks hanya bisa diulang sebanyak bilangan bulat (int).');
    if (t === 'TypeError' && /not callable/.test(m)) return T('Something that is not a function was called with ( ). Did a variable take the name of a function?', 'Sesuatu yang bukan fungsi dipanggil dengan ( ). Apakah ada variabel yang memakai nama fungsi?');
    if (t === 'TypeError' && /not supported between/.test(m)) return T('Python cannot compare text with a number. Convert first.', 'Python tidak bisa membandingkan teks dengan bilangan. Ubah tipenya dulu.');
    if (t === 'ValueError' && /invalid literal for int/.test(m)) return T('int() only accepts text that is a whole number: no decimal point, no comma, no letters. For decimals use float().', 'int() hanya menerima teks berbentuk bilangan bulat: tanpa titik desimal, tanpa koma, tanpa huruf. Untuk desimal gunakan float().');
    if (t === 'ValueError' && /could not convert string to float/.test(m)) return T('float() needs text that looks like a number, with a decimal point (not a comma).', 'float() membutuhkan teks berbentuk bilangan dengan titik desimal (bukan koma).');
    if (t === 'ValueError' && /format code/.test(m)) return T('This format spec does not fit this type of value (d is for int, f for numbers, s for text).', 'Format ini tidak cocok untuk tipe nilai tersebut (d untuk int, f untuk bilangan, s untuk teks).');
    if (t === 'NameError') return T('This name has no value yet. Check the spelling: Python is case-sensitive.', 'Nama ini belum memiliki nilai. Periksa ejaannya: Python membedakan huruf besar dan kecil.');
    if (t === 'ZeroDivisionError') return T('Dividing by zero is not allowed.', 'Pembagian dengan nol tidak diperbolehkan.');
    if (t === 'SyntaxError') return T('This is not valid Python. Check quotes and brackets. An assignment such as x = 5 is a statement, not an expression: use the Memory boxes tab for that.', 'Ini bukan Python yang sah. Periksa tanda petik dan tanda kurung. Penugasan seperti x = 5 adalah pernyataan, bukan ekspresi: gunakan tab Kotak memori untuk itu.');
    if (t === 'EOFError') return T('input() found nothing to read.', 'input() tidak menemukan masukan.');
    if (t === 'StepLimit') return T(`This is not a Python error: real Python would keep going forever (stop it with Ctrl+C). The simulation stopped after ${limitWhat(err)}. Check that something inside the loop changes so that the condition can become False.`, `Ini bukan error Python: Python sungguhan akan terus berjalan tanpa henti (hentikan dengan Ctrl+C). Simulasi ini berhenti setelah ${limitWhat(err)}. Periksa apakah ada yang berubah di dalam perulangan sehingga kondisinya bisa menjadi False.`);
    return '';
  }
  function typeHelp(v) {
    const k = typeKey(v);
    const m = {
      int: T('An int is a whole number: no decimal point.', 'int adalah bilangan bulat: tanpa titik desimal.'),
      float: T('A float is a number with a decimal point.', 'float adalah bilangan dengan titik desimal.'),
      str: T('A str is text. The quotes in the result show it is text, even if it contains digits.', 'str adalah teks. Tanda petik pada hasil menunjukkan bahwa ini teks, meskipun berisi angka.'),
      bool: T('A bool is True or False: the answer to a yes/no question.', 'bool bernilai True atau False: jawaban dari pertanyaan ya/tidak.'),
      none: T('None means "no value". print() gives back None.', 'None berarti "tidak ada nilai". print() mengembalikan None.'),
      type: T('type() gives the type itself, shown as <class \'…\'>.', 'type() menghasilkan tipe itu sendiri, ditampilkan sebagai <class \'…\'>.'),
      list: T('A list holds several values in order.', 'list menyimpan beberapa nilai secara berurutan.'),
    };
    return m[k] || '';
  }
  function evalTypes(srcRaw) {
    const src = String(srcRaw || '').trim();
    for (const [x, c] of exChips) c.classList.toggle('is-on', x === src);
    if (!src) {
      tRes.innerHTML = `<p class="vt-note">${esc(T('Type an expression above, or tap an example.', 'Ketik ekspresi di atas, atau ketuk sebuah contoh.'))}</p>`;
      lastTypes = null;
      return;
    }
    const typed = tInp.value;
    const r = evaluate(src, typed);
    const ex = TYPE_EXAMPLES.find((x) => L(x.e) === src);
    let h = `<div class="vt-repl"><span class="pr">&gt;&gt;&gt; </span>${esc(src)}\n`;
    if (r.parts && r.parts.length) h += r.parts.map((x) => (x.echo ? `<span class="in">${esc(x.text)}</span>` : esc(x.text))).join('').replace(/\n(<\/span>)?$/, '$1') + '\n';
    else if (r.output) h += esc(r.output).replace(/\n$/, '') + '\n';
    if (r.ok && r.repr !== 'None' || (r.ok && !r.output)) h += `${esc(r.repr)}`;
    h += '</div>';
    if (r.ok) {
      const k = typeKey(r.value);
      h += `<div class="vt-vrow t-${k}"><span class="vt-vbox">${esc(cut(r.repr, 300))}</span>`;
      h += `<span class="vt-tbadge">type → ${esc(`<class '${tname(r.value)}'>`)}</span></div>`;
    } else {
      h += `<div class="vt-errl">${esc(r.error.type)}: ${esc(r.error.message)}</div>`;
    }
    const outcome = r.ok ? tname(r.value) : r.error.type;
    let note = ex && ex.t === outcome ? L(ex.n) : '';
    if (!note) note = r.ok ? typeHelp(r.value) : errorHelp(r.error);
    if (r.usedInput) note += ' ' + T(`(input() returned ${pyRepr(typed)}: the text typed in the box above.)`, `(input() menghasilkan ${pyRepr(typed)}: teks yang diketik di kotak di atas.)`);
    if (note) h += `<p class="vt-note">${esc(note)}</p>`;
    tRes.innerHTML = h;
    if (ex && ex.fix) {
      // errors get "try a fix"; a working example (int(79.9)) gets something to compare with (round(79.9))
      const fx = mk('div', 'vt-fixes');
      fx.appendChild(mk('span', '', esc(r.ok ? T('Compare:', 'Bandingkan:') : T('Try a fix:', 'Coba perbaikan:'))));
      for (const f of ex.fix) {
        const fe = L(f);
        const c = mk('button', 'vt-chip', esc(fe));
        c.type = 'button';
        c.addEventListener('click', () => { tIn.value = fe; evalTypes(fe); });
        fx.appendChild(c);
      }
      tRes.appendChild(fx);
    }
    // the same value through int(), float(), str(), bool()
    if (r.ok && ['int', 'float', 'str', 'bool'].includes(typeKey(r.value))) {
      const conv = mk('div', 'vt-conv');
      let th = `<table><caption>${esc(T('Convert this value', 'Konversi nilai ini'))}</caption><tbody>`;
      for (const fn of ['int', 'float', 'str', 'bool']) {
        const rr2 = evalExpression(`${fn}(v)`, { v: r.value });
        const code = `${fn}(${cut(r.repr, 24)})`;
        if (rr2.ok) th += `<tr class="t-${typeKey(rr2.value)}"><td class="c">${esc(code)}</td><td class="r">${esc(cut(rr2.repr, 40))}</td><td class="ty">${esc(tname(rr2.value))}</td></tr>`;
        else th += `<tr class="t-err"><td class="c">${esc(code)}</td><td class="r" colspan="2">${esc(rr2.error.type)}</td></tr>`;
      }
      th += '</tbody></table>';
      conv.innerHTML = th;
      tRes.appendChild(conv);
    }
    lastTypes = { expr: src, value: r.ok ? cut(r.repr, 80) : `${r.error.type}: ${cut(r.error.message, 70)}`, type: r.ok ? tname(r.value) : 'error' };
  }

  // ===============================================================================================================
  // OPERATORS
  // ===============================================================================================================
  const pOps = panels.get('ops');
  pOps.appendChild(mk('p', 'vt-intro', T(
    'Python works out an expression <b>one operator at a time</b>: brackets first, then <code>**</code>, then <code>* / // %</code>, then <code>+ -</code> (left to right), then comparisons, <code>not</code>, <code>and</code>, <code>or</code>. Before pressing <b>Next step</b>, predict which part goes first.',
    'Python menghitung ekspresi <b>satu operator demi satu operator</b>: tanda kurung dulu, lalu <code>**</code>, lalu <code>* / // %</code>, lalu <code>+ -</code> (dari kiri ke kanan), lalu perbandingan, <code>not</code>, <code>and</code>, <code>or</code>. Sebelum menekan <b>Langkah berikut</b>, tebak bagian mana yang dikerjakan dulu.')));
  const ogrid = mk('div', 'vt-ogrid');
  pOps.appendChild(ogrid);
  const oLeft = mk('div', '');
  const oRight = mk('div', '');
  ogrid.append(oLeft, oRight);
  const oForm = mk('form', 'vt-row');
  oForm.setAttribute('aria-label', T('Expression to evaluate step by step', 'Ekspresi yang dihitung langkah demi langkah'));
  const oInId = `${uid}-oexpr`;
  const oLab = mk('label', 'vt-label', esc(T('Expression', 'Ekspresi')));
  oLab.htmlFor = oInId;
  const oIn = document.createElement('input');
  oIn.type = 'text'; oIn.id = oInId; oIn.className = 'vt-in'; oIn.spellcheck = false; oIn.autocomplete = 'off'; oIn.maxLength = 200;
  oIn.setAttribute('autocapitalize', 'off');
  const oGo = button({ label: T('Start ⏎', 'Mulai ⏎'), primary: true });
  oGo.el.type = 'submit';
  oGo.el.classList.add('vt-btn');
  oForm.append(oIn, oGo.el);
  oForm.addEventListener('submit', (ev) => { ev.preventDefault(); opsStart(); });
  const oVars = mk('div', 'vt-vars');
  const oVarsId = `${uid}-ovars`;
  const oVarsLab = mk('label', '', esc(T('Variables:', 'Variabel:')));
  oVarsLab.htmlFor = oVarsId;
  const oVarsIn = document.createElement('input');
  oVarsIn.type = 'text'; oVarsIn.id = oVarsId; oVarsIn.className = 'vt-in sm'; oVarsIn.spellcheck = false; oVarsIn.autocomplete = 'off'; oVarsIn.maxLength = 200;
  oVarsIn.placeholder = 'a = 10; b = 3';
  oVarsIn.addEventListener('change', () => opsStart());
  const oVarsMsg = mk('div', 'msg');
  oVars.append(oVarsLab, oVarsIn, oVarsMsg);
  const oBtns = mk('div', 'vt-row');
  oBtns.style.marginTop = '10px';
  const oNext = button({ label: T('Next step ▶', 'Langkah berikut ▶'), primary: true, onClick: () => { opsShown = Math.min(opsSteps.length, opsShown + 1); renderOps(true); } });
  const oAll = button({ label: T('All steps ⏭', 'Semua langkah ⏭'), onClick: () => { opsShown = opsSteps.length; renderOps(true); } });
  const oAgain = button({ label: T('⟲ Again', '⟲ Ulang'), onClick: () => { opsShown = 1; renderOps(true); } });
  for (const b of [oNext, oAll, oAgain]) b.el.classList.add('vt-btn');
  oBtns.append(oNext.el, oAll.el, oAgain.el);
  const oSteps = mk('ol', 'vt-steps vt-dark');
  oSteps.setAttribute('aria-live', 'polite');
  oSteps.setAttribute('aria-label', T('Evaluation steps', 'Langkah perhitungan'));
  const oNote = mk('p', 'vt-intro');
  oNote.style.margin = '8px 0 0';
  oLeft.append(oLab, oForm, oVars, oBtns, oSteps, oNote);
  const exGrp = mk('div', 'vt-grp');
  const exLab = mk('div', 'vt-label', esc(T('Examples', 'Contoh')));
  exLab.id = `${uid}-oex`;
  const exChipsO = mk('div', 'vt-chips');
  exChipsO.setAttribute('role', 'group');
  exChipsO.setAttribute('aria-labelledby', exLab.id);
  const opsChipList = [];
  for (const pr of OPS_PRESETS) {
    const e = L(pr.e);
    const c = mk('button', 'vt-chip', esc(e));
    c.type = 'button';
    c.title = e;
    c.addEventListener('click', () => { oIn.value = e; oVarsIn.value = L(pr.v) || ''; opsStart(); });
    exChipsO.appendChild(c);
    opsChipList.push([pr, c]);
  }
  exGrp.append(exLab, exChipsO);
  oLeft.appendChild(exGrp);
  // precedence ladder
  const ladder = mk('div', 'vt-ladder vt-dark');
  const LADDER = [
    ['paren', '( )', T('brackets', 'tanda kurung')],
    ['call', 'f(x)', T('function calls', 'pemanggilan fungsi')],
    ['pow', '**', T('power (from the right)', 'pangkat (dari kanan)')],
    ['unary', '-x', T('minus sign', 'tanda minus')],
    ['mul', '* / // %', T('left to right', 'kiri ke kanan')],
    ['add', '+ -', T('left to right', 'kiri ke kanan')],
    ['cmp', '< > == !=', T('comparisons → bool', 'perbandingan → bool')],
    ['not', 'not', ''],
    ['and', 'and', ''],
    ['or', 'or', ''],
  ];
  ladder.innerHTML = `<h4>${esc(T('Priority (highest first)', 'Prioritas (tertinggi dulu)'))}</h4><ol>${LADDER.map(([k, o, d], i2) => `<li data-l="${k}"><span class="r">${i2 + 1}</span><span class="o">${esc(o)}</span><span>${esc(d)}</span></li>`).join('')}</ol>`;
  oRight.appendChild(ladder);

  let opsSteps = [], opsShown = 1, opsErr = null, opsDiffs = [], opsVarViews = {}, opsFinal = null, opsExpr = '';
  const WHY = {
    var: T('names → their values', 'nama → nilainya'),
    pow: T('** power has the highest priority', '** pangkat memiliki prioritas tertinggi'),
    unary: T('the minus sign', 'tanda minus'),
    mul: T('* / // % (same level: leftmost first)', '* / // % (setara: paling kiri dulu)'),
    add: T('+ - (same level: leftmost first)', '+ - (setara: paling kiri dulu)'),
    bit: T('bit operator', 'operator bit'),
    cmp: T('comparison gives True or False', 'perbandingan menghasilkan True atau False'),
    not: T('not flips True/False', 'not membalik True/False'),
    and: T('and: both must be True', 'and: keduanya harus True'),
    or: T('or: one True is enough', 'or: satu True sudah cukup'),
    cond: T('conditional expression', 'ekspresi kondisional'),
    call: T('function call', 'pemanggilan fungsi'),
    fmt: T('f-string: put the value in and format it', 'f-string: masukkan nilai lalu format'),
    paren: T('brackets', 'tanda kurung'),
    other: T('next operation', 'operasi berikutnya'),
  };
  function parseVars(text) {
    const src = String(text || '').split(';').map((s) => s.trim()).filter(Boolean).join('\n');
    if (!src) return { ok: true, vars: {} };
    const c = compile(src + '\n', { filename: '<vars>' });
    if (!c.ok) return { ok: false, error: c.error };
    const r = createRun(c.program, { inputs: [], echoInput: false, maxSteps: 200, eofWhenExhausted: true });
    r.runToEnd();
    const s = r.snapshot();
    if (s.status === 'error') return { ok: false, error: s.error };
    const vars = {};
    for (const l of s.frames[0].locals) vars[l.name] = l.value;
    return { ok: true, vars };
  }
  function opsStart() {
    const expr = oIn.value.trim();
    opsExpr = expr;
    for (const [pr, c] of opsChipList) c.classList.toggle('is-on', L(pr.e) === expr && (L(pr.v) || '') === oVarsIn.value.trim());
    const pv = parseVars(oVarsIn.value);
    oVarsMsg.textContent = pv.ok ? '' : `${pv.error.type}: ${pv.error.message}`;
    opsVarViews = pv.ok ? pv.vars : {};
    opsSteps = []; opsErr = null; opsDiffs = []; opsFinal = null;
    if (expr) {
      let r;
      try { r = reduceExpression(expr, opsVarViews); } catch (err) { r = { ok: false, steps: [expr], error: { type: 'Error', message: String(err && err.message || err) } }; }
      opsSteps = r.steps && r.steps.length ? r.steps.slice(0, 40) : [expr];
      opsErr = r.ok ? null : r.error;
      for (let i = 1; i < opsSteps.length; i++) opsDiffs.push(diffSteps(opsSteps[i - 1], opsSteps[i]));
      if (r.ok) {
        const fv = evalExpression(expr, opsVarViews);
        opsFinal = fv.ok ? fv.value : null;
      }
    }
    opsShown = 1;
    const pr = OPS_PRESETS.find((x) => L(x.e) === expr);
    oNote.innerHTML = pr ? esc(L(pr.n)) : '';
    renderOps(false);
    lastOps = 'reduce';
  }
  function markHTML(s, ranges) {
    // ranges: [[start, end, cls]], non-overlapping
    const rs = ranges.filter(Boolean).sort((a, b) => a[0] - b[0]);
    let h = '', i = 0;
    for (const [a, b, cls] of rs) {
      if (a < i) continue;
      h += esc(s.slice(i, a)) + `<mark class="${cls}">${esc(s.slice(a, b))}</mark>`;
      i = b;
    }
    return h + esc(s.slice(i));
  }
  function renderOps(fromUser) {
    oSteps.innerHTML = '';
    if (!opsSteps.length) {
      oSteps.innerHTML = `<li><span class="n"></span><span class="x" style="font:14px var(--font-sans);color:#b6c2d6">${esc(T('Type an expression or tap an example.', 'Ketik ekspresi atau ketuk sebuah contoh.'))}</span></li>`;
      oNext.el.disabled = true; oAll.el.disabled = true; oAgain.el.disabled = true;
      highlightLadder(null);
      return;
    }
    const n = Math.min(opsShown, opsSteps.length);
    let lastLevel = null;
    for (let i = 0; i < n; i++) {
      const li = mk('li', i === n - 1 ? 'last' : '');
      const dPrev = i > 0 ? opsDiffs[i - 1] : null;
      const dNext = i < n - 1 ? opsDiffs[i] : null;
      const rs = [];
      if (dNext) { if (dNext.multi) dNext.multi.forEach((m) => rs.push([m.a[0], m.a[1], 'a'])); else rs.push([dNext.a[0], dNext.a[1], 'a']); }
      if (dPrev) {
        if (dPrev.multi) dPrev.multi.forEach((m) => rs.push([m.b[0], m.b[1], 'b']));
        else rs.push([dPrev.b[0], dPrev.b[1], 'b']);
      }
      // keep non-overlapping: the green result wins over the yellow "next" mark when they overlap
      const clean = [];
      for (const r of rs.sort((x, y) => (x[2] === 'b' ? -1 : 1) - (y[2] === 'b' ? -1 : 1))) {
        if (!clean.some((c) => r[0] < c[1] && c[0] < r[1])) clean.push(r);
      }
      let html = `<span class="n">${i === 0 ? '' : i}</span><span class="x">${markHTML(opsSteps[i], clean)}`;
      const isFinal = i === opsSteps.length - 1 && !opsErr && opsSteps.length > 0;
      if (isFinal && opsFinal) html += `<span class="fin t-${typeKey(opsFinal)}"><span class="vt-tbadge">${esc(tname(opsFinal))}</span></span>`;
      html += '</span>';
      if (dPrev) {
        const lv = dPrev.level;
        lastLevel = lv;
        html += `<span class="why">${esc(T('step', 'langkah'))} ${i}: <b>${esc(WHY[lv] || WHY.other)}</b>${dPrev.paren && lv !== 'paren' ? esc(T(' — inside brackets, which go first', ' — di dalam kurung, yang didahulukan')) : ''}</span>`;
        if (dPrev.paren) lastLevel = lv;
      } else if (i === 0 && n === 1 && opsSteps.length > 1) {
        html += `<span class="why">${esc(T('Which part will Python work out first?', 'Bagian mana yang akan dikerjakan Python lebih dulu?'))}</span>`;
      }
      if (isFinal && i > 0) html += `<span class="why">${esc(T('Done: this is the value of the expression.', 'Selesai: inilah nilai ekspresi tersebut.'))}</span>`;
      if (isFinal && i === 0) html += `<span class="why">${esc(T('This is already a single value: nothing to work out.', 'Ini sudah berupa satu nilai: tidak ada yang perlu dihitung.'))}</span>`;
      li.innerHTML = html;
      oSteps.appendChild(li);
    }
    if (n === opsSteps.length && opsErr) {
      const li = mk('li', 'last');
      const help = errorHelp(opsErr);
      li.innerHTML = `<span class="n">!</span><span class="err">${esc(opsErr.type)}: ${esc(opsErr.message)}</span>${help ? `<span class="why">${esc(help)}</span>` : ''}`;
      oSteps.appendChild(li);
    }
    oNext.el.disabled = n >= opsSteps.length;
    oAll.el.disabled = n >= opsSteps.length;
    oNote.hidden = n < opsSteps.length;   // the preset's note gives the order away: show it after the last step (predict first)
    oAgain.el.disabled = n <= 1;
    highlightLadder(lastLevel);
    if (fromUser && n > 1) {
      const d = opsDiffs[n - 2];
      announce(`${opsSteps[n - 1]}${d ? ' (' + (WHY[d.level] || '') + ')' : ''}`);
    }
  }
  function highlightLadder(level) {
    const lv = level === 'paren' ? 'paren' : level;
    for (const li of ladder.querySelectorAll('li')) li.classList.toggle('on', li.dataset.l === lv);
  }

  // ---- / vs // vs % ------------------------------------------------------------------------------------------
  const divSec = mk('section', 'vt-sec');
  divSec.appendChild(mk('h3', 'vt-h', esc(T('/ vs // vs %: sharing students into groups', '/ vs // vs %: membagi siswa ke kelompok'))));
  const dgrid = mk('div', 'vt-dgrid');
  const dcvWrap = mk('div', 'vt-dcv');
  const cvDiv = createCanvas(dcvWrap, {});
  cvDiv.canvas.setAttribute('role', 'img');
  const dSide = mk('div', '');
  let divA = 32, divB = 5;
  const sA = slider({ label: T('a (students)', 'a (siswa)'), key: 'a', min: -20, max: 40, step: 1, value: divA, onInput: (v) => { divA = v; drawDiv(); lastOps = 'div'; } });
  const sB = slider({ label: T('b (per group)', 'b (per kelompok)'), key: 'b', min: 1, max: 10, step: 1, value: divB, onInput: (v) => { divB = v; drawDiv(); lastOps = 'div'; } });
  const dRes = mk('div', 'vt-dres vt-dark');
  dRes.setAttribute('aria-live', 'polite');
  dSide.append(sA.el, sB.el, dRes);
  dSide.style.display = 'grid';
  dSide.style.gap = '10px';
  dgrid.append(dcvWrap, dSide);
  divSec.appendChild(dgrid);
  pOps.appendChild(divSec);
  const roDiv = new ResizeObserver(() => requestAnimationFrame(() => { if (!destroyed) drawDiv(); }));
  roDiv.observe(dcvWrap);
  cleanups.push(() => roDiv.disconnect(), () => cvDiv.destroy());
  let divVals = null;
  function drawDiv() {
    if (destroyed || mode !== 'ops') return;
    const a = divA, b = divB;
    const ev = (s) => evalExpression(s, { a, b });
    const rf = ev('a / b'), rq = ev('a // b'), rm = ev('a % b');
    const q = Number(rq.repr), r = Number(rm.repr);
    divVals = { a, b, f: rf.repr, q: rq.repr, r: rm.repr };
    dRes.innerHTML = `<div><span class="lbl">${esc(T('true division (always float)', 'pembagian biasa (selalu float)'))}</span><br>${a} / ${b} = <span class="f">${esc(rf.repr)}</span></div>`
      + `<div><span class="lbl">${esc(T('floor division: full groups, rounded down', 'pembagian bulat: kelompok penuh, dibulatkan ke bawah'))}</span><br>${a} // ${b} = <span class="q">${esc(rq.repr)}</span></div>`
      + `<div><span class="lbl">${esc(T('remainder (modulus): left over', 'sisa bagi (modulus): sisanya'))}</span><br>${a} % ${b} = <span class="r">${esc(rm.repr)}</span></div>`
      + `<div class="chk">${esc(`${q} * ${b} + ${r} == ${a}`)} → ${q * b + r === a ? 'True' : 'False'}</div>`;
    const W = cvDiv.width;
    if (!W) return;
    const ctx = cvDiv.ctx;
    // layout: groups (a >= 0) above, number line below
    const pad = 12;
    const dot = W < 420 ? 9 : 11, dgap = 3;
    const cols = Math.min(b, 5), rowsIn = Math.ceil(b / 5);
    const gw = cols * dot + (cols - 1) * dgap + 12, gh = rowsIn * dot + (rowsIn - 1) * dgap + 12;
    const groups = a >= 0 ? q + (r > 0 ? 1 : 0) : 0;
    const perRow = Math.max(1, Math.floor((W - 2 * pad + 8) / (gw + 8)));
    const gRows = a >= 0 ? Math.max(1, Math.ceil(groups / perRow)) : 0;
    ctx.font = `600 13px ${SANS}`;
    const negTitle = wrapLines(ctx, T('A negative a cannot be drawn as students; the number line shows what // and % do.', 'a negatif tidak bisa digambar sebagai siswa; garis bilangan menunjukkan kerja // dan %.'), W - 2 * pad);
    ctx.font = `12px ${SANS}`;
    const negSub = wrapLines(ctx, T(`a // b rounds DOWN: ${a} / ${b} = ${rf.repr} → ${q}`, `a // b membulatkan ke BAWAH: ${a} / ${b} = ${rf.repr} → ${q}`), W - 2 * pad);
    const topH = a >= 0 ? 26 + gRows * (gh + 22) : 18 + negTitle.length * 17 + negSub.length * 16 + 12;
    const needH = Math.round(topH + 120);
    if (Math.abs(dcvWrap.clientHeight - needH) > 1) dcvWrap.style.height = needH + 'px';
    const H = cvDiv.height;
    ctx.save();
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    ctx.textBaseline = 'alphabetic';
    ctx.font = `600 13px ${SANS}`;
    ctx.fillStyle = '#b6c2d6';
    if (a >= 0) {
      ctx.fillText(T(`${a} students, groups of ${b}:`, `${a} siswa, kelompok berisi ${b}:`), pad, 18);
      for (let g = 0; g < groups; g++) {
        const gx = pad + (g % perRow) * (gw + 8), gy = 28 + Math.floor(g / perRow) * (gh + 22);
        const full = g < q;
        rr(ctx, gx, gy, gw, gh, 6);
        ctx.fillStyle = full ? 'rgba(96, 165, 250, .14)' : 'rgba(251, 146, 60, .12)';
        ctx.fill();
        ctx.setLineDash(full ? [] : [4, 3]);
        ctx.strokeStyle = full ? '#60a5fa' : '#fb923c';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.setLineDash([]);
        const nd = full ? b : r;
        for (let k = 0; k < b; k++) {
          const cx = gx + 6 + (k % 5) * (dot + dgap) + dot / 2, cy = gy + 6 + Math.floor(k / 5) * (dot + dgap) + dot / 2;
          ctx.beginPath();
          ctx.arc(cx, cy, dot / 2, 0, Math.PI * 2);
          if (k < nd) { ctx.fillStyle = full ? '#60a5fa' : '#fb923c'; ctx.fill(); }
          else { ctx.strokeStyle = '#334155'; ctx.lineWidth = 1; ctx.stroke(); }
        }
        ctx.font = `11px ${SANS}`;
        ctx.fillStyle = full ? '#93c5fd' : '#fdba74';
        ctx.fillText(full ? `${g + 1}` : `${T('left', 'sisa')} ${r}`, gx + 2, gy + gh + 13);
      }
      if (groups === 0) { ctx.font = `13px ${SANS}`; ctx.fillStyle = '#8a99b3'; ctx.fillText(T('no students, no groups', 'tidak ada siswa, tidak ada kelompok'), pad, 44); }
    } else {
      let ty = 18;
      for (const ln of negTitle) { ctx.fillText(ln, pad, ty); ty += 17; }
      ctx.font = `12px ${SANS}`;
      ctx.fillStyle = '#8a99b3';
      ty += 4;
      for (const ln of negSub) { ctx.fillText(ln, pad, ty); ty += 16; }
    }
    // number line
    const ly = topH + 46;
    const lo = Math.min(0, a, q * b) - b * 0.5, hi = Math.max(0, a, q * b) + b * 0.5;
    const span = Math.max(1e-9, hi - lo);
    const X = (v) => pad + 8 + (v - lo) / span * (W - 2 * pad - 16);
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(pad, ly); ctx.lineTo(W - pad, ly); ctx.stroke();
    const kLo = Math.ceil(lo / b), kHi = Math.floor(hi / b);
    const step = Math.max(1, Math.ceil((kHi - kLo + 1) / Math.max(4, Math.floor((W - 40) / 34))));
    ctx.font = `11px ${MONO}`;
    ctx.textAlign = 'center';
    for (let k = kLo; k <= kHi; k++) {
      const x = X(k * b);
      ctx.strokeStyle = k === 0 ? '#e2e8f0' : '#64748b';
      ctx.beginPath(); ctx.moveTo(x, ly - 5); ctx.lineTo(x, ly + 5); ctx.stroke();
      if (k % step === 0 || k === q) { ctx.fillStyle = k === q ? '#93c5fd' : '#8a99b3'; ctx.fillText(String(k * b), x, ly + 18); }
    }
    // jumps of b from 0 to q*b
    const nj = Math.abs(q);
    if (nj > 0 && nj <= 40) {
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 1.6;
      const dir = Math.sign(q);
      for (let j = 0; j < nj; j++) {
        const x1 = X(j * dir * b), x2 = X((j + 1) * dir * b);
        const mx = (x1 + x2) / 2, hgt = Math.min(22, Math.abs(x2 - x1) * 0.5 + 6);
        ctx.beginPath(); ctx.moveTo(x1, ly - 2); ctx.quadraticCurveTo(mx, ly - 2 - hgt * 1.6, x2, ly - 2); ctx.stroke();
      }
      ctx.fillStyle = '#93c5fd';
      ctx.font = `600 12px ${MONO}`;
      ctx.fillText(`${q} × ${b}`, (X(0) + X(q * b)) / 2, ly - 30);
    }
    // remainder bracket q*b → a
    if (r !== 0) {
      const x1 = X(q * b), x2 = X(a);
      ctx.strokeStyle = '#fb923c';
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(x1, ly + 28); ctx.lineTo(x2, ly + 28); ctx.stroke();
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(x1, ly + 23); ctx.lineTo(x1, ly + 33); ctx.moveTo(x2, ly + 23); ctx.lineTo(x2, ly + 33); ctx.stroke();
      ctx.fillStyle = '#fdba74';
      ctx.font = `600 12px ${MONO}`;
      ctx.fillText(`% → ${r}`, (x1 + x2) / 2, ly + 46);
    }
    // a marker
    ctx.fillStyle = '#f472b6';
    ctx.beginPath(); ctx.arc(X(a), ly, 5, 0, Math.PI * 2); ctx.fill();
    ctx.font = `600 12px ${MONO}`;
    ctx.fillText(`a = ${a}`, clamp(X(a), 30, W - 30), r !== 0 ? ly + 64 : ly + 36);
    ctx.textAlign = 'left';
    ctx.restore();
    cvDiv.canvas.setAttribute('aria-label', `${a} / ${b} = ${rf.repr}; ${a} // ${b} = ${rq.repr}; ${a} % ${b} = ${rm.repr}`);
  }

  function wrapLines(ctx, text, maxW) {
    const out = [];
    let line = '';
    for (const w of String(text).split(' ')) {
      const t = line ? line + ' ' + w : w;
      if (ctx.measureText(t).width > maxW && line) { out.push(line); line = w; } else line = t;
    }
    if (line) out.push(line);
    return out;
  }

  // ---- f-strings ------------------------------------------------------------------------------------------------
  const fSec = mk('section', 'vt-sec');
  fSec.appendChild(mk('h3', 'vt-h', esc(T('Neat output with f-strings: {x:.2f}', 'Keluaran rapi dengan f-string: {x:.2f}'))));
  const vname = T('avg', 'rata');
  const fgrid = mk('div', 'vt-fgrid');
  const fValId = `${uid}-fval`, fSpecId = `${uid}-fspec`;
  const fValBox = mk('div', '');
  fValBox.innerHTML = `<label class="vt-label" for="${fValId}">${esc(T(`Value of ${vname}`, `Nilai ${vname}`))}</label>`;
  const fVal = document.createElement('input');
  fVal.type = 'text'; fVal.id = fValId; fVal.className = 'vt-in sm'; fVal.value = FMT_VALUES[0]; fVal.spellcheck = false; fVal.autocomplete = 'off'; fVal.maxLength = 60;
  fValBox.appendChild(fVal);
  const fValChips = mk('div', 'vt-chips');
  fValChips.style.marginTop = '6px';
  fValChips.setAttribute('role', 'group');
  fValChips.setAttribute('aria-label', T('Example values', 'Contoh nilai'));
  for (const v of FMT_VALUES) {
    const c = mk('button', 'vt-chip', esc(v));
    c.type = 'button';
    c.addEventListener('click', () => { fVal.value = v; renderFmt(); });
    fValChips.appendChild(c);
  }
  fValBox.appendChild(fValChips);
  const fSpecBox = mk('div', '');
  fSpecBox.innerHTML = `<label class="vt-label" for="${fSpecId}">${esc(T('Format spec (after the colon)', 'Format (sesudah titik dua)'))}</label>`;
  const fSpec = document.createElement('input');
  fSpec.type = 'text'; fSpec.id = fSpecId; fSpec.className = 'vt-in sm'; fSpec.value = FMT_SPECS[0]; fSpec.spellcheck = false; fSpec.autocomplete = 'off'; fSpec.maxLength = 20;
  fSpecBox.appendChild(fSpec);
  const fSpecChips = mk('div', 'vt-chips');
  fSpecChips.style.marginTop = '6px';
  fSpecChips.setAttribute('role', 'group');
  fSpecChips.setAttribute('aria-label', T('Example format specs', 'Contoh format'));
  for (const s of FMT_SPECS) {
    const c = mk('button', 'vt-chip', esc(s));
    c.type = 'button';
    c.addEventListener('click', () => { fSpec.value = s; renderFmt(); });
    fSpecChips.appendChild(c);
  }
  fSpecBox.appendChild(fSpecChips);
  fgrid.append(fValBox, fSpecBox);
  fSec.appendChild(fgrid);
  const fRes = mk('div', 'vt-fres vt-dark');
  fRes.setAttribute('aria-live', 'polite');
  fSec.appendChild(fRes);
  fSec.appendChild(mk('p', 'vt-intro', T(
    '<code>.2f</code> = 2 digits after the point · <code>,</code> = thousands separator · <code>&gt;10</code> <code>&lt;10</code> <code>^10</code> = right / left / centre in 10 characters · <code>08.2f</code> = pad with zeros to 8 characters · <code>.1%</code> = percent.',
    '<code>.2f</code> = 2 angka di belakang titik · <code>,</code> = pemisah ribuan · <code>&gt;10</code> <code>&lt;10</code> <code>^10</code> = rata kanan / kiri / tengah dalam 10 karakter · <code>08.2f</code> = isi nol sampai 8 karakter · <code>.1%</code> = persen.')));
  pOps.appendChild(fSec);
  // "Record" saves the part of the tab the student used last
  for (const [el, k] of [[oLeft, 'reduce'], [divSec, 'div'], [fSec, 'fmt']]) {
    el.addEventListener('pointerdown', () => { lastOps = k; });
    el.addEventListener('focusin', () => { lastOps = k; });
  }
  fVal.addEventListener('input', () => renderFmt());
  fSpec.addEventListener('input', () => renderFmt());
  let lastFmt = null;
  function renderFmt() {
    lastOps = 'fmt';
    const vtxt = fVal.value.trim();
    const spec = fSpec.value;
    for (const c of fValChips.children) c.classList.toggle('is-on', c.textContent === vtxt);
    for (const c of fSpecChips.children) c.classList.toggle('is-on', c.textContent === spec);
    const vr = vtxt ? evalExpression(vtxt) : { ok: false, error: { type: 'SyntaxError', message: T('type a value', 'ketik sebuah nilai') } };
    if (!vr.ok) {
      fRes.innerHTML = `<div class="line"><span class="dim">${esc(vname)} = </span>${esc(vtxt)}</div><div class="line" style="color:#fca5a5">${esc(vr.error.type)}: ${esc(vr.error.message)}</div>`;
      lastFmt = null;
      return;
    }
    const code = `f"{${vname}:${spec}}"`;
    let h = `<div class="line"><span class="dim">${esc(vname)} = ${esc(vr.repr)}  # ${esc(tname(vr.value))}</span></div>`;
    if (/["{}\\\n]/.test(spec)) {
      h += `<div class="line" style="color:#fca5a5">${esc(T('A format spec cannot contain quotes, braces or backslashes here.', 'Format di sini tidak boleh berisi tanda petik, kurung kurawal, atau garis miring terbalik.'))}</div>`;
      fRes.innerHTML = h;
      lastFmt = null;
      return;
    }
    const r = evalExpression(code, { [vname]: vr.value });
    h += `<div class="line">${esc(code)} → `;
    if (!r.ok) {
      h += `<span style="color:#fca5a5">${esc(r.error.type)}: ${esc(r.error.message)}</span></div>`;
      const help = errorHelp(r.error);
      if (help) h += `<div class="line dim" style="font-family:var(--font-sans)">${esc(help)}</div>`;
      fRes.innerHTML = h;
      lastFmt = { expr: code, value: `${r.error.type}`, type: 'error' };
      return;
    }
    const str = strFromRepr(r);
    const nch = [...str].length;
    h += `<span style="color:#c3e88d">${esc(r.repr)}</span> <span class="dim">(str, ${esc(T(`${nch} characters`, `${nch} karakter`))})</span></div>`;
    h += '<div class="vt-cells" aria-hidden="true">';
    [...str].slice(0, 60).forEach((ch, i2) => {
      h += `<span class="vt-cell${ch === ' ' ? ' sp' : ''}">${ch === ' ' ? '·' : esc(ch)}<span class="i">${i2}</span></span>`;
    });
    h += '</div>';
    const label = T('Class average:', 'Rata-rata kelas:');
    h += `<div class="line"><span class="dim">print(f"${esc(label)} {${esc(vname)}:${esc(spec)}}")</span>\n${esc(label)} ${esc(str)}</div>`;
    if (['int', 'float'].includes(typeKey(vr.value))) {
      const rd = evalExpression(`round(${vname}, 2)`, { [vname]: vr.value });
      const sr = evalExpression(`str(${vname})`, { [vname]: vr.value });
      h += `<div class="line dim">${esc(T('compare', 'bandingkan'))}: round(${esc(vname)}, 2) → ${esc(rd.ok ? rd.repr : rd.error.type)} (${esc(rd.ok ? tname(rd.value) : '')}) · str(${esc(vname)}) → ${esc(sr.ok ? sr.repr : '')}</div>`;
    }
    fRes.innerHTML = h;
    lastFmt = { expr: `${code} with ${vname} = ${cut(vr.repr, 20)}`, value: r.repr, type: 'str' };
  }
  function strFromRepr(r) {
    // the str value itself: minipy's str() of a str is the text
    const s = evalExpression('print(s, end="")', { s: r.value });
    return s.ok ? s.output : r.repr.slice(1, -1);
  }
  let lastOps = 'reduce';

  // ===============================================================================================================
  // NAMES
  // ===============================================================================================================
  const pNames = panels.get('names');
  pNames.appendChild(mk('p', 'vt-intro', T(
    'Type a variable name. It is checked against the naming rules, and against Python itself: <code>str.isidentifier()</code>, the keyword list, and what happens when you write <code>name = 1</code>.',
    'Ketik sebuah nama variabel. Nama itu diperiksa dengan aturan penamaan, serta oleh Python sendiri: <code>str.isidentifier()</code>, daftar kata kunci, dan apa yang terjadi bila ditulis <code>nama = 1</code>.')));
  const ngrid = mk('div', 'vt-ngrid');
  pNames.appendChild(ngrid);
  const nLeft = mk('div', '');
  const nRight = mk('div', '');
  ngrid.append(nLeft, nRight);
  const nInId = `${uid}-name`;
  const nLab = mk('label', 'vt-label', esc(T('Variable name', 'Nama variabel')));
  nLab.htmlFor = nInId;
  const nIn = document.createElement('input');
  nIn.type = 'text'; nIn.id = nInId; nIn.className = 'vt-in'; nIn.spellcheck = false; nIn.autocomplete = 'off'; nIn.maxLength = 40;
  nIn.setAttribute('autocapitalize', 'off');
  nIn.value = '4XYZ';
  nIn.addEventListener('input', () => renderName());
  const nTiles = mk('div', 'vt-tiles');
  nTiles.setAttribute('aria-hidden', 'true');
  const nVerdict = mk('div', 'vt-verdict');
  nVerdict.setAttribute('aria-live', 'polite');
  const nRules = mk('ul', 'vt-rules');
  const nPy = mk('div', 'vt-py vt-dark');
  nLeft.append(nLab, nIn, nTiles, nVerdict, nRules, nPy);
  // examples + quiz
  nRight.appendChild(mk('h3', 'vt-h', esc(T('Example names', 'Contoh nama'))));
  const nChips = mk('div', 'vt-chips');
  nChips.setAttribute('role', 'group');
  nChips.setAttribute('aria-label', T('Example names', 'Contoh nama'));
  for (const n of NAME_EXAMPLES[lang]) {
    const c = mk('button', 'vt-chip', esc(n));
    c.type = 'button';
    c.addEventListener('click', () => { nIn.value = n; renderName(); });
    nChips.appendChild(c);
  }
  nRight.appendChild(nChips);
  const quiz = mk('div', 'vt-quiz');
  quiz.style.marginTop = '16px';
  nRight.appendChild(quiz);

  const KW = new Set(KEYWORDS);
  const BUILTINS = new Set(BUILTIN_NAMES);
  const SOFT = new Set(['match', 'case', 'type', '_']);
  function isIdent(s) {
    if (!s) return false;
    const r = evalExpression('s.isidentifier()', { s });
    return r.ok && r.repr === 'True';
  }
  function tryLine(name) {
    // what Python does with `name = 1` (and, for a built-in name, with calling it afterwards)
    const prog = `${name} = 1\n`;
    const c = compile(prog, { filename: 'main.py' });
    if (!c.ok) return { code: prog.trim(), ok: false, error: c.error };
    const r = createRun(c.program, { inputs: [], echoInput: false, maxSteps: 50, eofWhenExhausted: true });
    r.runToEnd();
    const s = r.snapshot();
    if (s.status === 'error') return { code: prog.trim(), ok: false, error: s.error };
    return { code: prog.trim(), ok: true };
  }
  function checkName(raw) {
    const name = raw.trim();
    if (!name) return null;
    const chars = [...name];
    const res = { name, chars: [], rules: {}, warn: [], ident: isIdent(name), kw: KW.has(name) };
    const isLetter = (c) => /[\p{L}\p{Nl}]/u.test(c);
    const isCont = (c) => /[\p{L}\p{Nl}\p{Mn}\p{Mc}\p{Nd}\p{Pc}]/u.test(c);
    chars.forEach((c, i) => {
      let bad = '';
      if (/\s/.test(c)) bad = T('space', 'spasi');
      else if (i === 0 && /\p{Nd}/u.test(c)) bad = T('digit first', 'angka di awal');
      else if (!(isCont(c) || c === '_')) bad = T('symbol', 'simbol');
      res.chars.push({ c, bad });
    });
    res.rules.start = chars.length && (isLetter(chars[0]) || chars[0] === '_');
    res.rules.space = !chars.some((c) => /\s/.test(c));
    res.rules.symbol = !chars.some((c, i) => !/\s/.test(c) && !(isCont(c) || c === '_') && !(i === 0 && /\p{Nd}/u.test(c)));
    res.rules.kw = !res.kw;
    res.valid = res.ident && !res.kw;
    if (res.valid) {
      if (BUILTINS.has(name)) res.warn.push('builtin');
      if (/\p{Lu}/u.test(name)) res.warn.push('case');
      if (name.length <= 2 && name !== '_') res.warn.push('short');
      if (name.length > 30) res.warn.push('long');
      if (name[0] === '_') res.warn.push('under');
      if (/[^\x00-\x7f]/.test(name)) res.warn.push('ascii');
      if (SOFT.has(name)) res.warn.push('soft');
    }
    res.py = tryLine(name);
    if (res.valid && BUILTINS.has(name)) {
      const prog = `${name} = 1\n${name}("Halo")\n`;
      const c = compile(prog, { filename: 'main.py' });
      if (c.ok) {
        const r = createRun(c.program, { inputs: [], echoInput: false, maxSteps: 50, eofWhenExhausted: true });
        r.runToEnd();
        const s = r.snapshot();
        if (s.status === 'error') res.shadow = { code: prog.trim(), error: s.error };
      }
    }
    return res;
  }
  let lastName = null;
  function renderName() {
    const raw = nIn.value;
    for (const c of nChips.children) c.classList.toggle('is-on', c.textContent === raw.trim());
    const r = checkName(raw);
    if (!r) {
      nTiles.innerHTML = '';
      nVerdict.className = 'vt-verdict';
      nVerdict.textContent = T('Type a name to check it.', 'Ketik sebuah nama untuk memeriksanya.');
      nRules.innerHTML = '';
      nPy.innerHTML = `<div class="line dim">${esc(T('Python’s verdict appears here.', 'Penilaian Python muncul di sini.'))}</div>`;
      lastName = null;
      return;
    }
    nTiles.innerHTML = r.chars.map((x) => {
      const cls = r.kw ? ' kw' : x.bad ? ' bad' : '';
      const lab = r.kw ? '' : x.bad;
      return `<span class="vt-tile${cls}">${x.c === ' ' ? '␣' : esc(x.c)}<span class="i">${esc(lab || ' ')}</span></span>`;
    }).join('') + (r.kw ? `<span class="vt-tile kw" style="align-self:center;font-size:12px;font-family:var(--font-sans)">${esc(T('keyword', 'kata kunci'))}</span>` : '');
    const avoid = r.warn.includes('builtin');
    nVerdict.className = 'vt-verdict ' + (!r.valid ? 'bad' : avoid ? 'warn' : 'ok');
    nVerdict.textContent = !r.valid
      ? T(`✗ "${r.name}" is not a valid variable name.`, `✗ "${r.name}" bukan nama variabel yang sah.`)
      : avoid ? T(`⚠ "${r.name}" is valid, but avoid it: it hides a built-in function.`, `⚠ "${r.name}" sah, tetapi hindari: nama ini menutupi fungsi bawaan.`)
        : T(`✓ "${r.name}" is a valid variable name.`, `✓ "${r.name}" adalah nama variabel yang sah.`);
    const li = (st, txt, sub) => `<li class="${st}"><span class="m" aria-hidden="true">${st === 'ok' ? '✓' : st === 'bad' ? '✗' : st === 'warn' ? '!' : '–'}</span><span><span class="vt-sr">${st === 'ok' ? T('passes', 'lolos') : st === 'bad' ? T('broken', 'dilanggar') : st === 'warn' ? T('tip', 'saran') : ''}: </span>${txt}${sub ? `<small>${sub}</small>` : ''}</span></li>`;
    let h = '';
    h += li(r.rules.start ? 'ok' : 'bad', esc(T('Starts with a letter or _ (not a digit or symbol)', 'Diawali huruf atau _ (bukan angka atau simbol)')),
      esc(T('Some textbooks say "a letter"; Python also allows _ at the start.', 'Sebagian buku menyebut "huruf"; Python juga mengizinkan _ di awal.')));
    h += li(r.rules.space ? 'ok' : 'bad', esc(T('No spaces: use _ instead (average_score)', 'Tanpa spasi: pakai _ (rata_rata)')));
    h += li(r.rules.symbol ? 'ok' : 'bad', esc(T('Only letters, digits and _ (no : + - . $ % , !)', 'Hanya huruf, angka, dan _ (tanpa : + - . $ % , !)')));
    h += li(r.rules.kw ? 'ok' : 'bad', esc(T('Not a Python keyword (if, for, class, True, …: 35 words)', 'Bukan kata kunci Python (if, for, class, True, …: 35 kata)')));
    if (r.valid) {
      h += li(r.warn.includes('builtin') ? 'warn' : 'ok', esc(T('Does not hide a built-in function (print, input, list, sum, …)', 'Tidak menutupi fungsi bawaan (print, input, list, sum, …)')),
        r.warn.includes('builtin') ? esc(T('Python allows it, but afterwards the built-in function no longer works in this program.', 'Python mengizinkannya, tetapi sesudah itu fungsi bawaan tidak bisa dipakai lagi di program ini.')) : '');
      const meaning = r.warn.includes('short') ? T('Very short: a meaningful name such as passed_count is easier to read than x or pc.', 'Sangat pendek: nama bermakna seperti jumlah_tuntas lebih mudah dibaca daripada x atau jt.')
        : r.warn.includes('long') ? T('Valid, but long: a name should not be too long.', 'Sah, tetapi panjang: nama sebaiknya tidak terlalu panjang.') : '';
      h += li(meaning ? 'warn' : 'ok', esc(T('Meaningful and not too long', 'Bermakna dan tidak terlalu panjang')), esc(meaning));
      h += li(r.warn.includes('case') ? 'warn' : 'ok', esc(T('Python style: lowercase_with_underscores (snake_case)', 'Gaya Python: huruf_kecil_dengan_garis_bawah (snake_case)')),
        r.warn.includes('case') ? esc(T(`Valid, and some textbooks use names like Nama and No_HP, but Python programmers write ${r.name.toLowerCase()}. Remember: Nilai and nilai are two different variables.`, `Sah, dan sebagian buku mencontohkan Nama dan No_HP, tetapi pemrogram Python menulis ${r.name.toLowerCase()}. Ingat: Nilai dan nilai adalah dua variabel berbeda.`)) : '');
      if (r.warn.includes('ascii')) h += li('warn', esc(T('Letters outside a–z are allowed in Python 3, but plain a–z is easier to type and share.', 'Huruf di luar a–z diizinkan di Python 3, tetapi a–z biasa lebih mudah diketik dan dibagikan.')));
      if (r.warn.includes('soft')) h += li('warn', esc(T(`"${r.name}" is a soft keyword (match/case/type/_): allowed as a name, but confusing.`, `"${r.name}" adalah kata kunci lunak (match/case/type/_): boleh sebagai nama, tetapi membingungkan.`)));
    }
    nRules.innerHTML = h;
    // Python's verdict
    const pyS = (s) => esc(pyRepr(s));
    let p = `<div class="line"><span class="dim">&gt;&gt;&gt; </span>${pyS(r.name)}.isidentifier()\n<span class="${r.ident ? 'ok' : 'bad'}">${r.ident ? 'True' : 'False'}</span></div>`;
    p += `<div class="line"><span class="dim">&gt;&gt;&gt; </span>import keyword\n<span class="dim">&gt;&gt;&gt; </span>keyword.iskeyword(${pyS(r.name)})\n<span class="${r.kw ? 'bad' : 'ok'}">${r.kw ? 'True' : 'False'}</span></div>`;
    p += `<div class="line"><span class="dim"># main.py</span>\n${esc(r.py.code)}\n`;
    if (r.py.ok) p += `<span class="ok">${esc(T('✓ runs: the variable is created', '✓ berjalan: variabel dibuat'))}</span></div>`;
    else p += `<span class="bad">${esc(r.py.error.type)}: ${esc(r.py.error.message)}</span></div>`;
    if (!r.valid && (r.py.ok || (r.py.error && r.py.error.type !== 'SyntaxError' && r.py.error.type !== 'IndentationError'))) {
      const why = r.name.includes(':') ? T('Python reads ":" as the start of a type annotation', 'Python membaca ":" sebagai awal anotasi tipe')
        : r.name.includes('.') ? T('Python reads "." as "attribute of"', 'Python membaca "." sebagai "atribut dari"')
          : T('Python reads it as a different kind of statement', 'Python membacanya sebagai jenis pernyataan lain');
      p += `<div class="note">${esc(T(`No SyntaxError here, but still no variable called "${r.name}": ${why}.`, `Tidak ada SyntaxError di sini, tetapi tetap tidak ada variabel bernama "${r.name}": ${why}.`))}</div>`;
    }
    if (r.shadow) {
      p += `<div class="line" style="margin-top:8px"><span class="dim"># ${esc(T('then calling the built-in:', 'lalu memanggil fungsi bawaannya:'))}</span>\n${esc(r.shadow.code)}\n<span class="bad">${esc(r.shadow.error.type)}: ${esc(r.shadow.error.message)}</span></div>`;
    }
    nPy.innerHTML = p;
    const brokenRule = !r.rules.start ? T('starts with a digit or symbol', 'diawali angka atau simbol') : !r.rules.space ? T('contains a space', 'berisi spasi')
      : !r.rules.symbol ? T('contains a symbol', 'berisi simbol') : !r.rules.kw ? T('keyword', 'kata kunci') : !r.ident ? T('not an identifier', 'bukan identifier') : '';
    lastName = { expr: r.name, value: r.valid ? (avoid ? 'valid (avoid)' : 'valid') : 'not valid', type: r.valid ? (avoid ? 'hides a built-in' : 'identifier') : brokenRule || (r.py.error ? r.py.error.type : '') };
  }
  // quiz
  let qDeck = [], qi = 0, qScore = 0, qAnswered = false;
  function quizNew() {
    const pool = QUIZ[lang].slice();
    for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
    qDeck = pool.slice(0, 8);
    qi = 0; qScore = 0; qAnswered = false;
    renderQuiz(false);
  }
  function renderQuiz(focusNext) {
    quiz.innerHTML = '';
    const head2 = mk('div', '');
    head2.innerHTML = `<span class="score">${qScore} / ${Math.min(qi + (qAnswered ? 1 : 0), qDeck.length)}</span><h3 class="vt-h" style="margin:0">${esc(T('Quiz: valid or not?', 'Kuis: sah atau tidak?'))}</h3>`;
    quiz.appendChild(head2);
    if (qi >= qDeck.length) {
      const done = mk('p', 'fb', esc(T(`Score: ${qScore} of ${qDeck.length}.`, `Skor: ${qScore} dari ${qDeck.length}.`)));
      const again = button({ label: T('New quiz', 'Kuis baru'), primary: true, onClick: () => { quizNew(); quiz.querySelector('button')?.focus(); } });
      again.el.classList.add('vt-btn');
      quiz.append(done, again.el);
      if (focusNext) again.el.focus();
      return;
    }
    const [name, ans] = qDeck[qi];
    quiz.appendChild(mk('div', '', `<span class="vt-label">${esc(T(`Name ${qi + 1} of ${qDeck.length}`, `Nama ${qi + 1} dari ${qDeck.length}`))}</span><span class="qn">${esc(name)}</span>`));
    const row2 = mk('div', 'vt-row');
    row2.setAttribute('role', 'group');
    row2.setAttribute('aria-label', T(`Is ${name} a valid variable name?`, `Apakah ${name} nama variabel yang sah?`));
    const opts = [['v', T('✓ Valid', '✓ Sah')], ['a', T('⚠ Valid, but avoid', '⚠ Sah, tapi hindari')], ['x', T('✗ Not valid', '✗ Tidak sah')]];
    const btns = opts.map(([k, lab]) => {
      const b = button({ label: lab, onClick: () => answer(k) });
      b.el.classList.add('vt-btn');
      b.el.disabled = qAnswered;
      row2.appendChild(b.el);
      return b;
    });
    quiz.appendChild(row2);
    function answer(k) {
      if (qAnswered) return;
      qAnswered = true;
      const ok = k === ans;
      if (ok) qScore++;
      const r = checkName(name);
      const why = ans === 'x'
        ? (!r.rules.start ? T('it starts with a digit or symbol', 'diawali angka atau simbol') : !r.rules.space ? T('it contains a space', 'berisi spasi') : !r.rules.symbol ? T('it contains a symbol', 'berisi simbol') : r.kw ? T('it is a Python keyword', 'merupakan kata kunci Python') : T('Python does not accept it', 'Python tidak menerimanya'))
        : ans === 'a' ? T(`Python accepts it, but it hides the built-in ${name}() function`, `Python menerimanya, tetapi menutupi fungsi bawaan ${name}()`)
          : T('letters, digits and _ only, not starting with a digit, not a keyword', 'hanya huruf, angka, dan _, tidak diawali angka, bukan kata kunci');
      const right = opts.find((o) => o[0] === ans)[1];
      renderQuiz(false);
      const fb = mk('p', 'fb ' + (ok ? 'ok' : 'bad'), `<b>${esc(ok ? T('Correct!', 'Benar!') : T('Not quite.', 'Belum tepat.'))}</b> ${esc(T(`Answer: ${right}: ${why}.`, `Jawaban: ${right}: ${why}.`))}`);
      fb.setAttribute('role', 'status');
      quiz.appendChild(fb);
      const nxt = button({ label: qi + 1 < qDeck.length ? T('Next name ▶', 'Nama berikutnya ▶') : T('See score', 'Lihat skor'), primary: true, onClick: () => { qi++; qAnswered = false; renderQuiz(true); } });
      nxt.el.classList.add('vt-btn');
      nxt.el.style.marginTop = '8px';
      const chk = button({ label: T('Check it above', 'Periksa di atas'), onClick: () => { nIn.value = name; renderName(); nIn.focus({ preventScroll: true }); } });
      chk.el.classList.add('vt-btn');
      chk.el.style.marginTop = '8px';
      const rw = mk('div', 'vt-row');
      rw.append(nxt.el, chk.el);
      quiz.appendChild(rw);
      nxt.el.focus();
    }
    if (focusNext) btns[0].el.focus();
  }

  // ===============================================================================================================
  // controls pane help texts + lab
  // ===============================================================================================================
  ctlGroups.get('types').appendChild(mk('p', 'vt-help', esc(T(
    'Tap an example or type your own expression and press Enter. The variables and the input() box can be used in any expression. Record a result in the lab below.',
    'Ketuk sebuah contoh atau ketik ekspresi sendiri lalu tekan Enter. Variabel dan kotak input() bisa dipakai di ekspresi mana pun. Catat hasilnya di lab di bawah.'))));
  ctlGroups.get('ops').appendChild(mk('p', 'vt-help', esc(T(
    'Step through an expression, move the a and b sliders of the / // % picture, or try a format spec. "Record" saves whichever of the three you used last.',
    'Telusuri ekspresi langkah demi langkah, geser penggeser a dan b pada gambar / // %, atau coba sebuah format. "Record" menyimpan bagian yang terakhir dipakai.'))));
  ctlGroups.get('names').appendChild(mk('p', 'vt-help', esc(T(
    'Check the example names, then take the quiz. Python’s own answer is str.isidentifier() plus the keyword list.',
    'Periksa nama-nama contoh, lalu kerjakan kuisnya. Jawaban Python sendiri adalah str.isidentifier() ditambah daftar kata kunci.'))));

  function recordRow() {
    if (mode === 'mem') {
      if (dirty || compileErr || cur === 0) return null;
      const e = hist[cur];
      const i = e.info;
      if (e.error) return { mode: 'memory', expr: i.src, value: `${e.error.type}: ${cut(e.error.message, 60)}`, type: 'error' };
      const ch = e.changed.map((n) => `${n} = ${cut(showRepr(e.vars.get(n)), 30)}`).join(', ');
      const ty = [...new Set(e.changed.map((n) => tname(e.vars.get(n))))].join(', ');
      if (i.kind === 'cond' && i.cond != null) return { mode: 'memory', expr: i.src, value: i.cond ? 'True' : 'False', type: 'bool' };
      if (ch) return { mode: 'memory', expr: i.src, value: ch, type: ty };
      return { mode: 'memory', expr: i.src || '', value: (e.outText || '').replace(/\n$/, '').replace(/\n/g, ' / ') || '–', type: i.kind === 'print' ? 'output' : '–' };
    }
    if (mode === 'types') return lastTypes ? { mode: 'types', ...lastTypes } : null;
    if (mode === 'ops') {
      if (lastOps === 'div' && divVals) return { mode: '/ // %', expr: `${divVals.a} / ${divVals.b} | ${divVals.a} // ${divVals.b} | ${divVals.a} % ${divVals.b}`, value: `${divVals.f} | ${divVals.q} | ${divVals.r}`, type: 'float | int | int' };
      if (lastOps === 'fmt' && lastFmt) return { mode: 'f-string', ...lastFmt };
      if (!opsSteps.length) return null;
      if (opsErr) return { mode: 'operators', expr: opsExpr, value: `${opsErr.type}: ${cut(opsErr.message, 60)}`, type: 'error' };
      return { mode: 'operators', expr: opsExpr, value: opsSteps[opsSteps.length - 1], type: opsFinal ? tname(opsFinal) : '' };
    }
    if (mode === 'names') return lastName ? { mode: 'names', ...lastName } : null;
    return null;
  }
  const lab = labPanel({
    title: 'Variables & types lab',
    filename: 'variables-types-data.csv',
    columns: [
      { key: 'mode', label: 'Mode' },
      { key: 'expr', label: 'Expression / name' },
      { key: 'value', label: 'Value' },
      { key: 'type', label: 'Type' },
    ],
    procedure: [
      'Memory boxes: choose program 1 (x = x + 1 and y = x). Predict the final value of y, step to the end and record the last step.',
      'Run program 4 (swap without temp), then program 3 (swap with temp). Step to the line where the value 3 is lost and record it.',
      'Types: evaluate "5" + "3", 5 + 3 and "5" + 3. Record each value and type (or the error).',
      'Operators: step through 2 + 3 * 4 ** 2 // 5 % 3 and record it; then set a = 32, b = 5 and record / // %.',
      'Naming rules: test 4XYZ, IP rata, Var:+xy, class and No_HP; record which are valid and why.',
    ],
    predict: 'Before you start: what are the value and the type of "5" + "3", of 7 / 2, and of input() when the user types 17?',
    source: () => recordRow(),
  });
  ctrl.appendChild(lab.el);

  // ---- start
  setMode('mem', false);
  loadMemPreset(MEM_PRESETS[0].key);
  tIn.value = '"5" + 3';
  evalTypes(tIn.value);
  oIn.value = L(OPS_PRESETS[0].e);
  oVarsIn.value = L(OPS_PRESETS[0].v) || '';
  opsStart();
  renderFmt();
  lastOps = 'reduce';
  renderName();
  quizNew();
  drawDiv();

  return () => {
    destroyed = true;
    clearTimeout(playTimer);
    out.cancelPrompt();
    for (const f of cleanups) { try { f(); } catch { /* ignore */ } }
    cp.destroy();
    out.destroy();
    main.remove();
    ctrl.remove();
    style.remove();
  };
}
