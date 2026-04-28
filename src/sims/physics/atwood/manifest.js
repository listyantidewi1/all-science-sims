export default {
  id: 'atwood',
  subject: 'physics',
  title: { en: 'Atwood Machine', id: 'Mesin Atwood' },
  description: {
    en: 'Two masses on a string over a frictionless pulley — the textbook setup for Newton\'s second law applied to a system. Adjust both masses, watch the heavier one fall while the lighter one rises, and read the live tension and acceleration. The classic formula a = (m₁ − m₂) g / (m₁ + m₂) becomes obvious here.',
    id: 'Dua massa pada tali melewati katrol tanpa gesekan — peraga buku teks untuk hukum kedua Newton pada sistem. Atur kedua massa, amati yang lebih berat jatuh sementara yang lebih ringan naik, dan baca tegangan serta percepatan langsung. Rumus klasik a = (m₁ − m₂) g / (m₁ + m₂) menjadi jelas di sini.',
  },
  objectives: {
    en: [
      'Derive a and T from the two free-body equations.',
      'Verify a = (m₁ − m₂)g/(m₁ + m₂) and T = 2 m₁ m₂ g / (m₁ + m₂).',
      'See that equal masses give a = 0, T = mg.',
    ],
    id: [
      'Menurunkan a dan T dari dua persamaan benda bebas.',
      'Memverifikasi a = (m₁ − m₂)g/(m₁ + m₂) dan T = 2 m₁ m₂ g / (m₁ + m₂).',
      'Melihat bahwa massa sama memberi a = 0, T = mg.',
    ],
  },
  tryThis: {
    en: [
      'Equal masses — system is balanced; T = mg.',
      'm₁ = 2·m₂ — heavier side falls at g/3; T = (4/3)·m₂·g.',
      'Tiny mass difference — slow acceleration; tension barely above each weight.',
    ],
    id: [
      'Massa sama — sistem seimbang; T = mg.',
      'm₁ = 2·m₂ — sisi lebih berat jatuh g/3; T = (4/3)·m₂·g.',
      'Selisih massa kecil — percepatan lambat; tegangan sedikit di atas berat masing-masing.',
    ],
  },
  topics: ['mechanics', 'forces'],
  load: () => import('./sim.js'),
};
