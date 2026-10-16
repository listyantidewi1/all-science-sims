export default {
  id: 'angle-relationships',
  subject: 'mathematics',
  title: { en: 'Angles on Lines', id: 'Hubungan Antar-sudut' },
  description: {
    en: 'Drag a transversal across two parallel lines and watch the eight angles update. Pick a relationship, such as corresponding, alternate or co-interior, and the matching pair lights up with its values and the rule they obey. Swing two crossing lines to see vertical angles stay equal, tear the three corners off a triangle and line them up to make 180°, then test yourself with a quiz that hides one angle.',
    id: 'Seret garis transversal melintasi dua garis sejajar dan amati kedelapan sudut berubah. Pilih sebuah hubungan, misalnya sudut sehadap, berseberangan, atau sepihak, dan pasangan yang sesuai menyala beserta nilainya dan aturan yang berlaku. Putar dua garis berpotongan untuk melihat sudut bertolak belakang tetap sama, "sobek" ketiga sudut segitiga dan susun berjajar menjadi 180°, lalu uji dirimu dengan kuis yang menyembunyikan satu sudut.',
  },
  topics: ['geometry', 'angles', 'parallel lines', 'triangles'],
  grade: [7, 8],
  hasLab: false,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
