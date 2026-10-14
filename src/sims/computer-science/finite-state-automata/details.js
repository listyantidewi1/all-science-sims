// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Trace a DFA computation: one state at a time, one symbol at a time.',
      'See accept states (double circle) vs reject states.',
      'Connect regular languages to FSAs that recognize them.',
    ],
    id: [
      'Menelusuri komputasi DFA: satu state per simbol.',
      'Melihat state penerima (lingkaran ganda) vs state penolak.',
      'Menghubungkan bahasa reguler dengan FSA yang mengenalinya.',
    ],
  },
  tryThis: {
    en: [
      '"ends in 01" — try 1101, 0001, 010 — only 1101 and 0001 match (end in 01).',
      'Even parity — strings with even number of 1s are accepted.',
      'Divisible by 3 — try "11" (3), "110" (6), "1001" (9).',
    ],
    id: [
      '"berakhir 01" — coba 1101, 0001, 010 — hanya 1101 dan 0001 yang cocok.',
      'Paritas genap — string dengan jumlah 1 genap diterima.',
      'Kelipatan 3 — coba "11" (3), "110" (6), "1001" (9).',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A finite-state automaton is the simplest useful model of a computer. It has a finite set of states, reads its input one symbol at a time from left to right, and after each symbol jumps to a new state chosen by a fixed rule from the current state and the symbol just read. It starts in a designated start state, and when the input runs out it answers yes if it is standing in an accepting state and no otherwise. Crucially, the machine has no memory other than which state it is in: it cannot look back at earlier symbols or count without limit. Formally a deterministic finite automaton (DFA) is a five-tuple (Q, Σ, δ, q0, F): a state set Q, an alphabet Σ, a transition function δ from Q × Σ to Q, a start state q0 and a set F of accepting states. "Deterministic" means that for every state and symbol exactly one next state is defined. The set of all strings a DFA accepts is its language, and the languages that DFAs can recognise are exactly the regular languages, the same ones that regular expressions describe.',
        'The three machines in this sim show how a handful of states can remember just enough. The "ends with 01" machine needs to know only how much of the pattern it has seen most recently: q0 means no useful progress (the last symbol was 1, or nothing has been read), q1 means the last symbol was 0, and q2 means the last two symbols were 01. Reading a 1 in q1 completes the pattern; reading a 0 in q2 wipes it back to a lone 0. The even-parity machine has just two states, even and odd, and flips between them on every 1 while ignoring every 0; it cannot count how many 1s there were, but it can count modulo 2. The divisible-by-3 machine applies the same idea to arithmetic: its states r0, r1 and r2 hold the remainder of the number read so far when divided by 3. Appending a bit b to a binary number v gives 2v + b, so the remainder becomes (2r + b) mod 3; for example from r1 a 0 leads to 2 mod 3 = r2, and a 1 leads to 3 mod 3 = r0. Every transition in the diagram is just this formula.',
        'Choose an automaton from the menu and type an input of 0s and 1s (other characters are dropped, and the input is capped at 32 symbols). The tape at the top shows the string with the symbol just consumed highlighted; the current state is filled in yellow, accepting states are drawn with a double circle in green, and the start state has an incoming arrow. Step and Back move through the computation one symbol at a time, Run all jumps to the end, and the verdict shows the final state and whether it accepts. Try an empty input: the machine never leaves its start state, so the parity and divisible-by-3 machines accept it (zero 1s is an even number, and the empty numeral is read as 0) while "ends with 01" rejects it.',
        'The sim keeps things minimal. The three machines are fixed, so you cannot draw your own, the alphabet is only {0, 1}, and there are no nondeterministic automata, which allow several possible next states and turn out to accept exactly the same languages as DFAs. It also does not show the proof that some languages are beyond any finite automaton. Strings with equally many 0s and 1s, or correctly nested brackets, require remembering an unbounded count, which a finite set of states cannot do; recognising them needs a more powerful model such as a pushdown automaton, and in general a Turing machine. Finite automata remain everywhere nonetheless, because an enormous number of practical tasks only need a fixed amount of memory.',
      ],
      id: [
        'Otomata hingga adalah model komputer paling sederhana yang berguna. Ia memiliki himpunan state yang berhingga, membaca masukan satu simbol pada satu waktu dari kiri ke kanan, dan setelah tiap simbol melompat ke state baru yang ditentukan aturan tetap dari state saat ini dan simbol yang baru dibaca. Ia mulai dari state awal yang ditentukan, dan ketika masukan habis ia menjawab ya jika berada di state penerima dan tidak jika sebaliknya. Yang penting, mesin ini tidak memiliki memori selain state yang ditempatinya: ia tidak bisa melihat kembali simbol sebelumnya atau menghitung tanpa batas. Secara formal otomata hingga deterministik (DFA) adalah lima-tupel (Q, Σ, δ, q0, F): himpunan state Q, alfabet Σ, fungsi transisi δ dari Q × Σ ke Q, state awal q0, dan himpunan state penerima F. "Deterministik" berarti untuk setiap state dan simbol tepat satu state berikutnya yang didefinisikan. Himpunan semua string yang diterima sebuah DFA adalah bahasanya, dan bahasa yang bisa dikenali DFA tepat sama dengan bahasa reguler, yaitu bahasa yang sama yang digambarkan ekspresi reguler.',
        'Ketiga mesin dalam simulasi ini menunjukkan bagaimana segelintir state dapat mengingat tepat secukupnya. Mesin "berakhir 01" hanya perlu tahu seberapa banyak pola yang baru saja dilihatnya: q0 berarti belum ada kemajuan berguna (simbol terakhir 1, atau belum ada yang dibaca), q1 berarti simbol terakhir 0, dan q2 berarti dua simbol terakhir 01. Membaca 1 di q1 melengkapi pola; membaca 0 di q2 menghapusnya kembali menjadi 0 tunggal. Mesin paritas genap hanya punya dua state, genap dan ganjil, dan berpindah di antara keduanya pada tiap 1 sambil mengabaikan tiap 0; ia tidak bisa menghitung berapa banyak 1, tetapi bisa menghitung modulo 2. Mesin kelipatan 3 menerapkan gagasan yang sama pada aritmetika: state r0, r1, dan r2 menyimpan sisa bagi bilangan yang sudah dibaca ketika dibagi 3. Menambahkan bit b pada bilangan biner v menghasilkan 2v + b, sehingga sisanya menjadi (2r + b) mod 3; misalnya dari r1, bit 0 menuju 2 mod 3 = r2, dan bit 1 menuju 3 mod 3 = r0. Setiap transisi pada diagram hanyalah rumus ini.',
        'Pilih otomata dari menu dan ketik masukan berupa 0 dan 1 (karakter lain dibuang, dan masukan dibatasi 32 simbol). Pita di bagian atas menampilkan string dengan simbol yang baru dibaca disorot; state saat ini diisi warna kuning, state penerima digambar dengan lingkaran ganda hijau, dan state awal memiliki panah masuk. Step dan Back menelusuri komputasi satu simbol pada satu waktu, Run all melompat ke akhir, dan hasil akhir menampilkan state terakhir beserta diterima atau tidaknya. Coba masukan kosong: mesin tidak pernah meninggalkan state awal, sehingga mesin paritas dan kelipatan 3 menerimanya (nol buah angka 1 adalah bilangan genap, dan bilangan kosong dibaca sebagai 0) sementara "berakhir 01" menolaknya.',
        'Simulasi ini dibuat seminimal mungkin. Ketiga mesin bersifat tetap, sehingga Anda tidak bisa menggambar mesin sendiri, alfabetnya hanya {0, 1}, dan tidak ada otomata nondeterministik, yang membolehkan beberapa kemungkinan state berikutnya dan ternyata menerima bahasa yang persis sama dengan DFA. Ia juga tidak menunjukkan bukti bahwa sejumlah bahasa berada di luar jangkauan otomata hingga mana pun. String dengan jumlah 0 dan 1 yang sama, atau kurung yang bersarang dengan benar, menuntut mengingat hitungan tanpa batas, yang tidak bisa dilakukan himpunan state berhingga; mengenalinya membutuhkan model yang lebih kuat seperti otomata pushdown, dan secara umum mesin Turing. Meski begitu otomata hingga ada di mana-mana, karena sangat banyak tugas praktis hanya membutuhkan memori dalam jumlah tetap.',
      ],
    },
    figure: {
      caption: {
        en: 'State diagram of the "ends with 01" DFA. The arrow from nowhere marks the start state, the double circle marks the accepting state, and every state has exactly one outgoing arrow per symbol. Below: the trace for the input 01101, which ends in q2 and is accepted.',
        id: 'Diagram state DFA "berakhir 01". Panah dari luar menandai state awal, lingkaran ganda menandai state penerima, dan tiap state memiliki tepat satu panah keluar per simbol. Di bawah: penelusuran untuk masukan 01101, yang berakhir di q2 dan diterima.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const st = (x, name, accept) => `<circle cx="${x}" cy="100" r="22" class="st"/>${accept ? `<circle cx="${x}" cy="100" r="17" fill="none" stroke="#10b981" stroke-width="1.5"/>` : ''}<text x="${x}" y="104" text-anchor="middle" font-weight="700">${name}</text>`;
        const tr = ['q0', 'q1', 'q2', 'q0', 'q1', 'q2'];
        const trace = tr.map((s, i) => `<text x="${30 + i * 60}" y="222" text-anchor="middle" font-weight="700" fill="${i === 5 ? '#10b981' : 'currentColor'}">${s}</text>${i < 5 ? `<text x="${60 + i * 60}" y="210" text-anchor="middle" fill="#f59e0b" class="s">${'01101'[i]}</text><line x1="${44 + i * 60}" y1="218" x2="${76 + i * 60}" y2="218" class="e" marker-end="url(#a)"/>` : ''}`).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('State diagram of a DFA accepting strings that end in 01', 'Diagram state DFA yang menerima string berakhir 01')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.s{font-size:10px}.st{fill:none;stroke:currentColor;stroke-width:1.5}.e{fill:none;stroke:currentColor;stroke-width:1.2}.lb{font-size:11px;fill:#f59e0b;font-weight:700}</style>
  <text x="10" y="20" font-weight="700">${L('DFA: strings ending in 01', 'DFA: string yang berakhir 01')}</text>
  <text x="10" y="36" class="s" opacity=".7">${L('states remember how much of "01" was just seen', 'state mengingat seberapa banyak "01" yang baru terlihat')}</text>
  <line x1="12" y1="100" x2="36" y2="100" class="e" marker-end="url(#a)"/>
  <text x="14" y="92" class="s" opacity=".7">${L('start', 'awal')}</text>
  ${st(60, 'q0', false)}
  ${st(180, 'q1', false)}
  ${st(300, 'q2', true)}
  <path d="M60 78 C50 50 70 50 60 78" class="e" marker-end="url(#a)"/>
  <text x="60" y="52" text-anchor="middle" class="lb">1</text>
  <path d="M180 78 C170 50 190 50 180 78" class="e" marker-end="url(#a)"/>
  <text x="180" y="52" text-anchor="middle" class="lb">0</text>
  <line x1="82" y1="96" x2="156" y2="96" class="e" marker-end="url(#a)"/>
  <text x="120" y="90" text-anchor="middle" class="lb">0</text>
  <line x1="202" y1="96" x2="276" y2="96" class="e" marker-end="url(#a)"/>
  <text x="240" y="90" text-anchor="middle" class="lb">1</text>
  <path d="M292 121 Q240 150 190 121" class="e" marker-end="url(#a)"/>
  <text x="240" y="146" text-anchor="middle" class="lb">0</text>
  <path d="M300 122 Q180 190 66 122" class="e" marker-end="url(#a)"/>
  <text x="183" y="178" text-anchor="middle" class="lb">1</text>
  <text x="330" y="80" class="s" fill="#10b981">${L('accept', 'terima')}</text>
  <text x="10" y="200" class="s" opacity=".7">${L('trace of input 01101:', 'penelusuran masukan 01101:')}</text>
  ${trace}
  <text x="350" y="222" text-anchor="end" fill="#10b981" class="s">${L('accept', 'terima')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="currentColor"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A DFA reads one symbol at a time and its only memory is its current state; the input is accepted if the machine ends in an accepting state.',
        'Each state stands for a summary of everything read so far that still matters, such as "last symbol was 0" or "remainder so far is 2".',
        'A finite automaton cannot count without bound, but it can count modulo a fixed number, which is how the parity and divisibility machines work.',
        'The languages recognised by finite automata are exactly the regular languages, the ones regular expressions can describe.',
        'Some simple-looking languages, such as strings with equal numbers of 0s and 1s, are not regular and need machines with unbounded memory.',
      ],
      id: [
        'DFA membaca satu simbol pada satu waktu dan satu-satunya memorinya adalah state saat ini; masukan diterima jika mesin berakhir di state penerima.',
        'Tiap state mewakili ringkasan dari semua yang sudah dibaca yang masih penting, misalnya "simbol terakhir 0" atau "sisa bagi sejauh ini 2".',
        'Otomata hingga tidak bisa menghitung tanpa batas, tetapi bisa menghitung modulo bilangan tetap, dan begitulah cara kerja mesin paritas dan keterbagian.',
        'Bahasa yang dikenali otomata hingga tepat sama dengan bahasa reguler, yaitu bahasa yang bisa digambarkan ekspresi reguler.',
        'Beberapa bahasa yang tampak sederhana, seperti string dengan jumlah 0 dan 1 yang sama, tidak reguler dan membutuhkan mesin dengan memori tak terbatas.',
      ],
    },
    vocabulary: {
      en: [
        ['State', 'One of the finitely many situations the machine can be in; its entire memory.'],
        ['Transition function (δ)', 'The rule giving the next state for every pair of current state and input symbol.'],
        ['Alphabet (Σ)', 'The set of symbols an input may contain; here {0, 1}.'],
        ['Start state', 'The state the machine is in before reading any symbol, marked by an incoming arrow.'],
        ['Accepting state', 'A state, drawn as a double circle, in which the machine answers yes once the input is exhausted.'],
        ['Deterministic', 'Having exactly one next state for every state and symbol, so a given input has one unique path.'],
        ['Language', 'The set of all strings a machine accepts.'],
        ['Regular language', 'A language that some finite automaton recognises; equivalently, one describable by a regular expression.'],
      ],
      id: [
        ['State', 'Salah satu dari sejumlah berhingga situasi yang dapat ditempati mesin; seluruh memorinya.'],
        ['Fungsi transisi (δ)', 'Aturan yang memberi state berikutnya untuk tiap pasangan state saat ini dan simbol masukan.'],
        ['Alfabet (Σ)', 'Himpunan simbol yang boleh ada dalam masukan; di sini {0, 1}.'],
        ['State awal', 'State mesin sebelum membaca simbol apa pun, ditandai panah masuk.'],
        ['State penerima', 'State, digambar sebagai lingkaran ganda, tempat mesin menjawab ya setelah masukan habis.'],
        ['Deterministik', 'Memiliki tepat satu state berikutnya untuk tiap state dan simbol, sehingga suatu masukan memiliki satu lintasan unik.'],
        ['Bahasa', 'Himpunan semua string yang diterima suatu mesin.'],
        ['Bahasa reguler', 'Bahasa yang dikenali oleh suatu otomata hingga; setara dengan bahasa yang dapat digambarkan ekspresi reguler.'],
      ],
    },
    misconceptions: {
      en: [
        ['The machine accepts as soon as it reaches an accepting state.', 'Acceptance is decided only after the last symbol. In "ends with 01", the input 010 passes through q2 and then leaves it, so it is rejected.'],
        ['An accepting state is a stopping state.', 'The machine never stops early; it reads every symbol. Accepting states have outgoing transitions like any other state, and the computation may leave and re-enter them many times.'],
        ['A DFA can check whether a string has the same number of 0s and 1s if you give it enough states.', 'No fixed number of states suffices, because the difference between the counts can grow without bound. That language is not regular, which is one of the classic limits of finite automata.'],
        ['The divisible-by-3 machine must convert the whole number to decimal first.', 'It never knows the number. It only tracks the remainder so far, updating it with (2r + b) mod 3 at each bit, which is enough to decide divisibility.'],
      ],
      id: [
        ['Mesin menerima begitu mencapai state penerima.', 'Penerimaan hanya diputuskan setelah simbol terakhir. Pada "berakhir 01", masukan 010 melewati q2 lalu meninggalkannya, sehingga ditolak.'],
        ['State penerima adalah state berhenti.', 'Mesin tidak pernah berhenti lebih awal; ia membaca setiap simbol. State penerima memiliki transisi keluar seperti state lain, dan komputasi bisa meninggalkan dan memasukinya kembali berkali-kali.'],
        ['DFA bisa memeriksa apakah sebuah string memiliki jumlah 0 dan 1 yang sama jika diberi state yang cukup.', 'Tidak ada jumlah state tetap yang cukup, karena selisih kedua hitungan dapat tumbuh tanpa batas. Bahasa itu tidak reguler, salah satu batas klasik otomata hingga.'],
        ['Mesin kelipatan 3 harus mengubah seluruh bilangan ke desimal dulu.', 'Ia tidak pernah tahu bilangannya. Ia hanya melacak sisa bagi sejauh ini, memperbaruinya dengan (2r + b) mod 3 pada tiap bit, dan itu cukup untuk memutuskan keterbagian.'],
      ],
    },
    realWorld: {
      en: [
        'Text search tools and regular-expression engines compile a pattern into a finite automaton and then scan the text one character at a time.',
        'A traffic light or a vending machine is a finite-state machine: its behaviour depends only on its current state and the next input, such as a coin or a button press.',
        'Network protocols such as TCP are specified as state machines (LISTEN, SYN-SENT, ESTABLISHED, ...), with every incoming packet triggering a transition.',
        'Programming-language compilers use finite automata in their first stage, the lexer, to split source code into tokens such as numbers, names and operators.',
      ],
      id: [
        'Alat pencarian teks dan mesin ekspresi reguler mengubah pola menjadi otomata hingga lalu memindai teks satu karakter pada satu waktu.',
        'Lampu lalu lintas atau mesin penjual otomatis adalah mesin state hingga: perilakunya hanya bergantung pada state saat ini dan masukan berikutnya, seperti koin atau tekanan tombol.',
        'Protokol jaringan seperti TCP dispesifikasikan sebagai mesin state (LISTEN, SYN-SENT, ESTABLISHED, ...), dan setiap paket yang masuk memicu sebuah transisi.',
        'Kompilator bahasa pemrograman memakai otomata hingga pada tahap pertamanya, lexer, untuk memecah kode sumber menjadi token seperti bilangan, nama, dan operator.',
      ],
    },
    questions: {
      en: [
        { q: 'Trace the input 1010 through the "ends with 01" machine. Which states does it visit, and is it accepted?', a: 'q0 →1 q0 →0 q1 →1 q2 →0 q1. The final state is q1, which is not accepting, so 1010 is rejected. Correct: it ends in 10, not 01.' },
        { q: 'Trace 1011 (eleven) and 1100 (twelve) through the divisible-by-3 machine using the remainder rule (2r + b) mod 3.', a: '1011: r0 →1 r1 →0 r2 →1 (2·2+1 = 5 mod 3 = 2) r2 →1 (5 mod 3 = 2) r2: rejected, and 11 is not divisible by 3. 1100: r0 →1 r1 →1 r0 →0 r0 →0 r0: accepted, and 12 = 3 × 4.' },
        { q: 'Design a DFA that accepts binary strings containing an even number of 0s. How many states do you need, and what are the transitions?', a: 'Two states, say E (even, the start and accepting state) and O (odd). On a 0, E goes to O and O goes to E; on a 1, each state stays where it is. It is the parity machine with the roles of 0 and 1 swapped.' },
      ],
      id: [
        { q: 'Telusuri masukan 1010 melalui mesin "berakhir 01". State mana yang dikunjungi, dan apakah diterima?', a: 'q0 →1 q0 →0 q1 →1 q2 →0 q1. State akhirnya q1, yang bukan penerima, sehingga 1010 ditolak. Benar: string itu berakhir 10, bukan 01.' },
        { q: 'Telusuri 1011 (sebelas) dan 1100 (dua belas) melalui mesin kelipatan 3 dengan aturan sisa (2r + b) mod 3.', a: '1011: r0 →1 r1 →0 r2 →1 (2·2+1 = 5 mod 3 = 2) r2 →1 (5 mod 3 = 2) r2: ditolak, dan 11 memang tidak habis dibagi 3. 1100: r0 →1 r1 →1 r0 →0 r0 →0 r0: diterima, dan 12 = 3 × 4.' },
        { q: 'Rancang DFA yang menerima string biner dengan jumlah 0 yang genap. Berapa state yang dibutuhkan, dan apa transisinya?', a: 'Dua state, misalnya G (genap, state awal sekaligus penerima) dan J (ganjil). Pada 0, G menuju J dan J menuju G; pada 1, tiap state tetap di tempatnya. Ini mesin paritas dengan peran 0 dan 1 ditukar.' },
      ],
    },
  },
};
