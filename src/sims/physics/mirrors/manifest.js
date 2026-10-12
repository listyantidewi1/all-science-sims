export default {
  id: 'mirrors',
  subject: 'physics',
  title: { en: 'Curved Mirrors', id: 'Cermin Lengkung' },
  description: {
    en: 'A concave or convex mirror with a candle as the object. Drag the candle along the principal axis and watch the image construction live: the parallel ray reflects through the focal point, the focal-point ray reflects parallel, and where they cross is the image. Magnification, image distance, and real/virtual classification update as you drag.',
    id: 'Cermin cekung atau cembung dengan lilin sebagai objek. Geser lilin di sepanjang sumbu utama dan amati konstruksi bayangan: sinar sejajar memantul melalui titik fokus, sinar dari fokus memantul sejajar, dan persimpangannya adalah bayangan. Perbesaran, jarak bayangan, dan klasifikasi nyata/maya diperbarui saat Anda menggeser.',
  },
  details: () => import('./details.js'),
  topics: ['optics'],
  grade: [9, 10, 11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
