// From Problem to Program: PP 02's translation steps (problem → IPO → descriptive → pseudocode → flowchart)
// plus PP 03's last step (→ Python) and the trace table with test data. The Python runs in minipy; per-preset
// mapping tables link every Python line to its pseudocode line(s), flowchart symbol, descriptive step and IPO row,
// so a run lights all notations in sync and a click on any of them shows the same step everywhere.
import { button, select, slider, toggle, row } from '../../../lib/controls.js';
import { loop } from '../../../lib/canvas.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';
import { compile, createRun } from '../../../lib/minipy.js';
import { codePanel, consolePanel } from '../../../lib/codepanel.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
const B = (en, id) => ({ en, id });
const MAX_STEPS = 20000;
const TRACE_ROWS = 300;

// ---------------------------------------------------------------------------------------------------------------
// Presets. Python and pseudocode have the same line structure in both languages, so one mapping table serves both.
// units: one per flowchart symbol: { id: node id, py: [Python lines], ps: [pseudocode lines] (first = main line),
//        d: descriptive step (1-based), ipo: 'i' | 'p' | 'o' }
// chart: nodes { id, t: term|io|proc|dec|prep, x, y (centre), w?, h?, text: B('line1\nline2', …) },
//        edges { f, t, from?: side, to?: side, pts?: [[x, y]…], label?: 'yes' | 'no' }
// ---------------------------------------------------------------------------------------------------------------
const PRESETS = [
  {
    key: 'kuadrat',
    name: B('Square of a number (sequence)', 'Hitung kuadrat (urutan)'),
    source: B('A classic first-program example', 'Contoh klasik program pertama'),
    problem: B('Write a program that asks for a whole number and shows its square.',
      'Buat program yang meminta sebuah angka bulat lalu menampilkan kuadratnya.'),
    known: B(['a whole number, for example 12'], ['sebuah angka bulat, misalnya 12']),
    asked: B(['the square of that number (12 × 12 = 144)'], ['kuadrat angka itu (12 × 12 = 144)']),
    note: B('A pure sequence: three boxes one after another, no branch.', 'Sekuensial murni: tiga kotak berurutan tanpa cabang.'),
    ipo: {
      i: B('number: a whole number typed on the keyboard', 'angka: bilangan bulat yang diketik di keyboard'),
      p: B('square = number × number', 'kuadrat = angka × angka'),
      o: B('the sentence "The square of … is …"', 'kalimat "Kuadrat dari … adalah …"'),
    },
    desc: {
      title: B('Title: Algorithm_SquareNumber', 'Judul: Algoritma_HitungKuadrat'),
      comment: B('{computes the square of a whole number}', '{menghitung kuadrat dari sebuah bilangan bulat}'),
      decl: B('Declaration: number, square : whole numbers', 'Deklarasi: angka, kuadrat : bilangan bulat'),
      steps: B(['Read number.', 'Compute square = number × number.', 'Display "The square of", number, "is", square.', 'Finish.'],
        ['Baca angka.', 'Hitung kuadrat = angka × angka.', 'Tampilkan "Kuadrat dari", angka, "adalah", kuadrat.', 'Selesai.']),
    },
    pseudo: B(
`ALGORITHM SquareNumber
DECLARATION
    number, square : integer
START
    READ number
    square ← number × number
    DISPLAY "The square of", number, "is", square
END`,
`ALGORITMA HitungKuadrat
DEKLARASI
    angka, kuadrat : integer
MULAI
    READ angka
    kuadrat ← angka × angka
    DISPLAY "Kuadrat dari", angka, "adalah", kuadrat
SELESAI`),
    py: B(
`number = int(input("Enter a number: "))
square = number * number
print("The square of", number, "is", square)
`,
`angka = int(input("Masukkan sebuah angka: "))
kuadrat = angka * angka
print("Kuadrat dari", angka, "adalah", kuadrat)
`),
    mistake: {
      py: B(
`number = input("Enter a number: ")
square = number * number
print("The square of", number, "is", square)
`,
`angka = input("Masukkan sebuah angka: ")
kuadrat = angka * angka
print("Kuadrat dari", angka, "adalah", kuadrat)
`),
      note: B('Common mistake inserted: int() was left out of line 1. input() always gives text (str), and text × text is a TypeError. Run any test to read the traceback.',
        'Kesalahan umum disisipkan: int() lupa ditulis di baris 1. input() selalu menghasilkan teks (str), dan teks × teks menimbulkan TypeError. Jalankan salah satu data uji untuk membaca traceback-nya.'),
    },
    inputs: [B('number', 'angka')],
    tests: [{ v: ['12'] }, { v: ['0'], tag: B('zero', 'nol') }, { v: ['-3'], tag: B('negative', 'negatif') }],
    vars: B(['number', 'square'], ['angka', 'kuadrat']),
    units: [
      { id: 'start', ps: [4] },
      { id: 'in', py: [1], ps: [5], d: 1, ipo: 'i' },
      { id: 'p', py: [2], ps: [6], d: 2, ipo: 'p' },
      { id: 'out', py: [3], ps: [7], d: 3, ipo: 'o' },
      { id: 'end', ps: [8], d: 4 },
    ],
    chart: {
      w: 300, h: 344,
      nodes: [
        { id: 'start', t: 'term', x: 150, y: 30, text: B('START', 'MULAI') },
        { id: 'in', t: 'io', x: 150, y: 100, text: B('READ number', 'READ angka') },
        { id: 'p', t: 'proc', x: 150, y: 172, text: B('square ← number × number', 'kuadrat ← angka × angka'), w: 236 },
        { id: 'out', t: 'io', x: 150, y: 244, text: B('DISPLAY number, square', 'DISPLAY angka, kuadrat'), w: 236 },
        { id: 'end', t: 'term', x: 150, y: 314, text: B('END', 'SELESAI') },
      ],
      edges: [{ f: 'start', t: 'in' }, { f: 'in', t: 'p' }, { f: 'p', t: 'out' }, { f: 'out', t: 'end' }],
    },
  },
  {
    key: 'luas',
    name: B('Area of a square (sequence)', 'Luas persegi (urutan)'),
    source: B('A classic geometry example', 'Contoh klasik soal geometri'),
    problem: B('Find the area of a square when the length of its side is known.',
      'Hitung luas sebuah persegi jika panjang sisinya diketahui.'),
    known: B(['side: the length of one side (a whole number)'], ['sisi: panjang salah satu sisi (bilangan bulat)']),
    asked: B(['the area of the square = side × side'], ['luas persegi = sisi × sisi']),
    note: B('Some textbooks write this one with DESCRIPTION, Input and Output instead of START, READ and DISPLAY: both notations are fine.',
      'Sebagian buku menulis contoh ini dengan DESKRIPSI, Input, dan Output, bukan MULAI, READ, dan DISPLAY: keduanya boleh.'),
    ipo: {
      i: B('side (whole number)', 'sisi (bilangan bulat)'),
      p: B('area = side × side', 'luas = sisi × sisi'),
      o: B('area', 'luas'),
    },
    desc: {
      title: B('Title: Algorithm_AreaOfSquare', 'Judul: Algoritma_Menghitung_Luas_Persegi'),
      comment: B('{computes the area of a square from its side}', '{menghitung luas persegi dari panjang sisinya}'),
      decl: B('Declaration: side, area : whole numbers', 'Deklarasi: sisi, luas : bilangan bulat'),
      steps: B(['Input the side.', 'Compute area = side × side.', 'Output the area.', 'Finish.'],
        ['Masukkan sisi.', 'Hitung luas = sisi × sisi.', 'Tampilkan luas.', 'Selesai.']),
    },
    pseudo: B(
`ALGORITHM Area_Of_Square
DECLARATION
    side, area : integer
DESCRIPTION
    Input side
    area ← side × side
    Output area`,
`ALGORITMA Menghitung_Luas_Persegi
DEKLARASI
    sisi, luas : integer
DESKRIPSI
    Input sisi
    luas ← sisi × sisi
    Output luas`),
    py: B(
`side = int(input("Enter the side: "))
area = side * side
print("Area of the square =", area)
`,
`sisi = int(input("Masukkan sisi: "))
luas = sisi * sisi
print("Luas persegi =", luas)
`),
    mistake: {
      py: B(
`side = int(input("Enter the side: "))
area = side + side
print("Area of the square =", area)
`,
`sisi = int(input("Masukkan sisi: "))
luas = sisi + sisi
print("Luas persegi =", luas)
`),
      note: B('Common mistake inserted: area became side + side. Test all data: side 2 still passes (2 + 2 = 2 × 2) and so does 0 (0 + 0 = 0 × 0); only 5 catches the bug, so a lucky test proves nothing.',
        'Kesalahan umum disisipkan: luas menjadi sisi + sisi. Uji semua data: sisi 2 tetap lolos (2 + 2 = 2 × 2), begitu pula 0 (0 + 0 = 0 × 0); hanya 5 yang menangkap bug-nya, jadi data uji yang kebetulan benar belum membuktikan apa-apa.'),
    },
    inputs: [B('side', 'sisi')],
    tests: [{ v: ['5'] }, { v: ['2'] }, { v: ['0'], tag: B('zero', 'nol') }],
    vars: B(['side', 'area'], ['sisi', 'luas']),
    units: [
      { id: 'start', ps: [4] },
      { id: 'in', py: [1], ps: [5], d: 1, ipo: 'i' },
      { id: 'p', py: [2], ps: [6], d: 2, ipo: 'p' },
      { id: 'out', py: [3], ps: [7], d: 3, ipo: 'o' },
      { id: 'end', ps: [], d: 4 },
    ],
    chart: {
      w: 300, h: 344,
      nodes: [
        { id: 'start', t: 'term', x: 150, y: 30, text: B('START', 'MULAI') },
        { id: 'in', t: 'io', x: 150, y: 100, text: B('Input side', 'Input sisi') },
        { id: 'p', t: 'proc', x: 150, y: 172, text: B('area ← side × side', 'luas ← sisi × sisi') },
        { id: 'out', t: 'io', x: 150, y: 244, text: B('Output area', 'Output luas') },
        { id: 'end', t: 'term', x: 150, y: 314, text: B('END', 'SELESAI') },
      ],
      edges: [{ f: 'start', t: 'in' }, { f: 'in', t: 'p' }, { f: 'p', t: 'out' }, { f: 'out', t: 'end' }],
    },
  },
  {
    key: 'suhu',
    name: B('Temperature conversion (sequence)', 'Konversi suhu (urutan)'),
    source: B('A classic unit-conversion example', 'Contoh klasik soal konversi satuan'),
    problem: B('Convert a temperature in Celsius to Réaumur and Fahrenheit, using R = 4/5 × C and F = 9/5 × C + 32.',
      'Ubah suhu dalam Celsius ke Reamur dan Fahrenheit dengan rumus R = 4/5 × C dan F = 9/5 × C + 32.'),
    known: B(['C: the temperature in degrees Celsius (may have decimals)', 'the two conversion formulas'],
      ['C: suhu dalam derajat Celsius (boleh desimal)', 'dua rumus konversi']),
    asked: B(['R (Réaumur) and F (Fahrenheit)'], ['R (Reamur) dan F (Fahrenheit)']),
    note: B('The program shows R and F rounded to one decimal; the trace table shows the full values the variables hold.',
      'Program menampilkan R dan F dibulatkan satu desimal; trace table menunjukkan nilai lengkap yang disimpan variabel.'),
    ipo: {
      i: B('C (real number)', 'C (bilangan real)'),
      p: B('R = 4/5 × C;  F = 9/5 × C + 32', 'R = 4/5 × C;  F = 9/5 × C + 32'),
      o: B('R and F, rounded to one decimal', 'R dan F, dibulatkan satu desimal'),
    },
    desc: {
      title: B('Title: Algorithm_TemperatureConversion', 'Judul: Algoritma_KonversiSuhu'),
      comment: B('{converts Celsius to Réaumur and Fahrenheit}', '{mengubah suhu Celsius ke Reamur dan Fahrenheit}'),
      decl: B('Declaration: C, R, F : real numbers', 'Deklarasi: C, R, F : bilangan real'),
      steps: B(['Read the temperature C in Celsius.', 'Convert to Réaumur: R = 4/5 × C.', 'Convert to Fahrenheit: F = 9/5 × C + 32.', 'Display R and F.', 'Finish.'],
        ['Baca suhu C dalam Celsius.', 'Konversi ke Reamur: R = 4/5 × C.', 'Konversi ke Fahrenheit: F = 9/5 × C + 32.', 'Tampilkan R dan F.', 'Selesai.']),
    },
    pseudo: B(
`ALGORITHM TemperatureConversion
DECLARATION
    C, R, F : real
START
    READ C
    R ← 4/5 × C          {convert to Réaumur}
    F ← 9/5 × C + 32     {convert to Fahrenheit}
    DISPLAY R, F
END`,
`ALGORITMA KonversiSuhu
DEKLARASI
    C, R, F : real
MULAI
    READ C
    R ← 4/5 × C          {konversi ke Reamur}
    F ← 9/5 × C + 32     {konversi ke Fahrenheit}
    DISPLAY R, F
SELESAI`),
    py: B(
`C = float(input("Temperature in Celsius: "))
R = 4 / 5 * C          # convert to Reaumur
F = 9 / 5 * C + 32     # convert to Fahrenheit
print(f"Reaumur    : {R:.1f}")
print(f"Fahrenheit : {F:.1f}")
`,
`C = float(input("Masukkan suhu dalam Celsius: "))
R = 4 / 5 * C          # konversi ke Reamur
F = 9 / 5 * C + 32     # konversi ke Fahrenheit
print(f"Reamur     : {R:.1f}")
print(f"Fahrenheit : {F:.1f}")
`),
    mistake: {
      py: B(
`C = float(input("Temperature in Celsius: "))
R = 4 / 5 * C          # convert to Reaumur
F = 9 / 5 * (C + 32)   # convert to Fahrenheit
print(f"Reaumur    : {R:.1f}")
print(f"Fahrenheit : {F:.1f}")
`,
`C = float(input("Masukkan suhu dalam Celsius: "))
R = 4 / 5 * C          # konversi ke Reamur
F = 9 / 5 * (C + 32)   # konversi ke Fahrenheit
print(f"Reamur     : {R:.1f}")
print(f"Fahrenheit : {F:.1f}")
`),
      note: B('Common mistake inserted: brackets in line 3 make Python add 32 before multiplying. 9/5 × C + 32 means (9/5 × C) + 32, so every Fahrenheit test now fails.',
        'Kesalahan umum disisipkan: tanda kurung di baris 3 membuat Python menjumlahkan 32 sebelum mengalikan. 9/5 × C + 32 artinya (9/5 × C) + 32, sehingga semua uji Fahrenheit kini gagal.'),
    },
    inputs: [B('C', 'C')],
    tests: [{ v: ['100'] }, { v: ['37.5'] }, { v: ['0'], tag: B('freezing', 'titik beku') }, { v: ['-40'], tag: B('C = F', 'C = F') }],
    vars: B(['C', 'R', 'F'], ['C', 'R', 'F']),
    units: [
      { id: 'start', ps: [4] },
      { id: 'in', py: [1], ps: [5], d: 1, ipo: 'i' },
      { id: 'r', py: [2], ps: [6], d: 2, ipo: 'p' },
      { id: 'f', py: [3], ps: [7], d: 3, ipo: 'p' },
      { id: 'out', py: [4, 5], ps: [8], d: 4, ipo: 'o' },
      { id: 'end', ps: [9], d: 5 },
    ],
    chart: {
      w: 300, h: 416,
      nodes: [
        { id: 'start', t: 'term', x: 150, y: 30, text: B('START', 'MULAI') },
        { id: 'in', t: 'io', x: 150, y: 100, text: B('READ C', 'READ C') },
        { id: 'r', t: 'proc', x: 150, y: 172, text: B('R ← 4/5 × C', 'R ← 4/5 × C') },
        { id: 'f', t: 'proc', x: 150, y: 244, text: B('F ← 9/5 × C + 32', 'F ← 9/5 × C + 32') },
        { id: 'out', t: 'io', x: 150, y: 316, text: B('DISPLAY R, F', 'DISPLAY R, F') },
        { id: 'end', t: 'term', x: 150, y: 386, text: B('END', 'SELESAI') },
      ],
      edges: [{ f: 'start', t: 'in' }, { f: 'in', t: 'r' }, { f: 'r', t: 'f' }, { f: 'f', t: 'out' }, { f: 'out', t: 'end' }],
    },
  },
  {
    key: 'diskon',
    name: B('Price after discount (HitungDiskon)', 'Hitung diskon (HitungDiskon)'),
    source: B('A classic percentage-discount example', 'Contoh klasik soal diskon persentase'),
    problem: B('A shop gives a discount of a given percentage. Compute the price after the discount; the price can never drop below 0.',
      'Sebuah toko memberi diskon sebesar persentase tertentu. Hitung harga setelah diskon; harga tidak boleh kurang dari 0.'),
    known: B(['price: the original price', 'percent: the discount in %'], ['hargaAwal: harga awal produk', 'besaranDiskon: besar diskon dalam %']),
    asked: B(['finalPrice: the price after the discount (at least 0)'], ['hargaDiskon: harga setelah diskon (minimal 0)']),
    note: B('The IF only changes something when the discount is more than 100%, so test 100% (exactly 0) and 120% (below 0). Python prints 0.0 for the first and 0 for the second, because the IF stores the whole number 0.',
      'IF hanya mengubah sesuatu jika diskon lebih dari 100%, jadi uji 100% (tepat 0) dan 120% (di bawah 0). Python menampilkan 0.0 untuk yang pertama dan 0 untuk yang kedua, karena IF menyimpan bilangan bulat 0.'),
    ipo: {
      i: B('price, percent', 'hargaAwal, besaranDiskon'),
      p: B('reduction = price × percent ÷ 100; finalPrice = price − reduction; if finalPrice < 0, make it 0',
        'potongan = hargaAwal × besaranDiskon ÷ 100; hargaDiskon = hargaAwal − potongan; jika hargaDiskon < 0, jadikan 0'),
      o: B('finalPrice', 'hargaDiskon'),
    },
    desc: {
      title: B('Title: Algorithm_DiscountedPrice', 'Judul: Algoritma_HitungDiskon'),
      comment: B('{computes the price after a discount from the original price and the size of the discount}',
        '{menghitung harga setelah diskon dari harga awal produk dan besaran diskonnya}'),
      decl: B('Declaration: price, percent, reduction, finalPrice : numbers', 'Deklarasi: hargaAwal, besaranDiskon, potongan, hargaDiskon : bilangan'),
      steps: B(['Read price and percent (%).', 'Compute reduction = price × percent ÷ 100.', 'Compute finalPrice = price − reduction.',
        'If finalPrice is less than 0, set finalPrice to 0.', 'Display finalPrice.', 'Finish.'],
      ['Baca hargaAwal dan besaranDiskon (%).', 'Hitung potongan = hargaAwal × besaranDiskon ÷ 100.', 'Hitung hargaDiskon = hargaAwal − potongan.',
        'Jika hargaDiskon kurang dari 0, ubah hargaDiskon menjadi 0.', 'Tampilkan hargaDiskon.', 'Selesai.']),
    },
    pseudo: B(
`ALGORITHM DiscountedPrice
DECLARATION
    price, percent : real
    reduction, finalPrice : real
START
    READ price, percent
    reduction ← price * percent / 100
    finalPrice ← price - reduction
    IF finalPrice < 0 THEN
        finalPrice ← 0
    ENDIF
    DISPLAY finalPrice
END`,
`ALGORITMA HitungDiskon
DEKLARASI
    hargaAwal, besaranDiskon : real
    potongan, hargaDiskon : real
MULAI
    READ hargaAwal, besaranDiskon
    potongan ← hargaAwal * besaranDiskon / 100
    hargaDiskon ← hargaAwal - potongan
    IF hargaDiskon < 0 THEN
        hargaDiskon ← 0
    ENDIF
    DISPLAY hargaDiskon
SELESAI`),
    py: B(
`price = float(input("Original price: "))
percent = float(input("Discount (%): "))
reduction = price * percent / 100
finalPrice = price - reduction
if finalPrice < 0:
    finalPrice = 0
print("Price after discount:", finalPrice)
`,
`hargaAwal = float(input("Harga awal: "))
besaranDiskon = float(input("Besaran diskon (%): "))
potongan = hargaAwal * besaranDiskon / 100
hargaDiskon = hargaAwal - potongan
if hargaDiskon < 0:
    hargaDiskon = 0
print("Harga setelah diskon:", hargaDiskon)
`),
    mistake: {
      py: B(
`price = float(input("Original price: "))
percent = float(input("Discount (%): "))
reduction = price * percent
finalPrice = price - reduction
if finalPrice < 0:
    finalPrice = 0
print("Price after discount:", finalPrice)
`,
`hargaAwal = float(input("Harga awal: "))
besaranDiskon = float(input("Besaran diskon (%): "))
potongan = hargaAwal * besaranDiskon
hargaDiskon = hargaAwal - potongan
if hargaDiskon < 0:
    hargaDiskon = 0
print("Harga setelah diskon:", hargaDiskon)
`),
      note: B('Common mistake inserted: "÷ 100" was dropped from line 3, so a 25% discount takes 25 times the price off. The IF then hides the bug by printing 0, so the 120% test still passes. The first test exposes it (0 instead of 150000.0); the 100% test fails only because the IF prints 0 where the original prints 0.0.',
        'Kesalahan umum disisipkan: "÷ 100" terlupa di baris 3, sehingga diskon 25% memotong 25 kali harga. IF lalu menutupi bug ini dengan menampilkan 0, sehingga data uji 120% tetap lolos. Data uji pertama membongkarnya (0, bukan 150000.0); data uji 100% gagal hanya karena IF menampilkan 0, sedangkan program asli menampilkan 0.0.'),
    },
    inputs: [B('price', 'hargaAwal'), B('percent', 'besaranDiskon')],
    tests: [{ v: ['200000', '25'] }, { v: ['50000', '100'], tag: B('exactly 0', 'tepat 0') }, { v: ['50000', '120'], tag: B('below 0', 'di bawah 0') }],
    vars: B(['price', 'percent', 'reduction', 'finalPrice'], ['hargaAwal', 'besaranDiskon', 'potongan', 'hargaDiskon']),
    units: [
      { id: 'start', ps: [5] },
      { id: 'in', py: [1, 2], ps: [6], d: 1, ipo: 'i' },
      { id: 'p1', py: [3], ps: [7], d: 2, ipo: 'p' },
      { id: 'p2', py: [4], ps: [8], d: 3, ipo: 'p' },
      { id: 'dec', py: [5], ps: [9, 11], d: 4, ipo: 'p' },
      { id: 'yes', py: [6], ps: [10], d: 4, ipo: 'p' },
      { id: 'out', py: [7], ps: [12], d: 5, ipo: 'o' },
      { id: 'end', ps: [13], d: 6 },
    ],
    chart: {
      w: 440, h: 560,
      nodes: [
        { id: 'start', t: 'term', x: 150, y: 30, text: B('START', 'MULAI') },
        { id: 'in', t: 'io', x: 150, y: 102, h: 52, text: B('READ price,\npercent', 'READ hargaAwal,\nbesaranDiskon') },
        { id: 'p1', t: 'proc', x: 150, y: 182, h: 52, text: B('reduction ← price ×\npercent / 100', 'potongan ← hargaAwal ×\nbesaranDiskon / 100') },
        { id: 'p2', t: 'proc', x: 150, y: 260, h: 52, text: B('finalPrice ←\nprice − reduction', 'hargaDiskon ←\nhargaAwal − potongan') },
        { id: 'dec', t: 'dec', x: 150, y: 352, w: 190, h: 76, text: B('finalPrice\n< 0 ?', 'hargaDiskon\n< 0 ?') },
        { id: 'yes', t: 'proc', x: 355, y: 352, w: 150, text: B('finalPrice ← 0', 'hargaDiskon ← 0') },
        { id: 'out', t: 'io', x: 150, y: 452, h: 52, text: B('DISPLAY\nfinalPrice', 'DISPLAY\nhargaDiskon') },
        { id: 'end', t: 'term', x: 150, y: 526, text: B('END', 'SELESAI') },
      ],
      edges: [
        { f: 'start', t: 'in' }, { f: 'in', t: 'p1' }, { f: 'p1', t: 'p2' }, { f: 'p2', t: 'dec' },
        { f: 'dec', t: 'yes', from: 'right', to: 'left', label: 'yes' },
        { f: 'dec', t: 'out', label: 'no', ls: 'left' },
        { f: 'yes', t: 'out', pts: [[355, 404], [150, 404]] },
        { f: 'out', t: 'end' },
      ],
    },
  },
  {
    key: 'diskon10',
    name: B('10% discount over Rp100,000', 'Diskon 10% di atas Rp100.000'),
    source: B('A classic cashier example', 'Contoh klasik soal kasir'),
    problem: B('A shop gives a 10% discount if the total shopping is more than Rp100,000. Compute the total the customer has to pay.',
      'Sebuah toko memberikan diskon 10% jika total belanja melebihi Rp100.000. Hitung total yang harus dibayar pelanggan.'),
    known: B(['total_shopping: the total before the discount'], ['total_belanja: total belanja sebelum diskon']),
    asked: B(['total_to_pay: what the customer pays after the discount'], ['total_bayar: total yang harus dibayar setelah diskon']),
    note: B('"More than" means > 100000: exactly Rp100,000 gets no discount. That is the boundary case to test.',
      '"Melebihi" artinya > 100000: tepat Rp100.000 tidak mendapat diskon. Itulah kasus batas yang perlu diuji.'),
    ipo: {
      i: B('total_shopping', 'total_belanja'),
      p: B('if total_shopping > 100,000 then discount = 10% × total_shopping, otherwise 0; total_to_pay = total_shopping − discount',
        'jika total_belanja > 100.000 maka diskon = 10% × total_belanja, selain itu 0; total_bayar = total_belanja − diskon'),
      o: B('discount and total_to_pay', 'diskon dan total_bayar'),
    },
    desc: {
      title: B('Title: Algorithm_TotalToPay', 'Judul: Algoritma_HitungTotalBayar'),
      comment: B('{10% discount when the shopping total is more than Rp100,000}', '{diskon 10% jika total belanja melebihi Rp100.000}'),
      decl: B('Declaration: total_shopping, discount, total_to_pay : numbers', 'Deklarasi: total_belanja, diskon, total_bayar : bilangan'),
      steps: B(['Read total_shopping.', 'Set discount to 0.', 'If total_shopping is more than 100,000, discount = 10% × total_shopping.',
        'Compute total_to_pay = total_shopping − discount.', 'Display discount and total_to_pay.', 'Finish.'],
      ['Baca total_belanja.', 'Isi diskon dengan 0.', 'Jika total_belanja lebih dari 100.000, diskon = 10% × total_belanja.',
        'Hitung total_bayar = total_belanja − diskon.', 'Tampilkan diskon dan total_bayar.', 'Selesai.']),
    },
    pseudo: B(
`ALGORITHM TotalToPay
DECLARATION
    total_shopping, discount, total_to_pay : real
START
    READ total_shopping
    discount ← 0
    IF total_shopping > 100000 THEN
        discount ← total_shopping × 10 / 100
    ENDIF
    total_to_pay ← total_shopping − discount
    DISPLAY discount, total_to_pay
END`,
`ALGORITMA HitungTotalBayar
DEKLARASI
    total_belanja, diskon, total_bayar : real
MULAI
    READ total_belanja
    diskon ← 0
    IF total_belanja > 100000 THEN
        diskon ← total_belanja × 10 / 100
    ENDIF
    total_bayar ← total_belanja − diskon
    DISPLAY diskon, total_bayar
SELESAI`),
    py: B(
`total_shopping = int(input("Total shopping (Rp): "))
discount = 0
if total_shopping > 100000:
    discount = total_shopping * 10 / 100
total_to_pay = total_shopping - discount
print("Discount     :", discount)
print("Total to pay :", total_to_pay)
`,
`total_belanja = int(input("Total belanja (Rp): "))
diskon = 0
if total_belanja > 100000:
    diskon = total_belanja * 10 / 100
total_bayar = total_belanja - diskon
print("Diskon      :", diskon)
print("Total bayar :", total_bayar)
`),
    mistake: {
      py: B(
`total_shopping = int(input("Total shopping (Rp): "))
discount = 0
if total_shopping >= 100000:
    discount = total_shopping * 10 / 100
total_to_pay = total_shopping - discount
print("Discount     :", discount)
print("Total to pay :", total_to_pay)
`,
`total_belanja = int(input("Total belanja (Rp): "))
diskon = 0
if total_belanja >= 100000:
    diskon = total_belanja * 10 / 100
total_bayar = total_belanja - diskon
print("Diskon      :", diskon)
print("Total bayar :", total_bayar)
`),
      note: B('Common mistake inserted: > became >= in line 3. Exactly Rp100,000 now gets a discount although the problem says "more than"; only the boundary test catches it.',
        'Kesalahan umum disisipkan: > berubah menjadi >= di baris 3. Tepat Rp100.000 sekarang mendapat diskon padahal syaratnya "melebihi"; hanya data uji batas yang menangkapnya.'),
    },
    inputs: [B('total_shopping', 'total_belanja')],
    tests: [{ v: ['150000'] }, { v: ['100000'], tag: B('boundary', 'batas') }, { v: ['100001'], tag: B('just above', 'tepat di atas') }],
    vars: B(['total_shopping', 'discount', 'total_to_pay'], ['total_belanja', 'diskon', 'total_bayar']),
    units: [
      { id: 'start', ps: [4] },
      { id: 'in', py: [1], ps: [5], d: 1, ipo: 'i' },
      { id: 'p0', py: [2], ps: [6], d: 2, ipo: 'p' },
      { id: 'dec', py: [3], ps: [7, 9], d: 3, ipo: 'p' },
      { id: 'yes', py: [4], ps: [8], d: 3, ipo: 'p' },
      { id: 'p2', py: [5], ps: [10], d: 4, ipo: 'p' },
      { id: 'out', py: [6, 7], ps: [11], d: 5, ipo: 'o' },
      { id: 'end', ps: [12], d: 6 },
    ],
    chart: {
      w: 460, h: 556,
      nodes: [
        { id: 'start', t: 'term', x: 150, y: 30, text: B('START', 'MULAI') },
        { id: 'in', t: 'io', x: 150, y: 100, text: B('READ total_shopping', 'READ total_belanja') },
        { id: 'p0', t: 'proc', x: 150, y: 172, text: B('discount ← 0', 'diskon ← 0') },
        { id: 'dec', t: 'dec', x: 150, y: 262, w: 200, h: 80, text: B('total_shopping\n> 100000 ?', 'total_belanja\n> 100000 ?') },
        { id: 'yes', t: 'proc', x: 368, y: 262, w: 160, h: 64, text: B('discount ←\ntotal_shopping\n× 10 / 100', 'diskon ←\ntotal_belanja\n× 10 / 100') },
        { id: 'p2', t: 'proc', x: 150, y: 362, h: 52, text: B('total_to_pay ←\ntotal_shopping − discount', 'total_bayar ←\ntotal_belanja − diskon'), w: 230 },
        { id: 'out', t: 'io', x: 150, y: 446, h: 52, text: B('DISPLAY discount,\ntotal_to_pay', 'DISPLAY diskon,\ntotal_bayar') },
        { id: 'end', t: 'term', x: 150, y: 520, text: B('END', 'SELESAI') },
      ],
      edges: [
        { f: 'start', t: 'in' }, { f: 'in', t: 'p0' }, { f: 'p0', t: 'dec' },
        { f: 'dec', t: 'yes', from: 'right', to: 'left', label: 'yes' },
        { f: 'dec', t: 'p2', label: 'no', ls: 'left' },
        { f: 'yes', t: 'p2', pts: [[368, 318], [150, 318]] },
        { f: 'p2', t: 'out' }, { f: 'out', t: 'end' },
      ],
    },
  },
  {
    key: 'predikat',
    name: B('Pass or not (PredikatKelulusan)', 'Predikat kelulusan (PredikatKelulusan)'),
    source: B('A classic grading example', 'Contoh klasik penentuan kelulusan'),
    problem: B('A course decides: a final score ≥ 75 means PASSED, anything else NOT PASSED. Write the algorithm.',
      'Sebuah kursus menetapkan: nilai akhir ≥ 75 dinyatakan LULUS, selain itu TIDAK LULUS. Buat algoritmanya.'),
    known: B(['score: the final score (may have decimals)', 'the pass mark, 75'], ['nilai: nilai akhir (boleh desimal)', 'batas lulus 75']),
    asked: B(['result: PASSED or NOT PASSED'], ['predikat: LULUS atau TIDAK LULUS']),
    note: B('Suggested test data: 80, 75 (the boundary case) and 74.9. Python needs a decimal point: float("74,9") is a ValueError.',
      'Data uji yang disarankan: 80, 75 (kasus batas), dan 74,9. Python memakai titik desimal: float("74,9") menimbulkan ValueError, jadi ketik 74.9.'),
    ipo: {
      i: B('score (the final score)', 'nilai (nilai akhir)'),
      p: B('compare score with 75: score ≥ 75 → PASSED, otherwise NOT PASSED', 'bandingkan nilai dengan 75: nilai ≥ 75 → LULUS, selain itu TIDAK LULUS'),
      o: B('result: PASSED / NOT PASSED', 'predikat: LULUS / TIDAK LULUS'),
    },
    desc: {
      title: B('Title: Algorithm_PassResult', 'Judul: Algoritma_PredikatKelulusan'),
      comment: B('{decides PASSED / NOT PASSED from the final score}', '{menentukan predikat LULUS / TIDAK LULUS dari nilai akhir}'),
      decl: B('Declaration: score : real number; result : text', 'Deklarasi: nilai : bilangan real; predikat : teks'),
      steps: B(['Read score.', 'If score is at least 75, result = "PASSED".', 'Otherwise, result = "NOT PASSED".', 'Display result.', 'Finish.'],
        ['Baca nilai.', 'Jika nilai minimal 75, predikat = "LULUS".', 'Jika tidak, predikat = "TIDAK LULUS".', 'Tampilkan predikat.', 'Selesai.']),
    },
    pseudo: B(
`ALGORITHM PassResult
DECLARATION
    score : real; result : string
START
    READ score
    IF score >= 75 THEN
        result ← "PASSED"
    ELSE
        result ← "NOT PASSED"
    ENDIF
    DISPLAY result
END`,
`ALGORITMA PredikatKelulusan
DEKLARASI
    nilai : real; predikat : string
MULAI
    READ nilai
    IF nilai >= 75 THEN
        predikat ← "LULUS"
    ELSE
        predikat ← "TIDAK LULUS"
    ENDIF
    DISPLAY predikat
SELESAI`),
    py: B(
`score = float(input("Enter the score: "))
if score >= 75:
    result = "PASSED"
else:
    result = "NOT PASSED"
print(result)
`,
`nilai = float(input("Masukkan nilai: "))
if nilai >= 75:
    predikat = "LULUS"
else:
    predikat = "TIDAK LULUS"
print(predikat)
`),
    mistake: {
      py: B(
`score = float(input("Enter the score: "))
if score > 75:
    result = "PASSED"
else:
    result = "NOT PASSED"
print(result)
`,
`nilai = float(input("Masukkan nilai: "))
if nilai > 75:
    predikat = "LULUS"
else:
    predikat = "TIDAK LULUS"
print(predikat)
`),
      note: B('Common mistake inserted: >= became > in line 2. 80 and 74.9 still give the right result; only the boundary case 75 shows the bug.',
        'Kesalahan umum disisipkan: >= berubah menjadi > di baris 2. 80 dan 74.9 tetap benar; hanya kasus batas 75 yang menunjukkan bug.'),
    },
    inputs: [B('score', 'nilai')],
    tests: [{ v: ['80'] }, { v: ['75'], tag: B('boundary', 'batas') }, { v: ['74.9'] }],
    vars: B(['score', 'result'], ['nilai', 'predikat']),
    units: [
      { id: 'start', ps: [4] },
      { id: 'in', py: [1], ps: [5], d: 1, ipo: 'i' },
      { id: 'dec', py: [2], ps: [6, 10], d: 2, ipo: 'p' },
      { id: 'yes', py: [3], ps: [7], d: 2, ipo: 'p' },
      { id: 'no', py: [5, 4], ps: [9, 8], d: 3, ipo: 'p' },
      { id: 'out', py: [6], ps: [11], d: 4, ipo: 'o' },
      { id: 'end', ps: [12], d: 5 },
    ],
    chart: {
      w: 440, h: 490,
      nodes: [
        { id: 'start', t: 'term', x: 220, y: 30, text: B('START', 'MULAI') },
        { id: 'in', t: 'io', x: 220, y: 100, text: B('READ score', 'READ nilai') },
        { id: 'dec', t: 'dec', x: 220, y: 192, w: 180, text: B('score ≥ 75 ?', 'nilai ≥ 75 ?') },
        { id: 'yes', t: 'proc', x: 95, y: 282, w: 170, h: 52, text: B('result ←\n"PASSED"', 'predikat ←\n"LULUS"') },
        { id: 'no', t: 'proc', x: 345, y: 282, w: 170, h: 52, text: B('result ←\n"NOT PASSED"', 'predikat ←\n"TIDAK LULUS"') },
        { id: 'out', t: 'io', x: 220, y: 382, text: B('DISPLAY result', 'DISPLAY predikat') },
        { id: 'end', t: 'term', x: 220, y: 452, text: B('END', 'SELESAI') },
      ],
      edges: [
        { f: 'start', t: 'in' }, { f: 'in', t: 'dec' },
        { f: 'dec', t: 'yes', from: 'left', pts: [[95, 192]], label: 'yes' },
        { f: 'dec', t: 'no', from: 'right', pts: [[345, 192]], label: 'no' },
        { f: 'yes', t: 'out', pts: [[95, 334], [220, 334]] },
        { f: 'no', t: 'out', pts: [[345, 334], [220, 334]] },
        { f: 'out', t: 'end' },
      ],
    },
  },
  {
    key: 'jumlah',
    name: B('Sum 1 to n (loop)', 'Jumlah 1 sampai n (perulangan)'),
    source: B('for + range() and the accumulator pattern', 'for + range() dan pola akumulator'),
    problem: B('Add up all whole numbers from 1 to n, for example 1 + 2 + 3 + 4 + 5 = 15 when n = 5.',
      'Jumlahkan semua bilangan bulat dari 1 sampai n, misalnya 1 + 2 + 3 + 4 + 5 = 15 untuk n = 5.'),
    known: B(['n: the last number (a whole number, 0 or more)'], ['n: bilangan terakhir (bilangan bulat, 0 atau lebih)']),
    asked: B(['total: the sum 1 + 2 + … + n'], ['jumlah: hasil 1 + 2 + … + n']),
    note: B('n = 0 is the boundary case: the loop body runs zero times and the sum stays 0. The number of repetitions is known in advance, so this is a counted loop (FOR, hexagon).',
      'n = 0 adalah kasus batas: badan perulangan berjalan nol kali dan jumlah tetap 0. Banyak pengulangan sudah diketahui, jadi ini perulangan terhitung (FOR, segi enam).'),
    ipo: {
      i: B('n', 'n'),
      p: B('total starts at 0; for every i from 1 to n: total = total + i (accumulator)', 'jumlah mulai dari 0; untuk setiap i dari 1 sampai n: jumlah = jumlah + i (akumulator)'),
      o: B('total', 'jumlah'),
    },
    desc: {
      title: B('Title: Algorithm_Sum1ToN', 'Judul: Algoritma_Jumlah1SampaiN'),
      comment: B('{adds 1 + 2 + … + n with a counted loop}', '{menjumlahkan 1 + 2 + … + n dengan perulangan terhitung}'),
      decl: B('Declaration: n, i, total : whole numbers', 'Deklarasi: n, i, jumlah : bilangan bulat'),
      steps: B(['Read n.', 'Set total to 0.', 'For every i from 1 to n, add i to total.', 'Display total.', 'Finish.'],
        ['Baca n.', 'Isi jumlah dengan 0.', 'Untuk setiap i dari 1 sampai n, tambahkan i ke jumlah.', 'Tampilkan jumlah.', 'Selesai.']),
    },
    pseudo: B(
`ALGORITHM Sum1ToN
DECLARATION
    n, i, total : integer
START
    READ n
    total ← 0
    FOR i ← 1 TO n DO
        total ← total + i
    ENDFOR
    DISPLAY total
END`,
`ALGORITMA Jumlah1SampaiN
DEKLARASI
    n, i, jumlah : integer
MULAI
    READ n
    jumlah ← 0
    FOR i ← 1 TO n DO
        jumlah ← jumlah + i
    ENDFOR
    DISPLAY jumlah
SELESAI`),
    py: B(
`n = int(input("Enter n: "))
total = 0
for i in range(1, n + 1):
    total = total + i
print("Sum of 1 to", n, "=", total)
`,
`n = int(input("Masukkan n: "))
jumlah = 0
for i in range(1, n + 1):
    jumlah = jumlah + i
print("Jumlah 1 sampai", n, "=", jumlah)
`),
    mistake: {
      py: B(
`n = int(input("Enter n: "))
total = 0
for i in range(1, n):
    total = total + i
print("Sum of 1 to", n, "=", total)
`,
`n = int(input("Masukkan n: "))
jumlah = 0
for i in range(1, n):
    jumlah = jumlah + i
print("Jumlah 1 sampai", n, "=", jumlah)
`),
      note: B('Common mistake inserted: range(1, n) stops before n, so the last number is never added (an off-by-one error). n = 0 still passes; the other tests catch it.',
        'Kesalahan umum disisipkan: range(1, n) berhenti sebelum n, sehingga bilangan terakhir tidak pernah dijumlahkan (kesalahan selisih satu). n = 0 tetap lolos; data uji lain menangkapnya.'),
    },
    inputs: [B('n', 'n')],
    tests: [{ v: ['5'] }, { v: ['1'] }, { v: ['0'], tag: B('boundary', 'batas') }],
    vars: B(['n', 'total', 'i'], ['n', 'jumlah', 'i']),
    units: [
      { id: 'start', ps: [4] },
      { id: 'in', py: [1], ps: [5], d: 1, ipo: 'i' },
      { id: 'p0', py: [2], ps: [6], d: 2, ipo: 'p' },
      { id: 'loop', py: [3], ps: [7, 9], d: 3, ipo: 'p' },
      { id: 'body', py: [4], ps: [8], d: 3, ipo: 'p' },
      { id: 'out', py: [5], ps: [10], d: 4, ipo: 'o' },
      { id: 'end', ps: [11], d: 5 },
    ],
    chart: {
      w: 440, h: 440,
      nodes: [
        { id: 'start', t: 'term', x: 150, y: 30, text: B('START', 'MULAI') },
        { id: 'in', t: 'io', x: 150, y: 100, text: B('READ n', 'READ n') },
        { id: 'p0', t: 'proc', x: 150, y: 170, w: 200, text: B('total ← 0', 'jumlah ← 0') },
        { id: 'loop', t: 'prep', x: 150, y: 252, text: B('i ← 1 TO n', 'i ← 1 TO n') },
        { id: 'body', t: 'proc', x: 150, y: 340, w: 200, text: B('total ← total + i', 'jumlah ← jumlah + i') },
        { id: 'out', t: 'io', x: 345, y: 340, w: 170, text: B('DISPLAY total', 'DISPLAY jumlah') },
        { id: 'end', t: 'term', x: 345, y: 412, text: B('END', 'SELESAI') },
      ],
      edges: [
        { f: 'start', t: 'in' }, { f: 'in', t: 'p0' }, { f: 'p0', t: 'loop' },
        { f: 'loop', t: 'body', label: 'yes' },
        { f: 'body', t: 'loop', to: 'left', pts: [[150, 392], [28, 392], [28, 252]] },
        { f: 'loop', t: 'out', from: 'right', pts: [[345, 252]], label: 'no' },
        { f: 'out', t: 'end' },
      ],
    },
  },
];

