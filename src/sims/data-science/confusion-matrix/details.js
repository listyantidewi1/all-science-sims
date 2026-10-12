// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
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
  },  tryThis: {
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
  },};
