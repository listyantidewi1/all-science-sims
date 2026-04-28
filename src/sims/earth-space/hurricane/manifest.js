export default {
  id: 'hurricane',
  subject: 'earth-space',
  title: { en: 'Hurricane Formation', id: 'Pembentukan Badai Tropis' },
  description: {
    en: 'A swirling storm above warm ocean. Slide sea surface temperature, Coriolis (latitude), and wind shear to see the storm intensify, weaken, or dissipate. Below 26.5°C, hurricanes can\'t form. Too much shear, and they\'re torn apart.',
    id: 'Badai berputar di atas laut hangat. Atur suhu permukaan laut, Coriolis (lintang), dan geseran angin untuk melihat badai menguat, melemah, atau bubar. Di bawah 26,5°C, badai tropis tidak dapat terbentuk. Terlalu banyak geseran, mereka tercabik.',
  },
  objectives: {
    en: [
      'Identify the three ingredients: warm SST, Coriolis force, low wind shear.',
      'See why hurricanes don\'t form on the equator (Coriolis = 0).',
      'Connect SST to maximum sustainable intensity.',
    ],
    id: [
      'Mengenali tiga bahan: SST hangat, gaya Coriolis, geseran angin rendah.',
      'Melihat mengapa badai tropis tidak terbentuk di khatulistiwa (Coriolis = 0).',
      'Mengaitkan SST dengan intensitas maksimum yang dapat dipertahankan.',
    ],
  },
  tryThis: {
    en: [
      'SST 28°C, low shear, lat 15° — Cat 4 hurricane?',
      'SST 24°C — does the storm dissipate?',
      'Latitude 0° (equator) — does it spin at all?',
    ],
    id: [
      'SST 28°C, geseran rendah, lintang 15° — badai Kat 4?',
      'SST 24°C — apakah badai bubar?',
      'Lintang 0° (khatulistiwa) — apakah berputar sama sekali?',
    ],
  },
  topics: ['meteorology', 'climate'],
  load: () => import('./sim.js'),
};
