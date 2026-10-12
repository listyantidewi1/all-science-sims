export default {
  id: 'ocean-acidification',
  subject: 'climate',
  title: { en: 'Ocean Acidification', id: 'Pengasaman Laut' },
  description: {
    en: 'When CO₂ dissolves in seawater it forms carbonic acid and lowers pH. Drag the atmospheric CO₂ slider and watch sea-surface pH fall, dragging the calcium-carbonate saturation state Ω with it. When Ω drops below 1, shells dissolve faster than they can grow — that is the threshold for coral reefs, shellfish, and pteropods.',
    id: 'Saat CO₂ larut dalam air laut, ia membentuk asam karbonat dan menurunkan pH. Geser slider CO₂ atmosfer dan amati pH permukaan laut turun, menyeret status saturasi kalsium karbonat Ω. Bila Ω turun di bawah 1, cangkang larut lebih cepat daripada terbentuk — itu ambang bagi terumbu karang, kerang, dan pteropoda.',
  },
  details: () => import('./details.js'),
  topics: ['climate', 'oceanography'],
  hasLab: true,
  load: () => import('./sim.js'),
};
