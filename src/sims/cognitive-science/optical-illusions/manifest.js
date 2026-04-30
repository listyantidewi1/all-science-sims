export default {
  id: 'optical-illusions',
  subject: 'cognitive-science',
  title: { en: 'Optical Illusions Gallery', id: 'Galeri Ilusi Optik' },
  description: {
    en: 'Six classic illusions where your brain insists on the wrong answer even after you measure: Müller-Lyer, Ponzo, Café Wall, Hering, Ebbinghaus, and Checker Shadow. Toggle the "rulers" overlay to confirm — the lines really are equal.',
    id: 'Enam ilusi klasik di mana otak Anda bersikukuh pada jawaban yang salah meski setelah Anda mengukur: Müller-Lyer, Ponzo, Café Wall, Hering, Ebbinghaus, dan Bayangan Papan Catur. Aktifkan overlay "penggaris" untuk mengonfirmasi — garis-garis itu benar-benar sama.',
  },
  objectives: {
    en: [
      'Recognize that perception is interpretation, not measurement.',
      'See how context warps size, length, and color judgments.',
      'Connect illusions to underlying neural mechanisms.',
    ],
    id: [
      'Mengenali bahwa persepsi adalah interpretasi, bukan pengukuran.',
      'Melihat konteks mempengaruhi penilaian ukuran, panjang, dan warna.',
      'Menghubungkan ilusi dengan mekanisme neural.',
    ],
  },
  tryThis: {
    en: [
      'Müller-Lyer — the two horizontal lines are the same length.',
      'Café Wall — the rows are perfectly straight.',
      'Checker Shadow — the two squares are the same shade of gray.',
    ],
    id: [
      'Müller-Lyer — kedua garis horizontal sama panjang.',
      'Café Wall — baris-barisnya lurus sempurna.',
      'Checker Shadow — kedua kotak sama warna abu-abu.',
    ],
  },
  topics: ['perception', 'visual-processing'],
  load: () => import('./sim.js'),
};
