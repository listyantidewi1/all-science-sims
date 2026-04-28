export default {
  id: 'stock-walk',
  subject: 'finance',
  title: { en: 'Stock Random Walk (GBM)', id: 'Jalan Acak Saham (GBM)' },
  description: {
    en: 'Geometric Brownian Motion — the textbook model of a stock price. Run dozens of simulated paths at once with adjustable drift μ and volatility σ, and watch the fan of possible futures spread.',
    id: 'Gerak Brown Geometrik — model standar harga saham. Jalankan puluhan jalur simulasi sekaligus dengan drift μ dan volatilitas σ yang dapat diatur, lalu amati kipas masa depan menyebar.',
  },
  objectives: {
    en: [
      'Apply S(t+dt) = S(t) · exp((μ−σ²/2)dt + σ√dt · Z).',
      'See how volatility widens the cone of possible outcomes.',
      'Recognize that ANY single path tells you very little.',
    ],
    id: [
      'Menerapkan S(t+dt) = S(t) · exp((μ−σ²/2)dt + σ√dt · Z).',
      'Melihat volatilitas memperlebar kerucut hasil yang mungkin.',
      'Mengenali bahwa SATU jalur tidak menceritakan banyak hal.',
    ],
  },
  tryThis: {
    en: [
      'σ = 0 — what happens to the paths?',
      'High σ — note how some paths nearly halve and others double.',
      'Long horizon — does the fan widen as √T?',
    ],
    id: [
      'σ = 0 — apa yang terjadi pada jalurnya?',
      'σ tinggi — perhatikan beberapa jalur hampir setengah dan yang lain dua kali lipat.',
      'Horizon panjang — apakah kipas melebar seperti √T?',
    ],
  },
  topics: ['stochastic', 'markets'],
  load: () => import('./sim.js'),
};
