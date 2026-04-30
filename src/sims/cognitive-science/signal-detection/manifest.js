export default {
  id: 'signal-detection',
  subject: 'cognitive-science',
  title: { en: 'Signal Detection Theory', id: 'Teori Deteksi Sinyal' },
  description: {
    en: 'Two overlapping distributions: noise alone (no signal) vs noise + signal. The observer picks a criterion β; everything to the right is judged "yes, signal present". Drag β and watch hits, misses, false alarms, and correct rejections rebalance. d′ measures sensitivity; ROC traces the trade-off.',
    id: 'Dua distribusi tumpang tindih: noise saja vs noise + sinyal. Pengamat memilih kriteria β; semua di kanan dinilai "ya, ada sinyal". Geser β dan amati hit, miss, false alarm, dan correct rejection berubah. d′ mengukur sensitivitas; ROC menelusuri trade-off.',
  },
  objectives: {
    en: [
      'Apply d′ = (μ_signal − μ_noise) / σ as the sensitivity measure.',
      'Read the four cells of the confusion table from the criterion shift.',
      'Trace the ROC curve as β sweeps from strict to liberal.',
    ],
    id: [
      'Menerapkan d′ = (μ_sinyal − μ_noise) / σ sebagai ukuran sensitivitas.',
      'Membaca empat sel tabel konfusi dari geser kriteria.',
      'Menelusuri kurva ROC saat β menyapu dari ketat ke longgar.',
    ],
  },
  tryThis: {
    en: [
      'd′ = 1 — moderate overlap; β controls trade-off.',
      'd′ = 3 — distributions barely overlap; easy task.',
      'd′ = 0 — pure guessing; ROC is the diagonal.',
    ],
    id: [
      'd′ = 1 — tumpang tindih sedang; β mengatur trade-off.',
      'd′ = 3 — distribusi hampir tak tumpang tindih; tugas mudah.',
      'd′ = 0 — tebak murni; ROC adalah diagonal.',
    ],
  },
  topics: ['perception', 'decision-theory'],
  load: () => import('./sim.js'),
};
