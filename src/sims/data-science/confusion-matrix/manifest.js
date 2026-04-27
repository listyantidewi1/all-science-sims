export default {
  id: 'confusion-matrix',
  subject: 'data-science',
  title: { en: 'Confusion Matrix & ROC', id: 'Matriks Konfusi & ROC' },
  description: {
    en: 'Slide a classifier threshold across two overlapping populations and watch the confusion matrix and ROC curve update. See the precision-recall trade-off in motion.',
    id: 'Geser ambang klasifikasi pada dua populasi yang tumpang tindih, lalu amati matriks konfusi dan kurva ROC ikut berubah. Lihat trade-off presisi-recall secara langsung.',
  },
  objectives: {
    en: [
      'Define accuracy, precision, recall, and F1.',
      'Read a ROC curve and the meaning of AUC.',
      'See why the same classifier needs different thresholds in different applications.',
    ],
    id: [
      'Mendefinisikan akurasi, presisi, recall, dan F1.',
      'Membaca kurva ROC dan arti AUC.',
      'Melihat mengapa pengklasifikasi yang sama memerlukan ambang berbeda untuk aplikasi berbeda.',
    ],
  },
  tryThis: {
    en: [
      'Move the threshold low — high recall, low precision.',
      'Increase class overlap — what happens to AUC?',
      'Pick a threshold that maximizes F1.',
    ],
    id: [
      'Geser ambang rendah — recall tinggi, presisi rendah.',
      'Naikkan tumpang tindih kelas — apa yang terjadi pada AUC?',
      'Pilih ambang yang memaksimalkan F1.',
    ],
  },
  topics: ['classification', 'metrics'],
  load: () => import('./sim.js'),
};
