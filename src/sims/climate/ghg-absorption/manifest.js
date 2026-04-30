export default {
  id: 'ghg-absorption',
  subject: 'climate',
  title: { en: 'Greenhouse-Gas Absorption Spectra', id: 'Spektrum Serapan Gas Rumah Kaca' },
  description: {
    en: 'Earth radiates infrared between roughly 4 and 100 µm. Each greenhouse gas absorbs at characteristic wavelengths, blocking some IR from escaping to space. Toggle CO₂, H₂O, CH₄, N₂O, and O₃ on the spectrum and see which "windows" close as concentrations rise.',
    id: 'Bumi memancarkan inframerah antara sekitar 4 dan 100 µm. Tiap gas rumah kaca menyerap pada panjang gelombang khas, menghalangi sebagian IR keluar. Aktifkan CO₂, H₂O, CH₄, N₂O, dan O₃ di spektrum dan lihat "jendela" mana yang menutup saat konsentrasi naik.',
  },
  objectives: {
    en: [
      'See that water vapor dominates IR absorption — and CO₂ closes the "atmospheric window".',
      'Identify the bands where each gas absorbs.',
      'Understand why doubling CO₂ has a logarithmic (not linear) effect.',
    ],
    id: [
      'Melihat bahwa uap air mendominasi serapan IR — dan CO₂ menutup "jendela atmosfer".',
      'Mengidentifikasi pita di mana tiap gas menyerap.',
      'Memahami mengapa menggandakan CO₂ berefek logaritmik (bukan linear).',
    ],
  },
  tryThis: {
    en: [
      'Turn off everything — Earth\'s blackbody curve goes out unmolested.',
      'Add water vapor — many bands fill in immediately.',
      'Double the CO₂ — the 15-µm peak deepens; the central window closes.',
    ],
    id: [
      'Matikan semua — kurva benda hitam Bumi keluar tanpa hambatan.',
      'Tambah uap air — banyak pita terisi seketika.',
      'Gandakan CO₂ — puncak 15 µm makin dalam; jendela tengah menutup.',
    ],
  },
  topics: ['climate', 'spectroscopy'],
  load: () => import('./sim.js'),
};
