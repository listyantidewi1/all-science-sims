export default {
  id: 'compressor',
  subject: 'music',
  title: { en: 'Dynamics Compressor', id: 'Kompresor Dinamika' },
  description: {
    en: 'A dynamics compressor reduces the level of loud signals so the soft and loud parts of a recording are closer together. Drag the threshold and ratio handles, watch the input-output transfer curve bend, and see a sample drum loop\'s dynamics get tamed.',
    id: 'Kompresor dinamika mengurangi level sinyal keras sehingga bagian lembut dan keras suatu rekaman lebih dekat. Tarik gagang ambang dan rasio, amati kurva transfer input-output membengkok, dan lihat dinamika loop drum sampel ditundukkan.',
  },
  objectives: {
    en: [
      'Read the threshold (where compression kicks in) and ratio (how much compression).',
      'See that infinite ratio = a limiter (clips above threshold).',
      'Apply make-up gain to bring the average level back up.',
    ],
    id: [
      'Membaca ambang (saat kompresi mulai) dan rasio (jumlah kompresi).',
      'Melihat bahwa rasio tak hingga = limiter (memotong di atas ambang).',
      'Menerapkan gain makeup untuk mengembalikan level rata-rata.',
    ],
  },
  tryThis: {
    en: [
      'Threshold −20 dB, ratio 4:1 — gentle compression.',
      'Ratio ∞ (limiter) — output flat-tops above threshold.',
      'Add makeup gain — quiet parts get louder; perceived volume up.',
    ],
    id: [
      'Ambang −20 dB, rasio 4:1 — kompresi lembut.',
      'Rasio ∞ (limiter) — output mendatar di atas ambang.',
      'Tambah gain makeup — bagian sepi menjadi keras; persepsi volume naik.',
    ],
  },
  topics: ['acoustics', 'audio-engineering'],
  load: () => import('./sim.js'),
};
