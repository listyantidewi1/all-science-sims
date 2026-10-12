export default {
  id: 'mantle-convection',
  subject: 'earth-space',
  title: { en: 'Mantle Convection', id: 'Konveksi Mantel' },
  description: {
    en: 'A 2D slice through the Earth\'s mantle. Hot material rises in plumes and cool material sinks in slabs. Drag to add a heat source and watch convection cells reorganize over millions of years (compressed to seconds).',
    id: 'Penampang 2D mantel Bumi. Material panas naik sebagai gumpalan dan material dingin tenggelam sebagai slab. Seret untuk menambahkan sumber panas dan amati sel konveksi tertata ulang selama jutaan tahun (dipadatkan ke detik).',
  },
  details: () => import('./details.js'),
  topics: ['geophysics', 'convection'],
  grade: [8, 9, 10, 11],
  load: () => import('./sim.js'),
};
