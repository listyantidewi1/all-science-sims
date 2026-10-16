export default {
  id: 'cuboid-volume',
  subject: 'mathematics',
  title: { en: 'Fill the Box', id: 'Isi Kotak' },
  description: {
    en: 'Choose how long, how wide and how tall a glass box is, then watch little cubes fill it up one layer at a time. Count the cubes in one layer, count the layers, and see how length × width × height tells you the volume. Switch to the front, top or side view to see the box flat, the way a builder draws it.',
    id: 'Pilih panjang, lebar dan tinggi sebuah kotak kaca, lalu lihat kubus-kubus kecil mengisinya lapis demi lapis. Hitung kubus dalam satu lapisan, hitung banyak lapisannya, dan lihat bagaimana panjang × lebar × tinggi memberi tahu volumenya. Ganti ke tampilan depan, atas atau samping untuk melihat kotak secara datar, seperti gambar tukang bangunan.',
  },
  topics: ['geometry', 'measurement', 'volume'],
  grade: [3, 4, 5, 6],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
