// Parsons Puzzle / Teka-teki Parsons: the "Parsons Puzzle" class game of PP 03 (8.4 and Tabel 29). The lines of a
// short Python program are shuffled on cards, together with one or two distractor lines that look right but are
// wrong. The student puts the cards in order AND indents them (pointer drag, taps, or the keyboard), then Check
// assembles main.py, runs it in minipy (src/lib/minipy.js) on every test input and compares the output with the
// output of the model answer. Feedback is Python's own SyntaxError / IndentationError, or the first failing test
// plus the first line that differs from the nearest accepted solution.
import { select, toggle, button } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';
import { compile, createRun } from '../../../lib/minipy.js';
import { codePanel, consolePanel, highlight } from '../../../lib/codepanel.js';

// LOGIC-START
// Everything between LOGIC-START and LOGIC-END is plain data and DOM-free functions; the verification script
// (scratchpad work/parsons-puzzle/verify.mjs) extracts this block and checks every program against python3.

const MAX_STEPS = 4000;   // a check stops a program after this many steps (an infinite loop)

// The puzzles. `lines` is the model answer as [indent level, code]: the Indonesian version uses the identifiers and
// messages of PP 02 / PP 03, the English version is the same program in English. `alts` lists other line orders
// that are also correct (as indexes into `lines`). Each distractor imitates line `like` and says why it is wrong.
// Test inputs feed input(); the expected output of a test is what the model answer prints for it.
const PUZZLES = [
  {
    key: 'lulus',
    topic: { en: 'Branching: if / else', id: 'Percabangan: if / else' },
    title: { en: 'Pass or fail', id: 'Predikat kelulusan' },
    task: {
      en: 'A course gives PASS to a final score of at least 75 and FAIL to anything lower. Read the score (it may have decimals, such as 74.9), decide the result, then print it.',
      id: 'Sebuah kursus menyatakan LULUS jika nilai akhir paling sedikit 75, selain itu TIDAK LULUS. Baca nilainya (boleh desimal, misalnya 74.9), tentukan predikatnya, lalu tampilkan.',
    },
    lines: {
      en: [[0, 'score = float(input("Enter the score: "))'], [0, 'if score >= 75:'], [1, 'result = "PASS"'], [0, 'else:'], [1, 'result = "FAIL"'], [0, 'print("Result:", result)']],
      id: [[0, 'nilai = float(input("Masukkan nilai: "))'], [0, 'if nilai >= 75:'], [1, 'predikat = "LULUS"'], [0, 'else:'], [1, 'predikat = "TIDAK LULUS"'], [0, 'print("Predikat:", predikat)']],
    },
    distractors: [
      {
        like: 1, text: { en: 'if score > 75:', id: 'if nilai > 75:' },
        why: { en: 'a score of exactly 75 must PASS, but > leaves the boundary value out (the test with 75 catches it).', id: 'nilai tepat 75 harus LULUS, tetapi > tidak menyertakan nilai batas itu (uji dengan 75 menangkapnya).' },
      },
      {
        like: 1, text: { en: 'if score >= 75', id: 'if nilai >= 75' },
        why: { en: 'there is no colon at the end. Every line that opens a block (if, else, for, while, def, try, match, case) ends with :.', id: 'tidak ada titik dua di akhir. Setiap baris yang membuka blok (if, else, for, while, def, try, match, case) diakhiri :.' },
      },
    ],
    tests: [{ in: ['80'], tag: 'normal' }, { in: ['75'], tag: 'boundary' }, { in: ['74.9'], tag: 'boundary' }],
    hints: {
      en: ['Python runs from top to bottom: first read the score, then decide, then print. The print line must run for every score, so it belongs neither to if nor to else.',
        'Only the two lines that store the result are indented: one belongs to if, the other to else. The if and else lines themselves start at the left edge.'],
      id: ['Python berjalan dari atas ke bawah: baca nilai dulu, lalu putuskan, lalu tampilkan. Baris print harus berjalan untuk setiap nilai, jadi bukan milik if maupun else.',
        'Hanya dua baris yang menyimpan predikat yang menjorok: satu milik if, satu milik else. Baris if dan else sendiri dimulai dari tepi kiri.'],
    },
  },
  {
    key: 'genap',
    topic: { en: 'Branching and the % operator', id: 'Percabangan dan operator %' },
    title: { en: 'Odd or even', id: 'Ganjil atau genap' },
    task: {
      en: 'Read a whole number and print Even when it divides by 2 with no remainder (number % 2 == 0), otherwise print Odd.',
      id: 'Baca sebuah bilangan bulat, lalu tampilkan Genap jika habis dibagi 2 (bilangan % 2 == 0) dan Ganjil jika tidak.',
    },
    lines: {
      en: [[0, 'number = int(input("Enter a whole number: "))'], [0, 'if number % 2 == 0:'], [1, 'print("Even")'], [0, 'else:'], [1, 'print("Odd")']],
      id: [[0, 'bilangan = int(input("Masukkan bilangan bulat: "))'], [0, 'if bilangan % 2 == 0:'], [1, 'print("Genap")'], [0, 'else:'], [1, 'print("Ganjil")']],
    },
    distractors: [
      {
        like: 1, text: { en: 'if number / 2 == 0:', id: 'if bilangan / 2 == 0:' },
        why: { en: '/ gives the result of the division (8 / 2 = 4.0), not the remainder; % gives the remainder (8 % 2 = 0).', id: '/ memberi hasil bagi (8 / 2 = 4.0), bukan sisa bagi; % memberi sisa bagi (8 % 2 = 0).' },
      },
      {
        like: 1, text: { en: 'if number % 2 = 0:', id: 'if bilangan % 2 = 0:' },
        why: { en: 'a single = stores a value; comparing needs ==. Python stops with a SyntaxError before running anything.', id: 'satu tanda = berarti menyimpan nilai; membandingkan memerlukan ==. Python berhenti dengan SyntaxError sebelum menjalankan apa pun.' },
      },
    ],
    tests: [{ in: ['8'], tag: 'normal' }, { in: ['7'], tag: 'normal' }, { in: ['0'], tag: 'boundary' }, { in: ['-3'], tag: 'negative' }],
    hints: {
      en: ['The remainder after dividing by 2 is 0 for an even number and 1 for an odd one. Which operator gives the remainder?',
        'Read the number first. if and else start at the left edge, and each print sits one step to the right, under its own branch.'],
      id: ['Sisa pembagian dengan 2 adalah 0 untuk bilangan genap dan 1 untuk bilangan ganjil. Operator mana yang memberi sisa bagi?',
        'Baca bilangannya dulu. if dan else dimulai dari tepi kiri, dan setiap print menjorok satu langkah di bawah cabangnya sendiri.'],
    },
  },
  {
    key: 'jumlah',
    topic: { en: 'Loops: for and range()', id: 'Perulangan: for dan range()' },
    title: { en: 'Sum of 1 to n', id: 'Jumlah 1 sampai n' },
    task: {
      en: 'Read n, add up 1 + 2 + … + n with a for loop and an accumulator, then print the sum once, after the loop.',
      id: 'Baca n, jumlahkan 1 + 2 + … + n dengan perulangan for dan sebuah akumulator, lalu tampilkan jumlahnya satu kali, setelah perulangan.',
    },
    lines: {
      en: [[0, 'n = int(input("Enter n: "))'], [0, 'total = 0'], [0, 'for i in range(1, n + 1):'], [1, 'total = total + i'], [0, 'print("Sum of 1 to", n, "=", total)']],
      id: [[0, 'n = int(input("Masukkan n: "))'], [0, 'total = 0'], [0, 'for i in range(1, n + 1):'], [1, 'total = total + i'], [0, 'print("Jumlah 1 sampai", n, "=", total)']],
    },
    alts: [[1, 0, 2, 3, 4]],
    distractors: [
      {
        like: 2, text: { en: 'for i in range(1, n):', id: 'for i in range(1, n):' },
        why: { en: 'range stops BEFORE its end value: range(1, n) gives 1 … n − 1, so n itself is never added.', id: 'range berhenti SEBELUM nilai akhirnya: range(1, n) menghasilkan 1 … n − 1, jadi n sendiri tidak pernah dijumlahkan.' },
      },
      {
        like: 3, text: { en: 'total = i', id: 'total = i' },
        why: { en: 'this replaces the total instead of adding to it, so after the loop only the last number is left (a common accumulator mistake).', id: 'baris ini menimpa total alih-alih menambahkannya, sehingga setelah perulangan hanya angka terakhir yang tersisa (kesalahan umum pada pola akumulator).' },
      },
    ],
    tests: [{ in: ['5'], tag: 'normal' }, { in: ['10'], tag: 'normal' }, { in: ['1'], tag: 'boundary' }],
    hints: {
      en: ['The accumulator total = 0 is set once, BEFORE the loop; inside the loop it grows by i on every round.',
        'Which line runs once and which runs n times? Only the line that adds i is inside the for block.'],
      id: ['Akumulator total = 0 diisi satu kali, SEBELUM perulangan; di dalam perulangan nilainya bertambah i pada setiap putaran.',
        'Baris mana yang berjalan sekali dan mana yang berjalan n kali? Hanya baris yang menambahkan i yang berada di dalam blok for.'],
    },
  },
  {
    key: 'mundur',
    topic: { en: 'Loops: while', id: 'Perulangan: while' },
    title: { en: 'Race countdown', id: 'Hitung mundur lomba lari' },
    task: {
      en: 'Read the starting number, print the starting call, count down to 1 with a while loop, then print the start signal.',
      id: 'Baca angka awal, tampilkan aba-aba, hitung mundur sampai 1 dengan perulangan while, lalu tampilkan tanda mulai.',
    },
    lines: {
      en: [[0, 'count = int(input("Count down from: "))'], [0, 'print("On your marks... Get set...")'], [0, 'while count > 0:'], [1, 'print(count)'], [1, 'count = count - 1'], [0, 'print("GO! Run!")']],
      id: [[0, 'angka = int(input("Hitung mundur dari: "))'], [0, 'print("Bersedia... Siap...")'], [0, 'while angka > 0:'], [1, 'print(angka)'], [1, 'angka = angka - 1'], [0, 'print("YAA! Lari!")']],
    },
    distractors: [
      {
        like: 2, text: { en: 'while count >= 0:', id: 'while angka >= 0:' },
        why: { en: 'with >= 0 the loop also runs when the number is 0, so 0 is printed before the start signal.', id: 'dengan >= 0 perulangan juga berjalan ketika angkanya 0, sehingga 0 ikut tercetak sebelum tanda mulai.' },
      },
      {
        like: 4, text: { en: 'count = count + 1', id: 'angka = angka + 1' },
        why: { en: 'the number grows instead of shrinking, so the condition stays true forever: an infinite loop.', id: 'angkanya membesar alih-alih mengecil, sehingga kondisinya selalu benar: perulangan tak berujung.' },
      },
    ],
    tests: [{ in: ['3'], tag: 'normal' }, { in: ['5'], tag: 'normal' }, { in: ['0'], tag: 'boundary' }],
    hints: {
      en: ['Inside the loop, first print the number, then make it one smaller. Swap those two lines and the countdown starts one too low.',
        'A while condition must become false at some point, so something inside the loop has to move the number towards 0.'],
      id: ['Di dalam perulangan, cetak angkanya dulu, lalu kurangi satu. Jika kedua baris itu ditukar, hitung mundurnya mulai satu angka terlalu rendah.',
        'Kondisi while harus suatu saat menjadi salah, jadi sesuatu di dalam perulangan harus membawa angkanya menuju 0.'],
    },
  },
  {
    key: 'rata',
    topic: { en: 'Lists and the accumulator pattern', id: 'List dan pola akumulator' },
    title: { en: 'Class average', id: 'Rata-rata kelas' },
    task: {
      en: 'Add up the scores in the list with a for loop, divide by the number of scores (len) and print the average once. Worked out by hand, (80 + 75 + 90 + 65 + 85) / 5 = 79.0.',
      id: 'Jumlahkan nilai dalam list dengan perulangan for, bagi dengan banyak nilai (len), lalu tampilkan rata-ratanya satu kali. Hitungan manualnya (80 + 75 + 90 + 65 + 85) / 5 = 79.0.',
    },
    lines: {
      en: [[0, 'class_scores = [80, 75, 90, 65, 85]'], [0, 'total = 0'], [0, 'for score in class_scores:'], [1, 'total = total + score'], [0, 'average = total / len(class_scores)'], [0, 'print("Class average:", average)']],
      id: [[0, 'nilai_kelas = [80, 75, 90, 65, 85]'], [0, 'total = 0'], [0, 'for nilai in nilai_kelas:'], [1, 'total = total + nilai'], [0, 'rata_rata = total / len(nilai_kelas)'], [0, 'print("Rata-rata kelas:", rata_rata)']],
    },
    alts: [[1, 0, 2, 3, 4, 5]],
    distractors: [
      {
        like: 2, text: { en: 'for class_scores in score:', id: 'for nilai_kelas in nilai:' },
        why: { en: 'it is back to front: the list goes after in, and the new loop variable before it. Python stops with a NameError.', id: 'urutannya terbalik: list ditulis setelah in, dan variabel perulangan yang baru sebelumnya. Python berhenti dengan NameError.' },
      },
      {
        like: 4, text: { en: 'average = total / len(score)', id: 'rata_rata = total / len(nilai)' },
        why: { en: 'the loop variable holds one score (a number), not the list, and len() of a number is a TypeError.', id: 'variabel perulangan berisi satu nilai (sebuah angka), bukan list, dan len() dari angka menghasilkan TypeError.' },
      },
    ],
    tests: [{ in: [], tag: 'fixed' }],
    hints: {
      en: ['Create the list and set total = 0 before the loop. Only the line that adds a score repeats.',
        'The average is worked out once, after the loop has seen every score, so the last two lines are not indented.'],
      id: ['Buat list dan isi total = 0 sebelum perulangan. Hanya baris yang menambahkan nilai yang diulang.',
        'Rata-rata dihitung satu kali, setelah perulangan melewati semua nilai, jadi dua baris terakhir tidak menjorok.'],
    },
  },
  {
    key: 'luas',
    topic: { en: 'Functions: def and return', id: 'Fungsi: def dan return' },
    title: { en: 'Area function', id: 'Fungsi luas' },
    task: {
      en: 'Define a function area(l, w) that RETURNS l × w, then read the length and the width and print the area by calling the function. The tests use three rectangles: 8 × 5, 10 × 3 and 6 × 6.',
      id: 'Definisikan fungsi luas(p, l) yang MENGEMBALIKAN p × l, lalu baca panjang dan lebar, kemudian tampilkan luasnya dengan memanggil fungsi itu. Ujinya memakai tiga persegi panjang: 8 × 5, 10 × 3, dan 6 × 6.',
    },
    lines: {
      en: [[0, 'def area(l, w):'], [1, 'return l * w'], [0, 'length = int(input("Length: "))'], [0, 'width = int(input("Width: "))'], [0, 'print("Area =", area(length, width))']],
      id: [[0, 'def luas(p, l):'], [1, 'return p * l'], [0, 'panjang = int(input("Panjang: "))'], [0, 'lebar = int(input("Lebar: "))'], [0, 'print("Luas =", luas(panjang, lebar))']],
    },
    alts: [[2, 0, 1, 3, 4], [2, 3, 0, 1, 4]],
    distractors: [
      {
        like: 1, text: { en: 'print(l * w)', id: 'print(p * l)' },
        why: { en: 'print only shows the number on the screen; it does not hand it back, so the call gives None and the last line prints None.', id: 'print hanya menampilkan angka di layar; nilainya tidak dikembalikan, sehingga pemanggilan fungsi menghasilkan None dan baris terakhir mencetak None.' },
      },
      {
        like: 0, text: { en: 'def area(l, w)', id: 'def luas(p, l)' },
        why: { en: 'the def line has no colon at the end: SyntaxError: expected \':\'.', id: 'baris def tidak diakhiri titik dua: SyntaxError: expected \':\'.' },
      },
    ],
    tests: [{ in: ['8', '5'], tag: 'normal' }, { in: ['10', '3'], tag: 'normal' }, { in: ['6', '6'], tag: 'normal' }],
    hints: {
      en: ['A function must be defined (its def line must run) before the line that calls it; its body, the return line, is indented.',
        'The two input lines and the print line are the main program, so they start at the left edge.'],
      id: ['Fungsi harus didefinisikan (baris def-nya harus sudah berjalan) sebelum baris yang memanggilnya; badannya, baris return, menjorok.',
        'Dua baris input dan baris print adalah program utama, jadi dimulai dari tepi kiri.'],
    },
  },
  {
    key: 'stack',
    topic: { en: 'Stack: append and pop (LIFO)', id: 'Stack: append dan pop (LIFO)' },
    title: { en: 'Back button', id: 'Tombol Kembali' },
    task: {
      en: 'A browser history is a stack. The user opens Home, then Timetable, then Report card, and presses Back once. Push the pages in that order and print the history, pop the top page, then print the page left behind and the history that remains.',
      id: 'Riwayat peramban adalah sebuah stack. Pengguna membuka Beranda, lalu Jadwal Pelajaran, lalu Nilai Rapor, kemudian menekan Kembali satu kali. Push halaman sesuai urutan itu dan tampilkan riwayatnya, pop halaman teratas, lalu tampilkan halaman yang ditinggalkan dan sisa riwayatnya.',
    },
    // "History now" shows the stack before the pop (as in PP 03 5.2); without it, pushing Report card first, popping
    // it and pushing the other two afterwards would print the same output and pass every test.
    lines: {
      en: [[0, 'history = []'], [0, 'history.append("Home")'], [0, 'history.append("Timetable")'], [0, 'history.append("Report card")'], [0, 'print("History now:", history)'], [0, 'page = history.pop()'], [0, 'print("Back from:", page)'], [0, 'print("History left:", history)']],
      id: [[0, 'riwayat = []'], [0, 'riwayat.append("Beranda")'], [0, 'riwayat.append("Jadwal Pelajaran")'], [0, 'riwayat.append("Nilai Rapor")'], [0, 'print("Riwayat saat ini:", riwayat)'], [0, 'halaman = riwayat.pop()'], [0, 'print("Kembali dari:", halaman)'], [0, 'print("Sisa riwayat:", riwayat)']],
    },
    distractors: [
      {
        like: 5, text: { en: 'page = history.pop(0)', id: 'halaman = riwayat.pop(0)' },
        why: { en: 'pop(0) takes the FIRST item, which is how a queue (FIFO) works. Back needs the page opened last: pop() with no index.', id: 'pop(0) mengambil anggota PERTAMA, cara kerja queue (FIFO). Tombol Kembali memerlukan halaman yang terakhir dibuka: pop() tanpa indeks.' },
      },
      {
        like: 3, text: { en: 'history.push("Report card")', id: 'riwayat.push("Nilai Rapor")' },
        why: { en: 'Python lists have no push method; pushing onto a stack is append(). Python stops with an AttributeError.', id: 'list Python tidak punya metode push; push pada stack ditulis append(). Python berhenti dengan AttributeError.' },
      },
    ],
    tests: [{ in: [], tag: 'fixed' }],
    hints: {
      en: ['The empty stack must exist before anything is appended, and the three appends follow the order in which the pages were opened.',
        'Print the whole history once all three pages are in it, then pop. After the pop, print the page first and then the history that is left. Nothing in this program is indented.'],
      id: ['Stack kosong harus sudah ada sebelum ada yang di-append, dan ketiga append mengikuti urutan halaman dibuka.',
        'Cetak seluruh riwayat setelah ketiga halaman masuk, lalu lakukan pop. Setelah pop, cetak halamannya dulu lalu sisa riwayatnya. Tidak ada baris yang menjorok dalam program ini.'],
    },
  },
  {
    key: 'match',
    topic: { en: 'Branching: match-case', id: 'Percabangan: match-case' },
    title: { en: 'Uniform of the day', id: 'Aturan seragam' },
    task: {
      en: 'Read the day and print the uniform rule: Monday or Tuesday, white and grey; Wednesday or Thursday, batik; Friday, scout uniform; any other day, neat casual clothes.',
      id: 'Baca nama hari, lalu tampilkan aturan seragam: Senin atau Selasa, Putih Abu-abu; Rabu atau Kamis, Batik Sekolah; Jumat, Pramuka; hari lain, bebas rapi.',
    },
    lines: {
      en: [[0, 'day = input("What day is it today? ")'], [0, 'match day:'], [1, 'case "Monday" | "Tuesday":'], [2, 'print("Wear the white and grey uniform.")'],
        [1, 'case "Wednesday" | "Thursday":'], [2, 'print("Wear the school batik uniform.")'], [1, 'case "Friday":'], [2, 'print("Wear the scout uniform.")'],
        [1, 'case _:'], [2, 'print("Day off: wear neat casual clothes!")']],
      id: [[0, 'hari = input("Hari ini hari apa? ")'], [0, 'match hari:'], [1, 'case "Senin" | "Selasa":'], [2, 'print("Gunakan seragam Putih Abu-abu.")'],
        [1, 'case "Rabu" | "Kamis":'], [2, 'print("Gunakan seragam Batik Sekolah.")'], [1, 'case "Jumat":'], [2, 'print("Gunakan seragam Pramuka.")'],
        [1, 'case _:'], [2, 'print("Hari libur, berpakaian bebas rapi!")']],
    },
    alts: [
      [0, 1, 2, 3, 6, 7, 4, 5, 8, 9], [0, 1, 4, 5, 2, 3, 6, 7, 8, 9], [0, 1, 4, 5, 6, 7, 2, 3, 8, 9],
      [0, 1, 6, 7, 2, 3, 4, 5, 8, 9], [0, 1, 6, 7, 4, 5, 2, 3, 8, 9],
    ],
    distractors: [
      {
        like: 2, text: { en: 'case "Monday" or "Tuesday":', id: 'case "Senin" or "Selasa":' },
        why: { en: 'inside a case pattern the choices are joined with |, not with or. Python stops with SyntaxError: invalid syntax.', id: 'di dalam pola case, pilihan digabung dengan |, bukan dengan or. Python berhenti dengan SyntaxError: invalid syntax.' },
      },
      {
        like: 8, text: { en: 'else:', id: 'else:' },
        why: { en: 'match has no else branch; the catch-all branch is case _:. Python stops with SyntaxError: invalid syntax.', id: 'match tidak punya cabang else; cabang "selain itu" ditulis case _:. Python berhenti dengan SyntaxError: invalid syntax.' },
      },
    ],
    tests: {
      en: [{ in: ['Monday'], tag: 'normal' }, { in: ['Thursday'], tag: 'normal' }, { in: ['Friday'], tag: 'normal' }, { in: ['Sunday'], tag: 'other' }],
      id: [{ in: ['Senin'], tag: 'normal' }, { in: ['Kamis'], tag: 'normal' }, { in: ['Jumat'], tag: 'normal' }, { in: ['Minggu'], tag: 'other' }],
    },
    hints: {
      en: ['Every case line sits one step inside match, and every print sits one step inside its own case.',
        'case _ catches every other value, so it must be the LAST case: Python refuses a wildcard that would make later cases unreachable.'],
      id: ['Setiap baris case menjorok satu langkah di dalam match, dan setiap print menjorok satu langkah di dalam case-nya sendiri.',
        'case _ menangkap semua nilai lain, jadi harus menjadi case TERAKHIR: Python menolak wildcard yang membuat case sesudahnya tidak mungkin tercapai.'],
    },
  },
  {
    key: 'try',
    topic: { en: 'Handling errors: try-except', id: 'Menangani error: try-except' },
    title: { en: 'Ask until it is a number', id: 'Ulangi sampai berupa angka' },
    task: {
      en: 'Keep asking for a score until the user types a whole number. int() raises ValueError for text such as eighty: catch it, print a friendly message and ask again. When int() succeeds, leave the loop with break and print the saved score.',
      id: 'Terus minta nilai sampai pengguna mengetik bilangan bulat. int() memunculkan ValueError untuk teks seperti delapan puluh: tangkap, tampilkan pesan ramah, lalu minta lagi. Jika int() berhasil, keluar dari perulangan dengan break dan tampilkan nilai yang tersimpan.',
    },
    lines: {
      en: [[0, 'while True:'], [1, 'try:'], [2, 'score = int(input("Enter the score: "))'], [2, 'break'], [1, 'except ValueError:'], [2, 'print("Please type a number. Try again.")'], [0, 'print("Score saved:", score)']],
      id: [[0, 'while True:'], [1, 'try:'], [2, 'nilai = int(input("Masukkan nilai: "))'], [2, 'break'], [1, 'except ValueError:'], [2, 'print("Masukan harus berupa angka. Silakan ulangi.")'], [0, 'print("Nilai tersimpan:", nilai)']],
    },
    distractors: [
      {
        like: 4, text: { en: 'except TypeError:', id: 'except TypeError:' },
        why: { en: 'int("eighty") raises ValueError, not TypeError, so this except does not catch it and the program stops with a traceback.', id: 'int("delapan puluh") memunculkan ValueError, bukan TypeError, sehingga except ini tidak menangkapnya dan program berhenti dengan traceback.' },
      },
      {
        like: 2, text: { en: 'score = input("Enter the score: ")', id: 'nilai = input("Masukkan nilai: ")' },
        why: { en: 'without int() nothing can fail, so a word is accepted as the score and the loop ends after the first answer, whatever it is.', id: 'tanpa int() tidak ada yang bisa gagal, sehingga sebuah kata diterima sebagai nilai dan perulangan selesai setelah jawaban pertama, apa pun isinya.' },
      },
    ],
    tests: {
      en: [{ in: ['80'], tag: 'normal' }, { in: ['eighty', '80'], tag: 'invalid' }, { in: ['', '7.5', '75'], tag: 'invalid' }],
      id: [{ in: ['80'], tag: 'normal' }, { in: ['delapan puluh', '80'], tag: 'invalid' }, { in: ['', '7.5', '75'], tag: 'invalid' }],
    },
    hints: {
      en: ['while True repeats forever and break is the only way out. break comes right after the line that can fail, inside try, so it is reached only when int() worked.',
        'try and except line up with each other one step inside while; the lines they protect or handle are one step further in. The last print runs after the loop.'],
      id: ['while True berulang selamanya dan break adalah satu-satunya jalan keluar. break diletakkan tepat setelah baris yang bisa gagal, di dalam try, sehingga hanya tercapai jika int() berhasil.',
        'try dan except sejajar, satu langkah di dalam while; baris yang dilindungi atau ditangani menjorok satu langkah lagi. print terakhir berjalan setelah perulangan.'],
    },
  },
];

