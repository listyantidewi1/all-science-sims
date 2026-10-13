// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply plurality and ranked methods to the same ballots.',
      'See vote splitting and the spoiler effect.',
      'Recognize Arrow\'s impossibility intuitively.',
    ],
    id: [
      'Menerapkan pluralitas dan metode peringkat pada surat suara yang sama.',
      'Melihat pembagian suara dan efek spoiler.',
      'Mengenali ketidaksempurnaan teorema Arrow secara intuitif.',
    ],
  },
  tryThis: {
    en: [
      'Find a ballot profile where plurality and IRV pick different winners.',
      'Add a "spoiler" candidate similar to a frontrunner.',
      'Make a Condorcet winner — does each method find them?',
    ],
    id: [
      'Cari profil suara di mana pluralitas dan IRV memilih pemenang berbeda.',
      'Tambahkan kandidat "spoiler" mirip dengan favorit.',
      'Buat pemenang Condorcet — apakah tiap metode menemukannya?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'An election has to turn thousands of individual opinions into a single winner, and there is more than one reasonable way to do that. In the sim, five candidates named A to E stand for election. Voters come in blocks: each block has a number of voters and one full ranking of the five candidates from favourite to least favourite. You can change how many voters are in each block, shuffle a block\'s ranking, or load a preset. The same ballots are then counted four different ways, and quite often the four counts crown different winners. Nothing about the voters changed; only the rule for adding up their preferences did.',
        'Plurality looks only at first choices: whoever is ranked first on the most ballots wins, even if that is far short of half. Two-round runoff takes the two candidates with the most first choices and then gives every ballot to whichever of those two it ranks higher, so the winner is preferred by a majority in that final pair. Instant-runoff voting (IRV) repeats a smaller version of this: the candidate with the fewest current first choices is eliminated and their ballots move to the next remaining name, round after round, until someone holds more than half. The Borda count gives points for position, 4 for first place down to 0 for fifth, and the candidate with the most points wins; it rewards candidates that many voters rank highly even when few rank them first.',
        'The methods disagree because they weigh different parts of the ballot. Plurality suffers from vote splitting: when two similar candidates share a majority of first choices, a third candidate with a smaller but united following can win, and a newcomer who draws votes from the leader can hand the election to someone else, the spoiler effect. Runoff and IRV repair this by transferring votes, but IRV can eliminate a compromise candidate early because few voters rank them first. Borda can elect a candidate that nobody ranks first, which is either a flaw or a feature depending on what you want an election to do. A candidate who would beat every other candidate head-to-head is called a Condorcet winner; the "Condorcet winner" preset has one, and all four methods find it there, but none of these methods is guaranteed to in general. Kenneth Arrow proved in 1951 that no ranked-ballot method with three or more candidates can satisfy all of a short list of basic fairness conditions at once, so choosing a method means choosing which flaw to accept.',
        'The sim simplifies in a few ways. Every voter ranks all five candidates and does so sincerely; real voters often rank only some, and many vote strategically, for example abandoning a favourite who cannot win. Ties are not flagged: when two candidates have exactly the same count the sim quietly favours the one listed first, and both the default profile and the vote-splitting preset contain such exact ties, so change a block by one voter to see a clean result. When IRV ends by eliminating everyone else rather than by a majority, the panel shows the survivor with a count of 1 instead of their vote total. Finally, with only five candidates and a handful of ballot blocks, some real-world patterns, such as many parties or coalitions, cannot be reproduced.',
      ],
      id: [
        'Pemilihan harus mengubah ribuan pendapat perorangan menjadi satu pemenang, dan ada lebih dari satu cara yang masuk akal untuk melakukannya. Dalam simulasi, lima kandidat bernama A sampai E ikut pemilihan. Pemilih datang dalam blok: tiap blok punya jumlah pemilih dan satu urutan lengkap kelima kandidat dari yang paling disukai sampai paling tidak disukai. Kamu bisa mengubah jumlah pemilih tiap blok, mengacak urutan sebuah blok, atau memuat preset. Surat suara yang sama lalu dihitung dengan empat cara berbeda, dan cukup sering keempat hitungan itu memenangkan orang yang berbeda. Tidak ada yang berubah pada pemilihnya; yang berubah hanya aturan untuk menjumlahkan preferensi mereka.',
        'Pluralitas hanya melihat pilihan pertama: siapa pun yang berada di urutan pertama pada surat suara terbanyak menang, meskipun jauh dari separuh. Dua putaran mengambil dua kandidat dengan pilihan pertama terbanyak lalu memberikan setiap surat suara kepada salah satu dari keduanya yang diurutkan lebih tinggi, sehingga pemenangnya disukai mayoritas dalam pasangan akhir itu. Instant-runoff voting (IRV) mengulang versi kecil dari cara ini: kandidat dengan pilihan pertama paling sedikit saat itu dieliminasi dan surat suaranya berpindah ke nama berikutnya yang masih tersisa, putaran demi putaran, sampai seseorang memegang lebih dari separuh. Hitungan Borda memberi poin menurut posisi, 4 untuk peringkat pertama sampai 0 untuk kelima, dan kandidat dengan poin terbanyak menang; cara ini menghargai kandidat yang diurutkan tinggi oleh banyak pemilih meskipun sedikit yang menempatkannya di urutan pertama.',
        'Metode-metode itu berselisih karena menimbang bagian surat suara yang berbeda. Pluralitas menderita pembagian suara: ketika dua kandidat serupa berbagi mayoritas pilihan pertama, kandidat ketiga dengan pendukung yang lebih sedikit tetapi bersatu bisa menang, dan pendatang baru yang menarik suara dari pemimpin bisa menyerahkan pemilihan kepada orang lain, yaitu efek spoiler. Dua putaran dan IRV memperbaikinya dengan memindahkan suara, tetapi IRV bisa mengeliminasi kandidat kompromi lebih awal karena sedikit pemilih yang menempatkannya di urutan pertama. Borda bisa memenangkan kandidat yang tidak diurutkan pertama oleh siapa pun, yang bisa dianggap cacat atau justru keunggulan tergantung apa yang kamu inginkan dari sebuah pemilihan. Kandidat yang akan mengalahkan setiap kandidat lain dalam duel satu lawan satu disebut pemenang Condorcet; preset "Condorcet winner" memilikinya, dan keempat metode menemukannya di sana, tetapi tidak satu pun metode ini dijamin menemukannya secara umum. Kenneth Arrow membuktikan pada 1951 bahwa tidak ada metode berbasis peringkat dengan tiga kandidat atau lebih yang bisa memenuhi sekaligus sederet pendek syarat keadilan dasar, jadi memilih metode berarti memilih cacat mana yang mau diterima.',
        'Simulasi menyederhanakan beberapa hal. Setiap pemilih mengurutkan kelima kandidat dan melakukannya dengan jujur; pemilih sungguhan sering hanya mengurutkan sebagian, dan banyak yang memilih secara strategis, misalnya meninggalkan favorit yang tidak mungkin menang. Hasil seri tidak ditandai: ketika dua kandidat punya hitungan yang tepat sama, simulasi diam-diam mengunggulkan yang terdaftar lebih dulu, dan baik profil bawaan maupun preset pembagian suara memuat seri persis seperti itu, jadi ubah satu blok sebesar satu pemilih untuk melihat hasil yang bersih. Ketika IRV berakhir karena semua yang lain tereliminasi, bukan karena mayoritas, panelnya menampilkan kandidat yang bertahan dengan hitungan 1, bukan total suaranya. Terakhir, dengan hanya lima kandidat dan segelintir blok surat suara, beberapa pola dunia nyata, seperti banyak partai atau koalisi, tidak bisa ditiru.',
      ],
    },
    figure: {
      caption: {
        en: 'One hundred voters, three ballot types, four counts. Plurality elects A on first choices alone, although 60 of the 100 voters rank A last. Runoff, IRV and Borda all elect B, who also beats A and C head-to-head.',
        id: 'Seratus pemilih, tiga jenis surat suara, empat hitungan. Pluralitas memenangkan A hanya dari pilihan pertama, padahal 60 dari 100 pemilih menempatkan A di urutan terakhir. Dua putaran, IRV, dan Borda semuanya memenangkan B, yang juga mengalahkan A dan C satu lawan satu.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const col = { A: '#ef4444', B: '#3b82f6', C: '#10b981' };
        const rank = (y, n, order) => `<text x="20" y="${y}" class="s">${n} ${L('voters', 'pemilih')}:</text>` + order.map((c, i) => `<text x="${86 + i * 34}" y="${y}" fill="${col[c]}" style="font-weight:700">${c}</text>${i < 2 ? `<text x="${104 + i * 34}" y="${y}" class="s">&gt;</text>` : ''}`).join('');
        const row = (y, name, vals, max, win) => `<text x="20" y="${y + 10}" style="font-weight:600">${name}</text>` + ['A', 'B', 'C'].map((c, i) => `<rect x="150" y="${y + i * 8 - 2}" width="${(vals[i] / max) * 150}" height="6" rx="1" fill="${col[c]}" opacity="${c === win ? 1 : 0.45}"/><text x="${306}" y="${y + i * 8 + 4}" class="s" fill="${col[c]}">${c} ${vals[i]}${c === win ? ' ★' : ''}</text>`).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Four voting methods counting the same ballots', 'Empat metode pemungutan suara menghitung surat suara yang sama')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px;opacity:.85}</style>
  <text x="20" y="16" style="font-weight:600">${L('Ballots (100 voters)', 'Surat suara (100 pemilih)')}</text>
  ${rank(32, 40, ['A', 'B', 'C'])}
  ${rank(46, 35, ['B', 'C', 'A'])}
  ${rank(60, 25, ['C', 'B', 'A'])}
  <line x1="20" y1="70" x2="340" y2="70" stroke="currentColor" stroke-width="1" opacity=".3"/>
  ${row(82, L('Plurality', 'Pluralitas'), [40, 35, 25], 135, 'A')}
  ${row(114, L('Runoff A vs B', 'Dua putaran A vs B'), [40, 60, 0], 135, 'B')}
  ${row(146, 'IRV', [40, 60, 0], 135, 'B')}
  ${row(178, 'Borda (2, 1, 0)', [80, 135, 85], 135, 'B')}
  <text x="20" y="214" class="s">${L('Runoff and IRV: C is dropped and C\'s 25 ballots move to B.', 'Dua putaran dan IRV: C gugur dan 25 suara C berpindah ke B.')}</text>
  <text x="20" y="228" class="s">${L('Head-to-head: B beats A 60–40 and beats C 75–25.', 'Satu lawan satu: B mengalahkan A 60–40 dan C 75–25.')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The same set of ballots can produce different winners under different counting rules; the rule is part of the result.',
        'Plurality counts only first choices, so a candidate opposed by a majority can win when the majority splits its votes.',
        'Runoff and instant-runoff methods transfer votes from eliminated candidates, which removes most spoiler effects but can drop a compromise candidate early.',
        'The Borda count rewards broad acceptability and can elect a candidate with no first-choice votes at all.',
        'Arrow\'s theorem shows that no ranked method can satisfy every reasonable fairness condition at once, so every method has a known weakness.',
      ],
      id: [
        'Kumpulan surat suara yang sama bisa menghasilkan pemenang berbeda dengan aturan hitung berbeda; aturannya adalah bagian dari hasil.',
        'Pluralitas hanya menghitung pilihan pertama, sehingga kandidat yang ditolak mayoritas bisa menang ketika mayoritas memecah suaranya.',
        'Metode dua putaran dan instant-runoff memindahkan suara dari kandidat yang tereliminasi, yang menghilangkan sebagian besar efek spoiler tetapi bisa menggugurkan kandidat kompromi lebih awal.',
        'Hitungan Borda menghargai penerimaan yang luas dan bisa memenangkan kandidat yang sama sekali tidak punya suara pilihan pertama.',
        'Teorema Arrow menunjukkan tidak ada metode peringkat yang bisa memenuhi semua syarat keadilan yang wajar sekaligus, sehingga setiap metode punya kelemahan yang diketahui.',
      ],
    },
    vocabulary: {
      en: [
        ['Ranked ballot', 'A ballot that lists the candidates in order of preference instead of marking just one.'],
        ['Plurality', 'The candidate with the most first-choice votes wins, whether or not that is more than half.'],
        ['Majority', 'More than half of the votes; with three or more candidates, often no one has a majority of first choices.'],
        ['Two-round runoff', 'The top two by first choices face each other, and every ballot counts for the one it ranks higher.'],
        ['Instant-runoff voting (IRV)', 'The weakest candidate is eliminated and their ballots transferred, repeatedly, until someone has a majority.'],
        ['Borda count', 'Points are awarded by position on each ballot (here 4, 3, 2, 1, 0) and the highest total wins.'],
        ['Spoiler / vote splitting', 'A candidate who cannot win but draws first choices away from a similar candidate, changing the outcome.'],
        ['Condorcet winner', 'A candidate who would beat every other candidate in a one-on-one contest; such a candidate does not always exist.'],
      ],
      id: [
        ['Surat suara peringkat', 'Surat suara yang mengurutkan kandidat menurut preferensi, bukan hanya menandai satu nama.'],
        ['Pluralitas', 'Kandidat dengan suara pilihan pertama terbanyak menang, terlepas apakah itu lebih dari separuh.'],
        ['Mayoritas', 'Lebih dari separuh suara; dengan tiga kandidat atau lebih, sering tidak ada yang meraih mayoritas pilihan pertama.'],
        ['Dua putaran', 'Dua teratas menurut pilihan pertama saling berhadapan, dan setiap surat suara dihitung untuk yang diurutkan lebih tinggi.'],
        ['Instant-runoff voting (IRV)', 'Kandidat terlemah dieliminasi dan suaranya dipindahkan, berulang-ulang, sampai seseorang meraih mayoritas.'],
        ['Hitungan Borda', 'Poin diberikan menurut posisi pada tiap surat suara (di sini 4, 3, 2, 1, 0) dan total tertinggi menang.'],
        ['Spoiler / pembagian suara', 'Kandidat yang tidak bisa menang tetapi menarik pilihan pertama dari kandidat yang serupa, sehingga mengubah hasil.'],
        ['Pemenang Condorcet', 'Kandidat yang akan mengalahkan setiap kandidat lain dalam duel satu lawan satu; kandidat seperti ini tidak selalu ada.'],
      ],
    },
    misconceptions: {
      en: [
        ['The candidate with the most first-choice votes is clearly the people\'s choice.', 'Not when the rest of the voters agree on someone else. In the figure A has the most first choices, yet 60 of 100 voters rank A last and prefer B. Plurality ignores everything below the first line of the ballot.'],
        ['Any fair counting method will give the same winner.', 'The sim shows four reasonable methods picking different winners from identical ballots. Arrow\'s theorem explains why: no ranked method can satisfy all the fairness conditions we would like, so methods must differ somewhere.'],
        ['Instant-runoff voting always elects the candidate most voters would prefer head-to-head.', 'It can fail. A compromise candidate ranked second by almost everyone but first by few is eliminated in an early round, even though they would beat every rival one-on-one.'],
        ['A winner under plurality has the support of a majority.', 'With three or more candidates the plurality winner frequently has well under 50% of first choices; 40%, 35%, 25% is a typical split in which nobody holds a majority.'],
      ],
      id: [
        ['Kandidat dengan suara pilihan pertama terbanyak jelas pilihan rakyat.', 'Tidak jika pemilih lainnya sepakat pada orang lain. Pada gambar, A punya pilihan pertama terbanyak, tetapi 60 dari 100 pemilih menempatkan A di urutan terakhir dan lebih menyukai B. Pluralitas mengabaikan semua yang ada di bawah baris pertama surat suara.'],
        ['Metode hitung yang adil mana pun akan memberi pemenang yang sama.', 'Simulasi memperlihatkan empat metode yang masuk akal memilih pemenang berbeda dari surat suara yang identik. Teorema Arrow menjelaskan sebabnya: tidak ada metode peringkat yang bisa memenuhi semua syarat keadilan yang kita inginkan, jadi metode-metode itu pasti berbeda di suatu tempat.'],
        ['Instant-runoff voting selalu memenangkan kandidat yang paling disukai pemilih dalam duel satu lawan satu.', 'Bisa gagal. Kandidat kompromi yang diurutkan kedua oleh hampir semua orang tetapi pertama oleh sedikit orang tereliminasi di putaran awal, padahal ia akan mengalahkan setiap pesaing satu lawan satu.'],
        ['Pemenang pluralitas didukung mayoritas.', 'Dengan tiga kandidat atau lebih, pemenang pluralitas sering punya jauh di bawah 50% pilihan pertama; 40%, 35%, 25% adalah pembagian yang lazim ketika tidak ada yang memegang mayoritas.'],
      ],
    },
    realWorld: {
      en: [
        'Indonesia and France elect their presidents with a two-round system: if no candidate wins more than half in the first round, the top two meet in a runoff.',
        'Australia has used instant-runoff voting, which it calls preferential voting, for its House of Representatives since 1918.',
        'The United Kingdom, the United States and India elect most legislators by plurality in single-member districts, where vote splitting between similar parties is a constant concern.',
        'The Eurovision Song Contest and many sports awards use positional point systems, close relatives of the Borda count.',
      ],
      id: [
        'Indonesia dan Prancis memilih presiden dengan sistem dua putaran: jika tidak ada kandidat yang meraih lebih dari separuh suara di putaran pertama, dua teratas bertemu di putaran kedua.',
        'Australia memakai instant-runoff voting, yang mereka sebut preferential voting, untuk Dewan Perwakilannya sejak 1918.',
        'Britania Raya, Amerika Serikat, dan India memilih sebagian besar anggota legislatifnya dengan pluralitas di daerah pemilihan satu kursi, tempat pembagian suara antara partai yang serupa menjadi kekhawatiran tetap.',
        'Kontes Lagu Eurovision dan banyak penghargaan olahraga memakai sistem poin menurut posisi, kerabat dekat hitungan Borda.',
      ],
    },
    questions: {
      en: [
        { q: 'Three candidates, 100 voters: 45 rank A > B > C, 30 rank B > C > A and 25 rank C > B > A. Who wins under plurality, and who wins a two-round runoff?', a: 'Plurality: A has 45 first choices, B 30, C 25, so A wins without a majority. Runoff: the top two are A and B; the 25 C-voters rank B above A, so B gets 30 + 25 = 55 against A\'s 45 and B wins. The same ballots, a different winner.' },
        { q: 'Why can adding a new candidate who is similar to the current leader change who wins under plurality, and how do runoff methods avoid this?', a: 'The newcomer takes first-choice votes from the leader, splitting that group between two names while their opponents\' votes stay united, so the opponent can finish first with no change in anyone\'s true preferences: the spoiler effect. Runoff and IRV eliminate the weaker of the two similar candidates and transfer those ballots to the stronger one, so the group\'s combined support is counted together.' },
        { q: 'Using the same 100 ballots as question 1 with Borda points 2, 1, 0, work out the Borda totals. Then explain how a candidate could win a Borda count with zero first-choice votes.', a: 'A: 45 × 2 = 90. B: 45 × 1 + 30 × 2 + 25 × 1 = 130. C: 30 × 1 + 25 × 2 = 80. B wins. A candidate ranked second on every ballot earns 1 point from everyone, which can beat rivals whose first-place points come from only part of the electorate; for example with 50 ballots A > B > C and 50 ballots C > B > A, B ties A and C on 100 points each, and a few more B-first ballots would make B the outright winner.' },
      ],
      id: [
        { q: 'Tiga kandidat, 100 pemilih: 45 mengurutkan A > B > C, 30 mengurutkan B > C > A, dan 25 mengurutkan C > B > A. Siapa yang menang dengan pluralitas, dan siapa yang menang dengan dua putaran?', a: 'Pluralitas: A punya 45 pilihan pertama, B 30, C 25, jadi A menang tanpa mayoritas. Dua putaran: dua teratas adalah A dan B; 25 pemilih C menempatkan B di atas A, sehingga B mendapat 30 + 25 = 55 melawan 45 suara A dan B menang. Surat suara yang sama, pemenang yang berbeda.' },
        { q: 'Mengapa menambahkan kandidat baru yang serupa dengan pemimpin saat ini bisa mengubah pemenang pluralitas, dan bagaimana metode putaran menghindarinya?', a: 'Pendatang baru mengambil suara pilihan pertama dari pemimpin, memecah kelompok itu di antara dua nama sementara suara lawan mereka tetap bersatu, sehingga lawan bisa finis pertama tanpa ada perubahan pada preferensi sejati siapa pun: efek spoiler. Dua putaran dan IRV mengeliminasi yang lebih lemah dari dua kandidat serupa itu dan memindahkan suaranya ke yang lebih kuat, sehingga dukungan gabungan kelompok itu dihitung bersama.' },
        { q: 'Dengan 100 surat suara yang sama seperti soal 1 dan poin Borda 2, 1, 0, hitung total Borda-nya. Lalu jelaskan bagaimana seorang kandidat bisa memenangkan hitungan Borda tanpa satu pun suara pilihan pertama.', a: 'A: 45 × 2 = 90. B: 45 × 1 + 30 × 2 + 25 × 1 = 130. C: 30 × 1 + 25 × 2 = 80. B menang. Kandidat yang diurutkan kedua pada setiap surat suara mendapat 1 poin dari semua orang, yang bisa mengalahkan pesaing yang poin peringkat pertamanya hanya datang dari sebagian pemilih; misalnya dengan 50 surat suara A > B > C dan 50 surat suara C > B > A, B seri dengan A dan C pada 100 poin masing-masing, dan sedikit tambahan surat suara yang menempatkan B pertama akan membuat B menang mutlak.' },
      ],
    },
  },
};
