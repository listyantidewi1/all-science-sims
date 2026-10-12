export default {
  id: 'cardiac-cycle',
  subject: 'biology',
  title: { en: 'Cardiac Cycle', id: 'Siklus Jantung' },
  description: {
    en: 'A schematic heart pumps in real time. Watch atria fill, ventricles contract, valves open and close in sequence — the cardiac cycle. The pressure-volume diagram traces the classic loop, and the indicator lights show which phase the heart is in. Adjust heart rate to see how cycle length scales.',
    id: 'Skema jantung memompa secara langsung. Amati atrium terisi, ventrikel berkontraksi, katup membuka dan menutup berurutan — siklus jantung. Diagram tekanan-volume menelusuri lingkaran klasik, dan lampu indikator menunjukkan fase jantung. Atur denyut jantung dan lihat panjang siklus berskala.',
  },
  details: () => import('./details.js'),
  topics: ['physiology'],
  load: () => import('./sim.js'),
};
