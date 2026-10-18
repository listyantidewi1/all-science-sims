// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Draw a two-stage tree diagram, multiply probabilities along a path to find the probability of a compound outcome, and add the leaves that belong to an event.',
      'Distinguish independent from dependent events (with and without replacement) and mutually exclusive from overlapping events, and use the rules P(A ∩ B) = P(A)·P(B|A) and P(A ∪ B) = P(A) + P(B) − P(A ∩ B).',
      'Compute conditional probabilities P(A|B) = P(A ∩ B)/P(B) from a tree, and count arrangements with permutations nPr and combinations nCr.',
    ],
    id: [
      'Menggambar diagram pohon dua tahap, mengalikan peluang sepanjang lintasan untuk mendapatkan peluang kejadian majemuk, dan menjumlahkan daun-daun yang termasuk dalam suatu kejadian.',
      'Membedakan kejadian saling bebas dan tidak bebas (dengan dan tanpa pengembalian) serta kejadian saling lepas dan beririsan, dan menggunakan aturan P(A ∩ B) = P(A)·P(B|A) dan P(A ∪ B) = P(A) + P(B) − P(A ∩ B).',
      'Menghitung peluang bersyarat P(A|B) = P(A ∩ B)/P(B) dari diagram pohon, dan mencacah susunan dengan permutasi nPr dan kombinasi nCr.',
    ],
  },
  tryThis: {
    en: [
      'Choose the bag with 3 red and 2 blue. Turn replacement off and compare the second-stage fractions on the two branches. Why are they different?',
      'Set A = "first is red" and B = "second is red". Toggle replacement on and off and watch whether P(B|A) equals P(B).',
      'Set A = "both the same" and B = "exactly one red". Are these mutually exclusive? Check that P(A ∪ B) = P(A) + P(B).',
      'In the counting panel set n = 4, r = 2. Count the listed permutations and combinations and explain why 4P2 = 4C2 × 2!.',
    ],
    id: [
      'Pilih kantong dengan 3 merah dan 2 biru. Matikan pengembalian dan bandingkan pecahan tahap kedua pada kedua cabang. Mengapa berbeda?',
      'Atur A = "pertama merah" dan B = "kedua merah". Nyalakan dan matikan pengembalian lalu perhatikan apakah P(B|A) sama dengan P(B).',
      'Atur A = "keduanya sama" dan B = "tepat satu merah". Apakah keduanya saling lepas? Periksa bahwa P(A ∪ B) = P(A) + P(B).',
      'Pada panel pencacahan atur n = 4, r = 2. Hitung permutasi dan kombinasi yang terdaftar dan jelaskan mengapa 4P2 = 4C2 × 2!.',
    ],
  },

  learn: {
    background: {
      en: [
        'A tree diagram organises a two-stage experiment. Each branch carries the probability of that step, the probabilities leaving any node add to 1, and the probability of a complete path (a leaf) is the product of its branch probabilities: P(first R and second B) = P(R)·P(B | R). An event such as "at least one red" is a set of leaves, and its probability is the sum of those leaves. The sim writes every probability as an exact fraction so you can check the arithmetic by hand.',
        'Two events are independent when one tells you nothing about the other: P(B | A) = P(B), equivalently P(A ∩ B) = P(A)·P(B). Coin flips and dice rolls are independent, and so are draws with replacement, because the bag is restored each time. Drawing without replacement makes the second draw depend on the first: with 3 red and 2 blue balls, P(second R | first R) = 2/4 while P(second R | first B) = 3/4. Two events are mutually exclusive when they cannot both happen (no shared leaf), and only then does P(A ∪ B) = P(A) + P(B); in general P(A ∪ B) = P(A) + P(B) − P(A ∩ B).',
        'A conditional probability narrows the sample space: P(A | B) = P(A ∩ B)/P(B) keeps only the leaves in B and asks what fraction of that probability also lies in A. The tree gives P(second | first) directly on its branches, but questions such as "given the second ball was red, what is the probability the first was red?" need the formula, because the condition is on the later stage. The expected frequency of an event in N trials is N·P(A); the simulate button draws 100 random outcomes so you can see how the observed count scatters around that value.',
        'Counting arrangements answers "how many equally likely outcomes are there?" The number of ordered selections of r objects from n distinct objects is the permutation nPr = n!/(n − r)!, and the number of unordered selections is the combination nCr = n!/(r!(n − r)!). Each combination can be ordered in r! ways, so nPr = nCr·r!. For n = 5 and r = 3 there are 60 permutations but only 10 combinations. These counts become probabilities when every arrangement is equally likely, for example the chance that a random 3-letter code from 5 letters is in alphabetical order is 10/60 = 1/6.',
      ],
      id: [
        'Diagram pohon menata percobaan dua tahap. Setiap cabang memuat peluang langkah itu, peluang yang keluar dari satu simpul berjumlah 1, dan peluang satu lintasan lengkap (daun) adalah hasil kali peluang cabangnya: P(pertama M dan kedua B) = P(M)·P(B | M). Kejadian seperti "paling sedikit satu merah" adalah himpunan daun, dan peluangnya adalah jumlah daun-daun itu. Simulasi menulis setiap peluang sebagai pecahan eksak sehingga perhitungannya bisa diperiksa dengan tangan.',
        'Dua kejadian saling bebas jika yang satu tidak memberi informasi tentang yang lain: P(B | A) = P(B), setara dengan P(A ∩ B) = P(A)·P(B). Lemparan koin dan dadu saling bebas, begitu pula pengambilan dengan pengembalian, karena isi kantong dipulihkan setiap kali. Pengambilan tanpa pengembalian membuat pengambilan kedua bergantung pada yang pertama: dengan 3 bola merah dan 2 biru, P(kedua M | pertama M) = 2/4 sedangkan P(kedua M | pertama B) = 3/4. Dua kejadian saling lepas jika tidak dapat terjadi bersamaan (tidak ada daun bersama), dan hanya saat itulah P(A ∪ B) = P(A) + P(B); secara umum P(A ∪ B) = P(A) + P(B) − P(A ∩ B).',
        'Peluang bersyarat mempersempit ruang sampel: P(A | B) = P(A ∩ B)/P(B) hanya menyimpan daun-daun dalam B dan menanyakan berapa bagian dari peluang itu yang juga berada dalam A. Diagram pohon memberi P(kedua | pertama) langsung pada cabangnya, tetapi pertanyaan seperti "jika bola kedua merah, berapa peluang bola pertama merah?" memerlukan rumus, karena syaratnya ada pada tahap belakangan. Frekuensi harapan suatu kejadian dalam N percobaan adalah N·P(A); tombol simulasi mengambil 100 hasil acak sehingga kamu bisa melihat bagaimana frekuensi pengamatan menyebar di sekitar nilai itu.',
        'Pencacahan susunan menjawab "berapa banyak hasil yang sama mungkinnya?" Banyaknya pilihan berurutan r objek dari n objek berbeda adalah permutasi nPr = n!/(n − r)!, dan banyaknya pilihan tak berurutan adalah kombinasi nCr = n!/(r!(n − r)!). Setiap kombinasi dapat diurutkan dalam r! cara, sehingga nPr = nCr·r!. Untuk n = 5 dan r = 3 ada 60 permutasi tetapi hanya 10 kombinasi. Cacahan ini menjadi peluang ketika setiap susunan sama mungkinnya, misalnya peluang kode 3 huruf acak dari 5 huruf tersusun menurut abjad adalah 10/60 = 1/6.',
      ],
    },
    figure: {
      caption: {
        en: 'Tree for two draws without replacement from a bag with 3 red and 2 blue balls. The second-stage fractions depend on the first draw (dependent events). Each leaf is the product along its path; the four leaves add to 20/20 = 1.',
        id: 'Diagram pohon untuk dua pengambilan tanpa pengembalian dari kantong berisi 3 bola merah dan 2 biru. Pecahan tahap kedua bergantung pada pengambilan pertama (kejadian tidak bebas). Setiap daun adalah hasil kali sepanjang lintasannya; keempat daun berjumlah 20/20 = 1.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const R = L('R', 'M'), B = L('B', 'B');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Tree diagram for two draws without replacement', 'Diagram pohon untuk dua pengambilan tanpa pengembalian')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.br{stroke:currentColor;stroke-width:1.4;fill:none;opacity:.75}.lbl{font:bold 11px system-ui,sans-serif}.fr{font:11px system-ui,sans-serif}</style>
  <text x="22" y="22" class="lbl">${L('1st draw', 'Pengambilan 1')}</text><text x="128" y="22" class="lbl">${L('2nd draw', 'Pengambilan 2')}</text><text x="238" y="22" class="lbl">${L('Outcome', 'Hasil')}</text><text x="300" y="22" class="lbl">P</text>
  <circle cx="30" cy="125" r="4" fill="currentColor"/>
  <line x1="30" y1="125" x2="120" y2="70" class="br"/><line x1="30" y1="125" x2="120" y2="180" class="br"/>
  <text x="60" y="88" fill="#ef4444" class="fr">3/5</text><text x="60" y="168" fill="#3b82f6" class="fr">2/5</text>
  <circle cx="120" cy="70" r="7" fill="#ef4444"/><circle cx="120" cy="180" r="7" fill="#3b82f6"/>
  <line x1="120" y1="70" x2="220" y2="45" class="br"/><line x1="120" y1="70" x2="220" y2="100" class="br"/>
  <line x1="120" y1="180" x2="220" y2="150" class="br"/><line x1="120" y1="180" x2="220" y2="210" class="br"/>
  <text x="160" y="50" fill="#ef4444" class="fr">2/4</text><text x="160" y="97" fill="#3b82f6" class="fr">2/4</text>
  <text x="160" y="158" fill="#ef4444" class="fr">3/4</text><text x="160" y="205" fill="#3b82f6" class="fr">1/4</text>
  <circle cx="220" cy="45" r="6" fill="#ef4444"/><circle cx="220" cy="100" r="6" fill="#3b82f6"/><circle cx="220" cy="150" r="6" fill="#ef4444"/><circle cx="220" cy="210" r="6" fill="#3b82f6"/>
  <text x="236" y="49">${R}${R}</text><text x="236" y="104">${R}${B}</text><text x="236" y="154">${B}${R}</text><text x="236" y="214">${B}${B}</text>
  <text x="268" y="49">3/5·2/4 = 6/20</text><text x="268" y="104">3/5·2/4 = 6/20</text><text x="268" y="154">2/5·3/4 = 6/20</text><text x="268" y="214">2/5·1/4 = 2/20</text>
  <text x="236" y="232" opacity=".75">${L('sum of leaves = 20/20 = 1', 'jumlah daun = 20/20 = 1')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Multiply along a path, add across leaves: P(path) is the product of branch probabilities, and P(event) is the sum of the leaves in the event.',
        'Independent events satisfy P(B | A) = P(B) and P(A ∩ B) = P(A)·P(B); drawing without replacement makes the stages dependent.',
        'Mutually exclusive events share no outcome, so P(A ∪ B) = P(A) + P(B); otherwise subtract the overlap: P(A ∪ B) = P(A) + P(B) − P(A ∩ B).',
        'Conditional probability P(A | B) = P(A ∩ B)/P(B) restricts attention to the outcomes where B happened.',
        'Expected frequency in N trials is N·P(A); the observed count varies around it and gets relatively closer as N grows.',
        'nPr = n!/(n − r)! counts ordered selections, nCr = n!/(r!(n − r)!) counts unordered ones, and nPr = nCr·r!.',
      ],
      id: [
        'Kalikan sepanjang lintasan, jumlahkan antar daun: P(lintasan) adalah hasil kali peluang cabang, dan P(kejadian) adalah jumlah daun-daun dalam kejadian itu.',
        'Kejadian saling bebas memenuhi P(B | A) = P(B) dan P(A ∩ B) = P(A)·P(B); pengambilan tanpa pengembalian membuat tahapannya tidak bebas.',
        'Kejadian saling lepas tidak berbagi hasil, sehingga P(A ∪ B) = P(A) + P(B); jika tidak, kurangi irisannya: P(A ∪ B) = P(A) + P(B) − P(A ∩ B).',
        'Peluang bersyarat P(A | B) = P(A ∩ B)/P(B) membatasi perhatian pada hasil-hasil ketika B terjadi.',
        'Frekuensi harapan dalam N percobaan adalah N·P(A); frekuensi pengamatan bervariasi di sekitarnya dan secara relatif makin dekat ketika N bertambah.',
        'nPr = n!/(n − r)! mencacah pilihan berurutan, nCr = n!/(r!(n − r)!) mencacah pilihan tak berurutan, dan nPr = nCr·r!.',
      ],
    },
    vocabulary: {
      en: [
        ['Sample space', 'The set of all possible outcomes of an experiment; the leaves of a complete tree diagram.'],
        ['Compound event', 'An event made of two or more stages, such as "red then blue" or "at least one head in two flips".'],
        ['Independent events', 'Events where the occurrence of one does not change the probability of the other: P(A ∩ B) = P(A)·P(B).'],
        ['Mutually exclusive events', 'Events that cannot both occur; they have no outcome in common, so P(A ∩ B) = 0.'],
        ['Conditional probability', 'P(A | B), the probability of A given that B has occurred, equal to P(A ∩ B)/P(B).'],
        ['Permutation', 'An ordered arrangement of r objects chosen from n; there are nPr = n!/(n − r)! of them.'],
        ['Combination', 'An unordered selection of r objects from n; there are nCr = n!/(r!(n − r)!) of them.'],
      ],
      id: [
        ['Ruang sampel', 'Himpunan semua hasil yang mungkin dari suatu percobaan; daun-daun dari diagram pohon yang lengkap.'],
        ['Kejadian majemuk', 'Kejadian yang terdiri dari dua tahap atau lebih, seperti "merah lalu biru" atau "paling sedikit satu gambar dalam dua lemparan".'],
        ['Kejadian saling bebas', 'Kejadian yang terjadinya satu tidak mengubah peluang yang lain: P(A ∩ B) = P(A)·P(B).'],
        ['Kejadian saling lepas', 'Kejadian yang tidak dapat terjadi bersamaan; tidak memiliki hasil bersama, sehingga P(A ∩ B) = 0.'],
        ['Peluang bersyarat', 'P(A | B), peluang A dengan syarat B telah terjadi, sama dengan P(A ∩ B)/P(B).'],
        ['Permutasi', 'Susunan berurutan r objek yang dipilih dari n; banyaknya nPr = n!/(n − r)!.'],
        ['Kombinasi', 'Pilihan tak berurutan r objek dari n; banyaknya nCr = n!/(r!(n − r)!).'],
      ],
    },
    misconceptions: {
      en: [
        ['Independent and mutually exclusive mean the same thing.', 'They are almost opposites. Mutually exclusive events have P(A ∩ B) = 0, so if both have positive probability they cannot be independent, because independence needs P(A ∩ B) = P(A)·P(B) > 0.'],
        ['After drawing a red ball, the next ball is "due" to be blue.', 'With replacement the probabilities do not change at all. Without replacement they do change, but only because the contents of the bag changed, not because of luck balancing out.'],
        ['P(A | B) and P(B | A) are the same.', 'In general they differ: P(A | B) = P(A ∩ B)/P(B) while P(B | A) = P(A ∩ B)/P(A). With 3 red and 2 blue without replacement, try A = "both red" and B = "first red": P(A | B) = 1/2 but P(B | A) = 1.'],
        ['The probability of "at least one head" in two flips is 1/2 + 1/2 = 1.', 'Adding only works for mutually exclusive events. "First is a head" and "second is a head" overlap (both heads), so P = 1/2 + 1/2 − 1/4 = 3/4, which is also 1 − P(no heads).'],
        ['nCr is bigger than nPr because combinations are "more general".', 'nCr is never bigger: every combination gives r! different permutations, so nPr = nCr·r! ≥ nCr. For n = 5, r = 3: 60 permutations but 10 combinations.'],
      ],
      id: [
        ['Saling bebas dan saling lepas artinya sama.', 'Keduanya hampir berlawanan. Kejadian saling lepas memiliki P(A ∩ B) = 0, sehingga jika keduanya berpeluang positif mereka tidak mungkin saling bebas, karena kebebasan memerlukan P(A ∩ B) = P(A)·P(B) > 0.'],
        ['Setelah mengambil bola merah, bola berikutnya "pasti" biru.', 'Dengan pengembalian peluangnya sama sekali tidak berubah. Tanpa pengembalian peluang memang berubah, tetapi hanya karena isi kantong berubah, bukan karena keberuntungan menyeimbangkan diri.'],
        ['P(A | B) dan P(B | A) sama.', 'Umumnya berbeda: P(A | B) = P(A ∩ B)/P(B) sedangkan P(B | A) = P(A ∩ B)/P(A). Coba A = "keduanya merah" dan B = "pertama merah" untuk melihat 1/2 versus 1.'],
        ['Peluang "paling sedikit satu gambar" dalam dua lemparan adalah 1/2 + 1/2 = 1.', 'Penjumlahan hanya berlaku untuk kejadian saling lepas. "Pertama gambar" dan "kedua gambar" beririsan (keduanya gambar), sehingga P = 1/2 + 1/2 − 1/4 = 3/4, yang juga sama dengan 1 − P(tidak ada gambar).'],
        ['nCr lebih besar daripada nPr karena kombinasi "lebih umum".', 'nCr tidak pernah lebih besar: setiap kombinasi menghasilkan r! permutasi berbeda, sehingga nPr = nCr·r! ≥ nCr. Untuk n = 5, r = 3: 60 permutasi tetapi 10 kombinasi.'],
      ],
    },
    realWorld: {
      en: [
        'Medical screening uses conditional probability: P(disease | positive test) is often far smaller than P(positive test | disease) when the disease is rare.',
        'Quality control samples items without replacement from a batch, so the tree for "two defective in a row" uses dependent branches.',
        'Lottery odds are combinations: choosing 6 numbers from 49 gives 49C6 = 13 983 816 equally likely tickets.',
        'PIN codes and passwords are permutations with repetition; a 4-digit PIN has 10⁴ possibilities, but a PIN with four different digits has only 10P4 = 5040.',
        'Weather forecasts such as "70% chance of rain on both days" assume (often wrongly) that the two days are independent: 0.7 × 0.7 = 0.49.',
      ],
      id: [
        'Pemeriksaan medis memakai peluang bersyarat: P(sakit | tes positif) sering jauh lebih kecil daripada P(tes positif | sakit) jika penyakitnya langka.',
        'Pengendalian mutu mengambil sampel tanpa pengembalian dari satu batch, sehingga diagram pohon untuk "dua cacat berturut-turut" memakai cabang yang tidak bebas.',
        'Peluang lotre adalah kombinasi: memilih 6 angka dari 49 memberi 49C6 = 13 983 816 tiket yang sama mungkinnya.',
        'Kode PIN dan kata sandi adalah permutasi dengan pengulangan; PIN 4 digit punya 10⁴ kemungkinan, tetapi PIN dengan empat digit berbeda hanya 10P4 = 5040.',
        'Ramalan cuaca seperti "70% peluang hujan di kedua hari" mengasumsikan (sering keliru) bahwa kedua hari saling bebas: 0,7 × 0,7 = 0,49.',
      ],
    },
    questions: {
      en: [
        { q: 'A bag has 4 red and 2 blue balls. Two are drawn without replacement. Find P(both red) and P(exactly one red).', a: 'P(RR) = 4/6 × 3/5 = 12/30 = 2/5. P(exactly one red) = P(RB) + P(BR) = 4/6 × 2/5 + 2/6 × 4/5 = 8/30 + 8/30 = 16/30 = 8/15.' },
        { q: 'Two fair dice are rolled. Let A = "first die shows 6" and B = "second die shows 6". Show that A and B are independent but not mutually exclusive.', a: 'P(A) = P(B) = 1/6 and P(A ∩ B) = 1/36 = P(A)·P(B), so they are independent. Since P(A ∩ B) = 1/36 ≠ 0 they can both happen, so they are not mutually exclusive.' },
        { q: 'With 3 red and 2 blue drawn without replacement, the second ball is red. What is the probability the first ball was also red?', a: 'P(first R | second R) = P(RR)/P(second R) = (3/5 × 2/4)/(3/5 × 2/4 + 2/5 × 3/4) = (6/20)/(12/20) = 1/2.' },
        { q: 'How many 3-letter codes with no repeated letter can be made from A, B, C, D, E? How many 3-letter sets? Why do the two answers differ by a factor of 6?', a: '5P3 = 5!/2! = 60 codes and 5C3 = 5!/(3!·2!) = 10 sets. Each set of 3 letters can be arranged in 3! = 6 orders, so 60 = 10 × 6.' },
      ],
      id: [
        { q: 'Sebuah kantong berisi 4 bola merah dan 2 biru. Dua bola diambil tanpa pengembalian. Tentukan P(keduanya merah) dan P(tepat satu merah).', a: 'P(MM) = 4/6 × 3/5 = 12/30 = 2/5. P(tepat satu merah) = P(MB) + P(BM) = 4/6 × 2/5 + 2/6 × 4/5 = 8/30 + 8/30 = 16/30 = 8/15.' },
        { q: 'Dua dadu setimbang dilempar. Misalkan A = "dadu pertama menunjukkan 6" dan B = "dadu kedua menunjukkan 6". Tunjukkan bahwa A dan B saling bebas tetapi tidak saling lepas.', a: 'P(A) = P(B) = 1/6 dan P(A ∩ B) = 1/36 = P(A)·P(B), jadi saling bebas. Karena P(A ∩ B) = 1/36 ≠ 0 keduanya bisa terjadi bersamaan, jadi tidak saling lepas.' },
        { q: 'Dengan 3 merah dan 2 biru diambil tanpa pengembalian, bola kedua ternyata merah. Berapa peluang bola pertama juga merah?', a: 'P(pertama M | kedua M) = P(MM)/P(kedua M) = (3/5 × 2/4)/(3/5 × 2/4 + 2/5 × 3/4) = (6/20)/(12/20) = 1/2.' },
        { q: 'Berapa banyak kode 3 huruf tanpa huruf berulang yang dapat dibuat dari A, B, C, D, E? Berapa banyak himpunan 3 huruf? Mengapa kedua jawaban berbeda dengan faktor 6?', a: '5P3 = 5!/2! = 60 kode dan 5C3 = 5!/(3!·2!) = 10 himpunan. Setiap himpunan 3 huruf dapat disusun dalam 3! = 6 urutan, sehingga 60 = 10 × 6.' },
      ],
    },
  },
};
