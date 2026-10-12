// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply NPV = Σ CF_t / (1+r)^t.',
      'Identify IRR as the rate that makes NPV = 0.',
      'Distinguish "negative now, positive later" projects from "positive now, negative later".',
    ],
    id: [
      'Menerapkan NPV = Σ CF_t / (1+r)^t.',
      'Mengenali IRR sebagai tingkat yang membuat NPV = 0.',
      'Membedakan proyek "negatif sekarang, positif nanti" dari "positif sekarang, negatif nanti".',
    ],
  },  tryThis: {
    en: [
      'Initial investment $1000, $300/year for 5 years — what is NPV at 8%?',
      'Find the discount rate where NPV = 0 (the IRR).',
      'Push rate to 30% — does NPV go negative?',
    ],
    id: [
      'Investasi awal Rp10jt, kas masuk Rp3jt/tahun selama 5 tahun — berapa NPV pada 8%?',
      'Cari tingkat diskonto di mana NPV = 0 (IRR).',
      'Naikkan tingkat ke 30% — apakah NPV jadi negatif?',
    ],
  },};
