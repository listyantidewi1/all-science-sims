export default {
  id: 'pascal-triangle',
  subject: 'mathematics',
  title: { en: "Pascal's Triangle", id: 'Segitiga Pascal' },
  description: {
    en: "Pascal's triangle: every entry is the sum of the two above it. Click any cell to highlight all paths from the apex that lead to it — and notice that this count is exactly C(n, k), the number of k-element subsets from n. The rows alternate even/odd along Sierpinski-triangle patterns.",
    id: 'Segitiga Pascal: setiap entri adalah jumlah dua entri di atasnya. Klik sel mana pun untuk menyorot semua jalur dari puncak yang mengarah ke sana — dan perhatikan bahwa jumlah jalur tepat C(n, k), jumlah subset k-anggota dari n. Baris berselang genap/ganjil membentuk pola segitiga Sierpinski.',
  },
  details: () => import('./details.js'),
  topics: ['combinatorics', 'number-theory'],
  load: () => import('./sim.js'),
};
