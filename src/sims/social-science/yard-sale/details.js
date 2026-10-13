// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See "fair" trades produce inequality through pure random walk.',
      'Connect to wealth-distribution research (Boghosian, 2014).',
      'Compare to redistributive taxation as a moderating force.',
    ],
    id: [
      'Melihat transaksi "adil" menghasilkan ketimpangan lewat random walk murni.',
      'Mengaitkan dengan penelitian distribusi kekayaan (Boghosian, 2014).',
      'Membandingkan dengan pajak redistributif sebagai gaya pemoderasi.',
    ],
  },
  tryThis: {
    en: [
      'Run with no tax — does someone become a billionaire?',
      'Add 5% wealth tax — does it stabilize inequality?',
      'Compare Gini after 100, 1000, 10000 trades.',
    ],
    id: [
      'Jalankan tanpa pajak — apakah seseorang jadi miliarder?',
      'Tambah pajak kekayaan 5% — apakah ketimpangan stabil?',
      'Bandingkan Gini setelah 100, 1.000, 10.000 transaksi.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'The yard-sale model asks a sharp question: if everyone starts equal and every transaction is perfectly fair, does wealth stay equal? In the model, two randomly chosen people meet and trade. Neither is cleverer or luckier than the other, so the outcome is decided by a fair coin. What changes hands is a fixed fraction of the poorer person\'s wealth (the stake fraction slider, 10% by default), because in a real yard sale nobody can bet more than they own. Repeat this thousands of times and the result is startling: wealth drifts into fewer and fewer hands until one person holds almost everything.',
        'The reason is that the gambles are multiplicative, not additive. Suppose you are the poorer party and win: your wealth is multiplied by 1.1. Lose next time and it is multiplied by 0.9, leaving 0.99 of what you started with. A win and a loss do not cancel; they leave you 1% poorer, and over many rounds this bias compounds. The average wealth across all possible histories stays exactly $100, but that average is propped up by a few very lucky histories, while the typical person slides downward. Anyone who reaches zero has nothing left to stake and can never recover, so wealth concentrates irreversibly.',
        'The simulation shows the sorted wealth of everyone as bars, and reports two measures. The Gini coefficient runs from 0 (everyone equal) to 1 (one person owns everything), and the share owned by the richest 10% is a more concrete reading of the same fact. With no tax, both climb steadily: the Gini typically passes 0.5 within a few thousand trades and keeps rising. The People slider changes the population and resets everyone to $100; a larger stake fraction makes the drift faster. Trades per second and the Step 1000 trades button only change how quickly you watch it happen.',
        'The Wealth-tax rate slider adds redistribution: each tick, a small slice of everyone\'s wealth is collected and handed back in equal shares, so the poor receive more than they pay and the rich less. Even a modest rate stops the run toward total concentration and holds the Gini at a steady value, as Boghosian and colleagues found when they fitted extended versions of this model to real wealth data. Keep in mind what the model leaves out: nobody earns income or produces anything, total wealth is fixed, trades create no value, and the tax slider is a relative strength rather than a yearly percentage. It isolates one mechanism, random multiplicative exchange, and shows that this mechanism alone is enough to generate extreme inequality.',
      ],
      id: [
        'Model yard-sale mengajukan pertanyaan tajam: jika semua orang mulai setara dan setiap transaksi benar-benar adil, apakah kekayaan tetap setara? Dalam model ini, dua orang yang dipilih acak bertemu dan bertransaksi. Tidak ada yang lebih pandai atau lebih beruntung, sehingga hasilnya ditentukan koin yang adil. Yang berpindah tangan adalah fraksi tetap dari kekayaan orang yang lebih miskin (slider stake fraction, 10% secara bawaan), karena dalam obral sungguhan tak seorang pun bisa mempertaruhkan lebih dari miliknya. Ulangi ribuan kali dan hasilnya mengejutkan: kekayaan mengalir ke tangan yang semakin sedikit sampai satu orang memegang hampir semuanya.',
        'Sebabnya, taruhannya bersifat perkalian, bukan penjumlahan. Misalkan kamu pihak yang lebih miskin dan menang: kekayaanmu dikalikan 1,1. Kalah berikutnya, dikalikan 0,9, menyisakan 0,99 dari modal awal. Satu menang dan satu kalah tidak saling meniadakan; keduanya meninggalkanmu 1% lebih miskin, dan selama banyak putaran bias ini bertumpuk. Rata-rata kekayaan atas semua kemungkinan riwayat tetap persis $100, tetapi rata-rata itu ditopang oleh beberapa riwayat yang sangat beruntung, sementara orang pada umumnya melorot. Siapa pun yang mencapai nol tak punya apa-apa lagi untuk dipertaruhkan dan tidak akan pernah pulih, sehingga kekayaan terpusat secara tak terbalikkan.',
        'Simulasi menampilkan kekayaan semua orang yang sudah diurutkan sebagai batang, dan melaporkan dua ukuran. Koefisien Gini berkisar dari 0 (semua setara) sampai 1 (satu orang memiliki semuanya), dan bagian yang dimiliki 10% terkaya adalah bacaan yang lebih konkret dari fakta yang sama. Tanpa pajak, keduanya naik terus: Gini biasanya melewati 0,5 dalam beberapa ribu transaksi dan terus meningkat. Slider People mengubah jumlah penduduk dan mengembalikan semua orang ke $100; fraksi taruhan yang lebih besar mempercepat pergeserannya. Trades per second dan tombol Step 1000 trades hanya mengubah seberapa cepat kamu menyaksikannya.',
        'Slider Wealth-tax rate menambahkan redistribusi: setiap detak, sepotong kecil kekayaan semua orang dikumpulkan dan dibagikan kembali dalam bagian yang sama, sehingga yang miskin menerima lebih dari yang dibayarnya dan yang kaya lebih sedikit. Tarif yang sedang saja sudah menghentikan laju menuju pemusatan total dan menahan Gini pada nilai yang stabil, seperti yang ditemukan Boghosian dan rekan-rekannya ketika mencocokkan versi yang diperluas dari model ini dengan data kekayaan nyata. Ingat apa yang diabaikan model ini: tak ada yang berpenghasilan atau memproduksi apa pun, total kekayaan tetap, transaksi tidak menciptakan nilai, dan slider pajak adalah kekuatan relatif, bukan persentase per tahun. Model ini mengisolasi satu mekanisme, pertukaran acak yang bersifat perkalian, dan menunjukkan bahwa mekanisme itu saja sudah cukup menghasilkan ketimpangan ekstrem.',
      ],
    },
    figure: {
      caption: {
        en: 'Two fair coin flips with a 10% stake, trading against richer partners. Every branch is equally likely and the average of the four outcomes is exactly $100, but three of the four leave you poorer: a win followed by a loss gives 100 × 1.1 × 0.9 = $99. Repeated thousands of times, this small multiplicative bias drains the typical person while a lucky few accumulate.',
        id: 'Dua lemparan koin adil dengan taruhan 10%, bertransaksi dengan mitra yang lebih kaya. Setiap cabang sama mungkinnya dan rata-rata keempat hasilnya persis $100, tetapi tiga dari empat membuatmu lebih miskin: menang lalu kalah memberi 100 × 1,1 × 0,9 = $99. Diulang ribuan kali, bias perkalian kecil ini menguras orang kebanyakan sementara segelintir yang beruntung menumpuk.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Tree of outcomes after two fair trades', 'Pohon hasil setelah dua transaksi adil')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px;opacity:.75}.b{fill:none;stroke:currentColor;stroke-width:1.4;opacity:.6}.w{font-weight:bold}</style>
  <text x="12" y="18" class="w">${L('Your wealth after two fair trades (stake = 10% of yours)', 'Kekayaanmu setelah dua transaksi adil (taruhan = 10% milikmu)')}</text>
  <rect x="20" y="108" width="52" height="26" rx="4" fill="currentColor" opacity=".15"/>
  <text x="30" y="126" class="w">$100</text>
  <line x1="72" y1="116" x2="130" y2="76" class="b"/>
  <line x1="72" y1="126" x2="130" y2="166" class="b"/>
  <text x="84" y="86" fill="#10b981" class="s">${L('win ×1.1', 'menang ×1,1')}</text>
  <text x="84" y="162" fill="#ef4444" class="s">${L('lose ×0.9', 'kalah ×0,9')}</text>
  <rect x="130" y="62" width="52" height="26" rx="4" fill="#10b981" opacity=".25"/>
  <text x="140" y="80" class="w">$110</text>
  <rect x="130" y="152" width="52" height="26" rx="4" fill="#ef4444" opacity=".25"/>
  <text x="144" y="170" class="w">$90</text>
  <line x1="182" y1="70" x2="240" y2="48" class="b"/>
  <line x1="182" y1="80" x2="240" y2="104" class="b"/>
  <line x1="182" y1="160" x2="240" y2="138" class="b"/>
  <line x1="182" y1="170" x2="240" y2="194" class="b"/>
  <text x="196" y="52" fill="#10b981" class="s">×1.1</text>
  <text x="196" y="100" fill="#ef4444" class="s">×0.9</text>
  <text x="196" y="142" fill="#10b981" class="s">×1.1</text>
  <text x="196" y="190" fill="#ef4444" class="s">×0.9</text>
  <rect x="240" y="34" width="52" height="26" rx="4" fill="#10b981" opacity=".35"/>
  <text x="250" y="52" class="w">$121</text>
  <rect x="240" y="90" width="52" height="26" rx="4" fill="#ef4444" opacity=".2"/>
  <text x="254" y="108" class="w">$99</text>
  <rect x="240" y="124" width="52" height="26" rx="4" fill="#ef4444" opacity=".2"/>
  <text x="254" y="142" class="w">$99</text>
  <rect x="240" y="180" width="52" height="26" rx="4" fill="#ef4444" opacity=".35"/>
  <text x="254" y="198" class="w">$81</text>
  <text x="298" y="52" class="s">${L('1 of 4 up', '1 dari 4 naik')}</text>
  <text x="298" y="108" class="s">${L('3 of 4', '3 dari 4')}</text>
  <text x="298" y="120" class="s">${L('down', 'turun')}</text>
  <text x="12" y="222" class="s">${L('average of outcomes = (121 + 99 + 99 + 81) ÷ 4 = $100, unchanged', 'rata-rata hasil = (121 + 99 + 99 + 81) ÷ 4 = $100, tak berubah')}</text>
  <text x="12" y="236" fill="#f59e0b" class="s">${L('but the typical (median) outcome is $99, and it keeps falling', 'tetapi hasil tipikal (median) adalah $99, dan terus turun')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Each trade moves a fixed fraction of the poorer person\'s wealth, decided by a fair coin, so no one has an edge in any single trade.',
        'Because the stakes are multiplicative, a win and a loss leave you poorer (1.1 × 0.9 = 0.99); the average stays fixed but the typical wealth drifts down.',
        'Repeated over thousands of trades this drift concentrates nearly all wealth in one person, and anyone at zero can never recover.',
        'The Gini coefficient (0 = equal, 1 = one owner) and the top-10% share both rise steadily without redistribution.',
        'A wealth tax that is returned equally to everyone counteracts the drift and holds inequality at a stable level.',
      ],
      id: [
        'Setiap transaksi memindahkan fraksi tetap dari kekayaan orang yang lebih miskin, ditentukan koin adil, sehingga tidak ada yang unggul dalam satu transaksi pun.',
        'Karena taruhannya bersifat perkalian, satu menang dan satu kalah membuatmu lebih miskin (1,1 × 0,9 = 0,99); rata-ratanya tetap tetapi kekayaan tipikal merosot.',
        'Diulang ribuan transaksi, pergeseran ini memusatkan hampir semua kekayaan pada satu orang, dan siapa pun yang mencapai nol tidak pernah pulih.',
        'Koefisien Gini (0 = setara, 1 = satu pemilik) dan bagian 10% teratas sama-sama naik terus tanpa redistribusi.',
        'Pajak kekayaan yang dikembalikan secara merata kepada semua orang melawan pergeseran itu dan menahan ketimpangan pada tingkat yang stabil.',
      ],
    },
    vocabulary: {
      en: [
        ['Yard-sale model', 'An exchange model in which random pairs trade a fraction of the poorer party\'s wealth on a fair coin flip.'],
        ['Stake', 'The amount at risk in one trade: the stake fraction times the poorer person\'s wealth.'],
        ['Multiplicative random walk', 'A process in which each step multiplies the current value by a random factor, so gains and losses do not cancel.'],
        ['Gini coefficient', 'A measure of inequality from 0 (everyone has the same) to 1 (one person has everything).'],
        ['Lorenz curve', 'A plot of the cumulative share of wealth held by the poorest fraction of people; the Gini is twice the area between it and the equality line.'],
        ['Wealth condensation', 'The end state in which nearly all wealth is held by a single agent.'],
        ['Redistribution', 'Collecting a share of wealth from everyone and returning it in equal amounts, which transfers from richer to poorer.'],
        ['Zero-sum', 'A situation in which one party\'s gain is exactly another\'s loss, so the total never changes.'],
      ],
      id: [
        ['Model yard-sale', 'Model pertukaran yang pasangan acaknya mempertukarkan sebagian kekayaan pihak yang lebih miskin dengan lemparan koin adil.'],
        ['Taruhan', 'Jumlah yang dipertaruhkan dalam satu transaksi: fraksi taruhan dikali kekayaan orang yang lebih miskin.'],
        ['Random walk perkalian', 'Proses yang setiap langkahnya mengalikan nilai saat ini dengan faktor acak, sehingga untung dan rugi tidak saling meniadakan.'],
        ['Koefisien Gini', 'Ukuran ketimpangan dari 0 (semua orang sama) sampai 1 (satu orang memiliki semuanya).'],
        ['Kurva Lorenz', 'Plot bagian kumulatif kekayaan yang dipegang fraksi termiskin penduduk; Gini adalah dua kali luas antara kurva itu dan garis kesetaraan.'],
        ['Kondensasi kekayaan', 'Keadaan akhir ketika hampir semua kekayaan dipegang satu pelaku saja.'],
        ['Redistribusi', 'Mengumpulkan sebagian kekayaan dari semua orang dan mengembalikannya dalam jumlah yang sama, yang memindahkan dari yang kaya ke yang miskin.'],
        ['Zero-sum', 'Situasi ketika keuntungan satu pihak persis sama dengan kerugian pihak lain, sehingga totalnya tidak pernah berubah.'],
      ],
    },
    misconceptions: {
      en: [
        ['With a fair coin, wealth should stay roughly equal on average.', 'The average across all possible outcomes does stay at $100, but almost nobody experiences the average. Multiplicative gains and losses make the typical wealth fall while a few lucky people hold the rest, so the distribution spreads without limit.'],
        ['The person who ends up rich must have been more skilled or luckier per trade.', 'Everyone in the model is identical and every coin is fair. The winner is simply whoever happened to string wins together early; given enough trades someone always does, and from then on their advantage is self-reinforcing.'],
        ['Someone who has lost almost everything can win it back with a lucky streak.', 'Stakes are a fraction of the poorer party\'s wealth, so a person with very little can only win very little. At exactly zero the stake is zero and recovery is impossible: poverty is an absorbing state.'],
        ['The model proves real economies are zero-sum.', 'It assumes zero-sum trades as a simplification. Real trades usually create value for both sides and real people earn income, which the model omits so that one mechanism, multiplicative chance, can be seen in isolation.'],
      ],
      id: [
        ['Dengan koin adil, kekayaan seharusnya tetap kira-kira setara secara rata-rata.', 'Rata-rata atas semua kemungkinan hasil memang tetap $100, tetapi hampir tak seorang pun mengalami rata-rata itu. Untung dan rugi yang bersifat perkalian membuat kekayaan tipikal turun sementara beberapa orang yang beruntung memegang sisanya, sehingga distribusinya melebar tanpa batas.'],
        ['Orang yang akhirnya kaya pasti lebih terampil atau lebih beruntung tiap transaksi.', 'Semua orang dalam model identik dan setiap koin adil. Pemenangnya hanyalah siapa pun yang kebetulan merangkai kemenangan lebih awal; dengan transaksi yang cukup banyak selalu ada yang begitu, dan sejak itu keunggulannya memperkuat diri sendiri.'],
        ['Orang yang telah kehilangan hampir semuanya bisa merebutnya kembali dengan rentetan keberuntungan.', 'Taruhan adalah fraksi kekayaan pihak yang lebih miskin, sehingga orang yang punya sangat sedikit hanya bisa menang sangat sedikit. Tepat di nol taruhannya nol dan pemulihan tidak mungkin: kemiskinan adalah keadaan yang menyerap.'],
        ['Model ini membuktikan ekonomi nyata bersifat zero-sum.', 'Ia mengasumsikan transaksi zero-sum sebagai penyederhanaan. Transaksi nyata biasanya menciptakan nilai bagi kedua pihak dan orang sungguhan berpenghasilan, yang dihilangkan model agar satu mekanisme, peluang yang bersifat perkalian, bisa dilihat secara terpisah.'],
      ],
    },
    realWorld: {
      en: [
        'Boghosian and colleagues extended the yard-sale model with redistribution and a small advantage for the wealthy, and fitted it closely to wealth distributions in the United States and several European countries.',
        'Indonesia\'s statistics agency BPS publishes a Gini ratio every year; it has stayed between roughly 0.38 and 0.41 over the past decade, a level the model reaches after only a few thousand trades.',
        'A gambler betting a fixed fraction of their bankroll on fair bets goes broke in the long run for exactly the reason shown here, which is why casinos and card games end with most players losing.',
        'In the board game Monopoly, players start equal and the rules are the same for everyone, yet the game reliably ends with one player holding all the property.',
      ],
      id: [
        'Boghosian dan rekan-rekannya memperluas model yard-sale dengan redistribusi dan sedikit keunggulan bagi yang kaya, lalu mencocokkannya dengan erat pada distribusi kekayaan di Amerika Serikat dan beberapa negara Eropa.',
        'Badan Pusat Statistik (BPS) menerbitkan rasio Gini setiap tahun; nilainya bertahan antara kira-kira 0,38 dan 0,41 selama satu dekade terakhir, tingkat yang dicapai model ini hanya setelah beberapa ribu transaksi.',
        'Penjudi yang mempertaruhkan fraksi tetap dari modalnya pada taruhan adil akan bangkrut dalam jangka panjang karena alasan yang persis ditunjukkan di sini; itulah sebabnya kasino dan permainan kartu berakhir dengan kebanyakan pemain kalah.',
        'Dalam permainan papan Monopoli, pemain mulai setara dan aturannya sama bagi semua, tetapi permainan selalu berakhir dengan satu pemain memegang semua properti.',
      ],
    },
    questions: {
      en: [
        { q: 'You have $50 and your trading partner has $200. The stake fraction is 10%. How much is at stake, and what are the possible outcomes for each of you?', a: 'The stake is 10% of the poorer person\'s wealth: $5. You end with $55 or $45; your partner ends with $195 or $205. The same $5 is a 10% swing for you but only a 2.5% swing for them, which is why the poorer party is far more exposed.' },
        { q: 'Starting from $100, you win once and lose once against richer partners (stake 10% of your wealth). Why do you end below $100, and does the order matter?', a: 'Win first: 100 × 1.1 = 110, then lose 10% of 110, which is 11, leaving 99. Lose first: 90, then win 9, also 99. The order does not matter; the loss is taken from a bigger base than the gain was added to, so every win-loss pair costs you 1%.' },
        { q: 'Why does even a small wealth tax, redistributed equally, stop one person from ending up with everything?', a: 'Each tick everyone pays the same fraction of their wealth, so the rich pay far more in absolute terms, but everyone receives the same refund. Net money flows from the rich to the poor, and the poor are pulled back from zero, so they can keep trading and recover. The random drift toward concentration is balanced by this steady inflow, and the Gini settles at a stable value instead of climbing to 1.' },
      ],
      id: [
        { q: 'Kamu punya $50 dan mitra transaksimu punya $200. Fraksi taruhan 10%. Berapa yang dipertaruhkan, dan apa kemungkinan hasilnya bagi kalian masing-masing?', a: 'Taruhannya 10% dari kekayaan orang yang lebih miskin: $5. Kamu berakhir dengan $55 atau $45; mitramu berakhir dengan $195 atau $205. $5 yang sama adalah ayunan 10% bagimu tetapi hanya 2,5% baginya; itulah sebabnya pihak yang lebih miskin jauh lebih rentan.' },
        { q: 'Mulai dari $100, kamu menang sekali dan kalah sekali melawan mitra yang lebih kaya (taruhan 10% dari kekayaanmu). Mengapa kamu berakhir di bawah $100, dan apakah urutannya penting?', a: 'Menang dulu: 100 × 1,1 = 110, lalu kalah 10% dari 110, yaitu 11, menyisakan 99. Kalah dulu: 90, lalu menang 9, juga 99. Urutannya tidak penting; kerugian diambil dari dasar yang lebih besar daripada dasar tempat keuntungan ditambahkan, sehingga setiap pasangan menang-kalah merugikanmu 1%.' },
        { q: 'Mengapa pajak kekayaan yang kecil saja, jika dibagikan kembali secara merata, mencegah satu orang menguasai semuanya?', a: 'Setiap detak semua orang membayar fraksi yang sama dari kekayaannya, sehingga yang kaya membayar jauh lebih banyak dalam jumlah mutlak, tetapi semua orang menerima pengembalian yang sama. Uang bersih mengalir dari yang kaya ke yang miskin, dan yang miskin ditarik kembali dari nol sehingga bisa terus bertransaksi dan pulih. Pergeseran acak menuju pemusatan diimbangi oleh aliran masuk yang tetap ini, dan Gini menetap pada nilai yang stabil, bukan menanjak ke 1.' },
      ],
    },
  },
};
