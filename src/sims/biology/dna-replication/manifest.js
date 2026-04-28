export default {
  id: 'dna-replication',
  subject: 'biology',
  title: { en: 'DNA Replication (Replication Fork)', id: 'Replikasi DNA (Garpu Replikasi)' },
  description: {
    en: 'A replication fork unzips the DNA double helix; the leading strand copies smoothly while the lagging strand has to be assembled in Okazaki fragments. Watch helicase, polymerase, and ligase do their jobs in animation.',
    id: 'Garpu replikasi membuka untai ganda DNA; untai pemimpin tersalin lancar sementara untai tertinggal harus dirakit dalam fragmen Okazaki. Amati helikase, polimerase, dan ligase bekerja dalam animasi.',
  },
  objectives: {
    en: [
      'Distinguish leading from lagging strand replication.',
      'Identify the role of helicase, primase, polymerase, ligase.',
      'See why replication is "semiconservative".',
    ],
    id: [
      'Membedakan replikasi untai pemimpin dan tertinggal.',
      'Mengenali peran helikase, primase, polimerase, ligase.',
      'Melihat mengapa replikasi bersifat "semikonservatif".',
    ],
  },
  tryThis: {
    en: [
      'Pause and identify both daughter strands — one is half-old, half-new.',
      'Speed it up — see Okazaki fragments accumulate then ligate.',
      'Try a longer template — does the lagging strand still keep up?',
    ],
    id: [
      'Jeda dan kenali kedua untai anak — satu setengah lama, setengah baru.',
      'Percepat — amati fragmen Okazaki menumpuk lalu disambung.',
      'Coba cetakan yang lebih panjang — apakah untai tertinggal tetap menyusul?',
    ],
  },
  topics: ['molecular-biology', 'genetics'],
  load: () => import('./sim.js'),
};
