export default {
  id: 'turing-machine',
  subject: 'computer-science',
  title: { en: 'Turing Machine', id: 'Mesin Turing' },
  description: {
    en: 'A read/write head crawls along an infinite tape, following a tiny rule table. Watch a 5-state busy beaver, a binary incrementer, or a unary doubler chug through their programs one step at a time.',
    id: 'Sebuah kepala baca/tulis merayap di pita tak hingga mengikuti tabel aturan kecil. Amati busy-beaver 5-state, penambah biner, atau penggandakan unary menjalankan programnya langkah demi langkah.',
  },
  details: () => import('./details.js'),
  topics: ['computation', 'theory'],
  grade: [12, 13],
  load: () => import('./sim.js'),
};
