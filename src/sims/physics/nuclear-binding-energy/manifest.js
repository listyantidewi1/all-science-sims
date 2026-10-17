export default {
  id: 'nuclear-binding-energy',
  subject: 'physics',
  title: { en: 'Fission and Fusion', id: 'Fisi dan Fusi' },
  description: {
    en: 'Explore the binding energy per nucleon curve built from real atomic masses of about 40 nuclides, click any point to see its Z, N and BE/A, and discover why iron-56 and nickel-62 sit at the top. Then run the numbers for a fission reaction, U-235 + n → Ba-141 + Kr-92 + 3n, and a fusion reaction, D + T → He-4 + n: the mass defect in atomic mass units becomes energy in MeV through E = Δm·c². A chain-reaction animation with adjustable control rods shows how the multiplication factor k decides whether a reactor runs steadily, dies out or runs away.',
    id: 'Jelajahi kurva energi ikat per nukleon yang dibangun dari massa atom sesungguhnya sekitar 40 nuklida, klik titik mana pun untuk melihat Z, N, dan EI/A, dan temukan mengapa besi-56 dan nikel-62 berada di puncak. Lalu hitung reaksi fisi, U-235 + n → Ba-141 + Kr-92 + 3n, dan reaksi fusi, D + T → He-4 + n: defek massa dalam satuan massa atom menjadi energi dalam MeV melalui E = Δm·c². Animasi reaksi berantai dengan batang kendali yang dapat diatur menunjukkan bagaimana faktor multiplikasi k menentukan apakah reaktor berjalan stabil, padam, atau lepas kendali.',
  },
  topics: ['nuclear physics', 'binding energy', 'fission', 'fusion', 'mass defect'],
  grade: [12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