const DEFAULT_PRESET = 'predikat';

const STAGES = [
  { n: 1, name: B('Problem', 'Masalah') },
  { n: 2, name: B('IPO', 'IPO') },
  { n: 3, name: B('Descriptive', 'Deskriptif') },
  { n: 4, name: B('Pseudocode', 'Pseudocode') },
  { n: 5, name: B('Flowchart', 'Flowchart') },
  { n: 6, name: B('Python', 'Python') },
  { n: 7, name: B('Trace table', 'Trace table') },
];

const THINK = {
  2: B('What goes in, what has to be worked out, and what comes out?', 'Apa masukannya, apa yang harus diolah, dan apa keluarannya?'),
  3: B('Write the steps in plain words, in order. Is every step clear, and does the list end?', 'Tulis langkahnya dengan kalimat biasa, berurutan. Apakah tiap langkah jelas, dan apakah daftarnya berakhir?'),
  4: B('Rewrite the steps with READ, ←, IF … THEN … ELSE … ENDIF, FOR … DO … ENDFOR and DISPLAY.', 'Tulis ulang langkahnya dengan READ, ←, IF … THEN … ELSE … ENDIF, FOR … DO … ENDFOR, dan DISPLAY.'),
  5: B('Which symbol does each pseudocode line become: terminal, parallelogram, rectangle, diamond or hexagon?', 'Setiap baris pseudocode menjadi simbol apa: terminal, jajar genjang, persegi panjang, belah ketupat, atau segi enam?'),
  6: B('Translate line by line: READ → input(), ← → =, IF … THEN → if …:, DISPLAY → print().', 'Terjemahkan baris demi baris: READ → input(), ← → =, IF … THEN → if …:, DISPLAY → print().'),
  7: B('Predict the output for every test value, including the boundary case, before you run it.', 'Tebak keluaran untuk setiap data uji, termasuk kasus batas, sebelum menjalankannya.'),
};

