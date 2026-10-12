export default {
  id: 'linear-transformations',
  subject: 'mathematics',
  title: { en: 'Linear Transformations', id: 'Transformasi Linear' },
  description: {
    en: 'Drag the columns of a 2×2 matrix and watch the entire grid (and a sample shape) bend, rotate, shear, or flip with it. Determinant tells you the area-scaling — and its sign whether orientation flipped.',
    id: 'Seret kolom matriks 2×2 dan amati seluruh grid (dan sebuah bentuk contoh) menekuk, berputar, mencong, atau membalik bersamanya. Determinan menunjukkan penskalaan luas — tandanya menunjukkan apakah orientasi terbalik.',
  },
  details: () => import('./details.js'),
  topics: ['linear-algebra', 'matrices'],
  load: () => import('./sim.js'),
};
