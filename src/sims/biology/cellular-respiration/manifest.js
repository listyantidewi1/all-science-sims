export default {
  id: 'cellular-respiration',
  subject: 'biology',
  title: { en: 'Cellular Respiration', id: 'Respirasi Sel' },
  description: {
    en: 'How cells turn glucose into ATP. Step through glycolysis, the Krebs cycle, and the electron transport chain — counting molecules of ATP, NADH, FADH₂, CO₂ at every stage. The complete budget of aerobic respiration in one diagram.',
    id: 'Bagaimana sel mengubah glukosa menjadi ATP. Telusuri glikolisis, siklus Krebs, dan rantai transpor elektron — menghitung molekul ATP, NADH, FADH₂, CO₂ pada setiap tahap. Anggaran lengkap respirasi aerobik dalam satu diagram.',
  },
  objectives: {
    en: [
      'Identify the three stages: glycolysis, Krebs, ETC.',
      'Count net ATP yield per stage.',
      'See where O₂ is consumed and CO₂ released.',
    ],
    id: [
      'Mengenali tiga tahap: glikolisis, Krebs, ETC.',
      'Menghitung hasil ATP neto per tahap.',
      'Melihat di mana O₂ dikonsumsi dan CO₂ dilepaskan.',
    ],
  },
  tryThis: {
    en: [
      'Step through and verify total ATP ≈ 30–32.',
      'Anaerobic only — how much ATP from glycolysis alone?',
      'Block ETC (no O₂) — what stops accumulating?',
    ],
    id: [
      'Telusuri dan verifikasi total ATP ≈ 30–32.',
      'Anaerob saja — berapa ATP hanya dari glikolisis?',
      'Hentikan ETC (tanpa O₂) — apa yang berhenti menumpuk?',
    ],
  },
  topics: ['metabolism', 'cell-biology'],
  load: () => import('./sim.js'),
};
