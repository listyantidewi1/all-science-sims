export default {
  id: 'ecg',
  subject: 'biology',
  title: { en: 'ECG / Heart Rhythm', id: 'EKG / Irama Jantung' },
  description: {
    en: 'A schematic heart, plus a live electrocardiogram trace. Slide the heart rate from a deep sleep 50 bpm to a sprint 180 bpm, and watch the P-QRS-T waves march faster across the screen.',
    id: 'Diagram skema jantung, plus rekaman EKG langsung. Geser denyut jantung dari tidur nyenyak 50 bpm hingga sprint 180 bpm, dan amati gelombang P-QRS-T berjalan lebih cepat di layar.',
  },
  details: () => import('./details.js'),
  topics: ['physiology', 'heart'],
  load: () => import('./sim.js'),
};
