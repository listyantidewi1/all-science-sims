export default {
  id: 'area-perimeter',
  subject: 'mathematics',
  title: { en: 'Area and Perimeter', id: 'Luas dan Keliling' },
  description: {
    en: 'Drag the corners of a rectangle on a square grid and watch the unit squares get counted one by one. Press "Walk the edge" to see a runner count every step around the outside: that is the perimeter. Join two rectangles into an L-shape, cut a rectangle in half to make a triangle, and take the challenge: can you build two shapes with the same area but a different perimeter?',
    id: 'Geser sudut-sudut persegi panjang di atas kertas berpetak dan lihat persegi satuannya dihitung satu per satu. Tekan "Jalan keliling tepi" untuk melihat pelari menghitung setiap langkah di sekeliling luar: itulah keliling. Gabungkan dua persegi panjang menjadi bentuk L, potong persegi panjang menjadi dua untuk membuat segitiga, dan ikuti tantangan: bisakah kamu membuat dua bangun dengan luas sama tetapi keliling berbeda?',
  },
  topics: ['geometry', 'measurement', 'area', 'perimeter'],
  grade: [4, 5, 6],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
