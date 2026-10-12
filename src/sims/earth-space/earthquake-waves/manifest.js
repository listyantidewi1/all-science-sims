export default {
  id: 'earthquake-waves',
  subject: 'earth-space',
  title: { en: 'Earthquake Waves', id: 'Gelombang Gempa' },
  description: {
    en: 'Place an earthquake on a map and watch P and S waves spread out at different speeds. Three seismograph stations record when each wave arrives. Use the S−P time gap to find the distance to each station, draw three circles, and locate the epicentre — or hide it and solve the mystery.',
    id: 'Letakkan gempa di peta dan lihat gelombang P dan S menyebar dengan kecepatan berbeda. Tiga stasiun seismograf mencatat kapan tiap gelombang tiba. Gunakan selisih waktu S−P untuk mencari jarak ke tiap stasiun, gambar tiga lingkaran, dan temukan episentrum — atau sembunyikan dan pecahkan misterinya.',
  },
  topics: ['earthquakes', 'seismic-waves', 'geology'],
  grade: [7, 8, 9],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
