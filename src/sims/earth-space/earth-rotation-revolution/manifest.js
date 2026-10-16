export default {
  id: 'earth-rotation-revolution',
  subject: 'earth-space',
  title: { en: 'Spinning and Orbiting Earth', id: 'Rotasi dan Revolusi Bumi' },
  description: {
    en: 'The Earth does two things at once: it spins like a top and it travels around the Sun. Watch a city on the spinning Earth move from day into night and back as the hour counter ticks to 24. Then zoom out and watch the Earth orbit the Sun while the day counter climbs to 365 and the months go by. Press "1 day", "1 month" or "1 year" to jump ahead, and compare with Mars!',
    id: 'Bumi melakukan dua hal sekaligus: berputar seperti gasing dan mengelilingi Matahari. Lihat sebuah kota di Bumi yang berputar berpindah dari siang ke malam dan kembali lagi saat penghitung jam mencapai 24. Lalu lihat dari jauh bagaimana Bumi mengorbit Matahari sementara penghitung hari naik sampai 365 dan bulan-bulan berganti. Tekan "1 hari", "1 bulan" atau "1 tahun" untuk melompat maju, dan bandingkan dengan Mars!',
  },
  topics: ['solar system', 'rotation', 'revolution', 'day and night', 'year'],
  grade: [5, 6],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
