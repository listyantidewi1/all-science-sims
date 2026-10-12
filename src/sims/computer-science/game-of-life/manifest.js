export default {
  id: 'game-of-life',
  subject: 'computer-science',
  title: { en: "Conway's Game of Life", id: 'Game of Life Conway' },
  description: {
    en: 'Click cells to bring them alive. Each step every cell follows three simple rules — and out of pure logic, gliders, oscillators, and chaos appear. The most famous cellular automaton.',
    id: 'Klik sel untuk menghidupkannya. Setiap langkah, semua sel mengikuti tiga aturan sederhana — dan dari logika murni muncul glider, osilator, dan kekacauan. Otomata seluler paling terkenal.',
  },
  details: () => import('./details.js'),
  topics: ['cellular-automata', 'emergence'],
  load: () => import('./sim.js'),
};
