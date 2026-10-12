export default {
  id: 'electromagnet',
  subject: 'physics',
  title: { en: 'Build an Electromagnet', id: 'Membuat Elektromagnet' },
  description: {
    en: 'Wind a coil around a core, connect a battery pack and flip the switch. Add more turns, more cells or an iron core and watch the electromagnet lift more paper clips while a compass needle swings toward it.',
    id: 'Lilitkan kumparan pada inti, sambungkan ke baterai, lalu nyalakan sakelarnya. Tambah lilitan, tambah sel baterai, atau pakai inti besi, dan lihat elektromagnet mengangkat lebih banyak klip kertas sementara jarum kompas berputar ke arahnya.',
  },
  topics: ['magnetism', 'electricity'],
  grade: [7, 8, 9],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
