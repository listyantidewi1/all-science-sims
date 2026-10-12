export default {
  id: 'matrix-mult',
  subject: 'mathematics',
  title: { en: 'Matrix Multiplication', id: 'Perkalian Matriks' },
  description: {
    en: 'Two matrices A and B; the product C = A·B. Click any cell of C and the simulator highlights the row of A and column of B that combine to give it. The "row dot column" rule, made visible.',
    id: 'Dua matriks A dan B; produk C = A·B. Klik sel mana saja pada C dan simulator menyoroti baris A dan kolom B yang berkombinasi menghasilkannya. Aturan "baris titik kolom", dibuat terlihat.',
  },
  details: () => import('./details.js'),
  topics: ['linear-algebra'],
  grade: [11, 12, 13],
  load: () => import('./sim.js'),
};
