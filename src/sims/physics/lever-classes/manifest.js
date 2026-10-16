export default {
  id: 'lever-classes',
  subject: 'physics',
  title: { en: 'Levers: Tools and the Body', id: 'Tuas: Alat dan Tubuh' },
  description: {
    en: 'Pick a crowbar, a wheelbarrow, a pair of tweezers or your own forearm, and drag the point where the effort pushes. The sim shows both arms of the lever, works out effort × effort arm = load × load arm, and tells you whether your effort is enough to lift the load. Find out why a crowbar multiplies your force but a forearm actually divides it.',
    id: 'Pilih linggis, gerobak dorong, pinset, atau lengan bawahmu sendiri, lalu geser titik tempat kuasa bekerja. Simulasi menampilkan kedua lengan tuas, menghitung kuasa × lengan kuasa = beban × lengan beban, dan memberi tahu apakah kuasamu cukup untuk mengangkat beban. Temukan mengapa linggis melipatgandakan gaya, tetapi lengan bawah justru membaginya.',
  },
  topics: ['simple machines', 'levers', 'torque', 'human body'],
  grade: [7, 8, 9],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
