export default {
  id: 'earth-interior',
  subject: 'earth-space',
  title: { en: "Earth's Interior", id: 'Bagian Dalam Bumi' },
  description: {
    en: "A cross-section from crust to inner core, drawn to scale (kind of). Drag a probe down through 6,371 km and watch temperature, pressure, density, and material state — solid crust, plastic mantle, liquid outer core, solid inner core — change with depth.",
    id: 'Penampang dari kerak ke inti dalam, digambar dengan skala (kira-kira). Seret probe turun sejauh 6.371 km dan amati suhu, tekanan, kerapatan, dan wujud material — kerak padat, mantel plastis, inti luar cair, inti dalam padat — berubah dengan kedalaman.',
  },
  details: () => import('./details.js'),
  topics: ['geology', 'planetary'],
  load: () => import('./sim.js'),
};
