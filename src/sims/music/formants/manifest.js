export default {
  id: 'formants',
  subject: 'music',
  title: { en: 'Vowel Formants', id: 'Forman Vokal' },
  description: {
    en: 'Vowels are sculpted by two resonant peaks in the vocal tract — the first two formants F1 and F2. Drag the orange dot in F1-F2 space and listen as the vowel morphs between /i/, /e/, /a/, /o/, /u/. Each language carves a different region of this map; this is how speech recognition starts.',
    id: 'Vokal dibentuk oleh dua puncak resonansi di saluran suara — forman pertama dan kedua F1 dan F2. Tarik titik oranye di ruang F1-F2 dan dengar vokal berubah antara /i/, /e/, /a/, /o/, /u/. Tiap bahasa mengukir wilayah berbeda di peta ini; ini awal pengenalan ucapan.',
  },
  objectives: {
    en: [
      'Connect F1 (mouth opening) and F2 (tongue position) to vowel identity.',
      'See why /i/ and /u/ sit at opposite corners of the formant map.',
      'Understand how source-filter synthesis builds vowels from a buzz + two peaks.',
    ],
    id: [
      'Menghubungkan F1 (bukaan mulut) dan F2 (posisi lidah) dengan identitas vokal.',
      'Melihat mengapa /i/ dan /u/ berada di sudut berlawanan peta forman.',
      'Memahami sintesis source-filter membangun vokal dari buzz + dua puncak.',
    ],
  },
  tryThis: {
    en: [
      'Drag to F1 ≈ 800, F2 ≈ 1200 — that is /a/ ("ah").',
      'Drag to F1 ≈ 300, F2 ≈ 2300 — that is /i/ ("ee").',
      'Drag to F1 ≈ 300, F2 ≈ 700 — that is /u/ ("oo").',
    ],
    id: [
      'Geser ke F1 ≈ 800, F2 ≈ 1200 — itu /a/.',
      'Geser ke F1 ≈ 300, F2 ≈ 2300 — itu /i/.',
      'Geser ke F1 ≈ 300, F2 ≈ 700 — itu /u/.',
    ],
  },
  topics: ['acoustics', 'speech'],
  load: () => import('./sim.js'),
};
