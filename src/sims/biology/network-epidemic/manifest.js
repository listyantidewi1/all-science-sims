export default {
  id: 'network-epidemic',
  subject: 'biology',
  title: { en: 'Epidemic on a Network', id: 'Epidemi pada Jaringan' },
  description: {
    en: 'Build a small-world social network and watch a virus spread along its edges. Compare to the well-mixed SIR model — networks let infections die in clusters, super-spreaders matter, and herd-immunity thresholds shift.',
    id: 'Bangun jaringan sosial small-world dan amati virus menyebar lewat tepinya. Bandingkan dengan model SIR campur-merata — pada jaringan, infeksi bisa mati di klaster, super-spreader penting, dan ambang kekebalan kelompok bergeser.',
  },
  details: () => import('./details.js'),
  topics: ['epidemiology', 'networks'],
  load: () => import('./sim.js'),
};
