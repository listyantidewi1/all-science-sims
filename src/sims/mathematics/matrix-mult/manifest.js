export default {
  id: 'matrix-mult',
  subject: 'mathematics',
  title: { en: 'Matrix Multiplication', id: 'Perkalian Matriks' },
  description: {
    en: 'Two matrices A and B; the product C = A·B. Click any cell of C and the simulator highlights the row of A and column of B that combine to give it. The "row dot column" rule, made visible.',
    id: 'Dua matriks A dan B; produk C = A·B. Klik sel mana saja pada C dan simulator menyoroti baris A dan kolom B yang berkombinasi menghasilkannya. Aturan "baris titik kolom", dibuat terlihat.',
  },
  objectives: {
    en: [
      'Apply the row-by-column rule.',
      'See dimension compatibility (m×n) · (n×p) = (m×p).',
      'Recognize matrix multiplication is NOT commutative.',
    ],
    id: [
      'Menerapkan aturan baris-kali-kolom.',
      'Melihat kompatibilitas dimensi (m×n) · (n×p) = (m×p).',
      'Mengenali perkalian matriks TIDAK komutatif.',
    ],
  },
  tryThis: {
    en: [
      'Set both to identity matrices — what is C?',
      'Multiply by a 90° rotation matrix — see vectors rotated.',
      'Try AB vs BA — are they equal?',
    ],
    id: [
      'Atur keduanya jadi matriks identitas — berapa C?',
      'Kalikan dengan matriks rotasi 90° — lihat vektor berputar.',
      'Coba AB vs BA — apakah sama?',
    ],
  },
  topics: ['linear-algebra'],
  load: () => import('./sim.js'),
};
