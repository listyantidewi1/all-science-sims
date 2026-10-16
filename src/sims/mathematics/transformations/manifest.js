export default {
  id: 'transformations',
  subject: 'mathematics',
  title: { en: 'Translate, Reflect, Rotate, Dilate', id: 'Transformasi Geometri' },
  description: {
    en: 'Drag the corners of a triangle or quadrilateral on a coordinate grid, then choose a transformation: slide it by (dx, dy), reflect it in the x-axis, y-axis or the line y = x, rotate it by 90°, 180° or 270° about the origin or a centre you pick, or enlarge it by a factor k. The image is drawn next to the original with every coordinate listed before and after, so the rule (x, y) → (…) becomes visible. In the challenge, the sim hides the transformation and you must work out which one it used.',
    id: 'Geser titik sudut segitiga atau segi empat pada bidang koordinat, lalu pilih transformasi: translasi sebesar (dx, dy), refleksi terhadap sumbu-x, sumbu-y atau garis y = x, rotasi 90°, 180° atau 270° terhadap titik asal atau pusat pilihanmu, atau dilatasi dengan faktor k. Bayangannya digambar di samping bangun asal dengan semua koordinat dicantumkan sebelum dan sesudah, sehingga aturan (x, y) → (…) terlihat jelas. Dalam tantangan, simulasi menyembunyikan transformasinya dan kamu harus menebak mana yang dipakai.',
  },
  topics: ['transformations', 'translation', 'reflection', 'rotation', 'dilation', 'coordinate plane'],
  grade: [9],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
