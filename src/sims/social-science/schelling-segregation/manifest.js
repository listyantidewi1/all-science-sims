export default {
  id: 'schelling-segregation',
  subject: 'social-science',
  title: { en: "Schelling's Segregation Model", id: 'Model Segregasi Schelling' },
  description: {
    en: 'Place two groups on a grid where each only wants a small fraction of similar neighbors. Watch surprising large-scale segregation emerge from gentle individual preferences.',
    id: 'Tempatkan dua kelompok pada grid di mana tiap individu hanya menginginkan sedikit tetangga sejenis. Amati segregasi skala besar muncul mengejutkan dari preferensi individu yang ringan.',
  },
  details: () => import('./details.js'),
  topics: ['emergence', 'agent-based'],
  grade: [11, 12],
  load: () => import('./sim.js'),
};
