export default {
  id: 'pythagorean',
  subject: 'mathematics',
  title: { en: 'Pythagorean Theorem (visual proof)', id: 'Teorema Pythagoras (bukti visual)' },
  description: {
    en: 'Drag the corners of a right triangle and watch the squares on its three sides resize. The two small squares always — visibly, by area — add up to the big one. The classic 2,500-year-old theorem, made obvious.',
    id: 'Seret sudut segitiga siku-siku dan amati persegi pada ketiga sisinya menyesuaikan ukuran. Dua persegi kecil selalu — terlihat, dari luasnya — bersama membentuk persegi besar. Teorema 2.500 tahun yang lama, dibuat jelas.',
  },
  objectives: {
    en: [
      'Apply a² + b² = c² for any right triangle.',
      'See the theorem as an area equation, not just a number.',
      'Recognize that it fails for non-right triangles.',
    ],
    id: [
      'Menerapkan a² + b² = c² untuk segitiga siku-siku mana pun.',
      'Melihat teorema sebagai persamaan luas, bukan sekadar angka.',
      'Mengenali bahwa rumus ini gagal untuk segitiga bukan siku-siku.',
    ],
  },
  tryThis: {
    en: [
      'Make a 3-4-5 triangle — exact integer sides.',
      'Make a 5-12-13 triangle.',
      'Drag the right-angle vertex — the squares deform but always add up.',
    ],
    id: [
      'Buat segitiga 3-4-5 — sisi bilangan bulat.',
      'Buat segitiga 5-12-13.',
      'Geser titik sudut siku-siku — persegi berubah bentuk tapi selalu pas.',
    ],
  },
  topics: ['geometry', 'theorems'],
  load: () => import('./sim.js'),
};
