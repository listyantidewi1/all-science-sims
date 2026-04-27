export default {
  id: 'dna-transcription',
  subject: 'biology',
  title: { en: 'DNA Transcription & Translation', id: 'Transkripsi & Translasi DNA' },
  description: {
    en: 'Type or edit a DNA template strand and watch RNA polymerase transcribe it base-by-base, then a ribosome translate codons into amino acids. Stop and start at any position.',
    id: 'Ketik atau ubah untai cetakan DNA dan amati RNA polimerase mentranskripsi basa demi basa, lalu ribosom menerjemahkan kodon menjadi asam amino. Hentikan dan mulai pada posisi mana pun.',
  },
  objectives: {
    en: [
      'Match DNA bases to their RNA complements (A→U, T→A, C→G, G→C).',
      'Read the codon table to translate mRNA into amino acids.',
      'Identify start (AUG) and stop codons in a sequence.',
    ],
    id: [
      'Memasangkan basa DNA dengan komplemen RNA (A→U, T→A, C→G, G→C).',
      'Membaca tabel kodon untuk menerjemahkan mRNA menjadi asam amino.',
      'Mengenali kodon mulai (AUG) dan kodon henti pada urutan.',
    ],
  },
  tryThis: {
    en: [
      'Insert a single base into the middle — what happens to all downstream codons?',
      'Find a stop codon — what amino acids does it correspond to?',
      'Edit ATG into ATC — does translation still start?',
    ],
    id: [
      'Sisipkan satu basa di tengah — apa yang terjadi pada kodon-kodon setelahnya?',
      'Cari kodon henti — asam amino apa yang terkait?',
      'Ubah ATG menjadi ATC — apakah translasi tetap dimulai?',
    ],
  },
  topics: ['genetics', 'molecular-biology'],
  grade: [11, 12],
  load: () => import('./sim.js'),
};
