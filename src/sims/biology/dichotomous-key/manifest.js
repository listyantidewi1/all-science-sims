export default {
  id: 'dichotomous-key',
  subject: 'biology',
  title: { en: 'Classification Key', id: 'Kunci Determinasi' },
  description: {
    en: 'A mystery organism appears: is it a frog, a shark, a spider or a mango tree? Answer yes/no questions about its backbone, feathers, fur, scales and legs, and watch the twelve candidates shrink to one. Then switch to Build mode and design your own key by choosing which question to ask first.',
    id: 'Sebuah makhluk misterius muncul: katak, hiu, laba-laba, atau pohon mangga? Jawab pertanyaan ya/tidak tentang tulang belakang, bulu, rambut, sisik, dan kakinya, lalu lihat dua belas kandidat menyusut menjadi satu. Kemudian beralih ke mode Bangun dan rancang kunci determinasimu sendiri dengan memilih pertanyaan mana yang ditanyakan lebih dulu.',
  },
  topics: ['classification', 'dichotomous key', 'living things', 'vertebrates and invertebrates'],
  grade: [7],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
