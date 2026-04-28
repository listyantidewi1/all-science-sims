export default {
  id: 'ultimatum',
  subject: 'social-science',
  title: { en: 'Ultimatum Game', id: 'Permainan Ultimatum' },
  description: {
    en: 'A proposer offers a split of $10. The responder accepts (both get the split) or rejects (both get $0). Pure-rational predicts almost-zero offers — but real humans reject low offers, defying classic economics.',
    id: 'Pengusul menawarkan pembagian $10. Penerima menerima (keduanya dapat bagian itu) atau menolak (keduanya dapat $0). Rasional murni memprediksi tawaran nyaris-nol — tapi manusia nyata menolak tawaran rendah, mengingkari ekonomi klasik.',
  },
  objectives: {
    en: [
      "Compare game-theoretic prediction (any offer >0) to real-world rejection thresholds.",
      'See fairness override pure self-interest.',
      'Connect to negotiations, tipping, and social norms.',
    ],
    id: [
      'Membandingkan prediksi teori-permainan (tawaran >0 apa pun) dengan ambang penolakan nyata.',
      'Melihat keadilan mengalahkan kepentingan pribadi murni.',
      'Mengaitkan dengan negosiasi, tips, dan norma sosial.',
    ],
  },
  tryThis: {
    en: [
      'Set responder threshold to 0% — does any offer succeed?',
      'Threshold 30% — most empirical humans match this.',
      'Run 100 rounds with each strategy — count failed offers.',
    ],
    id: [
      'Atur ambang penerima ke 0% — apakah setiap tawaran berhasil?',
      'Ambang 30% — kebanyakan manusia empiris cocok dengan ini.',
      'Jalankan 100 putaran tiap strategi — hitung tawaran gagal.',
    ],
  },
  topics: ['game-theory', 'fairness'],
  load: () => import('./sim.js'),
};
