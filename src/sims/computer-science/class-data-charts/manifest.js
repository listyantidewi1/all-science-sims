export default {
  id: 'class-data-charts',
  subject: 'computer-science',
  title: { en: "Charts from Class Data", id: "Grafik dari Data Kelas" },
  description: {
    en: 'Turn class data into charts with Python. Run short programs that use lists, the statistics module and matplotlib: a line chart of test scores, a bar chart of club members, two students compared with a legend, the class average drawn with axhline, a scatter of study hours against scores, and a report card calculator. Step through the code and watch the chart grow one line at a time, read every data point, and compare the mean, median and mode of each data set. Colours, axis ranges, ticks and error messages follow real matplotlib.',
    id: 'Ubah data kelas menjadi grafik dengan Python. Jalankan program pendek yang memakai list, modul statistics, dan matplotlib: grafik garis nilai ulangan, grafik batang peminat ekskul, dua siswa dibandingkan dengan legenda, rata-rata kelas yang digambar dengan axhline, diagram sebar jam belajar terhadap nilai, dan kalkulator nilai rapor. Jalankan kode langkah demi langkah dan amati grafik tumbuh baris demi baris, baca setiap titik data, lalu bandingkan rata-rata, median, dan modus setiap kumpulan data. Warna, rentang sumbu, tanda sumbu, dan pesan galat mengikuti matplotlib asli.',
  },
  topics: ['programming', 'python', 'data-visualization', 'statistics', 'matplotlib', 'mean, median and mode'],
  grade: [10, 11, 12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
