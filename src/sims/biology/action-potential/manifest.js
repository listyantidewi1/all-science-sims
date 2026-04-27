export default {
  id: 'action-potential',
  subject: 'biology',
  title: { en: 'Neuron Action Potential', id: 'Potensial Aksi Neuron' },
  description: {
    en: 'Click the neuron to deliver a current pulse. If it crosses threshold, sodium gates fly open and the membrane potential races to +40 mV before potassium gates pull it back down. The all-or-nothing spike, animated.',
    id: 'Klik neuron untuk memberi pulsa arus. Jika melewati ambang, gerbang natrium terbuka dan potensial membran melonjak ke +40 mV sebelum gerbang kalium menariknya turun lagi. Pulsa "semua atau tidak", teranimasi.',
  },
  objectives: {
    en: [
      "Distinguish sub-threshold from supra-threshold stimuli.",
      'Explain depolarization, repolarization, and afterhyperpolarization.',
      'See refractory period — a second strong pulse close after fails to fire.',
    ],
    id: [
      'Membedakan rangsangan di bawah dan di atas ambang.',
      'Menjelaskan depolarisasi, repolarisasi, dan hiperpolarisasi.',
      'Mengamati periode refrakter — pulsa kuat kedua segera setelahnya gagal memicu.',
    ],
  },
  tryThis: {
    en: [
      'Pulse just below threshold — does the membrane spike?',
      'Stimulate twice in 5 ms — does the second spike fire?',
      'Lower threshold or raise resting K+ — what changes?',
    ],
    id: [
      'Beri pulsa tepat di bawah ambang — apakah membran melonjak?',
      'Beri rangsangan dua kali dalam 5 ms — apakah lonjakan kedua muncul?',
      'Turunkan ambang atau naikkan K+ istirahat — apa yang berubah?',
    ],
  },
  topics: ['neuroscience', 'physiology'],
  load: () => import('./sim.js'),
};
