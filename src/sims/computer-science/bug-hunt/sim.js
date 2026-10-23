// Bug Hunt / Berburu Bug: the "Berburu Bug" class game of PP 03 (Bab 4 and 8.5). Each level is a short program
// with two or three hidden bugs of mixed kinds (level 2 is worked example 4.3). The student runs the test cases,
// classifies the first problem Python reveals (syntax / runtime / logic), reads the traceback with a helper that
// explains its last line in plain words, fixes the code in the editor and runs the tests again until all pass.
// Programs run in minipy (src/lib/minipy.js), so output, error messages and tracebacks are the ones python3 prints
// (without the ~~~^^^ marks CPython puts under part of a failing line).
import { button, select } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';
import { compile, createRun } from '../../../lib/minipy.js';
import { codePanel, consolePanel, highlight } from '../../../lib/codepanel.js';

// LEVELS-START
// The levels. Indonesian code follows PP 03 Bab 3–4 (identifiers, prompts and messages); the English code is the
// same program with English names. Each bug has a kind (the kind of error it causes first), a signature (syntax:
// the CPython message; runtime: the exception type), the test cases it breaks, hints, and `fix`: [wrong, right]
// text replacements. Applying every fix in order gives the corrected program, which is also what produces the
// expected output of every test case (so the expected column always matches real Python).
const LEVELS = [
  {
    key: 'age',
    name: { en: 'Age next year', id: 'Umur tahun depan' },
    story: {
      en: 'The program asks for a name and an age, greets the user and says how old they will be next year.',
      id: 'Program menanyakan nama dan umur, menyapa pengguna, lalu menampilkan umurnya tahun depan.',
    },
    code: {
      en: `name = input("What is your name? ")
age = input("How old are you? ")
print("Hello, name)
print("Next year you will be", age + 1)
`,
      id: `nama = input("Siapa namamu? ")
umur = input("Berapa umurmu? ")
print("Halo, nama)
print("Tahun depan umurmu", umur + 1)
`,
    },
    tests: [
      { in: ['Siti', '16'], tag: 'normal' },
      { in: ['Budi', '17'], tag: 'normal' },
      { in: ['Dewi', '15'], tag: 'normal' },
    ],
    bugs: [
      {
        kind: 'syntax', sig: { type: 'SyntaxError', msg: 'unterminated string literal' },
        title: { en: 'Missing closing quote', id: 'Tanda petik tidak ditutup' },
        fix: {
          en: [['print("Hello, name)', 'print("Hello,", name)']],
          id: [['print("Halo, nama)', 'print("Halo,", nama)']],
        },
        hint: {
          en: ['Python stopped before running a single line, so the problem is the grammar of the code. Look where the caret ^ points: every text that opens with " must close with " on the same line.',
            'Only the greeting is text. The variable must stay outside the quotes, after a comma, so that Python prints the name stored in it.'],
          id: ['Python berhenti sebelum menjalankan satu baris pun, jadi masalahnya ada pada tata bahasa kode. Lihat tempat yang ditunjuk tanda ^: setiap teks yang dibuka dengan " harus ditutup dengan " di baris yang sama.',
            'Hanya sapaannya yang berupa teks. Variabelnya harus berada di luar tanda petik, setelah koma, agar Python mencetak nama yang tersimpan di dalamnya.'],
        },
      },
      {
        kind: 'runtime', err: 'TypeError', tests: [0, 1, 2],
        title: { en: 'Text + number', id: 'Teks + angka' },
        fix: {
          en: [['age = input("How old are you? ")', 'age = int(input("How old are you? "))']],
          id: [['umur = input("Berapa umurmu? ")', 'umur = int(input("Berapa umurmu? "))']],
        },
        hint: {
          en: ['input() always gives text (str), even when the user types 16. The traceback names the line where that text is added to the number 1.',
            'Convert the answer into a whole number at the moment you read it: wrap input(...) in int(...).'],
          id: ['input() selalu menghasilkan teks (str), walaupun pengguna mengetik 16. Traceback menyebut baris tempat teks itu dijumlahkan dengan angka 1.',
            'Ubah jawabannya menjadi bilangan bulat saat dibaca: bungkus input(...) dengan int(...).'],
        },
      },
    ],
  },
  {
    key: 'pocket',
    name: { en: 'Pocket money', id: 'Uang saku' },
    story: {
      en: 'The program should add up the pocket money of four students, work out the average and print "Thrifty class" when the average is at most 15,000, otherwise "Big-spender class".',
      id: 'Program seharusnya menjumlahkan uang saku empat siswa, menghitung rata-ratanya, lalu menampilkan "Kelas Hemat" jika rata-ratanya paling banyak 15.000 dan "Kelas Boros" jika lebih.',
    },
    code: {
      en: `pocket_money = [10000, 20000, 15000, 25000]
total = 0
for i in range(5):
    total = pocket_money[i]
average = total / len(pocket_money)
if average <= 15000
    print("Average:", average, "- Thrifty class")
else:
    print("Average:", average, "- Big-spender class")
`,
      id: `uang_saku = [10000, 20000, 15000, 25000]
total = 0
for i in range(5):
    total = uang_saku[i]
rata = total / len(uang_saku)
if rata <= 15000
    print("Rata-rata:", rata, "- Kelas Hemat")
else:
    print("Rata-rata:", rata, "- Kelas Boros")
`,
    },
    tests: [
      { in: [], tag: 'manual', calc: { en: '(10000 + 20000 + 15000 + 25000) / 4 = 17500.0', id: '(10000 + 20000 + 15000 + 25000) / 4 = 17500.0' } },
    ],
    bugs: [
      {
        kind: 'syntax', sig: { type: 'SyntaxError', msg: "expected ':'" },
        title: { en: 'Missing colon', id: 'Lupa titik dua' },
        fix: { en: [['if average <= 15000\n', 'if average <= 15000:\n']], id: [['if rata <= 15000\n', 'if rata <= 15000:\n']] },
        hint: {
          en: ['The error was found before the program ran. Look at the if line the caret points to: how must every if, elif, else, for, while and def line end?',
            'Add a colon at the end of the if line.'],
          id: ['Kesalahan ditemukan sebelum program berjalan. Lihat baris if yang ditunjuk tanda ^: dengan apa setiap baris if, elif, else, for, while, dan def harus diakhiri?',
            'Tambahkan titik dua di akhir baris if.'],
        },
      },
      {
        kind: 'runtime', err: 'IndexError', tests: [],
        title: { en: 'Index past the end of the list', id: 'Indeks melewati ujung list' },
        fix: { en: [['range(5)', 'range(len(pocket_money))']], id: [['range(5)', 'range(len(uang_saku))']] },
        hint: {
          en: ['The list holds 4 amounts, so its indexes are 0, 1, 2 and 3. Which values of i does range(5) produce?',
            'Let the loop run exactly once per item: range(len(pocket_money)), or range(4).'],
          id: ['List berisi 4 nilai, jadi indeksnya 0, 1, 2, dan 3. Nilai i berapa saja yang dihasilkan range(5)?',
            'Buat perulangan berjalan tepat sekali untuk setiap anggota: range(len(uang_saku)), atau range(4).'],
        },
      },
      {
        kind: 'logic', tests: [0],
        title: { en: 'Total is overwritten', id: 'Total tertimpa' },
        fix: { en: [['    total = pocket_money[i]', '    total = total + pocket_money[i]']], id: [['    total = uang_saku[i]', '    total = total + uang_saku[i]']] },
        hint: {
          en: ['No error message now, but check by hand: (10000 + 20000 + 15000 + 25000) / 4 = 17500.0. The program gets 6250.0, which is 25000 / 4. Which value is left in total after the loop?',
            'An accumulator must add each amount to what it already holds instead of replacing it.'],
          id: ['Tidak ada pesan error lagi, tetapi hitung manual: (10000 + 20000 + 15000 + 25000) / 4 = 17500.0. Program mendapat 6250.0, yaitu 25000 / 4. Nilai apa yang tersisa di total setelah perulangan?',
            'Akumulator harus menambahkan setiap nilai ke isi lamanya, bukan menggantinya.'],
        },
      },
    ],
  },
  {
    key: 'pass',
    name: { en: 'Pass mark: boundary 75', id: 'Status ketuntasan: batas 75' },
    story: {
      en: 'A score of 75 or more means "Passed", below 75 means "Not passed yet". Scores may have decimals, such as 74.9.',
      id: 'Nilai 75 ke atas berarti "Tuntas", di bawah 75 berarti "Belum Tuntas". Nilainya boleh desimal, misalnya 74.9.',
    },
    code: {
      en: `score = float(input("Enter the student's score: "))
if score > 75:
    status = "Passed"
else:
status = "Not passed yet"
print("Status:", stats)
`,
      id: `nilai = float(input("Masukkan nilai siswa: "))
if nilai > 75:
    status = "Tuntas"
else:
status = "Belum Tuntas"
print("Status:", stats)
`,
    },
    tests: [
      { in: ['80'], tag: 'normal' },
      { in: ['75'], tag: 'boundary' },
      { in: ['74.9'], tag: 'boundary' },
      { in: ['100'], tag: 'extreme' },
      { in: ['0'], tag: 'extreme' },
    ],
    bugs: [
      {
        kind: 'syntax', sig: { type: 'IndentationError', msg: 'expected an indented block' },
        title: { en: 'Block not indented', id: 'Blok tidak menjorok' },
        fix: { en: [['else:\nstatus = "Not passed yet"', 'else:\n    status = "Not passed yet"']], id: [['else:\nstatus = "Belum Tuntas"', 'else:\n    status = "Belum Tuntas"']] },
        hint: {
          en: ['IndentationError is about the spaces at the start of a line. Which line belongs inside the else: block?',
            'Indent the line under else: by 4 spaces (put the cursor at the start of the line and press Tab).'],
          id: ['IndentationError berkaitan dengan spasi di awal baris. Baris mana yang seharusnya berada di dalam blok else:?',
            'Jorokkan baris di bawah else: sebanyak 4 spasi (letakkan kursor di awal baris lalu tekan Tab).'],
        },
      },
      {
        kind: 'runtime', err: 'NameError', tests: [],
        title: { en: 'Misspelt variable name', id: 'Salah ketik nama variabel' },
        fix: { en: [['print("Status:", stats)', 'print("Status:", status)']], id: [['print("Status:", stats)', 'print("Status:", status)']] },
        hint: {
          en: ['NameError: Python knows no variable with that name. Read the message to the end: Python even suggests a name.',
            'Spell the variable exactly as it was created in the if and else blocks.'],
          id: ['NameError: Python tidak mengenal variabel dengan nama itu. Baca pesannya sampai habis: Python bahkan menyarankan sebuah nama.',
            'Tulis nama variabel persis seperti saat dibuat di blok if dan else.'],
        },
      },
      {
        kind: 'logic', tests: [1],
        title: { en: '> where >= is needed', id: '> padahal seharusnya >=' },
        fix: { en: [['if score > 75:', 'if score >= 75:']], id: [['if nilai > 75:', 'if nilai >= 75:']] },
        hint: {
          en: ['The normal tests pass, but the boundary test 75 fails. What should a score of exactly 75 give? Is 75 > 75 True or False?',
            'Use the operator that includes 75 itself: >=.'],
          id: ['Uji normal lolos, tetapi uji batas 75 gagal. Apa hasil yang benar untuk nilai tepat 75? Apakah 75 > 75 bernilai True atau False?',
            'Pakai operator yang ikut menyertakan 75: >=.'],
        },
      },
    ],
  },
  {
    key: 'grade',
    name: { en: 'Report grade A–D', id: 'Predikat nilai rapor A–D' },
    story: {
      en: 'Grade rule: A for 90 and above, B for 80 and above, C for 70 and above, otherwise D. The tests include all three boundaries: 90, 80 and 70.',
      id: 'Aturan predikat: A jika ≥ 90, B jika ≥ 80, C jika ≥ 70, selain itu D. Kasus uji mencakup ketiga nilai batas: 90, 80, dan 70.',
    },
    code: {
      en: `score = int(input("Enter the score: "))
if score > 90:
    print("Grade: A (Excellent)")
elif score >= 70:
    print("Grade: C (Fair)")
elif score => 80:
    print("Grade: B (Good)")
else:
    print("Grade: D (Needs remedial)")
`,
      id: `nilai = int(input("Masukkan nilai: "))
if nilai > 90:
    print("Predikat: A (Sangat Baik)")
elif nilai >= 70:
    print("Predikat: C (Cukup)")
elif nilai => 80:
    print("Predikat: B (Baik)")
else:
    print("Predikat: D (Perlu Remedial)")
`,
    },
    tests: [
      { in: ['95'], tag: 'normal' },
      { in: ['90'], tag: 'boundary' },
      { in: ['85'], tag: 'normal' },
      { in: ['80'], tag: 'boundary' },
      { in: ['70'], tag: 'boundary' },
      { in: ['69'], tag: 'boundary' },
    ],
    bugs: [
      {
        kind: 'syntax', sig: { type: 'SyntaxError', msg: 'invalid syntax', exact: true },
        title: { en: '=> is not an operator', id: '=> bukan operator' },
        fix: { en: [['elif score => 80:', 'elif score >= 80:']], id: [['elif nilai => 80:', 'elif nilai >= 80:']] },
        hint: {
          en: ['"invalid syntax" is Python\'s most general message, so look exactly where the caret ^ points. Which comparison operator is written there?',
            'Python writes "greater than or equal to" as >=, with the > first. => does not exist.'],
          id: ['"invalid syntax" adalah pesan Python yang paling umum, jadi lihat tepat di tempat yang ditunjuk tanda ^. Operator pembanding apa yang tertulis di sana?',
            'Python menulis "lebih dari atau sama dengan" sebagai >=, dengan > di depan. => tidak ada.'],
        },
      },
      {
        kind: 'logic', tests: [1],
        title: { en: '> where >= is needed', id: '> padahal seharusnya >=' },
        fix: { en: [['if score > 90:', 'if score >= 90:']], id: [['if nilai > 90:', 'if nilai >= 90:']] },
        hint: {
          en: ['Look at the boundary test 90: the rule gives A to 90 and above. Is 90 > 90 True?',
            'The first condition must include 90 itself: use >=.'],
          id: ['Perhatikan uji batas 90: aturan memberi A untuk 90 ke atas. Apakah 90 > 90 bernilai True?',
            'Kondisi pertama harus ikut menyertakan 90: pakai >=.'],
        },
      },
      {
        kind: 'logic', tests: [2],
        title: { en: 'elif branches in the wrong order', id: 'Urutan elif keliru' },
        fix: {
          en: [['elif score >= 70:\n    print("Grade: C (Fair)")\nelif score >= 80:\n    print("Grade: B (Good)")',
            'elif score >= 80:\n    print("Grade: B (Good)")\nelif score >= 70:\n    print("Grade: C (Fair)")']],
          id: [['elif nilai >= 70:\n    print("Predikat: C (Cukup)")\nelif nilai >= 80:\n    print("Predikat: B (Baik)")',
            'elif nilai >= 80:\n    print("Predikat: B (Baik)")\nelif nilai >= 70:\n    print("Predikat: C (Cukup)")']],
        },
        hint: {
          en: ['85 should get B but gets C. Python tests the conditions from the top and stops at the first one that is True. Which condition does 85 meet first?',
            'Test the larger threshold first: move the >= 80 branch, with its print line, above the >= 70 branch.'],
          id: ['85 seharusnya mendapat B tetapi mendapat C. Python memeriksa kondisi dari atas dan berhenti pada kondisi pertama yang True. Kondisi mana yang dipenuhi 85 lebih dulu?',
            'Periksa batas yang lebih besar lebih dulu: pindahkan cabang >= 80, beserta baris print-nya, ke atas cabang >= 70.'],
        },
      },
    ],
  },
  {
    key: 'average',
    name: { en: 'Class average from one line', id: 'Rata-rata kelas dari satu baris' },
    story: {
      en: 'The user types all the scores on one line, separated by spaces. The program prints their average, or "No scores yet." when nothing was typed. For 80 75 90 65 85 the average is 79.0.',
      id: 'Pengguna mengetik semua nilai dalam satu baris, dipisahkan spasi. Program menampilkan rata-ratanya, atau "Belum ada nilai." jika tidak ada yang diketik. Untuk 80 75 90 65 85 rata-ratanya 79.0.',
    },
    code: {
      en: `data = input("Scores (separated by spaces): ").split()
total = 0
for x in data:
    total = total + x
average = total / 5
print("Average:", average)
`,
      id: `data = input("Nilai-nilai (pisahkan dengan spasi): ").split()
total = 0
for x in data:
    total = total + x
rata = total / 5
print("Rata-rata:", rata)
`,
    },
    tests: [
      { in: ['80 75 90 65 85'], tag: 'normal', calc: { en: '395 / 5 = 79.0', id: '395 / 5 = 79.0' } },
      { in: ['100'], tag: 'extreme' },
      { in: ['70 71'], tag: 'normal', calc: { en: '141 / 2 = 70.5', id: '141 / 2 = 70.5' } },
      { in: [''], tag: 'empty' },
    ],
    bugs: [
      {
        kind: 'runtime', err: 'TypeError', tests: [0],
        title: { en: 'Adding text to a number', id: 'Menjumlahkan teks dengan angka' },
        fix: { en: [['total = total + x', 'total = total + int(x)']], id: [['total = total + x', 'total = total + int(x)']] },
        hint: {
          en: ['split() cuts the line into pieces of text: "80 75".split() gives [\'80\', \'75\'], a list of str. What happens with total + x when total is an int and x is a str?',
            'Convert each piece into a number before adding it: int(x).'],
          id: ['split() memotong baris menjadi potongan teks: "80 75".split() menghasilkan [\'80\', \'75\'], list berisi str. Apa yang terjadi pada total + x jika total bertipe int dan x bertipe str?',
            'Ubah setiap potongan menjadi bilangan sebelum dijumlahkan: int(x).'],
        },
      },
      {
        kind: 'logic', tests: [1, 2],
        title: { en: 'Number of scores written into the code', id: 'Banyak nilai ditulis mati' },
        fix: { en: [['average = total / 5', 'average = total / len(data)']], id: [['rata = total / 5', 'rata = total / len(data)']] },
        hint: {
          en: ['The first test passes, but one score of 100 gives 20.0. Where does the 5 in the program come from? Does every class type 5 scores?',
            'Divide by the number of scores actually typed: len(data).'],
          id: ['Uji pertama lolos, tetapi satu nilai 100 menghasilkan 20.0. Dari mana angka 5 di program itu? Apakah setiap kelas selalu mengetik 5 nilai?',
            'Bagi dengan banyak nilai yang benar-benar diketik: len(data).'],
        },
      },
      {
        kind: 'runtime', err: 'ZeroDivisionError', tests: [3],
        title: { en: 'Dividing by zero scores', id: 'Membagi dengan nol nilai' },
        fix: {
          en: [['average = total / len(data)\nprint("Average:", average)', 'if len(data) == 0:\n    print("No scores yet.")\nelse:\n    average = total / len(data)\n    print("Average:", average)']],
          id: [['rata = total / len(data)\nprint("Rata-rata:", rata)', 'if len(data) == 0:\n    print("Belum ada nilai.")\nelse:\n    rata = total / len(data)\n    print("Rata-rata:", rata)']],
        },
        hint: {
          en: ['In the empty test the user types nothing, so data is the empty list [] and len(data) is 0. What is total / 0?',
            'Check before dividing: if len(data) == 0, print the message from the expected output; otherwise (else) work out and print the average.'],
          id: ['Pada uji kosong pengguna tidak mengetik apa pun, jadi data adalah list kosong [] dan len(data) bernilai 0. Berapa total / 0?',
            'Periksa sebelum membagi: jika len(data) == 0, cetak pesan seperti pada keluaran yang diharapkan; jika tidak (else), hitung dan cetak rata-ratanya.'],
        },
      },
    ],
  },
  {
    key: 'groups',
    name: { en: 'Group split with try-except', id: 'Membagi kelompok dengan try-except' },
    story: {
      en: 'The class of 30 is split into groups. Typing 0, or text such as "five", must not crash the program: protect it with try-except and print a friendly message instead.',
      id: 'Kelas berisi 30 siswa dibagi menjadi beberapa kelompok. Mengetik 0 atau teks seperti "lima" tidak boleh membuat program berhenti mendadak: lindungi dengan try-except dan tampilkan pesan yang ramah.',
    },
    code: {
      en: `total_students = 30
groups = int(input("Split the class into how many groups? "))
per_group = total_students / groups
print("Each group has", per_group, "students.")
`,
      id: `jumlah_siswa = 30
jumlah_kelompok = int(input("Mau dibagi menjadi berapa kelompok? "))
anggota_per_kelompok = jumlah_siswa / jumlah_kelompok
print("Tiap kelompok berisi", anggota_per_kelompok, "orang.")
`,
    },
    tests: [
      { in: ['5'], tag: 'normal' },
      { in: ['3'], tag: 'normal' },
      { in: ['0'], tag: 'boundary' },
      { in: [{ en: 'five', id: 'lima' }], tag: 'invalid' },
      { in: [''], tag: 'empty' },
    ],
    bugs: [
      {
        kind: 'runtime', err: 'ZeroDivisionError', tests: [2],
        title: { en: 'Division by 0 not handled', id: 'Pembagian dengan 0 tidak ditangani' },
        fix: {
          en: [['groups = int(input("Split the class into how many groups? "))\nper_group = total_students / groups\nprint("Each group has", per_group, "students.")\n',
            'try:\n    groups = int(input("Split the class into how many groups? "))\n    per_group = total_students / groups\n    print("Each group has", per_group, "students.")\nexcept ZeroDivisionError:\n    print("The number of groups cannot be 0.")\n']],
          id: [['jumlah_kelompok = int(input("Mau dibagi menjadi berapa kelompok? "))\nanggota_per_kelompok = jumlah_siswa / jumlah_kelompok\nprint("Tiap kelompok berisi", anggota_per_kelompok, "orang.")\n',
            'try:\n    jumlah_kelompok = int(input("Mau dibagi menjadi berapa kelompok? "))\n    anggota_per_kelompok = jumlah_siswa / jumlah_kelompok\n    print("Tiap kelompok berisi", anggota_per_kelompok, "orang.")\nexcept ZeroDivisionError:\n    print("Jumlah kelompok tidak boleh 0.")\n']],
        },
        hint: {
          en: ['The user typed 0, so Python divides 30 by 0. A user can always type 0, so changing a number in the code cannot remove this error: the program has to react to it.',
            'Put the three lines after total_students = 30 inside a try: block (indented), then add except ZeroDivisionError: with a print of the message from the expected output.'],
          id: ['Pengguna mengetik 0, sehingga Python membagi 30 dengan 0. Pengguna selalu bisa mengetik 0, jadi mengubah angka di kode tidak akan menghilangkan error ini: program harus menanganinya.',
            'Masukkan tiga baris setelah jumlah_siswa = 30 ke dalam blok try: (dijorokkan), lalu tambahkan except ZeroDivisionError: yang mencetak pesan seperti pada keluaran yang diharapkan.'],
        },
      },
      {
        kind: 'runtime', err: 'ValueError', tests: [3, 4],
        title: { en: 'int(input()) not protected', id: 'int(input()) tidak dilindungi' },
        fix: {
          en: [['    print("The number of groups cannot be 0.")\n', '    print("The number of groups cannot be 0.")\nexcept ValueError:\n    print("Type the number of groups as a number.")\n']],
          id: [['    print("Jumlah kelompok tidak boleh 0.")\n', '    print("Jumlah kelompok tidak boleh 0.")\nexcept ValueError:\n    print("Masukkan jumlah kelompok dalam bentuk angka.")\n']],
        },
        hint: {
          en: ['int() can only convert text that looks like a whole number. A word, or an empty answer, raises ValueError.',
            'One try block can have several handlers: add except ValueError: under the first handler, with a print of the message from the expected output.'],
          id: ['int() hanya bisa mengubah teks yang berbentuk bilangan bulat. Sebuah kata, atau jawaban kosong, memicu ValueError.',
            'Satu blok try boleh punya beberapa penangan: tambahkan except ValueError: di bawah penangan pertama, dengan print pesan seperti pada keluaran yang diharapkan.'],
        },
      },
    ],
  },
  {
    key: 'duty',
    name: { en: 'Duty roster: index boundaries', id: 'Petugas piket: batas indeks' },
    story: {
      en: 'Class duty: the user types a number from 1 to 4 and the program prints that student\'s name. Any number outside 1–4 must print "That number is not on the list."',
      id: 'Petugas piket: pengguna mengetik nomor urut 1 sampai 4 dan program menampilkan nama petugasnya. Nomor di luar 1–4 harus menampilkan "Nomor urut di luar jangkauan daftar."',
    },
    code: {
      en: `duty_students = ["Andi", "Budi", "Cici", "Dina"]
number = int(input("Duty number (1-4): "))
print("On duty:", duty_students[number])
`,
      id: `siswa_piket = ["Andi", "Budi", "Cici", "Dina"]
nomor = int(input("Nomor urut petugas (1-4): "))
print("Petugas piket:", siswa_piket[nomor])
`,
    },
    tests: [
      { in: ['1'], tag: 'boundary' },
      { in: ['3'], tag: 'normal' },
      { in: ['4'], tag: 'boundary' },
      { in: ['5'], tag: 'outside' },
      { in: ['0'], tag: 'outside' },
    ],
    bugs: [
      {
        kind: 'runtime', err: 'IndexError', tests: [0, 1, 2],
        title: { en: 'Off by one', id: 'Meleset satu' },
        fix: { en: [['duty_students[number])', 'duty_students[number - 1])']], id: [['siswa_piket[nomor])', 'siswa_piket[nomor - 1])']] },
        hint: {
          en: ['Number 4 should give Dina, the last name, but index 4 does not exist: a list of 4 names has indexes 0 to 3. Look at the other tests too: which name does number 1 give?',
            'List indexes start at 0, so number 1 is index 0. Subtract one from the number the user typed before using it as an index.'],
          id: ['Nomor 4 seharusnya Dina, nama terakhir, tetapi indeks 4 tidak ada: list berisi 4 nama punya indeks 0 sampai 3. Lihat juga uji yang lain: nama siapa yang muncul untuk nomor 1?',
            'Indeks list dimulai dari 0, jadi nomor 1 adalah indeks 0. Kurangi nomor yang diketik pengguna dengan satu sebelum dipakai sebagai indeks.'],
        },
      },
      {
        kind: 'runtime', err: 'IndexError', tests: [3],
        title: { en: 'Number past the end of the list', id: 'Nomor melewati ujung daftar' },
        fix: {
          en: [['print("On duty:", duty_students[number - 1])', 'try:\n    print("On duty:", duty_students[number - 1])\nexcept IndexError:\n    print("That number is not on the list.")']],
          id: [['print("Petugas piket:", siswa_piket[nomor - 1])', 'try:\n    print("Petugas piket:", siswa_piket[nomor - 1])\nexcept IndexError:\n    print("Nomor urut di luar jangkauan daftar.")']],
        },
        hint: {
          en: ['The list has 4 names, so the largest index is 3. A user can type any number at all, such as 5.',
            'Catch the error with try: ... except IndexError: (as in level 6), or check the number first, and print the message from the expected output.'],
          id: ['List berisi 4 nama, jadi indeks terbesarnya 3. Pengguna bisa mengetik nomor berapa saja, misalnya 5.',
            'Tangkap error-nya dengan try: ... except IndexError: (seperti di level 6), atau periksa nomornya lebih dulu, lalu cetak pesan seperti pada keluaran yang diharapkan.'],
        },
      },
      {
        kind: 'logic', tests: [4],
        title: { en: 'Negative index', id: 'Indeks negatif' },
        fix: {
          en: [['try:\n    print("On duty:", duty_students[number - 1])\nexcept IndexError:\n', 'if 1 <= number <= len(duty_students):\n    print("On duty:", duty_students[number - 1])\nelse:\n']],
          id: [['try:\n    print("Petugas piket:", siswa_piket[nomor - 1])\nexcept IndexError:\n', 'if 1 <= nomor <= len(siswa_piket):\n    print("Petugas piket:", siswa_piket[nomor - 1])\nelse:\n']],
        },
        hint: {
          en: ['Type 0 and Python does not complain: it prints Dina! 0 - 1 = -1, and a negative index counts from the end of the list, so index -1 is the last name. No IndexError means except IndexError never runs.',
            'Check the range yourself instead of waiting for an error: if 1 <= number <= len(duty_students): print the name, else: print the message.'],
          id: ['Ketik 0 dan Python tidak protes: ia mencetak Dina! 0 - 1 = -1, dan indeks negatif dihitung dari ujung list, jadi indeks -1 adalah nama terakhir. Tidak ada IndexError, jadi except IndexError tidak pernah dijalankan.',
            'Periksa rentangnya sendiri alih-alih menunggu error: if 1 <= nomor <= len(siswa_piket): cetak namanya, else: cetak pesannya.'],
        },
      },
    ],
  },
];
// LEVELS-END

