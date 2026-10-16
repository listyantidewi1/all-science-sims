export default {
  id: 'electromagnetic-induction',
  subject: 'physics',
  title: { en: 'Moving Magnet, Flowing Current', id: 'Induksi Elektromagnetik' },
  description: {
    en: 'Push a bar magnet through a coil of wire and watch a galvanometer needle kick one way as it enters and the other way as it leaves. Live graphs show the magnetic flux through the coil and the induced voltage. Change the number of turns, the magnet strength and the speed to discover what makes the voltage bigger, then flip the magnet to test Lenz\'s law.',
    id: 'Dorong magnet batang melewati kumparan kawat dan lihat jarum galvanometer menyimpang ke satu arah saat magnet masuk dan ke arah lain saat keluar. Grafik langsung menunjukkan fluks magnet yang menembus kumparan dan tegangan induksinya. Ubah jumlah lilitan, kekuatan magnet dan kecepatannya untuk menemukan apa yang memperbesar tegangan, lalu balik magnetnya untuk menguji hukum Lenz.',
  },
  topics: ['electromagnetism', 'induction', 'magnetism'],
  grade: [9, 10, 11, 12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
