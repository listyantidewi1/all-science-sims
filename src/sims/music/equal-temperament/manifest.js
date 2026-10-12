export default {
  id: 'equal-temperament',
  subject: 'music',
  title: { en: 'Equal Temperament vs Just Intonation', id: 'Temperamen Sama vs Intonasi Murni' },
  description: {
    en: 'A piano is tuned in 12-tone equal temperament: every semitone is exactly 2^(1/12). But the simple ratios our ears love (3:2 fifth, 5:4 third) are slightly off. See — and hear — the cents-difference for each interval, and the surprising mismatch hidden in every modern keyboard.',
    id: 'Piano disetel dengan temperamen sama 12 nada: tiap semiton tepat 2^(1/12). Tetapi rasio sederhana yang disukai telinga (5:4 untuk terts mayor, 3:2 untuk kuint) sedikit berbeda. Lihat — dan dengar — selisih cents untuk tiap interval, ketidakcocokan tersembunyi di setiap keyboard modern.',
  },
  details: () => import('./details.js'),
  topics: ['acoustics', 'tuning'],
  grade: [10, 11, 12, 13],
  load: () => import('./sim.js'),
};
