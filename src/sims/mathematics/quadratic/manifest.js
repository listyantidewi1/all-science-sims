export default {
  id: 'quadratic',
  subject: 'mathematics',
  title: { en: 'Quadratic Formula Visualizer', id: 'Visualisator Rumus Kuadrat' },
  description: {
    en: 'Drag the three coefficients of f(x) = ax² + bx + c and watch the parabola morph in real time. Roots, vertex, axis of symmetry, and discriminant Δ = b² − 4ac all update live. See where the parabola crosses zero — that is exactly what the quadratic formula computes.',
    id: 'Geser tiga koefisien f(x) = ax² + bx + c dan amati parabola berubah langsung. Akar, titik puncak, sumbu simetri, dan diskriminan Δ = b² − 4ac terbarui langsung. Lihat di mana parabola memotong nol — itulah yang dihitung rumus kuadrat.',
  },
  objectives: {
    en: [
      'Apply x = (−b ± √Δ) / (2a) where Δ = b² − 4ac.',
      'Understand the three discriminant cases: Δ > 0 (two roots), Δ = 0 (one), Δ < 0 (none real).',
      'Find the vertex at (−b/(2a), c − b²/(4a)).',
    ],
    id: [
      'Menerapkan x = (−b ± √Δ) / (2a) dengan Δ = b² − 4ac.',
      'Memahami tiga kasus diskriminan: Δ > 0 (dua akar), Δ = 0 (satu), Δ < 0 (tak ada nyata).',
      'Menemukan puncak di (−b/(2a), c − b²/(4a)).',
    ],
  },
  tryThis: {
    en: [
      'a = 1, b = −5, c = 6 — roots at x = 2 and 3.',
      'a = 1, b = 0, c = 1 — no real roots; parabola sits above the x-axis.',
      'a = 1, b = 4, c = 4 — discriminant zero; one root at x = −2.',
    ],
    id: [
      'a = 1, b = −5, c = 6 — akar di x = 2 dan 3.',
      'a = 1, b = 0, c = 1 — tak ada akar nyata; parabola di atas sumbu-x.',
      'a = 1, b = 4, c = 4 — diskriminan nol; satu akar di x = −2.',
    ],
  },
  topics: ['algebra'],
  load: () => import('./sim.js'),
};
