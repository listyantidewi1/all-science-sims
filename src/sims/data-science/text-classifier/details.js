// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Turn a message into a bag of words and compute smoothed word probabilities P(word | spam) and P(word | ham) from a labelled corpus.',
      'Apply Bayes\' rule with the naive independence assumption to combine the prior and the word evidence into a posterior P(spam | message).',
      'Explain how adding, removing or mislabelling training messages changes the classifier, and why data quality matters more than the algorithm.',
    ],
    id: [
      'Mengubah pesan menjadi kantong kata dan menghitung peluang kata yang dihaluskan P(kata | spam) dan P(kata | bukan spam) dari korpus berlabel.',
      'Menerapkan aturan Bayes dengan asumsi kebebasan naif untuk menggabungkan prior dan bukti kata menjadi posterior P(spam | pesan).',
      'Menjelaskan bagaimana menambah, menghapus atau salah melabeli pesan latihan mengubah pengklasifikasi, dan mengapa kualitas data lebih penting daripada algoritmanya.',
    ],
  },
  tryThis: {
    en: [
      'Type a single word such as "free", then "today", then a word that is in neither class. Compare the three P(spam) readings and explain each.',
      'Type "free lunch tomorrow". Which words pull towards spam, which towards ham, and who wins?',
      'Add "free pizza at the library today" as HAM three times. Type "free" again. How much did one well-chosen training message change the filter?',
      'Set Laplace α to 0.1 and then to 2. Which words are affected most, the common ones or the rare ones?',
    ],
    id: [
      'Ketik satu kata seperti "gratis", lalu "hari", lalu kata yang tidak ada di kedua kelas. Bandingkan ketiga nilai P(spam) dan jelaskan masing-masing.',
      'Ketik "gratis makan siang besok". Kata mana yang menarik ke spam, mana ke bukan spam, dan siapa yang menang?',
      'Tambahkan "pizza gratis di perpustakaan hari ini" sebagai BUKAN SPAM tiga kali. Ketik "gratis" lagi. Seberapa besar satu pesan latihan yang tepat mengubah penyaringnya?',
      'Atur Laplace α ke 0,1 lalu ke 2. Kata mana yang paling terpengaruh, yang umum atau yang jarang?',
    ],
  },

  learn: {
    background: {
      en: [
        'A spam filter is a text classifier: given a message, decide spam or ham (normal mail). Naive Bayes, the classic approach from the 1990s, starts by throwing away word order and keeping only word counts, the bag of words. Training is nothing more than counting: for every word w, count how many times it appears in the spam messages and in the ham messages. In the English corpus of 20 messages there are 75 spam word tokens, 71 ham tokens and a vocabulary of V = 102 different words; "free" appears 5 times in spam and never in ham.',
        'Bayes\' rule says P(spam | message) ∝ P(spam) × P(message | spam). The prior P(spam) is just the fraction of training messages that are spam (10/20 = 0.5 here). The "naive" step assumes the words are independent given the class, so P(message | spam) = Π P(wᵢ | spam), a product over the words. Each word probability is estimated as P(w | c) = (count(w, c) + α) / (Nc + α·V), where Nc is the total number of word tokens in class c. The α term is Laplace smoothing: without it a word never seen in spam would have probability zero and a single word could veto the whole product. With α = 1, P(free | spam) = (5 + 1)/(75 + 102) ≈ 0.034 and P(free | ham) = (0 + 1)/(71 + 102) ≈ 0.0058, a ratio of about 5.9 to 1 in favour of spam.',
        'Multiplying many small probabilities underflows, so the sim adds logarithms instead. Each word contributes log P(w | spam) − log P(w | ham), a positive bar if the word is spam evidence and a negative bar if it is ham evidence. Summing the bars with the log prior and converting back gives the posterior P(spam | message) = 1 / (1 + e^(log P(ham) − log P(spam))). For "free lunch", "free" contributes +1.77 and "lunch" −0.72, and the posterior is about 0.74: the filter leans spam but is not sure. A word in neither class contributes almost nothing, because smoothing gives it nearly the same probability in both.',
        'Everything the filter knows comes from the 20 training messages, so the data decides its behaviour. Add a few ham messages containing "free" and the word stops being spam evidence; mislabel a ham message as spam and innocent words such as "lunch" become suspicious. Real filters train on millions of messages and keep learning from users who press "report spam", and spammers respond by misspelling words ("fr33") to escape the counts. The independence assumption is clearly false ("click" and "here" travel together), yet Naive Bayes works surprisingly well, because getting the ranking right matters more than getting the exact probabilities right.',
      ],
      id: [
        'Penyaring spam adalah pengklasifikasi teks: diberi sebuah pesan, putuskan spam atau bukan spam (pesan biasa). Naive Bayes, pendekatan klasik dari tahun 1990-an, mulai dengan membuang urutan kata dan hanya menyimpan hitungan kata, yaitu kantong kata (bag of words). Pelatihannya tidak lebih dari menghitung: untuk setiap kata w, hitung berapa kali ia muncul di pesan spam dan di pesan biasa. Pada korpus bahasa Inggris berisi 20 pesan terdapat 75 token kata spam, 71 token bukan spam dan kosakata V = 102 kata berbeda; "free" muncul 5 kali di spam dan tidak pernah di pesan biasa.',
        'Aturan Bayes menyatakan P(spam | pesan) ∝ P(spam) × P(pesan | spam). Prior P(spam) hanyalah pecahan pesan latihan yang berupa spam (10/20 = 0,5 di sini). Langkah "naif"-nya mengasumsikan kata-kata saling bebas jika kelasnya diketahui, sehingga P(pesan | spam) = Π P(wᵢ | spam), hasil kali atas kata-katanya. Setiap peluang kata ditaksir sebagai P(w | c) = (hitung(w, c) + α) / (Nc + α·V), dengan Nc jumlah total token kata di kelas c. Suku α adalah penghalusan Laplace: tanpanya, kata yang belum pernah terlihat di spam berpeluang nol dan satu kata saja bisa memveto seluruh hasil kali. Dengan α = 1, P(free | spam) = (5 + 1)/(75 + 102) ≈ 0,034 dan P(free | bukan) = (0 + 1)/(71 + 102) ≈ 0,0058, rasio sekitar 5,9 banding 1 mendukung spam.',
        'Mengalikan banyak peluang kecil menyebabkan underflow, maka simulasi menjumlahkan logaritma. Setiap kata menyumbang log P(w | spam) − log P(w | bukan), batang positif jika kata itu bukti spam dan batang negatif jika bukti bukan spam. Menjumlahkan batang-batang itu dengan log prior lalu mengubahnya kembali memberi posterior P(spam | pesan) = 1 / (1 + e^(log P(bukan) − log P(spam))). Untuk "free lunch", "free" menyumbang +1,77 dan "lunch" −0,72, dan posteriornya sekitar 0,74: penyaring condong ke spam tetapi tidak yakin. Kata yang tidak ada di kedua kelas hampir tidak menyumbang apa pun, karena penghalusan memberinya peluang yang hampir sama di keduanya.',
        'Semua yang diketahui penyaring berasal dari 20 pesan latihan, sehingga datalah yang menentukan perilakunya. Tambahkan beberapa pesan biasa yang mengandung "gratis" dan kata itu berhenti menjadi bukti spam; salah labeli pesan biasa sebagai spam dan kata-kata polos seperti "makan" menjadi mencurigakan. Penyaring sungguhan dilatih dengan jutaan pesan dan terus belajar dari pengguna yang menekan "laporkan spam", dan para pengirim spam membalas dengan salah mengeja kata ("gr4tis") untuk lolos dari hitungan. Asumsi kebebasan jelas keliru ("klik" dan "di sini" selalu berpasangan), namun Naive Bayes bekerja sangat baik, karena urutan yang benar lebih penting daripada peluang yang persis benar.',
      ],
    },
    figure: {
      caption: {
        en: 'The pipeline for "free lunch": tokenise, look up smoothed counts, add log-odds bars (spam evidence to the right, ham evidence to the left) to the prior, and read off the posterior.',
        id: 'Alur untuk "free lunch": pecah menjadi token, cari hitungan yang dihaluskan, jumlahkan batang log-odds (bukti spam ke kanan, bukti bukan spam ke kiri) dengan prior, lalu baca posteriornya.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const bar = (y, label, v, counts) => {
          const cx = 200, scale = 50;
          const w = Math.abs(v) * scale;
          const x = v >= 0 ? cx : cx - w;
          const col = v >= 0 ? '#ef4444' : '#22c55e';
          return `<text x="20" y="${y + 4}">${label}</text><text x="100" y="${y + 4}" opacity=".7">${counts}</text>` +
            `<rect x="${x.toFixed(1)}" y="${y - 8}" width="${Math.max(2, w).toFixed(1)}" height="16" fill="${col}" rx="2"/>` +
            `<text x="${(v >= 0 ? cx + w + 6 : cx - w - 6).toFixed(1)}" y="${y + 4}" text-anchor="${v >= 0 ? 'start' : 'end'}">${v >= 0 ? '+' : ''}${v.toFixed(2)}</text>`;
        };
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Naive Bayes evidence bars for the message free lunch', 'Batang bukti Naive Bayes untuk pesan free lunch')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}</style>
  <text x="20" y="22" style="font:bold 12px system-ui,sans-serif">${L('message: "free lunch"', 'pesan: "free lunch"')}</text>
  <text x="20" y="40" opacity=".7">${L('word', 'kata')}</text><text x="100" y="40" opacity=".7">spam : ham</text><text x="200" y="40" text-anchor="middle" opacity=".7">log P(w|spam) − log P(w|ham)</text>
  <line x1="200" y1="46" x2="200" y2="150" stroke="currentColor" stroke-width="1" opacity=".5"/>
  ${bar(62, L('prior', 'prior'), 0, '10 : 10')}
  ${bar(90, 'free', 1.77, '5 : 0')}
  ${bar(118, 'lunch', -0.72, '0 : 1')}
  <line x1="20" y1="150" x2="340" y2="150" stroke="currentColor" stroke-width="1" opacity=".4"/>
  ${bar(166, L('sum', 'jumlah'), 1.05, '')}
  <text x="20" y="200">${L('posterior', 'posterior')} P(spam) = 1 / (1 + e^(−1.05)) ≈ 0.74</text>
  <rect x="20" y="212" width="320" height="14" fill="#22c55e" rx="3"/>
  <rect x="20" y="212" width="236.8" height="14" fill="#ef4444" rx="3"/>
  <line x1="180" y1="208" x2="180" y2="230" stroke="currentColor" stroke-width="1.5"/>
  <text x="184" y="238" opacity=".7">50%</text>
  <text x="20" y="238" fill="#ef4444">${L('spam 74%', 'spam 74%')}</text>
  <text x="340" y="238" text-anchor="end" fill="#22c55e">${L('ham 26%', 'bukan 26%')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Bag of words: a message is reduced to which words appear and how often; order is ignored.',
        'Training a Naive Bayes filter is counting: count(word, spam) and count(word, ham).',
        'Laplace smoothing adds α to every count so that an unseen word never gives a probability of zero.',
        'Bayes\' rule combines the prior P(spam) with the product of word likelihoods; in log form the evidence simply adds up.',
        'The posterior P(spam | message) is a probability, and 50% is the usual decision threshold.',
        'The classifier is only as good as its labelled data: adding, removing or mislabelling messages changes every probability.',
      ],
      id: [
        'Kantong kata: pesan direduksi menjadi kata apa yang muncul dan seberapa sering; urutan diabaikan.',
        'Melatih penyaring Naive Bayes adalah menghitung: hitung(kata, spam) dan hitung(kata, bukan spam).',
        'Penghalusan Laplace menambahkan α ke setiap hitungan sehingga kata yang belum pernah terlihat tidak pernah berpeluang nol.',
        'Aturan Bayes menggabungkan prior P(spam) dengan hasil kali likelihood kata; dalam bentuk log, buktinya cukup dijumlahkan.',
        'Posterior P(spam | pesan) adalah peluang, dan 50% adalah ambang keputusan yang lazim.',
        'Pengklasifikasi hanya sebaik data berlabelnya: menambah, menghapus atau salah melabeli pesan mengubah setiap peluang.',
      ],
    },
    vocabulary: {
      en: [
        ['Corpus', 'The collection of labelled training messages.'],
        ['Token', 'One word after lower-casing and removing punctuation.'],
        ['Bag of words', 'A representation of text as word counts, ignoring order.'],
        ['Prior P(spam)', 'The probability of spam before reading any words; the fraction of training messages that are spam.'],
        ['Likelihood P(w | spam)', 'The probability that a word drawn from a spam message is w, estimated from smoothed counts.'],
        ['Laplace smoothing (α)', 'Adding a pseudo-count α to every word count so no probability is zero.'],
        ['Posterior P(spam | message)', 'The updated probability of spam after combining the prior with the word evidence.'],
        ['Log-odds', 'log(P(spam)/P(ham)); positive favours spam, negative favours ham, and contributions add.'],
      ],
      id: [
        ['Korpus', 'Kumpulan pesan latihan berlabel.'],
        ['Token', 'Satu kata setelah diubah ke huruf kecil dan tanda baca dibuang.'],
        ['Kantong kata', 'Representasi teks sebagai hitungan kata, mengabaikan urutan.'],
        ['Prior P(spam)', 'Peluang spam sebelum membaca kata apa pun; pecahan pesan latihan yang berupa spam.'],
        ['Likelihood P(w | spam)', 'Peluang bahwa sebuah kata yang diambil dari pesan spam adalah w, ditaksir dari hitungan yang dihaluskan.'],
        ['Penghalusan Laplace (α)', 'Menambahkan hitungan semu α ke setiap hitungan kata sehingga tidak ada peluang nol.'],
        ['Posterior P(spam | pesan)', 'Peluang spam yang diperbarui setelah menggabungkan prior dengan bukti kata.'],
        ['Log-odds', 'log(P(spam)/P(bukan)); positif mendukung spam, negatif mendukung bukan spam, dan sumbangannya dijumlahkan.'],
      ],
    },
    misconceptions: {
      en: [
        ['The filter understands what the message means.', 'It only counts words. "You won nothing, this is not a prize" scores as spam because "won" and "prize" are spam words; meaning and negation are invisible to a bag of words.'],
        ['A word that never appeared in spam proves the message is ham.', 'Without smoothing that single word would force P(spam) to exactly zero, which is absurd for a 20-message corpus. Laplace smoothing turns "never seen" into "rare", as it should.'],
        ['More training data always helps.', 'Only if it is labelled correctly and resembles the messages the filter will see. Adding mislabelled messages, or only spam about one topic, makes the filter worse.'],
      ],
      id: [
        ['Penyaring memahami makna pesan.', 'Ia hanya menghitung kata. "Anda tidak memenangkan apa pun, ini bukan hadiah" dinilai spam karena "memenangkan" dan "hadiah" adalah kata spam; makna dan negasi tidak terlihat oleh kantong kata.'],
        ['Kata yang tidak pernah muncul di spam membuktikan pesannya bukan spam.', 'Tanpa penghalusan, satu kata itu memaksa P(spam) tepat nol, yang mustahil untuk korpus 20 pesan. Penghalusan Laplace mengubah "belum pernah terlihat" menjadi "jarang", sebagaimana mestinya.'],
        ['Lebih banyak data latih selalu membantu.', 'Hanya jika labelnya benar dan menyerupai pesan yang akan dilihat penyaring. Menambahkan pesan yang salah label, atau hanya spam tentang satu topik, membuat penyaringnya memburuk.'],
      ],
    },
    realWorld: {
      en: [
        'Paul Graham\'s 2002 essay "A Plan for Spam" popularised Bayesian filtering; it is still a component of many mail systems.',
        'The same counting method sorts news articles by topic, detects the language of a web page and flags toxic comments.',
        'Sentiment analysis of product reviews ("positive" or "negative") is Naive Bayes with a different pair of labels.',
        'Spammers deliberately misspell trigger words and pad messages with ordinary text to shift the word counts in their favour, an early example of an adversarial attack on machine learning.',
      ],
      id: [
        'Esai Paul Graham tahun 2002 "A Plan for Spam" mempopulerkan penyaringan Bayes; metode ini masih menjadi komponen banyak sistem surel.',
        'Metode penghitungan yang sama memilah artikel berita menurut topik, mendeteksi bahasa sebuah halaman web dan menandai komentar beracun.',
        'Analisis sentimen ulasan produk ("positif" atau "negatif") adalah Naive Bayes dengan sepasang label yang berbeda.',
        'Pengirim spam sengaja salah mengeja kata pemicu dan menambahkan teks biasa untuk menggeser hitungan kata demi keuntungan mereka, contoh awal serangan adversarial pada machine learning.',
      ],
    },
    questions: {
      en: [
        { q: 'With α = 1, 75 spam tokens, 71 ham tokens and V = 102, "now" appears 5 times in spam and 0 times in ham. Compute P(now | spam), P(now | ham) and the log-odds contribution.', a: 'P(now | spam) = (5 + 1)/(75 + 102) = 6/177 ≈ 0.0339. P(now | ham) = (0 + 1)/(71 + 102) = 1/173 ≈ 0.0058. Contribution = ln(0.0339/0.0058) ≈ ln 5.86 ≈ +1.77, strong spam evidence.' },
        { q: 'A message consists of the single word "today", which appears 3 times in spam and 2 times in ham. Why is P(spam | today) only about 57% rather than 60%?', a: 'Smoothing and the different class sizes matter: P(today | spam) = 4/177 ≈ 0.0226, P(today | ham) = 3/173 ≈ 0.0173, ratio ≈ 1.30, log-odds ≈ +0.26, posterior = 1/(1 + e^(−0.26)) ≈ 0.57. The raw 3:2 ratio would give 0.60, but smoothing pulls rare counts towards equality.' },
        { q: 'You add the ham message "free pizza at the library today" three times. Explain what happens to the contribution of "free".', a: 'count(free, ham) rises from 0 to 3 and the ham token total grows, so P(free | ham) rises from about 0.0058 to roughly 0.021 while P(free | spam) stays 0.034. The log-odds falls from +1.77 to about +0.5: "free" is now only weak spam evidence, because the data taught the filter that friends also say "free".' },
      ],
      id: [
        { q: 'Dengan α = 1, 75 token spam, 71 token bukan spam dan V = 102, kata "now" muncul 5 kali di spam dan 0 kali di bukan spam. Hitung P(now | spam), P(now | bukan) dan sumbangan log-odds-nya.', a: 'P(now | spam) = (5 + 1)/(75 + 102) = 6/177 ≈ 0,0339. P(now | bukan) = (0 + 1)/(71 + 102) = 1/173 ≈ 0,0058. Sumbangan = ln(0,0339/0,0058) ≈ ln 5,86 ≈ +1,77, bukti spam yang kuat.' },
        { q: 'Sebuah pesan hanya berisi kata "today", yang muncul 3 kali di spam dan 2 kali di bukan spam. Mengapa P(spam | today) hanya sekitar 57%, bukan 60%?', a: 'Penghalusan dan ukuran kelas yang berbeda berperan: P(today | spam) = 4/177 ≈ 0,0226, P(today | bukan) = 3/173 ≈ 0,0173, rasio ≈ 1,30, log-odds ≈ +0,26, posterior = 1/(1 + e^(−0,26)) ≈ 0,57. Rasio mentah 3:2 akan memberi 0,60, tetapi penghalusan menarik hitungan yang jarang menuju kesetaraan.' },
        { q: 'Kamu menambahkan pesan bukan spam "free pizza at the library today" tiga kali. Jelaskan apa yang terjadi pada sumbangan "free".', a: 'hitung(free, bukan) naik dari 0 ke 3 dan total token bukan spam bertambah, sehingga P(free | bukan) naik dari sekitar 0,0058 ke kira-kira 0,021 sementara P(free | spam) tetap 0,034. Log-odds turun dari +1,77 ke sekitar +0,5: "free" kini hanya bukti spam yang lemah, karena data mengajari penyaring bahwa teman juga berkata "free".' },
      ],
    },
  },
};
