export default {
  id: 'membrane-transport',
  subject: 'biology',
  title: { en: 'Active and Passive Transport', id: 'Transpor Aktif dan Pasif' },
  description: {
    en: 'Watch O₂, glucose, Na⁺ and K⁺ particles jostle on either side of a phospholipid bilayer fitted with channel proteins, a glucose carrier and a Na⁺/K⁺ pump. Passive transport runs down the concentration gradient on its own; switch on the ATP supply and the pump drives 3 Na⁺ out and 2 K⁺ in against their gradients for every ATP used. Live concentration bars, net-flow arrows and an endocytosis/exocytosis animation complete the picture.',
    id: 'Amati partikel O₂, glukosa, Na⁺, dan K⁺ berdesakan di kedua sisi lapisan ganda fosfolipid yang dilengkapi protein kanal, pembawa glukosa, dan pompa Na⁺/K⁺. Transpor pasif berjalan sendiri menuruni gradien konsentrasi; nyalakan pasokan ATP dan pompa mendorong 3 Na⁺ keluar dan 2 K⁺ masuk melawan gradiennya untuk setiap ATP yang dipakai. Batang konsentrasi langsung, panah aliran neto, dan animasi endositosis/eksositosis melengkapi gambaran.',
  },
  topics: ['cell membrane', 'diffusion', 'facilitated diffusion', 'active transport', 'sodium-potassium pump', 'endocytosis'],
  grade: [11],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
