export default {
  id: 'logistic-growth',
  subject: 'social-science',
  title: { en: 'Logistic Population Growth', id: 'Pertumbuhan Populasi Logistik' },
  description: {
    en: 'A population grows exponentially when small but levels off as it approaches the carrying capacity K. The logistic equation dN/dt = rN(1 − N/K) generates the classic S-curve. Drag r and K and watch the curve change in real time, with both the exponential approximation and the logistic shown for comparison.',
    id: 'Populasi tumbuh eksponensial saat kecil tetapi mendatar mendekati daya dukung K. Persamaan logistik dN/dt = rN(1 − N/K) menghasilkan kurva-S klasik. Geser r dan K dan amati kurva berubah langsung, dengan perkiraan eksponensial dan logistik ditampilkan untuk perbandingan.',
  },
  objectives: {
    en: [
      'See exponential growth become logistic when N approaches K.',
      'Identify the inflection point at N = K/2 — fastest growth.',
      'Connect r (intrinsic growth rate) and K (carrying capacity) to ecology and economics.',
    ],
    id: [
      'Melihat pertumbuhan eksponensial menjadi logistik saat N mendekati K.',
      'Mengidentifikasi titik belok di N = K/2 — pertumbuhan tercepat.',
      'Menghubungkan r (laju intrinsik) dan K (daya dukung) dengan ekologi dan ekonomi.',
    ],
  },
  tryThis: {
    en: [
      'Small N₀ — early growth looks exponential, then bends.',
      'Large r — population shoots up, overshoots K (in continuous logistic, no overshoot).',
      'Small K — population levels off quickly.',
    ],
    id: [
      'N₀ kecil — pertumbuhan awal tampak eksponensial, lalu membengkok.',
      'r besar — populasi meroket, melampaui K (di logistik kontinu, tak ada overshoot).',
      'K kecil — populasi cepat mendatar.',
    ],
  },
  topics: ['ecology', 'population'],
  hasLab: true,
  load: () => import('./sim.js'),
};
