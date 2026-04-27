export default {
  id: 'moon-phases',
  subject: 'earth-space',
  title: { en: 'Moon Phases', id: 'Fase Bulan' },
  description: {
    en: 'Drag the Moon around Earth and see two views update together: the lit side from above, and how the Moon appears from Earth. The phase you see is just geometry.',
    id: 'Seret Bulan mengelilingi Bumi dan amati dua tampilan bersamaan: sisi yang terang dari atas, serta bagaimana Bulan tampak dari Bumi. Fase yang terlihat hanyalah geometri.',
  },
  objectives: {
    en: [
      'Match Moon position in orbit to the phase observed from Earth.',
      'Identify new, first-quarter, full, and last-quarter from geometry.',
      'Recognize that half the Moon is always lit — only our view changes.',
    ],
    id: [
      'Mencocokkan posisi Bulan di orbit dengan fase yang teramati dari Bumi.',
      'Mengenali bulan baru, kuartal awal, purnama, dan kuartal akhir dari geometri.',
      'Menyadari bahwa setengah Bulan selalu terang — hanya sudut pandang kita yang berubah.',
    ],
  },
  tryThis: {
    en: [
      'Drag the Moon between Sun and Earth — what phase do we see?',
      'Find the position that gives a waxing crescent.',
      'Auto-orbit and pause at the moment exactly half the disc is lit.',
    ],
    id: [
      'Seret Bulan di antara Matahari dan Bumi — fase apa yang terlihat?',
      'Cari posisi yang menghasilkan sabit naik (waxing crescent).',
      'Putar otomatis lalu jeda saat tepat setengah piringan Bulan terang.',
    ],
  },
  topics: ['astronomy', 'moon'],
  grade: [10, 11],
  load: () => import('./sim.js'),
};
