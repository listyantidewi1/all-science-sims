export default {
  id: 'network-epidemic',
  subject: 'biology',
  title: { en: 'Epidemic on a Network', id: 'Epidemi pada Jaringan' },
  description: {
    en: 'Build a small-world social network and watch a virus spread along its edges. Compare to the well-mixed SIR model — networks let infections die in clusters, super-spreaders matter, and herd-immunity thresholds shift.',
    id: 'Bangun jaringan sosial small-world dan amati virus menyebar lewat tepinya. Bandingkan dengan model SIR campur-merata — pada jaringan, infeksi bisa mati di klaster, super-spreader penting, dan ambang kekebalan kelompok bergeser.',
  },
  objectives: {
    en: [
      'See spread depend on network structure, not just R₀.',
      'Recognize the role of hubs (super-spreaders).',
      'Compare cluster die-off vs well-mixed epidemic.',
    ],
    id: [
      'Melihat penyebaran bergantung struktur jaringan, bukan hanya R₀.',
      'Mengenali peran hub (super-spreader).',
      'Membandingkan kematian klaster vs epidemi campur-merata.',
    ],
  },
  tryThis: {
    en: [
      'Vaccinate hubs first — does the outbreak die?',
      'Try a tightly-clustered network — does R₀ matter the same?',
      'Vary infection probability — find the percolation threshold.',
    ],
    id: [
      'Vaksinasi hub dulu — apakah wabah mati?',
      'Coba jaringan yang sangat berklaster — apakah R₀ memiliki dampak sama?',
      'Variasikan probabilitas infeksi — temukan ambang perkolasi.',
    ],
  },
  topics: ['epidemiology', 'networks'],
  load: () => import('./sim.js'),
};
