export default {
  id: 'public-goods',
  subject: 'social-science',
  title: { en: 'Public Goods Game', id: 'Permainan Barang Publik' },
  description: {
    en: 'Each round, every player decides how much to contribute to a shared pot. The pot is multiplied and split equally — but free-riding always pays better individually. Watch contributors decline unless punishment is allowed.',
    id: 'Tiap putaran, setiap pemain memutuskan berapa banyak menyumbang ke dompet bersama. Dompet dikalikan dan dibagi rata — namun individu selalu untung jika menumpang gratis. Amati kontribusi menurun kecuali ada hukuman.',
  },
  details: () => import('./details.js'),
  topics: ['cooperation', 'game-theory'],
  load: () => import('./sim.js'),
};
