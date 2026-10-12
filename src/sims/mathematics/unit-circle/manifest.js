export default {
  id: 'unit-circle',
  subject: 'mathematics',
  title: { en: 'Unit Circle Trigonometry', id: 'Trigonometri Lingkaran Satuan' },
  description: {
    en: 'Drag the angle around the unit circle. The point\'s x-coordinate IS the cosine, the y-coordinate IS the sine, and the tangent line gives the tangent. Three functions, one geometry.',
    id: 'Seret sudut di sekeliling lingkaran satuan. Koordinat x titik ITU kosinus, koordinat y ITU sinus, dan garis singgung memberi tangen. Tiga fungsi, satu geometri.',
  },
  details: () => import('./details.js'),
  topics: ['trigonometry', 'geometry'],
  load: () => import('./sim.js'),
};
