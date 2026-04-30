export default {
  id: 'scales-modes',
  subject: 'music',
  title: { en: 'Scales & Modes', id: 'Tangga Nada & Mode' },
  description: {
    en: 'Pick a root note, pick a scale or mode, and the keyboard lights up with the notes that belong. Click any lit key to hear it; press "Play scale" to hear them in sequence. Compare major (Ionian), minor (Aeolian), Dorian, Mixolydian, blues, pentatonic, harmonic minor, and Hungarian minor.',
    id: 'Pilih nada dasar, pilih tangga nada atau mode, dan keyboard menyala dengan nada-nada yang termasuk. Klik tuts menyala untuk mendengarnya; tekan "Play scale" untuk mendengar berurutan. Bandingkan mayor (Ionian), minor (Aeolian), Dorian, Mixolydian, blues, pentatonik, harmonik minor, dan Hungarian minor.',
  },
  objectives: {
    en: [
      'Connect a scale\'s interval pattern to its emotional flavor.',
      'Recognize that the same notes shift between modes by changing the root.',
      'Hear pentatonic vs heptatonic scales side by side.',
    ],
    id: [
      'Menghubungkan pola interval suatu tangga nada dengan rasanya.',
      'Mengenali nada yang sama berpindah antar mode dengan mengubah dasar.',
      'Mendengar pentatonik vs heptatonik bersebelahan.',
    ],
  },
  tryThis: {
    en: [
      'C major — bright, "happy" sound.',
      'A natural minor — same white keys, different feel.',
      'C blues — only 6 notes including the flat-5 "blue" note.',
    ],
    id: [
      'C mayor — cerah, terdengar "ceria".',
      'A minor natural — tuts putih sama, terasa berbeda.',
      'C blues — hanya 6 nada termasuk "blue note" flat-5.',
    ],
  },
  topics: ['harmony', 'theory'],
  load: () => import('./sim.js'),
};
