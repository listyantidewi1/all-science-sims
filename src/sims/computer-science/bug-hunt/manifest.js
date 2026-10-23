export default {
  id: 'bug-hunt',
  subject: 'computer-science',
  title: { en: "Bug Hunt", id: "Berburu Bug" },
  description: {
    en: 'Seven short Python programs, each with two or three hidden bugs, from the "Bug Hunt" class game. Run the test cases, decide whether each problem is a syntax, runtime or logic error, read the traceback with a helper that explains its last line in plain words, then fix the code yourself and run again until every test, boundary values included, passes. Level 2 is a worked example with one bug of each kind, and the last two levels guard against bad input with try-except and if.',
    id: 'Tujuh program Python pendek, masing-masing berisi dua atau tiga bug tersembunyi, dari permainan kelas "Berburu Bug". Jalankan kasus uji, tentukan apakah setiap masalah termasuk kesalahan sintaks, runtime, atau logika, baca traceback dengan bantuan yang menjelaskan baris terakhirnya dalam bahasa sederhana, lalu perbaiki kodenya sendiri dan jalankan lagi sampai semua uji, termasuk nilai batas, lolos. Level 2 adalah contoh kerja dengan satu bug dari setiap jenis, dan dua level terakhir melindungi program dari masukan yang salah dengan try-except dan if.',
  },
  topics: ['programming', 'python', 'debugging', 'testing'],
  grade: [10, 11, 12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
