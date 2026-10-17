export default {
  id: 'double-slit',
  subject: 'physics',
  title: { en: "Young's Double Slit", id: 'Celah Ganda Young' },
  description: {
    en: 'Shine monochromatic light of a chosen wavelength through two narrow slits and watch the interference fringes build up on a screen, column by column, from the real intensity formula. Change the slit separation d, the wavelength λ, the screen distance L and the slit width, then drag two markers along the screen to measure the fringe spacing and compare it with Δy = λL/d. A white-light option overlays every colour of the spectrum.',
    id: 'Sinari dua celah sempit dengan cahaya monokromatik berpanjang gelombang pilihanmu dan amati pola interferensi yang terbentuk di layar, kolom demi kolom, dari rumus intensitas sesungguhnya. Ubah jarak antar celah d, panjang gelombang λ, jarak layar L, dan lebar celah, lalu geser dua penanda di sepanjang layar untuk mengukur jarak antar pita terang dan membandingkannya dengan Δy = λL/d. Pilihan cahaya putih menumpangkan semua warna spektrum.',
  },
  topics: ['light', 'interference', 'diffraction', 'wave optics'],
  grade: [11, 12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
