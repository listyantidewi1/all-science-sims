// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Identify the 8 phases: prophase I → telophase II.',
      'See how crossing over (chiasmata) creates genetic recombination.',
      'Understand independent assortment: each gamete is a unique mix.',
    ],
    id: [
      'Mengidentifikasi 8 fase: profase I → telofase II.',
      'Melihat pindah silang (kiasmata) menghasilkan rekombinasi genetik.',
      'Memahami pengelompokan bebas: tiap gamet adalah campuran unik.',
    ],
  },  tryThis: {
    en: [
      'Step through phase by phase to see chromosome behavior.',
      'Toggle "show recombination" to highlight crossover events.',
      'Compare to mitosis (single division → 2 identical diploid cells).',
    ],
    id: [
      'Telusuri fase demi fase untuk melihat perilaku kromosom.',
      'Aktifkan "tampilkan rekombinasi" untuk menyorot peristiwa pindah silang.',
      'Bandingkan dengan mitosis (satu pembelahan → 2 sel diploid identik).',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Body cells are diploid: they carry two sets of chromosomes, one inherited from each parent, so every chromosome has a matching partner called its homologue. If sperm and egg were made by ordinary cell division, the chromosome number would double every generation. Meiosis prevents this. It copies the DNA once and then divides twice, producing four haploid gametes with a single set each; fertilisation joins two sets and restores the diploid number. In humans that means 46 chromosomes in body cells and 23 in each gamete.',
        'The simulation follows a small cell with 2n = 4: two homologous pairs, with the chromosome from the mother drawn in blue and the one from the father in pink. It begins in interphase (G2), where DNA has already been replicated so each chromosome consists of two identical sister chromatids joined at a centromere. Use the Phase slider, the Step buttons or Auto-play to move through nine snapshots. Meiosis I is the reduction division: homologues pair up in prophase I, line up as pairs at the equator in metaphase I and are pulled to opposite poles in anaphase I, so each of the two cells formed in telophase I has n = 2 chromosomes, each still made of two chromatids. Meiosis II looks like mitosis: in each cell the chromosomes line up singly and the sister chromatids separate, ending with four cells that each have two single-chromatid chromosomes.',
        'Meiosis is also where genetic variety is created. In prophase I the paired homologues swap matching segments at points called chiasmata; this is crossing over, and the sim shows it with the Show recombination toggle, which recolours one chromatid of each chromosome purple or green to mark that it now carries a mixture of maternal and paternal DNA. At metaphase I, each pair orients independently of the others, so which pole receives the maternal copy is random for every pair; this is independent assortment, and with n pairs it gives 2ⁿ combinations, 4 for the sim\'s cell and over 8 million for a human. Look at the four gametes at the end: no two have the same mix of colours.',
        'The sim is a set of still pictures, not a continuous animation, and it leaves out the spindle fibres, the nuclear envelope and cytokinesis. Crossing over is shown as a whole chromatid changing colour rather than a segment being exchanged, and only one chiasma is drawn. The orientation at metaphase I is fixed in the drawing, so you see one of the four possible outcomes, not a random one. Nothing ever goes wrong in the sim, whereas in real cells homologues sometimes fail to separate (nondisjunction), giving gametes with an extra or missing chromosome. Timing is also not to scale: in humans, egg cells pause in prophase I for years.',
      ],
      id: [
        'Sel tubuh bersifat diploid: membawa dua set kromosom, satu dari tiap orang tua, sehingga setiap kromosom memiliki pasangan yang disebut homolog. Jika sperma dan sel telur dibuat dengan pembelahan sel biasa, jumlah kromosom akan berlipat dua setiap generasi. Meiosis mencegah hal itu. DNA disalin sekali lalu sel membelah dua kali, menghasilkan empat gamet haploid yang masing-masing membawa satu set; pembuahan menyatukan dua set dan mengembalikan jumlah diploid. Pada manusia, itu berarti 46 kromosom di sel tubuh dan 23 di tiap gamet.',
        'Simulasi mengikuti sebuah sel kecil dengan 2n = 4: dua pasang kromosom homolog, dengan kromosom dari ibu digambar biru dan dari ayah merah muda. Simulasi dimulai pada interfase (G2), ketika DNA sudah direplikasi sehingga tiap kromosom terdiri dari dua kromatid saudara yang identik dan terhubung di sentromer. Gunakan slider Fase, tombol Langkah, atau Putar otomatis untuk melewati sembilan cuplikan. Meiosis I adalah pembelahan reduksi: homolog berpasangan pada profase I, berjajar sebagai pasangan di bidang ekuator pada metafase I, dan ditarik ke kutub berlawanan pada anafase I, sehingga tiap sel yang terbentuk pada telofase I memiliki n = 2 kromosom yang masing-masing masih terdiri dari dua kromatid. Meiosis II mirip mitosis: di tiap sel kromosom berjajar sendiri-sendiri dan kromatid saudara berpisah, berakhir dengan empat sel yang masing-masing memiliki dua kromosom berkromatid tunggal.',
        'Meiosis juga tempat keragaman genetik diciptakan. Pada profase I, homolog yang berpasangan menukar segmen yang bersesuaian pada titik-titik yang disebut kiasmata; inilah pindah silang, dan simulasi menampilkannya lewat tombol Tampilkan rekombinasi, yang mewarnai ulang satu kromatid dari tiap kromosom menjadi ungu atau hijau untuk menandai bahwa ia kini membawa campuran DNA ibu dan ayah. Pada metafase I, tiap pasangan mengambil orientasi secara bebas dari pasangan lain, sehingga kutub mana yang menerima salinan ibu bersifat acak untuk tiap pasangan; inilah pengelompokan bebas, dan dengan n pasangan menghasilkan 2ⁿ kombinasi, 4 untuk sel di simulasi dan lebih dari 8 juta untuk manusia. Perhatikan empat gamet di akhir: tidak ada dua yang campuran warnanya sama.',
        'Simulasi ini berupa rangkaian gambar diam, bukan animasi berkelanjutan, dan tidak menggambar benang spindel, selubung inti, maupun sitokinesis. Pindah silang ditunjukkan sebagai satu kromatid utuh yang berubah warna, bukan pertukaran segmen, dan hanya satu kiasma yang digambar. Orientasi pada metafase I dibuat tetap, sehingga yang kamu lihat adalah satu dari empat hasil yang mungkin, bukan hasil acak. Dalam simulasi tidak pernah ada yang salah, padahal pada sel sungguhan homolog kadang gagal berpisah (gagal berpisah atau nondisjunction), menghasilkan gamet dengan kromosom berlebih atau kurang. Waktunya juga tidak berskala: pada manusia, sel telur berhenti di profase I selama bertahun-tahun.',
      ],
    },
    figure: {
      caption: {
        en: 'Chromosome bookkeeping for the sim\'s cell. Meiosis I halves the chromosome number by separating homologues; meiosis II separates sister chromatids without changing the number. The purple segment marks DNA swapped by crossing over.',
        id: 'Hitungan kromosom untuk sel di simulasi. Meiosis I memangkas jumlah kromosom menjadi separuh dengan memisahkan homolog; meiosis II memisahkan kromatid saudara tanpa mengubah jumlahnya. Segmen ungu menandai DNA yang ditukar lewat pindah silang.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        // One chromosome: a vertical bar (two bars when doubled) with a centromere dot.
        const chr = (x, y, len, c1, c2, swap) => {
          const h = len / 2;
          let s = `<rect x="${x - 5}" y="${y - h}" width="4" height="${len}" fill="${c1}"/>`;
          if (c2) s += `<rect x="${x + 1}" y="${y - h}" width="4" height="${len}" fill="${c2}"/>`;
          if (swap) s += `<rect x="${c2 ? x + 1 : x - 5}" y="${y + h - 7}" width="4" height="7" fill="#8b5cf6"/>`;
          return s + `<circle cx="${x}" cy="${y}" r="2.2" fill="currentColor"/>`;
        };
        const B = '#3b82f6', R = '#ef4444';
        const cell = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="currentColor" stroke-width="1.2" opacity=".6"/>`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Chromosome counts through meiosis I and II', 'Jumlah kromosom sepanjang meiosis I dan II')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.h{font-weight:600}.s{font-size:9px;opacity:.8}.a{stroke:currentColor;stroke-width:1.4;opacity:.7}</style>
  <text x="50" y="16" class="h" text-anchor="middle">${L('Parent cell', 'Sel induk')}</text>
  <text x="50" y="27" class="s" text-anchor="middle">2n = 4, 8 ${L('chromatids', 'kromatid')}</text>
  ${cell(50, 85, 44)}
  ${chr(34, 72, 30, B, B)}${chr(66, 72, 30, R, R)}
  ${chr(34, 104, 18, B, B)}${chr(66, 104, 18, R, R)}
  <line x1="98" y1="85" x2="124" y2="85" class="a"/>
  <path d="M124 85 L117 81 L117 89 z" fill="currentColor" opacity=".7"/>
  <text x="111" y="70" class="s" text-anchor="middle">${L('Meiosis I', 'Meiosis I')}</text>
  <text x="111" y="106" class="s" text-anchor="middle">${L('homologues', 'homolog')}</text>
  <text x="111" y="116" class="s" text-anchor="middle">${L('separate', 'berpisah')}</text>
  <text x="170" y="16" class="h" text-anchor="middle">${L('After meiosis I', 'Setelah meiosis I')}</text>
  <text x="170" y="27" class="s" text-anchor="middle">2 ${L('cells', 'sel')}, n = 2, ${L('still doubled', 'masih ganda')}</text>
  ${cell(170, 60, 26)}
  ${chr(160, 60, 30, B, B, true)}${chr(182, 60, 18, R, R)}
  ${cell(170, 125, 26)}
  ${chr(160, 125, 30, R, R, true)}${chr(182, 125, 18, B, B)}
  <line x1="202" y1="92" x2="230" y2="92" class="a"/>
  <path d="M230 92 L223 88 L223 96 z" fill="currentColor" opacity=".7"/>
  <text x="216" y="78" class="s" text-anchor="middle">${L('Meiosis II', 'Meiosis II')}</text>
  <text x="216" y="112" class="s" text-anchor="middle">${L('sister chromatids', 'kromatid saudara')}</text>
  <text x="216" y="122" class="s" text-anchor="middle">${L('separate', 'berpisah')}</text>
  <text x="290" y="16" class="h" text-anchor="middle">${L('Four gametes', 'Empat gamet')}</text>
  <text x="290" y="27" class="s" text-anchor="middle">n = 2, ${L('single chromatids', 'kromatid tunggal')}</text>
  ${cell(262, 60, 20)}${chr(255, 60, 30, B)}${chr(270, 60, 18, R)}
  ${cell(318, 60, 20)}${chr(311, 60, 30, B, null, true)}${chr(326, 60, 18, R)}
  ${cell(262, 125, 20)}${chr(255, 125, 30, R)}${chr(270, 125, 18, B)}
  ${cell(318, 125, 20)}${chr(311, 125, 30, R, null, true)}${chr(326, 125, 18, B)}
  <rect x="30" y="176" width="10" height="4" fill="${B}"/><text x="44" y="181" class="s">${L('from mother', 'dari ibu')}</text>
  <rect x="120" y="176" width="10" height="4" fill="${R}"/><text x="134" y="181" class="s">${L('from father', 'dari ayah')}</text>
  <rect x="210" y="176" width="10" height="4" fill="#8b5cf6"/><text x="224" y="181" class="s">${L('crossed-over segment', 'segmen pindah silang')}</text>
  <text x="180" y="204" class="s" text-anchor="middle">${L('Count: 4 chromosomes → 2 per cell → 2 per cell. Only meiosis I changes the number.', 'Hitungan: 4 kromosom → 2 per sel → 2 per sel. Hanya meiosis I yang mengubah jumlahnya.')}</text>
  <text x="180" y="220" class="s" text-anchor="middle">${L('DNA content: 4c → 2c → 1c, because replication happens only once.', 'Kandungan DNA: 4c → 2c → 1c, karena replikasi hanya terjadi sekali.')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Meiosis replicates DNA once and divides twice, turning one diploid cell into four haploid gametes.',
        'Meiosis I separates homologous chromosomes and halves the chromosome number; meiosis II separates sister chromatids and keeps it.',
        'Crossing over in prophase I swaps segments between homologues, so each chromatid can carry DNA from both parents.',
        'Independent assortment at metaphase I gives 2ⁿ possible chromosome combinations in the gametes.',
        'Fertilisation restores the diploid number, which is why the chromosome count stays constant across generations.',
      ],
      id: [
        'Meiosis mereplikasi DNA sekali dan membelah dua kali, mengubah satu sel diploid menjadi empat gamet haploid.',
        'Meiosis I memisahkan kromosom homolog dan memangkas jumlah kromosom menjadi separuh; meiosis II memisahkan kromatid saudara dan mempertahankan jumlahnya.',
        'Pindah silang pada profase I menukar segmen antara homolog, sehingga tiap kromatid bisa membawa DNA dari kedua orang tua.',
        'Pengelompokan bebas pada metafase I menghasilkan 2ⁿ kemungkinan kombinasi kromosom pada gamet.',
        'Pembuahan mengembalikan jumlah diploid, sehingga jumlah kromosom tetap sama dari generasi ke generasi.',
      ],
    },
    vocabulary: {
      en: [
        ['Diploid (2n)', 'Having two sets of chromosomes, one from each parent; 2n = 4 in the sim, 46 in humans.'],
        ['Haploid (n)', 'Having a single set of chromosomes, as in gametes; n = 2 in the sim, 23 in humans.'],
        ['Homologous chromosomes', 'The maternal and paternal versions of the same chromosome: same genes in the same order, but possibly different alleles.'],
        ['Sister chromatids', 'The two identical copies of one chromosome made by DNA replication, joined at the centromere until anaphase II.'],
        ['Crossing over', 'The exchange of matching segments between homologous chromosomes during prophase I, at points called chiasmata.'],
        ['Independent assortment', 'The random orientation of each homologous pair at metaphase I, so each pair separates independently of the others.'],
        ['Gamete', 'A haploid reproductive cell (sperm or egg) produced by meiosis.'],
        ['Nondisjunction', 'Failure of homologues or sister chromatids to separate, giving gametes with the wrong chromosome number.'],
      ],
      id: [
        ['Diploid (2n)', 'Memiliki dua set kromosom, satu dari tiap orang tua; 2n = 4 di simulasi, 46 pada manusia.'],
        ['Haploid (n)', 'Memiliki satu set kromosom, seperti pada gamet; n = 2 di simulasi, 23 pada manusia.'],
        ['Kromosom homolog', 'Versi ibu dan versi ayah dari kromosom yang sama: gen yang sama dengan urutan yang sama, tetapi alelnya bisa berbeda.'],
        ['Kromatid saudara', 'Dua salinan identik dari satu kromosom yang dihasilkan replikasi DNA, terhubung di sentromer sampai anafase II.'],
        ['Pindah silang', 'Pertukaran segmen yang bersesuaian antara kromosom homolog selama profase I, pada titik-titik yang disebut kiasmata.'],
        ['Pengelompokan bebas', 'Orientasi acak tiap pasangan homolog pada metafase I, sehingga tiap pasangan berpisah tanpa bergantung pada pasangan lain.'],
        ['Gamet', 'Sel reproduksi haploid (sperma atau sel telur) yang dihasilkan meiosis.'],
        ['Gagal berpisah (nondisjunction)', 'Kegagalan homolog atau kromatid saudara untuk berpisah, menghasilkan gamet dengan jumlah kromosom yang salah.'],
      ],
    },
    misconceptions: {
      en: [
        ['Meiosis II halves the chromosome number again.', 'Only meiosis I reduces the number, by separating homologous pairs. Meiosis II separates sister chromatids, so each cell keeps n chromosomes; in the sim the cells go 4 → 2 → 2, not 4 → 2 → 1.'],
        ['Sister chromatids and homologous chromosomes are the same thing.', 'Sister chromatids are identical copies of one chromosome, made during replication. Homologues are the maternal and paternal versions of a chromosome; they carry the same genes but may have different alleles, which is why separating them matters for inheritance.'],
        ['The four gametes are genetically identical, like the products of mitosis.', 'Crossing over and independent assortment make every gamete different. Even in the sim\'s tiny cell, the four gametes show four different colour combinations.'],
        ['Each gamete gets either all the mother\'s chromosomes or all the father\'s.', 'Each pair is sorted independently, so a gamete normally receives a mixture: some maternal chromosomes, some paternal, and many that are themselves patchworks because of crossing over.'],
      ],
      id: [
        ['Meiosis II memangkas jumlah kromosom menjadi separuh lagi.', 'Hanya meiosis I yang mengurangi jumlah, dengan memisahkan pasangan homolog. Meiosis II memisahkan kromatid saudara, sehingga tiap sel tetap memiliki n kromosom; di simulasi selnya berjalan 4 → 2 → 2, bukan 4 → 2 → 1.'],
        ['Kromatid saudara dan kromosom homolog adalah hal yang sama.', 'Kromatid saudara adalah salinan identik dari satu kromosom yang dibuat saat replikasi. Homolog adalah versi ibu dan versi ayah dari suatu kromosom; keduanya membawa gen yang sama tetapi alelnya bisa berbeda, dan itulah sebabnya pemisahannya penting bagi pewarisan sifat.'],
        ['Keempat gamet identik secara genetik, seperti hasil mitosis.', 'Pindah silang dan pengelompokan bebas membuat setiap gamet berbeda. Bahkan pada sel kecil di simulasi, keempat gamet menunjukkan empat kombinasi warna yang berbeda.'],
        ['Tiap gamet menerima seluruh kromosom ibu saja atau seluruh kromosom ayah saja.', 'Tiap pasangan disortir secara bebas, sehingga gamet biasanya menerima campuran: beberapa kromosom ibu, beberapa kromosom ayah, dan banyak yang sendirinya sudah tambal sulam akibat pindah silang.'],
      ],
    },
    realWorld: {
      en: [
        'Human sperm and egg cells each carry 23 chromosomes; their fusion gives the 46 found in every body cell.',
        'Down syndrome (trisomy 21) usually results from nondisjunction of chromosome 21 during meiosis, so a gamete carries two copies instead of one.',
        'Brothers and sisters share the same parents but look different because independent assortment and crossing over make every gamete unique.',
        'Mendel\'s laws of segregation and independent assortment, worked out from pea plants in the 1860s, are explained by the movements of chromosomes in meiosis I.',
      ],
      id: [
        'Sperma dan sel telur manusia masing-masing membawa 23 kromosom; penyatuannya menghasilkan 46 kromosom yang ada di setiap sel tubuh.',
        'Sindrom Down (trisomi 21) biasanya terjadi karena gagal berpisahnya kromosom 21 saat meiosis, sehingga sebuah gamet membawa dua salinan, bukan satu.',
        'Kakak dan adik memiliki orang tua yang sama tetapi berbeda rupa karena pengelompokan bebas dan pindah silang membuat setiap gamet unik.',
        'Hukum segregasi dan hukum pengelompokan bebas Mendel, yang disusun dari tanaman kacang ercis pada 1860-an, dijelaskan oleh pergerakan kromosom dalam meiosis I.',
      ],
    },
    questions: {
      en: [
        { q: 'The sim\'s cell has 2n = 4. How many chromosomes and how many chromatids are in each cell after meiosis I, and after meiosis II?', a: 'After meiosis I: two cells, each with 2 chromosomes that are still doubled, so 4 chromatids. After meiosis II: four cells, each with 2 chromosomes made of a single chromatid each, so 2 chromatids. Only meiosis I changes the chromosome number.' },
        { q: 'A human body cell has 46 chromosomes. How many does a gamete have, and what would happen without meiosis?', a: 'A gamete has 23, one from each homologous pair, because meiosis I separates the pairs. Without that halving, fertilisation would give 92 chromosomes, then 184, and so on; meiosis keeps the number constant at 46 generation after generation.' },
        { q: 'Ignoring crossing over, how many different gametes can the sim\'s cell produce by independent assortment alone? How many for a human?', a: 'Each pair has two ways to orient, independently of the others, so there are 2ⁿ combinations: 2² = 4 for n = 2 and 2²³ ≈ 8.4 million for n = 23. Crossing over then makes the number of possible gametes effectively unlimited.' },
      ],
      id: [
        { q: 'Sel di simulasi memiliki 2n = 4. Berapa kromosom dan berapa kromatid di tiap sel setelah meiosis I, dan setelah meiosis II?', a: 'Setelah meiosis I: dua sel, masing-masing dengan 2 kromosom yang masih ganda, jadi 4 kromatid. Setelah meiosis II: empat sel, masing-masing dengan 2 kromosom yang terdiri dari satu kromatid, jadi 2 kromatid. Hanya meiosis I yang mengubah jumlah kromosom.' },
        { q: 'Sel tubuh manusia memiliki 46 kromosom. Berapa kromosom pada gamet, dan apa yang terjadi tanpa meiosis?', a: 'Gamet memiliki 23, satu dari tiap pasangan homolog, karena meiosis I memisahkan pasangan itu. Tanpa pengurangan itu, pembuahan akan menghasilkan 92 kromosom, lalu 184, dan seterusnya; meiosis menjaga jumlahnya tetap 46 dari generasi ke generasi.' },
        { q: 'Tanpa memperhitungkan pindah silang, berapa macam gamet yang bisa dihasilkan sel di simulasi lewat pengelompokan bebas saja? Berapa untuk manusia?', a: 'Tiap pasangan memiliki dua cara berorientasi, bebas dari pasangan lain, sehingga ada 2ⁿ kombinasi: 2² = 4 untuk n = 2 dan 2²³ ≈ 8,4 juta untuk n = 23. Pindah silang kemudian membuat jumlah gamet yang mungkin praktis tak terbatas.' },
      ],
    },
  },
};
