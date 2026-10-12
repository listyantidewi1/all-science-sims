export default {
  id: 'elementary-ca',
  subject: 'computer-science',
  title: { en: 'Elementary Cellular Automata', id: 'Otomata Seluler Elementer' },
  description: {
    en: 'A 1D row of cells, each black or white, evolves into the row beneath using only its three top neighbors as input. From 256 possible rules emerge stripes, fractals, gliders, and Rule 30 — a chaos-grade pattern from one bit of state.',
    id: 'Sebuah baris 1D sel, masing-masing hitam atau putih, berevolusi ke baris di bawahnya hanya dengan tiga tetangga di atas sebagai input. Dari 256 aturan yang mungkin muncul garis-garis, fraktal, glider, dan Rule 30 — pola sekelas kekacauan dari satu bit keadaan.',
  },
  details: () => import('./details.js'),
  topics: ['cellular-automata', 'complexity'],
  grade: [9, 10, 11, 12],
  load: () => import('./sim.js'),
};
