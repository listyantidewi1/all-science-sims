export default {
  id: 'capacitor',
  subject: 'physics',
  title: { en: 'Parallel-Plate Capacitor', id: 'Kapasitor Keping Sejajar' },
  description: {
    en: 'Build a parallel-plate capacitor: set the plate area, the gap and the dielectric (air, paper, glass or water) and read C = κε₀A/d in picofarads. Connect a battery to see the charge Q = CV, the field E = V/d drawn as field lines, and the stored energy ½CV². Switch to RC mode, add a resistor and watch the voltage climb along V(t) = V₀(1 − e^(−t/RC)) with the time constant τ marked on the graph.',
    id: 'Rakit kapasitor keping sejajar: atur luas keping, jarak celah, dan bahan dielektrik (udara, kertas, kaca, atau air) lalu baca C = κε₀A/d dalam pikofarad. Hubungkan baterai untuk melihat muatan Q = CV, medan E = V/d yang digambar sebagai garis gaya, dan energi tersimpan ½CV². Beralih ke mode RC, tambahkan resistor dan lihat tegangan naik mengikuti V(t) = V₀(1 − e^(−t/RC)) dengan tetapan waktu τ ditandai pada grafik.',
  },
  topics: ['capacitance', 'dielectric', 'electric field', 'RC circuit', 'energy storage'],
  grade: [11, 12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
