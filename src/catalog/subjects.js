export const SUBJECTS = [
  {
    id: 'physics',
    name:        { en: 'Physics',         id: 'Fisika' },
    description: { en: 'Motion, forces, waves, energy.', id: 'Gerak, gaya, gelombang, energi.' },
    icon: '⚛',
  },
  {
    id: 'chemistry',
    name:        { en: 'Chemistry',       id: 'Kimia' },
    description: { en: 'Atoms, reactions, gases, acids.', id: 'Atom, reaksi, gas, asam.' },
    icon: '🧪',
  },
  {
    id: 'biology',
    name:        { en: 'Biology',         id: 'Biologi' },
    description: { en: 'Cells, genetics, evolution, ecology.', id: 'Sel, genetika, evolusi, ekologi.' },
    icon: '🧬',
  },
  {
    id: 'earth-space',
    name:        { en: 'Earth & Space',   id: 'Bumi & Antariksa' },
    description: { en: 'Tectonics, weather, planets, seasons.', id: 'Tektonik, cuaca, planet, musim.' },
    icon: '🌍',
  },
  {
    id: 'computer-science',
    name:        { en: 'Computer Science', id: 'Ilmu Komputer' },
    description: { en: 'Algorithms, data structures, search.', id: 'Algoritma, struktur data, pencarian.' },
    icon: '💻',
  },
  {
    id: 'data-science',
    name:        { en: 'Data Science',     id: 'Ilmu Data' },
    description: { en: 'Statistics, regression, clustering.', id: 'Statistika, regresi, klastering.' },
    icon: '📊',
  },
  {
    id: 'social-science',
    name:        { en: 'Social Science',   id: 'Ilmu Sosial' },
    description: { en: 'Economics, game theory, populations.', id: 'Ekonomi, teori permainan, populasi.' },
    icon: '🌐',
  },
];

export const SUBJECT_BY_ID = Object.fromEntries(SUBJECTS.map((s) => [s.id, s]));
