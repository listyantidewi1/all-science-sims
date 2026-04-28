export default {
  id: 'earth-interior',
  subject: 'earth-space',
  title: { en: "Earth's Interior", id: 'Bagian Dalam Bumi' },
  description: {
    en: "A cross-section from crust to inner core, drawn to scale (kind of). Drag a probe down through 6,371 km and watch temperature, pressure, density, and material state — solid crust, plastic mantle, liquid outer core, solid inner core — change with depth.",
    id: 'Penampang dari kerak ke inti dalam, digambar dengan skala (kira-kira). Seret probe turun sejauh 6.371 km dan amati suhu, tekanan, kerapatan, dan wujud material — kerak padat, mantel plastis, inti luar cair, inti dalam padat — berubah dengan kedalaman.',
  },
  objectives: {
    en: [
      'Identify crust, mantle, outer core, inner core boundaries.',
      'See temperature climb to ~5,500 K and pressure to ~360 GPa at center.',
      'Connect material state to seismology (P-waves, S-waves).',
    ],
    id: [
      'Mengenali batas kerak, mantel, inti luar, inti dalam.',
      'Melihat suhu memanjat ~5.500 K dan tekanan ~360 GPa di pusat.',
      'Mengaitkan wujud material dengan seismologi (gelombang P dan S).',
    ],
  },
  tryThis: {
    en: [
      'Probe at 35 km — what layer? (Mohorovičić discontinuity)',
      'Probe at 2900 km — Gutenberg discontinuity, where is it?',
      'Why does the outer core have liquid iron despite being so hot?',
    ],
    id: [
      'Probe pada 35 km — lapisan apa? (Diskontinuitas Mohorovičić)',
      'Probe pada 2900 km — di mana diskontinuitas Gutenberg?',
      'Mengapa inti luar berisi besi cair meskipun sangat panas?',
    ],
  },
  topics: ['geology', 'planetary'],
  load: () => import('./sim.js'),
};
