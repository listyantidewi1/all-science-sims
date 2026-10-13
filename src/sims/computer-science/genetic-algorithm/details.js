// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply selection, crossover, mutation to evolve a target.',
      'Connect mutation rate to convergence speed and noise.',
      'See why GA solves spaces too big for brute force.',
    ],
    id: [
      'Menerapkan seleksi, crossover, dan mutasi untuk evolusi.',
      'Mengaitkan laju mutasi dengan kecepatan konvergensi dan derau.',
      'Melihat mengapa GA dapat memecahkan ruang terlalu besar untuk brute force.',
    ],
  },  tryThis: {
    en: [
      'Set mutation to 0 — does it ever finish?',
      'Set mutation high — does it overshoot the target?',
      'Type a long target — how many generations to converge?',
    ],
    id: [
      'Atur mutasi ke 0 — apakah pernah selesai?',
      'Atur mutasi tinggi — apakah melewati target?',
      'Ketik target panjang — berapa generasi untuk konvergen?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Living things adapt without any designer: individuals vary, the better-suited ones leave more offspring, and offspring inherit a shuffled, slightly altered copy of their parents\' traits. A genetic algorithm (GA) borrows this recipe to solve problems. It keeps a population of candidate solutions, scores each with a fitness function, lets the fitter ones reproduce by mixing their parts (crossover) with occasional random changes (mutation), and repeats for many generations. Nobody writes the answer; it emerges from selection acting on variation.',
        'In this simulation every individual is a string the same length as your target sentence, built from 68 characters (letters, digits, space and a few punctuation marks). Fitness is simply the number of positions whose character matches the target. Each generation the population is sorted by fitness; the two best strings are copied unchanged (elitism), and the rest of the next generation is bred: two parents are chosen by tournament selection (pick 5 at random, keep the fittest), a random cut point splices the start of one parent to the end of the other, and then every character of the child is replaced by a random one with probability equal to the mutation rate.',
        'The controls change the balance between exploring and preserving. A larger population holds more variety, so the right character for each position is more likely to exist somewhere from the start, and the target is reached in fewer generations, at the cost of more work per generation. The mutation rate is the delicate one: at 0 the GA can only reshuffle characters already present, and with 100 random strings there is about a 23% chance (67/68 to the power 100) that a given position has no correct character anywhere, so the run stalls just short of the target. Too high a rate (0.2 means roughly every fifth character of a child is scrambled) destroys good children faster than selection can collect them; only elitism keeps the best score from falling. Rates near 1 divided by the string length usually work best. Generations per second only changes how fast you watch.',
        'This is a teaching toy, and it cheats in one honest way: the fitness function already knows the target. Real GAs score candidates by how well they solve a problem whose answer nobody knows, such as the length of a delivery route or the strength of a bridge design. Here each position is scored independently, so there are no traps; real fitness landscapes have interacting genes and local optima where a GA can get stuck. The simulation also never stops: it keeps breeding after the target is found. Still, the central lesson holds: the default 18-character target has 68^18 (about 10^33) possible strings, far beyond brute force, yet the GA typically finds it after a few hundred generations of 100 strings each, because fitness steers the search.',
      ],
      id: [
        'Makhluk hidup beradaptasi tanpa perancang: tiap individu berbeda-beda, yang paling cocok dengan lingkungannya menghasilkan lebih banyak keturunan, dan keturunan mewarisi salinan sifat orang tuanya yang tercampur dan sedikit berubah. Algoritma genetika (GA) meminjam resep ini untuk memecahkan masalah. GA menyimpan sebuah populasi calon solusi, menilai masing-masing dengan fungsi kebugaran (fitness), membiarkan yang lebih bugar berkembang biak dengan mencampur bagian-bagiannya (crossover) ditambah perubahan acak sesekali (mutasi), lalu mengulanginya selama banyak generasi. Tidak ada yang menulis jawabannya; jawaban itu muncul dari seleksi yang bekerja pada keragaman.',
        'Dalam simulasi ini setiap individu adalah string yang panjangnya sama dengan kalimat target, disusun dari 68 karakter (huruf, angka, spasi, dan beberapa tanda baca). Kebugaran dihitung sederhana: jumlah posisi yang hurufnya sama dengan target. Tiap generasi, populasi diurutkan menurut kebugaran; dua string terbaik disalin tanpa perubahan (elitisme), dan sisa generasi berikutnya dikembangbiakkan: dua induk dipilih lewat seleksi turnamen (ambil 5 secara acak, simpan yang paling bugar), satu titik potong acak menyambung awal induk pertama dengan akhir induk kedua, lalu setiap karakter anak diganti karakter acak dengan peluang sebesar laju mutasi.',
        'Kontrol-kontrolnya mengubah keseimbangan antara menjelajah dan mempertahankan. Populasi yang lebih besar menyimpan lebih banyak keragaman, sehingga karakter yang benar untuk tiap posisi lebih mungkin sudah ada sejak awal dan target tercapai dalam generasi yang lebih sedikit, dengan biaya kerja lebih besar per generasi. Laju mutasi adalah bagian yang peka: pada nilai 0, GA hanya bisa mengocok karakter yang sudah ada, dan dengan 100 string acak ada peluang sekitar 23% (67/68 dipangkatkan 100) bahwa suatu posisi tidak memiliki karakter yang benar di mana pun, sehingga proses mandek sedikit di bawah target. Laju yang terlalu tinggi (0,2 berarti kira-kira satu dari lima karakter anak diacak) merusak anak yang baik lebih cepat daripada seleksi mengumpulkannya; hanya elitisme yang menjaga skor terbaik tidak turun. Laju sekitar 1 dibagi panjang string biasanya paling baik. Generasi per detik hanya mengubah kecepatan tayangan.',
        'Ini mainan belajar, dan ia "curang" dengan jujur di satu hal: fungsi kebugarannya sudah tahu targetnya. GA sungguhan menilai calon berdasarkan seberapa baik ia memecahkan masalah yang jawabannya belum diketahui siapa pun, misalnya panjang rute pengiriman atau kekuatan rancangan jembatan. Di sini tiap posisi dinilai terpisah sehingga tidak ada jebakan; lanskap kebugaran sungguhan memiliki gen yang saling berinteraksi dan optimum lokal tempat GA bisa terjebak. Simulasi ini juga tidak pernah berhenti: ia terus berkembang biak setelah target ditemukan. Meski begitu, pelajaran utamanya tetap berlaku: target bawaan 18 karakter memiliki 68^18 (sekitar 10^33) kemungkinan string, jauh di luar jangkauan brute force, namun GA biasanya menemukannya setelah beberapa ratus generasi dengan 100 string per generasi, karena kebugaran mengarahkan pencarian.',
      ],
    },
    figure: {
      caption: {
        en: 'One breeding step for the target GENE. Crossover at a random cut joins the good start of parent A to the good end of parent B; a rare mutation then fixes the last character. Green = matches the target.',
        id: 'Satu langkah pembiakan untuk target GENE. Crossover pada titik potong acak menyambung awal induk A yang bagus dengan akhir induk B yang bagus; sebuah mutasi langka kemudian memperbaiki karakter terakhir. Hijau = cocok dengan target.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const box = (x, y, ch, ok, extra = '') => `<rect x="${x}" y="${y}" width="22" height="22" rx="4" fill="${ok ? '#10b981' : '#ef4444'}"${extra}/><text x="${x + 11}" y="${y + 16}" text-anchor="middle" class="wt">${ch}</text>`;
        const word = (x, y, s, mask) => s.split('').map((ch, i) => box(x + i * 26, y, ch, mask[i] === '1')).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Crossover and mutation in a genetic algorithm', 'Crossover dan mutasi dalam algoritma genetika')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.wt{fill:#fff;font-weight:700;font-size:13px;font-family:ui-monospace,monospace}.s{font-size:10px;opacity:.75}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.a{stroke:currentColor;stroke-width:1.5;fill:none;opacity:.7}</style>
  <text x="20" y="22">${L('Target', 'Target')}</text>
  <rect x="80" y="6" width="22" height="22" rx="4" class="m"/><text x="91" y="22" text-anchor="middle">G</text>
  <rect x="106" y="6" width="22" height="22" rx="4" class="m"/><text x="117" y="22" text-anchor="middle">E</text>
  <rect x="132" y="6" width="22" height="22" rx="4" class="m"/><text x="143" y="22" text-anchor="middle">N</text>
  <rect x="158" y="6" width="22" height="22" rx="4" class="m"/><text x="169" y="22" text-anchor="middle">E</text>
  <text x="20" y="58" class="s">${L('Parent A · fitness 2', 'Induk A · kebugaran 2')}</text>
  ${word(20, 64, 'GEXQ', '1100')}
  <text x="200" y="58" class="s">${L('Parent B · fitness 2', 'Induk B · kebugaran 2')}</text>
  ${word(200, 64, 'ZANQ', '0010')}
  <line x1="70" y1="56" x2="70" y2="94" class="m" stroke-dasharray="3 3"/>
  <line x1="250" y1="56" x2="250" y2="94" class="m" stroke-dasharray="3 3"/>
  <text x="74" y="100" class="s">${L('cut', 'potong')}</text>
  <text x="254" y="100" class="s">${L('cut', 'potong')}</text>
  <path d="M44 90 L166 124" class="a" marker-end="url(#g)"/>
  <path d="M276 90 L234 124" class="a" marker-end="url(#g)"/>
  <text x="20" y="146" class="s">${L('Child · fitness 3', 'Anak · kebugaran 3')}</text>
  ${word(150, 130, 'GENQ', '1110')}
  <text x="20" y="166" class="s">${L('first half from A, second half from B', 'paruh awal dari A, paruh akhir dari B')}</text>
  <path d="M239 156 L239 182" class="a" marker-end="url(#g)"/>
  <text x="250" y="176" class="s" style="fill:#f59e0b">${L('mutation: Q → E', 'mutasi: Q → E')}</text>
  <text x="20" y="206" class="s">${L('Mutated · fitness 4', 'Termutasi · kebugaran 4')}</text>
  ${word(150, 190, 'GEN', '111')}
  ${box(228, 190, 'E', true, ' stroke="#f59e0b" stroke-width="2.5"')}
  <text x="20" y="232" class="s">${L('mutation rate 0.02: a 2% chance per character of a random swap', 'laju mutasi 0,02: peluang 2% per karakter diganti secara acak')}</text>
  <defs><marker id="g" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A genetic algorithm keeps a population of candidate solutions and improves it through selection, crossover and mutation over many generations.',
        'Selection gives fitter candidates more offspring, but tournament selection still lets weaker ones reproduce sometimes, which preserves diversity.',
        'Crossover combines partial solutions from two parents; mutation introduces characters that no parent had.',
        'Elitism (copying the two best strings unchanged) guarantees the best fitness never decreases from one generation to the next.',
        'The GA tests only a tiny fraction of the 68^18 possible strings yet finds the target, because fitness guides the search instead of chance.',
      ],
      id: [
        'Algoritma genetika menyimpan populasi calon solusi dan memperbaikinya lewat seleksi, crossover, dan mutasi selama banyak generasi.',
        'Seleksi memberi calon yang lebih bugar lebih banyak keturunan, tetapi seleksi turnamen tetap membiarkan yang lebih lemah sesekali berkembang biak, sehingga keragaman terjaga.',
        'Crossover menggabungkan sebagian solusi dari dua induk; mutasi memasukkan karakter yang tidak dimiliki induk mana pun.',
        'Elitisme (menyalin dua string terbaik tanpa perubahan) menjamin kebugaran terbaik tidak pernah turun dari satu generasi ke generasi berikutnya.',
        'GA hanya menguji sebagian sangat kecil dari 68^18 kemungkinan string namun tetap menemukan target, karena kebugaran mengarahkan pencarian, bukan kebetulan.',
      ],
    },
    vocabulary: {
      en: [
        ['Population', 'The set of candidate solutions alive in one generation; here 20 to 500 strings.'],
        ['Fitness function', 'A score for how good a candidate is; here, the number of characters matching the target.'],
        ['Tournament selection', 'Choosing a parent by picking a few individuals at random (5 here) and keeping the fittest of them.'],
        ['Crossover', 'Building a child by joining the first part of one parent to the rest of another at a random cut point.'],
        ['Mutation rate', 'The probability that any single character of a child is replaced by a random character.'],
        ['Elitism', 'Copying the best individuals into the next generation unchanged so progress is never lost.'],
        ['Generation', 'One full cycle of selection, crossover and mutation that replaces the population.'],
        ['Search space', 'All possible candidates; for an 18-character target it has 68^18, about 10^33, members.'],
      ],
      id: [
        ['Populasi', 'Himpunan calon solusi yang hidup dalam satu generasi; di sini 20 sampai 500 string.'],
        ['Fungsi kebugaran', 'Skor seberapa baik sebuah calon; di sini, jumlah karakter yang cocok dengan target.'],
        ['Seleksi turnamen', 'Memilih induk dengan mengambil beberapa individu secara acak (di sini 5) dan menyimpan yang paling bugar.'],
        ['Crossover', 'Membentuk anak dengan menyambung bagian awal satu induk dengan sisa induk lain pada titik potong acak.'],
        ['Laju mutasi', 'Peluang bahwa satu karakter anak diganti dengan karakter acak.'],
        ['Elitisme', 'Menyalin individu terbaik ke generasi berikutnya tanpa perubahan agar kemajuan tidak hilang.'],
        ['Generasi', 'Satu siklus penuh seleksi, crossover, dan mutasi yang menggantikan populasi.'],
        ['Ruang pencarian', 'Semua calon yang mungkin; untuk target 18 karakter jumlahnya 68^18, sekitar 10^33.'],
      ],
    },
    misconceptions: {
      en: [
        ['A genetic algorithm is just random guessing.', 'Random guessing would need on the order of 10^33 tries for the default target. Selection makes the search directed: good partial answers are kept and combined, so each generation builds on the last.'],
        ['A higher mutation rate always speeds things up because it creates more change.', 'Beyond roughly 1 divided by the string length, mutation scrambles more correct characters than it creates. Children of good parents are ruined, and only elitism keeps the best score from dropping.'],
        ['The algorithm knows the answer, so real GAs must also need the answer in advance.', 'Comparing with the target is only a convenient fitness function for teaching. Real GAs score candidates by measurable quality, such as route length or simulated strength, without knowing the optimum.'],
        ['Fitness can go down between generations.', 'The best fitness cannot, because the two best strings are copied unchanged. The average fitness of the population can fluctuate, especially at high mutation rates.'],
      ],
      id: [
        ['Algoritma genetika hanyalah menebak secara acak.', 'Menebak acak butuh sekitar 10^33 percobaan untuk target bawaan. Seleksi membuat pencarian terarah: jawaban parsial yang baik disimpan dan digabungkan, sehingga tiap generasi membangun di atas generasi sebelumnya.'],
        ['Laju mutasi yang lebih tinggi selalu mempercepat karena perubahannya lebih banyak.', 'Di atas kira-kira 1 dibagi panjang string, mutasi lebih banyak merusak karakter yang sudah benar daripada menciptakan yang baru. Anak dari induk yang baik jadi rusak, dan hanya elitisme yang menjaga skor terbaik tidak turun.'],
        ['Algoritmanya tahu jawabannya, jadi GA sungguhan pasti juga butuh jawaban lebih dulu.', 'Membandingkan dengan target hanyalah fungsi kebugaran yang praktis untuk belajar. GA sungguhan menilai calon dari mutu yang terukur, misalnya panjang rute atau kekuatan hasil simulasi, tanpa mengetahui optimumnya.'],
        ['Kebugaran bisa turun antargenerasi.', 'Kebugaran terbaik tidak bisa turun, karena dua string terbaik disalin tanpa perubahan. Kebugaran rata-rata populasi bisa naik-turun, terutama pada laju mutasi tinggi.'],
      ],
    },
    realWorld: {
      en: [
        'Timetabling and crew scheduling: airlines and schools use evolutionary algorithms to find rosters that satisfy hundreds of conflicting constraints.',
        'NASA flew an antenna on its ST5 satellites (2006) whose odd, bent shape was designed by an evolutionary algorithm rather than by an engineer.',
        'Engineering design optimisation: shapes of car parts, truss bridges and turbine blades are evolved against simulated loads to save weight.',
        'Machine learning: evolutionary search tunes hyperparameters and even network architectures when gradients are unavailable.',
      ],
      id: [
        'Penjadwalan: maskapai dan sekolah memakai algoritma evolusioner untuk menyusun jadwal yang memenuhi ratusan batasan yang saling bertentangan.',
        'NASA menerbangkan antena pada satelit ST5 (2006) yang bentuknya aneh dan bengkok karena dirancang oleh algoritma evolusioner, bukan oleh insinyur.',
        'Optimasi rancangan teknik: bentuk komponen mobil, rangka jembatan, dan sudu turbin dievolusikan terhadap beban simulasi untuk menghemat bobot.',
        'Pembelajaran mesin: pencarian evolusioner menyetel hiperparameter dan bahkan arsitektur jaringan saat gradien tidak tersedia.',
      ],
    },
    questions: {
      en: [
        { q: 'The default target has 18 characters drawn from 68 possibilities. How many strings are possible, and why is brute force hopeless?', a: 'About 68^18, roughly 10^33. Checking a billion strings per second would take around 10^24 seconds, far longer than the age of the universe (about 4 × 10^17 seconds). The GA finds the target with only tens of thousands of fitness evaluations.' },
        { q: 'With mutation 0 and a population of 100, estimate the chance that a given position has no correct character in the whole starting population. What does this mean for the run?', a: 'Each random string has a 67/68 chance of being wrong at that position, so all 100 are wrong with probability (67/68)^100 ≈ 0.23. About 23% of positions (roughly 4 of 18) can never be fixed by crossover alone, so the best string stalls below 18/18.' },
        { q: 'At mutation 0.2 the best fitness still never drops, yet the population barely improves. Explain both observations.', a: 'Elitism copies the two best strings unchanged, so the best score is protected. Every other child has each character scrambled with probability 0.2, about 3.6 characters in an 18-character string, so most children are worse than their parents and selection cannot accumulate progress.' },
      ],
      id: [
        { q: 'Target bawaan memiliki 18 karakter dari 68 kemungkinan. Berapa banyak string yang mungkin, dan mengapa brute force tidak ada harapan?', a: 'Sekitar 68^18, kira-kira 10^33. Memeriksa satu miliar string per detik akan memakan waktu sekitar 10^24 detik, jauh lebih lama daripada umur alam semesta (sekitar 4 × 10^17 detik). GA menemukan target hanya dengan puluhan ribu evaluasi kebugaran.' },
        { q: 'Dengan mutasi 0 dan populasi 100, perkirakan peluang bahwa suatu posisi tidak memiliki karakter yang benar di seluruh populasi awal. Apa akibatnya bagi proses?', a: 'Tiap string acak berpeluang 67/68 salah di posisi itu, sehingga semua 100 salah dengan peluang (67/68)^100 ≈ 0,23. Sekitar 23% posisi (kira-kira 4 dari 18) tidak pernah bisa diperbaiki oleh crossover saja, sehingga string terbaik mandek di bawah 18/18.' },
        { q: 'Pada mutasi 0,2 kebugaran terbaik tetap tidak pernah turun, tetapi populasi hampir tidak membaik. Jelaskan kedua pengamatan itu.', a: 'Elitisme menyalin dua string terbaik tanpa perubahan, sehingga skor terbaik terlindungi. Setiap anak lainnya tiap karakternya diacak dengan peluang 0,2, sekitar 3,6 karakter pada string 18 karakter, sehingga sebagian besar anak lebih buruk daripada induknya dan seleksi tidak bisa menumpuk kemajuan.' },
      ],
    },
  },
};
