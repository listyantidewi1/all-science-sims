export default {
  id: 'special-relativity',
  subject: 'physics',
  title: { en: 'Time Dilation and Length Contraction', id: 'Dilatasi Waktu dan Kontraksi Panjang' },
  description: {
    en: 'Watch a light clock on a spaceship from two points of view at once: in the ship frame the light bounces straight up and down, while from the ground the same light travels a longer zigzag at the same speed c, so the moving clock ticks slower by the factor γ = 1/√(1 − v²/c²). Push the speed towards 0.99c, read γ off the graph, see a rod shrink to L₀/γ, and follow a cosmic-ray muon with a 2.2 μs lifetime to find out why it still reaches the ground from 10 km up.',
    id: 'Amati jam cahaya di pesawat antariksa dari dua sudut pandang sekaligus: dalam kerangka pesawat cahaya memantul lurus ke atas dan ke bawah, sedangkan dari tanah cahaya yang sama menempuh lintasan zig-zag yang lebih panjang dengan laju c yang sama, sehingga jam yang bergerak berdetak lebih lambat dengan faktor γ = 1/√(1 − v²/c²). Dorong kecepatan menuju 0,99c, baca γ dari grafik, lihat batang menyusut menjadi L₀/γ, dan ikuti muon sinar kosmik berumur 2,2 μs untuk mengetahui mengapa ia tetap sampai ke tanah dari ketinggian 10 km.',
  },
  topics: ['special relativity', 'time dilation', 'length contraction', 'Lorentz factor'],
  grade: [12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
