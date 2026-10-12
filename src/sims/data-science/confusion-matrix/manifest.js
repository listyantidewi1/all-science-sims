export default {
  id: 'confusion-matrix',
  subject: 'data-science',
  title: { en: 'Confusion Matrix & ROC', id: 'Matriks Konfusi & ROC' },
  description: {
    en: 'Slide a classifier threshold across two overlapping populations and watch the confusion matrix and ROC curve update. See the precision-recall trade-off in motion.',
    id: 'Geser ambang klasifikasi pada dua populasi yang tumpang tindih, lalu amati matriks konfusi dan kurva ROC ikut berubah. Lihat trade-off presisi-recall secara langsung.',
  },
  details: () => import('./details.js'),
  topics: ['classification', 'metrics'],
  grade: [11, 12, 13],
  hasLab: true,
  load: () => import('./sim.js'),
};
