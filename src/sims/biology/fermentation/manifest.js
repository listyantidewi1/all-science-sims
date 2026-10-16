export default {
  id: 'fermentation',
  subject: 'biology',
  title: { en: 'Fermentation Lab', id: 'Lab Fermentasi' },
  description: {
    en: 'Mix yeast and sugar in a flask, stretch a balloon over the neck and watch carbon dioxide inflate it. Change the temperature and the amount of sugar to find the conditions microbes like best, then switch presets to see mould turning soybeans into tempe, bacteria souring milk into yoghurt, and yeast making bread dough rise.',
    id: 'Campurkan ragi dan gula dalam labu, pasang balon di lehernya, dan lihat karbon dioksida menggembungkannya. Ubah suhu dan jumlah gula untuk menemukan kondisi yang paling disukai mikroba, lalu ganti preset untuk melihat jamur mengubah kedelai menjadi tempe, bakteri mengasamkan susu menjadi yoghurt, dan ragi membuat adonan roti mengembang.',
  },
  topics: ['biotechnology', 'microorganisms', 'respiration'],
  grade: [9, 10],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
