export default {
  id: 'exponential-log',
  subject: 'mathematics',
  title: { en: 'Exponentials and Logarithms', id: 'Eksponen dan Logaritma' },
  description: {
    en: 'Plot y = a·bˣ with sliders for a and b, drag a point along the curve and read off the doubling time or half-life. Switch on the inverse to see the logarithm appear as the reflection of the curve in the line y = x, and use the solver panel to follow every step of solving a·bˣ = c with logarithms. Presets for bacteria that double, a decaying radioactive sample and money that compounds connect the formulas to real growth and decay.',
    id: 'Gambar y = a·bˣ dengan penggeser a dan b, seret sebuah titik di sepanjang kurva dan baca waktu penggandaan atau waktu paruhnya. Nyalakan fungsi invers untuk melihat logaritma muncul sebagai pencerminan kurva terhadap garis y = x, dan gunakan panel penyelesaian untuk mengikuti setiap langkah menyelesaikan a·bˣ = c dengan logaritma. Prasetel bakteri yang berlipat dua, sampel radioaktif yang meluruh dan uang yang berbunga majemuk menghubungkan rumus dengan pertumbuhan dan peluruhan nyata.',
  },
  topics: ['exponential functions', 'logarithms', 'exponent rules', 'growth and decay', 'inverse functions'],
  grade: [10, 11],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
