export default {
  id: 'solar-panel',
  subject: 'climate',
  title: { en: 'Solar Panel Yield', id: 'Hasil Panel Surya' },
  description: {
    en: 'Solar power output depends on three big factors: the sun\'s angle (latitude + time of year), the panel\'s tilt, and atmospheric losses (clouds, smog, dust). Drag to set latitude and tilt, watch the daily power curve change across the year, and see why "tilt = latitude" is the rule of thumb for fixed mounts.',
    id: 'Daya panel surya bergantung pada tiga faktor utama: sudut matahari (lintang + waktu tahun), kemiringan panel, dan kerugian atmosfer (awan, polusi, debu). Geser untuk mengatur lintang dan kemiringan, amati kurva daya harian berubah sepanjang tahun, dan lihat mengapa "kemiringan = lintang" adalah aturan untuk pemasangan tetap.',
  },
  objectives: {
    en: [
      'See sun-angle math: power ∝ cos(angle of incidence).',
      'Find the optimum tilt — usually close to your latitude.',
      'Compare summer vs winter yield at high vs low latitudes.',
    ],
    id: [
      'Melihat matematika sudut matahari: daya ∝ cos(sudut datang).',
      'Menemukan kemiringan optimum — biasanya dekat lintang Anda.',
      'Membandingkan hasil musim panas vs dingin di lintang tinggi vs rendah.',
    ],
  },
  tryThis: {
    en: [
      'Equator (lat 0) — flat panel is optimum year-round.',
      'High latitude (60°N) — tilt 50–60° is best, summer gives most power.',
      'Cloudy day — losses scale linearly with cloud cover.',
    ],
    id: [
      'Khatulistiwa (lat 0) — panel datar optimum sepanjang tahun.',
      'Lintang tinggi (60°LU) — kemiringan 50–60° terbaik, musim panas paling banyak daya.',
      'Hari berawan — kerugian linear dengan tutupan awan.',
    ],
  },
  topics: ['energy', 'astronomy'],
  load: () => import('./sim.js'),
};
