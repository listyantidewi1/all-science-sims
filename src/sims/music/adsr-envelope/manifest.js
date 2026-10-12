export default {
  id: 'adsr-envelope',
  subject: 'music',
  title: { en: 'ADSR Synth Envelope', id: 'Envelop ADSR Sintesis' },
  description: {
    en: 'Every synthesizer note is shaped by an envelope: Attack, Decay, Sustain, Release. Drag the four corner handles to sculpt the shape — short attack for plucks, long attack for pads, low sustain for percussion. Click Play to hear the same pitch with your custom envelope.',
    id: 'Setiap nada synthesizer dibentuk oleh envelop: Attack, Decay, Sustain, Release. Tarik empat titik sudut untuk memahat bentuknya — attack pendek untuk petik, attack panjang untuk pad, sustain rendah untuk perkusi. Klik Play untuk mendengar nada dengan envelop kustom Anda.',
  },
  details: () => import('./details.js'),
  topics: ['acoustics', 'synthesis'],
  grade: [7, 8, 9, 10],
  load: () => import('./sim.js'),
};
