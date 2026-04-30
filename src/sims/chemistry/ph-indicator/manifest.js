export default {
  id: 'ph-indicator',
  subject: 'chemistry',
  title: { en: 'pH Indicator Lab', id: 'Lab Indikator pH' },
  description: {
    en: 'Drop common indicators into solutions across the pH scale and watch the color change. Identify acids, bases, and neutrals from indicator color alone.',
    id: 'Teteskan indikator umum ke larutan di seluruh skala pH dan amati perubahan warnanya. Identifikasi asam, basa, dan netral hanya dari warna indikator.',
  },
  objectives: {
    en: [
      'Read approximate pH from an indicator color.',
      'Compare the working ranges of different indicators.',
      'Distinguish strong vs. weak acid/base behavior on the scale.',
    ],
    id: [
      'Membaca pH perkiraan dari warna indikator.',
      'Membandingkan rentang kerja indikator yang berbeda.',
      'Membedakan perilaku asam/basa kuat dan lemah pada skala.',
    ],
  },
  tryThis: {
    en: [
      'Set pH to 4.5 — which indicators clearly distinguish it from pH 6?',
      'Find an indicator that gives no useful information at pH 9.',
      'Match the color of household vinegar (pH ≈ 2.4).',
    ],
    id: [
      'Atur pH ke 4,5 — indikator mana yang jelas membedakannya dari pH 6?',
      'Cari indikator yang tidak memberi informasi berguna pada pH 9.',
      'Cocokkan warna cuka rumah tangga (pH ≈ 2,4).',
    ],
  },
  topics: ['acids', 'bases', 'indicators'],
  grade: [10, 11],
  hasLab: true,
  load: () => import('./sim.js'),
};
