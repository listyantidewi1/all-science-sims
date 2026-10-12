export default {
  id: 'collisions-1d',
  subject: 'physics',
  title: { en: '1D Collisions', id: 'Tumbukan 1D' },
  description: {
    en: 'Two balls on a frictionless track. Set their masses and initial velocities, pick elastic, inelastic, or "perfectly sticky", and watch momentum conserve while kinetic energy may or may not.',
    id: 'Dua bola di lintasan tanpa gesekan. Atur massa dan kecepatan awal, pilih elastis, tak elastis, atau "lengket sempurna", lalu amati momentum kekal sementara energi kinetik mungkin tidak.',
  },
  details: () => import('./details.js'),
  topics: ['mechanics', 'momentum'],
  grade: [10, 11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
