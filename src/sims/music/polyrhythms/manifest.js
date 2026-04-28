export default {
  id: 'polyrhythms',
  subject: 'music',
  title: { en: 'Polyrhythms', id: 'Poliritme' },
  description: {
    en: 'Two pulses sounding at the same time — say 3 beats vs 4 beats — collide periodically and form a richer "compound rhythm". Pick any pair, set the tempo, and watch the two beat tracks dance against each other on the canvas while you hear them. Steve Reich, African drumming, Indonesian gamelan all live here.',
    id: 'Dua pulsa berbunyi bersamaan — misal 3 ketukan vs 4 ketukan — bertabrakan periodik dan membentuk "ritme majemuk" yang kaya. Pilih pasangan apa saja, atur tempo, dan amati kedua jalur beat menari satu sama lain di kanvas sambil mendengarnya. Steve Reich, drum Afrika, gamelan Indonesia hidup di sini.',
  },
  objectives: {
    en: [
      'Hear how N:M rhythms align every LCM(N, M) pulses.',
      'See visually that 3:4 differs from 5:4 and 5:7.',
      'Build intuition for compound time signatures.',
    ],
    id: [
      'Dengar bagaimana ritme N:M sejajar setiap LCM(N, M) pulsa.',
      'Lihat bahwa 3:4 berbeda dari 5:4 dan 5:7 secara visual.',
      'Membangun intuisi tanda birama majemuk.',
    ],
  },
  tryThis: {
    en: [
      '3:2 — the simplest polyrhythm; very common in jazz and Latin music.',
      '3:4 — the "hemiola" of classical music; you cannot tap both at once until you slow it down.',
      '5:7 or 7:11 — what dense polyrhythms feel like.',
    ],
    id: [
      '3:2 — poliritme paling sederhana; sangat umum dalam jazz dan musik Latin.',
      '3:4 — "hemiola" musik klasik; Anda tidak bisa mengetuk keduanya sekaligus sampai melambat.',
      '5:7 atau 7:11 — rasanya poliritme rapat.',
    ],
  },
  topics: ['rhythm'],
  load: () => import('./sim.js'),
};
