export default {
  id: 'hydraulic-lift',
  subject: 'physics',
  title: { en: 'Hydraulic Lift', id: 'Dongkrak Hidrolik' },
  description: {
    en: 'Push on a small piston and watch a large piston lift a heavy load. Set the area ratio and the input force, read the pressure that is the same everywhere in the fluid, and see how the output force F₂ = F₁ × A₂/A₁ grows while the piston travel shrinks by the same factor. A preset lets you lift a car with one arm.',
    id: 'Dorong piston kecil dan lihat piston besar mengangkat beban berat. Atur perbandingan luas dan gaya masukan, baca tekanan yang sama di seluruh zat cair, dan lihat gaya keluaran F₂ = F₁ × A₂/A₁ membesar sementara jarak gerak piston mengecil dengan faktor yang sama. Ada preset untuk mengangkat mobil dengan satu tangan.',
  },
  topics: ['pressure', "Pascal's law", 'hydraulics', 'work'],
  grade: [7, 8, 9],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
