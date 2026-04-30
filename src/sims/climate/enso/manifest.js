export default {
  id: 'enso',
  subject: 'climate',
  title: { en: 'El Niño / La Niña (ENSO)', id: 'El Niño / La Niña (ENSO)' },
  description: {
    en: 'The Pacific basin oscillates between three states: La Niña (warm pool piles up west, strong easterlies), Neutral, and El Niño (warm water sloshes east, easterlies fail). Drag the slider to scan from one extreme to the other and watch sea-surface temperature, the thermocline depth, and global rain-pattern anomalies shift.',
    id: 'Cekungan Pasifik berosilasi antara tiga keadaan: La Niña (kolam hangat menumpuk barat, angin timur kuat), Netral, dan El Niño (air hangat berpindah timur, angin timur lemah). Geser slider untuk memindai dari satu ekstrem ke ekstrem lain dan amati suhu permukaan laut, kedalaman termoklin, dan anomali pola hujan global bergeser.',
  },
  objectives: {
    en: [
      'Connect the Niño-3.4 SST anomaly to the ENSO state.',
      'See the slope of the thermocline reverse between La Niña and El Niño.',
      'Connect Pacific oscillation to global rainfall: drought in some regions, floods in others.',
    ],
    id: [
      'Menghubungkan anomali SST Niño-3.4 dengan keadaan ENSO.',
      'Melihat kemiringan termoklin terbalik antara La Niña dan El Niño.',
      'Menghubungkan osilasi Pasifik dengan curah hujan global: kekeringan di sebagian, banjir di sebagian lain.',
    ],
  },
  tryThis: {
    en: [
      'Strong La Niña — warm pool stacked west, drought in Peru, floods in Indonesia.',
      'Strong El Niño — warm water east, fish disappear off Peru, drought in Australia.',
      'Neutral — gentle east-west temperature gradient, balanced rains.',
    ],
    id: [
      'La Niña kuat — kolam hangat di barat, kekeringan di Peru, banjir di Indonesia.',
      'El Niño kuat — air hangat di timur, ikan menghilang di Peru, kekeringan di Australia.',
      'Netral — gradien suhu lembut, hujan seimbang.',
    ],
  },
  topics: ['climate', 'oceanography'],
  load: () => import('./sim.js'),
};
