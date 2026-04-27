export default {
  id: 'punnett-square',
  subject: 'biology',
  title: { en: 'Punnett Square', id: 'Diagram Punnett' },
  description: {
    en: 'Cross two parents at one or two gene loci and see the offspring genotype and phenotype ratios fill in automatically.',
    id: 'Silangkan dua induk pada satu atau dua lokus gen dan lihat rasio genotipe dan fenotipe keturunan terisi otomatis.',
  },
  objectives: {
    en: [
      'Construct a Punnett square from parent genotypes.',
      'Read genotype and phenotype ratios from the square.',
      'Predict outcomes of monohybrid and dihybrid crosses.',
    ],
    id: [
      'Menyusun diagram Punnett dari genotipe induk.',
      'Membaca rasio genotipe dan fenotipe dari diagram.',
      'Memprediksi hasil persilangan monohibrid dan dihibrid.',
    ],
  },
  tryThis: {
    en: [
      'Cross Aa × Aa — verify the classic 3:1 phenotype ratio.',
      'Switch to dihybrid (AaBb × AaBb) — find the 9:3:3:1 ratio.',
      'What cross guarantees only homozygous recessive offspring?',
    ],
    id: [
      'Silangkan Aa × Aa — verifikasi rasio fenotipe klasik 3:1.',
      'Beralih ke dihibrid (AaBb × AaBb) — temukan rasio 9:3:3:1.',
      'Persilangan mana yang menjamin keturunan homozigot resesif saja?',
    ],
  },
  topics: ['genetics', 'mendelian'],
  grade: [10, 11, 12],
  load: () => import('./sim.js'),
};
