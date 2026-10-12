export default {
  id: 'compound-interest',
  subject: 'finance',
  title: { en: 'Compound Interest', id: 'Bunga Majemuk' },
  description: {
    en: '"The most powerful force in the universe" — apocryphally attributed to Einstein. Slide rate, time, and starting principal, optionally add monthly contributions, and watch compound and simple interest pull apart.',
    id: '"Kekuatan terdahsyat di alam semesta" — kabar yang dilekatkan pada Einstein. Atur suku bunga, waktu, dan modal awal, opsionally tambahkan kontribusi bulanan, lalu amati bunga majemuk dan sederhana saling menjauh.',
  },
  details: () => import('./details.js'),
  topics: ['interest', 'savings'],
  hasLab: true,
  load: () => import('./sim.js'),
};
