export default {
  id: 'change-blindness',
  subject: 'cognitive-science',
  title: { en: 'Change Blindness', id: 'Buta Perubahan' },
  description: {
    en: 'Two scenes flicker back and forth with a brief blank between them — one element is different. The "flicker paradigm" reveals a striking truth: even big, obvious changes can take many seconds to spot when there\'s a visual interruption. Without the blank, change pops out instantly.',
    id: 'Dua adegan bergantian dengan kosong sejenak di antara — satu elemen berbeda. "Paradigma flicker" mengungkap kebenaran mengejutkan: bahkan perubahan besar dan jelas bisa butuh banyak detik untuk ditemukan saat ada gangguan visual. Tanpa kosong, perubahan langsung menonjol.',
  },
  details: () => import('./details.js'),
  topics: ['attention', 'perception'],
  load: () => import('./sim.js'),
};
