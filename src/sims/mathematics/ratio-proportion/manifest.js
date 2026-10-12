export default {
  id: 'ratio-proportion',
  subject: 'mathematics',
  title: { en: 'Ratio and Proportion', id: 'Rasio dan Perbandingan' },
  description: {
    en: 'Mix blue and yellow paint to make green, or concentrate and water to make juice. Set the two parts with counters and watch the colour, the bar model and the double number line update. Scale the recipe up or down without changing the shade, then take a challenge: make the same shade with a different number of cups.',
    id: 'Campur cat biru dan kuning menjadi hijau, atau sari buah dan air menjadi jus. Atur kedua bagian dengan penghitung dan lihat warna, model batang, dan garis bilangan ganda berubah. Perbesar atau perkecil resep tanpa mengubah warnanya, lalu coba tantangan: buat warna yang sama dengan jumlah cangkir yang berbeda.',
  },
  topics: ['ratio', 'proportion', 'fractions'],
  grade: [6, 7, 8],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
