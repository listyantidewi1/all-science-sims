// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
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
  },  tryThis: {
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
  },};
