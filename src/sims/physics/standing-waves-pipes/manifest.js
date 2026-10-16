export default {
  id: 'standing-waves-pipes',
  subject: 'physics',
  title: { en: 'Standing Waves in Pipes and Strings', id: 'Gelombang Stasioner pada Pipa dan Dawai' },
  description: {
    en: 'Set up a standing wave in an open–open pipe, an open–closed pipe or a string fixed at both ends. Change the length, pick a harmonic and watch the nodes and antinodes while the sim computes the wavelength and frequency from v = 343 m/s (air) or v = √(T/μ) (string). In the resonance-tube lab a tuning fork hums above a water column: slide the water level until the air column sings, then use the resonance lengths to measure the speed of sound.',
    id: 'Bentuk gelombang stasioner pada pipa terbuka–terbuka, pipa terbuka–tertutup, atau dawai yang terikat kedua ujungnya. Ubah panjangnya, pilih harmonik, dan amati simpul dan perut sementara simulasi menghitung panjang gelombang dan frekuensi dari v = 343 m/s (udara) atau v = √(T/μ) (dawai). Pada lab tabung resonansi, garpu tala berbunyi di atas kolom air: geser permukaan air sampai kolom udara ikut berbunyi, lalu gunakan panjang-panjang resonansi untuk mengukur cepat rambat bunyi.',
  },
  topics: ['sound', 'standing waves', 'resonance', 'harmonics'],
  grade: [11],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
