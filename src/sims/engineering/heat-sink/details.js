// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
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
  },  tryThis: {
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
  },};
