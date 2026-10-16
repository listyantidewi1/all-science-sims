export default {
  id: 'bar-charts-pictograms',
  subject: 'mathematics',
  title: { en: 'Picture Graphs and Bar Charts', id: 'Diagram Gambar dan Batang' },
  description: {
    en: 'Run a mini survey: favourite fruit, pets or how we get to school. Tap to add each vote and watch three pictures of the same data grow together: tally marks, a pictogram and a bar chart. Then answer questions like "Which is the most popular?" and "How many more chose apples than bananas?".',
    id: 'Lakukan survei mini: buah kesukaan, hewan peliharaan atau cara ke sekolah. Ketuk untuk menambah tiap suara dan lihat tiga gambaran dari data yang sama tumbuh bersama: turus, piktogram dan diagram batang. Lalu jawab pertanyaan seperti "Mana yang paling banyak dipilih?" dan "Berapa lebih banyak yang memilih apel daripada pisang?".',
  },
  topics: ['data', 'statistics', 'graphs'],
  grade: [1, 2, 3, 4],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
