export default {
  id: 'tax-brackets',
  subject: 'finance',
  title: { en: 'Progressive Tax Brackets', id: 'Tarif Pajak Progresif' },
  description: {
    en: "Slide your income through a progressive tax schedule. The marginal rate (your next dollar) and the effective rate (your average) are usually different — and people confuse them all the time.",
    id: 'Geser pendapatan Anda melalui jadwal pajak progresif. Tarif marginal (untuk Rp berikutnya) dan tarif efektif (rata-rata) biasanya berbeda — dan orang sering keliru.',
  },
  objectives: {
    en: [
      'Distinguish marginal from effective tax rate.',
      'Compute total tax as sum across bracket slices.',
      'See why "moving into a higher bracket" never reduces take-home.',
    ],
    id: [
      'Membedakan tarif marginal dan tarif efektif.',
      'Menghitung total pajak sebagai jumlah irisan tiap bracket.',
      'Melihat mengapa "naik ke bracket lebih tinggi" tidak pernah mengurangi pendapatan bersih.',
    ],
  },
  tryThis: {
    en: [
      'Income $50k under US 2024 brackets — what is the effective rate?',
      'Bump to $100k — does each dollar above $47k get taxed at 22%?',
      "Compare US to a flat 20% — at what income do they match?",
    ],
    id: [
      'Pendapatan Rp50jt pada tarif Indonesia — berapa tarif efektifnya?',
      'Naikkan ke Rp250jt — apakah tiap Rp di atas Rp250jt kena 25%?',
      'Bandingkan dengan tarif tunggal 20% — pada pendapatan berapa keduanya sama?',
    ],
  },
  topics: ['tax', 'public-finance'],
  load: () => import('./sim.js'),
};
