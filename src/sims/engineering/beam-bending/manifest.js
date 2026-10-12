export default {
  id: 'beam-bending',
  subject: 'engineering',
  title: { en: 'Beam Bending', id: 'Lendutan Balok' },
  description: {
    en: 'A simply-supported beam carrying a point load. Drag the load along the beam and watch the shear, moment, and deflection diagrams update in real time. The deflection curve and stress concentration come straight from Euler-Bernoulli beam theory.',
    id: 'Balok bertumpuan sederhana yang menanggung beban titik. Geser beban di sepanjang balok dan lihat diagram gaya geser, momen, serta lendutan terbarui langsung. Kurva lendutan dan konsentrasi tegangan langsung dari teori balok Euler-Bernoulli.',
  },
  details: () => import('./details.js'),
  topics: ['statics', 'mechanics-of-materials'],
  hasLab: true,
  load: () => import('./sim.js'),
};
