export default {
  id: 'dna-replication',
  subject: 'biology',
  title: { en: 'DNA Replication (Replication Fork)', id: 'Replikasi DNA (Garpu Replikasi)' },
  description: {
    en: 'A replication fork unzips the DNA double helix; the leading strand copies smoothly while the lagging strand has to be assembled in Okazaki fragments. Watch helicase, polymerase, and ligase do their jobs in animation.',
    id: 'Garpu replikasi membuka untai ganda DNA; untai pemimpin tersalin lancar sementara untai tertinggal harus dirakit dalam fragmen Okazaki. Amati helikase, polimerase, dan ligase bekerja dalam animasi.',
  },
  details: () => import('./details.js'),
  topics: ['molecular-biology', 'genetics'],
  grade: [11, 12, 13],
  load: () => import('./sim.js'),
};
