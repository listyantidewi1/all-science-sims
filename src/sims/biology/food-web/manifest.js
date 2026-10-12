export default {
  id: 'food-web',
  subject: 'biology',
  title: { en: 'Food Web Builder', id: 'Pembangun Jaring Makanan' },
  description: {
    en: 'A grassland ecosystem with sun, plants, herbivores, predators, and decomposers. Drag organisms around the canvas, click two of them to add a "X eats Y" arrow, and press "Remove species" to see the cascade effects ripple through the rest of the web. Trophic-level coloring makes the structure pop.',
    id: 'Ekosistem padang rumput dengan matahari, tumbuhan, herbivora, pemangsa, dan pengurai. Geser organisme di kanvas, klik dua di antaranya untuk menambahkan panah "X memakan Y", dan tekan "Hilangkan spesies" untuk melihat efek kaskade beriak. Pewarnaan tingkat trofik membuat strukturnya menonjol.',
  },
  details: () => import('./details.js'),
  topics: ['ecology'],
  load: () => import('./sim.js'),
};
