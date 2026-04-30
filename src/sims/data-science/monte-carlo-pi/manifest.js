export default {
  id: 'monte-carlo-pi',
  subject: 'data-science',
  title: { en: 'Monte Carlo: Estimate π', id: 'Monte Carlo: Memperkirakan π' },
  description: {
    en: 'Throw darts at random into a square containing a quarter circle. The fraction landing inside the circle, times 4, converges on π. The simplest possible Monte Carlo method, watchable.',
    id: 'Lemparkan anak panah secara acak ke dalam persegi yang berisi seperempat lingkaran. Fraksi yang jatuh di dalam lingkaran, dikalikan 4, mendekati π. Metode Monte Carlo paling sederhana, terlihat langsung.',
  },
  objectives: {
    en: [
      'See randomness used to estimate a deterministic constant.',
      'Recognize that error shrinks as 1/√N.',
      'Compare to the actual value of π.',
    ],
    id: [
      'Melihat keacakan dipakai untuk memperkirakan konstanta deterministik.',
      'Mengenali bahwa galat menyusut sebanding 1/√N.',
      'Membandingkan dengan nilai π sesungguhnya.',
    ],
  },
  tryThis: {
    en: [
      'Throw 100 darts — how close to π?',
      'Throw 100,000 darts — how many digits stable?',
      'Estimate the error and compare to 1/√N.',
    ],
    id: [
      'Lempar 100 anak panah — sedekat apa ke π?',
      'Lempar 100.000 anak panah — berapa digit yang stabil?',
      'Perkirakan galatnya dan bandingkan dengan 1/√N.',
    ],
  },
  topics: ['probability', 'sampling'],
  hasLab: true,
  load: () => import('./sim.js'),
};
