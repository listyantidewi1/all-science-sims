export default {
  id: 'op-amp',
  subject: 'engineering',
  title: { en: 'Op-Amp Inverting Amplifier', id: 'Penguat Inverting Op-Amp' },
  description: {
    en: 'A textbook inverting op-amp configuration. Adjust the input resistor R_in and feedback resistor R_f, watch the gain change, and see the input sine wave amplified and inverted in real time. The op-amp\'s "golden rules" — no current into inputs, V+ ≈ V− — give you the simple gain formula G = −R_f / R_in.',
    id: 'Konfigurasi penguat inverting op-amp tipikal. Ubah resistor input R_in dan resistor umpan-balik R_f, amati penguatan berubah, dan lihat gelombang sinus input diperkuat dan dibalik secara langsung. "Aturan emas" op-amp — tidak ada arus ke input, V+ ≈ V− — memberi rumus penguatan sederhana G = −R_f / R_in.',
  },
  details: () => import('./details.js'),
  topics: ['electronics', 'circuits'],
  grade: [12, 13],
  hasLab: true,
  load: () => import('./sim.js'),
};