const SYMBOL = {
  term: B('terminal', 'terminal'),
  io: B('parallelogram (input/output)', 'jajar genjang (input/output)'),
  proc: B('rectangle (process)', 'persegi panjang (proses)'),
  dec: B('diamond (decision)', 'belah ketupat (keputusan)'),
  prep: B('hexagon (preparation: counted loop)', 'segi enam (persiapan: perulangan terhitung)'),
};

// ---------------------------------------------------------------------------------------------------------------
// Flowchart geometry
// ---------------------------------------------------------------------------------------------------------------
const SIZE = { term: [140, 38], io: [220, 44], proc: [220, 44], dec: [190, 72], prep: [200, 50] };
const SKEW = 14;
const geom = (n) => ({ w: n.w ?? SIZE[n.t][0], h: n.h ?? SIZE[n.t][1] });

function anchor(n, side) {
  const { w, h } = geom(n);
  const inset = n.t === 'io' ? SKEW / 2 : 0;
  if (side === 'top') return [n.x, n.y - h / 2];
  if (side === 'left') return [n.x - w / 2 + inset, n.y];
  if (side === 'right') return [n.x + w / 2 - inset, n.y];
  return [n.x, n.y + h / 2];
}

function edgePoints(nodes, e) {
  const a = nodes.get(e.f), b = nodes.get(e.t);
  const p0 = anchor(a, e.from || 'bottom');
  const toSide = e.to || (e.pts && e.pts.length && e.pts[e.pts.length - 1][1] === b.y ? (e.pts[e.pts.length - 1][0] < b.x ? 'left' : 'right') : 'top');
  const p1 = anchor(b, toSide);
  const pts = [p0, ...(e.pts || []), p1];
  // straighten a right/left exit that has no waypoints into an elbow
  if (!e.pts && p0[0] !== p1[0] && p0[1] !== p1[1]) pts.splice(1, 0, (e.from === 'right' || e.from === 'left') ? [p1[0], p0[1]] : [p0[0], p1[1]]);
  return pts;
}

