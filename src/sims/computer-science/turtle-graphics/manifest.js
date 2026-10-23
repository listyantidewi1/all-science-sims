export default {
  id: 'turtle-graphics',
  subject: 'computer-science',
  title: { en: "Turtle Graphics", id: "Grafik Turtle" },
  description: {
    en: 'Run Python turtle programs right in the browser, including a flower of circles that does not work in Google Colab. Watch the turtle walk and turn at its own speed, run one line at a time, step back, or draw everything at once. Every left and right turn is shown as an arc with its angle, and a readout adds up the total turning (left turns count as positive, right turns as negative), so a square turns 4 × 90° = 360° and a five-pointed star drawn with right(144) turns 5 × 144° = 720°, shown as −720°. Positions, headings and error messages are the same as in real Python.',
    id: 'Jalankan program turtle Python langsung di peramban, termasuk bunga dari lingkaran yang tidak dapat berjalan di Google Colab. Amati kura-kura berjalan dan berbelok dengan kecepatannya sendiri, jalankan baris demi baris, mundur, atau gambar semuanya sekaligus. Setiap belokan kiri dan kanan ditampilkan sebagai busur beserta sudutnya, dan penghitung menjumlahkan total belokan (belok kiri dihitung positif, belok kanan negatif), sehingga persegi berbelok 4 × 90° = 360° dan bintang lima yang digambar dengan right(144) berbelok 5 × 144° = 720°, ditampilkan sebagai −720°. Posisi, arah, dan pesan error sama dengan Python asli.',
  },
  topics: ['programming', 'python', 'loops', 'functions', 'geometry', 'angles', 'turtle graphics'],
  grade: [8, 9, 10, 11, 12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
