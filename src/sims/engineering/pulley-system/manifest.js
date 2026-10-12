export default {
  id: 'pulley-system',
  subject: 'engineering',
  title: { en: 'Pulley & Mechanical Advantage', id: 'Katrol & Keuntungan Mekanis' },
  description: {
    en: 'Single, double, triple, and four-pulley block-and-tackle systems. Drag the rope to lift the load — feel the trade between effort and distance, the soul of every simple machine. Each rope segment supporting the load divides the required force by one.',
    id: 'Sistem katrol majemuk dengan satu, dua, tiga, dan empat pulley. Tarik tali untuk mengangkat beban — rasakan pertukaran antara gaya dan jarak, jiwa setiap mesin sederhana. Tiap segmen tali yang menahan beban membagi gaya yang diperlukan.',
  },
  details: () => import('./details.js'),
  topics: ['mechanics', 'simple-machines'],
  grade: [5, 6, 7, 8, 9],
  hasLab: true,
  load: () => import('./sim.js'),
};
