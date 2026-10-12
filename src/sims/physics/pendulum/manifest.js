export default {
  id: 'pendulum',
  subject: 'physics',
  title: { en: 'Simple Pendulum', id: 'Bandul Sederhana' },
  description: {
    en: 'Swing a pendulum and explore how length, gravity, and initial angle change its period. Compare the small-angle approximation against the full nonlinear motion.',
    id: 'Ayunkan bandul dan pelajari bagaimana panjang, gravitasi, dan sudut awal mengubah periodenya. Bandingkan pendekatan sudut kecil dengan gerak penuh tak linear.',
  },
  details: () => import('./details.js'),
  topics: ['oscillation', 'gravity'],
  grade: [10, 11],
  hasLab: true,
  load: () => import('./sim.js'),
};
