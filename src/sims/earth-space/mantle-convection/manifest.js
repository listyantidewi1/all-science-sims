export default {
  id: 'mantle-convection',
  subject: 'earth-space',
  title: { en: 'Mantle Convection', id: 'Konveksi Mantel' },
  description: {
    en: 'A 2D slice through the Earth\'s mantle. Hot material rises in plumes and cool material sinks in slabs. Drag to add a heat source and watch convection cells reorganize over millions of years (compressed to seconds).',
    id: 'Penampang 2D mantel Bumi. Material panas naik sebagai gumpalan dan material dingin tenggelam sebagai slab. Seret untuk menambahkan sumber panas dan amati sel konveksi tertata ulang selama jutaan tahun (dipadatkan ke detik).',
  },
  objectives: {
    en: [
      'Recognize convection cells driven by temperature differences.',
      'Connect mantle plumes and slabs to plate motion at the surface.',
      'See how Rayleigh number controls vigour of convection.',
    ],
    id: [
      'Mengenali sel konveksi yang didorong perbedaan suhu.',
      'Mengaitkan plum mantel dan slab dengan gerakan lempeng di permukaan.',
      'Melihat bagaimana bilangan Rayleigh mengendalikan ketegapan konveksi.',
    ],
  },
  tryThis: {
    en: [
      'Drop heat at the bottom — does a plume rise?',
      'Drop a cold patch at the top — does it sink?',
      'Crank up Rayleigh number — does the pattern get chaotic?',
    ],
    id: [
      'Tambahkan panas di dasar — apakah plum naik?',
      'Tambahkan area dingin di puncak — apakah tenggelam?',
      'Naikkan bilangan Rayleigh — apakah pola jadi kacau?',
    ],
  },
  topics: ['geophysics', 'convection'],
  load: () => import('./sim.js'),
};
