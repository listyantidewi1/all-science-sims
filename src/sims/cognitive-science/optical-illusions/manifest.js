export default {
  id: 'optical-illusions',
  subject: 'cognitive-science',
  title: { en: 'Optical Illusions Gallery', id: 'Galeri Ilusi Optik' },
  description: {
    en: 'Six classic illusions where your brain insists on the wrong answer even after you measure: Müller-Lyer, Ponzo, Café Wall, Hering, Ebbinghaus, and Checker Shadow. Toggle the "rulers" overlay to confirm — the lines really are equal.',
    id: 'Enam ilusi klasik di mana otak Anda bersikukuh pada jawaban yang salah meski setelah Anda mengukur: Müller-Lyer, Ponzo, Café Wall, Hering, Ebbinghaus, dan Bayangan Papan Catur. Aktifkan overlay "penggaris" untuk mengonfirmasi — garis-garis itu benar-benar sama.',
  },
  details: () => import('./details.js'),
  topics: ['perception', 'visual-processing'],
  grade: [5, 6, 7, 8, 9],
  load: () => import('./sim.js'),
};
