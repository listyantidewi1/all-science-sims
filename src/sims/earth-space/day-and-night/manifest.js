export default {
  id: 'day-and-night',
  subject: 'earth-space',
  title: { en: 'Day and Night', id: 'Siang dan Malam' },
  description: {
    en: 'Watch the Earth spin next to the Sun. Slide the time of day and see the light move across the Earth. A child holds a stick: its shadow is long in the morning, short at noon, and long again in the evening. Pick a city and see that when it is day there, it is night on the other side of the Earth.',
    id: 'Lihat Bumi berputar di dekat Matahari. Geser waktu dan lihat cahaya bergerak di permukaan Bumi. Seorang anak memegang tongkat: bayangannya panjang di pagi hari, pendek di siang hari, dan panjang lagi di sore hari. Pilih sebuah kota dan lihat bahwa saat di sana siang, di sisi lain Bumi sedang malam.',
  },
  topics: ['earth-rotation', 'day-night', 'shadows'],
  grade: [2, 3, 4, 5],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
