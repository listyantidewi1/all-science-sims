export default {
  id: 'ozone-layer',
  subject: 'climate',
  title: { en: 'Ozone Layer & CFCs', id: 'Lapisan Ozon & CFC' },
  description: {
    en: 'Stratospheric ozone (O₃) is created and destroyed naturally by the Chapman cycle. CFCs released decades ago break apart in UV light, freeing chlorine atoms that catalytically destroy ozone — one chlorine can wipe out 100,000 O₃ molecules. Drag the CFC slider and watch the ozone column thin.',
    id: 'Ozon stratosfer (O₃) dibuat dan dihancurkan secara alami oleh siklus Chapman. CFC yang dilepas dekade lalu pecah di bawah sinar UV, melepaskan atom klorin yang secara katalitik menghancurkan ozon — satu klorin dapat menghilangkan 100.000 molekul O₃. Geser slider CFC dan amati kolom ozon menipis.',
  },
  details: () => import('./details.js'),
  topics: ['atmospheric-chemistry'],
  load: () => import('./sim.js'),
};
