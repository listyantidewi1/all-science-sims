export default {
  id: 'lenses',
  subject: 'physics',
  title: { en: 'Lenses & Refraction', id: 'Lensa & Pembiasan' },
  description: {
    en: 'Drag the object and the lens to explore image formation in a converging or diverging lens. Three principal rays trace the path; the image moves, flips, and grows in real time.',
    id: 'Seret benda dan lensa untuk mengeksplorasi pembentukan bayangan oleh lensa konvergen atau divergen. Tiga sinar utama menelusuri jejak cahaya; bayangan ikut bergerak, terbalik, dan membesar.',
  },
  details: () => import('./details.js'),
  topics: ['optics', 'lenses'],
  grade: [9, 10, 11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
