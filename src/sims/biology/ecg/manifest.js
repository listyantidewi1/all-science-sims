export default {
  id: 'ecg',
  subject: 'biology',
  title: { en: 'ECG / Heart Rhythm', id: 'EKG / Irama Jantung' },
  description: {
    en: 'A schematic heart, plus a live electrocardiogram trace. Slide the heart rate from a deep sleep 50 bpm to a sprint 180 bpm, and watch the P-QRS-T waves march faster across the screen.',
    id: 'Diagram skema jantung, plus rekaman EKG langsung. Geser denyut jantung dari tidur nyenyak 50 bpm hingga sprint 180 bpm, dan amati gelombang P-QRS-T berjalan lebih cepat di layar.',
  },
  objectives: {
    en: [
      'Identify the P, QRS, and T waves on an ECG.',
      'Connect each wave to a phase of the cardiac cycle.',
      'See arrhythmias as deviations from the regular pattern.',
    ],
    id: [
      'Mengenali gelombang P, QRS, dan T pada EKG.',
      'Menghubungkan tiap gelombang dengan fase siklus jantung.',
      'Mengenali aritmia sebagai penyimpangan dari pola teratur.',
    ],
  },
  tryThis: {
    en: [
      'Tachycardia preset (160 bpm) — how do the waves change?',
      'Bradycardia preset (45 bpm) — what flattens out?',
      'Inject "missed beats" — what does it look like?',
    ],
    id: [
      'Praatur takikardia (160 bpm) — bagaimana gelombang berubah?',
      'Praatur bradikardia (45 bpm) — apa yang merata?',
      'Tambah "denyut hilang" — seperti apa tampilannya?',
    ],
  },
  topics: ['physiology', 'heart'],
  load: () => import('./sim.js'),
};
