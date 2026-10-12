// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply P(D|+) = P(+|D)P(D) / P(+).',
      'See why prevalence dominates the posterior when it is small.',
      'Reason about base-rate fallacy.',
    ],
    id: [
      'Menerapkan P(D|+) = P(+|D)P(D) / P(+).',
      'Melihat mengapa prevalensi mendominasi posterior saat angkanya kecil.',
      'Menalar tentang kekeliruan base-rate.',
    ],
  },  tryThis: {
    en: [
      'Set prevalence to 1% with 99% accuracy — what fraction of positives are true?',
      'Bump prevalence to 50% — does the same test feel reliable now?',
      'Increase specificity from 99% to 99.9% — how much does posterior change?',
    ],
    id: [
      'Atur prevalensi ke 1% dengan akurasi 99% — berapa fraksi positif yang benar?',
      'Naikkan prevalensi ke 50% — apakah tes yang sama terasa andal sekarang?',
      'Naikkan spesifisitas dari 99% ke 99,9% — seberapa besar perubahan posterior?',
    ],
  },};
