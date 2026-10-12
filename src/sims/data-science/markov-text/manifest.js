export default {
  id: 'markov-text',
  subject: 'data-science',
  title: { en: 'Markov Chain Text Generator', id: 'Generator Teks Rantai Markov' },
  description: {
    en: 'Paste any text. The sim builds a Markov chain over character n-grams and generates new text in the same style. Tune n: small n gives gibberish, larger n quotes the source verbatim.',
    id: 'Tempelkan teks apa pun. Simulasi membangun rantai Markov atas n-gram karakter dan menghasilkan teks baru dengan gaya yang sama. Atur n: kecil = teks omong kosong, besar = mengulang sumber kata demi kata.',
  },
  details: () => import('./details.js'),
  topics: ['nlp', 'probability'],
  grade: [10, 11, 12, 13],
  load: () => import('./sim.js'),
};
