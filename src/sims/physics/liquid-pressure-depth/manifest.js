export default {
  id: 'liquid-pressure-depth',
  subject: 'physics',
  title: { en: 'Pressure and Depth', id: 'Tekanan Hidrostatis' },
  description: {
    en: 'Punch three holes in a tall bottle and watch the water jets: the deepest hole squirts the farthest. Drag a pressure probe up and down inside the liquid to read P = ρgh, switch between water, oil and salt water, and then dive into the sea to feel how the pressure climbs by about one atmosphere every ten metres.',
    id: 'Buat tiga lubang pada botol tinggi dan amati pancaran airnya: lubang terdalam memancar paling jauh. Geser sensor tekanan naik-turun di dalam zat cair untuk membaca P = ρgh, ganti antara air, minyak dan air garam, lalu menyelam ke laut untuk merasakan tekanan yang naik sekitar satu atmosfer setiap sepuluh meter.',
  },
  topics: ['pressure', 'fluids', 'density', 'depth'],
  grade: [7, 8, 9],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
