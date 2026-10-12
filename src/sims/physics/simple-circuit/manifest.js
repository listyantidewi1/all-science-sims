export default {
  id: 'simple-circuit',
  subject: 'physics',
  title: { en: 'Light the Bulb', id: 'Nyalakan Lampu' },
  description: {
    en: 'A battery, a bulb, a switch and wires on a board. Close the switch to make a full loop and the bulb lights up. Add more bulbs or batteries and watch the glow change. Drop copper, wood, plastic or other things into the gap to find out what lets electricity through.',
    id: 'Baterai, lampu, sakelar, dan kabel di atas papan. Tutup sakelar supaya jalurnya tersambung dan lampu menyala. Tambah lampu atau baterai dan lihat nyalanya berubah. Letakkan tembaga, kayu, plastik, atau benda lain di celah untuk tahu mana yang bisa dilewati listrik.',
  },
  topics: ['electricity', 'circuits', 'conductors'],
  grade: [4, 5, 6],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
