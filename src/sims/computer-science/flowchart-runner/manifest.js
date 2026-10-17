export default {
  id: 'flowchart-runner',
  subject: 'computer-science',
  title: { en: 'Flowchart Runner', id: 'Penjalan Diagram Alir' },
  description: {
    en: 'Pick a classic algorithm (largest of three numbers, sum 1..n, even or odd, FizzBuzz, GCD by subtraction), type in your own inputs and run the flowchart one block at a time. The block being executed lights up, the matching pseudocode line is highlighted beside it, and a variables table and trace table update at every step so you can see exactly how the computer thinks.',
    id: 'Pilih algoritma klasik (terbesar dari tiga bilangan, jumlah 1..n, genap atau ganjil, FizzBuzz, FPB dengan pengurangan), masukkan nilai sendiri, lalu jalankan diagram alirnya satu blok demi satu blok. Blok yang sedang dijalankan menyala, baris pseudokode yang sesuai disorot di sampingnya, dan tabel variabel serta tabel penelusuran diperbarui setiap langkah sehingga kamu melihat persis cara komputer berpikir.',
  },
  topics: ['algorithms', 'flowcharts', 'pseudocode', 'computational thinking'],
  grade: [7, 8, 9, 10],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
