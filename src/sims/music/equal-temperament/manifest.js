export default {
  id: 'equal-temperament',
  subject: 'music',
  title: { en: 'Equal Temperament vs Just Intonation', id: 'Temperamen Sama vs Intonasi Murni' },
  description: {
    en: 'A piano is tuned in 12-tone equal temperament: every semitone is exactly 2^(1/12). But the simple ratios our ears love (3:2 fifth, 5:4 third) are slightly off. See — and hear — the cents-difference for each interval, and the surprising mismatch hidden in every modern keyboard.',
    id: 'Piano disetel dengan temperamen sama 12 nada: tiap semiton tepat 2^(1/12). Tetapi rasio sederhana yang disukai telinga (5:4 untuk terts mayor, 3:2 untuk kuint) sedikit berbeda. Lihat — dan dengar — selisih cents untuk tiap interval, ketidakcocokan tersembunyi di setiap keyboard modern.',
  },
  objectives: {
    en: [
      'Compute equal-temperament intervals: 100 cents per semitone.',
      'Compare to "just" ratios from small whole numbers.',
      'Hear which intervals are nearly identical (octave, fifth) vs noticeably off (third, sixth).',
    ],
    id: [
      'Menghitung interval temperamen sama: 100 cents per semiton.',
      'Bandingkan dengan rasio "murni" dari bilangan bulat kecil.',
      'Dengar interval yang hampir identik (oktaf, kuint) vs yang berbeda jelas (terts, sekst).',
    ],
  },
  tryThis: {
    en: [
      'Major third — equal-temperament is +14 cents sharp of pure 5:4. Hear it.',
      'Perfect fifth — only 2 cents off, basically identical.',
      'Minor seventh — both versions exist; play both back-to-back.',
    ],
    id: [
      'Terts mayor — temperamen sama +14 cents lebih tinggi dari 5:4 murni. Dengarkan.',
      'Kuint sempurna — hanya 2 cents berbeda, praktis identik.',
      'Septim minor — kedua versi ada; mainkan keduanya berurutan.',
    ],
  },
  topics: ['acoustics', 'tuning'],
  load: () => import('./sim.js'),
};
