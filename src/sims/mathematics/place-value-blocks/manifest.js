export default {
  id: 'place-value-blocks',
  subject: 'mathematics',
  title: { en: 'Place Value Blocks', id: 'Balok Nilai Tempat' },
  description: {
    en: 'Build any number up to 10,000 out of blocks: small cubes for ones, rods for tens, flats for hundreds and big cubes for thousands. Tap a column to add a block and watch the number change. When ten ones pile up, they trade themselves for one ten! Switch on Compare to build two numbers and find out which is bigger.',
    id: 'Susun bilangan apa pun sampai 10.000 dari balok: kubus kecil untuk satuan, batang untuk puluhan, lempeng untuk ratusan dan kubus besar untuk ribuan. Ketuk sebuah kolom untuk menambah balok dan lihat bilangannya berubah. Ketika sepuluh satuan menumpuk, mereka ditukar menjadi satu puluhan! Nyalakan Bandingkan untuk menyusun dua bilangan dan mencari mana yang lebih besar.',
  },
  topics: ['place value', 'number sense', 'comparing numbers'],
  grade: [1, 2, 3, 4],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
