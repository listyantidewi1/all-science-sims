export default {
  id: 'game-of-life',
  subject: 'computer-science',
  title: { en: "Conway's Game of Life", id: 'Game of Life Conway' },
  description: {
    en: 'Click cells to bring them alive. Each step every cell follows three simple rules — and out of pure logic, gliders, oscillators, and chaos appear. The most famous cellular automaton.',
    id: 'Klik sel untuk menghidupkannya. Setiap langkah, semua sel mengikuti tiga aturan sederhana — dan dari logika murni muncul glider, osilator, dan kekacauan. Otomata seluler paling terkenal.',
  },
  objectives: {
    en: [
      'Apply the survive/birth rules of B3/S23.',
      'Recognize iconic patterns: glider, blinker, beacon.',
      'See how local rules can produce global complexity.',
    ],
    id: [
      'Menerapkan aturan tetap-hidup/lahir B3/S23.',
      'Mengenali pola ikonik: glider, blinker, beacon.',
      'Melihat aturan lokal menghasilkan kompleksitas global.',
    ],
  },
  tryThis: {
    en: [
      'Place a glider — does it travel diagonally forever?',
      'Drop "random" twice — do you ever get the same outcome?',
      'Find a still life that doesn\'t change.',
    ],
    id: [
      'Letakkan glider — apakah ia bergerak diagonal selamanya?',
      'Klik "Random" dua kali — apakah hasilnya pernah sama?',
      'Cari pola "still life" yang tidak berubah.',
    ],
  },
  topics: ['cellular-automata', 'emergence'],
  load: () => import('./sim.js'),
};
