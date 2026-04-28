export default {
  id: 'cardiac-cycle',
  subject: 'biology',
  title: { en: 'Cardiac Cycle', id: 'Siklus Jantung' },
  description: {
    en: 'A schematic heart pumps in real time. Watch atria fill, ventricles contract, valves open and close in sequence — the cardiac cycle. The pressure-volume diagram traces the classic loop, and the indicator lights show which phase the heart is in. Adjust heart rate to see how cycle length scales.',
    id: 'Skema jantung memompa secara langsung. Amati atrium terisi, ventrikel berkontraksi, katup membuka dan menutup berurutan — siklus jantung. Diagram tekanan-volume menelusuri lingkaran klasik, dan lampu indikator menunjukkan fase jantung. Atur denyut jantung dan lihat panjang siklus berskala.',
  },
  objectives: {
    en: [
      'Identify the four phases: filling, isovolumetric contraction, ejection, isovolumetric relaxation.',
      'Recognize the lub-dub heart sounds (S1 = AV close, S2 = aortic close).',
      'Trace the pressure-volume loop and read stroke volume from its width.',
    ],
    id: [
      'Mengidentifikasi empat fase: pengisian, kontraksi isovolumetrik, ejeksi, relaksasi isovolumetrik.',
      'Mengenali bunyi lub-dub (S1 = AV menutup, S2 = aorta menutup).',
      'Menelusuri loop tekanan-volume dan membaca volume sekuncup dari lebarnya.',
    ],
  },
  tryThis: {
    en: [
      'Resting heart rate 60 bpm — one cycle per second.',
      'Crank to 180 bpm (intense exercise) — diastole shrinks more than systole.',
      'Reduce contractility — loop area shrinks, less work per beat.',
    ],
    id: [
      'Denyut istirahat 60 bpm — satu siklus per detik.',
      'Naikkan ke 180 bpm (olahraga berat) — diastol menyusut lebih banyak daripada sistol.',
      'Kurangi kontraktilitas — luas loop menyusut, kerja per detak berkurang.',
    ],
  },
  topics: ['physiology'],
  load: () => import('./sim.js'),
};
