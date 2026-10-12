export default {
  id: 'signal-detection',
  subject: 'cognitive-science',
  title: { en: 'Signal Detection Theory', id: 'Teori Deteksi Sinyal' },
  description: {
    en: 'Two overlapping distributions: noise alone (no signal) vs noise + signal. The observer picks a criterion β; everything to the right is judged "yes, signal present". Drag β and watch hits, misses, false alarms, and correct rejections rebalance. d′ measures sensitivity; ROC traces the trade-off.',
    id: 'Dua distribusi tumpang tindih: noise saja vs noise + sinyal. Pengamat memilih kriteria β; semua di kanan dinilai "ya, ada sinyal". Geser β dan amati hit, miss, false alarm, dan correct rejection berubah. d′ mengukur sensitivitas; ROC menelusuri trade-off.',
  },
  details: () => import('./details.js'),
  topics: ['perception', 'decision-theory'],
  grade: [12, 13],
  load: () => import('./sim.js'),
};
