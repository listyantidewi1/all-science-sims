export default {
  id: 'chord-builder',
  subject: 'music',
  title: { en: 'Chord Builder', id: 'Pembangun Akord' },
  description: {
    en: 'A virtual piano keyboard. Click any note to add or remove it from the chord; the sim tells you what chord you have built (major, minor, diminished, dominant 7th, etc.) and you can hear it. Compare the bright sound of a major chord to the somber minor, the unstable diminished, the jazzy 7th.',
    id: 'Keyboard piano virtual. Klik nada apa saja untuk menambah atau menghapusnya dari akord; sim akan memberi tahu akord yang Anda bangun (mayor, minor, diminished, 7th dominan, dll.) dan Anda dapat mendengarnya. Bandingkan suara cerah mayor dengan minor yang murung, diminished yang tidak stabil, septim jazzy.',
  },
  details: () => import('./details.js'),
  topics: ['harmony'],
  load: () => import('./sim.js'),
};
