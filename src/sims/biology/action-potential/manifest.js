export default {
  id: 'action-potential',
  subject: 'biology',
  title: { en: 'Neuron Action Potential', id: 'Potensial Aksi Neuron' },
  description: {
    en: 'Click the neuron to deliver a current pulse. If it crosses threshold, sodium gates fly open and the membrane potential races to +40 mV before potassium gates pull it back down. The all-or-nothing spike, animated.',
    id: 'Klik neuron untuk memberi pulsa arus. Jika melewati ambang, gerbang natrium terbuka dan potensial membran melonjak ke +40 mV sebelum gerbang kalium menariknya turun lagi. Pulsa "semua atau tidak", teranimasi.',
  },
  details: () => import('./details.js'),
  topics: ['neuroscience', 'physiology'],
  load: () => import('./sim.js'),
};
