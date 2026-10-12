export default {
  id: 'serial-position',
  subject: 'psychology',
  title: { en: 'Serial Position Effect', id: 'Efek Posisi Serial' },
  description: {
    en: 'Study a list of words shown one at a time, then type every word you can remember. Across many lists a U-shaped curve emerges: the first few words (primacy) and the last few (recency) are recalled far better than the middle. Add a filled delay before recall and watch the recency bump collapse while primacy survives — evidence for separate short-term and long-term stores.',
    id: 'Pelajari daftar kata yang muncul satu per satu, lalu ketik setiap kata yang Anda ingat. Setelah banyak daftar muncul kurva berbentuk U: kata-kata pertama (primasi) dan terakhir (resensi) diingat jauh lebih baik daripada bagian tengah. Tambahkan jeda terisi sebelum mengingat dan amati tonjolan resensi runtuh sementara primasi bertahan — bukti adanya penyimpanan jangka pendek dan jangka panjang yang terpisah.',
  },
  details: () => import('./details.js'),
  topics: ['memory', 'cognition'],
  grade: [10, 11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
