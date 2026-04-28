export default {
  id: 'daisyworld',
  subject: 'climate',
  title: { en: 'Daisyworld', id: 'Daisyworld' },
  description: {
    en: 'James Lovelock\'s parable. A planet with two daisy species — light (cools the planet) and dark (warms it) — self-regulates its temperature without anyone planning it. Drag the solar luminosity slider through evolutionary time and watch the daisies homeostatically buffer the temperature, until the sun gets too hot and the system collapses.',
    id: 'Perumpamaan James Lovelock. Planet dengan dua spesies bunga aster — terang (mendinginkan planet) dan gelap (menghangatkannya) — meregulasi sendiri suhunya tanpa rencana. Geser luminositas matahari melalui waktu evolusioner dan amati bunga aster meredam suhu secara homeostatik, hingga matahari terlalu panas dan sistem runtuh.',
  },
  objectives: {
    en: [
      'See emergent self-regulation: the daisies\' selfish growth produces a regulated planet.',
      'Watch albedo dynamically respond to temperature.',
      'Note the collapse: when luminosity exceeds a threshold, no biological feedback can save the planet.',
    ],
    id: [
      'Melihat regulasi-diri yang muncul: pertumbuhan egoistik bunga aster menghasilkan planet teregulasi.',
      'Mengamati albedo merespons suhu secara dinamis.',
      'Memperhatikan kolaps: bila luminositas melewati ambang, tidak ada umpan balik biologis yang bisa menyelamatkan planet.',
    ],
  },
  tryThis: {
    en: [
      'Slowly raise solar luminosity — temperature stays nearly flat over a wide band.',
      'Outside the daisies\' tolerance — no homeostasis, T tracks luminosity.',
      'Run with only one daisy species — regulation works only on one side of the temperature window.',
    ],
    id: [
      'Naikkan luminositas perlahan — suhu hampir datar di rentang lebar.',
      'Di luar toleransi bunga aster — tidak ada homeostasis, T mengikuti luminositas.',
      'Jalankan dengan satu spesies — regulasi hanya bekerja di satu sisi jendela suhu.',
    ],
  },
  topics: ['climate', 'feedback', 'evolution'],
  load: () => import('./sim.js'),
};
