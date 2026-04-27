export default {
  id: 'newtons-cradle',
  subject: 'physics',
  title: { en: "Newton's Cradle", id: 'Ayunan Newton' },
  description: {
    en: 'Click any ball to lift it, then let it swing. Watch momentum and energy travel through the row of touching steel balls and pop out the other end.',
    id: 'Klik bola mana saja untuk mengangkatnya, lalu biarkan terayun. Amati momentum dan energi merambat melewati barisan bola baja yang saling bersentuhan dan keluar di ujung lainnya.',
  },
  objectives: {
    en: [
      'See conservation of momentum in nearly elastic collisions.',
      'Predict how many balls swing out for a given number lifted.',
      'Recognize that the trick comes from equal masses + elastic contacts.',
    ],
    id: [
      'Mengamati kekekalan momentum pada tumbukan hampir elastis.',
      'Memprediksi berapa bola yang terayun ke luar untuk sejumlah bola yang diangkat.',
      'Mengenali bahwa fenomena ini berasal dari massa sama + tumbukan elastis.',
    ],
  },
  tryThis: {
    en: [
      'Lift two balls together — how many swing out the other side?',
      'Add air friction — how does the cradle slow down?',
      'Predict before lifting three at once.',
    ],
    id: [
      'Angkat dua bola bersamaan — berapa bola yang terayun di sisi lain?',
      'Tambahkan gesekan udara — bagaimana ayunan melambat?',
      'Tebak dulu sebelum mengangkat tiga bola sekaligus.',
    ],
  },
  topics: ['momentum', 'collisions'],
  load: () => import('./sim.js'),
};
