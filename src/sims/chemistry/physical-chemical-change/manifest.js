export default {
  id: 'physical-chemical-change',
  subject: 'chemistry',
  title: { en: 'Physical or Chemical Change?', id: 'Perubahan Fisika atau Kimia?' },
  description: {
    en: 'Sort ten everyday changes, from ice melting to paper burning, into physical or chemical. Each card plays a before-and-after animation and a particle view that shows whether the particles are only rearranged or turned into new ones. Spot the signs of a chemical change: gas, colour, heat or light, and a new substance.',
    id: 'Pilah sepuluh perubahan sehari-hari, dari es mencair sampai kertas terbakar, menjadi perubahan fisika atau kimia. Setiap kartu memutar animasi sebelum-sesudah dan tampilan partikel yang menunjukkan apakah partikel hanya tersusun ulang atau berubah jadi partikel baru. Kenali tanda perubahan kimia: gas, warna, panas atau cahaya, dan zat baru.',
  },
  topics: ['matter', 'chemical-reactions'],
  grade: [7, 8, 9],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
