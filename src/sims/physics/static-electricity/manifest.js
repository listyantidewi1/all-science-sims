export default {
  id: 'static-electricity',
  subject: 'physics',
  title: { en: 'Static Electricity', id: 'Listrik Statis' },
  description: {
    en: 'Rub a balloon on wool or a glass rod on silk and watch electrons jump from one to the other. Then drag the charged object around the bench: an electroscope spreads its leaves, paper bits leap up, a hanging ball swings towards or away, and a metal sphere on a stand shows how charging by induction works.',
    id: 'Gosok balon pada kain wol atau batang kaca pada kain sutra dan lihat elektron berpindah dari satu benda ke benda lain. Lalu geser benda bermuatan itu di atas meja: daun elektroskop membuka, potongan kertas melompat, bola gantung berayun mendekat atau menjauh, dan bola logam di atas penyangga menunjukkan cara pemuatan secara induksi.',
  },
  topics: ['electrostatics', 'charge', 'forces'],
  grade: [9],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
