export default {
  id: 'activation-energy',
  subject: 'chemistry',
  title: { en: 'Activation Energy & Catalysis', id: 'Energi Aktivasi & Katalisis' },
  description: {
    en: 'Drag the energy diagram to set the activation barrier and the heat of reaction. The Arrhenius equation k = A exp(−Eₐ/RT) gives the rate. Add a catalyst to lower Eₐ — the rate jumps without changing the overall energy change. Compare exothermic and endothermic reactions on the same plot.',
    id: 'Geser diagram energi untuk mengatur tinggi penghalang aktivasi dan kalor reaksi. Persamaan Arrhenius k = A exp(−Eₐ/RT) memberi laju. Tambah katalis untuk menurunkan Eₐ — laju melonjak tanpa mengubah perubahan energi total. Bandingkan reaksi eksotermik dan endotermik pada plot yang sama.',
  },
  details: () => import('./details.js'),
  topics: ['kinetics', 'thermodynamics'],
  hasLab: true,
  load: () => import('./sim.js'),
};
