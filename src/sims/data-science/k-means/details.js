// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
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
  },  tryThis: {
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
  },};
