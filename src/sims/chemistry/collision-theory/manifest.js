export default {
  id: 'collision-theory',
  subject: 'chemistry',
  title: { en: 'Collision Theory & Reaction Rates', id: 'Teori Tumbukan & Laju Reaksi' },
  description: {
    en: 'Two species of particles bounce around. They only react when they collide above an activation energy. Tune temperature, concentration, and Eₐ — and watch the reaction rate rise or grind to a halt.',
    id: 'Dua jenis partikel memantul. Mereka bereaksi hanya bila bertumbukan di atas energi aktivasi. Atur suhu, konsentrasi, dan Eₐ — lalu amati laju reaksi naik atau berhenti.',
  },
  details: () => import('./details.js'),
  topics: ['kinetics', 'reactions'],
  grade: [10, 11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