// LOGIC-START
// Pure functions (no DOM): run the test cases with minipy and work out which bugs are fixed. They only need
// compile() and createRun(), so scratch tests can run them in node.
const MAX_STEPS = 20000;
/** How far a run got before the sim's limit stopped it: "20000 steps", or the loop rounds inside one step. */
function limitWhat(e, T) {
  return e?.limitKind === 'iterations'
    ? T(`${e.limit} loop rounds inside one step`, `${e.limit} putaran di dalam satu langkah`)
    : T(`${e?.limit ?? MAX_STEPS} steps`, `${e?.limit ?? MAX_STEPS} langkah`);
}

/** The input() values of a test case in the current language. */
function inputsOf(test, lang) {
  return test.in.map((v) => (v && typeof v === 'object' ? v[lang] : v));
}

/** Apply the first `upto` bug fixes ([wrong, right] replacements) to the buggy code: the corrected program. */
function applyFixes(code, bugs, lang, upto = bugs.length) {
  let src = code;
  for (let i = 0; i < upto; i++) for (const [from, to] of bugs[i].fix[lang]) src = src.replace(from, to);
  return src;
}

/**
 * Run a compiled program with the given input() values, like `python3 main.py` in a terminal.
 * segs: console segments (prompt text 'out', typed value 'in', traceback 'err'); printed: only what the
 * program printed with print() (no prompts, no typed values), which is what a test compares.
 */
function runTest(program, inputs) {
  const run = createRun(program, { inputs: inputs.slice(), echoInput: true, eofWhenExhausted: true, maxSteps: MAX_STEPS, seed: 1 });
  const segs = [];
  let error = null;
  for (let guard = 0; guard < MAX_STEPS * 4; guard++) {
    const ev = run.step();
    if (ev.kind === 'output') {
      if (ev.stderr) segs.push({ text: ev.text, kind: 'err' });
      else segs.push({ text: ev.text, kind: ev.echo ? 'in' : 'out', print: !ev.echo });
    } else if (ev.kind === 'input') {
      // the output just before an input event is its prompt: shown in the console, not part of the test output
      const last = segs[segs.length - 1];
      if (ev.prompt && last && last.print && last.text.endsWith(ev.prompt)) {
        const head = last.text.slice(0, last.text.length - ev.prompt.length);
        if (head) { last.text = head; segs.push({ text: ev.prompt, kind: 'out', print: false }); } else last.print = false;
      }
    } else if (ev.kind === 'exception') { error = ev.error; break; }
    if (ev.kind === 'done' || run.status === 'done' || run.status === 'error' || run.status === 'waiting-input') break;
  }
  const printed = segs.filter((s) => s.print).map((s) => s.text).join('');
  // an endless loop has no traceback: python3 would just keep running (the console adds a note that the sim stopped it)
  if (error && error.type !== 'StepLimit') segs.push({ text: error.traceback.replace(/\n?$/, '\n'), kind: 'err' });
  return { segs, printed, error, steps: run.snapshot().steps };
}

