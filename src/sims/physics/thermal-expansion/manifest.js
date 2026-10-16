export default {
  id: 'thermal-expansion',
  subject: 'physics',
  title: { en: 'Thermal Expansion', id: 'Pemuaian' },
  description: {
    en: 'Heat a steel rail, a metal ball next to a ring, or a steel-brass bimetal strip from 0 to 300 °C and watch them grow. The rail\'s expansion is drawn 100 times bigger than life, but the real number is calculated with ΔL = α·L·ΔT using real expansion coefficients. Make the rail close its expansion gap and buckle, get the ball stuck in the ring, and bend the bimetal strip until it opens a thermostat contact.',
    id: 'Panaskan rel baja, bola logam di dekat cincin, atau keping bimetal baja-kuningan dari 0 sampai 300 °C dan lihat benda itu memuai. Pemuaian rel digambar 100 kali lebih besar dari aslinya, tetapi angka sebenarnya dihitung dengan ΔL = α·L·ΔT memakai koefisien muai yang nyata. Buat rel menutup celah pemuaiannya lalu melengkung, buat bola tersangkut di cincin, dan lengkungkan keping bimetal sampai membuka kontak termostat.',
  },
  topics: ['heat', 'thermal expansion', 'temperature'],
  grade: [7],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
