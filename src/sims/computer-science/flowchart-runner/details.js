// Long-form text for the Flowchart Runner sim page.
export default {
  objectives: {
    en: [
      'Read a flowchart and name what each symbol does: start/end, input/output, process, and decision.',
      'Trace an algorithm step by step with a trace table, predicting the value of every variable before the computer shows it.',
      'Match each flowchart block to its line of pseudocode and explain how a loop is built from a decision and an arrow that goes back.',
    ],
    id: [
      'Membaca diagram alir dan menyebutkan fungsi setiap simbol: mulai/selesai, masukan/keluaran, proses, dan percabangan.',
      'Menelusuri algoritma langkah demi langkah dengan tabel penelusuran, memprediksi nilai setiap variabel sebelum komputer menampilkannya.',
      'Memasangkan setiap blok diagram alir dengan baris pseudokodenya dan menjelaskan bagaimana perulangan dibangun dari percabangan dan panah yang kembali.',
    ],
  },
  tryThis: {
    en: [
      'Choose "Largest of three", set a = 7, b = 12, c = 5 and press Step until the end. How many times did the answer "max" change?',
      'Choose "Sum 1..n" with n = 5. Before each Step, say out loud what sum and i will become. Then try n = 0: how many times does the loop body run?',
      'Choose "GCD by subtraction" with a = 48, b = 18. Count the steps. Then try a = 1, b = 30 and watch the step counter.',
      'Run FizzBuzz with n = 15 and read the Output line. Which numbers printed a word instead of a number, and why?',
    ],
    id: [
      'Pilih "Terbesar dari tiga", atur a = 7, b = 12, c = 5 dan tekan Langkah sampai selesai. Berapa kali nilai "max" berubah?',
      'Pilih "Jumlah 1..n" dengan n = 5. Sebelum setiap Langkah, ucapkan nilai sum dan i yang akan muncul. Lalu coba n = 0: berapa kali badan perulangan dijalankan?',
      'Pilih "FPB dengan pengurangan" dengan a = 48, b = 18. Hitung langkahnya. Lalu coba a = 1, b = 30 dan perhatikan penghitung langkah.',
      'Jalankan FizzBuzz dengan n = 15 dan baca baris Keluaran. Bilangan mana yang mencetak kata, bukan angka, dan mengapa?',
    ],
  },

  learn: {
    background: {
      en: [
        'An algorithm is a finite list of clear steps that solves a problem. Before we write a program, we often draw the algorithm as a flowchart: each step is a box and the arrows show the order. Flowcharts use a small set of standard symbols. A rounded box (terminal) marks Start and End. A parallelogram is input or output, where data comes in from the user or goes out to the screen. A rectangle is a process, where a value is calculated or stored in a variable, for example max ← a. A diamond is a decision: it asks a yes/no question and has two arrows leaving it.',
        'A variable is a named box in the computer\'s memory that holds one value at a time. The arrow ← means "store this value in that variable", so i ← i + 1 reads the old value of i, adds one, and stores the result back. When you trace an algorithm you keep a trace table: one row per step with the current value of every variable and anything that has been output. Computers do exactly this, one step at a time, with no skipping and no guessing.',
        'Decisions let an algorithm branch, and a decision whose arrow leads back to an earlier block makes a loop. The Sum 1..n chart loops while i ≤ n, adding i to sum each time, so for n = 5 the body runs 5 times and sum becomes 15. The GCD chart loops while a ≠ b, subtracting the smaller number from the larger, and the number left when they become equal is the greatest common divisor, exactly as Euclid described more than 2000 years ago. For 48 and 18 the values go (48,18) → (30,18) → (12,18) → (12,6) → (6,6), so GCD = 6.',
        'Pseudocode is the same algorithm written as short structured text, with keywords like INPUT, IF ... THEN, WHILE ... DO and OUTPUT. In this sim every flowchart block has a matching pseudocode line, highlighted at the same time. Watching both side by side shows that a flowchart and pseudocode are two views of one idea, and that a real program in Python or Scratch is simply a third view of it.',
      ],
      id: [
        'Algoritma adalah daftar langkah yang jelas dan berhingga untuk menyelesaikan suatu masalah. Sebelum menulis program, kita sering menggambar algoritma sebagai diagram alir: setiap langkah adalah sebuah kotak dan panah menunjukkan urutannya. Diagram alir memakai sedikit simbol baku. Kotak membulat (terminal) menandai Mulai dan Selesai. Jajar genjang adalah masukan atau keluaran, tempat data masuk dari pengguna atau keluar ke layar. Persegi panjang adalah proses, tempat suatu nilai dihitung atau disimpan ke variabel, misalnya max ← a. Belah ketupat adalah percabangan: ia mengajukan pertanyaan ya/tidak dan punya dua panah keluar.',
        'Variabel adalah kotak bernama di memori komputer yang menyimpan satu nilai pada satu waktu. Panah ← berarti "simpan nilai ini ke variabel itu", jadi i ← i + 1 membaca nilai lama i, menambah satu, lalu menyimpan hasilnya kembali. Saat menelusuri algoritma kamu membuat tabel penelusuran: satu baris per langkah berisi nilai setiap variabel saat itu dan apa pun yang sudah dikeluarkan. Komputer melakukan persis seperti ini, satu langkah demi satu langkah, tanpa melompat dan tanpa menebak.',
        'Percabangan membuat algoritma bisa bercabang, dan percabangan yang panahnya kembali ke blok sebelumnya membentuk perulangan. Diagram Jumlah 1..n berulang selama i ≤ n, menambahkan i ke sum setiap kali, sehingga untuk n = 5 badan perulangan dijalankan 5 kali dan sum menjadi 15. Diagram FPB berulang selama a ≠ b, mengurangkan bilangan yang lebih kecil dari yang lebih besar, dan bilangan yang tersisa saat keduanya sama adalah faktor persekutuan terbesar, persis seperti yang dijelaskan Euclid lebih dari 2000 tahun lalu. Untuk 48 dan 18 nilainya berjalan (48,18) → (30,18) → (12,18) → (12,6) → (6,6), sehingga FPB = 6.',
        'Pseudokode adalah algoritma yang sama yang ditulis sebagai teks terstruktur yang ringkas, dengan kata kunci seperti BACA, JIKA ... MAKA, SELAMA ... LAKUKAN dan TULIS. Di simulasi ini setiap blok diagram alir punya baris pseudokode yang sesuai dan disorot pada saat yang sama. Melihat keduanya berdampingan menunjukkan bahwa diagram alir dan pseudokode adalah dua tampilan dari satu gagasan, dan program sungguhan dalam Python atau Scratch hanyalah tampilan ketiganya.',
      ],
    },
    figure: {
      caption: {
        en: 'The four flowchart symbols used in the sim, and how a decision with a back-arrow forms the loop in Sum 1..n. Trace for n = 3: sum goes 0 → 1 → 3 → 6, then i = 4 fails the test and the sum is output.',
        id: 'Empat simbol diagram alir yang dipakai di simulasi, dan bagaimana percabangan dengan panah balik membentuk perulangan pada Jumlah 1..n. Penelusuran untuk n = 3: sum berjalan 0 → 1 → 3 → 6, lalu i = 4 gagal pada pengujian dan sum dikeluarkan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Flowchart symbols and a loop', 'Simbol diagram alir dan sebuah perulangan')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{fill:none;stroke:currentColor;stroke-width:1.4}.k{font:10px system-ui,sans-serif;fill:currentColor;opacity:.75}.c{text-anchor:middle}</style>
  <defs><marker id="fa" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="currentColor"/></marker></defs>
  <rect x="14" y="14" width="78" height="22" rx="11" class="s"/><text x="53" y="29" class="c">${L('Start / End', 'Mulai / Selesai')}</text>
  <text x="14" y="50" class="k">${L('terminal', 'terminal')}</text>
  <path d="M22 66 L96 66 L86 88 L12 88 Z" class="s"/><text x="54" y="81" class="c">${L('Input / Output', 'Masukan / Keluaran')}</text>
  <text x="14" y="102" class="k">${L('data in or out', 'data masuk atau keluar')}</text>
  <rect x="14" y="116" width="78" height="22" class="s"/><text x="53" y="131" class="c">max ← a</text>
  <text x="14" y="152" class="k">${L('process', 'proses')}</text>
  <path d="M53 166 L96 183 L53 200 L10 183 Z" class="s"/><text x="53" y="187" class="c">b &gt; max?</text>
  <text x="14" y="216" class="k">${L('decision: yes / no', 'percabangan: ya / tidak')}</text>
  <rect x="210" y="10" width="64" height="20" rx="10" class="s"/><text x="242" y="24" class="c">${L('Start', 'Mulai')}</text>
  <line x1="242" y1="30" x2="242" y2="40" class="s" marker-end="url(#fa)"/>
  <path d="M216 42 L276 42 L270 60 L210 60 Z" class="s"/><text x="243" y="55" class="c">${L('Input n', 'Baca n')}</text>
  <line x1="242" y1="60" x2="242" y2="70" class="s" marker-end="url(#fa)"/>
  <rect x="204" y="72" width="76" height="20" class="s"/><text x="242" y="86" class="c">i ← 1, sum ← 0</text>
  <line x1="242" y1="92" x2="242" y2="102" class="s" marker-end="url(#fa)"/>
  <path d="M242 104 L286 122 L242 140 L198 122 Z" class="s"/><text x="242" y="126" class="c">i ≤ n?</text>
  <text x="246" y="152" class="k">${L('yes', 'ya')}</text>
  <line x1="242" y1="140" x2="242" y2="156" class="s" marker-end="url(#fa)"/>
  <rect x="204" y="158" width="76" height="20" class="s"/><text x="242" y="172" class="c">sum ← sum + i</text>
  <line x1="242" y1="178" x2="242" y2="188" class="s" marker-end="url(#fa)"/>
  <rect x="204" y="190" width="76" height="20" class="s"/><text x="242" y="204" class="c">i ← i + 1</text>
  <path d="M242 210 L242 224 L182 224 L182 122 L194 122" class="s" marker-end="url(#fa)"/>
  <text x="290" y="118" class="k">${L('no', 'tidak')}</text>
  <path d="M286 122 L306 122" class="s" marker-end="url(#fa)"/>
  <path d="M316 112 L358 112 L352 132 L310 132 Z" class="s"/><text x="334" y="126" class="c">${L('Out sum', 'Tulis sum')}</text>
  <text x="168" y="236" class="k">${L('loop: the arrow goes back up', 'perulangan: panah kembali ke atas')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'An algorithm is a finite sequence of unambiguous steps; a flowchart draws it, pseudocode writes it, a program runs it.',
        'Four symbols cover most flowcharts: terminal (start/end), parallelogram (input/output), rectangle (process) and diamond (decision).',
        'A variable holds one value at a time; x ← x + 1 replaces the old value with a new one.',
        'A decision has exactly two exits (yes/no). An exit arrow that returns to an earlier block creates a loop, which must eventually make the condition false or the program never ends.',
        'A trace table records every variable after every step; it is the most reliable way to find a bug by hand.',
        'The number of steps depends on the input: GCD(48, 18) takes a few steps, GCD(1, 30) takes many.',
      ],
      id: [
        'Algoritma adalah urutan langkah yang jelas dan berhingga; diagram alir menggambarnya, pseudokode menuliskannya, program menjalankannya.',
        'Empat simbol mencakup hampir semua diagram alir: terminal (mulai/selesai), jajar genjang (masukan/keluaran), persegi panjang (proses) dan belah ketupat (percabangan).',
        'Variabel menyimpan satu nilai pada satu waktu; x ← x + 1 mengganti nilai lama dengan nilai baru.',
        'Percabangan punya tepat dua jalur keluar (ya/tidak). Panah keluar yang kembali ke blok sebelumnya membentuk perulangan, yang akhirnya harus membuat kondisinya salah atau program tidak pernah berhenti.',
        'Tabel penelusuran mencatat setiap variabel setelah setiap langkah; ini cara paling andal menemukan kesalahan secara manual.',
        'Jumlah langkah bergantung pada masukan: FPB(48, 18) butuh beberapa langkah, FPB(1, 30) butuh banyak langkah.',
      ],
    },
    vocabulary: {
      en: [
        ['Algorithm', 'A finite, ordered list of clear instructions that solves a problem or performs a task.'],
        ['Flowchart', 'A diagram of an algorithm using standard symbols joined by arrows that show the order of steps.'],
        ['Pseudocode', 'Algorithm steps written in structured plain language with keywords such as INPUT, IF, WHILE and OUTPUT, not tied to any programming language.'],
        ['Variable', 'A named storage location that holds one value, which can be read and replaced.'],
        ['Decision (selection)', 'A step that tests a condition and chooses one of two paths, drawn as a diamond.'],
        ['Loop (iteration)', 'A group of steps repeated while a condition stays true.'],
        ['Trace table', 'A table with one row per executed step showing the value of every variable and any output.'],
      ],
      id: [
        ['Algoritma', 'Daftar instruksi yang jelas, berurutan dan berhingga untuk menyelesaikan masalah atau melakukan tugas.'],
        ['Diagram alir', 'Diagram algoritma yang memakai simbol baku yang dihubungkan panah untuk menunjukkan urutan langkah.'],
        ['Pseudokode', 'Langkah algoritma yang ditulis dalam bahasa terstruktur dengan kata kunci seperti BACA, JIKA, SELAMA dan TULIS, tidak terikat pada bahasa pemrograman tertentu.'],
        ['Variabel', 'Tempat penyimpanan bernama yang menyimpan satu nilai, yang bisa dibaca dan diganti.'],
        ['Percabangan (seleksi)', 'Langkah yang menguji suatu kondisi dan memilih salah satu dari dua jalur, digambar sebagai belah ketupat.'],
        ['Perulangan (iterasi)', 'Sekelompok langkah yang diulang selama suatu kondisi tetap benar.'],
        ['Tabel penelusuran', 'Tabel dengan satu baris per langkah yang dijalankan, berisi nilai setiap variabel dan keluaran apa pun.'],
      ],
    },
    misconceptions: {
      en: [
        ['The arrow in i ← i + 1 is an equation, so it says i equals i + 1, which is impossible.', 'It is an assignment, not an equation: compute the right side with the current value of i, then store the result in i. If i was 3, it becomes 4.'],
        ['A decision diamond can have three or more exits.', 'A decision asks a yes/no question, so it has exactly two exits. To choose between more options you chain decisions, as FizzBuzz does.'],
        ['A loop runs a fixed number of times.', 'A loop runs as long as its condition is true. Sum 1..n with n = 0 runs the body zero times; GCD runs a number of times that depends on a and b.'],
        ['The computer "understands" the goal, so it would skip obvious steps.', 'The computer executes every block in order, nothing more. If the chart has a mistake, the computer makes that mistake faithfully; that is why we trace.'],
      ],
      id: [
        ['Panah pada i ← i + 1 adalah persamaan, jadi artinya i sama dengan i + 1, yang tidak mungkin.', 'Itu penugasan, bukan persamaan: hitung ruas kanan dengan nilai i saat ini, lalu simpan hasilnya ke i. Jika i tadinya 3, ia menjadi 4.'],
        ['Belah ketupat percabangan bisa punya tiga jalur keluar atau lebih.', 'Percabangan mengajukan pertanyaan ya/tidak, sehingga tepat punya dua jalur keluar. Untuk memilih di antara lebih banyak pilihan kita merangkai percabangan, seperti pada FizzBuzz.'],
        ['Perulangan selalu berjalan dengan jumlah tetap.', 'Perulangan berjalan selama kondisinya benar. Jumlah 1..n dengan n = 0 menjalankan badannya nol kali; FPB berjalan sebanyak yang bergantung pada a dan b.'],
        ['Komputer "memahami" tujuannya, jadi ia akan melewati langkah yang jelas.', 'Komputer menjalankan setiap blok berurutan, tidak lebih. Jika diagramnya salah, komputer melakukan kesalahan itu dengan setia; itulah sebabnya kita menelusuri.'],
      ],
    },
    realWorld: {
      en: [
        'An ATM follows a flowchart: input PIN, decision "PIN correct?", process, output cash or an error message.',
        'A washing machine controller loops "while water level < target, keep filling", exactly like the WHILE in Sum 1..n.',
        'Scratch, Blockly and Python programs are the same ideas as the blocks here: sequence, selection and iteration.',
        'Euclid\'s GCD algorithm from about 300 BC is still used inside calculators and cryptography libraries today.',
        'Programmers debug by tracing: they print or watch variables step by step, just like the trace table.',
      ],
      id: [
        'ATM mengikuti diagram alir: baca PIN, percabangan "PIN benar?", proses, keluarkan uang atau pesan kesalahan.',
        'Pengendali mesin cuci berulang "selama tinggi air < target, terus isi", persis seperti SELAMA pada Jumlah 1..n.',
        'Program Scratch, Blockly dan Python memakai gagasan yang sama dengan blok di sini: urutan, seleksi dan iterasi.',
        'Algoritma FPB Euclid dari sekitar 300 SM masih dipakai di dalam kalkulator dan pustaka kriptografi sampai sekarang.',
        'Pemrogram mencari kesalahan dengan menelusuri: mereka mencetak atau mengamati variabel langkah demi langkah, seperti tabel penelusuran.',
      ],
    },
    questions: {
      en: [
        { q: 'In "Largest of three" with a = 7, b = 12, c = 5, which decision answers "yes" and which answers "no"? What is output?', a: '"b > max?" is yes (12 > 7), so max ← 12. "c > max?" is no (5 > 12 is false). Output is 12.' },
        { q: 'In "Sum 1..n" with n = 4, write the trace table rows for i and sum. How many times is the decision block executed?', a: 'sum: 0, 1, 3, 6, 10 while i goes 1, 2, 3, 4, 5. The decision is executed 5 times: four times "yes" and a final "no" when i = 5.' },
        { q: 'Why does "GCD by subtraction" with a = 1 and b = 30 take so many steps, and what would be a faster algorithm?', a: 'It subtracts 1 from 30 twenty-nine times before a = b = 1, so more than 90 blocks are executed. Using the remainder (a mod b) instead of repeated subtraction, Euclid\'s division version, reaches the answer in one or two steps.' },
      ],
      id: [
        { q: 'Pada "Terbesar dari tiga" dengan a = 7, b = 12, c = 5, percabangan mana yang menjawab "ya" dan mana yang "tidak"? Apa keluarannya?', a: '"b > max?" bernilai ya (12 > 7), sehingga max ← 12. "c > max?" bernilai tidak (5 > 12 salah). Keluarannya 12.' },
        { q: 'Pada "Jumlah 1..n" dengan n = 4, tulis baris tabel penelusuran untuk i dan sum. Berapa kali blok percabangan dijalankan?', a: 'sum: 0, 1, 3, 6, 10 sementara i berjalan 1, 2, 3, 4, 5. Percabangan dijalankan 5 kali: empat kali "ya" dan terakhir "tidak" saat i = 5.' },
        { q: 'Mengapa "FPB dengan pengurangan" dengan a = 1 dan b = 30 butuh begitu banyak langkah, dan algoritma apa yang lebih cepat?', a: 'Ia mengurangkan 1 dari 30 sebanyak dua puluh sembilan kali sebelum a = b = 1, sehingga lebih dari 90 blok dijalankan. Memakai sisa bagi (a mod b) alih-alih pengurangan berulang, versi pembagian Euclid, mencapai jawaban dalam satu atau dua langkah.' },
      ],
    },
  },
};
