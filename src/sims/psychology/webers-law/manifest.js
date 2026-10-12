export default {
  id: 'webers-law',
  subject: 'psychology',
  title: { en: "Weber's Law", id: 'Hukum Weber' },
  description: {
    en: 'Two lines (or two circles) appear side by side — say which is bigger. An adaptive staircase shrinks the difference while you are right and grows it when you are wrong, homing in on your just-noticeable difference (JND) at several standard sizes. Plot JND against intensity: the points fall on a straight line through the origin, so ΔI/I = k, the Weber fraction.',
    id: 'Dua garis (atau dua lingkaran) muncul berdampingan — sebutkan mana yang lebih besar. Tangga adaptif memperkecil selisih saat Anda benar dan memperbesarnya saat salah, mendekati perbedaan yang baru terasa (JND) pada beberapa ukuran standar. Plot JND terhadap intensitas: titik-titiknya jatuh pada garis lurus melalui titik asal, sehingga ΔI/I = k, pecahan Weber.',
  },
  details: () => import('./details.js'),
  topics: ['perception', 'psychophysics'],
  grade: [10, 11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
