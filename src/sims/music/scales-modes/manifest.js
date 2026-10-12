export default {
  id: 'scales-modes',
  subject: 'music',
  title: { en: 'Scales & Modes', id: 'Tangga Nada & Mode' },
  description: {
    en: 'Pick a root note, pick a scale or mode, and the keyboard lights up with the notes that belong. Click any lit key to hear it; press "Play scale" to hear them in sequence. Compare major (Ionian), minor (Aeolian), Dorian, Mixolydian, blues, pentatonic, harmonic minor, and Hungarian minor.',
    id: 'Pilih nada dasar, pilih tangga nada atau mode, dan keyboard menyala dengan nada-nada yang termasuk. Klik tuts menyala untuk mendengarnya; tekan "Play scale" untuk mendengar berurutan. Bandingkan mayor (Ionian), minor (Aeolian), Dorian, Mixolydian, blues, pentatonik, harmonik minor, dan Hungarian minor.',
  },
  details: () => import('./details.js'),
  topics: ['harmony', 'theory'],
  grade: [6, 7, 8, 9, 10],
  load: () => import('./sim.js'),
};
