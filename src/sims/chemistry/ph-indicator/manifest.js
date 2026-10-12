export default {
  id: 'ph-indicator',
  subject: 'chemistry',
  title: { en: 'pH Indicator Lab', id: 'Lab Indikator pH' },
  description: {
    en: 'Drop common indicators into solutions across the pH scale and watch the color change. Identify acids, bases, and neutrals from indicator color alone.',
    id: 'Teteskan indikator umum ke larutan di seluruh skala pH dan amati perubahan warnanya. Identifikasi asam, basa, dan netral hanya dari warna indikator.',
  },
  details: () => import('./details.js'),
  topics: ['acids', 'bases', 'indicators'],
  grade: [10, 11],
  hasLab: true,
  load: () => import('./sim.js'),
};
