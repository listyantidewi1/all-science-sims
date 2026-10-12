export default {
  id: 'enso',
  subject: 'climate',
  title: { en: 'El Niño / La Niña (ENSO)', id: 'El Niño / La Niña (ENSO)' },
  description: {
    en: 'The Pacific basin oscillates between three states: La Niña (warm pool piles up west, strong easterlies), Neutral, and El Niño (warm water sloshes east, easterlies fail). Drag the slider to scan from one extreme to the other and watch sea-surface temperature, the thermocline depth, and global rain-pattern anomalies shift.',
    id: 'Cekungan Pasifik berosilasi antara tiga keadaan: La Niña (kolam hangat menumpuk barat, angin timur kuat), Netral, dan El Niño (air hangat berpindah timur, angin timur lemah). Geser slider untuk memindai dari satu ekstrem ke ekstrem lain dan amati suhu permukaan laut, kedalaman termoklin, dan anomali pola hujan global bergeser.',
  },
  details: () => import('./details.js'),
  topics: ['climate', 'oceanography'],
  load: () => import('./sim.js'),
};
