export default {
  id: 'phase-diagram',
  subject: 'chemistry',
  title: { en: 'Phase Diagram (Water)', id: 'Diagram Fasa (Air)' },
  description: {
    en: "Drag a marker around the pressure-temperature plane and watch a sample turn solid, liquid, or gas. The triple point and critical point — where phase boundaries do strange things — are right there on the plot.",
    id: 'Seret penanda di bidang tekanan-suhu dan amati sampel berubah jadi padat, cair, atau gas. Titik tripel dan titik kritis — tempat batas fasa berperilaku ganjil — terlihat langsung pada grafiknya.',
  },
  details: () => import('./details.js'),
  topics: ['phases', 'thermodynamics'],
  grade: [10, 11, 12],
  load: () => import('./sim.js'),
};
