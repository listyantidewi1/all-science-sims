export default {
  id: 'diffraction',
  subject: 'physics',
  title: { en: 'Diffraction & Interference', id: 'Difraksi & Interferensi' },
  description: {
    en: 'Send a wave through one or many slits and watch the bands of light and dark form on a screen. Slide slit width, separation, and wavelength to make patterns sharpen, spread, or wash out.',
    id: 'Kirimkan gelombang melalui satu atau banyak celah dan amati pita terang dan gelap terbentuk di layar. Atur lebar celah, jarak antar celah, dan panjang gelombang untuk membuat pola menajam, melebar, atau memudar.',
  },
  objectives: {
    en: [
      'Apply d sin θ = mλ for the maxima of multi-slit interference.',
      'See how slit width controls envelope, separation controls spacing.',
      'Recognize the single-slit diffraction sinc² pattern.',
    ],
    id: [
      'Menerapkan d sin θ = mλ untuk maksimum interferensi banyak-celah.',
      'Melihat bahwa lebar celah mengendalikan amplop, jarak celah mengendalikan rapatan pita.',
      'Mengenali pola sinc² difraksi celah tunggal.',
    ],
  },
  tryThis: {
    en: [
      'Use 1 slit very narrow — see the broad central peak.',
      'Use 2 slits — count fringes inside the envelope.',
      'Switch to red vs blue light — which spreads further?',
    ],
    id: [
      'Gunakan 1 celah sangat sempit — amati puncak pusat yang lebar.',
      'Gunakan 2 celah — hitung jumlah pita di dalam amplop.',
      'Beralih cahaya merah vs biru — mana yang melebar lebih jauh?',
    ],
  },
  topics: ['waves', 'optics'],
  load: () => import('./sim.js'),
};
