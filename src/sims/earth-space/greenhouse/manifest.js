export default {
  id: 'greenhouse',
  subject: 'earth-space',
  title: { en: 'Greenhouse Effect', id: 'Efek Rumah Kaca' },
  description: {
    en: 'Sunlight streams down and heats the surface, which radiates back as infrared. Greenhouse gases absorb and re-emit some IR. Tune CO₂ and watch surface temperature respond.',
    id: 'Sinar matahari turun memanaskan permukaan, lalu permukaan memancarkan inframerah ke atas. Gas rumah kaca menyerap dan memancarkan ulang sebagian IR. Atur CO₂ dan amati suhu permukaan merespons.',
  },
  objectives: {
    en: [
      'Distinguish visible light (incoming) from infrared (outgoing).',
      'Explain how more greenhouse gas raises surface temperature.',
      'Recognize the energy-balance argument behind climate models.',
    ],
    id: [
      'Membedakan cahaya tampak (masuk) dari inframerah (keluar).',
      'Menjelaskan mengapa lebih banyak gas rumah kaca menaikkan suhu permukaan.',
      'Mengenali argumen keseimbangan energi di balik model iklim.',
    ],
  },
  tryThis: {
    en: [
      'Drop CO₂ to 0 — what happens to surface temperature?',
      'Push CO₂ very high — does the temperature rise without limit?',
      'Compare today\'s ~420 ppm with the pre-industrial ~280 ppm.',
    ],
    id: [
      'Turunkan CO₂ ke 0 — apa yang terjadi pada suhu permukaan?',
      'Naikkan CO₂ sangat tinggi — apakah suhu naik tanpa batas?',
      'Bandingkan ~420 ppm saat ini dengan ~280 ppm pra-industri.',
    ],
  },
  topics: ['climate', 'radiation'],
  load: () => import('./sim.js'),
};
