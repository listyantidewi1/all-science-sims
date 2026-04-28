export default {
  id: 'dca',
  subject: 'finance',
  title: { en: 'Dollar-Cost Averaging vs Lump Sum', id: 'Dollar-Cost Averaging vs Lump Sum' },
  description: {
    en: 'You have $12,000 to invest. Drop it all in today, or spread $1,000/month for a year? Run hundreds of simulated stock paths and see which strategy wins more often — and by how much.',
    id: 'Anda punya Rp120jt. Investasikan semuanya hari ini, atau cicil Rp10jt/bulan selama setahun? Jalankan ratusan simulasi pasar dan lihat strategi mana yang lebih sering menang — dan seberapa banyak.',
  },
  objectives: {
    en: [
      'Compare lump-sum vs DCA returns in many random scenarios.',
      'See that DCA wins in flat or declining markets, lump-sum wins in rising ones.',
      'Recognize the math: lump-sum has more time in the market.',
    ],
    id: [
      'Membandingkan return lump-sum vs DCA dalam banyak skenario acak.',
      'Melihat DCA menang di pasar mendatar/turun, lump-sum menang di pasar naik.',
      'Mengenali fakta: lump-sum memiliki lebih banyak waktu di pasar.',
    ],
  },
  tryThis: {
    en: [
      'Positive drift, low vol — does lump sum win most rounds?',
      'Negative drift — does DCA win?',
      'High volatility — does DCA win more often than the means suggest?',
    ],
    id: [
      'Drift positif, vol rendah — apakah lump sum menang di banyak putaran?',
      'Drift negatif — apakah DCA menang?',
      'Volatilitas tinggi — apakah DCA menang lebih sering dari yang diduga?',
    ],
  },
  topics: ['investing', 'strategy'],
  load: () => import('./sim.js'),
};
