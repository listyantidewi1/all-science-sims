export default {
  id: 'doppler',
  subject: 'physics',
  title: { en: 'Doppler Effect', id: 'Efek Doppler' },
  description: {
    en: 'Drag a moving sound source around an observer and watch wavefronts compress in front and stretch behind. The pitch the observer hears jumps as the source flies past.',
    id: 'Seret sumber suara yang bergerak di sekitar pengamat lalu amati muka gelombang mampat di depan dan teregang di belakang. Frekuensi yang didengar pengamat melonjak saat sumber melintas.',
  },
  objectives: {
    en: [
      'Apply f_obs = f_src · c / (c − v_src·cos θ) qualitatively.',
      'Connect wavefront spacing to observed pitch.',
      'Predict the supersonic Mach cone when v ≥ c.',
    ],
    id: [
      'Menerapkan f_obs = f_src · c / (c − v_src·cos θ) secara kualitatif.',
      'Menghubungkan jarak muka gelombang dengan frekuensi yang didengar.',
      'Memprediksi kerucut Mach supersonik saat v ≥ c.',
    ],
  },
  tryThis: {
    en: [
      'Pass the source close to the observer — when does pitch flip?',
      'Push speed past sound speed — does a Mach cone appear?',
      'Move the observer instead — same effect or different?',
    ],
    id: [
      'Lewatkan sumber dekat pengamat — kapan nada berubah?',
      'Naikkan kecepatan melewati kecepatan suara — apakah muncul kerucut Mach?',
      'Gerakkan pengamat bukan sumber — efeknya sama atau beda?',
    ],
  },
  topics: ['waves', 'sound'],
  load: () => import('./sim.js'),
};
