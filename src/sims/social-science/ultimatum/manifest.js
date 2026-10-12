export default {
  id: 'ultimatum',
  subject: 'social-science',
  title: { en: 'Ultimatum Game', id: 'Permainan Ultimatum' },
  description: {
    en: 'A proposer offers a split of $10. The responder accepts (both get the split) or rejects (both get $0). Pure-rational predicts almost-zero offers — but real humans reject low offers, defying classic economics.',
    id: 'Pengusul menawarkan pembagian $10. Penerima menerima (keduanya dapat bagian itu) atau menolak (keduanya dapat $0). Rasional murni memprediksi tawaran nyaris-nol — tapi manusia nyata menolak tawaran rendah, mengingkari ekonomi klasik.',
  },
  details: () => import('./details.js'),
  topics: ['game-theory', 'fairness'],
  grade: [9, 10, 11, 12],
  load: () => import('./sim.js'),
};
