export default {
  id: 'voting-methods',
  subject: 'social-science',
  title: { en: 'Voting Methods', id: 'Metode Pemungutan Suara' },
  description: {
    en: 'Five candidates, an editable preference profile, and four voting methods. Plurality, two-round runoff, instant-runoff (IRV), and Borda all tally the same ballots — and pick different winners.',
    id: 'Lima kandidat, profil preferensi yang dapat diubah, dan empat metode pemilihan. Pluralitas, dua-putaran, IRV, dan Borda menghitung surat suara yang sama — dan menghasilkan pemenang berbeda.',
  },
  objectives: {
    en: [
      'Apply plurality and ranked methods to the same ballots.',
      'See vote splitting and the spoiler effect.',
      'Recognize Arrow\'s impossibility intuitively.',
    ],
    id: [
      'Menerapkan pluralitas dan metode peringkat pada surat suara yang sama.',
      'Melihat pembagian suara dan efek spoiler.',
      'Mengenali ketidaksempurnaan teorema Arrow secara intuitif.',
    ],
  },
  tryThis: {
    en: [
      'Find a ballot profile where plurality and IRV pick different winners.',
      'Add a "spoiler" candidate similar to a frontrunner.',
      'Make a Condorcet winner — does each method find them?',
    ],
    id: [
      'Cari profil suara di mana pluralitas dan IRV memilih pemenang berbeda.',
      'Tambahkan kandidat "spoiler" mirip dengan favorit.',
      'Buat pemenang Condorcet — apakah tiap metode menemukannya?',
    ],
  },
  topics: ['voting', 'social-choice'],
  load: () => import('./sim.js'),
};