/** Test list of a puzzle in one language (some puzzles have language-specific test inputs). */
function testsOf(pz, lang) { return Array.isArray(pz.tests) ? pz.tests : pz.tests[lang]; }

/** Cards of one puzzle: the model-answer lines L0, L1, … then the distractors D0, D1. */
function puzzleCards(pz, lang) {
  const lines = pz.lines[lang];
  const cards = lines.map(([ind, text], i) => ({ id: 'L' + i, text, ind, d: false, ref: i }));
  pz.distractors.forEach((d, j) => cards.push({ id: 'D' + j, text: d.text[lang], ind: lines[d.like][0], d: true, like: d.like, why: d.why }));
  return cards;
}

/** Python source of an arrangement [{ text, ind }]: four spaces per indentation level, one statement per line. */
function sourceOf(lines) {
  return lines.map((l) => '    '.repeat(l.ind) + l.text).join('\n') + (lines.length ? '\n' : '');
}

/** The accepted solutions: the model answer plus the alternative orders, each as [{ text, ind }]. */
function solutionsOf(pz, lang) {
  const ref = pz.lines[lang];
  const orders = [ref.map((_, i) => i), ...(pz.alts || [])];
  return orders.map((o) => o.map((i) => ({ text: ref[i][1], ind: ref[i][0] })));
}

/**
 * Run a compiled program on one test like a terminal (typed input is echoed). Returns the console text, coloured
 * segments for the console panel, the uncaught error (if any) and the final status.
 */
function runTest(program, inputs) {
  const run = createRun(program, { inputs: inputs.slice(), echoInput: true, maxSteps: MAX_STEPS, eofWhenExhausted: true, seed: 2026 });
  const segs = [];
  const counts = [];   // counts[line] = how many times the statement on that line ran (line events)
  let error = null;
  for (let guard = 0; guard < MAX_STEPS * 50 + 1000; guard++) {
    const ev = run.step();
    if (ev.kind === 'line') counts[ev.line] = (counts[ev.line] || 0) + 1;
    else if (ev.kind === 'output') segs.push({ text: ev.text, kind: ev.echo ? 'in' : ev.stderr ? 'err' : 'out' });
    else if (ev.kind === 'exception') { error = ev.error; break; }
    if (ev.kind === 'done' || run.status === 'done' || run.status === 'error' || run.status === 'waiting-input') break;
  }
  // the traceback follows the output straight away, as python3 prints it; the step limit is the simulator's, not a
  // Python error, so it has no traceback (the console adds its own note)
  if (error && !error.simulatorLimit) segs.push({ text: error.traceback + '\n', kind: 'err' });
  return { output: run.output, segs, error, status: run.status, counts };
}

/** What the model answer prints for every test (the expected outputs). */
function expectedOf(pz, lang) {
  const c = compile(sourceOf(solutionsOf(pz, lang)[0]), { filename: 'main.py' });
  if (!c.ok) throw new Error(`model answer of ${pz.key} (${lang}) does not compile: ${c.error.message}`);
  return testsOf(pz, lang).map((t) => runTest(c.program, t.in));
}

/**
 * The first line to look at: compare the arrangement with the accepted solution that agrees with it longest from
 * the top. kinds: same | missing (lines are missing after `after`) | distractor | indent | order.
 */
function diagnose(lines, solutions) {
  let best = solutions[0];
  let k = -1;
  for (const sol of solutions) {
    let n = 0;
    while (n < lines.length && n < sol.length && lines[n].text === sol[n].text && lines[n].ind === sol[n].ind) n++;
    if (n > k) { k = n; best = sol; }
  }
  if (k === lines.length && k === best.length) return { kind: 'same' };
  if (k === lines.length) return { kind: 'missing', after: k };
  const ln = lines[k];
  if (ln.d) return { kind: 'distractor', line: k + 1 };
  const want = best[k];
  if (want && want.text === ln.text) return { kind: 'indent', line: k + 1, more: want.ind > ln.ind };
  return { kind: 'order', line: k + 1 };
}

