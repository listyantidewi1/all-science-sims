export default {
  id: 'energy-transfers',
  subject: 'physics',
  title: { en: 'Energy Transfers', id: 'Perpindahan Energi' },
  description: {
    en: 'Reshape a roller-coaster track by dragging its control points, then release a cart from a chosen height. Live bars show kinetic, gravitational potential, and thermal energy. With friction off the bars always add up to the same total; switch friction on and watch the thermal bar grow as the cart slows.',
    id: 'Ubah bentuk lintasan roller coaster dengan menggeser titik kontrolnya, lalu lepaskan kereta dari ketinggian pilihanmu. Batang energi menunjukkan energi kinetik, energi potensial gravitasi, dan energi panas secara langsung. Tanpa gesekan, jumlah batang selalu sama; nyalakan gesekan dan lihat batang panas tumbuh saat kereta melambat.',
  },
  topics: ['energy', 'conservation-of-energy', 'friction'],
  grade: [7, 8, 9],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
