export default {
  id: 'measurement-units',
  subject: 'physics',
  title: { en: 'Measure It!', id: 'Ukur!' },
  description: {
    en: 'Read a virtual ruler, a vernier caliper and a dial balance. A random object appears each time; you type the reading and the sim checks it against the true value, allowing an uncertainty of half the smallest division. A converter turns mm into cm and m, g into kg and mL into L, and a hint tells you how many significant figures each instrument can give.',
    id: 'Bacalah mistar, jangka sorong dan neraca virtual. Setiap kali muncul benda acak; kamu mengetik hasil bacaan dan simulasi memeriksanya terhadap nilai sebenarnya dengan toleransi setengah skala terkecil. Panel konversi mengubah mm ke cm dan m, g ke kg, serta mL ke L, dan ada petunjuk berapa angka penting yang bisa diberikan tiap alat.',
  },
  topics: ['measurement', 'units', 'uncertainty'],
  grade: [7],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