/** Index of the first line where two console texts differ (or -1). */
function firstDiffLine(a, b) {
  const x = a.split('\n');
  const y = b.split('\n');
  for (let i = 0; i < Math.max(x.length, y.length); i++) if (x[i] !== y[i]) return i;
  return -1;
}

/**
 * Check an arrangement [{ text, ind, d }]: compile it (syntax errors first, like Python), then run every test and
 * compare its console output with the expected one.
 */
function checkArrangement(lines, pz, lang, expected) {
  const src = sourceOf(lines);
  const diag = diagnose(lines, solutionsOf(pz, lang));
  const c = compile(src, { filename: 'main.py' });
  if (!c.ok) return { kind: 'syntax', src, error: c.error, diag, passed: 0, total: expected.length, runs: [] };
  const runs = testsOf(pz, lang).map((t, i) => {
    const r = runTest(c.program, t.in);
    r.pass = r.status === 'done' && r.output === expected[i].output;
    r.diffLine = r.pass ? -1 : firstDiffLine(r.output, expected[i].output);
    return r;
  });
  const passed = runs.filter((r) => r.pass).length;
  if (passed === runs.length) {
    // a distractor that changes nothing (e.g. a statement after the loop) still does not belong in the program
    const extra = lines.findIndex((l) => l.d);
    if (extra >= 0) return { kind: 'extra', src, runs, diag: { kind: 'distractor', line: extra + 1 }, passed, total: runs.length };
    // Python also accepts a block indented two or more steps, but the convention (PEP 8, PP 03) is exactly one step
    const deep = lines.findIndex((l, i) => i > 0 && l.ind > lines[i - 1].ind + 1);
    if (deep >= 0) return { kind: 'style', src, runs, diag: { kind: 'indent', line: deep + 1, more: false }, passed, total: runs.length };
    // same output, but a line runs a different number of times than in every accepted solution (e.g. the average
    // worked out inside the loop instead of once after it)
    const rep = diag.kind === 'same' ? null : repeatCheck(lines, runs, pz, lang);
    if (rep) return { kind: 'repeat', src, runs, diag: { kind: 'repeat', ...rep }, passed, total: runs.length };
  }
  return { kind: passed === runs.length ? 'ok' : 'fail', src, runs, diag, passed, total: runs.length };
}

/** How many times each line text ran in one test. */
function countsByText(lines, counts) {
  const m = new Map();
  lines.forEach((l, i) => m.set(l.text, (m.get(l.text) || 0) + (counts[i + 1] || 0)));
  return m;
}

/**
 * Compare how often each line runs with every accepted solution, test by test. Returns null when one solution
 * agrees on every line, else the first disagreement with the closest solution: { line, test, got, want }.
 */
function repeatCheck(lines, runs, pz, lang) {
  const tests = testsOf(pz, lang);
  let best = null;
  for (const sol of solutionsOf(pz, lang)) {
    const c = compile(sourceOf(sol), { filename: 'main.py' });
    if (!c.ok) continue;
    let bad = 0;
    let first = null;
    tests.forEach((t, ti) => {
      const want = countsByText(sol, runTest(c.program, t.in).counts);
      const got = countsByText(lines, runs[ti].counts);
      lines.forEach((l, i) => {
        const a = got.get(l.text) || 0;
        const b = want.get(l.text) || 0;
        if (a !== b) { bad++; if (!first) first = { line: i + 1, test: ti, got: a, want: b }; }
      });
    });
    if (!bad) return null;
    if (!best || bad < best.bad) best = { bad, ...first };
  }
  if (!best) return null;
  return { line: best.line, test: best.test, got: best.got, want: best.want };
}

/** Small seeded PRNG (mulberry32) so a shuffle can be repeated. */
function prng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Card ids in a shuffled order that is clearly not the solution order (few neighbours left in sequence). */
function shuffledIds(cards, seed) {
  let best = null;
  let bestScore = Infinity;
  for (let attempt = 0; attempt < 60; attempt++) {
    const rnd = prng(seed * 7919 + attempt * 104729 + 17);
    const ids = cards.map((c) => c.id);
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    const pos = (id) => cards.find((c) => c.id === id);
    let score = 0;
    for (let i = 1; i < ids.length; i++) {
      const a = pos(ids[i - 1]);
      const b = pos(ids[i]);
      if (!a.d && !b.d && b.ref === a.ref + 1) score++;
    }
    if (ids[0] === 'L0') score++;
    if (score < bestScore) { bestScore = score; best = ids; }
    if (score === 0) break;
  }
  return best;
}
// LOGIC-END

const CSS = `
.pz { --pz-ok: #047857; --pz-bad: #b91c1c; --pz-warn: #a16207; --pz-info: #1d4ed8;
  container-type: inline-size; container-name: pz; display: grid; gap: 14px; padding: 14px; min-width: 0; color: var(--color-fg); }
@media (prefers-color-scheme: dark) { .pz, .pz-ctl { --pz-ok: #34d399; --pz-bad: #f87171; --pz-warn: #fbbf24; --pz-info: #93c5fd; } }
.pz-ctl { --pz-ok: #047857; align-content: start; }
.pz *, .pz-ctl * { box-sizing: border-box; }
.pz [hidden] { display: none !important; }
.pz, .pz-ctl, .pz-ghost { font-variant-ligatures: none; font-feature-settings: "calt" 0, "liga" 0; }
.pz-sr { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }
.pz code, .pz kbd { font-family: var(--font-mono, ui-monospace, Menlo, Consolas, monospace); }

/* header */
.pz-head { display: grid; gap: 6px; min-width: 0; }
.pz-nav { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 10px; }
.pz-kicker { flex: 1 1 auto; min-width: 0; font: 600 12px/1.35 var(--font-sans, sans-serif); letter-spacing: .05em; text-transform: uppercase; color: var(--color-muted); }
.pz-navb { min-height: 34px; padding: 4px 11px; border: 1px solid var(--color-border); border-radius: 8px; background: var(--color-surface-2); color: var(--color-fg);
  font: 600 13px/1.2 var(--font-sans, sans-serif); cursor: pointer; }
.pz-navb:hover:not(:disabled) { background: color-mix(in srgb, var(--color-fg) 8%, var(--color-surface-2)); }
.pz-navb:disabled { opacity: .45; cursor: default; }
.pz-title { margin: 0; font-size: 20px; line-height: 1.25; }
.pz-task { margin: 0; max-width: 80ch; font-size: 14.5px; line-height: 1.5; }
.pz-meta { display: flex; flex-wrap: wrap; gap: 6px; }
.pz-chip { display: inline-flex; align-items: baseline; gap: 5px; padding: 3px 10px; border: 1px solid var(--color-border); border-radius: 999px;
  background: var(--color-surface-2); font-size: 12.5px; line-height: 1.35; color: var(--color-muted); }
.pz-chip b { color: var(--color-fg); font-variant-numeric: tabular-nums; }
.pz-chip.is-ok { border-color: var(--pz-ok); color: var(--pz-ok); background: color-mix(in srgb, var(--pz-ok) 10%, transparent); }
.pz-chip.is-ok b { color: inherit; }

/* board: card bin and program */
.pz-board { display: grid; grid-template-columns: minmax(0, 1fr); gap: 12px; min-width: 0; }
@container pz (min-width: 700px) { .pz-board { grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); align-items: start; } }
.pz-panel { min-width: 0; border: 1px solid var(--color-border); border-radius: 12px; overflow: hidden; background: var(--color-surface-2); }
.pz-ph { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 10px; min-height: 40px; padding: 6px 8px 6px 12px; border-bottom: 1px solid var(--color-border); }
.pz-ph h3 { flex: 1 1 auto; min-width: 0; margin: 0; font-size: 14px; line-height: 1.3; }
.pz-ph h3 small { font-weight: 400; font-size: 12px; color: var(--color-muted); }
.pz-progp { border-color: #1e2a44; background: #0b1220; color: #e2e8f0; color-scheme: dark; }
.pz-progp .pz-ph { background: #0f182c; border-bottom-color: #1e2a44; }
.pz-progp .pz-ph h3 small { color: #9fb0c8; }
.pz-tools { display: flex; flex-wrap: wrap; gap: 4px; }
.pz-tool { display: inline-flex; align-items: center; justify-content: center; gap: 4px; min-width: 36px; min-height: 34px; padding: 3px 8px; border: 1px solid #2b3a5a; border-radius: 7px;
  background: #18233b; color: #dbe4f3; font: 600 13px/1 var(--font-sans, sans-serif); cursor: pointer; }
.pz-tool svg { width: 16px; height: 16px; flex: none; }
.pz-tool:hover:not(:disabled) { background: #22304d; }
.pz-tool:disabled { opacity: .4; cursor: default; }
.pz-tool:focus-visible { outline: 2px solid #60a5fa; outline-offset: 1px; }
.pz-list { position: relative; margin: 0; list-style: none; outline: none; }
.pz-list:focus-visible { box-shadow: inset 0 0 0 2px var(--accent, var(--color-accent)); }
.pz-bin { display: grid; align-content: start; gap: 6px; padding: 10px; min-height: 64px; }
.pz-prog { --pz-gut: 32px; --pz-indw: 28px; --pz-levels: 4; display: grid; align-content: start; gap: 6px; padding: 10px 10px 12px 0; min-height: 132px;
  background-image: repeating-linear-gradient(90deg, rgba(148, 163, 184, .22) 0 1px, transparent 1px var(--pz-indw));
  background-size: calc(var(--pz-indw) * var(--pz-levels) + 1px) 100%; background-repeat: no-repeat; background-position: var(--pz-gut) 0; }
@container pz (max-width: 480px) { .pz-prog { --pz-gut: 26px; --pz-indw: 20px; } }
.pz-empty { display: grid; place-items: center; min-height: 44px; padding: 8px 12px; border: 1.5px dashed var(--color-border); border-radius: 9px;
  font-size: 13px; line-height: 1.4; color: var(--color-muted); text-align: center; }
.pz-prog .pz-empty { margin-left: var(--pz-gut); border-color: #2b3a5a; color: #9fb0c8; }
.pz-item { position: relative; display: flex; align-items: stretch; min-width: 0; outline: none; }
.pz-ln { flex: none; width: var(--pz-gut); padding-right: 7px; align-self: center; text-align: right; font: 12px/1 var(--font-mono, monospace); color: #8a99b3; }
.pz-card { position: relative; display: flex; align-items: flex-start; gap: 6px; flex: 1 1 auto; min-width: 0; min-height: 40px; padding: 8px 10px 8px 4px;
  border: 1px solid #2b3a5a; border-radius: 8px; background: #121b30; color: #e2e8f0; cursor: pointer; user-select: none; -webkit-user-select: none;
  color-scheme: dark; transition: border-color .12s, box-shadow .12s, background .12s; }
.pz-prog .pz-card { margin-left: calc(var(--i, 0) * var(--pz-indw)); }
.pz-card:hover { border-color: #4b6390; background: #16213a; }
.pz-grip { flex: none; display: grid; place-items: center; width: 22px; align-self: stretch; margin: -8px 0 -8px -4px; border-radius: 7px 0 0 7px; color: #7d8ba6;
  cursor: grab; touch-action: none; }
.pz-grip svg { width: 10px; height: 16px; }
.pz-code { flex: 1 1 auto; min-width: 0; font-size: 14px; line-height: 22px; white-space: pre-wrap; overflow-wrap: anywhere; word-break: normal; }
@container pz (max-width: 480px) { .pz-code { font-size: 13px; line-height: 20px; } }
.pz-badge { flex: none; align-self: center; padding: 1px 7px; border-radius: 999px; font: 700 11px/1.5 var(--font-sans, sans-serif); white-space: nowrap; }
.pz-item.is-sel .pz-card { border-color: #fbbf24; box-shadow: 0 0 0 1px #fbbf24; background: #1d2338; }
.pz-item:focus-visible .pz-card { outline: 2px solid #60a5fa; outline-offset: 2px; }
.pz-item.is-new .pz-card { animation: pz-flash .7s ease-out; }
@keyframes pz-flash { from { box-shadow: 0 0 0 3px rgba(251, 191, 36, .75); } to { box-shadow: 0 0 0 1px #fbbf24; } }
@media (prefers-reduced-motion: reduce) { .pz-item.is-new .pz-card { animation: none; } .pz-card { transition: none; } }
.pz-item.is-bad .pz-card { border-color: #f87171; box-shadow: 0 0 0 1px #f87171; background: #2a1620; }
.pz-item.is-bad .pz-badge { background: #7f1d1d; color: #fee2e2; }
.pz-item.is-err .pz-card { border-color: #fb923c; border-style: dashed; }
.pz-item.is-err .pz-badge { background: #7c2d12; color: #ffedd5; }
.pz-item.is-good .pz-card { border-color: #34d399; background: #0f2a26; }
.pz-item.is-dragging .pz-card { opacity: .35; }
.pz-item.is-out .pz-card { border-style: dashed; border-color: #64748b; background: #121b30; opacity: .72; cursor: default; }
.pz-item.is-out .pz-card:hover { background: #121b30; }
.pz-item.is-out .pz-code { text-decoration: line-through; text-decoration-color: #f87171; text-decoration-thickness: 2px; }
.pz-item.is-out .pz-badge { background: #334155; color: #e2e8f0; }
.pz-item.is-out .pz-grip { visibility: hidden; }
.pz-bin-p .pz-badge { background: #334155; color: #e2e8f0; }
.pz-drop { position: absolute; z-index: 4; height: 4px; margin-top: -2px; border-radius: 2px; background: #fbbf24; box-shadow: 0 0 0 2px rgba(11, 18, 32, .6); pointer-events: none; }
.pz-drop span { position: absolute; right: 0; top: -19px; padding: 0 6px; border-radius: 4px; background: #fbbf24; color: #0b1220; font: 700 11px/16px var(--font-sans, sans-serif); white-space: nowrap; }
.pz-panel.is-target { box-shadow: 0 0 0 2px #fbbf24; }
.pz-ghost { position: fixed; z-index: 10000; left: 0; top: 0; display: flex; align-items: flex-start; gap: 6px; min-height: 40px; padding: 8px 10px 8px 4px; border: 1px solid #fbbf24;
  border-radius: 8px; background: #1d2338; color: #e2e8f0; box-shadow: 0 10px 28px rgba(0, 0, 0, .45); pointer-events: none; opacity: .95; color-scheme: dark; }
.pz-ghost .pz-grip { margin: -8px 0 -8px -4px; }
.pz-ghost .pz-code { font-size: 14px; line-height: 22px; white-space: pre-wrap; overflow-wrap: anywhere; font-family: var(--font-mono, ui-monospace, Menlo, Consolas, monospace); }
.pz-ghost .pz-badge { display: none; }
.pz-keys { margin: 0; font-size: 12.5px; line-height: 1.6; color: var(--color-muted); }
.pz-keys kbd { padding: 0 4px; border: 1px solid var(--color-border); border-radius: 4px; background: var(--color-surface-2); font-size: 11.5px; white-space: nowrap; }

/* actions and hints */
.pz-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.pz-actions .btn { min-height: 42px; padding: 8px 14px; }
.pz .btn--primary:hover { background: var(--accent, var(--color-accent)); }
.pz-actions .btn:disabled { opacity: .5; cursor: default; filter: none; }
.pz-hints { display: grid; gap: 6px; margin: 0; padding: 10px 12px 10px 2.2em; border: 1px solid color-mix(in srgb, var(--pz-warn) 45%, var(--color-border)); border-radius: 10px;
  background: color-mix(in srgb, var(--pz-warn) 7%, var(--color-surface)); font-size: 13.5px; line-height: 1.5; }
.pz-hints li::marker { font-weight: 700; color: var(--pz-warn); }
.pz-hints code { padding: 0 4px; border-radius: 4px; background: var(--color-surface-2); font-size: .95em; }

/* feedback */
.pz-fb { display: grid; gap: 9px; padding: 12px 14px; min-width: 0; border: 1px solid var(--color-border); border-left-width: 4px; border-radius: 12px; background: var(--color-surface); }
.pz-fb.k-ok { border-color: var(--pz-ok); background: color-mix(in srgb, var(--pz-ok) 7%, var(--color-surface)); }
.pz-fb.k-fail { border-color: var(--pz-bad); }
.pz-fb.k-syntax { border-color: var(--pz-bad); }
.pz-fb.k-shown { border-color: var(--pz-info); }
.pz-fb h3 { margin: 0; font-size: 16px; line-height: 1.35; }
.pz-fb.k-ok h3 { color: var(--pz-ok); }
.pz-fb.k-fail h3, .pz-fb.k-syntax h3 { color: var(--pz-bad); }
.pz-fb p { margin: 0; font-size: 14px; line-height: 1.5; }
.pz-fb p.muted { color: var(--color-muted); font-size: 13px; }
.pz-fb code { padding: 1px 5px; border-radius: 4px; background: var(--color-surface-2); font-size: .94em; overflow-wrap: anywhere; }
.pz-fb code.cp-hl { padding: 1px 6px; background: #0b1220; color: #e2e8f0; color-scheme: dark; }
.pz-tb { margin: 0; padding: 8px 11px; border-radius: 8px; background: #0b1220; color: #ff8f8f; font: 13px/1.45 var(--font-mono, monospace); white-space: pre-wrap;
  overflow-wrap: anywhere; color-scheme: dark; }
.pz-fbrow { display: flex; flex-wrap: wrap; gap: 8px; }
.pz-fbrow .btn { min-height: 38px; }

/* tests */
.pz-sec { min-width: 0; display: grid; gap: 8px; }
.pz-sec-h { display: flex; flex-wrap: wrap; align-items: baseline; gap: 2px 12px; }
.pz-sec-h h3 { margin: 0; font-size: 15px; }
.pz-sec-h small { font-size: 12.5px; line-height: 1.4; color: var(--color-muted); }
.pz-tests { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 230px), 1fr)); gap: 10px; }
.pz-test { display: grid; align-content: start; gap: 6px; min-width: 0; padding: 9px 10px 10px; border: 1px solid var(--color-border); border-radius: 10px; background: var(--color-surface); }
.pz-test.is-sel { border-color: var(--accent, var(--color-accent)); box-shadow: 0 0 0 1px var(--accent, var(--color-accent)); }
.pz-test.is-stale > :not(.pz-test-h):not(.pz-in):not(.pz-lbl.exp):not(.pz-term.exp) { opacity: .45; }
.pz-test-h { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 8px; }
.pz-test-h b { font-size: 13.5px; }
.pz-tag { display: inline-block; padding: 0 7px; border-radius: 999px; background: var(--color-surface-2); color: var(--color-muted); font-size: 11.5px; line-height: 1.7; white-space: nowrap; }
.pz-tag.is-hot { background: color-mix(in srgb, var(--pz-warn) 16%, transparent); color: var(--pz-warn); font-weight: 700; }
.pz-res { margin-left: auto; font: 700 12.5px/1.3 var(--font-sans, sans-serif); white-space: nowrap; }
.pz-res.ok { color: var(--pz-ok); } .pz-res.bad { color: var(--pz-bad); } .pz-res.none { font-weight: 400; color: var(--color-muted); }
.pz-in { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px; font-size: 12.5px; color: var(--color-muted); }
.pz-in kbd { padding: 0 6px; border: 1px solid var(--color-border); border-radius: 5px; background: var(--color-surface-2); color: var(--color-fg); font-size: 12.5px; line-height: 1.6; white-space: pre; }
.pz-in kbd.is-blank { font-family: var(--font-sans, sans-serif); font-style: italic; color: var(--color-muted); }
.pz-lbl { font-size: 11.5px; font-weight: 600; letter-spacing: .02em; color: var(--color-muted); }
.pz-term { margin: 0; padding: 6px 9px; border-radius: 7px; background: #0b1220; color: #e5e7eb; font: 12.5px/1.5 var(--font-mono, monospace); white-space: pre-wrap;
  overflow-wrap: anywhere; color-scheme: dark; }
.pz-term .i { color: #86efac; } .pz-term .e { color: #ff8f8f; } .pz-term .n { color: #94a3b8; font-family: var(--font-sans, sans-serif); font-size: 12px; }
.pz-term .d { display: inline-block; min-width: calc(100% + 18px); margin: 0 -9px; padding: 0 9px; background: rgba(248, 113, 113, .22); box-shadow: inset 3px 0 0 #f87171; }
.pz-same { margin: 0; font-size: 12.5px; color: var(--pz-ok); font-weight: 600; }
.pz-show { justify-self: start; min-height: 32px; padding: 4px 10px; border: 1px solid var(--color-border); border-radius: 7px; background: var(--color-surface-2); color: var(--color-fg);
  font: 600 12.5px/1.2 var(--font-sans, sans-serif); cursor: pointer; }
.pz-show[aria-pressed="true"] { border-color: var(--accent, var(--color-accent)); box-shadow: inset 0 0 0 1px var(--accent, var(--color-accent)); }
.pz-show:focus-visible, .pz-navb:focus-visible { outline: 2px solid var(--accent, var(--color-accent)); outline-offset: 2px; }

/* main.py and the console */
.pz-io { display: grid; grid-template-columns: minmax(0, 1fr); gap: 12px; min-width: 0; }
@container pz (min-width: 760px) { .pz-io { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: start; } }

/* side controls */
.pz-ctl .pz-prog-list { display: grid; gap: 2px; margin: 0; padding: 0; list-style: none; font-size: 13px; }
.pz-ctl .pz-prog-list li { display: flex; gap: 6px; align-items: baseline; color: var(--color-muted); }
.pz-ctl .pz-prog-list li.is-cur { color: var(--color-fg); font-weight: 600; }
.pz-ctl .pz-prog-list li .st { flex: none; width: 1.3em; text-align: center; }
.pz-ctl .pz-prog-list li.is-ok .st { color: var(--pz-ok); }
.pz-ctl .pz-note { margin: 0; font-size: 12.5px; line-height: 1.45; color: var(--color-muted); }
`;

