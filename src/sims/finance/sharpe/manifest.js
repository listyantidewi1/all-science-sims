export default {
  id: 'sharpe',
  subject: 'finance',
  title: { en: 'Sharpe Ratio', id: 'Rasio Sharpe' },
  description: {
    en: "Sharpe = (return − risk-free) / volatility. A high-return fund that's wildly volatile can have a worse Sharpe than a steady performer with mediocre return. Compare three sample funds and see how the ranking changes when you adjust the risk-free rate.",
    id: 'Sharpe = (return − bebas-risiko) / volatilitas. Reksadana berreturn tinggi yang sangat volatil bisa punya Sharpe lebih buruk dari yang stabil dengan return biasa-biasa saja. Bandingkan tiga reksadana sampel dan lihat peringkat berubah saat Anda mengubah suku bebas-risiko.',
  },
  objectives: {
    en: [
      'Apply Sharpe = (μ − rᶠ) / σ.',
      'See risk adjustment change which fund "wins".',
      "Recognize that high return alone isn't a fair comparison.",
    ],
    id: [
      'Menerapkan Sharpe = (µ − rᶠ) / σ.',
      'Melihat penyesuaian risiko mengubah fund mana yang "menang".',
      'Mengenali bahwa return tinggi saja bukan perbandingan adil.',
    ],
  },
  tryThis: {
    en: [
      'Set rᶠ to 0 — does the high-vol fund still win on Sharpe?',
      'Crank rᶠ to 5% — does anyone have negative Sharpe?',
      'Tweak fund volatilities — find the rank inversion.',
    ],
    id: [
      'Atur rᶠ ke 0 — apakah fund volatil tinggi tetap menang Sharpe?',
      'Naikkan rᶠ ke 5% — adakah yang Sharpe negatif?',
      'Atur volatilitas tiap fund — temukan inversi peringkat.',
    ],
  },
  topics: ['risk-adjusted', 'portfolio'],
  load: () => import('./sim.js'),
};
