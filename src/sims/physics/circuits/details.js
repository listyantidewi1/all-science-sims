// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Series resistance: R_total = R₁ + R₂ + R₃.',
      'Parallel resistance: 1/R_total = 1/R₁ + 1/R₂ + 1/R₃.',
      'See voltage divide in series, current divide in parallel.',
    ],
    id: [
      'Resistansi seri: R_total = R₁ + R₂ + R₃.',
      'Resistansi paralel: 1/R_total = 1/R₁ + 1/R₂ + 1/R₃.',
      'Melihat tegangan terbagi di seri, arus terbagi di paralel.',
    ],
  },  tryThis: {
    en: [
      'Series, all 3 same — bulbs share voltage equally; remove one → all dark.',
      'Parallel, all 3 same — each bulb at full brightness; remove one → others unchanged.',
      'Mix bulb resistances in series — the one with highest R drops the most voltage.',
    ],
    id: [
      'Seri, ketiganya sama — bohlam berbagi tegangan sama; cabut satu → semua gelap.',
      'Paralel, ketiganya sama — tiap bohlam terang penuh; cabut satu → yang lain tak berubah.',
      'Campur R bohlam di seri — yang R tertinggi turun tegangan terbanyak.',
    ],
  },};
