export default {
  id: 'bayes-theorem',
  subject: 'data-science',
  title: { en: "Bayes' Theorem", id: 'Teorema Bayes' },
  description: {
    en: 'Watch the classic medical-test paradox: even an accurate test can give mostly false positives when the disease is rare. Drag prevalence, sensitivity, and specificity to see the posterior live.',
    id: 'Saksikan paradoks tes medis klasik: bahkan tes yang akurat dapat menghasilkan banyak positif palsu ketika penyakitnya langka. Atur prevalensi, sensitivitas, dan spesifisitas untuk melihat posterior secara langsung.',
  },
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
  },
  tryThis: {
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
  },
  topics: ['probability', 'inference'],
  load: () => import('./sim.js'),
};
