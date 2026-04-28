export default {
  id: 'yield-curves',
  subject: 'finance',
  title: { en: 'Yield Curve Shapes', id: 'Bentuk Kurva Imbal Hasil' },
  description: {
    en: "Plot Treasury bond yields by maturity. Normally short-term rates are lower than long-term — investors demand a premium for time. When the curve inverts (short > long), recession is often around the corner. Drag the points to build any curve and see what's signaled.",
    id: 'Plot imbal hasil obligasi negara berdasarkan tenor. Biasanya bunga jangka pendek lebih rendah dari panjang — investor menuntut premi waktu. Ketika kurva terbalik (pendek > panjang), resesi sering mengintai. Geser titik untuk membentuk kurva apa pun dan lihat sinyalnya.',
  },
  objectives: {
    en: [
      'Identify normal, flat, and inverted yield curves.',
      'Compute the 10y−2y spread (a famous recession indicator).',
      'Connect curve shape to inflation expectations and policy.',
    ],
    id: [
      'Mengenali kurva imbal hasil normal, datar, dan terbalik.',
      'Menghitung spread 10y−2y (indikator resesi terkenal).',
      'Mengaitkan bentuk kurva dengan ekspektasi inflasi dan kebijakan.',
    ],
  },
  tryThis: {
    en: [
      'Drag short rates above long ones — what shape?',
      "Set 10y−2y to −0.5% — that's an inversion.",
      "Build a steep normal curve — what does that suggest about expected growth?",
    ],
    id: [
      'Geser bunga pendek di atas bunga panjang — bentuk apa?',
      'Atur 10y−2y ke −0,5% — itu inversi.',
      'Buat kurva normal curam — apa artinya untuk ekspektasi pertumbuhan?',
    ],
  },
  topics: ['fixed-income', 'macro'],
  load: () => import('./sim.js'),
};
