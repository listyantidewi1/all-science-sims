export default {
  id: 'ice-albedo',
  subject: 'climate',
  title: { en: 'Ice-Albedo Feedback', id: 'Umpan Balik Es-Albedo' },
  description: {
    en: 'A simple energy-balance climate model with ice. Ice reflects sunlight, so cold worlds stay cold; if you nudge the temperature past a threshold, the feedback flips and you can lock into a much warmer state. The plot shows the bistability — two stable equilibria at the same solar input.',
    id: 'Model keseimbangan-energi sederhana dengan es. Es memantulkan cahaya matahari, jadi dunia dingin tetap dingin; jika suhu melewati ambang, umpan balik berbalik dan dunia bisa terkunci dalam keadaan jauh lebih hangat. Grafik menunjukkan bistabilitas — dua keseimbangan stabil di input matahari yang sama.',
  },
  details: () => import('./details.js'),
  topics: ['climate', 'feedback'],
  grade: [10, 11, 12, 13],
  hasLab: true,
  load: () => import('./sim.js'),
};
