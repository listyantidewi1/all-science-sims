export default {
  id: 'magnetic-field',
  subject: 'physics',
  title: { en: 'Magnetic Field around a Wire', id: 'Medan Magnet di Sekitar Kawat' },
  description: {
    en: 'A wire carrying current generates concentric circles of magnetic field around it. Slide the current and watch arrow density grow; flip its direction and every arrow flips with it. The right-hand rule, made obvious.',
    id: 'Kawat berarus menghasilkan lingkaran konsentrik medan magnet di sekitarnya. Atur arus dan amati kerapatan panah meningkat; balikkan arah arus dan semua panah ikut berbalik. Aturan tangan kanan, terlihat.',
  },
  objectives: {
    en: [
      'Apply B = μ₀I / (2πr).',
      'Use right-hand rule: thumb along current, fingers curl in field direction.',
      'See B fall off as 1/r from the wire.',
    ],
    id: [
      'Menerapkan B = μ₀I / (2πr).',
      'Menggunakan aturan tangan kanan: ibu jari sepanjang arus, jari melengkung di arah medan.',
      'Melihat B menurun sebagai 1/r dari kawat.',
    ],
  },
  tryThis: {
    en: [
      'Double current — does field strength double?',
      'Move twice as far away — half the field?',
      'Flip current direction — does field flip too?',
    ],
    id: [
      'Gandakan arus — apakah kuat medan menjadi dua kali lipat?',
      'Bergerak dua kali lebih jauh — setengah medan?',
      'Balikkan arah arus — apakah medan ikut berbalik?',
    ],
  },
  topics: ['electromagnetism', 'magnetism'],
  load: () => import('./sim.js'),
};
