export default {
  id: 'eye-and-glasses',
  subject: 'physics',
  title: { en: 'The Eye and Corrective Lenses', id: 'Mata dan Kacamata' },
  description: {
    en: 'Look inside an eye as it tries to focus light from an object onto the retina. Stretch or shrink the eyeball to create short-sightedness or long-sightedness and watch the focus land in front of or behind the retina. Then choose a pair of glasses, in dioptres from −6 to +6, until the image is sharp again.',
    id: 'Lihat ke dalam mata yang berusaha memfokuskan cahaya dari sebuah benda ke retina. Panjangkan atau pendekkan bola mata untuk membuat rabun jauh atau rabun dekat, dan lihat titik fokus jatuh di depan atau di belakang retina. Lalu pilih kacamata, dalam dioptri dari −6 sampai +6, sampai bayangannya tajam kembali.',
  },
  topics: ['optics', 'lenses', 'human body'],
  grade: [8, 9, 10],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
