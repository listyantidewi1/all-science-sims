export default {
  id: 'gas-laws',
  subject: 'chemistry',
  title: { en: 'Ideal Gas Law', id: 'Hukum Gas Ideal' },
  description: {
    en: 'Particles bounce in a sealed box. Tune temperature, volume, and particle count and watch pressure (momentum delivered to the walls each second) respond exactly as PV = nRT predicts.',
    id: 'Partikel memantul dalam kotak tertutup. Atur suhu, volume, dan jumlah partikel lalu amati tekanan (momentum yang diberikan ke dinding tiap detik) merespons persis seperti diprediksi PV = nRT.',
  },
  details: () => import('./details.js'),
  topics: ['gases', 'thermodynamics'],
  grade: [10, 11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
