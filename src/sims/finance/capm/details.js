// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
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
  },  tryThis: {
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
  },};
