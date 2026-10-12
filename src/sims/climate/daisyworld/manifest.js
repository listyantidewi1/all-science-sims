export default {
  id: 'daisyworld',
  subject: 'climate',
  title: { en: 'Daisyworld', id: 'Daisyworld' },
  description: {
    en: 'James Lovelock\'s parable. A planet with two daisy species — light (cools the planet) and dark (warms it) — self-regulates its temperature without anyone planning it. Drag the solar luminosity slider through evolutionary time and watch the daisies homeostatically buffer the temperature, until the sun gets too hot and the system collapses.',
    id: 'Perumpamaan James Lovelock. Planet dengan dua spesies bunga aster — terang (mendinginkan planet) dan gelap (menghangatkannya) — meregulasi sendiri suhunya tanpa rencana. Geser luminositas matahari melalui waktu evolusioner dan amati bunga aster meredam suhu secara homeostatik, hingga matahari terlalu panas dan sistem runtuh.',
  },
  details: () => import('./details.js'),
  topics: ['climate', 'feedback', 'evolution'],
  load: () => import('./sim.js'),
};
