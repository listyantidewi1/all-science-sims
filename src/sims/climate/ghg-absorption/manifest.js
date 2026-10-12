export default {
  id: 'ghg-absorption',
  subject: 'climate',
  title: { en: 'Greenhouse-Gas Absorption Spectra', id: 'Spektrum Serapan Gas Rumah Kaca' },
  description: {
    en: 'Earth radiates infrared between roughly 4 and 100 µm. Each greenhouse gas absorbs at characteristic wavelengths, blocking some IR from escaping to space. Toggle CO₂, H₂O, CH₄, N₂O, and O₃ on the spectrum and see which "windows" close as concentrations rise.',
    id: 'Bumi memancarkan inframerah antara sekitar 4 dan 100 µm. Tiap gas rumah kaca menyerap pada panjang gelombang khas, menghalangi sebagian IR keluar. Aktifkan CO₂, H₂O, CH₄, N₂O, dan O₃ di spektrum dan lihat "jendela" mana yang menutup saat konsentrasi naik.',
  },
  details: () => import('./details.js'),
  topics: ['climate', 'spectroscopy'],
  load: () => import('./sim.js'),
};
