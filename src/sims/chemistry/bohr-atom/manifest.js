export default {
  id: 'bohr-atom',
  subject: 'chemistry',
  title: { en: 'Bohr Atom Model', id: 'Model Atom Bohr' },
  description: {
    en: 'Pick an element and watch electrons fill shells around the nucleus. Each ring obeys the 2n² rule, and the outermost shell shows valence — the chemistry of an atom in one image.',
    id: 'Pilih sebuah unsur dan amati elektron mengisi kulit-kulit di sekeliling inti. Setiap kulit mengikuti aturan 2n², dan kulit terluar menunjukkan valensi — kimia atom dalam satu gambar.',
  },
  details: () => import('./details.js'),
  topics: ['atoms', 'electrons'],
  load: () => import('./sim.js'),
};
