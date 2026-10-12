export default {
  id: 'sharpe',
  subject: 'finance',
  title: { en: 'Sharpe Ratio', id: 'Rasio Sharpe' },
  description: {
    en: "Sharpe = (return − risk-free) / volatility. A high-return fund that's wildly volatile can have a worse Sharpe than a steady performer with mediocre return. Compare three sample funds and see how the ranking changes when you adjust the risk-free rate.",
    id: 'Sharpe = (return − bebas-risiko) / volatilitas. Reksadana berreturn tinggi yang sangat volatil bisa punya Sharpe lebih buruk dari yang stabil dengan return biasa-biasa saja. Bandingkan tiga reksadana sampel dan lihat peringkat berubah saat Anda mengubah suku bebas-risiko.',
  },
  details: () => import('./details.js'),
  topics: ['risk-adjusted', 'portfolio'],
  grade: [12, 13],
  load: () => import('./sim.js'),
};
