export default {
  id: 'python-tracer',
  subject: 'computer-science',
  title: { en: "Python Step by Step", id: "Python Langkah demi Langkah" },
  description: {
    en: 'Run a Python program one line at a time and watch what the computer does: the line that runs next, every variable as a labelled memory box (lists drawn as cells, arrows when two names share one list, a frame for each function call), the console and a trace table that fills in step by step. Step back to replay, feed input() from a box, and use Predict mode to write the output before running, like the "Tebak Output" game.',
    id: 'Jalankan program Python baris demi baris dan amati kerja komputer: baris yang dijalankan berikutnya, setiap variabel sebagai kotak memori berlabel (list digambar sebagai sel, panah saat dua nama memakai satu list yang sama, bingkai untuk setiap pemanggilan fungsi), konsol, dan tabel penelusuran yang terisi langkah demi langkah. Mundur untuk mengulang, isi input() dari kotak masukan, dan pakai Mode tebak untuk menulis keluaran sebelum program dijalankan, seperti permainan "Tebak Output".',
  },
  topics: ['programming', 'python', 'tracing', 'variables'],
  grade: [10, 11, 12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
