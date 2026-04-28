export default {
  id: 'reaction-diffusion',
  subject: 'computer-science',
  title: { en: 'Reaction-Diffusion (Gray-Scott)', id: 'Reaksi-Difusi (Gray-Scott)' },
  description: {
    en: 'Two virtual chemicals react and diffuse on a grid. From a single pixel of seed, beautiful spots, stripes, mazes, and pulsating waves emerge — the same math behind animal coat patterns and Turing morphogenesis.',
    id: 'Dua bahan kimia virtual bereaksi dan berdifusi pada grid. Dari satu piksel benih muncul bintik, garis, labirin, dan gelombang berdenyut yang indah — matematika yang sama di balik pola bulu hewan dan morfogenesis Turing.',
  },
  objectives: {
    en: [
      'See how two simple PDEs produce complex patterns.',
      'Connect feed/kill rates to spots vs stripes vs mazes.',
      'Recognize Turing-pattern style biology (zebra, leopard, fish skins).',
    ],
    id: [
      'Melihat bagaimana dua PDE sederhana menghasilkan pola kompleks.',
      'Mengaitkan laju umpan/kill dengan bintik vs garis vs labirin.',
      'Mengenali biologi pola Turing (zebra, macan, kulit ikan).',
    ],
  },
  tryThis: {
    en: [
      'Spots preset (F=0.035, k=0.065).',
      'Coral preset (F=0.054, k=0.062).',
      'Click the canvas to inject more activator.',
    ],
    id: [
      'Praatur Bintik (F=0,035, k=0,065).',
      'Praatur Karang (F=0,054, k=0,062).',
      'Klik kanvas untuk menyuntikkan aktivator lebih banyak.',
    ],
  },
  topics: ['pde', 'morphogenesis'],
  load: () => import('./sim.js'),
};
