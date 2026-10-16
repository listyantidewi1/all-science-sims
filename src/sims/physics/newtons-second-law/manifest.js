export default {
  id: 'newtons-second-law',
  subject: 'physics',
  title: { en: 'Force, Mass, Acceleration', id: 'Gaya, Massa, Percepatan' },
  description: {
    en: 'Push a cart along a 12 m track with a force you choose (0–50 N), change its mass (1–10 kg) and switch friction on or off. A ticker tape prints a dot every 0.1 s, a velocity–time graph draws itself, and the sim shows F_net = F − f and a = F_net / m with the real numbers. Measure the slope of the graph and check that it matches F_net / m.',
    id: 'Dorong kereta di lintasan 12 m dengan gaya pilihanmu (0–50 N), ubah massanya (1–10 kg) dan nyalakan atau matikan gesekan. Pita ketik mencetak titik tiap 0,1 s, grafik kecepatan–waktu tergambar sendiri, dan simulasi menampilkan F_net = F − f serta a = F_net / m dengan angka sebenarnya. Ukur kemiringan grafik dan periksa apakah sama dengan F_net / m.',
  },
  topics: ['forces', 'Newton\'s laws', 'acceleration', 'graphs'],
  grade: [7, 8, 9],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
