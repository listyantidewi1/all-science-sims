export default {
  id: 'simpsons-paradox',
  subject: 'data-science',
  title: { en: "Simpson's Paradox", id: 'Paradoks Simpson' },
  description: {
    en: 'A trend in three subgroups can flip when you pool them. Watch a positive correlation appear in every group and a negative correlation appear in the aggregate — Simpson\'s paradox in motion.',
    id: 'Tren pada tiga subkelompok bisa terbalik saat semuanya digabung. Amati korelasi positif muncul di tiap kelompok dan korelasi negatif muncul pada gabungan — paradoks Simpson di depan mata.',
  },
  details: () => import('./details.js'),
  topics: ['statistics', 'inference'],
  grade: [10, 11, 12, 13],
  load: () => import('./sim.js'),
};
