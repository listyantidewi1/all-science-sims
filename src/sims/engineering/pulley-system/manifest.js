export default {
  id: 'pulley-system',
  subject: 'engineering',
  title: { en: 'Pulley & Mechanical Advantage', id: 'Katrol & Keuntungan Mekanis' },
  description: {
    en: 'Single, double, triple, and four-pulley block-and-tackle systems. Drag the rope to lift the load — feel the trade between effort and distance, the soul of every simple machine. Each rope segment supporting the load divides the required force by one.',
    id: 'Sistem katrol majemuk dengan satu, dua, tiga, dan empat pulley. Tarik tali untuk mengangkat beban — rasakan pertukaran antara gaya dan jarak, jiwa setiap mesin sederhana. Tiap segmen tali yang menahan beban membagi gaya yang diperlukan.',
  },
  objectives: {
    en: [
      'Mechanical advantage = number of rope segments supporting the load.',
      'Force × distance is conserved: pulling 4 m at ¼ force lifts 1 m.',
      'Pulleys do not multiply work — only redistribute it.',
    ],
    id: [
      'Keuntungan mekanis = jumlah segmen tali yang menahan beban.',
      'Gaya × jarak kekal: menarik 4 m dengan ¼ gaya mengangkat 1 m.',
      'Katrol tidak melipatgandakan kerja — hanya mendistribusikannya.',
    ],
  },
  tryThis: {
    en: [
      'Single fixed pulley — MA = 1, just changes direction.',
      'Block and tackle MA = 4 — pull 4 m to lift 1 m.',
      'Watch energy: input distance × force = output distance × weight.',
    ],
    id: [
      'Katrol tetap tunggal — MA = 1, hanya mengubah arah.',
      'Sistem MA = 4 — tarik 4 m untuk mengangkat 1 m.',
      'Perhatikan energi: jarak masuk × gaya = jarak keluar × berat.',
    ],
  },
  topics: ['mechanics', 'simple-machines'],
  load: () => import('./sim.js'),
};
