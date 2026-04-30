export default {
  id: 'op-amp',
  subject: 'engineering',
  title: { en: 'Op-Amp Inverting Amplifier', id: 'Penguat Inverting Op-Amp' },
  description: {
    en: 'A textbook inverting op-amp configuration. Adjust the input resistor R_in and feedback resistor R_f, watch the gain change, and see the input sine wave amplified and inverted in real time. The op-amp\'s "golden rules" — no current into inputs, V+ ≈ V− — give you the simple gain formula G = −R_f / R_in.',
    id: 'Konfigurasi penguat inverting op-amp tipikal. Ubah resistor input R_in dan resistor umpan-balik R_f, amati penguatan berubah, dan lihat gelombang sinus input diperkuat dan dibalik secara langsung. "Aturan emas" op-amp — tidak ada arus ke input, V+ ≈ V− — memberi rumus penguatan sederhana G = −R_f / R_in.',
  },
  objectives: {
    en: [
      'See where the inverting amplifier formula G = −R_f / R_in comes from.',
      'Watch the output saturate at the supply rails when the gain is too large.',
      'Understand why the inverting input is called the "virtual ground".',
    ],
    id: [
      'Melihat asal rumus penguat inverting G = −R_f / R_in.',
      'Mengamati output jenuh di rel suplai bila penguatan terlalu besar.',
      'Memahami mengapa input inverting disebut "virtual ground".',
    ],
  },
  tryThis: {
    en: [
      'R_f = R_in — gain −1 (just inverts).',
      'R_f = 10·R_in — clean ×10 inverting amplifier.',
      'Crank R_f very high — output clips at the supply rails (±15 V).',
    ],
    id: [
      'R_f = R_in — penguatan −1 (sekadar membalik).',
      'R_f = 10·R_in — penguat inverting ×10 yang bersih.',
      'Naikkan R_f sangat tinggi — output dipotong di rel suplai (±15 V).',
    ],
  },
  topics: ['electronics', 'circuits'],
  hasLab: true,
  load: () => import('./sim.js'),
};
