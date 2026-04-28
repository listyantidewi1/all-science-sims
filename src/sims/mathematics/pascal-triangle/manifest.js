export default {
  id: 'pascal-triangle',
  subject: 'mathematics',
  title: { en: "Pascal's Triangle", id: 'Segitiga Pascal' },
  description: {
    en: "Pascal's triangle: every entry is the sum of the two above it. Click any cell to highlight all paths from the apex that lead to it — and notice that this count is exactly C(n, k), the number of k-element subsets from n. The rows alternate even/odd along Sierpinski-triangle patterns.",
    id: 'Segitiga Pascal: setiap entri adalah jumlah dua entri di atasnya. Klik sel mana pun untuk menyorot semua jalur dari puncak yang mengarah ke sana — dan perhatikan bahwa jumlah jalur tepat C(n, k), jumlah subset k-anggota dari n. Baris berselang genap/ganjil membentuk pola segitiga Sierpinski.',
  },
  objectives: {
    en: [
      'See that C(n, k) = C(n−1, k−1) + C(n−1, k) is just "sum of two above".',
      'Connect path counting to combinations: each step left or right is a binary choice.',
      'Spot Sierpinski-like fractal in the parity (odd cells form a self-similar shape).',
    ],
    id: [
      'Melihat bahwa C(n, k) = C(n−1, k−1) + C(n−1, k) hanyalah "jumlah dua di atas".',
      'Menghubungkan pencacahan jalur dengan kombinasi: tiap langkah kiri/kanan adalah pilihan biner.',
      'Mengamati fraktal mirip Sierpinski di paritas (sel ganjil membentuk bentuk swa-mirip).',
    ],
  },
  tryThis: {
    en: [
      'Click row 4, column 2 — count says 6 = C(4, 2).',
      'Toggle "show parity" — odd cells form a Sierpinski-style shape.',
      'Read the diagonals: 1\'s, counting numbers, triangular numbers, tetrahedral numbers...',
    ],
    id: [
      'Klik baris 4, kolom 2 — angkanya 6 = C(4, 2).',
      'Aktifkan "tampilkan paritas" — sel ganjil membentuk pola gaya Sierpinski.',
      'Baca diagonal: 1, bilangan asli, bilangan segitiga, bilangan tetrahedral…',
    ],
  },
  topics: ['combinatorics', 'number-theory'],
  load: () => import('./sim.js'),
};
