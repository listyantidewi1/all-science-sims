export default {
  id: 'function-plotter',
  subject: 'mathematics',
  title: { en: 'Function Plotter', id: 'Penggambar Fungsi' },
  description: {
    en: 'Slide the coefficients of a polynomial, or pick sin/cos/exp/log, and watch the curve respond. The simplest place to build intuition for what each parameter does.',
    id: 'Geser koefisien polinomial, atau pilih sin/cos/exp/log, lalu amati kurva merespons. Tempat termudah untuk membangun intuisi tentang peran tiap parameter.',
  },
  objectives: {
    en: [
      'Connect coefficients to graph features (intercepts, turning points).',
      'Compare polynomials, exponentials, and trig functions side by side.',
      'Predict end behavior from leading term.',
    ],
    id: [
      'Menghubungkan koefisien dengan ciri grafik (titik potong, titik balik).',
      'Membandingkan polinomial, eksponensial, dan trigonometri.',
      'Memprediksi perilaku ujung dari suku pemimpin.',
    ],
  },
  tryThis: {
    en: [
      'Set a=1, b=0, c=−4, d=0 — find the three roots.',
      'Switch to sine; double the frequency — what happens?',
      'Toggle to e^x — does anything cross y=0?',
    ],
    id: [
      'Atur a=1, b=0, c=−4, d=0 — temukan tiga akarnya.',
      'Beralih ke sinus; gandakan frekuensi — apa yang terjadi?',
      'Beralih ke e^x — apakah ada yang memotong y=0?',
    ],
  },
  topics: ['algebra', 'graphing'],
  load: () => import('./sim.js'),
};
