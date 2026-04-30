export default {
  id: 'lenses',
  subject: 'physics',
  title: { en: 'Lenses & Refraction', id: 'Lensa & Pembiasan' },
  description: {
    en: 'Drag the object and the lens to explore image formation in a converging or diverging lens. Three principal rays trace the path; the image moves, flips, and grows in real time.',
    id: 'Seret benda dan lensa untuk mengeksplorasi pembentukan bayangan oleh lensa konvergen atau divergen. Tiga sinar utama menelusuri jejak cahaya; bayangan ikut bergerak, terbalik, dan membesar.',
  },
  objectives: {
    en: [
      'Apply the thin-lens equation 1/f = 1/do + 1/di.',
      'Predict whether the image is real or virtual, upright or inverted.',
      'Identify the focal length from the focal points.',
    ],
    id: [
      'Menerapkan persamaan lensa tipis 1/f = 1/so + 1/si.',
      'Memprediksi bayangan: nyata atau maya, tegak atau terbalik.',
      'Mengidentifikasi panjang fokus dari titik fokusnya.',
    ],
  },
  tryThis: {
    en: [
      'Place the object beyond 2f — what does the image look like?',
      'Move the object inside the focal length — does the image flip?',
      'Switch to a diverging lens — is the image ever real?',
    ],
    id: [
      'Letakkan benda di luar 2f — bagaimana bayangannya?',
      'Geser benda di dalam jarak fokus — apakah bayangan terbalik?',
      'Beralih ke lensa divergen — apakah bayangannya pernah nyata?',
    ],
  },
  topics: ['optics', 'lenses'],
  hasLab: true,
  load: () => import('./sim.js'),
};
