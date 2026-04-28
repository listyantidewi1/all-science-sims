export default {
  id: 'capm',
  subject: 'finance',
  title: { en: 'CAPM & Beta', id: 'CAPM & Beta' },
  description: {
    en: "Drag a stock's monthly returns against market returns and watch beta — the slope of the regression — emerge. The Capital Asset Pricing Model says expected return is rᶠ + β·(rᴹ − rᶠ): higher beta, higher expected return.",
    id: 'Seret return bulanan saham terhadap return pasar dan amati beta — kemiringan regresi — muncul. CAPM mengatakan return harapan = rᶠ + β·(rᴹ − rᶠ): beta tinggi, return harapan tinggi.',
  },
  objectives: {
    en: [
      "Compute beta as cov(r_i, r_m) / var(r_m).",
      'Apply CAPM: E[r] = rᶠ + β · risk-premium.',
      "Distinguish defensive (β<1), neutral (β=1), aggressive (β>1) stocks.",
    ],
    id: [
      'Menghitung beta = cov(r_i, r_m) / var(r_m).',
      'Menerapkan CAPM: E[r] = rᶠ + β · premi-risiko.',
      'Membedakan saham defensif (β<1), netral (β=1), agresif (β>1).',
    ],
  },
  tryThis: {
    en: [
      'Set true β = 1.5 — does the regression find it back?',
      'Add lots of idiosyncratic noise — does β estimate get noisier?',
      'CAPM expected return for β = 0.5 with 8% market premium.',
    ],
    id: [
      'Atur β sejati = 1,5 — apakah regresi menemukannya kembali?',
      'Tambahkan banyak derau idiosinkratik — apakah estimasi β jadi berisik?',
      'Hitung return CAPM untuk β = 0,5 dengan premi pasar 8%.',
    ],
  },
  topics: ['portfolio', 'risk-pricing'],
  load: () => import('./sim.js'),
};
