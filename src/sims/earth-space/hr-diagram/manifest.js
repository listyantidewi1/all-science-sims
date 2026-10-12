export default {
  id: 'hr-diagram',
  subject: 'earth-space',
  title: { en: 'Hertzsprung-Russell Diagram', id: 'Diagram Hertzsprung-Russell' },
  description: {
    en: "Plot stars by surface temperature and luminosity. The main sequence, red giants, supergiants, and white dwarfs all live on different parts of the diagram. Drag a star's mass and watch it slide along its life path.",
    id: 'Plot bintang berdasarkan suhu permukaan dan luminositas. Deret utama, raksasa merah, super-raksasa, dan katai putih menempati bagian berbeda. Atur massa sebuah bintang dan amati ia bergerak di sepanjang jejak hidupnya.',
  },
  details: () => import('./details.js'),
  topics: ['astronomy', 'stars'],
  grade: [10, 11, 12],
  load: () => import('./sim.js'),
};
