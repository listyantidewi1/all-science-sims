export default {
  id: 'transformer',
  subject: 'engineering',
  title: { en: 'Transformer', id: 'Transformator' },
  description: {
    en: 'A primary coil drives a magnetic core that links to a secondary coil. The voltage scales with the turns ratio (V₂/V₁ = N₂/N₁) while the current scales inversely — power in equals power out (ideal). Adjust both turn counts and watch a step-up or step-down transformer in action.',
    id: 'Kumparan primer menggerakkan inti magnet yang berhubungan dengan kumparan sekunder. Tegangan berskala rasio belitan (V₂/V₁ = N₂/N₁) sementara arus berskala terbalik — daya masuk sama daya keluar (ideal). Atur jumlah belitan dan amati transformator step-up atau step-down beraksi.',
  },
  objectives: {
    en: [
      'Apply V₂/V₁ = N₂/N₁ for ideal transformers.',
      'Apply I₁ V₁ = I₂ V₂ (power conservation).',
      'See why high-voltage transmission and step-down distribution exist.',
    ],
    id: [
      'Menerapkan V₂/V₁ = N₂/N₁ untuk transformator ideal.',
      'Menerapkan I₁ V₁ = I₂ V₂ (kekekalan daya).',
      'Memahami mengapa transmisi tegangan tinggi dan distribusi step-down ada.',
    ],
  },
  tryThis: {
    en: [
      'N₁ = 100, N₂ = 1000 — step up 10×.',
      'N₁ = 1000, N₂ = 50 — step down 20× (typical pole transformer).',
      'Equal — 1:1 isolation transformer.',
    ],
    id: [
      'N₁ = 100, N₂ = 1000 — step up 10×.',
      'N₁ = 1000, N₂ = 50 — step down 20× (transformator tiang tipikal).',
      'Sama — transformator isolasi 1:1.',
    ],
  },
  topics: ['electronics', 'power'],
  load: () => import('./sim.js'),
};
