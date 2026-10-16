export default {
  id: 'compass-map',
  subject: 'earth-space',
  title: { en: 'Compass and Map', id: 'Kompas dan Peta' },
  description: {
    en: 'Help Adi walk across the village map! Press North, South, East or West to move him square by square, past the school, the market, the mosque and the river. The compass rose shows all eight directions and always points the way to where Adi needs to go. Can you find the shortest way, and cross the river by the bridge?',
    id: 'Bantu Adi berjalan melintasi peta desa! Tekan Utara, Selatan, Timur atau Barat untuk memindahkannya kotak demi kotak, melewati sekolah, pasar, masjid dan sungai. Mawar kompas menunjukkan delapan arah mata angin dan selalu menunjuk ke tempat tujuan Adi. Bisakah kamu menemukan jalan terpendek, dan menyeberangi sungai lewat jembatan?',
  },
  topics: ['maps', 'compass directions', 'position', 'navigation'],
  grade: [3, 4, 5],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
