export default {
  id: 'circle-geometry',
  subject: 'mathematics',
  title: { en: 'Circle Explorer', id: 'Jelajah Lingkaran' },
  description: {
    en: 'Change the radius with a slider and drag the point on the rim to open or close a central angle. The circumference, area, arc length and sector area update live, each shown with its formula and the numbers plugged in. Press Unroll to roll the circle along a line and see that its circumference is a little more than three diameters: C ÷ d ≈ 3.14. Record your measurements in the lab table to find the pattern.',
    id: 'Ubah jari-jari dengan slider dan geser titik di tepi lingkaran untuk membuka atau menutup sudut pusat. Keliling, luas, panjang busur dan luas juring diperbarui langsung, masing-masing dengan rumus dan angka yang dimasukkan. Tekan Bentangkan untuk menggelindingkan lingkaran di sepanjang garis dan melihat bahwa kelilingnya sedikit lebih dari tiga kali diameter: K ÷ d ≈ 3,14. Catat pengukuranmu di tabel lab untuk menemukan polanya.',
  },
  topics: ['circle', 'circumference', 'area', 'arc length', 'sector', 'pi'],
  grade: [8],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
