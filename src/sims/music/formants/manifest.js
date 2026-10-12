export default {
  id: 'formants',
  subject: 'music',
  title: { en: 'Vowel Formants', id: 'Forman Vokal' },
  description: {
    en: 'Vowels are sculpted by two resonant peaks in the vocal tract — the first two formants F1 and F2. Drag the orange dot in F1-F2 space and listen as the vowel morphs between /i/, /e/, /a/, /o/, /u/. Each language carves a different region of this map; this is how speech recognition starts.',
    id: 'Vokal dibentuk oleh dua puncak resonansi di saluran suara — forman pertama dan kedua F1 dan F2. Tarik titik oranye di ruang F1-F2 dan dengar vokal berubah antara /i/, /e/, /a/, /o/, /u/. Tiap bahasa mengukir wilayah berbeda di peta ini; ini awal pengenalan ucapan.',
  },
  details: () => import('./details.js'),
  topics: ['acoustics', 'speech'],
  load: () => import('./sim.js'),
};
