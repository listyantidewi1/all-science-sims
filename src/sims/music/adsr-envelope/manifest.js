export default {
  id: 'adsr-envelope',
  subject: 'music',
  title: { en: 'ADSR Synth Envelope', id: 'Envelop ADSR Sintesis' },
  description: {
    en: 'Every synthesizer note is shaped by an envelope: Attack, Decay, Sustain, Release. Drag the four corner handles to sculpt the shape — short attack for plucks, long attack for pads, low sustain for percussion. Click Play to hear the same pitch with your custom envelope.',
    id: 'Setiap nada synthesizer dibentuk oleh envelop: Attack, Decay, Sustain, Release. Tarik empat titik sudut untuk memahat bentuknya — attack pendek untuk petik, attack panjang untuk pad, sustain rendah untuk perkusi. Klik Play untuk mendengar nada dengan envelop kustom Anda.',
  },
  objectives: {
    en: [
      'Map each parameter to its sonic role.',
      'Build common timbres: pluck, pad, organ, percussion.',
      'See why fast attacks sound percussive and slow attacks sound smooth.',
    ],
    id: [
      'Memetakan tiap parameter ke peran sonik.',
      'Membangun timbre umum: petik, pad, organ, perkusi.',
      'Memahami mengapa attack cepat terdengar perkusif dan attack lambat terdengar mulus.',
    ],
  },
  tryThis: {
    en: [
      'Pluck — A: 0.01s, D: 0.4s, S: 0, R: 0.2s.',
      'Pad — A: 0.8s, D: 0.4s, S: 0.6, R: 1.0s.',
      'Organ — A: 0.01s, D: 0, S: 1.0, R: 0.05s.',
    ],
    id: [
      'Petik — A: 0,01s; D: 0,4s; S: 0; R: 0,2s.',
      'Pad — A: 0,8s; D: 0,4s; S: 0,6; R: 1,0s.',
      'Organ — A: 0,01s; D: 0; S: 1,0; R: 0,05s.',
    ],
  },
  topics: ['acoustics', 'synthesis'],
  load: () => import('./sim.js'),
};
