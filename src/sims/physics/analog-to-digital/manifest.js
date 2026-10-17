export default {
  id: 'analog-to-digital',
  subject: 'physics',
  title: { en: 'Analog to Digital', id: 'Analog ke Digital' },
  description: {
    en: 'Turn a smooth analog signal into numbers: choose a sine, a voice-like mix of harmonics or a triangle wave, sample it at a rate you set and quantise each sample to 1–8 bits. See the sample dots, the reconstructed staircase, the binary code of every sample, the quantisation error and the bit rate fs × n. Drop the sample rate below twice the highest frequency and watch aliasing turn the signal into a slow impostor.',
    id: 'Ubah sinyal analog yang mulus menjadi angka: pilih sinus, campuran harmonik mirip suara, atau gelombang segitiga, cuplik dengan laju yang kamu atur, dan kuantisasi tiap cuplikan ke 1–8 bit. Lihat titik cuplikan, tangga rekonstruksi, kode biner tiap cuplikan, galat kuantisasi, dan laju bit fs × n. Turunkan laju cuplik di bawah dua kali frekuensi tertinggi dan lihat aliasing menyulap sinyal menjadi gelombang lambat palsu.',
  },
  topics: ['digital signals', 'sampling', 'quantisation', 'Nyquist theorem', 'binary'],
  grade: [11, 12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
