export default {
  id: 'change-blindness',
  subject: 'cognitive-science',
  title: { en: 'Change Blindness', id: 'Buta Perubahan' },
  description: {
    en: 'Two scenes flicker back and forth with a brief blank between them — one element is different. The "flicker paradigm" reveals a striking truth: even big, obvious changes can take many seconds to spot when there\'s a visual interruption. Without the blank, change pops out instantly.',
    id: 'Dua adegan bergantian dengan kosong sejenak di antara — satu elemen berbeda. "Paradigma flicker" mengungkap kebenaran mengejutkan: bahkan perubahan besar dan jelas bisa butuh banyak detik untuk ditemukan saat ada gangguan visual. Tanpa kosong, perubahan langsung menonjol.',
  },
  objectives: {
    en: [
      'See that visual attention only registers what it focuses on.',
      'Compare flicker (with blank) vs continuous (no blank) to feel the difference.',
      'Understand why eyewitness reports are often unreliable.',
    ],
    id: [
      'Melihat bahwa perhatian visual hanya merekam yang difokuskan.',
      'Membandingkan flicker (dengan kosong) vs kontinu (tanpa kosong).',
      'Memahami mengapa laporan saksi sering tidak andal.',
    ],
  },
  tryThis: {
    en: [
      'Flicker mode — change can take 30+ seconds to spot.',
      'Continuous mode — same change pops instantly.',
      'Click on the changing element to log your reaction time.',
    ],
    id: [
      'Mode flicker — perubahan bisa butuh 30+ detik untuk ditemukan.',
      'Mode kontinu — perubahan yang sama langsung muncul.',
      'Klik pada elemen yang berubah untuk mencatat waktu reaksi.',
    ],
  },
  topics: ['attention', 'perception'],
  load: () => import('./sim.js'),
};
