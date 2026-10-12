export default {
  id: 'reaction-diffusion',
  subject: 'computer-science',
  title: { en: 'Reaction-Diffusion (Gray-Scott)', id: 'Reaksi-Difusi (Gray-Scott)' },
  description: {
    en: 'Two virtual chemicals react and diffuse on a grid. From a single pixel of seed, beautiful spots, stripes, mazes, and pulsating waves emerge — the same math behind animal coat patterns and Turing morphogenesis.',
    id: 'Dua bahan kimia virtual bereaksi dan berdifusi pada grid. Dari satu piksel benih muncul bintik, garis, labirin, dan gelombang berdenyut yang indah — matematika yang sama di balik pola bulu hewan dan morfogenesis Turing.',
  },
  details: () => import('./details.js'),
  topics: ['pde', 'morphogenesis'],
  grade: [12, 13],
  load: () => import('./sim.js'),
};
