export default {
  id: 'emission-spectra',
  subject: 'chemistry',
  title: { en: 'Atomic Emission Spectra', id: 'Spektrum Emisi Atom' },
  description: {
    en: 'Heat a gas and it glows in a few specific colors — the "fingerprint" of its element. Pick hydrogen, helium, neon, sodium, or mercury and see the discrete bright lines that astronomers and chemists use to identify atoms across the universe. Hover any line to read its wavelength.',
    id: 'Panaskan gas dan ia berpendar dalam beberapa warna spesifik — "sidik jari" unsurnya. Pilih hidrogen, helium, neon, natrium, atau merkuri dan lihat garis-garis terang diskrit yang digunakan astronom dan ahli kimia untuk mengidentifikasi atom di seluruh alam semesta. Arahkan pointer ke garis untuk membaca panjang gelombang.',
  },
  details: () => import('./details.js'),
  topics: ['atomic-physics', 'spectroscopy'],
  load: () => import('./sim.js'),
};
