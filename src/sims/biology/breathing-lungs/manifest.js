export default {
  id: 'breathing-lungs',
  subject: 'biology',
  title: { en: 'How We Breathe', id: 'Cara Kita Bernapas' },
  description: {
    en: 'A bell-jar lung model with balloons for lungs and a rubber sheet for the diaphragm sits next to a real chest. Pull the diaphragm down and watch the volume rise, the pressure fall and air rush in. Zoom into an alveolus to see oxygen enter the blood and carbon dioxide leave, then switch from resting to running and count the breaths per minute.',
    id: 'Model paru-paru dari toples kaca dengan balon sebagai paru-paru dan lembar karet sebagai diafragma, berdampingan dengan dada sungguhan. Tarik diafragma ke bawah dan lihat volume naik, tekanan turun, dan udara masuk. Perbesar satu alveolus untuk melihat oksigen masuk ke darah dan karbon dioksida keluar, lalu ganti dari istirahat ke berlari dan hitung napas per menit.',
  },
  topics: ['respiration', 'human-body'],
  grade: [7, 8, 9],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
