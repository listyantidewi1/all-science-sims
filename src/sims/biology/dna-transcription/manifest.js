export default {
  id: 'dna-transcription',
  subject: 'biology',
  title: { en: 'DNA Transcription & Translation', id: 'Transkripsi & Translasi DNA' },
  description: {
    en: 'Type or edit a DNA coding strand, see its template strand, and watch RNA polymerase build the mRNA base-by-base, then a ribosome translate codons into amino acids from the first AUG to a stop codon. Stop and start at any position.',
    id: 'Ketik atau ubah untai pengode DNA, lihat untai cetakannya, dan amati RNA polimerase membangun mRNA basa demi basa, lalu ribosom menerjemahkan kodon menjadi asam amino dari AUG pertama sampai kodon henti. Hentikan dan mulai pada posisi mana pun.',
  },
  details: () => import('./details.js'),
  topics: ['genetics', 'molecular-biology'],
  grade: [11, 12, 13],
  load: () => import('./sim.js'),
};
