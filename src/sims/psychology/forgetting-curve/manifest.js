export default {
  id: 'forgetting-curve',
  subject: 'psychology',
  title: { en: 'Ebbinghaus Forgetting Curve', id: 'Kurva Lupa Ebbinghaus' },
  description: {
    en: 'Memory fades exponentially without rehearsal — the original 1885 finding from Hermann Ebbinghaus. Add review sessions ("spaced repetition") and watch how each refresh resets retention; the curve gets shallower with each repetition. Drag review timings to design your own study schedule.',
    id: 'Memori meluruh eksponensial tanpa pengulangan — temuan Hermann Ebbinghaus 1885. Tambah sesi tinjauan ("pengulangan terjadwal") dan amati bagaimana setiap penyegaran mereset retensi; kurva makin landai tiap pengulangan. Geser waktu tinjauan untuk merancang jadwal belajar.',
  },
  details: () => import('./details.js'),
  topics: ['memory', 'learning'],
  grade: [10, 11, 12, 13],
  hasLab: true,
  load: () => import('./sim.js'),
};
