// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
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

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A Markov chain is a random process with a short memory: the next state depends only on the current state, not on anything earlier. For text, a simple choice of "state" is the last n characters, called an n-gram or context. Reading through a source text once, we can build a table that records, for every context that occurs, which character came next each time. That table is the whole model. "th" might be followed by "e" nine times and "a" twice, so after "th" the chain should produce "e" with probability 9/11 and "a" with probability 2/11.',
        'The simulation builds this table from whatever text is in the box, using character n-grams with n from 1 to 8. To generate, it picks a random context from the table to start, looks up the list of characters that followed that context, chooses one at random (duplicates are kept in the list, so common continuations are chosen more often, exactly matching the source frequencies), appends it, and slides the window along by one character. If it reaches a context that was only ever seen at the very end of the text, there is no continuation, so the sim jumps to a fresh random context and inserts a space. The length slider sets how many characters to produce; the preset buttons load a Shakespeare sonnet, a passage from Alice in Wonderland and a set of Indonesian pantun.',
        'The n-gram size is the whole story. With n = 1 the model only knows which letter tends to follow which: the output has the right mix of letters and spaces but almost no real words. At n = 3 or 4 it produces pronounceable pseudo-words and fragments that sound like the source, which is the "stylish but novel" zone. As n grows, most contexts in a short text occur only once, so each has only one possible continuation, and the chain reproduces long stretches of the source verbatim. Where the sweet spot lies depends on the source length: with 27 or so symbols there are about 27^n possible contexts, so a 600-character sonnet runs out of repeated 5-grams quickly, while a whole novel could support n = 8 and still surprise you.',
        'This model has no grammar, no dictionary and no idea what the words mean; everything it "knows" is a frequency table of short strings. It also has no long-range memory, so a sentence that began with a question will not remember to end with a question mark. Large language models share the same core task, predicting the next token from the preceding context, but with contexts of thousands of tokens, probabilities computed by a neural network that generalises across similar contexts instead of looking up exact matches, and training on text billions of times longer. The sim also samples strictly in proportion to the counts; it has no "temperature" control to make the output more or less adventurous.',
      ],
      id: [
        'Rantai Markov adalah proses acak dengan ingatan pendek: keadaan berikutnya hanya bergantung pada keadaan saat ini, bukan pada apa pun sebelumnya. Untuk teks, pilihan "keadaan" yang sederhana adalah n karakter terakhir, yang disebut n-gram atau konteks. Dengan membaca teks sumber satu kali, kita bisa membangun tabel yang mencatat, untuk setiap konteks yang muncul, karakter apa yang mengikutinya setiap kali. Tabel itulah seluruh modelnya. "th" mungkin diikuti "e" sembilan kali dan "a" dua kali, sehingga setelah "th" rantai seharusnya menghasilkan "e" dengan peluang 9/11 dan "a" dengan peluang 2/11.',
        'Simulasi ini membangun tabel tersebut dari teks apa pun yang ada di kotak, memakai n-gram karakter dengan n dari 1 sampai 8. Untuk menghasilkan teks, ia memilih konteks acak dari tabel sebagai awal, mencari daftar karakter yang pernah mengikuti konteks itu, memilih satu secara acak (duplikat dipertahankan dalam daftar, sehingga lanjutan yang umum lebih sering terpilih, persis sesuai frekuensi sumbernya), menambahkannya, lalu menggeser jendela satu karakter. Jika sampai pada konteks yang hanya pernah muncul di ujung akhir teks, tidak ada lanjutannya, sehingga simulasi melompat ke konteks acak baru dan menyisipkan spasi. Slider panjang mengatur berapa karakter yang dihasilkan; tombol preset memuat soneta Shakespeare, kutipan Alice in Wonderland, dan sekumpulan pantun Indonesia.',
        'Ukuran n-gram adalah inti ceritanya. Dengan n = 1 model hanya tahu huruf mana yang cenderung mengikuti huruf mana: keluarannya punya campuran huruf dan spasi yang benar tetapi hampir tanpa kata sungguhan. Pada n = 3 atau 4 ia menghasilkan kata-kata semu yang bisa diucapkan dan penggalan yang terdengar seperti sumbernya; inilah zona "bergaya tetapi baru". Saat n membesar, sebagian besar konteks dalam teks pendek hanya muncul sekali, sehingga masing-masing hanya punya satu lanjutan yang mungkin, dan rantai menyalin potongan panjang sumbernya kata demi kata. Letak titik manisnya bergantung pada panjang sumber: dengan sekitar 27 simbol ada kira-kira 27^n konteks yang mungkin, sehingga soneta 600 karakter cepat kehabisan 5-gram yang berulang, sedangkan satu novel utuh bisa menopang n = 8 dan tetap mengejutkanmu.',
        'Model ini tidak punya tata bahasa, tidak punya kamus, dan tidak tahu arti kata-katanya; semua yang "diketahuinya" hanyalah tabel frekuensi string pendek. Ia juga tidak punya ingatan jangka panjang, sehingga kalimat yang dimulai sebagai pertanyaan tidak akan ingat untuk diakhiri dengan tanda tanya. Model bahasa besar berbagi tugas inti yang sama, memprediksi token berikutnya dari konteks sebelumnya, tetapi dengan konteks ribuan token, peluang yang dihitung oleh jaringan saraf yang menggeneralisasi antar konteks serupa alih-alih mencari kecocokan persis, dan pelatihan pada teks yang miliaran kali lebih panjang. Simulasi juga mengambil sampel tepat sebanding dengan hitungannya; tidak ada kendali "temperatur" untuk membuat keluarannya lebih atau kurang berani.',
      ],
    },
    figure: {
      caption: {
        en: 'Building a 2-gram table from "the cat sat on the mat". The context "e " occurred twice, once followed by "c" and once by "m", so after "e " the chain picks either with probability 1/2. The context "th" was always followed by "e".',
        id: 'Membangun tabel 2-gram dari "the cat sat on the mat". Konteks "e " muncul dua kali, sekali diikuti "c" dan sekali "m", sehingga setelah "e " rantai memilih salah satunya dengan peluang 1/2. Konteks "th" selalu diikuti "e".',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const src = 'the cat sat on the mat';
        const cw = 14, x0 = 26, y0 = 50;
        let cells = '';
        for (let i = 0; i < src.length; i++) {
          const hi = (i === 2 || i === 3) || (i === 17 || i === 18);
          const nx = (i === 4 || i === 19);
          cells += `<rect x="${x0 + i * cw}" y="${y0 - 14}" width="${cw - 1}" height="20" rx="3" fill="${hi ? '#3b82f6' : nx ? '#10b981' : 'none'}" fill-opacity="${hi || nx ? '.35' : '0'}" stroke="currentColor" stroke-opacity=".25"/>`;
          cells += `<text x="${x0 + i * cw + 3}" y="${y0 + 1}" class="mono">${src[i] === ' ' ? '␣' : src[i]}</text>`;
        }
        const row = (y, ctx, nexts, prob) => `<rect x="30" y="${y - 14}" width="34" height="20" rx="3" fill="#3b82f6" fill-opacity=".35" stroke="currentColor" stroke-opacity=".25"/><text x="36" y="${y + 1}" class="mono">${ctx}</text>
  <text x="74" y="${y + 1}">→</text>
  <text x="92" y="${y + 1}" class="mono" fill="#10b981">${nexts}</text>
  <text x="200" y="${y + 1}" class="s">${prob}</text>`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A 2-gram transition table built from a short sentence', 'Tabel transisi 2-gram yang dibangun dari kalimat pendek')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.mono{font:12px ui-monospace,Menlo,monospace;fill:currentColor}.s{font-size:10px}.b{font-weight:600}</style>
  <text x="8" y="20" class="b">${L('Source text, window n = 2', 'Teks sumber, jendela n = 2')}</text>
  ${cells}
  <text x="8" y="78" class="s">${L('blue = context "e␣" (seen twice), green = the character that followed it', 'biru = konteks "e␣" (muncul dua kali), hijau = karakter yang mengikutinya')}</text>
  <text x="8" y="106" class="b">${L('Transition table (part)', 'Tabel transisi (sebagian)')}</text>
  <text x="200" y="106" class="s">${L('probability of each next char', 'peluang tiap karakter berikutnya')}</text>
  ${row(128, 'th', 'e, e', L('e: 2/2 = 100%', 'e: 2/2 = 100%'))}
  ${row(152, 'e␣', 'c, m', L('c: 1/2, m: 1/2', 'c: 1/2, m: 1/2'))}
  ${row(176, 't␣', 's, o', L('s: 1/2, o: 1/2', 's: 1/2, o: 1/2'))}
  ${row(200, 'at', '␣, ␣', L('space: 2/2 = 100%', 'spasi: 2/2 = 100%'))}
  <text x="8" y="230" class="s">${L('Generate: pick a context, draw a next char from its list, slide the window, repeat.', 'Menghasilkan: pilih konteks, ambil karakter berikutnya dari daftarnya, geser jendela, ulangi.')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A character n-gram model is just a table of which characters followed each n-character context in the source text.',
        'Generation is repeated lookup and random choice: the next character is drawn in proportion to how often it followed the current context.',
        'Small n captures only letter statistics and yields gibberish; large n on a short text reproduces the source verbatim because most contexts occur once.',
        'The useful n depends on how much text there is, since the number of possible contexts grows exponentially with n.',
        'Large language models perform the same next-token prediction, but with far longer contexts and a neural network that generalises instead of a lookup table.',
      ],
      id: [
        'Model n-gram karakter hanyalah tabel karakter mana yang mengikuti setiap konteks n karakter dalam teks sumber.',
        'Menghasilkan teks berarti mengulang pencarian dan pilihan acak: karakter berikutnya diambil sebanding dengan seberapa sering ia mengikuti konteks saat ini.',
        'n kecil hanya menangkap statistik huruf dan menghasilkan teks kacau; n besar pada teks pendek menyalin sumbernya kata demi kata karena sebagian besar konteks hanya muncul sekali.',
        'n yang berguna bergantung pada banyaknya teks, karena jumlah konteks yang mungkin tumbuh secara eksponensial terhadap n.',
        'Model bahasa besar melakukan prediksi token berikutnya yang sama, tetapi dengan konteks jauh lebih panjang dan jaringan saraf yang menggeneralisasi alih-alih tabel pencarian.',
      ],
    },
    vocabulary: {
      en: [
        ['Markov chain', 'A random process in which the probability of the next state depends only on the current state.'],
        ['State / context', 'Here, the last n characters generated; it is all the model remembers.'],
        ['n-gram', 'A sequence of n consecutive characters (or words) taken from a text.'],
        ['Transition table', 'The record of which characters followed each context in the source, and how often.'],
        ['Order', 'Another name for n, the length of the context the chain conditions on.'],
        ['Sparsity', 'The problem that, for large n, most possible contexts never appear in the training text, or appear only once.'],
        ['Token', 'The unit a language model predicts; characters here, word pieces in most large language models.'],
      ],
      id: [
        ['Rantai Markov', 'Proses acak yang peluang keadaan berikutnya hanya bergantung pada keadaan saat ini.'],
        ['Keadaan / konteks', 'Di sini, n karakter terakhir yang dihasilkan; hanya itu yang diingat model.'],
        ['n-gram', 'Urutan n karakter (atau kata) berturut-turut yang diambil dari sebuah teks.'],
        ['Tabel transisi', 'Catatan karakter mana yang mengikuti setiap konteks dalam sumber, dan seberapa sering.'],
        ['Orde', 'Nama lain untuk n, panjang konteks yang menjadi syarat rantai.'],
        ['Kelangkaan (sparsity)', 'Masalah bahwa, untuk n besar, sebagian besar konteks yang mungkin tidak pernah muncul dalam teks latih, atau hanya muncul sekali.'],
        ['Token', 'Satuan yang diprediksi model bahasa; di sini karakter, pada sebagian besar model bahasa besar berupa potongan kata.'],
      ],
    },
    misconceptions: {
      en: [
        ['The generator understands the text and is writing in its style.', 'It has no notion of words, grammar or meaning. It copies local letter patterns, and the "style" you perceive is the statistics of short character strings in the source.'],
        ['A bigger n is always a better model.', 'Only if there is enough text. On a short source, a large n makes nearly every context unique, so the chain has one choice at each step and simply replays the source. The best n is a balance between coherence and novelty.'],
        ['Randomness is what makes the output bad; a deterministic rule would be better.', 'The random choice is what produces novelty. Always picking the most frequent continuation would loop on the same few phrases; sampling in proportion to the counts is what lets the model recombine the source in new ways.'],
      ],
      id: [
        ['Generator ini memahami teksnya dan menulis dengan gayanya.', 'Ia tidak punya pengertian tentang kata, tata bahasa, atau makna. Ia menyalin pola huruf lokal, dan "gaya" yang kamu rasakan adalah statistik string karakter pendek dalam sumbernya.'],
        ['n yang lebih besar selalu model yang lebih baik.', 'Hanya jika teksnya cukup banyak. Pada sumber pendek, n besar membuat hampir setiap konteks unik, sehingga rantai punya satu pilihan di tiap langkah dan hanya memutar ulang sumbernya. n terbaik adalah keseimbangan antara keterpaduan dan kebaruan.'],
        ['Keacakan yang membuat keluarannya buruk; aturan deterministik akan lebih baik.', 'Pilihan acak itulah yang menghasilkan kebaruan. Selalu memilih lanjutan yang paling sering akan berputar pada beberapa frasa yang sama; mengambil sampel sebanding dengan hitungan inilah yang membuat model merangkai ulang sumber dengan cara baru.'],
      ],
    },
    realWorld: {
      en: [
        'Predictive text on phone keyboards began as word-level n-gram models that suggest the most likely next word from the previous one or two.',
        'Speech recognition systems have long used n-gram language models to decide between words that sound alike, such as "their" and "there", from the surrounding context.',
        'Claude Shannon used letter and word n-gram statistics of English in 1948 to estimate how much information a letter of text carries, founding information theory.',
        'Markov chains far beyond text drive Google\'s original PageRank, models of weather state changes, and the way board games with dice are analysed.',
      ],
      id: [
        'Teks prediktif pada papan ketik ponsel bermula dari model n-gram tingkat kata yang menyarankan kata berikutnya yang paling mungkin dari satu atau dua kata sebelumnya.',
        'Sistem pengenalan ucapan sejak lama memakai model bahasa n-gram untuk memutuskan antara kata yang bunyinya serupa dari konteks di sekitarnya.',
        'Claude Shannon memakai statistik n-gram huruf dan kata bahasa Inggris pada 1948 untuk memperkirakan berapa banyak informasi yang dibawa satu huruf teks, dan dengan itu mendirikan teori informasi.',
        'Rantai Markov jauh di luar teks menggerakkan PageRank Google yang asli, model perubahan keadaan cuaca, dan cara menganalisis permainan papan berdadu.',
      ],
    },
    questions: {
      en: [
        { q: 'With n = 2 and the source "the cat sat on the mat", what can follow the context "e " (e then space), and with what probabilities? What always follows "th"?', a: 'The context "e " appears twice: in "the cat" it is followed by "c" and in "the mat" by "m", so each has probability 1/2. The context "th" appears twice and is followed by "e" both times, so "e" has probability 1.' },
        { q: 'A sonnet has about 600 characters. Explain why setting n = 8 makes the generator reproduce whole lines of the original.', a: 'There are at most about 600 different 8-character windows in the text, and with roughly 27 symbols there are 27^8 (hundreds of billions) possible ones, so almost every 8-gram in the sonnet is unique. A unique context has exactly one recorded continuation, so the chain has no choice and replays the source until it hits a repeated 8-gram, which is rare.' },
        { q: 'Name two things a large language model does differently from this character chain, and one thing it does the same.', a: 'The same: it predicts the next token from the preceding context and samples from a probability distribution. Different: its context is thousands of tokens rather than a handful of characters, and it computes probabilities with a trained neural network that generalises to contexts it has never seen, instead of looking up exact matches in a table built from one short text.' },
      ],
      id: [
        { q: 'Dengan n = 2 dan sumber "the cat sat on the mat", apa yang bisa mengikuti konteks "e " (e lalu spasi), dan dengan peluang berapa? Apa yang selalu mengikuti "th"?', a: 'Konteks "e " muncul dua kali: pada "the cat" diikuti "c" dan pada "the mat" diikuti "m", sehingga masing-masing berpeluang 1/2. Konteks "th" muncul dua kali dan keduanya diikuti "e", sehingga "e" berpeluang 1.' },
        { q: 'Sebuah soneta panjangnya sekitar 600 karakter. Jelaskan mengapa mengatur n = 8 membuat generator menyalin baris-baris utuh dari aslinya.', a: 'Paling banyak ada sekitar 600 jendela 8 karakter yang berbeda dalam teks, dan dengan kira-kira 27 simbol ada 27^8 (ratusan miliar) jendela yang mungkin, sehingga hampir setiap 8-gram dalam soneta itu unik. Konteks yang unik hanya punya satu lanjutan yang tercatat, sehingga rantai tidak punya pilihan dan memutar ulang sumber sampai menemui 8-gram yang berulang, yang jarang terjadi.' },
        { q: 'Sebutkan dua hal yang dilakukan model bahasa besar secara berbeda dari rantai karakter ini, dan satu hal yang sama.', a: 'Yang sama: ia memprediksi token berikutnya dari konteks sebelumnya dan mengambil sampel dari sebuah distribusi peluang. Yang berbeda: konteksnya ribuan token, bukan segelintir karakter, dan peluangnya dihitung oleh jaringan saraf terlatih yang menggeneralisasi ke konteks yang belum pernah dilihat, bukan mencari kecocokan persis dalam tabel yang dibangun dari satu teks pendek.' },
      ],
    },
  },
};
