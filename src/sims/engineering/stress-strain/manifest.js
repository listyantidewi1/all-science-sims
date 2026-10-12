export default {
  id: 'stress-strain',
  subject: 'engineering',
  title: { en: 'Stress-Strain Curve', id: 'Kurva Tegangan-Regangan' },
  description: {
    en: 'Pull a virtual specimen and trace its stress-strain curve. Drag the load up and the line walks through the elastic region (linear), past the yield point (permanent deformation), through strain hardening, into necking, and finally fracture. Each material has its own signature shape — steel, aluminum, polymer, brittle ceramic.',
    id: 'Tarik spesimen virtual dan telusuri kurva tegangan-regangannya. Geser beban naik dan garis berjalan melalui daerah elastik (linear), melewati titik luluh (deformasi permanen), pengerasan regangan, leher, hingga patah. Tiap material punya bentuk khas — baja, aluminium, polimer, keramik getas.',
  },
  details: () => import('./details.js'),
  topics: ['mechanics-of-materials'],
  hasLab: true,
  load: () => import('./sim.js'),
};
