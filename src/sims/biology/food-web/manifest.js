export default {
  id: 'food-web',
  subject: 'biology',
  title: { en: 'Food Web Builder', id: 'Pembangun Jaring Makanan' },
  description: {
    en: 'A grassland ecosystem with sun, plants, herbivores, predators, and decomposers. Drag organisms around the canvas, click two of them to add a "X eats Y" arrow, and press "Remove species" to see the cascade effects ripple through the rest of the web. Trophic-level coloring makes the structure pop.',
    id: 'Ekosistem padang rumput dengan matahari, tumbuhan, herbivora, pemangsa, dan pengurai. Geser organisme di kanvas, klik dua di antaranya untuk menambahkan panah "X memakan Y", dan tekan "Hilangkan spesies" untuk melihat efek kaskade beriak. Pewarnaan tingkat trofik membuat strukturnya menonjol.',
  },
  objectives: {
    en: [
      'Identify trophic levels: producer, primary consumer, secondary consumer, top predator, decomposer.',
      'Predict cascade effects: removing one species often shifts populations several levels away.',
      'Recognize that real food webs are NOT linear chains — they branch and intertwine.',
    ],
    id: [
      'Mengidentifikasi tingkat trofik: produsen, konsumen primer, sekunder, pemangsa puncak, pengurai.',
      'Memprediksi efek kaskade: menghilangkan satu spesies sering menggeser populasi beberapa tingkat jauh.',
      'Mengenali bahwa jaring makanan nyata BUKAN rantai linear — bercabang dan berjalin.',
    ],
  },
  tryThis: {
    en: [
      'Remove the wolf — deer population spikes, vegetation crashes.',
      'Remove the grass — every layer above it collapses.',
      'Build your own simple chain by removing arrows.',
    ],
    id: [
      'Hilangkan serigala — populasi rusa melonjak, vegetasi runtuh.',
      'Hilangkan rumput — semua lapisan di atasnya runtuh.',
      'Bangun rantai sederhana sendiri dengan menghapus panah.',
    ],
  },
  topics: ['ecology'],
  load: () => import('./sim.js'),
};
