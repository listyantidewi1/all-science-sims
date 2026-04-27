export default {
  id: 'simpsons-paradox',
  subject: 'data-science',
  title: { en: "Simpson's Paradox", id: 'Paradoks Simpson' },
  description: {
    en: 'A trend in three subgroups can flip when you pool them. Watch a positive correlation appear in every group and a negative correlation appear in the aggregate — Simpson\'s paradox in motion.',
    id: 'Tren pada tiga subkelompok bisa terbalik saat semuanya digabung. Amati korelasi positif muncul di tiap kelompok dan korelasi negatif muncul pada gabungan — paradoks Simpson di depan mata.',
  },
  objectives: {
    en: [
      'Recognize that aggregating groups can reverse a relationship.',
      'Identify a confounding variable from the cluster shape.',
      'Argue why "always look at subgroups" is statistical hygiene.',
    ],
    id: [
      'Mengenali bahwa menggabungkan kelompok bisa membalik hubungan.',
      'Mengenali variabel pengganggu dari bentuk klaster.',
      'Berargumen mengapa "selalu lihat subkelompok" itu kebersihan statistik.',
    ],
  },
  tryThis: {
    en: [
      'Drag a group higher — does the global slope flip?',
      'Set all groups on top of each other — paradox vanishes?',
      'Spread groups along a diagonal — see classic Simpson reversal.',
    ],
    id: [
      'Geser satu kelompok lebih tinggi — apakah kemiringan global terbalik?',
      'Tumpuk semua kelompok di tempat yang sama — paradoks hilang?',
      'Sebarkan kelompok di sepanjang diagonal — saksikan pembalikan Simpson klasik.',
    ],
  },
  topics: ['statistics', 'inference'],
  load: () => import('./sim.js'),
};
