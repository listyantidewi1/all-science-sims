export default {
  id: 'waves-on-string',
  subject: 'physics',
  title: { en: 'Waves on a String', id: 'Gelombang pada Tali' },
  description: {
    en: 'Drive a string at one end and watch standing waves form between fixed or free ends. Tune frequency, tension, and damping to find resonant modes.',
    id: 'Getarkan tali di salah satu ujung dan lihat gelombang berdiri terbentuk di antara ujung tetap atau bebas. Atur frekuensi, tegangan, dan redaman untuk menemukan moda resonansi.',
  },
  objectives: {
    en: [
      'Identify nodes and antinodes in a standing wave.',
      'Recognize resonant frequencies for fixed-fixed and fixed-free strings.',
      'Predict how tension changes wave speed and resonant frequency.',
    ],
    id: [
      'Mengidentifikasi simpul dan perut pada gelombang berdiri.',
      'Mengenali frekuensi resonansi pada tali ujung tetap-tetap dan tetap-bebas.',
      'Memprediksi bagaimana tegangan mengubah kecepatan gelombang dan frekuensi resonansi.',
    ],
  },
  tryThis: {
    en: [
      'Find the lowest frequency that gives a clean standing wave.',
      'Switch to a free end — does the lowest mode have a node there?',
      'Double the tension — what frequency now resonates the same mode?',
    ],
    id: [
      'Cari frekuensi terendah yang menghasilkan gelombang berdiri rapi.',
      'Ubah ke ujung bebas — apakah moda terendah memiliki simpul di sana?',
      'Gandakan tegangan — pada frekuensi berapa moda yang sama beresonansi?',
    ],
  },
  topics: ['waves', 'resonance'],
  grade: [11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
