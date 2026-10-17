export default {
  id: 'blood-glucose',
  subject: 'biology',
  title: { en: 'Blood Sugar Control', id: 'Pengaturan Gula Darah' },
  description: {
    en: 'Run a body through a 24-hour day: eat small or large meals, exercise, sleep, and watch blood glucose (mmol/L) rise and fall while the pancreas answers with insulin or glucagon and the liver stores or releases glycogen. The negative-feedback loop lights up as it works. Switch on type 1 diabetes, where no insulin is made, and try to keep glucose in the 4–7 mmol/L band with injections.',
    id: 'Jalankan tubuh selama 24 jam: makan porsi kecil atau besar, berolahraga, tidur, dan amati glukosa darah (mmol/L) naik dan turun sementara pankreas menjawab dengan insulin atau glukagon dan hati menyimpan atau melepaskan glikogen. Lingkar umpan balik negatif menyala saat bekerja. Nyalakan diabetes tipe 1, ketika insulin tidak dibuat, dan coba jaga glukosa dalam pita 4–7 mmol/L dengan suntikan.',
  },
  topics: ['homeostasis', 'endocrine system', 'negative feedback', 'diabetes'],
  grade: [11, 12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
