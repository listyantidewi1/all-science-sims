export default {
  id: 'carbon-footprint',
  subject: 'climate',
  title: { en: 'Carbon Footprint Calculator', id: 'Kalkulator Jejak Karbon' },
  description: {
    en: 'Build your annual carbon footprint by sliding values across six categories: car driving, air travel, home energy, diet, electronics, and shopping. The dashboard reports tons of CO₂-equivalent per year — your personal climate impact compared to the global average and what a 2°C-compatible budget would require.',
    id: 'Bangun jejak karbon tahunan Anda dengan menggeser nilai pada enam kategori: berkendara, perjalanan udara, energi rumah, diet, elektronik, dan belanja. Dasbor melaporkan ton CO₂ ekuivalen per tahun — dampak iklim pribadi Anda dibandingkan rata-rata global dan target 2°C.',
  },
  details: () => import('./details.js'),
  topics: ['climate', 'lifestyle'],
  load: () => import('./sim.js'),
};
