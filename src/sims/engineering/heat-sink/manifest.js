export default {
  id: 'heat-sink',
  subject: 'engineering',
  title: { en: 'Heat Sink Design', id: 'Desain Pendingin Panas' },
  description: {
    en: 'A CPU dissipates power; a heat sink with thermal resistance R_θ removes it; the chip temperature rises until P × R_θ + T_ambient. Adjust the thermal resistance and ambient and watch the chip overheat or stay safe. Live time-domain plot shows the thermal-RC settling toward steady state.',
    id: 'Sebuah CPU melepas daya; pendingin dengan resistansi termal R_θ membuangnya; suhu chip naik hingga P × R_θ + T_lingkungan. Atur resistansi termal dan lingkungan, amati chip kepanasan atau aman. Plot waktu langsung menampilkan thermal-RC menetap menuju steady-state.',
  },
  objectives: {
    en: [
      'Apply T_chip = P · R_θ + T_ambient (steady state).',
      'Connect thermal resistance to fin area and airflow.',
      'See thermal capacitance: chips warm up over seconds, not instantly.',
    ],
    id: [
      'Menerapkan T_chip = P · R_θ + T_lingkungan (steady-state).',
      'Menghubungkan resistansi termal dengan luas sirip dan aliran udara.',
      'Melihat kapasitansi termal: chip menghangat dalam detik, tidak seketika.',
    ],
  },
  tryThis: {
    en: [
      'P = 65 W (a CPU), R_θ = 0.5 K/W, ambient 25 °C → 57 °C.',
      'Same chip, R_θ = 1.5 K/W (cheap heatsink) → 122 °C, throttle / damage.',
      'Crank ambient to 40 °C — every R_θ now produces a higher floor.',
    ],
    id: [
      'P = 65 W (CPU), R_θ = 0,5 K/W, lingkungan 25 °C → 57 °C.',
      'Chip sama, R_θ = 1,5 K/W (heatsink murah) → 122 °C, throttle/rusak.',
      'Naikkan lingkungan ke 40 °C — tiap R_θ kini menghasilkan dasar lebih tinggi.',
    ],
  },
  topics: ['thermodynamics', 'electronics-cooling'],
  load: () => import('./sim.js'),
};
