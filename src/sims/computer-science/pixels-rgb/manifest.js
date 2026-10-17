export default {
  id: 'pixels-rgb',
  subject: 'computer-science',
  title: { en: 'Pixels and Colour', id: 'Piksel dan Warna' },
  description: {
    en: 'Paint on a tiny 8×8, 16×16 or 32×32 canvas and discover that every picture is just numbers. Mix a colour with red, green and blue sliders (0–255) and read its hex and binary codes, zoom in to see that one pixel is three numbers, switch the bit depth between 1-bit, 8-bit greyscale and 24-bit colour, and watch the file size change.',
    id: 'Melukis di kanvas kecil 8×8, 16×16 atau 32×32 dan temukan bahwa setiap gambar hanyalah angka. Campur warna dengan slider merah, hijau dan biru (0–255) lalu baca kode heksadesimal dan binernya, perbesar untuk melihat bahwa satu piksel adalah tiga angka, ganti kedalaman bit antara 1-bit, skala abu-abu 8-bit dan warna 24-bit, lalu lihat ukuran berkasnya berubah.',
  },
  topics: ['data representation', 'binary', 'images', 'colour'],
  grade: [7, 8, 9],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
