export default {
  id: 'heat-sink',
  subject: 'engineering',
  title: { en: 'Heat Sink Design', id: 'Desain Pendingin Panas' },
  description: {
    en: 'A CPU dissipates power; a heat sink with thermal resistance R_θ removes it; the chip temperature rises until P × R_θ + T_ambient. Adjust the thermal resistance and ambient and watch the chip overheat or stay safe. Live time-domain plot shows the thermal-RC settling toward steady state.',
    id: 'Sebuah CPU melepas daya; pendingin dengan resistansi termal R_θ membuangnya; suhu chip naik hingga P × R_θ + T_lingkungan. Atur resistansi termal dan lingkungan, amati chip kepanasan atau aman. Plot waktu langsung menampilkan thermal-RC menetap menuju steady-state.',
  },
  details: () => import('./details.js'),
  topics: ['thermodynamics', 'electronics-cooling'],
  hasLab: true,
  load: () => import('./sim.js'),
};
