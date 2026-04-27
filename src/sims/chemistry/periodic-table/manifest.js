export default {
  id: 'periodic-table',
  subject: 'chemistry',
  title: { en: 'Periodic Table Explorer', id: 'Penjelajah Tabel Periodik' },
  description: {
    en: 'Hover or tap any element to see its symbol, atomic number, and atomic mass. Color the table by group, period, or state at room temperature to spot patterns.',
    id: 'Arahkan kursor atau ketuk unsur untuk melihat lambang, nomor atom, dan massa atomnya. Warnai tabel berdasarkan golongan, periode, atau wujud pada suhu kamar untuk melihat polanya.',
  },
  objectives: {
    en: [
      'Locate elements by group and period.',
      'Distinguish metals, metalloids, and nonmetals.',
      'Recognize trends across rows and down columns.',
    ],
    id: [
      'Menemukan unsur berdasarkan golongan dan periode.',
      'Membedakan logam, metaloid, dan nonlogam.',
      'Mengenali kecenderungan dalam baris dan kolom.',
    ],
  },
  tryThis: {
    en: [
      'Find the alkali metals — what do they have in common?',
      'Color by state — how many elements are liquid at room temperature?',
      'Locate the noble gases. What pattern do their atomic numbers follow?',
    ],
    id: [
      'Cari logam alkali — apa kesamaan di antara mereka?',
      'Warnai berdasarkan wujud — berapa unsur yang cair pada suhu kamar?',
      'Temukan gas mulia. Pola apa yang terlihat pada nomor atomnya?',
    ],
  },
  topics: ['elements', 'periodicity'],
  grade: [10, 11],
  load: () => import('./sim.js'),
};
