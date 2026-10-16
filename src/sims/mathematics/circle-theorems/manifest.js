export default {
  id: 'circle-theorems',
  subject: 'mathematics',
  title: { en: 'Circle Theorems', id: 'Teorema Lingkaran' },
  description: {
    en: 'Drag points around a circle and watch the angles and lengths update live. Seven modes cover the classic theorems: an inscribed angle is half the central angle on the same arc, angles in the same segment are equal, the angle in a semicircle is 90°, opposite angles of a cyclic quadrilateral add to 180°, a tangent is perpendicular to the radius and makes the alternate-segment angle with a chord, intersecting chords have equal products, and two tangents from one point are equal. Each mode states the theorem and shows the measured check.',
    id: 'Geser titik-titik di sekeliling lingkaran dan lihat sudut serta panjang berubah secara langsung. Tujuh mode mencakup teorema klasik: sudut keliling setengah sudut pusat pada busur yang sama, sudut-sudut dalam tembereng yang sama besarnya sama, sudut dalam setengah lingkaran 90°, sudut berhadapan segi empat tali busur berjumlah 180°, garis singgung tegak lurus jari-jari dan membentuk sudut tembereng berseberangan dengan tali busur, hasil kali ruas tali busur yang berpotongan sama, serta dua garis singgung dari satu titik sama panjang. Setiap mode menyatakan teoremanya dan menampilkan pengecekan hasil pengukuran.',
  },
  topics: ['circle', 'inscribed angle', 'central angle', 'cyclic quadrilateral', 'tangent', 'chord', 'geometry'],
  grade: [11, 12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