/** Output lines for comparison: CRLF-safe, trailing spaces and trailing empty lines ignored. */
function outLines(s) {
  const a = String(s).replace(/\r\n?/g, '\n').split('\n').map((l) => l.replace(/\s+$/, ''));
  while (a.length && a[a.length - 1] === '') a.pop();
  return a;
}
/** Index of the first line where two outputs differ, or -1 when they are the same. */
function firstDiff(actual, expected) {
  const a = outLines(actual), e = outLines(expected);
  for (let i = 0; i < Math.max(a.length, e.length); i++) if (a[i] !== e[i]) return i;
  return -1;
}

/** Expected output of every test: what the corrected program prints. */
function expectedOutputs(level, lang) {
  const c = compile(applyFixes(level.code[lang], level.bugs, lang), { filename: 'main.py' });
  if (!c.ok) throw new Error(`bug-hunt: the corrected program of level ${level.key} does not compile`);
  return level.tests.map((t) => runTest(c.program, inputsOf(t, lang)).printed);
}

/** Check a source against every test case. */
function evaluate(level, lang, src, expected) {
  const c = compile(src, { filename: 'main.py' });
  if (!c.ok) return { compiled: false, syntax: c.error, tests: null };
  const tests = level.tests.map((t, i) => {
    const r = runTest(c.program, inputsOf(t, lang));
    r.diff = r.error ? Math.max(0, outLines(r.printed).length) : firstDiff(r.printed, expected[i]);
    r.pass = !r.error && r.diff < 0;
    return r;
  });
  return { compiled: true, syntax: null, tests };
}

function sigMatch(sig, e) {
  return !!e && e.type === sig.type && (sig.exact ? e.message === sig.msg : e.message.startsWith(sig.msg));
}

/**
 * Which hidden bugs are fixed now. A syntax bug is fixed when the file compiles, or when the compile error is a
 * different one and the wrong text is gone. A runtime or logic bug is fixed when the test cases it breaks pass (a
 * runtime bug that lists no test cases: when no test raises its exception any more). A runtime bug whose wrong text
 * is in the original program also counts as fixed once that text is gone, no test raises its exception and its test
 * cases run to the end and print as many lines as expected, at least one of them right: their output can still be
 * wrong because of another change (for example print("Hello, name") in level 1), and that is then a bug of its own. While the file does not compile,
 * runtime and logic bugs keep the status of the last run that did (Python cannot run them, so there is nothing new
 * to see).
 */
function bugStatus(level, lang, res, src, prev, expected) {
  // a test that ran to the end and printed as many lines as expected, at least one of them right
  const looksFixed = (r, exp) => {
    if (r.error || !exp) return false;
    const a = outLines(r.printed), e = outLines(exp);
    return a.length === e.length && a.some((l, j) => l === e[j]);
  };
  return level.bugs.map((b, i) => {
    if (b.kind === 'syntax') {
      if (res.compiled) return true;
      if (sigMatch(b.sig, res.syntax)) return false;
      return !b.fix[lang].some(([from]) => src.includes(from));
    }
    if (!res.compiled) return !!(prev && prev[i]);
    const raised = res.tests.some((r) => r.error && r.error.type === b.err);
    if (b.tests && b.tests.length) {
      if (b.tests.every((k) => res.tests[k].pass)) return true;
      const froms = b.fix[lang].map(([from]) => from);
      return b.kind === 'runtime' && !raised && froms.every((f) => level.code[lang].includes(f) && !src.includes(f))
        && b.tests.every((k) => looksFixed(res.tests[k], expected[k]));
    }
    return !raised;
  });
}

/**
 * The problem to look at first, in the order Python reveals them (PP 03, 4.3): a syntax error (nothing runs), then
 * the first test that stops with a runtime error, then the first test whose output is wrong. An endless loop
 * (minipy's StepLimit) is a logic error: Python itself would keep running and never complain.
 */
function firstProblem(res) {
  if (!res.compiled) return { kind: 'syntax', error: res.syntax, test: -1 };
  const ti = res.tests.findIndex((r) => r.error);
  if (ti >= 0) {
    const e = res.tests[ti].error;
    return { kind: e.type === 'StepLimit' ? 'logic' : 'runtime', loop: e.type === 'StepLimit', error: e, test: ti };
  }
  const fi = res.tests.findIndex((r) => !r.pass);
  return fi >= 0 ? { kind: 'logic', error: null, test: fi } : null;
}

/** The hidden bug a problem belongs to (index), or -1 for a new bug made while editing. */
function mapBug(level, prob, fixed) {
  if (!prob) return -1;
  const bugs = level.bugs;
  if (prob.kind === 'syntax') return bugs.findIndex((b) => b.kind === 'syntax' && sigMatch(b.sig, prob.error));
  if (prob.loop) return -1;
  const open = (b, k) => !fixed[k] && b.kind !== 'syntax';
  const has = (b) => (b.tests || []).includes(prob.test);
  let i = -1;
  if (prob.kind === 'runtime') {
    const t = prob.error.type;
    i = bugs.findIndex((b, k) => open(b, k) && b.err === t && has(b));
    if (i < 0) i = bugs.findIndex((b, k) => open(b, k) && b.err === t);
  } else {
    i = bugs.findIndex((b, k) => open(b, k) && b.kind === 'logic' && has(b));
  }
  if (i < 0) i = bugs.findIndex((b, k) => open(b, k) && has(b));
  return i;
}
// LOGIC-END

// ------------------------------------------------------------------ helpers
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const KINDS = ['syntax', 'runtime', 'logic'];

/** Line number (1-based) where `needle` starts in `src`, or 0. */
function lineOf(src, needle) {
  const i = src.indexOf(needle);
  return i < 0 ? 0 : src.slice(0, i).split('\n').length;
}

/** Indexes (0-based) of the lines of b that are not part of a longest common subsequence with a (changed lines). */
function changedLines(a, b) {
  const n = a.length, m = b.length;
  if (n * m > 160000) return [];
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const out = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) { i++; j++; } else if (dp[i + 1][j] >= dp[i][j + 1]) i++; else out.push(j++);
  }
  while (j < m) out.push(j++);
  return out;
}

/** The last line of a printed output, cut to a readable length. */
const clip = (s, n = 60) => (s.length > n ? s.slice(0, n - 1) + '…' : s);

/**
 * "In plain words": what the last line of a traceback means and what usually fixes it (PP 03, Tabel 15).
 * Returns HTML; every part taken from the message is escaped.
 */
function explainError(e, T) {
  const m = e.message || '';
  const c = (s) => `<code>${esc(s)}</code>`;
  let x;
  switch (e.type) {
    case 'SyntaxError':
      if (m.startsWith("expected ':'")) {
        return T(`Python expected a colon ${c(':')} at the caret. A line that opens a block (if, elif, else, for, while, def, try, except) must end with a colon.`,
          `Python mengharapkan titik dua ${c(':')} di tempat tanda ^. Baris yang membuka blok (if, elif, else, for, while, def, try, except) harus diakhiri titik dua.`);
      }
      if (m.startsWith('unterminated string literal') || m.startsWith('unterminated triple-quoted')) {
        return T('A text (string) starts with a quote at the caret but is never closed. Add the closing quote where the text should end.',
          'Sebuah teks (string) dibuka dengan tanda petik di tempat tanda ^ tetapi tidak pernah ditutup. Tambahkan tanda petik penutup di akhir teksnya.');
      }
      if ((x = m.match(/^'(.)' was never closed/))) {
        return T(`The bracket ${c(x[1])} at the caret is opened but never closed. Count the brackets: every opening bracket needs a closing one.`,
          `Kurung ${c(x[1])} di tempat tanda ^ dibuka tetapi tidak pernah ditutup. Hitung kurungnya: setiap kurung buka butuh kurung tutup.`);
      }
      if ((x = m.match(/^unmatched '(.)'/))) {
        return T(`There is a closing ${c(x[1])} without a matching opening bracket.`, `Ada kurung tutup ${c(x[1])} tanpa pasangan kurung buka.`);
      }
      if ((x = m.match(/^closing parenthesis '(.)' does not match opening parenthesis '(.)'/))) {
        return T(`The bracket ${c(x[2])} is closed with ${c(x[1])}. Brackets must close with the same kind: ( ), [ ], { }.`,
          `Kurung ${c(x[2])} ditutup dengan ${c(x[1])}. Kurung harus ditutup dengan jenis yang sama: ( ), [ ], { }.`);
      }
      if (m.includes('forgot a comma')) {
        return T('Two values stand next to each other with nothing between them. In print(...) or a list, separate the items with commas.',
          'Dua nilai berdampingan tanpa pemisah. Di dalam print(...) atau list, pisahkan setiap item dengan koma.');
      }
      if (m.includes("Maybe you meant '=='")) {
        return T(`A single ${c('=')} stores a value. To compare two values use ${c('==')}.`, `Satu tanda ${c('=')} menyimpan nilai. Untuk membandingkan dua nilai pakai ${c('==')}.`);
      }
      if (m.startsWith('invalid decimal literal')) {
        return T('A number is followed directly by letters (such as 2x or 1nilai). A name may not start with a digit, and multiplication needs *.',
          'Sebuah angka langsung diikuti huruf (misalnya 2x atau 1nilai). Nama tidak boleh diawali angka, dan perkalian butuh tanda *.');
      }
      if (m.startsWith('invalid character')) {
        return T('The line contains a character Python does not allow in code, for example curly quotes “ ” copied from a document. Type straight quotes " instead.',
          'Baris ini berisi karakter yang tidak boleh ada di kode, misalnya tanda petik miring “ ” yang tersalin dari dokumen. Ketik tanda petik lurus " sebagai gantinya.');
      }
      if (m.startsWith('cannot assign to') || m.startsWith('cannot assign')) {
        return T(`The left side of ${c('=')} must be a variable name: the value goes into the name on the left. To compare, use ${c('==')}.`,
          `Sisi kiri ${c('=')} harus berupa nama variabel: nilainya disimpan ke nama di sebelah kiri. Untuk membandingkan, pakai ${c('==')}.`);
      }
      if (m.startsWith("expected 'except' or 'finally' block")) {
        return T('A try: block must be followed by at least one except block (or a finally block), lined up with the try.',
          'Blok try: harus diikuti paling sedikit satu blok except (atau finally) yang sejajar dengan try.');
      }
      if (m.startsWith('invalid syntax')) {
        return T(`Python could not understand the code at the caret ^. This is its most general message, so look closely at that spot and just before it: a wrong operator (${c('=>')} instead of ${c('>=')}), a missing bracket, quote or comma, or a misspelt keyword.`,
          `Python tidak dapat memahami kode di tempat tanda ^. Ini pesannya yang paling umum, jadi periksa dengan teliti tempat itu dan tepat sebelumnya: operator yang salah (${c('=>')} padahal ${c('>=')}), kurung, tanda petik, atau koma yang hilang, atau kata kunci yang salah ketik.`);
      }
      return T('Python could not understand the grammar of this line. Look at the caret ^ and at the end of the line above it.',
        'Python tidak dapat memahami tata bahasa baris ini. Periksa tempat tanda ^ dan akhir baris di atasnya.');
    case 'IndentationError':
      if ((x = m.match(/^expected an indented block after (?:'(.+?)' statement|(.+?)) on line (\d+)/))) {
        const what = x[1] ? c(x[1]) : esc(x[2]);
        return T(`The line after the ${what} on line ${x[3]} must be indented (moved right by 4 spaces), because it belongs inside that block.`,
          `Baris setelah ${what} di baris ${x[3]} harus dijorokkan (digeser ke kanan 4 spasi), karena baris itu berada di dalam blok tersebut.`);
      }
      if (m.startsWith('unexpected indent')) {
        return T('This line is indented more than the line above it, but nothing above opens a block. Remove the extra spaces at the start of the line.',
          'Baris ini lebih menjorok daripada baris di atasnya, padahal tidak ada blok yang dibuka. Hapus spasi berlebih di awal baris.');
      }
      if (m.startsWith('unindent does not match')) {
        return T('This line moves left to a position that matches no block above it. Line it up exactly with the block it belongs to (multiples of 4 spaces).',
          'Baris ini bergeser ke kiri ke posisi yang tidak sejajar dengan blok mana pun di atasnya. Sejajarkan tepat dengan bloknya (kelipatan 4 spasi).');
      }
      return T('The spaces at the start of a line are wrong: the lines of one block must all be indented by the same amount.',
        'Spasi di awal baris salah: semua baris dalam satu blok harus dijorokkan sama jauh.');
    case 'TabError':
      return T('The indentation mixes tab characters and spaces. Use spaces only.', 'Indentasinya mencampur karakter tab dan spasi. Pakai spasi saja.');
    case 'NameError':
      if ((x = m.match(/^name '(.+?)' is not defined(?:\. Did you mean: '(.+?)'\?)?/))) {
        return T(`Python does not know any variable or function called ${c(x[1])}.` + (x[2]
          ? ` It suggests ${c(x[2])}: probably a typo. A name must be spelled exactly the same everywhere, capital letters included.`
          : ' Check the spelling (capital letters count) and that the name gets a value before this line runs. Text must be in quotes.'),
        `Python tidak mengenal variabel atau fungsi bernama ${c(x[1])}.` + (x[2]
          ? ` Python menyarankan ${c(x[2])}: kemungkinan salah ketik. Sebuah nama harus ditulis persis sama di mana pun, termasuk huruf besarnya.`
          : ' Periksa ejaannya (huruf besar berpengaruh) dan pastikan nama itu sudah diberi nilai sebelum baris ini dijalankan. Teks harus diapit tanda petik.'));
      }
      break;
    case 'UnboundLocalError':
      return T('A variable is used inside a function before the function gives it a value.', 'Sebuah variabel dipakai di dalam fungsi sebelum fungsi itu memberinya nilai.');
    case 'TypeError':
      if ((x = m.match(/^can only concatenate str \(not "(.+?)"\) to str/))) {
        return T(`${c('+')} was used to join a text (str) with a value of type ${c(x[1])}. + works on two numbers or on two texts, not on one of each. To calculate, convert the text with int() or float(); to join text, convert the number with str().`,
          `${c('+')} dipakai untuk menggabungkan teks (str) dengan nilai bertipe ${c(x[1])}. + bekerja pada dua bilangan atau dua teks, bukan campuran keduanya. Untuk berhitung, ubah teksnya dengan int() atau float(); untuk menggabung teks, ubah bilangannya dengan str().`);
      }
      if ((x = m.match(/^unsupported operand type\(s\) for (.+?): '(.+?)' and '(.+?)'/))) {
        const s = x[2] === 'str' || x[3] === 'str';
        return T(`The operator ${c(x[1])} cannot work on a ${c(x[2])} and a ${c(x[3])}.` + (s ? ' One of them is text (str), for example a value from input() or split(): convert it with int() or float() first.' : ''),
          `Operator ${c(x[1])} tidak bisa bekerja pada ${c(x[2])} dan ${c(x[3])}.` + (s ? ' Salah satunya teks (str), misalnya nilai dari input() atau split(): ubah dulu dengan int() atau float().' : ''));
      }
      if ((x = m.match(/^'(.+?)' not supported between instances of '(.+?)' and '(.+?)'/))) {
        return T(`${c(x[1])} cannot compare a ${c(x[2])} with a ${c(x[3])}. Convert the text to a number first.`,
          `${c(x[1])} tidak bisa membandingkan ${c(x[2])} dengan ${c(x[3])}. Ubah dulu teksnya menjadi bilangan.`);
      }
      if ((x = m.match(/^'(.+?)' object is not subscriptable/))) {
        return T(`Square brackets [ ] were used on a ${c(x[1])}, which has no items to pick from.`, `Kurung siku [ ] dipakai pada ${c(x[1])}, yang tidak punya anggota untuk diambil.`);
      }
      if ((x = m.match(/^'(.+?)' object is not iterable/))) {
        return T(`A loop (or a function such as sum) needs a sequence, but got a single ${c(x[1])}. To repeat n times use range(n).`,
          `Perulangan (atau fungsi seperti sum) membutuhkan barisan, tetapi menerima satu ${c(x[1])}. Untuk mengulang n kali pakai range(n).`);
      }
      if ((x = m.match(/^'(.+?)' object is not callable/))) {
        return T(`Round brackets ( ) after a ${c(x[1])} call it like a function, but it is not one. Did a variable get the name of a function?`,
          `Kurung ( ) setelah ${c(x[1])} memanggilnya seperti fungsi, padahal bukan fungsi. Apakah ada variabel yang memakai nama sebuah fungsi?`);
      }
      if (/missing \d+ required positional argument|takes \d+ positional argument/.test(m)) {
        return T('The function was called with a different number of arguments than it has parameters.', 'Fungsi dipanggil dengan banyak argumen yang berbeda dari banyak parameternya.');
      }
      return T('An operation got a value of the wrong type.', 'Sebuah operasi menerima nilai dengan tipe yang salah.');
    case 'ValueError':
      if ((x = m.match(/^invalid literal for int\(\) with base 10: (.*)$/))) {
        return T(`int() can only turn text that looks like a whole number into an int, but it got ${c(x[1])}${x[1] === "''" ? ' (empty text)' : ''}. For decimals use float(); to keep the program running when the input is not a number, use try-except ValueError.`,
          `int() hanya dapat mengubah teks yang berbentuk bilangan bulat menjadi int, tetapi menerima ${c(x[1])}${x[1] === "''" ? ' (teks kosong)' : ''}. Untuk desimal pakai float(); agar program tetap berjalan saat masukan bukan angka, pakai try-except ValueError.`);
      }
      if ((x = m.match(/^could not convert string to float: (.*)$/))) {
        return T(`float() can only turn text that looks like a number into a float, but it got ${c(x[1])}. Python writes decimals with a point (74.9), not a comma.`,
          `float() hanya dapat mengubah teks yang berbentuk bilangan menjadi float, tetapi menerima ${c(x[1])}. Python menulis desimal dengan titik (74.9), bukan koma.`);
      }
      if (m.includes('not in list')) return T('The program looked for a value that is not in the list.', 'Program mencari nilai yang tidak ada di list.');
      return T('The value has the right type but a content Python cannot use here.', 'Tipe nilainya benar, tetapi isinya tidak dapat dipakai di sini.');
    case 'ZeroDivisionError':
      return T('A number was divided by zero, which has no answer. Check the divisor with if before dividing, or catch the error with try-except ZeroDivisionError.',
        'Sebuah bilangan dibagi dengan nol, dan itu tidak punya hasil. Periksa pembaginya dengan if sebelum membagi, atau tangkap error-nya dengan try-except ZeroDivisionError.');
    case 'IndexError':
      if (m.startsWith('string')) return T('The program asked for a character position that the text does not have.', 'Program meminta posisi karakter yang tidak ada pada teks itu.');
      if (m.startsWith('pop from empty')) return T('pop() was called on an empty list.', 'pop() dipanggil pada list yang kosong.');
      return T('The program asked for a position that does not exist in the list. A list with n items has the indexes 0 to n − 1.',
        'Program meminta posisi yang tidak ada di list. List berisi n anggota punya indeks 0 sampai n − 1.');
    case 'KeyError':
      return T(`The dictionary has no key ${c(m)}. Check the spelling, or check first with in or use .get().`, `Dictionary tidak punya kunci ${c(m)}. Periksa ejaannya, atau periksa dulu dengan in atau pakai .get().`);
    case 'AttributeError':
      return T(`The value has no method or attribute with that name (${c(m)}). Check the spelling and the type of the value.`, `Nilai itu tidak punya metode atau atribut dengan nama tersebut (${c(m)}). Periksa ejaannya dan tipe nilainya.`);
    case 'EOFError':
      return T('The program called input() more often than this test case gives values, so input() reached the end of the input.',
        'Program memanggil input() lebih sering daripada banyak nilai pada kasus uji ini, sehingga input() mencapai akhir masukan.');
    case 'StepLimit':
      return T(`The program ran ${limitWhat(e, T)} without finishing: an endless loop. Real Python would keep running for ever without any message. Check that the loop condition can become False, or that a break is reached.`,
        `Program berjalan ${limitWhat(e, T)} tanpa selesai: perulangan tanpa akhir. Python sungguhan akan terus berjalan tanpa pesan apa pun. Pastikan kondisi perulangan bisa menjadi False, atau break dapat tercapai.`);
    case 'RecursionError':
      return T('A function kept calling itself without reaching a stopping case.', 'Sebuah fungsi terus memanggil dirinya sendiri tanpa mencapai kasus berhenti.');
    default:
      break;
  }
  return T(`${c(e.type)} is the kind of error; the text after the colon says what happened.`, `${c(e.type)} adalah jenis error-nya; teks setelah titik dua menjelaskan apa yang terjadi.`);
}

