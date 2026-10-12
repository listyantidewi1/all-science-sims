export default {
  id: 'efficient-frontier',
  subject: 'finance',
  title: { en: 'Portfolio Efficient Frontier', id: 'Frontier Efisien Portofolio' },
  description: {
    en: 'Mix two assets in any proportion. Plot return vs risk for every weight, and the curve forms the efficient frontier. Negative correlation bows it inward — the magic of diversification.',
    id: 'Campur dua aset dalam proporsi mana saja. Plot return vs risiko untuk tiap bobot, dan kurva membentuk frontier efisien. Korelasi negatif membuatnya melengkung ke dalam — keajaiban diversifikasi.',
  },
  details: () => import('./details.js'),
  topics: ['portfolio', 'risk'],
  grade: [12, 13],
  load: () => import('./sim.js'),
};
