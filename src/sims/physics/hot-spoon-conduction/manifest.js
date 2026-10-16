export default {
  id: 'hot-spoon-conduction',
  subject: 'physics',
  title: { en: 'Which Spoon Gets Hot?', id: 'Sendok Mana yang Panas?' },
  description: {
    en: 'Three spoons stand in a cup of hot water: one metal, one wood, one plastic. A pat of butter sits on each handle. Watch the heat creep up the spoons as colour, and see which pat of butter melts and slides off first. Change the water temperature and time it with the stopwatch.',
    id: 'Tiga sendok berdiri dalam secangkir air panas: satu logam, satu kayu, satu plastik. Sepotong mentega menempel di tiap gagang. Lihat panas merambat naik di sendok sebagai warna, dan amati mentega mana yang meleleh dan jatuh lebih dulu. Ubah suhu air dan ukur waktunya dengan stopwatch.',
  },
  topics: ['heat', 'conduction', 'materials', 'conductors and insulators'],
  grade: [5, 6],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
