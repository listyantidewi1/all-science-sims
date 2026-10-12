export default {
  id: 'le-chatelier',
  subject: 'chemistry',
  title: { en: "Le Chatelier's Principle", id: 'Asas Le Chatelier' },
  description: {
    en: 'Adjust temperature, pressure, or reagent amounts in a reversible reaction and watch the equilibrium shift. Bars track concentrations as the system finds a new balance.',
    id: 'Atur suhu, tekanan, atau jumlah pereaksi pada reaksi bolak-balik, lalu amati pergeseran kesetimbangan. Batang menampilkan konsentrasi saat sistem mencari keseimbangan baru.',
  },
  details: () => import('./details.js'),
  topics: ['equilibrium', 'kinetics'],
  grade: [11, 12, 13],
  hasLab: true,
  load: () => import('./sim.js'),
};
