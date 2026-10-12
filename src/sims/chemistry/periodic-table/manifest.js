export default {
  id: 'periodic-table',
  subject: 'chemistry',
  title: { en: 'Periodic Table Explorer', id: 'Penjelajah Tabel Periodik' },
  description: {
    en: 'Hover or tap any element to see its symbol, atomic number, and atomic mass. Color the table by group, period, or state at room temperature to spot patterns.',
    id: 'Arahkan kursor atau ketuk unsur untuk melihat lambang, nomor atom, dan massa atomnya. Warnai tabel berdasarkan golongan, periode, atau wujud pada suhu kamar untuk melihat polanya.',
  },
  details: () => import('./details.js'),
  topics: ['elements', 'periodicity'],
  grade: [10, 11],
  load: () => import('./sim.js'),
};
