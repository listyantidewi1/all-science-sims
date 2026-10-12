export default {
  id: 'floating-sinking',
  subject: 'physics',
  title: { en: 'Float or Sink?', id: 'Terapung atau Tenggelam?' },
  description: {
    en: 'Pick an object from the shelf. Guess: will it float or sink? Then drag it into the water tank and watch. Try a stone, an apple, a coin, a ping-pong ball, a bottle with and without its cap, and a lump of clay next to the same clay shaped like a boat. Count how many guesses you get right.',
    id: 'Pilih satu benda dari rak. Tebak: terapung atau tenggelam? Lalu seret benda itu ke dalam bak air dan lihat. Coba batu, apel, koin, bola pingpong, botol dengan dan tanpa tutup, serta gumpalan tanah liat di samping tanah liat yang dibentuk seperti perahu. Hitung berapa tebakanmu yang benar.',
  },
  details: () => import('./details.js'),
  topics: ['density', 'buoyancy', 'materials'],
  grade: [2, 3, 4, 5],
  hasLab: true,
  load: () => import('./sim.js'),
};
