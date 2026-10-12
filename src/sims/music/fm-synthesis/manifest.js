export default {
  id: 'fm-synthesis',
  subject: 'music',
  title: { en: 'FM Synthesis', id: 'Sintesis FM' },
  description: {
    en: 'Modulate a carrier oscillator\'s frequency with another oscillator (the modulator). Tiny modulation depth gives a vibrato; large depth produces metallic, bell-like, and bass timbres — the secret of the Yamaha DX7. Watch the waveform shift as you sweep the modulator-to-carrier frequency ratio.',
    id: 'Modulasi frekuensi osilator pembawa dengan osilator lain (modulator). Kedalaman modulasi kecil memberi vibrato; kedalaman besar menghasilkan timbre logam, bel, dan bass — rahasia Yamaha DX7. Amati gelombang berubah saat Anda menggeser rasio frekuensi modulator-pembawa.',
  },
  details: () => import('./details.js'),
  topics: ['acoustics', 'synthesis'],
  load: () => import('./sim.js'),
};
