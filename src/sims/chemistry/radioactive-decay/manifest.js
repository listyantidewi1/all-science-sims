export default {
  id: 'radioactive-decay',
  subject: 'chemistry',
  title: { en: 'Radioactive Decay & Half-Life', id: 'Peluruhan Radioaktif & Waktu Paruh' },
  description: {
    en: 'Start with a fresh sample of unstable atoms. Each frame, every atom has the same tiny chance of decaying. Watch the population halve every half-life — exponential decay built atom by atom.',
    id: 'Mulai dengan sampel atom tidak stabil yang segar. Setiap frame, setiap atom memiliki peluang kecil yang sama untuk meluruh. Amati populasi berkurang separuh setiap waktu paruh — peluruhan eksponensial yang dibangun atom demi atom.',
  },
  details: () => import('./details.js'),
  topics: ['nuclear', 'kinetics'],
  grade: [10, 11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
