export default {
  id: 'monte-carlo-pi',
  subject: 'data-science',
  title: { en: 'Monte Carlo: Estimate π', id: 'Monte Carlo: Memperkirakan π' },
  description: {
    en: 'Throw darts at random into a square containing a quarter circle. The fraction landing inside the circle, times 4, converges on π. The simplest possible Monte Carlo method, watchable.',
    id: 'Lemparkan anak panah secara acak ke dalam persegi yang berisi seperempat lingkaran. Fraksi yang jatuh di dalam lingkaran, dikalikan 4, mendekati π. Metode Monte Carlo paling sederhana, terlihat langsung.',
  },
  details: () => import('./details.js'),
  topics: ['probability', 'sampling'],
  hasLab: true,
  load: () => import('./sim.js'),
};
