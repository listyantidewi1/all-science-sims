// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Read a payoff matrix and compute total scores.',
      'Predict outcomes of one-shot vs iterated games.',
      'Argue why cooperation can emerge despite individual incentives to defect.',
    ],
    id: [
      'Membaca matriks pembayaran dan menghitung skor total.',
      'Memprediksi hasil permainan sekali vs berulang.',
      'Berargumen mengapa kerja sama dapat muncul meskipun ada insentif individu untuk mengkhianati.',
    ],
  },
  tryThis: {
    en: [
      'Run Always Defect vs Always Cooperate over 100 rounds — who wins?',
      'Add noise — does Tit-for-Tat still win?',
      'Pair Tit-for-Tat against itself — what happens?',
    ],
    id: [
      'Jalankan Selalu Khianat vs Selalu Kooperasi selama 100 putaran — siapa menang?',
      'Tambah derau — apakah Tit-for-Tat masih unggul?',
      'Adu Tit-for-Tat melawan dirinya sendiri — apa yang terjadi?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Two suspects are questioned separately. Each can stay silent, which helps the other (cooperate, C), or confess and blame the other (defect, D). The payoff matrix gives the points each earns for every pair of choices. In the sim both cooperating earns 3 each (the reward R), both defecting earns 1 each (the punishment P), and if one defects while the other cooperates the defector gets 5 (the temptation T) and the cooperator 0 (the sucker\'s payoff S). Look at it from one player\'s side: if the other cooperates, defecting gives 5 instead of 3; if the other defects, defecting gives 1 instead of 0. Defecting is better whatever the other does, so it is the dominant strategy. Yet when both follow that logic they end up with 1 each, worse than the 3 each they could have had. That is the dilemma: individually sensible choices add up to a poor result for both.',
        'Everything changes when the same two players meet again and again. Now your move today shapes what your partner does tomorrow, so cooperation can be rewarded and defection punished. The sim lets you choose a strategy for each player from six classics. Always Cooperate and Always Defect ignore the partner. Tit-for-Tat opens with C and then copies whatever the partner did last round. Grim Trigger cooperates until the partner defects once, then defects forever. Random flips a coin. Pavlov, or win-stay lose-shift, repeats its last move if it earned 3 or 5 points and switches if it earned 0 or 1. The chart shows the running total for each player and a strip of their moves, green for C and red for D.',
        'The Rounds slider sets how many times the pair plays; strategies see only the history, not the number of rounds left, so they never change behaviour near the end. The Noise slider is the probability that a chosen move is flipped by mistake, a trembling hand. With noise at zero Tit-for-Tat against itself cooperates 100 times for 300 points each, and against Always Defect it loses only the first round, scoring 99 to 104. Add a little noise and the picture changes: one accidental defection between two Tit-for-Tat players starts an echo of alternating retaliation, Grim Trigger never forgives, while Pavlov returns to mutual cooperation within two rounds. Re-run repeats the match, which matters whenever Random or noise is involved. In Robert Axelrod\'s computer tournaments of the early 1980s, Tit-for-Tat, the simplest program entered, scored the most points overall by being nice, retaliatory, forgiving and easy to read.',
        'The sim is a two-player match, not a tournament or a population, so it cannot show the key point that a strategy like Tit-for-Tat never beats its own partner yet wins overall by collecting cooperation from many partners. Payoffs are fixed at 3, 0, 5, 1; real situations have different numbers, and the game is only a prisoner\'s dilemma when T > R > P > S and 2R > T + S, so that taking turns exploiting each other is not better than cooperating. Players cannot talk, make promises or sign contracts, and both make errors at the same rate. The "winner" shown is simply whoever has more points in this match, which is not the same as the strategy that would do best against everyone.',
      ],
      id: [
        'Dua tersangka diperiksa secara terpisah. Masing-masing bisa tutup mulut, yang menguntungkan rekannya (bekerja sama, C), atau mengaku dan menyalahkan rekannya (berkhianat, D). Matriks pembayaran memberikan poin yang diterima masing-masing untuk setiap pasangan pilihan. Dalam simulasi, sama-sama bekerja sama memberi 3 poin masing-masing (imbalan R), sama-sama berkhianat memberi 1 poin masing-masing (hukuman P), dan jika satu berkhianat sementara yang lain bekerja sama, pengkhianat mendapat 5 (godaan T) dan yang bekerja sama 0 (pembayaran pecundang S). Lihat dari sisi satu pemain: jika rekannya bekerja sama, berkhianat memberi 5 bukan 3; jika rekannya berkhianat, berkhianat memberi 1 bukan 0. Berkhianat lebih baik apa pun yang dilakukan rekannya, jadi itulah strategi dominan. Namun ketika keduanya mengikuti logika itu, mereka berakhir dengan 1 poin masing-masing, lebih buruk daripada 3 poin yang sebenarnya bisa diraih. Itulah dilemanya: pilihan yang masuk akal secara pribadi menjumlah menjadi hasil buruk bagi keduanya.',
        'Semuanya berubah ketika kedua pemain yang sama bertemu lagi dan lagi. Kini langkahmu hari ini membentuk langkah rekanmu besok, sehingga kerja sama bisa dibalas baik dan pengkhianatan bisa dihukum. Simulasi membolehkanmu memilih strategi untuk tiap pemain dari enam strategi klasik. Selalu Kooperasi dan Selalu Khianat mengabaikan rekan. Tit-for-Tat membuka dengan C lalu meniru apa pun yang dilakukan rekan pada putaran sebelumnya. Grim Trigger bekerja sama sampai rekan berkhianat sekali, lalu berkhianat selamanya. Acak melempar koin. Pavlov, atau menang-bertahan kalah-berganti, mengulang langkah terakhirnya jika mendapat 3 atau 5 poin dan berganti jika mendapat 0 atau 1. Grafik menunjukkan total berjalan tiap pemain dan pita langkah mereka, hijau untuk C dan merah untuk D.',
        'Slider Rounds menentukan berapa kali pasangan itu bermain; strategi hanya melihat riwayat, bukan sisa putaran, sehingga perilakunya tidak berubah menjelang akhir. Slider Noise adalah peluang sebuah langkah terbalik karena keliru, seperti tangan yang gemetar. Tanpa derau, Tit-for-Tat melawan dirinya sendiri bekerja sama 100 kali dan mendapat 300 poin masing-masing, dan melawan Selalu Khianat ia hanya kalah di putaran pertama, dengan skor 99 lawan 104. Tambahkan sedikit derau dan gambarannya berubah: satu pengkhianatan tak sengaja di antara dua pemain Tit-for-Tat memulai gema balas-membalas bergantian, Grim Trigger tidak pernah memaafkan, sedangkan Pavlov kembali ke kerja sama dalam dua putaran. Re-run mengulang pertandingan, dan itu penting bila ada strategi Acak atau derau. Dalam turnamen komputer Robert Axelrod pada awal 1980-an, Tit-for-Tat, program paling sederhana yang diikutsertakan, meraih poin terbanyak secara keseluruhan karena ramah, membalas, memaafkan, dan mudah ditebak.',
        'Simulasi ini adalah pertandingan dua pemain, bukan turnamen atau populasi, sehingga tidak bisa memperlihatkan poin kuncinya: strategi seperti Tit-for-Tat tidak pernah mengalahkan rekannya sendiri tetapi menang secara keseluruhan dengan mengumpulkan kerja sama dari banyak rekan. Pembayaran ditetapkan 3, 0, 5, 1; situasi nyata punya angka yang berbeda, dan permainan ini hanya menjadi dilema tahanan jika T > R > P > S dan 2R > T + S, agar saling mengeksploitasi secara bergantian tidak lebih baik daripada bekerja sama. Pemain tidak bisa berbicara, berjanji, atau menandatangani kontrak, dan keduanya berbuat salah dengan laju yang sama. "Pemenang" yang ditampilkan hanyalah siapa yang poinnya lebih banyak dalam pertandingan ini, yang tidak sama dengan strategi yang akan paling berhasil melawan semua orang.',
      ],
    },
    figure: {
      caption: {
        en: 'The payoff matrix used by the sim, written as (your points, their points). In each column, moving from C to D raises your own payoff, so defecting dominates; but the D-D corner gives both players less than the C-C corner.',
        id: 'Matriks pembayaran yang dipakai simulasi, ditulis sebagai (poinmu, poin mereka). Di tiap kolom, berpindah dari C ke D menaikkan pembayaranmu sendiri, jadi berkhianat mendominasi; tetapi sudut D-D memberi kedua pemain lebih sedikit daripada sudut C-C.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const cell = (x, y, me, them, stroke) => `<rect x="${x}" y="${y}" width="90" height="60" fill="none" stroke="${stroke}" stroke-width="${stroke === 'currentColor' ? 1 : 2.5}" opacity="${stroke === 'currentColor' ? 0.45 : 1}"/><text x="${x + 45}" y="${y + 36}" text-anchor="middle" style="font-size:16px;font-weight:600"><tspan fill="#3b82f6">${me}</tspan><tspan>, </tspan><tspan fill="#ef4444">${them}</tspan></text>`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Prisoner\'s dilemma payoff matrix', 'Matriks pembayaran dilema tahanan')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px;opacity:.8}</style>
  <text x="200" y="22" text-anchor="middle" fill="#ef4444" style="font-weight:600">${L('They play', 'Mereka memilih')}</text>
  <text x="155" y="48" text-anchor="middle" style="font-weight:600">C</text>
  <text x="245" y="48" text-anchor="middle" style="font-weight:600">D</text>
  <text x="40" y="66" text-anchor="middle" fill="#3b82f6" style="font-weight:600">${L('You', 'Kamu')}</text>
  <text x="40" y="80" text-anchor="middle" fill="#3b82f6" style="font-weight:600">${L('play', 'memilih')}</text>
  <text x="90" y="92" text-anchor="middle" style="font-weight:600">C</text>
  <text x="90" y="152" text-anchor="middle" style="font-weight:600">D</text>
  ${cell(110, 58, 3, 3, '#10b981')}
  ${cell(200, 58, 0, 5, 'currentColor')}
  ${cell(110, 118, 5, 0, 'currentColor')}
  ${cell(200, 118, 1, 1, '#ef4444')}
  <path d="M300 70 L300 108" stroke="#f59e0b" stroke-width="2" marker-end="url(#a)"/>
  <text x="306" y="92" class="s" fill="#f59e0b">0 → 1</text>
  <path d="M66 100 L66 138" stroke="#f59e0b" stroke-width="2" marker-end="url(#a)"/>
  <text x="20" y="123" class="s" fill="#f59e0b">3 → 5</text>
  <text x="20" y="196" class="s" fill="#10b981">${L('both cooperate: 3 + 3 = 6 in total', 'sama-sama bekerja sama: total 3 + 3 = 6')}</text>
  <text x="20" y="210" class="s" fill="#ef4444">${L('both defect: 1 + 1 = 2 in total', 'sama-sama berkhianat: total 1 + 1 = 2')}</text>
  <text x="20" y="226" class="s">T = 5 &gt; R = 3 &gt; P = 1 &gt; S = 0,  2R &gt; T + S</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#f59e0b"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'In a single play, defecting earns more whatever the other player does, so it is the dominant strategy, yet mutual defection leaves both worse off than mutual cooperation.',
        'When the game is repeated, today\'s choice influences tomorrow\'s, so strategies that reward cooperation and punish defection can sustain cooperation.',
        'Tit-for-Tat never scores more than its partner in a match, but it never does much worse either, and it earns the full 3 points per round with any cooperative partner.',
        'Noise (accidental moves) exposes a strategy\'s ability to forgive: Grim Trigger never recovers, Tit-for-Tat echoes retaliation, Pavlov resets within two rounds.',
        'The dilemma exists only when T > R > P > S and 2R > T + S; with other numbers the game is something else.',
      ],
      id: [
        'Dalam sekali main, berkhianat menghasilkan lebih banyak apa pun yang dilakukan pemain lain, jadi itu strategi dominan, tetapi saling berkhianat membuat keduanya lebih buruk daripada saling bekerja sama.',
        'Ketika permainan diulang, pilihan hari ini memengaruhi pilihan besok, sehingga strategi yang membalas kerja sama dan menghukum pengkhianatan bisa mempertahankan kerja sama.',
        'Tit-for-Tat tidak pernah mencetak lebih banyak dari rekannya dalam satu pertandingan, tetapi juga tidak pernah jauh lebih buruk, dan ia meraih 3 poin penuh per putaran dengan rekan yang kooperatif.',
        'Derau (langkah tak sengaja) menguji kemampuan strategi untuk memaafkan: Grim Trigger tidak pernah pulih, Tit-for-Tat menggemakan balas dendam, Pavlov pulih dalam dua putaran.',
        'Dilema ini hanya ada jika T > R > P > S dan 2R > T + S; dengan angka lain permainannya menjadi sesuatu yang berbeda.',
      ],
    },
    vocabulary: {
      en: [
        ['Payoff matrix', 'A table listing each player\'s points for every combination of choices.'],
        ['Cooperate / defect', 'The two moves: act in the shared interest, or act in your own interest at the other\'s expense.'],
        ['Dominant strategy', 'A move that gives you a better payoff than any alternative no matter what the other player does.'],
        ['Nash equilibrium', 'A pair of choices from which neither player can gain by changing alone; in the one-shot dilemma it is mutual defection.'],
        ['Iterated game', 'The same players playing the same game repeatedly, so that history can influence choices.'],
        ['Tit-for-Tat', 'Cooperate first, then copy the partner\'s previous move.'],
        ['Grim Trigger', 'Cooperate until the partner defects once, then defect forever.'],
        ['Noise', 'The probability that a player\'s intended move is replaced by the opposite one by mistake.'],
      ],
      id: [
        ['Matriks pembayaran', 'Tabel yang mencantumkan poin tiap pemain untuk setiap kombinasi pilihan.'],
        ['Bekerja sama / berkhianat', 'Dua langkah yang tersedia: bertindak demi kepentingan bersama, atau demi kepentingan sendiri dengan mengorbankan yang lain.'],
        ['Strategi dominan', 'Langkah yang memberi pembayaran lebih baik daripada pilihan lain apa pun yang dilakukan pemain lawan.'],
        ['Keseimbangan Nash', 'Pasangan pilihan yang tidak bisa diperbaiki oleh salah satu pemain dengan mengubah pilihannya sendiri; dalam dilema sekali main, itu saling berkhianat.'],
        ['Permainan berulang', 'Pemain yang sama memainkan permainan yang sama berkali-kali, sehingga riwayat bisa memengaruhi pilihan.'],
        ['Tit-for-Tat', 'Bekerja sama dulu, lalu meniru langkah rekan pada putaran sebelumnya.'],
        ['Grim Trigger', 'Bekerja sama sampai rekan berkhianat sekali, lalu berkhianat selamanya.'],
        ['Derau', 'Peluang langkah yang dimaksud seorang pemain tergantikan oleh langkah sebaliknya karena keliru.'],
      ],
    },
    misconceptions: {
      en: [
        ['Always Defect is the best strategy because it can never be exploited.', 'It is unbeatable in a single match, but in the sim it earns only 1 point per round against any retaliating partner, while two cooperators earn 3 each. Over many partners the defector\'s total falls far behind.'],
        ['Tit-for-Tat wins because it beats its opponents.', 'It never beats anyone: against a cooperator it ties, against Always Defect it loses by exactly 5 points. It wins tournaments by scoring well with everyone, because it elicits cooperation and refuses to be exploited for long.'],
        ['Being "nice" means being a pushover.', 'In this game "nice" only means never defecting first. Tit-for-Tat is nice and still punishes every defection immediately; Always Cooperate is the pushover, and it is the one that scores 0 against a defector.'],
        ['The dilemma disappears as long as the game is repeated.', 'Repetition makes cooperation possible, not automatic. Two Always Defect players still get 1 point per round, and with noise even Tit-for-Tat pairs spend much of their time in mutual retaliation.'],
      ],
      id: [
        ['Selalu Khianat adalah strategi terbaik karena tidak pernah bisa dieksploitasi.', 'Ia tak terkalahkan dalam satu pertandingan, tetapi dalam simulasi ia hanya meraih 1 poin per putaran melawan rekan yang membalas, sementara dua pemain yang bekerja sama meraih 3 masing-masing. Melawan banyak rekan, total si pengkhianat jauh tertinggal.'],
        ['Tit-for-Tat menang karena mengalahkan lawan-lawannya.', 'Ia tidak pernah mengalahkan siapa pun: melawan pemain kooperatif ia seri, melawan Selalu Khianat ia kalah tepat 5 poin. Ia memenangkan turnamen dengan mencetak skor baik bersama semua orang, karena ia memancing kerja sama dan menolak dieksploitasi berlama-lama.'],
        ['Bersikap "ramah" berarti mudah ditindas.', 'Dalam permainan ini "ramah" hanya berarti tidak pernah berkhianat lebih dulu. Tit-for-Tat ramah tetapi tetap menghukum setiap pengkhianatan dengan segera; Selalu Kooperasi-lah yang mudah ditindas, dan itulah yang mendapat 0 melawan pengkhianat.'],
        ['Dilema hilang asalkan permainan diulang.', 'Pengulangan membuat kerja sama mungkin, bukan otomatis. Dua pemain Selalu Khianat tetap mendapat 1 poin per putaran, dan dengan derau bahkan pasangan Tit-for-Tat menghabiskan banyak waktu dalam balas-membalas.'],
      ],
    },
    realWorld: {
      en: [
        'Two rival shops deciding whether to start a price war face a prisoner\'s dilemma: both earn more if neither cuts prices, but each is tempted to undercut.',
        'Countries negotiating emission cuts or fishing quotas each gain by free-riding on the others\' restraint, which is why treaties include monitoring and penalties.',
        'Online marketplaces attach reputation scores to sellers so that one-shot transactions between strangers behave more like repeated games.',
        'Cleaner fish and their hosts, or vampire bats sharing blood meals, are studied as biological examples of reciprocity that resembles Tit-for-Tat.',
      ],
      id: [
        'Dua toko saingan yang mempertimbangkan perang harga menghadapi dilema tahanan: keduanya lebih untung jika tak satu pun menurunkan harga, tetapi masing-masing tergoda untuk membanting harga.',
        'Negara-negara yang merundingkan pemotongan emisi atau kuota tangkapan ikan masing-masing diuntungkan dengan menumpang pada pengekangan negara lain, itulah sebabnya perjanjian memuat pemantauan dan sanksi.',
        'Lokapasar daring melekatkan skor reputasi pada penjual agar transaksi sekali jalan antara orang asing berperilaku lebih seperti permainan berulang.',
        'Ikan pembersih dan inangnya, atau kelelawar vampir yang berbagi makanan darah, dipelajari sebagai contoh biologis timbal balik yang menyerupai Tit-for-Tat.',
      ],
    },
    questions: {
      en: [
        { q: 'Tit-for-Tat plays Always Defect for 10 rounds with no noise. Work out both scores round by round.', a: 'Round 1: Tit-for-Tat cooperates, Always Defect defects, so 0 and 5. Rounds 2 to 10: Tit-for-Tat copies the defection, both defect, 1 point each for 9 rounds. Totals: Tit-for-Tat 0 + 9 = 9, Always Defect 5 + 9 = 14. The defector wins by 5, but both are stuck at the 1-point-per-round level.' },
        { q: 'Tit-for-Tat never scores more than its partner in any match. How can it still have been the top scorer in Axelrod\'s tournaments?', a: 'Tournament rank depends on total points against all entrants, not on head-to-head wins. Tit-for-Tat ties cooperative partners at 3 points per round and loses to defectors by only a few points. Always Defect gains 5 per round from pushovers but only 1 per round from everyone who retaliates, so across many partners it accumulates less.' },
        { q: 'Set Tit-for-Tat against Tit-for-Tat with noise 0.05. Describe what you see, and explain why Pavlov against Pavlov recovers faster under the same noise.', a: 'After a few cooperative rounds a random flip makes one player defect; the other copies it next round while the first returns to cooperating, so the pair alternate C/D and D/C, earning 5 and 0 in turn, until another accident happens to put them back in step. With Pavlov, the player who got 0 switches to D and the one who got 5 stays D, giving one round of D/D; both then earned 1, so both switch back to C. Pavlov forgives after two rounds by design.' },
      ],
      id: [
        { q: 'Tit-for-Tat melawan Selalu Khianat selama 10 putaran tanpa derau. Hitung skor keduanya putaran demi putaran.', a: 'Putaran 1: Tit-for-Tat bekerja sama, Selalu Khianat berkhianat, jadi 0 dan 5. Putaran 2 sampai 10: Tit-for-Tat meniru pengkhianatan itu, keduanya berkhianat, 1 poin masing-masing selama 9 putaran. Total: Tit-for-Tat 0 + 9 = 9, Selalu Khianat 5 + 9 = 14. Si pengkhianat menang 5 poin, tetapi keduanya terjebak di tingkat 1 poin per putaran.' },
        { q: 'Tit-for-Tat tidak pernah mencetak lebih banyak daripada rekannya dalam pertandingan mana pun. Bagaimana ia tetap bisa menjadi pencetak skor tertinggi di turnamen Axelrod?', a: 'Peringkat turnamen bergantung pada total poin melawan semua peserta, bukan pada kemenangan satu lawan satu. Tit-for-Tat seri dengan rekan kooperatif pada 3 poin per putaran dan kalah dari pengkhianat hanya beberapa poin. Selalu Khianat meraih 5 per putaran dari pemain yang mudah ditindas tetapi hanya 1 per putaran dari semua yang membalas, sehingga melawan banyak rekan totalnya lebih sedikit.' },
        { q: 'Adu Tit-for-Tat melawan Tit-for-Tat dengan derau 0,05. Gambarkan yang terlihat, dan jelaskan mengapa Pavlov melawan Pavlov pulih lebih cepat dengan derau yang sama.', a: 'Setelah beberapa putaran kerja sama, satu langkah yang terbalik membuat seorang pemain berkhianat; pemain lain menirunya di putaran berikutnya sementara yang pertama kembali bekerja sama, sehingga pasangan itu bergantian C/D dan D/C, meraih 5 dan 0 secara bergilir, sampai kekeliruan lain kebetulan menyelaraskan mereka lagi. Dengan Pavlov, pemain yang mendapat 0 berganti ke D dan yang mendapat 5 tetap D, menghasilkan satu putaran D/D; keduanya lalu mendapat 1, sehingga keduanya berganti kembali ke C. Pavlov memaafkan setelah dua putaran karena aturannya memang begitu.' },
      ],
    },
  },
};
