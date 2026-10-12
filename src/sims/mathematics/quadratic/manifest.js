export default {
  id: 'quadratic',
  subject: 'mathematics',
  title: { en: 'Quadratic Formula Visualizer', id: 'Visualisator Rumus Kuadrat' },
  description: {
    en: 'Drag the three coefficients of f(x) = ax² + bx + c and watch the parabola morph in real time. Roots, vertex, axis of symmetry, and discriminant Δ = b² − 4ac all update live. See where the parabola crosses zero — that is exactly what the quadratic formula computes.',
    id: 'Geser tiga koefisien f(x) = ax² + bx + c dan amati parabola berubah langsung. Akar, titik puncak, sumbu simetri, dan diskriminan Δ = b² − 4ac terbarui langsung. Lihat di mana parabola memotong nol — itulah yang dihitung rumus kuadrat.',
  },
  details: () => import('./details.js'),
  topics: ['algebra'],
  grade: [9, 10, 11],
  load: () => import('./sim.js'),
};
