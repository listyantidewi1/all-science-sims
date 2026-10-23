// Long-form text for the sim page (objectives, try-this prompts and the Learn block).
export default {
  objectives: {
    en: [
      'Put the lines of a short Python program in an order that solves the task, reasoning about what must already have happened before each line runs.',
      'Indent every line correctly: a block sits exactly one step (4 spaces) under the line with the colon that opens it, and the indentation decides which lines repeat or belong to a branch.',
      'Use test cases with boundary values and Python\'s own error messages to find the first wrong line, and explain why each distractor line is wrong.',
    ],
    id: [
      'Menyusun baris-baris program Python pendek dalam urutan yang menyelesaikan tugas, dengan menalar apa yang harus sudah terjadi sebelum setiap baris berjalan.',
      'Memberi indentasi yang benar pada setiap baris: sebuah blok menjorok tepat satu langkah (4 spasi) di bawah baris bertitik dua yang membukanya, dan indentasi menentukan baris mana yang diulang atau termasuk sebuah cabang.',
      'Memakai kasus uji dengan nilai batas dan pesan error Python sendiri untuk menemukan baris pertama yang salah, serta menjelaskan mengapa setiap baris pengecoh salah.',
    ],
  },
  tryThis: {
    en: [
      'Puzzle 1: build the program with the distractor that uses > instead of >= and press Check. Which test fails, and why do 80 and 74.9 still pass?',
      'Puzzle 3: indent the print line so that it sits inside the for loop, then check. How many lines does the program print now, and why?',
      'Puzzle 4: use the distractor that adds 1 instead of subtracting 1. What does the console show, and why does the test with 0 still pass?',
      'Puzzle 8: put case _: and its print before the other cases and check. What does Python say before it runs anything?',
    ],
    id: [
      'Teka-teki 1: susun program dengan pengecoh yang memakai > alih-alih >= lalu tekan Periksa. Uji mana yang gagal, dan mengapa 80 dan 74.9 tetap lolos?',
      'Teka-teki 3: jorokkan baris print sehingga berada di dalam perulangan for, lalu periksa. Berapa baris yang dicetak program sekarang, dan mengapa?',
      'Teka-teki 4: pakai pengecoh yang menambah 1 alih-alih mengurangi 1. Apa yang tampil di konsol, dan mengapa uji dengan 0 tetap lolos?',
      'Teka-teki 8: letakkan case _: beserta print-nya sebelum case lainnya lalu periksa. Apa kata Python sebelum menjalankan apa pun?',
    ],
  },

  learn: {
    background: {
      en: [
        'A Parsons problem gives you every line of a correct program, but shuffled. Dale Parsons and Patricia Haden introduced them in 2006 as a way for beginners to practise program structure without having to remember and type the syntax, and later studies (for example Ericson and colleagues, 2017) found that students solved them faster than writing or fixing the same code while learning about as much. They are often recommended for exactly this reason, and there is a classroom version too: print the lines on cards, shuffle them, add one or two distractor cards, and let the students arrange them with the right indentation in 10 to 15 minutes. This sim uses nine programs, from the pass-or-fail rule (nilai ≥ 75 LULUS) to match-case, a stack and try-except.',
        'In Python a puzzle has two dimensions, order and indentation, because indentation is part of the grammar. A line that ends with a colon (if, elif, else, for, while, def, try, except, match, case) opens a block, and the lines of that block are indented one step, 4 spaces, further. Where a line sits changes what the program does: print(total) inside a for loop runs on every round, while after the loop it runs once; total = 0 inside the loop wipes the accumulator every round. Python lines also run from top to bottom, so a variable, or a function made with def, must exist before a line uses it. Wrong indentation gives an IndentationError such as "expected an indented block after \'if\' statement on line 2" or "unexpected indent", or a program that runs but prints the wrong thing.',
        'A distractor is a line that differs from a correct one in a single detail that matters: > instead of >= (75 is the boundary value), = instead of ==, a missing colon, / instead of %, range(1, n) instead of range(1, n + 1), pop(0) (a queue) instead of pop() (a stack), push instead of append, print instead of return, or instead of | in a case pattern, except TypeError instead of except ValueError. Telling the two apart forces you to read code exactly, which is also the core skill of debugging. Some distractors stop Python before it runs (syntax errors), some stop it while running (NameError, AttributeError, an infinite loop), and some only give a wrong output on one test, usually the boundary one.',
        'Check builds main.py from your cards with 4 spaces per step and runs it with minipy, a step-by-step interpreter that follows Python 3.13 and prints the same messages as python3. Every test feeds input() and compares what is printed with the output of the model answer, so any other order that gives the same output on every test is accepted too. Three checks catch programs that pass by luck: a distractor that happens to change nothing, a block indented two steps instead of one, and a line that runs more often than needed, such as the average worked out inside the loop. Feedback names Python\'s error, or the first failing test and the first line that differs from the nearest correct arrangement. To trace a finished program line by line, see Python Step by Step; to fix code that is already written, see Bug Hunt.',
      ],
      id: [
        'Soal Parsons memberikan semua baris program yang benar, tetapi dalam keadaan teracak. Dale Parsons dan Patricia Haden memperkenalkannya pada 2006 sebagai cara bagi pemula untuk berlatih struktur program tanpa harus mengingat dan mengetik sintaksnya, dan penelitian berikutnya (misalnya Ericson dan rekan, 2017) mendapati siswa menyelesaikannya lebih cepat daripada menulis atau memperbaiki kode yang sama dengan hasil belajar yang kurang lebih setara. Soal ini sering dianjurkan justru karena alasan ini, dan ada pula versi kelasnya: cetak baris-baris program pada kartu, acak, tambahkan satu atau dua kartu pengecoh, lalu minta siswa menyusunnya dengan indentasi yang benar dalam 10 sampai 15 menit. Simulasi ini memakai sembilan program, mulai dari aturan kelulusan (nilai ≥ 75 LULUS) sampai match-case, stack, dan try-except.',
        'Dalam Python, teka-tekinya punya dua dimensi, urutan dan indentasi, karena indentasi adalah bagian dari tata bahasa. Baris yang diakhiri titik dua (if, elif, else, for, while, def, try, except, match, case) membuka sebuah blok, dan baris-baris blok itu menjorok satu langkah, 4 spasi, lebih dalam. Letak sebuah baris mengubah perilaku program: print(total) di dalam perulangan for berjalan setiap putaran, sedangkan setelah perulangan hanya sekali; total = 0 di dalam perulangan mengosongkan akumulator setiap putaran. Baris Python juga berjalan dari atas ke bawah, jadi sebuah variabel, atau fungsi yang dibuat dengan def, harus sudah ada sebelum baris lain memakainya. Indentasi yang salah menghasilkan IndentationError seperti "expected an indented block after \'if\' statement on line 2" atau "unexpected indent", atau program yang berjalan tetapi mencetak hal yang salah.',
        'Pengecoh adalah baris yang berbeda dari baris yang benar pada satu detail penting: > alih-alih >= (75 adalah nilai batas), = alih-alih ==, titik dua yang hilang, / alih-alih %, range(1, n) alih-alih range(1, n + 1), pop(0) (queue) alih-alih pop() (stack), push alih-alih append, print alih-alih return, or alih-alih | pada pola case, except TypeError alih-alih except ValueError. Membedakan keduanya memaksa kita membaca kode dengan cermat, yang juga merupakan keterampilan inti debugging. Sebagian pengecoh menghentikan Python sebelum berjalan (kesalahan sintaks), sebagian menghentikannya saat berjalan (NameError, AttributeError, perulangan tak berujung), dan sebagian hanya menghasilkan keluaran salah pada satu uji, biasanya uji nilai batas.',
        'Tombol Periksa menyusun main.py dari kartumu dengan 4 spasi per langkah lalu menjalankannya dengan minipy, interpreter langkah demi langkah yang mengikuti Python 3.13 dan mencetak pesan yang sama dengan python3. Setiap uji mengisi input() dan membandingkan cetakan program dengan keluaran jawaban contoh, sehingga urutan lain yang memberi keluaran sama pada setiap uji juga diterima. Tiga pemeriksaan tambahan menangkap program yang lolos karena kebetulan: pengecoh yang kebetulan tidak mengubah apa pun, blok yang menjorok dua langkah alih-alih satu, dan baris yang berjalan lebih sering daripada perlu, misalnya rata-rata yang dihitung di dalam perulangan. Umpan baliknya menyebut error dari Python, atau uji pertama yang gagal dan baris pertama yang berbeda dari susunan benar yang paling dekat. Untuk menelusuri program jadi baris demi baris, lihat Python Langkah demi Langkah; untuk memperbaiki kode yang sudah ditulis, lihat Berburu Bug.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: the shuffled line cards of puzzle 1, shortened (no input prompt and no label in print), with one distractor (> instead of >=). Right: the arranged program. Lines 3 and 5 are indented one step (4 spaces) because they belong to if and to else; print is not indented, so it runs for every score.',
        id: 'Kiri: kartu baris teka-teki 1 yang teracak, disingkat (tanpa teks permintaan input dan tanpa label pada print), dengan satu pengecoh (> alih-alih >=). Kanan: program yang sudah tersusun. Baris 3 dan 5 menjorok satu langkah (4 spasi) karena milik if dan else; print tidak menjorok, jadi berjalan untuk setiap nilai.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const v = L('score', 'nilai');
        const r = L('result', 'predikat');
        const pass = L('"PASS"', '"LULUS"');
        const fail = L('"FAIL"', '"TIDAK LULUS"');
        const read = `${v} = float(input())`;
        const bin = [`else:`, `${r} = ${pass}`, `if ${v} &gt; 75:`, `print(${r})`, read, `if ${v} &gt;= 75:`, `${r} = ${fail}`];
        const prog = [[0, read], [0, `if ${v} &gt;= 75:`], [1, `${r} = ${pass}`], [0, 'else:'], [1, `${r} = ${fail}`], [0, `print(${r})`]];
        const cards = bin.map((t, i) => {
          const y = 26 + i * 26;
          const d = i === 2;
          return `<rect x="8" y="${y}" width="150" height="21" rx="5" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="${d ? 0.8 : 0.45}"${d ? ' stroke-dasharray="4 3"' : ''}/>
  <text x="14" y="${y + 14}" class="m"${d ? ' opacity="0.6"' : ''}>${t}</text>${d ? `\n  <text x="150" y="${y + 15}" text-anchor="end" class="h">✕</text>` : ''}`;
        }).join('\n  ');
        const lines = prog.map(([ind, t], i) => {
          const y = 26 + i * 26;
          const x = 194 + ind * 14;
          return `<text x="189" y="${y + 14}" text-anchor="end" class="s" opacity="0.7">${i + 1}</text>
  <rect x="${x}" y="${y}" width="${352 - x}" height="21" rx="5" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.45"/>
  <text x="${x + 5}" y="${y + 14}" class="m">${t}</text>`;
        }).join('\n  ');
        return `<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Shuffled line cards with a distractor, and the same lines arranged and indented as a program', 'Kartu baris teracak dengan satu pengecoh, dan baris yang sama tersusun serta menjorok sebagai program')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{font:9px ui-monospace,Menlo,Consolas,monospace}.s{font:10px system-ui,sans-serif}.h{font:700 11px system-ui,sans-serif}</style>
  <defs><marker id="pp-ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="currentColor"/></marker></defs>
  <text x="8" y="18" class="h">${L('Line cards (shuffled)', 'Kartu baris (teracak)')}</text>
  <text x="180" y="18" class="h">${L('Your program: main.py', 'Programmu: main.py')}</text>
  ${cards}
  <path d="M161 102 H175" fill="none" stroke="currentColor" stroke-width="1.6" marker-end="url(#pp-ah)"/>
  <line x1="194" y1="22" x2="194" y2="180" stroke="currentColor" stroke-opacity="0.3" stroke-dasharray="2 3"/>
  <line x1="208" y1="22" x2="208" y2="180" stroke="currentColor" stroke-opacity="0.3" stroke-dasharray="2 3"/>
  ${lines}
  <path d="M195 196 H207" fill="none" stroke="currentColor" stroke-width="1.2" marker-end="url(#pp-ah)"/>
  <text x="212" y="200" class="s">${L('one step = 4 spaces', 'satu langkah = 4 spasi')}</text>
  <text x="8" y="228" class="s">${L('✕ distractor: &gt; leaves out 75', '✕ pengecoh: &gt; tidak menyertakan 75')}</text>
  <text x="352" y="228" text-anchor="end" class="s">${L('Check: 3 of 3 tests pass ✓', 'Periksa: 3 dari 3 uji lolos ✓')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'In Python indentation is grammar: the lines after a line ending in a colon form its block and are indented exactly one step (4 spaces).',
        'Python runs from top to bottom, so a variable or a function must be created before the line that uses it.',
        'Where a line sits decides how often it runs: inside a loop it repeats on every round, after the loop it runs once.',
        'A distractor differs from a correct line in one small detail (> or >=, = or ==, a colon, pop(0) or pop()); spotting it means reading the line exactly.',
        'A program is correct when it prints the expected output for every test, boundary values included; one passing test proves very little.',
      ],
      id: [
        'Dalam Python indentasi adalah tata bahasa: baris-baris setelah baris yang diakhiri titik dua membentuk bloknya dan menjorok tepat satu langkah (4 spasi).',
        'Python berjalan dari atas ke bawah, jadi variabel atau fungsi harus sudah dibuat sebelum baris yang memakainya.',
        'Letak sebuah baris menentukan seberapa sering baris itu berjalan: di dalam perulangan diulang setiap putaran, setelah perulangan hanya sekali.',
        'Pengecoh berbeda dari baris yang benar pada satu detail kecil (> atau >=, = atau ==, titik dua, pop(0) atau pop()); menemukannya berarti membaca baris dengan cermat.',
        'Program benar jika mencetak keluaran yang diharapkan pada setiap uji, termasuk nilai batas; satu uji yang lolos hampir tidak membuktikan apa-apa.',
      ],
    },
    vocabulary: {
      en: [
        ['Parsons problem', 'An exercise in which the lines of a correct program are given in shuffled order and have to be arranged (and, in Python, indented).'],
        ['Distractor', 'An extra line that looks like a correct one but contains a mistake; it must be left out of the program.'],
        ['Indentation', 'The spaces at the start of a line. In Python each step is 4 spaces and shows which block the line belongs to.'],
        ['Block', 'The group of indented lines that belongs to a line ending in a colon, such as the body of an if, a loop or a function.'],
        ['IndentationError', 'The error Python reports before running when a block is missing ("expected an indented block") or a line is indented where no block starts ("unexpected indent").'],
        ['Boundary value', 'A test input exactly at the edge of a condition, such as 75 for "at least 75"; it tells > and >= apart.'],
      ],
      id: [
        ['Soal Parsons', 'Latihan berupa baris-baris program yang benar dalam urutan teracak yang harus disusun (dan, dalam Python, diberi indentasi).'],
        ['Pengecoh (distractor)', 'Baris tambahan yang mirip baris yang benar tetapi mengandung kesalahan; baris ini harus ditinggalkan.'],
        ['Indentasi', 'Spasi di awal baris. Dalam Python setiap langkah adalah 4 spasi dan menunjukkan blok tempat baris itu berada.'],
        ['Blok', 'Kelompok baris menjorok yang menjadi milik baris bertitik dua, misalnya badan if, perulangan, atau fungsi.'],
        ['IndentationError', 'Error yang dilaporkan Python sebelum program berjalan jika sebuah blok tidak ada ("expected an indented block") atau sebuah baris menjorok padahal tidak ada blok yang dimulai ("unexpected indent").'],
        ['Nilai batas', 'Masukan uji yang tepat berada di tepi sebuah kondisi, misalnya 75 untuk "paling sedikit 75"; nilai ini membedakan > dari >=.'],
      ],
    },
    misconceptions: {
      en: [
        ['Indentation is only there to make code look tidy.', 'In Python indentation is syntax: it decides which lines belong to if, else, a loop or a function. Moving a line one step left or right can change the output or cause an IndentationError.'],
        ['If the program runs without an error message, it is correct.', 'A program can run cleanly and still print the wrong thing, for example with print inside the loop or > instead of >=. Only comparing the output with the expected output on several tests, boundary values included, shows it.'],
        ['There is only one correct order of the lines.', 'Lines that do not depend on each other can swap: total = 0 and n = int(input()) can come in either order, a def can come anywhere before its call, and the cases of puzzle 8 can be listed in any order as long as case _ comes last (no day matches two of them; when patterns overlap, the first matching case wins, so their order matters).'],
      ],
      id: [
        ['Indentasi hanya untuk membuat kode tampak rapi.', 'Dalam Python indentasi adalah sintaks: indentasi menentukan baris mana yang milik if, else, perulangan, atau fungsi. Menggeser satu baris satu langkah ke kiri atau ke kanan bisa mengubah keluaran atau menimbulkan IndentationError.'],
        ['Jika program berjalan tanpa pesan error, program itu benar.', 'Program bisa berjalan mulus tetapi tetap mencetak hal yang salah, misalnya print di dalam perulangan atau > alih-alih >=. Hanya membandingkan keluaran dengan keluaran yang diharapkan pada beberapa uji, termasuk nilai batas, yang dapat menunjukkannya.'],
        ['Hanya ada satu urutan baris yang benar.', 'Baris yang tidak saling bergantung dapat ditukar: total = 0 dan n = int(input()) boleh dalam urutan mana pun, def boleh di mana saja sebelum pemanggilannya, dan case pada teka-teki 8 boleh diurutkan bebas asalkan case _ berada paling akhir (tidak ada hari yang cocok dengan dua case; jika pola-polanya tumpang tindih, case pertama yang cocok yang dijalankan, sehingga urutannya penting).'],
      ],
    },
    realWorld: {
      en: [
        'Parsons problems appear in introductory programming courses and interactive textbooks such as Runestone Academy, as a step between reading code and writing it from scratch.',
        'In code review, programmers routinely spot one-character differences such as >= versus > or = versus ==, the same reading skill the distractors train.',
        'The Python style guide PEP 8 fixes indentation at 4 spaces per level, and editors and linters flag lines that break it.',
        'Unplugged in class: print the lines on paper cards, add one or two distractor cards, and let the students arrange and indent them in 10 to 15 minutes (in pairs, if you like).',
      ],
      id: [
        'Soal Parsons dipakai pada mata kuliah pemrograman dasar dan buku teks interaktif seperti Runestone Academy, sebagai tahap antara membaca kode dan menulisnya dari nol.',
        'Saat meninjau kode (code review), pemrogram sering menemukan perbedaan satu karakter seperti >= dan > atau = dan ==, keterampilan membaca yang sama dengan yang dilatih pengecoh.',
        'Panduan gaya Python PEP 8 menetapkan indentasi 4 spasi per tingkat, dan editor serta linter menandai baris yang melanggarnya.',
        'Versi tanpa komputer di kelas: cetak baris-baris program pada kartu kertas, tambahkan satu atau dua kartu pengecoh, lalu minta siswa menyusun dan memberi indentasi dalam 10 sampai 15 menit (boleh berpasangan).',
      ],
    },
    questions: {
      en: [
        { q: 'In puzzle 3, why must total = 0 come before the for line and not inside the loop?', a: 'Inside the loop total would be set back to 0 on every round, so after the loop it would hold only the last number, n, instead of 1 + 2 + … + n.' },
        { q: 'Why does the test with 75 matter in puzzle 1?', a: '75 is the boundary value. score >= 75 gives PASS but score > 75 gives FAIL; 80 and 74.9 give the same result under both conditions, so only the test with 75 tells them apart.' },
        { q: 'With the distractor print(l * w) in puzzle 6 the program shows 40 on the screen. Why is it still wrong?', a: 'print only displays the value; the function returns nothing, which in Python is None, so the last line prints Area = None. A function that must give its result back to the caller needs return.' },
        { q: 'Python accepts a block indented 8 spaces. Why does the puzzle still reject it?', a: 'The convention in PEP 8, Python\'s style guide, is exactly one step (4 spaces) per block. Consistent indentation makes the structure easy to read, and the puzzle checks that you know which block each line belongs to, not just a version that happens to run.' },
      ],
      id: [
        { q: 'Pada teka-teki 3, mengapa total = 0 harus berada sebelum baris for dan bukan di dalam perulangan?', a: 'Di dalam perulangan, total akan dikembalikan ke 0 setiap putaran, sehingga setelah perulangan isinya hanya angka terakhir, n, bukan 1 + 2 + … + n.' },
        { q: 'Mengapa uji dengan 75 penting pada teka-teki 1?', a: '75 adalah nilai batas. nilai >= 75 menghasilkan LULUS tetapi nilai > 75 menghasilkan TIDAK LULUS; 80 dan 74.9 memberi hasil yang sama pada kedua kondisi, jadi hanya uji dengan 75 yang dapat membedakannya.' },
        { q: 'Dengan pengecoh print(p * l) pada teka-teki 6, program menampilkan 40 di layar. Mengapa masih salah?', a: 'print hanya menampilkan nilai; fungsi tidak mengembalikan apa pun, yang dalam Python berarti None, sehingga baris terakhir mencetak Luas = None. Fungsi yang harus memberikan hasilnya kepada pemanggil memerlukan return.' },
        { q: 'Python menerima blok yang menjorok 8 spasi. Mengapa teka-teki ini tetap menolaknya?', a: 'Kesepakatan dalam PEP 8, panduan gaya Python, adalah tepat satu langkah (4 spasi) per blok. Indentasi yang konsisten membuat struktur mudah dibaca, dan teka-teki ini memeriksa bahwa kamu tahu setiap baris milik blok yang mana, bukan sekadar versi yang kebetulan bisa berjalan.' },
      ],
    },
  },
};
