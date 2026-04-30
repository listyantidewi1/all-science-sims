export default {
  id: 'star-life-cycle',
  subject: 'earth-space',
  title: { en: 'Star Life Cycle', id: 'Siklus Hidup Bintang' },
  description: {
    en: 'Pick a star\'s mass and watch it walk through the H-R diagram from protostar to main sequence to giant to its final fate. Sun-like stars become red giants then white dwarfs; massive stars supernova into neutron stars or black holes. Time scales span millions to trillions of years.',
    id: 'Pilih massa bintang dan amati ia melintasi diagram H-R dari protobintang ke deret utama ke raksasa hingga nasib akhir. Bintang seukuran Matahari menjadi raksasa merah lalu katai putih; bintang masif meledak supernova menjadi bintang neutron atau lubang hitam. Skala waktu bentang juta sampai triliun tahun.',
  },
  objectives: {
    en: [
      'Connect mass to lifespan: bigger stars die younger.',
      'Recognize each phase on the H-R diagram.',
      'Understand the four end-states: white dwarf, neutron star, black hole, brown dwarf failure.',
    ],
    id: [
      'Menghubungkan massa dengan masa hidup: bintang lebih besar mati lebih muda.',
      'Mengenali tiap fase di diagram H-R.',
      'Memahami empat keadaan akhir: katai putih, bintang neutron, lubang hitam, kegagalan katai coklat.',
    ],
  },
  tryThis: {
    en: [
      '0.5 M☉ — red dwarf, lives a trillion years.',
      '1 M☉ — sun-like, ~10 billion years total, white dwarf at end.',
      '20 M☉ — supergiant, ~10 million years, supernova → neutron star.',
      '50 M☉ — Wolf-Rayet, ~3 million years, supernova → black hole.',
    ],
    id: [
      '0,5 M☉ — katai merah, hidup satu triliun tahun.',
      '1 M☉ — seukuran Matahari, total ~10 miliar tahun, katai putih di akhir.',
      '20 M☉ — supergiant, ~10 juta tahun, supernova → bintang neutron.',
      '50 M☉ — Wolf-Rayet, ~3 juta tahun, supernova → lubang hitam.',
    ],
  },
  topics: ['astrophysics'],
  load: () => import('./sim.js'),
};
