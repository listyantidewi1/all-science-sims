export default {
  id: 'food-additives',
  subject: 'chemistry',
  title: { en: 'Food Label Detective', id: 'Detektif Label Makanan' },
  description: {
    en: 'Pick a packaged snack or drink and read its ingredient list like a detective. Tap each ingredient and decide: is it a basic ingredient, a natural additive or a synthetic one? Each answer reveals what the additive does and how much is considered safe per day. A stack of sugar cubes shows how the sugar compares with a child\'s daily limit, and an information card explains addictive substances such as caffeine and nicotine.',
    id: 'Pilih camilan atau minuman kemasan dan baca daftar bahannya seperti seorang detektif. Ketuk tiap bahan dan putuskan: bahan dasar, zat aditif alami, atau zat aditif sintetis? Setiap jawaban mengungkap fungsi zat itu dan berapa banyak yang dianggap aman per hari. Tumpukan gula batu menunjukkan perbandingan gulanya dengan batas harian anak, dan kartu informasi menjelaskan zat adiktif seperti kafein dan nikotin.',
  },
  topics: ['food additives', 'addictive substances', 'health'],
  grade: [8, 9],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
