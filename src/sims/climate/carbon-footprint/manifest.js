export default {
  id: 'carbon-footprint',
  subject: 'climate',
  title: { en: 'Carbon Footprint Calculator', id: 'Kalkulator Jejak Karbon' },
  description: {
    en: 'Build your annual carbon footprint by sliding values across six categories: car driving, air travel, home energy, diet, electronics, and shopping. The dashboard reports tons of CO₂-equivalent per year — your personal climate impact compared to the global average and what a 2°C-compatible budget would require.',
    id: 'Bangun jejak karbon tahunan Anda dengan menggeser nilai pada enam kategori: berkendara, perjalanan udara, energi rumah, diet, elektronik, dan belanja. Dasbor melaporkan ton CO₂ ekuivalen per tahun — dampak iklim pribadi Anda dibandingkan rata-rata global dan target 2°C.',
  },
  objectives: {
    en: [
      'See where the biggest contributions come from for typical lifestyles.',
      'Compare your number to the global average (~4.7 t/yr) and the 2°C target (~2 t/yr).',
      'Identify high-leverage changes (one trans-Atlantic flight ≈ a year of beef).',
    ],
    id: [
      'Melihat dari mana kontribusi terbesar untuk gaya hidup tipikal.',
      'Membandingkan angka Anda dengan rata-rata global (~4,7 t/thn) dan target 2°C (~2 t/thn).',
      'Mengidentifikasi perubahan berdampak besar (satu penerbangan trans-Atlantik ≈ setahun daging sapi).',
    ],
  },
  tryThis: {
    en: [
      '"Average American" preset: the largest per-capita footprint in the world.',
      '"Vegan, no flights" preset: how low can a developed-country lifestyle go.',
      'Adjust your own values: what is your number?',
    ],
    id: [
      'Preset "rata-rata Amerika": jejak per kapita terbesar di dunia.',
      'Preset "vegan, tanpa terbang": seberapa rendah gaya hidup negara maju bisa.',
      'Atur nilai Anda sendiri: berapa angka Anda?',
    ],
  },
  topics: ['climate', 'lifestyle'],
  load: () => import('./sim.js'),
};
