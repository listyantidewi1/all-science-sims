export default {
  id: 'heat-transfer',
  subject: 'physics',
  title: { en: 'Heat Transfer', id: 'Perpindahan Kalor' },
  description: {
    en: 'Three ways heat moves. Conduction: hold one end of a copper, steel, glass or wood rod in a flame and watch the colour map spread. Convection: heat a beaker and follow a dye blob around the circulating water. Radiation: shine a lamp on a black can and a shiny can and compare their thermometers.',
    id: 'Tiga cara kalor berpindah. Konduksi: panaskan satu ujung batang tembaga, baja, kaca atau kayu di atas api dan lihat peta warnanya menyebar. Konveksi: panaskan gelas kimia dan ikuti gumpalan pewarna berputar bersama air. Radiasi: sorot lampu ke kaleng hitam dan kaleng mengkilap lalu bandingkan termometernya.',
  },
  topics: ['heat', 'conduction', 'convection', 'radiation'],
  grade: [7, 8, 9],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
