export default {
  id: 'classical-conditioning',
  subject: 'psychology',
  title: { en: 'Classical Conditioning (Pavlov)', id: 'Pengondisian Klasik (Pavlov)' },
  description: {
    en: 'Pavlov rang a bell every time he fed his dog. Soon, the bell alone made the dog salivate — a learned association between a neutral stimulus (bell) and a meaningful one (food). Pair the bell and food yourself and watch the dog\'s salivation rise as the bell becomes a conditioned stimulus. Then "extinguish" by ringing without food.',
    id: 'Pavlov membunyikan bel setiap memberi makan anjingnya. Segera, bel saja membuat anjing mengeluarkan air liur — asosiasi belajar antara stimulus netral (bel) dan stimulus bermakna (makanan). Pasangkan bel dan makanan dan amati salivasi anjing naik saat bel menjadi stimulus terkondisi. Lalu "padamkan" dengan membunyikan tanpa makanan.',
  },
  objectives: {
    en: [
      'Pair UCS (food) + NS (bell) → CS (bell alone) elicits CR (salivation).',
      'See acquisition: pairing strengthens association curve.',
      'See extinction: bell-without-food slowly weakens the response.',
    ],
    id: [
      'Pasangkan UCS (makanan) + NS (bel) → CS (bel saja) memicu CR (salivasi).',
      'Melihat akuisisi: berpasangan memperkuat kurva asosiasi.',
      'Melihat pemadaman: bel-tanpa-makanan perlahan melemahkan respons.',
    ],
  },
  tryThis: {
    en: [
      'Pair bell + food 10 times — bell alone now triggers strong salivation.',
      'Ring bell without food many times — extinction; salivation drops.',
      'Pair again briefly — "spontaneous recovery" is fast.',
    ],
    id: [
      'Pasangkan bel + makanan 10 kali — bel saja kini memicu salivasi kuat.',
      'Bunyikan bel tanpa makanan berkali-kali — pemadaman; salivasi turun.',
      'Pasangkan lagi singkat — "pemulihan spontan" cepat.',
    ],
  },
  topics: ['learning', 'behaviorism'],
  load: () => import('./sim.js'),
};
