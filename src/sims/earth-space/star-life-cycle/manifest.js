export default {
  id: 'star-life-cycle',
  subject: 'earth-space',
  title: { en: 'Star Life Cycle', id: 'Siklus Hidup Bintang' },
  description: {
    en: 'Pick a star\'s mass and watch it walk through the H-R diagram from protostar to main sequence to giant to its final fate. Sun-like stars become red giants then white dwarfs; massive stars supernova into neutron stars or black holes. Time scales span millions to trillions of years.',
    id: 'Pilih massa bintang dan amati ia melintasi diagram H-R dari protobintang ke deret utama ke raksasa hingga nasib akhir. Bintang seukuran Matahari menjadi raksasa merah lalu katai putih; bintang masif meledak supernova menjadi bintang neutron atau lubang hitam. Skala waktu bentang juta sampai triliun tahun.',
  },
  details: () => import('./details.js'),
  topics: ['astrophysics'],
  grade: [8, 9, 10, 11],
  load: () => import('./sim.js'),
};
