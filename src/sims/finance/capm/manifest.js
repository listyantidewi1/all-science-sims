export default {
  id: 'capm',
  subject: 'finance',
  title: { en: 'CAPM & Beta', id: 'CAPM & Beta' },
  description: {
    en: "Drag a stock's monthly returns against market returns and watch beta — the slope of the regression — emerge. The Capital Asset Pricing Model says expected return is rᶠ + β·(rᴹ − rᶠ): higher beta, higher expected return.",
    id: 'Seret return bulanan saham terhadap return pasar dan amati beta — kemiringan regresi — muncul. CAPM mengatakan return harapan = rᶠ + β·(rᴹ − rᶠ): beta tinggi, return harapan tinggi.',
  },
  details: () => import('./details.js'),
  topics: ['portfolio', 'risk-pricing'],
  hasLab: true,
  load: () => import('./sim.js'),
};
