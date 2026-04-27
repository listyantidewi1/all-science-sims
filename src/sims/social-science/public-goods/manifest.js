export default {
  id: 'public-goods',
  subject: 'social-science',
  title: { en: 'Public Goods Game', id: 'Permainan Barang Publik' },
  description: {
    en: 'Each round, every player decides how much to contribute to a shared pot. The pot is multiplied and split equally — but free-riding always pays better individually. Watch contributors decline unless punishment is allowed.',
    id: 'Tiap putaran, setiap pemain memutuskan berapa banyak menyumbang ke dompet bersama. Dompet dikalikan dan dibagi rata — namun individu selalu untung jika menumpang gratis. Amati kontribusi menurun kecuali ada hukuman.',
  },
  objectives: {
    en: [
      'See how rational individual choice undermines a collective good.',
      'Recognize that punishment can sustain cooperation.',
      'Connect to real public goods (taxes, climate, vaccines).',
    ],
    id: [
      'Melihat bagaimana pilihan rasional individu meruntuhkan kebaikan bersama.',
      'Mengenali bahwa hukuman dapat mempertahankan kerja sama.',
      'Mengaitkan dengan barang publik nyata (pajak, iklim, vaksin).',
    ],
  },
  tryThis: {
    en: [
      'Run with no punishment — contributions head to zero?',
      'Enable punishment — does it stabilize?',
      'Add 1 free-rider to a generous group — does it spread?',
    ],
    id: [
      'Jalankan tanpa hukuman — apakah kontribusi menuju nol?',
      'Aktifkan hukuman — apakah jadi stabil?',
      'Tambahkan 1 free-rider ke kelompok dermawan — apakah ia menular?',
    ],
  },
  topics: ['cooperation', 'game-theory'],
  load: () => import('./sim.js'),
};
