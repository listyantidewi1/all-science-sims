export default {
  id: 'electrolysis',
  subject: 'chemistry',
  title: { en: 'Electrolysis of Water', id: 'Elektrolisis Air' },
  description: {
    en: 'Pass electric current through water and watch hydrogen bubble up at the cathode and oxygen at the anode in a 2:1 volume ratio. Faraday\'s laws connect total charge to moles of gas produced. Crank the current and you see the bubbles speed up; the math always agrees.',
    id: 'Alirkan arus listrik melalui air dan amati hidrogen menggelembung di katoda dan oksigen di anoda dalam rasio volume 2:1. Hukum Faraday menghubungkan muatan total dengan mol gas. Naikkan arus dan gelembung mempercepat; matematika selalu cocok.',
  },
  objectives: {
    en: [
      'Read Faraday\'s law n = It / (zF) where F = 96 485 C/mol.',
      'See the 2:1 H₂/O₂ ratio that makes water H₂O.',
      'Predict gas volume from current × time × electrode reaction.',
    ],
    id: [
      'Membaca hukum Faraday n = It / (zF) dengan F = 96 485 C/mol.',
      'Melihat rasio 2:1 H₂/O₂ yang membuat air H₂O.',
      'Memprediksi volume gas dari arus × waktu × reaksi elektroda.',
    ],
  },
  tryThis: {
    en: [
      '1 amp for 60 seconds — produces about 7 mL H₂ at STP.',
      'Double the current — bubbles double; volumes still in 2:1 ratio.',
      'Run for an hour mentally — calculate the H₂ volume from the formula.',
    ],
    id: [
      '1 ampere selama 60 detik — menghasilkan sekitar 7 mL H₂ pada STP.',
      'Gandakan arus — gelembung berlipat ganda; volume tetap rasio 2:1.',
      'Jalankan satu jam dalam pikiran — hitung volume H₂ dari rumus.',
    ],
  },
  topics: ['electrochemistry'],
  load: () => import('./sim.js'),
};
