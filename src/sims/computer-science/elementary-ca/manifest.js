export default {
  id: 'elementary-ca',
  subject: 'computer-science',
  title: { en: 'Elementary Cellular Automata', id: 'Otomata Seluler Elementer' },
  description: {
    en: 'A 1D row of cells, each black or white, evolves into the row beneath using only its three top neighbors as input. From 256 possible rules emerge stripes, fractals, gliders, and Rule 30 — a chaos-grade pattern from one bit of state.',
    id: 'Sebuah baris 1D sel, masing-masing hitam atau putih, berevolusi ke baris di bawahnya hanya dengan tiga tetangga di atas sebagai input. Dari 256 aturan yang mungkin muncul garis-garis, fraktal, glider, dan Rule 30 — pola sekelas kekacauan dari satu bit keadaan.',
  },
  objectives: {
    en: [
      'Read a Wolfram rule number as 8 binary outputs.',
      'Distinguish Wolfram\'s 4 classes (uniform, periodic, chaotic, complex).',
      'Recognize that simple rules can generate fractals and randomness.',
    ],
    id: [
      'Membaca nomor aturan Wolfram sebagai 8 keluaran biner.',
      'Membedakan 4 kelas Wolfram (seragam, periodik, kacau, kompleks).',
      'Mengenali bahwa aturan sederhana dapat menghasilkan fraktal dan keacakan.',
    ],
  },
  tryThis: {
    en: [
      'Run Rule 30 — does the right edge look random?',
      'Run Rule 90 — see Sierpinski emerge.',
      'Run Rule 110 — find a glider.',
    ],
    id: [
      'Jalankan Rule 30 — apakah tepi kanannya tampak acak?',
      'Jalankan Rule 90 — lihat Sierpinski muncul.',
      'Jalankan Rule 110 — temukan glider.',
    ],
  },
  topics: ['cellular-automata', 'complexity'],
  load: () => import('./sim.js'),
};
