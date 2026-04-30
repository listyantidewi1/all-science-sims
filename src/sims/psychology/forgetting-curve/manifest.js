export default {
  id: 'forgetting-curve',
  subject: 'psychology',
  title: { en: 'Ebbinghaus Forgetting Curve', id: 'Kurva Lupa Ebbinghaus' },
  description: {
    en: 'Memory fades exponentially without rehearsal — the original 1885 finding from Hermann Ebbinghaus. Add review sessions ("spaced repetition") and watch how each refresh resets retention; the curve gets shallower with each repetition. Drag review timings to design your own study schedule.',
    id: 'Memori meluruh eksponensial tanpa pengulangan — temuan Hermann Ebbinghaus 1885. Tambah sesi tinjauan ("pengulangan terjadwal") dan amati bagaimana setiap penyegaran mereset retensi; kurva makin landai tiap pengulangan. Geser waktu tinjauan untuk merancang jadwal belajar.',
  },
  objectives: {
    en: [
      'See exponential decay R(t) = e^(−t/τ).',
      'Understand why spaced repetition produces deeper retention.',
      'Design a review schedule that keeps retention above 80%.',
    ],
    id: [
      'Melihat peluruhan eksponensial R(t) = e^(−t/τ).',
      'Memahami mengapa pengulangan terjadwal menghasilkan retensi lebih dalam.',
      'Merancang jadwal tinjauan yang menjaga retensi di atas 80%.',
    ],
  },
  tryThis: {
    en: [
      'No reviews — retention drops to ~20% in a few days.',
      'Reviews at 1 hr, 1 day, 3 days — classic spaced-repetition schedule.',
      'Closely-spaced reviews — diminishing returns.',
    ],
    id: [
      'Tanpa tinjauan — retensi turun ~20% dalam beberapa hari.',
      'Tinjauan di 1 jam, 1 hari, 3 hari — jadwal pengulangan terjadwal klasik.',
      'Tinjauan terlalu rapat — hasil berkurang.',
    ],
  },
  topics: ['memory', 'learning'],
  hasLab: true,
  load: () => import('./sim.js'),
};
