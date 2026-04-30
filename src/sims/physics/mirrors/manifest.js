export default {
  id: 'mirrors',
  subject: 'physics',
  title: { en: 'Curved Mirrors', id: 'Cermin Lengkung' },
  description: {
    en: 'A concave or convex mirror with a candle as the object. Drag the candle along the principal axis and watch the image construction live: the parallel ray reflects through the focal point, the focal-point ray reflects parallel, and where they cross is the image. Magnification, image distance, and real/virtual classification update as you drag.',
    id: 'Cermin cekung atau cembung dengan lilin sebagai objek. Geser lilin di sepanjang sumbu utama dan amati konstruksi bayangan: sinar sejajar memantul melalui titik fokus, sinar dari fokus memantul sejajar, dan persimpangannya adalah bayangan. Perbesaran, jarak bayangan, dan klasifikasi nyata/maya diperbarui saat Anda menggeser.',
  },
  objectives: {
    en: [
      'Apply the mirror equation 1/d_o + 1/d_i = 1/f.',
      'Distinguish real (in front) from virtual (behind) images.',
      'Connect the magnification m = -d_i/d_o to image size and orientation.',
    ],
    id: [
      'Menerapkan persamaan cermin 1/d_o + 1/d_i = 1/f.',
      'Membedakan bayangan nyata (di depan) dari maya (di belakang).',
      'Menghubungkan perbesaran m = -d_i/d_o dengan ukuran dan orientasi bayangan.',
    ],
  },
  tryThis: {
    en: [
      'Concave, object beyond C — real, inverted, smaller image.',
      'Concave, object between F and mirror — virtual, upright, magnified.',
      'Convex — always virtual, upright, smaller. (Used in car side mirrors.)',
    ],
    id: [
      'Cekung, objek di luar C — bayangan nyata, terbalik, lebih kecil.',
      'Cekung, objek antara F dan cermin — bayangan maya, tegak, diperbesar.',
      'Cembung — selalu maya, tegak, lebih kecil. (Digunakan di kaca spion.)',
    ],
  },
  topics: ['optics'],
  hasLab: true,
  load: () => import('./sim.js'),
};
