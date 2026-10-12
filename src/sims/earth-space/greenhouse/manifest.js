export default {
  id: 'greenhouse',
  subject: 'earth-space',
  title: { en: 'Greenhouse Effect', id: 'Efek Rumah Kaca' },
  description: {
    en: 'Sunlight streams down and heats the surface, which radiates back as infrared. Greenhouse gases absorb and re-emit some IR. Tune CO₂ and watch surface temperature respond.',
    id: 'Sinar matahari turun memanaskan permukaan, lalu permukaan memancarkan inframerah ke atas. Gas rumah kaca menyerap dan memancarkan ulang sebagian IR. Atur CO₂ dan amati suhu permukaan merespons.',
  },
  details: () => import('./details.js'),
  topics: ['climate', 'radiation'],
  hasLab: true,
  load: () => import('./sim.js'),
};
