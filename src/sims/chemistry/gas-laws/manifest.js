export default {
  id: 'gas-laws',
  subject: 'chemistry',
  title: { en: 'Ideal Gas Law', id: 'Hukum Gas Ideal' },
  description: {
    en: 'Particles bounce in a sealed box. Tune temperature, volume, and particle count and watch pressure (collision rate on the walls) respond exactly as PV = nRT predicts.',
    id: 'Partikel memantul dalam kotak tertutup. Atur suhu, volume, dan jumlah partikel lalu amati tekanan (laju tumbukan ke dinding) merespons persis seperti diprediksi PV = nRT.',
  },
  objectives: {
    en: [
      'Relate temperature to average particle kinetic energy.',
      'See Boyle\'s law (P↑ as V↓) and Charles\'s law (V↑ as T↑) emerge.',
      'Predict the effect of changing each variable on pressure.',
    ],
    id: [
      'Mengaitkan suhu dengan energi kinetik rata-rata partikel.',
      'Melihat hukum Boyle (P↑ saat V↓) dan hukum Charles (V↑ saat T↑) muncul.',
      'Memprediksi efek perubahan tiap variabel terhadap tekanan.',
    ],
  },
  tryThis: {
    en: [
      'Halve the volume — does pressure roughly double?',
      'Double the temperature — by how much does pressure rise?',
      'Find a (T, V) combination that keeps pressure constant when n changes.',
    ],
    id: [
      'Setengahkan volume — apakah tekanan menjadi sekitar dua kali lipat?',
      'Gandakan suhu — berapa besar kenaikan tekanannya?',
      'Cari kombinasi (T, V) yang menjaga tekanan tetap saat n diubah.',
    ],
  },
  topics: ['gases', 'thermodynamics'],
  grade: [10, 11],
  load: () => import('./sim.js'),
};
