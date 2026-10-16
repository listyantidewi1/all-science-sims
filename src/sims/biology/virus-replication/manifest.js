export default {
  id: 'virus-replication',
  subject: 'biology',
  title: { en: 'Virus Replication', id: 'Replikasi Virus' },
  description: {
    en: 'Watch a bacteriophage infect a bacterium step by step. Choose the lytic cycle (attach, inject, replicate, assemble, lyse) or the lysogenic cycle (integrate, divide with the host, induce), set the burst size and time to lysis, and follow a population of host cells and free virions over time. Pick which stage an antiviral blocks and see where the cycle stalls.',
    id: 'Amati bakteriofag menginfeksi bakteri tahap demi tahap. Pilih siklus litik (menempel, menyuntik, replikasi, perakitan, lisis) atau siklus lisogenik (integrasi, membelah bersama inang, induksi), atur ukuran ledakan (burst size) dan waktu lisis, lalu ikuti populasi sel inang dan virion bebas sepanjang waktu. Pilih tahap yang dihambat antivirus dan lihat di mana siklus terhenti.',
  },
  topics: ['virus', 'bacteriophage', 'lytic cycle', 'lysogenic cycle', 'antiviral'],
  grade: [10],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
