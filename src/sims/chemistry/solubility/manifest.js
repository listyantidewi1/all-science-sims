export default {
  id: 'solubility',
  subject: 'chemistry',
  title: { en: 'Solubility & Saturation', id: 'Kelarutan & Kejenuhan' },
  description: {
    en: 'Spoon solute crystals into a beaker of water. Up to a temperature-dependent limit they dissolve; beyond it, the excess settles to the bottom. Heat the water and watch the limit rise.',
    id: 'Sendokkan kristal zat terlarut ke dalam gelas berisi air. Hingga batas yang bergantung suhu, kristal larut; di luar batas itu, sisa kristal mengendap di dasar. Panaskan air dan amati batas naik.',
  },
  details: () => import('./details.js'),
  topics: ['solutions', 'saturation'],
  hasLab: true,
  load: () => import('./sim.js'),
};
