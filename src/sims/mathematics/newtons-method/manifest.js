export default {
  id: 'newtons-method',
  subject: 'mathematics',
  title: { en: "Newton's Method for Roots", id: 'Metode Newton untuk Akar' },
  description: {
    en: "Click anywhere to drop a starting guess. Each iteration follows the tangent line down to the x-axis and uses that intersection as the next guess. Convergence is dazzling near a root — and surprisingly bad far from one.",
    id: 'Klik di mana saja untuk menjatuhkan tebakan awal. Tiap iterasi mengikuti garis singgung ke sumbu-x dan memakai perpotongan itu sebagai tebakan berikutnya. Konvergensi memesona dekat akar — dan terkejut buruk jauh dari akar.',
  },
  details: () => import('./details.js'),
  topics: ['numerical', 'roots'],
  grade: [12, 13],
  hasLab: true,
  load: () => import('./sim.js'),
};
