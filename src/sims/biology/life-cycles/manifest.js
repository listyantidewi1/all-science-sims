export default {
  id: 'life-cycles',
  subject: 'biology',
  title: { en: 'Life Cycles', id: 'Daur Hidup' },
  description: {
    en: 'Pick a butterfly, a frog, or a bean plant. The stage cards are mixed up. Drag them into the ring in the right order. When the ring is right, the cycle comes alive and goes round and round. Press Watch to see each stage slowly with its name.',
    id: 'Pilih kupu-kupu, katak, atau tanaman kacang. Kartu tahapannya tercampur. Seret kartu ke dalam lingkaran dengan urutan yang benar. Kalau sudah benar, daurnya hidup dan berputar terus. Tekan Tonton untuk melihat tiap tahap perlahan dengan namanya.',
  },
  topics: ['life-cycles', 'living-things', 'growth'],
  grade: [2, 3, 4],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
