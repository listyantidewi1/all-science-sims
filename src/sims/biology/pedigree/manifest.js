export default {
  id: 'pedigree',
  subject: 'biology',
  title: { en: 'Mendelian Pedigree', id: 'Pedigri Mendelian' },
  description: {
    en: "Click family members to mark them affected. Pick an inheritance mode — autosomal dominant, recessive, X-linked — and the chart highlights which mode is consistent with the pattern you drew.",
    id: 'Klik anggota keluarga untuk menandai mereka yang terkena. Pilih mode pewarisan — autosomal dominan, resesif, X-linked — dan diagram menyoroti mode mana yang konsisten dengan pola yang Anda buat.',
  },
  details: () => import('./details.js'),
  topics: ['genetics', 'pedigree'],
  grade: [10, 11, 12],
  load: () => import('./sim.js'),
};
