export default {
  id: 'pi-polygons',
  subject: 'mathematics',
  title: { en: "Archimedes' π from Polygons", id: 'π Archimedes dari Poligon' },
  description: {
    en: 'Sandwich the unit circle between an inscribed and a circumscribed regular n-gon. Their perimeters bracket 2π — and converge to it as n grows. Archimedes used this in 250 BC to prove π is between 3.1408 and 3.1428.',
    id: 'Apit lingkaran satuan antara n-gon teratur di dalam dan di luarnya. Keliling keduanya mengapit 2π — dan menyatu padanya saat n bertambah. Archimedes memakai ini pada 250 SM untuk membuktikan π antara 3,1408 dan 3,1428.',
  },
  details: () => import('./details.js'),
  topics: ['geometry', 'pi'],
  hasLab: true,
  load: () => import('./sim.js'),
};
