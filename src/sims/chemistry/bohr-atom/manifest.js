export default {
  id: 'bohr-atom',
  subject: 'chemistry',
  title: { en: 'Bohr Atom Model', id: 'Model Atom Bohr' },
  description: {
    en: 'Pick an element and watch electrons fill shells around the nucleus. Each ring obeys the 2n² rule, and the outermost shell shows valence — the chemistry of an atom in one image.',
    id: 'Pilih sebuah unsur dan amati elektron mengisi kulit-kulit di sekeliling inti. Setiap kulit mengikuti aturan 2n², dan kulit terluar menunjukkan valensi — kimia atom dalam satu gambar.',
  },
  objectives: {
    en: [
      'Apply the 2n² rule for shell capacity.',
      'Identify valence electrons from the outermost shell.',
      'Recognize stable noble-gas configurations.',
    ],
    id: [
      'Menerapkan aturan 2n² untuk kapasitas kulit.',
      'Mengenali elektron valensi dari kulit terluar.',
      'Mengenali konfigurasi gas mulia yang stabil.',
    ],
  },
  tryThis: {
    en: [
      'Compare Na (Z=11) and Cl (Z=17) — count valence electrons.',
      'Watch what happens at the noble gases (2, 10, 18, 36).',
      'Click an electron to highlight its shell.',
    ],
    id: [
      'Bandingkan Na (Z=11) dan Cl (Z=17) — hitung elektron valensi.',
      'Amati perubahan saat mencapai gas mulia (2, 10, 18, 36).',
      'Klik sebuah elektron untuk menyorot kulitnya.',
    ],
  },
  topics: ['atoms', 'electrons'],
  load: () => import('./sim.js'),
};
