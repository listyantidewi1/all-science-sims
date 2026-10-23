export default {
  id: 'list-operations',
  subject: 'computer-science',
  title: { en: 'Lists and Arrays', id: 'List dan Array' },
  description: {
    en: 'Run real Python list operations on a playlist, the cinema seats A1–A5 or a shopping basket and watch what happens inside the list: lst[i] jumps straight to one cell, insert() shifts every later item to the right, remove() scans and then closes the gap. Each operation shows its statement, the new list and how many cells were read and moved, and a chart compares insert at the front with append as the list grows.',
    id: 'Jalankan operasi list Python sungguhan pada playlist, kursi bioskop A1–A5, atau keranjang belanja dan amati yang terjadi di dalam list: lst[i] langsung menuju satu sel, insert() menggeser semua data di belakangnya ke kanan, remove() mencari lalu menutup celah. Setiap operasi menampilkan pernyataannya, isi list yang baru, serta berapa sel yang dibaca dan digeser, dan grafik membandingkan insert di depan dengan append saat list makin panjang.',
  },
  topics: ['data-structures', 'python', 'complexity'],
  grade: [10, 11, 12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
