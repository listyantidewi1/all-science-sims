// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Understand iterated Prisoner\'s Dilemma payoffs (CC=3, CD=0, DC=5, DD=1).',
      'See why nice + retaliating + forgiving + clear strategies dominate.',
      'Watch how strategies behave against each other in the round-by-round trace.',
    ],
    id: [
      'Memahami payoff Dilema Tahanan iteratif (KK=3, KH=0, HK=5, HH=1).',
      'Memahami mengapa strategi yang baik + membalas + memaafkan + jelas mendominasi.',
      'Mengamati bagaimana strategi berperilaku terhadap satu sama lain.',
    ],
  },
  tryThis: {
    en: [
      'Run the tournament — TfT wins or ties.',
      'Two TfT play each other — perpetual cooperation.',
      'Always-Defect vs TfT — TfT cooperates once, defects forever after.',
    ],
    id: [
      'Jalankan turnamen — TfT menang atau imbang.',
      'Dua TfT bermain — kerja sama abadi.',
      'Selalu-Khianat vs TfT — TfT kerja sama sekali, lalu khianat selamanya.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'The Prisoner\'s Dilemma is a game for two players who each choose, at the same time, to cooperate or to defect. If both cooperate, each gets 3 points. If one defects while the other cooperates, the defector gets 5 and the cooperator 0. If both defect, each gets 1. Whatever the other player does, you personally score more by defecting (5 beats 3, and 1 beats 0), yet if both players follow that logic they end up with 1 each instead of 3 each. Individual self-interest leads both to a worse outcome: that is the dilemma.',
        'Things change when the same two players meet again and again, because today\'s choice can be answered tomorrow. In this iterated version a strategy is a rule for choosing based on the history so far. Robert Axelrod (1984) invited game theorists to submit strategies to a computer tournament in which every entry played every other entry, including a copy of itself, for 200 rounds, and the total score decided the winner. Both times he ran it, the simplest entry won: Tit-for-Tat, submitted by Anatol Rapoport. It cooperates on the first move and then simply copies whatever the opponent did on the previous move.',
        'Axelrod identified four properties behind its success. Tit-for-Tat is nice (it never defects first), retaliatory (it punishes a defection immediately), forgiving (it returns to cooperation as soon as the other player does) and clear (opponents quickly learn that cooperating with it pays). Note that Tit-for-Tat never beats an opponent in a single match; it can at best tie. It wins tournaments because it draws cooperation out of every strategy willing to cooperate, while Always Defect wins every individual match by a few points yet collects only 1 point per round against everyone who learns to punish it.',
        'This simulation runs a round-robin among six strategies, including each strategy against itself, over a number of rounds you set, and shows the ranking and the full score matrix (the cell in row A, column B is A\'s score against B). Be aware that in this particular field Grim Trigger usually edges out Tit-for-Tat. Against every strategy except Random the two score identically; against Random, Grim defects permanently after the first betrayal and averages 3 points a round, while Tit-for-Tat mirrors the coin flips and averages 2.25. This is Axelrod\'s deeper lesson: which strategy wins depends on who else is playing. The sim also has no mistakes or noise: a single accidental defection would lock Grim Trigger into permanent mutual defection and make its unforgiving nature costly, something you cannot see here.',
      ],
      id: [
        'Dilema Tahanan adalah permainan dua pemain yang masing-masing memilih, pada saat yang sama, untuk bekerja sama atau mengkhianati. Jika keduanya bekerja sama, masing-masing mendapat 3 poin. Jika satu mengkhianati sementara yang lain bekerja sama, pengkhianat mendapat 5 dan yang bekerja sama 0. Jika keduanya mengkhianati, masing-masing mendapat 1. Apa pun yang dilakukan pemain lain, kamu pribadi mendapat skor lebih tinggi dengan mengkhianati (5 mengalahkan 3, dan 1 mengalahkan 0), tetapi jika kedua pemain mengikuti logika itu, mereka berakhir dengan 1 poin masing-masing, bukan 3. Kepentingan diri justru menuntun keduanya ke hasil yang lebih buruk: itulah dilemanya.',
        'Keadaan berubah ketika dua pemain yang sama bertemu berulang kali, karena pilihan hari ini bisa dibalas esok. Dalam versi berulang ini, strategi adalah aturan memilih berdasarkan riwayat sejauh ini. Robert Axelrod (1984) mengundang para ahli teori permainan mengirim strategi ke sebuah turnamen komputer: setiap peserta melawan setiap peserta lain, termasuk salinan dirinya sendiri, selama 200 putaran, dan skor total menentukan pemenang. Dua kali ia menjalankannya, peserta paling sederhana yang menang: Tit-for-Tat, kiriman Anatol Rapoport. Strategi ini bekerja sama pada langkah pertama lalu hanya meniru apa pun yang dilakukan lawan pada langkah sebelumnya.',
        'Axelrod mengidentifikasi empat sifat di balik keberhasilannya. Tit-for-Tat itu baik (tidak pernah mengkhianati lebih dulu), membalas (langsung menghukum pengkhianatan), memaafkan (kembali bekerja sama begitu lawan melakukannya), dan jelas (lawan cepat belajar bahwa bekerja sama dengannya menguntungkan). Perhatikan bahwa Tit-for-Tat tidak pernah mengalahkan lawan dalam satu pertandingan; paling banter seri. Ia memenangkan turnamen karena memancing kerja sama dari setiap strategi yang bersedia bekerja sama, sementara Selalu Khianat memenangkan setiap pertandingan dengan selisih beberapa poin tetapi hanya mengumpulkan 1 poin per putaran melawan semua yang belajar menghukumnya.',
        'Simulasi ini menjalankan round-robin di antara enam strategi, termasuk setiap strategi melawan dirinya sendiri, selama jumlah putaran yang kamu tentukan, dan menampilkan peringkat serta matriks skor lengkap (sel pada baris A, kolom B adalah skor A melawan B). Perlu diketahui bahwa dalam kumpulan peserta ini Grim Trigger biasanya sedikit mengungguli Tit-for-Tat. Melawan setiap strategi kecuali Random, keduanya mendapat skor sama; melawan Random, Grim mengkhianati secara permanen setelah pengkhianatan pertama dan rata-rata meraih 3 poin per putaran, sementara Tit-for-Tat meniru lemparan koin dan rata-rata 2,25. Inilah pelajaran Axelrod yang lebih dalam: strategi mana yang menang bergantung pada siapa lagi yang bermain. Simulasi juga tidak punya kesalahan atau derau: satu pengkhianatan yang tidak sengaja akan mengunci Grim Trigger ke pengkhianatan bersama permanen dan membuat sifatnya yang tak memaafkan jadi mahal, sesuatu yang tidak bisa kamu lihat di sini.',
      ],
    },
    figure: {
      caption: {
        en: 'Payoff table for one round (your score, their score). Defecting always pays more against a given move, yet mutual defection (1, 1) is worse for both than mutual cooperation (3, 3). Below: Tit-for-Tat copies the previous move, so it ties with cooperators and loses by only a few points to Always Defect.',
        id: 'Tabel payoff satu putaran (skormu, skor mereka). Mengkhianati selalu lebih menguntungkan terhadap langkah tertentu, tetapi pengkhianatan bersama (1, 1) lebih buruk bagi keduanya daripada kerja sama bersama (3, 3). Di bawah: Tit-for-Tat meniru langkah sebelumnya, sehingga seri dengan yang bekerja sama dan kalah hanya beberapa poin dari Selalu Khianat.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Prisoner\'s Dilemma payoff table and Tit-for-Tat traces', 'Tabel payoff Dilema Tahanan dan jejak Tit-for-Tat')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px}.c{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.6}.b{font-weight:bold}.m{font:bold 12px ui-monospace,monospace;fill:currentColor}</style>
  <text x="96" y="16" class="s">${L('they cooperate', 'mereka kerja sama')}</text>
  <text x="196" y="16" class="s">${L('they defect', 'mereka khianat')}</text>
  <text x="8" y="56" class="s">${L('you', 'kamu')}</text>
  <text x="8" y="68" class="s">${L('cooperate', 'kerja sama')}</text>
  <text x="8" y="108" class="s">${L('you', 'kamu')}</text>
  <text x="8" y="120" class="s">${L('defect', 'khianat')}</text>
  <rect x="90" y="24" width="96" height="50" fill="#10b981" opacity=".25"/>
  <rect x="186" y="24" width="96" height="50" fill="#f59e0b" opacity=".2"/>
  <rect x="90" y="74" width="96" height="50" fill="#f59e0b" opacity=".2"/>
  <rect x="186" y="74" width="96" height="50" fill="#ef4444" opacity=".25"/>
  <rect x="90" y="24" width="192" height="100" class="c"/>
  <line x1="186" y1="24" x2="186" y2="124" class="c"/>
  <line x1="90" y1="74" x2="282" y2="74" class="c"/>
  <text x="138" y="54" class="b" text-anchor="middle">3, 3</text>
  <text x="234" y="54" class="b" text-anchor="middle">0, 5</text>
  <text x="138" y="104" class="b" text-anchor="middle">5, 0</text>
  <text x="234" y="104" class="b" text-anchor="middle">1, 1</text>
  <text x="290" y="54" class="s" fill="#10b981">${L('best for both', 'terbaik bagi keduanya')}</text>
  <text x="290" y="104" class="s" fill="#ef4444">${L('the trap', 'jebakannya')}</text>
  <text x="8" y="150" class="b">${L('Tit-for-Tat vs Always Cooperate', 'Tit-for-Tat vs Selalu Kerja Sama')}</text>
  <text x="8" y="166" class="m">TfT  C C C C C C …</text>
  <text x="8" y="180" class="m">AC   C C C C C C …</text>
  <text x="200" y="173" class="s" fill="#10b981">${L('3 each, every round', '3 masing-masing, tiap putaran')}</text>
  <text x="8" y="204" class="b">${L('Tit-for-Tat vs Always Defect', 'Tit-for-Tat vs Selalu Khianat')}</text>
  <text x="8" y="220" class="m">TfT  C D D D D D …</text>
  <text x="8" y="234" class="m">AD   D D D D D D …</text>
  <text x="200" y="220" class="s" fill="#ef4444">${L('TfT loses 5 once, then 1 vs 1', 'TfT kalah 5 sekali, lalu 1 vs 1')}</text>
  <text x="200" y="234" class="s" opacity=".8">${L('200 rounds: 199 vs 204', '200 putaran: 199 vs 204')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'In a single Prisoner\'s Dilemma, defecting is individually rational but mutual defection leaves both players worse off than mutual cooperation.',
        'Repetition changes the game: the shadow of the future makes cooperation worth protecting and defection worth punishing.',
        'Tit-for-Tat cooperates first and then copies the opponent\'s last move; it is nice, retaliatory, forgiving and clear.',
        'Tit-for-Tat never wins a single match, but it wins tournaments by earning high scores with every strategy willing to cooperate.',
        'Which strategy comes out on top depends on the field: in this sim\'s field, the unforgiving Grim Trigger scores slightly higher because it exploits the Random player.',
      ],
      id: [
        'Dalam satu putaran Dilema Tahanan, mengkhianati rasional secara individu, tetapi pengkhianatan bersama membuat kedua pemain lebih buruk daripada kerja sama bersama.',
        'Pengulangan mengubah permainan: bayangan masa depan membuat kerja sama layak dijaga dan pengkhianatan layak dihukum.',
        'Tit-for-Tat bekerja sama lebih dulu lalu meniru langkah terakhir lawan; sifatnya baik, membalas, memaafkan, dan jelas.',
        'Tit-for-Tat tidak pernah memenangkan satu pertandingan pun, tetapi memenangkan turnamen dengan meraih skor tinggi bersama setiap strategi yang bersedia bekerja sama.',
        'Strategi mana yang teratas bergantung pada kumpulan pesertanya: dalam kumpulan simulasi ini, Grim Trigger yang tak memaafkan mendapat skor sedikit lebih tinggi karena memanfaatkan pemain Random.',
      ],
    },
    vocabulary: {
      en: [
        ['Prisoner\'s Dilemma', 'A two-player game in which each player does better by defecting whatever the other does, yet both do worse when both defect.'],
        ['Cooperate / defect', 'The two moves available each round: act for mutual benefit, or act for yourself at the other\'s expense.'],
        ['Payoff', 'The points a player receives for a combination of moves, here 3 for mutual cooperation, 5 for exploiting, 0 for being exploited, 1 for mutual defection.'],
        ['Iterated game', 'The same players meet for many rounds, so each can respond to what the other did before.'],
        ['Strategy', 'A complete rule for choosing a move from the history of play, such as "copy the opponent\'s last move".'],
        ['Tit-for-Tat', 'Cooperate on the first move, then do whatever the opponent did on the previous move.'],
        ['Grim Trigger', 'Cooperate until the opponent defects once, then defect forever.'],
        ['Round-robin tournament', 'Every strategy plays every other strategy (and itself); the total score across all matches decides the ranking.'],
      ],
      id: [
        ['Dilema Tahanan', 'Permainan dua pemain ketika tiap pemain lebih untung mengkhianati apa pun yang dilakukan lawan, tetapi keduanya lebih rugi jika sama-sama mengkhianati.'],
        ['Kerja sama / khianat', 'Dua langkah yang tersedia tiap putaran: bertindak demi keuntungan bersama, atau demi diri sendiri dengan mengorbankan lawan.'],
        ['Payoff', 'Poin yang diterima pemain untuk suatu kombinasi langkah, di sini 3 untuk kerja sama bersama, 5 untuk memanfaatkan, 0 untuk dimanfaatkan, 1 untuk pengkhianatan bersama.'],
        ['Permainan berulang', 'Pemain yang sama bertemu selama banyak putaran, sehingga masing-masing dapat merespons apa yang dilakukan lawan sebelumnya.'],
        ['Strategi', 'Aturan lengkap untuk memilih langkah berdasarkan riwayat permainan, seperti "tiru langkah terakhir lawan".'],
        ['Tit-for-Tat', 'Bekerja sama pada langkah pertama, lalu lakukan apa pun yang dilakukan lawan pada langkah sebelumnya.'],
        ['Grim Trigger', 'Bekerja sama sampai lawan mengkhianati sekali, lalu mengkhianati selamanya.'],
        ['Turnamen round-robin', 'Setiap strategi melawan setiap strategi lain (dan dirinya sendiri); skor total dari semua pertandingan menentukan peringkat.'],
      ],
    },
    misconceptions: {
      en: [
        ['Always Defect must be the best strategy, since defecting is the rational choice in each round.', 'It wins or ties every individual match, but against anyone who retaliates it is stuck earning 1 point a round. In the sim its total is among the lowest, far below strategies that spend most rounds collecting 3.'],
        ['Tit-for-Tat wins because it beats the other strategies.', 'It never beats anyone: at best it ties, and it loses narrowly to Always Defect. It wins on total score because it establishes long runs of mutual cooperation with every nice strategy.'],
        ['Being nice means being a pushover.', 'Nice means never defecting first, not never defecting. Always Cooperate is nice but gets exploited and finishes low; Tit-for-Tat is nice and punishes, which is what protects it.'],
        ['Tit-for-Tat is the best strategy in every situation.', 'Axelrod himself stressed that no strategy is best regardless of the field. In this sim Grim Trigger scores higher because the Random player rewards permanent punishment; in a field with occasional mistakes, more forgiving strategies such as Tit-for-Two-Tats can do better.'],
      ],
      id: [
        ['Selalu Khianat pasti strategi terbaik, karena mengkhianati adalah pilihan rasional di tiap putaran.', 'Ia menang atau seri di setiap pertandingan, tetapi melawan siapa pun yang membalas ia terjebak meraih 1 poin per putaran. Dalam simulasi totalnya termasuk yang terendah, jauh di bawah strategi yang menghabiskan sebagian besar putaran mengumpulkan 3.'],
        ['Tit-for-Tat menang karena mengalahkan strategi lain.', 'Ia tidak pernah mengalahkan siapa pun: paling banter seri, dan kalah tipis dari Selalu Khianat. Ia menang dalam skor total karena membangun kerja sama bersama yang panjang dengan setiap strategi yang baik.'],
        ['Bersikap baik berarti mudah dimanfaatkan.', 'Baik berarti tidak pernah mengkhianati lebih dulu, bukan tidak pernah mengkhianati. Selalu Kerja Sama itu baik tetapi dimanfaatkan dan berakhir di posisi rendah; Tit-for-Tat baik dan menghukum, itulah yang melindunginya.'],
        ['Tit-for-Tat adalah strategi terbaik dalam setiap situasi.', 'Axelrod sendiri menekankan bahwa tidak ada strategi yang terbaik tanpa bergantung pada kumpulan pesertanya. Dalam simulasi ini Grim Trigger mendapat skor lebih tinggi karena pemain Random mengganjar hukuman permanen; dalam kumpulan dengan kesalahan sesekali, strategi yang lebih memaafkan seperti Tit-for-Two-Tats bisa lebih baik.'],
      ],
    },
    realWorld: {
      en: [
        'Trade between countries: tariffs answered with tariffs and concessions answered with concessions is Tit-for-Tat on a national scale.',
        'Soldiers in the trenches of the First World War developed "live and let live" truces, firing only when fired upon, a pattern Axelrod analysed as emerging Tit-for-Tat.',
        'Online marketplaces rely on reputation: a seller who cheats is punished by bad reviews, which makes cooperation the profitable choice in repeated dealings.',
        'Cleaner fish and their hosts, and vampire bats sharing blood meals, are biological examples of cooperation sustained by repeated interaction and retaliation against cheats.',
      ],
      id: [
        'Perdagangan antarnegara: tarif dibalas tarif dan konsesi dibalas konsesi adalah Tit-for-Tat dalam skala nasional.',
        'Para prajurit di parit Perang Dunia Pertama mengembangkan gencatan "hidup dan biarkan hidup", hanya menembak jika ditembak, pola yang dianalisis Axelrod sebagai Tit-for-Tat yang muncul sendiri.',
        'Pasar daring mengandalkan reputasi: penjual yang menipu dihukum dengan ulasan buruk, sehingga kerja sama menjadi pilihan yang menguntungkan dalam transaksi berulang.',
        'Ikan pembersih dan inangnya, serta kelelawar vampir yang berbagi darah, adalah contoh biologis kerja sama yang dipertahankan oleh interaksi berulang dan pembalasan terhadap penipu.',
      ],
    },
    questions: {
      en: [
        { q: 'Tit-for-Tat plays Always Defect for 200 rounds. What does each score?', a: 'Round 1: Tit-for-Tat cooperates and is exploited, scoring 0 while Always Defect gets 5. Rounds 2 to 200: both defect, 1 point each for 199 rounds. Totals: Tit-for-Tat 199, Always Defect 204. Always Defect wins the match by 5 points, but both earned far less than the 600 two cooperators would have shared.' },
        { q: 'Always Defect never loses a single match in the sim, yet finishes near the bottom of the ranking. Explain.', a: 'Against Always Cooperate it collects 5 a round (1000 points), but against Tit-for-Tat, Tit-for-Two-Tats, Grim Trigger and itself it quickly ends up in mutual defection at 1 point a round (about 200 per match). Its total is roughly 2400, while Tit-for-Tat earns 600 from every cooperative partner and totals about 3050. Winning matches by small margins is worth less than sharing large payoffs.' },
        { q: 'In this tournament Grim Trigger usually scores a little higher than Tit-for-Tat. Where does the difference come from, and what change to the game would reverse it?', a: 'Both strategies score identically against every opponent except Random. Random defects about half the time, so after its first defection Grim Trigger defects forever and averages (5 + 1)/2 = 3 points a round, while Tit-for-Tat mirrors Random and averages 2.25. Over 200 rounds that is about 150 points, which is the whole gap. Adding noise, so that cooperative players occasionally defect by mistake, would reverse it: one slip would trap Grim Trigger in permanent mutual defection with every partner, while Tit-for-Tat forgives as soon as cooperation resumes.' },
      ],
      id: [
        { q: 'Tit-for-Tat melawan Selalu Khianat selama 200 putaran. Berapa skor masing-masing?', a: 'Putaran 1: Tit-for-Tat bekerja sama dan dimanfaatkan, mendapat 0 sementara Selalu Khianat mendapat 5. Putaran 2 sampai 200: keduanya mengkhianati, 1 poin masing-masing selama 199 putaran. Total: Tit-for-Tat 199, Selalu Khianat 204. Selalu Khianat memenangkan pertandingan dengan selisih 5 poin, tetapi keduanya meraih jauh lebih sedikit daripada 600 yang akan dibagi dua pemain yang bekerja sama.' },
        { q: 'Selalu Khianat tidak pernah kalah satu pertandingan pun dalam simulasi, tetapi berakhir di dekat dasar peringkat. Jelaskan.', a: 'Melawan Selalu Kerja Sama ia mengumpulkan 5 per putaran (1000 poin), tetapi melawan Tit-for-Tat, Tit-for-Two-Tats, Grim Trigger, dan dirinya sendiri ia cepat terjebak dalam pengkhianatan bersama dengan 1 poin per putaran (sekitar 200 per pertandingan). Totalnya kira-kira 2400, sementara Tit-for-Tat meraih 600 dari setiap mitra yang kooperatif dan totalnya sekitar 3050. Memenangkan pertandingan dengan selisih kecil nilainya lebih rendah daripada berbagi payoff besar.' },
        { q: 'Dalam turnamen ini Grim Trigger biasanya mendapat skor sedikit lebih tinggi daripada Tit-for-Tat. Dari mana selisihnya, dan perubahan apa pada permainan yang akan membalikkannya?', a: 'Kedua strategi mendapat skor sama melawan setiap lawan kecuali Random. Random mengkhianati sekitar separuh waktu, sehingga setelah pengkhianatan pertamanya Grim Trigger mengkhianati selamanya dan rata-rata meraih (5 + 1)/2 = 3 poin per putaran, sementara Tit-for-Tat meniru Random dan rata-rata 2,25. Selama 200 putaran itu sekitar 150 poin, yaitu seluruh selisihnya. Menambahkan derau, sehingga pemain kooperatif sesekali mengkhianati karena salah, akan membalikkannya: satu kekeliruan akan menjebak Grim Trigger dalam pengkhianatan bersama permanen dengan setiap mitra, sementara Tit-for-Tat memaafkan begitu kerja sama dilanjutkan.' },
      ],
    },
  },
};
