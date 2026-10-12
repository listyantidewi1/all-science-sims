export default {
  id: 'hookes-law',
  subject: 'physics',
  title: { en: "Hooke's Law", id: 'Hukum Hooke' },
  description: {
    en: 'Hang a weight on a spring; the spring stretches a distance proportional to the force. Drag the mass and watch the F-vs-x graph trace out the linear law F = kx. Compare three springs with different stiffnesses (soft, medium, stiff) on the same axes.',
    id: 'Gantungkan beban pada pegas; pegas memanjang sebanding dengan gaya. Geser massa dan amati grafik F-vs-x menelusuri hukum linear F = kx. Bandingkan tiga pegas dengan kekakuan berbeda (lunak, sedang, kaku) pada sumbu yang sama.',
  },
  details: () => import('./details.js'),
  topics: ['mechanics', 'forces'],
  grade: [8, 9, 10, 11],
  hasLab: true,
  load: () => import('./sim.js'),
};
