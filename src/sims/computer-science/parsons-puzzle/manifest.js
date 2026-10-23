export default {
  id: 'parsons-puzzle',
  subject: 'computer-science',
  title: { en: "Parsons Puzzle", id: "Teka-teki Parsons" },
  description: {
    en: 'Nine short Python programs, cut into shuffled line cards together with two distractor lines that look right but are wrong. Drag the cards into order (or tap, or use the keyboard), give each line its indentation, then press Check: your program runs on test inputs, boundary values included, and you see Python\'s own SyntaxError or IndentationError, or the first failing test and the first line to fix. The puzzles go from pass or fail with if-else to match-case and try-except.',
    id: 'Sembilan program Python pendek, dipotong menjadi kartu baris yang diacak bersama dua baris pengecoh yang tampak benar padahal salah. Seret kartu ke urutan yang tepat (atau ketuk, atau pakai papan ketik), beri setiap baris indentasinya, lalu tekan Periksa: programmu dijalankan dengan masukan uji, termasuk nilai batas, dan kamu melihat SyntaxError atau IndentationError dari Python sendiri, atau uji pertama yang gagal dan baris pertama yang perlu diperbaiki. Teka-tekinya mulai dari predikat kelulusan dengan if-else sampai match-case dan try-except.',
  },
  topics: ['programming', 'python', 'indentation', 'control-flow'],
  grade: [10, 11, 12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
