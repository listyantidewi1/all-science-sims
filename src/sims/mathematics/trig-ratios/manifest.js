export default {
  id: 'trig-ratios',
  subject: 'mathematics',
  title: { en: 'Trigonometric Ratios', id: 'Perbandingan Trigonometri' },
  description: {
    en: 'Drag the vertices of a right triangle and watch the sides relabel themselves as opposite, adjacent and hypotenuse for the angle you choose, while sin, cos and tan update live as ratios of those sides. Snap to 30°, 45° and 60° to see the exact values with square roots, then switch to the clinometer mode and measure the height of a tree from your distance and the angle of elevation.',
    id: 'Seret titik sudut segitiga siku-siku dan lihat sisi-sisinya berganti nama menjadi sisi depan, sisi samping dan sisi miring untuk sudut yang kamu pilih, sementara sin, cos dan tan diperbarui langsung sebagai perbandingan sisi-sisi itu. Kunci ke 30°, 45° dan 60° untuk melihat nilai eksak dengan akar, lalu beralih ke mode klinometer dan ukur tinggi pohon dari jarakmu dan sudut elevasi.',
  },
  topics: ['trigonometry', 'sine', 'cosine', 'tangent', 'right triangle', 'angle of elevation'],
  grade: [10],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
