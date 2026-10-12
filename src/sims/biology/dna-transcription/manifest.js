export default {
  id: 'dna-transcription',
  subject: 'biology',
  title: { en: 'DNA Transcription & Translation', id: 'Transkripsi & Translasi DNA' },
  description: {
    en: 'Type or edit a DNA template strand and watch RNA polymerase transcribe it base-by-base, then a ribosome translate codons into amino acids. Stop and start at any position.',
    id: 'Ketik atau ubah untai cetakan DNA dan amati RNA polimerase mentranskripsi basa demi basa, lalu ribosom menerjemahkan kodon menjadi asam amino. Hentikan dan mulai pada posisi mana pun.',
  },
  details: () => import('./details.js'),
  topics: ['genetics', 'molecular-biology'],
  grade: [11, 12, 13],
  load: () => import('./sim.js'),
};
