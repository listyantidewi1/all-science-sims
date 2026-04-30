export default {
  id: 'hardy-weinberg',
  subject: 'biology',
  title: { en: 'Hardy-Weinberg Equilibrium', id: 'Kesetimbangan Hardy-Weinberg' },
  description: {
    en: 'A finite population of randomly-mating diploid organisms. Set the starting allele frequency p and watch genotype proportions stay near (p², 2pq, q²) — unless drift, selection, or migration kicks in.',
    id: 'Populasi terbatas organisme diploid yang kawin acak. Atur frekuensi alel awal p lalu amati proporsi genotipe tetap mendekati (p², 2pq, q²) — kecuali ada hanyut, seleksi, atau migrasi.',
  },
  objectives: {
    en: [
      'Predict genotype frequencies from p² + 2pq + q² = 1.',
      'Distinguish equilibrium from drift in small populations.',
      'See how selection alters allele frequency over generations.',
    ],
    id: [
      'Memprediksi frekuensi genotipe dari p² + 2pq + q² = 1.',
      'Membedakan kesetimbangan dari hanyut pada populasi kecil.',
      'Melihat seleksi mengubah frekuensi alel antar generasi.',
    ],
  },
  tryThis: {
    en: [
      'Set N = 50, run a few times — does p drift?',
      'Lower aa fitness to 0.5 — does p climb?',
      'Run with N = 1000 and zero selection — proportions stable?',
    ],
    id: [
      'Atur N = 50, jalankan beberapa kali — apakah p berfluktuasi?',
      'Turunkan kebugaran aa ke 0,5 — apakah p naik?',
      'Jalankan dengan N = 1000 dan tanpa seleksi — proporsi stabil?',
    ],
  },
  topics: ['genetics', 'evolution'],
  hasLab: true,
  load: () => import('./sim.js'),
};
