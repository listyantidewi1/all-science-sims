export default {
  id: 'beer-lambert',
  subject: 'chemistry',
  title: { en: 'Beer-Lambert Spectroscopy', id: 'Spektroskopi Beer-Lambert' },
  description: {
    en: 'Shine a beam of light through a colored solution and watch how much makes it through. Concentration, path length, and wavelength all change the absorbance — the principle behind every spectrophotometer.',
    id: 'Sorotkan berkas cahaya melewati larutan berwarna dan amati seberapa banyak yang lolos. Konsentrasi, panjang lintasan, dan panjang gelombang semuanya mengubah absorbansi — prinsip di balik setiap spektrofotometer.',
  },
  details: () => import('./details.js'),
  topics: ['spectroscopy', 'analytical'],
  hasLab: true,
  load: () => import('./sim.js'),
};
