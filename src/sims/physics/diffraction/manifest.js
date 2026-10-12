export default {
  id: 'diffraction',
  subject: 'physics',
  title: { en: 'Diffraction & Interference', id: 'Difraksi & Interferensi' },
  description: {
    en: 'Send a wave through one or many slits and watch the bands of light and dark form on a screen. Slide slit width, separation, and wavelength to make patterns sharpen, spread, or wash out.',
    id: 'Kirimkan gelombang melalui satu atau banyak celah dan amati pita terang dan gelap terbentuk di layar. Atur lebar celah, jarak antar celah, dan panjang gelombang untuk membuat pola menajam, melebar, atau memudar.',
  },
  details: () => import('./details.js'),
  topics: ['waves', 'optics'],
  grade: [11, 12, 13],
  hasLab: true,
  load: () => import('./sim.js'),
};
