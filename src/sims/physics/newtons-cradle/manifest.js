export default {
  id: 'newtons-cradle',
  subject: 'physics',
  title: { en: "Newton's Cradle", id: 'Ayunan Newton' },
  description: {
    en: 'Click any ball to lift it, then let it swing. Watch momentum and energy travel through the row of touching steel balls and pop out the other end.',
    id: 'Klik bola mana saja untuk mengangkatnya, lalu biarkan terayun. Amati momentum dan energi merambat melewati barisan bola baja yang saling bersentuhan dan keluar di ujung lainnya.',
  },
  details: () => import('./details.js'),
  topics: ['momentum', 'collisions'],
  load: () => import('./sim.js'),
};
