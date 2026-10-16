export default {
  id: 'wave-anatomy',
  subject: 'physics',
  title: { en: 'Wave Anatomy', id: 'Anatomi Gelombang' },
  description: {
    en: 'A transverse wave on a rope and a longitudinal wave in a spring run side by side from the same source. Change the amplitude, frequency and wave speed, read off the period and wavelength λ = v/f, pause the motion and measure crests, troughs, compressions and rarefactions with a draggable ruler.',
    id: 'Gelombang transversal pada tali dan gelombang longitudinal pada pegas berjalan berdampingan dari sumber yang sama. Ubah amplitudo, frekuensi dan cepat rambat, baca periode dan panjang gelombang λ = v/f, jeda geraknya dan ukur puncak, lembah, rapatan dan renggangan dengan penggaris yang dapat digeser.',
  },
  topics: ['waves', 'oscillation', 'wavelength', 'frequency'],
  grade: [8, 9, 10],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
