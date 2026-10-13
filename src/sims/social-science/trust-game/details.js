// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Compare game-theoretic prediction (zero) to empirical results.',
      'See multiplier × trust × reciprocity as a triangle.',
      "Track total social welfare over many rounds.",
    ],
    id: [
      'Membandingkan prediksi teori-permainan (nol) dengan hasil empiris.',
      'Melihat pengganda × kepercayaan × timbal balik sebagai segitiga.',
      'Melacak kesejahteraan sosial total selama banyak putaran.',
    ],
  },
  tryThis: {
    en: [
      'Trust 100%, return 33% — both players profit equally.',
      "Trust 100%, return 0 — Player 2 wins big, but the game collapses if repeated.",
      "Trust 0% — total welfare = $10 forever.",
    ],
    id: [
      'Kepercayaan 100%, kembalikan 33% — keduanya untung sama.',
      'Kepercayaan 100%, kembalikan 0 — Pemain 2 untung besar, tapi permainan runtuh jika diulang.',
      'Kepercayaan 0% — kesejahteraan total = Rp100rb selamanya.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'The trust game, also called the investment game, was designed by Berg, Dickhaut and McCabe in 1995 to measure trust with real money. Player 1 is given $10 and may send any part of it to Player 2. On the way, the money is multiplied, by 3 in the classic version, so that trust creates value. Player 2 then decides how much of the enlarged sum to send back; Player 1 has no way to force a return. Player 1\'s final amount is what they kept plus what came back; Player 2 keeps the rest.',
        'If both players cared only about their own money, the game would be over before it began. Player 2 has nothing to gain from returning anything, so a selfish Player 2 keeps everything. Player 1, anticipating this, should send nothing, and the pair ends with the $10 they started with. Yet in experiments Player 1 sends about half on average, and Player 2 typically returns an amount close to what was sent, roughly a third of the tripled sum. Trust is common, it is usually rewarded enough to roughly break even, and it leaves the pair much richer in total than mutual suspicion would.',
        'The simulation is a payoff calculator rather than a repeated game. The P1 sends fraction slider sets how much of the $10 is sent; the multiplier (1 to 5) enlarges it; the P2 returns fraction slider sets what share of the enlarged sum goes back. The screen shows both final amounts, total welfare (the two added together, compared with the $10 no-trust baseline) and the split between the players. The presets reproduce the empirical average (send 50%, return 33%), an equal split (send all, return half), a selfish Player 2 (send all, return nothing) and no trust at all.',
        'A few simplifications matter. In the original experiment Player 2 also received $10, so nobody ended with nothing; here Player 2 starts with zero. The sim does not repeat the game, so you cannot watch a betrayed Player 1 stop sending, although that is exactly what happens in repeated play, and it has no learning, reputation or communication. The return fraction is set by you rather than chosen by a human with their own sense of fairness. Use the sliders to find the return fraction at which Player 1 exactly breaks even, and notice how it depends only on the multiplier, not on how much was sent.',
      ],
      id: [
        'Permainan kepercayaan, disebut juga permainan investasi, dirancang Berg, Dickhaut, dan McCabe pada 1995 untuk mengukur kepercayaan dengan uang sungguhan. Pemain 1 diberi $10 dan boleh mengirimkan sebagian berapa pun kepada Pemain 2. Dalam perjalanan, uang itu dilipatgandakan, tiga kali dalam versi klasiknya, sehingga kepercayaan menciptakan nilai. Pemain 2 lalu memutuskan berapa dari jumlah yang sudah membesar itu yang dikirim kembali; Pemain 1 tidak punya cara untuk memaksanya. Jumlah akhir Pemain 1 adalah yang ia simpan ditambah yang kembali; Pemain 2 menyimpan sisanya.',
        'Jika kedua pemain hanya peduli pada uangnya sendiri, permainan selesai sebelum dimulai. Pemain 2 tidak mendapat apa pun dari mengembalikan uang, sehingga Pemain 2 yang egois menyimpan semuanya. Pemain 1, yang mengantisipasi itu, seharusnya tidak mengirim apa pun, dan pasangan itu berakhir dengan $10 seperti semula. Namun dalam eksperimen, Pemain 1 rata-rata mengirim sekitar setengah, dan Pemain 2 biasanya mengembalikan jumlah yang mendekati yang dikirim, kira-kira sepertiga dari jumlah yang sudah dilipatgandakan. Kepercayaan itu lumrah, biasanya dibalas cukup untuk kira-kira impas, dan membuat pasangan itu jauh lebih kaya secara total daripada saling curiga.',
        'Simulasi ini adalah kalkulator hasil, bukan permainan berulang. Slider P1 sends fraction mengatur berapa dari $10 yang dikirim; pengali (1 sampai 5) membesarkannya; slider P2 returns fraction mengatur bagian dari jumlah yang membesar itu yang dikembalikan. Layar menampilkan kedua jumlah akhir, kesejahteraan total (keduanya dijumlahkan, dibandingkan dengan patokan tanpa kepercayaan $10), dan pembagian antara kedua pemain. Preset mereproduksi rata-rata empiris (kirim 50%, kembalikan 33%), pembagian setara (kirim semua, kembalikan setengah), Pemain 2 yang egois (kirim semua, kembalikan nol), dan tanpa kepercayaan sama sekali.',
        'Beberapa penyederhanaan penting. Dalam eksperimen aslinya Pemain 2 juga menerima $10, sehingga tak ada yang berakhir tanpa apa-apa; di sini Pemain 2 mulai dari nol. Simulasi tidak mengulang permainan, sehingga kamu tidak bisa melihat Pemain 1 yang dikhianati berhenti mengirim, padahal itulah yang persis terjadi dalam permainan berulang, dan tidak ada pembelajaran, reputasi, atau komunikasi. Fraksi pengembalian ditentukan olehmu, bukan dipilih manusia dengan rasa keadilannya sendiri. Gunakan slider untuk menemukan fraksi pengembalian yang membuat Pemain 1 tepat impas, dan perhatikan bahwa nilainya hanya bergantung pada pengali, bukan pada berapa yang dikirim.',
      ],
    },
    figure: {
      caption: {
        en: 'One play with the multiplier 3. Player 1 sends $5 of their $10; it becomes $15 for Player 2, who returns half. Player 1 ends with $5 + $7.50 = $12.50 and Player 2 with $7.50: both gain, and the pair holds $20 instead of $10. Player 1 breaks even only if at least a third (1 ÷ multiplier) of the enlarged sum comes back.',
        id: 'Satu permainan dengan pengali 3. Pemain 1 mengirim $5 dari $10 miliknya; uang itu menjadi $15 bagi Pemain 2, yang mengembalikan setengahnya. Pemain 1 berakhir dengan $5 + $7,50 = $12,50 dan Pemain 2 dengan $7,50: keduanya untung, dan pasangan itu memegang $20, bukan $10. Pemain 1 impas hanya jika sedikitnya sepertiga (1 ÷ pengali) dari jumlah yang membesar itu kembali.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Money flow in one round of the trust game', 'Aliran uang dalam satu putaran permainan kepercayaan')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px;opacity:.75}.w{font-weight:bold}.bx{fill:none;stroke:currentColor;stroke-width:1.2}</style>
  <text x="12" y="18" class="w">${L('Send $5, tripled, half returned', 'Kirim $5, dilipatgandakan tiga, setengah dikembalikan')}</text>
  <rect x="20" y="60" width="90" height="120" rx="6" class="bx"/>
  <text x="40" y="80" class="w" fill="#3b82f6">${L('Player 1', 'Pemain 1')}</text>
  <text x="30" y="100" class="s">${L('starts with $10', 'mulai dengan $10')}</text>
  <text x="30" y="118" class="s">${L('keeps $5', 'simpan $5')}</text>
  <text x="30" y="136" class="s">${L('gets back $7.50', 'terima $7,50')}</text>
  <text x="30" y="166" class="w">${L('ends: $12.50', 'akhir: $12,50')}</text>
  <rect x="250" y="60" width="90" height="120" rx="6" class="bx"/>
  <text x="270" y="80" class="w" fill="#8b5cf6">${L('Player 2', 'Pemain 2')}</text>
  <text x="260" y="100" class="s">${L('starts with $0', 'mulai dengan $0')}</text>
  <text x="260" y="118" class="s">${L('receives $15', 'menerima $15')}</text>
  <text x="260" y="136" class="s">${L('returns $7.50', 'kembalikan $7,50')}</text>
  <text x="260" y="166" class="w">${L('ends: $7.50', 'akhir: $7,50')}</text>
  <path d="M110 92 L150 92" stroke="#10b981" stroke-width="3" fill="none"/>
  <rect x="150" y="76" width="60" height="30" rx="15" fill="#10b981"/>
  <text x="166" y="96" fill="#ffffff" class="w">× 3</text>
  <path d="M210 92 L246 92 L238 86 M246 92 L238 98" stroke="#10b981" stroke-width="3" fill="none"/>
  <text x="112" y="72" fill="#10b981" class="s">${L('sends $5', 'kirim $5')}</text>
  <text x="214" y="72" fill="#10b981" class="s">${L('becomes $15', 'jadi $15')}</text>
  <path d="M250 150 L114 150 L122 144 M114 150 L122 156" stroke="#f59e0b" stroke-width="3" fill="none"/>
  <text x="130" y="166" fill="#f59e0b" class="s">${L('returns 50% of $15 = $7.50', 'kembalikan 50% dari $15 = $7,50')}</text>
  <line x1="20" y1="196" x2="340" y2="196" stroke="currentColor" stroke-width="1" opacity=".4"/>
  <text x="20" y="214" class="s">${L('total: $12.50 + $7.50 = $20, versus $10 with no trust', 'total: $12,50 + $7,50 = $20, dibanding $10 tanpa kepercayaan')}</text>
  <text x="20" y="230" class="s" fill="#f59e0b">${L('P1 breaks even when return ≥ 1/3 of the tripled sum', 'P1 impas bila pengembalian ≥ 1/3 dari jumlah yang dilipatgandakan')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Money sent is multiplied, so trust creates value: the more Player 1 sends, the bigger the total pie.',
        'Player 2 cannot be forced to return anything, so sending is a leap of faith; pure self-interest predicts nothing sent and nothing returned.',
        'Player 1 breaks even only if the returned share of the enlarged sum is at least 1 ÷ multiplier (one third with the classic tripling).',
        'In experiments people send about half and get back roughly what they sent, so trust is common and usually roughly rewarded.',
        'Total welfare rises with the amount sent regardless of what is returned; the return decides how the gain is shared, not whether it exists.',
      ],
      id: [
        'Uang yang dikirim dilipatgandakan, sehingga kepercayaan menciptakan nilai: semakin banyak yang dikirim Pemain 1, semakin besar kue totalnya.',
        'Pemain 2 tidak bisa dipaksa mengembalikan apa pun, sehingga mengirim adalah lompatan keyakinan; kepentingan diri murni memprediksi tak ada yang dikirim dan tak ada yang dikembalikan.',
        'Pemain 1 impas hanya jika bagian yang dikembalikan dari jumlah yang membesar sedikitnya 1 ÷ pengali (sepertiga pada pelipatgandaan tiga klasik).',
        'Dalam eksperimen, orang mengirim sekitar setengah dan menerima kembali kira-kira sebanyak yang dikirim, sehingga kepercayaan itu lumrah dan biasanya kira-kira terbalas.',
        'Kesejahteraan total naik bersama jumlah yang dikirim terlepas dari yang dikembalikan; pengembalian menentukan bagaimana keuntungan dibagi, bukan ada atau tidaknya keuntungan itu.',
      ],
    },
    vocabulary: {
      en: [
        ['Trust', 'Making yourself vulnerable to another person in the expectation that they will not exploit it; here, sending money that may not come back.'],
        ['Reciprocity', 'Returning a kindness with a kindness; here, Player 2 sending money back although nothing forces them to.'],
        ['Multiplier', 'The factor by which sent money grows; it represents the value created when people cooperate.'],
        ['Backward induction', 'Reasoning from the last move to the first: a selfish Player 2 returns nothing, so a selfish Player 1 sends nothing.'],
        ['Total welfare', 'The sum of both players\' final amounts, which measures how much value the pair created.'],
        ['Break-even return', 'The return fraction at which Player 1 ends with exactly $10: 1 ÷ multiplier.'],
        ['Endowment', 'The money a player is given at the start; here $10 for Player 1 and nothing for Player 2.'],
      ],
      id: [
        ['Kepercayaan', 'Membuat diri rentan terhadap orang lain dengan harapan ia tidak memanfaatkannya; di sini, mengirim uang yang mungkin tidak kembali.'],
        ['Timbal balik (resiprositas)', 'Membalas kebaikan dengan kebaikan; di sini, Pemain 2 mengirim uang kembali meski tak ada yang memaksanya.'],
        ['Pengali', 'Faktor pertumbuhan uang yang dikirim; melambangkan nilai yang tercipta ketika orang bekerja sama.'],
        ['Induksi mundur', 'Bernalar dari langkah terakhir ke langkah pertama: Pemain 2 yang egois tidak mengembalikan apa pun, sehingga Pemain 1 yang egois tidak mengirim apa pun.'],
        ['Kesejahteraan total', 'Jumlah uang akhir kedua pemain, yang mengukur seberapa banyak nilai yang diciptakan pasangan itu.'],
        ['Pengembalian impas', 'Fraksi pengembalian yang membuat Pemain 1 berakhir tepat dengan $10: 1 ÷ pengali.'],
        ['Modal (endowment)', 'Uang yang diberikan kepada pemain di awal; di sini $10 untuk Pemain 1 dan nol untuk Pemain 2.'],
      ],
    },
    misconceptions: {
      en: [
        ['Sending everything is always the best move for Player 1.', 'Only if Player 2 returns more than one third of the tripled amount. With a selfish partner, sending everything leaves Player 1 with $0 and Player 2 with $30. Sending more raises the total pie, but not necessarily Player 1\'s slice.'],
        ['Player 2 returning money is irrational and will not happen in real life.', 'Most people do return a substantial share, out of fairness, gratitude or a wish to be the kind of person who reciprocates. Economics now treats such social preferences as real motives to be measured, not as mistakes.'],
        ['The tripled money comes out of Player 1\'s pocket.', 'In the experiment the extra money is put in by the experimenter, standing for the value that cooperation creates in real life, such as a loan that funds a profitable business. Nobody loses what the multiplier adds.'],
        ['If people trust strangers with half their money, they must be naive.', 'On average the money returned roughly matches the money sent, so trusting is approximately break-even for Player 1 while doubling the pair\'s total. Calibrated trust is a sensible bet, not naivety.'],
      ],
      id: [
        ['Mengirim semuanya selalu langkah terbaik bagi Pemain 1.', 'Hanya jika Pemain 2 mengembalikan lebih dari sepertiga jumlah yang dilipatgandakan. Dengan mitra yang egois, mengirim semuanya membuat Pemain 1 berakhir dengan $0 dan Pemain 2 dengan $30. Mengirim lebih banyak memperbesar kue total, tetapi tidak selalu memperbesar irisan Pemain 1.'],
        ['Pemain 2 yang mengembalikan uang itu tidak rasional dan tidak akan terjadi di dunia nyata.', 'Kebanyakan orang memang mengembalikan bagian yang cukup besar, karena rasa adil, rasa terima kasih, atau keinginan menjadi orang yang membalas kebaikan. Ekonomi kini memperlakukan preferensi sosial seperti itu sebagai motif nyata yang perlu diukur, bukan sebagai kekeliruan.'],
        ['Uang yang dilipatgandakan berasal dari kantong Pemain 1.', 'Dalam eksperimen, uang tambahan itu disediakan oleh peneliti, melambangkan nilai yang diciptakan kerja sama di dunia nyata, seperti pinjaman yang membiayai usaha yang menguntungkan. Tidak ada yang kehilangan apa yang ditambahkan pengali.'],
        ['Jika orang memercayakan separuh uangnya kepada orang asing, mereka pasti naif.', 'Rata-rata uang yang dikembalikan kira-kira sama dengan uang yang dikirim, sehingga memercayai kira-kira impas bagi Pemain 1 sambil menggandakan total pasangan itu. Kepercayaan yang terukur adalah taruhan yang masuk akal, bukan kenaifan.'],
      ],
    },
    realWorld: {
      en: [
        'Lending and investing are trust games: a lender hands over money today in the hope that a borrower who could default will pay it back with interest.',
        'Online marketplaces: a buyer pays before the parcel arrives, and rating systems exist to make reciprocity visible and give sellers a reason to deliver.',
        'Arisan, the rotating savings groups common in Indonesia, run entirely on trust that every member will keep paying in after they have received their turn.',
        'Surveys find that countries where more people say strangers can be trusted also tend to have more trade and higher incomes, because trust lowers the cost of doing business.',
      ],
      id: [
        'Meminjamkan dan berinvestasi adalah permainan kepercayaan: pemberi pinjaman menyerahkan uang hari ini dengan harapan peminjam yang bisa saja gagal bayar akan mengembalikannya beserta bunga.',
        'Pasar daring: pembeli membayar sebelum paket tiba, dan sistem penilaian ada untuk membuat timbal balik terlihat dan memberi penjual alasan untuk mengirim barang.',
        'Arisan, kelompok tabungan bergilir yang umum di Indonesia, sepenuhnya berjalan di atas kepercayaan bahwa setiap anggota akan terus membayar setelah mendapat gilirannya.',
        'Survei menemukan bahwa negara dengan lebih banyak orang yang menyatakan orang asing bisa dipercaya juga cenderung punya lebih banyak perdagangan dan pendapatan lebih tinggi, karena kepercayaan menurunkan biaya berbisnis.',
      ],
    },
    questions: {
      en: [
        { q: 'Player 1 sends $4 with the multiplier at 3, and Player 2 returns 50% of what they receive. What does each player end with, and what is the total?', a: 'The $4 becomes $12. Player 2 returns half, $6, and keeps $6. Player 1 ends with $6 kept + $6 returned = $12; Player 2 ends with $6. Total welfare is $18, up from the $10 they would have had with no trust.' },
        { q: 'What fraction must Player 2 return for Player 1 to break even, and why does it not depend on how much was sent?', a: 'Player 1 breaks even when the returned amount equals the amount sent. If s is sent, Player 2 holds 3s and must return s, which is 1/3 of 3s. The fraction 1 ÷ multiplier is the same for every s, so with tripling it is always one third. Check the empirical preset: 33% of $15 is $4.95, almost exactly the $5 sent.' },
        { q: 'Why does standard game theory predict that nothing is sent, and what is missing from that prediction?', a: 'Reasoning backward: a Player 2 who cares only about money keeps everything, so Player 1 expects nothing back and sends nothing. The prediction ignores that people value fairness and reciprocity, feel obliged by a kind act, and care about their reputation, especially when interactions repeat. The experiments show these motives are strong enough that trusting roughly pays for itself.' },
      ],
      id: [
        { q: 'Pemain 1 mengirim $4 dengan pengali 3, dan Pemain 2 mengembalikan 50% dari yang diterimanya. Berapa uang akhir tiap pemain, dan berapa totalnya?', a: '$4 menjadi $12. Pemain 2 mengembalikan setengahnya, $6, dan menyimpan $6. Pemain 1 berakhir dengan $6 yang disimpan + $6 yang kembali = $12; Pemain 2 berakhir dengan $6. Kesejahteraan total $18, naik dari $10 yang akan mereka miliki tanpa kepercayaan.' },
        { q: 'Berapa fraksi yang harus dikembalikan Pemain 2 agar Pemain 1 impas, dan mengapa tidak bergantung pada jumlah yang dikirim?', a: 'Pemain 1 impas ketika jumlah yang dikembalikan sama dengan jumlah yang dikirim. Jika s dikirim, Pemain 2 memegang 3s dan harus mengembalikan s, yaitu 1/3 dari 3s. Fraksi 1 ÷ pengali sama untuk setiap s, jadi dengan pelipatgandaan tiga nilainya selalu sepertiga. Periksa preset empiris: 33% dari $15 adalah $4,95, hampir persis $5 yang dikirim.' },
        { q: 'Mengapa teori permainan standar memprediksi tak ada yang dikirim, dan apa yang hilang dari prediksi itu?', a: 'Bernalar mundur: Pemain 2 yang hanya peduli uang menyimpan semuanya, sehingga Pemain 1 tidak mengharapkan apa pun kembali dan tidak mengirim apa pun. Prediksi ini mengabaikan bahwa orang menghargai keadilan dan timbal balik, merasa berkewajiban setelah menerima kebaikan, dan peduli pada reputasinya, terutama ketika interaksi berulang. Eksperimen menunjukkan motif-motif ini cukup kuat sehingga memercayai kira-kira membayar dirinya sendiri.' },
      ],
    },
  },
};
