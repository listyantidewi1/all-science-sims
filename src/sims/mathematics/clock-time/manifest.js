export default {
  id: 'clock-time',
  subject: 'mathematics',
  title: { en: 'Tell the Time', id: 'Membaca Jam' },
  description: {
    en: 'Drag the hands of a big clock and read the time on the digital display and in words. Take the challenge: can you set the clock to the time it asks for? In the elapsed-time mode, two clocks show a start and an end, and the sim counts the hours and minutes in between.',
    id: 'Geser jarum sebuah jam besar dan baca waktunya pada tampilan digital dan dalam kata-kata. Ikuti tantangannya: bisakah kamu mengatur jam ke waktu yang diminta? Pada mode lama waktu, dua jam menunjukkan waktu mulai dan selesai, dan simulasi menghitung jam dan menit di antaranya.',
  },
  topics: ['time', 'measurement', 'duration'],
  grade: [1, 2, 3, 4],
  hasLab: false,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
