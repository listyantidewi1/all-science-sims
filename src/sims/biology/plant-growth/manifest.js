export default {
  id: 'plant-growth',
  subject: 'biology',
  title: { en: 'Grow a Plant', id: 'Menanam Tumbuhan' },
  description: {
    en: 'Two pots, two seeds. Pick how much water and how much light each pot gets, then press Next day and watch. Does the seed sprout? Does the plant grow tall, droop, or dry up? A ruler shows how tall each plant is.',
    id: 'Dua pot, dua biji. Pilih berapa banyak air dan cahaya untuk tiap pot, lalu tekan Hari berikutnya dan lihat. Apakah bijinya tumbuh? Apakah tanamannya tinggi, layu, atau kering? Penggaris menunjukkan tinggi tiap tanaman.',
  },
  topics: ['plants', 'living-things', 'fair-test'],
  grade: [1, 2, 3, 4],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
