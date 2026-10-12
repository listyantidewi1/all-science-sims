export default {
  id: 'punnett-square',
  subject: 'biology',
  title: { en: 'Punnett Square', id: 'Diagram Punnett' },
  description: {
    en: 'Cross two parents at one or two gene loci and see the offspring genotype and phenotype ratios fill in automatically.',
    id: 'Silangkan dua induk pada satu atau dua lokus gen dan lihat rasio genotipe dan fenotipe keturunan terisi otomatis.',
  },
  details: () => import('./details.js'),
  topics: ['genetics', 'mendelian'],
  grade: [10, 11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
