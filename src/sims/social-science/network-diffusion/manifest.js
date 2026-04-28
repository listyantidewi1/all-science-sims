export default {
  id: 'network-diffusion',
  subject: 'social-science',
  title: { en: 'Threshold Diffusion on a Network', id: 'Difusi Ambang pada Jaringan' },
  description: {
    en: "Each person adopts a new behavior only when a fraction of their friends already have. Tune the threshold and watch a small seed of adopters either fizzle out or cascade through the entire network — Granovetter's classic threshold model.",
    id: 'Setiap orang mengadopsi perilaku baru hanya ketika sebagian temannya telah melakukannya. Atur ambang lalu amati benih kecil pengadopsi mati di tempat atau menyebar lewat seluruh jaringan — model ambang klasik Granovetter.',
  },
  objectives: {
    en: [
      "See cascades depend on threshold and seed placement.",
      "Recognize tipping points in network adoption.",
      'Compare to simple contagion (probability per contact).',
    ],
    id: [
      'Melihat cascade bergantung ambang dan posisi benih.',
      'Mengenali titik balik dalam adopsi jaringan.',
      'Membandingkan dengan penularan sederhana (probabilitas per kontak).',
    ],
  },
  tryThis: {
    en: [
      'Threshold 30%, single seed — full cascade?',
      'Threshold 50% — same seed often fizzles.',
      'Try seeding hubs vs random nodes.',
    ],
    id: [
      'Ambang 30%, benih tunggal — cascade penuh?',
      'Ambang 50% — benih yang sama sering mati.',
      'Coba menabur di hub vs simpul acak.',
    ],
  },
  topics: ['networks', 'social-influence'],
  load: () => import('./sim.js'),
};