// ------------------------------------------------------------------ styles
const CSS = `
.bh { --bh-ok: #047857; --bh-bad: #b91c1c; --bh-warn: #a16207; --bh-syn: #7c3aed; --bh-run: #c2410c; --bh-log: #0369a1;
  container-type: inline-size; container-name: bh; display: grid; gap: 14px; padding: 14px; min-width: 0; color: var(--color-fg); }
@media (prefers-color-scheme: dark) {
  .bh, .bh-ctl { --bh-ok: #34d399; --bh-bad: #f87171; --bh-warn: #fbbf24; --bh-syn: #c4b5fd; --bh-run: #fdba74; --bh-log: #7dd3fc; }
}
.bh-ctl { --bh-ok: #047857; --bh-bad: #b91c1c; --bh-syn: #7c3aed; --bh-run: #c2410c; --bh-log: #0369a1; }
@media (prefers-color-scheme: dark) { .bh-ctl { --bh-ok: #34d399; --bh-bad: #f87171; --bh-syn: #c4b5fd; --bh-run: #fdba74; --bh-log: #7dd3fc; } }
.bh *, .bh-ctl * { box-sizing: border-box; }
.bh-sr { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }
.bh code { font-family: var(--font-mono, monospace); font-size: .95em; }

/* level header */
.bh-head { display: grid; gap: 6px; min-width: 0; }
.bh-lv { font: 600 12px/1.3 var(--font-sans, sans-serif); letter-spacing: .05em; text-transform: uppercase; color: var(--color-muted); }
.bh-title { margin: 0; font-size: 20px; line-height: 1.25; }
.bh-story { margin: 0; max-width: 78ch; font-size: 14px; line-height: 1.5; color: var(--color-muted); }
.bh-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 18px; margin-top: 2px; }
.bh-tracker { display: flex; flex-wrap: wrap; gap: 4px; margin: 0; padding: 0; list-style: none; }
.bh-bug { --c: var(--color-muted); display: grid; justify-items: center; gap: 1px; width: 46px; padding: 3px 0 2px; border-radius: 8px; color: var(--c);
  font: 700 11px/1.2 var(--font-sans, sans-serif); }
.bh-bug svg { display: block; width: 30px; height: 30px; }
.bh-bug.is-found { --c: var(--bh-bad); background: color-mix(in srgb, var(--bh-bad) 9%, transparent); }
.bh-bug.is-fixed { --c: var(--bh-ok); background: color-mix(in srgb, var(--bh-ok) 10%, transparent); }
.bh-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.bh-chip { display: inline-flex; align-items: baseline; gap: 6px; padding: 4px 10px; border: 1px solid var(--color-border); border-radius: 999px;
  background: var(--color-surface-2); font-size: 13px; line-height: 1.3; white-space: nowrap; }
.bh-chip b { font-variant-numeric: tabular-nums; }

/* the editor gets the full width (whole lines visible); below it the diagnosis and the console side by side */
.bh-grid { display: grid; grid-template-columns: minmax(0, 1fr); grid-template-areas: "bar" "code" "diag" "con"; gap: 10px 14px; min-width: 0; }
@container bh (min-width: 700px) {
  .bh-grid { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); grid-template-areas: "bar bar" "code code" "diag con"; align-items: start; }
}
.bh-grid > .bh-bar { grid-area: bar; } .bh-grid > .cp { grid-area: code; } .bh-grid > .bh-diag { grid-area: diag; } .bh-grid > .cp-con { grid-area: con; }
.bh-grid > .bh-diag { margin-top: 4px; } .bh-grid > .cp-con { margin-top: 4px; }
.bh-bar { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px; }
.bh-bar .btn { min-height: 40px; padding: 8px 14px; }
/* the site's .btn:hover background would override the primary colour */
.bh .btn--primary:hover { background: var(--accent, var(--color-accent)); }
.bh-tip { margin: 0; font-size: 12px; line-height: 1.4; color: var(--color-muted); }
.bh-tip kbd { padding: 0 4px; border: 1px solid var(--color-border); border-radius: 4px; font: 11px/1.5 var(--font-mono, monospace); background: var(--color-surface-2); }

/* diagnosis card */
.bh-diag { display: grid; gap: 10px; padding: 12px; min-width: 0; border: 1px solid var(--color-border); border-radius: 12px; background: var(--color-surface); }
.bh-dh { margin: 0; display: flex; align-items: flex-start; gap: 8px; font-size: 15px; line-height: 1.35; }
.bh-dh .ic { flex: none; display: inline-grid; place-items: center; width: 24px; height: 24px; border-radius: 50%; color: #fff; font: 700 13px/1 var(--font-sans, sans-serif); }
.bh-dh.k-syntax .ic { background: var(--bh-syn); } .bh-dh.k-runtime .ic { background: var(--bh-run); } .bh-dh.k-logic .ic { background: var(--bh-log); }
.bh-dh.k-none .ic { background: var(--color-muted); } .bh-dh.k-done .ic { background: var(--bh-ok); }
@media (prefers-color-scheme: dark) { .bh-dh .ic { color: #0b1220; } }
.bh-p { margin: 0; font-size: 13.5px; line-height: 1.5; }
.bh-p.muted { color: var(--color-muted); }
.bh-msg { margin: 0; padding: 6px 10px; border-radius: 8px; background: #0b1220; color: #ff8f8f; font: 13px/1.45 var(--font-mono, monospace);
  white-space: pre-wrap; overflow-wrap: anywhere; color-scheme: dark; }
.bh-steps { margin: 0; padding-left: 1.3em; display: grid; gap: 4px; font-size: 13.5px; line-height: 1.45; }
.bh-stale { margin: 0; padding: 7px 10px; border: 1px dashed var(--bh-warn); border-radius: 8px; font-size: 13px; line-height: 1.4; }
.bh-q { margin: 0; font-size: 14px; font-weight: 700; }
.bh-cls { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
.bh-cls button { --kc: var(--color-border); display: grid; align-content: center; gap: 2px; min-height: 54px; padding: 6px; border: 1.5px solid var(--kc); border-radius: 9px;
  background: color-mix(in srgb, var(--kc) 7%, var(--color-surface)); color: var(--color-fg); font: 700 14px/1.2 var(--font-sans, sans-serif); text-align: center; cursor: pointer; }
.bh-cls button small { font-weight: 400; font-size: 11.5px; line-height: 1.25; color: var(--color-muted); }
.bh-cls button:hover { background: color-mix(in srgb, var(--kc) 16%, var(--color-surface)); }
.bh-cls button[aria-pressed="true"] { background: color-mix(in srgb, var(--kc) 22%, var(--color-surface)); box-shadow: inset 0 0 0 1.5px var(--kc); }
.bh-cls button:focus-visible, .bh-tn:focus-visible { outline: 2px solid var(--accent, var(--color-accent)); outline-offset: 2px; }
.bh .k-syntax, .bh-ctl .k-syntax { --kc: var(--bh-syn); } .bh .k-runtime, .bh-ctl .k-runtime { --kc: var(--bh-run); } .bh .k-logic, .bh-ctl .k-logic { --kc: var(--bh-log); }
.bh-fb { margin: 0; padding: 8px 10px; border-radius: 8px; font-size: 13.5px; line-height: 1.45; }
.bh-fb.ok { border: 1px solid var(--bh-ok); background: color-mix(in srgb, var(--bh-ok) 11%, transparent); }
.bh-fb.bad { border: 1px solid var(--bh-bad); background: color-mix(in srgb, var(--bh-bad) 9%, transparent); }
.bh-fb b { margin-right: 1px; }

/* traceback reader */
.bh-tb { min-width: 0; border: 1px solid #1e2a44; border-radius: 10px; overflow: hidden; background: #0b1220; color: #e2e8f0; color-scheme: dark; }
.bh-tb-h { padding: 6px 10px; border-bottom: 1px solid #1e2a44; background: #0f182c; font: 600 12px/1.35 var(--font-sans, sans-serif); color: #b6c2d6; }
.bh-tb ol { margin: 0; padding: 4px 0; list-style: none; }
.bh-tb li { display: grid; gap: 1px; padding: 3px 10px; min-width: 0; }
.bh-tb li.is-last { background: rgba(248, 113, 113, .1); }
.bh-tbc { margin: 0; font: 12.5px/1.45 var(--font-mono, monospace); white-space: pre-wrap; overflow-wrap: anywhere; color: #e2e8f0; }
.bh-tbc.is-caret { overflow-x: auto; white-space: pre; overflow-wrap: normal; scrollbar-width: thin; }
.bh-tb li.is-last .bh-tbc { color: #ff8f8f; white-space: pre-wrap; overflow-wrap: anywhere; }
.bh-tbc .car { color: #ff8f8f; }
.bh-tbn { font: 11.5px/1.4 var(--font-sans, sans-serif); color: #9cc3ff; }
.bh-tbn::before { content: "\\2191  "; }
.bh-plain { margin: 0; padding: 8px 10px; border-top: 1px solid #1e2a44; font: 13px/1.5 var(--font-sans, sans-serif); color: #e2e8f0; }
.bh-plain--top { border-top: 0; }
.bh-plain > b { color: #fde68a; }
.bh-plain code { padding: 0 3px; border-radius: 3px; background: #1b2740; color: #c3e88d; }
.bh-tb-go { display: flex; flex-wrap: wrap; gap: 6px; padding: 0 10px 10px; }
.bh-tb-go button { min-height: 34px; padding: 5px 12px; border: 1px solid #2b3a5a; border-radius: 7px; background: #172036; color: #e2e8f0; font: 600 13px var(--font-sans, sans-serif); cursor: pointer; }
.bh-tb-go button:hover { background: #22304d; }
.bh-tb-go button:focus-visible { outline: 2px solid #60a5fa; outline-offset: 1px; }

/* logic comparison */
.bh-cmp { display: grid; gap: 5px; font-size: 13px; }
.bh-cmp > div { display: grid; grid-template-columns: minmax(0, max-content) minmax(0, 1fr); gap: 2px 10px; align-items: baseline; }
.bh-cmp > div > span { color: var(--color-muted); font-size: 12px; }
.bh-cmp code { padding: 2px 7px; border-radius: 5px; background: var(--color-surface-2); font: 13px/1.4 var(--font-mono, monospace); white-space: pre-wrap; overflow-wrap: anywhere; }
.bh-cmp .exp code { box-shadow: inset 3px 0 0 var(--bh-ok); }
.bh-cmp .act code { box-shadow: inset 3px 0 0 var(--bh-bad); }

/* hints */
.bh-hintrow { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.bh-hintrow .btn[aria-disabled="true"] { opacity: .55; cursor: default; }
.bh-hints { margin: 0; padding-left: 1.3em; display: grid; gap: 6px; font-size: 13.5px; line-height: 1.5; }
.bh-hints li::marker { font-weight: 700; color: var(--bh-warn); }
.bh-fix { display: grid; gap: 3px; margin-top: 4px; }
.bh-fix > span { font-size: 12px; color: var(--color-muted); }
.bh-fix pre { margin: 0; padding: 6px 9px; border-radius: 7px; background: #0b1220; color: #e2e8f0; font: 12.5px/1.45 var(--font-mono, monospace); white-space: pre; overflow-x: auto; color-scheme: dark; }
.bh-fix pre.from { box-shadow: inset 3px 0 0 #f87171; }
.bh-fix pre.to { box-shadow: inset 3px 0 0 #34d399; }

/* done */
.bh-done { display: grid; gap: 8px; }
.bh-done .btn { justify-self: start; min-height: 40px; }

/* sections: test cases, bug log, answer key */
.bh-sec { min-width: 0; border: 1px solid var(--color-border); border-radius: 12px; background: var(--color-surface); overflow: hidden; container-type: inline-size; }
.bh-sec-h { display: flex; flex-wrap: wrap; align-items: baseline; gap: 2px 12px; padding: 8px 12px; border-bottom: 1px solid var(--color-border); background: var(--color-surface-2); }
.bh-sec-h h3 { margin: 0; font-size: 14px; line-height: 1.3; }
.bh-sec-h small { font-size: 12px; line-height: 1.35; color: var(--color-muted); }
.bh-sec-b { padding: 0; min-width: 0; }
.bh-t { width: 100%; border-collapse: collapse; font-size: 13px; line-height: 1.4; }
.bh-t th { padding: 6px 10px; border-bottom: 1px solid var(--color-border); font-size: 12px; font-weight: 600; text-align: left; color: var(--color-muted); white-space: nowrap; }
.bh-t td { padding: 6px 10px; border-top: 1px solid var(--color-border); vertical-align: top; min-width: 0; }
.bh-t tbody tr:first-child td { border-top: 0; }
.bh-t pre { margin: 0; font: 12.5px/1.45 var(--font-mono, monospace); white-space: pre-wrap; overflow-wrap: anywhere; }
.bh-t .c-n { width: 1%; }
.bh-t .c-res { width: 1%; white-space: nowrap; }
.bh-tt tr.is-sel td { background: color-mix(in srgb, var(--accent, var(--color-accent)) 9%, transparent); }
.bh-tt.is-stale .c-act, .bh-tt.is-stale .c-res { opacity: .5; }
.bh-tn { min-width: 32px; min-height: 30px; padding: 2px 6px; border: 1px solid var(--color-border); border-radius: 7px; background: var(--color-surface-2);
  color: var(--color-fg); font: 700 12.5px/1 var(--font-mono, monospace); cursor: pointer; }
.bh-tn[aria-pressed="true"] { border-color: var(--accent, var(--color-accent)); box-shadow: inset 0 0 0 1px var(--accent, var(--color-accent)); }
.bh-in { display: inline-block; margin: 0 4px 3px 0; padding: 0 6px; border: 1px solid var(--color-border); border-radius: 5px; background: var(--color-surface-2);
  font: 12.5px/1.6 var(--font-mono, monospace); white-space: pre; }
.bh-in.is-empty { font: italic 12px/1.7 var(--font-sans, sans-serif); color: var(--color-muted); }
.bh-tag { display: inline-block; padding: 0 7px; border-radius: 999px; background: var(--color-surface-2); color: var(--color-muted); font-size: 11px; line-height: 1.7; white-space: nowrap; }
.bh-tag.is-hot { background: color-mix(in srgb, var(--bh-warn) 15%, transparent); color: var(--bh-warn); font-weight: 700; }
.bh-calc { display: block; margin-top: 2px; font-size: 11.5px; color: var(--color-muted); }
.bh-res { font-weight: 700; }
.bh-res.ok { color: var(--bh-ok); } .bh-res.bad { color: var(--bh-bad); } .bh-res.err { color: var(--bh-run); } .bh-res.none { font-weight: 400; color: var(--color-muted); }
.bh-t mark { border-radius: 3px; background: color-mix(in srgb, var(--bh-bad) 20%, transparent); color: inherit; }
.bh-errl { display: block; color: var(--bh-bad); font: 12.5px/1.45 var(--font-mono, monospace); overflow-wrap: anywhere; }
.bh-none { color: var(--color-muted); font-style: italic; }
.bh-kind { font-weight: 700; color: var(--kc); }
.bh-yes { color: var(--bh-ok); font-weight: 700; } .bh-no { color: var(--bh-bad); font-weight: 700; }
.bh-empty { margin: 0; padding: 10px 12px; font-size: 13px; color: var(--color-muted); }
@container (max-width: 620px) {
  .bh-t, .bh-t tbody { display: block; }
  .bh-t thead { display: none; }
  .bh-t tr { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; gap: 4px 10px; padding: 8px 10px; border-top: 1px solid var(--color-border); }
  .bh-t tbody tr:first-child { border-top: 0; }
  .bh-t td { display: block; padding: 0; border: 0; width: auto; }
  .bh-t td[data-label]::before { content: attr(data-label); display: block; font-size: 11px; line-height: 1.4; color: var(--color-muted); }
  .bh-tt .c-n { grid-column: 1; grid-row: 1; }
  .bh-tt .c-in { grid-column: 2; grid-row: 1; }
  .bh-tt .c-res { grid-column: 3; grid-row: 1; text-align: right; }
  .bh-tt .c-exp, .bh-tt .c-act { grid-column: 1 / -1; }
  .bh-tt tr.is-sel { background: color-mix(in srgb, var(--accent, var(--color-accent)) 9%, transparent); }
  .bh-tt tr.is-sel td { background: none; }
  .bh-lt .c-n { grid-column: 1; grid-row: 1; }
  .bh-lt .c-line { grid-column: 2; grid-row: 1; }
  .bh-lt .c-kind { grid-column: 3; grid-row: 1; text-align: right; }
  .bh-lt .c-sym, .bh-lt .c-fix { grid-column: 1 / -1; }
  .bh-kt .c-n { grid-column: 1; grid-row: 1; }
  .bh-kt .c-line { grid-column: 2; grid-row: 1; }
  .bh-kt .c-kind { grid-column: 3; grid-row: 1; text-align: right; }
  .bh-kt .c-what { grid-column: 1 / -1; }
}
.bh-sol > summary { cursor: pointer; padding: 9px 12px; font-size: 14px; font-weight: 700; list-style-position: inside; }
.bh-sol > summary:focus-visible { outline: 2px solid var(--accent, var(--color-accent)); outline-offset: -2px; }
.bh-sol[open] > summary { border-bottom: 1px solid var(--color-border); background: var(--color-surface-2); }
.bh-sol-b { display: grid; gap: 10px; padding: 10px 12px 12px; }

/* controls panel */
.bh-ctl { align-content: start; }
.bh-ctl .bh-cmeta { margin: -4px 0 0; font-size: 13px; color: var(--color-muted); }
.bh-ref { display: grid; gap: 6px; padding: 10px 12px; border: 1px solid var(--color-border); border-radius: 10px; background: var(--color-surface-2); }
.bh-ref h3 { margin: 0; font-size: 14px; }
.bh-ref dl { margin: 0; display: grid; gap: 6px; }
.bh-ref dt { font-size: 13px; font-weight: 700; color: var(--kc); }
.bh-ref dd { margin: 0; font-size: 12.5px; line-height: 1.45; color: var(--color-muted); }
/* no contextual alternates: some UI fonts draw => and -> as arrows, but here they are code. Set on every element
   (last, so it wins over the rules above: the font shorthand resets these properties instead of inheriting them) */
.bh, .bh *, .bh-ctl, .bh-ctl * { font-variant-ligatures: none; font-feature-settings: "calt" 0, "liga" 0; }
`;