const ICON = {
  grip: '<svg viewBox="0 0 10 16" aria-hidden="true"><g fill="currentColor"><circle cx="2.5" cy="3" r="1.4"/><circle cx="7.5" cy="3" r="1.4"/><circle cx="2.5" cy="8" r="1.4"/><circle cx="7.5" cy="8" r="1.4"/><circle cx="2.5" cy="13" r="1.4"/><circle cx="7.5" cy="13" r="1.4"/></g></svg>',
  up: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3v10M3.5 7.5 8 3l4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  down: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 13V3M3.5 8.5 8 13l4.5-4.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  outdent: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 2.5v11M13.5 8H5.5M8.5 5 5.5 8l3 3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  indent: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 2.5v11M5 8h8M10 5l3 3-3 3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  out: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
let mountSeq = 0;

export function mount(rootEl) {
  const lang = getLocale() === 'id' ? 'id' : 'en';
  const T = (en, id) => (lang === 'id' ? id : en);
  const L = (o) => (o && typeof o === 'object' && !Array.isArray(o) ? o[lang] : o);
  const uid = `pz${++mountSeq}`;
  const narrow = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 600px)').matches;
  const TAG = {
    normal: T('normal', 'normal'), boundary: T('boundary', 'batas'), negative: T('negative', 'negatif'), invalid: T('invalid input', 'masukan tidak valid'),
    fixed: T('data in the code', 'data di dalam kode'), other: T('other value', 'nilai lain'),
  };
  const fmtInt = (n) => n.toLocaleString(lang === 'id' ? 'id-ID' : 'en-US');
  // how far a run got before the simulator's limit stopped it: steps, or loop rounds inside one step
  const limitWhat = (e) => (e?.limitKind === 'iterations'
    ? T(`${fmtInt(e.limit)} loop rounds inside one step`, `${fmtInt(e.limit)} putaran di dalam satu langkah`)
    : T(`${fmtInt(e?.limit ?? MAX_STEPS)} steps`, `${fmtInt(e?.limit ?? MAX_STEPS)} langkah`));
  const passOf = (k, n) => (n === 1 ? T('The test fails', 'Ujinya gagal') : T(`${k} of ${n} tests pass`, `${k} dari ${n} uji lolos`));
  const passAll = (n) => (n === 1 ? T('The test passes', 'Ujinya lolos') : T(`All ${n} tests pass`, `Semua ${n} uji lolos`));

  const style = document.createElement('style');
  style.textContent = CSS;
  rootEl.appendChild(style);

  // ------------------------------------------------------------------ state
  let pi = 0;
  let useDistractors = true;
  let indentGiven = false;
  const store = new Map();
  const expCache = new Map();
  const cardCache = new Map();
  const pz = () => PUZZLES[pi];
  const cards = () => {
    const p = pz();
    if (!cardCache.has(p.key)) cardCache.set(p.key, puzzleCards(p, lang));
    return cardCache.get(p.key);
  };
  const card = (id) => cards().find((c) => c.id === id);
  const expected = () => {
    const p = pz();
    if (!expCache.has(p.key)) expCache.set(p.key, expectedOf(p, lang));
    return expCache.get(p.key);
  };
  const fresh = (p, i) => ({
    order: shuffledIds(puzzleCards(p, lang), i + 1), shuffles: 0, prog: [], sel: null, attempts: 0, hints: 0, revealed: [], solved: false, shown: false,
    result: null, stale: false, selTest: 0, everPassed: 0,
  });
  const S = () => {
    const p = pz();
    if (!store.has(p.key)) store.set(p.key, fresh(p, pi));
    return store.get(p.key);
  };
  const maxInd = () => Math.max(2, ...pz().lines[lang].map((l) => l[0])) + 1;
  const visible = (c) => useDistractors || !c.d;
  const inProg = (st, id) => st.prog.some((x) => x.id === id);
  const binIds = (st) => st.order.filter((id) => visible(card(id)) && !inProg(st, id));
  const progLines = (st) => st.prog.map((x) => { const c = card(x.id); return { id: c.id, text: c.text, ind: x.ind, d: c.d }; });
  const hintsOf = () => L(pz().hints);
  const isRevealed = (st, id) => st.revealed.includes(id);

  // ------------------------------------------------------------------ layout
  const main = document.createElement('div');
  main.className = 'pz';
  rootEl.appendChild(main);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls pz-ctl';
  rootEl.appendChild(ctrlPanel);

  const live = document.createElement('div');
  live.className = 'pz-sr';
  live.setAttribute('aria-live', 'polite');
  live.setAttribute('role', 'status');
  const say = (msg) => { live.textContent = ''; setTimeout(() => { live.textContent = msg; }, 30); };

  // header
  const head = document.createElement('header');
  head.className = 'pz-head';
  const nav = document.createElement('div');
  nav.className = 'pz-nav';
  const prevB = document.createElement('button');
  prevB.type = 'button';
  prevB.className = 'pz-navb';
  prevB.textContent = T('‹ Previous', '‹ Sebelumnya');
  prevB.addEventListener('click', () => goPuzzle(pi - 1));
  const kicker = document.createElement('div');
  kicker.className = 'pz-kicker';
  const nextB = document.createElement('button');
  nextB.type = 'button';
  nextB.className = 'pz-navb';
  nextB.textContent = T('Next ›', 'Berikutnya ›');
  nextB.addEventListener('click', () => goPuzzle(pi + 1));
  nav.append(kicker, prevB, nextB);
  const titleEl = document.createElement('h2');
  titleEl.className = 'pz-title';
  const taskEl = document.createElement('p');
  taskEl.className = 'pz-task';
  const meta = document.createElement('div');
  meta.className = 'pz-meta';
  head.append(nav, titleEl, taskEl, meta);

  // board
  const board = document.createElement('div');
  board.className = 'pz-board';
  const keysId = `${uid}-keys`;

  const binP = document.createElement('section');
  binP.className = 'pz-panel pz-bin-p';
  const binH = document.createElement('div');
  binH.className = 'pz-ph';
  const binTitle = document.createElement('h3');
  binTitle.id = `${uid}-binh`;
  binH.append(binTitle);
  const binList = document.createElement('ul');
  binList.className = 'pz-list pz-bin';
  binList.setAttribute('role', 'listbox');
  binList.setAttribute('aria-labelledby', binTitle.id);
  binList.setAttribute('aria-describedby', keysId);
  binP.append(binH, binList);

  const progP = document.createElement('section');
  progP.className = 'pz-panel pz-progp';
  const progH = document.createElement('div');
  progH.className = 'pz-ph';
  const progTitle = document.createElement('h3');
  progTitle.id = `${uid}-progh`;
  const tools = document.createElement('div');
  tools.className = 'pz-tools';
  tools.setAttribute('role', 'group');
  tools.setAttribute('aria-label', T('Selected line', 'Baris terpilih'));
  const mkTool = (icon, label, title, fn) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'pz-tool';
    b.innerHTML = icon;
    b.setAttribute('aria-label', label);
    b.title = title;
    b.addEventListener('click', fn);
    tools.appendChild(b);
    return b;
  };
  const tUp = mkTool(ICON.up, T('Move the selected line up', 'Pindahkan baris terpilih ke atas'), T('Move up (Alt+↑)', 'Ke atas (Alt+↑)'), () => moveSel(-1));
  const tDown = mkTool(ICON.down, T('Move the selected line down', 'Pindahkan baris terpilih ke bawah'), T('Move down (Alt+↓)', 'Ke bawah (Alt+↓)'), () => moveSel(1));
  const tOut = mkTool(ICON.outdent, T('Indent the selected line less', 'Kurangi indentasi baris terpilih'), T('Less indent (←)', 'Kurangi indentasi (←)'), () => indentSel(-1));
  const tIn = mkTool(ICON.indent, T('Indent the selected line more', 'Tambah indentasi baris terpilih'), T('More indent (→)', 'Tambah indentasi (→)'), () => indentSel(1));
  const tBin = mkTool(ICON.out, T('Send the selected line back to the cards', 'Kembalikan baris terpilih ke kartu'), T('Back to the cards (Delete)', 'Kembali ke kartu (Delete)'), () => binSel());
  progH.append(progTitle, tools);
  const progList = document.createElement('ul');
  progList.className = 'pz-list pz-prog';
  progList.setAttribute('role', 'listbox');
  progList.setAttribute('aria-labelledby', progTitle.id);
  progList.setAttribute('aria-describedby', keysId);
  progP.append(progH, progList);
  board.append(binP, progP);

  const keys = document.createElement('p');
  keys.className = 'pz-keys';
  keys.id = keysId;
  keys.innerHTML = T(
    'Drag a card by its handle, or click a card to add it after the selected line. Keyboard: <kbd>Tab</kbd> to a list, <kbd>↑</kbd> <kbd>↓</kbd> choose a line, <kbd>Enter</kbd> adds a card, <kbd>Alt</kbd>+<kbd>↑</kbd>/<kbd>↓</kbd> moves a line, <kbd>←</kbd> <kbd>→</kbd> change its indentation, <kbd>Delete</kbd> sends it back, <kbd>Ctrl</kbd>+<kbd>Enter</kbd> checks.',
    'Seret kartu lewat pegangannya, atau klik kartu untuk menambahkannya setelah baris terpilih. Papan ketik: <kbd>Tab</kbd> ke daftar, <kbd>↑</kbd> <kbd>↓</kbd> pilih baris, <kbd>Enter</kbd> menambahkan kartu, <kbd>Alt</kbd>+<kbd>↑</kbd>/<kbd>↓</kbd> memindahkan baris, <kbd>←</kbd> <kbd>→</kbd> mengubah indentasi, <kbd>Delete</kbd> mengembalikannya, <kbd>Ctrl</kbd>+<kbd>Enter</kbd> memeriksa.');

  // actions
  const actions = document.createElement('div');
  actions.className = 'pz-actions';
  const bCheck = button({ label: T('✓ Check', '✓ Periksa'), primary: true, onClick: () => doCheck() });
  bCheck.el.setAttribute('aria-label', T('Check: run the program on every test', 'Periksa: jalankan program pada setiap uji'));
  const bHint = button({ label: T('💡 Hint', '💡 Petunjuk'), onClick: () => doHint() });
  const bReset = button({ label: T('↺ Start over', '↺ Ulangi dari awal'), onClick: () => doReset() });
  const bAnswer = button({ label: T('Show answer', 'Lihat jawaban'), onClick: () => doAnswer() });
  actions.append(bCheck.el, bHint.el, bReset.el, bAnswer.el);
  const hintsEl = document.createElement('ol');
  hintsEl.className = 'pz-hints';
  hintsEl.setAttribute('aria-label', T('Hints', 'Petunjuk'));

  // feedback, tests, code and console
  const fb = document.createElement('section');
  fb.className = 'pz-fb';
  fb.setAttribute('aria-live', 'polite');
  const testsSec = document.createElement('section');
  testsSec.className = 'pz-sec';
  testsSec.setAttribute('aria-labelledby', `${uid}-testsh`);
  const testsH = document.createElement('div');
  testsH.className = 'pz-sec-h';
  testsH.innerHTML = `<h3 id="${uid}-testsh">${esc(T('Tests', 'Uji'))}</h3><small>${esc(T('Check runs your program once per test: input() gets the test input, and the output must match the output of a correct program exactly.',
    'Periksa menjalankan programmu satu kali untuk setiap uji: input() menerima masukan uji, dan keluarannya harus sama persis dengan keluaran program yang benar.'))}</small>`;
  const testsBox = document.createElement('div');
  testsBox.className = 'pz-tests';
  testsSec.append(testsH, testsBox);

  const io = document.createElement('div');
  io.className = 'pz-io';
  const cp = codePanel({
    value: '', language: 'python', editable: false, minLines: 6, maxLines: narrow ? 12 : 14, title: T('main.py: the program Python reads', 'main.py: program yang dibaca Python'), locale: lang,
    ariaLabel: T('main.py, the program assembled from your cards (read-only)', 'main.py, program yang tersusun dari kartumu (hanya baca)'), autoScroll: false,
  });
  const out = consolePanel({
    minLines: 6, maxLines: narrow ? 10 : 14, title: T('Console: python3 main.py', 'Konsol: python3 main.py'), locale: lang,
    ariaLabel: T('Console output of the selected test', 'Keluaran konsol untuk uji yang dipilih'),
    placeholder: T('Press Check: the console shows how your program runs on the selected test.', 'Tekan Periksa: konsol menampilkan jalannya programmu pada uji yang dipilih.'),
  });
  io.append(cp.el, out.el);

  main.append(head, board, keys, actions, hintsEl, fb, testsSec, io, live);

  // ------------------------------------------------------------------ rendering
  const marksFor = (st) => {
    // board / code marks from the last check (none when the board changed since)
    const r = st.result;
    const m = new Map();   // line (1-based) → { cls, badge }
    if (!r || st.stale) return m;
    if (r.kind === 'ok') { for (let i = 1; i <= st.prog.length; i++) m.set(i, { cls: 'is-good', badge: '' }); return m; }
    if (r.kind === 'syntax') { m.set(r.error.line, { cls: 'is-bad', badge: r.error.type }); return m; }
    const run = r.runs.find((x) => !x.pass);
    if (run && run.error && run.error.line && run.error.type !== 'StepLimit') m.set(run.error.line, { cls: 'is-err', badge: run.error.type });
    if (run && run.error && run.error.type === 'StepLimit' && run.error.line) m.set(run.error.line, { cls: 'is-err', badge: T('never stops', 'tidak berhenti') });
    const d = r.diag;
    if (d && d.line) m.set(d.line, { cls: 'is-bad', badge: T('check this line', 'periksa baris ini') });
    return m;
  };

  function cardEl(c, area, idx, st, marks) {
    const li = document.createElement('li');
    li.className = 'pz-item';
    li.id = `${uid}-${c.id}`;
    li.dataset.id = c.id;
    li.dataset.area = area;
    li.setAttribute('role', 'option');
    li.tabIndex = -1;
    const sel = st.sel && st.sel.id === c.id;
    li.setAttribute('aria-selected', sel ? 'true' : 'false');
    if (sel) li.classList.add('is-sel');
    const box = document.createElement('div');
    box.className = 'pz-card';
    const grip = document.createElement('span');
    grip.className = 'pz-grip';
    grip.innerHTML = ICON.grip;
    const code = document.createElement('code');
    code.className = 'pz-code cp-hl';
    code.innerHTML = highlight(c.text, 'python')[0] || '';
    box.append(grip, code);
    let label = c.text;
    if (area === 'prog') {
      const x = st.prog[idx];
      li.style.setProperty('--i', x.ind);
      const ln = document.createElement('span');
      ln.className = 'pz-ln';
      ln.setAttribute('aria-hidden', 'true');
      ln.textContent = String(idx + 1);
      li.append(ln);
      const mk = marks.get(idx + 1);
      if (mk) {
        li.classList.add(mk.cls);
        if (mk.badge) {
          const b = document.createElement('span');
          b.className = 'pz-badge';
          b.textContent = mk.badge;
          box.append(b);
        }
      }
      label = `${T('Line', 'Baris')} ${idx + 1}, ${T('indent', 'indentasi')} ${x.ind}: ${c.text}${mk && mk.badge ? ` (${mk.badge})` : ''}`;
    } else if (isRevealed(st, c.id)) {
      li.classList.add('is-out');
      li.setAttribute('aria-disabled', 'true');
      const b = document.createElement('span');
      b.className = 'pz-badge';
      b.textContent = T('distractor', 'pengecoh');
      box.append(b);
      label = `${c.text} (${T('distractor, cannot be used', 'pengecoh, tidak bisa dipakai')})`;
    }
    li.setAttribute('aria-label', label);
    li.append(box);
    return li;
  }

  function renderBoard() {
    const st = S();
    const marks = marksFor(st);
    // the lists are rebuilt: remember which card (or list) had keyboard focus so it can get it back
    const ae = document.activeElement;
    const keepId = ae && board.contains(ae) && ae.classList && ae.classList.contains('pz-item') ? ae.dataset.id : null;
    const keepList = ae === binList || ae === progList ? ae : keepId ? ae.parentElement : null;
    const bins = binIds(st);
    binList.textContent = '';
    for (const id of bins) binList.appendChild(cardEl(card(id), 'bin', 0, st, marks));
    if (!bins.length) {
      const e = document.createElement('li');
      e.className = 'pz-empty';
      e.setAttribute('role', 'presentation');
      e.textContent = T('All cards are in your program.', 'Semua kartu sudah ada di programmu.');
      binList.appendChild(e);
    }
    progList.textContent = '';
    progList.style.setProperty('--pz-levels', String(maxInd() + 1));
    st.prog.forEach((x, i) => progList.appendChild(cardEl(card(x.id), 'prog', i, st, marks)));
    if (!st.prog.length) {
      const e = document.createElement('li');
      e.className = 'pz-empty';
      e.setAttribute('role', 'presentation');
      e.textContent = narrow ? T('Tap a card above to add it here.', 'Ketuk kartu di atas untuk menambahkannya ke sini.')
        : T('Drag cards here, or click a card on the left.', 'Seret kartu ke sini, atau klik kartu di sebelah kiri.');
      progList.appendChild(e);
    }
    // roving tabindex: one tab stop per list (the selected card, else the first one; the list itself when empty)
    for (const list of [binList, progList]) {
      const items = [...list.querySelectorAll('.pz-item')];
      const target = items.find((li) => li.classList.contains('is-sel')) || items.find((li) => !li.classList.contains('is-out')) || items[0];
      if (target) { target.tabIndex = 0; list.removeAttribute('tabindex'); } else list.tabIndex = 0;
    }
    if (keepList) {
      const li = keepId && main.querySelector(`#${uid}-${keepId}`);
      if (li) focusCard(keepId, false);
      else {
        const list = keepList === binList || keepList === progList ? keepList : progList;
        const t = list.querySelector('.pz-item[tabindex="0"]') || list;
        t.focus({ preventScroll: true });
      }
    }
    binTitle.innerHTML = `${esc(T('Line cards', 'Kartu baris'))} <small>(${bins.filter((id) => !isRevealed(st, id)).length})</small>`;
    progTitle.innerHTML = `${esc(T('Your program', 'Programmu'))} <small>· ${st.prog.length} ${esc(T(st.prog.length === 1 ? 'line' : 'lines', 'baris'))}</small>`;
    renderTools();
    cp.value = sourceOf(progLines(st)).replace(/\n$/, '');
    renderCodeMarks(st, marks);
  }

  function renderCodeMarks(st, marks) {
    const r = st.result;
    if (!r || st.stale) { cp.clearMarks(); return; }
    const list = [];
    for (const [line, mk] of marks) {
      if (line > st.prog.length) continue;
      const kind = mk.cls === 'is-good' ? 'done' : mk.cls === 'is-err' ? 'error' : r.kind === 'syntax' ? 'error' : 'match';
      const m = { line, kind };
      if (mk.badge) m.note = mk.badge;
      if (r.kind === 'syntax' && line === r.error.line && r.error.col) {
        const text = sourceOf(progLines(st)).split('\n')[line - 1] || '';
        const col = Math.max(0, Math.min(text.length, r.error.col - 1));
        const end = r.error.endCol && r.error.endLine === line ? Math.min(text.length, r.error.endCol - 1) : col + 1;
        if (text.length) { m.col = Math.min(col, text.length - 1); m.endCol = Math.max(m.col + 1, end); }
      }
      list.push(m);
    }
    cp.setMarks(list);
  }

  function renderTools() {
    const st = S();
    const i = st.sel && st.sel.area === 'prog' ? st.prog.findIndex((x) => x.id === st.sel.id) : -1;
    const has = i >= 0;
    tUp.disabled = !has || i === 0;
    tDown.disabled = !has || i === st.prog.length - 1;
    tOut.disabled = !has || indentGiven || st.prog[i].ind === 0;
    tIn.disabled = !has || indentGiven || st.prog[i].ind >= maxInd();
    tBin.disabled = !has;
  }

  function renderHeader() {
    const p = pz();
    const st = S();
    kicker.textContent = `${T('Puzzle', 'Teka-teki')} ${pi + 1} / ${PUZZLES.length} · ${L(p.topic)}`;
    prevB.disabled = pi === 0;
    nextB.disabled = pi === PUZZLES.length - 1;
    titleEl.textContent = L(p.title);
    taskEl.textContent = L(p.task);
    const nLines = p.lines[lang].length;
    const nd = useDistractors ? p.distractors.length : 0;
    const solvedN = PUZZLES.filter((q) => store.get(q.key)?.solved).length;
    meta.innerHTML = [
      `<span class="pz-chip"><b>${nLines}</b> ${esc(T('lines', 'baris'))}${nd ? ` + <b>${nd}</b> ${esc(T(nd === 1 ? 'distractor' : 'distractors', 'pengecoh'))}` : ''}</span>`,
      `<span class="pz-chip">${esc(T('Checks', 'Pemeriksaan'))} <b>${st.attempts}</b></span>`,
      `<span class="pz-chip${st.solved ? ' is-ok' : ''}">${st.solved ? '✓ ' + esc(T('solved', 'terpecahkan')) : esc(T('not solved yet', 'belum terpecahkan'))}</span>`,
      `<span class="pz-chip">${esc(T('All puzzles', 'Semua teka-teki'))} <b>${solvedN}/${PUZZLES.length}</b></span>`,
    ].join('');
    const textLeft = hintsOf().length - (st.hintLog || []).filter((h) => !h.startsWith('<b>')).length;
    const moreHints = textLeft > 0 || (useDistractors && p.distractors.some((d, j) => !isRevealed(st, 'D' + j)));
    bAnswer.el.disabled = !(st.attempts >= 2 || st.solved || !moreHints);
    bAnswer.el.title = bAnswer.el.disabled ? T('Available after two checks, or once every hint is used', 'Tersedia setelah dua kali memeriksa, atau setelah semua petunjuk dipakai') : T('Arrange the model answer', 'Susun jawaban contoh');
    bHint.el.disabled = !moreHints;
    bHint.el.title = moreHints ? '' : T('No more hints for this puzzle', 'Tidak ada petunjuk lagi untuk teka-teki ini');
  }

  function renderHints() {
    const st = S();
    const items = st.hintLog || [];
    hintsEl.hidden = !items.length;
    hintsEl.innerHTML = items.map((h) => `<li>${h}</li>`).join('');
  }

  const segHTML = (segs, diffLine = -1, maxLines = 14) => {
    // console segments as HTML lines; diffLine (0-based) is tinted; long output is cut after maxLines lines
    const lines = [[]];
    for (const s of segs) {
      const parts = s.text.split('\n');
      parts.forEach((part, k) => {
        if (k > 0) lines.push([]);
        if (part) lines[lines.length - 1].push({ text: part, kind: s.kind });
      });
    }
    if (lines.length > 1 && !lines[lines.length - 1].length) lines.pop();
    const cls = { in: 'i', err: 'e', info: 'n', out: '' };
    let html = '';
    const n = Math.min(lines.length, Math.max(maxLines, diffLine + 2));
    for (let i = 0; i < n; i++) {
      const inner = lines[i].map((p) => (cls[p.kind] ? `<span class="${cls[p.kind]}">${esc(p.text)}</span>` : esc(p.text))).join('');
      html += (i === diffLine ? `<span class="d">${inner || ' '}</span>` : inner) + (i < n - 1 ? '\n' : '');
    }
    if (lines.length > n) html += `\n<span class="n">… ${esc(T(`${fmtInt(lines.length - n)} more lines`, `${fmtInt(lines.length - n)} baris lagi`))}</span>`;
    if (!html) html = `<span class="n">${esc(T('(nothing printed)', '(tidak ada keluaran)'))}</span>`;
    return html;
  };
  // the simulator's note goes on a line of its own (an infinite loop may stop in the middle of a line)
  const stepLimitSegs = (segs, err) => (err && err.simulatorLimit
    ? segs.concat([{ text: `${segs.length && !segs[segs.length - 1].text.endsWith('\n') ? '\n' : ''}■ ${T('stopped: still running after', 'dihentikan: masih berjalan setelah')} ${limitWhat(err)} ${T('(an infinite loop)', '(perulangan tak berujung)')}\n`, kind: 'info' }])
    : segs);

  function renderTests() {
    const st = S();
    const exp = expected();
    const tests = testsOf(pz(), lang);
    const r = st.result && st.result.runs && st.result.runs.length ? st.result : null;
    testsBox.textContent = '';
    tests.forEach((t, i) => {
      const art = document.createElement('article');
      art.className = 'pz-test';
      if (st.selTest === i) art.classList.add('is-sel');
      if (r && st.stale) art.classList.add('is-stale');
      const run = r ? r.runs[i] : null;
      const res = !st.result ? `<span class="pz-res none">${esc(T('not run yet', 'belum dijalankan'))}</span>`
        : !run ? `<span class="pz-res bad">${esc(T('✗ did not run', '✗ tidak berjalan'))}</span>`
          : run.pass ? `<span class="pz-res ok">✓ ${esc(T('pass', 'lolos'))}</span>`
            : `<span class="pz-res bad">✗ ${esc(run.error ? (run.error.type === 'StepLimit' ? T('never stops', 'tidak berhenti') : run.error.type) : T('wrong output', 'keluaran salah'))}</span>`;
      const inputs = t.in.length ? t.in.map((v) => (v === '' ? `<kbd class="is-blank">${esc(T('(Enter only)', '(hanya Enter)'))}</kbd>` : `<kbd>${esc(v)}</kbd>`)).join(' ')
        : `<span>${esc(T('none: the data are in the program', 'tidak ada: datanya ada di dalam program'))}</span>`;
      let html = `<div class="pz-test-h"><b>${esc(T('Test', 'Uji'))} ${i + 1}</b><span class="pz-tag${t.tag === 'boundary' || t.tag === 'invalid' || t.tag === 'negative' ? ' is-hot' : ''}">${esc(TAG[t.tag] || t.tag)}</span>${res}</div>`;
      html += `<div class="pz-in">${esc(T('Input:', 'Masukan:'))} ${inputs}</div>`;
      html += `<div class="pz-lbl exp">${esc(T('Expected output', 'Keluaran yang diharapkan'))}</div><pre class="pz-term exp">${segHTML(exp[i].segs)}</pre>`;
      if (run && !run.pass) {
        html += `<div class="pz-lbl">${esc(T('Your program printed', 'Programmu mencetak'))}</div><pre class="pz-term">${segHTML(stepLimitSegs(run.segs, run.error), run.diffLine)}</pre>`;
      } else if (run && run.pass) {
        html += `<p class="pz-same">${esc(T('✓ Your program printed exactly this.', '✓ Programmu mencetak persis ini.'))}</p>`;
      }
      art.innerHTML = html;
      if (r) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'pz-show';
        b.textContent = T('Show in console', 'Tampilkan di konsol');
        b.setAttribute('aria-pressed', st.selTest === i ? 'true' : 'false');
        b.addEventListener('click', () => {
          st.selTest = i;
          renderTests();
          renderConsole();
          const nb = testsBox.querySelectorAll('.pz-show')[i];
          if (nb) nb.focus({ preventScroll: true });
        });
        art.appendChild(b);
      }
      testsBox.appendChild(art);
    });
  }

  function renderConsole() {
    const st = S();
    const r = st.result;
    if (!r) { out.clear(); return; }
    if (r.kind === 'syntax') { out.set([{ text: r.error.traceback + '\n', kind: 'err' }]); return; }
    const run = r.runs[st.selTest] || r.runs[0];
    if (!run) { out.clear(); return; }
    const segs = stepLimitSegs(run.segs, run.error);
    out.set(segs.length ? segs : [{ text: T('(the program printed nothing)\n', '(program tidak mencetak apa pun)\n'), kind: 'info' }]);
  }

  // plain-language explanation of a Python error message
  function explain(err) {
    const m = err.message || '';
    let x;
    if (err.type === 'StepLimit') return T(`The program was still running after ${limitWhat(err)}, so it would never stop by itself: an infinite loop. Something inside the loop must change so that the condition becomes false.`,
      `Program masih berjalan setelah ${limitWhat(err)}, jadi tidak akan pernah berhenti sendiri: perulangan tak berujung. Sesuatu di dalam perulangan harus berubah agar kondisinya menjadi salah.`);
    if ((x = /^expected an indented block after (.+) on line (\d+)$/.exec(m))) return T(`Line ${x[2]} ends with a colon, so it opens a block: the line after it must be indented one step further (4 spaces) than line ${x[2]}.`,
      `Baris ${x[2]} diakhiri titik dua, jadi membuka sebuah blok: baris sesudahnya harus menjorok satu langkah (4 spasi) lebih dalam daripada baris ${x[2]}.`);
    if (/^unexpected indent/.test(m)) return T('This line is indented, but the line above it does not end with a colon, so no new block starts there. Move it to the left, or put it under a line that ends with :.',
      'Baris ini menjorok, padahal baris di atasnya tidak diakhiri titik dua, jadi tidak ada blok baru di situ. Geser ke kiri, atau letakkan di bawah baris yang diakhiri :.');
    if (/^unindent does not match/.test(m)) return T('This line moves back to an indentation that no earlier line has.', 'Baris ini mundur ke indentasi yang tidak dimiliki baris mana pun sebelumnya.');
    if (m === "expected ':'") return T('A line that opens a block (if, elif, else, for, while, def, try, except, match, case) must end with a colon.',
      'Baris yang membuka blok (if, elif, else, for, while, def, try, except, match, case) harus diakhiri titik dua.');
    if (/^cannot assign to .*Maybe you meant '==' instead of '='/.test(m)) return T('A single = stores a value in a variable; to compare two values use ==.', 'Satu tanda = menyimpan nilai ke variabel; untuk membandingkan dua nilai gunakan ==.');
    if (/^'break' outside loop/.test(m)) return T('break only works inside a loop (for or while): it must be indented into the loop body.', 'break hanya berlaku di dalam perulangan (for atau while): baris ini harus menjorok ke dalam badan perulangan.');
    if (/^'return' outside function/.test(m)) return T('return only works inside a function: indent it into the def block.', 'return hanya berlaku di dalam fungsi: jorokkan ke dalam blok def.');
    if (/^wildcard makes remaining patterns unreachable/.test(m)) return T('case _ catches every value, so a case after it could never run. Python requires case _ to be the last case.', 'case _ menangkap semua nilai, jadi case sesudahnya tidak akan pernah berjalan. Python mengharuskan case _ menjadi case terakhir.');
    if (/^expected 'except' or 'finally' block/.test(m)) return T('A try block must be followed by an except (or finally) block that lines up with try, at the same indentation.', 'Blok try harus diikuti blok except (atau finally) yang sejajar dengan try, dengan indentasi yang sama.');
    if (/^invalid syntax/.test(m)) return T('Python cannot read this line as a statement here: look at the spot under the ^ marks. Typical causes are else or except without a matching if or try right above it at the same indentation, a case outside match, or a word that does not belong.',
      'Python tidak dapat membaca baris ini sebagai pernyataan di posisi ini: lihat tempat di bawah tanda ^. Penyebab umumnya adalah else atau except tanpa if atau try yang sejajar tepat di atasnya, case di luar match, atau kata yang tidak semestinya.');
    if (err.type === 'NameError' && (x = /^name '(\w+)' is not defined/.exec(m))) return T(`When Python reached this line, ${x[1]} had no value yet. Lines run from top to bottom, so the line that creates ${x[1]} (an assignment, a for loop or a def) must run earlier.`,
      `Saat Python sampai di baris ini, ${x[1]} belum punya nilai. Baris dijalankan dari atas ke bawah, jadi baris yang membuat ${x[1]} (penugasan, perulangan for, atau def) harus berjalan lebih dulu.`);
    if (err.type === 'TypeError' && /has no len\(\)/.test(m)) return T('len() needs a collection such as a list or a string; here it got a single number.', 'len() memerlukan kumpulan data seperti list atau string; di sini ia menerima satu angka.');
    if (err.type === 'TypeError') return T('Two values of types that cannot be combined this way (for example text with a number, or a number with a list).', 'Dua nilai dengan tipe yang tidak bisa digabungkan dengan cara ini (misalnya teks dengan angka, atau angka dengan list).');
    if (err.type === 'AttributeError' && (x = /^'(\w+)' object has no attribute '(\w+)'/.exec(m))) return T(`A ${x[1]} has no method called ${x[2]}.${x[2] === 'push' ? ' Pushing onto a stack is append() in Python.' : ''}`, `${x[1]} tidak punya metode bernama ${x[2]}.${x[2] === 'push' ? ' Push pada stack ditulis append() di Python.' : ''}`);
    if (err.type === 'ValueError' && /invalid literal for int\(\)/.test(m)) return T('int() could not turn this text into a whole number, and no except ValueError caught the error.', 'int() tidak dapat mengubah teks ini menjadi bilangan bulat, dan tidak ada except ValueError yang menangkapnya.');
    if (err.type === 'EOFError') return T('The program asked for more input than this test gives: input() ran more often than it should.', 'Program meminta masukan lebih banyak daripada yang diberikan uji ini: input() dijalankan lebih sering daripada seharusnya.');
    if (err.type === 'IndexError' && /pop from empty list/.test(m)) return T('pop() on an empty list: nothing had been pushed yet when this line ran.', 'pop() pada list kosong: belum ada yang di-push ketika baris ini berjalan.');
    if (err.type === 'UnboundLocalError') return T('The function uses a variable before giving it a value inside the function.', 'Fungsi memakai variabel sebelum memberinya nilai di dalam fungsi itu.');
    return T('Python stopped at this line. Read the last line of the traceback: it names the kind of error and what went wrong.', 'Python berhenti di baris ini. Baca baris terakhir traceback: baris itu menyebut jenis error dan apa yang salah.');
  }

  const codeHTML = (text) => `<code class="cp-hl">${highlight(text, 'python')[0] || ''}</code>`;

  function diagText(r, d) {
    const lines = r.lines || [];
    if (!d) return '';
    if (d.kind === 'missing') {
      return d.after === 0 ? T('Your program is empty.', 'Programmu masih kosong.')
        : T(`Lines 1 to ${d.after} are right, but the program is not finished: more lines are needed after line ${d.after} (they are still among the cards).`,
          `Baris 1 sampai ${d.after} sudah benar, tetapi programnya belum selesai: masih ada baris yang diperlukan setelah baris ${d.after} (masih ada di antara kartu).`);
    }
    const ln = lines[d.line - 1];
    if (!ln) return '';
    const head = T(`First line to fix: line ${d.line}`, `Baris pertama yang perlu diperbaiki: baris ${d.line}`);
    if (d.kind === 'distractor') {
      const c = card(ln.id);
      return `${esc(head)} ${codeHTML(ln.text)} ${esc(T('is a distractor and does not belong in the program:', 'adalah baris pengecoh dan tidak termasuk dalam program:'))} ${esc(L(c.why))}`;
    }
    if (d.kind === 'indent') {
      return `${esc(head)} ${codeHTML(ln.text)} ${esc(d.more ? T('is the right line in the right place, but it should be indented MORE (it belongs inside the block above it).', 'adalah baris yang tepat di tempat yang tepat, tetapi indentasinya harus LEBIH DALAM (baris ini milik blok di atasnya).')
        : T('is the right line in the right place, but it should be indented LESS (it does not belong to the block above it).', 'adalah baris yang tepat di tempat yang tepat, tetapi indentasinya harus LEBIH DANGKAL (baris ini bukan milik blok di atasnya).'))}`;
    }
    return `${esc(head)} ${codeHTML(ln.text)} ${esc(T('is in the wrong place: a different line should come here (it may still be among the cards).', 'letaknya salah: seharusnya ada baris lain di posisi ini (mungkin masih ada di antara kartu).'))}`;
  }

  function renderFeedback() {
    const st = S();
    const r = st.result;
    fb.hidden = !r;
    fb.className = 'pz-fb';
    if (!r) { fb.textContent = ''; return; }
    const parts = [];
    const goBtn = (line) => (r.lines && r.lines[line - 1] ? `<button type="button" class="btn pz-go" data-id="${r.lines[line - 1].id}">${esc(T(`Go to line ${line}`, `Ke baris ${line}`))}</button>` : '');
    if (st.stale) parts.push(`<p class="muted">${esc(T('You changed the program since this check: press Check again to test the new version.', 'Programmu sudah berubah sejak pemeriksaan ini: tekan Periksa lagi untuk menguji versi barunya.'))}</p>`);
    if (r.kind === 'empty') {
      fb.classList.add('k-fail');
      parts.unshift(`<h3>${esc(T('Nothing to check yet', 'Belum ada yang bisa diperiksa'))}</h3><p>${esc(T('Your program is empty: add lines from the cards first.', 'Programmu masih kosong: tambahkan baris dari kartu terlebih dahulu.'))}</p>`);
    } else if (r.kind === 'syntax') {
      fb.classList.add('k-syntax');
      const e = r.error;
      parts.unshift(`<h3>✗ ${esc(T(`Python cannot run this program: ${e.type} on line ${e.line}`, `Python tidak dapat menjalankan program ini: ${e.type} di baris ${e.line}`))}</h3>`
        + `<p class="muted">${esc(T('Python checks the grammar and indentation of the whole file before running anything, so no test ran.', 'Python memeriksa tata bahasa dan indentasi seluruh berkas sebelum menjalankan apa pun, jadi belum ada uji yang berjalan.'))}</p>`
        + `<pre class="pz-tb">${esc(e.traceback)}</pre><p>${esc(explain(e))}</p>`
        + `<div class="pz-fbrow">${goBtn(Math.max(1, Math.min(e.line, r.lines.length)))}</div>`);
    } else if (r.kind === 'ok') {
      fb.classList.add(st.shownNow ? 'k-shown' : 'k-ok');
      if (st.shownNow) {
        parts.unshift(`<h3>${esc(T('Model answer', 'Jawaban contoh'))}</h3><p>${esc(T(`This is one correct arrangement, and it passes every test. Study why each line sits where it does and how far it is indented, then press Start over to build it yourself, or try the next puzzle.`,
          `Inilah satu susunan yang benar, dan susunan ini lolos pada setiap uji. Pelajari mengapa setiap baris berada di posisinya dan seberapa dalam indentasinya, lalu tekan Ulangi dari awal untuk menyusunnya sendiri, atau coba teka-teki berikutnya.`))}</p>`);
      } else {
        const own = r.diag && r.diag.kind !== 'same';
        parts.unshift(`<h3>✓ ${esc(`${T('Correct!', 'Benar!')} ${passAll(r.total)}.`)}</h3>`
          + `<p>${esc(T(`Solved after ${st.attempts} ${st.attempts === 1 ? 'check' : 'checks'} with ${st.hints} ${st.hints === 1 ? 'hint' : 'hints'}.`, `Terpecahkan setelah ${st.attempts} kali memeriksa dengan ${st.hints} petunjuk.`))}</p>`
          + (own ? `<p>${esc(T('Your arrangement differs from the model answer but prints the same for every test, so it is correct too.', 'Susunanmu berbeda dari jawaban contoh tetapi mencetak hal yang sama pada setiap uji, jadi juga benar.'))}</p>` : '')
          + (pi < PUZZLES.length - 1 ? `<div class="pz-fbrow"><button type="button" class="btn btn--primary pz-next">${esc(T('Next puzzle ›', 'Teka-teki berikutnya ›'))}</button></div>`
            : `<p>${esc(T('That was the last puzzle.', 'Itu teka-teki terakhir.'))}</p>`));
      }
    } else if (r.kind === 'extra') {
      fb.classList.add('k-fail');
      parts.unshift(`<h3>✗ ${esc(passAll(r.total) + T(', but a distractor is still in the program', ', tetapi masih ada pengecoh di dalam program'))}</h3>`
        + `<p>${diagText(r, r.diag)}</p><p class="muted">${esc(T('Here it happens not to change the output, but it is not part of a correct program: take it out and check again.', 'Di sini kebetulan keluarannya tidak berubah, tetapi baris itu bukan bagian dari program yang benar: keluarkan lalu periksa lagi.'))}</p>`
        + `<div class="pz-fbrow">${goBtn(r.diag.line)}</div>`);
    } else if (r.kind === 'repeat') {
      fb.classList.add('k-fail');
      const d = r.diag;
      const ln = r.lines[d.line - 1];
      const times = (n) => (n === 1 ? T('once', 'satu kali') : T(`${n} times`, `${n} kali`));
      const often = d.got > d.want;
      parts.unshift(`<h3>✗ ${esc(passAll(r.total) + (often ? T(', but one line runs too often', ', tetapi ada baris yang berjalan terlalu sering')
        : T(', but one line runs too rarely', ', tetapi ada baris yang berjalan terlalu jarang')))}</h3>`
        + `<p>${esc(T(`On test ${d.test + 1}, line ${d.line}`, `Pada uji ${d.test + 1}, baris ${d.line}`))} ${codeHTML(ln.text)} ${esc(T(`runs ${times(d.got)}, but in a correct program it runs ${times(d.want)}. The output happens to be the same, yet the program does work it does not need to: check which block this line belongs to.`,
          `berjalan ${times(d.got)}, padahal dalam program yang benar baris itu berjalan ${times(d.want)}. Keluarannya kebetulan sama, tetapi program mengerjakan hal yang tidak perlu: periksa baris ini milik blok yang mana.`))}</p>`
        + `<div class="pz-fbrow">${goBtn(d.line)}</div>`);
    } else if (r.kind === 'style') {
      fb.classList.add('k-fail');
      const ln = r.lines[r.diag.line - 1];
      parts.unshift(`<h3>✗ ${esc(passAll(r.total) + T(', but the indentation is not standard', ', tetapi indentasinya tidak standar'))}</h3>`
        + `<p>${esc(T(`Line ${r.diag.line}`, `Baris ${r.diag.line}`))} ${codeHTML(ln.text)} ${esc(T('is indented two or more steps deeper than the line above it. Python happens to accept that, but the rule in PEP 8, the Python style guide, is that a block is indented exactly one step (4 spaces) more than the line with the colon that opens it.',
          'menjorok dua langkah atau lebih dibandingkan baris di atasnya. Python kebetulan menerimanya, tetapi aturan dalam PEP 8, panduan gaya Python, adalah bahwa sebuah blok menjorok tepat satu langkah (4 spasi) lebih dalam daripada baris bertitik dua yang membukanya.'))}</p>`
        + `<div class="pz-fbrow">${goBtn(r.diag.line)}</div>`);
    } else {
      fb.classList.add('k-fail');
      const fi = r.runs.findIndex((x) => !x.pass);
      const run = r.runs[fi];
      const t = testsOf(pz(), lang)[fi];
      const inp = t.in.length ? t.in.map((v) => (v === '' ? T('(Enter only)', '(hanya Enter)') : v)).join(', ') : T('no input', 'tanpa masukan');
      let what;
      if (run.error && run.error.type === 'StepLimit') {
        what = `<p>${esc(T(`Test ${fi + 1} (input: ${inp}): the program never stopped.`, `Uji ${fi + 1} (masukan: ${inp}): program tidak pernah berhenti.`))} ${esc(explain(run.error))}</p>`;
      } else if (run.error) {
        what = `<p>${esc(T(`Test ${fi + 1} (input: ${inp}): Python stopped on line ${run.error.line} with`, `Uji ${fi + 1} (masukan: ${inp}): Python berhenti di baris ${run.error.line} dengan`))}</p>`
          + `<pre class="pz-tb">${esc(`${run.error.type}: ${run.error.message}`)}</pre><p>${esc(explain(run.error))}</p>`;
      } else {
        const e = expected()[fi].output.split('\n');
        const a = run.output.split('\n');
        const k = run.diffLine;
        const show = (s) => (s === undefined ? T('(nothing)', '(tidak ada)') : s === '' ? T('(an empty line)', '(baris kosong)') : s);
        what = `<p>${esc(T(`Test ${fi + 1} (input: ${inp}) prints something different. Output line ${k + 1} should be`, `Uji ${fi + 1} (masukan: ${inp}) mencetak hal yang berbeda. Baris keluaran ke-${k + 1} seharusnya`))} <code>${esc(show(e[k]))}</code>${esc(T(', but your program printed', ', tetapi programmu mencetak'))} <code>${esc(show(a[k]))}</code>.</p>`;
      }
      parts.unshift(`<h3>✗ ${esc(passOf(r.passed, r.total))}</h3>${what}`
        + (r.diag && r.diag.kind !== 'same' ? `<p>${diagText(r, r.diag)}</p>` : '')
        + (r.diag && r.diag.line ? `<div class="pz-fbrow">${goBtn(r.diag.line)}</div>` : ''));
    }
    fb.innerHTML = parts.join('');
  }
  fb.addEventListener('click', (e) => {
    const go = e.target.closest('.pz-go');
    if (go) {
      const st = S();
      const x = st.prog.find((y) => y.id === go.dataset.id);
      if (x) { st.sel = { area: 'prog', id: x.id }; renderBoard(); focusCard(x.id, true); }
      else say(T('That line is no longer in your program.', 'Baris itu sudah tidak ada di programmu.'));
      return;
    }
    if (e.target.closest('.pz-next')) goPuzzle(pi + 1, true);
  });

  function renderAll() {
    renderHeader();
    renderBoard();
    renderHints();
    renderFeedback();
    renderTests();
    renderConsole();
    renderSide();
  }

  // ------------------------------------------------------------------ actions on cards
  function focusCard(id, scroll) {
    const li = main.querySelector(`#${uid}-${id}`);
    if (!li) return;
    for (const other of li.parentElement.querySelectorAll('.pz-item')) other.tabIndex = -1;
    li.tabIndex = 0;
    li.focus({ preventScroll: true });
    if (scroll) li.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
  function changed() {
    const st = S();
    if (st.result && !st.stale) st.stale = true;
    st.shownNow = false;
  }
  function flash(id) {
    const li = main.querySelector(`#${uid}-${id}`);
    if (li) li.classList.add('is-new');
  }

  function addToProgram(id, { index = null, ind = null, keyboard = false } = {}) {
    const st = S();
    const c = card(id);
    if (!c || isRevealed(st, id) || inProg(st, id)) return;
    const binBefore = binIds(st).filter((x) => !isRevealed(st, x));
    let at = index;
    if (at == null) {
      const si = st.sel && st.sel.area === 'prog' ? st.prog.findIndex((x) => x.id === st.sel.id) : -1;
      at = si >= 0 ? si + 1 : st.prog.length;
    }
    const level = ind != null ? ind : indentGiven ? c.ind : 0;
    st.prog.splice(at, 0, { id, ind: Math.max(0, Math.min(maxInd(), level)) });
    st.sel = { area: 'prog', id };
    changed();
    renderAll();
    flash(id);
    say(T(`Added as line ${at + 1}: ${c.text}`, `Ditambahkan sebagai baris ${at + 1}: ${c.text}`));
    if (keyboard) {
      const k = binBefore.indexOf(id);
      const rest = binIds(st).filter((x) => !isRevealed(st, x));
      const next = rest[Math.min(k, rest.length - 1)];
      if (next) focusCard(next, true); else focusCard(id, true);
    }
  }
  function toBin(id, { keyboard = false } = {}) {
    const st = S();
    const i = st.prog.findIndex((x) => x.id === id);
    if (i < 0) return;
    st.prog.splice(i, 1);
    const next = st.prog[Math.min(i, st.prog.length - 1)];
    st.sel = next ? { area: 'prog', id: next.id } : null;
    changed();
    renderAll();
    say(T(`Back to the cards: ${card(id).text}`, `Kembali ke kartu: ${card(id).text}`));
    if (keyboard) { if (next) focusCard(next.id, true); else focusCard(id, true); }
  }
  function move(id, delta, keyboard) {
    const st = S();
    const i = st.prog.findIndex((x) => x.id === id);
    const j = i + delta;
    if (i < 0 || j < 0 || j >= st.prog.length) return;
    const [x] = st.prog.splice(i, 1);
    st.prog.splice(j, 0, x);
    st.sel = { area: 'prog', id };
    changed();
    renderAll();
    focusCard(id, keyboard);
    say(T(`Line moved to position ${j + 1}`, `Baris dipindah ke posisi ${j + 1}`));
  }
  function indent(id, delta, keyboard) {
    const st = S();
    const x = st.prog.find((y) => y.id === id);
    if (!x) return;
    if (indentGiven) { say(T('The indentation is given in this mode: only the order can change.', 'Dalam mode ini indentasi sudah diberikan: hanya urutan yang bisa diubah.')); return; }
    const v = Math.max(0, Math.min(maxInd(), x.ind + delta));
    if (v === x.ind) { say(T(`Indentation stays at ${v}`, `Indentasi tetap ${v}`)); return; }
    x.ind = v;
    st.sel = { area: 'prog', id };
    changed();
    renderAll();
    focusCard(id, keyboard);
    say(T(`Indentation ${v} (${v * 4} spaces)`, `Indentasi ${v} (${v * 4} spasi)`));
  }
  const selId = () => { const st = S(); return st.sel && st.sel.area === 'prog' ? st.sel.id : null; };
  const moveSel = (d) => { const id = selId(); if (id) move(id, d, false); };
  const indentSel = (d) => { const id = selId(); if (id) indent(id, d, false); };
  const binSel = () => { const id = selId(); if (id) toBin(id); };

  // clicks: a card in the bin goes into the program; a card in the program is selected
  let suppressClick = false;
  board.addEventListener('click', (e) => {
    if (suppressClick) return;
    const li = e.target.closest('.pz-item');
    if (!li) return;
    const id = li.dataset.id;
    if (li.dataset.area === 'bin') { addToProgram(id); return; }
    const st = S();
    st.sel = { area: 'prog', id };
    for (const o of progList.querySelectorAll('.pz-item')) { const on = o.dataset.id === id; o.classList.toggle('is-sel', on); o.setAttribute('aria-selected', on ? 'true' : 'false'); o.tabIndex = on ? 0 : -1; }
    renderTools();
  });
  board.addEventListener('dblclick', (e) => {
    const li = e.target.closest('.pz-item');
    if (li && li.dataset.area === 'prog') toBin(li.dataset.id);
  });
  board.addEventListener('focusin', (e) => {
    const li = e.target.closest('.pz-item');
    if (!li || li.dataset.area !== 'prog') return;
    const st = S();
    if (st.sel && st.sel.id === li.dataset.id) return;
    st.sel = { area: 'prog', id: li.dataset.id };
    for (const o of progList.querySelectorAll('.pz-item')) { const on = o === li; o.classList.toggle('is-sel', on); o.setAttribute('aria-selected', on ? 'true' : 'false'); o.tabIndex = on ? 0 : -1; }
    renderTools();
  });

  // keyboard on the two lists
  board.addEventListener('keydown', (e) => {
    const li = e.target.closest('.pz-item');
    if (!li || e.target !== li) return;
    const area = li.dataset.area;
    const id = li.dataset.id;
    const items = [...li.parentElement.querySelectorAll('.pz-item')];
    const k = items.indexOf(li);
    const focusAt = (n) => { const t = items[Math.max(0, Math.min(items.length - 1, n))]; if (t) focusCard(t.dataset.id, true); };
    const mod = e.altKey || e.ctrlKey || e.metaKey;
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) return;   // Ctrl+Enter = Check (handled on main)
    let handled = true;
    if (e.key === 'ArrowUp') { if (mod && area === 'prog') move(id, -1, true); else focusAt(k - 1); }
    else if (e.key === 'ArrowDown') { if (mod && area === 'prog') move(id, 1, true); else focusAt(k + 1); }
    else if (e.key === 'Home') focusAt(0);
    else if (e.key === 'End') focusAt(items.length - 1);
    else if (e.key === 'ArrowLeft' && area === 'prog') indent(id, -1, true);
    else if (e.key === 'ArrowRight' && area === 'prog') indent(id, 1, true);
    else if ((e.key === 'Enter' || e.key === ' ') && area === 'bin') {
      if (li.classList.contains('is-out')) say(T('This card is a distractor and cannot be used.', 'Kartu ini pengecoh dan tidak bisa dipakai.'));
      else addToProgram(id, { keyboard: true });
    }
    else if (e.key === ' ' && area === 'prog') { /* selection follows focus already */ }
    else if ((e.key === 'Delete' || e.key === 'Backspace') && area === 'prog') toBin(id, { keyboard: true });
    else handled = false;
    if (handled) e.preventDefault();
  });
  main.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && !e.target.closest('.cp')) { e.preventDefault(); doCheck(); }
  });

  // ------------------------------------------------------------------ pointer drag
  let drag = null;
  let dragCancelled = false;   // a started drag was cancelled while the button is still down: its release is not a click
  let dropEl = null;
  let ghost = null;
  let scrollRaf = 0;
  const onDragKey = (e) => { if (e.key === 'Escape' && drag) { e.preventDefault(); cancelDrag(); } };

  board.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 || drag) return;
    dragCancelled = false;
    const li = e.target.closest('.pz-item');
    if (!li || li.classList.contains('is-out')) return;
    const onGrip = !!e.target.closest('.pz-grip');
    if (e.pointerType === 'touch' && !onGrip) return;   // on touch screens drag by the handle; a tap is a click
    const box = li.querySelector('.pz-card').getBoundingClientRect();
    drag = { id: li.dataset.id, from: li.dataset.area, li, pid: e.pointerId, x0: e.clientX, y0: e.clientY, x: e.clientX, y: e.clientY,
      dx: e.clientX - box.left, dy: e.clientY - box.top, w: box.width, started: false, target: null };
    try { li.setPointerCapture(e.pointerId); } catch { /* ignore */ }
    if (onGrip) e.preventDefault();
  });
  board.addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.pid) return;
    drag.x = e.clientX;
    drag.y = e.clientY;
    if (!drag.started) {
      if (Math.hypot(drag.x - drag.x0, drag.y - drag.y0) < 6) return;
      startDrag();
    }
    e.preventDefault();
    placeGhost();
    updateTarget();
    autoScroll();
  });
  board.addEventListener('pointerup', (e) => {
    if (!drag && dragCancelled) {
      // e.g. Escape during a drag, then release: without this the click that follows would add the card anyway
      dragCancelled = false;
      suppressClick = true;
      setTimeout(() => { suppressClick = false; }, 0);
      return;
    }
    if (!drag || e.pointerId !== drag.pid) return;
    const d = drag;
    finishDrag();
    if (d.started) {
      suppressClick = true;
      setTimeout(() => { suppressClick = false; }, 0);
      applyDrop(d);
    }
  });
  board.addEventListener('pointercancel', (e) => { if (drag && e.pointerId === drag.pid) cancelDrag(); });
  board.addEventListener('lostpointercapture', (e) => { if (drag && e.pointerId === drag.pid && drag.started) cancelDrag(); });

  function startDrag() {
    drag.started = true;
    drag.li.classList.add('is-dragging');
    ghost = document.createElement('div');
    ghost.className = 'pz-ghost';
    ghost.innerHTML = drag.li.querySelector('.pz-card').innerHTML;
    ghost.style.width = `${Math.max(160, drag.w)}px`;
    document.body.appendChild(ghost);
    dropEl = document.createElement('div');
    dropEl.className = 'pz-drop';
    dropEl.innerHTML = '<span></span>';
    document.addEventListener('keydown', onDragKey, true);
    const cs = getComputedStyle(progList);
    drag.gut = parseFloat(cs.getPropertyValue('--pz-gut')) || 32;
    drag.indw = parseFloat(cs.getPropertyValue('--pz-indw')) || 28;
    say(T('Dragging. Drop it in your program; its left edge sets the indentation. Escape cancels.', 'Menyeret. Lepaskan di programmu; tepi kirinya menentukan indentasi. Escape membatalkan.'));
  }
  function placeGhost() {
    if (!ghost) return;
    ghost.style.transform = `translate(${Math.round(drag.x - drag.dx)}px, ${Math.round(drag.y - drag.dy)}px)`;
  }
  function updateTarget() {
    const near = (r, pad) => drag.x >= r.left - pad && drag.x <= r.right + pad && drag.y >= r.top - pad && drag.y <= r.bottom + pad;
    const pr = progP.getBoundingClientRect();
    const br = binP.getBoundingClientRect();
    binP.classList.remove('is-target');
    progP.classList.remove('is-target');
    if (near(pr, 12)) {
      const items = [...progList.querySelectorAll('.pz-item')].filter((li) => li.dataset.id !== drag.id);
      let index = 0;
      for (const li of items) { const r = li.getBoundingClientRect(); if (r.top + r.height / 2 < drag.y) index++; }
      const lr = progList.getBoundingClientRect();
      const c = card(drag.id);
      let ind = Math.round((drag.x - drag.dx - (lr.left + drag.gut)) / drag.indw);
      if (indentGiven) ind = c.ind;
      ind = Math.max(0, Math.min(maxInd(), ind));
      drag.target = { area: 'prog', index, ind };
      progP.classList.add('is-target');
      let y;
      if (!items.length) y = 10;
      else if (index === 0) y = items[0].getBoundingClientRect().top - lr.top - 3;
      else if (index >= items.length) y = items[items.length - 1].getBoundingClientRect().bottom - lr.top + 3;
      else y = (items[index - 1].getBoundingClientRect().bottom + items[index].getBoundingClientRect().top) / 2 - lr.top;
      const left = drag.gut + ind * drag.indw;
      dropEl.style.top = `${Math.round(y)}px`;
      dropEl.style.left = `${left}px`;
      dropEl.style.width = `${Math.max(40, lr.width - left - 10)}px`;
      dropEl.firstChild.textContent = `${T('line', 'baris')} ${index + 1} · ${T('indent', 'indentasi')} ${ind}`;
      if (dropEl.parentElement !== progList) progList.appendChild(dropEl);
    } else if (near(br, 12)) {
      drag.target = { area: 'bin' };
      binP.classList.add('is-target');
      dropEl.remove();
    } else {
      drag.target = null;
      dropEl.remove();
    }
  }
  function autoScroll() {
    cancelAnimationFrame(scrollRaf);
    if (!drag || !drag.started) return;
    const edge = 56;
    const h = window.innerHeight;
    const v = drag.y < edge ? -Math.ceil((edge - drag.y) / 4) : drag.y > h - edge ? Math.ceil((drag.y - (h - edge)) / 4) : 0;
    if (!v) return;
    scrollRaf = requestAnimationFrame(() => {
      if (!drag) return;
      window.scrollBy(0, v);
      updateTarget();
      autoScroll();
    });
  }
  function finishDrag() {
    cancelAnimationFrame(scrollRaf);
    if (drag && drag.li) drag.li.classList.remove('is-dragging');
    if (ghost) ghost.remove();
    if (dropEl) dropEl.remove();
    ghost = null;
    dropEl = null;
    binP.classList.remove('is-target');
    progP.classList.remove('is-target');
    document.removeEventListener('keydown', onDragKey, true);
    drag = null;
  }
  function cancelDrag() {
    const started = drag && drag.started;
    finishDrag();
    if (started) dragCancelled = true;
    if (started) say(T('Drag cancelled', 'Seret dibatalkan'));
  }
  function applyDrop(d) {
    const t = d.target;
    if (!t) return;
    const st = S();
    if (t.area === 'bin') { if (d.from === 'prog') toBin(d.id); return; }
    if (d.from === 'bin') { addToProgram(d.id, { index: t.index, ind: t.ind }); return; }
    const i = st.prog.findIndex((x) => x.id === d.id);
    if (i < 0) return;
    const [x] = st.prog.splice(i, 1);
    x.ind = t.ind;
    st.prog.splice(Math.min(t.index, st.prog.length), 0, x);
    st.sel = { area: 'prog', id: d.id };
    changed();
    renderAll();
    flash(d.id);
    say(T(`Line ${t.index + 1}, indentation ${t.ind}`, `Baris ${t.index + 1}, indentasi ${t.ind}`));
  }

  // ------------------------------------------------------------------ check, hints, reset, answer
  function doCheck() {
    if (drag) cancelDrag();
    const st = S();
    const lines = progLines(st);
    if (!lines.length) {
      st.result = { kind: 'empty', runs: [], lines: [], passed: 0, total: testsOf(pz(), lang).length };
      st.stale = false;
      renderAll();
      say(T('Your program is empty.', 'Programmu masih kosong.'));
      return;
    }
    let r;
    try { r = checkArrangement(lines, pz(), lang, expected()); } catch (err) {
      r = { kind: 'syntax', error: { type: 'Error', message: String(err && err.message || err), line: 1, traceback: String(err && err.message || err) }, runs: [], passed: 0, total: 0 };
    }
    r.lines = lines;
    st.attempts++;
    st.result = r;
    st.stale = false;
    st.shownNow = false;
    st.lastPassed = r.passed;
    if (r.kind === 'ok') { st.solved = true; if (!st.shown) st.solvedOwn = true; }
    const fi = r.runs ? r.runs.findIndex((x) => !x.pass) : -1;
    st.selTest = fi >= 0 ? fi : 0;
    renderAll();
    say(r.kind === 'ok' ? `${T('Correct!', 'Benar!')} ${passAll(r.total)}.`
      : r.kind === 'syntax' ? T(`${r.error.type} on line ${r.error.line}: ${r.error.message}`, `${r.error.type} di baris ${r.error.line}: ${r.error.message}`)
        : `${passOf(r.passed, r.total)}.`);
    const calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (fb.getBoundingClientRect().top > window.innerHeight - 80) fb.scrollIntoView({ block: 'nearest', behavior: calm ? 'auto' : 'smooth' });
  }

  function doHint() {
    const st = S();
    const p = pz();
    const hs = hintsOf();
    st.hintLog = st.hintLog || [];
    const textHints = st.hintLog.filter((h) => !h.startsWith('<b>')).length;
    if (textHints < hs.length) {
      st.hintLog.push(esc(hs[textHints]));
      st.hints++;
      say(hs[textHints]);
    } else if (useDistractors) {
      const j = p.distractors.findIndex((d, k) => !isRevealed(st, 'D' + k));
      if (j < 0) return;
      const id = 'D' + j;
      const c = card(id);
      st.revealed.push(id);
      const i = st.prog.findIndex((x) => x.id === id);
      if (i >= 0) { st.prog.splice(i, 1); if (st.sel && st.sel.id === id) st.sel = null; changed(); }
      st.hintLog.push(`<b>${esc(T('Distractor:', 'Pengecoh:'))}</b> <code>${esc(c.text)}</code> ${esc(T('does not belong in the program:', 'tidak termasuk dalam program:'))} ${esc(L(c.why))}`);
      st.hints++;
      say(T(`Distractor removed: ${c.text}`, `Pengecoh disingkirkan: ${c.text}`));
    }
    renderAll();
  }

  function doReset() {
    if (drag) cancelDrag();
    const st = S();
    st.shuffles++;
    st.order = shuffledIds(cards(), pi + 1 + st.shuffles * 31);
    st.prog = [];
    st.sel = null;
    st.result = null;
    st.stale = false;
    st.shownNow = false;
    renderAll();
    say(T('All cards are back, shuffled again.', 'Semua kartu kembali dan diacak ulang.'));
  }

  function doAnswer() {
    if (drag) cancelDrag();
    const st = S();
    const ref = pz().lines[lang];
    st.prog = ref.map((l, i) => ({ id: 'L' + i, ind: l[0] }));
    st.sel = null;
    st.shown = true;
    const r = checkArrangement(progLines(st), pz(), lang, expected());
    r.lines = progLines(st);
    st.result = r;
    st.stale = false;
    st.shownNow = true;
    st.selTest = 0;
    renderAll();
    say(T('The model answer is arranged.', 'Jawaban contoh sudah disusun.'));
  }

  // ------------------------------------------------------------------ side controls
  const options = PUZZLES.map((p, i) => ({ value: p.key, label: `${i + 1}. ${L(p.title)}` }));
  const puzzleSel = select({ label: T('Puzzle', 'Teka-teki'), key: 'puzzle', options, value: PUZZLES[0].key, onChange: (v) => goPuzzle(PUZZLES.findIndex((p) => p.key === v)) });
  const distT = toggle({
    label: T('Include distractor lines', 'Sertakan baris pengecoh'), key: 'distractors', value: true,
    onChange: (on) => {
      useDistractors = on;
      for (const st of store.values()) {
        if (on) continue;
        const kept = st.prog.filter((x) => !x.id.startsWith('D'));
        // a puzzle whose program loses a line must not keep showing the old check's marks on the shifted lines
        if (kept.length !== st.prog.length) { st.prog = kept; if (st.result) st.stale = true; st.shownNow = false; }
      }
      const st = S();
      if (st.sel && !visible(card(st.sel.id))) st.sel = null;
      changed();
      renderAll();
    },
  });
  const indT = toggle({
    label: T('Indentation given (ordering only)', 'Indentasi diberikan (hanya mengurutkan)'), key: 'indent-given', value: false,
    onChange: (on) => {
      indentGiven = on;
      if (on) {
        // every puzzle's program takes the given indentation (a check made before that is now out of date)
        for (const p of PUZZLES) {
          const st = store.get(p.key);
          if (!st) continue;
          const all = cardCache.get(p.key) || puzzleCards(p, lang);
          let moved = false;
          for (const x of st.prog) { const c = all.find((y) => y.id === x.id); if (c && x.ind !== c.ind) { x.ind = c.ind; moved = true; } }
          if (moved) { if (st.result) st.stale = true; st.shownNow = false; }
        }
      }
      renderAll();
    },
  });
  const progress = document.createElement('div');
  progress.className = 'ctrl';
  const progLbl = document.createElement('label');
  progLbl.textContent = T('Progress', 'Kemajuan');
  const progUl = document.createElement('ul');
  progUl.className = 'pz-prog-list';
  progUl.style.gridColumn = '1 / -1';
  progress.append(progLbl, document.createElement('span'), progUl);
  const note = document.createElement('p');
  note.className = 'pz-note';
  note.textContent = T('Easier: switch off the distractors, or let the cards keep their indentation. Harder: leave both as they are and use no hints.',
    'Lebih mudah: matikan baris pengecoh, atau biarkan kartu membawa indentasinya. Lebih sulit: biarkan keduanya seperti semula dan jangan memakai petunjuk.');
  ctrlPanel.append(puzzleSel.el, distT.el, indT.el, note, progress);

  function renderSide() {
    const sel = puzzleSel.el.querySelector('select');
    PUZZLES.forEach((p, i) => {
      const st = store.get(p.key);
      const o = sel.options[i];
      if (o) o.textContent = `${i + 1}. ${L(p.title)}${st && st.solved ? ' ✓' : ''}`;
    });
    if (sel.value !== pz().key) sel.value = pz().key;
    progUl.innerHTML = PUZZLES.map((p, i) => {
      const st = store.get(p.key);
      const s = st && st.solved ? '✓' : st && st.attempts ? '•' : '';
      const cls = [i === pi ? 'is-cur' : '', st && st.solved ? 'is-ok' : ''].filter(Boolean).join(' ');
      const status = st && st.solved ? T('solved', 'terpecahkan') : st && st.attempts ? T('tried', 'sudah dicoba') : T('not tried', 'belum dicoba');
      return `<li class="${cls}"><span class="st" aria-hidden="true">${s}</span><span>${i + 1}. ${esc(L(p.title))}<span class="pz-sr"> (${esc(status)})</span></span></li>`;
    }).join('');
  }

  // ------------------------------------------------------------------ lab
  const lab = labPanel({
    title: 'Parsons puzzle lab',
    filename: 'parsons-puzzle-data.csv',
    columns: [
      { key: 'puzzle', label: 'Puzzle' },
      { key: 'attempts', label: 'Attempts' },
      { key: 'hints', label: 'Hints' },
      { key: 'tests', label: 'Tests passed' },
      { key: 'correct', label: 'Correct' },
    ],
    procedure: [
      'Puzzle 1: build the program, press Check, and read the feedback before you change anything. Keep going until all tests pass, then Record.',
      'Puzzles 2 to 4: note which test catches a wrong line, a normal value or a boundary value such as 0 or 1. Record each puzzle.',
      'Puzzles 5 to 7: put a line at the wrong indentation on purpose and check. Is the result an IndentationError or a wrong output? Record.',
      'Puzzles 8 and 9: solve them with as few checks as you can. Record.',
      'Compare attempts and hints across puzzles: which kind of mistake (order, indentation or a distractor) cost you the most checks?',
    ],
    predict: 'Before you start: which will be harder for you, putting the lines in order or getting the indentation right? Why?',
    source: () => {
      const st = S();
      if (!st.attempts && !st.shown) return null;
      return {
        puzzle: `${pi + 1}. ${pz().title.en}`,
        attempts: st.attempts,
        hints: st.hints,
        // the student's own last check (the model answer arranged by Show answer is not counted)
        tests: st.attempts && st.lastPassed != null ? `${st.lastPassed}/${testsOf(pz(), lang).length}` : '–',
        correct: st.solvedOwn ? 'yes' : st.shown ? 'answer shown' : 'no',
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  // ------------------------------------------------------------------ puzzle switching
  function goPuzzle(i, focusTop = false) {
    if (i < 0 || i >= PUZZLES.length || i === pi) return;
    if (drag) cancelDrag();
    pi = i;
    renderAll();
    if (focusTop) { titleEl.tabIndex = -1; titleEl.focus({ preventScroll: true }); head.scrollIntoView({ block: 'nearest' }); }
    say(`${T('Puzzle', 'Teka-teki')} ${pi + 1}: ${L(pz().title)}`);
  }

  renderAll();

  return () => {
    if (drag) cancelDrag();
    cancelAnimationFrame(scrollRaf);
    document.removeEventListener('keydown', onDragKey, true);
    cp.destroy();
    out.destroy();
    main.remove();
    ctrlPanel.remove();
    style.remove();
  };
}
