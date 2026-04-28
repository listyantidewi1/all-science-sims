export default {
  id: 'fourier',
  subject: 'mathematics',
  title: { en: 'Fourier Series Builder', id: 'Pembangun Deret Fourier' },
  description: {
    en: 'Build a square, sawtooth, or triangle wave by adding sine waves one harmonic at a time. The Gibbs phenomenon — those persistent overshoots at sharp edges — appears for free.',
    id: 'Bangun gelombang persegi, gigi gergaji, atau segitiga dengan menambahkan gelombang sinus harmonik per harmonik. Fenomena Gibbs — overshoot yang gigih di tepi tajam — muncul gratis.',
  },
  objectives: {
    en: [
      'See that any periodic function is a sum of sines and cosines.',
      'Compare partial sums to the target with N terms.',
      'Recognize the Gibbs overshoot near discontinuities.',
    ],
    id: [
      'Melihat bahwa fungsi periodik apa pun adalah jumlah sinus dan kosinus.',
      'Membandingkan jumlah parsial dengan target untuk N suku.',
      'Mengenali overshoot Gibbs di dekat diskontinuitas.',
    ],
  },
  tryThis: {
    en: [
      'Square wave with N=1 — just a single sine.',
      'N=20 — sharp edges with persistent ripple.',
      'Switch to triangle — does it converge faster (no jumps)?',
    ],
    id: [
      'Gelombang persegi dengan N=1 — hanya satu sinus.',
      'N=20 — tepi tajam dengan riak yang gigih.',
      'Beralih ke segitiga — apakah konvergensi lebih cepat (tanpa lompatan)?',
    ],
  },
  topics: ['fourier', 'analysis'],
  load: () => import('./sim.js'),
};
