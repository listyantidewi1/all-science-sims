export default {
  id: 'ice-albedo',
  subject: 'climate',
  title: { en: 'Ice-Albedo Feedback', id: 'Umpan Balik Es-Albedo' },
  description: {
    en: 'A simple energy-balance climate model with ice. Ice reflects sunlight, so cold worlds stay cold; if you nudge the temperature past a threshold, the feedback flips and you can lock into a much warmer state. The plot shows the bistability — two stable equilibria at the same solar input.',
    id: 'Model keseimbangan-energi sederhana dengan es. Es memantulkan cahaya matahari, jadi dunia dingin tetap dingin; jika suhu melewati ambang, umpan balik berbalik dan dunia bisa terkunci dalam keadaan jauh lebih hangat. Grafik menunjukkan bistabilitas — dua keseimbangan stabil di input matahari yang sama.',
  },
  objectives: {
    en: [
      'See that planetary albedo depends on temperature (more ice = more reflection).',
      'Spot the two stable equilibria — one icy, one warm.',
      'Find the tipping point: the unstable middle equilibrium.',
    ],
    id: [
      'Melihat bahwa albedo planet bergantung pada suhu (lebih banyak es = lebih banyak pantulan).',
      'Menemukan dua keseimbangan stabil — satu beku, satu hangat.',
      'Menemukan titik kritis: keseimbangan tak-stabil di tengah.',
    ],
  },
  tryThis: {
    en: [
      'Drag the temperature ball — release at T<255K → snowball Earth.',
      'Drag the ball above ~270K → it slides up to a warm equilibrium.',
      'Lower solar input — the warm equilibrium disappears and only ice remains.',
    ],
    id: [
      'Geser bola suhu — lepas di T<255K → Bumi bola salju.',
      'Geser bola di atas ~270K → menggelinding ke keseimbangan hangat.',
      'Kurangi input matahari — keseimbangan hangat menghilang, hanya tinggal es.',
    ],
  },
  topics: ['climate', 'feedback'],
  hasLab: true,
  load: () => import('./sim.js'),
};
