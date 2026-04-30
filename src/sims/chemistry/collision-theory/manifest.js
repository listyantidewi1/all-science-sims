export default {
  id: 'collision-theory',
  subject: 'chemistry',
  title: { en: 'Collision Theory & Reaction Rates', id: 'Teori Tumbukan & Laju Reaksi' },
  description: {
    en: 'Two species of particles bounce around. They only react when they collide above an activation energy. Tune temperature, concentration, and Eₐ — and watch the reaction rate rise or grind to a halt.',
    id: 'Dua jenis partikel memantul. Mereka bereaksi hanya bila bertumbukan di atas energi aktivasi. Atur suhu, konsentrasi, dan Eₐ — lalu amati laju reaksi naik atau berhenti.',
  },
  objectives: {
    en: [
      'Connect kinetic energy distribution to fraction able to react.',
      'Apply rate ∝ [A][B] · exp(−Eₐ/RT).',
      'Predict effects of catalysts (lower Eₐ).',
    ],
    id: [
      'Mengaitkan distribusi energi kinetik dengan fraksi yang mampu bereaksi.',
      'Menerapkan laju ∝ [A][B] · exp(−Eₐ/RT).',
      'Memprediksi efek katalis (menurunkan Eₐ).',
    ],
  },
  tryThis: {
    en: [
      'Double temperature — does the rate jump much more than 2x?',
      'Halve concentration — does rate roughly halve?',
      'Click "catalyst" to lower Eₐ — see rate spike.',
    ],
    id: [
      'Gandakan suhu — apakah laju melonjak jauh lebih dari 2x?',
      'Setengahkan konsentrasi — apakah laju kira-kira jadi setengah?',
      'Klik "katalis" untuk menurunkan Eₐ — amati laju melonjak.',
    ],
  },
  topics: ['kinetics', 'reactions'],
  hasLab: true,
  load: () => import('./sim.js'),
};
