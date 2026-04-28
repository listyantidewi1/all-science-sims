export default {
  id: 'ocean-acidification',
  subject: 'climate',
  title: { en: 'Ocean Acidification', id: 'Pengasaman Laut' },
  description: {
    en: 'When CO₂ dissolves in seawater it forms carbonic acid and lowers pH. Drag the atmospheric CO₂ slider and watch sea-surface pH fall, dragging the calcium-carbonate saturation state Ω with it. When Ω drops below 1, shells dissolve faster than they can grow — that is the threshold for coral reefs, shellfish, and pteropods.',
    id: 'Saat CO₂ larut dalam air laut, ia membentuk asam karbonat dan menurunkan pH. Geser slider CO₂ atmosfer dan amati pH permukaan laut turun, menyeret status saturasi kalsium karbonat Ω. Bila Ω turun di bawah 1, cangkang larut lebih cepat daripada terbentuk — itu ambang bagi terumbu karang, kerang, dan pteropoda.',
  },
  objectives: {
    en: [
      'Connect atmospheric CO₂ (ppm) to surface-ocean pH and Ω.',
      'See the pre-industrial vs today vs RCP-scenario differences.',
      'Identify the Ω = 1 threshold below which carbonate skeletons dissolve.',
    ],
    id: [
      'Menghubungkan CO₂ atmosfer (ppm) dengan pH permukaan laut dan Ω.',
      'Melihat perbedaan pra-industri vs hari ini vs skenario RCP.',
      'Mengidentifikasi ambang Ω = 1 di mana kerangka karbonat larut.',
    ],
  },
  tryThis: {
    en: [
      'Pre-industrial 280 ppm — pH 8.18, Ω ≈ 4.5 (ample for shell growth).',
      'Today ~420 ppm — pH 8.07, Ω dropped ~25%.',
      'RCP 8.5 ~900 ppm — pH 7.75, Ω near 1.5; corals struggle.',
    ],
    id: [
      'Pra-industri 280 ppm — pH 8,18; Ω ≈ 4,5 (cukup untuk pertumbuhan cangkang).',
      'Hari ini ~420 ppm — pH 8,07; Ω turun ~25%.',
      'RCP 8.5 ~900 ppm — pH 7,75; Ω hampir 1,5; karang kesulitan.',
    ],
  },
  topics: ['climate', 'oceanography'],
  load: () => import('./sim.js'),
};
