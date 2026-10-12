export default {
  id: 'air-pressure-weather',
  subject: 'earth-space',
  title: { en: 'Air Pressure and Weather', id: 'Tekanan Udara dan Cuaca' },
  description: {
    en: 'Drag a HIGH and a LOW pressure centre around a simple weather map. Isobars bend around them, wind arrows blow from high to low (and curve when the Coriolis effect is on), clouds and rain gather near the low, and a barometer reads the pressure at the town you choose. Add a cold or warm front to see the weather it brings.',
    id: 'Geser pusat tekanan TINGGI dan RENDAH di peta cuaca sederhana. Isobar melengkung di sekitarnya, panah angin bertiup dari tekanan tinggi ke rendah (dan membelok saat efek Coriolis dinyalakan), awan dan hujan berkumpul dekat pusat tekanan rendah, dan barometer membaca tekanan di kota pilihanmu. Tambahkan front dingin atau front hangat untuk melihat cuaca yang dibawanya.',
  },
  topics: ['weather', 'atmosphere', 'air-pressure'],
  grade: [7, 8, 9],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
