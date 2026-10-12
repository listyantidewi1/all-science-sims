export default {
  id: 'states-of-matter',
  subject: 'chemistry',
  title: { en: 'Ice, Water, Steam', id: 'Es, Air, Uap' },
  description: {
    en: 'Heat or cool a box of tiny particles and watch them change. Cold particles sit still in rows (solid). Warm particles slide past each other (liquid). Hot particles zoom everywhere (gas). Try water, chocolate and candle wax to see that each one melts at a different temperature.',
    id: 'Panaskan atau dinginkan sekotak partikel kecil dan lihat perubahannya. Partikel dingin duduk diam berbaris (padat). Partikel hangat saling bergeser (cair). Partikel panas terbang ke mana-mana (gas). Coba air, cokelat, dan lilin untuk melihat bahwa masing-masing meleleh pada suhu yang berbeda.',
  },
  topics: ['states-of-matter', 'particles', 'heat'],
  grade: [3, 4, 5],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
