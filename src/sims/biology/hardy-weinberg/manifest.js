export default {
  id: 'hardy-weinberg',
  subject: 'biology',
  title: { en: 'Hardy-Weinberg Equilibrium', id: 'Kesetimbangan Hardy-Weinberg' },
  description: {
    en: 'A finite population of randomly-mating diploid organisms. Set the starting allele frequency p and watch genotype proportions stay near (p², 2pq, q²) — unless drift, selection, or migration kicks in.',
    id: 'Populasi terbatas organisme diploid yang kawin acak. Atur frekuensi alel awal p lalu amati proporsi genotipe tetap mendekati (p², 2pq, q²) — kecuali ada hanyut, seleksi, atau migrasi.',
  },
  details: () => import('./details.js'),
  topics: ['genetics', 'evolution'],
  grade: [12, 13],
  hasLab: true,
  load: () => import('./sim.js'),
};
