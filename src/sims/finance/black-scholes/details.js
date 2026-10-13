// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply the Black-Scholes formula for European calls and puts.',
      'See how each input moves the price (the "Greeks").',
      "Distinguish payoff at expiry from time-value premium.",
    ],
    id: [
      'Menerapkan rumus Black-Scholes untuk call dan put Eropa.',
      'Melihat efek tiap input pada harga ("Greeks").',
      'Membedakan payoff saat jatuh tempo dari nilai waktu.',
    ],
  },
  tryThis: {
    en: [
      'σ = 50% — does the call price soar?',
      'T → 0 — does the call collapse to max(S−K, 0)?',
      'S = K — at-the-money. What\'s the call worth?',
    ],
    id: [
      'σ = 50% — apakah harga call melonjak?',
      'T → 0 — apakah call runtuh ke max(S−K, 0)?',
      'S = K — at-the-money. Berapa nilai call-nya?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A call option gives its holder the right, but not the obligation, to buy a share at a fixed strike price K on the expiry date; a put gives the right to sell at K. At expiry the decision is easy: a call is worth max(S − K, 0) and a put max(K − S, 0), where S is the share price. The hard question is what the option is worth before expiry, when S could still move. Black, Scholes and Merton answered it in 1973 by showing that an option can be replicated by continuously trading the share and a risk-free bond, so its price must equal the cost of that replicating portfolio or a riskless profit would exist.',
        'The result is the formula the sim evaluates. With d1 = [ln(S/K) + (r + σ²/2)T] / (σ√T) and d2 = d1 − σ√T, the call price is C = S·N(d1) − K·e^(−rT)·N(d2) and the put is P = K·e^(−rT)·N(−d2) − S·N(−d1), where N is the standard normal cumulative distribution. N(d2) can be read as the risk-neutral probability that the option finishes in the money, and K·e^(−rT) is the strike discounted back to today. The chart plots C (blue) and P (pink) against the share price S, with the expiry payoffs drawn as dashed hockey-stick lines beneath them. The vertical gap between the smooth curve and the dashed payoff is the time value: what the market pays for the possibility that S moves favourably before expiry.',
        'Each slider is one input to the formula. Raising S lifts the call and lowers the put; raising K does the opposite. More time T and more volatility σ increase both prices, because an option\'s payoff is one-sided: the holder gains from large moves in the right direction but loses only the premium otherwise, so a wider range of possible outcomes is worth more. At-the-money time value grows roughly like σ√T, which is why halving the time does not halve the premium. A higher risk-free rate r raises the call and lowers the put, since the strike is paid later and is worth less in present-value terms. As T approaches zero the curves collapse onto the dashed payoffs. The lab panel suggests checking put–call parity, C − P = S − K·e^(−rT), which holds exactly for every setting.',
        'The model is elegant because of its assumptions, and limited for the same reason. It prices European options, exercisable only at expiry, on a share that pays no dividends, with constant volatility and interest rate, lognormally distributed prices and frictionless trading. The expected return of the share does not appear anywhere: the price is set by replication, not by forecasting. In real markets the volatility implied by option prices differs across strikes and maturities, the volatility smile, which tells us traders do not believe the constant-σ assumption. The sim uses a standard numerical approximation for N(x) accurate to about seven decimal places.',
      ],
      id: [
        'Opsi call memberi pemegangnya hak, tetapi bukan kewajiban, untuk membeli satu saham pada harga kesepakatan (strike) K tetap pada tanggal jatuh tempo; put memberi hak untuk menjual pada K. Saat jatuh tempo keputusannya mudah: call bernilai max(S − K, 0) dan put max(K − S, 0), dengan S harga saham. Pertanyaan sulitnya adalah berapa nilai opsi sebelum jatuh tempo, ketika S masih bisa bergerak. Black, Scholes, dan Merton menjawabnya pada 1973 dengan menunjukkan bahwa sebuah opsi dapat ditiru dengan terus-menerus memperdagangkan saham dan obligasi bebas risiko, sehingga harganya harus sama dengan biaya portofolio peniru itu, atau akan ada keuntungan tanpa risiko.',
        'Hasilnya adalah rumus yang dihitung simulasi ini. Dengan d1 = [ln(S/K) + (r + σ²/2)T] / (σ√T) dan d2 = d1 − σ√T, harga call adalah C = S·N(d1) − K·e^(−rT)·N(d2) dan put adalah P = K·e^(−rT)·N(−d2) − S·N(−d1), dengan N fungsi distribusi kumulatif normal standar. N(d2) bisa dibaca sebagai peluang risiko-netral bahwa opsi berakhir in the money, dan K·e^(−rT) adalah strike yang didiskonto ke hari ini. Grafik memplot C (biru) dan P (merah muda) terhadap harga saham S, dengan payoff saat jatuh tempo digambar sebagai garis putus-putus berbentuk tongkat hoki di bawahnya. Celah vertikal antara kurva mulus dan payoff putus-putus adalah nilai waktu: harga yang dibayar pasar untuk kemungkinan S bergerak menguntungkan sebelum jatuh tempo.',
        'Tiap slider adalah satu masukan rumus. Menaikkan S mengangkat call dan menurunkan put; menaikkan K berlaku sebaliknya. Waktu T lebih panjang dan volatilitas σ lebih besar menaikkan kedua harga, karena payoff opsi bersifat satu sisi: pemegang untung dari pergerakan besar ke arah yang benar tetapi hanya kehilangan premi jika tidak, sehingga rentang hasil yang lebih lebar bernilai lebih tinggi. Nilai waktu at-the-money tumbuh kira-kira seperti σ√T, itulah sebabnya memangkas waktu menjadi setengah tidak memangkas premi menjadi setengah. Suku bunga bebas risiko r yang lebih tinggi menaikkan call dan menurunkan put, karena strike dibayar belakangan dan nilai kininya lebih kecil. Saat T mendekati nol, kurva runtuh ke payoff putus-putus. Panel lab menyarankan memeriksa paritas put–call, C − P = S − K·e^(−rT), yang berlaku tepat untuk setiap pengaturan.',
        'Model ini elegan karena asumsinya, dan terbatas karena alasan yang sama. Ia menilai opsi Eropa, yang hanya bisa dieksekusi saat jatuh tempo, atas saham tanpa dividen, dengan volatilitas dan suku bunga tetap, harga berdistribusi lognormal, dan perdagangan tanpa biaya. Return harapan saham tidak muncul di mana pun: harga ditentukan oleh peniruan, bukan ramalan. Di pasar sungguhan, volatilitas yang tersirat dari harga opsi berbeda antar strike dan jatuh tempo, yang disebut volatility smile, pertanda bahwa pelaku pasar tidak percaya asumsi σ tetap. Simulasi memakai pendekatan numerik baku untuk N(x) yang akurat sampai sekitar tujuh angka desimal.',
      ],
    },
    figure: {
      caption: {
        en: 'Call value against share price for K = 100, T = 1 year, r = 5%, σ = 25%. The dashed hockey stick is the payoff at expiry, max(S − K, 0). The smooth curve lies above it; the gap is time value, largest at the money (about 12.3 here) and shrinking to zero far in or out of the money.',
        id: 'Nilai call terhadap harga saham untuk K = 100, T = 1 tahun, r = 5%, σ = 25%. Tongkat hoki putus-putus adalah payoff saat jatuh tempo, max(S − K, 0). Kurva mulus berada di atasnya; celahnya adalah nilai waktu, terbesar saat at-the-money (sekitar 12,3 di sini) dan menyusut ke nol jauh di dalam atau di luar the money.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Black-Scholes call value above its expiry payoff', 'Nilai call Black-Scholes di atas payoff jatuh temponya')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1;fill:none;opacity:.6}.s{font-size:10px;opacity:.75}.c{fill:none;stroke-width:2.4;stroke-linejoin:round}</style>
  <line x1="40" y1="40" x2="40" y2="200" class="ax"/>
  <line x1="40" y1="200" x2="330" y2="200" class="ax"/>
  <line x1="185" y1="40" x2="185" y2="200" stroke="#f59e0b" stroke-width="1" stroke-dasharray="4 3" opacity=".8"/>
  <text x="176" y="214" class="s">K</text>
  <text x="36" y="214" class="s">0</text>
  <text x="318" y="214" class="s">2K</text>
  <text x="240" y="230" class="s">${L('share price S', 'harga saham S')} →</text>
  <text x="44" y="36" class="s">${L('option value', 'nilai opsi')}</text>
  <path d="M40 200 L185 200 L330 66.7" fill="none" stroke="#3b82f6" stroke-width="1.6" stroke-dasharray="5 4" opacity=".8"/>
  <path d="M40 66.7 L185 200" fill="none" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="5 4" opacity=".8"/>
  <path d="M40 200 L127 199.7 L141.5 198.6 L156 195.8 L170.5 190.8 L185 183.6 L199.5 174.3 L214 163.5 L228.5 151.6 L243 139.2 L272 113.2 L301 86.8 L330 60.1" class="c" stroke="#3b82f6"/>
  <line x1="185" y1="200" x2="185" y2="183.6" stroke="#10b981" stroke-width="3"/>
  <circle cx="185" cy="183.6" r="4" fill="#10b981"/>
  <text x="192" y="190" fill="#10b981">${L('time value', 'nilai waktu')}</text>
  <text x="192" y="200" fill="#10b981" class="s">C ≈ 12.3 ${L('at S = K', 'saat S = K')}</text>
  <line x1="272" y1="200" x2="272" y2="146.7" stroke="#8b5cf6" stroke-width="2"/>
  <text x="276" y="178" fill="#8b5cf6" class="s">${L('intrinsic', 'intrinsik')}</text>
  <text x="276" y="189" fill="#8b5cf6" class="s">S − K</text>
  <text x="212" y="52" fill="#3b82f6">${L('call value C(S)', 'nilai call C(S)')}</text>
  <text x="212" y="64" class="s" fill="#3b82f6">${L('payoff max(S − K, 0) dashed', 'payoff max(S − K, 0) putus-putus')}</text>
  <text x="46" y="60" fill="#ef4444" class="s">${L('put payoff', 'payoff put')}</text>
  <text x="46" y="71" fill="#ef4444" class="s">max(K − S, 0)</text>
  <text x="60" y="192" class="s">${L('out of the money', 'out of the money')}</text>
  <text x="206" y="133" class="s">${L('in the money', 'in the money')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'At expiry a call pays max(S − K, 0) and a put pays max(K − S, 0); before expiry each is worth more than that payoff because S can still move.',
        'Black-Scholes prices a European option as the cost of replicating it with the share and a risk-free bond: C = S·N(d1) − K·e^(−rT)·N(d2).',
        'Volatility and time raise both call and put prices, because the payoff is one-sided and a wider spread of outcomes helps the holder more than it hurts.',
        'The expected return of the share does not enter the formula; only S, K, T, r and σ do.',
        'Put–call parity, C − P = S − K·e^(−rT), links the two prices and holds for any inputs.',
      ],
      id: [
        'Saat jatuh tempo, call membayar max(S − K, 0) dan put membayar max(K − S, 0); sebelum jatuh tempo keduanya bernilai lebih dari payoff itu karena S masih bisa bergerak.',
        'Black-Scholes menilai opsi Eropa sebagai biaya menirunya dengan saham dan obligasi bebas risiko: C = S·N(d1) − K·e^(−rT)·N(d2).',
        'Volatilitas dan waktu menaikkan harga call maupun put, karena payoff bersifat satu sisi dan sebaran hasil yang lebih lebar lebih menguntungkan pemegang daripada merugikannya.',
        'Return harapan saham tidak masuk ke rumus; hanya S, K, T, r, dan σ yang berperan.',
        'Paritas put–call, C − P = S − K·e^(−rT), menghubungkan kedua harga dan berlaku untuk masukan apa pun.',
      ],
    },
    vocabulary: {
      en: [
        ['Call option', 'The right to buy the underlying share at the strike price on the expiry date.'],
        ['Put option', 'The right to sell the underlying share at the strike price on the expiry date.'],
        ['Strike price (K)', 'The fixed price at which the option can be exercised.'],
        ['Intrinsic value', 'What the option would pay if exercised now: max(S − K, 0) for a call.'],
        ['Time value', 'The option price minus its intrinsic value; the premium for the chance of favourable moves before expiry.'],
        ['Volatility (σ)', 'The standard deviation of the share\'s yearly log return, the key measure of uncertainty in the model.'],
        ['N(d)', 'The standard normal cumulative distribution function; N(d2) is the risk-neutral probability the call finishes in the money.'],
        ['Put–call parity', 'The no-arbitrage relation C − P = S − K·e^(−rT) between a call and a put with the same strike and expiry.'],
      ],
      id: [
        ['Opsi call', 'Hak untuk membeli saham acuan pada harga strike pada tanggal jatuh tempo.'],
        ['Opsi put', 'Hak untuk menjual saham acuan pada harga strike pada tanggal jatuh tempo.'],
        ['Harga strike (K)', 'Harga tetap tempat opsi dapat dieksekusi.'],
        ['Nilai intrinsik', 'Yang akan dibayar opsi jika dieksekusi sekarang: max(S − K, 0) untuk call.'],
        ['Nilai waktu', 'Harga opsi dikurangi nilai intrinsiknya; premi untuk peluang pergerakan menguntungkan sebelum jatuh tempo.'],
        ['Volatilitas (σ)', 'Simpangan baku return logaritmik tahunan saham, ukuran utama ketidakpastian dalam model.'],
        ['N(d)', 'Fungsi distribusi kumulatif normal standar; N(d2) adalah peluang risiko-netral call berakhir in the money.'],
        ['Paritas put–call', 'Hubungan tanpa-arbitrase C − P = S − K·e^(−rT) antara call dan put dengan strike dan jatuh tempo yang sama.'],
      ],
    },
    misconceptions: {
      en: [
        ['An option\'s price depends on whether the share is expected to go up.', 'The expected return of the share appears nowhere in the formula. The price is fixed by replication with the share and a bond, so two traders with opposite forecasts agree on the Black-Scholes price if they agree on σ.'],
        ['An out-of-the-money call is worthless.', 'Its intrinsic value is zero, but its time value is not: there is a chance S rises above K before expiry. In the sim an option with S well below K still shows a positive price that grows with σ and T.'],
        ['Higher volatility is bad news for anyone holding an option.', 'It raises the value of calls and puts alike. Losses are capped at the premium while gains are open-ended, so a wider spread of outcomes is worth more to the holder.'],
        ['At the money, the put and the call must cost the same.', 'Parity gives C − P = S − K·e^(−rT), which is positive when S = K and r is above zero. With the default settings the call is about 12.33 and the put about 7.45.'],
      ],
      id: [
        ['Harga opsi bergantung pada apakah saham diperkirakan naik.', 'Return harapan saham tidak muncul di mana pun dalam rumus. Harga ditentukan oleh peniruan dengan saham dan obligasi, sehingga dua pedagang dengan ramalan berlawanan sepakat pada harga Black-Scholes jika mereka sepakat pada σ.'],
        ['Call yang out of the money tidak bernilai.', 'Nilai intrinsiknya nol, tetapi nilai waktunya tidak: ada peluang S naik melampaui K sebelum jatuh tempo. Di simulasi, opsi dengan S jauh di bawah K masih menunjukkan harga positif yang tumbuh bersama σ dan T.'],
        ['Volatilitas lebih tinggi adalah kabar buruk bagi pemegang opsi.', 'Volatilitas justru menaikkan nilai call dan put sekaligus. Kerugian dibatasi sebesar premi sementara keuntungan tidak terbatas, sehingga sebaran hasil yang lebih lebar bernilai lebih tinggi bagi pemegang.'],
        ['Saat at the money, put dan call pasti berharga sama.', 'Paritas memberi C − P = S − K·e^(−rT), yang positif saat S = K dan r di atas nol. Dengan pengaturan bawaan, call sekitar 12,33 dan put sekitar 7,45.'],
      ],
    },
    realWorld: {
      en: [
        'Options on shares, indices, currencies and commodities trade on exchanges worldwide; the Chicago Board Options Exchange opened in 1973, the same year the Black-Scholes paper appeared.',
        'Traders quote options by implied volatility, the σ that makes the formula match the market price, so the model is used backwards as a common language even where its assumptions fail.',
        'Volatility indices such as the VIX summarise the implied volatility of index options and are widely reported as a gauge of market fear.',
        'Companies that pay staff in stock options must value them for their accounts, and Black-Scholes is one of the accepted methods.',
      ],
      id: [
        'Opsi atas saham, indeks, mata uang, dan komoditas diperdagangkan di bursa seluruh dunia; Chicago Board Options Exchange dibuka pada 1973, tahun yang sama dengan terbitnya makalah Black-Scholes.',
        'Pedagang mengutip opsi dengan volatilitas tersirat, yaitu σ yang membuat rumus cocok dengan harga pasar, sehingga model ini dipakai terbalik sebagai bahasa bersama bahkan ketika asumsinya tidak terpenuhi.',
        'Indeks volatilitas seperti VIX merangkum volatilitas tersirat opsi indeks dan banyak dikutip sebagai pengukur kecemasan pasar.',
        'Perusahaan yang menggaji karyawan dengan opsi saham harus menilainya dalam laporan keuangan, dan Black-Scholes adalah salah satu metode yang diterima.',
      ],
    },
    questions: {
      en: [
        { q: 'With S = K = 100, T = 1, r = 5% and σ = 25%, compute d1, d2 and the call price.', a: 'd1 = [0 + (0.05 + 0.03125) × 1] / 0.25 = 0.325 and d2 = 0.325 − 0.25 = 0.075. N(0.325) ≈ 0.627 and N(0.075) ≈ 0.530, so C = 100 × 0.627 − 100 × e^(−0.05) × 0.530 ≈ 62.7 − 50.4 ≈ 12.3. The put follows from parity: P = C − S + K·e^(−rT) ≈ 12.3 − 100 + 95.1 ≈ 7.5.' },
        { q: 'Starting from the default settings, you cut the time to expiry from 1 year to 0.25 years. Does the at-the-money call price fall to a quarter of its value?', a: 'No. At-the-money time value grows roughly like σ√T, so quartering T roughly halves the premium. The formula gives about 5.6 at T = 0.25 compared with 12.3 at T = 1, a ratio of about 0.45. Only as T goes to zero does the call collapse to its payoff, which is 0 at the money.' },
        { q: 'Why does raising σ increase the price of the put as well as the call, when a volatile share is more likely to rise above K as well as to fall below it?', a: 'A put holder loses at most the premium if the share rises, but gains more and more the further it falls. Extra volatility adds to both tails, yet only the downward tail changes the put\'s payoff, so the expected payoff rises. The same one-sidedness, mirrored, makes the call dearer too; parity then forces C and P to move together by the same amount.' },
      ],
      id: [
        { q: 'Dengan S = K = 100, T = 1, r = 5%, dan σ = 25%, hitung d1, d2, dan harga call.', a: 'd1 = [0 + (0,05 + 0,03125) × 1] / 0,25 = 0,325 dan d2 = 0,325 − 0,25 = 0,075. N(0,325) ≈ 0,627 dan N(0,075) ≈ 0,530, sehingga C = 100 × 0,627 − 100 × e^(−0,05) × 0,530 ≈ 62,7 − 50,4 ≈ 12,3. Put diperoleh dari paritas: P = C − S + K·e^(−rT) ≈ 12,3 − 100 + 95,1 ≈ 7,5.' },
        { q: 'Dari pengaturan bawaan, kamu memotong waktu jatuh tempo dari 1 tahun menjadi 0,25 tahun. Apakah harga call at-the-money turun menjadi seperempatnya?', a: 'Tidak. Nilai waktu at-the-money tumbuh kira-kira seperti σ√T, sehingga memangkas T menjadi seperempat kira-kira memangkas premi menjadi setengah. Rumus memberi sekitar 5,6 pada T = 0,25 dibandingkan 12,3 pada T = 1, rasio sekitar 0,45. Hanya saat T menuju nol call runtuh ke payoffnya, yaitu 0 saat at the money.' },
        { q: 'Mengapa menaikkan σ menaikkan harga put sekaligus call, padahal saham yang lebih bergejolak sama mungkinnya naik melampaui K maupun turun di bawahnya?', a: 'Pemegang put paling banyak kehilangan premi jika saham naik, tetapi untung semakin besar semakin jauh saham turun. Volatilitas tambahan menebalkan kedua ekor, namun hanya ekor bawah yang mengubah payoff put, sehingga payoff harapannya naik. Sifat satu sisi yang sama, dicerminkan, membuat call juga lebih mahal; paritas kemudian memaksa C dan P bergerak bersama dengan jumlah yang sama.' },
      ],
    },
  },
};
