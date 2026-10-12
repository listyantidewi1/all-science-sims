export default {
  id: 'speed-distance-time',
  subject: 'physics',
  title: { en: 'Speed, Distance and Time', id: 'Kelajuan, Jarak dan Waktu' },
  description: {
    en: 'Set the speed of a vehicle on a straight 200 m track, press Start and watch the stopwatch run while distance–time and speed–time graphs draw themselves. Add a second vehicle with a head start for a race, and drag the cursor on the graph to read off distance and time. The sim shows speed = distance ÷ time with the real numbers filled in.',
    id: 'Atur kelajuan kendaraan di lintasan lurus 200 m, tekan Mulai dan lihat stopwatch berjalan sementara grafik jarak–waktu dan kelajuan–waktu tergambar sendiri. Tambahkan kendaraan kedua dengan start lebih awal untuk balapan, dan seret kursor di grafik untuk membaca jarak dan waktu. Simulasi menampilkan kelajuan = jarak ÷ waktu dengan angka yang sebenarnya.',
  },
  topics: ['kinematics', 'speed', 'graphs'],
  grade: [7, 8, 9],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
