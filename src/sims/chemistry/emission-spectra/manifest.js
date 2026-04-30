export default {
  id: 'emission-spectra',
  subject: 'chemistry',
  title: { en: 'Atomic Emission Spectra', id: 'Spektrum Emisi Atom' },
  description: {
    en: 'Heat a gas and it glows in a few specific colors — the "fingerprint" of its element. Pick hydrogen, helium, neon, sodium, or mercury and see the discrete bright lines that astronomers and chemists use to identify atoms across the universe. Hover any line to read its wavelength.',
    id: 'Panaskan gas dan ia berpendar dalam beberapa warna spesifik — "sidik jari" unsurnya. Pilih hidrogen, helium, neon, natrium, atau merkuri dan lihat garis-garis terang diskrit yang digunakan astronom dan ahli kimia untuk mengidentifikasi atom di seluruh alam semesta. Arahkan pointer ke garis untuk membaca panjang gelombang.',
  },
  objectives: {
    en: [
      'Connect a line spectrum to atomic energy levels (E = hf).',
      'Apply the Rydberg formula for hydrogen: 1/λ = R (1/n₁² − 1/n₂²).',
      'Recognize the same spectral fingerprint in starlight identifies that element.',
    ],
    id: [
      'Menghubungkan spektrum garis dengan tingkat energi atom (E = hf).',
      'Menerapkan rumus Rydberg untuk hidrogen: 1/λ = R (1/n₁² − 1/n₂²).',
      'Mengenali sidik jari spektral di cahaya bintang mengidentifikasi unsurnya.',
    ],
  },
  tryThis: {
    en: [
      'Hydrogen — Balmer series (red, cyan, blue-violet, violet) is visible.',
      'Sodium — bright doublet at 589 nm gives streetlights their orange-yellow glow.',
      'Mercury — used in fluorescent tubes, with strong UV that excites the white phosphor.',
    ],
    id: [
      'Hidrogen — deret Balmer (merah, sian, biru-ungu, ungu) terlihat.',
      'Natrium — dublet terang di 589 nm memberi lampu jalan cahaya kuning-oranye.',
      'Merkuri — di tabung fluoresen, UV kuat yang merangsang fosfor putih.',
    ],
  },
  topics: ['atomic-physics', 'spectroscopy'],
  load: () => import('./sim.js'),
};
