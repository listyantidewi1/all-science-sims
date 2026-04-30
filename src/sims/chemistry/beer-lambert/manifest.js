export default {
  id: 'beer-lambert',
  subject: 'chemistry',
  title: { en: 'Beer-Lambert Spectroscopy', id: 'Spektroskopi Beer-Lambert' },
  description: {
    en: 'Shine a beam of light through a colored solution and watch how much makes it through. Concentration, path length, and wavelength all change the absorbance — the principle behind every spectrophotometer.',
    id: 'Sorotkan berkas cahaya melewati larutan berwarna dan amati seberapa banyak yang lolos. Konsentrasi, panjang lintasan, dan panjang gelombang semuanya mengubah absorbansi — prinsip di balik setiap spektrofotometer.',
  },
  objectives: {
    en: [
      'Apply A = ε · c · L (the Beer-Lambert law).',
      'Recognize that absorbance is logarithmic in transmission.',
      'Read the absorption spectrum of a sample at multiple wavelengths.',
    ],
    id: [
      'Menerapkan A = ε · c · L (hukum Beer-Lambert).',
      'Mengenali bahwa absorbansi bersifat logaritmik terhadap transmisi.',
      'Membaca spektrum absorpsi sampel pada berbagai panjang gelombang.',
    ],
  },
  tryThis: {
    en: [
      'Double concentration — does absorbance double?',
      'Tune wavelength to the sample\'s λ_max — does intensity drop fastest?',
      'Halve path length — same effect as halving concentration?',
    ],
    id: [
      'Gandakan konsentrasi — apakah absorbansi juga ikut menggandakan?',
      'Atur panjang gelombang ke λ_max sampel — apakah intensitas turun paling cepat?',
      'Setengahkan panjang lintasan — efeknya sama dengan menyetengahkan konsentrasi?',
    ],
  },
  topics: ['spectroscopy', 'analytical'],
  hasLab: true,
  load: () => import('./sim.js'),
};
