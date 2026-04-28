export default {
  id: 'newtons-method',
  subject: 'mathematics',
  title: { en: "Newton's Method for Roots", id: 'Metode Newton untuk Akar' },
  description: {
    en: "Click anywhere to drop a starting guess. Each iteration follows the tangent line down to the x-axis and uses that intersection as the next guess. Convergence is dazzling near a root — and surprisingly bad far from one.",
    id: 'Klik di mana saja untuk menjatuhkan tebakan awal. Tiap iterasi mengikuti garis singgung ke sumbu-x dan memakai perpotongan itu sebagai tebakan berikutnya. Konvergensi memesona dekat akar — dan terkejut buruk jauh dari akar.',
  },
  objectives: {
    en: [
      "Apply x_{n+1} = x_n − f(x_n)/f'(x_n).",
      'Compare quadratic convergence near a root vs slow start far away.',
      'See cycles, divergence, and basins of attraction.',
    ],
    id: [
      "Menerapkan x_{n+1} = x_n − f(x_n)/f'(x_n).",
      'Membandingkan konvergensi kuadratik dekat akar vs awal lambat di kejauhan.',
      'Melihat siklus, divergensi, dan basin of attraction.',
    ],
  },
  tryThis: {
    en: [
      'Click near a root — usually 3-4 iterations.',
      "Click far away — does it overshoot or settle on the wrong root?",
      "Try f(x) = x³ - x — three roots, three basins.",
    ],
    id: [
      'Klik dekat akar — biasanya 3-4 iterasi.',
      'Klik jauh — apakah melompati atau menetap di akar yang salah?',
      'Coba f(x) = x³ - x — tiga akar, tiga basin.',
    ],
  },
  topics: ['numerical', 'roots'],
  load: () => import('./sim.js'),
};
