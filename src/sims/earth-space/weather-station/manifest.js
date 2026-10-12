export default {
  id: 'weather-station',
  subject: 'earth-space',
  title: { en: 'My Weather Station', id: 'Stasiun Cuaca Saya' },
  description: {
    en: 'Be the weather reporter! Pick a season and press New day. The sky, clouds, rain and wind change. Read the four instruments: a thermometer for heat, a rain gauge for rain, a flag for wind, and a cloud gauge. Write down the weather for each day and compare the seasons.',
    id: 'Jadilah pelapor cuaca! Pilih musim dan tekan Hari baru. Langit, awan, hujan, dan angin berubah. Baca keempat alatnya: termometer untuk panas, penakar hujan untuk hujan, bendera untuk angin, dan pengukur awan. Catat cuaca setiap hari dan bandingkan musim-musimnya.',
  },
  details: () => import('./details.js'),
  topics: ['weather', 'seasons', 'measurement'],
  grade: [2, 3, 4, 5],
  hasLab: true,
  load: () => import('./sim.js'),
};
