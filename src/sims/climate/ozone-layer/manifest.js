export default {
  id: 'ozone-layer',
  subject: 'climate',
  title: { en: 'Ozone Layer & CFCs', id: 'Lapisan Ozon & CFC' },
  description: {
    en: 'Stratospheric ozone (O₃) is created and destroyed naturally by the Chapman cycle. CFCs released decades ago break apart in UV light, freeing chlorine atoms that catalytically destroy ozone — one chlorine can wipe out 100,000 O₃ molecules. Drag the CFC slider and watch the ozone column thin.',
    id: 'Ozon stratosfer (O₃) dibuat dan dihancurkan secara alami oleh siklus Chapman. CFC yang dilepas dekade lalu pecah di bawah sinar UV, melepaskan atom klorin yang secara katalitik menghancurkan ozon — satu klorin dapat menghilangkan 100.000 molekul O₃. Geser slider CFC dan amati kolom ozon menipis.',
  },
  objectives: {
    en: [
      'See the natural Chapman cycle: O₂ + UV → 2 O, then O + O₂ → O₃, then O₃ + UV → O₂ + O.',
      'Connect Cl atoms (from CFCs) to catalytic ozone loss.',
      'Understand why the Montreal Protocol (1987) banned CFCs and the layer is now slowly recovering.',
    ],
    id: [
      'Melihat siklus Chapman alami: O₂ + UV → 2 O, lalu O + O₂ → O₃, lalu O₃ + UV → O₂ + O.',
      'Menghubungkan atom Cl (dari CFC) dengan kehilangan ozon katalitik.',
      'Memahami mengapa Protokol Montreal (1987) melarang CFC dan lapisannya kini perlahan pulih.',
    ],
  },
  tryThis: {
    en: [
      'CFC = 0 — natural Chapman steady state, O₃ ≈ 300 DU.',
      'CFC = 3 ppb (1990s peak) — Antarctic-style depletion, ~150 DU.',
      'Sweep CFC down to 0 — recovery curve over decades.',
    ],
    id: [
      'CFC = 0 — keadaan tunak Chapman alami, O₃ ≈ 300 DU.',
      'CFC = 3 ppb (puncak 1990-an) — pengurangan ala Antarktika, ~150 DU.',
      'Geser CFC turun ke 0 — kurva pemulihan dekade.',
    ],
  },
  topics: ['atmospheric-chemistry'],
  load: () => import('./sim.js'),
};
