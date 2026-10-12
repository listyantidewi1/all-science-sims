export default {
  id: 'yield-curves',
  subject: 'finance',
  title: { en: 'Yield Curve Shapes', id: 'Bentuk Kurva Imbal Hasil' },
  description: {
    en: "Plot Treasury bond yields by maturity. Normally short-term rates are lower than long-term — investors demand a premium for time. When the curve inverts (short > long), recession is often around the corner. Drag the points to build any curve and see what's signaled.",
    id: 'Plot imbal hasil obligasi negara berdasarkan tenor. Biasanya bunga jangka pendek lebih rendah dari panjang — investor menuntut premi waktu. Ketika kurva terbalik (pendek > panjang), resesi sering mengintai. Geser titik untuk membentuk kurva apa pun dan lihat sinyalnya.',
  },
  details: () => import('./details.js'),
  topics: ['fixed-income', 'macro'],
  load: () => import('./sim.js'),
};