const BUG_SVG = '<svg viewBox="0 0 32 32" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">'
  + '<path d="M10 13 5 10M9.5 18.5H3.5M10 24l-5 3M22 13l5-3M22.5 18.5h6M22 24l5 3M13 8.5 10.5 5M19 8.5 21.5 5"/></g>'
  + '<ellipse cx="16" cy="19" rx="7" ry="9" fill="currentColor"/><circle cx="16" cy="9.5" r="4" fill="currentColor"/>'
  + '<path d="M16 12v15" style="stroke:var(--color-surface,#fff)" stroke-width="1.6"/></svg>';

// ------------------------------------------------------------------ mount
export function mount(rootEl) {
  const lang = getLocale() === 'id' ? 'id' : 'en';
  const T = (en, id) => (lang === 'id' ? id : en);
  const pick = (o) => (o && typeof o === 'object' && !Array.isArray(o) ? o[lang] : o);
  const narrow = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 600px)').matches;
  const KIND = {
    syntax: { name: T('Syntax error', 'Kesalahan sintaks'), short: T('Syntax', 'Sintaks'), sub: T('found before it runs', 'ketahuan sebelum jalan') },
    runtime: { name: T('Runtime error', 'Kesalahan saat berjalan (runtime)'), short: T('Runtime', 'Runtime'), sub: T('stops while running', 'berhenti saat jalan') },
    logic: { name: T('Logic error', 'Kesalahan logika'), short: T('Logic', 'Logika'), sub: T('wrong result, no message', 'hasil salah, tanpa pesan') },
  };
  const TAGS = {
    normal: T('normal', 'normal'), boundary: T('boundary', 'batas'), extreme: T('extreme', 'ekstrem'), invalid: T('invalid', 'tidak valid'),
    empty: T('empty', 'kosong'), outside: T('out of range', 'di luar rentang'), manual: T('check by hand', 'hitung manual'),
  };

  const style = document.createElement('style');
  style.textContent = CSS;
  rootEl.appendChild(style);

  // ------------------------------------------------------------------ state
  // One record per level, kept while the page is open, so switching levels does not lose work.
  const store = new Map();
  const expCache = new Map();
  let li = 0;
  const level = () => LEVELS[li];
  const fresh = (lv) => ({
    code: lv.code[lang], runs: 0, hints: 0, res: null, stale: false, prob: null, probBug: -1, sig: null, sel: 0, done: false,
    fixed: lv.bugs.map(() => false), found: lv.bugs.map(() => false), hintStage: lv.bugs.map(() => 0), answers: new Map(), genericHint: false,
  });
  const st = () => {
    const lv = level();
    if (!store.has(lv.key)) store.set(lv.key, fresh(lv));
    return store.get(lv.key);
  };
  const expected = () => {
    const lv = level();
    if (!expCache.has(lv.key)) expCache.set(lv.key, expectedOutputs(lv, lang));
    return expCache.get(lv.key);
  };

  // ------------------------------------------------------------------ layout
  const main = document.createElement('div');
  main.className = 'bh';
  rootEl.appendChild(main);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls bh-ctl';
  rootEl.appendChild(ctrlPanel);

  const head = document.createElement('header');
  head.className = 'bh-head';
  const lvEl = document.createElement('div');
  lvEl.className = 'bh-lv';
  const titleEl = document.createElement('h2');
  titleEl.className = 'bh-title';
  const storyEl = document.createElement('p');
  storyEl.className = 'bh-story';
  const meta = document.createElement('div');
  meta.className = 'bh-meta';
  const tracker = document.createElement('ul');
  tracker.className = 'bh-tracker';
  tracker.setAttribute('aria-label', T('Hidden bugs', 'Bug tersembunyi'));
  const chips = document.createElement('div');
  chips.className = 'bh-chips';
  meta.append(tracker, chips);
  head.append(lvEl, titleEl, storyEl, meta);

  const grid = document.createElement('div');
  grid.className = 'bh-grid';

  // toolbar + editor + console
  const bar = document.createElement('div');
  bar.className = 'bh-bar';
  const bRun = button({ label: T('▶ Run tests', '▶ Jalankan uji'), primary: true, onClick: () => runTests() });
  bRun.el.setAttribute('aria-label', T('Run tests: check the code and run every test case', 'Jalankan uji: periksa kode dan jalankan setiap kasus uji'));
  const tip = document.createElement('p');
  tip.className = 'bh-tip';
  tip.innerHTML = T('Edit the code, then run the tests again. Shortcut: <kbd>Ctrl</kbd>+<kbd>Enter</kbd> in the editor.',
    'Ubah kode, lalu jalankan uji lagi. Pintasan: <kbd>Ctrl</kbd>+<kbd>Enter</kbd> di editor.');
  bar.append(bRun.el, tip);

  const cp = codePanel({
    value: '', language: 'python', editable: true, minLines: 6, maxLines: narrow ? 14 : 18, title: 'main.py', locale: lang,
    ariaLabel: T('Python program with hidden bugs (editable)', 'Program Python berisi bug tersembunyi (dapat diedit)'),
    onChange: (src) => onEdit(src),
  });
  const restoreBtn = document.createElement('button');
  restoreBtn.type = 'button';
  restoreBtn.textContent = T('↺ Original code', '↺ Kode awal');
  restoreBtn.title = T('Put the buggy program back (your score is kept)', 'Kembalikan program awal yang berbug (skormu tetap)');
  restoreBtn.addEventListener('click', () => restoreCode());
  cp.actions.appendChild(restoreBtn);
  // Ctrl/Cmd+Enter runs the tests (capture phase, before the editor turns Enter into a new line)
  const onKey = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); e.stopPropagation(); runTests(); }
  };
  cp.el.addEventListener('keydown', onKey, true);

  const out = consolePanel({
    minLines: 4, maxLines: narrow ? 8 : 10, title: T('Console: python3 main.py', 'Konsol: python3 main.py'), locale: lang,
    ariaLabel: T('Console output of the selected test case', 'Keluaran konsol untuk kasus uji yang dipilih'),
    placeholder: T('Run the tests: the console shows the selected test case as it would look in a terminal.', 'Jalankan uji: konsol menampilkan kasus uji yang dipilih seperti di terminal.'),
  });
  grid.append(bar, cp.el);

  // diagnosis
  const diag = document.createElement('section');
  diag.className = 'bh-diag';
  diag.setAttribute('aria-label', T('What went wrong?', 'Apa yang salah?'));
  grid.append(diag, out.el);

  // test cases
  const tests = document.createElement('section');
  tests.className = 'bh-sec';
  tests.setAttribute('aria-label', T('Test cases', 'Kasus uji'));
  const testsH = document.createElement('div');
  testsH.className = 'bh-sec-h';
  testsH.innerHTML = `<h3>${esc(T('Test cases', 'Kasus uji'))}</h3><small>${esc(T('Each test feeds input() and compares what the program prints with the expected output. Choose a number to see that run in the console.',
    'Setiap uji mengisi input() dan membandingkan cetakan program dengan keluaran yang diharapkan. Pilih nomornya untuk melihat jalannya di konsol.'))}</small>`;
  const testsB = document.createElement('div');
  testsB.className = 'bh-sec-b';
  tests.append(testsH, testsB);

  // bug log (Tabel 16 of PP 03)
  const log = document.createElement('section');
  log.className = 'bh-sec';
  log.setAttribute('aria-label', T('Bug log', 'Tabel temuan kesalahan'));
  const logH = document.createElement('div');
  logH.className = 'bh-sec-h';
  logH.innerHTML = `<h3>${esc(T('Bug log', 'Tabel temuan kesalahan'))}</h3><small>${esc(T('Every problem you classify is logged here.', 'Setiap masalah yang kamu klasifikasikan dicatat di sini.'))}</small>`;
  const logB = document.createElement('div');
  logB.className = 'bh-sec-b';
  log.append(logH, logB);

  // answer key (spoiler) for teachers
  const sol = document.createElement('details');
  sol.className = 'bh-sec bh-sol';
  const solSum = document.createElement('summary');
  solSum.textContent = T('Answer key for teachers: the bugs and the corrected program', 'Kunci untuk guru: daftar bug dan program yang sudah diperbaiki');
  const solB = document.createElement('div');
  solB.className = 'bh-sol-b';
  sol.append(solSum, solB);
  let solCp = null;
  sol.addEventListener('toggle', () => { if (sol.open) renderKey(); });

  const live = document.createElement('div');
  live.className = 'bh-sr';
  live.setAttribute('aria-live', 'polite');

  main.append(head, grid, tests, log, sol, live);
  const announce = (msg) => { live.textContent = ''; requestAnimationFrame(() => { live.textContent = msg; }); };

  // ------------------------------------------------------------------ controls
  const levelSel = select({
    label: T('Level', 'Level'), key: 'level', value: LEVELS[0].key,
    options: LEVELS.map((lv, i) => ({ value: lv.key, label: `${i + 1}. ${lv.name[lang]}` })),
    onChange: (v) => loadLevel(v),
  });
  const selEl = levelSel.el.querySelector('select');
  const cmeta = document.createElement('p');
  cmeta.className = 'bh-cmeta';
  const bRestart = button({ label: T('Restart this level', 'Ulangi level ini'), onClick: () => restartLevel() });
  bRestart.el.title = T('Original code, and runs, answers and hints back to zero', 'Kode awal, dan jumlah jalan, jawaban, serta petunjuk kembali ke nol');
  const ref = document.createElement('div');
  ref.className = 'bh-ref';
  ref.innerHTML = `<h3>${esc(T('Three kinds of error', 'Tiga jenis kesalahan'))}</h3><dl>`
    + `<dt class="k-syntax">${esc(KIND.syntax.name)}</dt><dd>${esc(T('Found before the program runs: SyntaxError or IndentationError with a caret ^. Not one line runs.', 'Ketahuan sebelum program berjalan: SyntaxError atau IndentationError dengan tanda ^. Tidak ada satu baris pun yang dijalankan.'))}</dd>`
    + `<dt class="k-runtime">${esc(KIND.runtime.name)}</dt><dd>${esc(T('The program starts, then stops at one line with a traceback: NameError, TypeError, ValueError, IndexError, ZeroDivisionError…', 'Program mulai berjalan, lalu berhenti di satu baris dengan traceback: NameError, TypeError, ValueError, IndexError, ZeroDivisionError…'))}</dd>`
    + `<dt class="k-logic">${esc(KIND.logic.name)}</dt><dd>${esc(T('No message at all: the program finishes but the output is wrong. Only a test with a known answer catches it.', 'Tidak ada pesan sama sekali: program selesai tetapi keluarannya salah. Hanya uji dengan jawaban yang sudah diketahui yang dapat menangkapnya.'))}</dd></dl>`;

  const lab = labPanel({
    title: 'Bug hunt lab',
    filename: 'bug-hunt-data.csv',
    columns: [
      { key: 'level', label: 'Level' },
      { key: 'runs', label: 'Runs' },
      { key: 'fixed', label: 'Bugs fixed' },
      { key: 'tests', label: 'Tests passed' },
      { key: 'accuracy', label: 'Classification accuracy' },
      { key: 'hints', label: 'Hints' },
    ],
    procedure: [
      'Level 1: press Run tests, classify the first problem with the Syntax / Runtime / Logic buttons, read the traceback helper, fix one thing and run again until every test passes. Record the level.',
      'Level 2 (pocket money): find its three bugs in the order Python reveals them and compare your bug log with the answer key. Record.',
      'Levels 3 and 4: which test case catches the > / >= bug, a normal value or a boundary value? Record each level.',
      'Levels 5 to 7: which bugs would you miss if you only tested normal values (no empty, 0 or out-of-range input)? Record each level.',
      'Compare runs, hints and classification accuracy across the levels you recorded.',
    ],
    predict: 'Before you start: which kind of error do you expect to be hardest to find, syntax, runtime or logic? Why?',
    source: () => {
      const s = st();
      if (!s.runs) return null;
      const lv = level();
      const nAns = s.answers.size;
      const right = [...s.answers.values()].filter((a) => a.correct).length;
      return {
        level: `${li + 1}. ${lv.name.en}`,
        runs: s.runs,
        fixed: `${s.fixed.filter(Boolean).length}/${lv.bugs.length}`,
        tests: s.res && s.res.compiled ? `${s.res.tests.filter((r) => r.pass).length}/${lv.tests.length}` : `0/${lv.tests.length}`,
        accuracy: nAns ? `${right}/${nAns} (${Math.round((100 * right) / nAns)}%)` : '-',
        hints: s.hints,
      };
    },
  });
  ctrlPanel.append(levelSel.el, cmeta, bRestart.el, ref, lab.el);

  // ------------------------------------------------------------------ actions
  function loadLevel(key) {
    const i = LEVELS.findIndex((lv) => lv.key === key);
    if (i < 0) return;
    if (i !== li) st().code = cp.value;
    li = i;
    if (selEl.value !== key) selEl.value = key;
    cp.value = st().code;
    cp.clearMarks();
    cp.setActiveLine(null);
    renderAll();
    if (sol.open) renderKey();
  }

  function onEdit(src) {
    const s = st();
    s.code = src;
    if (s.res && !s.stale) {
      s.stale = true;
      renderDiag();
      renderTests();
      renderHead();
    }
  }

  function restoreCode() {
    const s = st();
    const lv = level();
    s.code = lv.code[lang];
    cp.value = s.code;
    s.res = null; s.stale = false; s.prob = null; s.probBug = -1; s.sig = null; s.sel = 0; s.genericHint = false;
    s.fixed = lv.bugs.map(() => false);
    s.found = lv.bugs.map(() => false);
    renderAll();
    announce(T('The original buggy code is back. Run the tests to start again.', 'Kode awal yang berbug sudah kembali. Jalankan uji untuk mulai lagi.'));
  }

  function restartLevel() {
    store.delete(level().key);
    loadLevel(level().key);
    updateOptions();
    announce(T('Level restarted.', 'Level dimulai ulang.'));
  }

  function sigOf(prob, b) {
    if (b >= 0) return `B${b}:${prob.kind}`;
    if (prob.error) return `N:${prob.kind}:${prob.error.type}:${prob.error.message}:${(prob.error.text || '').trim()}`;
    return `N:${prob.kind}:test${prob.test}`;
  }

  function runTests() {
    const s = st();
    const lv = level();
    s.code = cp.value;
    s.runs++;
    const res = evaluate(lv, lang, s.code, expected());
    s.res = res;
    s.stale = false;
    s.fixed = bugStatus(lv, lang, res, s.code, s.fixed, expected());
    s.fixed.forEach((f, i) => { if (f) s.found[i] = true; });
    const prob = firstProblem(res);
    s.prob = prob;
    s.probBug = mapBug(lv, prob, s.fixed);
    if (s.probBug >= 0) s.found[s.probBug] = true;
    s.sig = prob ? sigOf(prob, s.probBug) : null;
    s.genericHint = false;
    if (prob && prob.test >= 0) s.sel = prob.test;
    else if (res.compiled) s.sel = Math.max(0, Math.min(s.sel, lv.tests.length - 1));
    if (!prob) { s.done = true; updateOptions(); }
    renderAll();
    const nPass = res.compiled ? res.tests.filter((r) => r.pass).length : 0;
    const n = lv.tests.length;
    let msg;
    if (!prob) msg = n === 1 ? T('The test passes. Level complete!', 'Ujinya lolos. Level selesai!') : T(`All ${n} tests pass. Level complete!`, `Semua ${n} uji lolos. Level selesai!`);
    else if (prob.kind === 'syntax') msg = T(`${prob.error.type} on line ${prob.error.line}. The program did not start.`, `${prob.error.type} di baris ${prob.error.line}. Program tidak jalan.`);
    else if (prob.error) msg = T(`Tests: ${nPass} of ${n} passed. Test ${prob.test + 1} stopped with ${prob.error.type} on line ${prob.error.line}.`, `Uji: ${nPass} dari ${n} lolos. Uji ${prob.test + 1} berhenti dengan ${prob.error.type} di baris ${prob.error.line}.`);
    else msg = T(`Tests: ${nPass} of ${n} passed. Test ${prob.test + 1} gives the wrong output.`, `Uji: ${nPass} dari ${n} lolos. Uji ${prob.test + 1} memberi keluaran yang salah.`);
    announce(msg + (prob ? ' ' + T('What kind of error is it?', 'Kesalahan jenis apa ini?') : ''));
  }

  function classify(kind) {
    const s = st();
    if (!s.prob) return;
    let a = s.answers.get(s.sig);
    if (!a) {
      const p = s.prob;
      const r = p.test >= 0 && s.res.tests ? s.res.tests[p.test] : null;
      let symptom;
      if (p.error && p.loop) symptom = T(`test ${p.test + 1} never finished (endless loop)`, `uji ${p.test + 1} tidak pernah selesai (perulangan tanpa akhir)`);
      else if (p.error) symptom = `${p.error.type}: ${p.error.message}` + (p.kind === 'runtime' ? T(` (test ${p.test + 1})`, ` (uji ${p.test + 1})`) : '');
      else {
        const k = r.diff;
        const act = outLines(r.printed)[k];
        const exp = outLines(expected()[p.test])[k];
        symptom = T(`test ${p.test + 1}: ${act == null ? 'nothing' : `"${clip(act, 40)}"`} instead of ${exp == null ? 'nothing' : `"${clip(exp, 40)}"`}`,
          `uji ${p.test + 1}: ${act == null ? 'tidak ada' : `"${clip(act, 40)}"`} padahal seharusnya ${exp == null ? 'tidak ada' : `"${clip(exp, 40)}"`}`);
      }
      a = { answer: kind, correct: kind === p.kind, kind: p.kind, bug: s.probBug, line: p.error && !p.loop ? p.error.line : null, symptom, sig: s.sig, prob: p };
      s.answers.set(s.sig, a);
      renderHead();
      renderLog();
    }
    renderDiag();
    const fb = diag.querySelector('.bh-fb');
    if (fb) announce(fb.textContent);
  }

  function hint() {
    const s = st();
    if (!s.prob) return;
    const b = s.probBug;
    if (b < 0) { if (!s.genericHint) s.hints++; s.genericHint = true; renderDiag(); renderHead(); announce(diag.querySelector('.bh-hints')?.textContent || ''); return; }
    if (s.hintStage[b] < 3) { s.hintStage[b]++; s.hints++; }
    renderDiag();
    renderHead();
    const items = diag.querySelectorAll('.bh-hints > li');
    if (items.length) announce(items[items.length - 1].textContent);
  }

  function selectTest(i) {
    const s = st();
    s.sel = i;
    renderTests();
    renderConsole();
    renderMarks();
  }

  function updateOptions() {
    [...selEl.options].forEach((o, i) => {
      const s = store.get(LEVELS[i].key);
      o.textContent = `${i + 1}. ${LEVELS[i].name[lang]}${s && s.done ? ' ✓' : ''}`;
    });
  }

  // ------------------------------------------------------------------ rendering
  function renderAll() {
    renderHead();
    renderDiag();
    renderTests();
    renderConsole();
    renderMarks();
    renderLog();
    const lv = level();
    cmeta.textContent = T(`${lv.bugs.length} hidden bugs · ${lv.tests.length} test case${lv.tests.length > 1 ? 's' : ''}`, `${lv.bugs.length} bug tersembunyi · ${lv.tests.length} kasus uji`);
  }

  function renderHead() {
    const s = st();
    const lv = level();
    lvEl.textContent = T(`Level ${li + 1} of ${LEVELS.length}`, `Level ${li + 1} dari ${LEVELS.length}`);
    titleEl.textContent = lv.name[lang];
    storyEl.textContent = lv.story[lang];
    tracker.innerHTML = lv.bugs.map((b, i) => {
      const fixed = s.fixed[i];
      const state = fixed ? 'is-fixed' : s.found[i] ? 'is-found' : 'is-hidden';
      const mark = fixed ? '✓' : s.found[i] ? '!' : '?';
      const label = fixed ? T(`Bug ${i + 1}: fixed (${KIND[b.kind].name}: ${b.title.en})`, `Bug ${i + 1}: sudah diperbaiki (${KIND[b.kind].name}: ${b.title.id})`)
        : s.found[i] ? T(`Bug ${i + 1}: found, not fixed yet`, `Bug ${i + 1}: ditemukan, belum diperbaiki`)
          : T(`Bug ${i + 1}: not found yet`, `Bug ${i + 1}: belum ditemukan`);
      return `<li class="bh-bug ${state}" title="${esc(label)}">${BUG_SVG}<span aria-hidden="true">${i + 1} ${mark}</span><span class="bh-sr">${esc(label)}</span></li>`;
    }).join('');
    const nFixed = s.fixed.filter(Boolean).length;
    const nAns = s.answers.size;
    const right = [...s.answers.values()].filter((a) => a.correct).length;
    const tp = s.res ? (s.res.compiled ? s.res.tests.filter((r) => r.pass).length : 0) : null;
    chips.innerHTML = [
      [T('Bugs fixed', 'Bug diperbaiki'), `${nFixed} / ${lv.bugs.length}`],
      [T('Classified right', 'Klasifikasi benar'), nAns ? `${right} / ${nAns}` : '–'],
      [T('Tests passed', 'Uji lolos'), tp == null ? '–' : `${tp} / ${lv.tests.length}${s.stale ? '*' : ''}`],
      [T('Runs', 'Jalan'), String(s.runs)],
      [T('Hints', 'Petunjuk'), String(s.hints)],
    ].map(([k, v]) => `<span class="bh-chip">${esc(k)} <b>${esc(v)}</b></span>`).join('');
  }

  function kindHtml(k) {
    return `<span class="bh-kind k-${k}">${esc(KIND[k].name)}</span>`;
  }

  /** The traceback, one line at a time, each with a note saying what that line tells you. */
  function tracebackHtml(e) {
    const lines = e.traceback.split('\n');
    while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
    const isSyntax = /^(Syntax|Indentation|Tab)Error$/.test(e.type);
    const items = [];
    for (let i = 0; i < lines.length; i++) {
      const ln = lines[i];
      let m;
      let note;
      let code = esc(ln);
      let caret = false;
      const last = i === lines.length - 1;
      if (/^Traceback \(most recent call last\):$/.test(ln)) {
        note = T('Start of the report. Read it from the bottom up.', 'Awal laporan. Bacalah dari bawah ke atas.');
      } else if ((m = ln.match(/^\s*File "(.+?)", line (\d+)(?:, in (.+))?$/))) {
        note = !m[3] ? T(`Where: line ${m[2]} of ${m[1]}. Python found this before running anything.`, `Di mana: baris ${m[2]} pada ${m[1]}. Python menemukannya sebelum menjalankan apa pun.`)
          : m[3] === '<module>' ? T(`Where: line ${m[2]} of ${m[1]}, in the main program (<module>).`, `Di mana: baris ${m[2]} pada ${m[1]}, di program utama (<module>).`)
            : T(`Where: line ${m[2]}, inside the function ${m[3]}().`, `Di mana: baris ${m[2]}, di dalam fungsi ${m[3]}().`);
      } else if (last) {
        note = T('Read this first: the kind of error, a colon, then the message.', 'Baca ini dulu: jenis error, titik dua, lalu pesannya.');
      } else if (/^During handling|^The above exception/.test(ln)) {
        note = T('A second error happened while the first one was being handled.', 'Error kedua terjadi saat error pertama sedang ditangani.');
      } else if (ln.trim()) {
        // a code line, possibly followed by a caret line
        const next = lines[i + 1];
        if (next != null && /^\s*[\^~]+\s*$/.test(next) && i + 1 < lines.length - 1) {
          code = `${esc(ln)}\n<span class="car">${esc(next)}</span>`;
          caret = true;
          i++;
          note = T('The line, and a caret ^ under the spot where Python got stuck. The real mistake is often just before it, or on the line above.',
            'Barisnya, dengan tanda ^ di bawah tempat Python tersendat. Kesalahan sebenarnya sering tepat sebelumnya, atau di baris atasnya.');
        } else {
          note = isSyntax ? T('The line Python could not understand.', 'Baris yang tidak dapat dipahami Python.') : T('The line of code that was running.', 'Baris kode yang sedang dijalankan.');
        }
      } else continue;
      items.push(`<li class="${last ? 'is-last' : ''}"><pre class="bh-tbc${caret ? ' is-caret' : ''}">${code}</pre><span class="bh-tbn">${esc(note)}</span></li>`);
    }
    return `<div class="bh-tb"><div class="bh-tb-h">${esc(T('Read the traceback (start at the last line)', 'Membaca traceback (mulai dari baris terakhir)'))}</div>`
      + `<ol>${items.join('')}</ol><p class="bh-plain"><b>${esc(T('In plain words:', 'Dalam bahasa sederhana:'))}</b> ${explainError(e, T)}</p>`
      + goHtml(e.line) + '</div>';
  }

  function goHtml(line) {
    return line ? `<div class="bh-tb-go"><button type="button" data-go="${line}">${esc(T(`Go to line ${line} in the editor`, `Ke baris ${line} di editor`))}</button></div>` : '';
  }

  /** An endless loop: Python prints no traceback at all (it keeps running), so there is none to read. */
  function loopHtml(e) {
    return `<div class="bh-tb"><div class="bh-tb-h">${esc(T('No traceback: Python itself would never stop this program', 'Tanpa traceback: Python sendiri tidak akan pernah menghentikan program ini'))}</div>`
      + `<p class="bh-plain bh-plain--top"><b>${esc(T('In plain words:', 'Dalam bahasa sederhana:'))}</b> ${explainError(e, T)}</p>`
      + goHtml(e.line) + '</div>';
  }

  function hintsHtml(s) {
    const lv = level();
    const b = s.probBug;
    if (b < 0) {
      const p = s.prob;
      const where = p.error && !p.loop ? T(` Start at line ${p.error.line}.`, ` Mulailah dari baris ${p.error.line}.`) : '';
      const txt = p.loop
        ? T('This endless loop is not one of the hidden bugs: it came from a change you made. Which line should make the loop stop?', 'Perulangan tanpa akhir ini bukan salah satu bug tersembunyi: ia muncul dari perubahan yang kamu buat. Baris mana yang seharusnya menghentikan perulangan?')
        : !p.error
          ? T('This wrong output is not one of the hidden bugs: it came from a change you made. Compare the expected and the printed line above, find the line of code that prints it, and check what that line prints (text in quotes is printed as it is; a variable prints its value).',
            'Keluaran yang salah ini bukan salah satu bug tersembunyi: ia muncul dari perubahan yang kamu buat. Bandingkan baris yang diharapkan dan yang dicetak di atas, temukan baris kode yang mencetaknya, lalu periksa apa yang dicetaknya (teks di dalam tanda petik dicetak apa adanya; variabel dicetak nilainya).')
          : T('This problem is not one of the hidden bugs: it came from a change you made. Read the message, undo or repair that change, and run again.', 'Masalah ini bukan salah satu bug tersembunyi: ia muncul dari perubahan yang kamu buat. Baca pesannya, batalkan atau perbaiki perubahan itu, lalu jalankan lagi.') + where;
      return { button: T('💡 Hint', '💡 Petunjuk'), list: s.genericHint ? `<ol class="bh-hints"><li>${esc(txt)}</li></ol>` : '', more: !s.genericHint };
    }
    const bug = lv.bugs[b];
    const stage = s.hintStage[b];
    const items = [];
    for (let k = 0; k < Math.min(stage, 2); k++) items.push(`<li>${esc(bug.hint[lang][k])}</li>`);
    if (stage >= 3) {
      const pairs = bug.fix[lang].map(([from, to]) => `<div class="bh-fix"><span>${esc(T('Replace', 'Ganti'))}</span><pre class="from cp-hl">${highlight(from.replace(/\n$/, ''), 'python').join('\n')}</pre>`
        + `<span>${esc(T('with', 'dengan'))}</span><pre class="to cp-hl">${highlight(to.replace(/\n$/, ''), 'python').join('\n')}</pre></div>`).join('');
      items.push(`<li>${esc(T('One way to fix it:', 'Salah satu cara memperbaikinya:'))}${pairs}</li>`);
    }
    const label = stage >= 3 ? T('💡 All 3 hints shown', '💡 Ketiga petunjuk sudah dibuka') : T(`💡 Hint ${stage + 1} of 3`, `💡 Petunjuk ${stage + 1} dari 3`);
    return { button: label, list: items.length ? `<ol class="bh-hints">${items.join('')}</ol>` : '', more: stage < 3 };
  }

  function renderDiag() {
    const s = st();
    const lv = level();
    const parts = [];
    if (!s.res) {
      parts.push(`<h3 class="bh-dh k-none"><span class="ic" aria-hidden="true">?</span><span>${esc(T(`${lv.bugs.length} bugs are hiding in this program`, `${lv.bugs.length} bug bersembunyi di program ini`))}</span></h3>`);
      parts.push(`<ol class="bh-steps"><li>${esc(T('Press ▶ Run tests. Python checks the whole file, then runs every test case.', 'Tekan ▶ Jalankan uji. Python memeriksa seluruh berkas, lalu menjalankan setiap kasus uji.'))}</li>`
        + `<li>${esc(T('Look at the first problem: a traceback (read its last line first) or a test whose output is wrong.', 'Lihat masalah pertama: traceback (baca baris terakhirnya dulu) atau uji yang keluarannya salah.'))}</li>`
        + `<li>${esc(T('Decide what kind of error it is: syntax, runtime or logic.', 'Tentukan jenis kesalahannya: sintaks, runtime, atau logika.'))}</li>`
        + `<li>${esc(T('Change one thing in the code, then run the tests again.', 'Ubah satu hal di kode, lalu jalankan uji lagi.'))}</li></ol>`);
      parts.push(`<p class="bh-p muted">${esc(T('Errors queue up: syntax errors appear first (for the whole file), then runtime errors (when a line runs), and logic errors only show when you compare the output with the expected output.', 'Kesalahan mengantre: kesalahan sintaks muncul paling dulu (untuk seluruh berkas), lalu kesalahan runtime (saat barisnya dijalankan), dan kesalahan logika baru tampak jika keluaran dibandingkan dengan keluaran yang diharapkan.'))}</p>`);
      diag.innerHTML = parts.join('');
      return;
    }
    if (s.stale) parts.push(`<p class="bh-stale">${esc(T('✎ You changed the code. Press ▶ Run tests to check it; the report below is from the last run.', '✎ Kode sudah kamu ubah. Tekan ▶ Jalankan uji untuk memeriksanya; laporan di bawah berasal dari jalan terakhir.'))}</p>`);
    const p = s.prob;
    if (!p) {
      const nAns = s.answers.size;
      const right = [...s.answers.values()].filter((a) => a.correct).length;
      parts.push(`<h3 class="bh-dh k-done"><span class="ic" aria-hidden="true">✓</span><span>${esc(lv.tests.length === 1 ? T('The test passes: level complete!', 'Ujinya lolos: level selesai!') : T(`All ${lv.tests.length} tests pass: level complete!`, `Semua ${lv.tests.length} uji lolos: level selesai!`))}</span></h3>`);
      parts.push(`<div class="bh-done"><p class="bh-p">${esc(T(`Bugs fixed: ${s.fixed.filter(Boolean).length} of ${lv.bugs.length}. Runs: ${s.runs}. Classified right: ${right} of ${nAns}. Hints: ${s.hints}.`,
        `Bug diperbaiki: ${s.fixed.filter(Boolean).length} dari ${lv.bugs.length}. Jalan: ${s.runs}. Klasifikasi benar: ${right} dari ${nAns}. Petunjuk: ${s.hints}.`))}</p>`
        + `<p class="bh-p muted">${esc(T('The lines you changed are marked green in the editor. Record the level in the lab panel, and compare your bug log with the answer key below.', 'Baris yang kamu ubah ditandai hijau di editor. Catat level ini di panel lab, dan bandingkan tabel temuanmu dengan kunci di bawah.'))}</p>`
        + (li < LEVELS.length - 1 ? `<button type="button" class="btn btn--primary" data-next="1">${esc(T(`Next level: ${LEVELS[li + 1].name[lang]} ▶`, `Level berikutnya: ${LEVELS[li + 1].name[lang]} ▶`))}</button>` : `<p class="bh-p"><b>${esc(T('That was the last level. Well hunted!', 'Itu level terakhir. Perburuan yang hebat!'))}</b></p>`)
        + '</div>');
      diag.innerHTML = parts.join('');
      return;
    }
    const r = p.test >= 0 ? s.res.tests[p.test] : null;
    const tn = p.test + 1;
    let head;
    if (p.kind === 'syntax') head = T(`${p.error.type} on line ${p.error.line}: the program did not start`, `${p.error.type} di baris ${p.error.line}: program tidak jalan sama sekali`);
    else if (p.loop) head = T(`Test ${tn} never finished`, `Uji ${tn} tidak pernah selesai`);
    else if (p.error) head = T(`Test ${tn} stopped with ${p.error.type} on line ${p.error.line}`, `Uji ${tn} berhenti dengan ${p.error.type} di baris ${p.error.line}`);
    else head = T(`Test ${tn} gives the wrong output`, `Uji ${tn} memberi keluaran yang salah`);
    const hk = p.loop ? 'logic' : p.kind;
    parts.push(`<h3 class="bh-dh k-${hk}"><span class="ic" aria-hidden="true">!</span><span>${esc(head)}</span></h3>`);
    if (p.kind === 'syntax') {
      parts.push(`<p class="bh-p muted">${esc(T('Python checked the grammar of the whole file before running it, so no test ran at all.', 'Python memeriksa tata bahasa seluruh berkas sebelum menjalankannya, jadi tidak ada satu uji pun yang berjalan.'))}</p>`);
    } else if (p.error) {
      const ins = inputsOf(lv.tests[p.test], lang);
      const inEn = ins.length ? ins.map((v) => (v === '' ? '(empty)' : v)).join(', ') : '(none)';
      const inId = ins.length ? ins.map((v) => (v === '' ? '(kosong)' : v)).join(', ') : '(tidak ada)';
      parts.push(`<p class="bh-p muted">${esc(p.loop
        ? T(`Input: ${inEn}. After ${limitWhat(p.error, T)} the program was still running, so the sim stopped it at line ${p.error.line}.`,
          `Masukan: ${inId}. Setelah ${limitWhat(p.error, T)} program masih berjalan, jadi simulasi menghentikannya di baris ${p.error.line}.`)
        : T(`Input: ${inEn}. The program ran until line ${p.error.line}, then stopped.`, `Masukan: ${inId}. Program berjalan sampai baris ${p.error.line}, lalu berhenti.`))}</p>`);
    } else {
      const k = r.diff;
      const act = outLines(r.printed)[k];
      const exp = outLines(expected()[p.test])[k];
      const ins = inputsOf(lv.tests[p.test], lang);
      const none = `<em class="bh-none">${esc(T('(nothing)', '(tidak ada)'))}</em>`;
      parts.push(`<p class="bh-p muted">${esc(T(`Input: ${ins.length ? ins.map((v) => (v === '' ? '(empty)' : v)).join(', ') : '(none)'} (${TAGS[lv.tests[p.test].tag]}). Output line ${k + 1}:`,
        `Masukan: ${ins.length ? ins.map((v) => (v === '' ? '(kosong)' : v)).join(', ') : '(tidak ada)'} (${TAGS[lv.tests[p.test].tag]}). Baris keluaran ke-${k + 1}:`))}</p>`);
      parts.push(`<div class="bh-cmp"><div class="exp"><span>${esc(T('expected', 'diharapkan'))}</span>${exp == null ? none : `<code>${esc(exp)}</code>`}</div>`
        + `<div class="act"><span>${esc(T('printed', 'dicetak'))}</span>${act == null ? none : `<code>${esc(act)}</code>`}</div></div>`);
      parts.push(`<p class="bh-p muted">${esc(T('No traceback: Python saw nothing wrong, the program did exactly what it was told. Only comparing the output with the expected output shows this bug.', 'Tidak ada traceback: Python tidak melihat ada yang salah, program melakukan persis apa yang diperintahkan. Hanya dengan membandingkan keluaran dengan keluaran yang diharapkan bug ini terlihat.'))}</p>`);
    }
    // classify
    const a = s.answers.get(s.sig);
    parts.push(`<p class="bh-q" id="bh-q-${li}">${esc(T('What kind of error is this?', 'Kesalahan jenis apa ini?'))}</p>`);
    parts.push(`<div class="bh-cls" role="group" aria-labelledby="bh-q-${li}">${KINDS.map((k) => `<button type="button" class="k-${k}" data-kind="${k}" aria-pressed="${a && a.answer === k ? 'true' : 'false'}">${esc(KIND[k].short)}<small>${esc(KIND[k].sub)}</small></button>`).join('')}</div>`);
    if (a) {
      const why = p.loop
        ? T('Python never complains about an endless loop: it just keeps running. The sim stopped it after a fixed number of steps. The loop condition never becomes False, so this is a logic error.', 'Python tidak pernah protes tentang perulangan tanpa akhir: ia terus berjalan. Simulasi menghentikannya setelah sejumlah langkah. Kondisi perulangannya tidak pernah menjadi False, jadi ini kesalahan logika.')
        : p.kind === 'syntax' ? T('Python checks the grammar of the whole file before it runs anything, so a SyntaxError or IndentationError means not a single line ran.', 'Python memeriksa tata bahasa seluruh berkas sebelum menjalankan apa pun, jadi SyntaxError atau IndentationError berarti tidak ada satu baris pun yang dijalankan.')
          : p.kind === 'runtime' ? T('The program started and ran until this line, then stopped with a traceback. An error that happens while the program runs is a runtime error (an exception).', 'Program sudah mulai dan berjalan sampai baris ini, lalu berhenti dengan traceback. Error yang terjadi saat program berjalan adalah kesalahan runtime (exception).')
            : T('There is no error message at all: the program finished, but its output is wrong. Only a test with a known expected output catches a logic error.', 'Tidak ada pesan error sama sekali: program selesai, tetapi keluarannya salah. Hanya uji dengan keluaran yang sudah diketahui yang dapat menangkap kesalahan logika.');
      parts.push(a.correct
        ? `<p class="bh-fb ok" tabindex="-1"><b>${esc(T('✓ Right:', '✓ Benar:'))}</b> ${esc(KIND[p.kind].name)}. ${esc(why)}</p>`
        : `<p class="bh-fb bad" tabindex="-1"><b>${esc(T('✗ Not quite.', '✗ Belum tepat.'))}</b> ${esc(T(`It is a ${KIND[p.kind].name.toLowerCase()}. `, `Ini ${KIND[p.kind].name.toLowerCase()}. `))}${esc(why)}</p>`);
    }
    if (p.error) parts.push(p.loop ? loopHtml(p.error) : tracebackHtml(p.error));
    const h = hintsHtml(s);
    parts.push(`<div class="bh-hintrow"><button type="button" class="btn" data-hint="1"${h.more ? '' : ' aria-disabled="true"'}>${esc(h.button)}</button></div>${h.list}`);
    diag.innerHTML = parts.join('');
  }

  function inputCells(test) {
    const ins = inputsOf(test, lang);
    const cells = ins.length
      ? ins.map((v) => (v === '' ? `<span class="bh-in is-empty">${esc(T('(empty)', '(kosong)'))}</span>` : `<span class="bh-in">${esc(v)}</span>`)).join('')
      : `<span class="bh-in is-empty">${esc(T('(no input)', '(tanpa masukan)'))}</span>`;
    const hot = test.tag !== 'normal';
    return `${cells}<span class="bh-tag${hot ? ' is-hot' : ''}">${esc(TAGS[test.tag])}</span>`;
  }

  function outHtml(text, diffAt, MAXL = 12) {
    const all = outLines(text);
    if (!all.length) return `<em class="bh-none">${esc(T('(nothing printed)', '(tidak mencetak apa pun)'))}</em>`;
    // a runaway loop can print thousands of lines: show the start (and the first difference) only
    const row = (l, i) => (i === diffAt ? `<mark>${esc(clip(l, 200)) || ' '}</mark>` : esc(clip(l, 200)));
    const shown = all.slice(0, MAXL).map(row);
    if (diffAt >= MAXL && diffAt < all.length) shown.push('…', row(all[diffAt], diffAt));
    const more = all.length - Math.min(all.length, MAXL) - (diffAt >= MAXL && diffAt < all.length ? 1 : 0);
    return `<pre>${shown.join('\n')}</pre>`
      + (more > 0 ? `<span class="bh-calc">${esc(T(`… ${more} more line${more > 1 ? 's' : ''} not shown`, `… ${more} baris lagi tidak ditampilkan`))}</span>` : '');
  }

  function renderTests() {
    const s = st();
    const lv = level();
    const exp = expected();
    const res = s.res;
    const rows = lv.tests.map((t, i) => {
      const r = res && res.compiled ? res.tests[i] : null;
      let act, result;
      if (!res) {
        act = '<span class="bh-none">—</span>';
        result = `<span class="bh-res none">${esc(T('not run', 'belum jalan'))}</span>`;
      } else if (!res.compiled) {
        act = '<span class="bh-none">—</span>';
        result = `<span class="bh-res none">${esc(T('did not start', 'tidak jalan'))}</span>`;
      } else if (r.error) {
        const printed = outLines(r.printed).length ? outHtml(r.printed, -1, 4) : '';
        const what = r.error.type === 'StepLimit' ? T('never finished', 'tidak selesai') : `${r.error.type} (${T('line', 'baris')} ${r.error.line})`;
        act = `${printed}<span class="bh-errl">⚠ ${esc(what)}</span>`;
        result = `<span class="bh-res err">⚠ ${esc(r.error.type === 'StepLimit' ? T('loop', 'loop') : r.error.type)}</span>`;
      } else {
        act = outHtml(r.printed, r.pass ? -1 : r.diff);
        result = r.pass ? `<span class="bh-res ok">✓ ${esc(T('pass', 'lolos'))}</span>` : `<span class="bh-res bad">✗ ${esc(T('fail', 'gagal'))}</span>`;
      }
      const sel = res && res.compiled && s.sel === i;
      const calc = t.calc ? `<span class="bh-calc">${esc(T('by hand: ', 'hitung manual: ') + t.calc[lang])}</span>` : '';
      return `<tr class="${sel ? 'is-sel' : ''}"><td class="c-n"><button type="button" class="bh-tn" data-test="${i}" aria-pressed="${sel ? 'true' : 'false'}"`
        + ` aria-label="${esc(T(`Test ${i + 1}: show it in the console`, `Uji ${i + 1}: tampilkan di konsol`))}"${res && res.compiled ? '' : ' disabled'}>${i + 1}</button></td>`
        + `<td class="c-in" data-label="${esc(T('Input', 'Masukan'))}">${inputCells(t)}</td>`
        + `<td class="c-exp" data-label="${esc(T('Expected output', 'Keluaran yang diharapkan'))}">${outHtml(exp[i], -1)}${calc}</td>`
        + `<td class="c-act" data-label="${esc(T('Program output', 'Keluaran program'))}">${act}</td>`
        + `<td class="c-res" data-label="${esc(T('Result', 'Hasil'))}">${result}</td></tr>`;
    }).join('');
    testsB.innerHTML = `<table class="bh-t bh-tt${s.stale ? ' is-stale' : ''}"><thead><tr><th class="c-n" scope="col">#</th><th scope="col">${esc(T('Input', 'Masukan'))}</th>`
      + `<th scope="col">${esc(T('Expected output', 'Keluaran yang diharapkan'))}</th><th scope="col">${esc(T('Program output', 'Keluaran program'))}</th>`
      + `<th class="c-res" scope="col">${esc(T('Result', 'Hasil'))}</th></tr></thead><tbody>${rows}</tbody></table>`;
  }

  function renderConsole() {
    const s = st();
    const lv = level();
    const res = s.res;
    if (!res) { out.clear(); return; }
    if (!res.compiled) {
      out.set([
        { text: T('$ python3 main.py\n', '$ python3 main.py\n'), kind: 'info' },
        { text: res.syntax.traceback + '\n', kind: 'err' },
        { text: T('(Python found a syntax error before running: no line ran.)\n', '(Python menemukan kesalahan sintaks sebelum berjalan: tidak ada baris yang dijalankan.)\n'), kind: 'info' },
      ]);
      return;
    }
    const i = Math.max(0, Math.min(s.sel, lv.tests.length - 1));
    const r = res.tests[i];
    const ins = inputsOf(lv.tests[i], lang);
    const head = T(`$ python3 main.py    # test ${i + 1}${ins.length ? ', input: ' + ins.map((v) => (v === '' ? '(empty)' : v)).join(', ') : ''}\n`,
      `$ python3 main.py    # uji ${i + 1}${ins.length ? ', masukan: ' + ins.map((v) => (v === '' ? '(kosong)' : v)).join(', ') : ''}\n`);
    const segs = [{ text: head, kind: 'info' }, ...r.segs];
    if (r.error && r.error.type === 'StepLimit') {
      // the sim's own note goes on a line of its own (an endless loop may stop in the middle of a line)
      const tail = segs[segs.length - 1].text;
      segs.push({ text: `${tail.endsWith('\n') ? '' : '\n'}(${T('stopped by the sim after', 'dihentikan simulasi setelah')} ${limitWhat(r.error, T)})\n`, kind: 'info' });
    }
    out.set(segs);
  }

  function renderMarks() {
    const s = st();
    const res = s.res;
    if (!res) { cp.clearMarks(); return; }
    if (s.stale) return;
    if (!res.compiled) {
      const e = res.syntax;
      const col = Math.max(0, (e.col || 1) - 1);
      const end = Math.max(col + 1, (e.endCol || e.col + 1 || 2) - 1);
      cp.setMarks([{ line: e.line, kind: 'error', note: e.type, col, endCol: end }]);
      cp.scrollToLine(e.line);
      return;
    }
    if (!s.prob) {
      const ch = changedLines(level().code[lang].replace(/\n$/, '').split('\n'), s.code.replace(/\n$/, '').split('\n'));
      cp.setMarks(ch.map((j, k) => ({ line: j + 1, kind: 'done', note: k === 0 || ch[k - 1] !== j - 1 ? T('changed', 'diubah') : undefined })));
      return;
    }
    const r = res.tests[Math.max(0, Math.min(s.sel, res.tests.length - 1))];
    if (r && r.error && r.error.line) {
      cp.setMarks([{ line: r.error.line, kind: 'error', note: r.error.type === 'StepLimit' ? T('endless loop?', 'loop tanpa akhir?') : r.error.type }]);
      cp.scrollToLine(r.error.line);
    } else cp.clearMarks();
  }

  function renderLog() {
    const s = st();
    const lv = level();
    const answers = [...s.answers.values()];
    if (!answers.length) {
      logB.innerHTML = `<p class="bh-empty">${esc(T('Nothing logged yet. After a run, classify the problem with the Syntax / Runtime / Logic buttons.', 'Belum ada catatan. Setelah menjalankan uji, klasifikasikan masalahnya dengan tombol Sintaks / Runtime / Logika.'))}</p>`;
      return;
    }
    const present = (a) => {
      // is a problem that was not one of the hidden bugs still there in the last run?
      const res = s.res;
      if (!res) return false;
      if (!res.compiled) return a.prob.kind === 'syntax' && a.prob.error.type === res.syntax.type && a.prob.error.message === res.syntax.message;
      if (a.prob.error) return res.tests.some((r) => r.error && r.error.type === a.prob.error.type && r.error.message === a.prob.error.message);
      return !res.tests[a.prob.test].pass;
    };
    const rows = answers.map((a, n) => {
      let fix;
      if (a.bug >= 0) {
        fix = s.fixed[a.bug] ? `<span class="bh-yes">✓</span> ${esc(lv.bugs[a.bug].title[lang])}` : `<span class="bh-none">${esc(T('not fixed yet', 'belum diperbaiki'))}</span>`;
      } else {
        fix = present(a) ? `<span class="bh-none">${esc(T('still there (a bug you made)', 'masih ada (bug buatanmu)'))}</span>` : `<span class="bh-yes">✓</span> ${esc(T('gone (it was a bug you made)', 'sudah hilang (bug buatanmu)'))}`;
      }
      const yours = a.correct ? kindHtml(a.kind) + ' <span class="bh-yes" aria-label="' + esc(T('correct', 'benar')) + '">✓</span>'
        : kindHtml(a.kind) + ` <span class="bh-no">✗</span> <small>${esc(T(`you said ${KIND[a.answer].short}`, `jawabanmu ${KIND[a.answer].short}`))}</small>`;
      return `<tr><td class="c-n">${n + 1}</td><td class="c-line" data-label="${esc(T('Line', 'Baris ke-'))}">${a.line ?? '—'}</td>`
        + `<td class="c-kind" data-label="${esc(T('Kind', 'Jenis'))}">${yours}</td>`
        + `<td class="c-sym" data-label="${esc(T('Symptom', 'Gejala'))}"><code>${esc(clip(a.symptom, 110))}</code></td>`
        + `<td class="c-fix" data-label="${esc(T('Fix', 'Perbaikan'))}">${fix}</td></tr>`;
    }).join('');
    logB.innerHTML = `<table class="bh-t bh-lt"><thead><tr><th class="c-n" scope="col">No</th><th scope="col">${esc(T('Line', 'Baris ke-'))}</th>`
      + `<th scope="col">${esc(T('Kind of error', 'Jenis kesalahan'))}</th><th scope="col">${esc(T('Symptom', 'Gejala'))}</th><th scope="col">${esc(T('Fix', 'Perbaikan'))}</th></tr></thead><tbody>${rows}</tbody></table>`;
  }

  function renderKey() {
    const lv = level();
    const src = lv.code[lang];
    let staged = src;
    const rows = lv.bugs.map((b, i) => {
      const [from, to] = b.fix[lang][0];
      const fl = from.split('\n'), tl = to.split('\n');
      let d = 0;
      while (d < fl.length - 1 && fl[d] === tl[d]) d++;
      const line = lineOf(staged, from) && lineOf(staged, from) + d;
      staged = applyFixes(staged, [b], lang);
      return `<tr><td class="c-n">${i + 1}</td><td class="c-line" data-label="${esc(T('Line', 'Baris ke-'))}">${line || '—'}</td>`
        + `<td class="c-kind" data-label="${esc(T('Kind', 'Jenis'))}">${kindHtml(b.kind)}</td>`
        + `<td class="c-what" data-label="${esc(T('Bug and fix', 'Bug dan perbaikan'))}">${esc(b.title[lang])}. ${esc(b.hint[lang][1])}</td></tr>`;
    }).join('');
    const solution = applyFixes(src, lv.bugs, lang);
    solB.innerHTML = `<p class="bh-p muted">${esc(T('Lines are counted in the program as it is when that bug is reached (after the earlier fixes). Other correct fixes are fine too: the tests decide.', 'Nomor baris dihitung pada program saat bug itu ditemukan (setelah perbaikan sebelumnya). Perbaikan lain yang benar juga boleh: kasus uji yang menentukan.'))}</p>`
      + `<table class="bh-t bh-kt"><thead><tr><th class="c-n" scope="col">No</th><th scope="col">${esc(T('Line', 'Baris ke-'))}</th><th scope="col">${esc(T('Kind', 'Jenis'))}</th>`
      + `<th scope="col">${esc(T('Bug and fix', 'Bug dan perbaikan'))}</th></tr></thead><tbody>${rows}</tbody></table>`;
    if (!solCp) {
      solCp = codePanel({ value: solution, language: 'python', editable: false, minLines: 3, maxLines: 16, title: T('main.py (corrected)', 'main.py (sudah diperbaiki)'), locale: lang,
        ariaLabel: T('The corrected program', 'Program yang sudah diperbaiki') });
    } else solCp.value = solution;
    solB.appendChild(solCp.el);
  }

  // ------------------------------------------------------------------ events
  const onDiagClick = (e) => {
    const t = e.target.closest('button');
    if (!t || !diag.contains(t)) return;
    if (t.dataset.kind) { classify(t.dataset.kind); diag.querySelector(`button[data-kind="${t.dataset.kind}"]`)?.focus(); }
    else if (t.dataset.hint) { if (t.getAttribute('aria-disabled') !== 'true') { hint(); diag.querySelector('[data-hint]')?.focus(); } }
    else if (t.dataset.go) {
      const s = st();
      const e2 = s.prob && s.prob.error;
      const line = Number(t.dataset.go);
      if (e2 && e2.col && s.prob.kind === 'syntax') cp.select(line, Math.max(0, e2.col - 1), Math.max(e2.col, (e2.endCol || e2.col + 1) - 1));
      else cp.select(line, ((s.code.split('\n')[line - 1] || '').match(/^\s*/) || [''])[0].length);
    } else if (t.dataset.next) {
      const next = LEVELS[li + 1];
      if (next) { levelSel.value = next.key; loadLevel(next.key); bRun.el.focus(); announce(T(`Level ${li + 1}: ${next.name.en}`, `Level ${li + 1}: ${next.name.id}`)); }
    }
  };
  diag.addEventListener('click', onDiagClick);
  const onTestsClick = (e) => {
    const t = e.target.closest('button[data-test]');
    if (!t) return;
    selectTest(Number(t.dataset.test));
    testsB.querySelector(`button[data-test="${t.dataset.test}"]`)?.focus();
  };
  testsB.addEventListener('click', onTestsClick);

  // ------------------------------------------------------------------ start
  updateOptions();
  loadLevel(LEVELS[0].key);

  return () => {
    cp.el.removeEventListener('keydown', onKey, true);
    diag.removeEventListener('click', onDiagClick);
    testsB.removeEventListener('click', onTestsClick);
    cp.destroy();
    out.destroy();
    if (solCp) solCp.destroy();
    main.remove();
    ctrlPanel.remove();
    style.remove();
  };
}
