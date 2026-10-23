export default {
  id: 'linear-binary-search',
  subject: 'computer-science',
  title: { en: 'Linear vs Binary Search', id: 'Pencarian Linear vs Biner' },
  description: {
    en: 'Two real Python programs race to find a name or a number in the same row of cards. Linear search checks the cards one by one from the front; binary search checks the middle card and throws away the half that cannot hold the target. Step through both side by side with the matching Python and pseudocode lines lit up, count the comparisons, watch binary search fail on unsorted cards, and compare the worst cases n and ⌊log₂ n⌋ + 1 on a chart as the list grows.',
    id: 'Dua program Python sungguhan berlomba mencari sebuah nama atau angka pada deretan kartu yang sama. Pencarian linear memeriksa kartu satu per satu dari depan; pencarian biner memeriksa kartu tengah lalu membuang separuh yang tidak mungkin berisi target. Jalankan keduanya berdampingan langkah demi langkah dengan baris Python dan pseudocode yang menyala, hitung perbandingannya, saksikan pencarian biner gagal pada kartu yang tidak urut, dan bandingkan kasus terburuk n dan ⌊log₂ n⌋ + 1 pada grafik ketika daftar bertambah panjang.',
  },
  topics: ['algorithms', 'searching', 'efficiency', 'python', 'pseudocode'],
  grade: [9, 10, 11, 12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
