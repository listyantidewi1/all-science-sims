export default {
  id: 'galton-board',
  subject: 'mathematics',
  title: { en: 'Galton Board (Quincunx)', id: 'Papan Galton (Quincunx)' },
  description: {
    en: 'Drop balls onto a triangle of pegs. At each peg the ball goes left or right with equal probability. The histogram at the bottom — a binomial distribution — converges on a perfect Gaussian as more balls fall. The central limit theorem made beautifully physical.',
    id: 'Jatuhkan bola ke segitiga pasak. Pada tiap pasak bola pergi kiri atau kanan dengan probabilitas sama. Histogram di bawah — distribusi binomial — menyatu menjadi Gauss sempurna saat lebih banyak bola jatuh. Teorema limit pusat dibuat fisik dan indah.',
  },
  details: () => import('./details.js'),
  topics: ['probability', 'distributions'],
  hasLab: true,
  load: () => import('./sim.js'),
};
