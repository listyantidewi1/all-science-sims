export default {
  id: 'transformer',
  subject: 'engineering',
  title: { en: 'Transformer', id: 'Transformator' },
  description: {
    en: 'A primary coil drives a magnetic core that links to a secondary coil. The voltage scales with the turns ratio (V₂/V₁ = N₂/N₁) while the current scales inversely — power in equals power out (ideal). Adjust both turn counts and watch a step-up or step-down transformer in action.',
    id: 'Kumparan primer menggerakkan inti magnet yang berhubungan dengan kumparan sekunder. Tegangan berskala rasio belitan (V₂/V₁ = N₂/N₁) sementara arus berskala terbalik — daya masuk sama daya keluar (ideal). Atur jumlah belitan dan amati transformator step-up atau step-down beraksi.',
  },
  details: () => import('./details.js'),
  topics: ['electronics', 'power'],
  grade: [10, 11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
