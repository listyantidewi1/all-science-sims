export default {
  id: 'polyrhythms',
  subject: 'music',
  title: { en: 'Polyrhythms', id: 'Poliritme' },
  description: {
    en: 'Two pulses sounding at the same time — say 3 beats vs 4 beats — collide periodically and form a richer "compound rhythm". Pick any pair, set the tempo, and watch the two beat tracks dance against each other on the canvas while you hear them. Steve Reich, African drumming, Indonesian gamelan all live here.',
    id: 'Dua pulsa berbunyi bersamaan — misal 3 ketukan vs 4 ketukan — bertabrakan periodik dan membentuk "ritme majemuk" yang kaya. Pilih pasangan apa saja, atur tempo, dan amati kedua jalur beat menari satu sama lain di kanvas sambil mendengarnya. Steve Reich, drum Afrika, gamelan Indonesia hidup di sini.',
  },
  details: () => import('./details.js'),
  topics: ['rhythm'],
  load: () => import('./sim.js'),
};
