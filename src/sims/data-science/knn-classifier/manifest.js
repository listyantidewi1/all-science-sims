export default {
  id: 'knn-classifier',
  subject: 'data-science',
  title: { en: 'k-Nearest Neighbours', id: 'k-Tetangga Terdekat' },
  description: {
    en: 'Drag a query point across a two-class dataset and watch the k-nearest-neighbours classifier look up its k closest training points and take a vote. Change k from 1 to 15 and see the decision boundary go from jagged (memorising every point) to smooth (ignoring real structure). A held-out test set and an accuracy-versus-k curve show where the sweet spot is for blobs, moons and overlapping data.',
    id: 'Geser sebuah titik kueri melintasi dataset dua kelas dan lihat pengklasifikasi k-tetangga terdekat mencari k titik latih terdekatnya lalu mengambil suara. Ubah k dari 1 sampai 15 dan lihat batas keputusan berubah dari bergerigi (menghafal setiap titik) menjadi mulus (mengabaikan struktur yang nyata). Himpunan uji yang disisihkan dan kurva akurasi terhadap k menunjukkan di mana titik terbaiknya untuk data gumpalan, bulan sabit dan tumpang tindih.',
  },
  topics: ['machine learning', 'classification', 'k-nearest neighbours', 'overfitting', 'train/test split'],
  grade: [10, 11, 12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
