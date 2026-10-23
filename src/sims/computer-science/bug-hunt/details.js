// Long-form text for the sim page (objectives, try-this prompts and the Learn block).
export default {
  objectives: {
    en: [
      'Classify program errors as syntax, runtime or logic errors from when and how they appear, and explain why Python reveals them in that order.',
      'Read a Python traceback from the last line up, find the line it names and fix the cause, changing one thing at a time.',
      'Design test cases with normal, boundary, extreme, empty and invalid inputs, use them to expose logic errors, and protect int(input()) with try-except.',
    ],
    id: [
      'Mengklasifikasikan kesalahan program sebagai kesalahan sintaks, runtime, atau logika berdasarkan kapan dan bagaimana kesalahan itu muncul, serta menjelaskan mengapa Python memunculkannya dalam urutan itu.',
      'Membaca traceback Python dari baris terakhir ke atas, menemukan baris yang disebut, dan memperbaiki penyebabnya dengan mengubah satu hal setiap kali.',
      'Merancang kasus uji dengan masukan normal, batas, ekstrem, kosong, dan tidak valid, memakainya untuk mengungkap kesalahan logika, serta melindungi int(input()) dengan try-except.',
    ],
  },
  tryThis: {
    en: [
      'Play level 2, the pocket-money program: find its three bugs in the order Python shows them, then open the answer key and compare it with your bug log.',
      'In level 3, fix only the IndentationError and the NameError and run the tests again. Why do 80 and 100 pass while the boundary test 75 still fails?',
      'In level 5, after fixing the TypeError, the first test (five scores) already passes although the program is still wrong. Which test exposes the bug, and why?',
      'In level 7, once number - 1 is in place, protect the print line with try: ... except IndexError: only and run. What does number 0 print, and why does no error appear?',
    ],
    id: [
      'Mainkan level 2, program uang saku: temukan ketiga bugnya sesuai urutan Python memunculkannya, lalu buka kunci jawaban dan bandingkan dengan tabel temuanmu.',
      'Di level 3, perbaiki hanya IndentationError dan NameError lalu jalankan uji lagi. Mengapa 80 dan 100 lolos sedangkan uji batas 75 masih gagal?',
      'Di level 5, setelah TypeError diperbaiki, uji pertama (lima nilai) sudah lolos padahal programnya masih salah. Uji mana yang mengungkap bugnya, dan mengapa?',
      'Di level 7, setelah nomor - 1 terpasang, lindungi baris print hanya dengan try: ... except IndexError: lalu jalankan. Apa yang dicetak untuk nomor 0, dan mengapa tidak muncul error?',
    ],
  },

  learn: {
    background: {
      en: [
        'A bug is a mistake in a program, and bugs can be sorted by when they show up. A syntax error is found before the program runs: Python first reads the whole file, and if the grammar is wrong (a missing colon, an unclosed quote or bracket, => instead of >=, a block that is not indented) it prints SyntaxError or IndentationError with a caret ^ and runs nothing at all. A runtime error, or exception, happens while the program runs, when a line asks for something impossible: a name that does not exist (NameError), text plus a number (TypeError), int("lima") (ValueError), a list index past the end (IndexError) or a division by zero (ZeroDivisionError). The program stops at that line and prints a traceback. A logic error gives no message at all: the program finishes, but its output is wrong, as with > instead of >=, total = x instead of total = total + x, elif branches in the wrong order, or dividing by a fixed 5 instead of the number of values.',
        'Read a traceback from the bottom up. The last line names the kind of error and says what happened; the line "File "main.py", line 4" above it says where; and the indented line under that is the code that failed. For a syntax error the caret marks the spot where Python got stuck, and the real mistake is often just before it or at the end of the line above. Python 3.13 also suggests fixes, for example NameError: name \'stats\' is not defined. Did you mean: \'status\'? In this sim a helper labels every line of the traceback and explains the last one in plain words, like a dictionary of error messages.',
        'Errors queue up. Syntax errors come first, for the whole file; then the first runtime error, when its line runs; and logic errors only show when the output is compared with an answer worked out by hand. That is why the debugging cycle is: read the message, go to the line, change one thing, run again. A test case pairs an input with its expected output. Normal values check the main path; boundary values (75 and 74.9 for "pass when the score is at least 75", 90, 80 and 70 for grades A to D) check that > and >= are right; extreme, empty and invalid inputs (0, 100, nothing typed, a word, 0 groups, number 5 on a list of 4) check that the program does not crash. In level 5 the hard-coded 5 passes the test with five scores, which is why a single test is never enough.',
        'try-except handles errors that come from outside the program, such as a user typing "lima" or 0: the risky lines go in a try: block and each kind of exception gets its own except block with a friendly message. It does not replace fixing your own code. In level 7, except IndexError catches number 5 but not number 0, because 0 - 1 = -1 and duty_students[-1] is a valid index (the last name), so no exception happens; checking 1 <= number <= 4 with if is the real fix. The programs run in minipy, a JavaScript implementation of Python 3.13 that prints the same output, error messages and tracebacks as python3 (python3 also underlines the failing part of a line with ~~~^~~ marks, which the sim leaves out); the expected outputs come from running the corrected program. To trace a program step by step see Python Step by Step, and to translate a problem into code see From Problem to Program.',
      ],
      id: [
        'Bug adalah kesalahan dalam program, dan bug dapat dikelompokkan berdasarkan kapan bug itu muncul. Kesalahan sintaks ditemukan sebelum program berjalan: Python membaca seluruh berkas lebih dulu, dan jika tata bahasanya salah (lupa titik dua, tanda petik atau kurung yang tidak ditutup, => padahal >=, blok yang tidak dijorokkan) Python menampilkan SyntaxError atau IndentationError dengan tanda ^ dan tidak menjalankan apa pun. Kesalahan runtime, atau exception, terjadi saat program berjalan, ketika sebuah baris meminta hal yang mustahil: nama yang tidak ada (NameError), teks ditambah angka (TypeError), int("lima") (ValueError), indeks list yang melewati ujung (IndexError), atau pembagian dengan nol (ZeroDivisionError). Program berhenti di baris itu dan menampilkan traceback. Kesalahan logika tidak memberi pesan sama sekali: program selesai, tetapi keluarannya salah, misalnya > padahal >=, total = x padahal total = total + x, urutan elif yang keliru, atau membagi dengan angka 5 yang ditulis mati alih-alih banyak data.',
        'Bacalah traceback dari bawah ke atas. Baris terakhir menyebut jenis error dan apa yang terjadi; baris "File "main.py", line 4" di atasnya menyebut di mana; dan baris menjorok di bawahnya adalah kode yang gagal. Pada kesalahan sintaks, tanda ^ menunjuk tempat Python tersendat, dan kesalahan sebenarnya sering tepat sebelumnya atau di akhir baris di atasnya. Python 3.13 juga menyarankan perbaikan, misalnya NameError: name \'stats\' is not defined. Did you mean: \'status\'? Di simulasi ini, sebuah bantuan memberi keterangan pada setiap baris traceback dan menjelaskan baris terakhirnya dalam bahasa sederhana, seperti kamus pesan error.',
        'Kesalahan mengantre. Kesalahan sintaks muncul paling dulu, untuk seluruh berkas; lalu kesalahan runtime pertama, ketika barisnya dijalankan; dan kesalahan logika baru tampak jika keluaran dibandingkan dengan jawaban hitungan manual. Itulah sebabnya siklus debugging adalah: baca pesannya, lompat ke barisnya, ubah satu hal, jalankan lagi. Kasus uji memasangkan sebuah masukan dengan keluaran yang diharapkan. Nilai normal memeriksa alur utama; nilai batas (75 dan 74,9 untuk "lulus jika nilai paling sedikit 75", 90, 80, dan 70 untuk predikat A sampai D) memeriksa apakah > dan >= sudah tepat; masukan ekstrem, kosong, dan tidak valid (0, 100, tidak mengetik apa pun, sebuah kata, 0 kelompok, nomor 5 pada daftar berisi 4) memeriksa bahwa program tidak berhenti mendadak. Di level 5, angka 5 yang ditulis mati lolos pada uji dengan lima nilai; karena itulah satu uji tidak pernah cukup.',
        'try-except menangani kesalahan yang berasal dari luar program, misalnya pengguna mengetik "lima" atau 0: baris yang berisiko dimasukkan ke blok try: dan setiap jenis exception mendapat blok except sendiri dengan pesan yang ramah. try-except bukan pengganti memperbaiki kode sendiri. Di level 7, except IndexError menangkap nomor 5 tetapi tidak menangkap nomor 0, karena 0 - 1 = -1 dan siswa_piket[-1] adalah indeks yang sah (nama terakhir), sehingga tidak ada exception; pemeriksaan 1 <= nomor <= 4 dengan if adalah perbaikan yang sebenarnya. Program dijalankan oleh minipy, implementasi JavaScript untuk Python 3.13 yang mencetak keluaran, pesan error, dan traceback yang sama dengan python3 (python3 juga menggarisbawahi bagian baris yang gagal dengan tanda ~~~^~~, yang tidak ditampilkan simulasi ini); keluaran yang diharapkan berasal dari program yang sudah diperbaiki. Untuk menelusuri program langkah demi langkah lihat Python Langkah demi Langkah, dan untuk menerjemahkan masalah menjadi kode lihat Dari Masalah ke Program.',
      ],
    },
    figure: {
      caption: {
        en: 'When each kind of error shows up. Python first checks the grammar of the whole file (syntax errors: nothing runs), then runs it line by line (runtime errors: a traceback stops it at one line); a logic error gives no message and only shows when the output is compared with the expected output.',
        id: 'Kapan setiap jenis kesalahan muncul. Python lebih dulu memeriksa tata bahasa seluruh berkas (kesalahan sintaks: tidak ada yang dijalankan), lalu menjalankannya baris demi baris (kesalahan runtime: traceback menghentikannya di satu baris); kesalahan logika tidak memberi pesan dan baru tampak saat keluaran dibandingkan dengan keluaran yang diharapkan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const col = (x, color, title, code, codeColor, lines) => `
  <rect x="${x}" y="46" width="112" height="152" rx="8" fill="none" stroke="${color}" stroke-width="1.6"/>
  <text x="${x + 56}" y="64" text-anchor="middle" class="h" style="fill:${color}">${title}</text>
  ${code}
  ${lines.filter(Boolean).map((t, i) => `<text x="${x + 8}" y="${120 + i * 14}" class="s">${t}</text>`).join('\n  ')}`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Timeline of syntax, runtime and logic errors', 'Garis waktu kesalahan sintaks, runtime, dan logika')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.s{font:10.5px system-ui,sans-serif}.m{font:10.5px ui-monospace,Menlo,monospace}.h{font:700 11.5px system-ui,sans-serif}.a{fill:none;stroke:currentColor;stroke-width:1.4}</style>
  <defs><marker id="bh-ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="currentColor"/></marker></defs>
  <path d="M10 33 H350" class="a" marker-end="url(#bh-ah)"/>
  <text x="64" y="22" text-anchor="middle" class="s">${L('1. check the whole file', '1. periksa berkas')}</text>
  <text x="180" y="22" text-anchor="middle" class="s">${L('2. run line by line', '2. jalankan per baris')}</text>
  <text x="296" y="22" text-anchor="middle" class="s">${L('3. compare the output', '3. bandingkan hasil')}</text>
  <circle cx="64" cy="33" r="4" fill="#8b5cf6"/><circle cx="180" cy="33" r="4" fill="#ea580c"/><circle cx="296" cy="33" r="4" fill="#0284c7"/>
  ${col(8, '#8b5cf6', L('Syntax error', 'Sintaks'),
    `<text x="16" y="86" class="m">print("Halo)</text>
  <text x="53.8" y="98" class="m" style="fill:#ef4444">^</text>`, '', [
      'SyntaxError,', 'IndentationError.', L('Python refuses the', 'Tata bahasa'), L('grammar: not one', 'ditolak: belum'), L('line runs.', 'ada baris jalan.')])}
  ${col(124, '#ea580c', L('Runtime error', 'Runtime'),
    `<text x="132" y="86" class="m">nilai[4]</text>
  <text x="132" y="100" class="m" style="fill:#ef4444">IndexError</text>`, '', [
      L('Traceback: the', 'Ada traceback;'), L('program stops at', 'program berhenti'), L('the failing line.', 'di baris yang'), L('Earlier lines ran.', 'gagal.')])}
  ${col(240, '#0284c7', L('Logic error', 'Logika'),
    `<text x="248" y="86" class="m">${L('want', 'harap')} 17500.0</text>
  <text x="248" y="100" class="m" style="fill:#ef4444">${L('got ', 'dapat')}  6250.0</text>`, '', [
      L('No message at all.', 'Tanpa pesan.'), L('Only a test with a', 'Hanya uji dengan'), L('known answer', 'jawaban pasti'), L('catches it.', 'yang bisa'), L('', 'menangkapnya.')])}
  <text x="180" y="218" text-anchor="middle" class="s">${L('Errors queue up: fix one thing, run again, meet the next one.', 'Kesalahan mengantre: ubah satu hal, lalu jalankan lagi.')}</text>
  <text x="180" y="233" text-anchor="middle" class="s">${L('Boundary, empty and invalid tests find what normal values miss.', 'Nilai batas dan masukan aneh menangkap bug tersembunyi.')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A syntax error is found before anything runs; a runtime error stops the program at one line with a traceback; a logic error gives no message, only a wrong output.',
        'Read a traceback from the bottom: first the error type and message, then the line number, then the line of code. For a syntax error, also check just before the caret and the line above.',
        'Errors queue up (syntax, then runtime, then logic), so fix one thing at a time and run the tests again.',
        'A test case pairs an input with its expected output. Include boundary values (75 and 74.9), extremes (0, 100), empty input and invalid input, not only normal values.',
        'A program that passes one test can still be wrong: a logic error stays hidden until some test case has a different answer.',
        'try-except handles errors caused by input from outside the program; it does not replace fixing your own bugs, and it only catches errors that actually happen.',
      ],
      id: [
        'Kesalahan sintaks ditemukan sebelum apa pun dijalankan; kesalahan runtime menghentikan program di satu baris dengan traceback; kesalahan logika tidak memberi pesan, hanya keluaran yang salah.',
        'Bacalah traceback dari bawah: jenis error dan pesannya dulu, lalu nomor baris, lalu baris kodenya. Untuk kesalahan sintaks, periksa juga tepat sebelum tanda ^ dan baris di atasnya.',
        'Kesalahan mengantre (sintaks, lalu runtime, lalu logika), jadi ubah satu hal setiap kali dan jalankan uji lagi.',
        'Kasus uji memasangkan masukan dengan keluaran yang diharapkan. Sertakan nilai batas (75 dan 74,9), nilai ekstrem (0, 100), masukan kosong, dan masukan tidak valid, bukan hanya nilai normal.',
        'Program yang lolos satu uji masih bisa salah: kesalahan logika tetap tersembunyi sampai ada kasus uji dengan jawaban yang berbeda.',
        'try-except menangani kesalahan yang disebabkan oleh masukan dari luar program; try-except bukan pengganti memperbaiki bug sendiri, dan hanya menangkap error yang benar-benar terjadi.',
      ],
    },
    vocabulary: {
      en: [
        ['Bug', 'A mistake in a program that makes it stop or give a wrong result.'],
        ['Debugging', 'Finding the cause of a bug and fixing it: read the message, find the line, change one thing, run again.'],
        ['Syntax error', 'Code that breaks Python\'s grammar (SyntaxError, IndentationError). It is reported before the program runs.'],
        ['Runtime error (exception)', 'An error while the program runs, such as NameError, TypeError, ValueError, IndexError or ZeroDivisionError. The program stops at that line.'],
        ['Logic error', 'The program runs to the end without a message, but its output is wrong.'],
        ['Traceback', 'Python\'s report of an error: where it happened (file, line, code) and, on the last line, the kind of error and its message.'],
        ['Test case', 'A planned input together with the output the program should give for it.'],
        ['Boundary value', 'An input exactly at or just past a limit in a condition, such as 75 and 74.9 for "score >= 75".'],
        ['try-except', 'A block that runs risky lines (try) and handles a named kind of exception (except) instead of crashing.'],
      ],
      id: [
        ['Bug', 'Kesalahan dalam program yang membuatnya berhenti atau memberi hasil yang salah.'],
        ['Debugging', 'Menemukan penyebab bug dan memperbaikinya: baca pesannya, cari barisnya, ubah satu hal, jalankan lagi.'],
        ['Kesalahan sintaks', 'Kode yang melanggar tata bahasa Python (SyntaxError, IndentationError). Dilaporkan sebelum program berjalan.'],
        ['Kesalahan runtime (exception)', 'Error saat program berjalan, misalnya NameError, TypeError, ValueError, IndexError, atau ZeroDivisionError. Program berhenti di baris itu.'],
        ['Kesalahan logika', 'Program berjalan sampai selesai tanpa pesan, tetapi keluarannya salah.'],
        ['Traceback', 'Laporan Python tentang sebuah error: tempat terjadinya (berkas, baris, kode) dan, di baris terakhir, jenis error beserta pesannya.'],
        ['Kasus uji (test case)', 'Masukan yang direncanakan beserta keluaran yang seharusnya diberikan program.'],
        ['Nilai batas', 'Masukan yang tepat berada di batas sebuah kondisi atau sedikit melewatinya, misalnya 75 dan 74,9 untuk "nilai >= 75".'],
        ['try-except', 'Blok yang menjalankan baris berisiko (try) dan menangani jenis exception tertentu (except) alih-alih berhenti mendadak.'],
      ],
    },
    misconceptions: {
      en: [
        ['If no error message appears, the program is correct.', 'Logic errors never produce a message. Level 2 prints "Average: 6250.0" without complaint; only comparing with the hand calculation 17500.0 shows the bug.'],
        ['The mistake is always on the line the traceback names.', 'That is where Python noticed the problem. A missing colon or bracket is often reported at the next spot, and an IndexError on one line can come from a wrong range() or a missing - 1 on another.'],
        ['Wrapping the code in try-except fixes the bugs.', 'try-except only catches errors that happen. In level 7 the index -1 is valid, so except IndexError never runs for number 0. A bare except: even hides the errors you need to see.'],
        ['Testing with a couple of normal values is enough.', 'Normal values pass with > as well as with >=. Only the boundary value 75 shows the difference, and only an empty or invalid input shows a crash.'],
      ],
      id: [
        ['Jika tidak muncul pesan error, programnya benar.', 'Kesalahan logika tidak pernah memunculkan pesan. Level 2 mencetak "Rata-rata: 6250.0" tanpa protes; hanya perbandingan dengan hitungan manual 17500.0 yang menunjukkan bugnya.'],
        ['Kesalahan selalu berada di baris yang disebut traceback.', 'Baris itu adalah tempat Python menyadari masalahnya. Titik dua atau kurung yang hilang sering dilaporkan di tempat berikutnya, dan IndexError di satu baris bisa berasal dari range() yang salah atau - 1 yang terlupa di baris lain.'],
        ['Membungkus kode dengan try-except memperbaiki bugnya.', 'try-except hanya menangkap error yang terjadi. Di level 7 indeks -1 sah, sehingga except IndexError tidak pernah dijalankan untuk nomor 0. except: tanpa nama error bahkan menyembunyikan error yang perlu kita lihat.'],
        ['Menguji dengan beberapa nilai normal sudah cukup.', 'Nilai normal lolos baik dengan > maupun >=. Hanya nilai batas 75 yang menunjukkan perbedaannya, dan hanya masukan kosong atau tidak valid yang memperlihatkan program berhenti mendadak.'],
      ],
    },
    realWorld: {
      en: [
        'Software teams keep hundreds of automated test cases that run after every change (continuous integration): the test table of this sim, done by a computer.',
        'In 1999 NASA lost the Mars Climate Orbiter because one program gave thrust data in pound-force seconds and another expected newton seconds: a logic error that produced no error message.',
        'In 1996 the first Ariane 5 rocket was destroyed about 37 seconds after launch when flight software reused from Ariane 4 tried to convert a value too large for a 16-bit integer: a runtime error on input the older rocket never produced.',
        'Python 3.10 and later give friendlier messages, such as "\'(\' was never closed" and "Did you mean: \'status\'?", to help programmers, especially beginners, find their mistakes faster.',
        'Rubber duck debugging: explaining the code line by line, even to a toy duck, often reveals the bug while you say it.',
      ],
      id: [
        'Tim perangkat lunak menyimpan ratusan kasus uji otomatis yang dijalankan setiap kali ada perubahan (continuous integration): tabel kasus uji pada simulasi ini, dikerjakan oleh komputer.',
        'Pada 1999 NASA kehilangan Mars Climate Orbiter karena satu program memberi data dorongan dalam satuan pound-force detik sedangkan program lain mengharapkan newton detik: kesalahan logika yang tidak memunculkan pesan error.',
        'Pada 1996 roket Ariane 5 yang pertama hancur sekitar 37 detik setelah peluncuran ketika perangkat lunak yang dipakai ulang dari Ariane 4 mencoba mengubah nilai yang terlalu besar untuk bilangan bulat 16 bit: kesalahan runtime pada masukan yang tidak pernah muncul di roket lama.',
        'Python 3.10 ke atas memberi pesan yang lebih ramah, seperti "\'(\' was never closed" dan "Did you mean: \'status\'?", agar pemrogram, terutama pemula, lebih cepat menemukan kesalahannya.',
        'Rubber duck debugging: menjelaskan kode baris demi baris, bahkan kepada bebek mainan, sering membuat bugnya ketahuan saat diucapkan.',
      ],
    },
    questions: {
      en: [
        { q: 'A program prints "Average: 6250.0 - Thrifty class", but by hand (10000 + 20000 + 15000 + 25000) / 4 = 17500.0. There is no error message. What kind of error is it, and how do you find it?', a: 'A logic error. Trace the accumulator with a small trace table or a print("DEBUG total =", total) inside the loop: total ends as 25000, the last amount, because total = pocket_money[i] replaces it instead of total = total + pocket_money[i].' },
        { q: 'The pocket-money program in level 2 has a missing colon on line 6 and an IndexError on line 4. Why does Python report line 6 first?', a: 'Python checks the grammar of the whole file before it runs any line, so the syntax error stops everything. The IndexError can only happen when line 4 actually runs, after the syntax is fixed.' },
        { q: 'Choose test inputs for "LULUS when the score is at least 75" and say why each one is there.', a: 'Normal: 80 (pass) and 60 (fail). Boundary: 75 (must pass, catches > instead of >=) and 74.9 (must fail). Extreme: 0 and 100. Invalid: a word such as "abc" or an empty input, which must give a friendly message instead of a crash.' },
        { q: 'In level 7 the program uses try: ... except IndexError: around print(duty_students[number - 1]). Number 5 prints the message, but number 0 prints Dina. Why, and how do you fix it?', a: '0 - 1 = -1, and a negative index counts from the end, so duty_students[-1] is "Dina" and no IndexError happens. Check the range before indexing: if 1 <= number <= len(duty_students): print the name, else print the message.' },
      ],
      id: [
        { q: 'Program mencetak "Rata-rata: 6250.0 - Kelas Hemat", padahal hitungan manual (10000 + 20000 + 15000 + 25000) / 4 = 17500.0. Tidak ada pesan error. Kesalahan jenis apa ini, dan bagaimana menemukannya?', a: 'Kesalahan logika. Telusuri akumulatornya dengan tabel penelusuran kecil atau print("DEBUG total =", total) di dalam perulangan: total berakhir 25000, nilai terakhir, karena total = uang_saku[i] menggantinya alih-alih total = total + uang_saku[i].' },
        { q: 'Program uang saku di level 2 punya titik dua yang hilang di baris 6 dan IndexError di baris 4. Mengapa Python melaporkan baris 6 lebih dulu?', a: 'Python memeriksa tata bahasa seluruh berkas sebelum menjalankan satu baris pun, sehingga kesalahan sintaks menghentikan semuanya. IndexError baru bisa terjadi ketika baris 4 benar-benar dijalankan, setelah sintaksnya diperbaiki.' },
        { q: 'Pilih masukan uji untuk "LULUS jika nilai paling sedikit 75" dan jelaskan alasan setiap masukan.', a: 'Normal: 80 (lulus) dan 60 (tidak lulus). Batas: 75 (harus lulus, menangkap > padahal >=) dan 74,9 (harus tidak lulus). Ekstrem: 0 dan 100. Tidak valid: kata seperti "abc" atau masukan kosong, yang harus memberi pesan ramah, bukan membuat program berhenti mendadak.' },
        { q: 'Di level 7 program memakai try: ... except IndexError: di sekitar print(siswa_piket[nomor - 1]). Nomor 5 mencetak pesannya, tetapi nomor 0 mencetak Dina. Mengapa, dan bagaimana memperbaikinya?', a: '0 - 1 = -1, dan indeks negatif dihitung dari ujung, sehingga siswa_piket[-1] adalah "Dina" dan tidak terjadi IndexError. Periksa rentangnya sebelum mengambil indeks: if 1 <= nomor <= len(siswa_piket): cetak namanya, else cetak pesannya.' },
      ],
    },
  },
};
