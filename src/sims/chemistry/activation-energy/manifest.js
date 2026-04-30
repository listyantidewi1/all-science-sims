export default {
  id: 'activation-energy',
  subject: 'chemistry',
  title: { en: 'Activation Energy & Catalysis', id: 'Energi Aktivasi & Katalisis' },
  description: {
    en: 'Drag the energy diagram to set the activation barrier and the heat of reaction. The Arrhenius equation k = A exp(−Eₐ/RT) gives the rate. Add a catalyst to lower Eₐ — the rate jumps without changing the overall energy change. Compare exothermic and endothermic reactions on the same plot.',
    id: 'Geser diagram energi untuk mengatur tinggi penghalang aktivasi dan kalor reaksi. Persamaan Arrhenius k = A exp(−Eₐ/RT) memberi laju. Tambah katalis untuk menurunkan Eₐ — laju melonjak tanpa mengubah perubahan energi total. Bandingkan reaksi eksotermik dan endotermik pada plot yang sama.',
  },
  objectives: {
    en: [
      'Apply Arrhenius: k = A exp(−Eₐ/RT).',
      'See that catalysts lower Eₐ but leave ΔH alone.',
      'Doubling temperature roughly multiplies rate by ~2 per 10°C.',
    ],
    id: [
      'Menerapkan Arrhenius: k = A exp(−Eₐ/RT).',
      'Melihat katalis menurunkan Eₐ tetapi tidak mengubah ΔH.',
      'Naikkan suhu — laju kira-kira ×2 per 10°C.',
    ],
  },
  tryThis: {
    en: [
      'High Eₐ — slow rate. Add catalyst → rate jumps an order of magnitude.',
      'Crank temperature — Arrhenius rate climbs steeply.',
      'Endothermic ΔH — products higher than reactants; barrier still applies.',
    ],
    id: [
      'Eₐ tinggi — laju lambat. Tambah katalis → laju naik satu orde.',
      'Naikkan suhu — laju Arrhenius naik tajam.',
      'ΔH endotermik — produk lebih tinggi dari pereaksi; penghalang tetap berlaku.',
    ],
  },
  topics: ['kinetics', 'thermodynamics'],
  hasLab: true,
  load: () => import('./sim.js'),
};
