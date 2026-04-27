export default {
  id: 'coriolis',
  subject: 'earth-space',
  title: { en: 'Coriolis Effect', id: 'Efek Coriolis' },
  description: {
    en: 'Stand on a spinning carousel and try to throw a ball straight across. From your view it curves; from outside, it travels in a straight line — you and your target moved. The same trick steers hurricanes.',
    id: 'Berdiri di komidi putar dan coba lempar bola lurus melintas. Dari sudut pandang Anda bola membelok; dari luar, ia bergerak lurus — Anda dan targetnyalah yang bergerak. Trik yang sama membelokkan badai.',
  },
  objectives: {
    en: [
      'Distinguish rotating-frame "force" from inertial straight-line motion.',
      'Predict deflection direction in northern (right) vs southern (left) hemisphere.',
      'Connect to weather patterns: cyclones spin opposite by hemisphere.',
    ],
    id: [
      'Membedakan "gaya" kerangka berputar dari gerak lurus inersia.',
      'Memprediksi arah pembelokan di belahan utara (kanan) vs selatan (kiri).',
      'Menghubungkan dengan pola cuaca: siklon berputar berlawanan tergantung belahan bumi.',
    ],
  },
  tryThis: {
    en: [
      'Throw from center to edge — does the ball curve in your view?',
      'Reverse rotation direction — does the deflection flip?',
      'Stop the disk — does the ball still curve?',
    ],
    id: [
      'Lempar dari tengah ke tepi — apakah bola membelok dari sudut pandang Anda?',
      'Balikkan arah putaran — apakah pembelokan ikut berbalik?',
      'Hentikan piringan — apakah bola masih membelok?',
    ],
  },
  topics: ['rotating-frames', 'meteorology'],
  load: () => import('./sim.js'),
};
