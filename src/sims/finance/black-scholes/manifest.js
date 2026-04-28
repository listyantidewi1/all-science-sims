export default {
  id: 'black-scholes',
  subject: 'finance',
  title: { en: 'Black-Scholes Option Pricing', id: 'Penetapan Harga Opsi Black-Scholes' },
  description: {
    en: 'The 1973 formula that won the Nobel Prize. Slide stock price, strike, time, volatility, and rate; call and put prices update instantly, plus payoff diagrams at expiry.',
    id: 'Rumus 1973 yang memenangkan Hadiah Nobel. Atur harga saham, strike, waktu, volatilitas, dan suku bunga; harga call dan put diperbarui langsung, plus diagram payoff saat jatuh tempo.',
  },
  objectives: {
    en: [
      'Apply the Black-Scholes formula for European calls and puts.',
      'See how each input moves the price (the "Greeks").',
      "Distinguish payoff at expiry from time-value premium.",
    ],
    id: [
      'Menerapkan rumus Black-Scholes untuk call dan put Eropa.',
      'Melihat efek tiap input pada harga ("Greeks").',
      'Membedakan payoff saat jatuh tempo dari nilai waktu.',
    ],
  },
  tryThis: {
    en: [
      'σ = 50% — does the call price soar?',
      'T → 0 — does the call collapse to max(S−K, 0)?',
      'S = K — at-the-money. What\'s the call worth?',
    ],
    id: [
      'σ = 50% — apakah harga call melonjak?',
      'T → 0 — apakah call runtuh ke max(S−K, 0)?',
      'S = K — at-the-money. Berapa nilai call-nya?',
    ],
  },
  topics: ['options', 'derivatives'],
  load: () => import('./sim.js'),
};
