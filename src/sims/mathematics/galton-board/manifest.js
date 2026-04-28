export default {
  id: 'galton-board',
  subject: 'mathematics',
  title: { en: 'Galton Board (Quincunx)', id: 'Papan Galton (Quincunx)' },
  description: {
    en: 'Drop balls onto a triangle of pegs. At each peg the ball goes left or right with equal probability. The histogram at the bottom — a binomial distribution — converges on a perfect Gaussian as more balls fall. The central limit theorem made beautifully physical.',
    id: 'Jatuhkan bola ke segitiga pasak. Pada tiap pasak bola pergi kiri atau kanan dengan probabilitas sama. Histogram di bawah — distribusi binomial — menyatu menjadi Gauss sempurna saat lebih banyak bola jatuh. Teorema limit pusat dibuat fisik dan indah.',
  },
  objectives: {
    en: [
      'See binomial distribution emerge from independent coin flips.',
      'Connect the bell curve to the central limit theorem.',
      'Verify variance scales with number of rows.',
    ],
    id: [
      'Melihat distribusi binomial muncul dari pelemparan koin independen.',
      'Mengaitkan kurva lonceng dengan teorema limit pusat.',
      'Memverifikasi varians sebanding dengan jumlah baris.',
    ],
  },
  tryThis: {
    en: [
      'Drop 1000 balls — does the histogram look Gaussian?',
      'Bias the coin to 70% — does the peak shift?',
      'More rows — wider distribution?',
    ],
    id: [
      'Jatuhkan 1000 bola — apakah histogram tampak seperti Gauss?',
      'Bias koin ke 70% — apakah puncak bergeser?',
      'Lebih banyak baris — distribusi lebih lebar?',
    ],
  },
  topics: ['probability', 'distributions'],
  load: () => import('./sim.js'),
};
