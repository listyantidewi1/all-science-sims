export default {
  id: 'solar-system',
  subject: 'earth-space',
  title: { en: 'Solar System Orrery', id: 'Tata Surya Orrery' },
  description: {
    en: 'Watch the eight planets orbit the Sun at speeds proportional to their real orbital periods. Toggle orbits, adjust speed, and see how outer planets crawl while Mercury races.',
    id: 'Amati delapan planet mengorbit Matahari dengan kecepatan sesuai periode orbit aslinya. Aktifkan jejak orbit, atur kecepatan, dan lihat planet-planet luar bergerak lambat sementara Merkurius berputar cepat.',
  },
  details: () => import('./details.js'),
  topics: ['astronomy', 'orbits'],
  grade: [10, 11],
  hasLab: true,
  load: () => import('./sim.js'),
};
