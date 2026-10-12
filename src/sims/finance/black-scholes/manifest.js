export default {
  id: 'black-scholes',
  subject: 'finance',
  title: { en: 'Black-Scholes Option Pricing', id: 'Penetapan Harga Opsi Black-Scholes' },
  description: {
    en: 'The 1973 formula that won the Nobel Prize. Slide stock price, strike, time, volatility, and rate; call and put prices update instantly, plus payoff diagrams at expiry.',
    id: 'Rumus 1973 yang memenangkan Hadiah Nobel. Atur harga saham, strike, waktu, volatilitas, dan suku bunga; harga call dan put diperbarui langsung, plus diagram payoff saat jatuh tempo.',
  },
  details: () => import('./details.js'),
  topics: ['options', 'derivatives'],
  grade: [13],
  hasLab: true,
  load: () => import('./sim.js'),
};
