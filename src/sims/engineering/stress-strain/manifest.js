export default {
  id: 'stress-strain',
  subject: 'engineering',
  title: { en: 'Stress-Strain Curve', id: 'Kurva Tegangan-Regangan' },
  description: {
    en: 'Pull a virtual specimen and trace its stress-strain curve. Drag the load up and the line walks through the elastic region (linear), past the yield point (permanent deformation), through strain hardening, into necking, and finally fracture. Each material has its own signature shape — steel, aluminum, polymer, brittle ceramic.',
    id: 'Tarik spesimen virtual dan telusuri kurva tegangan-regangannya. Geser beban naik dan garis berjalan melalui daerah elastik (linear), melewati titik luluh (deformasi permanen), pengerasan regangan, leher, hingga patah. Tiap material punya bentuk khas — baja, aluminium, polimer, keramik getas.',
  },
  objectives: {
    en: [
      'Identify the four stress regions: elastic, plastic, hardening, necking → fracture.',
      'Read Young\'s modulus E from the slope of the elastic region.',
      'See why brittle materials fracture without warning while ductile metals stretch first.',
    ],
    id: [
      'Mengidentifikasi empat daerah tegangan: elastik, plastik, pengerasan, leher → patah.',
      'Membaca modulus Young E dari kemiringan daerah elastik.',
      'Memahami mengapa material getas patah tanpa peringatan sedangkan logam ulet meregang dulu.',
    ],
  },
  tryThis: {
    en: [
      'Steel — large yield strength, ductile. Drag past yield → permanent deformation persists when you release.',
      'Glass / ceramic — straight line, then snap. No yield warning.',
      'Polymer — long flat plastic region, low yield, big elongation.',
    ],
    id: [
      'Baja — kekuatan luluh besar, ulet. Geser melewati luluh → deformasi permanen tetap saat dilepas.',
      'Kaca / keramik — garis lurus, lalu patah. Tanpa peringatan luluh.',
      'Polimer — daerah plastik datar panjang, luluh rendah, perpanjangan besar.',
    ],
  },
  topics: ['mechanics-of-materials'],
  load: () => import('./sim.js'),
};
