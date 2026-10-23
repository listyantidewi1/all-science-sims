export default {
  id: 'problem-to-program',
  subject: 'computer-science',
  title: { en: 'From Problem to Program', id: 'Dari Masalah ke Program' },
  description: {
    en: 'Follow the translation steps for classic school problems (pass mark, discounts, temperature conversion, area, sum 1 to n): problem → IPO table → descriptive steps → pseudocode → flowchart → Python → trace table. Run the Python one statement at a time and watch the matching pseudocode line and flowchart symbol light up, including the Yes/No arrow of every decision. Test the program with the boundary case, insert a common translation mistake and find out which test catches it.',
    id: 'Ikuti langkah translasi untuk soal sekolah klasik (predikat kelulusan, diskon, konversi suhu, luas, jumlah 1 sampai n): masalah → tabel IPO → langkah deskriptif → pseudocode → flowchart → Python → trace table. Jalankan Python satu pernyataan demi satu dan lihat baris pseudocode serta simbol flowchart yang sesuai ikut menyala, termasuk panah Ya/Tidak di setiap keputusan. Uji program dengan kasus batas, sisipkan kesalahan translasi yang umum, lalu temukan data uji mana yang menangkapnya.',
  },
  topics: ['algorithms', 'pseudocode', 'flowcharts', 'python', 'computational thinking', 'testing'],
  grade: [9, 10, 11, 12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
