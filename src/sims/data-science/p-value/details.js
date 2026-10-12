// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Read p-value as the area in the tail beyond the observed statistic.',
      'Distinguish one-tailed vs two-tailed.',
      'See that "p < 0.05" means observed is in the α=0.05 rejection region.',
    ],
    id: [
      'Membaca p-value sebagai luas ekor di luar statistik teramati.',
      'Membedakan satu-arah vs dua-arah.',
      'Melihat bahwa "p < 0,05" berarti teramati di daerah penolakan α=0,05.',
    ],
  },  tryThis: {
    en: [
      'z = 1.65 (one-tailed) — p ≈ 0.05.',
      'z = 1.96 (two-tailed) — p ≈ 0.05.',
      'z = 3 — p ≈ 0.001 (very strong evidence).',
    ],
    id: [
      'z = 1,65 (satu-arah) — p ≈ 0,05.',
      'z = 1,96 (dua-arah) — p ≈ 0,05.',
      'z = 3 — p ≈ 0,001 (bukti sangat kuat).',
    ],
  },};
