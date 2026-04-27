export default {
  id: 'schelling-segregation',
  subject: 'social-science',
  title: { en: "Schelling's Segregation Model", id: 'Model Segregasi Schelling' },
  description: {
    en: 'Place two groups on a grid where each only wants a small fraction of similar neighbors. Watch surprising large-scale segregation emerge from gentle individual preferences.',
    id: 'Tempatkan dua kelompok pada grid di mana tiap individu hanya menginginkan sedikit tetangga sejenis. Amati segregasi skala besar muncul mengejutkan dari preferensi individu yang ringan.',
  },
  objectives: {
    en: [
      'Connect individual rules to emergent collective patterns.',
      'Show that mild preferences (e.g., 30% same) still produce strong segregation.',
      'Identify the threshold where the system stops self-segregating.',
    ],
    id: [
      'Menghubungkan aturan individu dengan pola kolektif yang muncul.',
      'Menunjukkan bahwa preferensi ringan (mis. 30% sejenis) tetap menghasilkan segregasi kuat.',
      'Mengenali ambang di mana sistem berhenti melakukan segregasi sendiri.',
    ],
  },
  tryThis: {
    en: [
      'Set tolerance to 30% — does the grid still segregate?',
      'Find the threshold where segregation stops.',
      'Crank density up — does the speed of segregation change?',
    ],
    id: [
      'Atur ambang ke 30% — apakah grid tetap tersegregasi?',
      'Cari ambang di mana segregasi berhenti.',
      'Naikkan kepadatan tinggi — apakah kecepatan segregasi berubah?',
    ],
  },
  topics: ['emergence', 'agent-based'],
  grade: [11, 12],
  load: () => import('./sim.js'),
};
