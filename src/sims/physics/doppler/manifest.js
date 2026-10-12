export default {
  id: 'doppler',
  subject: 'physics',
  title: { en: 'Doppler Effect', id: 'Efek Doppler' },
  description: {
    en: 'Drag a moving sound source around an observer and watch wavefronts compress in front and stretch behind. The pitch the observer hears jumps as the source flies past.',
    id: 'Seret sumber suara yang bergerak di sekitar pengamat lalu amati muka gelombang mampat di depan dan teregang di belakang. Frekuensi yang didengar pengamat melonjak saat sumber melintas.',
  },
  details: () => import('./details.js'),
  topics: ['waves', 'sound'],
  hasLab: true,
  load: () => import('./sim.js'),
};
