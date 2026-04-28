export default {
  id: 'compound-interest',
  subject: 'finance',
  title: { en: 'Compound Interest', id: 'Bunga Majemuk' },
  description: {
    en: '"The most powerful force in the universe" — apocryphally attributed to Einstein. Slide rate, time, and starting principal, optionally add monthly contributions, and watch compound and simple interest pull apart.',
    id: '"Kekuatan terdahsyat di alam semesta" — kabar yang dilekatkan pada Einstein. Atur suku bunga, waktu, dan modal awal, opsionally tambahkan kontribusi bulanan, lalu amati bunga majemuk dan sederhana saling menjauh.',
  },
  objectives: {
    en: [
      'Apply A = P(1 + r/n)^(nt) for compound interest.',
      'Compare simple vs compound growth over decades.',
      'See the effect of monthly contributions on long-term wealth.',
    ],
    id: [
      'Menerapkan A = P(1 + r/n)^(nt) untuk bunga majemuk.',
      'Membandingkan pertumbuhan bunga sederhana vs majemuk selama puluhan tahun.',
      'Melihat efek kontribusi bulanan terhadap kekayaan jangka panjang.',
    ],
  },
  tryThis: {
    en: [
      '$1000 at 7% for 30 years — what does it grow to?',
      'Add $200/month — does it dwarf the principal?',
      'Compare 5% vs 10% over 40 years — feel the exponential.',
    ],
    id: [
      'Rp1.000.000 pada 7% selama 30 tahun — menjadi berapa?',
      'Tambah Rp200.000/bulan — apakah jauh lebih besar dari modal awal?',
      'Bandingkan 5% vs 10% selama 40 tahun — rasakan eksponensialnya.',
    ],
  },
  topics: ['interest', 'savings'],
  load: () => import('./sim.js'),
};
