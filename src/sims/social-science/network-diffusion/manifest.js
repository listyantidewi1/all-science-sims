export default {
  id: 'network-diffusion',
  subject: 'social-science',
  title: { en: 'Threshold Diffusion on a Network', id: 'Difusi Ambang pada Jaringan' },
  description: {
    en: "Each person adopts a new behavior only when a fraction of their friends already have. Tune the threshold and watch a small seed of adopters either fizzle out or cascade through the entire network — Granovetter's classic threshold model.",
    id: 'Setiap orang mengadopsi perilaku baru hanya ketika sebagian temannya telah melakukannya. Atur ambang lalu amati benih kecil pengadopsi mati di tempat atau menyebar lewat seluruh jaringan — model ambang klasik Granovetter.',
  },
  details: () => import('./details.js'),
  topics: ['networks', 'social-influence'],
  grade: [11, 12, 13],
  load: () => import('./sim.js'),
};
