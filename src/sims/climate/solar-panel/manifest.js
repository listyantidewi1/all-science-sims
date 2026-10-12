export default {
  id: 'solar-panel',
  subject: 'climate',
  title: { en: 'Solar Panel Yield', id: 'Hasil Panel Surya' },
  description: {
    en: 'Solar power output depends on three big factors: the sun\'s angle (latitude + time of year), the panel\'s tilt, and atmospheric losses (clouds, smog, dust). Drag to set latitude and tilt, watch the daily power curve change across the year, and see why "tilt = latitude" is the rule of thumb for fixed mounts.',
    id: 'Daya panel surya bergantung pada tiga faktor utama: sudut matahari (lintang + waktu tahun), kemiringan panel, dan kerugian atmosfer (awan, polusi, debu). Geser untuk mengatur lintang dan kemiringan, amati kurva daya harian berubah sepanjang tahun, dan lihat mengapa "kemiringan = lintang" adalah aturan untuk pemasangan tetap.',
  },
  details: () => import('./details.js'),
  topics: ['energy', 'astronomy'],
  grade: [9, 10, 11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
