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
  {
    id: 'mathematics',
    name:        { en: 'Mathematics',       id: 'Matematika' },
    description: { en: 'Algebra, calculus, linear algebra, complex numbers.', id: 'Aljabar, kalkulus, aljabar linear, bilangan kompleks.' },
    icon: '📐',
  },
  {
    id: 'finance',
    name:        { en: 'Finance & Economics', id: 'Keuangan & Ekonomi' },
    description: { en: 'Interest, markets, inflation, options, taxes.', id: 'Bunga, pasar, inflasi, opsi, pajak.' },
    icon: '💰',
  },
  {
    id: 'engineering',
    name:        { en: 'Engineering',         id: 'Teknik' },
    description: { en: 'Trusses, beams, control systems, circuits.', id: 'Rangka, balok, sistem kendali, rangkaian.' },
    icon: '⚙',
  },
  {
    id: 'music',
    name:        { en: 'Music & Acoustics',   id: 'Musik & Akustik' },
    description: { en: 'Harmonics, intervals, beats, synthesis.', id: 'Harmoni, interval, layangan, sintesis.' },
    icon: '🎵',
  },
  {
    id: 'climate',
    name:        { en: 'Climate & Sustainability', id: 'Iklim & Keberlanjutan' },
    description: { en: 'Carbon cycle, feedbacks, energy mix.', id: 'Siklus karbon, umpan-balik, bauran energi.' },
    icon: '🌱',
  },
  {
    id: 'psychology',
    name:        { en: 'Psychology',                id: 'Psikologi' },
    description: { en: 'Bias, conditioning, memory, social pressure.', id: 'Bias, pengondisian, memori, tekanan sosial.' },
    icon: '🧠',
  },
  {
    id: 'cognitive-science',
    name:        { en: 'Cognitive Science',          id: 'Ilmu Kognitif' },
    description: { en: 'Perception, attention, illusions, mental tasks.', id: 'Persepsi, perhatian, ilusi, tugas mental.' },
    icon: '💡',
  },
];

export const SUBJECT_BY_ID = Object.fromEntries(SUBJECTS.map((s) => [s.id, s]));
