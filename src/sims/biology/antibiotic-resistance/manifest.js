export default {
  id: 'antibiotic-resistance',
  subject: 'biology',
  title: { en: 'Antibiotic Resistance Evolution', id: 'Evolusi Resistensi Antibiotik' },
  description: {
    en: 'Start with a population of bacteria. Each carries a tiny mutation rate. When you "treat" with an antibiotic, susceptible bacteria die — but rare resistant mutants survive and bloom. Watch resistance spread and the antibiotic become useless. Pause treatment too early and the resistant strain takes over.',
    id: 'Mulai dengan populasi bakteri. Tiap membawa laju mutasi kecil. Saat Anda "obati" dengan antibiotik, bakteri rentan mati — tetapi mutan resisten yang jarang bertahan dan berkembang biak. Amati resistensi menyebar dan antibiotik menjadi tak berguna. Berhenti pengobatan terlalu cepat dan strain resisten merebut populasi.',
  },
  objectives: {
    en: [
      'See selection pressure: antibiotic kills susceptibles, leaving resistants.',
      'Understand why incomplete treatment courses accelerate resistance.',
      'Connect mutation rate × population × selection to evolutionary timescales.',
    ],
    id: [
      'Melihat tekanan seleksi: antibiotik membunuh yang rentan, meninggalkan yang resisten.',
      'Memahami mengapa pengobatan tak tuntas mempercepat resistensi.',
      'Menghubungkan laju mutasi × populasi × seleksi dengan skala waktu evolusi.',
    ],
  },
  tryThis: {
    en: [
      'No antibiotic — small resistant fraction stays small (mutation/drift balance).',
      'Apply antibiotic — susceptibles crash, resistants explode.',
      'Pulsed treatment — resistance evolves faster.',
    ],
    id: [
      'Tanpa antibiotik — fraksi resisten kecil tetap kecil (keseimbangan mutasi/drift).',
      'Berikan antibiotik — yang rentan runtuh, yang resisten meledak.',
      'Pengobatan pulsa — resistensi berevolusi lebih cepat.',
    ],
  },
  topics: ['evolution', 'public-health'],
  load: () => import('./sim.js'),
};
