export default {
  id: 'system-of-equations',
  subject: 'mathematics',
  title: { en: 'System of Linear Equations', id: 'Sistem Persamaan Linear' },
  description: {
    en: 'Two lines on the plane. Drag either line\'s slope or intercept and watch the intersection point move; the system\'s solution is exactly that intersection. Three cases emerge: one solution (lines cross), no solution (parallel, never meet), and infinitely many (the same line twice).',
    id: 'Dua garis di bidang. Tarik kemiringan atau titik potong garis dan amati titik perpotongan bergerak; solusi sistem adalah titik itu. Tiga kasus muncul: satu solusi (garis bersilang), tanpa solusi (sejajar, tidak bertemu), dan tak hingga banyak (garis yang sama).',
  },
  objectives: {
    en: [
      'Solve a 2×2 system by inspection of its graph.',
      'Recognize the three solution cases from the slopes and intercepts.',
      'Connect the algebraic determinant to "lines parallel?" geometrically.',
    ],
    id: [
      'Menyelesaikan sistem 2×2 dengan inspeksi grafik.',
      'Mengenali tiga kasus solusi dari kemiringan dan titik potong.',
      'Menghubungkan determinan aljabar dengan "apakah sejajar?" secara geometris.',
    ],
  },
  tryThis: {
    en: [
      'Two lines crossing — one unique solution (read off the intersection).',
      'Same slope, different intercept — parallel, no solution.',
      'Same slope AND same intercept — overlapping; infinite solutions.',
    ],
    id: [
      'Dua garis bersilang — satu solusi unik.',
      'Kemiringan sama, titik potong berbeda — sejajar, tanpa solusi.',
      'Kemiringan dan titik potong sama — bertumpang, tak hingga solusi.',
    ],
  },
  topics: ['algebra', 'linear-systems'],
  load: () => import('./sim.js'),
};
