export default {
  id: 'magnetic-field',
  subject: 'physics',
  title: { en: 'Magnetic Field around a Wire', id: 'Medan Magnet di Sekitar Kawat' },
  description: {
    en: 'A wire carrying current generates concentric circles of magnetic field around it. Slide the current and watch arrow density grow; flip its direction and every arrow flips with it. The right-hand rule, made obvious.',
    id: 'Kawat berarus menghasilkan lingkaran konsentrik medan magnet di sekitarnya. Atur arus dan amati kerapatan panah meningkat; balikkan arah arus dan semua panah ikut berbalik. Aturan tangan kanan, terlihat.',
  },
  details: () => import('./details.js'),
  topics: ['electromagnetism', 'magnetism'],
  grade: [10, 11, 12],
  load: () => import('./sim.js'),
};
