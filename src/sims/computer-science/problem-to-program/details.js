// Long-form text for the sim page (objectives, try-this prompts and the Learn section).
export default {
  objectives: {
    en: [
      'Translate a problem through the algorithm-design stages (IPO table, descriptive steps, pseudocode, flowchart) and then into Python.',
      'Match every pseudocode line to its flowchart symbol and its Python statement: READ → input(), ← → =, IF → if, FOR → for … in range(), DISPLAY → print().',
      'Check a translation with a trace table and test data that include the boundary case.',
    ],
    id: [
      'Menerjemahkan masalah melalui tahap perancangan algoritma (tabel IPO, langkah deskriptif, pseudocode, flowchart) lalu ke Python.',
      'Mencocokkan setiap baris pseudocode dengan simbol flowchart dan pernyataan Python-nya: READ → input(), ← → =, IF → if, FOR → for … in range(), DISPLAY → print().',
      'Memeriksa hasil translasi dengan trace table dan data uji yang memuat kasus batas.',
    ],
  },
  tryThis: {
    en: [
      'In "Pass or not", run the test values 80, 75 and 74.9 one after another and watch which arrow (Yes or No) lights up as the flow leaves the diamond.',
      'Press "Insert a common mistake", then "Test all data". Which test value catches the bug, and why is it that one?',
      'Click "Process" in the IPO table (stage 2): which flowchart symbols and which Python lines light up?',
      'In "Sum 1 to n", step through n = 0 and n = 5. How many times does the hexagon send the flow down the Yes arrow?',
    ],
    id: [
      'Pada "Predikat kelulusan", jalankan data uji 80, 75, dan 74.9 bergantian dan perhatikan panah mana (Ya atau Tidak) yang menyala saat alur keluar dari belah ketupat.',
      'Tekan "Sisipkan kesalahan umum", lalu "Uji semua data". Data uji mana yang menangkap bug-nya, dan mengapa justru yang itu?',
      'Klik "Proses" pada tabel IPO (tahap 2): simbol flowchart dan baris Python mana yang menyala?',
      'Pada "Jumlah 1 sampai n", telusuri n = 0 dan n = 5 langkah demi langkah. Berapa kali segi enam mengirim alur ke panah Ya?',
    ],
  },
  learn: {
    background: {
      en: [
        'A computer cannot read a word problem; it needs an algorithm: a finite list of clear, effective steps that turns input into output. A common teaching method follows a fixed route from a problem to an algorithm: (1) understand the problem, what is known and what is asked; (2) fill in an IPO table (input, process, output); (3) write the steps as plain descriptive sentences; (4) rewrite them as pseudocode with notation such as READ, ←, IF … THEN … ELSE … ENDIF, FOR … DO … ENDFOR and DISPLAY; (5) draw a flowchart with the standard symbols; (6) test it with a trace table. After that comes one last step: the translation into Python.',
        'Every notation says the same thing with different symbols. A parallelogram (input/output) becomes input() or print(); a rectangle (process) becomes an assignment with =; a diamond (decision) becomes if …: with an indented block, where the Yes arrow is the indented lines and the No arrow is the else block; a hexagon (preparation) marks a counted loop and becomes for i in range(…):, and an arrow that turns back up means repetition. In this simulation every symbol is linked to its pseudocode line, its Python line(s), its descriptive step and its row of the IPO table, so a click on any of them lights up the rest.',
        'Running the program uses minipy, a Python interpreter written in JavaScript that follows Python 3.13. It executes one statement per step: the highlighted Python line is the one about to run, and the matching pseudocode line and flowchart symbol light up with it. When a condition is tested, the Yes or No arrow that was actually taken lights up. The trace table records, for every statement, the value of each variable after it ran, the result of the condition and any input or output, exactly like a trace table done on paper.',
        'A translation is only correct if it behaves the same as the algorithm for every input. Good test data mixes ordinary values with the boundary case: 75 for "score ≥ 75", exactly Rp100,000 for "more than Rp100,000", n = 0 for a loop. Each problem has a common mistake built in. A few fail every test (a forgotten int() stops with a TypeError), but most pass some tests and fail others: > instead of ≥ fails only at 75, side + side still passes for 2 and 0, the IF hides a missing ÷ 100 for a 120% discount, and range(1, n) instead of range(1, n + 1) still gives the right sum for n = 0. That is why a single passing test proves very little. For running flowcharts of other algorithms, see the Flowchart Runner sim.',
      ],
      id: [
        'Komputer tidak bisa membaca soal cerita; ia membutuhkan algoritma: daftar langkah yang terbatas, jelas, dan efektif untuk mengubah masukan menjadi keluaran. Metode yang umum diajarkan mengikuti jalur tetap dari masalah ke algoritma: (1) pahami masalah, apa yang diketahui dan apa yang ditanya; (2) isi tabel IPO (input, proses, output); (3) tulis langkahnya dalam kalimat deskriptif; (4) ubah menjadi pseudocode dengan notasi seperti READ, ←, IF … THEN … ELSE … ENDIF, FOR … DO … ENDFOR, dan DISPLAY; (5) gambar flowchart dengan simbol baku; (6) uji dengan trace table. Setelah itu ada satu langkah terakhir: translasi ke Python.',
        'Setiap notasi menyatakan hal yang sama dengan simbol berbeda. Jajar genjang (input/output) menjadi input() atau print(); persegi panjang (proses) menjadi penugasan dengan =; belah ketupat (keputusan) menjadi if …: dengan blok menjorok, di mana panah Ya adalah baris yang menjorok dan panah Tidak adalah blok else; segi enam (persiapan) menandai perulangan terhitung dan menjadi for i in range(…):, sedangkan panah yang berbalik ke atas berarti pengulangan. Di simulasi ini setiap simbol terhubung dengan baris pseudocode, baris Python, langkah deskriptif, dan baris tabel IPO-nya, sehingga klik pada salah satunya menyalakan yang lain.',
        'Program dijalankan dengan minipy, interpreter Python yang ditulis dalam JavaScript dan mengikuti Python 3.13. Satu pernyataan dijalankan per langkah: baris Python yang disorot adalah baris yang akan berjalan, dan baris pseudocode serta simbol flowchart yang cocok ikut menyala. Ketika sebuah kondisi diuji, panah Ya atau Tidak yang benar-benar dilalui ikut menyala. Trace table mencatat, untuk setiap pernyataan, nilai setiap variabel sesudahnya, hasil kondisi, serta masukan atau keluarannya, persis seperti trace table yang dibuat di kertas.',
        'Translasi baru benar jika berperilaku sama dengan algoritmanya untuk setiap masukan. Data uji yang baik mencampur nilai biasa dengan kasus batas: 75 untuk "nilai ≥ 75", tepat Rp100.000 untuk "melebihi Rp100.000", n = 0 untuk perulangan. Setiap masalah punya satu kesalahan umum yang disiapkan. Beberapa gagal di semua data uji (int() yang terlupa berhenti dengan TypeError), tetapi kebanyakan lolos pada sebagian data uji dan gagal pada yang lain: > alih-alih ≥ hanya gagal di 75, sisi + sisi tetap lolos untuk 2 dan 0, IF menutupi ÷ 100 yang hilang pada diskon 120%, dan range(1, n) alih-alih range(1, n + 1) tetap memberi jumlah yang benar untuk n = 0. Karena itu satu data uji yang lolos belum membuktikan banyak. Untuk menjalankan flowchart algoritma lain, lihat simulasi Penjalan Diagram Alir.',
      ],
    },
    figure: {
      caption: {
        en: 'One logic, three notations (the 10% discount problem, shortened: pay 90% when the total is more than Rp100,000). Each statement becomes one flowchart symbol and one Python line. The Yes arrow below the diamond becomes the indented block under if; the No arrow skips it and rejoins the flow where ENDIF closes the block, which Python marks by ending the indentation.',
        id: 'Satu logika, tiga notasi (soal diskon 10%, diringkas: bayar 90% jika total melebihi Rp100.000). Setiap pernyataan menjadi satu simbol flowchart dan satu baris Python. Panah Ya di bawah belah ketupat menjadi blok menjorok di bawah if; panah Tidak melompatinya dan bergabung lagi dengan alur di tempat ENDIF menutup blok, yang di Python ditandai dengan berakhirnya indentasi.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        // a complete IF without ELSE: the No path is a real skip, so every input gives an output
        const rows = [
          { y: 50, ps: ['READ total'], py: 'total = int(input())' },
          { y: 102, ps: ['IF total &gt; 100000 THEN'], py: 'if total &gt; 100000:' },
          { y: 154, ps: ['  total ← total × 0.9', 'ENDIF'], py: '    total = total * 0.9' },
          { y: 206, ps: ['DISPLAY total'], py: 'print(total)' },
        ];
        const psText = (rw) => (rw.ps.length === 1
          ? `<text x="10" y="${rw.y + 3}" class="c">${rw.ps[0]}</text>`
          : rw.ps.map((t, k) => `<text x="10" y="${rw.y - 4 + k * 15}" class="c">${t}</text>`).join(''));
        return `<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('The same algorithm as pseudocode, flowchart and Python', 'Algoritma yang sama sebagai pseudocode, flowchart, dan Python')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.c{font:9px ui-monospace,Menlo,Consolas,monospace;white-space:pre}.h{font-weight:700}.k{font-size:9px}.s{fill:none;stroke:currentColor;stroke-width:1.4}.g{stroke:currentColor;stroke-opacity:.22;stroke-dasharray:3 3}.a{fill:currentColor}</style>
  <text x="10" y="18" class="h">Pseudocode</text>
  <text x="175" y="18" class="h" text-anchor="middle">Flowchart</text>
  <text x="232" y="18" class="h">Python</text>
  <line x1="6" y1="26" x2="354" y2="26" class="g"/>
  <line x1="6" y1="76" x2="354" y2="76" class="g"/>
  <line x1="6" y1="128" x2="354" y2="128" class="g"/>
  <line x1="6" y1="180" x2="354" y2="180" class="g"/>
  ${rows.map((rw) => `${psText(rw)}<text x="232" y="${rw.y + 3}" class="c">${rw.py}</text>`).join('\n  ')}
  <polygon points="153,38 209,38 201,62 145,62" class="s"/>
  <text x="177" y="54" text-anchor="middle" class="k">input</text>
  <polygon points="175,84 211,102 175,120 139,102" class="s"/>
  <text x="175" y="105" text-anchor="middle" class="k">&gt; 100000 ?</text>
  <rect x="145" y="142" width="60" height="24" rx="2" class="s"/>
  <text x="175" y="157" text-anchor="middle" class="k">${L('process', 'proses')}</text>
  <polygon points="153,194 209,194 201,218 145,218" class="s"/>
  <text x="177" y="210" text-anchor="middle" class="k">output</text>
  <line x1="175" y1="62" x2="175" y2="80" class="s"/><polygon points="171,78 179,78 175,84" class="a"/>
  <line x1="175" y1="120" x2="175" y2="138" class="s"/><polygon points="171,136 179,136 175,142" class="a"/>
  <text x="180" y="133" class="k">${L('Yes', 'Ya')}</text>
  <polyline points="211,102 224,102 224,180 181,180" class="s"/><polygon points="181,176.5 181,183.5 175,180" class="a"/>
  <text x="217" y="94" text-anchor="middle" class="k">${L('No', 'Tidak')}</text>
  <line x1="175" y1="166" x2="175" y2="190" class="s"/><polygon points="171,188 179,188 175,194" class="a"/>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The logic stays the same in every notation; only the symbols change: READ → parallelogram → input(); ← → rectangle → =; IF → diamond → if …:; FOR → hexagon → for … in range(); DISPLAY → parallelogram → print().',
        'Python indentation does the job of the Yes/No branches of a flowchart: the indented block under if is the Yes path, the block under else is the No path.',
        'An arrow that turns back up in a flowchart means a loop; a counted loop (the hexagon) becomes for … in range().',
        'input() always gives text, so READ becomes int(input()) or float(input()) when the value is a number.',
        'Test data must include the boundary case; a wrong translation can pass every ordinary value.',
      ],
      id: [
        'Logikanya tetap sama di setiap notasi; hanya simbolnya yang berganti: READ → jajar genjang → input(); ← → persegi panjang → =; IF → belah ketupat → if …:; FOR → segi enam → for … in range(); DISPLAY → jajar genjang → print().',
        'Indentasi Python menggantikan cabang Ya/Tidak pada flowchart: blok menjorok di bawah if adalah jalur Ya, blok di bawah else adalah jalur Tidak.',
        'Panah yang berbalik ke atas pada flowchart berarti perulangan; perulangan terhitung (segi enam) menjadi for … in range().',
        'input() selalu menghasilkan teks, sehingga READ menjadi int(input()) atau float(input()) jika nilainya bilangan.',
        'Data uji harus memuat kasus batas; translasi yang salah bisa lolos pada semua nilai biasa.',
      ],
    },
    vocabulary: {
      en: [
        ['Algorithm', 'A finite list of clear, effective steps that turns input into output.'],
        ['IPO table', 'A table of the Input, the Process and the Output of a problem.'],
        ['Pseudocode', 'Algorithm steps written in a code-like notation (READ, ←, IF … THEN … ENDIF, DISPLAY) for people to read; no computer runs it directly.'],
        ['Flowchart', 'A diagram of standard symbols joined by arrows: terminal, parallelogram (input/output), rectangle (process), diamond (decision), hexagon (preparation).'],
        ['Trace table', 'A table that follows an algorithm step by step and records the value of every variable, so the output can be checked by hand.'],
        ['Boundary case', 'A test value right at the edge of a condition, such as 75 for "≥ 75"; it catches > versus ≥ mistakes.'],
      ],
      id: [
        ['Algoritma', 'Daftar langkah yang terbatas, jelas, dan efektif untuk mengubah masukan menjadi keluaran.'],
        ['Tabel IPO', 'Tabel berisi Input, Proses, dan Output sebuah masalah.'],
        ['Pseudocode', 'Langkah algoritma yang ditulis dengan notasi mirip kode (READ, ←, IF … THEN … ENDIF, DISPLAY) agar mudah dibaca manusia; tidak dijalankan langsung oleh komputer.'],
        ['Flowchart', 'Diagram berisi simbol baku yang dihubungkan anak panah: terminal, jajar genjang (input/output), persegi panjang (proses), belah ketupat (keputusan), segi enam (persiapan).'],
        ['Trace table', 'Tabel yang menelusuri algoritma langkah demi langkah dan mencatat nilai setiap variabel, sehingga keluaran dapat diperiksa dengan tangan.'],
        ['Kasus batas', 'Data uji yang tepat berada di tepi sebuah kondisi, misalnya 75 untuk "≥ 75"; ia menangkap kesalahan > dan ≥.'],
      ],
    },
    misconceptions: {
      en: [
        ['If the program gives the right answer for one test value, the translation is correct.', 'A wrong translation can pass ordinary values: writing > instead of ≥ still gives the right result for 80 and 74.9. Only the boundary case 75 reveals the bug.'],
        ['input() gives a number when the user types digits.', 'input() always returns text (str). READ score becomes score = float(input()) or int(input()); without the conversion, "12" * "12" is a TypeError.'],
        ['← and = mean "is equal to", as in maths.', 'Both mean "store the value on the right in the variable on the left", which is why total ← total + i makes sense. Python tests equality with ==.'],
        ['Pseudocode must follow strict grammar, like a programming language.', 'Pseudocode has no single fixed standard; it uses common notation so people can read it. Python, in contrast, refuses to run code with a syntax error.'],
      ],
      id: [
        ['Jika program benar untuk satu data uji, translasinya pasti benar.', 'Translasi yang salah bisa lolos pada nilai biasa: menulis > alih-alih ≥ tetap benar untuk 80 dan 74,9. Hanya kasus batas 75 yang membongkar bug-nya.'],
        ['input() menghasilkan bilangan jika pengguna mengetik angka.', 'input() selalu mengembalikan teks (str). READ nilai menjadi nilai = float(input()) atau int(input()); tanpa konversi, "12" * "12" menimbulkan TypeError.'],
        ['← dan = berarti "sama dengan" seperti di matematika.', 'Keduanya berarti "simpan nilai di kanan ke variabel di kiri", karena itu jumlah ← jumlah + i masuk akal. Python menguji kesamaan dengan ==.'],
        ['Pseudocode harus mengikuti tata bahasa ketat seperti bahasa pemrograman.', 'Pseudocode tidak punya satu standar baku; ia memakai notasi umum agar mudah dibaca manusia. Sebaliknya, Python menolak menjalankan kode yang salah sintaks.'],
      ],
    },
    realWorld: {
      en: [
        'Software teams still sketch pseudocode and flowcharts in design documents so that everyone agrees on the logic before anyone writes code.',
        'Cash registers apply rules such as "10% off above Rp100,000"; values exactly on the limit are where billing bugs hide, so testers always try them.',
        'School report systems compare scores with a pass mark (KKM); a test at exactly the pass mark checks that ≥ was not typed as >.',
        'Professional programmers test edge cases such as 0, empty input and the largest value, because off-by-one errors like range(1, n) show up there.',
      ],
      id: [
        'Tim pengembang perangkat lunak masih membuat sketsa pseudocode dan flowchart di dokumen desain agar semua sepakat tentang logikanya sebelum menulis kode.',
        'Mesin kasir menerapkan aturan seperti "diskon 10% di atas Rp100.000"; nilai yang tepat di batas adalah tempat bug tagihan bersembunyi, sehingga penguji selalu mencobanya.',
        'Sistem rapor membandingkan nilai dengan KKM; uji tepat pada nilai KKM memastikan ≥ tidak tertulis sebagai >.',
        'Programmer profesional menguji kasus tepi seperti 0, masukan kosong, dan nilai terbesar, karena kesalahan selisih satu seperti range(1, n) muncul di sana.',
      ],
    },
    questions: {
      en: [
        { q: 'In "Pass or not", which arrow leaves the diamond for score = 75, and which Python line runs next?', a: 'score >= 75 is True for 75, so the Yes arrow is taken and the next line is result = "PASSED" (Python line 3, pseudocode line 7).' },
        { q: 'Why is 100000 an important test value for the 10% discount problem?', a: '"More than Rp100,000" means total > 100000, so exactly 100000 must get no discount. A program written with >= gives the discount at 100000; only this boundary test reveals the difference.' },
        { q: 'How many times does the loop body in "Sum 1 to n" run when n = 0, and what is printed?', a: 'range(1, 1) is empty, so the body runs zero times: the hexagon sends the flow straight along the No arrow and the program prints a sum of 0.' },
        { q: 'Translate F ← 9/5 × C + 32 into Python. What goes wrong with 9 / 5 * (C + 32)?', a: 'F = 9 / 5 * C + 32. With the brackets, 32 is added before multiplying, so 100 °C gives 237.6 instead of 212.0.' },
      ],
      id: [
        { q: 'Pada "Predikat kelulusan", panah mana yang keluar dari belah ketupat untuk nilai = 75, dan baris Python mana yang berjalan berikutnya?', a: 'nilai >= 75 bernilai True untuk 75, jadi panah Ya yang dilalui dan baris berikutnya adalah predikat = "LULUS" (baris Python 3, baris pseudocode 7).' },
        { q: 'Mengapa 100000 adalah data uji penting untuk soal diskon 10%?', a: '"Melebihi Rp100.000" berarti total_belanja > 100000, jadi tepat 100000 tidak boleh mendapat diskon. Program yang ditulis dengan >= memberi diskon pada 100000; hanya uji batas ini yang menunjukkan perbedaannya.' },
        { q: 'Berapa kali badan perulangan pada "Jumlah 1 sampai n" berjalan untuk n = 0, dan apa yang ditampilkan?', a: 'range(1, 1) kosong, jadi badannya berjalan nol kali: segi enam langsung mengirim alur ke panah Tidak dan program menampilkan jumlah 0.' },
        { q: 'Terjemahkan F ← 9/5 × C + 32 ke Python. Apa yang salah dengan 9 / 5 * (C + 32)?', a: 'F = 9 / 5 * C + 32. Dengan tanda kurung, 32 dijumlahkan sebelum dikali, sehingga 100 °C menghasilkan 237.6, bukan 212.0.' },
      ],
    },
  },
};
