export default {
  id: 'linear-transformations',
  subject: 'mathematics',
  title: { en: 'Linear Transformations', id: 'Transformasi Linear' },
  description: {
    en: 'Drag the columns of a 2×2 matrix and watch the entire grid (and a sample shape) bend, rotate, shear, or flip with it. Determinant tells you the area-scaling — and its sign whether orientation flipped.',
    id: 'Seret kolom matriks 2×2 dan amati seluruh grid (dan sebuah bentuk contoh) menekuk, berputar, mencong, atau membalik bersamanya. Determinan menunjukkan penskalaan luas — tandanya menunjukkan apakah orientasi terbalik.',
  },
  objectives: {
    en: [
      'Read columns of a matrix as where the basis vectors land.',
      'Connect determinant to area scaling factor.',
      'Recognize rotations, shears, reflections, scalings.',
    ],
    id: [
      'Membaca kolom matriks sebagai tempat basis vektor mendarat.',
      'Mengaitkan determinan dengan faktor penskalaan luas.',
      'Mengenali rotasi, geseran, refleksi, dan penskalaan.',
    ],
  },
  tryThis: {
    en: [
      'Drag e₁ to (0,1) and e₂ to (-1, 0) — what is this transformation?',
      'Make det = 0 — what happens to the grid?',
      'Make det negative — note the shape flip.',
    ],
    id: [
      'Seret e₁ ke (0,1) dan e₂ ke (-1, 0) — transformasi apa itu?',
      'Buat det = 0 — apa yang terjadi pada grid?',
      'Buat det negatif — perhatikan bentuk membalik.',
    ],
  },
  topics: ['linear-algebra', 'matrices'],
  load: () => import('./sim.js'),
};
