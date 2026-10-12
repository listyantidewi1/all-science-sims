export default {
  id: 'stock-walk',
  subject: 'finance',
  title: { en: 'Stock Random Walk (GBM)', id: 'Jalan Acak Saham (GBM)' },
  description: {
    en: 'Geometric Brownian Motion — the textbook model of a stock price. Run dozens of simulated paths at once with adjustable drift μ and volatility σ, and watch the fan of possible futures spread.',
    id: 'Gerak Brown Geometrik — model standar harga saham. Jalankan puluhan jalur simulasi sekaligus dengan drift μ dan volatilitas σ yang dapat diatur, lalu amati kipas masa depan menyebar.',
  },
  details: () => import('./details.js'),
  topics: ['stochastic', 'markets'],
  grade: [12, 13],
  hasLab: true,
  load: () => import('./sim.js'),
};
