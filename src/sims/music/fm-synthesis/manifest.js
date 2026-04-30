export default {
  id: 'fm-synthesis',
  subject: 'music',
  title: { en: 'FM Synthesis', id: 'Sintesis FM' },
  description: {
    en: 'Modulate a carrier oscillator\'s frequency with another oscillator (the modulator). Tiny modulation depth gives a vibrato; large depth produces metallic, bell-like, and bass timbres — the secret of the Yamaha DX7. Watch the waveform shift as you sweep the modulator-to-carrier frequency ratio.',
    id: 'Modulasi frekuensi osilator pembawa dengan osilator lain (modulator). Kedalaman modulasi kecil memberi vibrato; kedalaman besar menghasilkan timbre logam, bel, dan bass — rahasia Yamaha DX7. Amati gelombang berubah saat Anda menggeser rasio frekuensi modulator-pembawa.',
  },
  objectives: {
    en: [
      'See the FM equation: y(t) = sin(ωc·t + I·sin(ωm·t)).',
      'Connect modulation index I to the spectral spread.',
      'Hear bell, brass, bass, and percussion tones from a single algorithm.',
    ],
    id: [
      'Melihat persamaan FM: y(t) = sin(ωc·t + I·sin(ωm·t)).',
      'Menghubungkan indeks modulasi I dengan penyebaran spektral.',
      'Mendengar nada bel, kuningan, bass, dan perkusi dari satu algoritma.',
    ],
  },
  tryThis: {
    en: [
      'Ratio 1:1, low I — slight vibrato.',
      'Ratio 1:1, high I — bell-like clang.',
      'Ratio 1:3 — woody timbre.',
    ],
    id: [
      'Rasio 1:1, I rendah — vibrato sedikit.',
      'Rasio 1:1, I tinggi — bel berdentang.',
      'Rasio 1:3 — timbre kayu.',
    ],
  },
  topics: ['acoustics', 'synthesis'],
  load: () => import('./sim.js'),
};
