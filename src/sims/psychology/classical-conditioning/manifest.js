export default {
  id: 'classical-conditioning',
  subject: 'psychology',
  title: { en: 'Classical Conditioning (Pavlov)', id: 'Pengondisian Klasik (Pavlov)' },
  description: {
    en: 'Pavlov rang a bell every time he fed his dog. Soon, the bell alone made the dog salivate — a learned association between a neutral stimulus (bell) and a meaningful one (food). Pair the bell and food yourself and watch the dog\'s salivation rise as the bell becomes a conditioned stimulus. Then "extinguish" by ringing without food.',
    id: 'Pavlov membunyikan bel setiap memberi makan anjingnya. Segera, bel saja membuat anjing mengeluarkan air liur — asosiasi belajar antara stimulus netral (bel) dan stimulus bermakna (makanan). Pasangkan bel dan makanan dan amati salivasi anjing naik saat bel menjadi stimulus terkondisi. Lalu "padamkan" dengan membunyikan tanpa makanan.',
  },
  details: () => import('./details.js'),
  topics: ['learning', 'behaviorism'],
  grade: [10, 11, 12, 13],
  load: () => import('./sim.js'),
};
