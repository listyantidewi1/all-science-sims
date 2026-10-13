// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Read a Turing machine state table.',
      'See universal computation done with one tape and a finite table.',
      'Distinguish halting from non-halting programs.',
    ],
    id: [
      'Membaca tabel keadaan mesin Turing.',
      'Melihat komputasi universal dengan satu pita dan tabel terbatas.',
      'Membedakan program yang berhenti dan yang tidak.',
    ],
  },
  tryThis: {
    en: [
      'Run the busy beaver — count the 1s on the tape.',
      'Step the binary incrementer one step at a time.',
      "Edit the rule table mid-run — does behavior change?",
    ],
    id: [
      'Jalankan busy beaver — hitung jumlah 1 di pita.',
      'Telusuri penambah biner satu langkah pada satu waktu.',
      'Ubah tabel aturan saat berjalan — apakah perilaku berubah?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'In 1936 Alan Turing asked what it means, in the most basic terms, to compute something. His answer is the machine on this page. It has a tape of cells, unbounded in both directions, each holding a symbol; a head that sits over one cell and can read or write it; and a finite set of internal states. A program is a rule table: for the current state and the symbol under the head, it says which symbol to write, whether to move left or right, and which state to enter next. One such lookup is one step. If the machine enters the halt state, written H here, it stops and the tape holds the result.',
        'That is all there is, yet it is enough. The Church–Turing thesis holds that anything any computer can calculate can be calculated by a Turing machine with a suitable table, and real processors are just very fast machines of this kind with a finite tape. The simulation shows the tape with the head highlighted in yellow and 1-cells in green, the full rule table with the current state\'s rows marked, and the number of steps taken. You can run the machine at a chosen speed, single-step it, or reset it. In this sim the blank symbol is 0, so blank cells and written zeros look identical on the tape; the table writes a blank as the empty-set sign.',
        'Three programs are provided. The binary incrementer walks right to the end of the number, then moves left carrying: each 1 becomes 0 until a 0 (or a blank) becomes 1, so 1011 becomes 1100. The unary doubler appends marks to a run of 1s. The 5-state busy beaver is different: it is the 5-state machine that writes the most 1s before halting. It runs for 47,176,870 steps and halts with 4,098 ones on the tape, a result found in 1990 and proved to be the maximum in 2024. At the sim\'s top speed of 100 steps per second you would wait more than five days for it to halt, so watch its early behaviour rather than expecting a finish.',
        'The busy beaver points at the deepest fact about computation. Some machines halt and some run forever, and Turing proved there is no general procedure that can tell which is which from the table alone: the halting problem is undecidable. That is why the busy beaver numbers are so hard to find. The only way to confirm that a machine halts is to run it, and a machine that has not halted after a million steps may halt at step 47 million or never. The sim keeps things simple with only two symbols and a tape stored as a lookup table of visited cells, which stays finite because a halting machine only ever touches finitely many cells.',
      ],
      id: [
        'Pada 1936 Alan Turing bertanya apa arti menghitung sesuatu dalam pengertian yang paling mendasar. Jawabannya adalah mesin di halaman ini. Mesin itu punya pita sel yang tak terbatas ke dua arah, masing-masing memuat sebuah simbol; sebuah kepala yang berada di atas satu sel dan dapat membaca atau menulisnya; dan sejumlah terbatas keadaan internal. Program berupa tabel aturan: untuk keadaan saat ini dan simbol di bawah kepala, tabel menyebutkan simbol apa yang ditulis, bergerak ke kiri atau kanan, dan keadaan mana yang dimasuki berikutnya. Satu pencarian seperti itu adalah satu langkah. Jika mesin memasuki keadaan henti, ditulis H di sini, ia berhenti dan pita memuat hasilnya.',
        'Hanya itu, namun sudah cukup. Tesis Church–Turing menyatakan bahwa apa pun yang bisa dihitung komputer mana pun bisa dihitung mesin Turing dengan tabel yang sesuai, dan prosesor sungguhan hanyalah mesin semacam ini yang sangat cepat dengan pita terbatas. Simulasi menampilkan pita dengan kepala disorot kuning dan sel bernilai 1 berwarna hijau, tabel aturan lengkap dengan baris keadaan saat ini ditandai, dan jumlah langkah yang sudah dijalankan. Kamu bisa menjalankan mesin pada kecepatan pilihan, melangkah satu per satu, atau mengatur ulang. Dalam simulasi ini simbol kosong adalah 0, sehingga sel kosong dan angka nol yang ditulis tampak sama di pita; tabel menuliskan kosong dengan lambang himpunan kosong.',
        'Ada tiga program. Penambah biner berjalan ke kanan sampai ujung bilangan, lalu bergerak ke kiri sambil membawa: setiap 1 menjadi 0 sampai sebuah 0 (atau kosong) menjadi 1, sehingga 1011 menjadi 1100. Penggandakan unary menambahkan tanda pada deretan 1. Busy beaver 5-state berbeda: ia adalah mesin 5-state yang menulis 1 paling banyak sebelum berhenti. Ia berjalan 47.176.870 langkah dan berhenti dengan 4.098 angka satu di pita, hasil yang ditemukan pada 1990 dan dibuktikan sebagai yang maksimum pada 2024. Pada kecepatan tertinggi simulasi, 100 langkah per detik, kamu harus menunggu lebih dari lima hari sampai ia berhenti, jadi amati perilaku awalnya saja, jangan mengharapkan akhirnya.',
        'Busy beaver menunjuk pada fakta terdalam tentang komputasi. Sebagian mesin berhenti dan sebagian berjalan selamanya, dan Turing membuktikan tidak ada prosedur umum yang bisa menentukan mana yang mana hanya dari tabelnya: masalah penghentian (halting problem) tidak dapat diputuskan. Itulah sebabnya bilangan busy beaver begitu sulit ditemukan. Satu-satunya cara memastikan sebuah mesin berhenti adalah menjalankannya, dan mesin yang belum berhenti setelah sejuta langkah mungkin berhenti pada langkah ke-47 juta atau tidak pernah. Simulasi menyederhanakan dengan hanya dua simbol dan pita yang disimpan sebagai tabel sel yang pernah dikunjungi, yang tetap terbatas karena mesin yang berhenti hanya menyentuh sejumlah terbatas sel.',
      ],
    },
    figure: {
      caption: {
        en: 'The first four steps of the 5-state busy beaver on a blank tape. Each step looks up (state, symbol under the head) in the table, writes, moves one cell and changes state. By step 3 the head has written three 1s and turns back left.',
        id: 'Empat langkah pertama busy beaver 5-state pada pita kosong. Setiap langkah mencari (keadaan, simbol di bawah kepala) dalam tabel, menulis, bergerak satu sel, dan berganti keadaan. Pada langkah 3 kepala sudah menulis tiga angka 1 dan berbalik ke kiri.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const steps = [
          { st: 'A', head: 0, tape: [0, 0, 0, 0, 0, 0], rule: 'A,0 → 1,R,B' },
          { st: 'B', head: 1, tape: [0, 1, 0, 0, 0, 0], rule: 'B,0 → 1,R,C' },
          { st: 'C', head: 2, tape: [0, 1, 1, 0, 0, 0], rule: 'C,0 → 1,R,D' },
          { st: 'D', head: 3, tape: [0, 1, 1, 1, 0, 0], rule: 'D,0 → 1,L,A' },
        ];
        const C = 22;
        let rows = '';
        steps.forEach((s, i) => {
          const y = 48 + i * 44;
          rows += `<text x="8" y="${y + 15}" class="s">${L('step', 'langkah')} ${i}</text>`;
          rows += `<text x="62" y="${y + 15}" class="t" fill="#8b5cf6">${s.st}</text>`;
          s.tape.forEach((v, k) => {
            const x = 86 + k * C;
            const isHead = k - 1 === s.head;
            rows += `<rect x="${x}" y="${y}" width="${C}" height="${C}" class="c" fill="${isHead ? '#f59e0b' : v ? '#10b981' : 'none'}" fill-opacity="${isHead || v ? 0.9 : 1}"/>`;
            rows += `<text x="${x + 11}" y="${y + 15}" text-anchor="middle" fill="${isHead || v ? '#fff' : 'currentColor'}" opacity="${isHead || v ? 1 : 0.5}">${v}</text>`;
          });
          rows += `<text x="232" y="${y + 15}" class="m">${s.rule}</text>`;
        });
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('First steps of a Turing machine', 'Langkah-langkah awal mesin Turing')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.c{stroke:currentColor;stroke-width:1;stroke-opacity:.5}.t{font-weight:700}.s{font-size:10px;opacity:.75}.m{font:11px ui-monospace,Menlo,monospace;fill:currentColor}</style>
  <text x="8" y="26" class="t">${L('Busy beaver, blank tape', 'Busy beaver, pita kosong')}</text>
  <text x="62" y="40" class="s">${L('state', 'keadaan')}</text>
  <text x="86" y="40" class="s">${L('tape (cells −1 to 4)', 'pita (sel −1 sampai 4)')}</text>
  <text x="232" y="40" class="s">${L('rule used', 'aturan dipakai')}</text>
  ${rows}
  <rect x="8" y="222" width="12" height="12" fill="#f59e0b" class="c"/>
  <text x="25" y="232" class="s">${L('head', 'kepala')}</text>
  <rect x="70" y="222" width="12" height="12" fill="#10b981" class="c"/>
  <text x="87" y="232" class="s">${L('cell holding 1', 'sel bernilai 1')}</text>
  <text x="232" y="232" class="s">${L('state,read → write,move,next', 'keadaan,baca → tulis,gerak,berikut')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A Turing machine is a tape, a head and a finite rule table; each step reads one symbol, writes one symbol, moves one cell and changes state.',
        'Despite this simplicity, a Turing machine can compute anything a modern computer can, which is the content of the Church–Turing thesis.',
        'A machine halts when it enters the halt state; the tape then holds the output.',
        'No algorithm can decide for every machine whether it will halt, so the only general way to know is to run it, possibly forever.',
        'The 5-state busy beaver halts after 47,176,870 steps with 4,098 ones, showing that even tiny tables can produce enormous behaviour.',
      ],
      id: [
        'Mesin Turing adalah pita, kepala, dan tabel aturan terbatas; setiap langkah membaca satu simbol, menulis satu simbol, bergerak satu sel, dan berganti keadaan.',
        'Meski sesederhana itu, mesin Turing dapat menghitung apa pun yang bisa dihitung komputer modern, dan itulah isi tesis Church–Turing.',
        'Mesin berhenti ketika memasuki keadaan henti; pita kemudian memuat keluarannya.',
        'Tidak ada algoritma yang dapat memutuskan untuk setiap mesin apakah ia akan berhenti, sehingga satu-satunya cara umum untuk tahu adalah menjalankannya, mungkin selamanya.',
        'Busy beaver 5-state berhenti setelah 47.176.870 langkah dengan 4.098 angka satu, menunjukkan bahwa tabel yang sangat kecil pun dapat menghasilkan perilaku yang luar biasa besar.',
      ],
    },
    vocabulary: {
      en: [
        ['Tape', 'The machine\'s memory: a row of cells, unbounded in both directions, each holding one symbol.'],
        ['Head', 'The part of the machine positioned over one cell, able to read and overwrite it and to move one cell left or right.'],
        ['State', 'One of a finite set of internal conditions; together with the symbol read, it decides the next action.'],
        ['Transition (rule)', 'A table entry: for a state and a read symbol, the symbol to write, the direction to move and the next state.'],
        ['Halt state', 'A special state, H here, in which the machine stops; the result is whatever is on the tape.'],
        ['Blank symbol', 'The symbol every untouched cell holds; in this sim it is 0.'],
        ['Busy beaver', 'Among all halting machines with n states, the one that writes the most 1s; the resulting number grows faster than any computable function.'],
        ['Halting problem', 'The question of whether a given machine will ever halt; Turing proved no algorithm can answer it for all machines.'],
      ],
      id: [
        ['Pita', 'Memori mesin: deretan sel tak terbatas ke dua arah, masing-masing memuat satu simbol.'],
        ['Kepala', 'Bagian mesin yang berada di atas satu sel, dapat membaca dan menimpanya serta bergerak satu sel ke kiri atau kanan.'],
        ['Keadaan', 'Salah satu dari sejumlah terbatas kondisi internal; bersama simbol yang dibaca, ia menentukan tindakan berikutnya.'],
        ['Transisi (aturan)', 'Satu entri tabel: untuk suatu keadaan dan simbol yang dibaca, simbol yang ditulis, arah gerak, dan keadaan berikutnya.'],
        ['Keadaan henti', 'Keadaan khusus, H di sini, tempat mesin berhenti; hasilnya adalah apa pun yang ada di pita.'],
        ['Simbol kosong', 'Simbol yang dimuat setiap sel yang belum tersentuh; dalam simulasi ini nilainya 0.'],
        ['Busy beaver', 'Di antara semua mesin berhenti dengan n keadaan, mesin yang menulis angka 1 paling banyak; bilangan yang dihasilkannya tumbuh lebih cepat daripada fungsi terhitung mana pun.'],
        ['Masalah penghentian', 'Pertanyaan apakah suatu mesin akan pernah berhenti; Turing membuktikan tidak ada algoritma yang bisa menjawabnya untuk semua mesin.'],
      ],
    },
    misconceptions: {
      en: [
        ['A Turing machine is a kind of physical computer that Turing built.', 'It is a mathematical model, a thought experiment for defining computation precisely. Turing never built one; the sim is a visualisation of the definition.'],
        ['If a machine has not halted after a million steps, it never will.', 'The 5-state busy beaver runs for over 47 million steps and then halts. In general no step count is enough, because there is no way to decide halting in advance.'],
        ['An infinite tape means the machine uses infinite memory.', 'At any step only finitely many cells have been visited; the tape is unbounded so the machine never runs out, not because it uses it all. The sim stores just the cells that were touched.'],
        ['More states always means a more powerful machine.', 'Power in the sense of what can be computed does not grow: a fixed small universal machine can simulate any other given a suitable tape. More states only allow shorter or more direct programs.'],
      ],
      id: [
        ['Mesin Turing adalah sejenis komputer fisik yang dibangun Turing.', 'Ia adalah model matematis, eksperimen pikiran untuk mendefinisikan komputasi secara tepat. Turing tidak pernah membangunnya; simulasi ini hanyalah visualisasi definisinya.'],
        ['Jika mesin belum berhenti setelah sejuta langkah, ia tidak akan pernah berhenti.', 'Busy beaver 5-state berjalan lebih dari 47 juta langkah lalu berhenti. Secara umum tidak ada jumlah langkah yang cukup, karena tidak ada cara memutuskan penghentian di muka.'],
        ['Pita tak hingga berarti mesin memakai memori tak hingga.', 'Pada langkah mana pun hanya sejumlah terbatas sel yang pernah dikunjungi; pita tak terbatas agar mesin tidak pernah kehabisan, bukan karena ia memakai semuanya. Simulasi hanya menyimpan sel yang tersentuh.'],
        ['Lebih banyak keadaan selalu berarti mesin lebih kuat.', 'Kekuatan dalam arti apa yang dapat dihitung tidak bertambah: satu mesin universal kecil yang tetap dapat menyimulasikan mesin lain mana pun jika diberi pita yang sesuai. Lebih banyak keadaan hanya memungkinkan program yang lebih pendek atau lebih langsung.'],
      ],
    },
    realWorld: {
      en: [
        'Every programming language that can loop and branch is Turing complete, so compilers and interpreters are judged against this model.',
        'The halting problem explains why no antivirus or code checker can perfectly decide, for every program, whether it will finish or misbehave.',
        'Processors execute instructions by reading memory, changing registers and moving on, a direct descendant of the read, write, move, next-state cycle.',
        'Busy beaver research continues today: the 5-state value was proved by a worldwide collaboration in 2024, while the 6-state value remains unknown and is astronomically large.',
      ],
      id: [
        'Setiap bahasa pemrograman yang bisa mengulang dan bercabang bersifat Turing-lengkap, sehingga kompilator dan interpreter dinilai terhadap model ini.',
        'Masalah penghentian menjelaskan mengapa tidak ada antivirus atau pemeriksa kode yang bisa memutuskan dengan sempurna, untuk setiap program, apakah program itu akan selesai atau berperilaku salah.',
        'Prosesor menjalankan instruksi dengan membaca memori, mengubah register, dan melanjutkan, keturunan langsung dari siklus baca, tulis, gerak, keadaan berikut.',
        'Riset busy beaver masih berlanjut: nilai 5-state dibuktikan oleh kolaborasi seluruh dunia pada 2024, sementara nilai 6-state masih belum diketahui dan sangat besar secara astronomis.',
      ],
    },
    questions: {
      en: [
        { q: 'Trace the binary incrementer on the tape 1011 in words: what does the head do, and what is the final tape?', a: 'In the "right" state the head moves right over 1, 0, 1, 1 without changing them until it passes the end of the number. It then turns left in the "carry" state: the last 1 becomes 0 and it keeps going, the next 1 becomes 0, then the 0 becomes 1 and the carry is finished, leaving 1100. In decimal, 11 + 1 = 12.' },
        { q: 'A rule table has no entry that leads to H. What can you conclude about the machine, and does the reverse hold, that a table with an H entry must halt?', a: 'With no transition into H the machine can never halt, so it runs forever. The reverse does not hold: having an H entry only means halting is possible, and the machine might never reach the state and symbol that trigger it. Deciding that in general is the undecidable halting problem.' },
        { q: 'Why can the busy beaver number for n states not be computed by simply simulating all n-state machines and recording the one that writes the most 1s?', a: 'Many of those machines run forever. To know which ones to discard you would have to decide whether each halts, and no algorithm can do that for every machine. In practice researchers prove non-halting for most candidates case by case, which is why only the values up to 5 states are known.' },
      ],
      id: [
        { q: 'Telusuri penambah biner pada pita 1011 dengan kata-kata: apa yang dilakukan kepala, dan apa isi pita akhirnya?', a: 'Dalam keadaan "right" kepala bergerak ke kanan melewati 1, 0, 1, 1 tanpa mengubahnya sampai melewati ujung bilangan. Lalu ia berbalik ke kiri dalam keadaan "carry": 1 terakhir menjadi 0 dan ia terus berjalan, 1 berikutnya menjadi 0, lalu 0 menjadi 1 dan pembawaan selesai, menyisakan 1100. Dalam desimal, 11 + 1 = 12.' },
        { q: 'Sebuah tabel aturan tidak punya entri yang menuju H. Apa yang dapat disimpulkan tentang mesin itu, dan apakah kebalikannya berlaku, bahwa tabel dengan entri H pasti berhenti?', a: 'Tanpa transisi menuju H, mesin tidak pernah bisa berhenti, jadi ia berjalan selamanya. Kebalikannya tidak berlaku: adanya entri H hanya berarti berhenti itu mungkin, dan mesin bisa saja tidak pernah mencapai keadaan dan simbol yang memicunya. Memutuskan hal itu secara umum adalah masalah penghentian yang tak dapat diputuskan.' },
        { q: 'Mengapa bilangan busy beaver untuk n keadaan tidak bisa dihitung hanya dengan menyimulasikan semua mesin n-keadaan dan mencatat yang menulis angka 1 paling banyak?', a: 'Banyak di antara mesin itu berjalan selamanya. Untuk tahu mana yang harus dibuang, kamu harus memutuskan apakah masing-masing berhenti, dan tidak ada algoritma yang bisa melakukannya untuk setiap mesin. Dalam praktiknya peneliti membuktikan ketidakberhentian sebagian besar kandidat satu per satu, itulah sebabnya hanya nilai sampai 5 keadaan yang diketahui.' },
      ],
    },
  },
};
