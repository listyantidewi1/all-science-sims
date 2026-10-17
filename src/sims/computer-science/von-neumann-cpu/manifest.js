export default {
  id: 'von-neumann-cpu',
  subject: 'computer-science',
  title: { en: 'Inside the Computer: Fetch–Decode–Execute', id: 'Di Dalam Komputer: Ambil–Terjemahkan–Jalankan' },
  description: {
    en: 'Step through a toy Von Neumann computer with a 16-word memory, an accumulator, a program counter and an instruction register. Load a preset program (add two numbers, count down, multiply by repeated addition), type your own inputs and watch each fetch, decode and execute phase light up as data pulses along the address and data buses. Every register and memory word is shown in both binary and decimal.',
    id: 'Jalankan selangkah demi selangkah sebuah komputer Von Neumann mainan dengan memori 16 kata, akumulator, pencacah program dan register instruksi. Muat program bawaan (menjumlahkan dua bilangan, menghitung mundur, mengalikan dengan penjumlahan berulang), masukkan nilai sendiri dan lihat setiap fase ambil, terjemahkan dan jalankan menyala saat data berdenyut di bus alamat dan bus data. Setiap register dan kata memori ditampilkan dalam biner dan desimal.',
  },
  topics: ['computer architecture', 'von neumann', 'cpu', 'machine code', 'input-process-output'],
  grade: [10, 11],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
