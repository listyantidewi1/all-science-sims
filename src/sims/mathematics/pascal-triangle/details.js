// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
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
  },  tryThis: {
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
  },};
