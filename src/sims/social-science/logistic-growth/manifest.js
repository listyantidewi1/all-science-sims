export default {
  id: 'logistic-growth',
  subject: 'social-science',
  title: { en: 'Logistic Population Growth', id: 'Pertumbuhan Populasi Logistik' },
  description: {
    en: 'A population grows exponentially when small but levels off as it approaches the carrying capacity K. The logistic equation dN/dt = rN(1 − N/K) generates the classic S-curve. Drag r and K and watch the curve change in real time, with both the exponential approximation and the logistic shown for comparison.',
    id: 'Populasi tumbuh eksponensial saat kecil tetapi mendatar mendekati daya dukung K. Persamaan logistik dN/dt = rN(1 − N/K) menghasilkan kurva-S klasik. Geser r dan K dan amati kurva berubah langsung, dengan perkiraan eksponensial dan logistik ditampilkan untuk perbandingan.',
  },
  details: () => import('./details.js'),
  topics: ['ecology', 'population'],
  grade: [10, 11, 12, 13],
  hasLab: true,
  load: () => import('./sim.js'),
};
