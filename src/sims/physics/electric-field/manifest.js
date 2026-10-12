export default {
  id: 'electric-field',
  subject: 'physics',
  title: { en: 'Electric Field & Charges', id: 'Medan Listrik & Muatan' },
  description: {
    en: 'Drop and drag positive and negative charges on a 2D plane and see field vectors, field lines, or equipotentials update live. Move two opposite charges close together to see a clean dipole field.',
    id: 'Letakkan dan seret muatan positif dan negatif pada bidang 2D, lalu amati vektor, garis medan, atau potensial yang langsung diperbarui. Dekatkan dua muatan berlawanan untuk melihat medan dipol yang khas.',
  },
  details: () => import('./details.js'),
  topics: ['electromagnetism', 'fields'],
  grade: [11, 12],
  load: () => import('./sim.js'),
};