function shapeSVG(n) {
  const { w, h } = geom(n);
  const l = n.x - w / 2, r = n.x + w / 2, t = n.y - h / 2, b = n.y + h / 2;
  const P = (pts) => `<polygon class="ptp-shape" points="${pts.map((p) => p.map((v) => +v.toFixed(1)).join(',')).join(' ')}"/>`;
  if (n.t === 'term') return `<rect class="ptp-shape" x="${l}" y="${t}" width="${w}" height="${h}" rx="${h / 2}"/>`;
  if (n.t === 'proc') return `<rect class="ptp-shape" x="${l}" y="${t}" width="${w}" height="${h}" rx="3"/>`;
  if (n.t === 'io') return P([[l + SKEW, t], [r, t], [r - SKEW, b], [l, b]]);
  if (n.t === 'dec') return P([[n.x, t], [r, n.y], [n.x, b], [l, n.y]]);
  return P([[l + 18, t], [r - 18, t], [r, n.y], [r - 18, b], [l + 18, b], [l, n.y]]); // prep hexagon
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pathD = (pts) => pts.map((p, i) => (i ? 'L' : 'M') + p[0] + ' ' + p[1]).join(' ');
const lang = () => (getLocale() === 'id' ? 'id' : 'en');
const L = (o) => (o == null ? '' : typeof o === 'string' ? o : o[lang()]);
const srcOf = (o) => L(o).replace(/\n+$/, '');   // Python sources are shown without the final newline

// ---------------------------------------------------------------------------------------------------------------
// Python source helpers (work on the student's possibly edited code)
// ---------------------------------------------------------------------------------------------------------------
const HEADER = /^(\s*)(if|elif|while|for)\b(.*?):\s*(#.*)?$/;
const indentOf = (s) => s.match(/^\s*/)[0].length;
const isCode = (s) => s.trim() !== '' && !s.trim().startsWith('#');

function headerOf(lines, ln) {
  const m = HEADER.exec(lines[ln - 1] || '');
  if (!m) return null;
  const ind = m[1].length;
  let end = lines.length + 1;
  for (let k = ln + 1; k <= lines.length; k++) {
    if (isCode(lines[k - 1]) && indentOf(lines[k - 1]) <= ind) { end = k; break; }
  }
  const kw = m[2];
  let cond = m[3].trim(), loopVar = null;
  if (kw === 'for') { const fm = /^(\w+)\s+in\s+/.exec(cond); loopVar = fm ? fm[1] : null; }
  return { kw, cond, bodyStart: ln + 1, bodyEnd: end, loopVar };
}

const varMap = (snap) => {
  const out = new Map();
  for (const v of snap?.frames?.[0]?.locals || []) {
    if (['function', 'module'].includes(v.value.type) || v.value.typeName === 'type') continue;
    out.set(v.name, v.value);
  }
  return out;
};

// One execution: a list of records the UI can rebuild from. rec 0 = start terminal; then one 'line' record per
// statement about to run; then 'done' or 'error'. A line record gets .io (input/print) and .branch once it has run.
function newSession(src, inputs) {
  return { src, lines: src.replace(/\r\n?/g, '\n').split('\n'), inputs: inputs.slice(), hist: [], run: null, cerr: null, segs: [], finished: false };
}

function advance(s) {
  if (s.finished) return false;
  if (!s.hist.length) {
    s.hist.push({ kind: 'start' });
    const c = compile(s.src, { filename: 'main.py' });
    if (!c.ok) s.cerr = c.error;
    else s.run = createRun(c.program, { inputs: s.inputs, echoInput: true, eofWhenExhausted: true, maxSteps: MAX_STEPS, seed: 0, locale: lang() });
    return true;
  }
  if (s.cerr) {
    s.segs.push({ text: s.cerr.traceback + '\n', kind: 'err' });
    s.hist.push({ kind: 'error', error: s.cerr, compile: true });
    s.finished = true;
    return true;
  }
  const cur = s.hist[s.hist.length - 1];
  const io = [];
  for (let guard = 0; guard < 1e6; guard++) {
    const ev = s.run.step();
    if (ev.kind === 'output') {
      s.segs.push({ text: ev.text, kind: ev.echo ? 'in' : ev.stderr ? 'err' : 'out' });
      if (!ev.echo) io.push({ t: 'out', text: ev.text });
      continue;
    }
    if (ev.kind === 'input') {
      const last = io[io.length - 1];
      if (ev.prompt && last && last.t === 'out' && last.text === ev.prompt) io.pop();
      io.push({ t: 'in', text: ev.value == null ? '' : String(ev.value) });
      continue;
    }
    if (ev.kind === 'line' || ev.kind === 'done' || ev.kind === 'exception') {
      if (cur.kind === 'line') cur.io = io;
      if (ev.kind === 'line') {
        const rec = { kind: 'line', line: ev.line, snap: s.run.snapshot() };
        if (cur.kind === 'line' && cur.hdr) cur.branch = ev.line >= cur.hdr.bodyStart && ev.line < cur.hdr.bodyEnd ? 'yes' : 'no';
        rec.hdr = headerOf(s.lines, ev.line);
        s.hist.push(rec);
        return true;
      }
      if (ev.kind === 'done') {
        if (cur.kind === 'line' && cur.hdr) cur.branch = 'no';
        s.hist.push({ kind: 'done', snap: s.run.snapshot() });
      } else {
        // a traceback follows the output straight away, as in python3; the simulator's step-limit note starts on a
        // line of its own
        const lastSeg = s.segs[s.segs.length - 1];
        if (isLimit(ev.error) && lastSeg && !lastSeg.text.endsWith('\n')) s.segs.push({ text: '\n', kind: 'out' });
        s.segs.push({ text: (ev.error.traceback || `${ev.error.type}: ${ev.error.message}`) + '\n', kind: 'err' });
        s.hist.push({ kind: 'error', error: ev.error, snap: s.run.snapshot() });
      }
      s.finished = true;
      return true;
    }
    if (s.run.status === 'waiting-input' || s.run.status === 'done' || s.run.status === 'error') break;
  }
  s.finished = true;
  s.hist.push({ kind: 'error', error: { type: 'RuntimeError', message: 'stopped', line: null, traceback: 'RuntimeError: stopped' } });
  return true;
}

const printed = (s) => s.hist.flatMap((r) => (r.io || []).filter((x) => x.t === 'out').map((x) => x.text)).join('');
// Long outputs (an edited program can print thousands of lines) are shortened in one-line summaries and lab rows.
const clip = (s, n) => (s.length > n ? s.slice(0, n - 1) + '…' : s);
// minipy's own guard against endless loops; real Python would simply keep running, so it is not a Python error.
const isLimit = (e) => !!e && e.simulatorLimit === true;
// "after 20000 steps", or the budget of loop rounds inside one step (sum(...) over an endless generator)
const limitWhat = (e) => (e?.limitKind === 'iterations'
  ? T(`${e.limit} loop rounds inside one step`, `${e.limit} putaran di dalam satu langkah`)
  : T(`${e?.limit ?? MAX_STEPS} steps`, `${e?.limit ?? MAX_STEPS} langkah`));
// Same behaviour as the original program: same printed text and, if it crashed, the same error.
const sameAs = (exp, out, err) => !!exp && out === exp.out
  && (err ? !!exp.err && exp.err.type === err.type && exp.err.message === err.message : !exp.err);

function runFull(src, inputs) {
  const s = newSession(src, inputs);
  let guard = 0;
  while (advance(s) && guard++ < MAX_STEPS + 10);
  return s;
}

// ---------------------------------------------------------------------------------------------------------------
// Styles (prefix ptp-). The code panels and the flowchart are always dark (house style for canvases); the cards
// and tables follow the site theme.
// ---------------------------------------------------------------------------------------------------------------
const CSS = `
.ptp{padding:12px;display:grid;gap:12px;min-width:0}
.ptp-nav{display:flex;flex-wrap:wrap;gap:5px;align-items:center}
.ptp-logo{flex:none;fill:none;stroke:var(--accent,var(--color-accent));stroke-width:1.6;stroke-linejoin:round}
.ptp-chip{display:inline-flex;align-items:center;gap:5px;min-height:36px;padding:3px 9px 3px 4px;border-radius:999px;border:1px solid var(--color-border);background:var(--color-surface-2);color:var(--color-fg);font:inherit;font-size:var(--type-sm);cursor:pointer;line-height:1.2}
.ptp-chip .ptp-n{display:inline-grid;place-items:center;width:22px;height:22px;border-radius:50%;background:var(--color-surface);border:1px solid var(--color-border);font-weight:700;font-size:12px}
.ptp-chip[aria-current="step"]{border-color:var(--accent,var(--color-accent));background:color-mix(in srgb,var(--accent,var(--color-accent)) 16%,var(--color-surface));font-weight:600}
.ptp-chip[aria-current="step"] .ptp-n{background:var(--accent,var(--color-accent));border-color:var(--accent,var(--color-accent));color:#fff}
.ptp-chip.is-veiled{border-style:dashed;color:var(--color-muted)}
.ptp-chip:focus-visible,.ptp-link:focus-visible,.ptp-tbtn:focus-visible{outline:3px solid color-mix(in srgb,var(--accent,var(--color-accent)) 65%,transparent);outline-offset:2px}
.ptp-next{margin-left:auto}
.ptp-next[hidden]{display:none}
.ptp-plan{display:grid;gap:12px;grid-template-columns:minmax(0,1fr)}
.ptp--wide .ptp-plan{grid-template-columns:repeat(3,minmax(0,1fr))}
.ptp-card{background:var(--color-surface);border:1px solid var(--color-border);border-radius:10px;padding:10px 12px;min-width:0;font-size:var(--type-sm);line-height:1.45;scroll-margin:16px}
.ptp--wide .ptp-card.is-tab{box-shadow:0 0 0 2px color-mix(in srgb,var(--accent,var(--color-accent)) 55%,transparent)}
.ptp-card:focus{outline:none}
.ptp-card:focus-visible{outline:3px solid color-mix(in srgb,var(--accent,var(--color-accent)) 65%,transparent);outline-offset:2px}
.ptp-h{display:flex;align-items:center;gap:8px;margin:0 0 8px;font-size:var(--type-sm);font-weight:700;line-height:1.3}
.ptp-h .ptp-n{display:inline-grid;place-items:center;flex:none;width:22px;height:22px;border-radius:50%;background:var(--accent,var(--color-accent));color:#fff;font-size:12px}
.ptp-h small{font-weight:400;color:var(--color-muted)}
.ptp-card p{margin:0 0 6px}
.ptp-kv{display:grid;gap:2px}
.ptp-kv b{font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:var(--color-muted)}
.ptp-kv ul{margin:0 0 4px;padding-left:18px}
.ptp-note{color:var(--color-fg);border-left:3px solid var(--color-warn);padding:2px 0 2px 8px;margin-top:6px!important}
.ptp-src{color:var(--color-muted);font-size:12px;margin-top:6px!important}
.ptp-ipo{width:100%;border-collapse:collapse}
.ptp-ipo th,.ptp-ipo td{border-top:1px solid var(--color-border);padding:6px 4px;vertical-align:top;text-align:left}
.ptp-ipo tr:first-child th,.ptp-ipo tr:first-child td{border-top:0}
.ptp-ipo th{width:5.6em}
.ptp-link{font:inherit;color:inherit;text-align:left;background:none;border:1px solid transparent;border-radius:6px;padding:2px 5px;margin:-2px -5px;cursor:pointer;line-height:inherit}
.ptp-link:hover{background:var(--color-surface-2)}
.ptp-link.is-match{background:rgba(96,165,250,.20);border-color:#60a5fa}
.ptp-link.is-cur{background:rgba(251,191,36,.24);border-color:#d97706}
.ptp-ipo .ptp-link{font-weight:700}
.ptp-desc{display:grid;gap:3px}
.ptp-mono{font-family:var(--font-mono);font-size:12.5px;overflow-wrap:anywhere}
.ptp-cmt{color:var(--color-muted);font-style:italic}
.ptp-desc ol{margin:2px 0 0;padding:0;list-style:none;display:grid;gap:3px}
.ptp-desc ol .ptp-link{display:grid;grid-template-columns:1.5em minmax(0,1fr);width:calc(100% + 10px)}
.ptp-desc ol .ptp-link>span:first-child{color:var(--color-muted)}
.ptp-live{display:grid;gap:8px;padding:8px 10px;border-radius:10px;background:var(--color-surface-2);border:1px solid var(--color-border)}
.ptp-runbar{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.ptp-runbar .btn{min-height:36px}
.ptp--narrow .ptp-runbar .btn{padding:8px 11px}
.ptp-sync{font-size:var(--type-sm);line-height:1.45;min-height:2.9em}
.ptp-sync b{font-weight:600}
.ptp-sync .ptp-vars{font-family:var(--font-mono);font-size:12.5px;color:var(--color-muted);overflow-wrap:anywhere}
.ptp-run{display:grid;gap:12px;grid-template-columns:minmax(0,1fr)}
.ptp--wide .ptp-run{grid-template-columns:minmax(0,1.22fr) minmax(0,1fr);grid-template-rows:auto auto 1fr}
.ptp--wide .ptp-c4{grid-column:1;grid-row:1}
.ptp--wide .ptp-c5{grid-column:2;grid-row:1/span 3}
.ptp--wide .ptp-c6{grid-column:1;grid-row:2}
.ptp--wide .ptp-con{grid-column:1;grid-row:3;align-self:start}
.ptp-con{min-width:0}
.ptp-fc{display:block;width:100%;height:auto;margin:0 auto;border-radius:8px;background:#0b1220}
.ptp-fc text{font:15px system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;fill:#e2e8f0;pointer-events:none}
.ptp-fc .ptp-node{cursor:pointer;outline:none}
.ptp-fc .ptp-shape{fill:#131c31;stroke:#64748b;stroke-width:2;transition:fill .2s,stroke .2s}
.ptp-fc .ptp-node:hover .ptp-shape{stroke:#cbd5e1}
.ptp-fc .ptp-node:focus-visible .ptp-ring{stroke:#f8fafc;stroke-width:2.5;stroke-dasharray:5 4;fill:none}
.ptp-fc .ptp-ring{fill:none;stroke:none}
.ptp-fc .is-visited .ptp-shape{fill:#1b2740;stroke:#94a3b8}
.ptp-fc .is-match .ptp-shape{fill:rgba(96,165,250,.22);stroke:#60a5fa;stroke-width:2.5}
.ptp-fc .is-cur .ptp-shape{fill:rgba(251,191,36,.22);stroke:#fbbf24;stroke-width:3.5}
.ptp-fc .is-err .ptp-shape{fill:rgba(248,113,113,.22);stroke:#f87171;stroke-width:3.5}
.ptp-fc .ptp-edge path{fill:none;stroke:#475569;stroke-width:2;transition:stroke .2s}
.ptp-fc .ptp-edge.is-taken path{stroke:#cbd5e1;stroke-width:2.6}
.ptp-fc .ptp-edge.is-cur path{stroke:#fbbf24;stroke-width:3.4}
.ptp-fc .ptp-lbl rect{fill:#0b1220;stroke:#475569;stroke-width:1}
.ptp-fc .ptp-lbl text{font-size:12.5px;font-weight:600;fill:#cbd5e1}
.ptp-fc .ptp-lbl.is-taken rect{fill:#334155;stroke:#cbd5e1}
.ptp-fc .ptp-lbl.is-cur rect{fill:#fbbf24;stroke:#fbbf24}
.ptp-fc .ptp-lbl.is-cur text{fill:#1f1300}
.ptp-fc .ptp-token{fill:#fbbf24;stroke:#0b1220;stroke-width:2;pointer-events:none}
.ptp-legend{display:flex;flex-wrap:wrap;gap:4px 12px;margin-top:6px;font-size:12px;color:var(--color-muted)}
.ptp-legend i{display:inline-block;width:12px;height:12px;border-radius:3px;margin-right:4px;vertical-align:-2px;border:2px solid}
.ptp-scroll{overflow:auto;max-height:340px;border:1px solid var(--color-border);border-radius:8px}
.ptp-scroll:focus-visible{outline:3px solid color-mix(in srgb,var(--accent,var(--color-accent)) 65%,transparent);outline-offset:2px}
.ptp-tbl{width:100%;border-collapse:collapse;font-size:13px}
.ptp-tbl th,.ptp-tbl td{padding:4px 8px;border-bottom:1px solid var(--color-border);text-align:left;vertical-align:top;white-space:nowrap}
.ptp-tbl thead th{position:sticky;top:0;background:var(--color-surface-2);font-weight:600;z-index:1}
.ptp-tbl td.v{font-family:var(--font-mono);font-size:12.5px}
.ptp-tbl td.wrap{white-space:pre-wrap;min-width:9em}
.ptp-tbl td.wrap2{white-space:normal;min-width:10em;max-width:16em}
.ptp-tbl td.chg{background:color-mix(in srgb,#f59e0b 24%,transparent);font-weight:600}
.ptp-tbl td.dim,.ptp-tbl span.dim{color:var(--color-muted)}
.ptp-tbl .ok{color:var(--color-ok);font-weight:700}
.ptp-tbl .bad{color:var(--color-danger);font-weight:700}
.ptp-tbl tr.is-sel td{background:color-mix(in srgb,var(--accent,var(--color-accent)) 10%,transparent)}
.ptp-tbtn{font:inherit;font-family:var(--font-mono);font-size:12.5px;padding:2px 8px;border-radius:6px;border:1px solid var(--color-border);background:var(--color-surface-2);color:var(--color-fg);cursor:pointer;white-space:nowrap}
.ptp-sub{margin:10px 0 6px;font-size:var(--type-sm);font-weight:700}
.ptp-sub small{font-weight:400;color:var(--color-muted)}
.ptp-hint{color:var(--color-muted);font-size:12px;margin:6px 0 0}
.ptp-veil{display:none;padding:10px;border:1px dashed var(--color-border);border-radius:8px;color:var(--color-muted)}
.ptp-veil p{margin:0 0 8px}
.ptp-card.is-veiled>.ptp-body{display:none}
.ptp-card.is-veiled>.ptp-veil{display:block}
.ptp--narrow .ptp-live{order:-1}
.ptp--narrow .ptp-nav{order:-2}
.ptp--narrow .ptp-card[data-stage]:not(.is-tab){display:none}
.ptp--narrow:not(.show-con) .ptp-con{display:none}
.ptp--narrow .ptp-plan:not(.has-tab){display:none}
.ptp--narrow .ptp-run:not(.has-tab){display:none}
.ptp-ctl-group{display:grid;gap:6px}
.ptp-ctl-label{font-size:var(--type-sm);color:var(--color-muted)}
.ptp-tests{display:flex;flex-wrap:wrap;gap:6px}
.ptp-tests .btn{min-height:36px;font-family:var(--font-mono);font-size:13px}
.ptp-tests .btn[aria-pressed="true"]{border-color:var(--accent,var(--color-accent));background:color-mix(in srgb,var(--accent,var(--color-accent)) 16%,var(--color-surface))}
.ptp-tests .btn small{font-family:var(--font-sans);color:var(--color-muted);margin-left:4px}
.ptp-inrow{display:grid;grid-template-columns:auto minmax(0,1fr);gap:6px 8px;align-items:center}
.ptp-inrow label{font-family:var(--font-mono);font-size:13px}
.ptp-inrow input{font:inherit;font-family:var(--font-mono);font-size:16px;padding:6px 8px;border-radius:8px;border:1px solid var(--color-border);background:var(--color-surface);color:var(--color-fg);min-width:0;width:100%}
.ptp-inrow input:focus-visible{outline:3px solid color-mix(in srgb,var(--accent,var(--color-accent)) 65%,transparent);outline-offset:1px}
.ptp-msg{font-size:var(--type-sm);line-height:1.45;padding:8px 10px;border-radius:8px;background:var(--color-surface-2);border:1px solid var(--color-border)}
.ptp-msg:empty{display:none}
.ptp-msg.warn{border-color:var(--color-warn)}
.ptp-msg.ok{border-color:var(--color-ok)}
.ptp-msg.bad{border-color:var(--color-danger)}
@media (max-width:480px){.ptp{padding:10px 8px}.ptp-card{padding:9px 10px}}
`;

function injectStyles() {
  if (document.getElementById('ptp-styles')) return;
  const st = document.createElement('style');
  st.id = 'ptp-styles';
  st.textContent = CSS;
  document.head.appendChild(st);
}

// ---------------------------------------------------------------------------------------------------------------
export function mount(rootEl) {
  injectStyles();
  const uid = 'ptp' + Math.random().toString(36).slice(2, 8);
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  // ---------------- state ----------------
  let preset = PRESETS.find((p) => p.key === DEFAULT_PRESET);
  let unitByPy = new Map(), unitByPs = new Map(), unitById = new Map();
  let nodes = new Map();
  let refLines = 0;            // line count of the original Python (mapping is valid while the count matches)
  let codeState = 'original';  // 'original' | 'mistake' | 'edited'
  let sess = null;             // interactive session
  let playing = false, acc = 0, speed = 2;
  let sel = null;              // explore selection: { ids: Set(unit ids), from }
  let tab = 1, revealed = 7, guided = false, wide = true;
  let testIdx = 0;             // selected test case (-1 = custom)
  let testResults = [];        // per test: { out, err, path, ok } of the last "test all" / single run
  let lastResult = null;       // for the lab
  let token = null;

  // ---------------- DOM skeleton ----------------
  const board = document.createElement('div');
  board.className = 'ptp ptp--wide';
  rootEl.appendChild(board);
  const ctrl = document.createElement('div');
  ctrl.className = 'sim-controls';
  ctrl.style.alignContent = 'start';   // the pane is as tall as the board; keep the controls packed at the top
  rootEl.appendChild(ctrl);

  const nav = document.createElement('nav');
  nav.className = 'ptp-nav';
  nav.setAttribute('aria-label', T('Translation stages', 'Tahap translasi'));
  // a small decorative "route" icon: problem box → diamond → parallelogram (always visible, also in tab mode)
  nav.insertAdjacentHTML('afterbegin', `<svg class="ptp-logo" viewBox="0 0 44 20" width="35" height="16" aria-hidden="true" focusable="false">
    <rect x="1" y="5" width="10" height="10" rx="2"/><path d="M11 10h4"/><path d="M21 4l6 6-6 6-6-6z"/><path d="M27 10h4"/><path d="M33 5h10l-2 10H31z"/></svg>`);
  const chips = new Map();
  for (const st of STAGES) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'ptp-chip';
    b.innerHTML = `<span class="ptp-n" aria-hidden="true">${st.n}</span><span>${esc(L(st.name))}</span>`;
    b.setAttribute('aria-label', `${T('Stage', 'Tahap')} ${st.n}: ${L(st.name)}`);
    b.addEventListener('click', () => goStage(st.n, true));
    chips.set(st.n, b);
    nav.appendChild(b);
  }
  const nextBtn = document.createElement('button');
  nextBtn.type = 'button';
  nextBtn.className = 'btn ptp-next';
  nextBtn.addEventListener('click', () => goStage(Math.min(7, (guided ? revealed : tab) + 1), true));
  nav.appendChild(nextBtn);

  const mkCard = (n, extraClass = '') => {
    const c = document.createElement('section');
    c.className = 'ptp-card ' + extraClass;
    c.dataset.stage = String(n);
    c.tabIndex = -1;
    const h = document.createElement('h3');
    h.className = 'ptp-h';
    h.id = `${uid}-h${n}`;
    c.setAttribute('aria-labelledby', h.id);
    const body = document.createElement('div');
    body.className = 'ptp-body';
    const veil = document.createElement('div');
    veil.className = 'ptp-veil';
    c.append(h, body, veil);
    return { el: c, h, body, veil };
  };

  const plan = document.createElement('div');
  plan.className = 'ptp-plan';
  const cards = new Map();
  for (const n of [1, 2, 3]) { const c = mkCard(n); cards.set(n, c); plan.appendChild(c.el); }

  const live = document.createElement('div');
  live.className = 'ptp-live';
  const runbar = document.createElement('div');
  runbar.className = 'ptp-runbar';
  const mkBtn = (label, primary, fn) => { const b = button({ label, primary, onClick: fn }); return b.el; };
  const bStep = mkBtn(T('Step', 'Langkah'), false, () => { pause(); sel = null; stepOnce(); });
  const bRun = mkBtn(T('Run', 'Jalankan'), true, () => { sel = null; togglePlay(); });
  const bBack = mkBtn(T('Back', 'Mundur'), false, () => { pause(); sel = null; stepBack(); });
  const bReset = mkBtn(T('Reset', 'Ulang'), false, () => { pause(); sel = null; resetRun(); render(); });
  runbar.append(bStep, bRun, bBack, bReset);
  const sync = document.createElement('div');
  sync.className = 'ptp-sync';
  sync.setAttribute('role', 'status');
  sync.setAttribute('aria-live', 'polite');
  live.append(runbar, sync);

  const runArea = document.createElement('div');
  runArea.className = 'ptp-run';
  for (const n of [4, 5, 6]) { const c = mkCard(n, 'ptp-c' + n); cards.set(n, c); runArea.appendChild(c.el); }
  const conWrap = document.createElement('div');
  conWrap.className = 'ptp-con';
  runArea.appendChild(conWrap);

  const traceCard = mkCard(7);
  cards.set(7, traceCard);

  board.append(nav, plan, live, runArea, traceCard.el);

  // code panels
  const psPanel = codePanel({ value: '', language: 'pseudo', editable: false, minLines: 7, maxLines: 16,
    ariaLabel: T('Pseudocode', 'Pseudocode'), onGutterClick: (ln) => exploreBy('ps', ln) });
  const pyPanel = codePanel({ value: '', language: 'python', editable: true, minLines: 6, maxLines: 14, title: 'main.py',
    ariaLabel: T('Python program (editable)', 'Program Python (bisa diedit)'), onChange: onEdit, onGutterClick: (ln) => exploreBy('py', ln) });
  const out = consolePanel({ minLines: 3, maxLines: 9, title: T('Output', 'Keluaran'), ariaLabel: T('Program output', 'Keluaran program'),
    placeholder: T('Press Step or Run: the output appears here.', 'Tekan Langkah atau Jalankan: keluaran muncul di sini.') });
  conWrap.appendChild(out.el);
  // moving the caret in the Python editor shows the same step in the other notations (keyboard-friendly explore)
  let caretLine = null;
  const onCaret = () => {
    if (document.activeElement !== pyPanel.textarea) return;
    const ln = pyPanel.cursorLine;
    if (ln && ln !== caretLine) { caretLine = ln; if (unitByPy.has(ln) && mappingOn()) exploreBy('py', ln, true); }
  };
  pyPanel.textarea?.addEventListener('keyup', onCaret);
  pyPanel.textarea?.addEventListener('mouseup', onCaret);
  pyPanel.textarea?.addEventListener('blur', () => { caretLine = null; });

  // flowchart host
  const fcHost = document.createElement('div');

  // ---------------- controls ----------------
  const presetSel = select({
    label: T('Problem', 'Masalah'), key: 'preset', value: preset.key,
    options: PRESETS.map((p) => ({ value: p.key, label: L(p.name) })),
    onChange: (v) => { const p = PRESETS.find((q) => q.key === v); if (p) loadPreset(p); },
  });
  ctrl.appendChild(presetSel.el);

  const testGroup = document.createElement('div');
  testGroup.className = 'ptp-ctl-group';
  testGroup.setAttribute('role', 'group');
  testGroup.setAttribute('aria-label', T('Test data', 'Data uji'));
  const testLbl = document.createElement('div');
  testLbl.className = 'ptp-ctl-label';
  testLbl.textContent = T('Test data (pick one, or type your own values)', 'Data uji (pilih satu, atau ketik nilai sendiri)');
  const testBtns = document.createElement('div');
  testBtns.className = 'ptp-tests';
  const inRows = document.createElement('div');
  inRows.className = 'ptp-inrow';
  testGroup.append(testLbl, testBtns, inRows);
  ctrl.appendChild(testGroup);
  let inFields = [];

  const speedSl = slider({ label: T('Run speed (steps per second)', 'Kecepatan (langkah per detik)'), key: 'speed', min: 1, max: 10, step: 1, value: speed, onInput: (v) => { speed = v; } });
  ctrl.appendChild(speedSl.el);

  const bTestAll = button({ label: T('Test all data', 'Uji semua data'), primary: true, onClick: () => testAll() });
  ctrl.appendChild(row(bTestAll));

  const bMistake = button({ label: T('Insert a common mistake', 'Sisipkan kesalahan umum'), onClick: () => setCode('mistake') });
  const bOrig = button({ label: T('Restore original code', 'Pulihkan kode asli'), onClick: () => setCode('original') });
  ctrl.appendChild(row(bMistake, bOrig));

  const guidedTg = toggle({ label: T('Reveal the stages one at a time', 'Buka tahap satu per satu'), key: 'guided', value: false,
    onChange: (on) => { guided = on; revealed = on ? 1 : 7; if (on) tab = 1; applyLayout(); } });
  ctrl.appendChild(guidedTg.el);

  const msg = document.createElement('div');
  msg.className = 'ptp-msg';
  msg.setAttribute('role', 'status');
  msg.setAttribute('aria-live', 'polite');
  ctrl.appendChild(msg);
  const setMsg = (text, kind = '') => { msg.textContent = text || ''; msg.className = 'ptp-msg' + (kind ? ' ' + kind : ''); };

  const lab = labPanel({
    title: 'Problem-to-program lab',
    filename: 'problem-to-program-data.csv',
    columns: [
      { key: 'preset', label: 'Problem' },
      { key: 'code', label: 'Code' },
      { key: 'input', label: 'Input' },
      { key: 'output', label: 'Output' },
      { key: 'branch', label: 'Branch taken' },
      { key: 'steps', label: 'Steps' },
      { key: 'expected', label: 'As expected' },
    ],
    procedure: [
      'Pick a problem and read stages 1-3 (problem, IPO, descriptive steps).',
      'Click symbols in the flowchart to see the matching pseudocode and Python lines.',
      'Run each test value, including the boundary case, and record each run.',
      'Insert the common mistake, run the tests again and record which test catches it.',
    ],
    predict: 'Before running: which test value is the boundary case, and which branch should it take?',
    source: () => lastResult,
  });
  ctrl.appendChild(lab.el);

  // ---------------- layout (wide board vs. tabs) ----------------
  // Switching layouts changes the board's height, so do it in the next frame, not inside the observer callback
  // (that would re-trigger the observer in the same frame: "ResizeObserver loop completed…").
  let roRaf = 0;
  const checkWidth = () => {
    roRaf = 0;
    const w = board.clientWidth;
    if (!w) return;
    const nowWide = w >= 720;
    if (nowWide !== wide) { wide = nowWide; applyLayout(); }
  };
  const ro = new ResizeObserver(() => { if (!roRaf) roRaf = requestAnimationFrame(checkWidth); });
  ro.observe(board);

  function applyLayout() {
    board.classList.toggle('ptp--wide', wide);
    board.classList.toggle('ptp--narrow', !wide);
    board.classList.toggle('show-con', tab >= 4 && tab <= 6);
    plan.classList.toggle('has-tab', tab <= 3);
    runArea.classList.toggle('has-tab', tab >= 4 && tab <= 6);
    for (const [n, c] of cards) {
      c.el.classList.toggle('is-tab', n === tab);
      c.el.classList.toggle('is-veiled', n > revealed);
    }
    for (const [n, b] of chips) {
      if (n === tab) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
      b.classList.toggle('is-veiled', n > revealed);
    }
    if (guided && revealed < 7) { nextBtn.hidden = false; nextBtn.textContent = T('Reveal next stage', 'Buka tahap berikutnya') + ' ▸'; }
    else if (!wide && tab < 7) { nextBtn.hidden = false; nextBtn.textContent = T('Next stage', 'Tahap berikutnya') + ' ▸'; }
    else nextBtn.hidden = true;
  }

  function goStage(n, focus) {
    if (guided && n > revealed) revealed = n;
    tab = n;
    applyLayout();
    if (focus && wide) {
      const el = cards.get(n).el;
      el.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  }

  function veilFor(n) {
    const v = cards.get(n).veil;
    v.innerHTML = '';
    const p = document.createElement('p');
    p.textContent = `${T('Hidden for now. Think first:', 'Disembunyikan dulu. Pikirkan dulu:')} ${L(THINK[n])}`;
    const b = button({ label: `${T('Reveal stage', 'Buka tahap')} ${n}`, onClick: () => { revealed = Math.max(revealed, n); tab = n; applyLayout(); cards.get(n).el.focus({ preventScroll: true }); } });
    v.append(p, b.el);
  }

  // ---------------- building the stages for a preset ----------------
  function stageTitle(n, sub) {
    const c = cards.get(n);
    c.h.innerHTML = `<span class="ptp-n" aria-hidden="true">${n}</span><span>${esc(L(STAGES[n - 1].name))}</span>${sub ? ` <small>${esc(sub)}</small>` : ''}`;
  }

  function buildPlan() {
    const p = preset;
    // 1 problem
    stageTitle(1, T('understand it', 'pahami'));
    const b1 = cards.get(1).body;
    b1.innerHTML = `<p>${esc(L(p.problem))}</p>
      <div class="ptp-kv"><b>${T('Known (input)', 'Diketahui (input)')}</b><ul>${L(p.known).map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
      <b>${T('Asked (output)', 'Ditanya (output)')}</b><ul>${L(p.asked).map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
      ${p.note ? `<p class="ptp-note">${esc(L(p.note))}</p>` : ''}
      <p class="ptp-src">${esc(L(p.source))}</p>`;
    // 2 IPO
    stageTitle(2, T('input, process, output', 'input, proses, output'));
    const b2 = cards.get(2).body;
    const names = { i: 'Input', p: T('Process', 'Proses'), o: 'Output' };
    b2.innerHTML = `<table class="ptp-ipo"><tbody>${['i', 'p', 'o'].map((k) =>
      `<tr><th scope="row"><button type="button" class="ptp-link" data-ipo="${k}">${names[k]}</button></th><td>${esc(L(p.ipo[k]))}</td></tr>`).join('')}</tbody></table>
      <p class="ptp-hint">${T('Click Input, Process or Output to see where it ends up in every notation.', 'Klik Input, Proses, atau Output untuk melihat letaknya di setiap notasi.')}</p>`;
    b2.querySelectorAll('[data-ipo]').forEach((b) => b.addEventListener('click', () => exploreBy('ipo', b.dataset.ipo)));
    // 3 descriptive
    stageTitle(3, T('steps in plain words', 'langkah dalam kalimat'));
    const b3 = cards.get(3).body;
    b3.innerHTML = `<div class="ptp-desc"><div class="ptp-mono">${esc(L(p.desc.title))}</div>
      <div class="ptp-mono ptp-cmt">${esc(L(p.desc.comment))}</div>
      <div class="ptp-mono">${esc(L(p.desc.decl))}</div>
      <div class="ptp-mono">${T('Description:', 'Deskripsi:')}</div>
      <ol>${L(p.desc.steps).map((s, i) => `<li><button type="button" class="ptp-link" data-d="${i + 1}"><span>${i + 1}.</span><span>${esc(s)}</span></button></li>`).join('')}</ol></div>`;
    b3.querySelectorAll('[data-d]').forEach((b) => b.addEventListener('click', () => exploreBy('d', Number(b.dataset.d))));
  }

  function buildRunStages() {
    const p = preset;
    stageTitle(4, T('code-like notation', 'notasi mirip kode'));
    const b4 = cards.get(4).body;
    if (!b4.contains(psPanel.el)) b4.appendChild(psPanel.el);
    psPanel.value = L(p.pseudo);
    stageTitle(5, T('standard symbols', 'simbol baku'));
    const b5 = cards.get(5).body;
    if (!b5.contains(fcHost)) b5.appendChild(fcHost);
    buildChart();
    stageTitle(6, T('runs in the browser; you may edit it', 'berjalan di browser; boleh diedit'));
    const b6 = cards.get(6).body;
    if (!b6.contains(pyPanel.el)) b6.appendChild(pyPanel.el);
    pyPanel.value = srcOf(p.py);
    stageTitle(7, T('test data and step-by-step values', 'data uji dan nilai langkah demi langkah'));
    for (const n of [2, 3, 4, 5, 6, 7]) veilFor(n);
  }

  function buildChart() {
    const ch = preset.chart;
    nodes = new Map(ch.nodes.map((n) => [n.id, n]));
    const mk = (id, color) => `<marker id="${uid}-${id}" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${color}"/></marker>`;
    let svg = `<svg class="ptp-fc" viewBox="0 0 ${ch.w} ${ch.h}" style="max-width:${Math.round(ch.w * 1.18)}px" role="group" aria-label="${esc(T('Flowchart. Each symbol is a button that shows the matching lines.', 'Flowchart. Setiap simbol adalah tombol yang menunjukkan baris yang cocok.'))}">
      <defs>${mk('a0', '#475569')}${mk('a1', '#cbd5e1')}${mk('a2', '#fbbf24')}</defs>`;
    svg += '<g class="ptp-edges">';
    ch.edges.forEach((e, i) => {
      const pts = edgePoints(nodes, e);
      svg += `<g class="ptp-edge" data-e="${i}"><path d="${pathD(pts)}" marker-end="url(#${uid}-a0)"/></g>`;
    });
    svg += '</g>';
    ch.edges.forEach((e, i) => {
      if (!e.label) return;
      const pts = edgePoints(nodes, e);
      const [x0, y0] = pts[0], [x1, y1] = pts[1];
      const horiz = Math.abs(y1 - y0) < 1;
      const txt = e.label === 'yes' ? T('Yes', 'Ya') : T('No', 'Tidak');
      const tw = txt.length * 7.6 + 11;
      let cx, cy;
      if (horiz) { cx = x0 + Math.sign(x1 - x0) * Math.max(tw / 2 + 2, Math.min(24, Math.abs(x1 - x0) / 2)); cy = y0 - 13; }
      else { cx = e.ls === 'left' ? x0 - 8 - tw / 2 : x0 + 8 + tw / 2; cy = y0 + 15; }
      svg += `<g class="ptp-lbl" data-l="${i}"><rect x="${(cx - tw / 2).toFixed(1)}" y="${cy - 9}" width="${tw.toFixed(1)}" height="18" rx="9"/><text x="${cx.toFixed(1)}" y="${cy}" text-anchor="middle" dominant-baseline="central">${esc(txt)}</text></g>`;
    });
    for (const n of ch.nodes) {
      const u = unitById.get(n.id);
      const lines = L(n.text).split('\n');
      const { w, h } = geom(n);
      const where = [];
      if (u?.ps?.length) where.push(`${T('pseudocode line', 'baris pseudocode')} ${u.ps[0]}`);
      if (u?.py?.length) where.push(`${T('Python line', 'baris Python')} ${u.py.slice().sort((a, b) => a - b).join(', ')}`);
      const label = `${L(SYMBOL[n.t])}: ${lines.join(' ')}${where.length ? ' (' + where.join('; ') + ')' : ''}`;
      svg += `<g class="ptp-node" data-n="${n.id}" tabindex="0" role="button" aria-label="${esc(label)}"><title>${esc(label)}</title>${shapeSVG(n)}`;
      svg += `<rect class="ptp-ring" x="${n.x - w / 2 - 5}" y="${n.y - h / 2 - 5}" width="${w + 10}" height="${h + 10}" rx="8"/>`;
      const lh = 18, y0 = n.y - ((lines.length - 1) * lh) / 2;
      svg += `<text x="${n.x}" y="${y0}" text-anchor="middle" dominant-baseline="central">${lines.map((s, k) => `<tspan x="${n.x}" ${k ? `dy="${lh}"` : ''}>${esc(s)}</tspan>`).join('')}</text></g>`;
    }
    svg += `<circle class="ptp-token" r="6" cx="-20" cy="-20" opacity="0"/></svg>`;
    fcHost.innerHTML = svg + `<div class="ptp-legend" aria-hidden="true">
      <span><i style="border-color:#fbbf24;background:rgba(251,191,36,.25)"></i>${T('runs next', 'berikutnya')}</span>
      <span><i style="border-color:#94a3b8;background:#1b2740"></i>${T('already run', 'sudah dijalankan')}</span>
      <span><i style="border-color:#60a5fa;background:rgba(96,165,250,.25)"></i>${T('matches your click', 'cocok dengan klikmu')}</span></div>
      <p class="ptp-hint">${T('Click (or Tab to) a symbol to see the same step in the other notations.', 'Klik (atau Tab ke) sebuah simbol untuk melihat langkah yang sama di notasi lain.')}</p>`;
    fcHost.querySelectorAll('.ptp-node').forEach((g) => {
      const act = () => exploreBy('node', g.dataset.n);
      g.addEventListener('click', act);
      g.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); act(); } });
    });
    token = fcHost.querySelector('.ptp-token');
  }

  function buildTestControls() {
    testBtns.innerHTML = '';
    preset.tests.forEach((t, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn';
      b.innerHTML = `${esc(t.v.join(', '))}${t.tag ? `<small>${esc(L(t.tag))}</small>` : ''}`;
      b.setAttribute('aria-pressed', String(i === testIdx));
      b.addEventListener('click', () => pickTest(i));
      testBtns.appendChild(b);
    });
    inRows.innerHTML = '';
    inFields = preset.inputs.map((nm, i) => {
      const id = `${uid}-in${i}`;
      const lab = document.createElement('label');
      lab.htmlFor = id;
      lab.textContent = `${L(nm)} =`;
      const inp = document.createElement('input');
      inp.id = id;
      inp.type = 'text';
      // plain text keyboard: a decimal keypad has no minus sign on many phones (tests use -3 and -40), and
      // input() takes any text, so students may also try "74,9" or "abc"
      inp.autocomplete = 'off';
      inp.spellcheck = false;
      inp.setAttribute('aria-describedby', `${uid}-inhint`);
      inp.addEventListener('input', () => { testIdx = -1; syncTestButtons(); pause(); resetRun(); render(); });
      inRows.append(lab, inp);
      return inp;
    });
    const hint = document.createElement('div');
    hint.id = `${uid}-inhint`;
    hint.className = 'ptp-hint';
    hint.style.gridColumn = '1 / -1';
    hint.style.margin = '0';
    hint.textContent = preset.inputs.length > 1
      ? T('Each value answers one input() call, in order.', 'Setiap nilai menjawab satu panggilan input(), berurutan.')
      : T('This value answers the input() call.', 'Nilai ini menjawab panggilan input().');
    inRows.appendChild(hint);
    fillInputs();
  }

  function fillInputs() {
    const t = preset.tests[testIdx];
    if (t) inFields.forEach((f, i) => { f.value = t.v[i] ?? ''; });
  }
  function syncTestButtons() {
    [...testBtns.children].forEach((b, i) => b.setAttribute('aria-pressed', String(i === testIdx)));
  }
  function pickTest(i) {
    testIdx = i;
    syncTestButtons();
    fillInputs();
    pause();
    resetRun();
    render();
  }
  const currentInputs = () => inFields.map((f) => f.value);

  function loadPreset(p) {
    pause();
    preset = p;
    unitById = new Map(p.units.map((u) => [u.id, u]));
    unitByPy = new Map();
    unitByPs = new Map();
    for (const u of p.units) {
      for (const l of u.py || []) unitByPy.set(l, u);
      for (const l of u.ps || []) unitByPs.set(l, u);
    }
    refLines = codeLines(srcOf(p.py)).length;
    codeState = 'original';
    sel = null;
    testIdx = 0;
    testResults = [];
    lastResult = null;
    if (guided) { revealed = 1; tab = 1; }
    buildPlan();
    buildRunStages();
    buildTestControls();
    resetRun();
    setMsg('');
    applyLayout();
    render();
  }

  // ---------------- code state ----------------
  const codeLines = (src) => src.replace(/\r\n?/g, '\n').replace(/\n$/, '').split('\n');
  const mappingOn = () => codeLines(pyPanel.value).length === refLines;

  function setCode(which) {
    pause();
    pyPanel.value = which === 'mistake' ? srcOf(preset.mistake.py) : srcOf(preset.py);
    codeState = which;
    sel = null;
    testResults = [];
    resetRun();
    setMsg(which === 'mistake' ? L(preset.mistake.note) : T('Original code restored.', 'Kode asli dipulihkan.'), which === 'mistake' ? 'warn' : '');
    render();
  }

  function onEdit() {
    pause();
    const src = pyPanel.value;
    const norm = src.replace(/\n+$/, '');
    codeState = norm === srcOf(preset.py) ? 'original' : norm === srcOf(preset.mistake.py) ? 'mistake' : 'edited';
    sel = null;
    testResults = [];
    resetRun();
    if (!mappingOn()) setMsg(T('You changed the number of lines, so the links to the pseudocode and the flowchart are switched off. Restore the original code to switch them on again.',
      'Jumlah baris berubah, sehingga tautan ke pseudocode dan flowchart dimatikan. Pulihkan kode asli untuk menyalakannya lagi.'), 'warn');
    else if (codeState === 'edited') setMsg(T('Code edited. Run it, or test all data to compare with the expected output.', 'Kode diedit. Jalankan, atau uji semua data untuk membandingkan dengan keluaran yang diharapkan.'));
    else setMsg('');
    render();
  }

  // ---------------- running ----------------
  function resetRun() {
    sess = null;
    stopToken();
  }
  function ensureSession() {
    if (!sess) sess = newSession(pyPanel.value, currentInputs());
    return sess;
  }
  function stepOnce(animate = true) {
    if (sess && sess.finished) return false;
    const s = ensureSession();
    // running shows the Python: on phones switch to its tab; in guided mode unveil it (also on the wide board)
    const toTab = !wide && tab <= 3;
    if (toTab || (guided && revealed < 6)) { if (toTab) tab = 6; if (guided) revealed = Math.max(revealed, 6); applyLayout(); }
    const ok = advance(s);
    if (s.finished) onFinished(s);
    render(animate);
    return ok;
  }
  function stepBack() {
    if (!sess || !sess.hist.length) return;
    const n = sess.hist.length - 1;
    sess = newSession(pyPanel.value, currentInputs());
    while (sess.hist.length < n && advance(sess));
    render(false);
  }
  function togglePlay() {
    if (playing) { pause(); return; }
    if (sess && sess.finished) resetRun();
    playing = true;
    acc = 1; // first step immediately
    anim.start();
    render(false);
  }
  function pause() {
    if (!playing) return;
    playing = false;
    anim.stop();
    renderButtons();
  }
  const anim = loop((dt) => {
    if (!playing) return;
    acc += dt * speed;
    if (acc >= 1) {
      acc = Math.min(acc - 1, 1);
      stepOnce();
      if (sess && sess.finished) pause();
    }
  });

  function pathSummary(s, short = false) {
    const lines = s.lines;
    const order = [], outcomes = new Map();
    for (const r of s.hist) {
      if (r.kind !== 'line' || !r.hdr || !r.branch) continue;
      if (!outcomes.has(r.line)) { outcomes.set(r.line, []); order.push(r.line); }
      outcomes.get(r.line).push(r.branch);
    }
    if (!order.length) return T('none (a sequence)', 'tidak ada (urutan)');
    const Y = T('Yes', 'Ya'), N = T('No', 'Tidak');
    return order.map((ln) => {
      const list = outcomes.get(ln);
      const name = condLabel(ln, lines);
      const ys = list.filter((b) => b === 'yes').length;
      const hdr = headerOf(lines, ln);
      let res;
      if (hdr && (hdr.kw === 'for' || hdr.kw === 'while')) res = `${Y} ×${ys}${list[list.length - 1] === 'no' ? `, ${N}` : ''}`;
      else if (list.length > 4) res = `${Y} ×${ys}, ${N} ×${list.length - ys}`;   // an if inside a loop
      else res = list.map((b) => (b === 'yes' ? Y : N)).join(', ');
      return short ? res : `${name} ${res}`;
    }).join('; ');
  }
  function condLabel(ln, lines) {
    // the flowchart's wording only while the Python line is the original one; after "Insert a common mistake"
    // (score > 75) the label must name the condition that really ran, not the diamond's score ≥ 75
    const orig = codeLines(srcOf(preset.py))[ln - 1];
    const u = mappingOn() && orig != null && orig.trim() === (lines[ln - 1] || '').trim() ? unitByPy.get(ln) : null;
    const n = u && nodes.get(u.id);
    if (n && (n.t === 'dec' || n.t === 'prep')) return L(n.text).replace(/\n/g, ' ') + (n.t === 'prep' ? ':' : '');
    const h = headerOf(lines, ln);
    return h ? `${h.kw} ${h.cond}:` : '';
  }

  function onFinished(s) {
    const outText = clip(printed(s).replace(/\n$/, '').split('\n').join(' / '), 200);
    const end = s.hist[s.hist.length - 1];
    const exp = expectedFor(currentInputs());
    const got = printed(s);
    const err = end.kind === 'error' ? end.error : null;
    lastResult = {
      preset: preset.key,
      code: codeState,
      input: currentInputs().join(', '),
      output: err ? clip(`${err.type}: ${err.message}`, 200) : outText,
      branch: clip(pathSummary(s), 200),
      steps: end.snap?.steps ?? 0,
      expected: exp ? (sameAs(exp, got, err) ? 'yes' : 'no') : '–',
    };
    if (testIdx >= 0) testResults[testIdx] = resultOf(s, exp);
  }

  const expCache = new Map();
  function expectedFor(inputs) {
    const k = lang() + '|' + preset.key + '|' + JSON.stringify(inputs);
    if (!expCache.has(k)) {
      const s = runFull(srcOf(preset.py), inputs);
      const end = s.hist[s.hist.length - 1];
      expCache.set(k, { out: printed(s), err: end.kind === 'error' ? end.error : null, path: pathSummary(s, true) });
    }
    return expCache.get(k);
  }
  function resultOf(s, exp) {
    const end = s.hist[s.hist.length - 1];
    const err = end.kind === 'error' ? end.error : null;
    const out = printed(s);
    return { out, err, path: pathSummary(s, true), ok: sameAs(exp, out, err) };
  }

  function testAll() {
    pause();
    testResults = preset.tests.map((t) => resultOf(runFull(pyPanel.value, t.v), expectedFor(t.v)));
    const pass = testResults.filter((r) => r.ok).length;
    const total = preset.tests.length;
    if (!wide) { tab = 7; if (guided) revealed = 7; applyLayout(); }
    else if (guided) { revealed = 7; applyLayout(); }
    let text = `${T('Tests passed', 'Data uji lolos')}: ${pass} / ${total}. `;
    if (pass === total) text += codeState === 'original'
      ? T('The program gives the expected output for every test value, including the boundary case.', 'Program memberi keluaran yang diharapkan untuk setiap data uji, termasuk kasus batas.')
      : T('Every test passes, so these tests cannot tell this code from the original.', 'Semua data uji lolos, jadi data uji ini tidak bisa membedakan kode ini dari kode asli.');
    else {
      const bad = preset.tests.map((t, i) => (testResults[i].ok ? null : t.v.join(', '))).filter(Boolean);
      text += `${T('Failing test data', 'Data uji yang gagal')}: ${bad.join(' | ')}. ${T('See the trace table (stage 7).', 'Lihat trace table (tahap 7).')}`;
    }
    setMsg(text, pass === total ? 'ok' : 'bad');
    render(false);
  }

  // ---------------- explore (click a notation) ----------------
  function exploreBy(kind, key, keep = false) {
    if (kind !== 'ipo' && kind !== 'd' && kind !== 'node' && !mappingOn()) {
      setMsg(T('The links are off because the number of Python lines changed.', 'Tautan mati karena jumlah baris Python berubah.'), 'warn');
      return;
    }
    let ids = [];
    if (kind === 'node') ids = [key];
    else if (kind === 'py') ids = unitByPy.has(key) ? [unitByPy.get(key).id] : [];
    else if (kind === 'ps') ids = unitByPs.has(key) ? [unitByPs.get(key).id] : [];
    else if (kind === 'd') ids = preset.units.filter((u) => u.d === key).map((u) => u.id);
    else if (kind === 'ipo') ids = preset.units.filter((u) => u.ipo === key).map((u) => u.id);
    const same = sel && sel.kind === kind && sel.key === key;
    sel = !ids.length || (same && !keep) ? null : { ids: new Set(ids), kind, key };
    render(false);
  }

  // ---------------- rendering ----------------
  const fmtVal = (v) => (v ? v.repr : '');
  function curRec() { return sess && sess.hist.length ? sess.hist[sess.hist.length - 1] : null; }

  function unitForLine(ln) { return mappingOn() ? unitByPy.get(ln) || null : null; }

  function transitions() {
    // node ids visited, edges taken (indices), current edge index, current node id, error node id
    const res = { visited: new Set(), taken: new Set(), cur: null, curEdge: null, err: null, curPs: null, curPy: null, visitedPy: new Set(), visitedPs: new Set(), yesNoCur: null };
    if (!sess || !sess.hist.length) return res;
    const mapOn = mappingOn();   // once per render, not once per history record
    const unitForLine = (ln) => (mapOn ? unitByPy.get(ln) || null : null);
    const edges = preset.chart.edges;
    const findEdge = (a, b, branch) => {
      const cand = edges.map((e, i) => [e, i]).filter(([e]) => e.f === a && e.t === b);
      if (!cand.length) return null;
      const m = cand.find(([e]) => !e.label || e.label === branch) || cand[0];
      return m[1];
    };
    let prevNode = null, prevRec = null;
    const hist = sess.hist;
    hist.forEach((r, idx) => {
      let nodeId = null;
      if (r.kind === 'start') nodeId = 'start';
      else if (r.kind === 'line') { const u = unitForLine(r.line); nodeId = u ? u.id : null; }
      else if (r.kind === 'done') nodeId = mapOn ? 'end' : null;
      else if (r.kind === 'error') nodeId = null;
      if (r.kind === 'line' && idx < hist.length - 1) res.visitedPy.add(r.line);
      if (nodeId && prevNode && nodeId !== prevNode) {
        const ei = findEdge(prevNode, nodeId, prevRec && prevRec.branch);
        if (ei != null) { res.taken.add(ei); if (idx === hist.length - 1) res.curEdge = ei; }
      }
      if (nodeId) {
        if (idx < hist.length - 1) res.visited.add(nodeId);
        if (idx === hist.length - 1) res.cur = nodeId;
        prevNode = nodeId;
      }
      prevRec = r;
    });
    const last = hist[hist.length - 1];
    if (last.kind === 'error' && last.error.line && !last.compile) {
      const u = unitForLine(last.error.line);
      // a step-limit stop is not a Python error: show where the endless loop was, not a red symbol
      if (u) { if (isLimit(last.error)) res.cur = u.id; else { res.err = u.id; res.cur = null; } }
    }
    // a step that stays on the same symbol (two input() lines → one READ) keeps the edge that led there
    if (res.curEdge == null && res.cur && last.kind === 'line') {
      for (let k = hist.length - 2; k >= 0; k--) {
        const r = hist[k];
        const nid = r.kind === 'start' ? 'start' : r.kind === 'line' ? unitForLine(r.line)?.id : null;
        if (nid !== res.cur) {
          if (nid) { const ei = findEdge(nid, res.cur, r.branch); if (ei != null) res.curEdge = ei; }
          break;
        }
      }
    }
    for (const id of res.visited) for (const l of unitById.get(id)?.ps || []) res.visitedPs.add(l);
    return res;
  }

  function render(animate = false) {
    const tr = transitions();
    const last = curRec();
    const mapOn = mappingOn();
    const selIds = sel ? sel.ids : new Set();
    // ---- Python panel
    const pyMarks = [];
    for (const l of tr.visitedPy) pyMarks.push({ line: l, kind: 'visited' });
    if (mapOn) for (const id of selIds) for (const l of unitById.get(id)?.py || []) pyMarks.push({ line: l, kind: 'match' });
    let pyActive = null;
    if (last?.kind === 'line') pyActive = last.line;
    if (last?.kind === 'error' && isLimit(last.error) && last.error.line) pyActive = last.error.line;
    else if (last?.kind === 'error' && last.error.line) {
      const e = last.error;
      const m = { line: e.line, kind: 'error', note: e.type };
      if (last.compile && e.col) { m.col = Math.max(0, e.col - 1); if (e.endCol && (e.endLine == null || e.endLine === e.line) && e.endCol > e.col) m.endCol = e.endCol - 1; }
      pyMarks.push(m);
    }
    pyPanel.setMarks(pyMarks);
    pyPanel.setActiveLine(pyActive, { scroll: true });
    // ---- pseudocode panel
    const psMarks = [];
    if (mapOn) {
      for (const l of tr.visitedPs) psMarks.push({ line: l, kind: 'visited' });
      for (const id of selIds) for (const l of unitById.get(id)?.ps || []) psMarks.push({ line: l, kind: 'match' });
    }
    let psActive = null;
    const curU = tr.cur ? unitById.get(tr.cur) : null;
    if (curU && curU.ps?.length) {
      psActive = curU.ps[0];
      for (const l of curU.ps.slice(1)) psMarks.push({ line: l, kind: 'match' });
    }
    if (tr.err) { const u = unitById.get(tr.err); if (u?.ps?.length) psMarks.push({ line: u.ps[0], kind: 'error', note: last.error.type }); }
    psPanel.setMarks(psMarks);
    psPanel.setActiveLine(psActive, { scroll: true });
    // ---- flowchart
    fcHost.querySelectorAll('.ptp-node').forEach((g) => {
      const id = g.dataset.n;
      g.classList.toggle('is-visited', tr.visited.has(id));
      g.classList.toggle('is-cur', tr.cur === id);
      g.classList.toggle('is-err', tr.err === id);
      g.classList.toggle('is-match', selIds.has(id));
      g.setAttribute('aria-pressed', String(selIds.has(id)));
      if (tr.cur === id) g.setAttribute('aria-current', 'step'); else g.removeAttribute('aria-current');
    });
    const layer = fcHost.querySelector('.ptp-edges');
    const edgeEls = layer ? [...layer.children] : [];
    edgeEls.forEach((g) => {
      const i = Number(g.dataset.e);
      const cur = tr.curEdge === i, taken = tr.taken.has(i);
      g.classList.toggle('is-cur', cur);
      g.classList.toggle('is-taken', taken && !cur);
      g.firstChild.setAttribute('marker-end', `url(#${uid}-${cur ? 'a2' : taken ? 'a1' : 'a0'})`);
    });
    // draw the path taken above the other arrows, the newest arrow on top
    edgeEls.filter((g) => g.classList.contains('is-taken')).forEach((g) => layer.appendChild(g));
    edgeEls.filter((g) => g.classList.contains('is-cur')).forEach((g) => layer.appendChild(g));
    fcHost.querySelectorAll('.ptp-lbl').forEach((g) => {
      const i = Number(g.dataset.l);
      g.classList.toggle('is-cur', tr.curEdge === i);
      g.classList.toggle('is-taken', tr.taken.has(i) && tr.curEdge !== i);
    });
    if (animate && tr.curEdge != null) runToken(tr.curEdge); else if (!animate) stopToken();
    // ---- plan cards (descriptive steps, IPO rows)
    const curD = curU?.d, curIpo = curU?.ipo;
    cards.get(3).body.querySelectorAll('[data-d]').forEach((b) => {
      const d = Number(b.dataset.d);
      b.classList.toggle('is-cur', d === curD);
      b.classList.toggle('is-match', [...selIds].some((id) => unitById.get(id)?.d === d));
      b.setAttribute('aria-pressed', String(sel?.kind === 'd' && sel.key === d));
    });
    cards.get(2).body.querySelectorAll('[data-ipo]').forEach((b) => {
      const k = b.dataset.ipo;
      b.classList.toggle('is-cur', k === curIpo);
      b.classList.toggle('is-match', [...selIds].some((id) => unitById.get(id)?.ipo === k));
      b.setAttribute('aria-pressed', String(sel?.kind === 'ipo' && sel.key === k));
    });
    renderConsole();
    renderSync(tr);
    renderTrace();
    renderButtons();
  }

  function renderConsole() {
    if (!sess || !sess.segs.length) { out.clear(); return; }
    out.set(sess.segs.map((s) => ({ text: s.text, kind: s.kind })));
  }

  function nodeDesc(id) {
    const n = nodes.get(id);
    return n ? `${L(SYMBOL[n.t])} “${L(n.text).replace(/\n/g, ' ')}”` : '';
  }

  function renderSync(tr) {
    const last = curRec();
    const parts = [];
    let vars = '';
    if (sel && !(sess && sess.hist.length && playing)) {
      const ids = [...sel.ids];
      const us = ids.map((id) => unitById.get(id));
      const uniq = (arr) => [...new Set(arr)].sort((a, b) => a - b);
      const ps = uniq(us.flatMap((u) => (u.ps?.length ? [u.ps[0]] : [])));
      const py = mappingOn() ? uniq(us.flatMap((u) => u.py || [])) : [];
      const ds = uniq(us.map((u) => u.d).filter(Boolean));
      const ipo = [...new Set(us.map((u) => u.ipo).filter(Boolean))].map((k) => (k === 'i' ? 'Input' : k === 'o' ? 'Output' : T('Process', 'Proses')));
      const seg = [`${ids.map(nodeDesc).join(', ')}`];
      if (ps.length) seg.push(`${T(ps.length > 1 ? 'pseudocode lines' : 'pseudocode line', 'baris pseudocode')} ${ps.join(', ')}`);
      if (py.length) seg.push(`${T(py.length > 1 ? 'Python lines' : 'Python line', 'baris Python')} ${py.join(', ')}`);
      if (ds.length) seg.push(`${T(ds.length > 1 ? 'descriptive steps' : 'descriptive step', 'langkah deskriptif')} ${ds.join(', ')}`);
      if (ipo.length) seg.push(`IPO: ${ipo.join(', ')}`);
      parts.push(`<b>${T('Same step in every notation', 'Langkah yang sama di setiap notasi')}:</b> ${esc(seg.join(' ↔ '))}`);
    }
    if (!sess || !sess.hist.length) {
      if (!parts.length) parts.push(esc(T('Press Step to walk through the program one statement at a time, or Run to animate it. Click any symbol, step or line number to compare the notations.',
        'Tekan Langkah untuk menelusuri program satu pernyataan demi satu, atau Jalankan untuk animasinya. Klik simbol, langkah, atau nomor baris untuk membandingkan notasi.')));
    } else if (last.kind === 'start') {
      parts.unshift(`<b>${T('Start', 'Mulai')}:</b> ${esc(T('the terminal symbol (START) begins the algorithm. Next: the first Python line.', 'simbol terminal (MULAI) mengawali algoritma. Berikutnya: baris Python pertama.'))}`);
    } else if (last.kind === 'line') {
      const prev = sess.hist[sess.hist.length - 2];
      let lead = '';
      if (prev && prev.kind === 'line' && prev.hdr && prev.branch) {
        const yes = prev.branch === 'yes';
        const lbl = yes ? T('Yes', 'Ya') : T('No', 'Tidak');
        if (prev.hdr.kw === 'for') {
          const v = varMap(last.snap).get(prev.hdr.loopVar);
          lead = yes ? `${T('Loop goes on', 'Perulangan berlanjut')} (${prev.hdr.loopVar} = ${esc(fmtVal(v))}) → ${T('arrow', 'panah')} <b>${lbl}</b>. `
            : `${T('The range is used up', 'range sudah habis')} → ${T('arrow', 'panah')} <b>${lbl}</b>. `;
        } else lead = `<span class="ptp-mono">${esc(prev.hdr.cond)}</span> ${T('is', 'bernilai')} <b>${yes ? 'True' : 'False'}</b> → ${T('arrow', 'panah')} <b>${lbl}</b>. `;
      }
      const u = unitForLine(last.line);
      const step = last.snap.steps;
      let where = `${T('Python line', 'baris Python')} ${last.line}`;
      if (u) {
        if (u.ps?.length) where += ` ↔ ${T('pseudocode line', 'baris pseudocode')} ${u.ps[0]}`;
        where += ` ↔ ${nodeDesc(u.id)}`;
      }
      parts.unshift(`${lead}<b>${T('Step', 'Langkah')} ${step}, ${T('runs next', 'berikutnya')}:</b> ${esc(where)}`);
      vars = [...varMap(last.snap)].map(([k, v]) => `${k} = ${fmtVal(v)}`).join('  ·  ');
    } else if (last.kind === 'done') {
      const outText = printed(sess).replace(/\n$/, '');
      parts.unshift(`<b>${T('Finished (END)', 'Selesai (SELESAI)')}.</b> ${T('Output', 'Keluaran')}: <span class="ptp-mono">${esc(clip(outText.split('\n').join(' / '), 240) || '—')}</span>. ${T('Path', 'Jalur')}: ${esc(clip(pathSummary(sess), 240))}`);
      vars = [...varMap(last.snap)].map(([k, v]) => `${k} = ${fmtVal(v)}`).join('  ·  ');
    } else if (last.kind === 'error') {
      const e = last.error;
      const where = e.line ? `${T('line', 'baris')} ${e.line}` : '';
      if (isLimit(e)) parts.unshift(`<b>${T('Stopped after', 'Dihentikan setelah')} ${esc(limitWhat(e))}</b> (${esc(where)}). ${esc(T(
        'This is not a Python error: the simulator stops a program that runs this long. Real Python would keep going, probably forever, so check the loop: does its condition ever become False?',
        'Ini bukan error Python: simulator menghentikan program yang berjalan selama ini. Python sungguhan akan terus berjalan, mungkin tanpa henti, jadi periksa perulangannya: apakah kondisinya pernah bernilai False?'))}`);
      else parts.unshift(`<b>${esc(e.type)}</b> ${where ? esc(where) + ': ' : ''}<span class="ptp-mono">${esc(e.message)}</span>${/[.?!]$/.test(e.message) ? '' : '.'} ${esc(last.compile
        ? T('Python checks the syntax before running anything, so no line ran. Fix the code and press Step again.', 'Python memeriksa sintaks sebelum menjalankan apa pun, jadi belum ada baris yang berjalan. Perbaiki kode lalu tekan Langkah lagi.')
        : T('The program stopped here (a runtime error). Read the last line of the traceback in the output.', 'Program berhenti di sini (runtime error). Baca baris terakhir traceback di keluaran.'))}`);
      if (last.snap) vars = [...varMap(last.snap)].map(([k, v]) => `${k} = ${fmtVal(v)}`).join('  ·  ');
    }
    sync.innerHTML = `<div>${parts.join('<br>')}</div>${vars ? `<div class="ptp-vars">${esc(vars)}</div>` : ''}`;
  }

  function renderButtons() {
    const fin = !!(sess && sess.finished);
    bStep.disabled = fin;
    bBack.disabled = !sess || !sess.hist.length;
    bReset.disabled = !sess;
    bRun.textContent = playing ? T('Pause', 'Jeda') : fin ? T('Run again', 'Jalankan lagi') : T('Run', 'Jalankan');
    bRun.setAttribute('aria-pressed', String(playing));
    bOrig.el.disabled = codeState === 'original';
    bMistake.el.disabled = codeState === 'mistake';
  }

  function renderTrace() {
    const body = traceCard.body;
    const p = preset;
    const names = L(p.vars);
    // ---- test data table
    let h = `<div class="ptp-sub">${T('Test data', 'Data uji')} <small>${T('(include the boundary case)', '(sertakan kasus batas)')}</small></div>`;
    h += `<div class="ptp-scroll" tabindex="0" role="region" aria-label="${esc(T('Test data table', 'Tabel data uji'))}"><table class="ptp-tbl"><thead><tr>
      <th>${esc(L(p.inputs.length > 1 ? B('Test data', 'Data uji') : p.inputs[0]))}</th><th>${T('OK?', 'Cocok?')}</th><th>${T('Path taken', 'Jalur')}</th><th>${T('Expected output', 'Keluaran diharapkan')}</th><th>${T('Program output', 'Keluaran program')}</th></tr></thead><tbody>`;
    p.tests.forEach((t, i) => {
      const exp = expectedFor(t.v);
      const r = testResults[i];
      const expTxt = exp.err ? `${exp.err.type}` : exp.out.replace(/\n$/, '');
      const got = !r ? '' : isLimit(r.err) ? `${T('stopped after', 'dihentikan setelah')} ${limitWhat(r.err)} ${T('(endless loop?)', '(perulangan tanpa henti?)')}`
        : r.err ? `${r.err.type}: ${r.err.message}` : clip(r.out.replace(/\n$/, ''), 600);
      h += `<tr class="${i === testIdx ? 'is-sel' : ''}"><td><button type="button" class="ptp-tbtn" data-t="${i}" aria-label="${esc(T('Use test data', 'Pakai data uji') + ' ' + t.v.join(', '))}">${esc(t.v.join(', '))}</button>${t.tag ? ` <small>${esc(L(t.tag))}</small>` : ''}</td>
        <td>${r ? (r.ok ? `<span class="ok">✓ ${T('yes', 'ya')}</span>` : `<span class="bad">✗ ${T('no', 'tidak')}</span>`) : '<span class="dim">–</span>'}</td>
        <td>${r ? esc(clip(r.path, 120)) : `<span class="dim">${esc(exp.path)} (${T('expected', 'diharapkan')})</span>`}</td><td class="v wrap">${esc(expTxt)}</td><td class="v wrap">${r ? esc(got) : `<span class="dim">${T('not run yet', 'belum dijalankan')}</span>`}</td></tr>`;
    });
    h += `</tbody></table></div><p class="ptp-hint">${T('"Expected" comes from the original algorithm. Run a test (or Test all data) to fill in the program output.', '"Diharapkan" berasal dari algoritma asli. Jalankan data uji (atau Uji semua data) untuk mengisi keluaran program.')}</p>`;
    // ---- step trace
    h += `<div class="ptp-sub">${T('Step-by-step trace', 'Penelusuran langkah demi langkah')} <small>${esc(sess ? `(${T('input', 'masukan')}: ${sess.inputs.join(', ')})` : '')}</small></div>`;
    const rows = [];
    const extra = [];
    if (sess) {
      const hist = sess.hist;
      // only the shown rows (plus one, to know there are more) are built: a long loop stays cheap to render
      for (let k = 0; k < hist.length && rows.length <= TRACE_ROWS; k++) {
        const r = hist[k];
        if (r.kind !== 'line') continue;
        const next = hist[k + 1];
        if (!next) break;
        const after = next.snap || r.snap;
        rows.push({ r, after, next });
        if (rows.length <= TRACE_ROWS) for (const nm of varMap(after).keys()) if (!names.includes(nm) && !extra.includes(nm)) extra.push(nm);
      }
    }
    const cols = names.concat(extra);
    h += `<div class="ptp-scroll" tabindex="0" role="region" aria-label="${esc(T('Trace table', 'Trace table'))}"><table class="ptp-tbl"><thead><tr><th>#</th><th>Python</th><th>Pseudocode</th>${cols.map((c) => `<th class="v">${esc(c)}</th>`).join('')}<th>${T('Condition', 'Kondisi')}</th><th>${T('Input / output', 'Masukan / keluaran')}</th></tr></thead><tbody>`;
    if (!rows.length) h += `<tr><td colspan="${cols.length + 5}" class="dim">${T('Rows appear here as the program runs: one row per statement, with the value of every variable after it.', 'Baris muncul saat program berjalan: satu baris per pernyataan, dengan nilai setiap variabel sesudahnya.')}</td></tr>`;
    let prevVals = new Map();
    const psLines = L(p.pseudo).split('\n');
    rows.slice(0, TRACE_ROWS).forEach(({ r, after, next }, i) => {
      const vals = varMap(after);
      const u = unitForLine(r.line);
      const ps = u && u.ps?.length ? `${u.ps[0]}: ${psLines[u.ps[0] - 1].trim()}` : '';
      let cond = '';
      if (r.hdr && r.branch) {
        const yes = r.branch === 'yes';
        const lbl = yes ? T('Yes', 'Ya') : T('No', 'Tidak');
        if (r.hdr.kw === 'for') cond = yes ? `${r.hdr.loopVar} = ${fmtVal(vals.get(r.hdr.loopVar))} → ${lbl}` : `${T('range used up', 'range habis')} → ${lbl}`;
        else cond = `${r.hdr.cond} → ${yes ? 'True' : 'False'} (${lbl})`;
      }
      const ioTxt = (r.io || []).map((x) => (x.t === 'in' ? `${T('in', 'masuk')}: ${x.text}` : x.text.replace(/\n$/, ''))).join('\n');
      h += `<tr><td>${i + 1}</td><td class="v">${r.line}</td><td class="v wrap2">${esc(ps)}</td>`;
      for (const c of cols) {
        const v = vals.get(c);
        const pv = prevVals.get(c);
        const changed = v && (!pv || pv.repr !== v.repr || pv.type !== v.type);
        h += `<td class="v${changed ? ' chg' : v ? ' dim' : ''}">${v ? esc(fmtVal(v)) : ''}</td>`;
      }
      h += `<td class="v wrap2">${esc(cond)}</td><td class="v wrap">${esc(ioTxt)}</td></tr>`;
      if (next.kind === 'error') h += `<tr><td></td><td colspan="${cols.length + 4}" class="bad">${esc(next.error.type + ': ' + next.error.message)}</td></tr>`;
      prevVals = vals;
    });
    if (rows.length > TRACE_ROWS) h += `<tr><td colspan="${cols.length + 5}" class="dim">${T(`Only the first ${TRACE_ROWS} steps are shown.`, `Hanya ${TRACE_ROWS} langkah pertama yang ditampilkan.`)}</td></tr>`;
    if (sess && sess.hist.length && sess.hist[sess.hist.length - 1].kind === 'error' && sess.hist[sess.hist.length - 1].compile) {
      h += `<tr><td colspan="${cols.length + 5}" class="bad">${esc(sess.hist[sess.hist.length - 1].error.type + ': ' + sess.hist[sess.hist.length - 1].error.message)}</td></tr>`;
    }
    h += `</tbody></table></div><p class="ptp-hint">${T('Highlighted cells changed in that step. Each row shows the values after its statement ran.', 'Sel yang disorot berubah pada langkah itu. Setiap baris menunjukkan nilai sesudah pernyataannya dijalankan.')}</p>`;
    const sc = body.querySelectorAll('.ptp-scroll');
    const keep = [...sc].map((el) => [el.scrollTop, el.scrollLeft, el.scrollHeight - el.clientHeight - el.scrollTop < 4]);
    body.innerHTML = h;
    const sc2 = body.querySelectorAll('.ptp-scroll');
    sc2.forEach((el, i) => {
      if (!keep[i]) return;
      el.scrollLeft = keep[i][1];
      el.scrollTop = i === 1 && keep[i][2] ? el.scrollHeight : keep[i][0];
    });
    body.querySelectorAll('[data-t]').forEach((b) => b.addEventListener('click', () => pickTest(Number(b.dataset.t))));
  }

  // ---------------- token animation along the newest arrow ----------------
  let tokRaf = 0;
  function stopToken() {
    cancelAnimationFrame(tokRaf);
    tokRaf = 0;
    if (token) token.setAttribute('opacity', '0');
  }
  function runToken(ei) {
    stopToken();
    if (reduceMotion || !token) return;
    const pts = edgePoints(nodes, preset.chart.edges[ei]);
    const segs = [];
    let total = 0;
    for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); segs.push(d); total += d; }
    if (!total) return;
    const dur = Math.min(450, 700 / Math.max(1, speed));
    const t0 = performance.now();
    const frame = (now) => {
      const f = Math.min(1, (now - t0) / dur);
      let dist = f * total, i = 0;
      while (i < segs.length - 1 && dist > segs[i]) { dist -= segs[i]; i++; }
      const a = pts[i], b = pts[i + 1], q = segs[i] ? dist / segs[i] : 0;
      token.setAttribute('cx', (a[0] + (b[0] - a[0]) * q).toFixed(1));
      token.setAttribute('cy', (a[1] + (b[1] - a[1]) * q).toFixed(1));
      token.setAttribute('opacity', f < 1 ? '1' : '0');
      if (f < 1) tokRaf = requestAnimationFrame(frame); else tokRaf = 0;
    };
    tokRaf = requestAnimationFrame(frame);
  }

  // ---------------- start ----------------
  wide = board.clientWidth === 0 ? true : board.clientWidth >= 720;
  loadPreset(preset);

  return () => {
    playing = false;
    anim.stop();
    stopToken();
    ro.disconnect();
    cancelAnimationFrame(roRaf);
    psPanel.destroy();
    pyPanel.destroy();
    out.destroy();
    board.remove();
    ctrl.remove();
  };
}
