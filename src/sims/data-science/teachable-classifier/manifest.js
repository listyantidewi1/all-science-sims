export default {
  id: 'teachable-classifier',
  subject: 'data-science',
  title: { en: 'Teach the Machine', id: 'Ajari Mesinnya' },
  description: {
    en: 'Be the teacher! A fruit appears on a chart of size and colour. Tap Apple, Orange or Lemon to tell the machine what it is. After a few examples the machine draws its own "this is apple land, this is lemon land" map and guesses new mystery fruits. Then try the biased data button and see how a bad set of examples makes the machine guess wrong.',
    id: 'Jadilah gurunya! Sebuah buah muncul di peta ukuran dan warna. Ketuk Apel, Jeruk atau Lemon untuk memberi tahu mesin apa buah itu. Setelah beberapa contoh, mesin menggambar peta "ini wilayah apel, ini wilayah lemon" miliknya sendiri dan menebak buah misteri yang baru. Lalu coba tombol data bias dan lihat bagaimana contoh yang buruk membuat mesin salah menebak.',
  },
  topics: ['machine learning', 'classification', 'pattern recognition', 'training data', 'bias'],
  grade: [5, 6, 7, 8, 9],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
