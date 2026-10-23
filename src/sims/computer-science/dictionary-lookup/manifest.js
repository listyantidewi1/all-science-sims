export default {
  id: 'dictionary-lookup',
  subject: 'computer-science',
  title: { en: 'Dictionaries: Keys and Values', id: 'Dictionary: Kunci dan Nilai' },
  description: {
    en: 'Run real Python dictionary operations on a gradebook, a class attendance list, a canteen menu and a Counter of club sign-ups: look up d[key] (and meet KeyError), use get() and in, add, change, del and pop, loop over items() and count with most_common(). Every lookup races the same data stored as a list of pairs, which compares pair after pair, against the dict, which hashes the key and jumps to one slot of its table. A chart and the lab show that only the list\'s steps grow with the number of pairs.',
    id: 'Jalankan operasi dictionary Python sungguhan pada daftar nilai, presensi kelas, harga menu kantin, dan Counter peminat ekskul: cari d[kunci] (dan temui KeyError), pakai get() dan in, tambah, ubah, del, dan pop, ulangi dengan items(), serta hitung dengan most_common(). Setiap pencarian dilombakan dengan data yang sama dalam bentuk list pasangan, yang membandingkan pasangan satu per satu, melawan dict, yang menghitung hash kunci lalu langsung melompat ke satu slot tabelnya. Grafik dan lab menunjukkan bahwa hanya langkah list yang bertambah seiring banyaknya pasangan.',
  },
  topics: ['data-structures', 'python', 'hashing', 'complexity'],
  grade: [10, 11, 12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
