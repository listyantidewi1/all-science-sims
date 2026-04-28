export default {
  id: 'chord-builder',
  subject: 'music',
  title: { en: 'Chord Builder', id: 'Pembangun Akord' },
  description: {
    en: 'A virtual piano keyboard. Click any note to add or remove it from the chord; the sim tells you what chord you have built (major, minor, diminished, dominant 7th, etc.) and you can hear it. Compare the bright sound of a major chord to the somber minor, the unstable diminished, the jazzy 7th.',
    id: 'Keyboard piano virtual. Klik nada apa saja untuk menambah atau menghapusnya dari akord; sim akan memberi tahu akord yang Anda bangun (mayor, minor, diminished, 7th dominan, dll.) dan Anda dapat mendengarnya. Bandingkan suara cerah mayor dengan minor yang murung, diminished yang tidak stabil, septim jazzy.',
  },
  objectives: {
    en: [
      'Connect interval stacks to chord names: major = 4+3 semitones, minor = 3+4.',
      'Hear the emotional flavor of each chord quality.',
      'Build common 7th, sus, and add9 chords by adding more notes.',
    ],
    id: [
      'Menghubungkan tumpukan interval dengan nama akord: mayor = 4+3 semiton, minor = 3+4.',
      'Mendengar nuansa emosional tiap kualitas akord.',
      'Membangun akord 7th, sus, dan add9 umum dengan menambah nada.',
    ],
  },
  tryThis: {
    en: [
      'Click C, E, G — that is C major.',
      'Click C, E♭, G — C minor.',
      'Click C, E, G, B♭ — C dominant 7 (the "blues" chord).',
    ],
    id: [
      'Klik C, E, G — itu C mayor.',
      'Klik C, E♭, G — C minor.',
      'Klik C, E, G, B♭ — C dominan 7 (akord "blues").',
    ],
  },
  topics: ['harmony'],
  load: () => import('./sim.js'),
};
