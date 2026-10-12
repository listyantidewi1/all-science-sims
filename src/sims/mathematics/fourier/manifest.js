export default {
  id: 'fourier',
  subject: 'mathematics',
  title: { en: 'Fourier Series Builder', id: 'Pembangun Deret Fourier' },
  description: {
    en: 'Build a square, sawtooth, or triangle wave by adding sine waves one harmonic at a time. The Gibbs phenomenon — those persistent overshoots at sharp edges — appears for free.',
    id: 'Bangun gelombang persegi, gigi gergaji, atau segitiga dengan menambahkan gelombang sinus harmonik per harmonik. Fenomena Gibbs — overshoot yang gigih di tepi tajam — muncul gratis.',
  },
  details: () => import('./details.js'),
  topics: ['fourier', 'analysis'],
  load: () => import('./sim.js'),
};
