export default {
  id: 'truss-analyzer',
  subject: 'engineering',
  title: { en: 'Truss Analyzer', id: 'Analisis Rangka Batang' },
  description: {
    en: 'A pin-jointed truss bridge under a moving load. Each member is colored by its internal force — red is tension, blue is compression. Drag the load car along the deck and watch the force pattern change. The internal forces come from method-of-joints equilibrium.',
    id: 'Rangka batang berhubung sendi yang menopang beban bergerak. Tiap batang diwarnai oleh gaya dalamnya — merah untuk tarik, biru untuk tekan. Geser beban di sepanjang dek dan lihat pola gaya berubah. Gaya dalam diperoleh dari kesetimbangan metode joint.',
  },
  details: () => import('./details.js'),
  topics: ['statics', 'structural-analysis'],
  load: () => import('./sim.js'),
};
