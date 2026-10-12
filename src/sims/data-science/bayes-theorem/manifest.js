export default {
  id: 'bayes-theorem',
  subject: 'data-science',
  title: { en: "Bayes' Theorem", id: 'Teorema Bayes' },
  description: {
    en: 'Watch the classic medical-test paradox: even an accurate test can give mostly false positives when the disease is rare. Drag prevalence, sensitivity, and specificity to see the posterior live.',
    id: 'Saksikan paradoks tes medis klasik: bahkan tes yang akurat dapat menghasilkan banyak positif palsu ketika penyakitnya langka. Atur prevalensi, sensitivitas, dan spesifisitas untuk melihat posterior secara langsung.',
  },
  details: () => import('./details.js'),
  topics: ['probability', 'inference'],
  grade: [11, 12, 13],
  load: () => import('./sim.js'),
};
