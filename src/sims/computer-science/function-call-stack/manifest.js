export default {
  id: 'function-call-stack',
  subject: 'computer-science',
  title: { en: "Functions and the Call Stack", id: "Fungsi dan Tumpukan Pemanggilan" },
  description: {
    en: 'Step through Python programs with functions (greeting, rectangle area, BMI, mastery status, the class duty roster, local and global variables, factorial) and watch the call stack: every call pushes a frame card with arrows from the arguments to the parameters, and every return pops it while the return value travels back to the line that made the call. A call table fills in like a tracing table worked on paper, and a predict mode asks what each call will return.',
    id: 'Jalankan langkah demi langkah program Python yang memakai fungsi (sapa, luas persegi panjang, BMI, status ketuntasan, Daftar Piket Kelas, variabel lokal dan global, faktorial) dan amati tumpukan pemanggilan: setiap pemanggilan menaruh kartu bingkai dengan panah dari argumen ke parameter, dan setiap return mengambilnya kembali sementara nilai balik bergerak pulang ke baris yang memanggilnya. Tabel pemanggilan terisi seperti tabel penelusuran yang dikerjakan di kertas, dan mode tebak menanyakan nilai balik setiap pemanggilan.',
  },
  topics: ['programming', 'python', 'functions', 'call stack', 'recursion'],
  grade: [11, 12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
