export default {
  id: 'pedigree',
  subject: 'biology',
  title: { en: 'Mendelian Pedigree', id: 'Pedigri Mendelian' },
  description: {
    en: "Click family members to mark them affected. Pick an inheritance mode — autosomal dominant, recessive, X-linked — and the chart highlights which mode is consistent with the pattern you drew.",
    id: 'Klik anggota keluarga untuk menandai mereka yang terkena. Pilih mode pewarisan — autosomal dominan, resesif, X-linked — dan diagram menyoroti mode mana yang konsisten dengan pola yang Anda buat.',
  },
  objectives: {
    en: [
      'Read standard pedigree symbols (squares, circles, filled).',
      'Distinguish dominant from recessive patterns by skipped generations.',
      'Recognize X-linked inheritance: more males affected, no male-to-male.',
    ],
    id: [
      'Membaca simbol pedigri standar (kotak, lingkaran, terisi).',
      'Membedakan pola dominan dan resesif dari generasi yang terlewat.',
      'Mengenali pewarisan X-linked: lebih banyak pria terkena, tidak ada penurunan ayah-ke-anak laki-laki.',
    ],
  },
  tryThis: {
    en: [
      'Mark grandfather and one grandson — try X-linked recessive.',
      'Mark every generation — autosomal dominant?',
      'Skip a generation — must be recessive (carriers in middle).',
    ],
    id: [
      'Tandai kakek dan satu cucu laki-laki — coba X-linked resesif.',
      'Tandai setiap generasi — autosomal dominan?',
      'Lewati satu generasi — pasti resesif (carrier di tengah).',
    ],
  },
  topics: ['genetics', 'pedigree'],
  load: () => import('./sim.js'),
};
