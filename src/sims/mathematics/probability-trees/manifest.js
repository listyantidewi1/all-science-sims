export default {
  id: 'probability-trees',
  subject: 'mathematics',
  title: { en: 'Tree Diagrams, Permutations and Combinations', id: 'Diagram Pohon, Permutasi, dan Kombinasi' },
  description: {
    en: 'Build a two-stage tree diagram for two coin flips, two draws from a bag of red and blue balls (with or without replacement), or two dice. Every branch carries its probability as a fraction, and the leaves show the outcome probabilities multiplying along the path. Pick two events to read P(A), P(B), P(A ∩ B), P(A ∪ B) and the conditional probability P(A|B), highlight when events are independent or mutually exclusive, and run 100 random trials to compare expected and observed counts. A counting panel computes nPr and nCr with the formula and lists the arrangements for small n.',
    id: 'Susun diagram pohon dua tahap untuk dua lemparan koin, dua pengambilan bola dari kantong berisi bola merah dan biru (dengan atau tanpa pengembalian), atau dua dadu. Setiap cabang memuat peluangnya sebagai pecahan, dan daun-daunnya menunjukkan peluang hasil yang diperoleh dengan mengalikan sepanjang lintasan. Pilih dua kejadian untuk membaca P(A), P(B), P(A ∩ B), P(A ∪ B) dan peluang bersyarat P(A|B), tandai kapan kejadian saling bebas atau saling lepas, dan jalankan 100 percobaan acak untuk membandingkan frekuensi harapan dengan hasil pengamatan. Panel pencacahan menghitung nPr dan nCr dengan rumusnya dan mendaftar susunan untuk n kecil.',
  },
  topics: ['probability', 'tree diagram', 'conditional probability', 'independent events', 'mutually exclusive', 'permutations', 'combinations'],
  grade: [12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
