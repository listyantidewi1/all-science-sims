export default {
  id: 'population-dynamics',
  subject: 'social-science',
  title: { en: 'Population Dynamics', id: 'Dinamika Populasi' },
  description: {
    en: 'Simulate the Lotka–Volterra predator-prey system. Tune birth, death, and predation rates and watch populations oscillate, crash, or stabilize over time.',
    id: 'Simulasikan sistem mangsa-pemangsa Lotka–Volterra. Atur laju kelahiran, kematian, dan pemangsaan, lalu amati populasi berosilasi, runtuh, atau stabil sepanjang waktu.',
  },
  objectives: {
    en: [
      'Read coupled ODE behavior from a phase plot.',
      'Predict the effect of each parameter on cycle period and amplitude.',
      'Recognize stable, oscillating, and collapsing regimes.',
    ],
    id: [
      'Membaca perilaku ODE berpasangan dari grafik fase.',
      'Memprediksi pengaruh tiap parameter terhadap periode dan amplitudo siklus.',
      'Mengenali rezim stabil, berosilasi, dan runtuh.',
    ],
  },
  tryThis: {
    en: [
      'Set predation rate to zero — what happens to prey?',
      'Crank predation up — does the system still oscillate?',
      'Find a parameter set where both populations stabilize.',
    ],
    id: [
      'Atur laju pemangsaan ke nol — apa yang terjadi pada mangsa?',
      'Naikkan laju pemangsaan tinggi — apakah sistem masih berosilasi?',
      'Cari kombinasi parameter di mana kedua populasi stabil.',
    ],
  },
  topics: ['ecology', 'dynamics'],
  grade: [11, 12],
  load: () => import('./sim.js'),
};
