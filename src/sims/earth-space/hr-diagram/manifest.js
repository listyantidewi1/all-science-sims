export default {
  id: 'hr-diagram',
  subject: 'earth-space',
  title: { en: 'Hertzsprung-Russell Diagram', id: 'Diagram Hertzsprung-Russell' },
  description: {
    en: "Plot stars by surface temperature and luminosity. The main sequence, red giants, supergiants, and white dwarfs all live on different parts of the diagram. Drag a star's mass and watch it slide along its life path.",
    id: 'Plot bintang berdasarkan suhu permukaan dan luminositas. Deret utama, raksasa merah, super-raksasa, dan katai putih menempati bagian berbeda. Atur massa sebuah bintang dan amati ia bergerak di sepanjang jejak hidupnya.',
  },
  objectives: {
    en: [
      'Read the unusual axes of an HR diagram (T decreases rightward).',
      'Identify main-sequence vs giant vs dwarf populations.',
      'Predict a star\'s fate from its initial mass.',
    ],
    id: [
      'Membaca sumbu tidak biasa pada diagram HR (T berkurang ke kanan).',
      'Mengenali populasi deret utama vs raksasa vs katai.',
      'Memprediksi nasib sebuah bintang dari massa awalnya.',
    ],
  },
  tryThis: {
    en: [
      'Set mass to 1 M☉ — find the Sun on the main sequence.',
      'Increase mass to 10 M☉ — does the star get hotter and brighter?',
      'Watch a 1 M☉ star evolve to red giant then white dwarf.',
    ],
    id: [
      'Atur massa ke 1 M☉ — temukan Matahari di deret utama.',
      'Naikkan massa ke 10 M☉ — apakah bintang lebih panas dan lebih terang?',
      'Amati bintang 1 M☉ berevolusi menjadi raksasa merah lalu katai putih.',
    ],
  },
  topics: ['astronomy', 'stars'],
  load: () => import('./sim.js'),
};
