export default {
  id: 'atwood',
  subject: 'physics',
  title: { en: 'Atwood Machine', id: 'Mesin Atwood' },
  description: {
    en: 'Two masses on a string over a frictionless pulley — the textbook setup for Newton\'s second law applied to a system. Adjust both masses, watch the heavier one fall while the lighter one rises, and read the live tension and acceleration. The classic formula a = (m₁ − m₂) g / (m₁ + m₂) becomes obvious here.',
    id: 'Dua massa pada tali melewati katrol tanpa gesekan — peraga buku teks untuk hukum kedua Newton pada sistem. Atur kedua massa, amati yang lebih berat jatuh sementara yang lebih ringan naik, dan baca tegangan serta percepatan langsung. Rumus klasik a = (m₁ − m₂) g / (m₁ + m₂) menjadi jelas di sini.',
  },
  details: () => import('./details.js'),
  topics: ['mechanics', 'forces'],
  hasLab: true,
  load: () => import('./sim.js'),
};
