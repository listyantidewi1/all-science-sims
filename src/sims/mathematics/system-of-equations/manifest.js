export default {
  id: 'system-of-equations',
  subject: 'mathematics',
  title: { en: 'System of Linear Equations', id: 'Sistem Persamaan Linear' },
  description: {
    en: 'Two lines on the plane. Drag either line\'s slope or intercept and watch the intersection point move; the system\'s solution is exactly that intersection. Three cases emerge: one solution (lines cross), no solution (parallel, never meet), and infinitely many (the same line twice).',
    id: 'Dua garis di bidang. Tarik kemiringan atau titik potong garis dan amati titik perpotongan bergerak; solusi sistem adalah titik itu. Tiga kasus muncul: satu solusi (garis bersilang), tanpa solusi (sejajar, tidak bertemu), dan tak hingga banyak (garis yang sama).',
  },
  details: () => import('./details.js'),
  topics: ['algebra', 'linear-systems'],
  grade: [8, 9, 10, 11],
  load: () => import('./sim.js'),
};
