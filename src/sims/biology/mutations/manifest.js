export default {
  id: 'mutations',
  subject: 'biology',
  title: { en: 'Mutations', id: 'Mutasi' },
  description: {
    en: 'Start from the first 30 bases of the human β-globin gene, transcribe it to mRNA and translate it codon by codon. Then change one base: substitute, insert or delete it at any position and see whether the protein stays the same (silent), swaps one amino acid (missense), stops early (nonsense) or has its whole reading frame shifted. The sickle-cell preset shows the single A→T change that alters haemoglobin.',
    id: 'Mulai dari 30 basa pertama gen β-globin manusia, transkripsikan menjadi mRNA dan translasikan kodon demi kodon. Lalu ubah satu basa: substitusi, insersi atau delesi pada posisi mana pun dan lihat apakah proteinnya tetap sama (diam), menukar satu asam amino (missense), berhenti lebih awal (nonsense) atau seluruh kerangka bacanya bergeser. Preset sel sabit menunjukkan satu perubahan A→T yang mengubah hemoglobin.',
  },
  topics: ['genetics', 'mutation', 'protein synthesis', 'genetic code'],
  grade: [12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
