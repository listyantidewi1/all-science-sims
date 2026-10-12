export default {
  id: 'sea-level-rise',
  subject: 'climate',
  title: { en: 'Sea Level Rise', id: 'Kenaikan Permukaan Laut' },
  description: {
    en: 'A procedurally generated coastline. Drag the sea level slider and watch low-lying land flood as a percent of total land. The hypsometric curve in the corner shows what fraction of land sits below any chosen elevation. Most coastal cities live on a few meters of margin.',
    id: 'Garis pantai yang dibuat secara prosedural. Geser slider permukaan laut dan amati daratan rendah terendam sebagai persentase total daratan. Kurva hipsometrik di sudut menunjukkan fraksi daratan di bawah elevasi tertentu. Kebanyakan kota pesisir hidup pada margin beberapa meter.',
  },
  details: () => import('./details.js'),
  topics: ['climate', 'geography'],
  load: () => import('./sim.js'),
};
