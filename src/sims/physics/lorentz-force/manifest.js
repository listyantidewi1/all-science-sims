export default {
  id: 'lorentz-force',
  subject: 'physics',
  title: { en: 'Charge in a Magnetic Field', id: 'Gaya Lorentz' },
  description: {
    en: 'Fire an electron, a proton, an alpha particle or a custom charge into a uniform magnetic field pointing into or out of the page and watch it bend into a circle of radius r = mv/(qB). Add a crossed electric field to build a velocity selector (v = E/B), then load the mass-spectrometer preset and see neon or uranium isotopes land at different radii on the detector.',
    id: 'Tembakkan elektron, proton, partikel alfa, atau muatan buatanmu ke dalam medan magnet seragam yang menembus masuk atau keluar bidang gambar dan lihat lintasannya melengkung menjadi lingkaran berjari-jari r = mv/(qB). Tambahkan medan listrik bersilangan untuk membuat pemilih kecepatan (v = E/B), lalu muat preset spektrometer massa dan lihat isotop neon atau uranium mendarat pada jari-jari yang berbeda di detektor.',
  },
  topics: ['magnetic field', 'Lorentz force', 'circular motion', 'mass spectrometer'],
  grade: [12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
