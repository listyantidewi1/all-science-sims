export default {
  id: 'population-dynamics',
  subject: 'social-science',
  title: { en: 'Population Dynamics', id: 'Dinamika Populasi' },
  description: {
    en: 'Simulate the Lotka–Volterra predator-prey system. Tune birth, death, and predation rates and watch populations oscillate, crash, or stabilize over time.',
    id: 'Simulasikan sistem mangsa-pemangsa Lotka–Volterra. Atur laju kelahiran, kematian, dan pemangsaan, lalu amati populasi berosilasi, runtuh, atau stabil sepanjang waktu.',
  },
  details: () => import('./details.js'),
  topics: ['ecology', 'dynamics'],
  grade: [11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
