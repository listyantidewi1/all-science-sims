export default {
  id: 'markov-text',
  subject: 'data-science',
  title: { en: 'Markov Chain Text Generator', id: 'Generator Teks Rantai Markov' },
  description: {
    en: 'Paste any text. The sim builds a Markov chain over character n-grams and generates new text in the same style. Tune n: small n gives gibberish, larger n quotes the source verbatim.',
    id: 'Tempelkan teks apa pun. Simulasi membangun rantai Markov atas n-gram karakter dan menghasilkan teks baru dengan gaya yang sama. Atur n: kecil = teks omong kosong, besar = mengulang sumber kata demi kata.',
  },
  objectives: {
    en: [
      'See how an n-gram captures local structure.',
      'Find the n where output looks "stylish but novel".',
      'Connect to large language models as a vast generalization.',
    ],
    id: [
      'Melihat bagaimana n-gram menangkap struktur lokal.',
      'Cari n di mana output "gaya tetapi baru".',
      'Mengaitkan dengan model bahasa besar sebagai generalisasi luas.',
    ],
  },
  tryThis: {
    en: [
      'Paste a Shakespeare sonnet — find n=4..6 sweet spot.',
      'n=2: chaos. n=8: paste-back. Find the gradient.',
      'Try Indonesian text — does the chain learn style?',
    ],
    id: [
      'Tempelkan soneta Shakespeare — cari titik manis n=4..6.',
      'n=2: kacau. n=8: salin balik. Cari gradiennya.',
      'Coba teks Bahasa Indonesia — apakah rantai mempelajari gayanya?',
    ],
  },
  topics: ['nlp', 'probability'],
  load: () => import('./sim.js'),
};
