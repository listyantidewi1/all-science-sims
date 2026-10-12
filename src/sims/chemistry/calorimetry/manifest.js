export default {
  id: 'calorimetry',
  subject: 'chemistry',
  title: { en: 'Calorimetry', id: 'Kalorimetri' },
  description: {
    en: 'Drop a hot metal block into a cup of cool water and watch the temperatures equilibrate. Q = m·c·ΔT for both objects, with Q gained by the cool one equal to Q lost by the hot one. Compare specific heats — water\'s huge c is why it stabilizes climate and why metals heat your hand fast.',
    id: 'Jatuhkan balok logam panas ke dalam cangkir air dingin dan amati suhu menyamakan diri. Q = m·c·ΔT untuk kedua benda, dengan Q yang diperoleh dingin sama dengan Q yang dilepas panas. Bandingkan kalor jenis — c air yang besar adalah alasan air menstabilkan iklim dan logam memanaskan tangan Anda dengan cepat.',
  },
  details: () => import('./details.js'),
  topics: ['thermodynamics'],
  grade: [9, 10, 11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
