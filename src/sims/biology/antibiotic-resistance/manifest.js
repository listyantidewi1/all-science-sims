export default {
  id: 'antibiotic-resistance',
  subject: 'biology',
  title: { en: 'Antibiotic Resistance Evolution', id: 'Evolusi Resistensi Antibiotik' },
  description: {
    en: 'Start with a population of bacteria. Each carries a tiny mutation rate. When you "treat" with an antibiotic, susceptible bacteria die — but rare resistant mutants survive and bloom. Watch resistance spread and the antibiotic become useless. Pause treatment too early and the resistant strain takes over.',
    id: 'Mulai dengan populasi bakteri. Tiap membawa laju mutasi kecil. Saat Anda "obati" dengan antibiotik, bakteri rentan mati — tetapi mutan resisten yang jarang bertahan dan berkembang biak. Amati resistensi menyebar dan antibiotik menjadi tak berguna. Berhenti pengobatan terlalu cepat dan strain resisten merebut populasi.',
  },
  details: () => import('./details.js'),
  topics: ['evolution', 'public-health'],
  grade: [9, 10, 11, 12],
  load: () => import('./sim.js'),
};
