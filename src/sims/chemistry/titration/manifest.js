export default {
  id: 'titration',
  subject: 'chemistry',
  title: { en: 'Acid-Base Titration', id: 'Titrasi Asam-Basa' },
  description: {
    en: 'Drip a strong base into a strong or weak acid and watch the pH curve trace out as the equivalence point sweeps past. Pick an indicator and see when its color flips.',
    id: 'Teteskan basa kuat ke asam kuat atau lemah lalu amati kurva pH terbentuk saat melewati titik ekuivalen. Pilih indikator dan lihat kapan warnanya berubah.',
  },
  objectives: {
    en: [
      'Identify the equivalence point on a titration curve.',
      'Distinguish strong-acid vs weak-acid curve shapes.',
      'Choose an indicator whose pH range matches the equivalence point.',
    ],
    id: [
      'Mengenali titik ekuivalen pada kurva titrasi.',
      'Membedakan bentuk kurva asam kuat vs asam lemah.',
      'Memilih indikator yang rentang pH-nya cocok dengan titik ekuivalen.',
    ],
  },
  tryThis: {
    en: [
      'Titrate a weak acid (Ka small) — find the half-equivalence buffering plateau.',
      'Compare phenolphthalein and methyl orange on the same titration.',
      'Add titrant slowly near the equivalence point — what jumps?',
    ],
    id: [
      'Titrasi asam lemah (Ka kecil) — cari plato buffer di setengah-ekuivalen.',
      'Bandingkan fenolftalein dan metil oranye pada titrasi yang sama.',
      'Tambahkan titran perlahan dekat titik ekuivalen — apa yang melonjak?',
    ],
  },
  topics: ['acids', 'bases', 'titration'],
  grade: [11, 12],
  load: () => import('./sim.js'),
};
