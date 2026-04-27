export default {
  id: 'k-means',
  subject: 'data-science',
  title: { en: 'K-Means Clustering', id: 'Klastering K-Means' },
  description: {
    en: 'Click to drop points, choose k, and step through the assign-and-update algorithm one iteration at a time. Watch centroids drift to the cluster centers.',
    id: 'Klik untuk menempatkan titik, pilih k, dan jalankan algoritma assign-and-update satu iterasi pada satu waktu. Amati centroid bergeser ke pusat klaster.',
  },
  objectives: {
    en: [
      'Explain the assign and update steps of k-means.',
      'See how initialization affects the final clusters.',
      'Recognize when k-means struggles (non-spherical clusters).',
    ],
    id: [
      'Menjelaskan langkah penugasan dan pembaruan pada k-means.',
      'Melihat bagaimana inisialisasi memengaruhi klaster akhir.',
      'Mengenali kasus k-means kesulitan (klaster bukan bola).',
    ],
  },
  tryThis: {
    en: [
      'Make 3 obvious blobs and run k=3 — does it converge in one round?',
      'Pick a bad initial seed — does it land in a worse local minimum?',
      'Try k=2 on data that really has 4 clusters.',
    ],
    id: [
      'Buat 3 gumpalan yang jelas dan jalankan k=3 — apakah selesai dalam 1 putaran?',
      'Pilih posisi awal yang buruk — apakah berakhir di minimum lokal yang lebih buruk?',
      'Coba k=2 pada data yang sebenarnya berisi 4 klaster.',
    ],
  },
  topics: ['clustering', 'unsupervised'],
  grade: [11, 12],
  load: () => import('./sim.js'),
};
